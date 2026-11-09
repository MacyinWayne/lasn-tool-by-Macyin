/*!
 * core/battle.js —— 比赛模拟器 v1（蒙特卡洛，T5 beta）
 *
 * 证据边界（必须显式标注）：
 *  - 攻防卡映射、防守 30%/70%、耐力力竭、意志看破：来自 T3 model.json battle（多源一致/单源）
 *  - 具体命中力函数、回合数、力竭衰减幅度、暴击/能量细节：客户端数值区未确认 → 全部用「示意假设」，
 *    模拟器结果标注 beta/待校准，禁止当硬结论。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.battle = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function getModel() {
    var B = (typeof globalThis !== 'undefined' && globalThis.BBT) || {};
    return B.model || (typeof globalThis !== 'undefined' ? globalThis.BBTModel : null) || null;
  }

  /** 可复现随机数（mulberry32）。 */
  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function logistic(x) {
    return 1 / (1 + Math.exp(-x));
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  /** 从 C 层六维派生两队综合面板（缺失的篮板/逼抢/耐力用代理指标并标注）。 */
  function deriveTeamProfile(statsList) {
    var list = (statsList || []).filter(Boolean);
    if (!list.length) return null;
    var avg = function (pick) {
      var vals = list.map(pick).filter(function (v) { return typeof v === 'number'; });
      return vals.length ? vals.reduce(function (a, b) { return a + b; }, 0) / vals.length : 100;
    };
    var shot = avg(function (s) { return s['投射']; });
    var attackHoop = avg(function (s) { return s['攻筐']; });
    var defShot = avg(function (s) { return s['防投']; });
    var rim = avg(function (s) { return s['护筐']; });
    var pass = avg(function (s) { return s['传球']; });
    var dribble = avg(function (s) { return s['突破']; });
    return {
      attack: (shot + attackHoop) / 2,
      defense: (defShot + rim) / 2,
      organize: (pass + dribble) / 2,
      rebound: (attackHoop + rim) / 2, // 代理：篮板 = (攻筐+护筐)/2（推断，C 层缺篮板）
      stamina: 100,
      will: 60,
      shot: shot,
      attackHoop: attackHoop,
      defShot: defShot,
      rim: rim,
      pass: pass,
      dribble: dribble,
      proxies: ['篮板/逼抢/耐力/爆发为代理值（C 层缺 8 项，待客户端补全）']
    };
  }

  var STRATEGIES = [
    { id: 'counter', name: '克制优先', desc: '优先打对位弱点，但体力消耗中等', attackMod: 1.0, staminaMod: 1.0, risk: '中' },
    { id: 'save', name: '省体力', desc: '压低消耗、略微牺牲命中，打持久战', attackMod: 0.92, staminaMod: 0.7, risk: '低' },
    { id: 'burst', name: '优势属性爆发', desc: '堆高单次出手威力，体力烧得快', attackMod: 1.12, staminaMod: 1.35, risk: '高' },
    { id: 'skill', name: '技能时机', desc: '能量满时交固定技能（80 能量）', attackMod: 1.0, staminaMod: 1.1, risk: '中' }
  ];

  function strategyById(id) {
    for (var i = 0; i < STRATEGIES.length; i++) if (STRATEGIES[i].id === id) return STRATEGIES[i];
    return STRATEGIES[0];
  }

  var ASSUMPTIONS = {
    rounds: 24,
    staminaStart: 100,
    staminaPerRound: 3.2,
    exhaustionPenalty: 0.7, // 力竭后属性乘 0.7（模型区间 0.2~0.4 衰减 → 保留 60%~80%）
    baseHit: 0.42,
    hitScale: 260,
    counterBonus: 0.06,
    willCounterScale: 0.5,
    pointsInside: 2,
    pointsOutside: 3,
    skillEnergyCost: 80,
    skillEveryRounds: 5,
    confidence: 'beta/示意：命中函数、回合数、力竭衰减均未确证'
  };

  function cardAttackValue(profile, color, exhausted) {
    var m = exhausted ? ASSUMPTIONS.exhaustionPenalty : 1;
    if (color === 'red') return (profile.attack * 0.8 + profile.rebound * 0.2) * m;
    if (color === 'green') return (profile.attack * 0.9 + profile.organize * 0.1) * m;
    return (profile.organize * 0.7 + profile.attack * 0.3) * m; // blue 外线
  }

  function defenseValue(profile, color, exhausted) {
    var m = exhausted ? ASSUMPTIONS.exhaustionPenalty : 1;
    var matched = color === 'red' ? (profile.rim + profile.rebound) / 2 : color === 'green' ? profile.defense : (profile.defense * 0.6 + profile.organize * 0.4);
    // 防守卡 = 30% 对应属性 + 70% 防守属性（T3 模型）
    return (matched * 0.3 + profile.defense * 0.7) * m;
  }

  /**
   * 单场模拟。
   * @returns {Object} { scoreA, scoreB, winner, exhaustRoundA, exhaustRoundB, rounds }
   */
  function simulateOne(teamA, teamB, strategy, rng, assumptions) {
    var a = assumptions || ASSUMPTIONS;
    var stA = a.staminaStart;
    var stB = a.staminaStart;
    var scoreA = 0;
    var scoreB = 0;
    var exhaustA = null;
    var exhaustB = null;
    var energyA = 30;
    var energyB = 30;

    for (var round = 1; round <= a.rounds; round++) {
      var aAttacks = round % 2 === 1;
      var attacker = aAttacks ? teamA : teamB;
      var defender = aAttacks ? teamB : teamA;
      var attackerStamina = aAttacks ? stA : stB;
      var defenderStamina = aAttacks ? stB : stA;
      var strat = aAttacks ? strategy : strategyById('counter');
      var attackerExhausted = attackerStamina <= 0;
      var defenderExhausted = defenderStamina <= 0;
      if (aAttacks && attackerExhausted && exhaustA == null) exhaustA = round;
      if (!aAttacks && attackerExhausted && exhaustB == null) exhaustB = round;

      // 选卡色：克制优先按「攻击最强 vs 对方最弱防守」挑，其它策略偏进攻色
      var color = 'green';
      if (strat.id === 'counter') {
        var options = [
          { c: 'red', gain: cardAttackValue(attacker, 'red', attackerExhausted) - defenseValue(defender, 'red', defenderExhausted) },
          { c: 'green', gain: cardAttackValue(attacker, 'green', attackerExhausted) - defenseValue(defender, 'green', defenderExhausted) },
          { c: 'blue', gain: cardAttackValue(attacker, 'blue', attackerExhausted) - defenseValue(defender, 'blue', defenderExhausted) }
        ].sort(function (x, y) { return y.gain - x.gain; });
        color = options[0].c;
      } else if (strat.id === 'burst') {
        color = attacker.attack >= attacker.organize ? 'green' : 'blue';
      } else {
        color = attacker.organize >= attacker.attack ? 'blue' : 'green';
      }

      var atk = cardAttackValue(attacker, color, attackerExhausted) * strat.attackMod;
      var def = defenseValue(defender, color, defenderExhausted);
      // 技能时机：能量够就交技能（+命中/威力）
      if (strat.id === 'skill' && energyA >= a.skillEnergyCost && aAttacks) {
        atk *= 1.22;
        energyA -= a.skillEnergyCost;
      }
      var willEdge = (attacker.will - defender.will) / 100;
      var p = clamp(
        a.baseHit + logistic((atk - def) / a.hitScale) * 0.5 + willEdge * a.willCounterScale * 0.1 + (attacker.attack > defender.attack ? 0.02 : -0.02),
        0.06,
        0.92
      );
      var success = rng() < p;
      if (success) {
        var pts = color === 'blue' ? a.pointsOutside : color === 'green' ? a.pointsInside : a.pointsInside;
        if (aAttacks) scoreA += pts;
        else scoreB += pts;
      }

      // 体力与能量
      var spend = a.staminaPerRound * strat.staminaMod;
      if (aAttacks) stA = Math.max(0, stA - spend);
      else stB = Math.max(0, stB - spend);
      energyA = Math.min(120, energyA + (aAttacks ? 3 : 5));
      energyB = Math.min(120, energyB + (aAttacks ? 5 : 3));
    }

    return {
      scoreA: scoreA,
      scoreB: scoreB,
      winner: scoreA === scoreB ? 'draw' : scoreA > scoreB ? 'A' : 'B',
      exhaustA: exhaustA,
      exhaustB: exhaustB
    };
  }

  function percentile(arr, p) {
    if (!arr.length) return null;
    var sorted = arr.slice().sort(function (a, b) { return a - b; });
    var idx = clamp(Math.floor((sorted.length - 1) * p), 0, sorted.length - 1);
    return sorted[idx];
  }

  /**
   * 蒙特卡洛批量模拟。
   * @param {Object} input { teamA, teamB, strategyId, simulations, seed }
   * @returns {Object} 胜率 / 分差分布 / 力竭时点分布 / 属性贡献度 / 假设
   */
  function simulate(input) {
    var o = input || {};
    var teamA = o.teamA;
    var teamB = o.teamB;
    if (!teamA || !teamB) throw new Error('模拟器需要双方面板');
    var strat = strategyById(o.strategyId || 'counter');
    var n = clamp(Math.floor(o.simulations || 2000), 100, 20000);
    var seed = typeof o.seed === 'number' ? o.seed : 20261105;
    var rng = mulberry32(seed);
    var wins = 0;
    var draws = 0;
    var diffSum = 0;
    var scoreA = 0;
    var scoreB = 0;
    var exhaustRounds = [];
    var scoresA = [];
    var scoresB = [];
    for (var i = 0; i < n; i++) {
      var r = simulateOne(teamA, teamB, strat, rng);
      if (r.winner === 'A') wins += 1;
      else if (r.winner === 'draw') draws += 1;
      diffSum += r.scoreA - r.scoreB;
      scoreA += r.scoreA;
      scoreB += r.scoreB;
      scoresA.push(r.scoreA);
      scoresB.push(r.scoreB);
      if (r.exhaustA != null) exhaustRounds.push(r.exhaustA);
    }
    var winRate = wins / n;
    var drawRate = draws / n;
    var lossRate = 1 - winRate - drawRate;

    // 属性贡献度：把 attack / defense / stamina 各 +10% 看胜率变化
    var base = winRate;
    var contribution = [];
    [
      { key: 'attack', label: '进攻（投射/攻筐）' },
      { key: 'defense', label: '防守（防投/护筐）' },
      { key: 'stamina', label: '体能/耐力（力竭时点）' },
      { key: 'will', label: '意志（看破/克制）' }
    ].forEach(function (item) {
      var boostedA = Object.assign({}, teamA);
      boostedA[item.key] = (boostedA[item.key] || 100) * 1.1;
      var rng2 = mulberry32(seed);
      var w2 = 0;
      var rounds = Math.max(400, Math.round(n / 3));
      for (var j = 0; j < rounds; j++) {
        var rr = simulateOne(boostedA, teamB, strat, rng2);
        if (rr.winner === 'A') w2 += 1;
      }
      contribution.push({
        key: item.key,
        label: item.label,
        delta: w2 / rounds - base
      });
    });
    var maxDelta = Math.max.apply(null, contribution.map(function (c) { return Math.abs(c.delta); }).concat([1e-9]));
    contribution.forEach(function (c) {
      c.share = Math.abs(c.delta) / maxDelta;
    });
    contribution.sort(function (a, b) { return Math.abs(b.delta) - Math.abs(a.delta); });

    return {
      simulations: n,
      seed: seed,
      strategy: strat,
      winRate: winRate,
      drawRate: drawRate,
      lossRate: lossRate,
      avgScoreA: scoreA / n,
      avgScoreB: scoreB / n,
      avgDiff: diffSum / n,
      scoreDiffP25: percentile(scoresA.map(function (v, idx) { return v - scoresB[idx]; }), 0.25),
      scoreDiffP75: percentile(scoresA.map(function (v, idx) { return v - scoresB[idx]; }), 0.75),
      exhaustMean: exhaustRounds.length
        ? exhaustRounds.reduce(function (a, b) { return a + b; }, 0) / exhaustRounds.length
        : null,
      exhaustP25: percentile(exhaustRounds, 0.25),
      exhaustP75: percentile(exhaustRounds, 0.75),
      exhaustCount: exhaustRounds.length,
      contribution: contribution,
      assumptions: ASSUMPTIONS,
      caveat: 'beta/示意：命中函数、回合数、力竭衰减未确认；相对比较可用，绝对胜率勿当硬结论。'
    };
  }

  return {
    STRATEGIES: STRATEGIES,
    ASSUMPTIONS: ASSUMPTIONS,
    strategyById: strategyById,
    mulberry32: mulberry32,
    deriveTeamProfile: deriveTeamProfile,
    simulateOne: simulateOne,
    simulate: simulate
  };
});

/*!
 * core/growth.js —— 养成计算器核心（T5）
 *
 * 数据来源：
 *  - knowledge/model.json → growth（等级/星级/天赋/羁绊/重置规则）
 *  - knowledge/model.json → attributes.derived_rules.attribute_curve（潜力→属性预测）
 *  - knowledge/model.json → roster.algorithm.position_weights（投入分配权重）
 *  - data/structured/derived_roster.json（角色潜力/属性）
 *
 * 纪律：等级成长曲线、星级/天赋/羁绊系数多数未确证 → 全部标「推断/待验证」，
 * 计算器只给「已知部分 + 未知项区间」，不假装精确。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.growth = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var CODEX_ATTRS = ['投射', '攻筐', '防投', '护筐', '传球', '突破'];

  function getModel() {
    var B = (typeof globalThis !== 'undefined' && globalThis.BBT) || {};
    return B.model || (typeof globalThis !== 'undefined' ? globalThis.BBTModel : null) || null;
  }

  function getRoster() {
    var B = (typeof globalThis !== 'undefined' && globalThis.BBT) || {};
    return B.rosterData || (typeof globalThis !== 'undefined' ? globalThis.BBRosterData : null) || null;
  }

  /** 稀有度拟合曲线参数：attr ≈ a + b × potential */
  function curveParams() {
    var m = getModel();
    var p =
      m &&
      m.attributes &&
      m.attributes.derived_rules &&
      m.attributes.derived_rules.attribute_curve &&
      m.attributes.derived_rules.attribute_curve.params;
    return p || {
      SSR: { a: 107.115, b: 0.5508 },
      SR: { a: 98.544, b: 0.5014 },
      R: { a: 100.026, b: 0.3612 }
    };
  }

  function predictAttribute(rarity, potential) {
    var params = curveParams();
    var p = params[rarity] || params.SSR;
    var pot = isFinite(potential) ? Number(potential) : 0;
    return p.a + p.b * pot;
  }

  function toPotentialMap(ch) {
    if (!ch) return null;
    if (ch.potentials && typeof ch.potentials === 'object' && !Array.isArray(ch.potentials)) {
      return ch.potentials;
    }
    if (ch.potential_vector_named) return ch.potential_vector_named;
    if (Array.isArray(ch.potentials) && ch.potentials.length === 6) {
      var out = {};
      ch.potentials.forEach(function (slot, i) {
        out[CODEX_ATTRS[i]] = slot && typeof slot === 'object' ? slot.value : slot;
      });
      return out;
    }
    return null;
  }

  /** 由稀有度 + 潜力预测 C 层六维（图鉴口径）。 */
  function predictPanel(rarity, potentials) {
    var map = potentials;
    if (Array.isArray(map) && map.length === 6 && typeof map[0] === 'object') {
      var m = {};
      map.forEach(function (slot, i) {
        m[CODEX_ATTRS[i]] = slot && typeof slot === 'object' ? slot.value : slot;
      });
      map = m;
    }
    var out = {};
    CODEX_ATTRS.forEach(function (attr) {
      out[attr] = predictAttribute(rarity, map && map[attr]);
    });
    return out;
  }

  /**
   * 预测某角色的 C 层面板，并与 wiki 参考值对比残差。
   * @returns {Object} { name, predicted, actual, residuals, mae, maxAbs, usable }
   */
  function predictCharacter(ch) {
    if (!ch) return null;
    var potentials = toPotentialMap(ch);
    if (!potentials || !ch.stats) {
      return { name: ch.name, predicted: null, actual: ch.stats || null, residuals: null, usable: false };
    }
    var predicted = predictPanel(ch.rarity, potentials);
    var residuals = {};
    var abs = [];
    CODEX_ATTRS.forEach(function (attr) {
      var actual = ch.stats[attr];
      if (typeof actual === 'number') {
        residuals[attr] = actual - predicted[attr];
        abs.push(Math.abs(residuals[attr]));
      } else {
        residuals[attr] = null;
      }
    });
    var mae = abs.length ? abs.reduce(function (a, b) { return a + b; }, 0) / abs.length : null;
    return {
      name: ch.name,
      rarity: ch.rarity,
      predicted: predicted,
      actual: ch.stats,
      residuals: residuals,
      mae: mae,
      maxAbs: abs.length ? Math.max.apply(null, abs) : null,
      usable: mae != null
    };
  }

  /** 成长构成拆解：只列模型里有的部分，并标置信度。 */
  function composition() {
    var m = getModel();
    var g = (m && m.growth) || {};
    var comp = (g.panel_attribute_composition && g.panel_attribute_composition.components) || {};
    var items = [];
    if (g.panel_attribute_composition) {
      items.push({
        id: 'base_potential',
        label: '潜力曲线基础值',
        detail: 'attr ≈ a_稀有度 + b_稀有度 × 潜力',
        confidence: '多源一致',
        status: 'known',
        note: '可用图鉴潜力预测（本页面板预测器）'
      });
      items.push({
        id: 'level_growth',
        label: '等级成长',
        detail: (comp.level_growth && comp.level_growth.value) || '曲线未知',
        confidence: (comp.level_growth && comp.level_growth.confidence) || '推断',
        status: 'unknown',
        note: '需要同角色 LV1/LV10/LV20 面板截图（验证器 V7）'
      });
      items.push({
        id: 'star',
        label: '星级 / 天赋',
        detail: '1★ 训练开始额外 30 随机属性；2★ 训练加成 +3%（示例：佐久间雨乃）',
        confidence: (comp.star_bonus && comp.star_bonus.confidence) || '多源一致',
        status: 'partial',
        note: '角色各异；同名天赋只生效高级天赋'
      });
      items.push({
        id: 'bond',
        label: '学园羁绊',
        detail: '示例：上阵 5 名明日叶学园 → 弹跳 +15%（非通用）',
        confidence: (comp.school_bond && comp.school_bond.confidence) || '多源一致',
        status: 'partial',
        note: '各学园加成不同，具体组合需实测'
      });
      items.push({
        id: 'equipment',
        label: '器材 / 笔记',
        detail: '对口 +1（训练公式内）、熟练度训练加成（+10→+41 示例）、暴击、专属技能',
        confidence: '待验证',
        status: 'partial',
        note: '熟练度曲线未确证（验证器 V8）'
      });
    }
    return items;
  }

  function starEffects() {
    var m = getModel();
    var sb =
      m && m.growth && m.growth.panel_attribute_composition && m.growth.panel_attribute_composition.components
        ? m.growth.panel_attribute_composition.components.star_bonus
        : null;
    return [
      {
        title: '1★ · 训练开始时额外获得 30 随机属性',
        kind: '升星',
        confidence: (sb && sb.confidence) || '多源一致',
        note: '「初始随机属性」，不进单次训练公式；随机分配规则未记录。'
      },
      {
        title: '2★ · 训练加成 +3%',
        kind: '升星',
        confidence: (sb && sb.confidence) || '多源一致',
        note: '进 training_bonus 加算乘区（本工具「Σ训练加成」参数）'
      }
    ];
  }

  /** 重置规则：50 级前免费重置。 */
  function resetGuidance(level) {
    var m = getModel();
    var r = (m && m.growth && m.growth.reset_rules) || {};
    var freeUntil = (r.free_until_level && r.free_until_level.value) || 50;
    var cost = (r.reset_cost_after && r.reset_cost_after.value) || 200;
    var lv = isFinite(level) ? Number(level) : 1;
    return {
      freeUntil: freeUntil,
      costAfter: cost,
      isFree: lv <= freeUntil,
      message:
        lv <= freeUntil
          ? '当前等级 ≤ ' + freeUntil + '：重置免费返还全部资源，过渡球员放心换。'
          : '当前等级 > ' + freeUntil + '：重置需 ' + cost + ' 钻石（多源一致，公测待验证）。',
      confidence: (r.free_until_level && r.free_until_level.confidence) || '多源一致'
    };
  }

  /** 位置权重（来自 T3 roster.algorithm）：进攻/防守/组织 三轴。 */
  function positionWeights(position) {
    var m = getModel();
    var w =
      m && m.roster && m.roster.algorithm && m.roster.algorithm.position_weights
        ? m.roster.algorithm.position_weights
        : null;
    if (w && w[position]) return w[position];
    return { attack: 0.4, defense: 0.4, organize: 0.2 };
  }

  /** 六维属性对「位置加权得分」的边际权重（每点属性值）。 */
  function attributeMarginalWeights(position) {
    var w = positionWeights(position);
    // attack=(投射+攻筐)/2, defense=(防投+护筐)/2, organize=(传球+突破)/2
    return {
      投射: w.attack / 2,
      攻筐: w.attack / 2,
      防投: w.defense / 2,
      护筐: w.defense / 2,
      传球: w.organize / 2,
      突破: w.organize / 2
    };
  }

  /**
   * 资源投入分配（简单优化）：预算 N 点属性，按边际递减假设（Σ w × √(base+投入)）
   * 求最优分配。闭式解：投入_i ∝ (w_i / λ)² / 1 - base_i，用贪心逐点分配更稳。
   * @returns {Array<{attr, weight, base, invest}>}
   */
  function allocateBudget(position, baseStats, budget) {
    var weights = attributeMarginalWeights(position);
    var remaining = Math.max(0, Math.floor(isFinite(budget) ? Number(budget) : 0));
    var stats = {};
    CODEX_ATTRS.forEach(function (attr) {
      stats[attr] = baseStats && typeof baseStats[attr] === 'number' ? baseStats[attr] : 100;
    });
    var invest = {};
    CODEX_ATTRS.forEach(function (attr) { invest[attr] = 0; });
    while (remaining > 0) {
      var bestAttr = null;
      var bestGain = -Infinity;
      CODEX_ATTRS.forEach(function (attr) {
        var w = weights[attr] || 0;
        var cur = stats[attr] + invest[attr];
        // 边际收益 ∝ w / √(cur)，模拟收益递减
        var gain = w / Math.sqrt(Math.max(1, cur));
        if (gain > bestGain) {
          bestGain = gain;
          bestAttr = attr;
        }
      });
      if (!bestAttr) break;
      invest[bestAttr] += 1;
      remaining -= 1;
    }
    return CODEX_ATTRS.map(function (attr) {
      return {
        attr: attr,
        weight: weights[attr],
        base: stats[attr],
        invest: invest[attr]
      };
    });
  }

  /** 汇总：图鉴玩家的预测面板（优先用 derived_roster 数据）。 */
  function rosterGrowthTable() {
    var roster = getRoster();
    if (!roster || !Array.isArray(roster.players)) return [];
    return roster.players
      .filter(function (p) { return p.stats && p.potentials; })
      .map(function (p) {
        var predicted = predictPanel(p.rarity, p.potentials);
        var residualSum = 0;
        var n = 0;
        CODEX_ATTRS.forEach(function (attr) {
          if (p.stats[attr] != null && predicted[attr] != null) {
            residualSum += p.stats[attr] - predicted[attr];
            n += 1;
          }
        });
        return {
          contentId: p.contentId,
          name: p.name,
          rarity: p.rarity,
          position: p.position,
          predicted: predicted,
          actual: p.stats,
          meanResidual: n ? residualSum / n : null,
          growthValue: p.scores && p.scores.growth ? p.scores.growth.base_pct : null
        };
      });
  }

  return {
    CODEX_ATTRS: CODEX_ATTRS,
    curveParams: curveParams,
    predictAttribute: predictAttribute,
    predictPanel: predictPanel,
    predictCharacter: predictCharacter,
    toPotentialMap: toPotentialMap,
    composition: composition,
    starEffects: starEffects,
    resetGuidance: resetGuidance,
    positionWeights: positionWeights,
    attributeMarginalWeights: attributeMarginalWeights,
    allocateBudget: allocateBudget,
    rosterGrowthTable: rosterGrowthTable
  };
});

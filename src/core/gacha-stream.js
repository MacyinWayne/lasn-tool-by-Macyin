/*!
 * core/gacha-stream.js —— 「扭蛋流」育成流派模型（纯函数，无 DOM；浏览器与 Node 双端可用）
 *
 * 来源（2026-11-08 玩家一局完整扭蛋流实证 + 游戏内文本）：
 *   - 五人格天赋（步行街扭蛋体系）：野上 / 羽濑川 / 千圣 / 先斗 / 卧云
 *   - 扭蛋系列：增加 / 暴涨·猛增 / 推荐属性 / 专注 / 全属性增加 / 笔记继承 / 额外零用钱 / 超前消费 / 延迟满足 / 训练向
 *   - 乘区：千圣 ×1.3（增强版再 ×1.15）· 先斗 44% ×1.3 · 卧云 40% 升级增强版 · 羽濑川最多 5 连买
 *   - 新境界：属性 ≥1200 后收益 ÷2（向下取整）；属性硬上限处 0 收益
 *   - 打工：初级 110 / 中级 135 / 高级 160 + 小费 40/50/100/150 + 陪练 10/人；急招翻倍
 *
 * 数值均为玩家实测，不代表官方；概率/乘区仍待更多样本校准。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.gachaStream = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function num(v, d) {
    var n = typeof v === 'number' ? v : parseFloat(v);
    return isFinite(n) ? n : d;
  }
  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  /* ---------------- 扭蛋品质 ---------------- */
  // base = 主练单属性基础值（实测：蓝 +30 / 紫 +48 / 金 +72 / 彩 +100）
  var QUALITIES = [
    { id: 'blue', name: '蓝', price: 60, base: 30 },
    { id: 'purple', name: '紫', price: 80, base: 48 },
    { id: 'gold', name: '金', price: 100, base: 72 },
    { id: 'rainbow', name: '彩', price: 120, base: 100 }
  ];

  /* ---------------- 扭蛋系列 ---------------- */
  var SERIES = [
    {
      id: 'noteInherit', name: '笔记继承', kind: 'special', priority: 1,
      price: 120, desc: '立刻触发 1 次笔记继承（局内唯一第三次学习机会）', note: '打折时 60；见到直接买'
    },
    {
      id: 'positionSwing', name: '获得一个新位置', kind: 'special', priority: 1,
      desc: '随机获得一个新位置，并把该位置适性提升到紫色（初始颜色）',
      note: '增强款→金色；之后触发一次笔记词条→彩色。新位置随机，需按目标位置备好适性笔记'
    },
    {
      id: 'increase', name: '增加', kind: 'attr', priority: 1,
      desc: '主力单属性高值，吃全部乘区（扭蛋流核心）',
      enhancedExtra: { blue: 6, purple: 10, gold: 14, rainbow: 27 }, note: '增强款额外吃 ×1.15'
    },
    {
      id: 'boost', name: '暴涨 / 猛增', kind: 'attr', priority: 1,
      desc: '超高数值 + 负面（如一周不能从训练获得该属性）',
      base: { gold: 100 }, enhancedExtra: { gold: 30 }, note: '暴涨增强款删负面；猛增增强款只加值；扭蛋流训练少 → 负面几乎无痛'
    },
    {
      id: 'money', name: '额外零用钱', kind: 'money', priority: 2,
      desc: '接下来每个周六开始前获得零用钱（基础 80 / 增强 120）', note: '钱引擎，越早买越好'
    },
    {
      id: 'overspend', name: '超前消费', kind: 'money', priority: 2,
      desc: '立刻获得 300 零用钱；所有打工基础零用钱 -60', note: '只适合最后 1~2 周（不再打工时）；零花钱类也吃加成 → 实际可达 ~519'
    },
    {
      id: 'recommend', name: '推荐属性', kind: 'attr', priority: 2,
      desc: '主力两项推荐属性各提升一半', note: '等价半份「增加」×2；紫 ≈ 两项各 +24'
    },
    {
      id: 'focus', name: '专注', kind: 'attr', priority: 3,
      desc: '消耗所有精力，训练主力获得较高单属性（蓝 ≈ 紫级数值）', note: '增强款删「消耗全部精力」负面'
    },
    {
      id: 'delay', name: '延迟满足', kind: 'attr', priority: 3,
      desc: '5 天后全队成员获得全属性 +13', enhancedExtra: {}, note: '增强款 = 不需等待立刻获得；看剩余回合'
    },
    {
      id: 'allAttr', name: '全属性增加', kind: 'attr', priority: 4,
      desc: '主力全属性 +4（合计 24 点），无增幅', note: '总收益低于单属性「增加」'
    },
    {
      id: 'training', name: '训练向（升级包/训练增强/器材/精力转换/精力恢复）', kind: 'skip', priority: 9,
      desc: '训练流专用；扭蛋流不买', note: '页面里这类占位多，会稀释好扭蛋'
    }
  ];

  /* ---------------- 五人格（扭蛋流最佳配置） ---------------- */
  var PERSONAS = [
    {
      name: '羽濑川 凑', role: '核心·多买', ev: '购买次数 ×2.04（期望）',
      talent: '购买扭蛋后，首次必定触发「再买一次」，后续 53% 概率再买，总计最多 5 个扭蛋',
      value: 2.04, valueText: '单次购买期望 2.04 颗（基础 1 颗）→ 扭蛋总量 +104%',
      keep: true
    },
    {
      name: '千圣·贝尔丝', role: '常驻乘区', ev: '全体属性扭蛋 ×1.30（增强版 ×1.45）',
      talent: '全部扭蛋获得的加成额外增加 30%；增强版扭蛋再增加 15%；对状态类扭蛋无效',
      value: 1.3, valueText: '常驻 ×1.30，增强款额外 ×1.15 → 扭蛋属性 +30%~49%',
      keep: true
    },
    {
      name: '野上 泷', role: '时间/钱件', ev: '每周多 1 次出行 + 22 零花钱 + 首轮扭蛋增强',
      talent: '每个周五均可出行，并获得 22 零用钱；有概率触发扭蛋活动；首轮扭蛋全部为增强版',
      value: 1.4, valueText: '每周多 1 次出行行动（多一次买扭蛋/打工）+ 22 钱/周 + 首轮增强',
      keep: true
    },
    {
      name: '卧云 真昼', role: '质量升级', ev: '40% 概率升级为增强版 → 期望 +15%~20%',
      talent: '在步行街玩扭蛋时，扭蛋有 40% 概率升级为增强版扭蛋',
      value: 1.15, valueText: '增强版 = 额外值 + 吃千圣 ×1.15；钱类扭蛋 80→120（+50%）→ 期望 +15~20%',
      keep: true
    },
    {
      name: '先斗 琉夏', role: '小乘区', ev: '44% 概率 ×1.3 → 期望 +13.2%',
      talent: '在步行街购买扭蛋时，有 44% 概率使扭蛋效果提升 30%，对状态类扭蛋无效',
      value: 1.132, valueText: 'EV = 1+0.44×0.3 = ×1.132（五人格中最低）',
      keep: false
    }
  ];

  /* ---------------- 乘区 / 机制 ---------------- */
  var MULTIPLIERS = {
    qiSheng: { rate: 1.3, enhancedRate: 1.15, label: '千圣' },
    xianDou: { prob: 0.44, rate: 1.3, label: '先斗' },
    woYun: { prob: 0.4, label: '卧云' },
    yuLaiChuan: { extraProb: 0.53, maxBuys: 5, label: '羽濑川' },
    newRealm: { threshold: 1200, divisor: 2, label: '新境界' }
  };

  var WORK_LEVELS = [
    { id: 'junior', name: '初级服务员', base: 110, expNext: 2 },
    { id: 'mid', name: '中级服务员', base: 135, expNext: 3 },
    { id: 'senior', name: '高级服务员', base: 160, expNext: 0 }
  ];
  var TIP_LEVELS = [40, 50, 100, 150];
  var COMPANION_BONUS = 10;

  /* ---------------- 期望连买次数（羽濑川） ---------------- */
  function expectedBuys(extraProb, maxBuys) {
    var p = num(extraProb, 0.53);
    var max = Math.max(1, Math.floor(num(maxBuys, 5)));
    var e = 1;
    var prob = 1;
    for (var i = 1; i < max; i++) {
      prob *= p;
      e += prob;
    }
    return e;
  }

  function quality(id) {
    for (var i = 0; i < QUALITIES.length; i++) if (QUALITIES[i].id === id) return QUALITIES[i];
    return QUALITIES[0];
  }
  function series(id) {
    for (var i = 0; i < SERIES.length; i++) if (SERIES[i].id === id) return SERIES[i];
    return SERIES[1];
  }

  /** 系列在某品质下的基础值 & 增强额外值 */
  function seriesBase(seriesId, qualityId, enhanced) {
    var s = series(seriesId);
    var q = quality(qualityId);
    var base = q.base;
    if (s.base && typeof s.base[q.id] === 'number') base = s.base[q.id];
    if (s.id === 'recommend') base = Math.round(q.base / 2);
    if (s.id === 'allAttr') base = 4;
    if (s.id === 'delay') base = 13;
    var extra = s.enhancedExtra && typeof s.enhancedExtra[q.id] === 'number' ? s.enhancedExtra[q.id] : 0;
    return { base: base, enhancedExtra: enhanced ? extra : 0 };
  }

  /**
   * 扭蛋实际属性收益（含乘区 / 新境界 / 上限截断）。
   * @param {Object} opts
   *   base 基础值, enhancedExtra 增强额外值, enhanced 是否增强款,
   *   currentAttr 当前属性值, cap 属性上限,
   *   qiSheng 千圣是否在场(默认true), xianDouTriggered 先斗是否触发(默认false),
   *   isMoney 是否为零花钱类（只吃千圣/先斗，不吃新境界/上限）
   * @returns {{steps:Array, raw:number, afterRealm:number, gain:number, halved:boolean, capLeft:number, capped:boolean}}
   */
  function computeGain(opts) {
    var o = opts || {};
    var base = num(o.base, 0);
    var extra = o.enhanced ? num(o.enhancedExtra, 0) : 0;
    var current = num(o.currentAttr, 0);
    var cap = o.cap === undefined || o.cap === null ? Infinity : num(o.cap, Infinity);
    var steps = [];
    steps.push({ label: '基础值', value: base });
    if (extra > 0) steps.push({ label: '增强额外 +' + extra, value: extra });
    var total = base + extra;
    if (o.qiSheng !== false) {
      total *= MULTIPLIERS.qiSheng.rate;
      steps.push({ label: '千圣 ×1.30', value: total });
      if (o.enhanced) {
        total *= MULTIPLIERS.qiSheng.enhancedRate;
        steps.push({ label: '增强 ×1.15（千圣增强）', value: total });
      }
    }
    if (o.xianDouTriggered) {
      total *= MULTIPLIERS.xianDou.rate;
      steps.push({ label: '先斗 ×1.30（44% 触发）', value: total });
    }
    var raw = total;
    var halved = false;
    if (!o.isMoney && current >= MULTIPLIERS.newRealm.threshold) {
      total = total / MULTIPLIERS.newRealm.divisor;
      halved = true;
      steps.push({ label: '新境界（≥1200）÷2', value: total });
    }
    var gain = Math.floor(total);
    var capLeft = isFinite(cap) ? Math.max(0, cap - current) : Infinity;
    var capped = false;
    if (gain > capLeft) {
      gain = capLeft;
      capped = true;
      steps.push({ label: '属性上限截断', value: gain });
    }
    return {
      steps: steps,
      raw: raw,
      afterRealm: total,
      gain: gain,
      halved: halved,
      capLeft: capLeft,
      capped: capped
    };
  }

  /* ---------------- 周金钱收支 ---------------- */
  /**
   * 每周打工收入。
   * @param {Object} opts workTimes(次), level('junior'|'mid'|'senior'), tips(每次小费均值),
   *   companions(每次陪练数), urgent(急招翻倍), saturdaySubsidy(周六补助金额), overspend(超前消费一次性)
   */
  function weeklyMoney(opts) {
    var o = opts || {};
    var lv = WORK_LEVELS[0];
    for (var i = 0; i < WORK_LEVELS.length; i++) if (WORK_LEVELS[i].id === o.level) lv = WORK_LEVELS[i];
    var times = Math.max(0, Math.floor(num(o.workTimes, 0)));
    var tips = Math.max(0, num(o.tips, 0));
    var companions = Math.max(0, Math.floor(num(o.companions, 0)));
    var urgent = o.urgent ? 2 : 1;
    var perWork = lv.base + tips + companions * COMPANION_BONUS;
    var workTotal = perWork * urgent * times;
    var subsidy = Math.max(0, num(o.saturdaySubsidy, 0));
    var overspend = Math.max(0, num(o.overspend, 0));
    var steps = [];
    if (times > 0) {
      steps.push({ label: lv.name + ' ×' + times + '（基础' + lv.base + (urgent > 1 ? '，急招×2' : '') + (tips ? '，小费+' + tips : '') + (companions ? '，陪练+' + companions * COMPANION_BONUS : '') + '）', value: workTotal });
    }
    if (subsidy > 0) steps.push({ label: '周六补助（扭蛋）', value: subsidy });
    if (overspend > 0) steps.push({ label: '超前消费（一次性）', value: overspend });
    return { steps: steps, total: workTotal + subsidy + overspend, perWork: perWork };
  }

  /* ---------------- 4 拖 1：踢谁 ---------------- */
  /**
   * 五人格支持价值排名 + 推荐踢出者。
   * @returns {{ranking:Array, kick:Object, reason:string, buyExpectation:number}}
   */
  function carry4() {
    var ranking = PERSONAS.slice().sort(function (a, b) { return b.value - a.value; });
    var kick = null;
    for (var i = ranking.length - 1; i >= 0; i--) {
      if (!ranking[i].keep) { kick = ranking[i]; break; }
    }
    if (!kick) kick = ranking[ranking.length - 1];
    var reasons = [];
    reasons.push('「四拖一」= 4 名扭蛋流支持 + 1 名体系外主练；不支持位置适性影响（训练不看位置）。');
    reasons.push('必留：羽濑川（单次购买期望 ' + expectedBuys(MULTIPLIERS.yuLaiChuan.extraProb, MULTIPLIERS.yuLaiChuan.maxBuys).toFixed(2) + ' 颗，扭蛋总量翻倍）→ 千圣（常驻 ×1.30）→ 野上（每周多 1 次出行 + 22 零花钱 + 首轮增强）。');
    reasons.push('剩下 卧云（40% 升级增强版，期望 +15%~20%，还能把「额外零用钱」80→120）vs 先斗（44%×1.3，期望 +13.2%）→ **踢先斗**，卧云期望更高且能拉高钱的扭蛋。');
    return {
      ranking: ranking.map(function (p) {
        return {
          name: p.name, role: p.role, talent: p.talent, value: p.value,
          valueText: p.valueText, keep: p.keep, isKick: p === kick
        };
      }),
      kick: { name: kick.name, role: kick.role, talent: kick.talent, valueText: kick.valueText },
      reason: reasons.join('\n'),
      buyExpectation: expectedBuys(MULTIPLIERS.yuLaiChuan.extraProb, MULTIPLIERS.yuLaiChuan.maxBuys)
    };
  }

  /* ---------------- 购买优先级 ---------------- */
  function purchasePriority() {
    return SERIES.filter(function (s) { return s.kind !== 'skip'; })
      .sort(function (a, b) { return a.priority - b.priority; })
      .map(function (s) {
        return { id: s.id, name: s.name, priority: s.priority, desc: s.desc, note: s.note || '', kind: s.kind };
      });
  }

  /** 给定预算可买几颗（混品质近似：全蓝/全紫/全金/全彩） */
  function budgetPlan(money) {
    var m = Math.max(0, num(money, 0));
    return QUALITIES.map(function (q) {
      return { quality: q.name, price: q.price, count: Math.floor(m / q.price) };
    });
  }

  return {
    QUALITIES: QUALITIES,
    SERIES: SERIES,
    PERSONAS: PERSONAS,
    MULTIPLIERS: MULTIPLIERS,
    WORK_LEVELS: WORK_LEVELS,
    TIP_LEVELS: TIP_LEVELS,
    COMPANION_BONUS: COMPANION_BONUS,
    expectedBuys: expectedBuys,
    quality: quality,
    series: series,
    seriesBase: seriesBase,
    computeGain: computeGain,
    weeklyMoney: weeklyMoney,
    carry4: carry4,
    purchasePriority: purchasePriority,
    budgetPlan: budgetPlan
  };
});

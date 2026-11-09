/*!
 * core/mechanics.js —— 机制资料卡（非公式参数，但必须标注来源/置信度）
 *
 * 内容来自 Lead 提供的「内测截图人工 OCR」+ README 已核实事实。
 * 这些是「机制地图」：解释属性怎么来、卡牌怎么映射、有哪些角色技能特例。
 * 所有条目都带 confidence 与 source，UI 统一渲染。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.mechanics = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var CAPTURE_DATE = '2026-11-05';
  var OCR_SOURCE = '内测截图人工 OCR（Lead 提供，' + CAPTURE_DATE + '）';

  /**
   * 攻防卡属性映射。
   * 内测截图：进攻红卡 = 100% 弹跳；绿卡 = 100% 投射；蓝卡 = 100% 运控；
   * 防守卡 = 30% 对应属性 + 70% 防守。
   * 公测面板六维为 投射 / 攻筐 / 防投 / 护筐 / 传球 / 突破，术语需按公测校对。
   */
  var CARD_MAPPINGS = [
    {
      id: 'paint-attack',
      side: '进攻',
      colorName: '红卡',
      color: 'red',
      cardName: '篮下进攻',
      actions: ['扣篮', '勾手', '背打'],
      weights: [{ attr: '弹跳', pct: 100 }],
      confidence: '单源',
      source: OCR_SOURCE,
      note: '内测属性名「弹跳」在公测面板中可能对应「攻筐 / 护筐」相关项，待校对。'
    },
    {
      id: 'inside-attack',
      side: '进攻',
      colorName: '绿卡',
      color: 'green',
      cardName: '内线',
      actions: ['上篮', '中投', '背打'],
      weights: [{ attr: '投射', pct: 100 }],
      confidence: '单源',
      source: OCR_SOURCE,
      note: '「投射」与公测面板「投射」同名，可信度相对更高。'
    },
    {
      id: 'outside-attack',
      side: '进攻',
      colorName: '蓝卡',
      color: 'blue',
      cardName: '外线',
      actions: ['横移', '三分', '突破'],
      weights: [{ attr: '运控', pct: 100 }],
      confidence: '单源',
      source: OCR_SOURCE,
      note: '「运控」可能对应公测「突破 / 传球」，待校对。'
    },
    {
      id: 'defense',
      side: '防守',
      colorName: '防守卡',
      color: 'slate',
      cardName: '防守',
      actions: ['盖帽', '盯防', '抢断'],
      weights: [
        { attr: '对应属性', pct: 30 },
        { attr: '防守', pct: 70 }
      ],
      confidence: '单源',
      source: OCR_SOURCE,
      note: '防守卡是混合权重：30% 对应属性 + 70% 防守；对应属性随卡牌动作不同。'
    }
  ];

  /** 训练流角色技能 / 升星效果示例（内测截图 OCR）。 */
  var TRAINING_MECHANICS = [
    {
      id: 'sakuma-ameno',
      title: '佐久间 雨乃 · 队友训练增益',
      kind: '角色技能',
      text: '进行队友训练时，训练主属性 +3，且 50% 概率额外再获得 2 点训练主属性。',
      expectedFlatBonus: 4,
      expectedFormula: '3 + 50% × 2 = 4 点 / 次（期望值）',
      confidence: '单源',
      source: OCR_SOURCE,
      note: '固定 +3 与随机 +2 都计入训练收益；期望值用于长期规划，单次实际在 +3 或 +5 之间。'
    },
    {
      id: 'star-training-attr',
      title: '升星效果 · 训练开始随机属性',
      kind: '升星',
      text: '训练开始时额外获得 30 随机属性。',
      expectedFlatBonus: null,
      expectedFormula: '30 点随机属性 / 次（不进入单次训练收益公式）',
      confidence: '单源',
      source: OCR_SOURCE,
      note: '随机属性按面板分配规则落地，具体分配权重未记录；T5 养成计算器再建模。'
    },
    {
      id: 'star-training-bonus',
      title: '升星效果 · 训练加成 +3%',
      kind: '升星',
      text: '2 星效果：训练加成 +3%。',
      expectedFlatBonus: null,
      expectedFormula: '训练加成 100% → 103%（乘区）',
      confidence: '单源',
      source: OCR_SOURCE,
      note: '对应「训练加成」参数 +3 个百分点；是否与其他加成加算待验证。'
    }
  ];

  /** 属性 / 术语对照（README 已核实的版本差异）。 */
  var TERM_MAPPINGS = [
    {
      beta: '弹跳 / 运控 / 防守 / 体能 / 意志',
      live: '投射 / 攻筐 / 防投 / 护筐 / 传球 / 突破',
      confidence: '多源一致',
      source: 'README 已核实：社区公式多来自 2026 年 5–10 月测试期，属性命名需按公测证据校对'
    }
  ];

  /**
   * 卡牌映射的归一化：给定一张卡，返回它贡献到哪些属性、各多少。
   * @param {Object} mapping CARD_MAPPINGS 中的一项
   * @returns {Array<{attr:string, pct:number}>}
   */
  function cardWeights(mapping) {
    if (!mapping || !Array.isArray(mapping.weights)) return [];
    return mapping.weights.map(function (w) {
      return { attr: String(w.attr || ''), pct: Number(w.pct) || 0 };
    });
  }

  /**
   * 角色技能的期望固定加值：固定值 + 概率 × 额外值。
   * 用于佐久间雨乃：3 + 0.5 × 2 = 4。
   */
  function expectedFlatBonus(fixed, chance, extra) {
    var f = Number(fixed) || 0;
    var c = Number(chance) || 0;
    var e = Number(extra) || 0;
    return f + c * e;
  }

  /**
   * 面板 → 赛内属性换算（客户端回放确证）。
   *
   * 版本差异（client-analyst 交叉验证 3 场）：
   *  - 当前版本（replay_1 / replay_2）：赛内值 = 面板值，ratio = 1.0（默认）
   *  - 旧版回放（replay_0，旧格式）：A 层六属性 ×1.6；C 层 111/114/115 ×0.8
   *  - 个别球员在旧回放里出现 0.36~2.08 偏移（澪奈/皆川/五十岚/佐久间），疑为 buff/技能/状态修正
   * 因此工具默认 ×1.0（当前版本），1.6/0.8 仅作为「旧版回放（legacy）」可选开关，避免误导。
   */
  var BATTLE_CONVERSION = {
    currentMultiplier: 1.0,
    legacyMultiplier: 1.6,
    legacyLowMultiplier: 0.8,
    defaultMultiplier: 1.0,
    lowIds: [111, 114, 115],
    aLayer: [
      { id: 101, attr: '投射' },
      { id: 102, attr: '弹跳' },
      { id: 103, attr: '防守' },
      { id: 104, attr: '体能' },
      { id: 105, attr: '运控' },
      { id: 106, attr: '意识' }
    ],
    confidence: '客户端确证（当前版本 ratio=1.0；旧版回放 ×1.6/×0.8）',
    source: OCR_SOURCE + ' / APK 明文回放 3 场（client-analyst，2026-11-05）',
    note:
      '当前版本：面板值 = 赛内值（ratio 1.0，默认，客户端确证）；' +
      '旧版回放（legacy）：A 层六属性 ×1.6、C 层 111/114/115 ×0.8，可在模拟器里切到 1.6 复现旧对局；' +
      '个别球员旧回放偏移 0.36~2.08（澪奈/皆川/五十岚/佐久间），疑似 buff/技能/状态修正。' +
      '游戏内「评分 rank」≈ Σ A 层六属性（10 人样本 7 人精确相等，3 人 +15/+30 偏移）。'
  };

  /** 面板 A 层六属性 → 赛内等效值（默认 ×1.6，可传 multiplier 覆盖）。 */
  function battleConvertPanel(stats, multiplier) {
    var m = multiplier == null ? BATTLE_CONVERSION.defaultMultiplier : Number(multiplier);
    var out = {};
    (stats ? Object.keys(stats) : []).forEach(function (k) {
      out[k] = typeof stats[k] === 'number' ? stats[k] * m : null;
    });
    return out;
  }

  /** 评分 rank ≈ Σ A 层六属性。 */
  function scoreRankFromPanel(stats) {
    if (!stats) return null;
    var sum = 0;
    var n = 0;
    BATTLE_CONVERSION.aLayer.forEach(function (a) {
      if (typeof stats[a.attr] === 'number') {
        sum += stats[a.attr];
        n += 1;
      }
    });
    return n ? sum : null;
  }

  return {
    CAPTURE_DATE: CAPTURE_DATE,
    OCR_SOURCE: OCR_SOURCE,
    BATTLE_CONVERSION: BATTLE_CONVERSION,
    battleConvertPanel: battleConvertPanel,
    scoreRankFromPanel: scoreRankFromPanel,
    CARD_MAPPINGS: CARD_MAPPINGS,
    TRAINING_MECHANICS: TRAINING_MECHANICS,
    TERM_MAPPINGS: TERM_MAPPINGS,
    cardWeights: cardWeights,
    expectedFlatBonus: expectedFlatBonus
  };
});

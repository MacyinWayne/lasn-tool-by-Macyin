/*!
 * core/attribute-layers.js —— 三套属性维度（A/B/C 层）
 *
 * 来源（证据等级最高的「客户端确证」）：
 *   client-analyst 从客户端配置 cw_conf.archive（未加密）逆向确认，2026-11-05。
 *   - A 层：培养 / 训练 6 属性（游戏内面板 6 图标，训练公式用这套）
 *   - B 层：一级属性点数 5 类（进攻 / 防守 / 组织 / 对抗 / 体能）
 *   - C 层：二级比赛属性（GameKee 六维只是 C 层子集）
 *   训练配对表 edu_train_conf：每个训练项同时提升两项 A 层属性。
 *
 * 设计纪律：A 层用于训练计算，C 层用于图鉴 / 相对评分，两层不混算。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.attributeLayers = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var SOURCE = '客户端配置 cw_conf.archive 逆向确证（client-analyst，2026-11-05）';

  var CONFIDENCE = '客户端确证';

  /** A 层：培养 / 训练 6 属性。训练公式只认这一层。 */
  var LAYER_A = {
    id: 'A',
    name: '培养 / 训练六属性',
    short: 'A 层',
    usage: '训练公式、游戏内面板 6 图标',
    confidence: CONFIDENCE,
    source: SOURCE,
    note: '训练项按 edu_train_conf 配对同时提升两项 A 层属性；表情爆发按训练值放大。',
    attributes: [
      { id: 'shot', key: 'shot', name: '投射', desc: '投篮相关' },
      { id: 'jump', key: 'jump', name: '弹跳', desc: '弹跳 / 起跳相关' },
      { id: 'defense', key: 'defense', name: '防守', desc: '防守相关' },
      { id: 'stamina', key: 'stamina', name: '体能', desc: '体能 / 耐力相关' },
      { id: 'handle', key: 'handle', name: '运控', desc: '运球 / 控球相关' },
      { id: 'awareness', key: 'awareness', name: '意识', desc: '意识 / 球商相关' }
    ]
  };

  /** B 层：一级属性点数 5 类，各自加成一到两个 C 层二级属性。 */
  var LAYER_B = {
    id: 'B',
    name: '一级属性点数',
    short: 'B 层',
    usage: '点数投放 / 一级属性加点',
    confidence: CONFIDENCE,
    source: SOURCE,
    note: 'B 层点数通过映射提升 C 层比赛属性；加点性价比需要按目标 C 属性反推。',
    attributes: [
      { id: 'offense', key: 'offense', name: '进攻点数', mapping: ['投射', '攻筐'] },
      { id: 'defense', key: 'defense', name: '防守点数', mapping: ['防投', '护筐'] },
      { id: 'playmaking', key: 'playmaking', name: '组织点数', mapping: ['传球', '突破'] },
      { id: 'confrontation', key: 'confrontation', name: '对抗点数', mapping: ['篮板', '逼抢'] },
      { id: 'fitness', key: 'fitness', name: '体能点数', mapping: ['耐力', '爆发'] }
    ]
  };

  /**
   * C 层：二级比赛属性（14 项）。
   * GameKee 六维 = shot/attack_hoop/def_shot/def_attack_hoop/organization/dribble，
   * 只是 C 层子集；其余 8 项等待客户端补全数值来源。
   */
  var LAYER_C = {
    id: 'C',
    name: '二级比赛属性',
    short: 'C 层',
    usage: '图鉴六维、比赛结算、相对评分',
    confidence: CONFIDENCE,
    source: SOURCE,
    note: 'GameKee 六维是 C 层子集，图鉴可先展示；评分只允许在 C 层内部比较，不能与 A 层混算。',
    attributes: [
      { id: 'shot', key: 'shot', name: '投射', inCodex: true },
      { id: 'attack_hoop', key: 'attack_hoop', name: '攻筐', inCodex: true },
      { id: 'def_shot', key: 'def_shot', name: '防投', inCodex: true },
      { id: 'def_attack_hoop', key: 'def_attack_hoop', name: '护筐', inCodex: true },
      { id: 'organization', key: 'organization', name: '传球', inCodex: true },
      { id: 'dribble', key: 'dribble', name: '突破', inCodex: true },
      { id: 'rebound', key: 'rebound', name: '篮板', inCodex: false },
      { id: 'strength', key: 'strength', name: '逼抢', inCodex: false },
      { id: 'endurance', key: 'endurance', name: '耐力', inCodex: false },
      { id: 'explosive', key: 'explosive', name: '爆发', inCodex: false },
      { id: 'stamina', key: 'stamina', name: '体力', inCodex: false },
      { id: 'max_stamina', key: 'max_stamina', name: '体力上限', inCodex: false },
      { id: 'energy', key: 'energy', name: '能量', inCodex: false },
      { id: 'max_energy', key: 'max_energy', name: '能量上限', inCodex: false }
    ]
  };

  var LAYERS = [LAYER_A, LAYER_B, LAYER_C];

  /** GameKee 六维（C 层子集）在数据里的中文键名顺序。 */
  var CODEX_STAT_ORDER = ['投射', '攻筐', '防投', '护筐', '传球', '突破'];

  /**
   * 训练配对表：训练项 → 主属性 + 副属性（两项均为 A 层属性）。
   *
   * 证据更新（2026-11-05）：寒溟通过训练界面预测值实机验证，公测的固定绑定为
   *   投射→运控 / 弹跳→意识 / 防守→体能 / 体能→弹跳 / 运控→防守 / 意识→体能
   * 旧配对（弹跳→体能、体能→投射、运控→意识、意识→弹跳）已被实机推翻；
   * 客户端 edu_train_conf 原文与游戏内展示口径可能不同，以实机为准。
   * 实测截图：白神 Lv1（扭蛋队）投射 18/运控 6、弹跳 13/意识 5、防守 14/体能 ?、
   * 体能 14/弹跳 ?、运控 15/防守 6、意识 12/体能 6；副属性比例约 0.33~0.5。
   */
  var TRAINING_PAIR_SOURCE =
    '寒溟实机验证（训练界面预测值，2026-11-05 公测）+ 客户端 edu_train_conf 交叉';
  var TRAINING_PAIRS = [
    { id: 'shot', name: '投射训练', primary: '投射', secondary: '运控', confidence: '实测', source: TRAINING_PAIR_SOURCE },
    { id: 'jump', name: '弹跳训练', primary: '弹跳', secondary: '意识', confidence: '实测', source: TRAINING_PAIR_SOURCE },
    { id: 'defense', name: '防守训练', primary: '防守', secondary: '体能', confidence: '实测', source: TRAINING_PAIR_SOURCE },
    { id: 'stamina', name: '体能训练', primary: '体能', secondary: '弹跳', confidence: '实测', source: TRAINING_PAIR_SOURCE },
    { id: 'handle', name: '运控训练', primary: '运控', secondary: '防守', confidence: '实测', source: TRAINING_PAIR_SOURCE },
    { id: 'awareness', name: '意识训练', primary: '意识', secondary: '体能', confidence: '实测', source: TRAINING_PAIR_SOURCE }
  ];

  /** 心情档位（客户端确证数值）。 */
  var MOOD_OPTIONS = [
    { id: 'great', name: '极好', bonusPct: 20 },
    { id: 'good', name: '好', bonusPct: 10 },
    { id: 'normal', name: '一般', bonusPct: 0 },
    { id: 'bad', name: '差', bonusPct: -10 },
    { id: 'awful', name: '极差', bonusPct: -20 }
  ];

  /** 场地变体（结构客户端确证，数值待验证）。 */
  var VENUE_OPTIONS = [
    { id: 'normal', name: '普通训练场', bonusPct: 0, confidence: '推断' },
    { id: 'seaside', name: '海边训练', bonusPct: null, confidence: '待验证' }
  ];

  var A_BY_NAME = Object.create(null);
  LAYER_A.attributes.forEach(function (a) {
    A_BY_NAME[a.name] = a;
  });

  var C_BY_NAME = Object.create(null);
  LAYER_C.attributes.forEach(function (a) {
    C_BY_NAME[a.name] = a;
  });

  var PAIR_BY_ID = Object.create(null);
  TRAINING_PAIRS.forEach(function (p) {
    PAIR_BY_ID[p.id] = p;
  });

  function getLayer(id) {
    for (var i = 0; i < LAYERS.length; i++) {
      if (LAYERS[i].id === id) return LAYERS[i];
    }
    return null;
  }

  function getTrainingPair(id) {
    return PAIR_BY_ID[id] || TRAINING_PAIRS[0];
  }

  function trainingPairForAttr(attrName) {
    for (var i = 0; i < TRAINING_PAIRS.length; i++) {
      if (TRAINING_PAIRS[i].primary === attrName) return TRAINING_PAIRS[i];
    }
    return null;
  }

  function moodBonusOf(moodId) {
    for (var i = 0; i < MOOD_OPTIONS.length; i++) {
      if (MOOD_OPTIONS[i].id === moodId) return MOOD_OPTIONS[i].bonusPct;
    }
    return 0;
  }

  /** C 层中 GameKee 六维之外的属性（图鉴待补全清单）。 */
  function codexMissingAttributes() {
    return LAYER_C.attributes.filter(function (a) {
      return !a.inCodex;
    });
  }

  /** 校验数据：三层结构完整性（供自测）。返回错误数组。 */
  function validateLayers() {
    var errors = [];
    ['A', 'B', 'C'].forEach(function (id) {
      var layer = getLayer(id);
      if (!layer) errors.push('缺少 ' + id + ' 层');
      else if (!Array.isArray(layer.attributes) || !layer.attributes.length) {
        errors.push(id + ' 层缺少属性');
      }
    });
    if (TRAINING_PAIRS.length !== 6) errors.push('训练配对应为 6 项');
    var primaries = new Set();
    TRAINING_PAIRS.forEach(function (p) {
      if (!A_BY_NAME[p.primary]) errors.push('配对主属性不在 A 层：' + p.primary);
      if (!A_BY_NAME[p.secondary]) errors.push('配对副属性不在 A 层：' + p.secondary);
      if (primaries.has(p.primary)) errors.push('训练项主属性重复：' + p.primary);
      primaries.add(p.primary);
    });
    if (LAYER_C.attributes.length !== 14) errors.push('C 层应为 14 项');
    if (codexMissingAttributes().length !== 8) errors.push('GameKee 六维之外应有 8 项待补全');
    if (MOOD_OPTIONS.length !== 5) errors.push('心情档位应为 5 档');
    return errors;
  }

  return {
    SOURCE: SOURCE,
    CONFIDENCE: CONFIDENCE,
    LAYERS: LAYERS,
    LAYER_A: LAYER_A,
    LAYER_B: LAYER_B,
    LAYER_C: LAYER_C,
    CODEX_STAT_ORDER: CODEX_STAT_ORDER,
    TRAINING_PAIRS: TRAINING_PAIRS,
    MOOD_OPTIONS: MOOD_OPTIONS,
    VENUE_OPTIONS: VENUE_OPTIONS,
    getLayer: getLayer,
    getTrainingPair: getTrainingPair,
    trainingPairForAttr: trainingPairForAttr,
    moodBonusOf: moodBonusOf,
    codexMissingAttributes: codexMissingAttributes,
    validateLayers: validateLayers
  };
});

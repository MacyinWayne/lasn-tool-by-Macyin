/*!
 * core/training.js —— 训练收益模型（纯函数，无 DOM）
 *
 * 社区实测公式（T4 任务给定）：
 *   单次训练收益 = (基础值 + (训练等级 − 1) × 3 + 人员加值 + 对口器材加值 + 角色技能固定加值)
 *                  × 训练加成% × (1 + 器材暴击加成) + 主属性加值
 *   主属性基础值 = 10；意识（意志）基础值 = 8。
 *
 * 每个返回值都带 formulaSteps，UI 直接渲染成「拆解账本」，方便逐项核对来源。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.training = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var TRAINING_KINDS = [
    {
      id: 'main',
      label: '主属性训练',
      baseParam: 'trainBaseMain',
      hint: '投射 / 攻筐 / 传球 等面板主属性',
      accent: 'orange'
    },
    {
      id: 'willpower',
      label: '意识训练',
      baseParam: 'trainBaseWillpower',
      hint: '意识（意志）类训练，基础值比主属性低 2',
      accent: 'blue'
    }
  ];

  function num(v, fallback) {
    var n = typeof v === 'number' ? v : Number(v);
    return isFinite(n) ? n : (typeof fallback === 'number' ? fallback : 0);
  }

  function clampLevel(level) {
    var n = Math.floor(num(level, 1));
    if (n < 1) n = 1;
    if (n > 999) n = 999;
    return n;
  }

  function kindOf(kind) {
    for (var i = 0; i < TRAINING_KINDS.length; i++) {
      if (TRAINING_KINDS[i].id === kind) return TRAINING_KINDS[i];
    }
    return TRAINING_KINDS[0];
  }

  /**
   * 计算单次训练收益。
   * @param {Object} values 参数表（params.getDefaults() 的形状）
   * @param {Object} opts {
   *   kind:'main'|'willpower',
   *   level:number,
   *   baseOverride?:number   // A 层训练项基础值（意识项为 8，其余 10）
   *   labelOverride?:string  // 账本第一行的属性名
   * }
   */
  function compute(values, opts) {
    var v = values || {};
    var o = opts || {};
    var kind = kindOf(o.kind);
    var level = clampLevel(o.level);

    var baseValue =
      o.baseOverride != null && isFinite(Number(o.baseOverride))
        ? Number(o.baseOverride)
        : num(v[kind.baseParam], 0);
    var levelBonus = (level - 1) * num(v.trainLevelStep, 0);
    var personnel = num(v.personnelBonus, 0);
    var gear = num(v.gearBonus, 0);
    var charSkill = num(v.charSkillFlatBonus, 0);
    var subtotal = baseValue + levelBonus + personnel + gear + charSkill;

    var trainingBonusPct = num(v.trainingBonusPct, 0);
    var moodBonusPct = num(v.moodBonusPct, 0);
    var gearCritBonusPct = num(v.gearCritBonusPct, 0);
    var venueBonusPct = num(v.venueBonusPct, 0);
    // T3 model 公式： (1 + Σ训练加成 + 心情) × (1 + 暴击) × (1 + 场地，待验证)
    var bonusMultiplier = 1 + trainingBonusPct / 100 + moodBonusPct / 100;
    var critMultiplier = 1 + gearCritBonusPct / 100;
    var venueMultiplier = 1 + venueBonusPct / 100;
    var multiplier = bonusMultiplier * critMultiplier * venueMultiplier;

    var afterMultipliers = subtotal * multiplier;
    var flatBonus = num(v.flatAttrBonus, 0);
    var total = afterMultipliers + flatBonus;
    var firstLabel = o.labelOverride ? o.labelOverride + '训练收益' : kind.label + '基础值';

    var steps = [
      {
        key: 'base',
        label: firstLabel,
        detail: '固定基础项（A 层训练项）',
        value: baseValue,
        unit: '点',
        paramIds: [kind.baseParam]
      },
      {
        key: 'level',
        label: '训练等级加成',
        detail: '(' + level + ' − 1) × ' + num(v.trainLevelStep, 0),
        value: levelBonus,
        unit: '点',
        paramIds: ['trainLevelStep']
      },
      {
        key: 'personnel',
        label: '人员加值',
        detail: '队伍 / 人员配置固定加成',
        value: personnel,
        unit: '点',
        paramIds: ['personnelBonus']
      },
      {
        key: 'gear',
        label: '对口器材加值',
        detail: '器材与训练项目对口',
        value: gear,
        unit: '点',
        paramIds: ['gearBonus']
      },
      {
        key: 'charSkill',
        label: '角色技能固定加值',
        detail: '如佐久间雨乃（推断计入括号内）',
        value: charSkill,
        unit: '点',
        paramIds: ['charSkillFlatBonus']
      },
      {
        key: 'subtotal',
        label: '括号小计',
        detail: '以上固定项相加',
        value: subtotal,
        unit: '点',
        paramIds: []
      },
      {
        key: 'bonus',
        label: '加算乘区（训练加成 + 心情）',
        detail: '× (1 + ' + trainingBonusPct + '% + 心情 ' + moodBonusPct + '%)',
        value: bonusMultiplier,
        unit: '×',
        paramIds: ['trainingBonusPct', 'moodBonusPct']
      },
      {
        key: 'crit',
        label: '器材暴击乘区',
        detail: '× (1 + ' + gearCritBonusPct + '%)',
        value: critMultiplier,
        unit: '×',
        paramIds: ['gearCritBonusPct']
      },
      {
        key: 'venue',
        label: '场地 / 海边乘区',
        detail: '× (1 + ' + venueBonusPct + '%)（位置与数值待验证）',
        value: venueMultiplier,
        unit: '×',
        paramIds: ['venueBonusPct']
      },
      {
        key: 'afterMultipliers',
        label: '乘区后收益',
        detail: '小计 × 加算乘区 × 暴击 × 场地',
        value: afterMultipliers,
        unit: '点',
        paramIds: []
      },
      {
        key: 'flat',
        label: '主属性加值（尾项）',
        detail: '不受乘区放大',
        value: flatBonus,
        unit: '点',
        paramIds: ['flatAttrBonus']
      },
      {
        key: 'total',
        label: '单次训练总收益',
        detail: '最终加成',
        value: total,
        unit: '点',
        paramIds: []
      }
    ];

    return {
      kind: kind.id,
      kindLabel: kind.label,
      level: level,
      baseValue: baseValue,
      levelBonus: levelBonus,
      personnel: personnel,
      gear: gear,
      charSkill: charSkill,
      subtotal: subtotal,
      trainingBonusPct: trainingBonusPct,
      gearCritBonusPct: gearCritBonusPct,
      moodBonusPct: moodBonusPct,
      venueBonusPct: venueBonusPct,
      bonusMultiplier: bonusMultiplier,
      critMultiplier: critMultiplier,
      moodMultiplier: 1 + moodBonusPct / 100,
      venueMultiplier: venueMultiplier,
      multiplier: multiplier,
      afterMultipliers: afterMultipliers,
      flatBonus: flatBonus,
      total: total,
      steps: steps,
      formula:
        '(' + baseValue + ' + (' + level + ' − 1) × ' + num(v.trainLevelStep, 0) + ' + ' +
        personnel + ' + ' + gear + ' + ' + charSkill + ') × ' +
        '(1 + ' + trainingBonusPct + '% + 心情 ' + moodBonusPct + '%) × (1 + ' +
        gearCritBonusPct + '%) × (1 + 场地 ' + venueBonusPct + '%) + ' + flatBonus,
      assumptions: [
        '意识训练项基础值 = 8，其余 A 层训练项为 10（社区实测）。',
        '训练项同时提升两项属性的配对由用户实机验证（2026-11-05 公测；客户端 edu_train_conf 原文与展示口径不同，以实机为准）。',
        '副属性比例实测观察约 33%~50%，默认 50%（T3 模型区间 30%~70%，待更多样本）。',
        '角色技能固定加值计入括号内属于推断；如实测发现在乘区后，请改填「主属性加值」尾项。',
        '训练加成与心情加算进同一乘区（T3 model formula_spec）；场地加成位置待验证。'
      ]
    };
  }

  /**
   * A 层训练项计算：一个训练项同时提升主属性 + 副属性（edu_train_conf 配对）。
   * @param {Object} values 参数表
   * @param {Object} opts { itemId, pair:{primary,secondary}, level }
   * @returns {'Object'} { itemId, primaryAttr, secondaryAttr, sharePct, primary, secondary, totalSum }
   */
  function computeItem(values, opts) {
    var v = values || {};
    var o = opts || {};
    var pair = o.pair || { primary: '投射', secondary: '运控' };
    var itemId = o.itemId || 'shot';
    var level = clampLevel(o.level);
    var base =
      itemId === 'awareness'
        ? num(v.trainBaseWillpower, 8)
        : num(v.trainBaseMain, 10);
    var primary = compute(v, {
      kind: 'main',
      level: level,
      baseOverride: base,
      labelOverride: pair.primary
    });
    var sharePct = num(v.secondarySharePct, 50);
    if (sharePct < 0) sharePct = 0;
    if (sharePct > 100) sharePct = 100;
    var share = sharePct / 100;
    var secondary = {
      attr: pair.secondary,
      sharePct: sharePct,
      baseValue: primary.baseValue,
      subtotal: primary.subtotal * share,
      multiplier: primary.multiplier,
      total: primary.total * share,
      isSecondary: true
    };
    return {
      itemId: itemId,
      primaryAttr: pair.primary,
      secondaryAttr: pair.secondary,
      level: level,
      sharePct: sharePct,
      primary: primary,
      secondary: secondary,
      totalSum: primary.total + secondary.total
    };
  }

  /** 每提升 1 级带来的收益增量（线性模型下为常数）。 */
  function perLevelGain(values) {
    var v = values || {};
    var multiplier =
      (1 + num(v.trainingBonusPct, 0) / 100 + num(v.moodBonusPct, 0) / 100) *
      (1 + num(v.gearCritBonusPct, 0) / 100) *
      (1 + num(v.venueBonusPct, 0) / 100);
    return num(v.trainLevelStep, 0) * multiplier;
  }

  /** 主属性 / 意识 训练在同一等级下的对比。 */
  function compareKinds(values, level) {
    var main = compute(values, { kind: 'main', level: level });
    var will = compute(values, { kind: 'willpower', level: level });
    return {
      main: main,
      willpower: will,
      diff: main.total - will.total,
      ratio: will.total === 0 ? Infinity : main.total / will.total
    };
  }

  /**
   * 等级 → 收益曲线数据，供 SVG 折线图使用。
   * @returns {Array<{level:number, main:number, willpower:number}>}
   */
  function curve(values, opts) {
    var o = opts || {};
    var maxLevel = Math.max(1, Math.min(99, Math.floor(num(o.maxLevel, 10))));
    var rows = [];
    for (var lv = 1; lv <= maxLevel; lv++) {
      rows.push({
        level: lv,
        main: compute(values, { kind: 'main', level: lv }).total,
        willpower: compute(values, { kind: 'willpower', level: lv }).total
      });
    }
    return rows;
  }

  return {
    TRAINING_KINDS: TRAINING_KINDS,
    compute: compute,
    computeItem: computeItem,
    perLevelGain: perLevelGain,
    compareKinds: compareKinds,
    curve: curve
  };
});

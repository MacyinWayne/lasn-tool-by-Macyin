/*!
 * core/expression.js —— 表情爆发模型（纯函数，无 DOM）
 *
 * 实测公式：
 *   表情爆发 = 训练值 × (1 + Σ每个表情bonus) × 一致乘区
 *   每个表情bonus = 基础 20% + 上阵角色技能加值（望月 +8%、龙宫寺 +4% …）
 *   一致乘区 = 表情不一致 → 1；全部一致 → 角色一致倍率（真崎 2.5 + 0.25）
 *
 * 一致人数上限（用户实测，2026-11-05）：
 *   基础 6 人（经理1 + 陪练4 + 主练1）；
 *   希雅二星在场额外 +1~3 个「虚空人」（幻影队友，表情必定与某个真人一致）；
 *   真人 6 人已锁满一致时，虚空人必定跟随 → 锁 9 人稳定可达。
 *   上限 = 6（无希雅）/ 9（希雅二星）。
 *
 * 基准示例：6 个一致表情、角色加值合计 +12%
 *   (1 + 6 × (20% + 8% + 4%)) × (2.5 + 0.25) = 2.92 × 2.75 = 8.03× = 803%
 * 希雅上限示例：9 人一致
 *   (1 + 9 × 32%) × 2.75 = 3.88 × 2.75 = 10.67× = 1067%（7/8 人分别为 891% / 979%）
 *
 * 随机模型（用于说明「稀释效应」，属于推断/简化模型，非游戏硬数据）：
 *   假设每个槽位独立均匀地随机到 k 种表情之一，只有全部同款时才吃到一致乘区。
 *   注意：若真人 6 人未锁满，虚空人会随机跟随不同真人 → 更难过一致，希雅二星只应在
 *   「已能锁 6 人一致」的配置里使用。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.expression = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function num(v, fallback) {
    var n = typeof v === 'number' ? v : Number(v);
    return isFinite(n) ? n : (typeof fallback === 'number' ? fallback : 0);
  }

  function clampSlots(slots) {
    var n = Math.floor(num(slots, 1));
    if (n < 1) n = 1;
    if (n > 12) n = 12;
    return n;
  }

  function clampKinds(kinds) {
    var n = Math.floor(num(kinds, 4));
    if (n < 1) n = 1;
    if (n > 12) n = 12;
    return n;
  }

  /** 上阵角色技能加值合计（百分数，如 12 表示 +12%）。 */
  function sumSkillBonusPct(teamSkills) {
    if (!Array.isArray(teamSkills)) return 0;
    return teamSkills.reduce(function (acc, item) {
      return acc + num(item && item.bonusPct, 0);
    }, 0);
  }

  /** 每个表情的加成（小数）：(基础 20% + 角色加值)/100。 */
  function perExpressionBonus(values, teamSkills) {
    var basePct = num(values && values.exprBaseBonusPct, 20);
    return (basePct + sumSkillBonusPct(teamSkills)) / 100;
  }

  /** 一致乘区：基础倍率 + 角色额外加值（真崎 +0.25）。 */
  function consistencyMultiplier(values, consistencyExtras) {
    var base = num(values && values.exprConsistencyBase, 2.5);
    var extra = 0;
    if (Array.isArray(consistencyExtras)) {
      consistencyExtras.forEach(function (item) {
        extra += num(item && item.extra, 0);
      });
    }
    return base + extra;
  }

  /**
   * 一次表情结算的爆发倍率。
   * @param {Object} values 参数表
   * @param {Object} opts { slots, teamSkills, consistencyExtras, consistent }
   * @returns {Object}
   */
  function burst(values, opts) {
    var o = opts || {};
    var slots = clampSlots(o.slots);
    var perFraction = perExpressionBonus(values, o.teamSkills);
    var mult = consistencyMultiplier(values, o.consistencyExtras);
    var consistent = o.consistent !== false;
    var consistency = consistent ? mult : 1;
    var linear = 1 + slots * perFraction;
    var total = linear * consistency;
    return {
      slots: slots,
      perBonusPct: perFraction * 100,
      perBonusFraction: perFraction,
      linearMultiplier: linear,
      consistencyMultiplier: consistency,
      consistencyHit: consistent,
      total: total,
      percent: total * 100
    };
  }

  /** 基础一致人数（无希雅）：默认 6。 */
  function baseSlots(values) {
    return clampSlots(num(values && values.exprSlotCount, 6));
  }

  /** 虚空人数量范围：min~max（默认 1~3）；0 表示不启用希雅。 */
  function xiyaRange(values) {
    var min = Math.round(num(values && values.xiyaVirtualMin, 1));
    var max = Math.round(num(values && values.xiyaVirtualMax, 3));
    if (min < 0) min = 0;
    if (max < min) max = min;
    if (max > 5) max = 5;
    return { min: min, max: max };
  }

  /** 同一次训练的最大一致人数：6（无希雅）/ 9（希雅二星，按上限参数）。 */
  function maxConsistentSlots(values, opts) {
    var base = baseSlots(values);
    var o = opts || {};
    if (!o.xiya) return base;
    var range = xiyaRange(values);
    var cap = Math.round(num(values && values.exprSlotsMaxWithXiya, 9));
    var slots = base + range.max;
    return Math.min(cap, slots);
  }

  /**
   * 希雅二星：真人 base 人锁满一致 + virtuals 个虚空人（必定跟随）→ 一致人数 = base + virtuals。
   * @param {Object} values 参数表
   * @param {Object} opts { virtuals, teamSkills, consistencyExtras }
   * @returns {Object} burst 结果 + { virtuals, withXiya:true, stable:true }
   */
  function burstWithXiya(values, opts) {
    var o = opts || {};
    var range = xiyaRange(values);
    var virtuals = Math.round(num(o.virtuals, range.min));
    if (virtuals < range.min) virtuals = range.min;
    if (virtuals > range.max) virtuals = range.max;
    var base = baseSlots(values);
    var result = burst(values, {
      slots: base + virtuals,
      teamSkills: o.teamSkills,
      consistencyExtras: o.consistencyExtras,
      consistent: o.consistent !== false
    });
    return Object.assign(result, {
      virtuals: virtuals,
      withXiya: true,
      baseSlots: base,
      stable: o.consistent !== false,
      note:
        '希雅二星：真人 ' + base + ' 人锁满一致 + ' + virtuals + ' 虚空人（必定跟随）→ ' +
        (base + virtuals) + ' 人一致'
    });
  }

  /**
   * 虚空人 1~max 均匀随机时的期望（默认 1~3 均匀 → 期望人数 8）。
   * @returns {Object} { expectedTotal, expectedPercent, rows:[{slots,total,percent}], baseline, upliftPct, stableMax }
   */
  function expectedWithXiya(values, opts) {
    var o = opts || {};
    var range = xiyaRange(values);
    var base = baseSlots(values);
    var rows = [];
    for (var v = Math.max(1, range.min); v <= range.max; v++) {
      var r = burstWithXiya(values, {
        virtuals: v,
        teamSkills: o.teamSkills,
        consistencyExtras: o.consistencyExtras
      });
      rows.push({ virtuals: v, slots: r.slots, total: r.total, percent: r.percent });
    }
    var n = rows.length || 1;
    var expectedTotal = rows.reduce(function (a, r) { return a + r.total; }, 0) / n;
    var expectedPercent = expectedTotal * 100;
    var baseline = burst(values, {
      slots: base,
      teamSkills: o.teamSkills,
      consistencyExtras: o.consistencyExtras
    });
    return {
      baseSlots: base,
      virtualMin: range.min,
      virtualMax: range.max,
      rows: rows,
      expectedSlots: rows.length ? rows.reduce(function (a, r) { return a + r.slots; }, 0) / n : base,
      expectedTotal: expectedTotal,
      expectedPercent: expectedPercent,
      baselineTotal: baseline.total,
      baselinePercent: baseline.percent,
      upliftPct: baseline.total ? (expectedTotal / baseline.total - 1) * 100 : 0,
      stableMax: burstWithXiya(values, {
        virtuals: range.max,
        teamSkills: o.teamSkills,
        consistencyExtras: o.consistencyExtras
      })
    };
  }

  /**
   * 希雅上限示例（固定用 803% 示例的同一套角色加值：基础 20% + 望月 8% + 龙宫寺 4%，真崎 +0.25）。
   * 返回 6/7/8/9 人一致表 + 上限 1067% + 期望 979%（1~3 均匀）。
   */
  function exampleMaxXiya(values) {
    var v = values || {};
    var skills = [
      { name: '望月 透', bonusPct: 8 },
      { name: '龙宫寺 心叶', bonusPct: 4 }
    ];
    var extras = [{ name: '真崎 辉世', extra: 0.25 }];
    var base = clampSlots(num(v.exprSlotCount, 6));
    var rows = [];
    for (var s = base; s <= base + 3; s++) {
      var r = burst(v, { slots: s, teamSkills: skills, consistencyExtras: extras });
      rows.push({ slots: s, virtuals: s - base, linear: r.linearMultiplier, total: r.total, percent: r.percent });
    }
    var top = rows[rows.length - 1];
    var expected = expectedWithXiya(v, { teamSkills: skills, consistencyExtras: extras });
    return {
      baseSlots: base,
      maxSlots: base + 3,
      perBonusPct: rows[0] ? (rows[0].linear - 1) / base * 100 : 32,
      consistencyMultiplier: consistencyMultiplier(v, extras),
      rows: rows,
      maxTotal: top.total,
      maxPercent: top.percent,
      expectedTotal: expected.expectedTotal,
      expectedPercent: expected.expectedPercent,
      upliftPct: expected.upliftPct,
      formulaText:
        '(1 + ' + (base + 3) + ' × 32%) × (2.5 + 0.25) = 3.88 × 2.75 = 10.67× = 1067%',
      note:
        '希雅二星 + 真人 ' + base + ' 人锁满一致时，虚空人必定跟随，锁 9 稳定可达；' +
        '若真人未锁满，虚空人随机跟随不同真人，反而更难齐（只应在已能锁 6 人一致时使用）。'
    };
  }

  /* ================================================================== *
   * 2026-11-05 用户实测定稿：按「表情构成」计算（新默认模型）
   *
   *   爆发倍率 = (1 + Σ每个参与者的(表情基础 + 角色技能加成)) × 一致乘区
   *   表情基础：大笑 20% / 微笑 10% / 哭脸 0%
   *   一致乘区（实测表值，2026-11-05）：2 人=1.5、3 人=1.8、4 人=2.0、5 人=2.2、6 人=2.5
   *             （真崎再 +0.25）；7/8/9 人按「1+0.25n 后 1 位小数银行家舍入」推算 = 2.8 / 3.0 / 3.2，
   *             标「推算·待实测」；仅全员同款且 ≥2 人触发；单人/混合不触发。
   *   参与者数 = 经理 + 陪练 + 主练（满编 6；无人=主练 1；单经理=2；2 陪练=3…）；
   *              希雅二星虚空人 +1~3 → 上限 9。
   *
   *   实测锚点：2 哭脸=150%；3 大笑=288%；3 微笑=234%；4 大笑=360%；5 微笑=330%；
   *             1 大笑+1 微笑=130%；3 大笑+1 哭脸=160%；
   *             6 大笑一致 + 望月8% + 龙宫寺4% + 真崎0.25 = 803%（2.92 × 2.75）。
   *   规律：1+0.25n 后按 1 位小数银行家舍入（1.75→1.8、2.25→2.2、2.75→2.8、3.25→3.2）。
   * ================================================================== */

  var EXPRESSION_TYPES = ['大笑', '微笑', '哭脸'];
  var EXPRESSION_BASE_DEFAULT = { '大笑': 0.2, '微笑': 0.1, '哭脸': 0 };

  /** 表情类型基础加成（可被参数覆盖）。 */
  function expressionBases(values) {
    var v = values || {};
    return {
      '大笑': num(v.exprLaughBonusPct, 20) / 100,
      '微笑': num(v.exprSmileBonusPct, 10) / 100,
      '哭脸': num(v.exprCryBonusPct, 0) / 100
    };
  }

  /**
   * 1 位小数「银行家舍入」（round-half-to-even），用于推算未实测档位。
   * 例：1.75→1.8、2.25→2.2、2.75→2.8、3.25→3.2。
   */
  function round1Banker(x) {
    var scaled = x * 10;
    var rounded = Math.round(scaled);
    var diff = Math.abs(scaled - rounded);
    if (Math.abs(diff - 0.5) < 1e-9 && rounded % 2 !== 0) rounded -= 1;
    return rounded / 10;
  }

  /** 已实测的一致乘区表值（2/3/4/5/6 人，2026-11-05 实机）。 */
  function measuredConsistencyTable(values) {
    var v = values || {};
    return {
      2: num(v.exprConsistency2, 1.5),
      3: num(v.exprConsistency3, 1.8),
      4: num(v.exprConsistency4, 2.0),
      5: num(v.exprConsistency5, 2.2),
      6: num(v.exprConsistency6, 2.5)
    };
  }

  /**
   * 一致乘区基础值：已实测档位（2/3/4/5/6）用表值；
   * 未测档位（7/8/9）用 1 + 0.25×n 后 1 位小数银行家舍入推算。
   * n<2 → 1（不触发）。
   */
  function consistencyBaseForCount(values, count) {
    var v = values || {};
    var n = Math.round(num(count, 0));
    if (n < 2) return 1;
    var table = measuredConsistencyTable(v);
    if (table[n] != null) return table[n];
    var perPerson = num(v.exprConsistencyPerPerson, 0.25);
    return round1Banker(1 + perPerson * n);
  }

  /** 一致乘区参考表（2~9 人；含推算档位）。 */
  function consistencyTable(values) {
    var out = {};
    for (var n = 2; n <= 9; n++) out[n] = consistencyBaseForCount(values, n);
    return out;
  }

  /**
   * 指定一致人数的一致乘区：2/3/4/6 实测（estimated=false），5/7/8/9 公式推算（estimated=true）；
   * 真崎 +0.25 作为额外加值叠加。
   */
  function consistencyForCount(values, count, consistencyExtras) {
    var n = Math.round(num(count, 0));
    var extra = 0;
    if (Array.isArray(consistencyExtras)) {
      consistencyExtras.forEach(function (item) { extra += num(item && item.extra, 0); });
    }
    if (n < 2) {
      return {
        count: n,
        base: 1,
        extra: 0,
        multiplier: 1,
        pending: false,
        estimated: false,
        measured: false,
        note: '一致人数 <2：不触发一致乘区（×1）'
      };
    }
    var measured = measuredConsistencyTable(values)[n] != null;
    var base = consistencyBaseForCount(values, n);
    var estimated = !measured;
    return {
      count: n,
      base: base,
      extra: extra,
      multiplier: base + extra,
      pending: false,
      estimated: estimated,
      measured: measured,
      note:
        n + ' 人一致 = ×' + (base + extra) +
        (measured ? '（实测表值）' : '（1 + 0.25×' + n + ' 推算·待实测）') +
        (extra ? ' + 真崎等额外 ' + extra : '')
    };
  }

  /** 本次训练最多参与者数：基础 6；希雅二星 +上限（最多 9）。 */
  function maxParticipants(values, opts) {
    var o = opts || {};
    var base = Math.round(num(values && values.exprSlotCount, 6));
    if (!o.xiya) return base;
    var range = xiyaRange(values);
    var cap = Math.round(num(values && values.exprSlotsMaxWithXiya, 9));
    return Math.min(cap, base + range.max);
  }

  function normalizeCounts(counts) {
    var out = {};
    var total = 0;
    EXPRESSION_TYPES.forEach(function (type) {
      var n = Math.round(num(counts && counts[type], 0));
      if (n < 0) n = 0;
      if (n > 12) n = 12;
      out[type] = n;
      total += n;
    });
    return { counts: out, total: total };
  }

  /**
   * 按表情构成计算爆发倍率（新默认模型）。
   * @param {Object} values 参数表
   * @param {Object} opts {
   *   counts: {大笑,微笑,哭脸},
   *   teamSkills: [{bonusPct}]（每个参与者都吃角色技能加值）,
   *   consistencyExtras: [{extra}]（真崎 +0.25）,
   *   participants?: number  // 兼容 UI 输入；若与 counts 总数不符，以 counts 为准并在 note 提示
   * }
   * @returns {Object}
   */
  function burstByComposition(values, opts) {
    var o = opts || {};
    var norm = normalizeCounts(o.counts);
    var counts = norm.counts;
    var participants = norm.total;
    var bases = expressionBases(values);
    var skillPct = sumSkillBonusPct(o.teamSkills);
    var skillFraction = skillPct / 100;
    var linear = 1;
    var parts = [];
    EXPRESSION_TYPES.forEach(function (type) {
      if (!counts[type]) return;
      var per = bases[type] + skillFraction;
      linear += counts[type] * per;
      parts.push(type + '×' + counts[type] + '（' + Math.round((bases[type] + skillFraction) * 100) + '%）');
    });
    var maxCount = Math.max(counts['大笑'], counts['微笑'], counts['哭脸']);
    var allSame = participants >= 2 && maxCount === participants;
    var consistency = allSame
      ? consistencyForCount(values, participants, o.consistencyExtras)
      : {
          count: maxCount,
          base: 1,
          extra: 0,
          multiplier: 1,
          pending: false,
          estimated: false,
          note: '表情不一致：只线性相加（不乘一致乘区）'
        };
    var consistencyMultiplier = consistency.multiplier;
    var total = linear * (consistencyMultiplier == null ? 1 : consistencyMultiplier);
    var notes = [];
    if (participants === 0) notes.push('尚未录入任何表情参与者');
    if (participants === 1) notes.push('单人训练不触发一致加成');
    if (o.participants != null && Number(o.participants) !== participants) {
      notes.push('参与者总数（' + o.participants + '）与表情人数合计（' + participants + '）不一致，以表情人数合计为准');
    }
    if (consistency.estimated) notes.push(consistency.note);
    return {
      counts: counts,
      participants: participants,
      maxParticipants: maxParticipants(values, o),
      expressionBases: bases,
      skillBonusPct: skillPct,
      linearMultiplier: linear,
      linearPercent: linear * 100,
      formulaParts: parts,
      alignedCount: consistency.count,
      allSame: allSame,
      consistencyBase: consistency.base,
      consistencyExtra: consistency.extra,
      consistencyMultiplier: consistencyMultiplier,
      pending: false,
      estimated: !!consistency.estimated,
      total: total,
      percent: total * 100,
      note: consistency.note,
      notes: notes,
      source: '用户实机 2026-11-05（一致乘区表：2人1.5/3人1.8/4人2.0/6人2.5；130%/150%/160%/234%/288%/360%/803% 锚点）'
    };
  }

  /** 6 人大笑全一致 + 望月8% + 龙宫寺4% + 真崎0.25 = 803%（新模型解释旧基准）。 */
  function example803Composition(values) {
    var skills = [
      { name: '望月 透', bonusPct: 8 },
      { name: '龙宫寺 心叶', bonusPct: 4 }
    ];
    var extras = [{ name: '真崎 辉世', extra: 0.25 }];
    var r = burstByComposition(values, {
      counts: { '大笑': 6, '微笑': 0, '哭脸': 0 },
      teamSkills: skills,
      consistencyExtras: extras
    });
    return Object.assign(r, {
      skills: skills,
      extras: extras,
      formulaText:
        '(1 + 6 × (20% + 8% + 4%)) × (2.5 + 0.25) = 2.92 × 2.75 = 8.03× = 803%'
    });
  }

  /** 实测锚点示例：混合 + 一致乘区公式（2/3/4/6 人）+ 803 基准。 */
  function measuredExamples(values) {
    var cases = [
      {
        id: 'mixed1',
        label: '1 大笑 + 1 微笑',
        counts: { '大笑': 1, '微笑': 1, '哭脸': 0 },
        expectedPercent: 130,
        explain: '混合只线性相加：1 + 20% + 10% = 130%'
      },
      {
        id: 'mixed3',
        label: '3 大笑 + 1 哭脸',
        counts: { '大笑': 3, '微笑': 0, '哭脸': 1 },
        expectedPercent: 160,
        explain: '混合只线性相加：1 + 3×20% + 0 = 160%'
      },
      {
        id: 'aligned2cry',
        label: '2 哭脸一致',
        counts: { '大笑': 0, '微笑': 0, '哭脸': 2 },
        expectedPercent: 150,
        explain: '全哭脸也触发：1.0 × 1.5 = 150%'
      },
      {
        id: 'aligned3smile',
        label: '3 微笑一致',
        counts: { '大笑': 0, '微笑': 3, '哭脸': 0 },
        expectedPercent: 234,
        explain: '1.3 × 1.8 = 234%（3 人实测档 ×1.8；早期读数 231/234 闪烁存疑，以 234% 为准）'
      },
      {
        id: 'aligned3laugh',
        label: '3 大笑一致',
        counts: { '大笑': 3, '微笑': 0, '哭脸': 0 },
        expectedPercent: 288,
        explain: '1.6 × 1.8 = 288%（3 人实测档 ×1.8）'
      },
      {
        id: 'aligned4laugh',
        label: '4 大笑一致',
        counts: { '大笑': 4, '微笑': 0, '哭脸': 0 },
        expectedPercent: 360,
        explain: '1.8 × 2.0 = 360%'
      },
      {
        id: 'aligned5smile',
        label: '5 微笑一致',
        counts: { '大笑': 0, '微笑': 5, '哭脸': 0 },
        expectedPercent: 330,
        explain: '1.5 × 2.2 = 330%（5 人实测档 ×2.2）'
      },
      {
        id: 'aligned6',
        label: '6 大笑一致 + 望月8% + 龙宫寺4% + 真崎0.25',
        counts: { '大笑': 6, '微笑': 0, '哭脸': 0 },
        expectedPercent: 803,
        explain: '(1+6×32%) × (2.5+0.25) = 803%'
      }
    ];
    return cases.map(function (c) {
      var opts = { counts: c.counts };
      if (c.id === 'aligned6') {
        opts.teamSkills = [
          { name: '望月 透', bonusPct: 8 },
          { name: '龙宫寺 心叶', bonusPct: 4 }
        ];
        opts.consistencyExtras = [{ name: '真崎 辉世', extra: 0.25 }];
      }
      var r = burstByComposition(values, opts);
      return Object.assign({}, c, {
        computedMultiplier: r.total,
        computedPercent: r.percent,
        participants: r.participants,
        consistencyMultiplier: r.consistencyMultiplier,
        pending: r.pending,
        matched: Math.abs(r.percent - c.expectedPercent) < 0.01
      });
    });
  }

  /**
   * 随机凑表情的期望倍率（简化模型）。
   * P(全一致) = k × (1/k)^n = k^(1-n)（n ≥ 1）
   */
  function randomExpected(values, opts) {
    var o = opts || {};
    var slots = clampSlots(o.slots);
    var kinds = clampKinds(o.kinds);
    var guaranteed = burst(values, o);
    var boost = num(values && values.exprConsistencyBoostPct, 0) / 100;
    var pConsistent = Math.pow(kinds, 1 - slots) + boost;
    if (slots === 1) pConsistent = 1; // 单槽位天然「一致」
    if (pConsistent > 1) pConsistent = 1;
    if (pConsistent < 0) pConsistent = 0;
    var consistency = guaranteed.consistencyMultiplier;
    var expected = guaranteed.linearMultiplier * (1 + pConsistent * (consistency - 1));
    return {
      slots: slots,
      kinds: kinds,
      consistencyBoostPct: boost * 100,
      pConsistent: pConsistent,
      guaranteed: guaranteed.total,
      expected: expected,
      lossPct: guaranteed.total === 0 ? 0 : (1 - expected / guaranteed.total) * 100
    };
  }

  /**
   * 生成 1..slots 的分析表，UI 用它画「爆发倍率曲线 / 边际收益曲线」。
   * @returns {Array<Object>} 每行含 n / guaranteed / expected / marginal…
   */
  function analyze(values, opts) {
    var o = opts || {};
    var maxSlots = clampSlots(o.slots);
    var rows = [];
    var prevGuaranteed = null;
    for (var n = 1; n <= maxSlots; n++) {
      var g = burst(values, {
        slots: n,
        teamSkills: o.teamSkills,
        consistencyExtras: o.consistencyExtras,
        consistent: true
      });
      var e = randomExpected(values, {
        slots: n,
        kinds: o.kinds,
        teamSkills: o.teamSkills,
        consistencyExtras: o.consistencyExtras
      });
      rows.push({
        n: n,
        guaranteed: g.total,
        expected: e.expected,
        pConsistent: e.pConsistent,
        marginalGuaranteedPct: prevGuaranteed === null ? null : ((g.total / prevGuaranteed) - 1) * 100,
        marginalExpectedPct: n === 1 ? null :
          ((e.expected / rows[rows.length - 1].expected) - 1) * 100
      });
      prevGuaranteed = g.total;
    }
    return rows;
  }

  /**
   * 803% 示例的逐步推导（写死示例输入，用于「复现示例」卡片与自测）。
   * 输入：6 个一致表情、基础 20%、望月 +8%、龙宫寺 +4%、真崎一致 2.5+0.25。
   */
  function example803(values) {
    var v = values || {};
    var skills = [
      { name: '望月 透', bonusPct: 8 },
      { name: '龙宫寺 心叶', bonusPct: 4 }
    ];
    var extras = [{ name: '真崎 辉世', extra: 0.25 }];
    var opts = { slots: 6, teamSkills: skills, consistencyExtras: extras };
    var result = burst(v, opts);
    return {
      slots: 6,
      basePct: num(v.exprBaseBonusPct, 20),
      teamSkills: skills,
      consistencyExtras: extras,
      perBonusPct: result.perBonusPct,
      linearMultiplier: result.linearMultiplier,
      consistencyMultiplier: result.consistencyMultiplier,
      total: result.total,
      percent: result.percent,
      formulaText:
        '(1 + 6 × (20% + 8% + 4%)) × (2.5 + 0.25) = ' +
        trim2(result.linearMultiplier) + ' × ' + trim2(result.consistencyMultiplier) +
        ' = ' + trim2(result.total) + '× = ' + trim2(result.percent) + '%',
      steps: [
        {
          label: '每个表情的加成',
          detail: '基础 20% + 望月 8% + 龙宫寺 4%',
          value: result.perBonusPct,
          unit: '%'
        },
        {
          label: '线性加成合计',
          detail: '1 + 6 × ' + trim2(result.perBonusPct) + '%',
          value: result.linearMultiplier,
          unit: '×'
        },
        {
          label: '一致乘区',
          detail: '基础 2.5 + 真崎 0.25',
          value: result.consistencyMultiplier,
          unit: '×'
        },
        {
          label: '爆发总倍率',
          detail: trim2(result.linearMultiplier) + ' × ' + trim2(result.consistencyMultiplier),
          value: result.total,
          unit: '×'
        },
        {
          label: '换算百分比',
          detail: '倍率 × 100',
          value: result.percent,
          unit: '%'
        }
      ]
    };
  }

  function trim2(n) {
    var s = Number(n).toFixed(2);
    return s.replace(/0+$/, '').replace(/\.$/, '');
  }

  /**
   * 稀释结论（由数字自动生成，UI 直接展示；测试断言其与模型一致）。
   */
  function dilutionReport(values, opts) {
    var o = opts || {};
    var slots = clampSlots(o.slots);
    var kinds = clampKinds(o.kinds);
    var rows = analyze(values, {
      slots: slots,
      kinds: kinds,
      teamSkills: o.teamSkills,
      consistencyExtras: o.consistencyExtras
    });
    var full = rows[rows.length - 1];
    var bestRandom = rows[0];
    rows.forEach(function (r) {
      if (r.expected > bestRandom.expected) bestRandom = r;
    });
    var conclusions = [];
    if (full && full.n > 1) {
      var firstMarginal = perExpressionBonus(values, o.teamSkills) * 100;
      var lastMarginal = full.marginalGuaranteedPct;
      conclusions.push(
        '锁定满一致时，第 1 个表情的相对边际增益是 ' + trim2(firstMarginal) + '%，' +
        '到第 ' + full.n + ' 个只剩 ' + trim2(lastMarginal) + '%——' +
        '加成线性相加、分母越来越大，这就是「稀释」。'
      );
    }
    if (full) {
      conclusions.push(
        '满 ' + full.n + ' 个一致：' + trim2(full.guaranteed) + '×。' +
        '若同样 ' + full.n + ' 个表情随机凑（' + kinds + ' 种），期望只有 ' +
        trim2(full.expected) + '×，损失 ' + trim2((1 - full.expected / full.guaranteed) * 100) + '%。'
      );
      conclusions.push(
        '随机期望的峰值出现在 ' + bestRandom.n + ' 个表情（' + trim2(bestRandom.expected) + '×），' +
        '但永远低于锁满一致的 ' + trim2(full.guaranteed) + '×：表情要么锁满一致，要么别指望一致乘区。'
      );
    }
    return {
      rows: rows,
      full: full,
      bestRandom: bestRandom,
      conclusions: conclusions
    };
  }

  return {
    sumSkillBonusPct: sumSkillBonusPct,
    perExpressionBonus: perExpressionBonus,
    consistencyMultiplier: consistencyMultiplier,
    burst: burst,
    baseSlots: baseSlots,
    xiyaRange: xiyaRange,
    maxConsistentSlots: maxConsistentSlots,
    burstWithXiya: burstWithXiya,
    expectedWithXiya: expectedWithXiya,
    exampleMaxXiya: exampleMaxXiya,
    // —— 2026-11-05 实测定稿：按表情构成（新默认） ——
    EXPRESSION_TYPES: EXPRESSION_TYPES,
    EXPRESSION_BASE_DEFAULT: EXPRESSION_BASE_DEFAULT,
    expressionBases: expressionBases,
    consistencyBaseForCount: consistencyBaseForCount,
    round1Banker: round1Banker,
    consistencyTable: consistencyTable,
    consistencyForCount: consistencyForCount,
    maxParticipants: maxParticipants,
    burstByComposition: burstByComposition,
    example803Composition: example803Composition,
    measuredExamples: measuredExamples,
    randomExpected: randomExpected,
    analyze: analyze,
    example803: example803,
    dilutionReport: dilutionReport,
    trim2: trim2
  };
});

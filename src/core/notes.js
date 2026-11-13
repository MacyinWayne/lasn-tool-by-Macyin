/*!
 * core/notes.js —— 笔记契合（T5.2 新模块）
 *
 * 关键设计（寒溟澄清）：
 *   同一档位内触发率相同（如「优」30-44 分），30 与 40 没有本质区别。
 *   因此工具按「档位达成成本」设计，而不是分数最大化：
 *     - 模式 A：目标「优」（≥30）—— 找两本基础分合计 ≥30 的组合，同档等价；
 *     - 模式 B：目标「极」（≥45）—— 计算用最少契合词条星级补足缺口。
 *
 * 数据来源：data/community/notes_harmony/*
 *   张君宝《笔记契合关系一图流》2026.11.02 数据版（截图 OCR/人工转录），
 *   37×37 矩阵已通过 22/22 条摘要和、对角为 0、完全对称校验；仍待客户端逐格 diff。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.notes = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var TIER_RULE = {
    '无': { min: 0, max: 0 },
    '差': { min: 1, max: 9 },
    '一般': { min: 10, max: 19 },
    '良': { min: 20, max: 29 },
    '优': { min: 30, max: 44 },
    '极': { min: 45, max: Infinity }
  };
  var TIER_ORDER = ['无', '差', '一般', '良', '优', '极'];
  var ENTRY_BONUS = { '*': 2, '**': 5, '***': 10 };
  var TOKENS = ['*', '**', '***'];

  function getData() {
    var B = (typeof globalThis !== 'undefined' && globalThis.BBT) || {};
    return B.notesData || (typeof globalThis !== 'undefined' ? globalThis.BBNotesHarmony : null) || null;
  }

  function tierOf(score) {
    var s = Number(score);
    if (!isFinite(s)) return '—';
    for (var i = 0; i < TIER_ORDER.length; i++) {
      var t = TIER_ORDER[i];
      if (s >= TIER_RULE[t].min && s <= TIER_RULE[t].max) return t;
    }
    return '—';
  }

  function isYou(score) {
    return Number(score) >= 30;
  }

  function isJi(score) {
    return Number(score) >= 45;
  }

  /** 档位间距（「优」内距离门槛的余量，仅用于排序容错，不代表收益）。 */
  function tierMargin(score) {
    var t = tierOf(score);
    if (t === '—') return 0;
    return Number(score) - TIER_RULE[t].min;
  }

  function entryBonus(token) {
    if (token === '无' || token == null || token === '') return 0;
    return ENTRY_BONUS[token] || 0;
  }

  function entryStars(token) {
    if (token === '无' || token == null || token === '') return 0;
    if (token === '*') return 1;
    if (token === '**') return 2;
    if (token === '***') return 3;
    return 0;
  }

  /** 解析数据里的计划串，如 "无+***"、"**+***"。 */
  function parsePlan(plan) {
    var text = String(plan || '').trim();
    var parts = text.split('+');
    var left = parts[0] || '无';
    var right = parts[1] || '无';
    return {
      raw: text,
      left: left,
      right: right,
      bonus: entryBonus(left) + entryBonus(right),
      stars: entryStars(left) + entryStars(right),
      entries: (left === '无' ? 0 : 1) + (right === '无' ? 0 : 1)
    };
  }

  /** 人类可读计划：「无+***」→「1 条 3 星（+10）」；两条时列出。 */
  function planLabel(plan) {
    var p = parsePlan(plan);
    var list = [];
    if (p.left !== '无') list.push(starName(p.left) + '（+' + ENTRY_BONUS[p.left] + '）');
    if (p.right !== '无') list.push(starName(p.right) + '（+' + ENTRY_BONUS[p.right] + '）');
    if (!list.length) return '无词条';
    return list.join(' + ') + ' · 共 ' + p.stars + ' 星';
  }

  function starName(token) {
    if (token === '*') return '1 星';
    if (token === '**') return '2 星';
    if (token === '***') return '3 星';
    return '无';
  }

  /**
   * 给定缺口 needBonus，按假设模式计算最省词条方案。
   * @param {number} needBonus 45 - 基础合计（≥0）
   * @param {string} mode 'two'（默认：每本最多 1 条、两本可叠）| 'one'（只单本生效）| 'multi'（可叠多条，最乐观）
   * @returns {Object} { reachable, minStars, maxBonus, plans:[{left:[token], right:[token], label, bonus, stars}], need }
   */
  function computePlans(needBonus, mode) {
    var need = Math.max(0, Math.ceil(Number(needBonus) || 0));
    var m = mode === 'one' || mode === 'multi' ? mode : 'two';
    var results = [];
    if (need === 0) {
      return { need: 0, reachable: true, minStars: 0, maxBonus: 0, plans: [{ left: [], right: [], label: '无需词条（基础已达标）', bonus: 0, stars: 0 }] };
    }
    function combosOf(maxEntries) {
      var out = [];
      if (maxEntries === 0) return [[]];
      function walk(prefix) {
        out.push(prefix.slice());
        if (prefix.length >= maxEntries) return;
        TOKENS.forEach(function (t) {
          walk(prefix.concat([t]));
        });
      }
      walk([]);
      return out;
    }
    var leftMax = m === 'one' ? 0 : m === 'multi' ? 2 : 1;
    var rightMax = m === 'one' ? 1 : m === 'multi' ? 2 : 1;
    var lefts = m === 'one' ? [[]] : combosOf(leftMax);
    var rights = combosOf(rightMax);
    lefts.forEach(function (left) {
      rights.forEach(function (right) {
        if (!left.length && !right.length) return;
        var bonus = left.concat(right).reduce(function (a, t) { return a + ENTRY_BONUS[t]; }, 0);
        if (bonus < need) return;
        var stars = left.concat(right).reduce(function (a, t) { return a + entryStars(t); }, 0);
        results.push({ left: left, right: right, bonus: bonus, stars: stars });
      });
    });
    if (!results.length) {
      return { need: need, reachable: false, minStars: null, maxBonus: 0, plans: [] };
    }
    var minStars = Math.min.apply(null, results.map(function (r) { return r.stars; }));
    var best = results.filter(function (r) { return r.stars === minStars; });
    var maxBonus = Math.max.apply(null, best.map(function (r) { return r.bonus; }));
    var plans = best
      .filter(function (r) { return r.bonus === maxBonus; })
      .map(function (r) {
        var label =
          (r.left.length ? '笔记1：' + r.left.map(starName).join('+') : '笔记1：无') + '；' +
          (r.right.length ? '笔记2：' + r.right.map(starName).join('+') : '笔记2：无') +
          ' · +' + r.bonus + ' / ' + r.stars + ' 星';
        return { left: r.left, right: r.right, bonus: r.bonus, stars: r.stars, label: label };
      })
      .slice(0, 8);
    return { need: need, reachable: true, minStars: minStars, maxBonus: maxBonus, plans: plans };
  }

  function dataMains() {
    var d = getData();
    return d && Array.isArray(d.mains) ? d.mains : [];
  }

  function mainNames() {
    return dataMains().map(function (m) { return m.main; });
  }

  function byMain(name) {
    var list = dataMains();
    for (var i = 0; i < list.length; i++) {
      if (list[i].main === name) return list[i];
    }
    // 容错：忽略空格/中间点
    var bare = String(name || '').replace(/[\s·]/g, '');
    for (var j = 0; j < list.length; j++) {
      if (list[j].main.replace(/[\s·]/g, '') === bare) return list[j];
    }
    return list[0] || null;
  }

  function inExclude(name, exclude) {
    if (!exclude || !exclude.length) return false;
    var bare = String(name || '').replace(/[\s·]/g, '');
    return exclude.some(function (n) {
      return String(n || '').replace(/[\s·]/g, '') === bare;
    });
  }

  /**
   * 模式 A：目标「优」（≥30）的两本组合。
   * @param {string} mainName 主力
   * @param {Object} opts { excludeNotes:[], sort:'desc'|'asc' }
   * @returns {Object} { main, total, excludedCount, combos:[{note1,note2,base,v1,v2,tier,isTop}] }
   */
  function regularCombos(mainName, opts) {
    var o = opts || {};
    var m = byMain(mainName);
    if (!m) return { main: null, total: 0, combos: [] };
    var exclude = o.excludeNotes || [];
    var all = m.youCombos.filter(function (c) {
      return !inExclude(c.note1, exclude) && !inExclude(c.note2, exclude);
    });
    var maxBase = all.reduce(function (a, c) { return Math.max(a, c.base); }, -Infinity);
    var list = all.slice();
    if (o.sort === 'asc') list.sort(function (a, b) { return a.base - b.base || a.v1 - b.v1; });
    else list.sort(function (a, b) { return b.base - a.base || b.v1 - a.v1; });
    return {
      main: m.main,
      total: list.length,
      originalTotal: m.youCount,
      maxBase: isFinite(maxBase) ? maxBase : null,
      excludedCount: m.youCombos.length - list.length,
      combos: list.map(function (c) {
        return {
          note1: c.note1,
          note2: c.note2,
          base: c.base,
          v1: c.v1,
          v2: c.v2,
          tier: c.tier || tierOf(c.base),
          isTop: c.base === maxBase,
          margin: tierMargin(c.base)
        };
      })
    };
  }

  /**
   * 模式 B：冲「极」（≥45）路径。按假设模式重算缺口方案。
   * @param {string} mainName
   * @param {Object} opts { excludeNotes, mode:'two'|'one'|'multi' }
   * @returns {Object} { main, mode, rows:[...], reachableCount, unreachableCount, twoStarCount, threeStarCount }
   */
  function jiPaths(mainName, opts) {
    var o = opts || {};
    var m = byMain(mainName);
    var mode = o.mode === 'one' || o.mode === 'multi' ? o.mode : 'two';
    if (!m) return { main: null, mode: mode, rows: [], reachableCount: 0 };
    var exclude = o.excludeNotes || [];
    var rows = m.jiBest
      .filter(function (j) {
        return !inExclude(j.note1, exclude) && !inExclude(j.note2, exclude);
      })
      .map(function (j) {
        var computed = computePlans(45 - j.base, mode);
        return {
          note1: j.note1,
          note2: j.note2,
          base: j.base,
          v1: j.v1,
          v2: j.v2,
          tier: j.tier || tierOf(j.base),
          needBonus: Math.max(0, 45 - j.base),
          mode: mode,
          reachable: computed.reachable,
          minTotalStars: computed.minStars,
          plans: computed.plans.map(function (p) { return p.label; }),
          dataPlans: j.plans || [],
          dataMinStars: j.minTotalStars,
          highlight:
            !computed.reachable
              ? 'unreachable'
              : computed.minStars <= 2
                ? 'two-star'
                : computed.minStars === 3
                  ? 'three-star'
                  : 'normal'
        };
      });
    rows.sort(function (a, b) {
      if (a.reachable !== b.reachable) return a.reachable ? -1 : 1;
      var sa = a.minTotalStars == null ? 999 : a.minTotalStars;
      var sb = b.minTotalStars == null ? 999 : b.minTotalStars;
      if (sa !== sb) return sa - sb;
      return b.base - a.base;
    });
    return {
      main: m.main,
      mode: mode,
      rows: rows,
      total: rows.length,
      reachableCount: rows.filter(function (r) { return r.reachable; }).length,
      unreachableCount: rows.filter(function (r) { return !r.reachable; }).length,
      twoStarCount: rows.filter(function (r) { return r.highlight === 'two-star'; }).length,
      threeStarCount: rows.filter(function (r) { return r.highlight === 'three-star'; }).length
    };
  }

  /** 概览表：每主力一行（youCount / maxBase / 最省冲极星级）。 */
  function summaryTable(opts) {
    var o = opts || {};
    var mode = o.mode === 'one' || o.mode === 'multi' ? o.mode : 'two';
    return dataMains().map(function (m) {
      var top = m.youCombos.slice().sort(function (a, b) { return b.base - a.base; })[0] || null;
      var bestJi = m.jiBest.slice().sort(function (a, b) { return b.base - a.base; })[0] || null;
      var computed = bestJi ? computePlans(45 - bestJi.base, mode) : null;
      return {
        main: m.main,
        youCount: m.youCount,
        maxBase: m.maxBase,
        topYou: top,
        bestJi: bestJi,
        cheapestStars: computed && computed.reachable ? computed.minStars : null
      };
    }).sort(function (a, b) {
      var sa = a.cheapestStars == null ? 999 : a.cheapestStars;
      var sb = b.cheapestStars == null ? 999 : b.cheapestStars;
      return sa - sb || b.maxBase - a.maxBase;
    });
  }

  /** 词条星级的全局分布（数据完整性/经济结论用）。 */
  function stats() {
    var d = getData();
    var youCombos = 0;
    var jiRows = 0;
    var base38plus = 0;
    var base30to32 = 0;
    var twoStar = 0;
    dataMains().forEach(function (m) {
      youCombos += m.youCombos.length;
      m.jiBest.forEach(function (j) {
        jiRows += 1;
        if (j.base >= 40) twoStar += 1;
      });
      m.youCombos.forEach(function (c) {
        if (c.base >= 38) base38plus += 1;
        if (c.base >= 30 && c.base <= 32) base30to32 += 1;
      });
    });
    return {
      mains: dataMains().length,
      youCombos: youCombos,
      jiRows: jiRows,
      twoStarRows: twoStar,
      base38plus: base38plus,
      base30to32: base30to32,
      source: d && d.meta ? d.meta.source : '',
      globalStats: d ? d.globalStats : null
    };
  }

  /** 养成的经济学结论（由数据计算，不写死）。 */
  function economicsConclusion() {
    var s = stats();
    return {
      text:
        '优先基础分 ≥38 的组合：缺口 ≤7，只需 1 条 3 星契合词条（+10）即可到「极」；' +
        'base 30~32 缺 13~15，需要 2 条高星词条（通常 5 星），成本明显更高——' +
        '建议先换组合/提升基础关系分，再考虑洗练词条。',
      numbers: {
        base38plusCombos: s.base38plus,
        base30to32Combos: s.base30to32,
        twoStarRows: s.twoStarRows
      },
      confidence: '推断（基于数据矩阵与词条加成规则）'
    };
  }

  /** 养成行动清单（客户端字段确证的部分 + 待验证项）。 */
  function actionChecklist() {
    return [
      {
        step: '1. 学习触发词条',
        text: '学习笔记时按契合度触发「XX球员契合」词条；契合度越高触发越多，额外学习 1~6 条权重。',
        confidence: '客户端确证'
      },
      {
        step: '2. 改造',
        text: '同角色 / 金色品质 / 书签锁定词条，把需要的契合词条保留下来。',
        confidence: '客户端确证'
      },
      {
        step: '3. 洗练',
        text: '洗练词条数与数值上下限；目标是凑「* / ** / ***」档位，不追求数值最大化（同档等价）。',
        confidence: '客户端确证'
      },
      {
        step: '4. 传承',
        text: '用传承石把词条传承到新笔记；替换主力/升级笔记时先看传承成本。',
        confidence: '客户端确证'
      },
      {
        step: '5. 分解 / 记录笔等级',
        text: '多余笔记分解换资源；记录笔等级影响笔记养成上限（具体数值待验证）。',
        confidence: '待验证'
      }
    ];
  }

  /* ================================================================== *
   * 运行时计算（基于「我的角色」过滤；不再依赖预生成的 37 人全量列表）
   * ================================================================== */

  function normName(name) {
    return String(name == null ? '' : name)
      .replace(/[\s·]/g, '')
      .trim();
  }

  var matrixCache = null;
  function matrixIndex() {
    if (matrixCache) return matrixCache;
    var d = getData();
    var players = (d && d.matrix && d.matrix.players) || [];
    var rows = (d && d.matrix && d.matrix.rows) || [];
    var idx = Object.create(null);
    players.forEach(function (p, i) {
      idx[normName(p)] = i;
    });
    matrixCache = { players: players, rows: rows, idx: idx };
    return matrixCache;
  }

  function resetCache() {
    matrixCache = null;
  }

  function scoreOf(mainName, noteName) {
    var mi = matrixIndex();
    var r = mi.idx[normName(mainName)];
    var c = mi.idx[normName(noteName)];
    if (r == null || c == null) return null;
    var v = mi.rows[r] && mi.rows[r][c];
    return typeof v === 'number' ? v : null;
  }

  /** 矩阵缺数据的角色（角色表里有、矩阵里没有，例如百目鬼 剑）。 */
  function dataMissingNames() {
    var B = (typeof globalThis !== 'undefined' && globalThis.BBT) || {};
    var ownership = B.ownership || null;
    var chars = ownership ? ownership.characters() : [];
    var mi = matrixIndex();
    return chars
      .filter(function (c) { return mi.idx[normName(c.name)] == null; })
      .map(function (c) { return c.name; });
  }

  function ownershipApi() {
    var B = (typeof globalThis !== 'undefined' && globalThis.BBT) || {};
    return B.ownership || null;
  }

  function ownedSetOf(ownedIds) {
    var ownership = ownershipApi();
    if (!ownership) return null;
    if (Array.isArray(ownedIds)) return ownership.toSet(ownedIds);
    return ownership.toSet(ownership.allIds());
  }

  function isNameOwned(name, ownedSet) {
    var ownership = ownershipApi();
    if (!ownership || !ownedSet) return true;
    var id = ownership.nameToId(name);
    if (id == null) return false;
    return ownedSet[id] === true;
  }

  /**
   * 运行时枚举某主力的两本组合（可被拥有范围/排除项过滤）。
   * @param {string} mainName
   * @param {Array<string>} ownedIds content_id 数组
   * @param {Object} opts { excludeNotes:[] }
   * @returns {Object} { main, dataMissing, combos:[{note1,note2,v1,v2,base,tier}] }
   */
  function enumerateCombosForMain(mainName, ownedIds, opts) {
    var o = opts || {};
    var mi = matrixIndex();
    var row = mi.idx[normName(mainName)];
    if (row == null) {
      return { main: mainName, dataMissing: true, combos: [], totalPossible: 0 };
    }
    var ownedSet = ownedSetOf(ownedIds);
    var exclude = o.excludeNotes || [];
    var scores = [];
    mi.players.forEach(function (noteName, i) {
      if (i === row) return;
      if (!isNameOwned(noteName, ownedSet)) return;
      if (inExclude(noteName, exclude)) return;
      var s = mi.rows[row] && mi.rows[row][i];
      if (typeof s !== 'number' || s <= 0) return;
      scores.push({ note: noteName, score: s });
    });
    var combos = [];
    for (var i = 0; i < scores.length; i++) {
      for (var j = i + 1; j < scores.length; j++) {
        var base = scores[i].score + scores[j].score;
        combos.push({
          note1: scores[i].note,
          note2: scores[j].note,
          v1: scores[i].score,
          v2: scores[j].score,
          base: base,
          tier: tierOf(base)
        });
      }
    }
    combos.sort(function (a, b) { return b.base - a.base; });
    return { main: mainName, dataMissing: false, combos: combos };
  }

  /** 模式 A（运行时，按拥有范围过滤）。 */
  function runtimeRegular(mainName, ownedIds, opts) {
    var o = opts || {};
    var res = enumerateCombosForMain(mainName, ownedIds, o);
    if (res.dataMissing) return { main: mainName, dataMissing: true, total: 0, combos: [] };
    var you = res.combos.filter(function (c) { return c.base >= 30; });
    var maxBase = you.length ? you[0].base : null;
    var list = you.filter(function (c) { return c.base >= 30; });
    if (o.sort === 'asc') list = list.slice().sort(function (a, b) { return a.base - b.base || a.v1 - b.v1; });
    else list = list.slice();
    return {
      main: mainName,
      dataMissing: false,
      total: list.length,
      maxBase: maxBase,
      excludedCount: o.excludeNotes && o.excludeNotes.length ? 'filtered' : 0,
      combos: list.map(function (c) {
        return {
          note1: c.note1,
          note2: c.note2,
          base: c.base,
          v1: c.v1,
          v2: c.v2,
          tier: c.tier,
          isTop: c.base === maxBase,
          margin: tierMargin(c.base)
        };
      })
    };
  }

  /** 模式 B（运行时）：冲「极」路径，按当前假设重算。 */
  function runtimeJi(mainName, ownedIds, opts) {
    var o = opts || {};
    var mode = o.mode === 'one' || o.mode === 'multi' ? o.mode : 'two';
    var res = enumerateCombosForMain(mainName, ownedIds, o);
    if (res.dataMissing) {
      return { main: mainName, dataMissing: true, mode: mode, rows: [], total: 0, reachableCount: 0, unreachableCount: 0 };
    }
    var rows = res.combos
      .filter(function (c) { return c.base >= 30; })
      .map(function (c) {
        var computed = computePlans(45 - c.base, mode);
        return {
          note1: c.note1,
          note2: c.note2,
          base: c.base,
          v1: c.v1,
          v2: c.v2,
          tier: c.tier,
          needBonus: Math.max(0, 45 - c.base),
          mode: mode,
          reachable: computed.reachable,
          minTotalStars: computed.minStars,
          plans: computed.plans.map(function (p) { return p.label; }),
          highlight: !computed.reachable
            ? 'unreachable'
            : computed.minStars <= 2
              ? 'two-star'
              : computed.minStars === 3
                ? 'three-star'
                : 'normal'
        };
      });
    rows.sort(function (a, b) {
      if (a.reachable !== b.reachable) return a.reachable ? -1 : 1;
      var sa = a.minTotalStars == null ? 999 : a.minTotalStars;
      var sb = b.minTotalStars == null ? 999 : b.minTotalStars;
      if (sa !== sb) return sa - sb;
      return b.base - a.base;
    });
    return {
      main: mainName,
      dataMissing: false,
      mode: mode,
      rows: rows,
      total: rows.length,
      reachableCount: rows.filter(function (r) { return r.reachable; }).length,
      unreachableCount: rows.filter(function (r) { return !r.reachable; }).length,
      twoStarCount: rows.filter(function (r) { return r.highlight === 'two-star'; }).length,
      threeStarCount: rows.filter(function (r) { return r.highlight === 'three-star'; }).length
    };
  }

  /** 已拥有主力列表（矩阵内、已拥有）。 */
  function ownedMains(ownedIds) {
    var ownedSet = ownedSetOf(ownedIds);
    var mi = matrixIndex();
    return mi.players.filter(function (name) {
      return ownedSet ? ownedSet[(ownershipApi().nameToId(name) || '')] === true : true;
    });
  }

  /** 运行时概览表（已拥有范围内）。 */
  function runtimeSummary(ownedIds, opts) {
    var o = opts || {};
    var mode = o.mode === 'one' || o.mode === 'multi' ? o.mode : 'two';
    return ownedMains(ownedIds).map(function (main) {
      var regular = runtimeRegular(main, ownedIds, {});
      var ji = runtimeJi(main, ownedIds, { mode: mode });
      var best = ji.rows.slice().sort(function (a, b) { return b.base - a.base; })[0] || null;
      return {
        main: main,
        youCount: regular.total,
        maxBase: regular.maxBase,
        topYou: regular.combos[0] || null,
        cheapestStars: best ? best.minTotalStars : null,
        bestBase: best ? best.base : null
      };
    }).sort(function (a, b) {
      var sa = a.cheapestStars == null ? 999 : a.cheapestStars;
      var sb = b.cheapestStars == null ? 999 : b.cheapestStars;
      return sa - sb || (b.maxBase || 0) - (a.maxBase || 0);
    });
  }

  /**
   * 增量提示：当前最优组合若因「笔记角色未拥有」被排除，提示抽到某角色后的收益。
   * @returns {Object|null} { text, missingNotes, bestBase, starsNeeded }
   */
  function upgradeHint(mainName, ownedIds) {
    var mi = matrixIndex();
    var row = mi.idx[normName(mainName)];
    if (row == null) return null;
    var ownership = ownershipApi();
    if (!ownership) return null;
    var ownedSet = ownedSetOf(ownedIds);
    var all = [];
    mi.players.forEach(function (note, i) {
      if (i === row) return;
      var s = mi.rows[row] && mi.rows[row][i];
      if (typeof s === 'number' && s > 0) all.push({ note: note, score: s, owned: isNameOwned(note, ownedSet) });
    });
    if (all.length < 2) return null;
    all.sort(function (a, b) { return b.score - a.score; });
    var ownedTop = all.filter(function (x) { return x.owned; }).slice(0, 2);
    var ownedBest = ownedTop.length === 2 ? ownedTop[0].score + ownedTop[1].score : 0;
    // 全量最优（允许未拥有）
    var globalBest = all[0].score + all[1].score;
    if (globalBest <= ownedBest) return null;
    var missing = all.slice(0, 2).filter(function (x) { return !x.owned; }).map(function (x) { return x.note; });
    if (!missing.length) return null;
    var computed = computePlans(45 - globalBest, 'two');
    var stars = computed.reachable ? computed.minStars : null;
    var plans = computed.plans.map(function (p) { return p.label; }).slice(0, 2);
    return {
      text:
        '若获得【' + missing.join('、') + '】，最优组合变为 ' +
        all[0].note + ' + ' + all[1].note + '（合计 ' + globalBest + '）' +
        (stars != null ? ' → 冲到「极」仅需 ' + stars + ' 星词条' : ''),
      missingNotes: missing,
      bestBase: globalBest,
      ownedBestBase: ownedBest,
      starsNeeded: stars,
      plans: plans,
      confidence: '推断（基于矩阵数据）'
    };
  }

  /** 数据完整性自检（构建后可用；测试也用它）。 */
  function validate() {    var d = getData();
    var errors = [];
    if (!d) return ['笔记数据未加载'];
    if (!Array.isArray(d.mains) || d.mains.length !== 37) {
      errors.push('主力数量应为 37，实际 ' + (d.mains ? d.mains.length : 0));
    }
    (d.mains || []).forEach(function (m) {
      if (!Array.isArray(m.youCombos) || !m.youCombos.length) errors.push(m.main + ' 缺少优组合');
      m.youCombos.forEach(function (c) {
        if (c.base !== c.v1 + c.v2) errors.push(m.main + ' 组合基数不符：' + c.note1 + '+' + c.note2);
        if (c.base < 30) errors.push(m.main + ' 优组合 base <30：' + c.note1 + '+' + c.note2);
      });
    });
    var players = (d.matrix && d.matrix.players) || [];
    var rows = (d.matrix && d.matrix.rows) || [];
    if (players.length !== 37) errors.push('矩阵球员数应为 37');
    if (rows.length !== 37) errors.push('矩阵行数应为 37');
    for (var i = 0; i < Math.min(rows.length, 37); i++) {
      if (rows[i].length !== 37) {
        errors.push('第 ' + i + ' 行矩阵列数不为 37');
        break;
      }
      if (rows[i][i] !== 0) errors.push('矩阵对角不为 0：' + i);
      for (var j = i + 1; j < 37; j++) {
        if (rows[i][j] !== rows[j][i]) {
          errors.push('矩阵不对称：' + i + ',' + j);
          break;
        }
      }
    }
    return errors;
  }

  return {
    TIER_RULE: TIER_RULE,
    TIER_ORDER: TIER_ORDER,
    ENTRY_BONUS: ENTRY_BONUS,
    getData: getData,
    tierOf: tierOf,
    isYou: isYou,
    isJi: isJi,
    tierMargin: tierMargin,
    entryBonus: entryBonus,
    entryStars: entryStars,
    parsePlan: parsePlan,
    planLabel: planLabel,
    starName: starName,
    computePlans: computePlans,
    mainNames: mainNames,
    byMain: byMain,
    dataMains: dataMains,
    regularCombos: regularCombos,
    jiPaths: jiPaths,
    summaryTable: summaryTable,
    stats: stats,
    economicsConclusion: economicsConclusion,
    actionChecklist: actionChecklist,
    // —— 运行时（按「我的角色」过滤）——
    scoreOf: scoreOf,
    matrixIndex: matrixIndex,
    resetCache: resetCache,
    dataMissingNames: dataMissingNames,
    enumerateCombosForMain: enumerateCombosForMain,
    runtimeRegular: runtimeRegular,
    runtimeJi: runtimeJi,
    runtimeSummary: runtimeSummary,
    ownedMains: ownedMains,
    upgradeHint: upgradeHint,
    validate: validate
  };
});

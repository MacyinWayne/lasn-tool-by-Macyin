/*!
 * core/game-data.js —— 数据层（T6 改造：页面只读这里，不直接写死常量）
 *
 * 集中内容：
 *   1) 角色基础数据（T1 characters.js）
 *   2) 派生评分 / 梯队（T8 roster.js）
 *   3) 笔记词条库 / 关系矩阵（notes-harmony.js）
 *   4) 全模型（T3 model.js）
 *   5) 公式参数（训练审计、表情一致乘区、PvP 判定初版）
 *   6) 数据版本 / 来源 / 置信度元信息
 *
 * 页面通过 BBT.gameData 或 store 读取；后续新需求只需替换/扩展本文件的 accessor。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.gameData = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var DATA_VERSION = 'v2026.11.05';
  var UPDATED_AT = '2026-11-05';
  var SCHEMA_VERSION = 1;

  var SOURCES = [
    { id: 'characters', label: '角色基础数据', path: 'data/structured/characters.json', module: 'BBCharacterData', confidence: '单源（GameKee wiki 参考值）' },
    { id: 'roster', label: '派生评分/模板/梯队', path: 'data/structured/derived_roster.json', module: 'BBRosterData', confidence: '多源一致 + 推断' },
    { id: 'notes', label: '笔记契合矩阵/冲极路径', path: 'data/community/notes_harmony/', module: 'BBNotesHarmony', confidence: '单源（图片转录，22/22 和校验）' },
    { id: 'model', label: 'T3 数值模型', path: 'knowledge/model.json', module: 'BBTModel', confidence: '混合（客户端确证/社区实测/推断/待验证）' },
    { id: 'expression', label: '表情一致乘区实测', path: 'knowledge/表情机制_希雅二星虚空人.md + 用户实机', module: 'inline', confidence: '实测（2026-11-05；7/8/9 推算）' },
    { id: 'pvp', label: 'PvP 判定初版', path: '用户实机 + 社区（初版，待复核）', module: 'inline', confidence: '初版/待复核' },
    { id: 'scenarios', label: '养成场景/训练方向/圣山', path: 'data/structured/saint_mountains.json + 用户确认', module: 'BBScenarios', confidence: '用户口述（绿/红圣山待补）' },
    { id: 'equipment', label: '器材名称/属性/效果池/词条/社区攻略', path: 'data/structured/guides_cleaned/equipment_merged.json', module: 'BBEquipmentData', confidence: '文本确证 + 品质推断 + 社区攻略；数值未解' },
    { id: 'noteEntries', label: '笔记词条样本/类型/规则', path: 'data/pc-client/snapshots/.../notes_from_log.json + note_samples.json', module: 'BBNoteEntriesData', confidence: '日志字段=客户端事实；具名词条=截图 OCR；映射/概率待补' }
  ];

  function gRoot() {
    return typeof globalThis !== 'undefined' ? globalThis : this;
  }

  function readGlobal(name) {
    var r = gRoot();
    return r[name] != null ? r[name] : null;
  }

  function characters() {
    var d = readGlobal('BBCharacterData') || (gRoot().BBT && gRoot().BBT.characterData) || null;
    return d && Array.isArray(d.characters) ? d.characters : [];
  }

  function characterByContentId(contentId) {
    var id = String(contentId);
    var list = characters();
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].contentId) === id) return list[i];
    }
    return null;
  }

  function characterByName(name) {
    var list = characters();
    var norm = function (s) { return String(s == null ? '' : s).replace(/[\s·]/g, ''); };
    var target = norm(name);
    for (var i = 0; i < list.length; i++) {
      if (norm(list[i].name) === target) return list[i];
    }
    return null;
  }

  function roster() {
    return readGlobal('BBRosterData') || (gRoot().BBT && gRoot().BBT.rosterData) || null;
  }

  function notes() {
    return readGlobal('BBNotesHarmony') || (gRoot().BBT && gRoot().BBT.notesData) || null;
  }

  function model() {
    return readGlobal('BBTModel') || (gRoot().BBT && gRoot().BBT.model) || null;
  }

  function scenarios() {
    return readGlobal('BBScenarios') || (gRoot().BBT && gRoot().BBT.scenarios) || null;
  }

  function equipment() {
    return readGlobal('BBEquipmentData') || (gRoot().BBT && gRoot().BBT.equipmentData) || null;
  }

  function noteEntries() {
    return readGlobal('BBNoteEntriesData') || (gRoot().BBT && gRoot().BBT.noteEntriesData) || null;
  }

  function notesNew() {
    return readGlobal('BBNotesNewData') || (gRoot().BBT && gRoot().BBT.notesNewData) || null;
  }

  function paramDefs() {
    var p = gRoot().BBT && gRoot().BBT.params;
    return p && Array.isArray(p.PARAM_DEFS) ? p.PARAM_DEFS : [];
  }

  /** 笔记词条库（矩阵 + 档位/词条加成规则），供笔记模块与后续需求复用。 */
  function notesLibrary() {
    var d = notes();
    if (!d) return null;
    return {
      version: DATA_VERSION,
      source: d.source,
      confidence: '单源（图片转录，待客户端逐格 diff）',
      meta: d.meta || {},
      matrix: d.matrix || { players: [], rows: [] },
      globalStats: d.globalStats || {},
      mains: d.mains || [],
      entryBonus: (d.meta && d.meta.entryBonus) || { '*': 2, '**': 5, '***': 10 },
      tierRule: (d.meta && d.meta.tierRule) || {}
    };
  }

  /**
   * 公式常量（最新结论集中在此；页面不写死）。
   * trainingAudit：经理 +2 / 陪练 0 / 器材 +1 / 成长率乘算（初版，待复核）
   * consistency：表情一致乘区实测表（2~6 实测；7~9 银行家舍入推算）
   * pvp：hit = base × (1 - disturb)；base = A + B × (x1 - x2)（初版，待复核）
   */
  var FORMULAS = {
    trainingAudit: {
      managerBonus: { value: 2, unit: '点', confidence: '推断', note: '经理在训练中提供 +2（新结论，待复核）' },
      assistantBonus: { value: 0, unit: '点', confidence: '推断', note: '陪练不提供额外训练加值（待复核）' },
      equipmentBonus: { value: 1, unit: '点', confidence: '实测', note: '对口器材 +1' },
      growthRate: { value: 100, unit: '%', confidence: '推断', note: '成长率按乘算处理（×100% = 不放大，待复核）' },
      source: '用户实机 + 社区（初版，待复核）',
      confidence: '初版/待复核'
    },
    expressionConsistency: {
      2: 1.5, 3: 1.8, 4: 2.0, 5: 2.2, 6: 2.5, 7: 2.8, 8: 3.0, 9: 3.2,
      measuredCounts: [2, 3, 4, 5, 6],
      estimatedCounts: [7, 8, 9],
      rule: '2~6 实测；7/8/9 = round1Banker(1+0.25n) 推算',
      source: '用户实机 2026-11-05（2 哭脸 150%、3 大笑 288%、3 微笑 234%、4 大笑 360%、5 微笑 330%、6 人 803%）',
      confidence: '实测（7/8/9 推算·待实测）'
    },
    pvp: {
      hitFormula: 'hit = base × (1 − disturb)',
      baseFormula: 'base = A + B × (x1 − x2)',
      A: null,
      B: null,
      disturb: null,
      confidence: '初版/待复核',
      note: 'PvP 判定初版：命中 = 基础命中 ×（1−干扰）？A/B/干扰系数待更多样本反解，页面仅展示公式结构。',
      source: '用户实机 + 社区初步结论'
    },
    expression803: {
      formula: '(1 + 6 × (20% + 8% + 4%)) × (2.5 + 0.25) = 803%',
      confidence: '实测',
      source: '社区实测 + 用户实机交叉'
    }
  };

  function formulas() {
    return FORMULAS;
  }

  function meta() {
    return {
      dataVersion: DATA_VERSION,
      updatedAt: UPDATED_AT,
      schemaVersion: SCHEMA_VERSION,
      sources: SOURCES,
      counts: {
        characters: characters().length,
        notesMains: notes() && notes().mains ? notes().mains.length : 0,
        params: paramDefs().length
      }
    };
  }

  return {
    DATA_VERSION: DATA_VERSION,
    UPDATED_AT: UPDATED_AT,
    SCHEMA_VERSION: SCHEMA_VERSION,
    SOURCES: SOURCES,
    characters: characters,
    characterByContentId: characterByContentId,
    characterByName: characterByName,
    roster: roster,
    notes: notes,
    notesLibrary: notesLibrary,
    model: model,
    scenarios: scenarios,
    equipment: equipment,
    noteEntries: noteEntries,
    notesNew: notesNew,
    paramDefs: paramDefs,
    formulas: formulas,
    meta: meta
  };
});

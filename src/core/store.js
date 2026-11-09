/*!
 * core/store.js —— 共享状态仓库（T6 改造：让每个页签可独立替换）
 *
 * 统一管理：
 *   1) 我的角色（owned content_id）
 *   2) 参数覆盖 / 参数状态（values + teamSkills + consistencyExtras + ui）
 *   3) 用户配置的 localStorage 版本号 + 导出/导入 JSON
 *
 * 设计：视图仍通过 ctx.state / ctx.store 访问，不直接写 localStorage。
 * 兼容旧数据：沿用 bbt.state.v1（参数）与 bbt.ownedCharacters（角色）。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.store = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var CONFIG_SCHEMA_VERSION = 2;
  var CONFIG_KEY = 'bbt.config.v2';
  var NOTES_KEY = 'bbt.characterNotes.v1';
  var TEAMS_KEY = 'bbt.teams.v1';
  var BUILDS_KEY = 'bbt.characterBuilds.v1';
  var EQUIP_NOTES_KEY = 'bbt.equipmentNotes.v1';
  var EQUIP_LINKS_KEY = 'bbt.equipmentLinks.v1';
  var EQUIP_BUILDS_KEY = 'bbt.equipmentBuilds.v1';
  var NOTE_BUILDS_KEY = 'bbt.noteBuilds.v1';
  var HARMONY_MANUAL_KEY = 'bbt.harmonyManual.v1';
  var NOTE_TAGS = ['实战手感', '养成优先', '对位克制', '阵容适配', '待观察'];
  var FIT_VALUES = ['适配', '需特定技能组合', '不适配'];
  var SKILL_SOURCES = ['定位池', '器材', '笔记', '天赋事件', '转盘', '手动'];

  function sanitizeNoteEntries(list) {
    if (!Array.isArray(list)) return [];
    return list
      .filter((e) => e && typeof e === 'object' && typeof e.name === 'string' && e.name.trim())
      .slice(0, 20)
      .map((e) => ({
        name: e.name.trim().slice(0, 80),
        type: typeof e.type === 'string' ? e.type.slice(0, 20) : '',
        reason: typeof e.reason === 'string' ? e.reason.slice(0, 200) : ''
      }));
  }

  function sanitizeNoteBuilds(map) {
    var out = {};
    if (!map || typeof map !== 'object') return out;
    Object.keys(map).forEach((key) => {
      if (!/^\d+$/.test(String(key))) return;
      var b = map[key];
      if (!b || typeof b !== 'object') return;
      var carriers = Array.isArray(b.carriers)
        ? b.carriers.slice(0, 2).map((x) => (x != null && /^\d+$/.test(String(x)) ? String(x) : null))
        : [null, null];
      var start = b.start && typeof b.start === 'object'
        ? {
            ownerId: b.start.ownerId != null ? String(b.start.ownerId) : '',
            entry: typeof b.start.entry === 'string' ? b.start.entry.slice(0, 80) : '',
            quality: typeof b.start.quality === 'string' ? b.start.quality.slice(0, 20) : ''
          }
        : null;
      var fitStars = Array.isArray(b.fitStars)
        ? [0, 1].map((i) => (typeof b.fitStars[i] === 'string' && ['', '*', '**', '***'].indexOf(b.fitStars[i]) >= 0 ? b.fitStars[i] : ''))
        : ['', ''];
      var clean = {
        directionId: typeof b.directionId === 'string' ? b.directionId.slice(0, 40) : '',
        targetPosition: typeof b.targetPosition === 'string' && b.targetPosition ? b.targetPosition.slice(0, 10) : null,
        carriers: carriers,
        dogfoodCarrierId: b.dogfoodCarrierId != null && /^\d+$/.test(String(b.dogfoodCarrierId)) ? String(b.dogfoodCarrierId) : null,
        dogfoodOtherId: b.dogfoodOtherId != null && /^\d+$/.test(String(b.dogfoodOtherId)) ? String(b.dogfoodOtherId) : null,
        dogfoodFitStar: typeof b.dogfoodFitStar === 'string' && ['', '*', '**', '***'].indexOf(b.dogfoodFitStar) >= 0 ? b.dogfoodFitStar : '',
        cycleRoleId: b.cycleRoleId != null && /^\d+$/.test(String(b.cycleRoleId)) ? String(b.cycleRoleId) : null,
        cycleSize: [3, 4, 5].indexOf(Number(b.cycleSize)) >= 0 ? Number(b.cycleSize) : null,
        cycleIds: Array.isArray(b.cycleIds)
          ? b.cycleIds.slice(0, 5).map((v) => String(v)).filter((v) => /^\d+$/.test(v))
          : [],
        fitStars: fitStars,
        bonusMode: b.bonusMode === 'trigger' ? 'trigger' : 'static',
        entries: sanitizeNoteEntries(b.entries),
        start: start,
        note: typeof b.note === 'string' ? b.note.slice(0, 2000) : '',
        updatedAt: typeof b.updatedAt === 'string' ? b.updatedAt : new Date().toISOString()
      };
      if (!clean.directionId && !clean.targetPosition && !clean.entries.length && !clean.carriers[0] && !clean.carriers[1] &&
        !clean.note && !clean.cycleSize && !clean.cycleIds.length && !clean.cycleRoleId) return;
      out[String(key)] = clean;
    });
    return out;
  }

  function sanitizeHarmonyManual(map) {
    var out = {};
    if (!map || typeof map !== 'object') return out;
    Object.keys(map).forEach((key) => {
      if (!/^\d+\|\d+$/.test(String(key))) return;
      var score = Number(map[key]);
      if (!isFinite(score) || score < 0 || score > 99) return;
      out[String(key)] = Math.round(score);
    });
    return out;
  }

  function sanitizeSkills(list) {
    if (!Array.isArray(list)) return [];
    return list
      .filter((s) => s && typeof s === 'object' && typeof s.name === 'string' && s.name.trim())
      .slice(0, 12)
      .map((s) => ({
        name: s.name.trim().slice(0, 60),
        source: SKILL_SOURCES.indexOf(s.source) >= 0 ? s.source : '手动',
        required: s.required === true
      }));
  }

  function sanitizeEquipmentBuilds(map) {
    var out = {};
    if (!map || typeof map !== 'object') return out;
    Object.keys(map).forEach((key) => {
      if (!/^\d+\|[a-z-]+$/.test(String(key))) return;
      var b = map[key];
      if (!b || typeof b !== 'object') return;
      var clean = {
        characterId: String(b.characterId || key.split('|')[0] || ''),
        directionId: String(b.directionId || key.split('|')[1] || ''),
        equipmentIds: Array.isArray(b.equipmentIds)
          ? b.equipmentIds.filter((id) => /^eq_\d+$/.test(String(id))).slice(0, 5).map(String)
          : [],
        manualSkills: sanitizeSkills(b.manualSkills),
        note: typeof b.note === 'string' ? b.note.slice(0, 2000) : '',
        updatedAt: typeof b.updatedAt === 'string' ? b.updatedAt : new Date().toISOString()
      };
      if (!clean.equipmentIds.length && !clean.manualSkills.length && !clean.note) return;
      out[String(key)] = clean;
    });
    return out;
  }

  function sanitizeEquipmentNotes(map) {
    var out = {};
    if (!map || typeof map !== 'object') return out;
    Object.keys(map).forEach(function (id) {
      if (!/^eq_\d+$/.test(String(id))) return;
      var note = map[id];
      if (!note || typeof note !== 'object') return;
      var text = typeof note.text === 'string' ? note.text.slice(0, 2000) : '';
      if (!text) return;
      out[String(id)] = {
        text: text,
        updatedAt: typeof note.updatedAt === 'string' ? note.updatedAt : new Date().toISOString()
      };
    });
    return out;
  }

  function sanitizeEquipmentLinks(map) {
    var out = {};
    if (!map || typeof map !== 'object') return out;
    Object.keys(map).forEach(function (id) {
      if (!/^eq_\d+$/.test(String(id))) return;
      var link = map[id];
      if (!link || typeof link !== 'object') return;
      var offset = link.effectOffset == null ? null : Number(link.effectOffset);
      var clean = {
        effectOffset: isFinite(offset) ? offset : null,
        effectText: typeof link.effectText === 'string' ? link.effectText.slice(0, 300) : '',
        affixId: link.affixId != null ? String(link.affixId).slice(0, 40) : '',
        affixName: typeof link.affixName === 'string' ? link.affixName.slice(0, 100) : '',
        manualSkill: typeof link.manualSkill === 'string' ? link.manualSkill.slice(0, 120) : '',
        note: typeof link.note === 'string' ? link.note.slice(0, 500) : '',
        updatedAt: typeof link.updatedAt === 'string' ? link.updatedAt : new Date().toISOString()
      };
      if (clean.effectOffset == null && !clean.affixId && !clean.note && !clean.manualSkill) return;
      out[String(id)] = clean;
    });
    return out;
  }

  function sanitizeEquipmentList(list) {
    if (!Array.isArray(list)) return [];
    return list
      .filter((item) => item && typeof item === 'object')
      .slice(0, 5)
      .map((item) => ({
        name: typeof item.name === 'string' ? item.name.slice(0, 60) : '',
        skill: typeof item.skill === 'string' ? item.skill.slice(0, 120) : '',
        source: typeof item.source === 'string' ? item.source.slice(0, 120) : ''
      }))
      .filter((item) => item.name || item.skill);
  }

  function sanitizeBuilds(map) {
    var out = {};
    if (!map || typeof map !== 'object') return out;
    Object.keys(map).forEach((id) => {
      var key = String(id);
      if (!/^\d+$/.test(key)) return;
      var b = map[key];
      if (!b || typeof b !== 'object') return;
      var build = {
        directionId: typeof b.directionId === 'string' ? b.directionId.slice(0, 40) : '',
        altPosition: typeof b.altPosition === 'string' ? b.altPosition.slice(0, 20) : null,
        note: typeof b.note === 'string' ? b.note.slice(0, 2000) : '',
        patchesNote: typeof b.patchesNote === 'string' ? b.patchesNote.slice(0, 1000) : '',
        equipment: sanitizeEquipmentList(b.equipment),
        skills: sanitizeSkills(b.skills),
        updatedAt: typeof b.updatedAt === 'string' ? b.updatedAt : new Date().toISOString()
      };
      if (
        !build.directionId &&
        !build.altPosition &&
        !build.note &&
        !build.patchesNote &&
        !build.equipment.length &&
        !build.skills.length
      ) {
        return;
      }
      out[key] = build;
    });
    return out;
  }

  function sanitizeFitOverrides(map) {
    var out = {};
    if (!map || typeof map !== 'object') return out;
    Object.keys(map).forEach(function (key) {
      var value = map[key];
      if (FIT_VALUES.indexOf(value) >= 0) out[String(key)] = value;
    });
    return out;
  }

  function sanitizeTextMap(map) {
    var out = {};
    if (!map || typeof map !== 'object') return out;
    Object.keys(map).forEach(function (key) {
      if (typeof map[key] === 'string' && map[key]) out[String(key)] = map[key].slice(0, 2000);
    });
    return out;
  }

  function sanitizePlans(map) {
    var out = {};
    if (!map || typeof map !== 'object') return out;
    Object.keys(map).forEach(function (id) {
      var p = map[id];
      if (!p || typeof p !== 'object') return;
      var plan = {
        id: String(p.id || id),
        name: typeof p.name === 'string' && p.name ? p.name.slice(0, 60) : '未命名方案',
        sceneId: String(p.sceneId || ''),
        directionId: String(p.directionId || ''),
        mountainId: p.mountainId ? String(p.mountainId) : null,
        mainId: p.mainId != null ? String(p.mainId) : null,
        coachIds: Array.isArray(p.coachIds)
          ? p.coachIds.slice(0, 4).map(String)
          : [],
        equipment: Array.isArray(p.equipment)
          ? p.equipment.slice(0, 5).map(function (x) { return typeof x === 'string' ? x.slice(0, 60) : ''; })
          : [],
        notes: Array.isArray(p.notes)
          ? p.notes.slice(0, 2).map(function (x) { return typeof x === 'string' ? x.slice(0, 80) : ''; })
          : [],
        note: typeof p.note === 'string' ? p.note.slice(0, 2000) : '',
        updatedAt: typeof p.updatedAt === 'string' ? p.updatedAt : new Date().toISOString()
      };
      out[plan.id] = plan;
    });
    return out;
  }

  function sanitizeTeams(input) {
    var data = input && typeof input === 'object' ? input : {};
    return {
      plans: sanitizePlans(data.plans),
      fitOverrides: sanitizeFitOverrides(data.fitOverrides),
      exceptions: sanitizeTextMap(data.exceptions),
      notesByKey: sanitizeTextMap(data.notesByKey)
    };
  }

  function sanitizeNote(input) {
    var note = input && typeof input === 'object' ? input : {};
    var stars = Math.round(Number(note.stars));
    if (!isFinite(stars) || stars < 1 || stars > 5) stars = null;
    var tags = Array.isArray(note.tags)
      ? note.tags.filter(function (t) { return typeof t === 'string' && NOTE_TAGS.indexOf(t) >= 0; }).slice(0, 10)
      : [];
    var text = typeof note.text === 'string' ? note.text.slice(0, 2000) : '';
    var updatedAt = typeof note.updatedAt === 'string' ? note.updatedAt : new Date().toISOString();
    return { stars: stars, tags: tags, text: text, updatedAt: updatedAt };
  }

  function sanitizeNotes(map) {
    var out = {};
    if (!map || typeof map !== 'object') return out;
    Object.keys(map).forEach(function (id) {
      var s = String(id);
      if (!/^\d+$/.test(s)) return;
      var note = sanitizeNote(map[s]);
      if (note.stars == null && !note.tags.length && !note.text) return; // 空笔记不存
      out[s] = note;
    });
    return out;
  }

  function getRoot() {
    return typeof globalThis !== 'undefined' ? globalThis : this;
  }

  function getBBT() {
    var r = getRoot();
    return r.BBT || {};
  }

  function paramsApi() {
    return getBBT().params || null;
  }

  function ownershipApi() {
    return getBBT().ownership || null;
  }

  function gameDataApi() {
    return getBBT().gameData || null;
  }

  function safeLocalStorage() {
    var r = getRoot();
    try {
      return r.localStorage || null;
    } catch (err) {
      return null;
    }
  }

  function readJson(key) {
    var ls = safeLocalStorage();
    if (!ls) return null;
    try {
      var raw = ls.getItem(key);
      if (raw == null) return null;
      return JSON.parse(raw);
    } catch (err) {
      return null;
    }
  }

  function writeJson(key, value) {
    var ls = safeLocalStorage();
    if (!ls) return false;
    try {
      ls.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      return false;
    }
  }

  function removeKey(key) {
    var ls = safeLocalStorage();
    if (!ls) return;
    try {
      ls.removeItem(key);
    } catch (err) {
      /* ignore */
    }
  }

  /**
   * 创建 store（单例由 app.js 持有；测试可独立创建）。
   * @returns {Object}
   */
  function createStore() {
    var listeners = [];
    var paramsState = null;
    var ownedIds = null;
    var configVersion = null;
    var characterNotes = {};
    var teams = { plans: {}, fitOverrides: {}, exceptions: {}, notesByKey: {} };
    var characterBuilds = {};
    var equipmentNotes = {};
    var equipmentLinks = {};
    var equipmentBuilds = {};
    var noteBuilds = {};
    var harmonyManual = {};

    function dataVersion() {
      var gd = gameDataApi();
      if (!gd) return 'unknown';
      if (typeof gd.meta === 'function') return gd.meta().dataVersion;
      return gd.meta && gd.meta.dataVersion ? gd.meta.dataVersion : 'unknown';
    }

    function notify(type) {
      listeners.slice().forEach(function (fn) {
        try {
          fn(type || 'change');
        } catch (err) {
          /* 视图监听失败不影响其它监听 */
        }
      });
    }

    /** 初始化：优先读新版配置，否则兼容旧 key。 */
    function init() {
      var p = paramsApi();
      var own = ownershipApi();
      var config = readJson(CONFIG_KEY);
      configVersion = config && config.schemaVersion != null ? config.schemaVersion : null;
      if (config && config.paramsState && p) {
        paramsState = p.normalizeState(config.paramsState);
        if (Array.isArray(config.ownedIds) && own) ownedIds = own.load() || config.ownedIds;
      }
      if (!paramsState && p) {
        var legacy = readJson(p.STORAGE_KEY);
        paramsState = legacy ? p.normalizeState(legacy) : p.createState();
      }
      if (ownedIds == null && own) {
        var saved = own.load();
        ownedIds = saved != null ? saved : own.allIds();
      }
      if (!paramsState) paramsState = { values: {}, teamSkills: [], consistencyExtras: [], ui: {} };
      if (ownedIds == null) ownedIds = [];
      // 角色笔记：优先新配置，其次独立 key
      characterNotes = sanitizeNotes(
        (config && config.characterNotes) || readJson(NOTES_KEY) || {}
      );
      // 养成配队：方案 / 适配度覆盖 / 例外标注 / 方案备注
      teams = sanitizeTeams((config && config.teams) || readJson(TEAMS_KEY) || {});
      // 角色养成配法（需求 #2b）
      characterBuilds = sanitizeBuilds(
        (config && config.characterBuilds) || readJson(BUILDS_KEY) || {}
      );
      // 器材说明（需求 #3）：每件器材笔记 + 手动技能/词条关联
      equipmentNotes = sanitizeEquipmentNotes(
        (config && config.equipmentNotes) || readJson(EQUIP_NOTES_KEY) || {}
      );
      equipmentLinks = sanitizeEquipmentLinks(
        (config && config.equipmentLinks) || readJson(EQUIP_LINKS_KEY) || {}
      );
      // 器材「按角色配置」（需求 #3b）
      equipmentBuilds = sanitizeEquipmentBuilds(
        (config && config.equipmentBuilds) || readJson(EQUIP_BUILDS_KEY) || {}
      );
      // 笔记养成（需求 #4）
      noteBuilds = sanitizeNoteBuilds((config && config.noteBuilds) || readJson(NOTE_BUILDS_KEY) || {});
      harmonyManual = sanitizeHarmonyManual(
        (config && config.harmonyManual) || readJson(HARMONY_MANUAL_KEY) || {}
      );
      return api;
    }

    function getParamsState() {
      return paramsState;
    }

    function saveParams(nextState) {
      if (nextState) paramsState = nextState;
      var p = paramsApi();
      if (p && paramsState) writeJson(p.STORAGE_KEY, paramsState);
      persistConfig();
      notify('params');
      return true;
    }

    function setParamsState(nextState) {
      var p = paramsApi();
      paramsState = p ? p.normalizeState(nextState) : nextState;
      return saveParams(paramsState);
    }

    function getOwned() {
      return (ownedIds || []).slice();
    }

    function setOwned(ids) {
      var own = ownershipApi();
      var p = paramsApi();
      var list = Array.isArray(ids) ? ids : [];
      if (own) {
        own.save(list);
        ownedIds = own.load() || [];
      } else {
        ownedIds = list.slice();
      }
      persistConfig();
      notify('owned');
      return getOwned();
    }

    function resetOwned() {
      var own = ownershipApi();
      if (own) {
        own.reset();
        ownedIds = own.allIds();
      }
      persistConfig();
      notify('owned');
      return getOwned();
    }

    /* ---------------- 角色笔记（bbt.characterNotes.v1） ---------------- */

    function persistNotes() {
      writeJson(NOTES_KEY, characterNotes);
      persistConfig();
    }

    function getCharacterNotes() {
      return JSON.parse(JSON.stringify(characterNotes));
    }

    function getCharacterNote(contentId) {
      var key = String(contentId);
      return characterNotes[key] ? JSON.parse(JSON.stringify(characterNotes[key])) : null;
    }

    function hasCharacterNote(contentId) {
      return !!characterNotes[String(contentId)];
    }

    /** 保存/更新一条笔记；空笔记自动删除。 */
    function setCharacterNote(contentId, input) {
      var key = String(contentId);
      var note = sanitizeNote(input);
      if (note.stars == null && !note.tags.length && !note.text) {
        delete characterNotes[key];
      } else {
        note.updatedAt = new Date().toISOString();
        characterNotes[key] = note;
      }
      persistNotes();
      notify('notes');
      return getCharacterNote(key);
    }

    function deleteCharacterNote(contentId) {
      var key = String(contentId);
      var existed = !!characterNotes[key];
      delete characterNotes[key];
      persistNotes();
      notify('notes');
      return existed;
    }

    function clearCharacterNotes() {
      characterNotes = {};
      persistNotes();
      notify('notes');
      return true;
    }

    /** 独立导出笔记（也可用整包 exportConfig / importConfig）。 */
    function exportNotes() {
      return {
        schemaVersion: CONFIG_SCHEMA_VERSION,
        exportedAt: new Date().toISOString(),
        dataVersion: dataVersion(),
        storageKey: NOTES_KEY,
        notes: JSON.parse(JSON.stringify(characterNotes))
      };
    }

    /** 导入笔记：支持对象或 JSON 字符串；失败不改变现有笔记。 */
    function importNotes(payload) {
      var data = payload;
      if (typeof payload === 'string') {
        try {
          data = JSON.parse(payload);
        } catch (err) {
          return { ok: false, errors: ['JSON 解析失败：' + err.message], count: 0 };
        }
      }
      var map = data && data.notes ? data.notes : data;
      if (!map || typeof map !== 'object' || Array.isArray(map)) {
        return { ok: false, errors: ['缺少 notes 对象'], count: 0 };
      }
      characterNotes = sanitizeNotes(map);
      persistNotes();
      notify('notes');
      return { ok: true, errors: [], count: Object.keys(characterNotes).length };
    }

    /* ---------------- 养成配队（bbt.teams.v1） ---------------- */

    function persistTeams() {
      writeJson(TEAMS_KEY, teams);
      persistConfig();
    }

    function clone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }

    function getTeams() {
      return clone(teams);
    }

    /** 方案 key：场景 + 方向 + 主练（用于方案备注）。 */
    function teamKey(sceneId, directionId, mainId) {
      return [sceneId || '', directionId || '', mainId == null ? 'none' : String(mainId)].join('|');
    }

    /**
     * 保存配队方案：不传 id 则新建；返回深拷贝。
     * @param {Object} plan { id?, name, sceneId, directionId, mountainId?, mainId, coachIds, equipment, notes, note }
     */
    function saveTeamPlan(plan) {
      var input = plan && typeof plan === 'object' ? plan : {};
      var sceneId = String(input.sceneId || '');
      var directionId = String(input.directionId || '');
      if (!sceneId || !directionId) return { ok: false, errors: ['缺少场景/训练方向'] };
      var id = input.id ? String(input.id) : 'team_' + Date.now().toString(36) + '_' + Math.floor(Math.random() * 1e4).toString(36);
      var existing = teams.plans[id];
      var count = Object.keys(teams.plans).length;
      var stored = sanitizePlans({
        [id]: {
          id: id,
          name: input.name || (existing && existing.name) || '方案 ' + (count + 1),
          sceneId: sceneId,
          directionId: directionId,
          mountainId: input.mountainId || null,
          mainId: input.mainId != null ? String(input.mainId) : null,
          coachIds: input.coachIds || [],
          equipment: input.equipment || [],
          notes: input.notes || [],
          note: typeof input.note === 'string' ? input.note : existing ? existing.note : ''
        }
      })[id];
      teams.plans[id] = stored;
      if (stored.note) {
        teams.notesByKey[teamKey(sceneId, directionId, stored.mainId)] = stored.note;
      }
      persistTeams();
      notify('teams');
      return { ok: true, errors: [], plan: clone(stored) };
    }

    function getTeamPlan(id) {
      return teams.plans[String(id)] ? clone(teams.plans[String(id)]) : null;
    }

    function listTeamPlans() {
      return Object.keys(teams.plans).map(function (id) { return clone(teams.plans[id]); });
    }

    function deleteTeamPlan(id) {
      var key = String(id);
      var existed = !!teams.plans[key];
      delete teams.plans[key];
      persistTeams();
      notify('teams');
      return existed;
    }

    /** 方案备注（key = 场景+方向+主练），即使未保存命名方案也可先写备注。 */
    function getTeamNote(sceneId, directionId, mainId) {
      return teams.notesByKey[teamKey(sceneId, directionId, mainId)] || '';
    }

    function setTeamNote(sceneId, directionId, mainId, text) {
      var key = teamKey(sceneId, directionId, mainId);
      var value = typeof text === 'string' ? text.slice(0, 2000) : '';
      if (value) teams.notesByKey[key] = value;
      else delete teams.notesByKey[key];
      persistTeams();
      notify('teams');
      return value;
    }

    /** 适配度覆盖：key = contentId|sceneId|directionId；value=null 表示恢复默认。 */
    function fitKey(contentId, sceneId, directionId) {
      return [String(contentId), String(sceneId), String(directionId)].join('|');
    }

    function getFitOverride(contentId, sceneId, directionId) {
      return teams.fitOverrides[fitKey(contentId, sceneId, directionId)] || null;
    }

    function setFitOverride(contentId, sceneId, directionId, value) {
      var key = fitKey(contentId, sceneId, directionId);
      if (value == null || value === '') delete teams.fitOverrides[key];
      else if (FIT_VALUES.indexOf(value) >= 0) teams.fitOverrides[key] = value;
      else return { ok: false, errors: ['适配度取值无效：' + value] };
      persistTeams();
      notify('teams');
      return { ok: true, errors: [] };
    }

    function getException(contentId) {
      return teams.exceptions[String(contentId)] || '';
    }

    function setException(contentId, text) {
      var key = String(contentId);
      var value = typeof text === 'string' ? text.slice(0, 500) : '';
      if (value) teams.exceptions[key] = value;
      else delete teams.exceptions[key];
      persistTeams();
      notify('teams');
      return value;
    }

    function clearTeams() {
      teams = { plans: {}, fitOverrides: {}, exceptions: {}, notesByKey: {} };
      persistTeams();
      notify('teams');
      return true;
    }

    /* ---------------- 角色养成配法（bbt.characterBuilds.v1，需求 #2b） ---------------- */

    function persistBuilds() {
      writeJson(BUILDS_KEY, characterBuilds);
      persistConfig();
    }

    function getCharacterBuilds() {
      return clone(characterBuilds);
    }

    function getCharacterBuild(contentId) {
      var key = String(contentId);
      return characterBuilds[key] ? clone(characterBuilds[key]) : null;
    }

    /**
     * 保存/更新某角色的养成配法（合并字段）。
     * @param {string|number} contentId
     * @param {Object} patch { directionId?, altPosition?, note?, patchesNote?, equipment?, skills? }
     */
    function saveCharacterBuild(contentId, patch) {
      var key = String(contentId);
      if (!/^\d+$/.test(key)) return { ok: false, errors: ['contentId 无效'] };
      var base = characterBuilds[key] || {};
      var input = patch && typeof patch === 'object' ? patch : {};
      var merged = sanitizeBuilds({
        [key]: {
          directionId: input.directionId != null ? input.directionId : base.directionId,
          altPosition: input.altPosition != null ? input.altPosition : base.altPosition,
          note: input.note != null ? input.note : base.note,
          patchesNote: input.patchesNote != null ? input.patchesNote : base.patchesNote,
          equipment: input.equipment != null ? input.equipment : base.equipment,
          skills: input.skills != null ? input.skills : base.skills
        }
      })[key];
      if (!merged) {
        delete characterBuilds[key];
      } else {
        characterBuilds[key] = merged;
      }
      persistBuilds();
      notify('builds');
      return { ok: true, errors: [], build: getCharacterBuild(key) };
    }

    function deleteCharacterBuild(contentId) {
      var key = String(contentId);
      var existed = !!characterBuilds[key];
      delete characterBuilds[key];
      persistBuilds();
      notify('builds');
      return existed;
    }

    function clearCharacterBuilds() {
      characterBuilds = {};
      persistBuilds();
      notify('builds');
      return true;
    }

    /* ---------------- 器材说明（bbt.equipmentNotes.v1 / bbt.equipmentLinks.v1，需求 #3） ---------------- */

    function persistEquipment() {
      writeJson(EQUIP_NOTES_KEY, equipmentNotes);
      writeJson(EQUIP_LINKS_KEY, equipmentLinks);
      persistConfig();
    }

    function getEquipmentNotes() {
      return clone(equipmentNotes);
    }

    function getEquipmentNote(equipmentId) {
      var key = String(equipmentId);
      return equipmentNotes[key] ? clone(equipmentNotes[key]) : null;
    }

    function setEquipmentNote(equipmentId, text) {
      var key = String(equipmentId);
      if (!/^eq_\d+$/.test(key)) return { ok: false, errors: ['equipmentId 无效'] };
      var value = typeof text === 'string' ? text.slice(0, 2000) : '';
      if (!value) delete equipmentNotes[key];
      else equipmentNotes[key] = { text: value, updatedAt: new Date().toISOString() };
      persistEquipment();
      notify('equipment');
      return { ok: true, errors: [], note: getEquipmentNote(key) };
    }

    function deleteEquipmentNote(equipmentId) {
      var key = String(equipmentId);
      var existed = !!equipmentNotes[key];
      delete equipmentNotes[key];
      persistEquipment();
      notify('equipment');
      return existed;
    }

    function clearEquipmentNotes() {
      equipmentNotes = {};
      persistEquipment();
      notify('equipment');
      return true;
    }

    function getEquipmentLinks() {
      return clone(equipmentLinks);
    }

    function getEquipmentLink(equipmentId) {
      var key = String(equipmentId);
      return equipmentLinks[key] ? clone(equipmentLinks[key]) : null;
    }

    /**
     * 保存手动关联（效果文案池 / 器材词条）。
     * @param {string} equipmentId
     * @param {Object|null} link { effectOffset?, effectText?, affixId?, affixName?, note? }；传 null 清除
     */
    function setEquipmentLink(equipmentId, link) {
      var id = String(equipmentId);
      if (!/^eq_\d+$/.test(id)) return { ok: false, errors: ['equipmentId 无效'] };
      if (link == null) {
        delete equipmentLinks[id];
      } else {
        var cleaned = sanitizeEquipmentLinks({ [id]: link })[id];
        if (!cleaned) delete equipmentLinks[id];
        else equipmentLinks[id] = cleaned;
      }
      persistEquipment();
      notify('equipment');
      return { ok: true, errors: [], link: getEquipmentLink(id) };
    }

    function clearEquipmentLinks() {
      equipmentLinks = {};
      persistEquipment();
      notify('equipment');
      return true;
    }

    /* ---------------- 器材按角色配置（bbt.equipmentBuilds.v1，需求 #3b） ---------------- */

    function persistEquipmentBuilds() {
      writeJson(EQUIP_BUILDS_KEY, equipmentBuilds);
      persistConfig();
    }

    function equipmentBuildKey(characterId, directionId) {
      return String(characterId) + '|' + String(directionId);
    }

    function getEquipmentBuild(characterId, directionId) {
      var key = equipmentBuildKey(characterId, directionId);
      return equipmentBuilds[key] ? clone(equipmentBuilds[key]) : null;
    }

    function listEquipmentBuilds() {
      return Object.keys(equipmentBuilds).map(function (key) { return clone(equipmentBuilds[key]); });
    }

    /**
     * 保存「按角色配置」：器材推荐修正 + 手动技能 + 笔记。
     * @param {Object} patch { characterId, directionId, equipmentIds?, manualSkills?, note? }
     */
    function saveEquipmentBuild(patch) {
      var input = patch && typeof patch === 'object' ? patch : {};
      var characterId = String(input.characterId || '');
      var directionId = String(input.directionId || '');
      if (!/^\d+$/.test(characterId) || !directionId) {
        return { ok: false, errors: ['缺少角色/方向'] };
      }
      var key = equipmentBuildKey(characterId, directionId);
      var base = equipmentBuilds[key] || {};
      var merged = sanitizeEquipmentBuilds({
        [key]: {
          characterId: characterId,
          directionId: directionId,
          equipmentIds: input.equipmentIds != null ? input.equipmentIds : base.equipmentIds,
          manualSkills: input.manualSkills != null ? input.manualSkills : base.manualSkills,
          note: input.note != null ? input.note : base.note
        }
      })[key];
      if (!merged) delete equipmentBuilds[key];
      else equipmentBuilds[key] = merged;
      persistEquipmentBuilds();
      notify('equipment');
      return { ok: true, errors: [], build: getEquipmentBuild(characterId, directionId) };
    }

    function deleteEquipmentBuild(characterId, directionId) {
      var key = equipmentBuildKey(characterId, directionId);
      var existed = !!equipmentBuilds[key];
      delete equipmentBuilds[key];
      persistEquipmentBuilds();
      notify('equipment');
      return existed;
    }

    function clearEquipmentBuilds() {
      equipmentBuilds = {};
      persistEquipmentBuilds();
      notify('equipment');
      return true;
    }

    /* ---------------- 笔记养成（bbt.noteBuilds.v1 / bbt.harmonyManual.v1，需求 #4） ---------------- */

    function persistNoteBuilds() {
      writeJson(NOTE_BUILDS_KEY, noteBuilds);
      writeJson(HARMONY_MANUAL_KEY, harmonyManual);
      persistConfig();
    }

    function getNoteBuild(contentId) {
      var key = String(contentId);
      return noteBuilds[key] ? clone(noteBuilds[key]) : null;
    }

    function listNoteBuilds() {
      return Object.keys(noteBuilds).map(function (key) { return clone(noteBuilds[key]); });
    }

    function saveNoteBuild(contentId, patch) {
      var key = String(contentId);
      if (!/^\d+$/.test(key)) return { ok: false, errors: ['contentId 无效'] };
      var input = patch && typeof patch === 'object' ? patch : {};
      var base = noteBuilds[key] || {};
      var merged = sanitizeNoteBuilds({
        [key]: {
          directionId: input.directionId != null ? input.directionId : base.directionId,
          targetPosition: input.targetPosition != null ? input.targetPosition : base.targetPosition,
          carriers: input.carriers != null ? input.carriers : base.carriers,
          dogfoodCarrierId: input.dogfoodCarrierId != null ? input.dogfoodCarrierId : base.dogfoodCarrierId,
          dogfoodOtherId: input.dogfoodOtherId != null ? input.dogfoodOtherId : base.dogfoodOtherId,
          dogfoodFitStar: input.dogfoodFitStar != null ? input.dogfoodFitStar : base.dogfoodFitStar,
          cycleRoleId: input.cycleRoleId != null ? input.cycleRoleId : base.cycleRoleId,
          cycleSize: input.cycleSize != null ? input.cycleSize : base.cycleSize,
          cycleIds: input.cycleIds != null ? input.cycleIds : base.cycleIds,
          fitStars: input.fitStars != null ? input.fitStars : base.fitStars,
          bonusMode: input.bonusMode != null ? input.bonusMode : base.bonusMode,
          entries: input.entries != null ? input.entries : base.entries,
          start: input.start != null ? input.start : base.start,
          note: input.note != null ? input.note : base.note
        }
      })[key];
      if (!merged) delete noteBuilds[key];
      else noteBuilds[key] = merged;
      persistNoteBuilds();
      notify('noteBuilds');
      return { ok: true, errors: [], build: getNoteBuild(key) };
    }

    function deleteNoteBuild(contentId) {
      var key = String(contentId);
      var existed = !!noteBuilds[key];
      delete noteBuilds[key];
      persistNoteBuilds();
      notify('noteBuilds');
      return existed;
    }

    function clearNoteBuilds() {
      noteBuilds = {};
      persistNoteBuilds();
      notify('noteBuilds');
      return true;
    }

    function getHarmonyManual() {
      return clone(harmonyManual);
    }

    function harmonyKey(mainId, carrierId) {
      return String(mainId) + '|' + String(carrierId);
    }

    function getHarmonyScore(mainId, carrierId) {
      var key = harmonyKey(mainId, carrierId);
      return harmonyManual[key] != null ? harmonyManual[key] : null;
    }

    function setHarmonyScore(mainId, carrierId, score) {
      if (!/^\d+$/.test(String(mainId)) || !/^\d+$/.test(String(carrierId))) {
        return { ok: false, errors: ['角色 ID 无效'] };
      }
      var key = harmonyKey(mainId, carrierId);
      if (score == null || score === '') delete harmonyManual[key];
      else {
        var n = Number(score);
        if (!isFinite(n) || n < 0 || n > 99) return { ok: false, errors: ['契合分应在 0-99'] };
        harmonyManual[key] = Math.round(n);
      }
      persistNoteBuilds();
      notify('harmonyManual');
      return { ok: true, errors: [] };
    }

    function importHarmonyManual(payload) {
      var data = payload;
      if (typeof payload === 'string') {
        try {
          data = JSON.parse(payload);
        } catch (err) {
          return { ok: false, errors: ['JSON 解析失败：' + err.message], count: 0 };
        }
      }
      var map = data && data.pairs ? data.pairs : data;
      if (!map || typeof map !== 'object' || Array.isArray(map)) {
        return { ok: false, errors: ['缺少 pairs 对象'], count: 0 };
      }
      harmonyManual = sanitizeHarmonyManual(map);
      persistNoteBuilds();
      notify('harmonyManual');
      return { ok: true, errors: [], count: Object.keys(harmonyManual).length };
    }

    function clearHarmonyManual() {
      harmonyManual = {};
      persistNoteBuilds();
      notify('harmonyManual');
      return true;
    }

    function saveParamsOnly() {
      var p = paramsApi();
      if (p && paramsState) writeJson(p.STORAGE_KEY, paramsState);
    }

    function persistConfig() {
      writeJson(CONFIG_KEY, {
        schemaVersion: CONFIG_SCHEMA_VERSION,
        dataVersion: dataVersion(),
        savedAt: new Date().toISOString(),
        paramsState: paramsState,
        ownedIds: ownedIds || [],
        characterNotes: characterNotes,
        teams: teams,
        characterBuilds: characterBuilds,
        equipmentNotes: equipmentNotes,
        equipmentLinks: equipmentLinks,
        equipmentBuilds: equipmentBuilds,
        noteBuilds: noteBuilds,
        harmonyManual: harmonyManual
      });
    }

    /** 导出用户配置（可给其它机器/备份导入）。返回深拷贝，避免外部修改影响内部状态。 */
    function exportConfig() {
      var p = paramsApi();
      return {
        schemaVersion: CONFIG_SCHEMA_VERSION,
        exportedAt: new Date().toISOString(),
        dataVersion: dataVersion(),
        storageKeys: {
          config: CONFIG_KEY,
          params: p ? p.STORAGE_KEY : '',
          owned: ownershipApi() ? ownershipApi().STORAGE_KEY : '',
          notes: NOTES_KEY,
          teams: TEAMS_KEY,
          builds: BUILDS_KEY,
          equipmentNotes: EQUIP_NOTES_KEY,
          equipmentLinks: EQUIP_LINKS_KEY,
          equipmentBuilds: EQUIP_BUILDS_KEY,
          noteBuilds: NOTE_BUILDS_KEY,
          harmonyManual: HARMONY_MANUAL_KEY
        },
        ownedIds: getOwned(),
        paramsState: JSON.parse(JSON.stringify(paramsState)),
        characterNotes: JSON.parse(JSON.stringify(characterNotes)),
        teams: clone(teams),
        characterBuilds: clone(characterBuilds),
        equipmentNotes: clone(equipmentNotes),
        equipmentLinks: clone(equipmentLinks),
        equipmentBuilds: clone(equipmentBuilds),
        noteBuilds: clone(noteBuilds),
        harmonyManual: clone(harmonyManual)
      };
    }

    /**
     * 导入配置：支持对象或 JSON 字符串；失败不改变现有状态。
     * @returns {{ok:boolean, errors:string[]}}
     */
    function importConfig(payload) {
      var errors = [];
      var data = payload;
      if (typeof payload === 'string') {
        try {
          data = JSON.parse(payload);
        } catch (err) {
          return { ok: false, errors: ['JSON 解析失败：' + err.message] };
        }
      }
      if (!data || typeof data !== 'object') return { ok: false, errors: ['配置不是对象'] };
      var p = paramsApi();
      if (!p) return { ok: false, errors: ['参数模块未加载'] };
      var nextParams = paramsState;
      if (data.paramsState && typeof data.paramsState === 'object') {
        nextParams = p.normalizeState(data.paramsState);
        var paramErrors = p.validateState(nextParams);
        if (paramErrors.length) errors.push.apply(errors, paramErrors);
      } else {
        errors.push('缺少 paramsState');
      }
      var nextOwned = null;
      if (Array.isArray(data.ownedIds)) {
        var own = ownershipApi();
        if (own) {
          var valid = Object.create(null);
          own.allIds().forEach(function (id) { valid[id] = true; });
          nextOwned = data.ownedIds.filter(function (id) { return valid[String(id)]; });
          if (nextOwned.length !== data.ownedIds.length) errors.push('部分 ownedIds 无效，已忽略');
        } else {
          nextOwned = data.ownedIds.slice();
        }
      }
      var nextNotes = null;
      if (data.characterNotes && typeof data.characterNotes === 'object' && !Array.isArray(data.characterNotes)) {
        nextNotes = sanitizeNotes(data.characterNotes);
      }
      var nextTeams = null;
      if (data.teams && typeof data.teams === 'object' && !Array.isArray(data.teams)) {
        nextTeams = sanitizeTeams(data.teams);
      }
      var nextBuilds = null;
      if (data.characterBuilds && typeof data.characterBuilds === 'object' && !Array.isArray(data.characterBuilds)) {
        nextBuilds = sanitizeBuilds(data.characterBuilds);
      }
      var nextEquipmentNotes = null;
      if (data.equipmentNotes && typeof data.equipmentNotes === 'object' && !Array.isArray(data.equipmentNotes)) {
        nextEquipmentNotes = sanitizeEquipmentNotes(data.equipmentNotes);
      }
      var nextEquipmentLinks = null;
      if (data.equipmentLinks && typeof data.equipmentLinks === 'object' && !Array.isArray(data.equipmentLinks)) {
        nextEquipmentLinks = sanitizeEquipmentLinks(data.equipmentLinks);
      }
      var nextEquipmentBuilds = null;
      if (data.equipmentBuilds && typeof data.equipmentBuilds === 'object' && !Array.isArray(data.equipmentBuilds)) {
        nextEquipmentBuilds = sanitizeEquipmentBuilds(data.equipmentBuilds);
      }
      var nextNoteBuilds = null;
      if (data.noteBuilds && typeof data.noteBuilds === 'object' && !Array.isArray(data.noteBuilds)) {
        nextNoteBuilds = sanitizeNoteBuilds(data.noteBuilds);
      }
      var nextHarmonyManual = null;
      if (data.harmonyManual && typeof data.harmonyManual === 'object' && !Array.isArray(data.harmonyManual)) {
        nextHarmonyManual = sanitizeHarmonyManual(data.harmonyManual);
      }
      if (errors.length) return { ok: false, errors: errors };
      paramsState = nextParams;
      saveParamsOnly();
      if (nextOwned) {
        var ownApi = ownershipApi();
        if (ownApi) {
          ownApi.save(nextOwned);
          ownedIds = ownApi.load() || [];
        } else {
          ownedIds = nextOwned;
        }
      }
      if (nextNotes) {
        characterNotes = nextNotes;
        writeJson(NOTES_KEY, characterNotes);
      }
      if (nextTeams) {
        teams = nextTeams;
        writeJson(TEAMS_KEY, teams);
      }
      if (nextBuilds) {
        characterBuilds = nextBuilds;
        writeJson(BUILDS_KEY, characterBuilds);
      }
      if (nextEquipmentNotes) {
        equipmentNotes = nextEquipmentNotes;
        writeJson(EQUIP_NOTES_KEY, equipmentNotes);
      }
      if (nextEquipmentLinks) {
        equipmentLinks = nextEquipmentLinks;
        writeJson(EQUIP_LINKS_KEY, equipmentLinks);
      }
      if (nextEquipmentBuilds) {
        equipmentBuilds = nextEquipmentBuilds;
        writeJson(EQUIP_BUILDS_KEY, equipmentBuilds);
      }
      if (nextNoteBuilds) {
        noteBuilds = nextNoteBuilds;
        writeJson(NOTE_BUILDS_KEY, noteBuilds);
      }
      if (nextHarmonyManual) {
        harmonyManual = nextHarmonyManual;
        writeJson(HARMONY_MANUAL_KEY, harmonyManual);
      }
      configVersion = CONFIG_SCHEMA_VERSION;
      persistConfig();
      notify('import');
      return { ok: true, errors: [] };
    }

    function resetAll() {
      var p = paramsApi();
      var own = ownershipApi();
      removeKey(CONFIG_KEY);
      removeKey(NOTES_KEY);
      removeKey(TEAMS_KEY);
      removeKey(BUILDS_KEY);
      removeKey(EQUIP_NOTES_KEY);
      removeKey(EQUIP_LINKS_KEY);
      removeKey(EQUIP_BUILDS_KEY);
      removeKey(NOTE_BUILDS_KEY);
      removeKey(HARMONY_MANUAL_KEY);
      if (p) removeKey(p.STORAGE_KEY);
      if (own) own.reset();
      paramsState = p ? p.createState() : paramsState;
      ownedIds = own ? own.allIds() : [];
      characterNotes = {};
      teams = { plans: {}, fitOverrides: {}, exceptions: {}, notesByKey: {} };
      characterBuilds = {};
      equipmentNotes = {};
      equipmentLinks = {};
      equipmentBuilds = {};
      noteBuilds = {};
      harmonyManual = {};
      notify('reset');
      return api;
    }

    function subscribe(fn) {
      if (typeof fn !== 'function') return function () {};
      listeners.push(fn);
      return function () {
        listeners = listeners.filter(function (x) { return x !== fn; });
      };
    }

    function getMeta() {
      return {
        schemaVersion: CONFIG_SCHEMA_VERSION,
        configVersion: configVersion,
        dataVersion: dataVersion(),
        storageKeys: {
          config: CONFIG_KEY,
          params: paramsApi() ? paramsApi().STORAGE_KEY : '',
          owned: ownershipApi() ? ownershipApi().STORAGE_KEY : '',
          notes: NOTES_KEY,
          teams: TEAMS_KEY,
          builds: BUILDS_KEY,
          equipmentNotes: EQUIP_NOTES_KEY,
          equipmentLinks: EQUIP_LINKS_KEY
        },
        notesCount: Object.keys(characterNotes).length,
        teamCount: Object.keys(teams.plans).length,
        buildCount: Object.keys(characterBuilds).length,
        equipmentNotesCount: Object.keys(equipmentNotes).length,
        equipmentLinksCount: Object.keys(equipmentLinks).length,
        equipmentBuildsCount: Object.keys(equipmentBuilds).length,
        noteBuildsCount: Object.keys(noteBuilds).length,
        harmonyManualCount: Object.keys(harmonyManual).length
      };
    }

    var api = {
      CONFIG_SCHEMA_VERSION: CONFIG_SCHEMA_VERSION,
      CONFIG_KEY: CONFIG_KEY,
      NOTES_KEY: NOTES_KEY,
      TEAMS_KEY: TEAMS_KEY,
      BUILDS_KEY: BUILDS_KEY,
      EQUIP_NOTES_KEY: EQUIP_NOTES_KEY,
      EQUIP_LINKS_KEY: EQUIP_LINKS_KEY,
      EQUIP_BUILDS_KEY: EQUIP_BUILDS_KEY,
      NOTE_BUILDS_KEY: NOTE_BUILDS_KEY,
      HARMONY_MANUAL_KEY: HARMONY_MANUAL_KEY,
      SKILL_SOURCES: SKILL_SOURCES.slice(),
      NOTE_TAGS: NOTE_TAGS.slice(),
      FIT_VALUES: FIT_VALUES.slice(),
      init: init,
      getParamsState: getParamsState,
      setParamsState: setParamsState,
      saveParams: saveParams,
      getOwned: getOwned,
      setOwned: setOwned,
      resetOwned: resetOwned,
      getCharacterNotes: getCharacterNotes,
      getCharacterNote: getCharacterNote,
      hasCharacterNote: hasCharacterNote,
      setCharacterNote: setCharacterNote,
      deleteCharacterNote: deleteCharacterNote,
      clearCharacterNotes: clearCharacterNotes,
      exportNotes: exportNotes,
      importNotes: importNotes,
      getTeams: getTeams,
      teamKey: teamKey,
      saveTeamPlan: saveTeamPlan,
      getTeamPlan: getTeamPlan,
      listTeamPlans: listTeamPlans,
      deleteTeamPlan: deleteTeamPlan,
      getTeamNote: getTeamNote,
      setTeamNote: setTeamNote,
      getFitOverride: getFitOverride,
      setFitOverride: setFitOverride,
      getException: getException,
      setException: setException,
      clearTeams: clearTeams,
      getCharacterBuilds: getCharacterBuilds,
      getCharacterBuild: getCharacterBuild,
      saveCharacterBuild: saveCharacterBuild,
      deleteCharacterBuild: deleteCharacterBuild,
      clearCharacterBuilds: clearCharacterBuilds,
      getEquipmentNotes: getEquipmentNotes,
      getEquipmentNote: getEquipmentNote,
      setEquipmentNote: setEquipmentNote,
      deleteEquipmentNote: deleteEquipmentNote,
      clearEquipmentNotes: clearEquipmentNotes,
      getEquipmentLinks: getEquipmentLinks,
      getEquipmentLink: getEquipmentLink,
      setEquipmentLink: setEquipmentLink,
      clearEquipmentLinks: clearEquipmentLinks,
      getEquipmentBuild: getEquipmentBuild,
      listEquipmentBuilds: listEquipmentBuilds,
      saveEquipmentBuild: saveEquipmentBuild,
      deleteEquipmentBuild: deleteEquipmentBuild,
      clearEquipmentBuilds: clearEquipmentBuilds,
      getNoteBuild: getNoteBuild,
      listNoteBuilds: listNoteBuilds,
      saveNoteBuild: saveNoteBuild,
      deleteNoteBuild: deleteNoteBuild,
      clearNoteBuilds: clearNoteBuilds,
      getHarmonyManual: getHarmonyManual,
      harmonyKey: harmonyKey,
      getHarmonyScore: getHarmonyScore,
      setHarmonyScore: setHarmonyScore,
      importHarmonyManual: importHarmonyManual,
      clearHarmonyManual: clearHarmonyManual,
      exportConfig: exportConfig,
      importConfig: importConfig,
      resetAll: resetAll,
      subscribe: subscribe,
      getMeta: getMeta,
      getDataVersion: dataVersion,
      persistConfig: persistConfig
    };
    return api;
  }

  return {
    CONFIG_SCHEMA_VERSION: CONFIG_SCHEMA_VERSION,
    CONFIG_KEY: CONFIG_KEY,
    NOTES_KEY: NOTES_KEY,
    TEAMS_KEY: TEAMS_KEY,
    BUILDS_KEY: BUILDS_KEY,
    EQUIP_NOTES_KEY: EQUIP_NOTES_KEY,
    EQUIP_LINKS_KEY: EQUIP_LINKS_KEY,
    EQUIP_BUILDS_KEY: EQUIP_BUILDS_KEY,
    NOTE_BUILDS_KEY: NOTE_BUILDS_KEY,
    HARMONY_MANUAL_KEY: HARMONY_MANUAL_KEY,
    SKILL_SOURCES: SKILL_SOURCES,
    NOTE_TAGS: NOTE_TAGS,
    FIT_VALUES: FIT_VALUES,
    sanitizeNote: sanitizeNote,
    sanitizeNotes: sanitizeNotes,
    sanitizeTeams: sanitizeTeams,
    sanitizeBuilds: sanitizeBuilds,
    sanitizeEquipmentNotes: sanitizeEquipmentNotes,
    sanitizeEquipmentLinks: sanitizeEquipmentLinks,
    sanitizeEquipmentBuilds: sanitizeEquipmentBuilds,
    sanitizeNoteBuilds: sanitizeNoteBuilds,
    sanitizeHarmonyManual: sanitizeHarmonyManual,
    createStore: createStore
  };
});

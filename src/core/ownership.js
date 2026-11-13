/*!
 * core/ownership.js —— 全局「我的角色」（T5.3 第一步）
 *
 * 寒溟要求：页面第一步必须先选「你有哪些角色」，之后所有最优算法
 * （笔记契合 / 配装推荐 / 养成推荐 / 阵容评估 / 比赛模拟）只在已拥有角色范围内计算。
 *
 * 持久化：localStorage['bbt.ownedCharacters'] = content_id 数组。
 *   - 键不存在 → 返回 null（表示「还没选过」→ 触发首屏引导，默认全选）
 *   - 键存在（含空数组）→ 以保存值为准
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.ownership = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var STORAGE_KEY = 'bbt.ownedCharacters';

  function getRoot() {
    return typeof globalThis !== 'undefined' ? globalThis : this;
  }

  function normalizeName(name) {
    return String(name == null ? '' : name)
      .replace(/[\s·]/g, '')
      .trim();
  }

  function characters() {
    var r = getRoot();
    var data = r.BBCharacterData || (r.BBT && r.BBT.characterData) || null;
    return data && Array.isArray(data.characters) ? data.characters : [];
  }

  /** 全部可选角色（contentId 为键；没有 contentId 的降级用 id 字符串）。 */
  function allCharacters() {
    return characters().map(function (c) {
      return {
        contentId: c.contentId != null ? Number(c.contentId) : null,
        id: c.contentId != null ? String(c.contentId) : String(c.id || c.name || ''),
        name: c.name,
        rarity: c.rarity || null,
        position: c.position || c.role || null
      };
    });
  }

  function allIds() {
    return allCharacters()
      .map(function (c) { return c.id; })
      .filter(Boolean);
  }

  function nameIndex() {
    var map = Object.create(null);
    allCharacters().forEach(function (c) {
      map[normalizeName(c.name)] = c;
    });
    return map;
  }

  function idIndex() {
    var map = Object.create(null);
    allCharacters().forEach(function (c) {
      map[c.id] = c;
    });
    return map;
  }

  function isValidId(id, validSet) {
    return validSet[String(id)] === true;
  }

  function load() {
    var r = getRoot();
    var raw = null;
    try {
      raw = r.localStorage ? r.localStorage.getItem(STORAGE_KEY) : null;
    } catch (err) {
      raw = null;
    }
    if (raw == null) return null; // 还没选过 → 首屏引导
    try {
      var arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return null;
      var valid = Object.create(null);
      allIds().forEach(function (id) { valid[id] = true; });
      var out = [];
      var seen = Object.create(null);
      arr.forEach(function (id) {
        var key = String(id);
        if (valid[key] && !seen[key]) {
          seen[key] = true;
          out.push(key);
        }
      });
      return out; // 空数组 = 寒溟确认「一个都没有」，合法
    } catch (err) {
      return null;
    }
  }

  function save(ids) {
    var r = getRoot();
    var valid = Object.create(null);
    allIds().forEach(function (id) { valid[id] = true; });
    var out = [];
    var seen = Object.create(null);
    (ids || []).forEach(function (id) {
      var key = String(id);
      if (valid[key] && !seen[key]) {
        seen[key] = true;
        out.push(key);
      }
    });
    try {
      if (r.localStorage) r.localStorage.setItem(STORAGE_KEY, JSON.stringify(out));
      return true;
    } catch (err) {
      return false;
    }
  }

  function reset() {
    var r = getRoot();
    try {
      if (r.localStorage) r.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      /* ignore */
    }
  }

  function toSet(ids) {
    var set = Object.create(null);
    (ids || []).forEach(function (id) {
      set[String(id)] = true;
    });
    return set;
  }

  function isOwned(contentId, set) {
    return set[String(contentId)] === true;
  }

  /** 名称 → contentId 字符串；大写/空格容错。 */
  function nameToId(name) {
    var hit = nameIndex()[normalizeName(name)];
    return hit ? hit.id : null;
  }

  function idToCharacter(id) {
    return idIndex()[String(id)] || null;
  }

  function isOwnedByName(name, set) {
    var id = nameToId(name);
    return id != null && set[id] === true;
  }

  /** 已拥有角色列表（用于下拉框/网格）。 */
  function ownedCharacters(ids) {
    var set = toSet(ids);
    return allCharacters().filter(function (c) {
      return set[c.id] === true;
    });
  }

  /** 按名称列表过滤（笔记矩阵用；未拥有或名称无法映射则剔除）。 */
  function filterNamesByOwned(names, ids) {
    var set = toSet(ids);
    return (names || []).filter(function (name) {
      return isOwnedByName(name, set);
    });
  }

  return {
    STORAGE_KEY: STORAGE_KEY,
    characters: allCharacters,
    allIds: allIds,
    load: load,
    save: save,
    reset: reset,
    toSet: toSet,
    isOwned: isOwned,
    isOwnedByName: isOwnedByName,
    nameToId: nameToId,
    idToCharacter: idToCharacter,
    ownedCharacters: ownedCharacters,
    filterNamesByOwned: filterNamesByOwned,
    normalizeName: normalizeName
  };
});

/*!
 * app.js —— 应用入口：我的角色 / Tab 路由 / 状态持久化 / 主题 / 错误边界
 *
 * 加载顺序（index.html）：
 *   core → ui → data → views → app.js（全部是普通 <script>，file:// 双击可用）
 *
 * 「我的角色」是全局第一步：所有最优算法（笔记契合 / 配装推荐 / 养成 / 模拟）只在已拥有范围内计算。
 */
(function (root) {
  'use strict';
  var BBT = (root.BBT = root.BBT || {});
  var dom = BBT.dom;
  var params = BBT.params;
  var ownership = BBT.ownership;

  var APP_VERSION = 'T11 · 1.5.0（5 页：新增实战）';
  var gameData = BBT.gameData || null;
  var DEFAULT_TAB = 'overview';
  // 最终可见 5 页：角色 / 养成配队 / 实战 / 实战配队 / 笔记养成。
  // 其余分析视图文件保留，可通过 hash 直接访问（不进 tabbar）。
  var tabOrder = [
    'overview',
    'teams',
    'battle',
    'lineup',
    'notes'
  ];

  var SAVE_DELAY = 160;

  var state = null;
  var currentTab = null;
  var saveTimer = null;
  var data = null;
  var store = null;

  var ownedIds = null; // contentId 字符串数组
  var ownedSet = null;
  var ownedSaved = false;

  function persistNow() {
    if (saveTimer) {
      root.clearTimeout(saveTimer);
      saveTimer = null;
    }
    try {
      if (store) store.saveParams(state);
      else if (root.localStorage) {
        root.localStorage.setItem(params.STORAGE_KEY, JSON.stringify(state));
      }
    } catch (err) {
      /* file:// 或隐私模式下可能不可用，静默降级 */
    }
  }

  function save() {
    if (saveTimer) root.clearTimeout(saveTimer);
    saveTimer = root.setTimeout(function () {
      saveTimer = null;
      persistNow();
    }, SAVE_DELAY);
  }

  function applyModel() {
    var model = null;
    try {
      model = root.BBTModel || (root.BBT && root.BBT.model) || null;
    } catch (err) {
      model = null;
    }
    if (!model) return null;
    try {
      if (params.applyModelOverrides && Array.isArray(model.paramOverrides)) {
        params.applyModelOverrides(model.paramOverrides);
      }
      if (model.moodOptions && BBT.attributeLayers && BBT.attributeLayers.MOOD_OPTIONS) {
        BBT.attributeLayers.MOOD_OPTIONS = model.moodOptions;
      }
    } catch (err) {
      if (root.console && root.console.warn) root.console.warn('[BBT] 模型参数应用失败', err);
    }
    return model;
  }

  function resolveData() {
    if (root.BBCharacterData && Array.isArray(root.BBCharacterData.characters)) {
      return root.BBCharacterData;
    }
    if (BBT.characterData && Array.isArray(BBT.characterData.characters)) {
      return BBT.characterData;
    }
    return null;
  }

  /* ============================ 我的角色 ============================ */

  function loadOwnership() {
    var saved = ownership ? ownership.load() : null;
    ownedSaved = saved != null;
    ownedIds = ownership ? saved != null ? saved : ownership.allIds() : [];
    ownedSet = ownership ? ownership.toSet(ownedIds) : Object.create(null);
  }

  function ownedCount() {
    return ownedIds ? ownedIds.length : 0;
  }

  function totalCount() {
    return ownership ? ownership.allIds().length : 0;
  }

  function isOwned(contentId) {
    if (!ownedSet) return true;
    return ownedSet[String(contentId)] === true;
  }

  function isOwnedByName(name) {
    if (!ownership || !ownedSet) return true;
    var id = ownership.nameToId(name);
    if (id == null) return false;
    return ownedSet[id] === true;
  }

  function ownedCharacters() {
    return ownership ? ownership.ownedCharacters(ownedIds) : [];
  }

  function updateOwnedChip() {
    var chip = dom.qs('#owned-chip');
    if (!chip) return;
    chip.innerHTML =
      '👥 我的角色 <strong class="num">' + ownedCount() + '</strong><span class="muted">/ ' +
      totalCount() + '</span>';
    chip.setAttribute('title', '点击修改你拥有的角色（影响所有推荐/模拟结果）');
  }

  function applyOwnedSelection(ids, mandatory) {
    if (!ownership) return;
    ownedSaved = true;
    if (store) {
      ownedIds = store.setOwned(ids);
    } else {
      ownership.save(ids);
      ownedIds = ownership.load() || [];
    }
    ownedSet = ownership.toSet(ownedIds);
    updateOwnedChip();
    if (typeof mandatory === 'function') mandatory();
    if (currentTab) render(currentTab);
  }

  /**
   * 打开「我的角色」选择面板。
   * @param {boolean} mandatory 首次引导（必须确认才能关闭）
   */
  function openOwnershipGate(mandatory) {
    if (!ownership) return;
    dom.closeAllModals();
    var all = ownership.characters();
    var chosen = Object.create(null);
    (mandatory ? ownership.allIds() : ownedIds).forEach(function (id) {
      chosen[id] = true;
    });
    var filter = '';
    var renderEventsBound = false;

    var overlay = root.document.createElement('div');
    overlay.className = 'owned-gate';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', '选择你拥有的角色');

    function render() {
      var list = all.filter(function (c) {
        return !filter || c.name.indexOf(filter) >= 0;
      });
      var selectedCount = Object.keys(chosen).filter(function (k) { return chosen[k]; }).length;
      overlay.innerHTML =
        '<div class="owned-gate-backdrop"></div>' +
        '<div class="owned-gate-panel">' +
        '<div class="owned-gate-head">' +
        '<div><div class="owned-gate-kicker">' + (mandatory ? '第 1 步 · 必填' : '我的角色') + '</div>' +
        '<h2 class="owned-gate-title">选择你拥有的角色</h2>' +
        '<p class="owned-gate-sub">所有最优算法（笔记契合 / 配装推荐 / 养成推荐 / 阵容评估 / 比赛模拟）只会在你拥有的角色范围内计算。默认已全选，只需取消你没有的角色。</p></div>' +
        '<div class="owned-gate-count"><strong class="num">' + selectedCount + '</strong> / ' + all.length + '</div>' +
        '</div>' +
        '<div class="owned-gate-toolbar">' +
        '<div class="search-wrap" style="max-width:260px;height:38px">' + dom.icon('search') +
        '<input class="search-input" id="owned-search" type="search" placeholder="搜索角色名…" value="' + dom.esc(filter) + '"></div>' +
        '<div class="row" style="gap:6px">' +
        '<button class="btn btn--sm" data-owned-act="all">全选</button>' +
        '<button class="btn btn--sm" data-owned-act="none">清空</button>' +
        '<button class="btn btn--sm" data-owned-act="invert">反选</button>' +
        '<button class="btn btn--sm btn--ghost" data-owned-act="reset">重置</button>' +
        '</div></div>' +
        '<div class="owned-gate-grid" id="owned-grid">' +
        list.map(function (c) {
          var on = chosen[c.id] === true;
          return '<button class="owned-card' + (on ? ' is-owned' : '') + '" data-owned-id="' + dom.esc(c.id) + '" aria-pressed="' + on + '">' +
            '<span class="owned-card-portrait">' +
            (c.contentId ? '<img src="assets/portraits/' + dom.esc(c.contentId) + '.png" alt="' + dom.esc(c.name) + '" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
            '<span class="owned-card-initial">' + dom.esc(c.name.replace(/[·\s]/g, '').slice(0, 1)) + '</span>' +
            '<span class="owned-card-check">' + (on ? '✓' : '') + '</span>' +
            '</span>' +
            '<span class="owned-card-name">' + dom.esc(c.name) + '</span>' +
            '<span class="owned-card-meta">' + dom.esc((c.rarity || '—') + ' · ' + (c.position || '—')) + '</span>' +
            '</button>';
        }).join('') +
        '</div>' +
        '<div class="owned-gate-foot">' +
        '<span class="small muted">首次使用默认全选；确认后保存到浏览器本地（localStorage），随时可在顶栏修改。</span>' +
        '<div class="row" style="gap:8px">' +
        (mandatory ? '' : '<button class="btn btn--ghost" data-owned-close="1">取消</button>') +
        '<button class="btn btn--primary" data-owned-confirm="1">' + (mandatory ? '确认，进入工具' : '保存修改') + '</button>' +
        '</div></div>' +
        '</div>';

      var search = overlay.querySelector('#owned-search');
      search.addEventListener('input', function () {
        filter = search.value.trim();
        render();
      });
      if (!renderEventsBound) {
        renderEventsBound = true;
        dom.delegate(overlay, '[data-owned-id]', 'click', function (event, target) {
          var id = target.getAttribute('data-owned-id');
          if (chosen[id]) delete chosen[id];
          else chosen[id] = true;
          render();
        });
        dom.delegate(overlay, '[data-owned-act]', 'click', function (event, target) {
          var act = target.getAttribute('data-owned-act');
          if (act === 'all') all.forEach(function (c) { chosen[c.id] = true; });
          if (act === 'none') Object.keys(chosen).forEach(function (k) { delete chosen[k]; });
          if (act === 'invert') all.forEach(function (c) { if (chosen[c.id]) delete chosen[c.id]; else chosen[c.id] = true; });
          if (act === 'reset') {
            chosen = Object.create(null);
            ownership.allIds().forEach(function (id) { chosen[id] = true; });
          }
          render();
        });
        dom.delegate(overlay, '[data-owned-confirm]', 'click', function () {
          var ids = Object.keys(chosen).filter(function (k) { return chosen[k]; });
          close();
          applyOwnedSelection(ids);
          dom.toast('已保存：拥有 ' + ids.length + ' 名角色', 'ok');
        });
        dom.delegate(overlay, '[data-owned-close]', 'click', function () {
          close();
        });
      }
    }

    function close() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      root.document.body.style.overflow = '';
    }

    var oldClose = dom.qsa('.owned-gate');
    oldClose.forEach(function (n) {
      if (n.parentNode) n.parentNode.removeChild(n);
    });
    render();
    root.document.body.appendChild(overlay);
    root.document.body.style.overflow = 'hidden';
    return { close: close };
  }

  /* ============================ 路由 / 渲染 ============================ */

  function tabInfo(id) {
    return BBT.views[id] || null;
  }

  function normalizeHash(hash) {
    var raw = String(hash || '').replace(/^#\/?/, '');
    // 支持 #/overview?char=<contentId>：路由只取 tab 名，query 由视图自行读取
    return (raw.split('?')[0] || DEFAULT_TAB);
  }

  function validTab(id) {
    return !!BBT.views[id];
  }

  function navigate(tabId) {
    if (!validTab(tabId)) tabId = DEFAULT_TAB;
    var target = '#/' + tabId;
    if (root.location && root.location.hash !== target) {
      root.location.hash = target;
    } else if (currentTab !== tabId) {
      render(tabId);
    }
  }

  function onHashChange() {
    var id = normalizeHash(root.location && root.location.hash);
    if (!validTab(id)) id = DEFAULT_TAB;
    if (id !== currentTab) render(id);
  }

  function setTheme(theme) {
    var t = theme === 'dark' ? 'dark' : 'light';
    state.ui.theme = t;
    if (root.document && root.document.documentElement) {
      root.document.documentElement.setAttribute('data-theme', t);
    }
    var btn = dom.qs('#theme-toggle');
    if (btn) {
      btn.innerHTML =
        dom.icon(t === 'dark' ? 'sun' : 'moon') +
        '<span>' + (t === 'dark' ? '浅色' : '深色') + '</span>';
      btn.setAttribute('aria-label', t === 'dark' ? '切换到浅色主题' : '切换到深色主题');
      btn.setAttribute('title', t === 'dark' ? '切换到浅色主题' : '切换到深色主题');
    }
    save();
  }

  function updateDataPill() {
    var pill = dom.qs('#data-pill');
    if (!pill) return;
    if (data && data.mode === 'structured') {
      pill.setAttribute('data-mode', 'structured');
      pill.innerHTML = '<span class="dot"></span><span>图鉴 · ' + (data.count || 0) + ' 名</span>';
      pill.title = '角色数据已从 T1 结构化数据生成（' + (data.generatedAt || '') + '）';
    } else if (data) {
      pill.setAttribute('data-mode', 'sample');
      pill.innerHTML = '<span class="dot"></span><span>示例数据</span>';
      pill.title = '角色数据为内置示例，运行 node tool/scripts/build-data.mjs 导入 T1 数据';
    } else {
      pill.setAttribute('data-mode', 'sample');
      pill.innerHTML = '<span class="dot"></span><span>无图鉴数据</span>';
      pill.title = '未找到 tool/src/data/characters.js';
    }
  }

  var ctx = null;

  function buildContext() {
    ctx = {
      state: state,
      data: data,
      save: save,
      toast: dom.toast,
      navigate: navigate,
      theme: function () {
        return state.ui.theme;
      },
      setTheme: setTheme,
      // 共享 store / 数据层：后续页签改造统一从这里读写
      store: store,
      gameData: gameData,
      // 我的角色（所有优化模块统一从这里取）
      ownedIds: ownedIds,
      ownedSet: ownedSet,
      isOwned: isOwned,
      isOwnedByName: isOwnedByName,
      ownedCharacters: ownedCharacters,
      ownedCount: ownedCount,
      totalCount: totalCount,
      openOwnershipGate: function () {
        openOwnershipGate(false);
      }
    };
    return ctx;
  }

  function renderTabbar() {
    var bar = dom.qs('#tabbar');
    if (!bar) return;
    var html = tabOrder
      .filter(function (id) { return !!BBT.views[id]; })
      .map(function (id) {
        var v = BBT.views[id];
        return (
          '<button class="tab-btn" type="button" role="tab" data-tab="' + id + '" ' +
          'aria-selected="false" aria-controls="view-root">' +
          '<span class="tab-ico" aria-hidden="true">' + (v.icon || '•') + '</span>' +
          '<span>' + dom.esc(v.nav || v.title || id) + '</span>' +
          '</button>'
        );
      })
      .join('');
    bar.innerHTML = html;
    bar.addEventListener('click', function (event) {
      var btn = event.target.closest ? event.target.closest('[data-tab]') : null;
      if (!btn) return;
      navigate(btn.getAttribute('data-tab'));
    });
  }

  function markActiveTab(id) {
    dom.qsa('#tabbar [data-tab]').forEach(function (btn) {
      var active = btn.getAttribute('data-tab') === id;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function renderError(host, id, err) {
    host.innerHTML =
      '<div class="view-head"><div class="view-eyebrow">模块异常</div>' +
      '<h2 class="view-title">这个页面加载失败了</h2>' +
      '<p class="view-sub">错误信息已捕获，不影响其它 Tab 使用。请把下面的信息反馈给开发者。</p></div>' +
      '<div class="notice notice--warn"><span class="notice-ico">⚠️</span><span>' +
      '模块 <strong>' + dom.esc(id) + '</strong> 渲染失败：' +
      dom.esc(err && err.message ? err.message : String(err)) + '</span></div>';
  }

  function render(id) {
    var view = tabInfo(id);
    if (!view) {
      id = DEFAULT_TAB;
      view = tabInfo(id);
    }
    currentTab = id;
    markActiveTab(id);
    var host = dom.qs('#view-root');
    if (!host) return;
    if (!ctx) buildContext();

    var head =
      '<div class="view-head">' +
      '<div class="view-eyebrow">' + '可用模块' + '</div>' +
      '<h2 class="view-title">' + dom.esc(view.title || view.nav || id) + '</h2>' +
      '<p class="view-sub">' + dom.esc(view.subtitle || '') + '</p>' +
      '</div>';

    var bodyWrap = root.document.createElement('div');
    bodyWrap.className = 'view-body';
    try {
      view.mount(bodyWrap, ctx);
    } catch (err) {
      if (root.console && root.console.warn) root.console.warn('[BBT] 视图渲染失败：' + id, err);
      host.innerHTML = '';
      var fail = root.document.createElement('div');
      fail.className = 'view';
      renderError(fail, id, err);
      host.appendChild(fail);
      return;
    }
    var wrapper = root.document.createElement('div');
    wrapper.className = 'view';
    wrapper.innerHTML = head;
    wrapper.appendChild(bodyWrap);
    if (view.dataNote) {
      var foot = root.document.createElement('div');
      foot.className = 'view-foot';
      foot.innerHTML = '<span class="view-foot-ico">📚</span>' + view.dataNote;
      wrapper.appendChild(foot);
    }
    host.innerHTML = '';
    host.appendChild(wrapper);
    try {
      root.scrollTo({ top: 0, behavior: 'auto' });
    } catch (err) {
      /* ignore */
    }
  }

  function bindHeader() {
    var themeBtn = dom.qs('#theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        setTheme(state.ui.theme === 'dark' ? 'light' : 'dark');
      });
    }
    var ownedChip = dom.qs('#owned-chip');
    if (ownedChip) {
      ownedChip.addEventListener('click', function () {
        openOwnershipGate(false);
      });
    }
    var versionEl = dom.qs('#app-version');
    if (versionEl) versionEl.textContent = APP_VERSION;
    var dataVersionEl = dom.qs('#data-version');
    if (dataVersionEl && gameData) {
      var meta = gameData.meta();
      dataVersionEl.textContent = '数据 ' + meta.dataVersion;
      dataVersionEl.title =
        '数据更新 ' + meta.updatedAt + ' · ' + meta.sources.length + ' 个来源 · schema v' + meta.schemaVersion;
    }
  }

  function initialState() {
    var raw = null;
    try {
      raw = root.localStorage ? root.localStorage.getItem(params.STORAGE_KEY) : null;
    } catch (err) {
      raw = null;
    }
    if (!raw) return params.createState();
    try {
      return params.normalizeState(JSON.parse(raw));
    } catch (err) {
      return params.createState();
    }
  }

  function start() {
    applyModel();
    store = BBT.store ? BBT.store.createStore() : null;
    if (store) {
      store.init();
      state = store.getParamsState();
    } else {
      state = initialState();
    }
    data = resolveData();
    loadOwnership();
    if (ownedSaved) ownedSet = ownership ? ownership.toSet(ownedIds) : ownedSet;
    buildContext();
    if (store) {
      store.subscribe(function (type) {
        if (type !== 'import') return;
        state = store.getParamsState();
        ownedIds = store.getOwned();
        ownedSet = ownership ? ownership.toSet(ownedIds) : ownedSet;
        buildContext();
        updateOwnedChip();
        if (currentTab) render(currentTab);
      });
    }
    if (root.document && root.document.documentElement) {
      root.document.documentElement.setAttribute('data-theme', state.ui.theme);
    }
    renderTabbar();
    bindHeader();
    updateOwnedChip();
    setTheme(state.ui.theme);
    updateDataPill();
    root.addEventListener('hashchange', onHashChange);
    root.addEventListener('beforeunload', persistNow);
    var initial = normalizeHash(root.location && root.location.hash);
    if (!validTab(initial)) initial = DEFAULT_TAB;
    render(initial);
    if (!ownedSaved) openOwnershipGate(true);
    BBT.app.ready = true;
  }

  BBT.app = {
    version: APP_VERSION,
    tabOrder: tabOrder,
    navigate: navigate,
    getState: function () {
      return state;
    },
    getData: function () {
      return data;
    },
    getOwnedIds: function () {
      return ownedIds;
    },
    getStore: function () {
      return store;
    },
    getGameData: function () {
      return gameData;
    },
    exportConfig: function () {
      return store ? store.exportConfig() : null;
    },
    importConfig: function (payload) {
      return store ? store.importConfig(payload) : { ok: false, errors: ['store 未初始化'] };
    },
    openOwnershipGate: function () {
      return openOwnershipGate(false);
    },
    resetOwnership: function () {
      ownership.reset();
      ownedSaved = false;
      ownedIds = ownership.allIds();
      ownedSet = ownership.toSet(ownedIds);
      updateOwnedChip();
      if (currentTab) render(currentTab);
    },
    ready: false,
    start: start
  };

  if (root.document) {
    if (root.document.readyState === 'loading') {
      root.document.addEventListener('DOMContentLoaded', start);
    } else if (dom.qs('#tabbar')) {
      start();
    }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

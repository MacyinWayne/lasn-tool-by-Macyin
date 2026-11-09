/*!
 * views/equipment.js —— 器材说明（tab id: equipment，排在 teams 之后，需求 #3）
 *
 * 顶部：搜索 + 品质/属性/场景流派标签筛选 + 排序
 * 左侧：82 条器材列表（名称 / 属性 / 品质推断徽章 / 攻略覆盖标记 / 笔记角标）
 * 右侧详情：
 *   1) 基础信息（名称/基础名/属性/品质推断/描述/来源偏移）
 *   2) 效果 / 词条区：数值与专属技能归属未解 → 占位 + 候选效果文案池（646）/ 器材词条（61）
 *      可手动关联并保存（store: bbt.equipmentLinks.v1）
 *   3) 攻略评价（社区攻略 guide_ratings；未匹配显示「攻略未覆盖/无名称评价」）
 *   4) 适用场景/流派标签（来自社区攻略）
 *   5) 我的笔记（每件器材独立；store: bbt.equipmentNotes.v1）
 * 数据缺口显式标注，不虚构数值。
 */
(function (root) {
  'use strict';
  var BBT = (root.BBT = root.BBT || {});
  var views = (BBT.views = BBT.views || {});
  var dom = BBT.dom;

  var QUALITY_ORDER = { SSR: 0, UP: 1, SR: 2, R: 3, '队徽': 4 };
  var QUALITY_FILTERS = ['全部', 'SSR', 'UP', 'SR', 'R', '队徽'];
  var ATTR_FILTERS = ['全部', '投射', '弹跳', '防守', '体能', '运控', '意识', '未标注'];
  var POOL_LIMIT = 40;
  var AFFIX_LIMIT = 40;

  var EQUIP_ATTR_FOR_DIR = {
    three: '投射',
    drive: '弹跳',
    defense: '防守',
    playmaking: '运控',
    rebound: '体能'
  };
  var DIR_LABELS = {
    three: '三分（含中投）',
    drive: '攻框（含突破）',
    defense: '防守（抢断/盖帽）',
    playmaking: '组织（战术/续航）',
    rebound: '篮板（特化）'
  };
  var THREE_PATCH_SKILLS = ['三分', '横撤', '后撤', '快速三分', '大力三分', '看破'];
  var ROLE_SKILL_POOL = {
    得分手: ['三分', '中投', '强突', '后撤'],
    防守者: ['抢断', '盖帽', '横撤', '看破'],
    组织者: ['传球', '挡拆', '战术', '回复'],
    篮板手: ['篮板', '卡位', '补篮', '扣篮']
  };

  function positionBase(role) {
    var text = String(role || '');
    if (/控卫|控球/.test(text)) return '控卫';
    if (/分卫|得分/.test(text)) return '分卫';
    if (/小前/.test(text)) return '小前';
    if (/大前/.test(text)) return '大前';
    if (/中锋/.test(text)) return '中锋';
    return '';
  }

  function esc(v) {
    return dom.esc(v == null ? '' : String(v));
  }

  function qualityOrder(q) {
    return QUALITY_ORDER[q] != null ? QUALITY_ORDER[q] : 9;
  }

  function qualityBadge(q, confidence) {
    var title = confidence ? '品质为分组推断（' + confidence + '）' : '品质为推断';
    return '<span class="badge badge--warn" title="' + esc(title) + '">' + esc(q || '未标注') +
      '·推断</span>';
  }

  function attrBadge(attr) {
    return attr
      ? '<span class="tag tag--orange">' + esc(attr) + '</span>'
      : '<span class="tag">属性未标注</span>';
  }

  views.equipment = {
    id: 'equipment',
    nav: '器材说明',
    icon: '🎒',
    title: '器材说明',
    subtitle:
      '82 件器材的客户端名称/属性标签/品质推断与社区攻略评价；数值与专属技能/词条归属未解，页面明确占位并可手动关联候选效果与词条、记录每件器材的使用笔记。',
    dataNote:
      '本页来源：客户端字符串（名称/属性标签/效果文案池，文本确证）· 社区攻略（档位评价/标签，非客户端数值）· 品质=分组推断；缺口：属性数值/专属技能词条归属未解（cw_conf 数值区阻塞）· 手动关联与笔记=玩家自填',
    mount: function (el, ctx) {
      var store = ctx.store;
      var data = BBT.equipmentData || ((ctx.gameData && ctx.gameData.equipment && ctx.gameData.equipment()) || null);
      if (!data || !Array.isArray(data.equipment) || !data.equipment.length) {
        el.innerHTML =
          '<div class="notice notice--warn"><span class="notice-ico">📦</span><span>' +
          '未找到器材数据，请运行 <span class="inline-code">node tool/scripts/build-equipment.mjs</span>。</span></div>';
        return;
      }
      var items = data.equipment;
      var pool = data.effectTextPool || [];
      var affixes = data.affixes || [];
      var ratings = data.guideRatings || [];
      var byId = Object.create(null);
      items.forEach(function (item) {
        byId[item.id] = item;
      });
      var allTags = [];
      ratings.forEach(function (r) {
        (r.tags || []).forEach(function (tag) {
          if (allTags.indexOf(tag) < 0) allTags.push(tag);
        });
      });
      allTags.sort(function (a, b) { return String(a).localeCompare(String(b), 'zh-CN'); });

      var ui = ctx.state.ui || (ctx.state.ui = {});
      var listState = {
        search: '',
        quality: '全部',
        attr: '全部',
        tag: '全部',
        sort: 'name'
      };
      var selectedId = ui.selectedEquipment && byId[ui.selectedEquipment] ? String(ui.selectedEquipment) : items[0].id;
      var poolSearch = '';
      var affixSearch = '';
      var mode = 'catalog'; // catalog | build（需求 #3b：按角色配置）
      var buildState = {
        charId: null,
        dirId: 'three',
        equipmentIds: [],
        manualSkills: [],
        note: ''
      };
      var characters = (ctx.data && ctx.data.characters) || (BBT.gameData ? BBT.gameData.characters() : []);
      if (!characters.length) characters = [];

      function currentItem() {
        return byId[selectedId] || null;
      }

      function noteOf(item) {
        return store && item ? store.getEquipmentNote(item.id) : null;
      }

      function linkOf(item) {
        return store && item ? store.getEquipmentLink(item.id) : null;
      }

      function hasGuide(item) {
        return !!(item.guide && item.guide.rating);
      }

      function filteredItems() {
        var q = listState.search.trim();
        return items
          .filter(function (item) {
            if (q && (item.name + ' ' + item.baseName + ' ' + (item.attrText || '') + ' ' + (item.descText || '')).indexOf(q) < 0) return false;
            if (listState.quality !== '全部' && item.qualityGroup !== listState.quality) return false;
            if (listState.attr !== '全部') {
              var attr = item.attrText || '未标注';
              if (attr !== listState.attr) return false;
            }
            if (listState.tag !== '全部') {
              var rating = item.guide && item.guide.rating;
              if (!rating || (rating.tags || []).indexOf(listState.tag) < 0) return false;
            }
            return true;
          })
          .sort(function (a, b) {
            if (listState.sort === 'quality') {
              return qualityOrder(a.qualityGroup) - qualityOrder(b.qualityGroup) ||
                String(a.name).localeCompare(String(b.name), 'zh-CN');
            }
            if (listState.sort === 'attr') {
              return String(a.attrText || 'zz').localeCompare(String(b.attrText || 'zz'), 'zh-CN');
            }
            if (listState.sort === 'guide') {
              return (hasGuide(b) ? 1 : 0) - (hasGuide(a) ? 1 : 0) ||
                String(a.name).localeCompare(String(b.name), 'zh-CN');
            }
            return String(a.name).localeCompare(String(b.name), 'zh-CN');
          });
      }

      function listHtml() {
        var list = filteredItems();
        if (!list.length) {
          return '<div class="notice notice--info" style="margin:10px 0"><span class="notice-ico">🔍</span><span>没有匹配的器材。</span></div>';
        }
        return list.map(function (item) {
          var note = noteOf(item);
          return (
            '<button type="button" class="equip-item' + (item.id === selectedId ? ' is-active' : '') +
            '" data-equip-id="' + esc(item.id) + '" aria-pressed="' + (item.id === selectedId) + '">' +
            '<span class="equip-item-main">' +
            '<span class="equip-item-name">' + esc(item.name) + '</span>' +
            '<span class="equip-item-meta">' + esc(item.qualityText || '品质未标注') + ' · ' +
            esc(item.attrText || '属性未标注') + ' · ' + esc(item.baseName || '') + '</span>' +
            '</span>' +
            '<span class="equip-item-tail">' +
            qualityBadge(item.qualityGroup, item.qualityConfidence) +
            (hasGuide(item) ? '<span class="tag tag--orange">攻略</span>' : '<span class="tag">无攻略</span>') +
            (note ? '<span class="tag tag--orange">已记录</span>' : '') +
            '</span></button>'
          );
        }).join('');
      }

      function guideHtml(item) {
        if (!item.guide || !item.guide.rating) {
          return (
            '<div class="card card--pad" id="equip-guide">' +
            '<div class="card-head"><div><div class="card-title"><span class="ico">📖</span>攻略评价</div>' +
            '<div class="card-sub">社区攻略（档位/条件/评价原文）。</div></div>' +
            '<span class="badge badge--warn">攻略未覆盖</span></div>' +
            '<div class="player-missing">攻略未覆盖 / 无名称评价（guide_match 未匹配到该器材名；社区档位评价本身可能不含器材名）。</div></div>'
          );
        }
        var r = item.guide.rating;
        var m = item.guide.match || {};
        return (
          '<div class="card card--pad" id="equip-guide">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">📖</span>攻略评价（社区）</div>' +
          '<div class="card-sub">' + esc(r.quality || '品质评价待补') + '</div></div>' +
          '<span class="badge badge--info">社区攻略</span></div>' +
          (r.tier ? '<div class="small">档位：<strong>' + esc(r.tier) + '</strong></div>' : '') +
          (r.tags && r.tags.length
            ? '<div class="row" style="gap:4px;flex-wrap:wrap;margin-top:6px">' +
              r.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>'
            : '') +
          (r.scenarios && r.scenarios.length
            ? '<div class="small" style="margin-top:8px">适用场景：' + esc(r.scenarios.join(' / ')) + '</div>'
            : '') +
          (r.constraints && r.constraints.length
            ? '<div class="small" style="margin-top:4px">条件/限制：' + esc(r.constraints.join(' / ')) + '</div>'
            : '') +
          (r.notes ? '<div class="small muted" style="margin-top:8px">' + esc(r.notes) + '</div>' : '') +
          (r.evidenceQuote
            ? '<div class="equip-quote">证据原文：「' + esc(r.evidenceQuote) + '」</div>'
            : '') +
          '<div class="small muted" style="margin-top:8px">匹配：' + esc(m.guideName || '') +
          (m.clientName ? ' ↔ ' + esc(m.clientName) : '') +
          ' · 置信度：' + esc(r.confidence || '社区') +
          (r.sourceUrl ? ' · <a href="' + esc(r.sourceUrl) + '" target="_blank" rel="noopener">来源链接</a>' : '') +
          '</div></div>'
        );
      }

      function poolRows() {
        var q = poolSearch.trim();
        var list = q ? pool.filter(function (e) { return String(e.text).indexOf(q) >= 0; }) : pool;
        return { list: list, total: list.length };
      }

      function affixRows() {
        var q = affixSearch.trim();
        var list = q
          ? affixes.filter(function (a) { return String(a.name).indexOf(q) >= 0 || String(a.id).indexOf(q) >= 0; })
          : affixes;
        return { list: list, total: list.length };
      }

      function effectsHtml(item) {
        var link = linkOf(item);
        var poolRes = poolRows();
        var affixRes = affixRows();
        return (
          '<div class="card card--pad" id="equip-effects">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🧪</span>效果 / 词条</div>' +
          '<div class="card-sub">每件器材专属技能与词条归属未解（cw_conf 数值区阻塞）；可手动关联候选。</div></div>' +
          '<span class="badge badge--warn">归属未解</span></div>' +
          '<div class="notice notice--warn"><span class="notice-ico">⚠️</span><span>' +
          '属性具体数值（如投射 +35）、每件器材专属技能/词条归属均未解；下方「效果文案池」「器材词条」为客户端候选池，' +
          '手动关联仅作个人标注，不代表官方归属。</span></div>' +
          (link
            ? '<div class="equip-link-card"><div class="small">已手动关联：</div>' +
              (link.effectText ? '<div>效果：' + esc(link.effectText) + '（offset ' + esc(link.effectOffset) + '）</div>' : '') +
              (link.affixName ? '<div>词条：' + esc(link.affixName) + '（id ' + esc(link.affixId) + '）</div>' : '') +
              (link.note ? '<div class="small muted">备注：' + esc(link.note) + '</div>' : '') +
              '<div class="small muted">更新时间：' + esc(String(link.updatedAt || '').slice(0, 19).replace('T', ' ')) + '</div>' +
              '<div class="row" style="gap:6px;margin-top:6px"><input class="input" id="equip-link-note" type="text" maxlength="500" placeholder="关联备注（可选）" value="' + esc(link.note) + '" style="max-width:320px">' +
              '<button type="button" class="btn btn--xs" id="equip-link-note-save">保存备注</button>' +
              '<button type="button" class="btn btn--xs btn--ghost" id="equip-link-clear">清除关联</button></div>' +
              '<div class="row" style="gap:6px;margin-top:6px"><input class="input" id="equip-manual-skill" type="text" maxlength="120" placeholder="手动标注器材技能（例：后撤/三分）" value="' + esc(link.manualSkill || '') + '" style="max-width:320px">' +
              '<button type="button" class="btn btn--xs" id="equip-manual-skill-save">保存器材技能</button></div></div>'
            : '<div class="player-missing">尚未手动关联效果/词条。可从下方候选池点「关联」。</div>' +
              '<div class="row" style="gap:6px;margin-top:8px"><input class="input" id="equip-manual-skill" type="text" maxlength="120" placeholder="手动标注器材技能（例：后撤/三分）" style="max-width:320px">' +
              '<button type="button" class="btn btn--xs" id="equip-manual-skill-save">保存器材技能</button></div>') +
          '<div class="grid grid--2" style="gap:14px;margin-top:10px">' +
          '<div><div class="team-sub-label">效果文案池（' + pool.length + ' 条 · 显示 ' +
          Math.min(POOL_LIMIT, poolRes.list.length) + ' / ' + poolRes.total + '）</div>' +
          '<input class="input" id="equip-pool-search" type="search" placeholder="搜索效果文案…" value="' + esc(poolSearch) + '">' +
          '<div class="equip-candidates">' +
          poolRes.list.slice(0, POOL_LIMIT).map(function (e) {
            return '<div class="equip-candidate"><span class="small">' + esc(e.text) +
              '<span class="muted"> #' + esc(e.offset) + '</span></span>' +
              '<button type="button" class="btn btn--xs" data-link-effect="' + esc(e.offset) + '">关联</button></div>';
          }).join('') +
          (poolRes.list.length > POOL_LIMIT ? '<div class="small muted">仅显示前 ' + POOL_LIMIT + ' 条，可用搜索缩小范围。</div>' : '') +
          '</div></div>' +
          '<div><div class="team-sub-label">器材词条（' + affixes.length + ' 条 · 显示 ' +
          Math.min(AFFIX_LIMIT, affixRes.list.length) + ' / ' + affixRes.total + '）</div>' +
          '<input class="input" id="equip-affix-search" type="search" placeholder="搜索词条名/ID…" value="' + esc(affixSearch) + '">' +
          '<div class="equip-candidates">' +
          affixRes.list.slice(0, AFFIX_LIMIT).map(function (a) {
            return '<div class="equip-candidate"><span class="small">' + esc(a.name) +
              '<span class="muted"> #' + esc(a.id) + '</span></span>' +
              '<button type="button" class="btn btn--xs" data-link-affix="' + esc(a.id) + '">关联</button></div>';
          }).join('') +
          (affixRes.list.length > AFFIX_LIMIT ? '<div class="small muted">仅显示前 ' + AFFIX_LIMIT + ' 条，可用搜索缩小范围。</div>' : '') +
          '</div></div></div></div>'
        );
      }

      function notesHtml(item) {
        var note = noteOf(item);
        return (
          '<div class="card card--pad" id="equip-notes">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">📝</span>我的笔记</div>' +
          '<div class="card-sub">记录该器材的使用评价 / 适用角色 / 适用场景；每件器材独立保存。</div></div>' +
          (note ? '<span class="badge badge--ok">已记录</span>' : '<span class="badge badge--neutral">未记录</span>') + '</div>' +
          '<textarea class="input" id="equip-note" rows="3" maxlength="2000" placeholder="例如：适合白神；训练流一星够用；开荒期优先…">' +
          esc(note ? note.text : '') + '</textarea>' +
          '<div class="row" style="gap:8px;margin-top:10px;flex-wrap:wrap">' +
          '<button type="button" class="btn btn--primary btn--sm" id="equip-note-save">保存笔记</button>' +
          '<button type="button" class="btn btn--sm" id="equip-note-delete"' + (note ? '' : ' disabled') + '>删除笔记</button>' +
          '<span class="small muted">' +
          (note ? '上次更新：' + esc(String(note.updatedAt).slice(0, 19).replace('T', ' ')) : '尚未记录') +
          '</span></div></div>'
        );
      }

      function detailHtml(item) {
        var guide = item.guide && item.guide.rating;
        return (
          '<div class="equip-detail-inner">' +
          '<div class="card card--pad" id="equip-basic">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🎒</span>' + esc(item.name) + '</div>' +
          '<div class="card-sub">' + esc(item.baseName || '') + ' · 来源 ' + esc(item.source || '待补') + '</div></div>' +
          qualityBadge(item.qualityGroup, item.qualityConfidence) + '</div>' +
          '<div class="equip-meta-row">' + attrBadge(item.attrText) +
          '<span class="tag">品质文本：' + esc(item.qualityText || '未标注') + '</span>' +
          '<span class="tag">品质置信度：' + esc(item.qualityConfidence || '推断') + '</span>' +
          (guide ? '<span class="tag tag--orange">攻略已覆盖</span>' : '<span class="tag">攻略未覆盖</span>') +
          '</div>' +
          (item.descText ? '<div class="small" style="margin-top:8px">描述：' + esc(item.descText) + '</div>'
            : '<div class="small muted" style="margin-top:8px">描述文案：客户端未提供（待补）。</div>') +
          '<div class="notice notice--warn" style="margin-top:10px"><span class="notice-ico">⚠️</span><span>' +
          '<strong>口径：</strong>名称/属性标签为客户端文本确证；<strong>属性具体数值未解</strong>、' +
          '<strong>专属技能/词条归属未解</strong>；品质为分组推断，请勿当作硬数值。</span></div>' +
          '</div>' +
          guideHtml(item) +
          effectsHtml(item) +
          notesHtml(item) +
          '</div>'
        );
      }

      function renderList() {
        var host = dom.qs('#equip-list', el);
        if (!host) return;
        host.innerHTML = listHtml();
        var count = dom.qs('#equip-list-count', el);
        if (count) count.textContent = filteredItems().length + ' / ' + items.length;
      }

      function renderDetail() {
        var host = dom.qs('#equip-detail', el);
        if (!host) return;
        var item = currentItem();
        if (!item) {
          host.innerHTML = '<div class="notice notice--warn"><span class="notice-ico">🎒</span><span>请选择一件器材。</span></div>';
          return;
        }
        host.innerHTML = detailHtml(item);
        bindDetailInputs();
      }

      function bindDetailInputs() {
        var poolSearchInput = dom.qs('#equip-pool-search', el);
        if (poolSearchInput) {
          poolSearchInput.addEventListener('input', function () {
            poolSearch = poolSearchInput.value || '';
            renderDetail();
          });
        }
        var affixSearchInput = dom.qs('#equip-affix-search', el);
        if (affixSearchInput) {
          affixSearchInput.addEventListener('input', function () {
            affixSearch = affixSearchInput.value || '';
            renderDetail();
          });
        }
      }

      function bindFilters() {
        var search = dom.qs('#equip-search', el);
        if (search) {
          search.addEventListener('input', function () {
            listState.search = search.value || '';
            renderList();
          });
        }
        [['#equip-filter-quality', 'quality'], ['#equip-filter-attr', 'attr'], ['#equip-filter-tag', 'tag'], ['#equip-sort', 'sort']]
          .forEach(function (pair) {
            var node = dom.qs(pair[0], el);
            if (!node) return;
            node.addEventListener('change', function () {
              listState[pair[1]] = node.value;
              renderList();
            });
          });
      }

      /* ---------------- 需求 #3b：按角色配置（器材推荐 + 技能规划） ---------------- */
      var directions = (BBT.scenarios && BBT.scenarios.directions) || [
        { id: 'drive', name: '攻框（含突破）' },
        { id: 'three', name: '三分（含中投）' },
        { id: 'defense', name: '防守（抢断/盖帽）' },
        { id: 'playmaking', name: '组织（战术/续航）' },
        { id: 'rebound', name: '篮板（特化）' }
      ];
      buildState.charId = ui.selectedBuildCharacter || (characters[0] ? String(characters[0].contentId) : null);
      buildState.dirId = ui.selectedBuildDirection || directions[0].id;

      function buildCharacter() {
        for (var i = 0; i < characters.length; i++) {
          if (String(characters[i].contentId) === String(buildState.charId)) return characters[i];
        }
        return characters[0] || null;
      }

      function manualSkillOf(equipmentId) {
        var link = store ? store.getEquipmentLink(equipmentId) : null;
        return link && link.manualSkill ? link.manualSkill : '';
      }

      function buildRuleFor(char, dirId) {
        var pos = positionBase(char ? char.role : '');
        var rules = [];
        if (dirId === 'three') {
          if (pos === '大前' || pos === '小前') {
            rules.push({ level: '必需', need: '后撤 / 横撤 类技能', candidates: ['后撤', '横撤'], why: pos + '落位两分区/中投区，需后撤/横撤才够到三分线外' });
            rules.push({ level: '建议', need: '三分类固定技能', candidates: ['三分', '快速三分', '大力三分'], why: '拉开到外线后仍需三分类技能出手' });
          } else if (pos === '中锋') {
            rules.push({ level: '必需', need: '呼叫挡拆 + 跑外线战术', candidates: ['呼叫挡拆', '跑外线'], why: '中锋落位禁区且无速卡，需挡拆创造外线空位（机制待确认）' });
            rules.push({ level: '建议', need: '三分 / 横撤 类固定技能', candidates: ['三分', '横撤'], why: '跑出外线后需要三分类技能' });
          } else if (pos === '控卫') {
            rules.push({ level: '已具备', need: '三分 + 横撤', candidates: [], why: '控卫基础技能已含三分/横撤' });
          } else if (pos === '分卫') {
            rules.push({ level: '已具备', need: '后撤', candidates: [], why: '分卫基础技能含后撤' });
            rules.push({ level: '建议', need: '三分类固定技能', candidates: ['三分', '快速三分', '大力三分'], why: '基础不含三分，可用器材补' });
          }
        } else {
          rules.push({ level: '—', need: '非三分方向暂无强制补丁', candidates: [], why: '该方向是位置自然方向或无需三分线外补丁；可参考推荐器材属性匹配' });
        }
        return rules;
      }

      function equipmentScore(item, char, dirId) {
        var attrTarget = EQUIP_ATTR_FOR_DIR[dirId];
        var score = 0;
        var reasons = [];
        if (item.attrText === attrTarget) {
          score += 20;
          reasons.push('属性匹配：' + attrTarget);
        }
        var qScore = item.qualityGroup === 'SSR' || item.qualityGroup === 'UP' ? 6 : item.qualityGroup === 'SR' ? 4 : 2;
        score += qScore;
        var manual = manualSkillOf(item.id);
        if (manual) {
          var manualHit = dirId === 'three' && THREE_PATCH_SKILLS.some((k) => manual.indexOf(k) >= 0);
          score += manualHit ? 12 : 3;
          reasons.push('已手动标注器材技能：' + manual + (manualHit ? '（可补三分）' : ''));
        }
        if (item.guide && item.guide.rating) {
          score += 5;
          reasons.push('有社区攻略');
          var text = [item.guide.rating.quality, item.guide.rating.notes, (item.guide.rating.tags || []).join(' '),
            (item.guide.rating.scenarios || []).join(' ')].join(' ');
          var dirWords = dirId === 'three' ? ['三分', '投射', '中投'] : dirId === 'drive' ? ['攻框', '突破', '扣篮', '上篮'] :
            dirId === 'defense' ? ['防守', '盖帽', '抢断'] : dirId === 'playmaking' ? ['组织', '传球', '战术'] : ['篮板'];
          dirWords.forEach(function (w) {
            if (text.indexOf(w) >= 0) {
              score += 3;
              reasons.push('攻略提及：' + w);
            }
          });
        }
        if (!reasons.length) {
          score += 1;
          reasons.push('启发式补位：属性/攻略未直接匹配，按品质与通用性占位');
        }
        return { score: score, reasons: reasons };
      }

      function recommendEquipment(char, dirId) {
        if (!char) return [];
        return items
          .map(function (item) {
            var s = equipmentScore(item, char, dirId);
            return { item: item, score: s.score, reasons: s.reasons };
          })
          .sort(function (a, b) { return b.score - a.score || String(a.item.name).localeCompare(String(b.item.name), 'zh-CN'); })
          .slice(0, 5);
      }

      function savedEquipmentBuild() {
        if (!store || !buildState.charId) return null;
        return store.getEquipmentBuild(buildState.charId, buildState.dirId);
      }

      function loadBuildState() {
        var recs = recommendEquipment(buildCharacter(), buildState.dirId);
        var saved = savedEquipmentBuild();
        if (saved) {
          buildState.equipmentIds = saved.equipmentIds.slice();
          buildState.manualSkills = (saved.manualSkills || []).map(function (s) { return { name: s.name, source: s.source, required: s.required }; });
          buildState.note = saved.note || '';
        } else {
          buildState.equipmentIds = recs.map(function (r) { return r.item.id; });
          buildState.manualSkills = [];
          buildState.note = '';
        }
      }

      /**
       * 技能规划池：7 槽 = 5（三选一：定位池 + 器材/笔记带出）+ 1（天赋事件）+ 1（转盘·随机属性精通，待确认）。
       * 同名技能全局去重。
       */
      function skillPoolForBuild() {
        var char = buildCharacter();
        var entries = [];
        function add(name, source, required) {
          if (!name) return;
          String(name).split(/[\/、,，]/).forEach(function (part) {
            var v = part.trim();
            if (!v) return;
            entries.push({ name: v, source: source, required: !!required });
          });
        }
        (char && char.roles ? char.roles : []).forEach(function (role) {
          (ROLE_SKILL_POOL[role] || []).forEach(function (s) { add(s, '定位池', false); });
        });
        buildRuleFor(char, buildState.dirId).forEach(function (rule) {
          if (rule.level === '必需' || rule.level === '建议') {
            (rule.candidates || []).forEach(function (s) { add(s, '定位池', rule.level === '必需'); });
          }
        });
        buildState.equipmentIds.forEach(function (id) {
          var manual = manualSkillOf(id);
          if (manual) add(manual, '器材', false);
        });
        buildState.manualSkills.forEach(function (s) {
          add(s.name, s.source || '手动', s.required);
        });
        // 同名去重（保留首次出现但记录冲突）
        var seen = Object.create(null);
        var deduped = [];
        entries.forEach(function (e) {
          if (!seen[e.name]) {
            seen[e.name] = { name: e.name, sources: [e.source], required: e.required };
            deduped.push(seen[e.name]);
          } else {
            if (seen[e.name].sources.indexOf(e.source) < 0) seen[e.name].sources.push(e.source);
            if (e.required) seen[e.name].required = true;
          }
        });
        var conflicts = deduped.filter(function (e) { return e.sources.length > 1; });
        var duplicateEquipment = buildState.equipmentIds
          .map(function (id) { return manualSkillOf(id); })
          .filter(Boolean)
          .filter(function (skill, i, arr) { return arr.indexOf(skill) !== i; });
        var talentCount = deduped.filter(function (e) { return e.sources.indexOf('天赋事件') >= 0; }).length;
        var wheelCount = deduped.filter(function (e) { return e.sources.indexOf('转盘') >= 0; }).length;
        var triCount = deduped.filter(function (e) {
          return e.sources.indexOf('天赋事件') < 0 && e.sources.indexOf('转盘') < 0;
        }).length;
        return {
          entries: deduped,
          conflicts: conflicts,
          duplicateEquipment: duplicateEquipment,
          triCount: triCount,
          talentCount: talentCount,
          wheelCount: wheelCount
        };
      }

      function buildViewHtml() {
        var char = buildCharacter();
        if (!char) {
          return '<div class="notice notice--warn"><span class="notice-ico">👤</span><span>未找到角色数据。</span></div>';
        }
        var recs = recommendEquipment(char, buildState.dirId);
        var poolInfo = skillPoolForBuild();
        var rules = buildRuleFor(char, buildState.dirId);
        var levelClass = { 必需: 'badge--warn', 建议: 'badge--info', 已具备: 'badge--ok', '—': 'badge--neutral' };
        var overCap = poolInfo.triCount > 5 || poolInfo.talentCount > 1 || poolInfo.wheelCount > 1;
        var equipCards = buildState.equipmentIds.map(function (id) {
          var rec = null;
          for (var i = 0; i < recs.length; i++) if (recs[i].item.id === id) rec = recs[i];
          var item = byId[id];
          if (!item) return '';
          var scoreInfo = rec ? rec : equipmentScore(item, char, buildState.dirId);
          return (
            '<div class="equip-rec-card">' +
            '<div class="equip-rec-head"><strong>' + esc(item.name) + '</strong>' +
            '<span class="row" style="gap:4px">' + qualityBadge(item.qualityGroup, item.qualityConfidence) +
            attrBadge(item.attrText) + (item.guide && item.guide.rating ? '<span class="tag tag--orange">有攻略</span>' : '') +
            '<button type="button" class="btn btn--xs btn--ghost" data-build-equip-remove="' + esc(id) + '">移除</button></span></div>' +
            '<div class="small muted">为什么选：' + esc(scoreInfo.reasons.join('；')) + '</div>' +
            (item.guide && item.guide.rating && item.guide.rating.notes
              ? '<div class="small muted">攻略：' + esc(String(item.guide.rating.notes).slice(0, 160)) + '…</div>'
              : '<div class="small muted">攻略未覆盖（按属性/技能启发式推荐）</div>') +
            '<div class="small muted">手动标注器材技能：' + esc(manualSkillOf(id) || '未标注（可在器材图鉴详情中录入）') + '</div>' +
            '</div>'
          );
        }).join('');
        var recSuggest =
          recs.length && buildState.equipmentIds.length < 5
            ? '<div class="small muted" style="margin-top:8px">推荐候选：' +
              recs.filter(function (r) { return buildState.equipmentIds.indexOf(r.item.id) < 0; }).slice(0, 3).map(function (r) {
                return '<button type="button" class="btn btn--xs" data-build-equip-add="' + esc(r.item.id) + '">＋ ' + esc(r.item.name) + '</button>';
              }).join(' ') + '</div>'
            : '';
        var allEquipOptions = items.map(function (it) {
          return '<option value="' + esc(it.id) + '">' + esc(it.name) + '（' + esc(it.attrText || '属性未标注') + '）</option>';
        }).join('');
        var skillRows = poolInfo.entries.map(function (e) {
          return (
            '<tr><td>' + esc(e.name) + (e.required ? ' <span class="badge badge--warn">必需</span>' : '') + '</td>' +
            '<td>' + esc(e.sources.join(' / ')) + '</td>' +
            '<td>' + (e.sources.length > 1 ? '<span class="badge badge--warn">同名冲突/已去重</span>' : '<span class="badge badge--ok">唯一</span>') + '</td>' +
            '</tr>'
          );
        }).join('');
        var manualRows = buildState.manualSkills.map(function (s, i) {
          return (
            '<div class="equip-candidate"><span class="small"><strong>' + esc(s.name) + '</strong> · 来源 ' + esc(s.source) +
            (s.required ? ' · 必需' : '') + '</span>' +
            '<button type="button" class="btn btn--xs btn--ghost" data-build-skill-remove="' + i + '">删除</button></div>'
          );
        }).join('');
        return (
          '<div class="card card--pad" id="equip-build-card">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🎯</span>按角色配置</div>' +
          '<div class="card-sub">选角色 + 目标方向 → 5 件器材推荐、补丁技能清单、7 槽技能规划（5 三选一 + 1 天赋事件 + 1 转盘）；可手动修正并保存。</div></div>' +
          '<span class="badge badge--warn">启发式推断</span></div>' +
          '<div class="grid grid--2" style="gap:12px">' +
          '<div class="field"><label class="field-label" for="equip-build-char"><span class="label-text">角色</span></label>' +
          '<select class="select" id="equip-build-char">' +
          characters.map(function (c) {
            return '<option value="' + esc(c.contentId) + '"' + (String(c.contentId) === String(buildState.charId) ? ' selected' : '') + '>' +
              esc(c.name) + '（' + esc(c.rarity || '—') + ' · ' + esc(c.role || '—') + '）</option>';
          }).join('') + '</select></div>' +
          '<div class="field"><label class="field-label" for="equip-build-dir"><span class="label-text">目标方向</span></label>' +
          '<select class="select" id="equip-build-dir">' +
          directions.map(function (d) {
            return '<option value="' + esc(d.id) + '"' + (d.id === buildState.dirId ? ' selected' : '') + '>' + esc(d.name) + '</option>';
          }).join('') + '</select></div>' +
          '</div>' +
          '<div class="team-sub-label">推荐 5 件器材 <span class="badge badge--info">属性匹配 + 场景/攻略 + 补丁技能</span></div>' +
          '<div class="equip-rec-list">' + (equipCards || '<div class="player-missing">暂无推荐。</div>') + '</div>' +
          recSuggest +
          '<div class="row" style="gap:6px;margin-top:8px"><select class="select" id="equip-build-add-select">' + allEquipOptions + '</select>' +
          '<button type="button" class="btn btn--sm" id="equip-build-add-btn">添加器材</button></div>' +
          '<div class="team-sub-label">补丁技能清单 <span class="badge badge--info">来自位置约束规则（knowledge §6.2）</span></div>' +
          '<div class="build-patch-list">' +
          rules.map(function (r) {
            return '<div class="build-patch"><span class="badge ' + (levelClass[r.level] || 'badge--neutral') + '">' + esc(r.level) + '</span>' +
              '<div class="build-patch-body"><strong>' + esc(r.need) + '</strong><div class="small muted">' + esc(r.why) + '</div></div></div>';
          }).join('') + '</div>' +
          '<div class="small muted" style="margin-top:6px">可提供的三分类技能（器材/角色）：' +
          THREE_PATCH_SKILLS.map(function (k) { return '<span class="tag">' + esc(k) + '</span>'; }).join(' ') + '</div>' +
          '<div class="team-sub-label">技能规划预览 · 7 槽位（5 三选一 + 1 天赋事件 + 1 转盘）' +
          '<span class="badge ' + (overCap ? 'badge--warn' : 'badge--ok') + '">' +
          poolInfo.entries.length + ' / 7</span></div>' +
          '<div class="small muted">三选一技能（前 5 场获胜各 1 次）：' + poolInfo.triCount + ' / 5 · 天赋事件：' +
          poolInfo.talentCount + ' / 1 · 转盘（随机属性精通，待确认）：' + poolInfo.wheelCount + ' / 1' +
          (overCap ? ' · <span class="tag tag--orange">超出对应槽位，需要取舍</span>' : '') + '</div>' +
          '<div class="table-wrap" style="margin-top:6px"><table class="table"><thead><tr><th>技能（同名去重后）</th><th>来源</th><th>状态</th></tr></thead><tbody>' +
          (skillRows || '<tr><td colspan="3" class="small muted">暂无自动技能；可在下方手动添加。</td></tr>') + '</tbody></table></div>' +
          (poolInfo.conflicts.length
            ? '<div class="notice notice--warn" style="margin-top:6px"><span class="notice-ico">⚠️</span><span>同名去重：' +
              esc(poolInfo.conflicts.map(function (e) { return e.name + '（' + e.sources.join('/') + '）'; }).join('；')) +
              '。同名技能全局只学一次（器材/笔记/天赋事件/转盘同一技能不重复生效）。</span></div>'
            : '') +
          (poolInfo.duplicateEquipment.length
            ? '<div class="notice notice--warn" style="margin-top:6px"><span class="notice-ico">🎒</span><span>器材技能重复：' +
              esc(poolInfo.duplicateEquipment.join('、')) + '。器材技能重复时建议少带器材，可多刷角色自身技能。</span></div>'
            : '') +
          '<div class="team-sub-label">手动技能（定位池/器材/笔记/天赋事件/转盘，可增删改）</div>' +
          '<div class="equip-candidates">' + (manualRows || '<div class="small muted">暂无手动技能。</div>') + '</div>' +
          '<div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap">' +
          '<input class="input" id="equip-build-skill-name" type="text" maxlength="60" placeholder="技能名（例：横撤/看破）" style="max-width:200px">' +
          '<select class="select" id="equip-build-skill-source">' +
          ['定位池', '器材', '笔记', '天赋事件', '转盘', '手动'].map(function (s) {
            return '<option value="' + esc(s) + '">' + esc(s) + '</option>';
          }).join('') + '</select>' +
          '<label class="small"><input type="checkbox" id="equip-build-skill-required"> 必需</label>' +
          '<button type="button" class="btn btn--sm" id="equip-build-skill-add">添加技能</button></div>' +
          '<div class="team-sub-label">配置笔记</div>' +
          '<textarea class="input" id="equip-build-note" rows="2" maxlength="2000" placeholder="记录该角色×方向的器材/技能取舍…">' + esc(buildState.note) + '</textarea>' +
          '<div class="row" style="gap:8px;margin-top:10px;flex-wrap:wrap">' +
          '<button type="button" class="btn btn--primary btn--sm" id="equip-build-save">保存按角色配置</button>' +
          '<button type="button" class="btn btn--sm btn--ghost" id="equip-build-reset">按推荐重置</button>' +
          '<span class="small muted">来源：client 名称/属性 + 社区攻略 + knowledge 比赛机制 §6.2 + 手动标注；技能归属未解处为启发式占位。</span>' +
          '</div></div>'
        );
      }

      function renderBuildView() {
        var host = dom.qs('#equip-build', el);
        if (!host) return;
        host.innerHTML = buildViewHtml();
        bindBuildViewInputs();
      }

      function bindBuildViewInputs() {
        var charSel = dom.qs('#equip-build-char', el);
        if (charSel) {
          charSel.addEventListener('change', function () {
            buildState.charId = charSel.value;
            ui.selectedBuildCharacter = buildState.charId;
            if (ctx.save) ctx.save();
            loadBuildState();
            renderBuildView();
          });
        }
        var dirSel = dom.qs('#equip-build-dir', el);
        if (dirSel) {
          dirSel.addEventListener('change', function () {
            buildState.dirId = dirSel.value;
            ui.selectedBuildDirection = buildState.dirId;
            if (ctx.save) ctx.save();
            loadBuildState();
            renderBuildView();
          });
        }
        var note = dom.qs('#equip-build-note', el);
        if (note) {
          note.addEventListener('input', function () {
            buildState.note = note.value;
          });
        }
      }

      function saveBuildConfig() {
        if (!store || !buildState.charId) return;
        var res = store.saveEquipmentBuild({
          characterId: buildState.charId,
          directionId: buildState.dirId,
          equipmentIds: buildState.equipmentIds,
          manualSkills: buildState.manualSkills,
          note: buildState.note
        });
        if (res.ok) {
          if (ctx.toast) ctx.toast('按角色配置已保存', 'ok');
          loadBuildState();
          renderBuildView();
        } else if (ctx.toast) {
          ctx.toast('保存失败：' + res.errors.join('；'), 'warn');
        }
      }

      el.innerHTML =
        '<div class="equip-toolbar card card--pad">' +
        '<div class="spread" style="gap:10px;align-items:flex-start;flex-wrap:wrap">' +
        '<div><div class="card-title"><span class="ico">🎒</span>器材说明</div>' +
        '<div class="card-sub">共 ' + items.length + ' 件 · 效果文案池 ' + pool.length +
        ' · 器材词条 ' + affixes.length + ' · 社区攻略评价 ' + ratings.length + ' 条</div></div>' +
        '<div class="row" style="gap:6px;flex-wrap:wrap">' +
        '<span class="badge badge--warn">属性数值未解</span>' +
        '<span class="badge badge--warn">技能/词条归属未解</span>' +
        '<span class="badge badge--warn">品质=推断</span>' +
        '<span class="badge badge--info">攻略=社区</span>' +
        '</div></div>' +
        '<div class="row" id="equip-mode-switch" style="gap:6px;margin-top:10px">' +
        '<button type="button" class="btn btn--sm btn--primary" data-equip-mode="catalog">器材图鉴</button>' +
        '<button type="button" class="btn btn--sm" data-equip-mode="build">按角色配置</button>' +
        '<span class="small muted">按角色配置：5 器材推荐 + 补丁技能 + 7 槽技能规划（5 三选一 + 1 天赋事件 + 1 转盘）</span>' +
        '</div>' +
        '<div class="equip-filters">' +
        '<input class="input" id="equip-search" type="search" placeholder="搜索器材名 / 属性 / 描述…">' +
        '<div class="row" style="gap:6px;flex-wrap:wrap">' +
        '<select class="select" id="equip-filter-quality">' +
        QUALITY_FILTERS.map(function (q) { return '<option value="' + esc(q) + '">' + (q === '全部' ? '全部品质' : q) + '</option>'; }).join('') +
        '</select>' +
        '<select class="select" id="equip-filter-attr">' +
        ATTR_FILTERS.map(function (a) { return '<option value="' + esc(a) + '">' + (a === '全部' ? '全部属性' : a) + '</option>'; }).join('') +
        '</select>' +
        '<select class="select" id="equip-filter-tag">' +
        ['全部'].concat(allTags).map(function (t) { return '<option value="' + esc(t) + '">' + (t === '全部' ? '全部流派/场景' : t) + '</option>'; }).join('') +
        '</select>' +
        '<select class="select" id="equip-sort">' +
        [['name', '按名称'], ['quality', '按品质'], ['attr', '按属性'], ['guide', '攻略优先']].map(function (s) {
          return '<option value="' + s[0] + '">' + s[1] + '</option>';
        }).join('') +
        '</select></div></div></div>' +
        '<div id="equip-catalog"><div class="equip-layout">' +
        '<aside class="equip-side card card--pad">' +
        '<div class="equip-side-head"><div class="card-title"><span class="ico">📦</span>器材列表</div>' +
        '<span class="badge badge--neutral" id="equip-list-count">' + items.length + ' / ' + items.length + '</span></div>' +
        '<div class="equip-list" id="equip-list" role="listbox" aria-label="器材列表"></div>' +
        '</aside>' +
        '<section class="equip-main" id="equip-detail"></section>' +
        '</div></div>' +
        '<div id="equip-build" hidden></div>';

      renderList();
      renderDetail();
      bindFilters();

      dom.delegate(el, '[data-equip-id]', 'click', function (event, target) {
        var id = target.getAttribute('data-equip-id');
        if (!byId[id]) return;
        selectedId = id;
        ui.selectedEquipment = id;
        if (ctx.save) ctx.save();
        renderList();
        renderDetail();
      });

      dom.delegate(el, '[data-link-effect]', 'click', function (event, target) {
        var item = currentItem();
        var offset = Number(target.getAttribute('data-link-effect'));
        var eff = pool.filter(function (e) { return Number(e.offset) === offset; })[0];
        if (!item || !store || !eff) return;
        var existing = store.getEquipmentLink(item.id) || {};
        store.setEquipmentLink(item.id, {
          effectOffset: eff.offset,
          effectText: eff.text,
          affixId: existing.affixId || '',
          affixName: existing.affixName || '',
          manualSkill: existing.manualSkill || '',
          note: existing.note || ''
        });
        if (ctx.toast) ctx.toast('已手动关联效果：' + eff.text, 'ok');
        renderDetail();
        renderList();
      });

      dom.delegate(el, '[data-link-affix]', 'click', function (event, target) {
        var item = currentItem();
        var affixId = target.getAttribute('data-link-affix');
        var affix = affixes.filter(function (a) { return String(a.id) === String(affixId); })[0];
        if (!item || !store || !affix) return;
        var existing = store.getEquipmentLink(item.id) || {};
        store.setEquipmentLink(item.id, {
          effectOffset: existing.effectOffset != null ? existing.effectOffset : null,
          effectText: existing.effectText || '',
          affixId: affix.id,
          affixName: affix.name,
          manualSkill: existing.manualSkill || '',
          note: existing.note || ''
        });
        if (ctx.toast) ctx.toast('已手动关联词条：' + affix.name, 'ok');
        renderDetail();
        renderList();
      });

      dom.delegate(el, '#equip-link-note-save', 'click', function () {
        var item = currentItem();
        if (!item || !store) return;
        var existing = store.getEquipmentLink(item.id);
        if (!existing) return;
        var noteInput = dom.qs('#equip-link-note', el);
        existing.note = noteInput ? noteInput.value || '' : '';
        store.setEquipmentLink(item.id, existing);
        if (ctx.toast) ctx.toast('关联备注已保存', 'ok');
        renderDetail();
      });

      dom.delegate(el, '#equip-link-clear', 'click', function () {
        var item = currentItem();
        if (!item || !store) return;
        store.setEquipmentLink(item.id, null);
        if (ctx.toast) ctx.toast('已清除手动关联', 'ok');
        renderDetail();
        renderList();
      });

      dom.delegate(el, '#equip-note-save', 'click', function () {
        var item = currentItem();
        if (!item || !store) return;
        var input = dom.qs('#equip-note', el);
        store.setEquipmentNote(item.id, input ? input.value || '' : '');
        if (ctx.toast) ctx.toast('器材笔记已保存：' + item.name, 'ok');
        renderDetail();
        renderList();
      });

      dom.delegate(el, '#equip-note-delete', 'click', function () {
        var item = currentItem();
        if (!item || !store) return;
        store.deleteEquipmentNote(item.id);
        if (ctx.toast) ctx.toast('已删除器材笔记', 'ok');
        renderDetail();
        renderList();
      });

      // 手动标注器材技能（可单独保存，不必先关联效果/词条）
      dom.delegate(el, '#equip-manual-skill-save', 'click', function () {
        var item = currentItem();
        if (!item || !store) return;
        var input = dom.qs('#equip-manual-skill', el);
        var existing = store.getEquipmentLink(item.id) || {};
        store.setEquipmentLink(item.id, {
          effectOffset: existing.effectOffset != null ? existing.effectOffset : null,
          effectText: existing.effectText || '',
          affixId: existing.affixId || '',
          affixName: existing.affixName || '',
          manualSkill: input ? input.value || '' : '',
          note: existing.note || ''
        });
        if (ctx.toast) ctx.toast('器材技能已手动标注', 'ok');
        renderDetail();
      });

      /* ---------------- 模式切换 + 按角色配置交互 ---------------- */
      function setMode(next) {
        mode = next;
        var catalog = dom.qs('#equip-catalog', el);
        var build = dom.qs('#equip-build', el);
        if (catalog) {
          if (mode === 'catalog') catalog.removeAttribute('hidden');
          else catalog.setAttribute('hidden', 'hidden');
        }
        if (build) {
          if (mode === 'build') build.removeAttribute('hidden');
          else build.setAttribute('hidden', 'hidden');
        }
        dom.qsa('#equip-mode-switch [data-equip-mode]', el).forEach(function (btn) {
          var active = btn.getAttribute('data-equip-mode') === mode;
          btn.classList.toggle('btn--primary', active);
        });
        if (mode === 'build') {
          loadBuildState();
          renderBuildView();
        }
      }

      dom.delegate(el, '[data-equip-mode]', 'click', function (event, target) {
        setMode(target.getAttribute('data-equip-mode'));
      });

      dom.delegate(el, '[data-build-equip-remove]', 'click', function (event, target) {
        var id = target.getAttribute('data-build-equip-remove');
        buildState.equipmentIds = buildState.equipmentIds.filter(function (x) { return x !== id; });
        renderBuildView();
      });

      dom.delegate(el, '[data-build-equip-add]', 'click', function (event, target) {
        var id = target.getAttribute('data-build-equip-add');
        if (buildState.equipmentIds.length >= 5) {
          if (ctx.toast) ctx.toast('最多 5 件器材', 'warn');
          return;
        }
        if (buildState.equipmentIds.indexOf(id) < 0) buildState.equipmentIds.push(id);
        renderBuildView();
      });

      dom.delegate(el, '#equip-build-add-btn', 'click', function () {
        var select = dom.qs('#equip-build-add-select', el);
        if (!select) return;
        var id = select.value;
        if (buildState.equipmentIds.length >= 5) {
          if (ctx.toast) ctx.toast('最多 5 件器材', 'warn');
          return;
        }
        if (buildState.equipmentIds.indexOf(id) < 0) buildState.equipmentIds.push(id);
        renderBuildView();
      });

      dom.delegate(el, '[data-build-skill-remove]', 'click', function (event, target) {
        var idx = Number(target.getAttribute('data-build-skill-remove'));
        buildState.manualSkills.splice(idx, 1);
        renderBuildView();
      });

      dom.delegate(el, '#equip-build-skill-add', 'click', function () {
        var nameInput = dom.qs('#equip-build-skill-name', el);
        var sourceSel = dom.qs('#equip-build-skill-source', el);
        var requiredBox = dom.qs('#equip-build-skill-required', el);
        var name = nameInput ? String(nameInput.value || '').trim() : '';
        if (!name) {
          if (ctx.toast) ctx.toast('请输入技能名', 'warn');
          return;
        }
        if (buildState.manualSkills.length >= 12) {
          if (ctx.toast) ctx.toast('手动技能最多 12 条', 'warn');
          return;
        }
        buildState.manualSkills.push({
          name: name.slice(0, 60),
          source: sourceSel ? sourceSel.value : '手动',
          required: requiredBox ? requiredBox.checked : false
        });
        renderBuildView();
      });

      dom.delegate(el, '#equip-build-save', 'click', saveBuildConfig);

      dom.delegate(el, '#equip-build-reset', 'click', function () {
        if (!store || !buildState.charId) return;
        store.deleteEquipmentBuild(buildState.charId, buildState.dirId);
        buildState.manualSkills = [];
        buildState.note = '';
        loadBuildState();
        renderBuildView();
        if (ctx.toast) ctx.toast('已按推荐重置', 'ok');
      });

      setMode('catalog');
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

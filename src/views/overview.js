/*!
 * views/overview.js —— 球员种子详情页（Tab id: overview，仍为第一个页签）
 *
 * 左侧：球员列表（搜索 / 位置 / 稀有度 / 排序 + 笔记角标）
 * 右侧：详情
 *   1) 头部：名字/称号/稀有度/位置/风格/学校/身高体重/图鉴链接
 *   2) 基本面板（1 级参考）：六维 + 6 槽潜力（明确标注「图鉴参考值，非实测种子面板」）
 *   3) 满级养成数据：暂无系统数据 → 明确占位 + 预留字段（不虚构数值）
 *   4) 天赋路线：derived_roster 的 known_stream_talents / training_talents / stream_roles
 *   5) 专属事件 & 最优解攻略：占位 + 预留 events: []
 *   6) 我的笔记：1~5 星 + 预设标签 + 自由文本，通过 store 持久化（bbt.characterNotes.v1）
 *
 * 所有数据来自 BBT.characterData / BBT.gameData；页面不写死角色数值。
 */
(function (root) {
  'use strict';
  var BBT = (root.BBT = root.BBT || {});
  var views = (BBT.views = BBT.views || {});
  var dom = BBT.dom;

  var STAT_KEYS = ['投射', '攻筐', '防投', '护筐', '传球', '突破']; // C层比赛面板（wiki 1级参考，非成长六维）
  var A_KEYS = ['投射', '弹跳', '防守', '体能', '运控', '意识']; // A层成长六维（游戏真实六维）
  var A_ATTR_MAP = { '投射': '投射', '攻筐': '弹跳', '防投': '防守', '护筐': '体能', '传球': '运控', '突破': '意识' };
  function aLayerStats(character) {
    var raw = (character && character.stats) || {};
    var out = {};
    A_KEYS.forEach(function (k) {
      var oldKey = Object.keys(A_ATTR_MAP).filter(function (x) { return A_ATTR_MAP[x] === k; })[0];
      out[k] = raw[oldKey] != null ? raw[oldKey] : null;
    });
    return out;
  }
  var POSITIONS = ['全部', '控卫', '分卫', '小前', '大前', '中锋'];
  var RARITIES = ['全部', 'SSR', 'SR', 'R'];
  var NOTE_TAGS = ['实战手感', '养成优先', '对位克制', '阵容适配', '待观察'];
  var SORTS = [
    { id: 'rank', label: '按综合排名' },
    { id: 'name', label: '按名字' },
    { id: 'rarity', label: '按稀有度' }
  ];

  function esc(v) {
    return dom.esc(v == null ? '' : String(v));
  }

  function num(v, digits) {
    return BBT.format && BBT.format.num ? BBT.format.num(v, digits == null ? 0 : digits) : String(v);
  }

  function starsText(n) {
    var v = Math.max(0, Math.min(5, Math.round(Number(n) || 0)));
    return '★★★★★'.slice(0, v) + '☆☆☆☆☆'.slice(0, 5 - v);
  }

  function posBase(role) {
    var text = String(role || '');
    if (/控卫|控球/.test(text)) return '控卫';
    if (/分卫|得分/.test(text)) return '分卫';
    if (/小前/.test(text)) return '小前';
    if (/大前/.test(text)) return '大前';
    if (/中锋/.test(text)) return '中锋';
    return text;
  }

  var RARITY_RANK = { SSR: 0, SR: 1, R: 2 };
  function rarityOrder(r) {
    return RARITY_RANK[r] != null ? RARITY_RANK[r] : 3;
  }

  function hashCharId() {
    var hash = String((root.location && root.location.hash) || '');
    var m = hash.match(/[?&]char=([^&]+)/);
    return m ? decodeURIComponent(m[1]) : null;
  }

  function setHashChar(contentId) {
    var target = '#/overview?char=' + encodeURIComponent(String(contentId));
    try {
      if (root.history && typeof root.history.replaceState === 'function') {
        if (String((root.location && root.location.hash) || '') !== target) {
          root.history.replaceState(null, '', target);
        }
      } else if (root.location) {
        root.location.hash = target;
      }
    } catch (err) {
      /* file:// 下个别浏览器限制 history，忽略即可（选中仍走 store） */
    }
  }

  views.overview = {
    id: 'overview',
    nav: '球员',
    icon: '👤',
    title: '球员图鉴 / 角色档案',
    subtitle:
      '「篮球少女：飞跃巅峰」数值工具包 · 卡片墙式球员图鉴：六维基础解包数据 + 成长方向（推荐属性两项）+ 位置技能卡类型 + 防守手段建议 + 技能完整说明；旧占位数据折叠保留。',
    dataNote:
      '本页来源：图鉴 1 级参考值（T1 characters.json）· 派生评分/天赋（T8 derived_roster.json）· 位置效果原文（客户端文本确证）· 我的笔记为玩家自填；满级/专属事件=数据待补',
    mount: function (el, ctx) {
      var store = ctx.store;
      var data = ctx.data || (BBT.gameData ? { characters: BBT.gameData.characters() } : { characters: [] });
      var characters = data.characters || [];
      var byId = Object.create(null);
      characters.forEach(function (c) {
        byId[String(c.contentId)] = c;
      });
      if (!characters.length) {
        el.innerHTML =
          '<div class="notice notice--warn"><span class="notice-ico">📦</span><span>' +
          '未找到角色数据，请运行 <span class="inline-code">node tool/scripts/build-characters.mjs</span>。</span></div>';
        return;
      }

      var ui = ctx.state.ui || (ctx.state.ui = {});
      var listState = { search: '', position: '全部', rarity: '全部', sort: 'rank' };
      var state = { draft: null };
      var selectedId = null;

      function getSelected() {
        return selectedId != null ? byId[String(selectedId)] || null : null;
      }

      function noteOf(character) {
        if (!store || !character) return null;
        return store.getCharacterNote(character.contentId);
      }

      function filteredCharacters() {
        var q = listState.search.trim();
        var list = characters.filter(function (c) {
          if (listState.position !== '全部' && posBase(c.role) !== listState.position) return false;
          if (listState.rarity !== '全部' && String(c.rarity || '') !== listState.rarity) return false;
          if (q && String(c.name).indexOf(q) < 0) return false;
          return true;
        });
        list.sort(function (a, b) {
          if (listState.sort === 'name') return String(a.name).localeCompare(String(b.name), 'zh-CN');
          if (listState.sort === 'rarity') {
            return rarityOrder(a.rarity) - rarityOrder(b.rarity) || String(a.name).localeCompare(String(b.name), 'zh-CN');
          }
          var ra = a.derived && a.derived.rosterRank ? Number(a.derived.rosterRank) : 9999;
          var rb = b.derived && b.derived.rosterRank ? Number(b.derived.rosterRank) : 9999;
          return ra - rb;
        });
        return list;
      }

      /* ---------------- 列表 ---------------- */

      function positionMeanHeight() {
        var sum = {}, n = {};
        characters.forEach(function (c) {
          var pos = posBase(c.role);
          if (!pos || c.heightCm == null) return;
          sum[pos] = (sum[pos] || 0) + Number(c.heightCm);
          n[pos] = (n[pos] || 0) + 1;
        });
        var out = {};
        Object.keys(sum).forEach(function (k) { out[k] = sum[k] / n[k]; });
        return out;
      }
      function recommendedAttrs(character) {
        var pots = Array.isArray(character.potentials) ? character.potentials.slice() : [];
        if (!pots.length) return [];
        return pots.map(function (p) {
          return { name: A_KEYS[Number(p.slot) - 1] || ('槽' + p.slot), value: Number(p.value) || 0, slot: p.slot };
        }).sort(function (a, b) { return b.value - a.value; }).slice(0, 2);
      }
      var POSITION_ZONES = {
        '控卫': { zone: '三分线外', note: '控卫常态落位：三分线外（zone1）' },
        '分卫': { zone: '三分线内一步', note: '分卫常态落位：三分线内一步（zone2）' },
        '小前': { zone: '三分线内更近罚球区', note: '小前常态落位：三分线内、靠近罚球区（zone3）' },
        '大前': { zone: '罚球区附近 / 三秒区边缘', note: '大前常态落位：罚球区外再进一步、靠近三秒区（zone4）' },
        '中锋': { zone: '禁区内（三秒区）', note: '中锋常态落位：三秒区内（zone5）' }
      };
      var ZONE_CARDS = {
        '三分线外': { tech: '三分', power: '横撤', speed: '突破' },
        '三分线内一步': { tech: '中投', power: '后撤', speed: '突破' },
        '三分线内更近罚球区': { tech: '中投', power: '强突', speed: '突破' },
        '罚球区附近 / 三秒区边缘': { tech: '中投', power: '上篮', speed: '突破', near: { tech: '勾手', power: '上篮', speed: '背打' }, nearNote: '再靠近罚球区 → 勾手 / 上篮 / 背打' },
        '禁区内（三秒区）': { tech: '勾手', power: '扣篮', speed: '无（禁区内没有速卡）' }
      };
      function positionZone(character) {
        return POSITION_ZONES[posBase(character.role)] || null;
      }
      function zoneCards(character) {
        var z = positionZone(character);
        if (!z) return null;
        return { zone: z, cards: ZONE_CARDS[z.zone] || null };
      }
      function positionCardTypes(character) {
        var zc = zoneCards(character);
        if (!zc || !zc.cards) return [];
        return [
          { label: '技卡', name: zc.cards.tech },
          { label: '力卡', name: zc.cards.power },
          { label: '速卡', name: zc.cards.speed }
        ];
      }
      function defenseAdvice(character) {
        var pos = posBase(character.role);
        var mean = positionMeanHeight();
        var diff = character.heightCm != null && mean[pos] != null ? Number(character.heightCm) - mean[pos] : null;
        if (pos === '大前' || pos === '中锋') {
          return { core: '盯防', secondary: diff != null && diff >= 2 ? '盖帽（身高优势）' : '篮板 / 卡位', diff: diff,
            reason: '内线大部分靠背打/内线进攻，抢断对这类动作效果差；以盯防为核心更稳，身高有优势时可补盖帽。' };
        }
        if (diff != null && diff >= 2) {
          return { core: '盖帽', secondary: '抢断（对位传球类技能）', diff: diff,
            reason: '外线但有身高优势 → 盖帽对位「投射类」技能更有效（上篮也可以被盖）。' };
        }
        return { core: '抢断', secondary: '盖帽（对位投射类技能）', diff: diff,
          reason: '外线且身高不占优 → 抢断对位「传球类」技能更有效；盖帽只作副选。' };
      }
      function skillsDetailHtml(character) {
        var skills = Array.isArray(character.skills) ? character.skills : [];
        if (!skills.length) return '<div class="player-missing">技能数据待补</div>';
        return '<div class="player-skills">' + skills.map(function (s) {
          var descs = (s.levels || []).map(function (lv) { return lv.desc; }).filter(Boolean);
          var full = descs.length ? descs.join('\n') : (s.summary || '');
          return '<div class="player-skill"><div class="player-skill-head"><strong>' + esc(s.name) + '</strong>' +
            (s.type ? '<span class="tag">' + esc(s.type) + '</span>' : '') + '</div>' +
            '<div class="small muted">' + esc(s.summary || '') + '</div>' +
            (full && full !== s.summary ? '<details style="margin-top:4px"><summary class="tiny" style="cursor:pointer">完整技能说明</summary><div class="small muted" style="white-space:pre-wrap">' + esc(full) + '</div></details>' : '') +
            '</div>';
        }).join('') + '</div>';
      }
      function charNotesHtml(character) {
        var CN = root.BBTCharNotes;
        if (!CN || !CN.notes) return '';
        var list = CN.notes[character.name];
        if (!list || !list.length) return '';
        var meta = CN.meta || {};
        var items = list.map(function (n) {
          var head = '<div class="char-note-head">' +
            '<span class="char-note-author">' + esc(n.author || meta.author || '') + '</span>' +
            (n.date ? '<span class="char-note-date">' + esc(n.date) + '</span>' : '') +
            (n.tag ? '<span class="badge badge--neutral">' + esc(n.tag) + '</span>' : '') +
            '</div>';
          var basis = n.basis ? '<div class="char-note-basis small muted">依据：' + esc(n.basis) + '</div>' : '';
          return '<div class="char-note">' + head + '<div class="char-note-text">' + esc(n.text) + '</div>' + basis + '</div>';
        }).join('');
        return '<div class="card card--pad" id="player-char-notes">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">💬</span>评论区</div>' +
          '<div class="card-sub">' + esc(meta.source || '讨论记录') + '</div></div>' +
          '<span class="badge badge--neutral">' + esc(meta.author || '') + '</span></div>' +
          items + '</div>';
      }

      function listHtml() {
        var list = filteredCharacters();
        if (!list.length) {
          return '<div class="notice notice--info" style="margin:10px 0"><span class="notice-ico">🔍</span><span>没有匹配的球员，试试更换筛选条件。</span></div>';
        }
        return list
          .map(function (c) {
            var note = noteOf(c);
            var active = String(c.contentId) === String(selectedId);
            var owned = ctx.isOwned ? ctx.isOwned(c.contentId) : true;
            var portrait = c.portrait
              ? '<img class="player-avatar-img" src="' + esc(c.portrait) + '" alt="' + esc(c.name) + '" loading="lazy" onerror="this.style.display=\'none\'">'
              : '';
            var rank = c.derived && c.derived.positionRank ? ' · ' + posBase(c.role) + '#' + c.derived.positionRank.rank : '';
            return (
              '<button type="button" class="player-item player-card' + (active ? ' is-active' : '') + '" data-char-id="' + esc(c.contentId) + '" aria-pressed="' + active + '" style="display:flex;flex-direction:column;align-items:stretch;text-align:left;min-width:0">' +
              '<span class="player-avatar">' +
              '<span class="player-avatar-fallback">' + esc(String(c.name).replace(/[\s·]/g, '').slice(0, 1)) + '</span>' +
              portrait +
              '</span>' +
              '<span class="player-item-main">' +
              '<span class="player-item-name">' + esc(c.name) +
              (owned ? '' : ' <span class="tag" title="未拥有">未拥有</span>') +
              '</span>' +
              '<span class="player-item-meta">' + esc(c.rarity || '—') + ' · ' + esc(c.role || '—') + esc(rank) +
              '</span>' +
              '<span class="player-item-meta" style="color:var(--text-2)">推荐：' + (recommendedAttrs(c).map(function (a) { return esc(a.name); }).join(' / ') || '—') + '</span>' +
              '</span>' +
              (note
                ? '<span class="player-item-note" title="已记录笔记：' + esc(note.updatedAt || '') + '">' +
                  starsText(note.stars) + ' 已记录</span>'
                : '') +
              '</button>'
            );
          })
          .join('');
      }

      function renderList() {
        var host = dom.qs('#player-list', el);
        if (!host) return;
        host.innerHTML = listHtml();
        var count = dom.qs('#player-list-count', el);
        if (count) count.textContent = filteredCharacters().length + ' / ' + characters.length;
      }

      /* ---------------- 详情 ---------------- */
      function statBarsHtml(stats) {
        if (!stats) return '<div class="player-missing">六维数据待补</div>';
        var max = 0;
        A_KEYS.forEach(function (k) {
          max = Math.max(max, Number(stats[k]) || 0);
        });
        max = Math.max(max, 1);
        return (
          '<div class="player-stat-grid">' +
          A_KEYS.map(function (k) {
            var v = Number(stats[k]);
            var pct = isFinite(v) ? Math.round((v / max) * 100) : 0;
            return (
              '<div class="player-stat-cell">' +
              '<div class="player-stat-top"><span>' + esc(k) + '</span><strong class="num">' +
              (isFinite(v) ? v : '—') + '</strong></div>' +
              '<div class="player-stat-bar"><span style="width:' + pct + '%"></span></div>' +
              '</div>'
            );
          }).join('') +
          '</div>'
        );
      }

      function potentialHtml(potentials) {
        var list = Array.isArray(potentials) ? potentials : [];
        if (!list.length) return '<div class="player-missing">潜力数据待补</div>';
        var sum = 0;
        list.forEach(function (p) { sum += Number(p.value) || 0; });
        return (
          '<div class="player-potential-row">' +
          list.map(function (p) {
            return (
              '<div class="player-potential"><span class="p-slot">' + esc(A_KEYS[Number(p.slot) - 1] || ('槽' + p.slot)) + '</span>' +
              '<strong class="num">' + (p.value == null ? '—' : esc(p.value)) + '</strong></div>'
            );
          }).join('') +
          '<div class="player-potential-total"><span>潜力总和</span><strong class="num">' + sum + '</strong></div>' +
          '</div>'
        );
      }

      function starPickerHtml(note, draft) {
        var current = draft && draft.stars != null ? draft.stars : note && note.stars;
        var buttons = '';
        for (var i = 1; i <= 5; i++) {
          buttons +=
            '<button type="button" class="note-star' + (current != null && i <= current ? ' is-on' : '') +
            '" data-note-star="' + i + '" aria-label="' + i + ' 星">★</button>';
        }
        return '<div class="note-stars" role="group" aria-label="我的评分">' + buttons +
          '<span class="note-stars-label">' + (current ? current + ' 星' : '未评分') + '</span></div>';
      }

      function tagPickerHtml(note, draft) {
        var tags = draft && draft.tags.length ? draft.tags : (note && note.tags) || [];
        return (
          '<div class="note-tags">' +
          NOTE_TAGS.map(function (tag) {
            var on = tags.indexOf(tag) >= 0;
            return '<button type="button" class="note-tag' + (on ? ' is-on' : '') +
              '" data-note-tag="' + esc(tag) + '" aria-pressed="' + on + '">' + esc(tag) + '</button>';
          }).join('') +
          '</div>'
        );
      }

      function notesEditorHtml(character) {
        var note = noteOf(character);
        var draft = state.draft;
        if (!draft || draft.id !== String(character.contentId)) {
          draft = state.draft = {
            id: String(character.contentId),
            stars: note ? note.stars : null,
            tags: note && Array.isArray(note.tags) ? note.tags.slice() : [],
            text: note ? note.text || '' : ''
          };
        }
        return (
          '<div class="card card--pad player-notes" id="player-notes">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">📝</span>我的笔记</div>' +
          '<div class="card-sub">记录你实战中对这名球员的评价；每名球员独立保存，刷新/重开仍在。</div></div>' +
          (note ? '<span class="badge badge--ok">已记录</span>' : '<span class="badge badge--neutral">未记录</span>') + '</div>' +
          '<div class="player-note-grid">' +
          '<div class="field"><div class="field-label"><span class="label-text">评分（1~5 星）</span></div>' +
          starPickerHtml(note, draft) + '</div>' +
          '<div class="field"><div class="field-label"><span class="label-text">标签（可多选）</span></div>' +
          tagPickerHtml(note, draft) + '</div>' +
          '</div>' +
          '<div class="field"><label class="field-label" for="player-note-text"><span class="label-text">自由文本</span>' +
          '<span class="small muted">最多 2000 字</span></label>' +
          '<textarea class="input player-note-text" id="player-note-text" rows="4" maxlength="2000" placeholder="例如：对位 XX 时手感很好；防守端换防慢，建议配…">' +
          esc(draft.text || (note && note.text) || '') + '</textarea></div>' +
          '<div class="row" style="gap:8px;margin-top:12px;flex-wrap:wrap">' +
          '<button type="button" class="btn btn--primary btn--sm" id="player-note-save">保存笔记</button>' +
          '<button type="button" class="btn btn--sm" id="player-note-delete"' + (note ? '' : ' disabled') + '>删除笔记</button>' +
          '<button type="button" class="btn btn--sm btn--ghost" id="player-notes-export">导出我的笔记</button>' +
          '<span class="small muted" id="player-note-updated">' +
          (note && note.updatedAt ? '上次更新：' + esc(String(note.updatedAt).slice(0, 19).replace('T', ' ')) : '尚未记录') +
          '</span>' +
          '</div></div>'
        );
      }

      function talentsHtml(character) {
        var d = character.derived;
        if (!d) return '<div class="player-missing">天赋路线数据待补（derived_roster 未匹配到该球员）</div>';
        var sections = [];
        if (d.knownStreamTalents && d.knownStreamTalents.length) {
          sections.push(
            '<div class="player-sub"><div class="player-sub-title">已知流派天赋</div>' +
            d.knownStreamTalents.map(function (t) {
              return '<div class="player-talent"><strong>' + esc(t.talent || t.name) + '</strong>' +
                (t.category ? '<span class="tag">' + esc(t.category) + '</span>' : '') +
                (t.note ? '<div class="small muted">' + esc(t.note) + '</div>' : '') + '</div>';
            }).join('') + '</div>'
          );
        }
        if (d.trainingTalents && d.trainingTalents.length) {
          sections.push(
            '<div class="player-sub"><div class="player-sub-title">训练天赋</div>' +
            d.trainingTalents.map(function (t) {
              return '<div class="player-talent"><strong>' + esc(t.talent) + '</strong>' +
                (t.category ? '<span class="tag">' + esc(t.category) + '</span>' : '') +
                (t.note ? '<div class="small muted">' + esc(t.note) + '</div>' : '') + '</div>';
            }).join('') + '</div>'
          );
        }
        if (d.streamRoles && d.streamRoles.length) {
          sections.push(
            '<div class="player-sub"><div class="player-sub-title">流派匹配（derived stream_roles）</div>' +
            d.streamRoles.map(function (r) {
              return '<div class="player-talent"><strong>' + esc(r.stream) + '</strong>' +
                '<div class="small muted">冲极顺序：' + esc((r.pickOrder || []).join(' → ')) + '</div></div>';
            }).join('') + '</div>'
          );
        }
        var metaBits = [];
        if (d.communityTrainingTier && d.communityTrainingTier.tier) {
          metaBits.push('训练强度榜：' + d.communityTrainingTier.tier);
        }
        if (d.positionTemplate && d.positionTemplate.name) metaBits.push('位置模板：' + d.positionTemplate.name);
        if (d.rosterRank) metaBits.push('综合排名：#' + d.rosterRank);
        if (metaBits.length) {
          sections.push('<div class="small muted" style="margin-top:8px">' + esc(metaBits.join(' · ')) + '</div>');
        }
        if (!sections.length) {
          sections.push(
            '<div class="player-missing">待补充：该球员暂未录入天赋路线（known_stream_talents / training_talents / stream_roles 均无匹配）。</div>'
          );
        }
        return sections.join('');
      }

      function skillsHtml(character) {
        var skills = Array.isArray(character.skills) ? character.skills : [];
        if (!skills.length) return '<div class="player-missing">技能数据待补</div>';
        return (
          '<div class="player-skills">' +
          skills.map(function (s) {
            return '<div class="player-skill"><div class="player-skill-head"><strong>' + esc(s.name) + '</strong>' +
              (s.type ? '<span class="tag">' + esc(s.type) + '</span>' : '') + '</div>' +
              '<div class="small muted">' + esc(s.summary || '') + '</div></div>';
          }).join('') + '</div>'
        );
      }

      function detailHtml(character) {
        var d = character.derived || {};
        var rank = d.positionRank
          ? posBase(character.role) + ' #' + d.positionRank.rank + ' / ' + d.positionRank.total
          : '—';
        var summary = d.roleSummary ? '<div class="small muted" style="margin-top:4px">' + esc(d.roleSummary) + '</div>' : '';
        var header =
          '<div class="player-head card card--pad">' +
          '<div class="player-head-main">' +
          '<span class="player-avatar player-avatar--lg">' +
          '<span class="player-avatar-fallback">' + esc(String(character.name).replace(/[\s·]/g, '').slice(0, 1)) + '</span>' +
          (character.portrait ? '<img class="player-avatar-img" src="' + esc(character.portrait) + '" alt="' + esc(character.name) + '" onerror="this.style.display=\'none\'">' : '') +
          '</span>' +
          '<div>' +
          '<div class="player-name-row"><h2 class="player-name">' + esc(character.name) + '</h2>' +
          (character.title ? '<span class="tag tag--orange">' + esc(character.title) + '</span>' : '') +
          '<span class="badge badge--ok">' + esc(character.rarity || '—') + '</span>' +
          '<span class="badge badge--info">' + esc(character.role || '—') + '</span></div>' +
          '<div class="player-meta">' +
          (character.style ? '<span>风格 ' + esc(character.style) + '</span>' : '') +
          '<span>学校 ' + esc(character.school || '—') + '</span>' +
          (character.heightCm != null ? '<span>身高 ' + esc(character.heightCm) + 'cm</span>' : '') +
          (character.weightKg != null ? '<span>体重 ' + esc(character.weightKg) + 'kg</span>' : '') +
          (character.spanCm != null ? '<span>臂展 ' + esc(character.spanCm) + 'cm</span>' : '') +
          '<span>位置排名 ' + esc(rank) + '</span>' +
          '</div>' +
          summary +
          '</div></div></div>';


        var growth =
          '<div class="card card--pad" id="player-growth">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🌱</span>成长方向 · 推荐属性 · 六维</div>' +
          '<div class="card-sub">推荐属性=潜力最高两项；六维为 A层满级(120)数值（wiki 面板按实机键位映射，闪堂 6/6 验证）。</div></div>' +
          '<span class="badge badge--ok">培养重点</span></div>' +
          (function () {
            var attrs = recommendedAttrs(character);
            var fulls = aLayerStats(character);
            var pots = Array.isArray(character.potentials) ? character.potentials : [];
            return '<div class="row" style="gap:8px;flex-wrap:wrap">' +
              (attrs.length ? attrs.map(function (a) {
                return '<span class="tag tag--orange" style="font-size:14px">推荐：' + esc(a.name) + ' · 潜力 ' + esc(a.value) + '</span>';
              }).join('') : '<span class="muted small">潜力数据待补</span>') + '</div>' +
              '<div class="player-stat-grid" style="margin-top:10px">' +
              A_KEYS.map(function (k) {
                var v = fulls[k];
                var pv = pots[A_KEYS.indexOf(k)] ? pots[A_KEYS.indexOf(k)].value : null;
                return '<div class="player-stat-cell"><div class="player-stat-top"><span>' + esc(k) + '</span><strong class="num">' + (v == null ? '—' : esc(v)) + '</strong></div>' +
                  '<div class="small muted">潜力 ' + (pv == null ? '—' : esc(pv)) + '</div></div>';
              }).join('') +
              '</div>' +
              '<div class="small muted" style="margin-top:6px">A层六维：投射/弹跳/防守/体能/运控/意识；推荐属性由潜力最高两项决定（1 级数值受天赋树影响，不再推算）。</div>';
          })() +
          '</div>';
        var defense =
          '<div class="card card--pad" id="player-defense">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🛡️</span>防守手段建议</div>' +
          '<div class="card-sub">由身体数据（身高）+ 位置决定：内线盯防优先；外线按身高优势选盖帽/抢断。</div></div>' +
          '<span class="badge badge--info">身高/位置推导</span></div>' +
          (function () {
            var adv = defenseAdvice(character);
            return '<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:6px">' +
              '<span class="badge badge--ok">核心：' + esc(adv.core) + '</span>' +
              '<span class="badge badge--neutral">副选：' + esc(adv.secondary) + '</span>' +
              (adv.diff != null ? '<span class="badge badge--info">身高 vs 同位置均值 ' + (adv.diff >= 0 ? '+' : '') + esc(adv.diff.toFixed(1)) + 'cm</span>' : '') +
              '</div><div class="small muted" style="margin-top:6px">' + esc(adv.reason) + '</div>';
          })() +
          '</div>';
        var positionCards =
          '<div class="card card--pad" id="player-position-cards">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🃏</span>位置技能卡类型（按常态落位区）</div>' +
          '<div class="card-sub">基础卡不跟位置绑定，跟「球员当前球场相对位置」绑定；位置只决定常态落位区。角色技能/器材技能不算在这里。</div></div>' +
          '<span class="badge badge--neutral">' + esc(posBase(character.role)) + '</span></div>' +
          (function () {
            var zc = zoneCards(character);
            if (!zc || !zc.cards) return '<div class="player-missing">位置/落位数据待补</div>';
            function chip(label, name) {
              return '<span class="tag tag--orange">' + esc(label) + ' · ' + esc(name) + '</span>';
            }
            return '<div class="small" style="margin-top:6px"><strong>常态落位区：</strong>' + esc(zc.zone.zone) + '<span class="tiny muted">（' + esc(zc.zone.note) + '）</span></div>' +
              '<div class="row" style="gap:6px;flex-wrap:wrap;margin-top:6px">' +
              chip('技卡', zc.cards.tech) + chip('力卡', zc.cards.power) + chip('速卡', zc.cards.speed) +
              '</div>' +
              (zc.cards.near ? '<div class="tiny muted" style="margin-top:4px">' + esc(zc.cards.nearNote) + '：技卡 ' + esc(zc.cards.near.tech) + ' / 力卡 ' + esc(zc.cards.near.power) + ' / 速卡 ' + esc(zc.cards.near.speed) + '</div>' : '') +
              '<div class="small muted" style="margin-top:6px">防守环节常见卡：<strong>盖帽 / 盯防 / 抢断</strong>（具体以哪个为核心见「防守手段建议」）。</div>' +
              '<div class="small muted" style="margin-top:4px">位移类技能（突破/强突/横撤/后撤/背打）可改变当前落位区，从而换出别的区域基础卡；例如大前（野上）常态在罚球区附近，直接出不了三分，需要带「后撤」等位移技能退到三分线外，才能出三分/横撤/突破。</div>' +
              '<div class="small muted" style="margin-top:4px">学习器材技能后，它会和大招一样作为额外选卡进入 AI 选卡：看破对方时优先选克制卡；没看破则优先综合属性最高。</div>';
          })() +
          '<details style="margin-top:8px"><summary class="small" style="cursor:pointer">行动判定参考（大成功/成功/失败；来自比赛机制记录）</summary>' +
          '<div class="small muted" style="margin-top:4px;white-space:pre-wrap">所有进攻方式都有 大成功/成功/失败 三种局面；大成功也一定会被轻微干扰（除非空位）。\n· 投篮：大成功=轻微干扰；成功=常规干扰；失败=严重干扰/被盖/被抢断。\n· 突破/强突/撤步：大成功=空位出手；成功=可能空位/干扰/吸引包夹；失败=停球（严重干扰/被盖/被抢断/传球）。\n· 背打：大成功=把对面撞倒→进内线空位出手；成功=防守没倒→大概率勾手终结（一定被干扰）；失败=严重干扰/被盖/被抢断。\n· 上篮/扣篮：大成功=轻微干扰；成功=干扰；失败=严重干扰。\n· 位移技能大成功→制造空位，空位出手命中≈100%。\n来源：knowledge/比赛机制_攻防回合.md §8（用户口述 + 客户端枚举验证）。</div></details>' +
          '</div>';
        var level1 =
          '<div class="card card--pad" id="player-level1">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">📊</span>基本面板（1 级参考）</div>' +
          '<div class="card-sub">图鉴参考值：映射自 wiki 面板（投射/攻筐/防投/护筐/传球/突破）→ A层 投射/弹跳/防守/体能/运控/意识；<strong>闪堂电 120 级实机 6/6 完全吻合</strong>（201/224/172/167/233/196）；满级来自 wiki 面板，非实测种子面板。</div></div>' +
          '<span class="badge badge--warn">参考值</span></div>' +
          statBarsHtml(aLayerStats(character)) +
          '<div class="section-label" style="margin-top:14px">6 槽潜力</div>' +
          potentialHtml(character.potentials) +
          '<div class="small muted" style="margin-top:8px">' +
          esc(character.referencePanelNote || '满级六维来自 wiki 面板，非实测种子面板') +
          (d.attributeSum ? ' · 六维总和 ' + esc(d.attributeSum) : '') +
          (d.potentialSum ? ' · 潜力总和 ' + esc(d.potentialSum) : '') +
          '</div></div>';

        var maxLevel =
          '<div class="card card--pad" id="player-maxlevel">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">📈</span>满级养成数据</div>' +
          '<div class="card-sub">LV90 面板 / 满级评分 / 成长率 / 局外加成。</div></div>' +
          '<span class="badge badge--warn">数据待补</span></div>' +
          (character.maxLevel
            ? '<div class="player-missing">已录入满级样本（待展示）</div>'
            : '<div class="notice notice--info"><span class="notice-ico">🧩</span><span>' +
              '<strong>待补：</strong>需要 LV90 面板 / 评分样本。当前不虚构数值，字段已预留：' +
              'LV90 六维、满级评分、成长率、局外加成。</span></div>' +
              '<div class="player-placeholder-grid">' +
              ['LV90 六维', '满级评分', '成长率', '局外加成'].map(function (label) {
                return '<div class="player-placeholder-cell"><span>' + label + '</span><strong>待补</strong></div>';
              }).join('') +
              '</div>' +
              '<div class="small muted" style="margin-top:8px">来源：图鉴·社区；白神实测面板样本尚未录入（referencePanelSample = null）。</div>') +
          '</div>';

        var talents =
          '<div class="card card--pad" id="player-talents">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🧬</span>天赋路线</div>' +
          '<div class="card-sub">来自 derived_roster 的 known_stream_talents / training_talents / stream_roles。</div></div>' +
          '<span class="badge badge--neutral">派生数据</span></div>' +
          talentsHtml(character) + '</div>';

        var events =
          '<div class="card card--pad" id="player-events">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🎬</span>专属事件 & 最优解攻略</div>' +
          '<div class="card-sub">角色专属事件效果与推荐选项。</div></div>' +
          '<span class="badge badge--warn">数据待补</span></div>' +
          '<div class="notice notice--info"><span class="notice-ico">🧩</span><span>' +
          '暂无系统数据：专属事件触发条件 / 效果 / 最优选尚未收集，页面显示占位不虚构；' +
          '数据结构已预留 <span class="inline-code">events: []</span>。</span></div>' +
          '<div class="player-placeholder-grid">' +
          ['事件名称', '触发条件', '效果文本', '最优解选项'].map(function (label) {
            return '<div class="player-placeholder-cell"><span>' + label + '</span><strong>待补</strong></div>';
          }).join('') +
          '</div></div>';

        var skills =
          '<div class="card card--pad" id="player-skills">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">✨</span>技能</div>' +
          '<div class="card-sub">固定技能 / 额外技能（图鉴原文）。</div></div>' +
          '<span class="badge badge--neutral">图鉴</span></div>' +
          skillsDetailHtml(character) + '</div>';

        var duty = '';
        if (character.positionDuty && character.positionDuty.length) {
          duty =
            '<div class="card card--pad" id="player-position">' +
            '<div class="card-head"><div><div class="card-title"><span class="ico">🎛️</span>赛制主题效果（比赛附加效果）</div>' +
            '<div class="card-sub">来源 res19「match_addition_effect（比赛附加效果）」· 仅在对应主题/赛制生效，<strong>不是角色位置基础效果</strong>。</div></div>' +
            '<span class="badge badge--warn">主题效果 · 非位置效果</span></div>' +
            '<div class="notice notice--info" style="margin-top:6px"><span class="notice-ico">📌</span><span class="small">' +
            '这些文案确实是客户端原文（含颜色/尺寸标记），但属于「比赛附加/主题效果」里的职责/适性加成；之前页面把它标成「位置参考」会让人误以为每个位置永久获得这些效果，已更正。' +
            '</span></div>' +
            '<ul class="player-duty-list" style="margin-top:6px">' +
            character.positionDuty.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') +
            '</ul></div>';
        }

        return (
          '<div class="player-detail-inner">' +
          header +
          growth +
          '<div class="grid grid--2" style="align-items:start">' + defense + positionCards + '</div>' +
          '<div class="grid grid--2" style="align-items:start">' + skills + '</div>' +
          charNotesHtml(character) +
          notesEditorHtml(character) +
          '</div>'
        );
      }

      function renderDetail() {
        var host = dom.qs('#player-detail', el);
        if (!host) return;
        var character = getSelected();
        if (!character) {
          host.innerHTML = '<div class="notice notice--warn"><span class="notice-ico">👤</span><span>先在左侧选择一名球员。</span></div>';
          return;
        }
        host.innerHTML = detailHtml(character);
      }

      function bindDraftFromNote(character) {
        var note = noteOf(character);
        state.draft = {
          id: String(character.contentId),
          stars: note ? note.stars : null,
          tags: note && Array.isArray(note.tags) ? note.tags.slice() : [],
          text: note ? note.text || '' : ''
        };
      }

      function selectCharacter(id, persist) {
        if (!byId[String(id)]) return;
        if (String(selectedId) === String(id)) return;
        selectedId = String(id);
        bindDraftFromNote(byId[selectedId]);
        if (persist) {
          ui.selectedCharacter = selectedId;
          if (ctx.save) ctx.save();
          setHashChar(selectedId);
        }
        renderList();
        renderDetail();
      }

      function refreshAfterNote(message) {
        bindDraftFromNote(getSelected());
        renderList();
        renderDetail();
        if (ctx.toast) ctx.toast(message, 'ok');
      }

      /* ---------------- 初始化选中 ---------------- */
      var initial = hashCharId() || (ui.selectedCharacter != null ? String(ui.selectedCharacter) : null);
      if (!initial || !byId[initial]) {
        var pool = characters.filter(function (c) { return !ctx.isOwned || ctx.isOwned(c.contentId); });
        initial = String((pool[0] || characters[0]).contentId);
      }
      selectedId = initial;
      bindDraftFromNote(byId[selectedId]);

      el.innerHTML =
        '<div class="player-layout">' +
        '<aside class="player-side card card--pad">' +
        '<div class="player-side-head"><div class="card-title"><span class="ico">👥</span>角色图鉴（卡片墙）</div>' +
        '<span class="badge badge--neutral" id="player-list-count">' + characters.length + ' / ' + characters.length + '</span></div>' +
        '<div class="player-filters">' +
        '<div class="search-wrap" style="height:36px"><span class="search-ico">🔍</span>' +
        '<input class="search-input" id="player-search" type="search" placeholder="搜索球员名字…"></div>' +
        '<div class="row" style="gap:8px;flex-wrap:wrap">' +
        '<select class="select" id="player-filter-position">' +
        POSITIONS.map(function (p) { return '<option value="' + esc(p) + '">' + (p === '全部' ? '全部位置' : p) + '</option>'; }).join('') +
        '</select>' +
        '<select class="select" id="player-filter-rarity">' +
        RARITIES.map(function (r) { return '<option value="' + esc(r) + '">' + (r === '全部' ? '全部稀有度' : r) + '</option>'; }).join('') +
        '</select>' +
        '<select class="select" id="player-sort">' +
        SORTS.map(function (s) { return '<option value="' + esc(s.id) + '">' + esc(s.label) + '</option>'; }).join('') +
        '</select>' +
        '</div></div>' +
        '<div class="player-list" id="player-list" role="listbox" aria-label="球员列表" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;max-height:none"></div>' +
        '</aside>' +
        '<section class="player-main" id="player-detail"></section>' +
        '</div>' +
        (BBT.OfficialWidgets
          ? '<div class="stack" style="gap:16px;margin-top:16px" id="official-appendix">' +
            BBT.OfficialWidgets.attributesHtml() + BBT.OfficialWidgets.battleHtml() + BBT.OfficialWidgets.gachaHtml() +
            '</div>'
          : '');

      renderList();
      renderDetail();
      if (BBT.OfficialWidgets) BBT.OfficialWidgets.mountGacha(el);

      var search = dom.qs('#player-search', el);
      if (search) {
        search.addEventListener('input', function () {
          listState.search = search.value || '';
          renderList();
        });
      }
      function bindSelect(id, key) {
        var node = dom.qs('#' + id, el);
        if (!node) return;
        node.addEventListener('change', function () {
          listState[key] = node.value;
          renderList();
        });
      }
      bindSelect('player-filter-position', 'position');
      bindSelect('player-filter-rarity', 'rarity');
      bindSelect('player-sort', 'sort');

      dom.delegate(el, '[data-char-id]', 'click', function (event, target) {
        selectCharacter(target.getAttribute('data-char-id'), true);
      });

      dom.delegate(el, '[data-note-star]', 'click', function (event, target) {
        var v = Number(target.getAttribute('data-note-star'));
        var ch = getSelected();
        if (!ch || !state.draft) return;
        state.draft.stars = state.draft.stars === v ? null : v;
        var picker = dom.qs('#player-notes .note-stars', el);
        if (picker) picker.innerHTML = starPickerHtml(null, state.draft);
      });
      dom.delegate(el, '[data-note-tag]', 'click', function (event, target) {
        var tag = target.getAttribute('data-note-tag');
        if (!state.draft) return;
        var idx = state.draft.tags.indexOf(tag);
        if (idx >= 0) state.draft.tags.splice(idx, 1);
        else state.draft.tags.push(tag);
        var on = state.draft.tags.indexOf(tag) >= 0;
        target.classList.toggle('is-on', on);
        target.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      dom.delegate(el, '#player-note-save', 'click', function () {
        var ch = getSelected();
        if (!ch || !store) return;
        var textArea = dom.qs('#player-note-text', el);
        store.setCharacterNote(ch.contentId, {
          stars: state.draft ? state.draft.stars : null,
          tags: state.draft ? state.draft.tags : [],
          text: textArea ? textArea.value || '' : ''
        });
        refreshAfterNote('笔记已保存：' + ch.name);
      });
      dom.delegate(el, '#player-note-delete', 'click', function () {
        var ch = getSelected();
        if (!ch || !store) return;
        store.deleteCharacterNote(ch.contentId);
        refreshAfterNote('已删除 ' + ch.name + ' 的笔记');
      });
      dom.delegate(el, '#player-notes-export', 'click', function () {
        if (!store) return;
        var json = JSON.stringify(store.exportNotes(), null, 2);
        var m = dom.modal({
          title: '导出我的笔记',
          subtitle: '每名球员一条记录；可用「导入用户配置」或 store.importNotes 恢复',
          bodyHtml:
            '<textarea class="formula-box" readonly style="width:100%;height:300px;font-family:var(--font-mono);font-size:12px">' +
            esc(json) + '</textarea>' +
            '<div class="row" style="margin-top:12px"><button class="btn btn--sm btn--primary" id="copy-notes">复制到剪贴板</button></div>',
          width: 720
        });
        var btn = m.body.querySelector('#copy-notes');
        if (btn) {
          btn.addEventListener('click', function () {
            dom.copyText(json).then(function (ok) {
              if (ctx.toast) ctx.toast(ok ? '已复制笔记 JSON' : '复制失败，请手动复制', ok ? 'ok' : 'warn');
            });
          });
        }
      });
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

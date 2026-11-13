/*!
 * views/battle.js —— 实战配装（tab id: battle，5 页中的第 3 页，排在「养成配队」之后）
 *
 * 顶部三步：
 *   ① 选角色：38 名角色按钮网格 + 搜索框（姓名/类型/稀有度过滤）
 *   ② 选位置：5 个位置按钮，每个显示该角色该位置的星级与「官方位」角标；默认=官方最佳位（best_duty）
 *   ③ 结果：
 *      - 星级大标题（★★★★☆）+「第 X/38」+ 位置适配理由；
 *      - 类型判定（7 类之一 + 标签 + 判定依据 + 该类技能需求）；
 *      - 官方定位（官方位置/最佳位/风格/称号/身高体重/优劣势/球探报告摘要折叠）；
 *      - 位置卡池（attackCards + 选卡区域）；
 *      - 技能补强清单（needs：补强项/定位/为什么补）；
 *      - 器材推荐（4~5 件：名称/q-r/技能名/技能效果/ptCost/定位/推荐理由，最后一件「战术位」高亮）。
 * 参考数据折叠区：38×5 星级矩阵 / 7 类型判定总表 / 位置卡池规则 / 器材技能分类速查 / 计算口径与来源。
 *
 * 数据：tool/src/data/battle.js（tool/scripts/build-battle.mjs 从 data/structured/battle_loadout_v3.json 等生成）
 * 离线约束：普通 <script>、无 fetch / ES module / CDN / 外部字体图片；事件全部委托，无内联 onclick。
 * 口径：星级 = 相对全 38 人池的位置适配排序（非绝对强度）；类型/补强/器材推荐 = 规则推导；
 *       器材技能 descIncomplete=true（31xxx 模板占位）只显示「动作类·无逐字文案」，不编造效果。
 */
(function (root) {
  'use strict';
  var BBT = (root.BBT = root.BBT || {});
  var views = (BBT.views = BBT.views || {});
  var dom = BBT.dom;

  var DEFAULT_POSITIONS = ['控卫', '分卫', '小前', '大前', '中锋'];

  function esc(v) {
    return dom.esc(v == null ? '' : String(v));
  }

  /** 5 星字符串：★★★☆☆ */
  function starText(n) {
    var v = Math.max(0, Math.min(5, Number(n) || 0));
    var out = '';
    for (var i = 0; i < 5; i += 1) out += i < v ? '★' : '☆';
    return out;
  }

  function numText(v) {
    return v == null || v === '' ? '—' : String(v);
  }

  function kv(label, valueHtml) {
    return (
      '<div><div class="tiny muted">' + esc(label) + '</div>' +
      '<div class="small strong">' + valueHtml + '</div></div>'
    );
  }

  function listHtml(items) {
    if (!items || !items.length) return '<div class="tiny muted">—</div>';
    return '<ul class="small" style="margin:4px 0 0 18px;line-height:1.7">' +
      items.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>';
  }

  function roleBadge(role) {
    var r = String(role || '');
    var tone = r.indexOf('战术') >= 0 ? 'warn' : r.indexOf('核心') >= 0 ? 'risk' : r.indexOf('协同') >= 0 ? 'info' : 'neutral';
    return '<span class="badge badge--' + tone + '">' + esc(r || '—') + '</span>';
  }

  views.battle = {
    id: 'battle',
    nav: '实战',
    icon: '⚔',
    title: '实战配装',
    subtitle:
      '选角色 → 选位置 → 得到该格的位置适配星级与理由、7 类类型判定、官方定位、位置卡池、技能补强清单、战术适配，以及完整的器材 T 表（T0 最推荐 → T4 最不推荐，按已有器材取用；支援口哨固定 T0）。数据 = V3.1 实战规则推导，非官方数值；体格=PC res19 当前 live 数据。',
    dataNote:
      '本页来源：data/structured/battle_loadout_v3.json（V3.1 规则推导：38×5 星级/理由 + 技能补强 + 战术适配 + 定位配置 + 75 件器材库）· equipment_tier_lists.json（器材 T 表）· position_fit_v3.json（星级计算口径，参数来自 fit_model_config.json）· body_metrics_res19.json（身高/体重/臂展=PC res19 live）· character_types_v3.json（7 类判定）· 技能原文=客户端比赛技能表；星级=相对全 38 人池排序（非绝对强度），战术位=位置×类型适配才带（2026-11-09 实机口径），器材技能 31xxx 模板占位仅按名称归类，不编造效果。',
    mount: function (el, ctx) {
      var data = root.BBTBattleData || (BBT && BBT.battleData) || null;
      if (!data || !Array.isArray(data.characters) || !data.characters.length) {
        el.innerHTML =
          '<div class="notice notice--warn"><span class="notice-ico">⚔</span><span>' +
          '未找到实战数据，请运行 <span class="inline-code">node tool/scripts/build-battle.mjs</span> 生成 ' +
          '<span class="inline-code">tool/src/data/battle.js</span>（读取 data/structured/battle_loadout_v3.json）。</span></div>';
        return;
      }
      var characters = data.characters;
      var posOrder = Array.isArray(data.positionOrder) && data.positionOrder.length ? data.positionOrder : DEFAULT_POSITIONS;
      var typeByKey = Object.create(null);
      (data.typeDefs || []).forEach(function (t) { typeByKey[t.key] = t; });
      var templateByKey = data.templates || {};
      var byName = Object.create(null);
      characters.forEach(function (c) { byName[c.name] = c; });

      var ui = ctx.state.ui || (ctx.state.ui = {});
      var selectedName = ui.battleCharName && byName[ui.battleCharName] ? ui.battleCharName : characters[0].name;
      var search = '';

      function charNow() {
        return byName[selectedName] || characters[0];
      }

      function defaultPosOf(c) {
        if (c.bestPos && posOrder.indexOf(c.bestPos) >= 0) return c.bestPos;
        if (c.officialPos && posOrder.indexOf(c.officialPos) >= 0) return c.officialPos;
        return posOrder[0];
      }

      function matrixOf(c, pos) {
        return (c.matrix && c.matrix[pos]) || { stars: null, rank: null };
      }

      var selectedPos = ui.battlePos && posOrder.indexOf(ui.battlePos) >= 0 ? ui.battlePos : defaultPosOf(charNow());

      function saveSelection() {
        ui.battleCharName = selectedName;
        ui.battlePos = selectedPos;
        if (typeof ctx.save === 'function') ctx.save();
      }

      /* ============================ 静态骨架 ============================ */
      el.innerHTML =
        '<div class="stack" style="gap:16px">' +

        /* ① 选角色 */
        '<div class="card card--pad card--shadow" id="bt-step-char">' +
        '<div class="card-head"><div>' +
        '<div class="card-title"><span class="ico">①</span>选角色（' + characters.length + ' 人 · V3.1）</div>' +
        '<div class="card-sub">点选角色后，第二步显示该角色 5 个位置的星级，第三步给出该格的补强与器材推荐。</div>' +
        '</div><div class="row" style="gap:8px;flex-wrap:nowrap">' +
        '<div class="search-wrap" style="min-width:200px;max-width:280px;height:36px">' + dom.icon('search') +
        '<input class="search-input" id="bt-search" type="search" placeholder="搜索角色名 / 类型 / 稀有度…" aria-label="搜索角色名">' +
        '</div>' +
        '<span class="badge badge--neutral" id="bt-char-count">' + characters.length + ' / ' + characters.length + '</span>' +
        '</div></div>' +
        '<div id="bt-char-list" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin-top:12px"></div>' +
        '</div>' +

        /* ② 选位置 */
        '<div class="card card--pad" id="bt-step-pos">' +
        '<div class="card-head"><div>' +
        '<div class="card-title"><span class="ico">②</span>选位置</div>' +
        '<div class="card-sub">星级 = 该角色在该位置、相对全 ' + characters.length + ' 人池的适配排序（5★ 最强 → 1★ 最弱）；默认 = 官方最佳位。</div>' +
        '</div><span class="badge badge--info" id="bt-pos-hint">默认：官方最佳位</span></div>' +
        '<div id="bt-pos-list" class="row" style="gap:8px;margin-top:10px;align-items:stretch"></div>' +
        '</div>' +

        /* ③ 结果 */
        '<div id="bt-result"></div>' +

        /* 参考数据折叠区 */
        '<div id="bt-ref"></div>' +

        '</div>';

      /* ============================ ① 角色网格 ============================ */
      function charButton(c, index) {
        var on = c.name === selectedName;
        var best = c.bestDuty && c.bestDuty.pos ? ' · 最佳 ' + c.bestDuty.pos : '';
        return (
          '<button type="button" class="bt-char' + (on ? ' is-active' : '') + '" data-bt-char="' + index + '" data-bt-name="' + esc(c.name) + '"' +
          ' aria-pressed="' + on + '" title="' + esc(c.name + ' · ' + (c.rarity || '') + ' · ' + (c.typeLabel || '')) + '"' +
          ' style="cursor:pointer;text-align:left;display:flex;flex-direction:column;gap:3px;padding:8px 10px;border-radius:10px;' +
          'border:1px solid ' + (on ? 'var(--orange)' : 'var(--line)') + ';background:' + (on ? 'var(--orange-soft)' : 'var(--surface)') + ';color:var(--ink);min-height:54px">' +
          '<span style="font-weight:700;font-size:13px;line-height:1.25">' + esc(c.name) + '</span>' +
          '<span class="tiny muted">' + esc(c.rarity || '—') + ' · ' + esc(c.typeLabel || '—') + esc(best) + '</span>' +
          '</button>'
        );
      }

      function renderChars() {
        var q = search.trim();
        var list = [];
        characters.forEach(function (c, i) {
          if (!q) {
            list.push({ c: c, i: i });
            return;
          }
          var hay = c.name + ' ' + (c.rarity || '') + ' ' + (c.typeLabel || '') + ' ' + (c.style || '') + ' ' + (c.title || '');
          if (hay.indexOf(q) >= 0) list.push({ c: c, i: i });
        });
        var host = dom.qs('#bt-char-list', el);
        if (host) {
          host.innerHTML = list.length
            ? list.map(function (x) { return charButton(x.c, x.i); }).join('')
            : '<div class="notice notice--warn" style="grid-column:1/-1"><span class="notice-ico">🔍</span><span>没有匹配的角色。</span></div>';
        }
        var count = dom.qs('#bt-char-count', el);
        if (count) count.textContent = list.length + ' / ' + characters.length;
      }

      /* ============================ ② 位置按钮 ============================ */
      function renderPositions() {
        var c = charNow();
        var host = dom.qs('#bt-pos-list', el);
        if (!host) return;
        host.innerHTML = posOrder.map(function (pos) {
          var m = matrixOf(c, pos);
          var on = pos === selectedPos;
          var isOfficial = pos === c.officialPos;
          var isBest = c.bestDuty && c.bestDuty.pos === pos;
          return (
            '<button type="button" class="bt-pos btn' + (on ? ' is-active' : '') + '" data-bt-pos="' + esc(pos) + '" aria-pressed="' + on + '"' +
            ' style="flex-direction:column;align-items:flex-start;gap:3px;height:auto;padding:8px 12px;border:1px solid ' +
            (on ? 'var(--orange)' : 'var(--line)') + ';background:' + (on ? 'var(--orange-soft)' : 'var(--surface)') + '">' +
            '<span class="row" style="gap:6px;flex-wrap:nowrap">' +
            '<strong>' + esc(pos) + '</strong>' +
            '<span style="color:var(--orange);letter-spacing:1px">' + starText(m.stars) + '</span>' +
            (isOfficial ? '<span class="tag tag--orange" style="height:18px">官方位</span>' : '') +
            (isBest && !isOfficial ? '<span class="tag tag--blue" style="height:18px">最佳位</span>' : '') +
            '</span>' +
            '<span class="tiny muted">第 ' + numText(m.rank) + '/' + characters.length + ' · ' + (m.stars || 0) + '★</span>' +
            '</button>'
          );
        }).join('');
        var hint = dom.qs('#bt-pos-hint', el);
        if (hint) {
          var best = charNow().bestDuty;
          hint.textContent = best
            ? '官方最佳位：' + best.pos + '（第 ' + numText(best.rank) + ' 位）'
            : '该角色无官方最佳位数据（官方位：' + (charNow().officialPos || '—') + '）';
        }
      }

      /* ============================ ③ 结果：器材行 ============================ */
      function equipRow(eq) {
        var isTactic = String(eq.role || '') === '战术位';
        var desc = eq.skillDescIncomplete
          ? '<span class="badge badge--warn">动作类·无逐字文案（模板占位 ' + esc(eq.skillDesc || '31xxx') + '）</span>'
          : '<span class="small">' + esc(eq.skillDesc || '（客户端无描述字段）') + '</span>';
        return (
          '<div class="bt-equip' + (isTactic ? ' is-tactic' : '') + '" data-bt-equip="' + esc(eq.equipId) + '"' +
          (isTactic ? ' data-bt-tactic="1"' : '') +
          ' style="border:1px solid ' + (isTactic ? 'var(--orange)' : 'var(--line)') + ';background:' + (isTactic ? 'var(--orange-soft)' : 'var(--surface-2)') + ';' +
          'border-radius:var(--r-md);padding:10px 12px;margin-bottom:8px">' +
          '<div class="spread" style="gap:8px">' +
          '<div class="row" style="gap:8px">' +
          '<strong>' + esc(eq.name || '—') + '</strong>' +
          '<span class="tiny muted">q' + esc(eq.quality) + '/r' + esc(eq.rank) + '</span>' +
          '<span class="tag">技能：' + esc(eq.skillName || '—') + '</span>' +
          (isTactic ? '<span class="badge badge--warn">战术位</span>' : '') +
          (eq.skillDescIncomplete ? '<span class="badge badge--risk">desc 占位</span>' : '') +
          '</div>' +
          '<div class="row" style="gap:6px">' +
          roleBadge(eq.role) +
          (eq.ptCost != null ? '<span class="tiny muted">PT ' + esc(eq.ptCost) + '</span>' : '') +
          '</div></div>' +
          '<div style="margin-top:6px">' + desc + '</div>' +
          '<div class="tiny muted" style="margin-top:4px">补强项：' + esc(eq.needLabel || '—') + ' · 推荐理由：' + esc(eq.reason || '—') + '</div>' +
          (eq.allSkills && eq.allSkills.length > 1
            ? '<div class="tiny muted" style="margin-top:2px">该器材全部技能：' + esc(eq.allSkills.join(' / ')) + '</div>'
            : '') +
          '</div>'
        );
      }

      /* ============================ ③ 结果主渲染 ============================ */
      function resultHtml(c) {
        var pos = selectedPos;
        var p = c.positions && c.positions[pos];
        if (!p) {
          return '<div class="notice notice--warn"><span class="notice-ico">⚠️</span><span>该角色没有「' +
            esc(pos) + '」位置数据（V3 应 5 位置齐全），请重跑 build-battle.mjs。</span></div>';
        }
        var m = matrixOf(c, pos);
        var t = typeByKey[c.type] || { label: c.typeLabel || '—', need: '' };
        var tpl = templateByKey[c.type] || null;
        var html = '';

        /* 星级大标题 + 理由 */
        html +=
          '<div class="card card--pad card--shadow" id="bt-hero">' +
          '<div class="card-head"><div>' +
          '<div class="card-title"><span class="ico">③</span>位置适配星级与理由</div>' +
          '<div class="card-sub" id="bt-hero-sub">' + esc(c.name) + ' · ' + esc(pos) + ' · 相对全 ' + characters.length + ' 人池的位置适配排序</div>' +
          '</div><span class="badge badge--info">规则推导</span></div>' +
          '<div class="row" style="gap:16px;margin-top:8px;align-items:flex-end">' +
          '<span id="bt-hero-stars" style="font-size:32px;line-height:1;letter-spacing:4px;color:var(--orange);font-weight:800">' + starText(m.stars) + '</span>' +
          '<span class="row" style="gap:6px">' +
          '<span class="badge badge--warn" id="bt-hero-rank">第 ' + numText(m.rank) + '/' + characters.length + '</span>' +
          '<span class="badge badge--neutral">' + (m.stars || 0) + '★ / 5★</span>' +
          (pos === c.officialPos ? '<span class="tag tag--orange">官方位</span>' : '') +
          (c.bestDuty && c.bestDuty.pos === pos ? '<span class="tag tag--blue">官方最佳位</span>' : '') +
          '</span></div>' +
          '<div class="small" style="margin-top:10px" id="bt-hero-reason"><strong>理由：</strong>' + esc(p.positionReason || '—') + '</div>' +
          (p.matchupNote ? '<div class="small" style="margin-top:4px" id="bt-hero-matchup"><strong>对位环境：</strong>' + esc(p.matchupNote) + '</div>' : '') +
          (p.roleNote ? '<div class="small" style="margin-top:4px" id="bt-hero-role"><strong>位置职能/球权：</strong>' + esc(p.roleNote) + '</div>' : '') +
          '<div class="tiny muted" style="margin-top:6px">星级说明：相对全 ' + characters.length +
          ' 人池的位置适配排序（每位置档位 3/7/13/8/7）——同一角色不同位置可比，不能当作绝对强度评分；V4.1 官方位仅参考（已取消官方保底）。</div>' +
          '</div>';

        /* 类型判定 */
        html +=
          '<div class="card card--pad" id="bt-type">' +
          '<div class="card-head"><div>' +
          '<div class="card-title"><span class="ico">🏷️</span>类型判定（V3 · 7 类）</div>' +
          '<div class="card-sub">判定优先级：技能效果原文 &gt; 官方定位（风格/称号/报告/最佳位） &gt; 成长方向（仅辅助）</div>' +
          '</div><span class="badge badge--violet" id="bt-type-label">' + esc(t.label) + '</span></div>' +
          '<div class="row" style="gap:6px;margin-top:8px">' +
          (c.typeTags || []).map(function (tag) { return '<span class="tag">' + esc(tag) + '</span>'; }).join('') +
          '</div>' +
          '<div class="small" style="margin-top:8px"><strong>判定依据：</strong>' + esc(c.typeBasis || '—') + '</div>' +
          (t.need ? '<div class="small muted" style="margin-top:6px"><strong>该类技能需求：</strong>' + esc(t.need) + '</div>' : '') +
          '</div>';

        /* 官方定位 */
        html +=
          '<div class="card card--pad" id="bt-official">' +
          '<div class="card-head"><div>' +
          '<div class="card-title"><span class="ico">📋</span>官方定位</div>' +
          '<div class="card-sub">客户端入学报告 + wiki 定位字段（文本确证，不是推导值）</div>' +
          '</div><span class="badge badge--client">官方</span></div>' +
          '<div class="detail-kv" style="margin-top:10px">' +
          kv('官方位置', esc(c.officialPos || '—') + (c.officialPositionRaw ? '（' + esc(c.officialPositionRaw) + '）' : '')) +
          kv('官方最佳位', c.bestDuty ? esc(c.bestDuty.pos) + ' · 第 ' + esc(c.bestDuty.rank) + ' 位' : '数据缺失（38 人中 2 人）') +
          kv('风格', esc(c.style || '—')) +
          kv('称号', esc(c.title || '—')) +
          kv('身高 / 体重', (c.heightCm != null ? c.heightCm + 'cm' : '—') + ' / ' + (c.weightKg != null ? c.weightKg + 'kg' : '—')) +
          kv('稀有度 / 类型', esc(c.rarity || '—') + ' / ' + esc(t.label)) +
          '</div>' +
          '<div class="grid grid--2" style="gap:12px;margin-top:12px">' +
          '<div><div class="tiny muted strong">优势（官方）</div>' + listHtml(c.strengths) + '</div>' +
          '<div><div class="tiny muted strong">劣势（官方）</div>' + listHtml(c.weaknesses) + '</div>' +
          '</div>' +
          (c.summary
            ? '<details class="fold" style="margin-top:10px"><summary class="small strong" style="cursor:pointer">官方球探报告摘要（点击展开）</summary>' +
              '<div class="small" style="margin-top:6px;line-height:1.75">' + esc(c.summary) + '</div></details>'
            : '') +
          '</div>';

        /* 位置卡池 */
        var poolRule = (data.positionCardPool || {})[pos] || [];
        var poolDesc = (data.positionCardPoolDesc || {})[pos] || {};
        html +=
          '<div class="card card--pad" id="bt-pool">' +
          '<div class="card-head"><div>' +
          '<div class="card-title"><span class="ico">🃏</span>位置卡池</div>' +
          '<div class="card-sub">该位置可出的攻击卡（attackCards）与选卡区域</div>' +
          '</div><span class="badge badge--neutral">' + esc(pos) + '</span></div>' +
          '<div class="row" style="gap:6px;margin-top:8px">' +
          (p.attackCards || []).map(function (a) { return '<span class="tag tag--blue">' + esc(a) + '</span>'; }).join('') +
          '</div>' +
          '<div class="small" style="margin-top:8px">选卡区域：<strong>' + esc(p.area || '—') + '</strong></div>' +
          '<div class="tiny muted" style="margin-top:6px">规则卡池：' + esc(poolRule.join(' / ') || '—') +
          (poolDesc.desc ? ' · ' + esc(poolDesc.desc) : '') + '</div>' +
          '</div>';

        /* 技能补强清单 */
        var needs = p.needs || [];
        html +=
          '<div class="card card--pad" id="bt-needs">' +
          '<div class="card-head"><div>' +
          '<div class="card-title"><span class="ico">🧩</span>技能补强清单（' + needs.length + ' 项）</div>' +
          '<div class="card-sub">优先级：类型核心补洞 &gt; 自身技能协同 &gt; 位置适配 &gt; 区域/选卡增益 &gt; 卡属性 &gt; 抗干扰/防守/篮板 &gt; 战术位</div>' +
          '</div><span class="badge badge--warn">规则推导</span></div>' +
          (needs.length
            ? '<div class="table-wrap" style="margin-top:10px"><table class="table"><thead><tr>' +
              '<th>补强项</th><th>定位</th><th>为什么补</th></tr></thead><tbody>' +
              needs.map(function (n) {
                return '<tr><td><strong>' + esc(n.label) + '</strong><div class="tiny muted">' + esc(n.key) + '</div></td>' +
                  '<td>' + roleBadge(n.role) + '</td>' +
                  '<td class="small">' + esc(n.reason || '—') + '</td></tr>';
              }).join('') +
              '</tbody></table></div>'
            : '<div class="player-missing" style="margin-top:10px">该位置无补强清单数据。</div>') +
          (tpl && tpl.need ? '<div class="tiny muted" style="margin-top:8px">类型模板「' + esc(tpl.label) + '」：' + esc(tpl.need) + '</div>' : '') +
          '</div>';

        /* 战术适配（V3.1 实机口径：位置×类型适配才带战术位） */
        var tacticFit = p.tacticFit || null;
        var tacticNote = p.tacticNote || '';
        var tacticEquip = p.tacticEquip || null;
        var slotRule = data.slotRule || {};
        var tacticFitsMap = slotRule.tacticFits || {};
        html +=
          '<div class="card card--pad" id="bt-tactic">' +
          '<div class="card-head"><div>' +
          '<div class="card-title"><span class="ico">🎯</span>战术适配（V3.1 · 位置×类型）</div>' +
          '<div class="card-sub">战术技能属组织者技能池（配置标签=58）；非组织者只能靠三枚冠军戒指；每角色至多 1 个适配战术</div>' +
          '</div>' +
          (tacticFit
            ? '<span class="badge badge--ok" id="bt-tactic-fit">适配：' + esc(tacticFit) + '</span>'
            : '<span class="badge badge--neutral" id="bt-tactic-fit">不适配战术</span>') +
          '</div>' +
          (tacticFit
            ? '<div class="row" style="gap:8px;margin-top:8px">' +
              '<span class="tag tag--orange" id="bt-tactic-name" style="font-weight:700">' + esc(tacticFit) + '</span>' +
              (tacticEquip
                ? '<span class="tag tag--blue">戒指：' + esc(tacticEquip.name) + '</span>' +
                  '<span class="badge badge--info">技能：' + esc(tacticEquip.skillName) + '</span>' +
                  '<span class="tiny muted">q' + esc(tacticEquip.quality) + '/r' + esc(tacticEquip.rank) + ' · PT ' + esc(tacticEquip.ptCost) + '</span>'
                : '') +
              '</div>' +
              '<div class="small" style="margin-top:8px" id="bt-tactic-note"><strong>适配说明：</strong>' + esc(tacticNote || tacticFitsMap[tacticFit] || '—') + '</div>' +
              (tacticFitsMap[tacticFit] ? '<div class="tiny muted" style="margin-top:4px">规则：' + esc(tacticFitsMap[tacticFit]) + '</div>' : '') +
              '<div class="tiny muted" style="margin-top:4px">口径：本局同一战术仅 1 张卡；学倾向可施展 1 次 / 学狂热 2 次（无基础次数；组织者额外 +1、部分被动天赋再 +1）→ 多带无意义。</div>' +
              (tacticEquip && tacticEquip.alternatives && tacticEquip.alternatives.length
                ? '<div class="tiny muted" style="margin-top:4px">同戒指低档替代：' +
                  esc(tacticEquip.alternatives.map(function (a) { return a.skillName; }).join(' / ')) + '</div>'
                : '')
            : '<div class="small" style="margin-top:8px" id="bt-tactic-note"><strong>不适配战术：</strong>不占战术位，器材全部用于补强（本格 ' +
              (p.equips || []).length + ' 件均为补强）。</div>' +
              '<div class="tiny muted" style="margin-top:4px">原因：' + esc(tacticNote || '该位置×类型不适配战术（不占战术位）') + '</div>') +
          '</div>';

        /* 器材 T 表（T0→T4，替换原 5 件推荐展示） */
        var tierData = data.equipmentTiers || {};
        var tierChar = (tierData.characters || []).filter(function (x) { return x.name === c.name; })[0];
        var tierCell = tierChar && tierChar.positions ? tierChar.positions[pos] : null;
        var skillOf = {};
        (data.equipCatalog || []).forEach(function (eq) {
          (eq.skills || []).forEach(function (s) { if (!skillOf[eq.name]) skillOf[eq.name] = s.name; });
        });
        var tierTablesHtml = '';
        if (tierCell && tierCell.tables && tierCell.tables.length) {
          tierTablesHtml = tierCell.tables.map(function (tb) {
            var rowsHtml = (tb.tiers || []).map(function (tt) {
              var names = tt[1] || [];
              return '<tr><td class="num"><span class="badge badge--info">' + esc(tt[0]) + '</span></td><td class="small">' +
                names.map(function (n) {
                  return '<span class="tag" style="margin:1px 2px" title="' + esc(skillOf[n] || '') + '">' + esc(n) + '</span>';
                }).join('') + '</td></tr>';
            }).join('');
            return '<div class="small strong" style="margin:10px 0 4px">' + esc(tb.label || tb.role) + '</div>' +
              '<div class="table-wrap"><table class="table" style="min-width:520px"><thead><tr>' +
              '<th class="num">档位</th><th>器材（悬停看技能名；按已有器材从 T0 往下取）</th></tr></thead><tbody>' + rowsHtml + '</tbody></table></div>';
          }).join('');
        }
        var unreleasedNames = ((tierData.unreleased || []).map(function (x) { return x.name; })).join('、');
        var specialReleased = tierData.specialReleased || [];
        var specialReleasedHtml = specialReleased.length
          ? '<div class="tiny muted" style="margin-top:8px">已实装特殊器材（行为卡，不进 T 表·不编造排名）：' +
            specialReleased.map(function (x) {
              var capTxt = x.actualMaxQuality
                ? (' · 实际可获：' + esc(x.actualMaxQuality) + (x.actualMaxQuality === '金' ? '（红档当前不可得·寒溟实机口径）' : '（红档需满星·寒溟实机口径）'))
                : '';
              return esc(x.name) + (x.skills && x.skills.length ? '（' + esc(x.skills.join('、')) + '）' : '') + capTxt;
            }).join('、') +
            ' —— 2026-11-12 res20 配置侧实装；玩家可获得性待验证</div>'
          : '';
        html +=
          '<div class="card card--pad" id="bt-tiers-card">' +
          '<div class="card-head"><div>' +
          '<div class="card-title"><span class="ico">🎒</span>器材 T 表（T0 最推荐 → T4 最不推荐）</div>' +
          '<div class="card-sub">' + esc(c.name) + ' · ' + esc(pos) + (tierCell && tierCell.tacticFit ? ' · 战术适配：' + esc(tierCell.tacticFit) : '') +
          ' ｜ 覆盖全部已实装器材；金器材稀缺时按自己已有器材从 T0 往下取</div>' +
          '</div><span class="badge badge--warn">规则推导</span></div>' +
          '<div class="row" style="gap:6px;margin:10px 0">' +
          '<span class="badge badge--ok">支援口哨固定 T0（养成收益极大）</span>' +
          '<span class="badge badge--neutral">双定位角色（希雅/白神/野上）每个位置 3 张表</span>' +
          '<span class="badge badge--info">未时装单列</span>' +
          '</div>' +
          (tierTablesHtml || '<div class="player-missing">该角色×位置暂无 T 表数据。</div>') +
          (unreleasedNames ? '<div class="tiny muted" style="margin-top:8px">未时装（不参与推荐）：' + esc(unreleasedNames) + '</div>' : '') +
          specialReleasedHtml +
          '<div class="tiny muted" style="margin-top:4px">T0 里包含当前规则推出的完整配置（核心输出/位移调控/持续增益/支援口哨，适配时含战术位）；缺 T0 器材可按同档位/下一档平替。技能名悬停可见；desc 占位的 31xxx 模板技能只按动作名归类，不编造效果数值。</div>' +
          '</div>';
        return html;
      }

      function renderResult() {
        var host = dom.qs('#bt-result', el);
        if (host) host.innerHTML = resultHtml(charNow());
      }

      /* ============================ 参考数据（折叠区） ============================ */
      function starCellColor(n) {
        return Number(n) >= 4 ? 'var(--orange)' : Number(n) >= 3 ? 'var(--ink-2)' : 'var(--ink-4)';
      }

      function matrixHtml() {
        var rows = characters.map(function (c) {
          return '<tr><td><strong>' + esc(c.name) + '</strong>' +
            '<div class="tiny muted">' + esc(c.rarity || '—') + ' · ' + esc(c.typeLabel || '—') + '</div></td>' +
            posOrder.map(function (pos) {
              var m = matrixOf(c, pos);
              var best = c.bestDuty && c.bestDuty.pos === pos;
              var official = c.officialPos === pos;
              return '<td class="center" style="color:' + starCellColor(m.stars) + ';font-weight:' + (best ? '800' : '600') + '">' +
                (m.stars || 0) + '★' + (best ? '<div class="tiny" style="color:var(--blue)">最佳</div>' : official ? '<div class="tiny muted">官方</div>' : '') + '</td>';
            }).join('') +
            '<td class="small">' + esc(c.officialPos || '—') + '</td></tr>';
        }).join('');
        return (
          '<details class="card card--pad" id="bt-matrix"><summary class="strong" style="cursor:pointer">' +
          'a) 38×5 位置星级总表（矩阵）<span class="fold-hint">' + characters.length + ' 行 × ' + posOrder.length + ' 列</span></summary>' +
          '<div class="tiny muted" style="margin:8px 0">行=角色、列=位置，单元格=星级（相对全 38 人池排序）；「最佳」=官方 best_duty、「官方」=官方位置。</div>' +
          '<div class="table-wrap"><table class="table" style="min-width:660px"><thead><tr><th>角色</th>' +
          posOrder.map(function (pos) { return '<th class="center">' + esc(pos) + '</th>'; }).join('') +
          '<th>官方位</th></tr></thead><tbody>' + rows + '</tbody></table></div></details>'
        );
      }

      function typesHtml() {
        var rows = (data.typeDefs || []).map(function (t) {
          return '<tr id="bt-type-row-' + esc(t.key) + '"><td><strong>' + esc(t.label) + '</strong><div class="tiny muted">' + esc(t.key) + '</div></td>' +
            '<td class="num strong">' + t.count + ' 人</td>' +
            '<td class="small">' + esc((t.members || []).join('、')) + '</td>' +
            '<td class="small">' + esc(t.need || '—') + '</td></tr>';
        }).join('');
        return (
          '<details class="card card--pad" id="bt-types"><summary class="strong" style="cursor:pointer">' +
          'b) 7 类型判定总表（类型 / 人数 / 成员）<span class="fold-hint">7 类 · ' + characters.length + ' 人</span></summary>' +
          '<div class="tiny muted" style="margin:8px 0">判定口径：' + esc(data.typePrinciple || '—') + '</div>' +
          '<div class="table-wrap"><table class="table"><thead><tr><th>类型</th><th class="num">人数</th><th>成员</th><th>该类技能需求</th></tr></thead><tbody>' +
          rows + '</tbody></table></div></details>'
        );
      }

      function poolHtml() {
        var rows = posOrder.map(function (pos) {
          var rule = (data.positionCardPool || {})[pos] || [];
          var desc = (data.positionCardPoolDesc || {})[pos] || {};
          var area = (data.positionArea || {})[pos] || '';
          return '<tr><td><strong>' + esc(pos) + '</strong></td>' +
            '<td class="small">' + rule.map(function (c) { return '<span class="tag tag--blue" style="margin-right:4px">' + esc(c) + '</span>'; }).join('') + '</td>' +
            '<td class="small">' + esc(area) + '</td>' +
            '<td class="small">' + esc(desc.desc || '—') + '</td></tr>';
        }).join('');
        return (
          '<details class="card card--pad" id="bt-pools"><summary class="strong" style="cursor:pointer">' +
          'c) 位置卡池规则表<span class="fold-hint">' + posOrder.length + ' 个位置</span></summary>' +
          '<div class="table-wrap" style="margin-top:8px"><table class="table"><thead><tr><th>位置</th><th>卡池</th><th>选卡区域</th><th>属性配色说明</th></tr></thead><tbody>' +
          rows + '</tbody></table></div></details>'
        );
      }

      /* 战术适配规则（V3.1）：位置×类型 → 快攻/挡拆/突分/无 */
      function tacticRulesHtml() {
        var grid = data.tacticGrid || {};
        var counts = (data.meta && data.meta.counts) || {};
        var fitCounts = counts.tacticFits || {};
        var typeDefs = data.typeDefs || [];
        var gridRows = typeDefs.map(function (t) {
          return '<tr id="bt-tactic-row-' + esc(t.key) + '"><td><strong>' + esc(t.label) + '</strong>' +
            '<div class="tiny muted">' + esc(t.key) + '</div></td>' +
            posOrder.map(function (pos) {
              var cell = (grid[t.key] || {})[pos] || {};
              var fit = cell.tacticFit;
              return '<td class="center">' + (fit
                ? '<span class="tag tag--orange">' + esc(fit) + '</span>'
                : '<span class="tiny muted">无</span>') + '</td>';
            }).join('') + '</tr>';
        }).join('');
        var slotRule = data.slotRule || {};
        var fits = slotRule.tacticFits || {};
        var fitRows = Object.keys(fits).map(function (k) {
          return '<tr><td><span class="tag tag--orange">' + esc(k) + '</span></td>' +
            '<td class="small">' + esc(fits[k]) + '</td></tr>';
        }).join('');
        return (
          '<details class="card card--pad" id="bt-tactic-rules"><summary class="strong" style="cursor:pointer">' +
          'd) 战术适配规则（位置×类型 → 快攻/挡拆/突分/无）<span class="fold-hint">7 类型 × 5 位置</span></summary>' +
          (slotRule.tacticRule ? '<div class="small" style="margin:8px 0"><strong>规则：</strong>' + esc(slotRule.tacticRule) + '</div>' : '') +
          '<div class="table-wrap" style="margin-top:8px"><table class="table" id="bt-tactic-grid"><thead><tr><th>类型</th>' +
          posOrder.map(function (pos) { return '<th class="center">' + esc(pos) + '</th>'; }).join('') +
          '</tr></thead><tbody>' + gridRows + '</tbody></table></div>' +
          '<div class="small strong" style="margin-top:12px">战术类型说明（slotRule.tacticFits）</div>' +
          '<div class="table-wrap" style="margin-top:6px"><table class="table" id="bt-tactic-fits"><thead><tr>' +
          '<th>战术</th><th>适配条件</th></tr></thead><tbody>' + fitRows + '</tbody></table></div>' +
          '<div class="small strong" style="margin-top:12px">计数与口径</div>' +
          '<ul class="small" style="margin:4px 0 0 18px;line-height:1.7">' +
          '<li>' + esc(slotRule.tacticCountRule || '—') + '</li>' +
          (slotRule.priority ? '<li>优先级：' + esc(slotRule.priority) + '</li>' : '') +
          (slotRule.note ? '<li>' + esc(slotRule.note) + '</li>' : '') +
          '<li>' + esc(counts.cells) + ' 格实测分布：适配 ' + esc(counts.positionsWithTactic) + ' 格（快攻 ' +
          esc(fitCounts['快攻'] || 0) + ' / 挡拆 ' + esc(fitCounts['挡拆'] || 0) + ' / 突分 ' + esc(fitCounts['突分'] || 0) +
          '），不适配 ' + esc(counts.positionsWithoutTactic) + ' 格（纯补强）。</li>' +
          '</ul></details>'
        );
      }

      function skillCatsHtml() {
        var cats = data.skillCategories || [];
        var rows = cats.map(function (s) {
          return '<tr><td><span class="tag">' + esc(s.catLabel || s.cat) + '</span><div class="tiny muted">' + esc(s.cat) + '</div></td>' +
            '<td class="small"><strong>' + esc(s.label) + '</strong><div class="tiny muted">' + esc(s.key) + '</div></td>' +
            '<td class="num">' + esc(s.skillCount) + ' 技能 / ' + esc(s.equipCount) + ' 器材</td>' +
            '<td class="small">' + esc((s.equipNames || []).join('、') || '—') + '</td>' +
            '<td>' + (s.incompleteCount ? '<span class="badge badge--warn">占位 ' + s.incompleteCount + '</span>' : '<span class="badge badge--ok">原文可读</span>') + '</td></tr>';
        }).join('');
        var counts = (data.meta && data.meta.counts) || {};
        return (
          '<details class="card card--pad" id="bt-skillcats"><summary class="strong" style="cursor:pointer">' +
          'e) 器材技能分类速查（skillCategories + 器材库）<span class="fold-hint">' + cats.length + ' 类 · 器材 ' + esc(counts.equipCatalog) + ' 件</span></summary>' +
          '<div class="tiny muted" style="margin:8px 0">' +
          '器材库 ' + esc(counts.equipCatalog) + ' 件 / 技能 ' + esc(counts.equipSkills) + ' 条（desc 占位 ' + esc(counts.equipSkillsIncomplete) +
          ' 条）；「技能/器材」列=该分类下库内技能条数与涉及器材件数。占位的 31xxx 模板技能仅按动作名归类。</div>' +
          '<div class="table-wrap"><table class="table" style="min-width:680px"><thead><tr>' +
          '<th>大类</th><th>技能分类</th><th class="num">技能 / 器材</th><th>样例器材</th><th>desc</th></tr></thead><tbody>' +
          rows + '</tbody></table></div></details>'
        );
      }


      function tierHtml() {
        var t = data.equipmentTiers;
        if (!t || !t.characters || !t.characters.length) return '';
        var skillOf = {};
        (data.equipCatalog || []).forEach(function (eq) {
          (eq.skills || []).forEach(function (s) { if (!skillOf[eq.name]) skillOf[eq.name] = s.name; });
        });
        var rows = t.characters.map(function (c) {
          var posBlocks = posOrder.map(function (pos) {
            var cell = c.positions[pos];
            if (!cell) return '';
            var tables = (cell.tables || []).map(function (tb) {
              var tierRows = (tb.tiers || []).map(function (tt) {
                var names = tt[1] || [];
                return '<div class="small" style="margin:2px 0"><span class="badge badge--info" style="min-width:34px;display:inline-block;text-align:center">' + esc(tt[0]) + '</span> ' +
                  names.map(function (n) { return '<span title="' + esc(skillOf[n] || '') + '">' + esc(n) + '</span>'; }).join('、') + '</div>';
              }).join('');
              return '<div style="margin:4px 0 6px"><div class="tiny strong">' + esc(tb.label) + '</div>' + tierRows + '</div>';
            }).join('');
            return '<div style="margin:6px 0 2px" class="small strong">' + esc(pos) + ' ' + esc(cell.stars) + '★' +
              (cell.tacticFit ? ' <span class="badge badge--ok">战术 ' + esc(cell.tacticFit) + '</span>' : '') + '</div>' + tables;
          }).join('');
          return '<details class="fold" style="margin:4px 0;border:1px solid var(--line);border-radius:8px;padding:6px 10px">' +
            '<summary class="small strong" style="cursor:pointer">' + esc(c.name) + '（' + esc(c.typeLabel || '') +
            (c.officialRoles && c.officialRoles.length ? ' · 定位：' + esc(c.officialRoles.join(' + ')) : '') + '）</summary>' +
            posBlocks + '</details>';
        }).join('');
        var unreleased = (t.unreleased || []).map(function (e) { return e.name; }).join('、') || '—';
        var specialReleasedNames = (t.specialReleased || []).map(function (e) { return e.name; }).join('、');
        return '<details class="card card--pad" id="bt-tiers"><summary class="strong" style="cursor:pointer">' +
          'g) 器材 T 表（按角色展开）<span class="fold-hint">' + t.characters.length + ' 角色 · 每格 T0→T4 · 点角色名展开</span></summary>' +
          '<div class="tiny muted" style="margin:8px 0">' +
          '每角色 × 位置 × 定位给出完整 T 表：<b>T0 最推荐 → T4 最不推荐</b>，覆盖全部已实装器材；按自己已有器材从 T0 往下取。' +
          '支援口哨固定 T0（养成收益极大）；双定位 3 人（希雅/白神/野上）每个位置有 3 张表（两个定位 + 均衡）。' +
          '<br>未时装（不参与推荐）：' + esc(unreleased) + '。' +
          (specialReleasedNames ? '<br>已实装特殊器材（行为卡，不进 T 表）：' + esc(specialReleasedNames) + '（2026-11-12 res20 配置侧实装；玩家可获得性待验证）' : '') +
          '悬停器材名可看技能名。</div>' +
          rows + '</details>';
      }

      function caliberHtml() {
        var fm = data.fitModel || {};
        var w = fm.weights || {};
        var weightRows = [
          ['成长方向（六维/热区）', w.growth, '成长权重按位置不同（控卫重组织、中锋重篮板/防守）'],
          ['技能组/大招场景（词条55% + 本质45%）', w.cardSynergyAndEssence != null ? w.cardSynergyAndEssence : w.cardSynergy, '技能原文词条 ↔ 位置卡池 + 大招/被动本质动作匹配'],
          ['类型×位置场景（含 25% 球权契合）', w.typePool, '7 类型 × 位置自然度 + 球权/出手权（控卫=第一持球手）'],
          ['体格对位（身高+体重）', w.phys, '与同位置均值比较的对位优势（数据源 res19）'],
          ['官方位置先验', w.official, '仅参考（V4 已取消官方定位保底）']
        ].filter(function (r) { return r[1] != null; });
        var weightTotal = weightRows.reduce(function (n, r) { return n + Number(r[1] || 0); }, 0);
        var distHtml = posOrder.map(function (pos) {
          var d = (fm.distribution || {})[pos] || { dist: {} };
          var dist = d.dist || {};
          return '<tr><td>' + esc(pos) + '</td>' +
            ['5', '4', '3', '2', '1'].map(function (k) {
              return '<td class="num">' + esc(dist[k] || 0) + ' 人</td>';
            }).join('') + '</tr>';
        }).join('');
        var counts = (data.meta && data.meta.counts) || {};
        return (
          '<details class="card card--pad" id="bt-caliber"><summary class="strong" style="cursor:pointer">' +
          'f) 计算口径 / 数据来源 / 置信度与缺口</summary>' +
          '<div class="row" style="gap:6px;margin:8px 0">' +
          '<span class="badge badge--neutral">V3.1 数据版本 ' + esc(data.dataVersion || '—') + '</span>' +
          '<span class="badge badge--info">角色 ' + esc(counts.characters) + '</span>' +
          '<span class="badge badge--info">位置 ×5</span>' +
          '<span class="badge badge--info">' + esc(counts.cells) + ' 格</span>' +
          '<span class="badge badge--ok">技能分类 ' + esc(counts.skillCategories) + '</span>' +
          '</div>' +
          '<div class="small strong" style="margin-top:8px">星级计算口径</div>' +
          '<div class="tiny muted">' + esc(fm.relative || '—') + '</div>' +
          '<div class="tiny muted" style="margin-top:4px">参数可调：<b>data/structured/fit_model_config.json</b>（权重/档位/球权/对位修正等变量；改完重跑 node scripts/build_battle_v3.js → build_battle_loadout.js → tool/scripts/build-battle.mjs 即出新结果）</div>' +
          '<div class="tiny muted" style="margin-top:2px">体格数据源：<b>' + esc(fm.bodySource || '—') + '</b></div>' +
          '<div class="tiny muted" style="margin-top:2px">体格口径：' + esc(fm.physNote || '身高→盖帽（越高越好）、体重→抢断（越轻越好）；位置只决定两项权重') + '</div>' +
          '<div class="table-wrap" style="margin-top:8px"><table class="table"><thead><tr><th>维度</th><th class="num">权重</th><th>说明</th></tr></thead><tbody>' +
          weightRows.map(function (r) {
            return '<tr><td>' + esc(r[0]) + '</td><td class="num strong">' + Math.round(Number(r[1]) * 100) + '%</td>' +
              '<td class="small">' + esc(r[2]) + '</td></tr>';
          }).join('') +
          '<tr class="row-strong"><td>合计</td><td class="num">' + Math.round(weightTotal * 100) + '%</td><td class="small">权重来自 position_fit_v3.json.model</td></tr>' +
          '</tbody></table></div>' +
          '<div class="small strong" style="margin-top:12px">每位置星级档位分布（' + characters.length + ' 人）</div>' +
          '<div class="table-wrap" style="margin-top:6px"><table class="table"><thead><tr><th>位置</th>' +
          ['5★', '4★', '3★', '2★', '1★'].map(function (s) { return '<th class="num">' + s + '</th>'; }).join('') +
          '</tr></thead><tbody>' + distHtml + '</tbody></table></div>' +
          '<div class="small strong" style="margin-top:12px">数据来源</div>' +
          '<ul class="small" style="margin:4px 0 0 18px;line-height:1.7">' +
          (data.sources || []).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') +
          '</ul>' +
          '<div class="small strong" style="margin-top:12px">置信度</div>' +
          '<ul class="small" style="margin:4px 0 0 18px;line-height:1.7">' +
          ((data.meta && data.meta.confidence) || []).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') +
          '</ul>' +
          '<div class="small strong" style="margin-top:12px">已知缺口（诚实标注）</div>' +
          '<ul class="small" style="margin:4px 0 0 18px;line-height:1.7">' +
          ((data.meta && data.meta.gaps) || []).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') +
          '</ul>' +
          '<div class="tiny muted" style="margin-top:10px">生成脚本：' + esc(data.buildScript || 'tool/scripts/build-battle.mjs') +
          '（可重复运行）· 生成时间：' + esc(data.generatedAt || '—') + '</div></details>'
        );
      }

      function renderRef() {
        var host = dom.qs('#bt-ref', el);
        if (!host) return;
        host.innerHTML =
          '<div class="card card--pad" style="margin-bottom:12px">' +
          '<div class="card-title"><span class="ico">📚</span>参考数据（点击展开）</div>' +
          '<div class="card-sub">38×5 星级矩阵 / 7 类型判定 / 位置卡池规则 / 战术适配规则 / 器材技能分类速查 / 计算口径与来源</div>' +
          '</div>' +
          matrixHtml() + typesHtml() + poolHtml() + tacticRulesHtml() + skillCatsHtml() + caliberHtml();
      }

      /* ============================ 事件（全部委托，无内联 onclick） ============================ */
      dom.delegate(el, '[data-bt-char]', 'click', function (event, target) {
        var idx = Number(target.getAttribute('data-bt-char'));
        var c = characters[idx];
        if (!c || c.name === selectedName) return;
        selectedName = c.name;
        selectedPos = defaultPosOf(c);
        saveSelection();
        renderChars();
        renderPositions();
        renderResult();
      });

      dom.delegate(el, '[data-bt-pos]', 'click', function (event, target) {
        var pos = target.getAttribute('data-bt-pos');
        if (posOrder.indexOf(pos) < 0 || pos === selectedPos) return;
        selectedPos = pos;
        saveSelection();
        renderPositions();
        renderResult();
      });

      var searchInput = dom.qs('#bt-search', el);
      if (searchInput) {
        searchInput.addEventListener('input', function () {
          search = searchInput.value || '';
          renderChars();
        });
      }

      renderChars();
      renderPositions();
      renderResult();
      renderRef();
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

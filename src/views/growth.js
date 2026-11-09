/*!
 * views/growth.js —— 养成计算器 + 相对优势配置推荐（T5）
 */
(function (root) {
  'use strict';
  var BBT = root.BBT = root.BBT || {};
  var views = BBT.views = BBT.views || {};
  var dom = BBT.dom;

  function playerSelect(all, id, selected) {
    return '<select class="select" id="' + id + '" style="width:100%">' +
      all.map(function (p) {
        return '<option value="' + dom.esc(p.name) + '"' + (p.name === selected ? ' selected' : '') + '>' +
          dom.esc(p.name + '（' + p.rarity + '·' + p.position + '）') + '</option>';
      }).join('') + '</select>';
  }

  views.growth = {
    id: 'growth',
    nav: '养成计算器',
    icon: '🌱',
    title: '养成计算器 + 相对优势配置',
    subtitle: '这个工具回答：这个角色面板从哪来、离拟合曲线差多少、下一笔属性投到哪最值？以及训练/比赛/扭蛋/商店四流派的配装推荐与替代建议。',
    dataNote:
      '来源：T3 growth / roster + T8 derived_roster；等级/星级/羁绊曲线待验证',
    mount: function (el, ctx) {
      var format = BBT.format;
      var growth = BBT.growth;
      var roster = BBT.roster;
      var all = roster.playerList().filter(function (p) {
        return ctx.isOwned ? ctx.isOwned(p.contentId) : true;
      });
      var players = all.length ? all : [];
      var charData = (ctx.data && ctx.data.characters) || [];
      if (!players.length) {
        el.innerHTML = '<div class="notice notice--warn">还没有选择「我的角色」。请先在顶栏「我的角色」里勾选你拥有的角色，养成/配装推荐只列出已拥有角色。</div>';
        return;
      }
      var selectedName = players[0].name;
      var tierMap = roster.tierMap();

      var html = '';
      html += '<div class="grid grid--main-side" style="align-items:start">';

      /* ---------- 左：养成计算器 ---------- */
      html += '<div class="stack" style="gap:18px">';
      html +=
        '<div class="card card--pad card--shadow">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🧮</span>面板预测与成长构成</div>' +
        '<div class="card-sub">选角色 → 用潜力曲线预测 C 层六维，对比 wiki 参考值，看残差来源。</div></div>' +
        dom.confBadge('多源一致') + '</div>' +
        '<div class="field" style="margin-bottom:12px"><label class="field-label">角色</label>' +
        playerSelect(players, 'growth-char', selectedName) + '</div>' +
        '<div id="growth-panel"></div>' +
        '</div>';

      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🎯</span>属性预算分配（简单优化）</div>' +
        '<div class="card-sub">按位置权重 + 边际递减假设，把 N 点额外属性分到六维。</div></div>' +
        dom.confBadge('推断') + '</div>' +
        '<div class="form-grid">' +
        '<div class="field"><label class="field-label" for="growth-pos">位置</label>' +
        '<select class="select" id="growth-pos" style="width:100%">' +
        ['控卫', '分卫', '小前', '大前', '中锋'].map(function (p) {
          return '<option value="' + p + '">' + p + '</option>';
        }).join('') + '</select></div>' +
        '<div class="field"><label class="field-label" for="growth-budget">可分配属性点</label>' +
        '<div class="input-wrap"><input class="input" id="growth-budget" type="number" value="100" min="0" max="2000" step="10"></div></div>' +
        '</div>' +
        '<div id="growth-alloc" style="margin-top:14px"></div>' +
        '</div>';

      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">⭐</span>星级 / 重置 / 成长构成</div>' +
        '<div class="card-sub">已知项与未知项分开列，不假装精确。</div></div></div>' +
        '<div id="growth-extra"></div>' +
        '</div>';

      html += '</div>'; // left

      /* ---------- 右：配装推荐 ---------- */
      html += '<div class="stack" style="gap:18px">';
      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🏆</span>四流派配装推荐</div>' +
        '<div class="card-sub">训练价值与比赛价值是两条正交轴（模型验证 r=0.87）→ 双评分并列，不合并成单一强度。</div></div>' +
        dom.confBadge('多源一致') + '</div>' +
        '<div class="segmented" id="stream-tabs" style="flex-wrap:wrap">' +
        roster.STREAMS.map(function (s, i) {
          return '<button class="seg-btn' + (i === 0 ? ' is-active' : '') + '" data-stream="' + s.id + '">' + dom.esc(s.name) + '</button>';
        }).join('') + '</div>' +
        '<div id="stream-desc" class="field-hint" style="margin-top:10px"></div>' +
        '<div id="stream-rank" style="margin-top:12px"></div>' +
        '</div>';

      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🧩</span>我的阵容评估</div>' +
        '<div class="card-sub">选 5 人 → 双评分 + 位置平衡 + 替代建议。</div></div></div>' +
        '<div class="grid" style="grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">' +
        [0, 1, 2, 3, 4].map(function (i) {
          return playerSelect(players, 'team-slot-' + i, players[i] ? players[i].name : '');
        }).join('') +
        '</div>' +
        '<div id="team-rating" style="margin-top:14px"></div>' +
        '<div id="replacement" style="margin-top:14px"></div>' +
        '</div>';

      html += '</div>'; // right
      html += '</div>';

      el.innerHTML = html;

      var panelHost = dom.qs('#growth-panel', el);
      var allocHost = dom.qs('#growth-alloc', el);
      var extraHost = dom.qs('#growth-extra', el);
      var rankHost = dom.qs('#stream-rank', el);
      var descHost = dom.qs('#stream-desc', el);
      var ratingHost = dom.qs('#team-rating', el);
      var replHost = dom.qs('#replacement', el);

      function findPlayer(name) {
        return players.filter(function (p) { return p.name === name; })[0] || players[0];
      }

      function renderPanel() {
        var name = dom.qs('#growth-char', el).value;
        var p = findPlayer(name);
        var ch = charData.filter(function (c) { return c.name === p.name; })[0] || p;
        var pred = growth.predictPanel(p.rarity, growth.toPotentialMap(ch) || p.potentials);
        var actual = p.stats || ch.stats;
        var rows = growth.CODEX_ATTRS.map(function (attr) {
          var res = actual && actual[attr] != null ? actual[attr] - pred[attr] : null;
          return (
            '<tr><td>' + attr + '</td><td class="num">' + format.num(pred[attr], 1) + '</td>' +
            '<td class="num">' + (actual && actual[attr] != null ? format.num(actual[attr], 0) : '—') + '</td>' +
            '<td class="num">' + (res != null ? format.signed(res, 1) : '—') + '</td></tr>'
          );
        }).join('');
        var radar = BBT.charts.radar({
          size: 280,
          axes: growth.CODEX_ATTRS.map(function (a) { return { label: a }; }),
          series: [
            { name: '预测', color: 'var(--blue)', values: growth.CODEX_ATTRS.map(function (a) { return pred[a]; }) },
            { name: 'wiki', color: 'var(--orange)', values: growth.CODEX_ATTRS.map(function (a) { return actual ? actual[a] : null; }) }
          ],
          rings: 4,
          ariaLabel: p.name + ' 预测 vs wiki'
        });
        panelHost.innerHTML =
          '<div class="radar-wrap">' +
          '<div class="chart" style="padding:6px">' + radar + '<div class="chart-caption" style="text-align:center">蓝=潜力曲线预测 / 橙=wiki 参考</div></div>' +
          '<div><div class="table-wrap"><table class="table" style="min-width:0"><thead><tr>' +
          '<th>属性</th><th class="num">预测</th><th class="num">wiki</th><th class="num">残差</th></tr></thead><tbody>' +
          rows + '</tbody></table></div>' +
          '<div class="small muted" style="margin-top:8px">残差主要来自等级/星级/羁绊/器材等成长项（未确证），不是曲线错了。</div></div>' +
          '</div>';
        renderAlloc(p);
      }

      function renderAlloc(p) {
        var pos = dom.qs('#growth-pos', el).value;
        var budget = Number(dom.qs('#growth-budget', el).value) || 0;
        var base = p.stats || growth.predictPanel(p.rarity, growth.toPotentialMap(p) || p.potentials);
        var alloc = growth.allocateBudget(pos, base, budget);
        var maxInvest = Math.max.apply(null, alloc.map(function (a) { return a.invest; }).concat([1]));
        allocHost.innerHTML =
          '<div class="table-wrap"><table class="table"><thead><tr>' +
          '<th>属性</th><th class="num">权重</th><th class="num">当前</th><th class="num">建议投入</th><th>占比</th>' +
          '</tr></thead><tbody>' +
          alloc.map(function (a) {
            return (
              '<tr><td>' + a.attr + '</td><td class="num">' + format.num(a.weight, 2) + '</td>' +
              '<td class="num">' + format.num(a.base, 0) + '</td>' +
              '<td class="num strong">+' + a.invest + '</td>' +
              '<td><span class="bar" style="display:block;height:6px;border-radius:99px;background:var(--surface-3)">' +
              '<span style="display:block;height:6px;border-radius:99px;width:' +
              Math.round((a.invest / maxInvest) * 100) + '%;background:linear-gradient(90deg,#fbbf24,#f97316)"></span></span></td></tr>'
            );
          }).join('') +
          '</tbody></table></div>' +
          '<div class="small muted" style="margin-top:8px">假设：边际收益按 w/√(当前值) 递减（推断）；换位置会改变分配。</div>';
      }

      function renderExtra() {
        var lv = 30;
        var reset = growth.resetGuidance(lv);
        var comp = growth.composition();
        extraHost.innerHTML =
          '<div class="stack" style="gap:10px">' +
          '<div class="row" style="gap:10px;flex-wrap:wrap">' +
          '<span class="field-label" style="margin:0">当前等级</span>' +
          '<input class="chip-input" id="growth-level" type="number" value="30" min="1" max="80" style="width:70px">' +
          '<span class="small muted" id="growth-reset-text">' + dom.esc(reset.message) + '</span>' +
          '</div>' +
          '<div class="table-wrap"><table class="table"><thead><tr><th>成长构成</th><th>状态</th><th>说明</th></tr></thead><tbody>' +
          comp.map(function (c) {
            return (
              '<tr><td>' + dom.esc(c.label) + ' ' + dom.confBadge(c.confidence) + '</td>' +
              '<td>' + (c.status === 'known' ? '<span class="badge badge--ok">已知</span>' :
                c.status === 'partial' ? '<span class="badge badge--warn">部分</span>' :
                  '<span class="badge badge--risk">未知</span>') + '</td>' +
              '<td class="small muted">' + dom.esc(c.detail) + '</td></tr>'
            );
          }).join('') +
          '</tbody></table></div>' +
          '<div class="skill-list">' +
          growth.starEffects().map(function (s) {
            return '<div class="skill-item"><div class="skill-head"><span class="skill-name">' + dom.esc(s.title) + '</span>' +
              dom.confBadge(s.confidence) + '</div><div class="skill-desc">' + dom.esc(s.note) + '</div></div>';
          }).join('') +
          '</div></div>';
        var lvInput = dom.qs('#growth-level', el);
        lvInput.addEventListener('input', function () {
          var g = growth.resetGuidance(Math.max(1, Math.min(80, Number(lvInput.value) || 1)));
          dom.qs('#growth-reset-text', el).textContent = g.message;
        });
      }

      var currentStream = 'training';

      function renderStream() {
        var stream = roster.streamById(currentStream);
        var info = roster.fourStreams() && roster.fourStreams()[stream.name];
        descHost.innerHTML = '「' + dom.esc(stream.name) + '」' + dom.esc(stream.desc) +
          (info ? ' 优势：' + dom.esc((info.advantages || []).join(' / ')) : '') +
          ' <span class="badge badge--warn">权重推断</span>';
        var ranked = roster.rankByStream(currentStream)
          .filter(function (r) { return ctx.isOwned ? ctx.isOwned(r.player.contentId) : true; })
          .slice(0, 10);
        rankHost.innerHTML =
          '<div class="table-wrap"><table class="table"><thead><tr>' +
          '<th class="num">#</th><th>角色</th><th>位置</th><th>梯队</th><th class="num">比赛分</th><th class="num">训练值</th><th class="num">综合</th>' +
          '</tr></thead><tbody>' +
          ranked.map(function (r, i) {
            var p = r.player;
            return (
              '<tr><td class="num">' + (i + 1) + '</td><td><strong>' + dom.esc(p.name) + '</strong></td>' +
              '<td>' + dom.esc(p.position || '—') + '</td>' +
              '<td>' + dom.esc(tierMap[p.name] || p.communityTier || '—') + '</td>' +
              '<td class="num">' + format.num(p.scores ? p.scores.battle_score : null, 1) + '</td>' +
              '<td class="num">' + format.num(p.scores ? p.scores.training_value : null, 1) + '</td>' +
              '<td class="num strong">' + format.num(r.score, 1) + '</td></tr>'
            );
          }).join('') +
          '</tbody></table></div>' +
          '<div class="small muted" style="margin-top:8px">训练值来自社区训练评分榜映射（单源）；比赛分 = 面板属性分×0.62 + 技能分×0.38（T3 模型）。</div>';
      }

      function selectedTeam() {
        var names = [];
        for (var i = 0; i < 5; i++) {
          var sel = dom.qs('#team-slot-' + i, el);
          if (sel) names.push(sel.value);
        }
        return names.filter(Boolean);
      }

      function renderTeam() {
        var rating = roster.teamRating(selectedTeam());
        ratingHost.innerHTML =
          '<div class="grid grid--3" style="gap:10px">' +
          '<div class="stat"><div class="stat-label">平均比赛分</div><div class="stat-value num">' +
          format.num(rating.battle, 1) + '</div></div>' +
          '<div class="stat stat--blue"><div class="stat-label">平均训练值</div><div class="stat-value num">' +
          format.num(rating.training, 1) + '</div></div>' +
          '<div class="stat stat--orange"><div class="stat-label">综合</div><div class="stat-value num">' +
          format.num(rating.composite, 1) + '</div></div>' +
          '</div>' +
          (rating.warnings.length
            ? '<div class="notice notice--warn" style="margin-top:10px"><span class="notice-ico">⚠️</span><span>' +
              dom.esc(rating.warnings.join('；')) + '</span></div>'
            : '<div class="notice notice--ok" style="margin-top:10px"><span class="notice-ico">✅</span><span>位置结构完整（控卫/分卫/小前/大前/中锋 各 1）。</span></div>');
        var logic = roster.replacementLogic();
        replHost.innerHTML =
          '<div class="section-label">阵容替代建议（T3 模型）</div>' +
          '<div class="skill-list">' +
          (logic
            ? Object.keys(logic).filter(function (k) { return k !== 'evidence'; }).slice(0, 5).map(function (k) {
                var v = logic[k];
                var text = typeof v === 'string' ? v : v && (v.logic || v.note || JSON.stringify(v));
                return '<div class="skill-item"><div class="skill-head"><span class="skill-name">' + dom.esc(k) + '</span>' +
                  dom.confBadge('多源一致') + '</div><div class="skill-desc">' + dom.esc(String(text).slice(0, 260)) + '</div></div>';
              }).join('')
            : '<div class="small muted">暂无替代建议数据</div>') +
          '</div>';
      }

      /* 事件 */
      dom.qs('#growth-char', el).addEventListener('change', renderPanel);
      ['#growth-pos', '#growth-budget'].forEach(function (sel) {
        dom.qs(sel, el).addEventListener('input', function () {
          var p = findPlayer(dom.qs('#growth-char', el).value);
          renderAlloc(p);
        });
        dom.qs(sel, el).addEventListener('change', function () {
          var p = findPlayer(dom.qs('#growth-char', el).value);
          renderAlloc(p);
        });
      });
      dom.delegate(el, '[data-stream]', 'click', function (event, target) {
        currentStream = target.getAttribute('data-stream');
        dom.qsa('[data-stream]', el).forEach(function (b) {
          b.classList.toggle('is-active', b === target);
        });
        renderStream();
      });
      for (var i = 0; i < 5; i++) {
        dom.qs('#team-slot-' + i, el).addEventListener('change', renderTeam);
      }

      renderPanel();
      renderExtra();
      renderStream();
      renderTeam();
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

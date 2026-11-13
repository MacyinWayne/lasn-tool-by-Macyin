/*!
 * views/expression.js —— 表情爆发优化器
 */
(function (root) {
  'use strict';
  var BBT = root.BBT = root.BBT || {};
  var views = BBT.views = BBT.views || {};
  var dom = BBT.dom;

  function skillChips(state) {
    return (
      '<div class="chip-list" id="team-skill-list">' +
      state.teamSkills.map(function (s) {
        return (
          '<div class="chip">' +
          '<input class="chip-input" data-skill-name="' + dom.esc(s.id) + '" value="' + dom.esc(s.name) +
          '" style="width:104px" title="角色名">' +
          '<input class="chip-input" type="number" min="0" max="100" step="0.5" data-skill-bonus="' +
          dom.esc(s.id) + '" value="' + s.bonusPct + '" style="width:56px" title="每个表情的加成 %">' +
          '<span class="small muted">%</span>' +
          '<button class="chip-x" data-remove-skill="' + dom.esc(s.id) + '" title="移除">×</button>' +
          '</div>'
        );
      }).join('') +
      '</div>'
    );
  }

  function extraChips(state) {
    return (
      '<div class="chip-list" id="extra-list">' +
      state.consistencyExtras.map(function (s) {
        return (
          '<div class="chip">' +
          '<input class="chip-input" data-extra-name="' + dom.esc(s.id) + '" value="' + dom.esc(s.name) +
          '" style="width:104px" title="角色名">' +
          '<input class="chip-input" type="number" min="0" max="10" step="0.05" data-extra-value="' +
          dom.esc(s.id) + '" value="' + s.extra + '" style="width:58px" title="一致倍率额外加值">' +
          '<span class="small muted">×</span>' +
          '<button class="chip-x" data-remove-extra="' + dom.esc(s.id) + '" title="移除">×</button>' +
          '</div>'
        );
      }).join('') +
      '</div>'
    );
  }

  views.expression = {
    id: 'expression',
    nav: '表情爆发',
    icon: '💥',
    title: '表情爆发优化器',
    subtitle: '新默认按「表情构成」算：大笑 20% / 微笑 10% / 哭脸 0%，混合只线性相加；全一致才乘一致乘区（实测表：2人1.5 / 3人1.8 / 4人2.0 / 5人2.2 / 6人2.5，真崎+0.25）。锚点：150% / 234% / 288% / 330% / 360% / 803%。',
    dataNote:
      '来源：寒溟实机 2026-11-05（一致乘区表、130%/150%/160%/234%/288%/330%/360%/803%）；7/8/9 为推算·待实测',
    mount: function (el, ctx) {
      var format = BBT.format;
      var expr = BBT.expression;
      var params = BBT.params;
      var values = ctx.state.values;
      var ui = ctx.state.ui;

      var slots = ui.exprSlots || 6;
      var trainingValue = ui.exprTrainingValue != null ? ui.exprTrainingValue : 16;

      var html = '';

      /* ===== 新默认模型：表情构成计算器（寒溟实测定稿 2026-11-05） ===== */
      html +=
        '<div class="card card--pad card--shadow" id="expr-comp-card" style="margin-bottom:18px">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🧮</span>表情构成计算器（新默认 · 寒溟实测定稿）</div>' +
        '<div class="card-sub">爆发倍率 = (1 + Σ每个参与者的(表情基础 + 角色技能加成)) × 一致乘区；大笑 20% / 微笑 10% / 哭脸 0%。</div></div>' +
        dom.confBadge('实测') + '</div>' +
        '<div class="grid grid--3" style="gap:12px">' +
        '<div class="field"><label class="field-label" for="expr-laugh"><span class="label-text">大笑人数</span>' +
        '<span class="tag tag--orange">+20% / 人</span></label>' +
        '<div class="input-wrap"><input class="input" id="expr-laugh" type="number" min="0" max="9" step="1" value="6">' +
        '<span class="input-unit">人</span></div></div>' +
        '<div class="field"><label class="field-label" for="expr-smile"><span class="label-text">微笑人数</span>' +
        '<span class="tag tag--blue">+10% / 人</span></label>' +
        '<div class="input-wrap"><input class="input" id="expr-smile" type="number" min="0" max="9" step="1" value="0">' +
        '<span class="input-unit">人</span></div></div>' +
        '<div class="field"><label class="field-label" for="expr-cry"><span class="label-text">哭脸人数</span>' +
        '<span class="tag">+0% / 人</span></label>' +
        '<div class="input-wrap"><input class="input" id="expr-cry" type="number" min="0" max="9" step="1" value="0">' +
        '<span class="input-unit">人</span></div></div>' +
        '</div>' +
        '<div class="row" style="gap:8px;margin:10px 0 4px">' +
        '<span class="small muted">快速示例：</span>' +
        '<button class="btn btn--sm" data-comp-preset="mixed1">1 大笑 + 1 微笑（130%）</button>' +
        '<button class="btn btn--sm" data-comp-preset="mixed3">3 大笑 + 1 哭脸（160%）</button>' +
        '<button class="btn btn--sm" data-comp-preset="aligned3">3 微笑一致（234%）</button>' +
        '<button class="btn btn--sm" data-comp-preset="aligned6">6 大笑一致（803%）</button>' +
        '</div>' +
        '<div id="expr-comp-result"></div>' +
        '<div id="expr-examples" style="margin-top:12px"></div>' +
        '<div class="notice notice--info" style="margin-top:12px"><span class="notice-ico">👥</span><span>' +
        '<strong>参与者规则：</strong>经理 + 陪练 + 主练（满编 6；无人 = 只有主练 1 人；单经理/单人 = 2 人；2 陪练 = 3 人…）；' +
        '希雅二星虚空人 +1~3 → 最多 9。' +
        '<strong>一致乘区（实测定稿表值）：</strong>仅全部参与者表情同款且 ≥2 人触发，任意表情类型（含全哭脸）：' +
        '<strong>2 人 1.5 / 3 人 1.8 / 4 人 2.0 / 5 人 2.2 / 6 人 2.5</strong>（真崎再 +0.25）；' +
        '<span class="badge badge--warn">7/8/9 人 = 1+0.25×人数 银行家舍入推算（2.8 / 3.0 / 3.2）·待实测</span>。混合表情只线性相加。' +
        '</span></div>' +
        '<div class="small muted" style="margin-top:8px">角色技能加成沿用下方旧模型区的「上阵角色技能加值」（望月 +8%、龙宫寺 +4% …，每个参与者都吃）；真崎 +0.25 同理。' +
        '数据来源：寒溟实机 2026-11-05（150% / 234% / 288% / 330% / 360% / 803% 锚点）。</div>' +
        '</div>';

      html +=
        '<div class="notice notice--warn" style="margin-bottom:12px"><span class="notice-ico">🧪</span><span>' +
        '<strong>旧模型（legacy 对照）：</strong>以下「爆发参数」使用旧假设（每格统一 20%、固定 6 格、一致倍率 2.5 + 真崎 0.25），' +
        '仅用于对照与希雅虚空人档位估算；新默认请用上方「表情构成计算器」。</span></div>';

      html += '<div class="grid grid--main-side" style="align-items:start">';

      /* -------- 输入 -------- */
      html += '<div class="stack" style="gap:18px">';
      html +=
        '<div class="card card--pad card--shadow">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🎛️</span>爆发参数</div>' +
        '<div class="card-sub">训练值 × 线性加成 × 一致乘区 = 最终属性。角色加值按「每个表情」线性叠加。</div></div></div>' +
        '<div class="stack" style="gap:16px">' +

        '<div class="form-grid">' +
        '<div class="field">' +
        '<label class="field-label" for="ex-training"><span class="label-text">训练值（被爆发的基数）</span>' +
        '<span class="badge badge--warn" title="来源：训练计算器结果或你手填的训练单次收益">输入</span></label>' +
        '<div class="input-wrap"><input class="input" id="ex-training" type="number" min="0" max="100000" ' +
        'step="0.1" value="' + trainingValue + '"><span class="input-unit">点</span></div>' +
        '<div class="field-hint">先算训练、再爆表情。默认 16 = Lv1 投射训练的主属性收益（A 层训练值）。</div>' +
        '</div>' +
        '<div class="field">' +
        '<label class="field-label" for="ex-slots"><span class="label-text">本次结算表情数</span>' +
        '<span class="badge badge--ok">实测</span></label>' +
        '<div class="input-wrap"><input class="input" id="ex-slots" type="number" min="1" max="' +
        params.byId.exprSlotsMaxWithXiya.value + '" step="1" value="' + slots + '">' +
        '<span class="input-unit">人</span></div>' +
        '<div class="field-hint">基础 6 人（经理1+陪练4+主练1）；希雅二星虚空人可到 <strong>9 人</strong>。少开会少拿线性加成。</div>' +
        '</div>' +
        '</div>' +

        '<div class="field">' +
        '<label class="field-label" for="ex-base"><span class="label-text">每个表情基础加成</span>' +
        dom.paramBadge('exprBaseBonusPct') + '</label>' +
        '<div class="input-wrap"><input class="input" id="ex-base" type="number" min="0" max="100" step="0.5" ' +
        'data-param="exprBaseBonusPct" value="' + values.exprBaseBonusPct + '">' +
        '<span class="input-unit">%</span></div>' +
        '<div class="field-hint">社区实测：每个表情 +20% 基础。角色技能加值会在此之上叠加。</div>' +
        '</div>' +

        '<div>' +
        '<div class="spread" style="margin-bottom:8px">' +
        '<div class="field-label" style="margin:0">上阵角色技能加值 <span class="badge badge--ok" title="望月 +8% / 龙宫寺 +4% 来自社区实测">实测</span></div>' +
        '<span class="small muted">每个表情都吃一次</span>' +
        '</div>' +
        '<div id="team-skill-host">' + skillChips(ctx.state) + '</div>' +
        '<div class="row" style="margin-top:10px;gap:6px">' +
        '<input class="chip-input" id="new-skill-name" placeholder="角色名" style="width:120px">' +
        '<input class="chip-input" id="new-skill-bonus" type="number" min="0" max="100" step="0.5" placeholder="+%" style="width:64px">' +
        '<button class="btn btn--sm" id="add-skill">+ 添加角色加值</button>' +
        '</div>' +
        '</div>' +

        '<div class="form-grid">' +
        '<div class="field">' +
        '<label class="field-label" for="ex-consistency"><span class="label-text">一致乘区基础倍率</span>' +
        dom.paramBadge('exprConsistencyBase') + '</label>' +
        '<div class="input-wrap"><input class="input" id="ex-consistency" type="number" min="1" max="10" ' +
        'step="0.05" data-param="exprConsistencyBase" value="' + values.exprConsistencyBase + '">' +
        '<span class="input-unit">×</span></div>' +
        '<div class="field-hint">全部表情同款（一致）时才乘这个倍率；不一致 = ×1。</div>' +
        '</div>' +
        '<div class="field">' +
        '<label class="field-label" for="ex-kinds"><span class="label-text">随机模型：表情种类数</span>' +
        dom.paramBadge('exprKinds') + '</label>' +
        '<div class="input-wrap"><input class="input" id="ex-kinds" type="number" min="1" max="12" ' +
        'step="1" data-param="exprKinds" value="' + values.exprKinds + '">' +
        '<span class="input-unit">种</span></div>' +
        '<div class="field-hint">只影响「随机凑表情」的期望曲线，不影响锁定一致的收益。</div>' +
        '</div>' +
        '</div>' +

        '<div>' +
        '<div class="spread" style="margin-bottom:8px">' +
        '<div class="field-label" style="margin:0">一致倍率额外加值 <span class="badge badge--ok">实测</span></div>' +
        '<span class="small muted">真崎：2.5 + 0.25</span>' +
        '</div>' +
        '<div id="extra-host">' + extraChips(ctx.state) + '</div>' +
        '<div class="row" style="margin-top:10px;gap:6px">' +
        '<input class="chip-input" id="new-extra-name" placeholder="角色名" style="width:120px">' +
        '<input class="chip-input" id="new-extra-value" type="number" min="0" max="10" step="0.05" placeholder="+×" style="width:64px">' +
        '<button class="btn btn--sm" id="add-extra">+ 添加一致加值</button>' +
        '</div>' +
        '</div>' +

        '<div class="row" style="gap:8px">' +
        '<button class="btn btn--sm btn--primary" id="load-example">载入 803% 示例</button>' +
        '<button class="btn btn--sm" id="use-training">取训练计算器结果</button>' +
        '</div>' +
        '</div></div></div>';

      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">💡</span>机制速记</div>' +
        '<div class="card-sub">看懂这两句话，优化器就只是算术。</div></div></div>' +
        '<ul class="feature-list">' +
        '<li><span class="f-ico">＋</span><span class="f-body"><strong>加成线性相加</strong>' +
        '每个表情的 bonus 直接加到「1 + Σ」里，第 6 个表情的相对收益远小于第 1 个。</span></li>' +
        '<li><span class="f-ico">×</span><span class="f-body"><strong>一致乘区独立相乘</strong>' +
        '全一致时 ×2.75，不一致时 ×1——跨过去收益巨大，所以「锁满一致」通常最优。</span></li>' +
        '</ul></div>';

      html += '</div>'; // left

      /* -------- 右列结果 -------- */
      html += '<div class="stack" style="gap:18px" id="ex-result"></div>';
      html += '</div>'; // grid

      html += '<div id="ex-xiya" class="stack" style="gap:18px"></div>';
      html += '<div id="ex-example" class="stack" style="gap:18px"></div>';
      html += '<div id="ex-charts" class="stack" style="gap:18px"></div>';
      html += '<div id="ex-strategy"></div>';

      el.innerHTML = html;

      var resultHost = dom.qs('#ex-result', el);
      var xiyaHost = dom.qs('#ex-xiya', el);
      var exampleHost = dom.qs('#ex-example', el);
      var chartsHost = dom.qs('#ex-charts', el);
      var strategyHost = dom.qs('#ex-strategy', el);
      var compResultHost = dom.qs('#expr-comp-result', el);
      var compExamplesHost = dom.qs('#expr-examples', el);

      var compCounts = { '大笑': 6, '微笑': 0, '哭脸': 0 };

      function readCompCounts() {
        ['大笑', '微笑', '哭脸'].forEach(function (type, i) {
          var id = ['expr-laugh', 'expr-smile', 'expr-cry'][i];
          var input = dom.qs('#' + id, el);
          if (!input) return;
          var n = Math.max(0, Math.min(12, Math.round(Number(input.value) || 0)));
          compCounts[type] = n;
        });
        return compCounts;
      }

      function renderComposition() {
        var counts = readCompCounts();
        var result = expr.burstByComposition(values, {
          counts: counts,
          teamSkills: ctx.state.teamSkills,
          consistencyExtras: ctx.state.consistencyExtras
        });
        var maxBase = expr.maxParticipants(values, {});
        var maxXiya = expr.maxParticipants(values, { xiya: true });
        var overBase = result.participants > maxBase;
        var overMax = result.participants > maxXiya;
        var trainingTotal = trainingValue * result.total;
        var consistencyText = format.multiplier(result.consistencyMultiplier, 2);
        var consistencyHint = result.allSame ? result.note : '表情不一致 → ×1';
        var pendingBadge = result.estimated
          ? '<span class="badge badge--warn">公式推算 · 待实测</span>'
          : '';
        var formulaLine =
          '(1 + ' + (result.formulaParts.length ? result.formulaParts.join(' + ') : '0') + ') × ' +
          format.multiplier(result.consistencyMultiplier, 2) +
          ' = ' + format.multiplier(result.total, 3) + ' = ' + format.num(result.percent, 0) + '%';
        compResultHost.innerHTML =
          '<div class="grid grid--main-side" style="align-items:start;gap:16px;margin-top:8px">' +
          '<div class="result-card">' +
          '<div class="result-label">爆发倍率（' + result.participants + ' 名参与者）' + dom.confBadge('实测') + pendingBadge + '</div>' +
          '<div class="result-main"><span class="big-number num">' + format.num(result.percent, 1) + '</span>' +
          '<span class="big-unit">%</span></div>' +
          '<div class="result-note">最终属性 = 训练值 ' + format.num(trainingValue, 1) + ' × ' +
          format.multiplier(result.total, 3) + ' = <strong>' + format.num(trainingTotal, 1) + ' 点</strong></div>' +
          '<div class="result-formula" style="white-space:normal">' + dom.esc(formulaLine) + '</div>' +
          '</div>' +
          '<div class="stack" style="gap:10px">' +
          '<div class="grid grid--2" style="gap:10px">' +
          '<div class="stat"><div class="stat-label">线性乘区</div><div class="stat-value num">' +
          format.multiplier(result.linearMultiplier, 3) + '</div><div class="stat-hint">1 + Σ(表情基础+技能)</div></div>' +
          '<div class="stat stat--orange"><div class="stat-label">一致乘区</div><div class="stat-value num">' +
          consistencyText + '</div><div class="stat-hint">' +
          (result.allSame ? consistencyHint : '表情不一致 → ×1') + '</div></div>' +
          '<div class="stat"><div class="stat-label">参与人数</div><div class="stat-value num">' +
          result.participants + '<span class="unit">人</span></div><div class="stat-hint">基础上限 ' + maxBase + ' / 希雅 ' + maxXiya + '</div></div>' +
          '<div class="stat stat--blue"><div class="stat-label">角色技能加成</div><div class="stat-value num">' +
          format.num(result.skillBonusPct, 1) + '<span class="unit">%</span></div><div class="stat-hint">每个参与者都吃</div></div>' +
          '</div>' +
          (result.notes.length
            ? '<div class="notice notice--warn"><span class="notice-ico">⚠️</span><span>' +
              dom.esc(result.notes.join('；')) + '</span></div>'
            : '') +
          (overBase && !overMax
            ? '<div class="notice notice--info"><span class="notice-ico">🌟</span><span>超过基础 6 人上限：这一档需要希雅二星虚空人（最多 ' + maxXiya + ' 人）。</span></div>'
            : '') +
          (overMax
            ? '<div class="notice notice--warn"><span class="notice-ico">⚠️</span><span>参与者超过上限 ' + maxXiya + ' 人，请减少人数。</span></div>'
            : '') +
          '</div>' +
          '</div>';

        var examples = expr.measuredExamples(values);
        compExamplesHost.innerHTML =
          '<div class="small muted" style="margin-bottom:6px">下方实测示例为「不含角色技能加成」的锚点（130%/160%/234%）；上方计算结果已计入当前上阵角色技能 +' +
          format.num(result.skillBonusPct, 1) + '%（可在下方旧模型区调整）。</div>' +
          '<div class="table-wrap"><table class="table"><thead><tr>' +
          '<th>寒溟实机示例</th><th class="num">期望</th><th class="num">计算值</th><th>说明</th><th>状态</th>' +
          '</tr></thead><tbody>' +
          examples.map(function (e) {
            return '<tr><td><strong>' + dom.esc(e.label) + '</strong></td>' +
              '<td class="num">' + e.expectedPercent + '%</td>' +
              '<td class="num strong">' + format.num(e.computedPercent, 1) + '%</td>' +
              '<td class="small muted">' + dom.esc(e.explain) + '</td>' +
              '<td>' + (e.matched ? '<span class="badge badge--ok">已复现</span>' : '<span class="badge badge--warn">不一致</span>') + '</td></tr>';
          }).join('') +
          '</tbody></table></div>';
      }

      function bindCompInputs() {
        ['expr-laugh', 'expr-smile', 'expr-cry'].forEach(function (id) {
          var input = dom.qs('#' + id, el);
          if (!input) return;
          input.addEventListener('input', function () {
            renderComposition();
          });
        });
        dom.delegate(el, '[data-comp-preset]', 'click', function (event, target) {
          var preset = target.getAttribute('data-comp-preset');
          var map = {
            mixed1: { '大笑': 1, '微笑': 1, '哭脸': 0 },
            mixed3: { '大笑': 3, '微笑': 0, '哭脸': 1 },
            aligned3: { '大笑': 0, '微笑': 3, '哭脸': 0 },
            aligned6: { '大笑': 6, '微笑': 0, '哭脸': 0 }
          };
          var c = map[preset] || map.aligned6;
          compCounts = { '大笑': c['大笑'], '微笑': c['微笑'], '哭脸': c['哭脸'] };
          dom.qs('#expr-laugh', el).value = c['大笑'];
          dom.qs('#expr-smile', el).value = c['微笑'];
          dom.qs('#expr-cry', el).value = c['哭脸'];
          renderComposition();
        });
      }

      var xiyaMode = ui.xiyaMode || 'none';

      function renderXiya() {
        var rows = [];
        var base = expr.baseSlots(values);
        for (var s = base; s <= base + 3; s++) {
          var r = expr.burst(values, {
            slots: s,
            teamSkills: ctx.state.teamSkills,
            consistencyExtras: ctx.state.consistencyExtras
          });
          rows.push({ slots: s, total: r.total, percent: r.percent });
        }
        var expected = expr.expectedWithXiya(values, {
          teamSkills: ctx.state.teamSkills,
          consistencyExtras: ctx.state.consistencyExtras
        });
        var selected = null;
        if (xiyaMode === '1' || xiyaMode === '2' || xiyaMode === '3') {
          selected = expr.burstWithXiya(values, {
            virtuals: Number(xiyaMode),
            teamSkills: ctx.state.teamSkills,
            consistencyExtras: ctx.state.consistencyExtras
          });
        }
        var big = xiyaMode === 'avg' ? expected.expectedPercent : selected ? selected.percent : rows[0].percent;
        var bigLabel =
          xiyaMode === 'avg'
            ? '虚空人 1~3 均匀期望（' + format.num(expected.expectedSlots, 1) + ' 人一致）'
            : selected
              ? '希雅二星 · 真人6 + 虚空人' + selected.virtuals + '（' + selected.slots + ' 人一致，稳定）'
              : '无希雅 · 基础 6 人一致基准';
        var table = rows
          .map(function (r) {
            var isSel =
              (xiyaMode === 'avg' && r.slots === 8) ||
              (xiyaMode !== 'avg' && selected && r.slots === selected.slots) ||
              (xiyaMode === 'none' && r.slots === 6);
            return (
              '<tr' + (isSel ? ' class="row-strong"' : '') + '><td>' + r.slots + ' 人</td>' +
              '<td class="num">×' + format.num(r.total, 2) + '</td>' +
              '<td class="num strong">' + format.num(r.percent, 0) + '%</td></tr>'
            );
          })
          .join('');
        var warning = '';
        if (xiyaMode === 'none') {
          warning = '基础上限 6 人；若你有希雅二星，可在上方切换虚空人模式。';
        } else if (xiyaMode === 'avg') {
          warning =
            '虚空人 1~3 均匀随机时，期望 8 人一致 = 979%；但前提是真人 6 人已能锁满一致。' +
            '若真人未锁满，虚空人会随机跟随不同真人，反而更难齐。';
        } else {
          warning =
            '虚空人必定跟随某个真人：只有真人 6 人已锁满一致时，锁 ' + (6 + Number(xiyaMode)) +
            ' 人才稳定；真人未锁满时不要指望希雅提高一致率。';
        }
        xiyaHost.innerHTML =
          '<div class="card card--pad card--blue">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🌟</span>希雅二星 · 虚空人（表情一致上限 6 → 9）' +
          '<span class="badge badge--ok">最大一致人数：6（无希雅）/ 9（希雅二星）</span></div>' +
          '<div class="card-sub">真人 6 人锁满一致时，虚空人（幻影队友）必定跟随 → 同一次训练最多 9 人一致。</div></div>' +
          dom.confBadge('实测') + '</div>' +
          '<div class="segmented" style="flex-wrap:wrap;margin-bottom:12px" id="xiya-modes">' +
          [['none', '无希雅（6 人）'], ['1', '虚空人 1'], ['2', '虚空人 2'], ['3', '虚空人 3'], ['avg', '1~3 随机期望']]
            .map(function (m) {
              return '<button class="seg-btn' + (xiyaMode === m[0] ? ' is-active' : '') +
                '" data-xiya="' + m[0] + '">' + m[1] + '</button>';
            })
            .join('') +
          '</div>' +
          '<div class="grid grid--main-side" style="align-items:start;gap:16px">' +
          '<div class="result-card blue"><div class="result-label">' + dom.esc(bigLabel) + '</div>' +
          '<div class="result-main"><span class="big-number num">' + format.num(big, 1) + '</span>' +
          '<span class="big-unit">%</span></div>' +
          '<div class="result-note">' +
          (xiyaMode === 'avg'
            ? '期望倍率 ×' + format.num(expected.expectedTotal, 2) + '（相对 6 人基准 +' +
              format.num(expected.upliftPct, 1) + '%）'
            : '倍率 ×' + format.num(big / 100, 2)) +
          ' · 9 人上限 = 1067%</div></div>' +
          '<div class="table-wrap"><table class="table"><thead><tr><th>一致人数</th><th class="num">倍率</th><th class="num">百分比</th></tr></thead><tbody>' +
          table + '</tbody></table></div>' +
          '</div>' +
          '<div class="notice notice--warn" style="margin-top:12px"><span class="notice-ico">⚠️</span><span>' +
          dom.esc(warning) + '</span></div>' +
          '<div class="small muted" style="margin-top:8px">寒溟实测（2026-11-05）：训练队基础 6 人 = 经理1 + 陪练4 + 主练1；' +
          '希雅二星额外 +1~3 虚空人，虚空人表情必定与某个真人一致。虚空人数量分布/是否独立随机仍待确认。</div>' +
          '</div>';

        dom.qsa('[data-xiya]', el).forEach(function (btn) {
          btn.addEventListener('click', function () {
            xiyaMode = btn.getAttribute('data-xiya');
            ctx.state.ui.xiyaMode = xiyaMode;
            ctx.save();
            renderXiya();
          });
        });
      }

      function currentOpts() {
        return {
          slots: slots,
          teamSkills: ctx.state.teamSkills,
          consistencyExtras: ctx.state.consistencyExtras,
          kinds: values.exprKinds
        };
      }

      function renderAll() {
        renderXiya();
        renderComposition();
        var opts = currentOpts();
        var result = expr.burst(values, opts);
        var expected = expr.randomExpected(values, opts);
        var total = result.total;
        var example = expr.example803(values);
        var report = expr.dilutionReport(values, opts);
        var trainingTotal = trainingValue * total;
        var trainingExpected = trainingValue * expected.expected;
        var fullSlots = opts.slots;
        var mixed = 1 + fullSlots * result.perBonusFraction;
        var mixedTotal = trainingValue * mixed;
        var lossPct = total === 0 ? 0 : (1 - expected.expected / total) * 100;

        /* --- 结果卡 --- */
        var resultHtml = '';
        resultHtml +=
          '<div class="result-card">' +
          '<div class="result-label">表情爆发总倍率' + dom.confBadge('实测') +
          '<span class="tag tag--orange">' + (fullSlots === 6 ? '6 格满槽' : fullSlots + ' 格') +
          ' · 全部一致</span></div>' +
          '<div class="result-main"><span class="big-number num">' + format.multiplier(total, 2) +
          '</span><span class="big-unit">= ' + format.num(total * 100, 1) + '%</span></div>' +
          '<div class="result-note">最终属性 = 训练值 ' + format.num(trainingValue, 1) + ' × ' +
          format.multiplier(total, 3) + ' = <strong>' + format.num(trainingTotal, 1) + ' 点</strong></div>' +
          '<div class="result-formula">(1 + ' + fullSlots + ' × ' + format.num(result.perBonusPct, 1) +
          '%) × ' + format.multiplier(result.consistencyMultiplier, 2) + ' = ' +
          format.multiplier(result.linearMultiplier, 3) + ' × ' +
          format.multiplier(result.consistencyMultiplier, 3) + ' = ' +
          format.multiplier(total, 3) + '</div>' +
          '</div>';

        resultHtml +=
          '<div class="grid grid--2" style="gap:12px">' +
          '<div class="stat"><div class="stat-label">每表情加成</div><div class="stat-value num">' +
          format.num(result.perBonusPct, 1) + '<span class="unit">%</span></div>' +
          '<div class="stat-hint">基础 + 角色技能合计</div></div>' +
          '<div class="stat"><div class="stat-label">线性乘区</div><div class="stat-value num">' +
          format.multiplier(result.linearMultiplier, 3) + '</div>' +
          '<div class="stat-hint">1 + ' + fullSlots + ' × ' + format.num(result.perBonusPct, 1) + '%</div></div>' +
          '<div class="stat stat--orange"><div class="stat-label">一致乘区</div>' +
          '<div class="stat-value num">' + format.multiplier(result.consistencyMultiplier, 2) + '</div>' +
          '<div class="stat-hint">全一致才触发</div></div>' +
          '<div class="stat stat--blue"><div class="stat-label">随机凑的期望</div>' +
          '<div class="stat-value num">' + format.multiplier(expected.expected, 2) + '</div>' +
          '<div class="stat-hint">比锁满一致少 ' + format.num(lossPct, 1) + '%</div></div>' +
          '</div>';

        resultHtml +=
          '<div class="card card--pad">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🎲</span>本次结算两种结局</div>' +
          '<div class="card-sub">同一批 ' + fullSlots + ' 个表情，锁一致 vs 混着用。</div></div></div>' +
          '<div class="ledger">' +
          '<div class="ledger-row ledger-row--total">' +
          '<div class="ledger-label">锁满一致</div>' +
          '<div class="ledger-detail">×' + format.multiplier(total, 3) + ' 最终属性</div>' +
          '<div class="ledger-value">' + format.num(trainingTotal, 1) + '<span class="u">点</span></div>' +
          '</div>' +
          '<div class="ledger-row">' +
          '<div class="ledger-label">混搭（不一致）</div>' +
          '<div class="ledger-detail">一致乘区归 1，只剩线性加成</div>' +
          '<div class="ledger-value">' + format.num(mixedTotal, 1) + '<span class="u">点</span></div>' +
          '</div>' +
          '<div class="ledger-row">' +
          '<div class="ledger-label">随机凑（期望）</div>' +
          '<div class="ledger-detail">P(全一致) = ' + format.num(expected.pConsistent * 100, 2) + '%</div>' +
          '<div class="ledger-value">' + format.num(trainingExpected, 1) + '<span class="u">点</span></div>' +
          '</div>' +
          '</div>' +
          '<div class="row" style="margin-top:12px">' + dom.confBadge('推断') +
          '<span class="small muted">随机模型假设每个槽位独立均匀随机；「不一致就完全不给乘区」为推断，待实测确认。</span></div>' +
          '</div>';

        resultHost.innerHTML = resultHtml;

        /* --- 803 示例 + 稀释结论 --- */
        var reproduced = Math.abs(example.total - 8.03) < 1e-9;
        var exampleHtml = '';
        exampleHtml +=
          '<div class="grid grid--2">' +
          '<div class="card card--pad card--accent">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🧪</span>复现 803% 经典示例</div>' +
          '<div class="card-sub">任务书里的验收例子：6 个一致表情 + 望月 8% + 龙宫寺 4% + 真崎 0.25。</div></div>' +
          '<span class="badge ' + (reproduced ? 'badge--ok">✓ 已复现' : 'badge--warn">当前参数已偏离默认') +
          '</span></div>' +
          '<div class="stack" style="gap:2px">' +
          '<div class="ledger">' +
          example.steps.map(function (step, i) {
            var val = step.unit === '%' ? format.num(step.value, 2) + '%' :
              step.unit === '×' ? format.multiplier(step.value, i === example.steps.length - 1 ? 2 : 3) :
                format.num(step.value, 2) + step.unit;
            return (
              '<div class="ledger-row' + (i === example.steps.length - 1 ? ' ledger-row--total' : '') + '">' +
              '<div class="ledger-label">' + dom.esc(step.label) + '</div>' +
              '<div class="ledger-detail">' + dom.esc(step.detail) + '</div>' +
              '<div class="ledger-value">' + val + '</div>' +
              '</div>'
            );
          }).join('') +
          '</div>' +
          '<div class="result-formula" style="margin-top:12px;white-space:normal">' +
          dom.esc(example.formulaText) + '</div>' +
          (reproduced ? '' :
            '<div class="notice notice--warn" style="margin-top:12px"><span class="notice-ico">↺</span>' +
            '<span>当前参数下示例结果为 ' + format.multiplier(example.total, 2) +
            '。点左侧「载入 803% 示例」可恢复默认参数。</span></div>') +
          '</div>' +
          '</div>';

        exampleHtml +=
          '<div class="card card--pad">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🌊</span>稀释效应结论</div>' +
          '<div class="card-sub">由当前参数自动计算，不是写死的文案。</div></div></div>' +
          '<ul class="conclusion-list">' +
          report.conclusions.map(function (text, i) {
            return (
              '<li class="conclusion-item"><span class="conclusion-index">' + (i + 1) + '</span>' +
              '<span>' + highlightNumbers(text) + '</span></li>'
            );
          }).join('') +
          '</ul>' +
          '<div class="card-footer"><div class="row" style="gap:12px">' +
          '<span class="small muted">第 1 个表情相对 +' + format.num(result.perBonusPct, 1) + '%，' +
          '第 ' + fullSlots + ' 个相对 +' + format.num(report.full.marginalGuaranteedPct, 1) + '%。</span>' +
          '</div></div>' +
          '</div>' +
          '</div>';
        exampleHost.innerHTML = exampleHtml;

        /* --- 图表 --- */
        var rows = report.rows;
        var labels = rows.map(function (r) { return r.n + ' 个'; });
        var lineChart = BBT.charts.line({
          labels: labels,
          series: [
            {
              name: '锁满一致',
              values: rows.map(function (r) { return r.guaranteed; }),
              color: 'var(--orange)',
              area: true
            },
            {
              name: '随机凑期望',
              values: rows.map(function (r) { return r.expected; }),
              color: 'var(--blue)',
              dashed: true
            }
          ],
          yFmt: function (v) { return format.multiplier(v, 2); },
          yLabel: '爆发倍率',
          xLabel: '一致表情数量',
          zeroBased: true,
          showLastLabels: true,
          height: 300,
          ariaLabel: '不同一致表情数量下的爆发倍率'
        });

        var barValues = rows.slice(1).map(function (r) { return r.marginalGuaranteedPct; });
        var barChart = BBT.charts.bars({
          labels: rows.slice(1).map(function (r) { return '第 ' + r.n + ' 个'; }),
          values: barValues,
          yFmt: function (v) { return format.num(v, 1) + '%'; },
          highlightIndex: barValues.length - 1,
          xLabel: '追加的第 N 个一致表情',
          yLabel: '相对增益 %',
          height: 280,
          ariaLabel: '追加一致表情的边际相对增益'
        });

        chartsHost.innerHTML =
          '<div class="chart-grid-2">' +
          '<div class="chart">' +
          '<div class="chart-head"><div><div class="chart-title">爆发倍率 vs 一致表情数量</div>' +
          '<div class="chart-sub">橙线是锁满一致；蓝虚线是随机凑的期望（k = ' +
          format.num(values.exprKinds, 0) + ' 种）。</div></div>' +
          '<div class="chart-legend">' +
          '<span class="legend-item"><span class="legend-dot" style="background:var(--orange)"></span>锁满一致</span>' +
          '<span class="legend-item"><span class="legend-dot" style="background:var(--blue)"></span>随机期望</span>' +
          '</div></div>' + lineChart +
          '<div class="chart-caption">随机期望在 ' + report.bestRandom.n + ' 个附近见底再回升：' +
          '线性加成还在涨，但 P(全一致) 指数级暴跌。括号里的真实含义是——别赌随机。</div>' +
          '</div>' +
          '<div class="chart">' +
          '<div class="chart-head"><div><div class="chart-title">每追加 1 个一致表情的相对增益</div>' +
          '<div class="chart-sub">越堆越低，这就是「稀释」的数学形状。</div></div></div>' +
          barChart +
          '<div class="chart-caption">相对增益 = 新倍率 / 旧倍率 − 1。它只取决于每个表情的加成，' +
          '与一致倍率无关；所以提高角色加值能整体抬升，但不能阻止递减。</div>' +
          '</div>' +
          '</div>';

        /* --- 策略对比 --- */
        var strategies = [
          {
            name: '锁满一致',
            detail: '全部 ' + fullSlots + ' 个同款表情',
            mult: total,
            attr: trainingTotal,
            tag: '推荐',
            tone: 'orange'
          },
          {
            name: '只放 1 个一致',
            detail: '单槽天然一致，但线性加成少',
            mult: rows[0].guaranteed,
            attr: trainingValue * rows[0].guaranteed,
            tag: fullSlots > 1 ? '次优' : '等价',
            tone: 'blue'
          },
          {
            name: '混搭（不一致）',
            detail: '一致乘区归 1，只剩线性加成',
            mult: mixed,
            attr: mixedTotal,
            tag: '亏',
            tone: 'red'
          },
          {
            name: '随机凑（期望）',
            detail: 'P(全一致) = ' + format.num(expected.pConsistent * 100, 2) + '%',
            mult: expected.expected,
            attr: trainingExpected,
            tag: '赌',
            tone: 'violet'
          }
        ];
        var best = Math.max.apply(
          null,
          strategies.map(function (s) { return s.mult; })
        );
        strategyHost.innerHTML =
          '<div class="card card--pad">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🏆</span>策略对比（同样 ' + fullSlots +
          ' 个表情）</div><div class="card-sub">以最终属性排序；「推荐」= 期望最大。</div></div></div>' +
          '<div class="table-wrap"><table class="table"><thead><tr>' +
          '<th>策略</th><th>说明</th><th class="num">爆发倍率</th><th class="num">最终属性</th><th>评价</th>' +
          '</tr></thead><tbody>' +
          strategies.map(function (s) {
            var isBest = s.mult === best;
            var toneClass =
              s.tone === 'orange' ? 'tag--orange' : s.tone === 'blue' ? 'tag--blue' : '';
            return (
              '<tr' + (isBest ? ' class="row-strong"' : '') + '>' +
              '<td><strong>' + dom.esc(s.name) + '</strong></td>' +
              '<td class="small muted">' + dom.esc(s.detail) + '</td>' +
              '<td class="num strong">' + format.multiplier(s.mult, 3) + '</td>' +
              '<td class="num">' + format.num(s.attr, 1) + '</td>' +
              '<td><span class="tag ' + toneClass + '">' + dom.esc(isBest ? '推荐' : s.tag) + '</span></td>' +
              '</tr>'
            );
          }).join('') +
          '</tbody></table></div>' +
          '<div class="card-footer"><span class="small muted">注意：训练值固定为 ' + format.num(trainingValue, 1) +
          '；换训练值只等比缩放最终属性，不改变策略排序。</span></div>' +
          '</div>';
      }

      // 把结论里的数字/倍率加粗，提升可读性
      function highlightNumbers(text) {
        return dom.esc(text)
          .replace(/(\d+(?:\.\d+)?%)/g, '<strong>$1</strong>')
          .replace(/(\d+(?:\.\d+)?×)/g, '<strong>$1</strong>');
      }

      /* ---------------- 事件 ---------------- */
      function refreshChips() {
        dom.qs('#team-skill-host', el).innerHTML = skillChips(ctx.state);
        dom.qs('#extra-host', el).innerHTML = extraChips(ctx.state);
      }

      el.addEventListener('input', function (event) {
        var t = event.target;
        if (t.id === 'ex-training') {
          var n = Math.max(0, Number(t.value) || 0);
          trainingValue = n;
          ctx.state.ui.exprTrainingValue = n;
          ctx.save();
          renderAll();
          return;
        }
        if (t.id === 'ex-slots') {
          var s = Math.max(1, Math.min(params.byId.exprSlotCount.max, Math.round(Number(t.value) || 1)));
          slots = s;
          ctx.state.ui.exprSlots = s;
          ctx.save();
          renderAll();
          return;
        }
        if (t.matches('[data-param]')) {
          var pid = t.getAttribute('data-param');
          var def = params.byId[pid];
          var raw = Number(t.value);
          if (!isFinite(raw)) return;
          values[pid] = params.roundToStep(params.clampValue(raw, def.min, def.max), def.step);
          ctx.save();
          renderAll();
          return;
        }
        if (t.matches('[data-skill-bonus]')) {
          var sid = t.getAttribute('data-skill-bonus');
          var skill = ctx.state.teamSkills.find(function (x) { return x.id === sid; });
          if (skill) {
            var b = Number(t.value);
            if (!isFinite(b)) return;
            skill.bonusPct = params.roundToStep(Math.max(0, Math.min(100, b)), 0.5);
            ctx.save();
            renderAll();
          }
          return;
        }
        if (t.matches('[data-skill-name]')) {
          var sid2 = t.getAttribute('data-skill-name');
          var skill2 = ctx.state.teamSkills.find(function (x) { return x.id === sid2; });
          if (skill2) {
            skill2.name = String(t.value).slice(0, 24);
            ctx.save();
            renderAll();
          }
          return;
        }
        if (t.matches('[data-extra-value]')) {
          var eid = t.getAttribute('data-extra-value');
          var extra = ctx.state.consistencyExtras.find(function (x) { return x.id === eid; });
          if (extra) {
            var ev = Number(t.value);
            if (!isFinite(ev)) return;
            extra.extra = params.roundToStep(Math.max(0, Math.min(10, ev)), 0.05);
            ctx.save();
            renderAll();
          }
          return;
        }
        if (t.matches('[data-extra-name]')) {
          var eid2 = t.getAttribute('data-extra-name');
          var extra2 = ctx.state.consistencyExtras.find(function (x) { return x.id === eid2; });
          if (extra2) {
            extra2.name = String(t.value).slice(0, 24);
            ctx.save();
            renderAll();
          }
        }
      });

      dom.delegate(el, '[data-remove-skill]', 'click', function (event, target) {
        var id = target.getAttribute('data-remove-skill');
        ctx.state.teamSkills = ctx.state.teamSkills.filter(function (x) { return x.id !== id; });
        refreshChips();
        ctx.save();
        renderAll();
      });

      dom.delegate(el, '[data-remove-extra]', 'click', function (event, target) {
        var id = target.getAttribute('data-remove-extra');
        ctx.state.consistencyExtras = ctx.state.consistencyExtras.filter(function (x) { return x.id !== id; });
        refreshChips();
        ctx.save();
        renderAll();
      });

      dom.qs('#add-skill', el).addEventListener('click', function () {
        var nameInput = dom.qs('#new-skill-name', el);
        var bonusInput = dom.qs('#new-skill-bonus', el);
        var name = (nameInput.value || '').trim();
        var bonus = Number(bonusInput.value);
        if (!name) {
          if (ctx.toast) ctx.toast('先填角色名', 'warn');
          nameInput.focus();
          return;
        }
        if (!isFinite(bonus) || bonus <= 0) {
          if (ctx.toast) ctx.toast('加成要大于 0%', 'warn');
          bonusInput.focus();
          return;
        }
        ctx.state.teamSkills.push({
          id: 'skill-' + Date.now(),
          name: name.slice(0, 24),
          bonusPct: Math.min(100, bonus),
          confidence: '待验证',
          source: '用户手动添加'
        });
        nameInput.value = '';
        bonusInput.value = '';
        refreshChips();
        ctx.save();
        renderAll();
        if (ctx.toast) ctx.toast('已添加上阵技能加值', 'ok');
      });

      dom.qs('#add-extra', el).addEventListener('click', function () {
        var nameInput = dom.qs('#new-extra-name', el);
        var valueInput = dom.qs('#new-extra-value', el);
        var name = (nameInput.value || '').trim();
        var extra = Number(valueInput.value);
        if (!name) {
          if (ctx.toast) ctx.toast('先填角色名', 'warn');
          nameInput.focus();
          return;
        }
        if (!isFinite(extra) || extra <= 0) {
          if (ctx.toast) ctx.toast('加值要大于 0', 'warn');
          valueInput.focus();
          return;
        }
        ctx.state.consistencyExtras.push({
          id: 'extra-' + Date.now(),
          name: name.slice(0, 24),
          extra: Math.min(10, extra),
          confidence: '待验证',
          source: '用户手动添加'
        });
        nameInput.value = '';
        valueInput.value = '';
        refreshChips();
        ctx.save();
        renderAll();
        if (ctx.toast) ctx.toast('已添加一致倍率加值', 'ok');
      });

      dom.qs('#load-example', el).addEventListener('click', function () {
        values.exprBaseBonusPct = 20;
        values.exprConsistencyBase = 2.5;
        values.exprKinds = 4;
        ctx.state.teamSkills = params.DEFAULT_TEAM_SKILLS.map(function (s) {
          return Object.assign({}, s);
        });
        ctx.state.consistencyExtras = params.DEFAULT_CONSISTENCY_EXTRAS.map(function (s) {
          return Object.assign({}, s);
        });
        slots = 6;
        ctx.state.ui.exprSlots = 6;
        trainingValue = 16;
        ctx.state.ui.exprTrainingValue = 16;
        ctx.state.ui.theme = ctx.state.ui.theme;
        dom.qs('#ex-training', el).value = 16;
        dom.qs('#ex-slots', el).value = 6;
        dom.qs('[data-param="exprBaseBonusPct"]', el).value = 20;
        dom.qs('[data-param="exprConsistencyBase"]', el).value = 2.5;
        dom.qs('[data-param="exprKinds"]', el).value = 4;
        refreshChips();
        ctx.save();
        renderAll();
        if (ctx.toast) ctx.toast('已载入 803% 示例参数', 'ok');
      });

      dom.qs('#use-training', el).addEventListener('click', function () {
        var layers = BBT.attributeLayers;
        var itemId = ctx.state.ui.trainingItem || 'shot';
        var item = BBT.training.computeItem(values, {
          itemId: itemId,
          pair: layers.getTrainingPair(itemId),
          level: ctx.state.ui.trainingLevel || 1
        });
        trainingValue = Number(item.primary.total.toFixed(1));
        ctx.state.ui.exprTrainingValue = trainingValue;
        dom.qs('#ex-training', el).value = trainingValue;
        ctx.save();
        renderAll();
        if (ctx.toast) {
          ctx.toast(
            '已取训练计算器主属性结果：' + item.primaryAttr + ' ' +
              format.num(item.primary.total, 1) + ' 点',
            'ok'
          );
        }
      });

      bindCompInputs();
      renderAll();
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

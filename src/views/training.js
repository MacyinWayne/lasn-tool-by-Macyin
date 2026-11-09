/*!
 * views/training.js —— 训练收益计算器（A 层六属性 + 双属性配对）
 *
 * 用户实机验证（2026-11-05 公测）：训练项按固定绑定同时提升两项 A 层属性
 *   投射→投射+运控 / 弹跳→弹跳+意识 / 防守→防守+体能 /
 *   体能→体能+弹跳 / 运控→运控+防守 / 意识→意识+体能
 * （旧配对 弹跳→体能、体能→投射、运控→意识、意识→弹跳 已被实机推翻）
 */
(function (root) {
  'use strict';
  var BBT = root.BBT = root.BBT || {};
  var views = BBT.views = BBT.views || {};
  var dom = BBT.dom;

  function paramField(id, opts) {
    var params = BBT.params;
    var def = params.byId[id];
    if (!def) return '';
    var o = opts || {};
    return (
      '<div class="field">' +
      '<label class="field-label" for="tp-' + id + '">' +
      '<span class="label-text">' + dom.esc(o.label || def.label) + '</span>' +
      dom.paramBadge(id) +
      (o.flag ? '<span class="tag tag--orange">' + dom.esc(o.flag) + '</span>' : '') +
      '</label>' +
      '<div class="input-wrap">' +
      '<input class="input" id="tp-' + id + '" type="number" inputmode="decimal" ' +
      'data-param="' + id + '" value="' + def.value + '" ' +
      'min="' + def.min + '" max="' + def.max + '" step="' + def.step + '" ' +
      'title="' + dom.esc(def.source) + '">' +
      '<span class="input-unit">' + dom.esc(def.unit) + '</span>' +
      '</div>' +
      '<div class="field-hint">' + dom.esc(o.hint || def.note) + '</div>' +
      '</div>'
    );
  }

  function ledgerHtml(result) {
    var format = BBT.format;
    var rows = result.steps.map(function (step) {
      var isTotal = step.key === 'total';
      var badges = (step.paramIds || [])
        .map(function (pid) {
          return dom.paramBadge(pid);
        })
        .join(' ');
      var val;
      if (step.unit === '×') val = format.multiplier(step.value, 3);
      else val = format.num(step.value, 1) + ' <span class="u">' + dom.esc(step.unit) + '</span>';
      return (
        '<div class="ledger-row' + (isTotal ? ' ledger-row--total' : '') + '">' +
        '<div class="ledger-label">' + dom.esc(step.label) + badges + '</div>' +
        '<div class="ledger-detail" title="' + dom.esc(step.detail) + '">' + dom.esc(step.detail) + '</div>' +
        '<div class="ledger-value">' + val + '</div>' +
        '</div>'
      );
    });
    return '<div class="ledger">' + rows.join('') + '</div>';
  }

  views.training = {
    id: 'training',
    nav: '训练计算器',
    icon: '🏋️',
    title: '训练计算器',
    subtitle: '这个工具回答：练一次 A 层训练项，主属性和副属性各涨多少、性价比如何。训练项配对来自用户实机验证（2026-11-05 公测）。',
    dataNote:
      '来源：用户实机训练配对（2026-11-05）+ 社区实测公式 + T3 模型；副属性占比待验证',
    mount: function (el, ctx) {
      var format = BBT.format;
      var params = BBT.params;
      var layers = BBT.attributeLayers;
      var ui = ctx.state.ui;
      var values = ctx.state.values;

      var itemId = ui.trainingItem || 'shot';
      var pair = layers.getTrainingPair(itemId);
      var level = ui.trainingLevel || 1;

      var itemButtons = layers.TRAINING_PAIRS.map(function (p) {
        return (
          '<button class="pair-btn' + (p.id === itemId ? ' is-active' : '') + '" data-item="' + p.id + '">' +
          '<span class="pn">' + dom.esc(p.name) + '</span>' +
          '<span class="pp">' + dom.esc(p.primary) + ' → ' + dom.esc(p.secondary) + '</span>' +
          '</button>'
        );
      }).join('');

      var moodOptions = layers.MOOD_OPTIONS.map(function (m) {
        return (
          '<option value="' + m.bonusPct + '"' + (Number(values.moodBonusPct) === m.bonusPct ? ' selected' : '') + '>' +
          m.name + '（' + (m.bonusPct > 0 ? '+' : '') + m.bonusPct + '%）</option>'
        );
      }).join('');

      var html = '';
      html += '<div class="notice notice--warn" style="margin-bottom:14px"><span class="notice-ico">⚠️</span><span>' +
        '<strong>模型已修正（2026-11-09）：</strong>训练主/副属性<strong>不是按比例拆分</strong>，而是<strong>数值相加</strong>——主 ≈ 基础 10 + 局外养成基础属性 + 器材（单个 +1，暴击 ×2）+ 小经理 +3 + 扭蛋主属性加成 + 训练等级/人员/技能，再乘 (1+训练加成+心情)×暴击×场地；副 ≈ 基础 3 + 其它加值。' +
        '后期主/副比例变高是加值变大所致。本页计算器的 secondarySharePct 属<strong>旧比例模型（已废弃、仅参考）</strong>；' +
        '实际决策请看「养成配队 → 养成决策指南」（时间段 × 流派的标准答案），无需逐条算数值。</span></div>';
      html += '<div class="grid grid--main-side" style="align-items:start">';

      /* ---------------- 输入 ---------------- */
      html += '<div class="stack" style="gap:18px">';
      html +=
        '<div class="card card--pad card--shadow">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🎛️</span>本次训练参数</div>' +
        '<div class="card-sub">选训练项 → 自动带出「主属性 + 副属性」配对；所有数值都写入全局参数，公式卡可改。</div></div></div>' +
        '<div class="stack" style="gap:16px">' +

        '<div>' +
        '<div class="field-label">训练项 <span class="badge badge--client">客户端确证</span>' +
        '<span class="small muted" style="font-weight:400">（配对来自 edu_train_conf）</span></div>' +
        '<div class="item-grid">' + itemButtons + '</div>' +
        '</div>' +

        '<div class="field">' +
        '<label class="field-label" for="tp-level"><span class="label-text">训练等级</span>' +
        '<span class="badge badge--warn" title="等级成长速度来自社区实测；界面范围 1–20">实测</span></label>' +
        '<div class="ranges-row">' +
        '<input class="range" id="tp-level-range" type="range" min="1" max="20" step="1" value="' +
        level + '">' +
        '<div class="input-wrap" style="width:96px;flex:none">' +
        '<input class="input" id="tp-level" type="number" min="1" max="20" step="1" value="' +
        level + '">' +
        '<span class="input-unit">级</span>' +
        '</div></div>' +
        '<div class="field-hint">等级项 = (等级 − 1) × ' + format.num(values.trainLevelStep, 1) +
        ' 点，线性成长；主副属性吃同一个括号。</div>' +
        '</div>' +

        '<div class="form-grid">' +
        '<div class="field">' +
        '<label class="field-label" for="tp-mood"><span class="label-text">心情</span>' +
        '<span class="badge badge--client">客户端确证</span><span class="badge badge--warn" title="2026-11-08 实测：7 周完整训练一局全程无心情/压力 UI、飘字或事件文本">实测未出现</span></label>' +
        '<select class="select" id="tp-mood" style="width:100%">' + moodOptions + '</select>' +
        '<div class="field-hint">客户端确证数值：极好 +20% / 好 +10% / 一般 0 / 差 −10% / 极差 −20%。<strong>2026-11-08 一局完整实测：心情/压力在训练全程玩家不可见（无 UI/飘字/事件），此参数仅作模型参考，不代表线上可操作</strong>。</div>' +
        '</div>' +
        paramField('venueBonusPct', { label: '场地 / 海边加成（%）' }) +
        paramField('secondarySharePct', { label: '副属性收益占比（%）', flag: '推断' }) +
        paramField('personnelBonus', {}) +
        paramField('gearBonus', {}) +
        paramField('trainingBonusPct', {}) +
        paramField('gearCritBonusPct', {}) +
        paramField('charSkillFlatBonus', {
          flag: '角色技能',
          hint: '示例：佐久间雨乃「队友训练 +3，50% 额外 +2」→ 期望 +4（推断计入括号内）'
        }) +
        paramField('flatAttrBonus', {}) +
        '</div>' +

        '<div class="row" style="gap:8px">' +
        '<button class="btn btn--sm" data-preset="fresh">Lv1 基础</button>' +
        '<button class="btn btn--sm" data-preset="sakuma">载入佐久间雨乃（期望 +4）</button>' +
        '<button class="btn btn--sm btn--ghost" data-goto-param="charSkillFlatBonus">去公式卡改参数</button>' +
        '</div>' +
        '</div></div></div>';

      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🧩</span>训练收益公式（A 层）</div>' +
        '<div class="card-sub">训练项同时结算主 / 副两项属性，乘区共用。</div></div>' +
        dom.confBadge('客户端确证') + '</div>' +
        '<div class="formula-box">' +
        '<span class="fx-var">( 训练项基础 + (等级−1)×' + format.num(values.trainLevelStep, 1) +
        ' + 人员 + 器材 + 角色技能 )</span><br/>' +
        '<span class="fx-op">×</span> <span class="fx-var">(1 + Σ训练加成 + 心情%)</span> ' +
        '<span class="fx-op">×</span> <span class="fx-var">(1 + 器材暴击%)</span> ' +
        '<span class="fx-op">×</span> <span class="fx-var">(1 + 场地%)</span><br/>' +
        '<span class="fx-op">+</span> <span class="fx-var">主属性加值</span> ' +
        '<span class="fx-op">；副属性 = 主属性收益 × 副属性占比</span>' +
        '</div>' +
        '<div class="row" style="margin-top:12px">' + dom.confBadge('实测') +
        '<span class="small muted">括号项来自社区多源实测；双属性配对 / 心情数值为客户端确证；副属性比例、心情与场地位置为推断。</span></div>' +
        '</div>';

      html += '</div>'; // 左列

      /* ---------------- 右列结果 ---------------- */
      html += '<div class="stack" style="gap:18px" id="training-result"></div>';
      html += '</div>'; // grid

      html += '<div id="training-charts" class="stack" style="gap:18px"></div>';
      html += '<div id="training-table"></div>';

      el.innerHTML = html;

      var resultHost = dom.qs('#training-result', el);
      var chartHost = dom.qs('#training-charts', el);
      var tableHost = dom.qs('#training-table', el);

      function renderResults() {
        pair = layers.getTrainingPair(itemId);
        var item = BBT.training.computeItem(values, { itemId: itemId, pair: pair, level: level });
        var primary = item.primary;
        var secondary = item.secondary;
        var perLevel = BBT.training.perLevelGain(values);
        var maxLevel = Math.max(10, Math.min(20, Math.max(level, 6) + 4));
        var rows = [];
        for (var lv = 1; lv <= maxLevel; lv++) {
          var r = BBT.training.computeItem(values, { itemId: itemId, pair: pair, level: lv });
          rows.push({ level: lv, primary: r.primary.total, secondary: r.secondary.total, sum: r.totalSum });
        }

        var resultHtml = '';
        resultHtml +=
          '<div class="grid grid--2" style="gap:12px">' +
          '<div class="result-card">' +
          '<div class="result-label">主属性 · ' + dom.esc(item.primaryAttr) + dom.confBadge('实测') + '</div>' +
          '<div class="result-main"><span class="big-number num">' + format.num(primary.total, 1) +
          '</span><span class="big-unit">点 / 次</span></div>' +
          '<div class="result-note">括号小计 ' + format.num(primary.subtotal, 1) + ' × 乘区 ' +
          format.multiplier(primary.multiplier, 3) + '</div>' +
          '</div>' +
          '<div class="result-card blue">' +
          '<div class="result-label">副属性 · ' + dom.esc(item.secondaryAttr) +
          dom.confBadge('客户端确证') + '<span class="tag">按占比 ' + format.num(item.sharePct, 0) + '%</span></div>' +
          '<div class="result-main"><span class="big-number num">' + format.num(secondary.total, 1) +
          '</span><span class="big-unit">点 / 次</span></div>' +
          '<div class="result-note">主属性收益 × ' + format.num(item.sharePct, 0) + '%（比例推断，待实测）</div>' +
          '</div>' +
          '</div>';

        resultHtml +=
          '<div class="result-card" style="border-color:var(--line)">' +
          '<div class="result-label">本次训练总属性收益' +
          dom.confBadge('客户端确证') + '<span class="tag tag--orange">' +
          dom.esc(item.primaryAttr) + ' + ' + dom.esc(item.secondaryAttr) + '</span></div>' +
          '<div class="result-main"><span class="big-number num">' + format.num(item.totalSum, 1) +
          '</span><span class="big-unit">点 / 次</span></div>' +
          '<div class="result-formula">' + dom.esc(primary.formula) + '</div>' +
          '</div>';

        resultHtml +=
          '<div class="grid grid--2" style="gap:12px">' +
          '<div class="stat"><div class="stat-label">括号小计</div><div class="stat-value num">' +
          format.num(primary.subtotal, 1) + '<span class="unit">点</span></div>' +
          '<div class="stat-hint">基础 + 等级 + 人员 + 器材 + 技能</div></div>' +
          '<div class="stat"><div class="stat-label">乘区合计</div><div class="stat-value num">' +
          format.multiplier(primary.multiplier, 3) + '</div>' +
          '<div class="stat-hint">训练加成 × 暴击 × 心情 × 场地</div></div>' +
          '<div class="stat stat--blue"><div class="stat-label">每升 1 级（主属性）</div>' +
          '<div class="stat-value num">' + format.num(perLevel, 2) + '<span class="unit">点</span></div>' +
          '<div class="stat-hint">固定增量，不随等级衰减</div></div>' +
          '<div class="stat stat--blue"><div class="stat-label">练满 20 次合计</div>' +
          '<div class="stat-value num">' + format.num(item.totalSum * 20, 0) + '<span class="unit">点</span></div>' +
          '<div class="stat-hint">同等级连续 20 次的粗算</div></div>' +
          '</div>';

        resultHtml +=
          '<div class="card card--pad">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🧾</span>拆解账本（主属性）</div>' +
          '<div class="card-sub">副属性共用同一乘区，只差「占比」。</div></div></div>' +
          ledgerHtml(primary) +
          '</div>';

        resultHost.innerHTML = resultHtml;

        /* ---- 图表 ---- */
        var lineChart = BBT.charts.line({
          labels: rows.map(function (r) { return 'Lv' + r.level; }),
          series: [
            {
              name: item.primaryAttr + '（主）',
              values: rows.map(function (r) { return r.primary; }),
              color: 'var(--orange)',
              area: true
            },
            {
              name: item.secondaryAttr + '（副）',
              values: rows.map(function (r) { return r.secondary; }),
              color: 'var(--blue)',
              dashed: true
            }
          ],
          yLabel: '点 / 次',
          xLabel: '训练等级',
          yFmt: function (v) { return format.num(v, 1); },
          zeroBased: true,
          showLastLabels: true,
          height: 300,
          ariaLabel: '训练等级与主副属性收益曲线'
        });

        var relValues = rows.slice(1).map(function (r, i) {
          var prev = rows[i].sum;
          return prev ? ((r.sum / prev) - 1) * 100 : 0;
        });
        var barChart = BBT.charts.bars({
          labels: rows.slice(1).map(function (r) { return 'Lv' + r.level; }),
          values: relValues,
          yFmt: function (v) { return format.num(v, 1) + '%'; },
          highlightIndex: relValues.length - 1,
          xLabel: '升级后等级',
          yLabel: '相对提升 %',
          height: 280,
          ariaLabel: '每升一级的总收益相对提升'
        });

        chartHost.innerHTML =
          '<div class="chart-grid-2">' +
          '<div class="chart">' +
          '<div class="chart-head"><div><div class="chart-title">主 / 副属性收益 vs 训练等级</div>' +
          '<div class="chart-sub">两条线平行：双属性共用同一套括号与乘区，比例固定。</div></div>' +
          '<div class="chart-legend">' +
          '<span class="legend-item"><span class="legend-dot" style="background:var(--orange)"></span>' +
          dom.esc(item.primaryAttr) + '（主）</span>' +
          '<span class="legend-item"><span class="legend-dot" style="background:var(--blue)"></span>' +
          dom.esc(item.secondaryAttr) + '（副）</span>' +
          '</div></div>' + lineChart +
          '<div class="chart-caption">练「' + dom.esc(pair.name) + '」时，' + dom.esc(pair.primary) +
          ' 与 ' + dom.esc(pair.secondary) + ' 同时成长——选训练项本质是在选两个属性的组合。</div>' +
          '</div>' +
          '<div class="chart">' +
          '<div class="chart-head"><div><div class="chart-title">每升 1 级的相对提升（合计）</div>' +
          '<div class="chart-sub">绝对值恒定，相对提升递减——边际稀释。</div></div></div>' +
          barChart +
          '<div class="chart-caption">预算有限时，先把等级停在高性价比区间，把资源投向乘区（器材 / 心情 / 场地）。</div>' +
          '</div>' +
          '</div>';

        /* ---- 速查表 ---- */
        var levels = [1, 2, 3, 5, 8, 10, 15, 20];
        var tableRows = levels
          .map(function (lv) {
            var r = BBT.training.computeItem(values, { itemId: itemId, pair: pair, level: lv });
            var prev = lv === 1 ? null : BBT.training.computeItem(values, { itemId: itemId, pair: pair, level: lv - 1 });
            var rel = prev && prev.totalSum ? (((r.totalSum / prev.totalSum) - 1) * 100).toFixed(1) + '%' : '—';
            return (
              '<tr><td class="num">Lv ' + lv + '</td>' +
              '<td class="num strong">' + format.num(r.primary.total, 1) + '</td>' +
              '<td class="num">' + format.num(r.secondary.total, 1) + '</td>' +
              '<td class="num">' + format.num(r.totalSum, 1) + '</td>' +
              '<td class="num">' + rel + '</td></tr>'
            );
          })
          .join('');

        tableHost.innerHTML =
          '<div class="card card--pad">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">📋</span>等级收益速查</div>' +
          '<div class="card-sub">训练项：' + dom.esc(pair.name) + '（' + dom.esc(pair.primary) + ' + ' +
          dom.esc(pair.secondary) + '）；当前参数下即时计算。</div></div></div>' +
          '<div class="table-wrap"><table class="table"><thead><tr>' +
          '<th class="num">等级</th><th class="num">' + dom.esc(pair.primary) + '（主）</th>' +
          '<th class="num">' + dom.esc(pair.secondary) + '（副）</th>' +
          '<th class="num">合计</th><th class="num">相对上一级</th>' +
          '</tr></thead><tbody>' + tableRows + '</tbody></table></div>' +
          '<div class="card-footer"><div class="row" style="gap:14px">' +
          '<span class="small muted">假设：</span>' +
          primary.assumptions.map(function (a) {
            return '<span class="small muted">· ' + dom.esc(a) + '</span>';
          }).join('') +
          '</div></div>' +
          '</div>';
      }

      /* ---------------- 事件 ---------------- */
      el.addEventListener('input', function (event) {
        var t = event.target;
        if (t.matches && t.matches('[data-param]')) {
          var pid = t.getAttribute('data-param');
          var def = params.byId[pid];
          if (!def) return;
          var raw = t.value === '' ? NaN : Number(t.value);
          if (!isFinite(raw)) return;
          values[pid] = params.roundToStep(params.clampValue(raw, def.min, def.max), def.step);
          ctx.save();
          renderResults();
          return;
        }
        if (t.id === 'tp-level' || t.id === 'tp-level-range') {
          level = Math.max(1, Math.min(20, Math.round(Number(t.value)) || 1));
          ctx.state.ui.trainingLevel = level;
          var numInput = dom.qs('#tp-level', el);
          var rangeInput = dom.qs('#tp-level-range', el);
          if (t.id === 'tp-level-range' && numInput) numInput.value = level;
          if (t.id === 'tp-level' && rangeInput) rangeInput.value = level;
          ctx.save();
          renderResults();
        }
      });

      el.addEventListener('change', function (event) {
        var t = event.target;
        if (t.id === 'tp-mood') {
          values.moodBonusPct = Number(t.value) || 0;
          ctx.save();
          renderResults();
        }
      });

      dom.delegate(el, '[data-item]', 'click', function (event, target) {
        itemId = target.getAttribute('data-item');
        ctx.state.ui.trainingItem = itemId;
        dom.qsa('[data-item]', el).forEach(function (b) {
          b.classList.toggle('is-active', b === target);
        });
        ctx.save();
        renderResults();
        if (ctx.toast) {
          var p = layers.getTrainingPair(itemId);
          ctx.toast('训练项：' + p.name + '（' + p.primary + ' + ' + p.secondary + '）', 'ok');
        }
      });

      dom.delegate(el, '[data-preset]', 'click', function (event, target) {
        var preset = target.getAttribute('data-preset');
        if (preset === 'fresh') {
          level = 1;
          values.charSkillFlatBonus = 0;
          values.moodBonusPct = 0;
          ctx.state.ui.trainingLevel = 1;
          dom.qs('#tp-level', el).value = 1;
          dom.qs('#tp-level-range', el).value = 1;
          dom.qs('#tp-mood', el).value = '0';
          var skillInput = dom.qs('[data-param="charSkillFlatBonus"]', el);
          if (skillInput) skillInput.value = 0;
          ctx.save();
          renderResults();
          if (ctx.toast) ctx.toast('已重置为 Lv1 基础训练', 'ok');
        } else if (preset === 'sakuma') {
          values.charSkillFlatBonus = 4;
          var input = dom.qs('[data-param="charSkillFlatBonus"]', el);
          if (input) input.value = 4;
          ctx.save();
          renderResults();
          if (ctx.toast) ctx.toast('佐久间雨乃：期望 +4 点（3 + 50%×2）', 'ok');
        }
      });

      dom.delegate(el, '[data-goto-param]', 'click', function () {
        if (ctx.navigate) ctx.navigate('formulas');
      });

      renderResults();
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

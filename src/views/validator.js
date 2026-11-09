/*!
 * views/validator.js —— 验证器（T5）
 */
(function (root) {
  'use strict';
  var BBT = root.BBT = root.BBT || {};
  var views = BBT.views = BBT.views || {};
  var dom = BBT.dom;

  views.validator = {
    id: 'validator',
    nav: '验证器',
    icon: '🧪',
    title: '验证器',
    subtitle: '这个工具回答：我输入一屏面板/一次训练结果，当前模型预测得准不准？残差说明该补哪条数据？',
    dataNote:
      '来源：T3 calibration + 用户实机样本；残差与反解结果随样本更新',
    mount: function (el, ctx) {
      var format = BBT.format;
      var validator = BBT.validator;
      var growth = BBT.growth;
      var layers = BBT.attributeLayers;
      var roster = BBT.roster;
      var players = roster.playerList();
      var charData = (ctx.data && ctx.data.characters) || [];

      var html = '';
      html += '<div class="notice notice--info"><span class="notice-ico">🧭</span><span>' +
        dom.esc(validator.philosophy() || '所有关键系数做成可校准参数；输入实测值后反解参数并给残差。') +
        '</span></div>';

      html += '<div class="grid grid--2" style="align-items:start">';

      /* 训练样本验证 */
      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🏋️</span>训练样本验证</div>' +
        '<div class="card-sub">输入一次训练界面显示的主/副属性增加数字，反推副属性占比与残差。</div></div>' +
        dom.confBadge('实测') + '</div>' +
        '<div class="form-grid">' +
        '<div class="field"><label class="field-label" for="val-level">训练等级</label>' +
        '<div class="input-wrap"><input class="input" id="val-level" type="number" value="10" min="1" max="20"></div></div>' +
        '<div class="field"><label class="field-label" for="val-item">训练项</label>' +
        '<select class="select" id="val-item" style="width:100%">' +
        layers.TRAINING_PAIRS.map(function (p) {
          return '<option value="' + p.id + '">' + dom.esc(p.name + '（' + p.primary + '+' + p.secondary + '）') + '</option>';
        }).join('') + '</select></div>' +
        '<div class="field"><label class="field-label" for="val-main">实测主属性增加</label>' +
        '<div class="input-wrap"><input class="input" id="val-main" type="number" value="62" step="0.1"></div></div>' +
        '<div class="field"><label class="field-label" for="val-secondary">实测副属性增加</label>' +
        '<div class="input-wrap"><input class="input" id="val-secondary" type="number" value="31" step="0.1"></div></div>' +
        '</div>' +
        '<div id="val-train-result" style="margin-top:14px"></div>' +
        '</div>';

      /* 面板验证 */
      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">📋</span>面板验证（A 层六属性）</div>' +
        '<div class="card-sub">输入实测面板 → 用潜力曲线预测 → 算残差/MAE，判断成长阶段。</div></div>' +
        dom.confBadge('多源一致') + '</div>' +
        '<div class="field" style="margin-bottom:10px"><label class="field-label" for="val-char">选择角色（自动带出潜力与 wiki 面板）</label>' +
        '<select class="select" id="val-char" style="width:100%">' +
        players.map(function (p) {
          return '<option value="' + dom.esc(p.name) + '">' + dom.esc(p.name + '（' + p.rarity + '·' + p.position + '）') + '</option>';
        }).join('') + '</select></div>' +
        '<div class="form-grid">' +
        growth.CODEX_ATTRS.map(function (attr, i) {
          return '<div class="field"><label class="field-label" for="val-attr-' + i + '">' + attr + '</label>' +
            '<div class="input-wrap"><input class="input" data-val-attr="' + attr + '" id="val-attr-' + i + '" type="number" value="0" step="1"></div></div>';
        }).join('') +
        '</div>' +
        '<div class="row" style="margin-top:10px;gap:8px">' +
        '<button class="btn btn--sm" id="val-fill">填入所选角色 wiki 面板</button>' +
        '<button class="btn btn--sm btn--primary" id="val-panel-run">验证面板</button>' +
        '</div>' +
        '<div id="val-panel-result" style="margin-top:14px"></div>' +
        '</div>';

      html += '</div>';

      /* 校准清单 */
      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🧾</span>需要补充的数据（T3 校准清单）</div>' +
        '<div class="card-sub">按优先级采样这些数据，模型置信度会升级。</div></div></div>' +
        '<div class="table-wrap"><table class="table"><thead><tr><th>编号</th><th>模块</th><th>需要的数据</th><th>能反解</th></tr></thead><tbody>' +
        validator.verifierInputs().map(function (v) {
          return '<tr><td class="mono">' + dom.esc(v.id) + '</td><td>' + dom.esc(v.module) + '</td>' +
            '<td class="small">' + dom.esc(v.need) + '</td>' +
            '<td class="small muted">' + dom.esc((v.solves || []).join(', ')) + '</td></tr>';
        }).join('') +
        '</tbody></table></div>' +
        '</div>';

      el.innerHTML = html;

      var trainHost = dom.qs('#val-train-result', el);
      var panelHost = dom.qs('#val-panel-result', el);

      function pairOf(itemId) {
        return layers.getTrainingPair(itemId);
      }

      function renderTrain() {
        var level = Number(dom.qs('#val-level', el).value) || 1;
        var itemId = dom.qs('#val-item', el).value;
        var sample = {
          level: level,
          itemId: itemId,
          mainGain: Number(dom.qs('#val-main', el).value),
          secondaryGain: Number(dom.qs('#val-secondary', el).value)
        };
        var r = validator.validateTrainingSample(sample, ctx.state.values, pairOf(itemId));
        if (!r.ok) {
          trainHost.innerHTML = '<div class="notice notice--warn">' + dom.esc(r.error) + '</div>';
          return;
        }
        trainHost.innerHTML =
          '<div class="ledger">' +
          '<div class="ledger-row"><div class="ledger-label">模型预测主属性</div><div class="ledger-detail">' +
          dom.esc(r.predicted.formula) + '</div><div class="ledger-value">' + format.num(r.predicted.main, 1) + '</div></div>' +
          '<div class="ledger-row"><div class="ledger-label">模型预测副属性</div><div class="ledger-detail">主 × 占比</div>' +
          '<div class="ledger-value">' + format.num(r.predicted.secondary, 1) + '</div></div>' +
          '<div class="ledger-row ledger-row--total"><div class="ledger-label">实测 vs 预测残差</div><div class="ledger-detail">' +
          '实测 ' + (r.observed.main != null ? format.num(r.observed.main, 1) : '—') + '</div>' +
          '<div class="ledger-value">' + (r.residual.main != null ? format.signed(r.residual.main, 2) : '—') + '</div></div>' +
          '</div>' +
          '<div class="grid grid--2" style="gap:10px;margin-top:12px">' +
          '<div class="stat"><div class="stat-label">反解副属性占比</div><div class="stat-value num">' +
          (r.implied.secondaryRatio != null ? format.num(r.implied.secondaryRatio * 100, 1) + '<span class="unit">%</span>' : '—') +
          '</div><div class="stat-hint">模型默认 50%（区间 30~70%）</div></div>' +
          '<div class="stat"><div class="stat-label">反解暴击加成</div><div class="stat-value num">' +
          (r.implied.critBonusPct != null ? format.signed(r.implied.critBonusPct, 1) + '<span class="unit">%</span>' : '—') +
          '</div><div class="stat-hint">若未暴击应接近 0</div></div>' +
          '</div>' +
          '<div class="notice ' + (r.verdict.indexOf('吻合') >= 0 ? 'notice--ok' : 'notice--warn') + '" style="margin-top:12px"><span class="notice-ico">🔬</span><span>' +
          dom.esc(r.verdict) + ' · 需要的数据：训练等级/在场人数/经理/对口器材/是否暴击（V1、V2）</span></div>';
      }

      function fillPanel() {
        var name = dom.qs('#val-char', el).value;
        var p = players.filter(function (x) { return x.name === name; })[0];
        var ch = charData.filter(function (x) { return x.name === name; })[0];
        var stats = (p && p.stats) || (ch && ch.stats) || {};
        growth.CODEX_ATTRS.forEach(function (attr, i) {
          var input = dom.qs('#val-attr-' + i, el);
          if (input) input.value = stats[attr] != null ? stats[attr] : 0;
        });
      }

      function renderPanel() {
        var name = dom.qs('#val-char', el).value;
        var p = players.filter(function (x) { return x.name === name; })[0];
        var ch = charData.filter(function (x) { return x.name === name; })[0];
        var observed = {};
        growth.CODEX_ATTRS.forEach(function (attr, i) {
          observed[attr] = Number(dom.qs('#val-attr-' + i, el).value) || 0;
        });
        var r = validator.validatePanel(
          { rarity: (p && p.rarity) || 'SSR', observed: observed },
          ch || p
        );
        if (!r.ok) {
          panelHost.innerHTML = '<div class="notice notice--warn">' + dom.esc(r.error) + '</div>';
          return;
        }
        panelHost.innerHTML =
          '<div class="table-wrap"><table class="table"><thead><tr>' +
          '<th>属性</th><th class="num">预测</th><th class="num">实测</th><th class="num">残差</th></tr></thead><tbody>' +
          growth.CODEX_ATTRS.map(function (attr) {
            var res = r.residuals[attr];
            return '<tr><td>' + attr + '</td><td class="num">' + format.num(r.predicted[attr], 1) + '</td>' +
              '<td class="num">' + format.num(observed[attr], 0) + '</td>' +
              '<td class="num">' + (res != null ? format.signed(res, 1) : '—') + '</td></tr>';
          }).join('') +
          '</tbody></table></div>' +
          '<div class="grid grid--3" style="gap:10px;margin-top:12px">' +
          '<div class="stat"><div class="stat-label">MAE</div><div class="stat-value num">' + format.num(r.mae, 2) + '</div></div>' +
          '<div class="stat"><div class="stat-label">最大残差</div><div class="stat-value num">' + format.num(r.maxAbs, 2) + '</div></div>' +
          '<div class="stat"><div class="stat-label">最贴合稀有度</div><div class="stat-value num" style="font-size:22px">' +
          dom.esc(r.bestRarity) + '</div><div class="stat-hint">MAE ' + format.num(r.bestMae, 2) + '</div></div>' +
          '</div>' +
          '<div class="notice ' + (r.mae != null && r.mae <= 4 ? 'notice--ok' : 'notice--warn') + '" style="margin-top:12px"><span class="notice-ico">🔬</span><span>' +
          dom.esc(r.verdict) + ' ' + dom.esc(r.hint) + '</span></div>';
      }

      dom.qs('#val-item', el).addEventListener('change', renderTrain);
      dom.qs('#val-level', el).addEventListener('input', renderTrain);
      dom.qs('#val-main', el).addEventListener('input', renderTrain);
      dom.qs('#val-secondary', el).addEventListener('input', renderTrain);
      dom.qs('#val-char', el).addEventListener('change', fillPanel);
      dom.qs('#val-fill', el).addEventListener('click', fillPanel);
      dom.qs('#val-panel-run', el).addEventListener('click', renderPanel);
      dom.qsa('[data-val-attr]', el).forEach(function (input) {
        input.addEventListener('input', renderPanel);
      });
      fillPanel();
      renderTrain();
      renderPanel();
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

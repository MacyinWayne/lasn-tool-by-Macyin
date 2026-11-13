/*!
 * views/formulas.js —— 公式卡 / 参数编辑 / 机制资料
 */
(function (root) {
  'use strict';
  var BBT = root.BBT = root.BBT || {};
  var views = BBT.views = BBT.views || {};
  var dom = BBT.dom;

  function formatJson(obj) {
    try {
      return JSON.stringify(obj, null, 2);
    } catch (err) {
      return '{}';
    }
  }

  function copyText(text) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', 'readonly');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try {
        ok = document.execCommand('copy');
      } catch (err) {
        ok = false;
      }
      if (ta.parentNode) ta.parentNode.removeChild(ta);
      return ok;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(
        function () {
          return true;
        },
        function () {
          return fallback();
        }
      );
    }
    return Promise.resolve(fallback());
  }

  function trainingFormulaHtml(values) {
    var format = BBT.format;
    return (
      '<div class="formula-box">' +
      '<span class="fx-var">( 训练项基础 + (等级−1)×' +
      format.num(values.trainLevelStep, 1) + ' <span class="fx-op">+</span> ' +
      format.num(values.personnelBonus, 1) + ' <span class="fx-op">+</span> ' +
      format.num(values.gearBonus, 1) + ' <span class="fx-op">+</span> ' +
      format.num(values.charSkillFlatBonus, 1) + ' )</span><br/>' +
      '<span class="fx-op">×</span> <span class="fx-var">(1 + Σ训练加成 ' +
      format.signed(values.trainingBonusPct, 0) + '% + 心情 ' +
      format.signed(values.moodBonusPct, 0) + '%)</span> ' +
      '<span class="fx-op">×</span> <span class="fx-var">(1 + 暴击 ' +
      format.num(values.gearCritBonusPct, 0) + '%)</span> ' +
      '<span class="fx-op">×</span> <span class="fx-var">(1 + 场地 ' +
      format.signed(values.venueBonusPct, 0) + '%)</span><br/>' +
      '<span class="fx-op">+</span> <span class="fx-var">' + format.num(values.flatAttrBonus, 0) +
      '</span> <span class="fx-op">（主属性加值，尾项：不乘乘区）</span><br/>' +
      '<span class="fx-op">副属性 = 主属性收益 × ' +
      format.num(values.secondarySharePct, 0) + '%（T3 模型默认 50%，区间 30~70%，待验证）</span>' +
      '</div>'
    );
  }

  function attributeLayersHtml() {
    var layers = BBT.attributeLayers;
    var cards = layers.LAYERS.map(function (layer) {
      var attrs = layer.attributes
        .map(function (a) {
          var isMissing = layer.id === 'C' && a.inCodex === false;
          var mapping = a.mapping ? '（→ ' + a.mapping.join(' + ') + '）' : '';
          return (
            '<span class="layer-attr' + (isMissing ? ' dim' : '') + '" title="' +
            dom.esc(isMissing ? '客户端已确证该属性，数值来源待补全' : a.name + mapping) + '">' +
            dom.esc(a.name) + dom.esc(mapping) + '</span>'
          );
        })
        .join('');
      return (
        '<div class="layer-card">' +
        '<div class="layer-card-head">' +
        '<span class="layer-badge" data-layer="' + layer.id + '">' + layer.id + '</span>' +
        '<div><div class="layer-name">' + dom.esc(layer.name) + '</div>' +
        '<div class="layer-use">' + dom.esc(layer.usage) + '</div></div>' +
        '</div>' +
        '<div class="layer-attrs">' + attrs + '</div>' +
        '<div class="layer-note">' + dom.esc(layer.note) + '</div>' +
        '</div>'
      );
    }).join('');

    var pairRows = layers.TRAINING_PAIRS.map(function (p) {
      return (
        '<tr><td><strong>' + dom.esc(p.name) + '</strong></td>' +
        '<td><span class="tag tag--orange">' + dom.esc(p.primary) + '</span></td>' +
        '<td><span class="tag tag--blue">' + dom.esc(p.secondary) + '</span></td>' +
        '<td>' + dom.confBadge(p.confidence) + '</td></tr>'
      );
    }).join('');

    return (
      '<div class="layer-grid">' + cards + '</div>' +
      '<div class="notice" style="margin-top:12px"><span class="notice-ico">🧬</span><span>' +
      '<strong>三层不混算：</strong>A 层只用于训练公式；B 层点数通过映射提升 C 层；' +
      '图鉴评分只在 C 层内部比较。GameKee 六维 = C 层子集（' +
      layers.codexMissingAttributes().map(function (a) { return a.name; }).join(' / ') +
      ' 待客户端补全）。来源：' + dom.esc(layers.SOURCE) + '</span></div>' +
      '<div class="section-label" style="margin-top:16px">训练项 → 双属性配对（寒溟实机验证 2026-11-05）</div>' +
      '<div class="table-wrap"><table class="table" style="min-width:560px"><thead><tr>' +
      '<th>训练项</th><th>主属性（A 层）</th><th>副属性（A 层）</th><th>置信度</th>' +
      '</tr></thead><tbody>' + pairRows + '</tbody></table></div>' +
      '<div class="small muted" style="margin-top:8px">实机训练界面预测值校正：投射→运控 / 弹跳→意识 / 防守→体能 / ' +
      '体能→弹跳 / 运控→防守 / 意识→体能；旧版 edu_train_conf 原文配对（弹跳→体能 等）已被实机推翻，以公测实机为准。</div>'
    );
  }

  function expressionFormulaHtml(state) {
    var format = BBT.format;
    var values = state.values;
    var skillsText = state.teamSkills.length
      ? state.teamSkills
          .map(function (s) {
            return s.name + ' +' + format.num(s.bonusPct, 1) + '%';
          })
          .join('，')
      : '（未上阵角色）';
    var extrasText = state.consistencyExtras.length
      ? state.consistencyExtras
          .map(function (s) {
            return s.name + ' +' + format.num(s.extra, 2);
          })
          .join('，')
      : '（无）';
    return (
      '<div class="formula-box">' +
      '<span class="fx-var">爆发倍率 = ( 1 <span class="fx-op">+</span> Σ每个参与者的(表情基础 + 角色技能加成) )' +
      ' <span class="fx-op">×</span> 一致乘区</span><br/>' +
      '<span class="fx-var">表情基础</span> <span class="fx-op">=</span> 大笑 <span class="fx-const">' +
      format.num(values.exprLaughBonusPct, 0) + '%</span> / 微笑 <span class="fx-const">' +
      format.num(values.exprSmileBonusPct, 0) + '%</span> / 哭脸 <span class="fx-const">' +
      format.num(values.exprCryBonusPct, 0) + '%</span><br/>' +
      '<span class="fx-var">角色技能加成（每个参与者都吃）</span> <span class="fx-op">=</span> ' + dom.esc(skillsText) + '<br/>' +
      '<span class="fx-var">一致乘区（实测表）</span> <span class="fx-op">=</span> 仅全员同款且 ≥2 人：2 人 <span class="fx-const">×' +
      format.num(values.exprConsistency2, 2) + '</span> / 3 人 <span class="fx-const">×' +
      format.num(values.exprConsistency3, 2) + '</span> / 4 人 <span class="fx-const">×' +
      format.num(values.exprConsistency4, 2) + '</span> / 5 人 <span class="fx-const">×' +
      format.num(values.exprConsistency5, 2) + '</span> / 6 人 <span class="fx-const">×' +
      format.num(values.exprConsistency6, 2) + '</span> + 额外（' + dom.esc(extrasText) + '）；' +
      '7/8/9 人按 1+0.25×人数 银行家舍入推算 = 2.8 / 3.0 / 3.2·待实测；混合/单人 <span class="fx-const">×1</span>' +
      '</div>'
    );
  }

  function cardMappingHtml() {
    var mechanics = BBT.mechanics;
    var rows = mechanics.CARD_MAPPINGS.map(function (m) {
      var weights = m.weights
        .map(function (w) {
          return (
            '<span class="tag" style="margin-right:6px">' + dom.esc(w.attr) + ' ' +
            w.pct + '%</span>'
          );
        })
        .join('');
      var actions = m.actions
        .map(function (a) {
          return '<span class="tag">' + dom.esc(a) + '</span>';
        })
        .join(' ');
      return (
        '<tr>' +
        '<td><span class="row" style="gap:6px;flex-wrap:nowrap">' +
        '<span style="display:inline-block;width:10px;height:10px;border-radius:3px;background:' +
        dom.esc(m.color === 'red' ? '#dc2626' : m.color === 'green' ? '#059669' : m.color === 'blue' ? '#2563eb' : '#475569') +
        '"></span><strong>' + dom.esc(m.cardName) + '</strong></span>' +
        '<div class="small muted">' + dom.esc(m.colorName) + ' · ' + dom.esc(m.side) + '</div></td>' +
        '<td>' + actions + '</td>' +
        '<td>' + weights + '</td>' +
        '<td>' + dom.confBadge(m.confidence) + '</td>' +
        '</tr>'
      );
    }).join('');
    return (
      '<div class="table-wrap"><table class="table" style="min-width:680px"><thead><tr>' +
      '<th>卡名</th><th>卡内动作</th><th>属性权重</th><th>置信度</th>' +
      '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="notice" style="margin-top:12px"><span class="notice-ico">ℹ️</span><span>' +
      '来源：内测截图人工 OCR（Lead 提供，2026-11-05）。' +
      '内测属性名（弹跳/投射/运控/防守）与公测面板六维（投射/攻筐/防投/护筐/传球/突破）的映射' +
      '尚未完全校对，标为单源。防守卡为混合权重：30% 对应属性 + 70% 防守。</span></div>'
    );
  }

  function trainingMechanicsHtml() {
    var mechanics = BBT.mechanics;
    return mechanics.TRAINING_MECHANICS.map(function (m) {
      return (
        '<div class="skill-item">' +
        '<div class="skill-head"><span class="skill-name">' + dom.esc(m.title) + '</span>' +
        '<span class="tag tag--orange">' + dom.esc(m.kind) + '</span>' + dom.confBadge(m.confidence) +
        '</div>' +
        '<div class="skill-desc">' + dom.esc(m.text) + '</div>' +
        '<div class="small muted" style="margin-top:6px">期望：' + dom.esc(m.expectedFormula) + '</div>' +
        '<div class="skill-costs"><span>来源：' + dom.esc(m.source) + '</span></div>' +
        '<div class="small muted" style="margin-top:4px">' + dom.esc(m.note) + '</div>' +
        '</div>'
      );
    }).join('');
  }

  function termMappingHtml() {
    var mechanics = BBT.mechanics;
    var rows = mechanics.TERM_MAPPINGS.map(function (m) {
      return (
        '<tr><td>' + dom.esc(m.beta) + '</td><td>' + dom.esc(m.live) + '</td>' +
        '<td>' + dom.confBadge(m.confidence) + '</td></tr>'
      );
    }).join('');
    return (
      '<div class="table-wrap"><table class="table" style="min-width:560px"><thead><tr>' +
      '<th>测试期叫法</th><th>公测面板</th><th>置信度</th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table></div>' +
      '<p class="small muted" style="margin-top:10px">来源：README 已核实——社区公式多来自 2026 年 5–10 月测试期，' +
      '属性命名需按公测证据校对。工具里默认按公测面板命名，机制卡保留内测原名。</p>'
    );
  }

  function paramRow(def, values) {
    var val = values[def.id];
    return (
      '<div class="param-row" data-row="' + def.id + '" style="display:grid;grid-template-columns:minmax(190px,1.25fr) 150px minmax(150px,1fr) 36px;gap:12px;align-items:center;padding:12px 0;border-bottom:1px dashed var(--line)">' +
      '<div>' +
      '<div class="row" style="gap:7px"><strong style="font-size:13px">' + dom.esc(def.label) + '</strong>' +
      dom.confBadge(def.confidence) + '</div>' +
      '<div class="small muted" style="margin-top:3px;line-height:1.5">' + dom.esc(def.note) + '</div>' +
      '</div>' +
      '<div class="input-wrap">' +
      '<input class="input" type="number" data-param="' + def.id + '" value="' + val + '" ' +
      'min="' + def.min + '" max="' + def.max + '" step="' + def.step + '" ' +
      'id="fp-' + def.id + '">' +
      '<span class="input-unit">' + dom.esc(def.unit) + '</span>' +
      '</div>' +
      '<div class="small muted" title="' + dom.esc(def.source) + '" style="line-height:1.5;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">' +
      dom.esc(def.source) + '</div>' +
      '<button class="icon-btn" data-reset-param="' + def.id + '" title="恢复默认值 ' + def.value +
      '" style="width:32px;height:32px;padding:0" aria-label="恢复默认值">↺</button>' +
      '</div>'
    );
  }

  function paramGroupsHtml(values) {
    var params = BBT.params;
    return params.PARAM_GROUPS.map(function (group) {
      var defs = params.PARAM_DEFS.filter(function (d) {
        return d.group === group;
      });
      if (!defs.length) return '';
      return (
        '<details class="fold" open>' +
        '<summary class="section-label" style="cursor:pointer;margin:0 0 4px">' + dom.esc(group) +
        '<span class="badge badge--neutral badge--plain">' + defs.length + ' 项</span>' +
        '<span class="fold-hint tiny muted">点击折叠/展开</span></summary>' +
        '<div class="fold-body" style="padding-bottom:8px">' +
        defs.map(function (d) { return paramRow(d, values); }).join('') +
        '</div></details>'
      );
    }).join('');
  }

  function latestFindingsHtml(ctx) {
    var gd = ctx.gameData;
    var f = gd ? gd.formulas() : null;
    var meta = gd ? gd.meta() : { dataVersion: '', updatedAt: '' };
    if (!f) return '';
    var consistency = f.expressionConsistency;
    var consistencyRows = Object.keys(consistency)
      .filter(function (k) { return /^\d+$/.test(k); })
      .map(function (k) {
        var n = Number(k);
        var measured = consistency.measuredCounts.indexOf(n) >= 0;
        return '<tr><td>' + n + ' 人</td><td class="num strong">×' + consistency[k] +
          '</td><td>' + (measured ? '<span class="badge badge--ok">实测</span>'
            : '<span class="badge badge--warn">推算·待实测</span>') + '</td></tr>';
      }).join('');
    var ta = f.trainingAudit;
    return (
      '<div class="card card--pad" id="latest-findings" style="margin-bottom:18px">' +
      '<div class="card-head"><div><div class="card-title"><span class="ico">🆕</span>最新结论（T6 初版集中区）</div>' +
      '<div class="card-sub">最新实测/初版公式集中在这里；页面不写死常量，均来自 core/game-data.js。</div></div>' +
      '<span class="badge badge--warn">初版 / 待复核</span></div>' +
      '<div class="grid grid--3" style="gap:14px;align-items:start">' +
      '<div class="card card--pad" style="box-shadow:none"><div class="section-label">表情一致乘区（实测表）</div>' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>一致人数</th><th class="num">乘区</th><th>状态</th></tr></thead><tbody>' +
      consistencyRows + '</tbody></table></div>' +
      '<div class="tiny muted" style="margin-top:6px">' + dom.esc(consistency.rule) + '</div></div>' +
      '<div class="card card--pad" style="box-shadow:none"><div class="section-label">训练公式审计（初版）</div>' +
      '<div class="table-wrap"><table class="table"><tbody>' +
      '<tr><td>经理加值</td><td class="num strong">+' + ta.managerBonus.value + ' 点</td><td>' + dom.confBadge(ta.managerBonus.confidence) + '</td></tr>' +
      '<tr><td>陪练加值</td><td class="num strong">+' + ta.assistantBonus.value + ' 点</td><td>' + dom.confBadge(ta.assistantBonus.confidence) + '</td></tr>' +
      '<tr><td>对口器材</td><td class="num strong">+' + ta.equipmentBonus.value + ' 点</td><td>' + dom.confBadge(ta.equipmentBonus.confidence) + '</td></tr>' +
      '<tr><td>成长率</td><td class="num strong">×' + (ta.growthRate.value / 100) + '</td><td>' + dom.confBadge(ta.growthRate.confidence) + '</td></tr>' +
      '</tbody></table></div>' +
      '<div class="tiny muted" style="margin-top:6px">成长率按乘算处理；旧「人员 +5」参数为社区公式，待与新审计合并。</div></div>' +
      '<div class="card card--pad" style="box-shadow:none"><div class="section-label">PvP 判定（初版）</div>' +
      '<div class="formula-box" style="font-size:12px">' +
      '<span class="fx-var">' + dom.esc(f.pvp.hitFormula) + '</span><br/>' +
      '<span class="fx-var">' + dom.esc(f.pvp.baseFormula) + '</span>' +
      '</div>' +
      '<div class="tiny muted" style="margin-top:6px">A / B / 干扰系数待实验反解；当前仅展示公式结构，不参与计算。</div></div>' +
      '</div>' +
      '<div class="small muted" style="margin-top:10px">数据版本 ' + dom.esc(meta.dataVersion) +
      '（' + dom.esc(meta.updatedAt) + '）· 来源：' + dom.esc(f.pvp.source + '；' + f.expressionConsistency.source) +
      '</div></div>'
    );
  }

  function confidenceTableHtml() {
    var params = BBT.params;
    var maxLevel = Math.max.apply(
      null,
      params.CONFIDENCE_ORDER.map(function (id) { return params.CONFIDENCE[id].level; })
    );
    var rows = params.CONFIDENCE_ORDER.map(function (id) {
      var c = params.CONFIDENCE[id];
      return (
        '<tr><td>' + dom.confBadge(id) + '</td><td class="small">' + dom.esc(c.desc) + '</td>' +
        '<td class="small muted">' + c.level + '/' + maxLevel + '</td></tr>'
      );
    }).join('');
    return (
      '<div class="table-wrap"><table class="table" style="min-width:520px"><thead><tr>' +
      '<th>标签</th><th>含义</th><th class="num">强度</th></tr></thead><tbody>' + rows +
      '</tbody></table></div>'
    );
  }

  views.formulas = {
    id: 'formulas',
    nav: '公式卡',
    icon: '🧾',
    title: '公式卡与参数',
    subtitle: '这里是一切的源头：每个参数都可编辑、都带来源与置信度。改完后训练/表情/图鉴同步更新，数据存在浏览器本地。',
    dataNote:
      '来源：T3 model.json + 客户端逆向 + 寒溟实机 2026-11-05；「初版/待复核」项已标注',
    mount: function (el, ctx) {
      var format = BBT.format;
      var params = BBT.params;
      var values = ctx.state.values;

      var html = '';
      html +=
        '<div class="spread" style="margin-bottom:16px">' +
        '<div class="row" style="gap:10px">' +
        '<span class="badge badge--ok">共 ' + params.PARAM_DEFS.length + ' 项可调参数</span>' +
        '<span class="badge badge--info">修改自动保存到本地</span>' +
        '<span class="badge badge--neutral">数据版本 ' +
        dom.esc(ctx.gameData ? ctx.gameData.meta().dataVersion : '—') + '</span>' +
        '</div>' +
        '<div class="row" style="gap:8px">' +
        '<button class="btn btn--sm" id="export-params">导出参数 JSON</button>' +
        '<button class="btn btn--sm" id="export-config">导出用户配置</button>' +
        '<button class="btn btn--sm" id="import-config">导入用户配置</button>' +
        '<button class="btn btn--sm btn--danger" id="reset-all">恢复默认参数</button>' +
        '</div></div>';

      // 最新结论集中区（T6）
      html += latestFindingsHtml(ctx);

      // 公式卡
      html += '<div class="grid grid--2">';
      html +=
        '<div class="card card--pad card--accent">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🏋️</span>训练收益公式（A 层）</div>' +
        '<div class="card-sub">一个训练项同时结算主 / 副两项属性；A 层六属性，意识项基础值 8。</div></div>' +
        dom.confBadge('客户端确证') + '</div>' +
        '<div id="live-training-formula">' + trainingFormulaHtml(values) + '</div>' +
        '<div class="formula-desc">括号内是固定项与等级成长，四个乘区分开计算，尾项「主属性加值」不受放大。' +
        '双属性配对（投射→运控、弹跳→意识 等）以寒溟实机验证（2026-11-05 公测）为准；副属性占比实测约 33%~50%，待更多样本。</div>' +
        '<div class="row" style="margin-top:12px"><button class="btn btn--sm" data-goto="training">去训练计算器验证</button></div>' +
        '</div>';

      html +=
        '<div class="card card--pad card--blue">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">💥</span>表情爆发公式（新默认 · 实测定稿）</div>' +
        '<div class="card-sub">按表情构成：大笑 20% / 微笑 10% / 哭脸 0%；混合只线性相加，全一致才乘一致乘区。</div></div>' +
        dom.confBadge('实测') + '</div>' +
        '<div id="live-expression-formula">' + expressionFormulaHtml(ctx.state) + '</div>' +
        '<div class="formula-desc">实测锚点：2 哭脸一致 = <strong>150%</strong>；3 微笑一致 = <strong>234%</strong>（1.3×1.8）；' +
        '3 大笑一致 = <strong>288%</strong>（1.6×1.8）；4 大笑一致 = <strong>360%</strong>（1.8×2.0）；' +
        '5 微笑一致 = <strong>330%</strong>（1.5×2.2）；' +
        '1 大笑+1 微笑 = <strong>130%</strong>；3 大笑+1 哭脸 = <strong>160%</strong>；' +
        '6 大笑一致 + 望月8% + 龙宫寺4% + 真崎0.25 = <strong>803%</strong>（2.92×2.75）。' +
        '7/8/9 人一致乘区为银行家舍入推算（2.8/3.0/3.2）·待实测。</div>' +
        '<div class="row" style="margin-top:12px"><button class="btn btn--sm" data-goto="expression">去表情优化器复现</button></div>' +
        '</div>';
      html += '</div>';

      // 属性体系（A / B / C 三层）—— 客户端确证，本项目最重要的机制发现之一
      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🧬</span>属性体系说明（A / B / C 三层）</div>' +
        '<div class="card-sub">客户端配置 cw_conf.archive 逆向确证：游戏有三套属性维度，用途完全不同，不能混算。</div></div>' +
        dom.confBadge('客户端确证') +
        '</div>' +
        attributeLayersHtml() +
        '</div>';

      // 赛内属性换算（客户端确证默认值，个别 buff 偏移）
      var conv = BBT.mechanics.BATTLE_CONVERSION;
      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">⚔️</span>赛内属性换算（客户端确证 · 版本差异）</div>' +
        '<div class="card-sub">当前版本面板值 = 赛内值；旧版回放才是 ×1.6 / ×0.8。</div></div>' +
        dom.confBadge('客户端确证') + '</div>' +
        '<div class="table-wrap"><table class="table"><thead><tr><th>版本 / 属性</th><th class="num">默认系数</th><th>说明</th></tr></thead><tbody>' +
        '<tr><td><strong>当前版本（默认）</strong> · A 层六属性</td><td class="num strong">×' +
        conv.currentMultiplier.toFixed(1) + '</td><td class="small muted">赛内值 = 面板值（客户端回放交叉验证）</td></tr>' +
        '<tr><td>旧版回放（legacy） · A 层六属性</td><td class="num">×' +
        conv.legacyMultiplier.toFixed(1) + '</td><td class="small muted">仅供复现旧对局，模拟器里可切换</td></tr>' +
        '<tr><td>旧版回放（legacy） · C 层 111/114/115</td><td class="num">×' +
        conv.legacyLowMultiplier.toFixed(1) + '</td><td class="small muted">旧格式回放的低系数子属性</td></tr>' +
        '</tbody></table></div>' +
        '<div class="small muted" style="margin-top:8px">属性 ID：101 投射 / 102 弹跳 / 103 防守 / 104 体能 / 105 运控 / 106 意识；' +
        '评分 rank ≈ Σ 六属性（10 人样本 7 人精确相等，3 人 +15/+30 偏移）。</div>' +
        '<div class="notice notice--warn" style="margin-top:12px"><span class="notice-ico">⚠️</span><span>' +
        dom.esc(conv.note) + ' 来源：' + dom.esc(conv.source) + '</span></div>' +
        '</div>';

      // 参数编辑
      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🎛️</span>参数总表</div>' +
        '<div class="card-sub">每一行 = 一个公式参数。改数值即时生效；右侧圆点悬停可查看来源。</div></div>' +
        '<span class="badge badge--warn" title="T3 全模型就绪后，这里会补充比赛/养成/资源参数">当前阶段：训练 + 表情</span>' +
        '</div>' +
        '<div id="param-groups">' + paramGroupsHtml(values) + '</div>' +
        '</div>';

      // 机制卡
      html += '<div class="grid grid--2">';
      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🃏</span>攻防卡 → 属性映射</div>' +
        '<div class="card-sub">内测截图机制：卡牌动作决定属性权重。</div></div></div>' +
        cardMappingHtml() +
        '</div>';
      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🧑‍🏫</span>训练流角色技能 / 升星效果</div>' +
        '<div class="card-sub">来自内测截图 OCR 的机制样本，已接入训练计算器可调项。</div></div></div>' +
        '<div class="skill-list">' + trainingMechanicsHtml() + '</div>' +
        '</div>';
      html += '</div>';

      html += '<div class="grid grid--2">';
      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🔤</span>属性术语对照</div>' +
        '<div class="card-sub">测试期 vs 公测面板，版本差异必须先对齐。</div></div></div>' +
        termMappingHtml() +
        '</div>';
      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">📚</span>置信度分级</div>' +
        '<div class="card-sub">工具内每个数字都挂一个标签；低置信度参数请谨慎使用。</div></div></div>' +
        confidenceTableHtml() +
        '<div class="notice notice--info" style="margin-top:12px"><span class="notice-ico">🔗</span><span>' +
        '数据链路：<span class="inline-code">data/structured/characters.json</span>（T1）→ ' +
        '<span class="inline-code">tool/scripts/build-data.mjs</span> → ' +
        '<span class="inline-code">tool/src/data/characters.js</span>；' +
        '公式模型：<span class="inline-code">knowledge/model.json</span>（T3）就绪后由 T5 接入。</span></div>' +
        '</div>';
      html += '</div>';

      el.innerHTML = html;

      var groupsHost = dom.qs('#param-groups', el);

      function refreshLive() {
        dom.qs('#live-training-formula', el).innerHTML = trainingFormulaHtml(values);
        dom.qs('#live-expression-formula', el).innerHTML = expressionFormulaHtml(ctx.state);
      }

      function refreshGroups() {
        groupsHost.innerHTML = paramGroupsHtml(values);
      }

      // 参数输入
      el.addEventListener('input', function (event) {
        var t = event.target;
        if (!t.matches || !t.matches('[data-param]')) return;
        var pid = t.getAttribute('data-param');
        var def = params.byId[pid];
        if (!def) return;
        var raw = Number(t.value);
        if (!isFinite(raw)) return;
        values[pid] = params.roundToStep(params.clampValue(raw, def.min, def.max), def.step);
        ctx.save();
        refreshLive();
      });

      el.addEventListener('change', function (event) {
        var t = event.target;
        if (!t.matches || !t.matches('[data-param]')) return;
        var pid = t.getAttribute('data-param');
        var def = params.byId[pid];
        if (!def) return;
        t.value = values[pid];
      });

      // 单参数恢复默认
      dom.delegate(el, '[data-reset-param]', 'click', function (event, target) {
        var pid = target.getAttribute('data-reset-param');
        var def = params.byId[pid];
        if (!def) return;
        values[pid] = def.value;
        var input = dom.qs('[data-param="' + pid + '"]', el);
        if (input) input.value = def.value;
        ctx.save();
        refreshLive();
        if (ctx.toast) ctx.toast('「' + def.label + '」已恢复默认值 ' + def.value + def.unit, 'ok');
      });

      // 全部恢复
      dom.qs('#reset-all', el).addEventListener('click', function () {
        var defaults = params.getDefaults();
        Object.keys(defaults).forEach(function (k) {
          values[k] = defaults[k];
        });
        ctx.state.teamSkills = params.DEFAULT_TEAM_SKILLS.map(function (s) {
          return Object.assign({}, s);
        });
        ctx.state.consistencyExtras = params.DEFAULT_CONSISTENCY_EXTRAS.map(function (s) {
          return Object.assign({}, s);
        });
        ctx.save();
        refreshGroups();
        refreshLive();
        if (ctx.toast) ctx.toast('已恢复全部默认参数（含上阵角色加值）', 'ok');
      });

      // 导出
      dom.qs('#export-params', el).addEventListener('click', function () {
        var payload = {
          exportedAt: new Date().toISOString(),
          tool: '篮球少女：飞跃巅峰 · 数值工具包',
          state: ctx.state
        };
        var json = formatJson(payload);
        var m = dom.modal({
          title: '导出参数 JSON',
          subtitle: '可复制保存，或贴到 issue / 讨论里帮忙复核',
          bodyHtml:
            '<div class="notice notice--info"><span class="notice-ico">📋</span><span>' +
            '本工具的参数状态（含置信度来源不在 JSON 里，来源见参数表）。</span></div>' +
            '<textarea id="export-text" class="formula-box" readonly style="width:100%;height:320px;resize:vertical;font-family:var(--font-mono);font-size:12px">' +
            dom.esc(json) + '</textarea>' +
            '<div class="row" style="margin-top:12px"><button class="btn btn--primary btn--sm" id="copy-export">复制到剪贴板</button></div>',
          width: 720
        });
        var copyBtn = m.body.querySelector('#copy-export');
        copyBtn.addEventListener('click', function () {
          copyText(json).then(function (ok) {
            if (ctx.toast) ctx.toast(ok ? '已复制参数 JSON' : '复制失败，请手动全选复制', ok ? 'ok' : 'warn');
          });
        });
      });

      // 导出用户配置（store 统一版本号 + 我的角色 + 参数）
      dom.qs('#export-config', el).addEventListener('click', function () {
        var store = ctx.store;
        if (!store) {
          if (ctx.toast) ctx.toast('store 未初始化', 'warn');
          return;
        }
        var json = formatJson(store.exportConfig());
        var m = dom.modal({
          title: '导出用户配置',
          subtitle: '包含我的角色 + 参数状态 + 角色笔记 + 配队方案 + 养成配法/技能规划 + 器材笔记/关联/按角色配置 + 版本号；可保存/迁移/备份',
          bodyHtml:
            '<div class="notice notice--info"><span class="notice-ico">💾</span><span>' +
            '导入到其它浏览器/设备后，我的角色、参数、笔记、配队方案、养成配法/技能规划与器材笔记/关联/按角色配置会自动恢复；schema v' +
            store.CONFIG_SCHEMA_VERSION + '。</span></div>' +
            '<textarea class="formula-box" readonly style="width:100%;height:320px;resize:vertical;font-family:var(--font-mono);font-size:12px">' +
            dom.esc(json) + '</textarea>' +
            '<div class="row" style="margin-top:12px"><button class="btn btn--primary btn--sm" id="copy-config">复制到剪贴板</button></div>',
          width: 720
        });
        m.body.querySelector('#copy-config').addEventListener('click', function () {
          copyText(json).then(function (ok) {
            if (ctx.toast) ctx.toast(ok ? '已复制用户配置' : '复制失败，请手动全选复制', ok ? 'ok' : 'warn');
          });
        });
      });

      // 导入用户配置
      dom.qs('#import-config', el).addEventListener('click', function () {
        var store = ctx.store;
        if (!store) {
          if (ctx.toast) ctx.toast('store 未初始化', 'warn');
          return;
        }
        var m = dom.modal({
          title: '导入用户配置',
          subtitle: '粘贴此前导出的 JSON；导入后我的角色与参数将覆盖当前值',
          bodyHtml:
            '<div class="notice notice--warn"><span class="notice-ico">⚠️</span><span>' +
            '导入会覆盖当前「我的角色」与参数状态，请确认已备份。</span></div>' +
            '<textarea id="import-text" class="formula-box" style="width:100%;height:280px;resize:vertical;font-family:var(--font-mono);font-size:12px" placeholder="粘贴配置 JSON…"></textarea>' +
            '<div class="row" style="margin-top:12px"><button class="btn btn--primary btn--sm" id="do-import">导入并应用</button></div>',
          width: 720
        });
        m.body.querySelector('#do-import').addEventListener('click', function () {
          var text = m.body.querySelector('#import-text').value;
          var res = store.importConfig(text);
          if (res.ok) {
            m.close();
            if (ctx.toast) ctx.toast('用户配置已导入', 'ok');
          } else if (ctx.toast) {
            ctx.toast('导入失败：' + res.errors.join('；'), 'warn');
          }
        });
      });

      dom.delegate(el, '[data-goto]', 'click', function (event, target) {
        if (ctx.navigate) ctx.navigate(target.getAttribute('data-goto'));
      });
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

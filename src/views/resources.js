/*!
 * views/resources.js —— 资源规划 / ROI（T5）
 */
(function (root) {
  'use strict';
  var BBT = root.BBT = root.BBT || {};
  var views = BBT.views = BBT.views || {};
  var dom = BBT.dom;

  var STREAMS = ['训练流', '扭蛋流', '商店流', '小游戏流'];

  function weightsFor(stream) {
    if (stream === '训练流') return { 体能: 2, 弹跳: 2, 防守: 2, 投射: 1, 运控: 1, 意识: 1 };
    if (stream === '扭蛋流') return { 投射: 1, 弹跳: 1, 防守: 1, 体能: 1, 运控: 1, 意识: 1 };
    if (stream === '商店流') return { 体能: 2, 投射: 1, 防守: 1, 弹跳: 1, 运控: 1, 意识: 1 };
    return { 投射: 2, 弹跳: 1, 防守: 1, 体能: 1, 运控: 1, 意识: 1 };
  }

  views.resources = {
    id: 'resources',
    nav: '资源规划',
    icon: '📦',
    title: '资源规划',
    subtitle: '这个工具回答：每点精力/钻石花在哪 ROI 最高？今天怎么分训练次数？四流派各自该优先买什么、练什么。',
    dataNote:
      '来源：T3 economy + 社区多源；训练成本区间为推断',
    mount: function (el, ctx) {
      var format = BBT.format;
      var economy = BBT.economy;
      var roster = BBT.roster;

      var html = '';
      html += '<div class="grid grid--main-side" style="align-items:start">';

      /* 左：ROI + 输入 */
      html += '<div class="stack" style="gap:18px">';
      html +=
        '<div class="card card--pad card--shadow">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">📊</span>资源 ROI 排序</div>' +
        '<div class="card-sub">每点精力的属性收益 / 每天免费资源；成本区间来自 T3 模型。</div></div>' +
        dom.confBadge('推断') + '</div>' +
        '<div class="form-grid">' +
        '<div class="field"><label class="field-label" for="rp-stamina">今日可用精力</label>' +
        '<div class="input-wrap"><input class="input" id="rp-stamina" type="number" value="200" min="0" max="999" step="10"></div></div>' +
        '<div class="field"><label class="field-label" for="rp-cost">单次训练精力</label>' +
        '<div class="input-wrap"><input class="input" id="rp-cost" type="number" value="25" min="1" max="100" step="1"></div></div>' +
        '<div class="field"><label class="field-label" for="rp-gain">单次训练属性收益</label>' +
        '<div class="input-wrap"><input class="input" id="rp-gain" type="number" value="24" min="0" max="999" step="1"></div></div>' +
        '<div class="field"><label class="field-label" for="rp-stream">目标流派</label>' +
        '<select class="select" id="rp-stream" style="width:100%">' +
        STREAMS.map(function (s) { return '<option value="' + s + '">' + s + '</option>'; }).join('') +
        '</select></div>' +
        '</div>' +
        '<div id="roi-table" style="margin-top:14px"></div>' +
        '</div>';

      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🧾</span>每日分配方案</div>' +
        '<div class="card-sub">按目标流派权重，把训练次数分给 6 个 A 层训练项。</div></div>' +
        dom.confBadge('推断') + '</div>' +
        '<div id="daily-plan"></div>' +
        '</div>';
      html += '</div>';

      /* 右：优先级 + 节奏 */
      html += '<div class="stack" style="gap:18px">';
      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">✅</span>流派优先级清单</div>' +
        '<div class="card-sub">来自 T3 模型与社区多源共识。</div></div></div>' +
        '<div id="checklist"></div>' +
        '</div>';
      html +=
        '<div class="card card--pad">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🗓️</span>开服节奏与重置规则</div>' +
        '<div class="card-sub">每日循环解锁节奏（单源）与免费重置建议。</div></div></div>' +
        '<div id="rhythm"></div>' +
        '</div>';
      html += '</div>';
      html += '</div>';

      el.innerHTML = html;

      function render() {
        var stamina = Number(dom.qs('#rp-stamina', el).value) || 0;
        var cost = Number(dom.qs('#rp-cost', el).value) || 25;
        var gain = Number(dom.qs('#rp-gain', el).value) || 0;
        var stream = dom.qs('#rp-stream', el).value;
        var roi = economy.roiRanking({ trainingCost: cost, gainPerTraining: gain, dailyStamina: stamina });
        dom.qs('#roi-table', el).innerHTML =
          '<div class="table-wrap"><table class="table" style="min-width:0"><thead><tr>' +
          '<th>行动</th><th class="num">ROI</th><th>成本</th><th>置信度</th></tr></thead><tbody>' +
          roi.map(function (r) {
            return '<tr><td><strong>' + dom.esc(r.name) + '</strong><div class="small muted">' + dom.esc(r.note) + '</div></td>' +
              '<td class="num strong">' + (r.roi != null ? format.num(r.roi, 2) : '—') + '<div class="tiny muted">' + dom.esc(r.unit) + '</div></td>' +
              '<td class="small">' + dom.esc(r.cost) + '</td>' +
              '<td>' + (r.confidence === '多源一致' ? dom.confBadge('多源一致') : dom.confBadge(r.confidence.indexOf('待') >= 0 ? '待验证' : '推断')) + '</td></tr>';
          }).join('') +
          '</tbody></table></div>';

        var plan = economy.planDay({
          stamina: stamina,
          trainingCost: cost,
          weights: weightsFor(stream)
        });
        var totalSessions = Math.max(1, plan.sessions);
        dom.qs('#daily-plan', el).innerHTML =
          '<div class="result-card"><div class="result-label">' + dom.esc(stream) + ' · 今日训练次数</div>' +
          '<div class="result-main"><span class="big-number num">' + plan.sessions + '</span><span class="big-unit">次</span></div>' +
          '<div class="result-note">消耗精力 ' + plan.staminaUsed + ' / 剩余 ' + plan.staminaLeft +
          ' · 单次 ' + cost + ' 精力</div></div>' +
          '<div class="table-wrap" style="margin-top:12px"><table class="table"><thead><tr>' +
          '<th>训练项</th><th>主 → 副</th><th class="num">次数</th><th>占比</th></tr></thead><tbody>' +
          plan.rows.map(function (r) {
            return '<tr><td>' + dom.esc(r.name) + '</td><td class="small">' + dom.esc(r.primary) + ' → ' +
              dom.esc(r.secondary) + '</td><td class="num strong">' + r.sessions + '</td>' +
              '<td><span style="display:block;height:6px;border-radius:99px;background:var(--surface-3)">' +
              '<span style="display:block;height:6px;border-radius:99px;width:' +
              Math.round((r.sessions / totalSessions) * 100) + '%;background:linear-gradient(90deg,#60a5fa,#2563eb)"></span></span></td></tr>';
          }).join('') +
          '</tbody></table></div>' +
          '<div class="small muted" style="margin-top:8px">' + dom.esc(plan.confidence) + '</div>';

        dom.qs('#checklist', el).innerHTML =
          '<ul class="conclusion-list">' +
          economy.priorityChecklist(stream).map(function (c, i) {
            return '<li class="conclusion-item"><span class="conclusion-index">' + (i + 1) + '</span>' +
              '<span>' + dom.esc(c.text) + ' ' + dom.confBadge(c.confidence) + '</span></li>';
          }).join('') +
          '</ul>';

        var loop = economy.dailyLoop();
        var reset = economy.resetRules();
        dom.qs('#rhythm', el).innerHTML =
          '<div class="table-wrap"><table class="table"><thead><tr><th>节奏</th><th>说明</th></tr></thead><tbody>' +
          (loop
            ? '<tr><td>竞技场解锁</td><td class="small">第 ' + loop.arena_unlock_day + ' 天</td></tr>' +
              '<tr><td>器材池</td><td class="small">第 ' + loop.equipment_pool_unlock_day + ' 天</td></tr>' +
              '<tr><td>战术研究室</td><td class="small">第 ' + loop.tactical_lab_day + ' 天（全员共享 5 名指导球员最低等级）</td></tr>' +
              '<tr><td>困难模式</td><td class="small">第 ' + loop.hard_mode_day + ' 天</td></tr>'
            : '<tr><td>—</td><td class="small muted">模型未加载每日循环</td></tr>') +
          (reset
            ? '<tr><td>免费重置</td><td class="small">' + reset.free_until_level.value + ' 级前免费；之后 ' +
              reset.reset_cost_after.value + ' 钻（' + dom.esc(reset.free_until_level.confidence) + '）</td></tr>'
            : '') +
          '</tbody></table></div>';
      }

      ['#rp-stamina', '#rp-cost', '#rp-gain'].forEach(function (sel) {
        dom.qs(sel, el).addEventListener('input', render);
      });
      dom.qs('#rp-stream', el).addEventListener('change', render);
      render();
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

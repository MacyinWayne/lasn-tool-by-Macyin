/*!
 * views/gacha-stream.js —— 「扭蛋流」流派卡 + 计算器（挂在「养成配队」页底部，不新增 tab）
 *
 * 内容：
 *   1. 五人格（扭蛋流最佳配置五件套）及其天赋/价值
 *   2. 4 拖 1 推荐：从五人格里踢掉谁（默认：先斗）
 *   3. 扭蛋系列购买优先级表
 *   4. 扭蛋收益计算器（基础值 × 千圣/增强/先斗 → 新境界折半 → 上限截断）
 *   5. 周金钱预算计算器（打工/小费/陪练/急招/周六补助/超前消费）
 *
 * 数值来自 core/gacha-stream.js（玩家 2026-11-08 一局实证）。
 */
(function (root) {
  'use strict';
  var BBT = (root.BBT = root.BBT || {});
  var GS = (BBT.GachaStream = BBT.GachaStream || {});

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function num(v, d) {
    var n = Number(v);
    return isFinite(n) ? n : (d == null ? 0 : d);
  }
  function core() {
    return BBT.gachaStream || null;
  }

  function tableHtml(headers, rows) {
    return '<div class="table-wrap"><table class="table"><thead><tr>' +
      headers.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') +
      '</tr></thead><tbody>' + rows.map(function (r) {
        return '<tr>' + r.map(function (c, i) {
          return '<td' + (i === 0 ? '' : ' class="num"') + '>' + esc(c) + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }

  function personasHtml() {
    var c = core();
    if (!c) return '';
    return tableHtml(
      ['角色', '定位', '天赋（游戏内原文）', '价值'],
      c.PERSONAS.map(function (p) { return [p.name, p.role, p.talent, p.valueText]; })
    );
  }

  function carry4Html() {
    var c = core();
    if (!c) return '';
    var r = c.carry4();
    var rows = r.ranking.map(function (p, i) {
      return [String(i + 1), p.name, p.role, p.keep ? '保留' : '建议踢出', p.valueText];
    });
    return '<div class="notice notice--info"><span class="notice-ico">🧩</span><span><strong>结论：踢「' + esc(r.kick.name) + '」，保留 羽濑川 + 千圣 + 野上 + 卧云，带 1 名体系外主练。</strong><br>' +
      '理由：羽濑川把单次购买从 1 颗拉到期望 ' + r.buyExpectation.toFixed(2) + ' 颗（扭蛋总量翻倍）；千圣常驻 ×1.30；野上每周多 1 次出行 + 22 零花钱 + 首轮增强；卧云 40% 升级增强版的期望（+15%~20%，还能把「额外零用钱」80→120）高于先斗 44%×1.3（EV +13.2%）。</span></div>' +
      '<div class="small muted" style="margin-top:6px">注：训练不看位置适性，故 4 拖 1 不需要考虑位置；踢人只按「扭蛋流支持价值」排序。</div>' +
      tableHtml(['排序', '角色', '定位', '取舍', '期望价值'], rows);
  }

  function priorityHtml() {
    var c = core();
    if (!c) return '';
    var rows = c.purchasePriority().map(function (p) {
      var star = p.priority === 1 ? '★★★' : p.priority === 2 ? '★★☆' : p.priority === 3 ? '★☆☆' : '☆☆☆';
      return [star, p.name, p.desc, p.note];
    });
    return tableHtml(['优先级', '系列', '效果', '备注'], rows);
  }

  function gainCalcHtml() {
    var c = core();
    if (!c) return '';
    var seriesOpts = c.SERIES.filter(function (s) { return s.kind === 'attr'; }).map(function (s) {
      return '<option value="' + esc(s.id) + '">' + esc(s.name) + '</option>';
    }).join('');
    var qualityOpts = c.QUALITIES.map(function (q) {
      return '<option value="' + esc(q.id) + '"' + (q.id === 'gold' ? ' selected' : '') + '>' + esc(q.name) + '（' + q.price + ' 金）</option>';
    }).join('');
    return '<div class="card-title" style="margin-top:14px"><span class="ico">🧮</span>扭蛋收益计算器（含乘区 / 新境界 / 上限）</div>' +
      '<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:8px">' +
      '<label class="small">系列：<select class="select" id="gs-series">' + seriesOpts + '</select></label>' +
      '<label class="small">品质：<select class="select" id="gs-quality">' + qualityOpts + '</select></label>' +
      '<label class="small">增强款：<input type="checkbox" id="gs-enhanced"></label>' +
      '<label class="small">千圣在场：<input type="checkbox" id="gs-qisheng" checked></label>' +
      '<label class="small">先斗已触发(44%)：<input type="checkbox" id="gs-xiandou"></label>' +
      '</div>' +
      '<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:8px">' +
      '<label class="small">当前属性值：<input class="input" id="gs-current" type="number" min="0" max="5000" value="1000" style="max-width:120px"></label>' +
      '<label class="small">属性上限：<input class="input" id="gs-cap" type="number" min="0" max="9999" value="1740" style="max-width:120px"></label>' +
      '</div>' +
      '<div id="gs-gain-result" class="note-calc-result" style="margin-top:10px"></div>' +
      '<div class="small muted" style="margin-top:6px">公式：实际 = (基础 + 增强额外) × 千圣1.3（增强版再 ×1.15）× 先斗1.3（44% 触发）；属性 ≥1200 后 ÷2（向下取整）；超过上限按上限截断。乘区与折半来自 2026-11-08 实测。</div>';
  }

  function moneyCalcHtml() {
    var c = core();
    if (!c) return '';
    var levelOpts = c.WORK_LEVELS.map(function (l) {
      return '<option value="' + esc(l.id) + '"' + (l.id === 'senior' ? ' selected' : '') + '>' + esc(l.name) + '（基础 ' + l.base + '）</option>';
    }).join('');
    var tipOpts = c.TIP_LEVELS.map(function (t) {
      return '<option value="' + t + '">' + t + '</option>';
    }).join('');
    return '<div class="card-title" style="margin-top:14px"><span class="ico">💰</span>周金钱预算计算器</div>' +
      '<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:8px">' +
      '<label class="small">本周打工次数：<input class="input" id="gs-work-times" type="number" min="0" max="4" value="3" style="max-width:90px"></label>' +
      '<label class="small">打工等级：<select class="select" id="gs-work-level">' + levelOpts + '</select></label>' +
      '<label class="small">小费均值：<select class="select" id="gs-tips">' + tipOpts + '</select></label>' +
      '<label class="small">每次陪练数：<input class="input" id="gs-companions" type="number" min="0" max="4" value="0" style="max-width:90px"></label>' +
      '</div>' +
      '<div class="row" style="gap:12px;flex-wrap:wrap;margin-top:8px">' +
      '<label class="small">急招（翻倍）：<input type="checkbox" id="gs-urgent"></label>' +
      '<label class="small">周六补助：<input class="input" id="gs-subsidy" type="number" min="0" max="999" value="120" style="max-width:90px"></label>' +
      '<label class="small">超前消费一次性：<input class="input" id="gs-overspend" type="number" min="0" max="999" value="0" style="max-width:90px"></label>' +
      '</div>' +
      '<div id="gs-money-result" class="note-calc-result" style="margin-top:10px"></div>' +
      '<div class="small muted" style="margin-top:6px">服务员基础 110/135/160；小费档 40/50/100/150；陪练 +10/人；急招 = 打工基础翻倍；周六补助来自扭蛋「额外零用钱」（基础 80 → 增强 120）。</div>';
  }

  function positionSwingHtml() {
    return '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">🧭</span><span>' +
      '<strong>适性摇位扭蛋「获得一个新位置」</strong>：随机获得一个新位置，并把该位置适性提升到<strong>紫色（初始颜色）</strong>；' +
      '<strong>增强款 → 金色</strong>；之后再<strong>触发一次笔记词条 → 彩色</strong>。' +
      '新位置随机，所以想定向摇位要<strong>提前准备对应位置的适配笔记</strong>（同位置角色笔记的适性词条）。<br>' +
      '例：希雅（中锋）容易摇去<strong>大前</strong>（野上-希雅适配高、野上稳定产大前适性笔记）；野上同理可摇去<strong>小前/分卫</strong>。' +
      '现实目标：<strong>金色适性有戏，彩色要看脸</strong>。<br>' +
      '<strong>适性等级 5 档：无 → 白 → 紫 → 金 → 彩（彩封顶）</strong>；笔记学习触发适性词条时，<strong>无论词条星级，该位置适性只 +1 级</strong>；' +
      '词条星级(1~3★)决定的是<strong>触发概率</strong>（星级越高越容易触发），≠ 适性颜色。' +
      '</span></div>';
  }

  GS.appendixHtml = function () {
    var c = core();
    if (!c) return '';
    return '<div class="card card--pad" id="gacha-stream-appendix">' +
      '<div class="card-head"><div><div class="card-title"><span class="ico">🎰</span>流派 · 扭蛋流（实证模型）</div>' +
      '<div class="card-sub">步行街扭蛋为核心的育成流派。来源：2026-11-08 玩家一局完整 7 周实证（野上 9720 SS）+ 游戏内天赋文本。</div></div>' +
      '<span class="badge badge--ok">玩家实测</span></div>' +
      '<div class="team-sub-label">五人格（扭蛋流最佳配置）</div>' +
      personasHtml() +
      '<div class="team-sub-label" style="margin-top:12px">4 拖 1：踢掉谁最合适</div>' +
      carry4Html() +
      '<div class="team-sub-label" style="margin-top:12px">扭蛋系列购买优先级</div>' +
      priorityHtml() +
      positionSwingHtml() +
      gainCalcHtml() +
      moneyCalcHtml() +
      '<div class="small muted" style="margin-top:10px">实证参考：一周 3 行动（周五出行买扭蛋 + 周末打工 2~3 次）；扭蛋预算按「极限 600」准备；属性接近上限的类型 0 收益，购买前先看未满属性。</div>' +
      '</div>';
  };

  function gainRefresh(host) {
    var c = core();
    if (!c) return;
    var seriesSel = host.querySelector('#gs-series');
    var qualitySel = host.querySelector('#gs-quality');
    var enhancedBox = host.querySelector('#gs-enhanced');
    var qiBox = host.querySelector('#gs-qisheng');
    var xdBox = host.querySelector('#gs-xiandou');
    var currentInput = host.querySelector('#gs-current');
    var capInput = host.querySelector('#gs-cap');
    var out = host.querySelector('#gs-gain-result');
    if (!seriesSel || !qualitySel || !out) return;
    var enhanced = !!(enhancedBox && enhancedBox.checked);
    var sb = c.seriesBase(seriesSel.value, qualitySel.value, enhanced);
    var r = c.computeGain({
      base: sb.base,
      enhanced: enhanced,
      enhancedExtra: sb.enhancedExtra,
      currentAttr: num(currentInput && currentInput.value, 0),
      cap: num(capInput && capInput.value, 1740),
      qiSheng: !qiBox || qiBox.checked,
      xianDouTriggered: !!(xdBox && xdBox.checked)
    });
    out.innerHTML = '<div class="small">基础 <strong>' + sb.base + '</strong>' + (r.steps.length > 1 ? '（含增强 +' + sb.enhancedExtra + '）' : '') +
      ' → 实际 <strong>+' + r.gain + '</strong>' + (r.halved ? '（已新境界折半）' : '') + (r.capped ? '（撞上限截断）' : '') + '</div>' +
      '<div class="small muted">' + r.steps.map(function (s) { return esc(s.label) + '=' + (Math.round(s.value * 100) / 100); }).join(' → ') + '</div>' +
      '<div class="small muted">当前 ' + num(currentInput && currentInput.value, 0) + ' / 上限 ' + num(capInput && capInput.value, 1740) + ' · 上限剩余 ' + (isFinite(r.capLeft) ? r.capLeft : '∞') + '</div>';
  }

  function moneyRefresh(host) {
    var c = core();
    if (!c) return;
    var out = host.querySelector('#gs-money-result');
    if (!out) return;
    var r = c.weeklyMoney({
      workTimes: num(host.querySelector('#gs-work-times') && host.querySelector('#gs-work-times').value, 3),
      level: (host.querySelector('#gs-work-level') && host.querySelector('#gs-work-level').value) || 'senior',
      tips: num(host.querySelector('#gs-tips') && host.querySelector('#gs-tips').value, 0),
      companions: num(host.querySelector('#gs-companions') && host.querySelector('#gs-companions').value, 0),
      urgent: !!(host.querySelector('#gs-urgent') && host.querySelector('#gs-urgent').checked),
      saturdaySubsidy: num(host.querySelector('#gs-subsidy') && host.querySelector('#gs-subsidy').value, 0),
      overspend: num(host.querySelector('#gs-overspend') && host.querySelector('#gs-overspend').value, 0)
    });
    out.innerHTML = '<div class="small">本周零花钱合计 <strong>+' + r.total + '</strong></div>' +
      '<div class="small muted">' + r.steps.map(function (s) { return esc(s.label) + '=' + s.value; }).join(' · ') + '</div>' +
      '<div class="small muted">可买：' + c.budgetPlan(r.total).map(function (p) { return p.quality + '×' + p.count; }).join(' / ') + '（按单一品质估算）</div>';
  }

  GS.bind = function (host) {
    if (!host || !core()) return;
    var ids = ['gs-series', 'gs-quality', 'gs-enhanced', 'gs-qisheng', 'gs-xiandou', 'gs-current', 'gs-cap'];
    ids.forEach(function (id) {
      var el = host.querySelector('#' + id);
      if (el) {
        el.addEventListener('input', function () { gainRefresh(host); });
        el.addEventListener('change', function () { gainRefresh(host); });
      }
    });
    ['gs-work-times', 'gs-work-level', 'gs-tips', 'gs-companions', 'gs-urgent', 'gs-subsidy', 'gs-overspend'].forEach(function (id) {
      var el = host.querySelector('#' + id);
      if (el) {
        el.addEventListener('input', function () { moneyRefresh(host); });
        el.addEventListener('change', function () { moneyRefresh(host); });
      }
    });
    gainRefresh(host);
    moneyRefresh(host);
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

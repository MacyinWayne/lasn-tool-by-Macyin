/*!
 * ui/note-plan.js —— 每角色「最优笔记配置（待生成）」占位渲染（纯函数，无副作用）
 *
 * 需求：在角色详情（图鉴弹窗）和笔记契合结果里，各留一个区块，
 * 字段占位（数据先空/显示「待研究」徽章）：
 *   targetAttrs / dutySuitEntries / skillEntries / harmonyEntries /
 *   qualityTarget / harmonyTarget / basis(pending|derived|verified)
 *
 * 实现约定：这是**视图层纯渲染函数**，数据从 characters.json 派生；
 * 后续研究出养成逻辑后，只需替换数据生成脚本/传入数据，不用改 UI。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.notePlan = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  var PENDING_BASIS = {
    pending: { label: '待研究', tone: 'warn', desc: '养成逻辑定稿后由数据脚本生成' },
    derived: { label: '推断', tone: 'info', desc: '由机制/数据推导，未实测' },
    verified: { label: '已验证', tone: 'ok', desc: '实测/客户端确证' }
  };

  /** 由角色数据派生「参考方向」（只作方向提示，明确标推断·待定稿）。 */
  function referenceHints(character) {
    var ch = character || {};
    var hints = [];
    if (ch.role) hints.push('出身位置：' + ch.role);
    if (ch.style) hints.push('定位风格：' + ch.style);
    var potentials = ch.potentials;
    var CODEX = ['投射', '攻筐', '防投', '护筐', '传球', '突破'];
    var list = [];
    if (Array.isArray(potentials)) {
      potentials.forEach(function (p, i) {
        var v = p && typeof p === 'object' ? p.value : p;
        if (typeof v === 'number') list.push({ attr: CODEX[i] || '槽位' + (i + 1), value: v });
      });
    } else if (potentials && typeof potentials === 'object') {
      Object.keys(potentials).forEach(function (k) {
        if (typeof potentials[k] === 'number') list.push({ attr: k, value: potentials[k] });
      });
    }
    list.sort(function (a, b) { return b.value - a.value; });
    var top = list.slice(0, 3).map(function (x) { return x.attr + '（潜力 ' + x.value + '）'; });
    if (top.length) hints.push('高潜力方向：' + top.join(' / '));
    return hints;
  }

  /** 占位数据结构（后续由养成逻辑脚本替换）。 */
  function placeholderData(character) {
    return {
      targetAttrs: [],
      dutySuitEntries: [],
      skillEntries: [],
      harmonyEntries: [],
      qualityTarget: null,
      harmonyTarget: null,
      basis: 'pending',
      referenceHints: referenceHints(character)
    };
  }

  function fieldRow(label, value, hint) {
    var isEmpty = value == null || (Array.isArray(value) && value.length === 0);
    return (
      '<div class="note-plan-field">' +
      '<div class="note-plan-k">' + esc(label) + '</div>' +
      '<div class="note-plan-v' + (isEmpty ? ' is-empty' : '') + '">' +
      (isEmpty ? '待研究' : esc(Array.isArray(value) ? value.join(' / ') : value)) +
      '</div>' +
      (hint ? '<div class="note-plan-h">' + esc(hint) + '</div>' : '') +
      '</div>'
    );
  }

  /**
   * 渲染「该角色的最优笔记配置（待生成）」区块。
   * @param {Object} character characters.json 中的角色对象（可缺字段）
   * @returns {string} HTML 字符串
   */
  function renderNotePlanPlaceholder(character) {
    var ch = character || {};
    var data = placeholderData(ch);
    var basis = PENDING_BASIS[data.basis] || PENDING_BASIS.pending;
    var hints = data.referenceHints;
    return (
      '<div class="note-plan card card--pad" data-note-plan="' + esc(ch.name || 'unknown') + '">' +
      '<div class="card-head"><div><div class="card-title"><span class="ico">🎯</span>该角色的最优笔记配置（待生成）</div>' +
      '<div class="card-sub">字段占位：养成逻辑定稿后由数据脚本生成，UI 不变。</div></div>' +
      '<span class="badge badge--' + esc(basis.tone) + '" title="' + esc(basis.desc) + '">' + esc(basis.label) + '</span>' +
      '</div>' +
      '<div class="note-plan-grid">' +
      fieldRow('目标属性', data.targetAttrs, 'targetAttrs · 笔记该堆的主属性/上限（如 弹跳/防守/体能）') +
      fieldRow('位置适性词条', data.dutySuitEntries, 'dutySuitEntries · 如 大前适性') +
      fieldRow('技能类词条', data.skillEntries, 'skillEntries · 如 篮板守护者') +
      fieldRow('角色契合词条', data.harmonyEntries, 'harmonyEntries · 如 XX球员契合（目标=主力）') +
      fieldRow('品质目标', data.qualityTarget, 'qualityTarget · 金/红/彩') +
      fieldRow('契合度目标', data.harmonyTarget, 'harmonyTarget · 良/优') +
      '</div>' +
      (hints.length
        ? '<div class="note-plan-hints"><span class="tag tag--blue">推断 · 待养成逻辑定稿</span>' +
          '<span class="small muted">参考方向：' + esc(hints.join('；')) + '</span></div>'
        : '') +
      '<div class="note-plan-todo small muted">依据字段 basis：<span class="inline-code">pending</span>（待研究）→ 定稿后升级为 <span class="inline-code">derived</span> / <span class="inline-code">verified</span>。' +
      '「笔记库存录入」为未来可选功能，当前未实现。</div>' +
      '</div>'
    );
  }

  return {
    PENDING_BASIS: PENDING_BASIS,
    referenceHints: referenceHints,
    placeholderData: placeholderData,
    renderNotePlanPlaceholder: renderNotePlanPlaceholder
  };
});

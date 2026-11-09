/*!
 * ui/dom.js —— 轻量 DOM 工具（无框架、无依赖）
 * 只提供「拼字符串 + 局部事件绑定」这一套最省事的能力。
 */
(function (root, factory) {
  'use strict';
  var api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.dom = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function qs(sel, scope) {
    return (scope || document).querySelector(sel);
  }

  function qsa(sel, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(sel));
  }

  /** 解析 HTML 字符串为元素（用于事件绑定后批量插入）。 */
  function node(html) {
    var tpl = document.createElement('template');
    tpl.innerHTML = String(html).trim();
    return tpl.content.firstElementChild;
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v == null || v === false) return;
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') {
          node.addEventListener(k.slice(2).toLowerCase(), v);
        } else node.setAttribute(k, v === true ? '' : v);
      });
    }
    (children || []).forEach(function (child) {
      if (child == null) return;
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return node;
  }

  /** 置信度徽章（来源：params.CONFIDENCE）。 */
  function confBadge(confId) {
    var params = (root.BBT && root.BBT.params) || null;
    var conf = params && params.CONFIDENCE ? params.CONFIDENCE[confId] : null;
    var tone = conf ? conf.tone : 'neutral';
    var label = conf ? conf.label : (confId || '待验证');
    var desc = conf ? conf.desc : '缺少证据';
    return (
      '<span class="badge badge--' + esc(tone) + '" title="' + esc(label + '：' + desc) + '">' +
      esc(conf ? conf.short : label) + '</span>'
    );
  }

  /** 参数徽章：从 params.byId 取置信度。 */
  function paramBadge(paramId) {
    var params = (root.BBT && root.BBT.params) || null;
    var def = params && params.byId ? params.byId[paramId] : null;
    return confBadge(def ? def.confidence : '待验证');
  }

  function paramSource(paramId) {
    var params = (root.BBT && root.BBT.params) || null;
    var def = params && params.byId ? params.byId[paramId] : null;
    return def ? def.source || '' : '';
  }

  var TOAST_MS = 2400;

  function toast(message, tone) {
    var wrap = document.querySelector('.toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'toast-wrap';
      wrap.setAttribute('role', 'status');
      wrap.setAttribute('aria-live', 'polite');
      document.body.appendChild(wrap);
    }
    var item = document.createElement('div');
    item.className = 'toast' + (tone ? ' toast--' + tone : '');
    item.textContent = message;
    wrap.appendChild(item);
    window.setTimeout(function () {
      item.style.opacity = '0';
      item.style.transition = 'opacity .2s';
      window.setTimeout(function () {
        if (item.parentNode) item.parentNode.removeChild(item);
        if (wrap.parentNode && !wrap.children.length) wrap.parentNode.removeChild(wrap);
      }, 220);
    }, TOAST_MS);
  }

  /** 事件委托：在 root 上监听某选择器的事件。 */
  function delegate(root, selector, type, handler) {
    root.addEventListener(type, function (event) {
      var target = event.target;
      while (target && target !== root) {
        if (target.matches && target.matches(selector)) {
          handler(event, target);
          return;
        }
        target = target.parentNode;
      }
    });
  }

  var modalSeq = 0;

  /**
   * 打开一个通用 Modal（图鉴详情 / 导出参数）。
   * @param {Object} opts { title, bodyHtml, width }
   * @returns {{root:Element, close:Function, body:Element}}
   */
  function modal(opts) {
    var o = opts || {};
    closeAllModals();
    modalSeq += 1;
    var id = 'modal-' + modalSeq;
    var wrap = document.createElement('div');
    wrap.className = 'modal';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-labelledby', id + '-title');
    wrap.innerHTML =
      '<button class="modal-backdrop" type="button" aria-label="关闭"></button>' +
      '<div class="modal-panel" style="width:min(' + (o.width || 860) + 'px,100%)">' +
      '<div class="modal-head">' +
      '<div><div class="modal-title" id="' + id + '-title">' + esc(o.title || '') + '</div>' +
      (o.subtitle ? '<div class="card-sub" style="margin-top:3px">' + esc(o.subtitle) + '</div>' : '') +
      '</div>' +
      '<button class="modal-close" type="button" aria-label="关闭">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:16px;height:16px"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      '</button></div>' +
      '<div class="modal-body">' + (o.bodyHtml || '') + '</div>' +
      '</div>';
    document.body.appendChild(wrap);
    document.body.style.overflow = 'hidden';

    function close() {
      if (wrap.parentNode) wrap.parentNode.removeChild(wrap);
      if (!document.querySelector('.modal')) document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    }

    function onKey(event) {
      if (event.key === 'Escape') close();
    }

    wrap.querySelector('.modal-backdrop').addEventListener('click', close);
    wrap.querySelector('.modal-close').addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    var body = wrap.querySelector('.modal-body');
    var focusable = wrap.querySelector('.modal-close');
    if (focusable) focusable.focus();
    return { root: wrap, close: close, body: body };
  }

  function closeAllModals() {
    qsa('.modal').forEach(function (m) {
      if (m.parentNode) m.parentNode.removeChild(m);
    });
    document.body.style.overflow = '';
  }

  /** 给 button 等元素加「点击涟漪」这类微交互？保持简单：按下缩放由 CSS 处理。 */

  /** 图标：内联 SVG（无外链）。 */
  var ICONS = {
    search:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    sun:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/></svg>',
    reset:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 2.6-6.4"/><path d="M3 4v5h5"/></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    code:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6l-5 6 5 6M16 6l5 6-5 6"/></svg>',
    chart:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    book:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M4 4h6a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H4zM20 4h-6a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H20z"/></svg>'
  };

  function icon(name) {
    return ICONS[name] || '';
  }

  /** 篮球 logo 内联 SVG。 */
  var BALL_SVG =
    '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true">' +
    '<circle cx="16" cy="16" r="13" stroke="currentColor" stroke-width="2"/>' +
    '<path d="M3.6 12.6c6.5 1.6 11.7 5.4 15.2 11.4M28.4 12.6c-6.5 1.6-11.7 5.4-15.2 11.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M16 3v26M3 16h26" stroke="currentColor" stroke-width="2"/>' +
    '</svg>';

  return {
    esc: esc,
    qs: qs,
    qsa: qsa,
    node: node,
    el: el,
    confBadge: confBadge,
    paramBadge: paramBadge,
    paramSource: paramSource,
    toast: toast,
    delegate: delegate,
    modal: modal,
    closeAllModals: closeAllModals,
    icon: icon,
    BALL_SVG: BALL_SVG
  };
});

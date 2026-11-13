/*!
 * views/placeholder.js —— 未定页签占位模板（T6 改造）
 *
 * 用途：寒溟后续会逐个页签给出具体需求；新需求到达前，用本模板先占位：
 *   - 说明「待需求」与当前可复用组件
 *   - 显示本页数据版本/来源，避免空白页
 *
 * 两种用法：
 *   1) 直接渲染：placeholder.render({ title, note, reusable })
 *   2) 注册一个占位视图（不自动进 Tab 列表，需要时把 id 加进 app.tabOrder）：
 *      BBT.views.xxx = BBT.placeholder.createDraftView({ id:'xxx', nav:'…', ... })
 */
(function (root) {
  'use strict';
  var BBT = root.BBT = root.BBT || {};
  var dom = BBT.dom;

  var REUSABLE_COMPONENTS = [
    { name: '卡片 / 表单 / 表格', from: 'app.css 组件类（card / field / table / ledger）' },
    { name: '内联 SVG 图表', from: 'ui/charts.js（line / bars / radar / gauge）' },
    { name: '角色数据 / 图鉴', from: 'core/game-data.js + src/data/characters.js' },
    { name: '我的角色过滤', from: 'core/store.js（getOwned / setOwned）' },
    { name: '参数编辑 / 置信度徽章', from: 'core/params.js + ui/dom.js（paramBadge / confBadge）' },
    { name: '笔记矩阵 / 词条库', from: 'core/game-data.js notesLibrary()' },
    { name: 'Modal / Toast / 折叠区块', from: 'ui/dom.js' }
  ];

  function render(opts) {
    var o = opts || {};
    var gd = BBT.gameData;
    var meta = gd && gd.meta ? gd.meta() : { dataVersion: 'unknown', updatedAt: '' };
    var title = o.title || '待需求页签';
    var note = o.note || '本页功能等待寒溟明确需求后实现；当前结构已预留，可直接替换。';
    var reusable = Array.isArray(o.reusable) && o.reusable.length ? o.reusable : REUSABLE_COMPONENTS;
    var html = '';
    html +=
      '<div class="card card--pad" id="draft-page" data-draft="' + dom.esc(o.id || 'draft') + '">' +
      '<div class="card-head"><div><div class="card-title"><span class="ico">🧩</span>' +
      dom.esc(title) + '</div><div class="card-sub">' + dom.esc(note) + '</div></div>' +
      '<span class="badge badge--warn">待需求</span></div>' +
      '<div class="notice notice--info"><span class="notice-ico">🛠️</span><span>' +
      '数据结构 / 共享状态 / 图表组件已就绪；需求到达后只需替换 <span class="inline-code">' +
      dom.esc(o.file || 'src/views/placeholder.js 对应视图') + '</span> 的 mount 内容，无需改路由与 store。' +
      '</span></div>' +
      '<div class="section-label" style="margin-top:14px">当前可复用组件</div>' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>能力</th><th>来源</th></tr></thead><tbody>' +
      reusable.map(function (c) {
        return '<tr><td><strong>' + dom.esc(c.name) + '</strong></td><td class="small muted">' +
          dom.esc(c.from) + '</td></tr>';
      }).join('') +
      '</tbody></table></div>' +
      '<div class="small muted" style="margin-top:10px">数据版本：' + dom.esc(meta.dataVersion) +
      '（' + dom.esc(meta.updatedAt) + '）· 本页不读取任何未定义业务常量。</div>' +
      '</div>';
    return html;
  }

  /**
   * 生成一个占位视图对象；挂载时渲染占位内容。
   * @param {Object} cfg { id, nav, icon, title, subtitle, note, reusable, file }
   */
  function createDraftView(cfg) {
    var c = cfg || {};
    return {
      id: c.id || 'draft',
      nav: c.nav || '待定页签',
      icon: c.icon || '🧩',
      title: c.title || '待需求页签',
      subtitle: c.subtitle || '等待需求：本页结构已预留，可直接替换视图实现。',
      draft: true,
      mount: function (el, ctx) {
        el.innerHTML = render({
          id: c.id,
          title: c.title,
          note: c.note,
          reusable: c.reusable,
          file: c.file
        });
      }
    };
  }

  BBT.placeholder = {
    REUSABLE_COMPONENTS: REUSABLE_COMPONENTS,
    render: render,
    createDraftView: createDraftView
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

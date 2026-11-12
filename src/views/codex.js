/*!
 * views/codex.js —— 数据图鉴（角色列表 / 搜索排序 / 详情雷达）
 */
(function (root) {
  'use strict';
  var BBT = root.BBT = root.BBT || {};
  var views = BBT.views = BBT.views || {};
  var dom = BBT.dom;

  var STAT_ORDER = ['投射', '攻筐', '防投', '护筐', '传球', '突破'];
  var RARITY_ORDER = { SSR: 3, SR: 2, R: 1 };

  function dataOf(ctx) {
    if (ctx.data && Array.isArray(ctx.data.characters) && ctx.data.characters.length) {
      return ctx.data;
    }
    if (root.BB_SAMPLE_CHARACTERS && root.BB_SAMPLE_CHARACTERS.length) {
      return {
        mode: 'sample',
        count: root.BB_SAMPLE_CHARACTERS.length,
        source: 'tool/src/data/sample-characters.js',
        sourceLabel: '内置示例名单（降级）',
        generatedAt: '—',
        characters: root.BB_SAMPLE_CHARACTERS
      };
    }
    return { mode: 'none', count: 0, characters: [] };
  }

  function statEntries(ch) {
    if (!ch.stats) return [];
    var keys = STAT_ORDER.filter(function (k) {
      return typeof ch.stats[k] === 'number';
    });
    Object.keys(ch.stats).forEach(function (k) {
      if (keys.indexOf(k) < 0) keys.push(k);
    });
    return keys.map(function (k) {
      return { key: k, value: ch.stats[k] };
    });
  }

  function statSum(ch) {
    return statEntries(ch).reduce(function (a, e) { return a + e.value; }, 0);
  }

  function potentialSum(ch) {
    if (!Array.isArray(ch.potentials)) return null;
    return ch.potentials.reduce(function (a, p) { return a + (Number(p.value) || 0); }, 0);
  }

  function statBarsHtml(ch, limit) {
    var list = statEntries(ch)
      .slice()
      .sort(function (a, b) { return b.value - a.value; });
    if (limit) list = list.slice(0, limit);
    var max = Math.max.apply(
      null,
      statEntries(ch).map(function (e) { return e.value; }).concat([1])
    );
    var format = BBT.format;
    return list
      .map(function (e) {
        return (
          '<div class="stat-bar"><span>' + dom.esc(e.key) + '</span>' +
          '<span class="bar"><span class="bar-fill" style="width:' +
          Math.max(4, Math.round((e.value / max) * 100)) + '%"></span></span>' +
          '<span class="v">' + format.num(e.value, 0) + '</span></div>'
        );
      })
      .join('');
  }

  function avatarChar(name) {
    if (!name) return '?';
    var clean = String(name).replace(/[·\s]/g, '');
    return clean.slice(0, 1);
  }

  /**
   * 立绘：tool/assets/portraits/{content_id}.png（Lead 从 GameKee wiki 下载压缩，个人研究用）。
   * 图片缺失/加载失败时 onerror 隐藏 <img>，露出底下的姓名缩写。
   */
  function portraitHtml(ch) {
    var cid = ch.contentId || ch.content_id;
    if (!cid) return '';
    return (
      '<img class="codex-avatar" src="assets/portraits/' + dom.esc(cid) + '.png" alt="' +
      dom.esc(ch.name) + ' 立绘" loading="lazy" onerror="this.style.display=\'none\'">'
    );
  }

  function avatarHtml(ch) {
    return (
      '<div class="char-avatar" data-rarity="' + dom.esc(ch.rarity || '') + '">' +
      '<span class="char-avatar-fallback">' + dom.esc(avatarChar(ch.name)) + '</span>' +
      portraitHtml(ch) +
      '</div>'
    );
  }

  function rarityTag(rarity) {
    var r = rarity || '—';
    var cls = ['SSR', 'SR', 'R'].indexOf(r) >= 0 ? 'rarity--' + r : 'rarity--other';
    return '<span class="rarity ' + cls + '">' + dom.esc(r) + '</span>';
  }

  function knownBonusFor(ch) {
    var out = [];
    var params = BBT.params;
    var mechanics = BBT.mechanics;
    var name = ch.name || '';
    (params.DEFAULT_TEAM_SKILLS || []).forEach(function (s) {
      if (name.indexOf(s.name) >= 0 || (s.name.indexOf(name) >= 0 && name.length >= 2)) {
        out.push({
          label: '表情技能加值',
          value: '每个表情 +' + s.bonusPct + '%',
          confidence: s.confidence,
          source: s.source
        });
      }
    });
    (params.DEFAULT_CONSISTENCY_EXTRAS || []).forEach(function (s) {
      if (name.indexOf(s.name) >= 0) {
        out.push({
          label: '表情一致倍率加值',
          value: '一致倍率 +' + s.extra,
          confidence: s.confidence,
          source: s.source
        });
      }
    });
    (mechanics.TRAINING_MECHANICS || []).forEach(function (m) {
      var matched = (m.title || '').split('·')[0];
      if (matched && (name.indexOf(matched.replace(/\s/g, '')) >= 0 || name.indexOf(matched) >= 0)) {
        out.push({
          label: '训练机制',
          value: m.text,
          confidence: m.confidence,
          source: m.source
        });
      }
    });
    return out;
  }

  function positionBaseline(all, ch) {
    if (!ch.role) return null;
    var same = all.filter(function (x) {
      return x.role === ch.role && x.stats;
    });
    if (same.length < 2) return null;
    var out = {};
    STAT_ORDER.forEach(function (k) {
      var vals = same
        .map(function (x) { return x.stats[k]; })
        .filter(function (v) { return typeof v === 'number'; });
      if (!vals.length) return;
      out[k] = {
        avg: vals.reduce(function (a, b) { return a + b; }, 0) / vals.length,
        count: vals.length
      };
    });
    return { role: ch.role, stats: out, count: same.length, names: same.map(function (x) { return x.name; }) };
  }

  function detailHtml(all, ch, ctx) {
    var format = BBT.format;
    var entries = statEntries(ch);
    var owned = !ctx || !ctx.isOwned ? true : ctx.isOwned(ch.contentId);
    var baseline = positionBaseline(all, ch);
    var sums = potentialSum(ch);
    var known = knownBonusFor(ch);
    var html = '';

    html +=
      '<div class="char-detail-top">' +
      avatarHtml(ch) +
      '<div style="flex:1;min-width:200px">' +
      '<div class="row" style="gap:8px">' + rarityTag(ch.rarity) + (owned ? '' : '<span class="tag tag--unowned">未拥有</span>') +
      '<h3 style="font-size:20px;margin:0">' + dom.esc(ch.name) + '</h3>' +
      (ch.title ? '<span class="tag tag--orange">' + dom.esc(ch.title) + '</span>' : '') +
      (ch.titleSource === 'editor_note' ? '<span class="tag">非官方称号</span>' : '') +
      '</div>' +
      '<div class="char-meta" style="margin-top:6px">' +
      (ch.role ? '<span class="tag">' + dom.esc(ch.role) + '</span>' : '') +
      (ch.style ? '<span class="tag">' + dom.esc(ch.style) + '</span>' : '') +
      (ch.school ? '<span class="tag">' + dom.esc(ch.school) + '</span>' : '') +
      (ch.heightCm ? '<span class="small muted">' + ch.heightCm + ' cm</span>' : '') +
      (ch.weightKg ? '<span class="small muted">' + ch.weightKg + ' kg</span>' : '') +
      (ch.spanCm ? '<span class="small muted">臂展 ' + ch.spanCm + ' cm</span>' : '') +
      '</div></div>' +
      '<div style="text-align:right">' +
      '<div class="small muted">六维总和</div>' +
      '<div style="font-size:24px;font-weight:850;font-variant-numeric:tabular-nums">' +
      format.num(statSum(ch), 0) + '</div>' +
      (ch.dataStatus === 'partial'
        ? '<span class="badge badge--warn">部分数据</span>'
        : '<span class="badge badge--ok">数据完整</span>') +
      '</div>' +
      '</div>';

    // 雷达 + 数值
    if (entries.length) {
      var axes = entries.map(function (e) { return { label: e.key, max: 350 }; });
      var values = entries.map(function (e) { return e.value; });
      var radar = BBT.charts.radar({
        size: 330,
        axes: axes,
        series: [{ name: ch.name, color: 'var(--orange)', values: values }],
        rings: 4,
        ariaLabel: ch.name + ' 六维雷达'
      });
      var statRows = entries
        .map(function (e) {
          var base = baseline && baseline.stats[e.key];
          var diff = base ? e.value - base.avg : null;
          return (
            '<div class="row" style="justify-content:space-between;padding:5px 0;border-bottom:1px dashed var(--line)">' +
            '<span class="small">' + dom.esc(e.key) + '</span>' +
            '<span class="row" style="gap:10px">' +
            (base
              ? '<span class="tiny muted">位置均值 ' + format.num(base.avg, 1) + '</span>' +
                '<span class="tiny ' + (diff >= 0 ? '' : 'muted') + '" style="color:' +
                (diff >= 0 ? 'var(--green)' : 'var(--red)') + '">' + format.signed(diff, 1) + '</span>'
              : '') +
            '<strong class="num" style="font-size:14px">' + format.num(e.value, 0) + '</strong>' +
            '</span></div>'
          );
        })
        .join('');
      html +=
        '<div class="radar-wrap">' +
        '<div class="chart" style="padding:8px">' + radar +
        '<div class="chart-caption" style="text-align:center">C 层六维（GameKee 子集）：' + STAT_ORDER.join(' / ') + '</div></div>' +
        '<div>' +
        '<div class="section-label">C 层属性明细' +
        (baseline ? '<span class="badge badge--info badge--plain">同位置均值 n=' + baseline.count + '</span>' : '') +
        '</div>' + statRows +
        '<div class="small muted" style="margin-top:8px;line-height:1.6">' +
        '图鉴属性属于 <strong>C 层（二级比赛属性）</strong>，与训练用的 <strong>A 层（培养六属性）</strong> 不混算；' +
        '相对评分只在 C 层内部比较。C 层其余 8 项（篮板 / 逼抢 / 耐力 / 爆发 / 体力 / 体力上限 / 能量 / 能量上限）待客户端补全数值。</div>' +
        '</div></div>';
    } else {
      html +=
        '<div class="chart-empty">该角色暂无六维数据。<br/>运行 <span class="inline-code">node tool/scripts/build-data.mjs</span> 导入 T1 结构化数据后自动展示。</div>';
    }

    // 赛内等效值（版本差异：当前 = 面板；旧版回放 ×1.6 / ×0.8）
    var mechanics = BBT.mechanics;
    var conv = mechanics && mechanics.BATTLE_CONVERSION;
    if (conv && entries.length) {
      var convRows = entries
        .map(function (e) {
          return (
            '<tr><td>' + dom.esc(e.key) + '</td>' +
            '<td class="num">' + format.num(e.value, 0) + '</td>' +
            '<td class="num">' + format.num(e.value * conv.currentMultiplier, 1) + '</td>' +
            '<td class="num muted">' + format.num(e.value * conv.legacyMultiplier, 1) + '</td></tr>'
          );
        })
        .join('');
      html +=
        '<div><div class="section-label">赛内等效值（客户端确证 · 版本差异）' +
        dom.confBadge(conv.confidence.indexOf('客户端确证') === 0 ? '客户端确证' : '待验证') + '</div>' +
        '<div class="table-wrap"><table class="table" style="min-width:420px"><thead><tr>' +
        '<th>属性</th><th class="num">面板</th><th class="num">当前版本赛内</th><th class="num">旧版回放</th>' +
        '</tr></thead><tbody>' + convRows + '</tbody></table></div>' +
        '<p class="small muted" style="margin-top:8px">当前版本面板值 = 赛内值（ratio 1.0，默认）；' +
        '旧版回放才是 A 层 ×1.6 / 低系数 ×0.8（个别球员有 buff 偏移，见公式卡「赛内属性换算」）。</p></div>';
    }

    // 已知公式加值
    if (known.length) {
      html +=
        '<div><div class="section-label">已知公式加值（社区实测 / 截图）</div><div class="skill-list">' +
        known
          .map(function (k) {
            return (
              '<div class="skill-item"><div class="skill-head"><span class="skill-name">' +
              dom.esc(k.label) + '</span>' + dom.confBadge(k.confidence) + '</div>' +
              '<div class="skill-desc">' + dom.esc(k.value) + '</div>' +
              '<div class="skill-costs"><span>来源：' + dom.esc(k.source) + '</span></div></div>'
            );
          })
          .join('') +
        '</div></div>';
    }

    // 潜力
    if (Array.isArray(ch.potentials) && ch.potentials.length) {
      html +=
        '<div><div class="section-label">六项潜力' +
        (sums != null ? '<span class="badge badge--violet badge--plain">合计 ' + format.num(sums, 0) + '</span>' : '') +
        '</div>' +
        '<div class="potential-grid">' +
        ch.potentials
          .map(function (p) {
            return (
              '<div class="potential-item"><div class="k">槽位 ' + p.slot + '</div>' +
              '<div class="v">' + format.num(p.value, 0) + '</div></div>'
            );
          })
          .join('') +
        '</div>' +
        '<p class="small muted" style="margin-top:8px">wiki 原文未标注槽位与属性的对应关系，工具不臆造属性名。' +
        '（T5：潜力千分比成长权重 → 属性预测将在此扩展。）</p></div>';
    }

    // 技能
    if (Array.isArray(ch.skills) && ch.skills.length) {
      html +=
        '<div><div class="section-label">技能（' + ch.skills.length + '）</div><div class="skill-list">' +
        ch.skills
          .map(function (s) {
            var levels = Array.isArray(s.levels) ? s.levels : [];
            var levelText = levels
              .map(function (lv) {
                return lv.level ? 'Lv' + lv.level : '';
              })
              .filter(Boolean)
              .join(' / ');
            var costs = [];
            var first = levels[0];
            if (first) {
              if (first.energyCost != null) costs.push('能量 ' + first.energyCost);
              if (first.ptCost != null) costs.push('PT ' + first.ptCost);
            }
            return (
              '<div class="skill-item">' +
              '<div class="skill-head"><span class="skill-name">' + dom.esc(s.name) + '</span>' +
              (s.type ? '<span class="tag tag--blue">' + dom.esc(s.type) + '</span>' : '') +
              (levelText ? '<span class="tag">' + dom.esc(levelText) + '</span>' : '') +
              '</div>' +
              (s.summary ? '<div class="skill-desc">' + dom.esc(s.summary) + '</div>' : '') +
              (costs.length ? '<div class="skill-costs">' + costs.map(function (c) { return '<span>' + dom.esc(c) + '</span>'; }).join('') + '</div>' : '') +
              '</div>'
            );
          })
          .join('') +
        '</div></div>';
    }

    // 同位置对比
    if (baseline) {
      var same = all
        .filter(function (x) { return x.role === ch.role; })
        .sort(function (a, b) { return statSum(b) - statSum(a); });
      html +=
        '<div><div class="section-label">同位置参考（' + dom.esc(ch.role) + '，按六维总和排序）</div>' +
        '<div class="table-wrap"><table class="table" style="min-width:520px"><thead><tr>' +
        '<th>角色</th><th>稀有度</th><th class="num">六维总和</th><th class="num">潜力合计</th>' +
        '</tr></thead><tbody>' +
        same
          .map(function (x) {
            var isSelf = x === ch;
            return (
              '<tr' + (isSelf ? ' class="row-strong"' : '') + '><td>' + dom.esc(x.name) +
              (isSelf ? ' <span class="tag tag--orange">当前</span>' : '') + '</td>' +
              '<td>' + rarityTag(x.rarity) + '</td>' +
              '<td class="num">' + format.num(statSum(x), 0) + '</td>' +
              '<td class="num">' + (potentialSum(x) != null ? format.num(potentialSum(x), 0) : '—') + '</td></tr>'
            );
          })
          .join('') +
        '</tbody></table></div></div>';
    }

    // 最优笔记配置（占位，待养成逻辑定稿）
    if (BBT.notePlan && BBT.notePlan.renderNotePlanPlaceholder) {
      html += BBT.notePlan.renderNotePlanPlaceholder(ch);
    }

    // 元数据
    html +=
      '<div class="notice"><span class="notice-ico">🔗</span><span>' +
      '数据来源：' + (ch.source ? '<a href="' + dom.esc(ch.source) + '" target="_blank" rel="noreferrer">' +
        dom.esc(ch.source) + '</a>' : '—') +
      (ch.sourceUpdatedAt ? ' · 更新于 ' + dom.esc(ch.sourceUpdatedAt) : '') +
      '<br/>置信度：' + dom.confBadge(ch.confidence) +
      (ch.attributeSourceType ? '<br/>属性来源：' + dom.esc(ch.attributeSourceType) : '') +
      (ch.attributesSource ? '<br/><span class="tiny muted">' + dom.esc(ch.attributesSource) + '</span>' : '') +
      (ch.bodySource ? '<br/><span class="tiny muted">体格来源：' + dom.esc(ch.bodySource) + '</span>' : '') +
      (ch.releaseInfo && ch.releaseInfo.detail ? '<br/>实装：' + dom.esc(ch.releaseInfo.version || '') + ' · ' + dom.esc(ch.releaseInfo.detail) : '') +
      ' 属性/潜力为 wiki 标注的参考数值，非游戏内实际面板，以游戏内为准。</span></div>';

    return html;
  }

  views.codex = {
    id: 'codex',
    nav: '数据图鉴',
    icon: '📖',
    title: '数据图鉴',
    subtitle: '角色列表来自 T1 结构化数据（构建期固化为全局脚本，离线可读）。支持搜索、筛选、排序；点卡片看六维雷达与技能详情。',
    dataNote:
      '来源：T1 characters.json（GameKee wiki 参考值）+ T8 derived_roster；立绘来自 wiki，仅个人研究',
    mount: function (el, ctx) {
      var format = BBT.format;
      var data = dataOf(ctx);
      var all = data.characters || [];
      var local = {
        query: '',
        rarity: '全部',
        position: '全部',
        sort: 'default'
      };

      var rarities = ['全部'].concat(
        Array.from(new Set(all.map(function (c) { return c.rarity; }).filter(Boolean))).sort(
          function (a, b) { return (RARITY_ORDER[b] || 0) - (RARITY_ORDER[a] || 0); }
        )
      );
      var positions = ['全部'].concat(
        Array.from(new Set(all.map(function (c) { return c.role; }).filter(Boolean)))
      );

      var statusHtml =
        data.mode === 'structured'
          ? '<div class="notice notice--ok"><span class="notice-ico">✅</span><span><strong>数据已就绪：</strong>' +
            'T1 结构化数据 ' + all.length + ' 名角色，生成于 ' + dom.esc(data.generatedAt || '—') +
            '。图鉴六维 = C 层二级比赛属性的 <strong>子集</strong>（篮板 / 逼抢 / 耐力 / 爆发 / 体力 / 能量待客户端补全）；' +
            '训练计算用 A 层属性，两层不混算评分。属性 / 潜力为 wiki 参考值（非游戏内面板），详情页标注来源与更新日期。</span></div>'
          : data.mode === 'sample'
            ? '<div class="notice notice--warn"><span class="notice-ico">⚠️</span><span>' +
              '<strong>降级示例数据：</strong>当前展示内置示例名单（仅姓名/已知技能），六维与星级待导入。' +
              '运行 <span class="inline-code">node tool/scripts/build-data.mjs</span> 重新生成即可加载 T1 数据。</span></div>'
            : '<div class="notice notice--warn"><span class="notice-ico">⚠️</span><span>' +
              '<strong>未找到角色数据脚本：</strong>请确认 <span class="inline-code">tool/src/data/characters.js</span> 存在，' +
              '或运行 <span class="inline-code">node tool/scripts/build-data.mjs</span> 生成。</span></div>';

      var html = '';
      html += statusHtml;
      html +=
        '<div class="card card--pad">' +
        '<div class="codex-toolbar">' +
        '<label class="search-wrap" for="codex-search">' +
        dom.icon('search') +
        '<input class="search-input" id="codex-search" type="search" placeholder="搜索角色名 / 称号 / 学校 / 标签…" autocomplete="off">' +
        '</label>' +
        '<div class="row" style="gap:8px">' +
        '<select class="select" id="codex-position" aria-label="按位置筛选">' +
        positions.map(function (p) {
          return '<option value="' + dom.esc(p) + '">' + dom.esc(p === '全部' ? '全部位置' : p) + '</option>';
        }).join('') +
        '</select>' +
        '<select class="select" id="codex-sort" aria-label="排序方式">' +
        '<option value="default">默认顺序</option>' +
        '<option value="name">按名字</option>' +
        '<option value="rarity">按稀有度</option>' +
        '<option value="sum">按六维总和</option>' +
        '<option value="potential">按潜力合计</option>' +
        '</select>' +
        '</div></div>' +
        '<div class="row" style="margin-top:12px;gap:6px" id="codex-rarity">' +
        rarities.map(function (r) {
          return '<button class="seg-btn' + (r === '全部' ? ' is-active' : '') +
            '" data-rarity="' + dom.esc(r) + '" style="height:28px;padding:0 12px;font-size:12px;border-radius:999px;background:' +
            (r === '全部' ? 'var(--surface);box-shadow:var(--shadow-sm)' : 'transparent') + '">' +
            dom.esc(r === '全部' ? '全部稀有度' : r) + '</button>';
        }).join('') +
        '</div></div>';

      html += '<div class="spread"><div class="small muted" id="codex-count"></div>' +
        '<div class="small muted">数据来源：' + dom.esc(data.sourceLabel || data.source || '—') + '</div></div>';
      html += '<div id="codex-grid" class="codex-grid"></div>';

      el.innerHTML = html;

      var grid = dom.qs('#codex-grid', el);
      var countEl = dom.qs('#codex-count', el);

      function filtered() {
        var q = local.query.trim().toLowerCase();
        var list = all.filter(function (c) {
          if (local.rarity !== '全部' && c.rarity !== local.rarity) return false;
          if (local.position !== '全部' && c.role !== local.position) return false;
          if (!q) return true;
          var hay = [
            c.name,
            c.title,
            c.school,
            c.role,
            c.style,
            (c.aliases || []).join(' '),
            (c.tags || []).join(' '),
            (c.skills || []).map(function (s) { return s.name + ' ' + s.summary; }).join(' ')
          ]
            .join(' ')
            .toLowerCase();
          return hay.indexOf(q) >= 0;
        });
        if (local.sort === 'name') {
          list.sort(function (a, b) { return String(a.name).localeCompare(String(b.name), 'zh-Hans-CN'); });
        } else if (local.sort === 'rarity') {
          list.sort(function (a, b) {
            return (RARITY_ORDER[b.rarity] || 0) - (RARITY_ORDER[a.rarity] || 0) ||
              String(a.name).localeCompare(String(b.name), 'zh-Hans-CN');
          });
        } else if (local.sort === 'sum') {
          list.sort(function (a, b) { return statSum(b) - statSum(a); });
        } else if (local.sort === 'potential') {
          list.sort(function (a, b) { return (potentialSum(b) || 0) - (potentialSum(a) || 0); });
        }
        return list;
      }

      function renderGrid() {
        var list = filtered();
        countEl.textContent = '共 ' + list.length + ' / ' + all.length + ' 名角色' +
          (ctx && ctx.ownedCount ? ' · 已拥有 ' + ctx.ownedCount() + ' 名' : '');
        if (!list.length) {
          grid.innerHTML =
            '<div class="codex-empty" style="grid-column:1/-1">没有匹配的角色。<br/>试试清空搜索词或切换筛选条件。</div>';
          return;
        }
        grid.innerHTML = list
          .map(function (c) {
            var skills = (c.skills || []).slice(0, 2);
            var owned = ctx && ctx.isOwned ? ctx.isOwned(c.contentId) : true;
            return (
              '<article class="char-card' + (owned ? '' : ' is-unowned') + '" tabindex="0" role="button" data-char="' + dom.esc(c.id) + '" aria-label="查看 ' + dom.esc(c.name) + ' 详情">' +
              '<div class="char-top">' +
              avatarHtml(c) +
              '<div class="char-name-wrap">' +
              '<div class="char-name">' + dom.esc(c.name) + '</div>' +
              '<div class="char-meta">' + rarityTag(c.rarity) +
              (c.role ? '<span>' + dom.esc(c.role) + '</span>' : '') +
              (c.style ? '<span>· ' + dom.esc(c.style) + '</span>' : '') +
              (owned ? '' : '<span class="tag tag--unowned">未拥有</span>') +
              '</div></div></div>' +
              (c.title ? '<div class="small" style="color:var(--ink-2)">「' + dom.esc(c.title) + '」</div>' : '') +
              (c.stats
                ? '<div class="char-stat-row">' + statBarsHtml(c, 3) + '</div>'
                : '<div class="small muted">六维数据待导入</div>') +
              (skills.length
                ? '<div class="char-tags">' +
                  skills
                    .map(function (s) {
                      return '<span class="tag">' + dom.esc(s.name) + '</span>';
                    })
                    .join('') +
                  '</div>'
                : '') +
              '<div class="char-foot">' +
              '<span>' + (statSum(c) ? '六维 ' + format.num(statSum(c), 0) : '—') +
              (potentialSum(c) != null ? ' · 潜力 ' + format.num(potentialSum(c), 0) : '') + '</span>' +
              '<span>查看详情 →</span>' +
              '</div></article>'
            );
          })
          .join('');
      }

      if (!all.length) {
        grid.innerHTML =
          '<div class="codex-empty" style="grid-column:1/-1">暂无角色数据。<br/>运行构建脚本后刷新页面。</div>';
        countEl.textContent = '共 0 名角色';
      } else {
        renderGrid();
      }

      // 搜索
      var searchInput = dom.qs('#codex-search', el);
      searchInput.addEventListener('input', function () {
        local.query = searchInput.value;
        renderGrid();
      });

      dom.qs('#codex-position', el).addEventListener('change', function (event) {
        local.position = event.target.value;
        renderGrid();
      });

      dom.qs('#codex-sort', el).addEventListener('change', function (event) {
        local.sort = event.target.value;
        renderGrid();
      });

      dom.delegate(el, '[data-rarity]', 'click', function (event, target) {
        if (!target.closest('#codex-rarity')) return;
        local.rarity = target.getAttribute('data-rarity');
        dom.qsa('#codex-rarity .seg-btn', el).forEach(function (b) {
          var active = b === target;
          b.classList.toggle('is-active', active);
          b.style.background = active ? 'var(--surface)' : 'transparent';
          b.style.boxShadow = active ? 'var(--shadow-sm)' : 'none';
        });
        renderGrid();
      });

      // 打开详情
      function openDetail(id) {
        var ch = all.filter(function (c) { return String(c.id) === String(id); })[0];
        if (!ch) return;
        dom.modal({
          title: dom.esc(ch.name),
          subtitle: [ch.rarity, ch.role, ch.style].filter(Boolean).join(' · '),
          bodyHtml: detailHtml(all, ch, ctx),
          width: 900
        });
      }

      dom.delegate(el, '.char-card', 'click', function (event, target) {
        openDetail(target.getAttribute('data-char'));
      });

      dom.delegate(el, '.char-card', 'keydown', function (event, target) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openDetail(target.getAttribute('data-char'));
        }
      });
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

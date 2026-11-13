/*!
 * views/lineup.js —— 实战配队（tab id: lineup，第 4 页，替换原「器材说明」）
 *
 * 三个栏目：
 *   1) PVP 三阵配置（主阵 / 副阵 / 奇阵）
 *   2) 圣山队伍配置（蓝 / 紫 / 绿 / 红 四座圣山）
 *   3) 杯赛配置（按当届杯赛维护，需经常更新）
 *
 * 当前为「框架页」：栏目结构 + 规则占位 + 每阵容 5 个位置槽位（待配置占位）+ 备注；
 * 赛制规则/限制/克制关系由用户逐块补充后填入（不虚构规则）。
 * 备注持久化：localStorage 键 bbt.lineup.v1（按栏目 id 存）。
 */
(function (root) {
  'use strict';
  var BBT = (root.BBT = root.BBT || {});
  var views = (BBT.views = BBT.views || {});
  var dom = BBT.dom;

  var POS = ['控卫', '分卫', '小前', '大前', '中锋'];

  var SECTIONS = [
    {
      id: 'pvp',
      name: 'PVP 三阵配置',
      icon: '⚔️',
      status: '规则待补',
      desc: 'PVP 需要三套阵容：主阵 / 副阵 / 奇阵（每阵 5 个位置）。席位分配、克制关系、出场顺序与赛制规则待逐块补充。',
      groups: [
        { key: 'main', label: '主阵（第一阵容）', note: 'PVP 主力阵容' },
        { key: 'sub', label: '副阵（第二阵容）', note: 'PVP 副阵容/轮换' },
        { key: 'odd', label: '奇阵（针对阵容）', note: 'PVP 针对/奇袭阵容' }
      ]
    },
    {
      id: 'saint',
      name: '圣山队伍配置',
      icon: '⛰️',
      status: '规则待补',
      desc: '圣山四座（蓝=白神 / 红=希雅 / 绿=野上 / 紫=出羽）各一套队伍配置；圣山加成、需求特性与可偷分方式待逐块补充。',
      groups: [
        { key: 'blue', label: '蓝圣山', note: '敌方 BOSS：白神 时久（蓝卡/速度·破盾用蓝卡）' },
        { key: 'purple', label: '紫圣山', note: '敌方 BOSS：出羽 十明（无色 buff 类技能·仅大招破 2 层，无小技能）' },
        { key: 'green', label: '绿圣山', note: '敌方 BOSS：野上 泷（绿卡/技巧·破盾用绿卡）' },
        { key: 'red', label: '红圣山', note: '敌方 BOSS：希雅·奥黛拉（红卡/力量·破盾用红卡）' }
      ]
    },
    {
      id: 'cup',
      name: '杯赛配置',
      icon: '🏆',
      status: '需经常更新',
      desc: '杯赛赛制经常变化：不同杯赛有不同规则/限制。本栏目按「当届杯赛」维护，赛制规则与阵容需经常更新。',
      groups: [
        { key: 'cup-main', label: '杯赛主阵', note: '当届杯赛主力阵容' },
        { key: 'cup-sub', label: '杯赛备用阵', note: '当届杯赛备用/针对' }
      ]
    },
    {
      id: 'guildwar',
      name: '协会赛',
      icon: '🏯',
      status: '预览 · 解包数据，仅作参考',
      desc: '⚠️ 预览：本页全部为客户端解包数据（1.0.23 / res21 配置），仅作参考，实机数值以游戏内为准。圣山投射协会赛：5 环节赛制 + 赛程 + 19 关敌人表 + 帮助/奖励 + 决赛场配队建议。规则原文照录（file#poolOffset），敌人为 robot_conf 解包。'
    },
    {
      id: 'endless',
      name: '无尽之路',
      icon: '🛤️',
      status: '暂未实装',
      desc: '1.0.21/res20 新增玩法（配置表 S1.cn.endless_road）：赛季制 PVE 无尽挑战，段位名「大赛历战」。以下内容全部来自解包，玩法入口与规则待实装验证。'
    }
  ];

  var activeTab = 'pvp';
  var notesStore = Object.create(null);
  var notesLoaded = false;

  function esc(v) {
    return dom && dom.esc ? dom.esc(v) : String(v == null ? '' : v);
  }

  function loadNotes() {
    if (!notesLoaded) {
      notesLoaded = true;
      try {
        var raw = root.localStorage && root.localStorage.getItem('bbt.lineup.v1');
        if (raw) {
          var parsed = JSON.parse(raw) || {};
          for (var k in parsed) if (Object.prototype.hasOwnProperty.call(parsed, k)) notesStore[k] = parsed[k];
        }
      } catch (e) { /* ignore */ }
    }
    return notesStore;
  }

  function saveNote(id, val) {
    loadNotes();
    notesStore[id] = String(val || '');
    try {
      if (root.localStorage) root.localStorage.setItem('bbt.lineup.v1', JSON.stringify(notesStore));
    } catch (e) { /* ignore */ }
    BBT.__lineupNotes = notesStore;
  }

  function slotsHtml(group) {
    return (
      '<div class="card card--pad lineup-slot" data-lineup-slot="' + esc(group.key) + '">' +
      '<div class="card-head"><div>' +
      '<div class="card-title">' + esc(group.label) + '</div>' +
      '<div class="card-sub">' + esc(group.note || '') + ' · 5 个位置（待配置）</div>' +
      '</div><span class="badge badge--warn">槽位待补</span></div>' +
      '<div class="row" style="gap:6px;flex-wrap:wrap;margin-top:10px">' +
      POS.map(function (p) {
        return '<span class="tag tag--blue" title="待补充该位置的选人规则/条件">' + esc(p) + '：待配置</span>';
      }).join('') +
      '</div>' +
      '<div class="small muted" style="margin-top:8px">占位：该阵容的选人条件、星级要求、战术/器材/笔记搭配规则待补齐。</div>' +
      '</div>'
    );
  }

  function pvpData() {
    return (typeof window !== 'undefined' && window.BBTPvPData) || null;
  }
  var PVP_POS = ['控卫', '分卫', '小前', '大前', '中锋'];
  function ownedName(name) {
    var app = root.BBT && root.BBT.app;
    if (!app || typeof app.isOwnedByName !== 'function') return true;
    return !!app.isOwnedByName(name);
  }
  function ownedCountText() {
    var app = root.BBT && root.BBT.app;
    var ids = app && app.ownedIds;
    return ids ? String(ids.length) : '';
  }
  function ownedFilterNote() {
    var app = root.BBT && root.BBT.app;
    if (!app || typeof app.isOwnedByName !== 'function' || !app.ownedIds) return '';
    return '<span class="badge badge--ok">我的角色：' + esc(app.ownedIds.length) + ' 人（下拉显示全部，未拥有已标记）</span>';
  }
  /* 全角色列表（PVP/圣山/杯赛自选下拉共用；不再用「我的角色」隐藏，只标记未拥有） */
  function allCharEntries() {
    var map = Object.create(null);
    var gd = root.BBT && root.BBT.gameData;
    var chars = gd && typeof gd.characters === 'function' ? gd.characters() : [];
    chars.forEach(function (c) { if (c && c.name) map[c.name] = { name: c.name, role: c.role || c.style || '' }; });
    pvpCharList(pvpData()).forEach(function (c) { if (c && c.name && !map[c.name]) map[c.name] = { name: c.name, role: c.primaryRole || '' }; });
    var S = saintData();
    if (S && S.meta) Object.keys(S.meta).forEach(function (n) { if (n && !map[n]) map[n] = { name: n, role: '' }; });
    return Object.keys(map).sort().map(function (n) { return map[n]; });
  }
  function ownedMark(name) {
    return ownedName(name) ? '' : '（未拥有）';
  }
  /* PVP 锁定：其他两阵已选 + 当前阵其他位置已选（当前格自己的值由调用方保留） */
  function pvpLockedNames(dir, pos) {
    var draft = loadPvpDraft();
    var locked = Object.create(null);
    Object.keys(draft.teams).forEach(function (d) {
      if (d === dir) return;
      PVP_POS.forEach(function (p) { var nm = (draft.teams[d] || {})[p]; if (nm) locked[nm] = d; });
    });
    var team = draft.teams[dir] || {};
    PVP_POS.forEach(function (p) { if (p === pos) return; var nm = team[p]; if (nm) locked[nm] = 'same-team'; });
    return locked;
  }
  function dupNames(values) {
    var seen = Object.create(null); var dup = Object.create(null);
    values.forEach(function (n) { if (!n) return; if (seen[n]) dup[n] = 1; seen[n] = 1; });
    return Object.keys(dup);
  }
  function pickOwnedSlot(slot) {
    if (!slot) return null;
    if (ownedName(slot.name)) return { name: slot.name, replaced: false };
    var alts = (slot.alternatives || []).filter(ownedName);
    if (alts.length) return { name: alts[0], replaced: true, from: slot.name };
    return { name: slot.name, replaced: false, missing: true };
  }
  var PVP_DIRS = [{ key: 'paint', label: '攻筐队' }, { key: 'mid', label: '中投队' }, { key: 'three', label: '三分队' }];
  var pvpDraftCache = null;

  function pvpDraftDefault() { return { activeDir: 'paint', teams: { paint: {}, mid: {}, three: {} } }; }
  function loadPvpDraft() {
    if (pvpDraftCache) return pvpDraftCache;
    try {
      var raw = root.localStorage && root.localStorage.getItem('bbt.pvp.draft.v1');
      pvpDraftCache = raw ? JSON.parse(raw) : pvpDraftDefault();
    } catch (e) { pvpDraftCache = pvpDraftDefault(); }
    if (!pvpDraftCache || !pvpDraftCache.teams) pvpDraftCache = pvpDraftDefault();
    return pvpDraftCache;
  }
  function savePvpDraft() {
    try { if (root.localStorage) root.localStorage.setItem('bbt.pvp.draft.v1', JSON.stringify(pvpDraftCache)); } catch (e) { /* ignore */ }
  }
  function pvpRoleMap(P) {
    var m = {};
    ((P && P.roleCatalog) || []).forEach(function (c) { m[c.name] = c; });
    return m;
  }
  function pvpCharList(P) { return (P && P.roleCatalog) || []; }
  function dirAffinity(type, dir) {
    if (dir === 'paint') return (type === 'paint' || type === 'rebound') ? 1 : (type === 'swing' || type === 'defense') ? 0.7 : 0.5;
    if (dir === 'mid') return (type === 'mid' || type === 'swing') ? 1 : 0.6;
    return (type === 'three' || type === 'swing') ? 1 : 0.6;
  }
  function candidateList(P, dir, pos, allOwned) {
    var list = pvpCharList(P).map(function (c) {
      var raw = (c.rawByPos && c.rawByPos[pos]) || 0;
      return { name: c.name, role: c.primaryRole, stars: (c.starsByPos && c.starsByPos[pos]) || 0, score: raw + 0.25 * dirAffinity(c.type, dir) };
    });
    if (!allOwned) list = list.filter(function (x) { return ownedName(x.name); });
    return list.sort(function (a, b) { return b.score - a.score; });
  }
  function teamMetrics(P, dir) {
    var draft = loadPvpDraft();
    var team = draft.teams[dir] || {};
    var rm = pvpRoleMap(P);
    var counts = { main: 0, organizer: 0, defender: 0, rebound: 0, ball: 0, filled: 0, affinity: 0, scorerTags: 0, staminaTeam: 0, energy: 0 };
    PVP_POS.forEach(function (pos) {
      var nm = team[pos]; if (!nm) return;
      counts.filled += 1;
      var c = rm[nm] || {};
      if (c.primaryRole === '主攻核心') counts.main += 1;
      if (c.primaryRole === '组织核心') counts.organizer += 1;
      if (c.primaryRole === '防守核心') counts.defender += 1;
      if (/篮板/.test(c.primaryRole || '')) counts.rebound += 1;
      if (c.ballDependent) counts.ball += 1;
      if (c.scorerTag) counts.scorerTags += 1;
      if (c.staminaSupport === 'team') counts.staminaTeam += 1;
      if (c.energySupport) counts.energy += 1;
      if (dirAffinity(c.type, dir) >= 1) counts.affinity += 1;
    });
    var warns = [];
    if (counts.filled === 5) {
      if (counts.scorerTags >= 4) warns.push('⚠ 得分手过多（' + counts.scorerTags + '/5）：球权严重冲突');
      else if (counts.scorerTags === 3) warns.push('⚠ 3 名得分手：注意球权分配');
      if (counts.main > 2) warns.push('主攻核心 ' + counts.main + ' 人 >2 → 会抢球权');
      if (counts.main < 1) warns.push('缺主攻核心/终结点');
      if (counts.organizer < 1) warns.push('缺组织/中转核心');
      if (counts.defender < 1) warns.push('⚠ 防守偏弱：缺防守核心');
      if (counts.rebound < 1) warns.push('⚠ 篮板偏弱：缺篮板（主/副核）');
      if (counts.staminaTeam + counts.organizer < 1) warns.push('⚠ 无耐力回复手段：建议至少 1 名组织者（可学回复耐力）；力竭后全属性下降，PVP 耐力战劣势');
      else if (counts.staminaTeam < 1 && counts.organizer >= 1) warns.push('耐力回复：靠组织者学习（当前组织者 ' + counts.organizer + ' 人）');
    }
    return counts.concat ? counts : Object.assign(counts, { warns: warns });
  }
  function usedAcrossTeams(P, exceptDir) {
    var draft = loadPvpDraft();
    var used = {};
    Object.keys(draft.teams).forEach(function (d) {
      if (d === exceptDir) return;
      PVP_POS.forEach(function (pos) { var nm = draft.teams[d][pos]; if (nm) used[nm] = d; });
    });
    return used;
  }
  function pvpBaselineHtml(P) {
    if (!P || !P.userLineups || !P.userLineups.teams) return '';
    var cards = P.userLineups.teams.map(function (t) {
      var rows = PVP_POS.map(function (pos) {
        var cell = (t.positions || {})[pos] || {};
        return '<tr><td><strong>' + esc(pos) + '</strong></td><td>' + esc(cell.name || '—') + '</td><td class="small muted">' + esc(cell.roleNote || '') + '</td></tr>';
      }).join('');
      return '<div class="card card--pad" data-user-team="' + esc(t.label) + '" style="margin-bottom:10px">' +
        '<div class="card-head"><div><div class="card-title">' + esc(t.label) + '（我的配置·基线）</div>' +
        '<div class="card-sub">' + esc(t.system) + ' 体系 · 用户实机口述</div></div><span class="badge badge--ok">基线</span></div>' +
        '<div class="table-wrap" style="margin-top:8px"><table class="table" style="min-width:560px"><thead><tr><th>位置</th><th>角色</th><th>职责/备注（用户口述）</th></tr></thead><tbody>' + rows + '</tbody></table></div></div>';
    }).join('');
    return '<div id="pvp-baseline" style="margin-top:10px">' + cards + '</div>';
  }
  function pvpBuilderHtml(P) {
    var draft = loadPvpDraft();
    var dir = draft.activeDir || 'paint';
    var tabs = PVP_DIRS.map(function (d) {
      return '<button type="button" class="btn btn--sm' + (d.key === dir ? ' btn--primary' : ' btn--ghost') + '" data-pvp-dir="' + d.key + '">' + esc(d.label) + '</button>';
    }).join('');
    var rm = pvpRoleMap(P);
    var rows = PVP_POS.map(function (pos) {
      var cur = (draft.teams[dir] || {})[pos] || '';
      var locked = pvpLockedNames(dir, pos);
      // 下拉 = 全部 38 人（按该位置/方向推荐分排序）；PVP 锁：排除其他阵/本阵其他位置已选，当前格自己的值保留
      var full = candidateList(P, dir, pos, true);
      var cands = full
        .filter(function (x) { return !locked[x.name] || x.name === cur; })
        .slice(0, 4)
        .map(function (x) { return '<button type="button" class="tag" data-pvp-chip="' + esc(pos) + '|' + esc(x.name) + '" title="' + esc(x.role) + '">' + esc(x.name) + ' ' + esc(x.stars) + '★</button>'; })
        .join(' ');
      var options = full
        .filter(function (x) { return !locked[x.name] || x.name === cur; })
        .map(function (x) {
          return '<option value="' + esc(x.name) + '"' + (x.name === cur ? ' selected' : '') + '>' + esc(x.name) + '（' + esc(x.stars) + '★ · ' + esc(x.role) + '）' + esc(ownedMark(x.name)) + '</option>';
        }).join('');
      return '<tr><td><strong>' + esc(pos) + '</strong></td>' +
        '<td><select class="select" data-pvp-sel="' + esc(pos) + '" style="max-width:240px"><option value="">— 选择 —</option>' + options + '</select></td>' +
        '<td class="small">' + (cands || '<span class="muted">—</span>') + '</td></tr>';
    }).join('');
    var m = teamMetrics(P, dir);
    var warnHtml = (m.warns || []).map(function (w) { return '<span class="badge badge--warn">' + esc(w) + '</span>'; }).join(' ');
    var uniqUsed = {};
    Object.keys(draft.teams).forEach(function (d) { PVP_POS.forEach(function (pos) { var nm = draft.teams[d][pos]; if (nm) uniqUsed[nm] = 1; }); });
    return '<div class="card card--pad" id="pvp-builder" style="margin-top:10px">' +
      '<div class="card-head"><div><div class="card-title">🛠️ 自选配队（选方向 → 每位置选人/推荐）</div>' +
      '<div class="card-sub">先确定体系方向（攻筐/中投/三分），系统按该方向给每位置推荐候选；下拉=全部 38 人（推荐序在前）。<strong>PVP 选一个锁一个</strong>：已选角色在其他阵/本阵其他位置自动隐藏；建议每队 1~2 主攻 + 组织 + 防守 + 篮板。</div></div>' +
      '<span class="badge badge--client">玩家自选</span></div>' +
      '<div class="row" style="gap:6px;margin-top:10px;flex-wrap:wrap">' + tabs + ownedFilterNote() +
      '<button type="button" class="btn btn--sm btn--ghost" data-pvp-load="' + dir + '">载入我的' + esc((PVP_DIRS.filter(function (d) { return d.key === dir; })[0] || {}).label || '') + '</button>' +
      '<button type="button" class="btn btn--sm btn--ghost" data-pvp-clear="' + dir + '">清空</button></div>' +
      '<div class="table-wrap" style="margin-top:8px"><table class="table" style="min-width:700px"><thead><tr><th>位置</th><th>选择</th><th>推荐候选（本方向）</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap">' +
      '<span class="badge badge--warn">主攻核心 ' + m.main + '</span><span class="badge badge--info">组织 ' + m.organizer + '</span>' +
      '<span class="badge badge--info">防守 ' + m.defender + '</span><span class="badge badge--neutral">篮板 ' + m.rebound + '</span>' +
      '<span class="badge badge--warn">得分手标签 ' + m.scorerTags + '</span>' +
      '<span class="badge ' + (m.staminaTeam > 0 ? 'badge--ok' : 'badge--neutral') + '">全队回耐 ' + m.staminaTeam + '</span>' +
      '<span class="badge badge--info">组织者 ' + m.organizer + '</span>' +
      '<span class="badge badge--neutral">回能量 ' + m.energy + '</span>' +
      '<span class="badge badge--neutral">持球大招标记 ' + m.ball + '</span><span class="badge badge--neutral">本系亲和 ' + m.affinity + '</span></div>' +
      '<div class="row" style="gap:4px;margin-top:6px;flex-wrap:wrap">' + (warnHtml || '<span class="badge badge--ok">结构 OK</span>') + '</div>' +
      '<div class="tiny muted" style="margin-top:6px">三阵合计已用角色 ' + Object.keys(uniqUsed).length + '/15（PVP 锁：选一个锁一个，已选角色在其他阵/本阵其他位置自动隐藏；当前格只在此处出现时保留）</div>' +
      '</div>';
  }
  function pvpAutoHtml(P) {
    if (!P || !P.mainPlan || !P.mainPlan.teams) return '';
    var posOrder = PVP_POS;
    var teamCards = (P.mainPlan.teams || []).map(function (t) {
      var rows = posOrder.map(function (p) {
        var c = (t.positions || {})[p] || {};
        return '<tr><td><strong>' + esc(p) + '</strong></td><td><strong>' + esc(c.name || '—') + '</strong></td><td class="small">' + esc(c.roleLabel || '') + '</td><td class="num">' + esc(c.stars) + '★#' + esc(c.rank) + '</td></tr>';
      }).join('');
      var alts = [];
      var altMap = (P.alternates || {})[t.label] || {};
      posOrder.forEach(function (p) { var list = altMap[p] || []; if (list.length) alts.push('<div class="tiny muted" style="margin-top:2px">' + esc(p) + '替补：' + list.map(function (x) { return esc(x.name) + '(' + esc(x.stars) + '★)'; }).join('、') + '</div>'); });
      return '<div class="card card--pad" data-pvp-team="' + esc(t.label) + '" style="margin-bottom:10px">' +
        '<div class="card-head"><div><div class="card-title">' + esc(t.label) + '（自动推荐）</div><div class="card-sub">评分 ' + esc(t.score) + ' · 职责：主攻 ' + esc((t.roleCounts && (t.roleCounts.mainScorers != null ? t.roleCounts.mainScorers : t.roleCounts.ballScorers)) || 0) + ' / 组织 ' + esc((t.roleCounts && t.roleCounts.playmakers) || 0) + ' / 防守 ' + esc((t.roleCounts && t.roleCounts.defenders) || 0) + ' / 篮板 ' + esc((t.roleCounts && t.roleCounts.rebounders) || 0) + '</div></div><span class="badge badge--warn">自动</span></div>' +
        '<div class="table-wrap" style="margin-top:8px"><table class="table" style="min-width:620px"><thead><tr><th>位置</th><th>角色</th><th>职责</th><th class="num">星级/排序</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        (alts.length ? '<details class="fold" style="margin-top:6px"><summary class="small" style="cursor:pointer">该队各位置替补</summary>' + alts.join('') + '</details>' : '') + '</div>';
    }).join('');
    var planRows = (P.altPlans || []).map(function (p) {
      return '<tr><td class="small">' + esc(p.label) + '</td><td class="num">' + esc(p.totalScore) + '</td><td class="num small">' + esc((p.teamScores || []).join(' / ')) + '</td><td class="num small">' + esc(p.balance) + '</td></tr>';
    }).join('');
    return '<details class="card card--pad" id="pvp-auto" style="margin-top:12px"><summary class="strong" style="cursor:pointer">🤖 自动推荐（参考方案：攻筐+中投+三分各一队）</summary>' +
      '<div class="tiny muted" style="margin-top:8px">自动方案按「位置适配 + 体系亲和 + 职责结构」生成，可作参考；实际请用上面的自选配队按你的角色池调整。</div>' +
      teamCards +
      '<div class="table-wrap" style="margin-top:8px"><table class="table" style="min-width:560px"><thead><tr><th>方案</th><th class="num">总分</th><th class="num">队伍分</th><th class="num">均衡度</th></tr></thead><tbody>' +
      '<tr class="row-strong"><td class="small">攻筐 + 中投 + 三分（主）</td><td class="num">' + esc(P.mainPlan.totalScore) + '</td><td class="num small">' + esc((P.mainPlan.teamScores || []).join(' / ')) + '</td><td class="num small">' + esc(P.mainPlan.balance) + '</td></tr>' + planRows + '</tbody></table></div>' +
      '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">📌</span><span>' + esc((P.twoFormationNow && P.twoFormationNow.note) || '') + '</span></div>' +
      '<div class="tiny muted" style="margin-top:6px">' + esc(P.caveat || '') + '</div></details>';
  }
  function renderSaint(el) { paint(el); }

  function pvpBaseTeamsHtml() {
    var d = root.BBTPvpBaseTeams;
    if (!d || !Array.isArray(d.teams) || !d.teams.length) return '';
    var meta = d.meta || {};
    var blocks = d.teams.map(function (t) {
      var rows = (t.slots || []).map(function (s) {
        return '<tr><td>' + esc(s.pos) + '</td><td><strong>' + esc(s.name) + '</strong></td><td>' + esc(s.style) + '</td><td class="small">' + esc(s.role) + '</td></tr>';
      }).join('');
      var tag = t.name.indexOf('一阵') >= 0 ? '主阵' : (t.name.indexOf('二阵') >= 0 ? '副阵' : '奇阵');
      return '<div class="card card--pad" data-pvp-base="' + esc(t.id) + '" style="margin-top:10px">' +
        '<div class="card-head"><div><div class="card-title">' + esc(t.name) + '</div>' +
        '<div class="card-sub">' + esc(t.styleComboText || '') + '</div></div>' +
        '<span class="badge badge--ok">' + esc(tag) + '</span></div>' +
        '<div class="table-wrap" style="margin-top:6px"><table class="table" style="min-width:520px"><thead><tr><th>位置</th><th>角色</th><th>风格</th><th>定位 / 技能</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
        (t.strength ? '<div class="small" style="margin-top:6px"><strong>强项：</strong>' + esc(t.strength) + '</div>' : '') +
        (t.weakness ? '<div class="small muted" style="margin-top:2px"><strong>弱点：</strong>' + esc(t.weakness) + '</div>' : '') +
        (t.notes ? '<div class="tiny muted" style="margin-top:2px">备注：' + esc(t.notes) + '</div>' : '') +
        '</div>';
    }).join('');
    return '<div class="card card--pad" id="pvp-base-teams" style="margin-bottom:12px">' +
      '<div class="card-head"><div><div class="card-title"><span class="ico">🗂️</span>我的 PVP 三基阵（2026-11-13 重构）</div>' +
      '<div class="card-sub">' + esc(meta.note || '') + '</div></div>' +
      '<span class="badge badge--ok">用户口径</span></div>' +
      '<div class="small muted" style="margin-top:4px">风格规则：' + esc(meta.styleRule || '') + '</div>' +
      blocks + '</div>';
  }

  function renderPvp(el) {
    var host = el.querySelector('#pvp-body');
    if (!host) return;
    var P = pvpData();
    host.innerHTML = pvpBaseTeamsHtml() + pvpBaselineHtml(P) + pvpBuilderHtml(P) + pvpAutoHtml(P);
  }
  function pvpHtml() {
    return '<div id="pvp-body">' + pvpBaseTeamsHtml() + pvpBaselineHtml(pvpData()) + pvpBuilderHtml(pvpData()) + pvpAutoHtml(pvpData()) + '</div>';
  }

  var SAINT_ORDER = ['blue', 'red', 'green', 'purple'];
  var SAINT_POS = ['控卫', '分卫', '小前', '大前', '中锋'];
  var saintDraftCache = null;
  var saintViewKey = null;
  function loadSaintDraft() {
    if (saintDraftCache) return saintDraftCache;
    try {
      var raw = root.localStorage && root.localStorage.getItem('bbt.saint.draft.v1');
      var parsed = raw ? JSON.parse(raw) : null;
      if (parsed && parsed.teams) saintDraftCache = parsed;
      else if (parsed && parsed.team) { var k = parsed.mountain || 'purple'; var t = {}; t[k] = parsed.team; saintDraftCache = { mountain: k, teams: t }; }
      else saintDraftCache = { mountain: 'purple', teams: {} };
    } catch (e) { saintDraftCache = { mountain: 'purple', teams: {} }; }
    if (!saintDraftCache.teams) saintDraftCache.teams = {};
    return saintDraftCache;
  }
  function saveSaintDraft() { try { if (root.localStorage) root.localStorage.setItem('bbt.saint.draft.v1', JSON.stringify(saintDraftCache)); } catch (e) {} }
  function saintTeamOf(key) { var d = loadSaintDraft(); return (d.teams && d.teams[key]) || {}; }
  function setSaintTeam(key, team) { var d = loadSaintDraft(); d.mountain = key; if (!d.teams) d.teams = {}; d.teams[key] = team || {}; saveSaintDraft(); }
  function saintData() {
    var sd = (typeof window !== 'undefined' && window.BBScenarios) || null;
    return sd ? { plans: sd.saintTeamPlans || {}, meta: sd.saintCharMeta || {}, cand: sd.saintCandidates || {}, mount: sd.saintMountains || {}, scoring: sd.saintScoring || null } : null;
  }
  function saintSchedule() {
    var S = (typeof window !== 'undefined' && window.BBTSaintSchedule) || null;
    return S ? S.compute(Date.now()) : null;
  }
  function saintView() {
    if (saintViewKey && SAINT_ORDER.indexOf(saintViewKey) >= 0) return saintViewKey;
    var s = saintSchedule();
    return s ? s.key : 'red';
  }
  function setSaintView(k) { if (SAINT_ORDER.indexOf(k) >= 0) saintViewKey = k; }
  function saintMountainMeta(key) {
    var S = saintData(); if (!S) return {};
    var m = S.mount[key] || {};
    var attr = (m.breakAttr || '').indexOf('速') >= 0 ? '速' : (m.breakAttr || '').indexOf('力') >= 0 ? '力' : (m.breakAttr || '').indexOf('技') >= 0 ? '技' : '无属性';
    return { key: key, name: m.name || key, attr: attr, boss: m.boss || '', recognition: ((S.cand[key] || {}).recognition) || [] };
  }
  function saintChecks(key) {
    var S = saintData(); var mm = saintMountainMeta(key);
    var team = saintTeamOf(key);
    var counts = { breakers: 0, stealers: 0, energy: 0, playmaker: 0, dual: 0, filled: 0 };
    SAINT_POS.forEach(function (pos) {
      var nm = team[pos]; if (!nm) return;
      counts.filled += 1;
      var meta = (S.meta || {})[nm] || {};
      var isBreak = (meta.ultAttrs || []).indexOf(mm.attr) >= 0;
      var isSteal = (meta.actions || []).some(function (a) { return mm.recognition.indexOf(a) >= 0; });
      if (isBreak) counts.breakers += 1;
      if (isSteal) counts.stealers += 1;
      if (isBreak && isSteal) counts.dual += 1;
      if (meta.energySupport) counts.energy += 1;
      if (meta.primaryRole === '组织核心') counts.playmaker += 1;
    });
    var warns = [];
    if (counts.filled === 5) {
      var needBreak = key === 'purple' ? 3 : 1;
      if (counts.breakers < needBreak) warns.push('⚠ 破盾手不足：' + counts.breakers + ' 人（建议 ≥' + needBreak + '）');
      if (counts.stealers < 1) warns.push('⚠ 缺偷分手（认可动作角色）');
      if (key === 'purple' && counts.energy + counts.playmaker < 1) warns.push('⚠ 无回能/组织资源：大招循环会很慢');
      if (key === 'purple' && counts.dual > 0) warns.push('注意：紫圣山破盾与偷分通常应是不同人（双职仅皆川式例外）');
    }
    return { counts: counts, warns: warns };
  }
  function saintScheduleHtml() {
    var s = saintSchedule(); if (!s) return '';
    return '<div class="notice notice--info" id="saint-schedule" style="margin-bottom:10px"><span class="notice-ico">⏰</span><span>' +
      '<strong>当前圣山：' + esc(s.label) + '</strong>（第 ' + esc(s.day) + ' 天 / ' + esc(s.days) + ' 天）' +
      ' · 距轮换 <b>' + esc(s.remainingText) + '</b>' +
      ' · 下一个：<b>' + esc(s.nextLabel) + '</b>（' + esc(s.nextAtText) + '）' +
      '<br><span class="tiny muted">轮换顺序：' + esc(s.orderText) + '；每 3 天 05:00（Asia/Shanghai）轮换 · 按系统时间自动计算</span>' +
      '</span><button type="button" class="btn btn--sm btn--ghost" data-saint-sched-refresh="1" style="margin-left:8px">刷新时间</button></div>';
  }
  function saintViewTabsHtml() {
    var s = saintSchedule();
    var cur = s ? s.key : 'red';
    var view = saintView();
    var S = saintData(); if (!S) return '';
    var btns = SAINT_ORDER.map(function (k) {
      var p = S.plans[k] || {};
      var isCur = k === cur;
      var active = k === view;
      return '<button type="button" class="btn btn--sm' + (active ? ' btn--primary' : ' btn--ghost') + '" data-saint-view="' + k + '">' +
        esc(p.name || k) + (isCur ? ' · 当前' : '') + '</button>';
    }).join('');
    var back = view !== cur ? '<button type="button" class="btn btn--sm btn--ghost" data-saint-view="' + cur + '">回到当前</button>' : '';
    return '<div class="row" style="gap:6px;margin-bottom:10px;flex-wrap:wrap" id="saint-view-tabs">' +
      '<span class="small muted" style="align-self:center">查看圣山：</span>' + btns + back + ownedFilterNote() + '</div>';
  }
  function saintRecognitionHtml(key) {
    var S = saintData(); if (!S || !S.scoring) return '';
    var s = S.scoring; var g = s.global || {}; var rec = g.recognition || {};
    var mr = (s.mountains || {})[key] || {};
    var m = (S.mount || {})[key] || {};
    var badges = (mr.recognition || []).map(function (r) {
      return '<span class="badge ' + (r.points === 900 ? 'badge--warn' : 'badge--neutral') + '">' + esc(r.action) + (r.points ? ' +' + esc(r.points) : '') + '</span>';
    }).join(' ');
    return '<div class="notice notice--info" style="margin-bottom:10px"><span class="notice-ico">🏆</span><span>' +
      '<strong>' + esc(m.name || key) + ' · 认可度（偷分）：</strong>' + (badges || '待补') +
      '<div class="tiny muted" style="margin-top:4px">非常认可 +' + esc(rec.high || 900) + ' / 一般认可 +' + esc(rec.normal || 300) +
      '；胜利 +20%（看运气，优先偷分）；每山 3 种认可方式。' + (mr.note ? ' ' + esc(mr.note) : '') + '</div>' +
      (mr.optimalExample ? '<div class="small" style="margin-top:4px">最优解参考：' + esc(mr.optimalExample) + '</div>' : '') +
      '</span></div>';
  }
  function saintPlanCardHtml(key) {
    var S = saintData(); if (!S || !S.plans || !S.plans[key]) return '';
    var p = S.plans[key];
    var eqs = (p.equipment || []).map(function (e) {
      return '<span class="tag" title="' + esc(e.reason || '') + '">' + esc(e.equip) + '→' + esc(e.skill) + '<span class="tiny muted">（' + esc(e.kind || '') + '）</span></span>';
    }).join(' ');
    var rows = (p.slots || []).map(function (s) {
      var pick = pickOwnedSlot(s);
      var alts = (s.alternatives || []).slice(0, 4).map(function (n) {
        var own = ownedName(n);
        return '<span class="tag' + (own ? '' : ' is-muted') + '">' + esc(n) + (own ? '' : '（未拥有）') + '</span>';
      }).join(' ');
      var nameHtml = '<strong>' + esc(pick.name) + '</strong>';
      if (pick.missing) nameHtml = '<strong class="muted">' + esc(pick.name) + '（未拥有）</strong>';
      var rep = pick.replaced ? '<div class="tiny" style="color:#c92a2a">推荐 ' + esc(pick.from) + ' 未拥有 → 已替换为下位替代</div>' : '';
      return '<tr><td class="small">' + esc(s.role) + '</td><td>' + nameHtml + rep + (s.reason ? '<div class="tiny muted">' + esc(s.reason) + '</div>' : '') + (s.note ? '<div class="tiny muted">' + esc(s.note) + '</div>' : '') + '</td><td class="small">' + (alts || '<span class="muted">—</span>') + '</td></tr>';
    }).join('');
    return '<div class="card card--pad" data-saint-plan="' + key + '" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">' + esc(p.name) + ' · 推荐方案（5 人）</div>' +
      '<div class="card-sub">BOSS ' + esc(p.boss) + ' · 破盾 ' + esc(p.breakAttr) + '</div></div>' +
      '<span class="badge badge--client">下位替代</span></div>' +
      (p.strategyNote ? '<div class="tiny muted" style="margin:6px 0">' + esc(p.strategyNote) + '</div>' : '') +
      '<div class="table-wrap" style="margin-top:6px"><table class="table" style="min-width:600px"><thead><tr><th>职责</th><th>推荐</th><th>下位替代</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div style="margin-top:8px"><strong class="small">推荐器材（不用凑 5 件，按你的器材挑）：</strong><div style="margin-top:4px">' + (eqs || '<span class="muted small">—</span>') + '</div></div>' +
      '</div>';
  }
  function saintBuilderHtml(key) {
    var S = saintData(); if (!S || !S.meta) return '';
    // 2026-11-12 用户口径：下拉列全部角色（不再按「我的角色」隐藏），未拥有只标记；圣山不锁定（可重复，仅软提示）
    var entries = allCharEntries();
    if (!entries.length) entries = Object.keys(S.meta).sort().map(function (n) { return { name: n, role: '' }; });
    var plan = S.plans[key] || {};
    var team = saintTeamOf(key);
    var recNames = (plan.slots || []).map(function (s) { var pk = pickOwnedSlot(s); return pk ? pk.name : ''; });
    var slots = SAINT_POS.map(function (pos, i) {
      var cur = team[pos] || '';
      var opts = entries.map(function (x) {
        return '<option value="' + esc(x.name) + '"' + (x.name === cur ? ' selected' : '') + '>' +
          esc(x.name) + (x.role ? '（' + esc(x.role) + '）' : '') + esc(ownedMark(x.name)) + '</option>';
      }).join('');
      var rec = recNames[i] ? '<span class="tiny muted">推荐：' + esc(recNames[i]) + '</span>' : '';
      return '<tr><td><strong>' + esc(pos) + '</strong></td>' +
        '<td><select class="select" data-saint-sel="' + esc(pos) + '" style="max-width:220px"><option value="">— 选择 —</option>' + opts + '</select></td>' +
        '<td class="small">' + rec + '</td></tr>';
    }).join('');
    var chk = saintChecks(key);
    var mm = saintMountainMeta(key);
    var dup = dupNames(SAINT_POS.map(function (p) { return team[p]; }));
    var dupHtml = dup.length
      ? '<span class="badge badge--warn">重复选择：' + esc(dup.join('、')) + '（圣山不锁定，可重复；仅提示）</span>'
      : '<span class="badge badge--ok">不锁定：可跨山/同山重复使用</span>';
    var warnHtml = (chk.warns || []).map(function (w) { return '<span class="badge badge--warn">' + esc(w) + '</span>'; }).join(' ');
    return '<div class="card card--pad" id="saint-builder" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">🛠️ 自选配队（' + esc(mm.name) + '）</div>' +
      '<div class="card-sub">当前圣山：' + esc(mm.name) + '（破盾 ' + esc(mm.attr) + '）· 圣山<strong>不锁定</strong>：下拉=全部角色（未拥有已标记），同山/跨山可重复选，仅提示不禁止。</div></div>' +
      '<span class="badge badge--client">玩家自选</span></div>' +
      '<div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap">' +
      '<button type="button" class="btn btn--sm btn--ghost" data-saint-load="' + key + '">载入推荐</button>' +
      '<button type="button" class="btn btn--sm btn--ghost" data-saint-clear="' + key + '">清空</button></div>' +
      '<div class="table-wrap" style="margin-top:8px"><table class="table" style="min-width:600px"><thead><tr><th>位置</th><th>选择</th><th>参考</th></tr></thead><tbody>' + slots + '</tbody></table></div>' +
      '<div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap">' +
      '<span class="badge badge--warn">破盾手 ' + chk.counts.breakers + '</span><span class="badge badge--info">偷分手 ' + chk.counts.stealers + '</span>' +
      '<span class="badge badge--info">回能 ' + chk.counts.energy + '</span><span class="badge badge--neutral">组织 ' + chk.counts.playmaker + '</span>' +
      '<span class="badge badge--neutral">双职 ' + chk.counts.dual + '</span>' + dupHtml + '</div>' +
      '<div class="row" style="gap:4px;margin-top:6px;flex-wrap:wrap">' + (warnHtml || '<span class="badge badge--ok">结构 OK</span>') + '</div></div>';
  }
  function saintCandidatesHtml(key) {
    var S = saintData(); if (!S || !S.cand || !S.cand[key]) return '';
    var v = S.cand[key];
    var brk = (v.breakers || []).filter(function (b) { return ownedName(b.name); }).slice(0, 8).map(function (b) {
      var tr = (v.breakerTraits || {})[b.name] || {};
      var tags = (tr.energy ? '[回能]' : '') + (tr.playmaker ? '[组织]' : '') + (tr.stamina === 'team' ? '[回耐]' : '');
      return '<span class="tag" title="' + esc((b.skills || []).join('/')) + '">' + esc(b.name) + (b.dualActions && b.dualActions.length ? ' ★' : '') + (tags ? '<span class="tiny muted">' + tags + '</span>' : '') + '</span>';
    }).join(' ');
    var stl = (v.stealers || []).filter(function (s) { return ownedName(s.name); }).slice(0, 6).map(function (s) {
      return '<span class="tag">' + esc(s.name) + '<span class="tiny muted">（' + esc((s.actions || []).join('/')) + '）</span></span>';
    }).join(' ');
    var eqs = (v.equipmentFits || []).slice(0, 8).map(function (e) {
      return '<span class="tag" title="' + esc(e.reason || '') + '">' + esc(e.equip) + '→' + esc(e.skill) + '<span class="tiny muted">（' + esc(e.kind || '') + '）</span></span>';
    }).join(' ');
    return '<div class="card card--pad" data-saint-cand="' + key + '" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">' + esc(v.name) + ' · 候选清单</div>' +
      '<div class="card-sub">BOSS ' + esc(v.boss || '') + ' · 破盾 ' + esc(v.cardColor || '') + '/' + esc(v.attr || '') + '</div></div>' +
      '<span class="badge badge--neutral">破盾手/偷分手/器材</span></div>' +
      '<div style="margin-top:8px"><strong class="small">破盾手：</strong><div style="margin-top:4px">' + (brk || '<span class="muted small">暂无已拥有候选</span>') + '</div></div>' +
      '<div style="margin-top:8px"><strong class="small">偷分手：</strong><div style="margin-top:4px">' + (stl || '<span class="muted small">暂无已拥有候选</span>') + '</div></div>' +
      '<div style="margin-top:8px"><strong class="small">适配器材：</strong><div style="margin-top:4px">' + (eqs || '<span class="muted small">—</span>') + '</div></div></div>';
  }
  function saintCommonRulesHtml() {
    var sd = (typeof window !== 'undefined' && window.BBScenarios) || null;
    var r = sd && sd.saintCommonRules;
    if (!r) return '';
    var crystal = r.crystal || {};
    var br = r.break_rules || {};
    return '<details class="fold"><summary class="small" style="cursor:pointer">圣山统一规则（点击展开）</summary>' +
      '<div class="notice notice--info" style="margin-top:6px"><span class="notice-ico">⛰️</span><span>' +
      '敌方 BOSS 自带 <b>' + esc(crystal.stacks || 6) + ' 层圣山结晶</b>（每层能量回复 <b>' + esc(crystal.perStackEnergyRegen || '+20%') + '</b>）；' +
      esc(br.ultimate || '对应卡色大招破 2 层') + '；' + esc(br.small_skill || '小技能破 1 层（须成功）') + '；后期留结晶 → BOSS 全队属性大幅提升。核心是刷认可度（偷分），不是打赢。' +
      '<br><span class="tiny muted">' + esc(br.colorNote || '') + '</span></span></div></details>';
  }


  function cupData() {
    var s = (typeof window !== 'undefined' && window.BBScenarios) || null;
    return s && s.cupEvents ? s.cupEvents : null;
  }

  /* ===== 杯赛自选配队（2026-11-12 用户口径：杯赛不锁定，可重复；全角色下拉 + 未拥有标记） ===== */
  var cupDraftCache = null;
  function cupDraftDefault() { return { teams: { 'cup-main': {}, 'cup-sub': {} } }; }
  function loadCupDraft() {
    if (cupDraftCache) return cupDraftCache;
    try {
      var raw = root.localStorage && root.localStorage.getItem('bbt.cup.draft.v1');
      var parsed = raw ? JSON.parse(raw) : null;
      cupDraftCache = parsed && parsed.teams ? parsed : cupDraftDefault();
    } catch (e) { cupDraftCache = cupDraftDefault(); }
    if (!cupDraftCache.teams) cupDraftCache.teams = {};
    return cupDraftCache;
  }
  function saveCupDraft() { try { if (root.localStorage) root.localStorage.setItem('bbt.cup.draft.v1', JSON.stringify(cupDraftCache)); } catch (e) {} }
  function cupTeamOf(key) { var d = loadCupDraft(); return (d.teams && d.teams[key]) || {}; }
  function setCupTeam(key, team) { var d = loadCupDraft(); if (!d.teams) d.teams = {}; d.teams[key] = team || {}; saveCupDraft(); }
  function cupBuilderHtml(group) {
    var entries = allCharEntries();
    var team = cupTeamOf(group.key);
    var dup = dupNames(SAINT_POS.map(function (p) { return team[p]; }));
    var rows = SAINT_POS.map(function (pos) {
      var cur = team[pos] || '';
      var opts = entries.map(function (x) {
        return '<option value="' + esc(x.name) + '"' + (x.name === cur ? ' selected' : '') + '>' +
          esc(x.name) + (x.role ? '（' + esc(x.role) + '）' : '') + esc(ownedMark(x.name)) + '</option>';
      }).join('');
      return '<tr><td><strong>' + esc(pos) + '</strong></td>' +
        '<td><select class="select" data-cup-sel="' + esc(group.key) + '|' + esc(pos) + '" style="max-width:240px"><option value="">— 选择 —</option>' + opts + '</select></td></tr>';
    }).join('');
    return '<div class="card card--pad" data-cup-team="' + esc(group.key) + '" style="padding:10px">' +
      '<div class="card-head"><div><div class="card-title">' + esc(group.label) + '</div>' +
      '<div class="card-sub">' + esc(group.note || '') + ' · 5 个位置 · <strong>不锁定</strong>（可重复使用；下届杯赛规则待更新）</div></div>' +
      '<span class="badge badge--client">玩家自选</span></div>' +
      (dup.length ? '<div class="row" style="gap:4px;margin-top:6px;flex-wrap:wrap"><span class="badge badge--warn">重复选择：' + esc(dup.join('、')) + '（杯赛不锁定，仅提示）</span></div>' : '') +
      '<div class="table-wrap" style="margin-top:8px"><table class="table" style="min-width:420px"><thead><tr><th>位置</th><th>选择</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap"><button type="button" class="btn btn--sm btn--ghost" data-cup-clear="' + esc(group.key) + '">清空</button>' +
      '<span class="tiny muted">杯赛不锁定：可跨模式/同队重复；下拉=全部角色（未拥有已标记）</span></div></div>';
  }

  function cupSectionHtml(sec) {
    var notes = loadNotes();
    var data = cupData();
    var ev = data && (data.events || []).filter(function (e) { return e.id === 'lidong-cup'; })[0];
    if (!ev) ev = data && (data.events || [])[0];
    var head = '<div class="card card--pad" id="lineup-section-cup">' +
      '<div class="card-head"><div><div class="card-title">🏆 杯赛配置 · ' + esc((ev && ev.name) || '当届杯赛') + '</div>' +
      '<div class="card-sub">' + esc((ev && ev.summary) || sec.desc) + '</div></div>' +
      '<span class="badge badge--warn">' + esc((ev && ev.statusLabel) || '已结束') + ' · 规则参考 · 需经常更新</span></div>' +
      '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">📌</span><span class="small">' +
      '本页记录的是<strong>已结束的立冬杯</strong>，仅作为杯赛机制参考；下一届杯赛规则可能不同，不要直接套用。' +
      '</span></div></div>';
    if (!ev) {
      return head + '<div class="small muted">杯赛数据待补。</div>';
    }

    var terrain = ev.terrain || {};
    var terrainCard = '<div class="card card--pad" id="cup-terrain" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">🌧️ 特别场地特性 · ' + esc(terrain.name || '') + '</div>' +
      '<div class="card-sub">触发时间：' + esc(terrain.timing || '—') + '</div></div>' +
      '<span class="badge badge--info">场地规则</span></div>' +
      '<ul class="small" style="margin:8px 0 0 18px">' + (terrain.effects || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';

    var zones = '<div class="card card--pad" id="cup-zones" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">🎯 赛区 & 奖励</div>' +
      '<div class="card-sub">两个赛区奖励基本相同，区别只在时尚小垃圾。</div></div></div>' +
      '<div class="grid grid--2" style="gap:8px;margin-top:6px">' +
      (ev.zones || []).map(function (z) {
        return '<div class="card card--pad" style="padding:8px"><strong>' + esc(z.name) + '</strong><div class="small muted">' + esc(z.restriction) + '</div></div>';
      }).join('') + '</div>' +
      '<div class="small" style="margin-top:8px"><strong>奖励：</strong>' + esc(ev.rewards && ev.rewards.same || '') + '</div>' +
      '<div class="small muted" style="margin-top:2px">差异：' + esc(ev.rewards && ev.rewards.difference || '') + '</div></div>';

    var stages = '<div class="card card--pad" id="cup-format" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">📋 赛制流程（三轮）</div>' +
      '<div class="card-sub">' + esc(ev.formatNote || '') + '</div></div><span class="badge badge--neutral">已结束 · 参考</span></div>' +
      (ev.format || []).map(function (st, i) {
        return '<div class="card card--pad" data-cup-stage="' + i + '" style="margin-top:6px;padding:8px">' +
          '<div class="small"><strong>' + esc(st.stage) + '</strong> · ' + esc(st.duration || '') + '</div>' +
          '<div class="small" style="margin-top:3px">' + esc(st.rule) + '</div>' +
          '<div class="tiny muted" style="margin-top:3px">' + esc(st.chances || '') + '</div></div>';
      }).join('') + '</div>';

    var quiz = ev.quiz ? ('<div class="card card--pad" id="cup-quiz" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">🔮 ' + esc(ev.quiz.title) + '</div>' +
      '<div class="card-sub">决赛会开竞猜；这里有一个很容易理解错的点。</div></div><span class="badge badge--warn">特别注明</span></div>' +
      '<div class="notice notice--warn" style="margin-top:8px"><span class="notice-ico">⚠️</span><span class="small"><strong>误区：</strong>' + esc(ev.quiz.wrong) + '</span></div>' +
      '<div class="notice notice--ok" style="margin-top:6px"><span class="notice-ico">✅</span><span class="small"><strong>实际竞猜的是：</strong>' + esc(ev.quiz.right) + '</span></div>' +
      '<div class="small" style="margin-top:6px"><strong>要考虑：</strong>' + (ev.quiz.factors || []).map(function (x) { return '<span class="tag">' + esc(x) + '</span>'; }).join(' ') + '</div>' +
      '<div class="small" style="margin-top:8px"><strong>立冬杯答案：</strong>' + esc(ev.quiz.lidongAnswer) + '</div>' +
      '<div class="tiny muted" style="margin-top:3px">' + esc(ev.quiz.lidongWhy) + '</div>' +
      '<div class="tiny muted" style="margin-top:6px">' + esc(ev.quiz.note) + '</div></div>') : '';

    return head + terrainCard + zones + stages + quiz +
      '<div class="card card--pad" id="cup-slots" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">🥊 当届杯赛阵容（自选）</div><div class="card-sub">主阵/备用阵各 5 位置，<strong>不锁定</strong>（可重复使用；工具不做限制，游戏内固定队伍属赛制规则）；立冬杯只作机制参考，下一届需更新。</div></div>' +
      '<span class="badge badge--neutral">下一届需更新</span></div>' +
      '<div class="grid grid--2" style="gap:12px;margin-top:10px">' + (sec.groups || []).map(cupBuilderHtml).join('') + '</div></div>' +
      '<div class="team-sub-label" style="margin-top:12px">杯赛规则 / 限制（可补充）</div>' +
      '<textarea class="input" id="lineup-note-cup" data-lineup-note="cup" rows="4" maxlength="4000" placeholder="补充杯赛规则/限制/配队思路（自动保存到本地）…">' + esc(notes['cup'] || '') + '</textarea>';
  }

  /* ================= 协会赛（圣山投射协会赛）数据渲染 =================
   * 数据：tool/src/data/guild-war.js（window.BBTGuildWarData）
   * 口径：规则原文照录（file#poolOffset）；敌人=robot_conf 解包（AI 实际以游戏内为准）；
   *       环节归属=推断；敌人 104-106 为游戏内运行时生成（决赛场/终局已按用户实机规则补全六维）；
   *       guild_war.schedule 表为 2027 占位不采用。
   */
  function guildWarData() {
    return (typeof window !== 'undefined' && window.BBTGuildWarData) || null;
  }
  var GW_ATTR_NAMES = ['投射', '弹跳', '防守', '体能', '运控', '意识'];
  var GW_ATTR_IDS = ['101', '102', '103', '104', '105', '106'];
  function gwAttrBadge(mm) {
    var key = mm.attrSource || 'runtime';
    var cls = (key === 'screenshot' || key === 'verified') ? 'badge--ok' : key === 'pending' ? 'badge--warn' : key === 'runtime' ? 'badge--neutral' : 'badge--info';
    return '<span class="badge ' + cls + '">' + esc(mm.attrSourceLabel || '推断') + '</span>';
  }
  function gwEnemyRowHtml(mm) {
    var name = esc(mm.characterName || '') + (mm.aiName ? '（' + esc(mm.aiName) + '）' : '');
    var cells;
    if (mm.fullAttrs) {
      cells = GW_ATTR_NAMES.map(function (n) {
        var v = mm.fullAttrs[n];
        return '<td class="num">' + (v == null ? '—' : esc(v)) + '</td>';
      }).join('');
    } else {
      cells = GW_ATTR_IDS.slice(0, 3).map(function (id) {
        var v = mm.property && mm.property[id] != null ? mm.property[id] : null;
        return '<td class="num">' + (v == null ? '—' : esc(v)) + '</td>';
      }).join('') + '<td class="num muted" colspan="3">运行时生成（未解出）</td>';
    }
    var sumTxt = mm.attrSum != null
      ? '<div class="tiny muted">Σ=' + esc(mm.attrSum) + (mm.sumMatchesPropRank ? ' = propRank ✓' : '') + '</div>'
      : '';
    return '<tr data-gw-enemy="' + esc(mm.positionRaw) + '" data-gw-actor="' + esc(mm.actorId) + '" data-gw-attr-source="' + esc(mm.attrSource || 'runtime') + '">' +
      '<td><strong>' + esc(mm.position) + '</strong></td>' +
      '<td>' + name + '</td>' +
      '<td class="num">' + esc(mm.level) + '</td>' +
      '<td class="num">' + esc(mm.rank) + ' / ' + esc(mm.propRank) + '</td>' +
      cells +
      '<td class="small">' + gwAttrBadge(mm) + sumTxt + '</td></tr>';
  }
  function gwMatchHtml(match) {
    var mainHp = match.mainStage && match.mainStage.matchHealth != null ? match.mainStage.matchHealth : '—';
    var trialHp = match.trialStage && match.trialStage.matchHealth != null ? match.trialStage.matchHealth : '—';
    var teams = (match.enemyTeams || []).map(function (t) {
      return '<div class="small" style="margin-top:2px">敌方队伍：<strong>' + esc(t.showName || t.teamName) + '</strong>' +
        '（体系名 ' + esc(t.teamName) + ' · teamRank ' + esc(t.teamRank) + ' · rankLv ' + esc(t.rankLv) + '）</div>';
    }).join('');
    var rows = (match.enemyTeams || []).reduce(function (acc, t) { return acc.concat(t.members || []); }, []).map(gwEnemyRowHtml).join('');
    var anyFull = (match.enemyTeams || []).some(function (t) {
      return (t.members || []).some(function (x) { return !!x.fullAttrs; });
    });
    var pre = '';
    if (match.preMatch && match.preMatch.length) pre += '<div class="tiny muted">前置关卡：' + esc(match.preMatch.join('、')) + '</div>';
    if (match.preMatch1 && match.preMatch1.length) pre += '<div class="tiny muted">前置(分站)：' + esc(match.preMatch1.join('、')) + '</div>';
    if (match.preMatch2 && match.preMatch2.length) pre += '<div class="tiny muted">前置(分站)：' + esc(match.preMatch2.join('、')) + '</div>';
    return '<details class="fold" data-gw-match="' + esc(match.matchId) + '" style="margin:4px 0;border:1px solid var(--line);border-radius:8px;padding:6px 10px">' +
      '<summary class="small strong" style="cursor:pointer">关卡 #' + esc(match.matchId) + ' ' + esc(match.showName) +
      '（' + esc(match.name) + '）· 主赛血量 ' + esc(mainHp) + ' / 试训版 ' + esc(trialHp) + '</summary>' +
      '<div class="tiny muted" style="margin-top:4px">我方 base/lose score：' + esc(match.baseScore) + ' / ' + esc(match.loseScore) + pre + '</div>' +
      teams +
      (match.phase ? '<div class="tiny muted">环节（推断）：' + esc(match.phase.phase) + ' · ' + esc(match.phase.detail || '') + '</div>' : '') +
      '<div class="table-wrap" style="margin-top:6px"><table class="table" style="min-width:860px"><thead><tr>' +
      '<th>位置</th><th>角色（AI 名）</th><th class="num">等级</th><th class="num">rank / propRank</th>' +
      '<th class="num">投射</th><th class="num">弹跳</th><th class="num">防守</th>' +
      '<th class="num">体能</th><th class="num">运控</th><th class="num">意识</th><th>属性来源</th>' +
      '</tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="tiny muted" style="margin-top:4px">' +
      (anyFull
        ? '本关六维已补全（实机截图/推断见行内标签；104-106 生成规则见下方「敌人属性生成规则」卡）。'
        : '本关客户端静态表只有 101/102/103 三项；104-106 为游戏内运行时生成（规则未解出），不编造。') +
      '</div>' +
      '</details>';
  }
  function gwLineupsHtml() {
    var L = (typeof window !== 'undefined' && window.BBTGuildWarLineups) || null;
    if (!L || !L.teams || !L.teams.length) return '';
    var B = L.boss || {};
    var statRows = (B.stats ? Object.keys(B.stats) : []).map(function (k) {
      return '<tr><td><strong>' + esc(k) + '</strong></td><td class="num">' + esc(B.stats[k]) + '</td></tr>';
    }).join('');
    var moveRows = (B.moves || []).map(function (m) {
      return '<tr><td class="small"><strong>' + esc(m.name) + '</strong><div class="tiny muted">' + esc(m.card) + '</div></td>' +
        '<td class="small">' + esc(m.power) + '</td><td class="small muted">' + esc(m.note) + '</td></tr>';
    }).join('');
    var bossCard = '<div class="card card--pad" id="gw-lineup-boss" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">👹 决赛场 BOSS · ' + esc(B.name) + '</div>' +
      '<div class="card-sub">' + esc(B.pos) + ' · ' + esc(B.body) + ' · 困难档六维</div></div>' +
      '<span class="badge badge--warn">BOSS 数据</span></div>' +
      '<div class="grid grid--2" style="gap:10px;margin-top:8px">' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>六维（困难档）</th><th class="num">数值</th></tr></thead><tbody>' + statRows + '</tbody></table></div>' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>动作</th><th>威力</th><th>说明</th></tr></thead><tbody>' + moveRows + '</tbody></table></div>' +
      '</div>' +
      '<ul class="small" style="margin:8px 0 0 18px">' + (B.tips || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>';
    var TB = L.terrainBuff;
    var terrainCard = TB ? '<div class="card card--pad" id="gw-terrain-buff" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">🌐 ' + esc(TB.name) + '</div>' +
      '<div class="card-sub">表演赛期间全程生效 · 配置解包</div></div>' +
      '<span class="badge badge--client">场地 buff</span></div>' +
      '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">⚡</span><span class="small"><strong>' + esc(TB.desc) + '</strong></span></div>' +
      '<div class="small" style="margin-top:6px"><strong>覆盖范围：</strong>' + esc(TB.scope) + '</div>' +
      '<div class="small" style="margin-top:2px"><strong>配置链：</strong>' + esc(TB.config) + '</div>' +
      '<div class="small" style="margin-top:2px"><strong>上限：</strong>' + esc(TB.maxTier) + '</div>' +
      '<div class="small muted" style="margin-top:2px"><strong>推算：</strong>' + esc(TB.calc) + '</div>' +
      '<div class="tiny muted" style="margin-top:2px">' + esc(TB.verify) + '</div></div>' : '';
    var teamCards = (L.teams || []).map(function (t) {
      var slotRows = (t.slots || []).map(function (s) {
        return '<tr><td><strong>' + esc(s.pos) + '</strong></td><td><strong>' + esc(s.name) + '</strong></td><td class="small">' + esc(s.style) + '</td><td class="small muted">' + esc(s.role) + '</td></tr>';
      }).join('');
      return '<div class="card card--pad" data-gw-lineup="' + esc(t.id) + '" style="margin-bottom:10px">' +
        '<div class="card-head"><div><div class="card-title">' + esc(t.name) + '</div>' +
        '<div class="card-sub">' + esc(t.summary) + '</div></div>' +
        '<span class="badge ' + esc(t.badge || 'badge--info') + '">' + esc(t.tier) + '</span></div>' +
        '<div class="table-wrap" style="margin-top:8px"><table class="table" style="min-width:560px"><thead><tr><th>位置</th><th>角色</th><th>风格</th><th>作用</th></tr></thead><tbody>' + slotRows + '</tbody></table></div>' +
        '<div class="small" style="margin-top:6px"><strong>风格加成：</strong>' + esc(t.bonus) + '</div>' +
        (t.chain ? '<div class="small" style="margin-top:2px"><strong>联动：</strong>' + esc(t.chain) + '</div>' : '') +
        (t.threshold ? '<div class="small" style="margin-top:2px"><strong>硬撼门槛：</strong>' + esc(t.threshold) + '</div>' : '') +
        (t.math ? '<div class="small" style="margin-top:2px"><strong>克制计算：</strong>' + esc(t.math) + '</div>' : '') +
        (t.risk ? '<div class="tiny muted" style="margin-top:2px">⚠️ ' + esc(t.risk) + '</div>' : '') +
        '</div>';
    }).join('');
    return bossCard + terrainCard + '<div class="card card--pad" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">🎯 决赛场三套推荐配队</div>' +
      '<div class="card-sub">' + esc(L.note) + '</div></div>' +
      '<span class="badge badge--ok">玩家讨论版 · 非官方</span></div>' +
      (L.teamPlans ? '<ul class="small" style="margin:8px 0 0 18px">' + L.teamPlans.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') +
      teamCards +
      '<ul class="small" style="margin:8px 0 0 18px">' + (L.commonTips || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<div class="tiny muted" style="margin-top:6px">来源：' + esc(L.source) + '（生成 ' + esc(L.generatedAt) + '）</div></div>';
  }

  /* 敌人属性生成规则卡（2026-11-13 用户实机口径） */
  function gwAttrRuleCardHtml(G) {
    var F = G.enemyFullAttrs || {};
    var rule = F.rule || {};
    var tiers = rule.tiers || {};
    var tierOrder = rule.tierOrder || ['普通', '中等', '困难'];
    var tierRows = tierOrder.map(function (t) {
      var r = tiers[t] || {};
      return '<tr data-gw-attr-tier="' + esc(t) + '"><td><strong>' + esc(t) + '</strong></td>' +
        '<td class="num">' + esc(r.main) + '</td><td class="num">' + esc(r.sec) + '</td><td class="num">' + esc(r.rest) + '</td></tr>';
    }).join('');
    var profiles = rule.profiles || {};
    var profileChips = Object.keys(profiles).map(function (actorId) {
      var p = profiles[actorId] || {};
      return '<span class="tag">' + esc(actorId) + '：主' + esc(p.mainName || '') + ' / 副' + esc(p.secName || '') + '</span>';
    }).join(' ');
    var boss = rule.boss || {};
    var bossCells = GW_ATTR_NAMES.map(function (n) {
      var id = GW_ATTR_IDS[GW_ATTR_NAMES.indexOf(n)];
      var v = boss.attrs ? boss.attrs[id] : null;
      return '<td class="num">' + (v == null ? '—' : esc(v)) + '</td>';
    }).join('');
    var cov = F.coverage || {};
    var src = F.source || {};
    var verify = rule.verification || {};
    var verifyHtml = verify.finalRuleVerified
      ? '<div class="notice notice--ok" style="margin-top:8px"><span class="notice-ico">✅</span><span class="small">' +
        '<strong>终局规则验证（用户实机截图 2026-11-13）：</strong>' + esc(verify.detail || '') + '<br>' +
        esc(verify.sumNote || '') + (verify.legendaryNote ? '<br>' + esc(verify.legendaryNote) : '') +
        (verify.bossNote ? '<br>' + esc(verify.bossNote) : '') + '</span></div>'
      : '';
    return '<div class="card card--pad" id="gw-attr-rule" data-gw-attr-rule="1" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">⚙️ 敌人属性生成规则（六维补全）</div>' +
      '<div class="card-sub">客户端静态表只存 3 项（投射/弹跳/防守），体能/运控/意识由游戏内按「主/副/其余」规则生成；玩家实机截图已证实。</div></div>' +
      '<span class="badge badge--ok">用户实机口径 2026-11-13</span></div>' +
      (G.meta.enemyFullAttrsNote ? '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">📐</span><span class="small">' + esc(G.meta.enemyFullAttrsNote) + '</span></div>' : '') +
      '<div class="team-sub-label" style="margin-top:10px">决赛场三档数值（主属性 / 副属性 / 其余）</div>' +
      '<div class="table-wrap" style="margin-top:6px"><table class="table" style="min-width:520px"><thead><tr>' +
      '<th>难度档</th><th class="num">主属性</th><th class="num">副属性</th><th class="num">其余</th></tr></thead><tbody>' + tierRows + '</tbody></table></div>' +
      '<div class="small" style="margin-top:6px"><strong>主/副属性由角色位置（profile）决定：</strong>' + (profileChips || '—') + '</div>' +
      '<div class="small" style="margin-top:4px"><strong>终局挑战换算：</strong>' + esc(rule.ultimateFormula || '') + '</div>' +
      verifyHtml +
      '<div style="margin-top:10px"><strong class="small">👹 BOSS ' + esc(boss.name || '米歇尔·杰奎琳') + '（actor ' + esc(boss.actorId || 1999) + '）· 困难档实机截图六维：</strong></div>' +
      '<div class="table-wrap" style="margin-top:6px"><table class="table" style="min-width:560px"><thead><tr><th>投射</th><th>弹跳</th><th>防守</th><th>体能</th><th>运控</th><th>意识</th><th class="num">总和</th></tr></thead>' +
      '<tbody><tr>' + bossCells + '<td class="num"><strong>' + esc(boss.sum) + '</strong>（=总评）</td></tr></tbody></table></div>' +
      '<div class="tiny muted" style="margin-top:4px">' + esc(boss.note || '') + '</div>' +
      '<div class="row" style="gap:6px;margin-top:10px;flex-wrap:wrap">' +
      '<span class="badge badge--ok">' + esc(cov.fullSix) + ' 人六维完整（决赛场 15 + 终局 ' + esc((cov.finalTeamFull ? 5 : 3)) + '）</span>' +
      '<span class="badge badge--warn">' + esc(cov.pendingSix) + ' 人待实机</span>' +
      '<span class="badge badge--neutral">' + esc(cov.runtimeGenerated) + ' 人 104-106 运行时生成（分站赛 75 人）</span>' +
      '<span class="badge badge--info">共 ' + esc(cov.totalEnemies) + ' 名敌人</span></div>' +
      '<div class="tiny muted" style="margin-top:6px">来源：' + esc(src.screenshot || '用户实机截图 2026-11-13') +
      (src.screenshotFinal ? '；' + esc(src.screenshotFinal) : '') + '；' + esc(src.client || '客户端静态 3 项') +
      '。推断值已标「推断」，未解出的不编造。</div></div>';
  }

  function guildwarSectionHtml(sec) {
    var G = guildWarData();
    if (!G) {
      return '<div class="card card--pad" id="lineup-section-guildwar"><div class="player-missing">协会赛数据未加载：请先生成 tool/src/data/guild-war.js（node tool/scripts/build-guild-war.mjs）。</div></div>';
    }
    var notes = loadNotes();
    var ruleSource = G.meta.ruleSource || '';
    var head = '<div class="card card--pad" id="gw-head" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">🏯 ' + esc(G.meta.title || '协会赛') + '</div>' +
      '<div class="card-sub">' + esc(G.meta.versionNote || '') + ' · 5 个阶段 · 19 关敌人 · 帮助三选一 · 奖励</div></div>' +
      '<span class="badge badge--client">客户端配置解包</span></div>' +
      '<div class="table-wrap" style="margin-top:8px"><table class="table" style="min-width:560px"><thead><tr><th>项</th><th>内容</th></tr></thead><tbody>' +
      '<tr><td><strong>活动名</strong></td><td>' + esc(G.activity.name) + '（活动页 meta id=' + esc(G.activity.collectionId) + '，open/close_time 与规则原文一致）</td></tr>' +
      '<tr><td><strong>开放时间</strong></td><td><strong>' + esc(G.activity.openTimeLocal) + '</strong> ~ <strong>' + esc(G.activity.closeTimeLocal) + '</strong>（来源=配置说明原文；<strong>以服务端为准</strong>）</td></tr>' +
      '<tr><td><strong>解锁条件</strong></td><td>' + esc(G.activity.unlockName) + '系统：' + esc(G.activity.unlockDesc || '') + '</td></tr>' +
      '<tr><td><strong>报名方式</strong></td><td>' + (G.activity.signupRules || []).map(function (r) { return esc(r.rule); }).join('；') + '</td></tr>' +
      '</tbody></table></div>' +
      '<div class="notice notice--warn" style="margin-top:8px"><span class="notice-ico">⚠️</span><span class="small">' +
      esc(G.meta.scheduleNote || '') + '<br>开通时间说明：<strong>2026-11-13 05:00 ~ 2026-12-03 04:59</strong>；客户端 guild_war.schedule 表内时间戳为 2027 年占位，本页不采用该表时间。</span></div></div>';

    var sectionMap = {};
    (G.ruleSections || []).forEach(function (s) { sectionMap[s.title] = s; });
    var phaseCards = (G.phases || []).map(function (p) {
      var sec2 = sectionMap[p.name] || { items: [] };
      var items = sec2.items || [];
      return '<div class="card card--pad" data-gw-phase="' + esc(p.key) + '" style="padding:10px">' +
        '<div class="card-head"><div><div class="card-title">' + esc(p.name) + '</div>' +
        '<div class="card-sub">' + esc(p.start) + ' ~ ' + esc(p.end) + '</div></div>' +
        '<span class="badge badge--info">配置原文</span></div>' +
        '<ul class="small" style="margin:8px 0 0 18px">' + items.map(function (it) { return '<li>' + esc(it) + '</li>'; }).join('') + '</ul>' +
        '<div class="tiny muted" style="margin-top:6px">出处：' + esc(ruleSource) + '</div></div>';
    }).join('');
    var phasesCard = '<div class="card card--pad" id="gw-phases" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">📜 5 环节赛制（原文照录 + 要点）</div>' +
      '<div class="card-sub">预热期 / 报名期 / 分站表演赛 / 终局挑战赛 / 结算期；原文来自 ' + esc(ruleSource) + '（' + esc(G.meta.ruleLength) + ' 字）</div></div>' +
      '<span class="badge badge--warn">原文引用</span></div>' +
      '<div class="grid grid--2" style="gap:10px;margin-top:10px">' + phaseCards + '</div>' +
      '<details class="fold" style="margin-top:10px"><summary class="small strong" style="cursor:pointer">规则原文全文（' + esc(G.meta.ruleLength) + ' 字，点击展开）</summary>' +
      '<pre class="small" style="white-space:pre-wrap;margin:8px 0 0;font-family:inherit">' + esc(G.mainRule.plain) + '</pre></details>' +
      '<div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap">' + (G.quotes || []).map(function (q) {
        return '<span class="tag" title="' + esc(q.file + ' @' + q.poolOffset) + '">' + esc(q.plain) + '</span>';
      }).join('') + '</div></div>';

    var scheduleRows = (G.phases || []).map(function (p) {
      return '<tr data-gw-schedule="' + esc(p.key) + '"><td><strong>' + esc(p.name) + '</strong></td><td>' + esc(p.start) + '</td><td>' + esc(p.end) + '</td></tr>';
    }).join('');
    var scheduleCard = '<div class="card card--pad" id="gw-schedule" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">🗓️ 赛程表（2026 档期 · 配置原文）</div>' +
      '<div class="card-sub">原文：预热 11.13 05:00–11.20 04:59 / 报名 11.20 05:00–11.22 04:59 / 分站 11.22 05:00–11.29 04:59 / 终局 11.29 10:00–12.1 04:59 / 结算 12.1 05:00–12.3 04:59</div></div>' +
      '<span class="badge badge--ok">2026 原文</span></div>' +
      '<div class="table-wrap" style="margin-top:8px"><table class="table" style="min-width:520px"><thead><tr><th>阶段</th><th>开始</th><th>结束</th></tr></thead><tbody>' + scheduleRows + '</tbody></table></div>' +
      '<div class="tiny muted" style="margin-top:4px">客户端 schedule 表（2027 占位）仅作对照：' + (G.schedulePlaceholder || []).map(function (s) { return esc(s.startLocal) + '→' + esc(s.endLocal); }).join('；') + '（不采用）</div></div>';
    var attrRuleCard = gwAttrRuleCardHtml(G);

    var matchMap = {};
    (G.matches || []).forEach(function (m) { matchMap[m.matchId] = m; });
    var enemyGroups = (G.matchGroups || []).map(function (g) {
      var fold = (g.matchIds || []).map(function (id) {
        var m = matchMap[id];
        return m ? gwMatchHtml(m) : '';
      }).join('');
      return '<div data-gw-group="' + esc(g.key) + '" style="margin-top:10px">' +
        '<div class="team-sub-label">' + esc(g.label) + '<span class="badge badge--warn" style="margin-left:8px">环节归属：推断</span></div>' +
        '<div class="tiny muted" style="margin-bottom:4px">' + esc(g.note || '') + '</div>' + fold + '</div>';
    }).join('');
    var enemyCard = '<div class="card card--pad" id="gw-enemies" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">⚔️ 19 关敌人表（按环节分组 · 每关 5 人）</div>' +
      '<div class="card-sub">阵容来自客户端 robot_conf 解包（guild_war.match → 队伍表 → 机器人表）；<strong>AI 实际数值以游戏内为准</strong>。共 ' + esc(G.matchCount) + ' 关 / ' + esc(G.enemyCount) + ' 名敌人。</div></div>' +
      '<span class="badge badge--client">客户端解包</span></div>' +
      '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">📌</span><span class="small">' +
      esc(G.meta.aiNameNote || '') + '<br>' + esc(G.meta.enemyAttrNote || '') + '<br>' + esc(G.meta.stageMatchNote || '') +
      '</span></div>' + enemyGroups + '</div>';

    var attrHelp = (G.help.attributeHelp || []).map(function (h) {
      return '<div class="card card--pad" data-gw-help="' + esc(h.id) + '" style="padding:8px"><strong>' + esc(h.title) + '</strong>' +
        '<div class="small" style="margin-top:4px">' + esc(h.desc) + '</div></div>';
    }).join('');
    var skillHelp = (G.help.skillHelp || []).map(function (h) {
      return '<div class="card card--pad" data-gw-help-skill="' + esc(h.id) + '" style="padding:8px"><strong>' + esc(h.title) + '</strong>' +
        '<div class="small" style="margin-top:4px">' + esc(h.desc) + '</div></div>';
    }).join('');
    var helpCard = '<div class="card card--pad" id="gw-help" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">🤝 帮助三选一 + 支援效果</div>' +
      '<div class="card-sub">挑战决赛场/终局时自选：属性达标加成（boss_select_ex_point）+ 技能支援（critical_select_effect），各三选一。</div></div>' +
      '<span class="badge badge--client">客户端配置</span></div>' +
      '<div class="team-sub-label" style="margin-top:10px">属性帮助（三选一）</div>' +
      '<div class="grid grid--3" style="gap:8px;margin-top:6px">' + attrHelp + '</div>' +
      '<div class="team-sub-label" style="margin-top:10px">技能支援（三选一）</div>' +
      '<div class="grid grid--3" style="gap:8px;margin-top:6px">' + skillHelp + '</div>' +
      '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">🔁</span><span class="small">' +
      '支援效果规则：<strong>' + esc(G.help.supportRuleQuote) + '</strong>；' + esc(G.help.note || '') + '</span></div></div>';

    var rewardGroups = (G.rewards.groups || []).map(function (g) {
      var rows = (g.rows || []).map(function (r) {
        return '<tr><td class="small">' + esc(r.text) + '<div class="tiny muted">' + esc(r.showName) + '</div></td>' +
          '<td class="small">' + (r.items.length ? r.items.map(function (it) { return esc(it.name) + '×' + esc(it.num); }).join('、') : '—') + '</td></tr>';
      }).join('');
      return '<details class="fold" data-gw-reward-group="' + esc(g.group) + '" style="margin:4px 0"><summary class="small strong" style="cursor:pointer">' +
        esc(g.label) + '（' + (g.rows || []).length + ' 条）</summary>' +
        '<div class="table-wrap" style="margin-top:6px"><table class="table" style="min-width:520px"><thead><tr><th>条件</th><th>奖励</th></tr></thead><tbody>' + rows + '</tbody></table></div></details>';
    }).join('');
    var tasksHtml = (G.tasks || []).map(function (t) { return '<span class="tag">' + esc(t.title) + '</span>'; }).join(' ');
    var mailsHtml = (G.mails || []).map(function (m) {
      return '<div class="small" style="margin-top:3px"><strong>' + esc(m.title) + '</strong>：' + esc(m.content) + '</div>';
    }).join('');
    var rewardsCard = '<div class="card card--pad" id="gw-rewards" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">🎁 奖励 / 任务 / 邮件 / 红点</div>' +
      '<div class="card-sub">配置 reward 行 ' + esc(G.rewards.total) + ' 条 + 首通/进度/排名；奖励物品名来自 item_drop_conf。</div></div>' +
      '<span class="badge badge--client">客户端配置</span></div>' +
      '<div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap">' + (G.honors || []).map(function (h) { return '<span class="badge badge--warn">' + esc(h) + '</span>'; }).join('') + '</div>' +
      rewardGroups +
      '<div class="team-sub-label" style="margin-top:10px">任务（' + (G.tasks || []).length + ' 条）</div><div class="row" style="gap:6px;margin-top:4px;flex-wrap:wrap">' + (tasksHtml || '—') + '</div>' +
      '<details class="fold" style="margin-top:8px"><summary class="small strong" style="cursor:pointer">奖励补发 / 发放邮件（' + (G.mails || []).length + ' 条）</summary>' + mailsHtml + '</details>' +
      '<div class="team-sub-label" style="margin-top:10px">红点（' + (G.reddots || []).length + ' 个）</div>' +
      '<div class="row" style="gap:6px;margin-top:4px;flex-wrap:wrap">' + (G.reddots || []).map(function (r) { return '<span class="tag">' + esc(r.name) + '</span>'; }).join('') + '</div></div>';

    var metaRows = [
      ['赛制原文出处', G.meta.ruleSource + '（' + G.meta.ruleLength + ' 字全文；另 @5376 分站表演赛章节）'],
      ['赛程时间', '采用配置说明原文 2026 档期；guild_war.schedule 表为 2027 占位，不采用，实际以服务端为准'],
      ['敌人数据', G.meta.enemySource],
      ['敌人属性', G.meta.enemyAttrNote],
      ['六维补全规则', G.meta.enemyFullAttrsNote || '（见「敌人属性生成规则」卡）'],
      ['AI 名称', G.meta.aiNameNote],
      ['环节归属', G.meta.phaseConfidence],
      ['stage.match', G.meta.stageMatchNote],
      ['未解', G.meta.constNote + '；' + G.meta.aiNote]
    ];
    var metaCard = '<div class="card card--pad" id="gw-meta" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">📌 口径与待验证</div>' +
      '<div class="card-sub">原文照录 / 客户端解包 / 推断 三层分开；不虚构规则与数值。</div></div>' +
      '<span class="badge badge--warn">待验证</span></div>' +
      '<div class="table-wrap" style="margin-top:8px"><table class="table" style="min-width:560px"><thead><tr><th>项</th><th>口径</th></tr></thead><tbody>' +
      metaRows.map(function (r) { return '<tr><td><strong>' + esc(r[0]) + '</strong></td><td class="small">' + esc(r[1]) + '</td></tr>'; }).join('') +
      '</tbody></table></div>' +
      '<div class="tiny muted" style="margin-top:6px">来源：' + esc((G.source.files || []).join('、')) + '；报告：' + esc(G.source.report) + '</div></div>';

    return '<div id="lineup-section-guildwar">' +
      '<div class="card card--pad" style="margin-bottom:12px">' +
      '<div class="card-head"><div><div class="card-title">' + esc(sec.icon) + ' ' + esc(sec.name) + '</div>' +
      '<div class="card-sub">' + esc(sec.desc) + '</div></div><span class="badge badge--client">' + esc(sec.status) + '</span></div></div>' +
      head + gwLineupsHtml() + phasesCard + scheduleCard + attrRuleCard + enemyCard + helpCard + rewardsCard + metaCard +
      '<div class="team-sub-label" style="margin-top:12px">实机见闻 / 补充（可写）</div>' +
      '<textarea class="input" id="lineup-note-guildwar" data-lineup-note="guildwar" rows="4" maxlength="4000" placeholder="补充协会赛实机见闻：难度、敌人强度、帮助/支援选择、奖励到账（自动保存到本地）…">' + esc(notes['guildwar'] || '') + '</textarea>' +
      '</div>';
  }

  function endlessSectionHtml(sec) {
    var notes = loadNotes();
    var warn = '<div class="card card--pad" id="lineup-section-endless">' +
      '<div class="card-head"><div><div class="card-title">🛤️ 无尽之路 · 解包结果</div>' +
      '<div class="card-sub">' + esc(sec.desc) + '</div></div>' +
      '<span class="badge badge--warn">暂未实装</span></div>' +
      '<div class="notice notice--warn" style="margin-top:8px"><span class="notice-ico">🤔</span><span class="small">' +
      '<strong>⚠️ 现在不是看这个页签的时候（疑惑口径，先当可疑线索）</strong><br>' +
      '① S1 赛季从<strong>开服日（2026-10-23）</strong>开始 → 说明 S1 内容<strong>可能已在游戏内实装</strong>，最可能对应现有 PVE 玩法「<strong>全国大赛</strong>」；<br>' +
      '② 但解包出的奖励结构（每 100 级一档 + 排名奖励）与全国大赛「<strong>5 关一个大包、每关都有奖励</strong>」的实机记忆不符；<br>' +
      '③ 所以也可能是全新玩法，或全国大赛的改版配置。<br>' +
      '<strong>结论：不要据此行动</strong>，等实机入口/奖励验证后再用；本页只记录解包骨架，规则全部未验证。' +
      '</span></div>' +
      '<div class="small muted" style="margin-top:6px">数据：res20 包 <span class="inline-code">S1.cn.endless_road.sw</span>（9 表 / 1611 条记录）；解包结果，无官方玩法说明。</div></div>';

    var structure = '<div class="card card--pad" id="endless-structure" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">📦 结构（配置层）</div>' +
      '<div class="card-sub">赛季 → 章节 → 关卡；段位名「大赛历战」。</div></div>' +
      '<span class="badge badge--client">客户端解包</span></div>' +
      '<div class="table-wrap" style="margin-top:8px"><table class="table" style="min-width:520px"><thead><tr><th>项</th><th>配置内容</th></tr></thead><tbody>' +
      '<tr><td><strong>赛季</strong></td><td>2 个：S1 = <strong>2026-10-23 21:00</strong>（开服日）→ S2 = <strong>2026-12-24 21:00</strong> 开启</td></tr>' +
      '<tr><td><strong>章节</strong></td><td>2 个：「无尽1」「无尽2」</td></tr>' +
      '<tr><td><strong>关卡</strong></td><td>max_level = <strong>192 级</strong>；match 表 <strong>399 个「单打演练 N」</strong>（1v1），敌人队伍 ID 从 10002 递增</td></tr>' +
      '<tr><td><strong>段位名</strong></td><td>「<strong>大赛历战</strong>」（endless_road.rank_show_name）</td></tr>' +
      '</tbody></table></div></div>';

    var mechanics = '<div class="card card--pad" id="endless-mechanics" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">⚙️ 关卡机制（配置层）</div>' +
      '<div class="card-sub">从 level / match / match_skill 表反推，玩法效果待实装验证。</div></div>' +
      '<span class="badge badge--info">推断</span></div>' +
      '<ul class="small" style="margin:8px 0 0 18px">' +
      '<li><strong>主题效果</strong>：部分关卡带 theme（101~202），即比赛附加/主题效果（与球员页「赛制主题效果」同源）。</li>' +
      '<li><strong>比分干预</strong>：57 个关卡配置了「全国大赛比分干预技能」（技能 7002~7084，共 83 个 id）——用于比分控制/难度调节。</li>' +
      '<li><strong>关卡类型</strong>：match 全部为「单打演练」（match_template_id = 12 = SYSTEM 模板），敌人是预设队伍（10002+）。</li>' +
      '<li><strong>hard / stage / unlock 字段</strong>：level 表另有 hard 标记（16777216 位）与 unlock 解锁字段，具体语义待实装确认。</li>' +
      '</ul></div>';

    var rewards = '<div class="card card--pad" id="endless-rewards" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">🎁 奖励结构（配置层）</div>' +
      '<div class="card-sub">等级奖励 + 排名奖励 + 「速度无尽」系列奖励包。</div></div>' +
      '<span class="badge badge--info">推断</span></div>' +
      '<div class="table-wrap" style="margin-top:8px"><table class="table" style="min-width:520px"><thead><tr><th>奖励类型</th><th>档位</th><th>奖励包</th></tr></thead><tbody>' +
      '<tr><td><strong>等级奖励</strong>（level_reward）</td><td>每 100 级一档：100 / 200 / 300 … 1000 级</td><td>620001（100 级）/ 620002（200 级）/ 620003（300 级及以后）</td></tr>' +
      '<tr><td><strong>排名奖励</strong>（rank_reward）</td><td>rank 100 / 200 / 300</td><td>620001 / 620002 / 620003</td></tr>' +
      '<tr><td><strong>奖励包内容</strong></td><td>item_drop_conf 中「速度无尽3000 / 6000 / 9000 / 12000」系列（id 600501+）</td><td>每包 48 件道具（item id 48）</td></tr>' +
      '</tbody></table></div>' +
      '<div class="small muted" style="margin-top:6px">注：奖励 id 指向 item_drop_conf 的掉落包，具体道具内容未展开（等实装/更多样本再补）。</div></div>';

    var todo = '<div class="card card--pad" id="endless-todo" style="margin-bottom:10px">' +
      '<div class="card-head"><div><div class="card-title">📌 待实装验证</div>' +
      '<div class="card-sub">以下问题只有实机才能回答，页面先占位不虚构。</div></div>' +
      '<span class="badge badge--warn">待补</span></div>' +
      '<ul class="small" style="margin:8px 0 0 18px">' +
      '<li>玩法入口在哪（主界面/活动页）；是否需要门票/次数限制。</li>' +
      '<li>胜负与计分规则（单打演练怎么算赢/输、等级怎么涨）。</li>' +
      '<li>「比分干预技能」在实战中的具体表现（是否动态调整比分/难度）。</li>' +
      '<li>奖励发放方式（等级档自动发？排名结算周期？）。</li>' +
      '<li>与全国大赛/圣山无尽模式的区别（是否共用模板 SYSTEM=12）。</li>' +
      '</ul></div>';

    return warn + structure + mechanics + rewards + todo +
      '<div class="team-sub-label" style="margin-top:12px">实机见闻 / 规则补充（可写）</div>' +
      '<textarea class="input" id="lineup-note-endless" data-lineup-note="endless" rows="4" maxlength="4000" placeholder="补充无尽之路的实机见闻：入口、规则、奖励、自己的打法（自动保存到本地）…">' + esc(notes['endless'] || '') + '</textarea>' +
      '<div class="tiny muted" style="margin-top:6px">数据来源：客户端 res20 包 S1.cn.endless_road.sw（season/chapter/level/match/level_reward/rank_reward 等 9 表）、S1.cn.item_drop_conf、S1.cn.match_skill（7002~7084）；本页为解包结果，暂未实装标注。</div>';
  }

  function sectionHtml(sec) {
    var notes = loadNotes();
    if (sec.id === 'guildwar') return guildwarSectionHtml(sec);
    if (sec.id === 'endless') return endlessSectionHtml(sec);
    if (sec.id === 'cup') return cupSectionHtml(sec);
    if (sec.id === 'pvp') {
      return '<div class="card card--pad" id="lineup-section-pvp" style="margin-bottom:12px">' +
        '<div class="card-head"><div><div class="card-title">⚔️ PVP 三阵配置（自选 + 基线 + 自动参考）</div>' +
        '<div class="card-sub">PVP 无场地加成，唯一硬约束=角色池深度：3 阵×5 人=15 名不同角色（<strong>选一个锁一个</strong>，其他阵/位置自动隐藏）。圣山/杯赛不锁定。</div></div>' +
        '<span class="badge badge--client">规则已录入</span></div>' +
        pvpHtml() +
        '<div class="team-sub-label" style="margin-top:12px">规则 / 限制 / 出场顺序（待补充）</div>' +
        '<textarea class="input" id="lineup-note-pvp" data-lineup-note="pvp" rows="3" maxlength="4000" placeholder="补充 PVP 规则、限制、出场顺序（自动保存到本地）…">' + esc(notes['pvp'] || '') + '</textarea>' +
        '</div>';
    }
    if (sec.id === 'saint') {
      var key = saintView();
      return '<div class="card card--pad" id="lineup-section-saint" style="margin-bottom:12px">' +
        saintScheduleHtml() +
        '<div class="card-head"><div><div class="card-title">⛰️ 圣山队伍配置</div>' +
        '<div class="card-sub">只看当前圣山（按系统时间轮换）；也可手动切换查看其他圣山。</div></div>' +
        '<span class="badge badge--client">当前：' + esc(saintMountainMeta(key).name) + '</span></div>' +
        saintViewTabsHtml() +
        saintRecognitionHtml(key) +
        saintPlanCardHtml(key) +
        saintBuilderHtml(key) +
        saintCandidatesHtml(key) +
        saintCommonRulesHtml() +
        '<div class="team-sub-label" style="margin-top:12px">规则 / 限制（待补充）</div>' +
        '<textarea class="input" id="lineup-note-saint" data-lineup-note="saint" rows="3" maxlength="4000" placeholder="补充圣山规则/限制（自动保存到本地）…">' + esc(notes['saint'] || '') + '</textarea>' +
        '</div>';
    }
    return (
      '<div class="card card--pad" id="lineup-section-' + esc(sec.id) + '" style="margin-bottom:12px">' +
      '<div class="card-head"><div>' +
      '<div class="card-title">' + esc(sec.icon) + ' ' + esc(sec.name) + '</div>' +
      '<div class="card-sub">' + esc(sec.desc) + '</div>' +
      '</div><span class="badge badge--warn">' + esc(sec.status) + '</span></div>' +
      '<div class="grid grid--2" style="gap:12px;margin-top:10px">' +
      sec.groups.map(slotsHtml).join('') +
      '</div>' +
      '<div class="team-sub-label" style="margin-top:12px">规则 / 限制 / 出场顺序（待补充）</div>' +
      '<textarea class="input" id="lineup-note-' + esc(sec.id) + '" data-lineup-note="' + esc(sec.id) + '" rows="4" maxlength="4000" placeholder="补充该赛制的规则、限制、配队思路（自动保存到本地）…">' +
      esc(notes[sec.id] || '') +
      '</textarea>' +
      '<div class="small muted" style="margin-top:6px">说明：当前仅为框架页；具体赛制规则由用户逐块补充后填入，不虚构。</div>' +
      '</div>'
    );
  }

  function tabsHtml() {
    return SECTIONS.map(function (s) {
      return '<button type="button" class="btn btn--sm' + (s.id === activeTab ? ' btn--primary' : ' btn--ghost') +
        '" data-lineup-tab="' + esc(s.id) + '">' + esc(s.icon) + ' ' + esc(s.name) + '</button>';
    }).join('');
  }

  function bodyHtml() {
    var sec = SECTIONS.filter(function (s) { return s.id === activeTab; })[0] || SECTIONS[0];
    return sectionHtml(sec);
  }

  function syncNotes(root) {
    var notes = loadNotes();
    var nodes = root.querySelectorAll('[data-lineup-note]');
    for (var i = 0; i < nodes.length; i++) {
      var id = nodes[i].getAttribute('data-lineup-note');
      if (typeof notes[id] === 'string') nodes[i].value = notes[id];
    }
  }

  function paint(el) {
    var host = el.querySelector('#lineup-body');
    if (host) { host.innerHTML = bodyHtml(); syncNotes(host); }
  }

  function styleBonusHtml() {
    var sd = (typeof window !== 'undefined' && window.BBTStyleData) || null;
    if (!sd || !sd.rules) return '';
    var colorRows = (sd.cardColors || []).map(function (c) {
      var rule = (sd.rules || []).filter(function (r) { return r.style === c.style; })[0] || {};
      var th = (rule.thresholds || []).map(function (t) { return t.count + '人→' + t.percent + '%'; }).join(' / ');
      return '<tr><td><span class="tag" style="border-left:4px solid ' + esc(c.colorHex) + '">' + esc(c.cardColor) + '</span></td>' +
        '<td><strong>' + esc(c.style) + '</strong></td>' +
        '<td class="num">' + esc(th) + '</td>' +
        '<td class="small">' + esc(rule.target || '—') + '</td></tr>';
    }).join('');
    var dist = sd.distribution || {};
    var distChips = (sd.cardColors || []).map(function (c) {
      return '<span class="tag" style="border-left:4px solid ' + esc(c.colorHex) + '">' + esc(c.cardColor) + '·' + esc(c.style) + ' ' + esc(dist[c.style] || 0) + '人</span>';
    }).join('');
    var byStyle = sd.byStyle || {};
    var details = (sd.cardColors || []).map(function (c) {
      var names = byStyle[c.style] || [];
      if (!names.length) return '';
      return '<details class="fold" style="margin:2px 0"><summary class="small" style="cursor:pointer">' + esc(c.cardColor) + ' · ' + esc(c.style) + '（' + names.length + ' 人）</summary>' +
        '<div class="small muted" style="margin:4px 0 0 18px">' + names.map(esc).join('、') + '</div></details>';
    }).join('');
    return '<div class="card card--pad" id="lineup-style-bonus" style="margin-bottom:12px">' +
      '<div class="card-head"><div>' +
      '<div class="card-title"><span class="ico">🎨</span>通用配队加成 · 风格（卡牌颜色）</div>' +
      '<div class="card-sub">' + esc(sd.note || '风格 = 角色卡牌颜色（蓝/红/绿/紫/金），与战场定位标签（得分手/防守者/篮板手/组织者/多面手）不是同一维度。') + '</div>' +
      '</div><span class="badge badge--client">客户端配置 + 用户口径</span></div>' +
      '<div class="table-wrap" style="margin-top:8px"><table class="table" style="min-width:560px"><thead><tr><th>卡色</th><th>风格</th><th class="num">触发人数 → 加成</th><th>效果对象</th></tr></thead><tbody>' + colorRows + '</tbody></table></div>' +
      '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">🧩</span><span><strong>可叠加：</strong>' + esc(sd.stacking || '不同类效果可同时触发；同类取最高档。') + '</span></div>' +
      '<div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap">' + distChips + '</div>' +
      '<div class="small muted" style="margin-top:6px">说明：紫卡（球商）角色的技能可能是力卡/技卡/速卡任意一种，所以它的加成对象是【看破时】打卡；金卡（全能）目前只有 3 名多面手角色（希雅/白神/野上）。</div>' +
      '<div style="margin-top:6px">' + details + '</div>' +
      '<div class="tiny muted" style="margin-top:6px">来源：' + esc(sd.source || '') + '；配置证据：' + esc((sd.configEvidence && sd.configEvidence.file) || '') + '</div>' +
      '</div>';
  }

  views.lineup = {
    id: 'lineup',
    nav: '实战配队',
    icon: '⚔️',
    title: '实战配队',
    subtitle:
      '战斗配队框架：PVP 三阵配置（主/副/奇阵）、圣山队伍配置（蓝/紫/绿/红）、杯赛配置（按当届杯赛维护）、协会赛（1.0.23 圣山投射协会赛：5 环节赛制 + 19 关敌人 + 帮助/奖励）、无尽之路（1.0.21 新增 · 解包结果 · 暂未实装）。PVP 选一个锁一个（15 名不同角色）；圣山/杯赛不锁定，可重复使用。赛制规则逐块补充。',
    dataNote:
      '本页来源：框架页（栏目结构 + 规则占位 + 每阵容 5 位置槽位）+ 协会赛（res21/1.0.23 客户端配置：common_help_rule_conf 规则原文 + guild_war.match/robot_conf 敌人 + 帮助/奖励）+ 无尽之路（res20 解包 S1.cn.endless_road.sw）；赛制规则/限制/克制/出场顺序待用户逐块说明后填充（不虚构规则）。备注自动保存 localStorage（bbt.lineup.v1）。',
    mount: function (el) {
      saintViewKey = null; // 每次进入页面默认看当前圣山
      el.innerHTML =
        styleBonusHtml() +
        '<div class="card card--pad" style="margin-bottom:12px">' +
        '<div class="card-head"><div>' +
        '<div class="card-title"><span class="ico">⚔️</span>实战配队 · 四套战斗配置</div>' +
        '<div class="card-sub">PVP 三阵配置 / 圣山队伍配置 / 杯赛配置 / 无尽之路（暂未实装）—— PVP 选一个锁一个（3 阵×5 人=15 名不同角色，其他阵/位置自动隐藏）；圣山/杯赛不锁定、可重复使用。当前为可扩展框架。</div>' +
        '</div><span class="badge badge--warn">框架待补充规则</span></div>' +
        '<div class="row" style="gap:6px;margin-top:10px;flex-wrap:wrap">' + tabsHtml() + '</div>' +
        '</div>' +
        '<div id="lineup-body">' + bodyHtml() + '</div>';

      syncNotes(el);

      // ===== 圣山时间窗口刷新 =====
      dom.delegate(el, '[data-saint-sched-refresh]', 'click', function () {
        var host = el.querySelector('#saint-schedule');
        if (!host) return;
        var wrap = host.parentNode;
        var tmp = wrap.querySelector('#saint-schedule');
        if (tmp) tmp.outerHTML = saintScheduleHtml();
      });

      // ===== 圣山自选配队交互 =====
      dom.delegate(el, '[data-saint-view]', 'click', function (ev, t) {
        setSaintView(t.getAttribute('data-saint-view')); paint(el);
      });
      dom.delegate(el, '[data-saint-sel]', 'change', function (ev, t) {
        var key = saintView(); var team = saintTeamOf(key);
        team[t.getAttribute('data-saint-sel')] = t.value || ''; setSaintTeam(key, team); renderSaint(el);
      });
      dom.delegate(el, '[data-saint-load]', 'click', function (ev, t) {
        var key = t.getAttribute('data-saint-load');
        var S = saintData(); var plan = S && S.plans && S.plans[key]; if (!plan) return;
        setSaintView(key); var team = {};
        (plan.slots || []).forEach(function (s, i) { var pk = pickOwnedSlot(s); if (SAINT_POS[i] && pk) team[SAINT_POS[i]] = pk.name; });
        setSaintTeam(key, team); renderSaint(el);
      });
      dom.delegate(el, '[data-saint-clear]', 'click', function () {
        setSaintTeam(saintView(), {}); renderSaint(el);
      });

      // ===== PVP 自选配队交互 =====
      dom.delegate(el, '[data-pvp-dir]', 'click', function (ev, t) {
        var d = loadPvpDraft(); d.activeDir = t.getAttribute('data-pvp-dir'); savePvpDraft(); renderPvp(el);
      });
      dom.delegate(el, '[data-pvp-chip]', 'click', function (ev, t) {
        var parts = String(t.getAttribute('data-pvp-chip') || '').split('|');
        if (parts.length !== 2) return;
        var d = loadPvpDraft(); if (!d.teams[d.activeDir]) d.teams[d.activeDir] = {};
        d.teams[d.activeDir][parts[0]] = parts[1]; savePvpDraft(); renderPvp(el);
      });
      dom.delegate(el, '[data-pvp-load]', 'click', function (ev, t) {
        var dir = t.getAttribute('data-pvp-load');
        var P = pvpData(); if (!P || !P.userLineups) return;
        var lab = { paint: '攻框一阵', mid: '中投二阵', three: '三分三阵' }[dir];
        var u = (P.userLineups.teams || []).filter(function (x) { return x.label === lab; })[0];
        if (!u) return;
        var d = loadPvpDraft(); d.activeDir = dir; d.teams[dir] = {};
        PVP_POS.forEach(function (pos) { var c = (u.positions || {})[pos]; if (c) d.teams[dir][pos] = c.name; });
        savePvpDraft(); renderPvp(el);
      });
      dom.delegate(el, '[data-pvp-clear]', 'click', function (ev, t) {
        var dir = t.getAttribute('data-pvp-clear');
        var d = loadPvpDraft(); d.teams[dir] = {}; savePvpDraft(); renderPvp(el);
      });

      // ===== 杯赛自选配队交互（不锁定，localStorage 持久化） =====
      dom.delegate(el, '[data-cup-sel]', 'change', function (ev, t) {
        var parts = String(t.getAttribute('data-cup-sel') || '').split('|');
        if (parts.length !== 2) return;
        var team = cupTeamOf(parts[0]); team[parts[1]] = t.value || ''; setCupTeam(parts[0], team); paint(el);
      });
      dom.delegate(el, '[data-cup-clear]', 'click', function (ev, t) {
        setCupTeam(t.getAttribute('data-cup-clear'), {}); paint(el);
      });
      dom.delegate(el, 'select[data-pvp-sel]', 'change', function (ev, t) {
        var pos = t.getAttribute('data-pvp-sel');
        var d = loadPvpDraft(); if (!d.teams[d.activeDir]) d.teams[d.activeDir] = {};
        d.teams[d.activeDir][pos] = t.value || ''; savePvpDraft(); renderPvp(el);
      });

      dom.delegate(el, '[data-lineup-tab]', 'click', function (ev, t) {
        var id = t.getAttribute('data-lineup-tab');
        if (!id || id === activeTab) return;
        activeTab = id;
        var row = el.querySelector('.row');
        // 重绘 tabs + body
        var tabsHost = el.querySelector('[data-lineup-tab]');
        if (tabsHost && tabsHost.parentNode) tabsHost.parentNode.innerHTML = tabsHtml();
        paint(el);
      });
      dom.delegate(el, '[data-lineup-note]', 'input', function (ev, t) {
        saveNote(t.getAttribute('data-lineup-note'), t.value);
      });
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

/*!
 * views/official-widgets.js —— 官方反推数据卡 + 数值计算器（2026-11-08）
 *
 * 供现有 4 页内嵌，不新增 tab：
 *   - 属性映射 / 比赛机制 / 训练官方数据 / 抽卡预算（角色页、配队页附录）
 *   - 笔记契合度（5 来源）+ 额外学习/词条触发计算器（笔记页）
 *
 * 数据来自 src/data/official.js（build-official.mjs 生成），纯离线。
 */
(function (root) {
  'use strict';
  var BBT = (root.BBT = root.BBT || {});
  var OF = (BBT.OfficialWidgets = BBT.OfficialWidgets || {});

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function official() {
    return BBT.official || null;
  }
  function num(v, d) {
    var n = Number(v);
    return isFinite(n) ? n : (d == null ? 0 : d);
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /* ================= 纯计算函数（可单测） ================= */
  function queryCurve(id, x) {
    var n = official();
    var c = n && n.note.curves[String(id)];
    if (!c) return 0;
    var bounds = c.bounds || [];
    var values = (c.cleaned && c.cleaned.length ? c.cleaned : c.values) || [];
    if (!bounds.length || !values.length) return 0;
    var xx = Math.round(num(x));
    if (xx <= bounds[0]) return values[0];
    if (xx >= bounds[bounds.length - 1]) return values[values.length - 1];
    for (var i = 0; i < bounds.length - 1; i++) {
      if (xx >= bounds[i] && xx <= bounds[i + 1]) {
        var t = (xx - bounds[i]) / (bounds[i + 1] - bounds[i] || 1);
        return values[i] + (values[i + 1] - values[i]) * t;
      }
    }
    return values[values.length - 1];
  }

  function systemScore(count) {
    var map = { 1: 0, 2: 4, 3: 8, 4: 10, 5: 15 };
    return map[clamp(Math.round(num(count)), 1, 5)] != null ? map[clamp(Math.round(num(count)), 1, 5)] : 0;
  }
  var LEVEL_TABLE = [[5, 0], [20, 0], [50, 5], [100, 15], [200, 20], [500, 35], [1000, 35]];
  function levelScore(level) {
    var l = clamp(num(level), 0, 10000);
    if (l <= LEVEL_TABLE[0][0]) return 0;
    for (var i = 1; i < LEVEL_TABLE.length; i++) {
      if (l <= LEVEL_TABLE[i][0]) {
        var x0 = LEVEL_TABLE[i - 1][0], y0 = LEVEL_TABLE[i - 1][1];
        var x1 = LEVEL_TABLE[i][0], y1 = LEVEL_TABLE[i][1];
        return y0 + (y1 - y0) * (l - x0) / ((x1 - x0) || 1);
      }
    }
    return 35;
  }
  function dutyScore(level) {
    var l = Math.round(num(level));
    if (l <= 2) return 0;
    if (l <= 4) return 1;
    if (l <= 6) return 2;
    return 3;
  }
  function expScore(count, avgStar, limit) {
    var c = Math.max(0, num(count));
    var s = Math.max(0, num(avgStar));
    var lim = limit == null ? 23 : limit;
    return Math.min(lim, 1 * s * Math.max(0, c - 2));
  }
  function sourceRank(score, source) {
    var v = num(score);
    var row = source && source.rankScore ? source.rankScore : [];
    var s = source && source.s != null ? source.s : (row[2] != null ? row[2] : 0);
    var a = source && source.a != null ? source.a : (row[1] != null ? row[1] : 0);
    var b = source && source.b != null ? source.b : (row[0] != null ? row[0] : 0);
    if (v >= s) return 4;
    if (v >= a) return 3;
    if (v >= b) return 2;
    if (v > 0) return 1;
    return 0;
  }
  function tierByScore(score) {
    var n = official();
    var ranks = (n && n.note.ranks) || [];
    var v = num(score);
    var found = ranks[0] || { name: '无', require: 0 };
    ranks.forEach(function (r) { if (v >= (r.require || 0)) found = r; });
    return found;
  }
  function calcHarmony(input) {
    var n = official();
    if (!n) return null;
    var src = n.note.sources;
    var scores = [
      clamp(num(input.relation), 0, src[0].s),
      clamp(num(input.system), 0, src[1].s),
      clamp(num(input.level), 0, src[2].s),
      clamp(num(input.duty), 0, src[3].s),
      clamp(num(input.experience), 0, src[4].s)
    ];
    var ranks = scores.map(function (v, i) { return sourceRank(v, src[i]); });
    var total = scores.reduce(function (a, b) { return a + b; }, 0);
    var tier = tierByScore(total);
    return { scores: scores, ranks: ranks, total: total, tier: tier };
  }
  function calcExtra(h) {
    var n = official();
    if (!n) return null;
    var harmony = num(h);
    var prob = queryCurve(1025, harmony);
    return { h: harmony, prob: prob, learnTimes: n.note.learnTimes };
  }
  function calcEntryTrigger(h, totalEntries) {
    var n = official();
    if (!n) return null;
    var x = num(h) * num(totalEntries);
    return {
      x: x,
      min: Math.round(queryCurve(1017, x)),
      std: Math.round(queryCurve(1018, x)),
      max: Math.round(queryCurve(1016, x))
    };
  }
  function calcExtraWeights(h, baseEntries) {
    var x = num(h) * num(baseEntries);
    var out = [];
    for (var i = 1026; i <= 1031; i++) {
      var v = Math.max(0, queryCurve(i, x));
      out.push({ n: i - 1025, weight: Math.round(v) });
    }
    var sum = out.reduce(function (a, b) { return a + b.weight; }, 0);
    out.forEach(function (o) { o.prob = sum ? Math.round(o.weight / sum * 1000) / 10 : 0; });
    return { x: x, entries: out };
  }
  function hitRate(base, ratio) {
    return num(base) * (1 - num(ratio));
  }
  function saintModelInfo(modelKey) {
    var n = official();
    var s = n && n.saintPool;
    if (!s || !s.candidate) return null;
    var useLower = (modelKey === 'saint_lower' || modelKey === 'saint_alt') && s.lower;
    var dm = useLower ? s.lower.display : s.displayModel;
    if (dm && dm.distribution) {
      return {
        comprehensive: dm.comprehensive,
        expectedPulls: dm.expectedPer,
        conditionalMass: dm.conditionalMass || null,
        distribution: dm.distribution.map(function (d) { return { pull: d.pull, pct: d.pct }; }),
        params: useLower ? (s.lower.params || null) : (s.candidate.params || null),
        modelName: dm.name,
        isLower: !!useLower,
        range: s.range || null,
        lowerName: s.lower && s.lower.name ? s.lower.name : null,
        lowerMean: s.lower ? s.lower.meanPulls : null,
        lowerComprehensive: s.lower ? s.lower.comprehensive : null,
        note: dm.note
      };
    }
    return null;
  }

  function gachaBudget(poolId, currentPity, targetSSR, model) {
    var n = official();
    if (!n) return null;
    var pool = n.gacha.pools.filter(function (p) { return String(p.id) === String(poolId); })[0];
    if (!pool) return null;
    var target = Math.max(1, Math.round(num(targetSSR, 1)));
    var pity = Math.max(0, Math.round(num(currentPity)));
    var isSaintPool = n.saintPool && String(n.saintPool.pool.gacha_id) === String(poolId);
    var useSaint = (model === 'saint' || model === 'saint_lower' || model === 'saint_alt') && isSaintPool;
    if (useSaint) {
      var sm = saintModelInfo(model === 'saint_lower' || model === 'saint_alt' ? 'saint_lower' : 'saint');
      if (sm) {
        var hardS = (n.saintPool.pool && n.saintPool.pool.hard_pity) || 50;
        var expectedPullsS = Math.max(0, Math.ceil(target * sm.expectedPulls - pity));
        var worstS = Math.max(0, target * hardS - pity);
        return {
          pool: pool, model: sm.isLower ? 'saint_lower' : 'saint', fallback: false,
          hard: hardS, pity: pity, target: target,
          expectedPulls: expectedPullsS, worstPulls: worstS,
          expectedPer: sm.expectedPulls,
          singles: Math.ceil(expectedPullsS * (pool.singleConsume || 1)),
          tenPulls: Math.ceil(expectedPullsS / 10),
          tenCost: Math.ceil(expectedPullsS / 10) * (pool.tenConsume != null ? pool.tenConsume : 10),
          hardRemain: Math.max(0, hardS - pity),
          comprehensive: sm.comprehensive,
          distribution: sm.distribution,
          conditionalMass: sm.conditionalMass,
          modelName: sm.modelName,
          isLower: sm.isLower,
          range: sm.range,
          lowerName: sm.lowerName,
          lowerMean: sm.lowerMean,
          lowerComprehensive: sm.lowerComprehensive,
          inherit: pool.pityInherit || (pool.insuranceRule || '')
        };
      }
    }
    var hard = pool.hardPityUi || pool.hardPityInternal || 60;
    var rate = (pool.ssr || 2) / 100;
    // flat + 硬保底：E[min(T,hard)] = (1-(1-p)^hard)/p（例：圣山 2.2%/50 → ≈30.5 抽）
    var expectedPer = (1 - Math.pow(1 - rate, hard)) / rate;
    var expectedPulls = Math.max(0, Math.ceil(target * expectedPer - pity));
    var worstPulls = Math.max(0, target * hard - pity);
    return {
      pool: pool, model: 'flat', fallback: !!model && (model === 'saint' || model === 'saint_lower' || model === 'saint_alt') && !useSaint,
      hard: hard, rate: rate, target: target, pity: pity,
      expectedPulls: expectedPulls, worstPulls: worstPulls,
      expectedPer: Math.round(expectedPer * 10) / 10,
      singles: Math.ceil(expectedPulls * (pool.singleConsume || 1)),
      tenPulls: Math.ceil(expectedPulls / 10),
      tenCost: Math.ceil(expectedPulls / 10) * (pool.tenConsume != null ? pool.tenConsume : 10),
      hardRemain: Math.max(0, hard - pity),
      inherit: pool.pityInherit || (pool.insuranceRule || '')
    };
  }

  /* ================= 公共 HTML 片段 ================= */
  function attributesHtml() {
    var n = official();
    if (!n) return '';
    var rows = n.attributes.role.map(function (a) {
      return '<tr><td>' + esc(a.id) + '</td><td><strong>' + esc(a.name) + '</strong></td>' +
        '<td class="small muted">' + esc(a.desc) + '</td></tr>';
    }).join('');
    return '<div class="card card--pad" id="official-attributes">' +
      '<div class="card-head"><div><div class="card-title"><span class="ico">🏷️</span>官方属性映射（enum.角色属性 101~115）</div>' +
      '<div class="card-sub">比赛属性口径来自官方反推；旧「2 级属性（102 攻筐等）」为旧口径，已标注。</div></div>' +
      '<span class="badge badge--ok">官方反推</span></div>' +
      '<div class="table-wrap"><table class="table"><thead><tr><th>ID</th><th>属性</th><th>说明</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="notice notice--warn" style="margin-top:8px"><span class="notice-ico">⚠️</span><span>' +
      esc(n.attributes.correction) + '</span></div></div>';
  }

  function battleHtml() {
    var n = official();
    if (!n) return '';
    var b = n.battle;
    var restrainRows = b.restrain.rows.map(function (r) {
      return '<tr><td>' + esc(r.off) + '</td><td>' + esc(r.def) + '</td><td class="num">' + (r.ratio > 0 ? '+' : '') + esc(r.ratio) + '</td><td class="small muted">' + esc(r.notes || '') + '</td></tr>';
    }).join('');
    var defs = Object.keys(b.defenceOperation || {}).filter(function (k) { return k.indexOf('option') === 0; }).map(function (k) {
      var d = b.defenceOperation[k];
      return '<li>' + esc(d.name) + '：属性 [' + esc((d.option_properties || []).join(',')) + ']，克制 ' + esc((b.roleAttributes || {})[String(d.restrain_type)] || ('类型' + d.restrain_type)) + '，身体修正 ' + esc(d.physical_feature_exp) + '</li>';
    }).join('');
    return '<div class="card card--pad" id="official-battle">' +
      '<div class="card-head"><div><div class="card-title"><span class="ico">⚔️</span>比赛机制（官方反推）</div>' +
      '<div class="card-sub">克制矩阵 9 行、命中率乘法链、身体修正、AI 选卡规则；四档结果 1 大胜/2 险胜/3 小败/4 大败。</div></div>' +
      '<span class="badge badge--ok">配置级确认</span></div>' +
      '<div class="row" style="gap:6px;flex-wrap:wrap"><span class="badge badge--info">' + esc((b.restrain.ring || []).join('；')) + '</span>' +
      '<span class="badge badge--info">克制 ±0.1</span><span class="badge badge--info">hit=base×(1−disturb)</span></div>' +
      '<div class="table-wrap" style="margin-top:8px"><table class="table"><thead><tr><th>攻方</th><th>守方</th><th class="num">克制系数</th><th>说明</th></tr></thead><tbody>' + restrainRows + '</tbody></table></div>' +
      '<div class="small muted" style="margin-top:8px">防守卡：<ul class="note-rules">' + defs + '</ul></div>' +
      '<div class="small muted">命中/干扰：' + esc(JSON.stringify(b.disturbClasses && b.disturbClasses.formula_shape || '')) +
      '；<strong>身体修正</strong>：臂展系数 = 0（不生效，2026-11-08 反编译确认）、体重 ±2%/点、身高 ±3%/点，整体 clamp [0.93, 1.07]；' + esc(b.hitCompression ? ('hit_compression scale=' + b.hitCompression.scale + ' shift=' + b.hitCompression.shift) : '') + '</div>' +
      '<div class="team-sub-label">AI 选卡 / 回合规则</div><ul class="note-rules small">' +
      (b.aiRules || []).map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' +
      '<div class="small muted">选项卡 ' + b.optionCards.length + ' 条（同名/属性/克制类型已抽取）；四档权重与最终判定在服务端，客户端同代码仅预测显示（🟡 算式）/ 待实测。</div></div>';
  }

  function trainingHtml() {
    var n = official();
    if (!n) return '';
    var t = n.training;
    var c = t.constants;
    var poolRows = t.skillPools.map(function (p) {
      return '<tr><td>' + esc(p.label) + '</td><td class="num">' + esc(p.count) + '</td><td class="num">' + esc(p.weight) + '</td></tr>';
    }).join('');
    return '<div class="card card--pad" id="official-training">' +
      '<div class="card-head"><div><div class="card-title"><span class="ico">🏋️</span>训练官方数据参考</div>' +
      '<div class="card-sub">技能池 361 条、官方常量、扭蛋三套机制；训练主数值仍在服务端（标注）。</div></div>' +
      '<span class="badge badge--ok">配置/常量确认</span></div>' +
      '<div class="grid grid--3" style="gap:8px">' +
      '<div class="small">失败率基准：常规 <strong>' + c.failRateNormal + '</strong> / 组织 <strong>' + c.failRatePlaymaking + '</strong> / 告警 <strong>' + c.failRateAlart + '</strong></div>' +
      '<div class="small">心情失败修正：<strong>' + c.pressureFails.join('/') + '</strong>（心情 1~5）<span class="badge badge--warn">实测未出现</span></div>' +
      '<div class="small">精力：PS_MAX <strong>' + c.psMax + '</strong>（显示 ' + c.psMaxDisplay + '）· INIT_PRESSURE ' + c.initPressure + '</div>' +
      '<div class="small">专注等级上限：<strong>' + c.focusLevelMax + '</strong>（夏日特训 ' + c.focusLevelMaxBurn + '）</div>' +
      '<div class="small">大小训练点：<strong>' + c.trainNumberSmall + ' / ' + c.trainNumberBig + '</strong> · 初始技能槽 ' + c.initialSlot + '</div>' +
      '<div class="small">比赛开始回合：<strong>' + c.eduMatchStartRound + '</strong> · 连续失败提示 ' + c.trainFailTipsCnt + ' 次/' + c.trainFailTipsProb + '%</div>' +
      '</div>' +
      '<div class="table-wrap" style="margin-top:8px"><table class="table"><thead><tr><th>技能池</th><th class="num">条数</th><th class="num">权重和</th></tr></thead><tbody>' + poolRows + '</tbody></table></div>' +
      '<div class="small muted">技能库共 ' + t.skills.length + ' 条（pool 77/77/207、权重 4620/4620/7689）；事件 ' + t.eventCount + ' 条、效果类型 ' + t.effectTypeCount + ' 项、type45 触发权重 ' + t.type45Count + ' 条。</div>' +
      '<div class="team-sub-label">扭蛋/事件机制</div><ul class="note-rules small">' +
      t.gachaMechanisms.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' +
      '<div class="small muted">配对训练：' + esc(t.noteBestPairs.join('、')) + '；' + esc(c.note) + '</div></div>';
  }

  function gachaHtml() {
    var n = official();
    if (!n) return '';
    var pools = n.gacha.pools;
    return '<div class="card card--pad" id="official-gacha">' +
      '<div class="card-head"><div><div class="card-title"><span class="ico">🎰</span>抽卡预算计算器（官方公示概率/保底）</div>' +
      '<div class="card-sub">9 池公示概率、硬保底、UP 规则、继承提示；真实概率服务端未闭合（标注）。</div></div>' +
      '<span class="badge badge--ok">公示数据</span></div>' +
      '<div class="row" style="gap:8px;flex-wrap:wrap">' +
      '<label class="small">卡池：<select class="select" id="gacha-pool">' +
      pools.map(function (p) {
        return '<option value="' + esc(p.id) + '">' + esc(p.showName || p.name) + '（SSR ' + esc(p.ssr) + '% / 保底 ' + esc(p.hardPityUi || p.hardPityInternal) + '）</option>';
      }).join('') + '</select></label>' +
      '<label class="small">模型：<select class="select" id="gacha-model">' +
      '<option value="flat">公示概率（flat + 硬保底）</option>' +
      '<option value="saint">圣山 soft pity（v5 主值，默认）</option>' +
      '<option value="saint_lower">圣山下界（v4，base=0）</option>' +
      '</select></label>' +
      '<label class="small">当前垫抽：<input class="input" id="gacha-pity" type="number" min="0" max="500" value="0" style="max-width:110px"></label>' +
      '<label class="small">目标 SSR 数：<input class="input" id="gacha-target" type="number" min="1" max="10" value="1" style="max-width:90px"></label>' +
      '</div>' +
      '<div id="gacha-result" class="note-calc-result" style="margin-top:10px"></div>' +
      '<div class="small muted" style="margin-top:6px">圣山模型仅对圣山传奇卡池生效，其他池自动回退 flat；<strong>圣山模型为统计拟合，客户端无配置证据</strong>（软保底若存在属服务端）。</div>' +
      '<div class="small muted">保底兑换：1 张邀请函把「UP 必得剩余次数」减 60/40/20（不是抽数兑品质）；跨期继承按池规则（' +
      esc((official().gacha.pools.map(function (p) { return p.pityInherit; }).filter(Boolean).join('；') || '见各池说明')) + '）。</div></div>';
  }

  function notesCalcHtml() {
    var n = official();
    if (!n) return '';
    var chars = (BBT.gameData && BBT.gameData.characters && BBT.gameData.characters()) || [];
    var opts = chars.map(function (c) {
      return '<option value="' + esc(c.contentId) + '">' + esc(c.name) + '</option>';
    }).join('');
    var srcRows = n.note.sources.map(function (s) {
      return '<tr><td>' + esc(s.showName) + '</td><td class="num">上限 ' + esc(s.s) + '</td>' +
        '<td class="num">b/a/s ' + esc(s.b) + '/' + esc(s.a) + '/' + esc(s.s) + '</td></tr>';
    }).join('');
    return '<div class="card card--pad" id="official-notes-calc">' +
      '<div class="card-head"><div><div class="card-title"><span class="ico">🧮</span>官方笔记契合度计算器（5 来源 + C/B/A/S）</div>' +
      '<div class="card-sub">h1/h2 = 主力对两本笔记原主人的相性；5 来源分相加 → 总相性档位（0/1/10/20/30/45）。</div></div>' +
      '<span class="badge badge--ok">代码级公式</span></div>' +
      '<div class="row" style="gap:8px;flex-wrap:wrap">' +
      '<label class="small">主力：<select class="select" id="nc-main">' + opts + '</select></label>' +
      '<label class="small">笔记1原主人：<select class="select" id="nc-owner1">' + opts + '</select></label>' +
      '<label class="small">笔记2原主人：<select class="select" id="nc-owner2">' + opts + '</select></label>' +
      '</div>' +
      '<div class="grid grid--3" style="gap:8px;margin-top:8px">' +
      '<label class="small">h1（关系分）：<input class="input" id="nc-h1" type="number" min="0" max="45" value="0"></label>' +
      '<label class="small">h2（关系分）：<input class="input" id="nc-h2" type="number" min="0" max="45" value="0"></label>' +
      '<label class="small">队伍体系同人数：<input class="input" id="nc-system-count" type="number" min="1" max="5" value="2"></label>' +
      '<label class="small">角色等级：<input class="input" id="nc-level" type="number" min="0" max="2000" value="100"></label>' +
      '<label class="small">职责适性（1~8）：<input class="input" id="nc-duty" type="number" min="0" max="8" value="5"></label>' +
      '<label class="small">心得：条数 / 平均星：<span class="row"><input class="input" id="nc-exp-count" type="number" min="0" max="20" value="3" style="max-width:70px"><input class="input" id="nc-exp-star" type="number" min="0" max="5" step="0.1" value="1" style="max-width:70px"></span></label>' +
      '</div>' +
      '<div id="nc-result" class="note-calc-result" style="margin-top:10px"></div>' +
      '<div class="small muted">5 来源：' + esc(n.note.sources.map(function (s) { return s.showName + '(≤' + s.s + ')'; }).join(' + ')) +
      '。运行时 initactor_relation_source 为空：h1/h2 默认用社区矩阵关系分代理，可手动改；官方关系表待补（标注）。</div>' +
      '<div class="table-wrap" style="margin-top:8px"><table class="table"><thead><tr><th>来源</th><th class="num">上限</th><th class="num">档位阈值</th></tr></thead><tbody>' + srcRows + '</tbody></table></div>' +
      '<div class="card-title" style="margin-top:14px"><span class="ico">📚</span>额外学习 / 词条触发计算器</div>' +
      '<div class="grid grid--3" style="gap:8px;margin-top:8px">' +
      '<label class="small">相性和 h（=h1+h2）：<input class="input" id="nc-extra-h" type="number" min="0" max="200" value="0"></label>' +
      '<label class="small">两本总词条数：<input class="input" id="nc-total-entries" type="number" min="1" max="60" value="10"></label>' +
      '<label class="small">单本基础词条数：<input class="input" id="nc-base-entries" type="number" min="1" max="30" value="5"></label>' +
      '</div>' +
      '<div id="nc-extra-result" class="note-calc-result" style="margin-top:10px"></div>' +
      '<div class="small muted">学习次数固定 2 次（配置 learnTimes=2）＋ 扭蛋「笔记继承」可得第 3 次（2026-11-08 实测，局内唯一）；额外学习概率 = query(1025,h)；词条触发 x=(h1+h2)×总词条数 → query(1016/1017/1018)；额外条数 x=h×基础词条数 → query(1026~1031)。</div>' +
      '<div class="small muted">缺口：weight_inquire 部分曲线（1027~1030）解析含异常值，已做单调清洗并标注；真实触发由服务端 roll。</div></div>';
  }

  /* ================= 绑定/更新 ================= */
  function renderNotesCalc(host) {
    var n = official();
    if (!n || !host) return;
    var mainSel = host.querySelector('#nc-main');
    var owner1 = host.querySelector('#nc-owner1');
    var owner2 = host.querySelector('#nc-owner2');
    var h1Input = host.querySelector('#nc-h1');
    var h2Input = host.querySelector('#nc-h2');
    var matrix = (BBT.notesNewData && BBT.notesNewData.matrix) || null;
    var chars = (BBT.notesNewData && BBT.notesNewData.characters) || [];
    function relation(a, b) {
      if (!matrix || !a || !b) return 0;
      var ca = chars.filter(function (c) { return String(c.contentId) === String(a); })[0];
      var cb = chars.filter(function (c) { return String(c.contentId) === String(b); })[0];
      if (!ca || !cb || !matrix[ca.id]) return 0;
      return Number(matrix[ca.id][cb.id]) || 0;
    }
    function refresh(updateRelation) {
      if (!mainSel || !owner1 || !owner2) return;
      if (updateRelation) {
        if (h1Input) h1Input.value = relation(mainSel.value, owner1.value);
        if (h2Input) h2Input.value = relation(mainSel.value, owner2.value);
      }
      var h1 = num(h1Input && h1Input.value), h2 = num(h2Input && h2Input.value);
      var r = calcHarmony({
        relation: h1 + h2,
        system: systemScore(num(host.querySelector('#nc-system-count').value)),
        level: levelScore(num(host.querySelector('#nc-level').value)),
        duty: dutyScore(num(host.querySelector('#nc-duty').value)),
        experience: expScore(num(host.querySelector('#nc-exp-count').value), num(host.querySelector('#nc-exp-star').value), 23)
      });
      var rankNames = ['无', 'C', 'B', 'A', 'S'];
      var labels = ['角色关系', '队伍体系', '角色等级', '职责适性', '心得'];
      var html = '<div class="row" style="gap:8px;flex-wrap:wrap">' +
        r.scores.map(function (v, i) {
          return '<span class="badge badge--info">' + labels[i] + ' ' + Math.round(v * 10) / 10 + ' → ' + rankNames[r.ranks[i]] + '</span>';
        }).join('') + '</div>' +
        '<div class="small" style="margin-top:6px">5 来源合计 <strong>' + Math.round(r.total * 10) / 10 + '</strong> → 总相性 <strong>' + esc(r.tier.name) + '</strong>（阈值 ' + esc(r.tier.require) + '；' + (r.tier.require >= 45 ? '极' : r.tier.require >= 30 ? '优' : r.tier.require >= 20 ? '良' : r.tier.require >= 10 ? '一般' : r.tier.require >= 1 ? '差' : '无') + '）</div>' +
        '<div class="small">h1=' + h1 + ' · h2=' + h2 + ' · 相性和 h=' + (h1 + h2) + ' → 额外学习概率 ' + calcExtra(h1 + h2).prob + '%（学习次数固定 ' + n.note.learnTimes + '）</div>';
      var out = host.querySelector('#nc-result');
      if (out) out.innerHTML = html;
      var extraH = host.querySelector('#nc-extra-h');
      if (extraH) extraH.value = h1 + h2;
      refreshExtra(host);
    }
    function refreshExtra(host2) {
      var h = num(host2.querySelector('#nc-extra-h') && host2.querySelector('#nc-extra-h').value);
      var total = num(host2.querySelector('#nc-total-entries') && host2.querySelector('#nc-total-entries').value, 10);
      var base = num(host2.querySelector('#nc-base-entries') && host2.querySelector('#nc-base-entries').value, 5);
      var range = calcEntryTrigger(h, total);
      var extra = calcExtra(h);
      var weights = calcExtraWeights(h, base);
      var out = host2.querySelector('#nc-extra-result');
      if (out) {
        out.innerHTML = '<div class="small">额外学习概率 <strong>' + extra.prob + '%</strong>（h=' + h + '，query 1025；≤60 为 0） · 学习次数固定 ' + extra.learnTimes + '</div>' +
          '<div class="small">词条触发：x = ' + Math.round(range.x) + ' → 下限 <strong>' + range.min + '</strong> / 标准 <strong>' + range.std + '</strong> / 上限 <strong>' + range.max + '</strong> 条</div>' +
          '<div class="small">额外学习条数权重（x=h×基础词条数=' + Math.round(weights.x) + '）：' +
          weights.entries.map(function (e) { return e.n + '条 ' + e.prob + '%'; }).join(' · ') + '</div>';
      }
    }
    ['#nc-main', '#nc-owner1', '#nc-owner2'].forEach(function (sel) {
      var el = host.querySelector(sel);
      if (el) el.addEventListener('change', function () { refresh(true); });
    });
    ['#nc-h1', '#nc-h2', '#nc-system-count', '#nc-level', '#nc-duty', '#nc-exp-count', '#nc-exp-star'].forEach(function (sel) {
      var el = host.querySelector(sel);
      if (el) el.addEventListener('input', function () { refresh(false); });
    });
    ['#nc-extra-h', '#nc-total-entries', '#nc-base-entries'].forEach(function (sel) {
      var el = host.querySelector(sel);
      if (el) el.addEventListener('input', function () { refreshExtra(host); });
    });
    // 默认选择：主力=当前目标角色（若 notes 状态有），否则第一个
    var defId = null;
    try {
      var st = arguments[1] || {};
      defId = st.mainId || null;
    } catch (e) {}
    if (mainSel && defId && mainSel.options) {
      var optionValues = [];
      for (var oi = 0; oi < mainSel.options.length; oi++) optionValues.push(mainSel.options[oi].value);
      if (optionValues.indexOf(String(defId)) >= 0) mainSel.value = String(defId);
    }
    if (owner1 && owner1.options && owner1.options.length) owner1.value = owner1.options[0].value;
    if (owner2 && owner2.options && owner2.options.length > 1) owner2.value = owner2.options[1].value;
    refresh(true);
  }

  function renderGacha(host) {
    var poolSel = host.querySelector('#gacha-pool');
    var modelSel = host.querySelector('#gacha-model');
    var pity = host.querySelector('#gacha-pity');
    var target = host.querySelector('#gacha-target');
    function refresh() {
      if (!poolSel) return;
      var r = gachaBudget(poolSel.value, pity && pity.value, target && target.value, modelSel && modelSel.value);
      var out = host.querySelector('#gacha-result');
      if (!out || !r) return;
      if (r.model === 'saint' || r.model === 'saint_lower') {
        var dist = (r.distribution || []).map(function (d) {
          return d.pull + '抽 ' + d.pct + '%';
        }).join(' · ');
        var range = r.range || {};
        var rangeLine = '';
        if (!r.isLower && range.expectedPullsRange) {
          rangeLine = '区间：保守 <strong>' + range.expectedPullsRange[1] + '</strong> ~ 主值 <strong>' + range.expectedPullsRange[0] +
            '</strong> 抽；基础概率 <strong>' + (range.baseRange ? (range.baseRange[0] * 100) + '~' + (range.baseRange[1] * 100) + '%' : '0.6~2.2%') +
            '</strong>（48/49 跳变软保底为强证据，base 具体值为弱证据）。';
        }
        out.innerHTML = '<div class="small">卡池：<strong>' + esc(r.pool.showName || r.pool.name) + '</strong> · ' +
          esc(r.modelName || (r.isLower ? '圣山下界 v4' : '圣山 v5 主值')) + '</div>' +
          '<div class="small">【整体】期望 <strong>' + r.expectedPer + '</strong> 抽/SSR（综合 <strong>' +
          (Math.round(r.comprehensive * 10000) / 100) + '%</strong>）；目标 ' + r.target + ' 个 → 期望 <strong>' + r.expectedPulls +
          '</strong> 抽（' + r.tenPulls + ' 十连/' + r.tenCost + ' 券）。</div>' +
          '<div class="small">【条件】若已垫到 48 抽仍未出：' + esc(dist) + '（48 最多、49 次之；50 仅理论兜底；47 及之前按 base 分布）。</div>' +
          '<div class="small">' + rangeLine + '</div>' +
          '<div class="small">保守上限 ' + r.worstPulls + ' 抽（50 硬保底剩余 ' + r.hardRemain + '）。</div>' +
          '<div class="small muted">圣山模型为统计拟合，<strong>客户端无配置证据</strong>；48/49 跳变软保底为强约束、base 值为弱证据，真实概率待实测。</div>';
        return;
      }
      out.innerHTML = '<div class="small">卡池：<strong>' + esc(r.pool.showName || r.pool.name) + '</strong> · 公示 SSR ' + esc(r.pool.ssr) + '% · 硬保底 ' + r.hard + ' 抽 · 消耗：' + esc(r.pool.consumeItem || '券') + '</div>' +
        '<div class="small">当前垫抽 ' + r.pity + ' → 保底剩余 <strong>' + r.hardRemain + '</strong> 抽；目标 ' + r.target + ' 个 SSR。</div>' +
        '<div class="small">期望 <strong>' + r.expectedPulls + '</strong> 抽（约 ' + r.tenPulls + ' 个十连，' + r.tenCost + ' 券）· 保守上限 <strong>' + r.worstPulls + '</strong> 抽（' + r.singles + ' 单抽券）。</div>' +
        (r.fallback ? '<div class="small muted">所选模型仅适配圣山传奇卡池，本池已回退 flat + 硬保底。</div>' : '') +
        '<div class="small muted">继承：' + esc(r.inherit || '按池规则') + '；真实概率由服务端决定（🟡 公示值与服务端字段未闭合，待实测）。</div>';
    }
    if (poolSel) poolSel.addEventListener('change', refresh);
    if (modelSel) modelSel.addEventListener('change', refresh);
    if (pity) pity.addEventListener('input', refresh);
    if (target) target.addEventListener('input', refresh);
    refresh();
  }

  /* ================= 挂载接口 ================= */
  OF.attributesHtml = attributesHtml;
  OF.battleHtml = battleHtml;
  OF.trainingHtml = trainingHtml;
  OF.gachaHtml = gachaHtml;
  OF.notesCalcHtml = notesCalcHtml;
  OF.mountNotes = function (el, ctx, opts) {
    var host = el.querySelector('#official-notes-widgets') || el;
    renderNotesCalc(host, opts || {});
  };
  OF.mountGacha = function (el) {
    var host = el.querySelector('#official-gacha');
    if (host) renderGacha(host);
  };
  OF.test = {
    queryCurve: queryCurve,
    systemScore: systemScore,
    levelScore: levelScore,
    dutyScore: dutyScore,
    expScore: expScore,
    sourceRank: sourceRank,
    tierByScore: tierByScore,
    calcHarmony: calcHarmony,
    calcExtra: calcExtra,
    calcEntryTrigger: calcEntryTrigger,
    calcExtraWeights: calcExtraWeights,
    hitRate: hitRate,
    gachaBudget: gachaBudget,
    saintModelInfo: saintModelInfo
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

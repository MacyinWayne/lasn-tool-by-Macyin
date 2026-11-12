/*!
 * views/notes.js —— 笔记养成（tab id: notes，最终 4 页之一，需求 #4）
 *
 * 不做库存管理，做「通用养成链路」：
 *   选目标角色 + 目标方向 → 适合词条清单（启发式，可手动增删）
 *   → 两本笔记载体推荐（契合度最高两个角色；矩阵未数字化时手动指定）
 *   → 契合度计算器（关系分相加 + 契合词条加分 → 档位）
 *   → 养成链树/图（直接路径 + 逐层展开的间接路径 + 每层消耗估算）
 *   → 起点续推（已有某角色笔记带某词条 → 高亮可用位置 + 下一步）
 *   → 我的笔记 / 链路备注（持久化）
 *
 * 规则来源：knowledge/笔记系统_规则与养成链.md（官方/社区截图 OCR + 用户口述 2026-11-05）。
 * 数据缺口（矩阵未数字化 / entry_id↔名称映射 / 适性概率）均显式标注，不虚构。
 */
(function (root) {
  'use strict';
  var BBT = (root.BBT = root.BBT || {});
  var views = (BBT.views = BBT.views || {});
  var dom = BBT.dom;

  var TIER_RULE = [
    { id: '无', min: 0, max: 0 },
    { id: '差', min: 1, max: 9 },
    { id: '一般', min: 10, max: 19 },
    { id: '良', min: 20, max: 29 },
    { id: '优', min: 30, max: 44 },
    { id: '极', min: 45, max: 999 }
  ];
  var QUALITIES = ['绿色', '蓝色', '紫色', '红色'];
  var FIT_BONUS = { '': 0, '*': 2, '**': 5, '***': 10 };
  var DIR_ATTR = { three: '投射', drive: '弹跳', defense: '防守', playmaking: '运控', rebound: '体能' };
  var DIR_SKILLS = {
    three: ['三分', '中投', '后撤', '横撤'],
    drive: ['上篮', '扣篮', '强突', '突破'],
    defense: ['抢断', '盖帽', '看破', '横撤'],
    playmaking: ['传球', '挡拆', '战术', '回复'],
    rebound: ['篮板', '卡位', '补篮', '扣篮']
  };
  var DIR_LABELS = {
    three: '三分（含中投）',
    drive: '攻框（含突破）',
    defense: '防守（抢断/盖帽）',
    playmaking: '组织（战术/续航）',
    rebound: '篮板（特化）'
  };

  function esc(v) {
    return dom.esc(v == null ? '' : String(v));
  }

  function normName(name) {
    return String(name == null ? '' : name).replace(/[\s·]/g, '');
  }

  function tierOf(score) {
    for (var i = 0; i < TIER_RULE.length; i++) {
      if (score >= TIER_RULE[i].min && score <= TIER_RULE[i].max) return TIER_RULE[i].id;
    }
    return '极';
  }

  function tierBadge(score) {
    var tier = tierOf(score);
    var cls = tier === '优' || tier === '极' ? 'badge--ok' : tier === '良' ? 'badge--info' : tier === '无' ? 'badge--neutral' : 'badge--warn';
    return '<span class="badge ' + cls + '">' + esc(tier) + '</span>';
  }

  views.notes = {
    id: 'notes',
    nav: '笔记养成',
    icon: '📔',
    title: '笔记养成',
    subtitle:
      '①主养角色搭配：选角色 → 契合度方案（H/1280 触发档位）+ 适性词条方案（适性刷彩）；②配套笔记角色；③合成/修订规则+模拟。',
    dataNote:
      '本页来源：hoopgirls.live v8 社区数据（48×48 关系分/档位/词条库 141 条，社区图 37 名双源校验）+ knowledge/笔记系统_规则与养成链.md §5 + claims（契合词条 2 层链/适性=基础适性修正，用户口述 2026-11-05）· 未实装角色已过滤 · 缺口：触发加成两种口径待客户端核验、契合分→触发词条数为社区数据、适性概率待验证、手动契合分仅个人补录',
    mount: function (el, ctx) {
      var store = ctx.store;
      var chars = (ctx.data && ctx.data.characters) || (BBT.gameData ? BBT.gameData.characters() : []);
      if (!chars.length) {
        el.innerHTML = '<div class="notice notice--warn"><span class="notice-ico">📦</span><span>缺少角色数据，请先运行 build-data。</span></div>';
        return;
      }
      var byId = Object.create(null);
      chars.forEach(function (c) { byId[String(c.contentId)] = c; });
      var entriesData = BBT.noteEntriesData || (ctx.gameData && ctx.gameData.noteEntries && ctx.gameData.noteEntries()) || null;
      var newData = BBT.notesNewData || (ctx.gameData && ctx.gameData.notesNew && ctx.gameData.notesNew()) || null;
      var harmony = newData || (ctx.gameData && ctx.gameData.notes && ctx.gameData.notes()) || BBT.notesData || null;
      var directions = (BBT.scenarios && BBT.scenarios.directions) || [];
      var dirOrder = ['three', 'drive', 'defense', 'playmaking', 'rebound'];
      var bonusCatalog = newData && newData.entryBonus
        ? newData.entryBonus
        : { byStar: [2, 5, 10], triggerByStar: [3, 6, 10], note: '' };
      var thresholdsList = newData && newData.thresholds ? newData.thresholds : null;

      var ui = ctx.state.ui || (ctx.state.ui = {});
      var stateId = ui.selectedNoteTarget && byId[ui.selectedNoteTarget] ? String(ui.selectedNoteTarget) : String(chars[0].contentId);
      var stateDir = ui.selectedNoteDirection || 'three';
      var entryDraft = [];
      var carrierDraft = [null, null];
      var noteText = '';
      var chainEntry = '';
      var chainDepth = 3;
      var startDraft = { ownerId: '', entry: '', quality: '红色' };
      var manualDraft = { carrierId: '', score: '' };
      var entrySearch = '';
      var bonusMode = ui.noteBonusMode || 'static'; // static=静态+2/5/10；trigger=触发时+3/6/10
      var notesTab = ['pair', 'support', 'craft'].indexOf(ui.notesTab) >= 0 ? ui.notesTab : 'pair';
      var fitFilter = ui.noteFitFilter || 'all';
      var dirFilter = ui.noteDirFilter || 'all';
      var calcEntries = Array.isArray(ui.noteCalcEntries)
        ? ui.noteCalcEntries
            .filter(function (e) { return e && byId[String(e.targetId)] && ['', '*', '**', '***'].indexOf(e.star || '') >= 0; })
            .map(function (e) { return { targetId: String(e.targetId), star: e.star || '' }; })
        : [];
      var chainCarrierId = null;
      var targetPosition = ui.noteTargetPosition || null;
      var dogfoodCarrierId = ui.noteDogfoodCarrier || null;
      var dogfoodOtherId = ui.noteDogfoodOther || null;
      var dogfoodFitStar = ui.noteDogfoodFitStar || '';
      var consistency = ui.noteConsistency && typeof ui.noteConsistency === 'object'
        ? {
            target: typeof ui.noteConsistency.target === 'string' ? ui.noteConsistency.target : '',
            mats: Array.isArray(ui.noteConsistency.mats)
              ? [0, 1, 2].map(function (i) { return typeof ui.noteConsistency.mats[i] === 'string' ? ui.noteConsistency.mats[i] : ''; })
              : ['', '', '']
          }
        : { target: '', mats: ['', '', ''] };
      var loopIndex = Number.isFinite(Number(ui.noteLoopIndex)) ? Math.max(0, Number(ui.noteLoopIndex)) : 0;
      var tripleCache = null;
      var cycleRoleId = ui.noteCycleRole || null;
      var cycleSize = [3, 4, 5].indexOf(Number(ui.noteCycleSize)) >= 0 ? Number(ui.noteCycleSize) : null;

      var POSITIONS = ['控卫', '分卫', '小前', '大前', '中锋'];
      function posBase(role) {
        var t = String(role || '');
        if (/控卫|控球/.test(t)) return '控卫';
        if (/分卫|得分/.test(t)) return '分卫';
        if (/小前/.test(t)) return '小前';
        if (/大前/.test(t)) return '大前';
        if (/中锋/.test(t)) return '中锋';
        return '';
      }

      function basePosition() {
        return posBase(targetCharacter().role) || '';
      }

      function isFitEntry(name) {
        return /契合/.test(String(name || ''));
      }

      function isSuitEntry(name) {
        return /适性/.test(String(name || ''));
      }

      function bonusForStar(star) {
        var arr = bonusMode === 'trigger' ? bonusCatalog.triggerByStar : bonusCatalog.byStar;
        return (arr && arr[star - 1]) || 0;
      }

      function fitBonusOf(starKey) {
        var n = starKey === '*' ? 1 : starKey === '**' ? 2 : starKey === '***' ? 3 : 0;
        return n ? bonusForStar(n) : 0;
      }

      /** 极档（45+）可达性：base=两本关系分之和；双 2★ +10，3★+2★ +15，多 2★ 每条 +5。 */
      function jiReach(base) {
        var b = Math.max(0, Number(base) || 0);
        var gap = Math.max(0, 45 - b);
        var combo;
        var needCount;
        if (b >= 35) {
          combo = '双 2★（+10）';
          needCount = 2;
        } else if (b >= 30) {
          combo = '3★+2★（+15）';
          needCount = 2;
        } else {
          needCount = Math.ceil(gap / 5);
          combo = '需 ' + needCount + ' 条 2★（+' + needCount * 5 + '）';
        }
        return {
          base: b,
          gap: gap,
          combo: combo,
          needCount: needCount,
          canJi: b >= 35,
          canJiWithTwoStar: b + 10 >= 45
        };
      }

      function jiBadge(ji) {
        return ji.canJi
          ? '<span class="badge badge--ok">双 2★ 可极</span>'
          : ji.base >= 30
            ? '<span class="badge badge--warn">需 3★+2★</span>'
            : '<span class="badge badge--warn">需更多词条</span>';
      }


      function tickTier(score) {
        if (thresholdsList && thresholdsList.length) {
          var found = thresholdsList[0];
          thresholdsList.forEach(function (t) {
            if (score >= (t.minScore || 0)) found = t;
          });
          return found.rankName || found.rank_name || '—';
        }
        return tierOf(score);
      }

      function targetCharacter() {
        return byId[stateId] || chars[0];
      }

      function dirLabel(id) {
        for (var i = 0; i < directions.length; i++) if (directions[i].id === id) return directions[i].name;
        return DIR_LABELS[id] || id;
      }

      /* ---------------- 契合度矩阵（新数据优先） ---------------- */
      function matrixInfo() {
        if (newData && Array.isArray(newData.characters) && newData.matrix) {
          var byContent = Object.create(null);
          var byName = Object.create(null);
          newData.characters.forEach(function (c) {
            if (c.contentId != null) byContent[String(c.contentId)] = c;
            byName[normName(c.name)] = c;
            if (c.shortName) byName[normName(c.shortName)] = c;
          });
          return { newMode: true, byContent: byContent, byName: byName, matrix: newData.matrix };
        }
        if (!harmony || !harmony.matrix || !Array.isArray(harmony.matrix.players)) return null;
        var players = harmony.matrix.players;
        var index = Object.create(null);
        players.forEach(function (name, i) { index[normName(name)] = i; });
        return { newMode: false, players: players, rows: harmony.matrix.rows || [], index: index };
      }

      function matrixRelation(carrierId) {
        var info = matrixInfo();
        var main = targetCharacter();
        var carrier = byId[String(carrierId)];
        if (!info || !main || !carrier) return null;
        if (info.newMode) {
          var m = info.byContent[String(main.contentId)];
          var c = info.byContent[String(carrier.contentId)];
          if (!m || !c) return null;
          var row = info.matrix[m.id];
          return row && row[c.id] != null ? Number(row[c.id]) : null;
        }
        var mi = info.index[normName(main.name)];
        var ci = info.index[normName(carrier.name)];
        if (mi == null || ci == null || !info.rows[mi]) return null;
        return Number(info.rows[mi][ci]) || 0;
      }

      function relationScore(carrierId) {
        var manual = store ? store.getHarmonyScore(stateId, carrierId) : null;
        if (manual != null) return { score: manual, manual: true };
        var rel = matrixRelation(carrierId);
        if (rel != null) return { score: rel, manual: false };
        return null;
      }

      /** 任意两角色关系分（优先手动补录，否则真矩阵）；用于狗粮 O↔另一人。 */
      function relationBetween(idA, idB) {
        var manual = store ? store.getHarmonyScore(idA, idB) : null;
        if (manual != null) return { score: manual, manual: true };
        var info = matrixInfo();
        var a = byId[String(idA)];
        var b = byId[String(idB)];
        if (!info || !a || !b) return null;
        if (info.newMode) {
          var ma = info.byContent[String(a.contentId)];
          var mb = info.byContent[String(b.contentId)];
          if (!ma || !mb) return null;
          var row = info.matrix[ma.id];
          return row && row[mb.id] != null ? { score: Number(row[mb.id]) || 0, manual: false } : null;
        }
        var ai = info.index[normName(a.name)];
        var bi = info.index[normName(b.name)];
        if (ai == null || bi == null || !info.rows[ai]) return null;
        return { score: Number(info.rows[ai][bi]) || 0, manual: false };
      }

      function recommendCarriers() {
        var main = targetCharacter();
        var list = [];
        var info = matrixInfo();
        var matrixAvailable = false;
        if (info && info.newMode) {
          matrixAvailable = !!info.byContent[String(main.contentId)];
          newData.characters.forEach(function (mc) {
            if (!mc.released || mc.contentId == null) return;
            if (String(mc.contentId) === String(stateId)) return;
            var rel = relationScore(mc.contentId);
            if (rel != null) list.push({ character: byId[String(mc.contentId)] || { name: mc.name, contentId: mc.contentId }, score: rel.score, manual: rel.manual });
          });
        } else {
          var mi = info ? info.index[normName(main.name)] : null;
          matrixAvailable = !!info && mi != null;
          chars.forEach(function (c) {
            if (String(c.contentId) === String(stateId)) return;
            var rel = relationScore(c.contentId);
            if (rel != null) list.push({ character: c, score: rel.score, manual: rel.manual });
          });
        }
        list.sort(function (a, b) { return b.score - a.score; });
        return { list: list, matrixAvailable: matrixAvailable };
      }

      /* ---------------- 笔记配对推荐 ---------------- */
      function positionOf(contentId) {
        var info = matrixInfo();
        if (info && info.newMode) {
          var mc = info.byContent[String(contentId)];
          if (mc && mc.position) return mc.position;
        }
        var c = byId[String(contentId)];
        return c ? posBase(c.role) : '';
      }

      function pairFitBonus() {
        return fitBonusOf(ui.noteFitStar1 || '') + fitBonusOf(ui.noteFitStar2 || '');
      }

      function planScore(plan) {
        var total = (plan.c1 ? plan.c1.score : 0) + (plan.c2 ? plan.c2.score : 0) + pairFitBonus();
        var tier = tickTier(total);
        var learn = '';
        if (thresholdsList) {
          var found = thresholdsList[0];
          thresholdsList.forEach(function (t) { if (total >= (t.minScore || 0)) found = t; });
          learn = found.learnTimes;
        }
        return { total: total, tier: tier, learn: learn };
      }

      function purePairPlan() {
        var rec = recommendCarriers();
        var top = rec.list.slice(0, 2);
        if (!top.length) return null;
        var plan = { id: 'pure', title: '纯契合方案', c1: top[0] || null, c2: top[1] || null, matrixAvailable: rec.matrixAvailable };
        plan.base = (plan.c1 ? plan.c1.score : 0) + (plan.c2 ? plan.c2.score : 0);
        plan.ji = jiReach(plan.base);
        plan.meta = planScore(plan);
        plan.reason = plan.c1 && plan.c2
          ? '纯契合：笔记1=' + plan.c1.character.name + '（关系分 ' + plan.c1.score + '）；笔记2=' +
            plan.c2.character.name + '（关系分 ' + plan.c2.score + '）→ 总分 ' + plan.meta.total +
            '（' + plan.meta.tier + '，传承学习 ' + plan.meta.learn + ' 次）。两支均为已实装角色中契合度最高。'
          : '';
        return plan;
      }

      function positionPairPlan() {
        if (!targetPosition) return null;
        var rec = recommendCarriers();
        var candidates = rec.list.filter(function (item) {
          return positionOf(item.character.contentId) === targetPosition;
        });
        if (!candidates.length) {
          return {
            id: 'position',
            title: '指定位置方案（' + targetPosition + '）',
            empty: true,
            reason: '目标位置「' + targetPosition + '」暂无已实装且位置已知的角色；未实装/位置未知角色已排除。'
          };
        }
        var c1 = candidates[0];
        var c2 = rec.list.filter(function (item) { return String(item.character.contentId) !== String(c1.character.contentId); })[0] || null;
        var plan = { id: 'position', title: '指定位置方案（' + targetPosition + '）', c1: c1, c2: c2 };
        plan.base = (c1 ? c1.score : 0) + (c2 ? c2.score : 0);
        plan.ji = jiReach(plan.base);
        plan.meta = planScore(plan);
        plan.reason = '指定位置=' + targetPosition + '：笔记1=' + c1.character.name +
          '（基础位置=' + targetPosition + '，关系分 ' + c1.score + '，提供目标适性词条；注意适性词条从拥有适性随机抽，非必出该位置）；笔记2=' +
          (c2 ? c2.character.name + '（关系分 ' + c2.score + '，拉高总分）' : '（无可选第二本）') +
          ' → 总分 ' + plan.meta.total + '（' + plan.meta.tier + '，传承学习 ' + plan.meta.learn + ' 次）。';
        return plan;
      }

      function pairCompare(pure, position) {
        if (!pure || !position || position.empty) return null;
        var diff = (position.meta ? position.meta.total : 0) - pure.meta.total;
        var tierIndex = function (tier) {
          if (!thresholdsList) return 0;
          for (var i = 0; i < thresholdsList.length; i++) if (thresholdsList[i].rankName === tier) return i;
          return 0;
        };
        var tierDiff = tierIndex(position.meta.tier) - tierIndex(pure.meta.tier);
        return {
          diff: diff,
          tierDiff: tierDiff,
          text: '与纯契合方案相比：总分 ' + (diff >= 0 ? '+' : '') + diff + '；档位 ' +
            (tierDiff === 0 ? '相同' : (tierDiff > 0 ? '高 ' + tierDiff + ' 档' : '低 ' + (-tierDiff) + ' 档'))
        };
      }

      function dogfoodList() {
        return (newData && Array.isArray(newData.avgCompatibility)) ? newData.avgCompatibility : [];
      }

      function releasedCharList() {
        if (newData && Array.isArray(newData.characters)) {
          return newData.characters
            .filter(function (mc) { return mc.released && mc.contentId != null && byId[String(mc.contentId)]; })
            .map(function (mc) { return byId[String(mc.contentId)]; });
        }
        return chars.slice();
      }

      function dogfoodPlan() {
        var list = dogfoodList();
        if (!list.length) return null;
        var main = targetCharacter();
        var rec = recommendCarriers();
        var picked = null;
        var pickedCharacter = null;
        if (dogfoodCarrierId && String(dogfoodCarrierId) !== String(stateId) && byId[String(dogfoodCarrierId)]) {
          for (var i = 0; i < list.length; i++) if (String(list[i].contentId) === String(dogfoodCarrierId)) picked = list[i];
          if (picked) pickedCharacter = byId[String(picked.contentId)];
        }
        if (!picked && rec.list[0]) {
          pickedCharacter = rec.list[0].character;
          for (var j = 0; j < list.length; j++) {
            if (String(list[j].contentId) === String(pickedCharacter.contentId)) picked = list[j];
          }
          if (!picked) picked = { name: pickedCharacter.name, contentId: pickedCharacter.contentId, avg: '—', rank: '—', others: 36, position: positionOf(pickedCharacter.contentId) };
        }
        if (!picked || !pickedCharacter) return null;
        var dog = pickedCharacter;
        var rel = relationScore(dog.contentId); // 主练 ↔ O

        // O 的契合度最高的其他角色（排除主练/O；仅已实装）
        var other = null;
        var otherRel = null;
        if (dogfoodOtherId && String(dogfoodOtherId) !== String(stateId) && String(dogfoodOtherId) !== String(dog.contentId)) {
          var explicit = byId[String(dogfoodOtherId)];
          if (explicit) {
            var er = relationBetween(dog.contentId, explicit.contentId);
            if (er) { other = explicit; otherRel = er; }
          }
        }
        if (!other) {
          releasedCharList().forEach(function (c) {
            if (String(c.contentId) === String(stateId) || String(c.contentId) === String(dog.contentId)) return;
            var rr = relationBetween(dog.contentId, c.contentId);
            if (!rr) return;
            if (!otherRel || rr.score > otherRel.score) { other = c; otherRel = rr; }
          });
        }
        var fit = fitBonusOf(dogfoodFitStar);
        var total = (rel ? rel.score : 0) + fit;
        var tier = tickTier(total);
        var learn = '';
        if (thresholdsList) {
          var found = thresholdsList[0];
          thresholdsList.forEach(function (t) { if (total >= (t.minScore || 0)) found = t; });
          learn = found.learnTimes;
        }
        return {
          id: 'dogfood',
          title: '狗粮笔记配养方案',
          main: main,
          dogfood: dog,
          info: picked,
          rel: rel,
          other: other,
          otherRel: otherRel,
          fitStar: dogfoodFitStar,
          fit: fit,
          base: rel ? rel.score : 0,
          ji: jiReach(rel ? rel.score : 0),
          meta: { total: total, tier: tier, learn: learn },
          entries: [main.name + '契合（示例，可多条/重复）', other ? other.name + '契合（示例，可多条/重复）' : '另一人待定'],
          reason: '狗粮配养：让「' + dog.name + '」训练时携带 ①主练「' + main.name + '」的笔记 ②「' + dog.name +
            '」契合度最高的其他角色（排除主练）' + (other ? '「' + other.name + '」' : '待定') + '的笔记 → ' +
            dog.name + ' 的笔记预期可带「' + main.name + '契合」和「' + (other ? other.name : '另一人') +
            '契合」词条（随机数量、可重复，同目标多条相加；例：希雅契合 2★+1★ = +' +
            (fitBonusOf('**') + fitBonusOf('*')) + '）；该笔记用于 ' + main.name + '：关系分(' + dog.name + ',' + main.name + ') ' +
            (rel ? rel.score : '—') + ' + 契合词条加成 +' + fit + ' → 总分 ' + total + '（' + tier + '，传承学习 ' + learn +
            ' 次）。第二词条目标「' + (other ? other.name : '待定') + '」可复用这本笔记。'
        };
      }

      function dogfoodCompareHtml(pure, position) {
        var dog = dogfoodPlan();
        if (!dog) return '';
        var lines = [];
        if (pure) {
          var d1 = dog.meta.total - pure.meta.total;
          lines.push('vs 纯契合：总分 ' + (d1 >= 0 ? '+' : '') + d1 + '（配养方案得分=单本关系分+词条加成，非两本叠加）');
        }
        if (position && !position.empty) {
          var d2 = dog.meta.total - position.meta.total;
          lines.push('vs 指定位置：总分 ' + (d2 >= 0 ? '+' : '') + d2);
        }
        return (
          '<div class="pair-compare" id="pair-compare-dogfood">📊 狗粮配养对比：' +
          lines.map(function (l) { return '<div>' + esc(l) + '</div>'; }).join('') +
          '<div class="small muted">说明：一本笔记的契合词条数量随机、可重复、可多条，同目标词条相加（样本≥3 条，上限未知）；狗粮通用性榜保留为选 O 的参考（用户口述，细节待细化）。</div></div>'
        );
      }

      function dogfoodOtherOptionsHtml() {
        var main = targetCharacter();
        var dog = dogfoodCarrierId ? byId[String(dogfoodCarrierId)] : null;
        var auto = dogfoodPlan();
        var selectedId = dogfoodOtherId || (auto && auto.other ? String(auto.other.contentId) : '');
        return releasedCharList().filter(function (c) {
          return String(c.contentId) !== String(stateId) && (!dog || String(c.contentId) !== String(dog.contentId));
        }).map(function (c) {
          return '<option value="' + esc(c.contentId) + '"' + (String(c.contentId) === String(selectedId) ? ' selected' : '') + '>' +
            esc(c.name) + '</option>';
        }).join('');
      }

      function dogfoodPlanHtml(plan) {
        if (!plan) return '';
        return (
          '<div class="pair-plan pair-plan-dogfood" id="pair-plan-dogfood">' +
          '<div class="pair-plan-head"><strong>' + esc(plan.title) + '</strong>' +
          '<span class="badge badge--ok">' + esc(plan.meta.tier) + '</span>' +
          '<span class="small muted">用于主练总分 ' + esc(plan.meta.total) + ' · 传承学习 ' + esc(plan.meta.learn) + ' 次</span></div>' +
          '<div class="small muted">狗粮主人 O = <strong>' + esc(plan.dogfood.name) + '</strong>' +
          '（与主练关系分 ' + esc(plan.rel ? plan.rel.score : '—') + ' · 通用性榜 ' +
          (plan.info.rank !== '—' ? '#' + esc(plan.info.rank) + '，平均 ' + esc(plan.info.avg) : '未入榜') + '）</div>' +
          '<div class="team-sub-label">O 的训练携带方案（产生 O 的笔记）</div>' +
          '<div class="pair-plan-notes">' +
          '<div class="pair-note"><span class="tag">携带①</span><strong>' + esc(plan.main.name) + ' 的笔记</strong>' +
          '<span class="small muted">保证 O 笔记出「' + esc(plan.main.name) + '契合」词条</span></div>' +
          '<div class="pair-note"><span class="tag tag--orange">携带②</span><strong>' + esc(plan.other ? plan.other.name : '（待选另一人）') + ' 的笔记</strong>' +
          '<span class="small muted">O 契合最高的其他角色（排除主练；' +
          (plan.otherRel ? '关系分 ' + esc(plan.otherRel.score) : '待定') + '）→ 第二契合词条</span></div>' +
          '</div>' +
          '<div class="team-sub-label">预期产出笔记词条（随机数量/可重复，同目标相加）</div>' +
          '<div class="row" style="gap:6px;flex-wrap:wrap">' +
          plan.entries.map(function (e) { return '<span class="tag tag--orange">' + esc(e) + '</span>'; }).join('') +
          '</div>' +
          '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">🧮</span><span>' +
          '该笔记用于主练「' + esc(plan.main.name) + '」：关系分(' + esc(plan.dogfood.name) + ',' + esc(plan.main.name) + ') ' +
          esc(plan.rel ? plan.rel.score : '—') + ' + 契合词条加成 +' + esc(plan.fit) + '（口径 ' +
          (bonusMode === 'trigger' ? '触发时' : '静态') + '，词条 ' + (esc(plan.fitStar || '无')) + '）→ 总分 ' +
          esc(plan.meta.total) + ' · ' + esc(plan.meta.tier) + ' 档。</span></div>' +
          (plan.ji
            ? '<div class="small muted" style="margin-top:4px">极档可达性：base ' + esc(plan.ji.base) + '（单本关系分）· 距极 ' + esc(plan.ji.gap) +
              ' · 需 ' + esc(plan.ji.combo) + ' ' + jiBadge(plan.ji) + '（优先双 2★，不追 3★）</div>'
            : '') +
          '<div class="small muted" style="margin-top:6px">复用对象：<strong>' + esc(plan.other ? plan.other.name : '待定') +
          '</strong>（第二词条目标）；该笔记可同时给主练与第二目标使用。' +
          (plan.otherRel ? ' O↔' + plan.other.name + ' 关系分 ' + plan.otherRel.score + '。' : '') +
          '（契合词条随机数量/可重复/可多条、同目标相加；用户口述，细节待细化）</div>' +
          '<div class="small muted">' + esc(plan.reason) + '</div>' +
          '<div class="row" style="gap:6px;margin-top:8px"><button type="button" class="btn btn--sm" data-pair-apply="dogfood">应用为当前载体</button></div>' +
          '</div>'
        );
      }

      function dogfoodRankCardHtml() {
        var list = dogfoodList();
        if (!list.length) return '';
        var top = list.slice(0, 15);
        var current = dogfoodPlan();
        return (
          '<div class="card card--pad" id="dogfood-rank">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🍖</span>狗粮通用性榜（Top 15）</div>' +
          '<div class="card-sub">平均契合分=对其他已实装角色关系分的平均（不含自己）；用于选狗粮主人 O 的参考（实际复用看配养出的第二词条）。</div></div>' +
          '<span class="badge badge--info">用户口述/待细化</span></div>' +
          '<div class="table-wrap"><table class="table"><thead><tr><th>#</th><th>角色</th><th>位置</th><th class="num">平均契合分</th><th>状态</th><th></th></tr></thead><tbody>' +
          top.map(function (item) {
            return '<tr><td>' + esc(item.rank) + '</td><td><strong>' + esc(item.name) + '</strong></td>' +
              '<td>' + esc(item.position || '未知') + '</td><td class="num strong">' + esc(item.avg) + '</td>' +
              '<td><span class="badge badge--ok">已实装</span></td>' +
              '<td><button type="button" class="btn btn--xs" data-dogfood-pick="' + esc(item.contentId) + '">用作狗粮</button></td></tr>';
          }).join('') +
          '</tbody></table></div>' +
          '<div class="small muted" style="margin-top:6px">当前狗粮：' +
          esc(current ? (current.dogfood ? current.dogfood.name : current.info.name) + '（平均 ' + current.info.avg + '）' : '未选择') +
          '。来源：48×48 社区矩阵（已实装 37 名）。</div></div>'
        );
      }

      /* ---------------- 高契合闭环（三角，min edge 防污染优先） ---------------- */
      function loopRoleBaseMap() {
        if (!newData || !Array.isArray(newData.characters)) return {};
        var rel = newData.characters.filter(function (mc) {
          return mc.released && mc.contentId != null && byId[String(mc.contentId)];
        });
        var map = {};
        rel.forEach(function (mc) {
          map[mc.id] = rel
            .filter(function (x) { return x.id !== mc.id; })
            .map(function (x) { return Number((newData.matrix[mc.id] || {})[x.id]) || 0; })
            .sort(function (a, b) { return b - a; })
            .slice(0, 2)
            .reduce(function (s, v) { return s + v; }, 0);
        });
        return map;
      }

      function loopRisk(min) {
        if (min >= 16) return { level: 'low', label: '低风险（推荐）', cls: 'badge--ok' };
        if (min >= 14) return { level: 'mid', label: '中等（留意低价值词条）', cls: 'badge--warn' };
        return { level: 'high', label: '高风险（建议换组）', cls: 'badge--warn' };
      }

      function triangles() {
        if (tripleCache) return tripleCache;
        if (!newData || !Array.isArray(newData.characters)) return (tripleCache = []);
        var rel = newData.characters.filter(function (mc) {
          return mc.released && mc.contentId != null && byId[String(mc.contentId)];
        });
        var baseMap = loopRoleBaseMap();
        var list = [];
        for (var i = 0; i < rel.length; i++) {
          for (var j = i + 1; j < rel.length; j++) {
            for (var k = j + 1; k < rel.length; k++) {
              var a = rel[i];
              var b = rel[j];
              var c = rel[k];
              var ab = Number((newData.matrix[a.id] || {})[b.id]) || 0;
              var ac = Number((newData.matrix[a.id] || {})[c.id]) || 0;
              var bc = Number((newData.matrix[b.id] || {})[c.id]) || 0;
              var bases = [baseMap[a.id] || 0, baseMap[b.id] || 0, baseMap[c.id] || 0]; // 每人全局 top2 和
              var within = [ac + bc, ab + bc, ab + ac]; // 闭环内另两本之和（实际使用分数）
              var min = Math.min(ab, ac, bc);
              list.push({
                chars: [byId[String(a.contentId)], byId[String(b.contentId)], byId[String(c.contentId)]],
                matrixIds: [a.id, b.id, c.id],
                edges: [ab, ac, bc],
                bases: bases,
                within: within,
                allCanJi: bases.every(function (v) { return v >= 35; }),
                min: min,
                risk: loopRisk(min),
                sum: ab + ac + bc
              });
            }
          }
        }
        list.sort(function (x, y) {
          // 极后防污染：min edge 优先，其次 sum；不再用总分优先
          if (y.min !== x.min) return y.min - x.min;
          if (y.sum !== x.sum) return y.sum - x.sum;
          return x.chars.map(function (c) { return c.name; }).join('').localeCompare(y.chars.map(function (c) { return c.name; }).join(''));
        });
        tripleCache = list;
        return list;
      }

      function loopDoubleBonus() {
        return fitBonusOf('***') * 2;
      }

      function loopCardHtml() {
        var list = triangles();
        if (!list.length) return '';
        var top = list.slice(0, 15);
        var idx = Math.min(loopIndex, top.length - 1);
        if (idx < 0) idx = 0;
        var t = top[idx];
        var double3 = loopDoubleBonus();
        var names = t.chars.map(function (c) { return c.name; });
        var edges = t.edges;
        function pairText(i, j) {
          return names[i] + '↔' + names[j] + ' ' + (i === 0 && j === 1 ? edges[0] : i === 0 && j === 2 ? edges[1] : edges[2]);
        }
        var cycles = [0, 1, 2].map(function (ri) {
          var others = [0, 1, 2].filter(function (x) { return x !== ri; });
          function edge(x, y) {
            var key = [x, y].sort().join('');
            if (key === '01') return edges[0];
            if (key === '02') return edges[1];
            return edges[2];
          }
          var withinBase = edge(ri, others[0]) + edge(ri, others[1]);
          var base = t.bases[ri] || withinBase;
          var total = withinBase + double3;
          return {
            role: t.chars[ri],
            carry: [t.chars[others[0]], t.chars[others[1]]],
            relations: [edge(ri, others[0]), edge(ri, others[1])],
            base: base,
            withinBase: withinBase,
            ji: jiReach(base),
            withinJi: jiReach(withinBase),
            total: total,
            tier: tickTier(total),
            entries: [t.chars[others[0]].name + '契合', t.chars[others[1]].name + '契合']
          };
        });
        var strong = list.filter(function (item) { return item.min >= 14 && item.allCanJi; }).slice(0, 12);
        return (
          '<div class="card card--pad" id="note-loop">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🔺</span>高契合闭环推荐（三角）</div>' +
          '<div class="card-sub">彼此相性都高的 2-4 人小团，互带笔记形成循环链；先做三角（四团待补）。</div></div>' +
          '<span class="badge badge--info">用户思路/待细化</span></div>' +
          '<div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:8px">' +
          '<label class="small">选择三角：<select class="select" id="loop-triple">' +
          top.map(function (item, i) {
            return '<option value="' + i + '"' + (i === idx ? ' selected' : '') + '>#' + (i + 1) + ' ' +
              esc(item.chars.map(function (c) { return c.name; }).join(' / ')) + '（和 ' + item.sum + ' / 最小 ' + item.min + '）' +
              (item.allCanJi ? ' ✔全员可极' : '') + ' ' + (item.risk.level === 'low' ? '低风险' : item.risk.level === 'mid' ? '中等' : '高风险') +
              '</option>';
          }).join('') + '</select></label>' +
          '<span class="small muted">按最小两两关系分（min edge）优先排序（其次 sum）；极后不追总分，先防污染</span></div>' +
          '<div id="loop-detail">' +
          '<div class="row" style="gap:6px;flex-wrap:wrap">' +
          names.map(function (n) { return '<span class="tag tag--orange">' + esc(n) + '</span>'; }).join('') +
          '<span class="badge badge--ok">三边和 ' + t.sum + '</span>' +
          '<span class="badge badge--info">最小边 ' + t.min + '</span>' +
          '<span class="badge ' + t.risk.cls + '">min ' + t.min + ' · ' + esc(t.risk.label) + '</span>' +
          '<span class="badge ' + (t.allCanJi ? 'badge--ok' : 'badge--warn') + '">' + (t.allCanJi ? '全员可极' : '非全员可极') + '</span></div>' +
          '<div class="small muted" style="margin-top:4px">' + esc(pairText(0, 1)) + ' · ' + esc(pairText(0, 2)) + ' · ' + esc(pairText(1, 2)) + '</div>' +
          '<div class="small muted" style="margin-top:6px">循环互带配置（每个角色训练时带另外两人的笔记）：</div>' +
          '<div class="note-fit-list" style="margin-top:6px" id="loop-cycles">' +
          cycles.map(function (c) {
            return '<div class="note-fit-row"><span class="tag">' + esc(c.role.name) + '</span>' +
              '<span class="small">训练时带 <strong>' + esc(c.carry[0].name) + '</strong> + <strong>' + esc(c.carry[1].name) + '</strong> 的笔记</span>' +
              '<span class="small muted">产出契合词条：' + esc(c.entries.join(' + ')) + '</span>' +
              '<span class="small muted">自身 base ' + esc(c.base) + '（距极 ' + esc(c.ji.gap) + '，需 ' + esc(c.ji.combo) + '）· 队内两本和 ' + esc(c.withinBase) + '</span>' +
              jiBadge(c.ji) +
              (c.withinJi && !c.withinJi.canJi ? '<span class="badge badge--warn">队内两本和不足 35</span>' : '') +
              '<span class="badge badge--ok">' + esc(c.total) + ' → ' + esc(c.tier) + '</span></div>';
          }).join('') +
          '</div>' +
          '<div class="team-sub-label">强闭环列表（min≥14 且全员 base≥35，按 min 降序前 12）</div>' +
          '<div class="note-fit-list" style="margin-top:6px" id="loop-strong">' +
          strong.map(function (item) {
            return '<div class="note-fit-row"><span class="badge badge--ok">min ' + item.min + '</span>' +
              '<span class="small">' + esc(item.chars.map(function (c) { return c.name; }).join(' / ')) + '</span>' +
              '<span class="small muted">两两 ' + esc(item.edges.join('/')) + ' · 和 ' + esc(item.sum) +
              ' · 每人 base ' + esc(item.bases.join('/')) + '</span>' +
              '<span class="badge badge--ok">可极</span></div>';
          }).join('') +
          '</div>' +
          '<div class="small muted" style="margin-top:6px">风险分级：min≥16 低风险（推荐） · 14-15 中等（可用，留意低价值词条） · &lt;14 高风险（警告，建议换组）。</div>' +
          '<div class="small muted" style="margin-top:4px">正例：野上/白神/希雅 = 20/18/17（min 17，零污染）；反例：野上/希雅/先斗 = 希雅-野上 20、希雅-先斗 17 都高，但 <strong>野上-先斗 = 13</strong> → 污染风险。</div>' +
          '<div class="small muted" style="margin-top:4px">排序与推荐：先达极（base≥35），再挑 min edge 最高；<strong>不牺牲最小边凑总分</strong>。</div>' +
          '<div class="small muted" style="margin-top:6px">优先路径：两本各出 1 条 2★ 契合（+10）即可上极（base≥35），不追 3★；base 不足时用 3★+2★（+15）或更多 2★ 补齐。</div>' +
          '<div class="small muted" style="margin-top:6px">使用另两本的总分 = 两两关系分之和（' +
          cycles.map(function (c) { return c.role.name + ' ' + c.relations.join('+'); }).join('；') +
          '） + 双 3★ 契合词条加成 +' + double3 + '（' + (bonusMode === 'trigger' ? '触发时' : '静态') + '口径）。</div>' +
          '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">🛡️</span><span>' +
          '闭环内所有笔记的契合词条目标都来自团内，<strong>天然无污染</strong>：不会被团外角色词条抢主驱动；' +
          '三角内循环互带可稳定维持三边关系分与目标词条。</span></div>' +
          '</div></div>'
        );
      }


      /* ---------------- 训练闭环（3/4/5 人有序环） ---------------- */
      function cycleList() {
        return (newData && Array.isArray(newData.cycles)) ? newData.cycles : [];
      }

      function resolveCycleChar(shortName) {
        if (!newData || !Array.isArray(newData.characters)) return null;
        var key = normName(shortName);
        var found = newData.characters.find(function (mc) {
          return mc.released && (normName(mc.name).indexOf(key) === 0 || normName(mc.shortName || '') === key);
        });
        return found && found.contentId != null ? byId[String(found.contentId)] || null : null;
      }

      function cycleEntryFor(roleId) {
        var list = cycleList();
        if (!list.length) return null;
        if (roleId) {
          for (var i = 0; i < list.length; i++) {
            var mc = resolveCycleChar(list[i].character);
            if (mc && String(mc.contentId) === String(roleId)) return list[i];
          }
        }
        return list[0];
      }

      function cycleCardHtml() {
        var entry = cycleEntryFor(cycleRoleId || stateId);
        if (!entry) return '';
        var size = cycleSize && entry.bySize[String(cycleSize)] ? cycleSize : entry.bestCycleSize;
        var data = entry.bySize[String(size)];
        var names = data.cycle || entry.bestCycle;
        var chars = names.map(function (n) { return resolveCycleChar(n); });
        var edges = data.edges || [];
        var bases = data.bases || [];
        var minEdge = data.minEdge != null ? data.minEdge : entry.minEdge;
        var risk = loopRisk(minEdge);
        var resolvedRole = cycleRoleId || stateId;
        var roles = cycleList().map(function (item) {
          var mc = resolveCycleChar(item.character);
          return mc ? { id: String(mc.contentId), name: mc.name, best: item.bestCycleSize } : null;
        }).filter(Boolean);
        if (!roles.some(function (r) { return r.id === String(resolvedRole); })) resolvedRole = roles[0] && roles[0].id;

        function nameAt(i) { return names[((i % names.length) + names.length) % names.length]; }
        return (
          '<div class="card card--pad" id="note-training-loop">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🔄</span>训练闭环推荐（3/4/5 人）</div>' +
          '<div class="card-sub">有序环 Xi 训练带 X(i+1)、X(i+2) 笔记，使用 X(i-1)、X(i-2) 笔记；每本笔记的 2 个词条恰被团内两人使用。</div></div>' +
          '<span class="badge badge--info">数据已备</span></div>' +
          '<div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:8px">' +
          '<label class="small">选择角色：<select class="select" id="cycle-role">' +
          roles.map(function (r) {
            return '<option value="' + esc(r.id) + '"' + (String(r.id) === String(resolvedRole) ? ' selected' : '') + '>' + esc(r.name) + '</option>';
          }).join('') + '</select></label>' +
          '<label class="small">闭环人数：<select class="select" id="cycle-size">' +
          [3, 4, 5].map(function (n) {
            return '<option value="' + n + '"' + (Number(size) === n ? ' selected' : '') + '>' + n + ' 人' +
              (Number(entry.bestCycleSize) === n ? '（推荐）' : '') + '</option>';
          }).join('') + '</select></label>' +
          '<button type="button" class="btn btn--primary btn--sm" id="cycle-save">保存闭环配置</button></div>' +
          '<div class="row" style="gap:6px;flex-wrap:wrap">' +
          '<span class="badge ' + risk.cls + '">min edge ' + esc(minEdge) + ' · ' + esc(risk.label) + '</span>' +
          '<span class="badge badge--info">和 ' + esc(data.sum) + '</span>' +
          '<span class="badge ' + (entry.allCanReach45WithDouble2Star && bases.every(function (b) { return b >= 35; }) ? 'badge--ok' : 'badge--warn') + '">' +
          (bases.every(function (b) { return b >= 35; }) ? '全员双 2★ 可极' : '部分成员需更高词条') + '</span></div>' +
          '<div class="team-sub-label">环上配置（按顺序循环互带）</div>' +
          '<div class="note-fit-list" style="margin-top:6px" id="cycle-ring">' +
          names.map(function (n, i) {
            var ch = chars[i];
            var base = bases[i] || 0;
            var ji = jiReach(base);
            var carry = [nameAt(i + 1), nameAt(i + 2)];
            return '<div class="note-fit-row"><span class="tag">' + esc(ch ? ch.name : n) + '</span>' +
              '<span class="small">训练带 <strong>' + esc(carry[0]) + '</strong> + <strong>' + esc(carry[1]) + '</strong> 的笔记</span>' +
              '<span class="small muted">base ' + esc(base) + ' · 距极 ' + esc(ji.gap) + ' · 需 ' + esc(ji.combo) + '</span>' +
              jiBadge(ji) +
              (base < 35 ? '<span class="badge badge--warn">此成员需 3★+2★ 或更多词条才能极</span>' : '') +
              '</div>';
          }).join('') +
          '</div>' +
          '<div class="small muted" style="margin-top:8px">环上每条边：' +
          edges.map(function (v, i) {
            return esc(nameAt(i)) + '↔' + esc(nameAt(i + 1)) + ' ' + esc(v);
          }).join(' · ') + '</div>' +
          '<div class="small muted">污染风险：min≥16 推荐 · 14-15 留意 · &lt;14 警告；先达极（base≥35）再挑 min edge 最高，不牺牲最小边凑总分。</div>' +
          '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">🛡️</span><span>' +
          '闭环互带零污染：每本笔记的 2 个契合词条恰被团内两人使用，目标都来自团内；训练/合成请严格按环配置，避免混入团外词条。</span></div>' +
          '</div>'
        );
      }


      function pairPlanHtml(plan, kind) {
        if (!plan) return '';
        if (plan.empty) {
          return '<div class="pair-plan" id="pair-plan-' + kind + '"><div class="pair-plan-head"><strong>' + esc(plan.title) + '</strong>' +
            '<span class="badge badge--warn">位置未知/无候选</span></div>' +
            '<div class="player-missing">' + esc(plan.reason) + '</div></div>';
        }
        var c1 = plan.c1;
        var c2 = plan.c2;
        return (
          '<div class="pair-plan' + (kind === 'pure' ? ' is-pure' : '') + '" id="pair-plan-' + kind + '">' +
          '<div class="pair-plan-head"><strong>' + esc(plan.title) + '</strong>' +
          '<span class="badge ' + (kind === 'pure' ? 'badge--ok' : 'badge--info') + '">' +
          (plan.meta.tier || '—') + '</span>' +
          '<span class="small muted">总分 ' + esc(plan.meta.total) + ' · 传承学习 ' + esc(plan.meta.learn) + ' 次</span></div>' +
          '<div class="pair-plan-notes">' +
          '<div class="pair-note"><span class="tag">笔记1</span><strong>' + esc(c1.character.name) + '</strong>' +
          '<span class="small muted">关系分 ' + esc(c1.score) + (c1.manual ? '（手动补录）' : '') +
          (positionOf(c1.character.contentId) ? ' · 位置 ' + esc(positionOf(c1.character.contentId)) : ' · 位置未知') + '</span></div>' +
          (c2
            ? '<div class="pair-note"><span class="tag">笔记2</span><strong>' + esc(c2.character.name) + '</strong>' +
              '<span class="small muted">关系分 ' + esc(c2.score) + (c2.manual ? '（手动补录）' : '') +
              (positionOf(c2.character.contentId) ? ' · 位置 ' + esc(positionOf(c2.character.contentId)) : ' · 位置未知') + '</span></div>'
            : '') +
          '</div>' +
          '<div class="small muted" style="margin-top:6px">' + esc(plan.reason) + '</div>' +
          (plan.ji
            ? '<div class="small muted" style="margin-top:4px">极档可达性：base ' + esc(plan.ji.base) + ' · 距极 ' + esc(plan.ji.gap) +
              ' · 需 ' + esc(plan.ji.combo) + ' ' + jiBadge(plan.ji) + '（优先「两本各 1 条 2★」而非追 3★）</div>'
            : '') +
          '<div class="row" style="gap:6px;margin-top:8px"><button type="button" class="btn btn--sm" data-pair-apply="' + kind + '">应用为当前载体</button></div>' +
          '</div>'
        );
      }

      function pairCardHtml() {
        var pure = purePairPlan();
        var position = positionPairPlan();
        var compare = pairCompare(pure, position);
        var fitOptions = function (selected) {
          return ['', '*', '**', '***'].map(function (v) {
            return '<option value="' + v + '"' + (selected === v ? ' selected' : '') + '>' + (v || '无') +
              (v ? '（+' + fitBonusOf(v) + '）' : '') + '</option>';
          }).join('');
        };
        return (
          '<div class="card card--pad pair-card" id="note-pairs">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🎯</span>笔记配对推荐（主视图）</div>' +
          '<div class="card-sub">给主练角色推荐两本笔记队友：纯契合 vs 指定位置 vs 狗粮；优先「两本各 1 条 2★ 契合」上极，不追 3★。</div></div>' +
          (pure && pure.ji
            ? '<span class="badge ' + (pure.ji.canJi ? 'badge--ok' : 'badge--warn') + '">主练 base ' + esc(pure.ji.base) +
              ' · ' + (pure.ji.canJi ? '双 2★ 可极' : '距极 ' + esc(pure.ji.gap)) + '</span>'
            : '<span class="badge badge--ok">真数据矩阵</span>') + '</div>' +
          '<div class="row" style="gap:10px;flex-wrap:wrap;margin-bottom:10px">' +
          '<label class="small">契合词条口径：<select class="select" id="pair-bonus-mode">' +
          '<option value="static"' + (bonusMode === 'static' ? ' selected' : '') + '>静态（+2/+5/+10）</option>' +
          '<option value="trigger"' + (bonusMode === 'trigger' ? ' selected' : '') + '>触发时（+3/+6/+10）</option>' +
          '</select></label>' +
          '<label class="small">笔记1 契合词条：<select class="select" id="pair-fit-1">' + fitOptions(ui.noteFitStar1 || '') + '</select></label>' +
          '<label class="small">笔记2 契合词条：<select class="select" id="pair-fit-2">' + fitOptions(ui.noteFitStar2 || '') + '</select></label>' +
          '<label class="small">狗粮笔记主人 O：<select class="select" id="pair-dogfood">' +
          dogfoodList().slice(0, 20).map(function (item) {
            return '<option value="' + esc(item.contentId) + '"' + (String(item.contentId) === String(dogfoodCarrierId || (dogfoodPlan() && dogfoodPlan().info.contentId)) ? ' selected' : '') + '>' +
              esc(item.name) + '（平均 ' + esc(item.avg) + '）</option>';
          }).join('') + '</select></label>' +
          '<label class="small">另一人（第二词条）：<select class="select" id="pair-dogfood-other">' + dogfoodOtherOptionsHtml() + '</select></label>' +
          '<label class="small">主练契合词条：<select class="select" id="pair-dogfood-fit-star">' +
          ['', '*', '**', '***'].map(function (v) {
            return '<option value="' + v + '"' + (dogfoodFitStar === v ? ' selected' : '') + '>' + (v || '无') +
              (v ? '（+' + fitBonusOf(v) + '）' : '') + '</option>';
          }).join('') + '</select></label>' +
          '<button type="button" class="btn btn--primary btn--sm" id="pair-save">保存配对方案</button>' +
          '</div>' +
          (pure ? pairPlanHtml(pure, 'pure') : '<div class="player-missing">矩阵未覆盖主练角色：无法计算纯契合方案。</div>') +
          (targetPosition
            ? pairPlanHtml(position, 'position')
            : '<div class="player-missing" id="pair-plan-position">选择「目标位置」后展示指定位置方案（笔记1=目标位置中契合最高者，提供目标适性词条）。</div>') +
          dogfoodPlanHtml(dogfoodPlan()) +
          (compare ? '<div class="pair-compare">📊 ' + esc(compare.text) + '</div>' : '') +
          dogfoodCompareHtml(pure, position) +
          '<div class="small muted" style="margin-top:8px">位置字段来自 data/structured/characters.json（wiki）；未实装/位置未知角色已排除。适性词条从角色拥有的位置适性中随机抽取（2026-11-10 实测），不是固定取基础/最高适性。</div>' +
          '</div>'
        );
      }

      function calcExtraBonus() {
        return calcEntries.reduce(function (sum, e) { return sum + fitBonusOf(e.star || ''); }, 0);
      }

      function calculator() {
        var c1 = carrierDraft[0] ? byId[String(carrierDraft[0])] : null;
        var c2 = carrierDraft[1] ? byId[String(carrierDraft[1])] : null;
        var r1 = c1 ? relationScore(c1.contentId) : null;
        var r2 = c2 ? relationScore(c2.contentId) : null;
        var bonus1 = fitBonusOf(ui.noteFitStar1 || '');
        var bonus2 = fitBonusOf(ui.noteFitStar2 || '');
        var extra = calcExtraBonus();
        var score = (r1 ? r1.score : 0) + (r2 ? r2.score : 0) + bonus1 + bonus2 + extra;
        return {
          c1: c1, c2: c2, r1: r1, r2: r2,
          bonus: bonus1 + bonus2,
          extra: extra,
          score: score,
          tier: tickTier(score),
          complete: !!(c1 && c2)
        };
      }

      /* ---------------- 推荐词条（启发式） ---------------- */
      function recommendEntries() {
        var main = targetCharacter();
        var out = [];
        var attr = DIR_ATTR[stateDir];
        if (attr) {
          out.push({ name: attr, type: '属性', reason: '方向主属性：' + dirLabel(stateDir) });
          out.push({ name: attr + '上限', type: '属性上限', reason: '方向主属性上限' });
        }
        (DIR_SKILLS[stateDir] || []).slice(0, 2).forEach(function (s) {
          out.push({ name: s, type: '技能', reason: '方向技能/补丁候选' });
        });
        (main.roles || []).forEach(function (role) {
          if (out.length < 5) out.push({ name: role + '定位技能（待映射）', type: '技能组', reason: '定位：' + role });
        });
        var basePos = basePosition();
        if (basePos) {
          out.push({ name: basePos + '适性', type: '特殊（适性）', reason: '角色自己的基础适性（来源=角色基础位置；其他位置样本不足/待验证）' });
        } else {
          out.push({ name: '适性词条（拥有适性随机抽）', type: '特殊（适性）', reason: '适性词条从角色拥有的全部位置适性中随机抽（2026-11-10 实测）；想定向出某位置，别让角色获得额外位置' });
        }
        return out;
      }

      function ensureDraft() {
        var saved = store ? store.getNoteBuild(stateId) : null;
        if (saved) {
          entryDraft = (saved.entries || []).map(function (e) { return { name: e.name, type: e.type, reason: e.reason }; });
          carrierDraft = (saved.carriers || [null, null]).slice(0, 2);
          noteText = saved.note || '';
          stateDir = saved.directionId || stateDir;
          startDraft = saved.start || startDraft;
          targetPosition = saved.targetPosition || targetPosition;
          dogfoodCarrierId = saved.dogfoodCarrierId || dogfoodCarrierId;
          dogfoodOtherId = saved.dogfoodOtherId || dogfoodOtherId;
          dogfoodFitStar = saved.dogfoodFitStar || dogfoodFitStar;
          cycleRoleId = saved.cycleRoleId || cycleRoleId;
          cycleSize = saved.cycleSize || cycleSize;
          if (Array.isArray(saved.fitStars)) {
            ui.noteFitStar1 = saved.fitStars[0] || '';
            ui.noteFitStar2 = saved.fitStars[1] || '';
          }
          if (saved.bonusMode) bonusMode = saved.bonusMode;
        } else {
          entryDraft = recommendEntries();
          var rec = recommendCarriers();
          carrierDraft = [rec.list[0] ? String(rec.list[0].character.contentId) : null, rec.list[1] ? String(rec.list[1].character.contentId) : null];
          noteText = '';
          startDraft = { ownerId: '', entry: '', quality: '红色' };
        }
      }

      /* ---------------- 养成链 ---------------- */
      function chainTree(entryName, quality) {
        var main = targetCharacter();
        var depth = Math.max(1, Math.min(4, Number(chainDepth) || 3));
        var levels = [];
        levels.push({
          level: 0,
          qty: 1,
          label: '目标：' + main.name + ' 的' + quality + '笔记（带「' + (entryName || '目标词条') + '」）',
          action: '最终产物'
        });
        for (var i = 1; i <= depth; i++) {
          var qty = Math.pow(2, i);
          levels.push({
            level: i,
            qty: qty,
            label: qty + ' 册同角色、同品质笔记（都带「' + (entryName || '目标词条') + '」）',
            action: i === depth ? '基础素材（随机记录获得 / 或用已有起点替代）' : '用于上一层修订（2 册 → 1 册）'
          });
        }
        var baseNotes = Math.pow(2, depth);
        var revisions = baseNotes - 1;
        return {
          depth: depth,
          quality: quality,
          entry: entryName,
          levels: levels,
          baseNotes: baseNotes,
          revisions: revisions,
          memorials: baseNotes,
          note:
            '每层修订消耗 2 册同角色同品质（产出 1 册）；到第 ' + depth + ' 层基础素材需 ' + baseNotes +
            ' 册（估算 ' + baseNotes + ' 本毕业纪念册 + ' + revisions + ' 次修订）。基础素材需随机出目标词条，概率待实测，实际消耗可能更高。'
        };
      }

      function startAdvice(tree) {
        var main = targetCharacter();
        if (!startDraft.ownerId || !startDraft.entry) {
          return { ok: false, text: '输入已有笔记（角色 + 词条 + 品质）后，给出它在链路中的可用位置与下一步。' };
        }
        var owner = byId[String(startDraft.ownerId)];
        var entry = String(startDraft.entry || '');
        if (!owner) return { ok: false, text: '角色无效。' };
        var basePos = basePosition();
        var carrier = chainCarrierId ? byId[String(chainCarrierId)] : null;
        if (isFitEntry(entry)) {
          if (carrier && String(owner.contentId) === String(carrier.contentId)) {
            return {
              ok: true,
              position: 'fit-carrier',
              highlight: 'C 的笔记（契合词条来源）',
              text: '✅ 可用：训练「' + main.name + '」时携带这本「' + carrier.name + '」的笔记（+另一本）→ ' + main.name +
                ' 毕业记录时，有概率在 ' + main.name + ' 的笔记上出现「' + carrier.name + '」契合词条；' +
                '若该 C 笔记自身带契合词条，可提高出现概率（待实测）。注意：契合词条不跨层传递——两本笔记自带的契合词条只提高其原主人自己的契合词条出现概率。'
            };
          }
          if (String(owner.contentId) === String(stateId)) {
            return {
              ok: true,
              position: 'fit-owner',
              highlight: 'B 的笔记（同层不传递）',
              text: '⚠️ 这是目标角色自己的笔记：它上面的契合词条只来自训练时携带的笔记原主人（X/Y），不会把其他角色的契合词条传递过来；' +
                '若要「' + (carrier ? carrier.name : 'C') + '」契合词条，请先获得 C 的笔记，再训练 ' + main.name + ' 时携带。'
            };
          }
          return {
            ok: true,
            position: 'fit-cross',
            highlight: '非当前目标载体',
            text: '⚠️ 该角色不是当前目标载体 C：契合词条生成链只在「训练 ' + main.name + ' 时携带 C 的笔记 → ' + main.name +
              ' 毕业记录」这 2 层内发生；其他角色笔记不能跨层传递契合词条。可在上方切换目标载体后再试。'
          };
        }
        if (isSuitEntry(entry)) {
          if (basePos && entry.indexOf(basePos) >= 0) {
            return {
              ok: true,
              position: 'suit-base',
              highlight: '角色基础适性',
              text: '✅ 「' + basePos + '适性」对应目标角色自己的基础适性（来源=角色基础位置）；' +
                '携带带该适性词条的笔记训练时，<strong>学习触发该适性词条 → 该位置适性 +1 级</strong>（无→白→紫→金→彩，词条星级只提高触发概率，2026-11-09 实测）。'
            };
          }
          return {
            ok: true,
            position: 'suit-other',
            highlight: '其他位置适性 · 可通过学习/摇位获得',
            text: '⚠️ 「' + entry + '」不是目标角色的基础适性（基础位置：' + (basePos || '待确认') + '）。' +
              '适性可在训练中<strong>学习触发该位置适性词条 → +1 级</strong>（无→白→紫→金→彩），或直接吃扭蛋「获得一个新位置」（随机位置→紫/增强金/再触发彩）；' +
              '要定向养某位置适性，就携带对应位置角色的适性笔记（如大前适性用野上笔记）。'
          };
        }
        var entryMatch = tree.entry && normName(entry) === normName(tree.entry);
        if (String(owner.contentId) === String(stateId) && entryMatch) {
          return {
            ok: true,
            position: 'seed',
            text: '✅ 起点可用（仅合成/修订链）：目标角色、含目标词条、品质 ' + startDraft.quality +
              '。下一步：再获得 1 册同角色同品质且带「' + tree.entry + '」的笔记 → 可执行 1 次修订（2 册 → 产出目标笔记）。' +
              '注意：该素材树不用于契合词条传递。',
            highlight: '第 1 层素材（2 册之一）'
          };
        }
        if (String(owner.contentId) === String(stateId) && !entryMatch) {
          return {
            ok: true,
            position: 'none',
            text: '⚠️ 角色正确，但不含目标词条「' + tree.entry + '」。不能作为保留素材；建议先把目标词条改为「' + entry + '」再计算。',
            highlight: '不可直接续推'
          };
        }
        return {
          ok: true,
          position: 'cross',
          text: '⚠️ 跨角色起点（仅合成/修订链）：修订要求「同角色、同品质」，不能直接作为目标角色素材；' +
            '若这是契合词条，请查看上方 2 层契合链说明（不跨层传递）。',
          highlight: '跨角色'
        };
      }

      /* ---------------- HTML ---------------- */
      function charOptions(selected) {
        return chars.map(function (c) {
          return '<option value="' + esc(c.contentId) + '"' + (String(c.contentId) === String(selected) ? ' selected' : '') + '>' +
            esc(c.name) + '（' + esc(c.rarity || '—') + ' · ' + esc(c.role || '—') + '）</option>';
        }).join('');
      }

      function headHtml() {
        return (
          '<div class="spread" style="gap:10px;align-items:flex-start;flex-wrap:wrap">' +
          '<div><div class="card-title"><span class="ico">📔</span>笔记养成</div>' +
          '<div class="card-sub">主练角色 → 笔记配对推荐（纯契合 vs 指定位置）→ 词条/养成链辅助；不做库存管理。</div></div>' +
          '<div class="row" style="gap:6px;flex-wrap:wrap">' +
          (newData
            ? '<span class="badge badge--ok">hoopgirls.live v8</span>' +
              '<span class="badge badge--info">48×48 关系分 · 37 名公开</span>' +
              '<span class="badge badge--info">词条库 ' + esc(newData.meta.counts.entries) + ' 条</span>' +
              '<span class="badge badge--warn">社区级 · 待客户端核验</span>'
            : '<span class="badge badge--warn">契合度矩阵：已数字化部分</span>' +
              '<span class="badge badge--warn">entry_id↔名称待映射</span>') +
          '<span class="badge badge--info">规则=官方截图/用户口述</span>' +
          '</div></div>' +
          (newData
            ? '<div class="small muted" style="margin-top:6px">数据源：' + esc((newData.meta.primarySource && newData.meta.primarySource.name) || 'hoopgirls.live') +
              ' · 双源校验：' + esc((newData.meta.validation && newData.meta.validation.result) || '100% 通过') +
              ' · 未实装角色已过滤（' + esc(newData.meta.counts.unreleased) + ' 名）</div>'
            : '') +
          '<div class="grid grid--3" style="gap:12px;margin-top:12px">' +
          '<div class="field"><label class="field-label" for="note-target"><span class="label-text">主练角色</span></label>' +
          '<select class="select" id="note-target">' + charOptions(stateId) + '</select></div>' +
          '<div class="field"><label class="field-label" for="note-position"><span class="label-text">目标位置（可选，指定位置方案）</span></label>' +
          '<select class="select" id="note-position">' +
          '<option value="">不指定位置</option>' +
          POSITIONS.map(function (p) {
            return '<option value="' + esc(p) + '"' + (targetPosition === p ? ' selected' : '') + '>' + esc(p) + '</option>';
          }).join('') + '</select></div>' +
          '<div class="field" hidden><label class="field-label" for="note-direction"><span class="label-text">方向（仅详细工具用；笔记本身只决定位置）</span></label>' +
          '<select class="select" id="note-direction">' +
          dirOrder.map(function (id) {
            return '<option value="' + esc(id) + '"' + (stateDir === id ? ' selected' : '') + '>' + esc(dirLabel(id)) + '</option>';
          }).join('') + '</select></div>' +
          '</div>'
        );
      }

      function entriesCardHtml() {
        return (
          '<div class="card card--pad" id="note-entries">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🧾</span>适合该角色的词条清单</div>' +
          '<div class="card-sub">启发式推荐（定位/方向/技能）；可手动增删。类型：属性/属性上限/技能/技能组/特殊（适性）。</div></div>' +
          '<span class="badge badge--warn">启发式</span></div>' +
          '<div class="note-entry-list">' +
          entryDraft.map(function (e, i) {
            return '<div class="note-entry"><span class="tag tag--orange">' + esc(e.type || '词条') + '</span>' +
              '<strong>' + esc(e.name) + '</strong>' +
              '<span class="small muted">' + esc(e.reason || '') + '</span>' +
              '<button type="button" class="btn btn--xs btn--ghost" data-note-entry-remove="' + i + '">删除</button></div>';
          }).join('') +
          (entryDraft.length ? '' : '<div class="player-missing">暂无推荐词条；可手动添加。</div>') +
          '</div>' +
          '<div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap">' +
          '<input class="input" id="note-entry-name" type="text" maxlength="80" placeholder="词条名（如：投射/三分/适性）" style="max-width:220px">' +
          '<select class="select" id="note-entry-type">' +
          (newData && newData.entryTypes && newData.entryTypes.length
            ? newData.entryTypes.map(function (t) {
                return '<option value="' + esc(t.type_name) + '">' + esc(t.type_name) + '</option>';
              }).join('')
            : entriesData ? entriesData.typeOrder.map(function (id) {
                return '<option value="' + esc(entriesData.types[id].name) + '">' + esc(entriesData.types[id].name) + '</option>';
              }).join('') : '<option value="属性">属性</option>') +
          '</select>' +
          '<button type="button" class="btn btn--sm" id="note-entry-add">添加词条</button></div>' +
          '<div class="small muted" style="margin-top:6px">来源：' +
          (newData
            ? '词条库 ' + newData.meta.counts.entries + ' 条（hoopgirls.live v8）'
            : entriesData
              ? '日志 ' + entriesData.meta.counts.logEntries + ' 条 + 截图具名 ' + entriesData.meta.counts.namedEntries + ' 条'
              : '词条库待补') +
          '；推荐为启发式，可从下方词条库检索加入。</div></div>'
        );
      }

      function entriesLibraryHtml() {
        var libEntries = newData && Array.isArray(newData.entries) ? newData.entries : [];
        var q = entrySearch.trim();
        var list = q
          ? libEntries.filter(function (e) {
              return (e.name + ' ' + e.typeName + ' ' + (e.description || '')).indexOf(q) >= 0;
            })
          : libEntries;
        return (
          '<div class="card card--pad" id="note-library">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">📚</span>词条库（' +
          libEntries.length + ' 条）</div>' +
          '<div class="card-sub">类型/效果/星级；搜索后点「加入推荐」。</div></div>' +
          '<span class="badge badge--info">hoopgirls v8</span></div>' +
          '<input class="input" id="note-lib-search" type="search" placeholder="搜索词条名 / 类型 / 效果…" value="' + esc(entrySearch) + '">' +
          '<div class="note-lib-list">' +
          (list.slice(0, 30).map(function (e) {
            var maxStar = (e.starScores || []).length;
            return '<div class="note-entry"><span class="tag tag--orange">' + esc(e.typeName || ('类型' + e.typeId)) + '</span>' +
              '<strong>' + esc(e.name) + '</strong>' +
              '<span class="small muted">' + esc(String(e.description || '').slice(0, 80)) +
              (maxStar ? ' · ' + maxStar + '★' : '') + '</span>' +
              '<button type="button" class="btn btn--xs" data-note-lib-add="' + esc(e.name) + '" data-note-lib-type="' + esc(e.typeName) + '">加入推荐</button></div>';
          }).join('') || '<div class="player-missing">没有匹配词条。</div>') +
          (list.length > 30 ? '<div class="small muted">仅显示前 30 / ' + list.length + ' 条，可搜索缩小范围。</div>' : '') +
          '</div></div>'
        );
      }

      function carriersCardHtml() {
        var rec = recommendCarriers();
        var top = rec.list.slice(0, 2);
        return (
          '<div class="card card--pad" id="note-carriers">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">👥</span>两本笔记载体推荐</div>' +
          '<div class="card-sub">按契合度最高两个角色；矩阵缺失时手动指定。</div></div>' +
          (rec.matrixAvailable ? '<span class="badge badge--info">矩阵命中</span>' : '<span class="badge badge--warn">契合度矩阵待数字化</span>') + '</div>' +
          (top.length
            ? '<div class="note-carrier-list">' + top.map(function (item, i) {
                return '<div class="note-carrier"><span class="tag">载体 ' + (i + 1) + '</span><strong>' + esc(item.character.name) + '</strong>' +
                  '<span class="small muted">关系分 ' + esc(item.score) + (item.manual ? '（手动补录）' : '') + '</span>' +
                  '<button type="button" class="btn btn--xs" data-note-carrier-pick="' + i + '" data-note-carrier-id="' + esc(item.character.contentId) + '">用作该载体</button></div>';
              }).join('') + '</div>'
            : '<div class="player-missing">矩阵未覆盖该主力：显示「契合度矩阵待数字化」，请手动指定两本载体（可补录关系分）。</div>') +
          '<div class="grid grid--2" style="gap:12px;margin-top:10px">' +
          '<div class="field"><label class="field-label" for="note-carrier-1"><span class="label-text">载体 1</span></label>' +
          '<select class="select" id="note-carrier-1"><option value="">（未选择）</option>' + charOptions(carrierDraft[0]) + '</select></div>' +
          '<div class="field"><label class="field-label" for="note-carrier-2"><span class="label-text">载体 2</span></label>' +
          '<select class="select" id="note-carrier-2"><option value="">（未选择）</option>' + charOptions(carrierDraft[1]) + '</select></div>' +
          '</div>' +
          '<div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap">' +
          '<span class="small muted">手动补录关系分：</span>' +
          '<select class="select" id="note-manual-carrier"><option value="">选择载体…</option>' + charOptions(null) + '</select>' +
          '<input class="input" id="note-manual-score" type="number" min="0" max="99" step="1" placeholder="关系分 0-99" style="max-width:140px">' +
          '<button type="button" class="btn btn--sm" id="note-manual-save">保存补录</button>' +
          '<button type="button" class="btn btn--sm btn--ghost" id="note-manual-import">导入 JSON</button></div>' +
          '<div class="small muted" style="margin-top:6px">契合分来自 37×37 矩阵（已数字化部分）；未覆盖角色可手动补录/导入 JSON（存 bbt.harmonyManual.v1）。</div></div>'
        );
      }

      function calcCardHtml() {
        var calc = calculator();
        return (
          '<div class="card card--pad" id="note-calculator">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🧮</span>契合度计算器</div>' +
          '<div class="card-sub">关系分（两本载体与主力）相加 + 契合词条加分 → 档位；加成口径可切换。</div></div>' +
          '<span class="badge badge--info">社区数据 v8</span></div>' +
          '<div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:8px">' +
          '<label class="small">契合词条加成口径：<select class="select" id="note-bonus-mode">' +
          '<option value="static"' + (bonusMode === 'static' ? ' selected' : '') + '>静态（1★+2/2★+5/3★+10）</option>' +
          '<option value="trigger"' + (bonusMode === 'trigger' ? ' selected' : '') + '>触发时（1★+3/2★+6/3★+10）</option>' +
          '</select></label><span class="small muted">两种口径均来自社区数据，待客户端核验</span>' +
          '</div>' +
          '<div class="note-calc-row">' +
          '<div class="field"><span class="label-text">载体 1：' + esc(calc.c1 ? calc.c1.name : '未选择') + '</span>' +
          '<span class="small muted">关系分 ' + esc(calc.r1 ? calc.r1.score : '—') + (calc.r1 && calc.r1.manual ? '（手动）' : '') + '</span></div>' +
          '<div class="field"><span class="label-text">载体 2：' + esc(calc.c2 ? calc.c2.name : '未选择') + '</span>' +
          '<span class="small muted">关系分 ' + esc(calc.r2 ? calc.r2.score : '—') + (calc.r2 && calc.r2.manual ? '（手动）' : '') + '</span></div>' +
          '</div>' +
          '<div class="row" style="gap:10px;flex-wrap:wrap;margin-top:8px">' +
          '<label class="small">载体1 契合词条：<select class="select" id="note-fit-1">' +
          ['', '*', '**', '***'].map(function (v) {
            return '<option value="' + v + '"' + ((ui.noteFitStar1 || '') === v ? ' selected' : '') + '>' + (v || '无') + (fitBonusOf(v) ? '（+' + fitBonusOf(v) + '）' : '') + '</option>';
          }).join('') + '</select></label>' +
          '<label class="small">载体2 契合词条：<select class="select" id="note-fit-2">' +
          ['', '*', '**', '***'].map(function (v) {
            return '<option value="' + v + '"' + ((ui.noteFitStar2 || '') === v ? ' selected' : '') + '>' + (v || '无') + (fitBonusOf(v) ? '（+' + fitBonusOf(v) + '）' : '') + '</option>';
          }).join('') + '</select></label>' +
          '</div>' +
          '<div class="team-sub-label">多契合词条输入（随机/可重复，同目标分别相加）</div>' +
          '<div class="note-fit-list">' +
          calcEntries.map(function (e, i) {
            return '<div class="note-fit-row">' +
              '<select class="select" data-calc-target="' + i + '">' + charOptions(e.targetId) + '</select>' +
              '<select class="select" data-calc-star="' + i + '">' +
              ['', '*', '**', '***'].map(function (v) {
                return '<option value="' + v + '"' + (e.star === v ? ' selected' : '') + '>' + (v || '无') +
                  (v ? '（+' + fitBonusOf(v) + '）' : '') + '</option>';
              }).join('') + '</select>' +
              '<span class="small muted">' + esc(e.star ? '契合 ' + e.star + ' → +' + fitBonusOf(e.star) : '未设置契合词条') + '</span>' +
              '<button type="button" class="btn btn--xs btn--ghost" data-calc-remove="' + i + '">删除</button></div>';
          }).join('') +
          (calcEntries.length ? '' : '<div class="small muted">可添加多条（例：同一目标 2★ + 1★ 分别 +5/+2，合计 +7）。</div>') +
          '</div>' +
          '<div class="row" style="gap:8px;margin-top:8px"><button type="button" class="btn btn--sm" id="note-calc-add">添加契合词条</button>' +
          '<span class="small muted">多条加成合计：+' + esc(calc.extra) + '</span></div>' +
          '<div class="note-calc-result">基础关系分 ' + esc((calc.r1 ? calc.r1.score : 0) + (calc.r2 ? calc.r2.score : 0)) +
          ' + 契合词条 ' + esc(calc.bonus) + (calc.extra ? ' + 多条 ' + esc(calc.extra) : '') +
          ' = <strong class="num">' + esc(calc.score) + '</strong> → ' +
          tierBadge(calc.score) + '<span class="small muted">档位：' + esc(calc.tier) + '</span></div>' +
          (thresholdsList
            ? '<div class="small muted" style="margin-top:6px">档位/传承学习次数：' +
              thresholdsList.map(function (t) {
                return esc(t.rankName) + '≥' + esc(t.minScore) + '（' + esc(t.learnTimes) + ' 次）';
              }).join(' · ') + '</div>'
            : '<div class="small muted" style="margin-top:6px">阈值：0 / 1-9 / 10-19 / 20-29 / 30-44 / 45+；30=优</div>') +
          (newData && newData.calculation && newData.calculation.entry_trigger_count_by_compatibility
            ? '<div class="small muted" style="margin-top:6px">契合分→触发词条数：' +
              newData.calculation.entry_trigger_count_by_compatibility.map(function (b) {
                return esc(b.required_compatibility_score) + '分→' + esc(b.min_triggered_entries) + '~' + esc(b.max_triggered_entries) + '条';
              }).join(' · ') + '（待实测）</div>'
            : '') +
          (calc.complete ? '' : '<div class="small muted" style="margin-top:6px">选择两本载体后计算完整；缺一侧时按 0 计。</div>') +
          '<div class="small muted" style="margin-top:6px">契合词条可多条、可重复，同一目标按星级分别加成后相加（例：希雅契合 2★+5 与 1★+2 → +7）；数量随机、上限未知。</div>' +
          '</div>'
        );
      }

      function suitabilityCardHtml() {
        var main = targetCharacter();
        var base = basePosition();
        return (
          '<div class="card card--pad" id="note-suit">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🧩</span>适性词条（角色基础适性）</div>' +
          '<div class="card-sub">适性等级：无 → 白 → 紫 → 金 → 彩（彩封顶）；学习触发适性词条 = 该位置 +1 级，词条星级=触发概率。</div></div>' +
          '<span class="badge badge--ok">2026-11-09 实测</span></div>' +
          '<div class="small muted">目标角色基础位置：<strong>' + esc(base || '待确认') + '</strong></div>' +
          '<div class="row" style="gap:6px;flex-wrap:wrap;margin-top:8px">' +
          POSITIONS.map(function (p) {
            var isBase = p === base;
            return '<span class="tag' + (isBase ? ' tag--orange' : '') + '">' + esc(p) + '适性' +
              (isBase ? '（基础）' : '（可学习/摇位获得）') + '</span>';
          }).join('') +
          '</div>' +
          '<div class="notice notice--info" style="margin-top:10px"><span class="notice-ico">💡</span><span>' +
          '提升途径：①训练时携带<strong>该位置角色的适性词条笔记</strong> → 学习触发该词条 → 该位置适性 <strong>+1 级</strong>（无→白→紫→金→彩）；' +
          '②扭蛋「<strong>获得一个新位置</strong>」随机获得新位置（紫；增强→金；再触发词条→彩）。' +
          '词条星级(1~3★)只决定**触发概率**，不直接给等级。</span></div></div>'
        );
      }

      /* ---------------- 合成素材一致性检查器 ---------------- */
      function parseProfile(text) {
        return String(text || '')
          .split(/[,，、+＋;\n]/)
          .map(function (s) { return String(s).trim(); })
          .filter(Boolean)
          .map(function (item) {
            var stars = 0;
            var mStar = item.match(/([123])\s*(?:★|\*)|(?:★+)|(\*+)/);
            if (mStar) {
              if (mStar[1]) stars = Number(mStar[1]);
              else if (mStar[0]) stars = (mStar[0].match(/★|\*/g) || []).length;
            }
            var name = item.replace(/[123]\s*(?:★|\*)/g, '').replace(/[★*]/g, '').replace(/契合$/, '').trim();
            return { name: name, star: Math.max(0, Math.min(3, stars)), raw: item };
          })
          .filter(function (e) { return e.name; });
      }

      function analyzeConsistency() {
        var targetList = parseProfile(consistency.target);
        var targetNames = [];
        targetList.forEach(function (e) { if (targetNames.indexOf(e.name) < 0) targetNames.push(e.name); });
        var mats = consistency.mats.map(function (t) { return parseProfile(t); });
        var perTarget = targetNames.map(function (name) {
          var count = 0;
          var maxStar = 0;
          var perMat = mats.map(function (entries) {
            var hit = 0;
            entries.forEach(function (e) {
              if (e.name === name) { hit++; count++; maxStar = Math.max(maxStar, e.star); }
            });
            return hit;
          });
          return { name: name, count: count, maxStar: maxStar, perMat: perMat };
        });
        var foreign = [];
        mats.forEach(function (entries, mi) {
          entries.forEach(function (e) {
            if (targetNames.indexOf(e.name) < 0) foreign.push({ name: e.name, star: e.star, mat: mi + 1 });
          });
        });
        var targetCount = perTarget.reduce(function (s, t) { return s + t.count; }, 0);
        var foreignCount = foreign.length;
        var targetMaxStar = perTarget.reduce(function (m, t) { return Math.max(m, t.maxStar); }, 0);
        var foreignMaxStar = foreign.reduce(function (m, f) { return Math.max(m, f.star); }, 0);
        var missingMats = [];
        perTarget.forEach(function (t) {
          if (t.count === 0) missingMats.push(t.name);
        });
        var incompleteMat = mats.some(function (entries) {
          return targetNames.some(function (name) {
            return !entries.some(function (e) { return e.name === name; });
          });
        });
        var risks = [];
        if (!targetNames.length) risks.push('未填写目标 profile（如「希雅契合、野上契合」）。');
        if (targetNames.length && targetCount === 0) risks.push('三本素材均未检出目标词条：合成后目标词条基本无法保留。');
        if (targetNames.length && targetCount > 0 && incompleteMat) risks.push('目标词条出现次数偏低：并非每本素材都带目标词条，3 合 1 容易被挤掉。');
        if (foreignCount > 0) {
          risks.push('检出杂词条 ' + foreignCount + ' 条（' + foreign.map(function (f) { return f.name + ' ' + f.star + '★（素材' + f.mat + '）'; }).join('、') + '）：会抢占主驱动，导致目标词条丢失。');
        }
        if (foreignMaxStar > targetMaxStar) risks.push('杂词条星级高于目标词条：更容易被保留。');
        var conclusion;
        if (!targetNames.length) conclusion = '请先填写目标 profile。';
        else if (!targetCount) conclusion = '不合格：三本素材都没有目标词条，不建议合成。';
        else if (foreignCount === 0 && !incompleteMat) conclusion = '✅ 配置一致：三本素材均带目标词条且无杂词条，可合成。';
        else conclusion = '⚠️ 配置不一致：杂词条笔记请另用；同配置（目标 profile 全程一致）才建议合成。';
        return {
          targetNames: targetNames,
          perTarget: perTarget,
          mats: mats,
          foreign: foreign,
          targetCount: targetCount,
          foreignCount: foreignCount,
          risks: risks,
          conclusion: conclusion,
          ok: targetNames.length > 0 && targetCount > 0 && foreignCount === 0 && !incompleteMat
        };
      }

      function consistencyResultHtml() {
        var a = analyzeConsistency();
        return (
          '<div class="consist-result' + (a.ok ? ' is-ok' : '') + '">' +
          '<div class="small"><strong>目标 profile：</strong>' +
          (a.targetNames.length ? a.targetNames.map(function (n) { return '<span class="tag">' + esc(n) + '契合</span>'; }).join(' ') : '（未填写）') + '</div>' +
          '<div class="table-wrap" style="margin-top:6px"><table class="table"><thead><tr><th>素材</th>' +
          (a.targetNames.length ? a.targetNames.map(function (n) { return '<th>' + esc(n) + '</th>'; }).join('') : '<th>—</th>') +
          '<th>杂词条</th></tr></thead><tbody>' +
          a.mats.map(function (entries, i) {
            var foreign = entries.filter(function (e) { return a.targetNames.indexOf(e.name) < 0; });
            return '<tr><td>素材' + (i + 1) + '</td>' +
              (a.targetNames.length
                ? a.targetNames.map(function (n) {
                    var hits = entries.filter(function (e) { return e.name === n; });
                    return '<td>' + (hits.length ? hits.map(function (h) { return h.star + '★'; }).join('+') + '（' + hits.length + ' 次）' : '—') + '</td>';
                  }).join('')
                : '<td>—</td>') +
              '<td>' + (foreign.length ? foreign.map(function (f) { return esc(f.name) + ' ' + f.star + '★'; }).join('、') : '无') + '</td></tr>';
          }).join('') +
          '</tbody></table></div>' +
          '<div class="small muted" style="margin-top:4px">目标词条合计出现 ' + a.targetCount + ' 次；杂词条 ' + a.foreignCount + ' 条。</div>' +
          (a.risks.length ? '<ul class="note-rules small" style="margin:6px 0 0">' + a.risks.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' : '') +
          '<div class="notice ' + (a.ok ? 'notice--info' : 'notice--warn') + '" style="margin-top:6px"><span class="notice-ico">' + (a.ok ? '✅' : '⚠️') + '</span><span>' + esc(a.conclusion) + '</span></div>' +
          '</div>'
        );
      }

      function consistencySectionHtml() {
        var targetVal = consistency.target;
        if (!targetVal) {
          var main = targetCharacter();
          var rec = recommendCarriers();
          targetVal = main.name + '契合' + (rec.list[0] ? '、' + rec.list[0].character.name + '契合' : '');
        }
        return (
          '<div class="team-sub-label">合成素材一致性检查（同 profile 才合成）</div>' +
          '<div class="note-fit-row"><span class="tag">目标 profile</span>' +
          '<input class="input" id="consist-target" type="text" value="' + esc(targetVal) + '" placeholder="例：希雅契合、野上契合" style="max-width:360px">' +
          '<span class="small muted">格式：目标契合[星级]，逗号分隔</span></div>' +
          '<div class="note-fit-list" style="margin-top:6px">' +
          [0, 1, 2].map(function (i) {
            return '<div class="note-fit-row"><span class="tag">素材' + (i + 1) + '</span>' +
              '<input class="input consist-mat" data-mat="' + i + '" type="text" value="' + esc(consistency.mats[i] || '') + '" placeholder="例：希雅契合2★、野上契合1★" style="max-width:360px"></div>';
          }).join('') +
          '</div>' +
          '<div class="row" style="gap:8px;margin-top:8px"><button type="button" class="btn btn--sm" id="consist-check">检查一致性</button>' +
          '<span class="small muted">合成策略：同目标 profile 全程一致（训练带相同两本笔记、按 profile 分类库存）</span></div>' +
          '<div id="consist-result">' + consistencyResultHtml() + '</div>' +
          '<div class="small muted" style="margin-top:6px">混入其他角色词条（如佐久间）会抢主驱动、导致目标词条在 3 合 1 被挤掉（用户实测 3 金中 2 本带佐久间 → 红笔记希雅全丢）。</div>'
        );
      }

      function chainCardHtml() {
        var main = targetCharacter();
        var entry = chainEntry || (entryDraft[0] ? entryDraft[0].name : '');
        var tree = chainTree(entry, '红色');
        var rec = recommendCarriers();
        if (!chainCarrierId && rec.list[0]) chainCarrierId = String(rec.list[0].character.contentId);
        var advice = startAdvice(tree);
        var carrier = chainCarrierId ? byId[String(chainCarrierId)] : null;
        var carrierRel = carrier ? relationScore(carrier.contentId) : null;
        var otherDraft = carrierDraft[1] && String(carrierDraft[1]) !== String(chainCarrierId) ? byId[String(carrierDraft[1])] : null;
        var otherRel = otherDraft ? relationScore(otherDraft.contentId) : null;
        return (
          '<div class="card card--pad" id="note-chain">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🔗</span>契合词条养成链（2 层）</div>' +
          '<div class="card-sub">目标：B 的笔记 + C 契合词条 → ①获得 C 的笔记 → ②训练 B 携带 C 笔记 → ③B 记录时概率出词条。</div></div>' +
          '<span class="badge badge--warn">概率待实测</span></div>' +
          '<div class="note-chain-controls">' +
          '<label class="small">契合词条对象 C：<select class="select" id="note-chain-carrier">' +
          (rec.list.length ? rec.list.map(function (item) {
            return '<option value="' + esc(item.character.contentId) + '"' + (String(item.character.contentId) === String(chainCarrierId) ? ' selected' : '') + '>' +
              esc(item.character.name) + '（关系分 ' + esc(item.score) + '）</option>';
          }).join('') : '<option value="">（矩阵无可用载体）</option>') +
          '</select></label>' +
          '</div>' +
          '<ol class="note-fit-chain">' +
          '<li><strong>① 获得 C 的笔记</strong>：记录「' + esc(carrier ? carrier.name : 'C') + '」（消耗 1 本毕业纪念册；若 C 笔记带契合词条，后面可提高概率）。</li>' +
          '<li><strong>② 训练 B 时携带 C 的笔记（+另一本）</strong>：目标「' + esc(main.name) + '」＋ C 笔记' +
          (carrierRel ? '（当前关系分 ' + esc(carrierRel.score) + '）' : '') +
          (otherDraft ? ' ＋ ' + esc(otherDraft.name) + ' 笔记' + (otherRel ? '（关系分 ' + esc(otherRel.score) + '）' : '') : '') +
          ' → 提高契合度、并让 B 记录时有概率出 C 契合词条。</li>' +
          '<li><strong>③ B 毕业记录</strong>：有概率在 B 的笔记上出现「' + esc(carrier ? carrier.name : 'C') + '」契合词条（id=501）；' +
          'C 的笔记带契合词条可提高概率（机制待实测）。</li>' +
          '</ol>' +
          '<div class="notice notice--warn" style="margin-top:8px"><span class="notice-ico">🚫</span><span>' +
          '<strong>不跨层传递：</strong>两本笔记自带的契合词条<strong>不会</strong>让 B 的笔记出现「那本笔记词条对象」的契合词条；' +
          '它们只是提高其<strong>原主人（X/Y）自己</strong>的契合词条出现概率。所以契合链只有这 2 层，不存在 2^depth 递归。</span></div>' +
          '<div class="small muted" style="margin-top:6px">来源：knowledge/笔记系统_规则与养成链.md §5 + claims（用户口述修正 2026-11-05）。</div>' +
          '<details class="fold" style="margin-top:12px"><summary class="section-label" style="cursor:pointer">合成 / 修订素材树（<strong>不用于契合词条传递</strong>，仅消耗估算）</summary>' +
          '<div class="note-chain-controls" style="margin-top:8px">' +
          '<label class="small">目标词条（合成/修订）：<select class="select" id="note-chain-entry">' +
          (entryDraft.length ? entryDraft.map(function (e) {
            return '<option value="' + esc(e.name) + '"' + (entry === e.name ? ' selected' : '') + '>' + esc(e.name) + '</option>';
          }).join('') : '<option value="">（先添加词条）</option>') + '</select></label>' +
          '<label class="small">展开层数：<select class="select" id="note-chain-depth">' +
          [1, 2, 3, 4].map(function (d) {
            return '<option value="' + d + '"' + (Number(chainDepth) === d ? ' selected' : '') + '>' + d + ' 层</option>';
          }).join('') + '</select></label>' +
          '</div>' +
          '<div class="note-tree">' +
          tree.levels.map(function (lv) {
            return '<div class="note-tree-level' + (lv.level === 0 ? ' is-root' : '') + '" style="margin-left:' + (lv.level * 18) + 'px">' +
              '<span class="note-tree-node">' + (lv.level === 0 ? '🎯' : '└─') + ' 第 ' + lv.level + ' 层 · ' + esc(lv.label) + '</span>' +
              '<span class="small muted">' + esc(lv.action) + '</span></div>';
          }).join('') +
          '</div>' +
          '<div class="note-chain-cost">估算：基础素材 ' + tree.baseNotes + ' 册 · 修订 ' + tree.revisions +
          ' 次 · 毕业纪念册约 ' + tree.memorials + ' 本（不含随机概率额外消耗；品质固定 ' + tree.quality + '）。' +
          (newData && newData.noteQualities
            ? (function () {
                var q = null;
                newData.noteQualities.forEach(function (x) { if (x.quality_name === tree.quality) q = x; });
                return q
                  ? ' 品质口径：' + esc(q.quality_name) + ' → 词条数 ' + esc((q.entry_count || []).join('~')) +
                    ' · 修订消耗 ' + esc(q.note_consume_cnt) + ' 册/次 · auto_edu_exp ' + esc(q.auto_edu_exp) + '（估算参考）。'
                  : '';
              })()
            : '') +
          '</div>' +
          (newData && newData.penDecomposeLevels
            ? '<div class="small muted">分解奖励档位：' + newData.penDecomposeLevels.length + ' 档（未参与估算）。</div>'
            : '') +
          '<div class="small muted">' + esc(tree.note) + '</div>' +
          '<div class="small muted" style="margin-top:6px">⚠️ 合成 3 合 1 词条保留规则（假说）：出现次数优先 → 剩余按星级取高；想让红笔记保留目标词条，三本素材尽量都带该词条。</div>' +
          consistencySectionHtml() +
          '</details>' +
          '<div class="team-sub-label">起点续推（我有一本…）</div>' +
          '<div class="row" style="gap:6px;flex-wrap:wrap">' +
          '<select class="select" id="note-start-owner"><option value="">已有笔记角色…</option>' + charOptions(startDraft.ownerId) + '</select>' +
          '<input class="input" id="note-start-entry" type="text" maxlength="80" placeholder="词条名（如：契合度/大前适性）" value="' + esc(startDraft.entry) + '" style="max-width:180px">' +
          '<select class="select" id="note-start-quality">' +
          QUALITIES.map(function (q) {
            return '<option value="' + esc(q) + '"' + (startDraft.quality === q ? ' selected' : '') + '>' + esc(q) + '</option>';
          }).join('') + '</select>' +
          '<button type="button" class="btn btn--sm" id="note-start-go">续推</button></div>' +
          (advice.ok
            ? '<div class="notice ' + (advice.position === 'seed' || advice.position === 'fit-carrier' || advice.position === 'suit-base' ? 'notice--info' : 'notice--warn') + '" style="margin-top:8px"><span class="notice-ico">🧭</span><span>' +
              '可用位置：<strong>' + esc(advice.highlight) + '</strong> · ' + esc(advice.text) + '</span></div>'
            : '<div class="small muted" style="margin-top:6px">' + esc(advice.text) + '</div>') +
          '</div>'
        );
      }

      function qualityRefCardHtml() {
        var qs = (newData && newData.noteQualities) || [];
        if (!qs.length) return '';
        return (
          '<div class="card card--pad" id="note-quality-ref">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">💎</span>笔记品质与词条数参考</div>' +
          '<div class="card-sub">品质 → 词条数范围/合成/消耗；来自社区数据（待客户端核验）。</div></div>' +
          '<span class="badge badge--info">社区数据</span></div>' +
          '<div class="table-wrap"><table class="table"><thead><tr><th>品质</th><th>词条数范围</th><th>可合成</th><th>修订消耗</th><th class="num">auto_edu_exp</th></tr></thead><tbody>' +
          qs.map(function (q) {
            var range = (q.entry_count || []).length > 1 ? q.entry_count[0] + '-' + q.entry_count[1] : String((q.entry_count || ['—'])[0]);
            if ((q.entry_count || [])[1] >= 999) range = (q.entry_count || [])[0] + '+';
            return '<tr><td><strong>' + esc(q.quality_name) + '</strong></td><td>' + esc(range) + '</td>' +
              '<td>' + (q.can_compound ? '<span class="badge badge--ok">可</span>' : '<span class="badge badge--warn">不可</span>') + '</td>' +
              '<td>' + esc(q.note_consume_cnt === 9999 ? '—' : q.note_consume_cnt + ' 册/次') + '</td>' +
              '<td class="num">' + esc(q.auto_edu_exp) + '</td></tr>';
          }).join('') +
          '</tbody></table></div>' +
          '<div class="small muted" style="margin-top:8px">合成路径：<strong>3 册同角色、同品质 → 高一阶</strong>；' +
          '紫 → 红理论约需 <strong>9 本紫</strong>（紫→金 3 本 × 金→红 3 本）。彩色（彩）不可合成。' +
          '（估算口径：不考虑随机词条/失败；用户口述/社区数据待细化）</div>' +
          '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">🎯</span><span>' +
          '<strong>词条类型门槛（初次记录品质，2026-11-08 实测）：</strong>契合度词条仅<strong>紫色以上</strong>；' +
          '技能词条仅<strong>金色以上</strong>；适性词条仅<strong>红色以上</strong>。合成升品质<strong>不会补发</strong>对应词条类型。' +
          '→ 想产出「技能+契合」的笔记，初次记录必须金色以上；要带适性必须红色以上。</span></div>' +
          '<div class="notice notice--warn" style="margin-top:8px"><span class="notice-ico">⚠️</span><span>' +
          '<strong>合成升阶不保证词条全部保留，高阶合成可能丢失目标词条。</strong><br/>' +
          '实测观察：<strong>紫→金</strong>为并集保留（3 紫词条合并到 1 金）；<strong>金→红</strong>可能随机/丢失（用户实测 3 金合 1 红时希雅词条全部丢失；样本少，待统计）。<br/>' +
          '建议：不要把带目标词条的高品质笔记盲目拿去合成；优先保留词条好的作为素材/最终笔记。' +
          '</span></div>' +
          '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">🧪</span><span>' +
          '<strong>3 合 1 词条保留规则（假说，用户实测+待更多样本验证）</strong><br/>' +
          '① 优先按「出现次数」保留主驱动词条（出现最多的优先）；② 剩余单条词条之间「按星级取高」保留。<br/>' +
          '案例：3 紫 → 金：野上1×3 + 希雅1×2 + 希雅2×2 → 金 = 野上1 + 希雅2 + 希雅1；<br/>' +
          '3 金 → 红：野上1×3 + 希雅1×1 + 希雅2×1 + 佐久间1×1 + 佐久间3×1 → 红 = 野上1 + 佐久间3。<br/>' +
          '<strong>策略建议：想让红笔记保留希雅契合 → 三本素材尽量都带希雅契合（拉高出现次数），且星级高优先；</strong>' +
          '反之目标词条只出现在一本素材里，很容易被高星的其他词条挤掉。' +
          '</span></div></div>'
        );
      }

      function rulesCardHtml() {
        var rules = entriesData ? entriesData.rules : null;
        var gaps = (newData && newData.meta && newData.meta.gaps) || (entriesData && entriesData.meta && entriesData.meta.gaps) || [];
        return (
          '<div class="card card--pad" id="note-rules">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">📜</span>规则与数据来源</div>' +
          '<div class="card-sub">修订 / 合成 / 记录 / 适性词条说明。</div></div>' +
          '<span class="badge badge--info">官方截图 + 用户口述</span></div>' +
          '<ul class="note-rules">' +
          (rules
            ? [rules.revise, rules.combine, rules.record, rules.reviseKeep, rules.fitNote].map(function (r) {
                return '<li>' + esc(r) + '</li>';
              }).join('')
            : '<li>规则数据缺失：请运行 build-note-entries.mjs</li>') +
          '</ul>' +
          '<div class="notice notice--info"><span class="notice-ico">🔗</span><span>' +
          '<strong>契合词条（id=501）修正：</strong>角色 A 笔记上的契合词条对象 = A 训练时携带的两本笔记原主人（X/Y）；' +
          '不跨层传递——两本笔记自带的契合词条只提高其原主人自己的契合词条出现概率，不会传递给 A。养成链固定 2 层：获得 C 的笔记 → 训练 B 时携带 → B 记录概率出 C 契合词条。<br/>' +
          '<strong>适性词条（2026-11-09 更新）：</strong>适性等级 无 → 白 → 紫 → 金 → 彩；训练时携带该位置角色的适性词条笔记，<strong>学习触发即该位置 +1 级</strong>（词条星级只提高触发概率）；' +
          '也可用扭蛋「获得一个新位置」随机获得新位置（紫/增强金/再触发彩）。最新合成/修订规则见「笔记合成 / 修订」卡。' +
          '</span></div>' +
          (newData
            ? '<div class="small muted">契合度数据：' + esc((newData.meta.primarySource && newData.meta.primarySource.name) || 'hoopgirls.live') +
              ' v' + esc((newData.meta.primarySource && newData.meta.primarySource.data_version) || 8) +
              ' · ' + esc((newData.meta.validation && newData.meta.validation.result) || '双源 100% 校验') +
              ' · ' + esc(newData.meta.confidence) + '</div>'
            : '') +
          '<div class="small muted">规则来源：knowledge/笔记系统_规则与养成链.md §5 + claims（用户口述修正 2026-11-05）</div>' +
          '<div class="team-sub-label">数据缺口（显式标注，不虚构）</div>' +
          '<ul class="note-rules small muted">' + gaps.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('') + '</ul>' +
          '</div>'
        );
      }

      function notesCardHtml() {
        return (
          '<div class="card card--pad" id="note-mine">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">📝</span>链路备注 / 我的笔记</div>' +
          '<div class="card-sub">按目标角色保存（词条清单/载体/起点/备注）；随用户配置导出。</div></div></div>' +
          '<textarea class="input" id="note-build-text" rows="3" maxlength="2000" placeholder="记录链路思路、替代载体、实测消耗…">' + esc(noteText) + '</textarea>' +
          '<div class="row" style="gap:8px;margin-top:10px"><button type="button" class="btn btn--primary btn--sm" id="note-build-save">保存笔记养成配法</button>' +
          '<button type="button" class="btn btn--sm btn--ghost" id="note-build-reset">按推荐重置</button>' +
          '<span class="small muted">key：bbt.noteBuilds.v1（按目标角色）+ bbt.harmonyManual.v1（手动契合分）</span></div></div>'
        );
      }

      function craftCardHtml() {
        return (
          '<div class="card card--pad" id="note-craft-rules" style="margin-top:16px">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🧬</span>笔记合成 / 修订（实测规则 + 配置对照）</div>' +
          '<div class="card-sub">合成 3 本、修订 2 本；词条保留/升星、适性词条、合成品质上限与契合度词条生成。</div></div>' +
          '<span class="badge badge--ok">玩家实测 2026-11-09</span></div>' +
          '<div class="grid grid--2" style="align-items:start;gap:12px">' +
          '<div><div class="team-sub-label">合成（3 本）· 修订（2 本）</div>' +
          '<ul class="note-rules small">' +
          '<li><strong>合成 = 3 本</strong>（客户端常量 <span class="inline-code">COMPOUND_SLOT_NUM=3</span> + 文案「请选择三个笔记」✅ 配置确认）</li>' +
          '<li><strong>修订 = 2 本</strong>（<span class="inline-code">REVISION_SLOT_NUM=2</span> + 文案「请选择两个笔记」✅ 配置确认）</li>' +
          '<li>参与的所有笔记<strong>都含同一词条</strong> → 该词条<strong>必保留</strong></li>' +
          '<li>所有笔记该词条<strong>星级相同</strong> → <strong>升星</strong>（如 3 本 1★ → 2★）</li>' +
          '<li><strong>星级混杂</strong>（1★/2★/3★）→ 随机取其一，大概率落到低星（高风险）</li>' +
          '<li><strong>适性词条</strong>：修订两本必须都有<strong>相同适性</strong>才保留，否则大概率消失</li>' +
          '<li><strong>合成品质上限 = 红色</strong>；<strong>修订</strong>：红+红、彩+彩（红/彩不能跨品质）</li>' +
          '<li>合成产物<strong>不带适性词条</strong>（适性只在初次记录 红色以上产生）</li>' +
          '<li>彩色笔记词条数 16~999 → 长远看彩笔记价值更高；小毕业先做红色笔记</li>' +
          '</ul></div>' +
          '<div><div class="team-sub-label">契合度词条（一本最多 4 个）</div>' +
          '<ul class="note-rules small">' +
          '<li>携带 <strong>2 本笔记</strong>：每本的<strong>原主人</strong>各带来 1 个对应契合度词条（希雅笔记→希雅契合、白神笔记→白神契合）</li>' +
          '<li>另外两个契合词条是<strong>概率获得（不是必得）</strong>，且来源 = <strong>两本笔记里已有的契合度词条</strong>（不是全局随机角色）：希雅笔记带白神契合 → 新笔记有概率再出白神契合；反之亦然</li>' +
          '<li>所以最多 <strong>4 个契合词条</strong>（两个来源人物各 2 个）</li>' +
          '<li>配置侧证据：词条类型 5 描述「如果在学习时触发，提高主力分解出契合度词条的概率」→ <strong>概率产生</strong>；<span class="inline-code">harmony_priority_dict</span> 48 行权重 9/8/7/6/4/3/2 说明候选角色有权重</li>' +
          '<li>多词条 + 单词条合成：<strong>保留多个同人物词条</strong>；单词条 1★ 可能“归一”减少数量</li>' +
          '<li>多词条 + 高星单词条（2 个 1★ + 1 个 3★）→ 可能得 <strong>2★+1★</strong>（不会直接到 3★）</li>' +
          '<li>养 3★ 适性的正确路径：两本 1★ 同适性 → 2★；再两本 2★ → 3★；<strong>不要 1★+2★ 修订</strong></li>' +
          '</ul></div></div>' +
          '<div class="notice notice--warn" style="margin-top:8px"><span class="notice-ico">⚠️</span><span>' +
          '词条保留/升星属于<strong>服务端规则</strong>：客户端只发 <span class="inline-code">RequestSingleCompoundV2</span>/<span class="inline-code">RequestBatchCompound</span>（修订走 confirm_refine_note_list），本地仅 <span class="inline-code">CompareValue/CompareNotes</span> 做展示对比，无合并逻辑。' +
          '配置可确认的只有：合成 3 本/修订 2 本、记录笔等级门槛（Lv2 金/Lv4 红/Lv6 彩）、彩词条数 16+、品质表 <span class="inline-code">can_compound</span> 字段。' +
          '已有满意的 3★ 适性笔记 → 不要再合成/修订。' +
          '</span></div></div>'
        );
      }

      function adaptCardHtml() {
        return (
          '<div class="card card--pad" id="note-adapt-system" style="margin-top:16px">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🧭</span>位置适性体系（无 → 白 → 紫 → 金 → 彩）</div>' +
          '<div class="card-sub">适性等级、提升途径、以及「适性词条星级 ≠ 适性颜色」的关系。</div></div>' +
          '<span class="badge badge--ok">玩家实测 2026-11-09</span></div>' +
          '<div class="grid grid--2" style="align-items:start;gap:12px">' +
          '<div><div class="team-sub-label">等级与提升途径</div>' +
          '<ul class="note-rules small">' +
          '<li>每个位置独立：<strong>无 → 白 → 紫 → 金 → 彩（彩封顶）</strong></li>' +
          '<li><strong>扭蛋「获得一个新位置」</strong>：随机获得新位置 → 该位置适性 <strong>紫</strong>；增强款 → <strong>金</strong>；再触发一次笔记词条 → <strong>彩</strong></li>' +
          '<li><strong>笔记学习触发适性词条</strong>：无论词条多少星级，该位置适性<strong>只 +1 级</strong></li>' +
          '<li>所以「大前希雅」路径：摇位到紫/金 → 训练时带<strong>大前适性词条笔记</strong>（野上笔记）反复触发 → 金/彩</li>' +
          '</ul></div>' +
          '<div><div class="team-sub-label">星级 vs 颜色（重要区分）</div>' +
          '<ul class="note-rules small">' +
          '<li><strong>适性词条星级（1~3★）</strong>：提高该词条在<strong>笔记学习时被触发</strong>的概率（星级越高越容易触发）</li>' +
          '<li><strong>位置适性颜色（紫/金/彩）</strong>：角色该位置的适性等级；每次词条触发只 +1 级</li>' +
          '<li>两者<strong>没有必然对应</strong>：3★ 词条 ≠ 彩色适性</li>' +
          '<li>彩色适性 = 「获得新位置」+ 多次词条触发堆上去；金色可期、彩色看脸</li>' +
          '</ul></div></div>' +
          '<div class="small muted" style="margin-top:8px">配套笔记逻辑：想摇去某位置，就提前准备该位置角色的适性词条笔记（如希雅→大前用野上笔记；野上→小前/分卫则需对应位置角色笔记）。</div>' +
          '</div>'
        );
      }

      function recordProbCardHtml() {
        var rows = [
          ['希雅 9949（SS）', '彩 7%', '红 19%', '金 26%', '紫 48%', '保底紫'],
          ['大前 9358（S+）', '彩 6%', '红 19%', '金 26%', '紫 49%', '保底紫'],
          ['春澄 8206（S+）', '—', '红 17%', '金 23%', '紫 29%＋蓝 31%', '可能出蓝']
        ];
        return (
          '<div class="card card--pad" id="note-record-prob" style="margin-top:16px">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🎲</span>记录笔记 · 品质概率（记录笔等级 × 评分）</div>' +
          '<div class="card-sub">记录消耗记录笔×1；品质概率由「记录笔等级 + 角色评分」共同决定，评分越高高档概率微升。</div></div>' +
          '<span class="badge badge--ok">实测样本 2026-11-08</span></div>' +
          '<div class="table-wrap"><table class="table"><thead><tr><th>样本（评分/评级）</th><th>彩</th><th>红</th><th>金</th><th>紫/蓝</th><th>备注</th></tr></thead><tbody>' +
          rows.map(function (r) {
            return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td><td>' + esc(r[2]) + '</td><td>' + esc(r[3]) + '</td><td>' + esc(r[4]) + '</td><td>' + esc(r[5]) + '</td></tr>';
          }).join('') +
          '</tbody></table></div>' +
          '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">🔑</span><span>' +
          '<strong>记录笔等级门槛（配置 open_tips 确认）</strong>：Lv2 可记录金色 / Lv4 红色 / Lv6 彩色；' +
          '当前记录笔 Lv6 → 金+ 概率约 51%（9358 样本）。<br>' +
          '记录经验：每记录 1 次 +1，Lv6→7 需 150 经验（约 150 本申请书，申请书每日 20+）；分解笔记只给托管经验（满级后=垃圾桶）。' +
          '</span></div>' +
          '<div class="small muted" style="margin-top:6px">样本有限（同等级笔、3 个评分点）；配置侧仅能确认笔等级门槛与品质词条数，评分→概率的完整曲线仍属服务端。</div>' +
          '</div>'
        );
      }


      /* ---------------- 角色笔记推荐（主视图） ---------------- */
      function defaultDirForRole(role) {
        var r = String(role || '');
        if (r.indexOf('控卫') >= 0) return 'playmaking';
        if (r.indexOf('分卫') >= 0) return 'three';
        if (r.indexOf('小前') >= 0) return 'drive';
        if (r.indexOf('大前') >= 0) return 'drive';
        if (r.indexOf('中锋') >= 0) return 'rebound';
        return 'three';
      }
      function entriesForDir(dir) {
        return [DIR_ATTR[dir], DIR_ATTR[dir] + '上限'].concat((DIR_SKILLS[dir] || []).slice(0, 2));
      }
      function topCarriersFor(targetId) {
        var list = [];
        var info = matrixInfo();
        if (!info) return list;
        var ids = [];
        if (info.newMode) {
          newData.characters.forEach(function (mc) {
            if (!mc.released || mc.contentId == null) return;
            var cid = String(mc.contentId);
            if (cid === String(targetId) || !byId[cid]) return;
            ids.push(cid);
          });
        } else {
          chars.forEach(function (c) {
            var cid = String(c.contentId);
            if (cid !== String(targetId)) ids.push(cid);
          });
        }
        ids.forEach(function (cid) {
          var rel = relationBetween(targetId, cid);
          if (rel != null) list.push({ id: cid, character: byId[cid] || { name: cid }, score: rel.score, manual: rel.manual });
        });
        list.sort(function (a, b) { return b.score - a.score; });
        return list.slice(0, 2);
      }
      function notesTabsHtml() {
        var tabs = [
          { k: 'pair', t: '① 主养角色搭配' },
          { k: 'support', t: '② 配套笔记角色' },
          { k: 'craft', t: '③ 合成/修订规则 + 模拟' }
        ];
        return '<div class="row" id="notes-tabs" style="gap:6px;margin-bottom:12px;flex-wrap:wrap">' +
          tabs.map(function (x) {
            return '<button type="button" class="btn btn--sm' + (notesTab === x.k ? ' btn--primary' : ' btn--ghost') + '" data-notes-tab="' + x.k + '">' + esc(x.t) + '</button>';
          }).join('') +
          '</div>';
      }
      function charRecommendHtml() {
        var list = [];
        if (newData && Array.isArray(newData.characters)) {
          newData.characters.forEach(function (mc) {
            if (!mc.released || mc.contentId == null || !byId[String(mc.contentId)]) return;
            list.push({ id: String(mc.contentId), character: byId[String(mc.contentId)], meta: mc });
          });
        } else {
          chars.forEach(function (c) { list.push({ id: String(c.contentId), character: c, meta: null }); });
        }
        var fitOpts = [
          { v: 'all', t: '全部契合度' },
          { v: '20', t: '良及以上（合计≥20）' },
          { v: '30', t: '优及以上（合计≥30）' },
          { v: '45', t: '极（合计≥45）' }
        ].map(function (o) { return '<option value="' + esc(o.v) + '"' + (fitFilter === o.v ? ' selected' : '') + '>' + esc(o.t) + '</option>'; }).join('');
        var dirOpts = '<option value="all"' + (dirFilter === 'all' ? ' selected' : '') + '>方向：按角色默认</option>' +
          dirOrder.map(function (id) { return '<option value="' + esc(id) + '"' + (dirFilter === id ? ' selected' : '') + '>' + esc(dirLabel(id)) + '</option>'; }).join('');
        var cards = [];
        list.forEach(function (item) {
          var pair = topCarriersFor(item.id);
          var total = pair.reduce(function (s, x) { return s + x.score; }, 0);
          if (fitFilter !== 'all' && total < Number(fitFilter)) return;
          var dir = dirFilter === 'all' ? defaultDirForRole(item.character.role) : dirFilter;
          var entries = entriesForDir(dir);
          var carrierHtml = pair.length
            ? pair.map(function (x) {
                return '<span class="tag">' + esc(x.character.name) + ' · ' + esc(x.score) + '分 ' + tierBadge(x.score) + '</span>';
              }).join(' + ')
            : '<span class="muted small">契合度矩阵未覆盖</span>';
          var entriesHtml = entries.map(function (e) { return '<span class="tag tag--orange">' + esc(e) + '</span>'; }).join(' ');
          cards.push('<div class="card card--pad note-char-card" data-note-char="' + esc(item.id) + '" style="margin-bottom:8px">' +
            '<div class="card-head"><div><div class="card-title">' + esc(item.character.name) +
            (item.character.rarity ? ' <span class="badge badge--neutral">' + esc(item.character.rarity) + '</span>' : '') + '</div>' +
            '<div class="card-sub">' + esc(item.character.role || '—') + ' · 推荐方向 ' + esc(dirLabel(dir)) +
            (pair.length ? ' · 两本载体合计 ' + esc(total) + ' 分（' + esc(tierOf(total)) + '）' : '') + '</div></div>' +
            '<button type="button" class="btn btn--sm btn--ghost" data-note-goto="' + esc(item.id) + '">去笔记养成 →</button></div>' +
            '<div class="small" style="margin-top:6px"><strong>最适配载体：</strong>' + carrierHtml + '</div>' +
            '<div class="small" style="margin-top:4px"><strong>推荐词条：</strong>' + entriesHtml + '</div>' +
            '</div>');
        });
        return '<div class="card card--pad" id="note-char-filter"><div class="row" style="gap:10px;flex-wrap:wrap;align-items:end">' +
          '<div class="field"><label class="field-label" for="note-char-fit-filter"><span class="label-text">契合度筛选</span></label>' +
          '<select class="select" id="note-char-fit-filter">' + fitOpts + '</select></div>' +
          '<div class="field"><label class="field-label" for="note-char-dir-filter"><span class="label-text">方向筛选</span></label>' +
          '<select class="select" id="note-char-dir-filter">' + dirOpts + '</select></div>' +
          '<div class="small muted" style="padding-bottom:8px">按角色列出「最契合的两本笔记载体 + 推荐词条」；契合度=两本载体关系分合计（40 分=优）。</div>' +
          '</div></div>' +
          '<div id="note-char-list" style="margin-top:10px">' + (cards.length ? cards.join('') : '<div class="player-missing">没有符合筛选条件的角色。</div>') + '</div>';
      }
      function growSectionsHtml() {
        return '<div class="card card--pad" id="note-head">' + headHtml() + '</div>' +
          '<div class="team-sub-label" style="margin-top:14px">① 主养角色搭配（主练角色 → 两本载体 → 词条 → 契合度）</div>' +
          pairCardHtml() + entriesCardHtml() + carriersCardHtml() + suitabilityCardHtml() + calcCardHtml() +
          '<div class="team-sub-label" style="margin-top:14px">② 配套笔记角色（笔记视角：载体/狗粮/闭环）</div>' +
          supportPageHtml() + '<details style="margin-top:12px"><summary class="small" style="cursor:pointer">进阶参考（狗粮排名 / 闭环 / 循环）</summary>' + dogfoodRankCardHtml() + loopCardHtml() + cycleCardHtml() + '</details>' +
          '<div class="team-sub-label" style="margin-top:14px">③ 合成 / 修订规则 + 模拟</div>' +
          rulesCardHtml() + chainCardHtml() + qualityRefCardHtml() + craftCardHtml() +
          '<details style="margin-top:12px"><summary class="small" style="cursor:pointer">进阶参考数据（词条库 / 适配 / 概率 / 记录）</summary>' +
          entriesLibraryHtml() + adaptCardHtml() + recordProbCardHtml() + notesCardHtml() +
          '<div id="official-notes-widgets">' + (BBT.OfficialWidgets ? BBT.OfficialWidgets.notesCalcHtml() : '') + '</div></details>';
      }


      /* ---------------- 主养角色搭配：适性优先方案（推荐）+ 纯契合参考 ---------------- */
      function triggerTable() {
        return (newData && newData.calculation && newData.calculation.entry_trigger_count_by_compatibility) || [
          { required_compatibility_score: 0, min_triggered_entries: 2, max_triggered_entries: 4 },
          { required_compatibility_score: 40, min_triggered_entries: 5, max_triggered_entries: 10 },
          { required_compatibility_score: 1280, min_triggered_entries: 10, max_triggered_entries: 30 }
        ];
      }
      function bandOf(x) {
        var table = triggerTable();
        var found = table[0];
        for (var i = 0; i < table.length; i++) if (x >= table[i].required_compatibility_score) found = table[i];
        return found;
      }
      function qualityOptions() {
        var qs = (newData && newData.noteQualities) || [];
        return qs.filter(function (q) { return q.entry_count && q.entry_count[1] > 0; }).map(function (q) {
          return { name: q.quality_name, min: q.entry_count[0], max: q.entry_count[1], quality: q.quality };
        });
      }
      function pairHarmony() {
        var rec = recommendCarriers();
        var top = rec.list.slice(0, 2);
        return { list: top, h: top.reduce(function (s, x) { return s + (Number(x.score) || 0); }, 0) };
      }
      var FIT_STAR_BONUS = { '': 0, '*': 2, '**': 5, '***': 10 };
      function suitState() {
        if (!ui.noteSuitNotes || typeof ui.noteSuitNotes !== 'object') {
          ui.noteSuitNotes = {
            noteA: { hasSuit: true, total: 15 },
            noteB: { hasSuit: false, total: 15 },
            fitSlots: ['', '', '', '']
          };
        }
        if (!Array.isArray(ui.noteSuitNotes.fitSlots) || ui.noteSuitNotes.fitSlots.length !== 4) {
          var old = ui.noteSuitNotes;
          ui.noteSuitNotes.fitSlots = [
            old.noteA && old.noteA.fitStar ? old.noteA.fitStar : '',
            old.noteB && old.noteB.fitStar ? old.noteB.fitStar : '',
            '', ''
          ];
        }
        return ui.noteSuitNotes;
      }
      function starBonus(star) {
        var s = String(star || '');
        if (bonusMode === 'trigger') return s === '***' ? 10 : s === '**' ? 6 : s === '*' ? 3 : 0;
        return FIT_STAR_BONUS[s] || 0;
      }
      function suitPlan() {
        var main = targetCharacter();
        var pos = targetPosition || basePosition();
        if (!newData || !Array.isArray(newData.characters)) return null;
        var cand = [];
        newData.characters.forEach(function (mc) {
          if (!mc.released || mc.contentId == null || !byId[String(mc.contentId)]) return;
          var cid = String(mc.contentId);
          if (cid === String(stateId)) return;
          var rel = relationBetween(stateId, cid);
          if (!rel) return;
          cand.push({ id: cid, character: byId[cid], meta: mc, score: Number(rel.score) || 0, position: mc.position || positionOf(cid) });
        });
        var posCands = cand.filter(function (x) { return x.position === pos; }).sort(function (a, b) { return b.score - a.score; });
        var recA = posCands[0] || null;
        var manualA = null;
        if (ui.noteSuitCarrierA) {
          manualA = cand.filter(function (x) { return x.id === String(ui.noteSuitCarrierA); })[0] || null;
        }
        var a = manualA || recA;
        var rest = cand.filter(function (x) { return !a || x.id !== a.id; }).sort(function (x, y) { return y.score - x.score; });
        var recB = rest[0] || null;
        var manualB = null;
        if (ui.noteSuitCarrierB) {
          manualB = rest.filter(function (x) { return x.id === String(ui.noteSuitCarrierB); })[0] || null;
        }
        var b = manualB || recB;
        if (a && b && a.id === b.id) b = null;
        return {
          main: main, pos: pos, a: a, b: b,
          recA: recA, recB: recB,
          aManual: !!manualA && !!recA && manualA.id !== recA.id,
          bManual: !!manualB && !!recB && manualB.id !== recB.id,
          offPositionA: !!(a && a.position !== pos),
          h: (a ? a.score : 0) + (b ? b.score : 0),
          elite: cand.slice().sort(function (a, b) { return b.score - a.score; }).slice(0, 2),
          eliteH: cand.slice().sort(function (a, b) { return b.score - a.score; }).slice(0, 2).reduce(function (s, x) { return s + (Number(x.score) || 0); }, 0),
          candidates: cand, posCands: posCands
        };
      }
      function calcSuit() {
        var plan = suitPlan();
        if (!plan) return null;
        var st = suitState();
        var entries = Number(st.noteA.total || 0) + Number(st.noteB.total || 0);
        var bonus = (st.fitSlots || []).reduce(function (s, x) { return s + starBonus(x); }, 0);
        var h = plan.h + bonus;
        var x = h * entries;
        var band = bandOf(x);
        var reach = x >= 1280;
        var hNeed = entries > 0 ? Math.ceil(1280 / entries) : null;
        var hGap = hNeed != null ? Math.max(0, hNeed - h) : null;
        var needBonus = hGap != null ? hGap : 0;
        var fitOptions = [
          { label: '两本各 2★ 契合词条（+10）', bonus: 10 },
          { label: '一本 3★ + 一本 2★（+15）', bonus: 15 },
          { label: '两本各 3★（+20）', bonus: 20 },
          { label: '4 条 3★ 契合词条（+40）', bonus: 40 }
        ].map(function (o) {
          return { label: o.label, bonus: o.bonus, x: (plan.h + o.bonus) * entries, ok: (plan.h + o.bonus) * entries >= 1280 };
        });
        var colorTotal = 32; // 两本彩笔记最少 16+16 词条
        var colorNeedH = Math.ceil(1280 / colorTotal);
        var colorOk = plan.h >= colorNeedH;
        var colorWithMaxBonus = (plan.h + 20) * colorTotal >= 1280;
        return {
          plan: plan, entries: entries, baseH: plan.h, bonus: bonus, h: h, x: x, band: band, reach: reach,
          hNeed: hNeed, hGap: hGap, needBonus: needBonus, fitOptions: fitOptions, colorTotal: colorTotal,
          colorNeedH: colorNeedH, colorOk: colorOk, colorWithMaxBonus: colorWithMaxBonus
        };
      }
      function schemeCardsHtml() {
        var plan = suitPlan();
        if (!plan) return '<div class="notice notice--warn"><span class="notice-ico">🧩</span><span>契合度矩阵未覆盖该角色，暂时无法给出适性优先方案。</span></div>';
        var st = suitState();
        var res = calcSuit();
        var carrierA = plan.a
          ? '<strong>' + esc(plan.a.character.name) + '</strong>（' + esc(plan.a.position || '—') + ' · 契合 ' + esc(plan.a.score) + ' 分）'
          : '<span class="muted">该位置无可用角色</span>';
        var carrierB = plan.b
          ? '<strong>' + esc(plan.b.character.name) + '</strong>（' + esc(plan.b.position || '—') + ' · 契合 ' + esc(plan.b.score) + ' 分）'
          : '<span class="muted">无可用角色</span>';
        var carrierOpts = function (selected, excludeId) {
          var list = plan.candidates.filter(function (x) {
            if (excludeId && x.id === String(excludeId)) return false;
            return true;
          }).sort(function (x, y) {
            var px = x.position === plan.pos ? 1 : 0;
            var py = y.position === plan.pos ? 1 : 0;
            if (px !== py) return py - px;
            return y.score - x.score;
          });
          return '<option value="">自动推荐（最优）</option>' +
            list.map(function (x) {
              return '<option value="' + esc(x.id) + '"' + (String(selected && selected.id) === String(x.id) ? ' selected' : '') + '>' +
                esc(x.character.name) + '（' + esc(x.position || '—') + ' · 契合 ' + esc(x.score) + ' 分' + (x.position === plan.pos ? ' · 目标位置' : '') + '）</option>';
            }).join('');
        };
        var carrierSelectHtml = function (id, selected, excludeId) {
          return '<select class="select" id="' + id + '" style="max-width:360px;margin-left:6px">' + carrierOpts(selected, excludeId) + '</select>';
        };
        var resetCarrier = (plan.aManual || plan.bManual)
          ? '<button type="button" class="btn btn--sm" id="note-suit-carrier-reset" style="margin-left:8px">恢复推荐</button>'
          : '';
        var starSelect = function (id, val) {
          return '<select class="select" id="' + id + '" style="max-width:120px">' +
            [['', '无'], ['*', '1★ (+2)'], ['**', '2★ (+5)'], ['***', '3★ (+10)']].map(function (o) {
              return '<option value="' + esc(o[0]) + '"' + (String(val) === o[0] ? ' selected' : '') + '>' + esc(o[1]) + '</option>';
            }).join('') + '</select>';
        };
        var noteRow = function (key, title, who, hasSuitDefault, positionNote) {
          var note = st[key];
          return '<div class="card card--pad" style="margin-top:8px" data-suit-note="' + key + '">' +
            '<div class="card-head"><div><div class="card-title">' + esc(title) + '</div><div class="card-sub">' + esc(who) + '</div></div>' +
            '<span class="badge ' + (hasSuitDefault ? 'badge--ok' : 'badge--info') + '">' + (hasSuitDefault ? '适性笔记' : '纯契合度笔记') + '</span></div>' +
            '<div class="row" style="gap:10px;flex-wrap:wrap;margin-top:6px">' +
            '<label class="small"><input type="checkbox" id="note-suit-' + key + '-hassuit"' + (note.hasSuit ? ' checked' : '') + '> 带「目标位置适性词条」</label>' +
            '<label class="small">词条总数（可修改） <input class="input" id="note-suit-' + key + '-total" type="number" min="0" max="999" step="1" value="' + esc(note.total) + '" title="可修改" style="max-width:100px;border:1px solid #4a5a6a;border-radius:6px;background:rgba(255,255,255,.08);color:inherit;padding:4px 8px;font-size:14px"></label>' +
            '</div>' +
            '<div class="tiny muted" style="margin-top:4px">' + esc(positionNote) + '</div></div>';
        };
        var optionRows = res.fitOptions.map(function (o, i) {
          return '<div class="small" style="margin-top:2px">' + (o.ok ? '✅' : '·') + ' ' + esc(o.label) + ' → x=' + esc(o.x) + (o.ok ? '（可达 1280）' : '（仍差 ' + esc(1280 - o.x) + '）') + '</div>';
        }).join('');
        var firstOk = res.fitOptions.filter(function (o) { return o.ok; })[0];
        var advice = '';
        if (res.reach) {
          advice = '<div class="notice notice--ok"><span class="notice-ico">✅</span><span><strong>当前构成可达 1280 最高档（10~30 条/次）</strong>：适性词条触发概率更稳，可以直接去养。</span></div>';
        } else if (firstOk) {
          advice = '<div class="notice notice--info"><span class="notice-ico">👉</span><span><strong>优先方案：' + esc(firstOk.label) + '</strong>（+20 以内）即可把 x 拉到 1280；日常刷契合词条比刷彩笔记容易，建议先做这个。</span></div>';
        } else if (res.colorOk || res.colorWithMaxBonus) {
          advice = '<div class="notice notice--warn"><span class="notice-ico">🎨</span><span><strong>4 条 3★ 契合词条也不够 → 需要彩色笔记</strong>：两本彩（总词条 ' + esc(res.colorTotal) + '+）需 H ≥ ' + esc(res.colorNeedH) + '；当前 H=' + esc(res.h) + (res.h >= res.colorNeedH ? '（已够，换彩即可）' : '（还差 ' + esc(res.colorNeedH - res.h) + ' 契合分）') + '。彩笔记难刷，是最优先的长期目标。</span></div>';
        } else {
          advice = '<div class="notice notice--warn"><span class="notice-ico">⚠️</span><span><strong>当前配置几乎不可能达到最优解（1280）</strong>：即使 4 条 3★ 契合词条也差 ' + esc(1280 - (res.plan.h + 40) * res.entries) + '；建议优先刷<strong>彩色笔记</strong>提高词条总数，或换契合度更高的笔记角色。</span></div>';
        }
        return '<div id="note-suit-plan" style="margin-top:10px">' +
          '<div class="card card--pad">' +
          '<div class="card-head"><div><div class="card-title">适性优先方案（护肝 · 推荐）</div>' +
          '<div class="card-sub">笔记只决定「角色位置适性」：先保证目标位置适性，再谈契合度。默认目标位置=角色基础适性，可手动切换。<strong>护肝</strong>：只把 1 本笔记角色限定在目标位置（B 用其他位置最高契合），刷取难度低。</div></div>' +
          '<span class="badge badge--ok">护肝方案</span></div>' +
          '<div class="notice notice--info" style="margin-top:6px"><span class="notice-ico">🍵</span><span class="small">这是<strong>护肝方案</strong>：只把 1 本笔记角色限定在目标位置（A 天然带目标适性词条），B 用任意位置最高契合 → 容易刷。<strong>废肝方案</strong>不是全同位置，而是反过来：<strong>按契合度最高的两名角色来凑</strong>，但这两本笔记本身不带目标适性，需要先给这两个角色刷出目标位置的高等级适性、再分解出红色以上笔记来合成（概率更低、更费肝）；优势是 H 更高，几乎不用刷契合词条。</span></div>' +
          '<div class="small" style="margin-top:6px"><strong>目标：</strong>' + esc(plan.main.name) + ' · 位置适性 <strong>' + esc(plan.pos) + '</strong></div>' +
          '<div class="small" style="margin-top:6px"><strong>A · 适性笔记角色：</strong>' + carrierSelectHtml('note-suit-carrier-a', plan.a, null) + resetCarrier + '</div>' +
          '<div class="small" style="margin-top:4px"><strong>B · 纯契合度笔记角色：</strong>' + carrierSelectHtml('note-suit-carrier-b', plan.b, plan.a && plan.a.id) + '</div>' +
          (plan.aManual || plan.bManual ? '<div class="tiny muted" style="margin-top:2px">已手动选择笔记角色；下方 H / x / 1280 已按你的选择实时重算。想回到最优方案点「恢复推荐」。</div>' : '<div class="tiny muted" style="margin-top:2px">默认给的是推荐组合；你也可以按自己已有的笔记，手动挑 A/B 角色，下面会实时重算。</div>') +
          (plan.offPositionA ? '<div class="notice notice--warn" style="margin-top:6px"><span class="notice-ico">⚠️</span><span class="small">你选的 A 角色不在目标位置「' + esc(plan.pos) + '」：这本笔记不会天然带目标位置适性词条，<strong>需要额外给这个角色刷目标位置适性</strong>（更费肝），否则适性无法 +1 级。</span></div>' : '') +
          '<div class="notice notice--warn" style="margin-top:6px"><span class="notice-ico">🎲</span><span class="small"><strong>适性词条随机抽取：</strong>即使 A 是目标位置角色，只要它还拥有其他位置适性，记录红以上笔记时也可能随机抽到别的位置（实测：千圣 金中锋+白大前 → 红笔记出了大前适性）。想稳出目标位置适性，笔记角色最好<strong>只有目标位置这一种适性</strong>，养成时不要喂出新位置。</span></div>' +
          '<div class="small" style="margin-top:4px">基础契合 H = ' + esc(plan.h) + '（两本关系分之和）' + (plan.aManual || plan.bManual ? ' · <span style="color:#fbbf24">手动组合</span>' : ' · 推荐组合') + '</div>' +
          noteRow('noteA', '笔记 A · 适性笔记', plan.a ? plan.a.character.name : '—', true, '需要带目标位置「' + plan.pos + '」适性词条；注意适性词条是随机抽取（见上方提醒）。') +
          noteRow('noteB', '笔记 B · 纯契合度笔记', plan.b ? plan.b.character.name : '—', false, '主要用来补契合度与词条数；是否带适性词条可选。') +
          '<div class="card card--pad" style="margin-top:8px" id="note-suit-fit-slots"><div class="card-head"><div><div class="card-title">契合度词条（最多 4 个）</div>' +
          '<div class="card-sub">理论上可能出现 4 个同一个人的契合度词条（一般不会出现）；每个词条单独选星级：1★+2 / 2★+5 / 3★+10。</div></div></div>' +
          '<div class="row" style="gap:10px;flex-wrap:wrap;margin-top:6px">' +
          [0, 1, 2, 3].map(function (i) {
            return '<label class="small" data-suit-fit-slot="' + i + '">契合词条 ' + (i + 1) + '：' +
              starSelect('note-suit-fit-slot-' + i, (st.fitSlots || [])[i] || '') + '</label>';
          }).join('') +
          '</div></div>' +
          '<div class="card card--pad" id="note-suit-result" style="margin-top:10px">' +
          '<div class="card-head"><div><div class="card-title">计算 / 培养路径</div>' +
          '<div class="card-sub">x =（两本契合和 H + 契合词条加成）×（两本词条总数）；1280=最高档（10~30 条/次）。</div></div>' +
          '<span class="badge ' + (res.reach ? 'badge--ok' : 'badge--warn') + '">' + (res.reach ? '可达 1280' : '当前未达 1280') + '</span></div>' +
          '<div class="small" style="margin-top:6px">H 合计 = ' + esc(res.h) + '（基础 ' + esc(res.baseH) + ' + 契合词条 ' + esc(res.bonus) + '） · 总词条数 = ' + esc(res.entries) + '</div>' +
          '<div class="small" style="margin-top:2px">x = ' + esc(res.h) + ' × ' + esc(res.entries) + ' = <strong>' + esc(res.x) + '</strong> → 触发档位 ' + esc(res.band.min_triggered_entries) + '~' + esc(res.band.max_triggered_entries) + ' 条/次' +
          (res.reach ? '' : '；到 1280 需 H 总 ≥ ' + esc(res.hNeed) + '（当前还差 ' + esc(res.hGap) + ' 分）') + '</div>' +
          '<details style="margin-top:6px" open><summary class="small" style="cursor:pointer">契合词条升级路径（优先）</summary>' + optionRows + '</details>' +
          '<div class="small muted" style="margin-top:4px">换彩笔记参考：两本彩总词条 ' + esc(res.colorTotal) + '+，达 1280 需 H ≥ ' + esc(res.colorNeedH) + '（当前 H=' + esc(res.h) + '）。</div>' +
          advice + '</div>' +
          '<details style="margin-top:10px" id="note-elite-plan"><summary class="small" style="cursor:pointer">废肝方案（按契合度最高的两名角色凑，但需要给它们刷目标适性）</summary>' +
          (function () {
            var elite = plan.elite || [];
            var eliteH = plan.eliteH || 0;
            var eliteX = (eliteH + res.bonus) * res.entries;
            var eband = bandOf(eliteX);
            var eliteNames = elite.length
              ? elite.map(function (x) { return esc(x.character.name) + '（' + esc(x.position || '—') + ' · ' + esc(x.score) + ' 分）'; }).join(' + ')
              : '<span class="muted">契合度数据不足</span>';
            return '<div class="small" style="margin-top:6px">两本：' + eliteNames + ' → H = ' + esc(eliteH) + '；x =（H + 契合加成 ' + esc(res.bonus) + '）× ' + esc(res.entries) + ' = <strong>' + esc(eliteX) + '</strong> → ' + esc(eband.min_triggered_entries) + '~' + esc(eband.max_triggered_entries) + ' 条/次' + (eliteX >= 1280 ? '（✅ 可达 1280）' : '（仍差 ' + esc(1280 - eliteX) + '）') + '</div>' +
              '<div class="tiny muted" style="margin-top:4px">废肝：这两本原本不在目标位置 → 需要先刷出目标位置适性、再分解出红+笔记合成（比直接用位置内角色难刷，概率更低）；但 H 通常更高，几乎不用额外刷契合词条。</div>';
          })() +
          '</details>' +
          '<div class="tiny muted" style="margin-top:8px">说明：纯契合度方案只在「已有适性词条」前提下有意义；不追极/8 条上限，x 进高档即可。</div>' +
          '</div></div>';
      }


      /* ---------------- ② 配套笔记角色（狗粮角色配置） ---------------- */
      function supportState() {
        if (!ui.noteSupport || typeof ui.noteSupport !== 'object') {
          ui.noteSupport = { targetId: stateId, fodderId: null, dir: 'none', noteBId: null };
        }
        if (!ui.noteSupport.targetId || !byId[String(ui.noteSupport.targetId)]) ui.noteSupport.targetId = stateId;
        if (ui.noteSupport.noteBId == null) ui.noteSupport.noteBId = '';
        return ui.noteSupport;
      }
      function relationScoreBetween(fromId, toId) {
        var rel = relationBetween(fromId, toId);
        return rel ? Number(rel.score) || 0 : null;
      }
      function supportRoles() {
        var sp = supportState();
        var target = byId[String(sp.targetId)] || targetCharacter();
        var released = [];
        if (newData && Array.isArray(newData.characters)) {
          newData.characters.forEach(function (mc) {
            if (!mc.released || mc.contentId == null || !byId[String(mc.contentId)]) return;
            var cid = String(mc.contentId);
            if (cid === String(target.contentId)) return;
            var rel = relationScoreBetween(String(target.contentId), cid);
            released.push({ id: cid, character: byId[cid], score: rel, meta: mc });
          });
        } else {
          chars.forEach(function (c) {
            if (String(c.contentId) === String(target.contentId)) return;
            released.push({ id: String(c.contentId), character: c, score: relationScoreBetween(String(target.contentId), String(c.contentId)), meta: null });
          });
        }
        released.sort(function (a, b) { return (b.score || 0) - (a.score || 0); });
        var fodder = null;
        if (sp.fodderId && byId[String(sp.fodderId)] && String(sp.fodderId) !== String(target.contentId)) fodder = byId[String(sp.fodderId)];
        if (!fodder) fodder = released.length ? released[0].character : target;
        // 与狗粮主人契合最高的笔记角色（用于笔记 B）；同时允许手动改选
        var fodderFit = [];
        if (newData && Array.isArray(newData.characters)) {
          newData.characters.forEach(function (mc) {
            if (!mc.released || mc.contentId == null || !byId[String(mc.contentId)]) return;
            var cid = String(mc.contentId);
            if (cid === String(fodder.contentId) || cid === String(target.contentId)) return;
            var rel = relationScoreBetween(String(fodder.contentId), cid);
            fodderFit.push({ id: cid, character: byId[cid], score: rel });
          });
        }
        fodderFit.sort(function (a, b) { return (b.score || 0) - (a.score || 0); });
        var noteBRec = fodderFit[0] || null;
        var manualB = null;
        if (sp.noteBId) {
          manualB = fodderFit.filter(function (x) { return x.id === String(sp.noteBId); })[0] || null;
        }
        var noteB = manualB || noteBRec;
        var needDir = sp.dir && sp.dir !== 'none' ? sp.dir : defaultDirForRole(target.role);
        var skills = DIR_SKILLS[needDir] || [];
        var targetSkills = (target.skills || []).map(function (s) { return s.name; }).filter(Boolean).slice(0, 6);
        var equipMatches = [];
        var EM = (typeof root !== 'undefined' && root.BBEquipSkillMap) || null;
        if (EM && skills.length) {
          (EM.equipment || []).forEach(function (e) {
            var hit = (e.skills || []).filter(function (s) {
              var txt = String(s.skillName || '') + ' ' + String(s.descShort || '') + ' ' + String(s.desc || '');
              return skills.some(function (k) { return txt.indexOf(k) >= 0; });
            });
            if (hit.length) equipMatches.push({ name: e.name, skills: hit.map(function (x) { return x.skillName; }), count: hit.length, obtainabilityShort: e.obtainabilityShort || '' });
          });
          equipMatches.sort(function (a, b) { return b.count - a.count; });
        }
        return { sp: sp, target: target, fodder: fodder, released: released, fitForFodder: fodderFit, noteB: noteB, noteBRec: noteBRec, noteBManual: !!manualB && !!noteBRec && manualB.id !== noteBRec.id, needDir: needDir, skills: skills, targetSkills: targetSkills, equipMatches: equipMatches.slice(0, 5) };
      }
      function supportPageHtml() {
        var r = supportRoles();
        var sp = r.sp;
        var targetOpts = chars.map(function (c) { return '<option value="' + esc(c.contentId) + '"' + (String(c.contentId) === String(r.target.contentId) ? ' selected' : '') + '>' + esc(c.name) + '（' + esc(c.role || '—') + '）</option>'; }).join('');
        var fodderOpts = r.released.map(function (x) { return '<option value="' + esc(x.id) + '"' + (String(x.id) === String(r.fodder.contentId) ? ' selected' : '') + '>' + esc(x.character.name) + '（' + esc(x.character.role || '—') + '）</option>'; }).join('');
        var dirOpts = '<option value="none"' + (sp.dir === 'none' ? ' selected' : '') + '>无适性（不要求位置适性，只做契合度笔记）</option>' +
          dirOrder.map(function (id) { return '<option value="' + esc(id) + '"' + (sp.dir === id ? ' selected' : '') + '>' + esc(dirLabel(id)) + '</option>'; }).join('');
        var noteB = r.noteB
          ? '<strong>' + esc(r.noteB.character.name) + '</strong>（与狗粮契合 ' + esc(r.noteB.score) + ' 分' + (r.noteBManual ? ' · 手动选择' : ' · 推荐') + '）'
          : '<span class="muted">契合度数据不足</span>';
        var noteBSelect = '<select class="select" id="support-note-b-sel" style="max-width:360px;margin-left:6px">' +
          '<option value="">自动推荐（' + (r.noteBRec ? esc(r.noteBRec.character.name) : '—') + '）</option>' +
          r.fitForFodder.map(function (x) {
            return '<option value="' + esc(x.id) + '"' + (String(r.sp.noteBId || '') === String(x.id) ? ' selected' : '') + '>' +
              esc(x.character.name) + '（与狗粮契合 ' + (x.score == null ? '—' : esc(x.score)) + ' 分）</option>';
          }).join('') + '</select>';
        var equipHtml = '';
        var targetPoolTxt = r.targetSkills && r.targetSkills.length
          ? '<div class="small muted" style="margin-top:4px">目标主练技能池参考：' + esc(r.targetSkills.join('、')) + '</div>'
          : '';
        if (r.equipMatches.length) {
          equipHtml = r.equipMatches.map(function (e) {
            return '<div class="small">· <strong>' + esc(e.name) + '</strong>' +
              (e.obtainabilityShort ? ' <span class="tiny muted">（' + esc(e.obtainabilityShort) + '）</span>' : '') +
              ' → ' + esc(e.skills.join('、')) + '</div>';
          }).join('');
        } else {
          equipHtml = '<div class="small muted">器材库未匹配到「' + esc(dirLabel(r.needDir)) + '」技能；请按这些技能方向挑器材：' + esc(r.skills.join('、')) + '</div>';
        }
        equipHtml += targetPoolTxt;
        var suitLine = sp.dir === 'none'
          ? '当前选择：<strong>无适性</strong>（不要求中锋/小前等位置适性，只用于做契合度笔记）；器材仍按目标主练技能池来配。'
          : '当前选择：<strong>' + esc(dirLabel(sp.dir)) + '</strong>（目标适性/技能偏向该方向）';
        return '<div id="support-panel">' +
          '<div class="card card--pad"><div class="card-head"><div><div class="card-title">② 配套笔记角色（狗粮角色配置）</div>' +
          '<div class="card-sub">本页是为「目标主练角色」专门刷配套笔记而存在的狗粮角色配置页：练完只分解本页的狗粮角色，得到给目标角色用的笔记/养成素材。</div></div>' +
          '<span class="badge badge--ok">给主练角色刷笔记</span></div>' +
          '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">🎯</span><span class="small">' +
          '<strong>为什么有这个页面：</strong>第一个页签解决「主练角色自己带哪两本笔记」；本页解决「为了给主练角色产出配套笔记，应该怎么养一个狗粮角色」。<br>' +
          '<strong>训练配置逻辑：</strong>① 狗粮必须携带<strong>目标主练角色的笔记</strong>（提供目标角色的契合度词条来源）；② 另一本携带<strong>与狗粮主人契合度最高</strong>的笔记（抬高整体契合/词条数 → 触发词条更多、属性给得更多）；③ 器材按<strong>目标角色需要的技能方向</strong>来带，让狗粮学会对应技能，分解时技能池偏向需求；④ 训练结束<strong>只分解狗粮角色</strong>（其余 4 名陪练分解出来的不适配长期方案，不要分解）。</span></div>' +
          '<div class="grid grid--3" style="gap:12px;margin-top:12px">' +
          '<div class="field"><label class="field-label" for="support-target"><span class="label-text">目标主练角色（要练谁）</span></label><select class="select" id="support-target">' + targetOpts + '</select></div>' +
          '<div class="field"><label class="field-label" for="support-fodder"><span class="label-text">狗粮主人（本页养成角色）</span></label><select class="select" id="support-fodder">' + fodderOpts + '</select></div>' +
          '<div class="field"><label class="field-label" for="support-dir"><span class="label-text">目标适性（无适性=不要求位置，纯契合度笔记）</span></label><select class="select" id="support-dir">' + dirOpts + '</select></div>' +
          '</div>' +
          '<div class="small" style="margin-top:8px">' + suitLine + '</div>' +
          (sp.dir !== 'none' ? '<div class="notice notice--warn" style="margin-top:6px"><span class="notice-ico">🎲</span><span class="small"><strong>注意（2026-11-10 实测）：</strong>记录红以上笔记时，适性词条从狗粮角色拥有的<strong>全部位置适性</strong>中随机抽，不是固定取最高等级。例：千圣 金中锋+白大前 → 红笔记记录出大前而非中锋。<br>所以：<strong>训练这个狗粮时避免让它获得「' + esc(dirLabel(sp.dir)) + '」以外的新位置</strong>，否则可能随机抽到不想要的适性词条。</span></div>' : '') +
          '</div>' +
          '<div class="card card--pad" id="support-notes" style="margin-top:10px"><div class="card-head"><div><div class="card-title">狗粮携带的两本笔记</div>' +
          '<div class="card-sub">第一本固定是目标主练角色的笔记；第二本是狗粮契合度最高的笔记。</div></div></div>' +
          '<div class="small" style="margin-top:6px"><strong>笔记 A（必须）· 目标角色笔记：</strong><span id="support-note-a">' + esc(r.target.name) + '</span> — 提供目标角色契合度词条来源。</div>' +
          '<div class="small" style="margin-top:4px"><strong>笔记 B · 高契合笔记：</strong>' + noteBSelect + ' <span id="support-note-b">' + noteB + '</span></div>' +
          '<div class="tiny muted" style="margin-top:2px">推荐只是默认最优；你可以按自己现有的笔记手动改选，右侧会显示当前与狗粮的契合分。</div>' +
          '</div>' +
          '<div class="card card--pad" id="support-equip" style="margin-top:10px"><div class="card-head"><div><div class="card-title">器材建议（按目标需要的技能教狗粮）</div>' +
          '<div class="card-sub">不是按狗粮自身需求，而是按<strong>目标主练角色的技能池</strong>选器材（无适性也一样）；分解时技能池才会偏向目标需求。</div></div></div>' +
          '<div style="margin-top:6px">' + equipHtml + '</div></div>' +
          '<div class="card card--pad" style="margin-top:10px"><div class="card-head"><div><div class="card-title">训练结束后的操作</div></div></div>' +
          '<div class="notice notice--warn" style="margin-top:6px"><span class="notice-ico">⚠️</span><span class="small"><strong>只分解狗粮主人这一个角色</strong>。<br>其余 4 名陪练虽然也能分解，但分解产物不适配长期养成方案，早晚要丢掉，别浪费记录/分解资源。</span></div></div>' +
          '</div>';
      }


      /* ---------------- ③ 记录 vs 合成：词条产出规则（2026-11-10 确认） ---------------- */
      function recordDropRulesHtml() {
        var rows = [
          { q: '紫色笔记', d: '有概率在初次记录时析出「契合度词条」' },
          { q: '金色笔记', d: '有概率在初次记录时析出「东都大会」专属词条（经理的超能力）——增分项，可大幅加属性，但与我们的配队需求无关' },
          { q: '红色及以上', d: '初次记录时会析出「适性词条」（从角色拥有的位置适性中随机抽）以及「技能词条」' }
        ].map(function (r) {
          return '<tr><td><strong>' + esc(r.q) + '</strong></td><td class="small">' + esc(r.d) + '</td></tr>';
        }).join('');
        return '<div class="card card--pad" id="note-drop-rules">' +
          '<div class="card-head"><div><div class="card-title">🧬 记录 vs 合成：词条产出规则</div>' +
          '<div class="card-sub">哪些词条只在「初次记录」析出、哪些合成/修订做不出来但可以保留。</div></div>' +
          '<span class="badge badge--ok">2026-11-10 用户确认</span></div>' +
          '<div class="table-wrap" style="margin-top:8px"><table class="table" style="min-width:560px"><thead><tr><th>笔记品质</th><th>初次记录时可能析出的特殊词条</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
          '<div class="notice notice--warn" style="margin-top:8px"><span class="notice-ico">⚠️</span><span>' +
          '<strong>关键限制：</strong>上述特殊词条（契合度 / 东都大会 / 适性 / 技能）都是「<strong>初次记录</strong>」时才可能析出的；' +
          '<strong>合成/修订本身做不出、也析不出</strong>这些词条。不过，<strong>合成/修订可以保留已有词条</strong>（素材里已经带的词条按保留规则留下）。' +
          '</span></div>' +
          '<div class="notice notice--warn" style="margin-top:8px"><span class="notice-ico">🎲</span><span class="small"><strong>适性词条是随机抽的（2026-11-10 实测）：</strong>红以上笔记记录时，适性词条从角色拥有的<strong>全部位置适性</strong>里随机抽一个，<strong>不是固定取等级最高的那个</strong>。实测：千圣训练结果=金色中锋 + 白色大前（副产物位置），记录成红笔记却出了<strong>大前适性</strong>而非中锋适性。<br>影响：想给某位置做适性笔记，狗粮角色<strong>不要获得目标位置以外的新位置</strong>；否则记录时可能随机抽到不想要的位置。</span></div>' +
          '<div class="small muted" style="margin-top:6px">所以：想要适性词条/技能词条/契合度词条，必须在「初次记录」阶段就刷出来；合成/修订只能用来保留、升星、提品质，不能凭空生成。</div>' +
          '</div>';
      }
      function craftRulesHtml() {
        return '<div class="card card--pad" id="note-craft-rules2">' +
          '<div class="card-head"><div><div class="card-title">🔧 合成 / 修订规则（旧规则 + 2026-11-11 反例）</div></div></div>' +
          '<ul class="note-rules">' +
          '<li><strong>合成 = 3 本</strong>；<strong>修订 = 2 本</strong>。</li>' +
          '<li>词条保留（旧口径·待复核）：参与的所有笔记都含同一词条 → 必保留；星级全同 → 升星（1★×3→2★）；星级混杂 → 随机取（大概率低星）。</li>' +
          '<li style="color:#fbbf24"><strong>2026-11-11 反例：</strong>三本希雅紫笔记（带「野上 + 白神」契合）合成出金笔记，结果只剩 <strong>2 条 1★ 白神契合</strong>，野上消失、星级下降 → <strong>合成词条/星级可能比旧口径更随机</strong>，不要把「共有词条必保留」当成稳保；重要词条别只靠合成保留。</li>' +
          '<li>适性词条修订：两本必须都有相同适性才保留，否则大概率消失。</li>' +
          '<li>合成最高出红色；<strong>彩色只能走修订</strong>（红+红、彩+彩）。</li>' +
          '<li>合成产物不带适性词条（适性仅「初次记录」红色以上才可能出）。</li>' +
          '<li>记录笔等级门槛：Lv2 可记录金色 / Lv4 红 / Lv6 彩。</li>' +
          '</ul>' +
          '<div class="tiny muted" style="margin-top:4px">规则来源：knowledge/笔记系统_规则与养成链.md §18-19 + 用户实测；保留/升星为服务端规则，客户端仅展示对比。</div>' +
          '</div>';
      }
      function renderAll() {
        el.innerHTML =
          '<div class="card card--pad" id="note-page-head">' +
          '<div class="spread" style="gap:10px;align-items:flex-start;flex-wrap:wrap"><div>' +
          '<div class="card-title"><span class="ico">📔</span>笔记养成 · 主养角色搭配</div>' +
          '<div class="card-sub">先选主养角色 → 算「适性优先（护肝）」方案；下方可展开「废肝方案」对比（契合度最高两人 vs 目标位置）。</div></div>' +
          '<div class="row" style="gap:6px;flex-wrap:wrap">' +
          (newData ? '<span class="badge badge--ok">hoopgirls.live v8</span><span class="badge badge--info">48×48 关系分</span>' : '<span class="badge badge--warn">契合度矩阵已数字化部分</span>') +
          '</div></div></div>' +
          notesTabsHtml() +
          '<div data-notes-panel="pair"' + (notesTab === 'pair' ? '' : ' hidden') + '>' +
          '<div class="card card--pad" id="note-head">' + headHtml() + '</div>' + schemeCardsHtml() +
          '<details style="margin-top:12px"><summary class="small" style="cursor:pointer">主养角色详细工具（载体/词条/契合度计算器）</summary>' +
          pairCardHtml() + entriesCardHtml() + carriersCardHtml() + suitabilityCardHtml() + calcCardHtml() + '</details>' +
          '<details style="margin-top:12px"><summary class="small" style="cursor:pointer">全部角色最适配笔记（浏览）</summary>' + charRecommendHtml() + '</details>' +
          '</div>' +
          '<div data-notes-panel="support"' + (notesTab === 'support' ? '' : ' hidden') + '>' +
          supportPageHtml() + '<details style="margin-top:12px"><summary class="small" style="cursor:pointer">进阶参考（狗粮排名 / 闭环 / 循环）</summary>' + dogfoodRankCardHtml() + loopCardHtml() + cycleCardHtml() + '</details>' +
          '</div>' +
          '<div data-notes-panel="craft"' + (notesTab === 'craft' ? '' : ' hidden') + '>' +
          recordDropRulesHtml() + craftRulesHtml() +
          '<details style="margin-top:12px"><summary class="small" style="cursor:pointer">详细规则 / 品质参考 / 原有规则卡</summary>' +
          rulesCardHtml() + qualityRefCardHtml() + craftCardHtml() + '</details>' +
          '<details style="margin-top:12px"><summary class="small" style="cursor:pointer">模拟（可选，非必要：养成链消耗估算）</summary>' + chainCardHtml() + '</details>' +
          '<details style="margin-top:12px"><summary class="small" style="cursor:pointer">进阶参考数据（词条库 / 适配 / 概率 / 记录）</summary>' +
          entriesLibraryHtml() + adaptCardHtml() + recordProbCardHtml() + notesCardHtml() +
          '<div id="official-notes-widgets">' + (BBT.OfficialWidgets ? BBT.OfficialWidgets.notesCalcHtml() : '') + '</div></details>' +
          '</div>';
        bindDynamic();
        if (BBT.OfficialWidgets) BBT.OfficialWidgets.mountNotes(el, ctx, { mainId: stateId });
      }

      function selectTarget(id) {
        stateId = String(id);
        ui.selectedNoteTarget = stateId;
        ui.noteSuitCarrierA = null;
        ui.noteSuitCarrierB = null;
        if (ctx.save) ctx.save();
        ensureDraft();
        chainEntry = entryDraft[0] ? entryDraft[0].name : '';
        renderAll();
      }

      function bindDynamic() {
        el.querySelectorAll('[data-notes-tab]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var k = btn.getAttribute('data-notes-tab');
            notesTab = ['pair', 'support', 'craft'].indexOf(k) >= 0 ? k : 'pair';
            ui.notesTab = notesTab;
            if (ctx.save) ctx.save();
            renderAll();
          });
        });
        var fitSel = dom.qs('#note-char-fit-filter', el);
        if (fitSel) {
          fitSel.addEventListener('change', function () {
            fitFilter = fitSel.value || 'all'; ui.noteFitFilter = fitFilter;
            if (ctx.save) ctx.save();
            renderAll();
          });
        }
        var dirSel = dom.qs('#note-char-dir-filter', el);
        if (dirSel) {
          dirSel.addEventListener('change', function () {
            dirFilter = dirSel.value || 'all'; ui.noteDirFilter = dirFilter;
            if (ctx.save) ctx.save();
            renderAll();
          });
        }
        el.querySelectorAll('[data-note-goto]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            stateId = btn.getAttribute('data-note-goto');
            ui.selectedNoteTarget = stateId;
            notesTab = 'grow'; ui.notesTab = 'grow';
            ensureDraft();
            chainEntry = entryDraft[0] ? entryDraft[0].name : '';
            if (ctx.save) ctx.save();
            renderAll();
          });
        });
        var suitStateObj = suitState();
        ['noteA', 'noteB'].forEach(function (key) {
          var total = dom.qs('#note-suit-' + key + '-total', el);
          if (total) total.addEventListener('change', function () {
            suitStateObj[key].total = Number(total.value) || 0; ui.noteSuitNotes = suitStateObj; if (ctx.save) ctx.save(); renderAll();
          });
          var hasSuit = dom.qs('#note-suit-' + key + '-hassuit', el);
          if (hasSuit) hasSuit.addEventListener('change', function () {
            suitStateObj[key].hasSuit = !!hasSuit.checked; ui.noteSuitNotes = suitStateObj; if (ctx.save) ctx.save(); renderAll();
          });
        });
        [0, 1, 2, 3].forEach(function (i) {
          var slot = dom.qs('#note-suit-fit-slot-' + i, el);
          if (slot) slot.addEventListener('change', function () {
            suitStateObj.fitSlots[i] = slot.value; ui.noteSuitNotes = suitStateObj; if (ctx.save) ctx.save(); renderAll();
          });
        });
        var carrierA = dom.qs('#note-suit-carrier-a', el);
        if (carrierA) carrierA.addEventListener('change', function () {
          ui.noteSuitCarrierA = carrierA.value || null;
          if (ui.noteSuitCarrierB && ui.noteSuitCarrierB === ui.noteSuitCarrierA) ui.noteSuitCarrierB = null;
          if (ctx.save) ctx.save();
          renderAll();
        });
        var carrierB = dom.qs('#note-suit-carrier-b', el);
        if (carrierB) carrierB.addEventListener('change', function () {
          ui.noteSuitCarrierB = carrierB.value || null;
          if (ctx.save) ctx.save();
          renderAll();
        });
        var carrierReset = dom.qs('#note-suit-carrier-reset', el);
        if (carrierReset) carrierReset.addEventListener('click', function () {
          ui.noteSuitCarrierA = null;
          ui.noteSuitCarrierB = null;
          if (ctx.save) ctx.save();
          renderAll();
        });
        var supportBind = {
          '#support-target': 'targetId',
          '#support-fodder': 'fodderId',
          '#support-dir': 'dir',
          '#support-note-b-sel': 'noteBId'
        };
        Object.keys(supportBind).forEach(function (sel) {
          var node = dom.qs(sel, el);
          if (!node) return;
          node.addEventListener('change', function () {
            var sp = supportState();
            sp[supportBind[sel]] = node.value;
            ui.noteSupport = sp;
            if (ctx.save) ctx.save();
            renderAll();
          });
        });
        var target = dom.qs('#note-target', el);
        if (target) target.addEventListener('change', function () { selectTarget(target.value); });
        var dir = dom.qs('#note-direction', el);
        if (dir) {
          dir.addEventListener('change', function () {
            stateDir = dir.value;
            ui.selectedNoteDirection = stateDir;
            if (ctx.save) ctx.save();
            entryDraft = recommendEntries();
            renderAll();
          });
        }
        var posSel = dom.qs('#note-position', el);
        if (posSel) {
          posSel.addEventListener('change', function () {
            targetPosition = posSel.value || null;
            ui.noteTargetPosition = targetPosition;
            if (ctx.save) ctx.save();
            renderAll();
          });
        }
        // 配对推荐控制
        var pairMode = dom.qs('#pair-bonus-mode', el);
        if (pairMode) {
          pairMode.addEventListener('change', function () {
            bonusMode = pairMode.value;
            ui.noteBonusMode = bonusMode;
            if (ctx.save) ctx.save();
            renderAll();
          });
        }
        ['pair-fit-1', 'pair-fit-2'].forEach(function (id) {
          var node = dom.qs('#' + id, el);
          if (!node) return;
          node.addEventListener('change', function () {
            if (id === 'pair-fit-1') ui.noteFitStar1 = node.value;
            else ui.noteFitStar2 = node.value;
            if (ctx.save) ctx.save();
            renderAll();
          });
        });
        el.querySelectorAll('[data-pair-apply]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var kind = btn.getAttribute('data-pair-apply');
            if (kind === 'dogfood') {
              var dog = dogfoodPlan();
              if (!dog) return;
              dogfoodCarrierId = String(dog.info.contentId);
              ui.noteDogfoodCarrier = dogfoodCarrierId;
              carrierDraft = [dogfoodCarrierId, dog.other ? String(dog.other.contentId) : null];
              if (ctx.save) ctx.save();
              renderAll();
              if (ctx.toast) ctx.toast('已应用狗粮配养方案（O 笔记 + 第二词条对象）', 'ok');
              return;
            }
            var plan = kind === 'pure' ? purePairPlan() : positionPairPlan();
            if (!plan || plan.empty || !plan.c1) return;
            carrierDraft = [plan.c1 ? String(plan.c1.character.contentId) : null,
              plan.c2 ? String(plan.c2.character.contentId) : null];
            renderAll();
            if (ctx.toast) ctx.toast('已应用' + (kind === 'pure' ? '纯契合' : '指定位置') + '方案为当前载体', 'ok');
          });
        });
        var loopSel = dom.qs('#loop-triple', el);
        if (loopSel) {
          loopSel.addEventListener('change', function () {
            loopIndex = Number(loopSel.value) || 0;
            ui.noteLoopIndex = loopIndex;
            if (ctx.save) ctx.save();
            renderAll();
          });
        }
        var cycleRoleSel = dom.qs('#cycle-role', el);
        if (cycleRoleSel) {
          cycleRoleSel.addEventListener('change', function () {
            cycleRoleId = cycleRoleSel.value || null;
            ui.noteCycleRole = cycleRoleId;
            if (ctx.save) ctx.save();
            renderAll();
          });
        }
        var cycleSizeSel = dom.qs('#cycle-size', el);
        if (cycleSizeSel) {
          cycleSizeSel.addEventListener('change', function () {
            cycleSize = Number(cycleSizeSel.value) || null;
            ui.noteCycleSize = cycleSize;
            if (ctx.save) ctx.save();
            renderAll();
          });
        }
        var cycleSave = dom.qs('#cycle-save', el);
        if (cycleSave) {
          cycleSave.addEventListener('click', function () {
            if (!store) return;
            var entry = cycleEntryFor(cycleRoleId || stateId);
            if (!entry) return;
            var size = cycleSize && entry.bySize[String(cycleSize)] ? cycleSize : entry.bestCycleSize;
            var data = entry.bySize[String(size)];
            var ids = (data.cycle || entry.bestCycle).map(function (n) {
              var mc = resolveCycleChar(n);
              return mc ? String(mc.contentId) : null;
            }).filter(Boolean);
            var res = store.saveNoteBuild(stateId, {
              cycleRoleId: String((cycleRoleId || stateId)),
              cycleSize: size,
              cycleIds: ids
            });
            if (res.ok && ctx.toast) ctx.toast('闭环配置已保存（角色/人数/环成员）', 'ok');
            renderAll();
          });
        }
        var dogfoodSel = dom.qs('#pair-dogfood', el);
        if (dogfoodSel) {
          dogfoodSel.addEventListener('change', function () {
            dogfoodCarrierId = dogfoodSel.value || null;
            ui.noteDogfoodCarrier = dogfoodCarrierId;
            dogfoodOtherId = null; // O 改变后另一人自动重算
            ui.noteDogfoodOther = null;
            if (ctx.save) ctx.save();
            renderAll();
          });
        }
        var dogfoodOtherSel = dom.qs('#pair-dogfood-other', el);
        if (dogfoodOtherSel) {
          dogfoodOtherSel.addEventListener('change', function () {
            dogfoodOtherId = dogfoodOtherSel.value || null;
            ui.noteDogfoodOther = dogfoodOtherId;
            if (ctx.save) ctx.save();
            renderAll();
          });
        }
        var dogfoodFitSel = dom.qs('#pair-dogfood-fit-star', el);
        if (dogfoodFitSel) {
          dogfoodFitSel.addEventListener('change', function () {
            dogfoodFitStar = dogfoodFitSel.value || '';
            ui.noteDogfoodFitStar = dogfoodFitStar;
            if (ctx.save) ctx.save();
            renderAll();
          });
        }
        el.querySelectorAll('[data-dogfood-pick]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            dogfoodCarrierId = btn.getAttribute('data-dogfood-pick');
            ui.noteDogfoodCarrier = dogfoodCarrierId;
            dogfoodOtherId = null;
            ui.noteDogfoodOther = null;
            if (ctx.save) ctx.save();
            renderAll();
            if (ctx.toast) ctx.toast('已选择狗粮主人 O', 'ok');
          });
        });
        var pairSave = dom.qs('#pair-save', el);
        if (pairSave) {
          pairSave.addEventListener('click', function () {
            if (!store) return;
            var res = store.saveNoteBuild(stateId, {
              directionId: stateDir,
              targetPosition: targetPosition,
              carriers: carrierDraft,
              dogfoodCarrierId: dogfoodCarrierId,
              dogfoodOtherId: dogfoodOtherId,
              dogfoodFitStar: dogfoodFitStar,
              fitStars: [ui.noteFitStar1 || '', ui.noteFitStar2 || ''],
              bonusMode: bonusMode,
              entries: entryDraft,
              start: startDraft,
              note: noteText
            });
            if (res.ok) {
              if (ctx.toast) ctx.toast('配对方案已保存（主练+位置+载体+狗粮+契合加成）', 'ok');
              renderAll();
            }
          });
        }
        var addBtn = dom.qs('#note-entry-add', el);
        if (addBtn) {
          addBtn.addEventListener('click', function () {
            var nameInput = dom.qs('#note-entry-name', el);
            var typeSel = dom.qs('#note-entry-type', el);
            var name = nameInput ? String(nameInput.value || '').trim() : '';
            if (!name) {
              if (ctx.toast) ctx.toast('请输入词条名', 'warn');
              return;
            }
            entryDraft.push({ name: name.slice(0, 80), type: typeSel ? typeSel.value : '属性', reason: '手动添加' });
            renderAll();
          });
        }
        // 词条删除 / 候选载体 / 词条库检索与加入 / 加成口径
        el.querySelectorAll('[data-note-entry-remove]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            entryDraft.splice(Number(btn.getAttribute('data-note-entry-remove')), 1);
            renderAll();
          });
        });
        el.querySelectorAll('[data-note-carrier-pick]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var idx = Number(btn.getAttribute('data-note-carrier-pick'));
            carrierDraft[idx] = btn.getAttribute('data-note-carrier-id');
            renderAll();
          });
        });
        var libSearch = dom.qs('#note-lib-search', el);
        if (libSearch) {
          libSearch.addEventListener('input', function () {
            entrySearch = libSearch.value || '';
            renderAll();
          });
        }
        el.querySelectorAll('[data-note-lib-add]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            entryDraft.push({
              name: btn.getAttribute('data-note-lib-add'),
              type: btn.getAttribute('data-note-lib-type') || '词条',
              reason: '词条库加入'
            });
            renderAll();
          });
        });
        var bonusSel = dom.qs('#note-bonus-mode', el);
        if (bonusSel) {
          bonusSel.addEventListener('change', function () {
            bonusMode = bonusSel.value;
            ui.noteBonusMode = bonusMode;
            if (ctx.save) ctx.save();
            renderAll();
          });
        }
        ['note-carrier-1', 'note-carrier-2'].forEach(function (id, idx) {
          var node = dom.qs('#' + id, el);
          if (!node) return;
          node.addEventListener('change', function () {
            carrierDraft[idx] = node.value || null;
            renderAll();
          });
        });
        ['note-fit-1', 'note-fit-2'].forEach(function (id) {
          var node = dom.qs('#' + id, el);
          if (!node) return;
          node.addEventListener('change', function () {
            if (id === 'note-fit-1') ui.noteFitStar1 = node.value;
            else ui.noteFitStar2 = node.value;
            if (ctx.save) ctx.save();
            renderAll();
          });
        });
        // 多契合词条输入（可重复目标，按星级累加）
        var calcAdd = dom.qs('#note-calc-add', el);
        if (calcAdd) {
          calcAdd.addEventListener('click', function () {
            calcEntries.push({ targetId: String(stateId), star: '' });
            ui.noteCalcEntries = calcEntries;
            if (ctx.save) ctx.save();
            renderAll();
          });
        }
        el.querySelectorAll('[data-calc-target]').forEach(function (node) {
          node.addEventListener('change', function () {
            var idx = Number(node.getAttribute('data-calc-target'));
            if (calcEntries[idx]) calcEntries[idx].targetId = node.value;
            ui.noteCalcEntries = calcEntries;
            if (ctx.save) ctx.save();
            renderAll();
          });
        });
        el.querySelectorAll('[data-calc-star]').forEach(function (node) {
          node.addEventListener('change', function () {
            var idx = Number(node.getAttribute('data-calc-star'));
            if (calcEntries[idx]) calcEntries[idx].star = node.value;
            ui.noteCalcEntries = calcEntries;
            if (ctx.save) ctx.save();
            renderAll();
          });
        });
        el.querySelectorAll('[data-calc-remove]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            calcEntries.splice(Number(btn.getAttribute('data-calc-remove')), 1);
            ui.noteCalcEntries = calcEntries;
            if (ctx.save) ctx.save();
            renderAll();
          });
        });
        var chainEntrySel = dom.qs('#note-chain-entry', el);
        if (chainEntrySel) {
          chainEntrySel.addEventListener('change', function () {
            chainEntry = chainEntrySel.value;
            renderAll();
          });
        }
        var chainCarrierSel = dom.qs('#note-chain-carrier', el);
        if (chainCarrierSel) {
          chainCarrierSel.addEventListener('change', function () {
            chainCarrierId = chainCarrierSel.value || null;
            renderAll();
          });
        }
        // 合成素材一致性检查器（实时更新结果，不整页重渲染）
        function refreshConsistency() {
          var targetInput = dom.qs('#consist-target', el);
          consistency = {
            target: targetInput ? targetInput.value : consistency.target,
            mats: [0, 1, 2].map(function (i) {
              var node = dom.qs('.consist-mat[data-mat="' + i + '"]', el);
              return node ? node.value : (consistency.mats[i] || '');
            })
          };
          ui.noteConsistency = consistency;
          if (ctx.save) ctx.save();
          var out = dom.qs('#consist-result', el);
          if (out) out.innerHTML = consistencyResultHtml();
        }
        var consistTarget = dom.qs('#consist-target', el);
        if (consistTarget) consistTarget.addEventListener('input', refreshConsistency);
        el.querySelectorAll('.consist-mat').forEach(function (node) {
          node.addEventListener('input', refreshConsistency);
        });
        var consistCheck = dom.qs('#consist-check', el);
        if (consistCheck) consistCheck.addEventListener('click', refreshConsistency);
        var depthSel = dom.qs('#note-chain-depth', el);
        if (depthSel) {
          depthSel.addEventListener('change', function () {
            chainDepth = Number(depthSel.value) || 3;
            renderAll();
          });
        }
        var startGo = dom.qs('#note-start-go', el);
        if (startGo) {
          startGo.addEventListener('click', function () {
            var owner = dom.qs('#note-start-owner', el);
            var entry = dom.qs('#note-start-entry', el);
            var q = dom.qs('#note-start-quality', el);
            startDraft = { ownerId: owner ? owner.value : '', entry: entry ? entry.value : '', quality: q ? q.value : '红色' };
            renderAll();
          });
        }
        var save = dom.qs('#note-build-save', el);
        if (save) {
          save.addEventListener('click', function () {
            if (!store) return;
            var res = store.saveNoteBuild(stateId, {
              directionId: stateDir,
              targetPosition: targetPosition,
              carriers: carrierDraft,
              dogfoodCarrierId: dogfoodCarrierId,
              dogfoodOtherId: dogfoodOtherId,
              dogfoodFitStar: dogfoodFitStar,
              fitStars: [ui.noteFitStar1 || '', ui.noteFitStar2 || ''],
              bonusMode: bonusMode,
              entries: entryDraft,
              start: startDraft,
              note: noteText
            });
            if (res.ok) {
              if (ctx.toast) ctx.toast('笔记养成配法已保存', 'ok');
              renderAll();
            }
          });
        }
        var reset = dom.qs('#note-build-reset', el);
        if (reset) {
          reset.addEventListener('click', function () {
            if (store) store.deleteNoteBuild(stateId);
            ensureDraft();
            renderAll();
            if (ctx.toast) ctx.toast('已按推荐重置', 'ok');
          });
        }
        var manualSave = dom.qs('#note-manual-save', el);
        if (manualSave) {
          manualSave.addEventListener('click', function () {
            var cSel = dom.qs('#note-manual-carrier', el);
            var scoreInput = dom.qs('#note-manual-score', el);
            var carrierId = cSel ? cSel.value : '';
            if (!carrierId) {
              if (ctx.toast) ctx.toast('请选择载体角色', 'warn');
              return;
            }
            var res = store.setHarmonyScore(stateId, carrierId, scoreInput ? scoreInput.value : '');
            if (res.ok) {
              if (ctx.toast) ctx.toast('契合分已补录', 'ok');
              renderAll();
            } else if (ctx.toast) ctx.toast(res.errors.join('；'), 'warn');
          });
        }
        var importBtn = dom.qs('#note-manual-import', el);
        if (importBtn) {
          importBtn.addEventListener('click', function () {
            var m = dom.modal({
              title: '导入契合度补录 JSON',
              subtitle: '格式：{"pairs":{"主力ID|载体ID": 分数}} 或 {"主力ID|载体ID":分数}',
              bodyHtml:
                '<textarea class="formula-box" id="harmony-import-text" style="width:100%;height:220px;font-family:var(--font-mono);font-size:12px" placeholder=\'{"pairs":{"725380|725375":18}}\'></textarea>' +
                '<div class="row" style="margin-top:10px"><button class="btn btn--primary btn--sm" id="harmony-import-go">导入</button></div>',
              width: 640
            });
            m.body.querySelector('#harmony-import-go').addEventListener('click', function () {
              var text = m.body.querySelector('#harmony-import-text').value;
              var res = store.importHarmonyManual(text);
              if (res.ok) {
                m.close();
                if (ctx.toast) ctx.toast('已导入 ' + res.count + ' 条契合补录', 'ok');
                renderAll();
              } else if (ctx.toast) ctx.toast(res.errors.join('；'), 'warn');
            });
          });
        }
        var noteArea = dom.qs('#note-build-text', el);
        if (noteArea) noteArea.addEventListener('input', function () { noteText = noteArea.value; });
      }

      ensureDraft();
      chainEntry = entryDraft[0] ? entryDraft[0].name : '';
      var rec0 = recommendCarriers();
      if (!carrierDraft[0] && rec0.list[0]) carrierDraft[0] = String(rec0.list[0].character.contentId);
      if (!carrierDraft[1] && rec0.list[1]) carrierDraft[1] = String(rec0.list[1].character.contentId);
      renderAll();
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);

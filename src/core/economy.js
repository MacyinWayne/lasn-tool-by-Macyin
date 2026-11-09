/*!
 * core/economy.js —— 资源规划 / ROI（T5）
 *
 * 数据来源：knowledge/model.json → economy（精力/训练成本/器材/扭蛋/商店/每日循环）
 * 纪律：多数数值为区间/推断 → ROI 输出标注置信度与区间，不伪装精确。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.economy = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function getModel() {
    var B = (typeof globalThis !== 'undefined' && globalThis.BBT) || {};
    return B.model || (typeof globalThis !== 'undefined' ? globalThis.BBTModel : null) || null;
  }

  function economyData() {
    var m = getModel();
    return (m && m.economy) || {};
  }

  function trainingParams() {
    var m = getModel();
    var t = (m && m.training && m.training.params) || {};
    return {
      trainingCost: (t.stamina_cost && t.stamina_cost.range) || [20, 30],
      restRecovery: [60, 80]
    };
  }

  /** ROI 参数：从 model 抽取（区间取中值）。 */
  function roiInputs(overrides) {
    var econ = economyData();
    var tp = trainingParams();
    var o = overrides || {};
    var trainingCost = o.trainingCost != null ? o.trainingCost : (tp.trainingCost[0] + tp.trainingCost[1]) / 2;
    var restRecovery = o.restRecovery != null ? o.restRecovery : 70;
    return {
      trainingCost: trainingCost,
      trainingCostRange: tp.trainingCost,
      restRecovery: restRecovery,
      dailyStamina: o.dailyStamina != null ? o.dailyStamina : 200,
      gainPerTraining: o.gainPerTraining != null ? o.gainPerTraining : 24,
      staminaCap: o.staminaCap != null ? o.staminaCap : 120,
      borrowPerDay: (econ.equipment && econ.equipment.borrow && econ.equipment.borrow.value) || 6,
      buyCount: (econ.stamina && econ.stamina.daily_buy_count && econ.stamina.daily_buy_count.value) || 5,
      gacha: econ.gacha || {}
    };
  }

  /** ROI 排序：每点精力换多少属性 / 体力恢复效率。 */
  function roiRanking(overrides) {
    var inp = roiInputs(overrides);
    var items = [
      {
        id: 'training',
        name: '训练（主属性+副属性）',
        cost: inp.trainingCost + ' 精力',
        gain: inp.gainPerTraining,
        roi: inp.gainPerTraining / inp.trainingCost,
        unit: '属性/精力',
        confidence: '实测公式 / 成本区间推断',
        note: '训练成本取区间中值 ' + inp.trainingCost + '（区间 ' + inp.trainingCostRange.join('~') + '）'
      },
      {
        id: 'rest',
        name: '休息恢复精力',
        cost: '1 行动',
        gain: inp.restRecovery,
        roi: inp.restRecovery / 1,
        unit: '精力/行动',
        confidence: '推断（60~80 区间）',
        note: '恢复量取 70；实际值影响每日训练次数'
      },
      {
        id: 'borrow',
        name: '好友/公会器材借用',
        cost: '每 天 ' + inp.borrowPerDay + ' 次',
        gain: inp.borrowPerDay,
        roi: inp.borrowPerDay,
        unit: '次/天',
        confidence: '多源一致',
        note: '白嫖器材 = 0 精力换训练加值；优先用满'
      },
      {
        id: 'buy-stamina',
        name: '钻石买体力',
        cost: '钻石（累增曲线未公开）',
        gain: null,
        roi: null,
        unit: '不推荐',
        confidence: '待验证',
        note: '每日限 ' + inp.buyCount + ' 次且价格累增；多源共识「不建议买体力」'
      },
      {
        id: 'gacha',
        name: '抽卡（UP / 器材）',
        cost: '钻石/券',
        gain: null,
        roi: null,
        unit: '战略投入',
        confidence: '单源（保底 60/新手 8 折）',
        note: '不要花钻抽常驻；优先 UP 球员/器材与圣山（多源一致）'
      }
    ];
    return items.sort(function (a, b) {
      return (b.roi || 0) - (a.roi || 0);
    });
  }

  /**
   * 每日精力分配规划：按目标属性权重把训练次数分给 6 个 A 层训练项。
   * @param {Object} input { stamina, trainingCost, sessions?, gainPerTraining, weights:{A层属性:权重}, moodBonusPct }
   */
  function planDay(input) {
    var o = input || {};
    var stamina = o.stamina != null ? o.stamina : 200;
    var cost = o.trainingCost != null ? o.trainingCost : 25;
    var sessions = o.sessions != null ? Math.floor(o.sessions) : Math.floor(stamina / cost);
    var weights = o.weights || {};
    // 训练配对：用户实机验证（2026-11-05 公测），与 attribute-layers.TRAINING_PAIRS 保持一致
    var pairs = [
      { id: 'shot', name: '投射训练', primary: '投射', secondary: '运控' },
      { id: 'jump', name: '弹跳训练', primary: '弹跳', secondary: '意识' },
      { id: 'defense', name: '防守训练', primary: '防守', secondary: '体能' },
      { id: 'stamina', name: '体能训练', primary: '体能', secondary: '弹跳' },
      { id: 'handle', name: '运控训练', primary: '运控', secondary: '防守' },
      { id: 'awareness', name: '意识训练', primary: '意识', secondary: '体能' }
    ];
    var rows = pairs.map(function (p) {
      var score = (weights[p.primary] || 0) + (weights[p.secondary] || 0) * 0.5;
      return {
        itemId: p.id,
        name: p.name,
        primary: p.primary,
        secondary: p.secondary,
        weight: score,
        sessions: 0
      };
    });
    var remaining = sessions;
    while (remaining > 0) {
      var best = null;
      rows.forEach(function (r) {
        if (!best || r.weight > best.weight) best = r;
      });
      if (!best) break;
      best.sessions += 1;
      remaining -= 1;
    }
    rows.sort(function (a, b) { return b.sessions - a.sessions; });
    return {
      sessions: sessions,
      staminaUsed: sessions * cost,
      staminaLeft: Math.max(0, stamina - sessions * cost),
      rows: rows,
      confidence: '分配权重为推断；训练成本区间见 ROI'
    };
  }

  /** 优先级清单（来自 model.economy + roster 四流派）。 */
  function priorityChecklist(streamName) {
    var econ = economyData();
    var inRun = econ.in_run_economy || {};
    var rhythm = (inRun.gacha_flow_rhythm && inRun.gacha_flow_rhythm[streamName]) || null;
    var list = [];
    if (streamName === '训练流') {
      list.push({ text: '训练日不休息、尽量合练；周末公园划船/训练效率扭蛋/笔记扭蛋', confidence: '多源一致' });
      list.push({ text: '精力循环优先：望月需要精力上限 ≥120、一次休息 ≥70 才稳定', confidence: '多源一致' });
      list.push({ text: '表情流：6 格锁满一致 > 随机凑；望月 +8% 与龙宫寺 +4% 同乘区互稀释（二选一）', confidence: '实测' });
    } else if (streamName === '扭蛋流') {
      list.push({ text: '周五留 25 精力、周六零花钱 ≥400、周日 ≥200', confidence: '多源一致' });
      list.push({ text: '零花钱优先级：零花钱 ≥ 笔记 ＞ 负面换大量属性 ＞ 属性 ＞ 精力', confidence: '多源一致' });
      list.push({ text: '同名天赋「再买一个」不叠加（羽濑川/春澄等），同队占位要检查', confidence: '多源一致' });
    } else if (streamName === '商店流') {
      list.push({ text: '周五留 50 精力；商店 20 级解锁', confidence: '多源一致' });
      list.push({ text: '商品栏位需要剧本强化解锁（4 个商店栏位）', confidence: '多源一致' });
      list.push({ text: '恢复精力道具尽量买 50 零花钱以下', confidence: '多源一致' });
    } else {
      list.push({ text: '优先把每日免费/低价资源吃满：器材借用 3~6 次、打工（25 精力/次收入最高）', confidence: '多源一致' });
      list.push({ text: '50 级前重置免费：过渡球员可以放心投入，50 级后重置 200 钻', confidence: '多源一致' });
      list.push({ text: '不要花钻抽常驻池，优先 UP 球员/器材与圣山', confidence: '多源一致' });
    }
    if (rhythm && rhythm.friday_stamina_keep != null) {
      list.push({ text: '周五保留精力：' + rhythm.friday_stamina_keep, confidence: '多源一致' });
    }
    list.push({ text: '每日 5 次买体力价格累增、性价比低 → 不建议（待验证）', confidence: '待验证' });
    return list;
  }

  function resetRules() {
    var m = getModel();
    return (m && m.growth && m.growth.reset_rules) || null;
  }

  function dailyLoop() {
    var econ = economyData();
    return econ.daily_loop || null;
  }

  return {
    economyData: economyData,
    roiInputs: roiInputs,
    roiRanking: roiRanking,
    planDay: planDay,
    priorityChecklist: priorityChecklist,
    resetRules: resetRules,
    dailyLoop: dailyLoop
  };
});

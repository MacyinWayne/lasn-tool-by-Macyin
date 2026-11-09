/*!
 * 篮球少女：飞跃巅峰 · 数值工具包
 * core/params.js —— 参数注册表（唯一真源）
 *
 * 设计约定：
 *  1) 每一个可调参数都带 置信度 + 来源，UI 必须展示，禁止匿名数字。
 *  2) 本文件同时供浏览器（<script> 全局 BBT.params）与 Node（require）使用，
 *     因此写成 UMD 形式，不依赖 DOM。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.params = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  /**
   * 置信度分级。所有展示层都从这里取标签与颜色，避免各视图各写一套。
   */
  var CONFIDENCE = {
    '客户端确证': {
      id: '客户端确证',
      label: '客户端确证',
      short: '客户端',
      level: 6,
      tone: 'client',
      desc: '来自客户端配置文件 / 反编译的权威结论（client-analyst 逆向），证据等级最高。'
    },
    '实测': {
      id: '实测',
      label: '社区实测',
      short: '实测',
      level: 5,
      tone: 'ok',
      desc: '社区玩家多来源实测且互相一致，可直接用于计算。'
    },
    '多源一致': {
      id: '多源一致',
      label: '多源一致',
      short: '多源',
      level: 4,
      tone: 'ok',
      desc: '两个以上独立来源给出相同数值，但缺少逐帧实测。'
    },
    '单源': {
      id: '单源',
      label: '单源待复测',
      short: '单源',
      level: 3,
      tone: 'warn',
      desc: '只有一个来源，版本更新后可能失效。'
    },
    '推断': {
      id: '推断',
      label: '结构推断',
      short: '推断',
      level: 2,
      tone: 'warn',
      desc: '由公式结构或间接证据推导，数值未经直接验证。'
    },
    '待验证': {
      id: '待验证',
      label: '待验证',
      short: '待验',
      level: 1,
      tone: 'risk',
      desc: '缺少证据，仅作占位；不要让结论依赖它。'
    }
  };

  var CONFIDENCE_ORDER = ['客户端确证', '实测', '多源一致', '单源', '推断', '待验证'];

  /**
   * 参数定义。
   * group 用于公式卡的分类；formulaRole 用于训练/表情公式的拆解标注。
   */
  var PARAM_DEFS = [
    /* ======================= 训练收益 ======================= */
    {
      id: 'trainBaseMain',
      group: '训练收益',
      label: '训练项基础值（常规）',
      value: 10,
      min: 0,
      max: 100,
      step: 1,
      unit: '点',
      confidence: '实测',
      source: 'TapTap「训练流公式逆推」帖（moment/805700735671995246，2026-10 抓取）+ T4 任务给定公式',
      note: 'A 层六属性（投射/弹跳/防守/体能/运控）训练项的基础收益；意识训练项基础值为 8。',
      formulaRole: '基础项'
    },
    {
      id: 'trainBaseWillpower',
      group: '训练收益',
      label: '意识训练项基础值',
      value: 8,
      min: 0,
      max: 100,
      step: 1,
      unit: '点',
      confidence: '实测',
      source: '同上（训练流公式逆推帖）',
      note: '仅「意识」训练项基础比其它五项低 2 点（社区实测）。',
      formulaRole: '基础项'
    },
    {
      id: 'trainLevelStep',
      group: '训练收益',
      label: '训练等级每级增量',
      value: 3,
      min: 0,
      max: 50,
      step: 0.5,
      unit: '点/级',
      confidence: '实测',
      source: '同上；公式项 (训练等级 − 1) × 3',
      note: '线性成长：每提升 1 级训练，括号内固定 +3，不随等级衰减。',
      formulaRole: '等级项'
    },
    {
      id: 'personnelBonus',
      group: '训练收益',
      label: '人员加值',
      value: 5,
      min: 0,
      max: 50,
      step: 0.5,
      unit: '点',
      confidence: '实测',
      source: '同上；队伍/人员配置带来的固定加值',
      note: '与训练等级无关的固定项，直接加进括号内。',
      formulaRole: '固定加值'
    },
    {
      id: 'gearBonus',
      group: '训练收益',
      label: '对口器材加值',
      value: 1,
      min: 0,
      max: 50,
      step: 0.5,
      unit: '点',
      confidence: '实测',
      source: '同上；器材与训练项目对口时的固定加值',
      note: '「对口」指器材属性与训练项目匹配；不对口时按 0 处理。',
      formulaRole: '固定加值'
    },
    {
      id: 'charSkillFlatBonus',
      group: '训练收益',
      label: '角色技能固定加值（期望）',
      value: 0,
      min: 0,
      max: 100,
      step: 0.5,
      unit: '点',
      confidence: '推断',
      source: '内测截图人工 OCR（Lead 提供）：佐久间雨乃「进行队友训练时，训练主属性 +3，且 50% 概率额外再获得 2 点训练主属性」',
      note: '示例：+3 固定 + 50% × 2 = 期望 +4。加在括号内还是乘法之后未经实测，这里按括号内处理（推断）。',
      formulaRole: '角色技能项'
    },
    {
      id: 'trainingBonusPct',
      group: '训练收益',
      label: 'Σ训练加成',
      value: 0,
      min: 0,
      max: 500,
      step: 1,
      unit: '%',
      confidence: '多源一致',
      source: 'T3 model.json training_bonus_sum：Σ训练加成%（技能/强化/加成）进同一加算乘区',
      note: '加算进 (1 + Σ训练加成 + 心情%) 乘区；基础 0 表示无额外加成。腾松/雨乃 2 命的 +3% 落在此区。',
      formulaRole: '加算乘区'
    },
    {
      id: 'gearCritBonusPct',
      group: '训练收益',
      label: '器材暴击加成',
      value: 0,
      min: 0,
      max: 500,
      step: 1,
      unit: '%',
      confidence: '待验证',
      source: '社区提及「器材暴击」乘区，触发率与加值幅度缺少实测',
      note: '0% 表示本次未触发暴击。暴击期望值请把单次暴击加成 × 触发率后填入。',
      formulaRole: '乘区 2'
    },
    {
      id: 'flatAttrBonus',
      group: '训练收益',
      label: '主属性加值',
      value: 0,
      min: 0,
      max: 999,
      step: 1,
      unit: '点',
      confidence: '推断',
      source: '公式尾项；具体来源不明（固定词条 / 面板加成）',
      note: '加在全部乘法之后，不被训练加成与暴击放大。',
      formulaRole: '尾项'
    },
    {
      id: 'secondarySharePct',
      group: '训练收益',
      label: '副属性收益占比（已废弃·旧比例模型）',
      value: 38,
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      confidence: '待验证',
      source: '2026-11-09 玩家修正：训练主/副属性不是比例拆分，而是数值相加——主≈基础10+局外养成+器材(+1/个,暴击×2)+小经理(+3)+扭蛋主属性加成+训练等级/人员/技能；副≈基础3+其它加值。本参数仅保留兼容旧模型（已废弃）。',
      note: '已废弃：实战按「数值相加」结算（主10/副3 起）。计算器的副属性结果仅供参考，决策请看「养成配队 → 养成决策指南」。',
      formulaRole: '副属性系数（已废弃）'
    },

    /* ======================= 心情 / 场地 ======================= */
    {
      id: 'moodBonusPct',
      group: '心情 / 场地',
      label: '心情加成',
      value: 0,
      min: -100,
      max: 100,
      step: 1,
      unit: '%',
      confidence: '多源一致',
      source: 'T3 model.json training.params.mood_bonus：极好 +20% / 好 +10% / 一般 0 / 差 −10% / 极差 −20%',
      note: '加算进 (1 + Σ训练加成 + 心情%) 乘区（位置为推断，需校准）。',
      formulaRole: '心情加算'
    },
    {
      id: 'venueBonusPct',
      group: '心情 / 场地',
      label: '场地 / 海边训练加成',
      value: 0,
      min: -100,
      max: 200,
      step: 1,
      unit: '%',
      confidence: '待验证',
      source: '客户端存在场地/海边训练变体（client-analyst 确证结构）；具体加成数值未确证',
      note: '填你实测到的场地加成；结构确证、数值待验证。当前按独立乘区处理。',
      formulaRole: '场地乘区'
    },

    /* ======================= 表情爆发 ======================= */
    {
      id: 'exprBaseBonusPct',
      group: '表情爆发',
      label: '每个表情基础加成（旧模型 legacy）',
      value: 20,
      min: 0,
      max: 100,
      step: 0.5,
      unit: '%',
      confidence: '实测',
      source: 'TapTap / 社区多源（训练表情流）；2026-11-05 用户实机已被「表情类型基础」替代',
      note: '旧模型：每个参与表情统一 20%。新模型按表情类型（大笑/微笑/哭脸）分别计算，此参数仅保留用于 legacy 对照。',
      formulaRole: 'legacy'
    },
    {
      id: 'exprLaughBonusPct',
      group: '表情爆发',
      label: '大笑基础加成',
      value: 20,
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      confidence: '实测',
      source: '用户实机（2026-11-05）：1 大笑 + 1 微笑 = 130%，推得大笑 20%',
      note: '每名大笑参与者提供 +20%（新模型默认）。',
      formulaRole: '表情类型'
    },
    {
      id: 'exprSmileBonusPct',
      group: '表情爆发',
      label: '微笑基础加成',
      value: 10,
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      confidence: '实测',
      source: '用户实机（2026-11-05）：1 大笑 + 1 微笑 = 130%，推得微笑 10%',
      note: '每名微笑参与者提供 +10%（新模型默认）。',
      formulaRole: '表情类型'
    },
    {
      id: 'exprCryBonusPct',
      group: '表情爆发',
      label: '哭脸基础加成',
      value: 0,
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      confidence: '实测',
      source: '用户实机（2026-11-05）：3 大笑 + 1 哭脸 = 160%，推得哭脸 0%',
      note: '哭脸不提供基础加成，仅参与人数/一致判定。',
      formulaRole: '表情类型'
    },
    {
      id: 'exprConsistencyPerPerson',
      group: '表情爆发',
      label: '一致乘区：每人系数（推算未测档用）',
      value: 0.25,
      min: 0,
      max: 2,
      step: 0.05,
      unit: '×/人',
      confidence: '实测',
      source: '用户实机（2026-11-05）：2人1.5 / 3人1.8 / 4人2.0 / 5人2.2 / 6人2.5；规律 = 1+0.25n 后 1 位小数银行家舍入',
      note: '已实测档位用表值（2人1.5 / 3人1.8 / 4人2.0 / 5人2.2 / 6人2.5）；7/8/9 人按 round1Banker(1+每人系数×人数) 推算并标「推算·待测」。',
      formulaRole: '一致乘区推算'
    },
    {
      id: 'exprConsistency2',
      group: '表情爆发',
      label: '2 人一致倍率（实测）',
      value: 1.5,
      min: 1,
      max: 10,
      step: 0.05,
      unit: '×',
      confidence: '实测',
      source: '用户实机（2026-11-05）：2 哭脸一致 = 150% = 1.0 × 1.5',
      note: '全哭脸也触发一致乘区（任意表情类型）。',
      formulaRole: '一致乘区表'
    },
    {
      id: 'exprConsistency3',
      group: '表情爆发',
      label: '3 人一致倍率（实测）',
      value: 1.8,
      min: 1,
      max: 10,
      step: 0.05,
      unit: '×',
      confidence: '实测',
      source: '用户实机（2026-11-05）：3 大笑一致 = 288% = 1.6×1.8；3 微笑一致 = 234% = 1.3×1.8',
      note: '实测表值 1.8（1+0.25×3=1.75，可能被游戏按 1 位小数取整成 1.8，或表值就是 1.8；以实测为准）。',
      formulaRole: '一致乘区表'
    },
    {
      id: 'exprConsistency4',
      group: '表情爆发',
      label: '4 人一致倍率（实测）',
      value: 2.0,
      min: 1,
      max: 10,
      step: 0.05,
      unit: '×',
      confidence: '实测',
      source: '用户实机（2026-11-05）：4 大笑一致 = 360% = 1.8 × 2.0',
      note: '一致乘区实测表值。',
      formulaRole: '一致乘区表'
    },
    {
      id: 'exprConsistency5',
      group: '表情爆发',
      label: '5 人一致倍率（实测）',
      value: 2.2,
      min: 1,
      max: 10,
      step: 0.05,
      unit: '×',
      confidence: '实测',
      source: '用户实机（2026-11-05）：5 微笑一致 = 330% = 1.5 × 2.2（覆盖此前 2.25 推算）',
      note: '实测表值 2.2（1+0.25×5=2.25 按银行家舍入为 2.2）。',
      formulaRole: '一致乘区表'
    },
    {
      id: 'exprConsistency6',
      group: '表情爆发',
      label: '6 人一致倍率（实测）',
      value: 2.5,
      min: 1,
      max: 10,
      step: 0.05,
      unit: '×',
      confidence: '实测',
      source: '用户实机（2026-11-05）：6 人大笑全一致 + 望月8% + 龙宫寺4% + 真崎0.25 → 803%',
      note: '与旧攻略 2.5 一致；真崎再 +0.25 → 2.75。',
      formulaRole: '一致乘区表'
    },
    {
      id: 'exprConsistencyBase',
      group: '表情爆发',
      label: '表情一致基础倍率（旧模型 legacy）',
      value: 2.5,
      min: 1,
      max: 10,
      step: 0.05,
      unit: '×',
      confidence: '实测',
      source: '社区实测：6 个一致表情的乘区基础值 2.5',
      note: '所有表情同款（一致）时触发的独立乘区；不一致时倍率为 1（即不乘）。',
      formulaRole: '一致乘区'
    },
    {
      id: 'exprSlotCount',
      group: '表情爆发',
      label: '表情槽位数（基础）',
      value: 6,
      min: 1,
      max: 12,
      step: 1,
      unit: '人',
      confidence: '实测',
      source: '训练队基础人数 6（经理1 + 陪练4 + 主练1；用户实测，2026-11-05 修正）',
      note: '基础一次结算 6 人表情；希雅二星在场时额外 +1~3 个「虚空人」，上限 9（见下方参数）。',
      formulaRole: '槽位'
    },
    {
      id: 'exprSlotsMaxWithXiya',
      group: '表情爆发',
      label: '表情一致上限（希雅二星）',
      value: 9,
      min: 6,
      max: 12,
      step: 1,
      unit: '人',
      confidence: '实测',
      source: '用户实测（2026-11-05）：希雅二星在场 +1~3 虚空人 → 6+3=9；knowledge/表情机制_希雅二星虚空人.md',
      note: '虚空人表情必定与某个真人一致；若真人 6 人已锁满一致，则虚空人必定跟随 → 锁 9 稳定可达。具体人数分布待确认。',
      formulaRole: '槽位上限'
    },
    {
      id: 'xiyaVirtualMin',
      group: '表情爆发',
      label: '虚空人数量下限',
      value: 1,
      min: 0,
      max: 5,
      step: 1,
      unit: '人',
      confidence: '实测',
      source: '用户实测（2026-11-05）：希雅二星虚空人 1~3 人',
      note: '希雅二星在场时额外虚空人的最少数量；0 表示不启用希雅。',
      formulaRole: '虚空人'
    },
    {
      id: 'xiyaVirtualMax',
      group: '表情爆发',
      label: '虚空人数量上限',
      value: 3,
      min: 0,
      max: 5,
      step: 1,
      unit: '人',
      confidence: '实测',
      source: '用户实测（2026-11-05）：希雅二星虚空人 1~3 人（分布待确认）',
      note: '希雅二星在场时额外虚空人的最多数量；1~3 均匀随机是当前假设（待游戏内确认）。',
      formulaRole: '虚空人'
    },
    {
      id: 'exprKinds',
      group: '表情爆发',
      label: '表情种类数（随机模型）',
      value: 4,
      min: 1,
      max: 12,
      step: 1,
      unit: '种',
      confidence: '待验证',
      source: '用于估算「随机凑表情」的期望值，并非游戏硬数据',
      note: '仅影响优化器里的随机期望曲线：k 越大，随机凑出全一致的期望越低。',
      formulaRole: '随机假设'
    },
    {
      id: 'exprConsistencyBoostPct',
      group: '表情爆发',
      label: '一致概率加成',
      value: 0,
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      confidence: '多源一致',
      source: 'T3 model.json expression.params.expression_consistency_up_闪堂电：全部表情一致概率 +15%（2★ 另有哭/平常→笑脸 30%/60%）',
      note: '闪堂电类技能：直接加在全一致概率上。默认 0 = 未上阵；仅影响随机期望，不影响锁满一致。',
      formulaRole: '随机假设'
    },

    /* ======================= 暴击 / 熟练度（T5.1 客户端数值区） ======================= */
    {
      id: 'critBonusTierPct',
      group: '暴击 / 熟练度',
      label: '器材暴击加成档位',
      value: 0,
      min: 0,
      max: 20,
      step: 5,
      unit: '%',
      confidence: '多源一致',
      source: 'T3 model v3.2 training.params.crit_bonus_tiers：+5% / +10% / +15% / +20%（客户端数值区确证）',
      note: '器材暴击触发时填入对应档位；0 = 未暴击。此值直接参与「(1 + 暴击%)」乘区。',
      formulaRole: '暴击档位'
    },
    {
      id: 'critTrainingIncomePct',
      group: '暴击 / 熟练度',
      label: '暴击训练收益档位',
      value: 0,
      min: 0,
      max: 40,
      step: 10,
      unit: '%',
      confidence: '多源一致',
      source: 'T3 model v3.2 training.params.crit_training_income_tiers：+20% / +30% / +40%（客户端数值区确证）',
      note: '器材暴击训练收益档位。与「暴击加成档位」是否同一乘区待验证。当前不参与计算，仅作参数可见/可调。',
      formulaRole: '资料（待接线）'
    },
    {
      id: 'critProficiencyThreshold',
      group: '暴击 / 熟练度',
      label: '暴击熟练度阈值',
      value: 70,
      min: 0,
      max: 100,
      step: 5,
      unit: '熟练度',
      confidence: '多源一致',
      source: 'T3 model v3.2 training.params.crit_proficiency_threshold：熟练度 ≥70 触发暴击训练（客户端数值区确证）',
      note: '器材熟练度达到 70 才会触发暴击训练；熟练度曲线仍待验证（验证器 V8）。',
      formulaRole: '资料'
    },
    {
      id: 'trainingBonusCapPct',
      group: '暴击 / 熟练度',
      label: '训练加成上限',
      value: 25,
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      confidence: '多源一致',
      source: 'T3 model v3.2 training.params.training_bonus_cap：恢复精力类/购买商品类各 25%，升级后 35%（客户端配置）',
      note: '「每恢复精力/每购买商品提升的训练加成」有上限；升级后 35%。',
      formulaRole: '资料'
    },

    /* ======================= 新境界 / 力竭 / 养成（T5.1） ======================= */
    {
      id: 'realmThreshold1',
      group: '新境界 / 力竭 / 养成',
      label: '新境界阈值 I',
      value: 1300,
      min: 0,
      max: 99999,
      step: 10,
      unit: '属性值',
      confidence: '多源一致',
      source: 'T3 model v3.2 attributes.new_realm.thresholds：[1300, 1400, 1600]（客户端数值区确证，9game「1300 破限」正式确认）',
      note: '训练中 A 层属性达到阈值触发新境界，上限 +200；档位与技能/强化相关，非全员同一阈值。',
      formulaRole: '资料'
    },
    {
      id: 'realmThreshold2',
      group: '新境界 / 力竭 / 养成',
      label: '新境界阈值 II',
      value: 1400,
      min: 0,
      max: 99999,
      step: 10,
      unit: '属性值',
      confidence: '多源一致',
      source: 'T3 model v3.2 attributes.new_realm.thresholds（同上）',
      note: '第二档新境界阈值。',
      formulaRole: '资料'
    },
    {
      id: 'realmThreshold3',
      group: '新境界 / 力竭 / 养成',
      label: '新境界阈值 III',
      value: 1600,
      min: 0,
      max: 99999,
      step: 10,
      unit: '属性值',
      confidence: '多源一致',
      source: 'T3 model v3.2 attributes.new_realm.thresholds（同上）',
      note: '第三档新境界阈值。',
      formulaRole: '资料'
    },
    {
      id: 'realmCapBonus',
      group: '新境界 / 力竭 / 养成',
      label: '新境界属性上限加成',
      value: 200,
      min: 0,
      max: 999,
      step: 10,
      unit: '点',
      confidence: '多源一致',
      source: 'T3 model v3.2 attributes.new_realm.attribute_cap_bonus：触发新境界后属性上限 +200（客户端数值区确证）',
      note: '触发新境界后属性上限 +200；「属性折半」机制存在（比例待验证）。',
      formulaRole: '资料'
    },
    {
      id: 'exhaustionPenaltyPct',
      group: '新境界 / 力竭 / 养成',
      label: '力竭全属性衰减',
      value: 30,
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      confidence: '待验证',
      source: 'T3 model v3.2 battle.exhaustion.penalty_magnitude：力竭全属性下降，幅度未确证（区间 20%~40%）；本值取中位 30%',
      note: '模拟器当前使用默认 30%（beta）；客户端确证「力竭时全属性下降」。',
      formulaRole: '资料'
    },
    {
      id: 'exhaustionResistPct',
      group: '新境界 / 力竭 / 养成',
      label: '力竭抵抗档位',
      value: 0,
      min: 0,
      max: 12,
      step: 1,
      unit: '%',
      confidence: '多源一致',
      source: 'T3 model v3.2 battle.exhaustion.deepen_resist_tiers：力竭加深/抵抗档位 +1%~+12%（客户端数值区确证）',
      note: '技能/器材提供的力竭抵抗档位；0 = 无。',
      formulaRole: '资料'
    },
    {
      id: 'exprConsistencyProbTierPct',
      group: '表情爆发',
      label: '一致概率档位（7 档）',
      value: 15,
      min: 15,
      max: 25,
      step: 1,
      unit: '%',
      confidence: '多源一致',
      source: 'T3 model v3.2 expression.consistency_probability_progression：[15,17,19,20,22,23,25]%（客户端数值区确证 7 档）',
      note: '「全部表情一致概率额外增加」7 档：15/17/19/20/22/23/25%。与「一致概率加成」参数同义，可二选一使用。',
      formulaRole: '资料'
    },
    {
      id: 'exprConsistencyMultTierPct',
      group: '表情爆发',
      label: '一致倍率档位（7 档）',
      value: 25,
      min: 25,
      max: 35,
      step: 1,
      unit: '%',
      confidence: '多源一致',
      source: 'T3 model v3.2 expression.consistency_multiplier_progression：[25,27,29,30,32,34,35]%（客户端数值区确证 7 档）',
      note: '一致倍率 7 档；可能是「倍率提升比例」（2.5×(1+档位)）或直接倍率，与社区真崎 2.5+0.25 的对齐关系待验证。',
      formulaRole: '资料'
    },
    {
      id: 'trainingFailurePct',
      group: '新境界 / 力竭 / 养成',
      label: '训练失败率档位',
      value: 0,
      min: 0,
      max: 100,
      step: 1,
      unit: '%',
      confidence: '多源一致',
      source: 'T3 model v3.2 attributes.new_realm.training_failure_rate_tiers：[1,2,4,6,8,20,100]%（客户端数值区确证）',
      note: '失败率档位；失败时收益/精力/熟练度结算规则待验证。0 = 不模拟失败。',
      formulaRole: '资料'
    },
    {
      id: 'resetFreeUntilLevel',
      group: '新境界 / 力竭 / 养成',
      label: '免费重置等级上限',
      value: 50,
      min: 0,
      max: 100,
      step: 1,
      unit: '级',
      confidence: '多源一致',
      source: 'T3 model v3.2 growth.reset_rules.free_until_level：50 级前（含）免费重置（多源一致）',
      note: '50 级前重置免费返还全部资源。',
      formulaRole: '资料'
    },
    {
      id: 'resetCostDiamond',
      group: '新境界 / 力竭 / 养成',
      label: '重置消耗钻石',
      value: 200,
      min: 0,
      max: 9999,
      step: 10,
      unit: '钻石',
      confidence: '多源一致',
      source: 'T3 model v3.2 growth.reset_rules.reset_cost_after：50 级后 200 钻重置（多源一致）',
      note: '超过免费等级后每次重置的钻石消耗。',
      formulaRole: '资料'
    },

    /* ======================= 预留（T5） ======================= */
    {
      id: 'staminaMax',
      group: '预留（T5）',
      label: '精力上限',
      value: 100,
      min: 0,
      max: 999,
      step: 1,
      unit: '点',
      confidence: '待验证',
      source: 'T3 全模型（knowledge/model.json）就绪后接入，当前为占位',
      note: '占位参数：当前不参与任何计算，仅用于展示参数区结构。',
      formulaRole: '预留'
    },
    {
      id: 'matchBaseScore',
      group: '预留（T5）',
      label: '比赛基础评分',
      value: 100,
      min: 0,
      max: 99999,
      step: 1,
      unit: '分',
      confidence: '待验证',
      source: 'T3 全模型就绪后接入，当前为占位',
      note: '占位参数：比赛模拟器（T5）将使用。',
      formulaRole: '预留'
    },
    {
      id: 'growthExpBase',
      group: '预留（T5）',
      label: '养成经验基础值',
      value: 10,
      min: 0,
      max: 9999,
      step: 1,
      unit: 'exp',
      confidence: '待验证',
      source: 'T3 全模型就绪后接入，当前为占位',
      note: '占位参数：养成计算器（T5）将使用。',
      formulaRole: '预留'
    }
  ];

  var PARAM_GROUPS = ['训练收益', '心情 / 场地', '表情爆发', '暴击 / 熟练度', '新境界 / 力竭 / 养成', '预留（T5）'];

  var byId = Object.create(null);
  PARAM_DEFS.forEach(function (def) {
    byId[def.id] = def;
  });

  /**
   * 上阵角色技能加值：每个表情都会吃到这些角色的技能加成（线性相加）。
   * 数值来自 T4 任务给定的社区实测；后续 T5 由 knowledge/model.json 覆盖。
   */
  var DEFAULT_TEAM_SKILLS = [
    {
      id: 'mochizuki-toru',
      name: '望月 透',
      bonusPct: 8,
      confidence: '实测',
      source: '社区实测：望月 +8%（T4 任务给定公式）'
    },
    {
      id: 'ryuguji-shinoha',
      name: '龙宫寺 心叶',
      bonusPct: 4,
      confidence: '实测',
      source: '社区实测：龙宫寺 +4%（T4 任务给定公式）'
    }
  ];

  /** 表情一致倍率的额外加值（真崎：2.5 + 0.25）。 */
  var DEFAULT_CONSISTENCY_EXTRAS = [
    {
      id: 'masaki-teruyo',
      name: '真崎 辉世',
      extra: 0.25,
      confidence: '实测',
      source: '社区实测：真崎一致倍率 = 2.5 + 0.25（T4 任务给定公式）'
    }
  ];

  var STATE_VERSION = 1;
  var STORAGE_KEY = 'bbt.state.v1';

  function isFiniteNumber(v) {
    return typeof v === 'number' && isFinite(v);
  }

  function toNumber(v, fallback) {
    if (typeof v === 'number' && isFinite(v)) return v;
    if (typeof v === 'string' && v.trim() !== '') {
      var n = Number(v);
      if (isFinite(n)) return n;
    }
    return fallback;
  }

  function clampValue(v, min, max) {
    var n = toNumber(v, NaN);
    if (!isFinite(n)) return NaN;
    if (typeof min === 'number' && n < min) n = min;
    if (typeof max === 'number' && n > max) n = max;
    return n;
  }

  function roundToStep(v, step) {
    if (!isFiniteNumber(v) || !isFiniteNumber(step) || step <= 0) return v;
    var digits = (String(step).split('.')[1] || '').length;
    var scaled = Math.round(v / step) * step;
    return Number(scaled.toFixed(Math.min(digits, 6)));
  }

  /** 默认数值表：{ paramId: number } */
  function getDefaults() {
    var out = {};
    PARAM_DEFS.forEach(function (def) {
      out[def.id] = def.value;
    });
    return out;
  }

  function normalizeConfidence(c) {
    if (typeof c === 'string' && CONFIDENCE[c]) return c;
    return '待验证';
  }

  function sanitizeTeamSkills(list) {
    var out = [];
    if (!Array.isArray(list)) return out;
    list.slice(0, 12).forEach(function (item, i) {
      if (!item || typeof item !== 'object') return;
      var bonus = toNumber(item.bonusPct, NaN);
      if (!isFinite(bonus)) return;
      bonus = clampValue(bonus, 0, 100);
      out.push({
        id: typeof item.id === 'string' && item.id ? item.id : 'skill-' + i + '-' + out.length,
        name: String(item.name || '未命名角色').slice(0, 24),
        bonusPct: roundToStep(bonus, 0.5),
        confidence: normalizeConfidence(item.confidence),
        source: String(item.source || '用户手动编辑').slice(0, 200)
      });
    });
    return out;
  }

  function sanitizeConsistencyExtras(list) {
    var out = [];
    if (!Array.isArray(list)) return out;
    list.slice(0, 12).forEach(function (item, i) {
      if (!item || typeof item !== 'object') return;
      var extra = toNumber(item.extra, NaN);
      if (!isFinite(extra)) return;
      extra = clampValue(extra, 0, 10);
      out.push({
        id: typeof item.id === 'string' && item.id ? item.id : 'extra-' + i + '-' + out.length,
        name: String(item.name || '未命名角色').slice(0, 24),
        extra: roundToStep(extra, 0.05),
        confidence: normalizeConfidence(item.confidence),
        source: String(item.source || '用户手动编辑').slice(0, 200)
      });
    });
    return out;
  }

  /**
   * 把任意来源的（可能损坏的）状态归一化成合法状态。
   * 缺字段补默认、越界 clamp、坏数组丢弃。
   */
  function normalizeState(raw) {
    var src = raw && typeof raw === 'object' ? raw : {};
    var rawValues = src.values && typeof src.values === 'object' ? src.values : {};
    var values = {};
    PARAM_DEFS.forEach(function (def) {
      var v = rawValues[def.id];
      var n = clampValue(v, def.min, def.max);
      if (!isFinite(n)) n = def.value;
      values[def.id] = roundToStep(n, def.step);
    });
    var ui = src.ui && typeof src.ui === 'object' ? src.ui : {};
    var theme = ui.theme === 'dark' ? 'dark' : 'light';
    var trainingKind = ui.trainingKind === 'willpower' ? 'willpower' : 'main';
    var trainingLevel = clampValue(ui.trainingLevel, 1, 30);
    if (!isFinite(trainingLevel)) trainingLevel = 1;
    trainingLevel = Math.round(trainingLevel);
    var exprSlots = clampValue(ui.exprSlots, 1, 12);
    if (!isFinite(exprSlots)) exprSlots = 6;
    exprSlots = Math.round(exprSlots);
    var exprTrainingValue = clampValue(ui.exprTrainingValue, 0, 1e6);
    if (!isFinite(exprTrainingValue)) exprTrainingValue = 16;
    var TRAINING_ITEM_IDS = ['shot', 'jump', 'defense', 'stamina', 'handle', 'awareness'];
    var trainingItem = typeof ui.trainingItem === 'string' ? ui.trainingItem : 'shot';
    if (TRAINING_ITEM_IDS.indexOf(trainingItem) < 0) trainingItem = 'shot';
    var notesMain = typeof ui.notesMain === 'string' ? ui.notesMain.slice(0, 40) : '';
    var XIYA_MODES = ['none', '1', '2', '3', 'avg'];
    var xiyaMode = typeof ui.xiyaMode === 'string' ? ui.xiyaMode : 'none';
    if (XIYA_MODES.indexOf(xiyaMode) < 0) xiyaMode = 'none';
    var teamSkills = Array.isArray(src.teamSkills)
      ? sanitizeTeamSkills(src.teamSkills)
      : sanitizeTeamSkills(DEFAULT_TEAM_SKILLS);
    var consistencyExtras = Array.isArray(src.consistencyExtras)
      ? sanitizeConsistencyExtras(src.consistencyExtras)
      : sanitizeConsistencyExtras(DEFAULT_CONSISTENCY_EXTRAS);
    return {
      version: STATE_VERSION,
      values: values,
      teamSkills: teamSkills,
      consistencyExtras: consistencyExtras,
      ui: {
        theme: theme,
        trainingKind: trainingKind,
        trainingLevel: trainingLevel,
        trainingItem: trainingItem,
        notesMain: notesMain,
        exprSlots: exprSlots,
        exprTrainingValue: exprTrainingValue,
        xiyaMode: xiyaMode
      }
    };
  }

  function createState() {
    return normalizeState({});
  }

  /** 只读校验：返回错误信息数组，供自测与导入功能使用。 */
  function validateState(state) {
    var errors = [];
    if (!state || typeof state !== 'object') {
      errors.push('状态不是对象');
      return errors;
    }
    if (!state.values || typeof state.values !== 'object') errors.push('缺少 values');
    else {
      PARAM_DEFS.forEach(function (def) {
        var v = state.values[def.id];
        if (!isFiniteNumber(v)) errors.push('参数 ' + def.id + ' 不是有限数字');
        else if (v < def.min || v > def.max) errors.push('参数 ' + def.id + ' 越界');
      });
    }
    if (!Array.isArray(state.teamSkills)) errors.push('teamSkills 不是数组');
    if (!Array.isArray(state.consistencyExtras)) errors.push('consistencyExtras 不是数组');
    return errors;
  }

  /**
   * 应用 T3 模型参数覆盖（构建期由 build-model.mjs 生成 paramOverrides）。
   * 只改「默认值 / 置信度 / 来源 / 版本信息」，不影响用户已保存的状态。
   * @returns {string[]} 已应用的参数 id
   */
  function applyModelOverrides(overrides) {
    var applied = [];
    if (!Array.isArray(overrides)) return applied;
    overrides.forEach(function (ov) {
      if (!ov || typeof ov.id !== 'string') return;
      var def = byId[ov.id];
      if (!def) return;
      if (typeof ov.value === 'number' && isFinite(ov.value)) {
        var clamped = ov.value;
        if (typeof def.min === 'number' && clamped < def.min) clamped = def.min;
        if (typeof def.max === 'number' && clamped > def.max) clamped = def.max;
        def.value = roundToStep(clamped, def.step);
      }
      if (ov.confidence && CONFIDENCE[ov.confidence]) def.confidence = ov.confidence;
      if (ov.source) def.source = String(ov.source).slice(0, 300);
      if (ov.note) def.note = String(ov.note).slice(0, 300);
      if (ov.versions && typeof ov.versions === 'object') def.versions = ov.versions;
      if (ov.unit) def.unit = String(ov.unit).slice(0, 12);
      applied.push(ov.id);
    });
    return applied;
  }

  return {
    CONFIDENCE: CONFIDENCE,
    CONFIDENCE_ORDER: CONFIDENCE_ORDER,
    PARAM_DEFS: PARAM_DEFS,
    PARAM_GROUPS: PARAM_GROUPS,
    byId: byId,
    DEFAULT_TEAM_SKILLS: DEFAULT_TEAM_SKILLS,
    DEFAULT_CONSISTENCY_EXTRAS: DEFAULT_CONSISTENCY_EXTRAS,
    STATE_VERSION: STATE_VERSION,
    STORAGE_KEY: STORAGE_KEY,
    getDefaults: getDefaults,
    createState: createState,
    normalizeState: normalizeState,
    validateState: validateState,
    applyModelOverrides: applyModelOverrides,
    clampValue: clampValue,
    roundToStep: roundToStep,
    toNumber: toNumber
  };
});

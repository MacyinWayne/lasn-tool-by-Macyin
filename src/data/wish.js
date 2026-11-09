/** src/data/wish.js —— 【自动生成，请勿手改】养成配队页·角色心愿事件大成功规则数据 */
window.BBTWishData = {
 "schema": "wish-v1",
 "generatedAt": "2026-11-09",
 "source": "data/structured/wish_groups.json + wish_events.json（res19 客户端配置 + 用户实测口径）",
 "confidenceScale": {
  "客户端实测 · 完全可信": "用户实机测出的大成功条件，直接视为客户端实测证据",
  "基本可信（仅心愿这一项）": "用户根据机制/经验推测，仅用于心愿事件这一项参考",
  "基本可信（用户口径）": "用户提供的机制口径（未逐局实测）",
  "参考（配置线索）": "仅配置字段/文案线索，未验证",
  "待实测": "配置层无线索，需实测"
 },
 "groups": [
  {
   "type": "炒股心愿",
   "judgeStyle": "单次判定",
   "members": [
    "亚理纱 贾斯敏",
    "闪堂电",
    "藤松 玖怜",
    "清水 万里"
   ],
   "rule": "已实测：四周炒股后净收入为四人排行榜第一 → 大成功/完美。未证实（群友说法）：即使不是第一，净收入达到某阈值也可能完美；阈值未知（用户均走第一名完美方式，未测出非第一的样本）。",
   "evidence": "用户实测（第一名方式）＋群友未验证说法",
   "confidenceLabel": "客户端实测（已确认部分·完全可信）+ 未验证分支"
  },
  {
   "type": "训练心愿",
   "judgeStyle": "单次判定",
   "members": [
    "仓理 清良",
    "绿川 步梦",
    "六道 薰",
    "美星 栗栖"
   ],
   "rule": "任务条件为「属性达到 Count」（完成条件表可读：random_property/add_property_list）；达到阈值=达成，大成功附加条件未写明",
   "evidence": "配置 + 推测",
   "confidenceLabel": "基本可信（仅心愿这一项）"
  },
  {
   "type": "队友要求心愿",
   "judgeStyle": "单次判定",
   "members": [
    "龙宫寺 心叶",
    "出羽 十明",
    "林原 树里"
   ],
   "rule": "出羽十明未实装，暂无法判断（其余同类型角色可能不同）",
   "evidence": "用户口径",
   "confidenceLabel": "基本可信（用户口径）"
  },
  {
   "type": "跑团心愿",
   "judgeStyle": "多次判定（全部成功）",
   "members": [
    "近江 奏",
    "名雪 纱夜",
    "羽濑川 湊"
   ],
   "rule": "**所有检定全部成功 → 完美**（用户实测 2026-11-09；此前“四周内一次判定大成功/单纯成功不够”为记错，已修正）",
   "evidence": "用户实测 2026-11-09",
   "confidenceLabel": "客户端实测 · 完全可信"
  },
  {
   "type": "占卜心愿",
   "judgeStyle": "未知",
   "members": [
    "先斗 月绮",
    "卧云 真昼",
    "和歌 初咲"
   ],
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidenceLabel": "参考（配置线索）"
  },
  {
   "type": "游戏卡收集心愿",
   "judgeStyle": "未确认",
   "members": [
    "皆川 式",
    "降旗 千红纱"
   ],
   "rule": "收集类（判定方式未确认）：可能纯收集达阈值，也可能收集后兑换/抽奖（以转盘大成功判定，如白神抽奖券）；需按角色实测。",
   "evidence": "配置推断",
   "confidenceLabel": "待实测"
  },
  {
   "type": "钓鱼心愿",
   "judgeStyle": "单次判定",
   "members": [
    "佐久间 雨乃",
    "真崎 辉世"
   ],
   "rule": "四周钓鱼行动中，转盘出现一次「大成功」即为完美/大成功",
   "evidence": "用户实测",
   "confidenceLabel": "客户端实测 · 完全可信"
  },
  {
   "type": "做菜心愿",
   "judgeStyle": "单次判定",
   "members": [
    "千圣·贝尔丝",
    "春澄 永远"
   ],
   "rule": "同钓鱼：四周行动中，转盘出现一次「大成功」即完美",
   "evidence": "用户实测",
   "confidenceLabel": "客户端实测 · 完全可信"
  },
  {
   "type": "汉堡券收集心愿",
   "judgeStyle": "未确认",
   "members": [
    "澪奈·贾妮丝"
   ],
   "rule": "收集类（判定方式未确认）：可能纯收集达阈值，也可能收集后兑换/抽奖（以转盘大成功判定，如白神抽奖券）；需按角色实测。",
   "evidence": "配置推断",
   "confidenceLabel": "待实测"
  },
  {
   "type": "粉丝心愿",
   "judgeStyle": "未知",
   "members": [
    "和泉 香织"
   ],
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidenceLabel": "参考（配置线索）"
  },
  {
   "type": "游戏开发心愿",
   "judgeStyle": "未知",
   "members": [
    "洺瑶"
   ],
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidenceLabel": "参考（配置线索）"
  },
  {
   "type": "训练/队友训练心愿",
   "judgeStyle": "未知",
   "members": [
    "克拉丽丝·波洛"
   ],
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidenceLabel": "参考（配置线索）"
  },
  {
   "type": "汽水收集心愿",
   "judgeStyle": "未确认",
   "members": [
    "早濑 千秋"
   ],
   "rule": "收集类（判定方式未确认）：可能纯收集达阈值，也可能收集后兑换/抽奖（以转盘大成功判定，如白神抽奖券）；需按角色实测。",
   "evidence": "配置推断",
   "confidenceLabel": "待实测"
  },
  {
   "type": "碎片收集心愿",
   "judgeStyle": "未确认",
   "members": [
    "羽田 朱志香"
   ],
   "rule": "收集类（判定方式未确认）：可能纯收集达阈值，也可能收集后兑换/抽奖（以转盘大成功判定，如白神抽奖券）；需按角色实测。",
   "evidence": "配置推断",
   "confidenceLabel": "待实测"
  },
  {
   "type": "灵感/tag搭配心愿",
   "judgeStyle": "未知",
   "members": [
    "望月 透"
   ],
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidenceLabel": "参考（配置线索）"
  },
  {
   "type": "建材收集心愿",
   "judgeStyle": "未确认",
   "members": [
    "百目鬼 剑"
   ],
   "rule": "收集类（判定方式未确认）：可能纯收集达阈值，也可能收集后兑换/抽奖（以转盘大成功判定，如白神抽奖券）；需按角色实测。",
   "evidence": "配置推断",
   "confidenceLabel": "待实测"
  },
  {
   "type": "队友训练心愿",
   "judgeStyle": "单次判定",
   "members": [
    "雨森 琉璃"
   ],
   "rule": "队友训练次数/队友要求；参考任务提示「完成四个队友的要求，或许会有惊喜？」",
   "evidence": "配置推断",
   "confidenceLabel": "待实测"
  },
  {
   "type": "鲜花券收集心愿",
   "judgeStyle": "未确认",
   "members": [
    "毒岛 黛也"
   ],
   "rule": "收集类（判定方式未确认）：可能纯收集达阈值，也可能收集后兑换/抽奖（以转盘大成功判定，如白神抽奖券）；需按角色实测。",
   "evidence": "配置推断",
   "confidenceLabel": "待实测"
  },
  {
   "type": "画画心愿",
   "judgeStyle": "未知",
   "members": [
    "稻叶 杏里"
   ],
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidenceLabel": "参考（配置线索）"
  },
  {
   "type": "比赛数据心愿",
   "judgeStyle": "未知",
   "members": [
    "榎本 纯那"
   ],
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidenceLabel": "参考（配置线索）"
  },
  {
   "type": "潜水心愿",
   "judgeStyle": "单次判定",
   "members": [
    "野上 泷"
   ],
   "rule": "同钓鱼：四周行动中，转盘出现一次「大成功」即完美",
   "evidence": "用户实测",
   "confidenceLabel": "客户端实测 · 完全可信"
  },
  {
   "type": "演唱会心愿",
   "judgeStyle": "未知",
   "members": [
    "远野 桐"
   ],
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidenceLabel": "参考（配置线索）"
  },
  {
   "type": "抽奖券收集心愿",
   "judgeStyle": "转盘/抽奖式",
   "members": [
    "白神 时久"
   ],
   "rule": "日常训练收集抽奖券；每周四消耗抽奖券进行一次转盘抽奖，至少一次转盘「大成功」= 大成功（判定方式与钓鱼/做菜/潜水接近）",
   "evidence": "用户口径（白神时久）",
   "confidenceLabel": "基本可信（用户口径）"
  },
  {
   "type": "CD收集心愿",
   "judgeStyle": "纯收集阈值",
   "members": [
    "希雅·奥黛拉"
   ],
   "rule": "6 周内收集齐 4 组 CD 碎片 → 直接完美；第 6 周会通过事件补 10 CD 碎片，因此基本 100% 完美",
   "evidence": "用户口径（希雅）",
   "confidenceLabel": "基本可信（用户口径）"
  }
 ],
 "openQuestions": [
  {
   "type": "其他收集类心愿（汉堡券/汽水/碎片/建材/鲜花券/游戏卡等）",
   "question": "判定方式是纯收集达阈值，还是收集后兑换/抽奖（以转盘大成功判定）？",
   "possibleRule": "纯收集阈值 或 转盘大成功（按角色不同）",
   "status": "用户口径：收集类不一定都是真收集；已确认白神=抽奖券转盘式、希雅=CD纯收集阈值",
   "testHint": "看该心愿的最终操作：若是\"收集后消耗进行抽奖/兑换→转盘\"，按转盘大成功判定；若是\"集齐 N 组即结算\"，按纯收集阈值。"
  },
  {
   "type": "炒股心愿",
   "question": "非第一但净收入足够高是否也能完美？",
   "possibleRule": "净收入 ≥ 某阈值（未知）",
   "status": "群友说法，未验证",
   "testHint": "走一局非第一但净收入较高的炒股，记录四周净收入数值与最终结果；或对比「第一但净收入低」vs「非第一但净收入高」两组二分找阈值。配置侧佐证：事件触发类型含「育成股票净收入范围」，说明净收入阈值在系统里存在。"
  },
  {
   "type": "跑团心愿",
   "question": "四周内出现一次「判定大成功（基础点数20）」是否即完美？",
   "possibleRule": "四周内至少一次判定大成功",
   "status": "用户推测，待验证",
   "testHint": "记录每周判定基础点数与结果；若出现单周≥20 但未完美，或四周全普通成功仍未完美，即可验证/否定。"
  }
 ],
 "byName": {
  "亚理纱 贾斯敏": {
   "characterId": 1005,
   "wishType": "炒股心愿",
   "judgeStyle": "单次判定",
   "rule": "已实测：四周炒股后净收入为四人排行榜第一 → 大成功/完美。未证实（群友说法）：即使不是第一，净收入达到某阈值也可能完美；阈值未知（用户均走第一名完美方式，未测出非第一的样本）。",
   "evidence": "用户实测（第一名方式）＋群友未验证说法",
   "confidence": "实测（第一）/ 待验证（阈值）",
   "confidenceLabel": "客户端实测（已确认部分·完全可信）+ 未验证分支",
   "sameTypeMembers": [
    "亚理纱 贾斯敏",
    "闪堂电",
    "藤松 玖怜",
    "清水 万里"
   ],
   "memberCount": 4
  },
  "闪堂电": {
   "characterId": 1007,
   "wishType": "炒股心愿",
   "judgeStyle": "单次判定",
   "rule": "已实测：四周炒股后净收入为四人排行榜第一 → 大成功/完美。未证实（群友说法）：即使不是第一，净收入达到某阈值也可能完美；阈值未知（用户均走第一名完美方式，未测出非第一的样本）。",
   "evidence": "用户实测（第一名方式）＋群友未验证说法",
   "confidence": "实测（第一）/ 待验证（阈值）",
   "confidenceLabel": "客户端实测（已确认部分·完全可信）+ 未验证分支",
   "sameTypeMembers": [
    "亚理纱 贾斯敏",
    "闪堂电",
    "藤松 玖怜",
    "清水 万里"
   ],
   "memberCount": 4
  },
  "藤松 玖怜": {
   "characterId": 1014,
   "wishType": "炒股心愿",
   "judgeStyle": "单次判定",
   "rule": "已实测：四周炒股后净收入为四人排行榜第一 → 大成功/完美。未证实（群友说法）：即使不是第一，净收入达到某阈值也可能完美；阈值未知（用户均走第一名完美方式，未测出非第一的样本）。",
   "evidence": "用户实测（第一名方式）＋群友未验证说法",
   "confidence": "实测（第一）/ 待验证（阈值）",
   "confidenceLabel": "客户端实测（已确认部分·完全可信）+ 未验证分支",
   "sameTypeMembers": [
    "亚理纱 贾斯敏",
    "闪堂电",
    "藤松 玖怜",
    "清水 万里"
   ],
   "memberCount": 4
  },
  "清水 万里": {
   "characterId": 1023,
   "wishType": "炒股心愿",
   "judgeStyle": "单次判定",
   "rule": "已实测：四周炒股后净收入为四人排行榜第一 → 大成功/完美。未证实（群友说法）：即使不是第一，净收入达到某阈值也可能完美；阈值未知（用户均走第一名完美方式，未测出非第一的样本）。",
   "evidence": "用户实测（第一名方式）＋群友未验证说法",
   "confidence": "实测（第一）/ 待验证（阈值）",
   "confidenceLabel": "客户端实测（已确认部分·完全可信）+ 未验证分支",
   "sameTypeMembers": [
    "亚理纱 贾斯敏",
    "闪堂电",
    "藤松 玖怜",
    "清水 万里"
   ],
   "memberCount": 4
  },
  "仓理 清良": {
   "characterId": 1008,
   "wishType": "训练心愿",
   "judgeStyle": "单次判定",
   "rule": "任务条件为「属性达到 Count」（完成条件表可读：random_property/add_property_list）；达到阈值=达成，大成功附加条件未写明",
   "evidence": "配置 + 推测",
   "confidence": "中",
   "confidenceLabel": "基本可信（仅心愿这一项）",
   "sameTypeMembers": [
    "仓理 清良",
    "绿川 步梦",
    "六道 薰",
    "美星 栗栖"
   ],
   "memberCount": 4
  },
  "绿川 步梦": {
   "characterId": 1015,
   "wishType": "训练心愿",
   "judgeStyle": "单次判定",
   "rule": "任务条件为「属性达到 Count」（完成条件表可读：random_property/add_property_list）；达到阈值=达成，大成功附加条件未写明",
   "evidence": "配置 + 推测",
   "confidence": "中",
   "confidenceLabel": "基本可信（仅心愿这一项）",
   "sameTypeMembers": [
    "仓理 清良",
    "绿川 步梦",
    "六道 薰",
    "美星 栗栖"
   ],
   "memberCount": 4
  },
  "六道 薰": {
   "characterId": 1034,
   "wishType": "训练心愿",
   "judgeStyle": "单次判定",
   "rule": "任务条件为「属性达到 Count」（完成条件表可读：random_property/add_property_list）；达到阈值=达成，大成功附加条件未写明",
   "evidence": "配置 + 推测",
   "confidence": "中",
   "confidenceLabel": "基本可信（仅心愿这一项）",
   "sameTypeMembers": [
    "仓理 清良",
    "绿川 步梦",
    "六道 薰",
    "美星 栗栖"
   ],
   "memberCount": 4
  },
  "美星 栗栖": {
   "characterId": 1040,
   "wishType": "训练心愿",
   "judgeStyle": "单次判定",
   "rule": "任务条件为「属性达到 Count」（完成条件表可读：random_property/add_property_list）；达到阈值=达成，大成功附加条件未写明",
   "evidence": "配置 + 推测",
   "confidence": "中",
   "confidenceLabel": "基本可信（仅心愿这一项）",
   "sameTypeMembers": [
    "仓理 清良",
    "绿川 步梦",
    "六道 薰",
    "美星 栗栖"
   ],
   "memberCount": 4
  },
  "龙宫寺 心叶": {
   "characterId": 1002,
   "wishType": "队友要求心愿",
   "judgeStyle": "单次判定",
   "rule": "出羽十明未实装，暂无法判断（其余同类型角色可能不同）",
   "evidence": "用户口径",
   "confidence": "未知",
   "confidenceLabel": "基本可信（用户口径）",
   "sameTypeMembers": [
    "龙宫寺 心叶",
    "出羽 十明",
    "林原 树里"
   ],
   "memberCount": 3
  },
  "出羽 十明": {
   "characterId": 1035,
   "wishType": "队友要求心愿",
   "judgeStyle": "单次判定",
   "rule": "出羽十明未实装，暂无法判断（其余同类型角色可能不同）",
   "evidence": "用户口径",
   "confidence": "未知",
   "confidenceLabel": "基本可信（用户口径）",
   "sameTypeMembers": [
    "龙宫寺 心叶",
    "出羽 十明",
    "林原 树里"
   ],
   "memberCount": 3
  },
  "林原 树里": {
   "characterId": 1039,
   "wishType": "队友要求心愿",
   "judgeStyle": "单次判定",
   "rule": "出羽十明未实装，暂无法判断（其余同类型角色可能不同）",
   "evidence": "用户口径",
   "confidence": "未知",
   "confidenceLabel": "基本可信（用户口径）",
   "sameTypeMembers": [
    "龙宫寺 心叶",
    "出羽 十明",
    "林原 树里"
   ],
   "memberCount": 3
  },
  "近江 奏": {
   "characterId": 1003,
   "wishType": "跑团心愿",
   "judgeStyle": "多次判定（全部成功）",
   "rule": "**所有检定全部成功 → 完美**（用户实测 2026-11-09；此前“四周内一次判定大成功/单纯成功不够”为记错，已修正）",
   "evidence": "用户实测 2026-11-09",
   "confidence": "实测",
   "confidenceLabel": "客户端实测 · 完全可信",
   "sameTypeMembers": [
    "近江 奏",
    "名雪 纱夜",
    "羽濑川 湊"
   ],
   "memberCount": 3
  },
  "名雪 纱夜": {
   "characterId": 1019,
   "wishType": "跑团心愿",
   "judgeStyle": "多次判定（全部成功）",
   "rule": "**所有检定全部成功 → 完美**（用户实测 2026-11-09；此前“四周内一次判定大成功/单纯成功不够”为记错，已修正）",
   "evidence": "用户实测 2026-11-09",
   "confidence": "实测",
   "confidenceLabel": "客户端实测 · 完全可信",
   "sameTypeMembers": [
    "近江 奏",
    "名雪 纱夜",
    "羽濑川 湊"
   ],
   "memberCount": 3
  },
  "羽濑川 湊": {
   "characterId": 1029,
   "wishType": "跑团心愿",
   "judgeStyle": "多次判定（全部成功）",
   "rule": "**所有检定全部成功 → 完美**（用户实测 2026-11-09；此前“四周内一次判定大成功/单纯成功不够”为记错，已修正）",
   "evidence": "用户实测 2026-11-09",
   "confidence": "实测",
   "confidenceLabel": "客户端实测 · 完全可信",
   "sameTypeMembers": [
    "近江 奏",
    "名雪 纱夜",
    "羽濑川 湊"
   ],
   "memberCount": 3
  },
  "先斗 月绮": {
   "characterId": 1032,
   "wishType": "占卜心愿",
   "judgeStyle": "未知",
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidence": "中",
   "confidenceLabel": "参考（配置线索）",
   "sameTypeMembers": [
    "先斗 月绮",
    "卧云 真昼",
    "和歌 初咲"
   ],
   "memberCount": 3
  },
  "卧云 真昼": {
   "characterId": 1033,
   "wishType": "占卜心愿",
   "judgeStyle": "未知",
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidence": "中",
   "confidenceLabel": "参考（配置线索）",
   "sameTypeMembers": [
    "先斗 月绮",
    "卧云 真昼",
    "和歌 初咲"
   ],
   "memberCount": 3
  },
  "和歌 初咲": {
   "characterId": 1036,
   "wishType": "占卜心愿",
   "judgeStyle": "未知",
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidence": "中",
   "confidenceLabel": "参考（配置线索）",
   "sameTypeMembers": [
    "先斗 月绮",
    "卧云 真昼",
    "和歌 初咲"
   ],
   "memberCount": 3
  },
  "皆川 式": {
   "characterId": 1017,
   "wishType": "游戏卡收集心愿",
   "judgeStyle": "未确认",
   "rule": "收集类（判定方式未确认）：可能纯收集达阈值，也可能收集后兑换/抽奖（以转盘大成功判定，如白神抽奖券）；需按角色实测。",
   "evidence": "配置推断",
   "confidence": "低",
   "confidenceLabel": "待实测",
   "sameTypeMembers": [
    "皆川 式",
    "降旗 千红纱"
   ],
   "memberCount": 2
  },
  "降旗 千红纱": {
   "characterId": 1038,
   "wishType": "游戏卡收集心愿",
   "judgeStyle": "未确认",
   "rule": "收集类（判定方式未确认）：可能纯收集达阈值，也可能收集后兑换/抽奖（以转盘大成功判定，如白神抽奖券）；需按角色实测。",
   "evidence": "配置推断",
   "confidence": "低",
   "confidenceLabel": "待实测",
   "sameTypeMembers": [
    "皆川 式",
    "降旗 千红纱"
   ],
   "memberCount": 2
  },
  "佐久间 雨乃": {
   "characterId": 1020,
   "wishType": "钓鱼心愿",
   "judgeStyle": "单次判定",
   "rule": "四周钓鱼行动中，转盘出现一次「大成功」即为完美/大成功",
   "evidence": "用户实测",
   "confidence": "实测",
   "confidenceLabel": "客户端实测 · 完全可信",
   "sameTypeMembers": [
    "佐久间 雨乃",
    "真崎 辉世"
   ],
   "memberCount": 2
  },
  "真崎 辉世": {
   "characterId": 1030,
   "wishType": "钓鱼心愿",
   "judgeStyle": "单次判定",
   "rule": "四周钓鱼行动中，转盘出现一次「大成功」即为完美/大成功",
   "evidence": "用户实测",
   "confidence": "实测",
   "confidenceLabel": "客户端实测 · 完全可信",
   "sameTypeMembers": [
    "佐久间 雨乃",
    "真崎 辉世"
   ],
   "memberCount": 2
  },
  "千圣·贝尔丝": {
   "characterId": 1021,
   "wishType": "做菜心愿",
   "judgeStyle": "单次判定",
   "rule": "同钓鱼：四周行动中，转盘出现一次「大成功」即完美",
   "evidence": "用户实测",
   "confidence": "实测",
   "confidenceLabel": "客户端实测 · 完全可信",
   "sameTypeMembers": [
    "千圣·贝尔丝",
    "春澄 永远"
   ],
   "memberCount": 2
  },
  "春澄 永远": {
   "characterId": 1025,
   "wishType": "做菜心愿",
   "judgeStyle": "单次判定",
   "rule": "同钓鱼：四周行动中，转盘出现一次「大成功」即完美",
   "evidence": "用户实测",
   "confidence": "实测",
   "confidenceLabel": "客户端实测 · 完全可信",
   "sameTypeMembers": [
    "千圣·贝尔丝",
    "春澄 永远"
   ],
   "memberCount": 2
  },
  "澪奈·贾妮丝": {
   "characterId": 1001,
   "wishType": "汉堡券收集心愿",
   "judgeStyle": "未确认",
   "rule": "收集类（判定方式未确认）：可能纯收集达阈值，也可能收集后兑换/抽奖（以转盘大成功判定，如白神抽奖券）；需按角色实测。",
   "evidence": "配置推断",
   "confidence": "低",
   "confidenceLabel": "待实测",
   "sameTypeMembers": [
    "澪奈·贾妮丝"
   ],
   "memberCount": 1
  },
  "和泉 香织": {
   "characterId": 1004,
   "wishType": "粉丝心愿",
   "judgeStyle": "未知",
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidence": "中",
   "confidenceLabel": "参考（配置线索）",
   "sameTypeMembers": [
    "和泉 香织"
   ],
   "memberCount": 1
  },
  "洺瑶": {
   "characterId": 1006,
   "wishType": "游戏开发心愿",
   "judgeStyle": "未知",
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidence": "中",
   "confidenceLabel": "参考（配置线索）",
   "sameTypeMembers": [
    "洺瑶"
   ],
   "memberCount": 1
  },
  "克拉丽丝·波洛": {
   "characterId": 1009,
   "wishType": "训练/队友训练心愿",
   "judgeStyle": "未知",
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidence": "中",
   "confidenceLabel": "参考（配置线索）",
   "sameTypeMembers": [
    "克拉丽丝·波洛"
   ],
   "memberCount": 1
  },
  "早濑 千秋": {
   "characterId": 1010,
   "wishType": "汽水收集心愿",
   "judgeStyle": "未确认",
   "rule": "收集类（判定方式未确认）：可能纯收集达阈值，也可能收集后兑换/抽奖（以转盘大成功判定，如白神抽奖券）；需按角色实测。",
   "evidence": "配置推断",
   "confidence": "低",
   "confidenceLabel": "待实测",
   "sameTypeMembers": [
    "早濑 千秋"
   ],
   "memberCount": 1
  },
  "羽田 朱志香": {
   "characterId": 1011,
   "wishType": "碎片收集心愿",
   "judgeStyle": "未确认",
   "rule": "收集类（判定方式未确认）：可能纯收集达阈值，也可能收集后兑换/抽奖（以转盘大成功判定，如白神抽奖券）；需按角色实测。",
   "evidence": "配置推断",
   "confidence": "低",
   "confidenceLabel": "待实测",
   "sameTypeMembers": [
    "羽田 朱志香"
   ],
   "memberCount": 1
  },
  "望月 透": {
   "characterId": 1012,
   "wishType": "灵感/tag搭配心愿",
   "judgeStyle": "未知",
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidence": "中",
   "confidenceLabel": "参考（配置线索）",
   "sameTypeMembers": [
    "望月 透"
   ],
   "memberCount": 1
  },
  "百目鬼 剑": {
   "characterId": 1013,
   "wishType": "建材收集心愿",
   "judgeStyle": "未确认",
   "rule": "收集类（判定方式未确认）：可能纯收集达阈值，也可能收集后兑换/抽奖（以转盘大成功判定，如白神抽奖券）；需按角色实测。",
   "evidence": "配置推断",
   "confidence": "低",
   "confidenceLabel": "待实测",
   "sameTypeMembers": [
    "百目鬼 剑"
   ],
   "memberCount": 1
  },
  "雨森 琉璃": {
   "characterId": 1016,
   "wishType": "队友训练心愿",
   "judgeStyle": "单次判定",
   "rule": "队友训练次数/队友要求；参考任务提示「完成四个队友的要求，或许会有惊喜？」",
   "evidence": "配置推断",
   "confidence": "低",
   "confidenceLabel": "待实测",
   "sameTypeMembers": [
    "雨森 琉璃"
   ],
   "memberCount": 1
  },
  "毒岛 黛也": {
   "characterId": 1018,
   "wishType": "鲜花券收集心愿",
   "judgeStyle": "未确认",
   "rule": "收集类（判定方式未确认）：可能纯收集达阈值，也可能收集后兑换/抽奖（以转盘大成功判定，如白神抽奖券）；需按角色实测。",
   "evidence": "配置推断",
   "confidence": "低",
   "confidenceLabel": "待实测",
   "sameTypeMembers": [
    "毒岛 黛也"
   ],
   "memberCount": 1
  },
  "稻叶 杏里": {
   "characterId": 1022,
   "wishType": "画画心愿",
   "judgeStyle": "未知",
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidence": "中",
   "confidenceLabel": "参考（配置线索）",
   "sameTypeMembers": [
    "稻叶 杏里"
   ],
   "memberCount": 1
  },
  "榎本 纯那": {
   "characterId": 1024,
   "wishType": "比赛数据心愿",
   "judgeStyle": "未知",
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidence": "中",
   "confidenceLabel": "参考（配置线索）",
   "sameTypeMembers": [
    "榎本 纯那"
   ],
   "memberCount": 1
  },
  "野上 泷": {
   "characterId": 1037,
   "wishType": "潜水心愿",
   "judgeStyle": "单次判定",
   "rule": "同钓鱼：四周行动中，转盘出现一次「大成功」即完美",
   "evidence": "用户实测",
   "confidence": "实测",
   "confidenceLabel": "客户端实测 · 完全可信",
   "sameTypeMembers": [
    "野上 泷"
   ],
   "memberCount": 1
  },
  "远野 桐": {
   "characterId": 1042,
   "wishType": "演唱会心愿",
   "judgeStyle": "未知",
   "rule": "配置层无线索，待实测",
   "evidence": "配置推断（阈值未写明）",
   "confidence": "中",
   "confidenceLabel": "参考（配置线索）",
   "sameTypeMembers": [
    "远野 桐"
   ],
   "memberCount": 1
  },
  "白神 时久": {
   "characterId": 1045,
   "wishType": "抽奖券收集心愿",
   "judgeStyle": "转盘/抽奖式",
   "rule": "日常训练收集抽奖券；每周四消耗抽奖券进行一次转盘抽奖，至少一次转盘「大成功」= 大成功（判定方式与钓鱼/做菜/潜水接近）",
   "evidence": "用户口径（白神时久）",
   "confidence": "用户口径待确认实测",
   "confidenceLabel": "基本可信（用户口径）",
   "sameTypeMembers": [
    "白神 时久"
   ],
   "memberCount": 1
  },
  "希雅·奥黛拉": {
   "characterId": 1046,
   "wishType": "CD收集心愿",
   "judgeStyle": "纯收集阈值",
   "rule": "6 周内收集齐 4 组 CD 碎片 → 直接完美；第 6 周会通过事件补 10 CD 碎片，因此基本 100% 完美",
   "evidence": "用户口径（希雅）",
   "confidence": "用户口径待确认实测",
   "confidenceLabel": "基本可信（用户口径）",
   "sameTypeMembers": [
    "希雅·奥黛拉"
   ],
   "memberCount": 1
  },
  "森田 莉莉": {
   "characterId": 1026,
   "noWish": true,
   "wishType": "无心愿事件",
   "rule": "蓝色品质（最低品质）角色，没有心愿事件",
   "confidenceLabel": "—",
   "judgeStyle": "—"
  },
  "美伽 未来": {
   "characterId": 1027,
   "noWish": true,
   "wishType": "无心愿事件",
   "rule": "蓝色品质（最低品质）角色，没有心愿事件",
   "confidenceLabel": "—",
   "judgeStyle": "—"
  },
  "五十岚 诗音": {
   "characterId": 1028,
   "noWish": true,
   "wishType": "无心愿事件",
   "rule": "蓝色品质（最低品质）角色，没有心愿事件",
   "confidenceLabel": "—",
   "judgeStyle": "—"
  },
  "阵野 美羽": {
   "characterId": 1031,
   "noWish": true,
   "wishType": "无心愿事件",
   "rule": "未实装（无心愿事件）",
   "confidenceLabel": "—",
   "judgeStyle": "—"
  }
 }
};

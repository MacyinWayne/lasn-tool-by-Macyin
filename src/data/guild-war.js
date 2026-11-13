/** src/data/guild-war.js —— 【自动生成，请勿手改】实战配队 · 协会赛数据（规则原文 + 19 关敌人 + 帮助/奖励） */
window.BBTGuildWarData = {
 "schema": "guild-war-v1",
 "generatedAt": "2026-11-14 07:53",
 "source": {
  "client": "res21 / 1.0.23（data/client/reverse_20261113）",
  "files": [
   "data/structured/guild_war_config.json",
   "data/structured/guild_war_matches.json",
   "data/structured/guild_war_enemy_full_attrs.json",
   "data/structured/_client_res21/guild_war_rules_text.json"
  ],
  "report": "knowledge/解包_1.0.23_协会赛_赛制与敌人数据.md"
 },
 "enemyFullAttrs": {
  "rule": {
   "tiers": {
    "普通": {
     "main": 1056,
     "sec": 880,
     "rest": 616
    },
    "中等": {
     "main": 1488,
     "sec": 1240,
     "rest": 868
    },
    "困难": {
     "main": 1920,
     "sec": 1600,
     "rest": 1120
    }
   },
   "tierOrder": [
    "普通",
    "中等",
    "困难"
   ],
   "profiles": {
    "1004": {
     "main": 105,
     "sec": 106,
     "mainName": "运控",
     "secName": "意识"
    },
    "1006": {
     "main": 103,
     "sec": 102,
     "mainName": "防守",
     "secName": "弹跳"
    },
    "1014": {
     "main": 103,
     "sec": 101,
     "mainName": "防守",
     "secName": "投射"
    },
    "1020": {
     "main": 102,
     "sec": 104,
     "mainName": "弹跳",
     "secName": "体能"
    }
   },
   "ultimateFormula": "终局挑战 = 困难档全六维 × propRank/8000（米歇尔特殊：×propRank/12500）",
   "boss": {
    "actorId": 1999,
    "name": "米歇尔·杰奎琳",
    "difficulty": "困难",
    "attrs": {
     "101": 1885,
     "102": 2513,
     "103": 1917,
     "104": 1948,
     "105": 2104,
     "106": 2133
    },
    "sum": 12500,
    "note": "困难档为寒溟实机截图原值（总和=总评 12500）；普通/中等/终局档按「已知 3 项比例 + 总评」补齐（推断）"
   },
   "note": "主/副/其余 = 各难度档三维值；主/副属性由角色位置（profile）决定：和泉 PG 主运控/副意识、藤松 SG 主防守/副投射、佐久间 PF 主弹跳/副体能、洺瑶 C 主防守/副弹跳；米歇尔为 BOSS 特殊分布",
   "verification": {
    "finalRuleVerified": true,
    "rule": "终局挑战 = 困难档全六维 × propRank/8000",
    "detail": "终局和泉/藤松的实机六维（2026-11-13 寒溟截图）与「困难档 × propRank/8000」推导值逐项一致（和泉 1295/1295/1295/1295/2220/1850、藤松 1850/1295/2220/1295/1295/1295）→ 规则验证通过",
    "sumNote": "终局 5 人六维总和均 = propRank 9250（含 出羽/希雅 实机值）",
    "legendaryNote": "出羽十明/希雅·奥黛拉 为「传奇圣山 SS+」特殊分布（实机截图原值，非主/副/其余规则生成）",
    "bossNote": "米歇尔终局档本次未截图，维持推断（困难档实机 × 14500/12500 按已知 3 项+总评补齐）"
   }
  },
  "coverage": {
   "totalEnemies": 95,
   "fullSix": 20,
   "pendingSix": 0,
   "runtimeGenerated": 75,
   "matchesWithFullSix": [
    "16",
    "17",
    "18",
    "19"
   ],
   "finalTeamFull": true,
   "note": "决赛场 16/17/18 共 15 人 + 终局挑战 19 共 5 人 = 20 人六维完整（其中终局出羽/希雅为 2026-11-13 寒溟实机截图；和泉/藤松实机值与此前推导逐项一致；米歇尔终局未截图→推断）；分站赛 match1-15 共 75 人 104-106 为游戏内运行时生成（规则未解出，不编数值）；无待实机项。",
   "stationRuntime": 75
  },
  "pending": [],
  "source": {
   "screenshot": "寒溟实机截图（困难 BOSS 战 5 人全六维）2026-11-13",
   "client": "res21 客户端配置静态 3 项（guild_war_matches.json：101/102/103）",
   "spec": "logs/_gw_full_attrs_spec.json（Lead 推导规格）",
   "screenshotFinal": "寒溟实机截图 2026-11-13（终局挑战 match19：出羽十明/希雅·奥黛拉/和泉香织/藤松玖怜 4 张注册球员面板）"
  },
  "notes": [
   "实机截图值照录（米歇尔困难档 6 维）；其余推断值按截图规则生成并标「推断」。",
   "已知 3 项（101/102/103）来自 res21 客户端静态值，作为交叉验证：生成规则算出的 101-103 与静态值一致（见 checks）。",
   "分站赛 75 人只有静态 3 项，104-106 为游戏内运行时生成；页面显示「运行时生成（未解出）」，不编造。",
   "决赛场 16/17/18 的 15 人六维总和 = 各自 propRank（已验证）；终局和泉/藤松/米歇尔总和 = propRank。",
   "两档 stage（stage.match=2，血量 50~1000）为试训/镜像版，属性是否同规则未验证（本文件只覆盖主赛 match 属性）。",
   "2026-11-13 终局实机补全：出羽十明/希雅·奥黛拉 六维照录寒溟截图（传奇圣山 SS+ 特殊分布）；和泉/藤松 实机值与「困难档×propRank/8000」推导逐项一致 → 规则验证通过；终局 5 人 Σ=propRank 9250。",
   "米歇尔终局档未截图 → 仍标「推断（未截图）」；分站赛 75 人 104-106 仍标「运行时生成（未解出）」。"
  ],
  "checks": {
   "sumMismatch": [],
   "sumChecked": 20,
   "allEqualPropRank": true
  }
 },
 "meta": {
  "title": "协会赛（圣山投射协会赛）",
  "versionNote": "客户端 1.0.23 / res21",
  "ruleSource": "lua_conf_S1.cn.common_help_rule_conf.sw @pool#2028",
  "ruleLength": 1106,
  "scheduleNote": "真实 2026 档期以 common_help_rule_conf 原文为准；guild_war.schedule 表内时间戳为 2027 年占位 → 标「占位，不采用」，实际以服务端为准",
  "enemySource": "guild_war.match → robot_conf 队伍表/机器人表 → 角色卡 actor_id；19/19 关 × 5 人 = 95 机器人（task-6 解包，0 缺失）",
  "enemyAttrNote": "客户端静态表只存 101 投射 / 102 弹跳 / 103 防守 三项；104 体能 / 105 运控 / 106 意识 由游戏内运行时生成（不是「游戏没配」）。决赛场 16/17/18 共 15 人 + 终局挑战 19 共 5 人 = **20 人六维完整**（终局出羽/希雅为 2026-11-13 寒溟实机截图；和泉/藤松实机值与此前推导逐项一致）；分站赛 1-15（75 人）的 104-106 仍「运行时生成（未解出）」，不编造；终局米歇尔未截图 → 标「推断（未截图）」。",
  "enemyFullAttrsNote": "六维补全规则（寒溟实机截图 2026-11-13 困难 BOSS 战 5 人 + 客户端静态 3 项交叉验证）：决赛场三档「主/副/其余」= 困难 1920/1600/1120、中等 1488/1240/868、普通 1056/880/616；终局挑战 = 困难档全六维 × propRank/8000（BOSS 米歇尔特殊 ×propRank/12500）——**已由寒溟终局实机截图验证：和泉/藤松 实机六维与推导值逐项一致**。推断值标「推断」，实机值标「实机截图/实机验证」。",
  "aiNameNote": "分站赛机器人 robot_name 为虚构 AI 名，actor_id 才是实际套用角色 → 页面显示「角色名（AI名）」",
  "phaseConfidence": "环节归属为推断：配置无显式「环节」字段，按 match id/顺序 + stage.show_name + jump_priority 推断",
  "stageMatchNote": "stage.match=1 为主赛（正常血量）、stage.match=2 为低血量 50~1000 的镜像/试训版（推断）；match16/17/18 共用 stage16（difficulty_match_list=[16,17,18]），match19 的 stage17 match_health=0（血量判定不适用）",
  "constNote": "guild_war.const 7 项特殊编码（type codes 81/82/84/85）未解，本页不展示",
  "aiNote": "AI 实际战斗数值/技能强度以游戏内实机为准，本页只列配置值",
  "attrMap": {
   "101": "投射",
   "102": "弹跳",
   "103": "防守",
   "104": "体能",
   "105": "运控",
   "106": "意识",
   "107": "extra107",
   "108": "extra108"
  },
  "positionOrder": [
   "PG",
   "SG",
   "SF",
   "PF",
   "C"
  ],
  "parseHints": {
   "robotPropertyTbl": "客户端静态 property_tbl 只配 101/102/103；104 体能/105 运控/106 意识为游戏内运行时生成（不是「游戏没配」）。决赛场 16/17/18 共 15 人 + 终局 3 人已按寒溟实机规则补全六维（data/structured/guild_war_enemy_full_attrs.json）；分站赛 75 人与终局出羽/希雅标「运行时生成（未解出）」/「待实机」。",
   "robotNames": "分站赛机器人 robot_name 是虚构 AI 名（如「花园 美织」「神崎 春葵」），actor_id 才是实际套用的角色（决定技能/成长）。页面建议显示「角色名（AI 名）」或仅显示 actor_id 对应角色。",
   "决赛场与终局": "match 16/17/18 = 同一个 stage 16/216（difficulty_match_list=[16,17,18]）的三个难度 match；match 19 = stage 17/217，match_health=0（血量判定不适用/由双方属性决定）。",
   "stageMatch": "stage.match=1 为主赛（正常血量），stage.match=2 为低血量（50-1000）镜像/试训版（推断）。"
  }
 },
 "activity": {
  "name": "圣山投射协会赛",
  "openTimeLocal": "2026-11-13 05:00:00 +08",
  "closeTimeLocal": "2026-12-03 04:59:59 +08",
  "openTimeRaw": 1794517200,
  "closeTimeRaw": 1796245199,
  "collectionId": 20,
  "unlockDesc": "通关全国大赛4-10解锁",
  "unlockName": "协会",
  "signupRules": [
   {
    "rule": "仅会长/副会长可报名协会赛",
    "evidence": "tips_conf.sw server_tips id=822 GuildWarSignupFailed"
   },
   {
    "rule": "须在报名期报名",
    "evidence": "tips_conf.sw server_tips id=820 GuildWarNotInSignupTime"
   },
   {
    "rule": "未加入协会无法参与",
    "evidence": "tips_conf.sw server_tips id=821 GuildWarNotInGuild"
   },
   {
    "rule": "报名后协会期间无法退出/被踢",
    "evidence": "tips_conf.sw server_tips id=837 GuildWarSignupLocked"
   }
  ],
  "source": "活动页 meta 取自 activity_collection_conf id=20「圣山投射协会赛」（open/close_time 与规则原文一致）"
 },
 "phases": [
  {
   "key": "preheat",
   "name": "预热期",
   "start": "2026-11-13 05:00:00",
   "end": "2026-11-20 04:59:59"
  },
  {
   "key": "signup",
   "name": "报名期",
   "start": "2026-11-20 05:00:00",
   "end": "2026-11-22 04:59:59"
  },
  {
   "key": "station",
   "name": "分站表演赛",
   "start": "2026-11-22 05:00:00",
   "end": "2026-11-29 04:59:59"
  },
  {
   "key": "final",
   "name": "终局挑战赛",
   "start": "2026-11-29 10:00:00",
   "end": "2026-12-01 04:59:59"
  },
  {
   "key": "settle",
   "name": "结算期",
   "start": "2026-12-01 05:00:00",
   "end": "2026-12-03 04:59:59"
  }
 ],
 "ruleSections": [
  {
   "title": "预热期",
   "items": [
    "1.预热期阶段，各位教练可提前预览本次协会赛的挑战阵容，并基于此准备自己的挑战队伍。",
    "2.本次赛程中，各位教练每日最多可进行2次挑战。",
    "3.已经上阵过的球员不可重复上阵，教练需要准备至少10名球员以备战本次协会赛。"
   ]
  },
  {
   "title": "报名期",
   "items": [
    "1.本次投射协会赛仅支持协会会长/副会长进行报名。",
    "2.仅报名期结束之前加入协会的教练可参与本次协会赛；报名期结束之后加入协会的教练不可参与本次协会赛。",
    "3.报名期结束之后直至完整赛程结束，教练将暂时无法退出协会。"
   ]
  },
  {
   "title": "分站表演赛",
   "items": [
    "1.本次分站表演赛共分为1个决赛场和3个分站赛：入门分站赛、进阶分站赛和精英分站赛。",
    "2.每次挑战后会根据胜负结果、以及比分情况来决定最终得分。",
    "3.表演赛期间教练每日可最多进行2次挑战；已上阵过的球员不可重复上阵。",
    "4.决赛场于11月23日12:00解锁，且需要通关至少其中一个分站赛的全部球场挑战后，才可获得决赛场的挑战资格。通关不同难度分站赛可解锁决赛场的对应挑战难度。",
    "5.决赛场通关之后才可获得下一轮终局挑战赛资格。",
    "6.挑战加成：表演赛期间可获得固定比赛加成效果；挑战决赛场时还可自选额外的支援效果，每个支援效果当日只可使用一次。",
    "7.在分站表演赛中，全部报名参赛的协会进行分组。每个组将根据各个协会的决赛场通关时间，给该组内首个通关决赛场的协会赋予荣誉称号。",
    "8.表演赛结束后，没能及时领取的奖励将通过邮件进行补发。"
   ]
  },
  {
   "title": "终局挑战赛",
   "items": [
    "1.终局挑战赛期间，教练每日最多可进行2次挑战；每次挑战前可自选支援效果，每个支援效果当日只可使用一次。",
    "2.最终计分规则：每次挑战由比赛胜负及比赛表现共同决定最终得分，投射属性越高会影响最终单局比赛评分。每日挑战总分由当日的两次挑战评分组成。最终分数最高的日挑战总分会计入到协会总分中。",
    "3.试训：终局挑战赛期间可进行试训，各位教练可自行选择合适的阵容和支援效果进行试训。试训不消耗当日的挑战机会，且试训后的分数不会计入当日总分中。"
   ]
  },
  {
   "title": "结算期",
   "items": [
    "终局挑战赛的排名奖励将于结算期进行统一发放；",
    "未来得及领取的奖励将通过邮件进行补发。"
   ]
  }
 ],
 "mainRule": {
  "file": "lua_conf_S1.cn.common_help_rule_conf.sw",
  "poolOffset": 2028,
  "plain": "赛程时间\n本次圣山投射协会赛共分为5个阶段：\n预热期：2026.11.13 5:00:00-2026.11.20 4:59:59\n报名期：2026.11.20 5:00:00-2026.11.22 4:59:59\n分站表演赛：2026.11.22 5:00:00-2026.11.29 4:59:59\n终局挑战赛：2026.11.29 10:00:00-2026.12.1 4:59:59\n结算期：2026.12.1 5:00:00-2026.12.3 4:59:59\n\n预热期\n1.预热期阶段，各位教练可提前预览本次协会赛的挑战阵容，并基于此准备自己的挑战队伍。\n2.本次赛程中，各位教练每日最多可进行2次挑战。\n3.已经上阵过的球员不可重复上阵，教练需要准备至少10名球员以备战本次协会赛。\n\n报名期\n1.本次投射协会赛仅支持协会会长/副会长进行报名。\n2.仅报名期结束之前加入协会的教练可参与本次协会赛；报名期结束之后加入协会的教练不可参与本次协会赛。\n3.报名期结束之后直至完整赛程结束，教练将暂时无法退出协会。\n\n分站表演赛\n1.本次分站表演赛共分为1个决赛场和3个分站赛：入门分站赛、进阶分站赛和精英分站赛。\n2.每次挑战后会根据胜负结果、以及比分情况来决定最终得分。\n3.表演赛期间教练每日可最多进行2次挑战；已上阵过的球员不可重复上阵。\n4.决赛场于11月23日12:00解锁，且需要通关至少其中一个分站赛的全部球场挑战后，才可获得决赛场的挑战资格。通关不同难度分站赛可解锁决赛场的对应挑战难度。\n5.决赛场通关之后才可获得下一轮终局挑战赛资格。\n6.挑战加成：表演赛期间可获得固定比赛加成效果；挑战决赛场时还可自选额外的支援效果，每个支援效果当日只可使用一次。\n7.在分站表演赛中，全部报名参赛的协会进行分组。每个组将根据各个协会的决赛场通关时间，给该组内首个通关决赛场的协会赋予荣誉称号。\n8.表演赛结束后，没能及时领取的奖励将通过邮件进行补发。\n\n终局挑战赛\n1.终局挑战赛期间，教练每日最多可进行2次挑战；每次挑战前可自选支援效果，每个支援效果当日只可使用一次。\n2.最终计分规则：每次挑战由比赛胜负及比赛表现共同决定最终得分，投射属性越高会影响最终单局比赛评分。每日挑战总分由当日的两次挑战评分组成。最终分数最高的日挑战总分会计入到协会总分中。\n3.试训：终局挑战赛期间可进行试训，各位教练可自行选择合适的阵容和支援效果进行试训。试训不消耗当日的挑战机会，且试训后的分数不会计入当日总分中。\n\n结算期\n终局挑战赛的排名奖励将于结算期进行统一发放；\n未来得及领取的奖励将通过邮件进行补发。"
 },
 "quotes": [
  {
   "file": "lua_conf_S1.cn.common_help_rule_conf.sw",
   "poolOffset": 5376,
   "plain": "分站表演赛\n1.本次分站表演赛共分为1个决赛场和3个分站赛：入门分站赛、进阶分站赛和精英分站赛。\n2.每次挑战后会根据胜负结果、以及比分情况来决定最终得分。\n3.表演赛期间教练每日可最多进行2次挑战；已上阵过的球员不可重复上阵。\n4.决赛场于11月23日12:00解锁，且需要通关至少其中一个分站赛的全部球场挑战后，才可获得决赛场的挑战资格。通关不同难度分站赛可解锁决赛场的对应挑战难度。\n5.决赛场通关之后才可获得下一轮终局挑战赛资格。\n6.挑战加成：表演赛期间可获得固定比赛加成效果；挑战决赛场时还可自选额外的支援效果，每个支援效果当日只可使用一次。\n7.在分站表演赛中，全部报名参赛的协会进行分组。每个组将根据各个协会的决赛场通关时间，给该组内首个通关决赛场的协会赋予荣誉称号。\n8.表演赛结束后，没能及时领取的奖励将通过邮件进行补发。"
  },
  {
   "file": "lua_conf_S1.cn.guild_war.sw",
   "poolOffset": 803,
   "plain": "每个支援效果当天只可使用1次"
  },
  {
   "file": "lua_conf_S1.cn.guild_war.sw",
   "poolOffset": 1390,
   "plain": "终极挑战未开始，当前可先进行试训！"
  },
  {
   "file": "lua_conf_S1.cn.guild_war.sw",
   "poolOffset": 1459,
   "plain": "未通关【圣山协会赛决赛场】，暂无法开启终极挑战！"
  },
  {
   "file": "lua_conf_S1.cn.guild_war.sw",
   "poolOffset": 1556,
   "plain": "通关任意分站内的4个球场+1个球馆后，可挑战协会赛决赛场，赢取丰厚奖励！"
  },
  {
   "file": "lua_conf_S1.cn.guild_war.sw",
   "poolOffset": 1779,
   "plain": "在本次协会赛中，需要准备两支队伍应对挑战。"
  },
  {
   "file": "lua_conf_S1.cn.guild_war.sw",
   "poolOffset": 1908,
   "plain": "投射属性和得分手都可在终局挑战中获得更高积分"
  },
  {
   "file": "lua_conf_S1.cn.guild_war.sw",
   "poolOffset": 2046,
   "plain": "分站表演赛含一个决赛场和三个分站赛。每个分站赛含1个精英球馆和4个普通球场。通关任意一个分站赛即可获得挑战决赛场资格。"
  },
  {
   "file": "lua_conf_S1.cn.guild_war.sw",
   "poolOffset": 3185,
   "plain": "协会未通关分站表演赛，无法参与下一轮"
  },
  {
   "file": "lua_conf_S1.cn.guild_war.sw",
   "poolOffset": 3379,
   "plain": "协会已报名，备赛期间可优先培养推荐属性为的球员哦~"
  },
  {
   "file": "lua_conf_S1.cn.tips_conf.sw",
   "poolOffset": 46305,
   "plain": "当前不在协会赛报名期"
  },
  {
   "file": "lua_conf_S1.cn.tips_conf.sw",
   "poolOffset": 46360,
   "plain": "尚未加入协会赛，无法参与协会赛"
  },
  {
   "file": "lua_conf_S1.cn.tips_conf.sw",
   "poolOffset": 46425,
   "plain": "报名失败，仅会长或副会长可报名协会赛"
  },
  {
   "file": "lua_conf_S1.cn.tips_conf.sw",
   "poolOffset": 46706,
   "plain": "所选支援效果无效"
  },
  {
   "file": "lua_conf_S1.cn.tips_conf.sw",
   "poolOffset": 46757,
   "plain": "该支援效果今日已使用"
  },
  {
   "file": "lua_conf_S1.cn.tips_conf.sw",
   "poolOffset": 46862,
   "plain": "当前不在协会赛挑战赛期间"
  },
  {
   "file": "lua_conf_S1.cn.tips_conf.sw",
   "poolOffset": 47203,
   "plain": "当前不满足协会赛挑战条件"
  },
  {
   "file": "lua_conf_S1.cn.tips_conf.sw",
   "poolOffset": 47260,
   "plain": "本次挑战结果已过期，未计入协会赛"
  }
 ],
 "schedulePlaceholder": [
  {
   "id": 2,
   "showText": "8/11 5:00开启报名",
   "startLocal": "2027-11-13 05:00:00 +08",
   "endLocal": "2027-11-20 04:59:59 +08",
   "entranceLabel": "预热中",
   "matchPeriod": 1,
   "note": "客户端时间戳为 2027 年（占位/提前配置），不采用"
  },
  {
   "id": 2,
   "showText": "8/14 5:00截止报名",
   "startLocal": "2027-11-20 05:00:00 +08",
   "endLocal": "2027-11-22 04:59:59 +08",
   "entranceLabel": "火热报名中",
   "matchPeriod": 2,
   "note": "客户端时间戳为 2027 年（占位/提前配置），不采用"
  },
  {
   "id": 2,
   "showText": "今日剩余次数：%s/2",
   "startLocal": "2027-11-22 05:00:00 +08",
   "endLocal": "2027-11-29 04:59:59 +08",
   "entranceLabel": "表演赛进行中",
   "matchPeriod": 3,
   "note": "客户端时间戳为 2027 年（占位/提前配置），不采用"
  },
  {
   "id": 2,
   "showText": "1天后开启挑战",
   "startLocal": "2027-11-29 05:00:00 +08",
   "endLocal": "2027-11-29 09:59:59 +08",
   "entranceLabel": "备赛中",
   "matchPeriod": 4,
   "note": "客户端时间戳为 2027 年（占位/提前配置），不采用"
  },
  {
   "id": 2,
   "showText": "今日剩余次数：%s/2",
   "startLocal": "2027-11-29 10:00:00 +08",
   "endLocal": "2027-12-01 04:59:59 +08",
   "entranceLabel": "终局挑战中",
   "matchPeriod": 5,
   "note": "客户端时间戳为 2027 年（占位/提前配置），不采用"
  },
  {
   "id": 2,
   "showText": "协会奖励结算中",
   "startLocal": "2027-12-01 05:00:00 +08",
   "endLocal": "2027-12-03 04:59:59 +08",
   "entranceLabel": "",
   "matchPeriod": 6,
   "note": "客户端时间戳为 2027 年（占位/提前配置），不采用"
  }
 ],
 "help": {
  "attributeHelp": [
   {
    "id": 1,
    "title": "野上泷的帮助",
    "desc": "投射属性超过1200后，每100点投射使总得分提升1%；超过属性1600后，每100点投射使总得分提升1.5%；超过属性2000后，每100点投射使总得分提升2%。另外得分手额外提升1%",
    "exPoint": [
     1001,
     1002
    ]
   },
   {
    "id": 2,
    "title": "白神时久的帮助",
    "desc": "运控属性超过1200后，每100点运控使总得分提升1%，得分手额外提升1%",
    "exPoint": [
     1003,
     1004
    ]
   },
   {
    "id": 3,
    "title": "小经理的帮助",
    "desc": "总得分提升3%，得分手额外提升3%",
    "exPoint": [
     1005,
     1006
    ]
   }
  ],
  "skillHelp": [
   {
    "id": 1,
    "title": "野上泷的帮助",
    "desc": "比赛开始时，全队获得一张一次性三分卡【迷你重炮】(技)：威力 = 投射 ×120%，使用后每5分钟可再次获得。",
    "skill": 210428
   },
   {
    "id": 2,
    "title": "白神时久的帮助",
    "desc": "比赛开始时，全队战术发动率大幅提升；战术回合时，全队中投威力中幅提升，持续1分钟。",
    "skill": 210429
   },
   {
    "id": 3,
    "title": "小经理的帮助",
    "desc": "全队全属性提升3%。",
    "skill": 210431
   }
  ],
  "note": "帮助三选一：boss_select_ex_point（属性达标加成）+ critical_select_effect（技能支援），挑战时可选择",
  "supportRuleQuote": "每个支援效果当天只可使用1次"
 },
 "matchGroups": [
  {
   "key": "stationA",
   "label": "分站表演赛 · A组（入门分站赛）",
   "note": "4 普通球场 + 1 精英训练馆；第 5 关 通关后获得该分站赛「全部球场」资格",
   "confidence": "推断（按 match id/顺序/show_name；配置无显式环节字段）",
   "matchIds": [
    1,
    2,
    3,
    4,
    5
   ]
  },
  {
   "key": "stationB",
   "label": "分站表演赛 · B组（进阶分站赛）",
   "note": "4 普通球场 + 1 精英训练馆",
   "confidence": "推断（按 match id/顺序/show_name；配置无显式环节字段）",
   "matchIds": [
    6,
    7,
    8,
    9,
    10
   ]
  },
  {
   "key": "stationC",
   "label": "分站表演赛 · C组（精英分站赛）",
   "note": "4 普通球场 + 1 精英训练馆",
   "confidence": "推断（按 match id/顺序/show_name；配置无显式环节字段）",
   "matchIds": [
    11,
    12,
    13,
    14,
    15
   ]
  },
  {
   "key": "final",
   "label": "决赛场（普通 / 中等 / 困难）",
   "note": "11-23 12:00 解锁；通关不同难度分站赛 → 解锁对应难度决赛场；通关决赛场 → 获得终局挑战资格",
   "confidence": "推断（按 match id/顺序/show_name；配置无显式环节字段）",
   "matchIds": [
    16,
    17,
    18
   ]
  },
  {
   "key": "ultimate",
   "label": "终局挑战",
   "note": "需先通关决赛场；每日 2 次，试训不消耗次数、不计分",
   "confidence": "推断（按 match id/顺序/show_name；配置无显式环节字段）",
   "matchIds": [
    19
   ]
  }
 ],
 "matches": [
  {
   "matchId": 1,
   "name": "A组小怪关1",
   "showName": "入门球场·1号",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "A组(入门) 小怪关",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 1,
     "stageMatch": 1,
     "matchHealth": 2740
    },
    {
     "stageId": 201,
     "stageMatch": 2,
     "matchHealth": 50
    }
   ],
   "mainStage": {
    "stageId": 1,
    "stageMatch": 1,
    "matchHealth": 2740
   },
   "trialStage": {
    "stageId": 201,
    "stageMatch": 2,
    "matchHealth": 50
   },
   "enemyTeams": [
    {
     "teamId": 81101,
     "teamName": "公会战小怪1-1",
     "showName": "入门球场·1号",
     "teamRank": 12500,
     "rankLv": 11,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1026,
       "characterName": "森田 莉莉",
       "aiName": "花园 美织",
       "level": 2,
       "rank": 2500,
       "propRank": 2400,
       "property": {
        "101": 413,
        "102": 374,
        "103": 412
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1026001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1027,
       "characterName": "美伽 未来",
       "aiName": "星野 玲央",
       "level": 2,
       "rank": 2500,
       "propRank": 2400,
       "property": {
        "101": 423,
        "102": 353,
        "103": 436
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1027001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1013,
       "characterName": "百目鬼 剑",
       "aiName": "神崎 春葵",
       "level": 2,
       "rank": 2500,
       "propRank": 2400,
       "property": {
        "101": 451,
        "102": 452,
        "103": 366
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1013001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1022,
       "characterName": "稻叶 杏里",
       "aiName": "水城 阳菜",
       "level": 2,
       "rank": 2500,
       "propRank": 2400,
       "property": {
        "101": 368,
        "102": 424,
        "103": 437
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1022001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1028,
       "characterName": "五十岚 诗音",
       "aiName": "翼田 澪香",
       "level": 2,
       "rank": 2500,
       "propRank": 2400,
       "property": {
        "101": 356,
        "102": 408,
        "103": 404
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1028001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 2,
   "name": "A组小怪关2",
   "showName": "入门球场·2号",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "A组(入门) 小怪关",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 2,
     "stageMatch": 1,
     "matchHealth": 2740
    },
    {
     "stageId": 202,
     "stageMatch": 2,
     "matchHealth": 50
    }
   ],
   "mainStage": {
    "stageId": 2,
    "stageMatch": 1,
    "matchHealth": 2740
   },
   "trialStage": {
    "stageId": 202,
    "stageMatch": 2,
    "matchHealth": 50
   },
   "enemyTeams": [
    {
     "teamId": 81102,
     "teamName": "公会战小怪1-2",
     "showName": "入门球场·2号",
     "teamRank": 13500,
     "rankLv": 11,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1026,
       "characterName": "森田 莉莉",
       "aiName": "花园 美织",
       "level": 2,
       "rank": 2700,
       "propRank": 2600,
       "property": {
        "101": 447,
        "102": 405,
        "103": 447
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1026001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1027,
       "characterName": "美伽 未来",
       "aiName": "星野 玲央",
       "level": 2,
       "rank": 2700,
       "propRank": 2600,
       "property": {
        "101": 458,
        "102": 382,
        "103": 473
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1027001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1013,
       "characterName": "百目鬼 剑",
       "aiName": "神崎 春葵",
       "level": 2,
       "rank": 2700,
       "propRank": 2600,
       "property": {
        "101": 489,
        "102": 490,
        "103": 396
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1013001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1022,
       "characterName": "稻叶 杏里",
       "aiName": "水城 阳菜",
       "level": 2,
       "rank": 2700,
       "propRank": 2600,
       "property": {
        "101": 398,
        "102": 460,
        "103": 473
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1022001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1028,
       "characterName": "五十岚 诗音",
       "aiName": "翼田 澪香",
       "level": 2,
       "rank": 2700,
       "propRank": 2600,
       "property": {
        "101": 386,
        "102": 441,
        "103": 438
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1028001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 3,
   "name": "A组小怪关3",
   "showName": "入门球场·3号",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "A组(入门) 小怪关",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 3,
     "stageMatch": 1,
     "matchHealth": 2740
    },
    {
     "stageId": 203,
     "stageMatch": 2,
     "matchHealth": 50
    }
   ],
   "mainStage": {
    "stageId": 3,
    "stageMatch": 1,
    "matchHealth": 2740
   },
   "trialStage": {
    "stageId": 203,
    "stageMatch": 2,
    "matchHealth": 50
   },
   "enemyTeams": [
    {
     "teamId": 81103,
     "teamName": "公会战小怪1-3",
     "showName": "入门球场·3号",
     "teamRank": 14500,
     "rankLv": 11,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1026,
       "characterName": "森田 莉莉",
       "aiName": "花园 美织",
       "level": 2,
       "rank": 2900,
       "propRank": 2800,
       "property": {
        "101": 481,
        "102": 436,
        "103": 481
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1026001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1027,
       "characterName": "美伽 未来",
       "aiName": "星野 玲央",
       "level": 2,
       "rank": 2900,
       "propRank": 2800,
       "property": {
        "101": 493,
        "102": 412,
        "103": 509
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1027001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1013,
       "characterName": "百目鬼 剑",
       "aiName": "神崎 春葵",
       "level": 2,
       "rank": 2900,
       "propRank": 2800,
       "property": {
        "101": 527,
        "102": 527,
        "103": 427
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1013001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1022,
       "characterName": "稻叶 杏里",
       "aiName": "水城 阳菜",
       "level": 2,
       "rank": 2900,
       "propRank": 2800,
       "property": {
        "101": 429,
        "102": 495,
        "103": 509
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1022001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1028,
       "characterName": "五十岚 诗音",
       "aiName": "翼田 澪香",
       "level": 2,
       "rank": 2900,
       "propRank": 2800,
       "property": {
        "101": 415,
        "102": 475,
        "103": 472
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1028001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 4,
   "name": "A组小怪关4",
   "showName": "入门球场·4号",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "A组(入门) 小怪关",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 4,
     "stageMatch": 1,
     "matchHealth": 2740
    },
    {
     "stageId": 204,
     "stageMatch": 2,
     "matchHealth": 50
    }
   ],
   "mainStage": {
    "stageId": 4,
    "stageMatch": 1,
    "matchHealth": 2740
   },
   "trialStage": {
    "stageId": 204,
    "stageMatch": 2,
    "matchHealth": 50
   },
   "enemyTeams": [
    {
     "teamId": 81104,
     "teamName": "公会战小怪1-4",
     "showName": "入门球场·4号",
     "teamRank": 15500,
     "rankLv": 12,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1026,
       "characterName": "森田 莉莉",
       "aiName": "花园 美织",
       "level": 2,
       "rank": 3100,
       "propRank": 3000,
       "property": {
        "101": 516,
        "102": 467,
        "103": 516
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1026001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1027,
       "characterName": "美伽 未来",
       "aiName": "星野 玲央",
       "level": 2,
       "rank": 3100,
       "propRank": 3000,
       "property": {
        "101": 528,
        "102": 441,
        "103": 546
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1027001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1013,
       "characterName": "百目鬼 剑",
       "aiName": "神崎 春葵",
       "level": 2,
       "rank": 3100,
       "propRank": 3000,
       "property": {
        "101": 564,
        "102": 565,
        "103": 457
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1013001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1022,
       "characterName": "稻叶 杏里",
       "aiName": "水城 阳菜",
       "level": 2,
       "rank": 3100,
       "propRank": 3000,
       "property": {
        "101": 460,
        "102": 531,
        "103": 546
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1022001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1028,
       "characterName": "五十岚 诗音",
       "aiName": "翼田 澪香",
       "level": 2,
       "rank": 3100,
       "propRank": 3000,
       "property": {
        "101": 445,
        "102": 510,
        "103": 505
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1028001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 5,
   "name": "A组精英关",
   "showName": "入门训练馆",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "A组(入门) 精英训练馆",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 5,
     "stageMatch": 1,
     "matchHealth": 5750
    },
    {
     "stageId": 205,
     "stageMatch": 2,
     "matchHealth": 100
    }
   ],
   "mainStage": {
    "stageId": 5,
    "stageMatch": 1,
    "matchHealth": 5750
   },
   "trialStage": {
    "stageId": 205,
    "stageMatch": 2,
    "matchHealth": 100
   },
   "enemyTeams": [
    {
     "teamId": 81121,
     "teamName": "公会战精英1-5",
     "showName": "入门训练馆",
     "teamRank": 20500,
     "rankLv": 13,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1026,
       "characterName": "森田 莉莉",
       "aiName": "花园 美织",
       "level": 2,
       "rank": 4100,
       "propRank": 4000,
       "property": {
        "101": 688,
        "102": 623,
        "103": 687
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1026001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1027,
       "characterName": "美伽 未来",
       "aiName": "星野 玲央",
       "level": 2,
       "rank": 4100,
       "propRank": 4000,
       "property": {
        "101": 704,
        "102": 588,
        "103": 728
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1027001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1013,
       "characterName": "百目鬼 剑",
       "aiName": "神崎 春葵",
       "level": 2,
       "rank": 4100,
       "propRank": 4000,
       "property": {
        "101": 752,
        "102": 753,
        "103": 610
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1013001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1037,
       "characterName": "野上 泷",
       "aiName": null,
       "level": 2,
       "rank": 4100,
       "propRank": 4000,
       "property": {
        "101": 880,
        "102": 400,
        "103": 400
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1037001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1028,
       "characterName": "五十岚 诗音",
       "aiName": "翼田 澪香",
       "level": 2,
       "rank": 4100,
       "propRank": 4000,
       "property": {
        "101": 593,
        "102": 679,
        "103": 674
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1028001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 6,
   "name": "B组小怪关1",
   "showName": "进阶球场·1号",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "B组(进阶) 小怪关",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 6,
     "stageMatch": 1,
     "matchHealth": 3830
    },
    {
     "stageId": 206,
     "stageMatch": 2,
     "matchHealth": 50
    }
   ],
   "mainStage": {
    "stageId": 6,
    "stageMatch": 1,
    "matchHealth": 3830
   },
   "trialStage": {
    "stageId": 206,
    "stageMatch": 2,
    "matchHealth": 50
   },
   "enemyTeams": [
    {
     "teamId": 81105,
     "teamName": "公会战小怪2-1",
     "showName": "进阶球场·1号",
     "teamRank": 20500,
     "rankLv": 13,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1023,
       "characterName": "清水 万里",
       "aiName": "高桥 美雪",
       "level": 2,
       "rank": 4100,
       "propRank": 4000,
       "property": {
        "101": 687,
        "102": 623,
        "103": 687
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1023001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1014,
       "characterName": "藤松 玖怜",
       "aiName": "中村 佳奈",
       "level": 2,
       "rank": 4100,
       "propRank": 4000,
       "property": {
        "101": 704,
        "102": 588,
        "103": 728
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1014001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1012,
       "characterName": "望月 透",
       "aiName": "藤田 玲花",
       "level": 2,
       "rank": 4100,
       "propRank": 4000,
       "property": {
        "101": 671,
        "102": 754,
        "103": 609
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1012001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1025,
       "characterName": "春澄 永远",
       "aiName": "石川 真琴",
       "level": 2,
       "rank": 4100,
       "propRank": 4000,
       "property": {
        "101": 603,
        "102": 743,
        "103": 694
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1025001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1005,
       "characterName": "亚理纱 贾斯敏",
       "aiName": "林田 夕莉",
       "level": 2,
       "rank": 4100,
       "propRank": 4000,
       "property": {
        "101": 594,
        "102": 680,
        "103": 673
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1005001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 7,
   "name": "B组小怪关2",
   "showName": "进阶球场·2号",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "B组(进阶) 小怪关",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 7,
     "stageMatch": 1,
     "matchHealth": 3830
    },
    {
     "stageId": 207,
     "stageMatch": 2,
     "matchHealth": 50
    }
   ],
   "mainStage": {
    "stageId": 7,
    "stageMatch": 1,
    "matchHealth": 3830
   },
   "trialStage": {
    "stageId": 207,
    "stageMatch": 2,
    "matchHealth": 50
   },
   "enemyTeams": [
    {
     "teamId": 81106,
     "teamName": "公会战小怪2-2",
     "showName": "进阶球场·2号",
     "teamRank": 21500,
     "rankLv": 13,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1023,
       "characterName": "清水 万里",
       "aiName": "高桥 美雪",
       "level": 2,
       "rank": 4300,
       "propRank": 4200,
       "property": {
        "101": 722,
        "102": 654,
        "103": 721
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1023001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1014,
       "characterName": "藤松 玖怜",
       "aiName": "中村 佳奈",
       "level": 2,
       "rank": 4300,
       "propRank": 4200,
       "property": {
        "101": 739,
        "102": 617,
        "103": 764
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1014001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1012,
       "characterName": "望月 透",
       "aiName": "藤田 玲花",
       "level": 2,
       "rank": 4300,
       "propRank": 4200,
       "property": {
        "101": 705,
        "102": 791,
        "103": 640
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1012001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1025,
       "characterName": "春澄 永远",
       "aiName": "石川 真琴",
       "level": 2,
       "rank": 4300,
       "propRank": 4200,
       "property": {
        "101": 633,
        "102": 781,
        "103": 728
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1025001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1005,
       "characterName": "亚理纱 贾斯敏",
       "aiName": "林田 夕莉",
       "level": 2,
       "rank": 4300,
       "propRank": 4200,
       "property": {
        "101": 623,
        "102": 713,
        "103": 707
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1005001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 8,
   "name": "B组小怪关3",
   "showName": "进阶球场·3号",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "B组(进阶) 小怪关",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 8,
     "stageMatch": 1,
     "matchHealth": 3830
    },
    {
     "stageId": 208,
     "stageMatch": 2,
     "matchHealth": 50
    }
   ],
   "mainStage": {
    "stageId": 8,
    "stageMatch": 1,
    "matchHealth": 3830
   },
   "trialStage": {
    "stageId": 208,
    "stageMatch": 2,
    "matchHealth": 50
   },
   "enemyTeams": [
    {
     "teamId": 81107,
     "teamName": "公会战小怪2-3",
     "showName": "进阶球场·3号",
     "teamRank": 22500,
     "rankLv": 13,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1023,
       "characterName": "清水 万里",
       "aiName": "高桥 美雪",
       "level": 2,
       "rank": 4500,
       "propRank": 4400,
       "property": {
        "101": 756,
        "102": 686,
        "103": 756
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1023001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1014,
       "characterName": "藤松 玖怜",
       "aiName": "中村 佳奈",
       "level": 2,
       "rank": 4500,
       "propRank": 4400,
       "property": {
        "101": 775,
        "102": 646,
        "103": 801
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1014001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1012,
       "characterName": "望月 透",
       "aiName": "藤田 玲花",
       "level": 2,
       "rank": 4500,
       "propRank": 4400,
       "property": {
        "101": 738,
        "102": 829,
        "103": 670
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1012001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1025,
       "characterName": "春澄 永远",
       "aiName": "石川 真琴",
       "level": 2,
       "rank": 4500,
       "propRank": 4400,
       "property": {
        "101": 663,
        "102": 818,
        "103": 763
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1025001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1005,
       "characterName": "亚理纱 贾斯敏",
       "aiName": "林田 夕莉",
       "level": 2,
       "rank": 4500,
       "propRank": 4400,
       "property": {
        "101": 653,
        "102": 747,
        "103": 741
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1005001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 9,
   "name": "B组小怪关4",
   "showName": "进阶球场·4号",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "B组(进阶) 小怪关",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 9,
     "stageMatch": 1,
     "matchHealth": 3830
    },
    {
     "stageId": 209,
     "stageMatch": 2,
     "matchHealth": 50
    }
   ],
   "mainStage": {
    "stageId": 9,
    "stageMatch": 1,
    "matchHealth": 3830
   },
   "trialStage": {
    "stageId": 209,
    "stageMatch": 2,
    "matchHealth": 50
   },
   "enemyTeams": [
    {
     "teamId": 81108,
     "teamName": "公会战小怪2-4",
     "showName": "进阶球场·4号",
     "teamRank": 23500,
     "rankLv": 13,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1023,
       "characterName": "清水 万里",
       "aiName": "高桥 美雪",
       "level": 2,
       "rank": 4700,
       "propRank": 4600,
       "property": {
        "101": 790,
        "102": 716,
        "103": 790
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1023001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1014,
       "characterName": "藤松 玖怜",
       "aiName": "中村 佳奈",
       "level": 2,
       "rank": 4700,
       "propRank": 4600,
       "property": {
        "101": 810,
        "102": 675,
        "103": 837
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1014001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1012,
       "characterName": "望月 透",
       "aiName": "藤田 玲花",
       "level": 2,
       "rank": 4700,
       "propRank": 4600,
       "property": {
        "101": 772,
        "102": 866,
        "103": 701
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1012001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1025,
       "characterName": "春澄 永远",
       "aiName": "石川 真琴",
       "level": 2,
       "rank": 4700,
       "propRank": 4600,
       "property": {
        "101": 694,
        "102": 855,
        "103": 797
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1025001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1005,
       "characterName": "亚理纱 贾斯敏",
       "aiName": "林田 夕莉",
       "level": 2,
       "rank": 4700,
       "propRank": 4600,
       "property": {
        "101": 683,
        "102": 781,
        "103": 775
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1005001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 10,
   "name": "B组精英关",
   "showName": "进阶训练馆",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "B组(进阶) 精英训练馆",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 10,
     "stageMatch": 1,
     "matchHealth": 8000
    },
    {
     "stageId": 210,
     "stageMatch": 2,
     "matchHealth": 100
    }
   ],
   "mainStage": {
    "stageId": 10,
    "stageMatch": 1,
    "matchHealth": 8000
   },
   "trialStage": {
    "stageId": 210,
    "stageMatch": 2,
    "matchHealth": 100
   },
   "enemyTeams": [
    {
     "teamId": 81122,
     "teamName": "公会战精英2-5",
     "showName": "进阶训练馆",
     "teamRank": 30500,
     "rankLv": 15,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1045,
       "characterName": "白神 时久",
       "aiName": null,
       "level": 2,
       "rank": 6100,
       "propRank": 6000,
       "property": {
        "101": 900,
        "102": 600,
        "103": 900
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1045001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1014,
       "characterName": "藤松 玖怜",
       "aiName": "中村 佳奈",
       "level": 2,
       "rank": 6100,
       "propRank": 6000,
       "property": {
        "101": 1056,
        "102": 881,
        "103": 1092
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1014001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1012,
       "characterName": "望月 透",
       "aiName": "藤田 玲花",
       "level": 2,
       "rank": 6100,
       "propRank": 6000,
       "property": {
        "101": 1007,
        "102": 1130,
        "103": 914
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1012001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1025,
       "characterName": "春澄 永远",
       "aiName": "石川 真琴",
       "level": 2,
       "rank": 6100,
       "propRank": 6000,
       "property": {
        "101": 905,
        "102": 1115,
        "103": 1040
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1025001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1005,
       "characterName": "亚理纱 贾斯敏",
       "aiName": "林田 夕莉",
       "level": 2,
       "rank": 6100,
       "propRank": 6000,
       "property": {
        "101": 890,
        "102": 1019,
        "103": 1010
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1005001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 11,
   "name": "C组小怪关1",
   "showName": "精英球场·1号",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "C组(精英) 小怪关",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 11,
     "stageMatch": 1,
     "matchHealth": 4100
    },
    {
     "stageId": 211,
     "stageMatch": 2,
     "matchHealth": 50
    }
   ],
   "mainStage": {
    "stageId": 11,
    "stageMatch": 1,
    "matchHealth": 4100
   },
   "trialStage": {
    "stageId": 211,
    "stageMatch": 2,
    "matchHealth": 50
   },
   "enemyTeams": [
    {
     "teamId": 81109,
     "teamName": "公会战小怪3-1",
     "showName": "精英球场·1号",
     "teamRank": 30500,
     "rankLv": 15,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1026,
       "characterName": "森田 莉莉",
       "aiName": "桐原 美弦",
       "level": 2,
       "rank": 6100,
       "propRank": 6000,
       "property": {
        "101": 1031,
        "102": 935,
        "103": 1031
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1026001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1018,
       "characterName": "毒岛 黛也",
       "aiName": "霜月 凛音",
       "level": 2,
       "rank": 6100,
       "propRank": 6000,
       "property": {
        "101": 1163,
        "102": 881,
        "103": 989
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1018001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1001,
       "characterName": "澪奈·贾妮丝",
       "aiName": "白崎 沙罗",
       "level": 2,
       "rank": 6100,
       "propRank": 6000,
       "property": {
        "101": 1007,
        "102": 1130,
        "103": 914
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1001001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1025,
       "characterName": "春澄 永远",
       "aiName": "黒羽 雪乃",
       "level": 2,
       "rank": 6100,
       "propRank": 6000,
       "property": {
        "101": 920,
        "102": 1061,
        "103": 1091
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1025001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1028,
       "characterName": "五十岚 诗音",
       "aiName": "叶山 碧海",
       "level": 2,
       "rank": 6100,
       "propRank": 6000,
       "property": {
        "101": 890,
        "102": 1019,
        "103": 1010
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1028001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 12,
   "name": "C组小怪关2",
   "showName": "精英球场·2号",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "C组(精英) 小怪关",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 12,
     "stageMatch": 1,
     "matchHealth": 4100
    },
    {
     "stageId": 212,
     "stageMatch": 2,
     "matchHealth": 50
    }
   ],
   "mainStage": {
    "stageId": 12,
    "stageMatch": 1,
    "matchHealth": 4100
   },
   "trialStage": {
    "stageId": 212,
    "stageMatch": 2,
    "matchHealth": 50
   },
   "enemyTeams": [
    {
     "teamId": 81110,
     "teamName": "公会战小怪3-2",
     "showName": "精英球场·2号",
     "teamRank": 31500,
     "rankLv": 15,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1026,
       "characterName": "森田 莉莉",
       "aiName": "桐原 美弦",
       "level": 2,
       "rank": 6300,
       "propRank": 6200,
       "property": {
        "101": 1065,
        "102": 966,
        "103": 1065
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1026001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1018,
       "characterName": "毒岛 黛也",
       "aiName": "霜月 凛音",
       "level": 2,
       "rank": 6300,
       "propRank": 6200,
       "property": {
        "101": 1202,
        "102": 910,
        "103": 1022
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1018001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1001,
       "characterName": "澪奈·贾妮丝",
       "aiName": "白崎 沙罗",
       "level": 2,
       "rank": 6300,
       "propRank": 6200,
       "property": {
        "101": 1041,
        "102": 1168,
        "103": 944
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1001001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1025,
       "characterName": "春澄 永远",
       "aiName": "黒羽 雪乃",
       "level": 2,
       "rank": 6300,
       "propRank": 6200,
       "property": {
        "101": 951,
        "102": 1096,
        "103": 1127
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1025001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1028,
       "characterName": "五十岚 诗音",
       "aiName": "叶山 碧海",
       "level": 2,
       "rank": 6300,
       "propRank": 6200,
       "property": {
        "101": 919,
        "102": 1053,
        "103": 1044
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1028001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 13,
   "name": "C组小怪关3",
   "showName": "精英球场·3号",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "C组(精英) 小怪关",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 13,
     "stageMatch": 1,
     "matchHealth": 4100
    },
    {
     "stageId": 213,
     "stageMatch": 2,
     "matchHealth": 50
    }
   ],
   "mainStage": {
    "stageId": 13,
    "stageMatch": 1,
    "matchHealth": 4100
   },
   "trialStage": {
    "stageId": 213,
    "stageMatch": 2,
    "matchHealth": 50
   },
   "enemyTeams": [
    {
     "teamId": 81111,
     "teamName": "公会战小怪3-3",
     "showName": "精英球场·3号",
     "teamRank": 32500,
     "rankLv": 15,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1026,
       "characterName": "森田 莉莉",
       "aiName": "桐原 美弦",
       "level": 2,
       "rank": 6500,
       "propRank": 6400,
       "property": {
        "101": 1100,
        "102": 997,
        "103": 1099
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1026001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1018,
       "characterName": "毒岛 黛也",
       "aiName": "霜月 凛音",
       "level": 2,
       "rank": 6500,
       "propRank": 6400,
       "property": {
        "101": 1240,
        "102": 939,
        "103": 1055
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1018001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1001,
       "characterName": "澪奈·贾妮丝",
       "aiName": "白崎 沙罗",
       "level": 2,
       "rank": 6500,
       "propRank": 6400,
       "property": {
        "101": 1074,
        "102": 1205,
        "103": 975
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1001001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1025,
       "characterName": "春澄 永远",
       "aiName": "黒羽 雪乃",
       "level": 2,
       "rank": 6500,
       "propRank": 6400,
       "property": {
        "101": 982,
        "102": 1132,
        "103": 1163
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1025001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1028,
       "characterName": "五十岚 诗音",
       "aiName": "叶山 碧海",
       "level": 2,
       "rank": 6500,
       "propRank": 6400,
       "property": {
        "101": 949,
        "102": 1087,
        "103": 1077
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1028001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 14,
   "name": "C组小怪关4",
   "showName": "精英球场·4号",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "C组(精英) 小怪关",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 14,
     "stageMatch": 1,
     "matchHealth": 4100
    },
    {
     "stageId": 214,
     "stageMatch": 2,
     "matchHealth": 50
    }
   ],
   "mainStage": {
    "stageId": 14,
    "stageMatch": 1,
    "matchHealth": 4100
   },
   "trialStage": {
    "stageId": 214,
    "stageMatch": 2,
    "matchHealth": 50
   },
   "enemyTeams": [
    {
     "teamId": 81112,
     "teamName": "公会战小怪3-4",
     "showName": "精英球场·4号",
     "teamRank": 33500,
     "rankLv": 15,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1026,
       "characterName": "森田 莉莉",
       "aiName": "桐原 美弦",
       "level": 2,
       "rank": 6700,
       "propRank": 6600,
       "property": {
        "101": 1134,
        "102": 1029,
        "103": 1134
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1026001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1018,
       "characterName": "毒岛 黛也",
       "aiName": "霜月 凛音",
       "level": 2,
       "rank": 6700,
       "propRank": 6600,
       "property": {
        "101": 1279,
        "102": 969,
        "103": 1088
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1018001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1001,
       "characterName": "澪奈·贾妮丝",
       "aiName": "白崎 沙罗",
       "level": 2,
       "rank": 6700,
       "propRank": 6600,
       "property": {
        "101": 1108,
        "102": 1243,
        "103": 1005
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1001001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1025,
       "characterName": "春澄 永远",
       "aiName": "黒羽 雪乃",
       "level": 2,
       "rank": 6700,
       "propRank": 6600,
       "property": {
        "101": 1012,
        "102": 1167,
        "103": 1200
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1025001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1028,
       "characterName": "五十岚 诗音",
       "aiName": "叶山 碧海",
       "level": 2,
       "rank": 6700,
       "propRank": 6600,
       "property": {
        "101": 979,
        "102": 1121,
        "103": 1111
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1028001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 15,
   "name": "C组精英关",
   "showName": "精英训练馆",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "分站表演赛",
    "detail": "C组(精英) 精英训练馆",
    "confidence": "推断（按 id/顺序/show_name）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 15,
     "stageMatch": 1,
     "matchHealth": 14000
    },
    {
     "stageId": 215,
     "stageMatch": 2,
     "matchHealth": 100
    }
   ],
   "mainStage": {
    "stageId": 15,
    "stageMatch": 1,
    "matchHealth": 14000
   },
   "trialStage": {
    "stageId": 215,
    "stageMatch": 2,
    "matchHealth": 100
   },
   "enemyTeams": [
    {
     "teamId": 81123,
     "teamName": "公会战精英3-5",
     "showName": "精英训练馆",
     "teamRank": 40500,
     "rankLv": 16,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1026,
       "characterName": "森田 莉莉",
       "aiName": "桐原 美弦",
       "level": 2,
       "rank": 8100,
       "propRank": 8000,
       "property": {
        "101": 1374,
        "102": 1247,
        "103": 1374
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1026001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1018,
       "characterName": "毒岛 黛也",
       "aiName": "霜月 凛音",
       "level": 2,
       "rank": 8100,
       "propRank": 8000,
       "property": {
        "101": 1550,
        "102": 1174,
        "103": 1319
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1018001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1001,
       "characterName": "澪奈·贾妮丝",
       "aiName": "白崎 沙罗",
       "level": 2,
       "rank": 8100,
       "propRank": 8000,
       "property": {
        "101": 1343,
        "102": 1507,
        "103": 1219
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1001001
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1025,
       "characterName": "春澄 永远",
       "aiName": "黒羽 雪乃",
       "level": 2,
       "rank": 8100,
       "propRank": 8000,
       "property": {
        "101": 1227,
        "102": 1415,
        "103": 1454
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1025001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1046,
       "characterName": "希雅·奥黛拉",
       "aiName": null,
       "level": 2,
       "rank": 8100,
       "propRank": 8000,
       "property": {
        "101": 800,
        "102": 1520,
        "103": 1200
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": null,
       "fullAttrsById": null,
       "attrCount": 3,
       "attrSum": null,
       "sumMatchesPropRank": null,
       "attrSource": "runtime",
       "attrSourceLabel": "运行时生成（未解出）",
       "attrSourceDetail": "",
       "verifiedByScreenshot": false,
       "skillIds": [
        1046001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 16,
   "name": "普通boss关",
   "showName": "圣山协会赛决赛场",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "决赛场",
    "detail": "普通",
    "confidence": "推断（按 name 普通/中等/困难 boss 关）"
   },
   "preMatch": [
    1,
    2,
    3,
    4,
    5
   ],
   "preMatch1": [
    6,
    7,
    8,
    9,
    10
   ],
   "preMatch2": [
    11,
    12,
    13,
    14,
    15
   ],
   "stages": [
    {
     "stageId": 16,
     "stageMatch": 1,
     "matchHealth": 35000
    },
    {
     "stageId": 216,
     "stageMatch": 2,
     "matchHealth": 1000
    }
   ],
   "mainStage": {
    "stageId": 16,
    "stageMatch": 1,
    "matchHealth": 35000
   },
   "trialStage": {
    "stageId": 216,
    "stageMatch": 2,
    "matchHealth": 1000
   },
   "enemyTeams": [
    {
     "teamId": 81001,
     "teamName": "公会战攻坚简单",
     "showName": "圣山协会赛决赛场",
     "teamRank": 25000,
     "rankLv": 14,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1004,
       "characterName": "和泉 香织",
       "aiName": null,
       "level": 2,
       "rank": 4500,
       "propRank": 4400,
       "property": {
        "101": 616,
        "102": 616,
        "103": 616
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 616,
        "弹跳": 616,
        "防守": 616,
        "体能": 616,
        "运控": 1056,
        "意识": 880
       },
       "fullAttrsById": {
        "101": 616,
        "102": 616,
        "103": 616,
        "104": 616,
        "105": 1056,
        "106": 880
       },
       "attrCount": 6,
       "attrSum": 4400,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "推断：按实机截图规则（主/副/其余）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1004001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1014,
       "characterName": "藤松 玖怜",
       "aiName": null,
       "level": 2,
       "rank": 4500,
       "propRank": 4400,
       "property": {
        "101": 880,
        "102": 616,
        "103": 1056
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 880,
        "弹跳": 616,
        "防守": 1056,
        "体能": 616,
        "运控": 616,
        "意识": 616
       },
       "fullAttrsById": {
        "101": 880,
        "102": 616,
        "103": 1056,
        "104": 616,
        "105": 616,
        "106": 616
       },
       "attrCount": 6,
       "attrSum": 4400,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "推断：按实机截图规则（主/副/其余）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1014001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1999,
       "characterName": "米歇尔·杰奎琳",
       "aiName": null,
       "level": 2,
       "rank": 7000,
       "propRank": 6900,
       "property": {
        "101": 1040,
        "102": 1387,
        "103": 1058
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 1040,
        "弹跳": 1387,
        "防守": 1058,
        "体能": 1076,
        "运控": 1162,
        "意识": 1177
       },
       "fullAttrsById": {
        "101": 1040,
        "102": 1387,
        "103": 1058,
        "104": 1076,
        "105": 1162,
        "106": 1177
       },
       "attrCount": 6,
       "attrSum": 6900,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "推断：难度档按已知 3 项比例+总评补齐（困难档为实机截图）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1999001,
        5000006
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1020,
       "characterName": "佐久间 雨乃",
       "aiName": null,
       "level": 2,
       "rank": 4500,
       "propRank": 4400,
       "property": {
        "101": 616,
        "102": 1056,
        "103": 616
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 616,
        "弹跳": 1056,
        "防守": 616,
        "体能": 880,
        "运控": 616,
        "意识": 616
       },
       "fullAttrsById": {
        "101": 616,
        "102": 1056,
        "103": 616,
        "104": 880,
        "105": 616,
        "106": 616
       },
       "attrCount": 6,
       "attrSum": 4400,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "推断：按实机截图规则（主/副/其余）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1020001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1006,
       "characterName": "洺瑶",
       "aiName": null,
       "level": 2,
       "rank": 4500,
       "propRank": 4400,
       "property": {
        "101": 616,
        "102": 880,
        "103": 1056
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 616,
        "弹跳": 880,
        "防守": 1056,
        "体能": 616,
        "运控": 616,
        "意识": 616
       },
       "fullAttrsById": {
        "101": 616,
        "102": 880,
        "103": 1056,
        "104": 616,
        "105": 616,
        "106": 616
       },
       "attrCount": 6,
       "attrSum": 4400,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "推断：按实机截图规则（主/副/其余）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1006001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 17,
   "name": "中等boss关",
   "showName": "圣山协会赛决赛场",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "决赛场",
    "detail": "中等",
    "confidence": "推断（按 name 普通/中等/困难 boss 关）"
   },
   "preMatch": [
    6,
    7,
    8,
    9,
    10
   ],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 16,
     "stageMatch": 1,
     "matchHealth": 35000
    },
    {
     "stageId": 216,
     "stageMatch": 2,
     "matchHealth": 1000
    }
   ],
   "mainStage": {
    "stageId": 16,
    "stageMatch": 1,
    "matchHealth": 35000
   },
   "trialStage": {
    "stageId": 216,
    "stageMatch": 2,
    "matchHealth": 1000
   },
   "enemyTeams": [
    {
     "teamId": 81002,
     "teamName": "公会战攻坚普通",
     "showName": "圣山协会赛决赛场",
     "teamRank": 35075,
     "rankLv": 15,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1004,
       "characterName": "和泉 香织",
       "aiName": null,
       "level": 2,
       "rank": 6300,
       "propRank": 6200,
       "property": {
        "101": 868,
        "102": 868,
        "103": 868
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 868,
        "弹跳": 868,
        "防守": 868,
        "体能": 868,
        "运控": 1488,
        "意识": 1240
       },
       "fullAttrsById": {
        "101": 868,
        "102": 868,
        "103": 868,
        "104": 868,
        "105": 1488,
        "106": 1240
       },
       "attrCount": 6,
       "attrSum": 6200,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "推断：按实机截图规则（主/副/其余）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1004001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1014,
       "characterName": "藤松 玖怜",
       "aiName": null,
       "level": 2,
       "rank": 6300,
       "propRank": 6200,
       "property": {
        "101": 1240,
        "102": 868,
        "103": 1488
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 1240,
        "弹跳": 868,
        "防守": 1488,
        "体能": 868,
        "运控": 868,
        "意识": 868
       },
       "fullAttrsById": {
        "101": 1240,
        "102": 868,
        "103": 1488,
        "104": 868,
        "105": 868,
        "106": 868
       },
       "attrCount": 6,
       "attrSum": 6200,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "推断：按实机截图规则（主/副/其余）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1014001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1999,
       "characterName": "米歇尔·杰奎琳",
       "aiName": null,
       "level": 2,
       "rank": 9875,
       "propRank": 9700,
       "property": {
        "101": 1463,
        "102": 1950,
        "103": 1487
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 1463,
        "弹跳": 1950,
        "防守": 1487,
        "体能": 1512,
        "运控": 1633,
        "意识": 1655
       },
       "fullAttrsById": {
        "101": 1463,
        "102": 1950,
        "103": 1487,
        "104": 1512,
        "105": 1633,
        "106": 1655
       },
       "attrCount": 6,
       "attrSum": 9700,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "推断：难度档按已知 3 项比例+总评补齐（困难档为实机截图）",
       "verifiedByScreenshot": false,
       "skillIds": [
        5000006,
        210236,
        210235,
        5
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1020,
       "characterName": "佐久间 雨乃",
       "aiName": null,
       "level": 2,
       "rank": 6300,
       "propRank": 6200,
       "property": {
        "101": 868,
        "102": 1488,
        "103": 868
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 868,
        "弹跳": 1488,
        "防守": 868,
        "体能": 1240,
        "运控": 868,
        "意识": 868
       },
       "fullAttrsById": {
        "101": 868,
        "102": 1488,
        "103": 868,
        "104": 1240,
        "105": 868,
        "106": 868
       },
       "attrCount": 6,
       "attrSum": 6200,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "推断：按实机截图规则（主/副/其余）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1020001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1006,
       "characterName": "洺瑶",
       "aiName": null,
       "level": 2,
       "rank": 6300,
       "propRank": 6200,
       "property": {
        "101": 868,
        "102": 1240,
        "103": 1488
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 868,
        "弹跳": 1240,
        "防守": 1488,
        "体能": 868,
        "运控": 868,
        "意识": 868
       },
       "fullAttrsById": {
        "101": 868,
        "102": 1240,
        "103": 1488,
        "104": 868,
        "105": 868,
        "106": 868
       },
       "attrCount": 6,
       "attrSum": 6200,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "推断：按实机截图规则（主/副/其余）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1006001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 18,
   "name": "困难boss关",
   "showName": "圣山协会赛决赛场",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "决赛场",
    "detail": "困难",
    "confidence": "推断（按 name 普通/中等/困难 boss 关）"
   },
   "preMatch": [
    11,
    12,
    13,
    14,
    15
   ],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 16,
     "stageMatch": 1,
     "matchHealth": 35000
    },
    {
     "stageId": 216,
     "stageMatch": 2,
     "matchHealth": 1000
    }
   ],
   "mainStage": {
    "stageId": 16,
    "stageMatch": 1,
    "matchHealth": 35000
   },
   "trialStage": {
    "stageId": 216,
    "stageMatch": 2,
    "matchHealth": 1000
   },
   "enemyTeams": [
    {
     "teamId": 81003,
     "teamName": "公会战攻坚困难",
     "showName": "圣山协会赛决赛场",
     "teamRank": 45150,
     "rankLv": 17,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1004,
       "characterName": "和泉 香织",
       "aiName": null,
       "level": 2,
       "rank": 8100,
       "propRank": 8000,
       "property": {
        "101": 1120,
        "102": 1120,
        "103": 1120
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 1120,
        "弹跳": 1120,
        "防守": 1120,
        "体能": 1120,
        "运控": 1920,
        "意识": 1600
       },
       "fullAttrsById": {
        "101": 1120,
        "102": 1120,
        "103": 1120,
        "104": 1120,
        "105": 1920,
        "106": 1600
       },
       "attrCount": 6,
       "attrSum": 8000,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "推断：按实机截图规则（主/副/其余）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1004001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1014,
       "characterName": "藤松 玖怜",
       "aiName": null,
       "level": 2,
       "rank": 8100,
       "propRank": 8000,
       "property": {
        "101": 1600,
        "102": 1120,
        "103": 1920
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 1600,
        "弹跳": 1120,
        "防守": 1920,
        "体能": 1120,
        "运控": 1120,
        "意识": 1120
       },
       "fullAttrsById": {
        "101": 1600,
        "102": 1120,
        "103": 1920,
        "104": 1120,
        "105": 1120,
        "106": 1120
       },
       "attrCount": 6,
       "attrSum": 8000,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "推断：按实机截图规则（主/副/其余）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1014001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1999,
       "characterName": "米歇尔·杰奎琳",
       "aiName": null,
       "level": 2,
       "rank": 12750,
       "propRank": 12500,
       "property": {
        "101": 1885,
        "102": 2513,
        "103": 1917
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 1885,
        "弹跳": 2513,
        "防守": 1917,
        "体能": 1948,
        "运控": 2104,
        "意识": 2133
       },
       "fullAttrsById": {
        "101": 1885,
        "102": 2513,
        "103": 1917,
        "104": 1948,
        "105": 2104,
        "106": 2133
       },
       "attrCount": 6,
       "attrSum": 12500,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "寒溟实机截图 2026-11-13",
       "verifiedByScreenshot": false,
       "skillIds": [
        1999001,
        5000006,
        210236,
        210235,
        210029,
        210278
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1020,
       "characterName": "佐久间 雨乃",
       "aiName": null,
       "level": 2,
       "rank": 8100,
       "propRank": 8000,
       "property": {
        "101": 1120,
        "102": 1920,
        "103": 1120
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 1120,
        "弹跳": 1920,
        "防守": 1120,
        "体能": 1600,
        "运控": 1120,
        "意识": 1120
       },
       "fullAttrsById": {
        "101": 1120,
        "102": 1920,
        "103": 1120,
        "104": 1600,
        "105": 1120,
        "106": 1120
       },
       "attrCount": 6,
       "attrSum": 8000,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "推断：按实机截图规则（主/副/其余）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1020001
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1006,
       "characterName": "洺瑶",
       "aiName": null,
       "level": 2,
       "rank": 8100,
       "propRank": 8000,
       "property": {
        "101": 1120,
        "102": 1600,
        "103": 1920
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 1120,
        "弹跳": 1600,
        "防守": 1920,
        "体能": 1120,
        "运控": 1120,
        "意识": 1120
       },
       "fullAttrsById": {
        "101": 1120,
        "102": 1600,
        "103": 1920,
        "104": 1120,
        "105": 1120,
        "106": 1120
       },
       "attrCount": 6,
       "attrSum": 8000,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "推断：按实机截图规则（主/副/其余）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1006001
       ]
      }
     ]
    }
   ]
  },
  {
   "matchId": 19,
   "name": "强化boss关",
   "showName": "终局挑战",
   "baseScore": 300,
   "loseScore": 200,
   "phase": {
    "phase": "终局挑战",
    "detail": "强化 boss 关",
    "confidence": "推断（show_name=终局挑战）"
   },
   "preMatch": [],
   "preMatch1": [],
   "preMatch2": [],
   "stages": [
    {
     "stageId": 17,
     "stageMatch": 1,
     "matchHealth": 0
    },
    {
     "stageId": 217,
     "stageMatch": 2,
     "matchHealth": 0
    }
   ],
   "mainStage": {
    "stageId": 17,
    "stageMatch": 1,
    "matchHealth": 0
   },
   "trialStage": {
    "stageId": 217,
    "stageMatch": 2,
    "matchHealth": 0
   },
   "enemyTeams": [
    {
     "teamId": 81004,
     "teamName": "公会战挑战",
     "showName": "终局挑战",
     "teamRank": 52000,
     "rankLv": 17,
     "class": "1",
     "members": [
      {
       "position": "控卫",
       "positionRaw": "PG",
       "actorId": 1004,
       "characterName": "和泉 香织",
       "aiName": null,
       "level": 2,
       "rank": 9350,
       "propRank": 9250,
       "property": {
        "101": 1295,
        "102": 1295,
        "103": 1295
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 1295,
        "弹跳": 1295,
        "防守": 1295,
        "体能": 1295,
        "运控": 2220,
        "意识": 1850
       },
       "fullAttrsById": {
        "101": 1295,
        "102": 1295,
        "103": 1295,
        "104": 1295,
        "105": 2220,
        "106": 1850
       },
       "attrCount": 6,
       "attrSum": 9250,
       "sumMatchesPropRank": true,
       "attrSource": "verified",
       "attrSourceLabel": "实机验证（推导一致）",
       "attrSourceDetail": "寒溟实机截图 2026-11-13（与「困难档×propRank/8000」推导逐项一致）",
       "verifiedByScreenshot": true,
       "skillIds": [
        1004001
       ]
      },
      {
       "position": "分卫",
       "positionRaw": "SG",
       "actorId": 1014,
       "characterName": "藤松 玖怜",
       "aiName": null,
       "level": 2,
       "rank": 9350,
       "propRank": 9250,
       "property": {
        "101": 1850,
        "102": 1295,
        "103": 2220
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 1850,
        "弹跳": 1295,
        "防守": 2220,
        "体能": 1295,
        "运控": 1295,
        "意识": 1295
       },
       "fullAttrsById": {
        "101": 1850,
        "102": 1295,
        "103": 2220,
        "104": 1295,
        "105": 1295,
        "106": 1295
       },
       "attrCount": 6,
       "attrSum": 9250,
       "sumMatchesPropRank": true,
       "attrSource": "verified",
       "attrSourceLabel": "实机验证（推导一致）",
       "attrSourceDetail": "寒溟实机截图 2026-11-13（与「困难档×propRank/8000」推导逐项一致）",
       "verifiedByScreenshot": true,
       "skillIds": [
        1014001
       ]
      },
      {
       "position": "小前",
       "positionRaw": "SF",
       "actorId": 1999,
       "characterName": "米歇尔·杰奎琳",
       "aiName": null,
       "level": 2,
       "rank": 14600,
       "propRank": 14500,
       "property": {
        "101": 2187,
        "102": 2915,
        "103": 2224
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 2187,
        "弹跳": 2915,
        "防守": 2224,
        "体能": 2259,
        "运控": 2440,
        "意识": 2475
       },
       "fullAttrsById": {
        "101": 2187,
        "102": 2915,
        "103": 2224,
        "104": 2259,
        "105": 2440,
        "106": 2475
       },
       "attrCount": 6,
       "attrSum": 14500,
       "sumMatchesPropRank": true,
       "attrSource": "inferred",
       "attrSourceLabel": "推断（未截图）",
       "attrSourceDetail": "推断：终局档按已知 3 项比例+总评补齐（困难档为实机截图；终局未截图）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1999001,
        5000006
       ]
      },
      {
       "position": "大前",
       "positionRaw": "PF",
       "actorId": 1035,
       "characterName": "出羽 十明",
       "aiName": null,
       "level": 2,
       "rank": 9350,
       "propRank": 9250,
       "property": {
        "101": 1665,
        "102": 925,
        "103": 1388
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 1665,
        "弹跳": 925,
        "防守": 1388,
        "体能": 1665,
        "运控": 1665,
        "意识": 1942
       },
       "fullAttrsById": {
        "101": 1665,
        "102": 925,
        "103": 1388,
        "104": 1665,
        "105": 1665,
        "106": 1942
       },
       "attrCount": 6,
       "attrSum": 9250,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "寒溟实机截图 2026-11-13（传奇圣山 SS+ 特殊分布）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1035001,
        210446,
        210447
       ]
      },
      {
       "position": "中锋",
       "positionRaw": "C",
       "actorId": 1046,
       "characterName": "希雅·奥黛拉",
       "aiName": null,
       "level": 2,
       "rank": 9350,
       "propRank": 9250,
       "property": {
        "101": 925,
        "102": 1758,
        "103": 1387
       },
       "propertyUnset": [
        "体能",
        "运控",
        "意识"
       ],
       "fullAttrs": {
        "投射": 925,
        "弹跳": 1758,
        "防守": 1387,
        "体能": 1665,
        "运控": 1758,
        "意识": 1757
       },
       "fullAttrsById": {
        "101": 925,
        "102": 1758,
        "103": 1387,
        "104": 1665,
        "105": 1758,
        "106": 1757
       },
       "attrCount": 6,
       "attrSum": 9250,
       "sumMatchesPropRank": true,
       "attrSource": "screenshot",
       "attrSourceLabel": "实机截图",
       "attrSourceDetail": "寒溟实机截图 2026-11-13（传奇圣山 SS+ 特殊分布）",
       "verifiedByScreenshot": false,
       "skillIds": [
        1046001,
        210444,
        210445
       ]
      }
     ]
    }
   ]
  }
 ],
 "matchCount": 19,
 "enemyCount": 95,
 "rewards": {
  "total": 42,
  "groups": [
   {
    "group": 1,
    "label": "挑战期 · 排名 / 击破进度奖励",
    "rows": [
     {
      "id": 15,
      "group": 1,
      "type": 3,
      "text": "击破1个精英球馆",
      "showName": "公会战-击破1个精英关",
      "params": [
       1
      ],
      "items": [
       {
        "name": "钻石",
        "num": 200,
        "quality": 4
       },
       {
        "name": "中级潜能-速",
        "num": 100,
        "quality": 3
       },
       {
        "name": "金色卡包3",
        "num": 3,
        "quality": 4
       }
      ]
     },
     {
      "id": 16,
      "group": 1,
      "type": 3,
      "text": "击破2个精英球馆",
      "showName": "公会战-击破2个精英关",
      "params": [
       2
      ],
      "items": [
       {
        "name": "钻石",
        "num": 100,
        "quality": 4
       },
       {
        "name": "中级潜能-速",
        "num": 100,
        "quality": 3
       },
       {
        "name": "彩色卡包3",
        "num": 2,
        "quality": 5
       }
      ]
     },
     {
      "id": 17,
      "group": 1,
      "type": 3,
      "text": "击破3个精英球馆",
      "showName": "公会战-击破3个精英关",
      "params": [
       3
      ],
      "items": [
       {
        "name": "高级潜能-速",
        "num": 100,
        "quality": 4
       },
       {
        "name": "异画卡UP卡包3",
        "num": 1,
        "quality": 5
       }
      ]
     },
     {
      "id": 18,
      "group": 1,
      "type": 2,
      "text": "击破4个普通球场",
      "showName": "公会战-击破4个小怪关",
      "params": [
       4
      ],
      "items": [
       {
        "name": "钻石",
        "num": 200,
        "quality": 4
       },
       {
        "name": "初级潜能",
        "num": 200,
        "quality": 2
       },
       {
        "name": "基础卡包3",
        "num": 3,
        "quality": 2
       }
      ]
     },
     {
      "id": 19,
      "group": 1,
      "type": 2,
      "text": "击破8个普通球场",
      "showName": "公会战-击破8个小怪关",
      "params": [
       8
      ],
      "items": [
       {
        "name": "钻石",
        "num": 100,
        "quality": 4
       },
       {
        "name": "初级潜能",
        "num": 200,
        "quality": 2
       },
       {
        "name": "基础卡包3",
        "num": 5,
        "quality": 2
       }
      ]
     },
     {
      "id": 20,
      "group": 1,
      "type": 2,
      "text": "击破12个普通球场",
      "showName": "公会战-击破12个小怪关",
      "params": [
       12
      ],
      "items": [
       {
        "name": "初级潜能",
        "num": 200,
        "quality": 2
       },
       {
        "name": "金色卡包3",
        "num": 3,
        "quality": 4
       }
      ]
     },
     {
      "id": 21,
      "group": 1,
      "type": 7,
      "text": "协会积分排名第1",
      "showName": "公会战-球馆挑战·决赛中协会积分排名第1",
      "params": [
       1
      ],
      "items": [
       {
        "name": "钻石",
        "num": 800,
        "quality": 4
       },
       {
        "name": "登顶的王者",
        "num": 1,
        "quality": 5
       },
       {
        "name": "登顶之路·冠军",
        "num": 1,
        "quality": 5
       },
       {
        "name": "协会兑换凭证",
        "num": 2500,
        "quality": 3
       },
       {
        "name": "彩色卡包3",
        "num": 3,
        "quality": 5
       },
       {
        "name": "圣山投射协会赛·冠军纪念",
        "num": 1,
        "quality": 5
       }
      ]
     },
     {
      "id": 22,
      "group": 1,
      "type": 7,
      "text": "协会积分排名第2",
      "showName": "公会战-球馆挑战·决赛中协会积分排名第2",
      "params": [
       2
      ],
      "items": [
       {
        "name": "钻石",
        "num": 700,
        "quality": 4
       },
       {
        "name": "临峰的强者",
        "num": 1,
        "quality": 4
       },
       {
        "name": "登顶之路·亚军",
        "num": 1,
        "quality": 4
       },
       {
        "name": "协会兑换凭证",
        "num": 2000,
        "quality": 3
       },
       {
        "name": "彩色卡包3",
        "num": 3,
        "quality": 5
       },
       {
        "name": "圣山投射协会赛·亚军纪念",
        "num": 1,
        "quality": 4
       }
      ]
     },
     {
      "id": 23,
      "group": 1,
      "type": 7,
      "text": "协会积分排名第3",
      "showName": "公会战-球馆挑战·决赛中协会积分排名第3",
      "params": [
       3
      ],
      "items": [
       {
        "name": "钻石",
        "num": 600,
        "quality": 4
       },
       {
        "name": "攀登的勇者",
        "num": 1,
        "quality": 3
       },
       {
        "name": "登顶之路·季军",
        "num": 1,
        "quality": 3
       },
       {
        "name": "协会兑换凭证",
        "num": 1800,
        "quality": 3
       },
       {
        "name": "彩色卡包3",
        "num": 3,
        "quality": 5
       },
       {
        "name": "圣山投射协会赛·季军纪念",
        "num": 1,
        "quality": 3
       }
      ]
     },
     {
      "id": 24,
      "group": 1,
      "type": 7,
      "text": "协会积分排名4~10名",
      "showName": "公会战-球馆挑战·决赛中协会积分排名4~10名",
      "params": [
       4,
       10
      ],
      "items": [
       {
        "name": "钻石",
        "num": 600,
        "quality": 4
       },
       {
        "name": "踏雪的行者",
        "num": 1,
        "quality": 2
       },
       {
        "name": "登顶之路·入围",
        "num": 1,
        "quality": 2
       },
       {
        "name": "协会兑换凭证",
        "num": 1600,
        "quality": 3
       },
       {
        "name": "彩色卡包3",
        "num": 2,
        "quality": 5
       },
       {
        "name": "圣山投射协会赛·入围纪念",
        "num": 1,
        "quality": 2
       }
      ]
     },
     {
      "id": 25,
      "group": 1,
      "type": 7,
      "text": "协会积分排名11~50名",
      "showName": "公会战-球馆挑战·决赛中协会积分排名11~50名",
      "params": [
       11,
       50
      ],
      "items": [
       {
        "name": "启程的旅者",
        "num": 1,
        "quality": 1
       },
       {
        "name": "协会兑换凭证",
        "num": 1400,
        "quality": 3
       },
       {
        "name": "彩色卡包3",
        "num": 2,
        "quality": 5
       }
      ]
     },
     {
      "id": 26,
      "group": 1,
      "type": 7,
      "text": "协会积分排名51~150名",
      "showName": "公会战-球馆挑战·决赛中协会积分排名51~150名",
      "params": [
       51,
       150
      ],
      "items": [
       {
        "name": "钻石",
        "num": 550,
        "quality": 4
       },
       {
        "name": "协会兑换凭证",
        "num": 1200,
        "quality": 3
       },
       {
        "name": "金色卡包3",
        "num": 2,
        "quality": 4
       }
      ]
     },
     {
      "id": 27,
      "group": 1,
      "type": 7,
      "text": "协会积分排名151~300名",
      "showName": "公会战-球馆挑战·决赛中协会积分排名151~300名",
      "params": [
       151,
       300
      ],
      "items": [
       {
        "name": "钻石",
        "num": 500,
        "quality": 4
       },
       {
        "name": "协会兑换凭证",
        "num": 1000,
        "quality": 3
       },
       {
        "name": "金色卡包3",
        "num": 2,
        "quality": 4
       }
      ]
     },
     {
      "id": 28,
      "group": 1,
      "type": 7,
      "text": "协会积分排名301~600名",
      "showName": "公会战-球馆挑战·决赛中协会积分排名301~600名",
      "params": [
       301,
       600
      ],
      "items": [
       {
        "name": "钻石",
        "num": 500,
        "quality": 4
       },
       {
        "name": "协会兑换凭证",
        "num": 900,
        "quality": 3
       },
       {
        "name": "金色卡包3",
        "num": 2,
        "quality": 4
       }
      ]
     },
     {
      "id": 29,
      "group": 1,
      "type": 7,
      "text": "协会积分排名601~1200名",
      "showName": "公会战-球馆挑战·决赛中协会积分排名601~1200名",
      "params": [
       601,
       1200
      ],
      "items": [
       {
        "name": "钻石",
        "num": 450,
        "quality": 4
       },
       {
        "name": "协会兑换凭证",
        "num": 800,
        "quality": 3
       },
       {
        "name": "金色卡包3",
        "num": 1,
        "quality": 4
       }
      ]
     },
     {
      "id": 30,
      "group": 1,
      "type": 7,
      "text": "协会积分排名1201~2400名",
      "showName": "公会战-球馆挑战·决赛中协会积分排名1201~2400名",
      "params": [
       1201,
       2400
      ],
      "items": [
       {
        "name": "钻石",
        "num": 450,
        "quality": 4
       },
       {
        "name": "协会兑换凭证",
        "num": 700,
        "quality": 3
       },
       {
        "name": "金色卡包3",
        "num": 1,
        "quality": 4
       }
      ]
     },
     {
      "id": 31,
      "group": 1,
      "type": 7,
      "text": "协会积分排名2401~4000名",
      "showName": "公会战-球馆挑战·决赛中协会积分排名2401~4000名",
      "params": [
       2401,
       4000
      ],
      "items": [
       {
        "name": "钻石",
        "num": 400,
        "quality": 4
       },
       {
        "name": "协会兑换凭证",
        "num": 600,
        "quality": 3
       },
       {
        "name": "金色卡包3",
        "num": 1,
        "quality": 4
       }
      ]
     },
     {
      "id": 32,
      "group": 1,
      "type": 7,
      "text": "协会积分排名4001名以后",
      "showName": "公会战-球馆挑战·决赛中协会积分排名4001名以后",
      "params": [
       4001,
       99999
      ],
      "items": [
       {
        "name": "钻石",
        "num": 400,
        "quality": 4
       },
       {
        "name": "协会兑换凭证",
        "num": 500,
        "quality": 3
       },
       {
        "name": "金色卡包3",
        "num": 1,
        "quality": 4
       }
      ]
     },
     {
      "id": 15,
      "group": 1,
      "type": 3,
      "text": "击破1个精英球馆",
      "showName": "公会战-击破1个精英关",
      "params": [
       1
      ],
      "items": [
       {
        "name": "钻石",
        "num": 200,
        "quality": 4
       },
       {
        "name": "中级潜能-速",
        "num": 100,
        "quality": 3
       },
       {
        "name": "金色卡包3",
        "num": 3,
        "quality": 4
       }
      ]
     },
     {
      "id": 16,
      "group": 1,
      "type": 3,
      "text": "击破2个精英球馆",
      "showName": "公会战-击破2个精英关",
      "params": [
       2
      ],
      "items": [
       {
        "name": "钻石",
        "num": 100,
        "quality": 4
       },
       {
        "name": "中级潜能-速",
        "num": 100,
        "quality": 3
       },
       {
        "name": "彩色卡包3",
        "num": 2,
        "quality": 5
       }
      ]
     },
     {
      "id": 17,
      "group": 1,
      "type": 3,
      "text": "击破3个精英球馆",
      "showName": "公会战-击破3个精英关",
      "params": [
       3
      ],
      "items": [
       {
        "name": "高级潜能-速",
        "num": 100,
        "quality": 4
       },
       {
        "name": "异画卡UP卡包3",
        "num": 1,
        "quality": 5
       }
      ]
     },
     {
      "id": 18,
      "group": 1,
      "type": 2,
      "text": "击破4个普通球场",
      "showName": "公会战-击破4个小怪关",
      "params": [
       4
      ],
      "items": [
       {
        "name": "钻石",
        "num": 200,
        "quality": 4
       },
       {
        "name": "初级潜能",
        "num": 200,
        "quality": 2
       },
       {
        "name": "基础卡包3",
        "num": 3,
        "quality": 2
       }
      ]
     }
    ]
   },
   {
    "group": 2,
    "label": "表演赛 · 决赛场首通 / 血量进度奖励",
    "rows": [
     {
      "id": 10,
      "group": 2,
      "type": 8,
      "text": "决赛场首通协会荣誉！",
      "showName": "公会战-攻坚期-首杀奖励",
      "params": [
       1
      ],
      "items": [
       {
        "name": "投射之星",
        "num": 1,
        "quality": 5
       },
       {
        "name": "异画卡UP卡包3",
        "num": 1,
        "quality": 5
       }
      ]
     },
     {
      "id": 11,
      "group": 2,
      "type": 4,
      "text": "决赛场通关进度达25%",
      "showName": "公会战-BOSS血量打掉25%",
      "params": [
       25
      ],
      "items": [
       {
        "name": "中级潜能-速",
        "num": 100,
        "quality": 3
       },
       {
        "name": "协会兑换凭证",
        "num": 100,
        "quality": 3
       },
       {
        "name": "基础卡包3",
        "num": 5,
        "quality": 2
       }
      ]
     },
     {
      "id": 12,
      "group": 2,
      "type": 4,
      "text": "决赛场通关进度达50%",
      "showName": "公会战-BOSS血量打掉50%",
      "params": [
       50
      ],
      "items": [
       {
        "name": "器材特殊招募券",
        "num": 1,
        "quality": 4
       },
       {
        "name": "协会兑换凭证",
        "num": 200,
        "quality": 3
       },
       {
        "name": "基础卡包3",
        "num": 5,
        "quality": 2
       }
      ]
     },
     {
      "id": 13,
      "group": 2,
      "type": 4,
      "text": "决赛场通关进度达75%",
      "showName": "公会战-BOSS血量打掉75%",
      "params": [
       75
      ],
      "items": [
       {
        "name": "器材特殊招募券",
        "num": 1,
        "quality": 4
       },
       {
        "name": "协会兑换凭证",
        "num": 300,
        "quality": 3
       },
       {
        "name": "金色卡包3",
        "num": 3,
        "quality": 4
       }
      ]
     },
     {
      "id": 14,
      "group": 2,
      "type": 4,
      "text": "协会赛决赛场全通关！",
      "showName": "公会战-BOSS血量打掉100%",
      "params": [
       100
      ],
      "items": [
       {
        "name": "钻石",
        "num": 200,
        "quality": 4
       },
       {
        "name": "协会兑换凭证",
        "num": 400,
        "quality": 3
       },
       {
        "name": "彩色卡包3",
        "num": 2,
        "quality": 5
       }
      ]
     },
     {
      "id": 10,
      "group": 2,
      "type": 8,
      "text": "决赛场首通协会荣誉！",
      "showName": "公会战-攻坚期-首杀奖励",
      "params": [
       1
      ],
      "items": [
       {
        "name": "投射之星",
        "num": 1,
        "quality": 5
       },
       {
        "name": "异画卡UP卡包3",
        "num": 1,
        "quality": 5
       }
      ]
     },
     {
      "id": 11,
      "group": 2,
      "type": 4,
      "text": "决赛场通关进度达25%",
      "showName": "公会战-BOSS血量打掉25%",
      "params": [
       25
      ],
      "items": [
       {
        "name": "中级潜能-速",
        "num": 100,
        "quality": 3
       },
       {
        "name": "协会兑换凭证",
        "num": 100,
        "quality": 3
       },
       {
        "name": "基础卡包3",
        "num": 5,
        "quality": 2
       }
      ]
     },
     {
      "id": 12,
      "group": 2,
      "type": 4,
      "text": "决赛场通关进度达50%",
      "showName": "公会战-BOSS血量打掉50%",
      "params": [
       50
      ],
      "items": [
       {
        "name": "器材特殊招募券",
        "num": 1,
        "quality": 4
       },
       {
        "name": "协会兑换凭证",
        "num": 200,
        "quality": 3
       },
       {
        "name": "基础卡包3",
        "num": 5,
        "quality": 2
       }
      ]
     },
     {
      "id": 13,
      "group": 2,
      "type": 4,
      "text": "决赛场通关进度达75%",
      "showName": "公会战-BOSS血量打掉75%",
      "params": [
       75
      ],
      "items": [
       {
        "name": "器材特殊招募券",
        "num": 1,
        "quality": 4
       },
       {
        "name": "协会兑换凭证",
        "num": 300,
        "quality": 3
       },
       {
        "name": "金色卡包3",
        "num": 3,
        "quality": 4
       }
      ]
     },
     {
      "id": 14,
      "group": 2,
      "type": 4,
      "text": "协会赛决赛场全通关！",
      "showName": "公会战-BOSS血量打掉100%",
      "params": [
       100
      ],
      "items": [
       {
        "name": "钻石",
        "num": 200,
        "quality": 4
       },
       {
        "name": "协会兑换凭证",
        "num": 400,
        "quality": 3
       },
       {
        "name": "彩色卡包3",
        "num": 2,
        "quality": 5
       }
      ]
     }
    ]
   },
   {
    "group": 3,
    "label": "每日挑战 / 累积出刀奖励",
    "rows": [
     {
      "id": 2,
      "group": 3,
      "type": 1,
      "text": "挑战2次",
      "showName": "公会战-攻坚期·每日出刀2次",
      "params": [
       2
      ],
      "items": [
       {
        "name": "器材抽选券",
        "num": 1,
        "quality": 4
       }
      ]
     },
     {
      "id": 3,
      "group": 3,
      "type": 9,
      "text": "挑战2次",
      "showName": "公会战-攻坚期·累积出刀2次",
      "params": [
       2
      ],
      "items": [
       {
        "name": "初级潜能",
        "num": 200,
        "quality": 2
       }
      ]
     },
     {
      "id": 4,
      "group": 3,
      "type": 9,
      "text": "挑战4次",
      "showName": "公会战-攻坚期·累积出刀4次",
      "params": [
       4
      ],
      "items": [
       {
        "name": "器材特殊招募券",
        "num": 1,
        "quality": 4
       }
      ]
     },
     {
      "id": 5,
      "group": 3,
      "type": 9,
      "text": "挑战6次",
      "showName": "公会战-攻坚期·累积出刀6次",
      "params": [
       6
      ],
      "items": [
       {
        "name": "中级潜能-速",
        "num": 100,
        "quality": 3
       }
      ]
     },
     {
      "id": 6,
      "group": 3,
      "type": 9,
      "text": "挑战9次",
      "showName": "公会战-攻坚期·累积出刀9次",
      "params": [
       9
      ],
      "items": [
       {
        "name": "器材特殊招募券",
        "num": 1,
        "quality": 4
       }
      ]
     },
     {
      "id": 7,
      "group": 3,
      "type": 9,
      "text": "挑战12次",
      "showName": "公会战-攻坚期·累积出刀12次",
      "params": [
       12
      ],
      "items": [
       {
        "name": "钻石",
        "num": 200,
        "quality": 4
       }
      ]
     },
     {
      "id": 8,
      "group": 3,
      "type": 10,
      "text": "挑战2次",
      "showName": "公会战-挑战期·累积出刀2次",
      "params": [
       2
      ],
      "items": [
       {
        "name": "中级潜能-速",
        "num": 100,
        "quality": 3
       }
      ]
     },
     {
      "id": 9,
      "group": 3,
      "type": 10,
      "text": "挑战4次",
      "showName": "公会战-挑战期·累积出刀4次",
      "params": [
       4
      ],
      "items": [
       {
        "name": "器材特殊招募券",
        "num": 1,
        "quality": 4
       }
      ]
     },
     {
      "id": 8,
      "group": 3,
      "type": 10,
      "text": "挑战2次",
      "showName": "公会战-挑战期·累积出刀2次",
      "params": [
       2
      ],
      "items": [
       {
        "name": "中级潜能-速",
        "num": 100,
        "quality": 3
       }
      ]
     },
     {
      "id": 9,
      "group": 3,
      "type": 10,
      "text": "挑战4次",
      "showName": "公会战-挑战期·累积出刀4次",
      "params": [
       4
      ],
      "items": [
       {
        "name": "器材特殊招募券",
        "num": 1,
        "quality": 4
       }
      ]
     }
    ]
   }
  ]
 },
 "honors": [
  "圣山投射协会赛·冠军纪念",
  "圣山投射协会赛·亚军纪念",
  "圣山投射协会赛·季军纪念",
  "圣山投射协会赛·入围纪念"
 ],
 "tasks": [
  {
   "group": 1,
   "id": 1,
   "title": "通关协会赛决赛场"
  },
  {
   "group": 2,
   "id": 2,
   "title": "挑战任意球场1次"
  },
  {
   "group": 2,
   "id": 3,
   "title": "挑战任意球场2次"
  }
 ],
 "mails": [
  {
   "id": 40201,
   "title": "协会集换奖励补发",
   "content": "教练您好，这是您在公会集换成功的球星卡。由于您已退出公会，特此补发，请查收。"
  },
  {
   "id": 40202,
   "title": "协会求助奖励补发",
   "content": "教练您好，这是您在公会求助成功的球星卡。由于您已退出公会，特此补发，请查收。"
  },
  {
   "id": 40205,
   "title": "协会升级奖励",
   "content": "教练您好，感谢您的付出，在大家共同努力下协会升级了。这是升级所得奖励，请查收。"
  },
  {
   "id": 40206,
   "title": "协会福利",
   "content": "教练您好，协会为大家准备了一些物资，请查收。"
  },
  {
   "id": 40207,
   "title": "协会解散",
   "content": "教练您好，因协会长期无人活跃，系统已自动解散该协会。您现在可以自由加入其他协会，或创建全新协会重新起航。"
  },
  {
   "id": 40208,
   "title": "协会赛奖励补发",
   "content": "教练您好，感谢您参与圣山协会赛！这是您未来得及领取的奖励，现给您进行补发，请查收~"
  },
  {
   "id": 40209,
   "title": "协会分站表演赛奖励发放",
   "content": "教练您好，恭喜协会通关分站表演赛！在大家共同努力下，在第${number_id:1}天通关了分站表演赛的决赛场！以下奖励请查收~"
  },
  {
   "id": 40210,
   "title": "协会分站表演赛奖励发放",
   "content": "教练您好，感谢大家参与协会赛，以下奖励请查收~"
  },
  {
   "id": 40211,
   "title": "圣山投射协会赛直播周奖励补发",
   "content": "教练您好，「圣山投射协会赛直播周」活动已结束。您在活动中已达成条件但尚未领取的奖励，现通过邮件补发，请查收附件。"
  },
  {
   "id": 40212,
   "title": "协会赛奖励补发",
   "content": "教练您好，感谢大家积极参与协会赛，这是您昨日未来得及领取的参与奖励，请查收~"
  }
 ],
 "reddots": [
  {
   "id": 300200,
   "name": "公会战可领奖"
  },
  {
   "id": 300201,
   "name": "公会战-表演赛奖励"
  },
  {
   "id": 300202,
   "name": "公会战-挑战赛奖励"
  },
  {
   "id": 300203,
   "name": "公会战-表演赛-协会奖励"
  },
  {
   "id": 300204,
   "name": "公会战-表演赛-协会荣誉"
  },
  {
   "id": 300205,
   "name": "公会战-表演赛-参与奖励"
  },
  {
   "id": 300206,
   "name": "公会战-挑战赛-协会排名"
  },
  {
   "id": 300207,
   "name": "公会战-挑战赛-协会积分"
  },
  {
   "id": 300208,
   "name": "公会战-挑战赛-参与奖励"
  },
  {
   "id": 300209,
   "name": "公会战-挑战赛-可挑战次数"
  }
 ]
};

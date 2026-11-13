/** src/data/pvp.js —— 【自动生成，请勿手改】PVP 三阵推荐 */
window.BBTPvPData = {
 "schema": "pvp-formations-v1",
 "generatedAt": "2026-11-09",
 "source": "position_fit_v3（V4.3 星级 raw）+ character_types_v3 + team_synergy（体系/增益源/得分手）+ 寒溟 PVP 口径",
 "rules": {
  "teamSize": 5,
  "formations": 3,
  "uniqueCharacters": 15,
  "noFieldBonus": true,
  "note": "PVP 无场地加成；唯一硬约束=角色池深度（15 名不同角色）。评分=位置适配 raw + 体系亲和 + 体系增益源/得分手加成；三队总分尽量均衡（平衡惩罚）。"
 },
 "mainPlan": {
  "key": "三体系各一队",
  "label": "攻筐队 + 中投队 + 三分队（推荐）",
  "description": "寒溟思路：3 阵按攻框/中投/三分各配一队，15 人不重复；无场地加成，只吃体系内角色技能协同。",
  "systems": [
   "paint",
   "mid",
   "three"
  ],
  "teams": [
   {
    "system": "paint",
    "label": "攻筐队",
    "score": 5.5369,
    "roleCounts": {
     "mainScorers": 0,
     "ballDependent": 4,
     "defenders": 3,
     "playmakers": 2,
     "rebounders": 1,
     "scorerTags": 1,
     "staminaTeam": 0,
     "organizers": 2,
     "energySupport": 2
    },
    "positions": {
     "控卫": {
      "name": "白神 时久",
      "stars": 5,
      "rank": 2,
      "raw": 0.7584,
      "type": "support",
      "typeLabel": "组织辅助型",
      "affinity": 0.78,
      "buffSource": false,
      "scorer": false,
      "roleLabel": "组织核心（防守）",
      "role": {
       "scorer": false,
       "defender": true,
       "playmaker": true,
       "rebounder": false,
       "ballScorer": false
      }
     },
     "分卫": {
      "name": "美伽 未来",
      "stars": 4,
      "rank": 7,
      "raw": 0.7169,
      "type": "paint",
      "typeLabel": "攻筐型",
      "affinity": 1,
      "buffSource": false,
      "scorer": true,
      "roleLabel": "组织核心（持球进攻）",
      "role": {
       "scorer": false,
       "defender": false,
       "playmaker": true,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "小前": {
      "name": "和泉 香织",
      "stars": 3,
      "rank": 21,
      "raw": 0.6384,
      "type": "paint",
      "typeLabel": "攻筐型",
      "affinity": 1,
      "buffSource": true,
      "scorer": true,
      "roleLabel": "主攻核心",
      "role": {
       "scorer": true,
       "defender": false,
       "playmaker": false,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "大前": {
      "name": "佐久间 雨乃",
      "stars": 5,
      "rank": 1,
      "raw": 0.8438,
      "type": "paint",
      "typeLabel": "攻筐型",
      "affinity": 1,
      "buffSource": true,
      "scorer": true,
      "roleLabel": "主攻核心（攻框/篮板副核/防守）",
      "role": {
       "scorer": true,
       "defender": true,
       "playmaker": false,
       "rebounder": true,
       "ballScorer": true
      }
     },
     "中锋": {
      "name": "希雅·奥黛拉",
      "stars": 4,
      "rank": 4,
      "raw": 0.7564,
      "type": "paint",
      "typeLabel": "攻筐型",
      "affinity": 1,
      "buffSource": true,
      "scorer": false,
      "roleLabel": "防守核心（主攻核心/内线攻防）",
      "role": {
       "scorer": false,
       "defender": true,
       "playmaker": false,
       "rebounder": false,
       "ballScorer": true
      }
     }
    }
   },
   {
    "system": "mid",
    "label": "中投队",
    "score": 5.5152,
    "roleCounts": {
     "mainScorers": 0,
     "ballDependent": 4,
     "defenders": 2,
     "playmakers": 1,
     "rebounders": 1,
     "scorerTags": 0,
     "staminaTeam": 0,
     "organizers": 1,
     "energySupport": 0
    },
    "positions": {
     "控卫": {
      "name": "先斗 月绮",
      "stars": 4,
      "rank": 4,
      "raw": 0.7336,
      "type": "mid",
      "typeLabel": "中投型",
      "affinity": 1,
      "buffSource": true,
      "scorer": true,
      "roleLabel": "防守核心（持球进攻）",
      "role": {
       "scorer": false,
       "defender": true,
       "playmaker": false,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "分卫": {
      "name": "卧云 真昼",
      "stars": 5,
      "rank": 2,
      "raw": 0.8174,
      "type": "paint",
      "typeLabel": "攻筐型",
      "affinity": 0.78,
      "buffSource": true,
      "scorer": false,
      "roleLabel": "主攻核心（中投/突破选卡）",
      "role": {
       "scorer": true,
       "defender": false,
       "playmaker": false,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "小前": {
      "name": "毒岛 黛也",
      "stars": 3,
      "rank": 14,
      "raw": 0.6572,
      "type": "mid",
      "typeLabel": "中投型",
      "affinity": 1,
      "buffSource": true,
      "scorer": true,
      "roleLabel": "防守核心（持球进攻）",
      "role": {
       "scorer": false,
       "defender": true,
       "playmaker": false,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "大前": {
      "name": "百目鬼 剑",
      "stars": 4,
      "rank": 5,
      "raw": 0.7568,
      "type": "mid",
      "typeLabel": "中投型",
      "affinity": 1,
      "buffSource": false,
      "scorer": true,
      "roleLabel": "组织核心（持球进攻）",
      "role": {
       "scorer": false,
       "defender": false,
       "playmaker": true,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "中锋": {
      "name": "千圣·贝尔丝",
      "stars": 5,
      "rank": 3,
      "raw": 0.7742,
      "type": "rebound",
      "typeLabel": "篮板型",
      "affinity": 0.78,
      "buffSource": true,
      "scorer": false,
      "roleLabel": "篮板主核（补篮/进攻篮板/投射）",
      "role": {
       "scorer": true,
       "defender": false,
       "playmaker": false,
       "rebounder": true,
       "ballScorer": false
      }
     }
    }
   },
   {
    "system": "three",
    "label": "三分队",
    "score": 5.403,
    "roleCounts": {
     "mainScorers": 0,
     "ballDependent": 3,
     "defenders": 1,
     "playmakers": 2,
     "rebounders": 1,
     "scorerTags": 1,
     "staminaTeam": 0,
     "organizers": 2,
     "energySupport": 1
    },
    "positions": {
     "控卫": {
      "name": "羽田 朱志香",
      "stars": 3,
      "rank": 13,
      "raw": 0.6209,
      "type": "three",
      "typeLabel": "三分型",
      "affinity": 1,
      "buffSource": false,
      "scorer": true,
      "roleLabel": "组织核心（持球进攻）",
      "role": {
       "scorer": false,
       "defender": false,
       "playmaker": true,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "分卫": {
      "name": "美星 栗栖",
      "stars": 4,
      "rank": 4,
      "raw": 0.7302,
      "type": "three",
      "typeLabel": "三分型",
      "affinity": 1,
      "buffSource": true,
      "scorer": true,
      "roleLabel": "副C（三分/后撤/投射）",
      "role": {
       "scorer": true,
       "defender": false,
       "playmaker": false,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "小前": {
      "name": "藤松 玖怜",
      "stars": 3,
      "rank": 23,
      "raw": 0.631,
      "type": "swing",
      "typeLabel": "投射摇摆型",
      "affinity": 1,
      "buffSource": true,
      "scorer": true,
      "roleLabel": "组织核心（全队投射/防守副核）",
      "role": {
       "scorer": false,
       "defender": true,
       "playmaker": true,
       "rebounder": false,
       "ballScorer": false
      }
     },
     "大前": {
      "name": "野上 泷",
      "stars": 4,
      "rank": 4,
      "raw": 0.7635,
      "type": "swing",
      "typeLabel": "投射摇摆型",
      "affinity": 1,
      "buffSource": true,
      "scorer": true,
      "roleLabel": "主攻核心（三分/后撤）",
      "role": {
       "scorer": true,
       "defender": false,
       "playmaker": false,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "中锋": {
      "name": "亚理纱 贾斯敏",
      "stars": 5,
      "rank": 1,
      "raw": 0.8144,
      "type": "rebound",
      "typeLabel": "篮板型",
      "affinity": 0.78,
      "buffSource": false,
      "scorer": false,
      "roleLabel": "篮板主核（补篮/进攻篮板）",
      "role": {
       "scorer": true,
       "defender": false,
       "playmaker": false,
       "rebounder": true,
       "ballScorer": false
      }
     }
    }
   }
  ],
  "totalScore": 16.4551,
  "teamScores": [
   5.5369,
   5.5152,
   5.403
  ],
  "balance": 0.0587,
  "uniqueCount": 15
 },
 "userLineups": {
  "generatedAt": "2026-11-09",
  "source": "寒溟实机三阵口述（2026-11-09）",
  "note": "寒溟当前 PVP 配置，作为配队基线；每阵 5 人、15 人不重复。",
  "teams": [
   {
    "system": "paint",
    "label": "攻框一阵",
    "positions": {
     "控卫": {
      "name": "白神 时久",
      "roleNote": "组织核心（负责突分传球）"
     },
     "分卫": {
      "name": "闪堂电",
      "roleNote": "攻框核心得分手"
     },
     "小前": {
      "name": "羽濑川 湊",
      "roleNote": "吃突破加成的副C"
     },
     "大前": {
      "name": "佐久间 雨乃",
      "roleNote": "以突破快攻为核心的3C，配防守篮板被动"
     },
     "中锋": {
      "name": "希雅·奥黛拉",
      "roleNote": "核心防守主力，内线攻防并用技能盖帽，特配篮板被动"
     }
    }
   },
   {
    "system": "mid",
    "label": "中投二阵",
    "positions": {
     "控卫": {
      "name": "林原 树里",
      "roleNote": "防守核心（弱化敌方分卫/控卫属性）"
     },
     "分卫": {
      "name": "卧云 真昼",
      "roleNote": "妖刀乱舞=突破选卡后接中投，吃突破加成"
     },
     "小前": {
      "name": "望月 透",
      "roleNote": "核心得分手"
     },
     "大前": {
      "name": "春澄 永远",
      "roleNote": "组织核心 + 篮板副核 + 恢复耐力辅助"
     },
     "中锋": {
      "name": "亚理纱 贾斯敏",
      "roleNote": "篮板主核，抢蓝+补篮特化"
     }
    }
   },
   {
    "system": "three",
    "label": "三分三阵",
    "positions": {
     "控卫": {
      "name": "克拉丽丝·波洛",
      "roleNote": "组织核心（突分传球+回耐；被动提升接球人投射）"
     },
     "分卫": {
      "name": "藤松 玖怜",
      "roleNote": "组织副核（全队投射），吃三分防守加成"
     },
     "小前": {
      "name": "美星 栗栖",
      "roleNote": "三分副C（后撤），吃防守带来的投射加成，强化PF/SF投射"
     },
     "大前": {
      "name": "野上 泷",
      "roleNote": "三分主C（后撤），核心得分"
     },
     "中锋": {
      "name": "千圣·贝尔丝",
      "roleNote": "进攻抢蓝补篮特化；被动给SF/SG提升投射，补足SF投射能力"
     }
    }
   }
  ]
 },
 "roleCatalog": [
  {
   "name": "澪奈·贾妮丝",
   "type": "paint",
   "typeLabel": "攻筐型",
   "style": "防守者",
   "title": "内线杀器",
   "primaryRole": "防守核心",
   "secondaryRoles": [
    "持球进攻"
   ],
   "ballDependent": true,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.575,
    "分卫": 0.6402,
    "小前": 0.6549,
    "大前": 0.6027,
    "中锋": 0.5983
   },
   "starsByPos": {
    "控卫": 3,
    "分卫": 3,
    "小前": 3,
    "大前": 3,
    "中锋": 4
   }
  },
  {
   "name": "龙宫寺 心叶",
   "type": "three",
   "typeLabel": "三分型",
   "style": "组织者",
   "title": "三分好手",
   "primaryRole": "组织核心",
   "secondaryRoles": [
    "持球进攻"
   ],
   "ballDependent": true,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.556,
    "分卫": 0.6078,
    "小前": 0.5932,
    "大前": 0.5938,
    "中锋": 0.4357
   },
   "starsByPos": {
    "控卫": 2,
    "分卫": 2,
    "小前": 2,
    "大前": 3,
    "中锋": 2
   }
  },
  {
   "name": "近江 奏",
   "type": "mid",
   "typeLabel": "中投型",
   "style": "组织者",
   "title": "中投好手",
   "primaryRole": "组织核心",
   "secondaryRoles": [
    "持球进攻"
   ],
   "ballDependent": true,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "self",
   "energySupport": false,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.563,
    "分卫": 0.7231,
    "小前": 0.6643,
    "大前": 0.5386,
    "中锋": 0.3805
   },
   "starsByPos": {
    "控卫": 2,
    "分卫": 4,
    "小前": 3,
    "大前": 2,
    "中锋": 1
   }
  },
  {
   "name": "和泉 香织",
   "type": "paint",
   "typeLabel": "攻筐型",
   "style": "得分手",
   "title": "充能辅助",
   "primaryRole": "主攻核心",
   "secondaryRoles": [],
   "ballDependent": true,
   "note": "启发式（类型/定位）",
   "scorerTag": true,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.7378,
    "分卫": 0.6472,
    "小前": 0.6384,
    "大前": 0.5619,
    "中锋": 0.496
   },
   "starsByPos": {
    "控卫": 5,
    "分卫": 3,
    "小前": 3,
    "大前": 3,
    "中锋": 3
   }
  },
  {
   "name": "亚理纱 贾斯敏",
   "type": "rebound",
   "typeLabel": "篮板型",
   "style": "得分手",
   "title": "内线杀器",
   "primaryRole": "篮板主核",
   "secondaryRoles": [
    "补篮",
    "进攻篮板"
   ],
   "ballDependent": false,
   "note": "篮板主核，抢蓝补篮特化",
   "scorerTag": true,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.3769,
    "分卫": 0.4383,
    "小前": 0.5803,
    "大前": 0.773,
    "中锋": 0.8144
   },
   "starsByPos": {
    "控卫": 1,
    "分卫": 1,
    "小前": 2,
    "大前": 5,
    "中锋": 5
   }
  },
  {
   "name": "洺瑶",
   "type": "support",
   "typeLabel": "组织辅助型",
   "style": "防守者",
   "title": "防守大闸",
   "primaryRole": "组织核心",
   "secondaryRoles": [],
   "ballDependent": false,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.6084,
    "分卫": 0.5963,
    "小前": 0.6028,
    "大前": 0.6128,
    "中锋": 0.6477
   },
   "starsByPos": {
    "控卫": 3,
    "分卫": 2,
    "小前": 2,
    "大前": 3,
    "中锋": 4
   }
  },
  {
   "name": "闪堂电",
   "type": "paint",
   "typeLabel": "攻筐型",
   "style": "得分手",
   "title": "突破达人",
   "primaryRole": "主攻核心",
   "secondaryRoles": [
    "攻框"
   ],
   "ballDependent": true,
   "note": "攻框核心得分手",
   "scorerTag": true,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.6346,
    "分卫": 0.6929,
    "小前": 0.6831,
    "大前": 0.6,
    "中锋": 0.5252
   },
   "starsByPos": {
    "控卫": 4,
    "分卫": 4,
    "小前": 4,
    "大前": 3,
    "中锋": 3
   }
  },
  {
   "name": "克拉丽丝·波洛",
   "type": "support",
   "typeLabel": "组织辅助型",
   "style": "组织者",
   "title": "外线辅助",
   "primaryRole": "组织核心",
   "secondaryRoles": [
    "回耐",
    "传球"
   ],
   "ballDependent": true,
   "note": "突分传球兼顾回耐；被动提升接球人投射",
   "scorerTag": false,
   "staminaSupport": "team",
   "energySupport": false,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.7794,
    "分卫": 0.6484,
    "小前": 0.5617,
    "大前": 0.4367,
    "中锋": 0.3435
   },
   "starsByPos": {
    "控卫": 5,
    "分卫": 3,
    "小前": 1,
    "大前": 1,
    "中锋": 1
   }
  },
  {
   "name": "早濑 千秋",
   "type": "rebound",
   "typeLabel": "篮板型",
   "style": "防守者",
   "title": "内线大闸",
   "primaryRole": "防守核心",
   "secondaryRoles": [],
   "ballDependent": false,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.4032,
    "分卫": 0.4786,
    "小前": 0.4816,
    "大前": 0.6583,
    "中锋": 0.6467
   },
   "starsByPos": {
    "控卫": 1,
    "分卫": 1,
    "小前": 1,
    "大前": 3,
    "中锋": 4
   }
  },
  {
   "name": "羽田 朱志香",
   "type": "three",
   "typeLabel": "三分型",
   "style": "组织者",
   "title": "三分达人",
   "primaryRole": "组织核心",
   "secondaryRoles": [
    "持球进攻"
   ],
   "ballDependent": true,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.6209,
    "分卫": 0.6832,
    "小前": 0.5549,
    "大前": 0.4106,
    "中锋": 0.3247
   },
   "starsByPos": {
    "控卫": 3,
    "分卫": 3,
    "小前": 1,
    "大前": 1,
    "中锋": 1
   }
  },
  {
   "name": "望月 透",
   "type": "mid",
   "typeLabel": "中投型",
   "style": "得分手",
   "title": "后期大核",
   "primaryRole": "主攻核心",
   "secondaryRoles": [
    "中投"
   ],
   "ballDependent": true,
   "note": "中投核心得分手",
   "scorerTag": true,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.5166,
    "分卫": 0.6364,
    "小前": 0.734,
    "大前": 0.5553,
    "中锋": 0.4176
   },
   "starsByPos": {
    "控卫": 1,
    "分卫": 3,
    "小前": 5,
    "大前": 3,
    "中锋": 2
   }
  },
  {
   "name": "百目鬼 剑",
   "type": "mid",
   "typeLabel": "中投型",
   "style": "组织者",
   "title": "中投达人",
   "primaryRole": "组织核心",
   "secondaryRoles": [
    "持球进攻"
   ],
   "ballDependent": true,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.5833,
    "分卫": 0.7315,
    "小前": 0.8006,
    "大前": 0.7568,
    "中锋": 0.5105
   },
   "starsByPos": {
    "控卫": 3,
    "分卫": 5,
    "小前": 5,
    "大前": 4,
    "中锋": 3
   }
  },
  {
   "name": "藤松 玖怜",
   "type": "swing",
   "typeLabel": "投射摇摆型",
   "style": "防守者",
   "title": "进攻妨害",
   "primaryRole": "组织核心",
   "secondaryRoles": [
    "全队投射",
    "防守副核"
   ],
   "ballDependent": false,
   "note": "组织副核：大招全队增加投射，中投/三分都适配；回耐可由器材补",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.6062,
    "分卫": 0.6901,
    "小前": 0.631,
    "大前": 0.5384,
    "中锋": 0.4443
   },
   "starsByPos": {
    "控卫": 3,
    "分卫": 4,
    "小前": 3,
    "大前": 2,
    "中锋": 2
   }
  },
  {
   "name": "绿川 步梦",
   "type": "support",
   "typeLabel": "组织辅助型",
   "style": "组织者",
   "title": "防守妨害",
   "primaryRole": "组织核心",
   "secondaryRoles": [],
   "ballDependent": false,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.579,
    "分卫": 0.5885,
    "小前": 0.5009,
    "大前": 0.4596,
    "中锋": 0.5196
   },
   "starsByPos": {
    "控卫": 3,
    "分卫": 2,
    "小前": 1,
    "大前": 1,
    "中锋": 3
   }
  },
  {
   "name": "雨森 琉璃",
   "type": "mid",
   "typeLabel": "中投型",
   "style": "组织者",
   "title": "得分手",
   "primaryRole": "组织核心",
   "secondaryRoles": [],
   "ballDependent": false,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.5309,
    "分卫": 0.675,
    "小前": 0.7081,
    "大前": 0.7549,
    "中锋": 0.5393
   },
   "starsByPos": {
    "控卫": 1,
    "分卫": 3,
    "小前": 4,
    "大前": 4,
    "中锋": 3
   }
  },
  {
   "name": "皆川 式",
   "type": "support",
   "typeLabel": "组织辅助型",
   "style": "组织者",
   "title": "抢断达人",
   "primaryRole": "组织核心",
   "secondaryRoles": [
    "回能"
   ],
   "ballDependent": false,
   "note": "官方定位组织者；核心=骇客充能回能；防守属性附带，不能算防守核心",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": true,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.6244,
    "分卫": 0.6685,
    "小前": 0.6794,
    "大前": 0.5385,
    "中锋": 0.477
   },
   "starsByPos": {
    "控卫": 3,
    "分卫": 3,
    "小前": 4,
    "大前": 2,
    "中锋": 3
   }
  },
  {
   "name": "毒岛 黛也",
   "type": "mid",
   "typeLabel": "中投型",
   "style": "防守者",
   "title": "中投达人",
   "primaryRole": "防守核心",
   "secondaryRoles": [
    "持球进攻"
   ],
   "ballDependent": true,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.586,
    "分卫": 0.8196,
    "小前": 0.6572,
    "大前": 0.5485,
    "中锋": 0.4154
   },
   "starsByPos": {
    "控卫": 3,
    "分卫": 5,
    "小前": 3,
    "大前": 2,
    "中锋": 2
   }
  },
  {
   "name": "名雪 纱夜",
   "type": "support",
   "typeLabel": "组织辅助型",
   "style": "组织者",
   "title": "团队回复定位（编辑概括；客户端称号未展示）",
   "primaryRole": "组织核心",
   "secondaryRoles": [],
   "ballDependent": false,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "team",
   "energySupport": false,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.7253,
    "分卫": 0.5959,
    "小前": 0.5314,
    "大前": 0.437,
    "中锋": 0.3641
   },
   "starsByPos": {
    "控卫": 4,
    "分卫": 2,
    "小前": 1,
    "大前": 1,
    "中锋": 1
   }
  },
  {
   "name": "佐久间 雨乃",
   "type": "paint",
   "typeLabel": "攻筐型",
   "style": "防守者",
   "title": "扣篮达人",
   "primaryRole": "主攻核心",
   "secondaryRoles": [
    "攻框",
    "篮板副核",
    "防守"
   ],
   "ballDependent": true,
   "note": "突破快攻核心3C，配防守篮板被动",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.5375,
    "分卫": 0.6074,
    "小前": 0.7128,
    "大前": 0.8438,
    "中锋": 0.6477
   },
   "starsByPos": {
    "控卫": 2,
    "分卫": 2,
    "小前": 5,
    "大前": 5,
    "中锋": 4
   }
  },
  {
   "name": "千圣·贝尔丝",
   "type": "rebound",
   "typeLabel": "篮板型",
   "style": "篮板手",
   "title": "篮板猛兽",
   "primaryRole": "篮板主核",
   "secondaryRoles": [
    "补篮",
    "进攻篮板",
    "投射"
   ],
   "ballDependent": false,
   "note": "进攻抢蓝补篮特化，被动给SF/SG提升投射",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.3878,
    "分卫": 0.4605,
    "小前": 0.6035,
    "大前": 0.7764,
    "中锋": 0.7742
   },
   "starsByPos": {
    "控卫": 1,
    "分卫": 1,
    "小前": 2,
    "大前": 5,
    "中锋": 5
   }
  },
  {
   "name": "稻叶 杏里",
   "type": "defense",
   "typeLabel": "防守型",
   "style": "得分手",
   "title": "耐力妨害",
   "primaryRole": "防守核心",
   "secondaryRoles": [],
   "ballDependent": false,
   "note": "启发式（类型/定位）",
   "scorerTag": true,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.5457,
    "分卫": 0.602,
    "小前": 0.6387,
    "大前": 0.6659,
    "中锋": 0.6067
   },
   "starsByPos": {
    "控卫": 2,
    "分卫": 2,
    "小前": 3,
    "大前": 3,
    "中锋": 4
   }
  },
  {
   "name": "清水 万里",
   "type": "support",
   "typeLabel": "组织辅助型",
   "style": "篮板手",
   "title": "内线辅助",
   "primaryRole": "组织核心",
   "secondaryRoles": [],
   "ballDependent": false,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "team",
   "energySupport": false,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.6858,
    "分卫": 0.6288,
    "小前": 0.6554,
    "大前": 0.5701,
    "中锋": 0.4156
   },
   "starsByPos": {
    "控卫": 4,
    "分卫": 3,
    "小前": 3,
    "大前": 3,
    "中锋": 2
   }
  },
  {
   "name": "榎本 纯那",
   "type": "paint",
   "typeLabel": "攻筐型",
   "style": "防守者",
   "title": "上篮达人",
   "primaryRole": "防守核心",
   "secondaryRoles": [
    "持球进攻"
   ],
   "ballDependent": true,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.5009,
    "分卫": 0.5671,
    "小前": 0.6565,
    "大前": 0.7451,
    "中锋": 0.7756
   },
   "starsByPos": {
    "控卫": 1,
    "分卫": 1,
    "小前": 3,
    "大前": 4,
    "中锋": 5
   }
  },
  {
   "name": "春澄 永远",
   "type": "support",
   "typeLabel": "组织辅助型",
   "style": "篮板手",
   "title": "客户端称号未展示（可选称号未通过平台审核）",
   "primaryRole": "组织核心",
   "secondaryRoles": [
    "篮板副核",
    "回耐"
   ],
   "ballDependent": false,
   "note": "核心=忠诚守护回耐力+弹跳；篮板只是小幅（半个篮板）",
   "scorerTag": false,
   "staminaSupport": "team",
   "energySupport": false,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.5445,
    "分卫": 0.5639,
    "小前": 0.6613,
    "大前": 0.6919,
    "中锋": 0.5144
   },
   "starsByPos": {
    "控卫": 2,
    "分卫": 1,
    "小前": 3,
    "大前": 4,
    "中锋": 3
   }
  },
  {
   "name": "森田 莉莉",
   "type": "paint",
   "typeLabel": "攻筐型",
   "style": "得分手",
   "title": "得分手",
   "primaryRole": "主攻核心",
   "secondaryRoles": [],
   "ballDependent": true,
   "note": "启发式（类型/定位）",
   "scorerTag": true,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.5731,
    "分卫": 0.5791,
    "小前": 0.5559,
    "大前": 0.4764,
    "中锋": 0.4135
   },
   "starsByPos": {
    "控卫": 3,
    "分卫": 1,
    "小前": 1,
    "大前": 1,
    "中锋": 1
   }
  },
  {
   "name": "美伽 未来",
   "type": "paint",
   "typeLabel": "攻筐型",
   "style": "组织者",
   "title": "防守者",
   "primaryRole": "组织核心",
   "secondaryRoles": [
    "持球进攻"
   ],
   "ballDependent": true,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.5722,
    "分卫": 0.7169,
    "小前": 0.5996,
    "大前": 0.5351,
    "中锋": 0.4764
   },
   "starsByPos": {
    "控卫": 2,
    "分卫": 4,
    "小前": 2,
    "大前": 2,
    "中锋": 2
   }
  },
  {
   "name": "五十岚 诗音",
   "type": "defense",
   "typeLabel": "防守型",
   "style": "防守者",
   "title": "得分手",
   "primaryRole": "防守核心",
   "secondaryRoles": [],
   "ballDependent": false,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.5205,
    "分卫": 0.5761,
    "小前": 0.6494,
    "大前": 0.7095,
    "中锋": 0.735
   },
   "starsByPos": {
    "控卫": 1,
    "分卫": 1,
    "小前": 3,
    "大前": 4,
    "中锋": 4
   }
  },
  {
   "name": "羽濑川 湊",
   "type": "paint",
   "typeLabel": "攻筐型",
   "style": "篮板手",
   "title": "得分手",
   "primaryRole": "副C",
   "secondaryRoles": [
    "攻框"
   ],
   "ballDependent": true,
   "note": "吃突破加成的副C",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.5931,
    "分卫": 0.654,
    "小前": 0.6734,
    "大前": 0.5871,
    "中锋": 0.5713
   },
   "starsByPos": {
    "控卫": 3,
    "分卫": 3,
    "小前": 4,
    "大前": 3,
    "中锋": 3
   }
  },
  {
   "name": "真崎 辉世",
   "type": "paint",
   "typeLabel": "攻筐型",
   "style": "得分手",
   "title": "得分手",
   "primaryRole": "主攻核心",
   "secondaryRoles": [],
   "ballDependent": true,
   "note": "启发式（类型/定位）",
   "scorerTag": true,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.6518,
    "分卫": 0.623,
    "小前": 0.6178,
    "大前": 0.5082,
    "中锋": 0.4187
   },
   "starsByPos": {
    "控卫": 4,
    "分卫": 2,
    "小前": 2,
    "大前": 2,
    "中锋": 2
   }
  },
  {
   "name": "先斗 月绮",
   "type": "mid",
   "typeLabel": "中投型",
   "style": "防守者",
   "title": "得分手",
   "primaryRole": "防守核心",
   "secondaryRoles": [
    "持球进攻"
   ],
   "ballDependent": true,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.7336,
    "分卫": 0.7289,
    "小前": 0.6396,
    "大前": 0.5166,
    "中锋": 0.3725
   },
   "starsByPos": {
    "控卫": 4,
    "分卫": 4,
    "小前": 3,
    "大前": 2,
    "中锋": 1
   }
  },
  {
   "name": "卧云 真昼",
   "type": "paint",
   "typeLabel": "攻筐型",
   "style": "组织者",
   "title": "辅助",
   "primaryRole": "主攻核心",
   "secondaryRoles": [
    "中投",
    "突破选卡"
   ],
   "ballDependent": true,
   "note": "妖刀乱舞=突破选卡后接中投，吃突破加成",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.629,
    "分卫": 0.8174,
    "小前": 0.6618,
    "大前": 0.5606,
    "中锋": 0.4779
   },
   "starsByPos": {
    "控卫": 3,
    "分卫": 5,
    "小前": 3,
    "大前": 3,
    "中锋": 3
   }
  },
  {
   "name": "野上 泷",
   "type": "swing",
   "typeLabel": "投射摇摆型",
   "style": "多面手",
   "title": "得分手",
   "primaryRole": "主攻核心",
   "secondaryRoles": [
    "三分",
    "后撤"
   ],
   "ballDependent": true,
   "note": "三分主C，带后撤，核心得分",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": true,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.573,
    "分卫": 0.6834,
    "小前": 0.7079,
    "大前": 0.7635,
    "中锋": 0.5677
   },
   "starsByPos": {
    "控卫": 2,
    "分卫": 4,
    "小前": 4,
    "大前": 4,
    "中锋": 3
   }
  },
  {
   "name": "降旗 千红纱",
   "type": "defense",
   "typeLabel": "防守型",
   "style": "篮板手",
   "title": "防守者",
   "primaryRole": "防守核心",
   "secondaryRoles": [],
   "ballDependent": false,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.5891,
    "分卫": 0.629,
    "小前": 0.6851,
    "大前": 0.5674,
    "中锋": 0.5389
   },
   "starsByPos": {
    "控卫": 3,
    "分卫": 3,
    "小前": 4,
    "大前": 3,
    "中锋": 3
   }
  },
  {
   "name": "林原 树里",
   "type": "defense",
   "typeLabel": "防守型",
   "style": "防守者",
   "title": "辅助",
   "primaryRole": "防守核心",
   "secondaryRoles": [
    "组织"
   ],
   "ballDependent": false,
   "note": "弱化敌方分卫/控卫属性",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.6408,
    "分卫": 0.6008,
    "小前": 0.5744,
    "大前": 0.5429,
    "中锋": 0.4987
   },
   "starsByPos": {
    "控卫": 4,
    "分卫": 2,
    "小前": 2,
    "大前": 2,
    "中锋": 3
   }
  },
  {
   "name": "美星 栗栖",
   "type": "three",
   "typeLabel": "三分型",
   "style": "篮板手",
   "title": "得分手",
   "primaryRole": "副C",
   "secondaryRoles": [
    "三分",
    "后撤",
    "投射"
   ],
   "ballDependent": true,
   "note": "三分副C（后撤），吃防守带来的投射加成，强化PF/SF投射",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.6557,
    "分卫": 0.7302,
    "小前": 0.6335,
    "大前": 0.4905,
    "中锋": 0.4189
   },
   "starsByPos": {
    "控卫": 4,
    "分卫": 4,
    "小前": 3,
    "大前": 1,
    "中锋": 2
   }
  },
  {
   "name": "远野 桐",
   "type": "three",
   "typeLabel": "三分型",
   "style": "组织者",
   "title": "得分手",
   "primaryRole": "组织核心",
   "secondaryRoles": [
    "持球进攻"
   ],
   "ballDependent": true,
   "note": "启发式（类型/定位）",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": false,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.5944,
    "分卫": 0.6405,
    "小前": 0.5817,
    "大前": 0.5881,
    "中锋": 0.5286
   },
   "starsByPos": {
    "控卫": 3,
    "分卫": 3,
    "小前": 2,
    "大前": 3,
    "中锋": 3
   }
  },
  {
   "name": "白神 时久",
   "type": "support",
   "typeLabel": "组织辅助型",
   "style": "多面手",
   "title": "防守者",
   "primaryRole": "组织核心",
   "secondaryRoles": [
    "防守"
   ],
   "ballDependent": false,
   "note": "组织核心，负责突分传球；体重全队最轻→抢断优势",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": true,
   "canLearnStamina": true,
   "rawByPos": {
    "控卫": 0.7584,
    "分卫": 0.6303,
    "小前": 0.5659,
    "大前": 0.4463,
    "中锋": 0.3505
   },
   "starsByPos": {
    "控卫": 5,
    "分卫": 3,
    "小前": 1,
    "大前": 1,
    "中锋": 1
   }
  },
  {
   "name": "希雅·奥黛拉",
   "type": "paint",
   "typeLabel": "攻筐型",
   "style": "多面手",
   "title": "得分手/防守者",
   "primaryRole": "防守核心",
   "secondaryRoles": [
    "主攻核心",
    "内线攻防"
   ],
   "ballDependent": true,
   "note": "核心防守主力，内线攻防并用技能盖帽，特配篮板被动",
   "scorerTag": false,
   "staminaSupport": "none",
   "energySupport": true,
   "canLearnStamina": false,
   "rawByPos": {
    "控卫": 0.5493,
    "分卫": 0.6231,
    "小前": 0.6899,
    "大前": 0.7451,
    "中锋": 0.7564
   },
   "starsByPos": {
    "控卫": 2,
    "分卫": 3,
    "小前": 4,
    "大前": 4,
    "中锋": 4
   }
  }
 ],
 "twoFormationNow": {
  "note": "当前游戏为 2 阵，可先取主方案前两阵（攻筐队 + 中投队）；三阵实装后补第三队（三分队）。",
  "teams": [
   {
    "system": "paint",
    "label": "攻筐队",
    "score": 5.5369,
    "roleCounts": {
     "mainScorers": 0,
     "ballDependent": 4,
     "defenders": 3,
     "playmakers": 2,
     "rebounders": 1,
     "scorerTags": 1,
     "staminaTeam": 0,
     "organizers": 2,
     "energySupport": 2
    },
    "positions": {
     "控卫": {
      "name": "白神 时久",
      "stars": 5,
      "rank": 2,
      "raw": 0.7584,
      "type": "support",
      "typeLabel": "组织辅助型",
      "affinity": 0.78,
      "buffSource": false,
      "scorer": false,
      "roleLabel": "组织核心（防守）",
      "role": {
       "scorer": false,
       "defender": true,
       "playmaker": true,
       "rebounder": false,
       "ballScorer": false
      }
     },
     "分卫": {
      "name": "美伽 未来",
      "stars": 4,
      "rank": 7,
      "raw": 0.7169,
      "type": "paint",
      "typeLabel": "攻筐型",
      "affinity": 1,
      "buffSource": false,
      "scorer": true,
      "roleLabel": "组织核心（持球进攻）",
      "role": {
       "scorer": false,
       "defender": false,
       "playmaker": true,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "小前": {
      "name": "和泉 香织",
      "stars": 3,
      "rank": 21,
      "raw": 0.6384,
      "type": "paint",
      "typeLabel": "攻筐型",
      "affinity": 1,
      "buffSource": true,
      "scorer": true,
      "roleLabel": "主攻核心",
      "role": {
       "scorer": true,
       "defender": false,
       "playmaker": false,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "大前": {
      "name": "佐久间 雨乃",
      "stars": 5,
      "rank": 1,
      "raw": 0.8438,
      "type": "paint",
      "typeLabel": "攻筐型",
      "affinity": 1,
      "buffSource": true,
      "scorer": true,
      "roleLabel": "主攻核心（攻框/篮板副核/防守）",
      "role": {
       "scorer": true,
       "defender": true,
       "playmaker": false,
       "rebounder": true,
       "ballScorer": true
      }
     },
     "中锋": {
      "name": "希雅·奥黛拉",
      "stars": 4,
      "rank": 4,
      "raw": 0.7564,
      "type": "paint",
      "typeLabel": "攻筐型",
      "affinity": 1,
      "buffSource": true,
      "scorer": false,
      "roleLabel": "防守核心（主攻核心/内线攻防）",
      "role": {
       "scorer": false,
       "defender": true,
       "playmaker": false,
       "rebounder": false,
       "ballScorer": true
      }
     }
    }
   },
   {
    "system": "mid",
    "label": "中投队",
    "score": 5.5152,
    "roleCounts": {
     "mainScorers": 0,
     "ballDependent": 4,
     "defenders": 2,
     "playmakers": 1,
     "rebounders": 1,
     "scorerTags": 0,
     "staminaTeam": 0,
     "organizers": 1,
     "energySupport": 0
    },
    "positions": {
     "控卫": {
      "name": "先斗 月绮",
      "stars": 4,
      "rank": 4,
      "raw": 0.7336,
      "type": "mid",
      "typeLabel": "中投型",
      "affinity": 1,
      "buffSource": true,
      "scorer": true,
      "roleLabel": "防守核心（持球进攻）",
      "role": {
       "scorer": false,
       "defender": true,
       "playmaker": false,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "分卫": {
      "name": "卧云 真昼",
      "stars": 5,
      "rank": 2,
      "raw": 0.8174,
      "type": "paint",
      "typeLabel": "攻筐型",
      "affinity": 0.78,
      "buffSource": true,
      "scorer": false,
      "roleLabel": "主攻核心（中投/突破选卡）",
      "role": {
       "scorer": true,
       "defender": false,
       "playmaker": false,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "小前": {
      "name": "毒岛 黛也",
      "stars": 3,
      "rank": 14,
      "raw": 0.6572,
      "type": "mid",
      "typeLabel": "中投型",
      "affinity": 1,
      "buffSource": true,
      "scorer": true,
      "roleLabel": "防守核心（持球进攻）",
      "role": {
       "scorer": false,
       "defender": true,
       "playmaker": false,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "大前": {
      "name": "百目鬼 剑",
      "stars": 4,
      "rank": 5,
      "raw": 0.7568,
      "type": "mid",
      "typeLabel": "中投型",
      "affinity": 1,
      "buffSource": false,
      "scorer": true,
      "roleLabel": "组织核心（持球进攻）",
      "role": {
       "scorer": false,
       "defender": false,
       "playmaker": true,
       "rebounder": false,
       "ballScorer": true
      }
     },
     "中锋": {
      "name": "千圣·贝尔丝",
      "stars": 5,
      "rank": 3,
      "raw": 0.7742,
      "type": "rebound",
      "typeLabel": "篮板型",
      "affinity": 0.78,
      "buffSource": true,
      "scorer": false,
      "roleLabel": "篮板主核（补篮/进攻篮板/投射）",
      "role": {
       "scorer": true,
       "defender": false,
       "playmaker": false,
       "rebounder": true,
       "ballScorer": false
      }
     }
    }
   }
  ]
 },
 "alternates": {
  "攻筐队": {
   "控卫": [
    {
     "name": "克拉丽丝·波洛",
     "raw": 0.7794,
     "stars": 5,
     "type": "support",
     "affinity": 0.78,
     "score": 1.0134
    },
    {
     "name": "名雪 纱夜",
     "raw": 0.7253,
     "stars": 4,
     "type": "support",
     "affinity": 0.78,
     "score": 0.9593
    },
    {
     "name": "真崎 辉世",
     "raw": 0.6518,
     "stars": 4,
     "type": "paint",
     "affinity": 1,
     "score": 0.9518
    }
   ],
   "分卫": [
    {
     "name": "闪堂电",
     "raw": 0.6929,
     "stars": 4,
     "type": "paint",
     "affinity": 1,
     "score": 0.9929
    },
    {
     "name": "羽濑川 湊",
     "raw": 0.654,
     "stars": 3,
     "type": "paint",
     "affinity": 1,
     "score": 0.954
    },
    {
     "name": "澪奈·贾妮丝",
     "raw": 0.6402,
     "stars": 3,
     "type": "paint",
     "affinity": 1,
     "score": 0.9402
    }
   ],
   "小前": [
    {
     "name": "闪堂电",
     "raw": 0.6831,
     "stars": 4,
     "type": "paint",
     "affinity": 1,
     "score": 0.9831
    },
    {
     "name": "羽濑川 湊",
     "raw": 0.6734,
     "stars": 4,
     "type": "paint",
     "affinity": 1,
     "score": 0.9734
    },
    {
     "name": "榎本 纯那",
     "raw": 0.6565,
     "stars": 3,
     "type": "paint",
     "affinity": 1,
     "score": 0.9565
    }
   ],
   "大前": [
    {
     "name": "榎本 纯那",
     "raw": 0.7451,
     "stars": 4,
     "type": "paint",
     "affinity": 1,
     "score": 1.0451
    },
    {
     "name": "早濑 千秋",
     "raw": 0.6583,
     "stars": 3,
     "type": "rebound",
     "affinity": 1,
     "score": 0.9583
    },
    {
     "name": "五十岚 诗音",
     "raw": 0.7095,
     "stars": 4,
     "type": "defense",
     "affinity": 0.78,
     "score": 0.9435
    }
   ],
   "中锋": [
    {
     "name": "榎本 纯那",
     "raw": 0.7756,
     "stars": 5,
     "type": "paint",
     "affinity": 1,
     "score": 1.0756
    },
    {
     "name": "五十岚 诗音",
     "raw": 0.735,
     "stars": 4,
     "type": "defense",
     "affinity": 0.78,
     "score": 0.969
    },
    {
     "name": "早濑 千秋",
     "raw": 0.6467,
     "stars": 4,
     "type": "rebound",
     "affinity": 1,
     "score": 0.9467
    }
   ]
  },
  "中投队": {
   "控卫": [
    {
     "name": "克拉丽丝·波洛",
     "raw": 0.7794,
     "stars": 5,
     "type": "support",
     "affinity": 0.78,
     "score": 1.0134
    },
    {
     "name": "名雪 纱夜",
     "raw": 0.7253,
     "stars": 4,
     "type": "support",
     "affinity": 0.78,
     "score": 0.9593
    },
    {
     "name": "清水 万里",
     "raw": 0.6858,
     "stars": 4,
     "type": "support",
     "affinity": 0.78,
     "score": 0.9198
    }
   ],
   "分卫": [
    {
     "name": "近江 奏",
     "raw": 0.7231,
     "stars": 4,
     "type": "mid",
     "affinity": 1,
     "score": 1.0231
    },
    {
     "name": "雨森 琉璃",
     "raw": 0.675,
     "stars": 3,
     "type": "mid",
     "affinity": 1,
     "score": 0.975
    },
    {
     "name": "望月 透",
     "raw": 0.6364,
     "stars": 3,
     "type": "mid",
     "affinity": 1,
     "score": 0.9364
    }
   ],
   "小前": [
    {
     "name": "望月 透",
     "raw": 0.734,
     "stars": 5,
     "type": "mid",
     "affinity": 1,
     "score": 1.034
    },
    {
     "name": "雨森 琉璃",
     "raw": 0.7081,
     "stars": 4,
     "type": "mid",
     "affinity": 1,
     "score": 1.0081
    },
    {
     "name": "近江 奏",
     "raw": 0.6643,
     "stars": 3,
     "type": "mid",
     "affinity": 1,
     "score": 0.9643
    }
   ],
   "大前": [
    {
     "name": "雨森 琉璃",
     "raw": 0.7549,
     "stars": 4,
     "type": "mid",
     "affinity": 1,
     "score": 1.0549
    },
    {
     "name": "榎本 纯那",
     "raw": 0.7451,
     "stars": 4,
     "type": "paint",
     "affinity": 0.78,
     "score": 0.9791
    },
    {
     "name": "五十岚 诗音",
     "raw": 0.7095,
     "stars": 4,
     "type": "defense",
     "affinity": 0.78,
     "score": 0.9435
    }
   ],
   "中锋": [
    {
     "name": "榎本 纯那",
     "raw": 0.7756,
     "stars": 5,
     "type": "paint",
     "affinity": 0.78,
     "score": 1.0096
    },
    {
     "name": "五十岚 诗音",
     "raw": 0.735,
     "stars": 4,
     "type": "defense",
     "affinity": 0.78,
     "score": 0.969
    },
    {
     "name": "洺瑶",
     "raw": 0.6477,
     "stars": 4,
     "type": "support",
     "affinity": 0.78,
     "score": 0.8817
    }
   ]
  },
  "三分队": {
   "控卫": [
    {
     "name": "克拉丽丝·波洛",
     "raw": 0.7794,
     "stars": 5,
     "type": "support",
     "affinity": 0.78,
     "score": 1.0134
    },
    {
     "name": "名雪 纱夜",
     "raw": 0.7253,
     "stars": 4,
     "type": "support",
     "affinity": 0.78,
     "score": 0.9593
    },
    {
     "name": "清水 万里",
     "raw": 0.6858,
     "stars": 4,
     "type": "support",
     "affinity": 0.78,
     "score": 0.9198
    }
   ],
   "分卫": [
    {
     "name": "近江 奏",
     "raw": 0.7231,
     "stars": 4,
     "type": "mid",
     "affinity": 0.78,
     "score": 0.9571
    },
    {
     "name": "远野 桐",
     "raw": 0.6405,
     "stars": 3,
     "type": "three",
     "affinity": 1,
     "score": 0.9405
    },
    {
     "name": "闪堂电",
     "raw": 0.6929,
     "stars": 4,
     "type": "paint",
     "affinity": 0.78,
     "score": 0.9269
    }
   ],
   "小前": [
    {
     "name": "望月 透",
     "raw": 0.734,
     "stars": 5,
     "type": "mid",
     "affinity": 0.78,
     "score": 0.968
    },
    {
     "name": "雨森 琉璃",
     "raw": 0.7081,
     "stars": 4,
     "type": "mid",
     "affinity": 0.78,
     "score": 0.9421
    },
    {
     "name": "降旗 千红纱",
     "raw": 0.6851,
     "stars": 4,
     "type": "defense",
     "affinity": 0.78,
     "score": 0.9191
    }
   ],
   "大前": [
    {
     "name": "雨森 琉璃",
     "raw": 0.7549,
     "stars": 4,
     "type": "mid",
     "affinity": 0.78,
     "score": 0.9889
    },
    {
     "name": "榎本 纯那",
     "raw": 0.7451,
     "stars": 4,
     "type": "paint",
     "affinity": 0.78,
     "score": 0.9791
    },
    {
     "name": "五十岚 诗音",
     "raw": 0.7095,
     "stars": 4,
     "type": "defense",
     "affinity": 0.78,
     "score": 0.9435
    }
   ],
   "中锋": [
    {
     "name": "榎本 纯那",
     "raw": 0.7756,
     "stars": 5,
     "type": "paint",
     "affinity": 0.78,
     "score": 1.0096
    },
    {
     "name": "五十岚 诗音",
     "raw": 0.735,
     "stars": 4,
     "type": "defense",
     "affinity": 0.78,
     "score": 0.969
    },
    {
     "name": "洺瑶",
     "raw": 0.6477,
     "stars": 4,
     "type": "support",
     "affinity": 0.78,
     "score": 0.8817
    }
   ]
  }
 },
 "altPlans": [
  {
   "key": "双攻筐+三分",
   "label": "双攻筐队 + 三分队（备选）",
   "totalScore": 16.3723,
   "teamScores": [
    5.4666,
    5.4622,
    5.4435
   ],
   "balance": 0.01,
   "systems": [
    "paint",
    "paint",
    "three"
   ]
  },
  {
   "key": "双攻筐+中投",
   "label": "双攻筐队 + 中投队（备选）",
   "totalScore": 16.7373,
   "teamScores": [
    5.5647,
    5.5671,
    5.6055
   ],
   "balance": 0.0187,
   "systems": [
    "paint",
    "paint",
    "mid"
   ]
  },
  {
   "key": "双三分+攻筐",
   "label": "双三分队 + 攻筐队（备选）",
   "totalScore": 15.8893,
   "teamScores": [
    5.2962,
    5.2986,
    5.2945
   ],
   "balance": 0.0017,
   "systems": [
    "three",
    "three",
    "paint"
   ]
  }
 ],
 "caveat": "评分是启发式（位置 raw + 体系亲和），未逐局验证 PVP 表现；体系亲和按类型映射（攻筐=paint/rebound，中投=mid/swing，三分=three/swing），可在脚本里调整权重后重跑。"
};

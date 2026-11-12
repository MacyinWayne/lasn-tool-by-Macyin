/*!
 * data/scenarios.js —— 自动生成，请勿手改。
 * 生成脚本：tool/scripts/build-scenarios.mjs
 * 生成时间：2026-11-11 07:26
 * 数据版本：v2026.11.05
 * 内容：5 个养成场景 + 5 个训练方向 + 圣山挑战赛四座圣山（用户确认 2026-11-09：蓝白神/红希雅/绿野上/紫出羽）
 */
(function (root) {
  'use strict';
  var data = {
  "schema": 1,
  "generatedAt": "2026-11-11 07:26",
  "dataVersion": "v2026.11.05",
  "source": "data/structured/saint_mountains.json + 用户确认的页面结构（2026-11-05）",
  "meta": {
    "generatedAt": "2026-11-11 07:26",
    "dataVersion": "v2026.11.05",
    "sources": [
      {
        "id": "saint",
        "label": "圣山挑战赛四座圣山",
        "path": "data/structured/saint_mountains.json",
        "confidence": "用户口述（部分记忆）"
      },
      {
        "id": "scenarios",
        "label": "5 个养成场景",
        "path": "用户需求 #2",
        "confidence": "用户确认（2026-11-05）"
      },
      {
        "id": "directions",
        "label": "5 个训练方向 / 定位体系",
        "path": "用户确认 + characters.roles",
        "confidence": "用户确认（2026-11-05）"
      }
    ],
    "warnings": []
  },
  "scenarios": [
    {
      "id": "total-score",
      "name": "冲总评分",
      "type": "养成目标",
      "desc": "以提升角色总评分/图鉴评分为目标的日常养成配队。",
      "terrain": null,
      "confidence": "用户口述（2026-11-05）",
      "source": "用户需求 #2 · 场景 1"
    },
    {
      "id": "arena",
      "name": "竞技场",
      "type": "PvP",
      "desc": "无特殊场地的 PvP 对战。",
      "terrain": null,
      "confidence": "用户口述（2026-11-05）",
      "source": "用户需求 #2 · 场景 2"
    },
    {
      "id": "national",
      "name": "全国大赛",
      "type": "PvE",
      "desc": "无特殊场地的 PvE 赛事。",
      "terrain": null,
      "confidence": "用户口述（2026-11-05）",
      "source": "用户需求 #2 · 场景 3"
    },
    {
      "id": "cup",
      "name": "杯赛",
      "type": "PvP（特殊场地）",
      "desc": "针对性场地的 PvP，例如立冬杯水洼地形；场地数据待补。",
      "terrain": {
        "id": "lidong-water",
        "name": "立冬杯 · 水洼地形",
        "confidence": "用户口述示例，数值待补"
      },
      "confidence": "用户口述（2026-11-05）；场地效果待补",
      "source": "用户需求 #2 · 场景 4"
    },
    {
      "id": "saint",
      "name": "圣山挑战赛",
      "type": "PvE（圣山）",
      "desc": "蓝 / 绿 / 红 / 紫四座圣山，各对应一个圣山角色与特定需求特性 / 可偷分方式。",
      "terrain": null,
      "confidence": "用户确认（2026-11-09）：蓝=白神、红=希雅、绿=野上、紫=出羽",
      "source": "用户需求 #2 · 场景 5 + data/structured/saint_mountains.json"
    }
  ],
  "directions": [
    {
      "id": "drive",
      "name": "攻框（含突破）",
      "role": "得分手",
      "desc": "内线终结 + 突破得分；与「突破」同属得分手方向。",
      "keywords": [
        "攻筐",
        "突破",
        "终结",
        "内线",
        "上篮",
        "扣篮",
        "得分"
      ],
      "confidence": "用户确认定位体系（2026-11-05）"
    },
    {
      "id": "three",
      "name": "三分（含中投）",
      "role": "得分手",
      "desc": "三分与中投合并为同一套配置方向。",
      "keywords": [
        "投射",
        "三分",
        "中投",
        "空间",
        "外线",
        "投篮"
      ],
      "confidence": "用户确认定位体系（2026-11-05）"
    },
    {
      "id": "defense",
      "name": "防守（抢断/盖帽）",
      "role": "防守者",
      "desc": "抢断 / 盖帽 / 外线防守方向。",
      "keywords": [
        "防守",
        "抢断",
        "盖帽",
        "护筐",
        "防投",
        "拦截"
      ],
      "confidence": "用户确认定位体系（2026-11-05）"
    },
    {
      "id": "playmaking",
      "name": "组织（战术/续航）",
      "role": "组织者",
      "desc": "战术组织与续航支持（传球 / 能量 / 回复）。",
      "keywords": [
        "组织",
        "传球",
        "战术",
        "续航",
        "能量",
        "回复",
        "团队"
      ],
      "confidence": "用户确认定位体系（2026-11-05）"
    },
    {
      "id": "rebound",
      "name": "篮板（特化）",
      "role": "篮板手",
      "desc": "篮板特化方向（篮板 / 护筐 / 对抗）。",
      "keywords": [
        "篮板",
        "护筐",
        "内线",
        "对抗",
        "抢板"
      ],
      "confidence": "用户确认定位体系（2026-11-05）"
    }
  ],
  "saintMountains": {
    "blue": {
      "name": "蓝圣山",
      "character": "白神 时久",
      "boss": "白神 时久",
      "color": "蓝",
      "cardColor": "蓝卡",
      "style": "速度",
      "skillAttr": "速度",
      "breakAttr": "速卡（速度 / 蓝卡）",
      "noSmallSkill": false,
      "breakNote": "",
      "breakRule": "用「速卡（蓝卡/速度）」技能破盾：大招破 2 层 / 小技能破 1 层（须成功）；角色风格不必是速度，只要技能卡是速卡即可",
      "recognition": "待补（蓝圣山偷分方式）",
      "bossImplemented": false,
      "roleNote": "",
      "requiredTraits": [
        "速向技能（可以是器材技能）"
      ],
      "stealPoints": [
        "上篮",
        "扣篮",
        "盖帽"
      ],
      "source": "用户口述 2026-11-05"
    },
    "purple": {
      "name": "紫圣山",
      "character": "出羽 十明",
      "boss": "出羽 十明",
      "color": "紫",
      "cardColor": null,
      "style": "无属性",
      "skillAttr": "无属性 buff 类技能",
      "breakAttr": "无色 buff 类技能",
      "noSmallSkill": true,
      "breakNote": "紫圣山=无色 buff 类技能（如千圣那种）；仅大招可破（2 层/次），无小技能破盾",
      "breakRule": "只能用「无色 buff 类技能」的**大招**破盾，一次破 2 层；**没有小技能可破盾**",
      "recognition": "待补（紫圣山偷分方式）",
      "bossImplemented": true,
      "roleNote": "出羽未作为可玩角色实装，但作为紫圣山 BOSS 已实装",
      "requiredTraits": [
        "无属性技能（buff类技能）"
      ],
      "stealPoints": [
        "突破"
      ],
      "source": "用户口述 2026-11-05（出羽未实装，圣山角色占位）"
    },
    "green": {
      "name": "绿圣山",
      "character": "野上 泷",
      "boss": "野上 泷",
      "color": "绿",
      "cardColor": "绿卡",
      "style": "技巧",
      "skillAttr": "技巧",
      "breakAttr": "技卡（技巧 / 绿卡）",
      "noSmallSkill": false,
      "breakNote": "",
      "breakRule": "用「技卡（绿卡/技巧）」技能破盾：大招破 2 层 / 小技能破 1 层（须成功）",
      "recognition": "三分 +900（非常认可）/ 后撤 +300 / 横撤 +300（一般认可）；比赛胜利 +20%",
      "bossImplemented": false,
      "roleNote": "",
      "requiredTraits": [],
      "stealPoints": [
        "三分",
        "后撤",
        "横撤"
      ],
      "source": "用户确认 2026-11-11（绿圣山认可分：三分900 / 后撤300 / 横撤300；胜利+20%）"
    },
    "red": {
      "name": "红圣山",
      "character": "希雅·奥黛拉",
      "boss": "希雅·奥黛拉",
      "color": "红",
      "cardColor": "红卡",
      "style": "力量",
      "skillAttr": "力量",
      "breakAttr": "力卡（力量 / 红卡）",
      "noSmallSkill": false,
      "breakNote": "",
      "breakRule": "用「力卡（红卡/力量）」技能破盾：大招破 2 层 / 小技能破 1 层（须成功）；例：希雅是全能角色，但梦境盖帽/大招是力卡 → 可破红圣山",
      "recognition": "待补（红圣山偷分方式）",
      "bossImplemented": false,
      "roleNote": "",
      "requiredTraits": [],
      "stealPoints": [],
      "source": "用户确认 2026-11-09"
    }
  },
  "saintMeta": {
    "generated": "2026-11-09",
    "source": "用户口述（2026-11-05/2026-11-09）：四座圣山的 BOSS 配置 + 统一规则",
    "confidence": "user_confirmed",
    "note": "四座圣山角色 = 敌方 BOSS（不是我方队员）：蓝=白神时久、红=希雅·奥黛拉、绿=野上泷、紫=出羽十明（出羽未作为可玩角色实装，但作为紫圣山 BOSS 已实装）。"
  },
  "saintCommonRules": {
    "crystal": {
      "name": "圣山结晶",
      "stacks": 6,
      "perStackEnergyRegen": "+20%（每颗结晶使 BOSS 自身能量回复速度 +20%）",
      "lateGame": "比赛后期若 BOSS 仍保有 ≥1 层圣山结晶，则大幅提升其全队属性（因此需要尽量打空）"
    },
    "break_rules": {
      "ultimate": "使用与圣山「对应颜色」的角色大招 → 一次破除 2 层（必须使用成功）",
      "small_skill": "使用对应颜色的小技能（如器材技能「强力背打」）→ 一次破除 1 层（必须使用成功）",
      "colorNote": "破盾看卡色：蓝圣山=蓝卡（速度）、红圣山=红卡（力量）、绿圣山=绿卡（技巧）；紫圣山=无色 buff 类技能（仅大招可破 2 层，无小技能）。"
    },
    "recognition": "认可度 = 圣山战最关键的分数来源（重点不是打赢，而是拿更高分）；每座圣山的认可度获取方式不同 = 偷分方式（待补）",
    "team_logic": "编成需要：**破盾手**（对应颜色角色，负责破圣山结晶）+ **偷分手**（专门刷认可度）"
  },
  "saintScoring": {
    "global": {
      "winBonus": {
        "condition": "获得比赛胜利",
        "bonus": "最终总积分 +20%",
        "note": "圣山实力增长快 + 有无尽模式 → 胜利分只能看运气；配队优先考虑偷分（其他得分方式）。各山通用：比赛胜利最终总积分 +20%。"
      },
      "recognition": {
        "high": 900,
        "normal": 300,
        "note": "每座圣山 3 种认可方式：1~2 种「非常认可」每次 +900，其余「一般认可」每次 +300；认可动作须成功；器材技能打出的动作也算；绿山额外强调后撤/横撤可多次触发。"
      },
      "priority": "配队优先级：偷分 > 胜利分",
      "optimal": "最优：破盾手 = 偷分手（同一个人同时满足破盾卡色 + 认可动作）",
      "fallback": "次选：确保一轮大招（5 人）内破完敌方盾，其余以偷分为主"
    },
    "mountains": {
      "blue": {
        "recognition": [
          {
            "action": "上篮",
            "points": 900,
            "level": "非常认可"
          },
          {
            "action": "扣篮",
            "points": 900,
            "level": "非常认可"
          },
          {
            "action": "盖帽",
            "points": 300,
            "level": "一般认可"
          }
        ],
        "optimalExample": "闪堂电：速度大招（速卡破盾）+ 突破上篮（上篮 +900）→ 破盾与偷分同一人",
        "note": "蓝圣山：上篮/扣篮 900，盖帽 300"
      },
      "red": {
        "recognition": [
          {
            "action": "中投",
            "points": 900,
            "level": "非常认可"
          },
          {
            "action": "勾手",
            "points": 300,
            "level": "一般认可"
          },
          {
            "action": "抢篮板成功",
            "points": 300,
            "level": "一般认可"
          }
        ],
        "optimalExample": "希雅·奥黛拉：力卡大招（破盾）+ 空位出手接中投（中投 +900）+ 梦境盖帽也是力卡大招（防御阶段再破 2 层）→ 一次攻守环节可破 4 层",
        "note": "红圣山：中投 900，勾手 300，抢篮板 300"
      },
      "green": {
        "recognition": [
          {
            "action": "三分成功",
            "points": 900,
            "level": "非常认可"
          },
          {
            "action": "后撤成功",
            "points": 300,
            "level": "一般认可"
          },
          {
            "action": "横撤成功",
            "points": 300,
            "level": "一般认可"
          }
        ],
        "note": "绿圣山（2026-11-11 用户确认）：**正确偷分方式是“后撤/横撤（移动创造）+ 三分终结”，不是单纯刷三分。** 三分成功 +900；后撤成功 +300；横撤成功 +300；比赛胜利最终总积分 +20%。后撤/横撤是移动行为，可被篮板/传球多次触发：没命中→抢篮板→传给空位→空位后撤→三分出手→再没中→再抢篮板→再传→再后撤，最后三分命中；绿卡绑定投射，后撤（灵活后撤=技卡）之后到三分线外，绿卡就是三分（终结），整个循环都能吃投射。",
        "strategy": {
          "mode": "移动创造 → 三分终结",
          "loop": [
            "篮板/传球后找到空位",
            "空位使用后撤/横撤（+300；后撤为技卡，可兼顾破盾）",
            "移动后到三分线外，绿卡=三分（+900）",
            "没命中→继续抢篮板/传球，重复后撤/横撤，直到三分命中"
          ],
          "implication": "配队优先：能反复参与篮板/传球/空位移动的角色 + 后撤/横撤器材；纯三分手不是唯一解，关键是“移动次数×终结成功率”。"
        }
      },
      "purple": {
        "recognition": [
          {
            "action": "突破相关（待补）",
            "points": null,
            "level": "待确认"
          }
        ],
        "note": "紫圣山机制待开后再补；目前确定与突破有关"
      }
    }
  },
  "saintCandidates": {
    "blue": {
      "name": "蓝圣山",
      "boss": "白神 时久",
      "attr": "速",
      "cardColor": "蓝卡",
      "recognition": [
        "上篮",
        "扣篮",
        "盖帽"
      ],
      "high": [
        "上篮",
        "扣篮"
      ],
      "normal": [
        "盖帽"
      ],
      "breakers": [
        {
          "name": "闪堂电",
          "style": "速度",
          "source": "大招",
          "skills": [
            "闪电突袭",
            "闪电突袭"
          ],
          "actions": [
            "上篮"
          ],
          "dualActions": [
            "上篮"
          ],
          "score": 27
        },
        {
          "name": "和泉 香织",
          "style": "速度",
          "source": "大招",
          "skills": [
            "弧月突击",
            "弧月突击"
          ],
          "actions": [
            "三分",
            "盯防",
            "突破"
          ],
          "dualActions": [],
          "score": 2
        },
        {
          "name": "望月 透",
          "style": "速度",
          "source": "大招",
          "skills": [
            "望月时刻",
            "望月时刻"
          ],
          "actions": [
            "中投"
          ],
          "dualActions": [],
          "score": 2
        },
        {
          "name": "森田 莉莉",
          "style": "速度",
          "source": "大招",
          "skills": [
            "元气突破",
            "元气突破"
          ],
          "actions": [
            "三分",
            "突破"
          ],
          "dualActions": [],
          "score": 2
        },
        {
          "name": "真崎 辉世",
          "style": "速度",
          "source": "大招",
          "skills": [
            "瞬步潜行",
            "瞬步潜行"
          ],
          "actions": [
            "三分",
            "突破"
          ],
          "dualActions": [],
          "score": 2
        },
        {
          "name": "稻叶 杏里",
          "style": "速度",
          "source": "大招",
          "skills": [
            "恶作剧抢断",
            "恶作剧抢断"
          ],
          "actions": [
            "抢断"
          ],
          "dualActions": [],
          "score": 0
        },
        {
          "name": "白神 时久",
          "style": "全能",
          "source": "大招",
          "skills": [
            "轰鸣的一闪",
            "轰鸣的一闪"
          ],
          "actions": [
            "抢断",
            "突破"
          ],
          "dualActions": [],
          "score": 0
        }
      ],
      "breakerTraits": {
        "闪堂电": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        },
        "和泉 香织": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        },
        "望月 透": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        },
        "森田 莉莉": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        },
        "真崎 辉世": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        },
        "稻叶 杏里": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        },
        "白神 时久": {
          "energy": true,
          "stamina": "none",
          "playmaker": true
        }
      },
      "breakersNote": "破盾：同属性大招破 2 层 / 小技能破 1 层（须成功）",
      "strategyNote": null,
      "stealers": [
        {
          "name": "闪堂电",
          "style": "速度",
          "actions": [
            "上篮"
          ],
          "highActions": [
            "上篮"
          ],
          "score": 52
        },
        {
          "name": "佐久间 雨乃",
          "style": "力量",
          "actions": [
            "上篮",
            "扣篮"
          ],
          "highActions": [
            "上篮",
            "扣篮"
          ],
          "score": 28
        },
        {
          "name": "和泉 香织",
          "style": "速度",
          "actions": [
            "上篮"
          ],
          "highActions": [
            "上篮"
          ],
          "score": 22
        },
        {
          "name": "羽濑川 湊",
          "style": "球商",
          "actions": [
            "上篮"
          ],
          "highActions": [
            "上篮"
          ],
          "score": 14
        },
        {
          "name": "清水 万里",
          "style": "球商",
          "actions": [
            "上篮",
            "扣篮"
          ],
          "highActions": [
            "上篮",
            "扣篮"
          ],
          "score": 12
        },
        {
          "name": "榎本 纯那",
          "style": "力量",
          "actions": [
            "上篮",
            "扣篮"
          ],
          "highActions": [
            "上篮",
            "扣篮"
          ],
          "score": 12
        }
      ],
      "stealersNote": "偷分手优先得分手（增加持球球权）；认可动作须成功才加分；器材技能打出的动作也算",
      "equipmentFits": [
        {
          "equip": "高级跳绳",
          "skill": "快速上篮",
          "attr": "速",
          "actions": [
            "上篮"
          ],
          "kind": "双效",
          "doubleDuty": true,
          "reason": "同属性速：上篮（破盾+偷分双效）"
        },
        {
          "equip": "动感单车",
          "skill": "快速盖帽",
          "attr": "速",
          "actions": [
            "盖帽",
            "盖帽"
          ],
          "kind": "双效",
          "doubleDuty": true,
          "reason": "同属性速：盖帽/盖帽（破盾+偷分双效）"
        },
        {
          "equip": "杠铃",
          "skill": "快速扣篮",
          "attr": "速",
          "actions": [
            "扣篮"
          ],
          "kind": "双效",
          "doubleDuty": true,
          "reason": "同属性速：扣篮（破盾+偷分双效）"
        },
        {
          "equip": "高级瑜伽垫",
          "skill": "快速盯防",
          "attr": "速",
          "actions": [
            "盯防"
          ],
          "kind": "破盾（防守）",
          "doubleDuty": false,
          "reason": "同属性速：盯防（防守变化，可破盾）"
        },
        {
          "equip": "瑜伽垫",
          "skill": "快速盯防",
          "attr": "速",
          "actions": [
            "盯防"
          ],
          "kind": "破盾（防守）",
          "doubleDuty": false,
          "reason": "同属性速：盯防（防守变化，可破盾）"
        },
        {
          "equip": "登山机",
          "skill": "转体上篮",
          "attr": "技",
          "actions": [
            "上篮"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=技 不匹配速（不能破盾），但动作命中认可：上篮（仅偷分）"
        },
        {
          "equip": "起跳之星",
          "skill": "无惧重围",
          "attr": null,
          "actions": [
            "上篮"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=None 不匹配速（不能破盾），但动作命中认可：上篮（仅偷分）"
        },
        {
          "equip": "神谕之牌",
          "skill": "掌落无声",
          "attr": null,
          "actions": [
            "盖帽"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=None 不匹配速（不能破盾），但动作命中认可：盖帽（仅偷分）"
        },
        {
          "equip": "充能汉堡",
          "skill": "气盛如虹",
          "attr": null,
          "actions": [
            "扣篮"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=None 不匹配速（不能破盾），但动作命中认可：扣篮（仅偷分）"
        }
      ],
      "equipmentNote": "同属性器材技能可破盾；命中认可动作=偷分+破盾双效；防守变化类也适配（防守回合成功释放可赚破盾）"
    },
    "red": {
      "name": "红圣山",
      "boss": "希雅·奥黛拉",
      "attr": "力",
      "cardColor": "红卡",
      "recognition": [
        "中投",
        "勾手",
        "篮板"
      ],
      "high": [
        "中投"
      ],
      "normal": [
        "勾手",
        "篮板"
      ],
      "breakers": [
        {
          "name": "希雅·奥黛拉",
          "style": "全能",
          "source": "大招",
          "skills": [
            "梦境华尔兹",
            "梦境华尔兹",
            "梦境华尔兹",
            "梦境盖帽",
            "梦境盖帽"
          ],
          "actions": [
            "盖帽"
          ],
          "dualActions": [],
          "score": 20
        },
        {
          "name": "毒岛 黛也",
          "style": "力量",
          "source": "大招",
          "skills": [
            "中投教科书",
            "中投教科书"
          ],
          "actions": [
            "中投"
          ],
          "dualActions": [
            "中投"
          ],
          "score": 5
        },
        {
          "name": "先斗 月绮",
          "style": "力量",
          "source": "大招",
          "skills": [
            "饱和抛射",
            "饱和抛射"
          ],
          "actions": [
            "中投",
            "盯防"
          ],
          "dualActions": [
            "中投"
          ],
          "score": 5
        },
        {
          "name": "佐久间 雨乃",
          "style": "力量",
          "source": "大招",
          "skills": [
            "流星灌篮",
            "流星灌篮"
          ],
          "actions": [
            "扣篮",
            "盯防"
          ],
          "dualActions": [],
          "score": 2
        },
        {
          "name": "羽濑川 湊",
          "style": "球商",
          "source": "大招",
          "skills": [
            "绯刃裁决",
            "绯刃裁决"
          ],
          "actions": [
            "上篮"
          ],
          "dualActions": [],
          "score": 1
        },
        {
          "name": "澪奈·贾妮丝",
          "style": "力量",
          "source": "大招",
          "skills": [
            "毁灭重扣",
            "毁灭重扣"
          ],
          "actions": [
            "扣篮"
          ],
          "dualActions": [],
          "score": 0
        },
        {
          "name": "榎本 纯那",
          "style": "力量",
          "source": "大招",
          "skills": [
            "帝王冲击",
            "帝王冲击"
          ],
          "actions": [
            "上篮",
            "盯防"
          ],
          "dualActions": [],
          "score": 0
        },
        {
          "name": "五十岚 诗音",
          "style": "力量",
          "source": "大招",
          "skills": [
            "认真盖帽",
            "认真盖帽"
          ],
          "actions": [
            "盖帽"
          ],
          "dualActions": [],
          "score": 0
        }
      ],
      "breakerTraits": {
        "希雅·奥黛拉": {
          "energy": true,
          "stamina": "none",
          "playmaker": false
        },
        "毒岛 黛也": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        },
        "先斗 月绮": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        },
        "佐久间 雨乃": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        },
        "羽濑川 湊": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        },
        "澪奈·贾妮丝": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        },
        "榎本 纯那": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        },
        "五十岚 诗音": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        }
      },
      "breakersNote": "破盾：同属性大招破 2 层 / 小技能破 1 层（须成功）",
      "strategyNote": null,
      "stealers": [
        {
          "name": "希雅·奥黛拉",
          "style": "全能",
          "actions": [
            "中投",
            "勾手"
          ],
          "highActions": [
            "中投"
          ],
          "score": 38
        },
        {
          "name": "野上 泷",
          "style": "全能",
          "actions": [
            "中投",
            "篮板"
          ],
          "highActions": [
            "中投"
          ],
          "score": 24
        },
        {
          "name": "望月 透",
          "style": "速度",
          "actions": [
            "中投"
          ],
          "highActions": [
            "中投"
          ],
          "score": 22
        },
        {
          "name": "卧云 真昼",
          "style": "技巧",
          "actions": [
            "中投"
          ],
          "highActions": [
            "中投"
          ],
          "score": 22
        },
        {
          "name": "雨森 琉璃",
          "style": "技巧",
          "actions": [
            "中投",
            "篮板"
          ],
          "highActions": [
            "中投"
          ],
          "score": 8
        },
        {
          "name": "近江 奏",
          "style": "技巧",
          "actions": [
            "中投"
          ],
          "highActions": [
            "中投"
          ],
          "score": 6
        }
      ],
      "stealersNote": "偷分手优先得分手（增加持球球权）；认可动作须成功才加分；器材技能打出的动作也算",
      "equipmentFits": [
        {
          "equip": "战术板",
          "skill": "强力勾手",
          "attr": "力",
          "actions": [
            "勾手"
          ],
          "kind": "双效",
          "doubleDuty": true,
          "reason": "同属性力：勾手（破盾+偷分双效）"
        },
        {
          "equip": "高级壶铃B型",
          "skill": "大力抢断",
          "attr": "力",
          "actions": [
            "抢断"
          ],
          "kind": "破盾（防守）",
          "doubleDuty": false,
          "reason": "同属性力：抢断（防守变化，可破盾）"
        },
        {
          "equip": "黑星瑜伽垫",
          "skill": "强硬盯防",
          "attr": "力",
          "actions": [
            "盯防"
          ],
          "kind": "破盾（防守）",
          "doubleDuty": false,
          "reason": "同属性力：盯防（防守变化，可破盾）"
        },
        {
          "equip": "壶铃",
          "skill": "大力抢断",
          "attr": "力",
          "actions": [
            "抢断"
          ],
          "kind": "破盾（防守）",
          "doubleDuty": false,
          "reason": "同属性力：抢断（防守变化，可破盾）"
        },
        {
          "equip": "高级登山机",
          "skill": "中投大师",
          "attr": null,
          "actions": [
            "中投"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=None 不匹配力（不能破盾），但动作命中认可：中投（仅偷分）"
        },
        {
          "equip": "便携篮筐",
          "skill": "快速中投",
          "attr": "速",
          "actions": [
            "中投"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=速 不匹配力（不能破盾），但动作命中认可：中投（仅偷分）"
        },
        {
          "equip": "一砖入魂",
          "skill": "渐入佳境",
          "attr": null,
          "actions": [
            "中投"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=None 不匹配力（不能破盾），但动作命中认可：中投（仅偷分）"
        },
        {
          "equip": "AIR Uplifting SS",
          "skill": "篮板磁铁",
          "attr": null,
          "actions": [
            "篮板"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=None 不匹配力（不能破盾），但动作命中认可：篮板（仅偷分）"
        },
        {
          "equip": "K16 Low Daiya PE",
          "skill": "拼抢续航",
          "attr": null,
          "actions": [
            "篮板"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=None 不匹配力（不能破盾），但动作命中认可：篮板（仅偷分）"
        }
      ],
      "equipmentNote": "同属性器材技能可破盾；命中认可动作=偷分+破盾双效；防守变化类也适配（防守回合成功释放可赚破盾）"
    },
    "green": {
      "name": "绿圣山",
      "boss": "野上 泷",
      "attr": "技",
      "cardColor": "绿卡",
      "recognition": [
        "三分",
        "后撤",
        "横撤"
      ],
      "high": [
        "三分"
      ],
      "normal": [
        "后撤",
        "横撤"
      ],
      "breakers": [
        {
          "name": "羽田 朱志香",
          "style": "技巧",
          "source": "大招",
          "skills": [
            "终焉后撤步",
            "终焉后撤步"
          ],
          "actions": [
            "三分",
            "后撤"
          ],
          "dualActions": [
            "三分",
            "后撤"
          ],
          "score": 8
        },
        {
          "name": "卧云 真昼",
          "style": "技巧",
          "source": "大招",
          "skills": [
            "妖刀乱舞",
            "妖刀乱舞"
          ],
          "actions": [
            "三分",
            "盯防",
            "突破"
          ],
          "dualActions": [
            "三分"
          ],
          "score": 7
        },
        {
          "name": "野上 泷",
          "style": "全能",
          "source": "大招",
          "skills": [
            "战车重炮",
            "战车重炮"
          ],
          "actions": [
            "三分",
            "中投",
            "盯防",
            "篮板"
          ],
          "dualActions": [
            "三分"
          ],
          "score": 7
        },
        {
          "name": "美星 栗栖",
          "style": "球商",
          "source": "大招",
          "skills": [
            "特急加农炮",
            "特急加农炮"
          ],
          "actions": [
            "三分"
          ],
          "dualActions": [
            "三分"
          ],
          "score": 6
        },
        {
          "name": "龙宫寺 心叶",
          "style": "技巧",
          "source": "大招",
          "skills": [
            "正射之矢",
            "正射之矢"
          ],
          "actions": [
            "三分"
          ],
          "dualActions": [
            "三分"
          ],
          "score": 5
        },
        {
          "name": "远野 桐",
          "style": "技巧",
          "source": "大招",
          "skills": [
            "爱心射线",
            "爱心射线"
          ],
          "actions": [
            "三分",
            "盯防"
          ],
          "dualActions": [
            "三分"
          ],
          "score": 5
        },
        {
          "name": "近江 奏",
          "style": "技巧",
          "source": "大招",
          "skills": [
            "彗星投篮",
            "彗星投篮"
          ],
          "actions": [
            "中投"
          ],
          "dualActions": [],
          "score": 0
        },
        {
          "name": "百目鬼 剑",
          "style": "技巧",
          "source": "大招",
          "skills": [
            "死神降临",
            "死神降临"
          ],
          "actions": [
            "中投",
            "盯防"
          ],
          "dualActions": [],
          "score": 0
        }
      ],
      "breakerTraits": {
        "羽田 朱志香": {
          "energy": false,
          "stamina": "none",
          "playmaker": true
        },
        "卧云 真昼": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        },
        "野上 泷": {
          "energy": true,
          "stamina": "none",
          "playmaker": false
        },
        "美星 栗栖": {
          "energy": false,
          "stamina": "none",
          "playmaker": false
        },
        "龙宫寺 心叶": {
          "energy": false,
          "stamina": "none",
          "playmaker": true
        },
        "远野 桐": {
          "energy": false,
          "stamina": "none",
          "playmaker": true
        },
        "近江 奏": {
          "energy": false,
          "stamina": "self",
          "playmaker": true
        },
        "百目鬼 剑": {
          "energy": false,
          "stamina": "none",
          "playmaker": true
        }
      },
      "breakersNote": "破盾：同属性大招破 2 层 / 小技能破 1 层（须成功）",
      "strategyNote": "绿圣山正确偷分方式（2026-11-11 用户确认）：**不是单纯刷三分，而是“后撤/横撤移动创造 + 三分终结”**。后撤/横撤是移动行为，可被篮板/传球多次触发：没中→抢篮板→传空位→空位后撤→三分→再没中→再抢篮板→再传→再后撤，最后三分命中。绿卡绑定投射，灵活后撤=技卡，后撤后到三分线外绿卡就是三分（+900），整个循环都吃投射。认可分：三分成功+900、后撤成功+300、横撤成功+300；胜利+20%。破盾仍看技卡大招/小技能。配队优先能反复参与篮板/传球/空位移动的角色 + 后撤/横撤器材，而不是只堆三分手。",
      "stealers": [
        {
          "name": "羽田 朱志香",
          "style": "技巧",
          "actions": [
            "三分",
            "后撤"
          ],
          "highActions": [
            "三分"
          ],
          "score": 38
        },
        {
          "name": "野上 泷",
          "style": "全能",
          "actions": [
            "三分"
          ],
          "highActions": [
            "三分"
          ],
          "score": 37
        },
        {
          "name": "美星 栗栖",
          "style": "球商",
          "actions": [
            "三分"
          ],
          "highActions": [
            "三分"
          ],
          "score": 29
        },
        {
          "name": "和泉 香织",
          "style": "速度",
          "actions": [
            "三分"
          ],
          "highActions": [
            "三分"
          ],
          "score": 22
        },
        {
          "name": "森田 莉莉",
          "style": "速度",
          "actions": [
            "三分"
          ],
          "highActions": [
            "三分"
          ],
          "score": 22
        },
        {
          "name": "真崎 辉世",
          "style": "速度",
          "actions": [
            "三分"
          ],
          "highActions": [
            "三分"
          ],
          "score": 22
        }
      ],
      "stealersNote": "偷分手优先得分手（增加持球球权）；认可动作须成功才加分；器材技能打出的动作也算",
      "equipmentFits": [
        {
          "equip": "跑步机",
          "skill": "灵活后撤",
          "attr": "技",
          "actions": [
            "后撤"
          ],
          "kind": "双效",
          "doubleDuty": true,
          "reason": "技卡（绿卡）后撤：先撤步创造空位 → 更易接投射/三分（破盾+偷分双效）"
        },
        {
          "equip": "充气游泳池",
          "skill": "灵活突破",
          "attr": "技",
          "actions": [
            "突破"
          ],
          "kind": "破盾（技卡）",
          "doubleDuty": false,
          "reason": "技卡（绿卡）进攻小技能：成功释放可破 1 层（不直接偷绿山认可分）"
        },
        {
          "equip": "智能篮球",
          "skill": "快速三分",
          "attr": "速",
          "actions": [
            "三分"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=速 不匹配技（不能破盾），但动作命中认可：三分（仅偷分）"
        },
        {
          "equip": "录像带",
          "skill": "快速横撤",
          "attr": "速",
          "actions": [
            "后撤"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=速 不匹配技（不能破盾），但动作命中认可：后撤（仅偷分）"
        },
        {
          "equip": "跳绳",
          "skill": "后撤擅长",
          "attr": null,
          "actions": [
            "后撤"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=None 不匹配技（不能破盾），但动作命中认可：后撤（仅偷分）"
        },
        {
          "equip": "千金一掷",
          "skill": "从容一箭",
          "attr": null,
          "actions": [
            "三分"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=None 不匹配技（不能破盾），但动作命中认可：三分（仅偷分）"
        }
      ],
      "equipmentNote": "同属性器材技能可破盾；命中认可动作=偷分+破盾双效；防守变化类也适配（防守回合成功释放可赚破盾）"
    },
    "purple": {
      "name": "紫圣山",
      "boss": "出羽 十明",
      "attr": "无属性",
      "cardColor": "无色",
      "recognition": [
        "突破"
      ],
      "high": [
        "突破"
      ],
      "normal": [],
      "breakers": [
        {
          "name": "皆川 式",
          "style": "技巧",
          "source": "大招",
          "skills": [
            "骇客充能",
            "骇客充能"
          ],
          "actions": [],
          "dualActions": [],
          "score": 0
        },
        {
          "name": "洺瑶",
          "style": "力量",
          "source": "大招",
          "skills": [
            "绝望的城壁",
            "绝望的城壁"
          ],
          "actions": [
            "挡拆"
          ],
          "dualActions": [],
          "score": 0
        },
        {
          "name": "克拉丽丝·波洛",
          "style": "技巧",
          "source": "大招",
          "skills": [
            "快速装填",
            "快速装填",
            "快速装填"
          ],
          "actions": [
            "传球"
          ],
          "dualActions": [],
          "score": 0
        },
        {
          "name": "藤松 玖怜",
          "style": "力量",
          "source": "大招",
          "skills": [
            "同调之声",
            "同调之声"
          ],
          "actions": [],
          "dualActions": [],
          "score": 0
        },
        {
          "name": "绿川 步梦",
          "style": "技巧",
          "source": "大招",
          "skills": [
            "野性掩护",
            "野性掩护"
          ],
          "actions": [
            "挡拆",
            "盯防"
          ],
          "dualActions": [],
          "score": 0
        },
        {
          "name": "雨森 琉璃",
          "style": "技巧",
          "source": "大招",
          "skills": [
            "中音和弦",
            "中音和弦"
          ],
          "actions": [
            "中投"
          ],
          "dualActions": [],
          "score": 0
        },
        {
          "name": "名雪 纱夜",
          "style": "技巧",
          "source": "大招",
          "skills": [
            "治愈之风",
            "治愈之风"
          ],
          "actions": [],
          "dualActions": [],
          "score": 0
        },
        {
          "name": "清水 万里",
          "style": "球商",
          "source": "大招",
          "skills": [
            "女王的棋局",
            "女王的棋局"
          ],
          "actions": [],
          "dualActions": [],
          "score": 0
        }
      ],
      "breakerTraits": {
        "皆川 式": {
          "energy": true,
          "stamina": "none",
          "playmaker": true
        },
        "洺瑶": {
          "energy": false,
          "stamina": "none",
          "playmaker": true
        },
        "克拉丽丝·波洛": {
          "energy": false,
          "stamina": "team",
          "playmaker": true
        },
        "藤松 玖怜": {
          "energy": false,
          "stamina": "none",
          "playmaker": true
        },
        "绿川 步梦": {
          "energy": false,
          "stamina": "none",
          "playmaker": true
        },
        "雨森 琉璃": {
          "energy": false,
          "stamina": "none",
          "playmaker": true
        },
        "名雪 纱夜": {
          "energy": false,
          "stamina": "team",
          "playmaker": true
        },
        "清水 万里": {
          "energy": false,
          "stamina": "team",
          "playmaker": true
        }
      },
      "breakersNote": "破盾：同属性大招破 2 层 / 小技能破 1 层（须成功）；紫圣山无小技能，仅无属性大招可破（至少 3 名破盾手）",
      "strategyNote": "紫圣山破盾只能靠无属性大招（无小技能）；因此破盾手与偷分手不可能是同一人。至少带 3 名破盾手，否则破不了盾很吃亏；破盾手优先选能传球或回耐力/回能量的组织者，**优先回能量**（本模式能量>耐力，大招是最核心破盾/偷分手段）。偷分交给和泉/闪堂/真崎等突破得分手；剩余空位放辅助得分手的角色（如白神）。",
      "stealers": [
        {
          "name": "和泉 香织",
          "style": "速度",
          "actions": [
            "突破"
          ],
          "highActions": [
            "突破"
          ],
          "score": 52
        },
        {
          "name": "闪堂电",
          "style": "速度",
          "actions": [
            "突破"
          ],
          "highActions": [
            "突破"
          ],
          "score": 52
        },
        {
          "name": "真崎 辉世",
          "style": "速度",
          "actions": [
            "突破"
          ],
          "highActions": [
            "突破"
          ],
          "score": 52
        },
        {
          "name": "森田 莉莉",
          "style": "速度",
          "actions": [
            "突破"
          ],
          "highActions": [
            "突破"
          ],
          "score": 22
        },
        {
          "name": "卧云 真昼",
          "style": "技巧",
          "actions": [
            "突破"
          ],
          "highActions": [
            "突破"
          ],
          "score": 22
        },
        {
          "name": "羽濑川 湊",
          "style": "球商",
          "actions": [
            "突破"
          ],
          "highActions": [
            "突破"
          ],
          "score": 14
        }
      ],
      "stealersNote": "偷分手优先得分手（增加持球球权）；认可动作须成功才加分；器材技能打出的动作也算",
      "equipmentFits": [
        {
          "equip": "充气游泳池",
          "skill": "灵活突破",
          "attr": "技",
          "actions": [
            "突破"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=技 不匹配无属性（不能破盾），但动作命中认可：突破（仅偷分）"
        },
        {
          "equip": "都大会冠军戒指",
          "skill": "突分狂热",
          "attr": null,
          "actions": [
            "突破"
          ],
          "kind": "仅偷分",
          "doubleDuty": false,
          "reason": "属性=None 不匹配无属性（不能破盾），但动作命中认可：突破（仅偷分）"
        }
      ],
      "equipmentNote": "同属性器材技能可破盾；命中认可动作=偷分+破盾双效；防守变化类也适配（防守回合成功释放可赚破盾）"
    }
  },
  "saintTeamPlans": {
    "blue": {
      "name": "蓝圣山",
      "boss": "白神 时久",
      "breakAttr": "速",
      "recognition": [
        "上篮",
        "扣篮",
        "盖帽"
      ],
      "slots": [
        {
          "role": "破盾手（双职偷分）",
          "name": "闪堂电",
          "reason": "",
          "alternatives": [
            "和泉 香织",
            "望月 透",
            "森田 莉莉",
            "真崎 辉世"
          ]
        },
        {
          "role": "破盾手（双职偷分）",
          "name": "和泉 香织",
          "reason": "",
          "alternatives": [
            "闪堂电",
            "望月 透",
            "森田 莉莉",
            "真崎 辉世"
          ]
        },
        {
          "role": "破盾手",
          "name": "望月 透",
          "reason": "",
          "alternatives": [
            "闪堂电",
            "和泉 香织",
            "森田 莉莉",
            "真崎 辉世"
          ]
        },
        {
          "role": "偷分手",
          "name": "佐久间 雨乃",
          "reason": "",
          "alternatives": [
            "闪堂电",
            "和泉 香织",
            "羽濑川 湊",
            "清水 万里"
          ]
        },
        {
          "role": "偷分手",
          "name": "羽濑川 湊",
          "reason": "",
          "alternatives": [
            "闪堂电",
            "佐久间 雨乃",
            "和泉 香织",
            "清水 万里"
          ]
        }
      ],
      "equipment": [
        {
          "equip": "高级跳绳",
          "skill": "快速上篮",
          "kind": "双效",
          "reason": "同属性速：上篮（破盾+偷分双效）"
        },
        {
          "equip": "动感单车",
          "skill": "快速盖帽",
          "kind": "双效",
          "reason": "同属性速：盖帽/盖帽（破盾+偷分双效）"
        },
        {
          "equip": "杠铃",
          "skill": "快速扣篮",
          "kind": "双效",
          "reason": "同属性速：扣篮（破盾+偷分双效）"
        },
        {
          "equip": "高级瑜伽垫",
          "skill": "快速盯防",
          "kind": "破盾（防守）",
          "reason": "同属性速：盯防（防守变化，可破盾）"
        }
      ],
      "strategyNote": "",
      "note": "典型配置不是唯一解；缺角色时用每位的下位替代（同职责/同破盾属性/同认可动作）"
    },
    "red": {
      "name": "红圣山",
      "boss": "希雅·奥黛拉",
      "breakAttr": "力",
      "recognition": [
        "中投",
        "勾手",
        "篮板"
      ],
      "slots": [
        {
          "role": "破盾手（双职偷分）",
          "name": "希雅·奥黛拉",
          "reason": "",
          "alternatives": [
            "毒岛 黛也",
            "先斗 月绮",
            "佐久间 雨乃",
            "羽濑川 湊"
          ]
        },
        {
          "role": "破盾手",
          "name": "毒岛 黛也",
          "reason": "",
          "alternatives": [
            "希雅·奥黛拉",
            "先斗 月绮",
            "佐久间 雨乃",
            "羽濑川 湊"
          ]
        },
        {
          "role": "破盾手",
          "name": "先斗 月绮",
          "reason": "",
          "alternatives": [
            "希雅·奥黛拉",
            "毒岛 黛也",
            "佐久间 雨乃",
            "羽濑川 湊"
          ]
        },
        {
          "role": "偷分手",
          "name": "野上 泷",
          "reason": "",
          "alternatives": [
            "希雅·奥黛拉",
            "望月 透",
            "卧云 真昼",
            "雨森 琉璃"
          ]
        },
        {
          "role": "偷分手",
          "name": "望月 透",
          "reason": "",
          "alternatives": [
            "希雅·奥黛拉",
            "野上 泷",
            "卧云 真昼",
            "雨森 琉璃"
          ]
        }
      ],
      "equipment": [
        {
          "equip": "战术板",
          "skill": "强力勾手",
          "kind": "双效",
          "reason": "同属性力：勾手（破盾+偷分双效）"
        },
        {
          "equip": "高级壶铃B型",
          "skill": "大力抢断",
          "kind": "破盾（防守）",
          "reason": "同属性力：抢断（防守变化，可破盾）"
        },
        {
          "equip": "黑星瑜伽垫",
          "skill": "强硬盯防",
          "kind": "破盾（防守）",
          "reason": "同属性力：盯防（防守变化，可破盾）"
        },
        {
          "equip": "壶铃",
          "skill": "大力抢断",
          "kind": "破盾（防守）",
          "reason": "同属性力：抢断（防守变化，可破盾）"
        }
      ],
      "strategyNote": "",
      "note": "典型配置不是唯一解；缺角色时用每位的下位替代（同职责/同破盾属性/同认可动作）"
    },
    "green": {
      "name": "绿圣山",
      "boss": "野上 泷",
      "breakAttr": "技",
      "recognition": [
        "三分",
        "后撤",
        "横撤"
      ],
      "slots": [
        {
          "role": "破盾手（双职偷分）",
          "name": "羽田 朱志香",
          "reason": "",
          "alternatives": [
            "卧云 真昼",
            "野上 泷",
            "美星 栗栖",
            "龙宫寺 心叶"
          ]
        },
        {
          "role": "破盾手",
          "name": "卧云 真昼",
          "reason": "",
          "alternatives": [
            "羽田 朱志香",
            "野上 泷",
            "美星 栗栖",
            "龙宫寺 心叶"
          ]
        },
        {
          "role": "破盾手（双职偷分）",
          "name": "野上 泷",
          "reason": "",
          "alternatives": [
            "羽田 朱志香",
            "卧云 真昼",
            "美星 栗栖",
            "龙宫寺 心叶"
          ]
        },
        {
          "role": "偷分手",
          "name": "美星 栗栖",
          "reason": "",
          "alternatives": [
            "羽田 朱志香",
            "野上 泷",
            "和泉 香织",
            "森田 莉莉"
          ]
        },
        {
          "role": "偷分手",
          "name": "和泉 香织",
          "reason": "",
          "alternatives": [
            "羽田 朱志香",
            "野上 泷",
            "美星 栗栖",
            "森田 莉莉"
          ]
        }
      ],
      "equipment": [
        {
          "equip": "跑步机",
          "skill": "灵活后撤",
          "kind": "双效",
          "reason": "技卡（绿卡）后撤：先撤步创造空位 → 更易接投射/三分（破盾+偷分双效）"
        },
        {
          "equip": "充气游泳池",
          "skill": "灵活突破",
          "kind": "破盾（技卡）",
          "reason": "技卡（绿卡）进攻小技能：成功释放可破 1 层（不直接偷绿山认可分）"
        },
        {
          "equip": "智能篮球",
          "skill": "快速三分",
          "kind": "仅偷分",
          "reason": "属性=速 不匹配技（不能破盾），但动作命中认可：三分（仅偷分）"
        },
        {
          "equip": "录像带",
          "skill": "快速横撤",
          "kind": "仅偷分",
          "reason": "属性=速 不匹配技（不能破盾），但动作命中认可：后撤（仅偷分）"
        }
      ],
      "strategyNote": "绿圣山正确偷分方式（2026-11-11 用户确认）：**不是单纯刷三分，而是“后撤/横撤移动创造 + 三分终结”**。后撤/横撤是移动行为，可被篮板/传球多次触发：没中→抢篮板→传空位→空位后撤→三分→再没中→再抢篮板→再传→再后撤，最后三分命中。绿卡绑定投射，灵活后撤=技卡，后撤后到三分线外绿卡就是三分（+900），整个循环都吃投射。认可分：三分成功+900、后撤成功+300、横撤成功+300；胜利+20%。破盾仍看技卡大招/小技能。配队优先能反复参与篮板/传球/空位移动的角色 + 后撤/横撤器材，而不是只堆三分手。",
      "note": "典型配置不是唯一解；缺角色时用每位的下位替代（同职责/同破盾属性/同认可动作）"
    },
    "purple": {
      "name": "紫圣山",
      "boss": "出羽 十明",
      "breakAttr": "无属性",
      "recognition": [
        "突破"
      ],
      "slots": [
        {
          "role": "破盾·回能（双职）",
          "name": "皆川 式",
          "reason": "紫圣山唯一双职能：无属性大招破盾 + 回能量，优先带",
          "alternatives": [
            "洺瑶",
            "雨森 琉璃",
            "绿川 步梦",
            "名雪 纱夜"
          ]
        },
        {
          "role": "破盾·传球拐投射",
          "name": "克拉丽丝·波洛",
          "reason": "传球/回耐 + 拐投射（优先配突破后接中投的偷分手）",
          "alternatives": [
            "洺瑶",
            "雨森 琉璃",
            "绿川 步梦",
            "名雪 纱夜"
          ]
        },
        {
          "role": "破盾·拐投射",
          "name": "藤松 玖怜",
          "reason": "无属性大招破盾 + 全队投射拐",
          "alternatives": [
            "洺瑶",
            "雨森 琉璃",
            "绿川 步梦",
            "名雪 纱夜"
          ]
        },
        {
          "role": "偷分·突破接中投",
          "name": "真崎 辉世",
          "reason": "突破后接中投，吃克拉丽丝/藤松的投射拐",
          "alternatives": [
            "和泉 香织",
            "闪堂电",
            "森田 莉莉",
            "卧云 真昼"
          ],
          "note": "突破后接上篮/扣篮的（闪堂/佐久间）吃不到投射拐，只能当次选"
        },
        {
          "role": "偷分·突破接中投",
          "name": "卧云 真昼",
          "reason": "妖刀乱舞=突破选卡后接中投，吃投射拐",
          "alternatives": [
            "和泉 香织",
            "闪堂电",
            "森田 莉莉",
            "羽濑川 湊"
          ],
          "note": "突破后接上篮/扣篮的（闪堂/佐久间）吃不到投射拐，只能当次选"
        }
      ],
      "equipment": [
        {
          "equip": "充气游泳池",
          "skill": "灵活突破",
          "kind": "仅偷分",
          "reason": "属性=技 不匹配无属性（不能破盾），但动作命中认可：突破（仅偷分）"
        },
        {
          "equip": "都大会冠军戒指",
          "skill": "突分狂热",
          "kind": "仅偷分",
          "reason": "属性=None 不匹配无属性（不能破盾），但动作命中认可：突破（仅偷分）"
        }
      ],
      "strategyNote": "紫圣山破盾只能靠无属性大招（无小技能）；因此破盾手与偷分手不可能是同一人。至少带 3 名破盾手，否则破不了盾很吃亏；破盾手优先选能传球或回耐力/回能量的组织者，**优先回能量**（本模式能量>耐力，大招是最核心破盾/偷分手段）。偷分交给和泉/闪堂/真崎等突破得分手；剩余空位放辅助得分手的角色（如白神）。",
      "note": "典型配置不是唯一解；缺角色时用每位的下位替代（同职责/同破盾属性/同认可动作）"
    }
  },
  "saintCharMeta": {
    "澪奈·贾妮丝": {
      "name": "澪奈·贾妮丝",
      "style": "力量",
      "primaryRole": "防守核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "力"
      ],
      "actions": [
        "扣篮"
      ]
    },
    "龙宫寺 心叶": {
      "name": "龙宫寺 心叶",
      "style": "技巧",
      "primaryRole": "组织核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "技"
      ],
      "actions": [
        "三分",
        "篮板"
      ]
    },
    "近江 奏": {
      "name": "近江 奏",
      "style": "技巧",
      "primaryRole": "组织核心",
      "energySupport": false,
      "staminaSupport": "self",
      "ultAttrs": [
        "技"
      ],
      "actions": [
        "中投"
      ]
    },
    "和泉 香织": {
      "name": "和泉 香织",
      "style": "速度",
      "primaryRole": "主攻核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "速"
      ],
      "actions": [
        "三分",
        "上篮",
        "盯防",
        "突破"
      ]
    },
    "亚理纱 贾斯敏": {
      "name": "亚理纱 贾斯敏",
      "style": "速度",
      "primaryRole": "篮板主核",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "无属性"
      ],
      "actions": [
        "盯防",
        "篮板"
      ]
    },
    "洺瑶": {
      "name": "洺瑶",
      "style": "力量",
      "primaryRole": "组织核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "无属性"
      ],
      "actions": [
        "勾手",
        "挡拆",
        "盖帽",
        "盯防"
      ]
    },
    "闪堂电": {
      "name": "闪堂电",
      "style": "速度",
      "primaryRole": "主攻核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "技",
        "速"
      ],
      "actions": [
        "上篮",
        "突破"
      ]
    },
    "克拉丽丝·波洛": {
      "name": "克拉丽丝·波洛",
      "style": "技巧",
      "primaryRole": "组织核心",
      "energySupport": false,
      "staminaSupport": "team",
      "ultAttrs": [
        "无属性"
      ],
      "actions": [
        "传球"
      ]
    },
    "早濑 千秋": {
      "name": "早濑 千秋",
      "style": "力量",
      "primaryRole": "防守核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "无属性"
      ],
      "actions": [
        "盯防",
        "篮板"
      ]
    },
    "羽田 朱志香": {
      "name": "羽田 朱志香",
      "style": "技巧",
      "primaryRole": "组织核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "技"
      ],
      "actions": [
        "三分",
        "后撤"
      ]
    },
    "望月 透": {
      "name": "望月 透",
      "style": "速度",
      "primaryRole": "主攻核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "速"
      ],
      "actions": [
        "中投"
      ]
    },
    "百目鬼 剑": {
      "name": "百目鬼 剑",
      "style": "技巧",
      "primaryRole": "组织核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "技"
      ],
      "actions": [
        "中投",
        "盯防"
      ]
    },
    "藤松 玖怜": {
      "name": "藤松 玖怜",
      "style": "力量",
      "primaryRole": "组织核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "无属性"
      ],
      "actions": [
        "三分"
      ]
    },
    "绿川 步梦": {
      "name": "绿川 步梦",
      "style": "技巧",
      "primaryRole": "组织核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "无属性"
      ],
      "actions": [
        "挡拆",
        "盯防"
      ]
    },
    "雨森 琉璃": {
      "name": "雨森 琉璃",
      "style": "技巧",
      "primaryRole": "组织核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "无属性"
      ],
      "actions": [
        "中投",
        "篮板"
      ]
    },
    "皆川 式": {
      "name": "皆川 式",
      "style": "技巧",
      "primaryRole": "组织核心",
      "energySupport": true,
      "staminaSupport": "none",
      "ultAttrs": [
        "无属性"
      ],
      "actions": [
        "抢断",
        "盯防"
      ]
    },
    "毒岛 黛也": {
      "name": "毒岛 黛也",
      "style": "力量",
      "primaryRole": "防守核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "力"
      ],
      "actions": [
        "中投",
        "传球",
        "盯防"
      ]
    },
    "名雪 纱夜": {
      "name": "名雪 纱夜",
      "style": "技巧",
      "primaryRole": "组织核心",
      "energySupport": false,
      "staminaSupport": "team",
      "ultAttrs": [
        "无属性"
      ],
      "actions": [
        "传球"
      ]
    },
    "佐久间 雨乃": {
      "name": "佐久间 雨乃",
      "style": "力量",
      "primaryRole": "主攻核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "力"
      ],
      "actions": [
        "上篮",
        "扣篮",
        "盯防"
      ]
    },
    "千圣·贝尔丝": {
      "name": "千圣·贝尔丝",
      "style": "球商",
      "primaryRole": "篮板主核",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "无属性"
      ],
      "actions": [
        "篮板"
      ]
    },
    "稻叶 杏里": {
      "name": "稻叶 杏里",
      "style": "速度",
      "primaryRole": "防守核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "速"
      ],
      "actions": [
        "抢断",
        "突破",
        "背打"
      ]
    },
    "清水 万里": {
      "name": "清水 万里",
      "style": "球商",
      "primaryRole": "组织核心",
      "energySupport": false,
      "staminaSupport": "team",
      "ultAttrs": [
        "无属性"
      ],
      "actions": [
        "上篮",
        "传球",
        "扣篮",
        "盯防"
      ]
    },
    "榎本 纯那": {
      "name": "榎本 纯那",
      "style": "力量",
      "primaryRole": "防守核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "力"
      ],
      "actions": [
        "上篮",
        "扣篮",
        "抢断",
        "盯防",
        "篮板"
      ]
    },
    "春澄 永远": {
      "name": "春澄 永远",
      "style": "球商",
      "primaryRole": "组织核心",
      "energySupport": false,
      "staminaSupport": "team",
      "ultAttrs": [
        "无属性"
      ],
      "actions": [
        "篮板"
      ]
    },
    "森田 莉莉": {
      "name": "森田 莉莉",
      "style": "速度",
      "primaryRole": "主攻核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "速"
      ],
      "actions": [
        "三分",
        "突破"
      ]
    },
    "美伽 未来": {
      "name": "美伽 未来",
      "style": "技巧",
      "primaryRole": "组织核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "技"
      ],
      "actions": [
        "上篮"
      ]
    },
    "五十岚 诗音": {
      "name": "五十岚 诗音",
      "style": "力量",
      "primaryRole": "防守核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "力"
      ],
      "actions": [
        "盖帽"
      ]
    },
    "羽濑川 湊": {
      "name": "羽濑川 湊",
      "style": "球商",
      "primaryRole": "副C",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "力"
      ],
      "actions": [
        "上篮",
        "突破"
      ]
    },
    "真崎 辉世": {
      "name": "真崎 辉世",
      "style": "速度",
      "primaryRole": "主攻核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "速"
      ],
      "actions": [
        "三分",
        "突破"
      ]
    },
    "先斗 月绮": {
      "name": "先斗 月绮",
      "style": "力量",
      "primaryRole": "防守核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "力"
      ],
      "actions": [
        "中投",
        "盯防"
      ]
    },
    "卧云 真昼": {
      "name": "卧云 真昼",
      "style": "技巧",
      "primaryRole": "主攻核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "技"
      ],
      "actions": [
        "三分",
        "中投",
        "盯防",
        "突破"
      ]
    },
    "野上 泷": {
      "name": "野上 泷",
      "style": "全能",
      "primaryRole": "主攻核心",
      "energySupport": true,
      "staminaSupport": "none",
      "ultAttrs": [
        "技"
      ],
      "actions": [
        "三分",
        "中投",
        "盯防",
        "篮板"
      ]
    },
    "降旗 千红纱": {
      "name": "降旗 千红纱",
      "style": "球商",
      "primaryRole": "防守核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "技"
      ],
      "actions": [
        "盖帽",
        "盯防"
      ]
    },
    "林原 树里": {
      "name": "林原 树里",
      "style": "力量",
      "primaryRole": "防守核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "力"
      ],
      "actions": [
        "抢断",
        "盯防"
      ]
    },
    "美星 栗栖": {
      "name": "美星 栗栖",
      "style": "球商",
      "primaryRole": "副C",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "技"
      ],
      "actions": [
        "三分"
      ]
    },
    "远野 桐": {
      "name": "远野 桐",
      "style": "技巧",
      "primaryRole": "组织核心",
      "energySupport": false,
      "staminaSupport": "none",
      "ultAttrs": [
        "技"
      ],
      "actions": [
        "三分",
        "盯防"
      ]
    },
    "白神 时久": {
      "name": "白神 时久",
      "style": "全能",
      "primaryRole": "组织核心",
      "energySupport": true,
      "staminaSupport": "none",
      "ultAttrs": [
        "速"
      ],
      "actions": [
        "传球",
        "抢断",
        "突破"
      ]
    },
    "希雅·奥黛拉": {
      "name": "希雅·奥黛拉",
      "style": "全能",
      "primaryRole": "防守核心",
      "energySupport": true,
      "staminaSupport": "none",
      "ultAttrs": [
        "力"
      ],
      "actions": [
        "中投",
        "勾手",
        "盖帽",
        "盯防",
        "背打"
      ]
    }
  },
  "cupEvents": {
    "_meta": {
      "generated": "2026-11-11",
      "source": "用户口径（立冬杯已结束，规则用于参考；下一届可能不同）",
      "note": "杯赛赛制经常变化；本文件只记录已结束的立冬杯，作为后续杯赛参考。"
    },
    "events": [
      {
        "id": "lidong-cup",
        "name": "立冬杯",
        "status": "ended",
        "statusLabel": "已结束",
        "summary": "特别场地·泥泞场地；挑战赛/大师赛；三轮赛制（第一轮/第二轮/决赛轮）；决赛开竞猜最佳阵容。",
        "terrain": {
          "name": "泥泞场地",
          "timing": "5:00 后（半场）",
          "effects": [
            "场地会下雨并形成积水",
            "在积水中投篮的球员命中率降低，并会有大概率摔倒",
            "速度风格球员无视此不利条件",
            "速度风格球员每次开大招后，回复自身 20 能量",
            "泥泞场地为所有速度风格球员提供 15% 全属性加成"
          ]
        },
        "zones": [
          {
            "name": "挑战赛",
            "restriction": "只允许 A 评分及以下球员参加"
          },
          {
            "name": "大师赛",
            "restriction": "无条件"
          }
        ],
        "rewards": {
          "same": "每个赛区的钻石（抽卡资源）、卡包（球星卡来源）奖励相同",
          "difference": "仅头像框、称号等“时尚小垃圾”有区别"
        },
        "format": [
          {
            "stage": "第一轮",
            "duration": "2 天",
            "rule": "用一支固定队伍连续打 5 个随机对手；至少 3 胜锁定进入第二轮 A 组，其余进入 B 组；全输则直接淘汰。",
            "chances": "每天可打 3 轮，共 6 次机会；有一次达到 3 胜即可进入第二轮 A 组；胜场越高，钻石奖励越高。"
          },
          {
            "stage": "第二轮",
            "duration": "2 天",
            "rule": "用一支固定队伍连续打 5 个随机对手；至少 3 胜锁定进入决赛轮 A 组，其余进入 B 组；全输也进入 B 组。",
            "chances": "B 组一路打，获得一胜进入决赛轮 B 组，全输直接失败；B 组无法进入 A 组（实质是败者组）。每天 3 次，有一次达到 3 胜以上即可晋级。"
          },
          {
            "stage": "决赛轮",
            "duration": "抽签后淘汰赛",
            "rule": "所有进入 A/B 组的角色由系统抽签分为若干四人小组，分左右半场打四强淘汰赛；每场相同队伍配置打 3 轮，三局两胜。",
            "chances": "队伍配置需要在决赛日前（第二轮结束后一天）配置完成，之后锁定配置。四人排名为冠军/亚军/季军；无第四名奖励，因为不打季军赛，决赛第一轮被淘汰的统一视为第三名。"
          }
        ],
        "formatNote": "这个杯赛并不是严格的真正淘汰赛，而是尽量给大家均衡发福利的比赛。",
        "quiz": {
          "title": "决赛竞猜 · 最佳阵容",
          "wrong": "不是“最优一阵”，不是事实上最强/最适配的专属阵容。",
          "right": "实际竞猜的是：胜率最高的玩家完整五人阵容。",
          "factors": [
            "氪佬的整体练度",
            "氪佬的练队偏向",
            "大部分玩家的练队偏向"
          ],
          "lidongAnswer": "立冬杯实际最优配置 = 训练队五人：闪堂、希雅、佐久间、望月、真崎。",
          "lidongWhy": "因为这是持有/最高训练人数最多的配置，不是事实上比这个队伍更强更适配的专属阵容——没有那么多人会针对配队。",
          "note": "特别注明：竞猜最佳阵容 = 玩家胜率最高的完整五人阵容，不是版本最强阵容。"
        }
      }
    ]
  }
};
  if (typeof module === "object" && module.exports) module.exports = data;
  if (root) {
    root.BBScenarios = data;
    root.BBT = root.BBT || {};
    root.BBT.scenarios = data;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

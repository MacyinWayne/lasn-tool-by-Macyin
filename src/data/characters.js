/*!
 * data/characters.js —— 自动生成，请勿手改。
 * 生成脚本：tool/scripts/build-data.mjs
 * 生成时间：2026-11-14 07:53
 * 数据模式：T1 结构化数据
 * 数据来源：data/structured/characters.json
 *
 * file:// 下无法 fetch 本地 JSON，所以角色数据以全局脚本形式固化，
 * 页面用普通 <script> 引入即可离线双击使用。
 */
(function (root) {
  'use strict';
  var data = {
  "schema": 1,
  "generatedAt": "2026-11-14 07:53",
  "count": 38,
  "mode": "structured",
  "source": "data/structured/characters.json",
  "sourceLabel": "T1 结构化数据",
  "derivedSource": "data/structured/derived_roster.json",
  "skillDutySource": "data/structured/skill_duty_readable.json",
  "inputBytes": 85988,
  "sourceMeta": {
    "generatedAt": "2026-11-05 07:23",
    "source": "data/raw/gamekee（GameKee wiki content/detail 原始响应，未重新抓取）",
    "completenessAvg": 99.3,
    "notes": [
      "属性/潜力均为 wiki 标注的「参考数值」，不是游戏内初始面板，原文声明「实际表现以游戏内为准」。",
      "六项属性：投射 / 攻筐 / 防投 / 护筐 / 传球 / 突破。",
      "六项潜力按「槽位1~6」列出，wiki 原文未标注对应属性名称，故不臆造属性名。",
      "技能 type：固定 / 额外；部分球员的额外技能在 wiki 上有「技能等级 2」条目，归入 levels 数组。",
      "style 为空表示 wiki 资料未给出定位风格（如 野上泷 / 白神时久 / 希雅·奥黛拉）；title_source=editor_note 表示 wiki 上该定位称号为编辑注释而非官方称号。",
      "38 名球员六项潜力合计恒为 1000，属性合计 960~1297，二者为不同配额体系。",
      "六维合计按稀有度分档（R/SR/SSR），且存在 4 组完全重复的六维向量（见 findings）——这是「潜力向量位置原型模板 × 稀有度曲线」的结构性结果：同模板+同稀有度即同六维，组内差异只在技能/流派天赋；仍属 wiki 参考值，需客户端数据最终校验。详细派生见 data/structured/derived_roster.json。",
      "3 名球员（森田 莉莉 / 美伽 未来 / 五十岚 诗音）固定技能描述在 wiki 原文为空，保留 null 未臆造。",
      "2026-11-12 res20/1.0.21 复核：百目鬼 剑 身高体重改客户端角色卡 178/63（原 wiki 181/75 有误），新增臂展 189；A层满级六维 227/250/168/183/189/176 已由客户端「角色等级表」level120+40 复核（38/38 wiki 角色一致），来源标注改为客户端配置实测。"
    ],
    "skillLevelStats": {
      "只有1级": 0,
      "最高1级": 31,
      "最高2级": 7
    }
  },
  "warnings": [],
  "characters": [
    {
      "id": "player_1001",
      "contentId": 725342,
      "entryId": null,
      "name": "澪奈·贾妮丝",
      "aliases": [],
      "title": "内线杀器",
      "titleSource": "official",
      "rarity": "SR",
      "stars": null,
      "role": "小前",
      "style": "防守者",
      "school": "北空之丘女高",
      "heightCm": 170,
      "weightKg": 60,
      "spanCm": null,
      "tags": [],
      "roles": [
        "防守者"
      ],
      "stats": {
        "投射": 197,
        "攻筐": 264,
        "防投": 187,
        "护筐": 248,
        "传球": 207,
        "突破": 194
      },
      "potentials": [
        {
          "slot": 1,
          "value": 130
        },
        {
          "slot": 2,
          "value": 260
        },
        {
          "slot": 3,
          "value": 108
        },
        {
          "slot": 4,
          "value": 229
        },
        {
          "slot": 5,
          "value": 150
        },
        {
          "slot": 6,
          "value": 123
        }
      ],
      "skills": [
        {
          "name": "毁灭重扣",
          "type": "固定",
          "summary": "我方小前和大前获得强化：小幅提升弹跳属性 (受澪奈弹跳影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "我方小前和大前获得强化：小幅提升弹跳属性 (受澪奈弹跳影响)，持续2分钟。",
              "energyCost": 80,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "斗志昂扬",
          "type": "额外",
          "summary": "扣篮命中后，中幅提升 自身 防守属性(受澪奈体能影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "扣篮命中后，中幅提升 自身 防守属性(受澪奈体能影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "小前锋是游戏中重要的得分者，擅长多样化的得分手段",
      "styleDesc": "优越的防守意识，在防守上有独特的优势。",
      "positionDesc": "小前锋是游戏中重要的得分者，擅长多样化的得分手段",
      "source": "https://www.gamekee.com/lqsn/725342.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:05",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725342.png",
      "thumb": "assets/portraits/725342.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725342.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 197,
          "攻筐": 264,
          "防投": 187,
          "护筐": 248,
          "传球": 207,
          "突破": 194
        },
        "potentials": [
          {
            "slot": 1,
            "value": 130
          },
          {
            "slot": 2,
            "value": 260
          },
          {
            "slot": 3,
            "value": 108
          },
          {
            "slot": 4,
            "value": 229
          },
          {
            "slot": 5,
            "value": 150
          },
          {
            "slot": 6,
            "value": 123
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
        "小前球员全属性+20%",
        "小前球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725342,
        "functionalTags": [
          "模板·内线终结",
          "模板·护筐/篮板",
          "技能·突破",
          "技能·团队增益",
          "技能·进攻",
          "技能·防守",
          "技能·自我增益"
        ],
        "roleSummary": "小前·攻筐+护筐型；技能偏向 团队增益/自我增益",
        "positionRank": {
          "rank": 1,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 230.5,
            "base_z": 1.769,
            "base_pct": 96.1,
            "growth_raw": 195,
            "growth_z": 0.745,
            "growth_pct": 89.5
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 197,
            "base_z": 0.253,
            "base_pct": 56.6,
            "growth_raw": 130,
            "growth_z": -0.568,
            "growth_pct": 32.9
          },
          "defense": {
            "label": "防守",
            "base_raw": 217.5,
            "base_z": 1.464,
            "base_pct": 98.7,
            "growth_raw": 168.5,
            "growth_z": 0.479,
            "growth_pct": 60.5
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 207,
            "base_z": 0.711,
            "base_pct": 77.6,
            "growth_raw": 150,
            "growth_z": -0.145,
            "growth_pct": 57.9
          },
          "drive": {
            "label": "突破",
            "base_raw": 222,
            "base_z": 1.227,
            "base_pct": 96.1,
            "growth_raw": 177.8,
            "growth_z": -0.334,
            "growth_pct": 36.8
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 257.6,
            "base_z": 1.973,
            "base_pct": 98.7,
            "growth_raw": 247.6,
            "growth_z": 1.371,
            "growth_pct": 82.9
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 71.87,
            "base_z": 0.322,
            "base_pct": 56.6,
            "growth_raw": 71.87,
            "growth_z": 0.322,
            "growth_pct": 56.6
          },
          "base_position_weighted": {
            "raw": 1.23,
            "pct": 98.7
          },
          "growth_position_weighted": {
            "raw": 0.245,
            "pct": 46.1
          },
          "panel_combined": {
            "raw": 77.63,
            "pct": 85.5,
            "rank": 6
          },
          "skill_value": {
            "raw": 4.53,
            "pct": 39.5,
            "rank": 23
          },
          "overall": {
            "raw": 68.09,
            "pct": 77.6,
            "rank": 9
          }
        },
        "attributeSum": 1297,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "小前-T09",
          "name": "小前·攻筐+护筐型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": "T2",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 9,
        "identicalAttrGroup": null,
        "streamRoles": []
      }
    },
    {
      "id": "player_1002",
      "contentId": 725343,
      "entryId": null,
      "name": "龙宫寺 心叶",
      "aliases": [],
      "title": "三分好手",
      "titleSource": "official",
      "rarity": "SR",
      "stars": null,
      "role": "大前",
      "style": "组织者",
      "school": "北空之丘女高",
      "heightCm": 175,
      "weightKg": 67,
      "spanCm": null,
      "tags": [],
      "roles": [
        "组织者"
      ],
      "stats": {
        "投射": 232,
        "攻筐": 215,
        "防投": 200,
        "护筐": 217,
        "传球": 189,
        "突破": 240
      },
      "potentials": [
        {
          "slot": 1,
          "value": 199
        },
        {
          "slot": 2,
          "value": 167
        },
        {
          "slot": 3,
          "value": 135
        },
        {
          "slot": 4,
          "value": 171
        },
        {
          "slot": 5,
          "value": 115
        },
        {
          "slot": 6,
          "value": 213
        }
      ],
      "skills": [
        {
          "name": "正射之矢",
          "type": "固定",
          "summary": "我方小前和大前获得强化：小幅提升看破概率，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "我方小前和大前获得强化：小幅提升看破概率，持续2分钟。",
              "energyCost": 120,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "篮板追击者",
          "type": "额外",
          "summary": "我方中锋和大前 抢篮板时，小幅提升弹跳属性(受龙宫寺投射影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "我方中锋和大前 抢篮板时，小幅提升弹跳属性(受龙宫寺投射影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "大前锋往往体格强壮，能在篮下发起强硬攻击且冲抢篮板",
      "styleDesc": "球场指挥官，能让队伍完美执行战术，提升得分效率。",
      "positionDesc": "大前锋往往体格强壮，能在篮下发起强硬攻击且冲抢篮板",
      "source": "https://www.gamekee.com/lqsn/725343.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:08",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725343.png",
      "thumb": "assets/portraits/725343.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725343.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 232,
          "攻筐": 215,
          "防投": 200,
          "护筐": 217,
          "传球": 189,
          "突破": 240
        },
        "potentials": [
          {
            "slot": 1,
            "value": 199
          },
          {
            "slot": 2,
            "value": 167
          },
          {
            "slot": 3,
            "value": 135
          },
          {
            "slot": 4,
            "value": 171
          },
          {
            "slot": 5,
            "value": 115
          },
          {
            "slot": 6,
            "value": 213
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "大前球员全属性+20%",
        "大前球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725343,
        "functionalTags": [
          "模板·突破/持球",
          "模板·空间/投射",
          "技能·防守",
          "技能·团队增益",
          "技能·空间/外线",
          "技能·篮板（代理）",
          "技能·突破"
        ],
        "roleSummary": "大前·突破+投射型；技能偏向 团队增益",
        "positionRank": {
          "rank": 4,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 223.5,
            "base_z": 1.386,
            "base_pct": 93.4,
            "growth_raw": 183,
            "growth_z": 0.206,
            "growth_pct": 56.6
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 232,
            "base_z": 1.365,
            "base_pct": 93.4,
            "growth_raw": 199,
            "growth_z": 0.717,
            "growth_pct": 72.4
          },
          "defense": {
            "label": "防守",
            "base_raw": 208.5,
            "base_z": 1.058,
            "base_pct": 88.2,
            "growth_raw": 153,
            "growth_z": -0.003,
            "growth_pct": 39.5
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 189,
            "base_z": 0.088,
            "base_pct": 60.5,
            "growth_raw": 115,
            "growth_z": -0.824,
            "growth_pct": 30.3
          },
          "drive": {
            "label": "突破",
            "base_raw": 230,
            "base_z": 1.716,
            "base_pct": 98.7,
            "growth_raw": 194.6,
            "growth_z": 0.332,
            "growth_pct": 50
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 215.8,
            "base_z": 0.544,
            "base_pct": 64.5,
            "growth_raw": 168.6,
            "growth_z": -0.275,
            "growth_pct": 42.1
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 64.76,
            "base_z": -0.171,
            "base_pct": 39.5,
            "growth_raw": 64.76,
            "growth_z": -0.171,
            "growth_pct": 39.5
          },
          "base_position_weighted": {
            "raw": 0.94,
            "pct": 93.4
          },
          "growth_position_weighted": {
            "raw": -0.023,
            "pct": 15.8
          },
          "panel_combined": {
            "raw": 62.37,
            "pct": 64.5,
            "rank": 14
          },
          "skill_value": {
            "raw": 5.06,
            "pct": 43.4,
            "rank": 22
          },
          "overall": {
            "raw": 57.63,
            "pct": 61.8,
            "rank": 15
          }
        },
        "attributeSum": 1293,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "大前-T07",
          "name": "大前·突破+投射型",
          "shared": true,
          "sameTemplatePlayers": [
            "雨森 琉璃(SSR)"
          ]
        },
        "knownStreamTalents": [],
        "trainingTalents": [
          {
            "talent": "表情爆发每个表情 bonus +4%（与望月 +8% 同乘区，互相稀释）",
            "category": "表情（训练爆发）",
            "note": "",
            "confidence": "实测（内测）",
            "source": "https://www.taptap.cn/moment/805700735671995246"
          }
        ],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": "T1",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 15,
        "identicalAttrGroup": null,
        "streamRoles": []
      }
    },
    {
      "id": "player_1003",
      "contentId": 725344,
      "entryId": null,
      "name": "近江 奏",
      "aliases": [],
      "title": "中投好手",
      "titleSource": "official",
      "rarity": "SR",
      "stars": null,
      "role": "分卫",
      "style": "组织者",
      "school": "北空之丘女高",
      "heightCm": 163,
      "weightKg": 55,
      "spanCm": null,
      "tags": [],
      "roles": [
        "组织者"
      ],
      "stats": {
        "投射": 230,
        "攻筐": 160,
        "防投": 157,
        "护筐": 154,
        "传球": 168,
        "突破": 224
      },
      "potentials": [
        {
          "slot": 1,
          "value": 260
        },
        {
          "slot": 2,
          "value": 122
        },
        {
          "slot": 3,
          "value": 118
        },
        {
          "slot": 4,
          "value": 110
        },
        {
          "slot": 5,
          "value": 140
        },
        {
          "slot": 6,
          "value": 250
        }
      ],
      "skills": [
        {
          "name": "彗星投篮",
          "type": "固定",
          "summary": "中幅回复自身耐力。",
          "levels": [
            {
              "level": 1,
              "desc": "中幅回复自身耐力。",
              "energyCost": 80,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "稳健投手",
          "type": "额外",
          "summary": "中幅提升 自身 中投威力(受近江意识影响)。",
          "levels": [
            {
              "level": 1,
              "desc": "中幅提升 自身 中投威力(受近江意识影响)。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "得分后卫通常拥有很强的投射能力，在外线为队伍贡献得分",
      "styleDesc": "球场指挥官，能让队伍完美执行战术，提升得分效率。",
      "positionDesc": "得分后卫通常拥有很强的投射能力，在外线为队伍贡献得分",
      "source": "https://www.gamekee.com/lqsn/725344.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:08",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725344.png",
      "thumb": "assets/portraits/725344.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725344.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 230,
          "攻筐": 160,
          "防投": 157,
          "护筐": 154,
          "传球": 168,
          "突破": 224
        },
        "potentials": [
          {
            "slot": 1,
            "value": 260
          },
          {
            "slot": 2,
            "value": 122
          },
          {
            "slot": 3,
            "value": 118
          },
          {
            "slot": 4,
            "value": 110
          },
          {
            "slot": 5,
            "value": 140
          },
          {
            "slot": 6,
            "value": 250
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
        "分卫球员全属性+20%",
        "分卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725344,
        "functionalTags": [
          "模板·空间/投射",
          "模板·突破/持球",
          "技能·体能/耐久（代理）",
          "技能·耐久/能量资源",
          "技能·空间/外线",
          "技能·自我增益"
        ],
        "roleSummary": "分卫·投射+突破型；技能偏向 耐久/能量资源/自我增益",
        "positionRank": {
          "rank": 6,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 195,
            "base_z": -0.174,
            "base_pct": 42.1,
            "growth_raw": 191,
            "growth_z": 0.565,
            "growth_pct": 73.7
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 230,
            "base_z": 1.302,
            "base_pct": 89.5,
            "growth_raw": 260,
            "growth_z": 1.852,
            "growth_pct": 94.7
          },
          "defense": {
            "label": "防守",
            "base_raw": 155.5,
            "base_z": -1.337,
            "base_pct": 14.5,
            "growth_raw": 114,
            "growth_z": -1.216,
            "growth_pct": 21.1
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 168,
            "base_z": -0.64,
            "base_pct": 27.6,
            "growth_raw": 140,
            "growth_z": -0.339,
            "growth_pct": 44.7
          },
          "drive": {
            "label": "突破",
            "base_raw": 198.4,
            "base_z": -0.213,
            "base_pct": 38.2,
            "growth_raw": 198.8,
            "growth_z": 0.498,
            "growth_pct": 59.2
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 157.6,
            "base_z": -1.444,
            "base_pct": 3.9,
            "growth_raw": 117.2,
            "growth_z": -1.347,
            "growth_pct": 6.6
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 51.24,
            "base_z": -1.108,
            "base_pct": 14.5,
            "growth_raw": 51.24,
            "growth_z": -1.108,
            "growth_pct": 14.5
          },
          "base_position_weighted": {
            "raw": -0.01,
            "pct": 25
          },
          "growth_position_weighted": {
            "raw": 0.494,
            "pct": 67.1
          },
          "panel_combined": {
            "raw": 41.84,
            "pct": 40.8,
            "rank": 23
          },
          "skill_value": {
            "raw": 4.1,
            "pct": 25,
            "rank": 29
          },
          "overall": {
            "raw": 37.63,
            "pct": 27.6,
            "rank": 28
          }
        },
        "attributeSum": 1093,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "分卫-T25",
          "name": "分卫·投射+突破型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": "T2",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 28,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "扭蛋流",
            "exampleTeam": [
              "先斗 月绮",
              "卧云 真昼",
              "羽濑川 湊",
              "近江 奏",
              "千圣·贝尔丝"
            ],
            "pickOrder": [
              "羽濑川 湊",
              "千圣·贝尔丝",
              "卧云 真昼"
            ],
            "notes": [
              "同名天赋「再买一个」：SSR 羽濑川 与 SR 春澄 永远 不能同时生效（725602），同队占两个位置不叠加收益。",
              "先检查额外购买、减价与直接增益是否齐全；卧云偏后期（725397）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1004",
      "contentId": 725345,
      "entryId": null,
      "name": "和泉 香织",
      "aliases": [],
      "title": "充能辅助",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "控卫",
      "style": "得分手",
      "school": "北空之丘女高",
      "heightCm": 164,
      "weightKg": 52,
      "spanCm": null,
      "tags": [],
      "roles": [
        "得分手"
      ],
      "stats": {
        "投射": 183,
        "攻筐": 180,
        "防投": 168,
        "护筐": 169,
        "传球": 247,
        "突破": 248
      },
      "potentials": [
        {
          "slot": 1,
          "value": 137
        },
        {
          "slot": 2,
          "value": 132
        },
        {
          "slot": 3,
          "value": 110
        },
        {
          "slot": 4,
          "value": 112
        },
        {
          "slot": 5,
          "value": 255
        },
        {
          "slot": 6,
          "value": 254
        }
      ],
      "skills": [
        {
          "name": "弧月突击",
          "type": "固定",
          "summary": "对方控卫获得弱化： 中幅降低防守威力(受和泉运控影响)（最多叠加2层），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "对方控卫获得弱化： 中幅降低防守威力(受和泉运控影响)（最多叠加2层），持续2分钟。",
              "energyCost": 80,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "月之潮汐",
          "type": "额外",
          "summary": "我方任意队友上篮时，有概率小幅提升 该队友 抗干扰能力（受和泉意识影响），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "我方任意队友上篮时，有概率小幅提升 该队友 抗干扰能力（受和泉意识影响），持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "styleDesc": "强烈的进攻欲望，承担了队伍中的大多的得分任务。",
      "positionDesc": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "source": "https://www.gamekee.com/lqsn/725345.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:08",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725345.png",
      "thumb": "assets/portraits/725345.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725345.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 183,
          "攻筐": 180,
          "防投": 168,
          "护筐": 169,
          "传球": 247,
          "突破": 248
        },
        "potentials": [
          {
            "slot": 1,
            "value": 137
          },
          {
            "slot": 2,
            "value": 132
          },
          {
            "slot": 3,
            "value": 110
          },
          {
            "slot": 4,
            "value": 112
          },
          {
            "slot": 5,
            "value": 255
          },
          {
            "slot": 6,
            "value": 254
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "控卫球员全属性+20%",
        "控卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725345,
        "functionalTags": [
          "模板·组织",
          "模板·突破/持球",
          "技能·防守",
          "技能·突破",
          "技能·专属机制",
          "技能·空间/外线",
          "技能·进攻",
          "技能·团队增益"
        ],
        "roleSummary": "控卫·传球+突破型；技能偏向 专属机制/团队增益",
        "positionRank": {
          "rank": 1,
          "total": 9
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 181.5,
            "base_z": -0.913,
            "base_pct": 14.5,
            "growth_raw": 134.5,
            "growth_z": -1.974,
            "growth_pct": 6.6
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 183,
            "base_z": -0.191,
            "base_pct": 50,
            "growth_raw": 137,
            "growth_z": -0.438,
            "growth_pct": 46.1
          },
          "defense": {
            "label": "防守",
            "base_raw": 168.5,
            "base_z": -0.75,
            "base_pct": 22.4,
            "growth_raw": 111,
            "growth_z": -1.309,
            "growth_pct": 6.6
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 247,
            "base_z": 2.097,
            "base_pct": 98.7,
            "growth_raw": 255,
            "growth_z": 1.891,
            "growth_pct": 94.7
          },
          "drive": {
            "label": "突破",
            "base_raw": 220.8,
            "base_z": 1.154,
            "base_pct": 92.1,
            "growth_raw": 205.2,
            "growth_z": 0.752,
            "growth_pct": 88.2
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 175.6,
            "base_z": -0.829,
            "base_pct": 27.6,
            "growth_raw": 124,
            "growth_z": -1.205,
            "growth_pct": 19.7
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 44.05,
            "base_z": -1.606,
            "base_pct": 3.9,
            "growth_raw": 44.05,
            "growth_z": -1.606,
            "growth_pct": 3.9
          },
          "base_position_weighted": {
            "raw": 0.463,
            "pct": 61.8
          },
          "growth_position_weighted": {
            "raw": 0.103,
            "pct": 22.4
          },
          "panel_combined": {
            "raw": 46.05,
            "pct": 46.1,
            "rank": 21
          },
          "skill_value": {
            "raw": 5.26,
            "pct": 46.1,
            "rank": 21
          },
          "overall": {
            "raw": 46.05,
            "pct": 43.4,
            "rank": 22
          }
        },
        "attributeSum": 1195,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "控卫-T03",
          "name": "控卫·传球+突破型",
          "shared": true,
          "sameTemplatePlayers": [
            "克拉丽丝·波洛(SR)",
            "森田 莉莉(R)"
          ]
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 22,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "小游戏流",
            "exampleTeam": [
              "和泉 香织",
              "林原 树里",
              "皆川 式",
              "稻叶 杏里",
              "远野 桐"
            ],
            "pickOrder": [
              "稻叶 杏里",
              "林原 树里",
              "远野 桐/和泉 香织"
            ],
            "notes": [
              "社区多认为偏早期开荒，但对强势期长度说法不一（3 天~1 周不等），不宜据此投入全部自选/钻石（725488）。",
              "皆川偏减价；林原、稻叶围绕小游戏增益；远野需带加成的小游戏选项（725396）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1005",
      "contentId": 725346,
      "entryId": null,
      "name": "亚理纱 贾斯敏",
      "aliases": [],
      "title": "内线杀器",
      "titleSource": "official",
      "rarity": "SR",
      "stars": null,
      "role": "中锋",
      "style": "得分手",
      "school": "北空之丘女高",
      "heightCm": 180,
      "weightKg": 75,
      "spanCm": null,
      "tags": [],
      "roles": [
        "得分手"
      ],
      "stats": {
        "投射": 150,
        "攻筐": 230,
        "防投": 162,
        "护筐": 216,
        "传球": 153,
        "突破": 182
      },
      "potentials": [
        {
          "slot": 1,
          "value": 100
        },
        {
          "slot": 2,
          "value": 260
        },
        {
          "slot": 3,
          "value": 130
        },
        {
          "slot": 4,
          "value": 233
        },
        {
          "slot": 5,
          "value": 110
        },
        {
          "slot": 6,
          "value": 167
        }
      ],
      "skills": [
        {
          "name": "强袭驱进",
          "type": "固定",
          "summary": "中幅提升下次抢夺进攻篮板的成功率。自身获得强化： 中幅提升进攻篮板能力(受亚理纱弹跳影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "中幅提升下次抢夺进攻篮板的成功率。自身获得强化： 中幅提升进攻篮板能力(受亚理纱弹跳影响)，持续2分钟。",
              "energyCost": 80,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "猛攻的心得",
          "type": "额外",
          "summary": "比赛结束前3分钟，自身速卡威力中幅提升(受亚里莎意识影响)。",
          "levels": [
            {
              "level": 1,
              "desc": "比赛结束前3分钟，自身速卡威力中幅提升(受亚里莎意识影响)。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "styleDesc": "强烈的进攻欲望，承担了队伍中的大多的得分任务。",
      "positionDesc": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "source": "https://www.gamekee.com/lqsn/725346.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:08",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725346.png",
      "thumb": "assets/portraits/725346.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725346.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 150,
          "攻筐": 230,
          "防投": 162,
          "护筐": 216,
          "传球": 153,
          "突破": 182
        },
        "potentials": [
          {
            "slot": 1,
            "value": 100
          },
          {
            "slot": 2,
            "value": 260
          },
          {
            "slot": 3,
            "value": 130
          },
          {
            "slot": 4,
            "value": 233
          },
          {
            "slot": 5,
            "value": 110
          },
          {
            "slot": 6,
            "value": 167
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "中锋球员全属性+20%",
        "中锋球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725346,
        "functionalTags": [
          "模板·内线终结",
          "模板·护筐/篮板",
          "技能·进攻",
          "技能·防守",
          "技能·篮板（代理）",
          "技能·突破",
          "技能·自我增益"
        ],
        "roleSummary": "中锋·攻筐+护筐型；技能偏向 自我增益",
        "positionRank": {
          "rank": 7,
          "total": 8
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 190,
            "base_z": -0.448,
            "base_pct": 31.6,
            "growth_raw": 180,
            "growth_z": 0.071,
            "growth_pct": 36.8
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 150,
            "base_z": -1.24,
            "base_pct": 6.6,
            "growth_raw": 100,
            "growth_z": -1.126,
            "growth_pct": 9.2
          },
          "defense": {
            "label": "防守",
            "base_raw": 189,
            "base_z": 0.177,
            "base_pct": 47.4,
            "growth_raw": 181.5,
            "growth_z": 0.884,
            "growth_pct": 76.3
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 153,
            "base_z": -1.16,
            "base_pct": 7.9,
            "growth_raw": 110,
            "growth_z": -0.921,
            "growth_pct": 10.5
          },
          "drive": {
            "label": "突破",
            "base_raw": 201.2,
            "base_z": -0.042,
            "base_pct": 44.7,
            "growth_raw": 204.2,
            "growth_z": 0.712,
            "growth_pct": 72.4
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 224.4,
            "base_z": 0.838,
            "base_pct": 81.6,
            "growth_raw": 249.2,
            "growth_z": 1.405,
            "growth_pct": 89.5
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 79.24,
            "base_z": 0.833,
            "base_pct": 71.1,
            "growth_raw": 79.24,
            "growth_z": 0.833,
            "growth_pct": 71.1
          },
          "base_position_weighted": {
            "raw": 0.174,
            "pct": 34.2
          },
          "growth_position_weighted": {
            "raw": 0.707,
            "pct": 89.5
          },
          "panel_combined": {
            "raw": 56.32,
            "pct": 57.9,
            "rank": 16
          },
          "skill_value": {
            "raw": 4,
            "pct": 21.1,
            "rank": 30
          },
          "overall": {
            "raw": 47.5,
            "pct": 46.1,
            "rank": 21
          }
        },
        "attributeSum": 1093,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "中锋-T01",
          "name": "中锋·攻筐+护筐型",
          "shared": true,
          "sameTemplatePlayers": [
            "绿川 步梦(SR)",
            "千圣·贝尔丝(SSR)",
            "榎本 纯那(SSR)"
          ]
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": "T2",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 21,
        "identicalAttrGroup": {
          "template_id": "中锋-T01",
          "rarity": "SR",
          "peers": [
            "绿川 步梦"
          ],
          "note": "同模板同稀有度 → 属性完全相同；差异仅在技能/流派天赋"
        },
        "streamRoles": [
          {
            "stream": "训练流",
            "exampleTeam": [
              "克拉丽丝·波洛",
              "闪堂电",
              "望月 透",
              "佐久间 雨乃",
              "亚理纱 贾斯敏"
            ],
            "pickOrder": [
              "望月 透",
              "藤松 玖怜",
              "佐久间 雨乃",
              "榎本 纯那",
              "真崎 辉世"
            ],
            "notes": [
              "社区自选顺序（725397）：望月、藤松（原文写作「腾松」）、佐久间，再到榎本或真崎；但开荒帖提醒望月依赖精力条件、佐久间前期更易发挥。",
              "本条为「同功能位替代」而非数值叠乘：望月/藤松/佐久间被同一作者放在训练流优先序列，属竞争位，不应同时按名单无脑三选三。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1006",
      "contentId": 725347,
      "entryId": null,
      "name": "洺瑶",
      "aliases": [],
      "title": "防守大闸",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "中锋",
      "style": "防守者",
      "school": "伊澄综合学园",
      "heightCm": 184,
      "weightKg": 81,
      "spanCm": null,
      "tags": [],
      "roles": [
        "防守者"
      ],
      "stats": {
        "投射": 161,
        "攻筐": 250,
        "防投": 228,
        "护筐": 185,
        "传球": 168,
        "突破": 199
      },
      "potentials": [
        {
          "slot": 1,
          "value": 100
        },
        {
          "slot": 2,
          "value": 260
        },
        {
          "slot": 3,
          "value": 220
        },
        {
          "slot": 4,
          "value": 143
        },
        {
          "slot": 5,
          "value": 110
        },
        {
          "slot": 6,
          "value": 167
        }
      ],
      "skills": [
        {
          "name": "绝望的城壁",
          "type": "固定",
          "summary": "大幅提升持球队友本次出手的命中率。中幅提升自身和持球队友的弹跳和投射属性（受洺瑶体能影响），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "大幅提升持球队友本次出手的命中率。中幅提升自身和持球队友的弹跳和投射属性（受洺瑶体能影响），持续2分钟。",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "避实击虚",
          "type": "额外",
          "summary": "挡拆成功后，大幅提升 洺瑶和持球队友的克制加深 (受洺瑶弹跳影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "挡拆成功后，大幅提升 洺瑶和持球队友的克制加深 (受洺瑶弹跳影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            },
            {
              "level": 2,
              "desc": "挡拆成功后，大幅提升 洺瑶和持球队友的克制加深 (受洺瑶弹跳影响)，持续3分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "styleDesc": "优越的防守意识，在防守上有独特的优势。",
      "positionDesc": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "source": "https://www.gamekee.com/lqsn/725347.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:08",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725347.png",
      "thumb": "assets/portraits/725347.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725347.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 161,
          "攻筐": 250,
          "防投": 228,
          "护筐": 185,
          "传球": 168,
          "突破": 199
        },
        "potentials": [
          {
            "slot": 1,
            "value": 100
          },
          {
            "slot": 2,
            "value": 260
          },
          {
            "slot": 3,
            "value": 220
          },
          {
            "slot": 4,
            "value": 143
          },
          {
            "slot": 5,
            "value": 110
          },
          {
            "slot": 6,
            "value": 167
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "中锋球员全属性+20%",
        "中锋球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725347,
        "functionalTags": [
          "模板·内线终结",
          "模板·外线防守",
          "技能·空间/外线",
          "技能·突破",
          "技能·团队增益"
        ],
        "roleSummary": "中锋·攻筐+防投型；技能偏向 团队增益",
        "positionRank": {
          "rank": 2,
          "total": 8
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 205.5,
            "base_z": 0.4,
            "base_pct": 55.3,
            "growth_raw": 180,
            "growth_z": 0.071,
            "growth_pct": 36.8
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 161,
            "base_z": -0.89,
            "base_pct": 21.1,
            "growth_raw": 100,
            "growth_z": -1.126,
            "growth_pct": 9.2
          },
          "defense": {
            "label": "防守",
            "base_raw": 206.5,
            "base_z": 0.967,
            "base_pct": 76.3,
            "growth_raw": 181.5,
            "growth_z": 0.884,
            "growth_pct": 76.3
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 168,
            "base_z": -0.64,
            "base_pct": 27.6,
            "growth_raw": 110,
            "growth_z": -0.921,
            "growth_pct": 10.5
          },
          "drive": {
            "label": "突破",
            "base_raw": 219.4,
            "base_z": 1.069,
            "base_pct": 78.9,
            "growth_raw": 204.2,
            "growth_z": 0.712,
            "growth_pct": 72.4
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 224,
            "base_z": 0.825,
            "base_pct": 76.3,
            "growth_raw": 213.2,
            "growth_z": 0.654,
            "growth_pct": 72.4
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 79.72,
            "base_z": 0.867,
            "base_pct": 80.3,
            "growth_raw": 79.72,
            "growth_z": 0.867,
            "growth_pct": 80.3
          },
          "base_position_weighted": {
            "raw": 0.704,
            "pct": 78.9
          },
          "growth_position_weighted": {
            "raw": 0.523,
            "pct": 72.4
          },
          "panel_combined": {
            "raw": 76.32,
            "pct": 81.6,
            "rank": 7
          },
          "skill_value": {
            "raw": 22.25,
            "pct": 98.7,
            "rank": 1
          },
          "overall": {
            "raw": 81.91,
            "pct": 93.4,
            "rank": 3
          }
        },
        "attributeSum": 1191,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "中锋-T02",
          "name": "中锋·攻筐+防投型",
          "shared": true,
          "sameTemplatePlayers": [
            "五十岚 诗音(R)",
            "希雅·奥黛拉(SSR)"
          ]
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": "T2",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": "T0",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 3,
        "identicalAttrGroup": {
          "template_id": "中锋-T02",
          "rarity": "SSR",
          "peers": [
            "希雅·奥黛拉"
          ],
          "note": "同模板同稀有度 → 属性完全相同；差异仅在技能/流派天赋"
        },
        "streamRoles": [
          {
            "stream": "商店流",
            "exampleTeam": [
              "名雪 纱夜",
              "羽田 朱志香",
              "降旗 千红纱",
              "早濑 千秋",
              "洺瑶"
            ],
            "pickOrder": [
              "羽田 朱志香",
              "名雪 纱夜/降旗 千红纱",
              "洺瑶"
            ],
            "notes": [
              "同名天赋「道具升级」：SSR 羽田 与 SR 清水 万里 不能同时生效（725602）。",
              "功能性差异：名雪偏减价、羽田偏品质、早濑偏商品数量（725396）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1007",
      "contentId": 725348,
      "entryId": null,
      "name": "闪堂电",
      "aliases": [],
      "title": "突破达人",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "分卫",
      "style": "得分手",
      "school": "北空之丘女高",
      "heightCm": 165,
      "weightKg": 58,
      "spanCm": null,
      "tags": [],
      "roles": [
        "得分手"
      ],
      "stats": {
        "投射": 201,
        "攻筐": 224,
        "防投": 172,
        "护筐": 167,
        "传球": 233,
        "突破": 196
      },
      "potentials": [
        {
          "slot": 1,
          "value": 170
        },
        {
          "slot": 2,
          "value": 212
        },
        {
          "slot": 3,
          "value": 118
        },
        {
          "slot": 4,
          "value": 110
        },
        {
          "slot": 5,
          "value": 230
        },
        {
          "slot": 6,
          "value": 160
        }
      ],
      "skills": [
        {
          "name": "闪电突袭",
          "type": "固定",
          "summary": "自身获得强化：中幅提升内线命中率（闪堂电进攻威力比对位防守威力高出越多，命中率额外提升越多），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "自身获得强化：中幅提升内线命中率（闪堂电进攻威力比对位防守威力高出越多，命中率额外提升越多），持续2分钟。",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "雷鸣领域",
          "type": "额外",
          "summary": "闪堂电每3分钟获得一张一次性的专属突破卡【瞬雷】：威力＝运控×100%＋弹跳×20%。",
          "levels": [
            {
              "level": 1,
              "desc": "闪堂电每3分钟获得一张一次性的专属突破卡【瞬雷】：威力＝运控×100%＋弹跳×20%。",
              "energyCost": 0,
              "ptCost": 0
            },
            {
              "level": 2,
              "desc": "闪堂电每3分钟获得一张一次性的专属突破卡【瞬雷】：威力＝运控×100%＋弹跳×20%。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "得分后卫通常拥有很强的投射能力，在外线为队伍贡献得分",
      "styleDesc": "强烈的进攻欲望，承担了队伍中的大多的得分任务。",
      "positionDesc": "得分后卫通常拥有很强的投射能力，在外线为队伍贡献得分",
      "source": "https://www.gamekee.com/lqsn/725348.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:08",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725348.png",
      "thumb": "assets/portraits/725348.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725348.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 201,
          "攻筐": 224,
          "防投": 172,
          "护筐": 167,
          "传球": 233,
          "突破": 196
        },
        "potentials": [
          {
            "slot": 1,
            "value": 170
          },
          {
            "slot": 2,
            "value": 212
          },
          {
            "slot": 3,
            "value": 118
          },
          {
            "slot": 4,
            "value": 110
          },
          {
            "slot": 5,
            "value": 230
          },
          {
            "slot": 6,
            "value": 160
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
        "分卫球员全属性+20%",
        "分卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725348,
        "functionalTags": [
          "模板·组织",
          "模板·内线终结",
          "技能·空间/外线",
          "技能·进攻",
          "技能·防守",
          "技能·自我增益",
          "技能·突破",
          "技能·专属机制"
        ],
        "roleSummary": "分卫·传球+攻筐型；技能偏向 自我增益/专属机制",
        "positionRank": {
          "rank": 5,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 212.5,
            "base_z": 0.784,
            "base_pct": 82.9,
            "growth_raw": 191,
            "growth_z": 0.565,
            "growth_pct": 73.7
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 201,
            "base_z": 0.38,
            "base_pct": 61.8,
            "growth_raw": 170,
            "growth_z": 0.177,
            "growth_pct": 60.5
          },
          "defense": {
            "label": "防守",
            "base_raw": 169.5,
            "base_z": -0.704,
            "base_pct": 28.9,
            "growth_raw": 114,
            "growth_z": -1.216,
            "growth_pct": 21.1
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 233,
            "base_z": 1.612,
            "base_pct": 85.5,
            "growth_raw": 230,
            "growth_z": 1.406,
            "growth_pct": 81.6
          },
          "drive": {
            "label": "突破",
            "base_raw": 207.2,
            "base_z": 0.324,
            "base_pct": 61.8,
            "growth_raw": 180.8,
            "growth_z": -0.215,
            "growth_pct": 43.4
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 201.2,
            "base_z": 0.045,
            "base_pct": 51.3,
            "growth_raw": 171.2,
            "growth_z": -0.221,
            "growth_pct": 47.4
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 54.04,
            "base_z": -0.914,
            "base_pct": 27.6,
            "growth_raw": 54.04,
            "growth_z": -0.914,
            "growth_pct": 27.6
          },
          "base_position_weighted": {
            "raw": 0.406,
            "pct": 53.9
          },
          "growth_position_weighted": {
            "raw": 0.124,
            "pct": 30.3
          },
          "panel_combined": {
            "raw": 44.47,
            "pct": 43.4,
            "rank": 22
          },
          "skill_value": {
            "raw": 4.16,
            "pct": 30.3,
            "rank": 27
          },
          "overall": {
            "raw": 40.92,
            "pct": 40.8,
            "rank": 23
          }
        },
        "attributeSum": 1193,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "分卫-T17",
          "name": "分卫·传球+攻筐型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [],
        "trainingTalents": [
          {
            "talent": "公测被增强（不再是一般 UP）；训练流最后一块拼图；2 星质变（社区节点）",
            "category": "版本强度/升星节点",
            "note": "",
            "confidence": "多源一致",
            "source": "https://www.taptap.cn/moment/861959872722241133"
          }
        ],
        "communityTrainingTier": {
          "tier": "T0",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": "T0",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 23,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "训练流",
            "exampleTeam": [
              "克拉丽丝·波洛",
              "闪堂电",
              "望月 透",
              "佐久间 雨乃",
              "亚理纱 贾斯敏"
            ],
            "pickOrder": [
              "望月 透",
              "藤松 玖怜",
              "佐久间 雨乃",
              "榎本 纯那",
              "真崎 辉世"
            ],
            "notes": [
              "社区自选顺序（725397）：望月、藤松（原文写作「腾松」）、佐久间，再到榎本或真崎；但开荒帖提醒望月依赖精力条件、佐久间前期更易发挥。",
              "本条为「同功能位替代」而非数值叠乘：望月/藤松/佐久间被同一作者放在训练流优先序列，属竞争位，不应同时按名单无脑三选三。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1009",
      "contentId": 725349,
      "entryId": null,
      "name": "克拉丽丝·波洛",
      "aliases": [],
      "title": "外线辅助",
      "titleSource": "official",
      "rarity": "SR",
      "stars": null,
      "role": "控卫",
      "style": "组织者",
      "school": "伊澄综合学园",
      "heightCm": 163,
      "weightKg": 61,
      "spanCm": null,
      "tags": [],
      "roles": [
        "组织者"
      ],
      "stats": {
        "投射": 168,
        "攻筐": 165,
        "防投": 154,
        "护筐": 155,
        "传球": 225,
        "突破": 226
      },
      "potentials": [
        {
          "slot": 1,
          "value": 137
        },
        {
          "slot": 2,
          "value": 132
        },
        {
          "slot": 3,
          "value": 110
        },
        {
          "slot": 4,
          "value": 112
        },
        {
          "slot": 5,
          "value": 255
        },
        {
          "slot": 6,
          "value": 254
        }
      ],
      "skills": [
        {
          "name": "快速装填",
          "type": "固定",
          "summary": "传球给我方耐力最低的球员，中幅回复其耐力(受克拉丽丝意识影响)，随后回复效果随机弹射至其他队友 1 次，每次衰减 50%。",
          "levels": [
            {
              "level": 1,
              "desc": "传球给我方耐力最低的球员，中幅回复其耐力(受克拉丽丝意识影响)，随后回复效果随机弹射至其他队友 1 次，每次衰减 50%。",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "见缝插针",
          "type": "额外",
          "summary": "传球成功时，小幅提升 接球者的 投射属性(受克拉丽丝意识影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "传球成功时，小幅提升 接球者的 投射属性(受克拉丽丝意识影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            },
            {
              "level": 2,
              "desc": "传球成功时，小幅提升 接球者的 投射属性(受克拉丽丝意识影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "styleDesc": "球场指挥官，能让队伍完美执行战术，提升得分效率。",
      "positionDesc": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "source": "https://www.gamekee.com/lqsn/725349.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:08",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725349.png",
      "thumb": "assets/portraits/725349.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725349.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 168,
          "攻筐": 165,
          "防投": 154,
          "护筐": 155,
          "传球": 225,
          "突破": 226
        },
        "potentials": [
          {
            "slot": 1,
            "value": 137
          },
          {
            "slot": 2,
            "value": 132
          },
          {
            "slot": 3,
            "value": 110
          },
          {
            "slot": 4,
            "value": 112
          },
          {
            "slot": 5,
            "value": 255
          },
          {
            "slot": 6,
            "value": 254
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "控卫球员全属性+20%",
        "控卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725349,
        "functionalTags": [
          "模板·组织",
          "模板·突破/持球",
          "技能·组织",
          "技能·体能/耐久（代理）",
          "技能·耐久/能量资源",
          "技能·空间/外线",
          "技能·团队增益"
        ],
        "roleSummary": "控卫·传球+突破型；技能偏向 耐久/能量资源/团队增益",
        "positionRank": {
          "rank": 6,
          "total": 9
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 166.5,
            "base_z": -1.734,
            "base_pct": 6.6,
            "growth_raw": 134.5,
            "growth_z": -1.974,
            "growth_pct": 6.6
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 168,
            "base_z": -0.668,
            "base_pct": 39.5,
            "growth_raw": 137,
            "growth_z": -0.438,
            "growth_pct": 46.1
          },
          "defense": {
            "label": "防守",
            "base_raw": 154.5,
            "base_z": -1.382,
            "base_pct": 7.9,
            "growth_raw": 111,
            "growth_z": -1.309,
            "growth_pct": 6.6
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 225,
            "base_z": 1.335,
            "base_pct": 82.9,
            "growth_raw": 255,
            "growth_z": 1.891,
            "growth_pct": 94.7
          },
          "drive": {
            "label": "突破",
            "base_raw": 201.6,
            "base_z": -0.018,
            "base_pct": 48.7,
            "growth_raw": 205.2,
            "growth_z": 0.752,
            "growth_pct": 88.2
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 161,
            "base_z": -1.328,
            "base_pct": 6.6,
            "growth_raw": 124,
            "growth_z": -1.205,
            "growth_pct": 19.7
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 44.05,
            "base_z": -1.606,
            "base_pct": 3.9,
            "growth_raw": 44.05,
            "growth_z": -1.606,
            "growth_pct": 3.9
          },
          "base_position_weighted": {
            "raw": -0.242,
            "pct": 17.1
          },
          "growth_position_weighted": {
            "raw": 0.103,
            "pct": 22.4
          },
          "panel_combined": {
            "raw": 19.21,
            "pct": 6.6,
            "rank": 36
          },
          "skill_value": {
            "raw": 10.27,
            "pct": 80.3,
            "rank": 8
          },
          "overall": {
            "raw": 34.47,
            "pct": 22.4,
            "rank": 30
          }
        },
        "attributeSum": 1093,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "控卫-T03",
          "name": "控卫·传球+突破型",
          "shared": true,
          "sameTemplatePlayers": [
            "和泉 香织(SSR)",
            "森田 莉莉(R)"
          ]
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": "T2",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 30,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "训练流",
            "exampleTeam": [
              "克拉丽丝·波洛",
              "闪堂电",
              "望月 透",
              "佐久间 雨乃",
              "亚理纱 贾斯敏"
            ],
            "pickOrder": [
              "望月 透",
              "藤松 玖怜",
              "佐久间 雨乃",
              "榎本 纯那",
              "真崎 辉世"
            ],
            "notes": [
              "社区自选顺序（725397）：望月、藤松（原文写作「腾松」）、佐久间，再到榎本或真崎；但开荒帖提醒望月依赖精力条件、佐久间前期更易发挥。",
              "本条为「同功能位替代」而非数值叠乘：望月/藤松/佐久间被同一作者放在训练流优先序列，属竞争位，不应同时按名单无脑三选三。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1010",
      "contentId": 725350,
      "entryId": null,
      "name": "早濑 千秋",
      "aliases": [],
      "title": "内线大闸",
      "titleSource": "official",
      "rarity": "SR",
      "stars": null,
      "role": "大前",
      "style": "防守者",
      "school": "伊澄综合学园",
      "heightCm": 167,
      "weightKg": 60,
      "spanCm": null,
      "tags": [],
      "roles": [
        "防守者"
      ],
      "stats": {
        "投射": 154,
        "攻筐": 227,
        "防投": 211,
        "护筐": 184,
        "传球": 155,
        "突破": 160
      },
      "potentials": [
        {
          "slot": 1,
          "value": 109
        },
        {
          "slot": 2,
          "value": 257
        },
        {
          "slot": 3,
          "value": 225
        },
        {
          "slot": 4,
          "value": 171
        },
        {
          "slot": 5,
          "value": 115
        },
        {
          "slot": 6,
          "value": 123
        }
      ],
      "skills": [
        {
          "name": "铁壁护卫",
          "type": "固定",
          "summary": "中幅提升下次抢夺防守篮板的成功率。自身获得强化： 中幅提升防守篮板能力(受早濑弹跳影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "中幅提升下次抢夺防守篮板的成功率。自身获得强化： 中幅提升防守篮板能力(受早濑弹跳影响)，持续2分钟。",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "坚守阵地",
          "type": "额外",
          "summary": "我方任意球员造成干扰时，中幅提升早濑千秋的防守篮板能力(受早濑防守影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "我方任意球员造成干扰时，中幅提升早濑千秋的防守篮板能力(受早濑防守影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "大前锋往往体格强壮，能在篮下发起强硬攻击且冲抢篮板",
      "styleDesc": "优越的防守意识，在防守上有独特的优势。",
      "positionDesc": "大前锋往往体格强壮，能在篮下发起强硬攻击且冲抢篮板",
      "source": "https://www.gamekee.com/lqsn/725350.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:08",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725350.png",
      "thumb": "assets/portraits/725350.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725350.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 154,
          "攻筐": 227,
          "防投": 211,
          "护筐": 184,
          "传球": 155,
          "突破": 160
        },
        "potentials": [
          {
            "slot": 1,
            "value": 109
          },
          {
            "slot": 2,
            "value": 257
          },
          {
            "slot": 3,
            "value": 225
          },
          {
            "slot": 4,
            "value": 171
          },
          {
            "slot": 5,
            "value": 115
          },
          {
            "slot": 6,
            "value": 123
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "大前球员全属性+20%",
        "大前球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725350,
        "functionalTags": [
          "模板·内线终结",
          "模板·外线防守",
          "技能·防守",
          "技能·篮板（代理）",
          "技能·突破",
          "技能·自我增益",
          "技能·团队增益"
        ],
        "roleSummary": "大前·攻筐+防投型；技能偏向 自我增益/团队增益",
        "positionRank": {
          "rank": 6,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 190.5,
            "base_z": -0.421,
            "base_pct": 36.8,
            "growth_raw": 183,
            "growth_z": 0.206,
            "growth_pct": 56.6
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 154,
            "base_z": -1.113,
            "base_pct": 13.2,
            "growth_raw": 109,
            "growth_z": -0.959,
            "growth_pct": 23.7
          },
          "defense": {
            "label": "防守",
            "base_raw": 197.5,
            "base_z": 0.561,
            "base_pct": 65.8,
            "growth_raw": 198,
            "growth_z": 1.397,
            "growth_pct": 93.4
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 155,
            "base_z": -1.091,
            "base_pct": 13.2,
            "growth_raw": 115,
            "growth_z": -0.824,
            "growth_pct": 30.3
          },
          "drive": {
            "label": "突破",
            "base_raw": 186.8,
            "base_z": -0.921,
            "base_pct": 28.9,
            "growth_raw": 176.6,
            "growth_z": -0.381,
            "growth_pct": 26.3
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 209.8,
            "base_z": 0.339,
            "base_pct": 59.2,
            "growth_raw": 222.6,
            "growth_z": 0.85,
            "growth_pct": 78.9
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 88.34,
            "base_z": 1.464,
            "base_pct": 94.7,
            "growth_raw": 88.34,
            "growth_z": 1.464,
            "growth_pct": 94.7
          },
          "base_position_weighted": {
            "raw": 0.029,
            "pct": 27.6
          },
          "growth_position_weighted": {
            "raw": 0.591,
            "pct": 78.9
          },
          "panel_combined": {
            "raw": 48.16,
            "pct": 51.3,
            "rank": 19
          },
          "skill_value": {
            "raw": 8.9,
            "pct": 63.2,
            "rank": 14
          },
          "overall": {
            "raw": 51.91,
            "pct": 53.9,
            "rank": 18
          }
        },
        "attributeSum": 1091,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "大前-T05",
          "name": "大前·攻筐+防投型",
          "shared": true,
          "sameTemplatePlayers": [
            "稻叶 杏里(SSR)"
          ]
        },
        "knownStreamTalents": [
          {
            "talent": "增加商品数量向",
            "category": "",
            "note": "羽的商店流示例，「早濑偏增加商品数量」",
            "confidence": "待验证",
            "source": 725396
          }
        ],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": "T1",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 18,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "商店流",
            "exampleTeam": [
              "名雪 纱夜",
              "羽田 朱志香",
              "降旗 千红纱",
              "早濑 千秋",
              "洺瑶"
            ],
            "pickOrder": [
              "羽田 朱志香",
              "名雪 纱夜/降旗 千红纱",
              "洺瑶"
            ],
            "notes": [
              "同名天赋「道具升级」：SSR 羽田 与 SR 清水 万里 不能同时生效（725602）。",
              "功能性差异：名雪偏减价、羽田偏品质、早濑偏商品数量（725396）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1011",
      "contentId": 725351,
      "entryId": null,
      "name": "羽田 朱志香",
      "aliases": [],
      "title": "三分达人",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "分卫",
      "style": "组织者",
      "school": "伊澄综合学园",
      "heightCm": 165,
      "weightKg": 54,
      "spanCm": null,
      "tags": [],
      "roles": [
        "组织者"
      ],
      "stats": {
        "投射": 249,
        "攻筐": 174,
        "防投": 172,
        "护筐": 167,
        "传球": 234,
        "突破": 195
      },
      "potentials": [
        {
          "slot": 1,
          "value": 260
        },
        {
          "slot": 2,
          "value": 122
        },
        {
          "slot": 3,
          "value": 118
        },
        {
          "slot": 4,
          "value": 110
        },
        {
          "slot": 5,
          "value": 230
        },
        {
          "slot": 6,
          "value": 160
        }
      ],
      "skills": [
        {
          "name": "终焉后撤步",
          "type": "固定",
          "summary": "自身获得强化：小幅提升三分命中率（空位出手时，提升为中幅），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "自身获得强化：小幅提升三分命中率（空位出手时，提升为中幅），持续2分钟。",
              "energyCost": 120,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "红莲爆炎阵",
          "type": "额外",
          "summary": "中幅提升 自身 后撤步和横撤步威力（受羽田投射影响）",
          "levels": [
            {
              "level": 1,
              "desc": "中幅提升 自身 后撤步和横撤步威力（受羽田投射影响）",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "得分后卫通常拥有很强的投射能力，在外线为队伍贡献得分",
      "styleDesc": "球场指挥官，能让队伍完美执行战术，提升得分效率。",
      "positionDesc": "得分后卫通常拥有很强的投射能力，在外线为队伍贡献得分",
      "source": "https://www.gamekee.com/lqsn/725351.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:08",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725351.png",
      "thumb": "assets/portraits/725351.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725351.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 249,
          "攻筐": 174,
          "防投": 172,
          "护筐": 167,
          "传球": 234,
          "突破": 195
        },
        "potentials": [
          {
            "slot": 1,
            "value": 260
          },
          {
            "slot": 2,
            "value": 122
          },
          {
            "slot": 3,
            "value": 118
          },
          {
            "slot": 4,
            "value": 110
          },
          {
            "slot": 5,
            "value": 230
          },
          {
            "slot": 6,
            "value": 160
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
        "分卫球员全属性+20%",
        "分卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725351,
        "functionalTags": [
          "模板·空间/投射",
          "模板·组织",
          "技能·空间/外线",
          "技能·自我增益"
        ],
        "roleSummary": "分卫·投射+传球型；技能偏向 自我增益",
        "positionRank": {
          "rank": 3,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 211.5,
            "base_z": 0.729,
            "base_pct": 78.9,
            "growth_raw": 191,
            "growth_z": 0.565,
            "growth_pct": 73.7
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 249,
            "base_z": 1.905,
            "base_pct": 97.4,
            "growth_raw": 260,
            "growth_z": 1.852,
            "growth_pct": 94.7
          },
          "defense": {
            "label": "防守",
            "base_raw": 169.5,
            "base_z": -0.704,
            "base_pct": 28.9,
            "growth_raw": 114,
            "growth_z": -1.216,
            "growth_pct": 21.1
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 234,
            "base_z": 1.647,
            "base_pct": 90.8,
            "growth_raw": 230,
            "growth_z": 1.406,
            "growth_pct": 81.6
          },
          "drive": {
            "label": "突破",
            "base_raw": 186.6,
            "base_z": -0.934,
            "base_pct": 23.7,
            "growth_raw": 144.8,
            "growth_z": -1.641,
            "growth_pct": 11.8
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 171.2,
            "base_z": -0.98,
            "base_pct": 18.4,
            "growth_raw": 117.2,
            "growth_z": -1.347,
            "growth_pct": 6.6
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 51.97,
            "base_z": -1.057,
            "base_pct": 18.4,
            "growth_raw": 51.97,
            "growth_z": -1.057,
            "growth_pct": 18.4
          },
          "base_position_weighted": {
            "raw": 0.606,
            "pct": 68.4
          },
          "growth_position_weighted": {
            "raw": 0.35,
            "pct": 55.3
          },
          "panel_combined": {
            "raw": 63.16,
            "pct": 68.4,
            "rank": 12
          },
          "skill_value": {
            "raw": 4,
            "pct": 21.1,
            "rank": 31
          },
          "overall": {
            "raw": 52.63,
            "pct": 56.6,
            "rank": 17
          }
        },
        "attributeSum": 1191,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "分卫-T08",
          "name": "分卫·投射+传球型",
          "shared": true,
          "sameTemplatePlayers": [
            "卧云 真昼(SSR)"
          ]
        },
        "knownStreamTalents": [
          {
            "talent": "道具升级（商品品质）",
            "category": "",
            "note": "SSR 版；与 SR 清水同名天赋不叠加",
            "confidence": "待验证",
            "source": 725602
          }
        ],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": "T0",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": "T1",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 17,
        "identicalAttrGroup": {
          "template_id": "分卫-T08",
          "rarity": "SSR",
          "peers": [
            "卧云 真昼"
          ],
          "note": "同模板同稀有度 → 属性完全相同；差异仅在技能/流派天赋"
        },
        "streamRoles": [
          {
            "stream": "商店流",
            "exampleTeam": [
              "名雪 纱夜",
              "羽田 朱志香",
              "降旗 千红纱",
              "早濑 千秋",
              "洺瑶"
            ],
            "pickOrder": [
              "羽田 朱志香",
              "名雪 纱夜/降旗 千红纱",
              "洺瑶"
            ],
            "notes": [
              "同名天赋「道具升级」：SSR 羽田 与 SR 清水 万里 不能同时生效（725602）。",
              "功能性差异：名雪偏减价、羽田偏品质、早濑偏商品数量（725396）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1012",
      "contentId": 725352,
      "entryId": null,
      "name": "望月 透",
      "aliases": [],
      "title": "后期大核",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "小前",
      "style": "得分手",
      "school": "伊澄综合学园",
      "heightCm": 174,
      "weightKg": 69,
      "spanCm": null,
      "tags": [],
      "roles": [
        "得分手"
      ],
      "stats": {
        "投射": 227,
        "攻筐": 202,
        "防投": 168,
        "护筐": 183,
        "传球": 239,
        "突破": 176
      },
      "potentials": [
        {
          "slot": 1,
          "value": 220
        },
        {
          "slot": 2,
          "value": 170
        },
        {
          "slot": 3,
          "value": 108
        },
        {
          "slot": 4,
          "value": 139
        },
        {
          "slot": 5,
          "value": 240
        },
        {
          "slot": 6,
          "value": 123
        }
      ],
      "skills": [
        {
          "name": "望月时刻",
          "type": "固定",
          "summary": "自身获得强化：得分后，中幅提升下次进攻行为卡威力（受望月投射影响），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "自身获得强化：得分后，中幅提升下次进攻行为卡威力（受望月投射影响），持续2分钟。",
              "energyCost": 80,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "明镜止水",
          "type": "额外",
          "summary": "比赛结束前5分钟，获得强化：比赛越接近结束，实力越强",
          "levels": [
            {
              "level": 1,
              "desc": "比赛结束前5分钟，获得强化：比赛越接近结束，实力越强",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "小前锋是游戏中重要的得分者，擅长多样化的得分手段",
      "styleDesc": "强烈的进攻欲望，承担了队伍中的大多的得分任务。",
      "positionDesc": "小前锋是游戏中重要的得分者，擅长多样化的得分手段",
      "source": "https://www.gamekee.com/lqsn/725352.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:08",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725352.png",
      "thumb": "assets/portraits/725352.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725352.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 227,
          "攻筐": 202,
          "防投": 168,
          "护筐": 183,
          "传球": 239,
          "突破": 176
        },
        "potentials": [
          {
            "slot": 1,
            "value": 220
          },
          {
            "slot": 2,
            "value": 170
          },
          {
            "slot": 3,
            "value": 108
          },
          {
            "slot": 4,
            "value": 139
          },
          {
            "slot": 5,
            "value": 240
          },
          {
            "slot": 6,
            "value": 123
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
        "小前球员全属性+20%",
        "小前球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725352,
        "functionalTags": [
          "模板·组织",
          "模板·空间/投射",
          "技能·空间/外线",
          "技能·进攻",
          "技能·自我增益"
        ],
        "roleSummary": "小前·传球+投射型；技能偏向 自我增益",
        "positionRank": {
          "rank": 6,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 214.5,
            "base_z": 0.893,
            "base_pct": 88.2,
            "growth_raw": 195,
            "growth_z": 0.745,
            "growth_pct": 89.5
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 227,
            "base_z": 1.206,
            "base_pct": 82.9,
            "growth_raw": 220,
            "growth_z": 1.108,
            "growth_pct": 81.6
          },
          "defense": {
            "label": "防守",
            "base_raw": 175.5,
            "base_z": -0.433,
            "base_pct": 36.8,
            "growth_raw": 123.5,
            "growth_z": -0.92,
            "growth_pct": 32.9
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 239,
            "base_z": 1.82,
            "base_pct": 96.1,
            "growth_raw": 240,
            "growth_z": 1.6,
            "growth_pct": 88.2
          },
          "drive": {
            "label": "突破",
            "base_raw": 186.4,
            "base_z": -0.946,
            "base_pct": 18.4,
            "growth_raw": 141.8,
            "growth_z": -1.76,
            "growth_pct": 5.3
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 194.4,
            "base_z": -0.187,
            "base_pct": 42.1,
            "growth_raw": 157.6,
            "growth_z": -0.505,
            "growth_pct": 32.9
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 59.26,
            "base_z": -0.552,
            "base_pct": 32.9,
            "growth_raw": 59.26,
            "growth_z": -0.552,
            "growth_pct": 32.9
          },
          "base_position_weighted": {
            "raw": 0.286,
            "pct": 48.7
          },
          "growth_position_weighted": {
            "raw": -0.056,
            "pct": 9.2
          },
          "panel_combined": {
            "raw": 32.89,
            "pct": 28.9,
            "rank": 27
          },
          "skill_value": {
            "raw": 3.5,
            "pct": 14.5,
            "rank": 33
          },
          "overall": {
            "raw": 28.29,
            "pct": 14.5,
            "rank": 33
          }
        },
        "attributeSum": 1195,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "小前-T21",
          "name": "小前·传球+投射型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [
          {
            "talent": "训练流长期组件（社区称）",
            "category": "",
            "note": "依赖精力条件；羽列为训练流自选优先位",
            "confidence": "待验证",
            "source": 725397
          }
        ],
        "trainingTalents": [
          {
            "talent": "表情爆发每个表情 bonus +8%（与龙宫寺 +4% 同乘区，互相稀释）；训练流长期组件但依赖精力条件（精力上限 ≥120、单次休息恢复 ≥70 的建议为社区经验）",
            "category": "表情（训练爆发）",
            "note": "",
            "confidence": "实测（内测）",
            "source": "https://www.taptap.cn/moment/805700735671995246"
          }
        ],
        "communityTrainingTier": {
          "tier": "T2",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 33,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "训练流",
            "exampleTeam": [
              "克拉丽丝·波洛",
              "闪堂电",
              "望月 透",
              "佐久间 雨乃",
              "亚理纱 贾斯敏"
            ],
            "pickOrder": [
              "望月 透",
              "藤松 玖怜",
              "佐久间 雨乃",
              "榎本 纯那",
              "真崎 辉世"
            ],
            "notes": [
              "社区自选顺序（725397）：望月、藤松（原文写作「腾松」）、佐久间，再到榎本或真崎；但开荒帖提醒望月依赖精力条件、佐久间前期更易发挥。",
              "本条为「同功能位替代」而非数值叠乘：望月/藤松/佐久间被同一作者放在训练流优先序列，属竞争位，不应同时按名单无脑三选三。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1013",
      "contentId": 725354,
      "entryId": null,
      "name": "百目鬼 剑",
      "aliases": [],
      "title": "中投达人",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "小前",
      "style": "组织者",
      "school": "樱海高校",
      "heightCm": 178,
      "weightKg": 63,
      "spanCm": 189,
      "tags": [],
      "roles": [
        "组织者"
      ],
      "stats": {
        "投射": 227,
        "攻筐": 250,
        "防投": 168,
        "护筐": 183,
        "传球": 189,
        "突破": 176
      },
      "potentials": [
        {
          "slot": 1,
          "value": 220
        },
        {
          "slot": 2,
          "value": 260
        },
        {
          "slot": 3,
          "value": 108
        },
        {
          "slot": 4,
          "value": 139
        },
        {
          "slot": 5,
          "value": 150
        },
        {
          "slot": 6,
          "value": 123
        }
      ],
      "skills": [
        {
          "name": "死神降临",
          "type": "固定",
          "summary": "自身获得强化：中幅提升投篮抗干扰能力；得分时，小幅降低对位防守人防守属性，最多叠加2次，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "自身获得强化：中幅提升投篮抗干扰能力；得分时，小幅降低对位防守人防守属性，最多叠加2次，持续2分钟。",
              "energyCost": 80,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "无情终结者",
          "type": "额外",
          "summary": "中投命中后，小幅吸取对位球员耐力(受百目鬼弹跳影响)。(最多触发3次)",
          "levels": [
            {
              "level": 1,
              "desc": "中投命中后，小幅吸取对位球员耐力(受百目鬼弹跳影响)。(最多触发3次)",
              "energyCost": 0,
              "ptCost": 0
            },
            {
              "level": 2,
              "desc": "中投命中后，小幅吸取对位球员耐力(受百目鬼弹跳影响)。(最多触发5次)",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "小前锋是游戏中重要的得分者，擅长多样化的得分手段",
      "styleDesc": "球场指挥官，能让队伍完美执行战术，提升得分效率。",
      "positionDesc": "小前锋是游戏中重要的得分者，擅长多样化的得分手段",
      "source": "https://www.gamekee.com/lqsn/725354.html",
      "bodySource": "客户端 res20 initactor.sw 角色卡 rec=7862（身高178/体重63/臂展189）；wiki 181/75 有误，以客户端为准",
      "attributesSource": "客户端 res20 initactor.sw「角色等级表」initactor_id=1013 level=120 property_tbl（187/210/128/143/149/136）+ 展示加成 40/项 = A层满级 227/250/168/183/189/176；其中 101-103（投射/弹跳/防守）有「突破属性表」property_tbl_up=40 旁证，104-106（体能/运控/意识）的 +40 为均匀规则推断（38/38 wiki 角色复核一致）。",
      "attributeSourceType": "客户端配置实测（level120 property_tbl）+ 展示加成规则（101-103 突破表旁证；104-106 均匀 +40 推断）",
      "releaseInfo": {
        "version": "1.0.21 / resVersion 20（2026-11-12）",
        "status": "released",
        "detail": "feature_open「百目鬼卡池正式开启」时间戳 1794448800 = 2026-11-12 10:00；角色卡 show_time=1794430800；百目鬼 UP 池/活动挑战赛同步开启",
        "evidenceFile": "data/structured/_client_res20/baimugui_raw.json"
      },
      "sourceUpdatedAt": "2026-10-25 00:08",
      "confidence": "客户端配置复核（res20 level120+40；六维/潜力）",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725354.png",
      "thumb": "assets/portraits/725354.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725354.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 227,
          "攻筐": 250,
          "防投": 168,
          "护筐": 183,
          "传球": 189,
          "突破": 176
        },
        "potentials": [
          {
            "slot": 1,
            "value": 220
          },
          {
            "slot": 2,
            "value": 260
          },
          {
            "slot": 3,
            "value": 108
          },
          {
            "slot": 4,
            "value": 139
          },
          {
            "slot": 5,
            "value": 150
          },
          {
            "slot": 6,
            "value": 123
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
        "小前球员全属性+20%",
        "小前球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725354,
        "functionalTags": [
          "模板·内线终结",
          "模板·空间/投射",
          "技能·空间/外线",
          "技能·进攻",
          "技能·防守",
          "技能·专属机制",
          "技能·突破",
          "技能·体能/耐久（代理）",
          "技能·弱化/干扰"
        ],
        "roleSummary": "小前·攻筐+投射型；技能偏向 专属机制/弱化/干扰",
        "positionRank": {
          "rank": 2,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 238.5,
            "base_z": 2.207,
            "base_pct": 98.7,
            "growth_raw": 240,
            "growth_z": 2.768,
            "growth_pct": 98.7
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 227,
            "base_z": 1.206,
            "base_pct": 82.9,
            "growth_raw": 220,
            "growth_z": 1.108,
            "growth_pct": 81.6
          },
          "defense": {
            "label": "防守",
            "base_raw": 175.5,
            "base_z": -0.433,
            "base_pct": 36.8,
            "growth_raw": 123.5,
            "growth_z": -0.92,
            "growth_pct": 32.9
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 189,
            "base_z": 0.088,
            "base_pct": 60.5,
            "growth_raw": 150,
            "growth_z": -0.145,
            "growth_pct": 57.9
          },
          "drive": {
            "label": "突破",
            "base_raw": 205.6,
            "base_z": 0.226,
            "base_pct": 56.6,
            "growth_raw": 177.8,
            "growth_z": -0.334,
            "growth_pct": 36.8
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 223.2,
            "base_z": 0.797,
            "base_pct": 71.1,
            "growth_raw": 211.6,
            "growth_z": 0.621,
            "growth_pct": 64.5
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 58.41,
            "base_z": -0.611,
            "base_pct": 30.3,
            "growth_raw": 58.41,
            "growth_z": -0.611,
            "growth_pct": 30.3
          },
          "base_position_weighted": {
            "raw": 0.771,
            "pct": 82.9
          },
          "growth_position_weighted": {
            "raw": 0.67,
            "pct": 82.9
          },
          "panel_combined": {
            "raw": 82.89,
            "pct": 89.5,
            "rank": 4
          },
          "skill_value": {
            "raw": 3.76,
            "pct": 17.1,
            "rank": 32
          },
          "overall": {
            "raw": 66.45,
            "pct": 72.4,
            "rank": 11
          }
        },
        "attributeSum": 1193,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "小前-T23",
          "name": "小前·攻筐+投射型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [],
        "trainingTalents": [
          {
            "talent": "周末加训（额外训练机会）",
            "category": "训练机会（经济/节奏）",
            "note": "",
            "confidence": "单源",
            "source": "https://www.taptap.cn/moment/862429125158111356"
          }
        ],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": "T0",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 11,
        "identicalAttrGroup": null,
        "streamRoles": []
      }
    },
    {
      "id": "player_1014",
      "contentId": 725355,
      "entryId": null,
      "name": "藤松 玖怜",
      "aliases": [],
      "title": "进攻妨害",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "分卫",
      "style": "防守者",
      "school": "樱海高校",
      "heightCm": 167,
      "weightKg": 56,
      "spanCm": null,
      "tags": [],
      "roles": [
        "防守者"
      ],
      "stats": {
        "投射": 227,
        "攻筐": 202,
        "防投": 216,
        "护筐": 183,
        "传球": 189,
        "突破": 176
      },
      "potentials": [
        {
          "slot": 1,
          "value": 220
        },
        {
          "slot": 2,
          "value": 170
        },
        {
          "slot": 3,
          "value": 198
        },
        {
          "slot": 4,
          "value": 139
        },
        {
          "slot": 5,
          "value": 150
        },
        {
          "slot": 6,
          "value": 123
        }
      ],
      "skills": [
        {
          "name": "同调之声",
          "type": "固定",
          "summary": "全队获得强化：中幅提升投射属性 (受滕松防守影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "全队获得强化：中幅提升投射属性 (受滕松防守影响)，持续2分钟。",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "共鸣之心",
          "type": "额外",
          "summary": "我方任意球员三分命中后，中幅提升 滕松玖怜 防守属性（受藤松投射影响），持续2分钟",
          "levels": [
            {
              "level": 1,
              "desc": "我方任意球员三分命中后，中幅提升 滕松玖怜 防守属性（受藤松投射影响），持续2分钟",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "得分后卫通常拥有很强的投射能力，在外线为队伍贡献得分",
      "styleDesc": "优越的防守意识，在防守上有独特的优势。",
      "positionDesc": "得分后卫通常拥有很强的投射能力，在外线为队伍贡献得分",
      "source": "https://www.gamekee.com/lqsn/725355.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:09",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725355.png",
      "thumb": "assets/portraits/725355.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725355.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 227,
          "攻筐": 202,
          "防投": 216,
          "护筐": 183,
          "传球": 189,
          "突破": 176
        },
        "potentials": [
          {
            "slot": 1,
            "value": 220
          },
          {
            "slot": 2,
            "value": 170
          },
          {
            "slot": 3,
            "value": 198
          },
          {
            "slot": 4,
            "value": 139
          },
          {
            "slot": 5,
            "value": 150
          },
          {
            "slot": 6,
            "value": 123
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
        "分卫球员全属性+20%",
        "分卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725355,
        "functionalTags": [
          "模板·空间/投射",
          "模板·外线防守",
          "技能·空间/外线",
          "技能·防守",
          "技能·团队增益"
        ],
        "roleSummary": "分卫·投射+防投型；技能偏向 团队增益",
        "positionRank": {
          "rank": 1,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 214.5,
            "base_z": 0.893,
            "base_pct": 88.2,
            "growth_raw": 195,
            "growth_z": 0.745,
            "growth_pct": 89.5
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 227,
            "base_z": 1.206,
            "base_pct": 82.9,
            "growth_raw": 220,
            "growth_z": 1.108,
            "growth_pct": 81.6
          },
          "defense": {
            "label": "防守",
            "base_raw": 199.5,
            "base_z": 0.651,
            "base_pct": 71.1,
            "growth_raw": 168.5,
            "growth_z": 0.479,
            "growth_pct": 60.5
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 189,
            "base_z": 0.088,
            "base_pct": 60.5,
            "growth_raw": 150,
            "growth_z": -0.145,
            "growth_pct": 57.9
          },
          "drive": {
            "label": "突破",
            "base_raw": 186.4,
            "base_z": -0.946,
            "base_pct": 18.4,
            "growth_raw": 141.8,
            "growth_z": -1.76,
            "growth_pct": 5.3
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 194.4,
            "base_z": -0.187,
            "base_pct": 42.1,
            "growth_raw": 157.6,
            "growth_z": -0.505,
            "growth_pct": 32.9
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 75.32,
            "base_z": 0.561,
            "base_pct": 64.5,
            "growth_raw": 75.32,
            "growth_z": 0.561,
            "growth_pct": 64.5
          },
          "base_position_weighted": {
            "raw": 0.536,
            "pct": 64.5
          },
          "growth_position_weighted": {
            "raw": 0.291,
            "pct": 51.3
          },
          "panel_combined": {
            "raw": 59.21,
            "pct": 61.8,
            "rank": 15
          },
          "skill_value": {
            "raw": 13.8,
            "pct": 89.5,
            "rank": 4
          },
          "overall": {
            "raw": 66.78,
            "pct": 75,
            "rank": 10
          }
        },
        "attributeSum": 1193,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "分卫-T22",
          "name": "分卫·投射+防投型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [],
        "trainingTalents": [
          {
            "talent": "社区原文写作「腾松」：精力回复 5 次后给「训练加成」，位于训练加成% 乘区（按音近推断为 藤松 玖怜，待官方名单核对）",
            "category": "训练乘区（训练加成%）+ 精力",
            "note": "",
            "confidence": "多源一致",
            "source": "https://www.taptap.cn/moment/862429125158111356"
          }
        ],
        "communityTrainingTier": {
          "tier": "T2",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": "T1",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 10,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "训练流",
            "exampleTeam": [
              "克拉丽丝·波洛",
              "闪堂电",
              "望月 透",
              "佐久间 雨乃",
              "亚理纱 贾斯敏"
            ],
            "pickOrder": [
              "望月 透",
              "藤松 玖怜",
              "佐久间 雨乃",
              "榎本 纯那",
              "真崎 辉世"
            ],
            "notes": [
              "社区自选顺序（725397）：望月、藤松（原文写作「腾松」）、佐久间，再到榎本或真崎；但开荒帖提醒望月依赖精力条件、佐久间前期更易发挥。",
              "本条为「同功能位替代」而非数值叠乘：望月/藤松/佐久间被同一作者放在训练流优先序列，属竞争位，不应同时按名单无脑三选三。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1015",
      "contentId": 725356,
      "entryId": null,
      "name": "绿川 步梦",
      "aliases": [],
      "title": "防守妨害",
      "titleSource": "official",
      "rarity": "SR",
      "stars": null,
      "role": "中锋",
      "style": "组织者",
      "school": "樱海高校",
      "heightCm": 175,
      "weightKg": 74,
      "spanCm": null,
      "tags": [],
      "roles": [
        "组织者"
      ],
      "stats": {
        "投射": 150,
        "攻筐": 230,
        "防投": 162,
        "护筐": 216,
        "传球": 153,
        "突破": 182
      },
      "potentials": [
        {
          "slot": 1,
          "value": 100
        },
        {
          "slot": 2,
          "value": 260
        },
        {
          "slot": 3,
          "value": 130
        },
        {
          "slot": 4,
          "value": 233
        },
        {
          "slot": 5,
          "value": 110
        },
        {
          "slot": 6,
          "value": 167
        }
      ],
      "skills": [
        {
          "name": "野性掩护",
          "type": "固定",
          "summary": "中幅提升队友【空位出手】机会，持续2分钟。\n【空位出手】：进攻出手不会受到防守人干扰",
          "levels": [
            {
              "level": 1,
              "desc": "中幅提升队友【空位出手】机会，持续2分钟。\n【空位出手】：进攻出手不会受到防守人干扰",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "陷阱制造者",
          "type": "额外",
          "summary": "挡拆成功后，中幅降低被挡防守人意识属性(受绿川弹跳影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "挡拆成功后，中幅降低被挡防守人意识属性(受绿川弹跳影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "styleDesc": "球场指挥官，能让队伍完美执行战术，提升得分效率。",
      "positionDesc": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "source": "https://www.gamekee.com/lqsn/725356.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:09",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725356.png",
      "thumb": "assets/portraits/725356.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725356.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 150,
          "攻筐": 230,
          "防投": 162,
          "护筐": 216,
          "传球": 153,
          "突破": 182
        },
        "potentials": [
          {
            "slot": 1,
            "value": 100
          },
          {
            "slot": 2,
            "value": 260
          },
          {
            "slot": 3,
            "value": 130
          },
          {
            "slot": 4,
            "value": 233
          },
          {
            "slot": 5,
            "value": 110
          },
          {
            "slot": 6,
            "value": 167
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "中锋球员全属性+20%",
        "中锋球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725356,
        "functionalTags": [
          "模板·内线终结",
          "模板·护筐/篮板",
          "技能·空间/外线",
          "技能·防守",
          "技能·团队增益",
          "技能·突破",
          "技能·弱化/干扰"
        ],
        "roleSummary": "中锋·攻筐+护筐型；技能偏向 团队增益/弱化/干扰",
        "positionRank": {
          "rank": 6,
          "total": 8
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 190,
            "base_z": -0.448,
            "base_pct": 31.6,
            "growth_raw": 180,
            "growth_z": 0.071,
            "growth_pct": 36.8
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 150,
            "base_z": -1.24,
            "base_pct": 6.6,
            "growth_raw": 100,
            "growth_z": -1.126,
            "growth_pct": 9.2
          },
          "defense": {
            "label": "防守",
            "base_raw": 189,
            "base_z": 0.177,
            "base_pct": 47.4,
            "growth_raw": 181.5,
            "growth_z": 0.884,
            "growth_pct": 76.3
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 153,
            "base_z": -1.16,
            "base_pct": 7.9,
            "growth_raw": 110,
            "growth_z": -0.921,
            "growth_pct": 10.5
          },
          "drive": {
            "label": "突破",
            "base_raw": 201.2,
            "base_z": -0.042,
            "base_pct": 44.7,
            "growth_raw": 204.2,
            "growth_z": 0.712,
            "growth_pct": 72.4
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 224.4,
            "base_z": 0.838,
            "base_pct": 81.6,
            "growth_raw": 249.2,
            "growth_z": 1.405,
            "growth_pct": 89.5
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 79.24,
            "base_z": 0.833,
            "base_pct": 71.1,
            "growth_raw": 79.24,
            "growth_z": 0.833,
            "growth_pct": 71.1
          },
          "base_position_weighted": {
            "raw": 0.174,
            "pct": 34.2
          },
          "growth_position_weighted": {
            "raw": 0.707,
            "pct": 89.5
          },
          "panel_combined": {
            "raw": 56.32,
            "pct": 57.9,
            "rank": 17
          },
          "skill_value": {
            "raw": 9.1,
            "pct": 68.4,
            "rank": 12
          },
          "overall": {
            "raw": 59.34,
            "pct": 64.5,
            "rank": 14
          }
        },
        "attributeSum": 1093,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "中锋-T01",
          "name": "中锋·攻筐+护筐型",
          "shared": true,
          "sameTemplatePlayers": [
            "亚理纱 贾斯敏(SR)",
            "千圣·贝尔丝(SSR)",
            "榎本 纯那(SSR)"
          ]
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 14,
        "identicalAttrGroup": {
          "template_id": "中锋-T01",
          "rarity": "SR",
          "peers": [
            "亚理纱 贾斯敏"
          ],
          "note": "同模板同稀有度 → 属性完全相同；差异仅在技能/流派天赋"
        },
        "streamRoles": []
      }
    },
    {
      "id": "player_1016",
      "contentId": 725357,
      "entryId": null,
      "name": "雨森 琉璃",
      "aliases": [],
      "title": "得分手",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "大前",
      "style": "组织者",
      "school": "私立苍骑学园",
      "heightCm": 181,
      "weightKg": 73,
      "spanCm": null,
      "tags": [],
      "roles": [
        "组织者"
      ],
      "stats": {
        "投射": 217,
        "攻筐": 200,
        "防投": 182,
        "护筐": 201,
        "传球": 169,
        "突破": 224
      },
      "potentials": [
        {
          "slot": 1,
          "value": 199
        },
        {
          "slot": 2,
          "value": 167
        },
        {
          "slot": 3,
          "value": 135
        },
        {
          "slot": 4,
          "value": 171
        },
        {
          "slot": 5,
          "value": 115
        },
        {
          "slot": 6,
          "value": 213
        }
      ],
      "skills": [
        {
          "name": "中音和弦",
          "type": "固定",
          "summary": "全队获得强化：大幅提升中投威力 (受雨森投射影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "全队获得强化：大幅提升中投威力 (受雨森投射影响)，持续2分钟。",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "稳定音符",
          "type": "额外",
          "summary": "我方任意球员中投命中后，中幅提升 自身 防守篮板能力（受雨森意识影响），持续2分钟",
          "levels": [
            {
              "level": 1,
              "desc": "我方任意球员中投命中后，中幅提升 自身 防守篮板能力（受雨森意识影响），持续2分钟",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "大前锋往往体格强壮，能在篮下发起强硬攻击且冲抢篮板",
      "styleDesc": "球场指挥官，能让队伍完美执行战术，提升得分效率。",
      "positionDesc": "大前锋往往体格强壮，能在篮下发起强硬攻击且冲抢篮板",
      "source": "https://www.gamekee.com/lqsn/725357.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:09",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725357.png",
      "thumb": "assets/portraits/725357.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725357.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 217,
          "攻筐": 200,
          "防投": 182,
          "护筐": 201,
          "传球": 169,
          "突破": 224
        },
        "potentials": [
          {
            "slot": 1,
            "value": 199
          },
          {
            "slot": 2,
            "value": 167
          },
          {
            "slot": 3,
            "value": 135
          },
          {
            "slot": 4,
            "value": 171
          },
          {
            "slot": 5,
            "value": 115
          },
          {
            "slot": 6,
            "value": 213
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "大前球员全属性+20%",
        "大前球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725357,
        "functionalTags": [
          "模板·突破/持球",
          "模板·空间/投射",
          "技能·空间/外线",
          "技能·团队增益",
          "技能·防守",
          "技能·篮板（代理）"
        ],
        "roleSummary": "大前·突破+投射型；技能偏向 团队增益",
        "positionRank": {
          "rank": 7,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 208.5,
            "base_z": 0.565,
            "base_pct": 71.1,
            "growth_raw": 183,
            "growth_z": 0.206,
            "growth_pct": 56.6
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 217,
            "base_z": 0.889,
            "base_pct": 76.3,
            "growth_raw": 199,
            "growth_z": 0.717,
            "growth_pct": 72.4
          },
          "defense": {
            "label": "防守",
            "base_raw": 191.5,
            "base_z": 0.29,
            "base_pct": 51.3,
            "growth_raw": 153,
            "growth_z": -0.003,
            "growth_pct": 39.5
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 169,
            "base_z": -0.606,
            "base_pct": 34.2,
            "growth_raw": 115,
            "growth_z": -0.824,
            "growth_pct": 30.3
          },
          "drive": {
            "label": "突破",
            "base_raw": 214.4,
            "base_z": 0.763,
            "base_pct": 67.1,
            "growth_raw": 194.6,
            "growth_z": 0.332,
            "growth_pct": 50
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 200.4,
            "base_z": 0.018,
            "base_pct": 48.7,
            "growth_raw": 168.6,
            "growth_z": -0.275,
            "growth_pct": 42.1
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 64.76,
            "base_z": -0.171,
            "base_pct": 39.5,
            "growth_raw": 64.76,
            "growth_z": -0.171,
            "growth_pct": 39.5
          },
          "base_position_weighted": {
            "raw": 0.273,
            "pct": 46.1
          },
          "growth_position_weighted": {
            "raw": -0.023,
            "pct": 15.8
          },
          "panel_combined": {
            "raw": 33.95,
            "pct": 32.9,
            "rank": 26
          },
          "skill_value": {
            "raw": 17.25,
            "pct": 96.1,
            "rank": 2
          },
          "overall": {
            "raw": 49.47,
            "pct": 51.3,
            "rank": 19
          }
        },
        "attributeSum": 1193,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "大前-T07",
          "name": "大前·突破+投射型",
          "shared": true,
          "sameTemplatePlayers": [
            "龙宫寺 心叶(SR)"
          ]
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": "T2",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 19,
        "identicalAttrGroup": null,
        "streamRoles": []
      }
    },
    {
      "id": "player_1017",
      "contentId": 725358,
      "entryId": null,
      "name": "皆川 式",
      "aliases": [],
      "title": "抢断达人",
      "titleSource": "official",
      "rarity": "SR",
      "stars": null,
      "role": "小前",
      "style": "组织者",
      "school": "明日叶学园",
      "heightCm": 170,
      "weightKg": 62,
      "spanCm": null,
      "tags": [],
      "roles": [
        "组织者"
      ],
      "stats": {
        "投射": 164,
        "攻筐": 230,
        "防投": 196,
        "护筐": 168,
        "传球": 173,
        "突破": 160
      },
      "potentials": [
        {
          "slot": 1,
          "value": 130
        },
        {
          "slot": 2,
          "value": 260
        },
        {
          "slot": 3,
          "value": 198
        },
        {
          "slot": 4,
          "value": 139
        },
        {
          "slot": 5,
          "value": 150
        },
        {
          "slot": 6,
          "value": 123
        }
      ],
      "skills": [
        {
          "name": "骇客充能",
          "type": "固定",
          "summary": "回复我方得分最高球员50点能量",
          "levels": [
            {
              "level": 1,
              "desc": "回复我方得分最高球员50点能量",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "后发制人",
          "type": "额外",
          "summary": "对位球员使用速卡时，小幅提升自身防守成功率（受皆川弹跳影响），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "对位球员使用速卡时，小幅提升自身防守成功率（受皆川弹跳影响），持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "小前锋是游戏中重要的得分者，擅长多样化的得分手段",
      "styleDesc": "球场指挥官，能让队伍完美执行战术，提升得分效率。",
      "positionDesc": "小前锋是游戏中重要的得分者，擅长多样化的得分手段",
      "source": "https://www.gamekee.com/lqsn/725358.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:09",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725358.png",
      "thumb": "assets/portraits/725358.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725358.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 164,
          "攻筐": 230,
          "防投": 196,
          "护筐": 168,
          "传球": 173,
          "突破": 160
        },
        "potentials": [
          {
            "slot": 1,
            "value": 130
          },
          {
            "slot": 2,
            "value": 260
          },
          {
            "slot": 3,
            "value": 198
          },
          {
            "slot": 4,
            "value": 139
          },
          {
            "slot": 5,
            "value": 150
          },
          {
            "slot": 6,
            "value": 123
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
        "小前球员全属性+20%",
        "小前球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725358,
        "functionalTags": [
          "模板·内线终结",
          "模板·外线防守",
          "技能·进攻",
          "技能·体能/耐久（代理）",
          "技能·耐久/能量资源",
          "技能·防守",
          "技能·突破",
          "技能·自我增益"
        ],
        "roleSummary": "小前·攻筐+防投型；技能偏向 耐久/能量资源/自我增益",
        "positionRank": {
          "rank": 7,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 197,
            "base_z": -0.065,
            "base_pct": 48.7,
            "growth_raw": 195,
            "growth_z": 0.745,
            "growth_pct": 89.5
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 164,
            "base_z": -0.795,
            "base_pct": 30.3,
            "growth_raw": 130,
            "growth_z": -0.568,
            "growth_pct": 32.9
          },
          "defense": {
            "label": "防守",
            "base_raw": 182,
            "base_z": -0.14,
            "base_pct": 43.4,
            "growth_raw": 168.5,
            "growth_z": 0.479,
            "growth_pct": 60.5
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 173,
            "base_z": -0.467,
            "base_pct": 48.7,
            "growth_raw": 150,
            "growth_z": -0.145,
            "growth_pct": 57.9
          },
          "drive": {
            "label": "突破",
            "base_raw": 188,
            "base_z": -0.848,
            "base_pct": 32.9,
            "growth_raw": 177.8,
            "growth_z": -0.334,
            "growth_pct": 36.8
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 205.2,
            "base_z": 0.182,
            "base_pct": 53.9,
            "growth_raw": 211.6,
            "growth_z": 0.621,
            "growth_pct": 64.5
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 73.17,
            "base_z": 0.412,
            "base_pct": 60.5,
            "growth_raw": 73.17,
            "growth_z": 0.412,
            "growth_pct": 60.5
          },
          "base_position_weighted": {
            "raw": -0.334,
            "pct": 9.2
          },
          "growth_position_weighted": {
            "raw": 0.174,
            "pct": 39.5
          },
          "panel_combined": {
            "raw": 21.32,
            "pct": 14.5,
            "rank": 33
          },
          "skill_value": {
            "raw": 2.58,
            "pct": 9.2,
            "rank": 35
          },
          "overall": {
            "raw": 18.29,
            "pct": 6.6,
            "rank": 36
          }
        },
        "attributeSum": 1091,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "小前-T06",
          "name": "小前·攻筐+防投型",
          "shared": true,
          "sameTemplatePlayers": [
            "羽濑川 湊(SSR)"
          ]
        },
        "knownStreamTalents": [
          {
            "talent": "小游戏减价向",
            "category": "",
            "note": "「皆川偏减价」",
            "confidence": "待验证",
            "source": 725396
          }
        ],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 36,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "小游戏流",
            "exampleTeam": [
              "和泉 香织",
              "林原 树里",
              "皆川 式",
              "稻叶 杏里",
              "远野 桐"
            ],
            "pickOrder": [
              "稻叶 杏里",
              "林原 树里",
              "远野 桐/和泉 香织"
            ],
            "notes": [
              "社区多认为偏早期开荒，但对强势期长度说法不一（3 天~1 周不等），不宜据此投入全部自选/钻石（725488）。",
              "皆川偏减价；林原、稻叶围绕小游戏增益；远野需带加成的小游戏选项（725396）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1018",
      "contentId": 725359,
      "entryId": null,
      "name": "毒岛 黛也",
      "aliases": [],
      "title": "中投达人",
      "titleSource": "official",
      "rarity": "SR",
      "stars": null,
      "role": "分卫",
      "style": "防守者",
      "school": "明日叶学园",
      "heightCm": 170,
      "weightKg": 58,
      "spanCm": null,
      "tags": [],
      "roles": [
        "防守者"
      ],
      "stats": {
        "投射": 230,
        "攻筐": 160,
        "防投": 157,
        "护筐": 199,
        "传球": 169,
        "突破": 180
      },
      "potentials": [
        {
          "slot": 1,
          "value": 260
        },
        {
          "slot": 2,
          "value": 122
        },
        {
          "slot": 3,
          "value": 118
        },
        {
          "slot": 4,
          "value": 200
        },
        {
          "slot": 5,
          "value": 140
        },
        {
          "slot": 6,
          "value": 160
        }
      ],
      "skills": [
        {
          "name": "中投教科书",
          "type": "固定",
          "summary": "全队获得强化：面对力竭的防守人时，小幅提升中投命中率，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "全队获得强化：面对力竭的防守人时，小幅提升中投命中率，持续2分钟。",
              "energyCost": 80,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "不屈之心",
          "type": "额外",
          "summary": "接到队友传球时，中幅提升 自身 中投抗干扰能力（受毒岛体能影响），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "接到队友传球时，中幅提升 自身 中投抗干扰能力（受毒岛体能影响），持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "得分后卫通常拥有很强的投射能力，在外线为队伍贡献得分",
      "styleDesc": "优越的防守意识，在防守上有独特的优势。",
      "positionDesc": "得分后卫通常拥有很强的投射能力，在外线为队伍贡献得分",
      "source": "https://www.gamekee.com/lqsn/725359.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:09",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725359.png",
      "thumb": "assets/portraits/725359.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725359.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 230,
          "攻筐": 160,
          "防投": 157,
          "护筐": 199,
          "传球": 169,
          "突破": 180
        },
        "potentials": [
          {
            "slot": 1,
            "value": 260
          },
          {
            "slot": 2,
            "value": 122
          },
          {
            "slot": 3,
            "value": 118
          },
          {
            "slot": 4,
            "value": 200
          },
          {
            "slot": 5,
            "value": 140
          },
          {
            "slot": 6,
            "value": 160
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
        "分卫球员全属性+20%",
        "分卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725359,
        "functionalTags": [
          "模板·空间/投射",
          "模板·护筐/篮板",
          "技能·空间/外线",
          "技能·防守",
          "技能·体能/耐久（代理）",
          "技能·团队增益",
          "技能·组织"
        ],
        "roleSummary": "分卫·投射+护筐型；技能偏向 团队增益",
        "positionRank": {
          "rank": 4,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 195,
            "base_z": -0.174,
            "base_pct": 42.1,
            "growth_raw": 191,
            "growth_z": 0.565,
            "growth_pct": 73.7
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 230,
            "base_z": 1.302,
            "base_pct": 89.5,
            "growth_raw": 260,
            "growth_z": 1.852,
            "growth_pct": 94.7
          },
          "defense": {
            "label": "防守",
            "base_raw": 178,
            "base_z": -0.32,
            "base_pct": 40.8,
            "growth_raw": 159,
            "growth_z": 0.184,
            "growth_pct": 52.6
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 169,
            "base_z": -0.606,
            "base_pct": 34.2,
            "growth_raw": 140,
            "growth_z": -0.339,
            "growth_pct": 44.7
          },
          "drive": {
            "label": "突破",
            "base_raw": 172,
            "base_z": -1.825,
            "base_pct": 1.3,
            "growth_raw": 144.8,
            "growth_z": -1.641,
            "growth_pct": 11.8
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 175.6,
            "base_z": -0.829,
            "base_pct": 27.6,
            "growth_raw": 153.2,
            "growth_z": -0.596,
            "growth_pct": 27.6
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 68.98,
            "base_z": 0.122,
            "base_pct": 51.3,
            "growth_raw": 68.98,
            "growth_z": 0.122,
            "growth_pct": 51.3
          },
          "base_position_weighted": {
            "raw": -0.055,
            "pct": 22.4
          },
          "growth_position_weighted": {
            "raw": 0.412,
            "pct": 61.8
          },
          "panel_combined": {
            "raw": 38.16,
            "pct": 38.2,
            "rank": 24
          },
          "skill_value": {
            "raw": 10.35,
            "pct": 82.9,
            "rank": 7
          },
          "overall": {
            "raw": 49.34,
            "pct": 48.7,
            "rank": 20
          }
        },
        "attributeSum": 1095,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "分卫-T26",
          "name": "分卫·投射+护筐型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 20,
        "identicalAttrGroup": null,
        "streamRoles": []
      }
    },
    {
      "id": "player_1019",
      "contentId": 725360,
      "entryId": null,
      "name": "名雪 纱夜",
      "aliases": [],
      "title": "团队回复定位（编辑概括；客户端称号未展示）",
      "titleSource": "editor_note",
      "rarity": "SSR",
      "stars": null,
      "role": "控卫",
      "style": "组织者",
      "school": "明日叶学园",
      "heightCm": 163,
      "weightKg": 52,
      "spanCm": null,
      "tags": [],
      "roles": [
        "组织者"
      ],
      "stats": {
        "投射": 183,
        "攻筐": 180,
        "防投": 168,
        "护筐": 217,
        "传球": 198,
        "突破": 247
      },
      "potentials": [
        {
          "slot": 1,
          "value": 137
        },
        {
          "slot": 2,
          "value": 132
        },
        {
          "slot": 3,
          "value": 110
        },
        {
          "slot": 4,
          "value": 202
        },
        {
          "slot": 5,
          "value": 165
        },
        {
          "slot": 6,
          "value": 254
        }
      ],
      "skills": [
        {
          "name": "治愈之风",
          "type": "固定",
          "summary": "中幅回复全队耐力 (受名雪意识影响)",
          "levels": [
            {
              "level": 1,
              "desc": "中幅回复全队耐力 (受名雪意识影响)",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "球队的心脏",
          "type": "额外",
          "summary": "我方任意队友回复耐力时，小幅提升 该队友 意识属性（受名雪体能影响），持续2分钟",
          "levels": [
            {
              "level": 1,
              "desc": "我方任意队友回复耐力时，小幅提升 该队友 意识属性（受名雪体能影响），持续2分钟",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "styleDesc": "球场指挥官，能让队伍完美执行战术，提升得分效率。",
      "positionDesc": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "source": "https://www.gamekee.com/lqsn/725360.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:09",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725360.png",
      "thumb": "assets/portraits/725360.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725360.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 183,
          "攻筐": 180,
          "防投": 168,
          "护筐": 217,
          "传球": 198,
          "突破": 247
        },
        "potentials": [
          {
            "slot": 1,
            "value": 137
          },
          {
            "slot": 2,
            "value": 132
          },
          {
            "slot": 3,
            "value": 110
          },
          {
            "slot": 4,
            "value": 202
          },
          {
            "slot": 5,
            "value": 165
          },
          {
            "slot": 6,
            "value": 254
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "控卫球员全属性+20%",
        "控卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725360,
        "functionalTags": [
          "模板·突破/持球",
          "模板·护筐/篮板",
          "技能·体能/耐久（代理）",
          "技能·耐久/能量资源"
        ],
        "roleSummary": "控卫·突破+护筐型；技能偏向 耐久/能量资源",
        "positionRank": {
          "rank": 2,
          "total": 9
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 181.5,
            "base_z": -0.913,
            "base_pct": 14.5,
            "growth_raw": 134.5,
            "growth_z": -1.974,
            "growth_pct": 6.6
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 183,
            "base_z": -0.191,
            "base_pct": 50,
            "growth_raw": 137,
            "growth_z": -0.438,
            "growth_pct": 46.1
          },
          "defense": {
            "label": "防守",
            "base_raw": 192.5,
            "base_z": 0.335,
            "base_pct": 53.9,
            "growth_raw": 156,
            "growth_z": 0.09,
            "growth_pct": 46.1
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 198,
            "base_z": 0.399,
            "base_pct": 75,
            "growth_raw": 165,
            "growth_z": 0.145,
            "growth_pct": 71.1
          },
          "drive": {
            "label": "突破",
            "base_raw": 220.2,
            "base_z": 1.117,
            "base_pct": 88.2,
            "growth_raw": 205.2,
            "growth_z": 0.752,
            "growth_pct": 88.2
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 194.8,
            "base_z": -0.173,
            "base_pct": 46.1,
            "growth_raw": 160,
            "growth_z": -0.454,
            "growth_pct": 38.2
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 65.88,
            "base_z": -0.093,
            "base_pct": 43.4,
            "growth_raw": 65.88,
            "growth_z": -0.093,
            "growth_pct": 43.4
          },
          "base_position_weighted": {
            "raw": 0.239,
            "pct": 43.4
          },
          "growth_position_weighted": {
            "raw": -0.092,
            "pct": 6.6
          },
          "panel_combined": {
            "raw": 28.68,
            "pct": 25,
            "rank": 29
          },
          "skill_value": {
            "raw": 9.45,
            "pct": 75,
            "rank": 10
          },
          "overall": {
            "raw": 40.26,
            "pct": 38.2,
            "rank": 24
          }
        },
        "attributeSum": 1193,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "控卫-T10",
          "name": "控卫·突破+护筐型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [
          {
            "talent": "商店减价向",
            "category": "",
            "note": "羽的商店流示例，偏减价",
            "confidence": "待验证",
            "source": 725396
          }
        ],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": "T2",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": "T1",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 24,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "商店流",
            "exampleTeam": [
              "名雪 纱夜",
              "羽田 朱志香",
              "降旗 千红纱",
              "早濑 千秋",
              "洺瑶"
            ],
            "pickOrder": [
              "羽田 朱志香",
              "名雪 纱夜/降旗 千红纱",
              "洺瑶"
            ],
            "notes": [
              "同名天赋「道具升级」：SSR 羽田 与 SR 清水 万里 不能同时生效（725602）。",
              "功能性差异：名雪偏减价、羽田偏品质、早濑偏商品数量（725396）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1020",
      "contentId": 725361,
      "entryId": null,
      "name": "佐久间 雨乃",
      "aliases": [],
      "title": "扣篮达人",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "大前",
      "style": "防守者",
      "school": "明日叶学园",
      "heightCm": 176,
      "weightKg": 65,
      "spanCm": null,
      "tags": [],
      "roles": [
        "防守者"
      ],
      "stats": {
        "投射": 167,
        "攻筐": 250,
        "防投": 181,
        "护筐": 252,
        "传球": 170,
        "突破": 175
      },
      "potentials": [
        {
          "slot": 1,
          "value": 109
        },
        {
          "slot": 2,
          "value": 257
        },
        {
          "slot": 3,
          "value": 135
        },
        {
          "slot": 4,
          "value": 261
        },
        {
          "slot": 5,
          "value": 115
        },
        {
          "slot": 6,
          "value": 123
        }
      ],
      "skills": [
        {
          "name": "流星灌篮",
          "type": "固定",
          "summary": "自身获得强化：小幅提升扣篮命中率，佐久间雨乃的对位防守人拥有的所有弱化效果总层数越多，命中率额外提升越多。持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "自身获得强化：小幅提升扣篮命中率，佐久间雨乃的对位防守人拥有的所有弱化效果总层数越多，命中率额外提升越多。持续2分钟。",
              "energyCost": 80,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "无限起跳",
          "type": "额外",
          "summary": "我方任意队友上篮或扣篮命中后，中幅提升 佐久间雨乃 弹跳属性（受佐久间体能影响），持续2分钟",
          "levels": [
            {
              "level": 1,
              "desc": "我方任意队友上篮或扣篮命中后，中幅提升 佐久间雨乃 弹跳属性（受佐久间体能影响），持续2分钟",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "大前锋往往体格强壮，能在篮下发起强硬攻击且冲抢篮板",
      "styleDesc": "优越的防守意识，在防守上有独特的优势。",
      "positionDesc": "大前锋往往体格强壮，能在篮下发起强硬攻击且冲抢篮板",
      "source": "https://www.gamekee.com/lqsn/725361.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:09",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725361.png",
      "thumb": "assets/portraits/725361.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725361.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 167,
          "攻筐": 250,
          "防投": 181,
          "护筐": 252,
          "传球": 170,
          "突破": 175
        },
        "potentials": [
          {
            "slot": 1,
            "value": 109
          },
          {
            "slot": 2,
            "value": 257
          },
          {
            "slot": 3,
            "value": 135
          },
          {
            "slot": 4,
            "value": 261
          },
          {
            "slot": 5,
            "value": 115
          },
          {
            "slot": 6,
            "value": 123
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "大前球员全属性+20%",
        "大前球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725361,
        "functionalTags": [
          "模板·护筐/篮板",
          "模板·内线终结",
          "技能·空间/外线",
          "技能·进攻",
          "技能·防守",
          "技能·专属机制",
          "技能·突破",
          "技能·团队增益"
        ],
        "roleSummary": "大前·护筐+攻筐型；技能偏向 专属机制/团队增益",
        "positionRank": {
          "rank": 1,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 208.5,
            "base_z": 0.565,
            "base_pct": 71.1,
            "growth_raw": 183,
            "growth_z": 0.206,
            "growth_pct": 56.6
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 167,
            "base_z": -0.7,
            "base_pct": 34.2,
            "growth_raw": 109,
            "growth_z": -0.959,
            "growth_pct": 23.7
          },
          "defense": {
            "label": "防守",
            "base_raw": 216.5,
            "base_z": 1.419,
            "base_pct": 93.4,
            "growth_raw": 198,
            "growth_z": 1.397,
            "growth_pct": 93.4
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 170,
            "base_z": -0.571,
            "base_pct": 40.8,
            "growth_raw": 115,
            "growth_z": -0.824,
            "growth_pct": 30.3
          },
          "drive": {
            "label": "突破",
            "base_raw": 205,
            "base_z": 0.19,
            "base_pct": 51.3,
            "growth_raw": 176.6,
            "growth_z": -0.381,
            "growth_pct": 26.3
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 250.8,
            "base_z": 1.74,
            "base_pct": 96.1,
            "growth_raw": 258.6,
            "growth_z": 1.601,
            "growth_pct": 97.4
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 87.04,
            "base_z": 1.374,
            "base_pct": 89.5,
            "growth_raw": 87.04,
            "growth_z": 1.374,
            "growth_pct": 89.5
          },
          "base_position_weighted": {
            "raw": 1.014,
            "pct": 96.1
          },
          "growth_position_weighted": {
            "raw": 0.812,
            "pct": 97.4
          },
          "panel_combined": {
            "raw": 96.58,
            "pct": 98.7,
            "rank": 1
          },
          "skill_value": {
            "raw": 8.15,
            "pct": 59.2,
            "rank": 16
          },
          "overall": {
            "raw": 87.24,
            "pct": 96.1,
            "rank": 2
          }
        },
        "attributeSum": 1195,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "大前-T04",
          "name": "大前·护筐+攻筐型",
          "shared": true,
          "sameTemplatePlayers": [
            "春澄 永远(SR)"
          ]
        },
        "knownStreamTalents": [],
        "trainingTalents": [
          {
            "talent": "训练技能：进行队友训练时主属性 +3，且有概率额外 +2 主属性（内测 50% → 公测 40%）；★★ 训练加成 +3%（落在训练加成% 乘区）",
            "category": "训练乘区（加法乘区）",
            "note": "",
            "confidence": "多源一致（实测/截图）",
            "source": "https://www.taptap.cn/moment/805700735671995246"
          }
        ],
        "communityTrainingTier": {
          "tier": "T2",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": "T2",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 2,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "训练流",
            "exampleTeam": [
              "克拉丽丝·波洛",
              "闪堂电",
              "望月 透",
              "佐久间 雨乃",
              "亚理纱 贾斯敏"
            ],
            "pickOrder": [
              "望月 透",
              "藤松 玖怜",
              "佐久间 雨乃",
              "榎本 纯那",
              "真崎 辉世"
            ],
            "notes": [
              "社区自选顺序（725397）：望月、藤松（原文写作「腾松」）、佐久间，再到榎本或真崎；但开荒帖提醒望月依赖精力条件、佐久间前期更易发挥。",
              "本条为「同功能位替代」而非数值叠乘：望月/藤松/佐久间被同一作者放在训练流优先序列，属竞争位，不应同时按名单无脑三选三。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1021",
      "contentId": 725362,
      "entryId": null,
      "name": "千圣·贝尔丝",
      "aliases": [],
      "title": "篮板猛兽",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "中锋",
      "style": "篮板手",
      "school": "明日叶学园",
      "heightCm": 180,
      "weightKg": 78,
      "spanCm": null,
      "tags": [],
      "roles": [
        "篮板手"
      ],
      "stats": {
        "投射": 161,
        "攻筐": 250,
        "防投": 180,
        "护筐": 235,
        "传球": 167,
        "突破": 200
      },
      "potentials": [
        {
          "slot": 1,
          "value": 100
        },
        {
          "slot": 2,
          "value": 260
        },
        {
          "slot": 3,
          "value": 130
        },
        {
          "slot": 4,
          "value": 233
        },
        {
          "slot": 5,
          "value": 110
        },
        {
          "slot": 6,
          "value": 167
        }
      ],
      "skills": [
        {
          "name": "篮板怪兽",
          "type": "固定",
          "summary": "获得一个蓄力标记，可消耗一个标记大幅提升抢到 进攻篮板的成功率，且抢到进攻篮板后立刻进行一次补篮。",
          "levels": [
            {
              "level": 1,
              "desc": "获得一个蓄力标记，可消耗一个标记大幅提升抢到 进攻篮板的成功率，且抢到进攻篮板后立刻进行一次补篮。",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "空战指挥官",
          "type": "额外",
          "summary": "抢到篮板时，我方分卫和小前投射属性中幅提升(受千圣体能影响)，持续2分钟",
          "levels": [
            {
              "level": 1,
              "desc": "抢到篮板时，我方分卫和小前投射属性中幅提升(受千圣体能影响)，持续2分钟",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "styleDesc": "敏锐的篮板嗅觉，在争夺篮板球上总能抢占先机。",
      "positionDesc": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "source": "https://www.gamekee.com/lqsn/725362.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:09",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725362.png",
      "thumb": "assets/portraits/725362.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725362.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 161,
          "攻筐": 250,
          "防投": 180,
          "护筐": 235,
          "传球": 167,
          "突破": 200
        },
        "potentials": [
          {
            "slot": 1,
            "value": 100
          },
          {
            "slot": 2,
            "value": 260
          },
          {
            "slot": 3,
            "value": 130
          },
          {
            "slot": 4,
            "value": 233
          },
          {
            "slot": 5,
            "value": 110
          },
          {
            "slot": 6,
            "value": 167
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "中锋球员全属性+20%",
        "中锋球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725362,
        "functionalTags": [
          "模板·内线终结",
          "模板·护筐/篮板",
          "技能·空间/外线",
          "技能·进攻",
          "技能·防守",
          "技能·篮板（代理）",
          "技能·专属机制",
          "技能·团队增益"
        ],
        "roleSummary": "中锋·攻筐+护筐型；技能偏向 专属机制/团队增益",
        "positionRank": {
          "rank": 1,
          "total": 8
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 205.5,
            "base_z": 0.4,
            "base_pct": 55.3,
            "growth_raw": 180,
            "growth_z": 0.071,
            "growth_pct": 36.8
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 161,
            "base_z": -0.89,
            "base_pct": 21.1,
            "growth_raw": 100,
            "growth_z": -1.126,
            "growth_pct": 9.2
          },
          "defense": {
            "label": "防守",
            "base_raw": 207.5,
            "base_z": 1.012,
            "base_pct": 82.9,
            "growth_raw": 181.5,
            "growth_z": 0.884,
            "growth_pct": 76.3
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 167,
            "base_z": -0.675,
            "base_pct": 19.7,
            "growth_raw": 110,
            "growth_z": -0.921,
            "growth_pct": 10.5
          },
          "drive": {
            "label": "突破",
            "base_raw": 220,
            "base_z": 1.105,
            "base_pct": 84.2,
            "growth_raw": 204.2,
            "growth_z": 0.712,
            "growth_pct": 72.4
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 244,
            "base_z": 1.508,
            "base_pct": 92.1,
            "growth_raw": 249.2,
            "growth_z": 1.405,
            "growth_pct": 89.5
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 79.24,
            "base_z": 0.833,
            "base_pct": 71.1,
            "growth_raw": 79.24,
            "growth_z": 0.833,
            "growth_pct": 71.1
          },
          "base_position_weighted": {
            "raw": 0.886,
            "pct": 89.5
          },
          "growth_position_weighted": {
            "raw": 0.707,
            "pct": 89.5
          },
          "panel_combined": {
            "raw": 89.47,
            "pct": 94.7,
            "rank": 2
          },
          "skill_value": {
            "raw": 10.65,
            "pct": 85.5,
            "rank": 6
          },
          "overall": {
            "raw": 88.49,
            "pct": 98.7,
            "rank": 1
          }
        },
        "attributeSum": 1193,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "中锋-T01",
          "name": "中锋·攻筐+护筐型",
          "shared": true,
          "sameTemplatePlayers": [
            "亚理纱 贾斯敏(SR)",
            "绿川 步梦(SR)",
            "榎本 纯那(SSR)"
          ]
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": "T1",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": "T2",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 1,
        "identicalAttrGroup": {
          "template_id": "中锋-T01",
          "rarity": "SSR",
          "peers": [
            "榎本 纯那"
          ],
          "note": "同模板同稀有度 → 属性完全相同；差异仅在技能/流派天赋"
        },
        "streamRoles": [
          {
            "stream": "扭蛋流",
            "exampleTeam": [
              "先斗 月绮",
              "卧云 真昼",
              "羽濑川 湊",
              "近江 奏",
              "千圣·贝尔丝"
            ],
            "pickOrder": [
              "羽濑川 湊",
              "千圣·贝尔丝",
              "卧云 真昼"
            ],
            "notes": [
              "同名天赋「再买一个」：SSR 羽濑川 与 SR 春澄 永远 不能同时生效（725602），同队占两个位置不叠加收益。",
              "先检查额外购买、减价与直接增益是否齐全；卧云偏后期（725397）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1022",
      "contentId": 725363,
      "entryId": null,
      "name": "稻叶 杏里",
      "aliases": [],
      "title": "耐力妨害",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "大前",
      "style": "得分手",
      "school": "樱海高校",
      "heightCm": 172,
      "weightKg": 63,
      "spanCm": null,
      "tags": [],
      "roles": [
        "得分手"
      ],
      "stats": {
        "投射": 167,
        "攻筐": 250,
        "防投": 231,
        "护筐": 202,
        "传球": 170,
        "突破": 176
      },
      "potentials": [
        {
          "slot": 1,
          "value": 109
        },
        {
          "slot": 2,
          "value": 257
        },
        {
          "slot": 3,
          "value": 225
        },
        {
          "slot": 4,
          "value": 171
        },
        {
          "slot": 5,
          "value": 115
        },
        {
          "slot": 6,
          "value": 123
        }
      ],
      "skills": [
        {
          "name": "恶作剧抢断",
          "type": "固定",
          "summary": "中幅降低对位球员耐力(受稻叶防守影响)",
          "levels": [
            {
              "level": 1,
              "desc": "中幅降低对位球员耐力(受稻叶防守影响)",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "以刚破柔",
          "type": "额外",
          "summary": "中幅提升 我方大前和中锋 背打和突破威力(受稻叶防守影响)",
          "levels": [
            {
              "level": 1,
              "desc": "中幅提升 我方大前和中锋 背打和突破威力(受稻叶防守影响)",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "大前锋往往体格强壮，能在篮下发起强硬攻击且冲抢篮板",
      "styleDesc": "强烈的进攻欲望，承担了队伍中的大多的得分任务。",
      "positionDesc": "大前锋往往体格强壮，能在篮下发起强硬攻击且冲抢篮板",
      "source": "https://www.gamekee.com/lqsn/725363.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:09",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725363.png",
      "thumb": "assets/portraits/725363.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725363.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 167,
          "攻筐": 250,
          "防投": 231,
          "护筐": 202,
          "传球": 170,
          "突破": 176
        },
        "potentials": [
          {
            "slot": 1,
            "value": 109
          },
          {
            "slot": 2,
            "value": 257
          },
          {
            "slot": 3,
            "value": 225
          },
          {
            "slot": 4,
            "value": 171
          },
          {
            "slot": 5,
            "value": 115
          },
          {
            "slot": 6,
            "value": 123
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "大前球员全属性+20%",
        "大前球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725363,
        "functionalTags": [
          "模板·内线终结",
          "模板·外线防守",
          "技能·防守",
          "技能·体能/耐久（代理）",
          "技能·耐久/能量资源",
          "技能·进攻",
          "技能·突破",
          "技能·团队增益"
        ],
        "roleSummary": "大前·攻筐+防投型；技能偏向 耐久/能量资源/团队增益",
        "positionRank": {
          "rank": 2,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 208.5,
            "base_z": 0.565,
            "base_pct": 71.1,
            "growth_raw": 183,
            "growth_z": 0.206,
            "growth_pct": 56.6
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 167,
            "base_z": -0.7,
            "base_pct": 34.2,
            "growth_raw": 109,
            "growth_z": -0.959,
            "growth_pct": 23.7
          },
          "defense": {
            "label": "防守",
            "base_raw": 216.5,
            "base_z": 1.419,
            "base_pct": 93.4,
            "growth_raw": 198,
            "growth_z": 1.397,
            "growth_pct": 93.4
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 170,
            "base_z": -0.571,
            "base_pct": 40.8,
            "growth_raw": 115,
            "growth_z": -0.824,
            "growth_pct": 30.3
          },
          "drive": {
            "label": "突破",
            "base_raw": 205.6,
            "base_z": 0.226,
            "base_pct": 56.6,
            "growth_raw": 176.6,
            "growth_z": -0.381,
            "growth_pct": 26.3
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 230.8,
            "base_z": 1.057,
            "base_pct": 88.2,
            "growth_raw": 222.6,
            "growth_z": 0.85,
            "growth_pct": 78.9
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 88.34,
            "base_z": 1.464,
            "base_pct": 94.7,
            "growth_raw": 88.34,
            "growth_z": 1.464,
            "growth_pct": 94.7
          },
          "base_position_weighted": {
            "raw": 0.817,
            "pct": 85.5
          },
          "growth_position_weighted": {
            "raw": 0.591,
            "pct": 78.9
          },
          "panel_combined": {
            "raw": 82.89,
            "pct": 89.5,
            "rank": 5
          },
          "skill_value": {
            "raw": 7.16,
            "pct": 53.9,
            "rank": 18
          },
          "overall": {
            "raw": 75.66,
            "pct": 89.5,
            "rank": 4
          }
        },
        "attributeSum": 1196,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "大前-T05",
          "name": "大前·攻筐+防投型",
          "shared": true,
          "sameTemplatePlayers": [
            "早濑 千秋(SR)"
          ]
        },
        "knownStreamTalents": [
          {
            "talent": "小游戏增益向",
            "category": "",
            "note": "同上",
            "confidence": "待验证",
            "source": 725396
          }
        ],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": "T1",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 4,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "小游戏流",
            "exampleTeam": [
              "和泉 香织",
              "林原 树里",
              "皆川 式",
              "稻叶 杏里",
              "远野 桐"
            ],
            "pickOrder": [
              "稻叶 杏里",
              "林原 树里",
              "远野 桐/和泉 香织"
            ],
            "notes": [
              "社区多认为偏早期开荒，但对强势期长度说法不一（3 天~1 周不等），不宜据此投入全部自选/钻石（725488）。",
              "皆川偏减价；林原、稻叶围绕小游戏增益；远野需带加成的小游戏选项（725396）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1023",
      "contentId": 725364,
      "entryId": null,
      "name": "清水 万里",
      "aliases": [],
      "title": "内线辅助",
      "titleSource": "official",
      "rarity": "SR",
      "stars": null,
      "role": "控卫",
      "style": "篮板手",
      "school": "圣菲洛斯公学",
      "heightCm": 176,
      "weightKg": 59,
      "spanCm": null,
      "tags": [],
      "roles": [
        "篮板手"
      ],
      "stats": {
        "投射": 168,
        "攻筐": 209,
        "防投": 154,
        "护筐": 155,
        "传球": 181,
        "突破": 226
      },
      "potentials": [
        {
          "slot": 1,
          "value": 137
        },
        {
          "slot": 2,
          "value": 222
        },
        {
          "slot": 3,
          "value": 110
        },
        {
          "slot": 4,
          "value": 112
        },
        {
          "slot": 5,
          "value": 165
        },
        {
          "slot": 6,
          "value": 254
        }
      ],
      "skills": [
        {
          "name": "女王的棋局",
          "type": "固定",
          "summary": "我方大前和中锋获得强化：大幅提升弹跳属性 (受清水弹跳影响) ，持续2分钟",
          "levels": [
            {
              "level": 1,
              "desc": "我方大前和中锋获得强化：大幅提升弹跳属性 (受清水弹跳影响) ，持续2分钟",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "节奏掌控者",
          "type": "额外",
          "summary": "传球成功时，中幅提升接球队友 上篮和扣篮抗干扰能力（受清水意识影响），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "传球成功时，中幅提升接球队友 上篮和扣篮抗干扰能力（受清水意识影响），持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "styleDesc": "敏锐的篮板嗅觉，在争夺篮板球上总能抢占先机。",
      "positionDesc": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "source": "https://www.gamekee.com/lqsn/725364.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:10",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725364.png",
      "thumb": "assets/portraits/725364.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725364.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 168,
          "攻筐": 209,
          "防投": 154,
          "护筐": 155,
          "传球": 181,
          "突破": 226
        },
        "potentials": [
          {
            "slot": 1,
            "value": 137
          },
          {
            "slot": 2,
            "value": 222
          },
          {
            "slot": 3,
            "value": 110
          },
          {
            "slot": 4,
            "value": 112
          },
          {
            "slot": 5,
            "value": 165
          },
          {
            "slot": 6,
            "value": 254
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "控卫球员全属性+20%",
        "控卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725364,
        "functionalTags": [
          "模板·突破/持球",
          "模板·内线终结",
          "技能·突破",
          "技能·团队增益",
          "技能·空间/外线",
          "技能·进攻",
          "技能·防守",
          "技能·组织"
        ],
        "roleSummary": "控卫·突破+攻筐型；技能偏向 团队增益",
        "positionRank": {
          "rank": 3,
          "total": 9
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 188.5,
            "base_z": -0.53,
            "base_pct": 26.3,
            "growth_raw": 179.5,
            "growth_z": 0.049,
            "growth_pct": 22.4
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 168,
            "base_z": -0.668,
            "base_pct": 39.5,
            "growth_raw": 137,
            "growth_z": -0.438,
            "growth_pct": 46.1
          },
          "defense": {
            "label": "防守",
            "base_raw": 154.5,
            "base_z": -1.382,
            "base_pct": 7.9,
            "growth_raw": 111,
            "growth_z": -1.309,
            "growth_pct": 6.6
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 181,
            "base_z": -0.19,
            "base_pct": 51.3,
            "growth_raw": 165,
            "growth_z": 0.145,
            "growth_pct": 71.1
          },
          "drive": {
            "label": "突破",
            "base_raw": 219.2,
            "base_z": 1.056,
            "base_pct": 75,
            "growth_raw": 241.2,
            "growth_z": 2.179,
            "growth_pct": 98.7
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 187.4,
            "base_z": -0.426,
            "base_pct": 38.2,
            "growth_raw": 178,
            "growth_z": -0.079,
            "growth_pct": 52.6
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 45.29,
            "base_z": -1.52,
            "base_pct": 11.8,
            "growth_raw": 45.29,
            "growth_z": -1.52,
            "growth_pct": 11.8
          },
          "base_position_weighted": {
            "raw": -0.31,
            "pct": 11.8
          },
          "growth_position_weighted": {
            "raw": 0.132,
            "pct": 32.9
          },
          "panel_combined": {
            "raw": 20.26,
            "pct": 10.5,
            "rank": 34
          },
          "skill_value": {
            "raw": 14.49,
            "pct": 93.4,
            "rank": 3
          },
          "overall": {
            "raw": 38.55,
            "pct": 32.9,
            "rank": 26
          }
        },
        "attributeSum": 1093,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "控卫-T12",
          "name": "控卫·突破+攻筐型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [
          {
            "talent": "道具升级（商品品质）",
            "category": "",
            "note": "SR 版；与 SSR 羽田同名天赋不叠加",
            "confidence": "待验证",
            "source": 725602
          }
        ],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 26,
        "identicalAttrGroup": null,
        "streamRoles": []
      }
    },
    {
      "id": "player_1024",
      "contentId": 725366,
      "entryId": null,
      "name": "榎本 纯那",
      "aliases": [],
      "title": "上篮达人",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "中锋",
      "style": "防守者",
      "school": "圣菲洛斯公学",
      "heightCm": 181,
      "weightKg": 80,
      "spanCm": null,
      "tags": [],
      "roles": [
        "防守者"
      ],
      "stats": {
        "投射": 161,
        "攻筐": 250,
        "防投": 180,
        "护筐": 235,
        "传球": 167,
        "突破": 200
      },
      "potentials": [
        {
          "slot": 1,
          "value": 100
        },
        {
          "slot": 2,
          "value": 260
        },
        {
          "slot": 3,
          "value": 130
        },
        {
          "slot": 4,
          "value": 233
        },
        {
          "slot": 5,
          "value": 110
        },
        {
          "slot": 6,
          "value": 167
        }
      ],
      "skills": [
        {
          "name": "帝王冲击",
          "type": "固定",
          "summary": "对方大前和中锋获得弱化：中幅降低意识和防守属性（受榎本弹跳影响），持续2分钟",
          "levels": [
            {
              "level": 1,
              "desc": "对方大前和中锋获得弱化：中幅降低意识和防守属性（受榎本弹跳影响），持续2分钟",
              "energyCost": 80,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "王牌的余裕",
          "type": "额外",
          "summary": "上篮或扣篮命中后，中幅提升自身篮板能力(受榎本体能影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "上篮或扣篮命中后，中幅提升自身篮板能力(受榎本体能影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "styleDesc": "优越的防守意识，在防守上有独特的优势。",
      "positionDesc": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "source": "https://www.gamekee.com/lqsn/725366.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:10",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725366.png",
      "thumb": "assets/portraits/725366.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725366.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 161,
          "攻筐": 250,
          "防投": 180,
          "护筐": 235,
          "传球": 167,
          "突破": 200
        },
        "potentials": [
          {
            "slot": 1,
            "value": 100
          },
          {
            "slot": 2,
            "value": 260
          },
          {
            "slot": 3,
            "value": 130
          },
          {
            "slot": 4,
            "value": 233
          },
          {
            "slot": 5,
            "value": 110
          },
          {
            "slot": 6,
            "value": 167
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "中锋球员全属性+20%",
        "中锋球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725366,
        "functionalTags": [
          "模板·内线终结",
          "模板·护筐/篮板",
          "技能·防守",
          "技能·突破",
          "技能·弱化/干扰",
          "技能·进攻",
          "技能·篮板（代理）",
          "技能·自我增益"
        ],
        "roleSummary": "中锋·攻筐+护筐型；技能偏向 弱化/干扰/自我增益",
        "positionRank": {
          "rank": 3,
          "total": 8
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 205.5,
            "base_z": 0.4,
            "base_pct": 55.3,
            "growth_raw": 180,
            "growth_z": 0.071,
            "growth_pct": 36.8
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 161,
            "base_z": -0.89,
            "base_pct": 21.1,
            "growth_raw": 100,
            "growth_z": -1.126,
            "growth_pct": 9.2
          },
          "defense": {
            "label": "防守",
            "base_raw": 207.5,
            "base_z": 1.012,
            "base_pct": 82.9,
            "growth_raw": 181.5,
            "growth_z": 0.884,
            "growth_pct": 76.3
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 167,
            "base_z": -0.675,
            "base_pct": 19.7,
            "growth_raw": 110,
            "growth_z": -0.921,
            "growth_pct": 10.5
          },
          "drive": {
            "label": "突破",
            "base_raw": 220,
            "base_z": 1.105,
            "base_pct": 84.2,
            "growth_raw": 204.2,
            "growth_z": 0.712,
            "growth_pct": 72.4
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 244,
            "base_z": 1.508,
            "base_pct": 92.1,
            "growth_raw": 249.2,
            "growth_z": 1.405,
            "growth_pct": 89.5
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 79.24,
            "base_z": 0.833,
            "base_pct": 71.1,
            "growth_raw": 79.24,
            "growth_z": 0.833,
            "growth_pct": 71.1
          },
          "base_position_weighted": {
            "raw": 0.886,
            "pct": 89.5
          },
          "growth_position_weighted": {
            "raw": 0.707,
            "pct": 89.5
          },
          "panel_combined": {
            "raw": 89.47,
            "pct": 94.7,
            "rank": 3
          },
          "skill_value": {
            "raw": 4.2,
            "pct": 34.2,
            "rank": 25
          },
          "overall": {
            "raw": 75.66,
            "pct": 89.5,
            "rank": 5
          }
        },
        "attributeSum": 1193,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "中锋-T01",
          "name": "中锋·攻筐+护筐型",
          "shared": true,
          "sameTemplatePlayers": [
            "亚理纱 贾斯敏(SR)",
            "绿川 步梦(SR)",
            "千圣·贝尔丝(SSR)"
          ]
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": "T2",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 5,
        "identicalAttrGroup": {
          "template_id": "中锋-T01",
          "rarity": "SSR",
          "peers": [
            "千圣·贝尔丝"
          ],
          "note": "同模板同稀有度 → 属性完全相同；差异仅在技能/流派天赋"
        },
        "streamRoles": [
          {
            "stream": "训练流",
            "exampleTeam": [
              "克拉丽丝·波洛",
              "闪堂电",
              "望月 透",
              "佐久间 雨乃",
              "亚理纱 贾斯敏"
            ],
            "pickOrder": [
              "望月 透",
              "藤松 玖怜",
              "佐久间 雨乃",
              "榎本 纯那",
              "真崎 辉世"
            ],
            "notes": [
              "社区自选顺序（725397）：望月、藤松（原文写作「腾松」）、佐久间，再到榎本或真崎；但开荒帖提醒望月依赖精力条件、佐久间前期更易发挥。",
              "本条为「同功能位替代」而非数值叠乘：望月/藤松/佐久间被同一作者放在训练流优先序列，属竞争位，不应同时按名单无脑三选三。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1025",
      "contentId": 725367,
      "entryId": null,
      "name": "春澄 永远",
      "aliases": [],
      "title": "客户端称号未展示（可选称号未通过平台审核）",
      "titleSource": "editor_note",
      "rarity": "SR",
      "stars": null,
      "role": "大前",
      "style": "篮板手",
      "school": "圣菲洛斯公学",
      "heightCm": 178,
      "weightKg": 73,
      "spanCm": null,
      "tags": [],
      "roles": [
        "篮板手"
      ],
      "stats": {
        "投射": 154,
        "攻筐": 227,
        "防投": 166,
        "护筐": 229,
        "传球": 155,
        "突破": 160
      },
      "potentials": [
        {
          "slot": 1,
          "value": 109
        },
        {
          "slot": 2,
          "value": 257
        },
        {
          "slot": 3,
          "value": 135
        },
        {
          "slot": 4,
          "value": 261
        },
        {
          "slot": 5,
          "value": 115
        },
        {
          "slot": 6,
          "value": 123
        }
      ],
      "skills": [
        {
          "name": "忠诚守护",
          "type": "固定",
          "summary": "小幅回复我方随机2名球员 耐力，并小幅提升其弹跳属性 (受春澄意识影响)，持续2分钟",
          "levels": [
            {
              "level": 1,
              "desc": "小幅回复我方随机2名球员 耐力，并小幅提升其弹跳属性 (受春澄意识影响)，持续2分钟",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "骑士冲锋",
          "type": "额外",
          "summary": "小幅提升自身进攻篮板能力(受春澄体能影响)。",
          "levels": [
            {
              "level": 1,
              "desc": "小幅提升自身进攻篮板能力(受春澄体能影响)。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "大前锋往往体格强壮，能在篮下发起强硬攻击且冲抢篮板",
      "styleDesc": "敏锐的篮板嗅觉，在争夺篮板球上总能抢占先机。",
      "positionDesc": "大前锋往往体格强壮，能在篮下发起强硬攻击且冲抢篮板",
      "source": "https://www.gamekee.com/lqsn/725367.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:10",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725367.png",
      "thumb": "assets/portraits/725367.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725367.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 154,
          "攻筐": 227,
          "防投": 166,
          "护筐": 229,
          "传球": 155,
          "突破": 160
        },
        "potentials": [
          {
            "slot": 1,
            "value": 109
          },
          {
            "slot": 2,
            "value": 257
          },
          {
            "slot": 3,
            "value": 135
          },
          {
            "slot": 4,
            "value": 261
          },
          {
            "slot": 5,
            "value": 115
          },
          {
            "slot": 6,
            "value": 123
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "大前球员全属性+20%",
        "大前球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725367,
        "functionalTags": [
          "模板·护筐/篮板",
          "模板·内线终结",
          "技能·突破",
          "技能·体能/耐久（代理）",
          "技能·耐久/能量资源",
          "技能·进攻",
          "技能·篮板（代理）",
          "技能·自我增益"
        ],
        "roleSummary": "大前·护筐+攻筐型；技能偏向 耐久/能量资源/自我增益",
        "positionRank": {
          "rank": 5,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 190.5,
            "base_z": -0.421,
            "base_pct": 36.8,
            "growth_raw": 183,
            "growth_z": 0.206,
            "growth_pct": 56.6
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 154,
            "base_z": -1.113,
            "base_pct": 13.2,
            "growth_raw": 109,
            "growth_z": -0.959,
            "growth_pct": 23.7
          },
          "defense": {
            "label": "防守",
            "base_raw": 197.5,
            "base_z": 0.561,
            "base_pct": 65.8,
            "growth_raw": 198,
            "growth_z": 1.397,
            "growth_pct": 93.4
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 155,
            "base_z": -1.091,
            "base_pct": 13.2,
            "growth_raw": 115,
            "growth_z": -0.824,
            "growth_pct": 30.3
          },
          "drive": {
            "label": "突破",
            "base_raw": 186.8,
            "base_z": -0.921,
            "base_pct": 28.9,
            "growth_raw": 176.6,
            "growth_z": -0.381,
            "growth_pct": 26.3
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 227.8,
            "base_z": 0.954,
            "base_pct": 85.5,
            "growth_raw": 258.6,
            "growth_z": 1.601,
            "growth_pct": 97.4
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 87.04,
            "base_z": 1.374,
            "base_pct": 89.5,
            "growth_raw": 87.04,
            "growth_z": 1.374,
            "growth_pct": 89.5
          },
          "base_position_weighted": {
            "raw": 0.209,
            "pct": 40.8
          },
          "growth_position_weighted": {
            "raw": 0.812,
            "pct": 97.4
          },
          "panel_combined": {
            "raw": 63.42,
            "pct": 72.4,
            "rank": 11
          },
          "skill_value": {
            "raw": 4.15,
            "pct": 27.6,
            "rank": 28
          },
          "overall": {
            "raw": 54.47,
            "pct": 59.2,
            "rank": 16
          }
        },
        "attributeSum": 1091,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "大前-T04",
          "name": "大前·护筐+攻筐型",
          "shared": true,
          "sameTemplatePlayers": [
            "佐久间 雨乃(SSR)"
          ]
        },
        "knownStreamTalents": [
          {
            "talent": "再买一个（额外购买）",
            "category": "",
            "note": "SR 版；与 SSR 羽濑川同名天赋不叠加",
            "confidence": "待验证",
            "source": 725602
          }
        ],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 16,
        "identicalAttrGroup": null,
        "streamRoles": []
      }
    },
    {
      "id": "player_1026",
      "contentId": 725368,
      "entryId": null,
      "name": "森田 莉莉",
      "aliases": [],
      "title": "得分手",
      "titleSource": "official",
      "rarity": "R",
      "stars": null,
      "role": "控卫",
      "style": "得分手",
      "school": "北空之丘女高",
      "heightCm": 158,
      "weightKg": 44,
      "spanCm": null,
      "tags": [],
      "roles": [
        "得分手"
      ],
      "stats": {
        "投射": 150,
        "攻筐": 148,
        "防投": 140,
        "护筐": 140,
        "传球": 192,
        "突破": 192
      },
      "potentials": [
        {
          "slot": 1,
          "value": 137
        },
        {
          "slot": 2,
          "value": 132
        },
        {
          "slot": 3,
          "value": 110
        },
        {
          "slot": 4,
          "value": 112
        },
        {
          "slot": 5,
          "value": 255
        },
        {
          "slot": 6,
          "value": 254
        }
      ],
      "skills": [
        {
          "name": "元气突破",
          "type": "固定",
          "summary": "",
          "levels": [
            {
              "level": 1,
              "desc": "",
              "energyCost": 100,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "全神贯注",
          "type": "额外",
          "summary": "小幅提升自身意识属性",
          "levels": [
            {
              "level": 1,
              "desc": "小幅提升自身意识属性",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "styleDesc": "强烈的进攻欲望，承担了队伍中的大多的得分任务。",
      "positionDesc": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "source": "https://www.gamekee.com/lqsn/725368.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:10",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725368.png",
      "thumb": "assets/portraits/725368.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725368.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 150,
          "攻筐": 148,
          "防投": 140,
          "护筐": 140,
          "传球": 192,
          "突破": 192
        },
        "potentials": [
          {
            "slot": 1,
            "value": 137
          },
          {
            "slot": 2,
            "value": 132
          },
          {
            "slot": 3,
            "value": 110
          },
          {
            "slot": 4,
            "value": 112
          },
          {
            "slot": 5,
            "value": 255
          },
          {
            "slot": 6,
            "value": 254
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "控卫球员全属性+20%",
        "控卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725368,
        "functionalTags": [
          "模板·组织",
          "模板·突破/持球",
          "技能·自我增益"
        ],
        "roleSummary": "控卫·传球+突破型；技能偏向 自我增益",
        "positionRank": {
          "rank": 9,
          "total": 9
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 149,
            "base_z": -2.692,
            "base_pct": 1.3,
            "growth_raw": 134.5,
            "growth_z": -1.974,
            "growth_pct": 6.6
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 150,
            "base_z": -1.24,
            "base_pct": 6.6,
            "growth_raw": 137,
            "growth_z": -0.438,
            "growth_pct": 46.1
          },
          "defense": {
            "label": "防守",
            "base_raw": 140,
            "base_z": -2.037,
            "base_pct": 1.3,
            "growth_raw": 111,
            "growth_z": -1.309,
            "growth_pct": 6.6
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 192,
            "base_z": 0.191,
            "base_pct": 67.1,
            "growth_raw": 255,
            "growth_z": 1.891,
            "growth_pct": 94.7
          },
          "drive": {
            "label": "突破",
            "base_raw": 174.4,
            "base_z": -1.678,
            "base_pct": 6.6,
            "growth_raw": 205.2,
            "growth_z": 0.752,
            "growth_pct": 88.2
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 144.8,
            "base_z": -1.882,
            "base_pct": 1.3,
            "growth_raw": 124,
            "growth_z": -1.205,
            "growth_pct": 19.7
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 44.05,
            "base_z": -1.606,
            "base_pct": 3.9,
            "growth_raw": 44.05,
            "growth_z": -1.606,
            "growth_pct": 3.9
          },
          "base_position_weighted": {
            "raw": -1.192,
            "pct": 3.9
          },
          "growth_position_weighted": {
            "raw": 0.103,
            "pct": 22.4
          },
          "panel_combined": {
            "raw": 11.32,
            "pct": 1.3,
            "rank": 38
          },
          "skill_value": {
            "raw": 2.5,
            "pct": 3.9,
            "rank": 36
          },
          "overall": {
            "raw": 9.47,
            "pct": 1.3,
            "rank": 38
          }
        },
        "attributeSum": 962,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "控卫-T03",
          "name": "控卫·传球+突破型",
          "shared": true,
          "sameTemplatePlayers": [
            "和泉 香织(SSR)",
            "克拉丽丝·波洛(SR)"
          ]
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 38,
        "identicalAttrGroup": null,
        "streamRoles": []
      }
    },
    {
      "id": "player_1027",
      "contentId": 725369,
      "entryId": null,
      "name": "美伽 未来",
      "aliases": [],
      "title": "防守者",
      "titleSource": "official",
      "rarity": "R",
      "stars": null,
      "role": "分卫",
      "style": "组织者",
      "school": "北空之丘女高",
      "heightCm": 165,
      "weightKg": 57,
      "spanCm": null,
      "tags": [],
      "roles": [
        "组织者"
      ],
      "stats": {
        "投射": 162,
        "攻筐": 176,
        "防投": 142,
        "护筐": 140,
        "传球": 150,
        "突破": 190
      },
      "potentials": [
        {
          "slot": 1,
          "value": 170
        },
        {
          "slot": 2,
          "value": 212
        },
        {
          "slot": 3,
          "value": 118
        },
        {
          "slot": 4,
          "value": 110
        },
        {
          "slot": 5,
          "value": 140
        },
        {
          "slot": 6,
          "value": 250
        }
      ],
      "skills": [
        {
          "name": "柔和上篮",
          "type": "固定",
          "summary": "",
          "levels": [
            {
              "level": 1,
              "desc": "",
              "energyCost": 100,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "轻装上阵",
          "type": "额外",
          "summary": "小幅提升自身弹跳属性",
          "levels": [
            {
              "level": 1,
              "desc": "小幅提升自身弹跳属性",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "得分后卫通常拥有很强的投射能力，在外线为队伍贡献得分",
      "styleDesc": "球场指挥官，能让队伍完美执行战术，提升得分效率。",
      "positionDesc": "得分后卫通常拥有很强的投射能力，在外线为队伍贡献得分",
      "source": "https://www.gamekee.com/lqsn/725369.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:10",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725369.png",
      "thumb": "assets/portraits/725369.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725369.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 162,
          "攻筐": 176,
          "防投": 142,
          "护筐": 140,
          "传球": 150,
          "突破": 190
        },
        "potentials": [
          {
            "slot": 1,
            "value": 170
          },
          {
            "slot": 2,
            "value": 212
          },
          {
            "slot": 3,
            "value": 118
          },
          {
            "slot": 4,
            "value": 110
          },
          {
            "slot": 5,
            "value": 140
          },
          {
            "slot": 6,
            "value": 250
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
        "分卫球员全属性+20%",
        "分卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725369,
        "functionalTags": [
          "模板·突破/持球",
          "模板·内线终结",
          "技能·自我增益",
          "技能·突破"
        ],
        "roleSummary": "分卫·突破+攻筐型；技能偏向 自我增益",
        "positionRank": {
          "rank": 7,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 169,
            "base_z": -1.597,
            "base_pct": 9.2,
            "growth_raw": 191,
            "growth_z": 0.565,
            "growth_pct": 73.7
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 162,
            "base_z": -0.859,
            "base_pct": 27.6,
            "growth_raw": 170,
            "growth_z": 0.177,
            "growth_pct": 60.5
          },
          "defense": {
            "label": "防守",
            "base_raw": 141,
            "base_z": -1.992,
            "base_pct": 3.9,
            "growth_raw": 114,
            "growth_z": -1.216,
            "growth_pct": 21.1
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 150,
            "base_z": -1.264,
            "base_pct": 3.9,
            "growth_raw": 140,
            "growth_z": -0.339,
            "growth_pct": 44.7
          },
          "drive": {
            "label": "突破",
            "base_raw": 184.4,
            "base_z": -1.068,
            "base_pct": 11.8,
            "growth_raw": 234.8,
            "growth_z": 1.925,
            "growth_pct": 96.1
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 161.6,
            "base_z": -1.308,
            "base_pct": 11.8,
            "growth_raw": 171.2,
            "growth_z": -0.221,
            "growth_pct": 47.4
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 53.1,
            "base_z": -0.979,
            "base_pct": 25,
            "growth_raw": 53.1,
            "growth_z": -0.979,
            "growth_pct": 25
          },
          "base_position_weighted": {
            "raw": -1.257,
            "pct": 1.3
          },
          "growth_position_weighted": {
            "raw": 0.268,
            "pct": 48.7
          },
          "panel_combined": {
            "raw": 20.26,
            "pct": 10.5,
            "rank": 35
          },
          "skill_value": {
            "raw": 2.5,
            "pct": 3.9,
            "rank": 37
          },
          "overall": {
            "raw": 16.18,
            "pct": 3.9,
            "rank": 37
          }
        },
        "attributeSum": 960,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "分卫-T16",
          "name": "分卫·突破+攻筐型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 37,
        "identicalAttrGroup": null,
        "streamRoles": []
      }
    },
    {
      "id": "player_1028",
      "contentId": 725370,
      "entryId": null,
      "name": "五十岚 诗音",
      "aliases": [],
      "title": "得分手",
      "titleSource": "official",
      "rarity": "R",
      "stars": null,
      "role": "中锋",
      "style": "防守者",
      "school": "北空之丘女高",
      "heightCm": 181,
      "weightKg": 77,
      "spanCm": null,
      "tags": [],
      "roles": [
        "防守者"
      ],
      "stats": {
        "投射": 136,
        "攻筐": 194,
        "防投": 180,
        "护筐": 152,
        "传球": 140,
        "突破": 160
      },
      "potentials": [
        {
          "slot": 1,
          "value": 100
        },
        {
          "slot": 2,
          "value": 260
        },
        {
          "slot": 3,
          "value": 220
        },
        {
          "slot": 4,
          "value": 143
        },
        {
          "slot": 5,
          "value": 110
        },
        {
          "slot": 6,
          "value": 167
        }
      ],
      "skills": [
        {
          "name": "认真盖帽",
          "type": "固定",
          "summary": "",
          "levels": [
            {
              "level": 1,
              "desc": "",
              "energyCost": 100,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "坚石的架式",
          "type": "额外",
          "summary": "小幅提升自身防守属性",
          "levels": [
            {
              "level": 1,
              "desc": "小幅提升自身防守属性",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "styleDesc": "优越的防守意识，在防守上有独特的优势。",
      "positionDesc": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "source": "https://www.gamekee.com/lqsn/725370.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:10",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725370.png",
      "thumb": "assets/portraits/725370.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725370.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 136,
          "攻筐": 194,
          "防投": 180,
          "护筐": 152,
          "传球": 140,
          "突破": 160
        },
        "potentials": [
          {
            "slot": 1,
            "value": 100
          },
          {
            "slot": 2,
            "value": 260
          },
          {
            "slot": 3,
            "value": 220
          },
          {
            "slot": 4,
            "value": 143
          },
          {
            "slot": 5,
            "value": 110
          },
          {
            "slot": 6,
            "value": 167
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "中锋球员全属性+20%",
        "中锋球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725370,
        "functionalTags": [
          "模板·内线终结",
          "模板·外线防守",
          "技能·自我增益",
          "技能·防守"
        ],
        "roleSummary": "中锋·攻筐+防投型；技能偏向 自我增益",
        "positionRank": {
          "rank": 8,
          "total": 8
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 165,
            "base_z": -1.816,
            "base_pct": 3.9,
            "growth_raw": 180,
            "growth_z": 0.071,
            "growth_pct": 36.8
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 136,
            "base_z": -1.684,
            "base_pct": 1.3,
            "growth_raw": 100,
            "growth_z": -1.126,
            "growth_pct": 9.2
          },
          "defense": {
            "label": "防守",
            "base_raw": 166,
            "base_z": -0.863,
            "base_pct": 19.7,
            "growth_raw": 181.5,
            "growth_z": 0.884,
            "growth_pct": 76.3
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 140,
            "base_z": -1.61,
            "base_pct": 1.3,
            "growth_raw": 110,
            "growth_z": -0.921,
            "growth_pct": 10.5
          },
          "drive": {
            "label": "突破",
            "base_raw": 173.6,
            "base_z": -1.727,
            "base_pct": 3.9,
            "growth_raw": 204.2,
            "growth_z": 0.712,
            "growth_pct": 72.4
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 177.2,
            "base_z": -0.775,
            "base_pct": 35.5,
            "growth_raw": 213.2,
            "growth_z": 0.654,
            "growth_pct": 72.4
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 79.72,
            "base_z": 0.867,
            "base_pct": 80.3,
            "growth_raw": 79.72,
            "growth_z": 0.867,
            "growth_pct": 80.3
          },
          "base_position_weighted": {
            "raw": -0.987,
            "pct": 6.6
          },
          "growth_position_weighted": {
            "raw": 0.523,
            "pct": 72.4
          },
          "panel_combined": {
            "raw": 32.89,
            "pct": 28.9,
            "rank": 28
          },
          "skill_value": {
            "raw": 2.5,
            "pct": 3.9,
            "rank": 38
          },
          "overall": {
            "raw": 25.66,
            "pct": 11.8,
            "rank": 34
          }
        },
        "attributeSum": 962,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "中锋-T02",
          "name": "中锋·攻筐+防投型",
          "shared": true,
          "sameTemplatePlayers": [
            "洺瑶(SSR)",
            "希雅·奥黛拉(SSR)"
          ]
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 34,
        "identicalAttrGroup": null,
        "streamRoles": []
      }
    },
    {
      "id": "player_1029",
      "contentId": 725371,
      "entryId": null,
      "name": "羽濑川 湊",
      "aliases": [],
      "title": "得分手",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "小前",
      "style": "篮板手",
      "school": "圣菲洛斯公学",
      "heightCm": 173,
      "weightKg": 74,
      "spanCm": null,
      "tags": [],
      "roles": [
        "篮板手"
      ],
      "stats": {
        "投射": 179,
        "攻筐": 250,
        "防投": 216,
        "护筐": 183,
        "传球": 189,
        "突破": 176
      },
      "potentials": [
        {
          "slot": 1,
          "value": 130
        },
        {
          "slot": 2,
          "value": 260
        },
        {
          "slot": 3,
          "value": 198
        },
        {
          "slot": 4,
          "value": 139
        },
        {
          "slot": 5,
          "value": 150
        },
        {
          "slot": 6,
          "value": 123
        }
      ],
      "skills": [
        {
          "name": "绯刃裁决",
          "type": "固定",
          "summary": "我方分卫和小前获得强化：小幅提升上篮命中率(空位出手时提升为中幅)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "我方分卫和小前获得强化：小幅提升上篮命中率(空位出手时提升为中幅)，持续2分钟。",
              "energyCost": 80,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "铁血执行者",
          "type": "额外",
          "summary": "我方任意队友突破成功后，中幅提升 羽濑川凑 的上篮威力(受羽濑川防守影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "我方任意队友突破成功后，中幅提升 羽濑川凑 的上篮威力(受羽濑川防守影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "小前锋是游戏中重要的得分者，擅长多样化的得分手段",
      "styleDesc": "敏锐的篮板嗅觉，在争夺篮板球上总能抢占先机。",
      "positionDesc": "小前锋是游戏中重要的得分者，擅长多样化的得分手段",
      "source": "https://www.gamekee.com/lqsn/725371.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:10",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725371.png",
      "thumb": "assets/portraits/725371.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725371.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 179,
          "攻筐": 250,
          "防投": 216,
          "护筐": 183,
          "传球": 189,
          "突破": 176
        },
        "potentials": [
          {
            "slot": 1,
            "value": 130
          },
          {
            "slot": 2,
            "value": 260
          },
          {
            "slot": 3,
            "value": 198
          },
          {
            "slot": 4,
            "value": 139
          },
          {
            "slot": 5,
            "value": 150
          },
          {
            "slot": 6,
            "value": 123
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
        "小前球员全属性+20%",
        "小前球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725371,
        "functionalTags": [
          "模板·内线终结",
          "模板·外线防守",
          "技能·空间/外线",
          "技能·进攻",
          "技能·团队增益",
          "技能·防守",
          "技能·突破"
        ],
        "roleSummary": "小前·攻筐+防投型；技能偏向 团队增益",
        "positionRank": {
          "rank": 3,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 214.5,
            "base_z": 0.893,
            "base_pct": 88.2,
            "growth_raw": 195,
            "growth_z": 0.745,
            "growth_pct": 89.5
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 179,
            "base_z": -0.318,
            "base_pct": 43.4,
            "growth_raw": 130,
            "growth_z": -0.568,
            "growth_pct": 32.9
          },
          "defense": {
            "label": "防守",
            "base_raw": 199.5,
            "base_z": 0.651,
            "base_pct": 71.1,
            "growth_raw": 168.5,
            "growth_z": 0.479,
            "growth_pct": 60.5
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 189,
            "base_z": 0.088,
            "base_pct": 60.5,
            "growth_raw": 150,
            "growth_z": -0.145,
            "growth_pct": 57.9
          },
          "drive": {
            "label": "突破",
            "base_raw": 205.6,
            "base_z": 0.226,
            "base_pct": 56.6,
            "growth_raw": 177.8,
            "growth_z": -0.334,
            "growth_pct": 36.8
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 223.2,
            "base_z": 0.797,
            "base_pct": 71.1,
            "growth_raw": 211.6,
            "growth_z": 0.621,
            "growth_pct": 64.5
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 73.17,
            "base_z": 0.412,
            "base_pct": 60.5,
            "growth_raw": 73.17,
            "growth_z": 0.412,
            "growth_pct": 60.5
          },
          "base_position_weighted": {
            "raw": 0.427,
            "pct": 56.6
          },
          "growth_position_weighted": {
            "raw": 0.174,
            "pct": 39.5
          },
          "panel_combined": {
            "raw": 49.74,
            "pct": 53.9,
            "rank": 18
          },
          "skill_value": {
            "raw": 13.8,
            "pct": 89.5,
            "rank": 5
          },
          "overall": {
            "raw": 59.67,
            "pct": 67.1,
            "rank": 13
          }
        },
        "attributeSum": 1193,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "小前-T06",
          "name": "小前·攻筐+防投型",
          "shared": true,
          "sameTemplatePlayers": [
            "皆川 式(SR)"
          ]
        },
        "knownStreamTalents": [
          {
            "talent": "再买一个（额外购买）",
            "category": "",
            "note": "SSR 版；与 SR 春澄同名天赋不叠加",
            "confidence": "待验证",
            "source": 725602
          }
        ],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": "T0",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": "T2",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 13,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "扭蛋流",
            "exampleTeam": [
              "先斗 月绮",
              "卧云 真昼",
              "羽濑川 湊",
              "近江 奏",
              "千圣·贝尔丝"
            ],
            "pickOrder": [
              "羽濑川 湊",
              "千圣·贝尔丝",
              "卧云 真昼"
            ],
            "notes": [
              "同名天赋「再买一个」：SSR 羽濑川 与 SR 春澄 永远 不能同时生效（725602），同队占两个位置不叠加收益。",
              "先检查额外购买、减价与直接增益是否齐全；卧云偏后期（725397）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1030",
      "contentId": 725372,
      "entryId": null,
      "name": "真崎 辉世",
      "aliases": [],
      "title": "得分手",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "控卫",
      "style": "得分手",
      "school": "圣菲洛斯公学",
      "heightCm": 166,
      "weightKg": 57,
      "spanCm": null,
      "tags": [],
      "roles": [
        "得分手"
      ],
      "stats": {
        "投射": 201,
        "攻筐": 174,
        "防投": 172,
        "护筐": 167,
        "传球": 234,
        "突破": 245
      },
      "potentials": [
        {
          "slot": 1,
          "value": 170
        },
        {
          "slot": 2,
          "value": 122
        },
        {
          "slot": 3,
          "value": 118
        },
        {
          "slot": 4,
          "value": 110
        },
        {
          "slot": 5,
          "value": 230
        },
        {
          "slot": 6,
          "value": 250
        }
      ],
      "skills": [
        {
          "name": "瞬步潜行",
          "type": "固定",
          "summary": "自身获得强化：中幅提升突破威力（真崎辉世看破次数越多，提升的突破威力越多），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "自身获得强化：中幅提升突破威力（真崎辉世看破次数越多，提升的突破威力越多），持续2分钟。",
              "energyCost": 80,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "节奏之星",
          "type": "额外",
          "summary": "突破成功后，小幅提升自身投射和弹跳属性(受真崎意识影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "突破成功后，小幅提升自身投射和弹跳属性(受真崎意识影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "styleDesc": "强烈的进攻欲望，承担了队伍中的大多的得分任务。",
      "positionDesc": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "source": "https://www.gamekee.com/lqsn/725372.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:10",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725372.png",
      "thumb": "assets/portraits/725372.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725372.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 201,
          "攻筐": 174,
          "防投": 172,
          "护筐": 167,
          "传球": 234,
          "突破": 245
        },
        "potentials": [
          {
            "slot": 1,
            "value": 170
          },
          {
            "slot": 2,
            "value": 122
          },
          {
            "slot": 3,
            "value": 118
          },
          {
            "slot": 4,
            "value": 110
          },
          {
            "slot": 5,
            "value": 230
          },
          {
            "slot": 6,
            "value": 250
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "控卫球员全属性+20%",
        "控卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725372,
        "functionalTags": [
          "模板·突破/持球",
          "模板·组织",
          "技能·防守",
          "技能·突破",
          "技能·自我增益",
          "技能·空间/外线"
        ],
        "roleSummary": "控卫·突破+传球型；技能偏向 自我增益",
        "positionRank": {
          "rank": 4,
          "total": 9
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 187.5,
            "base_z": -0.585,
            "base_pct": 21.1,
            "growth_raw": 146,
            "growth_z": -1.457,
            "growth_pct": 15.8
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 201,
            "base_z": 0.38,
            "base_pct": 61.8,
            "growth_raw": 170,
            "growth_z": 0.177,
            "growth_pct": 60.5
          },
          "defense": {
            "label": "防守",
            "base_raw": 169.5,
            "base_z": -0.704,
            "base_pct": 28.9,
            "growth_raw": 114,
            "growth_z": -1.216,
            "growth_pct": 21.1
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 234,
            "base_z": 1.647,
            "base_pct": 90.8,
            "growth_raw": 230,
            "growth_z": 1.406,
            "growth_pct": 81.6
          },
          "drive": {
            "label": "突破",
            "base_raw": 216.6,
            "base_z": 0.898,
            "base_pct": 71.1,
            "growth_raw": 198.8,
            "growth_z": 0.498,
            "growth_pct": 59.2
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 171.2,
            "base_z": -0.98,
            "base_pct": 18.4,
            "growth_raw": 117.2,
            "growth_z": -1.347,
            "growth_pct": 6.6
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 52.36,
            "base_z": -1.031,
            "base_pct": 22.4,
            "growth_raw": 52.36,
            "growth_z": -1.031,
            "growth_pct": 22.4
          },
          "base_position_weighted": {
            "raw": 0.45,
            "pct": 59.2
          },
          "growth_position_weighted": {
            "raw": 0.11,
            "pct": 27.6
          },
          "panel_combined": {
            "raw": 46.58,
            "pct": 48.7,
            "rank": 20
          },
          "skill_value": {
            "raw": 3,
            "pct": 11.8,
            "rank": 34
          },
          "overall": {
            "raw": 37.89,
            "pct": 30.3,
            "rank": 27
          }
        },
        "attributeSum": 1193,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "控卫-T14",
          "name": "控卫·突破+传球型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [],
        "trainingTalents": [
          {
            "talent": "表情一致倍率 = 2.5 + 0.25 = 2.75（6 格一致示例 803% 的组成部分）",
            "category": "表情（训练爆发）",
            "note": "",
            "confidence": "实测（内测）",
            "source": "https://www.taptap.cn/moment/805700735671995246"
          }
        ],
        "communityTrainingTier": {
          "tier": "T1",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": "T2",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 27,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "训练流",
            "exampleTeam": [
              "克拉丽丝·波洛",
              "闪堂电",
              "望月 透",
              "佐久间 雨乃",
              "亚理纱 贾斯敏"
            ],
            "pickOrder": [
              "望月 透",
              "藤松 玖怜",
              "佐久间 雨乃",
              "榎本 纯那",
              "真崎 辉世"
            ],
            "notes": [
              "社区自选顺序（725397）：望月、藤松（原文写作「腾松」）、佐久间，再到榎本或真崎；但开荒帖提醒望月依赖精力条件、佐久间前期更易发挥。",
              "本条为「同功能位替代」而非数值叠乘：望月/藤松/佐久间被同一作者放在训练流优先序列，属竞争位，不应同时按名单无脑三选三。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1032",
      "contentId": 725373,
      "entryId": null,
      "name": "先斗 月绮",
      "aliases": [],
      "title": "得分手",
      "titleSource": "official",
      "rarity": "SR",
      "stars": null,
      "role": "控卫",
      "style": "防守者",
      "school": "私立苍骑学园",
      "heightCm": 168,
      "weightKg": 51,
      "spanCm": null,
      "tags": [],
      "roles": [
        "防守者"
      ],
      "stats": {
        "投射": 212,
        "攻筐": 165,
        "防投": 154,
        "护筐": 156,
        "传球": 224,
        "突破": 182
      },
      "potentials": [
        {
          "slot": 1,
          "value": 227
        },
        {
          "slot": 2,
          "value": 132
        },
        {
          "slot": 3,
          "value": 110
        },
        {
          "slot": 4,
          "value": 112
        },
        {
          "slot": 5,
          "value": 255
        },
        {
          "slot": 6,
          "value": 164
        }
      ],
      "skills": [
        {
          "name": "饱和抛射",
          "type": "固定",
          "summary": "自身获得强化：中幅提升抗干扰能力（受先斗运控影响），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "自身获得强化：中幅提升抗干扰能力（受先斗运控影响），持续2分钟。",
              "energyCost": 80,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "强力马达",
          "type": "额外",
          "summary": "我方任意球员中投得分时，中幅提升 先斗月绮 运控属性（受先斗投射影响），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "我方任意球员中投得分时，中幅提升 先斗月绮 运控属性（受先斗投射影响），持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "styleDesc": "优越的防守意识，在防守上有独特的优势。",
      "positionDesc": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "source": "https://www.gamekee.com/lqsn/725373.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:10",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725373.png",
      "thumb": "assets/portraits/725373.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725373.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 212,
          "攻筐": 165,
          "防投": 154,
          "护筐": 156,
          "传球": 224,
          "突破": 182
        },
        "potentials": [
          {
            "slot": 1,
            "value": 227
          },
          {
            "slot": 2,
            "value": 132
          },
          {
            "slot": 3,
            "value": 110
          },
          {
            "slot": 4,
            "value": 112
          },
          {
            "slot": 5,
            "value": 255
          },
          {
            "slot": 6,
            "value": 164
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "控卫球员全属性+20%",
        "控卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725373,
        "functionalTags": [
          "模板·组织",
          "模板·空间/投射",
          "技能·空间/外线",
          "技能·防守",
          "技能·突破",
          "技能·自我增益",
          "技能·进攻",
          "技能·团队增益"
        ],
        "roleSummary": "控卫·传球+投射型；技能偏向 自我增益/团队增益",
        "positionRank": {
          "rank": 5,
          "total": 9
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 188.5,
            "base_z": -0.53,
            "base_pct": 26.3,
            "growth_raw": 179.5,
            "growth_z": 0.049,
            "growth_pct": 22.4
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 212,
            "base_z": 0.73,
            "base_pct": 72.4,
            "growth_raw": 227,
            "growth_z": 1.238,
            "growth_pct": 88.2
          },
          "defense": {
            "label": "防守",
            "base_raw": 155,
            "base_z": -1.36,
            "base_pct": 11.8,
            "growth_raw": 111,
            "growth_z": -1.309,
            "growth_pct": 6.6
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 224,
            "base_z": 1.3,
            "base_pct": 80.3,
            "growth_raw": 255,
            "growth_z": 1.891,
            "growth_pct": 94.7
          },
          "drive": {
            "label": "突破",
            "base_raw": 175.2,
            "base_z": -1.629,
            "base_pct": 9.2,
            "growth_raw": 151.2,
            "growth_z": -1.388,
            "growth_pct": 17.1
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 161.4,
            "base_z": -1.314,
            "base_pct": 9.2,
            "growth_raw": 124,
            "growth_z": -1.205,
            "growth_pct": 19.7
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 45.05,
            "base_z": -1.537,
            "base_pct": 9.2,
            "growth_raw": 45.05,
            "growth_z": -1.537,
            "growth_pct": 9.2
          },
          "base_position_weighted": {
            "raw": -0.235,
            "pct": 19.7
          },
          "growth_position_weighted": {
            "raw": 0.136,
            "pct": 35.5
          },
          "panel_combined": {
            "raw": 26.05,
            "pct": 21.1,
            "rank": 30
          },
          "skill_value": {
            "raw": 8.9,
            "pct": 63.2,
            "rank": 15
          },
          "overall": {
            "raw": 35.33,
            "pct": 25,
            "rank": 29
          }
        },
        "attributeSum": 1093,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "控卫-T24",
          "name": "控卫·传球+投射型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": "T2",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 29,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "扭蛋流",
            "exampleTeam": [
              "先斗 月绮",
              "卧云 真昼",
              "羽濑川 湊",
              "近江 奏",
              "千圣·贝尔丝"
            ],
            "pickOrder": [
              "羽濑川 湊",
              "千圣·贝尔丝",
              "卧云 真昼"
            ],
            "notes": [
              "同名天赋「再买一个」：SSR 羽濑川 与 SR 春澄 永远 不能同时生效（725602），同队占两个位置不叠加收益。",
              "先检查额外购买、减价与直接增益是否齐全；卧云偏后期（725397）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1033",
      "contentId": 725374,
      "entryId": null,
      "name": "卧云 真昼",
      "aliases": [],
      "title": "辅助",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "分卫",
      "style": "组织者",
      "school": "私立苍骑学园",
      "heightCm": 173,
      "weightKg": 58,
      "spanCm": null,
      "tags": [],
      "roles": [
        "组织者"
      ],
      "stats": {
        "投射": 249,
        "攻筐": 174,
        "防投": 172,
        "护筐": 167,
        "传球": 234,
        "突破": 195
      },
      "potentials": [
        {
          "slot": 1,
          "value": 260
        },
        {
          "slot": 2,
          "value": 122
        },
        {
          "slot": 3,
          "value": 118
        },
        {
          "slot": 4,
          "value": 110
        },
        {
          "slot": 5,
          "value": 230
        },
        {
          "slot": 6,
          "value": 160
        }
      ],
      "skills": [
        {
          "name": "妖刀乱舞",
          "type": "固定",
          "summary": "对方分卫获得弱化：中幅降低防守属性（受卧云意识影响），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "对方分卫获得弱化：中幅降低防守属性（受卧云意识影响），持续2分钟。",
              "energyCost": 80,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "妖刀摄魂",
          "type": "额外",
          "summary": "我方任意队友突破成功后，卧云真昼中投威力中幅提升(受卧云投射影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "我方任意队友突破成功后，卧云真昼中投威力中幅提升(受卧云投射影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "得分后卫通常拥有很强的投射能力，在外线为队伍贡献得分",
      "styleDesc": "球场指挥官，能让队伍完美执行战术，提升得分效率。",
      "positionDesc": "得分后卫通常拥有很强的投射能力，在外线为队伍贡献得分",
      "source": "https://www.gamekee.com/lqsn/725374.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:10",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725374.png",
      "thumb": "assets/portraits/725374.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725374.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 249,
          "攻筐": 174,
          "防投": 172,
          "护筐": 167,
          "传球": 234,
          "突破": 195
        },
        "potentials": [
          {
            "slot": 1,
            "value": 260
          },
          {
            "slot": 2,
            "value": 122
          },
          {
            "slot": 3,
            "value": 118
          },
          {
            "slot": 4,
            "value": 110
          },
          {
            "slot": 5,
            "value": 230
          },
          {
            "slot": 6,
            "value": 160
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
        "分卫球员全属性+20%",
        "分卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725374,
        "functionalTags": [
          "模板·空间/投射",
          "模板·组织",
          "技能·防守",
          "技能·弱化/干扰",
          "技能·空间/外线",
          "技能·突破",
          "技能·团队增益"
        ],
        "roleSummary": "分卫·投射+传球型；技能偏向 弱化/干扰/团队增益",
        "positionRank": {
          "rank": 2,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 211.5,
            "base_z": 0.729,
            "base_pct": 78.9,
            "growth_raw": 191,
            "growth_z": 0.565,
            "growth_pct": 73.7
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 249,
            "base_z": 1.905,
            "base_pct": 97.4,
            "growth_raw": 260,
            "growth_z": 1.852,
            "growth_pct": 94.7
          },
          "defense": {
            "label": "防守",
            "base_raw": 169.5,
            "base_z": -0.704,
            "base_pct": 28.9,
            "growth_raw": 114,
            "growth_z": -1.216,
            "growth_pct": 21.1
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 234,
            "base_z": 1.647,
            "base_pct": 90.8,
            "growth_raw": 230,
            "growth_z": 1.406,
            "growth_pct": 81.6
          },
          "drive": {
            "label": "突破",
            "base_raw": 186.6,
            "base_z": -0.934,
            "base_pct": 23.7,
            "growth_raw": 144.8,
            "growth_z": -1.641,
            "growth_pct": 11.8
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 171.2,
            "base_z": -0.98,
            "base_pct": 18.4,
            "growth_raw": 117.2,
            "growth_z": -1.347,
            "growth_pct": 6.6
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 51.97,
            "base_z": -1.057,
            "base_pct": 18.4,
            "growth_raw": 51.97,
            "growth_z": -1.057,
            "growth_pct": 18.4
          },
          "base_position_weighted": {
            "raw": 0.606,
            "pct": 68.4
          },
          "growth_position_weighted": {
            "raw": 0.35,
            "pct": 55.3
          },
          "panel_combined": {
            "raw": 63.16,
            "pct": 68.4,
            "rank": 13
          },
          "skill_value": {
            "raw": 9.1,
            "pct": 68.4,
            "rank": 13
          },
          "overall": {
            "raw": 64.47,
            "pct": 69.7,
            "rank": 12
          }
        },
        "attributeSum": 1191,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "分卫-T08",
          "name": "分卫·投射+传球型",
          "shared": true,
          "sameTemplatePlayers": [
            "羽田 朱志香(SSR)"
          ]
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": "T1",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": "T1",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 12,
        "identicalAttrGroup": {
          "template_id": "分卫-T08",
          "rarity": "SSR",
          "peers": [
            "羽田 朱志香"
          ],
          "note": "同模板同稀有度 → 属性完全相同；差异仅在技能/流派天赋"
        },
        "streamRoles": [
          {
            "stream": "扭蛋流",
            "exampleTeam": [
              "先斗 月绮",
              "卧云 真昼",
              "羽濑川 湊",
              "近江 奏",
              "千圣·贝尔丝"
            ],
            "pickOrder": [
              "羽濑川 湊",
              "千圣·贝尔丝",
              "卧云 真昼"
            ],
            "notes": [
              "同名天赋「再买一个」：SSR 羽濑川 与 SR 春澄 永远 不能同时生效（725602），同队占两个位置不叠加收益。",
              "先检查额外购买、减价与直接增益是否齐全；卧云偏后期（725397）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1037",
      "contentId": 725375,
      "entryId": null,
      "name": "野上 泷",
      "aliases": [],
      "title": "得分手",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "大前",
      "style": "多面手",
      "school": "圣山联盟",
      "heightCm": 179,
      "weightKg": 60,
      "spanCm": null,
      "tags": [],
      "roles": [
        "得分手",
        "篮板手"
      ],
      "stats": {
        "投射": 217,
        "攻筐": 200,
        "防投": 182,
        "护筐": 251,
        "传球": 170,
        "突破": 176
      },
      "potentials": [
        {
          "slot": 1,
          "value": 199
        },
        {
          "slot": 2,
          "value": 167
        },
        {
          "slot": 3,
          "value": 135
        },
        {
          "slot": 4,
          "value": 261
        },
        {
          "slot": 5,
          "value": 115
        },
        {
          "slot": 6,
          "value": 123
        }
      ],
      "skills": [
        {
          "name": "战车重炮",
          "type": "固定",
          "summary": "战车重炮为中投得分时，回复自身20点能量；战车重炮为三分得分时，中幅提升全队进攻篮板能力，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "战车重炮为中投得分时，回复自身20点能量；战车重炮为三分得分时，中幅提升全队进攻篮板能力，持续2分钟。",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "火力全开",
          "type": "额外",
          "summary": "三分或中投命中时，中幅提升自身投射和弹跳属性(受野上体能影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "三分或中投命中时，中幅提升自身投射和弹跳属性(受野上体能影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            },
            {
              "level": 2,
              "desc": "三分或中投命中时，中幅提升自身投射和弹跳属性(受野上体能影响)，持续2分钟。中投命中后，下次三分命中率小幅提高，可叠加；三分命中后，下次中投命中率中幅提高，可叠加",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "大前锋往往体格强壮，能在篮下发起强硬攻击且冲抢篮板",
      "styleDesc": "",
      "positionDesc": "大前锋往往体格强壮，能在篮下发起强硬攻击且冲抢篮板",
      "source": "https://www.gamekee.com/lqsn/725375.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:11",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725375.png",
      "thumb": "assets/portraits/725375.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725375.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 217,
          "攻筐": 200,
          "防投": 182,
          "护筐": 251,
          "传球": 170,
          "突破": 176
        },
        "potentials": [
          {
            "slot": 1,
            "value": 199
          },
          {
            "slot": 2,
            "value": 167
          },
          {
            "slot": 3,
            "value": 135
          },
          {
            "slot": 4,
            "value": 261
          },
          {
            "slot": 5,
            "value": 115
          },
          {
            "slot": 6,
            "value": 123
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "大前球员全属性+20%",
        "大前球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725375,
        "functionalTags": [
          "模板·护筐/篮板",
          "模板·空间/投射",
          "技能·空间/外线",
          "技能·进攻",
          "技能·篮板（代理）",
          "技能·体能/耐久（代理）",
          "技能·团队增益",
          "技能·突破",
          "技能·专属机制"
        ],
        "roleSummary": "大前·护筐+投射型；技能偏向 团队增益/专属机制",
        "positionRank": {
          "rank": 3,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 208.5,
            "base_z": 0.565,
            "base_pct": 71.1,
            "growth_raw": 183,
            "growth_z": 0.206,
            "growth_pct": 56.6
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 217,
            "base_z": 0.889,
            "base_pct": 76.3,
            "growth_raw": 199,
            "growth_z": 0.717,
            "growth_pct": 72.4
          },
          "defense": {
            "label": "防守",
            "base_raw": 216.5,
            "base_z": 1.419,
            "base_pct": 93.4,
            "growth_raw": 198,
            "growth_z": 1.397,
            "growth_pct": 93.4
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 170,
            "base_z": -0.571,
            "base_pct": 40.8,
            "growth_raw": 115,
            "growth_z": -0.824,
            "growth_pct": 30.3
          },
          "drive": {
            "label": "突破",
            "base_raw": 185.6,
            "base_z": -0.995,
            "base_pct": 14.5,
            "growth_raw": 140.6,
            "growth_z": -1.808,
            "growth_pct": 1.3
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 220.4,
            "base_z": 0.702,
            "base_pct": 67.1,
            "growth_raw": 204.6,
            "growth_z": 0.475,
            "growth_pct": 59.2
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 89.23,
            "base_z": 1.526,
            "base_pct": 98.7,
            "growth_raw": 89.23,
            "growth_z": 1.526,
            "growth_pct": 98.7
          },
          "base_position_weighted": {
            "raw": 0.671,
            "pct": 75
          },
          "growth_position_weighted": {
            "raw": 0.423,
            "pct": 64.5
          },
          "panel_combined": {
            "raw": 70.79,
            "pct": 77.6,
            "rank": 9
          },
          "skill_value": {
            "raw": 9.78,
            "pct": 77.6,
            "rank": 9
          },
          "overall": {
            "raw": 72.5,
            "pct": 85.5,
            "rank": 6
          }
        },
        "attributeSum": 1196,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "大前-T19",
          "name": "大前·护筐+投射型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": "T0",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": "T0",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 6,
        "identicalAttrGroup": null,
        "streamRoles": []
      }
    },
    {
      "id": "player_1038",
      "contentId": 725376,
      "entryId": null,
      "name": "降旗 千红纱",
      "aliases": [],
      "title": "防守者",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "小前",
      "style": "篮板手",
      "school": "夜明女高",
      "heightCm": 171,
      "weightKg": 59,
      "spanCm": null,
      "tags": [],
      "roles": [
        "篮板手"
      ],
      "stats": {
        "投射": 183,
        "攻筐": 230,
        "防投": 218,
        "护筐": 169,
        "传球": 197,
        "突破": 198
      },
      "potentials": [
        {
          "slot": 1,
          "value": 137
        },
        {
          "slot": 2,
          "value": 222
        },
        {
          "slot": 3,
          "value": 200
        },
        {
          "slot": 4,
          "value": 112
        },
        {
          "slot": 5,
          "value": 165
        },
        {
          "slot": 6,
          "value": 164
        }
      ],
      "skills": [
        {
          "name": "超新星领域",
          "type": "固定",
          "summary": "对方小前和大前获得弱化：小幅降低抗干扰能力（受降旗弹跳影响），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "对方小前和大前获得弱化：小幅降低抗干扰能力（受降旗弹跳影响），持续2分钟。",
              "energyCost": 100,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "游刃有余",
          "type": "额外",
          "summary": "我方任意球员空位出手命中后，有概率中幅提升该队友体能属性(受降旗防守影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "我方任意球员空位出手命中后，有概率中幅提升该队友体能属性(受降旗防守影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "小前锋是游戏中重要的得分者，擅长多样化的得分手段",
      "styleDesc": "敏锐的篮板嗅觉，在争夺篮板球上总能抢占先机。",
      "positionDesc": "小前锋是游戏中重要的得分者，擅长多样化的得分手段",
      "source": "https://www.gamekee.com/lqsn/725376.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:11",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725376.png",
      "thumb": "assets/portraits/725376.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725376.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 183,
          "攻筐": 230,
          "防投": 218,
          "护筐": 169,
          "传球": 197,
          "突破": 198
        },
        "potentials": [
          {
            "slot": 1,
            "value": 137
          },
          {
            "slot": 2,
            "value": 222
          },
          {
            "slot": 3,
            "value": 200
          },
          {
            "slot": 4,
            "value": 112
          },
          {
            "slot": 5,
            "value": 165
          },
          {
            "slot": 6,
            "value": 164
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
        "小前球员全属性+20%",
        "小前球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725376,
        "functionalTags": [
          "模板·内线终结",
          "模板·外线防守",
          "技能·空间/外线",
          "技能·防守",
          "技能·突破",
          "技能·弱化/干扰",
          "技能·团队增益"
        ],
        "roleSummary": "小前·攻筐+防投型；技能偏向 弱化/干扰/团队增益",
        "positionRank": {
          "rank": 4,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 206.5,
            "base_z": 0.455,
            "base_pct": 63.2,
            "growth_raw": 179.5,
            "growth_z": 0.049,
            "growth_pct": 22.4
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 183,
            "base_z": -0.191,
            "base_pct": 50,
            "growth_raw": 137,
            "growth_z": -0.438,
            "growth_pct": 46.1
          },
          "defense": {
            "label": "防守",
            "base_raw": 193.5,
            "base_z": 0.38,
            "base_pct": 57.9,
            "growth_raw": 156,
            "growth_z": 0.09,
            "growth_pct": 46.1
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 197,
            "base_z": 0.365,
            "base_pct": 71.1,
            "growth_raw": 165,
            "growth_z": 0.145,
            "growth_pct": 71.1
          },
          "drive": {
            "label": "突破",
            "base_raw": 210.8,
            "base_z": 0.544,
            "base_pct": 64.5,
            "growth_raw": 187.2,
            "growth_z": 0.039,
            "growth_pct": 46.1
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 205.6,
            "base_z": 0.196,
            "base_pct": 56.6,
            "growth_raw": 178,
            "growth_z": -0.079,
            "growth_pct": 52.6
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 67.64,
            "base_z": 0.029,
            "base_pct": 48.7,
            "growth_raw": 67.64,
            "growth_z": 0.029,
            "growth_pct": 48.7
          },
          "base_position_weighted": {
            "raw": 0.308,
            "pct": 51.3
          },
          "growth_position_weighted": {
            "raw": -0.024,
            "pct": 11.8
          },
          "panel_combined": {
            "raw": 35.53,
            "pct": 35.5,
            "rank": 25
          },
          "skill_value": {
            "raw": 6.62,
            "pct": 51.3,
            "rank": 19
          },
          "overall": {
            "raw": 39.47,
            "pct": 35.5,
            "rank": 25
          }
        },
        "attributeSum": 1195,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "小前-T13",
          "name": "小前·攻筐+防投型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": "T1",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": "T2",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 25,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "商店流",
            "exampleTeam": [
              "名雪 纱夜",
              "羽田 朱志香",
              "降旗 千红纱",
              "早濑 千秋",
              "洺瑶"
            ],
            "pickOrder": [
              "羽田 朱志香",
              "名雪 纱夜/降旗 千红纱",
              "洺瑶"
            ],
            "notes": [
              "同名天赋「道具升级」：SSR 羽田 与 SR 清水 万里 不能同时生效（725602）。",
              "功能性差异：名雪偏减价、羽田偏品质、早濑偏商品数量（725396）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1039",
      "contentId": 725377,
      "entryId": null,
      "name": "林原 树里",
      "aliases": [],
      "title": "辅助",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "控卫",
      "style": "防守者",
      "school": "青岚高等学校",
      "heightCm": 168,
      "weightKg": 58,
      "spanCm": null,
      "tags": [],
      "roles": [
        "防守者"
      ],
      "stats": {
        "投射": 201,
        "攻筐": 174,
        "防投": 222,
        "护筐": 167,
        "传球": 184,
        "突破": 245
      },
      "potentials": [
        {
          "slot": 1,
          "value": 170
        },
        {
          "slot": 2,
          "value": 122
        },
        {
          "slot": 3,
          "value": 208
        },
        {
          "slot": 4,
          "value": 110
        },
        {
          "slot": 5,
          "value": 140
        },
        {
          "slot": 6,
          "value": 250
        }
      ],
      "skills": [
        {
          "name": "强劲气旋",
          "type": "固定",
          "summary": "对方分卫和控卫获得弱化：中幅降低进攻威力（受林原防守影响），持续2分钟",
          "levels": [
            {
              "level": 1,
              "desc": "对方分卫和控卫获得弱化：中幅降低进攻威力（受林原防守影响），持续2分钟",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "风暴眼",
          "type": "额外",
          "summary": "防守回合看破对方时，中幅提升自身抢断和盯防威力(受林原意识影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "防守回合看破对方时，中幅提升自身抢断和盯防威力(受林原意识影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "styleDesc": "优越的防守意识，在防守上有独特的优势。",
      "positionDesc": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "source": "https://www.gamekee.com/lqsn/725377.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:11",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725377.png",
      "thumb": "assets/portraits/725377.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725377.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 201,
          "攻筐": 174,
          "防投": 222,
          "护筐": 167,
          "传球": 184,
          "突破": 245
        },
        "potentials": [
          {
            "slot": 1,
            "value": 170
          },
          {
            "slot": 2,
            "value": 122
          },
          {
            "slot": 3,
            "value": 208
          },
          {
            "slot": 4,
            "value": 110
          },
          {
            "slot": 5,
            "value": 140
          },
          {
            "slot": 6,
            "value": 250
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "控卫球员全属性+20%",
        "控卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725377,
        "functionalTags": [
          "模板·突破/持球",
          "模板·外线防守",
          "技能·进攻",
          "技能·防守",
          "技能·弱化/干扰",
          "技能·自我增益"
        ],
        "roleSummary": "控卫·突破+防投型；技能偏向 弱化/干扰/自我增益",
        "positionRank": {
          "rank": 8,
          "total": 9
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 187.5,
            "base_z": -0.585,
            "base_pct": 21.1,
            "growth_raw": 146,
            "growth_z": -1.457,
            "growth_pct": 15.8
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 201,
            "base_z": 0.38,
            "base_pct": 61.8,
            "growth_raw": 170,
            "growth_z": 0.177,
            "growth_pct": 60.5
          },
          "defense": {
            "label": "防守",
            "base_raw": 194.5,
            "base_z": 0.425,
            "base_pct": 61.8,
            "growth_raw": 159,
            "growth_z": 0.184,
            "growth_pct": 52.6
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 184,
            "base_z": -0.086,
            "base_pct": 53.9,
            "growth_raw": 140,
            "growth_z": -0.339,
            "growth_pct": 44.7
          },
          "drive": {
            "label": "突破",
            "base_raw": 216.6,
            "base_z": 0.898,
            "base_pct": 71.1,
            "growth_raw": 198.8,
            "growth_z": 0.498,
            "growth_pct": 59.2
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 171.2,
            "base_z": -0.98,
            "base_pct": 18.4,
            "growth_raw": 117.2,
            "growth_z": -1.347,
            "growth_pct": 6.6
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 69.07,
            "base_z": 0.128,
            "base_pct": 53.9,
            "growth_raw": 69.07,
            "growth_z": 0.128,
            "growth_pct": 53.9
          },
          "base_position_weighted": {
            "raw": 0.159,
            "pct": 30.3
          },
          "growth_position_weighted": {
            "raw": -0.158,
            "pct": 1.3
          },
          "panel_combined": {
            "raw": 18.68,
            "pct": 3.9,
            "rank": 37
          },
          "skill_value": {
            "raw": 4.2,
            "pct": 34.2,
            "rank": 26
          },
          "overall": {
            "raw": 22.57,
            "pct": 9.2,
            "rank": 35
          }
        },
        "attributeSum": 1193,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "控卫-T15",
          "name": "控卫·突破+防投型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [
          {
            "talent": "小游戏增益向",
            "category": "",
            "note": "「林原和稻叶围绕每次小游戏提供增益」",
            "confidence": "待验证",
            "source": 725396
          }
        ],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": "T1",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 35,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "小游戏流",
            "exampleTeam": [
              "和泉 香织",
              "林原 树里",
              "皆川 式",
              "稻叶 杏里",
              "远野 桐"
            ],
            "pickOrder": [
              "稻叶 杏里",
              "林原 树里",
              "远野 桐/和泉 香织"
            ],
            "notes": [
              "社区多认为偏早期开荒，但对强势期长度说法不一（3 天~1 周不等），不宜据此投入全部自选/钻石（725488）。",
              "皆川偏减价；林原、稻叶围绕小游戏增益；远野需带加成的小游戏选项（725396）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1040",
      "contentId": 725378,
      "entryId": null,
      "name": "美星 栗栖",
      "aliases": [],
      "title": "得分手",
      "titleSource": "official",
      "rarity": "SR",
      "stars": null,
      "role": "小前",
      "style": "篮板手",
      "school": "青岚高等学校",
      "heightCm": 171,
      "weightKg": 61,
      "spanCm": null,
      "tags": [],
      "roles": [
        "篮板手"
      ],
      "stats": {
        "投射": 210,
        "攻筐": 183,
        "防投": 154,
        "护筐": 168,
        "传球": 172,
        "突破": 206
      },
      "potentials": [
        {
          "slot": 1,
          "value": 220
        },
        {
          "slot": 2,
          "value": 170
        },
        {
          "slot": 3,
          "value": 108
        },
        {
          "slot": 4,
          "value": 139
        },
        {
          "slot": 5,
          "value": 150
        },
        {
          "slot": 6,
          "value": 213
        }
      ],
      "skills": [
        {
          "name": "特急加农炮",
          "type": "固定",
          "summary": "我方大前和小前获得强化： 小幅提升 投射属性（受美星投射影响），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "我方大前和小前获得强化： 小幅提升 投射属性（受美星投射影响），持续2分钟。",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "自动上弦",
          "type": "额外",
          "summary": "成功防守后，中幅提升自身投射属性（受美星意识影响），持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "成功防守后，中幅提升自身投射属性（受美星意识影响），持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "小前锋是游戏中重要的得分者，擅长多样化的得分手段",
      "styleDesc": "敏锐的篮板嗅觉，在争夺篮板球上总能抢占先机。",
      "positionDesc": "小前锋是游戏中重要的得分者，擅长多样化的得分手段",
      "source": "https://www.gamekee.com/lqsn/725378.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:11",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725378.png",
      "thumb": "assets/portraits/725378.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725378.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 210,
          "攻筐": 183,
          "防投": 154,
          "护筐": 168,
          "传球": 172,
          "突破": 206
        },
        "potentials": [
          {
            "slot": 1,
            "value": 220
          },
          {
            "slot": 2,
            "value": 170
          },
          {
            "slot": 3,
            "value": 108
          },
          {
            "slot": 4,
            "value": 139
          },
          {
            "slot": 5,
            "value": 150
          },
          {
            "slot": 6,
            "value": 213
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
        "小前球员全属性+20%",
        "小前球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725378,
        "functionalTags": [
          "模板·空间/投射",
          "模板·突破/持球",
          "技能·空间/外线",
          "技能·团队增益",
          "技能·防守",
          "技能·自我增益"
        ],
        "roleSummary": "小前·投射+突破型；技能偏向 团队增益/自我增益",
        "positionRank": {
          "rank": 5,
          "total": 7
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 196.5,
            "base_z": -0.092,
            "base_pct": 46.1,
            "growth_raw": 195,
            "growth_z": 0.745,
            "growth_pct": 89.5
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 210,
            "base_z": 0.666,
            "base_pct": 67.1,
            "growth_raw": 220,
            "growth_z": 1.108,
            "growth_pct": 81.6
          },
          "defense": {
            "label": "防守",
            "base_raw": 161,
            "base_z": -1.088,
            "base_pct": 17.1,
            "growth_raw": 123.5,
            "growth_z": -0.92,
            "growth_pct": 32.9
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 172,
            "base_z": -0.502,
            "base_pct": 46.1,
            "growth_raw": 150,
            "growth_z": -0.145,
            "growth_pct": 57.9
          },
          "drive": {
            "label": "突破",
            "base_raw": 196.8,
            "base_z": -0.311,
            "base_pct": 35.5,
            "growth_raw": 195.8,
            "growth_z": 0.38,
            "growth_pct": 53.9
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 177,
            "base_z": -0.781,
            "base_pct": 32.9,
            "growth_raw": 157.6,
            "growth_z": -0.505,
            "growth_pct": 32.9
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 60.6,
            "base_z": -0.459,
            "base_pct": 35.5,
            "growth_raw": 60.6,
            "growth_z": -0.459,
            "growth_pct": 35.5
          },
          "base_position_weighted": {
            "raw": -0.3,
            "pct": 14.5
          },
          "growth_position_weighted": {
            "raw": 0.202,
            "pct": 43.4
          },
          "panel_combined": {
            "raw": 26.05,
            "pct": 21.1,
            "rank": 31
          },
          "skill_value": {
            "raw": 4.53,
            "pct": 39.5,
            "rank": 24
          },
          "overall": {
            "raw": 29.41,
            "pct": 17.1,
            "rank": 32
          }
        },
        "attributeSum": 1093,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "小前-T20",
          "name": "小前·投射+突破型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 32,
        "identicalAttrGroup": null,
        "streamRoles": []
      }
    },
    {
      "id": "player_1042",
      "contentId": 725379,
      "entryId": null,
      "name": "远野 桐",
      "aliases": [],
      "title": "得分手",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "中锋",
      "style": "组织者",
      "school": "虹梦高等学院",
      "heightCm": 179,
      "weightKg": 70,
      "spanCm": null,
      "tags": [],
      "roles": [
        "组织者"
      ],
      "stats": {
        "投射": 211,
        "攻筐": 202,
        "防投": 180,
        "护筐": 235,
        "传球": 167,
        "突破": 200
      },
      "potentials": [
        {
          "slot": 1,
          "value": 190
        },
        {
          "slot": 2,
          "value": 170
        },
        {
          "slot": 3,
          "value": 130
        },
        {
          "slot": 4,
          "value": 233
        },
        {
          "slot": 5,
          "value": 110
        },
        {
          "slot": 6,
          "value": 167
        }
      ],
      "skills": [
        {
          "name": "爱心射线",
          "type": "固定",
          "summary": "全队获得强化：中幅提升投篮抗干扰能力，持续2分钟",
          "levels": [
            {
              "level": 1,
              "desc": "全队获得强化：中幅提升投篮抗干扰能力，持续2分钟",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "稳定光晕",
          "type": "额外",
          "summary": "使用技卡时，小幅提升我方中锋和大前三分威力(受远野体能影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "使用技卡时，小幅提升我方中锋和大前三分威力(受远野体能影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "styleDesc": "球场指挥官，能让队伍完美执行战术，提升得分效率。",
      "positionDesc": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "source": "https://www.gamekee.com/lqsn/725379.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:11",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725379.png",
      "thumb": "assets/portraits/725379.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725379.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 211,
          "攻筐": 202,
          "防投": 180,
          "护筐": 235,
          "传球": 167,
          "突破": 200
        },
        "potentials": [
          {
            "slot": 1,
            "value": 190
          },
          {
            "slot": 2,
            "value": 170
          },
          {
            "slot": 3,
            "value": 130
          },
          {
            "slot": 4,
            "value": 233
          },
          {
            "slot": 5,
            "value": 110
          },
          {
            "slot": 6,
            "value": 167
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "中锋球员全属性+20%",
        "中锋球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725379,
        "functionalTags": [
          "模板·护筐/篮板",
          "模板·空间/投射",
          "技能·空间/外线",
          "技能·防守",
          "技能·团队增益"
        ],
        "roleSummary": "中锋·护筐+投射型；技能偏向 团队增益",
        "positionRank": {
          "rank": 5,
          "total": 8
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 206.5,
            "base_z": 0.455,
            "base_pct": 63.2,
            "growth_raw": 180,
            "growth_z": 0.071,
            "growth_pct": 36.8
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 211,
            "base_z": 0.698,
            "base_pct": 69.7,
            "growth_raw": 190,
            "growth_z": 0.549,
            "growth_pct": 67.1
          },
          "defense": {
            "label": "防守",
            "base_raw": 207.5,
            "base_z": 1.012,
            "base_pct": 82.9,
            "growth_raw": 181.5,
            "growth_z": 0.884,
            "growth_pct": 76.3
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 167,
            "base_z": -0.675,
            "base_pct": 19.7,
            "growth_raw": 110,
            "growth_z": -0.921,
            "growth_pct": 10.5
          },
          "drive": {
            "label": "突破",
            "base_raw": 200.8,
            "base_z": -0.067,
            "base_pct": 40.8,
            "growth_raw": 168.2,
            "growth_z": -0.714,
            "growth_pct": 19.7
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 215.2,
            "base_z": 0.524,
            "base_pct": 61.8,
            "growth_raw": 195.2,
            "growth_z": 0.279,
            "growth_pct": 56.6
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 82.31,
            "base_z": 1.046,
            "base_pct": 85.5,
            "growth_raw": 82.31,
            "growth_z": 1.046,
            "growth_pct": 85.5
          },
          "base_position_weighted": {
            "raw": 0.616,
            "pct": 72.4
          },
          "growth_position_weighted": {
            "raw": 0.375,
            "pct": 59.2
          },
          "panel_combined": {
            "raw": 67.11,
            "pct": 75,
            "rank": 10
          },
          "skill_value": {
            "raw": 9.43,
            "pct": 72.4,
            "rank": 11
          },
          "overall": {
            "raw": 68.42,
            "pct": 80.3,
            "rank": 8
          }
        },
        "attributeSum": 1195,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "中锋-T18",
          "name": "中锋·护筐+投射型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [
          {
            "talent": "小游戏选项增益向",
            "category": "",
            "note": "「需要注意带加成的小游戏选项」",
            "confidence": "待验证",
            "source": 725396
          }
        ],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": null,
          "reason": "不在该榜已转写的 T0-T2 范围（T3/T4 未转写）"
        },
        "communityTier": {
          "tier": "T1",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 8,
        "identicalAttrGroup": null,
        "streamRoles": [
          {
            "stream": "小游戏流",
            "exampleTeam": [
              "和泉 香织",
              "林原 树里",
              "皆川 式",
              "稻叶 杏里",
              "远野 桐"
            ],
            "pickOrder": [
              "稻叶 杏里",
              "林原 树里",
              "远野 桐/和泉 香织"
            ],
            "notes": [
              "社区多认为偏早期开荒，但对强势期长度说法不一（3 天~1 周不等），不宜据此投入全部自选/钻石（725488）。",
              "皆川偏减价；林原、稻叶围绕小游戏增益；远野需带加成的小游戏选项（725396）。"
            ]
          }
        ]
      }
    },
    {
      "id": "player_1045",
      "contentId": 725380,
      "entryId": null,
      "name": "白神 时久",
      "aliases": [],
      "title": "防守者",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "控卫",
      "style": "多面手",
      "school": "圣山联盟",
      "heightCm": 162,
      "weightKg": 52,
      "spanCm": null,
      "tags": [],
      "roles": [
        "组织者",
        "防守者"
      ],
      "stats": {
        "投射": 183,
        "攻筐": 180,
        "防投": 218,
        "护筐": 169,
        "传球": 197,
        "突破": 248
      },
      "potentials": [
        {
          "slot": 1,
          "value": 137
        },
        {
          "slot": 2,
          "value": 132
        },
        {
          "slot": 3,
          "value": 200
        },
        {
          "slot": 4,
          "value": 112
        },
        {
          "slot": 5,
          "value": 165
        },
        {
          "slot": 6,
          "value": 254
        }
      ],
      "skills": [
        {
          "name": "轰鸣的一闪",
          "type": "固定",
          "summary": "窃取对位球员20点能量，回复我方随机1名球员20点能量。小幅提升我方控卫和分卫突破成功率，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "窃取对位球员20点能量，回复我方随机1名球员20点能量。小幅提升我方控卫和分卫突破成功率，持续2分钟。",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "统帅的意志",
          "type": "额外",
          "summary": "自身发动突破分球的倾向和成功率中幅提升。白神时久传球成功时，小幅提升 接球人 进攻威力(受白神防守影响)，持续2分钟。",
          "levels": [
            {
              "level": 1,
              "desc": "自身发动突破分球的倾向和成功率中幅提升。白神时久传球成功时，小幅提升 接球人 进攻威力(受白神防守影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            },
            {
              "level": 2,
              "desc": "自身发动突破分球的倾向和成功率大幅提升，成功率小幅提升。白神时久传球成功时，中幅提升 接球人 进攻威力(受白神防守影响)，持续2分钟。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "styleDesc": "",
      "positionDesc": "控球后卫是全队进攻的组织者，通过对球的控制影响全场",
      "source": "https://www.gamekee.com/lqsn/725380.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:11",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725380.png",
      "thumb": "assets/portraits/725380.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725380.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 183,
          "攻筐": 180,
          "防投": 218,
          "护筐": 169,
          "传球": 197,
          "突破": 248
        },
        "potentials": [
          {
            "slot": 1,
            "value": 137
          },
          {
            "slot": 2,
            "value": 132
          },
          {
            "slot": 3,
            "value": 200
          },
          {
            "slot": 4,
            "value": 112
          },
          {
            "slot": 5,
            "value": 165
          },
          {
            "slot": 6,
            "value": 254
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "控卫球员全属性+20%",
        "控卫球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725380,
        "functionalTags": [
          "模板·突破/持球",
          "模板·外线防守",
          "技能·防守",
          "技能·突破",
          "技能·体能/耐久（代理）",
          "技能·耐久/能量资源",
          "技能·进攻",
          "技能·组织",
          "技能·自我增益"
        ],
        "roleSummary": "控卫·突破+防投型；技能偏向 耐久/能量资源/自我增益",
        "positionRank": {
          "rank": 7,
          "total": 9
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 181.5,
            "base_z": -0.913,
            "base_pct": 14.5,
            "growth_raw": 134.5,
            "growth_z": -1.974,
            "growth_pct": 6.6
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 183,
            "base_z": -0.191,
            "base_pct": 50,
            "growth_raw": 137,
            "growth_z": -0.438,
            "growth_pct": 46.1
          },
          "defense": {
            "label": "防守",
            "base_raw": 193.5,
            "base_z": 0.38,
            "base_pct": 57.9,
            "growth_raw": 156,
            "growth_z": 0.09,
            "growth_pct": 46.1
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 197,
            "base_z": 0.365,
            "base_pct": 71.1,
            "growth_raw": 165,
            "growth_z": 0.145,
            "growth_pct": 71.1
          },
          "drive": {
            "label": "突破",
            "base_raw": 220.8,
            "base_z": 1.154,
            "base_pct": 92.1,
            "growth_raw": 205.2,
            "growth_z": 0.752,
            "growth_pct": 88.2
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 175.6,
            "base_z": -0.829,
            "base_pct": 27.6,
            "growth_raw": 124,
            "growth_z": -1.205,
            "growth_pct": 19.7
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 65.98,
            "base_z": -0.086,
            "base_pct": 46.1,
            "growth_raw": 65.98,
            "growth_z": -0.086,
            "growth_pct": 46.1
          },
          "base_position_weighted": {
            "raw": 0.208,
            "pct": 38.2
          },
          "growth_position_weighted": {
            "raw": -0.129,
            "pct": 3.9
          },
          "panel_combined": {
            "raw": 24.47,
            "pct": 17.1,
            "rank": 32
          },
          "skill_value": {
            "raw": 5.76,
            "pct": 48.7,
            "rank": 20
          },
          "overall": {
            "raw": 30.53,
            "pct": 19.7,
            "rank": 31
          }
        },
        "attributeSum": 1195,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "控卫-T11",
          "name": "控卫·突破+防投型",
          "shared": false,
          "sameTemplatePlayers": []
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": "T0",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": null,
          "reason": "不在 725623 的 22 人评级范围内"
        },
        "rosterRank": 31,
        "identicalAttrGroup": null,
        "streamRoles": []
      }
    },
    {
      "id": "player_1046",
      "contentId": 725381,
      "entryId": null,
      "name": "希雅·奥黛拉",
      "aliases": [],
      "title": "得分手/防守者",
      "titleSource": "official",
      "rarity": "SSR",
      "stars": null,
      "role": "中锋",
      "style": "多面手",
      "school": "圣山联盟",
      "heightCm": 178,
      "weightKg": 71,
      "spanCm": null,
      "tags": [],
      "roles": [
        "得分手",
        "防守者"
      ],
      "stats": {
        "投射": 161,
        "攻筐": 250,
        "防投": 228,
        "护筐": 185,
        "传球": 168,
        "突破": 199
      },
      "potentials": [
        {
          "slot": 1,
          "value": 100
        },
        {
          "slot": 2,
          "value": 260
        },
        {
          "slot": 3,
          "value": 220
        },
        {
          "slot": 4,
          "value": 143
        },
        {
          "slot": 5,
          "value": 110
        },
        {
          "slot": 6,
          "value": 167
        }
      ],
      "skills": [
        {
          "name": "梦境华尔兹",
          "type": "固定",
          "summary": "希雅获得一张一次性的【梦境盖帽】卡。【梦境盖帽】(力)：威力 = 弹跳 *100%+防守 *40%。",
          "levels": [
            {
              "level": 1,
              "desc": "希雅获得一张一次性的【梦境盖帽】卡。【梦境盖帽】(力)：威力 = 弹跳 *100%+防守 *40%。",
              "energyCost": 90,
              "ptCost": 20
            }
          ],
          "confidence": "待验证",
          "source": ""
        },
        {
          "name": "华彩领舞者",
          "type": "额外",
          "summary": "我方任意球员空位出手命中后，希雅·奥黛拉 回复10点能量（最多触发5次）。",
          "levels": [
            {
              "level": 1,
              "desc": "我方任意球员空位出手命中后，希雅·奥黛拉 回复10点能量（最多触发5次）。",
              "energyCost": 0,
              "ptCost": 0
            },
            {
              "level": 2,
              "desc": "我方任意球员空位出手命中后，希雅·奥黛拉 回复10点能量（最多触发7次）。",
              "energyCost": 0,
              "ptCost": 0
            }
          ],
          "confidence": "待验证",
          "source": ""
        }
      ],
      "description": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "styleDesc": "",
      "positionDesc": "中锋一般由队中最高的球员担任，负责篮下的防守和篮板保护",
      "source": "https://www.gamekee.com/lqsn/725381.html",
      "bodySource": null,
      "attributesSource": null,
      "attributeSourceType": null,
      "releaseInfo": null,
      "sourceUpdatedAt": "2026-10-25 00:11",
      "confidence": "单源",
      "dataStatus": "ready",
      "note": "六项潜力数值依次列出，暂不标注尚未确认的属性名称：",
      "portrait": "assets/portraits/725381.png",
      "thumb": "assets/portraits/725381.png",
      "wikiUrl": "https://www.gamekee.com/lqsn/725381.html",
      "referencePanelNote": "图鉴六维/潜力为未养成 1 级参考值，不是实测种子面板",
      "level1": {
        "stats": {
          "投射": 161,
          "攻筐": 250,
          "防投": 228,
          "护筐": 185,
          "传球": 168,
          "突破": 199
        },
        "potentials": [
          {
            "slot": 1,
            "value": 100
          },
          {
            "slot": 2,
            "value": 260
          },
          {
            "slot": 3,
            "value": 220
          },
          {
            "slot": 4,
            "value": 143
          },
          {
            "slot": 5,
            "value": 110
          },
          {
            "slot": 6,
            "value": 167
          }
        ],
        "note": "图鉴参考值（未养成 1 级）"
      },
      "positionDuty": [
        "中锋球员全属性+20%",
        "中锋球员回能加速+20%"
      ],
      "maxLevel": null,
      "events": [],
      "derived": {
        "contentId": 725381,
        "functionalTags": [
          "模板·内线终结",
          "模板·外线防守",
          "技能·防守",
          "技能·突破",
          "技能·专属机制",
          "技能·空间/外线",
          "技能·体能/耐久（代理）",
          "技能·团队增益"
        ],
        "roleSummary": "中锋·攻筐+防投型；技能偏向 专属机制/团队增益",
        "positionRank": {
          "rank": 4,
          "total": 8
        },
        "scores": {
          "offense": {
            "label": "进攻",
            "base_raw": 205.5,
            "base_z": 0.4,
            "base_pct": 55.3,
            "growth_raw": 180,
            "growth_z": 0.071,
            "growth_pct": 36.8
          },
          "spacing": {
            "label": "空间/外线",
            "base_raw": 161,
            "base_z": -0.89,
            "base_pct": 21.1,
            "growth_raw": 100,
            "growth_z": -1.126,
            "growth_pct": 9.2
          },
          "defense": {
            "label": "防守",
            "base_raw": 206.5,
            "base_z": 0.967,
            "base_pct": 76.3,
            "growth_raw": 181.5,
            "growth_z": 0.884,
            "growth_pct": 76.3
          },
          "playmaking": {
            "label": "组织",
            "base_raw": 168,
            "base_z": -0.64,
            "base_pct": 27.6,
            "growth_raw": 110,
            "growth_z": -0.921,
            "growth_pct": 10.5
          },
          "drive": {
            "label": "突破",
            "base_raw": 219.4,
            "base_z": 1.069,
            "base_pct": 78.9,
            "growth_raw": 204.2,
            "growth_z": 0.712,
            "growth_pct": 72.4
          },
          "rebound": {
            "label": "篮板（代理）",
            "base_raw": 224,
            "base_z": 0.825,
            "base_pct": 76.3,
            "growth_raw": 213.2,
            "growth_z": 0.654,
            "growth_pct": 72.4
          },
          "durability": {
            "label": "体能/耐久（代理）",
            "base_raw": 79.72,
            "base_z": 0.867,
            "base_pct": 80.3,
            "growth_raw": 79.72,
            "growth_z": 0.867,
            "growth_pct": 80.3
          },
          "base_position_weighted": {
            "raw": 0.704,
            "pct": 78.9
          },
          "growth_position_weighted": {
            "raw": 0.523,
            "pct": 72.4
          },
          "panel_combined": {
            "raw": 76.32,
            "pct": 81.6,
            "rank": 8
          },
          "skill_value": {
            "raw": 7.83,
            "pct": 56.6,
            "rank": 17
          },
          "overall": {
            "raw": 71.38,
            "pct": 82.9,
            "rank": 7
          }
        },
        "attributeSum": 1191,
        "potentialSum": 1000,
        "positionTemplate": {
          "id": "中锋-T02",
          "name": "中锋·攻筐+防投型",
          "shared": true,
          "sameTemplatePlayers": [
            "洺瑶(SSR)",
            "五十岚 诗音(R)"
          ]
        },
        "knownStreamTalents": [],
        "trainingTalents": [],
        "communityTrainingTier": {
          "tier": "T0",
          "source": {
            "url": "https://www.taptap.cn/moment/863887392480691762",
            "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
          },
          "note": "TapTap 训练强度榜（公测 10-26，白板 0 星 1 级），训练价值口径，非比赛强度"
        },
        "communityTier": {
          "tier": "T0",
          "source_content_id": 725623,
          "source": {
            "url": "https://www.gamekee.com/lqsn/725623.html",
            "title": "开服角色强度榜｜22名角色评级与图鉴",
            "date": "2026-10-25更新",
            "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
          },
          "note": "转述视频评级，非本站实测；未上榜 ≠ 低档"
        },
        "rosterRank": 7,
        "identicalAttrGroup": {
          "template_id": "中锋-T02",
          "rarity": "SSR",
          "peers": [
            "洺瑶"
          ],
          "note": "同模板同稀有度 → 属性完全相同；差异仅在技能/流派天赋"
        },
        "streamRoles": []
      }
    }
  ],
  "dataVersion": "v2026.11.05",
  "caliber": {
    "level1": "图鉴六维/潜力 = 未养成 1 级参考值（GameKee wiki 参考值），不是实测种子面板",
    "maxLevel": "满级养成数据暂无系统数据，页面显示占位（待补 LV90 面板/评分样本）",
    "talents": "天赋路线来自 derived_roster（known_stream_talents / training_talents / stream_roles）",
    "events": "专属事件与最优解攻略暂无数据，页面显示占位",
    "notes": "我的笔记为玩家自填（本地持久化），非官方数据"
  },
  "referencePanelNote": "图鉴六维为 1 级参考值；种子面板/满级面板待实测（白神 9199 样本尚未录入，referencePanelSample=null）",
  "referencePanelSample": null,
  "positionDuty": {
    "source": "data/structured/skill_duty_readable.json",
    "confidence": "客户端文本确证（数值未解）",
    "positions": {
      "1": {
        "code": "PG",
        "name": "控球后卫"
      },
      "2": {
        "code": "SG",
        "name": "得分后卫"
      },
      "3": {
        "code": "SF",
        "name": "小前锋"
      },
      "4": {
        "code": "PF",
        "name": "大前锋"
      },
      "5": {
        "code": "C",
        "name": "中锋"
      }
    },
    "effects": [
      "分卫、小前 位置上的球员适性为金色/彩色时，可以获得20%/40%回能加速",
      "控卫球员全属性+20%",
      "分卫球员全属性+20%",
      "小前球员全属性+20%",
      "大前球员全属性+20%",
      "中锋球员全属性+20%",
      "控卫球员回能加速+20%",
      "分卫球员回能加速+20%",
      "小前球员回能加速+20%",
      "大前球员回能加速+20%",
      "中锋球员回能加速+20%"
    ]
  }
};
  if (typeof module === "object" && module.exports) module.exports = data;
  if (root) {
    root.BBCharacterData = data;
    root.BBT = root.BBT || {};
    root.BBT.characterData = data;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

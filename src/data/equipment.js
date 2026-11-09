/*!
 * data/equipment.js —— 自动生成，请勿手改。
 * 生成脚本：tool/scripts/build-equipment.mjs
 * 生成时间：2026-11-05 23:39
 * 数据版本：v2026.11.05
 * 口径：名称/属性标签/效果文案=客户端文本确证；数值/专属技能词条归属未解；品质=分组推断；攻略=社区
 */
(function (root) {
  'use strict';
  var data = {
  "schema": 1,
  "generatedAt": "2026-11-05 23:39",
  "dataVersion": "v2026.11.05",
  "mode": "structured",
  "meta": {
    "generatedAt": "2026-11-05 23:39",
    "dataVersion": "v2026.11.05",
    "source": "data/structured/guides_cleaned/equipment_merged.json",
    "sources": [
      "data/structured/guides_cleaned/equipment_client_extract.json（客户端字符串：名称/属性标签/效果文案/词条，文本确证）",
      "data/structured/guides_cleaned/equipment.json（社区攻略：档位评价/规则，非客户端数值）"
    ],
    "confidence": "mixed: names/attr labels=client text; quality=inferred; numeric values=未解(数值区阻塞); guide ratings=community",
    "gaps": [
      "属性具体数值(如投射+35)未解",
      "每件器材专属技能/词条归属未解",
      "品质为分组推断",
      "攻略档位评价无器材名"
    ],
    "counts": {
      "equipment": 82,
      "effectPool": 646,
      "affixes": 61,
      "ratings": 39,
      "matches": 39,
      "matchedItems": 6
    }
  },
  "equipment": [
    {
      "id": "eq_001",
      "name": "充气游泳池（防守）",
      "baseName": "充气游泳池",
      "attrText": "防守",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257350",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_002",
      "name": "动感单车（运控）",
      "baseName": "动感单车",
      "attrText": "运控",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257535",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_003",
      "name": "卧推装置（体能）",
      "baseName": "卧推装置",
      "attrText": "体能",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257397",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_004",
      "name": "哑铃（弹跳）",
      "baseName": "哑铃",
      "attrText": "弹跳",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257309",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": {
        "match": {
          "equipmentId": "eq_dumbbell_4kg",
          "guideName": "4KG哑铃",
          "clientName": "哑铃（弹跳）",
          "clientQuality": "R",
          "attrText": "弹跳",
          "status": "matched"
        },
        "rating": {
          "id": "eq_dumbbell_4kg",
          "recordType": "named_item",
          "name": "4KG哑铃",
          "quality": null,
          "attributes": null,
          "skill": null,
          "tier": null,
          "tags": [
            "训练器材",
            "熟练度",
            "训练加成"
          ],
          "scenarios": [
            "训练"
          ],
          "constraints": [
            "示例为同一件器材熟练度 MAX 前后的对比，不是通用倍率"
          ],
          "notes": "器材熟练度示意：同一件 4KG 哑铃在熟练度达到 MAX 后，示例训练加成由 +10 变为 +41；原文强调这不是所有器材通用的收益倍率。",
          "evidenceQuote": "图中同一件4KG哑铃在熟练度达到MAX后，示例训练加成由+10变为+41；这不是所有器材通用的收益倍率。",
          "sourceFile": "data/structured/guides/725398",
          "sourceUrl": "https://www.gamekee.com/lqsn/725398.html",
          "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
          "confidence": "单源（客户端内置帮助图示例，非实测）"
        }
      }
    },
    {
      "id": "eq_005",
      "name": "壶铃（防守）",
      "baseName": "壶铃",
      "attrText": "防守",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257378",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_006",
      "name": "录像带（意识）",
      "baseName": "录像带",
      "attrText": "意识",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257488",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_007",
      "name": "战术板（意识）",
      "baseName": "战术板",
      "attrText": "意识",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257466",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_008",
      "name": "拳击手套（投射）",
      "baseName": "拳击手套",
      "attrText": "投射",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257237",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_009",
      "name": "拳击沙袋（弹跳）",
      "baseName": "拳击沙袋",
      "attrText": "弹跳",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257262",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_010",
      "name": "握力器（体能）",
      "baseName": "握力器",
      "attrText": "体能",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257444",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_011",
      "name": "教练手册（意识）",
      "baseName": "教练手册",
      "attrText": "意识",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257510",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_012",
      "name": "杠铃（运控）",
      "baseName": "杠铃",
      "attrText": "运控",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257579",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_013",
      "name": "瑜伽垫（防守）",
      "baseName": "瑜伽垫",
      "attrText": "防守",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257328",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_014",
      "name": "登山机（体能）",
      "baseName": "登山机",
      "attrText": "体能",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257422",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_015",
      "name": "跑步机（弹跳）",
      "baseName": "跑步机",
      "attrText": "弹跳",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257287",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_016",
      "name": "跳绳（运控）",
      "baseName": "跳绳",
      "attrText": "运控",
      "qualityText": "R",
      "qualityGroup": "R",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257560",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_017",
      "name": "便携篮筐（投射）",
      "baseName": "便携篮筐",
      "attrText": "投射",
      "qualityText": "SR",
      "qualityGroup": "SR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257179",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_018",
      "name": "智能篮球（投射）",
      "baseName": "智能篮球",
      "attrText": "投射",
      "qualityText": "SR",
      "qualityGroup": "SR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257204",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": {
        "match": {
          "equipmentId": "eq_smart_basketball",
          "guideName": "高级智能篮球器材",
          "clientName": "高级智能篮球（投射）",
          "clientQuality": "UP(SSR)",
          "attrText": "投射",
          "status": "matched"
        },
        "rating": {
          "id": "eq_smart_basketball",
          "recordType": "named_item",
          "name": "高级智能篮球器材",
          "quality": null,
          "attributes": null,
          "skill": null,
          "tier": null,
          "tags": [
            "活动奖励"
          ],
          "scenarios": [
            "签到有礼奖励"
          ],
          "constraints": [],
          "notes": "开服「签到有礼」累计奖励之一（×1）；正文未给属性/技能效果。",
          "evidenceQuote": "签到有礼：10月23日开服后，活动累计可获得……高级智能篮球器材×1。",
          "sourceFile": "data/structured/guides/725399；725565",
          "sourceUrl": "https://www.gamekee.com/lqsn/725565.html",
          "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
          "confidence": "单源（活动奖励列表转述）"
        }
      }
    },
    {
      "id": "eq_019",
      "name": "Air Uplifting SS(弹跳)",
      "baseName": "Air Uplifting SS",
      "attrText": "弹跳",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23258268",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_020",
      "name": "Aster 40耳机(意识)",
      "baseName": "Aster 40耳机",
      "attrText": "意识",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23259759",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_021",
      "name": "HD 2K16 G/Y(防守)",
      "baseName": "HD 2K16 G/Y",
      "attrText": "防守",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23258479",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_022",
      "name": "K16 Low Daiya PE(体能)",
      "baseName": "K16 Low Daiya PE",
      "attrText": "体能",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23258915",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_023",
      "name": "Magic Handle(投射)",
      "baseName": "Magic Handle",
      "attrText": "投射",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257894",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_024",
      "name": "一砖入魂(投射)",
      "baseName": "一砖入魂",
      "attrText": "投射",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257945",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_025",
      "name": "东部大会冠军戒指(投射)",
      "baseName": "东部大会冠军戒指",
      "attrText": "投射",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257743",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_026",
      "name": "伊澄11号球衣(防守)",
      "baseName": "伊澄11号球衣",
      "attrText": "防守",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23259298",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_027",
      "name": "健身套组（运控）",
      "baseName": "健身套组",
      "attrText": "运控",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23256791",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_028",
      "name": "健身背心（意识）",
      "baseName": "健身背心",
      "attrText": "意识",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23256449",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_029",
      "name": "充能汉堡(体能)",
      "baseName": "充能汉堡",
      "attrText": "体能",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23258972",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_030",
      "name": "北空26号球衣(防守)",
      "baseName": "北空26号球衣",
      "attrText": "防守",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23258453",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_031",
      "name": "地区预选赛冠军戒指(弹跳)",
      "baseName": "地区预选赛冠军戒指",
      "attrText": "弹跳",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23258111",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_032",
      "name": "壶铃组合（弹跳）",
      "baseName": "壶铃组合",
      "attrText": "弹跳",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23254264",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_033",
      "name": "实体版篮球游戏(意识)",
      "baseName": "实体版篮球游戏",
      "attrText": "意识",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23259602",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_034",
      "name": "小型数码相机D-L 7(体能)",
      "baseName": "小型数码相机D-L 7",
      "attrText": "体能",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23258940",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_035",
      "name": "弹力带（防守）",
      "baseName": "弹力带",
      "attrText": "防守",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23255205",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_036",
      "name": "战绳（体能）",
      "baseName": "战绳",
      "attrText": "体能",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23255844",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_037",
      "name": "扑扑拳套（体能）",
      "baseName": "扑扑拳套",
      "attrText": "体能",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23255990",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_038",
      "name": "护目镜(运控)",
      "baseName": "护目镜",
      "attrText": "运控",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23259439",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_039",
      "name": "护膝（弹跳）",
      "baseName": "护膝",
      "attrText": "弹跳",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23254711",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_040",
      "name": "支援口哨（协助）",
      "baseName": "支援口哨",
      "attrText": null,
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": "失踪时长两年半的神秘训练器材，据说承载了来自“篮球吱神”的祝福，只是接近就能让人感受到自身的篮球潜能正在蠢蠢欲动。",
      "skillText": null,
      "source": "cw_conf.archive strings @23253687",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": {
        "match": {
          "equipmentId": "eq_support_whistle",
          "guideName": "支援口哨（支援哨子）",
          "clientName": "支援口哨（协助）",
          "clientQuality": "SSR",
          "attrText": null,
          "status": "matched"
        },
        "rating": {
          "id": "eq_support_whistle",
          "recordType": "named_item",
          "name": "支援口哨（支援哨子）",
          "quality": "SSR（UP 器材，社区称「支援口哨/哨子」；建议至少一星，或不抽）",
          "attributes": null,
          "skill": null,
          "tier": null,
          "tags": [
            "训练流",
            "商店流",
            "扭蛋流",
            "开荒",
            "PVE困难模式",
            "UP器材",
            "借用"
          ],
          "scenarios": [
            "训练流刚需",
            "开荒",
            "PVE困难模式"
          ],
          "constraints": [
            "建议至少一星再抽；零氪可借用"
          ],
          "notes": "训练流/商店流「刚需一星以上哨子」；开服第二天器材卡池的 UP 器材，对第三天解锁的困难模式提升大；前期钻石优先给它。零氪可向大佬借用（每天约 6 次）、每天只玩 6 局也可不抽。所有 UP 池器材「至少一星，或者不抽」。效果图来自早期测试，公测可能更强。",
          "evidenceQuote": "训练流：刚需一星以上的哨子……商店流：刚需一星哨子……所有up池器材都是至少一星，或者不抽。",
          "sourceFile": "data/structured/guides/725601；725397；725564；725600；725610",
          "sourceUrl": "https://www.gamekee.com/lqsn/725601.html",
          "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
          "confidence": "多源一致（社区攻略；具体属性/技能文本未给出）"
        }
      }
    },
    {
      "id": "eq_041",
      "name": "明日叶32号球衣(体能)",
      "baseName": "明日叶32号球衣",
      "attrText": "体能",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23258765",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_042",
      "name": "智能跳绳（弹跳）",
      "baseName": "智能跳绳",
      "attrText": "弹跳",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23254851",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_043",
      "name": "最强理事长",
      "baseName": "最强理事长",
      "attrText": null,
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23253922",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_044",
      "name": "最强理事长（意识）",
      "baseName": "最强理事长",
      "attrText": "意识",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23253938",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_045",
      "name": "汉堡(弹跳)",
      "baseName": "汉堡",
      "attrText": "弹跳",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23258293",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_046",
      "name": "筋膜枪（意识）",
      "baseName": "筋膜枪",
      "attrText": "意识",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23256474",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_047",
      "name": "篮球吱神",
      "baseName": "篮球吱神",
      "attrText": null,
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23253884",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_048",
      "name": "篮球吱神（协助）",
      "baseName": "篮球吱神",
      "attrText": null,
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23253897",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_049",
      "name": "红色的编织手绳(投射)",
      "baseName": "红色的编织手绳",
      "attrText": "投射",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257915",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_050",
      "name": "经典录像带（意识）",
      "baseName": "经典录像带",
      "attrText": "意识",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23256297",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_051",
      "name": "绳梯（运控）",
      "baseName": "绳梯",
      "attrText": "运控",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257151",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_052",
      "name": "花球(防守)",
      "baseName": "花球",
      "attrText": "防守",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23258626",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_053",
      "name": "计分牌（意识）",
      "baseName": "计分牌",
      "attrText": "意识",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23256623",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_054",
      "name": "计时器（意识）",
      "baseName": "计时器",
      "attrText": "意识",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23256645",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_055",
      "name": "赛场之星（投射）",
      "baseName": "赛场之星",
      "attrText": "投射",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23254090",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_056",
      "name": "起跳之星(弹跳)",
      "baseName": "起跳之星",
      "attrText": "弹跳",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23258308",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": {
        "match": {
          "equipmentId": "eq_jump_star",
          "guideName": "起跳之星",
          "clientName": "起跳之星(弹跳)",
          "clientQuality": "SSR",
          "attrText": "弹跳",
          "status": "matched"
        },
        "rating": {
          "id": "eq_jump_star",
          "recordType": "named_item",
          "name": "起跳之星",
          "quality": "SSR（UP 器材）",
          "attributes": null,
          "skill": null,
          "tier": null,
          "tags": [
            "UP器材",
            "弹跳"
          ],
          "scenarios": [
            "UP 器材池（哨响腾空）"
          ],
          "constraints": [
            "UP 目标可选，获得 UP 器材时必得所选目标（非每抽必出）"
          ],
          "notes": "「哨响腾空」器材招募的 SSR UP 器材，与 SSR 支援口哨同池；正文未给出属性/技能效果。",
          "evidenceQuote": "本期UP器材为SSR支援口哨、SSR起跳之星。",
          "sourceFile": "data/structured/guides/725397；725564",
          "sourceUrl": "https://www.gamekee.com/lqsn/725397.html",
          "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
          "confidence": "单源（招募公告转述；无效果文本）"
        }
      }
    },
    {
      "id": "eq_057",
      "name": "运动指套(意识)",
      "baseName": "运动指套",
      "attrText": "意识",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23259457",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_058",
      "name": "运动毛巾（防守）",
      "baseName": "运动毛巾",
      "attrText": "防守",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23255227",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_059",
      "name": "进阶教练手册（意识）",
      "baseName": "进阶教练手册",
      "attrText": "意识",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23257120",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_060",
      "name": "迷你篮球（投射）",
      "baseName": "迷你篮球",
      "attrText": "投射",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23254115",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_061",
      "name": "都大会冠军戒指(运控)",
      "baseName": "都大会冠军戒指",
      "attrText": "运控",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23259138",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_062",
      "name": "高级充气游泳池（防守）",
      "baseName": "高级充气游泳池",
      "attrText": "防守",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23255025",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_063",
      "name": "高级卧推装置（体能）",
      "baseName": "高级卧推装置",
      "attrText": "体能",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23255379",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_064",
      "name": "高级哑铃（弹跳）",
      "baseName": "高级哑铃",
      "attrText": "弹跳",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23254562",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_065",
      "name": "高级壶铃（防守）",
      "baseName": "高级壶铃",
      "attrText": "防守",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23255180",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_066",
      "name": "高级战术板（意识）",
      "baseName": "高级战术板",
      "attrText": "意识",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23256148",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_067",
      "name": "高级握力器（体能）",
      "baseName": "高级握力器",
      "attrText": "体能",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23255689",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_068",
      "name": "高级杠铃（运控）",
      "baseName": "高级杠铃",
      "attrText": "运控",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23256968",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_069",
      "name": "高级瑜伽垫（防守）",
      "baseName": "高级瑜伽垫",
      "attrText": "防守",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23254876",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_070",
      "name": "高级登山机（体能）",
      "baseName": "高级登山机",
      "attrText": "体能",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23255534",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_071",
      "name": "高级篮筐（投射）",
      "baseName": "高级篮筐",
      "attrText": "投射",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23253662",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_072",
      "name": "高级跑步机（弹跳）",
      "baseName": "高级跑步机",
      "attrText": "弹跳",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23254419",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_073",
      "name": "高级跳绳（运控）",
      "baseName": "高级跳绳",
      "attrText": "运控",
      "qualityText": "SSR",
      "qualityGroup": "SSR",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23256816",
      "confidence": "name+attr_text_confirmed; quality=group_marker_inferred",
      "guide": null
    },
    {
      "id": "eq_074",
      "name": "哑铃套组（投射）",
      "baseName": "哑铃套组",
      "attrText": "投射",
      "qualityText": "UP(SSR)",
      "qualityGroup": "UP",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23253311",
      "confidence": "name+attr_text_confirmed; quality=block_position_inferred",
      "guide": null
    },
    {
      "id": "eq_075",
      "name": "高级拳击手套（投射）",
      "baseName": "高级拳击手套",
      "attrText": "投射",
      "qualityText": "UP(SSR)",
      "qualityGroup": "UP",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23253621",
      "confidence": "name+attr_text_confirmed; quality=block_position_inferred",
      "guide": null
    },
    {
      "id": "eq_076",
      "name": "高级智能篮球（投射）",
      "baseName": "高级智能篮球",
      "attrText": "投射",
      "qualityText": "UP(SSR)",
      "qualityGroup": "UP",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23253457",
      "confidence": "name+attr_text_confirmed; quality=block_position_inferred",
      "guide": {
        "match": {
          "equipmentId": "eq_smart_basketball",
          "guideName": "高级智能篮球器材",
          "clientName": "高级智能篮球（投射）",
          "clientQuality": "UP(SSR)",
          "attrText": "投射",
          "status": "matched"
        },
        "rating": {
          "id": "eq_smart_basketball",
          "recordType": "named_item",
          "name": "高级智能篮球器材",
          "quality": null,
          "attributes": null,
          "skill": null,
          "tier": null,
          "tags": [
            "活动奖励"
          ],
          "scenarios": [
            "签到有礼奖励"
          ],
          "constraints": [],
          "notes": "开服「签到有礼」累计奖励之一（×1）；正文未给属性/技能效果。",
          "evidenceQuote": "签到有礼：10月23日开服后，活动累计可获得……高级智能篮球器材×1。",
          "sourceFile": "data/structured/guides/725399；725565",
          "sourceUrl": "https://www.gamekee.com/lqsn/725565.html",
          "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
          "confidence": "单源（活动奖励列表转述）"
        }
      }
    },
    {
      "id": "eq_077",
      "name": "伊澄队徽",
      "baseName": "伊澄队徽",
      "attrText": null,
      "qualityText": "队徽(独立分类)",
      "qualityGroup": "队徽",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23259843",
      "confidence": "name_text_confirmed; quality=category_inferred",
      "guide": null
    },
    {
      "id": "eq_078",
      "name": "北空之丘队徽",
      "baseName": "北空之丘队徽",
      "attrText": null,
      "qualityText": "队徽(独立分类)",
      "qualityGroup": "队徽",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23259824",
      "confidence": "name_text_confirmed; quality=category_inferred",
      "guide": null
    },
    {
      "id": "eq_079",
      "name": "圣菲洛斯队徽",
      "baseName": "圣菲洛斯队徽",
      "attrText": null,
      "qualityText": "队徽(独立分类)",
      "qualityGroup": "队徽",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23259856",
      "confidence": "name_text_confirmed; quality=category_inferred",
      "guide": null
    },
    {
      "id": "eq_080",
      "name": "明日叶队徽",
      "baseName": "明日叶队徽",
      "attrText": null,
      "qualityText": "队徽(独立分类)",
      "qualityGroup": "队徽",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23259795",
      "confidence": "name_text_confirmed; quality=category_inferred",
      "guide": null
    },
    {
      "id": "eq_081",
      "name": "樱海队徽",
      "baseName": "樱海队徽",
      "attrText": null,
      "qualityText": "队徽(独立分类)",
      "qualityGroup": "队徽",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23259782",
      "confidence": "name_text_confirmed; quality=category_inferred",
      "guide": null
    },
    {
      "id": "eq_082",
      "name": "苍骑队徽",
      "baseName": "苍骑队徽",
      "attrText": null,
      "qualityText": "队徽(独立分类)",
      "qualityGroup": "队徽",
      "qualityConfidence": "group_marker_inferred",
      "descText": null,
      "skillText": null,
      "source": "cw_conf.archive strings @23259811",
      "confidence": "name_text_confirmed; quality=category_inferred",
      "guide": {
        "match": {
          "equipmentId": "eq_cangqi_badge",
          "guideName": "苍骑队徽",
          "clientName": "苍骑队徽",
          "clientQuality": "队徽(独立分类)",
          "attrText": null,
          "status": "matched"
        },
        "rating": {
          "id": "eq_cangqi_badge",
          "recordType": "named_item",
          "name": "苍骑队徽",
          "quality": null,
          "attributes": null,
          "skill": null,
          "tier": null,
          "tags": [
            "PVP",
            "低概率技能"
          ],
          "scenarios": [
            "PVP/竞技场"
          ],
          "constraints": [
            "名称与归类待核对（可能为队徽/系统效果，不一定是可装备器材）"
          ],
          "notes": "正文原句：「pvp因为有苍骑队徽的影响低概率技能不适用」——说明 PVE 赌概率越级的器材在 PVP 会被苍骑队徽压制；该道具完整规则未在攻略中给出。",
          "evidenceQuote": "适合pve挑战高难度副本，赌概率越级挑战，pvp因为有苍骑队徽的影响低概率技能不适用",
          "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
          "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
          "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
          "confidence": "单源（推断为队徽/系统效果，待核对）"
        }
      }
    }
  ],
  "effectTextPool": [
    {
      "id": "eff_1",
      "offset": 7565496,
      "text": "<sprite name=attr_116>熟练度+5"
    },
    {
      "id": "eff_2",
      "offset": 7565542,
      "text": "<sprite name=attr_101>投射+5"
    },
    {
      "id": "eff_3",
      "offset": 7565573,
      "text": "<sprite name=attr_101>投射"
    },
    {
      "id": "eff_4",
      "offset": 7565615,
      "text": "<sprite name=attr_102>弹跳+5"
    },
    {
      "id": "eff_5",
      "offset": 7565646,
      "text": "<sprite name=attr_102>弹跳"
    },
    {
      "id": "eff_6",
      "offset": 7565682,
      "text": "<sprite name=attr_103>防守+5"
    },
    {
      "id": "eff_7",
      "offset": 7565713,
      "text": "<sprite name=attr_103>防守"
    },
    {
      "id": "eff_8",
      "offset": 7565749,
      "text": "<sprite name=attr_104>体能+5"
    },
    {
      "id": "eff_9",
      "offset": 7565780,
      "text": "<sprite name=attr_104>体能"
    },
    {
      "id": "eff_10",
      "offset": 7565816,
      "text": "<sprite name=attr_105>运控+5"
    },
    {
      "id": "eff_11",
      "offset": 7565847,
      "text": "<sprite name=attr_105>运控"
    },
    {
      "id": "eff_12",
      "offset": 7565883,
      "text": "<sprite name=attr_106>意识+5"
    },
    {
      "id": "eff_13",
      "offset": 7565914,
      "text": "<sprite name=attr_106>意识"
    },
    {
      "id": "eff_14",
      "offset": 7565950,
      "text": "<sprite name=attr_116>熟练度+10"
    },
    {
      "id": "eff_15",
      "offset": 7565988,
      "text": "<sprite name=attr_117>暴击加成+10%"
    },
    {
      "id": "eff_16",
      "offset": 7566031,
      "text": "<sprite name=attr_101>投射+10"
    },
    {
      "id": "eff_17",
      "offset": 7566063,
      "text": "<sprite name=attr_102>弹跳+10"
    },
    {
      "id": "eff_18",
      "offset": 7566095,
      "text": "<sprite name=attr_103>防守+10"
    },
    {
      "id": "eff_19",
      "offset": 7566127,
      "text": "<sprite name=attr_104>体能+10"
    },
    {
      "id": "eff_20",
      "offset": 7566159,
      "text": "<sprite name=attr_105>运控+10"
    },
    {
      "id": "eff_21",
      "offset": 7566191,
      "text": "<sprite name=attr_106>意识+10"
    },
    {
      "id": "eff_22",
      "offset": 7566223,
      "text": "<sprite name=attr_116>熟练度+15"
    },
    {
      "id": "eff_23",
      "offset": 7566261,
      "text": "<sprite name=attr_117>暴击加成+15%"
    },
    {
      "id": "eff_24",
      "offset": 7566305,
      "text": "<sprite name=attr_101>投射+15"
    },
    {
      "id": "eff_25",
      "offset": 7566337,
      "text": "<sprite name=attr_102>弹跳+15"
    },
    {
      "id": "eff_26",
      "offset": 7566369,
      "text": "<sprite name=attr_103>防守+15"
    },
    {
      "id": "eff_27",
      "offset": 7566401,
      "text": "<sprite name=attr_104>体能+15"
    },
    {
      "id": "eff_28",
      "offset": 7566433,
      "text": "<sprite name=attr_105>运控+15"
    },
    {
      "id": "eff_29",
      "offset": 7566465,
      "text": "<sprite name=attr_106>意识+15"
    },
    {
      "id": "eff_30",
      "offset": 7566497,
      "text": "<sprite name=attr_116>熟练度+20"
    },
    {
      "id": "eff_31",
      "offset": 7602065,
      "text": "队友训练时，有{value}概率额外增加1～2个队友。"
    },
    {
      "id": "eff_32",
      "offset": 7602411,
      "text": "队友训练时，所有表情一致的概率提升，解锁训练2倍速"
    },
    {
      "id": "eff_33",
      "offset": 7602485,
      "text": "队友训练时，表情一致的概率提升，解锁训练2倍速"
    },
    {
      "id": "eff_34",
      "offset": 7603731,
      "text": "<sprite name=attr_101>投射+1"
    },
    {
      "id": "eff_35",
      "offset": 7603762,
      "text": "<sprite name=attr_101>投射+2"
    },
    {
      "id": "eff_36",
      "offset": 7603793,
      "text": "<sprite name=attr_101>投射+3"
    },
    {
      "id": "eff_37",
      "offset": 7603824,
      "text": "<sprite name=attr_101>投射+4"
    },
    {
      "id": "eff_38",
      "offset": 7603855,
      "text": "<sprite name=attr_101>投射+6"
    },
    {
      "id": "eff_39",
      "offset": 7603886,
      "text": "<sprite name=attr_101>投射+7"
    },
    {
      "id": "eff_40",
      "offset": 7603917,
      "text": "<sprite name=attr_101>投射+8"
    },
    {
      "id": "eff_41",
      "offset": 7603948,
      "text": "<sprite name=attr_101>投射+9"
    },
    {
      "id": "eff_42",
      "offset": 7603979,
      "text": "<sprite name=attr_101>投射+11"
    },
    {
      "id": "eff_43",
      "offset": 7604014,
      "text": "<sprite name=attr_101>投射+12"
    },
    {
      "id": "eff_44",
      "offset": 7604046,
      "text": "<sprite name=attr_101>投射+13"
    },
    {
      "id": "eff_45",
      "offset": 7604078,
      "text": "<sprite name=attr_101>投射+14"
    },
    {
      "id": "eff_46",
      "offset": 7604110,
      "text": "<sprite name=attr_101>投射+16"
    },
    {
      "id": "eff_47",
      "offset": 7604142,
      "text": "<sprite name=attr_101>投射+17"
    },
    {
      "id": "eff_48",
      "offset": 7604174,
      "text": "<sprite name=attr_101>投射+18"
    },
    {
      "id": "eff_49",
      "offset": 7604206,
      "text": "<sprite name=attr_101>投射+19"
    },
    {
      "id": "eff_50",
      "offset": 7604238,
      "text": "<sprite name=attr_101>投射+21"
    },
    {
      "id": "eff_51",
      "offset": 7604270,
      "text": "<sprite name=attr_101>投射+22"
    },
    {
      "id": "eff_52",
      "offset": 7604302,
      "text": "<sprite name=attr_101>投射+23"
    },
    {
      "id": "eff_53",
      "offset": 7604334,
      "text": "<sprite name=attr_101>投射+24"
    },
    {
      "id": "eff_54",
      "offset": 7604366,
      "text": "<sprite name=attr_101>投射+25"
    },
    {
      "id": "eff_55",
      "offset": 7604398,
      "text": "<sprite name=attr_101>投射+26"
    },
    {
      "id": "eff_56",
      "offset": 7604433,
      "text": "<sprite name=attr_101>投射+27"
    },
    {
      "id": "eff_57",
      "offset": 7604468,
      "text": "<sprite name=attr_101>投射+28"
    },
    {
      "id": "eff_58",
      "offset": 7604500,
      "text": "<sprite name=attr_101>投射+29"
    },
    {
      "id": "eff_59",
      "offset": 7604535,
      "text": "<sprite name=attr_101>投射+31"
    },
    {
      "id": "eff_60",
      "offset": 7604570,
      "text": "<sprite name=attr_101>投射+32"
    },
    {
      "id": "eff_61",
      "offset": 7604602,
      "text": "<sprite name=attr_101>投射+33"
    },
    {
      "id": "eff_62",
      "offset": 7604637,
      "text": "<sprite name=attr_101>投射+34"
    },
    {
      "id": "eff_63",
      "offset": 7604672,
      "text": "<sprite name=attr_101>投射+35"
    },
    {
      "id": "eff_64",
      "offset": 7604704,
      "text": "<sprite name=attr_101>投射+36"
    },
    {
      "id": "eff_65",
      "offset": 7604739,
      "text": "<sprite name=attr_101>投射+37"
    },
    {
      "id": "eff_66",
      "offset": 7604771,
      "text": "<sprite name=attr_101>投射+38"
    },
    {
      "id": "eff_67",
      "offset": 7604806,
      "text": "<sprite name=attr_101>投射+39"
    },
    {
      "id": "eff_68",
      "offset": 7604838,
      "text": "<sprite name=attr_101>投射+41"
    },
    {
      "id": "eff_69",
      "offset": 7604870,
      "text": "<sprite name=attr_101>投射+42"
    },
    {
      "id": "eff_70",
      "offset": 7604905,
      "text": "<sprite name=attr_101>投射+43"
    },
    {
      "id": "eff_71",
      "offset": 7604937,
      "text": "<sprite name=attr_101>投射+44"
    },
    {
      "id": "eff_72",
      "offset": 7604972,
      "text": "<sprite name=attr_101>投射+45"
    },
    {
      "id": "eff_73",
      "offset": 7605004,
      "text": "<sprite name=attr_101>投射+46"
    },
    {
      "id": "eff_74",
      "offset": 7605039,
      "text": "<sprite name=attr_101>投射+47"
    },
    {
      "id": "eff_75",
      "offset": 7605071,
      "text": "<sprite name=attr_101>投射+48"
    },
    {
      "id": "eff_76",
      "offset": 7605106,
      "text": "<sprite name=attr_101>投射+49"
    },
    {
      "id": "eff_77",
      "offset": 7605141,
      "text": "<sprite name=attr_117>暴击加成+6%"
    },
    {
      "id": "eff_78",
      "offset": 7605182,
      "text": "<sprite name=attr_117>暴击加成+7%"
    },
    {
      "id": "eff_79",
      "offset": 7605223,
      "text": "<sprite name=attr_117>暴击加成+9%"
    },
    {
      "id": "eff_80",
      "offset": 7605261,
      "text": "<sprite name=attr_117>暴击加成+11%"
    },
    {
      "id": "eff_81",
      "offset": 7605300,
      "text": "<sprite name=attr_117>暴击加成+12%"
    },
    {
      "id": "eff_82",
      "offset": 7605339,
      "text": "<sprite name=attr_117>暴击加成+13%"
    },
    {
      "id": "eff_83",
      "offset": 7605378,
      "text": "<sprite name=attr_117>暴击加成+14%"
    },
    {
      "id": "eff_84",
      "offset": 7605417,
      "text": "<sprite name=attr_117>暴击加成+16%"
    },
    {
      "id": "eff_85",
      "offset": 7605456,
      "text": "<sprite name=attr_117>暴击加成+17%"
    },
    {
      "id": "eff_86",
      "offset": 7605495,
      "text": "<sprite name=attr_117>暴击加成+18%"
    },
    {
      "id": "eff_87",
      "offset": 7605534,
      "text": "<sprite name=attr_117>暴击加成+19%"
    },
    {
      "id": "eff_88",
      "offset": 7605573,
      "text": "<sprite name=attr_117>暴击加成+21%"
    },
    {
      "id": "eff_89",
      "offset": 7605616,
      "text": "<sprite name=attr_117>暴击加成+22%"
    },
    {
      "id": "eff_90",
      "offset": 7605655,
      "text": "<sprite name=attr_117>暴击加成+23%"
    },
    {
      "id": "eff_91",
      "offset": 7605694,
      "text": "<sprite name=attr_117>暴击加成+24%"
    },
    {
      "id": "eff_92",
      "offset": 7605733,
      "text": "<sprite name=attr_117>暴击加成+25%"
    },
    {
      "id": "eff_93",
      "offset": 7605772,
      "text": "<sprite name=attr_117>暴击加成+26%"
    },
    {
      "id": "eff_94",
      "offset": 7605815,
      "text": "<sprite name=attr_117>暴击加成+27%"
    },
    {
      "id": "eff_95",
      "offset": 7605854,
      "text": "<sprite name=attr_117>暴击加成+28%"
    },
    {
      "id": "eff_96",
      "offset": 7605893,
      "text": "<sprite name=attr_117>暴击加成+29%"
    },
    {
      "id": "eff_97",
      "offset": 7605932,
      "text": "<sprite name=attr_116>熟练度"
    },
    {
      "id": "eff_98",
      "offset": 7605964,
      "text": "<sprite name=attr_116>熟练度+21"
    },
    {
      "id": "eff_99",
      "offset": 7605999,
      "text": "<sprite name=attr_116>熟练度+22"
    },
    {
      "id": "eff_100",
      "offset": 7606034,
      "text": "<sprite name=attr_116>熟练度+23"
    },
    {
      "id": "eff_101",
      "offset": 7606069,
      "text": "<sprite name=attr_116>熟练度+24"
    },
    {
      "id": "eff_102",
      "offset": 7606104,
      "text": "<sprite name=attr_116>熟练度+25"
    },
    {
      "id": "eff_103",
      "offset": 7606139,
      "text": "<sprite name=attr_116>熟练度+26"
    },
    {
      "id": "eff_104",
      "offset": 7606174,
      "text": "<sprite name=attr_116>熟练度+27"
    },
    {
      "id": "eff_105",
      "offset": 7606209,
      "text": "<sprite name=attr_116>熟练度+28"
    },
    {
      "id": "eff_106",
      "offset": 7606244,
      "text": "<sprite name=attr_116>熟练度+29"
    },
    {
      "id": "eff_107",
      "offset": 7606279,
      "text": "<sprite name=attr_116>熟练度+31"
    },
    {
      "id": "eff_108",
      "offset": 7606314,
      "text": "<sprite name=attr_116>熟练度+32"
    },
    {
      "id": "eff_109",
      "offset": 7606349,
      "text": "<sprite name=attr_116>熟练度+33"
    },
    {
      "id": "eff_110",
      "offset": 7606384,
      "text": "<sprite name=attr_116>熟练度+34"
    },
    {
      "id": "eff_111",
      "offset": 7606419,
      "text": "<sprite name=attr_116>熟练度+35"
    },
    {
      "id": "eff_112",
      "offset": 7606454,
      "text": "<sprite name=attr_116>熟练度+36"
    },
    {
      "id": "eff_113",
      "offset": 7606489,
      "text": "<sprite name=attr_116>熟练度+37"
    },
    {
      "id": "eff_114",
      "offset": 7606524,
      "text": "<sprite name=attr_116>熟练度+38"
    },
    {
      "id": "eff_115",
      "offset": 7606559,
      "text": "<sprite name=attr_116>熟练度+39"
    },
    {
      "id": "eff_116",
      "offset": 7606594,
      "text": "<sprite name=attr_116>熟练度+40"
    },
    {
      "id": "eff_117",
      "offset": 7606629,
      "text": "<sprite name=attr_116>熟练度+41"
    },
    {
      "id": "eff_118",
      "offset": 7606664,
      "text": "<sprite name=attr_116>熟练度+42"
    },
    {
      "id": "eff_119",
      "offset": 7606699,
      "text": "<sprite name=attr_116>熟练度+43"
    },
    {
      "id": "eff_120",
      "offset": 7606734,
      "text": "<sprite name=attr_116>熟练度+44"
    },
    {
      "id": "eff_121",
      "offset": 7606769,
      "text": "<sprite name=attr_116>熟练度+45"
    },
    {
      "id": "eff_122",
      "offset": 7606804,
      "text": "出现在投射训练时，<sprite name=attr_101>投射+3"
    },
    {
      "id": "eff_123",
      "offset": 7606862,
      "text": "与器材一起训练时，投射额外增加{value}"
    },
    {
      "id": "eff_124",
      "offset": 7606915,
      "text": "<sprite name=attr_119>出现率+150"
    },
    {
      "id": "eff_125",
      "offset": 7606951,
      "text": "器材出现在投射训练上的概率提升{value}"
    },
    {
      "id": "eff_126",
      "offset": 7607108,
      "text": "<sprite name=attr_120>陪伴加成+3%"
    },
    {
      "id": "eff_127",
      "offset": 7607146,
      "text": "进行训练时，额外获得3%加成"
    },
    {
      "id": "eff_128",
      "offset": 7607185,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=201701\"><u>[扣篮擅长]</u></link>或<link=\"skill?id=205501\"><u>[扣篮精通]</u></link>"
    },
    {
      "id": "eff_129",
      "offset": 7607354,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210054\"><u>[三分抗干扰]</u></link>或<link=\"skill?id=210078\"><u>[三分强抗干扰]</u></link>"
    },
    {
      "id": "eff_130",
      "offset": 7607629,
      "text": "<sprite name=attr_101>投射+15, <sprite name=attr_102>弹跳+15, <sprite name=attr_103>防守+15, <sprite name=attr_104>体能+15, <sprite name=attr_105>运控+15, <sprite name=attr_106>意识+15"
    },
    {
      "id": "eff_131",
      "offset": 7607928,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210202\"><u>[横撤妨碍]</u></link>或<link=\"skill?id=210203\"><u>[横撤妨害]</u></link>"
    },
    {
      "id": "eff_132",
      "offset": 7608158,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210266\"><u>[进攻篮板妨碍]</u></link>或<link=\"skill?id=210268\"><u>[进攻篮板妨害]</u></link>"
    },
    {
      "id": "eff_133",
      "offset": 7608529,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210053\"><u>[上篮抗干扰]</u></link>或<link=\"skill?id=210077\"><u>[上篮强抗干扰]</u></link>"
    },
    {
      "id": "eff_134",
      "offset": 7608942,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210199\"><u>[横撤擅长]</u></link>或<link=\"skill?id=210200\"><u>[横撤精通]</u></link>"
    },
    {
      "id": "eff_135",
      "offset": 7609111,
      "text": "精力>=55时，训练基础值+2"
    },
    {
      "id": "eff_136",
      "offset": 7609158,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210055\"><u>[中投抗干扰]</u></link>或<link=\"skill?id=210079\"><u>[中投强抗干扰]</u></link>"
    },
    {
      "id": "eff_137",
      "offset": 7609336,
      "text": "周六训练时，额外增加3点主属性和副属性"
    },
    {
      "id": "eff_138",
      "offset": 7609551,
      "text": "周六训练时，额外增加的主属性和副属性由3点提高至5点"
    },
    {
      "id": "eff_139",
      "offset": 7609703,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=201901\"><u>[三分妨碍]</u></link>或<link=\"skill?id=205701\"><u>[三分妨害]</u></link>"
    },
    {
      "id": "eff_140",
      "offset": 7609985,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210265\"><u>[防守篮板妨碍]</u></link>或<link=\"skill?id=210267\"><u>[防守篮板妨害]</u></link>"
    },
    {
      "id": "eff_141",
      "offset": 7610244,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210270\"><u>[看破减弱]</u></link>或<link=\"skill?id=210272\"><u>[看破妨害]</u></link>"
    },
    {
      "id": "eff_142",
      "offset": 7610413,
      "text": "队友训练时，有50%的概率训练副属性+2"
    },
    {
      "id": "eff_143",
      "offset": 7610480,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210251\"><u>[盖帽破译]</u></link>或<link=\"skill?id=210253\"><u>[盖帽破解]</u></link>"
    },
    {
      "id": "eff_144",
      "offset": 7610701,
      "text": "小游戏基础值的叠加次数上限由6次提高至9次"
    },
    {
      "id": "eff_145",
      "offset": 7610774,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210259\"><u>[扣篮干扰]</u></link>或<link=\"skill?id=210264\"><u>[扣篮强干扰]</u></link>"
    },
    {
      "id": "eff_146",
      "offset": 7611010,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210208\"><u>[背打妨碍]</u></link>或<link=\"skill?id=210209\"><u>[背打妨害]</u></link>"
    },
    {
      "id": "eff_147",
      "offset": 7611258,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=201801\"><u>[上篮妨碍]</u></link>或<link=\"skill?id=205601\"><u>[上篮妨害]</u></link>"
    },
    {
      "id": "eff_148",
      "offset": 7611483,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210252\"><u>[抢断破译]</u></link>或<link=\"skill?id=210254\"><u>[抢断破解]</u></link>"
    },
    {
      "id": "eff_149",
      "offset": 7611807,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=202101\"><u>[勾手妨碍]</u></link>或<link=\"skill?id=205901\"><u>[勾手妨害]</u></link>"
    },
    {
      "id": "eff_150",
      "offset": 7612139,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210275\"><u>[盯防破译]</u></link>或<link=\"skill?id=210276\"><u>[盯防破解]</u></link>"
    },
    {
      "id": "eff_151",
      "offset": 7612394,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=202001\"><u>[中投妨碍]</u></link>或<link=\"skill?id=205801\"><u>[中投妨害]</u></link>"
    },
    {
      "id": "eff_152",
      "offset": 7612620,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210206\"><u>[后撤妨碍]</u></link>或<link=\"skill?id=210207\"><u>[后撤妨害]</u></link>"
    },
    {
      "id": "eff_153",
      "offset": 7613132,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=210256\"><u>[三分干扰]</u></link>或<link=\"skill?id=210261\"><u>[三分强干扰]</u></link>"
    },
    {
      "id": "eff_154",
      "offset": 7613586,
      "text": "<sprite name=attr_120>陪伴加成+10%"
    },
    {
      "id": "eff_155",
      "offset": 7613638,
      "text": "在训练时，有{value}的概率触发事件，获得技能<link=\"skill?id=201601\"><u>[勾手擅长]</u></link>或<link=\"skill?id=205401\"><u>[勾手精通]</u></link>"
    },
    {
      "id": "eff_156",
      "offset": 7613807,
      "text": "<sprite name=attr_104>体能+8"
    },
    {
      "id": "eff_157",
      "offset": 7613838,
      "text": "<sprite name=attr_104>体能+12"
    },
    {
      "id": "eff_158",
      "offset": 7613870,
      "text": "<sprite name=attr_102>弹跳+8"
    },
    {
      "id": "eff_159",
      "offset": 7613901,
      "text": "<sprite name=attr_102>弹跳+12"
    },
    {
      "id": "eff_160",
      "offset": 7613933,
      "text": "<sprite name=attr_103>防守+8"
    },
    {
      "id": "eff_161",
      "offset": 7613964,
      "text": "<sprite name=attr_103>防守+12"
    },
    {
      "id": "eff_162",
      "offset": 7613996,
      "text": "<sprite name=attr_105>运控+8"
    },
    {
      "id": "eff_163",
      "offset": 7614027,
      "text": "<sprite name=attr_105>运控+12"
    },
    {
      "id": "eff_164",
      "offset": 7614059,
      "text": "<sprite name=attr_106>意识+8"
    },
    {
      "id": "eff_165",
      "offset": 7614090,
      "text": "<sprite name=attr_106>意识+12"
    },
    {
      "id": "eff_166",
      "offset": 7614122,
      "text": "<sprite name=attr_116>熟练度+11"
    },
    {
      "id": "eff_167",
      "offset": 7614157,
      "text": "<sprite name=attr_116>熟练度+12"
    },
    {
      "id": "eff_168",
      "offset": 7614192,
      "text": "<sprite name=attr_116>熟练度+13"
    },
    {
      "id": "eff_169",
      "offset": 7614227,
      "text": "<sprite name=attr_116>熟练度+14"
    },
    {
      "id": "eff_170",
      "offset": 7614262,
      "text": "<sprite name=attr_116>熟练度+16"
    },
    {
      "id": "eff_171",
      "offset": 7614297,
      "text": "<sprite name=attr_116>熟练度+17"
    },
    {
      "id": "eff_172",
      "offset": 7614332,
      "text": "<sprite name=attr_116>熟练度+18"
    },
    {
      "id": "eff_173",
      "offset": 7614367,
      "text": "<sprite name=attr_116>熟练度+19"
    },
    {
      "id": "eff_174",
      "offset": 7614402,
      "text": "满熟练度时，暴击加成+10%"
    },
    {
      "id": "eff_175",
      "offset": 7614437,
      "text": "<link=\"baoji\">满熟练度时，暴击加成+10%</link>"
    },
    {
      "id": "eff_176",
      "offset": 7614508,
      "text": "<link=\"ps_des_2\">精力消耗下降</link>"
    },
    {
      "id": "eff_177",
      "offset": 7614551,
      "text": "出现在投射训练时，<sprite name=attr_101>投射+1"
    },
    {
      "id": "eff_178",
      "offset": 7614609,
      "text": "<link=\"shoot_base_a\">投射基础值</link>"
    },
    {
      "id": "eff_179",
      "offset": 7614653,
      "text": "<sprite name=attr_103>防守+11"
    },
    {
      "id": "eff_180",
      "offset": 7614685,
      "text": "<sprite name=attr_103>防守+13"
    },
    {
      "id": "eff_181",
      "offset": 7614717,
      "text": "<sprite name=attr_103>防守+14"
    },
    {
      "id": "eff_182",
      "offset": 7614749,
      "text": "<sprite name=attr_103>防守+16"
    },
    {
      "id": "eff_183",
      "offset": 7614781,
      "text": "<sprite name=attr_103>防守+17"
    },
    {
      "id": "eff_184",
      "offset": 7614813,
      "text": "<sprite name=attr_103>防守+18"
    },
    {
      "id": "eff_185",
      "offset": 7614845,
      "text": "<sprite name=attr_103>防守+19"
    },
    {
      "id": "eff_186",
      "offset": 7614877,
      "text": "<sprite name=attr_103>防守+21"
    },
    {
      "id": "eff_187",
      "offset": 7614909,
      "text": "<sprite name=attr_103>防守+22"
    },
    {
      "id": "eff_188",
      "offset": 7614941,
      "text": "<sprite name=attr_103>防守+23"
    },
    {
      "id": "eff_189",
      "offset": 7614973,
      "text": "<sprite name=attr_103>防守+24"
    },
    {
      "id": "eff_190",
      "offset": 7615005,
      "text": "<sprite name=attr_103>防守+25"
    },
    {
      "id": "eff_191",
      "offset": 7615037,
      "text": "<sprite name=attr_103>防守+26"
    },
    {
      "id": "eff_192",
      "offset": 7615069,
      "text": "<sprite name=attr_103>防守+27"
    },
    {
      "id": "eff_193",
      "offset": 7615101,
      "text": "<sprite name=attr_103>防守+28"
    },
    {
      "id": "eff_194",
      "offset": 7615133,
      "text": "<sprite name=attr_103>防守+29"
    },
    {
      "id": "eff_195",
      "offset": 7615165,
      "text": "<sprite name=attr_103>防守+30"
    },
    {
      "id": "eff_196",
      "offset": 7615197,
      "text": "<sprite name=attr_103>防守+31"
    },
    {
      "id": "eff_197",
      "offset": 7615229,
      "text": "<sprite name=attr_103>防守+32"
    },
    {
      "id": "eff_198",
      "offset": 7615261,
      "text": "<sprite name=attr_103>防守+33"
    },
    {
      "id": "eff_199",
      "offset": 7615293,
      "text": "<sprite name=attr_103>防守+34"
    },
    {
      "id": "eff_200",
      "offset": 7615325,
      "text": "<sprite name=attr_103>防守+35"
    },
    {
      "id": "eff_201",
      "offset": 7615357,
      "text": "出现在防守训练时，<sprite name=attr_103>防守+1"
    },
    {
      "id": "eff_202",
      "offset": 7615415,
      "text": "<link=\"defence_base\">防守基础值</link>"
    },
    {
      "id": "eff_203",
      "offset": 7615469,
      "text": "<sprite name=attr_121>训练失败率-5%"
    },
    {
      "id": "eff_204",
      "offset": 7615510,
      "text": "<link=\"failrate_5\">失败率下降</link>"
    },
    {
      "id": "eff_205",
      "offset": 7615552,
      "text": "训练失败率"
    },
    {
      "id": "eff_206",
      "offset": 7615568,
      "text": "<sprite name=attr_123>成功概率+5%"
    },
    {
      "id": "eff_207",
      "offset": 7615606,
      "text": "训练精力消耗降低6"
    },
    {
      "id": "eff_208",
      "offset": 7615661,
      "text": "<sprite name=attr_122>亲密度+50"
    },
    {
      "id": "eff_209",
      "offset": 7615696,
      "text": "<sprite name=attr_122>亲密度+51"
    },
    {
      "id": "eff_210",
      "offset": 7615731,
      "text": "<sprite name=attr_122>亲密度+52"
    },
    {
      "id": "eff_211",
      "offset": 7615766,
      "text": "<sprite name=attr_122>亲密度+53"
    },
    {
      "id": "eff_212",
      "offset": 7615801,
      "text": "<sprite name=attr_122>亲密度+54"
    },
    {
      "id": "eff_213",
      "offset": 7615836,
      "text": "<sprite name=attr_122>亲密度+55"
    },
    {
      "id": "eff_214",
      "offset": 7615871,
      "text": "<sprite name=attr_122>亲密度+56"
    },
    {
      "id": "eff_215",
      "offset": 7615906,
      "text": "<sprite name=attr_122>亲密度+57"
    },
    {
      "id": "eff_216",
      "offset": 7615941,
      "text": "<sprite name=attr_122>亲密度+58"
    },
    {
      "id": "eff_217",
      "offset": 7615976,
      "text": "<sprite name=attr_122>亲密度+59"
    },
    {
      "id": "eff_218",
      "offset": 7616011,
      "text": "<sprite name=attr_122>亲密度+60"
    },
    {
      "id": "eff_219",
      "offset": 7616046,
      "text": "<sprite name=attr_122>亲密度+61"
    },
    {
      "id": "eff_220",
      "offset": 7616081,
      "text": "<sprite name=attr_122>亲密度+62"
    },
    {
      "id": "eff_221",
      "offset": 7616116,
      "text": "<sprite name=attr_122>亲密度+63"
    },
    {
      "id": "eff_222",
      "offset": 7616151,
      "text": "<sprite name=attr_122>亲密度+64"
    },
    {
      "id": "eff_223",
      "offset": 7616186,
      "text": "<sprite name=attr_122>亲密度+65"
    },
    {
      "id": "eff_224",
      "offset": 7616221,
      "text": "<sprite name=attr_122>亲密度+66"
    },
    {
      "id": "eff_225",
      "offset": 7616256,
      "text": "<sprite name=attr_122>亲密度+67"
    },
    {
      "id": "eff_226",
      "offset": 7616291,
      "text": "<sprite name=attr_122>亲密度+68"
    },
    {
      "id": "eff_227",
      "offset": 7616326,
      "text": "<sprite name=attr_122>亲密度+69"
    },
    {
      "id": "eff_228",
      "offset": 7616361,
      "text": "<sprite name=attr_122>亲密度+70"
    },
    {
      "id": "eff_229",
      "offset": 7616396,
      "text": "<sprite name=attr_122>亲密度+71"
    },
    {
      "id": "eff_230",
      "offset": 7616431,
      "text": "<sprite name=attr_122>亲密度+72"
    },
    {
      "id": "eff_231",
      "offset": 7616466,
      "text": "<sprite name=attr_122>亲密度+73"
    },
    {
      "id": "eff_232",
      "offset": 7616501,
      "text": "<sprite name=attr_122>亲密度+74"
    },
    {
      "id": "eff_233",
      "offset": 7616536,
      "text": "<sprite name=attr_122>亲密度+75"
    },
    {
      "id": "eff_234",
      "offset": 7616571,
      "text": "<sprite name=attr_122>亲密度+76"
    },
    {
      "id": "eff_235",
      "offset": 7616606,
      "text": "<sprite name=attr_122>亲密度+77"
    },
    {
      "id": "eff_236",
      "offset": 7616641,
      "text": "<sprite name=attr_122>亲密度+78"
    },
    {
      "id": "eff_237",
      "offset": 7616676,
      "text": "<sprite name=attr_122>亲密度+79"
    },
    {
      "id": "eff_238",
      "offset": 7616711,
      "text": "<sprite name=attr_122>亲密度+81"
    },
    {
      "id": "eff_239",
      "offset": 7616746,
      "text": "<sprite name=attr_122>亲密度+82"
    },
    {
      "id": "eff_240",
      "offset": 7616781,
      "text": "<sprite name=attr_122>亲密度+83"
    },
    {
      "id": "eff_241",
      "offset": 7616816,
      "text": "<sprite name=attr_122>亲密度+84"
    },
    {
      "id": "eff_242",
      "offset": 7616851,
      "text": "<sprite name=attr_122>亲密度+85"
    },
    {
      "id": "eff_243",
      "offset": 7616886,
      "text": "<sprite name=attr_122>亲密度+86"
    },
    {
      "id": "eff_244",
      "offset": 7616921,
      "text": "<sprite name=attr_122>亲密度+87"
    },
    {
      "id": "eff_245",
      "offset": 7616956,
      "text": "<sprite name=attr_122>亲密度+88"
    },
    {
      "id": "eff_246",
      "offset": 7616991,
      "text": "<sprite name=attr_122>亲密度+89"
    },
    {
      "id": "eff_247",
      "offset": 7617026,
      "text": "<sprite name=attr_122>亲密度+90"
    },
    {
      "id": "eff_248",
      "offset": 7617061,
      "text": "<sprite name=attr_122>亲密度+91"
    },
    {
      "id": "eff_249",
      "offset": 7617096,
      "text": "<sprite name=attr_122>亲密度+92"
    },
    {
      "id": "eff_250",
      "offset": 7617131,
      "text": "<sprite name=attr_122>亲密度+93"
    },
    {
      "id": "eff_251",
      "offset": 7617166,
      "text": "<sprite name=attr_122>亲密度+94"
    },
    {
      "id": "eff_252",
      "offset": 7617201,
      "text": "<sprite name=attr_122>亲密度+95"
    },
    {
      "id": "eff_253",
      "offset": 7617236,
      "text": "<sprite name=attr_122>亲密度+96"
    },
    {
      "id": "eff_254",
      "offset": 7617271,
      "text": "<sprite name=attr_122>亲密度+97"
    },
    {
      "id": "eff_255",
      "offset": 7617306,
      "text": "<sprite name=attr_122>亲密度+98"
    },
    {
      "id": "eff_256",
      "offset": 7617341,
      "text": "<sprite name=attr_122>亲密度+100"
    },
    {
      "id": "eff_257",
      "offset": 7617377,
      "text": "<sprite name=attr_120>陪伴加成+1%"
    },
    {
      "id": "eff_258",
      "offset": 7617415,
      "text": "<sprite name=attr_120>陪伴加成+4%"
    },
    {
      "id": "eff_259",
      "offset": 7617453,
      "text": "<sprite name=attr_120>陪伴加成+6%"
    },
    {
      "id": "eff_260",
      "offset": 7617491,
      "text": "<sprite name=attr_120>陪伴加成+7%"
    },
    {
      "id": "eff_261",
      "offset": 7617529,
      "text": "和经理训练时，额外获得1<link=\"exp\">经验</link>"
    },
    {
      "id": "eff_262",
      "offset": 7617687,
      "text": "<link=\"manager_d\">满熟练度额外经验</link>"
    },
    {
      "id": "eff_263",
      "offset": 7617751,
      "text": "<sprite name=attr_121>训练失败率-6%"
    },
    {
      "id": "eff_264",
      "offset": 7617792,
      "text": "<sprite name=attr_121>训练失败率-7%"
    },
    {
      "id": "eff_265",
      "offset": 7617833,
      "text": "<sprite name=attr_121>训练失败率-8%"
    },
    {
      "id": "eff_266",
      "offset": 7617874,
      "text": "<sprite name=attr_121>训练失败率-9%"
    },
    {
      "id": "eff_267",
      "offset": 7617915,
      "text": "<sprite name=attr_121>训练失败率-10%"
    },
    {
      "id": "eff_268",
      "offset": 7617957,
      "text": "<sprite name=attr_121>训练失败率-11%"
    },
    {
      "id": "eff_269",
      "offset": 7617999,
      "text": "<sprite name=attr_121>训练失败率-12%"
    },
    {
      "id": "eff_270",
      "offset": 7618041,
      "text": "<sprite name=attr_121>训练失败率-13%"
    },
    {
      "id": "eff_271",
      "offset": 7618083,
      "text": "<sprite name=attr_121>训练失败率-14%"
    },
    {
      "id": "eff_272",
      "offset": 7618125,
      "text": "<sprite name=attr_121>训练失败率-15%"
    },
    {
      "id": "eff_273",
      "offset": 7618167,
      "text": "<sprite name=attr_121>训练失败率-21%"
    },
    {
      "id": "eff_274",
      "offset": 7618209,
      "text": "<sprite name=attr_121>训练失败率-22%"
    },
    {
      "id": "eff_275",
      "offset": 7618251,
      "text": "<sprite name=attr_121>训练失败率-23%"
    },
    {
      "id": "eff_276",
      "offset": 7618293,
      "text": "<sprite name=attr_121>训练失败率-24%"
    },
    {
      "id": "eff_277",
      "offset": 7618335,
      "text": "<sprite name=attr_121>训练失败率-25%"
    },
    {
      "id": "eff_278",
      "offset": 7618377,
      "text": "<sprite name=attr_121>训练失败率-26%"
    },
    {
      "id": "eff_279",
      "offset": 7618419,
      "text": "<sprite name=attr_121>训练失败率-27%"
    },
    {
      "id": "eff_280",
      "offset": 7618461,
      "text": "<sprite name=attr_121>训练失败率-28%"
    },
    {
      "id": "eff_281",
      "offset": 7618503,
      "text": "<sprite name=attr_121>训练失败率-29%"
    },
    {
      "id": "eff_282",
      "offset": 7618545,
      "text": "<sprite name=attr_121>训练失败率-30%"
    },
    {
      "id": "eff_283",
      "offset": 7619878,
      "text": "<sprite name=attr_120>陪伴加成+9%"
    },
    {
      "id": "eff_284",
      "offset": 7619916,
      "text": "<sprite name=attr_120>陪伴加成+11%"
    },
    {
      "id": "eff_285",
      "offset": 7619955,
      "text": "<sprite name=attr_120>陪伴加成+12%"
    },
    {
      "id": "eff_286",
      "offset": 7620049,
      "text": "<link=\"event_reward\">70熟练度额外奖励</link>"
    },
    {
      "id": "eff_287",
      "offset": 7620222,
      "text": "<sprite name=attr_106>意识+6"
    },
    {
      "id": "eff_288",
      "offset": 7620253,
      "text": "<sprite name=attr_106>意识+7"
    },
    {
      "id": "eff_289",
      "offset": 7620284,
      "text": "<sprite name=attr_106>意识+9"
    },
    {
      "id": "eff_290",
      "offset": 7620315,
      "text": "<sprite name=attr_106>意识+11"
    },
    {
      "id": "eff_291",
      "offset": 7620347,
      "text": "<sprite name=attr_106>意识+13"
    },
    {
      "id": "eff_292",
      "offset": 7620379,
      "text": "<sprite name=attr_106>意识+14"
    },
    {
      "id": "eff_293",
      "offset": 7620411,
      "text": "<sprite name=attr_106>意识+16"
    },
    {
      "id": "eff_294",
      "offset": 7620443,
      "text": "<sprite name=attr_106>意识+17"
    },
    {
      "id": "eff_295",
      "offset": 7620475,
      "text": "<sprite name=attr_106>意识+18"
    },
    {
      "id": "eff_296",
      "offset": 7620507,
      "text": "<sprite name=attr_106>意识+19"
    },
    {
      "id": "eff_297",
      "offset": 7620539,
      "text": "<sprite name=attr_106>意识+21"
    },
    {
      "id": "eff_298",
      "offset": 7620571,
      "text": "<sprite name=attr_106>意识+22"
    },
    {
      "id": "eff_299",
      "offset": 7620603,
      "text": "<sprite name=attr_106>意识+23"
    },
    {
      "id": "eff_300",
      "offset": 7620635,
      "text": "<sprite name=attr_106>意识+24"
    },
    {
      "id": "eff_301",
      "offset": 7620667,
      "text": "<sprite name=attr_106>意识+25"
    },
    {
      "id": "eff_302",
      "offset": 7620699,
      "text": "<sprite name=attr_106>意识+26"
    },
    {
      "id": "eff_303",
      "offset": 7620731,
      "text": "<sprite name=attr_106>意识+27"
    },
    {
      "id": "eff_304",
      "offset": 7620763,
      "text": "<sprite name=attr_106>意识+28"
    },
    {
      "id": "eff_305",
      "offset": 7620795,
      "text": "<sprite name=attr_106>意识+29"
    },
    {
      "id": "eff_306",
      "offset": 7620827,
      "text": "<sprite name=attr_106>意识+31"
    },
    {
      "id": "eff_307",
      "offset": 7620859,
      "text": "<sprite name=attr_106>意识+32"
    },
    {
      "id": "eff_308",
      "offset": 7620891,
      "text": "<sprite name=attr_106>意识+33"
    },
    {
      "id": "eff_309",
      "offset": 7620923,
      "text": "<sprite name=attr_106>意识+34"
    },
    {
      "id": "eff_310",
      "offset": 7620955,
      "text": "<sprite name=attr_106>意识+35"
    },
    {
      "id": "eff_311",
      "offset": 7620987,
      "text": "<sprite name=attr_106>意识+36"
    },
    {
      "id": "eff_312",
      "offset": 7621019,
      "text": "<sprite name=attr_106>意识+37"
    },
    {
      "id": "eff_313",
      "offset": 7621051,
      "text": "<sprite name=attr_106>意识+38"
    },
    {
      "id": "eff_314",
      "offset": 7621083,
      "text": "<sprite name=attr_106>意识+39"
    },
    {
      "id": "eff_315",
      "offset": 7621115,
      "text": "<sprite name=attr_106>意识+41"
    },
    {
      "id": "eff_316",
      "offset": 7621147,
      "text": "<sprite name=attr_106>意识+42"
    },
    {
      "id": "eff_317",
      "offset": 7621179,
      "text": "<sprite name=attr_106>意识+43"
    },
    {
      "id": "eff_318",
      "offset": 7621211,
      "text": "<sprite name=attr_106>意识+44"
    },
    {
      "id": "eff_319",
      "offset": 7621243,
      "text": "<sprite name=attr_106>意识+45"
    },
    {
      "id": "eff_320",
      "offset": 7621275,
      "text": "<sprite name=attr_106>意识+46"
    },
    {
      "id": "eff_321",
      "offset": 7621307,
      "text": "<sprite name=attr_106>意识+47"
    },
    {
      "id": "eff_322",
      "offset": 7621339,
      "text": "<sprite name=attr_106>意识+48"
    },
    {
      "id": "eff_323",
      "offset": 7621371,
      "text": "<sprite name=attr_106>意识+49"
    },
    {
      "id": "eff_324",
      "offset": 7621403,
      "text": "<sprite name=attr_106>意识+50"
    },
    {
      "id": "eff_325",
      "offset": 7621435,
      "text": "<sprite name=attr_116>熟练度+1"
    },
    {
      "id": "eff_326",
      "offset": 7621502,
      "text": "<sprite name=attr_116>熟练度+2"
    },
    {
      "id": "eff_327",
      "offset": 7621668,
      "text": "<sprite name=attr_116>熟练度+6"
    },
    {
      "id": "eff_328",
      "offset": 7621735,
      "text": "<sprite name=attr_116>熟练度+7"
    },
    {
      "id": "eff_329",
      "offset": 7621802,
      "text": "<sprite name=attr_116>熟练度+8"
    },
    {
      "id": "eff_330",
      "offset": 7621869,
      "text": "<sprite name=attr_116>熟练度+9"
    },
    {
      "id": "eff_331",
      "offset": 7623390,
      "text": "<sprite name=attr_119>出现率+576"
    },
    {
      "id": "eff_332",
      "offset": 7623509,
      "text": "<sprite name=attr_105>运控+11"
    },
    {
      "id": "eff_333",
      "offset": 7623541,
      "text": "<sprite name=attr_105>运控+13"
    },
    {
      "id": "eff_334",
      "offset": 7623573,
      "text": "<sprite name=attr_105>运控+14"
    },
    {
      "id": "eff_335",
      "offset": 7623605,
      "text": "<sprite name=attr_105>运控+16"
    },
    {
      "id": "eff_336",
      "offset": 7623637,
      "text": "<sprite name=attr_105>运控+17"
    },
    {
      "id": "eff_337",
      "offset": 7623669,
      "text": "<sprite name=attr_105>运控+18"
    },
    {
      "id": "eff_338",
      "offset": 7623701,
      "text": "<sprite name=attr_105>运控+19"
    },
    {
      "id": "eff_339",
      "offset": 7623733,
      "text": "<sprite name=attr_105>运控+21"
    },
    {
      "id": "eff_340",
      "offset": 7623765,
      "text": "<sprite name=attr_105>运控+22"
    },
    {
      "id": "eff_341",
      "offset": 7623797,
      "text": "<sprite name=attr_105>运控+23"
    },
    {
      "id": "eff_342",
      "offset": 7623829,
      "text": "<sprite name=attr_105>运控+24"
    },
    {
      "id": "eff_343",
      "offset": 7623861,
      "text": "<sprite name=attr_105>运控+25"
    },
    {
      "id": "eff_344",
      "offset": 7623893,
      "text": "<sprite name=attr_105>运控+26"
    },
    {
      "id": "eff_345",
      "offset": 7623925,
      "text": "<sprite name=attr_105>运控+27"
    },
    {
      "id": "eff_346",
      "offset": 7623957,
      "text": "<sprite name=attr_105>运控+28"
    },
    {
      "id": "eff_347",
      "offset": 7623989,
      "text": "<sprite name=attr_105>运控+29"
    },
    {
      "id": "eff_348",
      "offset": 7624021,
      "text": "<sprite name=attr_105>运控+31"
    },
    {
      "id": "eff_349",
      "offset": 7624053,
      "text": "<sprite name=attr_105>运控+32"
    },
    {
      "id": "eff_350",
      "offset": 7624085,
      "text": "<sprite name=attr_105>运控+33"
    },
    {
      "id": "eff_351",
      "offset": 7624117,
      "text": "<sprite name=attr_105>运控+34"
    },
    {
      "id": "eff_352",
      "offset": 7624149,
      "text": "<sprite name=attr_105>运控+35"
    },
    {
      "id": "eff_353",
      "offset": 7624181,
      "text": "出现在运控训练时，<sprite name=attr_105>运控+1"
    },
    {
      "id": "eff_354",
      "offset": 7624239,
      "text": "<link=\"control_base\">运控基础值</link>"
    },
    {
      "id": "eff_355",
      "offset": 7624293,
      "text": "<sprite name=attr_102>弹跳+21"
    },
    {
      "id": "eff_356",
      "offset": 7624325,
      "text": "<sprite name=attr_102>弹跳+22"
    },
    {
      "id": "eff_357",
      "offset": 7624357,
      "text": "<sprite name=attr_102>弹跳+23"
    },
    {
      "id": "eff_358",
      "offset": 7624389,
      "text": "<sprite name=attr_102>弹跳+24"
    },
    {
      "id": "eff_359",
      "offset": 7624421,
      "text": "<sprite name=attr_102>弹跳+25"
    },
    {
      "id": "eff_360",
      "offset": 7624453,
      "text": "<sprite name=attr_102>弹跳+26"
    },
    {
      "id": "eff_361",
      "offset": 7624485,
      "text": "<sprite name=attr_102>弹跳+27"
    },
    {
      "id": "eff_362",
      "offset": 7624517,
      "text": "<sprite name=attr_102>弹跳+28"
    },
    {
      "id": "eff_363",
      "offset": 7624549,
      "text": "<sprite name=attr_102>弹跳+29"
    },
    {
      "id": "eff_364",
      "offset": 7624581,
      "text": "<sprite name=attr_102>弹跳+31"
    },
    {
      "id": "eff_365",
      "offset": 7624613,
      "text": "<sprite name=attr_102>弹跳+32"
    },
    {
      "id": "eff_366",
      "offset": 7624645,
      "text": "<sprite name=attr_102>弹跳+33"
    },
    {
      "id": "eff_367",
      "offset": 7624677,
      "text": "<sprite name=attr_102>弹跳+34"
    },
    {
      "id": "eff_368",
      "offset": 7624709,
      "text": "<sprite name=attr_102>弹跳+35"
    },
    {
      "id": "eff_369",
      "offset": 7624741,
      "text": "<sprite name=attr_102>弹跳+36"
    },
    {
      "id": "eff_370",
      "offset": 7624773,
      "text": "<sprite name=attr_102>弹跳+37"
    },
    {
      "id": "eff_371",
      "offset": 7624805,
      "text": "<sprite name=attr_102>弹跳+38"
    },
    {
      "id": "eff_372",
      "offset": 7624837,
      "text": "<sprite name=attr_102>弹跳+39"
    },
    {
      "id": "eff_373",
      "offset": 7624869,
      "text": "<sprite name=attr_102>弹跳+41"
    },
    {
      "id": "eff_374",
      "offset": 7624901,
      "text": "<sprite name=attr_102>弹跳+42"
    },
    {
      "id": "eff_375",
      "offset": 7624933,
      "text": "<sprite name=attr_102>弹跳+43"
    },
    {
      "id": "eff_376",
      "offset": 7624965,
      "text": "<sprite name=attr_102>弹跳+44"
    },
    {
      "id": "eff_377",
      "offset": 7624997,
      "text": "<sprite name=attr_102>弹跳+45"
    },
    {
      "id": "eff_378",
      "offset": 7625029,
      "text": "<sprite name=attr_102>弹跳+46"
    },
    {
      "id": "eff_379",
      "offset": 7625061,
      "text": "<sprite name=attr_102>弹跳+47"
    },
    {
      "id": "eff_380",
      "offset": 7625093,
      "text": "<sprite name=attr_102>弹跳+48"
    },
    {
      "id": "eff_381",
      "offset": 7625125,
      "text": "<sprite name=attr_102>弹跳+49"
    },
    {
      "id": "eff_382",
      "offset": 7625157,
      "text": "<sprite name=attr_102>弹跳+50"
    },
    {
      "id": "eff_383",
      "offset": 7625199,
      "text": "<sprite name=attr_102>弹跳+11"
    },
    {
      "id": "eff_384",
      "offset": 7625231,
      "text": "<sprite name=attr_102>弹跳+13"
    },
    {
      "id": "eff_385",
      "offset": 7625263,
      "text": "<sprite name=attr_102>弹跳+14"
    },
    {
      "id": "eff_386",
      "offset": 7625295,
      "text": "<sprite name=attr_102>弹跳+16"
    },
    {
      "id": "eff_387",
      "offset": 7625327,
      "text": "<sprite name=attr_102>弹跳+17"
    },
    {
      "id": "eff_388",
      "offset": 7625359,
      "text": "<sprite name=attr_102>弹跳+18"
    },
    {
      "id": "eff_389",
      "offset": 7625391,
      "text": "<sprite name=attr_102>弹跳+19"
    },
    {
      "id": "eff_390",
      "offset": 7625423,
      "text": "出现在弹跳训练时，<sprite name=attr_102>弹跳+1"
    },
    {
      "id": "eff_391",
      "offset": 7625481,
      "text": "<link=\"jump_base\">弹跳基础值</link>"
    },
    {
      "id": "eff_392",
      "offset": 7625522,
      "text": "<sprite name=attr_105>运控+36"
    },
    {
      "id": "eff_393",
      "offset": 7625554,
      "text": "<sprite name=attr_105>运控+37"
    },
    {
      "id": "eff_394",
      "offset": 7625586,
      "text": "<sprite name=attr_105>运控+38"
    },
    {
      "id": "eff_395",
      "offset": 7625618,
      "text": "<sprite name=attr_105>运控+39"
    },
    {
      "id": "eff_396",
      "offset": 7625650,
      "text": "<sprite name=attr_105>运控+41"
    },
    {
      "id": "eff_397",
      "offset": 7625682,
      "text": "<sprite name=attr_105>运控+42"
    },
    {
      "id": "eff_398",
      "offset": 7625714,
      "text": "<sprite name=attr_105>运控+43"
    },
    {
      "id": "eff_399",
      "offset": 7625746,
      "text": "<sprite name=attr_105>运控+44"
    },
    {
      "id": "eff_400",
      "offset": 7625778,
      "text": "<sprite name=attr_105>运控+45"
    },
    {
      "id": "eff_401",
      "offset": 7625810,
      "text": "<sprite name=attr_105>运控+46"
    },
    {
      "id": "eff_402",
      "offset": 7625842,
      "text": "<sprite name=attr_105>运控+47"
    },
    {
      "id": "eff_403",
      "offset": 7625874,
      "text": "<sprite name=attr_105>运控+48"
    },
    {
      "id": "eff_404",
      "offset": 7625906,
      "text": "<sprite name=attr_105>运控+49"
    },
    {
      "id": "eff_405",
      "offset": 7625938,
      "text": "<sprite name=attr_105>运控+50"
    },
    {
      "id": "eff_406",
      "offset": 7625970,
      "text": "<sprite name=attr_103>防守+36"
    },
    {
      "id": "eff_407",
      "offset": 7626002,
      "text": "<sprite name=attr_103>防守+37"
    },
    {
      "id": "eff_408",
      "offset": 7626034,
      "text": "<sprite name=attr_103>防守+38"
    },
    {
      "id": "eff_409",
      "offset": 7626066,
      "text": "<sprite name=attr_103>防守+39"
    },
    {
      "id": "eff_410",
      "offset": 7626098,
      "text": "<sprite name=attr_103>防守+41"
    },
    {
      "id": "eff_411",
      "offset": 7626130,
      "text": "<sprite name=attr_103>防守+42"
    },
    {
      "id": "eff_412",
      "offset": 7626162,
      "text": "<sprite name=attr_103>防守+43"
    },
    {
      "id": "eff_413",
      "offset": 7626194,
      "text": "<sprite name=attr_103>防守+44"
    },
    {
      "id": "eff_414",
      "offset": 7626226,
      "text": "<sprite name=attr_103>防守+45"
    },
    {
      "id": "eff_415",
      "offset": 7626258,
      "text": "<sprite name=attr_103>防守+46"
    },
    {
      "id": "eff_416",
      "offset": 7626290,
      "text": "<sprite name=attr_103>防守+47"
    },
    {
      "id": "eff_417",
      "offset": 7626322,
      "text": "<sprite name=attr_103>防守+48"
    },
    {
      "id": "eff_418",
      "offset": 7626354,
      "text": "<sprite name=attr_103>防守+49"
    },
    {
      "id": "eff_419",
      "offset": 7626386,
      "text": "<sprite name=attr_104>体能+21"
    },
    {
      "id": "eff_420",
      "offset": 7626418,
      "text": "<sprite name=attr_104>体能+22"
    },
    {
      "id": "eff_421",
      "offset": 7626450,
      "text": "<sprite name=attr_104>体能+23"
    },
    {
      "id": "eff_422",
      "offset": 7626482,
      "text": "<sprite name=attr_104>体能+24"
    },
    {
      "id": "eff_423",
      "offset": 7626514,
      "text": "<sprite name=attr_104>体能+25"
    },
    {
      "id": "eff_424",
      "offset": 7626546,
      "text": "<sprite name=attr_104>体能+26"
    },
    {
      "id": "eff_425",
      "offset": 7626578,
      "text": "<sprite name=attr_104>体能+27"
    },
    {
      "id": "eff_426",
      "offset": 7626610,
      "text": "<sprite name=attr_104>体能+28"
    },
    {
      "id": "eff_427",
      "offset": 7626642,
      "text": "<sprite name=attr_104>体能+29"
    },
    {
      "id": "eff_428",
      "offset": 7626674,
      "text": "<sprite name=attr_104>体能+30"
    },
    {
      "id": "eff_429",
      "offset": 7626706,
      "text": "<sprite name=attr_104>体能+31"
    },
    {
      "id": "eff_430",
      "offset": 7626738,
      "text": "<sprite name=attr_104>体能+32"
    },
    {
      "id": "eff_431",
      "offset": 7626770,
      "text": "<sprite name=attr_104>体能+33"
    },
    {
      "id": "eff_432",
      "offset": 7626802,
      "text": "<sprite name=attr_104>体能+34"
    },
    {
      "id": "eff_433",
      "offset": 7626834,
      "text": "<sprite name=attr_104>体能+35"
    },
    {
      "id": "eff_434",
      "offset": 7626866,
      "text": "<sprite name=attr_104>体能+36"
    },
    {
      "id": "eff_435",
      "offset": 7626898,
      "text": "<sprite name=attr_104>体能+37"
    },
    {
      "id": "eff_436",
      "offset": 7626930,
      "text": "<sprite name=attr_104>体能+38"
    },
    {
      "id": "eff_437",
      "offset": 7626962,
      "text": "<sprite name=attr_104>体能+39"
    },
    {
      "id": "eff_438",
      "offset": 7626994,
      "text": "<sprite name=attr_104>体能+41"
    },
    {
      "id": "eff_439",
      "offset": 7627026,
      "text": "<sprite name=attr_104>体能+42"
    },
    {
      "id": "eff_440",
      "offset": 7627058,
      "text": "<sprite name=attr_104>体能+43"
    },
    {
      "id": "eff_441",
      "offset": 7627090,
      "text": "<sprite name=attr_104>体能+44"
    },
    {
      "id": "eff_442",
      "offset": 7627122,
      "text": "<sprite name=attr_104>体能+45"
    },
    {
      "id": "eff_443",
      "offset": 7627154,
      "text": "<sprite name=attr_104>体能+46"
    },
    {
      "id": "eff_444",
      "offset": 7627186,
      "text": "<sprite name=attr_104>体能+47"
    },
    {
      "id": "eff_445",
      "offset": 7627218,
      "text": "<sprite name=attr_104>体能+48"
    },
    {
      "id": "eff_446",
      "offset": 7627250,
      "text": "<sprite name=attr_104>体能+49"
    },
    {
      "id": "eff_447",
      "offset": 7627282,
      "text": "<sprite name=attr_104>体能+50"
    },
    {
      "id": "eff_448",
      "offset": 7627314,
      "text": "出现在体能训练时，<sprite name=attr_104>体能+1"
    },
    {
      "id": "eff_449",
      "offset": 7627372,
      "text": "<link=\"energy_base\">体能基础值</link>"
    },
    {
      "id": "eff_450",
      "offset": 7627425,
      "text": "<sprite name=attr_104>体能+11"
    },
    {
      "id": "eff_451",
      "offset": 7627457,
      "text": "<sprite name=attr_104>体能+13"
    },
    {
      "id": "eff_452",
      "offset": 7627489,
      "text": "<sprite name=attr_104>体能+14"
    },
    {
      "id": "eff_453",
      "offset": 7627521,
      "text": "<sprite name=attr_104>体能+16"
    },
    {
      "id": "eff_454",
      "offset": 7627553,
      "text": "<sprite name=attr_104>体能+17"
    },
    {
      "id": "eff_455",
      "offset": 7627585,
      "text": "<sprite name=attr_104>体能+18"
    },
    {
      "id": "eff_456",
      "offset": 7627617,
      "text": "<sprite name=attr_104>体能+19"
    },
    {
      "id": "eff_457",
      "offset": 7627696,
      "text": "出现在意识训练时，<sprite name=attr_106>意识+1"
    },
    {
      "id": "eff_458",
      "offset": 7627754,
      "text": "<link=\"mind_base\">意识基础值</link>"
    },
    {
      "id": "eff_459",
      "offset": 7627795,
      "text": "<sprite name=attr_117>暴击加成+2%"
    },
    {
      "id": "eff_460",
      "offset": 7627833,
      "text": "<sprite name=attr_117>暴击加成+3%"
    },
    {
      "id": "eff_461",
      "offset": 7627871,
      "text": "<sprite name=attr_117>暴击加成+4%"
    },
    {
      "id": "eff_462",
      "offset": 7627909,
      "text": "<link=\"ps_des_4\">精力消耗下降</link>"
    },
    {
      "id": "eff_463",
      "offset": 7627952,
      "text": "满熟练度时，暴击加成+7.5%"
    },
    {
      "id": "eff_464",
      "offset": 7628041,
      "text": "<sprite name=attr_116>熟练度+46"
    },
    {
      "id": "eff_465",
      "offset": 7628076,
      "text": "<sprite name=attr_116>熟练度+47"
    },
    {
      "id": "eff_466",
      "offset": 7628111,
      "text": "<sprite name=attr_121>训练失败率-3%"
    },
    {
      "id": "eff_467",
      "offset": 7628152,
      "text": "<link=\"failrate\">失败率下降</link>"
    },
    {
      "id": "eff_468",
      "offset": 7628192,
      "text": "出现在投射训练时，<sprite name=attr_101>投射+0"
    },
    {
      "id": "eff_469",
      "offset": 7628250,
      "text": "<sprite name=attr_102>弹跳+9"
    },
    {
      "id": "eff_470",
      "offset": 7628281,
      "text": "<sprite name=attr_102>弹跳+6"
    },
    {
      "id": "eff_471",
      "offset": 7628312,
      "text": "<sprite name=attr_102>弹跳+7"
    },
    {
      "id": "eff_472",
      "offset": 7628343,
      "text": "出现在弹跳训练时，<sprite name=attr_102>弹跳+0"
    },
    {
      "id": "eff_473",
      "offset": 7628401,
      "text": "<sprite name=attr_103>防守+9"
    },
    {
      "id": "eff_474",
      "offset": 7628516,
      "text": "<sprite name=attr_119>出现率+212"
    },
    {
      "id": "eff_475",
      "offset": 7628601,
      "text": "<sprite name=attr_103>防守+6"
    },
    {
      "id": "eff_476",
      "offset": 7628632,
      "text": "<sprite name=attr_103>防守+7"
    },
    {
      "id": "eff_477",
      "offset": 7628663,
      "text": "出现在防守训练时，<sprite name=attr_103>防守+0"
    },
    {
      "id": "eff_478",
      "offset": 7628721,
      "text": "<sprite name=attr_104>体能+9"
    },
    {
      "id": "eff_479",
      "offset": 7628800,
      "text": "<sprite name=attr_104>体能+6"
    },
    {
      "id": "eff_480",
      "offset": 7628831,
      "text": "<sprite name=attr_104>体能+7"
    },
    {
      "id": "eff_481",
      "offset": 7628907,
      "text": "出现在体能训练时，<sprite name=attr_104>体能+0"
    },
    {
      "id": "eff_482",
      "offset": 7629002,
      "text": "出现在意识训练时，<sprite name=attr_106>意识+0"
    },
    {
      "id": "eff_483",
      "offset": 7629106,
      "text": "<sprite name=attr_117>暴击加成+31%"
    },
    {
      "id": "eff_484",
      "offset": 7629145,
      "text": "<sprite name=attr_117>暴击加成+32%"
    },
    {
      "id": "eff_485",
      "offset": 7629184,
      "text": "<sprite name=attr_117>暴击加成+33%"
    },
    {
      "id": "eff_486",
      "offset": 7629223,
      "text": "<sprite name=attr_117>暴击加成+34%"
    },
    {
      "id": "eff_487",
      "offset": 7629262,
      "text": "<sprite name=attr_117>暴击加成+35%"
    },
    {
      "id": "eff_488",
      "offset": 7629301,
      "text": "<sprite name=attr_117>暴击加成+36%"
    },
    {
      "id": "eff_489",
      "offset": 7629340,
      "text": "<sprite name=attr_117>暴击加成+37%"
    },
    {
      "id": "eff_490",
      "offset": 7629379,
      "text": "<sprite name=attr_117>暴击加成+38%"
    },
    {
      "id": "eff_491",
      "offset": 7629418,
      "text": "<sprite name=attr_117>暴击加成+39%"
    },
    {
      "id": "eff_492",
      "offset": 7629457,
      "text": "<sprite name=attr_117>暴击加成+41%"
    },
    {
      "id": "eff_493",
      "offset": 7629496,
      "text": "<sprite name=attr_117>暴击加成+42%"
    },
    {
      "id": "eff_494",
      "offset": 7629535,
      "text": "<sprite name=attr_117>暴击加成+43%"
    },
    {
      "id": "eff_495",
      "offset": 7629574,
      "text": "<sprite name=attr_117>暴击加成+44%"
    },
    {
      "id": "eff_496",
      "offset": 7629613,
      "text": "<sprite name=attr_117>暴击加成+45%"
    },
    {
      "id": "eff_497",
      "offset": 7629701,
      "text": "<sprite name=attr_119>出现率+100"
    },
    {
      "id": "eff_498",
      "offset": 7629737,
      "text": "<sprite name=attr_119>出现率+102"
    },
    {
      "id": "eff_499",
      "offset": 7629773,
      "text": "<sprite name=attr_119>出现率+104"
    },
    {
      "id": "eff_500",
      "offset": 7629809,
      "text": "<sprite name=attr_119>出现率+107"
    },
    {
      "id": "eff_501",
      "offset": 7629845,
      "text": "<sprite name=attr_119>出现率+109"
    },
    {
      "id": "eff_502",
      "offset": 7629881,
      "text": "<sprite name=attr_119>出现率+111"
    },
    {
      "id": "eff_503",
      "offset": 7629917,
      "text": "<sprite name=attr_119>出现率+113"
    },
    {
      "id": "eff_504",
      "offset": 7629953,
      "text": "<sprite name=attr_119>出现率+116"
    },
    {
      "id": "eff_505",
      "offset": 7629989,
      "text": "<sprite name=attr_119>出现率+118"
    },
    {
      "id": "eff_506",
      "offset": 7630025,
      "text": "<sprite name=attr_119>出现率+120"
    },
    {
      "id": "eff_507",
      "offset": 7630061,
      "text": "<sprite name=attr_119>出现率+122"
    },
    {
      "id": "eff_508",
      "offset": 7630097,
      "text": "<sprite name=attr_119>出现率+125"
    },
    {
      "id": "eff_509",
      "offset": 7630133,
      "text": "<sprite name=attr_119>出现率+127"
    },
    {
      "id": "eff_510",
      "offset": 7630169,
      "text": "<sprite name=attr_119>出现率+129"
    },
    {
      "id": "eff_511",
      "offset": 7630205,
      "text": "<sprite name=attr_119>出现率+132"
    },
    {
      "id": "eff_512",
      "offset": 7630241,
      "text": "<sprite name=attr_119>出现率+134"
    },
    {
      "id": "eff_513",
      "offset": 7630277,
      "text": "<sprite name=attr_119>出现率+136"
    },
    {
      "id": "eff_514",
      "offset": 7630313,
      "text": "<sprite name=attr_119>出现率+139"
    },
    {
      "id": "eff_515",
      "offset": 7630349,
      "text": "<sprite name=attr_119>出现率+141"
    },
    {
      "id": "eff_516",
      "offset": 7630385,
      "text": "<sprite name=attr_119>出现率+144"
    },
    {
      "id": "eff_517",
      "offset": 7630421,
      "text": "<sprite name=attr_119>出现率+146"
    },
    {
      "id": "eff_518",
      "offset": 7630457,
      "text": "<sprite name=attr_119>出现率+148"
    },
    {
      "id": "eff_519",
      "offset": 7630493,
      "text": "<sprite name=attr_119>出现率+151"
    },
    {
      "id": "eff_520",
      "offset": 7630529,
      "text": "<sprite name=attr_119>出现率+153"
    },
    {
      "id": "eff_521",
      "offset": 7630565,
      "text": "<sprite name=attr_119>出现率+156"
    },
    {
      "id": "eff_522",
      "offset": 7630601,
      "text": "<sprite name=attr_119>出现率+158"
    },
    {
      "id": "eff_523",
      "offset": 7630637,
      "text": "<sprite name=attr_119>出现率+161"
    },
    {
      "id": "eff_524",
      "offset": 7630673,
      "text": "<sprite name=attr_119>出现率+163"
    },
    {
      "id": "eff_525",
      "offset": 7630709,
      "text": "<sprite name=attr_119>出现率+166"
    },
    {
      "id": "eff_526",
      "offset": 7630745,
      "text": "<sprite name=attr_119>出现率+169"
    },
    {
      "id": "eff_527",
      "offset": 7630781,
      "text": "<sprite name=attr_119>出现率+171"
    },
    {
      "id": "eff_528",
      "offset": 7630817,
      "text": "<sprite name=attr_119>出现率+174"
    },
    {
      "id": "eff_529",
      "offset": 7630853,
      "text": "<sprite name=attr_119>出现率+176"
    },
    {
      "id": "eff_530",
      "offset": 7630889,
      "text": "<sprite name=attr_119>出现率+179"
    },
    {
      "id": "eff_531",
      "offset": 7630925,
      "text": "<sprite name=attr_119>出现率+182"
    },
    {
      "id": "eff_532",
      "offset": 7630961,
      "text": "<sprite name=attr_119>出现率+184"
    },
    {
      "id": "eff_533",
      "offset": 7630997,
      "text": "<sprite name=attr_119>出现率+187"
    },
    {
      "id": "eff_534",
      "offset": 7631033,
      "text": "<sprite name=attr_119>出现率+190"
    },
    {
      "id": "eff_535",
      "offset": 7631069,
      "text": "<sprite name=attr_119>出现率+192"
    },
    {
      "id": "eff_536",
      "offset": 7631105,
      "text": "<sprite name=attr_119>出现率+195"
    },
    {
      "id": "eff_537",
      "offset": 7631141,
      "text": "<sprite name=attr_119>出现率+198"
    },
    {
      "id": "eff_538",
      "offset": 7631177,
      "text": "<sprite name=attr_119>出现率+200"
    },
    {
      "id": "eff_539",
      "offset": 7631213,
      "text": "<sprite name=attr_119>出现率+203"
    },
    {
      "id": "eff_540",
      "offset": 7631249,
      "text": "<sprite name=attr_119>出现率+206"
    },
    {
      "id": "eff_541",
      "offset": 7631285,
      "text": "<sprite name=attr_119>出现率+209"
    },
    {
      "id": "eff_542",
      "offset": 7631321,
      "text": "<sprite name=attr_119>出现率+214"
    },
    {
      "id": "eff_543",
      "offset": 7631357,
      "text": "<sprite name=attr_119>出现率+217"
    },
    {
      "id": "eff_544",
      "offset": 7631393,
      "text": "<sprite name=attr_119>出现率+220"
    },
    {
      "id": "eff_545",
      "offset": 7631429,
      "text": "<sprite name=attr_102>弹跳+51"
    },
    {
      "id": "eff_546",
      "offset": 7631461,
      "text": "<sprite name=attr_102>弹跳+52"
    },
    {
      "id": "eff_547",
      "offset": 7631493,
      "text": "<sprite name=attr_102>弹跳+53"
    },
    {
      "id": "eff_548",
      "offset": 7631525,
      "text": "<sprite name=attr_102>弹跳+54"
    },
    {
      "id": "eff_549",
      "offset": 7631557,
      "text": "<sprite name=attr_102>弹跳+56"
    },
    {
      "id": "eff_550",
      "offset": 7631589,
      "text": "<sprite name=attr_102>弹跳+57"
    },
    {
      "id": "eff_551",
      "offset": 7631621,
      "text": "<sprite name=attr_102>弹跳+58"
    },
    {
      "id": "eff_552",
      "offset": 7631653,
      "text": "<sprite name=attr_102>弹跳+59"
    },
    {
      "id": "eff_553",
      "offset": 7631685,
      "text": "<sprite name=attr_102>弹跳+61"
    },
    {
      "id": "eff_554",
      "offset": 7631717,
      "text": "<sprite name=attr_102>弹跳+62"
    },
    {
      "id": "eff_555",
      "offset": 7631749,
      "text": "<sprite name=attr_102>弹跳+63"
    },
    {
      "id": "eff_556",
      "offset": 7631781,
      "text": "<sprite name=attr_102>弹跳+64"
    },
    {
      "id": "eff_557",
      "offset": 7631813,
      "text": "<sprite name=attr_102>弹跳+66"
    },
    {
      "id": "eff_558",
      "offset": 7631845,
      "text": "<sprite name=attr_102>弹跳+67"
    },
    {
      "id": "eff_559",
      "offset": 7631877,
      "text": "<sprite name=attr_102>弹跳+68"
    },
    {
      "id": "eff_560",
      "offset": 7631909,
      "text": "<sprite name=attr_102>弹跳+69"
    },
    {
      "id": "eff_561",
      "offset": 7631941,
      "text": "<sprite name=attr_102>弹跳+70"
    },
    {
      "id": "eff_562",
      "offset": 7631973,
      "text": "<sprite name=attr_102>弹跳+72"
    },
    {
      "id": "eff_563",
      "offset": 7632005,
      "text": "<sprite name=attr_102>弹跳+73"
    },
    {
      "id": "eff_564",
      "offset": 7632037,
      "text": "<sprite name=attr_102>弹跳+74"
    },
    {
      "id": "eff_565",
      "offset": 7632069,
      "text": "<sprite name=attr_102>弹跳+75"
    },
    {
      "id": "eff_566",
      "offset": 7632101,
      "text": "<sprite name=attr_102>弹跳+77"
    },
    {
      "id": "eff_567",
      "offset": 7632133,
      "text": "<sprite name=attr_102>弹跳+78"
    },
    {
      "id": "eff_568",
      "offset": 7632165,
      "text": "<sprite name=attr_102>弹跳+79"
    },
    {
      "id": "eff_569",
      "offset": 7632197,
      "text": "<sprite name=attr_102>弹跳+80"
    },
    {
      "id": "eff_570",
      "offset": 7632229,
      "text": "<sprite name=attr_102>弹跳+81"
    },
    {
      "id": "eff_571",
      "offset": 7632261,
      "text": "<sprite name=attr_102>弹跳+83"
    },
    {
      "id": "eff_572",
      "offset": 7632293,
      "text": "<sprite name=attr_102>弹跳+84"
    },
    {
      "id": "eff_573",
      "offset": 7632325,
      "text": "<sprite name=attr_102>弹跳+85"
    },
    {
      "id": "eff_574",
      "offset": 7632357,
      "text": "<sprite name=attr_102>弹跳+86"
    },
    {
      "id": "eff_575",
      "offset": 7632389,
      "text": "<sprite name=attr_102>弹跳+88"
    },
    {
      "id": "eff_576",
      "offset": 7632421,
      "text": "<sprite name=attr_102>弹跳+89"
    },
    {
      "id": "eff_577",
      "offset": 7632453,
      "text": "<sprite name=attr_102>弹跳+90"
    },
    {
      "id": "eff_578",
      "offset": 7632534,
      "text": "<sprite name=attr_116>熟练度+48"
    },
    {
      "id": "eff_579",
      "offset": 7632569,
      "text": "<sprite name=attr_116>熟练度+49"
    },
    {
      "id": "eff_580",
      "offset": 7632604,
      "text": "<sprite name=attr_116>熟练度+50"
    },
    {
      "id": "eff_581",
      "offset": 7632688,
      "text": "<sprite name=attr_104>体能+51"
    },
    {
      "id": "eff_582",
      "offset": 7632720,
      "text": "<sprite name=attr_104>体能+52"
    },
    {
      "id": "eff_583",
      "offset": 7632752,
      "text": "<sprite name=attr_104>体能+53"
    },
    {
      "id": "eff_584",
      "offset": 7632784,
      "text": "<sprite name=attr_104>体能+54"
    },
    {
      "id": "eff_585",
      "offset": 7632816,
      "text": "<sprite name=attr_104>体能+56"
    },
    {
      "id": "eff_586",
      "offset": 7632848,
      "text": "<sprite name=attr_104>体能+57"
    },
    {
      "id": "eff_587",
      "offset": 7632880,
      "text": "<sprite name=attr_104>体能+58"
    },
    {
      "id": "eff_588",
      "offset": 7632912,
      "text": "<sprite name=attr_104>体能+59"
    },
    {
      "id": "eff_589",
      "offset": 7632944,
      "text": "<sprite name=attr_104>体能+61"
    },
    {
      "id": "eff_590",
      "offset": 7632976,
      "text": "<sprite name=attr_104>体能+62"
    },
    {
      "id": "eff_591",
      "offset": 7633008,
      "text": "<sprite name=attr_104>体能+63"
    },
    {
      "id": "eff_592",
      "offset": 7633040,
      "text": "<sprite name=attr_104>体能+64"
    },
    {
      "id": "eff_593",
      "offset": 7633072,
      "text": "<sprite name=attr_104>体能+66"
    },
    {
      "id": "eff_594",
      "offset": 7633104,
      "text": "<sprite name=attr_104>体能+67"
    },
    {
      "id": "eff_595",
      "offset": 7633136,
      "text": "<sprite name=attr_104>体能+68"
    },
    {
      "id": "eff_596",
      "offset": 7633168,
      "text": "<sprite name=attr_104>体能+69"
    },
    {
      "id": "eff_597",
      "offset": 7633200,
      "text": "<sprite name=attr_104>体能+70"
    },
    {
      "id": "eff_598",
      "offset": 7633232,
      "text": "<sprite name=attr_104>体能+72"
    },
    {
      "id": "eff_599",
      "offset": 7633264,
      "text": "<sprite name=attr_104>体能+73"
    },
    {
      "id": "eff_600",
      "offset": 7633296,
      "text": "<sprite name=attr_104>体能+74"
    },
    {
      "id": "eff_601",
      "offset": 7633328,
      "text": "<sprite name=attr_104>体能+75"
    },
    {
      "id": "eff_602",
      "offset": 7633360,
      "text": "<sprite name=attr_104>体能+77"
    },
    {
      "id": "eff_603",
      "offset": 7633392,
      "text": "<sprite name=attr_104>体能+78"
    },
    {
      "id": "eff_604",
      "offset": 7633424,
      "text": "<sprite name=attr_104>体能+79"
    },
    {
      "id": "eff_605",
      "offset": 7633456,
      "text": "<sprite name=attr_104>体能+80"
    },
    {
      "id": "eff_606",
      "offset": 7633488,
      "text": "<sprite name=attr_104>体能+81"
    },
    {
      "id": "eff_607",
      "offset": 7633520,
      "text": "<sprite name=attr_104>体能+83"
    },
    {
      "id": "eff_608",
      "offset": 7633552,
      "text": "<sprite name=attr_104>体能+84"
    },
    {
      "id": "eff_609",
      "offset": 7633584,
      "text": "<sprite name=attr_104>体能+85"
    },
    {
      "id": "eff_610",
      "offset": 7633616,
      "text": "<sprite name=attr_104>体能+86"
    },
    {
      "id": "eff_611",
      "offset": 7633648,
      "text": "<sprite name=attr_104>体能+88"
    },
    {
      "id": "eff_612",
      "offset": 7633680,
      "text": "<sprite name=attr_104>体能+89"
    },
    {
      "id": "eff_613",
      "offset": 7633712,
      "text": "<sprite name=attr_104>体能+90"
    },
    {
      "id": "eff_614",
      "offset": 7633793,
      "text": "<sprite name=attr_106>意识+51"
    },
    {
      "id": "eff_615",
      "offset": 7633825,
      "text": "<sprite name=attr_106>意识+52"
    },
    {
      "id": "eff_616",
      "offset": 7633857,
      "text": "<sprite name=attr_106>意识+53"
    },
    {
      "id": "eff_617",
      "offset": 7633889,
      "text": "<sprite name=attr_106>意识+54"
    },
    {
      "id": "eff_618",
      "offset": 7633921,
      "text": "<sprite name=attr_106>意识+56"
    },
    {
      "id": "eff_619",
      "offset": 7633953,
      "text": "<sprite name=attr_106>意识+57"
    },
    {
      "id": "eff_620",
      "offset": 7633985,
      "text": "<sprite name=attr_106>意识+58"
    },
    {
      "id": "eff_621",
      "offset": 7634017,
      "text": "<sprite name=attr_106>意识+59"
    },
    {
      "id": "eff_622",
      "offset": 7634049,
      "text": "<sprite name=attr_106>意识+61"
    },
    {
      "id": "eff_623",
      "offset": 7634081,
      "text": "<sprite name=attr_106>意识+62"
    },
    {
      "id": "eff_624",
      "offset": 7634113,
      "text": "<sprite name=attr_106>意识+63"
    },
    {
      "id": "eff_625",
      "offset": 7634145,
      "text": "<sprite name=attr_106>意识+64"
    },
    {
      "id": "eff_626",
      "offset": 7634177,
      "text": "<sprite name=attr_106>意识+66"
    },
    {
      "id": "eff_627",
      "offset": 7634209,
      "text": "<sprite name=attr_106>意识+67"
    },
    {
      "id": "eff_628",
      "offset": 7634241,
      "text": "<sprite name=attr_106>意识+68"
    },
    {
      "id": "eff_629",
      "offset": 7634273,
      "text": "<sprite name=attr_106>意识+69"
    },
    {
      "id": "eff_630",
      "offset": 7634305,
      "text": "<sprite name=attr_106>意识+70"
    },
    {
      "id": "eff_631",
      "offset": 7634337,
      "text": "<sprite name=attr_106>意识+72"
    },
    {
      "id": "eff_632",
      "offset": 7634369,
      "text": "<sprite name=attr_106>意识+73"
    },
    {
      "id": "eff_633",
      "offset": 7634401,
      "text": "<sprite name=attr_106>意识+74"
    },
    {
      "id": "eff_634",
      "offset": 7634433,
      "text": "<sprite name=attr_106>意识+75"
    },
    {
      "id": "eff_635",
      "offset": 7634465,
      "text": "<sprite name=attr_106>意识+77"
    },
    {
      "id": "eff_636",
      "offset": 7634497,
      "text": "<sprite name=attr_106>意识+78"
    },
    {
      "id": "eff_637",
      "offset": 7634529,
      "text": "<sprite name=attr_106>意识+79"
    },
    {
      "id": "eff_638",
      "offset": 7634561,
      "text": "<sprite name=attr_106>意识+80"
    },
    {
      "id": "eff_639",
      "offset": 7634593,
      "text": "<sprite name=attr_106>意识+81"
    },
    {
      "id": "eff_640",
      "offset": 7634625,
      "text": "<sprite name=attr_106>意识+83"
    },
    {
      "id": "eff_641",
      "offset": 7634657,
      "text": "<sprite name=attr_106>意识+84"
    },
    {
      "id": "eff_642",
      "offset": 7634689,
      "text": "<sprite name=attr_106>意识+85"
    },
    {
      "id": "eff_643",
      "offset": 7634721,
      "text": "<sprite name=attr_106>意识+86"
    },
    {
      "id": "eff_644",
      "offset": 7634753,
      "text": "<sprite name=attr_106>意识+88"
    },
    {
      "id": "eff_645",
      "offset": 7634785,
      "text": "<sprite name=attr_106>意识+89"
    },
    {
      "id": "eff_646",
      "offset": 7634817,
      "text": "<sprite name=attr_106>意识+90"
    }
  ],
  "affixes": [
    {
      "id": "1500201",
      "name": "后程抢势",
      "offset": 48261007
    },
    {
      "id": "1500202",
      "name": "后程发力",
      "offset": 48261028
    },
    {
      "id": "1500301",
      "name": "中距屏障",
      "offset": 48261049
    },
    {
      "id": "1500302",
      "name": "中距警觉",
      "offset": 48261070
    },
    {
      "id": "1500401",
      "name": "大心脏",
      "offset": 48261091
    },
    {
      "id": "1500402",
      "name": "不慌不乱",
      "offset": 48261109
    },
    {
      "id": "1500501",
      "name": "力竭加深",
      "offset": 48261130
    },
    {
      "id": "1500502",
      "name": "力竭增强",
      "offset": 48261151
    },
    {
      "id": "1500601",
      "name": "技能精通",
      "offset": 48261172
    },
    {
      "id": "1500602",
      "name": "技能擅长",
      "offset": 48261193
    },
    {
      "id": "1600101",
      "name": "近框舞者",
      "offset": 48261214
    },
    {
      "id": "1600102",
      "name": "近框擅长",
      "offset": 48261235
    },
    {
      "id": "1600201",
      "name": "急速上篮",
      "offset": 48261256
    },
    {
      "id": "1600301",
      "name": "场上大脑",
      "offset": 48261285
    },
    {
      "id": "1600302",
      "name": "场上指挥",
      "offset": 48261306
    },
    {
      "id": "1600401",
      "name": "节奏掌控",
      "offset": 48261327
    },
    {
      "id": "1600402",
      "name": "步步为营",
      "offset": 48261348
    },
    {
      "id": "1600601",
      "name": "干扰精通",
      "offset": 48261385
    },
    {
      "id": "1600602",
      "name": "干扰擅长",
      "offset": 48261406
    },
    {
      "id": "2100101",
      "name": "快速中投",
      "offset": 48261427
    },
    {
      "id": "2100201",
      "name": "快速三分",
      "offset": 48261448
    },
    {
      "id": "2200101",
      "name": "扣篮擅长",
      "offset": 48261469
    },
    {
      "id": "2200201",
      "name": "灵活后撤",
      "offset": 48261490
    },
    {
      "id": "2300201",
      "name": "灵活突破",
      "offset": 48261519
    },
    {
      "id": "2400201",
      "name": "转体上篮",
      "offset": 48261556
    },
    {
      "id": "2500101",
      "name": "强力勾手",
      "offset": 48261577
    },
    {
      "id": "2500201",
      "name": "快速横撤",
      "offset": 48261598
    },
    {
      "id": "2600101",
      "name": "快速盖帽",
      "offset": 48261619
    },
    {
      "id": "2600201",
      "name": "后撤擅长",
      "offset": 48261640
    },
    {
      "id": "2600301",
      "name": "快速扣篮",
      "offset": 48261661
    },
    {
      "id": "3100101",
      "name": "挡拆狂热",
      "offset": 48261682
    },
    {
      "id": "3100102",
      "name": "挡拆倾向",
      "offset": 48261703
    },
    {
      "id": "3100201",
      "name": "二次终结者",
      "offset": 48261724
    },
    {
      "id": "3100202",
      "name": "二次手感",
      "offset": 48261748
    },
    {
      "id": "3100301",
      "name": "渐入佳境",
      "offset": 48261769
    },
    {
      "id": "3200101",
      "name": "快攻狂热",
      "offset": 48261798
    },
    {
      "id": "3200102",
      "name": "快攻倾向",
      "offset": 48261819
    },
    {
      "id": "3200201",
      "name": "篮板磁铁",
      "offset": 48261840
    },
    {
      "id": "3200202",
      "name": "篮板擅长",
      "offset": 48261861
    },
    {
      "id": "3200301",
      "name": "无惧重围",
      "offset": 48261882
    },
    {
      "id": "3300101",
      "name": "固若金汤",
      "offset": 48261911
    },
    {
      "id": "3300102",
      "name": "内线防守",
      "offset": 48261932
    },
    {
      "id": "3300201",
      "name": "掌落无声",
      "offset": 48261953
    },
    {
      "id": "3300301",
      "name": "稳扎稳打",
      "offset": 48261982
    },
    {
      "id": "3300302",
      "name": "有条有理",
      "offset": 48262003
    },
    {
      "id": "3400101",
      "name": "外线扫荡",
      "offset": 48262024
    },
    {
      "id": "3400102",
      "name": "外线防守",
      "offset": 48262045
    },
    {
      "id": "3400201",
      "name": "冲抢先锋",
      "offset": 48262066
    },
    {
      "id": "3400202",
      "name": "冲抢好手",
      "offset": 48262087
    },
    {
      "id": "3400301",
      "name": "气盛如虹",
      "offset": 48262108
    },
    {
      "id": "3500101",
      "name": "突分狂热",
      "offset": 48262137
    },
    {
      "id": "3500102",
      "name": "突分倾向",
      "offset": 48262158
    },
    {
      "id": "3500201",
      "name": "后段稳固",
      "offset": 48262179
    },
    {
      "id": "3500202",
      "name": "后段稳定",
      "offset": 48262200
    },
    {
      "id": "3500301",
      "name": "技冠群雄",
      "offset": 48262221
    },
    {
      "id": "3500302",
      "name": "游刃有余",
      "offset": 48262242
    },
    {
      "id": "3600101",
      "name": "从容一箭",
      "offset": 48262263
    },
    {
      "id": "3600201",
      "name": "远程部署",
      "offset": 48262292
    },
    {
      "id": "3600202",
      "name": "远投擅长",
      "offset": 48262313
    },
    {
      "id": "3600301",
      "name": "速度克制",
      "offset": 48262334
    },
    {
      "id": "3600302",
      "name": "速卡制约",
      "offset": 48262355
    }
  ],
  "guideRatings": [
    {
      "id": "eq_support_whistle",
      "recordType": "named_item",
      "name": "支援口哨（支援哨子）",
      "quality": "SSR（UP 器材，社区称「支援口哨/哨子」；建议至少一星，或不抽）",
      "attributes": null,
      "skill": null,
      "tier": null,
      "tags": [
        "训练流",
        "商店流",
        "扭蛋流",
        "开荒",
        "PVE困难模式",
        "UP器材",
        "借用"
      ],
      "scenarios": [
        "训练流刚需",
        "开荒",
        "PVE困难模式"
      ],
      "constraints": [
        "建议至少一星再抽；零氪可借用"
      ],
      "notes": "训练流/商店流「刚需一星以上哨子」；开服第二天器材卡池的 UP 器材，对第三天解锁的困难模式提升大；前期钻石优先给它。零氪可向大佬借用（每天约 6 次）、每天只玩 6 局也可不抽。所有 UP 池器材「至少一星，或者不抽」。效果图来自早期测试，公测可能更强。",
      "evidenceQuote": "训练流：刚需一星以上的哨子……商店流：刚需一星哨子……所有up池器材都是至少一星，或者不抽。",
      "sourceFile": "data/structured/guides/725601；725397；725564；725600；725610",
      "sourceUrl": "https://www.gamekee.com/lqsn/725601.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "多源一致（社区攻略；具体属性/技能文本未给出）"
    },
    {
      "id": "eq_jump_star",
      "recordType": "named_item",
      "name": "起跳之星",
      "quality": "SSR（UP 器材）",
      "attributes": null,
      "skill": null,
      "tier": null,
      "tags": [
        "UP器材",
        "弹跳"
      ],
      "scenarios": [
        "UP 器材池（哨响腾空）"
      ],
      "constraints": [
        "UP 目标可选，获得 UP 器材时必得所选目标（非每抽必出）"
      ],
      "notes": "「哨响腾空」器材招募的 SSR UP 器材，与 SSR 支援口哨同池；正文未给出属性/技能效果。",
      "evidenceQuote": "本期UP器材为SSR支援口哨、SSR起跳之星。",
      "sourceFile": "data/structured/guides/725397；725564",
      "sourceUrl": "https://www.gamekee.com/lqsn/725397.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "单源（招募公告转述；无效果文本）"
    },
    {
      "id": "eq_dumbbell_4kg",
      "recordType": "named_item",
      "name": "4KG哑铃",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": null,
      "tags": [
        "训练器材",
        "熟练度",
        "训练加成"
      ],
      "scenarios": [
        "训练"
      ],
      "constraints": [
        "示例为同一件器材熟练度 MAX 前后的对比，不是通用倍率"
      ],
      "notes": "器材熟练度示意：同一件 4KG 哑铃在熟练度达到 MAX 后，示例训练加成由 +10 变为 +41；原文强调这不是所有器材通用的收益倍率。",
      "evidenceQuote": "图中同一件4KG哑铃在熟练度达到MAX后，示例训练加成由+10变为+41；这不是所有器材通用的收益倍率。",
      "sourceFile": "data/structured/guides/725398",
      "sourceUrl": "https://www.gamekee.com/lqsn/725398.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "单源（客户端内置帮助图示例，非实测）"
    },
    {
      "id": "eq_smart_basketball",
      "recordType": "named_item",
      "name": "高级智能篮球器材",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": null,
      "tags": [
        "活动奖励"
      ],
      "scenarios": [
        "签到有礼奖励"
      ],
      "constraints": [],
      "notes": "开服「签到有礼」累计奖励之一（×1）；正文未给属性/技能效果。",
      "evidenceQuote": "签到有礼：10月23日开服后，活动累计可获得……高级智能篮球器材×1。",
      "sourceFile": "data/structured/guides/725399；725565",
      "sourceUrl": "https://www.gamekee.com/lqsn/725565.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "单源（活动奖励列表转述）"
    },
    {
      "id": "eq_cangqi_badge",
      "recordType": "named_item",
      "name": "苍骑队徽",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": null,
      "tags": [
        "PVP",
        "低概率技能"
      ],
      "scenarios": [
        "PVP/竞技场"
      ],
      "constraints": [
        "名称与归类待核对（可能为队徽/系统效果，不一定是可装备器材）"
      ],
      "notes": "正文原句：「pvp因为有苍骑队徽的影响低概率技能不适用」——说明 PVE 赌概率越级的器材在 PVP 会被苍骑队徽压制；该道具完整规则未在攻略中给出。",
      "evidenceQuote": "适合pve挑战高难度副本，赌概率越级挑战，pvp因为有苍骑队徽的影响低概率技能不适用",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "单源（推断为队徽/系统效果，待核对）"
    },
    {
      "id": "eq_eval_725599_01",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "夯",
      "tags": [],
      "scenarios": [],
      "constraints": [],
      "notes": "（比赛末段收割机、绝杀球神器）",
      "evidenceQuote": "（比赛末段收割机、绝杀球神器）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_02",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "夯",
      "tags": [],
      "scenarios": [],
      "constraints": [],
      "notes": "（抢开局，攻守都有概率生效）",
      "evidenceQuote": "（抢开局，攻守都有概率生效）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_03",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "夯",
      "tags": [
        "组织/助攻"
      ],
      "scenarios": [],
      "constraints": [],
      "notes": "（辅助球员神器、需要搭配突分等助攻技能）",
      "evidenceQuote": "（辅助球员神器、需要搭配突分等助攻技能）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_04",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "夯",
      "tags": [
        "挡拆"
      ],
      "scenarios": [],
      "constraints": [],
      "notes": "（挡拆永远都是最高效的得分手段，暂时不知道具体效果，待定）",
      "evidenceQuote": "（挡拆永远都是最高效的得分手段，暂时不知道具体效果，待定）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_05",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "夯",
      "tags": [
        "防守",
        "白神专属"
      ],
      "scenarios": [],
      "constraints": [
        "限定防守型球员",
        "白神适配"
      ],
      "notes": "（白神神器、所有防守型球员都可以带）",
      "evidenceQuote": "（白神神器、所有防守型球员都可以带）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_06",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "夯",
      "tags": [
        "组织/助攻",
        "命中率"
      ],
      "scenarios": [],
      "constraints": [],
      "notes": "（突分大概率给空位出手机会，命中率大幅提升）",
      "evidenceQuote": "（突分大概率给空位出手机会，命中率大幅提升）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_07",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "夯",
      "tags": [
        "速度卡"
      ],
      "scenarios": [],
      "constraints": [
        "仅【速】卡绝技球员可用"
      ],
      "notes": "（仅速卡大招球员可以使用）",
      "evidenceQuote": "（仅速卡大招球员可以使用）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_08",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "夯",
      "tags": [],
      "scenarios": [],
      "constraints": [],
      "notes": "（抢开局好用）",
      "evidenceQuote": "（抢开局好用）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_09",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "顶级",
      "tags": [
        "篮板"
      ],
      "scenarios": [],
      "constraints": [
        "限定篮板手"
      ],
      "notes": "（篮板球就是篮球场上最重要的事，但限定篮板手使用）",
      "evidenceQuote": "（篮板球就是篮球场上最重要的事，但限定篮板手使用）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_10",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "顶级",
      "tags": [],
      "scenarios": [],
      "constraints": [
        "限定某流派得分手"
      ],
      "notes": "（限定某一种流派的得分手定位球员）",
      "evidenceQuote": "（限定某一种流派的得分手定位球员）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_11",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "顶级",
      "tags": [
        "中投",
        "热区"
      ],
      "scenarios": [],
      "constraints": [
        "限中距离热区球员"
      ],
      "notes": "（限定中距离热区高的球员）",
      "evidenceQuote": "（限定中距离热区高的球员）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_12",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "顶级",
      "tags": [
        "防守"
      ],
      "scenarios": [],
      "constraints": [
        "限定防守型球员"
      ],
      "notes": "（外线防守型球员必带）",
      "evidenceQuote": "（外线防守型球员必带）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_13",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "顶级",
      "tags": [],
      "scenarios": [],
      "constraints": [],
      "notes": "所有紫色器材都可以给顶级，可以将原本被克制的属性转化成克制对手的技能，所有紫色器材都要留一张",
      "evidenceQuote": "所有紫色器材都可以给顶级，可以将原本被克制的属性转化成克制对手的技能，所有紫色器材都要留一张",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_14",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "顶级",
      "tags": [
        "PVP",
        "PVE",
        "PVE越级挑战"
      ],
      "scenarios": [
        "PVP",
        "PVE",
        "PVE越级挑战"
      ],
      "constraints": [
        "PVP 受苍骑队徽影响"
      ],
      "notes": "（适合pve挑战高难度副本，赌概率越级挑战，pvp因为有苍骑队徽的影响低概率技能不适用）",
      "evidenceQuote": "（适合pve挑战高难度副本，赌概率越级挑战，pvp因为有苍骑队徽的影响低概率技能不适用）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_15",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "顶级",
      "tags": [
        "防守"
      ],
      "scenarios": [],
      "constraints": [
        "限定防守型球员"
      ],
      "notes": "（限定防守型球员）",
      "evidenceQuote": "（限定防守型球员）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_16",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "顶级",
      "tags": [
        "三分",
        "热区"
      ],
      "scenarios": [],
      "constraints": [
        "限三分线外热区球员"
      ],
      "notes": "（限定热区在三分线外的球员）",
      "evidenceQuote": "（限定热区在三分线外的球员）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_17",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "人上人",
      "tags": [
        "防守"
      ],
      "scenarios": [],
      "constraints": [
        "限定防守型球员"
      ],
      "notes": "（属性不适配，仅防守者可以使用）",
      "evidenceQuote": "（属性不适配，仅防守者可以使用）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_18",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "人上人",
      "tags": [],
      "scenarios": [],
      "constraints": [],
      "notes": "（触发条件苛刻、但触发后的效果非常强力）",
      "evidenceQuote": "（触发条件苛刻、但触发后的效果非常强力）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_19",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "人上人",
      "tags": [
        "力量卡"
      ],
      "scenarios": [],
      "constraints": [
        "所有【力】卡绝技球员可用"
      ],
      "notes": "所有力卡大招球员都可以携带",
      "evidenceQuote": "所有力卡大招球员都可以携带",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_20",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "人上人",
      "tags": [
        "PVP",
        "PVE"
      ],
      "scenarios": [
        "PVP",
        "PVE"
      ],
      "constraints": [],
      "notes": "（概率极低，PVP不适用，PVE顶级）",
      "evidenceQuote": "（概率极低，PVP不适用，PVE顶级）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_21",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "人上人",
      "tags": [],
      "scenarios": [],
      "constraints": [],
      "notes": "（泛用性拉满）",
      "evidenceQuote": "（泛用性拉满）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_22",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "Npc",
      "tags": [
        "指定球员"
      ],
      "scenarios": [],
      "constraints": [
        "仅限近距离得分手（希雅/佐久间/榎本）"
      ],
      "notes": "仅适用于近距离得分手，希雅、佐久间、榎本三名球员",
      "evidenceQuote": "仅适用于近距离得分手，希雅、佐久间、榎本三名球员",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_23",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "Npc",
      "tags": [],
      "scenarios": [],
      "constraints": [],
      "notes": "（剪刀石头布平局的概率是1/3，但是这个游戏可以看破对手的） ｜ （意识不够泛用）",
      "evidenceQuote": "（剪刀石头布平局的概率是1/3，但是这个游戏可以看破对手的） ｜ （意识不够泛用）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_24",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "Npc",
      "tags": [
        "PVE",
        "PVE越级挑战"
      ],
      "scenarios": [
        "PVE",
        "PVE越级挑战"
      ],
      "constraints": [],
      "notes": "仅适合pve高难本越级挑战",
      "evidenceQuote": "仅适合pve高难本越级挑战",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_25",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "Npc",
      "tags": [
        "竞技场"
      ],
      "scenarios": [
        "竞技场"
      ],
      "constraints": [],
      "notes": "（对策攻框型内线神器，需要根据竞技场环境来使用）",
      "evidenceQuote": "（对策攻框型内线神器，需要根据竞技场环境来使用）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_26",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "拉完了",
      "tags": [
        "PVE越级挑战"
      ],
      "scenarios": [
        "PVE越级挑战"
      ],
      "constraints": [],
      "notes": "（概率低、仅克制一项属性泛用性低，对策性拉满，如果后续就极难高难度副本，可以用作对策卡）",
      "evidenceQuote": "（概率低、仅克制一项属性泛用性低，对策性拉满，如果后续就极难高难度副本，可以用作对策卡）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_27",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "拉完了",
      "tags": [],
      "scenarios": [],
      "constraints": [],
      "notes": "（需要看对手脸色）",
      "evidenceQuote": "（需要看对手脸色）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_28",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "拉完了",
      "tags": [
        "三分"
      ],
      "scenarios": [],
      "constraints": [
        "触发条件苛刻（最后3分钟/进攻回合/小概率）"
      ],
      "notes": "（所有雷点踩完了，和技能不适配的属性、比赛最后三分钟、必须是进攻回合、小概率）",
      "evidenceQuote": "（所有雷点踩完了，和技能不适配的属性、比赛最后三分钟、必须是进攻回合、小概率）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_eval_725599_29",
      "recordType": "tier_evaluation",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": "拉完了",
      "tags": [
        "PVE",
        "PVE越级挑战"
      ],
      "scenarios": [
        "PVE",
        "PVE越级挑战"
      ],
      "constraints": [],
      "notes": "（只适合打pve高难本）",
      "evidenceQuote": "（只适合打pve高难本）",
      "sourceFile": "data/structured/guides/725599_常驻器材评价手册｜叫我新手就行攻略整理.md",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "社区主观评价（作者五档评级，非实测数值）"
    },
    {
      "id": "eq_rule_01",
      "recordType": "generic_rule",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": null,
      "tags": [
        "通用规则"
      ],
      "scenarios": [],
      "constraints": [],
      "notes": "器材可借用：优先好友/公会借用，确认当天次数与可借星级，再决定是否抽取；零氪每天借约 6 次、每天只玩 6 局也可行。",
      "evidenceQuote": "器材可借用：优先好友/公会借用，确认当天次数与可借星级，再决定是否抽取；零氪每天借约 6 次、每天只玩 6 局也可行。",
      "sourceFile": "data/structured/guides/725395/725397/725398/725599/725601/725610 综合",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "多源一致（规则类）"
    },
    {
      "id": "eq_rule_02",
      "recordType": "generic_rule",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": null,
      "tags": [
        "通用规则"
      ],
      "scenarios": [],
      "constraints": [],
      "notes": "紫色器材原文建议每种保留一张（「顶级」页注释）；所有紫色器材都可给顶级。",
      "evidenceQuote": "紫色器材原文建议每种保留一张（「顶级」页注释）；所有紫色器材都可给顶级。",
      "sourceFile": "data/structured/guides/725395/725397/725398/725599/725601/725610 综合",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "多源一致（规则类）"
    },
    {
      "id": "eq_rule_03",
      "recordType": "generic_rule",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": null,
      "tags": [
        "通用规则"
      ],
      "scenarios": [],
      "constraints": [],
      "notes": "PVE 越级与 PVP 适用性要分开判断；低概率/赌概率型器材 PVE 顶级但 PVP 受苍骑队徽影响不适用。",
      "evidenceQuote": "PVE 越级与 PVP 适用性要分开判断；低概率/赌概率型器材 PVE 顶级但 PVP 受苍骑队徽影响不适用。",
      "sourceFile": "data/structured/guides/725395/725397/725398/725599/725601/725610 综合",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "多源一致（规则类）"
    },
    {
      "id": "eq_rule_04",
      "recordType": "generic_rule",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": null,
      "tags": [
        "通用规则"
      ],
      "scenarios": [],
      "constraints": [],
      "notes": "所有 UP 池器材「至少一星，或者不抽」；只买到本体达不到目标效果时，不如先借用。",
      "evidenceQuote": "所有 UP 池器材「至少一星，或者不抽」；只买到本体达不到目标效果时，不如先借用。",
      "sourceFile": "data/structured/guides/725395/725397/725398/725599/725601/725610 综合",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "多源一致（规则类）"
    },
    {
      "id": "eq_rule_05",
      "recordType": "generic_rule",
      "name": "",
      "quality": null,
      "attributes": null,
      "skill": null,
      "tier": null,
      "tags": [
        "通用规则"
      ],
      "scenarios": [],
      "constraints": [],
      "notes": "器材熟练度达到 70 可触发暴击训练（客户端字符串 @7551259 线索，非攻略数值，仅备注）。",
      "evidenceQuote": "器材熟练度达到 70 可触发暴击训练（客户端字符串 @7551259 线索，非攻略数值，仅备注）。",
      "sourceFile": "data/structured/guides/725395/725397/725398/725599/725601/725610 综合",
      "sourceUrl": "https://www.gamekee.com/lqsn/725599.html",
      "sourceType": "社区攻略（GameKee wiki 转述 B站「叫我新手就行」《常驻池器材从夯到拉》文档；非客户端数值）",
      "confidence": "客户端字符串线索（非攻略）"
    }
  ],
  "guideMatch": [
    {
      "equipmentId": "eq_support_whistle",
      "guideName": "支援口哨（支援哨子）",
      "clientName": "支援口哨（协助）",
      "clientQuality": "SSR",
      "attrText": null,
      "status": "matched"
    },
    {
      "equipmentId": "eq_jump_star",
      "guideName": "起跳之星",
      "clientName": "起跳之星(弹跳)",
      "clientQuality": "SSR",
      "attrText": "弹跳",
      "status": "matched"
    },
    {
      "equipmentId": "eq_dumbbell_4kg",
      "guideName": "4KG哑铃",
      "clientName": "哑铃（弹跳）",
      "clientQuality": "R",
      "attrText": "弹跳",
      "status": "matched"
    },
    {
      "equipmentId": "eq_smart_basketball",
      "guideName": "高级智能篮球器材",
      "clientName": "高级智能篮球（投射）",
      "clientQuality": "UP(SSR)",
      "attrText": "投射",
      "status": "matched"
    },
    {
      "equipmentId": "eq_cangqi_badge",
      "guideName": "苍骑队徽",
      "clientName": "苍骑队徽",
      "clientQuality": "队徽(独立分类)",
      "attrText": null,
      "status": "matched"
    },
    {
      "equipmentId": "eq_eval_725599_01",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_02",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_03",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_04",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_05",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_06",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_07",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_08",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_09",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_10",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_11",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_12",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_13",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_14",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_15",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_16",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_17",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_18",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_19",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_20",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_21",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_22",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_23",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_24",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_25",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_26",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_27",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_28",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_eval_725599_29",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_rule_01",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_rule_02",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_rule_03",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_rule_04",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    },
    {
      "equipmentId": "eq_rule_05",
      "guideName": "",
      "clientName": "",
      "clientQuality": null,
      "attrText": null,
      "status": "unlinked_no_name_in_guide"
    }
  ]
};
  if (typeof module === "object" && module.exports) module.exports = data;
  if (root) {
    root.BBEquipmentData = data;
    root.BBT = root.BBT || {};
    root.BBT.equipmentData = data;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

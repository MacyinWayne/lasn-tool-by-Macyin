/*!
 * data/notes.js —— 自动生成，请勿手改。
 * 生成脚本：tool/scripts/build-notes.mjs
 * 数据：hoopgirls.live v8（48×48 关系分/档位/词条库）+ 社区图 37 名双源校验
 * 生成时间：2026-11-06 00:27
 * 口径：社区级高可信；未实装角色按 in_community_37 过滤；待客户端核验
 */
(function (root) {
  'use strict';
  var data = {
  "schema": 1,
  "generatedAt": "2026-11-06 00:27",
  "dataVersion": "v2026.11.05",
  "mode": "structured",
  "source": "data/structured/note_harmony_matrix.json + data/raw/community/_hoopgirls_inheritance_rules.json",
  "meta": {
    "generatedAt": "2026-11-06 00:27",
    "dataVersion": "v2026.11.05",
    "title": "笔记契合关系矩阵（角色关系分）数字版",
    "primarySource": {
      "name": "hoopgirls.live（社区工具站《篮球少女：飞跃巅峰》笔记因子传承库/相性试算）",
      "url": "https://hoopgirls.live/",
      "data_url": "https://hoopgirls.live/data/inheritance_rules.json?v=8",
      "characters_url": "https://hoopgirls.live/data/characters.json?v=8",
      "data_version": 8,
      "note": "站点公开 JSON（fetch data/*.json?v=8），含 character_relationship_scores 48×48、契合度计算规则/档位、词条表；社区维护/数据挖掘产物，非官方发布"
    },
    "communityImageSource": {
      "name": "张君宝《笔记契合关系一图流》数据版 2026.11.02",
      "channel": "QQ 群 113452405（作者在 B 站视频 BV1sRx26GEfb 评论称「一图流自取」）",
      "backup": "data/community/refs/notes_harmony_matrix_20261102.jpg",
      "digitized": "data/community/notes_harmony/matrix_37.json（用户提供图片，37×37 人工转录，22/22 摘要卡校验、对角线 37/37=0、对称 666/666）",
      "relation": "37 名公开球星子集；与本数字版 48×48 属同一「角色关系分」数据"
    },
    "validation": {
      "cells_compared": 1369,
      "same": 1369,
      "same_rate": 1,
      "diff": 0,
      "conclusion": "两源高度一致（≥90% 格子相同）→ 社区图转录可信、hoopgirls 数字版可作主数据",
      "mismatch_samples": []
    },
    "confidence": "社区级高可信（hoopgirls.live v8 + 社区图 37 名双源 100% 校验）；待客户端核验",
    "counts": {
      "characters": 48,
      "released": 37,
      "unreleased": 11,
      "positionsKnown": 37,
      "entries": 141,
      "qualities": 7,
      "decomposeLevels": 9,
      "triggerBands": 13
    },
    "gaps": [
      "48 名中 37 名社区公开，其余 11 名按未实装过滤（released 字段来自 in_community_37，待官方名单核验）",
      "位置字段由 data/structured/characters.json 按名字前缀补全；未实装/无本地角色 position=null（不参与位置方案）",
      "契合词条触发加成存在 静态(+2/+5/+10) 与 触发时(+3/+6/+10) 两种口径，待客户端核验",
      "契合分→触发词条数表来自社区数据，实际触发概率未实测",
      "笔记品质/分解/记录消耗为社区规则，公测数值可能调整"
    ]
  },
  "characters": [
    {
      "id": "1001",
      "name": "澪奈·贾妮丝",
      "shortName": "澪奈",
      "contentId": 725342,
      "position": "小前",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1002",
      "name": "龙宫寺心叶",
      "shortName": "龙宫寺",
      "contentId": 725343,
      "position": "大前",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1003",
      "name": "近江奏",
      "shortName": "近江",
      "contentId": 725344,
      "position": "分卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1004",
      "name": "和泉香织",
      "shortName": "和泉",
      "contentId": 725345,
      "position": "控卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1005",
      "name": "亚理纱贾斯敏",
      "shortName": "亚理纱",
      "contentId": 725346,
      "position": "中锋",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1006",
      "name": "洺瑶",
      "shortName": "洺瑶",
      "contentId": 725347,
      "position": "中锋",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1007",
      "name": "闪堂电",
      "shortName": "闪堂",
      "contentId": 725348,
      "position": "分卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1008",
      "name": "仓理",
      "shortName": "仓理",
      "contentId": null,
      "position": null,
      "positionSource": null,
      "released": false,
      "inCommunity37": false,
      "note": "社区 37 图公开子集之外：按未实装过滤（待官方名单核验）"
    },
    {
      "id": "1009",
      "name": "克拉丽丝·波洛",
      "shortName": "克拉丽丝",
      "contentId": 725349,
      "position": "控卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1010",
      "name": "早濑千秋",
      "shortName": "早濑",
      "contentId": 725350,
      "position": "大前",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1011",
      "name": "羽田朱志香",
      "shortName": "羽田",
      "contentId": 725351,
      "position": "分卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1012",
      "name": "望月透",
      "shortName": "望月",
      "contentId": 725352,
      "position": "小前",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1013",
      "name": "百目鬼",
      "shortName": "百目鬼",
      "contentId": 725354,
      "position": null,
      "positionSource": null,
      "released": false,
      "inCommunity37": false,
      "note": "社区 37 图公开子集之外：按未实装过滤（待官方名单核验）"
    },
    {
      "id": "1014",
      "name": "藤松玖怜",
      "shortName": "藤松",
      "contentId": 725355,
      "position": "分卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1015",
      "name": "绿川步梦",
      "shortName": "绿川",
      "contentId": 725356,
      "position": "中锋",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1016",
      "name": "雨森琉璃",
      "shortName": "雨森",
      "contentId": 725357,
      "position": "大前",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1017",
      "name": "皆川式",
      "shortName": "皆川",
      "contentId": 725358,
      "position": "小前",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1018",
      "name": "毒岛黛也",
      "shortName": "毒岛",
      "contentId": 725359,
      "position": "分卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1019",
      "name": "名雪纱夜",
      "shortName": "名雪",
      "contentId": 725360,
      "position": "控卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1020",
      "name": "佐久间雨乃",
      "shortName": "佐久间",
      "contentId": 725361,
      "position": "大前",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1021",
      "name": "千圣·贝尔丝",
      "shortName": "千圣",
      "contentId": 725362,
      "position": "中锋",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1022",
      "name": "稻叶杏里",
      "shortName": "稻叶",
      "contentId": 725363,
      "position": "大前",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1023",
      "name": "清水万里",
      "shortName": "清水",
      "contentId": 725364,
      "position": "控卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1024",
      "name": "榎本纯那",
      "shortName": "榎本",
      "contentId": 725366,
      "position": "中锋",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1025",
      "name": "春澄永远",
      "shortName": "春澄",
      "contentId": 725367,
      "position": "大前",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1026",
      "name": "森田莉莉",
      "shortName": "森田",
      "contentId": 725368,
      "position": "控卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1027",
      "name": "美伽未来",
      "shortName": "美伽",
      "contentId": 725369,
      "position": "分卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1028",
      "name": "五十岚诗音",
      "shortName": "五十岚",
      "contentId": 725370,
      "position": "中锋",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1029",
      "name": "羽濑川湊",
      "shortName": "羽濑川",
      "contentId": 725371,
      "position": "小前",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1030",
      "name": "真崎辉世",
      "shortName": "真崎",
      "contentId": 725372,
      "position": "控卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1031",
      "name": "阵野",
      "shortName": "阵野",
      "contentId": null,
      "position": null,
      "positionSource": null,
      "released": false,
      "inCommunity37": false,
      "note": "社区 37 图公开子集之外：按未实装过滤（待官方名单核验）"
    },
    {
      "id": "1032",
      "name": "先斗月绮",
      "shortName": "先斗",
      "contentId": 725373,
      "position": "控卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1033",
      "name": "卧云真昼",
      "shortName": "卧云",
      "contentId": 725374,
      "position": "分卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1034",
      "name": "六道",
      "shortName": "六道",
      "contentId": null,
      "position": null,
      "positionSource": null,
      "released": false,
      "inCommunity37": false,
      "note": "社区 37 图公开子集之外：按未实装过滤（待官方名单核验）"
    },
    {
      "id": "1035",
      "name": "出羽",
      "shortName": "出羽",
      "contentId": null,
      "position": null,
      "positionSource": null,
      "released": false,
      "inCommunity37": false,
      "note": "社区 37 图公开子集之外：按未实装过滤（待官方名单核验）"
    },
    {
      "id": "1036",
      "name": "和歌",
      "shortName": "和歌",
      "contentId": null,
      "position": null,
      "positionSource": null,
      "released": false,
      "inCommunity37": false,
      "note": "社区 37 图公开子集之外：按未实装过滤（待官方名单核验）"
    },
    {
      "id": "1037",
      "name": "野上泷",
      "shortName": "野上",
      "contentId": 725375,
      "position": "大前",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1038",
      "name": "降旗千红纱",
      "shortName": "降旗",
      "contentId": 725376,
      "position": "小前",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1039",
      "name": "林原树里",
      "shortName": "林原",
      "contentId": 725377,
      "position": "控卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1040",
      "name": "美星栗栖",
      "shortName": "美星",
      "contentId": 725378,
      "position": "小前",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1041",
      "name": "岚山",
      "shortName": "岚山",
      "contentId": null,
      "position": null,
      "positionSource": null,
      "released": false,
      "inCommunity37": false,
      "note": "社区 37 图公开子集之外：按未实装过滤（待官方名单核验）"
    },
    {
      "id": "1042",
      "name": "远野桐",
      "shortName": "远野",
      "contentId": 725379,
      "position": "中锋",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1043",
      "name": "林",
      "shortName": "林",
      "contentId": 725377,
      "position": null,
      "positionSource": null,
      "released": false,
      "inCommunity37": false,
      "note": "社区 37 图公开子集之外：按未实装过滤（待官方名单核验）"
    },
    {
      "id": "1044",
      "name": "伊吹",
      "shortName": "伊吹",
      "contentId": null,
      "position": null,
      "positionSource": null,
      "released": false,
      "inCommunity37": false,
      "note": "社区 37 图公开子集之外：按未实装过滤（待官方名单核验）"
    },
    {
      "id": "1045",
      "name": "白神时久",
      "shortName": "白神",
      "contentId": 725380,
      "position": "控卫",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1046",
      "name": "希雅·奥黛拉",
      "shortName": "希雅",
      "contentId": 725381,
      "position": "中锋",
      "positionSource": "data/structured/characters.json（wiki 位置）",
      "released": true,
      "inCommunity37": true,
      "note": ""
    },
    {
      "id": "1047",
      "name": "日向",
      "shortName": "日向",
      "contentId": null,
      "position": null,
      "positionSource": null,
      "released": false,
      "inCommunity37": false,
      "note": "社区 37 图公开子集之外：按未实装过滤（待官方名单核验）"
    },
    {
      "id": "1999",
      "name": "理事长",
      "shortName": "理事长",
      "contentId": null,
      "position": null,
      "positionSource": null,
      "released": false,
      "inCommunity37": false,
      "note": "社区 37 图公开子集之外：按未实装过滤（待官方名单核验）"
    }
  ],
  "avgCompatibility": [
    {
      "id": "1006",
      "name": "洺瑶",
      "shortName": "洺瑶",
      "contentId": 725347,
      "position": "中锋",
      "released": true,
      "avg": 11.58,
      "others": 36,
      "rank": 1
    },
    {
      "id": "1019",
      "name": "名雪纱夜",
      "shortName": "名雪",
      "contentId": 725360,
      "position": "控卫",
      "released": true,
      "avg": 11.39,
      "others": 36,
      "rank": 2
    },
    {
      "id": "1004",
      "name": "和泉香织",
      "shortName": "和泉",
      "contentId": 725345,
      "position": "控卫",
      "released": true,
      "avg": 11.36,
      "others": 36,
      "rank": 3
    },
    {
      "id": "1046",
      "name": "希雅·奥黛拉",
      "shortName": "希雅",
      "contentId": 725381,
      "position": "中锋",
      "released": true,
      "avg": 11.31,
      "others": 36,
      "rank": 4
    },
    {
      "id": "1025",
      "name": "春澄永远",
      "shortName": "春澄",
      "contentId": 725367,
      "position": "大前",
      "released": true,
      "avg": 10.61,
      "others": 36,
      "rank": 5
    },
    {
      "id": "1010",
      "name": "早濑千秋",
      "shortName": "早濑",
      "contentId": 725350,
      "position": "大前",
      "released": true,
      "avg": 10.5,
      "others": 36,
      "rank": 6
    },
    {
      "id": "1007",
      "name": "闪堂电",
      "shortName": "闪堂",
      "contentId": 725348,
      "position": "分卫",
      "released": true,
      "avg": 10.47,
      "others": 36,
      "rank": 7
    },
    {
      "id": "1024",
      "name": "榎本纯那",
      "shortName": "榎本",
      "contentId": 725366,
      "position": "中锋",
      "released": true,
      "avg": 10.44,
      "others": 36,
      "rank": 8
    },
    {
      "id": "1040",
      "name": "美星栗栖",
      "shortName": "美星",
      "contentId": 725378,
      "position": "小前",
      "released": true,
      "avg": 10.31,
      "others": 36,
      "rank": 9
    },
    {
      "id": "1014",
      "name": "藤松玖怜",
      "shortName": "藤松",
      "contentId": 725355,
      "position": "分卫",
      "released": true,
      "avg": 10.25,
      "others": 36,
      "rank": 10
    },
    {
      "id": "1020",
      "name": "佐久间雨乃",
      "shortName": "佐久间",
      "contentId": 725361,
      "position": "大前",
      "released": true,
      "avg": 10.22,
      "others": 36,
      "rank": 11
    },
    {
      "id": "1001",
      "name": "澪奈·贾妮丝",
      "shortName": "澪奈",
      "contentId": 725342,
      "position": "小前",
      "released": true,
      "avg": 10.17,
      "others": 36,
      "rank": 12
    },
    {
      "id": "1018",
      "name": "毒岛黛也",
      "shortName": "毒岛",
      "contentId": 725359,
      "position": "分卫",
      "released": true,
      "avg": 10.14,
      "others": 36,
      "rank": 13
    },
    {
      "id": "1045",
      "name": "白神时久",
      "shortName": "白神",
      "contentId": 725380,
      "position": "控卫",
      "released": true,
      "avg": 10.11,
      "others": 36,
      "rank": 14
    },
    {
      "id": "1037",
      "name": "野上泷",
      "shortName": "野上",
      "contentId": 725375,
      "position": "大前",
      "released": true,
      "avg": 10.06,
      "others": 36,
      "rank": 15
    },
    {
      "id": "1003",
      "name": "近江奏",
      "shortName": "近江",
      "contentId": 725344,
      "position": "分卫",
      "released": true,
      "avg": 10,
      "others": 36,
      "rank": 16
    },
    {
      "id": "1030",
      "name": "真崎辉世",
      "shortName": "真崎",
      "contentId": 725372,
      "position": "控卫",
      "released": true,
      "avg": 9.97,
      "others": 36,
      "rank": 17
    },
    {
      "id": "1011",
      "name": "羽田朱志香",
      "shortName": "羽田",
      "contentId": 725351,
      "position": "分卫",
      "released": true,
      "avg": 9.81,
      "others": 36,
      "rank": 18
    },
    {
      "id": "1009",
      "name": "克拉丽丝·波洛",
      "shortName": "克拉丽丝",
      "contentId": 725349,
      "position": "控卫",
      "released": true,
      "avg": 9.78,
      "others": 36,
      "rank": 19
    },
    {
      "id": "1015",
      "name": "绿川步梦",
      "shortName": "绿川",
      "contentId": 725356,
      "position": "中锋",
      "released": true,
      "avg": 9.78,
      "others": 36,
      "rank": 20
    },
    {
      "id": "1012",
      "name": "望月透",
      "shortName": "望月",
      "contentId": 725352,
      "position": "小前",
      "released": true,
      "avg": 9.75,
      "others": 36,
      "rank": 21
    },
    {
      "id": "1032",
      "name": "先斗月绮",
      "shortName": "先斗",
      "contentId": 725373,
      "position": "控卫",
      "released": true,
      "avg": 9.72,
      "others": 36,
      "rank": 22
    },
    {
      "id": "1021",
      "name": "千圣·贝尔丝",
      "shortName": "千圣",
      "contentId": 725362,
      "position": "中锋",
      "released": true,
      "avg": 9.69,
      "others": 36,
      "rank": 23
    },
    {
      "id": "1002",
      "name": "龙宫寺心叶",
      "shortName": "龙宫寺",
      "contentId": 725343,
      "position": "大前",
      "released": true,
      "avg": 9.64,
      "others": 36,
      "rank": 24
    },
    {
      "id": "1023",
      "name": "清水万里",
      "shortName": "清水",
      "contentId": 725364,
      "position": "控卫",
      "released": true,
      "avg": 9.61,
      "others": 36,
      "rank": 25
    },
    {
      "id": "1022",
      "name": "稻叶杏里",
      "shortName": "稻叶",
      "contentId": 725363,
      "position": "大前",
      "released": true,
      "avg": 9.56,
      "others": 36,
      "rank": 26
    },
    {
      "id": "1017",
      "name": "皆川式",
      "shortName": "皆川",
      "contentId": 725358,
      "position": "小前",
      "released": true,
      "avg": 9.47,
      "others": 36,
      "rank": 27
    },
    {
      "id": "1042",
      "name": "远野桐",
      "shortName": "远野",
      "contentId": 725379,
      "position": "中锋",
      "released": true,
      "avg": 9.47,
      "others": 36,
      "rank": 28
    },
    {
      "id": "1027",
      "name": "美伽未来",
      "shortName": "美伽",
      "contentId": 725369,
      "position": "分卫",
      "released": true,
      "avg": 9.17,
      "others": 36,
      "rank": 29
    },
    {
      "id": "1028",
      "name": "五十岚诗音",
      "shortName": "五十岚",
      "contentId": 725370,
      "position": "中锋",
      "released": true,
      "avg": 9.17,
      "others": 36,
      "rank": 30
    },
    {
      "id": "1026",
      "name": "森田莉莉",
      "shortName": "森田",
      "contentId": 725368,
      "position": "控卫",
      "released": true,
      "avg": 8.89,
      "others": 36,
      "rank": 31
    },
    {
      "id": "1029",
      "name": "羽濑川湊",
      "shortName": "羽濑川",
      "contentId": 725371,
      "position": "小前",
      "released": true,
      "avg": 8.81,
      "others": 36,
      "rank": 32
    },
    {
      "id": "1005",
      "name": "亚理纱贾斯敏",
      "shortName": "亚理纱",
      "contentId": 725346,
      "position": "中锋",
      "released": true,
      "avg": 8.72,
      "others": 36,
      "rank": 33
    },
    {
      "id": "1038",
      "name": "降旗千红纱",
      "shortName": "降旗",
      "contentId": 725376,
      "position": "小前",
      "released": true,
      "avg": 8.72,
      "others": 36,
      "rank": 34
    },
    {
      "id": "1016",
      "name": "雨森琉璃",
      "shortName": "雨森",
      "contentId": 725357,
      "position": "大前",
      "released": true,
      "avg": 8.69,
      "others": 36,
      "rank": 35
    },
    {
      "id": "1039",
      "name": "林原树里",
      "shortName": "林原",
      "contentId": 725377,
      "position": "控卫",
      "released": true,
      "avg": 8.14,
      "others": 36,
      "rank": 36
    },
    {
      "id": "1033",
      "name": "卧云真昼",
      "shortName": "卧云",
      "contentId": 725374,
      "position": "分卫",
      "released": true,
      "avg": 7.42,
      "others": 36,
      "rank": 37
    }
  ],
  "dogfoodTop": [
    "洺瑶",
    "名雪纱夜",
    "和泉香织",
    "希雅·奥黛拉",
    "春澄永远",
    "早濑千秋",
    "闪堂电",
    "榎本纯那",
    "美星栗栖",
    "藤松玖怜",
    "佐久间雨乃",
    "澪奈·贾妮丝",
    "毒岛黛也",
    "白神时久",
    "野上泷"
  ],
  "cycles": [
    {
      "character": "克拉丽丝",
      "bestCycleSize": 3,
      "bestCycle": [
        "克拉丽丝",
        "毒岛",
        "早濑"
      ],
      "minEdge": 18,
      "minBase": 37,
      "allCanReach45WithDouble2Star": true,
      "bases": [
        37,
        38,
        37
      ],
      "sum": 56,
      "bySize": {
        "3": {
          "minEdge": 18,
          "minBase": 37,
          "sum": 56,
          "bases": [
            37,
            38,
            37
          ],
          "edges": [
            19,
            19,
            18
          ],
          "cycle": [
            "克拉丽丝",
            "毒岛",
            "早濑"
          ]
        },
        "4": {
          "minEdge": 18,
          "minBase": 32,
          "sum": 74,
          "bases": [
            32,
            32,
            34,
            32
          ],
          "edges": [
            18,
            20,
            18,
            18
          ],
          "cycle": [
            "克拉丽丝",
            "龙宫寺",
            "美星",
            "早濑"
          ]
        },
        "5": {
          "minEdge": 18,
          "minBase": 22,
          "sum": 94,
          "bases": [
            32,
            22,
            37,
            25,
            34
          ],
          "edges": [
            19,
            19,
            18,
            20,
            18
          ],
          "cycle": [
            "克拉丽丝",
            "毒岛",
            "早濑",
            "美星",
            "龙宫寺"
          ]
        }
      }
    },
    {
      "character": "早濑",
      "bestCycleSize": 3,
      "bestCycle": [
        "早濑",
        "毒岛",
        "克拉丽丝"
      ],
      "minEdge": 18,
      "minBase": 37,
      "allCanReach45WithDouble2Star": true,
      "bases": [
        37,
        38,
        37
      ],
      "sum": 56,
      "bySize": {
        "3": {
          "minEdge": 18,
          "minBase": 37,
          "sum": 56,
          "bases": [
            37,
            38,
            37
          ],
          "edges": [
            19,
            19,
            18
          ],
          "cycle": [
            "早濑",
            "毒岛",
            "克拉丽丝"
          ]
        },
        "4": {
          "minEdge": 18,
          "minBase": 30,
          "sum": 78,
          "bases": [
            32,
            30,
            34,
            30
          ],
          "edges": [
            20,
            20,
            20,
            18
          ],
          "cycle": [
            "早濑",
            "近江",
            "龙宫寺",
            "美星"
          ]
        },
        "5": {
          "minEdge": 18,
          "minBase": 22,
          "sum": 96,
          "bases": [
            37,
            29,
            34,
            26,
            22
          ],
          "edges": [
            20,
            20,
            18,
            19,
            19
          ],
          "cycle": [
            "早濑",
            "近江",
            "龙宫寺",
            "克拉丽丝",
            "毒岛"
          ]
        }
      }
    },
    {
      "character": "毒岛",
      "bestCycleSize": 3,
      "bestCycle": [
        "毒岛",
        "克拉丽丝",
        "早濑"
      ],
      "minEdge": 18,
      "minBase": 37,
      "allCanReach45WithDouble2Star": true,
      "bases": [
        38,
        37,
        37
      ],
      "sum": 56,
      "bySize": {
        "3": {
          "minEdge": 18,
          "minBase": 37,
          "sum": 56,
          "bases": [
            38,
            37,
            37
          ],
          "edges": [
            19,
            18,
            19
          ],
          "cycle": [
            "毒岛",
            "克拉丽丝",
            "早濑"
          ]
        },
        "4": {
          "minEdge": 16,
          "minBase": 30,
          "sum": 69,
          "bases": [
            35,
            33,
            37,
            30
          ],
          "edges": [
            19,
            18,
            16,
            16
          ],
          "cycle": [
            "毒岛",
            "早濑",
            "克拉丽丝",
            "洺瑶"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 29,
          "sum": 84,
          "bases": [
            31,
            29,
            37,
            30,
            31
          ],
          "edges": [
            19,
            18,
            16,
            16,
            15
          ],
          "cycle": [
            "毒岛",
            "早濑",
            "克拉丽丝",
            "洺瑶",
            "名雪"
          ]
        }
      }
    },
    {
      "character": "森田",
      "bestCycleSize": 3,
      "bestCycle": [
        "森田",
        "五十岚",
        "美伽"
      ],
      "minEdge": 17,
      "minBase": 35,
      "allCanReach45WithDouble2Star": true,
      "bases": [
        37,
        38,
        35
      ],
      "sum": 55,
      "bySize": {
        "3": {
          "minEdge": 17,
          "minBase": 35,
          "sum": 55,
          "bases": [
            37,
            38,
            35
          ],
          "edges": [
            20,
            18,
            17
          ],
          "cycle": [
            "森田",
            "五十岚",
            "美伽"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 26,
          "sum": 68,
          "bases": [
            32,
            31,
            35,
            26
          ],
          "edges": [
            20,
            18,
            15,
            15
          ],
          "cycle": [
            "森田",
            "五十岚",
            "美伽",
            "和泉"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 26,
          "sum": 79,
          "bases": [
            32,
            28,
            35,
            30,
            26
          ],
          "edges": [
            16,
            15,
            18,
            15,
            15
          ],
          "cycle": [
            "森田",
            "澪奈",
            "五十岚",
            "美伽",
            "和泉"
          ]
        }
      }
    },
    {
      "character": "美伽",
      "bestCycleSize": 3,
      "bestCycle": [
        "美伽",
        "五十岚",
        "森田"
      ],
      "minEdge": 17,
      "minBase": 35,
      "allCanReach45WithDouble2Star": true,
      "bases": [
        35,
        38,
        37
      ],
      "sum": 55,
      "bySize": {
        "3": {
          "minEdge": 17,
          "minBase": 35,
          "sum": 55,
          "bases": [
            35,
            38,
            37
          ],
          "edges": [
            18,
            20,
            17
          ],
          "cycle": [
            "美伽",
            "五十岚",
            "森田"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 26,
          "sum": 68,
          "bases": [
            32,
            29,
            37,
            26
          ],
          "edges": [
            18,
            20,
            15,
            15
          ],
          "cycle": [
            "美伽",
            "五十岚",
            "森田",
            "和泉"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 27,
          "sum": 79,
          "bases": [
            32,
            29,
            27,
            36,
            27
          ],
          "edges": [
            18,
            15,
            16,
            15,
            15
          ],
          "cycle": [
            "美伽",
            "五十岚",
            "澪奈",
            "森田",
            "和泉"
          ]
        }
      }
    },
    {
      "character": "五十岚",
      "bestCycleSize": 3,
      "bestCycle": [
        "五十岚",
        "森田",
        "美伽"
      ],
      "minEdge": 17,
      "minBase": 35,
      "allCanReach45WithDouble2Star": true,
      "bases": [
        38,
        37,
        35
      ],
      "sum": 55,
      "bySize": {
        "3": {
          "minEdge": 17,
          "minBase": 35,
          "sum": 55,
          "bases": [
            38,
            37,
            35
          ],
          "edges": [
            20,
            17,
            18
          ],
          "cycle": [
            "五十岚",
            "森田",
            "美伽"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 26,
          "sum": 68,
          "bases": [
            29,
            37,
            26,
            32
          ],
          "edges": [
            20,
            15,
            15,
            18
          ],
          "cycle": [
            "五十岚",
            "森田",
            "和泉",
            "美伽"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 26,
          "sum": 79,
          "bases": [
            35,
            30,
            26,
            32,
            28
          ],
          "edges": [
            18,
            15,
            15,
            16,
            15
          ],
          "cycle": [
            "五十岚",
            "美伽",
            "和泉",
            "森田",
            "澪奈"
          ]
        }
      }
    },
    {
      "character": "野上",
      "bestCycleSize": 3,
      "bestCycle": [
        "野上",
        "希雅",
        "白神"
      ],
      "minEdge": 17,
      "minBase": 35,
      "allCanReach45WithDouble2Star": true,
      "bases": [
        38,
        37,
        35
      ],
      "sum": 55,
      "bySize": {
        "3": {
          "minEdge": 17,
          "minBase": 35,
          "sum": 55,
          "bases": [
            38,
            37,
            35
          ],
          "edges": [
            20,
            17,
            18
          ],
          "cycle": [
            "野上",
            "希雅",
            "白神"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 26,
          "sum": 64,
          "bases": [
            28,
            27,
            27,
            26
          ],
          "edges": [
            17,
            15,
            16,
            16
          ],
          "cycle": [
            "野上",
            "降旗",
            "洺瑶",
            "名雪"
          ]
        },
        "5": {
          "minEdge": 16,
          "minBase": 26,
          "sum": 85,
          "bases": [
            28,
            27,
            30,
            33,
            26
          ],
          "edges": [
            17,
            18,
            18,
            16,
            16
          ],
          "cycle": [
            "野上",
            "降旗",
            "澪奈",
            "洺瑶",
            "名雪"
          ]
        }
      }
    },
    {
      "character": "白神",
      "bestCycleSize": 3,
      "bestCycle": [
        "白神",
        "野上",
        "希雅"
      ],
      "minEdge": 17,
      "minBase": 35,
      "allCanReach45WithDouble2Star": true,
      "bases": [
        35,
        38,
        37
      ],
      "sum": 55,
      "bySize": {
        "3": {
          "minEdge": 17,
          "minBase": 35,
          "sum": 55,
          "bases": [
            35,
            38,
            37
          ],
          "edges": [
            18,
            20,
            17
          ],
          "cycle": [
            "白神",
            "野上",
            "希雅"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 23,
          "sum": 71,
          "bases": [
            35,
            26,
            37,
            23
          ],
          "edges": [
            18,
            20,
            15,
            18
          ],
          "cycle": [
            "白神",
            "野上",
            "希雅",
            "美星"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 23,
          "sum": 87,
          "bases": [
            30,
            33,
            34,
            23,
            23
          ],
          "edges": [
            18,
            20,
            17,
            15,
            17
          ],
          "cycle": [
            "白神",
            "美星",
            "龙宫寺",
            "闪堂",
            "希雅"
          ]
        }
      }
    },
    {
      "character": "希雅",
      "bestCycleSize": 3,
      "bestCycle": [
        "希雅",
        "野上",
        "白神"
      ],
      "minEdge": 17,
      "minBase": 35,
      "allCanReach45WithDouble2Star": true,
      "bases": [
        37,
        38,
        35
      ],
      "sum": 55,
      "bySize": {
        "3": {
          "minEdge": 17,
          "minBase": 35,
          "sum": 55,
          "bases": [
            37,
            38,
            35
          ],
          "edges": [
            20,
            18,
            17
          ],
          "cycle": [
            "希雅",
            "野上",
            "白神"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 26,
          "sum": 71,
          "bases": [
            32,
            28,
            35,
            26
          ],
          "edges": [
            20,
            18,
            18,
            15
          ],
          "cycle": [
            "希雅",
            "野上",
            "白神",
            "美星"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 21,
          "sum": 82,
          "bases": [
            32,
            33,
            28,
            21,
            28
          ],
          "edges": [
            20,
            15,
            15,
            15,
            17
          ],
          "cycle": [
            "希雅",
            "野上",
            "毒岛",
            "闪堂",
            "先斗"
          ]
        }
      }
    },
    {
      "character": "澪奈",
      "bestCycleSize": 3,
      "bestCycle": [
        "澪奈",
        "洺瑶",
        "羽田"
      ],
      "minEdge": 17,
      "minBase": 35,
      "allCanReach45WithDouble2Star": true,
      "bases": [
        35,
        36,
        35
      ],
      "sum": 53,
      "bySize": {
        "3": {
          "minEdge": 17,
          "minBase": 35,
          "sum": 53,
          "bases": [
            35,
            36,
            35
          ],
          "edges": [
            18,
            18,
            17
          ],
          "cycle": [
            "澪奈",
            "洺瑶",
            "羽田"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 29,
          "sum": 68,
          "bases": [
            35,
            29,
            33,
            29
          ],
          "edges": [
            18,
            15,
            18,
            17
          ],
          "cycle": [
            "澪奈",
            "降旗",
            "洺瑶",
            "羽田"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 22,
          "sum": 80,
          "bases": [
            31,
            29,
            33,
            22,
            33
          ],
          "edges": [
            18,
            15,
            15,
            15,
            17
          ],
          "cycle": [
            "澪奈",
            "降旗",
            "洺瑶",
            "先斗",
            "羽田"
          ]
        }
      }
    },
    {
      "character": "洺瑶",
      "bestCycleSize": 3,
      "bestCycle": [
        "洺瑶",
        "澪奈",
        "羽田"
      ],
      "minEdge": 17,
      "minBase": 35,
      "allCanReach45WithDouble2Star": true,
      "bases": [
        36,
        35,
        35
      ],
      "sum": 53,
      "bySize": {
        "3": {
          "minEdge": 17,
          "minBase": 35,
          "sum": 53,
          "bases": [
            36,
            35,
            35
          ],
          "edges": [
            18,
            17,
            18
          ],
          "cycle": [
            "洺瑶",
            "澪奈",
            "羽田"
          ]
        },
        "4": {
          "minEdge": 16,
          "minBase": 28,
          "sum": 69,
          "bases": [
            30,
            28,
            30,
            29
          ],
          "edges": [
            18,
            16,
            19,
            16
          ],
          "cycle": [
            "洺瑶",
            "羽田",
            "早濑",
            "毒岛"
          ]
        },
        "5": {
          "minEdge": 16,
          "minBase": 20,
          "sum": 88,
          "bases": [
            32,
            20,
            30,
            29,
            37
          ],
          "edges": [
            18,
            16,
            19,
            19,
            16
          ],
          "cycle": [
            "洺瑶",
            "羽田",
            "早濑",
            "毒岛",
            "克拉丽丝"
          ]
        }
      }
    },
    {
      "character": "羽田",
      "bestCycleSize": 3,
      "bestCycle": [
        "羽田",
        "洺瑶",
        "澪奈"
      ],
      "minEdge": 17,
      "minBase": 35,
      "allCanReach45WithDouble2Star": true,
      "bases": [
        35,
        36,
        35
      ],
      "sum": 53,
      "bySize": {
        "3": {
          "minEdge": 17,
          "minBase": 35,
          "sum": 53,
          "bases": [
            35,
            36,
            35
          ],
          "edges": [
            18,
            18,
            17
          ],
          "cycle": [
            "羽田",
            "洺瑶",
            "澪奈"
          ]
        },
        "4": {
          "minEdge": 16,
          "minBase": 26,
          "sum": 67,
          "bases": [
            34,
            27,
            36,
            26
          ],
          "edges": [
            17,
            18,
            16,
            16
          ],
          "cycle": [
            "羽田",
            "澪奈",
            "洺瑶",
            "名雪"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 26,
          "sum": 83,
          "bases": [
            33,
            31,
            36,
            26,
            28
          ],
          "edges": [
            17,
            18,
            16,
            15,
            17
          ],
          "cycle": [
            "羽田",
            "澪奈",
            "洺瑶",
            "名雪",
            "望月"
          ]
        }
      }
    },
    {
      "character": "龙宫寺",
      "bestCycleSize": 4,
      "bestCycle": [
        "龙宫寺",
        "近江",
        "早濑",
        "美星"
      ],
      "minEdge": 18,
      "minBase": 28,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        34,
        30,
        34,
        28
      ],
      "sum": 78,
      "bySize": {
        "3": {
          "minEdge": 14,
          "minBase": 34,
          "sum": 54,
          "bases": [
            34,
            40,
            34
          ],
          "edges": [
            20,
            20,
            14
          ],
          "cycle": [
            "龙宫寺",
            "近江",
            "早濑"
          ]
        },
        "4": {
          "minEdge": 18,
          "minBase": 28,
          "sum": 78,
          "bases": [
            34,
            30,
            34,
            28
          ],
          "edges": [
            20,
            20,
            18,
            20
          ],
          "cycle": [
            "龙宫寺",
            "近江",
            "早濑",
            "美星"
          ]
        },
        "5": {
          "minEdge": 14,
          "minBase": 26,
          "sum": 92,
          "bases": [
            38,
            30,
            34,
            26,
            32
          ],
          "edges": [
            20,
            20,
            18,
            14,
            20
          ],
          "cycle": [
            "龙宫寺",
            "近江",
            "早濑",
            "克拉丽丝",
            "美星"
          ]
        }
      }
    },
    {
      "character": "美星",
      "bestCycleSize": 4,
      "bestCycle": [
        "美星",
        "龙宫寺",
        "克拉丽丝",
        "早濑"
      ],
      "minEdge": 18,
      "minBase": 32,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        32,
        34,
        32,
        32
      ],
      "sum": 74,
      "bySize": {
        "3": {
          "minEdge": 15,
          "minBase": 32,
          "sum": 50,
          "bases": [
            33,
            35,
            32
          ],
          "edges": [
            18,
            17,
            15
          ],
          "cycle": [
            "美星",
            "白神",
            "希雅"
          ]
        },
        "4": {
          "minEdge": 18,
          "minBase": 32,
          "sum": 74,
          "bases": [
            32,
            34,
            32,
            32
          ],
          "edges": [
            20,
            18,
            18,
            18
          ],
          "cycle": [
            "美星",
            "龙宫寺",
            "克拉丽丝",
            "早濑"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 21,
          "sum": 86,
          "bases": [
            33,
            31,
            32,
            32,
            21
          ],
          "edges": [
            20,
            18,
            18,
            15,
            15
          ],
          "cycle": [
            "美星",
            "龙宫寺",
            "克拉丽丝",
            "早濑",
            "藤松"
          ]
        }
      }
    },
    {
      "character": "望月",
      "bestCycleSize": 5,
      "bestCycle": [
        "望月",
        "稻叶",
        "洺瑶",
        "澪奈",
        "羽田"
      ],
      "minEdge": 17,
      "minBase": 27,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        31,
        27,
        33,
        27,
        35
      ],
      "sum": 91,
      "bySize": {
        "3": {
          "minEdge": 16,
          "minBase": 33,
          "sum": 52,
          "bases": [
            35,
            36,
            33
          ],
          "edges": [
            19,
            17,
            16
          ],
          "cycle": [
            "望月",
            "稻叶",
            "绿川"
          ]
        },
        "4": {
          "minEdge": 17,
          "minBase": 26,
          "sum": 74,
          "bases": [
            30,
            27,
            33,
            26
          ],
          "edges": [
            19,
            20,
            18,
            17
          ],
          "cycle": [
            "望月",
            "稻叶",
            "洺瑶",
            "羽田"
          ]
        },
        "5": {
          "minEdge": 17,
          "minBase": 27,
          "sum": 91,
          "bases": [
            31,
            27,
            33,
            27,
            35
          ],
          "edges": [
            19,
            20,
            18,
            17,
            17
          ],
          "cycle": [
            "望月",
            "稻叶",
            "洺瑶",
            "澪奈",
            "羽田"
          ]
        }
      }
    },
    {
      "character": "降旗",
      "bestCycleSize": 5,
      "bestCycle": [
        "降旗",
        "澪奈",
        "洺瑶",
        "羽田",
        "千圣"
      ],
      "minEdge": 17,
      "minBase": 22,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        29,
        22,
        33,
        35,
        24
      ],
      "sum": 89,
      "bySize": {
        "3": {
          "minEdge": 15,
          "minBase": 33,
          "sum": 51,
          "bases": [
            33,
            36,
            33
          ],
          "edges": [
            18,
            18,
            15
          ],
          "cycle": [
            "降旗",
            "澪奈",
            "洺瑶"
          ]
        },
        "4": {
          "minEdge": 17,
          "minBase": 21,
          "sum": 70,
          "bases": [
            29,
            22,
            28,
            21
          ],
          "edges": [
            18,
            17,
            17,
            18
          ],
          "cycle": [
            "降旗",
            "澪奈",
            "羽田",
            "千圣"
          ]
        },
        "5": {
          "minEdge": 17,
          "minBase": 22,
          "sum": 89,
          "bases": [
            29,
            22,
            33,
            35,
            24
          ],
          "edges": [
            18,
            18,
            18,
            17,
            18
          ],
          "cycle": [
            "降旗",
            "澪奈",
            "洺瑶",
            "羽田",
            "千圣"
          ]
        }
      }
    },
    {
      "character": "千圣",
      "bestCycleSize": 4,
      "bestCycle": [
        "千圣",
        "佐久间",
        "名雪",
        "羽田"
      ],
      "minEdge": 16,
      "minBase": 23,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        31,
        27,
        31,
        23
      ],
      "sum": 70,
      "bySize": {
        "3": {
          "minEdge": 15,
          "minBase": 31,
          "sum": 48,
          "bases": [
            32,
            33,
            31
          ],
          "edges": [
            17,
            16,
            15
          ],
          "cycle": [
            "千圣",
            "羽田",
            "早濑"
          ]
        },
        "4": {
          "minEdge": 16,
          "minBase": 23,
          "sum": 70,
          "bases": [
            31,
            27,
            31,
            23
          ],
          "edges": [
            20,
            17,
            16,
            17
          ],
          "cycle": [
            "千圣",
            "佐久间",
            "名雪",
            "羽田"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 27,
          "sum": 86,
          "bases": [
            31,
            27,
            30,
            32,
            31
          ],
          "edges": [
            20,
            18,
            15,
            16,
            17
          ],
          "cycle": [
            "千圣",
            "佐久间",
            "闪堂",
            "名雪",
            "羽田"
          ]
        }
      }
    },
    {
      "character": "绿川",
      "bestCycleSize": 3,
      "bestCycle": [
        "绿川",
        "稻叶",
        "望月"
      ],
      "minEdge": 16,
      "minBase": 33,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        33,
        36,
        35
      ],
      "sum": 52,
      "bySize": {
        "3": {
          "minEdge": 16,
          "minBase": 33,
          "sum": 52,
          "bases": [
            33,
            36,
            35
          ],
          "edges": [
            17,
            19,
            16
          ],
          "cycle": [
            "绿川",
            "稻叶",
            "望月"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 21,
          "sum": 66,
          "bases": [
            31,
            23,
            35,
            21
          ],
          "edges": [
            17,
            19,
            15,
            15
          ],
          "cycle": [
            "绿川",
            "稻叶",
            "望月",
            "真崎"
          ]
        },
        "5": {
          "minEdge": 14,
          "minBase": 21,
          "sum": 82,
          "bases": [
            31,
            30,
            31,
            21,
            21
          ],
          "edges": [
            19,
            14,
            19,
            15,
            15
          ],
          "cycle": [
            "绿川",
            "亚理纱",
            "稻叶",
            "望月",
            "真崎"
          ]
        }
      }
    },
    {
      "character": "稻叶",
      "bestCycleSize": 3,
      "bestCycle": [
        "稻叶",
        "望月",
        "绿川"
      ],
      "minEdge": 16,
      "minBase": 33,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        36,
        35,
        33
      ],
      "sum": 52,
      "bySize": {
        "3": {
          "minEdge": 16,
          "minBase": 33,
          "sum": 52,
          "bases": [
            36,
            35,
            33
          ],
          "edges": [
            19,
            16,
            17
          ],
          "cycle": [
            "稻叶",
            "望月",
            "绿川"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 28,
          "sum": 68,
          "bases": [
            29,
            31,
            30,
            28
          ],
          "edges": [
            20,
            16,
            17,
            15
          ],
          "cycle": [
            "稻叶",
            "洺瑶",
            "克拉丽丝",
            "春澄"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 24,
          "sum": 83,
          "bases": [
            30,
            26,
            30,
            28,
            24
          ],
          "edges": [
            20,
            16,
            17,
            15,
            15
          ],
          "cycle": [
            "稻叶",
            "洺瑶",
            "克拉丽丝",
            "春澄",
            "羽濑川"
          ]
        }
      }
    },
    {
      "character": "名雪",
      "bestCycleSize": 3,
      "bestCycle": [
        "名雪",
        "洺瑶",
        "羽田"
      ],
      "minEdge": 16,
      "minBase": 32,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        32,
        34,
        34
      ],
      "sum": 50,
      "bySize": {
        "3": {
          "minEdge": 16,
          "minBase": 32,
          "sum": 50,
          "bases": [
            32,
            34,
            34
          ],
          "edges": [
            16,
            18,
            16
          ],
          "cycle": [
            "名雪",
            "洺瑶",
            "羽田"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 22,
          "sum": 66,
          "bases": [
            31,
            24,
            33,
            22
          ],
          "edges": [
            17,
            18,
            15,
            16
          ],
          "cycle": [
            "名雪",
            "佐久间",
            "闪堂",
            "羽田"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 22,
          "sum": 84,
          "bases": [
            32,
            25,
            33,
            22,
            27
          ],
          "edges": [
            17,
            18,
            15,
            18,
            16
          ],
          "cycle": [
            "名雪",
            "佐久间",
            "闪堂",
            "羽田",
            "洺瑶"
          ]
        }
      }
    },
    {
      "character": "清水",
      "bestCycleSize": 5,
      "bestCycle": [
        "清水",
        "早濑",
        "美星",
        "希雅",
        "和泉"
      ],
      "minEdge": 15,
      "minBase": 23,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        28,
        26,
        31,
        23,
        23
      ],
      "sum": 84,
      "bySize": {
        "3": {
          "minEdge": 14,
          "minBase": 29,
          "sum": 44,
          "bases": [
            30,
            29,
            29
          ],
          "edges": [
            15,
            14,
            15
          ],
          "cycle": [
            "清水",
            "和泉",
            "榎本"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 24,
          "sum": 69,
          "bases": [
            28,
            28,
            31,
            24
          ],
          "edges": [
            20,
            18,
            16,
            15
          ],
          "cycle": [
            "清水",
            "早濑",
            "美星",
            "绿川"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 23,
          "sum": 84,
          "bases": [
            28,
            26,
            31,
            23,
            23
          ],
          "edges": [
            20,
            18,
            15,
            16,
            15
          ],
          "cycle": [
            "清水",
            "早濑",
            "美星",
            "希雅",
            "和泉"
          ]
        }
      }
    },
    {
      "character": "皆川",
      "bestCycleSize": 5,
      "bestCycle": [
        "皆川",
        "和泉",
        "佐久间",
        "闪堂",
        "毒岛"
      ],
      "minEdge": 15,
      "minBase": 25,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        31,
        25,
        30,
        28,
        28
      ],
      "sum": 83,
      "bySize": {
        "3": {
          "minEdge": 14,
          "minBase": 30,
          "sum": 47,
          "bases": [
            31,
            33,
            30
          ],
          "edges": [
            17,
            16,
            14
          ],
          "cycle": [
            "皆川",
            "和泉",
            "佐久间"
          ]
        },
        "4": {
          "minEdge": 14,
          "minBase": 27,
          "sum": 65,
          "bases": [
            28,
            27,
            30,
            28
          ],
          "edges": [
            17,
            16,
            18,
            14
          ],
          "cycle": [
            "皆川",
            "和泉",
            "佐久间",
            "闪堂"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 25,
          "sum": 83,
          "bases": [
            31,
            25,
            30,
            28,
            28
          ],
          "edges": [
            17,
            16,
            18,
            15,
            17
          ],
          "cycle": [
            "皆川",
            "和泉",
            "佐久间",
            "闪堂",
            "毒岛"
          ]
        }
      }
    },
    {
      "character": "佐久间",
      "bestCycleSize": 5,
      "bestCycle": [
        "佐久间",
        "闪堂",
        "毒岛",
        "皆川",
        "和泉"
      ],
      "minEdge": 15,
      "minBase": 25,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        30,
        28,
        28,
        31,
        25
      ],
      "sum": 83,
      "bySize": {
        "3": {
          "minEdge": 15,
          "minBase": 32,
          "sum": 50,
          "bases": [
            35,
            33,
            32
          ],
          "edges": [
            18,
            15,
            17
          ],
          "cycle": [
            "佐久间",
            "闪堂",
            "名雪"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 28,
          "sum": 65,
          "bases": [
            30,
            33,
            28,
            30
          ],
          "edges": [
            18,
            15,
            15,
            17
          ],
          "cycle": [
            "佐久间",
            "闪堂",
            "毒岛",
            "名雪"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 25,
          "sum": 83,
          "bases": [
            30,
            28,
            28,
            31,
            25
          ],
          "edges": [
            18,
            15,
            17,
            17,
            16
          ],
          "cycle": [
            "佐久间",
            "闪堂",
            "毒岛",
            "皆川",
            "和泉"
          ]
        }
      }
    },
    {
      "character": "先斗",
      "bestCycleSize": 5,
      "bestCycle": [
        "先斗",
        "希雅",
        "野上",
        "毒岛",
        "洺瑶"
      ],
      "minEdge": 15,
      "minBase": 27,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        28,
        27,
        33,
        28,
        28
      ],
      "sum": 83,
      "bySize": {
        "3": {
          "minEdge": 15,
          "minBase": 30,
          "sum": 48,
          "bases": [
            30,
            33,
            33
          ],
          "edges": [
            15,
            18,
            15
          ],
          "cycle": [
            "先斗",
            "洺瑶",
            "羽田"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 22,
          "sum": 65,
          "bases": [
            30,
            22,
            33,
            24
          ],
          "edges": [
            15,
            18,
            17,
            15
          ],
          "cycle": [
            "先斗",
            "洺瑶",
            "羽田",
            "千圣"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 27,
          "sum": 83,
          "bases": [
            28,
            27,
            33,
            28,
            28
          ],
          "edges": [
            17,
            20,
            15,
            16,
            15
          ],
          "cycle": [
            "先斗",
            "希雅",
            "野上",
            "毒岛",
            "洺瑶"
          ]
        }
      }
    },
    {
      "character": "闪堂",
      "bestCycleSize": 5,
      "bestCycle": [
        "闪堂",
        "佐久间",
        "名雪",
        "羽田",
        "先斗"
      ],
      "minEdge": 15,
      "minBase": 20,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        30,
        20,
        32,
        23,
        25
      ],
      "sum": 81,
      "bySize": {
        "3": {
          "minEdge": 15,
          "minBase": 32,
          "sum": 50,
          "bases": [
            33,
            35,
            32
          ],
          "edges": [
            18,
            17,
            15
          ],
          "cycle": [
            "闪堂",
            "佐久间",
            "名雪"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 23,
          "sum": 66,
          "bases": [
            30,
            25,
            32,
            23
          ],
          "edges": [
            18,
            17,
            16,
            15
          ],
          "cycle": [
            "闪堂",
            "佐久间",
            "名雪",
            "羽田"
          ]
        },
        "5": {
          "minEdge": 15,
          "minBase": 20,
          "sum": 81,
          "bases": [
            30,
            20,
            32,
            23,
            25
          ],
          "edges": [
            18,
            17,
            16,
            15,
            15
          ],
          "cycle": [
            "闪堂",
            "佐久间",
            "名雪",
            "羽田",
            "先斗"
          ]
        }
      }
    },
    {
      "character": "近江",
      "bestCycleSize": 4,
      "bestCycle": [
        "近江",
        "早濑",
        "藤松",
        "和泉"
      ],
      "minEdge": 15,
      "minBase": 22,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        29,
        26,
        25,
        22
      ],
      "sum": 70,
      "bySize": {
        "3": {
          "minEdge": 14,
          "minBase": 34,
          "sum": 54,
          "bases": [
            40,
            34,
            34
          ],
          "edges": [
            20,
            14,
            20
          ],
          "cycle": [
            "近江",
            "龙宫寺",
            "早濑"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 22,
          "sum": 70,
          "bases": [
            29,
            26,
            25,
            22
          ],
          "edges": [
            20,
            15,
            16,
            19
          ],
          "cycle": [
            "近江",
            "早濑",
            "藤松",
            "和泉"
          ]
        },
        "5": {
          "minEdge": 14,
          "minBase": 22,
          "sum": 84,
          "bases": [
            29,
            32,
            34,
            26,
            22
          ],
          "edges": [
            20,
            14,
            15,
            16,
            19
          ],
          "cycle": [
            "近江",
            "龙宫寺",
            "早濑",
            "藤松",
            "和泉"
          ]
        }
      }
    },
    {
      "character": "羽濑川",
      "bestCycleSize": 4,
      "bestCycle": [
        "羽濑川",
        "真崎",
        "千圣",
        "降旗"
      ],
      "minEdge": 15,
      "minBase": 20,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        29,
        21,
        29,
        20
      ],
      "sum": 67,
      "bySize": {
        "3": {
          "minEdge": 15,
          "minBase": 30,
          "sum": 45,
          "bases": [
            30,
            30,
            30
          ],
          "edges": [
            15,
            15,
            15
          ],
          "cycle": [
            "羽濑川",
            "稻叶",
            "春澄"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 20,
          "sum": 67,
          "bases": [
            29,
            21,
            29,
            20
          ],
          "edges": [
            19,
            15,
            18,
            15
          ],
          "cycle": [
            "羽濑川",
            "真崎",
            "千圣",
            "降旗"
          ]
        },
        "5": {
          "minEdge": 14,
          "minBase": 20,
          "sum": 77,
          "bases": [
            28,
            34,
            27,
            25,
            20
          ],
          "edges": [
            19,
            14,
            16,
            14,
            14
          ],
          "cycle": [
            "羽濑川",
            "真崎",
            "近江",
            "名雪",
            "千圣"
          ]
        }
      }
    },
    {
      "character": "林原",
      "bestCycleSize": 4,
      "bestCycle": [
        "林原",
        "佐久间",
        "和泉",
        "藤松"
      ],
      "minEdge": 15,
      "minBase": 29,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        29,
        30,
        30,
        29
      ],
      "sum": 64,
      "bySize": {
        "3": {
          "minEdge": 14,
          "minBase": 30,
          "sum": 47,
          "bases": [
            31,
            33,
            30
          ],
          "edges": [
            17,
            16,
            14
          ],
          "cycle": [
            "林原",
            "佐久间",
            "和泉"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 29,
          "sum": 64,
          "bases": [
            29,
            30,
            30,
            29
          ],
          "edges": [
            17,
            16,
            16,
            15
          ],
          "cycle": [
            "林原",
            "佐久间",
            "和泉",
            "藤松"
          ]
        },
        "5": {
          "minEdge": 14,
          "minBase": 23,
          "sum": 76,
          "bases": [
            25,
            31,
            27,
            24,
            23
          ],
          "edges": [
            15,
            14,
            14,
            19,
            14
          ],
          "cycle": [
            "林原",
            "藤松",
            "真崎",
            "近江",
            "和泉"
          ]
        }
      }
    },
    {
      "character": "榎本",
      "bestCycleSize": 4,
      "bestCycle": [
        "榎本",
        "藤松",
        "和泉",
        "清水"
      ],
      "minEdge": 15,
      "minBase": 27,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        29,
        27,
        30,
        27
      ],
      "sum": 61,
      "bySize": {
        "3": {
          "minEdge": 14,
          "minBase": 28,
          "sum": 46,
          "bases": [
            28,
            32,
            32
          ],
          "edges": [
            14,
            18,
            14
          ],
          "cycle": [
            "榎本",
            "野上",
            "白神"
          ]
        },
        "4": {
          "minEdge": 15,
          "minBase": 27,
          "sum": 61,
          "bases": [
            29,
            27,
            30,
            27
          ],
          "edges": [
            15,
            16,
            15,
            15
          ],
          "cycle": [
            "榎本",
            "藤松",
            "和泉",
            "清水"
          ]
        },
        "5": {
          "minEdge": 13,
          "minBase": 20,
          "sum": 77,
          "bases": [
            26,
            24,
            32,
            20,
            31
          ],
          "edges": [
            14,
            18,
            13,
            19,
            13
          ],
          "cycle": [
            "榎本",
            "野上",
            "白神",
            "绿川",
            "亚理纱"
          ]
        }
      }
    },
    {
      "character": "藤松",
      "bestCycleSize": 3,
      "bestCycle": [
        "藤松",
        "早濑",
        "美星"
      ],
      "minEdge": 15,
      "minBase": 30,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        30,
        33,
        33
      ],
      "sum": 48,
      "bySize": {
        "3": {
          "minEdge": 15,
          "minBase": 30,
          "sum": 48,
          "bases": [
            30,
            33,
            33
          ],
          "edges": [
            15,
            18,
            15
          ],
          "cycle": [
            "藤松",
            "早濑",
            "美星"
          ]
        },
        "4": {
          "minEdge": 14,
          "minBase": 17,
          "sum": 63,
          "bases": [
            29,
            17,
            33,
            18
          ],
          "edges": [
            15,
            18,
            16,
            14
          ],
          "cycle": [
            "藤松",
            "美星",
            "早濑",
            "羽田"
          ]
        },
        "5": {
          "minEdge": 14,
          "minBase": 18,
          "sum": 80,
          "bases": [
            28,
            24,
            33,
            18,
            28
          ],
          "edges": [
            15,
            18,
            16,
            17,
            14
          ],
          "cycle": [
            "藤松",
            "美星",
            "早濑",
            "羽田",
            "望月"
          ]
        }
      }
    },
    {
      "character": "和泉",
      "bestCycleSize": 3,
      "bestCycle": [
        "和泉",
        "森田",
        "美伽"
      ],
      "minEdge": 15,
      "minBase": 30,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        30,
        32,
        32
      ],
      "sum": 47,
      "bySize": {
        "3": {
          "minEdge": 15,
          "minBase": 30,
          "sum": 47,
          "bases": [
            30,
            32,
            32
          ],
          "edges": [
            15,
            17,
            15
          ],
          "cycle": [
            "和泉",
            "森田",
            "美伽"
          ]
        },
        "4": {
          "minEdge": 13,
          "minBase": 26,
          "sum": 62,
          "bases": [
            31,
            33,
            30,
            26
          ],
          "edges": [
            20,
            14,
            13,
            15
          ],
          "cycle": [
            "和泉",
            "远野",
            "希雅",
            "清水"
          ]
        },
        "5": {
          "minEdge": 12,
          "minBase": 14,
          "sum": 76,
          "bases": [
            33,
            31,
            28,
            14,
            22
          ],
          "edges": [
            20,
            13,
            12,
            14,
            17
          ],
          "cycle": [
            "和泉",
            "远野",
            "清水",
            "佐久间",
            "皆川"
          ]
        }
      }
    },
    {
      "character": "真崎",
      "bestCycleSize": 3,
      "bestCycle": [
        "真崎",
        "望月",
        "绿川"
      ],
      "minEdge": 15,
      "minBase": 30,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        30,
        31,
        31
      ],
      "sum": 46,
      "bySize": {
        "3": {
          "minEdge": 15,
          "minBase": 30,
          "sum": 46,
          "bases": [
            30,
            31,
            31
          ],
          "edges": [
            15,
            16,
            15
          ],
          "cycle": [
            "真崎",
            "望月",
            "绿川"
          ]
        },
        "4": {
          "minEdge": 14,
          "minBase": 23,
          "sum": 62,
          "bases": [
            30,
            28,
            29,
            23
          ],
          "edges": [
            19,
            14,
            14,
            15
          ],
          "cycle": [
            "真崎",
            "羽濑川",
            "千圣",
            "绿川"
          ]
        },
        "5": {
          "minEdge": 14,
          "minBase": 21,
          "sum": 78,
          "bases": [
            30,
            21,
            29,
            23,
            22
          ],
          "edges": [
            19,
            14,
            14,
            16,
            15
          ],
          "cycle": [
            "真崎",
            "羽濑川",
            "千圣",
            "绿川",
            "望月"
          ]
        }
      }
    },
    {
      "character": "春澄",
      "bestCycleSize": 3,
      "bestCycle": [
        "春澄",
        "稻叶",
        "羽濑川"
      ],
      "minEdge": 15,
      "minBase": 30,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        30,
        30,
        30
      ],
      "sum": 45,
      "bySize": {
        "3": {
          "minEdge": 15,
          "minBase": 30,
          "sum": 45,
          "bases": [
            30,
            30,
            30
          ],
          "edges": [
            15,
            15,
            15
          ],
          "cycle": [
            "春澄",
            "稻叶",
            "羽濑川"
          ]
        },
        "4": {
          "minEdge": 14,
          "minBase": 24,
          "sum": 61,
          "bases": [
            30,
            26,
            29,
            24
          ],
          "edges": [
            17,
            14,
            15,
            15
          ],
          "cycle": [
            "春澄",
            "克拉丽丝",
            "稻叶",
            "羽濑川"
          ]
        },
        "5": {
          "minEdge": 13,
          "minBase": 16,
          "sum": 79,
          "bases": [
            26,
            31,
            31,
            16,
            25
          ],
          "edges": [
            17,
            18,
            14,
            17,
            13
          ],
          "cycle": [
            "春澄",
            "克拉丽丝",
            "龙宫寺",
            "白神",
            "希雅"
          ]
        }
      }
    },
    {
      "character": "远野",
      "bestCycleSize": 5,
      "bestCycle": [
        "远野",
        "和泉",
        "清水",
        "羽濑川",
        "真崎"
      ],
      "minEdge": 14,
      "minBase": 22,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        27,
        24,
        28,
        22,
        22
      ],
      "sum": 84,
      "bySize": {
        "3": {
          "minEdge": 14,
          "minBase": 30,
          "sum": 50,
          "bases": [
            34,
            36,
            30
          ],
          "edges": [
            20,
            16,
            14
          ],
          "cycle": [
            "远野",
            "和泉",
            "希雅"
          ]
        },
        "4": {
          "minEdge": 14,
          "minBase": 26,
          "sum": 67,
          "bases": [
            28,
            29,
            30,
            26
          ],
          "edges": [
            20,
            16,
            17,
            14
          ],
          "cycle": [
            "远野",
            "和泉",
            "希雅",
            "先斗"
          ]
        },
        "5": {
          "minEdge": 14,
          "minBase": 22,
          "sum": 84,
          "bases": [
            27,
            24,
            28,
            22,
            22
          ],
          "edges": [
            20,
            15,
            16,
            19,
            14
          ],
          "cycle": [
            "远野",
            "和泉",
            "清水",
            "羽濑川",
            "真崎"
          ]
        }
      }
    },
    {
      "character": "雨森",
      "bestCycleSize": 5,
      "bestCycle": [
        "雨森",
        "清水",
        "和泉",
        "希雅",
        "闪堂"
      ],
      "minEdge": 14,
      "minBase": 25,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        26,
        29,
        28,
        29,
        25
      ],
      "sum": 79,
      "bySize": {
        "3": {
          "minEdge": 13,
          "minBase": 28,
          "sum": 47,
          "bases": [
            32,
            34,
            28
          ],
          "edges": [
            19,
            15,
            13
          ],
          "cycle": [
            "雨森",
            "清水",
            "和泉"
          ]
        },
        "4": {
          "minEdge": 13,
          "minBase": 25,
          "sum": 65,
          "bases": [
            25,
            34,
            25,
            35
          ],
          "edges": [
            19,
            13,
            20,
            13
          ],
          "cycle": [
            "雨森",
            "清水",
            "远野",
            "和泉"
          ]
        },
        "5": {
          "minEdge": 14,
          "minBase": 25,
          "sum": 79,
          "bases": [
            26,
            29,
            28,
            29,
            25
          ],
          "edges": [
            19,
            15,
            16,
            15,
            14
          ],
          "cycle": [
            "雨森",
            "清水",
            "和泉",
            "希雅",
            "闪堂"
          ]
        }
      }
    },
    {
      "character": "亚理纱",
      "bestCycleSize": 3,
      "bestCycle": [
        "亚理纱",
        "绿川",
        "稻叶"
      ],
      "minEdge": 14,
      "minBase": 31,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        33,
        36,
        31
      ],
      "sum": 50,
      "bySize": {
        "3": {
          "minEdge": 14,
          "minBase": 31,
          "sum": 50,
          "bases": [
            33,
            36,
            31
          ],
          "edges": [
            19,
            17,
            14
          ],
          "cycle": [
            "亚理纱",
            "绿川",
            "稻叶"
          ]
        },
        "4": {
          "minEdge": 13,
          "minBase": 21,
          "sum": 66,
          "bases": [
            31,
            27,
            31,
            21
          ],
          "edges": [
            19,
            17,
            13,
            17
          ],
          "cycle": [
            "亚理纱",
            "绿川",
            "稻叶",
            "早濑"
          ]
        },
        "5": {
          "minEdge": 13,
          "minBase": 21,
          "sum": 82,
          "bases": [
            31,
            25,
            31,
            21,
            28
          ],
          "edges": [
            19,
            17,
            13,
            19,
            14
          ],
          "cycle": [
            "亚理纱",
            "绿川",
            "稻叶",
            "早濑",
            "毒岛"
          ]
        }
      }
    },
    {
      "character": "卧云",
      "bestCycleSize": 3,
      "bestCycle": [
        "卧云",
        "望月",
        "绿川"
      ],
      "minEdge": 14,
      "minBase": 28,
      "allCanReach45WithDouble2Star": false,
      "bases": [
        28,
        30,
        30
      ],
      "sum": 44,
      "bySize": {
        "3": {
          "minEdge": 14,
          "minBase": 28,
          "sum": 44,
          "bases": [
            28,
            30,
            30
          ],
          "edges": [
            14,
            16,
            14
          ],
          "cycle": [
            "卧云",
            "望月",
            "绿川"
          ]
        },
        "4": {
          "minEdge": 13,
          "minBase": 20,
          "sum": 59,
          "bases": [
            25,
            24,
            26,
            20
          ],
          "edges": [
            17,
            15,
            13,
            14
          ],
          "cycle": [
            "卧云",
            "先斗",
            "洺瑶",
            "望月"
          ]
        },
        "5": {
          "minEdge": 13,
          "minBase": 20,
          "sum": 75,
          "bases": [
            28,
            27,
            26,
            20,
            26
          ],
          "edges": [
            17,
            15,
            13,
            16,
            14
          ],
          "cycle": [
            "卧云",
            "先斗",
            "洺瑶",
            "望月",
            "绿川"
          ]
        }
      }
    }
  ],
  "cyclesMeta": {
    "generated": "2026-11-05",
    "source": "note_harmony_matrix.json（社区）",
    "rule": "循环互带：X_i 训练带 X_{i+1},X_{i+2} 笔记；X_i 使用 X_{i-1},X_{i-2} 笔记；base = 与后二者关系分之和；目标：min edge 高（防污染）+ 全员 base>=35（双2★可极）",
    "note": "bestCycleSize=推荐循环人数；bySize 含 3/4/5 人环备选"
  },
  "matrix": {
    "1001": {
      "1001": 0,
      "1002": 12,
      "1003": 9,
      "1004": 12,
      "1005": 2,
      "1006": 18,
      "1007": 12,
      "1008": 9,
      "1009": 6,
      "1010": 9,
      "1011": 17,
      "1012": 14,
      "1013": 15,
      "1014": 8,
      "1015": 13,
      "1016": 7,
      "1017": 12,
      "1018": 10,
      "1019": 10,
      "1020": 15,
      "1021": 4,
      "1022": 9,
      "1023": 6,
      "1024": 10,
      "1025": 13,
      "1026": 16,
      "1027": 12,
      "1028": 15,
      "1029": 6,
      "1030": 10,
      "1031": 14,
      "1032": 14,
      "1033": 1,
      "1034": 1,
      "1035": 7,
      "1036": 13,
      "1037": 12,
      "1038": 18,
      "1039": 1,
      "1040": 3,
      "1041": 14,
      "1042": 10,
      "1043": 7,
      "1044": 20,
      "1045": 13,
      "1046": 7,
      "1047": 8,
      "1999": 0
    },
    "1002": {
      "1001": 12,
      "1002": 0,
      "1003": 20,
      "1004": 12,
      "1005": 11,
      "1006": 10,
      "1007": 17,
      "1008": 7,
      "1009": 18,
      "1010": 14,
      "1011": 10,
      "1012": 6,
      "1013": 10,
      "1014": 11,
      "1015": 3,
      "1016": 7,
      "1017": 6,
      "1018": 3,
      "1019": 9,
      "1020": 13,
      "1021": 6,
      "1022": 9,
      "1023": 1,
      "1024": 6,
      "1025": 13,
      "1026": 10,
      "1027": 8,
      "1028": 8,
      "1029": 6,
      "1030": 14,
      "1031": 19,
      "1032": 9,
      "1033": 7,
      "1034": 7,
      "1035": 12,
      "1036": 3,
      "1037": 3,
      "1038": 6,
      "1039": 9,
      "1040": 20,
      "1041": 2,
      "1042": 8,
      "1043": 12,
      "1044": 9,
      "1045": 14,
      "1046": 8,
      "1047": 10,
      "1999": 0
    },
    "1003": {
      "1001": 9,
      "1002": 20,
      "1003": 0,
      "1004": 19,
      "1005": 13,
      "1006": 7,
      "1007": 6,
      "1008": 14,
      "1009": 8,
      "1010": 20,
      "1011": 6,
      "1012": 9,
      "1013": 1,
      "1014": 10,
      "1015": 9,
      "1016": 6,
      "1017": 9,
      "1018": 9,
      "1019": 16,
      "1020": 10,
      "1021": 6,
      "1022": 8,
      "1023": 1,
      "1024": 9,
      "1025": 9,
      "1026": 9,
      "1027": 10,
      "1028": 7,
      "1029": 13,
      "1030": 14,
      "1031": 12,
      "1032": 10,
      "1033": 10,
      "1034": 15,
      "1035": 9,
      "1036": 2,
      "1037": 10,
      "1038": 8,
      "1039": 11,
      "1040": 10,
      "1041": 3,
      "1042": 6,
      "1043": 11,
      "1044": 10,
      "1045": 14,
      "1046": 9,
      "1047": 6,
      "1999": 0
    },
    "1004": {
      "1001": 12,
      "1002": 12,
      "1003": 19,
      "1004": 0,
      "1005": 5,
      "1006": 14,
      "1007": 10,
      "1008": 10,
      "1009": 13,
      "1010": 6,
      "1011": 13,
      "1012": 12,
      "1013": 7,
      "1014": 16,
      "1015": 9,
      "1016": 13,
      "1017": 17,
      "1018": 8,
      "1019": 13,
      "1020": 16,
      "1021": 3,
      "1022": 10,
      "1023": 15,
      "1024": 14,
      "1025": 11,
      "1026": 15,
      "1027": 15,
      "1028": 11,
      "1029": 6,
      "1030": 4,
      "1031": 19,
      "1032": 9,
      "1033": 8,
      "1034": 8,
      "1035": 8,
      "1036": 17,
      "1037": 8,
      "1038": 14,
      "1039": 14,
      "1040": 7,
      "1041": 11,
      "1042": 20,
      "1043": 2,
      "1044": 10,
      "1045": 1,
      "1046": 16,
      "1047": 18,
      "1999": 0
    },
    "1005": {
      "1001": 2,
      "1002": 11,
      "1003": 13,
      "1004": 5,
      "1005": 0,
      "1006": 7,
      "1007": 8,
      "1008": 5,
      "1009": 9,
      "1010": 17,
      "1011": 1,
      "1012": 2,
      "1013": 13,
      "1014": 6,
      "1015": 19,
      "1016": 9,
      "1017": 5,
      "1018": 14,
      "1019": 8,
      "1020": 12,
      "1021": 1,
      "1022": 14,
      "1023": 4,
      "1024": 13,
      "1025": 6,
      "1026": 12,
      "1027": 13,
      "1028": 15,
      "1029": 9,
      "1030": 11,
      "1031": 10,
      "1032": 6,
      "1033": 6,
      "1034": 9,
      "1035": 12,
      "1036": 4,
      "1037": 10,
      "1038": 6,
      "1039": 9,
      "1040": 9,
      "1041": 3,
      "1042": 2,
      "1043": 9,
      "1044": 8,
      "1045": 12,
      "1046": 8,
      "1047": 5,
      "1999": 0
    },
    "1006": {
      "1001": 18,
      "1002": 10,
      "1003": 7,
      "1004": 14,
      "1005": 7,
      "1006": 0,
      "1007": 9,
      "1008": 16,
      "1009": 16,
      "1010": 14,
      "1011": 18,
      "1012": 13,
      "1013": 9,
      "1014": 10,
      "1015": 10,
      "1016": 10,
      "1017": 11,
      "1018": 16,
      "1019": 16,
      "1020": 8,
      "1021": 7,
      "1022": 20,
      "1023": 8,
      "1024": 14,
      "1025": 11,
      "1026": 8,
      "1027": 7,
      "1028": 10,
      "1029": 6,
      "1030": 12,
      "1031": 14,
      "1032": 15,
      "1033": 11,
      "1034": 12,
      "1035": 8,
      "1036": 6,
      "1037": 12,
      "1038": 15,
      "1039": 11,
      "1040": 13,
      "1041": 5,
      "1042": 8,
      "1043": 17,
      "1044": 8,
      "1045": 12,
      "1046": 10,
      "1047": 7,
      "1999": 0
    },
    "1007": {
      "1001": 12,
      "1002": 17,
      "1003": 6,
      "1004": 10,
      "1005": 8,
      "1006": 9,
      "1007": 0,
      "1008": 7,
      "1009": 9,
      "1010": 6,
      "1011": 15,
      "1012": 12,
      "1013": 14,
      "1014": 9,
      "1015": 1,
      "1016": 14,
      "1017": 14,
      "1018": 15,
      "1019": 15,
      "1020": 18,
      "1021": 12,
      "1022": 9,
      "1023": 10,
      "1024": 15,
      "1025": 11,
      "1026": 8,
      "1027": 8,
      "1028": 6,
      "1029": 9,
      "1030": 12,
      "1031": 10,
      "1032": 15,
      "1033": 9,
      "1034": 17,
      "1035": 8,
      "1036": 17,
      "1037": 6,
      "1038": 7,
      "1039": 8,
      "1040": 6,
      "1041": 7,
      "1042": 8,
      "1043": 8,
      "1044": 6,
      "1045": 13,
      "1046": 15,
      "1047": 9,
      "1999": 0
    },
    "1008": {
      "1001": 9,
      "1002": 7,
      "1003": 14,
      "1004": 10,
      "1005": 5,
      "1006": 16,
      "1007": 7,
      "1008": 0,
      "1009": 13,
      "1010": 14,
      "1011": 9,
      "1012": 20,
      "1013": 2,
      "1014": 9,
      "1015": 17,
      "1016": 9,
      "1017": 11,
      "1018": 14,
      "1019": 15,
      "1020": 11,
      "1021": 9,
      "1022": 2,
      "1023": 19,
      "1024": 11,
      "1025": 14,
      "1026": 14,
      "1027": 11,
      "1028": 15,
      "1029": 1,
      "1030": 8,
      "1031": 10,
      "1032": 9,
      "1033": 12,
      "1034": 14,
      "1035": 13,
      "1036": 8,
      "1037": 7,
      "1038": 13,
      "1039": 7,
      "1040": 14,
      "1041": 8,
      "1042": 13,
      "1043": 8,
      "1044": 8,
      "1045": 10,
      "1046": 20,
      "1047": 15,
      "1999": 0
    },
    "1009": {
      "1001": 6,
      "1002": 18,
      "1003": 8,
      "1004": 13,
      "1005": 9,
      "1006": 16,
      "1007": 9,
      "1008": 13,
      "1009": 0,
      "1010": 18,
      "1011": 2,
      "1012": 9,
      "1013": 9,
      "1014": 6,
      "1015": 7,
      "1016": 6,
      "1017": 11,
      "1018": 19,
      "1019": 15,
      "1020": 9,
      "1021": 10,
      "1022": 14,
      "1023": 10,
      "1024": 10,
      "1025": 17,
      "1026": 7,
      "1027": 10,
      "1028": 7,
      "1029": 9,
      "1030": 8,
      "1031": 8,
      "1032": 5,
      "1033": 4,
      "1034": 15,
      "1035": 6,
      "1036": 12,
      "1037": 10,
      "1038": 1,
      "1039": 6,
      "1040": 14,
      "1041": 12,
      "1042": 13,
      "1043": 3,
      "1044": 15,
      "1045": 2,
      "1046": 14,
      "1047": 13,
      "1999": 0
    },
    "1010": {
      "1001": 9,
      "1002": 14,
      "1003": 20,
      "1004": 6,
      "1005": 17,
      "1006": 14,
      "1007": 6,
      "1008": 14,
      "1009": 18,
      "1010": 0,
      "1011": 16,
      "1012": 11,
      "1013": 20,
      "1014": 15,
      "1015": 8,
      "1016": 5,
      "1017": 7,
      "1018": 19,
      "1019": 10,
      "1020": 10,
      "1021": 15,
      "1022": 13,
      "1023": 20,
      "1024": 10,
      "1025": 8,
      "1026": 6,
      "1027": 9,
      "1028": 6,
      "1029": 1,
      "1030": 11,
      "1031": 14,
      "1032": 7,
      "1033": 6,
      "1034": 8,
      "1035": 6,
      "1036": 9,
      "1037": 5,
      "1038": 6,
      "1039": 6,
      "1040": 18,
      "1041": 2,
      "1042": 10,
      "1043": 14,
      "1044": 2,
      "1045": 8,
      "1046": 8,
      "1047": 9,
      "1999": 0
    },
    "1011": {
      "1001": 17,
      "1002": 10,
      "1003": 6,
      "1004": 13,
      "1005": 1,
      "1006": 18,
      "1007": 15,
      "1008": 9,
      "1009": 2,
      "1010": 16,
      "1011": 0,
      "1012": 17,
      "1013": 13,
      "1014": 14,
      "1015": 4,
      "1016": 8,
      "1017": 11,
      "1018": 10,
      "1019": 16,
      "1020": 7,
      "1021": 17,
      "1022": 8,
      "1023": 13,
      "1024": 8,
      "1025": 7,
      "1026": 7,
      "1027": 8,
      "1028": 6,
      "1029": 7,
      "1030": 10,
      "1031": 6,
      "1032": 15,
      "1033": 4,
      "1034": 18,
      "1035": 2,
      "1036": 13,
      "1037": 12,
      "1038": 11,
      "1039": 4,
      "1040": 2,
      "1041": 7,
      "1042": 13,
      "1043": 6,
      "1044": 5,
      "1045": 6,
      "1046": 10,
      "1047": 14,
      "1999": 0
    },
    "1012": {
      "1001": 14,
      "1002": 6,
      "1003": 9,
      "1004": 12,
      "1005": 2,
      "1006": 13,
      "1007": 12,
      "1008": 20,
      "1009": 9,
      "1010": 11,
      "1011": 17,
      "1012": 0,
      "1013": 10,
      "1014": 14,
      "1015": 16,
      "1016": 10,
      "1017": 6,
      "1018": 8,
      "1019": 15,
      "1020": 6,
      "1021": 6,
      "1022": 19,
      "1023": 10,
      "1024": 9,
      "1025": 6,
      "1026": 7,
      "1027": 9,
      "1028": 7,
      "1029": 2,
      "1030": 15,
      "1031": 11,
      "1032": 7,
      "1033": 14,
      "1034": 8,
      "1035": 6,
      "1036": 7,
      "1037": 11,
      "1038": 12,
      "1039": 6,
      "1040": 9,
      "1041": 1,
      "1042": 8,
      "1043": 16,
      "1044": 14,
      "1045": 6,
      "1046": 8,
      "1047": 6,
      "1999": 0
    },
    "1013": {
      "1001": 15,
      "1002": 10,
      "1003": 1,
      "1004": 7,
      "1005": 13,
      "1006": 9,
      "1007": 14,
      "1008": 2,
      "1009": 9,
      "1010": 20,
      "1011": 13,
      "1012": 10,
      "1013": 0,
      "1014": 14,
      "1015": 12,
      "1016": 6,
      "1017": 7,
      "1018": 10,
      "1019": 19,
      "1020": 6,
      "1021": 7,
      "1022": 18,
      "1023": 1,
      "1024": 18,
      "1025": 9,
      "1026": 7,
      "1027": 10,
      "1028": 10,
      "1029": 9,
      "1030": 14,
      "1031": 18,
      "1032": 14,
      "1033": 7,
      "1034": 9,
      "1035": 7,
      "1036": 20,
      "1037": 12,
      "1038": 12,
      "1039": 9,
      "1040": 6,
      "1041": 14,
      "1042": 15,
      "1043": 15,
      "1044": 13,
      "1045": 14,
      "1046": 13,
      "1047": 15,
      "1999": 0
    },
    "1014": {
      "1001": 8,
      "1002": 11,
      "1003": 10,
      "1004": 16,
      "1005": 6,
      "1006": 10,
      "1007": 9,
      "1008": 9,
      "1009": 6,
      "1010": 15,
      "1011": 14,
      "1012": 14,
      "1013": 14,
      "1014": 0,
      "1015": 13,
      "1016": 13,
      "1017": 8,
      "1018": 10,
      "1019": 9,
      "1020": 13,
      "1021": 9,
      "1022": 11,
      "1023": 12,
      "1024": 15,
      "1025": 14,
      "1026": 6,
      "1027": 6,
      "1028": 7,
      "1029": 3,
      "1030": 14,
      "1031": 14,
      "1032": 7,
      "1033": 3,
      "1034": 7,
      "1035": 20,
      "1036": 8,
      "1037": 10,
      "1038": 4,
      "1039": 15,
      "1040": 15,
      "1041": 10,
      "1042": 9,
      "1043": 12,
      "1044": 10,
      "1045": 12,
      "1046": 12,
      "1047": 9,
      "1999": 0
    },
    "1015": {
      "1001": 13,
      "1002": 3,
      "1003": 9,
      "1004": 9,
      "1005": 19,
      "1006": 10,
      "1007": 1,
      "1008": 17,
      "1009": 7,
      "1010": 8,
      "1011": 4,
      "1012": 16,
      "1013": 12,
      "1014": 13,
      "1015": 0,
      "1016": 7,
      "1017": 13,
      "1018": 6,
      "1019": 6,
      "1020": 10,
      "1021": 14,
      "1022": 17,
      "1023": 15,
      "1024": 13,
      "1025": 6,
      "1026": 7,
      "1027": 9,
      "1028": 7,
      "1029": 9,
      "1030": 15,
      "1031": 19,
      "1032": 10,
      "1033": 14,
      "1034": 14,
      "1035": 7,
      "1036": 2,
      "1037": 7,
      "1038": 6,
      "1039": 9,
      "1040": 16,
      "1041": 9,
      "1042": 1,
      "1043": 15,
      "1044": 15,
      "1045": 13,
      "1046": 10,
      "1047": 4,
      "1999": 0
    },
    "1016": {
      "1001": 7,
      "1002": 7,
      "1003": 6,
      "1004": 13,
      "1005": 9,
      "1006": 10,
      "1007": 14,
      "1008": 9,
      "1009": 6,
      "1010": 5,
      "1011": 8,
      "1012": 10,
      "1013": 6,
      "1014": 13,
      "1015": 7,
      "1016": 0,
      "1017": 7,
      "1018": 6,
      "1019": 9,
      "1020": 7,
      "1021": 10,
      "1022": 2,
      "1023": 19,
      "1024": 6,
      "1025": 6,
      "1026": 7,
      "1027": 6,
      "1028": 6,
      "1029": 9,
      "1030": 8,
      "1031": 7,
      "1032": 3,
      "1033": 16,
      "1034": 11,
      "1035": 15,
      "1036": 14,
      "1037": 8,
      "1038": 9,
      "1039": 9,
      "1040": 8,
      "1041": 6,
      "1042": 12,
      "1043": 13,
      "1044": 13,
      "1045": 13,
      "1046": 12,
      "1047": 15,
      "1999": 0
    },
    "1017": {
      "1001": 12,
      "1002": 6,
      "1003": 9,
      "1004": 17,
      "1005": 5,
      "1006": 11,
      "1007": 14,
      "1008": 11,
      "1009": 11,
      "1010": 7,
      "1011": 11,
      "1012": 6,
      "1013": 7,
      "1014": 8,
      "1015": 13,
      "1016": 7,
      "1017": 0,
      "1018": 17,
      "1019": 13,
      "1020": 14,
      "1021": 12,
      "1022": 6,
      "1023": 8,
      "1024": 10,
      "1025": 14,
      "1026": 8,
      "1027": 9,
      "1028": 9,
      "1029": 13,
      "1030": 1,
      "1031": 3,
      "1032": 9,
      "1033": 4,
      "1034": 6,
      "1035": 8,
      "1036": 11,
      "1037": 13,
      "1038": 8,
      "1039": 3,
      "1040": 6,
      "1041": 15,
      "1042": 11,
      "1043": 4,
      "1044": 15,
      "1045": 5,
      "1046": 11,
      "1047": 15,
      "1999": 0
    },
    "1018": {
      "1001": 10,
      "1002": 3,
      "1003": 9,
      "1004": 8,
      "1005": 14,
      "1006": 16,
      "1007": 15,
      "1008": 14,
      "1009": 19,
      "1010": 19,
      "1011": 10,
      "1012": 8,
      "1013": 10,
      "1014": 10,
      "1015": 6,
      "1016": 6,
      "1017": 17,
      "1018": 0,
      "1019": 15,
      "1020": 13,
      "1021": 12,
      "1022": 9,
      "1023": 2,
      "1024": 9,
      "1025": 11,
      "1026": 8,
      "1027": 9,
      "1028": 9,
      "1029": 2,
      "1030": 8,
      "1031": 15,
      "1032": 13,
      "1033": 3,
      "1034": 7,
      "1035": 7,
      "1036": 9,
      "1037": 15,
      "1038": 8,
      "1039": 9,
      "1040": 7,
      "1041": 14,
      "1042": 11,
      "1043": 12,
      "1044": 13,
      "1045": 9,
      "1046": 13,
      "1047": 12,
      "1999": 0
    },
    "1019": {
      "1001": 10,
      "1002": 9,
      "1003": 16,
      "1004": 13,
      "1005": 8,
      "1006": 16,
      "1007": 15,
      "1008": 15,
      "1009": 15,
      "1010": 10,
      "1011": 16,
      "1012": 15,
      "1013": 19,
      "1014": 9,
      "1015": 6,
      "1016": 9,
      "1017": 13,
      "1018": 15,
      "1019": 0,
      "1020": 17,
      "1021": 14,
      "1022": 6,
      "1023": 10,
      "1024": 7,
      "1025": 11,
      "1026": 6,
      "1027": 10,
      "1028": 8,
      "1029": 14,
      "1030": 9,
      "1031": 7,
      "1032": 10,
      "1033": 6,
      "1034": 6,
      "1035": 11,
      "1036": 12,
      "1037": 16,
      "1038": 10,
      "1039": 8,
      "1040": 14,
      "1041": 8,
      "1042": 15,
      "1043": 8,
      "1044": 6,
      "1045": 13,
      "1046": 11,
      "1047": 12,
      "1999": 0
    },
    "1020": {
      "1001": 15,
      "1002": 13,
      "1003": 10,
      "1004": 16,
      "1005": 12,
      "1006": 8,
      "1007": 18,
      "1008": 11,
      "1009": 9,
      "1010": 10,
      "1011": 7,
      "1012": 6,
      "1013": 6,
      "1014": 13,
      "1015": 10,
      "1016": 7,
      "1017": 14,
      "1018": 13,
      "1019": 17,
      "1020": 0,
      "1021": 20,
      "1022": 10,
      "1023": 12,
      "1024": 11,
      "1025": 11,
      "1026": 6,
      "1027": 8,
      "1028": 8,
      "1029": 1,
      "1030": 12,
      "1031": 13,
      "1032": 2,
      "1033": 9,
      "1034": 13,
      "1035": 15,
      "1036": 6,
      "1037": 4,
      "1038": 2,
      "1039": 17,
      "1040": 13,
      "1041": 1,
      "1042": 2,
      "1043": 9,
      "1044": 5,
      "1045": 13,
      "1046": 9,
      "1047": 2,
      "1999": 0
    },
    "1021": {
      "1001": 4,
      "1002": 6,
      "1003": 6,
      "1004": 3,
      "1005": 1,
      "1006": 7,
      "1007": 12,
      "1008": 9,
      "1009": 10,
      "1010": 15,
      "1011": 17,
      "1012": 6,
      "1013": 7,
      "1014": 9,
      "1015": 14,
      "1016": 10,
      "1017": 12,
      "1018": 12,
      "1019": 14,
      "1020": 20,
      "1021": 0,
      "1022": 6,
      "1023": 8,
      "1024": 7,
      "1025": 6,
      "1026": 9,
      "1027": 8,
      "1028": 9,
      "1029": 14,
      "1030": 15,
      "1031": 12,
      "1032": 15,
      "1033": 2,
      "1034": 7,
      "1035": 10,
      "1036": 8,
      "1037": 9,
      "1038": 18,
      "1039": 4,
      "1040": 10,
      "1041": 15,
      "1042": 9,
      "1043": 11,
      "1044": 2,
      "1045": 11,
      "1046": 11,
      "1047": 7,
      "1999": 0
    },
    "1022": {
      "1001": 9,
      "1002": 9,
      "1003": 8,
      "1004": 10,
      "1005": 14,
      "1006": 20,
      "1007": 9,
      "1008": 2,
      "1009": 14,
      "1010": 13,
      "1011": 8,
      "1012": 19,
      "1013": 18,
      "1014": 11,
      "1015": 17,
      "1016": 2,
      "1017": 6,
      "1018": 9,
      "1019": 6,
      "1020": 10,
      "1021": 6,
      "1022": 0,
      "1023": 10,
      "1024": 9,
      "1025": 15,
      "1026": 10,
      "1027": 6,
      "1028": 7,
      "1029": 15,
      "1030": 6,
      "1031": 12,
      "1032": 7,
      "1033": 6,
      "1034": 7,
      "1035": 8,
      "1036": 6,
      "1037": 6,
      "1038": 7,
      "1039": 9,
      "1040": 8,
      "1041": 1,
      "1042": 8,
      "1043": 11,
      "1044": 13,
      "1045": 6,
      "1046": 9,
      "1047": 6,
      "1999": 0
    },
    "1023": {
      "1001": 6,
      "1002": 1,
      "1003": 1,
      "1004": 15,
      "1005": 4,
      "1006": 8,
      "1007": 10,
      "1008": 19,
      "1009": 10,
      "1010": 20,
      "1011": 13,
      "1012": 10,
      "1013": 1,
      "1014": 12,
      "1015": 15,
      "1016": 19,
      "1017": 8,
      "1018": 2,
      "1019": 10,
      "1020": 12,
      "1021": 8,
      "1022": 10,
      "1023": 0,
      "1024": 15,
      "1025": 12,
      "1026": 9,
      "1027": 10,
      "1028": 10,
      "1029": 16,
      "1030": 3,
      "1031": 7,
      "1032": 3,
      "1033": 6,
      "1034": 12,
      "1035": 13,
      "1036": 7,
      "1037": 10,
      "1038": 4,
      "1039": 8,
      "1040": 13,
      "1041": 10,
      "1042": 13,
      "1043": 3,
      "1044": 12,
      "1045": 7,
      "1046": 13,
      "1047": 13,
      "1999": 0
    },
    "1024": {
      "1001": 10,
      "1002": 6,
      "1003": 9,
      "1004": 14,
      "1005": 13,
      "1006": 14,
      "1007": 15,
      "1008": 11,
      "1009": 10,
      "1010": 10,
      "1011": 8,
      "1012": 9,
      "1013": 18,
      "1014": 15,
      "1015": 13,
      "1016": 6,
      "1017": 10,
      "1018": 9,
      "1019": 7,
      "1020": 11,
      "1021": 7,
      "1022": 9,
      "1023": 15,
      "1024": 0,
      "1025": 13,
      "1026": 6,
      "1027": 8,
      "1028": 6,
      "1029": 11,
      "1030": 12,
      "1031": 20,
      "1032": 12,
      "1033": 10,
      "1034": 7,
      "1035": 10,
      "1036": 5,
      "1037": 14,
      "1038": 11,
      "1039": 9,
      "1040": 12,
      "1041": 13,
      "1042": 9,
      "1043": 12,
      "1044": 17,
      "1045": 14,
      "1046": 9,
      "1047": 8,
      "1999": 0
    },
    "1025": {
      "1001": 13,
      "1002": 13,
      "1003": 9,
      "1004": 11,
      "1005": 6,
      "1006": 11,
      "1007": 11,
      "1008": 14,
      "1009": 17,
      "1010": 8,
      "1011": 7,
      "1012": 6,
      "1013": 9,
      "1014": 14,
      "1015": 6,
      "1016": 6,
      "1017": 14,
      "1018": 11,
      "1019": 11,
      "1020": 11,
      "1021": 6,
      "1022": 15,
      "1023": 12,
      "1024": 13,
      "1025": 0,
      "1026": 12,
      "1027": 11,
      "1028": 12,
      "1029": 15,
      "1030": 11,
      "1031": 10,
      "1032": 11,
      "1033": 7,
      "1034": 8,
      "1035": 9,
      "1036": 7,
      "1037": 10,
      "1038": 10,
      "1039": 8,
      "1040": 8,
      "1041": 10,
      "1042": 10,
      "1043": 6,
      "1044": 8,
      "1045": 13,
      "1046": 13,
      "1047": 8,
      "1999": 0
    },
    "1026": {
      "1001": 16,
      "1002": 10,
      "1003": 9,
      "1004": 15,
      "1005": 12,
      "1006": 8,
      "1007": 8,
      "1008": 14,
      "1009": 7,
      "1010": 6,
      "1011": 7,
      "1012": 7,
      "1013": 7,
      "1014": 6,
      "1015": 7,
      "1016": 7,
      "1017": 8,
      "1018": 8,
      "1019": 6,
      "1020": 6,
      "1021": 9,
      "1022": 10,
      "1023": 9,
      "1024": 6,
      "1025": 12,
      "1026": 0,
      "1027": 17,
      "1028": 20,
      "1029": 10,
      "1030": 8,
      "1031": 7,
      "1032": 7,
      "1033": 6,
      "1034": 9,
      "1035": 8,
      "1036": 8,
      "1037": 10,
      "1038": 6,
      "1039": 6,
      "1040": 9,
      "1041": 8,
      "1042": 7,
      "1043": 7,
      "1044": 9,
      "1045": 6,
      "1046": 9,
      "1047": 6,
      "1999": 0
    },
    "1027": {
      "1001": 12,
      "1002": 8,
      "1003": 10,
      "1004": 15,
      "1005": 13,
      "1006": 7,
      "1007": 8,
      "1008": 11,
      "1009": 10,
      "1010": 9,
      "1011": 8,
      "1012": 9,
      "1013": 10,
      "1014": 6,
      "1015": 9,
      "1016": 6,
      "1017": 9,
      "1018": 9,
      "1019": 10,
      "1020": 8,
      "1021": 8,
      "1022": 6,
      "1023": 10,
      "1024": 8,
      "1025": 11,
      "1026": 17,
      "1027": 0,
      "1028": 18,
      "1029": 7,
      "1030": 10,
      "1031": 10,
      "1032": 9,
      "1033": 6,
      "1034": 10,
      "1035": 7,
      "1036": 6,
      "1037": 10,
      "1038": 9,
      "1039": 9,
      "1040": 6,
      "1041": 7,
      "1042": 6,
      "1043": 10,
      "1044": 6,
      "1045": 7,
      "1046": 7,
      "1047": 8,
      "1999": 0
    },
    "1028": {
      "1001": 15,
      "1002": 8,
      "1003": 7,
      "1004": 11,
      "1005": 15,
      "1006": 10,
      "1007": 6,
      "1008": 15,
      "1009": 7,
      "1010": 6,
      "1011": 6,
      "1012": 7,
      "1013": 10,
      "1014": 7,
      "1015": 7,
      "1016": 6,
      "1017": 9,
      "1018": 9,
      "1019": 8,
      "1020": 8,
      "1021": 9,
      "1022": 7,
      "1023": 10,
      "1024": 6,
      "1025": 12,
      "1026": 20,
      "1027": 18,
      "1028": 0,
      "1029": 10,
      "1030": 8,
      "1031": 10,
      "1032": 7,
      "1033": 10,
      "1034": 10,
      "1035": 6,
      "1036": 9,
      "1037": 10,
      "1038": 8,
      "1039": 9,
      "1040": 10,
      "1041": 10,
      "1042": 10,
      "1043": 10,
      "1044": 9,
      "1045": 7,
      "1046": 7,
      "1047": 10,
      "1999": 0
    },
    "1029": {
      "1001": 6,
      "1002": 6,
      "1003": 13,
      "1004": 6,
      "1005": 9,
      "1006": 6,
      "1007": 9,
      "1008": 1,
      "1009": 9,
      "1010": 1,
      "1011": 7,
      "1012": 2,
      "1013": 9,
      "1014": 3,
      "1015": 9,
      "1016": 9,
      "1017": 13,
      "1018": 2,
      "1019": 14,
      "1020": 1,
      "1021": 14,
      "1022": 15,
      "1023": 16,
      "1024": 11,
      "1025": 15,
      "1026": 10,
      "1027": 7,
      "1028": 10,
      "1029": 0,
      "1030": 19,
      "1031": 8,
      "1032": 12,
      "1033": 4,
      "1034": 3,
      "1035": 9,
      "1036": 15,
      "1037": 7,
      "1038": 15,
      "1039": 3,
      "1040": 2,
      "1041": 13,
      "1042": 13,
      "1043": 9,
      "1044": 5,
      "1045": 7,
      "1046": 12,
      "1047": 13,
      "1999": 0
    },
    "1030": {
      "1001": 10,
      "1002": 14,
      "1003": 14,
      "1004": 4,
      "1005": 11,
      "1006": 12,
      "1007": 12,
      "1008": 8,
      "1009": 8,
      "1010": 11,
      "1011": 10,
      "1012": 15,
      "1013": 14,
      "1014": 14,
      "1015": 15,
      "1016": 8,
      "1017": 1,
      "1018": 8,
      "1019": 9,
      "1020": 12,
      "1021": 15,
      "1022": 6,
      "1023": 3,
      "1024": 12,
      "1025": 11,
      "1026": 8,
      "1027": 10,
      "1028": 8,
      "1029": 19,
      "1030": 0,
      "1031": 7,
      "1032": 4,
      "1033": 8,
      "1034": 11,
      "1035": 12,
      "1036": 13,
      "1037": 6,
      "1038": 2,
      "1039": 13,
      "1040": 12,
      "1041": 8,
      "1042": 14,
      "1043": 11,
      "1044": 15,
      "1045": 6,
      "1046": 14,
      "1047": 11,
      "1999": 0
    },
    "1031": {
      "1001": 14,
      "1002": 19,
      "1003": 12,
      "1004": 19,
      "1005": 10,
      "1006": 14,
      "1007": 10,
      "1008": 10,
      "1009": 8,
      "1010": 14,
      "1011": 6,
      "1012": 11,
      "1013": 18,
      "1014": 14,
      "1015": 19,
      "1016": 7,
      "1017": 3,
      "1018": 15,
      "1019": 7,
      "1020": 13,
      "1021": 12,
      "1022": 12,
      "1023": 7,
      "1024": 20,
      "1025": 10,
      "1026": 7,
      "1027": 10,
      "1028": 10,
      "1029": 8,
      "1030": 7,
      "1031": 0,
      "1032": 3,
      "1033": 10,
      "1034": 15,
      "1035": 17,
      "1036": 10,
      "1037": 13,
      "1038": 4,
      "1039": 6,
      "1040": 20,
      "1041": 9,
      "1042": 16,
      "1043": 18,
      "1044": 16,
      "1045": 7,
      "1046": 6,
      "1047": 11,
      "1999": 0
    },
    "1032": {
      "1001": 14,
      "1002": 9,
      "1003": 10,
      "1004": 9,
      "1005": 6,
      "1006": 15,
      "1007": 15,
      "1008": 9,
      "1009": 5,
      "1010": 7,
      "1011": 15,
      "1012": 7,
      "1013": 14,
      "1014": 7,
      "1015": 10,
      "1016": 3,
      "1017": 9,
      "1018": 13,
      "1019": 10,
      "1020": 2,
      "1021": 15,
      "1022": 7,
      "1023": 3,
      "1024": 12,
      "1025": 11,
      "1026": 7,
      "1027": 9,
      "1028": 7,
      "1029": 12,
      "1030": 4,
      "1031": 3,
      "1032": 0,
      "1033": 17,
      "1034": 2,
      "1035": 18,
      "1036": 20,
      "1037": 13,
      "1038": 7,
      "1039": 7,
      "1040": 13,
      "1041": 12,
      "1042": 14,
      "1043": 1,
      "1044": 6,
      "1045": 9,
      "1046": 17,
      "1047": 14,
      "1999": 0
    },
    "1033": {
      "1001": 1,
      "1002": 7,
      "1003": 10,
      "1004": 8,
      "1005": 6,
      "1006": 11,
      "1007": 9,
      "1008": 12,
      "1009": 4,
      "1010": 6,
      "1011": 4,
      "1012": 14,
      "1013": 7,
      "1014": 3,
      "1015": 14,
      "1016": 16,
      "1017": 4,
      "1018": 3,
      "1019": 6,
      "1020": 9,
      "1021": 2,
      "1022": 6,
      "1023": 6,
      "1024": 10,
      "1025": 7,
      "1026": 6,
      "1027": 6,
      "1028": 10,
      "1029": 4,
      "1030": 8,
      "1031": 10,
      "1032": 17,
      "1033": 0,
      "1034": 11,
      "1035": 19,
      "1036": 12,
      "1037": 6,
      "1038": 3,
      "1039": 11,
      "1040": 8,
      "1041": 3,
      "1042": 6,
      "1043": 20,
      "1044": 15,
      "1045": 10,
      "1046": 6,
      "1047": 7,
      "1999": 0
    },
    "1034": {
      "1001": 1,
      "1002": 7,
      "1003": 15,
      "1004": 8,
      "1005": 9,
      "1006": 12,
      "1007": 17,
      "1008": 14,
      "1009": 15,
      "1010": 8,
      "1011": 18,
      "1012": 8,
      "1013": 9,
      "1014": 7,
      "1015": 14,
      "1016": 11,
      "1017": 6,
      "1018": 7,
      "1019": 6,
      "1020": 13,
      "1021": 7,
      "1022": 7,
      "1023": 12,
      "1024": 7,
      "1025": 8,
      "1026": 9,
      "1027": 10,
      "1028": 10,
      "1029": 3,
      "1030": 11,
      "1031": 15,
      "1032": 2,
      "1033": 11,
      "1034": 0,
      "1035": 18,
      "1036": 16,
      "1037": 11,
      "1038": 8,
      "1039": 9,
      "1040": 14,
      "1041": 14,
      "1042": 9,
      "1043": 14,
      "1044": 15,
      "1045": 13,
      "1046": 11,
      "1047": 9,
      "1999": 0
    },
    "1035": {
      "1001": 7,
      "1002": 12,
      "1003": 9,
      "1004": 8,
      "1005": 12,
      "1006": 8,
      "1007": 8,
      "1008": 13,
      "1009": 6,
      "1010": 6,
      "1011": 2,
      "1012": 6,
      "1013": 7,
      "1014": 20,
      "1015": 7,
      "1016": 15,
      "1017": 8,
      "1018": 7,
      "1019": 11,
      "1020": 15,
      "1021": 10,
      "1022": 8,
      "1023": 13,
      "1024": 10,
      "1025": 9,
      "1026": 8,
      "1027": 7,
      "1028": 6,
      "1029": 9,
      "1030": 12,
      "1031": 17,
      "1032": 18,
      "1033": 19,
      "1034": 18,
      "1035": 0,
      "1036": 1,
      "1037": 11,
      "1038": 9,
      "1039": 9,
      "1040": 13,
      "1041": 5,
      "1042": 3,
      "1043": 15,
      "1044": 11,
      "1045": 20,
      "1046": 16,
      "1047": 4,
      "1999": 0
    },
    "1036": {
      "1001": 13,
      "1002": 3,
      "1003": 2,
      "1004": 17,
      "1005": 4,
      "1006": 6,
      "1007": 17,
      "1008": 8,
      "1009": 12,
      "1010": 9,
      "1011": 13,
      "1012": 7,
      "1013": 20,
      "1014": 8,
      "1015": 2,
      "1016": 14,
      "1017": 11,
      "1018": 9,
      "1019": 12,
      "1020": 6,
      "1021": 8,
      "1022": 6,
      "1023": 7,
      "1024": 5,
      "1025": 7,
      "1026": 8,
      "1027": 6,
      "1028": 9,
      "1029": 15,
      "1030": 13,
      "1031": 10,
      "1032": 20,
      "1033": 12,
      "1034": 16,
      "1035": 1,
      "1036": 0,
      "1037": 10,
      "1038": 13,
      "1039": 1,
      "1040": 7,
      "1041": 16,
      "1042": 8,
      "1043": 10,
      "1044": 6,
      "1045": 12,
      "1046": 3,
      "1047": 10,
      "1999": 0
    },
    "1037": {
      "1001": 12,
      "1002": 3,
      "1003": 10,
      "1004": 8,
      "1005": 10,
      "1006": 12,
      "1007": 6,
      "1008": 7,
      "1009": 10,
      "1010": 5,
      "1011": 12,
      "1012": 11,
      "1013": 12,
      "1014": 10,
      "1015": 7,
      "1016": 8,
      "1017": 13,
      "1018": 15,
      "1019": 16,
      "1020": 4,
      "1021": 9,
      "1022": 6,
      "1023": 10,
      "1024": 14,
      "1025": 10,
      "1026": 10,
      "1027": 10,
      "1028": 10,
      "1029": 7,
      "1030": 6,
      "1031": 13,
      "1032": 13,
      "1033": 6,
      "1034": 11,
      "1035": 11,
      "1036": 10,
      "1037": 0,
      "1038": 17,
      "1039": 7,
      "1040": 8,
      "1041": 15,
      "1042": 9,
      "1043": 9,
      "1044": 14,
      "1045": 18,
      "1046": 20,
      "1047": 7,
      "1999": 0
    },
    "1038": {
      "1001": 18,
      "1002": 6,
      "1003": 8,
      "1004": 14,
      "1005": 6,
      "1006": 15,
      "1007": 7,
      "1008": 13,
      "1009": 1,
      "1010": 6,
      "1011": 11,
      "1012": 12,
      "1013": 12,
      "1014": 4,
      "1015": 6,
      "1016": 9,
      "1017": 8,
      "1018": 8,
      "1019": 10,
      "1020": 2,
      "1021": 18,
      "1022": 7,
      "1023": 4,
      "1024": 11,
      "1025": 10,
      "1026": 6,
      "1027": 9,
      "1028": 8,
      "1029": 15,
      "1030": 2,
      "1031": 4,
      "1032": 7,
      "1033": 3,
      "1034": 8,
      "1035": 9,
      "1036": 13,
      "1037": 17,
      "1038": 0,
      "1039": 4,
      "1040": 10,
      "1041": 15,
      "1042": 11,
      "1043": 2,
      "1044": 9,
      "1045": 8,
      "1046": 13,
      "1047": 11,
      "1999": 0
    },
    "1039": {
      "1001": 1,
      "1002": 9,
      "1003": 11,
      "1004": 14,
      "1005": 9,
      "1006": 11,
      "1007": 8,
      "1008": 7,
      "1009": 6,
      "1010": 6,
      "1011": 4,
      "1012": 6,
      "1013": 9,
      "1014": 15,
      "1015": 9,
      "1016": 9,
      "1017": 3,
      "1018": 9,
      "1019": 8,
      "1020": 17,
      "1021": 4,
      "1022": 9,
      "1023": 8,
      "1024": 9,
      "1025": 8,
      "1026": 6,
      "1027": 9,
      "1028": 9,
      "1029": 3,
      "1030": 13,
      "1031": 6,
      "1032": 7,
      "1033": 11,
      "1034": 9,
      "1035": 9,
      "1036": 1,
      "1037": 7,
      "1038": 4,
      "1039": 0,
      "1040": 11,
      "1041": 12,
      "1042": 1,
      "1043": 13,
      "1044": 8,
      "1045": 9,
      "1046": 10,
      "1047": 5,
      "1999": 0
    },
    "1040": {
      "1001": 3,
      "1002": 20,
      "1003": 10,
      "1004": 7,
      "1005": 9,
      "1006": 13,
      "1007": 6,
      "1008": 14,
      "1009": 14,
      "1010": 18,
      "1011": 2,
      "1012": 9,
      "1013": 6,
      "1014": 15,
      "1015": 16,
      "1016": 8,
      "1017": 6,
      "1018": 7,
      "1019": 14,
      "1020": 13,
      "1021": 10,
      "1022": 8,
      "1023": 13,
      "1024": 12,
      "1025": 8,
      "1026": 9,
      "1027": 6,
      "1028": 10,
      "1029": 2,
      "1030": 12,
      "1031": 20,
      "1032": 13,
      "1033": 8,
      "1034": 14,
      "1035": 13,
      "1036": 7,
      "1037": 8,
      "1038": 10,
      "1039": 11,
      "1040": 0,
      "1041": 17,
      "1042": 8,
      "1043": 14,
      "1044": 15,
      "1045": 18,
      "1046": 15,
      "1047": 6,
      "1999": 0
    },
    "1041": {
      "1001": 14,
      "1002": 2,
      "1003": 3,
      "1004": 11,
      "1005": 3,
      "1006": 5,
      "1007": 7,
      "1008": 8,
      "1009": 12,
      "1010": 2,
      "1011": 7,
      "1012": 1,
      "1013": 14,
      "1014": 10,
      "1015": 9,
      "1016": 6,
      "1017": 15,
      "1018": 14,
      "1019": 8,
      "1020": 1,
      "1021": 15,
      "1022": 1,
      "1023": 10,
      "1024": 13,
      "1025": 10,
      "1026": 8,
      "1027": 7,
      "1028": 10,
      "1029": 13,
      "1030": 8,
      "1031": 9,
      "1032": 12,
      "1033": 3,
      "1034": 14,
      "1035": 5,
      "1036": 16,
      "1037": 15,
      "1038": 15,
      "1039": 12,
      "1040": 17,
      "1041": 0,
      "1042": 11,
      "1043": 8,
      "1044": 9,
      "1045": 14,
      "1046": 6,
      "1047": 14,
      "1999": 0
    },
    "1042": {
      "1001": 10,
      "1002": 8,
      "1003": 6,
      "1004": 20,
      "1005": 2,
      "1006": 8,
      "1007": 8,
      "1008": 13,
      "1009": 13,
      "1010": 10,
      "1011": 13,
      "1012": 8,
      "1013": 15,
      "1014": 9,
      "1015": 1,
      "1016": 12,
      "1017": 11,
      "1018": 11,
      "1019": 15,
      "1020": 2,
      "1021": 9,
      "1022": 8,
      "1023": 13,
      "1024": 9,
      "1025": 10,
      "1026": 7,
      "1027": 6,
      "1028": 10,
      "1029": 13,
      "1030": 14,
      "1031": 16,
      "1032": 14,
      "1033": 6,
      "1034": 9,
      "1035": 3,
      "1036": 8,
      "1037": 9,
      "1038": 11,
      "1039": 1,
      "1040": 8,
      "1041": 11,
      "1042": 0,
      "1043": 16,
      "1044": 14,
      "1045": 12,
      "1046": 14,
      "1047": 14,
      "1999": 0
    },
    "1043": {
      "1001": 7,
      "1002": 12,
      "1003": 11,
      "1004": 2,
      "1005": 9,
      "1006": 17,
      "1007": 8,
      "1008": 8,
      "1009": 3,
      "1010": 14,
      "1011": 6,
      "1012": 16,
      "1013": 15,
      "1014": 12,
      "1015": 15,
      "1016": 13,
      "1017": 4,
      "1018": 12,
      "1019": 8,
      "1020": 9,
      "1021": 11,
      "1022": 11,
      "1023": 3,
      "1024": 12,
      "1025": 6,
      "1026": 7,
      "1027": 10,
      "1028": 10,
      "1029": 9,
      "1030": 11,
      "1031": 18,
      "1032": 1,
      "1033": 20,
      "1034": 14,
      "1035": 15,
      "1036": 10,
      "1037": 9,
      "1038": 2,
      "1039": 13,
      "1040": 14,
      "1041": 8,
      "1042": 16,
      "1043": 0,
      "1044": 11,
      "1045": 8,
      "1046": 7,
      "1047": 14,
      "1999": 0
    },
    "1044": {
      "1001": 20,
      "1002": 9,
      "1003": 10,
      "1004": 10,
      "1005": 8,
      "1006": 8,
      "1007": 6,
      "1008": 8,
      "1009": 15,
      "1010": 2,
      "1011": 5,
      "1012": 14,
      "1013": 13,
      "1014": 10,
      "1015": 15,
      "1016": 13,
      "1017": 15,
      "1018": 13,
      "1019": 6,
      "1020": 5,
      "1021": 2,
      "1022": 13,
      "1023": 12,
      "1024": 17,
      "1025": 8,
      "1026": 9,
      "1027": 6,
      "1028": 9,
      "1029": 5,
      "1030": 15,
      "1031": 16,
      "1032": 6,
      "1033": 15,
      "1034": 15,
      "1035": 11,
      "1036": 6,
      "1037": 14,
      "1038": 9,
      "1039": 8,
      "1040": 15,
      "1041": 9,
      "1042": 14,
      "1043": 11,
      "1044": 0,
      "1045": 4,
      "1046": 15,
      "1047": 14,
      "1999": 0
    },
    "1045": {
      "1001": 13,
      "1002": 14,
      "1003": 14,
      "1004": 1,
      "1005": 12,
      "1006": 12,
      "1007": 13,
      "1008": 10,
      "1009": 2,
      "1010": 8,
      "1011": 6,
      "1012": 6,
      "1013": 14,
      "1014": 12,
      "1015": 13,
      "1016": 13,
      "1017": 5,
      "1018": 9,
      "1019": 13,
      "1020": 13,
      "1021": 11,
      "1022": 6,
      "1023": 7,
      "1024": 14,
      "1025": 13,
      "1026": 6,
      "1027": 7,
      "1028": 7,
      "1029": 7,
      "1030": 6,
      "1031": 7,
      "1032": 9,
      "1033": 10,
      "1034": 13,
      "1035": 20,
      "1036": 12,
      "1037": 18,
      "1038": 8,
      "1039": 9,
      "1040": 18,
      "1041": 14,
      "1042": 12,
      "1043": 8,
      "1044": 4,
      "1045": 0,
      "1046": 17,
      "1047": 14,
      "1999": 0
    },
    "1046": {
      "1001": 7,
      "1002": 8,
      "1003": 9,
      "1004": 16,
      "1005": 8,
      "1006": 10,
      "1007": 15,
      "1008": 20,
      "1009": 14,
      "1010": 8,
      "1011": 10,
      "1012": 8,
      "1013": 13,
      "1014": 12,
      "1015": 10,
      "1016": 12,
      "1017": 11,
      "1018": 13,
      "1019": 11,
      "1020": 9,
      "1021": 11,
      "1022": 9,
      "1023": 13,
      "1024": 9,
      "1025": 13,
      "1026": 9,
      "1027": 7,
      "1028": 7,
      "1029": 12,
      "1030": 14,
      "1031": 6,
      "1032": 17,
      "1033": 6,
      "1034": 11,
      "1035": 16,
      "1036": 3,
      "1037": 20,
      "1038": 13,
      "1039": 10,
      "1040": 15,
      "1041": 6,
      "1042": 14,
      "1043": 7,
      "1044": 15,
      "1045": 17,
      "1046": 0,
      "1047": 14,
      "1999": 0
    },
    "1047": {
      "1001": 8,
      "1002": 10,
      "1003": 6,
      "1004": 18,
      "1005": 5,
      "1006": 7,
      "1007": 9,
      "1008": 15,
      "1009": 13,
      "1010": 9,
      "1011": 14,
      "1012": 6,
      "1013": 15,
      "1014": 9,
      "1015": 4,
      "1016": 15,
      "1017": 15,
      "1018": 12,
      "1019": 12,
      "1020": 2,
      "1021": 7,
      "1022": 6,
      "1023": 13,
      "1024": 8,
      "1025": 8,
      "1026": 6,
      "1027": 8,
      "1028": 10,
      "1029": 13,
      "1030": 11,
      "1031": 11,
      "1032": 14,
      "1033": 7,
      "1034": 9,
      "1035": 4,
      "1036": 10,
      "1037": 7,
      "1038": 11,
      "1039": 5,
      "1040": 6,
      "1041": 14,
      "1042": 14,
      "1043": 14,
      "1044": 14,
      "1045": 14,
      "1046": 14,
      "1047": 0,
      "1999": 0
    },
    "1999": {
      "1001": 0,
      "1002": 0,
      "1003": 0,
      "1004": 0,
      "1005": 0,
      "1006": 0,
      "1007": 0,
      "1008": 0,
      "1009": 0,
      "1010": 0,
      "1011": 0,
      "1012": 0,
      "1013": 0,
      "1014": 0,
      "1015": 0,
      "1016": 0,
      "1017": 0,
      "1018": 0,
      "1019": 0,
      "1020": 0,
      "1021": 0,
      "1022": 0,
      "1023": 0,
      "1024": 0,
      "1025": 0,
      "1026": 0,
      "1027": 0,
      "1028": 0,
      "1029": 0,
      "1030": 0,
      "1031": 0,
      "1032": 0,
      "1033": 0,
      "1034": 0,
      "1035": 0,
      "1036": 0,
      "1037": 0,
      "1038": 0,
      "1039": 0,
      "1040": 0,
      "1041": 0,
      "1042": 0,
      "1043": 0,
      "1044": 0,
      "1045": 0,
      "1046": 0,
      "1047": 0,
      "1999": 0
    }
  },
  "matrix2d": [
    [
      0,
      12,
      9,
      12,
      2,
      18,
      12,
      9,
      6,
      9,
      17,
      14,
      15,
      8,
      13,
      7,
      12,
      10,
      10,
      15,
      4,
      9,
      6,
      10,
      13,
      16,
      12,
      15,
      6,
      10,
      14,
      14,
      1,
      1,
      7,
      13,
      12,
      18,
      1,
      3,
      14,
      10,
      7,
      20,
      13,
      7,
      8,
      0
    ],
    [
      12,
      0,
      20,
      12,
      11,
      10,
      17,
      7,
      18,
      14,
      10,
      6,
      10,
      11,
      3,
      7,
      6,
      3,
      9,
      13,
      6,
      9,
      1,
      6,
      13,
      10,
      8,
      8,
      6,
      14,
      19,
      9,
      7,
      7,
      12,
      3,
      3,
      6,
      9,
      20,
      2,
      8,
      12,
      9,
      14,
      8,
      10,
      0
    ],
    [
      9,
      20,
      0,
      19,
      13,
      7,
      6,
      14,
      8,
      20,
      6,
      9,
      1,
      10,
      9,
      6,
      9,
      9,
      16,
      10,
      6,
      8,
      1,
      9,
      9,
      9,
      10,
      7,
      13,
      14,
      12,
      10,
      10,
      15,
      9,
      2,
      10,
      8,
      11,
      10,
      3,
      6,
      11,
      10,
      14,
      9,
      6,
      0
    ],
    [
      12,
      12,
      19,
      0,
      5,
      14,
      10,
      10,
      13,
      6,
      13,
      12,
      7,
      16,
      9,
      13,
      17,
      8,
      13,
      16,
      3,
      10,
      15,
      14,
      11,
      15,
      15,
      11,
      6,
      4,
      19,
      9,
      8,
      8,
      8,
      17,
      8,
      14,
      14,
      7,
      11,
      20,
      2,
      10,
      1,
      16,
      18,
      0
    ],
    [
      2,
      11,
      13,
      5,
      0,
      7,
      8,
      5,
      9,
      17,
      1,
      2,
      13,
      6,
      19,
      9,
      5,
      14,
      8,
      12,
      1,
      14,
      4,
      13,
      6,
      12,
      13,
      15,
      9,
      11,
      10,
      6,
      6,
      9,
      12,
      4,
      10,
      6,
      9,
      9,
      3,
      2,
      9,
      8,
      12,
      8,
      5,
      0
    ],
    [
      18,
      10,
      7,
      14,
      7,
      0,
      9,
      16,
      16,
      14,
      18,
      13,
      9,
      10,
      10,
      10,
      11,
      16,
      16,
      8,
      7,
      20,
      8,
      14,
      11,
      8,
      7,
      10,
      6,
      12,
      14,
      15,
      11,
      12,
      8,
      6,
      12,
      15,
      11,
      13,
      5,
      8,
      17,
      8,
      12,
      10,
      7,
      0
    ],
    [
      12,
      17,
      6,
      10,
      8,
      9,
      0,
      7,
      9,
      6,
      15,
      12,
      14,
      9,
      1,
      14,
      14,
      15,
      15,
      18,
      12,
      9,
      10,
      15,
      11,
      8,
      8,
      6,
      9,
      12,
      10,
      15,
      9,
      17,
      8,
      17,
      6,
      7,
      8,
      6,
      7,
      8,
      8,
      6,
      13,
      15,
      9,
      0
    ],
    [
      9,
      7,
      14,
      10,
      5,
      16,
      7,
      0,
      13,
      14,
      9,
      20,
      2,
      9,
      17,
      9,
      11,
      14,
      15,
      11,
      9,
      2,
      19,
      11,
      14,
      14,
      11,
      15,
      1,
      8,
      10,
      9,
      12,
      14,
      13,
      8,
      7,
      13,
      7,
      14,
      8,
      13,
      8,
      8,
      10,
      20,
      15,
      0
    ],
    [
      6,
      18,
      8,
      13,
      9,
      16,
      9,
      13,
      0,
      18,
      2,
      9,
      9,
      6,
      7,
      6,
      11,
      19,
      15,
      9,
      10,
      14,
      10,
      10,
      17,
      7,
      10,
      7,
      9,
      8,
      8,
      5,
      4,
      15,
      6,
      12,
      10,
      1,
      6,
      14,
      12,
      13,
      3,
      15,
      2,
      14,
      13,
      0
    ],
    [
      9,
      14,
      20,
      6,
      17,
      14,
      6,
      14,
      18,
      0,
      16,
      11,
      20,
      15,
      8,
      5,
      7,
      19,
      10,
      10,
      15,
      13,
      20,
      10,
      8,
      6,
      9,
      6,
      1,
      11,
      14,
      7,
      6,
      8,
      6,
      9,
      5,
      6,
      6,
      18,
      2,
      10,
      14,
      2,
      8,
      8,
      9,
      0
    ],
    [
      17,
      10,
      6,
      13,
      1,
      18,
      15,
      9,
      2,
      16,
      0,
      17,
      13,
      14,
      4,
      8,
      11,
      10,
      16,
      7,
      17,
      8,
      13,
      8,
      7,
      7,
      8,
      6,
      7,
      10,
      6,
      15,
      4,
      18,
      2,
      13,
      12,
      11,
      4,
      2,
      7,
      13,
      6,
      5,
      6,
      10,
      14,
      0
    ],
    [
      14,
      6,
      9,
      12,
      2,
      13,
      12,
      20,
      9,
      11,
      17,
      0,
      10,
      14,
      16,
      10,
      6,
      8,
      15,
      6,
      6,
      19,
      10,
      9,
      6,
      7,
      9,
      7,
      2,
      15,
      11,
      7,
      14,
      8,
      6,
      7,
      11,
      12,
      6,
      9,
      1,
      8,
      16,
      14,
      6,
      8,
      6,
      0
    ],
    [
      15,
      10,
      1,
      7,
      13,
      9,
      14,
      2,
      9,
      20,
      13,
      10,
      0,
      14,
      12,
      6,
      7,
      10,
      19,
      6,
      7,
      18,
      1,
      18,
      9,
      7,
      10,
      10,
      9,
      14,
      18,
      14,
      7,
      9,
      7,
      20,
      12,
      12,
      9,
      6,
      14,
      15,
      15,
      13,
      14,
      13,
      15,
      0
    ],
    [
      8,
      11,
      10,
      16,
      6,
      10,
      9,
      9,
      6,
      15,
      14,
      14,
      14,
      0,
      13,
      13,
      8,
      10,
      9,
      13,
      9,
      11,
      12,
      15,
      14,
      6,
      6,
      7,
      3,
      14,
      14,
      7,
      3,
      7,
      20,
      8,
      10,
      4,
      15,
      15,
      10,
      9,
      12,
      10,
      12,
      12,
      9,
      0
    ],
    [
      13,
      3,
      9,
      9,
      19,
      10,
      1,
      17,
      7,
      8,
      4,
      16,
      12,
      13,
      0,
      7,
      13,
      6,
      6,
      10,
      14,
      17,
      15,
      13,
      6,
      7,
      9,
      7,
      9,
      15,
      19,
      10,
      14,
      14,
      7,
      2,
      7,
      6,
      9,
      16,
      9,
      1,
      15,
      15,
      13,
      10,
      4,
      0
    ],
    [
      7,
      7,
      6,
      13,
      9,
      10,
      14,
      9,
      6,
      5,
      8,
      10,
      6,
      13,
      7,
      0,
      7,
      6,
      9,
      7,
      10,
      2,
      19,
      6,
      6,
      7,
      6,
      6,
      9,
      8,
      7,
      3,
      16,
      11,
      15,
      14,
      8,
      9,
      9,
      8,
      6,
      12,
      13,
      13,
      13,
      12,
      15,
      0
    ],
    [
      12,
      6,
      9,
      17,
      5,
      11,
      14,
      11,
      11,
      7,
      11,
      6,
      7,
      8,
      13,
      7,
      0,
      17,
      13,
      14,
      12,
      6,
      8,
      10,
      14,
      8,
      9,
      9,
      13,
      1,
      3,
      9,
      4,
      6,
      8,
      11,
      13,
      8,
      3,
      6,
      15,
      11,
      4,
      15,
      5,
      11,
      15,
      0
    ],
    [
      10,
      3,
      9,
      8,
      14,
      16,
      15,
      14,
      19,
      19,
      10,
      8,
      10,
      10,
      6,
      6,
      17,
      0,
      15,
      13,
      12,
      9,
      2,
      9,
      11,
      8,
      9,
      9,
      2,
      8,
      15,
      13,
      3,
      7,
      7,
      9,
      15,
      8,
      9,
      7,
      14,
      11,
      12,
      13,
      9,
      13,
      12,
      0
    ],
    [
      10,
      9,
      16,
      13,
      8,
      16,
      15,
      15,
      15,
      10,
      16,
      15,
      19,
      9,
      6,
      9,
      13,
      15,
      0,
      17,
      14,
      6,
      10,
      7,
      11,
      6,
      10,
      8,
      14,
      9,
      7,
      10,
      6,
      6,
      11,
      12,
      16,
      10,
      8,
      14,
      8,
      15,
      8,
      6,
      13,
      11,
      12,
      0
    ],
    [
      15,
      13,
      10,
      16,
      12,
      8,
      18,
      11,
      9,
      10,
      7,
      6,
      6,
      13,
      10,
      7,
      14,
      13,
      17,
      0,
      20,
      10,
      12,
      11,
      11,
      6,
      8,
      8,
      1,
      12,
      13,
      2,
      9,
      13,
      15,
      6,
      4,
      2,
      17,
      13,
      1,
      2,
      9,
      5,
      13,
      9,
      2,
      0
    ],
    [
      4,
      6,
      6,
      3,
      1,
      7,
      12,
      9,
      10,
      15,
      17,
      6,
      7,
      9,
      14,
      10,
      12,
      12,
      14,
      20,
      0,
      6,
      8,
      7,
      6,
      9,
      8,
      9,
      14,
      15,
      12,
      15,
      2,
      7,
      10,
      8,
      9,
      18,
      4,
      10,
      15,
      9,
      11,
      2,
      11,
      11,
      7,
      0
    ],
    [
      9,
      9,
      8,
      10,
      14,
      20,
      9,
      2,
      14,
      13,
      8,
      19,
      18,
      11,
      17,
      2,
      6,
      9,
      6,
      10,
      6,
      0,
      10,
      9,
      15,
      10,
      6,
      7,
      15,
      6,
      12,
      7,
      6,
      7,
      8,
      6,
      6,
      7,
      9,
      8,
      1,
      8,
      11,
      13,
      6,
      9,
      6,
      0
    ],
    [
      6,
      1,
      1,
      15,
      4,
      8,
      10,
      19,
      10,
      20,
      13,
      10,
      1,
      12,
      15,
      19,
      8,
      2,
      10,
      12,
      8,
      10,
      0,
      15,
      12,
      9,
      10,
      10,
      16,
      3,
      7,
      3,
      6,
      12,
      13,
      7,
      10,
      4,
      8,
      13,
      10,
      13,
      3,
      12,
      7,
      13,
      13,
      0
    ],
    [
      10,
      6,
      9,
      14,
      13,
      14,
      15,
      11,
      10,
      10,
      8,
      9,
      18,
      15,
      13,
      6,
      10,
      9,
      7,
      11,
      7,
      9,
      15,
      0,
      13,
      6,
      8,
      6,
      11,
      12,
      20,
      12,
      10,
      7,
      10,
      5,
      14,
      11,
      9,
      12,
      13,
      9,
      12,
      17,
      14,
      9,
      8,
      0
    ],
    [
      13,
      13,
      9,
      11,
      6,
      11,
      11,
      14,
      17,
      8,
      7,
      6,
      9,
      14,
      6,
      6,
      14,
      11,
      11,
      11,
      6,
      15,
      12,
      13,
      0,
      12,
      11,
      12,
      15,
      11,
      10,
      11,
      7,
      8,
      9,
      7,
      10,
      10,
      8,
      8,
      10,
      10,
      6,
      8,
      13,
      13,
      8,
      0
    ],
    [
      16,
      10,
      9,
      15,
      12,
      8,
      8,
      14,
      7,
      6,
      7,
      7,
      7,
      6,
      7,
      7,
      8,
      8,
      6,
      6,
      9,
      10,
      9,
      6,
      12,
      0,
      17,
      20,
      10,
      8,
      7,
      7,
      6,
      9,
      8,
      8,
      10,
      6,
      6,
      9,
      8,
      7,
      7,
      9,
      6,
      9,
      6,
      0
    ],
    [
      12,
      8,
      10,
      15,
      13,
      7,
      8,
      11,
      10,
      9,
      8,
      9,
      10,
      6,
      9,
      6,
      9,
      9,
      10,
      8,
      8,
      6,
      10,
      8,
      11,
      17,
      0,
      18,
      7,
      10,
      10,
      9,
      6,
      10,
      7,
      6,
      10,
      9,
      9,
      6,
      7,
      6,
      10,
      6,
      7,
      7,
      8,
      0
    ],
    [
      15,
      8,
      7,
      11,
      15,
      10,
      6,
      15,
      7,
      6,
      6,
      7,
      10,
      7,
      7,
      6,
      9,
      9,
      8,
      8,
      9,
      7,
      10,
      6,
      12,
      20,
      18,
      0,
      10,
      8,
      10,
      7,
      10,
      10,
      6,
      9,
      10,
      8,
      9,
      10,
      10,
      10,
      10,
      9,
      7,
      7,
      10,
      0
    ],
    [
      6,
      6,
      13,
      6,
      9,
      6,
      9,
      1,
      9,
      1,
      7,
      2,
      9,
      3,
      9,
      9,
      13,
      2,
      14,
      1,
      14,
      15,
      16,
      11,
      15,
      10,
      7,
      10,
      0,
      19,
      8,
      12,
      4,
      3,
      9,
      15,
      7,
      15,
      3,
      2,
      13,
      13,
      9,
      5,
      7,
      12,
      13,
      0
    ],
    [
      10,
      14,
      14,
      4,
      11,
      12,
      12,
      8,
      8,
      11,
      10,
      15,
      14,
      14,
      15,
      8,
      1,
      8,
      9,
      12,
      15,
      6,
      3,
      12,
      11,
      8,
      10,
      8,
      19,
      0,
      7,
      4,
      8,
      11,
      12,
      13,
      6,
      2,
      13,
      12,
      8,
      14,
      11,
      15,
      6,
      14,
      11,
      0
    ],
    [
      14,
      19,
      12,
      19,
      10,
      14,
      10,
      10,
      8,
      14,
      6,
      11,
      18,
      14,
      19,
      7,
      3,
      15,
      7,
      13,
      12,
      12,
      7,
      20,
      10,
      7,
      10,
      10,
      8,
      7,
      0,
      3,
      10,
      15,
      17,
      10,
      13,
      4,
      6,
      20,
      9,
      16,
      18,
      16,
      7,
      6,
      11,
      0
    ],
    [
      14,
      9,
      10,
      9,
      6,
      15,
      15,
      9,
      5,
      7,
      15,
      7,
      14,
      7,
      10,
      3,
      9,
      13,
      10,
      2,
      15,
      7,
      3,
      12,
      11,
      7,
      9,
      7,
      12,
      4,
      3,
      0,
      17,
      2,
      18,
      20,
      13,
      7,
      7,
      13,
      12,
      14,
      1,
      6,
      9,
      17,
      14,
      0
    ],
    [
      1,
      7,
      10,
      8,
      6,
      11,
      9,
      12,
      4,
      6,
      4,
      14,
      7,
      3,
      14,
      16,
      4,
      3,
      6,
      9,
      2,
      6,
      6,
      10,
      7,
      6,
      6,
      10,
      4,
      8,
      10,
      17,
      0,
      11,
      19,
      12,
      6,
      3,
      11,
      8,
      3,
      6,
      20,
      15,
      10,
      6,
      7,
      0
    ],
    [
      1,
      7,
      15,
      8,
      9,
      12,
      17,
      14,
      15,
      8,
      18,
      8,
      9,
      7,
      14,
      11,
      6,
      7,
      6,
      13,
      7,
      7,
      12,
      7,
      8,
      9,
      10,
      10,
      3,
      11,
      15,
      2,
      11,
      0,
      18,
      16,
      11,
      8,
      9,
      14,
      14,
      9,
      14,
      15,
      13,
      11,
      9,
      0
    ],
    [
      7,
      12,
      9,
      8,
      12,
      8,
      8,
      13,
      6,
      6,
      2,
      6,
      7,
      20,
      7,
      15,
      8,
      7,
      11,
      15,
      10,
      8,
      13,
      10,
      9,
      8,
      7,
      6,
      9,
      12,
      17,
      18,
      19,
      18,
      0,
      1,
      11,
      9,
      9,
      13,
      5,
      3,
      15,
      11,
      20,
      16,
      4,
      0
    ],
    [
      13,
      3,
      2,
      17,
      4,
      6,
      17,
      8,
      12,
      9,
      13,
      7,
      20,
      8,
      2,
      14,
      11,
      9,
      12,
      6,
      8,
      6,
      7,
      5,
      7,
      8,
      6,
      9,
      15,
      13,
      10,
      20,
      12,
      16,
      1,
      0,
      10,
      13,
      1,
      7,
      16,
      8,
      10,
      6,
      12,
      3,
      10,
      0
    ],
    [
      12,
      3,
      10,
      8,
      10,
      12,
      6,
      7,
      10,
      5,
      12,
      11,
      12,
      10,
      7,
      8,
      13,
      15,
      16,
      4,
      9,
      6,
      10,
      14,
      10,
      10,
      10,
      10,
      7,
      6,
      13,
      13,
      6,
      11,
      11,
      10,
      0,
      17,
      7,
      8,
      15,
      9,
      9,
      14,
      18,
      20,
      7,
      0
    ],
    [
      18,
      6,
      8,
      14,
      6,
      15,
      7,
      13,
      1,
      6,
      11,
      12,
      12,
      4,
      6,
      9,
      8,
      8,
      10,
      2,
      18,
      7,
      4,
      11,
      10,
      6,
      9,
      8,
      15,
      2,
      4,
      7,
      3,
      8,
      9,
      13,
      17,
      0,
      4,
      10,
      15,
      11,
      2,
      9,
      8,
      13,
      11,
      0
    ],
    [
      1,
      9,
      11,
      14,
      9,
      11,
      8,
      7,
      6,
      6,
      4,
      6,
      9,
      15,
      9,
      9,
      3,
      9,
      8,
      17,
      4,
      9,
      8,
      9,
      8,
      6,
      9,
      9,
      3,
      13,
      6,
      7,
      11,
      9,
      9,
      1,
      7,
      4,
      0,
      11,
      12,
      1,
      13,
      8,
      9,
      10,
      5,
      0
    ],
    [
      3,
      20,
      10,
      7,
      9,
      13,
      6,
      14,
      14,
      18,
      2,
      9,
      6,
      15,
      16,
      8,
      6,
      7,
      14,
      13,
      10,
      8,
      13,
      12,
      8,
      9,
      6,
      10,
      2,
      12,
      20,
      13,
      8,
      14,
      13,
      7,
      8,
      10,
      11,
      0,
      17,
      8,
      14,
      15,
      18,
      15,
      6,
      0
    ],
    [
      14,
      2,
      3,
      11,
      3,
      5,
      7,
      8,
      12,
      2,
      7,
      1,
      14,
      10,
      9,
      6,
      15,
      14,
      8,
      1,
      15,
      1,
      10,
      13,
      10,
      8,
      7,
      10,
      13,
      8,
      9,
      12,
      3,
      14,
      5,
      16,
      15,
      15,
      12,
      17,
      0,
      11,
      8,
      9,
      14,
      6,
      14,
      0
    ],
    [
      10,
      8,
      6,
      20,
      2,
      8,
      8,
      13,
      13,
      10,
      13,
      8,
      15,
      9,
      1,
      12,
      11,
      11,
      15,
      2,
      9,
      8,
      13,
      9,
      10,
      7,
      6,
      10,
      13,
      14,
      16,
      14,
      6,
      9,
      3,
      8,
      9,
      11,
      1,
      8,
      11,
      0,
      16,
      14,
      12,
      14,
      14,
      0
    ],
    [
      7,
      12,
      11,
      2,
      9,
      17,
      8,
      8,
      3,
      14,
      6,
      16,
      15,
      12,
      15,
      13,
      4,
      12,
      8,
      9,
      11,
      11,
      3,
      12,
      6,
      7,
      10,
      10,
      9,
      11,
      18,
      1,
      20,
      14,
      15,
      10,
      9,
      2,
      13,
      14,
      8,
      16,
      0,
      11,
      8,
      7,
      14,
      0
    ],
    [
      20,
      9,
      10,
      10,
      8,
      8,
      6,
      8,
      15,
      2,
      5,
      14,
      13,
      10,
      15,
      13,
      15,
      13,
      6,
      5,
      2,
      13,
      12,
      17,
      8,
      9,
      6,
      9,
      5,
      15,
      16,
      6,
      15,
      15,
      11,
      6,
      14,
      9,
      8,
      15,
      9,
      14,
      11,
      0,
      4,
      15,
      14,
      0
    ],
    [
      13,
      14,
      14,
      1,
      12,
      12,
      13,
      10,
      2,
      8,
      6,
      6,
      14,
      12,
      13,
      13,
      5,
      9,
      13,
      13,
      11,
      6,
      7,
      14,
      13,
      6,
      7,
      7,
      7,
      6,
      7,
      9,
      10,
      13,
      20,
      12,
      18,
      8,
      9,
      18,
      14,
      12,
      8,
      4,
      0,
      17,
      14,
      0
    ],
    [
      7,
      8,
      9,
      16,
      8,
      10,
      15,
      20,
      14,
      8,
      10,
      8,
      13,
      12,
      10,
      12,
      11,
      13,
      11,
      9,
      11,
      9,
      13,
      9,
      13,
      9,
      7,
      7,
      12,
      14,
      6,
      17,
      6,
      11,
      16,
      3,
      20,
      13,
      10,
      15,
      6,
      14,
      7,
      15,
      17,
      0,
      14,
      0
    ],
    [
      8,
      10,
      6,
      18,
      5,
      7,
      9,
      15,
      13,
      9,
      14,
      6,
      15,
      9,
      4,
      15,
      15,
      12,
      12,
      2,
      7,
      6,
      13,
      8,
      8,
      6,
      8,
      10,
      13,
      11,
      11,
      14,
      7,
      9,
      4,
      10,
      7,
      11,
      5,
      6,
      14,
      14,
      14,
      14,
      14,
      14,
      0,
      0
    ],
    [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ]
  ],
  "thresholds": [
    {
      "level": 1,
      "rankName": "无",
      "minScore": 0,
      "learnTimes": 1
    },
    {
      "level": 2,
      "rankName": "差",
      "minScore": 1,
      "learnTimes": 2
    },
    {
      "level": 3,
      "rankName": "一般",
      "minScore": 10,
      "learnTimes": 3
    },
    {
      "level": 4,
      "rankName": "良",
      "minScore": 20,
      "learnTimes": 4
    },
    {
      "level": 5,
      "rankName": "优",
      "minScore": 30,
      "learnTimes": 5
    },
    {
      "level": 6,
      "rankName": "极",
      "minScore": 45,
      "learnTimes": 5
    }
  ],
  "entryBonus": {
    "byStar": [
      2,
      5,
      10
    ],
    "triggerByStar": [
      3,
      6,
      10
    ],
    "note": "契合度词条(id=501)加成：1★+2 / 2★+5 / 3★+10；「或触发时 +3/+6/+10」为另一种取值口径（详见 rule_text）"
  },
  "calculation": {
    "rule_text": "总相性分(契合度) = 主力角色与2本训练笔记原主人之间的『角色关系分』(若笔记原主人与主力相同则该项为0) + 笔记上『契合度词条(id=501)』提供的加成（1★+2 / 2★+5 / 3★+10，或触发时+3/+6/+10）。",
    "harmony_entry_bonus_by_star": [
      2,
      5,
      10
    ],
    "harmony_levels": [
      {
        "level": 1,
        "rank_name": "无",
        "min_compatibility_score": 0,
        "inheritance_learn_times": 1
      },
      {
        "level": 2,
        "rank_name": "差",
        "min_compatibility_score": 1,
        "inheritance_learn_times": 2
      },
      {
        "level": 3,
        "rank_name": "一般",
        "min_compatibility_score": 10,
        "inheritance_learn_times": 3
      },
      {
        "level": 4,
        "rank_name": "良",
        "min_compatibility_score": 20,
        "inheritance_learn_times": 4
      },
      {
        "level": 5,
        "rank_name": "优",
        "min_compatibility_score": 30,
        "inheritance_learn_times": 5
      },
      {
        "level": 6,
        "rank_name": "极",
        "min_compatibility_score": 45,
        "inheritance_learn_times": 5
      }
    ],
    "entry_trigger_count_by_compatibility": [
      {
        "id": 1,
        "required_compatibility_score": 0,
        "min_triggered_entries": 2,
        "max_triggered_entries": 4
      },
      {
        "id": 2,
        "required_compatibility_score": 5,
        "min_triggered_entries": 3,
        "max_triggered_entries": 5
      },
      {
        "id": 3,
        "required_compatibility_score": 10,
        "min_triggered_entries": 4,
        "max_triggered_entries": 6
      },
      {
        "id": 4,
        "required_compatibility_score": 15,
        "min_triggered_entries": 4,
        "max_triggered_entries": 7
      },
      {
        "id": 5,
        "required_compatibility_score": 20,
        "min_triggered_entries": 4,
        "max_triggered_entries": 8
      },
      {
        "id": 6,
        "required_compatibility_score": 40,
        "min_triggered_entries": 5,
        "max_triggered_entries": 10
      },
      {
        "id": 7,
        "required_compatibility_score": 60,
        "min_triggered_entries": 5,
        "max_triggered_entries": 11
      },
      {
        "id": 8,
        "required_compatibility_score": 80,
        "min_triggered_entries": 5,
        "max_triggered_entries": 12
      },
      {
        "id": 9,
        "required_compatibility_score": 160,
        "min_triggered_entries": 6,
        "max_triggered_entries": 14
      },
      {
        "id": 10,
        "required_compatibility_score": 325,
        "min_triggered_entries": 7,
        "max_triggered_entries": 18
      },
      {
        "id": 11,
        "required_compatibility_score": 640,
        "min_triggered_entries": 8,
        "max_triggered_entries": 22
      },
      {
        "id": 12,
        "required_compatibility_score": 960,
        "min_triggered_entries": 9,
        "max_triggered_entries": 26
      },
      {
        "id": 13,
        "required_compatibility_score": 1280,
        "min_triggered_entries": 10,
        "max_triggered_entries": 30
      }
    ]
  },
  "community37": {
    "players": [
      "澪奈·贾妮丝",
      "龙宫寺心叶",
      "近江奏",
      "和泉香织",
      "亚理纱贾斯敏",
      "洺瑶",
      "闪堂电",
      "克拉丽丝·波洛",
      "早濑千秋",
      "羽田朱志香",
      "望月透",
      "藤松玖怜",
      "绿川步梦",
      "雨森琉璃",
      "皆川式",
      "毒岛黛也",
      "名雪纱夜",
      "佐久间雨乃",
      "千圣·贝尔丝",
      "稻叶杏里",
      "清水万里",
      "榎本纯那",
      "春澄永远",
      "森田莉莉",
      "美伽未来",
      "五十岚诗音",
      "羽濑川湊",
      "真崎辉世",
      "先斗月绮",
      "卧云真昼",
      "野上泷",
      "降旗千红纱",
      "林原树里",
      "美星栗栖",
      "远野桐",
      "白神时久",
      "希雅·奥黛拉"
    ],
    "matrix": [
      [
        0,
        12,
        9,
        12,
        2,
        18,
        12,
        6,
        9,
        17,
        14,
        8,
        13,
        7,
        12,
        10,
        10,
        15,
        4,
        9,
        6,
        10,
        13,
        16,
        12,
        15,
        6,
        10,
        14,
        1,
        12,
        18,
        1,
        3,
        10,
        13,
        7
      ],
      [
        12,
        0,
        20,
        12,
        11,
        10,
        17,
        18,
        14,
        10,
        6,
        11,
        3,
        7,
        6,
        3,
        9,
        13,
        6,
        9,
        1,
        6,
        13,
        10,
        8,
        8,
        6,
        14,
        9,
        7,
        3,
        6,
        9,
        20,
        8,
        14,
        8
      ],
      [
        9,
        20,
        0,
        19,
        13,
        7,
        6,
        8,
        20,
        6,
        9,
        10,
        9,
        6,
        9,
        9,
        16,
        10,
        6,
        8,
        1,
        9,
        9,
        9,
        10,
        7,
        13,
        14,
        10,
        10,
        10,
        8,
        11,
        10,
        6,
        14,
        9
      ],
      [
        12,
        12,
        19,
        0,
        5,
        14,
        10,
        13,
        6,
        13,
        12,
        16,
        9,
        13,
        17,
        8,
        13,
        16,
        3,
        10,
        15,
        14,
        11,
        15,
        15,
        11,
        6,
        4,
        9,
        8,
        8,
        14,
        14,
        7,
        20,
        1,
        16
      ],
      [
        2,
        11,
        13,
        5,
        0,
        7,
        8,
        9,
        17,
        1,
        2,
        6,
        19,
        9,
        5,
        14,
        8,
        12,
        1,
        14,
        4,
        13,
        6,
        12,
        13,
        15,
        9,
        11,
        6,
        6,
        10,
        6,
        9,
        9,
        2,
        12,
        8
      ],
      [
        18,
        10,
        7,
        14,
        7,
        0,
        9,
        16,
        14,
        18,
        13,
        10,
        10,
        10,
        11,
        16,
        16,
        8,
        7,
        20,
        8,
        14,
        11,
        8,
        7,
        10,
        6,
        12,
        15,
        11,
        12,
        15,
        11,
        13,
        8,
        12,
        10
      ],
      [
        12,
        17,
        6,
        10,
        8,
        9,
        0,
        9,
        6,
        15,
        12,
        9,
        1,
        14,
        14,
        15,
        15,
        18,
        12,
        9,
        10,
        15,
        11,
        8,
        8,
        6,
        9,
        12,
        15,
        9,
        6,
        7,
        8,
        6,
        8,
        13,
        15
      ],
      [
        6,
        18,
        8,
        13,
        9,
        16,
        9,
        0,
        18,
        2,
        9,
        6,
        7,
        6,
        11,
        19,
        15,
        9,
        10,
        14,
        10,
        10,
        17,
        7,
        10,
        7,
        9,
        8,
        5,
        4,
        10,
        1,
        6,
        14,
        13,
        2,
        14
      ],
      [
        9,
        14,
        20,
        6,
        17,
        14,
        6,
        18,
        0,
        16,
        11,
        15,
        8,
        5,
        7,
        19,
        10,
        10,
        15,
        13,
        20,
        10,
        8,
        6,
        9,
        6,
        1,
        11,
        7,
        6,
        5,
        6,
        6,
        18,
        10,
        8,
        8
      ],
      [
        17,
        10,
        6,
        13,
        1,
        18,
        15,
        2,
        16,
        0,
        17,
        14,
        4,
        8,
        11,
        10,
        16,
        7,
        17,
        8,
        13,
        8,
        7,
        7,
        8,
        6,
        7,
        10,
        15,
        4,
        12,
        11,
        4,
        2,
        13,
        6,
        10
      ],
      [
        14,
        6,
        9,
        12,
        2,
        13,
        12,
        9,
        11,
        17,
        0,
        14,
        16,
        10,
        6,
        8,
        15,
        6,
        6,
        19,
        10,
        9,
        6,
        7,
        9,
        7,
        2,
        15,
        7,
        14,
        11,
        12,
        6,
        9,
        8,
        6,
        8
      ],
      [
        8,
        11,
        10,
        16,
        6,
        10,
        9,
        6,
        15,
        14,
        14,
        0,
        13,
        13,
        8,
        10,
        9,
        13,
        9,
        11,
        12,
        15,
        14,
        6,
        6,
        7,
        3,
        14,
        7,
        3,
        10,
        4,
        15,
        15,
        9,
        12,
        12
      ],
      [
        13,
        3,
        9,
        9,
        19,
        10,
        1,
        7,
        8,
        4,
        16,
        13,
        0,
        7,
        13,
        6,
        6,
        10,
        14,
        17,
        15,
        13,
        6,
        7,
        9,
        7,
        9,
        15,
        10,
        14,
        7,
        6,
        9,
        16,
        1,
        13,
        10
      ],
      [
        7,
        7,
        6,
        13,
        9,
        10,
        14,
        6,
        5,
        8,
        10,
        13,
        7,
        0,
        7,
        6,
        9,
        7,
        10,
        2,
        19,
        6,
        6,
        7,
        6,
        6,
        9,
        8,
        3,
        16,
        8,
        9,
        9,
        8,
        12,
        13,
        12
      ],
      [
        12,
        6,
        9,
        17,
        5,
        11,
        14,
        11,
        7,
        11,
        6,
        8,
        13,
        7,
        0,
        17,
        13,
        14,
        12,
        6,
        8,
        10,
        14,
        8,
        9,
        9,
        13,
        1,
        9,
        4,
        13,
        8,
        3,
        6,
        11,
        5,
        11
      ],
      [
        10,
        3,
        9,
        8,
        14,
        16,
        15,
        19,
        19,
        10,
        8,
        10,
        6,
        6,
        17,
        0,
        15,
        13,
        12,
        9,
        2,
        9,
        11,
        8,
        9,
        9,
        2,
        8,
        13,
        3,
        15,
        8,
        9,
        7,
        11,
        9,
        13
      ],
      [
        10,
        9,
        16,
        13,
        8,
        16,
        15,
        15,
        10,
        16,
        15,
        9,
        6,
        9,
        13,
        15,
        0,
        17,
        14,
        6,
        10,
        7,
        11,
        6,
        10,
        8,
        14,
        9,
        10,
        6,
        16,
        10,
        8,
        14,
        15,
        13,
        11
      ],
      [
        15,
        13,
        10,
        16,
        12,
        8,
        18,
        9,
        10,
        7,
        6,
        13,
        10,
        7,
        14,
        13,
        17,
        0,
        20,
        10,
        12,
        11,
        11,
        6,
        8,
        8,
        1,
        12,
        2,
        9,
        4,
        2,
        17,
        13,
        2,
        13,
        9
      ],
      [
        4,
        6,
        6,
        3,
        1,
        7,
        12,
        10,
        15,
        17,
        6,
        9,
        14,
        10,
        12,
        12,
        14,
        20,
        0,
        6,
        8,
        7,
        6,
        9,
        8,
        9,
        14,
        15,
        15,
        2,
        9,
        18,
        4,
        10,
        9,
        11,
        11
      ],
      [
        9,
        9,
        8,
        10,
        14,
        20,
        9,
        14,
        13,
        8,
        19,
        11,
        17,
        2,
        6,
        9,
        6,
        10,
        6,
        0,
        10,
        9,
        15,
        10,
        6,
        7,
        15,
        6,
        7,
        6,
        6,
        7,
        9,
        8,
        8,
        6,
        9
      ],
      [
        6,
        1,
        1,
        15,
        4,
        8,
        10,
        10,
        20,
        13,
        10,
        12,
        15,
        19,
        8,
        2,
        10,
        12,
        8,
        10,
        0,
        15,
        12,
        9,
        10,
        10,
        16,
        3,
        3,
        6,
        10,
        4,
        8,
        13,
        13,
        7,
        13
      ],
      [
        10,
        6,
        9,
        14,
        13,
        14,
        15,
        10,
        10,
        8,
        9,
        15,
        13,
        6,
        10,
        9,
        7,
        11,
        7,
        9,
        15,
        0,
        13,
        6,
        8,
        6,
        11,
        12,
        12,
        10,
        14,
        11,
        9,
        12,
        9,
        14,
        9
      ],
      [
        13,
        13,
        9,
        11,
        6,
        11,
        11,
        17,
        8,
        7,
        6,
        14,
        6,
        6,
        14,
        11,
        11,
        11,
        6,
        15,
        12,
        13,
        0,
        12,
        11,
        12,
        15,
        11,
        11,
        7,
        10,
        10,
        8,
        8,
        10,
        13,
        13
      ],
      [
        16,
        10,
        9,
        15,
        12,
        8,
        8,
        7,
        6,
        7,
        7,
        6,
        7,
        7,
        8,
        8,
        6,
        6,
        9,
        10,
        9,
        6,
        12,
        0,
        17,
        20,
        10,
        8,
        7,
        6,
        10,
        6,
        6,
        9,
        7,
        6,
        9
      ],
      [
        12,
        8,
        10,
        15,
        13,
        7,
        8,
        10,
        9,
        8,
        9,
        6,
        9,
        6,
        9,
        9,
        10,
        8,
        8,
        6,
        10,
        8,
        11,
        17,
        0,
        18,
        7,
        10,
        9,
        6,
        10,
        9,
        9,
        6,
        6,
        7,
        7
      ],
      [
        15,
        8,
        7,
        11,
        15,
        10,
        6,
        7,
        6,
        6,
        7,
        7,
        7,
        6,
        9,
        9,
        8,
        8,
        9,
        7,
        10,
        6,
        12,
        20,
        18,
        0,
        10,
        8,
        7,
        10,
        10,
        8,
        9,
        10,
        10,
        7,
        7
      ],
      [
        6,
        6,
        13,
        6,
        9,
        6,
        9,
        9,
        1,
        7,
        2,
        3,
        9,
        9,
        13,
        2,
        14,
        1,
        14,
        15,
        16,
        11,
        15,
        10,
        7,
        10,
        0,
        19,
        12,
        4,
        7,
        15,
        3,
        2,
        13,
        7,
        12
      ],
      [
        10,
        14,
        14,
        4,
        11,
        12,
        12,
        8,
        11,
        10,
        15,
        14,
        15,
        8,
        1,
        8,
        9,
        12,
        15,
        6,
        3,
        12,
        11,
        8,
        10,
        8,
        19,
        0,
        4,
        8,
        6,
        2,
        13,
        12,
        14,
        6,
        14
      ],
      [
        14,
        9,
        10,
        9,
        6,
        15,
        15,
        5,
        7,
        15,
        7,
        7,
        10,
        3,
        9,
        13,
        10,
        2,
        15,
        7,
        3,
        12,
        11,
        7,
        9,
        7,
        12,
        4,
        0,
        17,
        13,
        7,
        7,
        13,
        14,
        9,
        17
      ],
      [
        1,
        7,
        10,
        8,
        6,
        11,
        9,
        4,
        6,
        4,
        14,
        3,
        14,
        16,
        4,
        3,
        6,
        9,
        2,
        6,
        6,
        10,
        7,
        6,
        6,
        10,
        4,
        8,
        17,
        0,
        6,
        3,
        11,
        8,
        6,
        10,
        6
      ],
      [
        12,
        3,
        10,
        8,
        10,
        12,
        6,
        10,
        5,
        12,
        11,
        10,
        7,
        8,
        13,
        15,
        16,
        4,
        9,
        6,
        10,
        14,
        10,
        10,
        10,
        10,
        7,
        6,
        13,
        6,
        0,
        17,
        7,
        8,
        9,
        18,
        20
      ],
      [
        18,
        6,
        8,
        14,
        6,
        15,
        7,
        1,
        6,
        11,
        12,
        4,
        6,
        9,
        8,
        8,
        10,
        2,
        18,
        7,
        4,
        11,
        10,
        6,
        9,
        8,
        15,
        2,
        7,
        3,
        17,
        0,
        4,
        10,
        11,
        8,
        13
      ],
      [
        1,
        9,
        11,
        14,
        9,
        11,
        8,
        6,
        6,
        4,
        6,
        15,
        9,
        9,
        3,
        9,
        8,
        17,
        4,
        9,
        8,
        9,
        8,
        6,
        9,
        9,
        3,
        13,
        7,
        11,
        7,
        4,
        0,
        11,
        1,
        9,
        10
      ],
      [
        3,
        20,
        10,
        7,
        9,
        13,
        6,
        14,
        18,
        2,
        9,
        15,
        16,
        8,
        6,
        7,
        14,
        13,
        10,
        8,
        13,
        12,
        8,
        9,
        6,
        10,
        2,
        12,
        13,
        8,
        8,
        10,
        11,
        0,
        8,
        18,
        15
      ],
      [
        10,
        8,
        6,
        20,
        2,
        8,
        8,
        13,
        10,
        13,
        8,
        9,
        1,
        12,
        11,
        11,
        15,
        2,
        9,
        8,
        13,
        9,
        10,
        7,
        6,
        10,
        13,
        14,
        14,
        6,
        9,
        11,
        1,
        8,
        0,
        12,
        14
      ],
      [
        13,
        14,
        14,
        1,
        12,
        12,
        13,
        2,
        8,
        6,
        6,
        12,
        13,
        13,
        5,
        9,
        13,
        13,
        11,
        6,
        7,
        14,
        13,
        6,
        7,
        7,
        7,
        6,
        9,
        10,
        18,
        8,
        9,
        18,
        12,
        0,
        17
      ],
      [
        7,
        8,
        9,
        16,
        8,
        10,
        15,
        14,
        8,
        10,
        8,
        12,
        10,
        12,
        11,
        13,
        11,
        9,
        11,
        9,
        13,
        9,
        13,
        9,
        7,
        7,
        12,
        14,
        17,
        6,
        20,
        13,
        10,
        15,
        14,
        17,
        0
      ]
    ],
    "mapping_to_48": [
      {
        "localName": "澪奈·贾妮丝",
        "chartName": "澪奈·贾妮丝",
        "hoopId": "1001",
        "hoopName": "澪奈"
      },
      {
        "localName": "龙宫寺心叶",
        "chartName": "龙宫寺心叶",
        "hoopId": "1002",
        "hoopName": "龙宫寺"
      },
      {
        "localName": "近江奏",
        "chartName": "近江奏",
        "hoopId": "1003",
        "hoopName": "近江"
      },
      {
        "localName": "和泉香织",
        "chartName": "和泉香织",
        "hoopId": "1004",
        "hoopName": "和泉"
      },
      {
        "localName": "亚理纱贾斯敏",
        "chartName": "亚理纱贾斯敏",
        "hoopId": "1005",
        "hoopName": "亚理纱"
      },
      {
        "localName": "洺瑶",
        "chartName": "洺瑶",
        "hoopId": "1006",
        "hoopName": "洺瑶"
      },
      {
        "localName": "闪堂电",
        "chartName": "闪堂电",
        "hoopId": "1007",
        "hoopName": "闪堂"
      },
      {
        "localName": "克拉丽丝·波洛",
        "chartName": "克拉丽丝·波洛",
        "hoopId": "1009",
        "hoopName": "克拉丽丝"
      },
      {
        "localName": "早濑千秋",
        "chartName": "早濑千秋",
        "hoopId": "1010",
        "hoopName": "早濑"
      },
      {
        "localName": "羽田朱志香",
        "chartName": "羽田朱志香",
        "hoopId": "1011",
        "hoopName": "羽田"
      },
      {
        "localName": "望月透",
        "chartName": "望月透",
        "hoopId": "1012",
        "hoopName": "望月"
      },
      {
        "localName": "藤松玖怜",
        "chartName": "藤松玖怜",
        "hoopId": "1014",
        "hoopName": "藤松"
      },
      {
        "localName": "绿川步梦",
        "chartName": "绿川步梦",
        "hoopId": "1015",
        "hoopName": "绿川"
      },
      {
        "localName": "雨森琉璃",
        "chartName": "雨森琉璃",
        "hoopId": "1016",
        "hoopName": "雨森"
      },
      {
        "localName": "皆川式",
        "chartName": "皆川式",
        "hoopId": "1017",
        "hoopName": "皆川"
      },
      {
        "localName": "毒岛黛也",
        "chartName": "毒岛黛也",
        "hoopId": "1018",
        "hoopName": "毒岛"
      },
      {
        "localName": "名雪纱夜",
        "chartName": "名雪纱夜",
        "hoopId": "1019",
        "hoopName": "名雪"
      },
      {
        "localName": "佐久间雨乃",
        "chartName": "佐久间雨乃",
        "hoopId": "1020",
        "hoopName": "佐久间"
      },
      {
        "localName": "千圣·贝尔丝",
        "chartName": "千圣·贝尔丝",
        "hoopId": "1021",
        "hoopName": "千圣"
      },
      {
        "localName": "稻叶杏里",
        "chartName": "稻叶杏里",
        "hoopId": "1022",
        "hoopName": "稻叶"
      },
      {
        "localName": "清水万里",
        "chartName": "清水万里",
        "hoopId": "1023",
        "hoopName": "清水"
      },
      {
        "localName": "榎本纯那",
        "chartName": "榎本纯那",
        "hoopId": "1024",
        "hoopName": "榎本"
      },
      {
        "localName": "春澄永远",
        "chartName": "春澄永远",
        "hoopId": "1025",
        "hoopName": "春澄"
      },
      {
        "localName": "森田莉莉",
        "chartName": "森田莉莉",
        "hoopId": "1026",
        "hoopName": "森田"
      },
      {
        "localName": "美伽未来",
        "chartName": "美伽未来",
        "hoopId": "1027",
        "hoopName": "美伽"
      },
      {
        "localName": "五十岚诗音",
        "chartName": "五十岚诗音",
        "hoopId": "1028",
        "hoopName": "五十岚"
      },
      {
        "localName": "羽濑川湊",
        "chartName": "羽濑川湊",
        "hoopId": "1029",
        "hoopName": "羽濑川"
      },
      {
        "localName": "真崎辉世",
        "chartName": "真崎辉世",
        "hoopId": "1030",
        "hoopName": "真崎"
      },
      {
        "localName": "先斗月绮",
        "chartName": "先斗月绮",
        "hoopId": "1032",
        "hoopName": "先斗"
      },
      {
        "localName": "卧云真昼",
        "chartName": "卧云真昼",
        "hoopId": "1033",
        "hoopName": "卧云"
      },
      {
        "localName": "野上泷",
        "chartName": "野上泷",
        "hoopId": "1037",
        "hoopName": "野上"
      },
      {
        "localName": "降旗千红纱",
        "chartName": "降旗千红纱",
        "hoopId": "1038",
        "hoopName": "降旗"
      },
      {
        "localName": "林原树里",
        "chartName": "林原树里",
        "hoopId": "1039",
        "hoopName": "林原"
      },
      {
        "localName": "美星栗栖",
        "chartName": "美星栗栖",
        "hoopId": "1040",
        "hoopName": "美星"
      },
      {
        "localName": "远野桐",
        "chartName": "远野桐",
        "hoopId": "1042",
        "hoopName": "远野"
      },
      {
        "localName": "白神时久",
        "chartName": "白神时久",
        "hoopId": "1045",
        "hoopName": "白神"
      },
      {
        "localName": "希雅·奥黛拉",
        "chartName": "希雅·奥黛拉",
        "hoopId": "1046",
        "hoopName": "希雅"
      }
    ],
    "source_note": "社区图转录版（37×37），用于校验"
  },
  "entries": [
    {
      "entryId": 1,
      "name": "投射",
      "rawName": "投射",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "投射",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外投射属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 1,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 6,
              "maxValue": 12,
              "description": "触发时投射+6~12",
              "attributeRanges": {
                "投射": [
                  6,
                  12
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 8,
              "maxValue": 16,
              "description": "触发时投射+8~16",
              "attributeRanges": {
                "投射": [
                  8,
                  16
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 12,
              "maxValue": 22,
              "description": "触发时投射+12~22",
              "attributeRanges": {
                "投射": [
                  12,
                  22
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 2,
      "name": "弹跳",
      "rawName": "弹跳",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "弹跳",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外弹跳属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 2,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 6,
              "maxValue": 12,
              "description": "触发时弹跳+6~12",
              "attributeRanges": {
                "弹跳": [
                  6,
                  12
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 8,
              "maxValue": 16,
              "description": "触发时弹跳+8~16",
              "attributeRanges": {
                "弹跳": [
                  8,
                  16
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 12,
              "maxValue": 22,
              "description": "触发时弹跳+12~22",
              "attributeRanges": {
                "弹跳": [
                  12,
                  22
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 3,
      "name": "防守",
      "rawName": "防守",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "防守",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外防守属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 3,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 6,
              "maxValue": 12,
              "description": "触发时防守+6~12",
              "attributeRanges": {
                "防守": [
                  6,
                  12
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 8,
              "maxValue": 16,
              "description": "触发时防守+8~16",
              "attributeRanges": {
                "防守": [
                  8,
                  16
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 12,
              "maxValue": 22,
              "description": "触发时防守+12~22",
              "attributeRanges": {
                "防守": [
                  12,
                  22
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 4,
      "name": "体能",
      "rawName": "体能",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "体能",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外体能属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 4,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 6,
              "maxValue": 12,
              "description": "触发时体能+6~12",
              "attributeRanges": {
                "体能": [
                  6,
                  12
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 8,
              "maxValue": 16,
              "description": "触发时体能+8~16",
              "attributeRanges": {
                "体能": [
                  8,
                  16
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 12,
              "maxValue": 22,
              "description": "触发时体能+12~22",
              "attributeRanges": {
                "体能": [
                  12,
                  22
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 5,
      "name": "运控",
      "rawName": "运控",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "运控",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外运控属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 5,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 6,
              "maxValue": 12,
              "description": "触发时运控+6~12",
              "attributeRanges": {
                "运控": [
                  6,
                  12
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 8,
              "maxValue": 16,
              "description": "触发时运控+8~16",
              "attributeRanges": {
                "运控": [
                  8,
                  16
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 12,
              "maxValue": 22,
              "description": "触发时运控+12~22",
              "attributeRanges": {
                "运控": [
                  12,
                  22
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 6,
      "name": "意识",
      "rawName": "意识",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "意识",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外意识属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 6,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 6,
              "maxValue": 12,
              "description": "触发时意识+6~12",
              "attributeRanges": {
                "意识": [
                  6,
                  12
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 8,
              "maxValue": 16,
              "description": "触发时意识+8~16",
              "attributeRanges": {
                "意识": [
                  8,
                  16
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 12,
              "maxValue": 22,
              "description": "触发时意识+12~22",
              "attributeRanges": {
                "意识": [
                  12,
                  22
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 7,
      "name": "投射",
      "rawName": "投射",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "投射",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外投射属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 7,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 10,
              "maxValue": 18,
              "description": "触发时投射+10~18",
              "attributeRanges": {
                "投射": [
                  10,
                  18
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 14,
              "maxValue": 24,
              "description": "触发时投射+14~24",
              "attributeRanges": {
                "投射": [
                  14,
                  24
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 18,
              "maxValue": 30,
              "description": "触发时投射+18~30",
              "attributeRanges": {
                "投射": [
                  18,
                  30
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 8,
      "name": "弹跳",
      "rawName": "弹跳",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "弹跳",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外弹跳属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 8,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 10,
              "maxValue": 18,
              "description": "触发时弹跳+10~18",
              "attributeRanges": {
                "弹跳": [
                  10,
                  18
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 14,
              "maxValue": 24,
              "description": "触发时弹跳+14~24",
              "attributeRanges": {
                "弹跳": [
                  14,
                  24
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 18,
              "maxValue": 30,
              "description": "触发时弹跳+18~30",
              "attributeRanges": {
                "弹跳": [
                  18,
                  30
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 9,
      "name": "防守",
      "rawName": "防守",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "防守",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外防守属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 9,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 10,
              "maxValue": 18,
              "description": "触发时防守+10~18",
              "attributeRanges": {
                "防守": [
                  10,
                  18
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 14,
              "maxValue": 24,
              "description": "触发时防守+14~24",
              "attributeRanges": {
                "防守": [
                  14,
                  24
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 18,
              "maxValue": 30,
              "description": "触发时防守+18~30",
              "attributeRanges": {
                "防守": [
                  18,
                  30
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 10,
      "name": "体能",
      "rawName": "体能",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "体能",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外体能属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 10,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 10,
              "maxValue": 18,
              "description": "触发时体能+10~18",
              "attributeRanges": {
                "体能": [
                  10,
                  18
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 14,
              "maxValue": 24,
              "description": "触发时体能+14~24",
              "attributeRanges": {
                "体能": [
                  14,
                  24
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 18,
              "maxValue": 30,
              "description": "触发时体能+18~30",
              "attributeRanges": {
                "体能": [
                  18,
                  30
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 11,
      "name": "运控",
      "rawName": "运控",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "运控",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外运控属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 11,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 10,
              "maxValue": 18,
              "description": "触发时运控+10~18",
              "attributeRanges": {
                "运控": [
                  10,
                  18
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 14,
              "maxValue": 24,
              "description": "触发时运控+14~24",
              "attributeRanges": {
                "运控": [
                  14,
                  24
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 18,
              "maxValue": 30,
              "description": "触发时运控+18~30",
              "attributeRanges": {
                "运控": [
                  18,
                  30
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 12,
      "name": "意识",
      "rawName": "意识",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "意识",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外意识属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 12,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 10,
              "maxValue": 18,
              "description": "触发时意识+10~18",
              "attributeRanges": {
                "意识": [
                  10,
                  18
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 14,
              "maxValue": 24,
              "description": "触发时意识+14~24",
              "attributeRanges": {
                "意识": [
                  14,
                  24
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 18,
              "maxValue": 30,
              "description": "触发时意识+18~30",
              "attributeRanges": {
                "意识": [
                  18,
                  30
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 13,
      "name": "投射",
      "rawName": "投射",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "投射",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外投射属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 13,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 16,
              "maxValue": 26,
              "description": "触发时投射+16~26",
              "attributeRanges": {
                "投射": [
                  16,
                  26
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 21,
              "maxValue": 33,
              "description": "触发时投射+21~33",
              "attributeRanges": {
                "投射": [
                  21,
                  33
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 27,
              "maxValue": 41,
              "description": "触发时投射+27~41",
              "attributeRanges": {
                "投射": [
                  27,
                  41
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 14,
      "name": "弹跳",
      "rawName": "弹跳",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "弹跳",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外弹跳属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 14,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 16,
              "maxValue": 26,
              "description": "触发时弹跳+16~26",
              "attributeRanges": {
                "弹跳": [
                  16,
                  26
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 21,
              "maxValue": 33,
              "description": "触发时弹跳+21~33",
              "attributeRanges": {
                "弹跳": [
                  21,
                  33
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 27,
              "maxValue": 41,
              "description": "触发时弹跳+27~41",
              "attributeRanges": {
                "弹跳": [
                  27,
                  41
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 15,
      "name": "防守",
      "rawName": "防守",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "防守",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外防守属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 15,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 16,
              "maxValue": 26,
              "description": "触发时防守+16~26",
              "attributeRanges": {
                "防守": [
                  16,
                  26
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 21,
              "maxValue": 33,
              "description": "触发时防守+21~33",
              "attributeRanges": {
                "防守": [
                  21,
                  33
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 27,
              "maxValue": 41,
              "description": "触发时防守+27~41",
              "attributeRanges": {
                "防守": [
                  27,
                  41
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 16,
      "name": "体能",
      "rawName": "体能",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "体能",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外体能属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 16,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 16,
              "maxValue": 26,
              "description": "触发时体能+16~26",
              "attributeRanges": {
                "体能": [
                  16,
                  26
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 21,
              "maxValue": 33,
              "description": "触发时体能+21~33",
              "attributeRanges": {
                "体能": [
                  21,
                  33
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 27,
              "maxValue": 41,
              "description": "触发时体能+27~41",
              "attributeRanges": {
                "体能": [
                  27,
                  41
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 17,
      "name": "运控",
      "rawName": "运控",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "运控",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外运控属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 17,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 16,
              "maxValue": 26,
              "description": "触发时运控+16~26",
              "attributeRanges": {
                "运控": [
                  16,
                  26
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 21,
              "maxValue": 33,
              "description": "触发时运控+21~33",
              "attributeRanges": {
                "运控": [
                  21,
                  33
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 27,
              "maxValue": 41,
              "description": "触发时运控+27~41",
              "attributeRanges": {
                "运控": [
                  27,
                  41
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 18,
      "name": "意识",
      "rawName": "意识",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "意识",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外意识属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 18,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 16,
              "maxValue": 26,
              "description": "触发时意识+16~26",
              "attributeRanges": {
                "意识": [
                  16,
                  26
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 21,
              "maxValue": 33,
              "description": "触发时意识+21~33",
              "attributeRanges": {
                "意识": [
                  21,
                  33
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 27,
              "maxValue": 41,
              "description": "触发时意识+27~41",
              "attributeRanges": {
                "意识": [
                  27,
                  41
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 19,
      "name": "投射",
      "rawName": "投射",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "投射",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外投射属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 19,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 24,
              "maxValue": 36,
              "description": "触发时投射+24~36",
              "attributeRanges": {
                "投射": [
                  24,
                  36
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 30,
              "maxValue": 44,
              "description": "触发时投射+30~44",
              "attributeRanges": {
                "投射": [
                  30,
                  44
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 37,
              "maxValue": 53,
              "description": "触发时投射+37~53",
              "attributeRanges": {
                "投射": [
                  37,
                  53
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 20,
      "name": "弹跳",
      "rawName": "弹跳",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "弹跳",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外弹跳属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 20,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 24,
              "maxValue": 36,
              "description": "触发时弹跳+24~36",
              "attributeRanges": {
                "弹跳": [
                  24,
                  36
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 30,
              "maxValue": 44,
              "description": "触发时弹跳+30~44",
              "attributeRanges": {
                "弹跳": [
                  30,
                  44
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 37,
              "maxValue": 53,
              "description": "触发时弹跳+37~53",
              "attributeRanges": {
                "弹跳": [
                  37,
                  53
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 21,
      "name": "防守",
      "rawName": "防守",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "防守",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外防守属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 21,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 24,
              "maxValue": 36,
              "description": "触发时防守+24~36",
              "attributeRanges": {
                "防守": [
                  24,
                  36
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 30,
              "maxValue": 44,
              "description": "触发时防守+30~44",
              "attributeRanges": {
                "防守": [
                  30,
                  44
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 37,
              "maxValue": 53,
              "description": "触发时防守+37~53",
              "attributeRanges": {
                "防守": [
                  37,
                  53
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 22,
      "name": "体能",
      "rawName": "体能",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "体能",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外体能属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 22,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 24,
              "maxValue": 36,
              "description": "触发时体能+24~36",
              "attributeRanges": {
                "体能": [
                  24,
                  36
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 30,
              "maxValue": 44,
              "description": "触发时体能+30~44",
              "attributeRanges": {
                "体能": [
                  30,
                  44
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 37,
              "maxValue": 53,
              "description": "触发时体能+37~53",
              "attributeRanges": {
                "体能": [
                  37,
                  53
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 23,
      "name": "运控",
      "rawName": "运控",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "运控",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外运控属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 23,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 24,
              "maxValue": 36,
              "description": "触发时运控+24~36",
              "attributeRanges": {
                "运控": [
                  24,
                  36
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 30,
              "maxValue": 44,
              "description": "触发时运控+30~44",
              "attributeRanges": {
                "运控": [
                  30,
                  44
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 37,
              "maxValue": 53,
              "description": "触发时运控+37~53",
              "attributeRanges": {
                "运控": [
                  37,
                  53
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 24,
      "name": "意识",
      "rawName": "意识",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "意识",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外意识属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 24,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 24,
              "maxValue": 36,
              "description": "触发时意识+24~36",
              "attributeRanges": {
                "意识": [
                  24,
                  36
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 30,
              "maxValue": 44,
              "description": "触发时意识+30~44",
              "attributeRanges": {
                "意识": [
                  30,
                  44
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 37,
              "maxValue": 53,
              "description": "触发时意识+37~53",
              "attributeRanges": {
                "意识": [
                  37,
                  53
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 25,
      "name": "投射",
      "rawName": "投射",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "投射",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外投射属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 25,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 34,
              "maxValue": 48,
              "description": "触发时投射+34~48",
              "attributeRanges": {
                "投射": [
                  34,
                  48
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 41,
              "maxValue": 57,
              "description": "触发时投射+41~57",
              "attributeRanges": {
                "投射": [
                  41,
                  57
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 49,
              "maxValue": 65,
              "description": "触发时投射+49~65",
              "attributeRanges": {
                "投射": [
                  49,
                  65
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 26,
      "name": "弹跳",
      "rawName": "弹跳",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "弹跳",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外弹跳属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 26,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 34,
              "maxValue": 48,
              "description": "触发时弹跳+34~48",
              "attributeRanges": {
                "弹跳": [
                  34,
                  48
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 41,
              "maxValue": 57,
              "description": "触发时弹跳+41~57",
              "attributeRanges": {
                "弹跳": [
                  41,
                  57
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 49,
              "maxValue": 65,
              "description": "触发时弹跳+49~65",
              "attributeRanges": {
                "弹跳": [
                  49,
                  65
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 27,
      "name": "防守",
      "rawName": "防守",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "防守",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外防守属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 27,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 34,
              "maxValue": 48,
              "description": "触发时防守+34~48",
              "attributeRanges": {
                "防守": [
                  34,
                  48
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 41,
              "maxValue": 57,
              "description": "触发时防守+41~57",
              "attributeRanges": {
                "防守": [
                  41,
                  57
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 49,
              "maxValue": 65,
              "description": "触发时防守+49~65",
              "attributeRanges": {
                "防守": [
                  49,
                  65
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 28,
      "name": "体能",
      "rawName": "体能",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "体能",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外体能属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 28,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 34,
              "maxValue": 48,
              "description": "触发时体能+34~48",
              "attributeRanges": {
                "体能": [
                  34,
                  48
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 41,
              "maxValue": 57,
              "description": "触发时体能+41~57",
              "attributeRanges": {
                "体能": [
                  41,
                  57
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 49,
              "maxValue": 65,
              "description": "触发时体能+49~65",
              "attributeRanges": {
                "体能": [
                  49,
                  65
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 29,
      "name": "运控",
      "rawName": "运控",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "运控",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外运控属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 29,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 34,
              "maxValue": 48,
              "description": "触发时运控+34~48",
              "attributeRanges": {
                "运控": [
                  34,
                  48
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 41,
              "maxValue": 57,
              "description": "触发时运控+41~57",
              "attributeRanges": {
                "运控": [
                  41,
                  57
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 49,
              "maxValue": 65,
              "description": "触发时运控+49~65",
              "attributeRanges": {
                "运控": [
                  49,
                  65
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 30,
      "name": "意识",
      "rawName": "意识",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "意识",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外意识属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 30,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 34,
              "maxValue": 48,
              "description": "触发时意识+34~48",
              "attributeRanges": {
                "意识": [
                  34,
                  48
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 41,
              "maxValue": 57,
              "description": "触发时意识+41~57",
              "attributeRanges": {
                "意识": [
                  41,
                  57
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 49,
              "maxValue": 65,
              "description": "触发时意识+49~65",
              "attributeRanges": {
                "意识": [
                  49,
                  65
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 31,
      "name": "投射",
      "rawName": "投射",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "投射",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外投射属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 31,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 45,
              "maxValue": 59,
              "description": "触发时投射+45~59",
              "attributeRanges": {
                "投射": [
                  45,
                  59
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 52,
              "maxValue": 68,
              "description": "触发时投射+52~68",
              "attributeRanges": {
                "投射": [
                  52,
                  68
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 60,
              "maxValue": 76,
              "description": "触发时投射+60~76",
              "attributeRanges": {
                "投射": [
                  60,
                  76
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 32,
      "name": "弹跳",
      "rawName": "弹跳",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "弹跳",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外弹跳属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 32,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 45,
              "maxValue": 59,
              "description": "触发时弹跳+45~59",
              "attributeRanges": {
                "弹跳": [
                  45,
                  59
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 52,
              "maxValue": 68,
              "description": "触发时弹跳+52~68",
              "attributeRanges": {
                "弹跳": [
                  52,
                  68
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 60,
              "maxValue": 76,
              "description": "触发时弹跳+60~76",
              "attributeRanges": {
                "弹跳": [
                  60,
                  76
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 33,
      "name": "防守",
      "rawName": "防守",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "防守",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外防守属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 33,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 45,
              "maxValue": 59,
              "description": "触发时防守+45~59",
              "attributeRanges": {
                "防守": [
                  45,
                  59
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 52,
              "maxValue": 68,
              "description": "触发时防守+52~68",
              "attributeRanges": {
                "防守": [
                  52,
                  68
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 60,
              "maxValue": 76,
              "description": "触发时防守+60~76",
              "attributeRanges": {
                "防守": [
                  60,
                  76
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 34,
      "name": "体能",
      "rawName": "体能",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "体能",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外体能属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 34,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 45,
              "maxValue": 59,
              "description": "触发时体能+45~59",
              "attributeRanges": {
                "体能": [
                  45,
                  59
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 52,
              "maxValue": 68,
              "description": "触发时体能+52~68",
              "attributeRanges": {
                "体能": [
                  52,
                  68
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 60,
              "maxValue": 76,
              "description": "触发时体能+60~76",
              "attributeRanges": {
                "体能": [
                  60,
                  76
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 35,
      "name": "运控",
      "rawName": "运控",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "运控",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外运控属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 35,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 45,
              "maxValue": 59,
              "description": "触发时运控+45~59",
              "attributeRanges": {
                "运控": [
                  45,
                  59
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 52,
              "maxValue": 68,
              "description": "触发时运控+52~68",
              "attributeRanges": {
                "运控": [
                  52,
                  68
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 60,
              "maxValue": 76,
              "description": "触发时运控+60~76",
              "attributeRanges": {
                "运控": [
                  60,
                  76
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 36,
      "name": "意识",
      "rawName": "意识",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "意识",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外意识属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 36,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 45,
              "maxValue": 59,
              "description": "触发时意识+45~59",
              "attributeRanges": {
                "意识": [
                  45,
                  59
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 52,
              "maxValue": 68,
              "description": "触发时意识+52~68",
              "attributeRanges": {
                "意识": [
                  52,
                  68
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 60,
              "maxValue": 76,
              "description": "触发时意识+60~76",
              "attributeRanges": {
                "意识": [
                  60,
                  76
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 37,
      "name": "投射",
      "rawName": "投射",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "投射",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外投射属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 37,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 56,
              "maxValue": 70,
              "description": "触发时投射+56~70",
              "attributeRanges": {
                "投射": [
                  56,
                  70
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 63,
              "maxValue": 79,
              "description": "触发时投射+63~79",
              "attributeRanges": {
                "投射": [
                  63,
                  79
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 71,
              "maxValue": 87,
              "description": "触发时投射+71~87",
              "attributeRanges": {
                "投射": [
                  71,
                  87
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 38,
      "name": "弹跳",
      "rawName": "弹跳",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "弹跳",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外弹跳属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 38,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 56,
              "maxValue": 70,
              "description": "触发时弹跳+56~70",
              "attributeRanges": {
                "弹跳": [
                  56,
                  70
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 63,
              "maxValue": 79,
              "description": "触发时弹跳+63~79",
              "attributeRanges": {
                "弹跳": [
                  63,
                  79
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 71,
              "maxValue": 87,
              "description": "触发时弹跳+71~87",
              "attributeRanges": {
                "弹跳": [
                  71,
                  87
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 39,
      "name": "防守",
      "rawName": "防守",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "防守",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外防守属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 39,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 56,
              "maxValue": 70,
              "description": "触发时防守+56~70",
              "attributeRanges": {
                "防守": [
                  56,
                  70
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 63,
              "maxValue": 79,
              "description": "触发时防守+63~79",
              "attributeRanges": {
                "防守": [
                  63,
                  79
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 71,
              "maxValue": 87,
              "description": "触发时防守+71~87",
              "attributeRanges": {
                "防守": [
                  71,
                  87
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 40,
      "name": "体能",
      "rawName": "体能",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "体能",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外体能属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 40,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 56,
              "maxValue": 70,
              "description": "触发时体能+56~70",
              "attributeRanges": {
                "体能": [
                  56,
                  70
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 63,
              "maxValue": 79,
              "description": "触发时体能+63~79",
              "attributeRanges": {
                "体能": [
                  63,
                  79
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 71,
              "maxValue": 87,
              "description": "触发时体能+71~87",
              "attributeRanges": {
                "体能": [
                  71,
                  87
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 41,
      "name": "运控",
      "rawName": "运控",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "运控",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外运控属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 41,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 56,
              "maxValue": 70,
              "description": "触发时运控+56~70",
              "attributeRanges": {
                "运控": [
                  56,
                  70
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 63,
              "maxValue": 79,
              "description": "触发时运控+63~79",
              "attributeRanges": {
                "运控": [
                  63,
                  79
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 71,
              "maxValue": 87,
              "description": "触发时运控+71~87",
              "attributeRanges": {
                "运控": [
                  71,
                  87
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 42,
      "name": "意识",
      "rawName": "意识",
      "typeId": 1,
      "typeName": "属性",
      "chapterId": 0,
      "attribute": "意识",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外意识属性",
      "score": {
        "2": 2
      },
      "starScores": [
        2,
        2,
        2
      ],
      "starEffects": [
        {
          "effectId": 42,
          "effectType": 1,
          "effectTypeCode": "ATTR",
          "effectTypeName": "固定属性提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性",
          "stars": [
            {
              "star": 1,
              "score": 2,
              "minValue": 56,
              "maxValue": 70,
              "description": "触发时意识+56~70",
              "attributeRanges": {
                "意识": [
                  56,
                  70
                ]
              }
            },
            {
              "star": 2,
              "score": 2,
              "minValue": 63,
              "maxValue": 79,
              "description": "触发时意识+63~79",
              "attributeRanges": {
                "意识": [
                  63,
                  79
                ]
              }
            },
            {
              "star": 3,
              "score": 2,
              "minValue": 71,
              "maxValue": 87,
              "description": "触发时意识+71~87",
              "attributeRanges": {
                "意识": [
                  71,
                  87
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 101,
      "name": "投射上限",
      "rawName": "投射上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "投射",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外投射上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 101,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 15,
              "maxValue": 31,
              "description": "触发时投射上限+15~31",
              "attributeRanges": {
                "投射": [
                  15,
                  31
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 21,
              "maxValue": 36,
              "description": "触发时投射上限+21~36",
              "attributeRanges": {
                "投射": [
                  21,
                  36
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 26,
              "maxValue": 42,
              "description": "触发时投射上限+26~42",
              "attributeRanges": {
                "投射": [
                  26,
                  42
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 102,
      "name": "弹跳上限",
      "rawName": "弹跳上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "弹跳",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外弹跳上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 102,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 15,
              "maxValue": 31,
              "description": "触发时弹跳上限+15~31",
              "attributeRanges": {
                "弹跳": [
                  15,
                  31
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 21,
              "maxValue": 36,
              "description": "触发时弹跳上限+21~36",
              "attributeRanges": {
                "弹跳": [
                  21,
                  36
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 26,
              "maxValue": 42,
              "description": "触发时弹跳上限+26~42",
              "attributeRanges": {
                "弹跳": [
                  26,
                  42
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 103,
      "name": "防守上限",
      "rawName": "防守上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "防守",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外防守上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 103,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 15,
              "maxValue": 31,
              "description": "触发时防守上限+15~31",
              "attributeRanges": {
                "防守": [
                  15,
                  31
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 21,
              "maxValue": 36,
              "description": "触发时防守上限+21~36",
              "attributeRanges": {
                "防守": [
                  21,
                  36
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 26,
              "maxValue": 42,
              "description": "触发时防守上限+26~42",
              "attributeRanges": {
                "防守": [
                  26,
                  42
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 104,
      "name": "体能上限",
      "rawName": "体能上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "体能",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外体能上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 104,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 15,
              "maxValue": 31,
              "description": "触发时体能上限+15~31",
              "attributeRanges": {
                "体能": [
                  15,
                  31
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 21,
              "maxValue": 36,
              "description": "触发时体能上限+21~36",
              "attributeRanges": {
                "体能": [
                  21,
                  36
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 26,
              "maxValue": 42,
              "description": "触发时体能上限+26~42",
              "attributeRanges": {
                "体能": [
                  26,
                  42
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 105,
      "name": "运控上限",
      "rawName": "运控上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "运控",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外运控上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 105,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 15,
              "maxValue": 31,
              "description": "触发时运控上限+15~31",
              "attributeRanges": {
                "运控": [
                  15,
                  31
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 21,
              "maxValue": 36,
              "description": "触发时运控上限+21~36",
              "attributeRanges": {
                "运控": [
                  21,
                  36
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 26,
              "maxValue": 42,
              "description": "触发时运控上限+26~42",
              "attributeRanges": {
                "运控": [
                  26,
                  42
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 106,
      "name": "意识上限",
      "rawName": "意识上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "意识",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外意识上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 106,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 15,
              "maxValue": 31,
              "description": "触发时意识上限+15~31",
              "attributeRanges": {
                "意识": [
                  15,
                  31
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 21,
              "maxValue": 36,
              "description": "触发时意识上限+21~36",
              "attributeRanges": {
                "意识": [
                  21,
                  36
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 26,
              "maxValue": 42,
              "description": "触发时意识上限+26~42",
              "attributeRanges": {
                "意识": [
                  26,
                  42
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 107,
      "name": "投射上限",
      "rawName": "投射上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "投射",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外投射上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 107,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 31,
              "maxValue": 47,
              "description": "触发时投射上限+31~47",
              "attributeRanges": {
                "投射": [
                  31,
                  47
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 36,
              "maxValue": 53,
              "description": "触发时投射上限+36~53",
              "attributeRanges": {
                "投射": [
                  36,
                  53
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 42,
              "maxValue": 58,
              "description": "触发时投射上限+42~58",
              "attributeRanges": {
                "投射": [
                  42,
                  58
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 108,
      "name": "弹跳上限",
      "rawName": "弹跳上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "弹跳",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外弹跳上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 108,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 31,
              "maxValue": 47,
              "description": "触发时弹跳上限+31~47",
              "attributeRanges": {
                "弹跳": [
                  31,
                  47
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 36,
              "maxValue": 53,
              "description": "触发时弹跳上限+36~53",
              "attributeRanges": {
                "弹跳": [
                  36,
                  53
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 42,
              "maxValue": 58,
              "description": "触发时弹跳上限+42~58",
              "attributeRanges": {
                "弹跳": [
                  42,
                  58
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 109,
      "name": "防守上限",
      "rawName": "防守上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "防守",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外防守上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 109,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 31,
              "maxValue": 47,
              "description": "触发时防守上限+31~47",
              "attributeRanges": {
                "防守": [
                  31,
                  47
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 36,
              "maxValue": 53,
              "description": "触发时防守上限+36~53",
              "attributeRanges": {
                "防守": [
                  36,
                  53
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 42,
              "maxValue": 58,
              "description": "触发时防守上限+42~58",
              "attributeRanges": {
                "防守": [
                  42,
                  58
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 110,
      "name": "体能上限",
      "rawName": "体能上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "体能",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外体能上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 110,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 31,
              "maxValue": 47,
              "description": "触发时体能上限+31~47",
              "attributeRanges": {
                "体能": [
                  31,
                  47
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 36,
              "maxValue": 53,
              "description": "触发时体能上限+36~53",
              "attributeRanges": {
                "体能": [
                  36,
                  53
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 42,
              "maxValue": 58,
              "description": "触发时体能上限+42~58",
              "attributeRanges": {
                "体能": [
                  42,
                  58
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 111,
      "name": "运控上限",
      "rawName": "运控上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "运控",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外运控上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 111,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 31,
              "maxValue": 47,
              "description": "触发时运控上限+31~47",
              "attributeRanges": {
                "运控": [
                  31,
                  47
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 36,
              "maxValue": 53,
              "description": "触发时运控上限+36~53",
              "attributeRanges": {
                "运控": [
                  36,
                  53
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 42,
              "maxValue": 58,
              "description": "触发时运控上限+42~58",
              "attributeRanges": {
                "运控": [
                  42,
                  58
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 112,
      "name": "意识上限",
      "rawName": "意识上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "意识",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外意识上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 112,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 31,
              "maxValue": 47,
              "description": "触发时意识上限+31~47",
              "attributeRanges": {
                "意识": [
                  31,
                  47
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 36,
              "maxValue": 53,
              "description": "触发时意识上限+36~53",
              "attributeRanges": {
                "意识": [
                  36,
                  53
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 42,
              "maxValue": 58,
              "description": "触发时意识上限+42~58",
              "attributeRanges": {
                "意识": [
                  42,
                  58
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 113,
      "name": "投射上限",
      "rawName": "投射上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "投射",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外投射上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 113,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 47,
              "maxValue": 63,
              "description": "触发时投射上限+47~63",
              "attributeRanges": {
                "投射": [
                  47,
                  63
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 53,
              "maxValue": 68,
              "description": "触发时投射上限+53~68",
              "attributeRanges": {
                "投射": [
                  53,
                  68
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 58,
              "maxValue": 74,
              "description": "触发时投射上限+58~74",
              "attributeRanges": {
                "投射": [
                  58,
                  74
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 114,
      "name": "弹跳上限",
      "rawName": "弹跳上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "弹跳",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外弹跳上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 114,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 47,
              "maxValue": 63,
              "description": "触发时弹跳上限+47~63",
              "attributeRanges": {
                "弹跳": [
                  47,
                  63
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 53,
              "maxValue": 68,
              "description": "触发时弹跳上限+53~68",
              "attributeRanges": {
                "弹跳": [
                  53,
                  68
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 58,
              "maxValue": 74,
              "description": "触发时弹跳上限+58~74",
              "attributeRanges": {
                "弹跳": [
                  58,
                  74
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 115,
      "name": "防守上限",
      "rawName": "防守上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "防守",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外防守上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 115,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 47,
              "maxValue": 63,
              "description": "触发时防守上限+47~63",
              "attributeRanges": {
                "防守": [
                  47,
                  63
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 53,
              "maxValue": 68,
              "description": "触发时防守上限+53~68",
              "attributeRanges": {
                "防守": [
                  53,
                  68
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 58,
              "maxValue": 74,
              "description": "触发时防守上限+58~74",
              "attributeRanges": {
                "防守": [
                  58,
                  74
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 116,
      "name": "体能上限",
      "rawName": "体能上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "体能",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外体能上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 116,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 47,
              "maxValue": 63,
              "description": "触发时体能上限+47~63",
              "attributeRanges": {
                "体能": [
                  47,
                  63
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 53,
              "maxValue": 68,
              "description": "触发时体能上限+53~68",
              "attributeRanges": {
                "体能": [
                  53,
                  68
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 58,
              "maxValue": 74,
              "description": "触发时体能上限+58~74",
              "attributeRanges": {
                "体能": [
                  58,
                  74
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 117,
      "name": "运控上限",
      "rawName": "运控上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "运控",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外运控上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 117,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 47,
              "maxValue": 63,
              "description": "触发时运控上限+47~63",
              "attributeRanges": {
                "运控": [
                  47,
                  63
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 53,
              "maxValue": 68,
              "description": "触发时运控上限+53~68",
              "attributeRanges": {
                "运控": [
                  53,
                  68
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 58,
              "maxValue": 74,
              "description": "触发时运控上限+58~74",
              "attributeRanges": {
                "运控": [
                  58,
                  74
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 118,
      "name": "意识上限",
      "rawName": "意识上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "意识",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外意识上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 118,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 47,
              "maxValue": 63,
              "description": "触发时意识上限+47~63",
              "attributeRanges": {
                "意识": [
                  47,
                  63
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 53,
              "maxValue": 68,
              "description": "触发时意识上限+53~68",
              "attributeRanges": {
                "意识": [
                  53,
                  68
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 58,
              "maxValue": 74,
              "description": "触发时意识上限+58~74",
              "attributeRanges": {
                "意识": [
                  58,
                  74
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 119,
      "name": "投射上限",
      "rawName": "投射上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "投射",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外投射上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 119,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 63,
              "maxValue": 79,
              "description": "触发时投射上限+63~79",
              "attributeRanges": {
                "投射": [
                  63,
                  79
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 68,
              "maxValue": 85,
              "description": "触发时投射上限+68~85",
              "attributeRanges": {
                "投射": [
                  68,
                  85
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 74,
              "maxValue": 89,
              "description": "触发时投射上限+74~89",
              "attributeRanges": {
                "投射": [
                  74,
                  89
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 120,
      "name": "弹跳上限",
      "rawName": "弹跳上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "弹跳",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外弹跳上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 120,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 63,
              "maxValue": 79,
              "description": "触发时弹跳上限+63~79",
              "attributeRanges": {
                "弹跳": [
                  63,
                  79
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 68,
              "maxValue": 85,
              "description": "触发时弹跳上限+68~85",
              "attributeRanges": {
                "弹跳": [
                  68,
                  85
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 74,
              "maxValue": 89,
              "description": "触发时弹跳上限+74~89",
              "attributeRanges": {
                "弹跳": [
                  74,
                  89
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 121,
      "name": "防守上限",
      "rawName": "防守上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "防守",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外防守上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 121,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 63,
              "maxValue": 79,
              "description": "触发时防守上限+63~79",
              "attributeRanges": {
                "防守": [
                  63,
                  79
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 68,
              "maxValue": 85,
              "description": "触发时防守上限+68~85",
              "attributeRanges": {
                "防守": [
                  68,
                  85
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 74,
              "maxValue": 89,
              "description": "触发时防守上限+74~89",
              "attributeRanges": {
                "防守": [
                  74,
                  89
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 122,
      "name": "体能上限",
      "rawName": "体能上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "体能",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外体能上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 122,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 63,
              "maxValue": 79,
              "description": "触发时体能上限+63~79",
              "attributeRanges": {
                "体能": [
                  63,
                  79
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 68,
              "maxValue": 85,
              "description": "触发时体能上限+68~85",
              "attributeRanges": {
                "体能": [
                  68,
                  85
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 74,
              "maxValue": 89,
              "description": "触发时体能上限+74~89",
              "attributeRanges": {
                "体能": [
                  74,
                  89
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 123,
      "name": "运控上限",
      "rawName": "运控上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "运控",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外运控上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 123,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 63,
              "maxValue": 79,
              "description": "触发时运控上限+63~79",
              "attributeRanges": {
                "运控": [
                  63,
                  79
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 68,
              "maxValue": 85,
              "description": "触发时运控上限+68~85",
              "attributeRanges": {
                "运控": [
                  68,
                  85
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 74,
              "maxValue": 89,
              "description": "触发时运控上限+74~89",
              "attributeRanges": {
                "运控": [
                  74,
                  89
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 124,
      "name": "意识上限",
      "rawName": "意识上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "意识",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外意识上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 124,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 63,
              "maxValue": 79,
              "description": "触发时意识上限+63~79",
              "attributeRanges": {
                "意识": [
                  63,
                  79
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 68,
              "maxValue": 85,
              "description": "触发时意识上限+68~85",
              "attributeRanges": {
                "意识": [
                  68,
                  85
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 74,
              "maxValue": 89,
              "description": "触发时意识上限+74~89",
              "attributeRanges": {
                "意识": [
                  74,
                  89
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 125,
      "name": "投射上限",
      "rawName": "投射上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "投射",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外投射上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 125,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 79,
              "maxValue": 95,
              "description": "触发时投射上限+79~95",
              "attributeRanges": {
                "投射": [
                  79,
                  95
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 85,
              "maxValue": 100,
              "description": "触发时投射上限+85~100",
              "attributeRanges": {
                "投射": [
                  85,
                  100
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 89,
              "maxValue": 106,
              "description": "触发时投射上限+89~106",
              "attributeRanges": {
                "投射": [
                  89,
                  106
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 126,
      "name": "弹跳上限",
      "rawName": "弹跳上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "弹跳",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外弹跳上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 126,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 79,
              "maxValue": 95,
              "description": "触发时弹跳上限+79~95",
              "attributeRanges": {
                "弹跳": [
                  79,
                  95
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 85,
              "maxValue": 100,
              "description": "触发时弹跳上限+85~100",
              "attributeRanges": {
                "弹跳": [
                  85,
                  100
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 89,
              "maxValue": 106,
              "description": "触发时弹跳上限+89~106",
              "attributeRanges": {
                "弹跳": [
                  89,
                  106
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 127,
      "name": "防守上限",
      "rawName": "防守上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "防守",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外防守上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 127,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 79,
              "maxValue": 95,
              "description": "触发时防守上限+79~95",
              "attributeRanges": {
                "防守": [
                  79,
                  95
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 85,
              "maxValue": 100,
              "description": "触发时防守上限+85~100",
              "attributeRanges": {
                "防守": [
                  85,
                  100
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 89,
              "maxValue": 106,
              "description": "触发时防守上限+89~106",
              "attributeRanges": {
                "防守": [
                  89,
                  106
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 128,
      "name": "体能上限",
      "rawName": "体能上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "体能",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外体能上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 128,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 79,
              "maxValue": 95,
              "description": "触发时体能上限+79~95",
              "attributeRanges": {
                "体能": [
                  79,
                  95
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 85,
              "maxValue": 100,
              "description": "触发时体能上限+85~100",
              "attributeRanges": {
                "体能": [
                  85,
                  100
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 89,
              "maxValue": 106,
              "description": "触发时体能上限+89~106",
              "attributeRanges": {
                "体能": [
                  89,
                  106
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 129,
      "name": "运控上限",
      "rawName": "运控上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "运控",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外运控上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 129,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 79,
              "maxValue": 95,
              "description": "触发时运控上限+79~95",
              "attributeRanges": {
                "运控": [
                  79,
                  95
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 85,
              "maxValue": 100,
              "description": "触发时运控上限+85~100",
              "attributeRanges": {
                "运控": [
                  85,
                  100
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 89,
              "maxValue": 106,
              "description": "触发时运控上限+89~106",
              "attributeRanges": {
                "运控": [
                  89,
                  106
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 130,
      "name": "意识上限",
      "rawName": "意识上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "意识",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外意识上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 130,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 79,
              "maxValue": 95,
              "description": "触发时意识上限+79~95",
              "attributeRanges": {
                "意识": [
                  79,
                  95
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 85,
              "maxValue": 100,
              "description": "触发时意识上限+85~100",
              "attributeRanges": {
                "意识": [
                  85,
                  100
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 89,
              "maxValue": 106,
              "description": "触发时意识上限+89~106",
              "attributeRanges": {
                "意识": [
                  89,
                  106
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 131,
      "name": "投射上限",
      "rawName": "投射上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "投射",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外投射上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 131,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 106,
              "maxValue": 127,
              "description": "触发时投射上限+106~127",
              "attributeRanges": {
                "投射": [
                  106,
                  127
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 127,
              "maxValue": 138,
              "description": "触发时投射上限+127~138",
              "attributeRanges": {
                "投射": [
                  127,
                  138
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 138,
              "maxValue": 159,
              "description": "触发时投射上限+138~159",
              "attributeRanges": {
                "投射": [
                  138,
                  159
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 132,
      "name": "弹跳上限",
      "rawName": "弹跳上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "弹跳",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外弹跳上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 132,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 106,
              "maxValue": 127,
              "description": "触发时弹跳上限+106~127",
              "attributeRanges": {
                "弹跳": [
                  106,
                  127
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 127,
              "maxValue": 138,
              "description": "触发时弹跳上限+127~138",
              "attributeRanges": {
                "弹跳": [
                  127,
                  138
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 138,
              "maxValue": 159,
              "description": "触发时弹跳上限+138~159",
              "attributeRanges": {
                "弹跳": [
                  138,
                  159
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 133,
      "name": "防守上限",
      "rawName": "防守上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "防守",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外防守上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 133,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 106,
              "maxValue": 127,
              "description": "触发时防守上限+106~127",
              "attributeRanges": {
                "防守": [
                  106,
                  127
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 127,
              "maxValue": 138,
              "description": "触发时防守上限+127~138",
              "attributeRanges": {
                "防守": [
                  127,
                  138
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 138,
              "maxValue": 159,
              "description": "触发时防守上限+138~159",
              "attributeRanges": {
                "防守": [
                  138,
                  159
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 134,
      "name": "体能上限",
      "rawName": "体能上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "体能",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外体能上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 134,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 106,
              "maxValue": 127,
              "description": "触发时体能上限+106~127",
              "attributeRanges": {
                "体能": [
                  106,
                  127
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 127,
              "maxValue": 138,
              "description": "触发时体能上限+127~138",
              "attributeRanges": {
                "体能": [
                  127,
                  138
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 138,
              "maxValue": 159,
              "description": "触发时体能上限+138~159",
              "attributeRanges": {
                "体能": [
                  138,
                  159
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 135,
      "name": "运控上限",
      "rawName": "运控上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "运控",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外运控上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 135,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 106,
              "maxValue": 127,
              "description": "触发时运控上限+106~127",
              "attributeRanges": {
                "运控": [
                  106,
                  127
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 127,
              "maxValue": 138,
              "description": "触发时运控上限+127~138",
              "attributeRanges": {
                "运控": [
                  127,
                  138
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 138,
              "maxValue": 159,
              "description": "触发时运控上限+138~159",
              "attributeRanges": {
                "运控": [
                  138,
                  159
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 136,
      "name": "意识上限",
      "rawName": "意识上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "意识",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外意识上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 136,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 106,
              "maxValue": 127,
              "description": "触发时意识上限+106~127",
              "attributeRanges": {
                "意识": [
                  106,
                  127
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 127,
              "maxValue": 138,
              "description": "触发时意识上限+127~138",
              "attributeRanges": {
                "意识": [
                  127,
                  138
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 138,
              "maxValue": 159,
              "description": "触发时意识上限+138~159",
              "attributeRanges": {
                "意识": [
                  138,
                  159
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 137,
      "name": "投射上限",
      "rawName": "投射上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "投射",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外投射上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 137,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 116,
              "maxValue": 138,
              "description": "触发时投射上限+116~138",
              "attributeRanges": {
                "投射": [
                  116,
                  138
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 138,
              "maxValue": 148,
              "description": "触发时投射上限+138~148",
              "attributeRanges": {
                "投射": [
                  138,
                  148
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 148,
              "maxValue": 170,
              "description": "触发时投射上限+148~170",
              "attributeRanges": {
                "投射": [
                  148,
                  170
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 138,
      "name": "弹跳上限",
      "rawName": "弹跳上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "弹跳",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外弹跳上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 138,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 116,
              "maxValue": 138,
              "description": "触发时弹跳上限+116~138",
              "attributeRanges": {
                "弹跳": [
                  116,
                  138
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 138,
              "maxValue": 148,
              "description": "触发时弹跳上限+138~148",
              "attributeRanges": {
                "弹跳": [
                  138,
                  148
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 148,
              "maxValue": 170,
              "description": "触发时弹跳上限+148~170",
              "attributeRanges": {
                "弹跳": [
                  148,
                  170
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 139,
      "name": "防守上限",
      "rawName": "防守上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "防守",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外防守上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 139,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 116,
              "maxValue": 138,
              "description": "触发时防守上限+116~138",
              "attributeRanges": {
                "防守": [
                  116,
                  138
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 138,
              "maxValue": 148,
              "description": "触发时防守上限+138~148",
              "attributeRanges": {
                "防守": [
                  138,
                  148
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 148,
              "maxValue": 170,
              "description": "触发时防守上限+148~170",
              "attributeRanges": {
                "防守": [
                  148,
                  170
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 140,
      "name": "体能上限",
      "rawName": "体能上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "体能",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外体能上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 140,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 116,
              "maxValue": 138,
              "description": "触发时体能上限+116~138",
              "attributeRanges": {
                "体能": [
                  116,
                  138
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 138,
              "maxValue": 148,
              "description": "触发时体能上限+138~148",
              "attributeRanges": {
                "体能": [
                  138,
                  148
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 148,
              "maxValue": 170,
              "description": "触发时体能上限+148~170",
              "attributeRanges": {
                "体能": [
                  148,
                  170
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 141,
      "name": "运控上限",
      "rawName": "运控上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "运控",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外运控上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 141,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 116,
              "maxValue": 138,
              "description": "触发时运控上限+116~138",
              "attributeRanges": {
                "运控": [
                  116,
                  138
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 138,
              "maxValue": 148,
              "description": "触发时运控上限+138~148",
              "attributeRanges": {
                "运控": [
                  138,
                  148
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 148,
              "maxValue": 170,
              "description": "触发时运控上限+148~170",
              "attributeRanges": {
                "运控": [
                  148,
                  170
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 142,
      "name": "意识上限",
      "rawName": "意识上限",
      "typeId": 2,
      "typeName": "属性上限",
      "chapterId": 0,
      "attribute": "意识",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时获得额外意识上限",
      "score": {
        "2": 1
      },
      "starScores": [
        1,
        1,
        1
      ],
      "starEffects": [
        {
          "effectId": 142,
          "effectType": 3,
          "effectTypeCode": "ATTR_MAX",
          "effectTypeName": "属性上限提升",
          "effectTypeNote": "传承触发时按星级区间提升对应基础属性上限",
          "stars": [
            {
              "star": 1,
              "score": 1,
              "minValue": 116,
              "maxValue": 138,
              "description": "触发时意识上限+116~138",
              "attributeRanges": {
                "意识": [
                  116,
                  138
                ]
              }
            },
            {
              "star": 2,
              "score": 1,
              "minValue": 138,
              "maxValue": 148,
              "description": "触发时意识上限+138~148",
              "attributeRanges": {
                "意识": [
                  138,
                  148
                ]
              }
            },
            {
              "star": 3,
              "score": 1,
              "minValue": 148,
              "maxValue": 170,
              "description": "触发时意识上限+148~170",
              "attributeRanges": {
                "意识": [
                  148,
                  170
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "entryId": 201,
      "name": "控卫适性",
      "rawName": "<color=#FFA500>控卫适性</color>",
      "typeId": 3,
      "typeName": "适性",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "控卫",
      "isLegacySkillEntry": false,
      "description": "触发时提高控卫的适性",
      "score": [
        [
          20,
          40,
          60
        ]
      ],
      "starScores": [
        20,
        40,
        60
      ],
      "starEffects": [
        {
          "effectId": 201,
          "effectType": 2,
          "effectTypeCode": "DUTY_SUIT",
          "effectTypeName": "位置适性提升",
          "effectTypeNote": "传承触发时对应球场位置适性提升1阶（最高至S）；星级提高笔记评分、局内传承触发概率与子代高星继承权重",
          "stars": [
            {
              "star": 1,
              "score": 20,
              "description": "触发时提高控卫的适性 1 阶（最高至 S；1★基础触发率，笔记评分+20）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 40,
              "description": "触发时提高控卫的适性 1 阶（最高至 S；2★触发率与高星继承权重提升，笔记评分+40）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 60,
              "description": "触发时提高控卫的适性 1 阶（最高至 S；3★触发率与高星继承权重最高，笔记评分+60）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 202,
      "name": "分卫适性",
      "rawName": "<color=#FFA500>分卫适性</color>",
      "typeId": 3,
      "typeName": "适性",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "分卫",
      "isLegacySkillEntry": false,
      "description": "触发时提高分卫的适性",
      "score": [
        [
          20,
          40,
          60
        ]
      ],
      "starScores": [
        20,
        40,
        60
      ],
      "starEffects": [
        {
          "effectId": 202,
          "effectType": 2,
          "effectTypeCode": "DUTY_SUIT",
          "effectTypeName": "位置适性提升",
          "effectTypeNote": "传承触发时对应球场位置适性提升1阶（最高至S）；星级提高笔记评分、局内传承触发概率与子代高星继承权重",
          "stars": [
            {
              "star": 1,
              "score": 20,
              "description": "触发时提高分卫的适性 1 阶（最高至 S；1★基础触发率，笔记评分+20）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 40,
              "description": "触发时提高分卫的适性 1 阶（最高至 S；2★触发率与高星继承权重提升，笔记评分+40）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 60,
              "description": "触发时提高分卫的适性 1 阶（最高至 S；3★触发率与高星继承权重最高，笔记评分+60）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 203,
      "name": "小前适性",
      "rawName": "<color=#FFA500>小前适性</color>",
      "typeId": 3,
      "typeName": "适性",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "小前",
      "isLegacySkillEntry": false,
      "description": "触发时提高小前的适性",
      "score": [
        [
          20,
          40,
          60
        ]
      ],
      "starScores": [
        20,
        40,
        60
      ],
      "starEffects": [
        {
          "effectId": 203,
          "effectType": 2,
          "effectTypeCode": "DUTY_SUIT",
          "effectTypeName": "位置适性提升",
          "effectTypeNote": "传承触发时对应球场位置适性提升1阶（最高至S）；星级提高笔记评分、局内传承触发概率与子代高星继承权重",
          "stars": [
            {
              "star": 1,
              "score": 20,
              "description": "触发时提高小前的适性 1 阶（最高至 S；1★基础触发率，笔记评分+20）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 40,
              "description": "触发时提高小前的适性 1 阶（最高至 S；2★触发率与高星继承权重提升，笔记评分+40）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 60,
              "description": "触发时提高小前的适性 1 阶（最高至 S；3★触发率与高星继承权重最高，笔记评分+60）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 204,
      "name": "大前适性",
      "rawName": "<color=#FFA500>大前适性</color>",
      "typeId": 3,
      "typeName": "适性",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "大前",
      "isLegacySkillEntry": false,
      "description": "触发时提高大前的适性",
      "score": [
        [
          20,
          40,
          60
        ]
      ],
      "starScores": [
        20,
        40,
        60
      ],
      "starEffects": [
        {
          "effectId": 204,
          "effectType": 2,
          "effectTypeCode": "DUTY_SUIT",
          "effectTypeName": "位置适性提升",
          "effectTypeNote": "传承触发时对应球场位置适性提升1阶（最高至S）；星级提高笔记评分、局内传承触发概率与子代高星继承权重",
          "stars": [
            {
              "star": 1,
              "score": 20,
              "description": "触发时提高大前的适性 1 阶（最高至 S；1★基础触发率，笔记评分+20）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 40,
              "description": "触发时提高大前的适性 1 阶（最高至 S；2★触发率与高星继承权重提升，笔记评分+40）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 60,
              "description": "触发时提高大前的适性 1 阶（最高至 S；3★触发率与高星继承权重最高，笔记评分+60）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 205,
      "name": "中锋适性",
      "rawName": "<color=#FFA500>中锋适性</color>",
      "typeId": 3,
      "typeName": "适性",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "中锋",
      "isLegacySkillEntry": false,
      "description": "触发时提高中锋的适性",
      "score": [
        [
          20,
          40,
          60
        ]
      ],
      "starScores": [
        20,
        40,
        60
      ],
      "starEffects": [
        {
          "effectId": 205,
          "effectType": 2,
          "effectTypeCode": "DUTY_SUIT",
          "effectTypeName": "位置适性提升",
          "effectTypeNote": "传承触发时对应球场位置适性提升1阶（最高至S）；星级提高笔记评分、局内传承触发概率与子代高星继承权重",
          "stars": [
            {
              "star": 1,
              "score": 20,
              "description": "触发时提高中锋的适性 1 阶（最高至 S；1★基础触发率，笔记评分+20）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 40,
              "description": "触发时提高中锋的适性 1 阶（最高至 S；2★触发率与高星继承权重提升，笔记评分+40）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 60,
              "description": "触发时提高中锋的适性 1 阶（最高至 S；3★触发率与高星继承权重最高，笔记评分+60）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 206,
      "name": "控卫适性",
      "rawName": "<color=#FFA500>控卫适性</color>",
      "typeId": 3,
      "typeName": "适性",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "控卫",
      "isLegacySkillEntry": false,
      "description": "触发时提高控卫的适性",
      "score": [
        [
          20,
          40,
          60
        ]
      ],
      "starScores": [
        20,
        40,
        60
      ],
      "starEffects": [
        {
          "effectId": 201,
          "effectType": 2,
          "effectTypeCode": "DUTY_SUIT",
          "effectTypeName": "位置适性提升",
          "effectTypeNote": "传承触发时对应球场位置适性提升1阶（最高至S）；星级提高笔记评分、局内传承触发概率与子代高星继承权重",
          "stars": [
            {
              "star": 1,
              "score": 20,
              "description": "触发时提高控卫的适性 1 阶（最高至 S；1★基础触发率，笔记评分+20）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 40,
              "description": "触发时提高控卫的适性 1 阶（最高至 S；2★触发率与高星继承权重提升，笔记评分+40）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 60,
              "description": "触发时提高控卫的适性 1 阶（最高至 S；3★触发率与高星继承权重最高，笔记评分+60）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 207,
      "name": "分卫适性",
      "rawName": "<color=#FFA500>分卫适性</color>",
      "typeId": 3,
      "typeName": "适性",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "分卫",
      "isLegacySkillEntry": false,
      "description": "触发时提高分卫的适性",
      "score": [
        [
          20,
          40,
          60
        ]
      ],
      "starScores": [
        20,
        40,
        60
      ],
      "starEffects": [
        {
          "effectId": 202,
          "effectType": 2,
          "effectTypeCode": "DUTY_SUIT",
          "effectTypeName": "位置适性提升",
          "effectTypeNote": "传承触发时对应球场位置适性提升1阶（最高至S）；星级提高笔记评分、局内传承触发概率与子代高星继承权重",
          "stars": [
            {
              "star": 1,
              "score": 20,
              "description": "触发时提高分卫的适性 1 阶（最高至 S；1★基础触发率，笔记评分+20）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 40,
              "description": "触发时提高分卫的适性 1 阶（最高至 S；2★触发率与高星继承权重提升，笔记评分+40）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 60,
              "description": "触发时提高分卫的适性 1 阶（最高至 S；3★触发率与高星继承权重最高，笔记评分+60）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 208,
      "name": "小前适性",
      "rawName": "<color=#FFA500>小前适性</color>",
      "typeId": 3,
      "typeName": "适性",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "小前",
      "isLegacySkillEntry": false,
      "description": "触发时提高小前的适性",
      "score": [
        [
          20,
          40,
          60
        ]
      ],
      "starScores": [
        20,
        40,
        60
      ],
      "starEffects": [
        {
          "effectId": 203,
          "effectType": 2,
          "effectTypeCode": "DUTY_SUIT",
          "effectTypeName": "位置适性提升",
          "effectTypeNote": "传承触发时对应球场位置适性提升1阶（最高至S）；星级提高笔记评分、局内传承触发概率与子代高星继承权重",
          "stars": [
            {
              "star": 1,
              "score": 20,
              "description": "触发时提高小前的适性 1 阶（最高至 S；1★基础触发率，笔记评分+20）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 40,
              "description": "触发时提高小前的适性 1 阶（最高至 S；2★触发率与高星继承权重提升，笔记评分+40）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 60,
              "description": "触发时提高小前的适性 1 阶（最高至 S；3★触发率与高星继承权重最高，笔记评分+60）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 209,
      "name": "大前适性",
      "rawName": "<color=#FFA500>大前适性</color>",
      "typeId": 3,
      "typeName": "适性",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "大前",
      "isLegacySkillEntry": false,
      "description": "触发时提高大前的适性",
      "score": [
        [
          20,
          40,
          60
        ]
      ],
      "starScores": [
        20,
        40,
        60
      ],
      "starEffects": [
        {
          "effectId": 204,
          "effectType": 2,
          "effectTypeCode": "DUTY_SUIT",
          "effectTypeName": "位置适性提升",
          "effectTypeNote": "传承触发时对应球场位置适性提升1阶（最高至S）；星级提高笔记评分、局内传承触发概率与子代高星继承权重",
          "stars": [
            {
              "star": 1,
              "score": 20,
              "description": "触发时提高大前的适性 1 阶（最高至 S；1★基础触发率，笔记评分+20）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 40,
              "description": "触发时提高大前的适性 1 阶（最高至 S；2★触发率与高星继承权重提升，笔记评分+40）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 60,
              "description": "触发时提高大前的适性 1 阶（最高至 S；3★触发率与高星继承权重最高，笔记评分+60）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 210,
      "name": "中锋适性",
      "rawName": "<color=#FFA500>中锋适性</color>",
      "typeId": 3,
      "typeName": "适性",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "中锋",
      "isLegacySkillEntry": false,
      "description": "触发时提高中锋的适性",
      "score": [
        [
          20,
          40,
          60
        ]
      ],
      "starScores": [
        20,
        40,
        60
      ],
      "starEffects": [
        {
          "effectId": 205,
          "effectType": 2,
          "effectTypeCode": "DUTY_SUIT",
          "effectTypeName": "位置适性提升",
          "effectTypeNote": "传承触发时对应球场位置适性提升1阶（最高至S）；星级提高笔记评分、局内传承触发概率与子代高星继承权重",
          "stars": [
            {
              "star": 1,
              "score": 20,
              "description": "触发时提高中锋的适性 1 阶（最高至 S；1★基础触发率，笔记评分+20）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 40,
              "description": "触发时提高中锋的适性 1 阶（最高至 S；2★触发率与高星继承权重提升，笔记评分+40）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 60,
              "description": "触发时提高中锋的适性 1 阶（最高至 S；3★触发率与高星继承权重最高，笔记评分+60）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 301,
      "name": "星菱",
      "rawName": "星菱",
      "typeId": 101,
      "typeName": "训练上",
      "chapterId": 3,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高投射和弹跳",
      "score": [
        [
          3,
          8,
          12
        ]
      ],
      "starScores": [
        3,
        8,
        12
      ],
      "starEffects": [
        {
          "effectId": 301,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 3,
              "minValue": 2,
              "maxValue": 6,
              "description": "触发时投射或弹跳随机+2~6（候选档位：+2/+4/+6，笔记评分+3）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 8,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时投射或弹跳随机+6~10（候选档位：+6/+8/+10，笔记评分+8）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 12,
              "minValue": 8,
              "maxValue": 12,
              "description": "触发时投射或弹跳随机+8~12（候选档位：+8/+10/+12，笔记评分+12）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 302,
      "name": "山垣",
      "rawName": "山垣",
      "typeId": 101,
      "typeName": "训练上",
      "chapterId": 3,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高弹跳和防守",
      "score": [
        [
          6,
          8,
          13
        ]
      ],
      "starScores": [
        6,
        8,
        13
      ],
      "starEffects": [
        {
          "effectId": 302,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 6,
              "minValue": 2,
              "maxValue": 6,
              "description": "触发时弹跳或防守随机+2~6（候选档位：+2/+4/+6，笔记评分+6）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 8,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时弹跳或防守随机+6~10（候选档位：+6/+8/+10，笔记评分+8）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "minValue": 8,
              "maxValue": 12,
              "description": "触发时弹跳或防守随机+8~12（候选档位：+8/+10/+12，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 303,
      "name": "御影",
      "rawName": "御影",
      "typeId": 101,
      "typeName": "训练上",
      "chapterId": 3,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高防守和体能",
      "score": [
        [
          4,
          9,
          13
        ]
      ],
      "starScores": [
        4,
        9,
        13
      ],
      "starEffects": [
        {
          "effectId": 303,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 4,
              "minValue": 2,
              "maxValue": 6,
              "description": "触发时防守或体能随机+2~6（候选档位：+2/+4/+6，笔记评分+4）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时防守或体能随机+6~10（候选档位：+6/+8/+10，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "minValue": 8,
              "maxValue": 12,
              "description": "触发时防守或体能随机+8~12（候选档位：+8/+10/+12，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 304,
      "name": "花咲",
      "rawName": "花咲",
      "typeId": 102,
      "typeName": "训练下-普通",
      "chapterId": 4,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高体能和运控",
      "score": [
        [
          4,
          10,
          15
        ]
      ],
      "starScores": [
        4,
        10,
        15
      ],
      "starEffects": [
        {
          "effectId": 304,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 4,
              "minValue": 2,
              "maxValue": 6,
              "description": "触发时体能或运控随机+2~6（候选档位：+2/+4/+6，笔记评分+4）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 10,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时体能或运控随机+6~10（候选档位：+6/+8/+10，笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 15,
              "minValue": 8,
              "maxValue": 12,
              "description": "触发时体能或运控随机+8~12（候选档位：+8/+10/+12，笔记评分+15）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 305,
      "name": "育英",
      "rawName": "育英",
      "typeId": 102,
      "typeName": "训练下-普通",
      "chapterId": 4,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高运控和意识",
      "score": [
        [
          6,
          9,
          14
        ]
      ],
      "starScores": [
        6,
        9,
        14
      ],
      "starEffects": [
        {
          "effectId": 305,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 6,
              "minValue": 2,
              "maxValue": 6,
              "description": "触发时运控或意识随机+2~6（候选档位：+2/+4/+6，笔记评分+6）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时运控或意识随机+6~10（候选档位：+6/+8/+10，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 14,
              "minValue": 8,
              "maxValue": 12,
              "description": "触发时运控或意识随机+8~12（候选档位：+8/+10/+12，笔记评分+14）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 306,
      "name": "白鸟",
      "rawName": "白鸟",
      "typeId": 102,
      "typeName": "训练下-普通",
      "chapterId": 4,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高意识和投射",
      "score": [
        [
          6,
          9,
          13
        ]
      ],
      "starScores": [
        6,
        9,
        13
      ],
      "starEffects": [
        {
          "effectId": 306,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 6,
              "minValue": 2,
              "maxValue": 6,
              "description": "触发时投射或意识随机+2~6（候选档位：+2/+4/+6，笔记评分+6）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时投射或意识随机+6~10（候选档位：+6/+8/+10，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "minValue": 8,
              "maxValue": 12,
              "description": "触发时投射或意识随机+8~12（候选档位：+8/+10/+12，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 307,
      "name": "崇德馆",
      "rawName": "崇德馆",
      "typeId": 102,
      "typeName": "训练下-普通",
      "chapterId": 4,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高属性",
      "score": [
        [
          4,
          10,
          15
        ]
      ],
      "starScores": [
        4,
        10,
        15
      ],
      "starEffects": [
        {
          "effectId": 307,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 4,
              "minValue": 1,
              "maxValue": 5,
              "description": "触发时全属性中随机1项随机+1~5（候选档位：+1/+3/+5，笔记评分+4）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 10,
              "minValue": 3,
              "maxValue": 7,
              "description": "触发时全属性中随机1项随机+3~7（候选档位：+3/+5/+7，笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 15,
              "minValue": 5,
              "maxValue": 9,
              "description": "触发时全属性中随机1项随机+5~9（候选档位：+5/+7/+9，笔记评分+15）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 314,
      "name": "经理的超能力",
      "rawName": "<color=#B57EDC>经理的超能力</color>",
      "typeId": 103,
      "typeName": "训练下-困难",
      "chapterId": 5,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时大幅提高属性",
      "score": [
        [
          60,
          120,
          180
        ]
      ],
      "starScores": [
        60,
        120,
        180
      ],
      "starEffects": [
        {
          "effectId": 314,
          "effectType": 7,
          "effectTypeCode": "ATTR_ALL",
          "effectTypeName": "全六维属性提升",
          "effectTypeNote": "传承触发时全六维属性（投射/弹跳/防守/体能/运控/意识）同时按星级区间提升",
          "stars": [
            {
              "star": 1,
              "score": 60,
              "minValue": 36,
              "maxValue": 40,
              "description": "触发时全六维属性各+36~40（笔记评分+60）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 120,
              "minValue": 40,
              "maxValue": 45,
              "description": "触发时全六维属性各+40~45（笔记评分+120）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 180,
              "minValue": 45,
              "maxValue": 50,
              "description": "触发时全六维属性各+45~50（笔记评分+180）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 315,
      "name": "经理的超能力",
      "rawName": "<color=#B57EDC>经理的超能力</color>",
      "typeId": 103,
      "typeName": "训练下-困难",
      "chapterId": 5,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时大幅提高属性",
      "score": [
        [
          20,
          45,
          65
        ]
      ],
      "starScores": [
        20,
        45,
        65
      ],
      "starEffects": [
        {
          "effectId": 315,
          "effectType": 7,
          "effectTypeCode": "ATTR_ALL",
          "effectTypeName": "全六维属性提升",
          "effectTypeNote": "传承触发时全六维属性（投射/弹跳/防守/体能/运控/意识）同时按星级区间提升",
          "stars": [
            {
              "star": 1,
              "score": 20,
              "minValue": 12,
              "maxValue": 14,
              "description": "触发时全六维属性各+12~14（笔记评分+20）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 45,
              "minValue": 14,
              "maxValue": 16,
              "description": "触发时全六维属性各+14~16（笔记评分+45）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 65,
              "minValue": 16,
              "maxValue": 18,
              "description": "触发时全六维属性各+16~18（笔记评分+65）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 316,
      "name": "经理的超能力",
      "rawName": "<color=#B57EDC>经理的超能力</color>",
      "typeId": 103,
      "typeName": "训练下-困难",
      "chapterId": 5,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时大幅提高属性",
      "score": [
        [
          30,
          60,
          85
        ]
      ],
      "starScores": [
        30,
        60,
        85
      ],
      "starEffects": [
        {
          "effectId": 316,
          "effectType": 7,
          "effectTypeCode": "ATTR_ALL",
          "effectTypeName": "全六维属性提升",
          "effectTypeNote": "传承触发时全六维属性（投射/弹跳/防守/体能/运控/意识）同时按星级区间提升",
          "stars": [
            {
              "star": 1,
              "score": 30,
              "minValue": 18,
              "maxValue": 20,
              "description": "触发时全六维属性各+18~20（笔记评分+30）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 60,
              "minValue": 20,
              "maxValue": 22,
              "description": "触发时全六维属性各+20~22（笔记评分+60）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 85,
              "minValue": 22,
              "maxValue": 24,
              "description": "触发时全六维属性各+22~24（笔记评分+85）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 317,
      "name": "经理的超能力",
      "rawName": "<color=#B57EDC>经理的超能力</color>",
      "typeId": 103,
      "typeName": "训练下-困难",
      "chapterId": 5,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时大幅提高属性",
      "score": [
        [
          45,
          85,
          130
        ]
      ],
      "starScores": [
        45,
        85,
        130
      ],
      "starEffects": [
        {
          "effectId": 317,
          "effectType": 7,
          "effectTypeCode": "ATTR_ALL",
          "effectTypeName": "全六维属性提升",
          "effectTypeNote": "传承触发时全六维属性（投射/弹跳/防守/体能/运控/意识）同时按星级区间提升",
          "stars": [
            {
              "star": 1,
              "score": 45,
              "minValue": 24,
              "maxValue": 28,
              "description": "触发时全六维属性各+24~28（笔记评分+45）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 85,
              "minValue": 28,
              "maxValue": 32,
              "description": "触发时全六维属性各+28~32（笔记评分+85）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 130,
              "minValue": 32,
              "maxValue": 36,
              "description": "触发时全六维属性各+32~36（笔记评分+130）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 501,
      "name": "${role_name}契合",
      "rawName": "${role_name}契合",
      "typeId": 5,
      "typeName": "契合度",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "在编队时提高和${role_name}的契合度。如果在学习时触发，提高主力分解出契合度词条的概率",
      "score": [
        [
          10,
          20,
          30
        ]
      ],
      "starScores": [
        10,
        20,
        30
      ],
      "starEffects": [
        {
          "effectId": 501,
          "effectType": 6,
          "effectTypeCode": "PROB_OR_HARMONY",
          "effectTypeName": "契合度或技能出现率提升",
          "effectTypeNote": "#501提升编队角色相性(+2/+5/+10)与分解概率(+3%/+6%/+10%)；#601提升对应技能在训练三选一中的出现概率(+3%/+6%/+10%)",
          "stars": [
            {
              "star": 1,
              "score": 10,
              "description": "编队时与对应角色相性+2；局内触发时提高主力分解出契合度词条概率+3%（笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 20,
              "description": "编队时与对应角色相性+5；局内触发时提高主力分解出契合度词条概率+6%（笔记评分+20）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 30,
              "description": "编队时与对应角色相性+10；局内触发时提高主力分解出契合度词条概率+10%（笔记评分+30）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 601,
      "name": "${skill_name}",
      "rawName": "<color=#B57EDC>${skill_name}</color>",
      "typeId": 6,
      "typeName": "技能",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "提高${skill_name}在训练三选一中出现的概率",
      "score": [
        [
          10,
          20,
          30
        ]
      ],
      "starScores": [
        10,
        20,
        30
      ],
      "starEffects": [
        {
          "effectId": 501,
          "effectType": 6,
          "effectTypeCode": "PROB_OR_HARMONY",
          "effectTypeName": "契合度或技能出现率提升",
          "effectTypeNote": "#501提升编队角色相性(+2/+5/+10)与分解概率(+3%/+6%/+10%)；#601提升对应技能在训练三选一中的出现概率(+3%/+6%/+10%)",
          "stars": [
            {
              "star": 1,
              "score": 10,
              "description": "提高对应技能（1阶普通技能）在训练三选一中出现的概率+3%（笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 20,
              "description": "提高对应技能（2阶高级技能）在训练三选一中出现的概率+6%（笔记评分+20）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 30,
              "description": "提高对应技能（2阶高级技能）在训练三选一中出现的概率+10%（笔记评分+30）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10001,
      "name": "投射精通",
      "rawName": "投射精通",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「投射精通」：中幅提升投射属性（现版本技能效果：回合开始，小概率大幅提升投射属性，持续1回合）",
      "score": [
        [
          5,
          9,
          13
        ]
      ],
      "starScores": [
        5,
        9,
        13
      ],
      "starEffects": [
        {
          "effectId": 10001,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 5,
              "description": "触发时获得技能「投射精通」：中幅提升投射属性（现版本技能效果：回合开始，小概率大幅提升投射属性，持续1回合）（1★提高传承触发率，笔记评分+5）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "description": "触发时获得技能「投射精通」：中幅提升投射属性（现版本技能效果：回合开始，小概率大幅提升投射属性，持续1回合）（2★提高传承触发率，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "description": "触发时获得技能「投射精通」：中幅提升投射属性（现版本技能效果：回合开始，小概率大幅提升投射属性，持续1回合）（3★提高传承触发率，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10002,
      "name": "弹跳精通",
      "rawName": "弹跳精通",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「弹跳精通」：中幅提升弹跳属性（现版本技能效果：回合开始，小概率大幅提升弹跳属性，持续1回合）",
      "score": [
        [
          5,
          9,
          14
        ]
      ],
      "starScores": [
        5,
        9,
        14
      ],
      "starEffects": [
        {
          "effectId": 10002,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 5,
              "description": "触发时获得技能「弹跳精通」：中幅提升弹跳属性（现版本技能效果：回合开始，小概率大幅提升弹跳属性，持续1回合）（1★提高传承触发率，笔记评分+5）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "description": "触发时获得技能「弹跳精通」：中幅提升弹跳属性（现版本技能效果：回合开始，小概率大幅提升弹跳属性，持续1回合）（2★提高传承触发率，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 14,
              "description": "触发时获得技能「弹跳精通」：中幅提升弹跳属性（现版本技能效果：回合开始，小概率大幅提升弹跳属性，持续1回合）（3★提高传承触发率，笔记评分+14）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10003,
      "name": "防守精通",
      "rawName": "防守精通",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「防守精通」：中幅提升防守属性（现版本技能效果：回合开始，小概率大幅提升防守属性，持续1回合）",
      "score": [
        [
          5,
          8,
          14
        ]
      ],
      "starScores": [
        5,
        8,
        14
      ],
      "starEffects": [
        {
          "effectId": 10003,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 5,
              "description": "触发时获得技能「防守精通」：中幅提升防守属性（现版本技能效果：回合开始，小概率大幅提升防守属性，持续1回合）（1★提高传承触发率，笔记评分+5）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 8,
              "description": "触发时获得技能「防守精通」：中幅提升防守属性（现版本技能效果：回合开始，小概率大幅提升防守属性，持续1回合）（2★提高传承触发率，笔记评分+8）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 14,
              "description": "触发时获得技能「防守精通」：中幅提升防守属性（现版本技能效果：回合开始，小概率大幅提升防守属性，持续1回合）（3★提高传承触发率，笔记评分+14）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10004,
      "name": "运控精通",
      "rawName": "运控精通",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「运控精通」：中幅提升运控属性（现版本技能效果：回合开始，小概率大幅提升运控属性，持续1回合）",
      "score": [
        [
          5,
          10,
          13
        ]
      ],
      "starScores": [
        5,
        10,
        13
      ],
      "starEffects": [
        {
          "effectId": 10004,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 5,
              "description": "触发时获得技能「运控精通」：中幅提升运控属性（现版本技能效果：回合开始，小概率大幅提升运控属性，持续1回合）（1★提高传承触发率，笔记评分+5）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 10,
              "description": "触发时获得技能「运控精通」：中幅提升运控属性（现版本技能效果：回合开始，小概率大幅提升运控属性，持续1回合）（2★提高传承触发率，笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "description": "触发时获得技能「运控精通」：中幅提升运控属性（现版本技能效果：回合开始，小概率大幅提升运控属性，持续1回合）（3★提高传承触发率，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10005,
      "name": "意识精通",
      "rawName": "意识精通",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「意识精通」：中幅提升意识属性（现版本技能效果：回合开始，小概率大幅提升意识属性，持续1回合）",
      "score": [
        [
          4,
          10,
          14
        ]
      ],
      "starScores": [
        4,
        10,
        14
      ],
      "starEffects": [
        {
          "effectId": 10005,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 4,
              "description": "触发时获得技能「意识精通」：中幅提升意识属性（现版本技能效果：回合开始，小概率大幅提升意识属性，持续1回合）（1★提高传承触发率，笔记评分+4）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 10,
              "description": "触发时获得技能「意识精通」：中幅提升意识属性（现版本技能效果：回合开始，小概率大幅提升意识属性，持续1回合）（2★提高传承触发率，笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 14,
              "description": "触发时获得技能「意识精通」：中幅提升意识属性（现版本技能效果：回合开始，小概率大幅提升意识属性，持续1回合）（3★提高传承触发率，笔记评分+14）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10006,
      "name": "体能精通",
      "rawName": "体能精通",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「体能精通」：中幅提升体能属性（现版本技能效果：回合开始，小概率大幅提升体能属性，持续1回合）",
      "score": [
        [
          4,
          9,
          14
        ]
      ],
      "starScores": [
        4,
        9,
        14
      ],
      "starEffects": [
        {
          "effectId": 10006,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 4,
              "description": "触发时获得技能「体能精通」：中幅提升体能属性（现版本技能效果：回合开始，小概率大幅提升体能属性，持续1回合）（1★提高传承触发率，笔记评分+4）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "description": "触发时获得技能「体能精通」：中幅提升体能属性（现版本技能效果：回合开始，小概率大幅提升体能属性，持续1回合）（2★提高传承触发率，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 14,
              "description": "触发时获得技能「体能精通」：中幅提升体能属性（现版本技能效果：回合开始，小概率大幅提升体能属性，持续1回合）（3★提高传承触发率，笔记评分+14）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10007,
      "name": "扣篮专精",
      "rawName": "扣篮专精",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「扣篮专精」：中幅提升扣篮的威力(大前和小前额外小幅提升)",
      "score": [
        [
          4,
          8,
          15
        ]
      ],
      "starScores": [
        4,
        8,
        15
      ],
      "starEffects": [
        {
          "effectId": 10007,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 4,
              "description": "触发时获得技能「扣篮专精」：中幅提升扣篮的威力(大前和小前额外小幅提升)（1★提高传承触发率，笔记评分+4）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 8,
              "description": "触发时获得技能「扣篮专精」：中幅提升扣篮的威力(大前和小前额外小幅提升)（2★提高传承触发率，笔记评分+8）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 15,
              "description": "触发时获得技能「扣篮专精」：中幅提升扣篮的威力(大前和小前额外小幅提升)（3★提高传承触发率，笔记评分+15）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10008,
      "name": "上篮专精",
      "rawName": "上篮专精",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「上篮专精」：中幅提升上篮的威力(小前和中锋额外小幅提升)",
      "score": [
        [
          3,
          8,
          12
        ]
      ],
      "starScores": [
        3,
        8,
        12
      ],
      "starEffects": [
        {
          "effectId": 10008,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 3,
              "description": "触发时获得技能「上篮专精」：中幅提升上篮的威力(小前和中锋额外小幅提升)（1★提高传承触发率，笔记评分+3）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 8,
              "description": "触发时获得技能「上篮专精」：中幅提升上篮的威力(小前和中锋额外小幅提升)（2★提高传承触发率，笔记评分+8）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 12,
              "description": "触发时获得技能「上篮专精」：中幅提升上篮的威力(小前和中锋额外小幅提升)（3★提高传承触发率，笔记评分+12）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10009,
      "name": "背打专精",
      "rawName": "背打专精",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「背打专精」：中幅提升背打的威力(大前额外小幅提升)",
      "score": [
        [
          3,
          10,
          13
        ]
      ],
      "starScores": [
        3,
        10,
        13
      ],
      "starEffects": [
        {
          "effectId": 10009,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 3,
              "description": "触发时获得技能「背打专精」：中幅提升背打的威力(大前额外小幅提升)（1★提高传承触发率，笔记评分+3）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 10,
              "description": "触发时获得技能「背打专精」：中幅提升背打的威力(大前额外小幅提升)（2★提高传承触发率，笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "description": "触发时获得技能「背打专精」：中幅提升背打的威力(大前额外小幅提升)（3★提高传承触发率，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10010,
      "name": "突破专精",
      "rawName": "突破专精",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「突破专精」：中幅提升突破的威力(控卫和小前额外小幅提升)",
      "score": [
        [
          5,
          9,
          14
        ]
      ],
      "starScores": [
        5,
        9,
        14
      ],
      "starEffects": [
        {
          "effectId": 10010,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 5,
              "description": "触发时获得技能「突破专精」：中幅提升突破的威力(控卫和小前额外小幅提升)（1★提高传承触发率，笔记评分+5）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "description": "触发时获得技能「突破专精」：中幅提升突破的威力(控卫和小前额外小幅提升)（2★提高传承触发率，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 14,
              "description": "触发时获得技能「突破专精」：中幅提升突破的威力(控卫和小前额外小幅提升)（3★提高传承触发率，笔记评分+14）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10011,
      "name": "三分专精",
      "rawName": "三分专精",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「三分专精」：中幅提升三分的威力(控卫和分卫额外小幅提升)",
      "score": [
        [
          6,
          10,
          13
        ]
      ],
      "starScores": [
        6,
        10,
        13
      ],
      "starEffects": [
        {
          "effectId": 10011,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 6,
              "description": "触发时获得技能「三分专精」：中幅提升三分的威力(控卫和分卫额外小幅提升)（1★提高传承触发率，笔记评分+6）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 10,
              "description": "触发时获得技能「三分专精」：中幅提升三分的威力(控卫和分卫额外小幅提升)（2★提高传承触发率，笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "description": "触发时获得技能「三分专精」：中幅提升三分的威力(控卫和分卫额外小幅提升)（3★提高传承触发率，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10012,
      "name": "中投专精",
      "rawName": "中投专精",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「中投专精」：中幅提升中投的威力(小前额外中幅提升)",
      "score": [
        [
          6,
          9,
          12
        ]
      ],
      "starScores": [
        6,
        9,
        12
      ],
      "starEffects": [
        {
          "effectId": 10012,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 6,
              "description": "触发时获得技能「中投专精」：中幅提升中投的威力(小前额外中幅提升)（1★提高传承触发率，笔记评分+6）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "description": "触发时获得技能「中投专精」：中幅提升中投的威力(小前额外中幅提升)（2★提高传承触发率，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 12,
              "description": "触发时获得技能「中投专精」：中幅提升中投的威力(小前额外中幅提升)（3★提高传承触发率，笔记评分+12）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10013,
      "name": "抢断专精",
      "rawName": "抢断专精",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「抢断专精」：中幅提升抢断的威力",
      "score": [
        [
          5,
          10,
          12
        ]
      ],
      "starScores": [
        5,
        10,
        12
      ],
      "starEffects": [
        {
          "effectId": 10013,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 5,
              "description": "触发时获得技能「抢断专精」：中幅提升抢断的威力（1★提高传承触发率，笔记评分+5）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 10,
              "description": "触发时获得技能「抢断专精」：中幅提升抢断的威力（2★提高传承触发率，笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 12,
              "description": "触发时获得技能「抢断专精」：中幅提升抢断的威力（3★提高传承触发率，笔记评分+12）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10014,
      "name": "盖帽精通",
      "rawName": "盖帽精通",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「盖帽精通」：中幅提升盖帽的威力",
      "score": [
        [
          6,
          8,
          12
        ]
      ],
      "starScores": [
        6,
        8,
        12
      ],
      "starEffects": [
        {
          "effectId": 10014,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 6,
              "description": "触发时获得技能「盖帽精通」：中幅提升盖帽的威力（1★提高传承触发率，笔记评分+6）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 8,
              "description": "触发时获得技能「盖帽精通」：中幅提升盖帽的威力（2★提高传承触发率，笔记评分+8）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 12,
              "description": "触发时获得技能「盖帽精通」：中幅提升盖帽的威力（3★提高传承触发率，笔记评分+12）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10015,
      "name": "篮板守护者",
      "rawName": "篮板守护者",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「篮板守护者」：抢夺防守篮板的能力中幅提升",
      "score": [
        [
          4,
          10,
          14
        ]
      ],
      "starScores": [
        4,
        10,
        14
      ],
      "starEffects": [
        {
          "effectId": 10015,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 4,
              "description": "触发时获得技能「篮板守护者」：抢夺防守篮板的能力中幅提升（1★提高传承触发率，笔记评分+4）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 10,
              "description": "触发时获得技能「篮板守护者」：抢夺防守篮板的能力中幅提升（2★提高传承触发率，笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 14,
              "description": "触发时获得技能「篮板守护者」：抢夺防守篮板的能力中幅提升（3★提高传承触发率，笔记评分+14）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10016,
      "name": "篮板抢夺者",
      "rawName": "篮板抢夺者",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": true,
      "description": "触发时获得技能「篮板抢夺者」：抢夺进攻篮板的能力中幅提升",
      "score": [
        [
          5,
          9,
          12
        ]
      ],
      "starScores": [
        5,
        9,
        12
      ],
      "starEffects": [
        {
          "effectId": 10016,
          "effectType": 4,
          "effectTypeCode": "SKILL",
          "effectTypeName": "直接习得技能（旧版S1白因子技能）",
          "effectTypeNote": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代",
          "stars": [
            {
              "star": 1,
              "score": 5,
              "description": "触发时获得技能「篮板抢夺者」：抢夺进攻篮板的能力中幅提升（1★提高传承触发率，笔记评分+5）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "description": "触发时获得技能「篮板抢夺者」：抢夺进攻篮板的能力中幅提升（2★提高传承触发率，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 12,
              "description": "触发时获得技能「篮板抢夺者」：抢夺进攻篮板的能力中幅提升（3★提高传承触发率，笔记评分+12）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10021,
      "name": "准星引导",
      "rawName": "准星引导",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高投射",
      "score": [
        [
          4,
          8,
          15
        ]
      ],
      "starScores": [
        4,
        8,
        15
      ],
      "starEffects": [
        {
          "effectId": 10021,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 4,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时投射随机+6~10（候选档位：+6/+8/+10，笔记评分+4）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 8,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时投射随机+10~14（候选档位：+10/+12/+14，笔记评分+8）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 15,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时投射随机+14~20（候选档位：+14/+17/+20，笔记评分+15）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10022,
      "name": "三分狙击",
      "rawName": "三分狙击",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高投射",
      "score": [
        [
          6,
          10,
          15
        ]
      ],
      "starScores": [
        6,
        10,
        15
      ],
      "starEffects": [
        {
          "effectId": 10022,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 6,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时投射随机+6~10（候选档位：+6/+8/+10，笔记评分+6）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 10,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时投射随机+10~14（候选档位：+10/+12/+14，笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 15,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时投射随机+14~20（候选档位：+14/+17/+20，笔记评分+15）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10023,
      "name": "篮筐引力",
      "rawName": "篮筐引力",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高投射",
      "score": [
        [
          4,
          10,
          14
        ]
      ],
      "starScores": [
        4,
        10,
        14
      ],
      "starEffects": [
        {
          "effectId": 10023,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 4,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时投射随机+6~10（候选档位：+6/+8/+10，笔记评分+4）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 10,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时投射随机+10~14（候选档位：+10/+12/+14，笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 14,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时投射随机+14~20（候选档位：+14/+17/+20，笔记评分+14）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10024,
      "name": "篮下灵翼",
      "rawName": "篮下灵翼",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高弹跳",
      "score": [
        [
          3,
          8,
          13
        ]
      ],
      "starScores": [
        3,
        8,
        13
      ],
      "starEffects": [
        {
          "effectId": 10024,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 3,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时弹跳随机+6~10（候选档位：+6/+8/+10，笔记评分+3）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 8,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时弹跳随机+10~14（候选档位：+10/+12/+14，笔记评分+8）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时弹跳随机+14~20（候选档位：+14/+17/+20，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10025,
      "name": "无影弹跳",
      "rawName": "无影弹跳",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高弹跳",
      "score": [
        [
          5,
          10,
          13
        ]
      ],
      "starScores": [
        5,
        10,
        13
      ],
      "starEffects": [
        {
          "effectId": 10025,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 5,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时弹跳随机+6~10（候选档位：+6/+8/+10，笔记评分+5）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 10,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时弹跳随机+10~14（候选档位：+10/+12/+14，笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时弹跳随机+14~20（候选档位：+14/+17/+20，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10026,
      "name": "空中掌控",
      "rawName": "空中掌控",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高弹跳",
      "score": [
        [
          3,
          9,
          14
        ]
      ],
      "starScores": [
        3,
        9,
        14
      ],
      "starEffects": [
        {
          "effectId": 10026,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 3,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时弹跳随机+6~10（候选档位：+6/+8/+10，笔记评分+3）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时弹跳随机+10~14（候选档位：+10/+12/+14，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 14,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时弹跳随机+14~20（候选档位：+14/+17/+20，笔记评分+14）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10027,
      "name": "钢铁壁垒",
      "rawName": "钢铁壁垒",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高防守",
      "score": [
        [
          5,
          9,
          15
        ]
      ],
      "starScores": [
        5,
        9,
        15
      ],
      "starEffects": [
        {
          "effectId": 10027,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 5,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时防守随机+6~10（候选档位：+6/+8/+10，笔记评分+5）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时防守随机+10~14（候选档位：+10/+12/+14，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 15,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时防守随机+14~20（候选档位：+14/+17/+20，笔记评分+15）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10028,
      "name": "防守大师",
      "rawName": "防守大师",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高防守",
      "score": [
        [
          6,
          8,
          14
        ]
      ],
      "starScores": [
        6,
        8,
        14
      ],
      "starEffects": [
        {
          "effectId": 10028,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 6,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时防守随机+6~10（候选档位：+6/+8/+10，笔记评分+6）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 8,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时防守随机+10~14（候选档位：+10/+12/+14，笔记评分+8）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 14,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时防守随机+14~20（候选档位：+14/+17/+20，笔记评分+14）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10029,
      "name": "铁幕封锁",
      "rawName": "铁幕封锁",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高防守",
      "score": [
        [
          3,
          9,
          13
        ]
      ],
      "starScores": [
        3,
        9,
        13
      ],
      "starEffects": [
        {
          "effectId": 10029,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 3,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时防守随机+6~10（候选档位：+6/+8/+10，笔记评分+3）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时防守随机+10~14（候选档位：+10/+12/+14，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时防守随机+14~20（候选档位：+14/+17/+20，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10030,
      "name": "永动机",
      "rawName": "永动机",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高体能",
      "score": [
        [
          4,
          9,
          15
        ]
      ],
      "starScores": [
        4,
        9,
        15
      ],
      "starEffects": [
        {
          "effectId": 10030,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 4,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时体能随机+6~10（候选档位：+6/+8/+10，笔记评分+4）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时体能随机+10~14（候选档位：+10/+12/+14，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 15,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时体能随机+14~20（候选档位：+14/+17/+20，笔记评分+15）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10031,
      "name": "不息之风",
      "rawName": "不息之风",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高体能",
      "score": [
        [
          6,
          10,
          14
        ]
      ],
      "starScores": [
        6,
        10,
        14
      ],
      "starEffects": [
        {
          "effectId": 10031,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 6,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时体能随机+6~10（候选档位：+6/+8/+10，笔记评分+6）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 10,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时体能随机+10~14（候选档位：+10/+12/+14，笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 14,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时体能随机+14~20（候选档位：+14/+17/+20，笔记评分+14）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10032,
      "name": "不倦驱动",
      "rawName": "不倦驱动",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高体能",
      "score": [
        [
          4,
          9,
          12
        ]
      ],
      "starScores": [
        4,
        9,
        12
      ],
      "starEffects": [
        {
          "effectId": 10032,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 4,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时体能随机+6~10（候选档位：+6/+8/+10，笔记评分+4）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时体能随机+10~14（候选档位：+10/+12/+14，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 12,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时体能随机+14~20（候选档位：+14/+17/+20，笔记评分+12）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10033,
      "name": "黄金手腕",
      "rawName": "黄金手腕",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高运控",
      "score": [
        [
          4,
          9,
          13
        ]
      ],
      "starScores": [
        4,
        9,
        13
      ],
      "starEffects": [
        {
          "effectId": 10033,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 4,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时运控随机+6~10（候选档位：+6/+8/+10，笔记评分+4）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时运控随机+10~14（候选档位：+10/+12/+14，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时运控随机+14~20（候选档位：+14/+17/+20，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10034,
      "name": "幻影助攻",
      "rawName": "幻影助攻",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高运控",
      "score": [
        [
          6,
          8,
          13
        ]
      ],
      "starScores": [
        6,
        8,
        13
      ],
      "starEffects": [
        {
          "effectId": 10034,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 6,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时运控随机+6~10（候选档位：+6/+8/+10，笔记评分+6）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 8,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时运控随机+10~14（候选档位：+10/+12/+14，笔记评分+8）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时运控随机+14~20（候选档位：+14/+17/+20，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10035,
      "name": "穿针引线",
      "rawName": "穿针引线",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高运控",
      "score": [
        [
          3,
          10,
          14
        ]
      ],
      "starScores": [
        3,
        10,
        14
      ],
      "starEffects": [
        {
          "effectId": 10035,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 3,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时运控随机+6~10（候选档位：+6/+8/+10，笔记评分+3）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 10,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时运控随机+10~14（候选档位：+10/+12/+14，笔记评分+10）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 14,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时运控随机+14~20（候选档位：+14/+17/+20，笔记评分+14）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10036,
      "name": "意识霸主",
      "rawName": "意识霸主",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高意识",
      "score": [
        [
          3,
          8,
          13
        ]
      ],
      "starScores": [
        3,
        8,
        13
      ],
      "starEffects": [
        {
          "effectId": 10036,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 3,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时意识随机+6~10（候选档位：+6/+8/+10，笔记评分+3）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 8,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时意识随机+10~14（候选档位：+10/+12/+14，笔记评分+8）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时意识随机+14~20（候选档位：+14/+17/+20，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10037,
      "name": "洞悉未来",
      "rawName": "洞悉未来",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高意识",
      "score": [
        [
          4,
          9,
          13
        ]
      ],
      "starScores": [
        4,
        9,
        13
      ],
      "starEffects": [
        {
          "effectId": 10037,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 4,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时意识随机+6~10（候选档位：+6/+8/+10，笔记评分+4）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时意识随机+10~14（候选档位：+10/+12/+14，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时意识随机+14~20（候选档位：+14/+17/+20，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    },
    {
      "entryId": 10038,
      "name": "意图看破",
      "rawName": "意图看破",
      "typeId": 4,
      "typeName": "白因子",
      "chapterId": 0,
      "attribute": "对应训练属性",
      "dutySuitPosition": "",
      "isLegacySkillEntry": false,
      "description": "触发时随机提高意识",
      "score": [
        [
          5,
          9,
          13
        ]
      ],
      "starScores": [
        5,
        9,
        13
      ],
      "starEffects": [
        {
          "effectId": 10038,
          "effectType": 5,
          "effectTypeCode": "ATTR_RAND",
          "effectTypeName": "随机属性提升",
          "effectTypeNote": "传承触发时从候选属性与当前星级候选数值中随机提升属性",
          "stars": [
            {
              "star": 1,
              "score": 5,
              "minValue": 6,
              "maxValue": 10,
              "description": "触发时意识随机+6~10（候选档位：+6/+8/+10，笔记评分+5）",
              "attributeRanges": null
            },
            {
              "star": 2,
              "score": 9,
              "minValue": 10,
              "maxValue": 14,
              "description": "触发时意识随机+10~14（候选档位：+10/+12/+14，笔记评分+9）",
              "attributeRanges": null
            },
            {
              "star": 3,
              "score": 13,
              "minValue": 14,
              "maxValue": 20,
              "description": "触发时意识随机+14~20（候选档位：+14/+17/+20，笔记评分+13）",
              "attributeRanges": null
            }
          ]
        }
      ]
    }
  ],
  "entryTypes": [
    {
      "chapter": 0,
      "chapter_icon": 0,
      "show_chapter": false,
      "show_value": true,
      "sort": 1,
      "type": 1,
      "type_name": "属性"
    },
    {
      "chapter": 0,
      "chapter_icon": 0,
      "show_chapter": false,
      "show_value": true,
      "sort": 2,
      "type": 2,
      "type_name": "属性上限"
    },
    {
      "chapter": 0,
      "chapter_icon": 0,
      "show_chapter": false,
      "show_value": false,
      "sort": 3,
      "type": 3,
      "type_name": "适性"
    },
    {
      "chapter": 0,
      "chapter_icon": 0,
      "show_chapter": false,
      "show_value": false,
      "sort": 999,
      "type": 4,
      "type_name": "白因子"
    },
    {
      "chapter": 0,
      "chapter_icon": 0,
      "show_chapter": false,
      "show_value": false,
      "sort": 5,
      "type": 5,
      "type_name": "契合度"
    },
    {
      "chapter": 0,
      "chapter_icon": 0,
      "show_chapter": false,
      "show_value": false,
      "sort": 4,
      "type": 6,
      "type_name": "技能"
    },
    {
      "chapter": 3,
      "chapter_icon": 0,
      "show_chapter": false,
      "show_value": false,
      "sort": 6,
      "type": 101,
      "type_name": "训练上"
    },
    {
      "chapter": 4,
      "chapter_icon": 0,
      "show_chapter": false,
      "show_value": false,
      "sort": 7,
      "type": 102,
      "type_name": "训练下-普通"
    },
    {
      "chapter": 5,
      "chapter_icon": 30132,
      "show_chapter": true,
      "show_value": false,
      "sort": 8,
      "type": 103,
      "type_name": "训练下-困难"
    }
  ],
  "entryEffectTypes": {
    "1": {
      "code": "ATTR",
      "name": "固定属性提升",
      "desc": "传承触发时按星级区间提升对应基础属性"
    },
    "2": {
      "code": "DUTY_SUIT",
      "name": "位置适性提升",
      "desc": "传承触发时对应球场位置适性提升1阶（最高至S）；星级提高笔记评分、局内传承触发概率与子代高星继承权重"
    },
    "3": {
      "code": "ATTR_MAX",
      "name": "属性上限提升",
      "desc": "传承触发时按星级区间提升对应基础属性上限"
    },
    "4": {
      "code": "SKILL",
      "name": "直接习得技能（旧版S1白因子技能）",
      "desc": "对应 client ENTRY_EFFECT_TYPE.SKILL (learn_skill)，非状态Buff！220048~220121为S1早期技能ID，现版本已统一由#601动态技能因子替代"
    },
    "5": {
      "code": "ATTR_RAND",
      "name": "随机属性提升",
      "desc": "传承触发时从候选属性与当前星级候选数值中随机提升属性"
    },
    "6": {
      "code": "PROB_OR_HARMONY",
      "name": "契合度或技能出现率提升",
      "desc": "#501提升编队角色相性(+2/+5/+10)与分解概率(+3%/+6%/+10%)；#601提升对应技能在训练三选一中的出现概率(+3%/+6%/+10%)"
    },
    "7": {
      "code": "ATTR_ALL",
      "name": "全六维属性提升",
      "desc": "传承触发时全六维属性（投射/弹跳/防守/体能/运控/意识）同时按星级区间提升"
    }
  },
  "noteQualities": [
    {
      "auto_edu_exp": 100,
      "can_compound": true,
      "entry_count": [
        2,
        2
      ],
      "lock_cost": [
        1
      ],
      "lock_limit": 0,
      "note_consume_cnt": 2,
      "quality": 1,
      "quality_name": "白色",
      "refine_cost": [
        0
      ]
    },
    {
      "auto_edu_exp": 200,
      "can_compound": true,
      "entry_count": [
        3,
        4
      ],
      "lock_cost": [
        1
      ],
      "lock_limit": 0,
      "note_consume_cnt": 2,
      "quality": 2,
      "quality_name": "绿色",
      "refine_cost": [
        0
      ]
    },
    {
      "auto_edu_exp": 300,
      "can_compound": true,
      "entry_count": [
        5,
        6
      ],
      "lock_cost": [
        1
      ],
      "lock_limit": 0,
      "note_consume_cnt": 2,
      "quality": 3,
      "quality_name": "蓝色",
      "refine_cost": [
        0
      ]
    },
    {
      "auto_edu_exp": 400,
      "can_compound": true,
      "entry_count": [
        7,
        9
      ],
      "lock_cost": [
        1
      ],
      "lock_limit": 0,
      "note_consume_cnt": 2,
      "quality": 4,
      "quality_name": "紫色",
      "refine_cost": [
        0
      ]
    },
    {
      "auto_edu_exp": 500,
      "can_compound": true,
      "entry_count": [
        10,
        15
      ],
      "lock_cost": [
        1
      ],
      "lock_limit": 0,
      "note_consume_cnt": 2,
      "quality": 5,
      "quality_name": "金色",
      "refine_cost": [
        0
      ]
    },
    {
      "auto_edu_exp": 600,
      "can_compound": true,
      "entry_count": [
        10,
        15
      ],
      "lock_cost": [
        1
      ],
      "lock_limit": 0,
      "note_consume_cnt": 1,
      "quality": 6,
      "quality_name": "红色",
      "refine_cost": [
        0
      ]
    },
    {
      "auto_edu_exp": 700,
      "can_compound": false,
      "entry_count": [
        16,
        999
      ],
      "lock_cost": [
        1
      ],
      "lock_limit": 0,
      "note_consume_cnt": 9999,
      "quality": 7,
      "quality_name": "彩色",
      "refine_cost": [
        0
      ]
    }
  ],
  "penDecomposeLevels": [
    {
      "level": 1,
      "limit_1200": [
        83,
        12,
        5
      ],
      "limit_12000": {
        "4": 39,
        "5": 26,
        "6": 20,
        "7": 15
      },
      "limit_1500": [
        75,
        15,
        10
      ],
      "limit_15000": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "limit_1800": [
        50,
        30,
        20
      ],
      "limit_2400": [
        35,
        35,
        25,
        5
      ],
      "limit_3000": [
        22,
        40,
        28,
        10
      ],
      "limit_3600": [
        10,
        45,
        30,
        15
      ],
      "limit_4800": {
        "2": 46,
        "3": 30,
        "4": 22,
        "5": 2
      },
      "limit_6000": {
        "2": 45,
        "3": 28,
        "4": 22,
        "5": 5
      },
      "limit_7200": {
        "2": 27,
        "3": 23,
        "4": 20,
        "5": 18,
        "6": 12
      },
      "limit_900": [
        90,
        10
      ],
      "limit_9000": {
        "3": 26,
        "4": 24,
        "5": 21,
        "6": 17,
        "7": 12
      },
      "limit_99999": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "max_quality": 0,
      "need_exp": 20,
      "open_tips": "",
      "pen_quality": 1,
      "quality_weight": [
        1035,
        1037,
        1038,
        1039
      ]
    },
    {
      "level": 2,
      "limit_1200": [
        83,
        12,
        5
      ],
      "limit_12000": {
        "4": 39,
        "5": 26,
        "6": 20,
        "7": 15
      },
      "limit_1500": [
        75,
        15,
        10
      ],
      "limit_15000": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "limit_1800": [
        50,
        30,
        20
      ],
      "limit_2400": [
        35,
        35,
        25,
        5
      ],
      "limit_3000": [
        22,
        40,
        28,
        10
      ],
      "limit_3600": [
        10,
        45,
        30,
        15
      ],
      "limit_4800": {
        "2": 46,
        "3": 30,
        "4": 22,
        "5": 2
      },
      "limit_6000": {
        "2": 45,
        "3": 28,
        "4": 22,
        "5": 5
      },
      "limit_7200": {
        "2": 27,
        "3": 23,
        "4": 20,
        "5": 18,
        "6": 12
      },
      "limit_900": [
        90,
        10
      ],
      "limit_9000": {
        "3": 26,
        "4": 24,
        "5": 21,
        "6": 17,
        "7": 12
      },
      "limit_99999": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "max_quality": 5,
      "need_exp": 40,
      "open_tips": "可记录全新品质笔记-金色笔记",
      "pen_quality": 5,
      "quality_weight": [
        1036,
        1040,
        1041,
        1042,
        1043
      ]
    },
    {
      "level": 3,
      "limit_1200": [
        83,
        12,
        5
      ],
      "limit_12000": {
        "4": 39,
        "5": 26,
        "6": 20,
        "7": 15
      },
      "limit_1500": [
        75,
        15,
        10
      ],
      "limit_15000": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "limit_1800": [
        50,
        30,
        20
      ],
      "limit_2400": [
        35,
        35,
        25,
        5
      ],
      "limit_3000": [
        22,
        40,
        28,
        10
      ],
      "limit_3600": [
        10,
        45,
        30,
        15
      ],
      "limit_4800": {
        "2": 46,
        "3": 30,
        "4": 22,
        "5": 2
      },
      "limit_6000": {
        "2": 45,
        "3": 28,
        "4": 22,
        "5": 5
      },
      "limit_7200": {
        "2": 27,
        "3": 23,
        "4": 20,
        "5": 18,
        "6": 12
      },
      "limit_900": [
        90,
        10
      ],
      "limit_9000": {
        "3": 26,
        "4": 24,
        "5": 21,
        "6": 17,
        "7": 12
      },
      "limit_99999": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "max_quality": 5,
      "need_exp": 60,
      "open_tips": "",
      "pen_quality": 5,
      "quality_weight": [
        1082,
        1044,
        1045,
        1046,
        1047
      ]
    },
    {
      "level": 4,
      "limit_1200": [
        83,
        12,
        5
      ],
      "limit_12000": {
        "4": 39,
        "5": 26,
        "6": 20,
        "7": 15
      },
      "limit_1500": [
        75,
        15,
        10
      ],
      "limit_15000": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "limit_1800": [
        50,
        30,
        20
      ],
      "limit_2400": [
        35,
        35,
        25,
        5
      ],
      "limit_3000": [
        22,
        40,
        28,
        10
      ],
      "limit_3600": [
        10,
        45,
        30,
        15
      ],
      "limit_4800": {
        "2": 46,
        "3": 30,
        "4": 22,
        "5": 2
      },
      "limit_6000": {
        "2": 45,
        "3": 28,
        "4": 22,
        "5": 5
      },
      "limit_7200": {
        "2": 27,
        "3": 23,
        "4": 20,
        "5": 18,
        "6": 12
      },
      "limit_900": [
        90,
        10
      ],
      "limit_9000": {
        "3": 26,
        "4": 24,
        "5": 21,
        "6": 17,
        "7": 12
      },
      "limit_99999": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "max_quality": 6,
      "need_exp": 90,
      "open_tips": "可记录全新品质笔记-红色笔记",
      "pen_quality": 6,
      "quality_weight": [
        1083,
        1048,
        1049,
        1050,
        1051,
        1052
      ]
    },
    {
      "level": 5,
      "limit_1200": [
        83,
        12,
        5
      ],
      "limit_12000": {
        "4": 39,
        "5": 26,
        "6": 20,
        "7": 15
      },
      "limit_1500": [
        75,
        15,
        10
      ],
      "limit_15000": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "limit_1800": [
        50,
        30,
        20
      ],
      "limit_2400": [
        35,
        35,
        25,
        5
      ],
      "limit_3000": [
        22,
        40,
        28,
        10
      ],
      "limit_3600": [
        10,
        45,
        30,
        15
      ],
      "limit_4800": {
        "2": 46,
        "3": 30,
        "4": 22,
        "5": 2
      },
      "limit_6000": {
        "2": 45,
        "3": 28,
        "4": 22,
        "5": 5
      },
      "limit_7200": {
        "2": 27,
        "3": 23,
        "4": 20,
        "5": 18,
        "6": 12
      },
      "limit_900": [
        90,
        10
      ],
      "limit_9000": {
        "3": 26,
        "4": 24,
        "5": 21,
        "6": 17,
        "7": 12
      },
      "limit_99999": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "max_quality": 6,
      "need_exp": 120,
      "open_tips": "",
      "pen_quality": 6,
      "quality_weight": [
        1084,
        1053,
        1054,
        1055,
        1056,
        1057
      ]
    },
    {
      "level": 6,
      "limit_1200": [
        83,
        12,
        5
      ],
      "limit_12000": {
        "4": 39,
        "5": 26,
        "6": 20,
        "7": 15
      },
      "limit_1500": [
        75,
        15,
        10
      ],
      "limit_15000": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "limit_1800": [
        50,
        30,
        20
      ],
      "limit_2400": [
        35,
        35,
        25,
        5
      ],
      "limit_3000": [
        22,
        40,
        28,
        10
      ],
      "limit_3600": [
        10,
        45,
        30,
        15
      ],
      "limit_4800": {
        "2": 46,
        "3": 30,
        "4": 22,
        "5": 2
      },
      "limit_6000": {
        "2": 45,
        "3": 28,
        "4": 22,
        "5": 5
      },
      "limit_7200": {
        "2": 27,
        "3": 23,
        "4": 20,
        "5": 18,
        "6": 12
      },
      "limit_900": [
        90,
        10
      ],
      "limit_9000": {
        "3": 26,
        "4": 24,
        "5": 21,
        "6": 17,
        "7": 12
      },
      "limit_99999": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "max_quality": 7,
      "need_exp": 150,
      "open_tips": "可记录全新品质笔记-彩色笔记",
      "pen_quality": 7,
      "quality_weight": [
        1085,
        1058,
        1059,
        1060,
        1061,
        1062,
        1063
      ]
    },
    {
      "level": 7,
      "limit_1200": [
        83,
        12,
        5
      ],
      "limit_12000": {
        "4": 39,
        "5": 26,
        "6": 20,
        "7": 15
      },
      "limit_1500": [
        75,
        15,
        10
      ],
      "limit_15000": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "limit_1800": [
        50,
        30,
        20
      ],
      "limit_2400": [
        35,
        35,
        25,
        5
      ],
      "limit_3000": [
        22,
        40,
        28,
        10
      ],
      "limit_3600": [
        10,
        45,
        30,
        15
      ],
      "limit_4800": {
        "2": 46,
        "3": 30,
        "4": 22,
        "5": 2
      },
      "limit_6000": {
        "2": 45,
        "3": 28,
        "4": 22,
        "5": 5
      },
      "limit_7200": {
        "2": 27,
        "3": 23,
        "4": 20,
        "5": 18,
        "6": 12
      },
      "limit_900": [
        90,
        10
      ],
      "limit_9000": {
        "3": 26,
        "4": 24,
        "5": 21,
        "6": 17,
        "7": 12
      },
      "limit_99999": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "max_quality": 7,
      "need_exp": 200,
      "open_tips": "",
      "pen_quality": 7,
      "quality_weight": [
        1086,
        1064,
        1065,
        1066,
        1067,
        1068,
        1069
      ]
    },
    {
      "level": 8,
      "limit_1200": [
        83,
        12,
        5
      ],
      "limit_12000": {
        "4": 39,
        "5": 26,
        "6": 20,
        "7": 15
      },
      "limit_1500": [
        75,
        15,
        10
      ],
      "limit_15000": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "limit_1800": [
        50,
        30,
        20
      ],
      "limit_2400": [
        35,
        35,
        25,
        5
      ],
      "limit_3000": [
        22,
        40,
        28,
        10
      ],
      "limit_3600": [
        10,
        45,
        30,
        15
      ],
      "limit_4800": {
        "2": 46,
        "3": 30,
        "4": 22,
        "5": 2
      },
      "limit_6000": {
        "2": 45,
        "3": 28,
        "4": 22,
        "5": 5
      },
      "limit_7200": {
        "2": 27,
        "3": 23,
        "4": 20,
        "5": 18,
        "6": 12
      },
      "limit_900": [
        90,
        10
      ],
      "limit_9000": {
        "3": 26,
        "4": 24,
        "5": 21,
        "6": 17,
        "7": 12
      },
      "limit_99999": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "max_quality": 7,
      "need_exp": 300,
      "open_tips": "",
      "pen_quality": 7,
      "quality_weight": [
        1087,
        1070,
        1071,
        1072,
        1073,
        1074,
        1075
      ]
    },
    {
      "level": 9,
      "limit_1200": [
        83,
        12,
        5
      ],
      "limit_12000": {
        "4": 39,
        "5": 26,
        "6": 20,
        "7": 15
      },
      "limit_1500": [
        75,
        15,
        10
      ],
      "limit_15000": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "limit_1800": [
        50,
        30,
        20
      ],
      "limit_2400": [
        35,
        35,
        25,
        5
      ],
      "limit_3000": [
        22,
        40,
        28,
        10
      ],
      "limit_3600": [
        10,
        45,
        30,
        15
      ],
      "limit_4800": {
        "2": 46,
        "3": 30,
        "4": 22,
        "5": 2
      },
      "limit_6000": {
        "2": 45,
        "3": 28,
        "4": 22,
        "5": 5
      },
      "limit_7200": {
        "2": 27,
        "3": 23,
        "4": 20,
        "5": 18,
        "6": 12
      },
      "limit_900": [
        90,
        10
      ],
      "limit_9000": {
        "3": 26,
        "4": 24,
        "5": 21,
        "6": 17,
        "7": 12
      },
      "limit_99999": {
        "4": 33,
        "5": 27,
        "6": 22,
        "7": 18
      },
      "max_quality": 7,
      "need_exp": 0,
      "open_tips": "",
      "pen_quality": 7,
      "quality_weight": [
        1088,
        1076,
        1077,
        1078,
        1079,
        1080,
        1081
      ]
    }
  ],
  "compatibility": {
    "harmony_entry_bonus_by_star": [
      2,
      5,
      10
    ],
    "compatibility_Calculation_rule": "总相性分(契合度) = 主力角色与2本训练笔记原主人之间的『角色关系分』(若笔记原主人与主力相同则该项为0) + 笔记上『契合度词条(id=501)』提供的加成（1★+2 / 2★+5 / 3★+10，或触发时+3/+6/+10）。",
    "harmony_levels": [
      {
        "level": 1,
        "rank_name": "无",
        "min_compatibility_score": 0,
        "inheritance_learn_times": 1
      },
      {
        "level": 2,
        "rank_name": "差",
        "min_compatibility_score": 1,
        "inheritance_learn_times": 2
      },
      {
        "level": 3,
        "rank_name": "一般",
        "min_compatibility_score": 10,
        "inheritance_learn_times": 3
      },
      {
        "level": 4,
        "rank_name": "良",
        "min_compatibility_score": 20,
        "inheritance_learn_times": 4
      },
      {
        "level": 5,
        "rank_name": "优",
        "min_compatibility_score": 30,
        "inheritance_learn_times": 5
      },
      {
        "level": 6,
        "rank_name": "极",
        "min_compatibility_score": 45,
        "inheritance_learn_times": 5
      }
    ],
    "entry_trigger_count_by_compatibility": [
      {
        "id": 1,
        "required_compatibility_score": 0,
        "min_triggered_entries": 2,
        "max_triggered_entries": 4
      },
      {
        "id": 2,
        "required_compatibility_score": 5,
        "min_triggered_entries": 3,
        "max_triggered_entries": 5
      },
      {
        "id": 3,
        "required_compatibility_score": 10,
        "min_triggered_entries": 4,
        "max_triggered_entries": 6
      },
      {
        "id": 4,
        "required_compatibility_score": 15,
        "min_triggered_entries": 4,
        "max_triggered_entries": 7
      },
      {
        "id": 5,
        "required_compatibility_score": 20,
        "min_triggered_entries": 4,
        "max_triggered_entries": 8
      },
      {
        "id": 6,
        "required_compatibility_score": 40,
        "min_triggered_entries": 5,
        "max_triggered_entries": 10
      },
      {
        "id": 7,
        "required_compatibility_score": 60,
        "min_triggered_entries": 5,
        "max_triggered_entries": 11
      },
      {
        "id": 8,
        "required_compatibility_score": 80,
        "min_triggered_entries": 5,
        "max_triggered_entries": 12
      },
      {
        "id": 9,
        "required_compatibility_score": 160,
        "min_triggered_entries": 6,
        "max_triggered_entries": 14
      },
      {
        "id": 10,
        "required_compatibility_score": 325,
        "min_triggered_entries": 7,
        "max_triggered_entries": 18
      },
      {
        "id": 11,
        "required_compatibility_score": 640,
        "min_triggered_entries": 8,
        "max_triggered_entries": 22
      },
      {
        "id": 12,
        "required_compatibility_score": 960,
        "min_triggered_entries": 9,
        "max_triggered_entries": 26
      },
      {
        "id": 13,
        "required_compatibility_score": 1280,
        "min_triggered_entries": 10,
        "max_triggered_entries": 30
      }
    ]
  },
  "overview": {
    "max_equipped_notes": 2,
    "daily_borrow_limit": 3,
    "chapter_note_type_map": {
      "3": 101,
      "4": 102,
      "5": 103
    },
    "extra_note_trigger_gacha": {
      "normal_gacha_id": 82,
      "normal_effect_id": 10085,
      "enhanced_gacha_id": 1082,
      "enhanced_effect_id": 30085,
      "description": "扭蛋『笔记继承』(82/1082)触发 type=44 (trigger_note_effect)，立刻额外执行1次训练笔记继承（增强版额外+30零用钱）。"
    }
  }
};
  if (typeof module === "object" && module.exports) module.exports = data;
  if (root) {
    root.BBNotesNewData = data;
    root.BBT = root.BBT || {};
    root.BBT.notesNewData = data;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

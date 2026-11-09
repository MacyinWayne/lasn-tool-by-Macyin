/*!
 * data/note-entries.js —— 自动生成，请勿手改。
 * 生成脚本：tool/scripts/build-note-entries.mjs
 * 生成时间：2026-11-05 23:42
 * 数据版本：v2026.11.05
 * 口径：日志词条字段来自客户端日志；具名词条来自截图 OCR；映射/概率缺口见 meta.gaps
 */
(function (root) {
  'use strict';
  var data = {
  "schema": 1,
  "generatedAt": "2026-11-05 23:42",
  "dataVersion": "v2026.11.05",
  "mode": "sample",
  "source": "data/pc-client/snapshots/training_20261105/notes_from_log.json + data/community/notes_harmony/note_samples.json",
  "meta": {
    "generatedAt": "2026-11-05 23:42",
    "dataVersion": "v2026.11.05",
    "confidence": "日志字段=客户端事实；具名词条=截图 OCR 样本；entry_id↔名称映射待补；属性 property_id 映射未解",
    "sources": [
      "data/pc-client/snapshots/training_20261105/notes_from_log.json（日志解析 note entry）",
      "data/community/notes_harmony/note_samples.json（截图 OCR 具名词条）",
      "knowledge/笔记系统_规则与养成链.md（规则文案）"
    ],
    "gaps": [
      "日志 entry_id 与中文名未完整映射（当前仅有具名截图样本）",
      "属性 property_id 与 A/B 层属性映射未解",
      "适性词条出现概率未实测",
      "契合度矩阵仅少数已知对与手动录入（37×37 已数字化部分见 notes-harmony.js）"
    ],
    "counts": {
      "logEntries": 12,
      "namedEntries": 19,
      "logNotes": 1,
      "samples": 5
    }
  },
  "types": {
    "1": {
      "id": "1",
      "name": "属性",
      "note": "进入训练时立即生效"
    },
    "2": {
      "id": "2",
      "name": "属性上限",
      "note": "进入训练时立即生效"
    },
    "4": {
      "id": "4",
      "name": "技能",
      "note": "可提高对应技能在训练三选一中的出现概率"
    },
    "6": {
      "id": "6",
      "name": "技能组",
      "note": "技能组词条"
    },
    "103": {
      "id": "103",
      "name": "特殊（适性词条）",
      "note": "契合度词条/适性；任意记录/修订均可能出，概率待实测"
    }
  },
  "typeOrder": [
    "1",
    "2",
    "4",
    "6",
    "103"
  ],
  "rules": {
    "record": "记录已注册球员 → 获得角色绑定专属笔记；每次记录消耗 1 本毕业纪念册",
    "combine": "合成：3 册同角色、同品质 → 高一阶品质（最高红色）",
    "revise": "修订：获得第 1 册红色笔记后开启；消耗 2 册同角色、同品质笔记 → 重新生成词条且品质不变",
    "reviseKeep": "两本笔记都携带的词条在修订中必定保留（用两本都带 X 的素材修订目标）",
    "fitNote": "适性词条：任意记录/分解或修订均可能出；用带目标适性词条的素材可提高概率（概率机制待实测）",
    "source": "knowledge/笔记系统_规则与养成链.md（官方/社区截图 OCR + 用户口述 2026-11-05）"
  },
  "logEntries": [
    {
      "entryId": "33",
      "type": "1",
      "typeName": "属性",
      "star": 3,
      "propertyId": "103",
      "propertyValue": 74,
      "skillGroup": null,
      "noteId": "625622123563377",
      "noteRank": "6"
    },
    {
      "entryId": "131",
      "type": "2",
      "typeName": "属性上限",
      "star": 3,
      "propertyId": "101",
      "propertyValue": 159,
      "skillGroup": null,
      "noteId": "625622123563377",
      "noteRank": "6"
    },
    {
      "entryId": "10033",
      "type": "4",
      "typeName": "技能",
      "star": 1,
      "propertyId": null,
      "propertyValue": null,
      "skillGroup": null,
      "noteId": "625622123563377",
      "noteRank": "6"
    },
    {
      "entryId": "10036",
      "type": "4",
      "typeName": "技能",
      "star": 1,
      "propertyId": null,
      "propertyValue": null,
      "skillGroup": null,
      "noteId": "625622123563377",
      "noteRank": "6"
    },
    {
      "entryId": "10028",
      "type": "4",
      "typeName": "技能",
      "star": 1,
      "propertyId": null,
      "propertyValue": null,
      "skillGroup": null,
      "noteId": "625622123563377",
      "noteRank": "6"
    },
    {
      "entryId": "10035",
      "type": "4",
      "typeName": "技能",
      "star": 1,
      "propertyId": null,
      "propertyValue": null,
      "skillGroup": null,
      "noteId": "625622123563377",
      "noteRank": "6"
    },
    {
      "entryId": "10034",
      "type": "4",
      "typeName": "技能",
      "star": 1,
      "propertyId": null,
      "propertyValue": null,
      "skillGroup": null,
      "noteId": "625622123563377",
      "noteRank": "6"
    },
    {
      "entryId": "10026",
      "type": "4",
      "typeName": "技能",
      "star": 1,
      "propertyId": null,
      "propertyValue": null,
      "skillGroup": null,
      "noteId": "625622123563377",
      "noteRank": "6"
    },
    {
      "entryId": "10030",
      "type": "4",
      "typeName": "技能",
      "star": 3,
      "propertyId": null,
      "propertyValue": null,
      "skillGroup": null,
      "noteId": "625622123563377",
      "noteRank": "6"
    },
    {
      "entryId": "10029",
      "type": "4",
      "typeName": "技能",
      "star": 1,
      "propertyId": null,
      "propertyValue": null,
      "skillGroup": null,
      "noteId": "625622123563377",
      "noteRank": "6"
    },
    {
      "entryId": "317",
      "type": "103",
      "typeName": "特殊（适性词条）",
      "star": 3,
      "propertyId": null,
      "propertyValue": null,
      "skillGroup": null,
      "noteId": "625622123563377",
      "noteRank": "6"
    },
    {
      "entryId": "601",
      "type": "6",
      "typeName": "技能组",
      "star": 1,
      "propertyId": null,
      "propertyValue": null,
      "skillGroup": "202801",
      "noteId": "625622123563377",
      "noteRank": "6"
    }
  ],
  "namedEntries": [
    {
      "name": "准星引导",
      "star": 1,
      "owner": "真崎",
      "quality": "绿色",
      "score": 104,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "穿针引线",
      "star": 1,
      "owner": "望月",
      "quality": "绿色",
      "score": 89,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "篮筐引力",
      "star": 1,
      "owner": "望月",
      "quality": "蓝色",
      "score": 135,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "洞悉未来",
      "star": 1,
      "owner": "望月",
      "quality": "蓝色",
      "score": 135,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "钢铁壁垒",
      "star": 2,
      "owner": "望月",
      "quality": "蓝色",
      "score": 135,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "永动机",
      "star": 1,
      "owner": "望月",
      "quality": "蓝色",
      "score": 126,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "铁幕封锁",
      "star": 1,
      "owner": "望月",
      "quality": "蓝色",
      "score": 126,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "不息之风",
      "star": 2,
      "owner": "望月",
      "quality": "蓝色",
      "score": 126,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "不倦驱动",
      "star": 1,
      "owner": "望月",
      "quality": "蓝色",
      "score": 126,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "看破擅长",
      "star": 1,
      "owner": "佐久间",
      "quality": "红色",
      "score": 446,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "经理的超能力",
      "star": 3,
      "owner": "佐久间",
      "quality": "红色",
      "score": 446,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "无影弹跳",
      "star": 2,
      "owner": "佐久间",
      "quality": "红色",
      "score": 446,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "防守大师",
      "star": 1,
      "owner": "佐久间",
      "quality": "红色",
      "score": 446,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "幻影助攻",
      "star": 1,
      "owner": "佐久间",
      "quality": "红色",
      "score": 446,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "意识霸主",
      "star": 1,
      "owner": "佐久间",
      "quality": "红色",
      "score": 446,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "洞悉未来",
      "star": 2,
      "owner": "佐久间",
      "quality": "红色",
      "score": 446,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "篮下灵翼",
      "star": 1,
      "owner": "佐久间",
      "quality": "红色",
      "score": 446,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "意图看破",
      "star": 1,
      "owner": "佐久间",
      "quality": "红色",
      "score": 446,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    },
    {
      "name": "不息之风",
      "star": 1,
      "owner": "佐久间",
      "quality": "红色",
      "score": 446,
      "note": "截图 OCR 样本；entry_id/type 未建立映射"
    }
  ]
};
  if (typeof module === "object" && module.exports) module.exports = data;
  if (root) {
    root.BBNoteEntriesData = data;
    root.BBT = root.BBT || {};
    root.BBT.noteEntriesData = data;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

/*!
 * data/sample-characters.js —— 内置示例角色数据（降级用）
 *
 * 为什么需要它：浏览器 file:// 下不能 fetch 本地 JSON（CORS），
 * 所以角色数据必须在构建期固化成全局脚本。若 data/structured/characters.json
 * 还不存在，build-data.mjs 就把本文件的数据写进 data/characters.js。
 *
 * 数据边界（重要）：
 *  - 姓名来自 GameKee 词条标题（2026-10 抓取），确实存在；
 *  - 星级 / 六维 / 定位等结构化字段尚未清洗，一律留空（null / []），
 *    界面显示「待导入」，绝不臆造数值；
 *  - 已知的技能加值来自 T4 任务给定公式与 Lead 提供的内测截图 OCR，
 *    每条都带 confidence 与 source。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BB_SAMPLE_CHARACTERS = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var GAMEKEE_NAMES_SOURCE = 'GameKee 词条标题（2026-10 抓取，Lead 已核实游戏 wiki）';
  var TASK_SOURCE = 'T4 任务给定公式（社区实测）';
  var OCR_SOURCE = '内测截图人工 OCR（Lead 提供，2026-11-05）';

  function base(name, extra) {
    var item = {
      id: String(name).replace(/\s+/g, '-').toLowerCase(),
      name: name,
      aliases: [],
      rarity: null,
      stars: null,
      role: null,
      position: null,
      tags: [],
      stats: null,
      skills: [],
      description: '',
      source: GAMEKEE_NAMES_SOURCE,
      confidence: '单源',
      dataStatus: 'partial',
      note: '仅姓名来自 Wiki 词条，星级 / 六维 / 定位等待 T1 结构化数据导入。'
    };
    if (extra) {
      Object.keys(extra).forEach(function (k) {
        item[k] = extra[k];
      });
    }
    return item;
  }

  var SAMPLE = [
    base('真崎 辉世', {
      aliases: ['真崎'],
      tags: ['表情一致'],
      skills: [
        {
          name: '表情一致倍率',
          summary: '一致倍率 = 2.5 + 0.25',
          confidence: '实测',
          source: TASK_SOURCE
        }
      ],
      description: '表情一致流的倍率核心：把一致乘区从 2.5 抬到 2.75。'
    }),
    base('望月 透', {
      aliases: ['望月'],
      tags: ['表情爆发'],
      skills: [
        { name: '表情技能加值', summary: '每个表情 +8%', confidence: '实测', source: TASK_SOURCE }
      ],
      description: '表情技能加值角色，直接抬高每个表情的 bonus。'
    }),
    base('龙宫寺 心叶', {
      aliases: ['龙宫寺'],
      tags: ['表情爆发'],
      skills: [
        { name: '表情技能加值', summary: '每个表情 +4%', confidence: '实测', source: TASK_SOURCE }
      ],
      description: '与望月叠加后，每个表情的 bonus 从 20% 抬到 32%。'
    }),
    base('佐久间 雨乃', {
      aliases: ['佐久间'],
      tags: ['训练流'],
      skills: [
        {
          name: '队友训练增益',
          summary: '队友训练时主属性 +3，50% 概率额外 +2（期望 +4）',
          confidence: '单源',
          source: OCR_SOURCE
        }
      ],
      description: '训练流核心辅助：把单次训练收益的括号小计抬高约 4 点。'
    }),
    base('闪堂电', {
      aliases: ['闪堂'],
      tags: ['招募中'],
      skills: []
    }),
    base('澪奈·贾妮丝', { aliases: ['澪奈'] }),
    base('近江 奏', { aliases: ['近江'] }),
    base('和泉 香织', { aliases: ['和泉'] }),
    base('亚理纱 贾斯敏', { aliases: ['亚理纱'] }),
    base('洺瑶'),
    base('克拉丽丝·波洛', { aliases: ['克拉丽丝'] }),
    base('早濑 千秋', { aliases: ['早濑'] }),
    base('羽田 朱志香', { aliases: ['羽田'] }),
    base('百目鬼 剑', { aliases: ['百目鬼'] }),
    base('藤松 玖怜', { aliases: ['藤松'] }),
    base('绿川 步梦', { aliases: ['绿川'] }),
    base('雨森 琉璃', { aliases: ['雨森'] }),
    base('皆川 式', { aliases: ['皆川'] }),
    base('毒岛 黛也', { aliases: ['毒岛'] }),
    base('名雪 纱夜', { aliases: ['名雪'] }),
    base('五十岚 诗音', { aliases: ['五十岚'] }),
    base('羽濑川 湊', { aliases: ['羽濑川'] }),
    base('先斗 月绮', { aliases: ['先斗'] }),
    base('白神 时久', { aliases: ['白神'] }),
    base('希雅·奥黛拉', { aliases: ['希雅'] })
  ];

  return SAMPLE;
});

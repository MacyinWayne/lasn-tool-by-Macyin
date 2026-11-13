/** src/data/styles.js —— 【自动生成，请勿手改】通用配队加成（风格/卡色） */
window.BBTStyleData = {
 "schema": "style-bonus-v1",
 "generatedAt": "2026-11-09",
 "source": "寒溟口径（2026-11-09）+ res19 match_label 标签表/标签计算表（卡色由标签表 outline_color 确证）",
 "note": "此「风格」= 角色卡牌颜色（蓝/红/绿/紫/金），与战场定位标签（得分手/防守者/篮板手/组织者/多面手）不是同一维度。",
 "stacking": "不同类效果可同时触发（如同时满足速度 3 人 + 力量 3 人，则速卡与力卡都加成）；同类只取满足的最高档。",
 "cardColors": [
  {
   "style": "速度",
   "styleId": 1,
   "cardColor": "蓝卡",
   "colorHex": "#009ED2",
   "colorRgb": [
    0,
    158,
    210
   ]
  },
  {
   "style": "力量",
   "styleId": 2,
   "cardColor": "红卡",
   "colorHex": "#D51818",
   "colorRgb": [
    213,
    24,
    24
   ]
  },
  {
   "style": "技巧",
   "styleId": 3,
   "cardColor": "绿卡",
   "colorHex": "#1AA452",
   "colorRgb": [
    26,
    164,
    82
   ]
  },
  {
   "style": "球商",
   "styleId": 4,
   "cardColor": "紫卡",
   "colorHex": "#4352E4",
   "colorRgb": [
    67,
    82,
    228
   ]
  },
  {
   "style": "全能",
   "styleId": 5,
   "cardColor": "金卡",
   "colorHex": "#AC8C4B",
   "colorRgb": [
    172,
    140,
    75
   ]
  }
 ],
 "rules": [
  {
   "style": "速度",
   "cardColor": "蓝卡",
   "target": "全队速卡",
   "thresholds": [
    {
     "count": 3,
     "percent": 10
    },
    {
     "count": 5,
     "percent": 25
    }
   ],
   "desc": "队伍中包含 3/5 个速度风格（蓝卡）球员 → 全队速卡效果提升 10%/25%"
  },
  {
   "style": "力量",
   "cardColor": "红卡",
   "target": "全队力卡",
   "thresholds": [
    {
     "count": 3,
     "percent": 10
    },
    {
     "count": 5,
     "percent": 25
    }
   ],
   "desc": "队伍中包含 3/5 个力量风格（红卡）球员 → 全队力卡效果提升 10%/25%"
  },
  {
   "style": "技巧",
   "cardColor": "绿卡",
   "target": "全队技卡",
   "thresholds": [
    {
     "count": 3,
     "percent": 10
    },
    {
     "count": 5,
     "percent": 25
    }
   ],
   "desc": "队伍中包含 3/5 个技巧风格（绿卡）球员 → 全队技卡效果提升 10%/25%"
  },
  {
   "style": "球商",
   "cardColor": "紫卡",
   "target": "全队【看破时】打卡",
   "thresholds": [
    {
     "count": 3,
     "percent": 10
    },
    {
     "count": 5,
     "percent": 25
    }
   ],
   "desc": "队伍中包含 3/5 个球商风格（紫卡）球员 → 全队【看破时】打卡效果提升 10%/25%（紫卡角色的卡可能是力/技/速卡任意一种）"
  },
  {
   "style": "全能",
   "cardColor": "金卡",
   "target": "全队所有卡",
   "thresholds": [
    {
     "count": 1,
     "percent": 5
    },
    {
     "count": 2,
     "percent": 10
    },
    {
     "count": 5,
     "percent": 25
    }
   ],
   "desc": "队伍中包含 1/2/5 个全能风格（金卡/多面手）球员 → 全队所有卡效果提升 5%/10%/25%"
  }
 ],
 "configEvidence": {
  "file": "lua_conf_S1.cn.match_label.sw（res19）",
  "tables": [
   "标签表（6 行：速度/技巧/力量/球商/全能 + 无）",
   "标签计算表（18 行：label_level + condition_info + label_effect）"
  ],
  "effectCodeRule": "label_effect 编码 X01=10%、X02=25%；全能 501=5%、502=10%、503=25%（与寒溟口径一致）"
 },
 "distribution": {
  "力量": 10,
  "技巧": 12,
  "速度": 7,
  "球商": 6,
  "全能": 3
 },
 "characters": [
  {
   "name": "澪奈·贾妮丝",
   "style": "力量",
   "styleId": 2,
   "title": "内线杀器"
  },
  {
   "name": "龙宫寺 心叶",
   "style": "技巧",
   "styleId": 3,
   "title": "三分好手"
  },
  {
   "name": "近江 奏",
   "style": "技巧",
   "styleId": 3,
   "title": "中投好手"
  },
  {
   "name": "和泉 香织",
   "style": "速度",
   "styleId": 1,
   "title": "充能辅助"
  },
  {
   "name": "亚理纱 贾斯敏",
   "style": "速度",
   "styleId": 1,
   "title": "内线杀器"
  },
  {
   "name": "洺瑶",
   "style": "力量",
   "styleId": 2,
   "title": "防守大闸"
  },
  {
   "name": "闪堂电",
   "style": "速度",
   "styleId": 1,
   "title": "突破达人"
  },
  {
   "name": "克拉丽丝·波洛",
   "style": "技巧",
   "styleId": 3,
   "title": "外线辅助"
  },
  {
   "name": "早濑 千秋",
   "style": "力量",
   "styleId": 2,
   "title": "内线大闸"
  },
  {
   "name": "羽田 朱志香",
   "style": "技巧",
   "styleId": 3,
   "title": "三分达人"
  },
  {
   "name": "望月 透",
   "style": "速度",
   "styleId": 1,
   "title": "后期大核"
  },
  {
   "name": "百目鬼 剑",
   "style": "技巧",
   "styleId": 3,
   "title": "中投达人"
  },
  {
   "name": "藤松 玖怜",
   "style": "力量",
   "styleId": 2,
   "title": "进攻妨害"
  },
  {
   "name": "绿川 步梦",
   "style": "技巧",
   "styleId": 3,
   "title": "防守妨害"
  },
  {
   "name": "雨森 琉璃",
   "style": "技巧",
   "styleId": 3,
   "title": "得分手"
  },
  {
   "name": "皆川 式",
   "style": "技巧",
   "styleId": 3,
   "title": "抢断达人"
  },
  {
   "name": "毒岛 黛也",
   "style": "力量",
   "styleId": 2,
   "title": "中投达人"
  },
  {
   "name": "名雪 纱夜",
   "style": "技巧",
   "styleId": 3,
   "title": "群体大奶"
  },
  {
   "name": "佐久间 雨乃",
   "style": "力量",
   "styleId": 2,
   "title": "扣篮达人"
  },
  {
   "name": "千圣·贝尔丝",
   "style": "球商",
   "styleId": 4,
   "title": "篮板猛兽"
  },
  {
   "name": "稻叶 杏里",
   "style": "速度",
   "styleId": 1,
   "title": "耐力妨害"
  },
  {
   "name": "清水 万里",
   "style": "球商",
   "styleId": 4,
   "title": "内线辅助"
  },
  {
   "name": "榎本 纯那",
   "style": "力量",
   "styleId": 2,
   "title": "上篮达人"
  },
  {
   "name": "春澄 永远",
   "style": "球商",
   "styleId": 4,
   "title": "单体大奶"
  },
  {
   "name": "森田 莉莉",
   "style": "速度",
   "styleId": 1,
   "title": "得分手"
  },
  {
   "name": "美伽 未来",
   "style": "技巧",
   "styleId": 3,
   "title": "防守者"
  },
  {
   "name": "五十岚 诗音",
   "style": "力量",
   "styleId": 2,
   "title": "得分手"
  },
  {
   "name": "羽濑川 湊",
   "style": "球商",
   "styleId": 4,
   "title": "得分手"
  },
  {
   "name": "真崎 辉世",
   "style": "速度",
   "styleId": 1,
   "title": "得分手"
  },
  {
   "name": "先斗 月绮",
   "style": "力量",
   "styleId": 2,
   "title": "得分手"
  },
  {
   "name": "卧云 真昼",
   "style": "技巧",
   "styleId": 3,
   "title": "辅助"
  },
  {
   "name": "野上 泷",
   "style": "全能",
   "styleId": 5,
   "title": "得分手"
  },
  {
   "name": "降旗 千红纱",
   "style": "球商",
   "styleId": 4,
   "title": "防守者"
  },
  {
   "name": "林原 树里",
   "style": "力量",
   "styleId": 2,
   "title": "辅助"
  },
  {
   "name": "美星 栗栖",
   "style": "球商",
   "styleId": 4,
   "title": "得分手"
  },
  {
   "name": "远野 桐",
   "style": "技巧",
   "styleId": 3,
   "title": "得分手"
  },
  {
   "name": "白神 时久",
   "style": "全能",
   "styleId": 5,
   "title": "防守者"
  },
  {
   "name": "希雅·奥黛拉",
   "style": "全能",
   "styleId": 5,
   "title": "得分手/防守者"
  }
 ],
 "byStyle": {
  "力量": [
   "澪奈·贾妮丝",
   "洺瑶",
   "早濑 千秋",
   "藤松 玖怜",
   "毒岛 黛也",
   "佐久间 雨乃",
   "榎本 纯那",
   "五十岚 诗音",
   "先斗 月绮",
   "林原 树里"
  ],
  "技巧": [
   "龙宫寺 心叶",
   "近江 奏",
   "克拉丽丝·波洛",
   "羽田 朱志香",
   "百目鬼 剑",
   "绿川 步梦",
   "雨森 琉璃",
   "皆川 式",
   "名雪 纱夜",
   "美伽 未来",
   "卧云 真昼",
   "远野 桐"
  ],
  "速度": [
   "和泉 香织",
   "亚理纱 贾斯敏",
   "闪堂电",
   "望月 透",
   "稻叶 杏里",
   "森田 莉莉",
   "真崎 辉世"
  ],
  "球商": [
   "千圣·贝尔丝",
   "清水 万里",
   "春澄 永远",
   "羽濑川 湊",
   "降旗 千红纱",
   "美星 栗栖"
  ],
  "全能": [
   "野上 泷",
   "白神 时久",
   "希雅·奥黛拉"
  ]
 }
};

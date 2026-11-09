(function (root) {
  'use strict';
  var data = {
  "schema": 1,
  "generatedAt": "2026-11-05 22:00",
  "mode": "structured",
  "source": "data/structured/derived_roster.json",
  "count": 38,
  "meta": {
    "generated_at": "2026-11-05 07:25",
    "method_version": "t8-1.0",
    "source": {
      "characters": "data/structured/characters.json（T1 产出）",
      "guides": "data/structured/guides/（725623 强度榜、725488/725397/725396/725602/725600 流派与替代逻辑）",
      "claims": "knowledge/claims.md（T2 产出，已做交叉表）"
    },
    "count": 38,
    "field_notes": [
      "「相对评分」是 wiki 参考数值 + 技能文本的启发式派生，不是客户端精确强度，也不能直接替代实测。",
      "wiki 六维参考值实际由「位置原型模板 × 稀有度曲线」决定，因此 base 分主要区分稀有度与模板，skill 分才区分同模板同稀有度角色。",
      "七维中的篮板、体能/耐久没有直接属性，使用代理指标（见 scoring.composites / durability 说明），置信度低。",
      "社区梯队有两套来源：725623（比赛/综合，22 人，B站视频转述）与 TapTap 训练强度榜（19 人，白板 0 星 1 级）；两榜口径不同，均只作方向性校验，未上榜角色不补评级。",
      "wiki 面板/潜力是「成长参考」，不是战斗面板（claims §A 的 H1/H2 假设待客户端定型）；工具包应分「训练价值/比赛价值」两栏展示。",
      "潜力槽位顺序经复核对应六维属性顺序（Lead 已验证，本脚本复核数值见 validation）。"
    ],
    "scoring": {
      "method_version": "t8-1.0",
      "composites": {
        "offense": {
          "formula": "0.5×投射 + 0.5×攻筐",
          "weights": {
            "投射": 0.5,
            "攻筐": 0.5
          }
        },
        "spacing": {
          "formula": "1.0×投射",
          "weights": {
            "投射": 1
          },
          "note": "外线投射能力；wiki 无三分单列属性，用投射代理"
        },
        "defense": {
          "formula": "0.5×防投 + 0.5×护筐",
          "weights": {
            "防投": 0.5,
            "护筐": 0.5
          }
        },
        "playmaking": {
          "formula": "1.0×传球",
          "weights": {
            "传球": 1
          }
        },
        "drive": {
          "formula": "0.6×突破 + 0.4×攻筐",
          "weights": {
            "突破": 0.6,
            "攻筐": 0.4
          }
        },
        "rebound_proxy": {
          "formula": "0.6×攻筐 + 0.4×护筐",
          "weights": {
            "攻筐": 0.6,
            "护筐": 0.4
          },
          "confidence": "低",
          "note": "wiki 六维无「篮板」属性；claims §A 内测单源称「篮板基本只由弹跳决定」，H1 映射下弹跳≈攻筐，故以攻筐为主+护筐为代理，待客户端校验"
        }
      },
      "position_weights": {
        "控卫": {
          "offense": 0.1,
          "spacing": 0.15,
          "defense": 0.1,
          "playmaking": 0.3,
          "drive": 0.2,
          "rebound": 0.05,
          "durability": 0.1
        },
        "分卫": {
          "offense": 0.25,
          "spacing": 0.3,
          "defense": 0.1,
          "playmaking": 0.1,
          "drive": 0.15,
          "rebound": 0.05,
          "durability": 0.05
        },
        "小前": {
          "offense": 0.25,
          "spacing": 0.15,
          "defense": 0.15,
          "playmaking": 0.1,
          "drive": 0.2,
          "rebound": 0.1,
          "durability": 0.05
        },
        "大前": {
          "offense": 0.2,
          "spacing": 0.05,
          "defense": 0.25,
          "playmaking": 0.05,
          "drive": 0.1,
          "rebound": 0.3,
          "durability": 0.05
        },
        "中锋": {
          "offense": 0.25,
          "spacing": 0,
          "defense": 0.3,
          "playmaking": 0.05,
          "drive": 0.05,
          "rebound": 0.25,
          "durability": 0.1
        }
      },
      "base_growth_mix": {
        "base": 0.6,
        "growth": 0.4
      },
      "overall_weights": {
        "base": 0.45,
        "growth": 0.3,
        "skill": 0.25
      },
      "skill_value_rules": {
        "magnitude": {
          "大幅": 3,
          "中幅": 2,
          "小幅": 1,
          "default": 1.5
        },
        "scope": {
          "全队": 3,
          "多人": 2.2,
          "队友": 1.8,
          "自身": 1,
          "对位削弱": 1.6,
          "default": 1.2
        },
        "category_bonus": {
          "专属机制": 1.25,
          "团队增益": 1.15,
          "弱化/干扰": 1.1,
          "耐久/能量资源": 1.05,
          "自我增益": 1
        },
        "level2_bonus": 1.15,
        "probability_penalty": 0.8
      },
      "durability_formula": "体能/耐久（代理） = 0.5×模板潜力均衡度(0-100) + 0.5×防守潜力百分位(0-100)；wiki 无体能/耐久属性，待客户端校验",
      "normalization": "每个维度先对 38 人做 z-score 与百分位；位置加权分 = Σ 位置权重×维度 z-score；总评 = 0.45×base百分位 + 0.30×growth百分位 + 0.25×技能百分位",
      "adjustable": true,
      "weights_note": "修改本文件 SCORING 常量后重跑即可；JSON 内保留实际使用的权重快照"
    },
    "validation": {
      "potential_order": {
        "claim": "potential slot1..6 依次对应 投射/攻筐/防投/护筐/传球/突破（Lead 已验证）",
        "within_player_spearman": {
          "mean": 0.9947,
          "min": 0.9429,
          "max": 1
        },
        "global_pearson": 0.9027,
        "per_slot_pearson": [
          {
            "slot": "slot1",
            "attribute": "投射",
            "pearson": 0.928
          },
          {
            "slot": "slot2",
            "attribute": "攻筐",
            "pearson": 0.896
          },
          {
            "slot": "slot3",
            "attribute": "防投",
            "pearson": 0.867
          },
          {
            "slot": "slot4",
            "attribute": "护筐",
            "pearson": 0.937
          },
          {
            "slot": "slot5",
            "attribute": "传球",
            "pearson": 0.885
          },
          {
            "slot": "slot6",
            "attribute": "突破",
            "pearson": 0.834
          }
        ],
        "verdict": "patch 通过：槽位顺序与属性顺序一致（组内 Spearman 均 >0.9）"
      },
      "rarity_fit": {
        "SSR": {
          "n_players": 22,
          "n_points": 132,
          "fit_all_points": {
            "a": 107.115,
            "b": 0.55076,
            "r2": 0.9993,
            "mae": 0.61,
            "rmse": 0.74
          },
          "outliers": [],
          "fit_robust": null,
          "final": {
            "a": 107.115,
            "b": 0.55076,
            "r2": 0.9993,
            "mae": 0.61,
            "rmse": 0.74
          },
          "residual_ranking": [
            {
              "content_id": 725352,
              "name": "望月 透",
              "mean_abs_residual": 1.01,
              "max_abs_residual": 1.4,
              "residuals": {
                "投射": -1.3,
                "攻筐": 1.3,
                "防投": 1.4,
                "护筐": -0.7,
                "传球": -0.3,
                "突破": 1.1
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725354,
              "name": "百目鬼 剑",
              "mean_abs_residual": 0.92,
              "max_abs_residual": 1.4,
              "residuals": {
                "投射": -1.3,
                "攻筐": -0.3,
                "防投": 1.4,
                "护筐": -0.7,
                "传球": -0.7,
                "突破": 1.1
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725379,
              "name": "远野 桐",
              "mean_abs_residual": 0.89,
              "max_abs_residual": 1.29,
              "residuals": {
                "投射": -0.8,
                "攻筐": 1.3,
                "防投": 1.3,
                "护筐": -0.4,
                "传球": -0.7,
                "突破": 0.9
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725355,
              "name": "藤松 玖怜",
              "mean_abs_residual": 0.87,
              "max_abs_residual": 1.28,
              "residuals": {
                "投射": -1.3,
                "攻筐": 1.3,
                "防投": -0.2,
                "护筐": -0.7,
                "传球": -0.7,
                "突破": 1.1
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725362,
              "name": "千圣·贝尔丝",
              "mean_abs_residual": 0.81,
              "max_abs_residual": 1.29,
              "residuals": {
                "投射": -1.2,
                "攻筐": -0.3,
                "防投": 1.3,
                "护筐": -0.4,
                "传球": -0.7,
                "突破": 0.9
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725366,
              "name": "榎本 纯那",
              "mean_abs_residual": 0.81,
              "max_abs_residual": 1.29,
              "residuals": {
                "投射": -1.2,
                "攻筐": -0.3,
                "防投": 1.3,
                "护筐": -0.4,
                "传球": -0.7,
                "突破": 0.9
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725357,
              "name": "雨森 琉璃",
              "mean_abs_residual": 0.65,
              "max_abs_residual": 1.45,
              "residuals": {
                "投射": 0.3,
                "攻筐": 0.9,
                "防投": 0.5,
                "护筐": -0.3,
                "传球": -1.5,
                "突破": -0.4
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725363,
              "name": "稻叶 杏里",
              "mean_abs_residual": 0.64,
              "max_abs_residual": 1.34,
              "residuals": {
                "投射": -0.1,
                "攻筐": 1.3,
                "防投": 0,
                "护筐": 0.7,
                "传球": -0.5,
                "突破": 1.1
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725361,
              "name": "佐久间 雨乃",
              "mean_abs_residual": 0.61,
              "max_abs_residual": 1.34,
              "residuals": {
                "投射": -0.1,
                "攻筐": 1.3,
                "防投": -0.5,
                "护筐": 1.1,
                "传球": -0.5,
                "突破": 0.1
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725376,
              "name": "降旗 千红纱",
              "mean_abs_residual": 0.59,
              "max_abs_residual": 0.99,
              "residuals": {
                "投射": 0.4,
                "攻筐": 0.6,
                "防投": 0.7,
                "护筐": 0.2,
                "传球": -1,
                "突破": 0.6
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725380,
              "name": "白神 时久",
              "mean_abs_residual": 0.59,
              "max_abs_residual": 0.99,
              "residuals": {
                "投射": 0.4,
                "攻筐": 0.2,
                "防投": 0.7,
                "护筐": 0.2,
                "传球": -1,
                "突破": 1
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725375,
              "name": "野上 泷",
              "mean_abs_residual": 0.58,
              "max_abs_residual": 1.14,
              "residuals": {
                "投射": 0.3,
                "攻筐": 0.9,
                "防投": 0.5,
                "护筐": 0.1,
                "传球": -0.5,
                "突破": 1.1
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725371,
              "name": "羽濑川 湊",
              "mean_abs_residual": 0.55,
              "max_abs_residual": 1.14,
              "residuals": {
                "投射": 0.3,
                "攻筐": -0.3,
                "防投": -0.2,
                "护筐": -0.7,
                "传球": -0.7,
                "突破": 1.1
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725347,
              "name": "洺瑶",
              "mean_abs_residual": 0.51,
              "max_abs_residual": 1.19,
              "residuals": {
                "投射": -1.2,
                "攻筐": -0.3,
                "防投": -0.3,
                "护筐": -0.9,
                "传球": 0.3,
                "突破": -0.1
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725381,
              "name": "希雅·奥黛拉",
              "mean_abs_residual": 0.51,
              "max_abs_residual": 1.19,
              "residuals": {
                "投射": -1.2,
                "攻筐": -0.3,
                "防投": -0.3,
                "护筐": -0.9,
                "传球": 0.3,
                "突破": -0.1
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725351,
              "name": "羽田 朱志香",
              "mean_abs_residual": 0.48,
              "max_abs_residual": 1.31,
              "residuals": {
                "投射": -1.3,
                "攻筐": -0.3,
                "防投": -0.1,
                "护筐": -0.7,
                "传球": 0.2,
                "突破": -0.2
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725374,
              "name": "卧云 真昼",
              "mean_abs_residual": 0.48,
              "max_abs_residual": 1.31,
              "residuals": {
                "投射": -1.3,
                "攻筐": -0.3,
                "防投": -0.1,
                "护筐": -0.7,
                "传球": 0.2,
                "突破": -0.2
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725348,
              "name": "闪堂电",
              "mean_abs_residual": 0.46,
              "max_abs_residual": 0.79,
              "residuals": {
                "投射": 0.3,
                "攻筐": 0.1,
                "防投": -0.1,
                "护筐": -0.7,
                "传球": -0.8,
                "突破": 0.8
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725345,
              "name": "和泉 香织",
              "mean_abs_residual": 0.44,
              "max_abs_residual": 0.99,
              "residuals": {
                "投射": 0.4,
                "攻筐": 0.2,
                "防投": 0.3,
                "护筐": 0.2,
                "传球": -0.6,
                "突破": 1
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725360,
              "name": "名雪 纱夜",
              "mean_abs_residual": 0.38,
              "max_abs_residual": 1.37,
              "residuals": {
                "投射": 0.4,
                "攻筐": 0.2,
                "防投": 0.3,
                "护筐": -1.4,
                "传球": 0,
                "突破": 0
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725377,
              "name": "林原 树里",
              "mean_abs_residual": 0.33,
              "max_abs_residual": 0.7,
              "residuals": {
                "投射": 0.3,
                "攻筐": -0.3,
                "防投": 0.3,
                "护筐": -0.7,
                "传球": -0.2,
                "突破": 0.2
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725372,
              "name": "真崎 辉世",
              "mean_abs_residual": 0.3,
              "max_abs_residual": 0.7,
              "residuals": {
                "投射": 0.3,
                "攻筐": -0.3,
                "防投": -0.1,
                "护筐": -0.7,
                "传球": 0.2,
                "突破": 0.2
              },
              "flag": null,
              "note": null
            }
          ]
        },
        "SR": {
          "n_players": 13,
          "n_points": 78,
          "fit_all_points": {
            "a": 103.554,
            "b": 0.50245,
            "r2": 0.8385,
            "mae": 8.78,
            "rmse": 12.2
          },
          "outliers": [
            {
              "content_id": 725342,
              "name": "澪奈·贾妮丝",
              "attribute_sum": 1297,
              "predicted_sum": 1123.8,
              "delta": 173.2
            },
            {
              "content_id": 725343,
              "name": "龙宫寺 心叶",
              "attribute_sum": 1293,
              "predicted_sum": 1123.8,
              "delta": 169.2
            }
          ],
          "fit_robust": {
            "a": 98.544,
            "b": 0.50137,
            "r2": 0.9991,
            "mae": 0.71,
            "rmse": 0.88,
            "note": "剔除单槽平均残差 >10 的异常球员后重拟合"
          },
          "final": {
            "a": 98.544,
            "b": 0.50137,
            "r2": 0.9991,
            "mae": 0.71,
            "rmse": 0.88
          },
          "residual_ranking": [
            {
              "content_id": 725342,
              "name": "澪奈·贾妮丝",
              "mean_abs_residual": 34.06,
              "max_abs_residual": 35.1,
              "residuals": {
                "投射": 33.3,
                "攻筐": 35.1,
                "防投": 34.3,
                "护筐": 34.6,
                "传球": 33.3,
                "突破": 33.8
              },
              "flag": "rarity_fit_outlier",
              "note": "wiki 稀有度与属性曲线不一致：SR 标注但属性远高于 SR 拟合；社区强度榜（725623）把龙宫寺列入 SSR 榜，疑为图鉴稀有度标注/版本差异，需客户端校验"
            },
            {
              "content_id": 725343,
              "name": "龙宫寺 心叶",
              "mean_abs_residual": 33.39,
              "max_abs_residual": 34.66,
              "residuals": {
                "投射": 33.7,
                "攻筐": 32.7,
                "防投": 33.8,
                "护筐": 32.7,
                "传球": 32.8,
                "突破": 34.7
              },
              "flag": "rarity_fit_outlier",
              "note": "wiki 稀有度与属性曲线不一致：SR 标注但属性远高于 SR 拟合；社区强度榜（725623）把龙宫寺列入 SSR 榜，疑为图鉴稀有度标注/版本差异，需客户端校验"
            },
            {
              "content_id": 725378,
              "name": "美星 栗栖",
              "mean_abs_residual": 0.98,
              "max_abs_residual": 1.75,
              "residuals": {
                "投射": 1.2,
                "攻筐": -0.8,
                "防投": 1.3,
                "护筐": -0.2,
                "传球": -1.7,
                "突破": 0.7
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725373,
              "name": "先斗 月绮",
              "mean_abs_residual": 0.98,
              "max_abs_residual": 2.39,
              "residuals": {
                "投射": -0.4,
                "攻筐": 0.3,
                "防投": 0.3,
                "护筐": 1.3,
                "传球": -2.4,
                "突破": 1.2
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725346,
              "name": "亚理纱 贾斯敏",
              "mean_abs_residual": 0.96,
              "max_abs_residual": 1.72,
              "residuals": {
                "投射": 1.3,
                "攻筐": 1.1,
                "防投": -1.7,
                "护筐": 0.6,
                "传球": -0.7,
                "突破": -0.3
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725356,
              "name": "绿川 步梦",
              "mean_abs_residual": 0.96,
              "max_abs_residual": 1.72,
              "residuals": {
                "投射": 1.3,
                "攻筐": 1.1,
                "防投": -1.7,
                "护筐": 0.6,
                "传球": -0.7,
                "突破": -0.3
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725358,
              "name": "皆川 式",
              "mean_abs_residual": 0.73,
              "max_abs_residual": 1.82,
              "residuals": {
                "投射": 0.3,
                "攻筐": 1.1,
                "防投": -1.8,
                "护筐": -0.2,
                "传球": -0.7,
                "突破": -0.2
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725359,
              "name": "毒岛 黛也",
              "mean_abs_residual": 0.63,
              "max_abs_residual": 1.24,
              "residuals": {
                "投射": 1.1,
                "攻筐": 0.3,
                "防投": -0.7,
                "护筐": 0.2,
                "传球": 0.3,
                "突破": 1.2
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725367,
              "name": "春澄 永远",
              "mean_abs_residual": 0.54,
              "max_abs_residual": 1.2,
              "residuals": {
                "投射": 0.8,
                "攻筐": -0.4,
                "防投": -0.2,
                "护筐": -0.4,
                "传球": -1.2,
                "突破": -0.2
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725350,
              "name": "早濑 千秋",
              "mean_abs_residual": 0.54,
              "max_abs_residual": 1.2,
              "residuals": {
                "投射": 0.8,
                "攻筐": -0.4,
                "防投": -0.4,
                "护筐": -0.3,
                "传球": -1.2,
                "突破": -0.2
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725344,
              "name": "近江 奏",
              "mean_abs_residual": 0.54,
              "max_abs_residual": 1.1,
              "residuals": {
                "投射": 1.1,
                "攻筐": 0.3,
                "防投": -0.7,
                "护筐": 0.3,
                "传球": -0.7,
                "突破": 0.1
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725349,
              "name": "克拉丽丝·波洛",
              "mean_abs_residual": 0.53,
              "max_abs_residual": 1.39,
              "residuals": {
                "投射": 0.8,
                "攻筐": 0.3,
                "防投": 0.3,
                "护筐": 0.3,
                "传球": -1.4,
                "突破": 0.1
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725364,
              "name": "清水 万里",
              "mean_abs_residual": 0.43,
              "max_abs_residual": 0.85,
              "residuals": {
                "投射": 0.8,
                "攻筐": -0.8,
                "防投": 0.3,
                "护筐": 0.3,
                "传球": -0.3,
                "突破": 0.1
              },
              "flag": null,
              "note": null
            }
          ]
        },
        "R": {
          "n_players": 3,
          "n_points": 18,
          "fit_all_points": {
            "a": 100.026,
            "b": 0.36118,
            "r2": 0.9996,
            "mae": 0.36,
            "rmse": 0.4
          },
          "outliers": [],
          "fit_robust": null,
          "final": {
            "a": 100.026,
            "b": 0.36118,
            "r2": 0.9996,
            "mae": 0.36,
            "rmse": 0.4
          },
          "residual_ranking": [
            {
              "content_id": 725369,
              "name": "美伽 未来",
              "mean_abs_residual": 0.49,
              "max_abs_residual": 0.65,
              "residuals": {
                "投射": 0.6,
                "攻筐": -0.6,
                "防投": -0.6,
                "护筐": 0.2,
                "传球": -0.6,
                "突破": -0.3
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725368,
              "name": "森田 莉莉",
              "mean_abs_residual": 0.31,
              "max_abs_residual": 0.49,
              "residuals": {
                "投射": 0.5,
                "攻筐": 0.3,
                "防投": 0.2,
                "护筐": -0.5,
                "传球": -0.1,
                "突破": 0.2
              },
              "flag": null,
              "note": null
            },
            {
              "content_id": 725370,
              "name": "五十岚 诗音",
              "mean_abs_residual": 0.27,
              "max_abs_residual": 0.52,
              "residuals": {
                "投射": -0.1,
                "攻筐": 0.1,
                "防投": 0.5,
                "护筐": 0.3,
                "传球": 0.2,
                "突破": -0.3
              },
              "flag": null,
              "note": null
            }
          ]
        }
      },
      "rarity_spearman": {
        "base_vs_rarity": 0.6697,
        "growth_vs_rarity": -0.1001,
        "panel_vs_rarity": 0.4442,
        "attribute_sum_vs_rarity": 0.693,
        "note": "六维参考值总和与稀有度正相关（attribute_sum_vs_rarity 0.69，未达单调主因是 2 名 SR 异常值 1293/1297 高于全部 SSR）；各稀有度总和中位数序 R<SR<SSR；位置加权面板分（panel_vs_rarity 较低）按位置重新加权，故不随稀有度单调——评分设计选择，非 bug；与社区梯队相关接近 0 说明面板不是比赛强度决定因素"
      },
      "rarity_median_attribute_sum": {
        "R": 962,
        "SR": 1093,
        "SSR": 1193
      },
      "community_tier_crosscheck": {
        "n_matched": 22,
        "overall_spearman": 0.1266,
        "base_spearman": 0.0357,
        "growth_spearman": 0.1479,
        "skill_spearman": -0.0864,
        "note": "同档不排序（T0/T1/T2），Spearman 仅作方向性校验，样本 22 人；社区评级来自 B站视频画面转述，非实测",
        "pairs": [
          {
            "name": "洺瑶",
            "tier": "T0",
            "tierScore": 3,
            "overall": 81.90789473684211,
            "base": 0.7044598524027295,
            "growth": 0.5226365500718535,
            "skill": 22.252
          },
          {
            "name": "野上 泷",
            "tier": "T0",
            "tierScore": 3,
            "overall": 72.5,
            "base": 0.6708531152989147,
            "growth": 0.42307288592260234,
            "skill": 9.775
          },
          {
            "name": "希雅·奥黛拉",
            "tier": "T0",
            "tierScore": 3,
            "overall": 71.38157894736842,
            "base": 0.7044598524027295,
            "growth": 0.5226365500718535,
            "skill": 7.826
          },
          {
            "name": "百目鬼 剑",
            "tier": "T0",
            "tierScore": 3,
            "overall": 66.44736842105263,
            "base": 0.7707619274121478,
            "growth": 0.6704206766156132,
            "skill": 3.7649999999999997
          },
          {
            "name": "闪堂电",
            "tier": "T0",
            "tierScore": 3,
            "overall": 40.92105263157895,
            "base": 0.4059211568794105,
            "growth": 0.12447866506399538,
            "skill": 4.156000000000001
          },
          {
            "name": "稻叶 杏里",
            "tier": "T1",
            "tierScore": 2,
            "overall": 75.65789473684211,
            "base": 0.8169998518797714,
            "growth": 0.5913824765970798,
            "skill": 7.16
          },
          {
            "name": "远野 桐",
            "tier": "T1",
            "tierScore": 2,
            "overall": 68.42105263157895,
            "base": 0.6159522544175924,
            "growth": 0.3754381565593105,
            "skill": 9.43
          },
          {
            "name": "藤松 玖怜",
            "tier": "T1",
            "tierScore": 2,
            "overall": 66.77631578947368,
            "base": 0.5358503542767372,
            "growth": 0.2908356471058711,
            "skill": 13.8
          },
          {
            "name": "卧云 真昼",
            "tier": "T1",
            "tierScore": 2,
            "overall": 64.47368421052632,
            "base": 0.6061071598703427,
            "growth": 0.34972574053059163,
            "skill": 9.100000000000001
          },
          {
            "name": "龙宫寺 心叶",
            "tier": "T1",
            "tierScore": 2,
            "overall": 57.631578947368425,
            "base": 0.9404648990212994,
            "growth": -0.022834805006762236,
            "skill": 5.06
          },
          {
            "name": "羽田 朱志香",
            "tier": "T1",
            "tierScore": 2,
            "overall": 52.631578947368425,
            "base": 0.6061071598703427,
            "growth": 0.34972574053059163,
            "skill": 4
          },
          {
            "name": "名雪 纱夜",
            "tier": "T1",
            "tierScore": 2,
            "overall": 40.26315789473684,
            "base": 0.23878609199426065,
            "growth": -0.09197520468907543,
            "skill": 9.45
          },
          {
            "name": "林原 树里",
            "tier": "T1",
            "tierScore": 2,
            "overall": 22.565789473684212,
            "base": 0.15872033795594717,
            "growth": -0.15750055717770148,
            "skill": 4.2
          },
          {
            "name": "千圣·贝尔丝",
            "tier": "T2",
            "tierScore": 1,
            "overall": 88.48684210526316,
            "base": 0.8855827545630447,
            "growth": 0.7068579686789229,
            "skill": 10.65
          },
          {
            "name": "佐久间 雨乃",
            "tier": "T2",
            "tierScore": 1,
            "overall": 87.23684210526315,
            "base": 1.013857732044024,
            "growth": 0.8120037344836991,
            "skill": 8.15
          },
          {
            "name": "榎本 纯那",
            "tier": "T2",
            "tierScore": 1,
            "overall": 75.65789473684211,
            "base": 0.8855827545630447,
            "growth": 0.7068579686789229,
            "skill": 4.2
          },
          {
            "name": "澪奈·贾妮丝",
            "tier": "T2",
            "tierScore": 1,
            "overall": 68.09210526315789,
            "base": 1.2297510082706578,
            "growth": 0.24500355684414932,
            "skill": 4.529999999999999
          },
          {
            "name": "羽濑川 湊",
            "tier": "T2",
            "tierScore": 1,
            "overall": 59.671052631578945,
            "base": 0.4274378978338494,
            "growth": 0.174464770456967,
            "skill": 13.8
          },
          {
            "name": "雨森 琉璃",
            "tier": "T2",
            "tierScore": 1,
            "overall": 49.473684210526315,
            "base": 0.27269930209842813,
            "growth": -0.022834805006762236,
            "skill": 17.25
          },
          {
            "name": "降旗 千红纱",
            "tier": "T2",
            "tierScore": 1,
            "overall": 39.47368421052632,
            "base": 0.3082854735276543,
            "growth": -0.024100098780163982,
            "skill": 6.619999999999999
          },
          {
            "name": "真崎 辉世",
            "tier": "T2",
            "tierScore": 1,
            "overall": 37.89473684210526,
            "base": 0.4496805257884578,
            "growth": 0.1103747988976177,
            "skill": 3
          },
          {
            "name": "克拉丽丝·波洛",
            "tier": "T2",
            "tierScore": 1,
            "overall": 34.473684210526315,
            "base": -0.24195948115210075,
            "growth": 0.10289433525845729,
            "skill": 10.267
          }
        ]
      },
      "training_tier_crosscheck": {
        "n_matched": 19,
        "panel_spearman": 0.1101,
        "base_spearman": 0.245,
        "growth_spearman": -0.1434,
        "skill_spearman": -0.0511,
        "overall_spearman": 0.1264,
        "unmatched_tokens": [],
        "note": "TapTap 训练强度榜（公测 10-26「北空之丘小助手」，基准白板 0 星 1 级）只转写 T0-T2（19 人）；这是「训练价值」榜，与 GameKee 725623 的「比赛/综合强度」榜口径不同。",
        "pairs": [
          {
            "tier": "T0",
            "name": "希雅·奥黛拉",
            "content_id": 725381,
            "tier_score": 3,
            "panel": 76.3157894736842,
            "base": 0.7044598524027295,
            "growth": 0.5226365500718535,
            "skill": 7.826,
            "overall": 71.38157894736842
          },
          {
            "tier": "T0",
            "name": "野上 泷",
            "content_id": 725375,
            "tier_score": 3,
            "panel": 70.78947368421052,
            "base": 0.6708531152989147,
            "growth": 0.42307288592260234,
            "skill": 9.775,
            "overall": 72.5
          },
          {
            "tier": "T0",
            "name": "羽田 朱志香",
            "content_id": 725351,
            "tier_score": 3,
            "panel": 63.1578947368421,
            "base": 0.6061071598703427,
            "growth": 0.34972574053059163,
            "skill": 4,
            "overall": 52.631578947368425
          },
          {
            "tier": "T0",
            "name": "羽濑川 湊",
            "content_id": 725371,
            "tier_score": 3,
            "panel": 49.73684210526316,
            "base": 0.4274378978338494,
            "growth": 0.174464770456967,
            "skill": 13.8,
            "overall": 59.671052631578945
          },
          {
            "tier": "T0",
            "name": "闪堂电",
            "content_id": 725348,
            "tier_score": 3,
            "panel": 44.473684210526315,
            "base": 0.4059211568794105,
            "growth": 0.12447866506399538,
            "skill": 4.156000000000001,
            "overall": 40.92105263157895
          },
          {
            "tier": "T0",
            "name": "白神 时久",
            "content_id": 725380,
            "tier_score": 3,
            "panel": 24.473684210526315,
            "base": 0.20806576149361505,
            "growth": -0.12885936448648633,
            "skill": 5.76,
            "overall": 30.526315789473685
          },
          {
            "tier": "T1",
            "name": "千圣·贝尔丝",
            "content_id": 725362,
            "tier_score": 2,
            "panel": 89.47368421052632,
            "base": 0.8855827545630447,
            "growth": 0.7068579686789229,
            "skill": 10.65,
            "overall": 88.48684210526316
          },
          {
            "tier": "T1",
            "name": "卧云 真昼",
            "content_id": 725374,
            "tier_score": 2,
            "panel": 63.1578947368421,
            "base": 0.6061071598703427,
            "growth": 0.34972574053059163,
            "skill": 9.100000000000001,
            "overall": 64.47368421052632
          },
          {
            "tier": "T1",
            "name": "早濑 千秋",
            "content_id": 725350,
            "tier_score": 2,
            "panel": 48.15789473684211,
            "base": 0.028710300874887032,
            "growth": 0.5913824765970798,
            "skill": 8.9,
            "overall": 51.9078947368421
          },
          {
            "tier": "T1",
            "name": "真崎 辉世",
            "content_id": 725372,
            "tier_score": 2,
            "panel": 46.57894736842105,
            "base": 0.4496805257884578,
            "growth": 0.1103747988976177,
            "skill": 3,
            "overall": 37.89473684210526
          },
          {
            "tier": "T1",
            "name": "降旗 千红纱",
            "content_id": 725376,
            "tier_score": 2,
            "panel": 35.526315789473685,
            "base": 0.3082854735276543,
            "growth": -0.024100098780163982,
            "skill": 6.619999999999999,
            "overall": 39.47368421052632
          },
          {
            "tier": "T2",
            "name": "佐久间 雨乃",
            "content_id": 725361,
            "tier_score": 1,
            "panel": 96.57894736842104,
            "base": 1.013857732044024,
            "growth": 0.8120037344836991,
            "skill": 8.15,
            "overall": 87.23684210526315
          },
          {
            "tier": "T2",
            "name": "洺瑶",
            "content_id": 725347,
            "tier_score": 1,
            "panel": 76.3157894736842,
            "base": 0.7044598524027295,
            "growth": 0.5226365500718535,
            "skill": 22.252,
            "overall": 81.90789473684211
          },
          {
            "tier": "T2",
            "name": "藤松 玖怜",
            "content_id": 725355,
            "tier_score": 1,
            "panel": 59.21052631578947,
            "base": 0.5358503542767372,
            "growth": 0.2908356471058711,
            "skill": 13.8,
            "overall": 66.77631578947368
          },
          {
            "tier": "T2",
            "name": "亚理纱 贾斯敏",
            "content_id": 725346,
            "tier_score": 1,
            "panel": 56.315789473684205,
            "base": 0.1736889776724503,
            "growth": 0.7068579686789229,
            "skill": 4,
            "overall": 47.5
          },
          {
            "tier": "T2",
            "name": "近江 奏",
            "content_id": 725344,
            "tier_score": 1,
            "panel": 41.8421052631579,
            "base": -0.010407835071428298,
            "growth": 0.4936031817933952,
            "skill": 4.1,
            "overall": 37.631578947368425
          },
          {
            "tier": "T2",
            "name": "望月 透",
            "content_id": 725352,
            "tier_score": 1,
            "panel": 32.89473684210526,
            "base": 0.28577292245331265,
            "growth": -0.05565500663137596,
            "skill": 3.5,
            "overall": 28.289473684210527
          },
          {
            "tier": "T2",
            "name": "名雪 纱夜",
            "content_id": 725360,
            "tier_score": 1,
            "panel": 28.68421052631579,
            "base": 0.23878609199426065,
            "growth": -0.09197520468907543,
            "skill": 9.45,
            "overall": 40.26315789473684
          },
          {
            "tier": "T2",
            "name": "先斗 月绮",
            "content_id": 725373,
            "tier_score": 1,
            "panel": 26.05263157894737,
            "base": -0.23468734153765436,
            "growth": 0.135504441116622,
            "skill": 8.9,
            "overall": 35.328947368421055
          }
        ]
      },
      "tier_sources_agreement": {
        "overlap_count": 13,
        "spearman_between_lists": 0.2407,
        "raw_attribute_correlations": {
          "attr_sum_vs_725623": -0.1479,
          "rarity_vs_725623": 0.2457,
          "attr_sum_vs_training": 0.2278,
          "rarity_vs_training": 0.3899
        },
        "note": "两个社区榜单（725623 比赛/综合 vs TapTap 训练强度）重叠 13 人、Spearman 仅约 0.24 → 口径确实不同，印证「训练价值≠比赛价值」。直接使用 wiki 六维总和/稀有度与两榜的相关都接近 0（725623 甚至为负）→ 面板参考数值不能作为强度代理，社区榜主要反映训练技能/比赛机制。"
      },
      "identical_attribute_groups_count": 4,
      "template_count": 26
    },
    "findings": [
      {
        "code": "potential_order_confirmed",
        "level": "high",
        "text": "潜力槽位顺序=属性顺序已复核：组内 Spearman 均值 0.9947（min 0.9429），全局 Pearson 0.9027。"
      },
      {
        "code": "rarity_fit",
        "level": "high",
        "text": "稀有度基准曲线（attr = a + b×potential）：SSR a=107.115 b=0.55076 R²=0.9993 MAE=0.61；SR（稳健，剔除 2 名异常）a=98.544 b=0.50137 R²=0.9991 MAE=0.71；R a=100.026 b=0.36118 R²=0.9996 MAE=0.36。"
      },
      {
        "code": "templates",
        "level": "high",
        "text": "38 人归并为 26 个潜力向量模板，其中 8 个被 ≥2 人共用（覆盖 20 人），模板与位置原型一致；4 组「同模板+同稀有度」球员六维完全相同（亚理纱=绿川、千圣=榎本、洺瑶=希雅、羽田=卧云），差异只能来自技能/流派天赋——此前 T1 的「占位值」判断应更正为结构性结果。"
      },
      {
        "code": "rarity_outliers",
        "level": "high",
        "text": "SR 拟合异常 2 人：澪奈·贾妮丝（总和 1297，SR 曲线预期约 1100，+196）、龙宫寺 心叶（1293，+193）。龙宫寺在 725623 强度榜被列入「SSR 强度榜」T1，疑为稀有度标注/版本差异；需客户端数据校验。"
      },
      {
        "code": "tier_crosscheck",
        "level": "high",
        "text": "与 725623 社区梯队交叉校验（22 人）：总评 Spearman=0.1266（面板 0.0357 / 潜力 0.1479 / 技能 -0.0864）——相关性接近 0。结合「六维总和与稀有度 Spearman=0.693」，可判断：wiki 六维参考值几乎只由稀有度/模板决定，无法解释社区 T0/T1 梯队；比赛强度差异主要来自技能倍率、升星机制与流派天赋（社区材料定性描述），需要客户端数据量化。"
      },
      {
        "code": "panel_not_strength",
        "level": "high",
        "text": "使用建议：T3/T4 的 roster 评分不要把「wiki 面板分」当强度直接展示给玩家；面板分只适合同位置内的属性偏向描述；强度排序应以技能/机制（待客户端校验）+ 社区梯队（带出处）为准，本文件的 overall 为敏感性演示。"
      },
      {
        "code": "skill_value",
        "level": "info",
        "text": "技能价值为启发式分类（幅度×作用范围×触发概率×等级数），只用于同档位角色间比较；wiki 只收录固定/额外战斗技能，训练乘区/经济类属「训练技能/流派天赋」（claims §I-160 明确三分结构），需社区材料单独建模（本文件 training_talents 已收录 7 条）。"
      },
      {
        "code": "training_tier_crosscheck",
        "level": "high",
        "text": "与 TapTap 训练强度榜（公测 10-26，白板 0 星 1 级，19 人）交叉校验：面板 Spearman=0.1101、总评 0.1264、技能 -0.0511。训练强度榜与 GameKee 725623 的比赛/综合榜口径不同，wiki 面板参考值对两者都只有弱相关——再次说明面板/潜力是「成长参考」，不是强度。"
      },
      {
        "code": "dual_scoring",
        "level": "high",
        "text": "社区明确「训练强度 ≠ 比赛强度」双评分体系（claims §H-208；千圣、羽濑川被称「入场强度为 0」）。工具包/报告必须分栏展示「训练价值 / 比赛价值」，不能合并成单一 T 度；本文件的 overall 仅作派生演示。"
      },
      {
        "code": "dilution_case",
        "level": "high",
        "text": "乘区稀释范本（claims §H-197/198）：佐久间雨乃前期强（主属性加值在加法乘区、基数大 → 被稀释），后期由藤松（原文写作「腾松」）替代（训练加成% 乘区 + 精力回复）；「雨乃换腾松分数有明显提升」为内测实测。相对优势应按乘区位置/边际贡献评估，而不是按面板属性。"
      },
      {
        "code": "tier_sources_agreement",
        "level": "high",
        "text": "两套社区榜单重叠 13 人、Spearman=0.2407（口径不同）；wiki 六维总和 vs 两榜 Spearman 分别为 -0.1479 / 0.2278，稀有度 vs 两榜 0.2457 / 0.3899。→ 面板/稀有度都不能当强度指标。"
      }
    ],
    "anomalies": [],
    "self_check": {
      "pass": true,
      "checks": [
        {
          "name": "claims_parsed",
          "pass": true,
          "value": 143
        },
        {
          "name": "players==38",
          "pass": true,
          "value": 38
        },
        {
          "name": "potential_order_spearman>0.9",
          "pass": true,
          "value": 0.9947
        },
        {
          "name": "template_groups",
          "pass": true,
          "value": 26
        },
        {
          "name": "template_shared_groups",
          "pass": true,
          "value": 8
        },
        {
          "name": "identical_attr_groups",
          "pass": true,
          "value": 4
        },
        {
          "name": "fit_ssr_r2>0.99",
          "pass": true,
          "value": 0.9993
        },
        {
          "name": "fit_sr_robust_r2>0.99",
          "pass": true,
          "value": 0.9991
        },
        {
          "name": "skill_analysis_38x2",
          "pass": true,
          "value": 38
        },
        {
          "name": "rarity_median_order(R<SR<SSR)",
          "pass": true,
          "value": {
            "R": 962,
            "SR": 1093,
            "SSR": 1193
          }
        },
        {
          "name": "tier_list_22",
          "pass": true,
          "value": 22
        },
        {
          "name": "training_tier_crosscheck",
          "pass": true,
          "value": 19
        },
        {
          "name": "tier_sources_agreement_computed",
          "pass": true,
          "value": 13
        },
        {
          "name": "claims_crosswalk",
          "pass": true,
          "value": 24
        }
      ]
    }
  },
  "templates": [
    {
      "template_id": "中锋-T01",
      "name": "中锋·攻筐+护筐型",
      "position": "中锋",
      "potential_vector": {
        "投射": 100,
        "攻筐": 260,
        "防投": 130,
        "护筐": 233,
        "传球": 110,
        "突破": 167
      },
      "potential_vector_array": [
        100,
        260,
        130,
        233,
        110,
        167
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "攻筐",
        "护筐"
      ],
      "shared": true,
      "player_count": 4,
      "players": [
        {
          "content_id": 725346,
          "name": "亚理纱 贾斯敏",
          "rarity": "SR",
          "style": "得分手",
          "attribute_sum": 1093
        },
        {
          "content_id": 725356,
          "name": "绿川 步梦",
          "rarity": "SR",
          "style": "组织者",
          "attribute_sum": 1093
        },
        {
          "content_id": 725362,
          "name": "千圣·贝尔丝",
          "rarity": "SSR",
          "style": "篮板手",
          "attribute_sum": 1193
        },
        {
          "content_id": 725366,
          "name": "榎本 纯那",
          "rarity": "SSR",
          "style": "防守者",
          "attribute_sum": 1193
        }
      ],
      "same_rarity_attr_groups": [
        {
          "template_id": "中锋-T01",
          "template_name": "中锋·攻筐+护筐型",
          "rarity": "SR",
          "players": [
            {
              "content_id": 725346,
              "name": "亚理纱 贾斯敏",
              "skills": [
                "强袭驱进",
                "猛攻的心得"
              ]
            },
            {
              "content_id": 725356,
              "name": "绿川 步梦",
              "skills": [
                "野性掩护",
                "陷阱制造者"
              ]
            }
          ],
          "attributes": {
            "投射": 150,
            "攻筐": 230,
            "防投": 162,
            "护筐": 216,
            "传球": 153,
            "突破": 182
          },
          "attribute_sum": 1093,
          "skill_difference": [
            {
              "name": "亚理纱 贾斯敏",
              "skills": [
                "强袭驱进(固定)",
                "猛攻的心得(额外)"
              ]
            },
            {
              "name": "绿川 步梦",
              "skills": [
                "野性掩护(固定)",
                "陷阱制造者(额外)"
              ]
            }
          ],
          "skill_function_split": [
            {
              "name": "亚理纱 贾斯敏",
              "style": "得分手",
              "skills": [
                {
                  "name": "强袭驱进",
                  "type": "固定",
                  "category": "自我增益",
                  "effect": "buff",
                  "value_score": 2
                },
                {
                  "name": "猛攻的心得",
                  "type": "额外",
                  "category": "自我增益",
                  "effect": "buff",
                  "value_score": 2
                }
              ],
              "skill_categories": [
                "自我增益"
              ],
              "dimension_tags": [
                "offense",
                "defense",
                "rebound",
                "drive"
              ],
              "niche": "得分手 / 自我增益"
            },
            {
              "name": "绿川 步梦",
              "style": "组织者",
              "skills": [
                {
                  "name": "野性掩护",
                  "type": "固定",
                  "category": "团队增益",
                  "effect": "buff",
                  "value_score": 6.9
                },
                {
                  "name": "陷阱制造者",
                  "type": "额外",
                  "category": "弱化/干扰",
                  "effect": "denial",
                  "value_score": 2.2
                }
              ],
              "skill_categories": [
                "团队增益",
                "弱化/干扰"
              ],
              "dimension_tags": [
                "spacing",
                "defense",
                "drive"
              ],
              "niche": "组织者 / 团队增益+弱化/干扰"
            }
          ],
          "conclusion": "同位置原型模板 + 同稀有度 → 六维完全相同；组内选择应看技能/流派天赋功能（可按 skill_function_split 的 niche 分位），属可替代位而非占位错误"
        },
        {
          "template_id": "中锋-T01",
          "template_name": "中锋·攻筐+护筐型",
          "rarity": "SSR",
          "players": [
            {
              "content_id": 725362,
              "name": "千圣·贝尔丝",
              "skills": [
                "篮板怪兽",
                "空战指挥官"
              ]
            },
            {
              "content_id": 725366,
              "name": "榎本 纯那",
              "skills": [
                "帝王冲击",
                "王牌的余裕"
              ]
            }
          ],
          "attributes": {
            "投射": 161,
            "攻筐": 250,
            "防投": 180,
            "护筐": 235,
            "传球": 167,
            "突破": 200
          },
          "attribute_sum": 1193,
          "skill_difference": [
            {
              "name": "千圣·贝尔丝",
              "skills": [
                "篮板怪兽(固定)",
                "空战指挥官(额外)"
              ]
            },
            {
              "name": "榎本 纯那",
              "skills": [
                "帝王冲击(固定)",
                "王牌的余裕(额外)"
              ]
            }
          ],
          "skill_function_split": [
            {
              "name": "千圣·贝尔丝",
              "style": "篮板手",
              "skills": [
                {
                  "name": "篮板怪兽",
                  "type": "固定",
                  "category": "专属机制",
                  "effect": "mechanism",
                  "value_score": 3.75
                },
                {
                  "name": "空战指挥官",
                  "type": "额外",
                  "category": "团队增益",
                  "effect": "buff",
                  "value_score": 6.9
                }
              ],
              "skill_categories": [
                "专属机制",
                "团队增益"
              ],
              "dimension_tags": [
                "spacing",
                "offense",
                "defense",
                "rebound"
              ],
              "niche": "篮板手 / 专属机制+团队增益"
            },
            {
              "name": "榎本 纯那",
              "style": "防守者",
              "skills": [
                {
                  "name": "帝王冲击",
                  "type": "固定",
                  "category": "弱化/干扰",
                  "effect": "denial",
                  "value_score": 2.2
                },
                {
                  "name": "王牌的余裕",
                  "type": "额外",
                  "category": "自我增益",
                  "effect": "buff",
                  "value_score": 2
                }
              ],
              "skill_categories": [
                "弱化/干扰",
                "自我增益"
              ],
              "dimension_tags": [
                "defense",
                "drive",
                "offense",
                "rebound"
              ],
              "niche": "防守者 / 弱化/干扰+自我增益"
            }
          ],
          "conclusion": "同位置原型模板 + 同稀有度 → 六维完全相同；组内选择应看技能/流派天赋功能（可按 skill_function_split 的 niche 分位），属可替代位而非占位错误"
        }
      ]
    },
    {
      "template_id": "中锋-T02",
      "name": "中锋·攻筐+防投型",
      "position": "中锋",
      "potential_vector": {
        "投射": 100,
        "攻筐": 260,
        "防投": 220,
        "护筐": 143,
        "传球": 110,
        "突破": 167
      },
      "potential_vector_array": [
        100,
        260,
        220,
        143,
        110,
        167
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "攻筐",
        "防投"
      ],
      "shared": true,
      "player_count": 3,
      "players": [
        {
          "content_id": 725347,
          "name": "洺瑶",
          "rarity": "SSR",
          "style": "防守者",
          "attribute_sum": 1191
        },
        {
          "content_id": 725370,
          "name": "五十岚 诗音",
          "rarity": "R",
          "style": "防守者",
          "attribute_sum": 962
        },
        {
          "content_id": 725381,
          "name": "希雅·奥黛拉",
          "rarity": "SSR",
          "style": null,
          "attribute_sum": 1191
        }
      ],
      "same_rarity_attr_groups": [
        {
          "template_id": "中锋-T02",
          "template_name": "中锋·攻筐+防投型",
          "rarity": "SSR",
          "players": [
            {
              "content_id": 725347,
              "name": "洺瑶",
              "skills": [
                "绝望的城壁",
                "避实击虚"
              ]
            },
            {
              "content_id": 725381,
              "name": "希雅·奥黛拉",
              "skills": [
                "梦境华尔兹",
                "华彩领舞者"
              ]
            }
          ],
          "attributes": {
            "投射": 161,
            "攻筐": 250,
            "防投": 228,
            "护筐": 185,
            "传球": 168,
            "突破": 199
          },
          "attribute_sum": 1191,
          "skill_difference": [
            {
              "name": "洺瑶",
              "skills": [
                "绝望的城壁(固定)",
                "避实击虚(额外)"
              ]
            },
            {
              "name": "希雅·奥黛拉",
              "skills": [
                "梦境华尔兹(固定)",
                "华彩领舞者(额外)"
              ]
            }
          ],
          "skill_function_split": [
            {
              "name": "洺瑶",
              "style": "防守者",
              "skills": [
                {
                  "name": "绝望的城壁",
                  "type": "固定",
                  "category": "团队增益",
                  "effect": "buff",
                  "value_score": 10.35
                },
                {
                  "name": "避实击虚",
                  "type": "额外",
                  "category": "团队增益",
                  "effect": "buff",
                  "value_score": 11.902
                }
              ],
              "skill_categories": [
                "团队增益"
              ],
              "dimension_tags": [
                "spacing",
                "drive"
              ],
              "niche": "防守者 / 团队增益"
            },
            {
              "name": "希雅·奥黛拉",
              "style": null,
              "skills": [
                {
                  "name": "梦境华尔兹",
                  "type": "固定",
                  "category": "专属机制",
                  "effect": "mechanism",
                  "value_score": 1.875
                },
                {
                  "name": "华彩领舞者",
                  "type": "额外",
                  "category": "团队增益",
                  "effect": "buff",
                  "value_score": 5.951
                }
              ],
              "skill_categories": [
                "专属机制",
                "团队增益"
              ],
              "dimension_tags": [
                "defense",
                "drive",
                "spacing",
                "durability"
              ],
              "niche": " / 专属机制+团队增益"
            }
          ],
          "conclusion": "同位置原型模板 + 同稀有度 → 六维完全相同；组内选择应看技能/流派天赋功能（可按 skill_function_split 的 niche 分位），属可替代位而非占位错误"
        }
      ]
    },
    {
      "template_id": "控卫-T03",
      "name": "控卫·传球+突破型",
      "position": "控卫",
      "potential_vector": {
        "投射": 137,
        "攻筐": 132,
        "防投": 110,
        "护筐": 112,
        "传球": 255,
        "突破": 254
      },
      "potential_vector_array": [
        137,
        132,
        110,
        112,
        255,
        254
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "传球",
        "突破"
      ],
      "shared": true,
      "player_count": 3,
      "players": [
        {
          "content_id": 725345,
          "name": "和泉 香织",
          "rarity": "SSR",
          "style": "得分手",
          "attribute_sum": 1195
        },
        {
          "content_id": 725349,
          "name": "克拉丽丝·波洛",
          "rarity": "SR",
          "style": "组织者",
          "attribute_sum": 1093
        },
        {
          "content_id": 725368,
          "name": "森田 莉莉",
          "rarity": "R",
          "style": "得分手",
          "attribute_sum": 962
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "大前-T04",
      "name": "大前·护筐+攻筐型",
      "position": "大前",
      "potential_vector": {
        "投射": 109,
        "攻筐": 257,
        "防投": 135,
        "护筐": 261,
        "传球": 115,
        "突破": 123
      },
      "potential_vector_array": [
        109,
        257,
        135,
        261,
        115,
        123
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "护筐",
        "攻筐"
      ],
      "shared": true,
      "player_count": 2,
      "players": [
        {
          "content_id": 725361,
          "name": "佐久间 雨乃",
          "rarity": "SSR",
          "style": "防守者",
          "attribute_sum": 1195
        },
        {
          "content_id": 725367,
          "name": "春澄 永远",
          "rarity": "SR",
          "style": "篮板手",
          "attribute_sum": 1091
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "大前-T05",
      "name": "大前·攻筐+防投型",
      "position": "大前",
      "potential_vector": {
        "投射": 109,
        "攻筐": 257,
        "防投": 225,
        "护筐": 171,
        "传球": 115,
        "突破": 123
      },
      "potential_vector_array": [
        109,
        257,
        225,
        171,
        115,
        123
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "攻筐",
        "防投"
      ],
      "shared": true,
      "player_count": 2,
      "players": [
        {
          "content_id": 725350,
          "name": "早濑 千秋",
          "rarity": "SR",
          "style": "防守者",
          "attribute_sum": 1091
        },
        {
          "content_id": 725363,
          "name": "稻叶 杏里",
          "rarity": "SSR",
          "style": "得分手",
          "attribute_sum": 1196
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "小前-T06",
      "name": "小前·攻筐+防投型",
      "position": "小前",
      "potential_vector": {
        "投射": 130,
        "攻筐": 260,
        "防投": 198,
        "护筐": 139,
        "传球": 150,
        "突破": 123
      },
      "potential_vector_array": [
        130,
        260,
        198,
        139,
        150,
        123
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "攻筐",
        "防投"
      ],
      "shared": true,
      "player_count": 2,
      "players": [
        {
          "content_id": 725358,
          "name": "皆川 式",
          "rarity": "SR",
          "style": "组织者",
          "attribute_sum": 1091
        },
        {
          "content_id": 725371,
          "name": "羽濑川 湊",
          "rarity": "SSR",
          "style": "篮板手",
          "attribute_sum": 1193
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "大前-T07",
      "name": "大前·突破+投射型",
      "position": "大前",
      "potential_vector": {
        "投射": 199,
        "攻筐": 167,
        "防投": 135,
        "护筐": 171,
        "传球": 115,
        "突破": 213
      },
      "potential_vector_array": [
        199,
        167,
        135,
        171,
        115,
        213
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "突破",
        "投射"
      ],
      "shared": true,
      "player_count": 2,
      "players": [
        {
          "content_id": 725343,
          "name": "龙宫寺 心叶",
          "rarity": "SR",
          "style": "组织者",
          "attribute_sum": 1293
        },
        {
          "content_id": 725357,
          "name": "雨森 琉璃",
          "rarity": "SSR",
          "style": "组织者",
          "attribute_sum": 1193
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "分卫-T08",
      "name": "分卫·投射+传球型",
      "position": "分卫",
      "potential_vector": {
        "投射": 260,
        "攻筐": 122,
        "防投": 118,
        "护筐": 110,
        "传球": 230,
        "突破": 160
      },
      "potential_vector_array": [
        260,
        122,
        118,
        110,
        230,
        160
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "投射",
        "传球"
      ],
      "shared": true,
      "player_count": 2,
      "players": [
        {
          "content_id": 725351,
          "name": "羽田 朱志香",
          "rarity": "SSR",
          "style": "组织者",
          "attribute_sum": 1191
        },
        {
          "content_id": 725374,
          "name": "卧云 真昼",
          "rarity": "SSR",
          "style": "组织者",
          "attribute_sum": 1191
        }
      ],
      "same_rarity_attr_groups": [
        {
          "template_id": "分卫-T08",
          "template_name": "分卫·投射+传球型",
          "rarity": "SSR",
          "players": [
            {
              "content_id": 725351,
              "name": "羽田 朱志香",
              "skills": [
                "终焉后撤步",
                "红莲爆炎阵"
              ]
            },
            {
              "content_id": 725374,
              "name": "卧云 真昼",
              "skills": [
                "妖刀乱舞",
                "妖刀摄魂"
              ]
            }
          ],
          "attributes": {
            "投射": 249,
            "攻筐": 174,
            "防投": 172,
            "护筐": 167,
            "传球": 234,
            "突破": 195
          },
          "attribute_sum": 1191,
          "skill_difference": [
            {
              "name": "羽田 朱志香",
              "skills": [
                "终焉后撤步(固定)",
                "红莲爆炎阵(额外)"
              ]
            },
            {
              "name": "卧云 真昼",
              "skills": [
                "妖刀乱舞(固定)",
                "妖刀摄魂(额外)"
              ]
            }
          ],
          "skill_function_split": [
            {
              "name": "羽田 朱志香",
              "style": "组织者",
              "skills": [
                {
                  "name": "终焉后撤步",
                  "type": "固定",
                  "category": "自我增益",
                  "effect": "buff",
                  "value_score": 2
                },
                {
                  "name": "红莲爆炎阵",
                  "type": "额外",
                  "category": "自我增益",
                  "effect": "buff",
                  "value_score": 2
                }
              ],
              "skill_categories": [
                "自我增益"
              ],
              "dimension_tags": [
                "spacing"
              ],
              "niche": "组织者 / 自我增益"
            },
            {
              "name": "卧云 真昼",
              "style": "组织者",
              "skills": [
                {
                  "name": "妖刀乱舞",
                  "type": "固定",
                  "category": "弱化/干扰",
                  "effect": "denial",
                  "value_score": 2.2
                },
                {
                  "name": "妖刀摄魂",
                  "type": "额外",
                  "category": "团队增益",
                  "effect": "buff",
                  "value_score": 6.9
                }
              ],
              "skill_categories": [
                "弱化/干扰",
                "团队增益"
              ],
              "dimension_tags": [
                "defense",
                "spacing",
                "drive"
              ],
              "niche": "组织者 / 弱化/干扰+团队增益"
            }
          ],
          "conclusion": "同位置原型模板 + 同稀有度 → 六维完全相同；组内选择应看技能/流派天赋功能（可按 skill_function_split 的 niche 分位），属可替代位而非占位错误"
        }
      ]
    },
    {
      "template_id": "小前-T09",
      "name": "小前·攻筐+护筐型",
      "position": "小前",
      "potential_vector": {
        "投射": 130,
        "攻筐": 260,
        "防投": 108,
        "护筐": 229,
        "传球": 150,
        "突破": 123
      },
      "potential_vector_array": [
        130,
        260,
        108,
        229,
        150,
        123
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "攻筐",
        "护筐"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725342,
          "name": "澪奈·贾妮丝",
          "rarity": "SR",
          "style": "防守者",
          "attribute_sum": 1297
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "控卫-T10",
      "name": "控卫·突破+护筐型",
      "position": "控卫",
      "potential_vector": {
        "投射": 137,
        "攻筐": 132,
        "防投": 110,
        "护筐": 202,
        "传球": 165,
        "突破": 254
      },
      "potential_vector_array": [
        137,
        132,
        110,
        202,
        165,
        254
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "突破",
        "护筐"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725360,
          "name": "名雪 纱夜",
          "rarity": "SSR",
          "style": "组织者",
          "attribute_sum": 1193
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "控卫-T11",
      "name": "控卫·突破+防投型",
      "position": "控卫",
      "potential_vector": {
        "投射": 137,
        "攻筐": 132,
        "防投": 200,
        "护筐": 112,
        "传球": 165,
        "突破": 254
      },
      "potential_vector_array": [
        137,
        132,
        200,
        112,
        165,
        254
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "突破",
        "防投"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725380,
          "name": "白神 时久",
          "rarity": "SSR",
          "style": null,
          "attribute_sum": 1195
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "控卫-T12",
      "name": "控卫·突破+攻筐型",
      "position": "控卫",
      "potential_vector": {
        "投射": 137,
        "攻筐": 222,
        "防投": 110,
        "护筐": 112,
        "传球": 165,
        "突破": 254
      },
      "potential_vector_array": [
        137,
        222,
        110,
        112,
        165,
        254
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "突破",
        "攻筐"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725364,
          "name": "清水 万里",
          "rarity": "SR",
          "style": "篮板手",
          "attribute_sum": 1093
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "小前-T13",
      "name": "小前·攻筐+防投型",
      "position": "小前",
      "potential_vector": {
        "投射": 137,
        "攻筐": 222,
        "防投": 200,
        "护筐": 112,
        "传球": 165,
        "突破": 164
      },
      "potential_vector_array": [
        137,
        222,
        200,
        112,
        165,
        164
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "攻筐",
        "防投"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725376,
          "name": "降旗 千红纱",
          "rarity": "SSR",
          "style": "篮板手",
          "attribute_sum": 1195
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "控卫-T14",
      "name": "控卫·突破+传球型",
      "position": "控卫",
      "potential_vector": {
        "投射": 170,
        "攻筐": 122,
        "防投": 118,
        "护筐": 110,
        "传球": 230,
        "突破": 250
      },
      "potential_vector_array": [
        170,
        122,
        118,
        110,
        230,
        250
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "突破",
        "传球"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725372,
          "name": "真崎 辉世",
          "rarity": "SSR",
          "style": "得分手",
          "attribute_sum": 1193
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "控卫-T15",
      "name": "控卫·突破+防投型",
      "position": "控卫",
      "potential_vector": {
        "投射": 170,
        "攻筐": 122,
        "防投": 208,
        "护筐": 110,
        "传球": 140,
        "突破": 250
      },
      "potential_vector_array": [
        170,
        122,
        208,
        110,
        140,
        250
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "突破",
        "防投"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725377,
          "name": "林原 树里",
          "rarity": "SSR",
          "style": "防守者",
          "attribute_sum": 1193
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "分卫-T16",
      "name": "分卫·突破+攻筐型",
      "position": "分卫",
      "potential_vector": {
        "投射": 170,
        "攻筐": 212,
        "防投": 118,
        "护筐": 110,
        "传球": 140,
        "突破": 250
      },
      "potential_vector_array": [
        170,
        212,
        118,
        110,
        140,
        250
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "突破",
        "攻筐"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725369,
          "name": "美伽 未来",
          "rarity": "R",
          "style": "组织者",
          "attribute_sum": 960
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "分卫-T17",
      "name": "分卫·传球+攻筐型",
      "position": "分卫",
      "potential_vector": {
        "投射": 170,
        "攻筐": 212,
        "防投": 118,
        "护筐": 110,
        "传球": 230,
        "突破": 160
      },
      "potential_vector_array": [
        170,
        212,
        118,
        110,
        230,
        160
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "传球",
        "攻筐"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725348,
          "name": "闪堂电",
          "rarity": "SSR",
          "style": "得分手",
          "attribute_sum": 1193
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "中锋-T18",
      "name": "中锋·护筐+投射型",
      "position": "中锋",
      "potential_vector": {
        "投射": 190,
        "攻筐": 170,
        "防投": 130,
        "护筐": 233,
        "传球": 110,
        "突破": 167
      },
      "potential_vector_array": [
        190,
        170,
        130,
        233,
        110,
        167
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "护筐",
        "投射"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725379,
          "name": "远野 桐",
          "rarity": "SSR",
          "style": "组织者",
          "attribute_sum": 1195
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "大前-T19",
      "name": "大前·护筐+投射型",
      "position": "大前",
      "potential_vector": {
        "投射": 199,
        "攻筐": 167,
        "防投": 135,
        "护筐": 261,
        "传球": 115,
        "突破": 123
      },
      "potential_vector_array": [
        199,
        167,
        135,
        261,
        115,
        123
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "护筐",
        "投射"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725375,
          "name": "野上 泷",
          "rarity": "SSR",
          "style": null,
          "attribute_sum": 1196
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "小前-T20",
      "name": "小前·投射+突破型",
      "position": "小前",
      "potential_vector": {
        "投射": 220,
        "攻筐": 170,
        "防投": 108,
        "护筐": 139,
        "传球": 150,
        "突破": 213
      },
      "potential_vector_array": [
        220,
        170,
        108,
        139,
        150,
        213
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "投射",
        "突破"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725378,
          "name": "美星 栗栖",
          "rarity": "SR",
          "style": "篮板手",
          "attribute_sum": 1093
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "小前-T21",
      "name": "小前·传球+投射型",
      "position": "小前",
      "potential_vector": {
        "投射": 220,
        "攻筐": 170,
        "防投": 108,
        "护筐": 139,
        "传球": 240,
        "突破": 123
      },
      "potential_vector_array": [
        220,
        170,
        108,
        139,
        240,
        123
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "传球",
        "投射"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725352,
          "name": "望月 透",
          "rarity": "SSR",
          "style": "得分手",
          "attribute_sum": 1195
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "分卫-T22",
      "name": "分卫·投射+防投型",
      "position": "分卫",
      "potential_vector": {
        "投射": 220,
        "攻筐": 170,
        "防投": 198,
        "护筐": 139,
        "传球": 150,
        "突破": 123
      },
      "potential_vector_array": [
        220,
        170,
        198,
        139,
        150,
        123
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "投射",
        "防投"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725355,
          "name": "藤松 玖怜",
          "rarity": "SSR",
          "style": "防守者",
          "attribute_sum": 1193
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "小前-T23",
      "name": "小前·攻筐+投射型",
      "position": "小前",
      "potential_vector": {
        "投射": 220,
        "攻筐": 260,
        "防投": 108,
        "护筐": 139,
        "传球": 150,
        "突破": 123
      },
      "potential_vector_array": [
        220,
        260,
        108,
        139,
        150,
        123
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "攻筐",
        "投射"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725354,
          "name": "百目鬼 剑",
          "rarity": "SSR",
          "style": "组织者",
          "attribute_sum": 1193
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "控卫-T24",
      "name": "控卫·传球+投射型",
      "position": "控卫",
      "potential_vector": {
        "投射": 227,
        "攻筐": 132,
        "防投": 110,
        "护筐": 112,
        "传球": 255,
        "突破": 164
      },
      "potential_vector_array": [
        227,
        132,
        110,
        112,
        255,
        164
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "传球",
        "投射"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725373,
          "name": "先斗 月绮",
          "rarity": "SR",
          "style": "防守者",
          "attribute_sum": 1093
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "分卫-T25",
      "name": "分卫·投射+突破型",
      "position": "分卫",
      "potential_vector": {
        "投射": 260,
        "攻筐": 122,
        "防投": 118,
        "护筐": 110,
        "传球": 140,
        "突破": 250
      },
      "potential_vector_array": [
        260,
        122,
        118,
        110,
        140,
        250
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "投射",
        "突破"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725344,
          "name": "近江 奏",
          "rarity": "SR",
          "style": "组织者",
          "attribute_sum": 1093
        }
      ],
      "same_rarity_attr_groups": []
    },
    {
      "template_id": "分卫-T26",
      "name": "分卫·投射+护筐型",
      "position": "分卫",
      "potential_vector": {
        "投射": 260,
        "攻筐": 122,
        "防投": 118,
        "护筐": 200,
        "传球": 140,
        "突破": 160
      },
      "potential_vector_array": [
        260,
        122,
        118,
        200,
        140,
        160
      ],
      "potential_sum": 1000,
      "dominant_dims": [
        "投射",
        "护筐"
      ],
      "shared": false,
      "player_count": 1,
      "players": [
        {
          "content_id": 725359,
          "name": "毒岛 黛也",
          "rarity": "SR",
          "style": "防守者",
          "attribute_sum": 1095
        }
      ],
      "same_rarity_attr_groups": []
    }
  ],
  "identicalAttributeGroups": [
    {
      "template_id": "中锋-T01",
      "template_name": "中锋·攻筐+护筐型",
      "rarity": "SR",
      "players": [
        {
          "content_id": 725346,
          "name": "亚理纱 贾斯敏",
          "skills": [
            "强袭驱进",
            "猛攻的心得"
          ]
        },
        {
          "content_id": 725356,
          "name": "绿川 步梦",
          "skills": [
            "野性掩护",
            "陷阱制造者"
          ]
        }
      ],
      "attributes": {
        "投射": 150,
        "攻筐": 230,
        "防投": 162,
        "护筐": 216,
        "传球": 153,
        "突破": 182
      },
      "attribute_sum": 1093,
      "skill_difference": [
        {
          "name": "亚理纱 贾斯敏",
          "skills": [
            "强袭驱进(固定)",
            "猛攻的心得(额外)"
          ]
        },
        {
          "name": "绿川 步梦",
          "skills": [
            "野性掩护(固定)",
            "陷阱制造者(额外)"
          ]
        }
      ],
      "skill_function_split": [
        {
          "name": "亚理纱 贾斯敏",
          "style": "得分手",
          "skills": [
            {
              "name": "强袭驱进",
              "type": "固定",
              "category": "自我增益",
              "effect": "buff",
              "value_score": 2
            },
            {
              "name": "猛攻的心得",
              "type": "额外",
              "category": "自我增益",
              "effect": "buff",
              "value_score": 2
            }
          ],
          "skill_categories": [
            "自我增益"
          ],
          "dimension_tags": [
            "offense",
            "defense",
            "rebound",
            "drive"
          ],
          "niche": "得分手 / 自我增益"
        },
        {
          "name": "绿川 步梦",
          "style": "组织者",
          "skills": [
            {
              "name": "野性掩护",
              "type": "固定",
              "category": "团队增益",
              "effect": "buff",
              "value_score": 6.9
            },
            {
              "name": "陷阱制造者",
              "type": "额外",
              "category": "弱化/干扰",
              "effect": "denial",
              "value_score": 2.2
            }
          ],
          "skill_categories": [
            "团队增益",
            "弱化/干扰"
          ],
          "dimension_tags": [
            "spacing",
            "defense",
            "drive"
          ],
          "niche": "组织者 / 团队增益+弱化/干扰"
        }
      ],
      "conclusion": "同位置原型模板 + 同稀有度 → 六维完全相同；组内选择应看技能/流派天赋功能（可按 skill_function_split 的 niche 分位），属可替代位而非占位错误"
    },
    {
      "template_id": "中锋-T01",
      "template_name": "中锋·攻筐+护筐型",
      "rarity": "SSR",
      "players": [
        {
          "content_id": 725362,
          "name": "千圣·贝尔丝",
          "skills": [
            "篮板怪兽",
            "空战指挥官"
          ]
        },
        {
          "content_id": 725366,
          "name": "榎本 纯那",
          "skills": [
            "帝王冲击",
            "王牌的余裕"
          ]
        }
      ],
      "attributes": {
        "投射": 161,
        "攻筐": 250,
        "防投": 180,
        "护筐": 235,
        "传球": 167,
        "突破": 200
      },
      "attribute_sum": 1193,
      "skill_difference": [
        {
          "name": "千圣·贝尔丝",
          "skills": [
            "篮板怪兽(固定)",
            "空战指挥官(额外)"
          ]
        },
        {
          "name": "榎本 纯那",
          "skills": [
            "帝王冲击(固定)",
            "王牌的余裕(额外)"
          ]
        }
      ],
      "skill_function_split": [
        {
          "name": "千圣·贝尔丝",
          "style": "篮板手",
          "skills": [
            {
              "name": "篮板怪兽",
              "type": "固定",
              "category": "专属机制",
              "effect": "mechanism",
              "value_score": 3.75
            },
            {
              "name": "空战指挥官",
              "type": "额外",
              "category": "团队增益",
              "effect": "buff",
              "value_score": 6.9
            }
          ],
          "skill_categories": [
            "专属机制",
            "团队增益"
          ],
          "dimension_tags": [
            "spacing",
            "offense",
            "defense",
            "rebound"
          ],
          "niche": "篮板手 / 专属机制+团队增益"
        },
        {
          "name": "榎本 纯那",
          "style": "防守者",
          "skills": [
            {
              "name": "帝王冲击",
              "type": "固定",
              "category": "弱化/干扰",
              "effect": "denial",
              "value_score": 2.2
            },
            {
              "name": "王牌的余裕",
              "type": "额外",
              "category": "自我增益",
              "effect": "buff",
              "value_score": 2
            }
          ],
          "skill_categories": [
            "弱化/干扰",
            "自我增益"
          ],
          "dimension_tags": [
            "defense",
            "drive",
            "offense",
            "rebound"
          ],
          "niche": "防守者 / 弱化/干扰+自我增益"
        }
      ],
      "conclusion": "同位置原型模板 + 同稀有度 → 六维完全相同；组内选择应看技能/流派天赋功能（可按 skill_function_split 的 niche 分位），属可替代位而非占位错误"
    },
    {
      "template_id": "中锋-T02",
      "template_name": "中锋·攻筐+防投型",
      "rarity": "SSR",
      "players": [
        {
          "content_id": 725347,
          "name": "洺瑶",
          "skills": [
            "绝望的城壁",
            "避实击虚"
          ]
        },
        {
          "content_id": 725381,
          "name": "希雅·奥黛拉",
          "skills": [
            "梦境华尔兹",
            "华彩领舞者"
          ]
        }
      ],
      "attributes": {
        "投射": 161,
        "攻筐": 250,
        "防投": 228,
        "护筐": 185,
        "传球": 168,
        "突破": 199
      },
      "attribute_sum": 1191,
      "skill_difference": [
        {
          "name": "洺瑶",
          "skills": [
            "绝望的城壁(固定)",
            "避实击虚(额外)"
          ]
        },
        {
          "name": "希雅·奥黛拉",
          "skills": [
            "梦境华尔兹(固定)",
            "华彩领舞者(额外)"
          ]
        }
      ],
      "skill_function_split": [
        {
          "name": "洺瑶",
          "style": "防守者",
          "skills": [
            {
              "name": "绝望的城壁",
              "type": "固定",
              "category": "团队增益",
              "effect": "buff",
              "value_score": 10.35
            },
            {
              "name": "避实击虚",
              "type": "额外",
              "category": "团队增益",
              "effect": "buff",
              "value_score": 11.902
            }
          ],
          "skill_categories": [
            "团队增益"
          ],
          "dimension_tags": [
            "spacing",
            "drive"
          ],
          "niche": "防守者 / 团队增益"
        },
        {
          "name": "希雅·奥黛拉",
          "style": null,
          "skills": [
            {
              "name": "梦境华尔兹",
              "type": "固定",
              "category": "专属机制",
              "effect": "mechanism",
              "value_score": 1.875
            },
            {
              "name": "华彩领舞者",
              "type": "额外",
              "category": "团队增益",
              "effect": "buff",
              "value_score": 5.951
            }
          ],
          "skill_categories": [
            "专属机制",
            "团队增益"
          ],
          "dimension_tags": [
            "defense",
            "drive",
            "spacing",
            "durability"
          ],
          "niche": " / 专属机制+团队增益"
        }
      ],
      "conclusion": "同位置原型模板 + 同稀有度 → 六维完全相同；组内选择应看技能/流派天赋功能（可按 skill_function_split 的 niche 分位），属可替代位而非占位错误"
    },
    {
      "template_id": "分卫-T08",
      "template_name": "分卫·投射+传球型",
      "rarity": "SSR",
      "players": [
        {
          "content_id": 725351,
          "name": "羽田 朱志香",
          "skills": [
            "终焉后撤步",
            "红莲爆炎阵"
          ]
        },
        {
          "content_id": 725374,
          "name": "卧云 真昼",
          "skills": [
            "妖刀乱舞",
            "妖刀摄魂"
          ]
        }
      ],
      "attributes": {
        "投射": 249,
        "攻筐": 174,
        "防投": 172,
        "护筐": 167,
        "传球": 234,
        "突破": 195
      },
      "attribute_sum": 1191,
      "skill_difference": [
        {
          "name": "羽田 朱志香",
          "skills": [
            "终焉后撤步(固定)",
            "红莲爆炎阵(额外)"
          ]
        },
        {
          "name": "卧云 真昼",
          "skills": [
            "妖刀乱舞(固定)",
            "妖刀摄魂(额外)"
          ]
        }
      ],
      "skill_function_split": [
        {
          "name": "羽田 朱志香",
          "style": "组织者",
          "skills": [
            {
              "name": "终焉后撤步",
              "type": "固定",
              "category": "自我增益",
              "effect": "buff",
              "value_score": 2
            },
            {
              "name": "红莲爆炎阵",
              "type": "额外",
              "category": "自我增益",
              "effect": "buff",
              "value_score": 2
            }
          ],
          "skill_categories": [
            "自我增益"
          ],
          "dimension_tags": [
            "spacing"
          ],
          "niche": "组织者 / 自我增益"
        },
        {
          "name": "卧云 真昼",
          "style": "组织者",
          "skills": [
            {
              "name": "妖刀乱舞",
              "type": "固定",
              "category": "弱化/干扰",
              "effect": "denial",
              "value_score": 2.2
            },
            {
              "name": "妖刀摄魂",
              "type": "额外",
              "category": "团队增益",
              "effect": "buff",
              "value_score": 6.9
            }
          ],
          "skill_categories": [
            "弱化/干扰",
            "团队增益"
          ],
          "dimension_tags": [
            "defense",
            "spacing",
            "drive"
          ],
          "niche": "组织者 / 弱化/干扰+团队增益"
        }
      ],
      "conclusion": "同位置原型模板 + 同稀有度 → 六维完全相同；组内选择应看技能/流派天赋功能（可按 skill_function_split 的 niche 分位），属可替代位而非占位错误"
    }
  ],
  "tierList": {
    "source_content_id": 725623,
    "source": {
      "url": "https://www.gamekee.com/lqsn/725623.html",
      "title": "开服角色强度榜｜22名角色评级与图鉴",
      "date": "2026-10-25更新",
      "note": "转述 B站「果妹娜塞」2026-10-24 视频评级，非本站实测；22 名角色：T0 5 / T1 8 / T2 9"
    },
    "tiers": {
      "T0": [
        {
          "name": "闪堂电",
          "rarity_in_wiki": "SSR",
          "position": "分卫",
          "matched_player": "闪堂电"
        },
        {
          "name": "百目鬼 剑",
          "rarity_in_wiki": "SSR",
          "position": "小前",
          "matched_player": "百目鬼剑"
        },
        {
          "name": "希雅·奥黛拉",
          "rarity_in_wiki": "SSR",
          "position": "中锋",
          "matched_player": "希雅·奥黛拉"
        },
        {
          "name": "野上 泷",
          "rarity_in_wiki": "SSR",
          "position": "大前",
          "matched_player": "野上泷"
        },
        {
          "name": "洺瑶",
          "rarity_in_wiki": "SSR",
          "position": "中锋",
          "matched_player": "洺瑶"
        }
      ],
      "T1": [
        {
          "name": "羽田 朱志香",
          "rarity_in_wiki": "SSR",
          "position": "分卫",
          "matched_player": "羽田朱志香"
        },
        {
          "name": "卧云 真昼",
          "rarity_in_wiki": "SSR",
          "position": "分卫",
          "matched_player": "卧云真昼"
        },
        {
          "name": "稻叶 杏里",
          "rarity_in_wiki": "SSR",
          "position": "大前",
          "matched_player": "稻叶杏里"
        },
        {
          "name": "藤松 玖怜",
          "rarity_in_wiki": "SSR",
          "position": "分卫",
          "matched_player": "藤松玖怜"
        },
        {
          "name": "龙宫寺 心叶",
          "rarity_in_wiki": "SR",
          "position": "大前",
          "matched_player": "龙宫寺心叶"
        },
        {
          "name": "名雪 纱夜",
          "rarity_in_wiki": "SSR",
          "position": "控卫",
          "matched_player": "名雪纱夜"
        },
        {
          "name": "林原 树里",
          "rarity_in_wiki": "SSR",
          "position": "控卫",
          "matched_player": "林原树里"
        },
        {
          "name": "远野 桐",
          "rarity_in_wiki": "SSR",
          "position": "中锋",
          "matched_player": "远野桐"
        }
      ],
      "T2": [
        {
          "name": "克拉丽丝·波洛",
          "rarity_in_wiki": "SR",
          "position": "控卫",
          "matched_player": "克拉丽丝·波洛"
        },
        {
          "name": "雨森 琉璃",
          "rarity_in_wiki": "SSR",
          "position": "大前",
          "matched_player": "雨森琉璃"
        },
        {
          "name": "佐久间 雨乃",
          "rarity_in_wiki": "SSR",
          "position": "大前",
          "matched_player": "佐久间雨乃"
        },
        {
          "name": "千圣·贝尔丝",
          "rarity_in_wiki": "SSR",
          "position": "中锋",
          "matched_player": "千圣·贝尔丝"
        },
        {
          "name": "榎本 纯那",
          "rarity_in_wiki": "SSR",
          "position": "中锋",
          "matched_player": "榎本纯那"
        },
        {
          "name": "羽濑川 湊",
          "rarity_in_wiki": "SSR",
          "position": "小前",
          "matched_player": "羽濑川湊"
        },
        {
          "name": "真崎 辉世",
          "rarity_in_wiki": "SSR",
          "position": "控卫",
          "matched_player": "真崎辉世"
        },
        {
          "name": "降旗 千红纱",
          "rarity_in_wiki": "SSR",
          "position": "小前",
          "matched_player": "降旗千红纱"
        },
        {
          "name": "澪奈·贾妮丝",
          "rarity_in_wiki": "SR",
          "position": "小前",
          "matched_player": "澪奈·贾妮丝"
        }
      ]
    },
    "unranked": [
      "近江 奏",
      "和泉 香织",
      "亚理纱 贾斯敏",
      "早濑 千秋",
      "望月 透",
      "绿川 步梦",
      "皆川 式",
      "毒岛 黛也",
      "清水 万里",
      "春澄 永远",
      "森田 莉莉",
      "美伽 未来",
      "五十岚 诗音",
      "先斗 月绮",
      "美星 栗栖",
      "白神 时久"
    ],
    "notes": [
      "评级范围仅 22 名角色，未上榜 ≠ 低档（原文明确声明）。",
      "龙宫寺 心叶：wiki 图鉴标 SR，但原视频将其放在「SSR 强度榜」T1；本派生数据保留 wiki 稀有度并标记差异。"
    ]
  },
  "rankings": {
    "overall": [
      {
        "rank": 1,
        "content_id": 725362,
        "name": "千圣·贝尔丝",
        "rarity": "SSR",
        "position": "中锋",
        "score": 88.49
      },
      {
        "rank": 2,
        "content_id": 725361,
        "name": "佐久间 雨乃",
        "rarity": "SSR",
        "position": "大前",
        "score": 87.24
      },
      {
        "rank": 3,
        "content_id": 725347,
        "name": "洺瑶",
        "rarity": "SSR",
        "position": "中锋",
        "score": 81.91
      },
      {
        "rank": 4,
        "content_id": 725363,
        "name": "稻叶 杏里",
        "rarity": "SSR",
        "position": "大前",
        "score": 75.66
      },
      {
        "rank": 5,
        "content_id": 725366,
        "name": "榎本 纯那",
        "rarity": "SSR",
        "position": "中锋",
        "score": 75.66
      },
      {
        "rank": 6,
        "content_id": 725375,
        "name": "野上 泷",
        "rarity": "SSR",
        "position": "大前",
        "score": 72.5
      },
      {
        "rank": 7,
        "content_id": 725381,
        "name": "希雅·奥黛拉",
        "rarity": "SSR",
        "position": "中锋",
        "score": 71.38
      },
      {
        "rank": 8,
        "content_id": 725379,
        "name": "远野 桐",
        "rarity": "SSR",
        "position": "中锋",
        "score": 68.42
      },
      {
        "rank": 9,
        "content_id": 725342,
        "name": "澪奈·贾妮丝",
        "rarity": "SR",
        "position": "小前",
        "score": 68.09
      },
      {
        "rank": 10,
        "content_id": 725355,
        "name": "藤松 玖怜",
        "rarity": "SSR",
        "position": "分卫",
        "score": 66.78
      },
      {
        "rank": 11,
        "content_id": 725354,
        "name": "百目鬼 剑",
        "rarity": "SSR",
        "position": "小前",
        "score": 66.45
      },
      {
        "rank": 12,
        "content_id": 725374,
        "name": "卧云 真昼",
        "rarity": "SSR",
        "position": "分卫",
        "score": 64.47
      },
      {
        "rank": 13,
        "content_id": 725371,
        "name": "羽濑川 湊",
        "rarity": "SSR",
        "position": "小前",
        "score": 59.67
      },
      {
        "rank": 14,
        "content_id": 725356,
        "name": "绿川 步梦",
        "rarity": "SR",
        "position": "中锋",
        "score": 59.34
      },
      {
        "rank": 15,
        "content_id": 725343,
        "name": "龙宫寺 心叶",
        "rarity": "SR",
        "position": "大前",
        "score": 57.63
      },
      {
        "rank": 16,
        "content_id": 725367,
        "name": "春澄 永远",
        "rarity": "SR",
        "position": "大前",
        "score": 54.47
      },
      {
        "rank": 17,
        "content_id": 725351,
        "name": "羽田 朱志香",
        "rarity": "SSR",
        "position": "分卫",
        "score": 52.63
      },
      {
        "rank": 18,
        "content_id": 725350,
        "name": "早濑 千秋",
        "rarity": "SR",
        "position": "大前",
        "score": 51.91
      },
      {
        "rank": 19,
        "content_id": 725357,
        "name": "雨森 琉璃",
        "rarity": "SSR",
        "position": "大前",
        "score": 49.47
      },
      {
        "rank": 20,
        "content_id": 725359,
        "name": "毒岛 黛也",
        "rarity": "SR",
        "position": "分卫",
        "score": 49.34
      },
      {
        "rank": 21,
        "content_id": 725346,
        "name": "亚理纱 贾斯敏",
        "rarity": "SR",
        "position": "中锋",
        "score": 47.5
      },
      {
        "rank": 22,
        "content_id": 725345,
        "name": "和泉 香织",
        "rarity": "SSR",
        "position": "控卫",
        "score": 46.05
      },
      {
        "rank": 23,
        "content_id": 725348,
        "name": "闪堂电",
        "rarity": "SSR",
        "position": "分卫",
        "score": 40.92
      },
      {
        "rank": 24,
        "content_id": 725360,
        "name": "名雪 纱夜",
        "rarity": "SSR",
        "position": "控卫",
        "score": 40.26
      },
      {
        "rank": 25,
        "content_id": 725376,
        "name": "降旗 千红纱",
        "rarity": "SSR",
        "position": "小前",
        "score": 39.47
      },
      {
        "rank": 26,
        "content_id": 725364,
        "name": "清水 万里",
        "rarity": "SR",
        "position": "控卫",
        "score": 38.55
      },
      {
        "rank": 27,
        "content_id": 725372,
        "name": "真崎 辉世",
        "rarity": "SSR",
        "position": "控卫",
        "score": 37.89
      },
      {
        "rank": 28,
        "content_id": 725344,
        "name": "近江 奏",
        "rarity": "SR",
        "position": "分卫",
        "score": 37.63
      },
      {
        "rank": 29,
        "content_id": 725373,
        "name": "先斗 月绮",
        "rarity": "SR",
        "position": "控卫",
        "score": 35.33
      },
      {
        "rank": 30,
        "content_id": 725349,
        "name": "克拉丽丝·波洛",
        "rarity": "SR",
        "position": "控卫",
        "score": 34.47
      },
      {
        "rank": 31,
        "content_id": 725380,
        "name": "白神 时久",
        "rarity": "SSR",
        "position": "控卫",
        "score": 30.53
      },
      {
        "rank": 32,
        "content_id": 725378,
        "name": "美星 栗栖",
        "rarity": "SR",
        "position": "小前",
        "score": 29.41
      },
      {
        "rank": 33,
        "content_id": 725352,
        "name": "望月 透",
        "rarity": "SSR",
        "position": "小前",
        "score": 28.29
      },
      {
        "rank": 34,
        "content_id": 725370,
        "name": "五十岚 诗音",
        "rarity": "R",
        "position": "中锋",
        "score": 25.66
      },
      {
        "rank": 35,
        "content_id": 725377,
        "name": "林原 树里",
        "rarity": "SSR",
        "position": "控卫",
        "score": 22.57
      },
      {
        "rank": 36,
        "content_id": 725358,
        "name": "皆川 式",
        "rarity": "SR",
        "position": "小前",
        "score": 18.29
      },
      {
        "rank": 37,
        "content_id": 725369,
        "name": "美伽 未来",
        "rarity": "R",
        "position": "分卫",
        "score": 16.18
      },
      {
        "rank": 38,
        "content_id": 725368,
        "name": "森田 莉莉",
        "rarity": "R",
        "position": "控卫",
        "score": 9.47
      }
    ],
    "panel_only": [
      {
        "rank": 1,
        "content_id": 725361,
        "name": "佐久间 雨乃",
        "score": 96.58
      },
      {
        "rank": 2,
        "content_id": 725362,
        "name": "千圣·贝尔丝",
        "score": 89.47
      },
      {
        "rank": 3,
        "content_id": 725366,
        "name": "榎本 纯那",
        "score": 89.47
      },
      {
        "rank": 4,
        "content_id": 725354,
        "name": "百目鬼 剑",
        "score": 82.89
      },
      {
        "rank": 5,
        "content_id": 725363,
        "name": "稻叶 杏里",
        "score": 82.89
      },
      {
        "rank": 6,
        "content_id": 725342,
        "name": "澪奈·贾妮丝",
        "score": 77.63
      },
      {
        "rank": 7,
        "content_id": 725347,
        "name": "洺瑶",
        "score": 76.32
      },
      {
        "rank": 8,
        "content_id": 725381,
        "name": "希雅·奥黛拉",
        "score": 76.32
      },
      {
        "rank": 9,
        "content_id": 725375,
        "name": "野上 泷",
        "score": 70.79
      },
      {
        "rank": 10,
        "content_id": 725379,
        "name": "远野 桐",
        "score": 67.11
      },
      {
        "rank": 11,
        "content_id": 725367,
        "name": "春澄 永远",
        "score": 63.42
      },
      {
        "rank": 12,
        "content_id": 725351,
        "name": "羽田 朱志香",
        "score": 63.16
      },
      {
        "rank": 13,
        "content_id": 725374,
        "name": "卧云 真昼",
        "score": 63.16
      },
      {
        "rank": 14,
        "content_id": 725343,
        "name": "龙宫寺 心叶",
        "score": 62.37
      },
      {
        "rank": 15,
        "content_id": 725355,
        "name": "藤松 玖怜",
        "score": 59.21
      },
      {
        "rank": 16,
        "content_id": 725346,
        "name": "亚理纱 贾斯敏",
        "score": 56.32
      },
      {
        "rank": 17,
        "content_id": 725356,
        "name": "绿川 步梦",
        "score": 56.32
      },
      {
        "rank": 18,
        "content_id": 725371,
        "name": "羽濑川 湊",
        "score": 49.74
      },
      {
        "rank": 19,
        "content_id": 725350,
        "name": "早濑 千秋",
        "score": 48.16
      },
      {
        "rank": 20,
        "content_id": 725372,
        "name": "真崎 辉世",
        "score": 46.58
      },
      {
        "rank": 21,
        "content_id": 725345,
        "name": "和泉 香织",
        "score": 46.05
      },
      {
        "rank": 22,
        "content_id": 725348,
        "name": "闪堂电",
        "score": 44.47
      },
      {
        "rank": 23,
        "content_id": 725344,
        "name": "近江 奏",
        "score": 41.84
      },
      {
        "rank": 24,
        "content_id": 725359,
        "name": "毒岛 黛也",
        "score": 38.16
      },
      {
        "rank": 25,
        "content_id": 725376,
        "name": "降旗 千红纱",
        "score": 35.53
      },
      {
        "rank": 26,
        "content_id": 725357,
        "name": "雨森 琉璃",
        "score": 33.95
      },
      {
        "rank": 27,
        "content_id": 725352,
        "name": "望月 透",
        "score": 32.89
      },
      {
        "rank": 28,
        "content_id": 725370,
        "name": "五十岚 诗音",
        "score": 32.89
      },
      {
        "rank": 29,
        "content_id": 725360,
        "name": "名雪 纱夜",
        "score": 28.68
      },
      {
        "rank": 30,
        "content_id": 725373,
        "name": "先斗 月绮",
        "score": 26.05
      },
      {
        "rank": 31,
        "content_id": 725378,
        "name": "美星 栗栖",
        "score": 26.05
      },
      {
        "rank": 32,
        "content_id": 725380,
        "name": "白神 时久",
        "score": 24.47
      },
      {
        "rank": 33,
        "content_id": 725358,
        "name": "皆川 式",
        "score": 21.32
      },
      {
        "rank": 34,
        "content_id": 725364,
        "name": "清水 万里",
        "score": 20.26
      },
      {
        "rank": 35,
        "content_id": 725369,
        "name": "美伽 未来",
        "score": 20.26
      },
      {
        "rank": 36,
        "content_id": 725349,
        "name": "克拉丽丝·波洛",
        "score": 19.21
      },
      {
        "rank": 37,
        "content_id": 725377,
        "name": "林原 树里",
        "score": 18.68
      },
      {
        "rank": 38,
        "content_id": 725368,
        "name": "森田 莉莉",
        "score": 11.32
      }
    ],
    "skill_only": [
      {
        "rank": 1,
        "content_id": 725347,
        "name": "洺瑶",
        "score": 22.25
      },
      {
        "rank": 2,
        "content_id": 725357,
        "name": "雨森 琉璃",
        "score": 17.25
      },
      {
        "rank": 3,
        "content_id": 725364,
        "name": "清水 万里",
        "score": 14.49
      },
      {
        "rank": 4,
        "content_id": 725355,
        "name": "藤松 玖怜",
        "score": 13.8
      },
      {
        "rank": 5,
        "content_id": 725371,
        "name": "羽濑川 湊",
        "score": 13.8
      },
      {
        "rank": 6,
        "content_id": 725362,
        "name": "千圣·贝尔丝",
        "score": 10.65
      },
      {
        "rank": 7,
        "content_id": 725359,
        "name": "毒岛 黛也",
        "score": 10.35
      },
      {
        "rank": 8,
        "content_id": 725349,
        "name": "克拉丽丝·波洛",
        "score": 10.27
      },
      {
        "rank": 9,
        "content_id": 725375,
        "name": "野上 泷",
        "score": 9.78
      },
      {
        "rank": 10,
        "content_id": 725360,
        "name": "名雪 纱夜",
        "score": 9.45
      },
      {
        "rank": 11,
        "content_id": 725379,
        "name": "远野 桐",
        "score": 9.43
      },
      {
        "rank": 12,
        "content_id": 725356,
        "name": "绿川 步梦",
        "score": 9.1
      },
      {
        "rank": 13,
        "content_id": 725374,
        "name": "卧云 真昼",
        "score": 9.1
      },
      {
        "rank": 14,
        "content_id": 725350,
        "name": "早濑 千秋",
        "score": 8.9
      },
      {
        "rank": 15,
        "content_id": 725373,
        "name": "先斗 月绮",
        "score": 8.9
      },
      {
        "rank": 16,
        "content_id": 725361,
        "name": "佐久间 雨乃",
        "score": 8.15
      },
      {
        "rank": 17,
        "content_id": 725381,
        "name": "希雅·奥黛拉",
        "score": 7.83
      },
      {
        "rank": 18,
        "content_id": 725363,
        "name": "稻叶 杏里",
        "score": 7.16
      },
      {
        "rank": 19,
        "content_id": 725376,
        "name": "降旗 千红纱",
        "score": 6.62
      },
      {
        "rank": 20,
        "content_id": 725380,
        "name": "白神 时久",
        "score": 5.76
      },
      {
        "rank": 21,
        "content_id": 725345,
        "name": "和泉 香织",
        "score": 5.26
      },
      {
        "rank": 22,
        "content_id": 725343,
        "name": "龙宫寺 心叶",
        "score": 5.06
      },
      {
        "rank": 23,
        "content_id": 725342,
        "name": "澪奈·贾妮丝",
        "score": 4.53
      },
      {
        "rank": 24,
        "content_id": 725378,
        "name": "美星 栗栖",
        "score": 4.53
      },
      {
        "rank": 25,
        "content_id": 725366,
        "name": "榎本 纯那",
        "score": 4.2
      },
      {
        "rank": 26,
        "content_id": 725377,
        "name": "林原 树里",
        "score": 4.2
      },
      {
        "rank": 27,
        "content_id": 725348,
        "name": "闪堂电",
        "score": 4.16
      },
      {
        "rank": 28,
        "content_id": 725367,
        "name": "春澄 永远",
        "score": 4.15
      },
      {
        "rank": 29,
        "content_id": 725344,
        "name": "近江 奏",
        "score": 4.1
      },
      {
        "rank": 30,
        "content_id": 725346,
        "name": "亚理纱 贾斯敏",
        "score": 4
      },
      {
        "rank": 31,
        "content_id": 725351,
        "name": "羽田 朱志香",
        "score": 4
      },
      {
        "rank": 32,
        "content_id": 725354,
        "name": "百目鬼 剑",
        "score": 3.76
      },
      {
        "rank": 33,
        "content_id": 725352,
        "name": "望月 透",
        "score": 3.5
      },
      {
        "rank": 34,
        "content_id": 725372,
        "name": "真崎 辉世",
        "score": 3
      },
      {
        "rank": 35,
        "content_id": 725358,
        "name": "皆川 式",
        "score": 2.58
      },
      {
        "rank": 36,
        "content_id": 725368,
        "name": "森田 莉莉",
        "score": 2.5
      },
      {
        "rank": 37,
        "content_id": 725369,
        "name": "美伽 未来",
        "score": 2.5
      },
      {
        "rank": 38,
        "content_id": 725370,
        "name": "五十岚 诗音",
        "score": 2.5
      }
    ],
    "note": "overall=0.45×面板百分位+0.30×潜力百分位+0.25×技能百分位；panel_only/ skill_only 为敏感性备选排序"
  },
  "streamRoles": [
    {
      "stream": "训练流",
      "example_team": [
        "克拉丽丝·波洛",
        "闪堂电",
        "望月 透",
        "佐久间 雨乃",
        "亚理纱 贾斯敏"
      ],
      "pick_order": [
        "望月 透",
        "藤松 玖怜",
        "佐久间 雨乃",
        "榎本 纯那",
        "真崎 辉世"
      ],
      "notes": [
        "社区自选顺序（725397）：望月、藤松（原文写作「腾松」）、佐久间，再到榎本或真崎；但开荒帖提醒望月依赖精力条件、佐久间前期更易发挥。",
        "本条为「同功能位替代」而非数值叠乘：望月/藤松/佐久间被同一作者放在训练流优先序列，属竞争位，不应同时按名单无脑三选三。"
      ],
      "sources": [
        725488,
        725397,
        725600
      ]
    },
    {
      "stream": "扭蛋流",
      "example_team": [
        "先斗 月绮",
        "卧云 真昼",
        "羽濑川 湊",
        "近江 奏",
        "千圣·贝尔丝"
      ],
      "pick_order": [
        "羽濑川 湊",
        "千圣·贝尔丝",
        "卧云 真昼"
      ],
      "notes": [
        "同名天赋「再买一个」：SSR 羽濑川 与 SR 春澄 永远 不能同时生效（725602），同队占两个位置不叠加收益。",
        "先检查额外购买、减价与直接增益是否齐全；卧云偏后期（725397）。"
      ],
      "sources": [
        725602,
        725396,
        725397,
        725488
      ]
    },
    {
      "stream": "商店流",
      "example_team": [
        "名雪 纱夜",
        "羽田 朱志香",
        "降旗 千红纱",
        "早濑 千秋",
        "洺瑶"
      ],
      "pick_order": [
        "羽田 朱志香",
        "名雪 纱夜/降旗 千红纱",
        "洺瑶"
      ],
      "notes": [
        "同名天赋「道具升级」：SSR 羽田 与 SR 清水 万里 不能同时生效（725602）。",
        "功能性差异：名雪偏减价、羽田偏品质、早濑偏商品数量（725396）。"
      ],
      "sources": [
        725602,
        725396,
        725397,
        725488
      ]
    },
    {
      "stream": "小游戏流",
      "example_team": [
        "和泉 香织",
        "林原 树里",
        "皆川 式",
        "稻叶 杏里",
        "远野 桐"
      ],
      "pick_order": [
        "稻叶 杏里",
        "林原 树里",
        "远野 桐/和泉 香织"
      ],
      "notes": [
        "社区多认为偏早期开荒，但对强势期长度说法不一（3 天~1 周不等），不宜据此投入全部自选/钻石（725488）。",
        "皆川偏减价；林原、稻叶围绕小游戏增益；远野需带加成的小游戏选项（725396）。"
      ],
      "sources": [
        725488,
        725396,
        725397
      ]
    }
  ],
  "trainingTalents": [
    {
      "name": "佐久间 雨乃",
      "category": "训练乘区（加法乘区）",
      "talent": "训练技能：进行队友训练时主属性 +3，且有概率额外 +2 主属性（内测 50% → 公测 40%）；★★ 训练加成 +3%（落在训练加成% 乘区）",
      "claims_ref": "claims §B10 / §H-197",
      "source": [
        "https://www.taptap.cn/moment/805700735671995246",
        "https://www.taptap.cn/moment/862516446742184898"
      ],
      "confidence": "多源一致（实测/截图）"
    },
    {
      "name": "藤松 玖怜",
      "category": "训练乘区（训练加成%）+ 精力",
      "talent": "社区原文写作「腾松」：精力回复 5 次后给「训练加成」，位于训练加成% 乘区（按音近推断为 藤松 玖怜，待官方名单核对）",
      "claims_ref": "claims §B-108 / §H-201",
      "source": [
        "https://www.taptap.cn/moment/862429125158111356",
        "https://www.taptap.cn/moment/805700735671995246"
      ],
      "confidence": "多源一致"
    },
    {
      "name": "望月 透",
      "category": "表情（训练爆发）",
      "talent": "表情爆发每个表情 bonus +8%（与龙宫寺 +4% 同乘区，互相稀释）；训练流长期组件但依赖精力条件（精力上限 ≥120、单次休息恢复 ≥70 的建议为社区经验）",
      "claims_ref": "claims §C-120 / §B-106",
      "source": [
        "https://www.taptap.cn/moment/805700735671995246",
        "https://www.gamekee.com/lqsn/725601.html"
      ],
      "confidence": "实测（内测）"
    },
    {
      "name": "龙宫寺 心叶",
      "category": "表情（训练爆发）",
      "talent": "表情爆发每个表情 bonus +4%（与望月 +8% 同乘区，互相稀释）",
      "claims_ref": "claims §C-120",
      "source": [
        "https://www.taptap.cn/moment/805700735671995246"
      ],
      "confidence": "实测（内测）"
    },
    {
      "name": "真崎 辉世",
      "category": "表情（训练爆发）",
      "talent": "表情一致倍率 = 2.5 + 0.25 = 2.75（6 格一致示例 803% 的组成部分）",
      "claims_ref": "claims §C-120",
      "source": [
        "https://www.taptap.cn/moment/805700735671995246"
      ],
      "confidence": "实测（内测）"
    },
    {
      "name": "百目鬼 剑",
      "category": "训练机会（经济/节奏）",
      "talent": "周末加训（额外训练机会）",
      "claims_ref": "claims §B-112",
      "source": [
        "https://www.taptap.cn/moment/862429125158111356"
      ],
      "confidence": "单源"
    },
    {
      "name": "闪堂电",
      "category": "版本强度/升星节点",
      "talent": "公测被增强（不再是一般 UP）；训练流最后一块拼图；2 星质变（社区节点）",
      "claims_ref": "claims §H-199",
      "source": [
        "https://www.taptap.cn/moment/861959872722241133"
      ],
      "confidence": "多源一致"
    }
  ],
  "knownCharacterTalents": [
    {
      "name": "羽濑川 湊",
      "talent": "再买一个（额外购买）",
      "note": "SSR 版；与 SR 春澄同名天赋不叠加",
      "source": 725602
    },
    {
      "name": "春澄 永远",
      "talent": "再买一个（额外购买）",
      "note": "SR 版；与 SSR 羽濑川同名天赋不叠加",
      "source": 725602
    },
    {
      "name": "羽田 朱志香",
      "talent": "道具升级（商品品质）",
      "note": "SSR 版；与 SR 清水同名天赋不叠加",
      "source": 725602
    },
    {
      "name": "清水 万里",
      "talent": "道具升级（商品品质）",
      "note": "SR 版；与 SSR 羽田同名天赋不叠加",
      "source": 725602
    },
    {
      "name": "名雪 纱夜",
      "talent": "商店减价向",
      "note": "羽的商店流示例，偏减价",
      "source": 725396
    },
    {
      "name": "早濑 千秋",
      "talent": "增加商品数量向",
      "note": "羽的商店流示例，「早濑偏增加商品数量」",
      "source": 725396
    },
    {
      "name": "皆川 式",
      "talent": "小游戏减价向",
      "note": "「皆川偏减价」",
      "source": 725396
    },
    {
      "name": "林原 树里",
      "talent": "小游戏增益向",
      "note": "「林原和稻叶围绕每次小游戏提供增益」",
      "source": 725396
    },
    {
      "name": "稻叶 杏里",
      "talent": "小游戏增益向",
      "note": "同上",
      "source": 725396
    },
    {
      "name": "远野 桐",
      "talent": "小游戏选项增益向",
      "note": "「需要注意带加成的小游戏选项」",
      "source": 725396
    },
    {
      "name": "望月 透",
      "talent": "训练流长期组件（社区称）",
      "note": "依赖精力条件；羽列为训练流自选优先位",
      "source": 725397
    }
  ],
  "claimsSummary": {
    "available": true,
    "total_claim_lines": 143,
    "training_tier_list": {
      "T0": [
        {
          "token": "野上泷",
          "matched": "野上 泷",
          "content_id": 725375
        },
        {
          "token": "白神时久",
          "matched": "白神 时久",
          "content_id": 725380
        },
        {
          "token": "希雅·奥黛拉",
          "matched": "希雅·奥黛拉",
          "content_id": 725381
        },
        {
          "token": "闪堂电",
          "matched": "闪堂电",
          "content_id": 725348
        },
        {
          "token": "羽田朱志香",
          "matched": "羽田 朱志香",
          "content_id": 725351
        },
        {
          "token": "羽濑川湊",
          "matched": "羽濑川 湊",
          "content_id": 725371
        }
      ],
      "T1": [
        {
          "token": "卧云真昼",
          "matched": "卧云 真昼",
          "content_id": 725374
        },
        {
          "token": "降旗千红纱",
          "matched": "降旗 千红纱",
          "content_id": 725376
        },
        {
          "token": "真崎辉世",
          "matched": "真崎 辉世",
          "content_id": 725372
        },
        {
          "token": "千圣·贝尔丝",
          "matched": "千圣·贝尔丝",
          "content_id": 725362
        },
        {
          "token": "早濑千秋",
          "matched": "早濑 千秋",
          "content_id": 725350
        }
      ],
      "T2": [
        {
          "token": "望月透",
          "matched": "望月 透",
          "content_id": 725352
        },
        {
          "token": "佐久间雨乃",
          "matched": "佐久间 雨乃",
          "content_id": 725361
        },
        {
          "token": "洺瑶",
          "matched": "洺瑶",
          "content_id": 725347
        },
        {
          "token": "名雪纱夜",
          "matched": "名雪 纱夜",
          "content_id": 725360
        },
        {
          "token": "藤松玖怜",
          "matched": "藤松 玖怜",
          "content_id": 725355
        },
        {
          "token": "先斗月绮",
          "matched": "先斗 月绮",
          "content_id": 725373
        },
        {
          "token": "近江奏",
          "matched": "近江 奏",
          "content_id": 725344
        },
        {
          "token": "亚理纱贾斯敏",
          "matched": "亚理纱 贾斯敏",
          "content_id": 725346
        }
      ],
      "t3_t4": "claims 注明 T3/T4 见原图，未转写数值",
      "source": {
        "url": "https://www.taptap.cn/moment/863887392480691762",
        "note": "公测 10-26「北空之丘小助手」训练强度榜，基准白板 0 星 1 级；单帖结构化，用于 roster 校准"
      }
    },
    "position_substitution_chain": {
      "raw": "位置替换链（训练流）：控卫 克拉丽丝→真崎；小前 澪奈→望月（后续百目鬼）；大前 龙宫寺→雨乃；中锋 亚理纱→希雅。 | https://www.taptap.cn/moment/863887392480691762 | 公测 10-26 | 角色替代逻辑。",
      "source": [
        "https://www.taptap.cn/moment/863887392480691762"
      ],
      "parsed": [
        {
          "position": "控卫",
          "from_token": "克拉丽丝",
          "to_token": "真崎",
          "from": "克拉丽丝·波洛",
          "to": "真崎 辉世"
        },
        {
          "position": "小前",
          "from_token": "澪奈",
          "to_token": "望月",
          "from": "澪奈·贾妮丝",
          "to": "望月 透"
        },
        {
          "position": "大前",
          "from_token": "龙宫寺",
          "to_token": "雨乃",
          "from": "龙宫寺 心叶",
          "to": "佐久间 雨乃"
        },
        {
          "position": "中锋",
          "from_token": "亚理纱",
          "to_token": "希雅。 | https://www.taptap.cn/moment/863887392480691762 | 公测 10-26 | 角色替代逻辑。",
          "from": "亚理纱 贾斯敏",
          "to": null
        }
      ]
    },
    "dilution_case": {
      "summary": "雨乃前期强（主属性加值），但加成落在加法乘区且基础值大 → 被稀释；腾松（写作「腾松」，按音近推断为 藤松 玖怜，待核对）落在训练加成% 乘区 + 精力回复，后期更优；内测实测「雨乃换腾松分数有明显提升」。",
      "raw": [
        "**雨乃→腾松替换逻辑**：雨乃前期强（主属性加值），但加成在加法乘区且基础值大 → 被稀释；腾松落在训练加成% 乘区 + 精力回复，后期更优；实测「雨乃换腾松分数有明显提升」。 | https://www.taptap.cn/moment/805700735671995246 | 内测 | 相对优势分析范本（见 §H5 稀释论证）。",
        "**稀释效应的数学论证**：角色加成若落在低基础乘区（主属性加值、基础值巨大），其相对贡献 = 加成/乘区基数，基数越大贡献越小；理想角色独占一个「极低独立乘区」。 | https://www.taptap.cn/moment/805700735671995246 | 内测 | 可写成「乘区贡献度 = Δ×∏其他乘区 / 结果」公式，工具做边际收益表。"
      ],
      "source": [
        "https://www.taptap.cn/moment/805700735671995246"
      ],
      "confidence": "多源一致",
      "note": "这是「乘区稀释」范本：胜出者不是面板更高，而是独占更高乘区；T3/T4 的边际收益表需按乘区位置计算，而非总属性。"
    },
    "dual_scoring": {
      "summary": "训练强度与比赛强度分离；千圣、羽濑川「入场强度为 0」（比赛向），圣山/限定球员双强度保值。",
      "raw": "训练强度与比赛强度分离；圣山/限定球员双强度永久保值；超级大锁文班/霍勒迪、得分手麦迪/哈登/乐福保值；千圣、羽濑川「入场强度为 0」（比赛向）。 | https://www.taptap.cn/moment/862241060166830746 | 公测 | 双评分体系 → 工具应区分「训练价值/比赛价值」。",
      "source": [
        "https://www.taptap.cn/moment/862241060166830746"
      ],
      "confidence": "多源一致"
    },
    "stream_strength_order": {
      "raw": "强度排序（公测初，氪佬向）：**训练流 > 商店流 ≥ 扭蛋流 > 小游戏流**；平民向：**扭蛋流 ≥ 商店流 > 训练流 > 小游戏流**。 | https://www.taptap.cn/moment/863072955175800193 （拉老师，公测 10-24） | 公测 | 单帖结论但与其他攻略口径一致（gamekee 725600 低配「扭蛋流＞商店流＞训练流」）。",
      "source": [
        "https://www.taptap.cn/moment/863072955175800193"
      ],
      "confidence": "多源一致"
    },
    "auto_pick_priority": {
      "raw": "四流派自选优先级：训练流 望月>腾松>佐久间>榎本=真崎；扭蛋流 羽濑川>千圣>卧云；商店流 羽田>名雪=降旗>洺瑶；小游戏流 稻叶>林原>远野=和泉。 | https://www.taptap.cn/moment/862429125158111356 | 公测 | 自选决策。",
      "source": [
        "https://www.taptap.cn/moment/862429125158111356"
      ],
      "confidence": "多源一致"
    },
    "egg_stream_importance": {
      "raw": "扭蛋流角色重要度（公测 10-31）：前期 羽濑川≥野上＞春澄≥近江＞卧云＞千圣＞先斗；中期 羽濑川≥野上＞千圣＞卧云＞先斗＞近江。训练天赋优先度：千圣＞近江≥羽濑川＞卧云＞先斗＞野上。 | https://www.taptap.cn/moment/865657519840692849 | 公测 | 单帖但结构化，价值高。",
      "source": [
        "https://www.taptap.cn/moment/865657519840692849"
      ],
      "confidence": "多源一致"
    },
    "skill_structure": {
      "raw": "球员技能结构＝固定技能（大招，能量80/PT20）＋额外技能（被动，0/0）＋训练技能（流派技能，如「额外属性」「每周补助」）。 | 38 人图鉴 + 截图 | 公测 | 工具图鉴可按此分栏。",
      "source": [],
      "confidence": "多源一致"
    },
    "note": "claims.md 为 T2 产出；本文件只抽取与 roster/流派相对优势直接相关的条目，完整 claims 见原文件。"
  },
  "players": [
    {
      "contentId": 725362,
      "entryId": 227721,
      "name": "千圣·贝尔丝",
      "rarity": "SSR",
      "position": "中锋",
      "style": "篮板手",
      "school": "明日叶学园",
      "url": "https://www.gamekee.com/lqsn/725362.html",
      "potentials": {
        "投射": 100,
        "攻筐": 260,
        "防投": 130,
        "护筐": 233,
        "传球": 110,
        "突破": 167
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 161,
        "攻筐": 250,
        "防投": 180,
        "护筐": 235,
        "传球": 167,
        "突破": 200
      },
      "attributeSum": 1193,
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
      "positionRank": {
        "rank": 1,
        "total": 8
      },
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
      "missingCAttrs": []
    },
    {
      "contentId": 725361,
      "entryId": 227720,
      "name": "佐久间 雨乃",
      "rarity": "SSR",
      "position": "大前",
      "style": "防守者",
      "school": "明日叶学园",
      "url": "https://www.gamekee.com/lqsn/725361.html",
      "potentials": {
        "投射": 109,
        "攻筐": 257,
        "防投": 135,
        "护筐": 261,
        "传球": 115,
        "突破": 123
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 167,
        "攻筐": 250,
        "防投": 181,
        "护筐": 252,
        "传球": 170,
        "突破": 175
      },
      "attributeSum": 1195,
      "positionTemplate": {
        "id": "大前-T04",
        "name": "大前·护筐+攻筐型",
        "shared": true,
        "sameTemplatePlayers": [
          "春澄 永远(SR)"
        ]
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
      "positionRank": {
        "rank": 1,
        "total": 7
      },
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
      "missingCAttrs": []
    },
    {
      "contentId": 725347,
      "entryId": 227707,
      "name": "洺瑶",
      "rarity": "SSR",
      "position": "中锋",
      "style": "防守者",
      "school": "伊澄综合学园",
      "url": "https://www.gamekee.com/lqsn/725347.html",
      "potentials": {
        "投射": 100,
        "攻筐": 260,
        "防投": 220,
        "护筐": 143,
        "传球": 110,
        "突破": 167
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 161,
        "攻筐": 250,
        "防投": 228,
        "护筐": 185,
        "传球": 168,
        "突破": 199
      },
      "attributeSum": 1191,
      "positionTemplate": {
        "id": "中锋-T02",
        "name": "中锋·攻筐+防投型",
        "shared": true,
        "sameTemplatePlayers": [
          "五十岚 诗音(R)",
          "希雅·奥黛拉(SSR)"
        ]
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
      "positionRank": {
        "rank": 2,
        "total": 8
      },
      "functionalTags": [
        "模板·内线终结",
        "模板·外线防守",
        "技能·空间/外线",
        "技能·突破",
        "技能·团队增益"
      ],
      "roleSummary": "中锋·攻筐+防投型；技能偏向 团队增益",
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
      "missingCAttrs": []
    },
    {
      "contentId": 725363,
      "entryId": 227722,
      "name": "稻叶 杏里",
      "rarity": "SSR",
      "position": "大前",
      "style": "得分手",
      "school": "樱海高校",
      "url": "https://www.gamekee.com/lqsn/725363.html",
      "potentials": {
        "投射": 109,
        "攻筐": 257,
        "防投": 225,
        "护筐": 171,
        "传球": 115,
        "突破": 123
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 167,
        "攻筐": 250,
        "防投": 231,
        "护筐": 202,
        "传球": 170,
        "突破": 176
      },
      "attributeSum": 1196,
      "positionTemplate": {
        "id": "大前-T05",
        "name": "大前·攻筐+防投型",
        "shared": true,
        "sameTemplatePlayers": [
          "早濑 千秋(SR)"
        ]
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
      "positionRank": {
        "rank": 2,
        "total": 7
      },
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
      "missingCAttrs": []
    },
    {
      "contentId": 725366,
      "entryId": 227724,
      "name": "榎本 纯那",
      "rarity": "SSR",
      "position": "中锋",
      "style": "防守者",
      "school": "圣菲洛斯公学",
      "url": "https://www.gamekee.com/lqsn/725366.html",
      "potentials": {
        "投射": 100,
        "攻筐": 260,
        "防投": 130,
        "护筐": 233,
        "传球": 110,
        "突破": 167
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 161,
        "攻筐": 250,
        "防投": 180,
        "护筐": 235,
        "传球": 167,
        "突破": 200
      },
      "attributeSum": 1193,
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
      "positionRank": {
        "rank": 3,
        "total": 8
      },
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
      "missingCAttrs": []
    },
    {
      "contentId": 725375,
      "entryId": 227733,
      "name": "野上 泷",
      "rarity": "SSR",
      "position": "大前",
      "style": "多面手",
      "school": "圣山联盟",
      "url": "https://www.gamekee.com/lqsn/725375.html",
      "potentials": {
        "投射": 199,
        "攻筐": 167,
        "防投": 135,
        "护筐": 261,
        "传球": 115,
        "突破": 123
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 217,
        "攻筐": 200,
        "防投": 182,
        "护筐": 251,
        "传球": 170,
        "突破": 176
      },
      "attributeSum": 1196,
      "positionTemplate": {
        "id": "大前-T19",
        "name": "大前·护筐+投射型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 3,
        "total": 7
      },
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
      "missingCAttrs": []
    },
    {
      "contentId": 725381,
      "entryId": 227739,
      "name": "希雅·奥黛拉",
      "rarity": "SSR",
      "position": "中锋",
      "style": "多面手",
      "school": "圣山联盟",
      "url": "https://www.gamekee.com/lqsn/725381.html",
      "potentials": {
        "投射": 100,
        "攻筐": 260,
        "防投": 220,
        "护筐": 143,
        "传球": 110,
        "突破": 167
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 161,
        "攻筐": 250,
        "防投": 228,
        "护筐": 185,
        "传球": 168,
        "突破": 199
      },
      "attributeSum": 1191,
      "positionTemplate": {
        "id": "中锋-T02",
        "name": "中锋·攻筐+防投型",
        "shared": true,
        "sameTemplatePlayers": [
          "洺瑶(SSR)",
          "五十岚 诗音(R)"
        ]
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
      "positionRank": {
        "rank": 4,
        "total": 8
      },
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
      "missingCAttrs": []
    },
    {
      "contentId": 725379,
      "entryId": 227737,
      "name": "远野 桐",
      "rarity": "SSR",
      "position": "中锋",
      "style": "组织者",
      "school": "虹梦高等学院",
      "url": "https://www.gamekee.com/lqsn/725379.html",
      "potentials": {
        "投射": 190,
        "攻筐": 170,
        "防投": 130,
        "护筐": 233,
        "传球": 110,
        "突破": 167
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 211,
        "攻筐": 202,
        "防投": 180,
        "护筐": 235,
        "传球": 167,
        "突破": 200
      },
      "attributeSum": 1195,
      "positionTemplate": {
        "id": "中锋-T18",
        "name": "中锋·护筐+投射型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 5,
        "total": 8
      },
      "functionalTags": [
        "模板·护筐/篮板",
        "模板·空间/投射",
        "技能·空间/外线",
        "技能·防守",
        "技能·团队增益"
      ],
      "roleSummary": "中锋·护筐+投射型；技能偏向 团队增益",
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
      "missingCAttrs": []
    },
    {
      "contentId": 725342,
      "entryId": 227702,
      "name": "澪奈·贾妮丝",
      "rarity": "SR",
      "position": "小前",
      "style": "防守者",
      "school": "北空之丘女高",
      "url": "https://www.gamekee.com/lqsn/725342.html",
      "potentials": {
        "投射": 130,
        "攻筐": 260,
        "防投": 108,
        "护筐": 229,
        "传球": 150,
        "突破": 123
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 197,
        "攻筐": 264,
        "防投": 187,
        "护筐": 248,
        "传球": 207,
        "突破": 194
      },
      "attributeSum": 1297,
      "positionTemplate": {
        "id": "小前-T09",
        "name": "小前·攻筐+护筐型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 1,
        "total": 7
      },
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
      "missingCAttrs": []
    },
    {
      "contentId": 725355,
      "entryId": 227714,
      "name": "藤松 玖怜",
      "rarity": "SSR",
      "position": "分卫",
      "style": "防守者",
      "school": "樱海高校",
      "url": "https://www.gamekee.com/lqsn/725355.html",
      "potentials": {
        "投射": 220,
        "攻筐": 170,
        "防投": 198,
        "护筐": 139,
        "传球": 150,
        "突破": 123
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 227,
        "攻筐": 202,
        "防投": 216,
        "护筐": 183,
        "传球": 189,
        "突破": 176
      },
      "attributeSum": 1193,
      "positionTemplate": {
        "id": "分卫-T22",
        "name": "分卫·投射+防投型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 1,
        "total": 7
      },
      "functionalTags": [
        "模板·空间/投射",
        "模板·外线防守",
        "技能·空间/外线",
        "技能·防守",
        "技能·团队增益"
      ],
      "roleSummary": "分卫·投射+防投型；技能偏向 团队增益",
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
      "missingCAttrs": []
    },
    {
      "contentId": 725354,
      "entryId": 227713,
      "name": "百目鬼 剑",
      "rarity": "SSR",
      "position": "小前",
      "style": "组织者",
      "school": "樱海高校",
      "url": "https://www.gamekee.com/lqsn/725354.html",
      "potentials": {
        "投射": 220,
        "攻筐": 260,
        "防投": 108,
        "护筐": 139,
        "传球": 150,
        "突破": 123
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 227,
        "攻筐": 250,
        "防投": 168,
        "护筐": 183,
        "传球": 189,
        "突破": 176
      },
      "attributeSum": 1193,
      "positionTemplate": {
        "id": "小前-T23",
        "name": "小前·攻筐+投射型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 2,
        "total": 7
      },
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
      "missingCAttrs": []
    },
    {
      "contentId": 725374,
      "entryId": 227732,
      "name": "卧云 真昼",
      "rarity": "SSR",
      "position": "分卫",
      "style": "组织者",
      "school": "私立苍骑学园",
      "url": "https://www.gamekee.com/lqsn/725374.html",
      "potentials": {
        "投射": 260,
        "攻筐": 122,
        "防投": 118,
        "护筐": 110,
        "传球": 230,
        "突破": 160
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 249,
        "攻筐": 174,
        "防投": 172,
        "护筐": 167,
        "传球": 234,
        "突破": 195
      },
      "attributeSum": 1191,
      "positionTemplate": {
        "id": "分卫-T08",
        "name": "分卫·投射+传球型",
        "shared": true,
        "sameTemplatePlayers": [
          "羽田 朱志香(SSR)"
        ]
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
      "positionRank": {
        "rank": 2,
        "total": 7
      },
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
      "missingCAttrs": []
    },
    {
      "contentId": 725371,
      "entryId": 227729,
      "name": "羽濑川 湊",
      "rarity": "SSR",
      "position": "小前",
      "style": "篮板手",
      "school": "圣菲洛斯公学",
      "url": "https://www.gamekee.com/lqsn/725371.html",
      "potentials": {
        "投射": 130,
        "攻筐": 260,
        "防投": 198,
        "护筐": 139,
        "传球": 150,
        "突破": 123
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 179,
        "攻筐": 250,
        "防投": 216,
        "护筐": 183,
        "传球": 189,
        "突破": 176
      },
      "attributeSum": 1193,
      "positionTemplate": {
        "id": "小前-T06",
        "name": "小前·攻筐+防投型",
        "shared": true,
        "sameTemplatePlayers": [
          "皆川 式(SR)"
        ]
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
      "positionRank": {
        "rank": 3,
        "total": 7
      },
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
      "missingCAttrs": []
    },
    {
      "contentId": 725356,
      "entryId": 227715,
      "name": "绿川 步梦",
      "rarity": "SR",
      "position": "中锋",
      "style": "组织者",
      "school": "樱海高校",
      "url": "https://www.gamekee.com/lqsn/725356.html",
      "potentials": {
        "投射": 100,
        "攻筐": 260,
        "防投": 130,
        "护筐": 233,
        "传球": 110,
        "突破": 167
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 150,
        "攻筐": 230,
        "防投": 162,
        "护筐": 216,
        "传球": 153,
        "突破": 182
      },
      "attributeSum": 1093,
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
      "positionRank": {
        "rank": 6,
        "total": 8
      },
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
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725343,
      "entryId": 227703,
      "name": "龙宫寺 心叶",
      "rarity": "SR",
      "position": "大前",
      "style": "组织者",
      "school": "北空之丘女高",
      "url": "https://www.gamekee.com/lqsn/725343.html",
      "potentials": {
        "投射": 199,
        "攻筐": 167,
        "防投": 135,
        "护筐": 171,
        "传球": 115,
        "突破": 213
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 232,
        "攻筐": 215,
        "防投": 200,
        "护筐": 217,
        "传球": 189,
        "突破": 240
      },
      "attributeSum": 1293,
      "positionTemplate": {
        "id": "大前-T07",
        "name": "大前·突破+投射型",
        "shared": true,
        "sameTemplatePlayers": [
          "雨森 琉璃(SSR)"
        ]
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
      "positionRank": {
        "rank": 4,
        "total": 7
      },
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
      "missingCAttrs": []
    },
    {
      "contentId": 725367,
      "entryId": 227725,
      "name": "春澄 永远",
      "rarity": "SR",
      "position": "大前",
      "style": "篮板手",
      "school": "圣菲洛斯公学",
      "url": "https://www.gamekee.com/lqsn/725367.html",
      "potentials": {
        "投射": 109,
        "攻筐": 257,
        "防投": 135,
        "护筐": 261,
        "传球": 115,
        "突破": 123
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 154,
        "攻筐": 227,
        "防投": 166,
        "护筐": 229,
        "传球": 155,
        "突破": 160
      },
      "attributeSum": 1091,
      "positionTemplate": {
        "id": "大前-T04",
        "name": "大前·护筐+攻筐型",
        "shared": true,
        "sameTemplatePlayers": [
          "佐久间 雨乃(SSR)"
        ]
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
      "positionRank": {
        "rank": 5,
        "total": 7
      },
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
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725351,
      "entryId": 227711,
      "name": "羽田 朱志香",
      "rarity": "SSR",
      "position": "分卫",
      "style": "组织者",
      "school": "伊澄综合学园",
      "url": "https://www.gamekee.com/lqsn/725351.html",
      "potentials": {
        "投射": 260,
        "攻筐": 122,
        "防投": 118,
        "护筐": 110,
        "传球": 230,
        "突破": 160
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 249,
        "攻筐": 174,
        "防投": 172,
        "护筐": 167,
        "传球": 234,
        "突破": 195
      },
      "attributeSum": 1191,
      "positionTemplate": {
        "id": "分卫-T08",
        "name": "分卫·投射+传球型",
        "shared": true,
        "sameTemplatePlayers": [
          "卧云 真昼(SSR)"
        ]
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
      "positionRank": {
        "rank": 3,
        "total": 7
      },
      "functionalTags": [
        "模板·空间/投射",
        "模板·组织",
        "技能·空间/外线",
        "技能·自我增益"
      ],
      "roleSummary": "分卫·投射+传球型；技能偏向 自我增益",
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
      "missingCAttrs": []
    },
    {
      "contentId": 725350,
      "entryId": 227710,
      "name": "早濑 千秋",
      "rarity": "SR",
      "position": "大前",
      "style": "防守者",
      "school": "伊澄综合学园",
      "url": "https://www.gamekee.com/lqsn/725350.html",
      "potentials": {
        "投射": 109,
        "攻筐": 257,
        "防投": 225,
        "护筐": 171,
        "传球": 115,
        "突破": 123
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 154,
        "攻筐": 227,
        "防投": 211,
        "护筐": 184,
        "传球": 155,
        "突破": 160
      },
      "attributeSum": 1091,
      "positionTemplate": {
        "id": "大前-T05",
        "name": "大前·攻筐+防投型",
        "shared": true,
        "sameTemplatePlayers": [
          "稻叶 杏里(SSR)"
        ]
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
      "positionRank": {
        "rank": 6,
        "total": 7
      },
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
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725357,
      "entryId": 227716,
      "name": "雨森 琉璃",
      "rarity": "SSR",
      "position": "大前",
      "style": "组织者",
      "school": "私立苍骑学园",
      "url": "https://www.gamekee.com/lqsn/725357.html",
      "potentials": {
        "投射": 199,
        "攻筐": 167,
        "防投": 135,
        "护筐": 171,
        "传球": 115,
        "突破": 213
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 217,
        "攻筐": 200,
        "防投": 182,
        "护筐": 201,
        "传球": 169,
        "突破": 224
      },
      "attributeSum": 1193,
      "positionTemplate": {
        "id": "大前-T07",
        "name": "大前·突破+投射型",
        "shared": true,
        "sameTemplatePlayers": [
          "龙宫寺 心叶(SR)"
        ]
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
      "positionRank": {
        "rank": 7,
        "total": 7
      },
      "functionalTags": [
        "模板·突破/持球",
        "模板·空间/投射",
        "技能·空间/外线",
        "技能·团队增益",
        "技能·防守",
        "技能·篮板（代理）"
      ],
      "roleSummary": "大前·突破+投射型；技能偏向 团队增益",
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
      "missingCAttrs": []
    },
    {
      "contentId": 725359,
      "entryId": 227718,
      "name": "毒岛 黛也",
      "rarity": "SR",
      "position": "分卫",
      "style": "防守者",
      "school": "明日叶学园",
      "url": "https://www.gamekee.com/lqsn/725359.html",
      "potentials": {
        "投射": 260,
        "攻筐": 122,
        "防投": 118,
        "护筐": 200,
        "传球": 140,
        "突破": 160
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 230,
        "攻筐": 160,
        "防投": 157,
        "护筐": 199,
        "传球": 169,
        "突破": 180
      },
      "attributeSum": 1095,
      "positionTemplate": {
        "id": "分卫-T26",
        "name": "分卫·投射+护筐型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 4,
        "total": 7
      },
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
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725346,
      "entryId": 227706,
      "name": "亚理纱 贾斯敏",
      "rarity": "SR",
      "position": "中锋",
      "style": "得分手",
      "school": "北空之丘女高",
      "url": "https://www.gamekee.com/lqsn/725346.html",
      "potentials": {
        "投射": 100,
        "攻筐": 260,
        "防投": 130,
        "护筐": 233,
        "传球": 110,
        "突破": 167
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 150,
        "攻筐": 230,
        "防投": 162,
        "护筐": 216,
        "传球": 153,
        "突破": 182
      },
      "attributeSum": 1093,
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
      "positionRank": {
        "rank": 7,
        "total": 8
      },
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
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725345,
      "entryId": 227705,
      "name": "和泉 香织",
      "rarity": "SSR",
      "position": "控卫",
      "style": "得分手",
      "school": "北空之丘女高",
      "url": "https://www.gamekee.com/lqsn/725345.html",
      "potentials": {
        "投射": 137,
        "攻筐": 132,
        "防投": 110,
        "护筐": 112,
        "传球": 255,
        "突破": 254
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 183,
        "攻筐": 180,
        "防投": 168,
        "护筐": 169,
        "传球": 247,
        "突破": 248
      },
      "attributeSum": 1195,
      "positionTemplate": {
        "id": "控卫-T03",
        "name": "控卫·传球+突破型",
        "shared": true,
        "sameTemplatePlayers": [
          "克拉丽丝·波洛(SR)",
          "森田 莉莉(R)"
        ]
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
      "positionRank": {
        "rank": 1,
        "total": 9
      },
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
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725348,
      "entryId": 227708,
      "name": "闪堂电",
      "rarity": "SSR",
      "position": "分卫",
      "style": "得分手",
      "school": "北空之丘女高",
      "url": "https://www.gamekee.com/lqsn/725348.html",
      "potentials": {
        "投射": 170,
        "攻筐": 212,
        "防投": 118,
        "护筐": 110,
        "传球": 230,
        "突破": 160
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 201,
        "攻筐": 224,
        "防投": 172,
        "护筐": 167,
        "传球": 233,
        "突破": 196
      },
      "attributeSum": 1193,
      "positionTemplate": {
        "id": "分卫-T17",
        "name": "分卫·传球+攻筐型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 5,
        "total": 7
      },
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
      "missingCAttrs": []
    },
    {
      "contentId": 725360,
      "entryId": 227719,
      "name": "名雪 纱夜",
      "rarity": "SSR",
      "position": "控卫",
      "style": "组织者",
      "school": "明日叶学园",
      "url": "https://www.gamekee.com/lqsn/725360.html",
      "potentials": {
        "投射": 137,
        "攻筐": 132,
        "防投": 110,
        "护筐": 202,
        "传球": 165,
        "突破": 254
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 183,
        "攻筐": 180,
        "防投": 168,
        "护筐": 217,
        "传球": 198,
        "突破": 247
      },
      "attributeSum": 1193,
      "positionTemplate": {
        "id": "控卫-T10",
        "name": "控卫·突破+护筐型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 2,
        "total": 9
      },
      "functionalTags": [
        "模板·突破/持球",
        "模板·护筐/篮板",
        "技能·体能/耐久（代理）",
        "技能·耐久/能量资源"
      ],
      "roleSummary": "控卫·突破+护筐型；技能偏向 耐久/能量资源",
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
      "missingCAttrs": []
    },
    {
      "contentId": 725376,
      "entryId": 227734,
      "name": "降旗 千红纱",
      "rarity": "SSR",
      "position": "小前",
      "style": "篮板手",
      "school": "夜明女高",
      "url": "https://www.gamekee.com/lqsn/725376.html",
      "potentials": {
        "投射": 137,
        "攻筐": 222,
        "防投": 200,
        "护筐": 112,
        "传球": 165,
        "突破": 164
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 183,
        "攻筐": 230,
        "防投": 218,
        "护筐": 169,
        "传球": 197,
        "突破": 198
      },
      "attributeSum": 1195,
      "positionTemplate": {
        "id": "小前-T13",
        "name": "小前·攻筐+防投型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 4,
        "total": 7
      },
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
      "missingCAttrs": []
    },
    {
      "contentId": 725364,
      "entryId": 227723,
      "name": "清水 万里",
      "rarity": "SR",
      "position": "控卫",
      "style": "篮板手",
      "school": "圣菲洛斯公学",
      "url": "https://www.gamekee.com/lqsn/725364.html",
      "potentials": {
        "投射": 137,
        "攻筐": 222,
        "防投": 110,
        "护筐": 112,
        "传球": 165,
        "突破": 254
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 168,
        "攻筐": 209,
        "防投": 154,
        "护筐": 155,
        "传球": 181,
        "突破": 226
      },
      "attributeSum": 1093,
      "positionTemplate": {
        "id": "控卫-T12",
        "name": "控卫·突破+攻筐型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 3,
        "total": 9
      },
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
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725372,
      "entryId": 227730,
      "name": "真崎 辉世",
      "rarity": "SSR",
      "position": "控卫",
      "style": "得分手",
      "school": "圣菲洛斯公学",
      "url": "https://www.gamekee.com/lqsn/725372.html",
      "potentials": {
        "投射": 170,
        "攻筐": 122,
        "防投": 118,
        "护筐": 110,
        "传球": 230,
        "突破": 250
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 201,
        "攻筐": 174,
        "防投": 172,
        "护筐": 167,
        "传球": 234,
        "突破": 245
      },
      "attributeSum": 1193,
      "positionTemplate": {
        "id": "控卫-T14",
        "name": "控卫·突破+传球型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 4,
        "total": 9
      },
      "functionalTags": [
        "模板·突破/持球",
        "模板·组织",
        "技能·防守",
        "技能·突破",
        "技能·自我增益",
        "技能·空间/外线"
      ],
      "roleSummary": "控卫·突破+传球型；技能偏向 自我增益",
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
      "missingCAttrs": []
    },
    {
      "contentId": 725344,
      "entryId": 227704,
      "name": "近江 奏",
      "rarity": "SR",
      "position": "分卫",
      "style": "组织者",
      "school": "北空之丘女高",
      "url": "https://www.gamekee.com/lqsn/725344.html",
      "potentials": {
        "投射": 260,
        "攻筐": 122,
        "防投": 118,
        "护筐": 110,
        "传球": 140,
        "突破": 250
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 230,
        "攻筐": 160,
        "防投": 157,
        "护筐": 154,
        "传球": 168,
        "突破": 224
      },
      "attributeSum": 1093,
      "positionTemplate": {
        "id": "分卫-T25",
        "name": "分卫·投射+突破型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 6,
        "total": 7
      },
      "functionalTags": [
        "模板·空间/投射",
        "模板·突破/持球",
        "技能·体能/耐久（代理）",
        "技能·耐久/能量资源",
        "技能·空间/外线",
        "技能·自我增益"
      ],
      "roleSummary": "分卫·投射+突破型；技能偏向 耐久/能量资源/自我增益",
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725373,
      "entryId": 227731,
      "name": "先斗 月绮",
      "rarity": "SR",
      "position": "控卫",
      "style": "防守者",
      "school": "私立苍骑学园",
      "url": "https://www.gamekee.com/lqsn/725373.html",
      "potentials": {
        "投射": 227,
        "攻筐": 132,
        "防投": 110,
        "护筐": 112,
        "传球": 255,
        "突破": 164
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 212,
        "攻筐": 165,
        "防投": 154,
        "护筐": 156,
        "传球": 224,
        "突破": 182
      },
      "attributeSum": 1093,
      "positionTemplate": {
        "id": "控卫-T24",
        "name": "控卫·传球+投射型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 5,
        "total": 9
      },
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
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725349,
      "entryId": 227709,
      "name": "克拉丽丝·波洛",
      "rarity": "SR",
      "position": "控卫",
      "style": "组织者",
      "school": "伊澄综合学园",
      "url": "https://www.gamekee.com/lqsn/725349.html",
      "potentials": {
        "投射": 137,
        "攻筐": 132,
        "防投": 110,
        "护筐": 112,
        "传球": 255,
        "突破": 254
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 168,
        "攻筐": 165,
        "防投": 154,
        "护筐": 155,
        "传球": 225,
        "突破": 226
      },
      "attributeSum": 1093,
      "positionTemplate": {
        "id": "控卫-T03",
        "name": "控卫·传球+突破型",
        "shared": true,
        "sameTemplatePlayers": [
          "和泉 香织(SSR)",
          "森田 莉莉(R)"
        ]
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
      "positionRank": {
        "rank": 6,
        "total": 9
      },
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
      "missingCAttrs": []
    },
    {
      "contentId": 725380,
      "entryId": 227738,
      "name": "白神 时久",
      "rarity": "SSR",
      "position": "控卫",
      "style": "多面手",
      "school": "圣山联盟",
      "url": "https://www.gamekee.com/lqsn/725380.html",
      "potentials": {
        "投射": 137,
        "攻筐": 132,
        "防投": 200,
        "护筐": 112,
        "传球": 165,
        "突破": 254
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 183,
        "攻筐": 180,
        "防投": 218,
        "护筐": 169,
        "传球": 197,
        "突破": 248
      },
      "attributeSum": 1195,
      "positionTemplate": {
        "id": "控卫-T11",
        "name": "控卫·突破+防投型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 7,
        "total": 9
      },
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
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725378,
      "entryId": 227736,
      "name": "美星 栗栖",
      "rarity": "SR",
      "position": "小前",
      "style": "篮板手",
      "school": "青岚高等学校",
      "url": "https://www.gamekee.com/lqsn/725378.html",
      "potentials": {
        "投射": 220,
        "攻筐": 170,
        "防投": 108,
        "护筐": 139,
        "传球": 150,
        "突破": 213
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 210,
        "攻筐": 183,
        "防投": 154,
        "护筐": 168,
        "传球": 172,
        "突破": 206
      },
      "attributeSum": 1093,
      "positionTemplate": {
        "id": "小前-T20",
        "name": "小前·投射+突破型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 5,
        "total": 7
      },
      "functionalTags": [
        "模板·空间/投射",
        "模板·突破/持球",
        "技能·空间/外线",
        "技能·团队增益",
        "技能·防守",
        "技能·自我增益"
      ],
      "roleSummary": "小前·投射+突破型；技能偏向 团队增益/自我增益",
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725352,
      "entryId": 227712,
      "name": "望月 透",
      "rarity": "SSR",
      "position": "小前",
      "style": "得分手",
      "school": "伊澄综合学园",
      "url": "https://www.gamekee.com/lqsn/725352.html",
      "potentials": {
        "投射": 220,
        "攻筐": 170,
        "防投": 108,
        "护筐": 139,
        "传球": 240,
        "突破": 123
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 227,
        "攻筐": 202,
        "防投": 168,
        "护筐": 183,
        "传球": 239,
        "突破": 176
      },
      "attributeSum": 1195,
      "positionTemplate": {
        "id": "小前-T21",
        "name": "小前·传球+投射型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 6,
        "total": 7
      },
      "functionalTags": [
        "模板·组织",
        "模板·空间/投射",
        "技能·空间/外线",
        "技能·进攻",
        "技能·自我增益"
      ],
      "roleSummary": "小前·传球+投射型；技能偏向 自我增益",
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725370,
      "entryId": 227728,
      "name": "五十岚 诗音",
      "rarity": "R",
      "position": "中锋",
      "style": "防守者",
      "school": "北空之丘女高",
      "url": "https://www.gamekee.com/lqsn/725370.html",
      "potentials": {
        "投射": 100,
        "攻筐": 260,
        "防投": 220,
        "护筐": 143,
        "传球": 110,
        "突破": 167
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 136,
        "攻筐": 194,
        "防投": 180,
        "护筐": 152,
        "传球": 140,
        "突破": 160
      },
      "attributeSum": 962,
      "positionTemplate": {
        "id": "中锋-T02",
        "name": "中锋·攻筐+防投型",
        "shared": true,
        "sameTemplatePlayers": [
          "洺瑶(SSR)",
          "希雅·奥黛拉(SSR)"
        ]
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
      "positionRank": {
        "rank": 8,
        "total": 8
      },
      "functionalTags": [
        "模板·内线终结",
        "模板·外线防守",
        "技能·自我增益",
        "技能·防守"
      ],
      "roleSummary": "中锋·攻筐+防投型；技能偏向 自我增益",
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725377,
      "entryId": 227735,
      "name": "林原 树里",
      "rarity": "SSR",
      "position": "控卫",
      "style": "防守者",
      "school": "青岚高等学校",
      "url": "https://www.gamekee.com/lqsn/725377.html",
      "potentials": {
        "投射": 170,
        "攻筐": 122,
        "防投": 208,
        "护筐": 110,
        "传球": 140,
        "突破": 250
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 201,
        "攻筐": 174,
        "防投": 222,
        "护筐": 167,
        "传球": 184,
        "突破": 245
      },
      "attributeSum": 1193,
      "positionTemplate": {
        "id": "控卫-T15",
        "name": "控卫·突破+防投型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 8,
        "total": 9
      },
      "functionalTags": [
        "模板·突破/持球",
        "模板·外线防守",
        "技能·进攻",
        "技能·防守",
        "技能·弱化/干扰",
        "技能·自我增益"
      ],
      "roleSummary": "控卫·突破+防投型；技能偏向 弱化/干扰/自我增益",
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
      "missingCAttrs": []
    },
    {
      "contentId": 725358,
      "entryId": 227717,
      "name": "皆川 式",
      "rarity": "SR",
      "position": "小前",
      "style": "组织者",
      "school": "明日叶学园",
      "url": "https://www.gamekee.com/lqsn/725358.html",
      "potentials": {
        "投射": 130,
        "攻筐": 260,
        "防投": 198,
        "护筐": 139,
        "传球": 150,
        "突破": 123
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 164,
        "攻筐": 230,
        "防投": 196,
        "护筐": 168,
        "传球": 173,
        "突破": 160
      },
      "attributeSum": 1091,
      "positionTemplate": {
        "id": "小前-T06",
        "name": "小前·攻筐+防投型",
        "shared": true,
        "sameTemplatePlayers": [
          "羽濑川 湊(SSR)"
        ]
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
      "positionRank": {
        "rank": 7,
        "total": 7
      },
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
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725369,
      "entryId": 227727,
      "name": "美伽 未来",
      "rarity": "R",
      "position": "分卫",
      "style": "组织者",
      "school": "北空之丘女高",
      "url": "https://www.gamekee.com/lqsn/725369.html",
      "potentials": {
        "投射": 170,
        "攻筐": 212,
        "防投": 118,
        "护筐": 110,
        "传球": 140,
        "突破": 250
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 162,
        "攻筐": 176,
        "防投": 142,
        "护筐": 140,
        "传球": 150,
        "突破": 190
      },
      "attributeSum": 960,
      "positionTemplate": {
        "id": "分卫-T16",
        "name": "分卫·突破+攻筐型",
        "shared": false,
        "sameTemplatePlayers": []
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
      "positionRank": {
        "rank": 7,
        "total": 7
      },
      "functionalTags": [
        "模板·突破/持球",
        "模板·内线终结",
        "技能·自我增益",
        "技能·突破"
      ],
      "roleSummary": "分卫·突破+攻筐型；技能偏向 自我增益",
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    },
    {
      "contentId": 725368,
      "entryId": 227726,
      "name": "森田 莉莉",
      "rarity": "R",
      "position": "控卫",
      "style": "得分手",
      "school": "北空之丘女高",
      "url": "https://www.gamekee.com/lqsn/725368.html",
      "potentials": {
        "投射": 137,
        "攻筐": 132,
        "防投": 110,
        "护筐": 112,
        "传球": 255,
        "突破": 254
      },
      "potentialSum": 1000,
      "stats": {
        "投射": 150,
        "攻筐": 148,
        "防投": 140,
        "护筐": 140,
        "传球": 192,
        "突破": 192
      },
      "attributeSum": 962,
      "positionTemplate": {
        "id": "控卫-T03",
        "name": "控卫·传球+突破型",
        "shared": true,
        "sameTemplatePlayers": [
          "和泉 香织(SSR)",
          "克拉丽丝·波洛(SR)"
        ]
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
      "positionRank": {
        "rank": 9,
        "total": 9
      },
      "functionalTags": [
        "模板·组织",
        "模板·突破/持球",
        "技能·自我增益"
      ],
      "roleSummary": "控卫·传球+突破型；技能偏向 自我增益",
      "communityTier": {
        "tier": null,
        "reason": "不在 725623 的 22 人评级范围内"
      },
      "missingCAttrs": []
    }
  ]
};
  if (typeof module === "object" && module.exports) module.exports = data;
  if (root) {
    root.BBRosterData = data;
    root.BBT = root.BBT || {};
    root.BBT.rosterData = data;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);

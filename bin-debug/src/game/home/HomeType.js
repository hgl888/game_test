var uw;
(function (uw) {
    uw.SubModule = {
        //右下角
        Hero: "btnHero",
        Bag: "btnBag",
        occultSciences: "btnSecret",
        Mix: "btnMix",
        Rank: "btnRank",
        Mail: "btnMail",
        FeedBack: "btnFeedBack",
        //左上角
        UserInfo: "btnUserInfo",
        VIP: "btnVip",
        Alchemy: "btnAlchemy",
        //顶部
        Charge: "btnCharge",
        Sign: "btnSign",
        EventFirstRecharge: "btnEventFirstRecharge",
        EventSevenDay: "btnEventSevenDay",
        //左边
        Task: "btnTask",
        Daily: "btnDaily",
        EventWonderful: "btnEventWonderful",
        //建筑
        Valley: "tb1",
        Merchant: "tb2",
        Tower: "tb3",
        Arena: "tb4",
        Mirror: "tb5",
        WishingWell: "tb6",
        ForgingFactory: "tb7",
        Shop: "tb8",
        Copy: "tb9",
        SecretShop: "tb2",
        //其他
        CopyInfo: "CopyInfo",
        Embattle: "Embattle",
        SecretTune: "SecretTune",
        MirrorAtkRank: "MirrorAtkRank",
        ForgeExclusive: "ForgeExclusive",
        ForgeExchange: "ForgeExchange"
    };
    uw.PosType = {
        Top: 0,
        Left: 1,
        BottomRight: 2,
        Bottom: 3,
        Building: 4,
        Other: 100
    };
    uw.ModuleConfig = [
        {
            moduleId: uw.SubModule.Hero,
            moduleName: "英雄",
            openId: uw.id_c_open.hero,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Bottom,
            index: 0,
            goto: function () {
                mo.sceneMgr.pushScene(uw.HeroScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function () {
                });
            }
        },
        {
            moduleId: uw.SubModule.Bag,
            moduleName: "背包",
            openId: uw.id_c_open.bag,
            visibleBg: false,
            visibleResBar: true,
            posType: uw.PosType.Bottom,
            index: 1,
            goto: function () {
                mo.sceneMgr.pushScene(uw.BagScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function () {
                });
            }
        },
        {
            moduleId: uw.SubModule.occultSciences,
            moduleName: "秘术",
            openId: uw.id_c_open.occultSciences,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Bottom,
            index: 2,
            goto: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                mo.sceneMgr.pushScene(uw.SecretScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function (cb) {
                    args.splice(0, 0, null);
                    cb.apply(null, args);
                }, function () {
                });
            }
        },
        {
            moduleId: uw.SubModule.Mix,
            moduleName: "兑换",
            openId: uw.id_c_open.fragmentSynthesis,
            visibleBg: false,
            visibleResBar: true,
            posType: uw.PosType.Bottom,
            index: 3,
            goto: function () {
                mo.sceneMgr.pushScene(uw.ExchangeScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function () {
                });
            }
        },
        {
            moduleId: uw.SubModule.FeedBack,
            moduleName: "反馈",
            openId: 0,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.BottomRight,
            index: 0,
            goto: function () {
                uw.showSubModule(uw.FeedBackLayer, [], uw.FeedBackDataCtrl.initByServer);
            }
        },
        {
            moduleId: uw.SubModule.Mail,
            moduleName: "邮件",
            openId: uw.id_c_open.mailbox,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.BottomRight,
            index: 1,
            goto: function () {
                uw.showSubModule(uw.MailBoxLayer, [], uw.MailDataCtrl.initByServer);
            }
        },
        {
            moduleId: uw.SubModule.Rank,
            moduleName: "排行榜",
            openId: uw.id_c_open.rank,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.BottomRight,
            index: 2,
            goto: function () {
                mo.sceneMgr.pushScene(uw.RankScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function () {
                });
            }
        },
        {
            moduleId: uw.SubModule.Task,
            moduleName: "任务",
            openId: 0,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Left,
            tips: true,
            index: 2,
            goto: function () {
                uw.showSubModule(uw.QuestLayer, [uw.c_prop.taskTypeKey.task]);
            }
        },
        {
            moduleId: uw.SubModule.Daily,
            moduleName: "日常活动",
            openId: uw.id_c_open.resetDailyTasks,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Left,
            index: 1,
            goto: function () {
                uw.showSubModule(uw.QuestLayer, [uw.c_prop.taskTypeKey.daily]);
            }
        },
        {
            moduleId: uw.SubModule.EventWonderful,
            moduleName: "精彩活动",
            openId: 0,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Left,
            index: 0,
            goto: function () {
                var result;
                var moduleName = mo.runningScene.__className;
                var subModuleName = uw.EventWonderfulLayer.__className;
                res.mgr.pushSubModule(moduleName, subModuleName);
                mo.preloadWaiting(function (cb) {
                    uw.userDataCtrl.getMainActivityList(function (data) {
                        result = data;
                        cb();
                    }, this);
                }, subModuleName, function () {
                    var layer = uw.EventWonderfulLayer.create(result);
                    layer.moduleInfo = { moduleName: moduleName, subModuleName: subModuleName };
                    layer.show();
                });
            }
        },
        {
            moduleId: uw.SubModule.Charge,
            moduleName: "充值",
            openId: 0,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Top,
            index: 0,
            goto: function () {
                uw.showSubModule(uw.VipLayer, [uw.PAYMENT_TYPE.CHARGE]);
            }
        },
        {
            moduleId: uw.SubModule.Sign,
            moduleName: "签到",
            openId: 0,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Top,
            index: 1,
            goto: function () {
                uw.showSubModule(uw.SignLayer, []);
            }
        },
        {
            moduleId: uw.SubModule.EventFirstRecharge,
            moduleName: "首充奖励",
            openId: 0,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Top,
            index: 2,
            goto: function () {
                var result;
                var moduleName = mo.runningScene.__className;
                var subModuleName = uw.EventFirstRechargeLayer.__className;
                res.mgr.pushSubModule(moduleName, subModuleName);
                mo.preloadWaiting(function (cb) {
                    uw.userDataCtrl.getFirstRecharge(function (data) {
                        result = data;
                        cb();
                    }, this);
                }, subModuleName, function () {
                    var layer = uw.EventFirstRechargeLayer.create(result);
                    layer.moduleInfo = { moduleName: moduleName, subModuleName: subModuleName };
                    layer.show();
                });
            }
        },
        {
            moduleId: uw.SubModule.EventSevenDay,
            moduleName: "七天登陆",
            openId: 0,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Top,
            index: 3,
            goto: function () {
                var result;
                var moduleName = mo.runningScene.__className;
                var subModuleName = uw.EventSevenDayLayer.__className;
                res.mgr.pushSubModule(moduleName, subModuleName);
                mo.preloadWaiting(function (cb) {
                    uw.userDataCtrl.getSevenLogin(function (data) {
                        result = data;
                        cb();
                    }, this);
                }, subModuleName, function () {
                    var layer = uw.EventSevenDayLayer.create(result);
                    layer.moduleInfo = { moduleName: moduleName, subModuleName: subModuleName };
                    layer.show();
                });
            }
        },
        {
            moduleId: uw.SubModule.VIP,
            moduleName: "VIP",
            openId: 0,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Other,
            index: 0,
            goto: function () {
                uw.showSubModule(uw.VipLayer, [uw.PAYMENT_TYPE.VIP]);
            }
        },
        {
            moduleId: uw.SubModule.CopyInfo,
            moduleName: "副本信息",
            openId: 0,
            visibleBg: false,
            visibleResBar: true,
            posType: uw.PosType.Other,
            goto: function () {
                var args = arguments;
                mo.sceneMgr.pushScene(uw.CopyInfoScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function (err, scene) {
                    var layer = scene.copyLayer;
                    layer.setCopyInfo.apply(layer, args);
                });
            }
        },
        {
            moduleId: uw.SubModule.SecretTune,
            moduleName: "副本信息",
            openId: 0,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Other,
            goto: function () {
                var args = arguments;
                mo.sceneMgr.pushScene(uw.SecretTuneScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function (err, scene) {
                    var layer = scene.secretTuneLayer;
                    layer.setSecretMatrixType.apply(layer, args);
                });
            }
        },
        {
            moduleId: uw.SubModule.Embattle,
            moduleName: "布阵",
            openId: 0,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Other,
            goto: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                args.splice(0, 0, null);
                mo.sceneMgr.pushScene(uw.EmbattleScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function (cb1) {
                    cb1.apply(null, args);
                }, function (err, scene) {
                });
            }
        },
        {
            moduleId: uw.SubModule.Alchemy,
            moduleName: "点金术",
            openId: 0,
            visibleBg: false,
            visibleResBar: true,
            posType: uw.PosType.Other,
            goto: function () {
                uw.showSubModule(uw.AlchemyLayer, []);
            }
        },
        {
            moduleId: uw.SubModule.UserInfo,
            moduleName: "用户信息",
            openId: 0,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Other,
            goto: function () {
                uw.showSubModule(uw.UserInfoLayer, []);
            }
        },
        {
            moduleId: uw.SubModule.MirrorAtkRank,
            moduleName: "镜像挑战榜",
            openId: 0,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Other,
            goto: function () {
                var args = arguments;
                mo.sceneMgr.pushScene(uw.MirrorAtkRankScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function (err, scene) {
                    var layer = scene.layer;
                    layer.resetByData.apply(layer, args);
                });
            }
        },
        {
            moduleId: uw.SubModule.ForgeExclusive,
            moduleName: "专属锻造",
            openId: uw.id_c_open.forgeExclusive,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Other,
            goto: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (uw.verifyLevel(uw.id_c_open.forgeExclusive)) {
                    mo.sceneMgr.pushScene(uw.ForgeExclusiveScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function (cb) {
                        args.splice(0, 0, null);
                        cb.apply(null, args);
                    }, function () {
                    });
                }
            }
        },
        {
            moduleId: uw.SubModule.ForgeExchange,
            moduleName: "专属兑换",
            openId: uw.id_c_open.shopExclusive,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Other,
            goto: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (uw.verifyLevel(uw.id_c_open.shopExclusive)) {
                    mo.sceneMgr.pushScene(uw.ForgeExchangeScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function (cb) {
                        args.splice(0, 0, null);
                        cb.apply(null, args);
                    }, function () {
                    });
                }
            }
        },
        {
            moduleId: uw.SubModule.Valley,
            moduleName: "哀嚎山谷",
            openId: uw.id_c_open.trainOfBlood,
            visibleBg: false,
            visibleResBar: true,
            posType: uw.PosType.Building,
            armName: res.cca_ui.building_valley,
            playName: "ui_Valley",
            pos: mo.p(415, 136),
            goto: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (uw.verifyLevel(uw.id_c_open.trainOfBlood)) {
                    mo.sceneMgr.pushScene(uw.TrialScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function (cb) {
                        args.splice(0, 0, null);
                        cb.apply(null, args);
                    }, function () {
                    });
                }
            }
        },
        {
            moduleId: uw.SubModule.Copy,
            moduleName: "副本",
            openId: uw.id_c_open.easyCopy,
            visibleBg: false,
            visibleResBar: true,
            posType: uw.PosType.Building,
            armName: res.cca_ui.building_copy,
            playName: "ui_Merchant",
            pos: mo.p(300, 185),
            goto: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                mo.sceneMgr.pushScene(uw.CopyScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function (cb) {
                    args.splice(0, 0, null);
                    cb.apply(null, args);
                }, function () {
                });
            }
        },
        {
            moduleId: uw.SubModule.Tower,
            moduleName: "虚空塔",
            openId: uw.id_c_open.tower,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Building,
            armName: res.cca_ui.building_tower,
            playName: "ui_Tower",
            pos: mo.p(234, 107),
            goto: function () {
                if (uw.verifyLevel(uw.id_c_open.tower)) {
                    mo.sceneMgr.pushScene(uw.TowerScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function () {
                    });
                }
            }
        },
        {
            moduleId: uw.SubModule.Arena,
            moduleName: "竞技场",
            openId: uw.id_c_open.arena,
            visibleBg: false,
            visibleResBar: true,
            posType: uw.PosType.Building,
            armName: res.cca_ui.building_arena,
            playName: "ui_Arena",
            pos: mo.p(368, 184),
            goto: function () {
                if (uw.verifyLevel(uw.id_c_open.arena)) {
                    mo.sceneMgr.pushScene(uw.ArenaScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function () {
                    });
                }
            }
        },
        {
            moduleId: uw.SubModule.Mirror,
            moduleName: "镜像世界",
            openId: uw.id_c_open.boss,
            visibleBg: false,
            visibleResBar: false,
            posType: uw.PosType.Building,
            armName: res.cca_ui.building_mirrorWorld,
            playName: "ui_MirrorWorld",
            pos: mo.p(300, 153),
            goto: function () {
                if (uw.verifyLevel(uw.id_c_open.boss)) {
                    mo.sceneMgr.pushScene(uw.MirrorScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function () {
                    });
                }
            }
        },
        {
            moduleId: uw.SubModule.WishingWell,
            moduleName: "奇迹之泉",
            openId: uw.id_c_open.lottery,
            visibleBg: false,
            visibleResBar: true,
            posType: uw.PosType.Building,
            armName: res.cca_ui.building_wishingWel,
            playName: "ui_WishingWell",
            pos: mo.p(290, 150),
            goto: function () {
                mo.sceneMgr.pushScene(uw.LotteryScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function () {
                });
            }
        },
        {
            moduleId: uw.SubModule.ForgingFactory,
            moduleName: "锻造屋",
            openId: uw.id_c_open.forge,
            visibleBg: false,
            visibleResBar: true,
            posType: uw.PosType.Building,
            armName: res.cca_ui.building_forgingFactory,
            playName: "ui_ForgingFactory",
            pos: mo.p(290, 140),
            goto: function () {
                if (uw.verifyLevel(uw.id_c_open.forge)) {
                    mo.sceneMgr.pushScene(uw.ForgeScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function () {
                    });
                }
            }
        },
        {
            moduleId: uw.SubModule.Shop,
            moduleName: "商店",
            openId: uw.id_c_open.shop,
            visibleBg: false,
            visibleResBar: true,
            posType: uw.PosType.Building,
            armName: res.cca_ui.building_shop,
            playName: "ui_Shop",
            pos: mo.p(270, 166),
            goto: function () {
                if (uw.verifyLevel(uw.id_c_open.shop)) {
                    mo.sceneMgr.pushScene(uw.ShopScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function () {
                    });
                }
            }
        },
        {
            moduleId: uw.SubModule.SecretShop,
            moduleName: "神秘商店",
            openId: uw.id_c_open.secretShop1,
            visibleBg: false,
            visibleResBar: true,
            posType: uw.PosType.Building,
            armName: res.cca_ui.building_secretShop,
            playName: "Animation1",
            pos: mo.p(200, 380),
            goto: function () {
                if (uw.verifyLevel(uw.id_c_open.secretShop1)) {
                    mo.sceneMgr.pushScene(uw.SecretShopScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function () {
                    });
                }
            }
        }
    ];
    //获取模块信息
    function getSubModule(name) {
        for (var i = 0; i < uw.ModuleConfig.length; i++) {
            var mod = uw.ModuleConfig[i];
            if (name == mod.moduleId) {
                return mod;
            }
        }
    }
    uw.getSubModule = getSubModule;
    /**
     * 切换模块
     */
    function pushSubModule(name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var data = getSubModule(name);
        if (data) {
            return data.goto.apply(data, args);
        }
        return uw.log("没有这个模块：%s", name);
    }
    uw.pushSubModule = pushSubModule;
})(uw || (uw = {}));

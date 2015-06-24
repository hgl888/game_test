/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ArenaLayer = (function (_super) {
        __extends(ArenaLayer, _super);
        function ArenaLayer() {
            _super.apply(this, arguments);
            this._challengedArr = null;
            this._fightItemArr = null;
        }
        var __egretProto__ = ArenaLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._challengedArr = [];
            self._fightItemArr = [];
            self._dataReady = false;
            self._jsonPath = res.uiArenaLayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            //获取widget
            self.initWidget();
            //设置事件
            self.onClickByName("btnAdjustPanel", self.showEmbattleLayer, self, uw.c_prop.matrixTypeKey.arenaD);
            self.onClickByName("btnAdjust", self.showEmbattleLayer, self, uw.c_prop.matrixTypeKey.arenaD);
            self.onClickByName("btnHelp", self.showRuleLayer, self); //规则
            self.onClickByName("btnRecord", self.showRecordLayer, self); //记录
            self.onClickByName("btnRank", self.showRankLayer, self); //排行榜
            self.onClickByName("btnExchange", self.showShopLayer, self); //商店
            self.onClickByName("btnLuckRank", self.showLuckRankLayer, self); //幸运排行榜
            self.onClickByName("btnChangeRival", self.menuChangeRival, self); //更换对手
            self.onClickByName("btnAdd", self.menuAdd, self); //增加次数
            self.onClickByName("btnResetCdTime", self.menuResetCdTime, self); //重置cd时间
            //设置信息
            self.resetAllInfo();
            self.registerClassByKey(uw.ArenaDataCtrl, uw.ArenaDataCtrl.ON_LAST_ATTACK_TIME_CHANGED, self.setRemainTime);
            self.registerClassByKey(uw.ArenaDataCtrl, uw.ArenaDataCtrl.ON_BUY_RE_NUM, self.setRemainCount);
            self.registerClassByKey(uw.UserDataCtrl, uw.UserDataCtrl.ON_MATRIX_CHANGED, self.setEmbattleInfo);
            this.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.EXACT_FIT);
        };
        __egretProto__.showHighestRankLayer = function () {
            if (uw.arenaDataCtrl.getHighRankData()) {
                var highestRankLayer = uw.ArenaHighestRecordDlg.create();
                highestRankLayer.setDelegate(this);
                highestRankLayer.show();
            }
        };
        __egretProto__.resetAllInfo = function () {
            var self = this;
            //设置布阵队形
            self.setEmbattleInfo();
            //显示我的信息
            self.setMyInfo();
            //下面那3个
            self.setChangeRivalPrice();
            self.setRemainCount();
            self.setRemainTime();
            //设置对手
            self.setRivalInfo();
            //检测是否到了最高排名
            self.showHighestRankLayer();
        };
        __egretProto__.initWidget = function () {
            this.setVisibleByName("detailInfo", false);
            var parent = this.getWidgetByName("challenged");
            var challengedArr = this._challengedArr = [];
            for (var i = 0; i < 3; i++) {
                var roleItem = parent.getWidgetByName("roleItem" + i);
                challengedArr.push(roleItem);
            }
            parent = this.getWidgetByName("embattle");
            var embattle = this._fightItemArr = [];
            for (var j = 0; j < 5; j++) {
                var heroItem = parent.getWidgetByName("headItem" + j).getWidgetByName("head");
                embattle.push(heroItem);
            }
        };
        __egretProto__.setEmbattleInfo = function () {
            var heroes = uw.userDataCtrl.getMatrixByType(uw.c_prop.matrixTypeKey.arenaD);
            var heroCtrl, combatEff = 0;
            var heroEntity = uw.dsConsts.HeroEntity;
            for (var i = 0; i < this._fightItemArr.length; i++) {
                var widget = this._fightItemArr[i];
                heroCtrl = heroes[i];
                if (heroCtrl) {
                    widget.setVisible(true);
                    var tempId = heroCtrl.tempId;
                    var lvl = heroCtrl.lvl;
                    var ctrl = uw.UIHeroIconCtrl.create(widget, tempId);
                    ctrl.showLvl(lvl);
                    combatEff += heroCtrl.combatEff;
                }
                else {
                    widget.setVisible(false);
                }
            }
            this.setInfoByName("totalFightNum", combatEff);
            this.enableStrokeByName("totalFightNum", mo.c3b(20, 3, 0), 3);
        };
        __egretProto__._createLabel = function (widgetName, num) {
            var numStr = num + "", word, frameName, wordWidget, parent = this.getWidgetByName(widgetName);
            parent.removeChildren();
            for (var i = 0; i < numStr.length; i++) {
                word = numStr[i];
                frameName = mo.formatStr(res.ui_arena.tmp_num_rank_png, word);
                wordWidget = mo.UIImage.create();
                wordWidget.setAnchorPoint(0, 0);
                wordWidget.loadTexture(frameName);
                wordWidget.setPositionX(48 * i);
                wordWidget.setPositionY(120);
                parent.addChild(wordWidget);
            }
        };
        //增加挑战次数
        __egretProto__.menuAdd = function () {
            uw.arenaDataCtrl.buyArenaReNum(this.setRemainCount, this);
        };
        //重置cd时间
        __egretProto__.menuResetCdTime = function () {
            uw.arenaDataCtrl.resetCD(this.setRemainTime, this);
        };
        //更换对手
        __egretProto__.menuChangeRival = function () {
            uw.arenaDataCtrl.resetArenaFightRanks(this.setRivalInfo, this);
        };
        __egretProto__.setRemainCount = function () {
            var progress = uw.userDataCtrl.getCopyProgress(uw.c_prop.pCopyIdKey.arena);
            var count = progress.getCopyTodayLeftCount(progress.firstId);
            this.setInfoByName("remainingCount", count);
        };
        __egretProto__.setChangeRivalPrice = function () {
            var gold = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.arenaCfg)[3];
            this.setInfoByName("remainingGold", "x" + gold);
            uw.setGoldColor(this, "remainingGold");
        };
        __egretProto__.setRemainTime = function () {
            var self = this;
            var progress = uw.userDataCtrl.getCopyProgress(uw.c_prop.pCopyIdKey.arena);
            var now = Date.newDate();
            var pTime = progress.pTime;
            if (pTime.isAfter(now)) {
                self.showCDTimeContainer();
                self.countdownToEndTimeByName("remainingTime", pTime, function () {
                    self.hideCDTimeContainer();
                }, self);
            }
            else {
                self.hideCDTimeContainer();
            }
        };
        __egretProto__.showCDTimeContainer = function () {
            this.setVisibleByName("remainingTime", true);
            this.setVisibleByName("remainingTimeTitle", true);
            this.setVisibleByName("btnResetCdTime", true);
            this.setTouchEnabledByName("btnResetCdTime", true);
        };
        __egretProto__.hideCDTimeContainer = function () {
            this.setVisibleByName("remainingTime", false);
            this.setVisibleByName("remainingTimeTitle", false);
            this.setVisibleByName("btnResetCdTime", false);
            this.setTouchEnabledByName("btnResetCdTime", false);
        };
        __egretProto__.setMyInfo = function () {
            this._createLabel("rankNum", uw.arenaDataCtrl.rank);
            this.setInfoByName("myHonor", uw.userDataCtrl.getHonor());
        };
        __egretProto__.setRivalInfo = function () {
            var rivalInfo = uw.arenaDataCtrl.fightUsers || [];
            for (var i = 0; i < this._challengedArr.length; i++) {
                var roleItem = this._challengedArr[i];
                var obj = rivalInfo[i];
                if (roleItem) {
                    roleItem.loadMaskTextureByName("icon", res.ui_arena.cov_head_png);
                    roleItem.setMaskEnabledByName("icon", true);
                    if (obj) {
                        roleItem.setVisible(true);
                        var arenaFightUser = uw.dsConsts.ArenaFightUser;
                        var tempId = obj[arenaFightUser.iconId];
                        var head = uw.getRoleIconByTempId(tempId);
                        var isLuck = uw.arenaDataCtrl.isInLuckRanks(obj[arenaFightUser.rank]);
                        roleItem.setVisibleByName("luck", isLuck);
                        roleItem.setInfoByName("icon", head);
                        roleItem.setInfoByName("border", uw.getRankBorder(obj[arenaFightUser.rank]));
                        roleItem.setInfoByName("name", obj[arenaFightUser.name]);
                        roleItem.setInfoByName("lvl", obj[arenaFightUser.lvl]);
                        roleItem.setInfoByName("battleNum", obj[arenaFightUser.combatEff]);
                        roleItem.setInfoByName("rankNum", obj[arenaFightUser.rank]);
                        roleItem.onClickByName("fight", this.fightWithRival, this, obj[arenaFightUser.rank]);
                        var touch_panel = roleItem.getWidgetByName("touch_panel");
                        var TE = mo.TouchEvent;
                        touch_panel.addEventListener(TE.NODE_BEGIN, this.showRivalDetailInfoLayer, this);
                        touch_panel.addEventListener(TE.NODE_END, this.showRivalDetailInfoLayer, this);
                        touch_panel.setTag(i);
                    }
                    else {
                        roleItem.setInfoByName("icon", res.ui_panel.heroIcon_jpg);
                        roleItem.setInfoByName("name", "无");
                        roleItem.setInfoByName("lvl", 0);
                        roleItem.setInfoByName("battleNum", 0);
                        roleItem.setInfoByName("rankNum", 0);
                        roleItem.setGrayByName("fight", true);
                    }
                    roleItem.enableStrokeByName("lvl", mo.c3b(20, 3, 0), 3, false);
                    roleItem.enableStrokeByName("battleNum", mo.c3b(20, 3, 0), 3, false);
                }
            }
        };
        __egretProto__.showEmbattleLayer = function (sender, event, matrixType) {
            uw.pushSubModule(uw.SubModule.Embattle, matrixType);
        };
        /**
         * 显示挑战者的信息
         */
        __egretProto__.showRivalDetailInfoLayer = function (event) {
            var sender = event.target;
            var type = event.type;
            var detailInfo = this.getWidgetByName("detailInfo");
            if (type == mo.TouchEvent.NODE_BEGIN) {
                var parent = sender.getParent();
                var x = parent.getPositionX() + parent.getSize().width / 2 - detailInfo.getSize().width / 2;
                if (x < 0) {
                    detailInfo.setPositionX(0);
                }
                else if (x + detailInfo.getSize().width > mo.visibleRect.getWidth()) {
                    detailInfo.setPositionX(mo.visibleRect.getWidth() - detailInfo.getSize().width);
                }
                else {
                    detailInfo.setPositionX(x);
                }
                detailInfo.setVisible(true);
                var index = sender.getTag();
                var leaderInfo = uw.arenaDataCtrl.fightUsers[index];
                var fightUserConst = uw.dsConsts.ArenaFightUser;
                detailInfo.setInfoByName("name", leaderInfo[fightUserConst.name]);
                detailInfo.setInfoByName("fightNum", leaderInfo[fightUserConst.combatEff]);
                detailInfo.setInfoByName("rankNum", leaderInfo[fightUserConst.rank]);
                //描边
                detailInfo.enableStrokeByName("name", mo.c3b(20, 3, 0), 3, false);
                detailInfo.enableStrokeByName("fightNum", mo.c3b(20, 3, 0), 3, false);
                detailInfo.enableStrokeByName("rankNum", mo.c3b(20, 3, 0), 3, false);
                //            detailInfo.enableStrokeByName("rankGuild", cc.c3b(20, 3, 0), 3, false);
                //头像
                var tempId = leaderInfo[fightUserConst.iconId];
                var leaderHead = detailInfo.getWidgetByName("leaderHead");
                //遮罩
                leaderHead.loadMaskTextureByName("icon", res.ui_arena.cov_head_png);
                leaderHead.setMaskEnabledByName("icon", true);
                leaderHead.setInfoByName("level", leaderInfo[fightUserConst.lvl]);
                leaderHead.setInfoByName("icon", uw.getRoleIconByTempId(tempId));
                leaderHead.setInfoByName("border", uw.getRankBorder(leaderInfo[fightUserConst.rank]));
                leaderHead.enableStrokeByName("level", mo.c3b(20, 3, 0), 3);
                //布阵
                var heroInfo, heroes = leaderInfo[fightUserConst.heroes];
                var heroEntity = uw.dsConsts.HeroEntity;
                var warriors = mo.getJSONWithFileName(uw.cfg_t_warrior);
                heroes.sort(function (b, c) {
                    var b_tempId = uw.convertTempIdToWarriorId(b[heroEntity.tempId]);
                    var c_tempId = uw.convertTempIdToWarriorId(c[heroEntity.tempId]);
                    var b_posOrder = warriors[b_tempId][uw.t_warrior_posOrder];
                    var c_posOrder = warriors[c_tempId][uw.t_warrior_posOrder];
                    return b_posOrder > c_posOrder;
                });
                for (var i = 0; i < 5; i++) {
                    heroInfo = heroes[i];
                    var widget = detailInfo.getWidgetByName("headItem" + i), ctrl;
                    if (heroInfo) {
                        var tempId = heroInfo[heroEntity.tempId];
                        var lvl = heroInfo[heroEntity.lvl];
                        ctrl = uw.UIHeroIconCtrl.create(widget, tempId);
                        ctrl.showLvl(lvl);
                    }
                    else {
                        ctrl = uw.UIHeroIconCtrl.create(widget);
                        ctrl.hideInfo();
                    }
                }
            }
            else {
                detailInfo.setVisible(false);
            }
        };
        __egretProto__.fightWithRival = function (sender, event, rankId) {
            var self = this;
            uw.arenaDataCtrl.checkBeforeFight(function () {
                self.setRemainTime();
                uw.pushSubModule(uw.SubModule.Embattle, uw.c_prop.matrixTypeKey.arenaA, rankId);
            }, self);
        };
        __egretProto__.showRuleLayer = function () {
            var layer = uw.ArenaRuleLayer.create();
            layer.show();
        };
        __egretProto__.showRecordLayer = function () {
            var layer = uw.ArenaRecordLayer.create();
            layer.show();
        };
        __egretProto__.showRankLayer = function () {
            var layer = uw.ArenaRankLayer.create();
            layer.show();
        };
        __egretProto__.showShopLayer = function () {
            var layer = uw.ArenaHonorShopLayer.create();
            layer.show();
        };
        __egretProto__.showLuckRankLayer = function () {
            var layer = uw.ArenaLuckRankLayer.create();
            layer.show();
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            var self = this;
            if (!self._dataReady) {
                self._dataReady = true;
            }
            else {
                //这个请求前先隐藏，之后再显示的问题，是为了迎合动态图片的改造，避免闪烁问题。 zxj
                var chArr = self._challengedArr;
                for (var i = 0; i < chArr.length; i++) {
                    var roleItem = chArr[i];
                    if (roleItem) {
                        roleItem.setVisibleByName("icon", false);
                    }
                }
                uw.ArenaScene.preload(function () {
                    for (var i = 0; i < chArr.length; i++) {
                        var roleItem = chArr[i];
                        if (roleItem) {
                            roleItem.setVisibleByName("icon", true);
                        }
                    }
                    self.resetAllInfo();
                });
            }
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            var arr = this._fightItemArr;
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].iconCtrl) {
                    arr[i].iconCtrl.detachWidget();
                }
            }
        };
        ArenaLayer.__className = "ArenaLayer";
        return ArenaLayer;
    })(mo.DisplayLayer);
    uw.ArenaLayer = ArenaLayer;
    ArenaLayer.prototype.__class__ = "uw.ArenaLayer";
})(uw || (uw = {}));

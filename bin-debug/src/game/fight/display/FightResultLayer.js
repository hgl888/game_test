var uw;
(function (uw) {
    var FightResultLayer = (function (_super) {
        __extends(FightResultLayer, _super);
        function FightResultLayer() {
            _super.apply(this, arguments);
            this._isPopedEnterHeigherDlg = false;
        }
        var __egretProto__ = FightResultLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._rankArr = [];
            this._charsArr = [];
            this._itemCtrlArr = [];
            this._jsonPath = res.uiFightResultLayer_ui;
        };
        __egretProto__.init = function (resultData) {
            _super.prototype.init.call(this);
            var self = this;
            self._oldData = resultData.oldData;
            self._newData = resultData.newData;
            self._isWin = !!self._newData;
            self._winPanel = self.getWidgetByName("winContainer");
            self._losePanel = self.getWidgetByName("loseContainer");
            mo.pauseMusic();
            if (this._isWin) {
                self._winPanel.setVisible(true);
                self._losePanel.setVisible(false);
                self._winPanel.setZOrder(999);
                mo.playUIAudio(res.audio_ui.win);
                var light = self.getWidgetByName("light");
                var lightAct = mo.sequence(mo.scaleTo(0.3, 1).setEase(mo.Ease.backOut), mo.callFunc(function (sender) {
                    sender.runAction(mo.repeatForever(mo.rotateBy(4.6, 360)));
                }));
                light.setScale(0.8);
                light.runAction(lightAct);
                var item, i, starNum = resultData.newData[uw.dsConsts.FightResult.star];
                for (i = 0; i < 3; i++) {
                    item = self.getWidgetByName("star" + i);
                    if (i < starNum) {
                        item.setScale(6);
                        item.setRotation(-30);
                        item.setOpacity(0);
                        self._rankArr.push(item);
                    }
                    item.setVisible(false);
                }
                var ctrls = uw.fightMainCtrl.getMatrix(), ctrl;
                for (i = 0; i < 5; i++) {
                    item = self.getWidgetByName("hero" + (i + 1));
                    ctrl = ctrls[i];
                    if (ctrl && item) {
                        item.ctrl = ctrl;
                        self._charsArr.push(item);
                    }
                    else {
                        item.setVisible(false);
                    }
                }
                for (i = 1; i < 6; i++) {
                    item = self.getWidgetByName("item" + i);
                    item.setVisible(false);
                    var ctrl = uw.UIItemIconCtrl.create(item);
                    self._itemCtrlArr.push(ctrl);
                }
                self._teamExpProgress = self.getWidgetByName("teamExp");
                self._labelGold = self.getWidgetByName("labelGold");
                self._labelLvl = self.getWidgetByName("lvl");
                //赢啦~呵呵
                self._itemsContainer = self.getWidgetByName("items");
                self._herosContainer = self.getWidgetByName("heros");
                self._winPanel.onClickByName("btnContinue", self.menuClose, self);
                self.setData();
            }
            else {
                var title = self._losePanel.getWidgetByName("title");
                title.setVisible(false);
                var titleLose = uw.uiArmFactory.produce(res.cca_ui.fight_failed);
                titleLose.setPosition(title.getPosition());
                titleLose.setZOrder(1);
                this._losePanel.addChild(titleLose);
                if (uw.fightMainCtrl.isTimeOut) {
                    titleLose.play("timeout");
                }
                else {
                    titleLose.play("fail");
                }
                mo.playUIAudio(res.audio_ui.lose);
                self._winPanel.setVisible(false);
                self._losePanel.setVisible(true);
                self._losePanel.setZOrder(999);
                self._losePanel.onClickByName("btnFailContinue", self.menuClose, self);
            }
        };
        __egretProto__.setData = function () {
            var self = this;
            var oldData = self._oldData;
            var newData = self._newData;
            var oldTeamLvl = oldData.teamLvl, oldTeamExpc = oldData.teamExpc, copyId = uw.fightMainCtrl.copyId;
            var copyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            var gold = copyInfo[uw.t_copy_gold], teamExpc = copyInfo[uw.t_copy_teamExpc];
            self.formatByName("teamLvl", oldTeamLvl);
            self.formatByName("labelGold", gold);
            //货币的图标
            var fightType = uw.fightMainCtrl.fightType;
            var matrixTypeKey = uw.c_prop.matrixTypeKey;
            if (fightType == matrixTypeKey.tower) {
                var royal = newData[uw.dsConsts.FightResult.items][uw.c_prop.spItemIdKey.towerPoints];
                self.formatByName("labelGold", royal);
                self.setInfoByName("currencyIcon", res.ui_common.ico_royalcoin_png);
            }
            else if (fightType == matrixTypeKey.arenaA) {
                var honor = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.arenaCfg)[6];
                self.formatByName("labelGold", honor);
                self.setInfoByName("currencyIcon", res.ui_common.ico_honor_png);
            }
            else {
                self.formatByName("labelGold", gold);
            }
            //设置团队经验
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
            var lvlData = mo.getJSONWithFileName(uw.cfg_c_lvl)[oldTeamLvl];
            var teamExpcToLvlUp = lvlData[uw.c_lvl_teamExpcToLvlUp];
            var minTeamExpcOfLvl = lvlData[uw.c_lvl_minTeamExpcOfLvl];
            var maxLvl = 80;
            var arr = [];
            for (var i = 1; i <= maxLvl; ++i) {
                arr.push(c_lvl[i][uw.c_lvl_teamExpcToLvlUp]);
            }
            self._teamExpProgress.setProgressQueueBaseNumber(arr);
            self._teamExpProgress.setCurTargetValue(oldTeamExpc - minTeamExpcOfLvl, oldTeamLvl - 1);
            //            self._teamExpProgress.getInnerLabel().setVisible(false);
            self._teamExpProgress.runProgressQueue(teamExpc, function (newLvl, baseNum, sender) {
                self.formatByName("teamLvl", newLvl + 1);
            }, self);
            self._showRank();
            self._showItems();
            self._showChars();
        };
        __egretProto__._showRank = function () {
            var self = this, star, seq;
            for (var i = 0; i < self._rankArr.length; i++) {
                star = self._rankArr[i];
                star.setVisible(true);
                seq = mo.sequence(mo.delayTime(i * 0.4), mo.callFunc(function () {
                    //音效
                    mo.playUIAudio(117 + i);
                }, self), mo.spawn(mo.scaleTo(0.4, 1).setEase(mo.Ease.sineOut), mo.fadeIn(0.4), mo.rotateBy(0.4, 30)), mo.callFunc(function () {
                    var dispatcher = mo.actionDispatcher, eventType = gEventType.starAction;
                    if (dispatcher.willTrigger(eventType)) {
                        var event = new mo.Event(eventType);
                        event.sender = self;
                        dispatcher.dispatchEvent(event);
                    }
                }, self));
                star.runAction(seq);
            }
        };
        __egretProto__._showChars = function () {
            var size = this._winPanel.getSize();
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
            var maxLvl = uw.userDataCtrl.getHeroExpLimit();
            var arr = [];
            for (var j = 1; j <= maxLvl; ++j) {
                arr.push(c_lvl[j][uw.c_lvl_expcToLvlUp]);
            }
            var ctrl, expBar, oldLvl, oldExpc, self = this, width = 0;
            async.mapLimit(self._charsArr, 1, function (render, index, cb) {
                ctrl = render.ctrl;
                expBar = render.getWidgetByName("expBar");
                var tempId = ctrl.tempId, copyId = uw.fightMainCtrl.copyId;
                var headPath = uw.getRoleIconByTempId(tempId);
                var expc = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId)[uw.t_copy_expc];
                oldLvl = self._oldData.hero[tempId].lvl;
                oldExpc = self._oldData.hero[tempId].expc;
                var lvlData = c_lvl[oldLvl];
                var expcToLvlUp = lvlData[uw.c_lvl_expcToLvlUp];
                var minExpcOfLvl = lvlData[uw.c_lvl_minExpcOfLvl];
                render.setInfoByName("icon", headPath);
                render.transColorByName("border", uw.getRoleColorType(tempId));
                render.formatByName("labelExp", expc);
                render.setInfoByName("lvl", oldLvl);
                expBar.setProgressQueueBaseNumber(arr);
                expBar.setCurTargetValue(oldExpc - minExpcOfLvl, oldLvl - 1);
                expBar.getInnerLabel().setVisible(false);
                expBar.runProgressQueue(expc, function (index, baseNum, sender) {
                    var lvl = index + 1;
                    render.setInfoByName("lvl", lvl);
                    //超出最高等级限制就不提示
                    if (lvl < maxLvl) {
                        var lvlUpNode = render.getWidgetByName("lvlUp");
                        lvlUpNode.setPosition(mo.p(-10, 50));
                        lvlUpNode.setOpacity(100);
                        lvlUpNode.setVisible(true);
                        var moveBy = mo.sequence(mo.moveBy(0.7, mo.p(0, -60)), mo.fadeIn(0.7));
                        lvlUpNode.runAction(moveBy);
                    }
                }, self);
                width += 250;
                cb.call(this);
            }, function () {
                this._herosContainer.setPositionX(size.width / 2 - width / 2 + 40);
            }, self);
        };
        __egretProto__._showItems = function () {
            var width = 0, self = this, itemNum, filePath, borderImg, i = 0, size = this._winPanel.getSize();
            var items = this._newData[uw.dsConsts.FightResult.items], tempId;
            for (var key in items) {
                var ctrl = self._itemCtrlArr[i];
                // TODO: 临时解决掉落物品超过5个的问题
                if (items.hasOwnProperty(key) && ctrl) {
                    tempId = parseInt(key);
                    if (tempId == uw.c_prop.spItemIdKey.honor || tempId == uw.c_prop.spItemIdKey.towerPoints)
                        continue;
                    itemNum = items[key];
                    ctrl.resetByData(tempId);
                    ctrl.showTip(true);
                    ctrl.setCount(itemNum);
                    ctrl.getContainer().setVisible(true);
                    width += 210;
                }
                i++;
            }
            this._itemsContainer.setPositionX(size.width / 2 - width / 2 + 30);
        };
        __egretProto__.menuClose = function () {
            //跳转到副本页面
            uw.fightMainCtrl.exitFight();
        };
        __egretProto__.onEnter = function () {
            var self = this;
            _super.prototype.onEnter.call(this);
            // 检查PVP结果
            var fightType = uw.fightMainCtrl.fightType, matrixTypeKey = uw.c_prop.matrixTypeKey;
            if (fightType == matrixTypeKey.mirrorA || fightType == matrixTypeKey.mirrorPVPA) {
                if (self._isWin && self._newData[uw.dsConsts.FightResult.mirrorEnterState] == 2) {
                    // 如果3秒内不点确定，则自动弹出进高榜询问框
                    self.runAction(mo.sequence(mo.delayTime(3), mo.callFunc(self._showEnterHigherDlg, self)));
                    self._winPanel.onClickByName("btnContinue", self._showEnterHigherDlg, self);
                }
            }
        };
        __egretProto__._showEnterHigherDlg = function () {
            var self = this;
            var fightType = uw.fightMainCtrl.fightType, matrixTypeKey = uw.c_prop.matrixTypeKey;
            if (self._isPopedEnterHeigherDlg)
                return;
            self._isPopedEnterHeigherDlg = true;
            var msg = (fightType == matrixTypeKey.mirrorA) ? uw.id_c_msgCode.ifEnterHigher : uw.id_c_msgCode.winIfEnterHigher;
            var myLayerNum = uw.mirrorDataCtrl.getMyRankType() + 1;
            var fightOpt = uw.mirrorDataCtrl.getFightOpt();
            var targetLayerNum = fightOpt.rankType + 1;
            var myRnkGain = uw.mirrorDataCtrl.getMyRankGain();
            mo.showMsg(msg, targetLayerNum, myLayerNum, myRnkGain, uw.mirrorDataCtrl.getOutRankLeftTimeStr(), function () {
                // 进入更高榜单
                uw.mirrorDataCtrl.enterHigher(function () {
                    self.menuClose();
                    self._isPopedEnterHeigherDlg = null;
                }, self);
            }, self, function () {
                // 保持在原有榜单
                uw.mirrorDataCtrl.stayThere(function () {
                    self.menuClose();
                    self._isPopedEnterHeigherDlg = null;
                }, self);
            }, self);
        };
        FightResultLayer.__className = "FightResultLayer";
        return FightResultLayer;
    })(mo.Dlg);
    uw.FightResultLayer = FightResultLayer;
    FightResultLayer.prototype.__class__ = "uw.FightResultLayer";
})(uw || (uw = {}));

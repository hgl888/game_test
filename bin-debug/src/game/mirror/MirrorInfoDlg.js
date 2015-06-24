/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var MirrorInfoDlg = (function (_super) {
        __extends(MirrorInfoDlg, _super);
        function MirrorInfoDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MirrorInfoDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiMirrorInfoDlg_ui;
            self._info = null;
            self._isSelf = false;
            self._prepareInv = null;
            self._failBoardInv = null;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self._headCtrl = uw.UIHeadIconCtrl.create(self.getWidgetByName(self.__class.PANEL_HEAD));
            self._heroIconMap = {};
            for (var i = 0, li = self.__class.MAX_HEROCOUNT; i < li; i++) {
                var panelName = mo.formatStr(self.__class.HERO_ICON_TEMP, i);
                var contianer = self.getWidgetByName(panelName);
                uiHelper.apTransform(contianer);
                var ctrl = uw.UIHeroIconCtrl.create(contianer);
                self._heroIconMap[panelName] = ctrl;
            }
            self.onClickByName(self.__class.BTN_RETREAT, self._retreat, self);
            self.onClickByName(self.__class.BTN_FIGHT, self._fight, self);
            self.onClickByName(self.__class.BTN_ADJUST, self._onAdjustBtnClick, self);
            // 注册事件监听
            self.registerClassByKey(uw.MirrorDataCtrl, uw.MirrorDataCtrl.ON_FAIL_BOARD, self._onBoardTimeOut);
            self.registerClassByKey(uw.MirrorDataCtrl, uw.MirrorDataCtrl.ON_PVP_START, function () {
                // 解除准备倒计时
                if (self._prepareInv) {
                    if (self._prepareInv)
                        mo.timer.removeInvocation(self._prepareInv);
                    self._prepareInv = null;
                }
            });
            self.registerClassByKey(uw.UserDataCtrl, uw.UserDataCtrl.ON_MATRIX_CHANGED, self._onMatrixChanged);
        };
        __egretProto__._onAdjustBtnClick = function () {
            uw.log("----> _adjustEmbattle");
            var self = this;
            uw.pushSubModule(uw.SubModule.Embattle, uw.c_prop.matrixTypeKey.mirrorD, uw.mirrorPVPCopyId);
        };
        __egretProto__._retreat = function () {
            var self = this;
            // 撤退算战败
            var totalGain = self._calTotalGain();
            mo.showMsg(uw.id_c_msgCode.ifLeaveNow, totalGain, uw.mirrorDataCtrl.getOutRankLeftTimeStr(), function () {
                self.runAction(mo.callFunc(function () {
                    uw.mirrorDataCtrl.giveWay(function () {
                        self.close();
                    }, self);
                }, self));
            }, self);
        };
        __egretProto__._fight = function () {
            var self = this;
            var layerNum = self._info.type + 1;
            var opt = uw.mirrorDataCtrl.getChallengeOpt(self._info);
            // 不能挑战比自己所在层低的玩家
            if (!opt.lessType) {
                return mo.showMsg(uw.id_c_msgCode.cantChallengeLower, layerNum);
            }
            if (!opt.hasSameHeros) {
                var heroTids = opt.notOwnHeros;
                for (var i = 0, li = heroTids.length; i < li; i++) {
                    for (var key in self._heroIconMap) {
                        var ctrl = self._heroIconMap[key];
                        if (ctrl.dataCtrl.tid == heroTids[i]) {
                            var contianer = ctrl.getContainer();
                            contianer.stopAllActions();
                            contianer.runAction(mo.sequence(mo.scaleTo(0.2, 1.1), mo.scaleTo(0.2, 1)));
                        }
                    }
                }
                return mo.showMsg(uw.id_c_msgCode.noSameHero);
            }
            uw.pushSubModule(uw.SubModule.Embattle, uw.c_prop.matrixTypeKey.mirrorPVPA, uw.mirrorPVPCopyId);
        };
        // 计算收益
        __egretProto__._calTotalGain = function () {
            var self = this;
            var info = self._info;
            // 根据防守层不同，单位时间内收获
            var enterTime = Date.newDate(info.enterTime);
            var nowTime = Date.newDate();
            var deltaMin = enterTime.getMinutesBetween(nowTime);
            var totalGain = parseInt(((Math.floor(deltaMin / uw.mirrorRewardTime) + 1) * parseInt(uw.mirrorRewardArr[info.type].toString())).toString());
            return totalGain;
        };
        __egretProto__.resetByData = function (info) {
            var self = this;
            self._info = info;
            var isSelf = uw.userDataCtrl.getId() == info.userId;
            self._headCtrl.resetByData(info.iconId, info.lvl);
            self.setInfoByName(self.__class.LABEL_NAME, info.name);
            self.setVisibleByName(self.__class.PANEL_HISINFO, !isSelf);
            self.setVisibleByName(self.__class.PANEL_MYINFO, isSelf);
            self.setTouchEnabledByName(self.__class.BTN_FIGHT, !isSelf);
            self.setTouchEnabledByName(self.__class.BTN_RETREAT, isSelf);
            self.setTouchEnabledByName(self.__class.BTN_ADJUST, isSelf);
            if (isSelf) {
                //可以查看英雄品阶
                self._setHeroIcons(uw.userDataCtrl.getHeroTempIdByTid(info.tids));
                // 根据防守层不同，单位时间内收获
                self.formatByName(self.__class.LABEL_MYGOLD, uw.mirrorDataCtrl.getMyRankGain());
                // 设置倒计时
                self._failBoardInv = self.countdownToEndTimeByName(self.__class.LABEL_COUNTDOWNTIME, info.endTime, null, null, null);
            }
            else {
                self._setHeroIcons(info.tids);
                // 消耗体力值
                self.formatByName(self.__class.LABEL_STRENGTH, uw.mirrorPVPStrengthCost);
                // 根据防守层不同，单位时间内收获
                var pvpWinGain = uw.mirrorDataCtrl.getTotalGain(info.type, info.enterTime);
                pvpWinGain = parseInt((pvpWinGain * (1 - uw.mirrorRewardPercentOnLose)).toString());
                self.formatByName(self.__class.LABEL_GETGOLD, pvpWinGain);
                // 是否可以挑战
                var opt = uw.mirrorDataCtrl.getChallengeOpt(info);
                if (opt.canChallenge) {
                    // 准备倒计时
                    var endTime = Date.newDate(Date.now());
                    endTime = endTime.addMinutes(1);
                    self.setVisibleByName(self.__class.PANEL_PREPARETIME, true);
                    self._prepareInv = self.countdownToEndTimeByName(self.__class.LABEL_PREPARETIME, endTime, self._onPrePareTimeOut, self);
                    return;
                }
                self.setVisibleByName(self.__class.PANEL_PREPARETIME, false);
            }
        };
        // 设置英雄信息
        __egretProto__._setHeroIcons = function (tids) {
            var self = this;
            for (var j = 0, i = self.__class.MAX_HEROCOUNT - 1; i >= 0; i--) {
                var panelName = mo.formatStr(self.__class.HERO_ICON_TEMP, i);
                var ctrl = self._heroIconMap[panelName];
                var heroId = tids[j++];
                if (heroId) {
                    ctrl.resetByData(heroId);
                }
                else {
                    ctrl.setDefaultUi();
                }
            }
        };
        /**
         * 下榜
         * @private
         */
        __egretProto__._onBoardTimeOut = function () {
            uw.log("countDown Time done!");
            var self = this;
            if (self._embattleLayerOpened && self._isSelf) {
                self._embattleLayer.close();
            }
            self.close();
        };
        /**
         * 准备超时
         * @private
         */
        __egretProto__._onPrePareTimeOut = function () {
            var self = this;
            uw.log("prepare countDown Time done!");
            mo.showMsg(uw.id_c_msgCode.challengeTimeOut, function () {
                if (self._embattleLayerOpened) {
                    self._embattleLayer.close();
                }
                self.close();
            });
        };
        __egretProto__._onClose = function () {
            var self = this;
            if (self._failBoardInv) {
                mo.timer.removeInvocation(self._failBoardInv);
                self._failBoardInv = null;
            }
            if (self._prepareInv) {
                mo.timer.removeInvocation(self._prepareInv);
                self._prepareInv = null;
            }
            _super.prototype._onClose.call(this);
        };
        // 布阵变化是监听
        __egretProto__._onMatrixChanged = function (posDic, tIds) {
            var self = this;
            self._setHeroIcons(tIds);
        };
        MirrorInfoDlg.__className = "MirrorInfoDlg";
        MirrorInfoDlg.PANEL_ITEMLIST = "itemList";
        MirrorInfoDlg.LABEL_TITLE = "label_title";
        MirrorInfoDlg.LABEL_NAME = "name";
        MirrorInfoDlg.PANEL_PREPARETIME = "panel_prepareTime";
        MirrorInfoDlg.LABEL_GETGOLD = "label_getGold";
        MirrorInfoDlg.LABEL_MYGOLD = "label_myGold";
        MirrorInfoDlg.LABEL_STRENGTH = "label_strength";
        MirrorInfoDlg.LABEL_COUNTDOWNTIME = "label_countDownTime";
        MirrorInfoDlg.LABEL_PREPARETIME = "label_prepareTime";
        MirrorInfoDlg.PANEL_HEAD = "panel_head";
        MirrorInfoDlg.BTN_FIGHT = "btn_fight"; // 挑战
        MirrorInfoDlg.BTN_RETREAT = "btn_retreat"; //撤退
        MirrorInfoDlg.BTN_ADJUST = "btn_adjust"; // 调整阵型
        MirrorInfoDlg.PANEL_HISINFO = "panel_hisInfo";
        MirrorInfoDlg.PANEL_MYINFO = "panel_myInfo";
        MirrorInfoDlg.HERO_ICON_TEMP = "heroIcon%s";
        MirrorInfoDlg.MAX_HEROCOUNT = 5;
        return MirrorInfoDlg;
    })(mo.UIModalLayer);
    uw.MirrorInfoDlg = MirrorInfoDlg;
    MirrorInfoDlg.prototype.__class__ = "uw.MirrorInfoDlg";
})(uw || (uw = {}));

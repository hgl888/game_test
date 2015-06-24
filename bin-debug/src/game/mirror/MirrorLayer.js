/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var MirrorLayer = (function (_super) {
        __extends(MirrorLayer, _super);
        function MirrorLayer() {
            _super.apply(this, arguments);
            this._enterType = null;
            this._autoIntoType = null;
            this._chooseDlg = null;
            this._fightResult = null;
            this._lastFightCopyId = null;
            this._enterHigher = null;
            this._newOpenedCopyId = null;
        }
        var __egretProto__ = MirrorLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiMirrorLayer_ui;
        };
        __egretProto__.init = function (autoIntoType) {
            _super.prototype.init.call(this);
            var self = this;
            self._autoIntoType = autoIntoType;
            //PVP
            self.onClickByName(self.__class.PANEL_PVP, self.onGotoPVPClick, self);
            self.onClickByName(self.__class.BTN_PVP, self.onGotoPVPClick, self);
            //PVE
            self.onClickByName(self.__class.PANEL_PVE, self._gotoPVE, self);
            self.onClickByName(self.__class.BTN_PVE, self._gotoPVE, self);
            self.onClickByName("touchArea", self._help, self);
            self.onClickByName("btnHelp", self._help, self);
            self.enableStrokeByName(self.__class.LABEL_INFO, cc.c3b(18, 18, 18), 3);
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.FIXED_WIDTH);
            self.setAdaptiveScaleByName("blueIce", mo.RESOLUTION_POLICY.SHOW_ALL);
            self.setAdaptiveScaleByName("redIce", mo.RESOLUTION_POLICY.SHOW_ALL);
            //监听
            self.registerClassByKey(uw.FightMainCtrl, uw.FightMainCtrl.ON_SHOW_RESULT, self._onFightResult);
            self.registerClassByKey(uw.CopyProgressDataCtrl, uw.CopyProgressDataCtrl.ON_NEW_COPY_OPENED, self._newCopyOpened);
            self.registerClassByKey(uw.MirrorDataCtrl, uw.MirrorDataCtrl.ON_ENTER_HIGHER, self._onEnterHigher);
        };
        /**
         * 进入更高榜
         * @param higherType
         * @private
         */
        __egretProto__._onEnterHigher = function (higherType) {
            var self = this;
            self._enterHigher = true;
        };
        __egretProto__._onFightResult = function (resultData) {
            var self = this;
            self._fightResult = resultData;
        };
        __egretProto__._newCopyOpened = function (newCopyId) {
            var self = this;
            self._newOpenedCopyId = newCopyId;
        };
        __egretProto__.setLastFightCopyId = function (copyId) {
            this._lastFightCopyId = copyId;
        };
        __egretProto__._initUI = function () {
            var self = this;
            var progressCtrl = uw.userDataCtrl.getCopyProgress(uw.c_prop.pCopyIdKey.mirror);
            // 剩余次数
            var leftCount = uw.mirrorPVEFreeCount - progressCtrl.getTodayCount(null, null, null);
            leftCount = leftCount < 0 ? 0 : leftCount;
            if (leftCount) {
                var lastTime = progressCtrl.pTime;
                // 显示冷却时间
                var date = Date.newDate();
                if (lastTime.isAfter(date)) {
                    self.setInfoByName(self.__class.LABEL_INFONAME, "冷却中：");
                    self.countdownToEndTimeByName(self.__class.LABEL_INFO, lastTime, function () {
                        self.setInfoByName(self.__class.LABEL_INFONAME, "剩余次数：");
                        self.setInfoByName(self.__class.LABEL_INFO, leftCount);
                    }, self);
                }
                else {
                    self.setInfoByName(self.__class.LABEL_INFONAME, "剩余次数：");
                    self.setInfoByName(self.__class.LABEL_INFO, leftCount);
                }
            }
            else {
                self.setInfoByName(self.__class.LABEL_INFONAME, "今日次数已用完");
                self.setVisibleByName(self.__class.LABEL_INFO, false);
            }
        };
        __egretProto__.showCopyInfoLayer = function (copyId) {
            // 进入副本信息界面
            uw.pushSubModule(uw.SubModule.CopyInfo, copyId);
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            var self = this;
            self._initUI();
            if (self._enterType == self.__class.TYPE_PVE && self._fightResult) {
                var isWin = !!self._fightResult.newData;
                // 战胜了需要关闭难度选择框
                if (isWin) {
                    self._chooseDlg.close();
                    self._chooseDlg = null;
                    // 初进榜
                    if (1 == self._fightResult.newData[uw.dsConsts.FightResult.mirrorEnterState]) {
                        var layerNum = uw.mirrorDataCtrl.getLayerTypeByCopyId(self._lastFightCopyId) + 1;
                        mo.showMsg(uw.id_c_msgCode.haveQuotaEnterSelf, layerNum, function () {
                            self._gotoPVP(self._lastFightCopyId);
                        }, self);
                    }
                    // 换榜
                    if (2 == self._fightResult.newData[uw.dsConsts.FightResult.mirrorEnterState] && self._enterHigher) {
                        self._gotoPVP(self._lastFightCopyId);
                    }
                }
                self._fightResult = null;
                // 激活防守挑战权限
                if (self._newOpenedCopyId) {
                    var progressCtrl = uw.userDataCtrl.getCopyProgress(uw.c_prop.pCopyIdKey.mirror);
                    // 新开启副本ID之前的一个副本打通了
                    var type = progressCtrl.getIndexOfCopyId(self._newOpenedCopyId - 1);
                    var layerNum = type + 1;
                    mo.showMsg(uw.id_c_msgCode.openChallengePermission, layerNum);
                    self._newOpenedCopyId = null;
                }
            }
            // 如果有指定tabName则直接进入该界面
            if (self._autoIntoType) {
                switch (self._enterType) {
                    case self.__class.TYPE_PVE:
                        self._gotoPVE();
                        break;
                    case self.__class.TYPE_PVP:
                        self._gotoPVP(null);
                        break;
                }
                // 防止从二次进入
                self._autoIntoType = null;
            }
        };
        __egretProto__.onExit = function () {
            var self = this;
            _super.prototype.onExit.call(this);
            self._fightResult = null;
        };
        __egretProto__._gotoPVE = function () {
            var self = this;
            var progressCtrl = uw.userDataCtrl.getCopyProgress(uw.c_prop.pCopyIdKey.mirror);
            // 检查挑战次数
            if (progressCtrl.getTodayCount(null, null, null) >= uw.mirrorPVEFreeCount) {
                return mo.showMsg(uw.id_c_msgCode.noTimesToday);
            }
            // 检查是否在冷却中
            var isCd = false, cdMS = 0; //是否cd以及cd时间（毫秒）
            var lastTime = progressCtrl.pTime;
            if (lastTime) {
                var date = Date.newDate();
                cdMS = lastTime.getTime() - date.getTime();
                isCd = cdMS > 0;
            }
            if (isCd) {
                return mo.showMsg(uw.id_c_msgCode.cdNoEnd);
            }
            uw.mirrorDataCtrl.getMyRank(function () {
                var dlg = self._chooseDlg = uw.MirrorChooseDlg.create(uw.MirrorChooseDlg.TYPE_PVE);
                dlg.setDelegate(self);
                dlg.onClose(function () {
                    self._chooseDlg = null;
                }, self);
                dlg.show(true);
                self._enterType = self.__class.TYPE_PVE;
            }, self);
        };
        __egretProto__.onGotoPVPClick = function () {
            this._gotoPVP(null);
        };
        __egretProto__._gotoPVP = function (copyId) {
            var self = this;
            // 检查是否打过PVE了
            var progressCtrl = uw.userDataCtrl.getCopyProgress(uw.c_prop.pCopyIdKey.mirror);
            if (!progressCtrl.isAnyCopyPassed()) {
                return mo.showMsg(uw.id_c_msgCode.noPassPve);
            }
            uw.mirrorDataCtrl.getMyRank(function () {
                var dlg = self._chooseDlg = uw.MirrorChooseDlg.create(uw.MirrorChooseDlg.TYPE_PVP);
                dlg.setDelegate(self);
                dlg.onClose(function () {
                    self._chooseDlg = null;
                }, self);
                dlg.show(true);
                if (copyId) {
                    dlg.goPVP(copyId);
                }
                self._enterType = self.__class.TYPE_PVP;
            }, self);
        };
        __egretProto__._help = function () {
            var self = this;
            var layer = uw.UIHelpLayer.create(res.uiMirrorHelpLayer_ui);
            layer.onShowEvent(function (layer) {
                layer.formatByName("label_pvpWaitingTime", uw.mirrorPVPWaitingTime + "分钟");
                layer.formatByName("label_changRankTime", uw.mirrorChangeRankWaitingTime + "分钟");
            }, self);
            layer.show();
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            if (self._chooseDlg) {
                self._chooseDlg.close();
            }
        };
        MirrorLayer.__className = "MirrorLayer";
        MirrorLayer.LABEL_INFONAME = "label_infoName";
        MirrorLayer.LABEL_INFO = "label_info";
        MirrorLayer.PANEL_PVE = "panel_pve";
        MirrorLayer.PANEL_PVP = "panel_pvp";
        MirrorLayer.BTN_PVE = "btnPVE";
        MirrorLayer.BTN_PVP = "btnPVP";
        MirrorLayer.TYPE_PVE = "type_pve";
        MirrorLayer.TYPE_PVP = "type_pvp";
        return MirrorLayer;
    })(mo.DisplayLayer);
    uw.MirrorLayer = MirrorLayer;
    MirrorLayer.prototype.__class__ = "uw.MirrorLayer";
})(uw || (uw = {}));

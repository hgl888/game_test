/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var VipLayer = (function (_super) {
        __extends(VipLayer, _super);
        function VipLayer() {
            _super.apply(this, arguments);
            this._title = null;
            this._vipPageView = null;
            this._btnSwitch = null;
            this._btnPre = null;
            this._btnNext = null;
        }
        var __egretProto__ = VipLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiVipLayer_ui;
            self._closeWidgetName = "btnClose";
            self._isVipPanel = false;
            self._closeOutSide = false;
        };
        __egretProto__.init = function (type) {
            var self = this;
            _super.prototype.init.call(this);
            self._isVipPanel = type == uw.PAYMENT_TYPE.VIP;
            self._rechargeJsonInfo = mo.getJSONWithFileName(uw.cfg_c_recharge);
            self._vipJsonInfo = mo.getJSONWithFileName(uw.cfg_c_vip);
            self._title = self.getWidgetByName(VipLayer.LABEL_TITLE);
            self._vipPageView = self.getWidgetByName(VipLayer.PAGE_VIEW_VIP);
            self._btnSwitch = self.getWidgetByName(VipLayer.BTN_SWITCH);
            self._btnSwitch.onClick(self.switchMode, self);
            self._btnPre = self.getWidgetByName(VipLayer.BTN_PRE);
            self._btnNext = self.getWidgetByName(VipLayer.BTN_NEXT);
            self._btnPre.onClick(self.menuShowPreVip, self);
            self._btnNext.onClick(self.menuShowNextVip, self);
            self.enableStrokeByName(VipLayer.LABEL_CHARGE_AGAIN, mo.c3b(0, 0, 0), 3);
            self.enableStrokeByName(VipLayer.LABEL_LEVEL_UP, mo.c3b(0, 0, 0), 3);
            self.enableStrokeByName(VipLayer.LABEL_DIAMOND_COUNT, mo.c3b(0, 0, 0), 3);
            uw.setDiamondColor(self, VipLayer.LABEL_DIAMOND_COUNT);
            self.setVipInfo();
            self.showDetailInfo();
            //监听神秘商店出现
            self.registerClassByKey(uw.ShopDataCtrl, uw.ShopDataCtrl.ON_SECRET_SHOP_APPEAR, function (shopFlag) {
                //此时肯定是神秘商店1永久出现了
                var dlg = uw.SecretShopAppearDlg.create(4);
                dlg.show();
            });
        };
        __egretProto__.setVipInfo = function () {
            var self = this;
            var vipLevel = uw.userDataCtrl.getVip(), vipScore = uw.userDataCtrl.getVipScore();
            var nextVipLevel = vipLevel + 1;
            var arr = [];
            for (var key in self._vipJsonInfo) {
                var index = parseInt(key);
                var score = self._vipJsonInfo[key][uw.c_vip_score];
                if (index != 0) {
                    var preScore = self._vipJsonInfo[index - 1][uw.c_vip_score];
                    var delta = score - preScore;
                    arr.push(delta);
                }
            }
            var progress = self.getWidgetByName(VipLayer.LOADING_BAR_VIP_EXP);
            progress.setProgressQueueBaseNumber(arr, null);
            progress.loadLightTexture(res.ui_common.bar_light1_png);
            if (self._vipJsonInfo[nextVipLevel]) {
                self.setVisibleByName(VipLayer.PANEL_NEXT_LEVEL_INFO_BOX, true);
                self.setInfoByName(VipLayer.NEXT_VIP_LVL, nextVipLevel);
                var nextLevelScore = self._vipJsonInfo[nextVipLevel][uw.c_vip_score];
                self.setInfoByName(VipLayer.LABEL_DIAMOND_COUNT, nextLevelScore - vipScore);
            }
            else {
                self.setVisibleByName(VipLayer.PANEL_NEXT_LEVEL_INFO_BOX, false);
            }
            var curLevelScore = self._vipJsonInfo[vipLevel][uw.c_vip_score];
            progress.setCurTargetValue(vipScore - curLevelScore, vipLevel);
            self.setInfoByName(VipLayer.CUR_VIP_LVL, vipLevel);
        };
        __egretProto__.onBuyDiamond = function (buySucc, oldVipLevel, score) {
            var self = this;
            if (!buySucc) {
                uw.log("---->购买失败");
                return;
            }
            var progress = self.getWidgetByName(VipLayer.LOADING_BAR_VIP_EXP);
            progress.runProgressQueue(score, function (index, baseNum, sender) {
                var vipLevel = index;
                var baseNumArrLength = sender.getProgressQueueBaseNumber().length;
                if (vipLevel >= baseNumArrLength) {
                    self.setVisibleByName(VipLayer.PANEL_NEXT_LEVEL_INFO_BOX, false);
                    self.setInfoByName(VipLayer.CUR_VIP_LVL, vipLevel);
                }
                else {
                    var nextVipLevel = vipLevel + 1;
                    self.setVisibleByName(VipLayer.PANEL_NEXT_LEVEL_INFO_BOX, true);
                    self.setInfoByName(VipLayer.NEXT_VIP_LVL, nextVipLevel);
                    self.setInfoByName(VipLayer.CUR_VIP_LVL, vipLevel);
                }
            }, self);
            var vipScore = uw.userDataCtrl.getVipScore(), vipLevel = uw.userDataCtrl.getVip();
            var jsonInfo = self._vipJsonInfo[vipLevel + 1], nextLevelScore;
            if (jsonInfo) {
                nextLevelScore = jsonInfo[uw.c_vip_score];
                if (vipScore < nextLevelScore) {
                    self.setInfoByName(VipLayer.LABEL_DIAMOND_COUNT, nextLevelScore - vipScore);
                }
            }
            else {
                self.setInfoByName(VipLayer.LABEL_DIAMOND_COUNT, 0);
            }
            var length = Object.keys(self._rechargeJsonInfo).length;
            self._chargeGridView.setTotalCount(length);
        };
        __egretProto__.menuShowPreVip = function () {
            this._vipPageViewCtrl.prePage();
        };
        __egretProto__.menuShowNextVip = function () {
            this._vipPageViewCtrl.nextPage();
        };
        __egretProto__.switchMode = function () {
            var self = this;
            self._isVipPanel = !self._isVipPanel;
            self.showDetailInfo();
        };
        __egretProto__.showDetailInfo = function () {
            var self = this;
            if (self._isVipPanel) {
                self._title.setBright(false);
                self._btnSwitch.setBright(false);
                self.setVisibleByName(VipLayer.PANEL_VIP_DETAIL_INFO, true);
                self.setVisibleByName(VipLayer.PANEL_CHARGE_LIST, false);
                self._btnPre.setTouchEnabled(true);
                self._btnNext.setTouchEnabled(true);
                if (self._chargeGridView) {
                    self._chargeGridView.removeFromParent(true);
                    self._chargeGridView.doDtor();
                    self._chargeGridView = null;
                }
                self._createVipPageView();
            }
            else {
                self._title.setBright(true);
                self._btnSwitch.setBright(true);
                self.setVisibleByName(VipLayer.PANEL_VIP_DETAIL_INFO, false);
                self.setVisibleByName(VipLayer.PANEL_CHARGE_LIST, true);
                self._btnPre.setTouchEnabled(false);
                self._btnNext.setTouchEnabled(false);
                self._createChargeGridView();
            }
        };
        __egretProto__._createChargeGridView = function () {
            var self = this;
            if (!self._chargeGridView) {
                self._chargeGridView = self._createGridScrollView(VipLayer.PANEL_CHARGE_LIST, uw.VipChargeItemCell, 2, this._onChargeCellDataSource);
                var length = Object.keys(self._rechargeJsonInfo).length;
                this._chargeGridView.setTotalCount(length);
            }
        };
        __egretProto__._createVipPageView = function () {
            var self = this;
            if (!self._vipPageViewCtrl) {
                self._vipPageViewCtrl = uw.VipPageViewController.create(self._vipPageView);
                self._vipPageViewCtrl.setTouchEnabled(false);
                var vipInfo = mo.getJSONWithFileName(uw.cfg_c_vip);
                self._vipPageViewCtrl.setItemJsonPath(res.uiVipDetailItemCell_ui);
                self._vipPageViewCtrl.resetByData(vipInfo);
                var curPage = uw.userDataCtrl.getVip();
                self._vipPageViewCtrl.addPageEnterEvent(self.updatePageNumber, self);
                mo.nextTick(function () {
                    self._vipPageViewCtrl.scrollToPage(curPage);
                }, self);
                var act = mo.repeatForever(mo.sequence(mo.moveBy(1, mo.p(-50, 0)), mo.moveBy(1, mo.p(50, 0))));
                self._btnPre.runAction(act);
                act = mo.repeatForever(mo.sequence(mo.moveBy(1, mo.p(50, 0)), mo.moveBy(1, mo.p(-50, 0))));
                self._btnNext.runAction(act);
            }
        };
        __egretProto__.updatePageNumber = function (ctrl) {
            var self = this;
            var curPageIndex = ctrl.getCurPageIndex();
            var totalPageCount = ctrl.getPagesCount();
            if (curPageIndex == 0) {
                self._btnPre.setVisible(false);
                self._btnPre.setTouchEnabled(false);
                self._btnNext.setInfoByName(VipLayer.INFO_VIP_LVL, curPageIndex + 1);
            }
            else if (curPageIndex == totalPageCount - 1) {
                self._btnNext.setVisible(false);
                self._btnNext.setTouchEnabled(false);
                self._btnPre.setInfoByName(VipLayer.INFO_VIP_LVL, curPageIndex - 1);
            }
            else {
                self._btnPre.setVisible(true);
                self._btnPre.setTouchEnabled(true);
                self._btnNext.setVisible(true);
                self._btnNext.setTouchEnabled(true);
                self._btnPre.setInfoByName(VipLayer.INFO_VIP_LVL, curPageIndex - 1);
                self._btnNext.setInfoByName(VipLayer.INFO_VIP_LVL, curPageIndex + 1);
            }
        };
        __egretProto__._onChargeCellDataSource = function (cell, index) {
            var data = this._rechargeJsonInfo[index + 1];
            cell.resetByData(data);
            if (!cell.listenerInited) {
                cell.listenerInited = true;
                cell.onClick(this._onCellClick, this);
            }
        };
        __egretProto__._onCellClick = function (cell) {
            var self = this;
            uw.rechargeDataCtrl.recharge(cell.rechargeId, self.onBuyDiamond, self);
        };
        VipLayer.__className = "VipLayer";
        VipLayer.BTN_SWITCH = "btnSwitch";
        VipLayer.LABEL_TITLE = "title";
        VipLayer.PANEL_VIP_DETAIL_INFO = "vipDetailInfo";
        VipLayer.PAGE_VIEW_VIP = "vipPageView";
        VipLayer.PANEL_CHARGE_LIST = "chargeList";
        VipLayer.CUR_VIP_LVL = "curVipLvl";
        VipLayer.NEXT_VIP_LVL = "nextVipLvl";
        VipLayer.LABEL_DIAMOND_COUNT = "diamondCount";
        VipLayer.LOADING_BAR_VIP_EXP = "vipExp";
        VipLayer.BTN_PRE = "btnLeft";
        VipLayer.BTN_NEXT = "btnRight";
        VipLayer.INFO_VIP_LVL = "infoVipLvl";
        VipLayer.LABEL_CHARGE_AGAIN = "labelChargeAgain";
        VipLayer.LABEL_LEVEL_UP = "labelLevelup";
        VipLayer.PANEL_NEXT_LEVEL_INFO_BOX = "nextLevelInfoBox";
        return VipLayer;
    })(mo.UIModalLayer);
    uw.VipLayer = VipLayer;
    VipLayer.prototype.__class__ = "uw.VipLayer";
})(uw || (uw = {}));

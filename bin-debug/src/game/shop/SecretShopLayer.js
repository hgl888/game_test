/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SecretShopLayer = (function (_super) {
        __extends(SecretShopLayer, _super);
        function SecretShopLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SecretShopLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiSecretShopLayer_ui;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.FIXED_WIDTH);
            self.onClickByName(self.__class.BTN_REFRESH, self.menuRefresh, self);
            self.registerClassByKey(uw.ShopDataCtrl, uw.ShopDataCtrl.ON_SHOP_ITEM_SOLD, self._refreshShop);
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.gold.toString(), self._refreshShop);
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.diamond.toString(), self._refreshShop);
        };
        __egretProto__.onEnter = function () {
            var self = this;
            _super.prototype.onEnter.call(this);
            if (!self._gridScrollView) {
                self._gridScrollView = self._createGridScrollView(self.__class.PANEL_SHOP_LIST, uw.ShopItemCell, 3, self._onItemCellDataSource, true);
                self._refreshUI();
            }
        };
        /** 刷新界面 **/
        __egretProto__._refreshUI = function () {
            var self = this;
            var hasSecret1, hasSecret2;
            hasSecret1 = uw.shopDataCtrl.secretShop1Exist();
            hasSecret2 = uw.shopDataCtrl.secretShop2Exist();
            if (hasSecret1 && hasSecret2) {
                // 初始化tab页控制器
                var tabList = uw.TabListCtrl.create(self.getWidgetByName(self.__class.TAB_CONTAINER));
                //                    tabList.setPointerOffsetX(-20);
                tabList.onTabClicked(self._onTabClicked, self);
                var tabs = [
                    { name: self.__class.TAB_01, title: uw.ShopDataCtrl.TRADER_01 },
                    { name: self.__class.TAB_02, title: uw.ShopDataCtrl.TRADER_02 }
                ];
                tabList.resetByData(tabs);
                tabList.movePointerByName(self.__class.TAB_01);
            }
            else {
                // 移除Tab页
                var tabContainer = self.getWidgetByName(self.__class.TAB_CONTAINER);
                if (tabContainer) {
                    self.getWidgetByName("root").removeChild(tabContainer);
                }
                var shopPanel = self.getWidgetByName(self.__class.PANEL_SHOP);
                var layoutP = shopPanel.getLayoutParameter(mo.LayoutParameterType.relative);
                layoutP.setAlign(mo.RelativeAlign.alignParentBottomCenterHorizontal);
                shopPanel.setLayoutParameter(layoutP);
                if (hasSecret1) {
                    self.changeToSM1();
                }
                else if (hasSecret2) {
                    self.changeToSM2();
                }
                else {
                    uw.log("商人都走了--->");
                    mo.sceneMgr.popScene();
                }
            }
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var self = this;
            var info = self._data[index];
            cell.resetByData(info);
            if (!cell.listenerInited) {
                cell.listenerInited = true;
                cell.onClick(self._onCellClick, self);
            }
        };
        __egretProto__._onCellClick = function (cell) {
            var info = cell.getInfo();
            if (!info.isSold) {
                uw.ShopItemDetail.getInstance().resetByData(info).show();
            }
        };
        __egretProto__._initWithData = function (data) {
            var self = this;
            self._data = data;
            self._gridScrollView.setTotalCount(self._data.length);
            self._gridScrollView.jumpToTop();
        };
        __egretProto__._refreshShop = function () {
            this._gridScrollView.refreshData();
        };
        __egretProto__._onTabClicked = function (sender) {
            var self = this;
            var name = sender.getName();
            switch (name) {
                case self.__class.TAB_01:
                    self.changeToSM1();
                    break;
                case self.__class.TAB_02:
                    self.changeToSM2();
                    break;
            }
            return true;
        };
        __egretProto__.changeToSM1 = function () {
            var self = this;
            self.setInfoByName(self.__class.IMG_SHOPNAME, self.__class.IMG_SM1);
            self._initShop(uw.c_prop.shopTypeKey.secret1);
            self.showRefreshInfo();
        };
        __egretProto__.changeToSM2 = function () {
            var self = this;
            self.setInfoByName(self.__class.IMG_SHOPNAME, self.__class.IMG_SM2);
            self._initShop(uw.c_prop.shopTypeKey.secret2);
            self.showRefreshInfo();
        };
        __egretProto__._initShop = function (type) {
            var self = this;
            self._curType = type;
            uw.shopDataCtrl.getItems(self._curType, function (items) {
                self._initWithData(items);
            });
        };
        __egretProto__.showRefreshInfo = function () {
            var self = this;
            // 是神秘商店1且已经达到可以常在的VIP等级
            var showAutoRefreshTime = uw.shopDataCtrl.secretShop1OffenIn() && self._curType == uw.c_prop.shopTypeKey.secret1;
            self.setVisibleByName(self.__class.PANEL_AUTOREFRESH, showAutoRefreshTime);
            self.setVisibleByName(self.__class.PANEL_COUNTDOWN, !showAutoRefreshTime);
            if (showAutoRefreshTime) {
                var nextTime = uw.shopDataCtrl.getNextRefreshTime(self._curType);
                self.setInfoByName(self.__class.LABEL_AUTO_REFRESH_TIME, nextTime.toFormat("HH24:MI"));
            }
            else {
                if (self._countDownInv) {
                    mo.timer.removeInvocation(self._countDownInv);
                    self._countDownInv = null;
                }
                var disappearTime = uw.shopDataCtrl.getDisappearTime(self._curType);
                self._countDownInv = self.countdownToEndTimeByName(self.__class.LABEL_COUNTDOWNTIME, disappearTime, self._onTraderLeft, self);
            }
        };
        __egretProto__._onTraderLeft = function () {
            var self = this;
            uw.log("神秘商人消失了--> ", self._curType);
            var name = self._curType == uw.c_prop.shopTypeKey.secret1 ? uw.ShopDataCtrl.TRADER_01 : uw.ShopDataCtrl.TRADER_02;
            uw.shopDataCtrl.traderStatus[self._curType] = false;
            mo.showMsg(uw.id_c_msgCode.traderLeft, name, function () {
                self._refreshUI();
            });
        };
        __egretProto__.menuRefresh = function () {
            var self = this;
            uw.shopDataCtrl.refresh(self._curType, this._initWithData, this);
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            if (self._countDownInv) {
                mo.timer.removeInvocation(self._countDownInv);
                self._countDownInv = null;
            }
            uw.ShopItemDetail.purgeInstance();
        };
        SecretShopLayer.__className = "SecretShopLayer";
        SecretShopLayer.TAB_CONTAINER = "tab_container";
        SecretShopLayer.TAB_01 = "tab_01";
        SecretShopLayer.TAB_02 = "tab_02";
        SecretShopLayer.LABEL_TITLE = "label_title";
        SecretShopLayer.IMG_SHOPNAME = "img_shopName";
        SecretShopLayer.IMG_SM1 = res.ui_secratshop.wrd_title_png;
        SecretShopLayer.IMG_SM2 = res.ui_secratshop.wrd_title2_png;
        SecretShopLayer.PANEL_SHOP = "panel_shop";
        SecretShopLayer.PANEL_SHOP_LIST = "shopList";
        SecretShopLayer.PANEL_AUTOREFRESH = "panel_autoRefresh";
        SecretShopLayer.PANEL_COUNTDOWN = "panel_countDown";
        SecretShopLayer.LABEL_AUTO_REFRESH_TIME = "autoRefreshTime"; //刷新时间点
        SecretShopLayer.LABEL_COUNTDOWNTIME = "countDownTime"; //商人离开倒计时时间
        SecretShopLayer.BTN_REFRESH = "btnRefresh"; //刷新按键
        return SecretShopLayer;
    })(mo.DisplayLayer);
    uw.SecretShopLayer = SecretShopLayer;
    SecretShopLayer.prototype.__class__ = "uw.SecretShopLayer";
})(uw || (uw = {}));

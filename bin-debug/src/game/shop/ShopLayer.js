/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ShopLayer = (function (_super) {
        __extends(ShopLayer, _super);
        function ShopLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ShopLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiShopLayer_ui;
        };
        __egretProto__.init = function (type) {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            self._type = type || uw.c_prop.shopTypeKey.normal;
            self.onClickByName(clazz.BTN_REFRESH, self.menuRefresh, self);
            self._gridScrollView = self._createGridScrollView(clazz.PANEL_SHOP_LIST, uw.ShopItemCell, 3, self._onItemCellDataSource);
            // 不可滚动
            self._gridScrollView.scrollEnabled = false;
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.EXACT_FIT);
            // 设置监听
            self.registerClassByKey(uw.ShopDataCtrl, uw.ShopDataCtrl.ON_SHOP_ITEM_SOLD, self._refreshShop);
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.gold.toString(), self._refreshShop);
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.diamond.toString(), self._refreshShop);
        };
        __egretProto__._refreshShop = function () {
            var self = this;
            self._gridScrollView.refreshData();
        };
        __egretProto__.onEnter = function () {
            var self = this;
            _super.prototype.onEnter.call(this);
            // 获得可购买的物品
            uw.shopDataCtrl.getItems(self._type, function (items) {
                self._initWithData(items);
            }, self);
            // 监听服务器刷新
            uw.shopDataCtrl.addTrigger(self._type, function () {
                uw.shopDataCtrl.getItems(self._type, function (items) {
                    self._initWithData(items);
                }, self);
            }, self);
        };
        __egretProto__.onExit = function () {
            var self = this;
            _super.prototype.onExit.call(this);
            uw.shopDataCtrl.removeAllTriggers();
        };
        __egretProto__._initWithData = function (data) {
            var self = this;
            self._data = data;
            self._gridScrollView.setTotalCount(this._data.length);
            self._gridScrollView.jumpToTop();
            var nextTime = uw.shopDataCtrl.getNextRefreshTime(self._type);
            self.setInfoByName(self.__class.LABEL_AUTO_REFRESH_TIME, nextTime.toFormat("HH24:MI"));
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var self = this;
            var info = self._data[index];
            info.index = index;
            cell.resetByData(info);
            if (!cell.listenerInited) {
                cell.listenerInited = true;
                cell.onClick(self._onCellClick, self);
            }
        };
        __egretProto__._onCellClick = function (cell, sender) {
            var info = cell.getInfo();
            if (!info.isSold) {
                uw.ShopItemDetail.getInstance().resetByData(info).show();
            }
        };
        __egretProto__.menuRefresh = function () {
            var self = this;
            uw.shopDataCtrl.refresh(self._type, this._initWithData, this);
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            uw.ShopItemDetail.purgeInstance();
        };
        ShopLayer.__className = "ShopLayer";
        ShopLayer.LABEL_AUTO_REFRESH_TIME = "autoRefreshTime"; //刷新时间点
        ShopLayer.BTN_REFRESH = "btnRefresh"; //刷新按键
        ShopLayer.PANEL_SHOP_LIST = "shopList"; //物品列表
        return ShopLayer;
    })(mo.DisplayLayer);
    uw.ShopLayer = ShopLayer;
    ShopLayer.prototype.__class__ = "uw.ShopLayer";
})(uw || (uw = {}));

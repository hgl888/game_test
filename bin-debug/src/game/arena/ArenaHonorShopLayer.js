/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ArenaHonorShopLayer = (function (_super) {
        __extends(ArenaHonorShopLayer, _super);
        function ArenaHonorShopLayer() {
            _super.call(this);
        }
        var __egretProto__ = ArenaHonorShopLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiArenaHonorShopLayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self.onClickByName("btnRefresh", self.menuRefresh, self);
            self.setInfoByName("autoRefreshTime", uw.arenaDataCtrl.time2ResetShop);
            self._gridScrollView = self._createGridScrollView("shopList", uw.ArenaHonorShopItemCell, 3, self._onItemCellDataSource);
            self._gridScrollView.scrollEnabled = false;
            self.registerClassByKey(uw.ShopDataCtrl, uw.ShopDataCtrl.ON_SHOP_ITEM_SOLD, self._refreshShop);
            self._refreshShop();
        };
        __egretProto__._refreshShop = function () {
            var self = this;
            self.setInfoByName("labelHonor", uw.userDataCtrl.getHonor());
            uw.shopDataCtrl.getItems(uw.c_prop.shopTypeKey.arena, self._initWithData, self);
        };
        __egretProto__._initWithData = function (data) {
            this._data = data;
            this.refreshGrid();
        };
        __egretProto__.refreshGrid = function () {
            this._gridScrollView.setTotalCount(this._data.length);
            this._gridScrollView.jumpToTop();
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var info = this._data[index];
            cell.resetByData(info);
            if (!cell.listenerInited) {
                cell.listenerInited = true;
                cell.setTouchEnabled(true);
                cell.onClick(this._onCellClick, this);
            }
        };
        __egretProto__._onCellClick = function (cell, sender) {
            var info = cell.getInfo();
            if (!info.isSold) {
                uw.ArenaHonorShopItemDetail.getInstance().resetByData(info).show();
            }
        };
        __egretProto__.menuRefresh = function () {
            uw.arenaDataCtrl.resetHonorShop(this._initWithData, this);
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            uw.ArenaHonorShopItemDetail.purgeInstance();
        };
        ArenaHonorShopLayer.__className = "ArenaHonorShopLayer";
        return ArenaHonorShopLayer;
    })(mo.UIModalLayer);
    uw.ArenaHonorShopLayer = ArenaHonorShopLayer;
    ArenaHonorShopLayer.prototype.__class__ = "uw.ArenaHonorShopLayer";
})(uw || (uw = {}));

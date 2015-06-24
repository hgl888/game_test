/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var TowerShopLayer = (function (_super) {
        __extends(TowerShopLayer, _super);
        function TowerShopLayer() {
            _super.call(this);
        }
        var __egretProto__ = TowerShopLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiTowerShopLayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            this.onClickByName("btnClose", this.close, this);
            self._gridView = self._createGridScrollView("shopList", uw.TowerShopItem, 3, this._onCellDataSource);
            self.registerClassByKey(uw.ShopDataCtrl, uw.ShopDataCtrl.ON_SHOP_ITEM_SOLD, self.refreshShop);
            self.refreshShop();
        };
        __egretProto__.refreshShop = function () {
            var self = this;
            self.setInfoByName("labelHonor", uw.userDataCtrl.getTowerPoints());
            uw.shopDataCtrl.getItems(uw.c_prop.shopTypeKey.tower, function (data) {
                this._data = data;
                this._gridView.setTotalCount(this._data.length);
            }, this);
        };
        __egretProto__._onCellDataSource = function (cell, index) {
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
            var self = this;
            var info = cell.getInfo();
            if (!info.isSold) {
                var layer = uw.TowerShopItemDetail.create(info);
                layer.onClose(function () {
                    self.setInfoByName("labelHonor", uw.userDataCtrl.getTowerPoints());
                }, self);
                layer.show();
            }
            else {
                mo.showMsg(uw.id_c_msgCode.noWinHero);
            }
        };
        TowerShopLayer.__className = "TowerShopLayer";
        return TowerShopLayer;
    })(mo.UIModalLayer);
    uw.TowerShopLayer = TowerShopLayer;
    TowerShopLayer.prototype.__class__ = "uw.TowerShopLayer";
})(uw || (uw = {}));

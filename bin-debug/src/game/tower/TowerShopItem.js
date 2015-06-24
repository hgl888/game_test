/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var TowerShopItem = (function (_super) {
        __extends(TowerShopItem, _super);
        function TowerShopItem() {
            _super.call(this);
        }
        var __egretProto__ = TowerShopItem.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiShopItem_ui;
            self._clickWidgetName = "touch_panel";
        };
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(self.__class.PANEL_ICON));
        };
        __egretProto__.resetByData = function (info) {
            var self = this;
            self._info = info;
            var itemId = info.itemId;
            var itemNum = info.itemNum;
            var unitId = info.unitId;
            var price = info.price;
            var isSold = info.isSold;
            var itemData = mo.getJSONWithFileNameAndID(uw.cfg_t_item, itemId);
            self.setInfoByName(self.__class.LABEL_ITEMNAME, itemData[uw.t_item_name]);
            self.setColorByName(self.__class.LABEL_ITEMNAME, uw.getItemColorByTempId(itemId));
            self.enableStrokeByName(self.__class.LABEL_PRICE, mo.c3b(20, 3, 0), 3);
            self.setInfoByName(self.__class.LABEL_PRICE, price);
            self.setVisibleByName(self.__class.IMG_MARK, false);
            self.setVisibleByName(self.__class.IMG_MASK, isSold);
            var costIcon = resHelper.getUIIconPath(unitId);
            self.setInfoByName(self.__class.IMG_COSTICON, costIcon);
            var ownCostUnitNum = uw.userDataCtrl.getItemNum(unitId);
            var isEnough = ownCostUnitNum < price;
            var color = isEnough ? mo.c3b(255, 0, 0) : mo.c3b(225, 225, 225);
            self.setColorByName(self.__class.LABEL_PRICE, color);
            self._iconCtrl.resetByData(itemId);
            self.formatByName(self.__class.LABEL_COUNT, itemNum);
        };
        __egretProto__.getInfo = function () {
            return this._info;
        };
        TowerShopItem.__className = "TowerShopItem";
        TowerShopItem.PANEL_ICON = "panel_icon";
        TowerShopItem.LABEL_COUNT = "label_countToSale";
        TowerShopItem.IMG_MASK = "img_mask";
        TowerShopItem.IMG_MARK = "img_mark";
        TowerShopItem.LABEL_ITEMNAME = "label_itemName";
        TowerShopItem.LABEL_PRICE = "label_price";
        TowerShopItem.IMG_COSTICON = "img_costIcon";
        return TowerShopItem;
    })(mo.GridViewCell);
    uw.TowerShopItem = TowerShopItem;
    TowerShopItem.prototype.__class__ = "uw.TowerShopItem";
})(uw || (uw = {}));

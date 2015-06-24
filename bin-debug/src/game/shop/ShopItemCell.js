/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ShopItemCell = (function (_super) {
        __extends(ShopItemCell, _super);
        function ShopItemCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ShopItemCell.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiShopItem_ui;
        };
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(clazz.PANEL_ICON));
        };
        //setCellSize(size) {
        //    var self = this;
        //    super.setCellSize(size);
        //    this._uiWidget.setSize(size);
        //}
        __egretProto__.resetByData = function (info) {
            var self = this, clazz = self.__class;
            self._info = info;
            var itemId = info.itemId;
            var itemNum = info.itemNum;
            var unitId = info.unitId;
            var price = info.price;
            var isSold = info.isSold;
            var itemData = mo.getJSONWithFileNameAndID(uw.cfg_t_item, itemId);
            self.setInfoByName(clazz.LABEL_ITEMNAME, itemData[uw.t_item_name]);
            self.setColorByName(clazz.LABEL_ITEMNAME, uw.getItemColorByTempId(itemId));
            self.enableStrokeByName(clazz.LABEL_PRICE, cc.c3b(20, 3, 0), 3);
            self.setInfoByName(clazz.LABEL_PRICE, price);
            self.setVisibleByName(clazz.IMG_MARK, isSold ? true : false);
            self.setVisibleByName(clazz.IMG_MASK, isSold ? true : false);
            self.setTouchEnabledByName(self._clickWidgetName, !isSold);
            var costIcon = resHelper.getUIIconPath(unitId);
            self.setInfoByName(clazz.IMG_COSTICON, costIcon);
            var ownCostUnitNum = uw.userDataCtrl.getItemNum(unitId);
            self.setInfoByName(clazz.LABEL_PRICE, price);
            var costWidget = self.getWidgetByName(clazz.LABEL_PRICE);
            if (unitId == uw.c_prop.spItemIdKey.diamond) {
                uw.userDataCtrl.setDiamondTxt(costWidget, price);
            }
            else if (unitId == uw.c_prop.spItemIdKey.gold) {
                uw.userDataCtrl.setGoldTxt(costWidget, price);
            }
            else {
                var color = ownCostUnitNum < price ? cc.c3b(255, 0, 0) : cc.c3b(255, 202, 109);
                costWidget.setColor(color);
            }
            self._iconCtrl.resetByData(itemId);
            self.formatByName(clazz.LABEL_COUNT, itemNum);
        };
        __egretProto__.getInfo = function () {
            return this._info;
        };
        ShopItemCell.__className = "ShopItemCell";
        ShopItemCell.PANEL_ICON = "panel_icon";
        ShopItemCell.LABEL_COUNT = "label_countToSale";
        ShopItemCell.IMG_MASK = "img_mask";
        ShopItemCell.IMG_MARK = "img_mark";
        ShopItemCell.LABEL_ITEMNAME = "label_itemName";
        ShopItemCell.LABEL_PRICE = "label_price";
        ShopItemCell.IMG_COSTICON = "img_costIcon";
        return ShopItemCell;
    })(mo.GridViewCell);
    uw.ShopItemCell = ShopItemCell;
    ShopItemCell.prototype.__class__ = "uw.ShopItemCell";
})(uw || (uw = {}));

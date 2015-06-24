/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ArenaHonorShopItemCell = (function (_super) {
        __extends(ArenaHonorShopItemCell, _super);
        function ArenaHonorShopItemCell() {
            _super.call(this);
            this._clickWidgetName = "touch_panel";
            this._info = null;
            this._iconCtrl = null;
        }
        var __egretProto__ = ArenaHonorShopItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiShopItem_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
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
            self.setVisibleByName(self.__class.IMG_MARK, isSold);
            self.setVisibleByName(self.__class.IMG_MASK, isSold);
            var costIcon = resHelper.getUIIconPath(unitId);
            self.setInfoByName(self.__class.IMG_COSTICON, costIcon);
            var ownCostUnitNum = uw.userDataCtrl.getHonor();
            var isEnough = ownCostUnitNum >= price;
            var color = isEnough ? mo.c3b(225, 225, 225) : mo.c3b(255, 0, 0);
            self.setColorByName(self.__class.LABEL_PRICE, color);
            self._iconCtrl.resetByData(itemId);
            self.formatByName(self.__class.LABEL_COUNT, itemNum);
        };
        __egretProto__.getInfo = function () {
            return this._info;
        };
        ArenaHonorShopItemCell.__className = "ArenaHonorShopItemCell";
        ArenaHonorShopItemCell.PANEL_ICON = "panel_icon";
        ArenaHonorShopItemCell.LABEL_COUNT = "label_countToSale";
        ArenaHonorShopItemCell.IMG_MASK = "img_mask";
        ArenaHonorShopItemCell.IMG_MARK = "img_mark";
        ArenaHonorShopItemCell.LABEL_ITEMNAME = "label_itemName";
        ArenaHonorShopItemCell.LABEL_PRICE = "label_price";
        ArenaHonorShopItemCell.IMG_COSTICON = "img_costIcon";
        return ArenaHonorShopItemCell;
    })(mo.GridViewCell);
    uw.ArenaHonorShopItemCell = ArenaHonorShopItemCell;
    ArenaHonorShopItemCell.prototype.__class__ = "uw.ArenaHonorShopItemCell";
})(uw || (uw = {}));

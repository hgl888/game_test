/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ExchangeShopItem = (function (_super) {
        __extends(ExchangeShopItem, _super);
        function ExchangeShopItem() {
            _super.apply(this, arguments);
            this._clickWidgetName = "touch_panel";
        }
        var __egretProto__ = ExchangeShopItem.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiExchangeItem_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            // 物品ICON
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(self.__class.PANEL_ICON));
        };
        __egretProto__.resetByData = function (info, exchangeType) {
            var self = this;
            self._info = info;
            var id = info[uw.c_exchange_id];
            var opt = uw.exchangeDataCtrl.getExchangeOpt(id);
            var itemId = opt.itemId;
            var count = opt.itemCount;
            self.name = "cell_" + id;
            self._iconCtrl.resetByData(itemId);
            self.formatByName(self.__class.LABEL_COUNT, count);
            self.setInfoByName(self.__class.LABEL_NAME, self._iconCtrl.dataCtrl.name);
            // 重置成默认值
            self.setTouchEnabledByName(self._clickWidgetName, true);
            self._iconCtrl.setGrayByName(uw.UIItemIconCtrl.IMG_ICON, false);
            self._iconCtrl.setGrayByName(uw.UIItemIconCtrl.IMG_BORDER, false);
            var status = uw.exchangeDataCtrl.getExchangeState(id);
            switch (status) {
                case uw.ExchangeDataCtrl.EXCHANGABLE:
                    self.setInfoByName(self.__class.LABEL_STATUS, self.__class.EXCHANGABLE);
                    self.setColorByName(self.__class.LABEL_STATUS, mo.GREEN);
                    break;
                case uw.ExchangeDataCtrl.NOT_EXCHANGABLE:
                    self.setInfoByName(self.__class.LABEL_STATUS, self.__class.NOT_EXCHANGABLE);
                    self.setColorByName(self.__class.LABEL_STATUS, 0xba7d1d);
                    break;
                case uw.ExchangeDataCtrl.EXCHANGED:
                    self.setInfoByName(self.__class.LABEL_STATUS, self.__class.EXCHANGED);
                    self.setColorByName(self.__class.LABEL_STATUS, mo.RED);
                    if (exchangeType == uw.c_prop.exchangeTypeKey.wish) {
                        self.setColorByName(self.__class.LABEL_STATUS, mo.GRAY);
                        self.setTouchEnabledByName(self._clickWidgetName, false);
                        self._iconCtrl.setGrayByName(uw.UIItemIconCtrl.IMG_ICON, true);
                        self._iconCtrl.setGrayByName(uw.UIItemIconCtrl.IMG_BORDER, true);
                    }
                    break;
            }
        };
        __egretProto__.getInfo = function () {
            return this._info;
        };
        ExchangeShopItem.__className = "ExchangeShopItem";
        ExchangeShopItem.LABEL_COUNT = "count";
        ExchangeShopItem.PANEL_ICON = "panel_icon";
        ExchangeShopItem.LABEL_NAME = "itemName";
        ExchangeShopItem.LABEL_STATUS = "status";
        ExchangeShopItem.EXCHANGED = "已兑换";
        ExchangeShopItem.EXCHANGABLE = "可兑换";
        ExchangeShopItem.NOT_EXCHANGABLE = "查看";
        return ExchangeShopItem;
    })(mo.GridViewCell);
    uw.ExchangeShopItem = ExchangeShopItem;
    ExchangeShopItem.prototype.__class__ = "uw.ExchangeShopItem";
})(uw || (uw = {}));

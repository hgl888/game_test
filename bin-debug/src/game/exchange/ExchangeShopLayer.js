/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ExchangeShopLayer = (function (_super) {
        __extends(ExchangeShopLayer, _super);
        function ExchangeShopLayer() {
            _super.apply(this, arguments);
            this._defaultHeroDataCtrl = null;
            this._tabName = null;
            this._exchangeType = null;
            this._dlg = null;
            this._data = null;
        }
        var __egretProto__ = ExchangeShopLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiExchangeShopLayer_ui;
        };
        __egretProto__.init = function (tabName) {
            _super.prototype.init.call(this);
            var self = this, clazz = self.__class;
            self._tabName = tabName;
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.NO_BORDER);
            // 选择器
            var tabList = self._tabList = uw.TabListCtrl.create(self.getWidgetByName(self.__class.TAB_CONTAINER));
            tabList.onTabClicked(self._onTabClicked, self);
            var tabs = [
                { name: self.__class.TAB_DAY, title: clazz.TITLE_DAY },
                { name: self.__class.TAB_TRAIL, title: clazz.TITLE_TRAIL },
                { name: self.__class.TAB_WISH, title: clazz.TITLE_WISH },
                { name: self.__class.TAB_EXCLUSIVE, title: clazz.TITLE_EXCLUSIVE }
            ];
            tabList.resetByData(tabs);
            var dlg = self._dlg = uw.ExchangeDlg.getInstance();
            dlg.onClose(function () {
                if (self._dlg.needRefresh) {
                    self._changItemListByType(self._exchangeType);
                }
            }, self);
        };
        __egretProto__.onEnterNextTick = function () {
            _super.prototype.onEnterNextTick.call(this);
            var self = this;
            if (!self._gridScrollView) {
                self._gridScrollView = self._createGridScrollView("shopList", uw.ExchangeShopItem, 3, self._onItemCellDataSource, true);
                self._tabList.movePointerByName(self.__class.TAB_DAY);
            }
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var self = this;
            var info = self._data[index];
            info.index = index;
            cell.resetByData(info, self._exchangeType);
            if (!cell.listenerInited) {
                cell.listenerInited = true;
                cell.onClick(self._onCellClick, self);
            }
        };
        __egretProto__._onCellClick = function (cell) {
            var self = this;
            var info = cell.getInfo();
            self._dlg.resetByData(info, self._exchangeType);
            self._dlg.show(true);
        };
        __egretProto__._initWithData = function (data) {
            var self = this;
            self._data = data;
            self.refreshGrid();
        };
        __egretProto__.refreshGrid = function () {
            var self = this;
            self._gridScrollView.setTotalCount(self._data.length);
            self._gridScrollView.jumpToTop();
        };
        __egretProto__._changItemListByType = function (exchangeType) {
            var self = this;
            self._exchangeType = exchangeType;
            var data = uw.exchangeDataCtrl.getItemsByType(exchangeType);
            self._initWithData(data);
        };
        __egretProto__._onTabClicked = function (sender) {
            var self = this;
            var name = sender.getName();
            var showType = uw.c_prop.exchangeTypeKey.daily;
            var title = self.__class.TITLE_DAY;
            switch (name) {
                case self.__class.TAB_DAY:
                    showType = uw.c_prop.exchangeTypeKey.daily;
                    title = self.__class.TITLE_DAY;
                    break;
                case self.__class.TAB_TRAIL:
                    showType = uw.c_prop.exchangeTypeKey.darkStone;
                    title = self.__class.TITLE_TRAIL;
                    break;
                case self.__class.TAB_WISH:
                    showType = uw.c_prop.exchangeTypeKey.wish;
                    title = self.__class.TITLE_WISH;
                    break;
                case self.__class.TAB_EXCLUSIVE:
                    //专属兑换有领主等级限制
                    if (!uw.verifyLevel(uw.id_c_open.exchangeExclusive))
                        return false;
                    showType = uw.c_prop.exchangeTypeKey.exclusive;
                    title = self.__class.TITLE_EXCLUSIVE;
                    break;
            }
            self.setInfoByName(self.__class.LABEL_TITLE, title);
            self._changItemListByType(showType);
            return true;
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            uw.ExchangeDlg.purgeInstance();
        };
        /**
         * 根据兑换id， 滚动scrollview
         * @param exchangeId
         */
        __egretProto__.scrollToItem = function (exchangeId) {
            var self = this;
            var cols = 2;
            var visualRowCount = 2;
            var data = self._data;
            var totalRow = Math.ceil(data.length / cols);
            for (var i = 0, li = data.length; i < li; i++) {
                var id = data[i]._info[uw.c_exchange_id];
                if (id == exchangeId) {
                    var row = Math.ceil(i / cols);
                    if (row >= visualRowCount) {
                        self._gridScrollView.jumpToPercentVertical((row - (visualRowCount - 1)) / (totalRow - visualRowCount) * 100);
                    }
                    else {
                        self._gridScrollView.jumpToPercentVertical(0);
                    }
                    self._gridScrollView.refresh();
                    break;
                }
            }
        };
        ExchangeShopLayer.__className = "ExchangeShopLayer";
        ExchangeShopLayer.TAB_CONTAINER = "tab_container";
        ExchangeShopLayer.TAB_DAY = "tab_day";
        ExchangeShopLayer.TAB_TRAIL = "tab_trail";
        ExchangeShopLayer.TAB_WISH = "tab_wish";
        ExchangeShopLayer.TAB_EXCLUSIVE = "tab_exclusive";
        ExchangeShopLayer.LABEL_TITLE = "label_title";
        ExchangeShopLayer.TITLE_DAY = "每日兑换";
        ExchangeShopLayer.TITLE_TRAIL = "培养兑换";
        ExchangeShopLayer.TITLE_WISH = "战魂兑换";
        ExchangeShopLayer.TITLE_EXCLUSIVE = "专属兑换";
        return ExchangeShopLayer;
    })(mo.DisplayLayer);
    uw.ExchangeShopLayer = ExchangeShopLayer;
    ExchangeShopLayer.prototype.__class__ = "uw.ExchangeShopLayer";
})(uw || (uw = {}));

/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var HeroExpcItemCell = (function (_super) {
        __extends(HeroExpcItemCell, _super);
        function HeroExpcItemCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HeroExpcItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiBagItem1_ui;
            self._clickWidgetName = self.__class.PANEL_TOUCH;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
        };
        //@override
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(self.__class.PANEL_ICON));
            self.onLongTouchByName(self._clickWidgetName, self.onLongTouch, self, 200);
            var clickWidget = self.getWidgetByName(self._clickWidgetName);
            clickWidget.longTouchEnabled = true;
            var TE = mo.TouchEvent;
            clickWidget.addEventListener(TE.LONG_TOUCH_BEGIN, self._onEatLongTouchBegin, self);
            clickWidget.addEventListener(TE.LONG_TOUCH_END, self._onEatLongTouchEnd, self);
            clickWidget.onClick(self._onEatClick, self);
        };
        __egretProto__._onEatLongTouchBegin = function () {
            var self = this;
            self._itemCtrl.batchUseExpItemBegin(self._heroCtrl.id);
            self._itemCtrl.localUseExpItem(self._useExpCallback, self);
        };
        __egretProto__._onEatLongTouchEnd = function () {
            var self = this;
            self._itemCtrl.batchUseExpItemEnd();
        };
        __egretProto__._onEatClick = function () {
            var self = this;
            self._itemCtrl.use(self._useExpCallback, self, self._heroCtrl.id);
        };
        __egretProto__.resetByData = function (dataCtrl) {
            var self = this;
            var clickWidget = self.getWidgetByName(self._clickWidgetName);
            clickWidget.setTouchEnabled(false);
            clickWidget.setTouchEnabled(true);
            var visible = (dataCtrl ? true : false);
            self.setVisibleByName(self.__class.PANEL_ICON, visible);
            self.setTouchEnabledByName(self._clickWidgetName, visible);
            if (!visible)
                return;
            self._itemCtrl = dataCtrl;
            self._iconCtrl.resetByData(dataCtrl);
        };
        __egretProto__._useExpCallback = function (opt) {
            var self = this;
            if (opt) {
                // 更新Item数量
                self._iconCtrl.refreshMe();
            }
        };
        __egretProto__.setHeroToBeUse = function (heroCtrl) {
            this._heroCtrl = heroCtrl;
        };
        HeroExpcItemCell.__className = "HeroExpcItemCell";
        HeroExpcItemCell.PANEL_TOUCH = "touch_panel";
        HeroExpcItemCell.PANEL_ICON = "panel_icon";
        HeroExpcItemCell.PANEL_BG = "bg";
        return HeroExpcItemCell;
    })(mo.GridViewCell);
    uw.HeroExpcItemCell = HeroExpcItemCell;
    HeroExpcItemCell.prototype.__class__ = "uw.HeroExpcItemCell";
})(uw || (uw = {}));

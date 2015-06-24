/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ForgePickupItemCell = (function (_super) {
        __extends(ForgePickupItemCell, _super);
        function ForgePickupItemCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ForgePickupItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiPickupItem_ui;
            self._clickWidgetName = "touch_panel";
            self._useClickEffect = true;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
        };
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            var clickWidget = self.getWidgetByName(self._clickWidgetName);
            clickWidget.longTouchEnabled = true;
            clickWidget.onClick(self._onClick, self);
            var TE = mo.TouchEvent;
            clickWidget.addEventListener(TE.LONG_TOUCH_BEGIN, self._onClick, self);
            var unpickWidget = self.getWidgetByName(clazz.PANEL_UNPICK);
            unpickWidget.longTouchEnabled = true;
            unpickWidget.onClick(self._onUnPick, self);
            unpickWidget.addEventListener(TE.LONG_TOUCH_BEGIN, self._onUnPick, self);
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(clazz.PANEL_ICON));
            self.registerClassByKey(uw.PickDataCtrl, uw.PickDataCtrl.ON_PICK_COUNT_CHANGED, self._onPickCountChanged);
        };
        __egretProto__._onPickCountChanged = function (curCount, ownCount, pickDataCtrl) {
            var self = this;
            if (this._itemCtrl == pickDataCtrl) {
                self._updatePickArea();
            }
        };
        __egretProto__._onUnPick = function (sender, type) {
            var self = this;
            if (self._itemCtrl) {
                if (this._unPickSelector) {
                    this._unPickSelector.call(this._unPickSelectorTarget, this, sender, this._unPickSelectorData);
                }
            }
        };
        __egretProto__._onClick = function (sender, type) {
            var self = this;
            if (self._itemCtrl) {
                _super.prototype._onClick.apply(self, arguments);
            }
        };
        __egretProto__.onUnPickClick = function (selector, target, data) {
            this._unPickSelector = selector;
            this._unPickSelectorTarget = target;
            this._unPickSelectorData = data;
        };
        __egretProto__.resetByData = function (itemCtrl) {
            var self = this;
            self._itemCtrl = itemCtrl;
            var visible = (itemCtrl ? true : false);
            self.setVisibleByName(self.__class.PANEL_ICON, visible);
            self.setVisibleByName(self.__class.PANEL_UNPICK, visible);
            self.setTouchEnabledByName(self._clickWidgetName, visible);
            if (!visible)
                return;
            var dataCtrl = itemCtrl.dataCtrl;
            var id = dataCtrl.tempId;
            self.setName("cell_forgeItem_" + id);
            self._iconCtrl.resetByData(dataCtrl);
            self._updatePickArea();
        };
        __egretProto__._updatePickArea = function () {
            var self = this;
            var ownCount = self._itemCtrl.totalCount;
            var pickCount = self._itemCtrl.pickCount;
            self.setVisibleByName(self.__class.PANEL_UNPICK, pickCount > 0);
            if (pickCount > 0) {
                self._iconCtrl.setInfoByName(uw.UIItemIconCtrl.LABEL_COUNT, mo.formatStr("%s/%s", pickCount, ownCount));
            }
            else {
                self._iconCtrl.setInfoByName(uw.UIItemIconCtrl.LABEL_COUNT, mo.formatStr("%s", ownCount));
                self._iconCtrl.setVisibleByName(uw.UIItemIconCtrl.LABEL_COUNT, ownCount > 1);
            }
        };
        __egretProto__.dtor = function () {
            var self = this, clazz = self.__class;
            _super.prototype.dtor.call(this);
            var TE = mo.TouchEvent;
            var clickWidget = self.getWidgetByName(self._clickWidgetName);
            clickWidget.removeEventListener(TE.LONG_TOUCH_BEGIN, self._onClick, self);
            var unpickWidget = self.getWidgetByName(clazz.PANEL_UNPICK);
            unpickWidget.removeEventListener(TE.LONG_TOUCH_BEGIN, self._onUnPick, self);
        };
        ForgePickupItemCell.__className = "ForgePickupItemCell";
        ForgePickupItemCell.PANEL_ICON = "panel_icon";
        ForgePickupItemCell.PANEL_UNPICK = "panel_unpick";
        return ForgePickupItemCell;
    })(mo.GridViewCell);
    uw.ForgePickupItemCell = ForgePickupItemCell;
    ForgePickupItemCell.prototype.__class__ = "uw.ForgePickupItemCell";
})(uw || (uw = {}));

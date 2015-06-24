/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var BagItemCell = (function (_super) {
        __extends(BagItemCell, _super);
        function BagItemCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = BagItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiBagItem1_ui;
            self._clickWidgetName = "touch_panel";
            self._useClickEffect = true;
        };
        //@override
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            var clazz = self.__class;
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(clazz.PANEL_ICON));
            self.registerClassByKey(uw.BagDataCtrl, uw.BagDataCtrl.ON_COUNT_CHANGED, self._onItemCountChanged);
        };
        __egretProto__._onItemCountChanged = function (count, ctrl) {
            var self = this;
            if (self._itemCtrl == ctrl) {
                self._iconCtrl.setInfoByName(self._iconCtrl.__class.LABEL_COUNT, count);
            }
        };
        __egretProto__.resetByData = function (dataCtrl) {
            var self = this;
            var clazz = self.__class;
            self._itemCtrl = dataCtrl;
            var visible = (dataCtrl ? true : false);
            self.setVisibleByName(clazz.PANEL_ICON, visible);
            self.setTouchEnabledByName(self._clickWidgetName, visible);
            if (!visible)
                return;
            //下面通过设置name，可以在外部简单获取到cell
            self.name = ("cell_" + dataCtrl.tempId);
            self._iconCtrl.resetByData(dataCtrl);
        };
        BagItemCell.__className = "BagItemCell";
        BagItemCell.PANEL_ICON = "panel_icon";
        BagItemCell.PANEL_BG = "bg";
        return BagItemCell;
    })(mo.GridViewCell);
    uw.BagItemCell = BagItemCell;
    BagItemCell.prototype.__class__ = "uw.BagItemCell";
})(uw || (uw = {}));

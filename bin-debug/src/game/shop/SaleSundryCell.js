/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SaleSundryCell = (function (_super) {
        __extends(SaleSundryCell, _super);
        function SaleSundryCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SaleSundryCell.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiSundryItem_ui;
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
        __egretProto__.resetByData = function (dataCtrl) {
            var self = this;
            self._iconCtrl.resetByData(dataCtrl);
            var count = uw.userDataCtrl.getItemNum(self._iconCtrl.dataCtrl.tempId);
            self.formatByName(self.__class.LABEL_NAME_COUNT, self._iconCtrl.dataCtrl.name, count);
        };
        SaleSundryCell.__className = "SaleSundryCell";
        SaleSundryCell.PANEL_ICON = "panel_icon";
        SaleSundryCell.LABEL_NAME_COUNT = "label_name_count";
        return SaleSundryCell;
    })(mo.GridViewCell);
    uw.SaleSundryCell = SaleSundryCell;
    SaleSundryCell.prototype.__class__ = "uw.SaleSundryCell";
})(uw || (uw = {}));

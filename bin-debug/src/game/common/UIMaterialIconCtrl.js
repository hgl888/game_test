/**
 * Created by lihex on 3/5/15.
 */
var uw;
(function (uw) {
    var UIMaterialIconCtrl = (function (_super) {
        __extends(UIMaterialIconCtrl, _super);
        function UIMaterialIconCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIMaterialIconCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            var self = this, clazz = self.__class;
            _super.prototype._initProp.call(this);
            self._jsonPath = res.uiMaterialItem_ui;
            self._clickWidgetName = clazz.PANEL_ICON;
        };
        __egretProto__.init = function (container) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _super.prototype.init.call(this);
            var self = this, clazz = self.__class;
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(clazz.PANEL_ICON));
            self._txtCount = self.getWidgetByName(clazz.LABEL_COUNT);
            //居中对齐，解决ccs编辑器的BUG
            var parameter = mo.LinearLayoutParameter.create();
            var gravity = mo.LinearGravity.centerHorizontal;
            parameter.setGravity(gravity);
            parameter.setMargin(new mo.Margin(40, 0, 0, 0));
            self._txtCount.setLayoutParameter(parameter);
        };
        //override
        __egretProto__.resetByData = function (stuff) {
            var self = this, clazz = self.__class;
            self._iconCtrl.resetByData(stuff.itemId);
            self._txtCount.setOption({ value: mo.formatStr("[ubb color=%s]%s[/ubb]/[ubb]%s[/ubb]", stuff.enough ? "white" : "red", stuff.curNum, stuff.requiredNum) });
            self.stuff = stuff;
        };
        __egretProto__.getDataCtrl = function () {
            return this._iconCtrl.dataCtrl;
        };
        UIMaterialIconCtrl.__className = "UIMaterialIconCtrl";
        UIMaterialIconCtrl.PANEL_ICON = "panel_icon"; //物品ICON
        UIMaterialIconCtrl.LABEL_COUNT = "label_count"; //物品数量
        return UIMaterialIconCtrl;
    })(mo.WidgetCtrl);
    uw.UIMaterialIconCtrl = UIMaterialIconCtrl;
    UIMaterialIconCtrl.prototype.__class__ = "uw.UIMaterialIconCtrl";
})(uw || (uw = {}));

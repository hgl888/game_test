/**
 * Created by lihex on 12/19/14.
 */
var uw;
(function (uw) {
    var __ImportBagQueryCommonApi = (function () {
        function __ImportBagQueryCommonApi() {
        }
        var __egretProto__ = __ImportBagQueryCommonApi.prototype;
        return __ImportBagQueryCommonApi;
    })();
    uw.__ImportBagQueryCommonApi = __ImportBagQueryCommonApi;
    __ImportBagQueryCommonApi.prototype.__class__ = "uw.___ImportBagQueryCommonApi";
    uw._bagQueryCommonApi = {
        _jsonPath: res.uiBagQueryLayer_ui,
        _gridLayerCtrl: null,
        _detailLayerCtrl: null,
        _initCtrl: function (from, opt) {
            var self = this;
            var clazz = self.__class;
            // 全屏适配
            self.setLayoutAdaptive(self.widget);
            // 背包格子视图
            var gridLayerCtrl = self._gridLayerCtrl = uw.BagGridLayerCtrl.create(self.getWidgetByName(clazz.PANEL_ITEMS));
            gridLayerCtrl.onCellClick(self._onCellClick, self);
            // 详细信息
            self._detailLayerCtrl = uw.BagDetailLayerCtrl.create(self.getWidgetByName(clazz.PANEL_INFO), from, opt);
            self.setVisibleByName(clazz.PANEL_INFO, false);
        },
        setCurList: function (showType, option) {
            var self = this;
            self._gridLayerCtrl.setCurList(showType, option);
        }
    };
})(uw || (uw = {}));

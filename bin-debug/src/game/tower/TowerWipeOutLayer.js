/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var TowerWipeOutLayer = (function (_super) {
        __extends(TowerWipeOutLayer, _super);
        function TowerWipeOutLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TowerWipeOutLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiTowerWipeOutLayer_ui;
        };
        __egretProto__.init = function (copyId) {
            var self = this;
            mo.Dlg.prototype.init.call(self);
            var copyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            self._gold = copyInfo[uw.t_copy_gold];
            self._teamExpc = copyInfo[uw.t_copy_teamExpc];
            //关闭窗口
            self._btnBack = self.getWidgetByName("btnBack");
            self._btnBack.setVisible(false);
            self._btnBack.onClick(self.close, self);
            self._resultContainer = self.getWidgetByName("resultList");
        };
        __egretProto__._createNextResult = function () {
            var self = this;
            if (self._dataIndex < self._data.length) {
                var curData = self._data[self._dataIndex];
                var item = uw.TowerWipeOutItem.create(self._dataIndex, curData, self._level, self._teamExpc, self._gold);
                item.setAnchorPoint(0, 0);
                item.setDelegate(self);
                item.setData(self._dataIndex, curData, self._level);
                item.setTitle(self._level + self._dataIndex + 1);
                self._resultContainer.pushBackCustomItem(item);
                process.nextTick(function () {
                    self._resultContainer.jumpToBottom();
                }, self);
                self._dataIndex++;
            }
            else {
                mo.unschedule(self._createNextResult, self);
                self._resultContainer.setTouchEnabled(true);
                self._dataIndex = 0;
                self._btnBack.setVisible(true);
                self._canClose = true;
                self.setExtraInfo();
            }
        };
        TowerWipeOutLayer.__className = "TowerWipeOutLayer";
        return TowerWipeOutLayer;
    })(uw.CopyWipeOutLayer);
    uw.TowerWipeOutLayer = TowerWipeOutLayer;
    TowerWipeOutLayer.prototype.__class__ = "uw.TowerWipeOutLayer";
})(uw || (uw = {}));

/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ArenaRecordLayer = (function (_super) {
        __extends(ArenaRecordLayer, _super);
        function ArenaRecordLayer() {
            _super.call(this);
            this._gridScrollView = null;
        }
        var __egretProto__ = ArenaRecordLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiArenaRecordLayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            this.onClickByName("btnBack", this.close, this);
            this._gridScrollView = this._createGridScrollView("recordList", uw.ArenaRecordItem, 1, this._onItemCellDataSource);
            var self = this;
            uw.arenaDataCtrl.getRecords(0, 20, function (data) {
                self._initWithData(data);
            }, self);
        };
        __egretProto__._initWithData = function (data) {
            var self = this;
            self._data = data;
            if (self._data.length > 0) {
                this._gridScrollView.setTotalCount(data.length);
                this._gridScrollView.jumpToTop();
                self.setVisibleByName("noRecord", false);
            }
            else {
                self.setVisibleByName("noRecord", true);
            }
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var info = this._data[index];
            cell.resetByData(info);
        };
        ArenaRecordLayer.__className = "ArenaRecordLayer";
        return ArenaRecordLayer;
    })(mo.UIModalLayer);
    uw.ArenaRecordLayer = ArenaRecordLayer;
    ArenaRecordLayer.prototype.__class__ = "uw.ArenaRecordLayer";
})(uw || (uw = {}));

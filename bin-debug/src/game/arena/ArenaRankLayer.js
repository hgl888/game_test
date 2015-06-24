/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ArenaRankLayer = (function (_super) {
        __extends(ArenaRankLayer, _super);
        function ArenaRankLayer() {
            _super.call(this);
            this._gridScrollView = null;
            this._index = 0;
            this._maxNum = 100;
            this._allData = null;
            this._allData = [];
        }
        var __egretProto__ = ArenaRankLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiArenaRankLayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self.onClickByName("btnBack", this.close, this);
            self._gridScrollView = self._createGridScrollView("rankList", uw.ArenaRankItemCell, 1, this._onItemCellDataSource);
            self.refresh();
        };
        __egretProto__.refresh = function () {
            var self = this, count = self._maxNum;
            uw.arenaDataCtrl.getRanks(0, count, function (data) {
                if (data && data.length > 0) {
                    self._allData = data;
                    self._gridScrollView.setTotalCount(self._allData.length);
                    self._gridScrollView.scrollToTop(0.016, false);
                }
            }, self);
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var info = this._allData[index];
            cell.resetByData(info);
        };
        ArenaRankLayer.__className = "ArenaRankLayer";
        return ArenaRankLayer;
    })(mo.UIModalLayer);
    uw.ArenaRankLayer = ArenaRankLayer;
    ArenaRankLayer.prototype.__class__ = "uw.ArenaRankLayer";
})(uw || (uw = {}));

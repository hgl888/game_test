/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ArenaLuckRankLayer = (function (_super) {
        __extends(ArenaLuckRankLayer, _super);
        function ArenaLuckRankLayer() {
            _super.apply(this, arguments);
            this._showWithAction = false;
            this._yestodayLuckRankData = null;
            this._todayLuckRankData = null;
        }
        var __egretProto__ = ArenaLuckRankLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiArenaLuckRankLayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            this.onClickByName("btnBack", this.close, this);
            var self = this;
            uw.arenaDataCtrl.getLuckRanks(function (data) {
                self._yestodayLuckRankData = data[uw.dsConsts.ArenaLuckRank.yesterday];
                self._todayLuckRankData = data[uw.dsConsts.ArenaLuckRank.today];
                self._initWithData();
            });
            self._yestodayLuckRankScrollView = self._createGridScrollView("yestodayLuckRankList", uw.ArenaLuckRankYestodayItemCell, 1, this._onYestodayCellDataSource);
            self._yestodayLuckRankScrollView.setTouchEnabled(false);
            self._todayLuckRankScrollView = self._createGridScrollView("todayLuckRankList", uw.ArenaLuckRankTodayItemCell, 1, this._onTodayCellDataSource);
            self._todayLuckRankScrollView.setTouchEnabled(false);
            this._enableTitleStroke("yestodayTitlePanel", ["label_titleRank", "label_titleLeaderName", "label_titleAward"]);
            this._enableTitleStroke("todayTitlePanel", ["label_titleRank", "label_titleAward"]);
        };
        __egretProto__._enableTitleStroke = function (panelName, names) {
            var self = this;
            for (var i = 0; i < names.length; i++) {
                self.getWidgetByName(panelName).enableStrokeByName(names[i], mo.c3b(130, 58, 10), 3);
            }
        };
        __egretProto__._initWithData = function () {
            var self = this;
            if (self._yestodayLuckRankData && self._yestodayLuckRankData.length > 0) {
                self._yestodayLuckRankScrollView.setTotalCount(this._yestodayLuckRankData.length);
                self._yestodayLuckRankScrollView.jumpToTop();
                self.setVisibleByName("noRank", false);
            }
            else {
                self.setVisibleByName("noRank", true);
                self.setVisibleByName("yestodayLuckRankList", false);
            }
            self._todayLuckRankScrollView.setTotalCount(this._todayLuckRankData.length);
            self._todayLuckRankScrollView.jumpToTop();
        };
        __egretProto__._onYestodayCellDataSource = function (cell, index) {
            var info = this._yestodayLuckRankData[index];
            cell.resetByData(info, index);
        };
        __egretProto__._onTodayCellDataSource = function (cell, index) {
            var info = this._todayLuckRankData[index];
            cell.resetByData(info, index);
        };
        ArenaLuckRankLayer.__className = "ArenaLuckRankLayer";
        return ArenaLuckRankLayer;
    })(mo.Dlg);
    uw.ArenaLuckRankLayer = ArenaLuckRankLayer;
    ArenaLuckRankLayer.prototype.__class__ = "uw.ArenaLuckRankLayer";
})(uw || (uw = {}));

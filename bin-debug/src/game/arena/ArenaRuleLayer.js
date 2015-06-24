/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ArenaRuleLayer = (function (_super) {
        __extends(ArenaRuleLayer, _super);
        function ArenaRuleLayer() {
            _super.call(this);
            this._data = null;
        }
        var __egretProto__ = ArenaRuleLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiArenaRuleLayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            this._data = mo.getJSONWithFileName(uw.cfg_c_rankReward);
            this.onClickByName("btnBack", this.close, this);
            this.initMyRewardInfo();
            this._gridView = this._createGridView("rewardList", uw.ArenaRuleItemCell, 1, this._onItemCellDataSource);
            this._gridView.setTotalCount(5);
        };
        __egretProto__.initMyRewardInfo = function () {
            var self = this;
            var arenaDataCtrl = uw.arenaDataCtrl;
            var rewardObj = uw.getRewardByRank(arenaDataCtrl.rank);
            self.setInfoByName("curRank", arenaDataCtrl.rank);
            self.formatByName("curRankDesc", rewardObj.minRank, rewardObj.maxRank);
            self.showMyRewardInfo(self, rewardObj.myReward);
            self.setInfoByName("highestRank", arenaDataCtrl.highRank);
        };
        __egretProto__.showMyRewardInfo = function (widget, reward, rank) {
            for (var i = 0; i < reward.length; i++) {
                var obj = reward[i];
                if (obj[0] == uw.c_prop.spItemIdKey.diamond) {
                    widget.formatByName("labDiamond", obj[1]);
                    uw.setDiamondColor(widget, "labDiamond");
                }
                else if (obj[0] == uw.c_prop.spItemIdKey.gold) {
                    widget.formatByName("labGold", obj[1]);
                    uw.setGoldColor(widget, "labGold");
                }
                else if (obj[0] == uw.c_prop.spItemIdKey.honor) {
                    widget.formatByName("labHonor", obj[1]);
                }
                else {
                    var item = widget.getWidgetByName("item");
                    var ctrl = uw.UIItemIconCtrl.create(item);
                    ctrl.resetByData(obj[0]);
                    widget.formatByName("labItem", obj[1]);
                }
            }
            if (rank != null) {
                widget.formatByName("labIndex", rank);
            }
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var info = this._data[index + 1];
            var arenaRank = info[uw.c_rankReward_arenaRank];
            var arenaReward = info[uw.c_rankReward_arenaReward];
            this.showMyRewardInfo(cell, arenaReward, arenaRank);
        };
        ArenaRuleLayer.__className = "ArenaRuleLayer";
        return ArenaRuleLayer;
    })(mo.UIModalLayer);
    uw.ArenaRuleLayer = ArenaRuleLayer;
    ArenaRuleLayer.prototype.__class__ = "uw.ArenaRuleLayer";
})(uw || (uw = {}));

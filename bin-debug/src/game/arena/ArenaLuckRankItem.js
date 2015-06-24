/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ArenaLuckRankTodayItemCell = (function (_super) {
        __extends(ArenaLuckRankTodayItemCell, _super);
        function ArenaLuckRankTodayItemCell() {
            _super.call(this);
        }
        var __egretProto__ = ArenaLuckRankTodayItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiArenaLuckRankItem1_ui;
        };
        __egretProto__.resetByData = function (info, index) {
            var self = this;
            var luckRank = uw.dsConsts.ArenaLuckRankEntity;
            var rank = info[luckRank.rank];
            this.setInfoByName("rankNum", rank);
            this.enableStrokeByName("rankNum", mo.c3b(20, 3, 0), 3);
            this.enableStrokeByName("diamond", mo.c3b(20, 3, 0), 3);
            var reward;
            var rewardLuckArr = uw.arenaDataCtrl.rewardLuck;
            if (index < 3) {
                reward = rewardLuckArr[0];
            }
            else {
                reward = rewardLuckArr[1];
            }
            this.setInfoByName("diamond", reward);
            uw.setDiamondColor(self, "diamond");
            if (index % 2 == 1) {
                this.setVisibleByName("bg", false);
            }
            else {
                this.setVisibleByName("bg", true);
            }
        };
        ArenaLuckRankTodayItemCell.__className = "ArenaLuckRankTodayItemCell";
        return ArenaLuckRankTodayItemCell;
    })(mo.GridViewCell);
    uw.ArenaLuckRankTodayItemCell = ArenaLuckRankTodayItemCell;
    ArenaLuckRankTodayItemCell.prototype.__class__ = "uw.ArenaLuckRankTodayItemCell";
    var ArenaLuckRankYestodayItemCell = (function (_super) {
        __extends(ArenaLuckRankYestodayItemCell, _super);
        function ArenaLuckRankYestodayItemCell() {
            _super.call(this);
        }
        var __egretProto__ = ArenaLuckRankYestodayItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiArenaLuckRankItem_ui;
        };
        __egretProto__.resetByData = function (info, index) {
            var self = this;
            var luckRank = uw.dsConsts.ArenaLuckRankEntity;
            var rank = info[luckRank.rank];
            this.setInfoByName("rankNum", rank);
            this.enableStrokeByName("rankNum", mo.c3b(20, 3, 0), 3);
            this.enableStrokeByName("name", mo.c3b(20, 3, 0), 3);
            this.enableStrokeByName("diamond", mo.c3b(20, 3, 0), 3);
            var name = info[luckRank.userName];
            if (!name) {
                name = "---";
            }
            this.setInfoByName("name", name);
            var reward;
            var rewardLuckArr = uw.arenaDataCtrl.rewardLuck;
            if (index < 3) {
                reward = rewardLuckArr[0];
            }
            else {
                reward = rewardLuckArr[1];
            }
            this.setInfoByName("diamond", reward);
            uw.setDiamondColor(self, "diamond");
            if (index % 2 == 1) {
                this.setVisibleByName("bg", false);
            }
            else {
                this.setVisibleByName("bg", true);
            }
        };
        ArenaLuckRankYestodayItemCell.__className = "ArenaLuckRankYestodayItemCell";
        return ArenaLuckRankYestodayItemCell;
    })(mo.GridViewCell);
    uw.ArenaLuckRankYestodayItemCell = ArenaLuckRankYestodayItemCell;
    ArenaLuckRankYestodayItemCell.prototype.__class__ = "uw.ArenaLuckRankYestodayItemCell";
})(uw || (uw = {}));

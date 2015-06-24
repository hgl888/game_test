/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var RankLeaderInfoLayer = (function (_super) {
        __extends(RankLeaderInfoLayer, _super);
        function RankLeaderInfoLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = RankLeaderInfoLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiRankLeaderInfoLayer_ui;
        };
        __egretProto__.init = function (info) {
            _super.prototype.init.call(this, info);
            var self = this;
            var KEY = uw.dsConsts.TowerRankEntity;
            self.onClickByName("btnBack", self.close, self);
            self.setInfoByName("name", info[KEY.userName]);
            self.setInfoByName("labelLeaderLevel", info[KEY.userLvl]);
            self.setInfoByName("labelTower", info[KEY.id]);
            self.setInfoByName("defLevel", info[KEY.layer]);
            self.setInfoByName("vipLevel", info[KEY.userVip]);
            var path = resHelper.getRoleIconPath(info[KEY.userIconId]);
            self.setInfoByName("imgHead", path);
            self.enableStrokeByName("label_leaderLvl", mo.c3b(20, 3, 0), 3);
            self.enableStrokeByName("label_towerRank", mo.c3b(20, 3, 0), 3);
            self.enableStrokeByName("label_gh", mo.c3b(20, 3, 0), 3);
            self.enableStrokeByName("name", mo.c3b(20, 3, 0), 3);
            self.doLayoutByName("panel_tower");
        };
        RankLeaderInfoLayer.__className = "RankLeaderInfoLayer";
        return RankLeaderInfoLayer;
    })(mo.UIModalLayer);
    uw.RankLeaderInfoLayer = RankLeaderInfoLayer;
    RankLeaderInfoLayer.prototype.__class__ = "uw.RankLeaderInfoLayer";
})(uw || (uw = {}));

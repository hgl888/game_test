/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var RankTowerItem = (function (_super) {
        __extends(RankTowerItem, _super);
        function RankTowerItem() {
            _super.call(this);
        }
        var __egretProto__ = RankTowerItem.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiRankTowerItem_ui;
        };
        __egretProto__.resetByData = function (info, index) {
            var self = this;
            var KEY = uw.dsConsts.TowerRankEntity;
            self.setInfoByName("name", info[KEY.userName]);
            self.setInfoByName("level", info[KEY.userLvl]);
            self.setInfoByName("rank", info[KEY.id]);
            self.setInfoByName("spend", mo.getTimeStr(info[KEY.spend], true));
            self.setInfoByName("layer", info[KEY.layer]);
            self.setVisibleByName("bg_color", index % 2 == 1);
            // 如果是本用户的数据，则使用红色字
            var myId = uw.userDataCtrl.getId();
            if (myId == info[KEY.userId]) {
                self.setColorByName("name", mo.c3b(255, 0, 0));
                self.setColorByName("level", mo.c3b(255, 0, 0));
                self.setColorByName("rank", mo.c3b(255, 0, 0));
                self.setColorByName("spend", mo.c3b(255, 0, 0));
                self.setColorByName("layer", mo.c3b(255, 0, 0));
            }
            else {
                self.setColorByName("name", mo.WHITE);
                self.setColorByName("level", mo.WHITE);
                self.setColorByName("rank", mo.WHITE);
                self.setColorByName("spend", mo.WHITE);
                self.setColorByName("layer", mo.WHITE);
            }
        };
        RankTowerItem.__className = "RankTowerItem";
        return RankTowerItem;
    })(mo.GridViewCell);
    uw.RankTowerItem = RankTowerItem;
    RankTowerItem.prototype.__class__ = "uw.RankTowerItem";
})(uw || (uw = {}));

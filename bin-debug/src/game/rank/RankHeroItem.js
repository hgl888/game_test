/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var RankHeroItem = (function (_super) {
        __extends(RankHeroItem, _super);
        function RankHeroItem() {
            _super.call(this);
        }
        var __egretProto__ = RankHeroItem.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiRankHeroItem_ui;
        };
        __egretProto__.resetByData = function (info, index) {
            var self = this;
            var KEY = uw.dsConsts.HeroRankEntity;
            self.setInfoByName("name", info[KEY.userName]);
            self.setInfoByName("level", info[KEY.heroLvl]);
            self.setInfoByName("rank", info[KEY.id]);
            self.setInfoByName("combat", info[KEY.combatEff]);
            self.setVisibleByName("touch_panel", index % 2 == 1);
            self.setInfoByName("heroIcon", uw.getRoleIconByTempId(info[KEY.heroTempId]));
            self.setScaleByName("heroIcon", 0.36);
            self.setInfoByName("heroName", uw.getWarriorByTempId(info[KEY.heroTempId])[uw.t_warrior_name]);
            // 如果是本用户的数据，则使用红色字
            var myId = uw.userDataCtrl.getId();
            if (myId == info[KEY.userId]) {
                self.setColorByName("rank", mo.c3b(255, 0, 0));
                self.setColorByName("name", mo.c3b(255, 0, 0));
                self.setColorByName("heroName", mo.c3b(255, 0, 0));
                self.setColorByName("level", mo.c3b(255, 0, 0));
                self.setColorByName("combat", mo.c3b(255, 0, 0));
            }
            else {
                self.setColorByName("rank", mo.WHITE);
                self.setColorByName("name", mo.WHITE);
                self.setColorByName("heroName", mo.WHITE);
                self.setColorByName("level", mo.WHITE);
                self.setColorByName("combat", mo.WHITE);
            }
        };
        RankHeroItem.__className = "RankHeroItem";
        return RankHeroItem;
    })(mo.GridViewCell);
    uw.RankHeroItem = RankHeroItem;
    RankHeroItem.prototype.__class__ = "uw.RankHeroItem";
})(uw || (uw = {}));

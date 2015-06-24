/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var RankGuildItem = (function (_super) {
        __extends(RankGuildItem, _super);
        function RankGuildItem() {
            _super.call(this);
        }
        var __egretProto__ = RankGuildItem.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiRankGuildItem_ui;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
        };
        __egretProto__.resetByData = function (info, index) {
            var self = this;
            var KEY = uw.dsConsts.GuildRankEntity;
            self.setInfoByName("name", info[KEY.guildName]);
            self.setInfoByName("found", info[KEY.buildValue]);
            self.setInfoByName("level", info[KEY.guildLvl]);
            self.setInfoByName("rank", info[KEY.id]);
            self.setInfoByName("count", info[KEY.menberNum]);
            self.setVisibleByName("touch_panel", index % 2 == 1);
            // 如果是本用户的数据，则使用红色字
            var myId = uw.userDataCtrl.getId();
            if (myId == info["userId"]) {
                self.setColorByName("name", mo.c3b(255, 0, 0));
                self.setColorByName("found", mo.c3b(255, 0, 0));
                self.setColorByName("level", mo.c3b(255, 0, 0));
                self.setColorByName("rank", mo.c3b(255, 0, 0));
                self.setColorByName("count", mo.c3b(255, 0, 0));
            }
            else {
                self.setColorByName("name", mo.WHITE);
                self.setColorByName("found", mo.WHITE);
                self.setColorByName("level", mo.WHITE);
                self.setColorByName("rank", mo.WHITE);
                self.setColorByName("count", mo.WHITE);
            }
        };
        RankGuildItem.__className = "RankGuildItem";
        return RankGuildItem;
    })(mo.GridViewCell);
    uw.RankGuildItem = RankGuildItem;
    RankGuildItem.prototype.__class__ = "uw.RankGuildItem";
})(uw || (uw = {}));

/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ArenaRecordItem = (function (_super) {
        __extends(ArenaRecordItem, _super);
        function ArenaRecordItem() {
            _super.call(this);
        }
        var __egretProto__ = ArenaRecordItem.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiArenaRecordItem_ui;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
        };
        __egretProto__.resetByData = function (info) {
            var arenaRank = uw.dsConsts.ArenaRecordEntity;
            var tempId = info[arenaRank.enemyIcoinId];
            var headPath = uw.getRoleIconByTempId(tempId);
            //遮罩
            this.loadMaskTextureByName("head", res.ui_arena.cov_head_png);
            this.setMaskEnabledByName("head", true);
            this.setInfoByName("head", headPath);
            var time = mo.getBetweenTimeString(info[arenaRank.fightTime], null);
            var borderFrame = uw.getRankBorder(info[arenaRank.enemyRank]);
            this.setInfoByName("border", borderFrame);
            this.setInfoByName("lvl", info[arenaRank.enemyLvl]);
            this.setInfoByName("name", info[arenaRank.enemyName]);
            this.setInfoByName("time", time);
            var isWin = !!info[arenaRank.isWin];
            if (isWin) {
                this.setColorByName("changeRankNum", mo.c3b(134, 220, 41));
            }
            else {
                this.setColorByName("changeRankNum", mo.c3b(217, 36, 57));
            }
            var mark = this.getWidgetByName("mark");
            var result = this.getWidgetByName("result");
            result.setBright(isWin);
            var changeRank = info[arenaRank.changeRank];
            if (changeRank != 0) {
                this.setVisibleByName("changeRankNum", true);
                mark.setVisible(true);
                this.setInfoByName("changeRankNum", info[arenaRank.changeRank]);
                mark.setBright(isWin);
            }
            else {
                this.setVisibleByName("changeRankNum", false);
                mark.setVisible(false);
            }
            this.onClickByName("btnShare", this.menuShare, this, info[arenaRank.id]);
            this.onClickByName("btnReply", this.menuReply, this, info[arenaRank.id]);
            this.enableStrokeByName("lvl", mo.c3b(20, 3, 0), 3);
        };
        __egretProto__.menuShare = function () {
            uw.log("呵呵,分享~");
        };
        __egretProto__.menuReply = function (sender, id) {
            uw.arenaDataCtrl.getRecordById(id, function (data) {
                uw.log(data);
            }, this);
        };
        ArenaRecordItem.__className = "ArenaRecordItem";
        return ArenaRecordItem;
    })(mo.GridViewCell);
    uw.ArenaRecordItem = ArenaRecordItem;
    ArenaRecordItem.prototype.__class__ = "uw.ArenaRecordItem";
})(uw || (uw = {}));

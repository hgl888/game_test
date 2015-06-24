/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ArenaRankItemCell = (function (_super) {
        __extends(ArenaRankItemCell, _super);
        function ArenaRankItemCell() {
            _super.call(this);
        }
        var __egretProto__ = ArenaRankItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiArenaRankItem_ui;
        };
        __egretProto__.resetByData = function (info) {
            var arenaRank = uw.dsConsts.Rank;
            var rankNum = info[arenaRank.rank], medalFrame, borderFrame;
            if (rankNum == 1) {
                medalFrame = res.ui_arena.blk_ranknumgold_png;
            }
            else if (rankNum == 2) {
                medalFrame = res.ui_arena.blk_ranknumcooper_png;
            }
            else {
                medalFrame = res.ui_arena.blk_ranknumnormal_png;
            }
            borderFrame = uw.getRankBorder(rankNum);
            var ui_panel = res.ui_panel;
            var frameName = rankNum <= 3 ? ui_panel.blk9_gold_png : ui_panel.blk9_gold2_png;
            //切换背景
            var bg = this.getWidgetByName("bg");
            bg.bgTexture = frameName;
            this._createLabel("medal", rankNum);
            this.setInfoByName("medal", medalFrame); //金牌
            this.setInfoByName("border", borderFrame); //边框
            this.setInfoByName("name", info[arenaRank.name]); //名字
            this.setInfoByName("guildName", info[arenaRank.guildName]); //公会
            this.setInfoByName("lvl", info[arenaRank.lvl]); //等级
            //遮罩
            this.loadMaskTextureByName("icon", res.ui_arena.cov_head_png);
            this.setMaskEnabledByName("icon", true);
            this.setInfoByName("icon", uw.getRoleIconByTempId(info[arenaRank.iconId])); //头像
            this.enableStrokeByName("lvl", mo.c3b(20, 3, 0), 3);
        };
        __egretProto__._createLabel = function (widgetName, num) {
            var parentWidget = this.getWidgetByName(widgetName);
            var container = parentWidget.getChildByName("arenaRankNum");
            if (!container) {
                container = new egret.Sprite();
                container.anchorX = 0.5;
                container.name = "arenaRankNum";
                container.x = 60;
                container.y = 24;
                parentWidget.addChild(container);
            }
            else {
                container.removeChildren();
            }
            var numStr = num + "", word, frameName, wordWidget;
            for (var i = 0; i < numStr.length; i++) {
                word = numStr[i];
                frameName = mo.formatStr(res.ui_arena.tmp_num_r_png, word);
                wordWidget = mo.UIImage.create();
                wordWidget.setAnchorPoint(0, 0);
                wordWidget.loadTexture(frameName);
                container.addChild(wordWidget);
                wordWidget.setPositionX(30 * i);
            }
        };
        ArenaRankItemCell.__className = "ArenaRankItemCell";
        return ArenaRankItemCell;
    })(mo.GridViewCell);
    uw.ArenaRankItemCell = ArenaRankItemCell;
    ArenaRankItemCell.prototype.__class__ = "uw.ArenaRankItemCell";
})(uw || (uw = {}));

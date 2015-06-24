/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var RankLayer = (function (_super) {
        __extends(RankLayer, _super);
        function RankLayer() {
            _super.apply(this, arguments);
            this._btn = null;
            this._rankType = null;
            this._data = null;
        }
        var __egretProto__ = RankLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiRankLayer_ui;
            self._titleMap = {};
            self._titleMap[uw.RankDataCtrl.TYPE_TOWER] = ["排名", "领主名", "等级", "通关层数", "通关时间"];
            self._titleMap[uw.RankDataCtrl.TYPE_GUILD] = ["排名", "公会", "等级", "建设值", "人数"];
            self._titleMap[uw.RankDataCtrl.TYPE_HERO] = ["排名", "领主名", "英雄", "等级", "战力"];
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            this.setVisibleByName(this.__class.LABEL_NORECORD, false);
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.prototype.init.call(this, args);
            var self = this;
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.NO_BORDER);
            self.onClickByName("btnHelp", this.menuHelp, this);
            self.onClickByName("tb2", this._onTabClick, this); //英雄
            self.onClickByName("tb0", this._onTabClick, this); //守卫塔
            self.onClickByName("tb1", this._onTabClick, this); //公会
            self.onClickByName("btnMyRank", this._onMyRankClick, this);
            self._onTabClick(self.getWidgetByName("tb2"));
        };
        __egretProto__._getMyRank = function (list) {
            var myUserId = uw.userDataCtrl.getId();
            var info;
            for (var i in list) {
                info = list[i];
                if (myUserId == info.userId) {
                    return info.id;
                }
            }
        };
        __egretProto__._onMyRankClick = function () {
            var self = this;
            var rankDataCtrl = uw.rankDataCtrl;
            var aroundRankType = null;
            var msgCode;
            switch (self._rankType) {
                case uw.RankDataCtrl.TYPE_TOWER:
                case uw.RankDataCtrl.TYPE_TOWER_AROUND:
                    aroundRankType = uw.RankDataCtrl.TYPE_TOWER_AROUND;
                    msgCode = uw.id_c_msgCode.notEnterTowerRanks;
                    break;
                case uw.RankDataCtrl.TYPE_GUILD:
                case uw.RankDataCtrl.TYPE_GUILD_AROUND:
                    aroundRankType = uw.RankDataCtrl.TYPE_GUILD_AROUND;
                    msgCode = uw.id_c_msgCode.notEnterGuildRanks;
                    break;
                case uw.RankDataCtrl.TYPE_HERO:
                case uw.RankDataCtrl.TYPE_HERO_AROUND:
                    aroundRankType = uw.RankDataCtrl.TYPE_HERO_AROUND;
                    msgCode = uw.id_c_msgCode.notEnterHeroRanks;
                    break;
            }
            self._rankType = aroundRankType;
            rankDataCtrl.getRanks(aroundRankType, function (list) {
                if (list.length > 0) {
                    var myRank = self._getMyRank(list);
                    var info = list[0];
                    var scrollPercent;
                    self._gridScrollView.stopAutoScrollChildren();
                    if (info.id > self.__class.TOP_NUM) {
                        self._initWithData(list);
                        self.scrollToItem(myRank - info.id + 1);
                    }
                    else {
                        self.scrollToItem(myRank);
                    }
                }
                else {
                    mo.showMsg(msgCode);
                }
                self._btn.setTouchEnabled(true);
            }, self);
        };
        /**
         * 滚动到本榜的相对名次
         * @param rank 名次，从1算起
         */
        __egretProto__.scrollToItem = function (rank) {
            var self = this;
            var cols = 1;
            var visualRowCount = 8;
            var totalRow = Math.ceil(this._data.length / cols);
            var row = rank - 1; //从零算起
            if (row >= visualRowCount) {
                self._gridScrollView.scrollToPercentVertical((row - (visualRowCount - 1)) / (totalRow - visualRowCount) * 100, 0.5, true);
            }
            else {
                self._gridScrollView.scrollToPercentVertical(0, 0.5, true);
            }
            self._gridScrollView.refresh();
        };
        __egretProto__._onTabClick = function (btn) {
            var self = this;
            var rankDataCtrl = uw.rankDataCtrl;
            var name = btn.getName();
            if (self._btn) {
                self._btn.setTouchEnabled(true);
                self._btn.setBright(true);
                self._btn.getWidgetByName("tb_name").setBright(true);
            }
            btn.setTouchEnabled(false);
            btn.setBright(false);
            btn.getWidgetByName("tb_name").setBright(false);
            self._btn = btn;
            if (self._gridScrollView) {
                self._gridScrollView.removeFromParent(true);
                self._gridScrollView.doDtor();
            }
            var cellClass;
            var ranksType = null;
            switch (name) {
                case "tb0":
                    ranksType = uw.RankDataCtrl.TYPE_TOWER;
                    cellClass = uw.RankTowerItem;
                    break;
                case "tb1":
                    ranksType = uw.RankDataCtrl.TYPE_GUILD;
                    cellClass = uw.RankGuildItem;
                    break;
                case "tb2":
                    ranksType = uw.RankDataCtrl.TYPE_HERO;
                    cellClass = uw.RankHeroItem;
                    break;
            }
            self._rankType = ranksType;
            self._createGridScrollView("rank_list", cellClass, 1, this._onCellDataSource);
            rankDataCtrl.getRanks(ranksType, function (list) {
                self._initWithData(list);
                self._setTitleName(ranksType);
                self.setVisibleByName("clickTips", self._rankType != uw.RankDataCtrl.TYPE_HERO);
                self._gridScrollView.stopAutoScrollChildren();
                self._gridScrollView.jumpToTop();
            }, self);
        };
        __egretProto__._setTitleName = function (rankType) {
            var self = this, clazz = self.__class;
            var titlles = self._titleMap[rankType];
            for (var i = 0, li = titlles.length; i < li; i++) {
                self.setInfoByName(mo.formatStr("label_title%s", i), titlles[i]);
            }
        };
        __egretProto__._initWithData = function (data) {
            this._data = data;
            this._gridScrollView.setTotalCount(this._data.length);
            this.setVisibleByName(this.__class.LABEL_NORECORD, data.length == 0);
        };
        __egretProto__._onCellDataSource = function (cell, index) {
            var info = this._data[index];
            cell.resetByData(info, index);
            cell.onClick(this._onCellClick, this);
        };
        __egretProto__._onCellClick = function (cell) {
            var self = this;
            var idx = cell.getIdx();
            var info = self._data[idx];
            var layer;
            switch (self._rankType) {
                case uw.RankDataCtrl.TYPE_TOWER:
                case uw.RankDataCtrl.TYPE_TOWER_AROUND:
                    layer = uw.RankLeaderInfoLayer.create(info);
                    break;
                case uw.RankDataCtrl.TYPE_GUILD:
                case uw.RankDataCtrl.TYPE_GUILD_AROUND:
                    layer = uw.RankGuildInfoLayer.create(info);
                    break;
            }
            if (layer) {
                layer.show();
            }
        };
        __egretProto__.menuHelp = function () {
            var layer = uw.UIHelpLayer.create(res.uiRankRuleLayer_ui);
            layer.show();
        };
        RankLayer.__className = "RankLayer";
        RankLayer.LABEL_NORECORD = "noRecord";
        RankLayer.TOP_NUM = 100;
        return RankLayer;
    })(mo.DisplayLayer);
    uw.RankLayer = RankLayer;
    RankLayer.prototype.__class__ = "uw.RankLayer";
})(uw || (uw = {}));

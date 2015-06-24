/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var RankDataCtrl = (function (_super) {
        __extends(RankDataCtrl, _super);
        function RankDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = RankDataCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._lastHourMap = {};
            self._rankMap = {};
        };
        __egretProto__.init = function (data) {
            _super.prototype.init.call(this, data);
            var self = this;
        };
        /**
         * 获得守卫塔排行
         * @param cb
         * @param target
         */
        __egretProto__.getRanks = function (type, cb, target) {
            var self = this;
            var KEY;
            switch (type) {
                case self.__class.TYPE_TOWER:
                case self.__class.TYPE_TOWER_AROUND:
                    KEY = uw.dsConsts.TowerRankEntity;
                    break;
                case self.__class.TYPE_GUILD:
                case self.__class.TYPE_GUILD_AROUND:
                    KEY = uw.dsConsts.GuildRankEntity;
                    break;
                case self.__class.TYPE_HERO:
                case self.__class.TYPE_HERO_AROUND:
                    KEY = uw.dsConsts.HeroRankEntity;
                    break;
                default:
                    uw.error("未知排行榜类型");
                    break;
            }
            var nowHour = (Date.newDate()).getHours();
            //每隔一个小时刷新一次
            if (!self._rankMap[type] || nowHour > self._lastHourMap[type]) {
                var args = {};
                args[uw.iface.a_rank_getRanks_args.type] = type;
                args[uw.iface.a_rank_getRanks_args.guildId] = uw.userDataCtrl.guildId; //TODO 目前还没有公会id字段。
                mo.request(uw.iface.a_rank_getRanks, args, function (ranks) {
                    self._lastHourMap[type] = nowHour; //设置查询的小时
                    for (var i = 0, li = ranks.length; i < li; i++) {
                        var r = ranks[i];
                        r.id = r[KEY.id];
                        if (r[KEY.userId]) {
                            r.userId = r[KEY.userId];
                        }
                    }
                    self._rankMap[type] = ranks; //保存排行榜
                    cb.call(target, ranks);
                });
            }
            else {
                cb.call(target, self._rankMap[type]);
            }
        };
        /**
         * 获取守卫塔第一名排行
         * @param cb
         * @param target
         */
        __egretProto__.getMaxTowerRank = function (cb, target) {
            mo.request(uw.iface.a_rank_getMaxTowerRank, {}, function (rankData) {
                cb.call(target, rankData);
            });
        };
        RankDataCtrl.__className = "RankDataCtrl";
        RankDataCtrl.TYPE_TOWER = 1; //守卫塔排行前100
        RankDataCtrl.TYPE_TOWER_AROUND = 11; //守卫塔排行自身前后10
        RankDataCtrl.TYPE_GUILD = 2; //公会排行前100
        RankDataCtrl.TYPE_GUILD_AROUND = 22; //公会排行自身前后10
        RankDataCtrl.TYPE_HERO = 3; //英雄排行前100
        RankDataCtrl.TYPE_HERO_AROUND = 33; //英雄排行自身前后10
        return RankDataCtrl;
    })(mo.DataController);
    uw.RankDataCtrl = RankDataCtrl;
    RankDataCtrl.prototype.__class__ = "uw.RankDataCtrl";
    uw.rankDataCtrl = uw.RankDataCtrl.getInstance();
    function testRankDataCtrl(type) {
        uw.rankDataCtrl.getRanks(type, function (list) {
            uw.log(list);
        });
    }
    uw.testRankDataCtrl = testRankDataCtrl;
})(uw || (uw = {}));

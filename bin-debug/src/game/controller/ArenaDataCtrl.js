/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var ArenaDataCtrl = (function (_super) {
        __extends(ArenaDataCtrl, _super);
        function ArenaDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ArenaDataCtrl.prototype;
        __egretProto__.init = function (data) {
            _super.prototype.init.call(this, data);
            var self = this;
            self.arena = null;
            self.fightUsers = null;
            self.allTodayLuckRanks = [];
            self.rank = null;
            self.highRank = null;
            self.arenaCd = null;
            self.diamond4ArenaCd = null;
            self.gold4Reset = null;
            self.rewardLuck = null;
            self.diamond4ResetShop = null;
            self.limitOfitems = null;
            self.time2ResetShop = null;
            self.realTime2ResetShop = null;
            self.enemyHeros = null;
            self.enemySecretSkills = null;
            self.enemyUserId = null;
            //设置成直接属性，易于操作
            var data = this._data;
            var dataKey = uw.dsConsts.ArenaInfo;
            var arenaKey = uw.dsConsts.ArenaEntity;
            var arena = self.arena = data[dataKey.arena]; //用户竞技场实例数据
            self.fightUsers = data[dataKey.fightUsers]; //对战对象
            self.rank = arena[arenaKey.rank]; //排名
            self.highRank = arena[arenaKey.highRank]; //历史最高排名
            //game表相关的配置数据
            var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
            var arenaCfg = c_game[uw.id_c_game.arenaCfg];
            self.arenaCd = arenaCfg[1]; //竞技场挑战冷却时间（秒）
            self.diamond4ArenaCd = arenaCfg[2]; //重置CD的砖石花费
            var arenaCfg = c_game[uw.id_c_game.arenaCfg];
            self.gold4Reset = arenaCfg[3]; //竞技场刷新对手消耗金币数量
            //reward
            self.rewardLuck = [arenaCfg[4], arenaCfg[5]]; //竞技场幸运排行
            var arenaCfg = c_game[uw.id_c_game.arenaCfg];
            self.diamond4ResetShop = arenaCfg[9]; //荣誉商店刷新消耗(钻石)
            self.limitOfitems = arenaCfg[10]; //商店物品上限
            //系统刷新时间（小时）
            self.time2ResetShop = mo.getJSONWithFileNameAndID(uw.cfg_c_open, uw.id_c_open.arenaShop)[uw.c_open_refreshTime] + ":00";
            //TODO 下面的参数是临时的
            self.realTime2ResetShop = mo.getTimeOfToday(10).getTime(); //系统刷新时间（小时），这个是真实的时间戳
            if (data[dataKey.isNew]) {
                var matrix = uw.userDataCtrl.getMatrixByType(uw.c_prop.matrixTypeKey.copy);
                var posKey = uw.dsConsts.HeroEntity.pos;
                var posKeyA = uw.dsConsts.HeroEntity.posArenaA;
                var posKeyD = uw.dsConsts.HeroEntity.posArenaD;
                for (var i = 0, li = matrix.length; i < li; i++) {
                    var heroDataCtrl = matrix[i];
                    var pos = heroDataCtrl.get(posKey);
                    heroDataCtrl.set(posKeyA, pos);
                    heroDataCtrl.set(posKeyD, pos);
                }
            }
        };
        /**
         *
         * @param data [旧最高排名，新最高排名，奖励砖石]
         */
        __egretProto__.setHighRankData = function (data) {
            var self = this;
            this.highRankData = data;
            self.pushNotify(self.__class.ON_HIGHER_RANK, data[1]);
        };
        /**
         *
         * @returns {Array} [旧最高排名，新最高排名，奖励砖石]  如果没有则返回null
         */
        __egretProto__.getHighRankData = function () {
            return this.highRankData;
        };
        /**
         * 处理最高奖励
         */
        __egretProto__.handleHighRankData = function () {
            if (this.highRankData) {
                var diamond = this.highRankData[2];
                uw.userDataCtrl.increaseDiamond(diamond);
                this.highRankData = null;
                var obj = {};
                obj[uw.dsConsts.UseItemInfo.items] = {};
                obj[uw.dsConsts.UseItemInfo.items][uw.c_prop.spItemIdKey.diamond] = diamond;
                uw.showGainTips(obj);
            }
        };
        __egretProto__.addHonor = function (count) {
            uw.userDataCtrl.increaseHonor(count);
        };
        /**
         * 获取对战记录
         */
        __egretProto__.getRecords = function (index, count, cb, target) {
            var args = {};
            var argsKey = uw.iface.a_arena_getRecordList_args;
            args[argsKey.index] = index;
            args[argsKey.count] = count;
            mo.request(uw.iface.a_arena_getRecordList, args, function (ranks) {
                if (cb) {
                    cb.call(target, ranks);
                }
            });
        };
        __egretProto__.getRecordById = function (id, cb, target) {
            var args = {};
            var argsKey = uw.iface.a_arena_getFightData_args;
            args[argsKey.id] = id;
            mo.request(uw.iface.a_arena_getFightData, args, function (data) {
                if (cb) {
                    cb.call(target, data);
                }
            });
        };
        /**
         * 是否在幸运排行榜
         * @param rank
         * @returns {boolean}
         */
        __egretProto__.isInLuckRanks = function (rank) {
            if (this.allTodayLuckRanks.indexOf(rank) > -1) {
                return true;
            }
            return false;
        };
        /**
         * 初始化幸运排行数据
         * @param cb
         * @param target
         */
        __egretProto__.initInLuckRank = function (cb) {
            var self = this;
            self.allTodayLuckRanks.length = 0;
            uw.ArenaDataCtrl._initLuckRanks(function (data) {
                var tList = data[uw.dsConsts.ArenaLuckRank.today];
                for (var i = 0; i < tList.length; i++) {
                    var luckRankData = tList[i];
                    var luckRank = luckRankData[uw.dsConsts.ArenaLuckRankEntity.rank];
                    self.allTodayLuckRanks.push(luckRank);
                }
                if (cb)
                    cb();
            }, self);
        };
        /**
         * 获取幸运排行榜
         * @param cb
         * @param target
         */
        __egretProto__.getLuckRanks = function (cb, target) {
            var self = this;
            var rankKey = uw.dsConsts.ArenaLuckRankEntity.rank;
            var sortFunc = function (a, b) {
                return a[rankKey] > b[rankKey] ? 1 : -1;
            };
            uw.ArenaDataCtrl._initLuckRanks(function (data) {
                var yList = data[uw.dsConsts.ArenaLuckRank.yesterday];
                var tList = data[uw.dsConsts.ArenaLuckRank.today];
                var top3_yList = [], bottom7_yList = [];
                var top3_tList = [], bottom7_tList = [];
                if (yList.length > 0) {
                    for (var i = 0; i < 10; i++) {
                        if (i < 3) {
                            top3_yList.push(yList[i]);
                        }
                        else {
                            bottom7_yList.push(yList[i]);
                        }
                    }
                    top3_yList.sort(sortFunc);
                    bottom7_yList.sort(sortFunc);
                }
                if (tList.length > 0) {
                    for (var i = 0; i < 10; i++) {
                        if (i < 3) {
                            top3_tList.push(tList[i]);
                        }
                        else {
                            bottom7_tList.push(tList[i]);
                        }
                    }
                    top3_tList.sort(sortFunc);
                    bottom7_tList.sort(sortFunc);
                }
                data[uw.dsConsts.ArenaLuckRank.yesterday] = top3_yList.concat(bottom7_yList);
                data[uw.dsConsts.ArenaLuckRank.today] = top3_tList.concat(bottom7_tList);
                cb.call(target, data);
            }, self);
        };
        /**
         * 获取竞技场排行，从第index个数据开始，总共取count条数据。
         * @param index
         * @param count
         * @param cb
         * @param target
         */
        __egretProto__.getRanks = function (index, count, cb, target) {
            var args = {};
            var argsKey = uw.iface.h_user_getArenaRanks_args;
            args[argsKey.index] = index;
            args[argsKey.count] = count;
            mo.request(uw.iface.h_user_getArenaRanks, args, function (ranks) {
                if (cb) {
                    cb.call(target, ranks);
                }
            });
        };
        /**
         * 增加竞技场挑战次数
         * @param cb
         * @param target
         */
        __egretProto__.buyArenaReNum = function (cb, target) {
            var self = this;
            var progress = uw.userDataCtrl.getCopyProgress(uw.c_prop.pCopyIdKey.arena);
            var copyId = progress.firstId;
            progress.buyCopyCount(copyId, function () {
                self.pushNotify(self.__class.ON_BUY_RE_NUM, progress.getCopyTodayLeftCount(copyId));
                if (cb)
                    cb.call(target);
            });
        };
        /**
         * 重置竞技场挑战对手
         * @param cb
         * @param target
         */
        __egretProto__.resetArenaFightRanks = function (cb, target) {
            var self = this;
            //需要校验
            var goldRequired = self.gold4Reset; //重置需要的金币
            if (goldRequired > uw.userDataCtrl.getGold()) {
                return mo.showMsg(uw.id_c_msgCode.noGolds); //TODO 我需要知道金币不足时的提示信息，应该是这个。
            }
            mo.requestWaiting(uw.iface.a_arena_resetArenaFightRanks, function (arenaInfo) {
                self.init(arenaInfo);
                uw.userDataCtrl.reduceGold(goldRequired); //扣除金币
                //是否进入幸运排行
                uw.arenaDataCtrl.initInLuckRank(function () {
                    cb.call(target);
                });
            });
        };
        /**
         * 刷新荣誉商店
         * @param cb
         * @param target
         */
        __egretProto__.resetHonorShop = function (cb, target) {
            uw.shopDataCtrl.refresh(uw.c_prop.shopTypeKey.arena, cb, target);
        };
        /**
         * 购买荣誉物品
         * @param index
         * @param cb
         * @param target
         */
        __egretProto__.buyHonorShopItem = function (index, cb, target) {
            var self = this;
            uw.shopDataCtrl.buy(uw.c_prop.shopTypeKey.arena, index, 1, cb, target);
        };
        /**
         * 战斗前检测
         * @param cb
         * @param target
         */
        __egretProto__.checkBeforeFight = function (cb, target) {
            var self = this;
            var progress = uw.userDataCtrl.getCopyProgress(uw.c_prop.pCopyIdKey.arena);
            if (progress.getCopyTodayLeftCount(progress.firstId) == 0) {
                self.buyArenaReNum(function () {
                    self.checkBeforeFight(cb, target);
                }, self);
                return;
            }
            else {
                var now = Date.newDate();
                if (progress.pTime.isAfter(now)) {
                    progress.resetPCopyCD(cb, target);
                }
                else {
                    cb.call(target);
                }
            }
        };
        /**
         * 重置竞技场挑战cd。
         * @param cb
         * @param target
         */
        __egretProto__.resetCD = function (cb, target) {
            var progress = uw.userDataCtrl.getCopyProgress(uw.c_prop.pCopyIdKey.arena);
            var now = Date.newDate();
            if (progress.pTime.isAfter(now)) {
                progress.resetPCopyCD(cb, target);
            }
            else {
                mo.showMsg("目前竞技场没有cd，不需要重置！");
            }
        };
        ArenaDataCtrl.__className = "BagDataCtrl";
        ArenaDataCtrl.ON_BUY_RE_NUM = "onBuyReNum"; //购买挑战次数
        ArenaDataCtrl.ON_LAST_ATTACK_TIME_CHANGED = "onLastAttackTimeChanged";
        ArenaDataCtrl.ON_HIGHER_RANK = "onHigherRank";
        ArenaDataCtrl._need2RefreshHonorItems = true;
        //+++++幸运排行榜相关 开始++++++++++
        ArenaDataCtrl.luckRanks = null;
        ArenaDataCtrl._need2ReGet = false; //是否需要重新获取
        ArenaDataCtrl._initLuckRanks = function (cb, cbTarget) {
            if (ArenaDataCtrl.luckRanks && !ArenaDataCtrl._need2ReGet) {
                if (cb) {
                    cb.call(cbTarget, ArenaDataCtrl.luckRanks);
                }
                return;
            }
            var nowTime = (Date.newDate()).getTime();
            if (nowTime) {
                ArenaDataCtrl._need2ReGet = true;
            }
            mo.request(uw.iface.h_user_getArenaLuckRanks, function (list) {
                ArenaDataCtrl.luckRanks = list;
                if (cb) {
                    cb.call(cbTarget, list);
                }
            });
        };
        ArenaDataCtrl.initByServer = function (cb) {
            mo.request(uw.iface.a_arena_getArena, function (arenaInfo) {
                if (uw.arenaDataCtrl) {
                    uw.arenaDataCtrl.init(arenaInfo);
                }
                else {
                    uw.arenaDataCtrl = uw.ArenaDataCtrl.create(arenaInfo);
                }
                //是否进入幸运排行
                uw.arenaDataCtrl.initInLuckRank(function () {
                    if (cb)
                        cb();
                });
            });
        };
        return ArenaDataCtrl;
    })(mo.DataController);
    uw.ArenaDataCtrl = ArenaDataCtrl;
    ArenaDataCtrl.prototype.__class__ = "uw.ArenaDataCtrl";
    uw.arenaDataCtrl;
})(uw || (uw = {}));

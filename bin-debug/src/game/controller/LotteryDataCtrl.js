/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var LotteryDataCtrl = (function (_super) {
        __extends(LotteryDataCtrl, _super);
        function LotteryDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = LotteryDataCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.DATA_KEY = uw.dsConsts.LotteryEntity;
        };
        __egretProto__.init = function (data) {
            _super.prototype.init.call(this, data);
            var self = this;
            var lotteryEntity = uw.dsConsts.LotteryEntity;
            self.goldCount = data[lotteryEntity.goldCount]; //金币抽奖次数
            self.diamondCount = data[lotteryEntity.diamondCount]; //砖石抽奖次数
            self.userId = data[lotteryEntity.userId];
            self.goldTodayCount = data[lotteryEntity.goldTodayCount] = data[lotteryEntity.goldTodayCount] || 0;
            data[lotteryEntity.goldRefreshTime] = Date.newDate(data[lotteryEntity.goldRefreshTime]);
            self.goldRefreshTime = data[lotteryEntity.goldRefreshTime];
            data[lotteryEntity.goldCDOverTime] = Date.newDate(data[lotteryEntity.goldCDOverTime]);
            self.goldCDOverTime = data[lotteryEntity.goldCDOverTime];
            data[lotteryEntity.diamondCDOverTime] = Date.newDate(data[lotteryEntity.diamondCDOverTime]);
            self.diamondCDOverTime = data[lotteryEntity.diamondCDOverTime];
            var c_game_data = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.lotteryCfg);
            self.gold = c_game_data[0]; //金币抽奖消耗金币
            self.diamond = c_game_data[1]; //钻石抽奖消耗钻石
            self.diamondForVip = c_game_data[2]; //VIP抽奖消耗钻石
            self.xLottery = c_game_data[3]; //第X次出现特殊抽奖
            self.maxReGoldNum = c_game_data[4]; //金币抽奖免费次数
            self.goldCdTime = c_game_data[5]; //金币免费抽奖CD（分钟）
            self.diamondCdTime = c_game_data[6]; //钻石免费抽奖CD（分钟）
            self.goldForTen = c_game_data[7]; //金币十连抽消耗金币；
            self.diamondForTen = c_game_data[8]; //钻石十连抽消耗钻石
        };
        /**
         * 获取今日金币抽奖次数。
         * @returns {*}
         */
        __egretProto__.getGoldLotteryTodayCount = function () {
            var self = this;
            var data = this._data;
            var KEY = uw.dsConsts.LotteryEntity;
            return uw.getTodayCount(self.goldRefreshTime, function (needToRefresh, ft) {
                if (needToRefresh) {
                    self.goldTodayCount = data[KEY.goldTodayCount] = 0; //今日购买次数
                    self.goldRefreshTime = data[KEY.goldRefreshTime] = ft; //次数重置时间
                    self.goldCDOverTime = data[KEY.goldCDOverTime] = Date.newDate(); //cd时间
                }
                return self.goldTodayCount;
            });
        };
        /**
         * 添加今日金币抽奖次数。
         */
        __egretProto__.addGoldLotteryTodayCount = function () {
            var self = this;
            var c = self.getGoldLotteryTodayCount();
            self.goldTodayCount = self._data[uw.dsConsts.LotteryEntity.goldTodayCount] = c + 1;
            //这时候肯定需要更新cd时间
            var cdOverTime = Date.newDate();
            cdOverTime.addMinutes(self.goldCdTime);
            self.goldCDOverTime = self._data[self.DATA_KEY.goldCDOverTime] = cdOverTime;
        };
        /**
         * 是否金币免费抽奖cd时间已经冷却。
         * @returns {boolean}
         */
        __egretProto__.isGoldLotteryCDOver = function () {
            var self = this;
            self.getGoldLotteryTodayCount(); //这个是为了优先触发更新
            var time = self.goldCDOverTime;
            var now = Date.newDate();
            if (now.isBefore(time))
                return false; //还没到cd冷却时间，不免费
            return true;
        };
        /**
         * 是否砖石免费抽奖cd时间已经冷却。
         * @returns {boolean}
         */
        __egretProto__.isDiamondLotteryCDOver = function () {
            var self = this;
            var time = self.diamondCDOverTime;
            var now = Date.newDate();
            if (now.isBefore(time))
                return false; //还没到cd冷却时间，不免费
            return true;
        };
        __egretProto__.canGetFree = function () {
            var self = this;
            var todayCount = self.getGoldLotteryTodayCount(); //今日抽奖次数
            if (self.maxReGoldNum > todayCount && self.isGoldLotteryCDOver())
                return true;
            return self.isDiamondLotteryCDOver();
        };
        /**
         * 摇奖一次
         * @param type
         * @param cb
         * @param target
         */
        __egretProto__.takeOnce = function (type, cb, target) {
            var self = this;
            var goldToReduce = 0, diamondToReduce = 0;
            //先判断类型
            if (type == self.__class.TYPE_GOLD) {
                var todayCount = self.getGoldLotteryTodayCount(); //今日抽奖次数
                if (self.maxReGoldNum > todayCount && self.isGoldLotteryCDOver()) {
                }
                else {
                    //判断金币是否够
                    goldToReduce = self.gold;
                    if (goldToReduce > uw.userDataCtrl.getGold()) {
                        return mo.showMsg(uw.id_c_msgCode.noGolds); //金币不足
                    }
                }
            }
            else if (type == self.__class.TYPE_DIAMOND) {
                //先判断下是不是免费抽奖
                if (self.isDiamondLotteryCDOver()) {
                }
                else {
                    //判断钻石是否够
                    diamondToReduce = self.diamond;
                    if (diamondToReduce > uw.userDataCtrl.getDiamond()) {
                        return mo.showMsg(uw.id_c_msgCode.noDiamond); //钻石不足
                    }
                }
            }
            else
                throw "摇奖类型错误：" + type;
            var args = {};
            var argsKey = uw.iface.a_lottery_takeOne_args;
            args[argsKey.type] = type; //1:金币抽奖 2：钻石抽奖
            mo.requestWaiting(uw.iface.a_lottery_takeOne, args, function (useItemInfos) {
                uw.userDataCtrl.reduceGold(goldToReduce); //扣除金钱
                uw.userDataCtrl.reduceDiamond(diamondToReduce); //扣除砖石
                //先判断类型
                if (type == self.__class.TYPE_GOLD && goldToReduce == 0) {
                    self.addGoldLotteryTodayCount();
                    self.pushNotify(self.__class.ON_GOLD_LAST_TIME_CHANGED);
                }
                else if (type == self.__class.TYPE_DIAMOND && diamondToReduce == 0) {
                    //设置钻石cd时间
                    var cdOverTime = Date.newDate();
                    cdOverTime.addMinutes(self.diamondCdTime);
                    self.diamondCDOverTime = self._data[self.DATA_KEY.diamondCDOverTime] = cdOverTime;
                    self.pushNotify(self.__class.ON_DIAMOND_LAST_TIME_CHANGED);
                }
                for (var i = 0, li = useItemInfos.length; i < li; i++) {
                    uw.userDataCtrl.handleUseItemInfo(useItemInfos[i]);
                }
                if (cb) {
                    cb.call(target, useItemInfos);
                }
            });
        };
        /**
         * 摇奖十次
         * @param type
         * @param cb
         * @param target
         */
        __egretProto__.takeTenTimes = function (type, cb, target) {
            var self = this;
            var goldToReduce = 0, diamondToReduce = 0;
            //先判断类型
            if (type == self.__class.TYPE_GOLD) {
                //判断金币是否够
                goldToReduce = self.goldForTen;
                if (goldToReduce > uw.userDataCtrl.getGold()) {
                    return mo.showMsg(uw.id_c_msgCode.noGolds); //金币不足
                }
            }
            else if (type == self.__class.TYPE_DIAMOND) {
                //判断钻石是否够
                diamondToReduce = self.diamondForTen;
                if (diamondToReduce > uw.userDataCtrl.getDiamond()) {
                    return mo.showMsg(uw.id_c_msgCode.noDiamond); //钻石不足
                }
            }
            else
                throw "摇奖类型错误：" + type;
            var args = {};
            var argsKey = uw.iface.a_lottery_takeTen_args;
            args[argsKey.type] = type; //1:金币抽奖 2：钻石抽奖
            mo.requestWaiting(uw.iface.a_lottery_takeTen, args, function (useItemInfos) {
                uw.userDataCtrl.reduceGold(goldToReduce); //扣除金钱
                uw.userDataCtrl.reduceDiamond(diamondToReduce); //扣除砖石
                for (var i = 0, li = useItemInfos.length; i < li; i++) {
                    uw.userDataCtrl.handleUseItemInfo(useItemInfos[i]);
                }
                //打乱顺序
                useItemInfos.sort(function () {
                    return 0.5 - Math.random();
                });
                if (cb) {
                    cb.call(target, useItemInfos);
                }
            });
        };
        LotteryDataCtrl.__className = "LotteryDataCtrl";
        LotteryDataCtrl.TYPE_GOLD = 1;
        LotteryDataCtrl.TYPE_DIAMOND = 2;
        LotteryDataCtrl.ONCE = 10011;
        LotteryDataCtrl.TEN_TIMES = 10012;
        LotteryDataCtrl.ON_GOLD_LAST_TIME_CHANGED = "onGoldLastTimeChanged";
        LotteryDataCtrl.ON_DIAMOND_LAST_TIME_CHANGED = "onDiamondLastTimeChanged";
        /**
         * 抽奖信息
         * @param cb
         * @param cbTarget
         */
        LotteryDataCtrl.initByServer = function (cb, cbTarget) {
            mo.request(uw.iface.a_lottery_getInfo, function (lotteryInfo) {
                uw.lotteryDataCtrl = uw.LotteryDataCtrl.getInstance(lotteryInfo);
                if (cb) {
                    cb.call(cbTarget);
                }
            });
        };
        return LotteryDataCtrl;
    })(mo.DataController);
    uw.LotteryDataCtrl = LotteryDataCtrl;
    LotteryDataCtrl.prototype.__class__ = "uw.LotteryDataCtrl";
    uw.lotteryDataCtrl;
})(uw || (uw = {}));

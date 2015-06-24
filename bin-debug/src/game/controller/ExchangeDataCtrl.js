/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var ExchangeDataCtrl = (function (_super) {
        __extends(ExchangeDataCtrl, _super);
        function ExchangeDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ExchangeDataCtrl.prototype;
        __egretProto__.init = function (data) {
            _super.prototype.init.call(this, data);
            var self = this;
            var KEY = uw.dsConsts.ExchangeEntity;
            self.lastTime = Date.newDate(data[KEY.lastTime]); //转换成时间对象
            self.refreshTime = Date.newDate(data[KEY.refreshTime]); //转换成时间对象
            data[KEY.items] = data[KEY.items] || {};
            data[KEY.dailyItems] = data[KEY.dailyItems] || {};
        };
        /**
         * 根据兑换的类型获取兑换信息列表。
         * @param type  见c_prop
         * @returns {Array}
         */
        __egretProto__.getItemsByType = function (type) {
            var c_exchange = mo.getJSONWithFileName(uw.cfg_c_exchange);
            var arr = [];
            var curLvl = uw.userDataCtrl.getLvl();
            for (var exchangeId in c_exchange) {
                var temp = c_exchange[exchangeId];
                if (temp[uw.c_exchange_type] == type && curLvl >= temp[uw.c_exchange_lvlRequired]) {
                    arr.push(temp);
                }
            }
            return arr;
        };
        __egretProto__._refreshDaily = function () {
            var self = this;
            var KEY = uw.dsConsts.ExchangeEntity;
            uw.handleTodayRefresh(self.refreshTime, function (needToRefresh, ft) {
                if (needToRefresh) {
                    self._data[KEY.dailyItems] = {};
                    self._data[KEY.refreshTime] = ft;
                    self.refreshTime = ft;
                }
            });
        };
        /**
         * 获取兑换状态——0:不可兑换；1:可兑换；2:已兑换；
         * @param exchangeId
         * @returns {number}
         */
        __egretProto__.getExchangeState = function (exchangeId) {
            var self = this;
            self._refreshDaily();
            var c_exchange = mo.getJSONWithFileName(uw.cfg_c_exchange);
            var temp = c_exchange[exchangeId];
            var count = temp[uw.c_exchange_count]; //可兑换次数
            var stuffs = temp[uw.c_exchange_stuffs]; //需要的材料
            var KEY = uw.dsConsts.ExchangeEntity;
            var items = self._data[KEY.items];
            var dailyItems = self._data[KEY.dailyItems];
            if (count == -1 && items[exchangeId])
                return self.__class.EXCHANGED; //只允许兑换一次, 已兑换
            if (count > 0 && dailyItems[exchangeId] >= count)
                return self.__class.EXCHANGED; //已经达到今日兑换上限
            for (var stuffId in stuffs) {
                if (stuffs[stuffId] > uw.userDataCtrl.getItemNum(stuffId))
                    return self.__class.NOT_EXCHANGABLE; //材料不足，不能兑换
            }
            return self.__class.EXCHANGABLE;
        };
        /**
         * 获取兑换接口的option。
         * @param exchangeId
         * @returns {{itemId: *, itemCount: *, stuffs: *, stuffArr: Array, isStuffEnough: boolean}}
         */
        __egretProto__.getExchangeOpt = function (exchangeId, count) {
            if (count === void 0) { count = null; }
            count = count || 1;
            var exchangeTemp = mo.getJSONWithFileNameAndID(uw.cfg_c_exchange, exchangeId);
            var item = exchangeTemp[uw.c_exchange_item];
            var itemId;
            for (var id in item) {
                itemId = id;
                break;
            }
            var itemCount = exchangeTemp[uw.c_exchange_count] == 0 ? count : item[itemId];
            //购买一次所需材料
            var stuffs = exchangeTemp[uw.c_exchange_stuffs];
            var stuffArr = [];
            var stuffTotal = {};
            var isStuffEnough = true;
            for (var stuffId in stuffs) {
                var required = stuffs[stuffId] * count;
                var cur = uw.userDataCtrl.getItemNum(stuffId);
                isStuffEnough = isStuffEnough && cur >= required;
                stuffArr.push({
                    itemId: stuffId,
                    curNum: cur,
                    requiredNum: required,
                    enough: (cur >= required)
                });
                stuffTotal[stuffId] = required;
            }
            return {
                exchangeId: exchangeId,
                itemId: itemId,
                itemCount: itemCount,
                stuffTotal: stuffTotal,
                stuffArr: stuffArr,
                isStuffEnough: isStuffEnough,
                count: count //调用兑换接口所传的数量
            };
        };
        /**
         * 兑换接口
         * @param {{itemId: *, itemCount: *, stuffs: *, stuffArr: Array, isStuffEnough: boolean}} opt
         * @param cb
         * @param target
         */
        __egretProto__.exchange = function (opt, cb, target) {
            var self = this;
            var exchangeId = opt.exchangeId;
            var args = {};
            args[uw.iface.a_exchange_exchange_args.exchangeId] = exchangeId;
            args[uw.iface.a_exchange_exchange_args.count] = opt.count;
            mo.requestWaiting(uw.iface.a_exchange_exchange, args, function (useItemInfo) {
                self.lastTime = Date.newDate(); //设置上次兑换时间为现在
                var KEY = uw.dsConsts.ExchangeEntity;
                self._data[KEY.items][exchangeId] = (self._data[KEY.items][exchangeId] || 0) + 1; //兑换次数+1
                self._data[KEY.dailyItems][exchangeId] = (self._data[KEY.dailyItems][exchangeId] || 0) + 1; //今日次数+1
                uw.userDataCtrl.reduceItems(opt.stuffTotal); //扣除材料
                uw.userDataCtrl.handleUseItemInfo(useItemInfo); //进行结果保存
                if (cb)
                    cb.call(target, useItemInfo);
            });
        };
        /**
         * 是否有物品可以兑换。
         * @returns {boolean}
         */
        __egretProto__.hasItemToExchange = function () {
            var self = this;
            if (!uw.verifyLevel(uw.id_c_open.fragmentSynthesis, false))
                return false;
            var arr = self.getItemsByType(uw.c_prop.exchangeTypeKey.daily); //每日兑换
            arr = arr.concat(self.getItemsByType(uw.c_prop.exchangeTypeKey.wish)); //祝福
            for (var i = 0, li = arr.length; i < li; i++) {
                var exchangeId = arr[i][uw.c_exchange_id];
                if (self.getExchangeState(exchangeId) == self.__class.EXCHANGABLE) {
                    var opt = self.getExchangeOpt(exchangeId);
                    if (opt.isStuffEnough)
                        return true;
                }
            }
            return false;
        };
        ExchangeDataCtrl.__className = "ExchangeDataCtrl";
        ExchangeDataCtrl.ON_RESET_DAILY = "oResetDaily"; //每日重置
        ExchangeDataCtrl.NOT_EXCHANGABLE = 0; // 不可兑换
        ExchangeDataCtrl.EXCHANGABLE = 1; // 可兑换
        ExchangeDataCtrl.EXCHANGED = 2; // 已兑换
        ExchangeDataCtrl.initByServer = function (cb, target) {
            if (target === void 0) { target = null; }
            mo.request(uw.iface.a_exchange_getInfo, function (data) {
                uw.exchangeDataCtrl = uw.ExchangeDataCtrl.getInstance(data || {});
                if (cb)
                    cb.call(target);
            });
        };
        return ExchangeDataCtrl;
    })(mo.DataController);
    uw.ExchangeDataCtrl = ExchangeDataCtrl;
    ExchangeDataCtrl.prototype.__class__ = "uw.ExchangeDataCtrl";
    uw.exchangeDataCtrl;
})(uw || (uw = {}));

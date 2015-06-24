/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var ShopDataCtrl = (function (_super) {
        __extends(ShopDataCtrl, _super);
        function ShopDataCtrl() {
            _super.apply(this, arguments);
            this._idKey = uw.dsConsts.ShopEntity.userId;
        }
        var __egretProto__ = ShopDataCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._initKeyMap();
            self._initRefreshTimeMap();
            self.stateMap = {};
            self._jobMap = {};
            self._triggerMap = {};
            self._triggerTargetMap = {};
            self.traderStatus = {};
            self.traderStatus[uw.c_prop.shopTypeKey.secret1] = false;
            self.traderStatus[uw.c_prop.shopTypeKey.secret2] = false;
        };
        __egretProto__.init = function (data) {
            _super.prototype.init.call(this, data);
            var self = this;
            var keyMap = self.keyMap_lastTime;
            for (var key in keyMap) {
                var realKey = keyMap[key];
                var lastTime = data[realKey];
                if (lastTime)
                    data[realKey] = Date.newDate(lastTime);
            }
            self.updateTraderStatus();
        };
        __egretProto__.updateTraderStatus = function () {
            var self = this;
            self.traderStatus[uw.c_prop.shopTypeKey.secret1] = self.secretShop1Exist();
            self.traderStatus[uw.c_prop.shopTypeKey.secret2] = self.secretShop2Exist();
        };
        __egretProto__._initKeyMap = function () {
            var self = this;
            var KEY = uw.dsConsts.ShopEntity;
            var shopTypeKey = uw.c_prop.shopTypeKey;
            self.keyMap_items = {};
            self.keyMap_lastTime = {};
            self.keyMap_refreshCount = {};
            self.keyMap_refreshCountResetTime = {};
            self.openIdMap = {};
            self.keyMap_items[shopTypeKey.normal] = KEY.items1;
            self.keyMap_items[shopTypeKey.secret1] = KEY.items2;
            self.keyMap_items[shopTypeKey.secret2] = KEY.items3;
            self.keyMap_items[shopTypeKey.arena] = KEY.items4;
            self.keyMap_items[shopTypeKey.tower] = KEY.items5;
            self.keyMap_lastTime[shopTypeKey.normal] = KEY.lastTime1;
            self.keyMap_lastTime[shopTypeKey.secret1] = KEY.lastTime2;
            self.keyMap_lastTime[shopTypeKey.secret2] = KEY.lastTime3;
            self.keyMap_lastTime[shopTypeKey.arena] = KEY.lastTime4;
            self.keyMap_lastTime[shopTypeKey.tower] = KEY.lastTime5;
            self.keyMap_refreshCount[shopTypeKey.normal] = KEY.refreshCount1;
            self.keyMap_refreshCount[shopTypeKey.secret1] = KEY.refreshCount2;
            self.keyMap_refreshCount[shopTypeKey.secret2] = KEY.refreshCount3;
            self.keyMap_refreshCount[shopTypeKey.arena] = KEY.refreshCount4;
            self.keyMap_refreshCount[shopTypeKey.tower] = KEY.refreshCount5;
            self.keyMap_refreshCountResetTime[shopTypeKey.normal] = KEY.refreshCountResetTime1;
            self.keyMap_refreshCountResetTime[shopTypeKey.secret1] = KEY.refreshCountResetTime2;
            self.keyMap_refreshCountResetTime[shopTypeKey.secret2] = KEY.refreshCountResetTime3;
            self.keyMap_refreshCountResetTime[shopTypeKey.arena] = KEY.refreshCountResetTime4;
            self.keyMap_refreshCountResetTime[shopTypeKey.tower] = KEY.refreshCountResetTime5;
            self.openIdMap[shopTypeKey.normal] = uw.id_c_open.shop;
            self.openIdMap[shopTypeKey.secret1] = uw.id_c_open.secretShop1;
            self.openIdMap[shopTypeKey.secret2] = uw.id_c_open.secretShop2;
            self.openIdMap[shopTypeKey.arena] = uw.id_c_open.arenaShop;
            self.openIdMap[shopTypeKey.tower] = uw.id_c_open.towerShop;
        };
        __egretProto__._initRefreshTimeMap = function () {
            var self = this;
            var shopTypeKey = uw.c_prop.shopTypeKey;
            var c_open = mo.getJSONWithFileName(uw.cfg_c_open);
            self.refreshTimeMap = {};
            for (var key in shopTypeKey) {
                var type = shopTypeKey[key];
                var refreshTimeStr = c_open[self.openIdMap[type]][uw.c_open_refreshTime] + "";
                var strArr = refreshTimeStr.split(",");
                var arr = [];
                for (var i = 0, li = strArr.length; i < li; i++) {
                    arr.push(parseInt(strArr[i]));
                }
                self.refreshTimeMap[type] = arr;
            }
        };
        //添加触发器
        __egretProto__.addTrigger = function (type, cb, target) {
            this._triggerMap[type] = cb;
            this._triggerTargetMap[type] = target;
        };
        //移除所有的触发器
        __egretProto__.removeAllTriggers = function () {
            var self = this;
            for (var i = 0, li = self._jobMap.length; i < li; i++) {
                var job = self._jobMap[i];
                job.stop();
            }
            this._triggerMap = {};
            this._triggerTargetMap = {};
        };
        //判断是否需要更新
        __egretProto__._needToUpdate = function (type) {
            var self = this;
            var lastGetTime = self._data[self.keyMap_lastTime[type]];
            if (!lastGetTime)
                return true;
            var arr = self.refreshTimeMap[type];
            return mo.needToRefresh(arr, lastGetTime);
        };
        //为刷新设置倒计时
        __egretProto__._startCountdown = function (type) {
            var self = this;
            if (self._jobMap[type])
                return self._jobMap[type].start(); //如果已经设置了，就直接返回
            var c_open = mo.getJSONWithFileName(uw.cfg_c_open);
            var refreshTimeStr = c_open[self.openIdMap[type]][uw.c_open_refreshTime];
            var cronStr = mo.formatStr("0 0 %s * * *", refreshTimeStr);
            var job = self._jobMap[type] = new CronJob(cronStr, function () {
                uw.log("商店定时器【%s】被触发！！！", this.type);
                var trigger = self._triggerMap[this.type];
                if (trigger)
                    trigger.call(self._triggerTargetMap[this.type]);
            }.bind({ type: type }));
            job.start();
        };
        /**
         * 获取商店物品列表
         * @param type
         * @param cb
         * @param target
         * @returns {*|Array|Object|Session|Mixed|String}
         */
        __egretProto__.getItems = function (type, cb, target) {
            var self = this;
            //+++++++++++++++++++处理神秘商店 开始++++++++++++++++++
            var shopTypeKey = uw.c_prop.shopTypeKey;
            var KEY = uw.dsConsts.ShopEntity;
            var now = Date.newDate();
            if (type == shopTypeKey.secret1) {
                var c_vip = mo.getJSONWithFileName(uw.cfg_c_vip);
                var vip = uw.userDataCtrl.getVip();
                if (!c_vip[vip][uw.c_vip_isChapman]) {
                    var disappearTime2 = self._data[KEY.disappearTime2];
                    if (!disappearTime2)
                        return cb.call(target, []);
                    if (typeof disappearTime2 == "string") {
                        disappearTime2 = self._data[KEY.disappearTime2] = Date.newDate(disappearTime2);
                    }
                    if (now.isAfter(disappearTime2))
                        return cb.call(target, []);
                }
            }
            else if (type == shopTypeKey.secret2) {
                var disappearTime3 = self._data[KEY.disappearTime3];
                if (!disappearTime3)
                    return cb.call(target, []);
                if (typeof disappearTime3 == "string") {
                    disappearTime3 = self._data[KEY.disappearTime3] = Date.newDate(disappearTime3);
                }
                if (now.isAfter(disappearTime3))
                    return cb.call(target, []);
                else
                    return cb.call(target, self._transItems(type));
            }
            else if (type == shopTypeKey.tower) {
                return cb.call(target, self._getTowerShopItems());
            }
            //+++++++++++++++++++守卫塔 结束++++++++++++++++++
            if (!self._needToUpdate(type)) {
                self._startCountdown(type); //开启下一刷新时间点的倒计时
                return cb.call(target, self._transItems(type));
            }
            var args = {};
            var argsKey = uw.iface.a_shop_getItems_args;
            args[argsKey.type] = type;
            mo.requestWaiting(uw.iface.a_shop_getItems, args, function (entity) {
                //更新值
                self.init(entity);
                self._startCountdown(type); //开启下一刷新时间点的倒计时
                cb.call(target, self._transItems(type));
            });
        };
        __egretProto__._getTowerShopItems = function () {
            var self = this, towerDataCtrl = uw.towerDataCtrl;
            var shopItemInfoArr = [];
            var shopItems = [];
            var c_shop = mo.getJSONWithFileName(uw.cfg_c_shop);
            var t_item = mo.getJSONWithFileName(uw.cfg_t_item);
            var shopTypeKey = uw.c_prop.shopTypeKey;
            var startId = shopTypeKey.tower * 1000;
            for (var i = startId; i < startId + 1000; i++) {
                var locShopData = c_shop[i];
                if (!locShopData)
                    break;
                var locShopItems = locShopData[uw.c_shop_items];
                var locShopItem = locShopItems[0];
                if (!locShopItem)
                    continue;
                //才可以购买
                var itemData = t_item[locShopItem[0]];
                var copyId = itemData[uw.t_item_copyIds][0];
                var startCopyId = towerDataCtrl.towerConfig[0];
                var highCopyId = startCopyId + towerDataCtrl.getHighLayer();
                var canSale = copyId < highCopyId ? 0 : 1; //打过不限制出售
                var itemInfoKey = uw.c_prop.shopItemInfoKey;
                var tempArr = [];
                tempArr[itemInfoKey.itemId] = locShopItem[0];
                tempArr[itemInfoKey.itemNum] = locShopItem[1];
                tempArr[itemInfoKey.unitId] = locShopItem[3];
                tempArr[itemInfoKey.price] = locShopItem[4] * locShopItem[1];
                tempArr[itemInfoKey.isSold] = canSale;
                shopItems.push(tempArr);
                shopItemInfoArr.push(self.__transItem(shopTypeKey.tower, shopItemInfoArr.length, tempArr));
            }
            var itemsKey = self.keyMap_items[shopTypeKey.tower];
            self.set(itemsKey, shopItems);
            return shopItemInfoArr;
        };
        __egretProto__._transItems = function (type) {
            var self = this;
            var items = self.get(self.keyMap_items[type]);
            var results = [];
            for (var i = 0, li = items.length; i < li; i++) {
                results.push(self._transItem(type, i));
            }
            return results;
        };
        __egretProto__._transItem = function (type, index) {
            var self = this;
            var items = self.get(self.keyMap_items[type]);
            var info = items[index];
            return self.__transItem(type, index, info);
        };
        __egretProto__.__transItem = function (type, index, info) {
            var shopItemInfoKey = uw.c_prop.shopItemInfoKey;
            return {
                index: index,
                type: type,
                itemId: info[shopItemInfoKey.itemId],
                itemNum: info[shopItemInfoKey.itemNum],
                unitId: info[shopItemInfoKey.unitId],
                price: info[shopItemInfoKey.price],
                isSold: info[shopItemInfoKey.isSold]
            };
        };
        /**
         * 购买物品
         * @param type  商店类型
         * @param index 物品所在下标
         * @param num 数量 （守卫塔是可以改变购买数量的）
         * @param cb
         * @param target
         */
        __egretProto__.buy = function (type, index, num, cb, target) {
            var self = this, isLimitSold = true;
            //+++++++++++++++++++处理神秘商店 开始++++++++++++++++++
            var shopTypeKey = uw.c_prop.shopTypeKey;
            var KEY = uw.dsConsts.ShopEntity;
            var now = Date.newDate();
            if (type == shopTypeKey.secret1) {
                var c_vip = mo.getJSONWithFileName(uw.cfg_c_vip);
                var vip = uw.userDataCtrl.getVip();
                if (!c_vip[vip][uw.c_vip_isChapman]) {
                    var disappearTime2 = self._data[KEY.disappearTime2];
                    if (!disappearTime2)
                        return mo.showMsg("神秘商店1已经消失！");
                    if (typeof disappearTime2 == "string") {
                        disappearTime2 = self._data[KEY.disappearTime2] = Date.newDate(disappearTime2);
                    }
                    if (now.isAfter(disappearTime2))
                        return mo.showMsg("神秘商店1已经消失！");
                }
            }
            else if (type == shopTypeKey.secret2) {
                var disappearTime3 = self._data[KEY.disappearTime3];
                if (!disappearTime3)
                    return mo.showMsg("神秘商店2已经消失！");
                if (typeof disappearTime3 == "string") {
                    disappearTime3 = self._data[KEY.disappearTime3] = Date.newDate(disappearTime3);
                }
                if (now.isAfter(disappearTime3))
                    return mo.showMsg("神秘商店2已经消失！");
            }
            else if (type == shopTypeKey.tower) {
                isLimitSold = false;
            }
            //+++++++++++++++++++守卫塔 结束++++++++++++++++++
            var itemsKey = self.keyMap_items[type];
            var itemInfo = self.get(itemsKey)[index];
            var shopItemInfoKey = uw.c_prop.shopItemInfoKey;
            var isSold = itemInfo[shopItemInfoKey.isSold];
            if (isSold)
                return mo.showMsg("已经购买够了不能再进行购买，这个不需要msgCode!");
            //判断是否有足够的钱或者钻石进行购买
            var totalPrice = itemInfo[shopItemInfoKey.price];
            var unitId = itemInfo[shopItemInfoKey.unitId];
            var goldToReduce = 0, diamondToReduce = 0, towerPointsToReduce = 0, honorToReduce = 0;
            if (unitId == uw.c_prop.spItemIdKey.gold) {
                if (totalPrice > uw.userDataCtrl.getGold())
                    return mo.showMsg(uw.id_c_msgCode.noGolds);
                goldToReduce = totalPrice;
            }
            else if (unitId == uw.c_prop.spItemIdKey.diamond) {
                if (totalPrice > uw.userDataCtrl.getDiamond())
                    return mo.showMsg(uw.id_c_msgCode.noDiamond);
                diamondToReduce = totalPrice;
            }
            else if (unitId == uw.c_prop.spItemIdKey.towerPoints) {
                if (totalPrice > uw.userDataCtrl.getTowerPoints())
                    return mo.showMsg(uw.id_c_msgCode.noIntegral);
                towerPointsToReduce = totalPrice * num;
            }
            else if (unitId == uw.c_prop.spItemIdKey.honor) {
                if (totalPrice > uw.userDataCtrl.getHonor())
                    return mo.showMsg(uw.id_c_msgCode.noHonor);
                honorToReduce = totalPrice;
            }
            else {
                return mo.showMsg("金币单位配置错误！");
            }
            var args = {};
            var argsKey = uw.iface.a_shop_buy_args;
            args[argsKey.type] = type;
            args[argsKey.index] = index;
            args[argsKey.num] = num;
            mo.requestWaiting(uw.iface.a_shop_buy, args, function (useItemInfo) {
                uw.userDataCtrl.reduceGold(goldToReduce); //扣减金币
                uw.userDataCtrl.reduceDiamond(diamondToReduce); //扣减钻石
                uw.userDataCtrl.reduceTowerPoints(towerPointsToReduce); //扣减守卫塔积分
                uw.userDataCtrl.reduceHonor(honorToReduce); //扣减竞技场荣誉值
                uw.userDataCtrl.handleUseItemInfo(useItemInfo); //进行结果保存
                if (isLimitSold)
                    itemInfo[shopItemInfoKey.isSold] = 1; //如果限制购买。设置成已经购买成功
                uw.showGainTips(useItemInfo);
                if (cb)
                    cb.call(target);
                self.pushNotify(self.__class.ON_SHOP_ITEM_SOLD, index);
            });
        };
        __egretProto__.getTodayRefreshCount = function (type) {
            var self = this;
            var KEY = uw.dsConsts.ShopEntity;
            var shopReshCountResetHour = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.shopReshCountResetHour);
            var h = shopReshCountResetHour[type], countKey = self.keyMap_refreshCount[type], countResetKey = self.keyMap_refreshCountResetTime[type];
            var time = self._data[countResetKey];
            var now = Date.newDate();
            if (!time)
                time = now;
            else if (typeof time == "string")
                time = Date.newDate(time);
            if (!time.isAfter(now)) {
                var d = Date.today().addHours(h);
                if (!d.isAfter(now))
                    d.addDays(1); //如果不比现在晚则+1
                self._data[countResetKey] = d;
                self._data[countKey] = 0; //重置成0
            }
            return self._data[countKey];
        };
        /**
         * 刷新物品
         * @param type  商店类型
         * @param cb
         * @param target
         */
        __egretProto__.refresh = function (type, cb, target) {
            var self = this;
            var shopTypeKey = uw.c_prop.shopTypeKey;
            //先判断砖石是否足够
            var diamond = 0;
            var refreshCount = self.getTodayRefreshCount(type); //获取今日已刷新次数
            var msgCode = uw.id_c_msgCode.refreshShop; //TODO 不同type的msgCode不同
            if (type == shopTypeKey.normal) {
                diamond = uw.calShopDiamond(refreshCount);
            }
            else if (type == shopTypeKey.arena) {
                diamond = uw.calArenaShopDiamond(refreshCount);
            }
            else if (type == shopTypeKey.secret1 || type == shopTypeKey.secret2) {
                diamond = uw.calMysteryShopDiamond(refreshCount);
            }
            mo.showMsg(msgCode, diamond, function () {
                if (uw.userDataCtrl.getDiamond() < diamond)
                    return mo.showMsg(uw.id_c_msgCode.noDiamond);
                //服务器请求
                var args = {};
                var argsKey = uw.iface.a_shop_refresh_args;
                args[argsKey.type] = type;
                mo.requestWaiting(uw.iface.a_shop_refresh, args, function (entity) {
                    uw.userDataCtrl.reduceDiamond(diamond); //扣减钻石
                    //更新值
                    self.init(entity);
                    cb.call(target, self._transItems(type));
                });
            });
        };
        __egretProto__.getNextRefreshTime = function (type) {
            var self = this;
            var arr = self.refreshTimeMap[type];
            return mo.getNextTime(arr);
        };
        /**
         * 获取神秘商店消失时间
         * @param type
         * @returns {*}
         */
        __egretProto__.getDisappearTime = function (type) {
            var key = uw.dsConsts.ShopEntity.disappearTime2;
            if (type == uw.c_prop.shopTypeKey.secret2)
                key = uw.dsConsts.ShopEntity.disappearTime3;
            var time = this._data[key];
            if (!time)
                return time;
            if (typeof time == "string") {
                time = this._data[key] = Date.newDate(time);
            }
            return time;
        };
        /**
         * 判断是否有神秘商店存在
         * @returns {boolean}
         */
        __egretProto__.hasSecretShop = function () {
            return this.secretShop1Exist() || this.secretShop2Exist();
        };
        /**
         * 判断神秘商店1是否存在
         * @returns {boolean}
         */
        __egretProto__.secretShop1Exist = function () {
            if (this.secretShop1OffenIn())
                return true;
            var time1 = this.getDisappearTime(uw.c_prop.shopTypeKey.secret1);
            var now = Date.newDate();
            if (time1 && time1.isAfter(now))
                return true;
            return false;
        };
        /**
         * 判断神秘商店2是否存在
         * @returns {boolean}
         */
        __egretProto__.secretShop2Exist = function () {
            var time2 = this.getDisappearTime(uw.c_prop.shopTypeKey.secret2);
            var now = Date.newDate();
            if (time2 && time2.isAfter(now))
                return true;
            return false;
        };
        /**
         * 判断神秘商店1是否常在
         * @returns {*}
         */
        __egretProto__.secretShop1OffenIn = function () {
            return mo.getJSONWithFileNameAndID(uw.cfg_c_vip, uw.userDataCtrl.getVip())[uw.c_vip_isChapman];
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            var jobMap = self._jobMap;
            for (var key in jobMap) {
                jobMap[key].stop();
            }
            self._jobMap = null;
        };
        ShopDataCtrl.__className = "ShopDataCtrl";
        ShopDataCtrl.ON_SHOP_ITEM_SOLD = "onShopItemSold"; //物品售出
        ShopDataCtrl.ON_SECRET_SHOP_APPEAR = "onSecretShopAppear"; //出现神秘商店
        ShopDataCtrl.TRADER_01 = uw.c_prop.shopType[uw.c_prop.shopTypeKey.secret1];
        ShopDataCtrl.TRADER_02 = uw.c_prop.shopType[uw.c_prop.shopTypeKey.secret2];
        ShopDataCtrl.initByServer = function (cb) {
            mo.request(uw.iface.a_shop_getInfo, function (data) {
                uw.shopDataCtrl = uw.ShopDataCtrl.getInstance(data);
                if (cb)
                    cb();
            });
        };
        return ShopDataCtrl;
    })(mo.DataController);
    uw.ShopDataCtrl = ShopDataCtrl;
    ShopDataCtrl.prototype.__class__ = "uw.ShopDataCtrl";
    uw.shopDataCtrl;
})(uw || (uw = {}));

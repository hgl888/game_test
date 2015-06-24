/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var BagDataCtrl = (function (_super) {
        __extends(BagDataCtrl, _super);
        function BagDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = BagDataCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            var self = this;
            _super.prototype._initProp.call(this);
            self._tempCfgName = uw.cfg_t_item;
            self._tempId = null;
            self._count = 0;
            self._temp = null;
            self._isRequesting = false;
        };
        __egretProto__.init = function (tempId, count) {
            _super.prototype.init.call(this, null);
            var self = this;
            self.tempId = self._tempId = parseInt(tempId);
            self.count = self._count = count || 0;
            var temp = self._temp = mo.getJSONWithFileNameAndID(self._tempCfgName, tempId);
            self.type = temp[uw.t_item_type];
            self.isFragment = (self.type == uw.c_prop.itemTypeKey.heroFragment || self.type == uw.c_prop.itemTypeKey.exclusiveFragment);
            self.price = temp[uw.t_item_sellPrice];
            self.name = temp[uw.t_item_name];
            self.explain = temp[uw.t_item_explain] || "";
            self.useTxt = temp[uw.t_item_useTxt] || "";
            self.quality = temp[uw.t_item_quality];
            self.maxGet = temp[uw.t_item_maxGet];
            self.exclusiveExp = temp[uw.t_item_exclusiveExp];
            //设置锻造物品排序用值
            self[uw.FORGE_EXP_SORT_KEY] = temp[uw.t_item_exclusiveExp];
            // 设置背包中排序用的值
            var sortKeys = uw.BAG_SORT_KEY;
            self[sortKeys.SORT_QUALITY] = temp[uw.t_item_quality];
            self[sortKeys.SORT_TEMP_ID] = parseInt(tempId);
            self[sortKeys.SORT_COUNT] = count;
            //设置分类用的值
            self[uw.BAG_FILTER_KEY] = temp[uw.t_item_bagTag];
        };
        __egretProto__._changeCount = function (num) {
            if (num === void 0) { num = 0; }
            var self = this;
            var count = self._count;
            count += num;
            count = count < 0 ? 0 : count;
            self._count = count;
            var sortKeys = uw.BAG_SORT_KEY;
            self[uw.BAG_SORT_KEY.SORT_COUNT] = count;
            self[sortKeys.SORT_COUNT] = count;
            // 通知监听器
            self.pushNotify(self.__class.ON_COUNT_CHANGED, count);
        };
        __egretProto__.addCount = function (num) {
            if (num === void 0) { num = 1; }
            var self = this;
            self._changeCount(num);
            // 更新单例数据
            uw.userDataCtrl.addItem(self._tempId, num);
        };
        __egretProto__.reduceCount = function (num) {
            if (num === void 0) { num = 1; }
            var self = this;
            self._changeCount(-num);
            // 更新单例数据
            uw.userDataCtrl.reduceItem(self._tempId, num);
        };
        __egretProto__.setCount = function (num) {
            this._count = num;
            this._changeCount();
        };
        __egretProto__.getCount = function () {
            return this._count;
        };
        __egretProto__.getTempValue = function (key) {
            return this._temp[key];
        };
        __egretProto__.getLogicTempValue = function (key) {
            var logicTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_itemLogic, this._tempId);
            return logicTemp[key];
        };
        /**
         * 使用道具, 如果使用失败则在回调中返回false
         * @param heroId
         * @param cb
         * @param target
         * @param itemNum
         */
        __egretProto__.use = function (cb, target, heroId, itemNum) {
            if (itemNum === void 0) { itemNum = 1; }
            var self = this;
            if (self._isRequesting)
                return;
            //物品不足
            if (self.getCount() - itemNum < 0) {
                mo.showMsg(uw.id_c_msgCode.noSomethingToUpLv, self.name);
                if (cb)
                    cb.call(target, false);
                return;
            }
            //使用经验道具
            if (self.type == uw.c_prop.itemTypeKey.heroExpItem) {
                self.batchUseExpItemBegin(heroId);
                self.localUseExpItem(cb, target);
                self.batchUseExpItemEnd();
                return;
            }
            // 请求服务器
            var itemId = self.tempId;
            var iface = uw.iface.a_item_use;
            var argsKeys = uw.iface.a_item_use_args;
            var args = {};
            args[argsKeys.itemId] = itemId;
            args[argsKeys.heroId] = heroId;
            args[argsKeys.itemNum] = itemNum;
            self._isRequesting = true;
            mo.request(iface, args, function (useItemInfo) {
                self._isRequesting = false;
                self.reduceCount(itemNum); // 使用成功的时候要减低数量
                uw.userDataCtrl.handleUseItemInfo(useItemInfo); //处理道具使用的结果
                if (self.type == uw.c_prop.itemTypeKey.gift) {
                    uw.showGainTipsByDlg(useItemInfo, false, self.name);
                }
                else {
                    uw.showGainTips(useItemInfo);
                }
                if (cb)
                    cb.call(target, useItemInfo);
            }, self);
        };
        /**
         * 出售物品。
         * @param num
         * @param cb
         * @param target
         */
        __egretProto__.sell = function (num, cb, target) {
            var self = this;
            var iface = uw.iface.a_item_sellItem;
            var argsKeys = uw.iface.a_item_sellItem_args;
            var args = {};
            args[argsKeys.itemId] = self._tempId;
            args[argsKeys.num] = num;
            mo.request(iface, args, function () {
                uw.userDataCtrl.increaseGold(self.price * num); //增加金币
                self.reduceCount(num); //扣除数量
                mo.showMsg(uw.id_c_msgCode.onSoldSuccess); //提示购买成功的消息
                if (cb)
                    cb.call(target);
            });
        };
        /**
         * 返回物品可兑现的专属经验
         * @returns {*}
         */
        __egretProto__.getExclusiveExp = function () {
            return this.exclusiveExp;
        };
        //----------------------------- 批量吃经验道具API 开始--------------------
        /**
         * 初始化数据
         * @param heroCtrl
         */
        __egretProto__.batchUseExpItemBegin = function (heroId) {
            var self = this;
            if (self.simUseExpOpt)
                return;
            var heroCtrl = uw.userDataCtrl.getHeroDataCtrlById(heroId);
            self.simUseExpOpt = {};
            self.simUseExpOpt.heroId = heroId;
            self.simUseExpOpt.curLvl = heroCtrl.lvl;
            self.simUseExpOpt.oldLvl = heroCtrl.lvl;
            self.simUseExpOpt.curExp = heroCtrl.getExp();
            self.simUseExpOpt.expAddUnit = self.getExpAdd();
            self.simUseExpOpt.deltaExp = 0;
            self.simUseExpOpt.num = 0;
            self.simUseExpOpt.isOverflow = false;
            self.simUseExpOpt.noItemTipsShowed = false;
            self.simUseExpOpt.overflowTipsShowed = false;
            var heroLvlLimit = uw.userDataCtrl.getHeroExpLimit(); //获取等级限制
            var lvlCfg = mo.getJSONWithFileNameAndID(uw.cfg_c_lvl, heroLvlLimit);
            var criticalValue = lvlCfg[uw.c_lvl_minExpcOfLvl] + lvlCfg[uw.c_lvl_expcToLvlUp] - 1; //临界值
            if (self.simUseExpOpt.curExp == criticalValue) {
                //英雄等级不能够超过领主等级
                self.simUseExpOpt.isOverflow = true;
            }
        };
        __egretProto__.localUseExpItem = function (cb, target) {
            var self = this;
            if (self._isRequesting)
                return;
            var opt = self.simUseExpOpt;
            if (opt.isOverflow) {
                if (!self.simUseExpOpt.overflowTipsShowed) {
                    self.simUseExpOpt.overflowTipsShowed = true;
                    mo.showMsg(uw.id_c_msgCode.heroLvlOverLord);
                }
                if (cb)
                    cb.call(target, false);
                return;
            }
            if (self.count <= 0) {
                if (!self.simUseExpOpt.noItemTipsShowed) {
                    self.simUseExpOpt.noItemTipsShowed = true;
                    mo.showMsg(uw.id_c_msgCode.noSomethingToUpLv, self.name);
                }
                if (cb)
                    cb.call(target, false);
                return;
            }
            var heroLvlLimit = uw.userDataCtrl.getHeroExpLimit(); //获取等级限制
            var lvlCfg = mo.getJSONWithFileNameAndID(uw.cfg_c_lvl, heroLvlLimit);
            var criticalValue = lvlCfg[uw.c_lvl_minExpcOfLvl] + lvlCfg[uw.c_lvl_expcToLvlUp] - 1; //临界值
            //吃一口
            var newExp = opt.curExp + opt.expAddUnit;
            if (newExp >= criticalValue) {
                opt.deltaExp = criticalValue - opt.curExp;
                opt.curExp = criticalValue;
                //英雄等级不能够超过领主等级
                opt.isOverflow = true;
            }
            else {
                opt.deltaExp = newExp - opt.curExp;
                opt.curExp = newExp;
            }
            //记录等级变化
            opt.oldLvl = opt.curLvl;
            opt.curLvl = self._getLvlByExpc(opt.curExp, opt.oldLvl);
            self.reduceCount(); // 使用成功的时候要减低数量
            self.simUseExpOpt.num += 1; // 累计使用的值
            if (cb)
                cb.call(target, self.simUseExpOpt);
            self.pushNotify(self.__class.ON_BATCH_USE_EXP_ITEM, self.simUseExpOpt);
        };
        __egretProto__.batchUseExpItemEnd = function (cb, target) {
            var self = this;
            if (!self.simUseExpOpt)
                return;
            if (self.simUseExpOpt.num <= 0) {
                self.simUseExpOpt = null;
                return;
            }
            // 请求服务器
            var iface = uw.iface.a_item_use;
            var argsKeys = uw.iface.a_item_use_args;
            var args = {};
            args[argsKeys.itemId] = self.tempId;
            args[argsKeys.heroId] = self.simUseExpOpt.heroId;
            args[argsKeys.itemNum] = self.simUseExpOpt.num;
            self._isRequesting = true;
            mo.requestWaiting(iface, args, function (useItemInfo) {
                self._isRequesting = false;
                self.simUseExpOpt = null;
                uw.userDataCtrl.handleUseItemInfo(useItemInfo); //处理道具使用的结果
                if (cb)
                    cb.call(target, useItemInfo);
            }, self);
        };
        __egretProto__._getLvlByExpc = function (expc, currLvl) {
            currLvl = currLvl || 1;
            while (true) {
                var lvlInfo = mo.getJSONWithFileNameAndID(uw.cfg_c_lvl, currLvl);
                if (!lvlInfo)
                    return currLvl;
                if (lvlInfo[uw.c_lvl_minExpcOfLvl] > expc) {
                    return currLvl - 1;
                }
                currLvl++;
            }
        };
        //----------------------------- 批量吃经验道具API 结束--------------------
        /**
         * 如果是经验道具，则返回可以添加的经验值
         */
        __egretProto__.getExpAdd = function () {
            var self = this;
            var itemLogic = mo.getJSONWithFileNameAndID(uw.cfg_t_itemLogic, self.tempId);
            if (itemLogic)
                return mo.getJSONWithFileNameAndID(uw.cfg_t_itemLogic, self.tempId)[uw.t_itemLogic_create][0][1];
            return 0;
        };
        BagDataCtrl.__className = "BagDataCtrl";
        BagDataCtrl.ON_BATCH_USE_EXP_ITEM = "onBatchUseExpItem";
        BagDataCtrl.ON_SOLD = "onSold"; //出售
        BagDataCtrl.ON_COUNT_CHANGED = "onCountChanged"; //数量变化
        return BagDataCtrl;
    })(mo.DataController);
    uw.BagDataCtrl = BagDataCtrl;
    BagDataCtrl.prototype.__class__ = "uw.BagDataCtrl";
})(uw || (uw = {}));

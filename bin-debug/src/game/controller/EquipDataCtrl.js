/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    /**
     * 锻造购物车
     */
    var ForgeCart = (function (_super) {
        __extends(ForgeCart, _super);
        function ForgeCart() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ForgeCart.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.itemCart = {};
            self.equipCart = [];
            self.expTotal = 0;
            self.totalItemCount = 0;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self.clearCart();
        };
        __egretProto__.clearCart = function () {
            var self = this;
            self.itemCart = {};
            self.equipCart.length = 0;
            self.expTotal = 0;
            self.totalItemCount = 0;
        };
        __egretProto__.addItem = function (tempId, num) {
            if (num === void 0) { num = 1; }
            var self = this;
            var items = self.itemCart;
            if (!items[tempId]) {
                items[tempId] = num;
            }
            else {
                items[tempId] += num;
            }
            var t_item = mo.getJSONWithFileName(uw.cfg_t_item);
            var expc = t_item[tempId][uw.t_item_exclusiveExp] * num;
            self.expTotal += expc;
            self.totalItemCount += num;
            return true;
        };
        __egretProto__.addEquip = function (equipId, isDrop) {
            if (isDrop === void 0) { isDrop = false; }
            var self = this;
            var equips = self.equipCart;
            var num = 1;
            if (isDrop) {
                num = -1;
                mo.ArrayRemoveObject(equips, equipId);
            }
            else {
                this.equipCart.push(equipId);
            }
            var ctrl = uw.userDataCtrl.getNotOnEquipById(equipId);
            var expc = ctrl.getExclusiveExp() * num;
            self.expTotal += expc;
            self.totalItemCount += num;
            return true;
        };
        ForgeCart.__className = "ForgeCart";
        return ForgeCart;
    })(mo.Class);
    uw.ForgeCart = ForgeCart;
    ForgeCart.prototype.__class__ = "uw.ForgeCart";
    var EquipDataCtrl = (function (_super) {
        __extends(EquipDataCtrl, _super);
        function EquipDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EquipDataCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._idKey = uw.dsConsts.EquipEntity.id;
            self._tempIdKey = uw.dsConsts.EquipEntity.tempId;
            self._tempCfgName = uw.cfg_t_item;
            self._itemEquipTemp = null;
            self._count = 1;
            self._requesting = false;
            self.isFragment = false;
        };
        __egretProto__.init = function (data, tempData) {
            _super.prototype.init.call(this, data, tempData);
            var self = this;
            var temp = this._temp;
            self.tempId = self.tempId || temp[uw.t_item_id];
            var itemEquipTemp = self._itemEquipTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_itemEquip, self.tempId);
            if (data) {
                self.lvl = data[uw.dsConsts.EquipEntity.lvl];
            }
            self.name = temp[uw.t_item_name];
            self.type = temp[uw.t_item_type];
            self.price = temp[uw.t_item_sellPrice];
            self.quality = temp[uw.t_item_quality];
            self.explain = temp[uw.t_item_explain];
            self.maxGet = temp[uw.t_item_maxGet];
            self.exclusiveExp = temp[uw.t_item_exclusiveExp];
            self.part = itemEquipTemp[uw.t_itemEquip_part];
            self.needLvl = itemEquipTemp[uw.t_itemEquip_needLvl];
            var sortKeys = uw.BAG_SORT_KEY;
            self[sortKeys.SORT_QUALITY] = temp[uw.t_item_quality];
            self[sortKeys.SORT_TEMP_ID] = parseInt(self.tempId);
            self[sortKeys.SORT_COUNT] = self._count;
            self[uw.BAG_FILTER_KEY] = temp[uw.t_item_bagTag];
            self.isExclusive = self.part == uw.c_prop.equipPartKey.exclusive; //判断是否是专属装备
            if (self.isExclusive) {
                self._initExclusiveInfo();
            }
            self[self.__class.SORT_QUALITY] = self.quality;
            self[self.__class.SORT_TEMP_ID] = self.tempId;
            self[self.__class.SORT_EXCLUSIVE_LV] = self.lvl;
        };
        __egretProto__._getExclusiveValue = function (arr) {
            var lvl = this.lvl;
            for (var i = arr.length - 1; i >= 0; --i) {
                if (lvl >= arr[i][0])
                    return arr[i][1];
            }
            return 0;
        };
        __egretProto__._initExclusiveInfo = function () {
            var self = this;
            self.lvl = self._data ? (self._data[uw.dsConsts.EquipEntity.lvl] || 0) : 0;
            var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
            var exclusiveCfg = c_game[uw.id_c_game.exclusiveCfg];
            self.maxExclusiveLvl = exclusiveCfg[0]; //专属最高阶数
            self._exclusiveExpcArr = [];
            for (var lv = 1; lv <= self.maxExclusiveLvl; lv++) {
                var expc = uw.calExclusiveLvExp(lv, self.quality);
                self._exclusiveExpcArr.push(expc);
            }
            var t_equipExclusive = self.exclusiveTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_itemEquipExclusive, self.tempId);
            self.pAttackMult = self._getExclusiveValue(t_equipExclusive[uw.t_itemEquipExclusive_pAttackMult]); //物攻天赋
            self.pDefenceMult = self._getExclusiveValue(t_equipExclusive[uw.t_itemEquipExclusive_pDefenceMult]); //物防天赋
            self.mAttackMult = self._getExclusiveValue(t_equipExclusive[uw.t_itemEquipExclusive_mAttackMult]); //魔攻天赋
            self.mDefenceMult = self._getExclusiveValue(t_equipExclusive[uw.t_itemEquipExclusive_mDefenceMult]); //魔防天赋
            self.heroTid = self._itemEquipTemp[uw.t_itemEquip_heroTid];
            self.heroName = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, self.heroTid)[uw.t_warrior_name];
            self[self.__class.KEY_HERO_TID] = self.heroTid;
            //设置锻造所需英雄等级
            self.forgeNeedHeroLvl = mo.getJSONWithFileNameAndID(uw.cfg_c_lvl, self.lvl)[uw.c_lvl_exclusiveLvl];
        };
        /**
         * 锻造所需的英雄等级是否足够
         * @returns {boolean}
         */
        __egretProto__.isHeroLvlEnough = function (equipLvl) {
            var self = this;
            var heroCtrl = uw.userDataCtrl.getHeroDataCtrlByTid(self.heroTid);
            if (!heroCtrl)
                return false;
            if (equipLvl != null) {
                var forgeNeedHeroLvl = self._getForgeNeedHeroLvl(equipLvl);
                return heroCtrl.lvl >= forgeNeedHeroLvl;
            }
            else {
                return heroCtrl.lvl >= self.forgeNeedHeroLvl;
            }
        };
        __egretProto__._getForgeNeedHeroLvl = function (equipLvl) {
            return mo.getJSONWithFileNameAndID(uw.cfg_c_lvl, equipLvl)[uw.c_lvl_exclusiveLvl];
        };
        __egretProto__.isMaxExclusiveLvl = function () {
            return this.maxExclusiveLvl == this.lvl;
        };
        __egretProto__.getSecretName = function () {
            var self = this;
            // 关联秘术
            var secret = self.getSecret();
            var skillId = secret.initId;
            var skillData = uw.getSkillData(skillId, 1);
            var skillDisplay = mo.getJSONWithFileNameAndID(uw.cfg_t_skillDisplay, skillData.showId);
            return skillDisplay[uw.t_skillDisplay_name];
        };
        __egretProto__.getSecret = function () {
            var self = this;
            //秘术相关
            var secretArr = uw.userDataCtrl.getSecretArr();
            for (var i = 0, li = secretArr.length; i < li; i++) {
                var secret = secretArr[i];
                if (secret.heroTids.indexOf(self.heroTid) >= 0)
                    return secret;
            }
            return null;
        };
        /**
         * 获得穿戴者的dataCtrl。如果未被穿戴，则返回空。
         * @returns {*}
         */
        __egretProto__.getHeroDataCtrl = function () {
            var self = this;
            var heroId = self._data[uw.dsConsts.EquipEntity.heroId];
            return heroId ? uw.userDataCtrl.getHeroDataCtrlById(heroId) : null;
        };
        /**
         * 获取装备的属性列表显示数据。
         * @returns {Array}
         */
        __egretProto__.getProps = function () {
            return uw.EquipDataCtrl.getPropsByTempId(this.tempId, this.lvl);
        };
        __egretProto__.getPropsWithAddValue = function () {
            var self = this;
            //属性列表
            var props1 = self.getProps();
            var props2 = uw.EquipDataCtrl.getPropsByTempId(self.tempId, 0);
            var props = [];
            for (var i = 0; i < props1.length; ++i) {
                var prop1 = props1[i];
                var prop2 = props2[i];
                props.push({ name: prop1.name, value: prop2.value, addValue: prop1.value - prop2.value });
            }
            return props;
        };
        __egretProto__.getCount = function () {
            return this._count;
        };
        /**
         *  为保持api一致，这里恒设值为1
         */
        __egretProto__.setCount = function () {
            this._count = 1;
        };
        /**
         * 出售
         * @param num //num，外面传没用，内部永远都只为1，这是为了统一接口设定的
         * @param cb
         * @param target
         */
        __egretProto__.sell = function (num, cb, target) {
            var self = this;
            var iface = uw.iface.a_item_sellEquip;
            var argsKeys = uw.iface.a_item_sellEquip_args;
            var args = {};
            args[argsKeys.equipId] = self.id;
            mo.request(iface, args, function () {
                uw.userDataCtrl.increaseGold(self.price); //添加金币
                //移除装备
                self._count = 0;
                uw.userDataCtrl.removeEquip(self);
                self.pushNotify(self.__class.ON_SOLD);
                if (cb)
                    cb.call(target);
            });
        };
        __egretProto__.setPutOn = function () {
            var self = this;
            self.pushNotify(self.__class.ON_PUT_ON);
        };
        __egretProto__._calFinalResult = function (lvl, expc, heroLvl) {
            var self = this;
            if (lvl >= self.maxExclusiveLvl) {
                return { lvl: self.maxExclusiveLvl, expc: 0 };
            }
            var forgeNeedHeroLvl = self._getForgeNeedHeroLvl(lvl);
            if (heroLvl < forgeNeedHeroLvl) {
                return { lvl: lvl, expc: 0, forgeNeedHeroLvl: forgeNeedHeroLvl, showNeedHeroTips: true };
            }
            var nextLvl = lvl + 1;
            var totalExpcRequired = uw.calExclusiveLvExp(nextLvl, self.quality);
            var leftExpc = expc - totalExpcRequired;
            if (leftExpc >= 0) {
                return self._calFinalResult(nextLvl, leftExpc, heroLvl);
            }
            return { lvl: lvl, expc: expc };
        };
        //计算从lvl1升到lvl2需要多少经验
        __egretProto__._calTotalExpcNeed = function (lvl1, lvl2) {
            var self = this;
            var totalExpc = 0;
            for (var nextLvl = lvl1 + 1; nextLvl <= lvl2; nextLvl++) {
                totalExpc += uw.calExclusiveLvExp(nextLvl, self.quality);
            }
            return totalExpc;
        };
        /**
         * 获取专属的option。
         * @param items
         * @param equipIds
         * @returns {*}
         */
        __egretProto__.getUpExclusiveOpt = function (cart) {
            var self = this;
            //统计道具+服务器剩余经验总和
            var expc = cart.expTotal;
            var ENTITY_KEY = uw.dsConsts.EquipEntity;
            var exclusiveExp = self._data[ENTITY_KEY.exclusiveExp];
            var curTotalExp = exclusiveExp + expc;
            //一键锻造所需的钻石
            var lvl = self.lvl;
            var nextLvl = lvl + 1;
            nextLvl = nextLvl > self.maxExclusiveLvl ? self.maxExclusiveLvl : nextLvl;
            var nextLvlNeedExpc = uw.calExclusiveLvExp(nextLvl, self.quality);
            var diamond = uw.calExclusiveDiamond(nextLvlNeedExpc - exclusiveExp, self.quality);
            //普通锻造所需的金币
            var gold = uw.calExclusiveGold(expc, self.quality);
            //模拟普通锻造
            var heroCtrl = uw.userDataCtrl.getHeroDataCtrlByTid(self.heroTid);
            var finalResult = self._calFinalResult(lvl, curTotalExp, heroCtrl.lvl);
            var finalNextLvl = finalResult.lvl + 1;
            finalNextLvl = finalNextLvl > self.maxExclusiveLvl ? self.maxExclusiveLvl : finalNextLvl;
            //是否开启了一键锻造
            var vipEnough = uw.userDataCtrl.getVipFuncCfg(uw.c_vip_isForge);
            //英雄等级限制
            var forgeNeedHeroLvl = self.forgeNeedHeroLvl;
            if (finalResult.forgeNeedHeroLvl) {
                forgeNeedHeroLvl = finalResult.forgeNeedHeroLvl;
                curTotalExp = self._calTotalExpcNeed(self.lvl, finalResult.lvl);
            }
            return {
                totalItemCount: cart.totalItemCount,
                items: cart.itemCart,
                equipIds: cart.equipCart,
                gold: gold,
                isGoldEnough: gold <= uw.userDataCtrl.getGold(),
                diamond: diamond,
                isDiamondEnough: diamond <= uw.userDataCtrl.getDiamond(),
                isVipLvlEnough: vipEnough,
                expc: expc,
                lvl: lvl,
                finalLvlExpcRequired: uw.calExclusiveLvExp(finalNextLvl, self.quality),
                leftExpc: finalResult.expc,
                finalLvl: finalResult.lvl,
                isMaxLvl: finalResult.lvl >= self.maxExclusiveLvl,
                curTotalExp: curTotalExp,
                oneKeyHeroLvl: self.forgeNeedHeroLvl,
                oneKeyHeroLvlEnough: heroCtrl.lvl >= self.forgeNeedHeroLvl,
                forgeNeedHeroLvl: forgeNeedHeroLvl,
                showNeedHeroTips: finalResult.showNeedHeroTips != null //显示英雄等级不足提示
            };
        };
        /**
         * 对专属进行锻造。
         * @param opt
         * @param onekeyforge  是否是一键锻造
         * @param cb
         * @param target
         * @returns {*}
         */
        __egretProto__.upExclusive = function (opt, onekeyforge, cb, target) {
            var self = this;
            // 达到最高阶
            if (opt.isMaxLvl)
                return mo.showMsg(uw.id_c_msgCode.exclusiveLv);
            //英雄等级不足
            if (!self.isHeroLvlEnough())
                return mo.showMsg(uw.id_c_msgCode.noHeroLvExclusiveCantUp, self.forgeNeedHeroLvl);
            if (onekeyforge) {
                // vip等级不足
                if (!opt.isVipLvlEnough)
                    return mo.showMsg(uw.id_c_msgCode.higherVipLvOpen, uw.getVipOpenLevel(uw.c_vip_isForge));
                //钻石不足
                if (!opt.isDiamondEnough)
                    return mo.showMsg(uw.id_c_msgCode.noDiamond);
                //英雄等级不足
                if (!opt.oneKeyHeroLvlEnough)
                    return mo.showMsg(uw.id_c_msgCode.noHeroLvExclusiveCantUp, opt.oneKeyHeroLvl);
                //确认
                mo.showMsg(uw.id_c_msgCode.diamondForging, opt.diamond, function () {
                    self._doUpExclusive(opt, onekeyforge, cb, target);
                });
            }
            else {
                // 物品数量不能为0
                if (opt.totalItemCount <= 0)
                    return mo.showMsg(uw.id_c_msgCode.unExclusivExp);
                //金币不足
                if (!opt.isGoldEnough)
                    return mo.showMsg(uw.id_c_msgCode.noGolds);
                self._doUpExclusive(opt, onekeyforge, cb, target);
            }
        };
        __egretProto__._doUpExclusive = function (opt, onkeyforge, cb, target) {
            var self = this;
            var ENTITY_KEY = uw.dsConsts.EquipEntity;
            var lvl = self.lvl; //获取当前的阶数
            var args = {};
            var argsKey = uw.iface.a_hero_upExclusiveEquip_args;
            args[argsKey.equipId] = self.id;
            args[argsKey.items] = opt.items;
            args[argsKey.equipIds] = opt.equipIds;
            args[argsKey.isVip] = onkeyforge;
            mo.requestWaiting(uw.iface.a_hero_upExclusiveEquip, args, function (heroEntity) {
                var heroDataCtrl = self.getHeroDataCtrl();
                if (heroEntity)
                    heroDataCtrl.reset(heroEntity); //重置英雄数据
                if (onkeyforge) {
                    uw.userDataCtrl.reduceDiamond(opt.diamond); //扣除钻石
                    self.set(ENTITY_KEY.lvl, lvl + 1); //设置等级
                    self.set(ENTITY_KEY.exclusiveExp, 0); //设置服务器剩余经验为0
                }
                else {
                    uw.userDataCtrl.reduceGold(opt.gold); //扣除金币
                    uw.userDataCtrl.reduceItems(opt.items); //扣除物品
                    uw.userDataCtrl.delEquipsByIds(opt.equipIds); //扣除装备
                    self.set(ENTITY_KEY.lvl, opt.finalLvl); //设置等级
                    self.set(ENTITY_KEY.exclusiveExp, opt.leftExpc); //设置服务器剩余经验
                }
                self._initExclusiveInfo();
                self.pushNotify(self.__class.ON_EXCLUSIVE_UPED, opt, onkeyforge);
                if (cb)
                    cb.call(target, opt, onkeyforge);
            });
        };
        /**
         * 返回物品可兑现的专属经验
         * @returns {*}
         */
        __egretProto__.getExclusiveExp = function () {
            var self = this;
            var expc = 0, ENTITY_KEY = uw.dsConsts.EquipEntity;
            if (self.isExclusive) {
                expc += uw.calExclusiveLvItemExp(self.lvl, self.quality, self.get(ENTITY_KEY.exclusiveExp)); //计算专属装备所兑现的经验
            }
            else {
                expc += self.getTempValue(uw.t_item_exclusiveExp); //计算普通装备所兑现的经验
            }
            return expc;
        };
        /**
         * 获取到下一阶装备的dataCtrl。如果已经达到满阶，则返回null。
         * @returns {null}
         */
        __egretProto__.getNext = function () {
            var self = this;
            var nextTempId = self.tempId + 1;
            var t_item = mo.getJSONWithFileName(uw.cfg_t_item);
            var nextTemp = t_item[nextTempId];
            if (!nextTemp)
                return null; //这时候已经达到了最大阶
            var dataCtrl = uw.EquipDataCtrl.create(null, nextTemp);
            dataCtrl.lvl = self.lvl;
            return dataCtrl;
        };
        /**
         * 获取升阶装备到此装备的option。
         * @returns {{stuffs: Array, isEnough: boolean}}
         */
        __egretProto__.getUpgradeToThisOpt = function (heroDataCtrl) {
            var self = this;
            var stuffs = self._itemEquipTemp[uw.t_itemEquip_stuffs] || {};
            var stuffArr = [];
            var isEnough = true;
            for (var stuffId in stuffs) {
                var required = stuffs[stuffId];
                var cur = uw.userDataCtrl.getItemNum(stuffId);
                stuffArr.push({
                    itemId: stuffId,
                    curNum: cur,
                    requiredNum: required,
                    enough: cur >= required
                });
                if (isEnough)
                    isEnough = cur >= required;
            }
            return {
                stuffs: stuffArr,
                isEnough: isEnough,
                heroDataCtrl: heroDataCtrl,
                canWare: self.needLvl <= heroDataCtrl.getLvl(),
                canUpgrade: isEnough && (self.needLvl <= heroDataCtrl.getLvl())
            };
        };
        /**
         * 升阶装备到此装备。
         * @param opt
         * @param cb
         * @param target
         */
        __egretProto__.upgradeToThis = function (opt, cb, target) {
            var self = this;
            var heroDataCtrl = opt.heroDataCtrl;
            if (!opt.canWare)
                return mo.showMsg(uw.id_c_msgCode.heroLvLess);
            if (!opt.isEnough)
                return mo.showMsg("材料不足！");
            //调用后台的升阶装备的接口
            var args = {};
            var argsKey = uw.iface.a_equip_up_args;
            args[argsKey.heroId] = heroDataCtrl.id;
            args[argsKey.part] = self.part;
            var oldProps = uw.calEquipProps(self.tempId - 1, self.lvl);
            mo.requestWaiting(uw.iface.a_equip_up, args, function (heroEntity) {
                heroDataCtrl.reset(heroEntity); //更新装备
                var stuffs = opt.stuffs;
                for (var i = 0, li = stuffs.length; i < li; i++) {
                    var stuff = stuffs[i];
                    uw.userDataCtrl.addItem(stuff.itemId, -stuff.requiredNum); //扣除物品数量
                }
                var equipDataCtrl = heroDataCtrl.getEquipDataCtrlByPart(self.part); //获取当前穿戴着的装备的实例dataCtrl。
                equipDataCtrl.set(uw.dsConsts.EquipEntity.tempId, self.tempId); //将实例的dataCtrl的模板id更新为升阶后的模板id
                equipDataCtrl.reset(equipDataCtrl.getData()); //这里的刷新比较特殊
                self.showPropTips(oldProps); //显示属性漂浮
                self._setChanged(self.__class.ON_UPGRADE_EQUIP);
                if (cb)
                    cb.call(target);
            });
        };
        /**
         * 获取强化装备的option。
         * param part
         * @returns {{gold: Number, nextLvl: Number}}
         */
        __egretProto__.getStrengthenOpt = function (part) {
            var self = this;
            var heroDataCtrl = self.getHeroDataCtrl();
            var nextLvl = self.lvl + 1;
            //判断金币是否足够
            var gold = uw.calEquipColLvl(nextLvl, mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.equipColMult)[part - 1]);
            //装备强化等级不得超过英雄等级
            var overflow = self.lvl >= heroDataCtrl.getLvl();
            return { gold: gold, nextLvl: nextLvl, overflow: overflow };
        };
        /**
         * 强化装备
         */
        __egretProto__.strengthen = function (opt, cb, target) {
            var self = this;
            if (self._requesting)
                return;
            if (opt.overflow)
                return mo.showMsg(uw.id_c_msgCode.equipLvNoHero);
            if (uw.userDataCtrl.getGold() < opt.gold)
                return mo.showMsg(uw.id_c_msgCode.noGolds);
            var heroDataCtrl = self.getHeroDataCtrl();
            //调用升级的接口
            var args = {};
            var argsKey = uw.iface.a_equip_strengthen_args;
            args[argsKey.heroId] = heroDataCtrl.id;
            args[argsKey.part] = self.part;
            var oldProps = uw.calEquipProps(self.tempId, self.lvl);
            self._requesting = true;
            mo.requestWaiting(uw.iface.a_equip_strengthen, args, function (heroEntity) {
                self.lvl = opt.nextLvl;
                self.set(uw.dsConsts.EquipEntity.lvl, opt.nextLvl);
                //更新英雄属性
                heroDataCtrl.reset(heroEntity);
                uw.userDataCtrl.reduceGold(opt.gold); //扣除金币
                self.showPropTips(oldProps); //显示属性漂浮
                self._requesting = false;
                if (cb)
                    cb.call(target);
            });
        };
        /**
         * 获取一键强化装备的option。
         * param part
         * @returns {{gold: Number, maxLvl: Number, isGoldEnough:boolean, isMaxLvl:boolean}}
         */
        __egretProto__.getOneKeyStrengthenOpt = function (part) {
            var self = this;
            var heroDataCtrl = self.getHeroDataCtrl();
            var maxLvl = heroDataCtrl.getLvl();
            var opt = { isMaxLvl: false, isGoldEnough: true };
            var totalGold = uw.userDataCtrl.getGold();
            var gold = 0;
            if (maxLvl > self.lvl) {
                var mult = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.equipColMult)[part - 1];
                var tempLvl = self.lvl + 1;
                while (tempLvl <= maxLvl) {
                    //判断金币是否足够
                    var tempGold = uw.calEquipColLvl(tempLvl, mult);
                    if (gold + tempGold > totalGold) {
                        break;
                    }
                    else {
                        tempLvl++;
                    }
                    gold += tempGold;
                }
                maxLvl = Math.min(maxLvl, tempLvl);
                if (gold == 0) {
                    opt.isGoldEnough = false;
                }
                else if (maxLvl > self.lvl) {
                    opt.gold = gold;
                    opt.maxLvl = maxLvl;
                }
                else {
                    opt.isGoldEnough = false;
                }
            }
            else {
                opt.isMaxLvl = true; //已经达到了可强化的最高等级
            }
            return opt;
        };
        /**
         * 一键强化装备
         */
        __egretProto__.oneKeyStrengthen = function (opt, cb, target) {
            var self = this;
            var heroDataCtrl = self.getHeroDataCtrl();
            //一键强化已开启
            var oneKeyOpen = uw.verifyLevel(uw.id_c_open.aKeyStrengthen, false) || uw.userDataCtrl.getVipFuncCfg(uw.c_vip_isStrengthen) > 0;
            //还没开启则提示信息
            if (!oneKeyOpen)
                return mo.showMsg(uw.id_c_msgCode.noLvlnoVip, uw.getLeaderOpenLevel(uw.id_c_open.aKeyStrengthen), uw.getVipOpenLevel(uw.c_vip_isStrengthen));
            //已经是最高等级了则提示信息
            if (opt.isMaxLvl)
                return mo.showMsg(uw.id_c_msgCode.equipLvNoHero);
            //金币不足则提示信息
            if (!opt.isGoldEnough)
                return mo.showMsg(uw.id_c_msgCode.noGolds);
            mo.showMsg(uw.id_c_msgCode.ifCostEnhanceOnetime, opt.gold, opt.maxLvl, function () {
                var args = {};
                var argsKey = uw.iface.a_equip_strengthen_args;
                args[argsKey.heroId] = heroDataCtrl.id;
                args[argsKey.part] = self.part;
                args[argsKey.isAuto] = 1;
                var oldProps = uw.calEquipProps(self.tempId, self.lvl);
                mo.requestWaiting(uw.iface.a_equip_strengthen, args, function (heroEntity) {
                    self.lvl = opt.maxLvl;
                    self.set(uw.dsConsts.EquipEntity.lvl, opt.maxLvl);
                    //更新英雄属性
                    heroDataCtrl.reset(heroEntity);
                    uw.userDataCtrl.reduceGold(opt.gold); //扣除金币
                    self.showPropTips(oldProps); //显示属性漂浮
                    if (cb)
                        cb.call(target);
                });
            });
        };
        __egretProto__.showPropTips = function (oldProps) {
            var props = uw.calEquipProps(this.tempId, this.lvl);
            uw.showPropTips(props, oldProps);
        };
        /**
         * 专属装备每一级所需经验数组 1~10 级
         * @returns {Array}
         */
        __egretProto__.getExpQueueArr = function () {
            var self = this;
            return [].concat(self._exclusiveExpcArr);
        };
        __egretProto__.getCurExpQueueArr = function () {
            var self = this;
            var arr = [].concat(self._exclusiveExpcArr);
            return arr.slice(self.lvl, arr.length);
        };
        /**
         * 是否强化到最大
         */
        __egretProto__.isStrengthMax = function () {
            var self = this;
            return self.lvl >= mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.maxLvl)[0];
        };
        EquipDataCtrl.__className = "EquipDataCtrl";
        EquipDataCtrl.ON_PUT_ON = "onPutOn";
        EquipDataCtrl.ON_EXCLUSIVE_UPED = "onExclusiveUpgraded"; //专属升级
        EquipDataCtrl.ON_UPGRADE_EQUIP = "onUpgradeEquip"; //升阶普通装备
        EquipDataCtrl.KEY_PART = "part";
        EquipDataCtrl.KEY_HERO_TID = "heroTid";
        EquipDataCtrl.SORT_QUALITY = "quality";
        EquipDataCtrl.SORT_TEMP_ID = "tempId";
        EquipDataCtrl.SORT_EXCLUSIVE_LV = "lvl";
        EquipDataCtrl.ON_SOLD = "onSold"; //出售
        EquipDataCtrl.ON_COUNT_CHANGED = "onCountChanged"; //数量变化
        /**
         * 获取装备的属性列表显示数据。
         * @param tempId
         * @param lvl
         * @returns {Array}
         */
        EquipDataCtrl.getPropsByTempId = function (tempId, lvl) {
            lvl = lvl || 0;
            var dataList = [];
            var t_itemEquip = mo.getJSONWithFileName(uw.cfg_t_itemEquip);
            var itemEquipTemp = t_itemEquip[tempId];
            var props = itemEquipTemp[uw.t_itemEquip_props];
            var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
            var rate = c_game[uw.id_c_game.equipStrengthen][0];
            var isExclusive = itemEquipTemp && itemEquipTemp[uw.t_itemEquip_part] == uw.c_prop.equipPartKey.exclusive;
            //专属的等级成长不同于普通装备
            if (isExclusive) {
                var lvlTemp = mo.getJSONWithFileNameAndID(uw.cfg_c_lvl, lvl);
                rate = lvlTemp[uw.c_lvl_exclusiveAdd] / 100;
            }
            for (var i = 0, li = props.length; i < li; i++) {
                var data = props[i];
                var name = mo.getValueForKey(uw.c_prop.equipProp, data[0]); //装备属性的名称
                var value;
                if (data[2]) {
                    value = data[1] + (lvl - 1) * data[2];
                }
                if (isExclusive) {
                    value = Math.round(data[1] * (1 + rate) * 100) / 100;
                }
                else {
                    value = Math.round(data[1] * (1 + lvl * rate) * 100) / 100;
                } //乘以等级系数， 保留小数点后两位
                dataList.push({ name: name, value: value });
            }
            return dataList;
        };
        EquipDataCtrl.initByServer = function (cb, cbTarget) {
            if (cbTarget === void 0) { cbTarget = null; }
            mo.request(uw.iface.a_item_getAllEquipList, {}, function (list) {
                var notOnList = [];
                var onMap = {};
                var equipKey = uw.dsConsts.EquipEntity;
                for (var i = 0, li = list.length; i < li; i++) {
                    var equip = list[i];
                    var heroId = equip[equipKey.heroId];
                    var equipCtrl = uw.EquipDataCtrl.create(equip);
                    if (heroId) {
                        if (!onMap[heroId]) {
                            onMap[heroId] = [];
                        }
                        onMap[heroId].push(equipCtrl);
                    }
                    else {
                        notOnList.push(equipCtrl);
                    }
                }
                uw.userDataCtrl._setNotOnEquipList(notOnList); //设置未装备到userDataCtrl中
                var heroCtrlList = uw.heroDataCtrlList;
                for (var i = 0, li = heroCtrlList.length; i < li; i++) {
                    var heroCtrl = heroCtrlList[i];
                    var arr = onMap[heroCtrl.id];
                    if (arr) {
                        heroCtrl._setEquipDataCtrlList(arr);
                    }
                    else {
                        heroCtrl._setEquipDataCtrlList([]);
                    }
                }
                if (cb) {
                    cb.call(cbTarget, null, list);
                }
            });
        };
        return EquipDataCtrl;
    })(uw.RespAndTempDataCtrl);
    uw.EquipDataCtrl = EquipDataCtrl;
    EquipDataCtrl.prototype.__class__ = "uw.EquipDataCtrl";
})(uw || (uw = {}));

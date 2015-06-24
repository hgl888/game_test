/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var _p = {};
    var _p1 = uw.c_prop.matrixTypeKey;
    var _p2 = uw.dsConsts.HeroEntity;
    _p[_p1.copy] = _p2.pos;
    _p[_p1.arenaD] = _p2.posArenaD;
    _p[_p1.arenaA] = _p2.posArenaA;
    _p[_p1.mirrorD] = _p2.posMirrorD;
    _p[_p1.mirrorA] = _p2.posMirrorA;
    _p[_p1.tower] = _p2.posTower;
    _p[_p1.trial] = _p2.posTrial;
    _p[_p1.mirrorPVPA] = uw.c_prop.matrixType[uw.c_prop.matrixTypeKey.mirrorPVPA];
    var UserDataCtrl = (function (_super) {
        __extends(UserDataCtrl, _super);
        function UserDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UserDataCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.currPCopyId = 1;
        };
        __egretProto__.init = function (data) {
            _super.prototype.init.call(this, data);
            var self = this;
            //初始化一些时间相关的数据
            var KEY = uw.dsConsts.UserEntity;
            data[KEY.strengthReTime] = data[KEY.strengthReTime] ? Date.newDate(data[KEY.strengthReTime]) : Date.newDate();
            data[KEY.skillPointsReTime] = data[KEY.skillPointsReTime] ? Date.newDate(data[KEY.skillPointsReTime]) : Date.newDate();
            var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
            //体力相关配置
            self.strengthReplayInterval = c_game[uw.id_c_game.strengthCfg][2] * 60 * 1000;
            //技能点相关配置
            var skillPointsConfig = c_game[uw.id_c_game.skillPointsConfig];
            self.skillPointInterval = skillPointsConfig[0] * 60 * 1000; //设置interval为毫秒
            self.skillPointCost = skillPointsConfig[1]; //购买技能点钻石数
            self.addStrength(0); //启动定时器
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            if (self._strengthInv) {
                mo.timer.removeInvocation(self._strengthInv);
                self._strengthInv = null;
            }
        };
        // 获得英雄限制等级
        __egretProto__.getHeroExpLimit = function () {
            var initLvlLimit = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.heroExpLimit)[0]; //初始等级限制
            var maxLvl = this.getLvl();
            return maxLvl < initLvlLimit ? initLvlLimit : maxLvl;
        };
        __egretProto__._appendValue = function (key, value) {
            var oldValue = this._data[key] || 0;
            this.set(key, oldValue + value);
        };
        __egretProto__.getId = function () {
            return this._data[uw.dsConsts.UserEntity.id];
        };
        __egretProto__.getChangeNameCount = function () {
            return this._data[uw.dsConsts.UserEntity.changeNameCount] || 0;
        };
        __egretProto__.addChangeNameCount = function () {
            this._appendValue(uw.dsConsts.UserEntity.changeNameCount, 1);
        };
        __egretProto__.getIconId = function () {
            return this._data[uw.dsConsts.UserEntity.iconId];
        };
        __egretProto__.setIconId = function (iconId) {
            this.set(uw.dsConsts.UserEntity.iconId, iconId);
        };
        __egretProto__.getName = function () {
            return this._data[uw.dsConsts.UserEntity.name];
        };
        __egretProto__.setName = function (name) {
            this.set(uw.dsConsts.UserEntity.name, name);
        };
        __egretProto__.getExpc = function () {
            return this._data[uw.dsConsts.UserEntity.expc];
        };
        __egretProto__.addExpc = function (expc) {
            var oldLvl = this.getLvl();
            this._appendValue(uw.dsConsts.UserEntity.expc, expc);
            var currExpc = this._data[uw.dsConsts.UserEntity.expc];
            var currLvl = this._data[uw.dsConsts.UserEntity.lvl];
            var lvl = this._getLvlByExpc(currExpc, currLvl);
            this.set(uw.dsConsts.UserEntity.lvl, lvl);
            //领主升级增加体力
            if (lvl > oldLvl) {
                for (var i = oldLvl + 1; i <= lvl; i++) {
                    var addStrength = uw.calUpStrength(i);
                    //cc.log("升级->(%s),恢复体力(%s)",i,addStrength);
                    this.addStrength(addStrength);
                }
            }
        };
        __egretProto__._getLvlByExpc = function (expc, currLvl) {
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
            while (true) {
                var lvlInfo = c_lvl[currLvl];
                if (!lvlInfo)
                    return currLvl;
                if (lvlInfo[uw.c_lvl_minTeamExpcOfLvl] > expc) {
                    return currLvl - 1;
                }
                currLvl++;
            }
        };
        __egretProto__.getVip = function () {
            return this._data[uw.dsConsts.UserEntity.vip];
        };
        /**
         * 根据自身vip等级查看vip功能是否开启
         * @param funKey
         * @returns {any}
         */
        __egretProto__.getVipFuncCfg = function (funKey) {
            var self = this;
            return mo.getJSONWithFileNameAndID(uw.cfg_c_vip, self.getVip())[funKey];
        };
        __egretProto__.isVip = function () {
            return this.getVip() > 0;
        };
        __egretProto__._getVip = function () {
            var score = this.getVipScore();
            var c_vip = mo.getJSONWithFileName(uw.cfg_c_vip);
            var vip = 0;
            for (var i = 0; i < 100; ++i) {
                var vipTemp = c_vip[i];
                if (!vipTemp)
                    break;
                if (vipTemp[uw.c_vip_score] > score)
                    break;
                vip = i;
            }
            return vip;
        };
        __egretProto__.addVipScore = function (score) {
            var self = this;
            var KEY = uw.dsConsts.UserEntity;
            self.add(KEY.vipScore, score);
            self.set(KEY.vip, self._getVip());
        };
        __egretProto__.getVipScore = function () {
            return this._data[uw.dsConsts.UserEntity.vipScore] || 0;
        };
        __egretProto__.getAccountId = function () {
            return this._data[uw.dsConsts.UserEntity.accountId];
        };
        __egretProto__.getLvl = function () {
            return this._data[uw.dsConsts.UserEntity.lvl];
        };
        __egretProto__.increaseDiamond = function (diamond) {
            this._appendValue(uw.dsConsts.UserEntity.diamond, diamond);
        };
        __egretProto__.reduceDiamond = function (diamond) {
            this._appendValue(uw.dsConsts.UserEntity.diamond, -diamond);
        };
        __egretProto__.increaseExploit = function (exploit) {
            this._appendValue(uw.dsConsts.UserEntity.exploit, exploit);
        };
        __egretProto__.reduceExploit = function (exploit) {
            this._appendValue(uw.dsConsts.UserEntity.exploit, -exploit);
        };
        __egretProto__.increaseTowerPoints = function (towerPoints) {
            this._appendValue(uw.dsConsts.UserEntity.towerPoints, towerPoints);
        };
        __egretProto__.reduceTowerPoints = function (towerPoints) {
            this._appendValue(uw.dsConsts.UserEntity.towerPoints, -towerPoints);
        };
        __egretProto__.getTowerPoints = function () {
            return this._data[uw.dsConsts.UserEntity.towerPoints];
        };
        /**
         * 获取最大体力上限，跟领主等级相关
         */
        __egretProto__.getMaxStrength = function () {
            var self = this, entityKey = uw.dsConsts.UserEntity;
            var userLvl = self.get(entityKey.lvl);
            var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
            //体力相关配置
            var baseMaxStrength = c_game[uw.id_c_game.strengthCfg][0];
            var addPerStrength = c_game[uw.id_c_game.strengthCfg][1];
            return baseMaxStrength + (userLvl - 1) * addPerStrength;
        };
        __egretProto__.getStrength = function () {
            var self = this;
            var maxStrength = self.getMaxStrength();
            var interval = self.strengthReplayInterval;
            var strength = self._data[uw.dsConsts.UserEntity.strength];
            if (strength >= maxStrength)
                return strength;
            var strengthReTime = self._data[uw.dsConsts.UserEntity.strengthReTime];
            if (!strengthReTime)
                return strength; //不存在则直接返回当前的体力值
            var now = Date.now();
            var time = strengthReTime.getTime();
            if (now >= time)
                return maxStrength; //已经超过了满体力的时间
            var s = maxStrength - Math.ceil((time - now) / interval);
            if (s < 0)
                return strength;
            return Math.min(maxStrength, s);
        };
        __egretProto__.addStrength = function (strength) {
            var self = this;
            var oldStrength = self.getStrength();
            var maxStrength = self.getMaxStrength();
            var interval = self.strengthReplayInterval;
            var result = Math.max(0, oldStrength + strength); //最终体力值，最小不能是负数
            var now = Date.newDate();
            if (result >= maxStrength) {
                self._data[uw.dsConsts.UserEntity.strengthReTime] = now;
                if (self._strengthInv) {
                    mo.timer.removeInvocation(self._strengthInv);
                    self._strengthInv = null;
                }
            }
            else {
                var d = self._data[uw.dsConsts.UserEntity.strengthReTime];
                if (!d || d.isBefore(now) || oldStrength >= maxStrength)
                    d = now;
                var s = oldStrength >= maxStrength ? result - maxStrength : strength; //计算需要计算到恢复时间中的strength
                d.add({ milliseconds: -interval * s });
                self._data[uw.dsConsts.UserEntity.strengthReTime] = d;
                if (!self._strengthInv) {
                    interval = d.getTime() - now.getTime() - (interval * (maxStrength - result - 1)); //计算出下一次恢复体力的时间点
                    self._strengthInv = mo.timer.countdown(interval, null, null, function () {
                        mo.timer.removeInvocation(self._strengthInv);
                        self._strengthInv = null;
                        self.addStrength(0); //注意，这里一定是填0，因为这种并不是真正的加上
                    });
                }
            }
            self.set(uw.dsConsts.UserEntity.strength, result);
        };
        //显示购买体力框
        __egretProto__.showBuyStrength = function (cb, target) {
            if (cb === void 0) { cb = null; }
            if (target === void 0) { target = null; }
            var self = this;
            //"花费%s钻石购买%s点体力，[br]是否继续？（今日已购买%s次）"
            var buyStrengthCount = self.getBuyStrengthCount();
            var costDiamond = uw.calBuyStrength(buyStrengthCount + 1); //第几次购买 = 已购次数+1
            var buyValue = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.strengthCfg)[3];
            var c_open = mo.getJSONWithFileName(uw.cfg_c_open);
            var lvlRequired = c_open[uw.id_c_open.buyStrength][uw.c_open_lvlRequired];
            var lvl = self.getLvl();
            if (lvl < lvlRequired)
                return mo.showMsg(uw.id_c_msgCode.noLvBuyStrength, lvlRequired);
            mo.showMsg(uw.id_c_msgCode.noStrength, costDiamond, buyValue, buyStrengthCount, function () {
                var c_vip = mo.getJSONWithFileName(uw.cfg_c_vip);
                var vip = self.getVip();
                var maxCount = c_vip[vip][uw.c_vip_strengthCount]; //获取该玩家的最大购买次数
                if (buyStrengthCount >= maxCount)
                    return mo.showMsg(uw.id_c_msgCode.cantBuyMax, buyStrengthCount);
                if (self.getDiamond() < costDiamond)
                    return mo.showMsg(uw.id_c_msgCode.noDiamond); //钻石不足
                mo.requestWaiting(uw.iface.a_user_buyStrength, {}, function () {
                    self.addStrength(buyValue);
                    self.addBuyStrengthCount(1);
                    self.reduceDiamond(costDiamond);
                    var obj = {};
                    obj[uw.dsConsts.UseItemInfo.items] = {};
                    obj[uw.dsConsts.UseItemInfo.items][uw.c_prop.spItemIdKey.strength] = buyValue;
                    uw.showGainTips(obj);
                    if (cb)
                        cb.call(target);
                });
            }, self);
        };
        /**
         * 获取购买体力次数
         * @returns {*}
         */
        __egretProto__.getBuyStrengthCount = function () {
            return this.getTodayCount(uw.c_prop.countTypeKey.strength);
        };
        /**
         * 增加购买体力次数
         * @param count
         */
        __egretProto__.addBuyStrengthCount = function (count) {
            this.addTodayCount(uw.c_prop.countTypeKey.strength, count);
        };
        __egretProto__.getDiamond = function () {
            return this._data[uw.dsConsts.UserEntity.diamond];
        };
        __egretProto__.increaseHonor = function (honor) {
            this._appendValue(uw.dsConsts.UserEntity.honor, honor);
        };
        __egretProto__.reduceHonor = function (honor) {
            this._appendValue(uw.dsConsts.UserEntity.honor, -honor);
        };
        __egretProto__.getHonor = function () {
            return this._data[uw.dsConsts.UserEntity.honor];
        };
        __egretProto__.increaseGold = function (gold) {
            this._appendValue(uw.dsConsts.UserEntity.gold, gold);
        };
        __egretProto__.reduceGold = function (gold) {
            this._appendValue(uw.dsConsts.UserEntity.gold, -gold);
        };
        __egretProto__.getGold = function () {
            return this._data[uw.dsConsts.UserEntity.gold];
        };
        __egretProto__.modifyName = function (newName, cb, target) {
            var self = this;
            var args = {}, argsKeys = uw.iface.a_user_changeName_args;
            args[argsKeys.name] = newName;
            var changeNameCount = self.getChangeNameCount(), needDiamond;
            if (changeNameCount > 0) {
                needDiamond = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.changeNameDiamond)[0];
                if (self.getDiamond() < needDiamond)
                    return mo.showMsg(uw.id_c_msgCode.noDiamond); //钻石不足
            }
            else {
                needDiamond = 0;
            }
            mo.requestWaiting(uw.iface.a_user_changeName, args, function (data) {
                self.setName(newName);
                self.addChangeNameCount();
                self.reduceDiamond(needDiamond);
                if (cb)
                    cb.call(target);
            }, self);
        };
        //显示购买金币框
        __egretProto__.buyGold = function (num, cb, target) {
            var self = this;
            var buyGoldCount = self.getBuyGoldCount();
            var buyValue = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.goldBuySet)[3];
            var c_open = mo.getJSONWithFileName(uw.cfg_c_open);
            var lvlRequired = c_open[uw.id_c_open.buyGold][uw.c_open_lvlRequired];
            var lvl = self.getLvl();
            if (lvl < lvlRequired)
                return mo.showMsg(uw.id_c_msgCode.noLvBuyGold, lvlRequired);
            var reNum = self.getBuyGoldReNum();
            if (reNum <= 0)
                return;
            if (num > reNum)
                num = reNum;
            //计算消耗的钻石
            var costDiamond = 0;
            for (var i = 0; i < num; i++) {
                buyGoldCount++;
                var locDiamond = uw.calBuyGoldDiamond(buyGoldCount);
                costDiamond += locDiamond;
            }
            if (self.getDiamond() < costDiamond)
                return mo.showMsg(uw.id_c_msgCode.noDiamond); //钻石不足
            var args = {};
            args[uw.iface.a_user_buyGold_args.num] = num;
            mo.requestWaiting(uw.iface.a_user_buyGold, args, function (resultArr) {
                for (var i = 0; i < resultArr.length; i++) {
                    var locResult = resultArr[i];
                    var locDiamond = locResult[0];
                    var locGold = locResult[1];
                    self.increaseGold(locGold);
                    self.reduceDiamond(locDiamond);
                    var obj = {}, goldObj = {};
                    goldObj[uw.c_prop.spItemIdKey.gold] = locGold;
                    obj[uw.dsConsts.UseItemInfo.items] = goldObj;
                    uw.showGainTips(obj);
                }
                self.addBuyGoldCount(num);
                if (cb)
                    cb.call(target, resultArr);
            });
        };
        /**
         * 获取购买剩余次数
         * @returns {number}
         */
        __egretProto__.getBuyGoldReNum = function () {
            var self = this;
            var c_vip = mo.getJSONWithFileName(uw.cfg_c_vip);
            var vip = self.getVip();
            var buyGoldCount = self.getBuyGoldCount();
            var maxCount = c_vip[vip][uw.c_vip_goldCount]; //获取该玩家的最大购买次数
            var reNum = maxCount - buyGoldCount;
            if (reNum <= 0)
                mo.showMsg(uw.id_c_msgCode.cantUseMax, buyGoldCount);
            return reNum;
        };
        /**
         * 获取购买金币的消耗和产出
         * @param num
         * @returns {*[]}
         */
        __egretProto__.getBuyGoldCost = function (num) {
            var self = this;
            var buyGoldCount = self.getBuyGoldCount();
            var costDiamond = 0, addGold = 0;
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
            var userLvl = self.getLvl();
            for (var i = 0; i < num; i++) {
                buyGoldCount++;
                var locDiamond = uw.calBuyGoldDiamond(buyGoldCount);
                costDiamond += locDiamond;
                //计算金币
                var locGold = c_lvl[userLvl][uw.c_lvl_buyGold];
                locGold = uw.calBuyGold(buyGoldCount, locGold);
                addGold += locGold;
            }
            return [costDiamond, addGold, num];
        };
        /**
         * 获取购买体力次数
         * @returns {*}
         */
        __egretProto__.getBuyGoldCount = function () {
            return this.getTodayCount(uw.c_prop.countTypeKey.gold);
        };
        /**
         * 增加购买体力次数
         * @returns {*}
         */
        __egretProto__.addBuyGoldCount = function (count) {
            this.addTodayCount(uw.c_prop.countTypeKey.gold, count);
        };
        /**
         * 设置金钱的ui文字，金钱不足时设置为红色，足够是设置为金色。并返回金钱是否足够
         * @param widget
         * @param gold
         * @returns {boolean}
         */
        __egretProto__.setGoldTxt = function (widget, gold) {
            widget.setText(gold);
            var flag = this._data[uw.dsConsts.UserEntity.gold] >= gold;
            if (flag) {
                uw.setGoldColor(widget);
            }
            else {
                widget.setColor(0xff0000); //设置成红色
            }
            return flag;
        };
        /**
         * 设置金钱的ui文字，金钱不足时设置为红色，足够是设置为金色。并返回金钱是否足够
         * @param widget
         * @param diamond
         * @returns {boolean}
         */
        __egretProto__.setDiamondTxt = function (widget, diamond) {
            widget.setText(diamond);
            var flag = this._data[uw.dsConsts.UserEntity.diamond] >= diamond;
            if (flag) {
                uw.setDiamondColor(widget);
            }
            else {
                widget.setColor(0xff0000); //设置成红色
            }
            return flag;
        };
        /**
         * 获取用户中的今日次数
         * @param type
         */
        __egretProto__.getTodayCount = function (type) {
            var self = this;
            var uk = uw.dsConsts.UserEntity;
            var refreshTime = self.get(uk.countsRefreshTime);
            return uw.getTodayCount(refreshTime, function (needToRefresh, ft) {
                var counts = self.get(uk.counts);
                if (needToRefresh) {
                    counts = [];
                    self.set(uk.counts, counts);
                    self.set(uk.countsRefreshTime, ft);
                }
                return counts[type] || 0;
            });
        };
        /**
         * 用户中的今日次数+count, 默认为1
         * @param type
         * @param count
         */
        __egretProto__.addTodayCount = function (type, count) {
            var self = this;
            count = count == null ? 1 : count;
            var c = self.getTodayCount(type);
            self.get(uw.dsConsts.UserEntity.counts)[type] = c + count;
        };
        //*************************技能点相关 开始**********************
        __egretProto__.getMaxSkillPoints = function () {
            var self = this;
            var c_vip = mo.getJSONWithFileName(uw.cfg_c_vip);
            return c_vip[self.getVip()][uw.c_vip_skillPointLimit];
        };
        /**
         * 获取当前的技能点
         * @returns {*}
         */
        __egretProto__.getSkillPoints = function () {
            var self = this;
            var interval = self.skillPointInterval;
            var maxPoints = self.getMaxSkillPoints();
            var skillPointsReTime = self.getSkillPointReTime();
            var now = Date.newDate().getTime();
            var time = skillPointsReTime.getTime();
            if (now >= time)
                return maxPoints; //如果已经到了满点时间则返回技能上限
            return Math.min(maxPoints, maxPoints - Math.ceil((time - now) / interval));
        };
        __egretProto__.getSkillPointReTime = function () {
            var self = this;
            var skillPointsReTime = self._data[uw.dsConsts.UserEntity.skillPointsReTime];
            var now = Date.newDate();
            if (!skillPointsReTime)
                return now;
            if (typeof skillPointsReTime == "string")
                skillPointsReTime = Date.newDate(skillPointsReTime);
            if (skillPointsReTime.getTime() < now.getTime())
                return now;
            return skillPointsReTime;
        };
        /**
         * 获取技能点最近一次的恢复时间点（毫秒）
         * @returns {number}
         */
        __egretProto__.getNextSkillPointTime = function () {
            var self = this;
            var interval = self.skillPointInterval;
            var maxPoints = self.getMaxSkillPoints();
            var points = self.getSkillPoints(); //获取技能点
            var skillPointsReTime = self.getSkillPointReTime();
            return skillPointsReTime.getTime() - (interval * (maxPoints - points - 1));
        };
        __egretProto__.buySkillPoints = function (cb, target) {
            var self = this;
            mo.showMsg(uw.id_c_msgCode.buySkillPoints, self.skillPointCost, function () {
                if (self.skillPointCost > self.getDiamond())
                    return mo.showMsg(uw.id_c_msgCode.noDiamond); //钻石不足
                mo.requestWaiting(uw.iface.a_user_buySkillPoints, {}, function () {
                    var interval = self.skillPointInterval;
                    var skillPointsReTime = self.getSkillPointReTime();
                    //@任务——191 购买技能点
                    skillPointsReTime = Date.newDate(skillPointsReTime.getTime() - (interval * 10)); //固定是10点
                    self.set(uw.dsConsts.UserEntity.skillPointsReTime, skillPointsReTime); //重置恢复时间
                    self._setChanged(self.__class.ON_BUY_SKILL_POINTS);
                    if (cb)
                        cb.call(target);
                });
            }, self);
        };
        /**
         * 设置英雄控制器列表。这个接口只有数据初始化时才调用，故将其设置为私有的。
         * @param heroDataCtrlList
         */
        __egretProto__._setHeroDataCtrlList = function (heroDataCtrlList) {
            var self = this;
            self._heroDataCtrlList = heroDataCtrlList;
            self._heroDataCtrlMap = {};
            for (var i = 0, li = heroDataCtrlList.length; i < li; i++) {
                var itemi = heroDataCtrlList[i];
                self._heroDataCtrlMap[itemi.id] = itemi;
            }
        };
        __egretProto__.getHeroDataCtrlList = function () {
            return this._heroDataCtrlList;
        };
        __egretProto__.getNotOwnHeroDataCtrlList = function () {
            var self = this;
            var ownedTids = [];
            var heroDataCtrlList = self._heroDataCtrlList;
            for (var i = 0, li = heroDataCtrlList.length; i < li; ++i) {
                var heroDataCtrl = heroDataCtrlList[i];
                var tid = heroDataCtrl.tid;
                if (ownedTids.indexOf(tid) < 0) {
                    ownedTids.push(tid);
                }
            }
            //计算出
            var t_hero = mo.getJSONWithFileName(uw.cfg_t_hero);
            var c_heroCall = mo.getJSONWithFileName(uw.cfg_c_heroCall);
            var noOwnedList = [];
            var tempMap = {};
            for (var key in c_heroCall) {
                var tempId = key;
                var heroTemp = t_hero[tempId];
                var tid = heroTemp[uw.t_hero_tid];
                if (!tempMap[tid] && ownedTids.indexOf(tid) < 0) {
                    tempMap[tid] = 1;
                    noOwnedList.push(uw.HeroDataCtrl.create(null, heroTemp));
                }
            }
            return noOwnedList;
        };
        __egretProto__._filterHeroList = function (list, posType, ownedType) {
            var results = [];
            for (var i = 0, li = list.length; i < li; ++i) {
                var dataCtrl = list[i];
                if (ownedType == 0) {
                    if (dataCtrl.isTempOnly)
                        continue; //非实例
                }
                else {
                    if (!dataCtrl.isTempOnly)
                        continue; //实例
                    var fragOpt = dataCtrl.getFragmentProgressOpt();
                    if (ownedType == 1) {
                        if (fragOpt.total > fragOpt.cur)
                            continue; //碎片不足
                    }
                    else {
                        if (fragOpt.total <= fragOpt.cur)
                            continue; //碎片足够
                    }
                }
                if (posType == 0 || posType == dataCtrl.posType) {
                    results.push(dataCtrl);
                }
            }
            //排序函数设置
            var sQuality = uw.HeroDataCtrl.SORT_QUALITY;
            var sLvl = uw.HeroDataCtrl.SORT_LVL;
            var sTempId = uw.HeroDataCtrl.SORT_TEMP_ID;
            var sFragPercent = uw.HeroDataCtrl.SORT_FRAG_PERCENT;
            var sortKeyList = ownedType == 0 ? [sLvl, sQuality, sTempId] : ownedType == 2 ? [sFragPercent, sTempId] : [sTempId];
            results.sort(mo.sortOption.bind({ list: sortKeyList }));
            return results;
        };
        __egretProto__.getHeroDataCtrlListToShow = function (posType) {
            posType = posType || 0;
            var self = this;
            var results = [];
            var arr1 = self._filterHeroList(self.getNotOwnHeroDataCtrlList(), posType, 1);
            var arr2 = self._filterHeroList(self.getHeroDataCtrlList(), posType, 0);
            var arr3 = self._filterHeroList(self.getNotOwnHeroDataCtrlList(), posType, 2);
            results = results.concat(arr1);
            results = results.concat(arr2);
            results = results.concat(arr3);
            return results;
        };
        /**
         * 通过英雄id获取到英雄的数据控制器
         */
        __egretProto__.getHeroDataCtrlById = function (heroId) {
            return this._heroDataCtrlMap[heroId];
        };
        /**
         * 通过英雄模板同类id获取到英雄的dataCtrl
         * @param heroTid
         */
        __egretProto__.getHeroDataCtrlByTid = function (heroTid) {
            var heroDataCtrlList = this._heroDataCtrlList;
            for (var i = 0, li = heroDataCtrlList ? heroDataCtrlList.length : 0; i < li; i++) {
                var dataCtrl = heroDataCtrlList[i];
                if (dataCtrl.tid == heroTid)
                    return dataCtrl;
            }
            return null;
        };
        /**
         * 根据英雄Tid获得tempId
         * @param heroTid
         * @returns {*}
         */
        __egretProto__.getHeroTempIdByTid = function (heroTid) {
            var heroTids = heroTid instanceof Array ? heroTid : [heroTid];
            var tempIds = [];
            for (var i = 0, li = heroTids.length; i < li; i++) {
                var tId = heroTids[i];
                var dataCtrl = this.getHeroDataCtrlByTid(tId);
                if (dataCtrl) {
                    tempIds.push(dataCtrl.tempId);
                }
            }
            if (tempIds.length == 1)
                return tempIds[0];
            if (tempIds.length == 0)
                return null;
            return tempIds;
        };
        /**
         * 更新英雄的本地数据
         * @param matrixType
         * @param cb
         * @param cbTarget
         */
        __egretProto__.updateHeroDataByMatrixType = function (matrixType, cb, cbTarget) {
            var self = this;
            var args = {};
            var argsKey = uw.iface.a_hero_getList_args;
            args[argsKey.matrixType] = matrixType;
            var heroKey = uw.dsConsts.HeroEntity;
            mo.request(uw.iface.a_hero_getList, args, function (heroList) {
                for (var i = 0, li = heroList.length; i < li; i++) {
                    var hero = heroList[i];
                    var heroDataCtrl = self.getHeroDataCtrlById(hero[heroKey.id]);
                    heroDataCtrl.init(hero);
                }
                if (cb) {
                    cb.call(cbTarget, null);
                }
            });
        };
        /**
         * 根据布阵类型获取到总战斗力
         * @param type
         * @returns {number}
         */
        __egretProto__.getCombatEffByMatrixType = function (type) {
            var matrix = this.getMatrixByType(type);
            var combatEff = 0;
            for (var i = 0, li = matrix.length; i < li; i++) {
                var heroCtrl = matrix[i];
                combatEff += heroCtrl.combatEff;
            }
            return combatEff;
        };
        /**
         * 根据heroEntity更新数据，如果没有该英雄，这创建响应的DataCtrl实例。
         * @param heroEntity
         */
        __egretProto__.updateHeroByEntity = function (heroEntity) {
            var self = this;
            var heroKey = uw.dsConsts.HeroEntity;
            var heroId = heroEntity[heroKey.id];
            var dataCtrl = self.getHeroDataCtrlById(heroId);
            if (dataCtrl) {
                dataCtrl.reset(heroEntity);
            }
            else {
                dataCtrl = uw.HeroDataCtrl.create(heroEntity);
                self._heroDataCtrlMap[heroId] = dataCtrl;
                self._heroDataCtrlList.push(dataCtrl);
            }
            return dataCtrl;
        };
        /**
         * 召唤英雄
         * @param heroCellDisplayData
         * @param cb
         * @param target
         */
        __egretProto__.callHero = function (heroCellDisplayData, cb, target) {
            var self = this;
            if (heroCellDisplayData.fragOwned < heroCellDisplayData.fragRequired) {
                return mo.showMsg("碎片不足，这里不需要配置msgCode！");
            }
            var gold = uw.calHeroUpgradeGold(heroCellDisplayData.quality);
            //提示是否兑换的信息
            mo.showMsg(uw.id_c_msgCode.ifHeroGet, gold, function () {
                if (gold > self.getGold()) {
                    return mo.showMsg(uw.id_c_msgCode.noGolds);
                }
                var args = {};
                var argsKey = uw.iface.a_hero_callHero_args;
                args[argsKey.tempId] = heroCellDisplayData.tempId;
                mo.requestWaiting(uw.iface.a_hero_callHero, args, function (heroEntity) {
                    var heroCtrl = self.updateHeroByEntity(heroEntity); //更新英雄
                    self.reduceGold(gold); //扣除金币
                    self.addItem(heroCellDisplayData.fragmentId, -heroCellDisplayData.fragRequired); //扣除碎片
                    self.pushNotify(self.__class.ON_CALL_HERO, heroCtrl);
                    if (cb)
                        cb.call(target);
                });
            });
        };
        /**
         * 判断是否有英雄可以召唤。
         * @returns {boolean}
         */
        __egretProto__.hasHeroToCall = function () {
            var self = this;
            var dcList = self.getNotOwnHeroDataCtrlList();
            for (var i = 0, li = dcList.length; i < li; i++) {
                var dataCtrl = dcList[i];
                var fragmentNum = self.getItemNum(dataCtrl.fragmentId); //先获取到当前的碎片数量
                if (fragmentNum >= dataCtrl.totalFragmentRequired) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 是否有专属装备可以穿戴
         * @returns {boolean}
         */
        __egretProto__.hasExclusiveToPuton = function () {
            var self = this;
            var dcList = self._heroDataCtrlList;
            for (var i = 0, li = dcList.length; i < li; i++) {
                var dataCtrl = dcList[i];
                if (dataCtrl.hasExclusiveToPuton())
                    return true;
            }
            return false;
        };
        /**
         * 是否有普通装备可以升级
         * @returns {boolean}
         */
        __egretProto__.hasNormalEquipToUp = function () {
            var self = this;
            var dcList = self._heroDataCtrlList;
            for (var i = 0, li = dcList.length; i < li; i++) {
                var dataCtrl = dcList[i];
                if (dataCtrl.hasNormalEquipToUp())
                    return true;
            }
            return false;
        };
        __egretProto__.updateHeroSortOption = function () {
            var self = this;
            var heroList = self._heroDataCtrlList, heroCtrl, equipCtrl;
            for (var i = 0, li = heroList.length; i < li; i++) {
                heroCtrl = heroList[i];
                heroCtrl[uw.HeroDataCtrl.SORT_EXC_PUT_ON] = 0;
                equipCtrl = heroCtrl.getEquipDataCtrlByPart(uw.c_prop.equipPartKey.exclusive);
                if (!equipCtrl.isTempOnly) {
                    heroCtrl[uw.HeroDataCtrl.SORT_EXC_PUT_ON] = 1;
                }
            }
        };
        __egretProto__._setNotOnEquipList = function (list) {
            this._notOnEquipList = list;
        };
        __egretProto__._swapEquipToNotOn = function (equipDataCtrl, oldEquipDataCtrl) {
            for (var i = 0, list = this._notOnEquipList || [], li = list.length; i < li; ++i) {
                if (equipDataCtrl == list[i]) {
                    if (!oldEquipDataCtrl || oldEquipDataCtrl.isTempOnly) {
                        list.splice(i, 1);
                    }
                    else {
                        list[i] = oldEquipDataCtrl;
                    }
                    break;
                }
            }
        };
        /**
         * 根据装备穿戴部位类型获取到未穿戴的装备列表
         * @param part
         * @param heroTempId
         */
        __egretProto__.getNotOnEquipListByPart = function (part, heroTempId) {
            var resultList = [];
            var exclusiveId;
            if (heroTempId) {
                var heroTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_hero, heroTempId);
                var tid = heroTemp[uw.t_hero_tid];
                var warriorTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, tid);
                exclusiveId = warriorTemp[uw.t_warrior_exclusiveId]; //获取专属id
            }
            for (var i = 0, list = this._notOnEquipList || [], li = list.length; i < li; ++i) {
                if (part == list[i].part && (!exclusiveId || list[i].tempId == exclusiveId)) {
                    resultList.push(list[i]);
                }
            }
            return resultList;
        };
        __egretProto__.getNotOnEquipList = function () {
            return this._notOnEquipList;
        };
        __egretProto__.getNotOnEquipById = function (equipId) {
            var list = this._notOnEquipList || [];
            for (var i = 0, li = list.length; i < li; i++) {
                var itemi = list[i];
                if (itemi.id == equipId) {
                    return itemi;
                }
            }
            return null;
        };
        __egretProto__.getNotOnEquipNumByTempId = function (tempId) {
            var num = 0;
            var list = this._notOnEquipList;
            for (var i = 0, li = list.length; i < li; i++) {
                var itemi = list[i];
                if (itemi.tempId == tempId) {
                    num++;
                }
            }
            return num;
        };
        __egretProto__.getAllNotOnExclusiveEquipList = function () {
            var list = [];
            var notOnEquipList = this._notOnEquipList;
            for (var i = 0, li = notOnEquipList.length; i < li; i++) {
                var equip = notOnEquipList[i];
                if (equip.isExclusive) {
                    list.push(equip);
                }
            }
            return list;
        };
        /**
         *  从背包中移除一件未穿戴的装备，在出售装备时使用
         * @param ctrl
         */
        __egretProto__.removeEquip = function (ctrl) {
            var self = this;
            mo.ArrayRemoveObject(self._notOnEquipList, ctrl);
        };
        /**
         * 新增装备
         * @param {Array} equips EquipEntity数组
         */
        __egretProto__.addEquips = function (equips) {
            var self = this;
            equips = equips instanceof Array ? equips : [equips];
            var ctrls = [], ctrl;
            for (var i = 0, li = equips.length; i < li; i++) {
                ctrl = uw.EquipDataCtrl.create(equips[i]);
                //控制最大获得数量
                if (self.getNotOnEquipNumByTempId(ctrl.tempId) >= ctrl.maxGet)
                    continue;
                self._notOnEquipList.push(ctrl);
                ctrls.push(ctrl);
            }
            if (ctrls.length) {
                self.pushNotify(self.__class.ON_GET_EQUIPS, ctrls);
            }
            return ctrls;
        };
        /**
         * 根据装备的id列表删除装备。注意，只有未穿戴的装备才可以删。
         * @param equipIds
         */
        __egretProto__.delEquipsByIds = function (equipIds) {
            var self = this;
            var notOnEquipList = self._notOnEquipList;
            for (var i = 0, li = notOnEquipList.length; i < li;) {
                var ctrl = notOnEquipList[i];
                if (equipIds.indexOf(ctrl.id) >= 0) {
                    notOnEquipList.splice(i, 1);
                    li--;
                }
                else {
                    i++;
                }
            }
            self._setChanged(self.__class.ON_DEL_EQUIPS);
        };
        /**
         * 获得可用于加专属经验的装备
         * @returns {Array}
         */
        __egretProto__.getEquipsHasExclusiveExp = function () {
            var self = this;
            var equips = [];
            var notOnEquipList = self._notOnEquipList;
            for (var i = 0, li = notOnEquipList.length; i < li; i++) {
                var ctrl = notOnEquipList[i];
                if (ctrl.exclusiveExp > 0) {
                    equips.push(ctrl);
                }
            }
            return equips;
        };
        __egretProto__.getExclusiveEquipByHeroTid = function (heroTid) {
            var self = this;
            //从为穿戴的列表中取
            var list = self._notOnEquipList;
            var tid = heroTid;
            for (var i = 0, li = list.length; i < li; i++) {
                var ctrl = list[i];
                if (ctrl.heroTid == tid) {
                    return ctrl; //发现则返回
                }
            }
            return null;
        };
        /**
         * 兑换专属装备。
         * @param tempId
         * @param thisFragId
         * @param fragMap
         * @param cb
         * @param target
         * @returns {*}
         */
        __egretProto__.buyExclusiveEquip = function (tempId, thisFragId, fragMap, cb, target) {
            var self = this;
            var shopExclusiveCfg = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.shopExclusive);
            var pointRequired = shopExclusiveCfg[0]; //需要的总积分
            var otherFragPoint = shopExclusiveCfg[1]; //其他碎片可兑换的积分
            var thisFragPoint = shopExclusiveCfg[2]; //专属碎片可兑换的积分
            var points = 0;
            for (var fragId in fragMap) {
                var num = fragMap[fragId];
                if (this.getItemNum(fragId) < num)
                    return mo.showMsg("背包里的碎片id【%s】不足！", fragId);
                if (fragId == thisFragId)
                    points += thisFragPoint * num;
                else
                    points += otherFragPoint * num;
            }
            if (points < pointRequired)
                return mo.showMsg(uw.id_c_msgCode.noIntegral); //积分不足
            mo.showMsg(uw.id_c_msgCode.buyExclusive, function () {
                var args = {};
                var argsKey = uw.iface.a_user_buyExclusiveEquip_args;
                args[argsKey.tempId] = tempId;
                args[argsKey.thisFragId] = thisFragId;
                args[argsKey.fragMap] = fragMap;
                mo.requestWaiting(uw.iface.a_user_buyExclusiveEquip, args, function (equipEntity) {
                    uw.log("equipEntity--->", equipEntity);
                    uw.log("fragMap---->", fragMap);
                    var equips = self.addEquips([equipEntity]); //添加装备
                    self.reduceItems(fragMap); //进行碎片扣减
                    if (cb)
                        cb.call(target, equips);
                });
            });
        };
        /**
         * 初始化副本进度映射
         * @param progressList
         * @private
         */
        __egretProto__._initProgressMap = function (progressList) {
            var self = this;
            var pCopyIdKey = uw.c_prop.pCopyIdKey;
            self._copyProgressMap = {};
            self._copyProgressMapByType = {}; //根据主副本类型区分的映射
            var lastProgress;
            for (var i = 0, li = progressList.length; i < li; i++) {
                var dataCtrl = uw.CopyProgressDataCtrl.create(progressList[i]);
                var type = dataCtrl.type;
                self._copyProgressMapByType[type] = self._copyProgressMapByType[type] || {};
                self._copyProgressMap[dataCtrl.id] = self._copyProgressMapByType[type][dataCtrl.id] = dataCtrl;
                if (dataCtrl.type == uw.c_prop.pCopyTypeKey.normal)
                    lastProgress = dataCtrl;
                if (i < li - 1) {
                    var nextId = progressList[i + 1][uw.dsConsts.CopyProgressEntity.pCopyId];
                    if (nextId - dataCtrl.id != 1 && dataCtrl.finished) {
                        self._newCopyProgress(dataCtrl.id + 1);
                    }
                }
            }
            var pCopyIdToBeAdded;
            if (lastProgress) {
                if (lastProgress.finished) {
                    pCopyIdToBeAdded = lastProgress.id + 1;
                }
            }
            else {
                pCopyIdToBeAdded = pCopyIdKey.normal;
            }
            if (pCopyIdToBeAdded)
                lastProgress = self._newCopyProgress(pCopyIdToBeAdded);
            if (lastProgress)
                self._lastCopyInfo = {
                    pCopyId: lastProgress.id,
                    copyId: lastProgress.getOpeningId()
                };
            //初始化精英副本第一个主副本
            self._newCopyProgress(pCopyIdKey.cream);
            //初始化试炼1副本进度
            self._newCopyProgress(pCopyIdKey.trial1);
            //初始化试炼2副本进度
            self._newCopyProgress(pCopyIdKey.trial2);
            //初始化试炼3副本进度
            self._newCopyProgress(pCopyIdKey.trial3);
            //初始化镜像世界副本进度
            self._newCopyProgress(pCopyIdKey.mirror);
            //初始化竞技场副本进度
            self._newCopyProgress(pCopyIdKey.arena);
        };
        __egretProto__._newCopyProgress = function (pCopyIdToBeAdded) {
            var self = this;
            if (self._copyProgressMap[pCopyIdToBeAdded])
                return self._copyProgressMap[pCopyIdToBeAdded]; //已经有了
            var t_copyPrimary = mo.getJSONWithFileName(uw.cfg_t_copyPrimary);
            var temp = t_copyPrimary[pCopyIdToBeAdded];
            if (!temp)
                return null; //不存在
            var KEY = uw.dsConsts.CopyProgressEntity;
            var obj = {};
            obj[KEY.userId] = self.id;
            obj[KEY.pCopyId] = pCopyIdToBeAdded;
            obj[KEY.finished] = 0;
            var dataCtrl = uw.CopyProgressDataCtrl.create(obj);
            var type = dataCtrl.type;
            self._copyProgressMapByType[type] = self._copyProgressMapByType[type] || {};
            self._copyProgressMap[dataCtrl.id] = self._copyProgressMapByType[type][dataCtrl.id] = dataCtrl;
            return dataCtrl;
        };
        /**
         * 获取化副本进度映射
         * @returns {null}
         */
        __egretProto__.getCopyProgressMap = function () {
            return this._copyProgressMap;
        };
        __egretProto__.getCopyProgressMapByType = function (type) {
            var self = this;
            var map = this._copyProgressMapByType[type];
            return map || {};
        };
        /**
         * 通过主副本id获取到副本进度dataCtrl。
         * @param pCopyId
         */
        __egretProto__.getCopyProgress = function (pCopyId) {
            return this._copyProgressMap[pCopyId];
        };
        /**
         * 根据子副本获取副本进度dataCtrl。
         * @param copyId
         * @returns {*}
         */
        __egretProto__.getCopyProgressByCopyId = function (copyId) {
            var t_copy = mo.getJSONWithFileName(uw.cfg_t_copy);
            var copyType = t_copy[copyId][uw.t_copy_type];
            var pCopyId = t_copy[copyId][uw.t_copy_pCopyId];
            //守卫塔和镜像世界不需要取服务端的数据
            if (copyType == uw.c_prop.copyTypeKey.guardTower || copyType == uw.c_prop.copyTypeKey.mirror) {
                return this._getNoSeverProgressByPCopyId(pCopyId);
            }
            else {
                return this._copyProgressMap[pCopyId];
            }
        };
        /**
         * 获取木有存数据库的进度
         * @param pCopyId
         * @private
         */
        __egretProto__._getNoSeverProgressByPCopyId = function (pCopyId) {
            var copyProgress = this._copyProgressMap[pCopyId];
            if (!copyProgress) {
                copyProgress = this._newCopyProgress(pCopyId);
                this._copyProgressMap[pCopyId] = copyProgress;
            }
            return copyProgress;
        };
        /**
         * 判断副本是否锁定.
         * @param copyId
         * @returns {*}
         */
        __egretProto__.isCopyLocked = function (copyId) {
            var copy = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            var pCopyId = copy[uw.t_copy_pCopyId];
            var progress = this._copyProgressMap[pCopyId];
            if (!progress) {
                return true;
            }
            return progress.isCopyLocked(copyId);
        };
        /**
         * 判断一个副本是否通关
         * @param copyId
         * @returns {Boolean}
         */
        __egretProto__.isCopyPassed = function (copyId) {
            var copyProgressDataCtrl = this.getCopyProgressByCopyId(copyId);
            return copyProgressDataCtrl.isCopyPassed(copyId);
        };
        //*****************副本进度相关接口 结束****************
        //*****************战斗相关接口 开始****************
        __egretProto__._validCopy = function (copyId, isWipe, count) {
            var self = this;
            var copyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            var strength = self.getStrength();
            if (count == -1) {
                count = (strength / copyInfo[uw.t_copy_strength]) | 0;
                if (count == 0) {
                    //体力不足啦魂淡
                    return self.showBuyStrength();
                }
            }
            else if (strength < copyInfo[uw.t_copy_strength] * count)
                return self.showBuyStrength();
            var progress = self.getCopyProgress(copyInfo[uw.t_copy_pCopyId]);
            return progress.validCopy(copyId, isWipe, count);
        };
        /**
         * 开始进入战斗前需要调用下。
         * @param copyId
         * @param cb
         * @param target
         */
        __egretProto__.fightStart = function (copyId, cb, target) {
            var self = this;
            if (self._validCopy(copyId, false, 1)) {
                var args = {};
                var argsKey = uw.iface.a_copy_fightStart_args;
                args[argsKey.copyId] = copyId;
                mo.requestWaiting(uw.iface.a_copy_fightStart, args, function (uniqueKey) {
                    self._onFightStart(copyId, uniqueKey);
                    if (cb)
                        return cb.call(target);
                });
            }
        };
        __egretProto__._onFightStart = function (copyId, uniqueKey) {
            var self = this;
            var copyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            var strength = copyInfo[uw.t_copy_strength];
            var rate = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.fightConfig)[2];
            self.addStrength(-Math.floor(strength / rate)); //扣减体力
            self.uniqueKey = uniqueKey;
        };
        /**
         * 副本战斗结束
         * @param copyId
         * @param isWin
         * @param fightData
         * @param cb
         * @param target
         */
        __egretProto__.fightEnd = function (copyId, isWin, fightData, cb, target) {
            var self = this;
            var encryptStr = uw.fightUtils.md5(JSON.stringify(fightData), self.getId());
            var vData = [encryptStr, fightData];
            var args = {};
            var argsKey = uw.iface.a_copy_fightEnd_args;
            args[argsKey.isWin] = isWin;
            args[argsKey.vData] = vData;
            mo.requestWaiting(uw.iface.a_copy_fightEnd, args, function (fightResult) {
                if (!isWin) {
                    self.pushNotify(self.__class.ON_COPY_FAILED, copyId);
                    return cb.call(target, null);
                }
                self.saveFightResults(copyId, false, fightResult);
                if (cb)
                    return cb.call(target, fightResult);
            });
        };
        /**
         * 获得扫荡opt
         * @param copyId
         * @param count
         * @returns {{copyId: any, count: any, strengthNeed: number, strengthEnough: boolean}}
         */
        __egretProto__.getWipeCopyOpt = function (copyId, count) {
            var self = this;
            var opt = {
                copyId: copyId,
                count: count,
                strengthNeed: 0,
                strengthEnough: false
            };
            var copyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            var strength = self.getStrength();
            opt.strengthNeed = copyInfo[uw.t_copy_strength] * count;
            opt.strengthEnough = strength >= opt.strengthNeed;
            return opt;
        };
        /**
         * 扫荡副本
         * @param copyId
         * @param count     扫荡次数，-1表示消耗完所有体力
         * @param cb
         * @param target
         */
        __egretProto__.wipeCopy = function (opt, cb, target) {
            var self = this;
            //检查体力
            if (!opt.strengthEnough)
                return self.showBuyStrength();
            //多次扫荡需要检查vip等级
            var vipEnough = self.getVipFuncCfg(uw.c_vip_isWipeMore);
            if (opt.count > 1 && !vipEnough)
                return mo.showMsg(uw.id_c_msgCode.higherVipLvOpen, uw.getVipOpenLevel(uw.c_vip_isWipeMore));
            //扫荡符不足则用钻石
            var ticketsLeft = uw.userDataCtrl.getItemNum(uw.c_prop.spItemIdKey.sweepingTickets);
            var diamondCost = ticketsLeft < opt.count ? opt.count : 0;
            if (diamondCost)
                return mo.showMsg(uw.id_c_msgCode.noItemTicket, opt.count, diamondCost, function () {
                    self._wipeCopy(opt.copyId, opt.count, diamondCost, cb, target);
                });
            //扫荡符足够
            self._wipeCopy(opt.copyId, opt.count, diamondCost, cb, target);
        };
        __egretProto__._wipeCopy = function (copyId, count, diamondCost, cb, target) {
            var self = this;
            if (self._validCopy(copyId, true, count)) {
                var args = {};
                var argsKey = uw.iface.a_copy_wipe_args;
                args[argsKey.copyId] = copyId;
                args[argsKey.count] = count;
                mo.requestWaiting(uw.iface.a_copy_wipe, args, function (fightResultList) {
                    // 保存扫荡结果
                    self.saveFightResults(copyId, true, fightResultList);
                    //扣除钻石
                    if (diamondCost > 0) {
                        uw.userDataCtrl.reduceDiamond(diamondCost);
                    }
                    else {
                        //扣除扫荡符
                        self.addItem(uw.c_prop.spItemIdKey.sweepingTickets, -count);
                    }
                    if (cb)
                        return cb.call(target, fightResultList);
                });
            }
        };
        /**
         * 试炼挑战开始
         * @param copyId
         * @param cb
         * @param target
         */
        __egretProto__.trialFightStart = function (copyId, cb, target) {
            var self = this;
            if (self._validCopy(copyId, false, 1)) {
                var args = {};
                var argsKey = uw.iface.a_trial_fightStart_args;
                args[argsKey.copyId] = copyId;
                //获取免费次数剩余
                //var progress = self.getCopyProgressByCopyId(copyId);
                //var leftCount = Math.max(0, uw.trialFreeCount - progress.getTotalTimes());
                mo.requestWaiting(uw.iface.a_trial_fightStart, args, function (uniqueKey) {
                    self._onFightStart(copyId, uniqueKey);
                    //if(leftCount <= 0) self.reduceItem(uw.trialItemId, 1);//扣减通行证
                    if (cb)
                        return cb.call(target);
                });
            }
        };
        /**
         * 试炼挑战结束
         * @param copyId
         * @param isWin
         * @param fightData
         * @param cb
         * @param target
         */
        __egretProto__.trialFightEnd = function (copyId, isWin, fightData, cb, target) {
            var self = this;
            var encryptStr = uw.fightUtils.md5(JSON.stringify(fightData), self.getId());
            var vData = [encryptStr, fightData];
            var args = {};
            var argsKey = uw.iface.a_trial_fightEnd_args;
            args[argsKey.isWin] = isWin;
            args[argsKey.vData] = vData;
            //获取免费次数剩余
            var progress = self.getCopyProgressByCopyId(copyId);
            var leftCount = Math.max(0, uw.trialFreeCount - progress.getTotalTimes());
            mo.requestWaiting(uw.iface.a_trial_fightEnd, args, function (fightResult) {
                if (!isWin)
                    return cb.call(target, null);
                self.saveFightResults(copyId, false, fightResult);
                if (leftCount <= 0)
                    self.reduceItem(uw.trialItemId, 1); //扣减通行证
                if (cb)
                    return cb.call(target, fightResult);
            });
        };
        /**
         * 合并战果
         * @param fightResultList
         * @returns combineList: combineList.items 物品 combineList.equips 装备
         * @private
         */
        __egretProto__._combineFightResults = function (fightResultList) {
            var self = this;
            var resultKey = uw.dsConsts.FightResult;
            var count = fightResultList.length;
            var combineList = {};
            combineList.items = {};
            combineList.equips = [];
            var _join = function (aDict, bDict) {
                for (var key in bDict) {
                    if (!aDict[key]) {
                        aDict[key] = 0;
                    }
                    aDict[key] += bDict[key];
                }
            };
            for (var i = 0; i < count; ++i) {
                var fightResult = fightResultList[i];
                _join(combineList.items, fightResult[resultKey.items]); //添加背包物品
                _join(combineList.items, fightResult[resultKey.chestItems]); //添加守卫塔宝箱
                _join(combineList.items, fightResult[resultKey.wipeItems]); //添加扫荡额外物品
                combineList.equips.concat(fightResult[resultKey.equips]); //添加装备
            }
            return combineList;
        };
        /**
         * 保存战斗结果
         * @param copyId
         * @param isWipe
         * @param fightResultList
         */
        __egretProto__.saveFightResults = function (copyId, isWipe, fightResultList) {
            var self = this;
            var resultKey = uw.dsConsts.FightResult;
            fightResultList = fightResultList instanceof Array ? fightResultList : [fightResultList];
            //合并物品和装备奖励
            var combinedList = self._combineFightResults(fightResultList);
            self.addItems(combinedList.items); //添加背包物品
            self.addEquips(combinedList.equips); //添加装备
            var count = fightResultList.length;
            for (var i = 0; i < count; ++i) {
                var fightResult = fightResultList[i];
                var heros = fightResult[resultKey.heroes];
                if (heros) {
                    var heroKey = uw.dsConsts.HeroEntity;
                    for (var j = 0, lj = heros.length; j < lj; j++) {
                        var hero = heros[j];
                        var heroDataCtrl = self.getHeroDataCtrlById(hero[heroKey.id]);
                        heroDataCtrl.reset(hero); //重置英雄数据
                    }
                }
                // pvp战斗副本id唯一且不要处理副本进度
                if (copyId && copyId != uw.mirrorPVPCopyId) {
                    var copyProgress = self.getCopyProgressByCopyId(copyId); //获取副本进度
                    var star = isWipe ? 3 : fightResult[resultKey.star];
                    copyProgress.setCopyPassed(copyId, star); //设置副本通关
                }
            }
            if (copyId) {
                var copyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
                var strength = copyInfo[uw.t_copy_strength];
                self.increaseGold(copyInfo[uw.t_copy_gold] * count); //添加金币
                self.increaseExploit(copyInfo[uw.t_copy_exploit] * count); //添加功勋
                if (isWipe) {
                    self.addStrength(-strength * count); //扣减体力
                }
                else if (copyId != uw.mirrorPVPCopyId) {
                    var rate = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.fightConfig)[2];
                    self.addStrength(-(strength - Math.floor(strength / rate)) * count); //扣减体力
                }
                self.addExpc(copyInfo[uw.t_copy_teamExpc] * count); //添加领主经验
            }
        };
        __egretProto__._addCdTime4Arena = function () {
            var self = this;
            var progress = self.getCopyProgress(uw.c_prop.pCopyIdKey.arena);
            var copyPrimaryTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copyPrimary, uw.c_prop.pCopyIdKey.arena);
            var copyId = copyPrimaryTemp[uw.t_copyPrimary_firstId];
            var t_copy = mo.getJSONWithFileName(uw.cfg_t_copy);
            var copyTemp = t_copy[copyId];
            progress.pTime = progress._getPTime(copyTemp);
        };
        /**
         * 竞技场挑战开始
         * @param rank
         * @param cb
         * @param target
         */
        __egretProto__.arenaFightStart = function (rank, cb, target) {
            var self = this;
            var args = {};
            var argsKey = uw.iface.a_arena_fightStart_args;
            args[argsKey.rank] = rank;
            self.arenaRank = rank;
            mo.requestWaiting(uw.iface.a_arena_fightStart, args, function (arenaFight) {
                self.uniqueKey = arenaFight[uw.dsConsts.ArenaFight.uniqueKey];
                var copyPrimaryTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copyPrimary, uw.c_prop.pCopyIdKey.arena);
                var copyId = copyPrimaryTemp[uw.t_copyPrimary_firstId];
                var t_copy = mo.getJSONWithFileName(uw.cfg_t_copy);
                var copyTemp = t_copy[copyId];
                self._onFightStart(copyId, arenaFight[uw.dsConsts.ArenaFight.uniqueKey]);
                var progress = self.getCopyProgress(uw.c_prop.pCopyIdKey.arena);
                progress.pTime = progress._getPTime(copyTemp); //一开始就要算上cd时间
                progress.addCopyTodayCount(copyId); //一开始就进行次数扣减
                uw.arenaDataCtrl.enemyUserId = arenaFight[uw.dsConsts.ArenaFight.enemyUserId];
                uw.arenaDataCtrl.enemySecretSkills = arenaFight[uw.dsConsts.ArenaFight.secretSkills];
                uw.arenaDataCtrl.enemyHeros = arenaFight[uw.dsConsts.ArenaFight.heroes];
                if (cb)
                    return cb.call(target);
            });
        };
        /**
         * 竞技场挑战结束
         * @param isWin
         * @param fightData
         * @param cb
         * @param target
         */
        __egretProto__.arenaFightEnd = function (isWin, fightData, cb, target) {
            var self = this;
            fightData[4] = self.arenaRank;
            var encryptStr = uw.fightUtils.md5(JSON.stringify(fightData), self.getId());
            var vData = [encryptStr, fightData];
            var args = {};
            var argsKey = uw.iface.a_arena_fightEnd_args;
            args[argsKey.isWin] = isWin;
            args[argsKey.vData] = vData;
            mo.requestWaiting(uw.iface.a_arena_fightEnd, args, function (fightResult) {
                //添加荣誉值
                var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
                var arenaCfg = c_game[uw.id_c_game.arenaCfg];
                self.increaseHonor(isWin ? arenaCfg[6] : arenaCfg[7]);
                if (!isWin)
                    return cb.call(target, null);
                var rank = fightResult[uw.dsConsts.FightResult.rank];
                var highRank = uw.arenaDataCtrl.highRank, rankInfo;
                if (rank < highRank) {
                    var diamond = fightResult[uw.dsConsts.FightResult.diamond]; //钻石奖励
                    //设置最高排名奖励的钻石
                    uw.arenaDataCtrl.setHighRankData([highRank, rank, diamond]);
                }
                var copyPrimaryTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copyPrimary, uw.c_prop.pCopyIdKey.arena);
                var copyId = copyPrimaryTemp[uw.t_copyPrimary_firstId];
                self.saveFightResults(copyId, false, fightResult);
                if (cb)
                    return cb.call(target, fightResult);
            });
        };
        /**
         * 重置副本挑战次数
         * @param opt
         * @param cb
         * @param target
         * @returns {*}
         */
        __egretProto__.resetCopyCount = function (opt, cb, target) {
            opt.progress.buyCopyCount(opt.copyId, cb, target);
        };
        /**
         * 获得副本剩余挑战次数OPT
         * @param copyId
         * @returns {any}
         */
        __egretProto__.getResetCopyCountOpt = function (copyId) {
            var self = this;
            var t_copy = mo.getJSONWithFileName(uw.cfg_t_copy);
            var copyInfo = t_copy[copyId]; //获取副本配置信息
            var pCopyId = copyInfo[uw.t_copy_pCopyId]; //获取主副本id
            var progress = self.getCopyProgress(pCopyId); //获取到对应的副本进度
            var opt = {
                copyId: copyId,
                progress: progress,
                isShow: false,
                totalTimes: 0,
                leftTimes: 0,
                hasTimes: false,
                resetCount: 0,
                resetCountLeft: 0
            };
            if (progress.type != uw.c_prop.pCopyTypeKey.cream)
                return opt; //不是精英副本不显示
            opt.isShow = true;
            var times = progress.getCopyTodayCount(copyId); //已挑战次数
            opt.totalTimes = copyInfo[uw.t_copy_timesPerDay]; //今日总共可挑战次数
            opt.leftTimes = Math.max(opt.totalTimes - times, 0); //剩余可挑战次数
            opt.hasTimes = opt.leftTimes > 0;
            opt.resetCount = progress.getCopyResetTodayCount(copyId); //今日重置次数
            opt.resetCountLeft = progress.getBuyCopyCountLeft(copyId); //今日剩余重置次数
            return opt;
        };
        /**
         * 获取副本布阵
         */
        __egretProto__.getMatrixByType = function (type) {
            var self = this;
            if (type == null) {
                uw.warn("魂淡哦，布阵类型不能为空啦，请检查！");
                return [];
            }
            type = typeof type == "string" ? parseInt(type) : type;
            if (!self._matrixMap) {
                self._matrixMap = {};
            }
            var matrix = self._matrixMap[type];
            var key = self.__class.MATRIX_TYPE_KEY_MAP[type];
            if (!matrix) {
                matrix = self._matrixMap[type] = [];
            }
            else {
                matrix.length = 0; //重置下
            }
            var heroDataCtrlList = self._heroDataCtrlList;
            for (var i = 0, li = heroDataCtrlList.length; i < li; i++) {
                var ctrl = heroDataCtrlList[i];
                var pos = ctrl.get(key);
                if (pos != null) {
                    matrix[pos] = ctrl;
                }
            }
            //目前只有竞技场防守初始化需要这么操作 【已确认】
            //镜像的防守阵型相关的是在首次战斗时就已经初始化好了的
            var matrixTypeKey = uw.c_prop.matrixTypeKey;
            if (matrix.length == 0 && type == matrixTypeKey.arenaD) {
                return self.getMatrixByType(matrixTypeKey.copy);
            }
            return matrix;
        };
        /**
         * 保存pvp布阵
         * @param posDic
         */
        __egretProto__.setMatrixPVP = function (posDic) {
            var self = this;
            var posKey = self.__class.MATRIX_TYPE_KEY_MAP[uw.c_prop.matrixTypeKey.mirrorPVPA];
            for (var pos in posDic) {
                var heroId = posDic[pos];
                var heroCtrl = self.getHeroDataCtrlById(heroId);
                heroCtrl.set(posKey, pos);
            }
        };
        /**
         * 清除pvp布阵
         */
        __egretProto__.clearMatrixPVP = function () {
            var self = this;
            var heroDataCtrlList = self._heroDataCtrlList;
            var posKey = self.__class.MATRIX_TYPE_KEY_MAP[uw.c_prop.matrixTypeKey.mirrorPVPA];
            for (var i = 0, li = heroDataCtrlList.length; i < li; i++) {
                var ctrl = heroDataCtrlList[i];
                ctrl.set(posKey, null);
            }
        };
        /**
         * 保存布阵。
         * @param type
         * @param posDic
         * @param cb
         * @param target
         */
        __egretProto__.saveMatrixByType = function (type, posDic, cb, target) {
            var self = this;
            if (!posDic)
                return mo.showMsg("布阵不能为空！"); //TODO
            var keys = Object.keys(posDic);
            if (!keys || keys.length == 0)
                return mo.showMsg("布阵不能为空！"); //TODO
            if (type == uw.c_prop.matrixTypeKey.mirrorD && keys.length != 5)
                return mo.showMsg("镜像防守阵容不能少于5个英雄！"); //TODO
            var args = {};
            var argsKey = uw.iface.a_hero_changeMorePos_args;
            args[argsKey.posDic] = posDic;
            args[argsKey.matrixType] = type;
            mo.requestWaiting(uw.iface.a_hero_changeMorePos, args, function () {
                //更新本地布阵
                var posKey = self.__class.MATRIX_TYPE_KEY_MAP[type];
                //先清空所有的布阵
                var heroDataList = self.getHeroDataCtrlList();
                for (var i = 0, li = heroDataList.length; i < li; i++) {
                    heroDataList[i].set(posKey, null);
                }
                var tIds = [];
                for (var pos in posDic) {
                    var heroId = posDic[pos];
                    var heroCtrl = self.getHeroDataCtrlById(heroId);
                    heroCtrl.set(posKey, pos);
                    tIds.push(heroCtrl.tempId);
                }
                if (cb)
                    cb.call(target);
                self.pushNotify(self.__class.ON_MATRIX_CHANGED, posDic, tIds);
            });
        };
        /**
         * 初始化任务列表，不对外部开放的接口。
         * @param cb
         * @param target
         * @private
         */
        __egretProto__._initTasks = function (cb, target) {
            if (target === void 0) { target = null; }
            var self = this;
            self._tasks = [];
            self._doneTasks = [];
            self._dailyTasks = [];
            mo.request(uw.iface.a_user_getTask, function (taskEntity) {
                self._updateTasks(taskEntity);
                if (cb)
                    cb.call(target);
            });
        };
        __egretProto__._updateTasks = function (taskEntity) {
            var self = this;
            var KEY = uw.dsConsts.TaskEntity;
            var dailyTasks = taskEntity[KEY.dailyTasks];
            var tasks = taskEntity[KEY.tasks];
            self._doneTasks = taskEntity[KEY.doneTasks] || [];
            self._taskRefreshTime = taskEntity[KEY.refreshTime];
            for (var i = 0, li = self._tasks.length; i < li; i++) {
                self._tasks[i].doDtor(); //先进行一下释放
            }
            for (var i = 0, li = self._dailyTasks.length; i < li; i++) {
                self._dailyTasks[i].doDtor(); //先进行一下释放
            }
            self._tasks.length = 0;
            self._dailyTasks.length = 0;
            for (var taskId in dailyTasks) {
                var finishedCount = dailyTasks[taskId];
                self._dailyTasks.push(uw.TaskDataCtrl.create(taskId, finishedCount));
            }
            for (var taskId in tasks) {
                var finishedCount = tasks[taskId];
                self._tasks.push(uw.TaskDataCtrl.create(taskId, finishedCount));
            }
        };
        /**
         * 获取主线任务列表
         * @returns {Array}
         */
        __egretProto__.getTaskDataCtrlList = function () {
            var self = this;
            var tasks = self._tasks;
            var results = [];
            for (var i = 0, li = tasks.length; i < li; ++i) {
                var task = tasks[i];
                if (task.lvlRequired > self.getLvl())
                    continue;
                else if (task.vip > 0 && self.getVip() == 0)
                    continue; //vip任务
                results.push(task);
            }
            return results;
        };
        /**
         * 获取日常任务列表
         * @returns {Array}
         */
        __egretProto__.getDailyTaskDataCtrlList = function () {
            var self = this;
            var task, dailyTasks = self._dailyTasks;
            uw.handleTodayRefresh(self._taskRefreshTime, function (needToRefreshTime, rt) {
                if (needToRefreshTime) {
                    for (var i = 0, li = dailyTasks.length; i < li; i++) {
                        dailyTasks[i].doDtor();
                    }
                    dailyTasks.length = 0;
                    var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
                    var dailyTaskTemps = c_game[uw.id_c_game.dailyTasks];
                    for (var i = 0, li = dailyTaskTemps.length; i < li; i++) {
                        dailyTasks.push(uw.TaskDataCtrl.create(dailyTaskTemps[i], 0));
                    }
                    self._taskRefreshTime = rt;
                }
            });
            var tasks = [], timeLimitTasks = [];
            for (var i = 0, li = dailyTasks.length; i < li; i++) {
                task = dailyTasks[i];
                if (self.getLvl() >= task.lvlRequired) {
                    if (task.subType == uw.c_prop.taskSubTypeKey.online) {
                        var taskVip = task.vip;
                        if (taskVip != null && taskVip != self.getVip())
                            continue; //在线领取必须是指定的vip等级
                    }
                    if (task.vip > 0 && self.getVip() == 0)
                        continue; //vip任务
                    if (task.getTempValue(uw.t_task_timeLimit)) {
                        timeLimitTasks.push(task);
                    }
                    else {
                        tasks.push(task);
                    }
                }
            }
            var nowHour = Date.newDate().getHours();
            var appendTask = timeLimitTasks.filter(function (v, i, arr) {
                var timeLimit = v.getTempValue(uw.t_task_timeLimit);
                return nowHour < timeLimit[1]; //返回没有过期的任务
            }).sort(function (a, b) {
                var startTime1 = a.getTempValue(uw.t_task_timeLimit)[0];
                var startTime2 = b.getTempValue(uw.t_task_timeLimit)[0];
                return startTime1 - startTime2;
            });
            if (appendTask.length > 0)
                tasks.push(appendTask[0]);
            return tasks;
        };
        /**
         * 获取已经完成的主线任务数量。
         * @returns {number}
         */
        __egretProto__.getFinishedTaskCount = function () {
            var taskDataList = this.getTaskDataCtrlList();
            var count = 0;
            for (var i = 0, li = taskDataList.length; i < li; i++) {
                if (taskDataList[i].isFinished())
                    count++;
            }
            return count;
        };
        /**
         * 获取已经完成的日常任务数量。
         * @returns {number}
         */
        __egretProto__.getDailyFinishedTaskCount = function () {
            var taskDataList = this.getDailyTaskDataCtrlList();
            var count = 0;
            for (var i = 0, li = taskDataList.length; i < li; i++) {
                if (taskDataList[i].isFinished()) {
                    count++;
                }
            }
            return count;
        };
        /**
         * 判断是否有主线任务待处理
         * @param taskId
         * @returns {boolean}
         */
        __egretProto__.isTaskToDo = function (taskId) {
            var taskDataCtrlList = this.getTaskDataCtrlList;
            taskId = typeof taskId == "string" ? parseInt(taskId) : taskId;
            for (var i = 0, li = taskDataCtrlList.length; i < li; i++) {
                var taskDataCtrl = taskDataCtrlList[i];
                if (taskDataCtrl.id == taskId && !taskDataCtrl.isFinished()) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 判断是否有主线任务待领取
         * @param taskId
         * @returns {boolean}
         */
        __egretProto__.isTaskFinished = function (taskId) {
            var taskDataCtrlList = this.getTaskDataCtrlList;
            taskId = typeof taskId == "string" ? parseInt(taskId) : taskId;
            for (var i = 0, li = taskDataCtrlList.length; i < li; i++) {
                var taskDataCtrl = taskDataCtrlList[i];
                if (taskDataCtrl.id == taskId && taskDataCtrl.isFinished()) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 判断主线任务是否已经做完，并且领完了。
         * @param taskId
         * @returns {*}
         */
        __egretProto__.isTaskDone = function (taskId) {
            var tasks = this._doneTasks;
            for (var i = 0, li = tasks.length; i < li; i++) {
                if (tasks[i] == taskId)
                    return true;
            }
            return false;
        };
        /**
         * 获取任务奖励
         * @param taskId
         * @param cb
         * @param target
         */
        __egretProto__.getTaskReward = function (taskId, cb, target) {
            var self = this;
            var args = {};
            var argsKey = uw.iface.a_user_getTaskReward_args;
            args[argsKey.taskId] = taskId;
            mo.requestWaiting(uw.iface.a_user_getTaskReward, args, function (taskReward) {
                uw.log("taskReward---->", taskReward);
                var taskEntity = taskReward[uw.dsConsts.TaskReward.task];
                var equips = taskReward[uw.dsConsts.TaskReward.equips];
                //在此要进行物品的整理，对经验等进行处理，更新用户数据
                var t_task = mo.getJSONWithFileName(uw.cfg_t_task);
                var taskTemp = t_task[taskId];
                var items = taskTemp[uw.t_task_items];
                // 1.优先弹出获得物品框
                var itemsInfo = {};
                var KEY = uw.dsConsts.UseItemInfo;
                itemsInfo[KEY.items] = items;
                itemsInfo[KEY.equips] = equips;
                uw.showGainTipsByDlg(itemsInfo, false, "完成任务：" + taskTemp[uw.t_task_name]);
                // 2.添加数据
                self.addItems(items);
                self.addEquips(equips);
                // 3.更新任务
                self._updateTasks(taskEntity);
                if (cb)
                    cb.call(target, items);
            });
        };
        //*****************任务相关接口 结束****************
        //*****************物品相关接口 开始****************
        /**
         * 获取物品数量
         * @param itemId
         * @returns {*}
         */
        __egretProto__.getItemNum = function (itemId) {
            var self = this;
            if (typeof itemId == "string")
                itemId = parseInt(itemId); //防止如果这个是一个字符串的处理
            if (itemId == uw.c_prop.spItemIdKey.diamond) {
                return self.getDiamond();
            }
            else if (itemId == uw.c_prop.spItemIdKey.gold) {
                return self.getGold();
            }
            else if (itemId == uw.c_prop.spItemIdKey.strength) {
                return self.getStrength();
            }
            else if (itemId == uw.c_prop.spItemIdKey.honor) {
                return self.getHonor();
            }
            else if (itemId == uw.c_prop.spItemIdKey.towerPoints) {
                return self.getTowerPoints();
            }
            var t_itemEquip = mo.getJSONWithFileName(uw.cfg_t_itemEquip);
            var itemEquipTemp = t_itemEquip[itemId];
            if (itemEquipTemp) {
                return self.getNotOnEquipNumByTempId(itemId);
            }
            return self._data[uw.dsConsts.UserEntity.bag][itemId] || 0;
        };
        /**
         *  设置物品数量
         * @param itemId 物品id
         * @param num  数量
         * @param notNotify true表示不通知, 不填或者false表示立即通知
         */
        __egretProto__.setItemNum = function (itemId, num, notNotify) {
            notNotify = notNotify || false;
            var isNotify = !notNotify;
            var changed = false;
            var oldNum;
            do {
                // 数量必须大于等于零
                num = num || 0;
                num = num < 0 ? 0 : num;
                var bag = this._data[uw.dsConsts.UserEntity.bag];
                oldNum = bag[itemId];
                oldNum = oldNum ? oldNum : 0;
                if (num == 0) {
                    if (oldNum) {
                        delete bag[itemId];
                        changed = true;
                    }
                    break;
                }
                // num 不为零
                if (oldNum != num) {
                    bag[itemId] = num;
                    changed = true;
                }
            } while (false);
            if (changed && isNotify) {
                //            this._setChanged(uw.dsConsts.UserEntity.bag);
                this.pushNotify(this.__class.ON_ITEM_CHANGED, itemId, num, (num - oldNum));
            }
            return changed;
        };
        __egretProto__.getItems = function () {
            return this._data[uw.dsConsts.UserEntity.bag];
        };
        /**
         * 通过物品类型获取到物品的信息，格式为{id:num}。
         * @param type
         * @returns {{}}
         */
        __egretProto__.getItemInfoByType = function (type) {
            //和宣要的物品获取需求
            var t_item = mo.getJSONWithFileName(uw.cfg_t_item);
            var result = {};
            var items = this._data[uw.dsConsts.UserEntity.bag];
            for (var tempId in items) {
                var itemTemp = t_item[tempId];
                if (itemTemp && itemTemp[uw.t_item_type] == type) {
                    result[tempId] = items[tempId];
                }
            }
            return result;
        };
        /**
         *  获得专属经验道具
         * @returns {{}}
         */
        __egretProto__.getExclusiveExpItems = function () {
            var t_item = mo.getJSONWithFileName(uw.cfg_t_item);
            var result = {};
            var items = this._data[uw.dsConsts.UserEntity.bag];
            var itemTemp, exclusiveExp;
            for (var tempId in items) {
                itemTemp = t_item[tempId];
                exclusiveExp = itemTemp[uw.t_item_exclusiveExp];
                if (exclusiveExp > 0) {
                    result[tempId] = items[tempId];
                }
            }
            return result;
        };
        /**
         * 改变背包物品数量
         * @param itemId 物品ID
         * @param num 物品数量，正数为增加，负数为减少
         * @param notNotify true表示不通知, 不填或者false表示立即通知
         * @private
         */
        __egretProto__._changeItemCount = function (itemId, num, notNotify) {
            if (notNotify === void 0) { notNotify = null; }
            var bag = this._data[uw.dsConsts.UserEntity.bag];
            var count = bag[itemId] || 0;
            count += num || 0;
            //最大获得数量控制
            var maxGet = mo.getJSONWithFileNameAndID(uw.cfg_t_item, itemId)[uw.t_item_maxGet];
            if (maxGet > 0) {
                count = count > maxGet ? maxGet : count;
            }
            return this.setItemNum(itemId, count, notNotify);
        };
        /**
         * 批量添物品，除背包物品外，可以包含特殊物品
         * @param items 物品字典{id: count,...}
         * {
     *      eid1 : 1,
     *
     * }
         */
        __egretProto__.addItems = function (items) {
            var self = this;
            var result = { items: {}, equips: {}, specials: {} };
            var tempItems = result.items, tempEquips = result.equips, tempSpecials = result.specials;
            for (var itemId in items) {
                var num = items[itemId];
                if (itemId == uw.c_prop.spItemIdKey.strength) {
                    self.addStrength(num);
                    tempSpecials[uw.c_prop.spItemIdKey.strength] = num;
                    result.strength = num;
                }
                else if (itemId == uw.c_prop.spItemIdKey.gold) {
                    self.increaseGold(num);
                    tempSpecials[uw.c_prop.spItemIdKey.gold] = num;
                    result.gold = num;
                }
                else if (itemId == uw.c_prop.spItemIdKey.diamond) {
                    self.increaseDiamond(num);
                    tempSpecials[uw.c_prop.spItemIdKey.diamond] = num;
                    result.diamond = num;
                }
                else if (itemId == uw.c_prop.spItemIdKey.honor) {
                    self.increaseHonor(num);
                    tempSpecials[uw.c_prop.spItemIdKey.honor] = num;
                    result.honor = num;
                }
                else if (itemId == uw.c_prop.spItemIdKey.userExpc) {
                    self.addExpc(num);
                    tempSpecials[uw.c_prop.spItemIdKey.userExpc] = num;
                    result.userExpc = num;
                }
                else if (itemId == uw.c_prop.spItemIdKey.heroExpc) {
                    tempSpecials[uw.c_prop.spItemIdKey.heroExpc] = num;
                    result.heroExpc = num;
                }
                else if (itemId == uw.c_prop.spItemIdKey.towerPoints) {
                    self.increaseTowerPoints(num);
                    tempSpecials[uw.c_prop.spItemIdKey.towerPoints] = num;
                    result.towerPoints = num;
                }
                else if (itemId == uw.c_prop.spItemIdKey.vipExp) {
                    self.addVipScore(num);
                    tempSpecials[uw.c_prop.spItemIdKey.vipExp] = num;
                    result.vipExp = num;
                }
                else {
                    var t_item = mo.getJSONWithFileNameAndID(uw.cfg_t_item, itemId);
                    if (t_item[uw.t_item_type] == uw.c_prop.itemTypeKey.equip) {
                        tempEquips[itemId] = num;
                    }
                    else {
                        tempItems[itemId] = num;
                        self._changeItemCount(itemId, num, true);
                    }
                }
            }
            // 推送获得背包物品的通知
            if (!mo.isEmptyObj(tempItems)) {
                self.pushNotify(self.__class.ON_GET_BAG_ITEMS, tempItems);
            }
            return result;
        };
        /**
         * 增加背包物品数量
         * @param itemId
         * @param num
         */
        __egretProto__.addItem = function (itemId, num) {
            num = num == null ? 1 : num;
            this._changeItemCount(itemId, num);
        };
        /**
         * 批量删除背包物品
         * @param items
         */
        __egretProto__.reduceItems = function (items) {
            for (var itemId in items) {
                this.reduceItem(itemId, items[itemId]);
            }
        };
        /**
         * 减少背包物品数量
         * @param itemId
         * @param num
         */
        __egretProto__.reduceItem = function (itemId, num) {
            num = num == null ? 1 : num;
            this._changeItemCount(itemId, -num);
        };
        __egretProto__.getBagDataCtrl = function (tempId) {
            return uw.BagDataCtrl.create(tempId, this.getItemNum(tempId));
        };
        /**
         * 处理useItemInfo的公共接口。
         * @param useItemInfo
         * @returns {*} 如果获得了物品则返回已经分类号的物品信息
         */
        __egretProto__.handleUseItemInfo = function (useItemInfo) {
            var self = this;
            var ret;
            var KEY = uw.dsConsts.UseItemInfo;
            var items = useItemInfo[KEY.items];
            var equips = useItemInfo[KEY.equips];
            var heroEntity = useItemInfo[KEY.hero];
            var equipIdsToDel = useItemInfo[KEY.equipIdsToDel];
            if (items)
                self.addItems(items);
            if (equips)
                self.addEquips(equips);
            if (heroEntity && heroEntity[uw.dsConsts.HeroEntity.id]) {
                self.updateHeroByEntity(heroEntity);
            }
            if (equipIdsToDel && equipIdsToDel.length > 0) {
                self.delEquipsByIds(equipIdsToDel);
            }
        };
        /**
         * 获得可出售的杂物物品ID数组
         * @returns {Object}
         */
        __egretProto__.getSundries = function () {
            var self = this;
            var sundries = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.shopSellIds);
            var ret = [];
            for (var i = 0, li = sundries.length; i < li; i++) {
                if (self.getItemNum(sundries[i]) > 0) {
                    ret.push(sundries[i]);
                }
            }
            return ret;
        };
        /**
         * 批量出售杂物
         */
        __egretProto__.saleSundries = function (cb, target) {
            var self = this;
            var sundries = self.getSundries();
            var iface = uw.iface.a_item_sellItems;
            var argsKeys = uw.iface.a_item_sellItems_args;
            var args = {};
            var items = {}, totalGain = 0;
            for (var i = 0, li = sundries.length; i < li; i++) {
                var tempId = sundries[i];
                var num = self.getItemNum(tempId);
                items[tempId] = num;
                var itemData = mo.getJSONWithFileNameAndID(uw.cfg_t_item, tempId);
                totalGain += itemData[uw.t_item_sellPrice] * num;
            }
            args[argsKeys.items] = items;
            mo.requestWaiting(iface, args, function () {
                self.increaseGold(totalGain); //增加金币
                self.reduceItems(items); //扣除数量
                mo.showMsg(uw.id_c_msgCode.onSoldSuccess); //提示购买成功的消息
                if (cb)
                    cb.call(target);
            });
        };
        //初始化秘术相关
        __egretProto__._initSecret = function () {
            var self = this;
            if (!self._secretCfgArr) {
                self._secretCfgArr = [];
                var c_secret = mo.getJSONWithFileName(uw.cfg_c_secret); //获取秘术相关配置
                var t_hero = mo.getJSONWithFileName(uw.cfg_t_hero);
                var t_warrior = mo.getJSONWithFileName(uw.cfg_t_warrior);
                var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
                var t_skill = mo.getJSONWithFileName(uw.cfg_t_skill);
                for (var initId in c_secret) {
                    var secretData = new uw.SecretData();
                    initId = parseInt(initId);
                    var skill = t_skill[initId];
                    var cfg = c_secret[initId];
                    var seq = cfg[uw.c_secret_seq];
                    secretData.initId = initId;
                    secretData.initLvl = cfg[uw.c_secret_initLvl];
                    secretData.seq = seq;
                    secretData.passiveType = skill[uw.t_skill_passiveType];
                    var heroTempIds = cfg[uw.c_secret_heroIds] || [];
                    for (var i = 0, li = heroTempIds.length; i < li; i++) {
                        var heroTempId = heroTempIds[i]; //英雄的类型id
                        var heroTemp = t_hero[heroTempId];
                        var tid = heroTemp[uw.t_hero_tid];
                        var warriorTemp = t_warrior[tid];
                        secretData.heroTempIds.push(heroTempId); //模板id
                        secretData.heroTids.push(tid); //tid
                        secretData.fragmentIds.push(warriorTemp[uw.t_warrior_fragmentId]); //碎片id
                        var quality = heroTemp[uw.t_hero_quality];
                        var num = 0;
                        for (var j = 1; j <= quality; ++j) {
                            num += c_lvl[j][uw.c_lvl_fragment];
                        }
                        secretData.fragmentRequireds.push(num);
                    }
                    self._secretCfgArr[seq - 1] = secretData;
                }
            }
        };
        //获取秘术信息列表
        __egretProto__.getSecretArr = function () {
            var self = this;
            self._initSecret(); //先初始化
            var arr = self._secretCfgArr;
            var resultArr = [];
            for (var i = 0, li = arr.length; i < li; i++) {
                resultArr.push(self._getSecretInfo(arr[i]));
            }
            return resultArr;
        };
        /**
         * 根据秘术初始id获取到秘术信息。
         * @param initId
         * @returns {*}
         */
        __egretProto__.getSecret = function (initId) {
            var self = this;
            var arr = self.getSecretArr();
            for (var i = 0, li = arr.length; i < li; i++) {
                var itemi = arr[i];
                if (itemi.initId == initId)
                    return itemi;
            }
            return null;
        };
        __egretProto__.catchSecretChangeBegin = function () {
            var self = this;
            self._scChangeArr = {};
        };
        __egretProto__.catchSecretChange = function (changeData) {
            var self = this;
            self._scChangeArr[changeData.initId] = changeData;
        };
        __egretProto__.getSecretChangeData = function () {
            var self = this;
            var data = [];
            for (var key in self._scChangeArr) {
                data.push(self._scChangeArr[key]);
            }
            return data;
        };
        /**
         * 通过英雄的tid获取到相关联的秘术。
         * @param heroTid
         * @returns {*}
         */
        __egretProto__.getSecretByHeroTid = function (heroTid) {
            var self = this;
            var arr = self.getSecretArr();
            for (var i = 0, li = arr.length; i < li; i++) {
                var itemi = arr[i];
                if (itemi.heroTids.indexOf(heroTid) >= 0)
                    return itemi;
            }
            return null;
        };
        /**
         * 获得当前领主等级时激活的秘术
         * @returns 返回initId数组
         */
        __egretProto__.getLastOpenSecret = function () {
            var self = this;
            var initIds = [];
            var c_secret = mo.getJSONWithFileName(uw.cfg_c_secret);
            var curLvl = self.getLvl();
            var secretCfg;
            for (var initId in c_secret) {
                secretCfg = c_secret[initId];
                if (secretCfg[uw.c_secret_initLvl] == curLvl) {
                    initIds.push(initId);
                }
            }
            return initIds;
        };
        /**
         * 获得已经开启的秘术列表
         * @param type  秘术主被动类型
         * @returns {Array}
         */
        __egretProto__.getOpenedSecretArr = function (type) {
            var arr = this.getSecretArr();
            var resultArr = [];
            for (var i = 0, li = arr.length; i < li; i++) {
                var item = arr[i];
                if (type == null) {
                    if (item.lvl > 0)
                        resultArr.push(item);
                }
                else {
                    if (type > 0) {
                        //被动秘术
                        if (item.lvl > 0 && item.passiveType > 0)
                            resultArr.push(item);
                    }
                    else {
                        //主动秘术
                        if (item.lvl > 0 && item.passiveType == 0)
                            resultArr.push(item);
                    }
                }
            }
            resultArr.sort(function (a, b) {
                return a.initId > b.initId;
            });
            resultArr.sort(function (a, b) {
                return a.lvl < b.lvl;
            });
            return resultArr;
        };
        //获取秘术信息
        __egretProto__._getSecretInfo = function (secretData) {
            var self = this;
            var opened = secretData.initLvl <= self.getLvl();
            if (opened) {
                secretData.lvl = 1;
            }
            else {
                secretData.lvl = 0;
                secretData.skillId = secretData.initId;
            }
            var heroTids = secretData.heroTids;
            for (var j = 0; j < heroTids.length; ++j) {
                var heroTid = heroTids[j];
                var heroDataCtrl = self.getHeroDataCtrlByTid(heroTid);
                //如果有获得，那么秘术等级就+1
                if (heroDataCtrl) {
                    if (opened)
                        secretData.lvl++;
                    secretData.progress[j] = true;
                }
                else {
                    var fragmentId = secretData.fragmentIds[j];
                    var fragmentNum = uw.userDataCtrl.getItemNum(fragmentId); //先获取到当前的碎片数量
                    secretData.progress[j] = [fragmentNum, secretData.fragmentRequireds[j]];
                }
            }
            if (opened)
                secretData.skillId = secretData.initId + secretData.lvl - 1; //秘术对应的技能id
            return secretData;
        };
        /**
         * 获取到战斗对手防守秘术布阵的技能id列表
         * @param userId
         * @param matrixType
         * @param cb
         * @param target
         */
        __egretProto__.getDefenceSecretSkills = function (userId, matrixType, cb, target) {
            var self = this;
            var args = {};
            var argsKey = uw.iface.a_user_getDefenceSecretSkills_args;
            args[argsKey.userId] = userId;
            args[argsKey.matrixType] = matrixType;
            mo.request(uw.iface.a_user_getDefenceSecretSkills, args, function (skillIds) {
                if (cb)
                    cb.call(target, skillIds);
            });
        };
        /**
         * 更新布阵
         * @param matrixType  布阵类型
         * @param secretIds 该类型布阵数据  ["秘术起始id","秘术起始id"....]
         * @param cb
         * @param target
         */
        __egretProto__.updateSecret = function (matrixType, secretIds, cb, target) {
            if (secretIds.length < 2)
                return mo.showMsg(uw.id_c_msgCode.lessThan2Activen);
            var args = {};
            var argsKey = uw.iface.a_user_updateSecret_args;
            args[argsKey.matrixType] = matrixType;
            args[argsKey.secret] = secretIds;
            mo.request(uw.iface.a_user_updateSecret, args, function (data) {
                this._setSecretByType(matrixType, secretIds);
                if (cb)
                    cb.call(target);
            }, this);
        };
        /**
         * 修改秘术
         * @param matrixType
         * @param secretIds
         */
        __egretProto__._setSecretByType = function (matrixType, secretIds) {
            var secret = this._data[uw.dsConsts.UserEntity.secret] || {};
            secret[matrixType] = secretIds;
            this._data[uw.dsConsts.UserEntity.secret] = secret;
        };
        /**
         * 根据类型获得秘术布阵
         * @param matrixType
         */
        __egretProto__.getSecretMatrixByType = function (matrixType) {
            var self = this;
            var secret = self._data[uw.dsConsts.UserEntity.secret] || {};
            self._initSecret(); //先进行初始化
            var secretIds = secret[matrixType];
            var matrixTypeKey = uw.c_prop.matrixTypeKey;
            //目前只有竞技场防守初始化需要这么操作 【已确认】
            //镜像的防守阵型相关的是在首次战斗时就已经初始化好了的
            if (matrixType == matrixTypeKey.arenaD && (!secretIds || secretIds.length == 0)) {
                return self.getSecretMatrixByType(matrixTypeKey.copy);
            }
            var arr = self._secretCfgArr;
            secretIds = secretIds || [arr[0].initId, arr[1].initId];
            var self = this;
            var matrix = [];
            for (var i = 0, li = arr.length; i < li; i++) {
                var index = secretIds.indexOf(arr[i].initId);
                if (index >= 0)
                    matrix[index] = self._getSecretInfo(arr[i]);
            }
            return matrix;
        };
        /**
         * 根据类型获得秘术布阵
         * @param matrixType
         */
        __egretProto__.getSecretSkillIdsByType = function (matrixType) {
            var self = this;
            var secret = self._data[uw.dsConsts.UserEntity.secret] || {};
            self._initSecret(); //先进行初始化
            var secretIds = secret[matrixType];
            var copyType = uw.c_prop.matrixTypeKey.copy;
            if (matrixType != copyType && (!secretIds || secretIds.length == 0)) {
                return self.getSecretSkillIdsByType(copyType);
            }
            var arr = self._secretCfgArr;
            secretIds = secretIds || [arr[0].initId, arr[1].initId];
            var self = this;
            var skillIds = [];
            for (var i = 0, li = arr.length; i < li; i++) {
                var index = secretIds.indexOf(arr[i].initId);
                if (index >= 0)
                    skillIds[index] = self._getSecretInfo(arr[i]).skillId;
            }
            return skillIds;
        };
        //*****************秘术相关接口 结束****************
        //*****************镜像相关接口 开始****************
        /**
         * 根据英雄模板id检查是否已拥有这些英雄
         * @param heroTids
         * @returns {Array}没有的装到数组里返回
         */
        __egretProto__.checkOwnedHero = function (heroTids) {
            var self = this;
            var heroNotOwn = [];
            var found = false;
            heroTids = heroTids instanceof Array ? heroTids : [heroTids];
            var heroList = self._heroDataCtrlList;
            var heroId, heroCtrl;
            for (var i = 0, li = heroTids.length; i < li; i++) {
                found = false;
                heroId = heroTids[i];
                for (var j = 0, lj = heroList.length; j < lj && !found; j++) {
                    heroCtrl = heroList[j];
                    // 找到了
                    found = (heroId == heroCtrl.tid);
                }
                if (!found) {
                    heroNotOwn.push(heroId);
                }
            }
            return heroNotOwn;
        };
        //*****************镜像相关接口 结束****************
        //*****************主城红点相关接口 开始****************
        /**
         * 判断主城界面系统图标是否需要带红点
         * @param cb
         * @param target
         */
        __egretProto__.getRedInfo = function (cb, target) {
            var self = this;
            async.map({
                isLotteryRed: function (cb1) {
                    cb1(null, uw.lotteryDataCtrl.canGetFree());
                },
                isTaskRed: function (cb1) {
                    cb1(null, !!self.getFinishedTaskCount());
                },
                isDailyTaskRed: function (cb1) {
                    cb1(null, !!self.getDailyFinishedTaskCount());
                },
                isMailRed: function (cb1) {
                    uw.mailDataCtrl.isNeedOperate(function (isRed) {
                        cb1(null, !!isRed);
                    });
                },
                isSignRed: function (cb1) {
                    cb1(null, !uw.signDataCtrl.isTodaySigned());
                },
                isMergeRed: function (cb1) {
                    cb1(null, uw.exchangeDataCtrl.hasItemToExchange());
                },
                isHeroRed: function (cb1) {
                    cb1(null, self.hasHeroToCall() || self.hasExclusiveToPuton() || self.hasNormalEquipToUp());
                },
                isFirstRechargeRed: function (cb1) {
                    if (!self._firstRechargeActivityId)
                        return cb1(null, false);
                    var firstRecharge = self.get(uw.dsConsts.UserEntity.activity)[self._firstRechargeActivityId];
                    cb1(null, !firstRecharge);
                },
                isSevenLoginRed: function (cb1) {
                    var stateArr = self.getSevenLoginStateArr(), canGotSevenEvent = false;
                    if (stateArr) {
                        for (var i = 0; i < stateArr.length; i++) {
                            var state = stateArr[i];
                            if (state != 2) {
                                canGotSevenEvent = true;
                                break;
                            }
                        }
                        cb1(null, canGotSevenEvent);
                    }
                    else {
                        cb1(null, false);
                    }
                },
                isWonderfulEventRed: function (cb1) {
                    cb1(null, true);
                }
            }, function (func, key, cb1) {
                func(cb1);
            }, cb, target);
        };
        //*****************主城红点相关接口 结束****************
        //*****************运营活动相关接口 开始****************
        __egretProto__._handleActivityTo = function (data, cb, ctx) {
            var result;
            if (data == null) {
            }
            else if (data instanceof Array) {
                result = [];
                for (var i = 0, l_i = data.length; i < l_i; i++) {
                    var entity = data[i];
                    result.push(uw.ActivityCtrl.create(entity));
                }
            }
            else {
                result = uw.ActivityCtrl.create(data);
            }
            if (cb)
                cb.call(ctx, result);
        };
        /**
         * 是否已经充过值了。
         * @returns {boolean}
         */
        __egretProto__.hasRecharged = function () {
            return uw.rechargeDataCtrl.hasRecharged();
        };
        __egretProto__._pushActivityData = function (activityId, data) {
            var self = this;
            var arr = self.getActivityDataList(activityId);
            arr.push(data);
        };
        __egretProto__.getActivityDataList = function (activityId) {
            var self = this;
            var activityKey = uw.dsConsts.UserEntity.activity;
            var map = self._data[activityKey];
            if (!map) {
                map = self._data[activityKey] = {};
            }
            var arr = map[activityId];
            if (!arr) {
                arr = map[activityId] = [];
            }
            return arr;
        };
        /**
         * 检查活动奖励是否已领取
         * @param activityId
         * @param activityType
         * @param index
         */
        __egretProto__.isActivityAwardGot = function (activityId, activityType, index) {
            var self = this;
            // 设置已领状态
            var arr = self.getActivityDataList(activityId);
            var isGot = false;
            switch (activityType) {
                case uw.c_prop.activityTypeKey.dayChargeCount:
                case uw.c_prop.activityTypeKey.dayCostCount:
                    var dateStr = arr[index];
                    if (dateStr) {
                        var dateLast = new Date(dateStr);
                        var now = new Date();
                        var sameDay = now.getUTCFullYear() == dateLast.getUTCFullYear() && now.getUTCMonth() == dateLast.getUTCMonth() && now.getUTCDate() == dateLast.getUTCDate();
                        isGot = sameDay; //如果领取时间是今天，则表示领过了
                    }
                    break;
                case uw.c_prop.activityTypeKey.allChargeCount:
                case uw.c_prop.activityTypeKey.allCostCount:
                case uw.c_prop.activityTypeKey.upLvl:
                    isGot = arr[index] > 0;
                    break;
            }
            return isGot;
        };
        /**
         * 获取首充详细。如果返回值为null，则表示已经领过了。
         * 返回数据为ActivityCtrl。
         * @param cb
         * @param ctx
         */
        __egretProto__.getFirstRecharge = function (cb, ctx) {
            var self = this;
            mo.request(uw.iface.a_activity_getFirstRecharge, {}, function (data) {
                if (data)
                    self._firstRechargeActivityId = data[uw.dsConsts.ActivityData.id];
                self._handleActivityTo(data, cb, ctx);
            });
        };
        /**
         * 领取首充礼包。
         * 数据结构为：ds.UseItemInfo
         * @param cb
         * @param ctx
         */
        __egretProto__.receiveFirstRecharge = function (cb, ctx) {
            var self = this;
            if (!self.hasRecharged()) {
                return mo.showMsg(uw.id_c_msgCode.cantGetNoCharge);
            }
            else {
                if (!self._firstRechargeActivityId)
                    return mo.showMsg("已经领过了首充礼包了，不能在领取了！（由UI控制不可点）");
                mo.requestWaiting(uw.iface.a_activity_receiveFirstRecharge, {}, function (useItemInfo) {
                    self.handleUseItemInfo(useItemInfo);
                    self._pushActivityData(self._firstRechargeActivityId, 1);
                    if (cb)
                        cb.call(ctx, self._refactorData(useItemInfo));
                });
            }
        };
        __egretProto__._refactorData = function (useItemInfo) {
            var itemsInfo = useItemInfo[uw.dsConsts.UseItemInfo.items];
            var heroInfo = useItemInfo[uw.dsConsts.UseItemInfo.hero];
            var arr = [];
            for (var tempId in itemsInfo) {
                var obj = {};
                var item = {};
                item[tempId] = itemsInfo[tempId];
                obj[uw.dsConsts.UseItemInfo.items] = item;
                arr.push(obj);
            }
            //英雄信息
            var obj = {};
            obj[uw.dsConsts.UseItemInfo.items] = {};
            obj[uw.dsConsts.UseItemInfo.hero] = heroInfo;
            arr.push(obj);
            return arr;
        };
        /**
         * 获取7天登陆详细。如果领完了就返回null。
         * 返回数据为ActivityCtrl。
         * @param cb
         * @param ctx
         */
        __egretProto__.getSevenLogin = function (cb, ctx) {
            var self = this;
            mo.request(uw.iface.a_activity_getSevenLogin, {}, function (data) {
                if (data)
                    self._sevenLoginActivityId = data[uw.dsConsts.ActivityData.id];
                self._handleActivityTo(data, cb, ctx);
            });
        };
        /**
         * 领取七天登录礼包。
         * @param cb
         * @param ctx
         * @returns {boolean}
         */
        __egretProto__.receiveSevenLogin = function (cb, ctx) {
            var self = this;
            if (!self._sevenLoginActivityId)
                return mo.showMsg("七天登录礼包已经全部领完了，不能再领取了！（由UI控制不可点）");
            var arr = self.getActivityDataList(self._sevenLoginActivityId);
            var today = Date.today();
            var flag = true;
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var time = arr[i];
                if (!time) {
                    break;
                }
                time = Date.newDate(time);
                if (today.isBefore(time)) {
                    flag = false;
                    break;
                }
            }
            if (!flag)
                return mo.showMsg("今天已经领取过了七天登录礼包了，不能再领取了！（由UI控制不可点）");
            mo.requestWaiting(uw.iface.a_activity_receiveSevenLogin, {}, function (useItemInfo) {
                self.handleUseItemInfo(useItemInfo);
                uw.showGainTips(useItemInfo);
                self._pushActivityData(self._sevenLoginActivityId, Date.newDate());
                if (cb)
                    cb.call(ctx, useItemInfo);
            });
        };
        /**
         * 获取七天登录礼包领取状态，是个数组.
         * 0：待领取但今天不可领取
         * 1：今日可以领取
         * 2：已经领取
         * @returns {null}
         */
        __egretProto__.getSevenLoginStateArr = function () {
            var self = this;
            if (!self._sevenLoginActivityId)
                return null; //已经没了
            var arr = self.getActivityDataList(self._sevenLoginActivityId);
            var results = [];
            var today = Date.today();
            var flag = false; //可以领取标志设置过与否
            for (var i = 0; i < 7; ++i) {
                var time = arr[i];
                if (!time) {
                    if (flag)
                        results[i] = 0; //待领取但今天不可领取
                    else {
                        results[i] = 1; //今日可以领取
                        flag = true;
                    }
                }
                else {
                    time = Date.newDate(time);
                    results[i] = 2; //已经领取
                    if (today.isBefore(time)) {
                        flag = true; //今日的已经领取过了，也就是说，之后的空的time状态将设置为0
                    }
                }
            }
            return results;
        };
        /**
         * 获取精彩活动列表。
         * 返回ActivityCtrl列表。
         * @param cb
         * @param ctx
         */
        __egretProto__.getMainActivityList = function (cb, ctx) {
            var self = this;
            mo.request(uw.iface.a_activity_getMainList, {}, function (dataList) {
                self._handleActivityTo(dataList, cb, ctx);
            });
        };
        /**re
         * 领取精彩活动奖励
         * @param activityId
         * @param activityType
         * @param index
         * @param price 消耗钻石数量，默认为0，如果不为0，则表示抢购的价格
         * @param cb
         * @param ctx
         */
        __egretProto__.receiveMainActivity = function (activityId, activityType, index, price, cb, ctx) {
            var self = this;
            //是否可以领取在ui里面判断
            //时间校验留给ui部分，这里不做判断。
            var args = {};
            var argsKey = uw.iface.a_activity_receive_args;
            args[argsKey.activityId] = activityId;
            args[argsKey.index] = index;
            mo.requestWaiting(uw.iface.a_activity_receive, args, function (useItemInfo) {
                if (price)
                    self.reduceDiamond(price);
                self.handleUseItemInfo(useItemInfo);
                var arr = self.getActivityDataList(activityId);
                switch (activityType) {
                    case uw.c_prop.activityTypeKey.dayChargeCount:
                    case uw.c_prop.activityTypeKey.dayCostCount:
                        //保存领奖日期
                        arr[index] = Date.newDate().toString();
                        break;
                    case uw.c_prop.activityTypeKey.allChargeCount:
                    case uw.c_prop.activityTypeKey.allCostCount:
                    case uw.c_prop.activityTypeKey.upLvl:
                        //保存领奖次数
                        arr[index] = (arr[index] || 0) + 1;
                        break;
                    case uw.c_prop.activityTypeKey.limitBuy:
                        var record = arr[index] || [];
                        if (record[1]) {
                            //不同天则已购买次数清零
                            var sameDay = Date.equalsDay(new Date(record[1]), Date.newDate());
                            record[0] = sameDay ? record[0] : 0;
                        }
                        record[0] = (record[0] || 0) + 1;
                        record[1] = Date.newDate().toString(); //更新购买时间
                        arr[index] = record;
                        break;
                }
                if (cb)
                    cb.call(ctx, useItemInfo);
                self.pushNotify(self.__class.ON_GET_EVENT_AWARD);
            });
        };
        /**
         * 兑换码
         * @param code
         */
        __egretProto__.useCoupon = function (code, cb, target) {
            var self = this;
            var args = {};
            var argsKey = uw.iface.a_activity_useCoupon_args;
            args[argsKey.code] = code;
            mo.requestWaiting(uw.iface.a_activity_useCoupon, args, function (useItemInfo) {
                self.handleUseItemInfo(useItemInfo);
                uw.showGainTipsByDlg(useItemInfo);
                if (cb)
                    cb.call(target, useItemInfo);
            });
        };
        UserDataCtrl.__className = "UserDataCtrl";
        //+++++++++布阵相关常量 开始++++++++++++++
        UserDataCtrl.MATRIX_TYPE_KEY_MAP = _p;
        UserDataCtrl.ON_SKILL_POINTS_CHANGED = "onSkillPointsChanged";
        UserDataCtrl.ON_MATRIX_CHANGED = "onMatrixChanged";
        //+++++++++布阵相关常量 结束++++++++++++++
        //+++++++++背包相关常量 开始++++++++++++++
        UserDataCtrl.ON_ITEM_CHANGED = "onItemChanged"; // 背包物品数量变化
        UserDataCtrl.ON_GEM_MIXED = "onGemMixed";
        UserDataCtrl.ON_GET_BAG_ITEMS = "onGetBagItems";
        UserDataCtrl.ON_GET_EQUIPS = "onGetEquips";
        UserDataCtrl.ON_DEL_EQUIPS = "onDelEquips";
        //+++++++++背包相关常量 结束++++++++++++++
        //+++++++++活动相关常量 开始++++++++++++++
        UserDataCtrl.ON_GET_EVENT_AWARD = "onGetEventAward"; // 获得活动物品奖励
        //+++++++++活动相关常量 结束++++++++++++++
        UserDataCtrl.ON_DAILY_TASKS_REFRESHED = "onDailyTasksRefreshed"; //日常任务刷新
        UserDataCtrl.ON_BUY_SKILL_POINTS = "onBuySkillPoints"; //购买技能点
        UserDataCtrl.ON_CALL_HERO = "onCallHero"; //召唤英雄监听
        UserDataCtrl.ON_COPY_FAILED = "onCopyFailed"; //副本战斗失败
        UserDataCtrl.SECRETS_OPEND = "secret_opend"; //已开启秘术: {initId: xxx, lvl:xx}
        //*****************运营活动相关接口 结束****************
        /**
         * 通过服务端进行数据初始化
         * @param cb
         * @param cbTarget
         */
        UserDataCtrl.initByServer = function (cb, cbTarget) {
            mo.request(uw.iface.a_user_getFullUserInfo, {}, function (data) {
                if (uw.userDataCtrl) {
                    uw.userDataCtrl.doDtor();
                }
                uw.userDataCtrl = uw.UserDataCtrl.create(data);
                uw.mirrorDataCtrl = uw.MirrorDataCtrl.getInstance();
                uw.signDataCtrl = uw.SignDataCtrl.getInstance();
                async.series([
                    function (cb1) {
                        uw.HeroDataCtrl.initByServer(function (err1, heroDataCtrlList) {
                            uw.userDataCtrl._setHeroDataCtrlList(heroDataCtrlList);
                            uw.EquipDataCtrl.initByServer(function (err2) {
                                cb1();
                            });
                        });
                    },
                    function (cb1) {
                        uw.CopyProgressDataCtrl.initByServer(cb1);
                    },
                    function (cb1) {
                        uw.RechargeDataCtrl.initByServer(function () {
                            uw.userDataCtrl._initTasks(cb1); //初始化任务
                        });
                    },
                    function (cb1) {
                        uw.ShopDataCtrl.initByServer(cb1);
                    },
                    function (cb1) {
                        uw.LotteryDataCtrl.initByServer(cb1);
                    },
                    function (cb1) {
                        uw.MailDataCtrl.initByServer(cb1);
                    },
                    function (cb1) {
                        uw.ExchangeDataCtrl.initByServer(cb1);
                    },
                    function (cb1) {
                        uw.FeedBackDataCtrl.initByServer(cb1);
                    },
                    function (cb1) {
                        uw.userDataCtrl.getSevenLogin(function () {
                            cb1(null);
                        });
                    },
                    function (cb1) {
                        uw.userDataCtrl.getFirstRecharge(function () {
                            cb1(null);
                        });
                    },
                    function (cb1) {
                        uw.mirrorDataCtrl.getMyRank(cb1);
                    }
                ], function (err) {
                    var info = mo.getLocalStorageItem(uw.UserDataCtrl.SECRETS_OPEND);
                    // 取不到本地保存的已经学到的秘术
                    if (!info || info.length == 0) {
                        // 写最新数据到本地
                        var secretArr = {};
                        var arr = uw.userDataCtrl.getOpenedSecretArr();
                        var initId, lvl;
                        for (var i = 0, li = arr.length; i < li; i++) {
                            initId = arr[i].initId;
                            lvl = arr[i].lvl;
                            secretArr[initId] = lvl;
                        }
                        mo.setLocalStorageItem(uw.UserDataCtrl.SECRETS_OPEND, secretArr);
                    }
                    if (mo.project.guideEnabled) {
                        uw.MainGuideMgr.initGuide();
                        uw.SubGuideMgr.initGuide();
                    }
                    if (!uw.sharedCtrl) {
                        uw.sharedCtrl = uw.SharedCtrl.create();
                    }
                    if (cb) {
                        cb.call(cbTarget);
                    }
                });
            });
        };
        return UserDataCtrl;
    })(mo.DataController);
    uw.UserDataCtrl = UserDataCtrl;
    UserDataCtrl.prototype.__class__ = "uw.UserDataCtrl";
    uw.userDataCtrl;
})(uw || (uw = {}));

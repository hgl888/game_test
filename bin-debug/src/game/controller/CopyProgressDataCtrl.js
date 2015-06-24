/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var CopyProgressDataCtrl = (function (_super) {
        __extends(CopyProgressDataCtrl, _super);
        function CopyProgressDataCtrl() {
            _super.call(this);
        }
        var __egretProto__ = CopyProgressDataCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._idKey = uw.dsConsts.CopyProgressEntity.pCopyId;
            self._tempCfgName = uw.cfg_t_copyPrimary;
            self._tempIdKey = uw.dsConsts.CopyProgressEntity.pCopyId;
            self.DATA_KEY = uw.dsConsts.CopyProgressEntity;
        };
        __egretProto__.init = function (data) {
            _super.prototype.init.call(this, data);
            var self = this;
            var KEY = uw.dsConsts.CopyProgressEntity;
            data[KEY.copyArr] = data[KEY.copyArr] || [];
            data[KEY.copyStar] = data[KEY.copyStar] || {};
            data[KEY.timesPerDay] = data[KEY.timesPerDay] || {};
            self.finished = data[KEY.finished];
            self.refreshTime = data[KEY.refreshTime] = Date.newDate(data[KEY.refreshTime]);
            var temp = self._temp;
            self.copyIds = uw.copyBelong[self.id];
            self.name = temp[uw.t_copyPrimary_name];
            self.firstId = temp[uw.t_copyPrimary_firstId];
            self.file = temp[uw.t_copyPrimary_file];
            self.type = temp[uw.t_copyPrimary_type];
            self.cd = temp[uw.t_copyPrimary_cd];
            self.lvlRequired = temp[uw.t_copyPrimary_lvlRequired];
            self.getCopyTodayCount(0); //这里调用一次进行挑战次数的初始化
            var pTime = data[KEY.pTime];
            self.pTime = data[KEY.pTime] = Date.newDate(pTime);
            if (self.type == uw.c_prop.pCopyTypeKey.normal || self.type == uw.c_prop.pCopyTypeKey.cream) {
                //只有普通和精英副本需要设置副本地图
                self.config = mo.getJSONWithFileName(resHelper.getMapJsonPath(self.file));
                self.mapInfoJson = self.config[self.__class.CONFIG_KEY.copyInfoNode];
            }
        };
        /**
         * 获取主副本今日次数
         * @returns {*}
         */
        __egretProto__.getTodayCount = function () {
            var self = this;
            var KEY = uw.dsConsts.CopyProgressEntity;
            return uw.getTodayCount(self.refreshTime, function (needToRefresh, ft) {
                var timesPerDay = self.get(KEY.timesPerDay);
                if (needToRefresh) {
                    timesPerDay = {};
                    self.set(KEY.timesPerDay, timesPerDay);
                    self.refreshTime = ft;
                }
                var count = 0;
                for (var key in timesPerDay) {
                    count += timesPerDay[key];
                }
                return count;
            });
        };
        /**
         * 获取子副本今日次数
         * @param copyId
         * @returns {*}
         */
        __egretProto__.getCopyTodayCount = function (copyId) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var self = this;
            var KEY = uw.dsConsts.CopyProgressEntity;
            return uw.getTodayCount(self.refreshTime, function (needToRefresh, ft) {
                var timesPerDay = self.get(KEY.timesPerDay);
                var resetCounts = self.get(KEY.resetCounts);
                if (needToRefresh) {
                    timesPerDay = {};
                    resetCounts = {};
                    self.set(KEY.timesPerDay, timesPerDay);
                    self.set(KEY.resetCounts, resetCounts);
                    self.refreshTime = ft;
                }
                return timesPerDay[copyId] || 0;
            });
        };
        /***
         * 获取今日副本剩余次数
         * @param copyId
         * @returns {number} 小于0表示可以无限次
         */
        __egretProto__.getCopyTodayLeftCount = function (copyId) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var self = this;
            var count = self.getCopyTodayCount(copyId);
            var t_copy = mo.getJSONWithFileName(uw.cfg_t_copy);
            var copyTemp = t_copy[copyId];
            var countPerDay = copyTemp[uw.t_copy_timesPerDay];
            if (countPerDay == -1)
                return self.isCopyPassed(copyId) ? 0 : 1; //一生只能挑战一次
            else if (countPerDay == 0)
                return -2; //无限次
            else
                return Math.max(0, countPerDay - count);
        };
        /**
         * 添加子副本今日次数
         * @param copyId
         * @param count
         */
        __egretProto__.addCopyTodayCount = function (copyId, count) {
            if (count === void 0) { count = null; }
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            count = count == null ? 1 : count;
            var c = this.getCopyTodayCount(copyId);
            var timesPerDay = this.get(uw.dsConsts.CopyProgressEntity.timesPerDay);
            timesPerDay[copyId] = c + count;
        };
        /**
         * 设置子副本今日挑战次数。
         * @param copyId
         * @param count
         */
        __egretProto__.setCopyTodayCount = function (copyId, count) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            this.getCopyTodayCount(copyId); //进行更新先
            var timesPerDay = this._data[uw.dsConsts.CopyProgressEntity.timesPerDay];
            timesPerDay[copyId] = count;
        };
        /**
         * 今日剩余的副本购买、重置次数
         * @param copyId
         * @returns {number} 小于0认为不限制
         */
        __egretProto__.getBuyCopyCountLeft = function (copyId) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var self = this;
            var copyTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            var copyType = copyTemp[uw.t_copy_type];
            if (copyType == uw.c_prop.copyTypeKey.arena)
                return -1;
            var c_vip = mo.getJSONWithFileName(uw.cfg_c_vip);
            var count = self.getCopyResetTodayCount(copyId); //今日重置次数
            var vip = uw.userDataCtrl.getVip();
            var maxCount = c_vip[vip][uw.c_vip_resetCopyCount]; //获取该玩家的今日最大可重置次数
            return Math.max(0, maxCount - count);
        };
        __egretProto__._getBuyCopyCountDiamond = function (copyId) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var self = this;
            var copyTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            var copyType = copyTemp[uw.t_copy_type];
            var count = self.getCopyResetTodayCount(copyId); //今日重置次数
            if (self.isCream(copyId)) {
                return uw.calCopyDiamond(count + 1);
            }
            else if (copyType == uw.c_prop.copyTypeKey.arena)
                return uw.calBuyArenaNum(count + 1);
            return 0;
        };
        __egretProto__._showBuyCopyCountDiamondMsg = function (copyId, diamond, cb) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var self = this;
            var copyTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            var copyType = copyTemp[uw.t_copy_type];
            var count = self.getCopyResetTodayCount(copyId); //今日重置次数
            if (self.isCream(copyId)) {
                mo.showMsg(uw.id_c_msgCode.ifRefreshCopy, diamond, count, uw.userDataCtrl.getVipFuncCfg(uw.c_vip_resetCopyCount), cb, self);
            }
            else if (copyType == uw.c_prop.copyTypeKey.arena) {
                mo.showMsg(uw.id_c_msgCode.addFightNum, diamond, cb, self);
            }
            else
                uw.error("副本购买类型错误，请检查！");
        };
        __egretProto__.buyCopyCount = function (copyId, cb, target) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var self = this;
            if (self.getBuyCopyCountLeft(copyId) == 0)
                return mo.showMsg(uw.id_c_msgCode.noBuyTimes); //购买次数不足
            var diamond = self._getBuyCopyCountDiamond(copyId);
            self._showBuyCopyCountDiamondMsg(copyId, diamond, function () {
                if (diamond > uw.userDataCtrl.getDiamond())
                    return mo.showMsg(uw.id_c_msgCode.noDiamond); //钻石不足
                var args = {};
                var argsKey = uw.iface.a_copy_resetCopyCount_args;
                args[argsKey.copyId] = copyId;
                mo.requestWaiting(uw.iface.a_copy_resetCopyCount, args, function () {
                    self.addCopyResetTodayCount(copyId, 1); //今日重置次数+1
                    uw.userDataCtrl.reduceDiamond(diamond); //扣除钻石
                    var copyTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
                    if (copyTemp[uw.t_copy_type] == uw.c_prop.copyTypeKey.arena) {
                        self.addCopyTodayCount(copyId, -1);
                    }
                    else {
                        self.setCopyTodayCount(copyId, 0); //重置今日该副本的挑战次数为0
                    }
                    if (cb)
                        cb.call(target);
                });
            });
        };
        /**
         * 今日副本重置次数
         * @param copyId
         */
        __egretProto__.getCopyResetTodayCount = function (copyId) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var self = this;
            self.getCopyTodayCount(copyId); //这是为了初始化
            //防止现在改造是空情况
            var DATA_KEY = self.DATA_KEY;
            var resetCounts = self._data[DATA_KEY.resetCounts];
            if (!resetCounts)
                resetCounts = self._data[DATA_KEY.resetCounts] = {};
            return resetCounts[copyId] || 0;
        };
        /**
         * 增加今日副本重置次数。
         * @param copyId
         * @param count
         */
        __egretProto__.addCopyResetTodayCount = function (copyId, count) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var self = this;
            count = count == null ? 1 : count;
            var c = self.getCopyResetTodayCount(copyId);
            self._data[self.DATA_KEY.resetCounts][copyId] = c + count;
        };
        /**
         * 副本是否锁定。
         * @param copyId
         */
        __egretProto__.isCopyLocked = function (copyId) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var copyStateMap = this.getCopyStateMap();
            return !copyStateMap[copyId];
        };
        /**
         * 获取到当前主副本的该子副本的下一个子副本id
         * @param copyId
         * @returns {*}
         */
        __egretProto__.getNextCopyId = function (copyId) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var self = this;
            var ids = self.copyIds; //该主副本的所有子副本
            for (var i = 0, li = ids.length; i < li; i++) {
                if (ids[i] - 1 == copyId) {
                    return ids[i];
                }
            }
            return 0;
        };
        __egretProto__._getPTime = function (copyTemp) {
            var pTime = Date.newDate();
            if (this.cd) {
                pTime.addMinutes(this.cd);
            }
            return pTime;
        };
        /**
         * 设置副本通关。
         * @param copyId
         * @param star
         */
        __egretProto__.setCopyPassed = function (copyId, star) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var self = this, data = self._data;
            var KEY = uw.dsConsts.CopyProgressEntity;
            var t_copy = mo.getJSONWithFileName(uw.cfg_t_copy);
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var copyTemp = t_copy[copyId];
            var copyArr = data[KEY.copyArr];
            var copyStar = data[KEY.copyStar];
            //今日挑战次数 由于竞技场是在开始时已经扣除了，所以这里就不再重复扣除了。
            if (copyTemp[uw.t_copy_type] != uw.c_prop.copyTypeKey.arena)
                self.addCopyTodayCount(copyId); //今日通关次数+1
            if (copyStar[copyId] != star) {
                copyStar[copyId] = Math.max(star, (copyStar[copyId] || 0));
                self.pushNotify(self.__class.ON_NEW_COPY_OPENED, uw.userDataCtrl.currCopyId);
            }
            self.pTime = self._getPTime(copyTemp);
            if (self.type == uw.c_prop.pCopyTypeKey.trial) {
            }
            else {
                if (copyArr.indexOf(copyId) >= 0) {
                }
                else {
                    copyArr.push(copyId); //加到已通关列表中
                    var isLast = copyTemp[uw.t_copy_isLast];
                    uw.log("-->isLast = %s", isLast);
                    if (isLast) {
                        self.finished = 1; //更新主副本为已经全部通过
                        self.set(KEY.finished, 1);
                        var nextPCopyId = self.id + 1; //下一个主副本id
                        var t_copyPrimary = mo.getJSONWithFileName(uw.cfg_t_copyPrimary);
                        if (!t_copyPrimary[nextPCopyId]) {
                            return;
                        }
                        if (uw.userDataCtrl._copyProgressMap[nextPCopyId]) {
                            return;
                        }
                        var obj = {};
                        var progressKey = uw.dsConsts.CopyProgressEntity;
                        obj[progressKey.userId] = uw.userDataCtrl.getId();
                        obj[progressKey.pCopyId] = nextPCopyId;
                        obj[progressKey.finished] = 0;
                        var nextDataCtrl = uw.CopyProgressDataCtrl.create(obj);
                        //保存到userDataCtrl中
                        uw.userDataCtrl._copyProgressMap[nextPCopyId] = nextDataCtrl;
                        uw.userDataCtrl._copyProgressMapByType[nextDataCtrl.type][nextPCopyId] = nextDataCtrl;
                        //更新当前副本id数据
                        uw.userDataCtrl.currPCopyId = nextPCopyId;
                        uw.userDataCtrl.currCopyId = nextDataCtrl.firstId;
                        //更新最后一个打开的副本id数据
                        if (uw.userDataCtrl._lastCopyInfo) {
                            uw.userDataCtrl._lastCopyInfo.pCopyId = nextPCopyId;
                            uw.userDataCtrl._lastCopyInfo.copyId = nextDataCtrl.firstId;
                        }
                    }
                    else {
                        //更新当前副本id数据
                        uw.userDataCtrl.currCopyId = self.getNextCopyId(copyId);
                        //更新最后一个打开的副本id数据
                        if (uw.userDataCtrl._lastCopyInfo)
                            uw.userDataCtrl._lastCopyInfo.copyId = uw.userDataCtrl.currCopyId;
                    }
                    uw.log("setCopyPassed----ON_NEW_COPY_OPENED = ", uw.userDataCtrl.currCopyId);
                    self.pushNotify(self.__class.ON_NEW_COPY_OPENED, uw.userDataCtrl.currCopyId);
                }
            }
        };
        /**
         * 获取该副本的开启未通过的副本id。0即为全部通过了。
         * @returns {*}
         */
        __egretProto__.getOpeningId = function () {
            var self = this;
            if (self.finished)
                return 0;
            var ids = self.copyIds; //该主副本的所有子副本
            var copyArr = self._data[uw.dsConsts.CopyProgressEntity.copyArr]; //获取已经通关的子副本列表
            if (copyArr.length == 0)
                return self.firstId; //都没有通关，就是返回第一个子副本了
            for (var i = 0, li = ids.length; i < li; i++) {
                var id = ids[i];
                if (copyArr.indexOf(id) >= 0) {
                    continue;
                }
                if (copyArr.indexOf(id - 1) >= 0) {
                    return id;
                }
            }
            return 0; //都没有，就是返回0
        };
        /**
         * 判断一个副本是否通关
         * @param copyId
         * @returns {Boolean}
         */
        __egretProto__.isCopyPassed = function (copyId) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var self = this;
            if (self.finished)
                return true;
            var copyArr = self._data[uw.dsConsts.CopyProgressEntity.copyArr];
            return copyArr.indexOf(copyId) >= 0;
        };
        /**
         * 获取副本状态map。
         * @returns {{}}
         */
        __egretProto__.getCopyStateMap = function () {
            var self = this, data = self._data;
            var KEY = uw.dsConsts.CopyProgressEntity;
            var copyStateMap = {};
            var copyArr = data[KEY.copyArr] || []; //已通关子副本列表
            var copyStar = data[KEY.copyStar] || {}; //星级map
            for (var i = 0, li = copyArr.length; i < li; i++) {
                var copyId = copyArr[i];
                copyStateMap[copyId] = {
                    state: 1,
                    star: copyStar[copyId] || 0,
                    times: self.getCopyTodayCount(copyId)
                };
            }
            var openId = self.getOpeningId();
            if (openId) {
                copyStateMap[openId] = { state: 0, star: 0, times: 0 };
            }
            return copyStateMap;
        };
        __egretProto__.validCopy = function (copyId, isWipe, count) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var self = this, data = self._data;
            var KEY = uw.dsConsts.CopyProgressEntity;
            var copyArr = data[KEY.copyArr];
            var copyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            var timesPerDay = copyInfo[uw.t_copy_timesPerDay];
            if (timesPerDay == 0)
                return true; //无限次
            if ((timesPerDay == -1 && self.isCopyPassed(copyId)))
                return mo.showMsg(uw.id_c_msgCode.noCopyTimes);
            if (timesPerDay > 0 && timesPerDay <= self.getCopyTodayCount(copyId))
                return mo.showMsg(uw.id_c_msgCode.noCopyTimes); //挑战次数已达上限
            return true;
        };
        /**
         * 获取该主副本今日总共被挑战了几次了
         */
        __egretProto__.getTotalTimes = function () {
            var self = this;
            var data = self._data;
            var KEY = uw.dsConsts.CopyProgressEntity;
            var timesPerDay = data[KEY.timesPerDay];
            var times = 0;
            for (var copyId in timesPerDay) {
                times += timesPerDay[copyId] || 0;
            }
            return times;
        };
        /**
         * 获取评星。
         * @param copyId
         * @returns {*|number}
         */
        __egretProto__.getStar = function (copyId) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var copyStar = this._data[uw.dsConsts.CopyProgressEntity.copyStar] || {};
            return copyStar[copyId] || 0;
        };
        /**
         * 是否能够扫荡。
         * @param copyId
         * @returns {boolean}
         */
        __egretProto__.canWipe = function (copyId) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var self = this;
            var pCopyTypeKey = uw.c_prop.pCopyTypeKey;
            if (!(self.type == pCopyTypeKey.normal || self.type == pCopyTypeKey.cream))
                return false; //非普通或精英副本不能扫荡
            var copyTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            var timesPerDay = copyTemp[uw.t_copy_timesPerDay];
            if (timesPerDay == -1)
                return false; //一生只能挑战一次不能扫荡
            if (!self.isCopyPassed(copyId))
                return false; //还未通关不能扫荡
            if (self.getStar(copyId) != 3)
                return false; //未能达到3星不能扫荡
            return true;
        };
        /**
         * 是否精英副本
         */
        __egretProto__.isCream = function (copyId) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var copyTypeKey = uw.c_prop.copyTypeKey;
            var copyTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            return (copyTemp[uw.t_copy_type] == copyTypeKey.cream || copyTemp[uw.t_copy_type] == copyTypeKey.creamBoss);
        };
        /**
         * 是否试炼
         */
        __egretProto__.isTrial = function () {
            var self = this;
            var pCopyTypeKey = uw.c_prop.pCopyTypeKey;
            return (self.type == pCopyTypeKey.trial);
        };
        /**
         * 是否镜像
         * @returns {boolean}
         */
        __egretProto__.isMirror = function () {
            var self = this;
            var pCopyTypeKey = uw.c_prop.pCopyTypeKey;
            return (self.type == pCopyTypeKey.mirror);
        };
        /**
         * 查找子副本id的索引
         */
        __egretProto__.getIndexOfCopyId = function (copyId) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            return this.copyIds.indexOf(copyId);
        };
        /**
         * 获取怪物信息
         */
        __egretProto__.getCombatInfo = function (copyId) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var combatData = mo.getJSONWithFileName(uw.cfg_t_combat);
            var combatIds = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId)[uw.t_copy_combatId];
            var id, cbData, monsterIds, tempId, monsters = [], ctrl;
            if (combatIds.length > 0) {
                for (var i = 0; i < combatIds.length; i++) {
                    id = combatIds[i];
                    cbData = combatData[id];
                    monsterIds = cbData[uw.t_combat_monsterIds];
                    monsters.push(monsterIds);
                }
            }
            return monsters;
        };
        /**
         * 获取副本的掉落物品
         * @param copyId
         * @returns {Array}
         */
        __egretProto__.getShowLootsByCopyId = function (copyId) {
            copyId = typeof copyId == "string" ? parseInt(copyId) : copyId;
            var copyLootData = mo.getJSONWithFileNameAndID(uw.cfg_t_copyLoot, copyId);
            return [].concat(copyLootData[uw.t_copyLoot_showItems]);
        };
        /**
         * 检查是否有子副本已经通过了
         * @returns {boolean}
         */
        __egretProto__.isAnyCopyPassed = function () {
            var self = this;
            var copyStateMap = self.getCopyStateMap();
            for (var key in copyStateMap) {
                if (copyStateMap[key]) {
                    if (copyStateMap[key].state == 1)
                        return true;
                }
            }
            return false;
        };
        /**
         * 重置副本挑战cd
         * @param cb
         * @param target
         * @returns {*}
         */
        __egretProto__.resetPCopyCD = function (cb, target) {
            var self = this;
            if (!self.cd || !self.pTime || self.pTime.isBefore(Date.newDate()))
                return cb.call(target); //不需要重置
            var diamond = 0;
            var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
            var confirmFunc = null;
            if (self.type == uw.c_prop.pCopyTypeKey.arena) {
                diamond = c_game[uw.id_c_game.arenaCfg][2];
                confirmFunc = function (diamond, cb) {
                    mo.showMsg(uw.id_c_msgCode.diamondClearCDTime, diamond, cb, self); //确认信息提示框
                };
            }
            else {
                return cb.call(target);
            }
            confirmFunc(diamond, function () {
                if (diamond > uw.userDataCtrl.getDiamond())
                    return mo.showMsg(uw.id_c_msgCode.noDiamond);
                var args = {};
                var argsKey = uw.iface.a_copy_resetPCopyCD_args;
                args[argsKey.pCopyId] = self.id;
                mo.requestWaiting(uw.iface.a_copy_resetPCopyCD, args, function () {
                    uw.userDataCtrl.reduceDiamond(diamond); //扣除钻石
                    self.pTime = Date.newDate(); //重置时间
                    cb.call(target);
                });
            });
        };
        CopyProgressDataCtrl.__className = "CopyProgressDataCtrl";
        CopyProgressDataCtrl.CONFIG_KEY = {
            copyInfoNode: "copyInfoNode",
            relateID: "relateID",
            pos: "pos",
            tag: "tag",
            displayID: "displayID",
            icon: "icon"
        };
        CopyProgressDataCtrl.ON_NEW_COPY_OPENED = "onNewCopyOpened"; //新的副本被开启了
        /**
         * 通过服务器进行初始化
         * @param cb
         * @param cbTarget
         */
        CopyProgressDataCtrl.initByServer = function (cb, cbTarget) {
            if (cbTarget === void 0) { cbTarget = null; }
            //初始化副本配置信息到全局中使用
            var trialInfo = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.trialSet);
            uw.trialFreeCount = trialInfo[0]; //每日免费挑战次数
            uw.trialCd = trialInfo[1]; //挑战冷却时间，单位：分钟
            uw.trialItemId = trialInfo[5]; //免费挑战洗炼的道具id
            var mirrorInfo = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.mirrorWorldSet);
            uw.mirrorRewardStrength = mirrorInfo[1]; //榜上玩家防守胜利获得体力值
            uw.mirrorRewardStrMax = mirrorInfo[2]; //获得体力值次数上限
            uw.mirrorRewardPercentOnLose = mirrorInfo[0]; // 榜上玩家战败剩余百分比
            uw.mirrorPVEFreeCount = mirrorInfo[4]; //每日PVE免费挑战次数
            uw.mirrorRewardTime = mirrorInfo[5]; //榜上几分钟获得一次奖励
            uw.mirrorRewardArr = mirrorInfo[6].split(","); //榜1~6获得的不同金币奖励
            uw.mirrorFailBoardTime = mirrorInfo[7]; // 呆榜上几小时后下榜，并给与礼包
            uw.mirrorPVPWaitingTime = mirrorInfo[8]; // 挑战榜上时准备战斗时间（分钟）
            uw.mirrorPVPCopyId = mirrorInfo[10]; // 镜像PVP副本ID
            uw.mirrorChangeRankWaitingTime = 1; //换榜等待时间，写死的1分钟
            uw.mirrorPVPStrengthCost = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, uw.mirrorPVPCopyId)[uw.t_copy_strength];
            mo.request(uw.iface.a_copy_getCopyProgressList, {}, function (data) {
                uw.userDataCtrl._initProgressMap(data);
                if (cb) {
                    cb.call(cbTarget, null);
                }
            });
        };
        return CopyProgressDataCtrl;
    })(uw.RespAndTempDataCtrl);
    uw.CopyProgressDataCtrl = CopyProgressDataCtrl;
    CopyProgressDataCtrl.prototype.__class__ = "uw.CopyProgressDataCtrl";
    uw.trialFreeCount;
    uw.trialCd;
    uw.trialItemId;
    uw.mirrorRewardStrength;
    uw.mirrorRewardStrMax;
    uw.mirrorRewardPercentOnLose;
    uw.mirrorPVEFreeCount;
    uw.mirrorRewardTime;
    uw.mirrorRewardArr;
    uw.mirrorFailBoardTime;
    uw.mirrorPVPWaitingTime;
    uw.mirrorPVPCopyId;
    uw.mirrorChangeRankWaitingTime;
    uw.mirrorPVPStrengthCost;
})(uw || (uw = {}));

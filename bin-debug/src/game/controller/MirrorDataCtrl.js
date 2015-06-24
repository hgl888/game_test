/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var MirrorDataCtrl = (function (_super) {
        __extends(MirrorDataCtrl, _super);
        function MirrorDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MirrorDataCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.enemyHeros = null;
            self._enemyRankInfo = null;
            self._fightOpt = null;
            self.myRankInfo = {
                combatEff: 0,
                enterTime: null,
                endTime: null,
                iconId: null,
                isIn: false,
                userId: null,
                lvl: 0,
                name: null,
                tids: null,
                type: null
            };
        };
        /**
         * 返回镜像战斗相关数据
         * @returns {null}
         */
        __egretProto__.getFightOpt = function () {
            return this._fightOpt;
        };
        __egretProto__.getCopyId4PVE = function (type) {
            var copyPrimaryTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copyPrimary, uw.c_prop.pCopyIdKey.mirror);
            var firstId = copyPrimaryTemp[uw.t_copyPrimary_firstId];
            return firstId + type;
        };
        __egretProto__.getTypeByCopyId4PVE = function (copyId) {
            var copyPrimaryTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copyPrimary, uw.c_prop.pCopyIdKey.mirror);
            var firstId = copyPrimaryTemp[uw.t_copyPrimary_firstId];
            return copyId - firstId;
        };
        __egretProto__.getCopyTemp4PVE = function (type) {
            var t_copy = mo.getJSONWithFileName(uw.cfg_t_copy);
            return t_copy[this.getCopyId4PVE(type)];
        };
        __egretProto__.countdownForDefence = function () {
        };
        /**
         * 获取某一页的排行。
         * @param type  榜单难度类型
         * @param page
         * @param cb
         * @param target
         */
        __egretProto__.getRanks = function (type, page, cb, target) {
            var self = this;
            var args = {};
            var argsKey = uw.iface.a_mirror_getRanks_args; //
            args[argsKey.type] = type;
            args[argsKey.page] = page;
            var iface = uw.iface.a_mirror_getRanks; //
            mo.requestWaiting(iface, args, function (history) {
                var KEY = uw.dsConsts.MirrorRankViewEntity;
                var sortOpt = mo.sortOption.bind({ list: [KEY.totalGain, KEY.combatEff] });
                history.sort(sortOpt);
                var rankHistory = [];
                for (var i = 0, li = history.length; i < li; ++i) {
                    var rankEntity = history[i];
                    var rank = {
                        combatEff: rankEntity[KEY.combatEff],
                        enterTime: rankEntity[KEY.enterTime],
                        iconId: rankEntity[KEY.iconId],
                        id: rankEntity[KEY.id],
                        isIn: rankEntity[KEY.isIn],
                        isLocked: rankEntity[KEY.isLocked],
                        lockEndTime: rankEntity[KEY.lockEndTime],
                        lvl: rankEntity[KEY.lvl],
                        name: rankEntity[KEY.name],
                        tids: rankEntity[KEY.tids],
                        type: rankEntity[KEY.type],
                        userId: rankEntity[KEY.userId]
                    };
                    // 根据防守层不同，单位时间内收获
                    var enterTime = Date.newDate(rank.enterTime);
                    rank.totalGain = self.getTotalGain(type, enterTime);
                    rank.endTime = Date.newDate(enterTime.addHours(uw.mirrorFailBoardTime));
                    rankHistory.push(rank);
                }
                if (cb)
                    cb.call(target, rankHistory);
            });
        };
        /**
         * 根据防守层难度，计算累计收入
         * @param type 难度
         * @param startTime
         * @param endTime
         * @returns {Number}
         */
        __egretProto__.getTotalGain = function (type, startTime, endTime) {
            var self = this;
            endTime = endTime || Date.newDate();
            // 根据防守层不同，单位时间内收获
            var enterTime = Date.newDate(startTime);
            var nowTime = Date.newDate(endTime);
            var deltaMin = enterTime.getMinutesBetween(nowTime);
            var totalGain = Math.floor((Math.floor(deltaMin / uw.mirrorRewardTime) + 1) * Math.floor(uw.mirrorRewardArr[type]));
            return totalGain;
        };
        /**
         * 获得所在层的难度
         * @returns {*}
         */
        __egretProto__.getMyRankType = function () {
            var self = this;
            return self.myRankInfo.isIn ? self.myRankInfo.type : null;
        };
        /**
         * 获得离下班还有多长时间
         */
        __egretProto__.getOutRankLeftTimeStr = function () {
            var self = this;
            var enterTime = Date.newDate(self.myRankInfo.enterTime);
            var endTime = Date.newDate(enterTime.addHours(uw.mirrorFailBoardTime));
            var now = Date.newDate();
            var leftMillisecond = now.getMillisecondsBetween(endTime);
            return mo.getTimeStr(leftMillisecond);
        };
        /**
         * 查看自己是否在该难度的榜单上
         * @param cb
         * @param target
         */
        __egretProto__.getMyRank = function (cb, target) {
            var self = this;
            mo.requestWaiting(uw.iface.a_mirror_getMyRank, function (rank) {
                var KEY = uw.dsConsts.MirrorRankViewEntity;
                if (!rank) {
                    self.myRankInfo.isIn = false;
                    if (cb)
                        cb.call(target, self.myRankInfo);
                    return;
                }
                var isIn = rank[KEY.isIn];
                if (isIn) {
                    var enterTime = Date.newDate(rank[KEY.enterTime]);
                    var endTime = enterTime.addHours(uw.mirrorFailBoardTime);
                    var now = Date.newDate();
                    isIn = now.isBefore(endTime);
                    // 开始倒计时，监听下榜事件
                    if (isIn) {
                        if (self._inv)
                            mo.timer.removeInvocation(self._inv);
                        self._inv = mo.timer.countdownToEndTime(endTime, null, null, function () {
                            //这时候需要请求服务器结算一下到时间点的奖励邮件
                            mo.request(uw.iface.a_mirror_calMirrorDefence, function (rank) {
                            });
                            // 显示提示信息
                            mo.showMsg(uw.id_c_msgCode.timeEndRewardMail, function () {
                                self.pushNotify(self.__class.ON_FAIL_BOARD);
                            }, self);
                        }, self);
                    }
                }
                var rankInfo = self.myRankInfo;
                rankInfo.combatEff = rank[KEY.combatEff];
                rankInfo.enterTime = rank[KEY.enterTime];
                rankInfo.endTime = Date.newDate(rank[KEY.enterTime]).addHours(uw.mirrorFailBoardTime);
                rankInfo.iconId = rank[KEY.iconId];
                rankInfo.isIn = isIn;
                rankInfo.userId = rank[KEY.userId];
                rankInfo.lvl = rank[KEY.lvl];
                rankInfo.name = rank[KEY.name];
                rankInfo.tids = rank[KEY.tids];
                rankInfo.type = rank[KEY.type];
                if (cb)
                    cb.call(target, rankInfo);
            });
        };
        /**
         * 闯关模式开始
         * @param copyId
         * @param cb
         * @param target
         */
        __egretProto__.pveStart = function (copyId, cb, target) {
            var self = this;
            if (uw.userDataCtrl._validCopy(copyId, false, 1)) {
                var type = self.getTypeByCopyId4PVE(copyId);
                self._fightOpt = {};
                self._fightOpt.fightType = self.__class.PVE;
                self._fightOpt.rankType = type;
                var args = {};
                var argsKey = uw.iface.a_mirror_pveStart_args; //
                args[argsKey.type] = type;
                var iface = uw.iface.a_mirror_pveStart; //
                mo.requestWaiting(iface, args, function (uniqueKey) {
                    var copyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
                    var strength = copyInfo[uw.t_copy_strength];
                    var rate = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.fightConfig)[2];
                    uw.userDataCtrl.addStrength(-Math.floor(strength / rate)); //扣减体力
                    uw.userDataCtrl.uniqueKey = uniqueKey;
                    if (cb)
                        cb.call(target);
                });
            }
        };
        /**
         * 闯关模式结束
         * @param copyId
         * @param isWin
         * @param fightData
         * @param cb
         * @param target
         */
        __egretProto__.pveEnd = function (copyId, isWin, fightData, cb, target) {
            var self = this;
            var type = self.getTypeByCopyId4PVE(copyId);
            var encryptStr = uw.fightUtils.md5(JSON.stringify(fightData), uw.userDataCtrl.getId());
            var vData = [encryptStr, fightData];
            var args = {};
            var argsKey = uw.iface.a_mirror_pveEnd_args;
            args[argsKey.type] = type;
            args[argsKey.isWin] = isWin;
            args[argsKey.vData] = vData;
            mo.requestWaiting(uw.iface.a_mirror_pveEnd, args, function (fightResult) {
                if (!isWin)
                    return cb.call(target, null);
                uw.userDataCtrl.saveFightResults(copyId, false, fightResult);
                if (cb)
                    return cb.call(target, fightResult);
            });
        };
        /**
         * 获得敌方布阵
         * @returns {null}
         */
        __egretProto__.getEnemyHeros = function () {
            return this.enemyHeros;
        };
        /**
         * 获得PVP战胜奖励
         * @returns {null}
         */
        __egretProto__.getPVPWinGain = function () {
            return this._fightOpt.pvpWinGain;
        };
        /**
         * 获得我的实时在榜累计奖励
         * @returns {Number}
         */
        __egretProto__.getMyRankGain = function () {
            var self = this;
            if (self.myRankInfo.isIn) {
                return uw.mirrorDataCtrl.getTotalGain(self.myRankInfo.type, self.myRankInfo.enterTime);
            }
            return 0;
        };
        /**
         * 准备挑战某个玩家
         * @param enemyRankInfo
         * @param cb
         * @param target
         */
        __egretProto__.pvpPrepare = function (enemyRankInfo, cb, target) {
            var self = this;
            self._enemyRankInfo = enemyRankInfo;
            self._fightOpt = {};
            self._fightOpt.fightType = self.__class.PVP;
            self._fightOpt.rankType = enemyRankInfo.type;
            // 计算获胜收益
            var totalGain = uw.mirrorDataCtrl.getTotalGain(enemyRankInfo.type, enemyRankInfo.enterTime);
            self._fightOpt.pvpWinGain = Math.floor(totalGain * (1 - uw.mirrorRewardPercentOnLose));
            var args = {};
            var argsKey = uw.iface.a_mirror_pvpPrepare_args; //
            args[argsKey.type] = enemyRankInfo.type;
            args[argsKey.enemyId] = enemyRankInfo.userId;
            var iface = uw.iface.a_mirror_pvpPrepare; //
            mo.requestWaiting(iface, args, function (arenaFight) {
                self.enemyUserId = arenaFight[uw.dsConsts.ArenaFight.enemyUserId];
                self.enemySecretSkills = arenaFight[uw.dsConsts.ArenaFight.secretSkills];
                self.enemyHeros = arenaFight[uw.dsConsts.ArenaFight.heroes];
                if (cb)
                    cb.call(target, self.enemyHeros);
            });
        };
        /**
         * 取消挑战某个玩家。这是在退出挑战界面的时候调用的接口，为的是解除锁定。
         * @param cb
         * @param target
         */
        __egretProto__.pvpCancel = function (cb, target) {
            var self = this;
            self._enemyRankInfo = null;
            var iface = uw.iface.a_mirror_pvpCancel; //
            mo.requestWaiting(iface, function () {
                this.enemyHeros = null;
                if (cb)
                    cb.call(target);
            });
        };
        /**
         * 战斗开始。这时候要在后台进行锁定操作。
         * @param cb
         * @param target
         */
        __egretProto__.pvpStart = function (cb, target) {
            var self = this;
            self.pushNotify(self.__class.ON_PVP_START);
            var iface = uw.iface.a_mirror_pvpStart; //
            var copyId = uw.mirrorPVPCopyId;
            mo.requestWaiting(iface, function (uniqueKey) {
                var copyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
                var strength = copyInfo[uw.t_copy_strength];
                uw.userDataCtrl.addStrength(-strength); //扣减体力
                uw.userDataCtrl.uniqueKey = uniqueKey;
                if (cb)
                    cb.call(target);
            });
        };
        /**
         * 战斗结束。这时候后台会解锁。
         * @param isWin
         * @param fightData
         * @param cb
         * @param target
         */
        __egretProto__.pvpEnd = function (isWin, fightData, cb, target) {
            var self = this;
            self._enemyRankInfo = null;
            var copyId = uw.mirrorPVPCopyId;
            var encryptStr = uw.fightUtils.md5(JSON.stringify(fightData), uw.userDataCtrl.getId());
            var vData = [encryptStr, fightData];
            var args = {};
            var argsKey = uw.iface.a_mirror_pvpEnd_args; //
            args[argsKey.isWin] = isWin;
            args[argsKey.vData] = vData;
            var iface = uw.iface.a_mirror_pvpEnd; //
            mo.requestWaiting(iface, args, function (fightResult) {
                if (!isWin)
                    return cb.call(target, null);
                uw.userDataCtrl.saveFightResults(copyId, false, fightResult);
                if (cb)
                    return cb.call(target, fightResult);
            });
        };
        /**
         * 进入到更高级的榜单
         * @param cb
         * @param target
         */
        __egretProto__.enterHigher = function (cb, target) {
            var self = this;
            self.pushNotify(self.__class.ON_ENTER_HIGHER, self._fightOpt.rankType);
            mo.requestWaiting(uw.iface.a_mirror_enterHigher, function () {
                if (cb)
                    cb.call(target);
            });
        };
        /**
         * 停留在原来榜单
         * @param cb
         * @param target
         */
        __egretProto__.stayThere = function (cb, target) {
            mo.requestWaiting(uw.iface.a_mirror_stayThere, cb, target);
        };
        /**
         * 获取防守记录
         * @param cb
         * @param target
         */
        __egretProto__.getDefenceHistory = function (cb, target) {
            var iface = uw.iface.a_mirror_getDefenceHistory; //
            mo.requestWaiting(iface, function (history) {
                var arr = [];
                if (history) {
                    for (var i = history.length - 1; i >= 0; --i) {
                        var item = history[i];
                        arr.push({
                            userId: item[0],
                            time: item[1],
                            state: item[2] || 0,
                            name: item[3],
                            iconId: item[4],
                            lvl: item[5]
                        });
                    }
                }
                if (cb)
                    cb.call(target, arr);
            });
        };
        /**
         * 领取防守奖励
         * @param time
         * @param cb
         * @param target
         */
        __egretProto__.getDefenceReward = function (time, cb, target) {
            var args = {};
            var argsKey = uw.iface.a_mirror_getDefenceReward_args;
            args[argsKey.time] = time;
            var iface = uw.iface.a_mirror_getDefenceReward; //
            mo.requestWaiting(iface, args, function () {
                uw.userDataCtrl.addStrength(uw.mirrorRewardStrength); //添加体力
                if (cb)
                    cb.call(target);
            });
        };
        /**
         * 撤退
         * @param cb
         * @param target
         */
        __egretProto__.giveWay = function (cb, target) {
            var self = this;
            mo.requestWaiting(uw.iface.a_mirror_giveWay, function () {
                self.myRankInfo.isIn = false;
                //收益已经发送到邮箱中了
                mo.showMsg(uw.id_c_msgCode.leaveRewardMail, function () {
                    if (cb)
                        cb.call(target);
                    self.pushNotify(self.__class.ON_FAIL_BOARD);
                }, self);
            });
        };
        /**
         * 检查敌方是否可以挑战
         * @param enemyInfo
         * @returns {*}
         */
        __egretProto__.getChallengeOpt = function (enemyInfo) {
            var self = this;
            var myRankInfo = self.myRankInfo;
            var opt = {};
            opt.notOwnHeros = uw.userDataCtrl.checkOwnedHero(enemyInfo.tids);
            opt.hasSameHeros = (opt.notOwnHeros.length == 0);
            opt.lessType = myRankInfo.isIn ? enemyInfo.type > myRankInfo.type : true;
            // 在榜时: 1.相同英雄 2.敌方高于自己所在榜
            // 不在榜时: 1.相同英雄
            opt.canChallenge = opt.hasSameHeros && opt.lessType;
            return opt;
        };
        /**
         * 查找镜像副本Id所对应的难度类型(0~5共6个难度)
         * @param copyId
         * @returns {*}
         */
        __egretProto__.getLayerTypeByCopyId = function (copyId) {
            var self = this;
            var progress = uw.userDataCtrl.getCopyProgress(uw.c_prop.pCopyIdKey.mirror);
            return progress.getIndexOfCopyId(copyId);
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            self.enemyHeros = null;
            self._enemyRankInfo = null;
            self._fightOpt = null;
            self.myRankInfo = null;
            if (self._inv)
                mo.timer.removeInvocation(self._inv);
            self._inv = null;
        };
        MirrorDataCtrl.__className = "MirrorDataCtrl";
        MirrorDataCtrl.ON_FAIL_BOARD = "onFailBoard"; //下榜了
        MirrorDataCtrl.ON_PVP_START = "onPVPStart"; //PVP开始
        MirrorDataCtrl.ON_ENTER_HIGHER = "onEnterHigher"; // 进阶到更高榜
        MirrorDataCtrl.PVE = 0; // 闯关模式
        MirrorDataCtrl.PVP = 1; // 挑战模式
        return MirrorDataCtrl;
    })(mo.DataController);
    uw.MirrorDataCtrl = MirrorDataCtrl;
    MirrorDataCtrl.prototype.__class__ = "uw.MirrorDataCtrl";
    uw.mirrorDataCtrl;
})(uw || (uw = {}));

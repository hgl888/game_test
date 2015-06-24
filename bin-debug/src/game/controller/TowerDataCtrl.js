/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var TowerDataCtrl = (function (_super) {
        __extends(TowerDataCtrl, _super);
        function TowerDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TowerDataCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.dataKey = uw.dsConsts.TowerEntity;
            var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
            self.towerConfig = c_game[uw.id_c_game.towerConfig];
            self.maxRankUserName = "无"; //第一名名字
            self.maxRankUserLayer = 0; //第一名最高层数
        };
        /**
         * 初始化第一名
         * @param towerRankData
         */
        __egretProto__.initMaxRank = function (towerRankData) {
            if (!towerRankData)
                return;
            var TowerRankEntity = uw.dsConsts.TowerRankEntity;
            this.maxRankUserName = towerRankData[TowerRankEntity.userName];
            this.maxRankUserLayer = towerRankData[TowerRankEntity.layer];
        };
        //是否最高层了
        __egretProto__.isHighestLayer = function () {
            var self = this;
            return self.getCopyHighestLayer() == self.getLayer();
        };
        /**
         * 获取守卫塔副本最高层的层数
         */
        __egretProto__.getCopyHighestLayer = function () {
            var self = this;
            var t_copy = mo.getJSONWithFileName(uw.cfg_t_copy);
            var copyHighestLayer = 0;
            for (var i = 0; i < 1000; i++) {
                if (!t_copy[self.towerConfig[0] + i])
                    break;
                copyHighestLayer++;
            }
            return copyHighestLayer;
        };
        __egretProto__.isCopyPassed = function (copyId) {
            var self = this;
            var startCopyId = self.towerConfig[0];
            var hightestCopyId = self.getHighLayer() + startCopyId - 1;
            return copyId <= hightestCopyId;
        };
        /**
         * 获取当前层数对应副本id
         */
        __egretProto__.getCurCopyId = function () {
            var self = this;
            var startCopyId = self.towerConfig[0];
            var curCopyId = startCopyId + self.getLayer();
            if (self.isHighestLayer()) {
                return curCopyId - 1;
            }
            return curCopyId;
        };
        /**
         * 获取下一个领取宝箱
         * @returns [层数,宝箱id]，如果没有返回null
         */
        __egretProto__.getNextChest = function () {
            var self = this;
            var chestData = self.towerConfig[1];
            var chestDataObj = mo.strToObj(chestData);
            var layer = self.getLayer();
            var chestLayer = this.getChestLayer();
            //假如当前层数存在宝箱，并且木有获取则返回当前的宝箱
            var curLayerChest = chestDataObj[layer];
            if (curLayerChest && !chestLayer[layer]) {
                return [layer, curLayerChest];
            }
            for (var key in chestDataObj) {
                var locChestId = chestDataObj[key];
                var locLayer = parseInt(key);
                if (locLayer > layer) {
                    return [locLayer, locChestId];
                }
            }
            return null;
        };
        //判断当前层数是否需要领取宝箱才能继续挑战
        __egretProto__.isNeedOpenChest = function () {
            var self = this;
            var layer = self.getLayer();
            var chestData = self.towerConfig[1];
            var chestDataObj = mo.strToObj(chestData);
            var curLayerChest = chestDataObj[layer];
            var chestLayer = this.getChestLayer();
            //假如当前层数存在宝箱，并且木有打开,则需要先打开宝箱
            if (curLayerChest && !chestLayer[layer]) {
                return true;
            }
            return false;
        };
        /**
         * 守卫塔挑战开始
         * @param copyId
         * @param cb
         * @param target
         */
        __egretProto__.fightStart = function (copyId, cb, target) {
            var self = this;
            //判断是否高层
            var curLayer = self.getLayer();
            var copyHighestLayer = self.getCopyHighestLayer();
            if (curLayer == copyHighestLayer)
                return mo.showMsg("已经达到最高层");
            //判断是否宝箱是否领取
            if (self.isNeedOpenChest())
                return mo.showMsg("请先领取宝箱");
            mo.requestWaiting(uw.iface.a_tower_fightStart, {}, function (uniqueKey) {
                self.uniqueKey = uniqueKey;
                if (cb)
                    return cb.call(target);
            });
        };
        /**
         * 守卫塔挑战结束
         * @param isWin
         * @param fightData
         * @param cb
         * @param target
         */
        __egretProto__.fightEnd = function (isWin, fightData, cb, target) {
            var self = this;
            fightData[3] = self.uniqueKey;
            var encryptStr = uw.fightUtils.md5(JSON.stringify(fightData), uw.userDataCtrl.getId());
            var vData = [encryptStr, fightData];
            var args = {};
            var argsKey = uw.iface.a_tower_fightEnd_args;
            args[argsKey.isWin] = isWin;
            args[argsKey.vData] = vData;
            var copyId = self.getCurCopyId();
            mo.requestWaiting(uw.iface.a_tower_fightEnd, args, function (fightResult) {
                if (!isWin)
                    return cb.call(target, null);
                //更新层数
                var curLayer = self.getLayer();
                curLayer++;
                self.setLayer(curLayer);
                //更新最高历史层数
                var highLayer = self.getHighLayer();
                if (curLayer > highLayer)
                    self.setHighLayer(curLayer);
                uw.userDataCtrl.saveFightResults(copyId, false, fightResult);
                if (cb)
                    return cb.call(target, fightResult);
            });
        };
        /**
         * 重置
         * @param cb
         * @param target
         */
        __egretProto__.resetLayer = function (cb, target) {
            var self = this;
            var reNum = self.getReNum();
            var towerInviteNum = uw.userDataCtrl.getItemNum(uw.c_prop.spItemIdKey.towerInvite);
            //先判断是否有次数
            if (reNum <= 0) {
                //如果没有则判断道具
                if (towerInviteNum <= 0)
                    return mo.showMsg(uw.id_c_msgCode.noRefreshTimes);
                mo.showMsg(uw.id_c_msgCode.noFightNum, function () {
                    self._requestResetLayer(cb, target);
                });
            }
            else {
                mo.showMsg(uw.id_c_msgCode.ifRefreshTower, function () {
                    self._requestResetLayer(cb, target);
                });
            }
        };
        /**
         * 请求重置
         * @param cb
         * @param target
         * @private
         */
        __egretProto__._requestResetLayer = function (cb, target) {
            var self = this;
            var reNum = self.getReNum();
            mo.requestWaiting(uw.iface.a_tower_resetLayer, function (data) {
                if (reNum <= 0) {
                    uw.userDataCtrl.reduceItem(uw.c_prop.spItemIdKey.towerInvite, 1);
                }
                else {
                    self.reduceReNum(1);
                }
                self.setLayer(0);
                self.set(self.dataKey.chestLayer, null);
                if (cb)
                    return cb.call(target, data);
            });
        };
        /**
         * 打开宝箱
         * @param cb
         * @param target
         */
        __egretProto__.openChest = function (cb, target) {
            var self = this;
            var layer = self.getLayer();
            var chestLayer = self.getChestLayer();
            //获取宝箱
            var chestLayerObj = mo.strToObj(self.towerConfig[1]);
            var chestItemId = chestLayerObj[layer];
            if (!chestItemId)
                return mo.showMsg("亲，请先领取宝箱");
            if (chestLayer[layer])
                return mo.showMsg("宝箱已经领取过啦");
            mo.requestWaiting(uw.iface.a_tower_openChest, function (useItemInfo) {
                uw.userDataCtrl.handleUseItemInfo(useItemInfo);
                uw.showGainTipsByDlg(useItemInfo, false, mo.formatStr("虚空塔%s层宝箱", layer));
                self.setChestLayer(layer);
                if (cb)
                    return cb.call(target, useItemInfo);
            });
        };
        /**
         * 自动挑战守卫塔
         * @param {Function|null} cb
         * @param {Object|null} target
         */
        __egretProto__.autoFight = function (cb, target) {
            var self = this;
            var layer = self.getLayer();
            var highLayer = self.getHighLayer();
            var vip = uw.userDataCtrl.getVip();
            var limitVip = self.getAutoFightVip();
            var diamond = uw.userDataCtrl.getDiamond();
            //历史小于第1层没法自动战斗
            if (highLayer <= 0)
                return mo.showMsg(uw.id_c_msgCode.noPassOne);
            if (layer == highLayer)
                return mo.showMsg("当前层数已经是最高历史层数");
            //如果VIP等级没开启自动挑战，则消耗钻石
            var costDiamond = 0;
            if (vip < limitVip) {
                //判断钻石是否足够
                costDiamond = self.towerConfig[2] * (highLayer - layer);
                //"是否花费[item=75502]钻石[ubb color=#6dd1ff]%s[/ubb]自动挑战至当前历史最高 [ubb color=#fd68ff]%s层[/ubb]？[/br][ubb size=60]（VIP%s免费）[/ubb]"
                mo.showMsg(uw.id_c_msgCode.ifCostToFightSelf, costDiamond, highLayer, limitVip, function () {
                    if (diamond < costDiamond)
                        return mo.showMsg(uw.id_c_msgCode.noDiamond);
                    self._autoFight(costDiamond, cb, target);
                }, self);
            }
            else {
                //"是否自动挑战至当前历史最高层 [ubb color=#fd68ff]%s层[/ubb]？[/br][/br][ubb size=60]（VIP%s免费）[/ubb]"
                mo.showMsg(uw.id_c_msgCode.ifFreeToFightSelf, highLayer, limitVip, function () {
                    self._autoFight(costDiamond, cb, target);
                }, self);
            }
        };
        /**
         * 获取免费自动战斗的VIP
         * @returns {number}
         */
        __egretProto__.getAutoFightVip = function () {
            var c_vip = mo.getJSONWithFileName(uw.cfg_c_vip);
            var vip = 0;
            for (var i = 0; i < 50; i++) {
                if (c_vip[i][uw.c_vip_isTowerAuto]) {
                    vip = i;
                    break;
                }
            }
            return vip;
        };
        __egretProto__._autoFight = function (costDiamond, cb, target) {
            var self = this, i, li;
            var layer = self.getLayer();
            var highLayer = self.getHighLayer();
            var copyId = self.getCurCopyId();
            mo.requestWaiting(uw.iface.a_tower_autoFight, function (copyResultList) {
                //扣除金币
                uw.userDataCtrl.reduceDiamond(costDiamond);
                //更新层数
                self.setLayer(highLayer);
                //更新已经领取宝箱
                var chestData = self.towerConfig[1];
                var chestDataObj = mo.strToObj(chestData);
                for (i = layer + 1; i <= highLayer; i++) {
                    if (chestDataObj[i]) {
                        self.setChestLayer(i);
                    }
                }
                for (i = 0, li = copyResultList.length; i < li; i++) {
                    var locCopyResult = copyResultList[i];
                    uw.userDataCtrl.saveFightResults(copyId, false, locCopyResult);
                    copyId++;
                }
                if (cb)
                    return cb.call(target, copyResultList, layer);
            });
        };
        /**
         * 获取最大剩余次数
         * @returns number
         */
        __egretProto__.getMaxReNum = function () {
            var vip = uw.userDataCtrl.getVip();
            var c_vip = mo.getJSONWithFileName(uw.cfg_c_vip);
            return c_vip[vip][uw.c_vip_resetTowerCount];
        };
        /**
         * 获取剩余次数
         * @returns {*}
         */
        __egretProto__.getReNum = function () {
            var self = this;
            //24小时
            var nowDate = Date.newDate();
            var reTime = self.get(this.dataKey.reTime);
            if (reTime)
                reTime = Date.newDate(reTime);
            var reNum = self.get(this.dataKey.reNum);
            var c_open = mo.getJSONWithFileName(uw.cfg_c_open);
            //如果超过时间则自动递增数量,更新时间
            if (!reTime || nowDate.getTime() - reTime.getTime() >= 24 * 60 * 60 * 1000) {
                reNum = self.getMaxReNum();
                var resetTime = c_open[uw.id_c_open.tower][uw.c_open_refreshTime];
                self.set(this.dataKey.reTime, (Date.newDate()).clearTime().addHours(resetTime)); //默认为当天的刷新时间点
            }
            self.set(this.dataKey.reNum, reNum);
            return reNum;
        };
        /**
         * 减少剩余次数
         * @returns {*}
         */
        __egretProto__.reduceReNum = function (num) {
            var self = this;
            var reNum = self.getReNum();
            this.set(this.dataKey.reNum, reNum - num);
        };
        /**
         * 获取当前层数
         */
        __egretProto__.getLayer = function () {
            return this.get(this.dataKey.layer);
        };
        /**
         * 获取通关用时
         */
        __egretProto__.getClearSpend = function () {
            return this.get(this.dataKey.highSpend);
        };
        /**
         * 设置当前层数
         */
        __egretProto__.setLayer = function (layer) {
            this.set(this.dataKey.layer, layer);
        };
        /**
         * 获取历史最高层数
         */
        __egretProto__.getHighLayer = function () {
            return this.get(this.dataKey.highLayer);
        };
        /**
         * 设置历史最高层数
         */
        __egretProto__.setHighLayer = function (highLayer) {
            var self = this;
            self.set(this.dataKey.highLayer, highLayer);
            self.pushNotify(self.__class.ON_HIGHER_LAYER, highLayer);
        };
        /**
         * 获取领取过宝箱的层数
         */
        __egretProto__.getChestLayer = function () {
            return this.get(this.dataKey.chestLayer) || {};
        };
        /**
         * 设置领取过宝箱的层数
         * @param layer
         */
        __egretProto__.setChestLayer = function (layer) {
            var chestLayer = this.getChestLayer();
            chestLayer[layer] = 1;
            this.set(this.dataKey.chestLayer, chestLayer);
        };
        TowerDataCtrl.__className = "TowerDataCtrl";
        TowerDataCtrl.ON_HIGHER_LAYER = "onHigherLayer"; //获得更高的历史最高层监听
        TowerDataCtrl.initByServer = function (cb) {
            mo.request(uw.iface.a_tower_getInfo, function (data) {
                uw.towerDataCtrl = uw.TowerDataCtrl.getInstance(data);
                //请求第一名
                uw.rankDataCtrl.getMaxTowerRank(function (rankData) {
                    uw.towerDataCtrl.initMaxRank(rankData);
                    if (cb)
                        cb();
                }, this);
            });
        };
        //测试用
        TowerDataCtrl.testInit = function () {
            uw.TowerDataCtrl.initByServer();
            //TODO
            //            uw.FightUtils.getInstance();
        };
        return TowerDataCtrl;
    })(mo.DataController);
    uw.TowerDataCtrl = TowerDataCtrl;
    TowerDataCtrl.prototype.__class__ = "uw.TowerDataCtrl";
    uw.towerDataCtrl;
})(uw || (uw = {}));

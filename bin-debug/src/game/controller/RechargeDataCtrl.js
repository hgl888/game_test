/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var RechargeDataCtrl = (function (_super) {
        __extends(RechargeDataCtrl, _super);
        function RechargeDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = RechargeDataCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._curCardRechargeId = null; //当前生效的月卡充值id
            self._maxCardEndTime = null; //最后一个月卡失效时间
        };
        __egretProto__.init = function (data) {
            var self = this;
            var KEY = uw.dsConsts.RechargeData;
            data[KEY.countMap] = data[KEY.countMap] || {};
            var cardTimeMap = data[KEY.cardTimeMap] = data[KEY.cardTimeMap] || {};
            for (var key in cardTimeMap) {
                var arr = cardTimeMap[key];
                for (var i = 0, li = arr.length; i < li; i++) {
                    var itemi = arr[i];
                    if (typeof itemi == "string")
                        arr[i] = Date.newDate(itemi);
                }
            }
            _super.prototype.init.call(this, data);
            self._initCardInfo();
        };
        /**
         * 是否已经充过值了。
         * @returns {boolean}
         */
        __egretProto__.hasRecharged = function () {
            var map = this._data[uw.dsConsts.RechargeData.countMap];
            for (var key in map) {
                if (map[key] > 0)
                    return true;
            }
            return false;
        };
        //初始化月卡信息
        __egretProto__._initCardInfo = function () {
            var self = this;
            var data = self._data;
            var cardTimeMap = data[uw.dsConsts.RechargeData.cardTimeMap];
            //计算出当前生效的月卡充值id
            var effTime;
            for (var rechargeId in cardTimeMap) {
                var timeArr = cardTimeMap[rechargeId];
                if (!self._maxCardEndTime || self._maxCardEndTime.isBefore(timeArr[2]))
                    self._maxCardEndTime = timeArr[2];
                if (!effTime || effTime.isAfter(timeArr[1])) {
                    effTime = timeArr[1];
                    self._curCardRechargeId = rechargeId;
                }
            }
        };
        __egretProto__.getCount = function (rechargeId) {
            return this._data[uw.dsConsts.RechargeData.countMap][rechargeId] || 0;
        };
        __egretProto__.getCurCardRechargeId = function () {
            return this._curCardRechargeId;
        };
        /**
         * 获取月卡生效时间
         * @param rechargeId
         */
        __egretProto__.getEffTime = function (rechargeId) {
            var arr = this._data[uw.dsConsts.RechargeData.cardTimeMap][rechargeId];
            return !arr ? null : arr[2];
        };
        /**
         * 获取月卡剩余天数。rechargeId为_curCardRechargeId才需要调用该接口
         */
        __egretProto__.getLeftDays = function () {
            if (this._curCardRechargeId == null)
                return 0;
            var endTime = this._data[uw.dsConsts.RechargeData.cardTimeMap][this._curCardRechargeId][2];
            var now = Date.today();
            return Math.ceil((endTime.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)); //还有多少天到期
        };
        /**
         * 是否是月卡
         * @param rechargeId
         */
        __egretProto__.isMonthCard = function (rechargeId) {
            var c_recharge = mo.getJSONWithFileNameAndID(uw.cfg_c_recharge, rechargeId);
            return !!c_recharge[uw.c_recharge_daily];
        };
        __egretProto__._recharge = function (rechargeId, cb, target) {
            var self = this;
            mo.playWaiting();
            var channelInfo = channelCfg.getCurChannel();
            channelInfo.pay(rechargeId, function (data) {
                self._rechargeFinal(rechargeId, null, cb, target);
                mo.stopWaiting();
            }, self);
        };
        __egretProto__._rechargeFinal = function (rechargeId, receipt, cb, target) {
            var self = this;
            var args = {};
            var argsKey = uw.iface.a_recharge_recharge_args;
            args[argsKey.rechargeId] = rechargeId;
            args[argsKey.receiptData] = receipt;
            args[argsKey.channel] = mo.project.channelId;
            //mo.requestWaiting(uw.iface.a_recharge_recharge, args, function(){
            var KEY = uw.dsConsts.RechargeData;
            var rechargeTemp = mo.getJSONWithFileNameAndID(uw.cfg_c_recharge, rechargeId);
            var diamond = rechargeTemp[uw.c_recharge_diamond];
            var first = rechargeTemp[uw.c_recharge_first];
            var extra = rechargeTemp[uw.c_recharge_extra];
            var count = self._data[KEY.countMap][rechargeId] || 0;
            var totalDiamond = diamond + (count > 0 ? extra : first); //计算上额外送的
            var oldVipLevel = uw.userDataCtrl.getVip();
            uw.userDataCtrl.increaseDiamond(totalDiamond); //添加钻石
            uw.userDataCtrl.addVipScore(diamond); //添加vip积分
            //检查是否开启常在商店
            var vip = uw.userDataCtrl.getVip();
            var preVip = vip ? vip - 1 : vip;
            var opened = mo.getJSONWithFileNameAndID(uw.cfg_c_vip, preVip)[uw.c_vip_isChapman];
            //之前没有开启过则弹出提示框
            if (!opened && uw.shopDataCtrl.secretShop1OffenIn()) {
                uw.shopDataCtrl.pushNotify(uw.shopDataCtrl.ON_SECRET_SHOP_APPEAR, 1);
            }
            self._data[KEY.countMap][rechargeId] = count + 1; //次数+1
            var isMonthCard = self.isMonthCard(rechargeId);
            if (isMonthCard) {
                if (!self._curCardRechargeId)
                    self._curCardRechargeId = rechargeId; //如果还未购买就设置为当前购买的id
                var now = Date.newDate();
                var endTime = now.clone();
                endTime.clearTime();
                //以前是直接加一个月，现在是加30天 for bug 726
                //endTime.addMonths(1);
                endTime.addDays(30);
                self._data[KEY.cardTimeMap][rechargeId] = [now, now, endTime];
                self._initCardInfo();
            }
            else {
                self.pushNotify(self.__class.ON_RECHARGED, diamond);
            }
            var obj = {};
            obj[uw.dsConsts.UseItemInfo.items] = {};
            obj[uw.dsConsts.UseItemInfo.items][uw.c_prop.spItemIdKey.diamond] = totalDiamond;
            uw.showGainTipsByDlg(obj, isMonthCard, "充值获得", function () {
                if (cb)
                    cb.call(target, true, oldVipLevel, diamond);
            }, self);
            //});
        };
        /**
         * 进行充值
         * @param rechargeId
         * @param cb
         * @param target
         * @returns {*}
         */
        __egretProto__.recharge = function (rechargeId, cb, target) {
            var channelInfo = channelCfg.getCurChannel();
            if (!channelInfo.isValidIAP) {
                return mo.showMsg(uw.id_c_msgCode.noOpenNow);
            }
            var self = this;
            var isMonthCard = self.isMonthCard(rechargeId);
            var rechargeTemp = mo.getJSONWithFileNameAndID(uw.cfg_c_recharge, rechargeId);
            var days = 0;
            if (isMonthCard && self._maxCardEndTime) {
                var now = Date.today();
                days = Math.ceil((self._maxCardEndTime.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)); //还有多少天到期
                if (days > 5)
                    return mo.showMsg(uw.id_c_msgCode.cantRenew); //无法续费
            }
            if (!isMonthCard || !self._curCardRechargeId || self._curCardRechargeId == rechargeId) {
                mo.showMsg(uw.id_c_msgCode.recharge, function () {
                    self._recharge(rechargeId, cb, target);
                });
            }
            else {
                mo.showMsg(uw.id_c_msgCode.renewAnother, rechargeTemp[uw.c_recharge_diamond], days, function () {
                    self._recharge(rechargeId, cb, target);
                }, self);
            }
        };
        __egretProto__.hasMonthCardRecharged = function (rechargeId) {
            return this._curCardRechargeId == rechargeId;
        };
        RechargeDataCtrl.__className = "RechargeDataCtrl";
        RechargeDataCtrl.ON_RECHARGED = "onRecharged";
        //通过服务器初始化数据
        RechargeDataCtrl.initByServer = function (cb, target) {
            mo.request(uw.iface.a_recharge_getInfo, function (data) {
                uw.rechargeDataCtrl = uw.RechargeDataCtrl.getInstance(data);
                if (cb)
                    cb.call(target);
            });
        };
        return RechargeDataCtrl;
    })(mo.DataController);
    uw.RechargeDataCtrl = RechargeDataCtrl;
    RechargeDataCtrl.prototype.__class__ = "uw.RechargeDataCtrl";
    uw.rechargeDataCtrl;
})(uw || (uw = {}));

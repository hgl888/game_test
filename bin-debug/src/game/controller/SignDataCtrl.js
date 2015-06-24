/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var SignDataCtrl = (function (_super) {
        __extends(SignDataCtrl, _super);
        function SignDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SignDataCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._signItems = {};
            var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
            self._refreshTime = c_game[uw.id_c_game.refreshTime][0];
        };
        /**
         * 获取当月的签到物品
         */
        __egretProto__.getSignItems = function () {
            var nowDate = Date.newDate();
            var month = nowDate.getMonth() + 1;
            if (this._signItems[month]) {
                return this._signItems[month];
            }
            var signItems = [];
            var c_sign = mo.getJSONWithFileName(uw.cfg_c_sign);
            var startIndex = month * 100 + 1;
            for (var i = startIndex; i < startIndex + 32; i++) {
                var locSignData = c_sign[i];
                if (!locSignData)
                    continue;
                signItems.push(locSignData);
            }
            this._signItems[month] = signItems;
            return signItems;
        };
        __egretProto__.getSignData = function () {
            var signData = uw.userDataCtrl.get(uw.dsConsts.UserEntity.sign) || [0, null];
            var signTime = signData[1];
            if (signTime && typeof signTime == "string") {
                signData[1] = Date.newDate(signTime);
            }
            return signData;
        };
        __egretProto__.setSignData = function (signData) {
            uw.userDataCtrl.set(uw.dsConsts.UserEntity.sign, signData);
        };
        /**
         * 获取签到次数
         */
        __egretProto__.getSignNum = function () {
            var signData = this.getSignData();
            var signNum = signData[0];
            var lastSignTime = signData[1];
            //未领取过
            if (!lastSignTime) {
                signNum = 0;
            }
            else {
                //如果签到不等于当前月,则认为没签到
                var now = Date.newDate();
                if (now.getMonth() != lastSignTime.getMonth()) {
                    signNum = 0;
                    lastSignTime = null;
                }
            }
            signData[0] = signNum;
            signData[1] = lastSignTime;
            uw.userDataCtrl.set(uw.dsConsts.UserEntity.sign, signData);
            return signNum;
        };
        /**
         * 增加签到一次
         */
        __egretProto__.addSignNum = function () {
            var signNum = this.getSignNum();
            signNum++;
            var signTime = Date.newDate();
            this.setSignData([signNum, signTime]);
        };
        /**
         * 获取今天是否已经签到
         * @returns {boolean}
         */
        __egretProto__.isTodaySigned = function () {
            var signData = this.getSignData();
            var lastSignTime = signData[1];
            if (!lastSignTime)
                return false;
            var gameDate = Date.newDate();
            return !this._checkCanSign(gameDate, lastSignTime);
        };
        /**
         *
         * @param nowDate
         * @param lastSignDate
         * @private
         */
        __egretProto__._checkCanSign = function (nowDate, lastSignDate) {
            var nextSignDate = nowDate.clone();
            //获取下一次签到时间
            if (lastSignDate.getHours() < this._refreshTime) {
                nextSignDate = lastSignDate.clone().clearTime().addHours(this._refreshTime);
            }
            else {
                nextSignDate = lastSignDate.clone().clearTime().addHours(this._refreshTime).addDays(1);
            }
            //如果当前时间大于下一次签到时间，可以签到
            if (nowDate >= nextSignDate) {
                return true;
            }
            return false;
        };
        /**
         * 签到
         * @param cb
         * @param target
         * @returns {*}
         */
        __egretProto__.sign = function (cb, target) {
            var self = this;
            if (self.isTodaySigned())
                return mo.showMsg("今日已经签到");
            mo.requestWaiting(uw.iface.a_user_sign, function (useItemInfo) {
                uw.userDataCtrl.handleUseItemInfo(useItemInfo); //进行结果保存
                uw.showGainTips(useItemInfo);
                self.addSignNum();
                if (cb)
                    return cb.call(target);
            });
        };
        SignDataCtrl.__className = "SignDataCtrl";
        return SignDataCtrl;
    })(mo.DataController);
    uw.SignDataCtrl = SignDataCtrl;
    SignDataCtrl.prototype.__class__ = "uw.SignDataCtrl";
    uw.signDataCtrl;
})(uw || (uw = {}));

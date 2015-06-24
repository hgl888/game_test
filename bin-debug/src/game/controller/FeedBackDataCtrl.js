/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var FeedBackDataCtrl = (function (_super) {
        __extends(FeedBackDataCtrl, _super);
        function FeedBackDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FeedBackDataCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._interval = 100000;
        };
        __egretProto__.init = function (data) {
            _super.prototype.init.call(this, data);
            if (!data)
                return;
            this._sensitiveArr = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.fuckWord)[0].split(",");
        };
        __egretProto__.getFeedbackList = function () {
            return this._data;
        };
        __egretProto__.send = function (content, cb, target) {
            var self = this;
            if (content == null || content == "") {
                return mo.showMsg(uw.id_c_msgCode.noWord);
            }
            else if (mo.getStringLength(content) > 200) {
                return mo.showMsg(uw.id_c_msgCode.wordsTooLong);
            }
            else if (mo.checkSensitiveWord(content, this._sensitiveArr)) {
                return mo.showMsg(uw.id_c_msgCode.illegalCharacte);
            }
            else {
                var args = {};
                args[uw.iface.a_feedback_feed_args.content] = content;
                mo.requestWaiting(uw.iface.a_feedback_feed, args, function (msgData) {
                    self._data.splice(0, 0, msgData);
                    cb.call(target, msgData);
                    mo.showMsg(uw.id_c_msgCode.sendFeedbackSucc);
                });
            }
        };
        __egretProto__.refresh = function (cb, target) {
            var self = this;
            if (!self._lastTime) {
                self._lastTime = Date.newDate().getTime();
            }
            else {
                if ((Date.newDate().getTime() - self._lastTime) < self._interval) {
                    if (cb) {
                        cb.call(target);
                    }
                    return;
                }
            }
            mo.request(uw.iface.a_feedback_getList, {}, function (data) {
                uw.feedBackDataCtrl.init(data);
                if (cb) {
                    cb.call(target);
                }
            });
        };
        FeedBackDataCtrl.__className = "FeedBackDataCtrl";
        /**
         * 通过服务端进行数据初始化
         * @param cb
         */
        FeedBackDataCtrl.initByServer = function (cb) {
            if (!uw.feedBackDataCtrl) {
                uw.feedBackDataCtrl = uw.FeedBackDataCtrl.getInstance();
            }
            uw.feedBackDataCtrl.refresh(cb);
        };
        return FeedBackDataCtrl;
    })(mo.DataController);
    uw.FeedBackDataCtrl = FeedBackDataCtrl;
    FeedBackDataCtrl.prototype.__class__ = "uw.FeedBackDataCtrl";
    uw.feedBackDataCtrl;
})(uw || (uw = {}));

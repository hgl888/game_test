/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var NoticeDataCtrl = (function (_super) {
        __extends(NoticeDataCtrl, _super);
        function NoticeDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = NoticeDataCtrl.prototype;
        /**
         * 获取服务器最新公告，serverId为0则取全服最新的公告
         * @param serverId
         * @param cb
         * @param target
         */
        __egretProto__.getNewOneByServerId = function (serverId, cb, target) {
            var self = this;
            var args = {};
            var argKeys = uw.iface.h_notice_getNewOneByServerId_args;
            args[argKeys.serverId] = serverId;
            mo.requestWaiting4Http(uw.iface.h_notice_getNewOneByServerId, args, function (noticeData) {
                if (cb)
                    return cb.call(target, noticeData);
            });
        };
        NoticeDataCtrl.__className = "NoticeDataCtrl";
        NoticeDataCtrl.initByServer = function () {
            uw.noticeDataCtrl = uw.NoticeDataCtrl.getInstance();
        };
        return NoticeDataCtrl;
    })(mo.DataController);
    uw.NoticeDataCtrl = NoticeDataCtrl;
    NoticeDataCtrl.prototype.__class__ = "uw.NoticeDataCtrl";
    uw.noticeDataCtrl;
})(uw || (uw = {}));

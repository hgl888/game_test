/**
 * Created by wander on 15-4-13.
 */
var nest;
(function (nest) {
    var user;
    (function (user) {
        function init(loginInfo, callback) {
            var data = { module: "user", action: "init" };
            nest.callRuntime(data, callback);
        }
        user.init = init;
        /**
         * 是否已登录
         * @param loginInfo
         * @param callback
         */
        function checkLogin(loginInfo, callback) {
            var data = { token: null, status: "-1" };
            callback(data);
        }
        user.checkLogin = checkLogin;
        /**
         * 调用渠道登录接口
         * @param loginInfo
         * @param callback
         */
        function login(loginInfo, callback) {
            var data = { module: "user", action: "login" };
            nest.callRuntime(data, callback);
        }
        user.login = login;
        /**
         *
         * @param callback 返回类型 LoginCallbackInfo
         */
        function isSupport(callback) {
            var data = { module: "user", action: "isSupport" };
            nest.callRuntime(data, callback);
        }
        user.isSupport = isSupport;
    })(user = nest.user || (nest.user = {}));
})(nest || (nest = {}));
var nest;
(function (nest) {
    var iap;
    (function (iap) {
        /**
         * 支付
         * @param orderInfo
         * @param callback
         */
        function pay(orderInfo, callback) {
            var data = { module: "iap", action: "pay", "param": orderInfo };
            nest.callRuntime(data, callback);
        }
        iap.pay = pay;
    })(iap = nest.iap || (nest.iap = {}));
})(nest || (nest = {}));
var nest;
(function (nest) {
    var share;
    (function (_share) {
        /**
         * 是否支持分享
         * @param callback
         */
        function isSupport(callback) {
            var data = { module: "share", action: "isSupport" };
            nest.callRuntime(data, callback);
        }
        _share.isSupport = isSupport;
        /**
         * 分享
         * @param shareInfo
         * @param callback
         */
        function share(shareInfo, callback) {
            var data = { module: "share", action: "share", "param": shareInfo };
            nest.callRuntime(data, callback);
        }
        _share.share = share;
    })(share = nest.share || (nest.share = {}));
})(nest || (nest = {}));
var nest;
(function (nest) {
    var social;
    (function (social) {
        function isSupport(callback) {
            var data = { module: "share", action: "isSupport" };
            nest.callRuntime(data, callback);
        }
        social.isSupport = isSupport;
    })(social = nest.social || (nest.social = {}));
})(nest || (nest = {}));
var nest;
(function (nest) {
    function callRuntime(data, callback) {
        var tag = "nest";
        egret.ExternalInterface.addCallback(tag, function (data) {
            console.log(data);
            var obj = JSON.parse(data);
            callback(obj.data);
        });
        egret.ExternalInterface.call(tag, JSON.stringify(data));
    }
    nest.callRuntime = callRuntime;
})(nest || (nest = {}));

/**
 * Created by wander on 15-4-13.
 */
var nest1;
(function (nest1) {
    var user;
    (function (user) {
        function init(callback) {
            var data = { module: "user", action: "init" };
            nest1.callRuntime(data, callback);
        }
        user.init = init;
    })(user = nest1.user || (nest1.user = {}));
})(nest1 || (nest1 = {}));
var nest1;
(function (nest1) {
    var iap;
    (function (iap) {
        function pay(callback) {
            var data = { module: "iap", action: "pay" };
            nest1.callRuntime(data, callback);
        }
        iap.pay = pay;
    })(iap = nest1.iap || (nest1.iap = {}));
})(nest1 || (nest1 = {}));
var nest1;
(function (nest1) {
    function callRuntime(data, callback) {
        var tag = "nest1";
        egret.ExternalInterface.addCallback(tag, function (data) {
            console.log(data);
            var obj = JSON.parse(data);
            callback(obj.data);
        });
        egret.ExternalInterface.call(tag, JSON.stringify(data));
    }
    nest1.callRuntime = callRuntime;
})(nest1 || (nest1 = {}));

/**
 * Created by SmallAiTT on 2015/3/21.
 */
var uw;
(function (uw) {
    function initGuideRevert() {
        var guideRevert = mo.guideRevert;
        //第一个副本战斗结束
        guideRevert["firstCopyEnd"] = function (mgr, arg) {
            var arr = arg.split(",");
            return uw.userDataCtrl.isCopyPassed(1) ? arr[0] : arr[1];
        };
        //如果已经拥有了战魂（兑换引导）
        guideRevert["exchg"] = function (mgr, arg) {
            var arr = arg.split(",");
            var itemId = arr[0];
            return uw.userDataCtrl.getItemNum(itemId) ? arr[1] : arr[2];
        };
    }
    uw.initGuideRevert = initGuideRevert;
})(uw || (uw = {}));

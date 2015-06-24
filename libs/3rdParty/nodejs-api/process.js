/**
 * 该api值保留了在h5端需要的几个接口而已
 */
var process;
(function (process) {
    /**
     * 下一个主循环执行一次。
     * 这个和nodejs不同的是，多了执行回调的上下文和传参。
     * @param cb
     * @param ctx
     */
    function nextTick(cb, ctx) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        egret.MainContext.instance.addEventListener(egret.Event.FINISH_RENDER, function () {
            egret.MainContext.instance.removeEventListener(egret.Event.FINISH_RENDER, arguments.callee, null);
            cb.apply(ctx, args);
        }, null);
    }
    process.nextTick = nextTick;
})(process || (process = {}));

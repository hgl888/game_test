var mo;
(function (mo) {
    var _setTimeoutIdCache = {};
    /**
     * 每帧都执行。
     * @param cb
     * @param ctx
     */
    function tick(cb, ctx) {
        egret.Ticker.getInstance().register(cb, ctx);
    }
    mo.tick = tick;
    /**
     * 移除每帧的执行函数。
     * @param cb
     * @param ctx
     */
    function clearTick(cb, ctx) {
        egret.Ticker.getInstance().unregister(cb, ctx);
    }
    mo.clearTick = clearTick;
    /**
     * 下一个主循环执行一次。
     * @deprecated
     * @param cb
     * @param ctx
     */
    function nextTick(cb, ctx) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        mo.warn("这个接口将被废弃，请使用`process.nextTick`接口！");
        process.nextTick.apply(process, arguments);
    }
    mo.nextTick = nextTick;
    /**
     * 在指定的延迟（以毫秒为单位）后运行指定的函数。
     * @method mo.setTimeout
     * @param cb {Function} 侦听函数
     * @param ctx {any} this对象
     * @param delay {number} 延迟时间，以毫秒为单位
     * @param ...args {any} 参数列表
     * @returns {number} 返回索引，可以用于 clearTimeout
     */
    function setTimeout(cb, ctx, delay) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var id = egret.setTimeout(function () {
            delete _setTimeoutIdCache[id];
            cb.apply(ctx, args);
        }, null, delay);
        _setTimeoutIdCache[id] = 1;
        return id;
    }
    mo.setTimeout = setTimeout;
    /**
     * 清除指定延迟后运行的函数。
     * @method mo.clearTimeout
     * @param key {number}
     */
    function clearTimeout(key) {
        delete _setTimeoutIdCache[key];
        egret.clearTimeout(key);
    }
    mo.clearTimeout = clearTimeout;
    function clearAllTimeout() {
        for (var key in _setTimeoutIdCache) {
            delete _setTimeoutIdCache[key];
            egret.clearTimeout(key);
        }
    }
    mo.clearAllTimeout = clearAllTimeout;
    //添加setInterval相关api。
    var _setIntervalIdCache = {};
    var _setIntervalId = 1;
    function setInterval(cb, ctx, interval) {
        var timer = new egret.Timer(interval);
        timer.addEventListener(egret.TimerEvent.TIMER, cb, ctx);
        var id = _setIntervalId++;
        _setIntervalIdCache[id] = { timer: timer, listener: cb, ctx: ctx };
        timer.start();
        return id;
    }
    mo.setInterval = setInterval;
    function clearInterval(key) {
        var setIntervalInfo = _setIntervalIdCache[key];
        delete _setIntervalIdCache[key];
        if (setIntervalInfo) {
            var timer = setIntervalInfo.timer;
            timer.removeEventListener(egret.TimerEvent.TIMER, setIntervalInfo.listener, setIntervalInfo.ctx);
            timer.stop();
        }
    }
    mo.clearInterval = clearInterval;
    function clearAllInterval() {
        for (var key in _setTimeoutIdCache) {
            var setIntervalInfo = _setIntervalIdCache[key];
            delete _setIntervalIdCache[key];
            if (setIntervalInfo) {
                var timer = setIntervalInfo.timer;
                timer.removeEventListener(egret.TimerEvent.TIMER, setIntervalInfo.listener, setIntervalInfo.ctx);
                timer.stop();
            }
        }
    }
    mo.clearAllInterval = clearAllInterval;
    mo._customStageGetter;
    function getStage() {
        if (mo._customStageGetter)
            return mo._customStageGetter();
        return egret.MainContext.instance.stage;
    }
    mo.getStage = getStage;
    function clearStage() {
        var stage = mo.getStage();
        stage.removeChildren();
        return stage;
    }
    mo.clearStage = clearStage;
    mo._actionMag;
    function runAction(action, target, paused) {
        if (!mo._actionMag) {
            mo._actionMag = new egret.action.Manager();
            tick(function (dt) {
                mo._actionMag.update(dt / 1000);
            });
        }
        mo._actionMag.addAction(action, target, paused);
    }
    mo.runAction = runAction;
})(mo || (mo = {}));

/**
 * Created by SmallAiTT on 2015/2/25.
 */
var tm;
(function (tm) {
    tm.log;
    tm.debug;
    tm.info;
    tm.warn;
    tm.error;
    logger.initLogger(tm, "tm");
    var _timeoutIdCounter = 1; //tickOutId计数器
    var _intervalIdCounter = 1; //tickInter
    var _timeoutMap = {}; //tickOut映射列表
    var _intervalMap = {}; //tickInterval映射列表
    var _inited = false; //是否已经初始化过了
    var _getArgs1 = function (cb, ctxOrDelay, delayOrArg0) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var tempCtx = ctxOrDelay, tempDelay = delayOrArg0, tempArgs = args;
        var l = arguments.length;
        if (typeof ctxOrDelay == "number") {
            tempCtx = null;
            tempDelay = ctxOrDelay;
            if (l > 2) {
                tempArgs.splice(0, 0, delayOrArg0);
            }
        }
        else if ((l == 2 && typeof ctxOrDelay != "number") || (l > 2 && typeof delayOrArg0 != "number")) {
            throw "参数有误";
        }
        return [cb, tempCtx, tempDelay, tempArgs];
    };
    /**
     * 这个api用于代替原生的setTimeout，并且加入了context和args的支持
     * @param cb
     * @param ctxOrDelay
     * @param delayOrArg0
     * @param args
     * @returns {number}
     */
    function setTimeout(cb, ctxOrDelay, delayOrArg0) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var id = _timeoutIdCounter++;
        var arr = _getArgs1.apply(null, arguments);
        var tempCtx = arr[1], tempDelay = arr[2], tempArgs = arr[3];
        if (tempDelay == 0) {
            cb.apply(tempCtx, tempArgs);
        }
        else {
            arr.push(0, true); //毫秒计数器、是否需要根据真实事件走
            _timeoutMap[id] = arr;
        }
        return id;
    }
    tm.setTimeout = setTimeout;
    /**
     * 这个是跟着tick走的。也就是说不是跟着真实时间走的。休眠时将停止，激活时根据上次停止处继续。
     * @param cb
     * @param ctxOrDelay
     * @param delayOrArg0
     * @param args
     * @returns {number}
     */
    function setTimeout4Tick(cb, ctxOrDelay, delayOrArg0) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var id = _timeoutIdCounter++;
        var arr = _getArgs1.apply(null, arguments);
        var tempCtx = arr[1], tempDelay = arr[2], tempArgs = arr[3];
        if (tempDelay == 0) {
            cb.apply(tempCtx, tempArgs);
        }
        else {
            arr.push(0, false); //毫秒计数器、是否需要根据真实事件走
            _timeoutMap[id] = arr;
        }
        return id;
    }
    tm.setTimeout4Tick = setTimeout4Tick;
    function clearTimeout(tickOutId) {
        delete _timeoutMap[tickOutId];
    }
    tm.clearTimeout = clearTimeout;
    function setInterval(cb, ctxOrDelay, intervalOrArg0) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var id = _intervalIdCounter++;
        var arr = _getArgs1.apply(null, arguments);
        var tempCtx = arr[1], tempDelay = arr[2], tempArgs = arr[3];
        if (tempDelay == 0) {
            cb.apply(tempCtx, tempArgs);
        }
        arr.push(0, true); //毫秒计数器、是否需要根据真实事件走
        _intervalMap[id] = arr;
        return id;
    }
    tm.setInterval = setInterval;
    function setInterval4Tick(cb, ctxOrDelay, intervalOrArg0) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var id = _intervalIdCounter++;
        var arr = _getArgs1.apply(null, arguments);
        var tempCtx = arr[1], tempDelay = arr[2], tempArgs = arr[3];
        if (tempDelay == 0) {
            cb.apply(tempCtx, tempArgs);
        }
        arr.push(0, false); //毫秒计数器、是否需要根据真实事件走
        _intervalMap[id] = arr;
        return id;
    }
    tm.setInterval4Tick = setInterval4Tick;
    function clearInterval(tickIntervalId) {
        delete _intervalMap[tickIntervalId];
    }
    tm.clearInterval = clearInterval;
    function init() {
        if (_inited)
            return;
        _inited = true;
        //++++++++++++++++++++++++++注册主循环 开始+++++++++++++++++
        //写在这里的目的是直接放在闭包内部，一是确保只会有一个主循环，二是减少tm下的挂接数量。
        egret.Ticker.getInstance().register(function (ms) {
            var timeoutMap = _timeoutMap;
            for (var timeoutId in timeoutMap) {
                var arr = timeoutMap[timeoutId];
                var cb = arr[0], ctx = arr[1], delay = arr[2], args = arr[3], sumMs = arr[4] + ms;
                if (sumMs >= delay) {
                    cb.apply(ctx, args);
                    delete timeoutMap[timeoutId];
                }
                else {
                    arr[4] = sumMs;
                }
            }
            var intervalMap = _intervalMap;
            for (var intervalId in intervalMap) {
                var arr = intervalMap[intervalId];
                var cb = arr[0], ctx = arr[1], interval = arr[2] || 1, args = arr[3], sumMs = arr[4] + ms;
                var leftMs = sumMs - interval;
                if (leftMs >= 0) {
                    while (leftMs >= 0) {
                        cb.apply(ctx, args);
                        leftMs -= interval;
                    }
                    arr[4] = leftMs + interval; //设置成残余的毫秒数
                }
                else {
                    arr[4] = sumMs;
                }
            }
        }, tm);
        //++++++++++++++++++++++++++注册主循环 结束+++++++++++++++++
        //+++++++++++++++++++++++游戏激活与否相关监听 开始+++++++++++
        var stage = egret.MainContext.instance.stage;
        var obj = {
            deactivateTime: 0
        };
        stage.addEventListener(egret.Event.DEACTIVATE, function () {
            this.deactivateTime = egret.getTimer();
        }, obj);
        stage.addEventListener(egret.Event.ACTIVATE, function () {
            var ms = egret.getTimer() - this.deactivateTime;
            tm.debug("休眠了 %d 毫秒", ms);
            var timeoutMap = _timeoutMap, execArr = [];
            for (var timeoutId in timeoutMap) {
                var arr = timeoutMap[timeoutId];
                var cb = arr[0], ctx = arr[1], delay = arr[2], args = arr[3], sumMs = arr[4] + ms, follow = arr[5];
                if (!follow)
                    continue; //不跟着真实时间走，而是跟着主循环走
                if (sumMs >= delay) {
                    //回调、上下文、延迟、传参、顺序比较用的毫秒数、类型、id
                    execArr.push([cb, ctx, delay, args, delay - arr[4], 1, timeoutId]); //先保存到数组
                }
                else {
                    arr[4] = sumMs;
                }
            }
            var intervalMap = _intervalMap;
            for (var intervalId in intervalMap) {
                var arr = intervalMap[intervalId];
                var cb = arr[0], ctx = arr[1], interval = arr[2] || 1, args = arr[3], follow = arr[5];
                if (!follow)
                    continue; //不跟着真实时间走，而是跟着主循环走
                var lastLeftMs = interval - arr[4]; //上一次剩余多久就可以继续执行回调
                if (lastLeftMs <= ms) {
                    while (lastLeftMs <= ms) {
                        //回调、上下文、延迟、传参、顺序比较用的毫秒数、类型、id
                        execArr.push([cb, ctx, delay, args, lastLeftMs, 2, intervalId]); //先保存到数组
                        lastLeftMs += interval; //如果为0就弄成1毫秒一次
                    }
                    arr[4] = lastLeftMs - interval; //设置成残余的毫秒数
                }
                else {
                    arr[4] += ms; //设置成残余的毫秒数
                }
            }
            //对执行列表进行升序排序
            execArr.sort(function (arr1, arr2) {
                var c1 = arr1[4], c2 = arr2[4];
                if (c1 > c2)
                    return 1;
                else if (c1 == c2)
                    return 0;
                else
                    return -1;
            });
            for (var i = 0, l_i = execArr.length; i < l_i; i++) {
                var arr = execArr[i];
                var cb = arr[0], ctx = arr[1], delay = arr[2], args = arr[3], type = arr[5], id = arr[6];
                if (type == 1) {
                    if (!_timeoutMap[id]) {
                        continue;
                    }
                    else {
                        delete _timeoutMap[id]; //进行移除
                    }
                }
                else {
                    if (!_intervalMap[id]) {
                        continue;
                    }
                }
                cb.apply(ctx, args);
            }
        }, obj);
        //+++++++++++++++++++++++游戏激活与否相关监听 结束+++++++++++
    }
    tm.init = init;
})(tm || (tm = {}));

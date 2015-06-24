/**
 * Created by 晋 on 2015/2/12.
 */
var createjs;
(function (createjs) {
    /**时钟管理器[同一函数多次计时，默认会被后者覆盖,delay小于1会立即执行]*/
    var TimerManager = (function () {
        function TimerManager() {
            this._pool = new Array();
            this._handlers = new Object();
            this._currTimer = 0;
            this._currFrame = 0;
            this._count = 0;
            this._index = 0;
            this._currTimer = egret.getTimer();
        }
        TimerManager.prototype.update = function () {
            this._currFrame++;
            this._currTimer = egret.getTimer();
            for (var key in this._handlers) {
                var handler = this._handlers[key];
                var t = handler.userFrame ? this._currFrame : this._currTimer;
                if (t >= handler.exeTime) {
                    var method = handler.method;
                    var args = handler.args;
                    var thisObj = handler.thisObj;
                    if (handler.repeat) {
                        while (t >= handler.exeTime) {
                            handler.exeTime += handler.delay;
                            method.apply(thisObj, args);
                        }
                    }
                    else {
                        this.clearTimer(key);
                        method.apply(thisObj, args);
                    }
                }
            }
        };
        TimerManager.prototype.create = function (useFrame, repeat, delay, method, args, thisObj, cover) {
            if (args === void 0) { args = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (cover === void 0) { cover = true; }
            var key;
            if (cover) {
                //先删除相同函数的计时
                this.clearTimer(method);
                key = method;
            }
            else {
                key = this._index++;
            }
            //如果执行时间小于1，直接执行
            if (delay < 1) {
                method.apply(null, args);
                return -1;
            }
            var handler = this._pool.length > 0 ? this._pool.pop() : new TimerHandler();
            handler.userFrame = useFrame;
            handler.repeat = repeat;
            handler.delay = delay;
            handler.method = method;
            handler.args = args;
            handler.thisObj = thisObj;
            handler.exeTime = delay + (useFrame ? this._currFrame : this._currTimer);
            this._handlers[key] = handler;
            this._count++;
            return key;
        };
        /**定时执行一次
         * @param	delay  延迟时间(单位毫秒)
         * @param	method 结束时的回调方法
         * @param	thisObj 函数指向的thisObj
         * @param	args   回调参数
         * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
         * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
        TimerManager.prototype.doOnce = function (delay, method, args, thisObj, cover) {
            if (args === void 0) { args = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (cover === void 0) { cover = true; }
            return this.create(false, false, delay, method, args, thisObj, cover);
        };
        /**定时重复执行
         * @param	delay  延迟时间(单位毫秒)
         * @param	method 结束时的回调方法
         * @param	thisObj 函数指向的thisObj
         * @param	args   回调参数
         * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
         * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
        TimerManager.prototype.doLoop = function (delay, method, args, thisObj, cover) {
            if (args === void 0) { args = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (cover === void 0) { cover = true; }
            return this.create(false, true, delay, method, args, thisObj, cover);
        };
        /**定时执行一次(基于帧率)
         * @param	delay  延迟时间(单位为帧)
         * @param	method 结束时的回调方法
         * @param	args   回调参数
         * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
         * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
        TimerManager.prototype.doFrameOnce = function (delay, method, args, thisObj, cover) {
            if (args === void 0) { args = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (cover === void 0) { cover = true; }
            return this.create(true, false, delay, method, args, thisObj, cover);
        };
        /**定时重复执行(基于帧率)
         * @param	delay  延迟时间(单位为帧)
         * @param	method 结束时的回调方法
         * @param	args   回调参数
         * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
         * @return  cover=true时返回回调函数本身，否则返回唯一ID，均用来作为clearTimer的参数*/
        TimerManager.prototype.doFrameLoop = function (delay, method, args, thisObj, cover) {
            if (args === void 0) { args = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (cover === void 0) { cover = true; }
            return this.create(true, true, delay, method, args, thisObj, cover);
        };
        Object.defineProperty(TimerManager.prototype, "count", {
            /**定时器执行数量*/
            get: function () {
                return this._count;
            },
            enumerable: true,
            configurable: true
        });
        /**清理定时器
         * @param	method 创建时的cover=true时method为回调函数本身，否则method为返回的唯一ID
         */
        TimerManager.prototype.clearTimer = function (method) {
            var handler = this._handlers[method];
            if (handler != null) {
                delete this._handlers[method];
                handler.clear();
                this._pool.push(handler);
                this._count--;
            }
        };
        return TimerManager;
    })();
    createjs.TimerManager = TimerManager;
    TimerManager.prototype.__class__ = "createjs.TimerManager";
})(createjs || (createjs = {}));
/**定时处理器*/
var TimerHandler = (function () {
    function TimerHandler() {
    }
    /**清理*/
    TimerHandler.prototype.clear = function () {
        this.method = null;
        this.args = null;
        this.thisObj = null;
    };
    return TimerHandler;
})();
TimerHandler.prototype.__class__ = "TimerHandler";

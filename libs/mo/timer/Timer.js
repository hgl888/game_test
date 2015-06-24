var mo;
(function (mo) {
    var Timer = (function (_super) {
        __extends(Timer, _super);
        function Timer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = Timer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._invocations = [];
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
        };
        __egretProto__._reset = function (up) {
            if (this._invocations.length == 0) {
                if (up)
                    mo.tick(this._update, this);
                else
                    mo.clearTick(this._update, this);
            }
        };
        __egretProto__.clear = function () {
            this._invocations.length = 0;
            this._reset(true);
        };
        __egretProto__._update = function (dt) {
            this._reset(false);
            for (var i = 0, arr = this._invocations, li = arr.length; i < li; ++i) {
                if (arr[i]) {
                    arr[i].invoke(dt);
                } //以毫秒计数
            }
            for (var i = 0, arr = this._invocations; i < arr.length;) {
                if (!arr[i]) {
                    arr.splice(i, 1);
                }
                else {
                    ++i;
                }
            }
        };
        __egretProto__.setInvocation = function (invocation) {
            invocation.invokeFirst(0); //临时解决方式，以后再寻求更好的
            this._reset(true);
            this._invocations.push(invocation);
            return invocation;
        };
        /**
         * 设置interval类型触发器
         * @param callback
         * @param target
         * @returns {callback}
         */
        __egretProto__.setInterval = function (callback, target) {
            var invocation = mo.Invocation.create(callback, target);
            return this.setInvocation(invocation);
        };
        /**
         * 设置倒计时类型触发器
         * @param {Number} millisecond   倒计时的毫秒数
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} endCallback   倒计时结束的回调
         * @param {Object|null} endTarget       倒计时结束的回调函数的上下文
         * @returns {CountdownInvocation}
         */
        __egretProto__.countdown = function (millisecond, callback, target, endCallback, endTarget) {
            var invocation = mo.CountdownInvocation.create(millisecond, callback, target, endCallback, endTarget);
            return this.setInvocation(invocation);
        };
        /**
         * 倒计时到某个时间点的触发器
         * @param {Date|Number} endTime 结束的时间点。如果是Number类型，则表示时间戳。
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} endCallback   倒计时结束的回调
         * @param {Object|null} endTarget       倒计时结束的回调函数的上下文
         * @returns {CountdownInvocation}
         */
        __egretProto__.countdownToEndTime = function (endTime, callback, target, endCallback, endTarget) {
            endTime = endTime instanceof Date ? endTime.getTime() : endTime;
            var leftTime = Math.floor((endTime - (Date.newDate()).getTime()));
            return this.countdown(leftTime, callback, target, endCallback, endTarget);
        };
        /**
         * 循环方式的倒数计时。自动根据结束时间点算出循环次数。
         * @param {Date|Number} endTime 结束的时间点。如果是Number类型，则表示时间戳。
         * @param {Number} interval  每次循环的时间间隔
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} intervalCallback  每次循环结束的回调
         * @param {Object|null} intervalTarget  每次循环结束的回调函数的上下文
         * @param {Function|null} endCallback   总倒计时结束的回调
         * @param {Object|null} endTarget   总倒计时结束的回调函数的上下文
         * @returns {LoopCountdownToEndTimeInvocation}
         */
        __egretProto__.countdownLoopToEndTime = function (endTime, interval, callback, target, intervalCallback, intervalTarget, endCallback, endTarget) {
            var invocation = mo.LoopCountdownToEndTimeInvocation.create(endTime, interval, callback, target, intervalCallback, intervalTarget, endCallback, endTarget);
            return this.setInvocation(invocation);
        };
        /**
         * 具有时间区间段的setTimeout，针对毫秒：
         mo.timer.setLimitTimeout(5000, 10000, function(){
            cc.log(arguments);
        });
         * @param leftTime4Begin
         * @param leftTime4End
         * @param limitCallback
         * @param limitTarget
         * @returns {mo.LimitTimeoutInvocation}
         */
        __egretProto__.setLimitTimeout = function (leftTime4Begin, leftTime4End, limitCallback, limitTarget) {
            var invocation = mo.LimitTimeoutInvocation.create.apply(mo.LimitTimeoutInvocation, arguments);
            return this.setInvocation(invocation);
        };
        /**
         * 具有时间区间段的setTimeout，针对小时：
         mo.timer.setHourLimitTimeout(16, 17, function(){
            cc.log(arguments);
        });
         * @param beginHour
         * @param endHour
         * @param limitCallback
         * @param limitTarget
         * @returns {mo.LimitTimeoutInvocation}
         */
        __egretProto__.setHourLimitTimeout = function (beginHour, endHour, limitCallback, limitTarget) {
            var now = Date.now();
            var beginTime = mo.getTimeOfToday(beginHour + ":00").getTime();
            var endTime = mo.getTimeOfToday(endHour + ":00").getTime();
            var leftTime4Begin = beginTime - now;
            var leftTime4End = endTime - now;
            return this.setLimitTimeout(leftTime4Begin, leftTime4End, limitCallback, limitTarget);
        };
        /**
         * 移除invocation
         * @param invocation
         */
        __egretProto__.removeInvocation = function (invocation) {
            for (var i = 0, arr = this._invocations, li = arr.length; i < li; ++i) {
                if (arr[i] == invocation) {
                    arr[i] = null;
                }
            }
        };
        /**
         * 移除invocation
         * @param callback
         * @param target
         */
        __egretProto__.removeInvocationByCallback = function (callback, target) {
            for (var i = 0, arr = this._invocations, li = arr.length; i < li; ++i) {
                if (arr[i].equals(callback, target)) {
                    arr[i] = null;
                }
            }
        };
        Timer.__className = "Timer";
        return Timer;
    })(mo.Class);
    mo.Timer = Timer;
    Timer.prototype.__class__ = "mo.Timer";
    mo.timer = new Timer();
})(mo || (mo = {}));

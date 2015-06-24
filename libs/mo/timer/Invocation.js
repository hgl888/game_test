var mo;
(function (mo) {
    var Invocation = (function (_super) {
        __extends(Invocation, _super);
        function Invocation() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = Invocation.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
        };
        __egretProto__.invokeFirst = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (this._callback) {
                this._callback.apply(this._target, arguments);
            }
        };
        __egretProto__.invoke = function (dt) {
            if (this._callback) {
                this._callback.apply(this._target, arguments);
            }
        };
        __egretProto__.equals = function (callback, target) {
            return (callback && callback == this._callback && this._target == target);
        };
        Invocation.__className = "Invocation";
        return Invocation;
    })(mo.Class);
    mo.Invocation = Invocation;
    Invocation.prototype.__class__ = "mo.Invocation";
})(mo || (mo = {}));
var mo;
(function (mo) {
    var CountdownInvocation = (function (_super) {
        __extends(CountdownInvocation, _super);
        function CountdownInvocation() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = CountdownInvocation.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._countdownTime = 0;
            self._leftTime = 0;
        };
        //@override
        __egretProto__.init = function (leftTime, callback, target, endCallback, endTarget) {
            var args = [];
            for (var _i = 5; _i < arguments.length; _i++) {
                args[_i - 5] = arguments[_i];
            }
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self._countdownTime = self._leftTime = leftTime;
            self._callback = callback;
            self._target = target;
            self._endCallback = endCallback;
            self._endTarget = endTarget;
        };
        __egretProto__.invokeFirst = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (this._callback) {
                this._callback.call(this._target, Math.round(this._leftTime));
            }
        };
        __egretProto__.invoke = function (dt) {
            var self = this;
            self._leftTime -= dt;
            if (self._callback) {
                self._callback.call(self._target, Math.round(self._leftTime));
            }
            if (self._leftTime <= 0) {
                mo.timer.removeInvocation(self);
                if (self._endCallback) {
                    self._endCallback.call(self._endTarget, self._leftTime);
                }
            }
        };
        CountdownInvocation.__className = "CountdownInvocation";
        return CountdownInvocation;
    })(mo.Invocation);
    mo.CountdownInvocation = CountdownInvocation;
    CountdownInvocation.prototype.__class__ = "mo.CountdownInvocation";
    var LoopCountdownToEndTimeInvocation = (function (_super) {
        __extends(LoopCountdownToEndTimeInvocation, _super);
        function LoopCountdownToEndTimeInvocation() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = LoopCountdownToEndTimeInvocation.prototype;
        //@override
        __egretProto__.init = function (endTime, interval, callback, target, intervalCallback, intervalTarget, endCallback, endTarget) {
            var args = [];
            for (var _i = 8; _i < arguments.length; _i++) {
                args[_i - 8] = arguments[_i];
            }
            var self = this;
            _super.prototype.init.apply(self, arguments);
            var nowTime = (Date.newDate()).getTime();
            var totalLeftTime = (endTime - nowTime); //endTime单位为毫秒
            self._count = Math.floor(totalLeftTime / interval); //interval单位为毫秒
            self._leftTime = Math.floor(totalLeftTime % interval); //_leftTime单位为秒
            //        mo.debug("init--->", endTime, nowTime, totalLeftTime, self._count, self._leftTime);
            if (self._leftTime == 0) {
                self._count -= 1;
                self._leftTime = interval;
            }
            self._interval = interval;
            self._callback = callback;
            self._target = target;
            self._intervalCallback = intervalCallback;
            self._intervalTarget = intervalTarget;
            self._endCallback = endCallback;
            self._endTarget = endTarget;
        };
        __egretProto__.invokeFirst = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (this._callback) {
                this._callback.call(this._target, Math.round(this._leftTime));
            }
        };
        __egretProto__.invoke = function (dt) {
            var self = this;
            self._leftTime -= dt;
            if (self._callback) {
                self._callback.call(self._target, Math.round(self._leftTime));
            }
            if (self._leftTime <= 0) {
                if (self._intervalCallback) {
                    self._intervalCallback.call(self._intervalTarget, self._leftTime, self._interval);
                }
                --self._count;
                if (self._count <= 0) {
                    mo.timer.removeInvocation(self);
                    if (self._endCallback) {
                        self._endCallback.call(self._endTarget, self._leftTime);
                    }
                }
                self._leftTime += self._interval; //累加上计时间隔
            }
        };
        LoopCountdownToEndTimeInvocation.__className = "LoopCountdownToEndTimeInvocation";
        return LoopCountdownToEndTimeInvocation;
    })(mo.Invocation);
    mo.LoopCountdownToEndTimeInvocation = LoopCountdownToEndTimeInvocation;
    LoopCountdownToEndTimeInvocation.prototype.__class__ = "mo.LoopCountdownToEndTimeInvocation";
    var LimitTimeoutInvocation = (function (_super) {
        __extends(LimitTimeoutInvocation, _super);
        function LimitTimeoutInvocation() {
            _super.apply(this, arguments);
            this.LIMIT_BEGINNING = 0;
            this.LIMIT_BEGAN = 1;
            this.LIMIT_ENDED = 2;
        }
        var __egretProto__ = LimitTimeoutInvocation.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._countdownTime4Begin = 0;
            self._countdownTime4End = 0;
            self._leftTime4Begin = 0;
            self._leftTime4End = 0;
            self._state = 0;
        };
        //@override
        __egretProto__.init = function (leftTime4Begin, leftTime4End, limitCallback, limitTarget) {
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            var self = this;
            _super.prototype.init.apply(self, arguments);
            if (leftTime4Begin > leftTime4End) {
                return mo.error("LimitTimeoutInvocation的参数有误，【%s】不能大于【%s】", leftTime4Begin, leftTime4End);
            }
            self._state = self.LIMIT_BEGINNING;
            self._countdownTime4Begin = self._leftTime4Begin = leftTime4Begin;
            self._countdownTime4End = self._leftTime4End = leftTime4End;
            if (self._countdownTime4End <= 0) {
                self._state = self.LIMIT_ENDED;
            }
            else if (self._countdownTime4Begin <= 0) {
                self._state = self.LIMIT_BEGAN;
            }
            self._limitCallback = limitCallback;
            self._limitTarget = limitTarget;
        };
        __egretProto__.invoke = function (dt) {
            var self = this;
            var oldState = self._state;
            self._countdownTime4Begin -= dt;
            self._countdownTime4End -= dt;
            //        mo.debug("invoke------->", self._countdownTime4Begin, self._countdownTime4End);
            if (self._countdownTime4End <= 0) {
                self._state = self.LIMIT_ENDED;
            }
            else if (self._countdownTime4Begin <= 0) {
                self._state = self.LIMIT_BEGAN;
            }
            if (oldState != self._state) {
                if (self._limitCallback) {
                    self._limitCallback.call(self._limitTarget, self._state);
                }
            }
            if (self._state == self.LIMIT_ENDED) {
                mo.timer.removeInvocation(self);
            }
        };
        LimitTimeoutInvocation.__className = "LimitTimeoutInvocation";
        return LimitTimeoutInvocation;
    })(mo.Invocation);
    mo.LimitTimeoutInvocation = LimitTimeoutInvocation;
    LimitTimeoutInvocation.prototype.__class__ = "mo.LimitTimeoutInvocation";
})(mo || (mo = {}));

/**
 * Created by wander on 14-12-22.
 */
var egret;
(function (egret) {
    var action;
    (function (_action) {
        var FLT_EPSILON = 0.0000001192092896;
        var ActionInterval = (function (_super) {
            __extends(ActionInterval, _super);
            function ActionInterval() {
                _super.call(this);
                this._speed = 1;
                this._times = 1;
                this._repeatForever = false;
                this.MAX_VALUE = 2;
                this._repeatMethod = false; //Compatible with repeat class, Discard after can be deleted
                this._speedMethod = false; //Compatible with repeat class, Discard after can be deleted
            }
            var __egretProto__ = ActionInterval.prototype;
            /**
             * Initializes the action.
             * @param {Number} d duration in seconds
             * @return {Boolean}
             */
            __egretProto__.initWithDuration = function (d) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                this._duration = (d === 0) ? FLT_EPSILON : d;
                // prevent division by 0
                // This comparison could be in step:, but it might decrease the performance
                // by 3% in heavy based action games.
                this._elapsed = 0;
                this._firstTick = true;
                return true;
            };
            /**
             * Returns true if the action has finished.
             * @return {Boolean}
             */
            __egretProto__.isDone = function () {
                return (this._elapsed >= this._duration);
            };
            /**
             * called every frame with it's delta time. <br />
             * DON'T override unless you know what you are doing.
             *
             * @param {Number} dt
             */
            __egretProto__.step = function (dt) {
                if (this._firstTick) {
                    this._firstTick = false;
                    this._elapsed = 0;
                }
                else
                    this._elapsed += dt;
                //this.update((1 > (this._elapsed / this._duration)) ? this._elapsed / this._duration : 1);
                //this.update(Math.max(0, Math.min(1, this._elapsed / Math.max(this._duration, cc.FLT_EPSILON))));
                var t = this._elapsed / (this._duration > 0.0000001192092896 ? this._duration : 0.0000001192092896);
                t = (1 > t ? t : 1);
                this.update(t > 0 ? t : 0);
                //Compatible with repeat class, Discard after can be deleted (this._repeatMethod)
                if (this._repeatMethod && this._times > 1 && this.isDone()) {
                    if (!this._repeatForever) {
                        this._times--;
                    }
                    //var diff = locInnerAction.getElapsed() - locInnerAction._duration;
                    this.startWithTarget(this.target);
                    // to prevent jerk. issue #390 ,1247
                    //this._innerAction.step(0);
                    //this._innerAction.step(diff);
                    this.step(this._elapsed - this._duration);
                }
            };
            //public update(dt):any{
            //    var time = dt;
            //    if (this._easeFunction) {
            //        time = this._easeFunction(dt);
            //    }
            //    return time;
            //}
            __egretProto__.performEase = function (time) {
                var t = time;
                if (this._easeFunction) {
                    t = this._easeFunction(time);
                }
                return t;
            };
            /**
             * @return {Null}
             */
            __egretProto__.reverse = function () {
                console.warn("cc.IntervalAction: reverse not implemented.");
                return null;
            };
            return ActionInterval;
        })(_action.FiniteTimeAction);
        _action.ActionInterval = ActionInterval;
        ActionInterval.prototype.__class__ = "egret.action.ActionInterval";
        var DelayTime = (function (_super) {
            __extends(DelayTime, _super);
            function DelayTime() {
                _super.apply(this, arguments);
            }
            var __egretProto__ = DelayTime.prototype;
            __egretProto__.update = function (dt) {
            };
            __egretProto__.clone = function () {
                var action = new DelayTime();
                action.initWithDuration(this._duration);
                return action;
            };
            DelayTime.create = function (d) {
                var action = new DelayTime();
                action.initWithDuration(d);
                return action;
            };
            return DelayTime;
        })(ActionInterval);
        _action.DelayTime = DelayTime;
        DelayTime.prototype.__class__ = "egret.action.DelayTime";
        var Sequence = (function (_super) {
            __extends(Sequence, _super);
            function Sequence(tempArray) {
                _super.call(this);
                this._actions = [];
                var paramArray = (tempArray instanceof Array) ? tempArray : arguments;
                var last = paramArray.length - 1;
                if ((last >= 0) && (paramArray[last] == null))
                    console.log("parameters should not be ending with null in Javascript");
                if (last >= 0) {
                    var prev = paramArray[0], action1;
                    for (var i = 1; i < last; i++) {
                        if (paramArray[i]) {
                            action1 = prev;
                            prev = Sequence._actionOneTwo(action1, paramArray[i]);
                        }
                    }
                    this.initWithTwoActions(prev, paramArray[last]);
                }
            }
            var __egretProto__ = Sequence.prototype;
            __egretProto__.update = function (dt) {
                //            dt = this._computeEaseTime(dt);todo
                var new_t, found = 0;
                var locSplit = this._split, locActions = this._actions, locLast = this._last;
                if (dt < locSplit) {
                    // action[0]
                    new_t = (locSplit !== 0) ? dt / locSplit : 1;
                    if (found === 0 && locLast === 1) {
                        // Reverse mode ?
                        // XXX: Bug. this case doesn't contemplate when _last==-1, found=0 and in "reverse mode"
                        // since it will require a hack to know if an action is on reverse mode or not.
                        // "step" should be overriden, and the "reverseMode" value propagated to inner Sequences.
                        locActions[1].update(0);
                        locActions[1].stop();
                    }
                }
                else {
                    // action[1]
                    found = 1;
                    new_t = (locSplit === 1) ? 1 : (dt - locSplit) / (1 - locSplit);
                    if (locLast === -1) {
                        // action[0] was skipped, execute it.
                        locActions[0].startWithTarget(this.target);
                        locActions[0].update(1);
                        locActions[0].stop();
                    }
                    if (!locLast) {
                        // switching to action 1. stop action 0.
                        locActions[0].update(1);
                        locActions[0].stop();
                    }
                }
                // Last action found and it is done.
                if (locLast === found && locActions[found].isDone())
                    return;
                // Last action found and it is done
                if (locLast !== found)
                    locActions[found].startWithTarget(this.target);
                locActions[found].update(new_t);
                this._last = found;
            };
            /** initializes the Spawn action with the 2 actions to spawn
             * @param {cc.FiniteTimeAction} action1
             * @param {cc.FiniteTimeAction} action2
             * @return {Boolean}
             */
            __egretProto__.initWithTwoActions = function (actionOne, actionTwo) {
                if (!actionOne || !actionTwo)
                    throw "cc.Sequence.initWithTwoActions(): arguments must all be non nil";
                var d = actionOne._duration + actionTwo._duration;
                this.initWithDuration(d);
                this._actions[0] = actionOne;
                this._actions[1] = actionTwo;
                return true;
            };
            /**
             * @param {cc.Node} target
             */
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
                this._split = this._actions[0].getDuration() / this._duration;
                this._last = -1;
            };
            /**
             * stop the action.
             */
            __egretProto__.stop = function () {
                // Issue #1305
                if (this._last !== -1) {
                    this._actions[this._last].stop();
                }
                _super.prototype.stop.call(this);
            };
            __egretProto__.clone = function () {
                var action = new Sequence();
                action.initWithTwoActions(this._actions[0].clone(), this._actions[1].clone());
                return action;
            };
            /**
             * @return {cc.ActionInterval}
             */
            __egretProto__.reverse = function () {
                return Sequence._actionOneTwo(this._actions[1].reverse(), this._actions[0].reverse());
            };
            Sequence._actionOneTwo = function (actionOne, actionTwo) {
                var sequence = new Sequence();
                sequence.initWithTwoActions(actionOne, actionTwo);
                return sequence;
            };
            Sequence.create = function () {
                var actions = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    actions[_i - 0] = arguments[_i];
                }
                var paramArray = actions;
                if ((paramArray.length > 0) && (paramArray[paramArray.length - 1] == null))
                    console.log("parameters should not be ending with null in Javascript");
                var prev = paramArray[0];
                for (var i = 1; i < paramArray.length; i++) {
                    if (paramArray[i])
                        prev = Sequence._actionOneTwo(prev, paramArray[i]);
                }
                return prev;
            };
            return Sequence;
        })(ActionInterval);
        _action.Sequence = Sequence;
        Sequence.prototype.__class__ = "egret.action.Sequence";
        var Spawn = (function (_super) {
            __extends(Spawn, _super);
            function Spawn() {
                _super.call(this);
                this._one = null;
                this._two = null;
            }
            var __egretProto__ = Spawn.prototype;
            /** initializes the Spawn action with the 2 actions to spawn
             * @param {cc.FiniteTimeAction} action1
             * @param {cc.FiniteTimeAction} action2
             * @return {Boolean}
             */
            __egretProto__.initWithTwoActions = function (action1, action2) {
                if (!action1 || !action2)
                    throw "cc.Spawn.initWithTwoActions(): arguments must all be non null";
                var ret = false;
                var d1 = action1.getDuration();
                var d2 = action2.getDuration();
                if (this.initWithDuration(Math.max(d1, d2))) {
                    this._one = action1;
                    this._two = action2;
                    if (d1 > d2) {
                        this._two = Sequence._actionOneTwo(action2, DelayTime.create(d1 - d2));
                    }
                    else if (d1 < d2) {
                        this._one = Sequence._actionOneTwo(action1, DelayTime.create(d2 - d1));
                    }
                    ret = true;
                }
                return ret;
            };
            /**
             * @param {cc.Node} target
             */
            __egretProto__.startWithTarget = function (target) {
                ActionInterval.prototype.startWithTarget.call(this, target);
                this._one.startWithTarget(target);
                this._two.startWithTarget(target);
            };
            /**
             * Stop the action
             */
            __egretProto__.stop = function () {
                this._one.stop();
                this._two.stop();
                _super.prototype.stop.call(this);
            };
            /**
             * @param {Number} time time in seconds
             */
            __egretProto__.update = function (time) {
                if (this._one)
                    this._one.update(time);
                if (this._two)
                    this._two.update(time);
            };
            __egretProto__.clone = function () {
                var action = new Spawn();
                action.initWithTwoActions(this._one.clone(), this._two.clone());
                return action;
            };
            Spawn.create = function () {
                var actions = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    actions[_i - 0] = arguments[_i];
                }
                var paramArray = actions;
                if ((paramArray.length > 0) && (paramArray[paramArray.length - 1] == null))
                    console.log("parameters should not be ending with null in Javascript");
                var prev = paramArray[0];
                for (var i = 1; i < paramArray.length; i++) {
                    if (paramArray[i] != null) {
                        var spawn = new Spawn();
                        spawn.initWithTwoActions(prev, paramArray[i]);
                        prev = spawn;
                    }
                }
                return prev;
            };
            return Spawn;
        })(ActionInterval);
        _action.Spawn = Spawn;
        Spawn.prototype.__class__ = "egret.action.Spawn";
        var Repeat = (function (_super) {
            __extends(Repeat, _super);
            function Repeat() {
                _super.call(this);
                this._repeatTimes = 0;
                this._total = 0;
                this._nextDt = 0;
                this._actionInstant = false;
                this._innerAction = null;
            }
            var __egretProto__ = Repeat.prototype;
            /**
             * @param {cc.FiniteTimeAction} action
             * @param {Number} times
             * @return {Boolean}
             */
            __egretProto__.initWithAction = function (action, times) {
                var duration = action.getDuration() * times;
                if (this.initWithDuration(duration)) {
                    this._repeatTimes = times;
                    this._innerAction = action;
                    if (action instanceof egret.action.ActionInstant)
                        this._repeatTimes -= 1;
                    this._total = 0;
                    return true;
                }
                return false;
            };
            /**
             * @param {cc.Node} target
             */
            __egretProto__.startWithTarget = function (target) {
                this._total = 0;
                this._nextDt = this._innerAction.getDuration() / this._duration;
                _super.prototype.startWithTarget.call(this, target);
                this._innerAction.startWithTarget(target);
            };
            /**
             * stop the action
             */
            __egretProto__.stop = function () {
                this._innerAction.stop();
                _super.prototype.stop.call(this);
            };
            /**
             * @param {Number} time time in seconds
             */
            __egretProto__.update = function (time) {
                var locInnerAction = this._innerAction;
                var locDuration = this._duration;
                var locTimes = this._repeatTimes;
                var locNextDt = this._nextDt;
                if (time >= locNextDt) {
                    while (time > locNextDt && this._total < locTimes) {
                        locInnerAction.update(1);
                        this._total++;
                        locInnerAction.stop();
                        locInnerAction.startWithTarget(this.target);
                        locNextDt += locInnerAction.getDuration() / locDuration;
                        this._nextDt = locNextDt;
                    }
                    // fix for issue #1288, incorrect end value of repeat
                    if (time >= 1.0 && this._total < locTimes)
                        this._total++;
                    // don't set a instantaction back or update it, it has no use because it has no duration
                    if (this._actionInstant) {
                        if (this._total == locTimes) {
                            locInnerAction.update(1);
                            locInnerAction.stop();
                        }
                        else {
                            // issue #390 prevent jerk, use right update
                            locInnerAction.update(time - (locNextDt - locInnerAction.getDuration() / locDuration));
                        }
                    }
                }
                else {
                    locInnerAction.update((time * locTimes) % 1.0);
                }
            };
            /**
             * @return {Boolean}
             */
            __egretProto__.isDone = function () {
                return this._total == this._repeatTimes;
            };
            /**
             * @param {cc.FiniteTimeAction} action
             */
            __egretProto__.setInnerAction = function (action) {
                if (this._innerAction != action) {
                    this._innerAction = action;
                }
            };
            /**
             * @return {cc.FiniteTimeAction}
             */
            __egretProto__.getInnerAction = function () {
                return this._innerAction;
            };
            Repeat.create = function (action, times) {
                var repeat = new Repeat();
                repeat.initWithAction(action, times);
                return repeat;
            };
            return Repeat;
        })(ActionInterval);
        _action.Repeat = Repeat;
        Repeat.prototype.__class__ = "egret.action.Repeat";
        var RepeatForever = (function (_super) {
            __extends(RepeatForever, _super);
            function RepeatForever() {
                _super.apply(this, arguments);
            }
            var __egretProto__ = RepeatForever.prototype;
            RepeatForever.create = function (action) {
                var repeat = new RepeatForever();
                repeat.initWithAction(action, 99999999);
                return repeat;
            };
            return RepeatForever;
        })(Repeat);
        _action.RepeatForever = RepeatForever;
        RepeatForever.prototype.__class__ = "egret.action.RepeatForever";
    })(action = egret.action || (egret.action = {}));
})(egret || (egret = {}));

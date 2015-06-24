/**
 * Created by wander on 14-12-22.
 */
var egret;
(function (egret) {
    var action;
    (function (_action) {
        var ACTION_TAG_INVALID = -1;
        var Action = (function () {
            function Action() {
                this.originalTarget = null;
                this.target = null;
                this.tag = ACTION_TAG_INVALID;
            }
            var __egretProto__ = Action.prototype;
            /**
             *
             * @return {cc.Node}
             */
            __egretProto__.getOriginalTarget = function () {
                return this.originalTarget;
            };
            /**
             * to copy object with deep copy.
             * returns a clone of action.
             *
             * @return {cc.Action}
             */
            __egretProto__.clone = function () {
                var action = new Action();
                action.originalTarget = null;
                action.target = null;
                action.tag = this.tag;
                return action;
            };
            /**
             * return true if the action has finished.
             *
             * @return {Boolean}
             */
            __egretProto__.isDone = function () {
                return true;
            };
            /**
             * called before the action start. It will also set the target.
             *
             * @param {cc.Node} target
             */
            __egretProto__.startWithTarget = function (target) {
                this.originalTarget = target;
                this.target = target;
            };
            /**
             * called after the action has finished. It will set the 'target' to nil. <br />
             * IMPORTANT: You should never call "action stop" manually. Instead, use: "target.stopAction(action);"
             */
            __egretProto__.stop = function () {
                this.target = null;
            };
            /**
             * called every frame with it's delta time. <br />
             * DON'T override unless you know what you are doing.
             *
             * @param {Number} dt
             */
            __egretProto__.step = function (dt) {
            };
            /**
             * Called once per frame. Time is the number of seconds of a frame interval.
             *
             * @param {Number}  dt
             */
            __egretProto__.update = function (dt) {
            };
            __egretProto__.setEase = function (easeFunction) {
                this._easeFunction = easeFunction;
                return this;
            };
            return Action;
        })();
        _action.Action = Action;
        Action.prototype.__class__ = "egret.action.Action";
        var FiniteTimeAction = (function (_super) {
            __extends(FiniteTimeAction, _super);
            function FiniteTimeAction() {
                _super.apply(this, arguments);
                this._duration = 0;
            }
            var __egretProto__ = FiniteTimeAction.prototype;
            /** get duration in seconds of the action
             *
             * @return {Number}
             */
            __egretProto__.getDuration = function () {
                return this._duration;
            };
            /** returns a reversed action
             *
             * @return {Null}
             */
            __egretProto__.reverse = function () {
                console.warn("cocos2d: FiniteTimeAction#reverse: Implement me");
                return null;
            };
            __egretProto__.performEase = function (time) {
                console.warn("cocos2d: FiniteTimeAction#performEase: Implement me");
                return 0;
            };
            return FiniteTimeAction;
        })(Action);
        _action.FiniteTimeAction = FiniteTimeAction;
        FiniteTimeAction.prototype.__class__ = "egret.action.FiniteTimeAction";
    })(action = egret.action || (egret.action = {}));
})(egret || (egret = {}));

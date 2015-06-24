/**
 * Created by wander on 14-12-23.
 */
var egret;
(function (egret) {
    var action;
    (function (_action) {
        var ActionInstant = (function (_super) {
            __extends(ActionInstant, _super);
            function ActionInstant() {
                _super.apply(this, arguments);
            }
            var __egretProto__ = ActionInstant.prototype;
            __egretProto__.isDown = function () {
                return true;
            };
            __egretProto__.step = function (dt) {
                this.update(1);
            };
            __egretProto__.update = function (dt) {
            };
            __egretProto__.reverse = function () {
                return this.clone();
            };
            __egretProto__.clone = function () {
                return new ActionInstant();
            };
            return ActionInstant;
        })(_action.FiniteTimeAction);
        _action.ActionInstant = ActionInstant;
        ActionInstant.prototype.__class__ = "egret.action.ActionInstant";
        var CallFunc = (function (_super) {
            __extends(CallFunc, _super);
            function CallFunc(selector, selectorTarget, data) {
                _super.call(this);
                if (selector !== undefined) {
                    if (selectorTarget === undefined)
                        this.initWithFunction(selector);
                    else
                        this.initWithFunction(selector, selectorTarget, data);
                }
            }
            var __egretProto__ = CallFunc.prototype;
            /**
             * @param {function|Null} selector
             * @param {object} selectorTarget
             * @param {*|Null} data data for function, it accepts all data types.
             * @return {Boolean}
             */
            __egretProto__.initWithTarget = function (selector, selectorTarget, data) {
                this._data = data;
                this._callFunc = selector;
                this._selectorTarget = selectorTarget;
                return true;
            };
            /**
             * initializes the action with the std::function<void()>
             * @param {function} func
             * @returns {boolean}
             */
            __egretProto__.initWithFunction = function (selector, selectorTarget, data) {
                if (selectorTarget) {
                    this._data = data;
                    this._callFunc = selector;
                    this._selectorTarget = selectorTarget;
                }
                else if (selector)
                    this._function = selector;
                return true;
            };
            /**
             * execute the function.
             */
            __egretProto__.execute = function () {
                if (this._callFunc != null)
                    this._callFunc.call(this._selectorTarget, this.target, this._data);
                else if (this._function)
                    this._function.call(null, this.target);
            };
            __egretProto__.update = function (time) {
                this.execute();
            };
            __egretProto__.getTargetCallback = function () {
                return this._selectorTarget;
            };
            __egretProto__.setTargetCallback = function (sel) {
                if (sel != this._selectorTarget) {
                    if (this._selectorTarget)
                        this._selectorTarget = null;
                    this._selectorTarget = sel;
                }
            };
            __egretProto__.clone = function () {
                var action = new CallFunc();
                if (this._selectorTarget) {
                    action.initWithTarget(this._callFunc, this._selectorTarget, this._data);
                }
                else if (this._function) {
                    action.initWithFunction(this._function);
                }
                return action;
            };
            CallFunc.create = function (selector, selectorTarget, data) {
                return new CallFunc(selector, selectorTarget, data);
            };
            return CallFunc;
        })(ActionInstant);
        _action.CallFunc = CallFunc;
        CallFunc.prototype.__class__ = "egret.action.CallFunc";
    })(action = egret.action || (egret.action = {}));
})(egret || (egret = {}));

var mo;
(function (mo) {
    var Class = (function (_super) {
        __extends(Class, _super);
        function Class() {
            _super.call(this);
            var self = this;
            this.__class = this["constructor"];
            self.__className = self.__class.__className;
            self._initProp();
            self._init();
        }
        var __egretProto__ = Class.prototype;
        __egretProto__._initProp = function () {
            var self = this;
            self._isInstance = false;
            self._hasDtored = false;
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        __egretProto__._init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this;
        };
        __egretProto__.doDtor = function () {
            var self = this;
            if (self._hasDtored)
                return;
            self._hasDtored = true;
            self.dtor();
        };
        __egretProto__.dtor = function () {
        };
        Class.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return mo._baseConstFuncPrototype.create.apply(this, arguments);
        };
        Class.getInstance = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return mo._baseConstFuncPrototype.getInstance.apply(this, arguments);
        };
        Class.purgeInstance = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return mo._baseConstFuncPrototype.purgeInstance.apply(this, arguments);
        };
        Class.__className = "Class"; //为了跟cocos方案保持一致所写
        return Class;
    })(egret.EventDispatcher);
    mo.Class = Class;
    Class.prototype.__class__ = "mo.Class";
})(mo || (mo = {}));

var mo;
(function (mo) {
    var Option = (function () {
        function Option() {
            var self = this;
            this.__class = this["constructor"];
            self.__className = self.__class.__className;
            self._initProp();
            self._init();
        }
        var __egretProto__ = Option.prototype;
        __egretProto__._initProp = function () {
            var self = this;
            self._hasDtored = false;
        };
        __egretProto__._init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
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
        __egretProto__.reset = function () {
        };
        __egretProto__.clone = function (temp) {
            var self = this;
            temp = temp || new self.__class();
            return temp;
        };
        Option.__className = "Class"; //为了跟cocos方案保持一致所写
        return Option;
    })();
    mo.Option = Option;
    Option.prototype.__class__ = "mo.Option";
})(mo || (mo = {}));

var mo;
(function (mo) {
    //注意，由于loadingBar属性比较多，所以不继承_UIWidgetOption
    var _UILoadingBarOption = (function (_super) {
        __extends(_UILoadingBarOption, _super);
        function _UILoadingBarOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _UILoadingBarOption.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.barType = mo.LoadingBarType.LEFT;
            self.percent = 100;
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            self.lightWidget = null;
            self.innerLabel = null;
            self.texture = null;
        };
        return _UILoadingBarOption;
    })(mo.Option);
    mo._UILoadingBarOption = _UILoadingBarOption;
    _UILoadingBarOption.prototype.__class__ = "mo._UILoadingBarOption";
})(mo || (mo = {}));

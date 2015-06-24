var mo;
(function (mo) {
    var TopTray = (function (_super) {
        __extends(TopTray, _super);
        function TopTray() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TopTray.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        TopTray.__className = "TopTray";
        return TopTray;
    })(mo.Tray);
    mo.TopTray = TopTray;
    TopTray.prototype.__class__ = "mo.TopTray";
})(mo || (mo = {}));

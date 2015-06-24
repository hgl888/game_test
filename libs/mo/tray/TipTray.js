var mo;
(function (mo) {
    var TipTray = (function (_super) {
        __extends(TipTray, _super);
        function TipTray() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TipTray.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        TipTray.__className = "TipTray";
        return TipTray;
    })(mo.Tray);
    mo.TipTray = TipTray;
    TipTray.prototype.__class__ = "mo.TipTray";
})(mo || (mo = {}));

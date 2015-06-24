var mo;
(function (mo) {
    var DlgTray = (function (_super) {
        __extends(DlgTray, _super);
        function DlgTray() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = DlgTray.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        DlgTray.__className = "DlgTray";
        return DlgTray;
    })(mo.Tray);
    mo.DlgTray = DlgTray;
    DlgTray.prototype.__class__ = "mo.DlgTray";
})(mo || (mo = {}));

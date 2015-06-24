var mo;
(function (mo) {
    var MenuTray = (function (_super) {
        __extends(MenuTray, _super);
        function MenuTray() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MenuTray.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        MenuTray.__className = "MenuTray";
        return MenuTray;
    })(mo.Tray);
    mo.MenuTray = MenuTray;
    MenuTray.prototype.__class__ = "mo.MenuTray";
})(mo || (mo = {}));

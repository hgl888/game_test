var mo;
(function (mo) {
    var DisplayTray = (function (_super) {
        __extends(DisplayTray, _super);
        function DisplayTray() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = DisplayTray.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._setPenetrable(false); //托盘设置为不可穿透
        };
        DisplayTray.__className = "DisplayTray";
        return DisplayTray;
    })(mo.Tray);
    mo.DisplayTray = DisplayTray;
    DisplayTray.prototype.__class__ = "mo.DisplayTray";
})(mo || (mo = {}));

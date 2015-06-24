var mo;
(function (mo) {
    var LoadingTray = (function (_super) {
        __extends(LoadingTray, _super);
        function LoadingTray() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = LoadingTray.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._setPenetrable(false); //托盘设置为不可穿透
        };
        LoadingTray.__className = "LoadingTray";
        return LoadingTray;
    })(mo.Tray);
    mo.LoadingTray = LoadingTray;
    LoadingTray.prototype.__class__ = "mo.LoadingTray";
})(mo || (mo = {}));

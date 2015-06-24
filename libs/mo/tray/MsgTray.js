var mo;
(function (mo) {
    var MsgTray = (function (_super) {
        __extends(MsgTray, _super);
        function MsgTray() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MsgTray.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._setPenetrable(false); //托盘设置为不可穿透
        };
        MsgTray.__className = "MsgTray";
        return MsgTray;
    })(mo.Tray);
    mo.MsgTray = MsgTray;
    MsgTray.prototype.__class__ = "mo.MsgTray";
})(mo || (mo = {}));

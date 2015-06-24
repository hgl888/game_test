var mo;
(function (mo) {
    var GuideHandler = (function (_super) {
        __extends(GuideHandler, _super);
        function GuideHandler() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideHandler.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._map = {};
        };
        __egretProto__.set = function (name, func, ctx) {
            this._map[name] = { func: func, ctx: ctx };
        };
        __egretProto__.get = function (name) {
            return this._map[name];
        };
        GuideHandler.__className = "GuideHandler";
        return GuideHandler;
    })(mo.Class);
    mo.GuideHandler = GuideHandler;
    GuideHandler.prototype.__class__ = "mo.GuideHandler";
    mo.guideCmdConditionMgr = new GuideHandler();
    mo.guideCmdNodeMgr = new GuideHandler();
    mo.guideCmdRectNodeMgr = new GuideHandler();
    mo.guideCmdBeforeShowMgr = new GuideHandler();
    mo.guideCmdAfterShowMgr = new GuideHandler();
    mo.guideCmdBeforeNextMgr = new GuideHandler();
    mo.guideCmdAfterNextMgr = new GuideHandler();
    mo.nextGuideCmdMgr = new GuideHandler();
})(mo || (mo = {}));

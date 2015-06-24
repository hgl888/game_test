var uw;
(function (uw) {
    var GuideCmd4 = (function (_super) {
        __extends(GuideCmd4, _super);
        function GuideCmd4() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd4.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._UIClass = uw.GuideUI_Transparent;
            self._HookUIClass = uw.GuideHookUI_Bubble;
        };
        GuideCmd4.__className = "GuideCmd4";
        return GuideCmd4;
    })(uw.GuideCmd);
    uw.GuideCmd4 = GuideCmd4;
    GuideCmd4.prototype.__class__ = "uw.GuideCmd4";
    var GuideCmd4Factory = (function (_super) {
        __extends(GuideCmd4Factory, _super);
        function GuideCmd4Factory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd4Factory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._CmdClass = GuideCmd4;
        };
        GuideCmd4Factory.__className = "GuideCmd4Factory";
        return GuideCmd4Factory;
    })(uw.GuideCmdFactory);
    uw.GuideCmd4Factory = GuideCmd4Factory;
    GuideCmd4Factory.prototype.__class__ = "uw.GuideCmd4Factory";
})(uw || (uw = {}));

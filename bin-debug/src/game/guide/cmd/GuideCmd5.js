var uw;
(function (uw) {
    var GuideCmd5 = (function (_super) {
        __extends(GuideCmd5, _super);
        function GuideCmd5() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd5.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._UIClass = uw.GuideUI_Transparent;
            self._HookUIClass = uw.GuideHookUI_FingerAndBubble;
        };
        GuideCmd5.__className = "GuideCmd5";
        return GuideCmd5;
    })(uw.GuideCmd);
    uw.GuideCmd5 = GuideCmd5;
    GuideCmd5.prototype.__class__ = "uw.GuideCmd5";
    var GuideCmd5Factory = (function (_super) {
        __extends(GuideCmd5Factory, _super);
        function GuideCmd5Factory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd5Factory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._CmdClass = GuideCmd5;
        };
        GuideCmd5Factory.__className = "GuideCmd5Factory";
        return GuideCmd5Factory;
    })(uw.GuideCmdFactory);
    uw.GuideCmd5Factory = GuideCmd5Factory;
    GuideCmd5Factory.prototype.__class__ = "uw.GuideCmd5Factory";
})(uw || (uw = {}));

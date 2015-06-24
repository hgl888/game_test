var uw;
(function (uw) {
    var GuideCmd2 = (function (_super) {
        __extends(GuideCmd2, _super);
        function GuideCmd2() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd2.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._UIClass = uw.GuideUI_NPC2;
            self._HookUIClass = uw.GuideHookUI_Finger;
        };
        GuideCmd2.__className = "GuideCmd2";
        return GuideCmd2;
    })(uw.GuideCmd);
    uw.GuideCmd2 = GuideCmd2;
    GuideCmd2.prototype.__class__ = "uw.GuideCmd2";
    var GuideCmd2Factory = (function (_super) {
        __extends(GuideCmd2Factory, _super);
        function GuideCmd2Factory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd2Factory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._CmdClass = GuideCmd2;
        };
        GuideCmd2Factory.__className = "GuideCmd2Factory";
        return GuideCmd2Factory;
    })(uw.GuideCmdFactory);
    uw.GuideCmd2Factory = GuideCmd2Factory;
    GuideCmd2Factory.prototype.__class__ = "uw.GuideCmd2Factory";
})(uw || (uw = {}));

var uw;
(function (uw) {
    var GuideCmd3 = (function (_super) {
        __extends(GuideCmd3, _super);
        function GuideCmd3() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd3.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._UIClass = uw.GuideUI_Transparent;
            self._HookUIClass = uw.GuideHookUI_Finger;
        };
        //@override
        __egretProto__._createUI = function () {
            _super.prototype._createUI.call(this);
            var self = this;
            var opt = self.option;
            if (opt["showCircle"] == 0) {
                var hookUI = self.hookUI;
                if (hookUI) {
                    hookUI.finger.circle.visible = false;
                }
            }
        };
        GuideCmd3.__className = "GuideCmd3";
        return GuideCmd3;
    })(uw.GuideCmd);
    uw.GuideCmd3 = GuideCmd3;
    GuideCmd3.prototype.__class__ = "uw.GuideCmd3";
    var GuideCmd3Factory = (function (_super) {
        __extends(GuideCmd3Factory, _super);
        function GuideCmd3Factory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd3Factory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._CmdClass = GuideCmd3;
        };
        GuideCmd3Factory.__className = "GuideCmd3Factory";
        return GuideCmd3Factory;
    })(uw.GuideCmdFactory);
    uw.GuideCmd3Factory = GuideCmd3Factory;
    GuideCmd3Factory.prototype.__class__ = "uw.GuideCmd3Factory";
})(uw || (uw = {}));

var uw;
(function (uw) {
    var GuideCmd7 = (function (_super) {
        __extends(GuideCmd7, _super);
        function GuideCmd7() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd7.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._UIClass = null;
            self._HookUIClass = null;
        };
        GuideCmd7.__className = "GuideCmd7";
        return GuideCmd7;
    })(uw.GuideCmd);
    uw.GuideCmd7 = GuideCmd7;
    GuideCmd7.prototype.__class__ = "uw.GuideCmd7";
    var GuideCmd7Factory = (function (_super) {
        __extends(GuideCmd7Factory, _super);
        function GuideCmd7Factory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd7Factory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._CmdClass = GuideCmd7;
        };
        GuideCmd7Factory.__className = "GuideCmd7Factory";
        return GuideCmd7Factory;
    })(uw.GuideCmdFactory);
    uw.GuideCmd7Factory = GuideCmd7Factory;
    GuideCmd7Factory.prototype.__class__ = "uw.GuideCmd7Factory";
})(uw || (uw = {}));

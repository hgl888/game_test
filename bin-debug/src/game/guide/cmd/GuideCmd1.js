var uw;
(function (uw) {
    var GuideCmd1 = (function (_super) {
        __extends(GuideCmd1, _super);
        function GuideCmd1() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd1.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._UIClass = uw.GuideUI_NPC1;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
        };
        GuideCmd1.__className = "GuideCmd1";
        return GuideCmd1;
    })(uw.GuideCmd);
    uw.GuideCmd1 = GuideCmd1;
    GuideCmd1.prototype.__class__ = "uw.GuideCmd1";
    var GuideCmd1Factory = (function (_super) {
        __extends(GuideCmd1Factory, _super);
        function GuideCmd1Factory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd1Factory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._CmdClass = GuideCmd1;
        };
        GuideCmd1Factory.__className = "GuideCmd1Factory";
        return GuideCmd1Factory;
    })(uw.GuideCmdFactory);
    uw.GuideCmd1Factory = GuideCmd1Factory;
    GuideCmd1Factory.prototype.__class__ = "uw.GuideCmd1Factory";
})(uw || (uw = {}));

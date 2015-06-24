var uw;
(function (uw) {
    var GuideCmd6 = (function (_super) {
        __extends(GuideCmd6, _super);
        function GuideCmd6() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd6.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._UIClass = uw.GuideUI_NPC3;
        };
        GuideCmd6.__className = "GuideCmd6";
        return GuideCmd6;
    })(uw.GuideCmd);
    uw.GuideCmd6 = GuideCmd6;
    GuideCmd6.prototype.__class__ = "uw.GuideCmd6";
    var GuideCmd6Factory = (function (_super) {
        __extends(GuideCmd6Factory, _super);
        function GuideCmd6Factory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd6Factory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._CmdClass = GuideCmd6;
        };
        GuideCmd6Factory.__className = "GuideCmd6Factory";
        return GuideCmd6Factory;
    })(uw.GuideCmdFactory);
    uw.GuideCmd6Factory = GuideCmd6Factory;
    GuideCmd6Factory.prototype.__class__ = "uw.GuideCmd6Factory";
})(uw || (uw = {}));

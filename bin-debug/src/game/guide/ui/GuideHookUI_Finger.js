var uw;
(function (uw) {
    var GuideHookUI_Finger = (function (_super) {
        __extends(GuideHookUI_Finger, _super);
        function GuideHookUI_Finger() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideHookUI_Finger.prototype;
        //@override
        __egretProto__._setCmd = function (cmd) {
            var self = this;
            _super.prototype._setCmd.call(this, cmd);
            var finger = self.finger = uw.GuideFinger.create(cmd);
            self.addChild(finger);
        };
        //@override
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            this.finger.showAction();
        };
        GuideHookUI_Finger.__className = "GuideHookUI_Finger";
        return GuideHookUI_Finger;
    })(mo.GuideHookUI);
    uw.GuideHookUI_Finger = GuideHookUI_Finger;
    GuideHookUI_Finger.prototype.__class__ = "uw.GuideHookUI_Finger";
})(uw || (uw = {}));

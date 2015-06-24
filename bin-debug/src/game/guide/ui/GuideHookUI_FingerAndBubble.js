var uw;
(function (uw) {
    var GuideHookUI_FingerAndBubble = (function (_super) {
        __extends(GuideHookUI_FingerAndBubble, _super);
        function GuideHookUI_FingerAndBubble() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideHookUI_FingerAndBubble.prototype;
        //@override
        __egretProto__._setCmd = function (cmd) {
            var self = this;
            _super.prototype._setCmd.call(this, cmd);
            var bubble = self.bubble = mo.GuideBubble.create(cmd);
            self.addChild(bubble);
        };
        //@override
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            this.bubble.showAction();
        };
        GuideHookUI_FingerAndBubble.__className = "GuideHookUI_FingerAndBubble";
        return GuideHookUI_FingerAndBubble;
    })(mo.GuideHookUI);
    uw.GuideHookUI_FingerAndBubble = GuideHookUI_FingerAndBubble;
    GuideHookUI_FingerAndBubble.prototype.__class__ = "uw.GuideHookUI_FingerAndBubble";
})(uw || (uw = {}));

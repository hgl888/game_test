var uw;
(function (uw) {
    var GuideHookUI_Bubble = (function (_super) {
        __extends(GuideHookUI_Bubble, _super);
        function GuideHookUI_Bubble() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideHookUI_Bubble.prototype;
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
        GuideHookUI_Bubble.__className = "GuideHookUI_Bubble";
        return GuideHookUI_Bubble;
    })(mo.GuideHookUI);
    uw.GuideHookUI_Bubble = GuideHookUI_Bubble;
    GuideHookUI_Bubble.prototype.__class__ = "uw.GuideHookUI_Bubble";
})(uw || (uw = {}));

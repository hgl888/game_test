var uw;
(function (uw) {
    var GuideUI_NPC3 = (function (_super) {
        __extends(GuideUI_NPC3, _super);
        function GuideUI_NPC3() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideUI_NPC3.prototype;
        //@override
        __egretProto__._setCmd = function (cmd) {
            var self = this;
            _super.prototype._setCmd.call(this, cmd);
            //方形
            var rect = self._cmd.getNodeRect();
            var rectPanel = mo.createS9GPanel(rect.width, rect.height, res.ui_common.blk9_ntc_png);
            rectPanel.setAnchorPoint(0.5, 0.5);
            rectPanel.setPosition(rect.x + rect.width / 2, rect.y + rect.height / 2);
            self.addChild(rectPanel);
            var scaleBy = mo.scaleBy(0.4, 1.1);
            var seq = mo.repeatForever(mo.sequence(scaleBy, scaleBy.reverse()));
            rectPanel.runAction(seq);
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
            var children = self.rootWidget.getChildren();
            for (var i = 0, l_i = children.length; i < l_i; i++) {
                var child = children[i];
                child.touchEnabled = false;
                child.hitChildrenEnabled = false;
            }
            self.rootWidget.onClick(self._onContinue, self);
        };
        __egretProto__._onContinue = function () {
            this._cmd.next();
        };
        GuideUI_NPC3.__className = "GuideUI_NPC3";
        return GuideUI_NPC3;
    })(uw.GuideUI_NPC2);
    uw.GuideUI_NPC3 = GuideUI_NPC3;
    GuideUI_NPC3.prototype.__class__ = "uw.GuideUI_NPC3";
})(uw || (uw = {}));

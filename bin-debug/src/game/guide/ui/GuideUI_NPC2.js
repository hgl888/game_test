var uw;
(function (uw) {
    var GuideUI_NPC2 = (function (_super) {
        __extends(GuideUI_NPC2, _super);
        function GuideUI_NPC2() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideUI_NPC2.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiGuideNPCTalk2_ui;
        };
        //@override
        __egretProto__._setCmd = function (cmd) {
            var self = this;
            _super.prototype._setCmd.call(this, cmd);
            var rectWidth = cmd.getNodeRect().width;
            var posX = cmd.getNodeRect().x;
            var width = mo.visibleRect.getWidth();
            var panel_talk = self.getWidgetByName("panel_talk");
            var panel_word = self.getWidgetByName("panel_word");
            var panel_talkBg = self.getWidgetByName("panel_talkBg");
            panel_talkBg.setOpacity(0);
            panel_talkBg.setVisible(false);
            panel_talkBg.setRotation(5);
            panel_talkBg.setScale(0);
            var seq = mo.sequence(mo.callFunc(function (sender) {
                sender.setVisible(true);
            }, self), mo.delayTime(0.3), mo.spawn(mo.scaleTo(0.2, 1), mo.fadeIn(0.2), mo.rotateBy(0.2, -5)).setEase(mo.Ease.backOut));
            panel_talkBg.runAction(seq);
            if (posX < (mo.visibleRect.getWidth() - posX - rectWidth)) {
                panel_talk.setPosition(width - 160, self.height - 220);
                panel_talk.setScaleX(-1);
                var size = panel_word.getSize();
                panel_word.setPositionX(panel_word.getPositionX() + size.width);
                panel_word.setScaleX(-1);
            }
            else {
                panel_talk.setPosition(160, self.height - 220);
            }
            //设置NPC讲话信息
            self.setInfoByName("panel_word", { fontSize: 60, color: "#000000", value: cmd.talk, vAlign: mo.ALIGN_V_TOP });
            self._showAramture(cmd);
        };
        __egretProto__._showAramture = function (cmd) {
            var self = this, clazz = self.__class;
            var img_npc = self.getWidgetByName("img_npc");
            var size = img_npc.getSize();
            uw.uiArmFactory.produceDynamic(res.cca_ui.npc, function (sender) {
                var name = "emo" + (cmd.npcIndex || 0);
                sender.play(name);
                sender.setPosition(size.width / 2, size.height - 40);
                img_npc.addChild(sender);
            });
        };
        GuideUI_NPC2.__className = "GuideUI_NPC2";
        return GuideUI_NPC2;
    })(mo.GuideUI);
    uw.GuideUI_NPC2 = GuideUI_NPC2;
    GuideUI_NPC2.prototype.__class__ = "uw.GuideUI_NPC2";
})(uw || (uw = {}));

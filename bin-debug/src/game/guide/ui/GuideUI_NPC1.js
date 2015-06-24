var uw;
(function (uw) {
    var GuideUI_NPC1 = (function (_super) {
        __extends(GuideUI_NPC1, _super);
        function GuideUI_NPC1() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideUI_NPC1.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiGuideNPCTalk1_ui;
            self._talkArr = [];
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
            self.rootWidget.onClick(self._onContinue, self);
        };
        //@override
        __egretProto__._setCmd = function (cmd) {
            var self = this, clazz = self.__class;
            _super.prototype._setCmd.call(this, cmd);
            self._talkBox1 = self.getWidgetByName(clazz.PANEL_TALK_BOX1);
            self._talkBox2 = self.getWidgetByName(clazz.PANEL_TALK_BOX2);
            //设置NPC讲话信息
            self._talkArr = self._parseTalk(cmd.talk);
            self._showTalk();
            //光标动画
            var rf = mo.repeatForever(mo.sequence(mo.moveBy(0.5, mo.p(0, 40)), mo.moveBy(0.5, mo.p(0, -40))));
            var img_next = self.getWidgetByName(clazz.IMG_NEXT);
            img_next.runAction(rf);
            self.onClickByName("panel_talk", self._onContinue, self);
            self._talkBox1.onClickByName(clazz.IMG_NPC, self._onContinue, self);
            self._talkBox2.onClickByName(clazz.IMG_NPC, self._onContinue, self);
            self._showAramture(cmd);
        };
        __egretProto__._showAramture = function (cmd) {
            var self = this, clazz = self.__class;
            var img_npc = self._talkBox1.getWidgetByName(clazz.IMG_NPC);
            var size = img_npc.getSize();
            uw.uiArmFactory.produceDynamic(res.cca_ui.npc, function (sender) {
                var name = "emo" + (cmd.npcIndex || 0);
                sender.play(name);
                sender.setPosition(size.width / 2, size.height - 40);
                img_npc.addChild(sender);
            });
        };
        __egretProto__._parseTalk = function (talk) {
            var talkObj = [];
            if (talk.indexOf(":") == -1) {
                var obj = {};
                obj.tempId = 0;
                obj.content = talk;
                talkObj.push(obj);
            }
            else {
                var talkArr = talk.split(";");
                for (var i = 0; i < talkArr.length; i++) {
                    var ta = talkArr[i].split(":");
                    var obj = {};
                    obj.tempId = parseInt(ta[0]);
                    obj.content = ta[1];
                    talkObj.push(obj);
                }
            }
            return talkObj;
        };
        __egretProto__._showTalk = function () {
            var self = this, clazz = self.__class;
            if (self._talkArr && self._talkArr.length > 0) {
                var talk = self._talkArr.shift();
                var tempId = talk.tempId;
                var content = talk.content;
                var talkBox, hAlign, icon, name;
                if (tempId == 0) {
                    talkBox = self._talkBox1;
                    hAlign = mo.ALIGN_H_LEFT;
                    name = "恶魔之书";
                    self._talkBox2.setVisible(false);
                }
                else {
                    talkBox = self._talkBox2;
                    hAlign = mo.ALIGN_H_RIGHT;
                    name = uw.getWarriorByTempId(tempId)[uw.t_warrior_name];
                    var tId = uw.getWarriorByTempId(tempId)[uw.t_warrior_id];
                    icon = resHelper.getRoleBodyPath(tId);
                    talkBox.setInfoByName(clazz.IMG_NPC, icon);
                    self._talkBox1.setVisible(false);
                }
                talkBox.setVisible(true);
                talkBox.setInfoByName(clazz.PANEL_NPC_NAME, name);
                talkBox.setInfoByName(clazz.PANEL_WORD, {
                    value: content,
                    fontSize: 64,
                    vAlign: mo.ALIGN_V_TOP,
                    hAlign: hAlign,
                    color: "#dcdcdc"
                });
            }
            else {
                this._cmd.next();
            }
        };
        //点击继续
        __egretProto__._onContinue = function () {
            this._showTalk();
        };
        GuideUI_NPC1.__className = "GuideUI_NPC1";
        GuideUI_NPC1.PANEL_NPC_NAME = "lab_npcName";
        GuideUI_NPC1.PANEL_WORD = "panel_word";
        GuideUI_NPC1.IMG_NPC = "img_npc";
        GuideUI_NPC1.IMG_NEXT = "img_next";
        GuideUI_NPC1.PANEL_TALK_BOX1 = "talkBox1";
        GuideUI_NPC1.PANEL_TALK_BOX2 = "talkBox2";
        return GuideUI_NPC1;
    })(mo.GuideUI);
    uw.GuideUI_NPC1 = GuideUI_NPC1;
    GuideUI_NPC1.prototype.__class__ = "uw.GuideUI_NPC1";
})(uw || (uw = {}));

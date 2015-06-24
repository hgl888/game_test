var uw;
(function (uw) {
    var FightTalkLayer = (function (_super) {
        __extends(FightTalkLayer, _super);
        function FightTalkLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightTalkLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._jsonPath = res.uiFightTalkLayer_ui;
            this._talkArr = [];
        };
        __egretProto__.init = function (copyId) {
            _super.prototype.init.call(this);
            var self = this;
            self._copyId = copyId;
            var __class = FightTalkLayer;
            self._talkBox1 = self.getWidgetByName(__class.PANEL_TALK_BOX1);
            self._talkBox2 = self.getWidgetByName(__class.PANEL_TALK_BOX2);
            self.onClickByName("root", self.nextTalk, self);
        };
        __egretProto__.onEnterNextTick = function () {
            _super.prototype.onEnterNextTick.call(this);
            var self = this;
            //光标动画
            var seq = mo.repeatForever(mo.sequence(mo.moveBy(0.5, mo.p(0, 40)), mo.moveBy(0.5, mo.p(0, -40))));
            var __class = FightTalkLayer;
            var img_next = self.getWidgetByName(__class.IMG_NEXT);
            img_next.runAction(seq);
        };
        __egretProto__.showBeforeTalk = function () {
            var self = this;
            self._talkArr = uw.getTalkByCopyId(self._copyId, true);
            self.nextTalk();
        };
        __egretProto__.showAfterTalk = function () {
            var self = this;
            self._talkArr = uw.getTalkByCopyId(self._copyId, false);
            self.nextTalk();
        };
        /**
         * 对话内容 align:0是左边，1是右边
         * @param arr [{tempId:1, align:0, content:"卧槽"},....]
         */
        __egretProto__.setTalkData = function (arr) {
            var self = this;
            self._talkArr = arr;
            self.nextTalk();
        };
        __egretProto__.nextTalk = function () {
            var self = this;
            if (self._talkArr && self._talkArr.length > 0) {
                var talk = self._talkArr.shift();
                var tempId = talk.tempId;
                var content = talk.content;
                var align = talk.align;
                var talkBox, hAlign;
                if (align == 0) {
                    talkBox = self._talkBox1;
                    hAlign = mo.ALIGN_H_LEFT;
                    self._talkBox2.setVisible(false);
                }
                else {
                    talkBox = self._talkBox2;
                    hAlign = mo.ALIGN_H_RIGHT;
                    self._talkBox1.setVisible(false);
                }
                var name = uw.getWarriorByTempId(tempId)[uw.t_warrior_name];
                var tId = uw.getWarriorByTempId(tempId)[uw.t_warrior_id];
                var icon = resHelper.getRoleBodyPath(tId);
                var __class = FightTalkLayer;
                talkBox.setVisible(true);
                talkBox.setInfoByName(__class.IMG_NPC, icon);
                talkBox.setInfoByName(__class.PANEL_NPC_NAME, name);
                talkBox.setInfoByName(__class.PANEL_WORD, {
                    value: content,
                    fontSize: 64,
                    vAlign: mo.ALIGN_V_TOP,
                    hAlign: hAlign,
                    color: "#dcdcdc"
                });
            }
            else {
                self.close();
            }
        };
        FightTalkLayer.__className = "FightTalkLayer";
        FightTalkLayer.PANEL_NPC_NAME = "lab_npcName";
        FightTalkLayer.PANEL_WORD = "panel_word";
        FightTalkLayer.IMG_NPC = "img_npc";
        FightTalkLayer.IMG_NEXT = "img_next";
        FightTalkLayer.PANEL_TALK_BOX1 = "talkBox1";
        FightTalkLayer.PANEL_TALK_BOX2 = "talkBox2";
        return FightTalkLayer;
    })(mo.MenuLayer);
    uw.FightTalkLayer = FightTalkLayer;
    FightTalkLayer.prototype.__class__ = "uw.FightTalkLayer";
})(uw || (uw = {}));

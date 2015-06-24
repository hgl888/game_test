var uw;
(function (uw) {
    var FightPlotTalkLayer = (function (_super) {
        __extends(FightPlotTalkLayer, _super);
        function FightPlotTalkLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightPlotTalkLayer.prototype;
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.apply(self, arguments);
            var root = self.getWidgetByName("root");
            self._bgLayer = mo.UIImage.create();
            self._bgLayer.loadTexture(res.ui_bg.bg_film_jpg);
            self._bgLayer.setPosition(mo.visibleRect.center());
            self._bgLayer.setZOrder(-1);
            root.addChild(self._bgLayer);
            var size = self._bgLayer.getSize();
            var scaleTimes = mo.visibleRect.getWidth() / size.width;
            if (scaleTimes > 1) {
                self._bgLayer.setScale(scaleTimes);
            }
        };
        /**
         * 对话内容 align:0是左边，1是右边
         * @param arr [{name:"老马", head:"laoma.png" align:0, content:"卧槽"},....]
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
                var name = talk.name;
                var head = talk.head;
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
                talkBox.setVisible(true);
                talkBox.setInfoByName(self.__class.IMG_NPC, head);
                talkBox.setInfoByName(self.__class.PANEL_NPC_NAME, name);
                talkBox.setInfoByName(self.__class.PANEL_WORD, {
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
        FightPlotTalkLayer.__className = "FightPlotTalkLayer";
        return FightPlotTalkLayer;
    })(uw.FightTalkLayer);
    uw.FightPlotTalkLayer = FightPlotTalkLayer;
    FightPlotTalkLayer.prototype.__class__ = "uw.FightPlotTalkLayer";
})(uw || (uw = {}));

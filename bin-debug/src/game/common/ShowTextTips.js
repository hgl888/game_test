var uw;
(function (uw) {
    var TipsLayer = (function (_super) {
        __extends(TipsLayer, _super);
        function TipsLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TipsLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._tipsArr = [];
            self._tipsRunning = false;
            self._interval = 600;
            self.blurMaskEnabled = false;
            self._showWithAction = false;
        };
        __egretProto__.setTips = function (arg) {
            var self = this;
            if (typeof arg == "string") {
                self._tipsArr.push(arg);
            }
            else {
                self._tipsArr = self._tipsArr.concat(arg);
            }
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            var self = this;
            if (!self._tipsRunning) {
                self._tipsRunning = true;
                self._getTray().setPenetrable(true);
                mo.schedule(self._runActionQueue, self, self._interval, true);
            }
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            var self = this;
            self._tipsArr = [];
            self.removeChildren();
            if (self._tipsRunning) {
                self._tipsRunning = false;
                self._getTray().setPenetrable(false);
                mo.unschedule(self._runActionQueue, self);
                self.close();
            }
        };
        __egretProto__._runActionQueue = function () {
            var self = this, tip;
            if (self._tipsArr.length > 0) {
                tip = self._tipsArr.shift();
                self.createNode(tip);
            }
        };
        __egretProto__.createNode = function (text) {
        };
        __egretProto__.isNeedToClose = function () {
            var self = this;
            if (self.getChildrenCount() == 0 && self._tipsArr.length == 0 && self._tipsRunning) {
                self._tipsRunning = false;
                mo.unschedule(self._runActionQueue, self);
                self.close();
            }
        };
        TipsLayer.show = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var _instance = this.getInstance();
            _instance.setTips.apply(_instance, args);
            if (!_instance.getParent()) {
                _instance.show();
            }
        };
        TipsLayer.close = function () {
            var _instance = this.getInstance();
            if (_instance.getParent()) {
                _instance.close();
            }
        };
        TipsLayer.__className = "TipsLayer";
        return TipsLayer;
    })(mo.MsgDlg);
    uw.TipsLayer = TipsLayer;
    TipsLayer.prototype.__class__ = "uw.TipsLayer";
    var TextTips = (function (_super) {
        __extends(TextTips, _super);
        function TextTips() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TextTips.prototype;
        __egretProto__.createNode = function (text) {
            var self = this, node;
            node = mo.UIText.create();
            node.setOption(text);
            node.setScale(0.3);
            node.setFontSize(70);
            //node.setColor(0x00e91b);
            node.enableStroke(0x383838, 1);
            node.setPosition(mo.visibleRect.center());
            self.addChild(node);
            var seq = mo.sequence(mo.scaleTo(0.3, 1).setEase(mo.Ease.backOut), mo.moveBy(1.6, mo.p(0, -215)), mo.spawn(mo.moveBy(0.5, mo.p(0, -66)), mo.fadeOut(0.5)), mo.callFunc(function (sender) {
                sender.removeFromParent(true);
                self.isNeedToClose();
            }, self));
            node.runAction(seq);
        };
        TextTips.__className = "TextTips";
        return TextTips;
    })(TipsLayer);
    uw.TextTips = TextTips;
    TextTips.prototype.__class__ = "uw.TextTips";
    /**
     * 向上滚动
     */
    var TipDlg = (function (_super) {
        __extends(TipDlg, _super);
        function TipDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TipDlg.prototype;
        /**
         * @override
         */
        __egretProto__.createNode = function (text) {
            var self = this;
            var bgPanel = self._bgImage = mo.createS9GPanel(1, 1, res.ui_panel.blk9_info_png);
            bgPanel.anchorX = 0.5;
            bgPanel.anchorY = 0.5;
            bgPanel.setPosition(mo.visibleRect.center());
            bgPanel.setOpacity(0);
            self.addChild(bgPanel);
            var richText = new mo.UIText();
            richText.setAnchorPoint(0, 0);
            richText.setOption({
                value: text,
                fontSize: 70
            });
            var textSize = richText.getSize();
            richText.setPosition(90, (174 - textSize.height) / 2);
            bgPanel.addChild(richText);
            var duration = 2.0, fadeIn = mo.fadeIn(duration * 0.2), fade = mo.fadeOut(duration * 0.2), delay = mo.delayTime(duration * 0.8), act = mo.sequence(mo.moveBy(duration, mo.p(0, -360)), mo.callFunc(function (sender) {
                sender.removeFromParent(true);
                self.isNeedToClose();
            }, self));
            bgPanel.setSize(textSize.width + 180, 174);
            bgPanel.zOrder = 111;
            bgPanel.runAction(fadeIn);
            bgPanel.runAction(act);
            bgPanel.runAction(mo.sequence(delay, fade));
        };
        TipDlg.show = function (msgData) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _instance = this.getInstance();
            var textArgs = [msgData[uw.c_msgCode_text]];
            textArgs = textArgs.concat(args);
            var text = mo.formatStr.apply(mo, textArgs);
            _instance.setTips(text);
            if (!_instance.getParent()) {
                _instance.show();
            }
        };
        TipDlg.__className = "TipDlg";
        return TipDlg;
    })(TipsLayer);
    uw.TipDlg = TipDlg;
    TipDlg.prototype.__class__ = "uw.TipDlg";
})(uw || (uw = {}));

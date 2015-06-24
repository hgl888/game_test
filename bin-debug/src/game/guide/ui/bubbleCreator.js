var mo;
(function (mo) {
    var GuideBubble = (function (_super) {
        __extends(GuideBubble, _super);
        function GuideBubble() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideBubble.prototype;
        //@override
        __egretProto__.init = function (cmd) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            var posX = cmd.getNodeRect().x, posY = cmd.getNodeRect().y;
            var direction = self._getPointPosType(posX, posY);
            var circle = self.circle = new mo.UIImage();
            circle.loadTexture(res.ui_common.blk_ntc_circle_png);
            circle.setAnchorPoint(0.5, 0.5);
            self.addChild(circle);
            var width = 360, height = 150;
            var panel = self.panel = mo.createS9GPanel(width, height, res.ui_panel.blk9_babble4_png);
            panel.setAnchorPoint(0, 0.5);
            panel.setPosition(230, 0);
            self.addChild(panel);
            var arrow = mo.UIImage.create();
            arrow.loadTexture(res.ui_common.ico_arw_png);
            arrow.setAnchorPoint(0.5, 0.8);
            arrow.setRotation(90);
            arrow.setPosition(-56, 74);
            panel.addChild(arrow);
            var label = new mo.UIText();
            label.anchorX = 0.5;
            label.anchorY = 0.5;
            label.setText(cmd.bubbleText);
            label.setColor(cc.c3b(0, 0, 0));
            label.setFontSize(58);
            label.setPosition(width / 2, height / 2);
            panel.addChild(label);
            var scaleX = 1;
            switch (direction) {
                case clazz.POINT_POS_LEFT:
                    break;
                case clazz.POINT_POS_RIGHT:
                    scaleX = -1;
                    break;
                default: return mo_guide.error("point posType error, please check!!");
            }
            self.setScaleX(scaleX);
            label.setScaleX(scaleX);
        };
        __egretProto__._getPointPosType = function (posX, posY) {
            var self = this, clazz = self.__class;
            var width = mo.visibleRect.getWidth(), height = mo.visibleRect.getHeight();
            var x = posX, y = posY, w1 = width / 2, h1 = height / 2, w2 = width / 4, h2 = height / 4;
            var posType = clazz.POINT_POS_LEFT;
            if (x >= w1) {
                posType = clazz.POINT_POS_RIGHT;
            }
            return posType;
        };
        __egretProto__.showAction = function () {
            var self = this;
            var circle = self.circle;
            circle.setScale(1);
            circle.setPosition(0, 0);
            var rf = mo.repeatForever(mo.sequence(mo.scaleTo(0.4, 1.1), mo.scaleTo(0.4, 1)));
            circle.runAction(rf);
            var moveAround = mo.repeatForever(mo.sequence(mo.moveBy(0.8, mo.p(20, 0)), mo.moveBy(0.5, mo.p(-20, 0))));
            self.panel.runAction(moveAround);
        };
        GuideBubble.__className = "GuideBubble";
        GuideBubble.POINT_POS_LEFT = "l"; //左
        GuideBubble.POINT_POS_RIGHT = "r"; //右
        return GuideBubble;
    })(mo.UIWidget);
    mo.GuideBubble = GuideBubble;
    GuideBubble.prototype.__class__ = "mo.GuideBubble";
})(mo || (mo = {}));

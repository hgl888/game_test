var uw;
(function (uw) {
    var GuideFinger = (function (_super) {
        __extends(GuideFinger, _super);
        function GuideFinger() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideFinger.prototype;
        //@override
        __egretProto__.init = function (cmd) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self.cmd = cmd;
            var circle = self.circle = new mo.UIImage();
            circle.loadTexture(res.ui_common.blk_ntc_circle_png);
            circle.setAnchorPoint(0.5, 0.5);
            self.addChild(circle);
            //手指
            var pointer = self.pointer = new mo.UIImage();
            pointer.loadTexture(res.ui_panel.point_png);
            pointer.setAnchorPoint(0, 0);
            self.addChild(pointer);
        };
        __egretProto__.showAction = function () {
            var self = this;
            var circle = self.circle, pointer = self.pointer;
            circle.setScale(1);
            circle.setPosition(0, 0);
            var rf = mo.repeatForever(mo.sequence(mo.scaleTo(0.4, 1.1), mo.scaleTo(0.4, 1)));
            circle.runAction(rf);
            var moveAround = mo.repeatForever(mo.sequence(mo.moveBy(0.8, mo.p(30, 30)), mo.moveBy(0.5, mo.p(-30, -30))));
            pointer.runAction(moveAround);
        };
        GuideFinger.__className = "GuideFinger";
        GuideFinger.POINT_POS_LEFT_TOP = "t"; //左上
        GuideFinger.POINT_POS_RIGHT_TOP = "r"; //右上
        GuideFinger.POINT_POS_LEFT_BOTTOM = "l"; //左下
        GuideFinger.POINT_POS_RIGHT_BOTTOM = "b"; //右下
        return GuideFinger;
    })(mo.UIWidget);
    uw.GuideFinger = GuideFinger;
    GuideFinger.prototype.__class__ = "uw.GuideFinger";
})(uw || (uw = {}));

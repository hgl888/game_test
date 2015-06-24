/**
* Created by csx on 14/12/17.
*/
var uw;
(function (uw) {
    var Unit_ShowGainTips = (function (_super) {
        __extends(Unit_ShowGainTips, _super);
        function Unit_ShowGainTips() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = Unit_ShowGainTips.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._infoJsonPath = "ui/uiGainTips.ui";
            self._interval = 800;
        };
        __egretProto__.createNode = function (obj) {
            var self = this;
            var tempId = obj.tempId;
            var count = obj.count;
            var gainTip = mo.uiReader.genWidget(self._infoJsonPath);
            gainTip.setPosition(mo.visibleRect.center());
            gainTip.setAnchorPoint(0.5, 0.5);
            gainTip.setScale(0.3);
            gainTip.setOpacity(100);
            self.addChild(gainTip);
            //            var topTray = mo.runningScene.topTray;
            //            topTray.addNode(gainTip);
            var labelName = gainTip.getWidgetByName("labelName");
            var labelCount = gainTip.getWidgetByName("labelCount");
            var icon = gainTip.getWidgetByName("icon");
            labelName.setText("这是一个名字");
            labelName.enableStroke(cc.c3b(0, 0, 0), 3);
            labelCount.setText("x" + count);
            labelCount.enableStroke(cc.c3b(0, 0, 0), 3);
            var seq = mo.sequence(mo.spawn(mo.scaleTo(0.3, 1).setEase(mo.Ease.backOut), mo.fadeIn(0.3)), mo.delayTime(0.35), mo.moveBy(1.5, mo.p(0, -300)), mo.spawn(mo.moveBy(0.5, mo.p(0, -100)), mo.fadeOut(0.5)), mo.callFunc(function (sender) {
                sender.removeFromParent(true);
                self.isNeedToClose();
            }, self));
            gainTip.runAction(seq);
        };
        Unit_ShowGainTips.__className = "Unit_ShowGainTips";
        return Unit_ShowGainTips;
    })(uw.Unit_TipsLayer);
    uw.Unit_ShowGainTips = Unit_ShowGainTips;
    Unit_ShowGainTips.prototype.__class__ = "uw.Unit_ShowGainTips";
})(uw || (uw = {}));

/**
* Created by csx on 14/12/17.
*/
var uw;
(function (uw) {
    var ShowGainTips = (function (_super) {
        __extends(ShowGainTips, _super);
        function ShowGainTips() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ShowGainTips.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._infoJsonPath = res.uiGainTips_ui;
            self._interval = 800;
        };
        __egretProto__.createNode = function (obj) {
            var self = this;
            var tempId = obj.tempId;
            var count = obj.count;
            var temp = mo.getJSONWithFileNameAndID(uw.cfg_t_item, tempId);
            var name = temp[uw.t_item_name];
            var color = self.getItemColor(tempId, temp);
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
            var iconPath = resHelper.getItemIconPath(tempId);
            icon.loadTexture(iconPath);
            labelName.setText(name);
            labelName.setColor(color);
            labelName.enableStroke(cc.c3b(0, 0, 0), 3);
            labelCount.setText("x" + count);
            labelCount.enableStroke(cc.c3b(0, 0, 0), 3);
            var seq = mo.sequence(mo.spawn(mo.scaleTo(0.3, 1).setEase(mo.Ease.backOut), mo.fadeIn(0.3)), mo.delayTime(0.35), mo.moveBy(1.5, mo.p(0, -300)), mo.spawn(mo.moveBy(0.5, mo.p(0, -100)), mo.fadeOut(0.5)), mo.callFunc(function (sender) {
                sender.removeFromParent(true);
                self.isNeedToClose();
            }, self));
            gainTip.runAction(seq);
        };
        __egretProto__.getItemColor = function (tempId, temp) {
            if (tempId == uw.c_prop.spItemIdKey.gold) {
                return cc.c3b(255, 202, 109);
            }
            else if (tempId == uw.c_prop.spItemIdKey.diamond) {
                return cc.c3b(109, 209, 255);
            }
            else {
                return uw.getColorByQuality(temp[uw.t_item_quality]);
            }
        };
        ShowGainTips.__className = "ShowGainTips";
        return ShowGainTips;
    })(uw.TipsLayer);
    uw.ShowGainTips = ShowGainTips;
    ShowGainTips.prototype.__class__ = "uw.ShowGainTips";
})(uw || (uw = {}));

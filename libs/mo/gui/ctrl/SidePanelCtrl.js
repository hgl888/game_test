/**
 * Created by lihex on 12/19/14.
 */
var mo;
(function (mo) {
    var SidePanelCtrl = (function (_super) {
        __extends(SidePanelCtrl, _super);
        function SidePanelCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SidePanelCtrl.prototype;
        //@override
        __egretProto__.init = function (widget, leftPanelName, rightPanelName, splitWidth) {
            var self = this;
            self.actionEventType = gEventType.slidePanel;
            self.widget = widget;
            var leftPanel = self._leftPanel = widget.getWidgetByName(leftPanelName);
            var rightPanel = self._rightPanel = widget.getWidgetByName(rightPanelName);
            var sizeOfLeftPanel = self._leftSize = leftPanel.getSize();
            var sizeOfRightPanel = self._rightSize = rightPanel.getSize();
            var designPosOfLeftPanel = leftPanel.getPosition();
            var designPosOfRightPanel = rightPanel.getPosition();
            var size = widget.getSize ? widget.getSize() : widget.getContentSize();
            var splitWidth2 = (size.width - sizeOfLeftPanel.width - sizeOfRightPanel.width - splitWidth) / 2;
            var distance1 = splitWidth2;
            var distance2 = splitWidth + splitWidth2 + sizeOfLeftPanel.width;
            self._leftDesignPos = mo.p(distance1, designPosOfLeftPanel.y);
            self._rightDesignPos = mo.p(distance2, designPosOfRightPanel.y);
            self._hiddenPos = mo.p(-sizeOfLeftPanel.width, designPosOfLeftPanel.y);
            self._center = mo.p(size.width / 2 - sizeOfRightPanel.width / 2, designPosOfRightPanel.y);
            self.reset();
        };
        __egretProto__.reset = function () {
            var self = this;
            self.isRightBack = true;
            self._leftPanel.setPosition(self._hiddenPos);
            self._rightPanel.setPosition(self._center);
            self._leftPanel.setVisible(false);
        };
        __egretProto__.runRight = function (cb, target) {
            var self = this;
            var pos = self.isRightBack ? self._rightDesignPos : self._center;
            var act = mo.moveTo(0.25, pos).setEase(mo.Ease.backOut);
            act = mo.sequence(act, mo.callFunc(function () {
                self.isRightBack = !self.isRightBack;
                if (cb) {
                    cb.apply(target);
                }
            }, this));
            self._rightPanel.runAction(act);
        };
        __egretProto__.leftIn = function (cb, target) {
            var self = this;
            var panel = self._leftPanel;
            panel.setVisible(true);
            var act = mo.moveTo(0.25, self._leftDesignPos).setEase(mo.Ease.backOut);
            act = mo.sequence(act, mo.callFunc(function () {
                mo.dispatchEvent([[mo.actionDispatcher, self.actionEventType]], function () {
                    if (cb) {
                        cb.apply(target);
                    }
                }, self);
            }, self));
            panel.runAction(act);
        };
        __egretProto__.leftOut = function (cb, target) {
            var self = this;
            var panel = self._leftPanel;
            var act = mo.moveTo(0.25, self._hiddenPos).setEase(mo.Ease.sineInOut);
            act = mo.sequence(act, mo.callFunc(function () {
                panel.setVisible(false);
                if (cb) {
                    cb.apply(target);
                }
            }, self));
            panel.runAction(act);
        };
        SidePanelCtrl.__className = "SidePanelCtrl";
        return SidePanelCtrl;
    })(mo.Class);
    mo.SidePanelCtrl = SidePanelCtrl;
    SidePanelCtrl.prototype.__class__ = "mo.SidePanelCtrl";
})(mo || (mo = {}));

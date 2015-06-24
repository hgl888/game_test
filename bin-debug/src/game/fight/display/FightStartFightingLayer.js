var uw;
(function (uw) {
    var FightStartFightingLayer = (function (_super) {
        __extends(FightStartFightingLayer, _super);
        function FightStartFightingLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightStartFightingLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._jsonPath = res.uiFightStartLayer_ui;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            self._bg = self.getWidgetByName("bgImg");
            self._circle = self.getWidgetByName("circle");
            self._title = self.getWidgetByName("ready");
            //            self._circle.setHighLight();
            self.initWidget();
        };
        __egretProto__.initWidget = function () {
            var self = this;
            self._title.setVisible(true);
            self._title.setOpacity(0);
            self._title.setScale(1.5);
            self._circle.setVisible(true);
            self._circle.setOpacity(0);
            self._circle.setScale(1.5);
            self._circle.setRotation(0);
        };
        __egretProto__.showAction = function () {
            var self = this;
            self.show();
            self.initWidget();
            var t = 0.2;
            var seq = mo.sequence(mo.spawn(mo.scaleTo(t, 1).setEase(mo.Ease.sineOut), mo.fadeIn(t)), mo.delayTime(0.65), mo.callFunc(self.hideAction, this));
            self._title.runAction(seq);
            seq = mo.sequence(mo.delayTime(0.1), mo.spawn(mo.scaleTo(t, 1).setEase(mo.Ease.sineOut), mo.fadeIn(t)));
            self._circle.runAction(seq);
            self._circle.runAction(mo.repeatForever(mo.rotateBy(6, 360)));
        };
        __egretProto__.hideAction = function () {
            var t = 0.2, self = this;
            var seq = mo.sequence(mo.spawn(mo.scaleTo(t, 1.5).setEase(mo.Ease.sineIn), mo.fadeOut(t)), mo.callFunc(function (sender) {
                sender.setVisible(false);
            }.bind(this)));
            self._title.runAction(seq);
            seq = mo.sequence(mo.delayTime(0.1), mo.spawn(mo.scaleTo(t, 1.5).setEase(mo.Ease.sineIn), mo.fadeOut(t)), mo.callFunc(function (sender) {
                sender.setVisible(false);
            }.bind(this)), mo.callFunc(self.doCallback, this));
            self._circle.runAction(seq);
        };
        __egretProto__.doCallback = function () {
            var self = this;
            var seq = mo.sequence(mo.fadeOut(0.2), mo.callFunc(function (sender) {
                self.hide();
            }, self));
            self._bg.runAction(seq);
        };
        __egretProto__.reset = function () {
            var self = this;
            self._bg.setOpacity(100);
            self._title.setVisible(false);
            self._circle.setVisible(false);
        };
        FightStartFightingLayer.__className = "FightStartFightingLayer";
        return FightStartFightingLayer;
    })(mo.MenuLayer);
    uw.FightStartFightingLayer = FightStartFightingLayer;
    FightStartFightingLayer.prototype.__class__ = "uw.FightStartFightingLayer";
})(uw || (uw = {}));

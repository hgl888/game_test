var uw;
(function (uw) {
    var FightHeroCharm = (function (_super) {
        __extends(FightHeroCharm, _super);
        function FightHeroCharm() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightHeroCharm.prototype;
        __egretProto__.init = function (spriteFrameName) {
            _super.prototype.init.call(this);
            var self = this;
            self._charm = mo.UIImage.create();
            self._charm.loadTexture(spriteFrameName);
            //self._charm.setScale(0.8);
            self._charm.setOpacity(200);
            self._charm.setHighLight();
            self.addChild(self._charm);
            self.setScaleY(0.4);
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            this.showEffect();
        };
        __egretProto__.reset = function () {
            var self = this;
            self._charm.setOpacity(200);
            self._charm.setScale(1);
            self._charm.setRotation(0);
            self._charm.setVisible(true);
        };
        __egretProto__.showEffect = function () {
            var self = this;
            var act = mo.repeatForever(mo.rotateBy(6, 360));
            self._charm.runAction(act);
            self._charm.setOpacity(0);
            self._charm.setScale(0);
            var seq = mo.spawn(mo.scaleTo(0.3, 1).setEase(mo.Ease.backOut), mo.fadeTo(0.3, 200));
            self._charm.runAction(seq);
        };
        __egretProto__.hideEffect = function (selector, target) {
            var seq = mo.sequence(mo.spawn(mo.scaleBy(0.3, 1.6).setEase(mo.Ease.backIn), mo.fadeOut(0.3)), mo.callFunc(function (sender) {
                sender.stopAllActions();
                selector.call(target);
            }.bind(this)));
            this._charm.runAction(seq);
        };
        __egretProto__.removeSelf = function () {
            var self = this;
            self.hideEffect(function () {
                self.removeFromParent(true);
            }, self);
        };
        FightHeroCharm.__className = "uw_FightHeroCharmNode";
        return FightHeroCharm;
    })(mo.Node);
    uw.FightHeroCharm = FightHeroCharm;
    FightHeroCharm.prototype.__class__ = "uw.FightHeroCharm";
})(uw || (uw = {}));

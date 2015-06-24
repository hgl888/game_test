var uw;
(function (uw) {
    var FightHeroHaemalStrand = (function (_super) {
        __extends(FightHeroHaemalStrand, _super);
        function FightHeroHaemalStrand() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightHeroHaemalStrand.prototype;
        __egretProto__.init = function (isSelf) {
            var self = this;
            var frameName = isSelf ? res.ui_fight.inr_hp_png : res.ui_fight.inr_hp2_png;
            //进度条动作
            self._bloodProgress = mo.UILoadingBar.create();
            self._bloodProgress.loadTexture(frameName);
            self._bloodProgress.setAnchorPoint(0.5, 0.5);
            self.addChild(self._bloodProgress);
            self._bloodProgress.zOrder = 1;
            var bg = mo.UIImage.create();
            bg.loadTexture(res.ui_fight.blk_hp_png);
            bg.setAnchorPoint(0.5, 0.5);
            self.addChild(bg);
            self.setVisible(false);
        };
        __egretProto__.showBlood = function (oldHP, curHP, totleHP) {
            var self = this;
            self._bloodProgress.setPercent(curHP / totleHP * 100);
            self.setVisible(true);
            if (self._delayId == null) {
                self._delayId = mo.delayCall(1.5, function () {
                    self.setVisible(false);
                    self._delayId = null;
                }, this);
            }
            else {
                mo.clearDelayCall(self._delayId);
                self._delayId = mo.delayCall(1.5, function () {
                    self.setVisible(false);
                    self._delayId = null;
                }, this);
            }
        };
        __egretProto__.reset = function () {
            this._bloodProgress.setPercent(100);
        };
        FightHeroHaemalStrand.__className = "FightHeroHaemalStrand";
        return FightHeroHaemalStrand;
    })(mo.Node);
    uw.FightHeroHaemalStrand = FightHeroHaemalStrand;
    FightHeroHaemalStrand.prototype.__class__ = "uw.FightHeroHaemalStrand";
})(uw || (uw = {}));

var uw;
(function (uw) {
    var HeroScene = (function (_super) {
        __extends(HeroScene, _super);
        function HeroScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HeroScene.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._isShowResBarLayer = false;
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.heroListLayer = uw.UIHeroListLayer_new.create();
            self.heroListLayer.show();
        };
        HeroScene.__className = "HeroScene";
        return HeroScene;
    })(uw.ModuleScene);
    uw.HeroScene = HeroScene;
    HeroScene.prototype.__class__ = "uw.HeroScene";
})(uw || (uw = {}));

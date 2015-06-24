var uw;
(function (uw) {
    var ModuleScene = (function (_super) {
        __extends(ModuleScene, _super);
        function ModuleScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ModuleScene.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._isShowResBarLayer = true;
            self._isShowBackLayer = true;
        };
        __egretProto__.showResBarLayer = function () {
            var self = this;
            self.resBarLayer = uw.ResBarLayer.create();
            self.resBarLayer.show();
        };
        __egretProto__.showBackLayer = function () {
            var self = this;
            self.backLayer = uw.BackLayer.create();
            self.backLayer.show();
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            if (self._isShowResBarLayer) {
                self.showResBarLayer();
            }
            if (self._isShowBackLayer) {
                self.showBackLayer();
            }
        };
        ModuleScene.__className = "ModuleScene";
        return ModuleScene;
    })(mo.Scene);
    uw.ModuleScene = ModuleScene;
    ModuleScene.prototype.__class__ = "uw.ModuleScene";
})(uw || (uw = {}));

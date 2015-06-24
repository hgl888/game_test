var uw;
(function (uw) {
    var ExchangeScene = (function (_super) {
        __extends(ExchangeScene, _super);
        function ExchangeScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ExchangeScene.prototype;
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer = uw.ExchangeShopLayer.create();
            self.layer.show();
        };
        ExchangeScene.__className = "ExchangeScene";
        return ExchangeScene;
    })(uw.ModuleScene);
    uw.ExchangeScene = ExchangeScene;
    ExchangeScene.prototype.__class__ = "uw.ExchangeScene";
})(uw || (uw = {}));

var uw;
(function (uw) {
    var ForgeScene = (function (_super) {
        __extends(ForgeScene, _super);
        function ForgeScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ForgeScene.prototype;
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer = uw.ForgeLayer.create();
            self.layer.show();
        };
        ForgeScene.__className = "ForgeScene";
        return ForgeScene;
    })(uw.ModuleScene);
    uw.ForgeScene = ForgeScene;
    ForgeScene.prototype.__class__ = "uw.ForgeScene";
})(uw || (uw = {}));
var uw;
(function (uw) {
    var ForgeExchangeScene = (function (_super) {
        __extends(ForgeExchangeScene, _super);
        function ForgeExchangeScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ForgeExchangeScene.prototype;
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer = uw.ForgeExclusiveShop.create();
            self.layer.show();
        };
        ForgeExchangeScene.__className = "ForgeExchangeScene";
        return ForgeExchangeScene;
    })(uw.ModuleScene);
    uw.ForgeExchangeScene = ForgeExchangeScene;
    ForgeExchangeScene.prototype.__class__ = "uw.ForgeExchangeScene";
})(uw || (uw = {}));
var uw;
(function (uw) {
    var ForgeExclusiveScene = (function (_super) {
        __extends(ForgeExclusiveScene, _super);
        function ForgeExclusiveScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ForgeExclusiveScene.prototype;
        __egretProto__.init = function (defaultHeroCtrl) {
            var self = this;
            _super.prototype.init.call(this);
            self.defaultHeroCtrl = defaultHeroCtrl;
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer = uw.ForgeExclusiveLayer.create(self.defaultHeroCtrl);
            self.layer.show();
        };
        ForgeExclusiveScene.__className = "ForgeExclusiveScene";
        return ForgeExclusiveScene;
    })(uw.ModuleScene);
    uw.ForgeExclusiveScene = ForgeExclusiveScene;
    ForgeExclusiveScene.prototype.__class__ = "uw.ForgeExclusiveScene";
})(uw || (uw = {}));

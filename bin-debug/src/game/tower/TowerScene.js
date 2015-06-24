var uw;
(function (uw) {
    var TowerScene = (function (_super) {
        __extends(TowerScene, _super);
        function TowerScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TowerScene.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._isShowResBarLayer = false;
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer = uw.TowerLayer.create();
            self.layer.show();
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            uw.TowerDataCtrl.purgeInstance();
            uw.towerDataCtrl = null;
        };
        TowerScene.preload = function (cb) {
            uw.TowerDataCtrl.initByServer(cb);
        };
        TowerScene.__className = "TowerScene";
        return TowerScene;
    })(uw.ModuleScene);
    uw.TowerScene = TowerScene;
    TowerScene.prototype.__class__ = "uw.TowerScene";
})(uw || (uw = {}));

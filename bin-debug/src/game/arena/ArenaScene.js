var uw;
(function (uw) {
    var ArenaScene = (function (_super) {
        __extends(ArenaScene, _super);
        function ArenaScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ArenaScene.prototype;
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var arenaLayer = uw.ArenaLayer.create();
            arenaLayer.show();
        };
        ArenaScene.preload = function (cb) {
            uw.ArenaDataCtrl.initByServer(cb);
        };
        ArenaScene.__className = "ArenaScene";
        return ArenaScene;
    })(uw.ModuleScene);
    uw.ArenaScene = ArenaScene;
    ArenaScene.prototype.__class__ = "uw.ArenaScene";
})(uw || (uw = {}));

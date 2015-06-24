var uw;
(function (uw) {
    var MirrorScene = (function (_super) {
        __extends(MirrorScene, _super);
        function MirrorScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MirrorScene.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._isShowResBarLayer = false;
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer = uw.MirrorLayer.create();
            self.layer.show();
        };
        MirrorScene.__className = "MirrorScene";
        return MirrorScene;
    })(uw.ModuleScene);
    uw.MirrorScene = MirrorScene;
    MirrorScene.prototype.__class__ = "uw.MirrorScene";
})(uw || (uw = {}));

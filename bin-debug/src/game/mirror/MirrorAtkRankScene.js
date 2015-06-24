/**
 * Created by lihex on 1/8/15.
 */
var uw;
(function (uw) {
    var MirrorAtkRankScene = (function (_super) {
        __extends(MirrorAtkRankScene, _super);
        function MirrorAtkRankScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MirrorAtkRankScene.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._isShowResBarLayer = false;
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer = uw.MirrorAtkRankLayer.create();
            self.layer.show();
        };
        MirrorAtkRankScene.__className = "MirrorAtkRankScene";
        return MirrorAtkRankScene;
    })(uw.ModuleScene);
    uw.MirrorAtkRankScene = MirrorAtkRankScene;
    MirrorAtkRankScene.prototype.__class__ = "uw.MirrorAtkRankScene";
})(uw || (uw = {}));

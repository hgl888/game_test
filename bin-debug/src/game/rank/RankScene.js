var uw;
(function (uw) {
    var RankScene = (function (_super) {
        __extends(RankScene, _super);
        function RankScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = RankScene.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._isShowResBarLayer = false;
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer = uw.RankLayer.create();
            self.layer.show();
        };
        RankScene.__className = "RankScene";
        return RankScene;
    })(uw.ModuleScene);
    uw.RankScene = RankScene;
    RankScene.prototype.__class__ = "uw.RankScene";
})(uw || (uw = {}));

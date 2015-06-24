/**
 * Created by lihex on 12/17/14.
 */
var uw;
(function (uw) {
    var BagScene = (function (_super) {
        __extends(BagScene, _super);
        function BagScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = BagScene.prototype;
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.bagLayer = uw.BagLayer.create();
            self.bagLayer.show();
        };
        BagScene.__className = "BagScene";
        return BagScene;
    })(uw.ModuleScene);
    uw.BagScene = BagScene;
    BagScene.prototype.__class__ = "uw.BagScene";
})(uw || (uw = {}));

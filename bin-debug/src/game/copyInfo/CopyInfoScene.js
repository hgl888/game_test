var uw;
(function (uw) {
    var CopyInfoScene = (function (_super) {
        __extends(CopyInfoScene, _super);
        function CopyInfoScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = CopyInfoScene.prototype;
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self.copyLayer = uw.CopyInfoLayer.create();
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.copyLayer.show();
        };
        CopyInfoScene.__className = "CopyInfoScene";
        return CopyInfoScene;
    })(uw.ModuleScene);
    uw.CopyInfoScene = CopyInfoScene;
    CopyInfoScene.prototype.__class__ = "uw.CopyInfoScene";
})(uw || (uw = {}));

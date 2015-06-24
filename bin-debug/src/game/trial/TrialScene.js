var uw;
(function (uw) {
    var TrialScene = (function (_super) {
        __extends(TrialScene, _super);
        function TrialScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TrialScene.prototype;
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this;
            _super.prototype.init.call(this);
            self.layer = uw.UITrialPCopyLayer.create();
            if (args && args.length > 0) {
                self.layer._oldCurPCopyIndex = args[0];
            }
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer.show();
        };
        TrialScene.__className = "TrialScene";
        return TrialScene;
    })(uw.ModuleScene);
    uw.TrialScene = TrialScene;
    TrialScene.prototype.__class__ = "uw.TrialScene";
})(uw || (uw = {}));

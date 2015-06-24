var uw;
(function (uw) {
    var SecretTuneScene = (function (_super) {
        __extends(SecretTuneScene, _super);
        function SecretTuneScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SecretTuneScene.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._isShowResBarLayer = false;
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.secretTuneLayer = uw.SecretTuneLayer.create();
            self.secretTuneLayer.show();
        };
        SecretTuneScene.__className = "SecretTuneScene";
        return SecretTuneScene;
    })(uw.ModuleScene);
    uw.SecretTuneScene = SecretTuneScene;
    SecretTuneScene.prototype.__class__ = "uw.SecretTuneScene";
})(uw || (uw = {}));

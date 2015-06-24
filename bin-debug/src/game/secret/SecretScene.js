var uw;
(function (uw) {
    var SecretScene = (function (_super) {
        __extends(SecretScene, _super);
        function SecretScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SecretScene.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._isShowResBarLayer = false;
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this;
            _super.prototype.init.call(this);
            self.args = args;
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer = uw.SecretLayer.create.apply(uw.SecretLayer, self.args);
            self.layer.show();
        };
        SecretScene.__className = "SecretScene";
        return SecretScene;
    })(uw.ModuleScene);
    uw.SecretScene = SecretScene;
    SecretScene.prototype.__class__ = "uw.SecretScene";
})(uw || (uw = {}));

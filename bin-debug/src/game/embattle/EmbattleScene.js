var uw;
(function (uw) {
    var EmbattleScene = (function (_super) {
        __extends(EmbattleScene, _super);
        function EmbattleScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EmbattleScene.prototype;
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
            _super.prototype.init.call(this);
            var self = this;
            self.layer = uw.EmbattleLayer.create.apply(uw.EmbattleLayer, args);
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer.show();
            //统计是否进入了布阵
            uw.RecordDataCtrl.addLoadRecord(uw.id_c_loadModule.embattle);
        };
        EmbattleScene.__className = "EmbattleScene";
        return EmbattleScene;
    })(uw.ModuleScene);
    uw.EmbattleScene = EmbattleScene;
    EmbattleScene.prototype.__class__ = "uw.EmbattleScene";
})(uw || (uw = {}));

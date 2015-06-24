var uw;
(function (uw) {
    var CopyScene = (function (_super) {
        __extends(CopyScene, _super);
        function CopyScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = CopyScene.prototype;
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
            self.layer = uw.CopyLayer.create.apply(uw.CopyLayer, args);
            self.fromWhere = args[args.length - 1];
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer.show();
            //统计是否进入了副本
            uw.RecordDataCtrl.addLoadRecord(uw.id_c_loadModule.copy);
        };
        CopyScene.preload = function (cb) {
            var primaryData = mo.getJSONWithFileName(uw.cfg_t_copyPrimary), primaryInfo, fileName, resList = [];
            for (var key in primaryData) {
                primaryInfo = primaryData[key];
                fileName = primaryInfo[uw.t_copyPrimary_file];
                if (fileName) {
                    resList.push(resHelper.getMapJsonPath(primaryInfo[uw.t_copyPrimary_file]));
                }
            }
            mo.load(resList, cb);
        };
        CopyScene.__className = "CopyScene";
        return CopyScene;
    })(uw.ModuleScene);
    uw.CopyScene = CopyScene;
    CopyScene.prototype.__class__ = "uw.CopyScene";
})(uw || (uw = {}));

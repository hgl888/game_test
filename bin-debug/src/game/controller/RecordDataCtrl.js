var uw;
(function (uw) {
    var RecordDataCtrl = (function (_super) {
        __extends(RecordDataCtrl, _super);
        function RecordDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = RecordDataCtrl.prototype;
        __egretProto__.init = function (data) {
            _super.prototype.init.call(this, data);
            var self = this;
        };
        RecordDataCtrl.__className = "RecordDataCtrl";
        /**
         * 初始化
         */
        RecordDataCtrl.addLoadRecordWithoutLogined = function (moduleId) {
            var self = this;
            var argsObj = uw.iface.h_gameRecord_addLoadRecord_args, args = {};
            args[argsObj.moduleId] = moduleId;
            args[argsObj.deviceId] = mo.getDeviceId();
            args[argsObj.channelId] = mo.project.channelId;
            mo.request4Http(uw.iface.h_gameRecord_addLoadRecord, args, function (data) {
                uw.log("进入模块moduleId:" + moduleId);
            });
        };
        RecordDataCtrl.addLoadRecord = function (moduleId) {
            var moduleData = mo.getJSONWithFileNameAndID(uw.cfg_c_loadModule, moduleId);
            if (moduleData[uw.c_loadModule_type] == 0) {
                RecordDataCtrl.addLoadRecordWithoutLogined(moduleId);
            }
            else {
                var argsObj = uw.iface.a_userRecord_addLoadRecord_args, args = {};
                args[argsObj.moduleId] = moduleId;
                mo.request(uw.iface.a_userRecord_addLoadRecord, args, function (data) {
                    uw.log("进入模块moduleId:" + moduleId);
                });
            }
        };
        return RecordDataCtrl;
    })(mo.DataController);
    uw.RecordDataCtrl = RecordDataCtrl;
    RecordDataCtrl.prototype.__class__ = "uw.RecordDataCtrl";
    uw.recordDataCtrl;
})(uw || (uw = {}));

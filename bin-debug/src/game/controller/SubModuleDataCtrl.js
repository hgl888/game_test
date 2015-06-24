var uw;
(function (uw) {
    var SubModuleDataCtrl = (function (_super) {
        __extends(SubModuleDataCtrl, _super);
        function SubModuleDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SubModuleDataCtrl.prototype;
        __egretProto__._initProp = function () {
            var self = this;
            _super.prototype._initProp.call(this);
            self.lockModules = [];
            self.unlockModules = {};
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this, null);
            var data, self = this;
            var moduleConfig = uw.ModuleConfig;
            for (var moduleName in moduleConfig) {
                data = moduleConfig[moduleName];
                if (self.checkUnlock(data)) {
                    if (!self.unlockModules[data.posType]) {
                        self.unlockModules[data.posType] = [];
                    }
                    self.unlockModules[data.posType].push(data);
                }
                else {
                    self.lockModules.push(data);
                }
            }
            self._sortModules(self.unlockModules[uw.PosType.Left]);
            self._sortModules(self.unlockModules[uw.PosType.BottomRight]);
            self._sortModules(self.unlockModules[uw.PosType.Bottom]);
        };
        __egretProto__.getAllBuildingModules = function () {
            var data, self = this;
            var moduleConfig = uw.ModuleConfig, arr = [];
            for (var moduleName in moduleConfig) {
                data = moduleConfig[moduleName];
                if (data.posType == uw.PosType.Building) {
                    arr.push(data);
                }
            }
            return arr;
        };
        __egretProto__._sortModules = function (arr) {
            if (!arr)
                return;
            arr.sort(function (a, b) {
                return a.index > b.index;
            });
        };
        __egretProto__.checkUnlock = function (data, isNew) {
            var self = this;
            var openData = mo.getJSONWithFileName(uw.cfg_c_open);
            var lvlRequired, myLevel = uw.userDataCtrl.getLvl();
            if (data.openId == 0) {
                lvlRequired = 0;
            }
            else {
                lvlRequired = openData[data.openId][uw.c_open_lvlRequired];
            }
            if (isNew) {
                return (myLevel >= lvlRequired) && (self.lockModules.indexOf(data) != -1);
            }
            else {
                return myLevel >= lvlRequired;
            }
        };
        __egretProto__.unlockByModules = function (needToUnlockModules) {
            var mod;
            var self = this, arr;
            for (var i = 0; i < needToUnlockModules.length; i++) {
                mod = needToUnlockModules[i];
                if (self.lockModules.indexOf(mod) != -1) {
                    mo.ArrayRemoveObject(self.lockModules, mod);
                    arr = self.unlockModules[mod.posType];
                    arr.push(mod);
                    self._sortModules(arr);
                }
            }
        };
        __egretProto__.findUnlockModules = function () {
            var self = this;
            var menuModules = self.findUnlockMenuModules();
            var buildingModules = self.findUnlockBuildingModules();
            return menuModules.concat(buildingModules);
        };
        __egretProto__.findUnlockMenuModules = function () {
            //找出哪些模块准备要开启了
            var willOpenArr = [];
            var self = this;
            var moduleConfig = uw.ModuleConfig, data;
            for (var moduleName in moduleConfig) {
                data = moduleConfig[moduleName];
                if (data.posType == uw.PosType.BottomRight || data.posType == uw.PosType.Bottom || data.posType == uw.PosType.Top || data.posType == uw.PosType.Left) {
                    if (self.checkUnlock(data, true)) {
                        willOpenArr.push(data);
                    }
                }
            }
            return willOpenArr;
        };
        __egretProto__.findUnlockBuildingModules = function () {
            var willOpenArr = [];
            var self = this;
            var moduleConfig = uw.ModuleConfig, data;
            for (var moduleName in moduleConfig) {
                data = moduleConfig[moduleName];
                if (data.posType == uw.PosType.Building) {
                    if (self.checkUnlock(data, true)) {
                        willOpenArr.push(data);
                    }
                }
            }
            return willOpenArr;
        };
        SubModuleDataCtrl.__className = "SubModuleDataCtrl";
        SubModuleDataCtrl.initSubModule = function () {
            uw.subModuleDataCtrl = uw.SubModuleDataCtrl.create();
        };
        return SubModuleDataCtrl;
    })(mo.DataController);
    uw.SubModuleDataCtrl = SubModuleDataCtrl;
    SubModuleDataCtrl.prototype.__class__ = "uw.SubModuleDataCtrl";
    uw.subModuleDataCtrl;
})(uw || (uw = {}));

/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var RespAndTempDataCtrl = (function (_super) {
        __extends(RespAndTempDataCtrl, _super);
        function RespAndTempDataCtrl() {
            _super.call(this);
        }
        var __egretProto__ = RespAndTempDataCtrl.prototype;
        __egretProto__.init = function (data, temp) {
            _super.prototype.init.call(this, data);
            var self = this;
            if (data) {
                var tempDataMap = mo.getJSONWithFileName(self._tempCfgName);
                self.id = data[self._idKey];
                self.tempId = data[self._tempIdKey];
                self._temp = tempDataMap[self.tempId];
                self.isTempOnly = false;
            }
            else {
                self._temp = temp;
                self.isTempOnly = true;
            }
        };
        __egretProto__.getTempValue = function (key) {
            return this._temp[key];
        };
        RespAndTempDataCtrl.__className = "RespAndTempDataCtrl";
        return RespAndTempDataCtrl;
    })(mo.DataController);
    uw.RespAndTempDataCtrl = RespAndTempDataCtrl;
    RespAndTempDataCtrl.prototype.__class__ = "uw.RespAndTempDataCtrl";
})(uw || (uw = {}));

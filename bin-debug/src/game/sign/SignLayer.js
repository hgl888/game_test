/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SignLayer = (function (_super) {
        __extends(SignLayer, _super);
        function SignLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SignLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiSignLayer_ui;
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self._gridScrollView = self._createGridScrollView("gridViewContainer", uw.SignItem, 5, this._onCellDataSource);
            self.refreshData();
        };
        __egretProto__._onCellDataSource = function (cell, index) {
            var self = this;
            var info = this._data[index];
            cell.setDelegate(this);
            cell.resetByData(info, index, self._signCount, self._signed);
        };
        __egretProto__.refreshData = function () {
            var self = this;
            var signDataCtrl = uw.signDataCtrl;
            self._data = signDataCtrl.getSignItems();
            self._signCount = signDataCtrl.getSignNum();
            self._signed = signDataCtrl.isTodaySigned();
            self.setInfoByName("signCount", self._signCount);
            this._gridScrollView.setTotalCount(self._data.length);
        };
        __egretProto__.scrollToLastest = function (index) {
            var self = this;
            process.nextTick(function () {
                self._gridScrollView.scrollToItem(index);
            }, self);
        };
        SignLayer.__className = "SignLayer";
        return SignLayer;
    })(mo.UIModalLayer);
    uw.SignLayer = SignLayer;
    SignLayer.prototype.__class__ = "uw.SignLayer";
})(uw || (uw = {}));

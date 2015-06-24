/**
 * Created by lihex on 6/28/14.
 */
var uw;
(function (uw) {
    var PickDataCtrl = (function (_super) {
        __extends(PickDataCtrl, _super);
        function PickDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = PickDataCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.pickCount = 0;
            self.totalCount = 0;
            self._isBindBagDataCtrl = false;
        };
        __egretProto__.init = function (dataCtrl, pickupCount) {
            var self = this;
            _super.prototype.init.call(this);
            self.dataCtrl = dataCtrl;
            self.pickCount = pickupCount;
            self.totalCount = dataCtrl.getCount();
            self._isBindBagDataCtrl = dataCtrl instanceof uw.BagDataCtrl;
        };
        __egretProto__._changePickCount = function (num) {
            var self = this;
            var curCount = this.pickCount;
            curCount += num;
            curCount = curCount < 0 ? 0 : curCount;
            var ownCount = self.totalCount;
            curCount = curCount > ownCount ? ownCount : curCount;
            return self._setPickCount(curCount);
        };
        __egretProto__._setPickCount = function (count) {
            var self = this;
            if (self.pickCount != count) {
                self.pushNotify(self.__class.ON_PICK_COUNT_CHANGED, count, self.totalCount);
            }
            self.pickCount = count;
        };
        __egretProto__.pick = function (num) {
            if (num === void 0) { num = 1; }
            num = num || 1;
            return this._changePickCount(num);
        };
        __egretProto__.unpick = function (num) {
            if (num === void 0) { num = 1; }
            num = num || 1;
            return this._changePickCount(-num);
        };
        __egretProto__.unpickAll = function () {
            if (this.pickCount > 0)
                return this.unpick(this.pickCount);
        };
        __egretProto__.isBindBagDataCtrl = function () {
            return this._isBindBagDataCtrl;
        };
        __egretProto__.pickUpTest = function (num) {
            if (num === void 0) { num = 1; }
            num = num || 1;
            var count = (this.pickCount + num);
            return count <= this.totalCount && count >= 0;
        };
        /**
         * 移除已经选择数量的物品
         * @returns {number}
         */
        __egretProto__.removeAllPickup = function () {
            var self = this;
            self.totalCount -= self.pickCount;
            self._setPickCount(0);
            return self.totalCount;
        };
        PickDataCtrl.__className = "PickDataCtrl";
        PickDataCtrl.ON_PICK_COUNT_CHANGED = "onPickCountChanged";
        return PickDataCtrl;
    })(mo.DataController);
    uw.PickDataCtrl = PickDataCtrl;
    PickDataCtrl.prototype.__class__ = "uw.PickDataCtrl";
})(uw || (uw = {}));

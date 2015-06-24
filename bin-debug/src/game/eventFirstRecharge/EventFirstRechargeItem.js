/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var EventFirstRechargeItem = (function (_super) {
        __extends(EventFirstRechargeItem, _super);
        function EventFirstRechargeItem() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EventFirstRechargeItem.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            var size = mo.size(270, 270);
            self.setSize(size);
            self.setCellSize(size);
            self._container = mo.UIPanel.create();
            self._container.setSize(mo.size(size.width - 30, size.height - 30));
            self._container.setAnchorPoint(0.5, 0.5);
            self._container.setPosition(size.width / 2, size.height / 2);
            self.addChild(self._container);
        };
        __egretProto__.resetByData = function (data) {
            var self = this;
            var type = data.type;
            var tempId = data.tempId;
            var count = data.count;
            if (type == 0) {
                var ctrl = uw.UIHeroIconCtrl.create(self._container, tempId);
                ctrl.showTip(true);
            }
            else {
                var ctrl = uw.UIItemIconCtrl.create(self._container, tempId);
                ctrl.setCount(count);
                ctrl.showTip(true);
            }
        };
        EventFirstRechargeItem.__className = "EventFirstRechargeItem";
        return EventFirstRechargeItem;
    })(mo.GridViewCell);
    uw.EventFirstRechargeItem = EventFirstRechargeItem;
    EventFirstRechargeItem.prototype.__class__ = "uw.EventFirstRechargeItem";
})(uw || (uw = {}));

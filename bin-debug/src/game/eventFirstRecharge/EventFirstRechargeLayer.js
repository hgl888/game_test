var uw;
(function (uw) {
    var EventFirstRechargeLayer = (function (_super) {
        __extends(EventFirstRechargeLayer, _super);
        function EventFirstRechargeLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EventFirstRechargeLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiEventFirstRechargeLayer_ui;
            self._data = [];
        };
        __egretProto__.init = function (result) {
            _super.prototype.init.call(this);
            var self = this;
            self.onClickByName("btnClose", self.close, self);
            self.onClickByName(EventFirstRechargeLayer.BTN_GET_AWARD, self.menuGetAward, self);
            self.onClickByName(EventFirstRechargeLayer.BTN_GOTO_Charge, self.menuGotoRecharge, self);
            if (!result)
                return;
            //设置物品
            var activityItems = result.items[0];
            //英雄
            var heroTempId = activityItems[uw.dsConsts.ActivityItem.heroTempId];
            var obj = {
                type: 0,
                tempId: heroTempId,
                count: 1
            };
            self._data.push(obj);
            //物品
            var itemsObject = activityItems[uw.dsConsts.ActivityItem.items];
            var count;
            for (var tempId in itemsObject) {
                var obj = {
                    type: 1,
                    tempId: tempId,
                    count: itemsObject[tempId]
                };
                self._data.push(obj);
            }
            self._gridScrollView = self._createGridView(EventFirstRechargeLayer.PANEL_AWARD_LIST, uw.EventFirstRechargeItem, 3, this._onCellDataSource);
            self._gridScrollView.setTotalCount(self._data.length);
            self.setItemInfo();
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            var self = this;
            var dispatcher = mo.visibleDispatcher, eventType = uw.EventFirstRechargeLayer.__className;
            mo.addAfterEventListener(dispatcher, eventType, self.setItemInfo, self);
        };
        __egretProto__.setItemInfo = function () {
            var self = this;
            var hasRecharged = uw.userDataCtrl.hasRecharged();
            self.setGrayByName(EventFirstRechargeLayer.BTN_GET_AWARD, !hasRecharged);
            self.setTouchEnabledByName(EventFirstRechargeLayer.BTN_GET_AWARD, true);
        };
        __egretProto__.menuGetAward = function () {
            uw.userDataCtrl.receiveFirstRecharge(this.showResult, this);
        };
        __egretProto__.menuGotoRecharge = function () {
            uw.pushSubModule(uw.SubModule.Charge);
        };
        __egretProto__.showResult = function (result) {
            if (!result)
                return;
            var self = this;
            var layer = uw.LotteryResultLayer.create(0, 0, result);
            layer.blurMaskEnabled = true;
            layer.onClose(self.close, self);
            layer.show();
        };
        __egretProto__._onCellDataSource = function (cell, index) {
            var self = this;
            var info = self._data[index];
            cell.resetByData(info);
            cell.setDelegate(this);
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            var dispatcher = mo.visibleDispatcher, eventType = uw.EventFirstRechargeLayer.__className;
            mo.removeAfterEventListener(dispatcher, eventType, self.setItemInfo, self);
        };
        EventFirstRechargeLayer.__className = "EventFirstRechargeLayer";
        EventFirstRechargeLayer.PANEL_AWARD_LIST = "awardList";
        EventFirstRechargeLayer.BTN_GET_AWARD = "btnGetAward";
        EventFirstRechargeLayer.BTN_GOTO_Charge = "btnGotoCharge";
        return EventFirstRechargeLayer;
    })(mo.Dlg);
    uw.EventFirstRechargeLayer = EventFirstRechargeLayer;
    EventFirstRechargeLayer.prototype.__class__ = "uw.EventFirstRechargeLayer";
})(uw || (uw = {}));

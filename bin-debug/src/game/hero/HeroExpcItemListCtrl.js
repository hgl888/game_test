var uw;
(function (uw) {
    var HeroExpcItemListCtrl = (function (_super) {
        __extends(HeroExpcItemListCtrl, _super);
        function HeroExpcItemListCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HeroExpcItemListCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHeroExpcItemList_ui;
        };
        //@override
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            var expItems = uw.userDataCtrl.getItemInfoByType(uw.c_prop.itemTypeKey.heroExpItem);
            self._expItemList = uw.getRepeatedBagDataCtrlList(expItems);
            self._createGridScrollView("panel_list", uw.HeroExpcItemCell, 3, this._onItemCellDataSource, true);
            self._gridScrollView.ignoreNullCell(false);
            // 注册数量变化时间
            self.registerClassByKey(uw.BagDataCtrl, uw.BagDataCtrl.ON_COUNT_CHANGED, self._onItemCountChanged);
            self.registerClassByKey(uw.BagDataCtrl, uw.BagDataCtrl.ON_BATCH_USE_EXP_ITEM, self._onBatchUseExpItem); //英雄重置
            self.setVisibleByName(clazz.LABEL_USECOUNT, false);
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var itemCtrl = this._expItemList[index];
            cell.setName("HeroExpcItemCell_" + index);
            cell.resetByData(itemCtrl);
            cell.setHeroToBeUse(this._heroDataCtrl);
        };
        __egretProto__._onItemCountChanged = function (count, ctrl) {
            var self = this;
            if (count == 0) {
                mo.ArrayRemoveObject(self._expItemList, ctrl);
                self._gridScrollView.setTotalCount(self._expItemList.length);
            }
        };
        __egretProto__.resetByData = function (heroDataCtrl) {
            var self = this;
            self._heroDataCtrl = heroDataCtrl;
            self._gridScrollView.setTotalCount(self._expItemList.length);
        };
        __egretProto__._onBatchUseExpItem = function (opt) {
            var self = this, clazz = self.__class;
            if (opt) {
                // 显示使用量
                var useCountW = self.getWidgetByName(clazz.LABEL_USECOUNT);
                useCountW.setVisible(true);
                useCountW.stopAllActions();
                useCountW.setOpacity(255);
                useCountW.setScale(1);
                self.formatByName(clazz.LABEL_USECOUNT, opt.num);
                var action = mo.sequence(mo.scaleTo(0.1, 1.2), mo.scaleTo(0.2, 1), mo.fadeOut(1.5));
                useCountW.runAction(action);
            }
        };
        HeroExpcItemListCtrl.__className = "HeroExpcItemListCtrl";
        HeroExpcItemListCtrl.LABEL_USECOUNT = "label_useCount"; // 使用经验道具数量
        return HeroExpcItemListCtrl;
    })(mo.WidgetCtrl);
    uw.HeroExpcItemListCtrl = HeroExpcItemListCtrl;
    HeroExpcItemListCtrl.prototype.__class__ = "uw.HeroExpcItemListCtrl";
})(uw || (uw = {}));

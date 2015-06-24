var uw;
(function (uw) {
    var EventWonderfulLayer = (function (_super) {
        __extends(EventWonderfulLayer, _super);
        function EventWonderfulLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EventWonderfulLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiEventWonderfulLayer_ui;
            self._activityLayerCtrls = {};
            self._titImg = {};
            self._titImg[uw.c_prop.activityTiIconKey.limitBuy] = res.ui_event.tit_limit_png;
            self._titImg[uw.c_prop.activityTiIconKey.reCharge] = res.ui_event.tit_charge_png;
            self._titImg[uw.c_prop.activityTiIconKey.cost] = res.ui_event.tit_cost_png;
            self._titImg[uw.c_prop.activityTiIconKey.uplvl] = res.ui_event.tit_upLvl_png;
            self._titImg[uw.c_prop.activityTiIconKey.redeemCode] = res.ui_event.tit_redeem_png;
            self._titImg[uw.c_prop.activityTiIconKey.arena] = res.ui_event.tit_arena_png;
            self._titImg[uw.c_prop.activityTiIconKey.suggest] = res.ui_event.tit_suggest_png;
            self._titImg[uw.c_prop.activityTiIconKey.bug] = res.ui_event.tit_txtBug_png;
            self._titImg[uw.c_prop.activityTiIconKey.bigPrize] = res.ui_event.tit_bigPrize_png;
        };
        __egretProto__.init = function (result) {
            _super.prototype.init.apply(this, arguments);
            var self = this;
            self.onClickByName("btnClose", self.close, self);
            self._data = result;
            //初始化左侧滚动标签
            self._gridScrollView = self._createGridScrollView(EventWonderfulLayer.tabView, uw.EventWonderfulTabItem, 1, this._onTabCellDataSource);
            self._gridScrollView.bounceEnabled = false;
            self._gridScrollView.setTotalCount(self._data.length);
            self._gridScrollView.scrollEnabled = self._data.length > 4;
            process.nextTick(function () {
                if (self._data.length) {
                    self._onTabClick(self._gridScrollView.getCells()[0]);
                }
            });
        };
        __egretProto__._changeActivity = function (activityCtrl) {
            var self = this, clazz = self.__class;
            self._curActivityCtrl = activityCtrl;
            var DATA_KEY = activityCtrl.DATA_KEY;
            var activityType = activityCtrl.type;
            //是否需要更换layerCtrl
            var needChangLayerCtrl = self._curActivityType != activityType;
            self._curActivityType = activityType;
            var curCtrl = self._curActivityLayerCtrl;
            if (curCtrl && needChangLayerCtrl) {
                curCtrl.detachWidget();
                self._curActivityLayerCtrl = null;
            }
            //获取对应类型的layerCtrl
            var activityLayerCtrl = self._activityLayerCtrls[activityType];
            if (!activityLayerCtrl) {
                switch (activityType) {
                    case uw.c_prop.activityTypeKey.limitBuy:
                        activityLayerCtrl = uw.LimitActivityLayerCtrl.create();
                        break;
                    case uw.c_prop.activityTypeKey.dayChargeCount:
                    case uw.c_prop.activityTypeKey.allChargeCount:
                    case uw.c_prop.activityTypeKey.dayCostCount:
                    case uw.c_prop.activityTypeKey.allCostCount:
                        activityLayerCtrl = uw.ChargeActivityLayerCtrl.create();
                        break;
                    case uw.c_prop.activityTypeKey.upLvl:
                        activityLayerCtrl = uw.UpLvlActivityLayerCtrl.create();
                        break;
                    case uw.c_prop.activityTypeKey.redeemCode:
                        activityLayerCtrl = uw.RedeemCodeCtrl.create();
                        break;
                    case uw.c_prop.activityTypeKey.text:
                        activityLayerCtrl = uw.EventTextActivityLayerCtrl.create();
                        break;
                }
                if (activityLayerCtrl) {
                    activityLayerCtrl.isAutoDtor = false;
                    self._activityLayerCtrls[activityType] = activityLayerCtrl;
                }
            }
            //设置标题图片
            var panel_content = self.getWidgetByName("content");
            var tiIconType = activityCtrl.get(DATA_KEY.tiIconType);
            uw.log("----->tiIconType = %s", tiIconType);
            self.setInfoByName("title", self._titImg[tiIconType]);
            //设置数据
            if (activityLayerCtrl) {
                activityLayerCtrl.resetByData(activityCtrl);
                activityLayerCtrl.attachWidgetTo(panel_content);
            }
            self._curActivityLayerCtrl = activityLayerCtrl;
            self.doLayoutByName("content");
        };
        __egretProto__.updateData = function () {
            var self = this;
            uw.userDataCtrl.getMainActivityList(function (data) {
                self._data = data;
            }, this);
        };
        __egretProto__._onTabCellDataSource = function (cell, index) {
            var self = this;
            var activityCtrl = self._data[index];
            cell.setDelegate(self);
            cell.resetByData(activityCtrl);
            if (!cell.listenerInited) {
                cell.listenerInited = true;
                cell.setTouchEnabled(true);
                cell.onClick(self._onTabClick, self);
            }
        };
        __egretProto__._onTabClick = function (cell) {
            var self = this;
            var activityCtrl = cell._activityCtrl;
            var cells = self._gridScrollView.getCells();
            for (var i = 0, li = cells.length; i < li; i++) {
                cells[i].setFocused(false);
            }
            cell.setFocused(true);
            self._changeActivity(activityCtrl);
        };
        __egretProto__.dtor = function () {
            var self = this;
            for (var key in self._activityLayerCtrls) {
                self._activityLayerCtrls[key].doDtor();
            }
            _super.prototype.dtor.call(this);
        };
        EventWonderfulLayer.__className = "EventWonderfulLayer";
        EventWonderfulLayer.listView = "listView";
        EventWonderfulLayer.tabView = "tabView";
        return EventWonderfulLayer;
    })(mo.Dlg);
    uw.EventWonderfulLayer = EventWonderfulLayer;
    EventWonderfulLayer.prototype.__class__ = "uw.EventWonderfulLayer";
})(uw || (uw = {}));

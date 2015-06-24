/**
 * Created by lihex on 12/18/14.
 */
var uw;
(function (uw) {
    var __import;
    var BagQueryLayerCtrl = (function (_super) {
        __extends(BagQueryLayerCtrl, _super);
        function BagQueryLayerCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = BagQueryLayerCtrl.prototype;
        //@override
        __egretProto__.init = function () {
            var self = this;
            var clazz = self.__class;
            _super.prototype.init.call(this);
            self._initCtrl.apply(self, arguments);
            self._gridLayerCtrl.resetData();
            self.setDisappearedByName(clazz.BTN_CLOSE, true);
        };
        __egretProto__._onCellClick = function (ctrl) {
            var self = this;
            self._detailLayerCtrl.resetByData(ctrl);
            self._detailLayerCtrl.popInfoLayer();
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            self._gridLayerCtrl.doDtor();
            self._detailLayerCtrl.doDtor();
        };
        __egretProto__._initCtrl = function (from, opt) {
        };
        __egretProto__.setCurList = function (showType, option) {
        };
        BagQueryLayerCtrl.__className = "BagQueryLayerCtrl";
        BagQueryLayerCtrl.PANEL_ITEMS = "panel_items";
        BagQueryLayerCtrl.PANEL_INFO = "panel_info";
        BagQueryLayerCtrl.BTN_CLOSE = "btnClose";
        return BagQueryLayerCtrl;
    })(mo.WidgetCtrl);
    uw.BagQueryLayerCtrl = BagQueryLayerCtrl;
    BagQueryLayerCtrl.prototype.__class__ = "uw.BagQueryLayerCtrl";
    mo.impl(BagQueryLayerCtrl, uw._bagQueryCommonApi);
})(uw || (uw = {}));
var uw;
(function (uw) {
    var __import;
    var BagQueryLayerDlg = (function (_super) {
        __extends(BagQueryLayerDlg, _super);
        function BagQueryLayerDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = BagQueryLayerDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            var self = this;
            _super.prototype._initProp.call(this);
            self._closeWidgetName = this.__class.BTN_CLOSE;
            self._jsonPath = res.uiBagQueryLayer_ui;
        };
        //@override
        __egretProto__.init = function () {
            var self = this;
            var clazz = self.__class;
            _super.prototype.init.call(this);
            self._initCtrl.apply(self, arguments);
            self._gridLayerCtrl.resetData(true);
            self._sidePanelCtrl = mo.SidePanelCtrl.create(self, clazz.PANEL_INFO, clazz.PANEL_ITEMS, 100);
            self.registerClassByKey(uw.EquipDataCtrl, uw.EquipDataCtrl.ON_PUT_ON, self._onPutOn);
        };
        __egretProto__.onExit = function () {
            var self = this;
            _super.prototype.onExit.call(this);
            self._sidePanelCtrl.reset();
        };
        __egretProto__._onCellClick = function (ctrl) {
            var self = this;
            self._curCtrl = ctrl;
            self._detailLayerCtrl.resetByData(ctrl);
            if (self._sidePanelCtrl.isRightBack) {
                self._sidePanelCtrl.runRight(function () {
                    self._sidePanelCtrl.leftIn(function () {
                    }, self);
                });
            }
        };
        __egretProto__.onPutOn = function (cb, target) {
            this._onPutOnCb = cb;
            this._onPutOnCbTarget = target;
        };
        __egretProto__._onPutOn = function (ctrl) {
            var self = this;
            if (self._onPutOnCb) {
                self._onPutOnCb.call(self._onPutOnCbTarget, ctrl);
            }
            self.close();
        };
        /**
         * 根据模板， 滚动scrollview
         * @param tempId
         */
        __egretProto__.scrollToItem = function (tempId) {
            var self = this;
            var cols = 4;
            var visualRowCount = 5;
            var data = self._gridLayerCtrl._curItems;
            var totalRow = Math.ceil(data.length / cols);
            for (var i = 0, li = data.length; i < li; i++) {
                var id = data[i].tempId;
                if (id == tempId) {
                    var row = Math.ceil(i / cols);
                    if (row >= visualRowCount) {
                        self._gridScrollView.jumpToPercentVertical((row - (visualRowCount - 1)) / (totalRow - visualRowCount) * 100);
                    }
                    else {
                        self._gridScrollView.jumpToPercentVertical(0);
                    }
                    self._gridScrollView.refresh();
                    break;
                }
            }
        };
        __egretProto__.resetHero = function (heroCtrl) {
            this._detailLayerCtrl.resetHero(heroCtrl);
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            self._gridLayerCtrl.doDtor();
            self._detailLayerCtrl.doDtor();
        };
        __egretProto__._initCtrl = function (from, opt) {
        };
        __egretProto__.setCurList = function (showType, option) {
        };
        BagQueryLayerDlg.__className = "BagQueryLayerDlg";
        BagQueryLayerDlg.PANEL_ITEMS = "panel_items";
        BagQueryLayerDlg.PANEL_INFO = "panel_info";
        BagQueryLayerDlg.BTN_CLOSE = "btnClose";
        return BagQueryLayerDlg;
    })(mo.UIModalLayer);
    uw.BagQueryLayerDlg = BagQueryLayerDlg;
    BagQueryLayerDlg.prototype.__class__ = "uw.BagQueryLayerDlg";
    mo.impl(BagQueryLayerDlg, uw._bagQueryCommonApi);
})(uw || (uw = {}));

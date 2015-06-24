/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SaleSundryDlg = (function (_super) {
        __extends(SaleSundryDlg, _super);
        function SaleSundryDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SaleSundryDlg.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiSundryDlg_ui;
            self._totalGain = 0;
        };
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            var sundries = self._sundries = uw.userDataCtrl.getSundries();
            self.onClickByName(clazz.BTN_SALE, self._onBtnSale, self);
            self._createGridScrollView(clazz.PANEL_SHOPLIST, uw.SaleSundryCell, 2, this._onItemCellDataSource);
            self._gridScrollView.setTotalCount(self._sundries.length);
            self._gridScrollView.scrollEnabled = false;
            for (var i = 0, li = sundries.length; i < li; i++) {
                var tempId = sundries[i];
                var itemData = mo.getJSONWithFileNameAndID(uw.cfg_t_item, tempId);
                self._totalGain += itemData[uw.t_item_sellPrice] * uw.userDataCtrl.getItemNum(tempId);
            }
            self.setInfoByName(clazz.LABEL_TOTALGAIN, self._totalGain);
            uw.setGoldColor(self, clazz.LABEL_TOTALGAIN);
            var rows = Math.round(self._sundries.length / clazz.MAX_COL);
            //设置背景大小
            var widget = self.getWidgetByName(clazz.PANEL_SHOPLISTBG);
            var s = widget.getSrcSize();
            widget.setSize(s.width, s.height - (clazz.MAX_ROW - rows) * clazz.CELL_H);
            //设置对话框大小
            var widget = self.getWidgetByName(clazz.PANEL_CONTAINER);
            widget.setSize(1500, 1040 - (clazz.MAX_ROW - rows) * clazz.CELL_H);
            widget.doLayout();
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var self = this;
            cell.resetByData(self._sundries[index]);
        };
        __egretProto__._onBtnSale = function () {
            var self = this;
            uw.userDataCtrl.saleSundries(function () {
                self.close();
            }, self);
        };
        SaleSundryDlg.__className = "SaleSundryDlg";
        SaleSundryDlg.BTN_SALE = "btn_sale";
        SaleSundryDlg.PANEL_SHOPLIST = "shopList";
        SaleSundryDlg.PANEL_SHOPLISTBG = "shopListBg";
        SaleSundryDlg.ITEM_TEMP = "item%s";
        SaleSundryDlg.LABEL_TOTALGAIN = "label_totalGain";
        SaleSundryDlg.PANEL_CONTAINER = "container";
        SaleSundryDlg.MAX_ROW = 3;
        SaleSundryDlg.MAX_COL = 2;
        SaleSundryDlg.CELL_H = 180;
        return SaleSundryDlg;
    })(mo.UIModalLayer);
    uw.SaleSundryDlg = SaleSundryDlg;
    SaleSundryDlg.prototype.__class__ = "uw.SaleSundryDlg";
})(uw || (uw = {}));

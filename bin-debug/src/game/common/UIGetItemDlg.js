/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var GetItemCell = (function (_super) {
        __extends(GetItemCell, _super);
        function GetItemCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GetItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiSundryItem_ui;
            self._clickWidgetName = "touch_panel";
        };
        //@override
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(GetItemCell.PANEL_ICON));
        };
        __egretProto__.resetByData = function (obj) {
            var self = this;
            var tempId = obj.tempId;
            var count = obj.count;
            self._iconCtrl.resetByData(tempId);
            self.formatByName(GetItemCell.LABEL_NAME_COUNT, self._iconCtrl.dataCtrl.name, count);
        };
        GetItemCell.__className = "GetItemCell";
        GetItemCell.PANEL_ICON = "panel_icon";
        GetItemCell.LABEL_NAME_COUNT = "label_name_count";
        return GetItemCell;
    })(mo.GridViewCell);
    uw.GetItemCell = GetItemCell;
    GetItemCell.prototype.__class__ = "uw.GetItemCell";
    var GetItemDlg = (function (_super) {
        __extends(GetItemDlg, _super);
        function GetItemDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GetItemDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiGetItemDlg_ui;
            self._itemArr = [];
        };
        //@override
        __egretProto__.init = function (itemArr, isShowRemainTime) {
            _super.prototype.init.call(this);
            var self = this;
            var clazz = self.__class;
            self._itemArr = itemArr;
            self.onClickByName(clazz.BTN_CONFIRM, self._onConfirm, self);
            var days = uw.rechargeDataCtrl.getLeftDays();
            self.formatByName(clazz.LABEL_REMAIN_DAYS, days);
            self.setVisibleByName(clazz.LABEL_REMAIN_DAYS, isShowRemainTime);
            var rows = Math.round(self._itemArr.length / clazz.MAX_COL);
            var rowAdd = rows - 1;
            //高度变化
            var deltaH = rowAdd * clazz.CELL_H;
            //设置List的大小
            var widget = self.getWidgetByName(clazz.PANEL_SHOPLIST);
            var s = widget.getSrcSize();
            widget.setSize(s.width, s.height + deltaH);
            //设置背景大小
            var widget = self.getWidgetByName(clazz.PANEL_SHOPLISTBG);
            var s = widget.getSrcSize();
            widget.setSize(s.width, s.height + deltaH);
            //设置对话框大小
            var widget = self.getWidgetByName(clazz.PANEL_CONTAINER);
            var s = widget.getSrcSize();
            widget.setSize(widget.width, s.height + deltaH - (isShowRemainTime ? 0 : 75));
            self.doLayoutByName(clazz.PANEL_SHOPLISTBG);
            self.doLayoutByName(clazz.PANEL_CONTAINER);
            //设置数据
            self._createGridScrollView(clazz.PANEL_SHOPLIST, uw.GetItemCell, clazz.MAX_COL, this._onItemCellDataSource);
            self._gridScrollView.setTotalCount(self._itemArr.length);
            self._gridScrollView.scrollEnabled = false;
        };
        __egretProto__.setTitle = function (title) {
            if (title) {
                var self = this;
                var clazz = self.__class;
                self.setInfoByName(clazz.LABEL_TITLE, title);
                var titleWidget = self.getWidgetByName(clazz.LABEL_TITLE);
                var titleBgWidget = self.getWidgetByName(clazz.LABEL_TITLE_BG);
                if (titleBgWidget.getSize().width < titleWidget.getSize().width) {
                    titleBgWidget.setScaleX((titleWidget.getSize().width + 200) / titleBgWidget.getSize().width);
                }
            }
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var self = this;
            var obj = self._itemArr[index];
            cell.resetByData(obj);
        };
        __egretProto__._onConfirm = function () {
            this.close();
        };
        GetItemDlg.__className = "GetItemDlg";
        GetItemDlg.LABEL_TITLE = "label_title";
        GetItemDlg.LABEL_TITLE_BG = "label_title_bg";
        GetItemDlg.BTN_CONFIRM = "btn_confirm";
        GetItemDlg.PANEL_SHOPLIST = "shopList";
        GetItemDlg.PANEL_SHOPLISTBG = "shopListBg";
        GetItemDlg.LABEL_REMAIN_DAYS = "label_remainDays";
        GetItemDlg.PANEL_CONTAINER = "container";
        GetItemDlg.MAX_COL = 2;
        GetItemDlg.CELL_H = 170;
        return GetItemDlg;
    })(mo.MsgDlg);
    uw.GetItemDlg = GetItemDlg;
    GetItemDlg.prototype.__class__ = "uw.GetItemDlg";
})(uw || (uw = {}));

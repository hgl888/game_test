/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var GainInfoDlg = (function (_super) {
        __extends(GainInfoDlg, _super);
        function GainInfoDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GainInfoDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiBagMaterialDlg_ui;
        };
        //@override
        __egretProto__.init = function (tempId) {
            _super.prototype.init.call(this);
            var self = this, clazz = self.__class;
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(clazz.ITEM_ICON));
            self._createGridScrollView(clazz.PANEL_COPY_LIST, uw.FragmentCell, 1, self._onCellDataSource);
            if (tempId != null)
                self.resetByData(tempId);
        };
        __egretProto__.resetByData = function (tempId) {
            var self = this, clazz = self.__class;
            self._iconCtrl.resetByData(tempId);
            self.setInfoByName(clazz.LABEL_ITEM_NAME, { value: self._iconCtrl.dataCtrl.name, color: uw.getItemColorByTempId(tempId) });
            self._resetGainInfoById(tempId);
            return self;
        };
        __egretProto__._onCellDataSource = function (cell, index) {
            if (!cell.listenersInited) {
                cell.listenersInited = true;
                cell.onClick(this._onCellClick, this);
            }
            cell.resetByData(this._itemList[index]);
        };
        __egretProto__._resetGainInfoById = function (fragmentId) {
            var self = this, clazz = self.__class;
            var bagDataCtrl = uw.BagDataCtrl.create(fragmentId);
            var copyIds = bagDataCtrl.getTempValue(uw.t_item_copyIds);
            var hasCopyId = copyIds != null;
            self.setVisibleByName(clazz.PANEL_COPY_LIST, hasCopyId);
            self.setVisibleByName(clazz.LABEL_GET_TXT, !hasCopyId);
            if (hasCopyId) {
                self._itemList = copyIds;
                self._gridScrollView.setTotalCount(self._itemList.length);
            }
            else {
                var getTxt = bagDataCtrl.getTempValue(uw.t_item_getTxt);
                self.setInfoByName(clazz.LABEL_GET_TXT, getTxt);
            }
            return self;
        };
        __egretProto__._onCellClick = function (cell) {
            var pCopyId = cell._pCopyId;
            if (pCopyId == uw.c_prop.pCopyIdKey.tower) {
                uw.pushSubModule(uw.SubModule.Tower);
            }
            else if (pCopyId == uw.c_prop.pCopyIdKey.trial1 || pCopyId == uw.c_prop.pCopyIdKey.trial2 || pCopyId == uw.c_prop.pCopyIdKey.trial3) {
                //判断今日是否可打
                if (!uw.trialHelper.isOpen(cell._copyId))
                    return mo.showMsg(uw.id_c_msgCode.trialNoOpenToday);
                //选中子副本所在的大副本索引
                var pArr = [uw.c_prop.pCopyIdKey.trial1, uw.c_prop.pCopyIdKey.trial2, uw.c_prop.pCopyIdKey.trial3];
                uw.pushSubModule(uw.SubModule.Valley, pArr.indexOf(pCopyId));
            }
            else {
                uw.pushSubModule(uw.SubModule.Copy, cell._copyId);
            }
        };
        GainInfoDlg.__className = "GainInfoDlg";
        GainInfoDlg.BAR_FRAGMENT = "bar_fragment";
        GainInfoDlg.LABEL_GET_TXT = "label_getTxt"; //获得途径的文本描述
        GainInfoDlg.PANEL_COPY_LIST = "panel_copyList";
        GainInfoDlg.BTN_CLOSE = "btn_close";
        GainInfoDlg.ITEM_ICON = "panel_icon"; //物品ICON
        GainInfoDlg.LABEL_ITEM_NAME = "label_name"; //物品ICON
        return GainInfoDlg;
    })(mo.UIModalLayer);
    uw.GainInfoDlg = GainInfoDlg;
    GainInfoDlg.prototype.__class__ = "uw.GainInfoDlg";
})(uw || (uw = {}));

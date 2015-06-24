/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var UITrialCopyDlg = (function (_super) {
        __extends(UITrialCopyDlg, _super);
        function UITrialCopyDlg() {
            _super.call(this);
        }
        var __egretProto__ = UITrialCopyDlg.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiTrialCopy_ui;
        };
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
        };
        __egretProto__.init = function (pCopyId) {
            var self = this;
            _super.prototype.init.apply(self, arguments);
            var copyIds = uw.copyBelong[pCopyId];
            self._gridCtrl = uw.UITrialCopyGridCtrl.create(self.getWidgetByName(self.__class.PANEL_LIST));
            self._gridCtrl.resetByData(copyIds);
        };
        UITrialCopyDlg.__className = "UITrialCopyDlg";
        UITrialCopyDlg.PANEL_LIST = "panel_list"; //列表容器
        UITrialCopyDlg.BTN_CLOSE = "btn_close"; //关闭按键
        return UITrialCopyDlg;
    })(mo.UIModalLayer);
    uw.UITrialCopyDlg = UITrialCopyDlg;
    UITrialCopyDlg.prototype.__class__ = "uw.UITrialCopyDlg";
    var UITrialCopyGridCtrl = (function (_super) {
        __extends(UITrialCopyGridCtrl, _super);
        function UITrialCopyGridCtrl() {
            _super.apply(this, arguments);
            this._itemJsonPath = res.uiTrialCopyItem_ui;
            this._cols = 3;
            this._copyInfoLayer = null;
        }
        var __egretProto__ = UITrialCopyGridCtrl.prototype;
        __egretProto__._resetItemByData = function (widget, copyId, index) {
            var self = this, clazz = self.__class;
            var copyTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            var lvlRequired = copyTemp[uw.t_copy_lvlRequired];
            var isOpened = uw.userDataCtrl.getLvl() >= lvlRequired;
            widget.setInfoByName(clazz.IMG_LVL, mo.formatStr(res.ui_mt.tmp_ico_lvl_png, index));
            widget.setGrayByName(clazz.IMG_LVL, !isOpened);
            widget.setGrayByName(clazz.IMG_STATE, !isOpened);
            widget.setName("trialCopyItem_" + index);
            widget.onClick(function () {
                if (!isOpened)
                    return mo.showMsg(uw.id_c_msgCode.noChallengeLv, lvlRequired);
                uw.pushSubModule(uw.SubModule.CopyInfo, copyId);
            });
        };
        UITrialCopyGridCtrl.__className = "UWUITrialCopyGridCtrl";
        UITrialCopyGridCtrl.IMG_STATE = "img_state"; //状态
        UITrialCopyGridCtrl.IMG_LVL = "img_lvl"; //难度等级
        return UITrialCopyGridCtrl;
    })(mo.GridController);
    uw.UITrialCopyGridCtrl = UITrialCopyGridCtrl;
    UITrialCopyGridCtrl.prototype.__class__ = "uw.UITrialCopyGridCtrl";
})(uw || (uw = {}));

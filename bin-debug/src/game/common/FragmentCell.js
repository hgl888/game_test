/**
 * Created by lihex on 12/19/14.
 */
var uw;
(function (uw) {
    var FragmentCell = (function (_super) {
        __extends(FragmentCell, _super);
        function FragmentCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FragmentCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiFragmentCopyItem_ui;
            self._clickWidgetName = "panel_item";
            self._useClickEffect = true;
        };
        __egretProto__.onEnter = function () {
            var self = this;
            _super.prototype.onEnter.call(this);
            if (self._copyId) {
                self.resetByData(self._copyId);
            }
        };
        __egretProto__.resetByData = function (copyId) {
            var self = this, clazz = self.__class;
            self._copyId = copyId;
            var t_copy = mo.getJSONWithFileName(uw.cfg_t_copy);
            var t_copyPrimary = mo.getJSONWithFileName(uw.cfg_t_copyPrimary);
            var copy = t_copy[copyId];
            var pCopyId = self._pCopyId = copy[uw.t_copy_pCopyId];
            var pCopy = t_copyPrimary[pCopyId];
            var copyType = copy[uw.t_copy_type];
            var pCopyName = pCopy[uw.t_copyPrimary_name];
            var copyRemark = copy[uw.t_copy_remark];
            self.setInfoByName(clazz.LABEL_PCOPY, pCopyName);
            self.setInfoByName(clazz.LABEL_COPY, copyRemark);
            self.setVisibleByName(clazz.IMG_COPYTYPE, true);
            self.setVisibleByName(clazz.PANEL_ITEM, true);
            self.setTouchEnabledByName(clazz.PANEL_ITEM, false);
            if (pCopyId == uw.c_prop.pCopyIdKey.tower) {
                self.setTouchEnabledByName(clazz.PANEL_ITEM, true);
                self.setVisibleByName(clazz.IMG_COPYTYPE, false);
            }
            else if (pCopyId == uw.c_prop.pCopyIdKey.trial1 || pCopyId == uw.c_prop.pCopyIdKey.trial2 || pCopyId == uw.c_prop.pCopyIdKey.trial3) {
                self.setInfoByName(clazz.IMG_COPYTYPE, res.ui_btn.trial_png);
                self.setTouchEnabledByName(clazz.PANEL_ITEM, true);
            }
            else {
                var isLocked = uw.userDataCtrl.isCopyLocked(copyId);
                var isNormal = (copyType == uw.c_prop.copyTypeKey.normal || copyType == uw.c_prop.copyTypeKey.normalBoss);
                if (isLocked) {
                    self.setInfoByName(clazz.IMG_COPYTYPE, res.ui_btn.lock_png);
                }
                else {
                    self.setTouchEnabledByName(clazz.PANEL_ITEM, true);
                    self.setInfoByName(clazz.IMG_COPYTYPE, isNormal ? res.ui_btn.normal_png : res.ui_btn.cream_png);
                }
                // 已开启的精英副本需要画剩余次数
                self.setVisibleByName(clazz.LABEL_TIMES, false);
                if (!isLocked) {
                    var opt = uw.userDataCtrl.getResetCopyCountOpt(copyId);
                    if (opt.isShow) {
                        self.setVisibleByName(clazz.LABEL_TIMES, true);
                        var str;
                        if (opt.hasTimes) {
                            str = mo.formatStr("([ubb color=#e79057]%s[/ubb][ubb color=#e79057]/%s[/ubb])", opt.leftTimes, opt.totalTimes);
                        }
                        else {
                            str = mo.formatStr("([ubb color=red]%s[/ubb][ubb color=#e79057]/%s[/ubb])", opt.leftTimes, opt.totalTimes);
                        }
                        self.setInfoByName(clazz.LABEL_TIMES, { value: str, fontSize: 60 });
                        self.doLayoutByName(clazz.PANEL_PRIMARY);
                    }
                }
            }
        };
        FragmentCell.__className = "HeroFragmentCell";
        FragmentCell.IMG_COPY_ITEM = "img_copyItem";
        FragmentCell.LABEL_PCOPY = "label_pCopy";
        FragmentCell.LABEL_COPY = "label_copy";
        FragmentCell.PANEL_ITEM = "panel_item";
        FragmentCell.PANEL_PRIMARY = "panel_primary";
        FragmentCell.LABEL_TIMES = "label_times";
        FragmentCell.IMG_COPYTYPE = "img_copyType";
        FragmentCell.BAR_FRAGMENT = "bar_fragment";
        return FragmentCell;
    })(mo.GridViewCell);
    uw.FragmentCell = FragmentCell;
    FragmentCell.prototype.__class__ = "uw.FragmentCell";
})(uw || (uw = {}));

/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var MirrorItemCell = (function (_super) {
        __extends(MirrorItemCell, _super);
        function MirrorItemCell() {
            _super.call(this);
            this._clickWidgetName = "root";
            this._useClickEffect = true;
            this._info = null;
        }
        var __egretProto__ = MirrorItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiTrialCopyItem_ui;
        };
        __egretProto__.resetByData = function (copyId, index) {
            var self = this, clazz = self.__class;
            self.setName("mirrorItemCell_" + index);
            self._info = copyId;
            var copyId = copyId;
            var copyTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            var lvlRequired = copyTemp[uw.t_copy_lvlRequired];
            var isOpened = uw.userDataCtrl.getLvl() >= lvlRequired;
            self.setInfoByName(clazz.IMG_LVL, mo.formatStr(res.ui_mt.tmp_ico_lvl_png, index));
            self.setGrayByName(clazz.IMG_LVL, !isOpened);
            self.setGrayByName(clazz.IMG_STATE, !isOpened);
        };
        __egretProto__.getInfo = function () {
            return this._info;
        };
        MirrorItemCell.__className = "MirrorItemCell";
        MirrorItemCell.IMG_STATE = "img_state"; //状态
        MirrorItemCell.IMG_LVL = "img_lvl"; //难度等级
        MirrorItemCell.IMG_ONRANK = "img_onRank"; //在榜的标记
        return MirrorItemCell;
    })(mo.GridViewCell);
    uw.MirrorItemCell = MirrorItemCell;
    MirrorItemCell.prototype.__class__ = "uw.MirrorItemCell";
})(uw || (uw = {}));

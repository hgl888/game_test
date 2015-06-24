/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var MirrorChooseDlg = (function (_super) {
        __extends(MirrorChooseDlg, _super);
        function MirrorChooseDlg() {
            _super.apply(this, arguments);
            this._type = null;
            this._fightResult = null;
        }
        var __egretProto__ = MirrorChooseDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiMirrorChooseDlg_ui;
            self._needToRefresh = false;
        };
        __egretProto__.init = function (type) {
            _super.prototype.init.call(this);
            var self = this;
            self._type = type || self.__class.TYPE_PVE;
            self._gridScrollView = self._createGridScrollView(self.__class.PANEL_ITEMLIST, uw.MirrorItemCell, 3, self._onItemCellDataSource, true);
            self._gridScrollView.scrollEnabled = false;
            var isPVP = self._type == self.__class.TYPE_PVP;
            if (!isPVP) {
                var panelBox = self.getWidgetByName(self.__class.PANEL_BOX);
                var origSize = panelBox.getSize();
                panelBox.setSize(mo.size(origSize.width, origSize.height - self.getWidgetByName(self.__class.BTN_RECORD).getSize().height));
            }
            self.setVisibleByName(self.__class.BTN_RECORD, isPVP);
            self.onClickByName(self.__class.BTN_RECORD, self._showRecord, self);
            self.formatByName(self.__class.LABEL_TITLE, isPVP ? self.__class.TITLE_PVP : self.__class.TITLE_PVE);
            //获取副本
            var pCopyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copyPrimary, uw.c_prop.pCopyIdKey.mirror); //获取主副本信息
            var copyIds = [];
            for (var i = 0, li = 6; i < li; i++) {
                copyIds.push(pCopyInfo[uw.t_copyPrimary_firstId] + i);
            }
            self._initWithData(copyIds);
            //监听界面被遮盖和显示的事件用来来更新排名
            mo.addAfterEventListener(self, gEventType.visible, self._onVisible, self);
            mo.addAfterEventListener(self, gEventType.invisible, self._onInvisible, self);
        };
        __egretProto__._onVisible = function () {
            var self = this;
            if (self._needToRefresh) {
                uw.mirrorDataCtrl.getMyRank(function () {
                    this._gridScrollView.refreshData();
                });
                self._needToRefresh = false;
            }
        };
        __egretProto__._onInvisible = function () {
            this._needToRefresh = true;
        };
        __egretProto__._initWithData = function (data) {
            this._data = data;
            this._gridScrollView.setTotalCount(this._data.length);
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var self = this;
            cell.resetByData(self._data[index], index);
            cell.onClick(self._onCellClick, self);
            if (self._type == self.__class.TYPE_PVP) {
                // 是否显示星星
                var myRankInfo = uw.mirrorDataCtrl.myRankInfo;
                if (myRankInfo) {
                    cell.setVisibleByName(uw.MirrorItemCell.IMG_ONRANK, myRankInfo.isIn && myRankInfo.type == index);
                }
            }
        };
        __egretProto__._showRecord = function () {
            var dlg = uw.MirrorDefRecordDlg.create();
            dlg.show();
        };
        __egretProto__._onCellClick = function (cell) {
            var self = this;
            var copyId = cell.getInfo();
            var t_copy = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            //检查领主等级是否足够
            var lvlRequired = t_copy[uw.t_copy_lvlRequired];
            if (uw.userDataCtrl.getLvl() < lvlRequired)
                return mo.showMsg(uw.id_c_msgCode.noChallengeLv, lvlRequired);
            if (self._type == self.__class.TYPE_PVE) {
                this._goPVE(cell.getInfo());
            }
            else if (self._type == self.__class.TYPE_PVP) {
                this.goPVP(cell.getInfo());
            }
        };
        /**
         * 进入PVP
         * @param cell
         * @returns {*}
         * @private
         */
        __egretProto__.goPVP = function (copyId) {
            var self = this;
            // 检查是否通过了对应闯关模式
            var progressCtrl = uw.userDataCtrl.getCopyProgress(uw.c_prop.pCopyIdKey.mirror);
            var copyMap = progressCtrl.getCopyStateMap();
            var copyState = copyMap[copyId];
            if (!copyState || !copyState.state) {
                return mo.showMsg(uw.id_c_msgCode.noPassPve);
            }
            self.getDelegate().setLastFightCopyId(copyId);
            var difficulty = progressCtrl.getIndexOfCopyId(copyId);
            uw.pushSubModule(uw.SubModule.MirrorAtkRank, difficulty);
        };
        /**
         * 进入PVE
         * @param cell
         * @private
         */
        __egretProto__._goPVE = function (copyId) {
            var self = this;
            // 进入副本信息界面
            self.getDelegate().setLastFightCopyId(copyId);
            self.getDelegate().showCopyInfoLayer(copyId);
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            mo.removeAfterEventListener(self, gEventType.visible, self._onVisible, self);
            mo.removeAfterEventListener(self, gEventType.invisible, self._onInvisible, self);
        };
        MirrorChooseDlg.__className = "MirrorChooseDlg";
        MirrorChooseDlg.PANEL_ITEMLIST = "itemList";
        MirrorChooseDlg.TYPE_PVE = "type_pve";
        MirrorChooseDlg.TYPE_PVP = "type_pvp";
        MirrorChooseDlg.TITLE_PVE = "闯关模式";
        MirrorChooseDlg.TITLE_PVP = "挑战模式";
        MirrorChooseDlg.LABEL_TITLE = "label_title";
        MirrorChooseDlg.BTN_RECORD = "btn_record";
        MirrorChooseDlg.PANEL_BOX = "box";
        MirrorChooseDlg.BTN_CLOSE = "btn_close";
        return MirrorChooseDlg;
    })(mo.UIModalLayer);
    uw.MirrorChooseDlg = MirrorChooseDlg;
    MirrorChooseDlg.prototype.__class__ = "uw.MirrorChooseDlg";
})(uw || (uw = {}));

/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var MirrorAtkRankLayer = (function (_super) {
        __extends(MirrorAtkRankLayer, _super);
        function MirrorAtkRankLayer() {
            _super.apply(this, arguments);
            this._difficulty = null;
            this._cols = 2;
            this._rows = 4;
            this._pageCount = 13;
            this._infoDlg = null;
            this._infoDlgShowing = false;
            this._needUnlock = false;
            this._fightResult = null;
            this.isAutoDtor = false;
        }
        var __egretProto__ = MirrorAtkRankLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiMirrorAtkRankLayer_ui;
        };
        __egretProto__.init = function (difficulty) {
            _super.prototype.init.call(this);
            var self = this;
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.FIXED_WIDTH);
            self._gridPageView = self._createGridPageView(self.__class.PANEL_ITEMLIST, uw.MirrorAtkRankItemCell, self._rows, self._cols, self._onItemCellDataSource, null);
            self._gridPageView.setPageViewTouchEnabled(false);
            // 设置按钮
            self.onClickByName(self.__class.BTN_VIEWME, self._onViewMeBtnClick, self);
            self.onClickByName(self.__class.BTN_NEXT, self._nextPage, self);
            self.onClickByName(self.__class.BTN_PRE, self._prePage, self);
            self.setVisibleByName(self.__class.IMG_BR, false);
            // 初始化一个空榜
            var totalCount = self._rows * self._cols * self._pageCount;
            var data = [];
            while (totalCount > 0) {
                data.push(-1);
                totalCount--;
            }
            self._initWithData(data);
            // 初始化详细信息框
            self._infoDlg = uw.MirrorInfoDlg.getInstance();
            self._infoDlg.onClose(self._onInfoDlgClose, self);
            // 设置监听
            self.registerClassByKey(uw.MirrorDataCtrl, uw.MirrorDataCtrl.ON_FAIL_BOARD, self._onFailBoard);
            self.registerClassByKey(uw.FightMainCtrl, uw.FightMainCtrl.ON_SHOW_RESULT, self._onFightResult);
            if (difficulty != null) {
                self.resetByData(difficulty);
            }
        };
        // 显示某个难度的层
        __egretProto__.resetByData = function (difficulty) {
            var self = this;
            self._difficulty = difficulty;
            self.formatByName(self.__class.LABEL_SPEED, uw.mirrorRewardArr[difficulty] * (60 / uw.mirrorRewardTime));
            var layerNum = difficulty + 1;
            self.formatByName(self.__class.LABEL_LAYERCOUNT, layerNum);
            uw.mirrorDataCtrl.getMyRank(function (info) {
                var isIn = info.isIn && (info.type == self._difficulty);
                self.setVisibleByName(self.__class.IMG_BR, isIn);
                self.setTouchEnabledByName(self.__class.BTN_VIEWME, isIn);
            }, self);
            self.refreshPage(0, null, null);
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            var self = this;
            if (self._fightResult) {
                self._needUnlock = false;
                self._infoDlg.close();
                if (self._fightResult.newData[uw.dsConsts.FightResult.mirrorEnterState]) {
                    mo.showMsg(uw.id_c_msgCode.robRewardMail, uw.mirrorDataCtrl.getPVPWinGain());
                }
                self._fightResult = null;
            }
        };
        __egretProto__._onFightResult = function (resultData) {
            var self = this;
            self._fightResult = resultData;
        };
        // 已经下榜，隐藏按钮
        __egretProto__._onFailBoard = function () {
            var self = this;
            self.refreshPage();
            self.setVisibleByName(self.__class.IMG_BR, false);
        };
        __egretProto__._onInfoDlgClose = function () {
            var self = this;
            self._infoDlgShowing = false;
            if (self._needUnlock) {
                uw.mirrorDataCtrl.pvpCancel(function () {
                    self.refreshPage(self._gridPageView.getCurPageIndex());
                }, self);
                self._needUnlock = false;
                return;
            }
            self.refreshPage(self._gridPageView.getCurPageIndex());
        };
        /**
         * 更新某一页数据
         * @param index 页码 (0~n) 如果不传，则默认更新当前页
         */
        __egretProto__.refreshPage = function (index, cb, target) {
            var self = this;
            if (index == null) {
                index = self._gridPageView.getCurPageIndex();
            }
            uw.mirrorDataCtrl.getRanks(self._difficulty, index, function (dataArr) {
                var dataCount = self._gridPageView.getDataCountByPageIndex(index);
                var startIndex = self._cols * self._rows * index;
                for (var i = 0; i < dataCount; i++) {
                    if (dataArr[i]) {
                        self._data[startIndex + i] = dataArr[i];
                    }
                    else {
                        self._data[startIndex + i] = -1;
                    }
                }
                self._gridPageView.updatePageByIndex(index);
                if (cb)
                    cb.call(target, index);
            }, self);
        };
        __egretProto__._initWithData = function (data) {
            this._data = data;
            this.refreshGrid();
        };
        __egretProto__.refreshGrid = function () {
            this._gridPageView.setTotalCount(this._data.length);
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var self = this;
            uw.log("index--> ", index, self._data[index]);
            cell.resetByData(self._data[index]);
            cell.onClick(self._onCellClick, self);
        };
        __egretProto__._onCellClick = function (cell) {
            var self = this;
            var info = cell.getInfo();
            var isSelf = uw.userDataCtrl.getId() == info.userId;
            // 查看自己
            if (isSelf) {
                self._viewMe(info);
                return;
            }
            //是否已锁定
            if (info.isLocked) {
                mo.showMsg(uw.id_c_msgCode.userFighting);
                return;
            }
            // 查看不可挑战的对手，不锁定，直接查看
            var myRankInfo = uw.mirrorDataCtrl.myRankInfo;
            if (myRankInfo.isIn && myRankInfo.type >= info.type) {
                self._infoDlg.resetByData(info);
                self._infoDlg.show(true);
                self._infoDlgShowing = true;
            }
            else {
                self._needUnlock = true;
                uw.mirrorDataCtrl.pvpPrepare(info, function () {
                    self._infoDlg.resetByData(info);
                    self._infoDlg.show(true);
                    self._infoDlgShowing = true;
                }, self);
            }
        };
        __egretProto__._onViewMeBtnClick = function () {
            var self = this;
            uw.mirrorDataCtrl.getMyRank(function (info) {
                self._viewMe(info);
            }, self);
        };
        __egretProto__._viewMe = function (info) {
            var self = this;
            self._infoDlg.resetByData(info);
            self._infoDlg.show(true);
            self._infoDlgShowing = true;
        };
        __egretProto__._nextPage = function () {
            var self = this;
            var pageIndex = self._gridPageView.getCurPageIndex() + 1;
            if (pageIndex >= self._gridPageView.getPagesCount()) {
                return;
            }
            self.refreshPage(pageIndex, function (pIndex) {
                self._gridPageView.scrollToPage(pIndex);
            }, self);
        };
        __egretProto__._prePage = function () {
            var self = this;
            var pageIndex = self._gridPageView.getCurPageIndex() - 1;
            if (pageIndex < 0) {
                return;
            }
            self.refreshPage(pageIndex, function (pIndex) {
                self._gridPageView.scrollToPage(pIndex);
            }, self);
        };
        __egretProto__._onClose = function () {
            var self = this;
            if (self._infoDlgShowing) {
                self._onInfoDlgClose();
            }
            _super.prototype._onClose.call(this);
        };
        __egretProto__._createGridPageView = function (panelName, cellClass, rows, cols, onCellDataSource, autoCellWidth) {
            var self = this;
            var panel = self.getWidgetByName(panelName);
            var viewSize = panel.getSize();
            var cell = cellClass.create();
            var cellSize = cell.getSize();
            if (autoCellWidth) {
                cellSize = mo.size(viewSize.width / cols, cellSize.height);
            }
            var gridPageView = self._gridPageView = mo.GridPageView.create(viewSize, cellSize, rows, cols, 0, onCellDataSource, self, cellClass);
            gridPageView.setPageIndexEnabled(true);
            panel.addChild(gridPageView);
            return gridPageView;
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            uw.MirrorInfoDlg.purgeInstance();
            if (self._gridPageView) {
                self._gridPageView.doDtor();
            }
        };
        MirrorAtkRankLayer.__className = "MirrorAtkRankLayer";
        MirrorAtkRankLayer.PANEL_ITEMLIST = "itemList";
        MirrorAtkRankLayer.TYPE_PVE = "type_pve";
        MirrorAtkRankLayer.TYPE_PVP = "type_pvp";
        MirrorAtkRankLayer.LABEL_LAYERCOUNT = "label_layerCount";
        MirrorAtkRankLayer.LABEL_SPEED = "label_speed";
        MirrorAtkRankLayer.BTN_VIEWME = "btn_viewMe"; //查看自己
        MirrorAtkRankLayer.BTN_NEXT = "btn_next"; //后一页
        MirrorAtkRankLayer.BTN_PRE = "btn_pre"; //前一页
        MirrorAtkRankLayer.IMG_BR = "img_br";
        return MirrorAtkRankLayer;
    })(mo.DisplayLayer);
    uw.MirrorAtkRankLayer = MirrorAtkRankLayer;
    MirrorAtkRankLayer.prototype.__class__ = "uw.MirrorAtkRankLayer";
})(uw || (uw = {}));

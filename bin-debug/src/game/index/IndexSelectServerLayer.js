/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var IndexSelectServerLayer = (function (_super) {
        __extends(IndexSelectServerLayer, _super);
        function IndexSelectServerLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = IndexSelectServerLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiIndexSelectServerLayer_ui;
            self._allList = [];
            self._myServerList = [];
        };
        //@override
        __egretProto__.init = function () {
            var self = this;
            _super.prototype._init.call(this);
            self.onClickByName("btnClose", self.close, this);
            self._allListGridScrollView = self._createGridScrollView("allServer", uw.ServerItemCell, 2, self._onItemCellDataSource);
            self._allListGridScrollView.setBounceEnabled(false);
            self._myServerGridScrollView = self._createGridScrollView("lastestLoginServer", uw.ServerItemCell, 2, self._onItemCellLastLoginDataSource);
            self._myServerGridScrollView.setBounceEnabled(false);
            self._initWithData();
        };
        __egretProto__._initWithData = function () {
            var self = this;
            self._allList = uw.serverDataCtrl.getAllServerList();
            self._allListGridScrollView.setTotalCount(self._allList.length);
            self._myServerList = uw.serverDataCtrl.getMyServerList();
            self._myServerGridScrollView.setTotalCount(self._myServerList.length);
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var self = this;
            var serverInfo = self._allList[index];
            cell.resetByData(serverInfo);
            if (!cell.listenerInited) {
                cell.listenerInited = true;
                cell.setTouchEnabled(true);
                cell.onClick(self._onCellClick, this);
            }
        };
        __egretProto__._onItemCellLastLoginDataSource = function (cell, index) {
            var self = this;
            var serverInfo = self._myServerList[index];
            cell.resetByData(serverInfo);
            if (!cell.listenerInited) {
                cell.listenerInited = true;
                cell.setTouchEnabled(true);
                cell.onClick(self._onCellClick, this);
            }
        };
        __egretProto__._onCellClick = function (cell) {
            var self = this;
            var serverInfo = cell.getServerInfo();
            var status = serverInfo[uw.dsConsts.ServerInfoEntity.status];
            if (status !== 0) {
                self.close();
                uw.serverDataCtrl.pushNotify("curServer", cell.getServerInfo());
            }
        };
        IndexSelectServerLayer.__className = "IndexSelectServerLayer";
        return IndexSelectServerLayer;
    })(mo.UIModalLayer);
    uw.IndexSelectServerLayer = IndexSelectServerLayer;
    IndexSelectServerLayer.prototype.__class__ = "uw.IndexSelectServerLayer";
})(uw || (uw = {}));

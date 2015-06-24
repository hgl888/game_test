/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var QuestLayer = (function (_super) {
        __extends(QuestLayer, _super);
        function QuestLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = QuestLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiQuestLayer_ui;
            self._closeOutSide = false;
            self._taskType = 0;
            self._sortOpt = null;
            self._vipFilter = null;
            self._needToRefresh = false;
        };
        __egretProto__.init = function (type) {
            _super.prototype.init.apply(this, arguments);
            var self = this;
            self._taskType = type;
            var sortKey = uw.TASK_SORT_KEY;
            var finished = sortKey.FINISHED;
            var id = sortKey.ID;
            // 第1优先级：已完成＞进行中
            // 第2优先级：任务id先后
            this._sortOpt = mo.sortOption.bind({ list: [finished, { name: id, type: 1 }] });
            self.setInfoByName("taskType", (type == uw.c_prop.taskTypeKey.daily) ? "每日活动" : " 任务");
            self._gridScrollView = self._createGridScrollView("gridViewContainer", uw.QuestItem, 1, this._onCellDataSource);
            self.refreshTaskList();
            mo.addAfterEventListener(self, gEventType.visible, self._onVisible, self);
            mo.addAfterEventListener(self, gEventType.invisible, self._onInvisible, self);
            mo.addAfterEventListener(mo.actionDispatcher, gEventType.newSceneVisible, self.close, self);
        };
        __egretProto__._onVisible = function () {
            if (this._needToRefresh) {
                this.refreshTaskList();
                this._needToRefresh = false;
            }
        };
        __egretProto__._onInvisible = function () {
            this._needToRefresh = true;
        };
        /**
         * 根据任务id， 滚动scrollview
         * @param taskId
         */
        __egretProto__.scrollToItem = function (taskId) {
            var self = this;
            var cols = 1;
            var visualRowCount = 3;
            var totalRow = Math.ceil(self._data.length / cols);
            for (var i = 0, li = self._data.length; i < li; i++) {
                if (self._data[i].id == taskId) {
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
        /**
         *  刷新任务列表
         */
        __egretProto__.refreshTaskList = function () {
            var self = this, clazz = self.__class;
            /*
             by zxj
             这里我进行了改造，将原本的方式，改成统一从这边刷新数据，解决领取了任务后数据没有正确刷新的bug。
             */
            var data;
            if (self._taskType == uw.c_prop.taskTypeKey.daily) {
                data = uw.userDataCtrl.getDailyTaskDataCtrlList();
            }
            else {
                data = uw.userDataCtrl.getTaskDataCtrlList();
            }
            self.setVisibleByName(clazz.LABEL_NORECORD, data.length == 0);
            data.sort(self._sortOpt);
            self._data = data;
            self._gridScrollView.setTotalCount(data.length);
            self._gridScrollView.jumpToTop();
            process.nextTick(function () {
                var eventType = gEventType.refreshTasks;
                if (mo.actionDispatcher.willTrigger(eventType)) {
                    var event = new mo.Event(eventType);
                    mo.actionDispatcher.dispatchEvent(event);
                }
            });
        };
        __egretProto__._onCellDataSource = function (cell, index) {
            var info = this._data[index];
            cell.resetByData(info);
            cell.setDelegate(this);
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            mo.removeAfterEventListener(self, gEventType.visible, self._onVisible, self);
            mo.removeAfterEventListener(self, gEventType.invisible, self._onInvisible, self);
            mo.removeAfterEventListener(mo.actionDispatcher, gEventType.newSceneVisible, self.close, self);
        };
        QuestLayer.__className = "QuestLayer";
        QuestLayer.LABEL_NORECORD = "noRecord";
        return QuestLayer;
    })(mo.UIModalLayer);
    uw.QuestLayer = QuestLayer;
    QuestLayer.prototype.__class__ = "uw.QuestLayer";
})(uw || (uw = {}));

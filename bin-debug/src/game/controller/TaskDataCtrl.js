/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    uw.TASK_SORT_KEY = {
        FINISHED: "finished",
        ID: "id"
    };
    var TaskDataCtrl = (function (_super) {
        __extends(TaskDataCtrl, _super);
        function TaskDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TaskDataCtrl.prototype;
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            if (this._limitInv) {
                mo.timer.removeInvocation(this._limitInv);
            }
        };
        __egretProto__.init = function (id, finishedCount) {
            var self = this;
            _super.prototype.init.call(this, null);
            id = typeof id == "string" ? parseInt(id) : id;
            self.id = id;
            self.finishedCount = finishedCount;
            var temp = self._temp = mo.getJSONWithFileNameAndID(uw.cfg_t_task, id);
            var count = temp[uw.t_task_count];
            self.count = count;
            var timeLimit = temp[uw.t_task_timeLimit];
            if (timeLimit) {
            }
            self.lvlRequired = temp[uw.t_task_lvlRequired];
            self.subType = temp[uw.t_task_subType];
            self.arg = temp[uw.t_task_arg];
            self.vip = temp[uw.t_task_vip];
            // 设置排序用的值
            var sortKeys = uw.TASK_SORT_KEY;
            self[sortKeys.ID] = parseInt(id);
        };
        __egretProto__._onTimelimitOut = function () {
            var self = this;
            this._setChanged(self.__class.ON_FINISHED_COUNT_CHANGED);
        };
        __egretProto__.getFinishCount = function () {
            return this.finishedCount;
        };
        __egretProto__.isFinished = function () {
            var self = this;
            var finished = false;
            var task = self._temp;
            var subType = task[uw.t_task_subType];
            // 特殊处理的任务子类型: 上线领取
            if (subType == uw.c_prop.taskSubTypeKey.online) {
                var hour = (Date.newDate()).getHours();
                var timeLimit = task[uw.t_task_timeLimit];
                var arg = task[uw.t_task_arg];
                if (arg != null)
                    return uw.rechargeDataCtrl.hasMonthCardRecharged(arg); //如果是月卡，就要判断是否符合月卡条件
                if (timeLimit == null)
                    return true;
                finished = hour >= timeLimit[0] && hour < timeLimit[1];
            }
            else if (subType == uw.c_prop.taskSubTypeKey.userLvl) {
                finished = uw.userDataCtrl.getLvl() >= task[uw.t_task_arg];
            }
            else {
                finished = self.finishedCount >= self.count;
            }
            return finished;
        };
        __egretProto__.getName = function () {
            return this._temp[uw.t_task_name];
        };
        __egretProto__.getDesc = function () {
            return this._temp[uw.t_task_desc];
        };
        __egretProto__.getIcon = function () {
            return resHelper.getTaskIconPath(this.id);
        };
        __egretProto__.getIconType = function () {
            return this._temp[uw.t_task_iconType];
        };
        __egretProto__.getRewardItems = function () {
            var itemsTemp = this._temp[uw.t_task_items];
            var vipRequired = this._temp[uw.t_task_vip];
            var vip = uw.userDataCtrl.getVip();
            var items = {};
            for (var itemId in itemsTemp) {
                var value = itemsTemp[itemId];
                if (typeof value == "string") {
                    var arr = value.split("_");
                    var index = vip - vipRequired;
                    if (vipRequired == -1)
                        index -= 1; //当vip要求为-1时，表示所有用户，这是下标index需要-1才能正确
                    items[itemId] = parseInt(arr[index]);
                }
                else {
                    items[itemId] = value;
                }
            }
            return items;
        };
        __egretProto__.getSysId = function () {
            return this._temp[uw.t_task_sysId];
        };
        __egretProto__.getSubType = function () {
            return this._temp[uw.t_task_subType];
        };
        __egretProto__.getArg = function () {
            return this._temp[uw.t_task_arg];
        };
        __egretProto__.getCount = function () {
            return this._temp[uw.t_task_count];
        };
        __egretProto__.isVipTask = function () {
            return this._temp[uw.t_task_vip];
        };
        __egretProto__.getTempValue = function (key) {
            return this._temp[key];
        };
        Object.defineProperty(__egretProto__, "finished", {
            get: function () {
                return this.isFinished() ? true : false;
            },
            enumerable: true,
            configurable: true
        });
        TaskDataCtrl.__className = "TaskDataCtrl";
        TaskDataCtrl.ON_FINISHED_COUNT_CHANGED = "onFinishedCountChanged";
        return TaskDataCtrl;
    })(mo.DataController);
    uw.TaskDataCtrl = TaskDataCtrl;
    TaskDataCtrl.prototype.__class__ = "uw.TaskDataCtrl";
})(uw || (uw = {}));

/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var QuestItem = (function (_super) {
        __extends(QuestItem, _super);
        function QuestItem() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = QuestItem.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiQuestItem_ui;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            var rws = this._rws = {};
            rws[uw.c_prop.spItemIdKey.gold] = self._createRewardItem(uw.c_prop.spItemIdKey.gold);
            rws[uw.c_prop.spItemIdKey.diamond] = self._createRewardItem(uw.c_prop.spItemIdKey.diamond);
            rws[uw.c_prop.spItemIdKey.strength] = self._createRewardItem(uw.c_prop.spItemIdKey.strength);
            rws[uw.c_prop.spItemIdKey.userExpc] = self._createRewardItem(uw.c_prop.spItemIdKey.userExpc);
            self._rwCommon = [];
            self.loadMaskTextureByName(self.__class.TASK_ICON, res.SpecialItemIcon.taskMask);
        };
        __egretProto__.resetByData = function (taskCtrl) {
            var self = this, clazz = self.__class;
            self._taskCtrl = taskCtrl;
            var finished = taskCtrl.isFinished();
            //下面通过设置name，可以在外部简单获取到cell
            var taskId = taskCtrl.id; //获取任务id
            self.setName("cell_taskId_" + taskId);
            // 显示基本信息
            self.setInfoByName(clazz.LABEL_NAME, taskCtrl.getName());
            self.setInfoByName(clazz.LABEL_DESC, taskCtrl.getDesc());
            self.setMaskEnabledByName(clazz.TASK_ICON, taskCtrl.getIconType() == uw.c_prop.taskIconTypeKey.hero);
            self.setInfoByName(clazz.TASK_ICON, taskCtrl.getIcon());
            self.setScaleByName(clazz.TASK_ICON, 0.8, 0.8);
            // 显示奖励
            self._showBounds();
            // 设置进度
            self._setProgress();
            // 设置前往按钮
            var sysId = taskCtrl.getSysId();
            // 如果满足: 1.未完成 2.需要前往其他系统或者任务子类型是"指定通关副本"
            var showMe = !finished && (sysId || taskCtrl.getSubType() == uw.c_prop.taskSubTypeKey.copyId);
            self.setVisibleByName(clazz.BTN_GOTO, showMe);
            self.setTouchEnabledByName(clazz.BTN_GOTO, showMe);
            self.onClickByName(clazz.BTN_GOTO, self._gotoSystem, self);
            // 开启领奖按钮
            self.onClickByName(clazz.BTN_GETREWARD, function () {
                //检查是否有达到最大获得数量的物品
                uw.confirmMaxGetItems(self._taskCtrl.getRewardItems(), self._award, self);
            }, self);
            self.setVisibleByName(clazz.BTN_GETREWARD, finished);
            self.setTouchEnabledByName(clazz.BTN_GETREWARD, finished);
            //按期领奖按钮后面的旋转光
            var btnGetRewardBg = this.getWidgetByName(clazz.BG_GETREWARD);
            btnGetRewardBg.setVisible(finished);
            btnGetRewardBg.setScale(0.8);
            if (finished) {
                var actRotation = mo.repeatForever(mo.rotateBy(10, 360));
                btnGetRewardBg.runAction(actRotation);
            }
            else {
                btnGetRewardBg.stopAllActions();
            }
            //by zxj 这个地方需要修改，因为cell是复用的，必须每次进来都决定使用哪个FrameName。
            var ui_panel = res.ui_panel;
            var frameName = finished ? ui_panel.blk9_gold_png : ui_panel.blk9_gold2_png;
            //切换背景
            var bg = self.getWidgetByName("bg");
            bg.bgTexture = frameName;
        };
        /**
         *  设置任务进度
         * @private
         */
        __egretProto__._setProgress = function () {
            var self = this;
            var task = self._taskCtrl;
            var subType = task.getSubType();
            var arg = task.getArg();
            var count = task.getCount();
            self.setVisibleByName(self.__class.LABEL_TASK_COUNT, true);
            var taskSubTypeKey = uw.c_prop.taskSubTypeKey;
            switch (subType) {
                case taskSubTypeKey.userLvl:
                    self.setInfoByName(self.__class.LABEL_TASK_COUNT, mo.formatStr("%s/%s", uw.userDataCtrl.getLvl(), arg));
                    self.enableStrokeByName(self.__class.LABEL_TASK_COUNT, mo.c3b(114, 0, 0), 3);
                    break;
                case taskSubTypeKey.lotteryCount:
                case taskSubTypeKey.lotteryType:
                case taskSubTypeKey.fight:
                case taskSubTypeKey.passCount:
                case taskSubTypeKey.copyId:
                case taskSubTypeKey.gainHero:
                case taskSubTypeKey.trainHero:
                case taskSubTypeKey.skillUpCount:
                case taskSubTypeKey.skillUpLvl:
                case taskSubTypeKey.equipUpCount:
                case taskSubTypeKey.equipUpLvl:
                case taskSubTypeKey.exclusiveUpCount:
                case taskSubTypeKey.exclusiveUpLvl:
                case taskSubTypeKey.upHeroTrainLvl:
                case taskSubTypeKey.buyGold:
                case taskSubTypeKey.equipUpgradeCount:
                case taskSubTypeKey.equipUpgradeLvl:
                case taskSubTypeKey.normalEquipCount:
                case taskSubTypeKey.exchangeCount:
                case taskSubTypeKey.trainGoalStats:
                case taskSubTypeKey.trainSpecial:
                    self.setInfoByName(self.__class.LABEL_TASK_COUNT, mo.formatStr("%s/%s", task.getFinishCount(), count));
                    self.enableStrokeByName(self.__class.LABEL_TASK_COUNT, mo.c3b(114, 0, 0), 3);
                    break;
                default:
                    self.setVisibleByName(self.__class.LABEL_TASK_COUNT, false);
                    break;
            }
        };
        /* 领取奖励 */
        __egretProto__._award = function () {
            var self = this;
            uw.userDataCtrl.getTaskReward(self._taskCtrl.id, function () {
                uw.log("成功领取完奖励，将任务从列表中移除");
                var dlg = self.getDelegate();
                dlg.refreshTaskList();
            }, self);
        };
        /**
         *  前往某个系统
         * @private
         */
        __egretProto__._gotoSystem = function () {
            var self = this;
            //获取任务目标系统ID
            var sysId = self._taskCtrl.getSysId();
            // 如果是挑战指定副本ID的任务则特殊处理
            var copyId = null;
            if (self._taskCtrl.getSubType() == uw.c_prop.taskSubTypeKey.copyId) {
                copyId = self._taskCtrl.getArg();
                var copyTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
                var copyType = copyTemp[uw.t_copy_type];
                switch (copyType) {
                    case uw.c_prop.copyTypeKey.normal:
                    case uw.c_prop.copyTypeKey.normalBoss:
                        sysId = uw.c_prop.taskSysIdKey.normalCopy;
                        break;
                    case uw.c_prop.copyTypeKey.cream:
                    case uw.c_prop.copyTypeKey.creamBoss:
                        sysId = uw.c_prop.taskSysIdKey.creamCopy;
                        break;
                }
            }
            var moduleName, args = [], otherArgs;
            var c_open = uw.id_c_open;
            var openId;
            var taskSysIdKey = uw.c_prop.taskSysIdKey;
            switch (sysId) {
                case taskSysIdKey.normalCopy:
                    moduleName = uw.SubModule.Copy;
                    openId = c_open.easyCopy;
                    otherArgs = [copyId, uw.c_prop.pCopyTypeKey.normal];
                    break;
                case taskSysIdKey.creamCopy:
                    moduleName = uw.SubModule.Copy;
                    openId = c_open.creamCopy;
                    otherArgs = [copyId, uw.c_prop.pCopyTypeKey.cream];
                    break;
                case taskSysIdKey.guardTower:
                    moduleName = uw.SubModule.Tower;
                    openId = c_open.tower;
                    break;
                case taskSysIdKey.mirror:
                    moduleName = uw.SubModule.Mirror;
                    openId = c_open.boss;
                    break;
                case taskSysIdKey.arena:
                    moduleName = uw.SubModule.Arena;
                    openId = c_open.arena;
                    break;
                case taskSysIdKey.trail:
                    moduleName = uw.SubModule.Valley;
                    openId = c_open.trainOfBlood;
                    break;
                case taskSysIdKey.hero:
                    moduleName = uw.SubModule.Hero;
                    openId = c_open.hero;
                    break;
                case taskSysIdKey.forge:
                    moduleName = uw.SubModule.ForgingFactory;
                    openId = c_open.hero;
                    break;
                case taskSysIdKey.buyGold:
                    moduleName = uw.SubModule.Alchemy;
                    openId = c_open.buyGold;
                    break;
                case taskSysIdKey.lottery:
                    moduleName = uw.SubModule.WishingWell;
                    openId = c_open.lottery;
                    break;
                case taskSysIdKey.exchange:
                    moduleName = uw.SubModule.Mix;
                    openId = c_open.fragmentSynthesis;
                    break;
                case taskSysIdKey.reCharge:
                    moduleName = uw.SubModule.Charge;
                    openId = 0;
                    break;
                default:
                    uw.error("未知的目标系统");
                    break;
            }
            var open = uw.verifyLevel(openId);
            if (open) {
                args.push(moduleName);
                args = args.concat(otherArgs);
                args.push("task"); //fromWhere
                uw.pushSubModule.apply(uw, args);
            }
        };
        __egretProto__._showBounds = function () {
            var self = this;
            var rws = self._rws;
            var rwCommon = self._rwCommon;
            var index = 0;
            for (var key in rws) {
                var widgetCtrl = rws[key];
                widgetCtrl.detachWidget();
            }
            for (var i = 0, li = rwCommon.length; i < li; i++) {
                var widgetCtrl = rwCommon[i];
                widgetCtrl.detachWidget();
            }
            var items = self._taskCtrl.getRewardItems();
            //排序：领主经验>钻石>金币>其他物品
            var normalItemIds = [], spItems = [];
            for (id in items) {
                var idd = parseInt(id);
                switch (idd) {
                    case uw.c_prop.spItemIdKey.diamond:
                    case uw.c_prop.spItemIdKey.gold:
                    case uw.c_prop.spItemIdKey.userExpc:
                        spItems.push(id);
                        break;
                    default:
                        normalItemIds.push(id);
                        break;
                }
            }
            spItems.sort(function (a, b) {
                return parseInt(a) < parseInt(b) ? 1 : -1;
            });
            normalItemIds.sort(function (a, b) {
                return parseInt(a) < parseInt(b) ? 1 : -1;
            });
            var sortedItems = spItems.concat(normalItemIds); //合并
            // 使用相应图标显示奖励
            var id, count, widgetCtrl;
            var reward_panel = self.getWidgetByName("reward_panel");
            reward_panel.layoutType = mo.LayoutType.linearHorizontal;
            for (var i = 0, li = sortedItems.length; i < li; i++) {
                id = parseInt(sortedItems[i]);
                count = items[id];
                switch (id) {
                    case uw.c_prop.spItemIdKey.diamond:
                    case uw.c_prop.spItemIdKey.gold:
                    case uw.c_prop.spItemIdKey.userExpc:
                    case uw.c_prop.spItemIdKey.strength:
                        widgetCtrl = rws[id];
                        widgetCtrl.resetByData(id, count);
                        widgetCtrl.attachWidgetTo(reward_panel);
                        break;
                    default:
                        widgetCtrl = rwCommon[index++];
                        if (!widgetCtrl) {
                            widgetCtrl = self._createRewardItem(id, count);
                            rwCommon.push(widgetCtrl);
                        }
                        else {
                            widgetCtrl.resetByData(id, count);
                        }
                        widgetCtrl.attachWidgetTo(reward_panel);
                        break;
                }
            }
            // 线性布局
            reward_panel.doLayout();
        };
        //构建一个奖励Item:物品x数量
        __egretProto__._createRewardItem = function (tempId, count) {
            if (count === void 0) { count = 0; }
            var iconCountCtrl = uw.UIIconCountCtrl.create(tempId, count || 0);
            var parameter = mo.LinearLayoutParameter.create();
            var gravity = mo.LinearGravity.bottom;
            parameter.setGravity(gravity);
            parameter.setMargin(new mo.Margin(0, 50, 0, 0));
            iconCountCtrl.widget.setLayoutParameter(parameter);
            iconCountCtrl.isAutoDtor = false;
            return iconCountCtrl;
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            var rws = self._rws, rwCommon = self._rwCommon;
            for (var key in rws) {
                var widgetCtrl = rws[key];
                widgetCtrl.doDtor();
            }
            self._rws = null;
            for (var i, li = rwCommon.length; i < li; i++) {
                var widgetCtrl = rwCommon[i];
                widgetCtrl.doDtor();
            }
            self._rwCommon = null;
        };
        QuestItem.__className = "QuestItem";
        QuestItem.TASK_ICON = "task_icon";
        QuestItem.LABEL_NAME = "name";
        QuestItem.LABEL_DESC = "desc";
        QuestItem.LABEL_TASK_COUNT = "task_count";
        QuestItem.BTN_GOTO = "btnGoto";
        QuestItem.BTN_GETREWARD = "btnGetReward";
        QuestItem.BG_GETREWARD = "btnGetRewardBg";
        return QuestItem;
    })(mo.GridViewCell);
    uw.QuestItem = QuestItem;
    QuestItem.prototype.__class__ = "uw.QuestItem";
})(uw || (uw = {}));

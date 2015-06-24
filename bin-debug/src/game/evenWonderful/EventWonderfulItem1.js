/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var GiftGridCtrl = (function (_super) {
        __extends(GiftGridCtrl, _super);
        function GiftGridCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GiftGridCtrl.prototype;
        __egretProto__._initItemWidget = function (widget) {
            var self = this;
            var ctrl = uw.UIItemIconCtrl.create(widget);
            ctrl.showTip(true, uw.UIItemIconCtrl.LABEL_PRICE);
            //var scale = self._containerH/widget.height;
            widget.setScale(0.7);
        };
        __egretProto__._createItemWidget = function () {
            var panel = mo.UIPanel.create();
            panel.setSize(230, 230);
            return panel;
        };
        //@override
        __egretProto__._resetItemByData = function (widget, data, index) {
            var self = this, clazz = self.__class;
            var container = widget;
            var iconCtrl = container.iconCtrl;
            iconCtrl.resetByData(data);
            iconCtrl.setVisibleByName(iconCtrl.__class.LABEL_COUNT, true);
        };
        GiftGridCtrl.__className = "GiftGridCtrl";
        return GiftGridCtrl;
    })(mo.GridController);
    uw.GiftGridCtrl = GiftGridCtrl;
    GiftGridCtrl.prototype.__class__ = "uw.GiftGridCtrl";
    var SUBJECTS = {};
    SUBJECTS[uw.c_prop.activityTypeKey.dayChargeCount] = "今日累积充值";
    SUBJECTS[uw.c_prop.activityTypeKey.allChargeCount] = "累积充值";
    SUBJECTS[uw.c_prop.activityTypeKey.dayCostCount] = "今日累积消费";
    SUBJECTS[uw.c_prop.activityTypeKey.allCostCount] = "累积消费";
    var EventWonderfulItem1 = (function (_super) {
        __extends(EventWonderfulItem1, _super);
        function EventWonderfulItem1() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EventWonderfulItem1.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiEventWonderfulItem1_ui;
        };
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            self.onClickByName(clazz.BTNGETAWARD, self.menuGetAward, self);
        };
        __egretProto__.menuGetAward = function () {
            var self = this, clazz = self.__class;
            var opt = self._opt;
            if (opt.enough) {
                return uw.userDataCtrl.receiveMainActivity(self._activityId, self._activityType, self._index, 0, function (itemsInfo) {
                    uw.showGainTips(itemsInfo);
                    self.refreshBtn();
                });
            }
            switch (self._activityType) {
                case uw.c_prop.activityTypeKey.dayChargeCount:
                case uw.c_prop.activityTypeKey.allChargeCount:
                    return mo.showMsg(uw.id_c_msgCode.totalChargeNotEnough, opt.needCount);
                    break;
                case uw.c_prop.activityTypeKey.dayCostCount:
                case uw.c_prop.activityTypeKey.allCostCount:
                    return mo.showMsg(uw.id_c_msgCode.totalCostNotEnough, opt.needCount);
                    break;
                case uw.c_prop.activityTypeKey.upLvl:
                    return mo.showMsg(uw.id_c_msgCode.lvNotEnough, opt.needCount);
                    break;
            }
        };
        __egretProto__.resetByData = function (activityId, data, index, activityCtrl) {
            var self = this, clazz = self.__class;
            self._data = data;
            self._activityId = activityId;
            self._activityCtrl = activityCtrl;
            self._activityType = activityCtrl.get(activityCtrl.DATA_KEY.type);
            self._index = index;
            //ActivityItem:{items:1,diamond:2,userLvl:3,limitNum:4}
            var KEY = uw.dsConsts.ActivityItem;
            var items = data[KEY.items];
            if (!self._gridCtrl) {
                var ctrl = self._gridCtrl = uw.GiftGridCtrl.create(self.getWidgetByName("awardList"), 5);
                ctrl.setLayoutType(2);
            }
            var itemArr = [];
            for (var itemId in items) {
                itemArr.push(uw.BagDataCtrl.create(itemId, items[itemId]));
            }
            self._gridCtrl.resetByData(itemArr);
            self.setTitle();
            self.refreshBtn();
        };
        __egretProto__.setTitle = function () {
            var self = this, clazz = self.__class;
            var data = self._data, activityId = self._activityId, index = self._index, activityCtrl = self._activityCtrl;
            var DATA_KEY = activityCtrl.DATA_KEY, KEY = uw.dsConsts.ActivityItem;
            var activityType = self._activityType;
            var needDiamond = data[KEY.diamond];
            var needLvl = data[KEY.userLvl];
            switch (activityType) {
                case uw.c_prop.activityTypeKey.dayChargeCount:
                case uw.c_prop.activityTypeKey.allChargeCount:
                    self.setVisibleByName(clazz.PANEL_CHARGE, true);
                    self.setVisibleByName(clazz.PANEL_LEADER, false);
                    self.setInfoByName(clazz.LABEL_DIAMOND, { value: mo.formatStr("[ubb color=#6DD1FF]%s[/ubb]回馈礼包", needDiamond), fontSize: 55 });
                    break;
                case uw.c_prop.activityTypeKey.dayCostCount:
                case uw.c_prop.activityTypeKey.allCostCount:
                    self.setVisibleByName(clazz.PANEL_CHARGE, true);
                    self.setVisibleByName(clazz.PANEL_LEADER, false);
                    self.setInfoByName(clazz.LABEL_DIAMOND, { value: mo.formatStr("[ubb color=#6DD1FF]%s[/ubb]福利包", needDiamond), fontSize: 55 });
                    break;
                case uw.c_prop.activityTypeKey.upLvl:
                    self.setVisibleByName(clazz.PANEL_CHARGE, false);
                    self.setVisibleByName(clazz.PANEL_LEADER, true);
                    self.setInfoByName(clazz.LABEL_LVL, needLvl);
                    break;
            }
            self.setInfoByName(clazz.LABEL_SUBJECT, SUBJECTS[activityType]);
            self.doLayoutByName(clazz.PANEL_CHARGE);
            self.doLayoutByName(clazz.PANEL_LEADER);
        };
        //获得领奖信息
        __egretProto__._getRewardOpt = function () {
            var self = this, clazz = self.__class;
            var data = self._data, activityId = self._activityId, index = self._index, activityCtrl = self._activityCtrl;
            var DATA_KEY = activityCtrl.DATA_KEY, KEY = uw.dsConsts.ActivityItem;
            var activityType = self._activityType;
            var opt = {
                isGot: false,
                enough: false,
                needCount: 0,
                curCount: 0
            };
            // 设置领奖按钮
            var curCount = 0; //当前数量
            var needCount = 0; //需要数量
            switch (activityType) {
                case uw.c_prop.activityTypeKey.dayChargeCount:
                    curCount = activityCtrl.get(DATA_KEY.todayRecharge);
                    needCount = data[KEY.diamond];
                    break;
                case uw.c_prop.activityTypeKey.allChargeCount:
                    curCount = activityCtrl.get(DATA_KEY.allRecharge);
                    needCount = data[KEY.diamond];
                    break;
                case uw.c_prop.activityTypeKey.dayCostCount:
                    curCount = activityCtrl.get(DATA_KEY.todayCost);
                    needCount = data[KEY.diamond];
                    break;
                case uw.c_prop.activityTypeKey.allCostCount:
                    curCount = activityCtrl.get(DATA_KEY.allCost);
                    needCount = data[KEY.diamond];
                    break;
                case uw.c_prop.activityTypeKey.upLvl:
                    curCount = uw.userDataCtrl.getLvl();
                    needCount = data[KEY.userLvl];
                    break;
            }
            opt.needCount = needCount;
            opt.curCount = curCount;
            opt.isGot = uw.userDataCtrl.isActivityAwardGot(activityId, activityType, index);
            opt.enough = curCount >= needCount;
            return opt;
        };
        __egretProto__.refreshBtn = function () {
            var self = this, clazz = self.__class;
            var opt = self._opt = self._getRewardOpt();
            // 设置已领状态
            var isGot = opt.isGot;
            self.setVisibleByName(clazz.IMGGOT, isGot);
            // 设置领奖按钮
            var enough = opt.enough;
            self.setVisibleByName(clazz.BTNGETAWARD, !isGot);
            var btnGetRewardBg = this.getWidgetByName(clazz.BTNGETREWARDBG);
            btnGetRewardBg.setVisible(false);
            btnGetRewardBg.stopAllActions();
            if (!isGot && enough) {
                //按期领奖按钮后面的旋转光
                btnGetRewardBg.setVisible(true);
                btnGetRewardBg.setScale(0.8);
                var actRotation = mo.repeatForever(mo.rotateBy(10, 360));
                btnGetRewardBg.runAction(actRotation);
            }
        };
        EventWonderfulItem1.__className = "EventWonderfulItem1";
        EventWonderfulItem1.IMGGOT = "imgGot"; //已领取
        EventWonderfulItem1.BTNGETAWARD = "btnGetAward";
        EventWonderfulItem1.PANEL_CHARGE = "panel_charge"; //充值/消费标题显示
        EventWonderfulItem1.PANEL_LEADER = "panel_leader"; //领主升级标题显示
        EventWonderfulItem1.LABEL_DIAMOND = "label_diamond"; //所需钻石
        EventWonderfulItem1.LABEL_SUBJECT = "label_subject"; //主题
        EventWonderfulItem1.LABEL_LVL = "label_lvl";
        EventWonderfulItem1.BTNGETREWARDBG = "btnGetRewardBg"; //可领奖时的放光图
        return EventWonderfulItem1;
    })(mo.GridViewCell);
    uw.EventWonderfulItem1 = EventWonderfulItem1;
    EventWonderfulItem1.prototype.__class__ = "uw.EventWonderfulItem1";
})(uw || (uw = {}));

/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var trialHelper;
    (function (trialHelper) {
        trialHelper._stateArr = []; //开启状态列表。true表示开启，false表示未开启
        trialHelper._openInfoArr; //开启配置信息列表
        trialHelper.trialPCopyIds = [
            uw.c_prop.pCopyIdKey.trial1,
            uw.c_prop.pCopyIdKey.trial2,
            uw.c_prop.pCopyIdKey.trial3
        ];
        function refresh() {
            //获取open配置
            var c_open = mo.getJSONWithFileName(uw.cfg_c_open);
            var openInfoArr = trialHelper._openInfoArr = [c_open[uw.id_c_open.trial1], c_open[uw.id_c_open.trial2], c_open[uw.id_c_open.trial3]]; //open表对应的信息
            trialHelper._stateArr = []; //打开状态映射
            for (var i = 0, l_i = openInfoArr.length; i < l_i; i++) {
                var openInfo = openInfoArr[i];
                var weekday = openInfo[uw.c_open_weekday].split(",");
                var date = Date.newDate();
                var dayIndex = date.getDay() == 0 ? "7" : date.getDay() + "";
                trialHelper._stateArr[i] = weekday.indexOf(dayIndex) >= 0; //判断是否今日可开启
            }
        }
        trialHelper.refresh = refresh;
        /**
         * 判断一个trial副本是否开启。
         * @param copyId    trial子副本id
         * @returns {*}
         */
        function isOpen(copyId) {
            refresh();
            var cp = uw.userDataCtrl.getCopyProgressByCopyId(copyId);
            var pCopyId = cp.id;
            for (var i = 0, l_i = trialHelper.trialPCopyIds.length; i < l_i; i++) {
                if (pCopyId == trialHelper.trialPCopyIds[i]) {
                    return trialHelper._stateArr[i];
                }
            }
            return false;
        }
        trialHelper.isOpen = isOpen;
    })(trialHelper = uw.trialHelper || (uw.trialHelper = {}));
})(uw || (uw = {}));
var uw;
(function (uw) {
    var UITrialPCopyLayer = (function (_super) {
        __extends(UITrialPCopyLayer, _super);
        function UITrialPCopyLayer() {
            _super.call(this);
        }
        var __egretProto__ = UITrialPCopyLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiTrialPCopy_ui;
        };
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            uw.trialHelper.refresh(); //刷新trial信息
            self.setAdaptiveScaleByName(self.__class.IMG_BG, mo.RESOLUTION_POLICY.NO_BORDER);
            self.setAdaptiveScaleByName(self.__class.PANEL_BOTTOM, mo.RESOLUTION_POLICY.FIXED_WIDTH);
            self._srcRotationArr = []; //原始的旋转角度映射
            self._rotationArr = [-3, 0, 3]; //选择的卡牌的旋转角度
            for (var i = 0; i < 3; i++) {
                self._initPCopyPanel(i);
            }
            var firstOpenedIndex = 0, stateArr = uw.trialHelper._stateArr;
            for (var i = 0, li = stateArr.length; i < li; i++) {
                if (stateArr[i]) {
                    firstOpenedIndex = i;
                    break;
                }
            }
            self._setPCopySelected(firstOpenedIndex);
            self.onClickByName(self.__class.BTN_EMBATTLE, self._onEmbattle, self);
        };
        __egretProto__.onEnter = function () {
            var self = this;
            _super.prototype.onEnter.call(this);
            if (self._oldCurPCopyIndex != null) {
                self._setPCopySelected(self._oldCurPCopyIndex);
                self._oldCurPCopyIndex = null;
            }
            if (self._copyDlg) {
                self._copyDlg.close();
                self._copyDlg = null;
            }
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            var self = this;
            self._oldCurPCopyIndex = self._curPCopyIndex;
            self._curPCopyIndex = null;
        };
        //初始化主副本的面板
        __egretProto__._initPCopyPanel = function (pCopyIndex) {
            var self = this;
            var widgetName = mo.formatStr(self.__class.TMP_PANEL_P_COPY, pCopyIndex);
            var widget = self.getWidgetByName(widgetName);
            self._srcRotationArr[pCopyIndex] = widget.getWidgetByName(self.__class.IMG_COPY).getRotation(); //先保存原来的旋转角度
            widget.pCopyIndex = pCopyIndex; //设置pCopyIndex到widget中
            self.onClickByName(widgetName, self._onPCopyClick, self); //设置点击事件
        };
        //获取主副本图片
        __egretProto__._getPCopyFrameName = function (pCopyIndex, isFocus) {
            var index = uw.trialHelper._stateArr[pCopyIndex] ? (isFocus ? 1 : 2) : 0;
            return mo.formatStr(res.ui_trial.tmp_bg_cCopy_png, pCopyIndex, index);
        };
        //播放点击的动画
        __egretProto__._playActWhenPCopyClicked = function (pCopyIndex) {
            var self = this;
            if (self._curPCopyIndex == pCopyIndex)
                return;
            for (var i = 0; i < 3; ++i) {
                var widgetName = mo.formatStr(self.__class.TMP_PANEL_P_COPY, i);
                var widget = self.getWidgetByName(widgetName);
                var isPre = i == self._curPCopyIndex, isCurr = i == pCopyIndex;
                var stateFrameName = res.ui_trial.totum_1_png;
                var imgCopy = widget.getWidgetByName(self.__class.IMG_COPY);
                imgCopy.setOption(self._getPCopyFrameName(i, isCurr));
                widget.setZOrder(10);
                var rotation;
                if (isPre) {
                    rotation = self._srcRotationArr[pCopyIndex];
                    var seq = mo.spawn(mo.moveTo(0.1, this._originPosition), mo.rotateTo(0.1, rotation), mo.scaleTo(0.1, 1)).setEase(mo.Ease.sineOut);
                    imgCopy.stopAllActions();
                    imgCopy.runAction(seq);
                }
                else if (isCurr) {
                    this._originPosition = imgCopy.getPosition();
                    widget.setZOrder(100);
                    rotation = self._rotationArr[pCopyIndex];
                    var seq = mo.sequence(mo.spawn(mo.rotateTo(0.1, rotation), mo.scaleTo(0.1, 1.2)).setEase(mo.Ease.backOut), mo.callFunc(function (sender) {
                        var circleAction = mo.repeatForever(mo.ellipse(3, imgCopy.getPosition(), 10, 5));
                        sender.runAction(circleAction);
                    }, self));
                    imgCopy.stopAllActions();
                    imgCopy.runAction(seq);
                    stateFrameName = uw.trialHelper._stateArr[i] ? res.ui_trial.totum_2_png : res.ui_trial.totum_3_png;
                }
                widget.setInfoByName(self.__class.IMG_STATE, stateFrameName);
            }
            self._curPCopyIndex = pCopyIndex;
        };
        //主副本卡被点击的事件
        __egretProto__._onPCopyClick = function (sender) {
            this._setPCopySelected(sender.pCopyIndex);
        };
        //设置主副本选中
        __egretProto__._setPCopySelected = function (pCopyIndex) {
            var self = this;
            var udCtrl = uw.userDataCtrl;
            if (pCopyIndex == self._curPCopyIndex) {
            }
            var pCopyId = uw.trialHelper.trialPCopyIds[pCopyIndex]; //获取主副本id
            var pCopyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copyPrimary, pCopyId); //获取主副本信息
            var firstCopyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, pCopyInfo[uw.t_copyPrimary_firstId]); //第一个子副本信息
            var openInfo = uw.trialHelper._openInfoArr[pCopyIndex]; //获取开启配置信息
            var isOpened = uw.trialHelper._stateArr[pCopyIndex]; //是否开启
            self._playActWhenPCopyClicked(pCopyIndex);
            //获取副本进度
            var progress = uw.userDataCtrl.getCopyProgress(pCopyId);
            var isCd = false, cdMS = 0; //是否cd以及cd时间（毫秒）
            var lastTime = progress.pTime;
            if (lastTime) {
                var date = Date.newDate();
                cdMS = lastTime.getTime() - date.getTime();
                isCd = cdMS > 0;
            }
            //设置是否可见
            self.setVisibleByName(self.__class.PANEL_UNOPENED, !isOpened);
            self.setVisibleByName(self.__class.PANEL_OPENED_LEFT, isOpened);
            self.setVisibleByName(self.__class.BTN_EMBATTLE, isOpened && !isCd);
            self.setVisibleByName(self.__class.PANEL_CD, isOpened && isCd);
            if (self._inv) {
                mo.timer.removeInvocation(self._inv);
                self._inv = null;
            }
            if (isOpened) {
                var leftCount = Math.max(0, uw.trialFreeCount - progress.getTotalTimes());
                self.formatByName(self.__class.LABEL_LEFT_COUNT, leftCount); //今日剩余次数
                self.formatByName(self.__class.LABEL_ITEM_COUNT, udCtrl.getItemNum(uw.trialItemId)); //道具数量
                self.formatByName(self.__class.LABEL_STRENGTH, firstCopyInfo[uw.t_copy_strength]); //消耗的体力
                if (isCd) {
                    self._inv = self.countdownByName(self.__class.LABEL_CD, cdMS, function () {
                    }, null, function () {
                        self._inv = null;
                        self.setVisibleByName(self.__class.BTN_EMBATTLE, true);
                        self.setVisibleByName(self.__class.PANEL_CD, false);
                    }, null);
                }
            }
            else {
                self.setInfoByName(self.__class.LABEL_OPEN_TIME, mo.getWeekdayDesc(openInfo[uw.c_open_weekday]));
            }
            //显示物品掉落
            self._initItems(progress);
        };
        //设置掉落信息
        __egretProto__._initItems = function (progressCtrl) {
            var self = this;
            var itemsPanel = self.getWidgetByName(self.__class.PANEL_ITEMS);
            itemsPanel.removeChildren();
            var copyIds = progressCtrl.copyIds;
            var itemIds = [];
            for (var i = 0, li = copyIds.length; i < li; i++) {
                var lootItems = progressCtrl.getShowLootsByCopyId(copyIds[i]);
                for (var j = 0, lj = lootItems.length; j < lj; j++) {
                    var itemId = lootItems[i];
                    if (itemId && itemIds.indexOf(itemId) < 0)
                        itemIds.push(itemId);
                }
            }
            var h = itemsPanel.getSize().height;
            for (var i = 0, li = itemIds.length; i < li; i++) {
                var itemId = itemIds[i];
                var container = mo.UIPanel.create();
                container.setSize(mo.size(h, h));
                container.setPosition(mo.p((h + 20) * i, 0));
                itemsPanel.addChild(container);
                var ctrl = uw.UIItemIconCtrl.create(container, itemId);
                ctrl.showTip(true);
            }
        };
        //出战
        __egretProto__._onEmbattle = function () {
            var self = this;
            var pCopyId = uw.trialHelper.trialPCopyIds[self._curPCopyIndex];
            var progress = uw.userDataCtrl.getCopyProgress(pCopyId);
            var leftCount = Math.max(0, uw.trialFreeCount - progress.getTotalTimes());
            if (leftCount > 0) {
                self.showTrialCopyDlg(pCopyId);
            }
            else {
                if (uw.userDataCtrl.getItemNum(uw.trialItemId) > 0) {
                    mo.showMsg(uw.id_c_msgCode.ifUseTrialLogic, function () {
                        self.showTrialCopyDlg(pCopyId);
                    });
                }
                else {
                    mo.showMsg(uw.id_c_msgCode.noChallengeTimes); //挑战次数不足
                }
            }
        };
        __egretProto__.showTrialCopyDlg = function (pCopyId) {
            var self = this;
            self._copyDlg = uw.UITrialCopyDlg.create(pCopyId);
            self._copyDlg.setDelegate(this);
            self._copyDlg.show();
        };
        __egretProto__.showCopyInfoLayer = function (copyId) {
            uw.pushSubModule(uw.SubModule.CopyInfo, copyId);
        };
        UITrialPCopyLayer.__className = "UITrialPCopyLayer";
        UITrialPCopyLayer.IMG_BG = "img_bg"; //背景
        UITrialPCopyLayer.PANEL_UP = "panel_up"; //上半部分的panel
        UITrialPCopyLayer.TMP_PANEL_P_COPY = "panel_pCopy_%s";
        UITrialPCopyLayer.IMG_COPY = "img_copy"; //副本图片
        UITrialPCopyLayer.IMG_STATE = "img_state"; //副本状态图片
        UITrialPCopyLayer.PANEL_BOTTOM = "panel_bottom"; //下半部分的panel
        UITrialPCopyLayer.PANEL_UNOPENED = "panel_unopened"; //未开启的panel
        UITrialPCopyLayer.LABEL_OPEN_TIME = "label_openTime"; //开启时间
        UITrialPCopyLayer.PANEL_ITEMS = "panel_items"; //掉落物品容器
        UITrialPCopyLayer.PANEL_OPENED_LEFT = "panel_openedLeft"; //开启时左侧的信息描述容器
        UITrialPCopyLayer.LABEL_LEFT_COUNT = "label_leftCount"; //今日剩余多少次【%s次】
        UITrialPCopyLayer.LABEL_ITEM_COUNT = "label_itemCount"; //消耗的体力【x%s】
        UITrialPCopyLayer.LABEL_STRENGTH = "label_strength"; //消耗的体力【x%s】
        UITrialPCopyLayer.BTN_EMBATTLE = "btn_embattle"; //出战按键
        UITrialPCopyLayer.PANEL_CD = "panel_cd"; //时间面板
        UITrialPCopyLayer.LABEL_CD = "label_cd"; //挑战冷却时间
        return UITrialPCopyLayer;
    })(mo.DisplayLayer);
    uw.UITrialPCopyLayer = UITrialPCopyLayer;
    UITrialPCopyLayer.prototype.__class__ = "uw.UITrialPCopyLayer";
})(uw || (uw = {}));

var uw;
(function (uw) {
    var HeroTrainPropGridCtrl = (function (_super) {
        __extends(HeroTrainPropGridCtrl, _super);
        function HeroTrainPropGridCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HeroTrainPropGridCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._itemJsonPath = res.uiHeroTrainProp_ui;
        };
        //@override
        __egretProto__._resetItemByData = function (widget, data, index) {
            var self = this, clazz = self.__class;
            var color1 = data.isDark ? cc.c3b(100, 100, 100) : cc.c3b(213, 213, 213);
            var color2 = data.isDark ? cc.c3b(100, 65, 0) : cc.c3b(244, 179, 1);
            var color3 = data.isDark ? cc.c3b(105, 40, 0) : cc.c3b(102, 155, 0);
            widget.setInfoByName(clazz.LABEL_NAME, { value: data.name, color: color1 });
            widget.setInfoByName(clazz.LABEL_SRC, { value: data.src, color: color2 });
            widget.setInfoByName(clazz.LABEL_TRAIN, { value: data.train, color: color3 }); //
            widget.formatByName(clazz.LABEL_UP, Math.abs(data.cur)); //升
            widget.formatByName(clazz.LABEL_DOWN, Math.abs(data.cur)); //降
            widget.setVisibleByName(clazz.LABEL_UP, data.cur > 0);
            widget.setVisibleByName(clazz.LABEL_DOWN, data.cur < 0);
            widget.setVisibleByName(clazz.IMG_UP, data.cur > 0);
            widget.setVisibleByName(clazz.IMG_DOWN, data.cur < 0);
        };
        HeroTrainPropGridCtrl.__className = "HeroTrainPropGridCtrl";
        HeroTrainPropGridCtrl.LABEL_NAME = "label_name"; //属性名称
        HeroTrainPropGridCtrl.LABEL_SRC = "label_src"; //原属性
        HeroTrainPropGridCtrl.LABEL_TRAIN = "label_train"; //培养属性
        HeroTrainPropGridCtrl.LABEL_UP = "label_up"; //本次培养上升值
        HeroTrainPropGridCtrl.LABEL_DOWN = "label_down"; //本次培养下降值
        HeroTrainPropGridCtrl.IMG_UP = "img_up"; //升图标
        HeroTrainPropGridCtrl.IMG_DOWN = "img_down"; //降图标
        return HeroTrainPropGridCtrl;
    })(mo.GridController);
    uw.HeroTrainPropGridCtrl = HeroTrainPropGridCtrl;
    HeroTrainPropGridCtrl.prototype.__class__ = "uw.HeroTrainPropGridCtrl";
    var HeroTrainDlg = (function (_super) {
        __extends(HeroTrainDlg, _super);
        function HeroTrainDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HeroTrainDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHeroTrain_ui;
            self._trainType = 0;
            self._canClick = true;
            self._state = 0;
            self._closeOutSide = false;
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            {
                var self = this, clazz = self.__class;
                self._trainType = uw.HeroDataCtrl.TRAIN_TYPE_NORMAL;
                self._trainTypeTxtMap = {};
                self._trainTypeTxtMap[uw.HeroDataCtrl.TRAIN_TYPE_NORMAL] = "普通";
                self._trainTypeTxtMap[uw.HeroDataCtrl.TRAIN_TYPE_POWER] = "定向";
                self._trainTypeTxtMap[uw.HeroDataCtrl.TRAIN_TYPE_INTEL] = "定向";
                _super.prototype.init.apply(self, arguments);
                self._trainPropMap = {};
                var color = cc.c3b(74, 42, 1);
                self.enableStrokeByName(clazz.LABEL_NORMAL, color, 2);
                self.enableStrokeByName(clazz.LABEL_POWER, color, 2);
                self.enableStrokeByName(clazz.LABEL_INTEL, color, 2);
                self.onClickByName(clazz.BTN_TRAIN, self._onTrain);
                self.onClickByName(clazz.BTN_SAVE, self._onSave);
                self.onClickByName(clazz.BTN_CANCEL, self._onCancel);
                self.onClickByName(clazz.BTN_UP, self._onUp);
                self.onClickByName(clazz.BTN_NORMAL, self._onNormal, self);
                self.onClickByName(clazz.BTN_POWER, self._onPower, self);
                self.onClickByName(clazz.BTN_INTEL, self._onIntel, self);
                var trainSet = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.trainSet);
                self._stoneCostMap = { 0: trainSet[0], 1: trainSet[1], 2: trainSet[1] }; //暗影石消耗
                var panel_prop = self.getWidgetByName(clazz.PANEL_PROP);
                self._propGridCtrl = uw.HeroTrainPropGridCtrl.create(panel_prop);
                self._heroIconCtrl = uw.UIHeroIconCtrl.create(self.getWidgetByName(clazz.PANEL_ICON));
                self._stoneIconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(clazz.PANEL_DARK_STONE));
                self._stoneIconCtrl.showTip(true);
            }
        };
        __egretProto__.resetByData = function (heroDataCtrl) {
            var self = this;
            self._canClick = true;
            self._heroDataCtrl = heroDataCtrl;
            self._heroIconCtrl.resetByData(heroDataCtrl);
            self._refresh(uw.HeroDataCtrl.TRAIN_TYPE_NORMAL, true);
            self._changeChooseBtn(uw.HeroDataCtrl.TRAIN_TYPE_NORMAL);
            return self;
        };
        __egretProto__._initPropObj = function (propKey, propName) {
            var self = this;
            var trainPropMap = self._trainPropMap;
            var trainPropMult = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.trainPropMult)[propKey - 1];
            var darkMap = self._heroDataCtrl.get(uw.dsConsts.HeroEntity.potentialTrain);
            var train = (darkMap[propKey] || 0) * trainPropMult;
            var trainPropKey = uw.c_prop.trainPropKey;
            var isDark = false;
            if (self._trainType == uw.HeroDataCtrl.TRAIN_TYPE_INTEL) {
                isDark = propKey == trainPropKey.pAttack || propKey == trainPropKey.pDefence;
            }
            else if (self._trainType == uw.HeroDataCtrl.TRAIN_TYPE_POWER) {
                isDark = propKey == trainPropKey.mAttack || propKey == trainPropKey.mDefence;
            }
            return {
                name: uw.c_prop.trainProp[propKey],
                propKey: propKey,
                src: self._heroDataCtrl.get(propName) - train,
                train: train,
                cur: (trainPropMap[propKey] || 0) * trainPropMult,
                isDark: isDark
            };
        };
        __egretProto__._refreshProps = function () {
            var self = this;
            var heroKey = uw.dsConsts.HeroEntity;
            var trainPropKey = uw.c_prop.trainPropKey;
            //设置属性列表
            self._propGridCtrl.resetByData([
                self._initPropObj(trainPropKey.pAttack, heroKey.pAttack),
                self._initPropObj(trainPropKey.pDefence, heroKey.pDefence),
                self._initPropObj(trainPropKey.mAttack, heroKey.mAttack),
                self._initPropObj(trainPropKey.mDefence, heroKey.mDefence),
                self._initPropObj(trainPropKey.hp, heroKey.hp)
            ]);
        };
        __egretProto__._refresh = function (darkReduce, isToTrain) {
            var self = this, clazz = self.__class;
            var heroDataCtrl = self._heroDataCtrl;
            self._refreshProps();
            var opt = self._trainOpt = heroDataCtrl.getTrainOpt(self._trainType); //获得培养选项
            self._stoneIconCtrl.resetByData(opt.darkStoneId);
            self.formatByName(clazz.LABEL_DARK_STONE, self._stoneCostMap[self._trainType], opt.darkStoneOwned); //设置暗影石数量
            self.formatByName(clazz.LABEL_DARK, opt.dark); //设置暗影值
            self.formatByName(clazz.LABEL_DARK_REDUCE, Math.abs(darkReduce)); //设置暗影值扣除值
            self.formatByName(clazz.LABEL_TRAIN_LVL, heroDataCtrl.trainLvl); //设置培养品阶
            self.setVisibleByName(clazz.LABEL_DARK_REDUCE, !!darkReduce); //设置暗影值扣除值是否可见
            self.setVisibleByName(clazz.BTN_UP, !opt.isMaxTrainLvl); //设置觉醒按键是否可见
            self.setVisibleByName(clazz.IMG_FULLGRADE, opt.isMaxTrainLvl); //设置满阶图片是否可见
            self.setVisibleByName(clazz.IMG_CROWN, opt.isMaxTrainLvl); //设置满阶icon是否可见
            self.setVisibleByName(clazz.BTN_TRAIN, isToTrain); //设置培养按键是否可见
            //        self.setGrayByName(clazz.BTN_TRAIN, opt.darkStoneRequired > opt.darkStoneOwned);
            self.setButtonImgByName(clazz.BTN_TRAIN, opt.dark > 0 ? res.ui_btn.btn_train_png : res.ui_btn.btn_wash_png); //如果暗影值为0，则做洗炼操作
            self.setVisibleByName(clazz.BTN_SAVE, !isToTrain); //设置保存按键是否可见
            self.setVisibleByName(clazz.BTN_CANCEL, !isToTrain); //设置取消按键是否可见
            self.setVisibleByName(clazz.LABEL_CANCEL, !isToTrain && self._trainOpt.dark); //设置取消按键是否可见
            var btnUpLvl = self.getWidgetByName(clazz.BTN_UP);
            if (self._upLvlArmCtrl) {
                self._upLvlArmCtrl.clear();
                self._upLvlArmCtrl = null;
            }
            if (btnUpLvl.isVisible()) {
                if (opt.canAwaking && !self._upLvlArmCtrl) {
                    self._upLvlArmCtrl = uw.UpArmature.play(btnUpLvl, res.cca_ui.upgradable, mo.p(btnUpLvl.width / 2, btnUpLvl.height / 2));
                }
            }
        };
        __egretProto__._changeChooseBtn = function (trainType) {
            var self = this, clazz = self.__class;
            if (!self._checkTrainResultSaved())
                return; //未保存或取消培养结果
            self._trainType = trainType;
            var opt = self._trainOpt = self._heroDataCtrl.getTrainOpt(self._trainType); //获得培养选项
            self._refreshProps();
            self.formatByName(clazz.LABEL_DARK_STONE, self._stoneCostMap[self._trainType], opt.darkStoneOwned); //设置暗影石数量
            var arr = [clazz.BTN_NORMAL, clazz.BTN_POWER, clazz.BTN_INTEL];
            var posArr = [];
            for (var i = 0, li = arr.length; i < li; i++) {
                var itemi = arr[i];
                var widget = self.getWidgetByName(itemi);
                widget.setVisibleByName(clazz.RADIO_CHOOSE, false); //显示这打钩都为不可见
                posArr.push(widget.getPosition());
            }
            self.setPositionByName(clazz.BTN_ICON, posArr[trainType]); //设置红色按键图标位置
            var radio = self.getWidgetByName(arr[trainType]).getWidgetByName(clazz.RADIO_CHOOSE); //获取到打钩的widget
            radio.setScale(0); //先缩放为0
            radio.setVisible(true); //设置可见
            var act = mo.scaleTo(0.3, 1).setEase(mo.Ease.backOut);
            radio.runAction(act); //播放动画
        };
        //@override
        __egretProto__._onClose = function () {
            if (this._checkTrainResultSaved()) {
                _super.prototype._onClose.call(this);
            }
            else {
                return { broken: true };
            }
        };
        __egretProto__._checkTrainResultSaved = function () {
            if (this._state) {
                return mo.showMsg(uw.id_c_msgCode.noSaveTrainResult);
            }
            return true;
        };
        __egretProto__._onUp = function () {
            var self = this;
            if (self._checkTrainResultSaved()) {
                self._heroDataCtrl.upTrainLvl(self._trainOpt, function () {
                    self._refresh(0, true);
                }, self);
            }
        };
        __egretProto__._onTrain = function () {
            var self = this;
            if (self._checkTrainResultSaved()) {
                self._heroDataCtrl.train(self._trainOpt, function (darkChangeMap, darkReduce) {
                    self._trainPropMap = darkChangeMap;
                    self._state = 1; //状态设置为未保存或取消
                    self._refresh(darkReduce, false);
                }, self);
            }
        };
        __egretProto__._onSave = function () {
            var self = this;
            self._heroDataCtrl.saveTrain(function () {
                self._trainPropMap = {};
                self._state = 0;
                self._refresh(0, true);
            }, self);
        };
        __egretProto__._onCancel = function () {
            var self = this;
            self._trainPropMap = {};
            self._state = 0;
            self._refresh(0, true);
        };
        __egretProto__._onNormal = function () {
            this._changeChooseBtn(uw.HeroDataCtrl.TRAIN_TYPE_NORMAL);
        };
        __egretProto__._onPower = function () {
            this._changeChooseBtn(uw.HeroDataCtrl.TRAIN_TYPE_POWER);
        };
        __egretProto__._onIntel = function () {
            this._changeChooseBtn(uw.HeroDataCtrl.TRAIN_TYPE_INTEL);
        };
        HeroTrainDlg.__className = "HeroTrainDlg";
        HeroTrainDlg.PANEL_ICON = "panel_icon"; //英雄图标容器
        HeroTrainDlg.PANEL_TRAIN_BTN = "panel_trainBtn"; //培养按键面板
        HeroTrainDlg.BTN_NORMAL = "btn_normal"; //普通培养
        HeroTrainDlg.BTN_POWER = "btn_power"; //力培养
        HeroTrainDlg.BTN_INTEL = "btn_intel"; //智培养
        HeroTrainDlg.BTN_ICON = "btn_icon"; //培养按键的红色图标
        HeroTrainDlg.BTN_TRAIN = "btn_train"; //培养按键
        HeroTrainDlg.BTN_SAVE = "btn_save"; //保存按键
        HeroTrainDlg.BTN_CANCEL = "btn_cancel"; //取消按键
        HeroTrainDlg.BTN_CLOSE = "btn_close"; //关闭按键
        HeroTrainDlg.BTN_UP = "btn_up"; //升阶按键
        HeroTrainDlg.LABEL_TRAIN_LVL = "label_trainLvl"; //培养品阶
        HeroTrainDlg.RADIO_CHOOSE = "radio_choose"; //勾选框
        HeroTrainDlg.RADIO_CHOOSE_BG = "radio_chooseBg"; //勾选框背景
        HeroTrainDlg.PANEL_PROP = "panel_prop"; //属性面板
        HeroTrainDlg.LABEL_NORMAL = "label_normal"; //普通培养按键文字
        HeroTrainDlg.LABEL_POWER = "label_power"; //力培养按键文字
        HeroTrainDlg.LABEL_INTEL = "label_intel"; //智培养按键文字
        HeroTrainDlg.PANEL_DARK = "panel_stone"; //暗影值的panel
        HeroTrainDlg.LABEL_DARK = "label_dark"; //暗影值
        HeroTrainDlg.LABEL_DARK_REDUCE = "label_darkReduce"; //暗影值扣除值
        HeroTrainDlg.LABEL_CANCEL = "label_cancel"; //取消的说明
        HeroTrainDlg.PANEL_STONE = "panel_stone"; //暗影石的panel
        HeroTrainDlg.PANEL_DARK_STONE = "panel_darkStone"; //暗影石图标容器
        HeroTrainDlg.LABEL_DARK_STONE = "label_darkStone"; //暗影石
        HeroTrainDlg.IMG_CROWN = "img_crown"; //满阶时的小图标
        HeroTrainDlg.IMG_FULLGRADE = "img_fullgrade"; //满阶的图片
        return HeroTrainDlg;
    })(mo.UIModalLayer);
    uw.HeroTrainDlg = HeroTrainDlg;
    HeroTrainDlg.prototype.__class__ = "uw.HeroTrainDlg";
})(uw || (uw = {}));

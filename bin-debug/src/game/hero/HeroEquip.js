var uw;
(function (uw) {
    var _resetCommonUi = function (self, equipDataCtrl) {
        var clazz = self.__class;
        var lvl = equipDataCtrl.lvl; //获取到装备强化等级
        self._canUpLvl = true; //默认为true
        var lvlTxt = lvl ? (" +" + lvl) : "";
        if (!self._iconCtrl) {
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(clazz.PANEL_EQUIP_ICON));
        }
        self._iconCtrl.resetByData(equipDataCtrl);
        if (equipDataCtrl) {
            //装备名称
            self.setInfoByName(clazz.LABEL_EQUIP_NAME, { value: equipDataCtrl.name + lvlTxt, color: uw.getColorByQuality(equipDataCtrl.quality) });
        }
    };
    var _resetByData = function (self, data) {
        self._part = data.part;
        self._heroDataCtrl = data.heroDataCtrl;
        var equipDataCtrl = self._heroDataCtrl.getEquipDataCtrlByPart(self._part);
        var wore = self._wore = !!equipDataCtrl && !equipDataCtrl.isTempOnly;
        if (!wore && self._part == uw.c_prop.equipPartKey.exclusive) {
            equipDataCtrl = self._heroDataCtrl.getNotOnExclusiveEquipDataCtrl() || equipDataCtrl;
        }
        else {
            //装备描述
            if (equipDataCtrl)
                self.setInfoByName(self.__class.LABEL_ITEM_DESC, { value: equipDataCtrl.explain, fontSize: 56 });
        }
        self._equipDataCtrl = equipDataCtrl;
        if (equipDataCtrl)
            _resetCommonUi(self, equipDataCtrl);
    };
    uw._heroEquipCommon_const = {
        PANEL_DESC: "panel_desc",
        LABEL_ITEM_DESC: "label_item_desc",
        PANEL_PROP_LIST: "panel_propList",
        PANEL_CONTAINER: "panel_container",
        LABEL_EQUIP_NAME: "label_equipName",
        LABEL_WEAR_LVL: "label_wearLvl",
        BTN_CHANGE: "btn_change",
        BTN_PUT_ON: "btn_putOn",
        BTN_PUT_OFF: "btn_putOff",
        BTN_NOTGOT: "btn_notGot",
        BTN_UP: "btn_up",
        PANEL_EQUIP_ICON: "panel_equipIcon" //装备外框
    };
    var HeroExclusiveEquipCtrl = (function (_super) {
        __extends(HeroExclusiveEquipCtrl, _super);
        function HeroExclusiveEquipCtrl() {
            _super.apply(this, arguments);
            this.LABEL_PATTACK_TALENT = "label_pAttackTalent"; //物攻天赋
            this.LABEL_PDEFENCE_TALENT = "label_pDefenceTalent"; //物防天赋
            this.LABEL_MATTACK_TALENT = "label_mAttackTalent"; //魔攻天赋
            this.LABEL_MDEFENCE_TALENT = "label_mDefenceTalent"; //魔防天赋
            this.PANEL_TALENT = "panel_talent"; //天赋面板
            this.PANEL_SECRET = "panel_secret"; //秘术面板
            this.LABEL_HERONAME = "label_heroName"; //秘术名称
        }
        var __egretProto__ = HeroExclusiveEquipCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHeroExclusiveEquip_ui;
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            self._equipPropGridCtrl = uw.EquipPropGridCtrl.create(self.getWidgetByName(clazz.PANEL_PROP_LIST));
            self.onClickByName(clazz.BTN_PUT_ON, self._onPutOn, self);
            self.onClickByName(clazz.BTN_UP, self._onUp, self);
            self.onClickByName(clazz.BTN_NOTGOT, self._detail, self);
        };
        __egretProto__.setTalent = function (name, value) {
            var textColorOn = cc.c3b(238, 94, 44), colorOn = cc.hexToColor("#fdfdfd"), colorOff = cc.hexToColor("#666566"); //灰色
            this.setInfoByName(name, { value: value, color: value ? textColorOn : colorOff }); //天赋值
            this.setColorByName(name + "Txt", value ? colorOn : colorOff); //天赋标签
        };
        __egretProto__.resetByData = function (data) {
            var self = this, clazz = self.__class;
            _resetByData(self, data);
            var equipDataCtrl = self._equipDataCtrl, wore = self._wore;
            //天赋
            self.setTalent(self.LABEL_PATTACK_TALENT, equipDataCtrl.pAttackMult); //物攻天赋
            self.setTalent(self.LABEL_PDEFENCE_TALENT, equipDataCtrl.pDefenceMult); //物防天赋
            self.setTalent(self.LABEL_MATTACK_TALENT, equipDataCtrl.mAttackMult); //魔攻天赋
            self.setTalent(self.LABEL_MDEFENCE_TALENT, equipDataCtrl.mDefenceMult); //魔防天赋
            //决定显示锻造还是装备按键
            //如果已经穿戴上则显示锻造按键
            //如果还未穿戴上，先判断是否已经拥有，是的话装备按键可点，否则不可点
            var isTemp = equipDataCtrl.isTempOnly;
            self.setVisibleByName(self.PANEL_TALENT, wore);
            self.setVisibleByName(self.PANEL_SECRET, !wore);
            self.setVisibleByName(clazz.BTN_NOTGOT, !wore && isTemp);
            self.setTouchEnabledByName(clazz.BTN_PUT_ON, !wore && !isTemp);
            self.setVisibleByName(clazz.BTN_PUT_ON, !wore && !isTemp);
            self.setTouchEnabledByName(clazz.BTN_UP, wore);
            self.setVisibleByName(clazz.BTN_UP, wore);
            if (!wore || isTemp) {
                //还没有穿戴上专属就显示所属英雄名
                self.setInfoByName(self.LABEL_HERONAME, equipDataCtrl.heroName);
            }
            if (!wore) {
                var str = mo.formatStr("穿戴等级:[ubb color=#FFAF32] %s [/ubb]", equipDataCtrl.needLvl);
                self.setInfoByName(clazz.LABEL_WEAR_LVL, { value: str, fontSize: 55 });
            }
            else {
                var str;
                if (equipDataCtrl.forgeNeedHeroLvl == null) {
                    str = "已锻造至满阶";
                }
                else {
                    str = mo.formatStr("锻造等级:[ubb color=#FFAF32] %s [/ubb]", equipDataCtrl.forgeNeedHeroLvl);
                }
                self.setInfoByName(clazz.LABEL_WEAR_LVL, { value: str, fontSize: 55 });
            }
            self._equipPropGridCtrl.resetByData(equipDataCtrl.getPropsWithAddValue());
            self.doLayoutByName(clazz.PANEL_CONTAINER);
        };
        __egretProto__.onEnter = function () {
            var self = this;
            _super.prototype.onEnter.call(this);
            self.registerClassByKey(uw.EquipDataCtrl, uw.EquipDataCtrl.ON_EXCLUSIVE_UPED, self._resetAll); //注册装备变更的事件监听
        };
        __egretProto__._onPutOn = function () {
            var self = this;
            self._heroDataCtrl.putOnEquip(self._equipDataCtrl, self._resetAll, self);
        };
        __egretProto__._onUp = function () {
            if (uw.verifyLevel(uw.id_c_open.forgeExclusive)) {
                uw.pushSubModule(uw.SubModule.ForgeExclusive, this._heroDataCtrl);
            }
        };
        __egretProto__._detail = function () {
            uw.GainInfoDlg.getInstance().resetByData(this._equipDataCtrl.tempId).show();
            ;
        };
        __egretProto__._resetAll = function () {
            var self = this;
            self.resetByData({ heroDataCtrl: self._heroDataCtrl, part: self._part });
        };
        HeroExclusiveEquipCtrl.__className = "HeroExclusiveEquipCtrl";
        return HeroExclusiveEquipCtrl;
    })(mo.WidgetCtrl);
    uw.HeroExclusiveEquipCtrl = HeroExclusiveEquipCtrl;
    HeroExclusiveEquipCtrl.prototype.__class__ = "uw.HeroExclusiveEquipCtrl";
    mo.addConst(HeroExclusiveEquipCtrl, uw._heroEquipCommon_const);
    var HeroWishEquipCtrl = (function (_super) {
        __extends(HeroWishEquipCtrl, _super);
        function HeroWishEquipCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HeroWishEquipCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHeroWishEquip_ui;
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            self._equipPropGridCtrl = uw.EquipPropGridCtrl.create(self.getWidgetByName(clazz.PANEL_PROP_LIST));
            self.onClickByName(clazz.BTN_PUT_OFF, self._onPutOff, self);
            self.onClickByName(clazz.BTN_CHANGE, self._onChange, self);
        };
        __egretProto__.resetByData = function (data) {
            var self = this, clazz = this.__class;
            _resetByData(this, data);
            var equipDataCtrl = this._equipDataCtrl;
            if (!equipDataCtrl)
                return;
            //属性列表
            this._equipPropGridCtrl.resetByData(equipDataCtrl.getProps());
            //自适应底框
            var panelDesc = self.getWidgetByName(clazz.PANEL_DESC);
            panelDesc.setSize(panelDesc.getSize().width, self._equipPropGridCtrl.getSize().height + 100);
            self.doLayoutByName(clazz.PANEL_CONTAINER);
            var str = mo.formatStr("穿戴等级:[ubb color=#FFAF32] %s [/ubb]", equipDataCtrl.needLvl);
            this.setInfoByName(this.__class.LABEL_WEAR_LVL, { value: str, fontSize: 55 });
        };
        __egretProto__._onPutOff = function () {
            this._heroDataCtrl.putOffEquip(this._part);
        };
        __egretProto__._onChange = function () {
            //跳转到装备列表中进行穿戴
            var self = this;
            var heroDataCtrl = self._heroDataCtrl;
            var opt = { filterType: uw.BAG_SUB_FILTER_TYPE.EQUIP_PART, part: self._part };
            var dlg = uw.BagQueryLayerDlg.getInstance(uw.BagDetailLayerCtrl.CREATE_FROM_HERO_LAYER, heroDataCtrl);
            dlg.resetHero(heroDataCtrl);
            dlg.onPutOn(self._resetAll, self);
            dlg.setCurList(uw.c_prop.bagTypeKey.equip, opt);
            dlg.show(true);
        };
        __egretProto__._onChanged = function () {
            this._resetAll(); //刷新
        };
        __egretProto__.onEnter = function () {
            var self = this;
            _super.prototype.onEnter.call(this);
            self.registerClassByKey(uw.HeroDataCtrl, uw.HeroDataCtrl.ON_EQUIP_CHANGED, self._resetAll); //注册装备变更的事件监听
        };
        __egretProto__._resetAll = function () {
            var self = this;
            self.resetByData({ heroDataCtrl: self._heroDataCtrl, part: self._part });
        };
        __egretProto__._onEuipChanged = function () {
            //TODO
            this._resetAll();
        };
        HeroWishEquipCtrl.__className = "HeroWishEquipCtrl";
        return HeroWishEquipCtrl;
    })(mo.WidgetCtrl);
    uw.HeroWishEquipCtrl = HeroWishEquipCtrl;
    HeroWishEquipCtrl.prototype.__class__ = "uw.HeroWishEquipCtrl";
    mo.addConst(HeroWishEquipCtrl, uw._heroEquipCommon_const);
})(uw || (uw = {}));

var uw;
(function (uw) {
    var HeroEquipShop = (function (_super) {
        __extends(HeroEquipShop, _super);
        function HeroEquipShop() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HeroEquipShop.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHeroEquipShop_ui;
            self._closeOutSide = false;
            self._lockTab = false;
        };
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            self._initIconCtrlMap();
            var equipTabCtrl = self._equipTabCtrl = uw.TabCroupCtrl.create(this.getWidgetByName("equip_list"));
            equipTabCtrl.addDataSourceAdapter(self._equipTabCtrlAdapter, self);
            equipTabCtrl.setMoveSmooth(true);
            equipTabCtrl.setPointerOffsetX(30);
            for (var part = 1; part <= 5; part++) {
                equipTabCtrl.onItemClickByName("tab_" + part, self._onChangeEquip, self);
            }
            // 设置tab切换事件监听
            equipTabCtrl.onTabChange(self._onTabChange, self);
            //右侧滚动控制器
            var svCtrl = self._svCtrl = uw.ScrollViewCtrl.create(self.getWidgetByName("sv"));
            svCtrl.setDelegate(self);
            self.initOpPanel();
            //注册获得物品监听
            self.registerClassByKey(uw.UserDataCtrl, uw.UserDataCtrl.ON_GET_BAG_ITEMS, function () {
                self._refreshMaterial(); //刷新材料状态
                self._equipTabCtrl.resetData(); //刷新标签页
            });
            //金币改变了
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.gold.toString(), self._refreshBtnPanel);
        };
        __egretProto__.initOpPanel = function () {
            var self = this, clazz = self.__class;
            var panel = self._panel_op = self.getWidgetByName(clazz.PANEL_OP);
            //材料列表Ctrl
            self._materialListCtrl = uw.UIMaterialListCtrl.create(panel.getWidgetByName(clazz.PANEL_MATERIAL), 0.40);
            self._materialListCtrl.onItemClick(self._showDetail, self);
            panel.onClickByName(clazz.BTN_ONEKEY, self._oneKeyStr, self);
            panel.onClickByName(clazz.BTN_UP_LVL, self._upgradeEquip, self);
        };
        __egretProto__.hideBtn = function () {
            var self = this;
            self._panel_op.setVisible(false);
            self._lockTab = true;
        };
        __egretProto__.showBtn = function () {
            var self = this;
            self._panel_op.setVisible(true);
            self._refreshAll();
            self._lockTab = false;
        };
        __egretProto__.resetByData = function (data) {
            var self = this, clazz = self.__class;
            self._heroDataCtrl = data.heroDataCtrl;
            self._curPart = data.part;
            var equipTabCtrl = self._equipTabCtrl;
            equipTabCtrl.resetData();
            equipTabCtrl.setPointerByName("tab_" + self._curPart);
            self._refreshRightPanel();
            return self;
        };
        //TabCtrl的adapter
        __egretProto__._equipTabCtrlAdapter = function (name, tabWidget) {
            var self = this, clazz = self.__class;
            var part = parseInt(name.substring("tab_".length));
            var equipCtrl = self._heroDataCtrl.getEquipDataCtrlByPart(part);
            var iconCtrl = self._iconCtrlMap[mo.formatStr(clazz.PANEL_EQUIP_TEMP, part)];
            iconCtrl.resetByData(equipCtrl);
            var isShowNew = false;
            if (equipCtrl.isTempOnly) {
                tabWidget.setInfoByName(clazz.LABEL_NAME, { value: uw.c_prop.equipPart[part], color: uw.getColorByQuality(1) });
                tabWidget.setInfoByName(clazz.LABEL_LVL, "");
                iconCtrl.setEquipUi(part, false);
            }
            else {
                var lvl = equipCtrl.lvl; //获取到装备强化等级
                var lvlTxt = lvl ? ("强化 +" + lvl) : "";
                //装备名称
                tabWidget.setInfoByName(clazz.LABEL_NAME, { value: equipCtrl.name, color: uw.getColorByQuality(equipCtrl.quality) });
                tabWidget.enableStrokeByName(clazz.LABEL_NAME, cc.c3b(0, 0, 0), 3, false);
                tabWidget.setInfoByName(clazz.LABEL_LVL, lvlTxt);
                var nextEquipDataCtrl = equipCtrl.getNext();
                if (nextEquipDataCtrl) {
                    var opt = nextEquipDataCtrl.getUpgradeToThisOpt(self._heroDataCtrl);
                    isShowNew = opt.isEnough && opt.canWare;
                }
            }
            tabWidget.setVisibleByName("new", isShowNew);
        };
        __egretProto__._showDetail = function (materialCtrl) {
            var dataCtrl = materialCtrl.getDataCtrl();
            uw.GainInfoDlg.getInstance().resetByData(dataCtrl.tempId).show();
        };
        //初始化界面中的iconCtrl
        __egretProto__._initIconCtrlMap = function () {
            var self = this, clazz = self.__class;
            self._iconCtrlMap = {};
            for (var i = 1; i <= 5; ++i) {
                var widgetName = mo.formatStr(clazz.PANEL_EQUIP_TEMP, i);
                self._iconCtrlMap[widgetName] = uw.UIItemIconCtrl.create(self.getWidgetByName(widgetName));
            }
        };
        __egretProto__._onTabChange = function (preTab, curTab) {
            var self = this;
            if (self._lockTab)
                return false;
            if (preTab) {
                preTab.setInfoByName("bg", res.ui_hero.blk_normaleqp_unfocus_png);
            }
            if (curTab) {
                curTab.setInfoByName("bg", res.ui_hero.blk_normaleqp_focus_png);
            }
            return true;
        };
        __egretProto__._onChangeEquip = function (name) {
            var self = this;
            // 显示当前装备信息
            var part = parseInt(name.substring("tab_".length));
            self._curPart = part;
            self._refreshRightPanel();
        };
        __egretProto__._initWithData = function (data) {
            this._data = data;
        };
        __egretProto__._refreshRightPanel = function () {
            var self = this, clazz = self.__class;
            self._refreshBtnPanel();
            self._svCtrl.resetByData(self._heroDataCtrl, self._curPart);
        };
        __egretProto__._refreshBtnPanel = function () {
            var self = this, clazz = self.__class;
            var part = self._curPart;
            var lowEquipCtrl = self._lowEquipCtrl = self._heroDataCtrl.getEquipDataCtrlByPart(part);
            var highEquipCtrl = self._highEquipCtrl = lowEquipCtrl.getNext();
            var panel_op = self._panel_op;
            //是否未购买
            var isNotBuy = lowEquipCtrl.isTempOnly;
            //设置购买/强化按钮
            panel_op.setButtonImgByName(clazz.BTN_TOP, isNotBuy ? res.ui_btn.btn_purchase_png : res.ui_hero.btn_strengthen_png);
            //是否隐藏下半部按钮
            panel_op.setVisibleByName(clazz.PANEL_BOTTOMOP, !isNotBuy);
            panel_op.setVisibleByName(clazz.LABEL_MAX_LEVEL, !isNotBuy);
            //是否隐藏上半部按钮
            panel_op.setVisibleByName(clazz.PANEL_TOPOP, isNotBuy);
            panel_op.setVisibleByName(clazz.LABEL_MAX_STRENGTH, !isNotBuy);
            //设置一键强化按钮
            panel_op.setVisibleByName(clazz.BTN_ONEKEY, !isNotBuy);
            if (isNotBuy) {
                //设置购买价格
                uw.userDataCtrl.setGoldTxt(panel_op.getWidgetByName(clazz.LABEL_GOLD), mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.equipInitGold)[0]);
                panel_op.onClickByName(clazz.BTN_TOP, self._buyEquip, self);
                panel_op.setGrayByName(clazz.BTN_TOP, false);
            }
            else {
                //是否强化到最大
                var isStrMax = lowEquipCtrl.isStrengthMax();
                panel_op.setVisibleByName(clazz.PANEL_TOPOP, !isStrMax); //强化到最大则统一隐藏上半部按钮
                panel_op.setVisibleByName(clazz.LABEL_MAX_STRENGTH, isStrMax); //强化到最大显示已满级文本
                if (!isStrMax) {
                    //设置强化价格
                    var opt = lowEquipCtrl.getStrengthenOpt(part);
                    panel_op.onClickByName(clazz.BTN_TOP, self._strengthEquip, self);
                    uw.userDataCtrl.setGoldTxt(panel_op.getWidgetByName(clazz.LABEL_GOLD), opt.gold);
                    //装备强化等级不能超过英雄等级
                    panel_op.setGrayByName(clazz.BTN_TOP, opt.overflow);
                }
                //是否满阶
                var isMaxLevel = highEquipCtrl == null;
                panel_op.setVisibleByName(clazz.PANEL_BOTTOMOP, !isMaxLevel); //满阶则统一隐藏下半部按钮
                panel_op.setVisibleByName(clazz.LABEL_MAX_LEVEL, isMaxLevel); //满阶则显示已满阶文本
                if (!isMaxLevel) {
                    //刷新合成材料
                    self._refreshMaterial();
                }
            }
        };
        __egretProto__._refreshMaterial = function () {
            var self = this, clazz = self.__class;
            var highEquipCtrl = self._highEquipCtrl;
            // 画升阶需要道具
            var opt = highEquipCtrl.getUpgradeToThisOpt(self._heroDataCtrl);
            self._materialListCtrl.resetByData(opt.stuffs);
            var guidePanel = self.getWidgetByName(clazz.PANEL_GUIDEMATERIAL);
            guidePanel.width = 28 + opt.stuffs.length * 120 + (opt.stuffs.length - 1) * 30;
            //设置升阶按钮
            var btnUpLvl = self.getWidgetByName(clazz.BTN_UP_LVL);
            btnUpLvl.setGray(!opt.canUpgrade);
            //播放可升级效果
            var showEffect = opt.canUpgrade; //材料足够且英雄等级足够
            if (showEffect && !self._upLvlArmCtrl) {
                self._upLvlArmCtrl = uw.UpArmature.play(btnUpLvl, res.cca_ui.upgradable, mo.p(btnUpLvl.width / 2, btnUpLvl.height / 2));
            }
            if (!showEffect && self._upLvlArmCtrl) {
                self._upLvlArmCtrl.clear();
                self._upLvlArmCtrl = null;
            }
        };
        __egretProto__._refreshAll = function () {
            var self = this;
            self._refreshRightPanel();
            self._equipTabCtrl.resetData();
        };
        __egretProto__._buyEquip = function () {
            var self = this;
            var part = self._curPart;
            self._heroDataCtrl.buyNormalEquip(part, self._refreshAll, self);
        };
        __egretProto__._strengthEquip = function () {
            var self = this, clazz = self.__class;
            var part = self._curPart;
            var lowEquipCtrl = self._lowEquipCtrl;
            var opt = lowEquipCtrl.getStrengthenOpt(part);
            if (opt.overflow)
                return; //防止快速点击
            lowEquipCtrl.strengthen(opt, function () {
                self._refreshAll();
                self._playStrSuccEffect();
            }, self);
        };
        __egretProto__._upgradeEquip = function () {
            var self = this;
            var heighEquipCtrl = self._highEquipCtrl;
            var opt = heighEquipCtrl.getUpgradeToThisOpt(self._heroDataCtrl);
            heighEquipCtrl.upgradeToThis(opt, function () {
                self._svCtrl.doWhat();
            }, self);
        };
        //一键强化
        __egretProto__._oneKeyStr = function () {
            var self = this, clazz = self.__class;
            var part = self._curPart;
            var lowEquipCtrl = self._lowEquipCtrl;
            var opt = lowEquipCtrl.getOneKeyStrengthenOpt(part);
            lowEquipCtrl.oneKeyStrengthen(opt, function () {
                self._refreshAll();
                self._playStrSuccEffect();
            }, self);
        };
        __egretProto__._playStrSuccEffect = function () {
            var self = this;
            //tab放大效果
            var tab = self._equipTabCtrl.getWidgetByName("tab_" + self._curPart);
            tab.runAction(mo.sequence(mo.scaleTo(0.3, 1.15).setEase(mo.Ease.backOut), mo.scaleTo(0.5, 1).setEase(mo.Ease.backOut)));
            //播放特效
            self._svCtrl.playStrEffect();
        };
        __egretProto__._onClose = function () {
            var self = this;
            self._svCtrl.restore();
            self._lockTab = false;
            //清理armature
            if (self._upLvlArmCtrl) {
                self._upLvlArmCtrl.clear();
                self._upLvlArmCtrl = null;
            }
            if (self._strArmCtrl) {
                self._strArmCtrl.clear();
                self._strArmCtrl = null;
            }
            //还原左侧tab标签的状态
            var equipPart = uw.c_prop.equipPart;
            for (var key in equipPart) {
                var tab = self._equipTabCtrl.getWidgetByName("tab_" + key);
                if (tab) {
                    tab.stopAllActions();
                    tab.setScale(1);
                }
            }
            _super.prototype._onClose.call(this);
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            uw.GainInfoDlg.purgeInstance();
        };
        HeroEquipShop.__className = "HeroEquipShop";
        HeroEquipShop.MAX_ITEM_COUNT = 3;
        //下面是ui相关
        HeroEquipShop.PANEL_EQUIP_TEMP = "panel_equip_%s"; //左侧的icon容器的名字模板
        HeroEquipShop.LABEL_NAME = "name"; //名字，统一了，所有的名字都用这个
        HeroEquipShop.LABEL_LVL = "lvl"; //等级，统一了，所有的等级都用这个
        HeroEquipShop.PANEL_LOW_EQUIP = "lowEquip";
        HeroEquipShop.PANEL_GUIDEMATERIAL = "panel_guideMaterial";
        HeroEquipShop.PANEL_MATERIAL = "panel_material";
        HeroEquipShop.LABEL_GOLD = "label_gold";
        HeroEquipShop.BTN_TOP = "btnTop"; //上方的<购买/强化>按钮
        HeroEquipShop.BTN_ONEKEY = "btnOneKey"; //一键强化按钮
        HeroEquipShop.BTN_UP_LVL = "btnUpLvl"; // 下方的升阶按钮
        HeroEquipShop.LABEL_MAX_STRENGTH = "label_maxStrength";
        HeroEquipShop.LABEL_MAX_LEVEL = "label_maxLevel";
        HeroEquipShop.PANEL_OP = "panel_op"; //按钮层
        HeroEquipShop.PANEL_TOPOP = "panel_topOp"; //上半按钮层
        HeroEquipShop.PANEL_BOTTOMOP = "panel_bottomOp"; //下半按钮层
        return HeroEquipShop;
    })(mo.UIModalLayer);
    uw.HeroEquipShop = HeroEquipShop;
    HeroEquipShop.prototype.__class__ = "uw.HeroEquipShop";
})(uw || (uw = {}));

/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var _HeroInfoOption = (function (_super) {
        __extends(_HeroInfoOption, _super);
        function _HeroInfoOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _HeroInfoOption.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.actList = [];
            self.equipItemCtrlMap = {};
        };
        //@override
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            self.actList.length = 0;
            self.equipItemCtrlMap = null;
            self.heroListLayer = null;
            self.heroArmature = null;
            self.mainPanel = null;
            self.switcherPanel = null;
            self.bottomPanel = null;
            self.currCtrl = null;
        };
        return _HeroInfoOption;
    })(mo.Option);
    _HeroInfoOption.prototype.__class__ = "uw._HeroInfoOption";
    var HeroInfoLayer = (function (_super) {
        __extends(HeroInfoLayer, _super);
        function HeroInfoLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HeroInfoLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHeroInfoLayer_ui;
            self._closeOutSide = false;
            self._infoProp = new _HeroInfoOption();
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
            //dataCtrl的事件注册
            self.registerClassByKey(uw.HeroDataCtrl, uw.HeroDataCtrl.ON_UP_TRAIN_LVL, self._onHeroUpTrainLvl); //英雄重置
            self.registerClassByKey(uw.BagDataCtrl, uw.BagDataCtrl.ON_BATCH_USE_EXP_ITEM, self._onBatchUseExpItem); //批量吃经验
            self.registerClassByKey(uw.EquipDataCtrl, uw.dsConsts.EquipEntity.lvl, self._initEquipItems);
            self.registerClassByKey(uw.HeroDataCtrl, uw.HeroDataCtrl.ON_EQUIP_CHANGED, self._onEquipChanged); //装备变化
            self.registerClassByKey(uw.EquipDataCtrl, uw.EquipDataCtrl.ON_RESET, self._initEquipItems);
            self.registerClassByKey(uw.HeroDataCtrl, uw.HeroDataCtrl.ON_UP_SKILL, self._resetCombatEff);
            mo.addAfterEventListener(self, gEventType.visible, self._onVisible, self);
            mo.addAfterEventListener(self, gEventType.invisible, self._onInvisible, self);
        };
        __egretProto__._onVisible = function () {
            var self = this, infoProp = self._infoProp;
            if (infoProp.needToRefresh) {
                var heroDataCtrl = self._heroDataCtrl;
                if (heroDataCtrl) {
                    self.resetByData(heroDataCtrl);
                }
            }
        };
        __egretProto__._onInvisible = function () {
            var self = this, clazz = self.__class;
            var bar_expc = self.getWidgetByName(clazz.BAR_EXPC);
            bar_expc.stopQueueRunning();
            self._infoProp.needToRefresh = true;
        };
        //@override
        __egretProto__.init = function (heroListLayer) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var self = this, clazz = self.__class, infoProp = self._infoProp;
            _super.prototype.init.apply(self, arguments);
            infoProp.heroListLayer = heroListLayer;
            var mainPanel = infoProp.mainPanel = self.getWidgetByName(clazz.PANEL_MAIN); //英雄信息主面板（右侧）
            var bottomPanel = infoProp.bottomPanel = self.getWidgetByName(clazz.PANEL_BOTTOM); //底部面板
            var switcherPanel = infoProp.switcherPanel = self.getWidgetByName(clazz.PANEL_DETAIL_SWITCHER); //信息切换面板（左侧）
            var size = self.getSize();
            var sizeOfMain = mainPanel.getSize();
            var sizeOfBottom = bottomPanel.getSize();
            var sizeOfSwitcher = switcherPanel.getSize();
            var mainPanelWidth = sizeOfMain.width;
            var switcherPanelWidth = sizeOfSwitcher.width;
            var splitWidth1 = 100;
            var splitWidth2 = (size.width - mainPanelWidth - switcherPanelWidth - splitWidth1) / 2;
            var distance1 = splitWidth2;
            var distance2 = splitWidth1 + splitWidth2 + switcherPanelWidth;
            var distance3 = size.width - sizeOfBottom.width + 150;
            //设置前后按键位置
            self.setPositionByName(clazz.PANEL, size.width / 2, size.height / 2);
            //位置信息初始化
            infoProp.orgPosOfMain = mainPanel.getPosition();
            infoProp.orgPosOfBottom = bottomPanel.getPosition();
            infoProp.orgPosOfSwitcher = switcherPanel.getPosition();
            //        cc.log(self._orgPosOfMain, self._orgPosOfBottom, self._orgPosOfSwitcher);
            infoProp.orgPosOfMain = mo.p(distance2, infoProp.orgPosOfMain.y);
            infoProp.orgPosOfSwitcher = mo.p(distance1, infoProp.orgPosOfSwitcher.y);
            infoProp.orgPosOfBottom = mo.p(distance3, infoProp.orgPosOfBottom.y);
            //        cc.log(self._orgPosOfMain, self._orgPosOfBottom, self._orgPosOfSwitcher);
            infoProp.chgPosOfMain = mo.p(size.width / 2 - sizeOfMain.width / 2, infoProp.orgPosOfMain.y);
            infoProp.chgPosOfBottom = mo.p(size.width / 2 - sizeOfBottom.width / 2, infoProp.orgPosOfBottom.y);
            infoProp.hiddenPos = mo.p(sizeOfSwitcher.width * -1 - 20, infoProp.orgPosOfSwitcher.y);
            self._initPanels();
            //主要按键事件注册
            self.onClickByName(clazz.BTN_EVOLVE, self._onUpgrade, self, 111); //升阶
            self.onClickByName(clazz.BTN_CULTURE, self._onCulture, self); //培养
            self.onClickByName(clazz.BTN_DETAIL, self._onDetail, self); //详细信息
            self.onClickByName(clazz.BTN_UPSKILL, self._onUpSkill, self); //技能升级
            self.onClickByName(clazz.PANEL_FRAGMENT, self._onAddFragment, self); //碎片
            self.onClickByName(clazz.PANEL_EXPC, self._onAddExpc, self); //经验
            self.onClickByName(clazz.BTN_CLOSE, self.close, self); //关闭
            self.onClickByName(clazz.BTN_PRE, self._onPre, self); //上一个
            self.onClickByName(clazz.BTN_NEXT, self._onNext, self); //下一个
            //英雄点击
            self.onClickByName(clazz.PANEL_HERO, function () {
                infoProp.actIndex = infoProp.actIndex >= infoProp.actList.length ? 0 : infoProp.actIndex;
                self._playArmature(infoProp.actIndex++);
                //播放音效
                var tid = self._heroDataCtrl.tid;
                if (infoProp.actIndex % 2 == 0) {
                    mo.playWalkWordAudio(tid);
                }
                else {
                    mo.playRoleMatrixWordAudio(tid);
                }
            });
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
            var maxLvl = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.maxLvl)[0]; //获取英雄最大等级
            var arr = [];
            for (var i = 1; i <= maxLvl; ++i) {
                arr.push(c_lvl[i][uw.c_lvl_expcToLvlUp]);
            }
            self.setProgressQueueBaseNumberByName(clazz.BAR_EXPC, arr);
            infoProp.barExpc = self.getWidgetByName(clazz.BAR_EXPC);
            self.onClose(self._onClose, self); //关闭
        };
        __egretProto__._onPre = function () {
            var self = this, infoProp = self._infoProp, clazz = self.__class, heroListLayer = infoProp.heroListLayer;
            if (!infoProp.canClick)
                return; //不可点
            var heroList = heroListLayer._heroList;
            var phcd = heroList[infoProp.currIndex - 1];
            if (phcd && phcd.heroDataCtrl && !phcd.heroDataCtrl.isTempOnly) {
                self.getWidgetByName(clazz.BAR_EXPC).stopQueueRunning();
                self.resetByData(phcd.heroDataCtrl);
            }
            else {
                for (var i = heroList.length - 1; i >= 0; i--) {
                    var phcd = heroList[i];
                    if (phcd && phcd.heroDataCtrl && !phcd.heroDataCtrl.isTempOnly) {
                        if (self._heroDataCtrl != phcd.heroDataCtrl) {
                            self.getWidgetByName(clazz.BAR_EXPC).stopQueueRunning();
                            self.resetByData(phcd.heroDataCtrl);
                        }
                        break;
                    }
                }
            }
        };
        __egretProto__._onNext = function () {
            var self = this, infoProp = self._infoProp, clazz = self.__class, heroListLayer = infoProp.heroListLayer;
            if (!infoProp.canClick)
                return; //不可点
            var heroList = heroListLayer._heroList;
            var nhcd = heroList[infoProp.currIndex + 1];
            if (nhcd && nhcd.heroDataCtrl && !nhcd.heroDataCtrl.isTempOnly) {
                self.getWidgetByName(clazz.BAR_EXPC).stopQueueRunning();
                self.resetByData(nhcd.heroDataCtrl);
            }
            else {
                for (var i = 0, l_i = heroList.length; i < l_i; i++) {
                    nhcd = heroList[i];
                    if (nhcd && nhcd.heroDataCtrl && !nhcd.heroDataCtrl.isTempOnly) {
                        if (self._heroDataCtrl != nhcd.heroDataCtrl) {
                            self.getWidgetByName(clazz.BAR_EXPC).stopQueueRunning();
                            self.resetByData(nhcd.heroDataCtrl);
                        }
                        break;
                    }
                }
            }
        };
        __egretProto__.onEnter = function () {
            var self = this;
            _super.prototype.onEnter.call(this);
            self._infoProp.canClick = true;
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this, heroArmature = self._infoProp.heroArmature;
            if (heroArmature) {
                heroArmature.removeFromParent();
            }
            uw.roleArmFactory.releaseAllProducts();
            uw.HeroExclusiveEquipCtrl.purgeInstance();
            uw.HeroTrainDlg.purgeInstance();
            uw.HeroDetailCtrl.purgeInstance();
            uw.UpSkillCtrl.purgeInstance();
            uw.GainInfoDlg.purgeInstance();
            uw.HeroExclusiveEquipCtrl.purgeInstance();
            uw.HeroEquipShop.purgeInstance();
            uw.HeroExpcItemListCtrl.purgeInstance();
            uw.BagQueryLayerDlg.purgeInstance();
            mo.removeAfterEventListener(self, gEventType.visible, self._onVisible, self);
            mo.removeAfterEventListener(self, gEventType.invisible, self._onInvisible, self);
            self._infoProp.doDtor();
            self._heroDataCtrl = null;
        };
        __egretProto__._onClose = function () {
            var self = this, infoProp = self._infoProp;
            _super.prototype._onClose.call(this);
            if (infoProp.currCtrl) {
                infoProp.currCtrl.widget.removeFromParent(true);
                infoProp.currCtrl = null;
            }
            self._heroDataCtrl = null;
            uw.TextTips.close(); //关掉属性漂浮框
        };
        __egretProto__._playArmature = function (actIndex) {
            var self = this, infoProp = self._infoProp;
            if (infoProp.isPlaying) {
                return;
            }
            var armature = infoProp.heroArmature;
            armature.setMovementEventCallFunc(self._movementCallFunc, self);
            infoProp.isPlaying = true;
            armature.play(infoProp.actList[actIndex]);
        };
        __egretProto__._movementCallFunc = function (sender, status) {
            var self = this;
            if (status == 0) {
                return;
            }
            var infoProp = self._infoProp;
            sender.removeMovementEvent(self._movementCallFunc, self);
            sender.play(uw.Fight.HeroAction.steady);
            infoProp.isPlaying = false;
        };
        __egretProto__._initPanels = function () {
            //初始化两个主要panel的位置和显示
            var self = this, infoProp = self._infoProp;
            infoProp.mainPanel.setPosition(infoProp.chgPosOfMain);
            infoProp.bottomPanel.setPosition(infoProp.chgPosOfBottom);
            infoProp.switcherPanel.setPosition(infoProp.hiddenPos);
            infoProp.switcherPanel.setVisible(false);
        };
        __egretProto__._panelIn = function (ctrl, cb, target) {
            var self = this, infoProp = self._infoProp;
            var panel = infoProp.switcherPanel;
            panel.setVisible(true);
            panel.addChild(ctrl.widget);
            infoProp.currCtrl = ctrl;
            var act = mo.moveTo(0.25, infoProp.orgPosOfSwitcher);
            act.setEase(mo.Ease.backOut);
            var seq = mo.sequence(act, mo.callFunc(function () {
                if (cb) {
                    cb.apply(target);
                }
            }, self));
            panel.runAction(seq);
        };
        __egretProto__._panelOut = function (ctrl, cb, target) {
            var self = this, infoProp = self._infoProp;
            var panel = infoProp.switcherPanel;
            var act = mo.moveTo(0.25, infoProp.hiddenPos).setEase(mo.Ease.sineOut);
            var seq = mo.sequence(act, mo.callFunc(function () {
                ctrl.widget.removeFromParent(true);
                infoProp.currCtrl = null;
                if (cb) {
                    cb.apply(target);
                }
            }, self));
            panel.runAction(seq);
        };
        __egretProto__._moveMainPanel = function (pos, pos2, cb, target) {
            var self = this, infoProp = self._infoProp;
            var act1 = mo.moveTo(0.25, pos2).setEase(mo.Ease.backOut);
            infoProp.bottomPanel.runAction(act1);
            var act2 = mo.moveTo(0.25, pos).setEase(mo.Ease.backOut);
            var seq = mo.sequence(act2, mo.callFunc(function () {
                if (cb) {
                    cb.apply(target);
                }
            }, this));
            infoProp.mainPanel.runAction(seq);
        };
        __egretProto__._onEquipItemClick = function (iconCtrl) {
            var self = this, calzz = self.__class;
            var part = self.equipPartClicked = iconCtrl.part;
            var heroDataCtrl = self._heroDataCtrl;
            var equipDataCtrl = heroDataCtrl.getEquipDataCtrlByPart(part);
            var data = { heroDataCtrl: heroDataCtrl, part: part };
            if (part == uw.c_prop.equipPartKey.exclusive) {
                self._switchInfo(uw.HeroExclusiveEquipCtrl.getInstance(), data, calzz.TYPE_EQUIP + part); //跳转到专属界面
            }
            else if (part == uw.c_prop.equipPartKey.wish) {
                if (equipDataCtrl) {
                    self._switchInfo(uw.HeroWishEquipCtrl.getInstance(), data, calzz.TYPE_EQUIP + part);
                }
                else {
                    var opt = { filterType: uw.BAG_SUB_FILTER_TYPE.EQUIP_PART, part: part, heroTid: heroDataCtrl.tid };
                    var dlg = uw.BagQueryLayerDlg.getInstance(uw.BagDetailLayerCtrl.CREATE_FROM_HERO_LAYER, heroDataCtrl);
                    dlg.resetHero(heroDataCtrl);
                    dlg.setCurList(uw.c_prop.bagTypeKey.equip, opt);
                    dlg.show();
                }
            }
            else {
                uw.HeroEquipShop.getInstance().resetByData(data).show();
            }
        };
        __egretProto__._onEquipChanged = function (part, curEquipCtrl, preEquipCtrl) {
            var self = this;
            if (curEquipCtrl == null) {
                self._onEquipPutOff();
            }
            self._initEquipItems();
        };
        //装备栏项初始
        __egretProto__._initEquipItems = function (toSetCombatEff) {
            if (toSetCombatEff === void 0) { toSetCombatEff = true; }
            var self = this, clazz = self.__class, heroDataCtrl = self._heroDataCtrl, infoProp = self._infoProp;
            infoProp.equipItemCtrlList = [];
            for (var part = 1; part <= 7; ++part) {
                var container = self.getWidgetByName(clazz.PANEL_EQUIP_ITEM_PRE + part);
                var equipDataCtrl = self._heroDataCtrl.getEquipDataCtrlByPart(part);
                var iconCtrl = infoProp.equipItemCtrlMap[part];
                if (!iconCtrl) {
                    iconCtrl = uw.UIItemIconCtrl.create(container);
                    iconCtrl.setClickEnabled(true);
                    iconCtrl.onClick(self._onEquipItemClick, self);
                    infoProp.equipItemCtrlMap[part] = iconCtrl;
                }
                if (part < uw.c_prop.equipPartKey.exclusive) {
                    var isShowNew = false;
                    if (equipDataCtrl && !equipDataCtrl.isTempOnly) {
                        var nextEquipDataCtrl = equipDataCtrl.getNext();
                        if (nextEquipDataCtrl) {
                            var opt = nextEquipDataCtrl.getUpgradeToThisOpt(self._heroDataCtrl);
                            isShowNew = opt.isEnough && opt.canWare;
                        }
                    }
                    container.setVisibleByName("new", isShowNew);
                }
                else if (part == uw.c_prop.equipPartKey.exclusive) {
                    container.setVisibleByName("new", self._heroDataCtrl.hasExclusiveToPuton());
                }
                iconCtrl.resetByData(equipDataCtrl);
                iconCtrl.setEquipUi(part, equipDataCtrl && !equipDataCtrl.isTempOnly);
                var lvl = (!equipDataCtrl || equipDataCtrl.isTempOnly) ? 0 : equipDataCtrl.lvl;
                container.setVisibleByName(clazz.LABEL_LVL, !!lvl);
                container.setVisibleByName(clazz.IMG_LVL_BG, !!lvl);
                container.setInfoByName(clazz.LABEL_LVL, "+" + lvl);
            }
            if (toSetCombatEff) {
                self.setInfoByName(clazz.LABEL_COMBAT_EFF, heroDataCtrl.combatEff);
            }
        };
        //点击选中效果
        __egretProto__._handleFocused = function (type, isBright) {
            if (!type)
                return;
            var self = this, calzz = self.__class, infoProp = self._infoProp;
            infoProp.clickType = type;
            if (type.indexOf(calzz.TYPE_EQUIP) == 0) {
            }
            else if (type == calzz.TYPE_DETAIL) {
                self.getWidgetByName(calzz.BTN_DETAIL).setFocused(isBright);
            }
            else if (type == calzz.TYPE_UPSKILL) {
                self.getWidgetByName(calzz.BTN_UPSKILL).setFocused(isBright);
            }
            else if (type == calzz.TYPE_EXPC) {
            }
        };
        __egretProto__._dispatchShowHeroLeft = function () {
            var self = this, infoProp = self._infoProp;
            infoProp.canClick = true;
            mo.dispatchEvent([
                [mo.actionDispatcher, gEventType.showHeroLeft]
            ], function () {
            }, null);
        };
        /**
         * 切换左侧信息面板
         * @param ctrl
         * @param heroDataCtrl
         * @private
         */
        __egretProto__._switchInfo = function (ctrl, heroDataCtrl, type) {
            var self = this, calzz = self.__class, infoProp = self._infoProp;
            if (!infoProp.canClick) {
                return;
            }
            infoProp.canClick = false;
            self._handleFocused(infoProp.clickType, false);
            ctrl.resetByData(heroDataCtrl);
            var isFocused = true;
            if (!infoProp.currCtrl) {
                self._moveMainPanel(infoProp.orgPosOfMain, infoProp.orgPosOfBottom, function () {
                    self._panelIn(ctrl, function () {
                        self._dispatchShowHeroLeft();
                    });
                }, this);
            }
            else if (infoProp.currCtrl == ctrl) {
                isFocused = false;
                if (type.indexOf(calzz.TYPE_EQUIP) == 0) {
                    self._dispatchShowHeroLeft();
                }
                else {
                    self._panelOut(ctrl, function () {
                        self._moveMainPanel(infoProp.chgPosOfMain, infoProp.chgPosOfBottom, function () {
                            self._dispatchShowHeroLeft();
                        });
                    });
                }
            }
            else {
                self._panelOut(infoProp.currCtrl, function () {
                    self._panelIn(ctrl, function () {
                        self._dispatchShowHeroLeft();
                    }); //新的面板进来
                });
            }
            self._handleFocused(type, isFocused);
        };
        __egretProto__._resetLeftPanelInfo = function () {
            var self = this, calzz = self.__class, heroDataCtrl = self._heroDataCtrl, infoProp = self._infoProp;
            if (!infoProp.currCtrl) {
                return;
            }
            var clickType = infoProp.clickType;
            var ctrl;
            if (clickType == calzz.TYPE_EQUIP + 6) {
                ctrl = uw.HeroExclusiveEquipCtrl.getInstance();
                var data = { heroDataCtrl: heroDataCtrl, part: 6 };
                ctrl.resetByData(data);
            }
            else if (clickType == calzz.TYPE_EQUIP + 7) {
                var equipDataCtrl = heroDataCtrl.getEquipDataCtrlByPart(7);
                ctrl = uw.HeroWishEquipCtrl.getInstance();
                if (equipDataCtrl) {
                    var data = { heroDataCtrl: heroDataCtrl, part: 7 };
                    ctrl.resetByData(data);
                }
                else {
                    infoProp.canClick = false;
                    self._panelOut(ctrl, function () {
                        self._moveMainPanel(infoProp.chgPosOfMain, infoProp.chgPosOfBottom, function () {
                            self._dispatchShowHeroLeft();
                        });
                    });
                }
            }
            else if (clickType == calzz.TYPE_DETAIL) {
                ctrl = uw.HeroDetailCtrl.getInstance();
                ctrl.resetByData(heroDataCtrl);
            }
            else if (clickType == calzz.TYPE_UPSKILL) {
                ctrl = uw.UpSkillCtrl.getInstance();
                ctrl.resetByData(heroDataCtrl);
            }
            else if (clickType == calzz.TYPE_EXPC) {
                ctrl = uw.HeroExpcItemListCtrl.getInstance();
                ctrl.resetByData(heroDataCtrl);
            }
            var panel = infoProp.switcherPanel;
            panel.setVisible(true);
            panel.addChild(ctrl.widget);
            infoProp.currCtrl = ctrl;
        };
        /**
         * 卸下装备的事件监听
         * @private
         */
        __egretProto__._onEquipPutOff = function () {
            var self = this, infoProp = self._infoProp;
            infoProp.canClick = false;
            var iconCtrl = infoProp.equipItemCtrlMap[uw.c_prop.equipPartKey.wish];
            iconCtrl.dataCtrl = null;
            self._panelOut(uw.HeroWishEquipCtrl.getInstance(), function () {
                self._moveMainPanel(infoProp.chgPosOfMain, infoProp.chgPosOfBottom, function () {
                    infoProp.canClick = true;
                });
            });
            mo.playUIAudio(113);
        };
        __egretProto__.resetByData = function (heroDataCtrl) {
            var self = this, clazz = self.__class, infoProp = self._infoProp;
            var isFirst = !self._heroDataCtrl;
            self._heroDataCtrl = heroDataCtrl;
            self._initEquipItems();
            infoProp.isPlaying = false;
            if (!infoProp.currCtrl) {
                self._handleFocused(infoProp.clickType, false);
                self._initPanels();
            }
            if (isFirst) {
                self._handleFocused(clazz.TYPE_DETAIL, true);
                infoProp.mainPanel.setPosition(infoProp.orgPosOfMain);
                infoProp.bottomPanel.setPosition(infoProp.orgPosOfBottom);
                infoProp.switcherPanel.setPosition(infoProp.orgPosOfSwitcher);
                infoProp.switcherPanel.setVisible(true);
            }
            var equipItemCtrlList = infoProp.equipItemCtrlList;
            for (var i = 0, li = equipItemCtrlList.length; i < li; i++) {
                var ctrl = equipItemCtrlList[i];
                ctrl.resetByData(heroDataCtrl);
            }
            self.setInfoByName(clazz.LABEL_COMBAT_EFF, heroDataCtrl.combatEff);
            //初始化动作
            var actList = infoProp.actList;
            actList.length = 0;
            actList.push(uw.Fight.HeroAction.normalAttack);
            infoProp.actIndex = 0;
            //common部分
            self._setHeroUi(heroDataCtrl, false);
            self._setHeroArmatureForInfo(heroDataCtrl, function (armature) {
                if (armature.hasAnimationName(uw.Fight.HeroAction.skillAttack1)) {
                    actList.push(uw.Fight.HeroAction.skillAttack1);
                }
                if (armature.hasAnimationName(uw.Fight.HeroAction.skillAttack2)) {
                    actList.push(uw.Fight.HeroAction.skillAttack2);
                }
                if (armature.hasAnimationName(uw.Fight.HeroAction.skillAttack3)) {
                    actList.push(uw.Fight.HeroAction.skillAttack3);
                }
                actList.push(uw.Fight.HeroAction.uniqueAttack);
            });
            var bar_expc = self.getWidgetByName(clazz.BAR_EXPC);
            bar_expc.loadLightTexture(res.ui_common.bar_light1_png);
            if (heroDataCtrl.getNextLvExp()) {
                bar_expc.setCurTargetValue(heroDataCtrl.getExpcCurLvlOwned(), heroDataCtrl.lvl - 1);
            }
            else {
                bar_expc.setProgress(heroDataCtrl.getExpcProgressOpt());
            }
            var bar_fragment = self.getWidgetByName(clazz.BAR_FRAGMENT);
            var opt = heroDataCtrl.getFragmentProgressOpt();
            bar_fragment.setProgress(opt.cur, opt.total, opt.str);
            bar_fragment.loadLightTexture(res.ui_common.bar_light2_png);
            self.setInfoByName(clazz.IMG_JOB, heroDataCtrl.getJobFrameName()); //设置职业icon
            //设置进化按钮发光特效
            self._resetEvEffect();
            if (isFirst) {
                var ctrl = uw.HeroDetailCtrl.getInstance();
                ctrl.resetByData(heroDataCtrl);
                var panel = infoProp.switcherPanel;
                panel.addChild(ctrl.widget);
                infoProp.currCtrl = ctrl;
            }
            else {
                //重置左侧信息栏
                self._resetLeftPanelInfo();
            }
            //计算当前的index
            var self = this, infoProp = self._infoProp, heroListLayer = infoProp.heroListLayer;
            var heroList = heroListLayer._heroList;
            for (var i = 0, l_i = heroList.length; i < l_i; i++) {
                if (heroDataCtrl == heroList[i].heroDataCtrl) {
                    infoProp.currIndex = i;
                    break;
                }
            }
            var phcd = heroList[infoProp.currIndex - 1];
            var nhcd = heroList[infoProp.currIndex + 1];
            var pnGray = (!phcd || !phcd.heroDataCtrl || phcd.heroDataCtrl.isTempOnly) && (!nhcd || !nhcd.heroDataCtrl || nhcd.heroDataCtrl.isTempOnly);
            self.setGrayByName(clazz.BTN_PRE, pnGray);
            self.setGrayByName(clazz.BTN_NEXT, pnGray);
            infoProp.needToRefresh = false;
        };
        //设置进化按钮发光特效
        __egretProto__._resetEvEffect = function () {
            var self = this, clazz = self.__class, heroDataCtrl = self._heroDataCtrl, infoProp = self._infoProp;
            var opt = heroDataCtrl.getUpgradeOpt();
            var btnUpLvl = self.getWidgetByName(clazz.BTN_EVOLVE);
            if (opt.canUpgrade && !infoProp.upLvlArmCtrl) {
                infoProp.upLvlArmCtrl = uw.UpArmature.play(btnUpLvl, res.cca_ui.upgradable, mo.p(btnUpLvl.width / 2, btnUpLvl.height / 2));
            }
            if (!opt.canUpgrade && infoProp.upLvlArmCtrl) {
                infoProp.upLvlArmCtrl.clear();
                infoProp.upLvlArmCtrl = null;
            }
        };
        __egretProto__._onCloseFunc = function () {
            var self = this, infoProp = self._infoProp;
            infoProp.upLvlInfoMap = null;
            infoProp.currCtrl = null;
        };
        //升阶动画
        __egretProto__._upArmature = function () {
            var self = this, calzz = self.__class;
            var panel_hero = self.getWidgetByName(calzz.PANEL_HERO);
            var size = panel_hero.getSize();
            var pos = mo.p(size.width / 2, size.height * 3 / 4);
            uw.UpArmature.play(panel_hero, res.cca_ui.heroLevelUp, pos, function () {
            }, self);
        };
        __egretProto__._onHeroUpTrainLvl = function () {
            var self = this, clazz = self.__class;
            var heroDataCtrl = arguments[arguments.length - 1];
            if (heroDataCtrl == self._heroDataCtrl) {
                self._setHeroUi(heroDataCtrl, false); //common部分
            }
            self.setInfoByName(clazz.LABEL_COMBAT_EFF, heroDataCtrl.combatEff);
        };
        //英雄升阶
        __egretProto__._onUpgrade = function () {
            var self = this, clazz = self.__class, infoProp = self._infoProp;
            var heroDataCtrl = self._heroDataCtrl;
            var opt = heroDataCtrl.getUpgradeOpt();
            //        //弹出框测试
            //        var upGradeDlg = uw.HeroUpGradeDlg.create();
            //        upGradeDlg.show();
            //        var tempId = heroDataCtrl.tempId;
            //        upGradeDlg.resetByData(tempId, tempId+1);
            //        upGradeDlg.onClose(function(){
            //            cc.log("FFFF")
            //        });
            //        return;
            heroDataCtrl.upgrade(opt, function () {
                self._upArmature();
                self._playArmature(infoProp.actList.length - 1);
                mo.playUIAudio(111); //播放升级音效
                self.setInfoByName(clazz.LABEL_COMBAT_EFF, heroDataCtrl.combatEff); //重新设置战斗力ui
                self.getWidgetByName(clazz.BAR_FRAGMENT).setProgress(heroDataCtrl.getFragmentProgressOpt()); //进度条变化
                self._setHeroUi(heroDataCtrl, false); //common部分
                self._resetEvEffect();
                mo.playUIAudio(111);
            }, self);
        };
        //培养
        __egretProto__._onCulture = function () {
            var c_open = mo.getJSONWithFileName(uw.cfg_c_open);
            var trainLvlRequired = c_open[uw.id_c_open.train][uw.c_open_lvlRequired];
            if (trainLvlRequired > uw.userDataCtrl.getLvl())
                return mo.showMsg(uw.id_c_msgCode.noOpen, trainLvlRequired); //领主等级不足
            if (this._heroDataCtrl.getLvl() <= 1)
                return mo.showMsg(uw.id_c_msgCode.heroLvLess); //英雄等级不足无法进入培养
            uw.HeroTrainDlg.getInstance().resetByData(this._heroDataCtrl).show(true);
        };
        //详细属性
        __egretProto__._onDetail = function () {
            this._switchInfo(uw.HeroDetailCtrl.getInstance(), this._heroDataCtrl, this.__class.TYPE_DETAIL);
        };
        //技能升级
        __egretProto__._onUpSkill = function () {
            var c_open = mo.getJSONWithFileName(uw.cfg_c_open);
            var limitLvlOfLeader = c_open[uw.id_c_open.skill][uw.c_open_lvlRequired];
            if (limitLvlOfLeader > uw.userDataCtrl.getLvl())
                return mo.showMsg(uw.id_c_msgCode.noOpen, limitLvlOfLeader); //领主等级不足
            this._switchInfo(uw.UpSkillCtrl.getInstance(), this._heroDataCtrl, this.__class.TYPE_UPSKILL);
        };
        //添加英雄碎片
        __egretProto__._onAddFragment = function () {
            uw.GainInfoDlg.getInstance().resetByData(this._heroDataCtrl.fragmentId).show();
        };
        //添加经验
        __egretProto__._onAddExpc = function () {
            this._switchInfo(uw.HeroExpcItemListCtrl.getInstance(), this._heroDataCtrl, this.__class.TYPE_EXPC);
        };
        __egretProto__._resetCombatEff = function () {
            var self = this, clazz = self.__class;
            var hdc = self._heroDataCtrl;
            self.setInfoByName(clazz.LABEL_COMBAT_EFF, hdc.combatEff); //设置战斗力
        };
        __egretProto__._onBatchUseExpItem = function (opt) {
            var self = this, clazz = self.__class;
            if (opt) {
                self._infoProp.barExpc.runProgressQueue2(opt.curExp, function (index, baseNum) {
                    var hdc = self._heroDataCtrl;
                    var heroDsToCalProps = new uw.HeroDsToCalProps();
                    heroDsToCalProps.lvl = index + 1;
                    heroDsToCalProps.tempId = hdc.tempId;
                    heroDsToCalProps.trainLvl = hdc.trainLvl;
                    heroDsToCalProps.potentialTrain = hdc.potentialTrain;
                    heroDsToCalProps.skills = hdc.skills;
                    heroDsToCalProps.mixSkill = hdc.mixSkill;
                    var combatEff = uw.calHeroCombatEff(heroDsToCalProps, hdc.getAllEquipDataCtrl());
                    self.setInfoByName(clazz.LABEL_COMBAT_EFF, combatEff); //设置战斗力
                    self.setInfoByName(clazz.LABEL_HERO_LVL, "Lv." + (index + 1)); //设置等级
                    //播放战斗力和等级的动画
                    var action = mo.sequence(mo.scaleTo(0.1, 1.2), mo.scaleTo(0.2, 1));
                    self.runActionByName(clazz.LABEL_COMBAT_EFF, action.clone());
                    self.runActionByName(clazz.LABEL_HERO_LVL, action.clone());
                    self._upArmature();
                    mo.playUIAudio(111);
                    //更新装备可穿戴状态
                    self._initEquipItems(false);
                });
            }
        };
        //引导相关的接口
        /**
         * 通过技能下标和指定的节点的名字，获取到对应的skill项的子节点。
         * @param skillIndex
         * @param name
         * @returns {ccs.Widget|*|A}
         */
        __egretProto__.getSkillItemNodeBySkillIndexAndName = function (skillIndex, name) {
            return uw.UpSkillCtrl.getInstance().getSkillItemNodeBySkillIndexAndName(skillIndex, name);
        };
        /*******这里需要用的的拓展api不多，所以就先直接写死了***********/
        //++++++++++++++++++HeroCommon 开始++++++++++++++++++++++++++++
        __egretProto__._setHeroUi = function (heroDataCtrl, hasIcon, isFragment, isNotChangLvl) {
            var self = this, clazz = self.__class, mainPanel = self._infoProp.mainPanel;
            mainPanel.setInfoByName(clazz.LABEL_HERO_NAME, {
                value: heroDataCtrl.getNameStrToDisplay(),
                hAlign: mo.ALIGN_H_CENTER,
                fontSize: 56
            }); //英雄名称
            mainPanel.enableStrokeByName(clazz.LABEL_HERO_NAME, cc.c3b(0, 0, 0), 3, false); //设置英雄名字描边
            mainPanel.transColorByName(clazz.IMG_HERO_TITLE_BG, heroDataCtrl.colorType);
            if (!heroDataCtrl.isTempOnly && !isNotChangLvl) {
                mainPanel.setInfoByName(clazz.LABEL_HERO_LVL, "Lv." + heroDataCtrl.getLvl()); //等级
                mainPanel.enableStrokeByName(clazz.LABEL_HERO_LVL, cc.c3b(0, 0, 0), 1);
            }
        };
        __egretProto__._setHeroArmatureForInfo = function (heroDataCtrl, cb, ctx) {
            var self = this, clazz = self.__class, infoProp = self._infoProp;
            var panel_hero = self.getWidgetByName(clazz.PANEL_HERO);
            var size = panel_hero.getSize();
            panel_hero.removeChildren();
            //底部阴影
            var shadow = mo.UIImage.create();
            shadow.loadTexture(clazz.FRAME_NAME_FAZHENG);
            panel_hero.addChild(shadow);
            shadow.setPosition(size.width / 2, 500);
            //            var defaultSprite = mo.UIImage.create();
            //            defaultSprite.loadTexture(res.defaultHero_png);
            //            defaultSprite.setAnchorPoint(0.5, 0);
            //            defaultSprite.setOpacity(128);
            //Armature
            var node = infoProp.heroArmature = uw.roleArmFactory.produceDynamic4Recycle(heroDataCtrl.tid, null, function (sender) {
                sender.play(uw.Fight.HeroAction.steady);
                if (cb)
                    cb.call(ctx, sender);
            });
            panel_hero.addChild(node);
            node.setPosition(size.width / 2, 480);
            //node.setScale(1.2);
        };
        HeroInfoLayer.__className = "HeroInfoLayer";
        HeroInfoLayer.LABEL_COMBAT_EFF = "label_combatEff"; //战斗力文本
        HeroInfoLayer.PANEL_MAIN = "panel_main"; //右侧主面板的容器
        HeroInfoLayer.PANEL_BOTTOM = "panel_bottom"; //左侧下方的横条容器
        HeroInfoLayer.PANEL_EQUIP_ITEM_PRE = "panel_equipItem"; //equipItem的名字前缀
        HeroInfoLayer.PANEL_DETAIL_SWITCHER = "panel_detailSwitcher"; //左侧切换的容器
        HeroInfoLayer.PANEL_EXPC = "panel_expc"; //经验栏容器
        HeroInfoLayer.PANEL_FRAGMENT = "panel_fragment"; //碎片栏容器
        HeroInfoLayer.BAR_FRAGMENT = "bar_fragment"; //英雄碎片进度条
        HeroInfoLayer.BAR_EXPC = "bar_expc"; //经验进度条
        HeroInfoLayer.BTN_EVOLVE = "btn_evolve"; //英雄升阶按键
        HeroInfoLayer.BTN_CULTURE = "btn_culture"; //培养按键
        HeroInfoLayer.BTN_DETAIL = "btn_detail"; //详细属性按键
        HeroInfoLayer.BTN_UPSKILL = "btn_upSkill"; //技能升级按键
        HeroInfoLayer.BTN_CLOSE = "btn_close"; //关闭按键
        HeroInfoLayer.PANEL = "panel"; //前后按键的container
        HeroInfoLayer.BTN_PRE = "btn_pre"; //上一个英雄按键
        HeroInfoLayer.BTN_NEXT = "btn_next"; //下一个英雄按键
        HeroInfoLayer.IMG_JOB = "img_job";
        HeroInfoLayer.IMG_BG = "img_bg"; //背景
        HeroInfoLayer.LABEL_LVL = "label_lvl";
        HeroInfoLayer.IMG_LVL_BG = "img_lvlBg";
        HeroInfoLayer.TYPE_EQUIP = "equip";
        HeroInfoLayer.TYPE_DETAIL = "detail";
        HeroInfoLayer.TYPE_UPSKILL = "skill";
        HeroInfoLayer.TYPE_EXPC = "expc";
        //从HeroCommon移过来的
        HeroInfoLayer.LABEL_HERO_NAME = "label_heroName"; //英雄名字
        HeroInfoLayer.LABEL_HERO_LVL = "label_heroLvl"; //英雄等级
        HeroInfoLayer.IMG_HERO_TITLE_BG = "img_heroTitleBg"; //英雄标题背景
        HeroInfoLayer.IMG_HERO_CARD_BG = "img_cardBg"; //卡背景
        HeroInfoLayer.IMG_RACE_FUWEN = "img_raceFuwen"; //种族符文的背景图片
        HeroInfoLayer.IMG_HERO_LVL_BG = "img_heroLvlBg"; //英雄等级背景图片
        HeroInfoLayer.PANEL_HERO = "panel_hero"; //英雄armature容器
        HeroInfoLayer.FRAME_NAME_FAZHENG = res.ui_hero.fazhen_png; //底部法阵,
        HeroInfoLayer.LOADINGB_BAR = "bar_fragment"; //进度条
        return HeroInfoLayer;
    })(mo.UIModalLayer);
    uw.HeroInfoLayer = HeroInfoLayer;
    HeroInfoLayer.prototype.__class__ = "uw.HeroInfoLayer";
})(uw || (uw = {}));

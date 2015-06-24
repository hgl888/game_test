/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ForgeExclusiveLayer = (function (_super) {
        __extends(ForgeExclusiveLayer, _super);
        function ForgeExclusiveLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ForgeExclusiveLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiForgeExclusive_ui;
            self._showPickupTips = true;
        };
        __egretProto__.init = function (defaultHeroCtrl) {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            self._forgeCart = uw.ForgeCart.create();
            self._beforeProps = {};
            self._beforeMult = {};
            self._curHeroCtrl = defaultHeroCtrl ? defaultHeroCtrl : null;
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.EXACT_FIT);
            var expLabel = self._expLabel = self.getWidgetByName(clazz.LABEL_EXP_PLUS);
            expLabel.setVisible(false);
            expLabel.setOpacity(0);
            self._flyEndPos = self.getWidgetByName("flyEndPos").getPosition();
            self.setVisibleByName("flyEndPos", false);
            self._optPanel = self.getWidgetByName(clazz.PANEL_OPT);
            self._equipIconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(clazz.PANEL_EXCLUSIVE_ICON));
            self._heroIconCtrl = uw.UIHeroIconCtrl.create(self.getWidgetByName(clazz.PANEL_HERO_ICON));
            self.onClickByName("btnForge", self._onBtnForge, self);
            self.onClickByName("btnOneKey", self._onOneKeyForge, self);
            self.onClickByName(clazz.PANEL_CHOOSE, self._onHeroBtnClick, self);
            var expBar = self._expBar = self.getWidgetByName("expBar");
            //模拟吃经验时满阶了
            expBar.onStopRunningProgress(function (opt) {
                if (!opt.isMax)
                    return;
                self.setVisibleByName(clazz.LAYOUT_LEVELUP, false);
                expBar.getInnerLabel().setText("已满阶");
            }, self);
            //经验条在跑了
            expBar.onRunningProgress(function (index, cur, total) {
                if (cur != total) {
                    self.setVisibleByName(clazz.LAYOUT_LEVELUP, true);
                }
            }, self);
            expBar.setProgress({ cur: 0, total: 0 });
            expBar.loadLightTexture(res.ui_common.bar_light2_png);
            var label = expBar.getInnerLabel();
            label.setFontSize(36);
            self.onClickByName(clazz.PANEL_OPT, function (sender) {
                if (self._curEquipCtrl.isMaxExclusiveLvl())
                    return; //如果满阶了，则不做任何响应
                if (!self._curEquipCtrl.isHeroLvlEnough())
                    return mo.showMsg(uw.id_c_msgCode.noHeroLvExclusiveCantUp, self._curEquipCtrl.forgeNeedHeroLvl);
                self._showPickupTips = false;
                sender.setTouchEnabled(false);
                self.setVisibleByName(clazz.PANEL_GEM_LIST, !self._showPickupTips);
                self.setVisibleByName(clazz.LABEL_CHOOSETIPS, self._showPickupTips);
            }, self);
            // 装备基础属性
            self._equipPropGridCtrl = uw.EquipPropGridCtrl.create(self.getWidgetByName("propNormal"));
            // 专属经验道具列表
            self._createGridScrollView(clazz.PANEL_GEM_LIST, uw.ForgePickupItemCell, 5, this._onItemCellDataSource, true);
            self._gridScrollView.ignoreNullCell(false);
            self.setVisibleByName(clazz.PANEL_TOP_DETAIL, false);
            self._initExpItems();
            self._setHero(self._curHeroCtrl);
            self._setEquip(self._curEquipCtrl);
            // 下一帧执行
            process.nextTick(function () {
                // 如果是从锻造屋直接进来的，则默认弹出英雄选择框
                if (!self._curHeroCtrl) {
                    self._onHeroBtnClick();
                }
            });
            //注册监听
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.gold.toString(), self._refreshCost);
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.diamond.toString(), self._refreshCost);
        };
        __egretProto__._initExpItems = function () {
            var self = this;
            // 物品
            var items = uw.userDataCtrl.getExclusiveExpItems();
            var itemList = uw.getRepeatedBagDataCtrlList(items);
            //1.道具->材料->装备 2.经验小到大
            itemList.sort(mo.sortOption.bind({ list: [{ name: uw.BAG_FILTER_KEY, type: 1 }, { name: uw.FORGE_EXP_SORT_KEY, type: 1 }] }));
            var pickItemList = self._pickItemList = [];
            var pickCtrl;
            for (var i = 0, li = itemList.length; i < li; i++) {
                pickCtrl = uw.PickDataCtrl.create(itemList[i], 0);
                pickItemList.push(pickCtrl);
            }
            // 装备
            var equipList = uw.userDataCtrl.getEquipsHasExclusiveExp();
            for (var i = 0, li = equipList.length; i < li; i++) {
                pickCtrl = uw.PickDataCtrl.create(equipList[i], 0);
                pickItemList.push(pickCtrl);
            }
            self._gridScrollView.setTotalCount(Math.max(2 * 5, pickItemList.length));
        };
        /**
         * 根据物品id， 滚动scrollview
         * @param tempId
         */
        __egretProto__.scrollToItem = function (tempId) {
            var self = this;
            var cols = 5;
            var totalRow = Math.ceil(self._pickItemList.length / cols);
            for (var i = 0, li = self._pickItemList.length; i < li; i++) {
                if (self._pickItemList[i].dataCtrl.tempId == tempId) {
                    var row = Math.ceil(i / cols);
                    self._gridScrollView.jumpToPercentVertical(row / totalRow * 100);
                    break;
                }
            }
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var item = this._pickItemList[index];
            cell.resetByData(item);
            cell.onClick(this._onCellClick, this);
            cell.onUnPickClick(this._onUnPickClick, this, null);
        };
        __egretProto__._onCellClick = function (cell) {
            var self = this;
            // 武器已满级就直接返回
            if (self._opt.isMaxLvl) {
                return mo.showMsg(uw.id_c_msgCode.exclusiveLv);
            }
            // 英雄等级是否足够
            if (self._opt.showNeedHeroTips) {
                return mo.showMsg(uw.id_c_msgCode.noHeroLvExclusiveCantUp, self._opt.forgeNeedHeroLvl);
            }
            var idx = cell.getIdx();
            var pickDataCtrl = self._pickItemList[idx];
            var dataCtrl = pickDataCtrl.dataCtrl;
            // 边界检查
            if (!pickDataCtrl.pickUpTest())
                return;
            // 添加物品到购物车
            var tempId = dataCtrl.tempId;
            if (pickDataCtrl.isBindBagDataCtrl()) {
                self._forgeCart.addItem(tempId);
            }
            else {
                self._forgeCart.addEquip(dataCtrl.id);
            }
            self._opt = self._curEquipCtrl.getUpExclusiveOpt(self._forgeCart);
            self._updateExpBar();
            // 物品icon飞行效果
            var expLabel = self._expLabel;
            var optPanel = self._optPanel;
            var imgIcon = cell.getWidgetByName(uw.UIItemIconCtrl.IMG_ICON);
            var flyIcon = mo.UIImage.create();
            flyIcon.loadTexture(resHelper.getItemIconPath(tempId));
            flyIcon.stopAllActions();
            flyIcon.setVisible(true);
            flyIcon.setPosition(mo.convertNodeToNodeSpace(optPanel, imgIcon, mo.p(imgIcon.getSize().width / 2, imgIcon.getSize().height / 2)));
            optPanel.addChild(flyIcon);
            var moveAct = mo.moveTo(0.5, self._flyEndPos).setEase(mo.Ease.sineIn);
            var scaleAct = mo.scaleTo(0.5, 0.5).setEase(mo.Ease.backOut);
            var fadeOutAct = mo.fadeOut(0.5);
            var seq = mo.sequence(mo.spawn(moveAct, scaleAct), mo.delayTime(0.2), mo.callFunc(function () {
                // 显示经验加成
                var label = expLabel.clone();
                label.setText("+" + dataCtrl.getExclusiveExp());
                label.setVisible(true);
                optPanel.addChild(label);
                var fadeOut = mo.fadeOut(1);
                var fadeIn = mo.fadeIn(0.2);
                var moveUp = mo.moveBy(1, mo.p(0, -150)).setEase(mo.Ease.sineIn);
                var spawn = mo.spawn(moveUp, fadeOut);
                var act = mo.sequence(fadeIn, mo.delayTime(0.3), spawn, mo.callFunc(function () {
                    // 移除
                    label.removeFromParent(true);
                }, self));
                label.runAction(act);
            }, self), fadeOutAct, mo.callFunc(function () {
                // 移除
                flyIcon.removeFromParent(true);
            }, self));
            flyIcon.runAction(seq);
            // 通知数据模型，选择成功
            pickDataCtrl.pick();
        };
        __egretProto__._onUnPickClick = function (cell) {
            var self = this;
            var idx = cell.getIdx();
            var pickDataCtrl = self._pickItemList[idx];
            var dataCtrl = pickDataCtrl.dataCtrl;
            // 边界检查
            if (!pickDataCtrl.pickUpTest(-1))
                return;
            // 从购物车中移除物品
            if (pickDataCtrl.isBindBagDataCtrl()) {
                self._forgeCart.addItem(dataCtrl.tempId, -1);
            }
            else {
                self._forgeCart.addEquip(dataCtrl.id, true);
            }
            // 更新opt
            self._opt = self._curEquipCtrl.getUpExclusiveOpt(self._forgeCart);
            self._updateExpBar();
            pickDataCtrl.unpick();
        };
        __egretProto__._onHeroBtnClick = function () {
            var self = this;
            var dlg = uw.ForgeChooseHeroDlg.create(self._curHeroCtrl);
            dlg.onClose(self._onHeroDlgClose, self);
            dlg.show();
        };
        __egretProto__._onHeroDlgClose = function (event) {
            uw.log("_onHeroDlgClose");
            var self = this;
            var dlg = event.target;
            var heroCtrl = dlg.getCurChoosed();
            if (heroCtrl) {
                if (heroCtrl != self._curHeroCtrl) {
                    self._cleanCart();
                    self._setHero(heroCtrl);
                }
            }
            else {
                mo.sceneMgr.popScene();
            }
        };
        __egretProto__._setHero = function (heroCtrl) {
            var self = this, clazz = self.__class;
            var visible = heroCtrl ? true : false;
            self.setTouchEnabledByName(clazz.PANEL_OPT, !visible);
            self._heroIconCtrl.resetByData(heroCtrl);
            if (!visible)
                return;
            self._curHeroCtrl = heroCtrl;
            // 设置改英雄的专属装备信息
            var part = uw.c_prop.equipPartKey.exclusive;
            var equipCtrl = heroCtrl.getEquipDataCtrlByPart(part);
            equipCtrl = equipCtrl.isTempOnly ? null : equipCtrl;
            self._setEquip(equipCtrl);
        };
        /**
         * 添加一件装备到列表
         * @param equipCtrl
         * @private
         */
        __egretProto__._addEquipToList = function (equipCtrl) {
            if (!equipCtrl)
                return;
            var self = this;
            var pickCtrl = uw.PickDataCtrl.create(equipCtrl, 0);
            self._pickItemList.push(pickCtrl);
        };
        /**
         *  删除一件装备
         * @param id
         * @private
         */
        __egretProto__._removeEquipFromList = function (id, isOneKey) {
            var self = this;
            for (var i = 0, li = self._pickItemList.length; i < li; i++) {
                var pickItem = self._pickItemList[i];
                if (!pickItem.isBindBagDataCtrl()) {
                    if (pickItem.dataCtrl.id == id) {
                        if (!isOneKey) {
                            mo.ArrayRemoveObject(self._pickItemList, pickItem);
                        }
                        else {
                            pickItem.unpick();
                        }
                        break;
                    }
                }
            }
        };
        /**
         *  删除背包物品
         * @param id
         * @param isOneKey 是否一键锻造
         * @returns {Number}
         * @private
         */
        __egretProto__._delBagItemFromList = function (id, isOneKey) {
            var self = this;
            var ctrlList = self._pickItemList;
            var pickCtrl, bagDataCtrl, dropArr = [];
            for (var i = ctrlList.length - 1; i >= 0; i--) {
                pickCtrl = ctrlList[i];
                if (pickCtrl.isBindBagDataCtrl()) {
                    bagDataCtrl = pickCtrl.dataCtrl;
                    if (bagDataCtrl._tempId == id) {
                        if (pickCtrl.pickCount <= 0)
                            continue;
                        // 还原被选择的物品
                        if (isOneKey)
                            pickCtrl.unpickAll();
                        // 移除选中数量的物品，如果是全选，则要把dataCtrl整体移除掉
                        if (!isOneKey && pickCtrl.removeAllPickup() <= 0)
                            dropArr.push(pickCtrl);
                    }
                }
            }
            var dropLength = dropArr.length;
            while (dropArr.length) {
                mo.ArrayRemoveObject(ctrlList, dropArr.pop());
            }
            return dropLength;
        };
        __egretProto__._setEquip = function (equipCtrl) {
            var self = this, clazz = self.__class;
            var visible = equipCtrl ? true : false;
            self.setVisibleByName(clazz.PANEL_TOP_DETAIL, visible);
            self.setVisibleByName(clazz.PANEL_BOTTOM_DETAIL, visible);
            self.setVisibleByName(clazz.PANEL_TOP_DETAIL, visible);
            self._equipIconCtrl.resetByData(equipCtrl);
            if (!equipCtrl) {
                self._equipIconCtrl.setEquipUi(uw.c_prop.equipPartKey.exclusive, false);
            }
            self._curEquipCtrl = equipCtrl;
            // 直接返回
            if (!visible)
                return;
            var tempId = equipCtrl.tempId;
            /** 设置名字 **/
            var color = uw.getItemColorByTempId(tempId);
            var labelStr = mo.formatStr("[ubb color=%s]%s [/ubb]", color, equipCtrl.name);
            var lvlStr = equipCtrl.lvl ? mo.formatStr("[ubb color=%s](%s阶)[/ubb]", color, equipCtrl.lvl) : "";
            labelStr += lvlStr;
            self.setInfoByName("name_lvl", { value: labelStr, fontSize: 70 });
            /** 设置锻造等级 **/
            var isHeroLvlEnough = equipCtrl.isHeroLvlEnough();
            var isMaxExclusiveLvl = equipCtrl.isMaxExclusiveLvl();
            self.setVisibleByName(clazz.LABEL_LVLLIMIT, !isMaxExclusiveLvl);
            self.setInfoByName(clazz.LABEL_LVLLIMIT, {
                value: mo.formatStr("锻造等级：[ubb color=%s]%s[/ubb]", isHeroLvlEnough ? "#e79057" : "red", equipCtrl.forgeNeedHeroLvl),
                fontSize: 50
            });
            /** 设置经验条两端的等级 **/
            self.setInfoByName(clazz.LABEL_CURLV, equipCtrl.lvl);
            self.setInfoByName(clazz.LABEL_NEXTLV, equipCtrl.lvl + 1);
            self.doLayoutByName(clazz.LAYOUT_LEVELUP);
            //属性列表
            self._equipPropGridCtrl.resetByData(equipCtrl.getPropsWithAddValue());
            self.doLayoutByName(clazz.LAYOUT_NAME_PROP);
            //天赋
            var textColorOn = cc.c3b(238, 94, 44), colorOn = cc.hexToColor("#fdfdfd"), colorOff = cc.hexToColor("#666566"); //灰色
            self.setInfoByName(clazz.LABEL_PATTACK_TALENT, equipCtrl.pAttackMult); //物攻天赋
            self.setColorByName(clazz.LABEL_PATTACK_TALENT, equipCtrl.pAttackMult > 0 ? textColorOn : colorOff); //物攻天赋
            self.setColorByName(clazz.LABEL_PATTACK_TALENT_TXT, equipCtrl.pAttackMult > 0 ? colorOn : colorOff); //物攻天赋
            self.setInfoByName(clazz.LABEL_PDEFENCE_TALENT, equipCtrl.pDefenceMult); //物防天赋
            self.setColorByName(clazz.LABEL_PDEFENCE_TALENT, equipCtrl.pDefenceMult > 0 ? textColorOn : colorOff); //物防天赋
            self.setColorByName(clazz.LABEL_PDEFENCE_TALENT_TXT, equipCtrl.pDefenceMult > 0 ? colorOn : colorOff); //物防天赋
            self.setInfoByName(clazz.LABEL_MATTACK_TALENT, equipCtrl.mAttackMult); //魔攻天赋
            self.setColorByName(clazz.LABEL_MATTACK_TALENT, equipCtrl.mAttackMult > 0 ? textColorOn : colorOff); //魔攻天赋
            self.setColorByName(clazz.LABEL_MATTACK_TALENT_TXT, equipCtrl.mAttackMult > 0 ? colorOn : colorOff); //魔攻天赋
            self.setInfoByName(clazz.LABEL_MDEFENCE_TALENT, equipCtrl.mDefenceMult); //魔防天赋
            self.setColorByName(clazz.LABEL_MDEFENCE_TALENT, equipCtrl.mDefenceMult > 0 ? textColorOn : colorOff); //魔攻天赋
            self.setColorByName(clazz.LABEL_MDEFENCE_TALENT_TXT, equipCtrl.mDefenceMult > 0 ? colorOn : colorOff); //魔攻天赋
            var opt = self._opt = self._curEquipCtrl.getUpExclusiveOpt(self._forgeCart);
            // 更新经验条
            self._updateCostUI();
            var expBar = self._expBar;
            expBar.resetSelf();
            expBar.setProgressQueueBaseNumber(equipCtrl.getCurExpQueueArr(), mo.UILoadingBar.SWITCH_MODE_NEGATIVE);
            var isMaxLvl = opt.isMaxLvl;
            self.setVisibleByName(clazz.PANEL_MONEY, !isMaxLvl);
            self.setVisibleByName(clazz.PANEL_MONEY_MAX, isMaxLvl);
            self.setVisibleByName(clazz.PANEL_GEM_LIST, !isMaxLvl);
            self.setVisibleByName(clazz.LAYOUT_LEVELUP, !isMaxLvl);
            if (isMaxLvl) {
                expBar.setProgress({ cur: opt.finalLvlExpcRequired, total: opt.finalLvlExpcRequired });
                expBar.getInnerLabel().setText("已满阶");
                self.setInfoByName(clazz.LABEL_CHOOSETIPS, "专属已满阶");
                self.setVisibleByName(clazz.LABEL_CHOOSETIPS, true);
                self.setTouchEnabledByName(clazz.PANEL_OPT, true);
                return;
            }
            if (!isHeroLvlEnough) {
                self.setInfoByName(clazz.LABEL_CHOOSETIPS, "英雄未达到锻造等级");
                self.setVisibleByName(clazz.LABEL_CHOOSETIPS, true);
                self.setVisibleByName(clazz.PANEL_GEM_LIST, false);
                self.setTouchEnabledByName(clazz.PANEL_OPT, true);
            }
            else {
                if (self._showPickupTips)
                    self.setInfoByName(clazz.LABEL_CHOOSETIPS, "点此处打开背包选择材料或者装备进行锻造");
                self.setVisibleByName(clazz.PANEL_GEM_LIST, !self._showPickupTips);
                self.setVisibleByName(clazz.LABEL_CHOOSETIPS, self._showPickupTips);
                self.setTouchEnabledByName(clazz.PANEL_OPT, self._showPickupTips);
            }
            expBar.setCurTargetValue(opt.leftExpc, 0);
        };
        /**
         * 更新视图
         * @param opt
         * @private
         */
        __egretProto__._onExclusiveUped = function (opt, isOneKey) {
            var self = this;
            var items = opt.items, equips = opt.equipIds;
            var dropLen = 0;
            for (var key in items) {
                dropLen += self._delBagItemFromList(key, isOneKey); // 一键锻造不消耗道具
            }
            for (var i = 0, li = equips.length; i < li; i++) {
                self._removeEquipFromList(equips[i], isOneKey);
            }
            if (equips.length > 0 || (dropLen > 0 && !isOneKey)) {
                self._gridScrollView.setTotalCount(Math.max(2 * 5, self._pickItemList.length));
            }
            if (isOneKey || (opt.lvl != opt.finalLvl)) {
                // 升阶了，用对话框提示
                var dlg = uw.ForgeExclusiveSuccDlg.create(self._curEquipCtrl, self._beforeProps, self._beforeMult);
                dlg.show();
            }
            else {
                // 锻造成功
                mo.showMsg(uw.id_c_msgCode.exclusivExp1);
            }
            // 最后才清空购物车对象
            self._forgeCart.clearCart();
            this._setEquip(this._curEquipCtrl);
        };
        __egretProto__._onBtnForge = function () {
            var self = this;
            if (!self._curEquipCtrl)
                return;
            self._doUpgrade(false);
        };
        __egretProto__._onOneKeyForge = function () {
            var self = this;
            if (!self._curEquipCtrl)
                return;
            self._doUpgrade(true);
        };
        __egretProto__._doUpgrade = function (isOneKey) {
            var self = this;
            self._expBar.stopQueueRunning(); // 停止动画
            var curEquipCtrl = self._curEquipCtrl;
            self._beforeProps = curEquipCtrl.getProps();
            self._beforeMult.pAttackMult = curEquipCtrl.pAttackMult;
            self._beforeMult.pDefenceMult = curEquipCtrl.pDefenceMult;
            self._beforeMult.mAttackMult = curEquipCtrl.mAttackMult;
            self._beforeMult.mDefenceMult = curEquipCtrl.mDefenceMult;
            var opt = self._curEquipCtrl.getUpExclusiveOpt(self._forgeCart);
            curEquipCtrl.upExclusive(opt, isOneKey, self._onExclusiveUped, self);
        };
        __egretProto__._updateExpBar = function () {
            var self = this, clazz = self.__class;
            var expBar = self._expBar, opt = self._opt;
            expBar.runProgressQueue2(opt.curTotalExp, function (index, baseNum) {
                var arr = self._curEquipCtrl.getExpQueueArr();
                var curLvl = arr.indexOf(baseNum);
                var nextLvl = curLvl + 1;
                if (nextLvl <= arr.length) {
                    self.setVisibleByName(clazz.LAYOUT_LEVELUP, true);
                    self.setInfoByName(clazz.LABEL_CURLV, curLvl);
                    self.setInfoByName(clazz.LABEL_NEXTLV, nextLvl);
                    self.doLayoutByName(clazz.LAYOUT_LEVELUP);
                }
            }, self);
            self._updateCostUI();
        };
        __egretProto__._updateCostUI = function () {
            var self = this, opt = self._opt;
            self.setInfoByName("gold", opt.gold);
            self.setColorByName("gold", opt.isGoldEnough ? cc.WHITE : cc.RED);
            self.setInfoByName("diamond", opt.diamond);
            self.setColorByName("diamond", opt.isDiamondEnough ? cc.WHITE : cc.RED);
        };
        __egretProto__._refreshCost = function () {
            var self = this;
            self._opt = self._curEquipCtrl.getUpExclusiveOpt(self._forgeCart);
            self._updateCostUI();
        };
        /**
         * 清空购物车
         * @private
         */
        __egretProto__._cleanCart = function () {
            var self = this;
            self._forgeCart.clearCart();
            var itemList = self._pickItemList;
            for (var i = 0, li = itemList.length; i < li; i++) {
                var pickCtrl = itemList[i];
                pickCtrl.unpickAll();
            }
        };
        ForgeExclusiveLayer.__className = "ForgeExclusiveLayer";
        ForgeExclusiveLayer.LABEL_PATTACK_TALENT_TXT = "label_pAttackTalentTxt"; //物攻天赋
        ForgeExclusiveLayer.LABEL_PDEFENCE_TALENT_TXT = "label_pDefenceTalentTxt"; //物防天赋
        ForgeExclusiveLayer.LABEL_MATTACK_TALENT_TXT = "label_mAttackTalentTxt"; //魔攻天赋
        ForgeExclusiveLayer.LABEL_MDEFENCE_TALENT_TXT = "label_mDefenceTalentTxt"; //魔防天赋
        ForgeExclusiveLayer.LABEL_PATTACK_TALENT = "label_pAttackTalent"; //物攻天赋
        ForgeExclusiveLayer.LABEL_PDEFENCE_TALENT = "label_pDefenceTalent"; //物防天赋
        ForgeExclusiveLayer.LABEL_MATTACK_TALENT = "label_mAttackTalent"; //魔攻天赋
        ForgeExclusiveLayer.LABEL_MDEFENCE_TALENT = "label_mDefenceTalent"; //魔防天赋
        ForgeExclusiveLayer.PANEL_EXCLUSIVE_ICON = "panel_exclusiveIcon";
        ForgeExclusiveLayer.PANEL_HERO_ICON = "panel_heroIcon";
        ForgeExclusiveLayer.PANEL_TOP_DETAIL = "panel_topDetail";
        ForgeExclusiveLayer.PANEL_BOTTOM_DETAIL = "panel_bottomDetail";
        ForgeExclusiveLayer.PANEL_OPT = "panel_opt";
        ForgeExclusiveLayer.PANEL_CHOOSE = "panelChoose";
        ForgeExclusiveLayer.PANEL_GEM_LIST = "gem_list";
        ForgeExclusiveLayer.PANEL_MONEY = "panel_money"; //显示升级的花销
        ForgeExclusiveLayer.PANEL_MONEY_MAX = "panel_money_max"; //满阶级时显示的文字
        ForgeExclusiveLayer.LABEL_EXP_PLUS = "expPlus"; //经验加成
        ForgeExclusiveLayer.LABEL_CURLV = "label_curLv"; //当前等级
        ForgeExclusiveLayer.LABEL_NEXTLV = "label_nextLv"; // 下一级
        ForgeExclusiveLayer.LAYOUT_LEVELUP = "layout_levelup";
        ForgeExclusiveLayer.LAYOUT_NAME_PROP = "layout_name_prop";
        ForgeExclusiveLayer.LABEL_CHOOSETIPS = "chooseTips"; //提示文字
        ForgeExclusiveLayer.LABEL_LVLLIMIT = "label_lvlLimit"; //提示文字
        return ForgeExclusiveLayer;
    })(mo.DisplayLayer);
    uw.ForgeExclusiveLayer = ForgeExclusiveLayer;
    ForgeExclusiveLayer.prototype.__class__ = "uw.ForgeExclusiveLayer";
})(uw || (uw = {}));

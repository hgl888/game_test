var uw;
(function (uw) {
    uw.hideSkipBtn = false;
    uw.hidePauseBtn = false;
    var FightUILayer = (function (_super) {
        __extends(FightUILayer, _super);
        function FightUILayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightUILayer.prototype;
        __egretProto__._initProp = function () {
            var self = this;
            _super.prototype._initProp.call(this);
            self._fightOption = new uw._FightUILayerOption();
            self._jsonPath = res.uiFightUILayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this, fightOption = self._fightOption;
            fightOption._totalWaveCount = 0;
            fightOption._title = self.getWidgetByName("title");
            fightOption._btnPause = self.getWidgetByName("btnPause");
            fightOption._btnSkip = self.getWidgetByName("btnSkip");
            fightOption._btnAutoFight = self.getWidgetByName("btnAutoFight");
            fightOption._btnContinue = self.getWidgetByName("btnContinue");
            fightOption._labelWaveCount = self.getWidgetByName("labelWaveCount");
            fightOption._mixSkillContainer = self.getWidgetByName("mixSkillContainer");
            fightOption._userSkillContainer = self.getWidgetByName("userSkillContainer");
            fightOption._labelTimer = self.getWidgetByName("labelTimer");
            fightOption._btnPause.onClick(self._menuPause, self);
            fightOption._btnPause.setVisible(!uw.hidePauseBtn);
            fightOption._btnAutoFight.onClick(self._menuAutoFight, self);
            fightOption._btnContinue.onClick(self._menuContinue, self);
            fightOption._btnSkip.onClick(self._menuSkip, self);
            //显示跳过按钮
            fightOption._btnSkip.setVisible(!uw.hideSkipBtn && mo.project.fightDebugMode);
            fightOption._btnSkip.setTouchEnabled(true);
            //如果这个关卡已经打过了, 模拟战斗跳过
            if (!uw.isFightSimulate) {
                var matrixTypeKey = uw.c_prop.matrixTypeKey;
                var fightType = uw.fightMainCtrl.fightType;
                var copyId = uw.fightMainCtrl.copyId;
                if (matrixTypeKey.arenaA != fightType) {
                    var isPassed;
                    if (matrixTypeKey.tower == fightType) {
                        isPassed = uw.towerDataCtrl.isCopyPassed(copyId);
                    }
                    else {
                        isPassed = uw.userDataCtrl.getCopyProgressByCopyId(copyId).isCopyPassed(copyId);
                    }
                    if (!isPassed) {
                        self.hideAutoFightBtn();
                    }
                }
            }
            else {
                self.hideSimulateBtns();
            }
            //设置时间
            var time = self._formatTime(mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.fightConfig)[5]);
            fightOption._labelTimer.setText(time);
            self._hideBtnContinue(false);
            //描边);
            self.enableStrokeByName("labelWaveCount", mo.c3b(2, 3, 2), 4);
            self._initHandSkillNotice(uw.FightSelfHandSkillCtrl);
            self._initHandSkillNotice(uw.SelfSimulateHandSkillCtrl);
            var clazz4 = uw.FightRoundCtrl;
            self.registerClassByKey(clazz4, clazz4.SHOW_BTN_CONTINUE, self._showBtnContinue);
            self.registerClassByKey(clazz4, clazz4.NEMU_BTN_CONTINUE, self._menuContinue);
            self.registerClassByKey(clazz4, clazz4.ON_REMAIN_TIME_CHANGED, self.setRemainTime);
            self.registerClassByKey(clazz4, clazz4.SHOW_START_LAYER, self.showStartLayer);
            var clazzFightHpCtrl = uw.FightHeroHpCtrl;
            self.registerClassByKey(clazzFightHpCtrl, clazzFightHpCtrl.SET_MIX_SKILL_HP_PERCENT, self.setMixSkillHpPercent);
            var clazzFightHeroEnergyCtrl = uw.FightHeroEnergyCtrl;
            self.registerClassByKey(clazzFightHeroEnergyCtrl, clazzFightHeroEnergyCtrl.SET_MIX_SKILL_ENERGY_PERCENT, self.setMixSkillEnergyPercent);
            self.registerClassByKey(clazzFightHeroEnergyCtrl, clazzFightHeroEnergyCtrl.SET_MIX_SKILL_CAN_USE, self.setMixCanUse);
            var clazzFightUserEnergyCtrl = uw.FightUserEnergyCtrl;
            self.registerClassByKey(clazzFightUserEnergyCtrl, clazzFightUserEnergyCtrl.SET_USER_SKILL_ENERGY_PERCENT, self.setUserSkillPercent);
            self.registerClassByKey(clazzFightUserEnergyCtrl, clazzFightUserEnergyCtrl.SET_USER_SKILL_CAN_USE, self.setUserSkillCanUse);
            //初始化大招满状态UI
            self._initMixFullArm();
            self._initMixTouch();
            //初始化秘术满状态UI
            self._initUserFullArm();
            self._initUserTouch();
            //初始化血条危险状态
            self._initDangerNode();
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            //还原按键显示状态
            uw.hideSkipBtn = false;
            uw.hidePauseBtn = false;
        };
        __egretProto__.initUserSkillIcon = function (skillIconArr) {
            for (var i = 0; i < skillIconArr.length; i++) {
                var locIcon = skillIconArr[i];
                var locIconNode = this._fightOption._userSkillContainer.getWidgetByName("userSkill" + i).getWidgetByName("icon");
                locIconNode.loadTexture(locIcon);
            }
        };
        __egretProto__.initMixIcon = function (tempIds) {
            for (var i = 0; i < tempIds.length; i++) {
                var locTempId = tempIds[i];
                var locIconNode = this._fightOption._mixSkillContainer.getWidgetByName("heroItem" + i).getWidgetByName("icon");
                var tipDataCtrl = uw.UIHeroIconCtrl.create(locIconNode, locTempId);
            }
            this._initHeroItemPos(tempIds.length);
        };
        __egretProto__._initHeroItemPos = function (length) {
            var posMap = {
                "1": [mo.p(500, 390)],
                "2": [mo.p(690, 390), mo.p(300, 390)],
                "3": [mo.p(850, 390), mo.p(500, 390), mo.p(150, 390)],
                "4": [mo.p(1100, 390), mo.p(750, 390), mo.p(400, 390), mo.p(50, 390)],
                "5": [mo.p(1280, 390), mo.p(960, 390), mo.p(640, 390), mo.p(320, 390), mo.p(0, 390)]
            };
            for (var i = length + 1; i <= 5; i++) {
                var locHeroItem = this._fightOption._mixSkillContainer.getWidgetByName("heroItem" + (i - 1));
                locHeroItem.visible = false;
            }
            for (var i = 0; i < length; i++) {
                var locHeroItem = this._fightOption._mixSkillContainer.getWidgetByName("heroItem" + i);
                locHeroItem.visible = true;
                var locPos = posMap[length][i];
                locHeroItem.setPosition(locPos);
            }
        };
        //初始化秘术满状态UI
        __egretProto__._initUserFullArm = function () {
            var self = this, onMixFullMovement = self._onMixFullMovement, uiArmFactory = uw.uiArmFactory, fightOption = this._fightOption, fight_skillAble = res.cca_ui.fight_skillAble;
            fightOption._userFullArm0 = uiArmFactory.produce(fight_skillAble);
            fightOption._userFullArm1 = uiArmFactory.produce(fight_skillAble);
            fightOption._userFullArm0.setMovementEventCallFunc(onMixFullMovement, self);
            fightOption._userFullArm1.setMovementEventCallFunc(onMixFullMovement, self);
        };
        //初始化大招满状态UI
        __egretProto__._initMixFullArm = function () {
            var self = this, onMixFullMovement = self._onMixFullMovement, uiArmFactory = uw.uiArmFactory, fightOption = self._fightOption, fightMixFull = res.cca_ui.fightMixFull;
            fightOption._mixFullArm0 = uiArmFactory.produce(fightMixFull);
            fightOption._mixFullArm1 = uiArmFactory.produce(fightMixFull);
            fightOption._mixFullArm2 = uiArmFactory.produce(fightMixFull);
            fightOption._mixFullArm3 = uiArmFactory.produce(fightMixFull);
            fightOption._mixFullArm4 = uiArmFactory.produce(fightMixFull);
            fightOption._mixFullArm0.setMovementEventCallFunc(onMixFullMovement, self);
            fightOption._mixFullArm1.setMovementEventCallFunc(onMixFullMovement, self);
            fightOption._mixFullArm2.setMovementEventCallFunc(onMixFullMovement, self);
            fightOption._mixFullArm3.setMovementEventCallFunc(onMixFullMovement, self);
            fightOption._mixFullArm4.setMovementEventCallFunc(onMixFullMovement, self);
        };
        //初始化血条危险状态
        __egretProto__._initDangerNode = function () {
            var fightOption = this._fightOption;
            fightOption._dangerPercent = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.fightConfig)[7];
            fightOption._dangerNode0 = new mo.UIImage();
            fightOption._dangerNode1 = new mo.UIImage();
            fightOption._dangerNode2 = new mo.UIImage();
            fightOption._dangerNode3 = new mo.UIImage();
            fightOption._dangerNode4 = new mo.UIImage();
        };
        __egretProto__._removeMovement = function () {
            var self = this, onMixFullMovement = self._onMixFullMovement, fightOption = self._fightOption;
            fightOption._mixFullArm0.removeMovementEvent(onMixFullMovement, self);
            fightOption._mixFullArm1.removeMovementEvent(onMixFullMovement, self);
            fightOption._mixFullArm2.removeMovementEvent(onMixFullMovement, self);
            fightOption._mixFullArm3.removeMovementEvent(onMixFullMovement, self);
            fightOption._mixFullArm4.removeMovementEvent(onMixFullMovement, self);
            fightOption._userFullArm0.removeMovementEvent(onMixFullMovement, self);
            fightOption._userFullArm1.removeMovementEvent(onMixFullMovement, self);
        };
        __egretProto__._onMixFullMovement = function (sender, movementType, movementID) {
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                movementID = mo.trimSpace(movementID);
                if (movementID == uw.Fight.ArmatureName.begin) {
                    sender.play(uw.Fight.ArmatureName.loop);
                }
                if (movementID == uw.Fight.ArmatureName.end) {
                    sender.visible = false;
                    sender.pause();
                }
            }
        };
        __egretProto__._initMixTouch = function () {
            var touch_panel0 = this._fightOption._mixSkillContainer.getWidgetByName("heroItem0").getWidgetByName("touch_panel");
            var touch_panel1 = this._fightOption._mixSkillContainer.getWidgetByName("heroItem1").getWidgetByName("touch_panel");
            var touch_panel2 = this._fightOption._mixSkillContainer.getWidgetByName("heroItem2").getWidgetByName("touch_panel");
            var touch_panel3 = this._fightOption._mixSkillContainer.getWidgetByName("heroItem3").getWidgetByName("touch_panel");
            var touch_panel4 = this._fightOption._mixSkillContainer.getWidgetByName("heroItem4").getWidgetByName("touch_panel");
            //开场模拟不可以点击
            if (!uw.isFightSimulate) {
                touch_panel0.addEventListener(mo.TouchEvent.NODE_BEGIN, this._touchEvent0, this);
                touch_panel1.addEventListener(mo.TouchEvent.NODE_BEGIN, this._touchEvent1, this);
                touch_panel2.addEventListener(mo.TouchEvent.NODE_BEGIN, this._touchEvent2, this);
                touch_panel3.addEventListener(mo.TouchEvent.NODE_BEGIN, this._touchEvent3, this);
                touch_panel4.addEventListener(mo.TouchEvent.NODE_BEGIN, this._touchEvent4, this);
            }
        };
        __egretProto__._removeMixTouch = function () {
            var touch_panel0 = this._fightOption._mixSkillContainer.getWidgetByName("heroItem0").getWidgetByName("touch_panel");
            var touch_panel1 = this._fightOption._mixSkillContainer.getWidgetByName("heroItem1").getWidgetByName("touch_panel");
            var touch_panel2 = this._fightOption._mixSkillContainer.getWidgetByName("heroItem2").getWidgetByName("touch_panel");
            var touch_panel3 = this._fightOption._mixSkillContainer.getWidgetByName("heroItem3").getWidgetByName("touch_panel");
            var touch_panel4 = this._fightOption._mixSkillContainer.getWidgetByName("heroItem4").getWidgetByName("touch_panel");
            touch_panel0.removeEventListener(mo.TouchEvent.NODE_BEGIN, this._touchEvent0, this);
            touch_panel1.removeEventListener(mo.TouchEvent.NODE_BEGIN, this._touchEvent1, this);
            touch_panel2.removeEventListener(mo.TouchEvent.NODE_BEGIN, this._touchEvent2, this);
            touch_panel3.removeEventListener(mo.TouchEvent.NODE_BEGIN, this._touchEvent3, this);
            touch_panel4.removeEventListener(mo.TouchEvent.NODE_BEGIN, this._touchEvent4, this);
        };
        __egretProto__._initUserTouch = function () {
            var touch_panel0 = this._fightOption._userSkillContainer.getWidgetByName("userSkill0");
            var touch_panel1 = this._fightOption._userSkillContainer.getWidgetByName("userSkill1");
            //开场模拟不可以点击
            if (!uw.isFightSimulate) {
                touch_panel0.addEventListener(mo.TouchEvent.NODE_BEGIN, this._touchUserEvent0, this);
                touch_panel1.addEventListener(mo.TouchEvent.NODE_BEGIN, this._touchUserEvent1, this);
            }
        };
        __egretProto__._removeUserTouch = function () {
            var touch_panel0 = this._fightOption._userSkillContainer.getWidgetByName("userSkill0");
            var touch_panel1 = this._fightOption._userSkillContainer.getWidgetByName("userSkill1");
            touch_panel0.removeEventListener(mo.TouchEvent.NODE_BEGIN, this._touchUserEvent0, this);
            touch_panel1.removeEventListener(mo.TouchEvent.NODE_BEGIN, this._touchUserEvent1, this);
        };
        __egretProto__._touchUserEvent0 = function () {
            uw.fightSelfHandSkillCtrl.useUserSkill(0);
        };
        __egretProto__._touchUserEvent1 = function () {
            uw.fightSelfHandSkillCtrl.useUserSkill(1);
        };
        __egretProto__._touchEvent0 = function () {
            uw.fightSelfHandSkillCtrl.useMixSkill(0);
        };
        __egretProto__._touchEvent1 = function () {
            uw.fightSelfHandSkillCtrl.useMixSkill(1);
        };
        __egretProto__._touchEvent2 = function () {
            uw.fightSelfHandSkillCtrl.useMixSkill(2);
        };
        __egretProto__._touchEvent3 = function () {
            uw.fightSelfHandSkillCtrl.useMixSkill(3);
        };
        __egretProto__._touchEvent4 = function () {
            uw.fightSelfHandSkillCtrl.useMixSkill(4);
        };
        __egretProto__._initHandSkillNotice = function (clazz) {
            var self = this;
            self.registerClassByKey(clazz, clazz.ON_DISABLE_AUTO_FIGHT, self.disableAutoFight);
            self.registerClassByKey(clazz, clazz.ON_INIT_MIX_ICON, self.initMixIcon);
            self.registerClassByKey(clazz, clazz.ON_INIT_USER_SKILL_ICON, self.initUserSkillIcon);
        };
        __egretProto__.showStartLayer = function () {
            var startLayer = this.getDelegate().getStartLayer();
            startLayer.showAction();
        };
        __egretProto__._hideBtnContinue = function (isAction) {
            var btnContinue = this._fightOption._btnContinue;
            btnContinue.setTouchEnabled(false);
            if (isAction) {
                var self = this;
                var seq = mo.sequence(mo.fadeOut(0.3), mo.callFunc(function (sender) {
                    sender.stopAllActions();
                    sender.setVisible(false);
                }, self));
                btnContinue.stopAllActions();
                btnContinue.runAction(seq);
            }
            else {
                btnContinue.stopAllActions();
                btnContinue.setVisible(false);
            }
        };
        __egretProto__._showBtnContinue = function () {
            var btnContinue = this._fightOption._btnContinue;
            btnContinue.setOpacity(255);
            btnContinue.setVisible(true);
            btnContinue.setTouchEnabled(true);
            var seq = mo.sequence(mo.moveBy(1, mo.p(-50, 0)), mo.moveBy(1, mo.p(50, 0)));
            btnContinue.stopAllActions();
            btnContinue.runAction(mo.repeatForever(seq));
            //战斗结束后，进入下一波的箭头按钮出现事件触发，引导需要用到 zxj
            var eventType = gEventType.nextRound;
            if (mo.actionDispatcher.willTrigger(eventType)) {
                var event = new mo.Event(eventType);
                mo.actionDispatcher.dispatchEvent(event);
            }
        };
        __egretProto__._menuSkip = function () {
            uw.fightMainCtrl.gameOver(true);
        };
        __egretProto__._menuPause = function () {
            var pauseLayer = uw.FightPauseLayer.create();
            pauseLayer.show();
            uw.fightMainCtrl.pauseFight();
        };
        __egretProto__._menuAutoFight = function () {
            var self = this;
            if (self._fightOption._disableAutoFight) {
                mo.showMsg(uw.id_c_msgCode.pkNoManual);
                return;
            }
            uw.fightSelfHandSkillCtrl.autoFight();
            var isBright = this._fightOption._btnAutoFight.isBright();
            this._fightOption._btnAutoFight.setBright(!isBright);
        };
        __egretProto__.disableAutoFight = function () {
            var self = this;
            self._fightOption._disableAutoFight = true;
            self._fightOption._btnAutoFight.setBright(false);
            self.hidePauseBtn();
        };
        __egretProto__.hideSimulateBtns = function () {
            var self = this;
            self.hideAutoFightBtn();
            self.hideSkipBtn();
            self.hidePauseBtn();
        };
        __egretProto__.hideAutoFightBtn = function () {
            var self = this;
            self._fightOption._btnAutoFight.setVisible(false);
            self._fightOption._btnAutoFight.setTouchEnabled(false);
        };
        __egretProto__.hideSkipBtn = function () {
            var self = this;
            self._fightOption._btnSkip.setTouchEnabled(false);
            self._fightOption._btnSkip.setVisible(false);
        };
        __egretProto__.hidePauseBtn = function () {
            var self = this;
            self._fightOption._btnPause.setTouchEnabled(false);
            self._fightOption._btnPause.setVisible(false);
        };
        __egretProto__._menuContinue = function () {
            this._hideBtnContinue(true);
            uw.fightRoundCtrl.onNextRound();
        };
        /**
         * 设置倒计时
         */
        __egretProto__.setRemainTime = function (time) {
            var time1 = this._formatTime(time);
            this._fightOption._labelTimer.setText(time1);
        };
        __egretProto__._formatTime = function (time) {
            var minute = 0 | time % 3600 / 60;
            var second = 0 | time % 60;
            return (minute < 10 ? "0" + minute.toString() : minute.toString()) + ":" + (second < 10 ? "0" + second.toString() : second.toString());
        };
        /**
         * 设置现在是第几波
         * @param curIndex
         */
        __egretProto__.setCurWaveCount = function (curIndex) {
            var str = (curIndex + 1) + "/" + this._fightOption._totalWaveCount;
            this._fightOption._labelWaveCount.setText(str);
        };
        /**
         * 设置总共有多少波啊
         * @param totalWaveCount
         */
        __egretProto__.setTotalWaveCount = function (totalWaveCount) {
            this._fightOption._totalWaveCount = totalWaveCount;
        };
        /**
         * 设置血量百分比
         * @param percent
         * @param pos
         */
        __egretProto__.setMixSkillHpPercent = function (percent, pos) {
            var self = this;
            var heroItem = self._fightOption._mixSkillContainer.getWidgetByName("heroItem" + pos);
            if (!heroItem || !heroItem.parent)
                return;
            var hpBar = heroItem.getWidgetByName("hpBar");
            hpBar.setPercent(percent);
            var dangerNode = null;
            if (pos == 0) {
                dangerNode = this._fightOption._dangerNode0;
            }
            else if (pos == 1) {
                dangerNode = this._fightOption._dangerNode1;
            }
            else if (pos == 2) {
                dangerNode = this._fightOption._dangerNode2;
            }
            else if (pos == 3) {
                dangerNode = this._fightOption._dangerNode3;
            }
            else if (pos == 4) {
                dangerNode = this._fightOption._dangerNode4;
            }
            if (percent > 0 && percent <= this._fightOption._dangerPercent) {
                if (!dangerNode.parent) {
                    dangerNode.loadTexture(res.ui_fight.cov_redflo_png);
                    heroItem.addChild(dangerNode);
                    dangerNode.zOrder = 999;
                    dangerNode.setPosition(159, 322);
                    dangerNode.setOpacity(100);
                    var action = mo.repeatForever(mo.sequence(mo.fadeTo(0.5, 255), mo.fadeTo(0.5, 100)));
                    dangerNode.stopAllActions();
                    dangerNode.runAction(action);
                }
                dangerNode.visible = true;
            }
            else {
                if (dangerNode.visible) {
                    dangerNode.stopAllActions();
                    dangerNode.visible = false;
                }
            }
            //置灰头像
            var locIconNode = heroItem.getWidgetByName("icon");
            if (percent == 0) {
                locIconNode.setGray(true);
            }
            else {
                locIconNode.setGray(false);
            }
        };
        /**
         * 设置能量百分比
         * @param percent
         * @param pos
         */
        __egretProto__.setMixSkillEnergyPercent = function (percent, pos) {
            var self = this;
            var heroItem = self._fightOption._mixSkillContainer.getWidgetByName("heroItem" + pos);
            var energyBar = heroItem.getWidgetByName("energyBar");
            energyBar.setPercent(percent);
        };
        __egretProto__.setMixCanUse = function (bool, pos) {
            var self = this;
            var heroItem = self._fightOption._mixSkillContainer.getWidgetByName("heroItem" + pos);
            var fullArm = null;
            if (pos == 0) {
                fullArm = this._fightOption._mixFullArm0;
            }
            else if (pos == 1) {
                fullArm = this._fightOption._mixFullArm1;
            }
            else if (pos == 2) {
                fullArm = this._fightOption._mixFullArm2;
            }
            else if (pos == 3) {
                fullArm = this._fightOption._mixFullArm3;
            }
            else if (pos == 4) {
                fullArm = this._fightOption._mixFullArm4;
            }
            var eventType = gEventType.skillLight;
            if (bool) {
                fullArm.resume();
                fullArm.visible = true;
                if (!fullArm.parent) {
                    heroItem.addChild(fullArm);
                    fullArm.zOrder = 999;
                    fullArm.setPosition(157, 137);
                    fullArm.play(uw.Fight.ArmatureName.begin);
                }
                else {
                    fullArm.play(uw.Fight.ArmatureName.begin);
                }
            }
            else {
                if (fullArm.parent) {
                    fullArm.play(uw.Fight.ArmatureName.end);
                }
                eventType = gEventType.skillDark;
            }
            if (mo.actionDispatcher.willTrigger(eventType)) {
                var event = new mo.Event(eventType);
                event.data = { skillBtn: heroItem };
                mo.actionDispatcher.dispatchEvent(event);
            }
        };
        /**
         * 设置技能百分比
         * @param percent
         * @param pos
         */
        __egretProto__.setUserSkillPercent = function (percent, pos) {
            var self = this;
            var userSkillEnergyNode = self._fightOption._userSkillContainer.getWidgetByName("userSkillEnergy" + pos);
            userSkillEnergyNode.setPercent(percent);
        };
        /**
         * 设置技能是否可点击状态
         * @param bool
         * @param pos
         */
        __egretProto__.setUserSkillCanUse = function (bool, pos) {
            var self = this;
            var fullNode = self._fightOption._userSkillContainer.getWidgetByName("userSkillFull" + pos);
            //满光标显示
            if (bool) {
                fullNode.visible = true;
                fullNode.setOpacity(100);
                var action = mo.repeatForever(mo.sequence(mo.fadeTo(0.8, 255), mo.fadeTo(0.8, 100)));
                fullNode.stopAllActions();
                fullNode.runAction(action);
            }
            else if (fullNode.visible == true) {
                fullNode.stopAllActions();
                fullNode.visible = false;
            }
            //可点击动画
            var fullArm = null;
            if (pos == 0) {
                fullArm = this._fightOption._userFullArm0;
            }
            else if (pos == 1) {
                fullArm = this._fightOption._userFullArm1;
            }
            var userSkillNode = self._fightOption._userSkillContainer.getWidgetByName("userSkill" + pos);
            if (bool) {
                fullArm.resume();
                fullArm.visible = true;
                if (!fullArm.parent) {
                    userSkillNode.addChild(fullArm);
                    fullArm.zOrder = 999;
                    fullArm.setPosition(135, 135);
                    fullArm.play(uw.Fight.ArmatureName.begin);
                }
                else {
                    fullArm.play(uw.Fight.ArmatureName.begin);
                }
            }
            else {
                if (fullArm.parent) {
                    fullArm.play(uw.Fight.ArmatureName.end);
                }
            }
        };
        __egretProto__._doDtorNode = function () {
            var fightOption = this._fightOption;
            fightOption._mixFullArm0.doDtor();
            fightOption._mixFullArm1.doDtor();
            fightOption._mixFullArm2.doDtor();
            fightOption._mixFullArm3.doDtor();
            fightOption._mixFullArm4.doDtor();
            fightOption._userFullArm0.doDtor();
            fightOption._userFullArm1.doDtor();
            fightOption._dangerNode0.doDtor();
            fightOption._dangerNode1.doDtor();
            fightOption._dangerNode2.doDtor();
            fightOption._dangerNode3.doDtor();
            fightOption._dangerNode4.doDtor();
        };
        __egretProto__.dtor = function () {
            this._removeMovement();
            this._removeMixTouch();
            this._removeUserTouch();
            this._doDtorNode(); //TODO 这步这里可以去掉了
            this._fightOption.doDtor();
            this._fightOption = null;
            _super.prototype.dtor.call(this);
        };
        FightUILayer.__className = "FightUILayer";
        return FightUILayer;
    })(mo.MenuLayer);
    uw.FightUILayer = FightUILayer;
    FightUILayer.prototype.__class__ = "uw.FightUILayer";
})(uw || (uw = {}));

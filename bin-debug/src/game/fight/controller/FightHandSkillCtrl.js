/**
 * 手动技能控制器
 */
var uw;
(function (uw) {
    var FightHandSkillCtrl = (function (_super) {
        __extends(FightHandSkillCtrl, _super);
        function FightHandSkillCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightHandSkillCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.isAutoFight = false;
            self._isChallenger = false;
            self.allMixSkills = [];
            self.allUserSkills = [];
            self.passiveAllUserSkills = [];
        };
        __egretProto__.initSkill = function () {
            //todo 初始化秘术，英雄技能，需要去区分敌方己方
            //初始化大招，领主技能,对象是FightSkill
            var members = uw.fightMainCtrl.selfFightMembers;
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                this._pushMixSkill(locMember.fightOption.curMixSkill);
            }
            var aSecretSkillIds = uw.userDataCtrl.getSecretSkillIdsByType(uw.fightMainCtrl.fightType);
            for (var i = 0; i < aSecretSkillIds.length; i++) {
                var locSkillId = aSecretSkillIds[i];
                if (!locSkillId)
                    continue;
                var locSkillData = uw.getSkillData(locSkillId, 1);
                var locFightSkill = uw.FightSkill.create(null, locSkillData, this._isChallenger);
                this.pushUserSkill(locFightSkill);
            }
        };
        __egretProto__._pushMixSkill = function (fightSkill) {
            fightSkill.energyType = uw.FightEnergyCtrl.ENERGY_TYPE.MIX;
            this.allMixSkills.push(fightSkill);
            fightSkill.hurtCount = 0;
        };
        __egretProto__.pushUserSkill = function (fightSkill) {
            if (fightSkill.skill && fightSkill.skill.passiveType == 0) {
                if (this.allUserSkills.length == 0) {
                    fightSkill.energyType = uw.FightEnergyCtrl.ENERGY_TYPE.USER0;
                }
                if (this.allUserSkills.length == 1) {
                    fightSkill.energyType = uw.FightEnergyCtrl.ENERGY_TYPE.USER1;
                }
                this.allUserSkills.push(fightSkill);
            }
            else {
                this.passiveAllUserSkills.push(fightSkill);
            }
            fightSkill.hurtCount = 0;
        };
        __egretProto__.resetData = function () {
        };
        // 主要用在死亡移除技能
        __egretProto__.removeMemberSkill = function (member) {
        };
        //填充技能
        __egretProto__.fillSkillSlot = function () {
            //todo 秘术,英雄技能槽初始化
        };
        //使用技能
        __egretProto__.useUserSkill = function (pos) {
            var fightSkill = this.allUserSkills[pos];
            if (!fightSkill)
                return;
            //如果不能使用则不往下走
            if (!fightSkill.isCanUse)
                return;
            if (fightSkill.isUserSkill()) {
                var newFightSkill = uw.FightSkill.create(null, fightSkill.skill, fightSkill.mixIsChallenger);
                uw.FightMixSkillEffectBaseCtrl.create(newFightSkill);
                //消耗能量值
                uw.fightEnergyCtrl.calSkillUseEnergy(this._isChallenger, fightSkill);
                //播放音效
                mo.playSkillAudio(fightSkill.skill.id, false);
            }
            fightSkill.setCanUse(false);
        };
        //使用技能
        __egretProto__.useMixSkill = function (pos) {
            var fightSkill = this.allMixSkills[pos];
            if (!fightSkill)
                return;
            //如果不能使用则不往下走
            if (!fightSkill.isCanUse)
                return;
            uw.fightUtils.log("使用技能位置：", pos);
            var member = fightSkill.member;
            var controller = fightSkill.member.fightOption.curController;
            //播放技能
            var curSkill = member.fightOption.curSkill;
            var newFightSkill = uw.FightSkill.create(member, fightSkill.skill, false);
            if (curSkill)
                newFightSkill.index = curSkill.index;
            member.fightOption.curSkill = newFightSkill;
            controller.playSkillAction();
            //消耗能量值
            uw.fightEnergyCtrl.calSkillUseEnergy(this._isChallenger, fightSkill);
            fightSkill.setCanUse(false);
            if (this._isChallenger) {
                var eventType = gEventType.skillPlayed;
                if (mo.actionDispatcher.willTrigger(eventType)) {
                    var event = new mo.Event(eventType);
                    mo.actionDispatcher.dispatchEvent(event);
                }
            }
        };
        //判断技能是否可以使用
        __egretProto__.checkCanUse = function () {
            var self = this;
            if (uw.fightRoundCtrl.roundStatus == uw.FightRoundCtrl.ROUND_STATUS_OVER)
                return;
            self._checkCanUse(self.allMixSkills);
            self._checkCanUse(self.allUserSkills);
        };
        __egretProto__._checkCanUse = function (skills) {
            for (var i = 0; i < skills.length; i++) {
                var locSkill = skills[i];
                locSkill.checkCanUse(this._isChallenger);
            }
        };
        //关闭所有技能
        __egretProto__.enableAllSkill = function () {
            this._enableSkills(this.allMixSkills);
            this._enableSkills(this.allUserSkills);
        };
        __egretProto__._enableSkills = function (skills) {
            for (var i = 0; i < skills.length; i++) {
                var locSkill = skills[i];
                locSkill.setCanUse(false);
            }
        };
        //自动战斗
        __egretProto__.autoFight = function () {
            this.isAutoFight = !this.isAutoFight;
        };
        //计算自动战斗
        __egretProto__.calAutoFight = function () {
            var self = this;
            //自动放技能
            if (!self.isAutoFight)
                return;
            //所有人进入场景才开始自动放大招
            if (!uw.fightRoundCtrl.isAllMembersEnter)
                return;
            for (var i = 0; i < self.allMixSkills.length; i++) {
                var locSkill = self.allMixSkills[i];
                if (!locSkill.isCanUse)
                    continue;
                self.useMixSkill(i);
            }
            for (var i = 0; i < self.allUserSkills.length; i++) {
                var locSkill = self.allUserSkills[i];
                if (!locSkill.isCanUse)
                    continue;
                self.useUserSkill(i);
            }
        };
        __egretProto__.update = function (dt) {
            var self = this;
            self.calAutoFight();
            uw.fightBiz.checkMixAttackDistance(self.allMixSkills);
            self.checkCanUse();
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            this.allMixSkills.length = 0;
            this.allUserSkills.length = 0;
            this.passiveAllUserSkills.length = 0;
        };
        FightHandSkillCtrl.__className = "FightHandSkillCtrl";
        FightHandSkillCtrl.ON_RANDOM_SKILL = "onRandomSkill";
        FightHandSkillCtrl.ON_FILL_SKILL_SLOT = "onFillSkillSlot";
        FightHandSkillCtrl.ON_RESET_NO_SKILL = "onResetDefaultSkill";
        FightHandSkillCtrl.ON_UPDATE_SKILL_STATUS = "onUpdateSkillStatus";
        FightHandSkillCtrl.ON_INIT_SKILL = "onInitSkill";
        FightHandSkillCtrl.ON_DISABLE_AUTO_FIGHT = "onDisableAutoFight";
        FightHandSkillCtrl.ON_INIT_MIX_ICON = "initMixIcon";
        FightHandSkillCtrl.ON_INIT_USER_SKILL_ICON = "initUserSkillIcon";
        return FightHandSkillCtrl;
    })(mo.DataController);
    uw.FightHandSkillCtrl = FightHandSkillCtrl;
    FightHandSkillCtrl.prototype.__class__ = "uw.FightHandSkillCtrl";
    //己方
    var FightSelfHandSkillCtrl = (function (_super) {
        __extends(FightSelfHandSkillCtrl, _super);
        function FightSelfHandSkillCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightSelfHandSkillCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._isChallenger = true;
        };
        __egretProto__.initSkill = function () {
            var self = this;
            _super.prototype.initSkill.call(this);
            //竞技场，自动战斗
            if (uw.fightMainCtrl.fightType == uw.c_prop.matrixTypeKey.arenaA || uw.fightMainCtrl.fightType == uw.c_prop.matrixTypeKey.mirrorPVPA) {
                self.isAutoFight = true;
                self.pushNotifyAtOnce(self.__class.ON_DISABLE_AUTO_FIGHT, self);
            }
            //初始化大招图标
            var tempIds = [];
            for (var i = 0; i < this.allMixSkills.length; i++) {
                var locFightSkill = this.allMixSkills[i];
                tempIds.push(locFightSkill.member.tempId);
            }
            self.pushNotifyAtOnce(self.__class.ON_INIT_MIX_ICON, tempIds);
            //初始化秘术图标
            var iconArr = [];
            for (var i = 0; i < this.allUserSkills.length; i++) {
                var locFightSkill = this.allUserSkills[i];
                iconArr.push(locFightSkill.skill.icon);
            }
            self.pushNotifyAtOnce(self.__class.ON_INIT_USER_SKILL_ICON, iconArr);
        };
        FightSelfHandSkillCtrl.__className = "FightSelfHandSkillCtrl";
        return FightSelfHandSkillCtrl;
    })(uw.FightHandSkillCtrl);
    uw.FightSelfHandSkillCtrl = FightSelfHandSkillCtrl;
    FightSelfHandSkillCtrl.prototype.__class__ = "uw.FightSelfHandSkillCtrl";
    //对方
    var FightEnemyHandSkillCtrl = (function (_super) {
        __extends(FightEnemyHandSkillCtrl, _super);
        function FightEnemyHandSkillCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightEnemyHandSkillCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.isAutoFight = true;
            this._isChallenger = false;
        };
        __egretProto__.initSkill = function () {
            var self = this;
            self.allMixSkills.length = 0;
            self.allUserSkills.length = 0;
            //初始化大招，领主技能,对象是FightSkill
            var members = uw.fightMainCtrl.enemyFightMembers;
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                if (locMember.fightOption.curMixSkill)
                    this._pushMixSkill(locMember.fightOption.curMixSkill);
            }
            //竞技场和镜像PVP需要秘术
            var matrixType = uw.fightMainCtrl.fightType;
            var enemySecretSkills = [];
            if (matrixType == uw.c_prop.matrixTypeKey.arenaA) {
                enemySecretSkills = uw.arenaDataCtrl.enemySecretSkills || [];
            }
            if (matrixType == uw.c_prop.matrixTypeKey.mirrorPVPA) {
            }
            for (var i = 0; i < enemySecretSkills.length; i++) {
                var locSkillId = enemySecretSkills[i];
                if (!locSkillId)
                    continue;
                var locSkillData = uw.getSkillData(locSkillId, 1);
                var locFightSkill = uw.FightSkill.create(null, locSkillData, this._isChallenger);
                this.pushUserSkill(locFightSkill);
            }
        };
        FightEnemyHandSkillCtrl.__className = "FightEnemyHandSkillCtrl";
        return FightEnemyHandSkillCtrl;
    })(uw.FightHandSkillCtrl);
    uw.FightEnemyHandSkillCtrl = FightEnemyHandSkillCtrl;
    FightEnemyHandSkillCtrl.prototype.__class__ = "uw.FightEnemyHandSkillCtrl";
    //己方模拟战斗
    var SelfSimulateHandSkillCtrl = (function (_super) {
        __extends(SelfSimulateHandSkillCtrl, _super);
        function SelfSimulateHandSkillCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SelfSimulateHandSkillCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._isChallenger = true;
        };
        __egretProto__.initSkill = function () {
            var self = this;
            self.allMixSkills.length = 0;
            self.allUserSkills.length = 0;
            var mainCtrl = uw.fightMainCtrl;
            //初始化大招，领主技能,对象是FightSkill
            var locSkillData3 = uw.getSkillData(uw.fightUtils.getSimulateData(503)[0], 1);
            var locFightSkill3 = uw.FightSkill.create(mainCtrl.m_kuiye, locSkillData3, this._isChallenger);
            locFightSkill3.attackDistance = 10000;
            self._pushMixSkill(locFightSkill3);
            var locSkillData2 = uw.getSkillData(uw.fightUtils.getSimulateData(502)[0], 1);
            var locFightSkill2 = uw.FightSkill.create(mainCtrl.m_xiaozuo, locSkillData2, this._isChallenger);
            locFightSkill2.attackDistance = 10000;
            self._pushMixSkill(locFightSkill2);
            var locSkillData3 = uw.getSkillData(uw.fightUtils.getSimulateData(505)[0], 1);
            var locFightSkill3 = uw.FightSkill.create(mainCtrl.m_safei, locSkillData3, this._isChallenger);
            locFightSkill3.attackDistance = 10000;
            self._pushMixSkill(locFightSkill3);
            var locSkillData3 = uw.getSkillData(uw.fightUtils.getSimulateData(506)[0], 1);
            var locFightSkill3 = uw.FightSkill.create(mainCtrl.m_heiyan, locSkillData3, this._isChallenger);
            locFightSkill3.attackDistance = 10000;
            self._pushMixSkill(locFightSkill3);
            var locSkillData1 = uw.getSkillData(uw.fightUtils.getSimulateData(501)[0], 1);
            var locFightSkill1 = uw.FightSkill.create(mainCtrl.m_majia, locSkillData1, this._isChallenger);
            locFightSkill1.attackDistance = 10000;
            self._pushMixSkill(locFightSkill1);
            //秘术1
            var locSkillData4 = uw.getSkillData(uw.fightUtils.getSimulateData(201), 1);
            var locFightSkill4 = uw.FightSkill.create(null, locSkillData4, this._isChallenger);
            this.pushUserSkill(locFightSkill4);
            //秘术2
            var locSkillData5 = uw.getSkillData(uw.fightUtils.getSimulateData(202), 1);
            var locFightSkill5 = uw.FightSkill.create(null, locSkillData5, this._isChallenger);
            this.pushUserSkill(locFightSkill5);
            //初始化大招图标
            var tempIds = [];
            for (var i = 0; i < this.allMixSkills.length; i++) {
                var locFightSkill = this.allMixSkills[i];
                tempIds.push(locFightSkill.member.tempId);
            }
            self.pushNotifyAtOnce(self.__class.ON_INIT_MIX_ICON, tempIds);
            //初始化秘术图标
            var iconArr = [];
            for (var i = 0; i < this.allUserSkills.length; i++) {
                var locFightSkill = this.allUserSkills[i];
                iconArr.push(locFightSkill.skill.icon);
            }
            self.pushNotifyAtOnce(self.__class.ON_INIT_USER_SKILL_ICON, iconArr);
        };
        SelfSimulateHandSkillCtrl.__className = "SelfSimulateHandSkillCtrl";
        return SelfSimulateHandSkillCtrl;
    })(uw.FightHandSkillCtrl);
    uw.SelfSimulateHandSkillCtrl = SelfSimulateHandSkillCtrl;
    SelfSimulateHandSkillCtrl.prototype.__class__ = "uw.SelfSimulateHandSkillCtrl";
})(uw || (uw = {}));

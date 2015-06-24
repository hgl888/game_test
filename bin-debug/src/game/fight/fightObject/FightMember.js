/**
 * Created by Administrator on 14-7-22.
 */
var uw;
(function (uw) {
    var FightMember = (function (_super) {
        __extends(FightMember, _super);
        function FightMember() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightMember.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.fightOption = new uw._FightMemberOption();
            this.fightOption.curController = uw.FightMemberCtrl.create(this);
            this.isDtor = false;
        };
        //添加技能伤害次数
        __egretProto__.addSkillHurtCount = function (unitId) {
            var dic = this.fightOption.curSkillHurtCountDic;
            dic[unitId] = (dic[unitId] || 0) + 1;
            //去掉多余的，只保留最近5次记录，预防内存越来越大
            if (Object.keys(dic).length > 5) {
                var firstKey;
                for (var key in dic) {
                    if (!firstKey) {
                        firstKey = key;
                        break;
                    }
                }
                delete dic[firstKey];
            }
        };
        //等到技能伤害次数
        __egretProto__.getSkillHurtCount = function (unitId) {
            return this.fightOption.curSkillHurtCountDic[unitId] || 0;
        };
        /**
         * Desc: 初始化当前技能。
         */
        __egretProto__.initCurrSkill = function () {
            var self = this;
            if (self.fightOption.curSkill)
                return;
            var fightSkill, skillIndex;
            //禁止播放技能，比如禁魔等buff
            if (self.fightOption.curLimitSkill) {
                fightSkill = this.fightOption.curNormalSkill;
                if (this.fightOption.curLastSkill)
                    skillIndex = this.fightOption.curLastSkill.index;
            }
            //获取插播技能，比如血量少于多少
            if (!fightSkill)
                fightSkill = self._getInsertSkill();
            //初始技能
            if (!fightSkill)
                fightSkill = self._getDefaultSkill();
            //循环技能
            if (!fightSkill)
                fightSkill = self._getAutoSkill();
            fightSkill.playCount++;
            var newFightSkill = uw.FightSkill.create(this, fightSkill.skill);
            newFightSkill.index = skillIndex || fightSkill.index;
            this.fightOption.curSkill = newFightSkill;
            this.fightOption.curSkill.hurtCount = 0; //
            var skillDisplayTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_skillDisplay, this.fightOption.curSkill.skill.showId);
            uw.fightUtils.log("%s[%s]初始化技能[%s]!initCurrSkill", self.name, this.fightOption.curPos, skillDisplayTemp[uw.t_skillDisplay_name]);
        };
        /**
         * 获取插播的技能
         * @returns {*}
         * @private
         */
        __egretProto__._getInsertSkill = function () {
            var self = this;
            for (var i = 0; i < self.fightOption.curInsertSkills.length; i++) {
                var locFightSkill = self.fightOption.curInsertSkills[i];
                if (locFightSkill.playCount == 0) {
                    //血量少于多少插播技能
                    if (self.hp / self.baseData.hp <= locFightSkill.skill.exValue / 100) {
                        return locFightSkill;
                    }
                }
            }
            return null;
        };
        __egretProto__.resetSkillPlayCount = function () {
            for (var i = 0; i < this.fightOption.curDefaultSkills.length; i++) {
                var locFightSkill = this.fightOption.curDefaultSkills[i];
                locFightSkill.playCount = 0;
            }
            for (var i = 0; i < this.fightOption.curAutoSkills.length; i++) {
                var locFightSkill = this.fightOption.curAutoSkills[i];
                locFightSkill.playCount = 0;
            }
            for (var i = 0; i < this.fightOption.curInsertSkills.length; i++) {
                var locFightSkill = this.fightOption.curInsertSkills[i];
                locFightSkill.playCount = 0;
            }
        };
        __egretProto__._getDefaultSkill = function () {
            for (var i = 0; i < this.fightOption.curDefaultSkills.length; i++) {
                var locFightSkill = this.fightOption.curDefaultSkills[i];
                if (locFightSkill.playCount == 0) {
                    return locFightSkill;
                }
            }
            return null;
        };
        __egretProto__._getAutoSkill = function () {
            //肯定有一个
            var autoSkills = this.fightOption.curAutoSkills, lastSkill = this.fightOption.curLastSkill;
            if (autoSkills.length <= 0)
                return null;
            var skill = null;
            //第一个
            if (lastSkill == null) {
                skill = this.fightOption.curAutoSkills[0];
                return skill;
            }
            //下一个
            var nextIndex = lastSkill.index + 1;
            nextIndex = nextIndex >= autoSkills.length ? 0 : nextIndex;
            skill = this.fightOption.curAutoSkills[nextIndex];
            return skill;
        };
        __egretProto__._pushSkill = function (skills, skill) {
            var fightSkill = uw.FightSkill.create(this, skill);
            fightSkill.index = skills.length;
            skills.push(fightSkill);
        };
        //增加buff
        __egretProto__.addFightBuff = function (fightBuff) {
            this.fightOption.curFightBuffDic[fightBuff.unitId] = fightBuff;
        };
        //移除buff
        __egretProto__.removeFightBuff = function (fightBuff) {
            delete this.fightOption.curFightBuffDic[fightBuff.unitId];
        };
        //判断验证
        __egretProto__.checkLimit = function () {
            var self = this;
            var curBuffLimitAttack = false, curBuffLimitMove = false, curLimitTargetSelect = false, curTargetMiss = false, curLimitSkill = false;
            for (var key in self.fightOption.curFightBuffDic) {
                var locFightBuff = self.fightOption.curFightBuffDic[key];
                var locStateType = locFightBuff.buffData.stateType;
                //晕限制移动，攻击
                if (locStateType == uw.buffStateType.STUN) {
                    curBuffLimitMove = true;
                    curBuffLimitAttack = true;
                }
                //冰冻,限制移动，攻击
                if (locStateType == uw.buffStateType.FREEZE) {
                    curBuffLimitMove = true;
                    curBuffLimitAttack = true;
                }
                //睡眠,限制移动，攻击
                if (locStateType == uw.buffStateType.SLEEP) {
                    curBuffLimitMove = true;
                    curBuffLimitAttack = true;
                }
                //石化,限制移动，攻击
                if (locStateType == uw.buffStateType.SLEEP) {
                    curBuffLimitMove = true;
                    curBuffLimitAttack = true;
                }
                //异次元空间,限制移动，攻击，无法受到伤害，目标丢失
                if (locStateType == uw.buffStateType.SPACE) {
                    curBuffLimitMove = true;
                    curBuffLimitAttack = true;
                    curTargetMiss = true;
                    curLimitTargetSelect = true;
                }
                //定身,限制移动
                if (locStateType == uw.buffStateType.LIMIT_MOVE) {
                    curBuffLimitMove = true;
                }
                //被击退,限制移动，攻击
                if (locStateType == uw.buffStateType.HIT_BACK) {
                    curBuffLimitMove = true;
                    curBuffLimitAttack = true;
                }
                //被升龙击,限制移动，攻击
                if (locStateType == uw.buffStateType.UP_DOWN) {
                    curBuffLimitMove = true;
                    curBuffLimitAttack = true;
                }
                //无敌,限制移动，攻击
                if (locStateType == uw.buffStateType.INVINCIBLE) {
                    curTargetMiss = true;
                    curLimitTargetSelect = true;
                }
                //变乌鸦
                if (locStateType == uw.buffStateType.CROW) {
                    curBuffLimitMove = true;
                    curBuffLimitAttack = true;
                }
                //禁魔
                if (locStateType == uw.buffStateType.SEAL) {
                    curLimitSkill = true;
                }
                //混乱
                if (locStateType == uw.buffStateType.CONFUSION) {
                    curLimitSkill = true;
                }
                //维嘉扩散
                if (locStateType == uw.buffStateType.MOVE_CIRCLE_OUT) {
                    curLimitSkill = true;
                }
            }
            //重生中,限制移动，攻击,失去目标
            if (this.fightOption.curRevivalBuff) {
                curBuffLimitMove = true;
                curLimitTargetSelect = true;
            }
            this.fightOption.curBuffLimitAttack = curBuffLimitAttack;
            this.fightOption.curBuffLimitMove = curBuffLimitMove;
            this.fightOption.curLimitTargetSelect = curLimitTargetSelect;
            this.fightOption.curTargetMiss = curTargetMiss;
            this.fightOption.curLimitSkill = curLimitSkill;
        };
        //是否死亡
        __egretProto__.isDeath = function () {
            return this.fightOption.curStatus == uw.memberStatus.DEATH;
        };
        __egretProto__.initWithBaseData = function (data) {
            var self = this;
            self.baseData = data;
            for (var key in data) {
                var value = data[key];
                if (value instanceof Array) {
                    var tempArr = self[key] = [];
                    for (var i = 0, li = value.length; i < li; i++) {
                        tempArr.push(value[i]);
                    }
                    self[key] = tempArr;
                }
                else {
                    self[key] = value;
                }
            }
            for (var i = 0; i < self.skills.length; i++) {
                var locSkill = self.skills[i];
                if (!locSkill)
                    continue;
                var passiveType = locSkill.passiveType;
                if (passiveType != uw.skillPassiveType.NONE) {
                    self.fightOption.curPassiveSkills.push(uw.FightSkill.create(self, locSkill));
                }
                else {
                    //初始化插入的技能curInsertSkills
                    if (locSkill.actionRule > uw.actionRule.AUTO) {
                        self.fightOption.curInsertSkills.push(uw.FightSkill.create(self, locSkill));
                    }
                }
            }
            var warriorData = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, self.tid);
            //获取初始化技能
            var defaultSkillData = warriorData[uw.t_warrior_defaultSkills];
            for (var i = 0; i < defaultSkillData.length; i++) {
                var locSkillIndex = defaultSkillData[i];
                if (locSkillIndex < 0)
                    continue;
                if (locSkillIndex == 0) {
                    //普通
                    self._pushSkill(self.fightOption.curDefaultSkills, self.normalSkill);
                }
                else {
                    var locSkill = self.skills[locSkillIndex - 1]; //嗯啊，这里要减1
                    if (locSkill) {
                        self._pushSkill(self.fightOption.curDefaultSkills, locSkill);
                    }
                }
            }
            //获取循环技能
            var autoSkillData = warriorData[uw.t_warrior_autoSkills];
            for (var i = 0; i < autoSkillData.length; i++) {
                var locSkillIndex = autoSkillData[i];
                if (locSkillIndex < 0)
                    continue;
                if (locSkillIndex == 0) {
                    //普通
                    self._pushSkill(self.fightOption.curAutoSkills, self.normalSkill);
                }
                else {
                    var locSkill = self.skills[locSkillIndex - 1]; //嗯啊，这里要减1
                    if (locSkill) {
                        self._pushSkill(self.fightOption.curAutoSkills, locSkill);
                    }
                    else {
                        self._pushSkill(self.fightOption.curAutoSkills, self.normalSkill);
                    }
                }
            }
            self.fightOption.curNormalSkill = uw.FightSkill.create(self, self.normalSkill);
            //大招
            if (self.mixSkill)
                self.fightOption.curMixSkill = uw.FightSkill.create(self, self.mixSkill);
        };
        __egretProto__.addEnergy = function (energy) {
            var self = this;
            //死亡不加能量
            if (self.isDeath() && energy > 0)
                return;
            //没有大招加毛啊
            if (!self.fightOption.curMixSkill)
                return;
            uw.fightUtils.log("%s英雄[%s]得到能量：%d", self.fightOption.curIsChallenger ? "己方" : "敌方", self.baseData.name, energy);
            self.fightOption.curEnergy += energy;
            if (self.fightOption.curEnergy < 0) {
                self.fightOption.curEnergy = 0;
            }
            else if (self.fightOption.curEnergy > self.fightOption.curMixSkill.skill.energyNeed) {
                self.fightOption.curEnergy = self.fightOption.curMixSkill.skill.energyNeed;
            }
            uw.fightHeroEnergyCtrl.setUpdateMember(self);
        };
        __egretProto__.removeDisplay = function () {
        };
        __egretProto__.death = function (fromMember) {
            var self = this;
            if (self.fightOption.curStatus == uw.memberStatus.DEATH)
                return;
            self.fightOption.curStatus = uw.memberStatus.DEATH;
            //清除状态
            self.clearMemberStatus();
            //只有被副本技能杀死时，fromMember的值为空
            if (self.fightOption.curIsClone) {
                //如果是分身直接移除
                var group = null, members = null, mainCtrl = uw.fightMainCtrl;
                if (!fromMember || fromMember.fightOption.curIsChallenger) {
                    group = mainCtrl.selfGroup;
                    members = mainCtrl.selfFightMembers;
                }
                else {
                    var round = uw.fightRoundCtrl.round;
                    group = mainCtrl.enemyGroups[round];
                    members = mainCtrl.enemyFightMembers;
                }
                self.fightOption.curController.display.removeFromParent();
                mo.ArrayRemoveObject(members, self);
                mo.ArrayRemoveObject(mainCtrl.allFightMembers, self);
                mo.ArrayRemoveObject(group.members, self);
            }
            else {
                //击杀奖励200能量
                uw.fightBiz.killPrize(fromMember, self);
                uw.passiveSkillBiz.calEveryDeath(self);
            }
            uw.fightUtils.log("%s[%d]死亡", self.name, self.fightOption.curPos);
            if (self.fightOption.curIsChallenger) {
                uw.fightSelfHandSkillCtrl.removeMemberSkill(self); //手动技能移除
            }
            else {
                uw.fightEnemyHandSkillCtrl.removeMemberSkill(self); //手动技能移除
            }
            self.fightOption.curGroup.liveNum--;
            //死亡后额外技能释放
            uw.fightBiz.deathCalSkill(self);
            //死亡置能量为0
            this.addEnergy(-999999);
        };
        //清除各种状态
        __egretProto__.clearMemberStatus = function () {
            uw.passiveSkillBiz.removeHalo(this); //移除被动光环影响
            uw.fightActionPauseCtrl.removeMember(this); //从暂停中移除
            uw.buffBiz.clearDeathMemberBuff(this); //移除死亡必须移除的buff
            uw.fightActionManager.removeActionByMember(this);
            this.fightOption.curIsInFightArea = false;
        };
        /**
         * 通过读取hero实例数据或者怪物模板数据创建FightMember数据
         * @param data
         * @param heroType  0:英雄，1：怪物
         * @param curPos 站位
         */
        FightMember.create = function (data, heroType, curPos) {
            var member = new FightMember();
            member.fightOption.curHeroType = heroType;
            member.fightOption.curPos = parseInt(curPos);
            var baseData = null;
            //假如英雄
            if (heroType == uw.memberType.HERO) {
                baseData = uw.FightUtils.getInstance().convertHeroDataToFightData(data);
                member.initWithBaseData(baseData);
                //计算自身属性
                var heroTemp = uw.getHeroTempData(member.tempId);
                member.fightOption.curSelfProp = uw.calHeroSelfProps(member, heroTemp, member.fightOption.curSelfProp);
            }
            else {
                baseData = uw.FightUtils.getInstance().convertMonsterDataToFightData(data);
                member.initWithBaseData(baseData);
                //计算自身属性
                member.fightOption.curSelfProp = uw.calHeroSelfProps(member, member.baseData, member.fightOption.curSelfProp);
            }
            var warriorTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, member.baseData.tid);
            member.fightOption.curBestDistance = warriorTemp[uw.t_warrior_bestDistance] || 2;
            member.addEnergy(member.energy);
            return member;
        };
        /**
         * 复制一个成员
         * @param cloneMember
         * @param perValue 攻击和防御百分比,小数点
         * @param pos
         */
        FightMember.clone = function (cloneMember, perValue, pos) {
            var member = new FightMember();
            member.fightOption.curHeroType = cloneMember.fightOption.curHeroType;
            member.fightOption.curPos = parseInt(pos);
            member.fightOption.curIsClone = true;
            member.fightOption.curSelfProp = cloneMember.fightOption.curSelfProp;
            member.fightOption.curBestDistance = cloneMember.fightOption.curBestDistance;
            var baseData = {};
            for (var key in cloneMember.baseData) {
                var locValue = cloneMember.baseData[key];
                baseData[key] = locValue;
            }
            //只有普技能
            baseData.skills = [];
            baseData.mixSkill = null;
            member.initWithBaseData(baseData);
            //战斗力，防御百分比
            member.pAttack *= perValue;
            member.pDefence *= perValue;
            member.mAttack *= perValue;
            member.mDefence *= perValue;
            //血量保持一样
            member.hp = cloneMember.hp;
            return member;
        };
        //以下是属性
        __egretProto__.dtor = function () {
            this.isDtor = true;
            this.fightOption.doDtor();
            this.fightOption = null;
            _super.prototype.dtor.call(this);
        };
        return FightMember;
    })(mo.Class);
    uw.FightMember = FightMember;
    FightMember.prototype.__class__ = "uw.FightMember";
})(uw || (uw = {}));

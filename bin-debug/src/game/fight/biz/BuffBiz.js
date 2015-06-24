/**
 * Created by Administrator on 14-7-22.
 */
var uw;
(function (uw) {
    var buffBiz;
    (function (buffBiz) {
        //测试用啦
        function testBuffEffect(buffId, isChallenger) {
            var locBuffId = buffId;
            var buffData = uw.getBuffData(locBuffId, 1); //
            var curMember = uw.fightMainCtrl.selfFightMembers[0];
            var enemy = curMember;
            if (!isChallenger) {
                curMember = uw.fightMainCtrl.enemyFightMembers[0];
                enemy = uw.fightMainCtrl.enemyFightMembers[0];
            }
            this.addBuffToMember(curMember, enemy, buffData, false);
        }
        buffBiz.testBuffEffect = testBuffEffect;
        //计算buff
        function calSkillAfter(curMember, targetMembers, fightSkill) {
            this.calAddBuff(curMember, targetMembers, fightSkill.skill, false);
        }
        buffBiz.calSkillAfter = calSkillAfter;
        /**
         * 添加buff
         * @param curMember
         * @param targetMembers
         * @param skillData
         * @param isCopy
         */
        function calAddBuff(curMember, targetMembers, skillData, isCopy) {
            for (var i = 0; i < targetMembers.length; i++) {
                var locTarget = targetMembers[i];
                var buffs = this.getHitBuffs(locTarget, skillData);
                for (var j = 0; j < buffs.length; j++) {
                    var locBuff = buffs[j];
                    this.addBuffToMember(curMember, locTarget, locBuff, isCopy);
                }
            }
        }
        buffBiz.calAddBuff = calAddBuff;
        /**
         * 根据概率获取技能命中
         * @param target
         * @param skillData
         * @returns {Array}
         */
        function getHitBuffs(target, skillData) {
            var hitBuffs = [];
            var buffs = skillData.buffs;
            //-1是随机一个
            var buffTrigger = skillData.buffTrigger[0];
            if (buffTrigger == -1) {
                var buffData = uw.fightUtils.getRandomOne(buffs);
                if (buffData)
                    hitBuffs.push(buffData);
            }
            else {
                for (var i = 0; i < buffs.length; i++) {
                    var locBuffData = buffs[i];
                    if (!locBuffData)
                        continue;
                    //英雄等级低于命中等级，则直接命中
                    if (target.lvl <= skillData.buffNeedLvl) {
                        hitBuffs.push(locBuffData);
                        continue;
                    }
                    if (target.isDeath()) {
                        //一叽咕闪现死亡继续触发
                        if (locBuffData.stateType != uw.buffStateType.TELEPORT) {
                            continue;
                        }
                    }
                    var locRandom = Math.random() * 10000;
                    var buffTrigger = skillData.buffTrigger[i];
                    if (locRandom < buffTrigger) {
                        hitBuffs.push(locBuffData);
                    }
                }
            }
            return hitBuffs;
        }
        buffBiz.getHitBuffs = getHitBuffs;
        /**
         * 直接给目标添加buff
         * @param curMember
         * @param locTarget
         * @param buffData
         * @param isCopy
         */
        function addBuffToMember(curMember, locTarget, buffData, isCopy) {
            //模拟战斗不计算buff
            if (uw.isFightSimulate)
                return;
            if (locTarget.isDeath())
                return;
            //魔免中，来自负面的buff不会中buff
            var re_m = this.getBuffByStateType(locTarget, uw.buffStateType.RE_M_ATTACK);
            if (!re_m)
                re_m = this.getBuffByStateType(locTarget, uw.buffStateType.RE_M_ATTACK_HURT);
            var side = buffData.side;
            if (re_m && side == uw.buffSide.NEGATIVE) {
                return;
            }
            var locContinueType = this.getContinueType(buffData);
            var locFightBuffDic = locTarget.fightOption.curFightBuffDic;
            var locSameFightBuff = this.getSameFightBuff(locFightBuffDic, buffData);
            if (!locSameFightBuff || isCopy) {
                uw.FightBuff.create(curMember, locTarget, buffData, locContinueType, isCopy);
            }
            else {
                uw.fightUtils.log("替换同一个的buff");
                locSameFightBuff.controller.removeBuff();
                uw.FightBuff.create(curMember, locTarget, buffData, locContinueType, isCopy);
            }
        }
        buffBiz.addBuffToMember = addBuffToMember;
        //获取持续类型
        function getContinueType(buffData) {
            var conNum = buffData.conNum;
            var interval = buffData.interval;
            var conTime = buffData.conTime;
            if (conTime > 0) {
                return uw.buffContinueType.TIME;
            }
            if (conNum > 0 && interval > 0) {
                return uw.buffContinueType.INTERVAL;
            }
            if (conNum > 0 && interval == 0) {
                return uw.buffContinueType.NUM;
            }
            return -1;
        }
        buffBiz.getContinueType = getContinueType;
        /**
         * 判断概率
         * @param member
         * @param skillData
         * @returns {boolean}
         */
        function checkBuffTrigger(member, skillData, index) {
            if (member.lvl <= skillData.buffNeedLvl) {
                return true;
            }
            var locRandom = Math.random() * 10000;
            var buffTrigger = skillData.buffTrigger[index];
            if (locRandom < buffTrigger) {
                return true;
            }
            return false;
        }
        buffBiz.checkBuffTrigger = checkBuffTrigger;
        function calValue(valueType, value, propValue) {
            return this._calValue(valueType, value, propValue, true);
        }
        buffBiz.calValue = calValue;
        //计算值
        function _calValue(valueType, value, propValue, isPareInt) {
            var locValue = 0;
            switch (valueType) {
                case uw.buffValueType.FIX:
                    locValue = value;
                    break;
                case uw.buffValueType.PER:
                    locValue = value * propValue / 10000;
                    break;
                default:
                    locValue = value;
                    break;
            }
            if (isPareInt)
                locValue = parseInt(locValue.toString());
            return locValue;
        }
        buffBiz._calValue = _calValue;
        //计算值
        function calValueNotInt(valueType, value, propValue) {
            return this._calValue(valueType, value, propValue, false);
        }
        buffBiz.calValueNotInt = calValueNotInt;
        //获取属性key
        function getPropKeyByEffectType(member, effectType) {
            var curKey = null;
            var buffEffectTypeKey = uw.c_prop.buffEffectTypeKey;
            for (var key in buffEffectTypeKey) {
                var locValue = buffEffectTypeKey[key];
                if (locValue == effectType) {
                    curKey = key;
                    break;
                }
            }
            return curKey;
        }
        buffBiz.getPropKeyByEffectType = getPropKeyByEffectType;
        //获取同id的buff
        function getSameFightBuff(fightBuffDic, buffData) {
            //替换同类的buff
            var sameFightBuff = null;
            for (var key in fightBuffDic) {
                var locFightBuff = fightBuffDic[key];
                if (locFightBuff.buffData.id == buffData.id) {
                    sameFightBuff = locFightBuff;
                }
            }
            return sameFightBuff;
        }
        buffBiz.getSameFightBuff = getSameFightBuff;
        //移除所有buff
        function clearMemberBuff(member) {
            for (var key in member.fightOption.curFightBuffDic) {
                var fightBuff = member.fightOption.curFightBuffDic[key];
                fightBuff.controller.removeBuff();
            }
        }
        buffBiz.clearMemberBuff = clearMemberBuff;
        //移除死亡必须移除的buff
        function clearDeathMemberBuff(member) {
            for (var key in member.fightOption.curFightBuffDic) {
                var fightBuff = member.fightOption.curFightBuffDic[key];
                if (fightBuff.controller.isDeathRemove) {
                    fightBuff.controller.removeBuff();
                }
            }
        }
        buffBiz.clearDeathMemberBuff = clearDeathMemberBuff;
        //伤害前需要计算的buff
        function calAttack(curActor, target, fightSkill) {
            var isIgnoreDefence = false;
            var skillData = fightSkill.skill;
            var buffs = skillData.buffs;
            for (var i = 0; i < buffs.length; i++) {
                var locBuffData = buffs[i];
                if (!locBuffData)
                    continue;
                var stateType = locBuffData.stateType;
                switch (stateType) {
                    case uw.buffStateType.IGNORE_DEFENCE:
                        if (!this.checkBuffTrigger(target, skillData, i))
                            break;
                        isIgnoreDefence = true;
                        uw.fightUtils.log("Buff破防,name:%s", target.name);
                        break;
                }
            }
            return [isIgnoreDefence];
        }
        buffBiz.calAttack = calAttack;
        //受击时需要计算的buff
        function calHit(curActor, target, hurt, fightSkill) {
            if (!curActor)
                return hurt;
            for (var key in target.fightOption.curFightBuffDic) {
                var fightBuff = target.fightOption.curFightBuffDic[key];
                var locBuffData = fightBuff.buffData;
                switch (locBuffData.stateType) {
                    case uw.buffStateType.ABS_P_HURT:
                    case uw.buffStateType.ABS_M_HURT:
                    case uw.buffStateType.RE_P_ATTACK:
                    case uw.buffStateType.RE_M_ATTACK:
                    case uw.buffStateType.RE_P_ATTACK_HURT:
                    case uw.buffStateType.RE_M_ATTACK_HURT:
                    case uw.buffStateType.RE_P_ATTACK_HURT_M_ATTACK_HURT:
                        hurt = fightBuff.controller.hit(curActor, hurt, fightSkill);
                        break;
                    case uw.buffStateType.SHARE_HP:
                        if (curActor)
                            hurt = fightBuff.controller.hit(curActor, hurt, fightSkill);
                        break;
                    case uw.buffStateType.REBOUND_HURT:
                        if (curActor)
                            fightBuff.controller.hit(curActor, hurt, fightSkill);
                        break;
                }
            }
            if (curActor) {
                for (var key in curActor.fightOption.curFightBuffDic) {
                    var fightBuff = curActor.fightOption.curFightBuffDic[key];
                    var locBuffData = fightBuff.buffData;
                    switch (locBuffData.stateType) {
                        case uw.buffStateType.ATTACK_REBOUND_HURT:
                            fightBuff.controller.hit(curActor, hurt);
                            break;
                    }
                }
            }
            return hurt;
        }
        buffBiz.calHit = calHit;
        //释放技能前需要计算的buff
        function calSkillBefore(curActor, target, hurt) {
            for (var key in target.fightOption.curFightBuffDic) {
                var fightBuff = target.fightOption.curFightBuffDic[key];
                var locBuffData = fightBuff.buffData;
                switch (locBuffData.stateType) {
                    case uw.buffStateType.SEAL:
                        //沉默
                        hurt = fightBuff.controller.skillBefore(hurt);
                        break;
                }
            }
            return hurt;
        }
        buffBiz.calSkillBefore = calSkillBefore;
        /**
         * 获取某种状态
         * @param member
         * @param stateType
         */
        function getBuffByStateType(member, stateType) {
            for (var key in member.fightOption.curFightBuffDic) {
                var fightBuff = member.fightOption.curFightBuffDic[key];
                if (fightBuff.buffData.stateType == stateType) {
                    return fightBuff;
                }
            }
            return null;
        }
        buffBiz.getBuffByStateType = getBuffByStateType;
        /**
         * 计算是否变身
         * @param member
         */
        function calChangeBody(member) {
            var fightBuff = this.getBuffByStateType(member, uw.buffStateType.CHANGE_BODY);
            if (fightBuff) {
                member.fightOption.curController.display.setChangeBody(true);
            }
            else {
                member.fightOption.curController.display.setChangeBody(false);
            }
        }
        buffBiz.calChangeBody = calChangeBody;
    })(buffBiz = uw.buffBiz || (uw.buffBiz = {}));
})(uw || (uw = {}));

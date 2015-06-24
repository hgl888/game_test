/**
 * Created by Administrator on 14-7-22.
 */
var uw;
(function (uw) {
    var skillBiz;
    (function (skillBiz) {
        //寻找目标并且计算技能伤害
        function findTargetAndCalSkill(fightMember, target, fightSkill) {
            if (!fightSkill)
                return;
            var targets = uw.targetBiz.find(fightMember.fightOption.curIsChallenger, fightMember, target, fightSkill);
            this.calSkill(fightMember, targets, fightSkill);
            //特殊计算额外技能
            //如果是手术空间1,则计算手术空间2
            if (fightSkill.skill.id == uw.fixSkillId.ID_30200) {
                var skill2 = uw.getSkillData(uw.fixSkillId.ID_30800, fightSkill.skill.lvl + fightMember.skillLvl);
                var fSkill2 = uw.FightSkill.create(fightMember, skill2, false);
                uw.skillBiz.findTargetAndCalSkill(fightMember, target, fSkill2);
            }
        }
        skillBiz.findTargetAndCalSkill = findTargetAndCalSkill;
        //计算技能效果
        function calSkill(fightMember, targets, fightSkill) {
            if (!fightSkill)
                return;
            //过滤多段攻击
            targets = this.calHurtCount(targets, fightSkill);
            //过滤未命中
            targets = this.calMiss(fightMember, targets, fightSkill);
            for (var i = 0; i < targets.length; i++) {
                var locTarget = targets[i];
                if (!locTarget || locTarget.isDeath())
                    continue;
                //攻击时触发被动buff
                uw.passiveSkillBiz.cal(fightMember, locTarget, uw.skillPassiveType.ATTACK);
                uw.fightUtils.log("");
                uw.fightUtils.log("calSkill start -------------------------------------------------------------------------");
                uw.fightUtils.log("skill[%s],attack member[%s],target[%s] ", fightSkill.skill.name, fightMember.name, locTarget.name);
                if (fightSkill.skill.targetType == uw.skillTargetType.ENEMY) {
                    //假如敌对方，造成伤害
                    var hurtData = this.calHurt(fightMember, locTarget, fightSkill);
                    var hurt = hurtData[0], isCrit = hurtData[1];
                    if (hurt > 0) {
                        locTarget.fightOption.curController.calHp(-hurt, fightMember, isCrit);
                        fightMember.curOutHurt += hurt;
                        this.calSuckBlood(fightMember, hurt);
                        //被攻击时触发被动buff
                        uw.passiveSkillBiz.cal(locTarget, fightMember, uw.skillPassiveType.HIT);
                    }
                    this.calSkillHitEffect(locTarget, fightSkill);
                    uw.fightEnergyCtrl.calHitReplayEnergy(locTarget, hurt);
                }
                else {
                    //回血
                    var hp = this.calReplayHp(fightMember, locTarget, fightSkill);
                    if (hp > 0) {
                        locTarget.fightOption.curController.calHp(hp, fightMember);
                    }
                }
                uw.fightUtils.log("calSkill end -------------------------------------------------------------------------");
                uw.fightUtils.log("");
            }
            //buff触发
            uw.buffBiz.calSkillAfter(fightMember, targets, fightSkill);
            //计算伤害恢复能量值值
            fightSkill.hurtCount++;
        }
        skillBiz.calSkill = calSkill;
        //计算闪避
        function calMiss(fightMember, targets, fightSkill) {
            var reTargets = [];
            //如果被致盲,并且是普通攻击,全部闪避
            var blindBuff = uw.buffBiz.getBuffByStateType(fightMember, uw.buffStateType.BLIND);
            if (blindBuff && fightSkill.skillDisplay[uw.t_skillDisplay_type] == uw.skillDisplayType.NORMAL) {
                for (var i = 0; i < targets.length; i++) {
                    var locTarget = targets[i];
                    if (!locTarget || locTarget.isDeath())
                        continue;
                    uw.fightUtils.log("闪避,name:%s", locTarget.name);
                    var display = locTarget.fightOption.curController.display;
                    uw.FightShowBuffText.create(display, uw.FightShowBuffText.dodge);
                }
                return reTargets;
            }
            for (var i = 0; i < targets.length; i++) {
                var locTarget = targets[i];
                if (!locTarget || locTarget.isDeath())
                    continue;
                var random = Math.random();
                var isHit = random < uw.calHitRate(fightMember.hit, locTarget.reHit);
                if (fightMember.fightOption.curIsChallenger == locTarget.fightOption.curIsChallenger)
                    isHit = true;
                if (isHit) {
                    reTargets.push(locTarget);
                }
                else {
                    uw.fightUtils.log("闪避,name:%s", locTarget.name);
                    var display = locTarget.fightOption.curController.display;
                    uw.FightShowBuffText.create(display, uw.FightShowBuffText.dodge);
                    //闪避触发被动buff
                    uw.passiveSkillBiz.cal(fightMember, locTarget, uw.skillPassiveType.MISS);
                }
            }
            return reTargets;
        }
        skillBiz.calMiss = calMiss;
        //计算多段
        function calHurtCount(targets, fightSkill) {
            var reTargets = [];
            for (var i = 0; i < targets.length; i++) {
                var locTarget = targets[i];
                if (!locTarget || locTarget.isDeath())
                    continue;
                var hurtCount = locTarget.getSkillHurtCount(fightSkill.unitId);
                var hurtNum = fightSkill.skillDisplay[uw.t_skillDisplay_number];
                //受伤超过或等于多段攻击
                if (hurtCount >= hurtNum)
                    continue;
                locTarget.addSkillHurtCount(fightSkill.unitId);
                reTargets.push(locTarget);
            }
            return reTargets;
        }
        skillBiz.calHurtCount = calHurtCount;
        //计算吸血
        function calSuckBlood(fightMember, hurt) {
            if (fightMember.suckBlood <= 0)
                return;
            var hp = fightMember.suckBlood * hurt / 100;
            if (hp > 0) {
                fightMember.fightOption.curController.calHp(hp, fightMember);
            }
        }
        skillBiz.calSuckBlood = calSuckBlood;
        /**
         * 计算受击特效
         * @param targetMember
         * @param fightSkill
         */
        function calSkillHitEffect(targetMember, fightSkill) {
            var self = this;
            var fxHit = fightSkill.skillDisplay[uw.t_skillDisplay_fxHit]; //特效名字
            if (!fxHit)
                return;
            var fxEmmitor1 = fightSkill.skillDisplay[uw.t_skillDisplay_fxEmmitor1]; //特效挂接点
            var mainLayer = uw.fightScene.getMainLayer();
            var display = targetMember.fightOption.curController.display;
            var pos = uw.fightUtils.getFixBodyPos(targetMember, fxEmmitor1);
            var skillEffectNode = uw.effectArmFactory.attachDynamicNodeTo4Recycle(mainLayer, fxHit, null, function (sender) {
                sender.setMovementEventCallFunc(this._skillMovementEvent, uw.skillBiz);
                sender.setFrameEventCallFunc(this._skillFrameEvent, uw.skillBiz);
                sender.playWithIndex(0);
            }, self);
            skillEffectNode.x = pos.x;
            skillEffectNode.y = pos.y;
            skillEffectNode.zOrder = display.zOrder + 1;
            if (fightSkill.member) {
                if (fightSkill.member.fightOption.curController.isFaceLeft) {
                    skillEffectNode.scaleX = -1;
                }
                else {
                    skillEffectNode.scaleX = 1;
                }
            }
            else {
                if (!fightSkill.mixIsChallenger) {
                    skillEffectNode.scaleX = -1;
                }
                else {
                    skillEffectNode.scaleX = 1;
                }
            }
            skillEffectNode.scaleY = 1;
        }
        skillBiz.calSkillHitEffect = calSkillHitEffect;
        function _skillMovementEvent(armature, movementType, movementID) {
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                armature.removeFromParent();
            }
        }
        skillBiz._skillMovementEvent = _skillMovementEvent;
        function _skillFrameEvent(display, evt, originFrameIndex, currentFrameIndex) {
            if (evt == uw.Fight.HeroEvent.shake) {
                //震屏
                uw.fightUtils.shakeEffect();
            }
        }
        skillBiz._skillFrameEvent = _skillFrameEvent;
        /**
         * 根据当前技能计算伤害
         * @param curActor
         * @param target
         * @param fightSkill
         * @returns {number}
         */
        function calHurt(curActor, target, fightSkill) {
            var hurt = 0, skillData = fightSkill.skill, skillDisplay = fightSkill.skillDisplay;
            var isCrit = false, targetPDefence = target.pDefence, targetMDefence = target.mDefence, curPAttack = 0, curPAttackMult = 0, curMAttack = 0, curMAttackMult = 0;
            //curActor为空则是秘术,秘术不会闪避不会破防，可以免疫
            if (curActor) {
                //物攻魔攻
                curPAttack = curActor.pAttack;
                curPAttackMult = curActor.pAttackMult;
                curMAttack = curActor.mAttack;
                curMAttackMult = curActor.mAttackMult;
                //计算暴击
                isCrit = Math.random() < uw.calCrit(curActor.crit, target.reCrit, curActor.baseData.crit, target.baseData.reCrit);
                if (isCrit) {
                    uw.fightUtils.log("暴击！");
                    var display = target.fightOption.curController.display;
                    uw.FightShowBuffText.create(display, uw.FightShowBuffText.crit);
                    //暴击触发被动buff
                    uw.passiveSkillBiz.cal(curActor, target, uw.skillPassiveType.CRIT);
                }
                //计算buff
                var aRet = uw.buffBiz.calAttack(curActor, target, fightSkill);
                var isIgnoreDefence = aRet[0];
                if (!isIgnoreDefence) {
                    //属性破防
                    isIgnoreDefence = Math.random() * 100 < curActor.ignoreDefence;
                    if (isIgnoreDefence) {
                        uw.fightUtils.log("属性破防,name:%s", target.name);
                    }
                }
                //破防
                if (isIgnoreDefence) {
                    targetPDefence = targetMDefence = 0;
                    var display = target.fightOption.curController.display;
                    uw.FightShowBuffText.create(display, uw.FightShowBuffText.armorbroke);
                }
            }
            //多段
            var percentValue = skillData.percentValue, addValue = skillData.addValue, skillType = skillData.skillType;
            var hurtNumber = target.getSkillHurtCount(fightSkill.unitId);
            var numberHurt = skillDisplay[uw.t_skillDisplay_numberHurts][hurtNumber - 1];
            if (numberHurt == null) {
                uw.warn("t_skillDisplay[id:%d]伤害[%s]和段数[%d]不符合啊！亲", skillDisplay[uw.t_skillDisplay_id], skillDisplay[uw.t_skillDisplay_numberHurts], skillDisplay[uw.t_skillDisplay_number]);
                return [0, false];
            }
            percentValue = percentValue * numberHurt;
            addValue = addValue * numberHurt;
            if (percentValue != 0 || addValue != 0) {
                //计算技能伤害
                if (skillType == uw.skillType.PATTACK) {
                    uw.fightUtils.log("pAttack:%s,pAttackMult:%s,(enemy)pDefence:%s,(enemy)pDefenceMult:%s,percentValue:%s,isCrit:%s,addValue:%s", curPAttack, curPAttackMult, targetPDefence, target.pDefenceMult, percentValue, isCrit, addValue);
                    hurt = uw.calPHurt(curPAttack, curPAttackMult, targetPDefence, target.pDefenceMult, percentValue, isCrit ? 1 : 0, addValue, 0);
                    uw.fightUtils.log("calPHurt:%s", hurt);
                }
                else if (skillType == uw.skillType.MATTACK || skillType == uw.skillType.HOLY) {
                    uw.fightUtils.log("mAttack:%s,mAttackMult:%s,(enemy)mDefence:%s,(enemy)mDefenceMult:%s,percentValue:%s,isCrit:%s,addValue:%s", curMAttack, curMAttackMult, targetMDefence, target.mDefenceMult, percentValue, isCrit, addValue);
                    hurt = uw.calMHurt(curMAttack, curMAttackMult, targetMDefence, target.mDefenceMult, percentValue, isCrit ? 1 : 0, addValue, 0);
                    uw.fightUtils.log("calMHurt:%s", hurt);
                }
                //特殊处理
                //爆碎牙瞬杀
                if (fightSkill.skill.id == uw.fixSkillId.ID_34000) {
                    //按照预动作施法时间计算伤害
                    var exValue = fightSkill.skill.exValue.split(",");
                    var minPer = parseFloat(exValue[0]), countTime = exValue[1];
                    var perTime = fightSkill.prepareTime / countTime;
                    perTime = Math.max(minPer, perTime);
                    perTime = Math.min(1, perTime);
                    uw.fightUtils.log("爆碎牙瞬杀持续百分比:", perTime);
                    hurt = hurt * perTime;
                }
            }
            if (curActor) {
                //计算属性伤害
                var propHurt = this.calPropHurt(curActor, target, skillData);
                uw.fightUtils.log("calPropHurt:%s", propHurt);
                hurt += propHurt;
            }
            //buff计算
            hurt = uw.buffBiz.calHit(curActor, target, hurt, fightSkill);
            return [hurt, isCrit];
        }
        skillBiz.calHurt = calHurt;
        //计算属性伤害
        function calPropHurt(curActor, target, skill) {
            /*
             1：（攻击方力量 - 防御方力量）* 系数：calSpHurtForPower1
             2： 攻击方力量 * 系数:calSpHurtForPower2
             3：（攻击方智力 - 防御方智力）* 系数:calSpHurtForIntel1
             4： 攻击方智力 * 系数:calSpHurtForIntel2
             */
            var hurt = 0, propHurtType = skill.propHurtType, propHurtMult = skill.propHurtMult;
            switch (propHurtType) {
                case 1:
                    hurt = uw.calSpHurtForPower1(curActor.power, target.power, propHurtMult);
                    break;
                case 2:
                    hurt = uw.calSpHurtForPower2(curActor.power, propHurtMult);
                    break;
                case 3:
                    hurt = uw.calSpHurtForIntel1(curActor.intel, target.intel, propHurtMult);
                    break;
                case 4:
                    hurt = uw.calSpHurtForIntel2(curActor.intel, propHurtMult);
                    break;
            }
            hurt = parseInt(hurt.toString());
            return hurt;
        }
        skillBiz.calPropHurt = calPropHurt;
        /**
         * 计算回血
         * @param curActor
         * @param target
         * @param fightSkill
         * @returns {*}
         */
        function calReplayHp(curActor, target, fightSkill) {
            var skill = fightSkill.skill, skillDisplay = fightSkill.skillDisplay;
            var percentValue = skill.percentValue, addValue = skill.addValue;
            var hurtNumber = target.getSkillHurtCount(fightSkill.unitId);
            var numberHurt = skillDisplay[uw.t_skillDisplay_numberHurts][hurtNumber - 1];
            if (numberHurt == null) {
                uw.warn("t_skillDisplay[id:%d]伤害[%s]和段数[%d]不符合啊！亲", skillDisplay[uw.t_skillDisplay_id], skillDisplay[uw.t_skillDisplay_numberHurts], skillDisplay[uw.t_skillDisplay_number]);
                return 0;
            }
            percentValue = percentValue * numberHurt;
            addValue = addValue * numberHurt;
            var mAttack = 0, mAttackMult = 0;
            if (curActor) {
                mAttack = curActor.mAttack;
                mAttackMult = curActor.mAttackMult;
            }
            if (percentValue != 0 || addValue != 0) {
                uw.fightUtils.log("mAttack:%s,mAttackMult:%s,(enemy)mDefence:%s,(enemy)mDefenceMult:%s,percentValue:%s,isCrit:%s,addValue:%s", mAttack, mAttackMult, target.mDefence, target.mDefenceMult, percentValue, 0, addValue);
                var hp = uw.calMCure(mAttack, mAttackMult, target.mDefence, target.mDefenceMult, percentValue, 0, addValue, 0);
                uw.fightUtils.log("calMCure:%s", hp);
                return parseInt(hp.toString());
            }
            else {
                //不直接加血
                return 0;
            }
        }
        skillBiz.calReplayHp = calReplayHp;
        /**
         * 计算副本技能，只产生buff
         * @param copyId
         * @param member
         */
        function calCopySkill(copyId, member) {
            if (!copyId || member.isDeath())
                return;
            var copyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            if (!copyInfo)
                return;
            var copySkillIds = copyInfo[uw.t_copy_copySkillIds];
            if (!copySkillIds)
                return;
            for (var i = 0; i < copySkillIds.length; i++) {
                var locCopySkillId = copySkillIds[i];
                if (!locCopySkillId)
                    continue;
                var skillData = uw.getSkillData(locCopySkillId, 1);
                if (member.fightOption.curIsChallenger && skillData.targetType == uw.skillTargetType.ENEMY) {
                    return;
                }
                if (!member.fightOption.curIsChallenger && skillData.targetType == uw.skillTargetType.SELF) {
                    return;
                }
                uw.buffBiz.calAddBuff(null, [member], skillData, true);
            }
        }
        skillBiz.calCopySkill = calCopySkill;
        /**
         * 计算秘术技能，实际上只会产生buff
         * @param fightSkill
         */
        function calSecretSkill(fightSkill) {
            //播放特效
            var skillData = fightSkill.skill;
            var targets = uw.targetBiz.find(fightSkill.mixIsChallenger, null, null, fightSkill);
            //过滤多段攻击
            targets = this.calHurtCount(targets, fightSkill);
            for (var i = 0; i < targets.length; i++) {
                var locTarget = targets[i];
                if (!locTarget || locTarget.isDeath())
                    continue;
                uw.fightUtils.log("");
                uw.fightUtils.log("calSkill start -------------------------------------------------------------------------");
                uw.fightUtils.log("skill[%s],target[%s] ", fightSkill.skill.name, locTarget.name);
                if (fightSkill.skill.targetType == uw.skillTargetType.ENEMY) {
                    var hurtData = this.calHurt(null, locTarget, fightSkill);
                    var hurt = hurtData[0];
                    locTarget.fightOption.curController.calHp(-hurt, null, 0);
                }
                else {
                    //回血
                    var hp = this.calReplayHp(null, locTarget, fightSkill);
                    if (hp > 0) {
                        locTarget.fightOption.curController.calHp(hp, null);
                    }
                }
                this.calSkillHitEffect(locTarget, fightSkill);
                uw.fightUtils.log("calSkill end -------------------------------------------------------------------------");
                uw.fightUtils.log("");
            }
            fightSkill.hurtCount++;
            uw.buffBiz.calAddBuff(null, targets, skillData, false);
        }
        skillBiz.calSecretSkill = calSecretSkill;
        function calPassiveSecretSkills() {
            var sPassiveAllUserSkills = uw.fightSelfHandSkillCtrl.passiveAllUserSkills;
            for (var i = 0; i < sPassiveAllUserSkills.length; i++) {
                var locFightSkill = sPassiveAllUserSkills[i];
                this.calSecretSkill(locFightSkill);
            }
            var ePassiveAllUserSkills = uw.fightEnemyHandSkillCtrl.passiveAllUserSkills;
            for (var i = 0; i < ePassiveAllUserSkills.length; i++) {
                var locFightSkill = ePassiveAllUserSkills[i];
                this.calSecretSkill(locFightSkill);
            }
        }
        skillBiz.calPassiveSecretSkills = calPassiveSecretSkills;
        /**
         * 所有人做出胜利的动作
         */
        function showAllWin() {
            var members = uw.fightMainCtrl.selfFightMembers;
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                if (locMember.isDeath())
                    continue;
                uw.heroActionBiz.win(locMember);
            }
        }
        skillBiz.showAllWin = showAllWin;
    })(skillBiz = uw.skillBiz || (uw.skillBiz = {}));
})(uw || (uw = {}));

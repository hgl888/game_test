/**
 * Created by Administrator on 14-8-13.
 */
//被动技能业务
var uw;
(function (uw) {
    var passiveSkillBiz;
    (function (passiveSkillBiz) {
        /**
         * 计算永久被动buff, 一般是回合前
         * @param members|member
         */
        function calFightBefore(members) {
            if (!(members instanceof Array)) {
                members = [members];
            }
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                this.cal(locMember, locMember, uw.skillPassiveType.FIGHT_BEFORE);
            }
        }
        passiveSkillBiz.calFightBefore = calFightBefore;
        //死亡去掉永久被动buff影响
        function removeHalo(member) {
            var allMembers = uw.fightMainCtrl.allFightMembers;
            for (var i = 0; i < allMembers.length; i++) {
                var locMember = allMembers[i];
                if (locMember.isDeath())
                    continue;
                for (var key in locMember.fightOption.curFightBuffDic) {
                    var locBuff = locMember.fightOption.curFightBuffDic[key];
                    //副本类不移除
                    if (locBuff.isCopy)
                        continue;
                    if (locBuff.fromMember == member && locBuff.isHalo) {
                        //移除buff
                        locBuff.controller.removeBuff();
                    }
                }
            }
        }
        passiveSkillBiz.removeHalo = removeHalo;
        /**
         * 所有人死亡就触发
         * @param deathMember
         */
        function calEveryDeath(deathMember) {
            //分身死亡不判断
            if (deathMember.fightOption.curIsClone)
                return;
            var members = uw.fightMainCtrl.allFightMembers;
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                //死亡不判断
                if (locMember.isDeath())
                    continue;
                //分身也没效果
                if (locMember.fightOption.curIsClone)
                    continue;
                this.cal(locMember, locMember, uw.skillPassiveType.EVERY_DEATH);
            }
        }
        passiveSkillBiz.calEveryDeath = calEveryDeath;
        /**
         * 计算所有人某种类似的被动技能
         * @param type
         */
        function calByType(type) {
            var members = uw.fightMainCtrl.allFightMembers;
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                //死亡不判断
                if (locMember.isDeath())
                    continue;
                this.cal(locMember, locMember, type);
            }
        }
        passiveSkillBiz.calByType = calByType;
        /**
         * 计算被动技能造成buff
         * @param member
         * @param target
         * @param type
         */
        function cal(member, target, type) {
            if (member.isDeath())
                return;
            for (var i = 0; i < member.fightOption.curPassiveSkills.length; i++) {
                var locPassiveSkill = member.fightOption.curPassiveSkills[i];
                var passiveType = locPassiveSkill.skill.passiveType;
                if (passiveType != type)
                    continue;
                switch (type) {
                    case uw.skillPassiveType.CRIT:
                    case uw.skillPassiveType.MISS:
                    case uw.skillPassiveType.ATTACK:
                    case uw.skillPassiveType.HIT:
                    case uw.skillPassiveType.FIGHT_BEFORE:
                    case uw.skillPassiveType.EVERY_DEATH:
                    case uw.skillPassiveType.DEATH_MORE:
                    case uw.skillPassiveType.ALL_IN_AREA:
                        var targets = uw.targetBiz.find(member.fightOption.curIsChallenger, member, target, locPassiveSkill);
                        uw.buffBiz.calAddBuff(member, targets, locPassiveSkill.skill, false);
                        locPassiveSkill.hurtCount++;
                        break;
                    case uw.skillPassiveType.RE_HP:
                        //血量少于多少才生效
                        if (member.hp / member.baseData.hp <= locPassiveSkill.skill.percentValue / 100) {
                            //只生效一次
                            if (locPassiveSkill.hurtCount >= 1)
                                break;
                            var targets = uw.targetBiz.find(member.fightOption.curIsChallenger, member, target, locPassiveSkill);
                            uw.buffBiz.calAddBuff(member, targets, locPassiveSkill.skill, false);
                            locPassiveSkill.hurtCount++;
                        }
                        break;
                    case uw.skillPassiveType.DEATH_ONE:
                        //只生效一次
                        if (locPassiveSkill.hurtCount >= 1)
                            break;
                        var targets = uw.targetBiz.find(member.fightOption.curIsChallenger, member, target, locPassiveSkill);
                        uw.buffBiz.calAddBuff(member, targets, locPassiveSkill.skill, false);
                        locPassiveSkill.hurtCount++;
                        break;
                }
            }
        }
        passiveSkillBiz.cal = cal;
        /**
         * 初始化次数为0
         * @param member
         */
        function clearHurtCount(member) {
            for (var i = 0; i < member.fightOption.curPassiveSkills.length; i++) {
                var locPassiveSkill = member.fightOption.curPassiveSkills[i];
                locPassiveSkill.hurtCount = 0;
            }
        }
        passiveSkillBiz.clearHurtCount = clearHurtCount;
    })(passiveSkillBiz = uw.passiveSkillBiz || (uw.passiveSkillBiz = {}));
})(uw || (uw = {}));

/**
 * Created by Administrator on 2014/12/19.
 */
//获取目标方法
var uw;
(function (uw) {
    uw.targetFindFun = {};
    //获取单个
    uw.targetFindFun[uw.targetObjectType.SINGLE] = function (curMember, targetMember, fightSkill, members) {
        if (curMember.fightOption.curIsChallenger) {
            //单体，如果是己方，则选择最靠近
            var reMember = uw.targetBiz.getNearestTarget(curMember, members);
            if (reMember)
                return [reMember];
            else
                return [];
        }
        else {
            //单体，如果是对方，则选择最近的
            return [targetMember];
        }
    };
    //随机1个
    uw.targetFindFun[uw.targetObjectType.RANDOM_1] = function (curMember, targetMember, fightSkill, members) {
        return uw.fightUtils.getRandomArray(members, 1);
    };
    //随机2个
    uw.targetFindFun[uw.targetObjectType.RANDOM_2] = function (curMember, targetMember, fightSkill, members) {
        return uw.fightUtils.getRandomArray(members, 2);
    };
    //随机3个
    uw.targetFindFun[uw.targetObjectType.RANDOM_3] = function (curMember, targetMember, fightSkill, members) {
        return uw.fightUtils.getRandomArray(members, 2);
    };
    uw.targetFindFun[uw.targetObjectType.RANDOM_HIT] = function (curMember, targetMember, fightSkill, members) {
        return uw.fightUtils.getRandomArray(members, 2);
    };
    //血量最少
    uw.targetFindFun[uw.targetObjectType.MIN_HP] = function (curMember, targetMember, fightSkill, members) {
        var member;
        for (var i = 0; i < members.length; i++) {
            var locMember = members[i];
            if (!member || locMember.hp < member.hp)
                member = locMember;
        }
        if (member)
            return [member];
        else
            return [];
    };
    //全体
    uw.targetFindFun[uw.targetObjectType.ALL] = function (curMember, targetMember, fightSkill, members) {
        return members;
    };
    //自己
    uw.targetFindFun[uw.targetObjectType.SELF] = function (curMember, targetMember, fightSkill, members) {
        return [curMember];
    };
    //圆形区域
    uw.targetFindFun[uw.targetObjectType.AREA_CIRCLE] = function (curMember, targetMember, fightSkill, members) {
        var targetArea = fightSkill.targetArea || fightSkill.skill.targetArea;
        return uw.targetBiz.findByArea(curMember, targetMember, targetArea, members, curMember.fightOption.curController.isFaceLeft);
    };
    //多边形区域
    uw.targetFindFun[uw.targetObjectType.AREA_POLYGON] = function (curMember, targetMember, fightSkill, members) {
        var targetArea = fightSkill.targetArea || fightSkill.skill.targetArea;
        return uw.targetBiz.findByArea(curMember, targetMember, targetArea, members, curMember.fightOption.curController.isFaceLeft);
    };
    //最远的
    uw.targetFindFun[uw.targetObjectType.FASTEST] = function (curMember, targetMember, fightSkill, members) {
        var target = uw.targetBiz.getFastestTarget(curMember, members);
        return [target];
    };
    //hp百分比最低者
    uw.targetFindFun[uw.targetObjectType.MIN_PER_HP] = function (curMember, targetMember, fightSkill, members) {
        var member, minPerHp;
        for (var i = 0; i < members.length; i++) {
            var locMember = members[i];
            var locMinPerHp = locMember.hp / locMember.baseData.hp;
            if (!member || locMinPerHp < minPerHp) {
                member = locMember;
                minPerHp = locMinPerHp;
            }
        }
        if (member)
            return [member];
        else
            return [];
    };
    //体质最低者life
    uw.targetFindFun[uw.targetObjectType.MIN_LIFE] = function (curMember, targetMember, fightSkill, members) {
        var member = uw.targetBiz.getLowestPropTarget(curMember, members, "life");
        return member ? [member] : [];
    };
    //力量最低者power
    uw.targetFindFun[uw.targetObjectType.MIN_POWER] = function (curMember, targetMember, fightSkill, members) {
        var member = uw.targetBiz.getLowestPropTarget(curMember, members, "power");
        return member ? [member] : [];
    };
    //智力最低者intel
    uw.targetFindFun[uw.targetObjectType.MIN_INTEL] = function (curMember, targetMember, fightSkill, members) {
        var member = uw.targetBiz.getLowestPropTarget(curMember, members, "intel");
        return member ? [member] : [];
    };
    //体质最高者life
    uw.targetFindFun[uw.targetObjectType.MAX_LIFE] = function (curMember, targetMember, fightSkill, members) {
        var member = uw.targetBiz.getHighestPropTarget(curMember, members, "life");
        return member ? [member] : [];
    };
    //力量最高者power
    uw.targetFindFun[uw.targetObjectType.MAX_POWER] = function (curMember, targetMember, fightSkill, members) {
        var member = uw.targetBiz.getHighestPropTarget(curMember, members, "power");
        return member ? [member] : [];
    };
    //智力最高者intel
    uw.targetFindFun[uw.targetObjectType.MAX_INTEL] = function (curMember, targetMember, fightSkill, members) {
        var member = uw.targetBiz.getHighestPropTarget(curMember, members, "intel");
        return member ? [member] : [];
    };
    //获取最前排
    uw.targetFindFun[uw.targetObjectType.FRONT_POS] = function (curMember, targetMember, fightSkill, members) {
        var member = uw.targetBiz.getLowestPropTarget(curMember, members, "curPos");
        return member ? [member] : [];
    };
    //获取最后排
    uw.targetFindFun[uw.targetObjectType.BACK_POS] = function (curMember, targetMember, fightSkill, members) {
        var member = uw.targetBiz.getHighestPropTarget(curMember, members, "curPos");
        return member ? [member] : [];
    };
})(uw || (uw = {}));

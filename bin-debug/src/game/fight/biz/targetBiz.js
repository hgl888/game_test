/**
 * Created by Administrator on 14-7-24.
 */
var uw;
(function (uw) {
    var targetBiz;
    (function (targetBiz) {
        /**
         * 获取面向最近的目标
         * @param curMember
         * @returns {*}
         */
        function getFrontTarget(curMember) {
            //判断是否中了混乱，则目标相反
            var members = uw.fightBiz.getEnemyMembers(curMember.fightOption.curIsChallenger, curMember);
            members = this.calLimit(members);
            return this.getNearestTarget(curMember, members);
        }
        targetBiz.getFrontTarget = getFrontTarget;
        /**
         * 获取最靠近的对手
         * @param curMember
         * @param fightMembers
         */
        function getNearestTarget(curMember, fightMembers) {
            var target = null;
            var distance = 0;
            for (var i = 0; i < fightMembers.length; i++) {
                var locMember = fightMembers[i];
                var curPos = mo.p(curMember.fightOption.curX, curMember.fightOption.curY);
                var locDistance = curPos.distanceTo(mo.p(locMember.fightOption.curX, locMember.fightOption.curY));
                if (!target) {
                    target = locMember;
                    distance = locDistance;
                    continue;
                }
                if (locDistance < distance) {
                    target = locMember;
                    distance = locDistance;
                }
            }
            return target;
        }
        targetBiz.getNearestTarget = getNearestTarget;
        /**
         * 获取最后面的对手
         * @param curMember
         * @param fightMembers
         */
        function getFastestTarget(curMember, fightMembers) {
            var target = null;
            var distance = 0;
            for (var i = 0; i < fightMembers.length; i++) {
                var locMember = fightMembers[i];
                var locCurPos = mo.p(curMember.fightOption.curX, curMember.fightOption.curY);
                var locDistance = locCurPos.distanceTo(mo.p(locMember.fightOption.curX, locMember.fightOption.curY));
                if (!target) {
                    target = locMember;
                    distance = locDistance;
                    continue;
                }
                if (locDistance > distance) {
                    target = locMember;
                    distance = locDistance;
                }
            }
            return target;
        }
        targetBiz.getFastestTarget = getFastestTarget;
        function calLimit(members) {
            var targets = [];
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                if (locMember.isDeath())
                    continue;
                if (locMember.fightOption.curLimitTargetSelect)
                    continue;
                targets.push(locMember);
            }
            return targets;
        }
        targetBiz.calLimit = calLimit;
        /**
         * 获取目标,如果是副本，或者领主技，则curMember, targetMember为null
         * @param isChallenger
         * @param curMember
         * @param targetMember
         * @param fightSkill
         */
        function find(isChallenger, curMember, targetMember, fightSkill) {
            var members, skillData = fightSkill.skill;
            if (skillData.targetType == uw.skillTargetType.ENEMY) {
                members = uw.fightBiz.getEnemyMembers(isChallenger, curMember);
            }
            else {
                members = uw.fightBiz.getSelfMembers(isChallenger);
            }
            members = this.calLimit(members);
            var fun = uw.targetFindFun[skillData.targets];
            if (fun) {
                return fun(curMember, targetMember, fightSkill, members);
            }
            else {
                uw.warn("技能id[%s]目标对象配置错误，targets=[%s]", skillData.id, skillData.targets);
                return [];
            }
        }
        targetBiz.find = find;
        //区域获取目标
        function findByArea(curMember, targetMember, targetArea, members, isFaceLeft) {
            if (!targetArea || targetArea.length <= 1) {
                return [];
            }
            if (targetArea.length <= 3) {
                return this.findByCircle(curMember, targetMember, targetArea, members, isFaceLeft);
            }
            else {
                return this.findByPolygon(curMember, targetMember, targetArea, members, isFaceLeft);
            }
        }
        targetBiz.findByArea = findByArea;
        //圆形区域
        function findByCircle(curMember, targetMember, targetArea, members, isFaceLeft) {
            var targets = [];
            if (!targetArea || targetArea.length <= 1) {
                return [];
            }
            var type = targetArea[0][0]; //己方或者对方
            var centerX = targetArea[1][0];
            var centerY = targetArea[1][1];
            var center = mo.p(centerX, centerY); //圆中点
            var radius = targetArea[2][0]; //半径
            //对面则为负值
            if (isFaceLeft == true) {
                center.x *= -1;
                center.y *= -1;
            }
            //相对位置
            if (type == uw.targetAreaType.SELF) {
                center.x += curMember.fightOption.curX;
                center.y += curMember.fightOption.curY;
            }
            else {
                if (!targetMember)
                    return targets;
                center.x += targetMember.fightOption.curX;
                center.y += targetMember.fightOption.curY;
            }
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                if (uw.fightUtils.isInCircle(mo.p(locMember.fightOption.curX, locMember.fightOption.curY), center, radius)) {
                    targets.push(locMember);
                }
            }
            var data = { center: center, radius: radius };
            uw.fightScene.getMainLayer().addSkillAreaDebug(0, data);
            return targets;
        }
        targetBiz.findByCircle = findByCircle;
        //多边形区域AREA_POLYGON
        function findByPolygon(curMember, targetMember, targetArea, members, isFaceLeft) {
            var targets = [];
            if (!targetArea || targetArea.length <= 1) {
                return [];
            }
            var type = targetArea[0][0]; //己方或者对方
            var vertices = [];
            for (var i = 1; i < targetArea.length; i++) {
                var locObj = targetArea[i];
                vertices.push(mo.p(locObj[0], locObj[1]));
            }
            for (var i = 0; i < vertices.length; i++) {
                var locVer = vertices[i];
                //对面则为负值
                if (isFaceLeft == true) {
                    locVer.x *= -1;
                    locVer.y *= -1;
                }
                //相对位置
                if (type == uw.targetAreaType.SELF) {
                    locVer.x += curMember.fightOption.curX;
                    locVer.y += curMember.fightOption.curY;
                }
                else {
                    if (!targetMember)
                        return targets;
                    locVer.x += targetMember.fightOption.curX;
                    locVer.y += targetMember.fightOption.curY;
                }
            }
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                if (uw.fightUtils.isInPolygon(mo.p(locMember.fightOption.curX, locMember.fightOption.curY), vertices)) {
                    targets.push(locMember);
                }
            }
            var data = { vertices: vertices };
            uw.fightScene.getMainLayer().addSkillAreaDebug(1, data);
            return targets;
        }
        targetBiz.findByPolygon = findByPolygon;
        /**
         * 获取某个属性最高者
         * @param curMember
         * @param fightMembers
         * @param key
         */
        function getHighestPropTarget(curMember, fightMembers, key) {
            var target = null;
            var value = 0;
            for (var i = 0; i < fightMembers.length; i++) {
                var locMember = fightMembers[i];
                var locValue = locMember[key] || 0;
                if (!target || locValue > value) {
                    target = locMember;
                    value = locValue;
                }
            }
            return target;
        }
        targetBiz.getHighestPropTarget = getHighestPropTarget;
        /**
         * 获取某个属性最低者
         * @param curMember
         * @param fightMembers
         * @param key
         */
        function getLowestPropTarget(curMember, fightMembers, key) {
            var target = null;
            var value = 0;
            for (var i = 0; i < fightMembers.length; i++) {
                var locMember = fightMembers[i];
                var locValue = locMember[key] || 0;
                if (!target || locValue < value) {
                    target = locMember;
                    value = locValue;
                }
            }
            return target;
        }
        targetBiz.getLowestPropTarget = getLowestPropTarget;
    })(targetBiz = uw.targetBiz || (uw.targetBiz = {}));
})(uw || (uw = {}));

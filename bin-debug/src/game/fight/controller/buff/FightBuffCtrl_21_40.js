/**
 * Created by Administrator on 14-8-15.
 */
var uw;
(function (uw) {
    uw.fightBuffCtrl_21_40 = {};
    //致盲 buff携带者【本次】普通攻击必定被闪避
    var BLIND = (function (_super) {
        __extends(BLIND, _super);
        function BLIND() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = BLIND.prototype;
        __egretProto__.myHandle = function () {
        };
        return BLIND;
    })(uw.FightBuffBaseCtrl);
    BLIND.prototype.__class__ = "uw.BLIND";
    uw.fightBuffCtrl_21_40[uw.buffStateType.BLIND] = BLIND;
    //承受指定数值的伤害，之后释放
    var ABS_RELEASE = (function (_super) {
        __extends(ABS_RELEASE, _super);
        function ABS_RELEASE() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ABS_RELEASE.prototype;
        __egretProto__.myHandle = function () {
        };
        return ABS_RELEASE;
    })(uw.FightBuffBaseCtrl);
    ABS_RELEASE.prototype.__class__ = "uw.ABS_RELEASE";
    uw.fightBuffCtrl_21_40[uw.buffStateType.ABS_RELEASE] = ABS_RELEASE;
    //绝对防御，只能被控制
    var INVINCIBILITY = (function (_super) {
        __extends(INVINCIBILITY, _super);
        function INVINCIBILITY() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = INVINCIBILITY.prototype;
        __egretProto__.myHandle = function () {
        };
        return INVINCIBILITY;
    })(uw.FightBuffBaseCtrl);
    INVINCIBILITY.prototype.__class__ = "uw.INVINCIBILITY";
    uw.fightBuffCtrl_21_40[uw.buffStateType.INVINCIBILITY] = INVINCIBILITY;
    //随即伤害值
    var RANDOM_HURT = (function (_super) {
        __extends(RANDOM_HURT, _super);
        function RANDOM_HURT() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = RANDOM_HURT.prototype;
        __egretProto__.myHandle = function () {
        };
        return RANDOM_HURT;
    })(uw.FightBuffBaseCtrl);
    RANDOM_HURT.prototype.__class__ = "uw.RANDOM_HURT";
    uw.fightBuffCtrl_21_40[uw.buffStateType.RANDOM_HURT] = RANDOM_HURT;
    //变乌鸦 ，获得此buff的人，不能攻击，不能移动
    var CROW = (function (_super) {
        __extends(CROW, _super);
        function CROW() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = CROW.prototype;
        __egretProto__.addBuff = function (fightBuff) {
            var member = fightBuff.member;
            member.fightOption.curController.breakSkill();
            _super.prototype.addBuff.call(this, fightBuff);
        };
        __egretProto__.myHandle = function () {
        };
        return CROW;
    })(uw.FightBuffBaseCtrl);
    CROW.prototype.__class__ = "uw.CROW";
    uw.fightBuffCtrl_21_40[uw.buffStateType.CROW] = CROW;
    //召唤，根据目标，在指定的范围召唤出1-3个战斗单位
    var CALL = (function (_super) {
        __extends(CALL, _super);
        function CALL() {
            _super.apply(this, arguments);
            this.isDeathRemove = false;
        }
        var __egretProto__ = CALL.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.cloneNum = 1;
            this.isDeathRemove = true;
            this.cloneMembers = [];
        };
        __egretProto__.myHandle = function () {
            //复制分身
            var fightBuff = this.fightBuff, fromMember = fightBuff.fromMember;
            var positionArr = [];
            var winSize = mo.visibleRect.getSize();
            positionArr[0] = uw.fightUtils.convertNodePosToCurPos(mo.p(winSize.width / 2, 200));
            positionArr[1] = mo.p(fromMember.fightOption.curX - fromMember.fightOption.curRadius * 3, fromMember.fightOption.curY - fromMember.fightOption.curRadius * 2);
            positionArr[2] = mo.p(fromMember.fightOption.curX + fromMember.fightOption.curRadius * 3, fromMember.fightOption.curY - fromMember.fightOption.curRadius * 2);
            for (var i = 0; i < this.cloneNum; i++) {
                this._addMember(positionArr[i]);
            }
        };
        __egretProto__._addMember = function (pos) {
            var self = this, fightBuff = self.fightBuff, fromMember = fightBuff.fromMember;
            var group = null, members = null;
            var mainCtrl = uw.fightMainCtrl;
            if (fromMember.fightOption.curIsChallenger) {
                group = mainCtrl.selfGroup;
                members = mainCtrl.selfFightMembers;
            }
            else {
                var round = uw.fightRoundCtrl.round;
                group = mainCtrl.enemyGroups[round];
                members = mainCtrl.enemyFightMembers;
            }
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var monsterId = uw.buffBiz.calValue(valueType, value, 1);
            //获取位置
            var curPos = group.members.length;
            var memberData = mo.getJSONWithFileNameAndID(uw.cfg_t_monster, monsterId);
            var addMember = uw.FightMember.create(memberData, uw.memberType.MONSTER, curPos);
            addMember.fightOption.curIsClone = true;
            addMember.fightOption.curController.isReadyAttack = true;
            group.addMember(addMember);
            group.setIsChallenger(fromMember.fightOption.curIsChallenger);
            self.cloneMembers.push(addMember);
            uw.fightBiz.addMemberToScene(addMember, pos, function (display) {
                members.push(addMember);
                mainCtrl.allFightMembers.push(addMember);
                self.addExBuff(addMember);
                if (uw.Fight.isDemo) {
                    addMember.fightOption.curController = uw.FightDemoMemberCtrl.create(addMember, display);
                }
            });
        };
        __egretProto__.addExBuff = function (member) {
            var fightBuff = this.fightBuff, fromMember = fightBuff.fromMember;
            //无敌
            var buffData1 = uw.getBuffData(2100, 1);
            uw.buffBiz.addBuffToMember(fromMember, member, buffData1, false);
            //不移动
            var buffData2 = uw.getBuffData(2101, 1);
            uw.buffBiz.addBuffToMember(fromMember, member, buffData2, false);
        };
        //移除特效，特殊可重写
        __egretProto__.removeBuff = function (force) {
            var fightBuff = this.fightBuff, fromMember = fightBuff.fromMember;
            if (_super.prototype.removeBuff.call(this, force)) {
                for (var i = 0; i < this.cloneMembers.length; i++) {
                    var locMember = this.cloneMembers[i];
                    locMember.death(fromMember);
                }
                this.cloneMembers.length = 0;
            }
            return true;
        };
        return CALL;
    })(uw.FightBuffBaseCtrl);
    CALL.prototype.__class__ = "uw.CALL";
    uw.fightBuffCtrl_21_40[uw.buffStateType.CALL] = CALL;
    //混乱，普通攻击打自己人
    var CONFUSION = (function (_super) {
        __extends(CONFUSION, _super);
        function CONFUSION() {
            _super.apply(this, arguments);
            this.isHandleAfterAdd = false;
            this.skillIndex = 0;
        }
        var __egretProto__ = CONFUSION.prototype;
        __egretProto__.addBuff = function (buff) {
            _super.prototype.addBuff.call(this, buff);
            var fightBuff = this.fightBuff, member = this.fightBuff.member;
            member.fightOption.curController.breakSkill();
        };
        return CONFUSION;
    })(uw.FightBuffBaseCtrl);
    CONFUSION.prototype.__class__ = "uw.CONFUSION";
    uw.fightBuffCtrl_21_40[uw.buffStateType.CONFUSION] = CONFUSION;
    //冰冻
    var FREEZE = (function (_super) {
        __extends(FREEZE, _super);
        function FREEZE() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FREEZE.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            member.fightOption.curController.breakSkill();
        };
        return FREEZE;
    })(uw.FightBuffBaseCtrl);
    FREEZE.prototype.__class__ = "uw.FREEZE";
    uw.fightBuffCtrl_21_40[uw.buffStateType.FREEZE] = FREEZE;
    //加攻速
    var ADD_ATTACK_SPEED = (function (_super) {
        __extends(ADD_ATTACK_SPEED, _super);
        function ADD_ATTACK_SPEED() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ADD_ATTACK_SPEED.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var propValue = member.fightOption.curController.intervalMult;
            propValue = uw.buffBiz.calValueNotInt(valueType, value, propValue);
            //改变数值
            member.fightOption.curController.intervalMult -= propValue;
            //记住数值，移除时返回
            var prop = [propValue];
            fightBuff.valueArr.push(prop);
            uw.fightUtils.log("加攻速key:%s,value:%", "intervalMult", -propValue);
        };
        __egretProto__.addDisplay = function () {
            _super.prototype.addDisplay.call(this);
            var fightBuff = this.fightBuff, member = fightBuff.member;
            uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.attackSpeedIncrease);
        };
        //移除特效，特殊可重写
        __egretProto__.removeBuff = function (force) {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            if (_super.prototype.removeBuff.call(this, force)) {
                for (var i = 0; i < fightBuff.valueArr.length; i++) {
                    var locProp = fightBuff.valueArr[i];
                    var locPropValue = locProp[0];
                    member.fightOption.curController.intervalMult += locPropValue;
                }
            }
            return true;
        };
        return ADD_ATTACK_SPEED;
    })(uw.FightBuffBaseCtrl);
    ADD_ATTACK_SPEED.prototype.__class__ = "uw.ADD_ATTACK_SPEED";
    uw.fightBuffCtrl_21_40[uw.buffStateType.ADD_ATTACK_SPEED] = ADD_ATTACK_SPEED;
    //减攻速
    var DEL_ATTACK_SPEED = (function (_super) {
        __extends(DEL_ATTACK_SPEED, _super);
        function DEL_ATTACK_SPEED() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = DEL_ATTACK_SPEED.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var propValue = member.fightOption.curController.intervalMult;
            propValue = uw.buffBiz.calValueNotInt(valueType, value, propValue);
            //改变数值
            member.fightOption.curController.intervalMult += propValue;
            //记住数值，移除时返回
            var prop = [propValue];
            fightBuff.valueArr.push(prop);
            uw.fightUtils.log("减攻速key:%s,value:%", "intervalMult", propValue);
        };
        __egretProto__.addDisplay = function () {
            _super.prototype.addDisplay.call(this);
            var fightBuff = this.fightBuff, member = fightBuff.member;
            uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.attackSpeedReduce);
        };
        //移除特效，特殊可重写
        __egretProto__.removeBuff = function (force) {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            if (_super.prototype.removeBuff.call(this, force)) {
                for (var i = 0; i < fightBuff.valueArr.length; i++) {
                    var locProp = fightBuff.valueArr[i];
                    var locPropValue = locProp[0];
                    member.fightOption.curController.intervalMult -= locPropValue;
                }
                return true;
            }
        };
        return DEL_ATTACK_SPEED;
    })(uw.FightBuffBaseCtrl);
    DEL_ATTACK_SPEED.prototype.__class__ = "uw.DEL_ATTACK_SPEED";
    uw.fightBuffCtrl_21_40[uw.buffStateType.DEL_ATTACK_SPEED] = DEL_ATTACK_SPEED;
    //加移速
    var ADD_MOVE_SPEED = (function (_super) {
        __extends(ADD_MOVE_SPEED, _super);
        function ADD_MOVE_SPEED() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ADD_MOVE_SPEED.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var propValue = member.fightOption.curController.moveMult;
            propValue = uw.buffBiz.calValueNotInt(valueType, value, propValue);
            //改变数值
            member.fightOption.curController.moveMult += propValue;
            //记住数值，移除时返回
            var prop = [propValue];
            fightBuff.valueArr.push(prop);
            uw.fightUtils.log("加移速key:%s,value:%", "moveMult", propValue);
        };
        __egretProto__.addDisplay = function () {
            _super.prototype.addDisplay.call(this);
            var fightBuff = this.fightBuff, member = fightBuff.member;
            uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.movingSpeedIncrease);
        };
        //移除特效，特殊可重写
        __egretProto__.removeBuff = function (force) {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            if (_super.prototype.removeBuff.call(this, force)) {
                for (var i = 0; i < fightBuff.valueArr.length; i++) {
                    var locProp = fightBuff.valueArr[i];
                    var locPropValue = locProp[0];
                    member.fightOption.curController.moveMult -= locPropValue;
                }
                return true;
            }
        };
        return ADD_MOVE_SPEED;
    })(uw.FightBuffBaseCtrl);
    ADD_MOVE_SPEED.prototype.__class__ = "uw.ADD_MOVE_SPEED";
    uw.fightBuffCtrl_21_40[uw.buffStateType.ADD_MOVE_SPEED] = ADD_MOVE_SPEED;
    //减移速
    var DEL_MOVE_SPEED = (function (_super) {
        __extends(DEL_MOVE_SPEED, _super);
        function DEL_MOVE_SPEED() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = DEL_MOVE_SPEED.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var propValue = member.fightOption.curController.moveMult;
            propValue = uw.buffBiz.calValueNotInt(valueType, value, propValue);
            //改变数值
            member.fightOption.curController.moveMult -= propValue;
            //记住数值，移除时返回
            var prop = [propValue];
            fightBuff.valueArr.push(prop);
            uw.fightUtils.log("减移速key:%s,value:%", "moveMult", -propValue);
        };
        __egretProto__.addDisplay = function () {
            _super.prototype.addDisplay.call(this);
            var fightBuff = this.fightBuff, member = fightBuff.member;
            uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.movingSpeedReduce);
        };
        //移除特效，特殊可重写
        __egretProto__.removeBuff = function (force) {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            if (_super.prototype.removeBuff.call(this, force)) {
                for (var i = 0; i < fightBuff.valueArr.length; i++) {
                    var locProp = fightBuff.valueArr[i];
                    var locPropValue = locProp[0];
                    member.fightOption.curController.moveMult += locPropValue;
                }
                return true;
            }
        };
        return DEL_MOVE_SPEED;
    })(uw.FightBuffBaseCtrl);
    DEL_MOVE_SPEED.prototype.__class__ = "uw.DEL_MOVE_SPEED";
    uw.fightBuffCtrl_21_40[uw.buffStateType.DEL_MOVE_SPEED] = DEL_MOVE_SPEED;
    //复制1个
    var CLONE_1 = (function (_super) {
        __extends(CLONE_1, _super);
        function CLONE_1() {
            _super.apply(this, arguments);
            this.isDeathRemove = false;
        }
        var __egretProto__ = CLONE_1.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.cloneMembers = [];
            this.cloneNum = 1;
            this.isDeathRemove = true;
        };
        __egretProto__.myHandle = function () {
            //复制分身
            var fightBuff = this.fightBuff, fromMember = fightBuff.fromMember;
            var positionArr = [];
            positionArr[0] = mo.p(fromMember.fightOption.curX + fromMember.fightOption.curRadius * 3, fromMember.fightOption.curY + fromMember.fightOption.curRadius * 2);
            positionArr[1] = mo.p(fromMember.fightOption.curX - fromMember.fightOption.curRadius * 3, fromMember.fightOption.curY - fromMember.fightOption.curRadius * 2);
            positionArr[2] = mo.p(fromMember.fightOption.curX + fromMember.fightOption.curRadius * 3, fromMember.fightOption.curY - fromMember.fightOption.curRadius * 2);
            for (var i = 0; i < this.cloneNum; i++) {
                this._addMember(positionArr[i]);
            }
        };
        __egretProto__._addMember = function (pos) {
            var self = this, fightBuff = self.fightBuff, fromMember = fightBuff.fromMember;
            var group = null, members = null;
            var mainCtrl = uw.fightMainCtrl;
            if (fromMember.fightOption.curIsChallenger) {
                group = mainCtrl.selfGroup;
                members = mainCtrl.selfFightMembers;
            }
            else {
                var round = uw.fightRoundCtrl.round;
                group = mainCtrl.enemyGroups[round];
                members = mainCtrl.enemyFightMembers;
            }
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var perValue = uw.buffBiz.calValueNotInt(valueType, value, 1);
            //获取位置
            var curPos = group.members.length;
            var addMember = uw.FightMember.clone(fromMember, perValue, curPos);
            group.addMember(addMember);
            group.setIsChallenger(fromMember.fightOption.curIsChallenger);
            self.cloneMembers.push(addMember);
            uw.fightBiz.addMemberToScene(addMember, pos, function (display) {
                members.push(addMember);
                mainCtrl.allFightMembers.push(addMember);
                display.addBloodProgress(addMember.hp, addMember.hp, addMember.baseData.hp);
                self.addExBuff(addMember);
            });
        };
        __egretProto__.addExBuff = function (member) {
        };
        //移除特效，特殊可重写
        __egretProto__.removeBuff = function (force) {
            var fightBuff = this.fightBuff, fromMember = fightBuff.fromMember;
            if (_super.prototype.removeBuff.call(this, force)) {
                for (var i = 0; i < this.cloneMembers.length; i++) {
                    var locMember = this.cloneMembers[i];
                    locMember.death(fromMember);
                }
                this.cloneMembers.length = 0;
                return true;
            }
        };
        return CLONE_1;
    })(uw.FightBuffBaseCtrl);
    CLONE_1.prototype.__class__ = "uw.CLONE_1";
    uw.fightBuffCtrl_21_40[uw.buffStateType.CLONE_1] = CLONE_1;
    var BUFF_CLONE_1 = (function (_super) {
        __extends(BUFF_CLONE_1, _super);
        function BUFF_CLONE_1() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = BUFF_CLONE_1.prototype;
        return BUFF_CLONE_1;
    })(CLONE_1);
    uw.BUFF_CLONE_1 = BUFF_CLONE_1;
    BUFF_CLONE_1.prototype.__class__ = "uw.BUFF_CLONE_1";
    //复制2个
    var CLONE_2 = (function (_super) {
        __extends(CLONE_2, _super);
        function CLONE_2() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = CLONE_2.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.cloneNum = 2;
        };
        return CLONE_2;
    })(CLONE_1);
    CLONE_2.prototype.__class__ = "uw.CLONE_2";
    uw.fightBuffCtrl_21_40[uw.buffStateType.CLONE_2] = CLONE_2;
    //复制3个
    var CLONE_3 = (function (_super) {
        __extends(CLONE_3, _super);
        function CLONE_3() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = CLONE_3.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.cloneNum = 3;
        };
        return CLONE_3;
    })(CLONE_1);
    CLONE_3.prototype.__class__ = "uw.CLONE_3";
    uw.fightBuffCtrl_21_40[uw.buffStateType.CLONE_3] = CLONE_3;
    //瞬移
    var TELEPORT = (function (_super) {
        __extends(TELEPORT, _super);
        function TELEPORT() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TELEPORT.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, enemyMember = fightBuff.member, fromMember = fightBuff.fromMember;
            //瞬移距离
            var distance = fromMember.fightOption.curSkill.attackDistance;
            if (fromMember.fightOption.curController.isFaceLeft) {
                distance *= -1;
            }
            fromMember.fightOption.curController.setCurPos(enemyMember.fightOption.curX + distance, enemyMember.fightOption.curY);
            //重新设置下面向
            fromMember.fightOption.curController.checkFaceDirection();
        };
        return TELEPORT;
    })(uw.FightBuffBaseCtrl);
    TELEPORT.prototype.__class__ = "uw.TELEPORT";
    uw.fightBuffCtrl_21_40[uw.buffStateType.TELEPORT] = TELEPORT;
    //定身
    var LIMIT_MOVE = (function (_super) {
        __extends(LIMIT_MOVE, _super);
        function LIMIT_MOVE() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = LIMIT_MOVE.prototype;
        return LIMIT_MOVE;
    })(uw.FightBuffBaseCtrl);
    LIMIT_MOVE.prototype.__class__ = "uw.LIMIT_MOVE";
    uw.fightBuffCtrl_21_40[uw.buffStateType.LIMIT_MOVE] = LIMIT_MOVE;
    //生命共享
    var SHARE_HP = (function (_super) {
        __extends(SHARE_HP, _super);
        function SHARE_HP() {
            _super.apply(this, arguments);
            this.isHandleAfterAdd = false;
            this.hurt = 0;
        }
        var __egretProto__ = SHARE_HP.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            var members = uw.fightBiz.getSelfMembers(member.fightOption.curIsChallenger);
            var targets = [];
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                if (uw.buffBiz.getSameFightBuff(locMember.fightOption.curFightBuffDic, fightBuff.buffData)) {
                    targets.push(locMember);
                }
            }
            if (targets.length > 0) {
                this.hurt = this.hurt / targets.length;
            }
            for (var i = 0; i < targets.length; i++) {
                var locTarget = targets[i];
                locTarget.fightOption.curController.calHp(-this.hurt, this.fromMember);
            }
        };
        __egretProto__.hit = function (fromMember, hurt) {
            this.fromMember = fromMember;
            this.hurt = hurt;
            this.handle();
            return 0;
        };
        return SHARE_HP;
    })(uw.FightBuffBaseCtrl);
    SHARE_HP.prototype.__class__ = "uw.SHARE_HP";
    uw.fightBuffCtrl_21_40[uw.buffStateType.SHARE_HP] = SHARE_HP;
})(uw || (uw = {}));

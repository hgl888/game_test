/**
 * Created by Administrator on 14-10-10.
 */
var uw;
(function (uw) {
    uw.fightBuffCtrl_41_60 = {};
    var _41 = (function (_super) {
        __extends(_41, _super);
        function _41() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _41.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            member.fightOption.curController.breakSkill();
        };
        return _41;
    })(uw.FightBuffBaseCtrl);
    _41.prototype.__class__ = "uw._41";
    //石化
    uw.fightBuffCtrl_41_60[uw.buffStateType.STONE] = _41;
    var _42 = (function (_super) {
        __extends(_42, _super);
        function _42() {
            _super.apply(this, arguments);
            this.speed = 0;
            this.isFaceLeft = false;
            this.high = 0;
            this.diffHigh = 0;
            this.keepTime = 0;
            this.status = 0; //1;往上，2保持，3往下
        }
        var __egretProto__ = _42.prototype;
        __egretProto__.addBuff = function (buff) {
            _super.prototype.addBuff.call(this, buff);
            this.isFaceLeft = this.fightBuff.member.fightOption.curController.isFaceLeft;
        };
        __egretProto__.step = function (dt) {
            this._calMoveUp(dt);
            this._calKeep(dt);
            this._calMoveDown(dt);
        };
        __egretProto__._calMoveUp = function (dt) {
            if (this.status != 1)
                return;
            var member = this.fightBuff.member;
            var diffY = this.speed * dt;
            member.fightOption.curController.setCurPos(member.fightOption.curX, member.fightOption.curY + diffY);
            this.diffHigh += diffY;
            if (this.diffHigh >= this.high) {
                this.status = 2;
            }
        };
        __egretProto__._calKeep = function (dt) {
            if (this.status != 2)
                return;
            this.keepTime -= dt;
            if (this.keepTime <= 0) {
                this.status = 3;
            }
        };
        __egretProto__._calMoveDown = function (dt) {
            if (this.status != 3)
                return;
            var member = this.fightBuff.member;
            var diffY = this.speed * dt;
            this.diffHigh -= diffY;
            if (this.diffHigh < 0) {
                diffY = diffY + this.diffHigh;
                this.status = 0;
            }
            member.fightOption.curController.setCurPos(member.fightOption.curX, member.fightOption.curY - diffY);
        };
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, member = this.fightBuff.member;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var mult = uw.buffBiz.calValue(valueType, value, value);
            this.high = mult * uw.Fight.unitPixel; //上升的高度
            var keepPer = 0.2;
            this.keepTime = fightBuff.conTime * keepPer; //保持时间
            this.speed = this.high / ((fightBuff.conTime - this.keepTime) / 2); //上升用和下降各用1半时间
            //打断技能
            member.fightOption.curController.breakSkill();
            this.status = 1;
            /*var upTime = (fightBuff.conTime-this.keepTime)/2;
             var moveUp = mo.moveBy(upTime,mo.p(0,this.high));
             var moveDown = mo.moveBy(upTime,mo.p(0,-this.high));
             var display = member.fightOption.curController.display;
             mo.sequence(moveUp,mo.delayTime(this.keepTime),moveDown);*/
        };
        //移除特效，特殊可重写
        __egretProto__.removeBuff = function (force) {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            _super.prototype.removeBuff.call(this, force);
            //播放受击
            if (!member.isDeath()) {
                uw.heroActionBiz.hit(member);
            }
            return true;
        };
        return _42;
    })(uw.FightBuffBaseCtrl);
    _42.prototype.__class__ = "uw._42";
    /**
     * 升龙击
     * 表现：上升，暂停，下来
     * @type {*|void|Function}
     */
    uw.fightBuffCtrl_41_60[uw.buffStateType.UP_DOWN] = _42;
    var _43 = (function (_super) {
        __extends(_43, _super);
        function _43() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _43.prototype;
        __egretProto__.myHandle = function () {
            //没啥好处理的
        };
        return _43;
    })(uw.FightBuffBaseCtrl);
    _43.prototype.__class__ = "uw._43";
    //无视眩晕
    uw.fightBuffCtrl_41_60[uw.buffStateType.RE_STUN] = _43;
    var _44 = (function (_super) {
        __extends(_44, _super);
        function _44() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _44.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.cloneNum = 1;
        };
        __egretProto__.addExBuff = function (member) {
            var fightBuff = this.fightBuff, fromMember = fightBuff.fromMember;
            //物免
            var buffData1 = uw.getBuffData(2000, 1);
            uw.buffBiz.addBuffToMember(fromMember, member, buffData1, false);
            //受魔法额外伤害
            var buffData2 = uw.getBuffData(2001, 1);
            uw.buffBiz.addBuffToMember(fromMember, member, buffData2, false);
        };
        return _44;
    })(uw.BUFF_CLONE_1);
    _44.prototype.__class__ = "uw._44";
    //制造出1个分身，拥有本体分身时的血量，拥有本体的X%防御与攻击力，持续时间，并且分身物理魔免，受到的魔法伤害翻倍
    uw.fightBuffCtrl_41_60[uw.buffStateType.CLONE_1_RE_P_ATTACK] = _44;
    var _45 = (function (_super) {
        __extends(_45, _super);
        function _45() {
            _super.apply(this, arguments);
            this.isHandleAfterAdd = false;
            this.hurt = 0;
        }
        var __egretProto__ = _45.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var hurt = uw.buffBiz.calValue(valueType, value, this.hurt);
            this.fromMember.fightOption.curController.calHp(-hurt, fightBuff.fromMember);
            uw.fightUtils.log("反弹,受反弹者：%s,伤害值:%d", this.fromMember.name, -hurt);
            //反弹文字
            uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.rebound);
        };
        //攻击时,自己受反弹伤害
        __egretProto__.hit = function (fromMember, hurt) {
            this.fromMember = fromMember;
            this.hurt = hurt;
            this.handle();
            return 0;
        };
        return _45;
    })(uw.FightBuffBaseCtrl);
    _45.prototype.__class__ = "uw._45";
    //反弹伤害
    uw.fightBuffCtrl_41_60[uw.buffStateType.ATTACK_REBOUND_HURT] = _45;
    var _46 = (function (_super) {
        __extends(_46, _super);
        function _46() {
            _super.apply(this, arguments);
            this.isHandleAfterAdd = false;
            this.hurtCount = 0; //一共可以抵消的伤害值
            this.hurtAdd = 0; //当前已经抵消的伤害值
            this.hurt = 0; //返回伤害值
        }
        var __egretProto__ = _46.prototype;
        __egretProto__.addBuff = function (fightBuff) {
            _super.prototype.addBuff.call(this, fightBuff);
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            this.hurtCount = uw.buffBiz.calValue(valueType, value, value);
        };
        __egretProto__.myHandle = function () {
            var skillType = this.fightSkill.skill.skillType;
            if (skillType != uw.skillType.PATTACK && skillType != uw.skillType.MATTACK) {
                return;
            }
            //黑武士特殊处理,
            if (this.fightBuff.fromMember.tid == uw.id_t_warrior.h_37) {
                this.memberDisplay.setPowerShield();
            }
            this.hurtAdd += this.hurt;
            if (this.hurtAdd >= this.hurtCount) {
                this.hurt = this.hurtCount - this.hurtAdd;
                this.removeBuff(false);
            }
            else {
                if (skillType == uw.skillType.PATTACK) {
                    //播放物免文字
                    uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.physicalImmune);
                }
                if (skillType == uw.skillType.MATTACK) {
                    //播放魔免文字
                    uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.magicImmune);
                }
                this.hurt = 0;
            }
        };
        __egretProto__.hit = function (fromMember, hurt, fightSkill) {
            this.fightSkill = fightSkill;
            this.hurt = hurt;
            if (fightSkill.skill.skillType != uw.skillType.MATTACK && fightSkill.skill.skillType != uw.skillType.PATTACK) {
                return hurt;
            }
            this.handle();
            return this.hurt;
        };
        return _46;
    })(uw.FightBuffBaseCtrl);
    _46.prototype.__class__ = "uw._46";
    //吸收物理和魔法伤害 （抵挡伤害）
    uw.fightBuffCtrl_41_60[uw.buffStateType.RE_P_ATTACK_HURT_M_ATTACK_HURT] = _46;
    var _47 = (function (_super) {
        __extends(_47, _super);
        function _47() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _47.prototype;
        __egretProto__.addBuff = function (fightBuff) {
            var member = fightBuff.member;
            member.fightOption.curController.breakSkill();
            _super.prototype.addBuff.call(this, fightBuff);
        };
        return _47;
    })(uw.FightBuffBaseCtrl);
    _47.prototype.__class__ = "uw._47";
    //睡眠
    uw.fightBuffCtrl_41_60[uw.buffStateType.SLEEP] = _47;
    var _48 = (function (_super) {
        __extends(_48, _super);
        function _48() {
            _super.apply(this, arguments);
            this.speed = 0;
            this.isFaceLeft = false;
        }
        var __egretProto__ = _48.prototype;
        __egretProto__.addBuff = function (buff) {
            _super.prototype.addBuff.call(this, buff);
            this.isFaceLeft = this.fightBuff.member.fightOption.curController.isFaceLeft;
        };
        __egretProto__.step = function (dt) {
            this.fightBuff.member.fightOption.curController.syncPos();
        };
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, member = this.fightBuff.member, fromMember = this.fightBuff.fromMember;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var mult = uw.buffBiz.calValue(valueType, value, value);
            var length = mult * uw.Fight.unitPixel; //前方的距离
            this.speed = length / fightBuff.conTime;
            //打断技能
            member.fightOption.curController.breakSkill();
            var fDisplay = fromMember.fightOption.curController.display;
            var selfPos = mo.p(fDisplay.x, fDisplay.y);
            var mDisplay = member.fightOption.curController.display;
            var targetPos = mo.p(mDisplay.x, mDisplay.y);
            var distance = selfPos.distanceTo(targetPos);
            //速度是1200
            var speed = 2200;
            var time = length / speed;
            if (time > fightBuff.conTime)
                time = fightBuff.conTime;
            //如果目标站位在距离之外，需要往回拉
            if (distance > length) {
                var movePos = uw.fightUtils.getPosBy2PointLength(selfPos, targetPos, length); //需要移动到的位置
                var moveAction = mo.moveTo(time, movePos);
                this.moveAction = moveAction;
                member.fightOption.curController.display.runAction(moveAction);
            }
        };
        //移除特效，特殊可重写
        __egretProto__.removeBuff = function (force) {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            member.fightOption.curController.syncPos();
            //移除移动
            _super.prototype.removeBuff.call(this, force);
            if (this.moveAction) {
                member.fightOption.curController.display.stopAction(this.moveAction);
            }
            return true;
        };
        return _48;
    })(uw.FightBuffBaseCtrl);
    _48.prototype.__class__ = "uw._48";
    /**
     * 拉到施法者XX距离
     * @type {*|void|Function}
     */
    uw.fightBuffCtrl_41_60[uw.buffStateType.PULL] = _48;
    var _49 = (function (_super) {
        __extends(_49, _super);
        function _49() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _49.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var baseHp = fightBuff.member.life;
            var hp = uw.buffBiz.calValue(valueType, value, baseHp);
            fightBuff.member.fightOption.curController.calHp(hp, fightBuff.fromMember);
            uw.fightUtils.log("恢复生命值hp:%d", hp);
        };
        return _49;
    })(uw.FightBuffBaseCtrl);
    _49.prototype.__class__ = "uw._49";
    /**
     * 根据体质回复生命
     * @type {*|void|Function}
     */
    uw.fightBuffCtrl_41_60[uw.buffStateType.ADD_HP_BY_LIFE] = _49;
    var _410 = (function (_super) {
        __extends(_410, _super);
        function _410() {
            _super.apply(this, arguments);
            this.isHandleAfterAdd = false;
            this.hurt = 0;
        }
        var __egretProto__ = _410.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var eHurt = uw.buffBiz.calValue(valueType, value, this.hurt);
            uw.fightUtils.log("受魔法额外伤害:%d", eHurt);
            this.hurt += eHurt;
        };
        //被打击时,返回减防数值，提供公式计算
        __egretProto__.hit = function (fromMember, hurt) {
            this.hurt = hurt;
            this.handle();
            return this.hurt;
        };
        return _410;
    })(uw.FightBuffBaseCtrl);
    _410.prototype.__class__ = "uw._410";
    /**
     * 受魔法额外伤害
     * @type {*|void|Function}
     */
    uw.fightBuffCtrl_41_60[uw.buffStateType.M_EXTRA_DAMAGE] = _410;
    var _411 = (function (_super) {
        __extends(_411, _super);
        function _411() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _411.prototype;
        __egretProto__.myHandle = function () {
        };
        return _411;
    })(uw.FightBuffBaseCtrl);
    _411.prototype.__class__ = "uw._411";
    /**
     * 无敌
     * @type {*|void|Function}
     */
    uw.fightBuffCtrl_41_60[uw.buffStateType.INVINCIBLE] = _411;
    var _412 = (function (_super) {
        __extends(_412, _super);
        function _412() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _412.prototype;
        __egretProto__.addBuff = function (fightBuff) {
            _super.prototype.addBuff.call(this, fightBuff);
            var fightBuff = this.fightBuff, member = fightBuff.member;
            uw.buffBiz.calChangeBody(member);
        };
        //移除特效，特殊可重写
        __egretProto__.removeBuff = function (force) {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            //移除击退
            _super.prototype.removeBuff.call(this, force);
            uw.buffBiz.calChangeBody(member);
            return true;
        };
        return _412;
    })(uw.FightBuffBaseCtrl);
    _412.prototype.__class__ = "uw._412";
    /**
     * 变身
     * @type {*|void|Function}
     */
    uw.fightBuffCtrl_41_60[uw.buffStateType.CHANGE_BODY] = _412;
    var _413 = (function (_super) {
        __extends(_413, _super);
        function _413() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _413.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, fromMember = fightBuff.fromMember;
            var buffId = fightBuff.buffData.value;
            //增加的buff
            var buffData1 = uw.getBuffData(buffId, 1);
            uw.buffBiz.addBuffToMember(fromMember, fightBuff.member, buffData1, false);
        };
        return _413;
    })(uw.FightBuffBaseCtrl);
    _413.prototype.__class__ = "uw._413";
    /**
     * 增加buff
     * @type {*|void|Function}
     */
    uw.fightBuffCtrl_41_60[uw.buffStateType.ADD_BUFF] = _413;
    var _414 = (function (_super) {
        __extends(_414, _super);
        function _414() {
            _super.apply(this, arguments);
            this.speed = 0;
            this.isFaceLeft = false;
        }
        var __egretProto__ = _414.prototype;
        __egretProto__.addBuff = function (buff) {
            _super.prototype.addBuff.call(this, buff);
            this.isFaceLeft = this.fightBuff.member.fightOption.curController.isFaceLeft;
        };
        __egretProto__.step = function (dt) {
            this.fightBuff.member.fightOption.curController.syncPos();
        };
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, member = this.fightBuff.member, fromMember = this.fightBuff.fromMember;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var mult = uw.buffBiz.calValue(valueType, value, value);
            var length = mult * uw.Fight.unitPixel; //前方的距离
            this.speed = length / fightBuff.conTime;
            //打断技能
            member.fightOption.curController.breakSkill();
            var fDisplay = fromMember.fightOption.curController.display;
            var pointPos = mo.p(fDisplay.x, fDisplay.y);
            if (this.isFaceLeft) {
                pointPos.x -= 560;
            }
            else {
                pointPos.x += 560;
            }
            var mDisplay = member.fightOption.curController.display;
            var targetPos = mo.p(mDisplay.x, mDisplay.y);
            var distance = pointPos.distanceTo(targetPos);
            length += distance;
            //速度是1200
            var speed = 1200;
            var time = length / speed;
            if (time > fightBuff.conTime)
                time = fightBuff.conTime;
            //计算最终移到的位置
            var movePos = uw.fightUtils.getPosBy2PointLength(pointPos, targetPos, length); //需要移动到的位置
            movePos = mo.pSub(movePos, targetPos);
            var moveAction = mo.moveBy(time, movePos);
            this.moveAction = moveAction;
            member.fightOption.curController.display.runAction(moveAction);
        };
        //移除特效，特殊可重写
        __egretProto__.removeBuff = function (force) {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            member.fightOption.curController.syncPos();
            //播放受击
            if (!member.isDeath()) {
            }
            //移除击退
            _super.prototype.removeBuff.call(this, force);
            if (this.moveAction) {
                member.fightOption.curController.display.stopAction(this.moveAction);
            }
            return true;
        };
        return _414;
    })(uw.FightBuffBaseCtrl);
    _414.prototype.__class__ = "uw._414";
    /**
     * 维嘉大招，围绕某个中心点扩散
     * @type {*|void|Function}
     */
    uw.fightBuffCtrl_41_60[uw.buffStateType.MOVE_CIRCLE_OUT] = _414;
})(uw || (uw = {}));

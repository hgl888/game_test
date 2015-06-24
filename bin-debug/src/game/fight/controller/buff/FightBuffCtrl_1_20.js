/**
 * Created by Administrator on 14-8-12.
 */
var uw;
(function (uw) {
    uw.fightBuffCtrl_1_20 = {};
    var _1 = (function (_super) {
        __extends(_1, _super);
        function _1() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _1.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var baseHp = fightBuff.member.baseData.hp;
            var hp = uw.buffBiz.calValue(valueType, value, baseHp);
            fightBuff.member.fightOption.curController.calHp(-hp, fightBuff.fromMember);
            uw.fightUtils.log("直接去血hp:%d", -hp);
        };
        return _1;
    })(uw.FightBuffBaseCtrl);
    _1.prototype.__class__ = "uw._1";
    /**
     * 扣除生命值
     * @type {*|void|Function}
     */
    uw.fightBuffCtrl_1_20[uw.buffStateType.DEL_HP] = _1;
    /**
     * 扣除能量值
     * @type {*|void|Function}
     */
    var _2 = (function (_super) {
        __extends(_2, _super);
        function _2() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _2.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var replayEnergy = uw.buffBiz.calValue(valueType, value, value);
            uw.fightEnergyCtrl.replayEnergy(fightBuff.member, -replayEnergy);
            uw.fightUtils.log("扣除能量值:%d", -replayEnergy);
        };
        return _2;
    })(uw.FightBuffBaseCtrl);
    _2.prototype.__class__ = "uw._2";
    uw.fightBuffCtrl_1_20[uw.buffStateType.DEL_ENERGY] = _2;
    //清除负面BUFF
    var _3 = (function (_super) {
        __extends(_3, _super);
        function _3() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _3.prototype;
        __egretProto__.myHandle = function () {
            uw.fightUtils.log("清除负面BUFF");
            var fightBuff = this.fightBuff;
            var curFightBuffDic = fightBuff.member.fightOption.curFightBuffDic;
            for (var key in curFightBuffDic) {
                var locFightBuff = curFightBuffDic[key];
                var locBuffData = locFightBuff.buffData;
                if (locBuffData.side == uw.buffSide.NEGATIVE) {
                    locFightBuff.controller.removeBuff();
                }
            }
        };
        return _3;
    })(uw.FightBuffBaseCtrl);
    _3.prototype.__class__ = "uw._3";
    uw.fightBuffCtrl_1_20[uw.buffStateType.CLEAR_NEGATIVE] = _3;
    //清除正面BUFF
    var _4 = (function (_super) {
        __extends(_4, _super);
        function _4() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _4.prototype;
        __egretProto__.myHandle = function () {
            uw.fightUtils.log("清除负面BUFF");
            var fightBuff = this.fightBuff;
            var curFightBuffDic = fightBuff.member.fightOption.curFightBuffDic;
            for (var key in curFightBuffDic) {
                var locFightBuff = curFightBuffDic[key];
                var locBuffData = locFightBuff.buffData;
                if (locBuffData.side == uw.buffSide.POSITIVE) {
                    locFightBuff.controller.removeBuff();
                }
            }
        };
        return _4;
    })(uw.FightBuffBaseCtrl);
    _4.prototype.__class__ = "uw._4";
    uw.fightBuffCtrl_1_20[uw.buffStateType.CLEAR_POSITIVE] = _4;
    /**
     * 恢复生命值
     * @type {*|void|Function}
     */
    var _5 = (function (_super) {
        __extends(_5, _super);
        function _5() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _5.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var baseHp = fightBuff.member.baseData.hp;
            var hp = uw.buffBiz.calValue(valueType, value, baseHp);
            fightBuff.member.fightOption.curController.calHp(hp, fightBuff.fromMember);
            uw.fightUtils.log("恢复生命值hp:%d", hp);
        };
        return _5;
    })(uw.FightBuffBaseCtrl);
    _5.prototype.__class__ = "uw._5";
    uw.fightBuffCtrl_1_20[uw.buffStateType.ADD_HP] = _5;
    /**
     * 恢复能量值
     * @type {*|void|Function}
     */
    var _6 = (function (_super) {
        __extends(_6, _super);
        function _6() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _6.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var replayEnergy = uw.buffBiz.calValue(valueType, value, value);
            uw.fightEnergyCtrl.replayEnergy(fightBuff.member, replayEnergy);
            uw.fightUtils.log("恢复能量值:%d", replayEnergy);
        };
        return _6;
    })(uw.FightBuffBaseCtrl);
    _6.prototype.__class__ = "uw._6";
    uw.fightBuffCtrl_1_20[uw.buffStateType.ADD_ENERGY] = _6;
    //增加角色属性数值
    var _7 = (function (_super) {
        __extends(_7, _super);
        function _7() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _7.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var effectType = fightBuff.buffData.effectType;
            var propKey = uw.buffBiz.getPropKeyByEffectType(member, effectType);
            var propValue = fightBuff.member.fightOption.curSelfProp[propKey];
            propValue = uw.buffBiz.calValue(valueType, value, propValue);
            //改变数值
            if (propKey == "hp") {
                //特殊增加生命上限
                var oldBaseHp = member.baseData.hp;
                //如果满血，则继续满血
                if (member.hp == oldBaseHp) {
                    member.hp += propValue;
                }
                member.baseData.hp += propValue;
                uw.fightHeroHpCtrl.setUpdateMember(member);
            }
            else {
                member[propKey] = member[propKey] + propValue;
            }
            //记住数值，移除时返回
            var prop = [propKey, propValue];
            fightBuff.valueArr.push(prop);
            uw.fightUtils.log("增加角色属性数值key:%s,value:%s", propKey, propValue);
            //如果是基础属性，需要兑换为对应的数值
            var ret = uw.fightBiz.convertBaseProp(propKey, propValue);
            for (var key in ret) {
                var locValue = ret[key];
                //改变数值
                member[key] = member[key] + locValue;
                //记住数值，移除时返回
                fightBuff.valueArr.push([key, locValue]);
                uw.fightUtils.log("增加角色属性数值key:%s,value:%s", key, locValue);
            }
        };
        __egretProto__.addDisplay = function () {
            _super.prototype.addDisplay.call(this);
            var fightBuff = this.fightBuff, member = fightBuff.member;
            var effectType = fightBuff.buffData.effectType;
            if (effectType == uw.c_prop.buffEffectTypeKey.pAttack) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.physicalAttackIncrease);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.pDefence) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.physicalDefenceIncrease);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.mAttack) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.magicAttackIncrease);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.mDefence) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.magicDefenceIncrease);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.suckBlood) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.bloodDrinkingIncrease);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.reCrit) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.critDefenceIncrease);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.crit) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.critIncrease);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.ignoreDefence) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.defenceOffsetIncrease);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.reHit) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.dodgeIncrease);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.hit) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.hitIncrease);
            }
        };
        //移除特效，特殊可重写
        __egretProto__.removeBuff = function (force) {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            if (_super.prototype.removeBuff.call(this, force)) {
                for (var i = 0; i < fightBuff.valueArr.length; i++) {
                    var locProp = fightBuff.valueArr[i];
                    var locPropKey = locProp[0];
                    var locPropValue = locProp[1];
                    if (locPropKey == "hp") {
                        member.baseData.hp -= locPropValue;
                        //如果血量大于上限，则等于上限
                        if (member.hp > member.baseData.hp) {
                            member.hp = member.baseData.hp;
                        }
                        uw.fightHeroHpCtrl.setUpdateMember(member);
                    }
                    else {
                        member[locPropKey] = member[locPropKey] - locPropValue;
                    }
                    uw.fightUtils.log("减少角色属性数值key:%s,value:%s", locPropKey, -locPropValue);
                }
            }
            return true;
        };
        return _7;
    })(uw.FightBuffBaseCtrl);
    _7.prototype.__class__ = "uw._7";
    uw.fightBuffCtrl_1_20[uw.buffStateType.ADD_ATTR] = _7;
    //减少角色属性数值
    var _8 = (function (_super) {
        __extends(_8, _super);
        function _8() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _8.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var effectType = fightBuff.buffData.effectType;
            var propKey = uw.buffBiz.getPropKeyByEffectType(member, effectType);
            var propValue = fightBuff.member.fightOption.curSelfProp[propKey];
            propValue = uw.buffBiz.calValue(valueType, value, propValue);
            //改变数值
            if (propKey == "hp") {
                //特殊增加生命上限
                member.baseData.hp -= propValue;
                //如果血量大于上限，则等于上限
                if (member.hp > member.baseData.hp) {
                    member.hp = member.baseData.hp;
                }
                uw.fightHeroHpCtrl.setUpdateMember(member);
            }
            else {
                member[propKey] = member[propKey] - propValue;
            }
            //记住数值，移除时返回
            var prop = [propKey, propValue];
            fightBuff.valueArr.push(prop);
            uw.fightUtils.log("减少角色属性数值key:%s,value:%s", propKey, -propValue);
            //如果是基础属性，需要兑换为对应的数值
            var ret = uw.fightBiz.convertBaseProp(propKey, propValue);
            for (var key in ret) {
                var locValue = ret[key];
                //改变数值
                member[key] = member[key] - locValue;
                //记住数值，移除时返回
                fightBuff.valueArr.push([key, locValue]);
                uw.fightUtils.log("减少角色属性数值key:%s,value:%s", key, -locValue);
            }
        };
        __egretProto__.addDisplay = function () {
            _super.prototype.addDisplay.call(this);
            var fightBuff = this.fightBuff, member = fightBuff.member;
            var effectType = fightBuff.buffData.effectType;
            if (effectType == uw.c_prop.buffEffectTypeKey.pAttack) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.physicalAttackReduce);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.pDefence) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.physicalDefenceReduce);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.mAttack) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.magicAttackReduce);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.mDefence) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.magicDefenceReduce);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.reCrit) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.critDefenceReduce);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.crit) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.critReduce);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.reHit) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.dodgeReduce);
            }
            if (effectType == uw.c_prop.buffEffectTypeKey.hit) {
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.hitReduce);
            }
        };
        //移除特效，特殊可重写
        __egretProto__.removeBuff = function (force) {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            if (_super.prototype.removeBuff.call(this, force)) {
                for (var i = 0; i < fightBuff.valueArr.length; i++) {
                    var locProp = fightBuff.valueArr[i];
                    var locPropKey = locProp[0];
                    var locPropValue = locProp[1];
                    if (locPropKey == "hp") {
                        //特殊增加生命上限
                        var oldBaseHp = member.baseData.hp;
                        //如果满血，则继续满血
                        if (member.hp == oldBaseHp) {
                            member.hp += locPropValue;
                        }
                        member.baseData.hp += locPropValue;
                        uw.fightHeroHpCtrl.setUpdateMember(member);
                    }
                    else {
                        member[locPropKey] = member[locPropKey] + locPropValue;
                    }
                    uw.fightUtils.log("增加角色属性数值key:%s,value:%s", locPropKey, locPropValue);
                }
            }
            return true;
        };
        return _8;
    })(uw.FightBuffBaseCtrl);
    _8.prototype.__class__ = "uw._8";
    uw.fightBuffCtrl_1_20[uw.buffStateType.REDUCE_ATTR] = _8;
    //物理减伤，被打击时，返回系数，提供公式使用
    var _9 = (function (_super) {
        __extends(_9, _super);
        function _9() {
            _super.apply(this, arguments);
            this.isHandleAfterAdd = false;
            this.hurt = 0;
        }
        var __egretProto__ = _9.prototype;
        __egretProto__.myHandle = function () {
            if (this.fightSkill.skill.skillType != uw.skillType.PATTACK)
                return;
            var fightBuff = this.fightBuff;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var absPHurt = uw.buffBiz.calValue(valueType, value, value);
            uw.fightUtils.log("吸收物理伤害值:%d", absPHurt);
            this.hurt -= absPHurt;
            if (this.hurt < 0)
                this.hurt = 0;
        };
        __egretProto__.hit = function (fromMember, hurt, fightSkill) {
            this.fightSkill = fightSkill;
            this.hurt = hurt;
            this.handle();
            return this.hurt;
        };
        return _9;
    })(uw.FightBuffBaseCtrl);
    _9.prototype.__class__ = "uw._9";
    uw.fightBuffCtrl_1_20[uw.buffStateType.ABS_P_HURT] = _9;
    //魔法减伤，被打击时，返回系数，提供公式使用
    var _10 = (function (_super) {
        __extends(_10, _super);
        function _10() {
            _super.apply(this, arguments);
            this.isHandleAfterAdd = false;
            this.hurt = 0;
        }
        var __egretProto__ = _10.prototype;
        __egretProto__.myHandle = function () {
            if (this.fightSkill.skill.skillType != uw.skillType.MATTACK)
                return;
            var fightBuff = this.fightBuff;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var absMHurt = uw.buffBiz.calValue(valueType, value, value);
            uw.fightUtils.log("吸收魔法伤害值:%d", absMHurt);
            this.hurt -= absMHurt;
            if (this.hurt < 0)
                this.hurt = 0;
        };
        //被打击时,返回减防数值，提供公式计算
        __egretProto__.hit = function (fromMember, hurt, fightSkill) {
            this.fightSkill = fightSkill;
            this.hurt = hurt;
            this.handle();
            return this.hurt;
        };
        return _10;
    })(uw.FightBuffBaseCtrl);
    _10.prototype.__class__ = "uw._10";
    uw.fightBuffCtrl_1_20[uw.buffStateType.ABS_M_HURT] = _10;
    //反弹伤害
    var _11 = (function (_super) {
        __extends(_11, _super);
        function _11() {
            _super.apply(this, arguments);
            this.isHandleAfterAdd = false;
            this.hurt = 0;
        }
        var __egretProto__ = _11.prototype;
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var hurt = uw.buffBiz.calValue(valueType, value, this.hurt);
            this.fromMember.fightOption.curController.calHp(-hurt, fightBuff.member);
            uw.fightUtils.log("反弹,受反弹者：%s,伤害值:%d", this.fromMember.name, -hurt);
            //反弹文字
            uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.rebound);
        };
        //被打击时,反弹伤害
        __egretProto__.hit = function (fromMember, hurt, fightSkill) {
            this.fromMember = fromMember;
            this.hurt = hurt;
            this.handle();
            return 0;
        };
        return _11;
    })(uw.FightBuffBaseCtrl);
    _11.prototype.__class__ = "uw._11";
    uw.fightBuffCtrl_1_20[uw.buffStateType.REBOUND_HURT] = _11;
    //晕眩
    var _12 = (function (_super) {
        __extends(_12, _super);
        function _12() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _12.prototype;
        __egretProto__.addBuff = function (fightBuff) {
            var member = fightBuff.member;
            //如果存在无视晕眩的buff，则无视
            var buff = uw.buffBiz.getBuffByStateType(member, uw.buffStateType.RE_STUN);
            if (buff)
                return;
            member.fightOption.curController.breakSkill();
            _super.prototype.addBuff.call(this, fightBuff);
        };
        __egretProto__.myHandle = function () {
        };
        __egretProto__.removeBuff = function (force) {
            var fightBuff = this.fightBuff, member = this.fightBuff.member;
            if (_super.prototype.removeBuff.call(this, force)) {
            }
            return true;
        };
        return _12;
    })(uw.FightBuffBaseCtrl);
    _12.prototype.__class__ = "uw._12";
    uw.fightBuffCtrl_1_20[uw.buffStateType.STUN] = _12;
    //封技 buff携带者不能释放除了普通攻击之外的技能
    var _13 = (function (_super) {
        __extends(_13, _super);
        function _13() {
            _super.apply(this, arguments);
            this.isHandleAfterAdd = false;
            this.skillIndex = 0;
        }
        var __egretProto__ = _13.prototype;
        __egretProto__.addBuff = function (buff) {
            _super.prototype.addBuff.call(this, buff);
            var fightBuff = this.fightBuff, member = this.fightBuff.member;
            member.fightOption.curController.breakSkill();
        };
        return _13;
    })(uw.FightBuffBaseCtrl);
    _13.prototype.__class__ = "uw._13";
    uw.fightBuffCtrl_1_20[uw.buffStateType.SEAL] = _13;
    //击退，以格子为单位
    var _14 = (function (_super) {
        __extends(_14, _super);
        function _14() {
            _super.apply(this, arguments);
            this.speed = 0;
            this.isFaceLeft = false;
        }
        var __egretProto__ = _14.prototype;
        __egretProto__.addBuff = function (buff) {
            _super.prototype.addBuff.call(this, buff);
            this.isFaceLeft = this.fightBuff.member.fightOption.curController.isFaceLeft;
        };
        __egretProto__.step = function (dt) {
            this._calMove(dt);
        };
        __egretProto__._calMove = function (dt) {
            var fightBuff = this.fightBuff, member = this.fightBuff.member;
            var diffX = this.speed * dt;
            if (!this.isFaceLeft) {
                diffX *= -1;
            }
            member.fightOption.curController.setCurPos(member.fightOption.curX + diffX, member.fightOption.curY);
        };
        __egretProto__.myHandle = function () {
            var fightBuff = this.fightBuff, member = this.fightBuff.member;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            var mult = uw.buffBiz.calValue(valueType, value, value);
            var length = mult * uw.Fight.unitPixel; //击退的距离
            this.speed = length / fightBuff.conTime;
            //打断技能
            member.fightOption.curController.breakSkill();
            //播放受击
            uw.heroActionBiz.hit(member);
        };
        return _14;
    })(uw.FightBuffBaseCtrl);
    _14.prototype.__class__ = "uw._14";
    uw.fightBuffCtrl_1_20[uw.buffStateType.HIT_BACK] = _14;
    //物免 （持续时间）
    var _15 = (function (_super) {
        __extends(_15, _super);
        function _15() {
            _super.apply(this, arguments);
            this.isHandleAfterAdd = false;
            this.hurt = 0;
        }
        var __egretProto__ = _15.prototype;
        __egretProto__.myHandle = function () {
            if (this.fightSkill.skill.skillType != uw.skillType.PATTACK)
                return;
            uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.physicalImmune);
            this.hurt = 0;
        };
        __egretProto__.hit = function (fromMember, hurt, fightSkill) {
            this.fightSkill = fightSkill;
            this.hurt = hurt;
            this.handle();
            return this.hurt;
        };
        return _15;
    })(uw.FightBuffBaseCtrl);
    _15.prototype.__class__ = "uw._15";
    uw.fightBuffCtrl_1_20[uw.buffStateType.RE_P_ATTACK] = _15;
    //魔免 （持续时间）
    var _16 = (function (_super) {
        __extends(_16, _super);
        function _16() {
            _super.apply(this, arguments);
            this.isHandleAfterAdd = false;
            this.hurt = 0;
        }
        var __egretProto__ = _16.prototype;
        __egretProto__.myHandle = function () {
            if (this.fightSkill.skill.skillType != uw.skillType.MATTACK)
                return;
            //播放魔免文字
            uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.magicImmune);
            this.hurt = 0;
        };
        __egretProto__.hit = function (fromMember, hurt, fightSkill) {
            this.fightSkill = fightSkill;
            this.hurt = hurt;
            this.handle();
            return this.hurt;
        };
        return _16;
    })(uw.FightBuffBaseCtrl);
    _16.prototype.__class__ = "uw._16";
    uw.fightBuffCtrl_1_20[uw.buffStateType.RE_M_ATTACK] = _16;
    //物免 （抵挡伤害）
    var _17 = (function (_super) {
        __extends(_17, _super);
        function _17() {
            _super.apply(this, arguments);
            this.isHandleAfterAdd = false;
            this.hurtCount = 0; //一共可以抵消的伤害值
            this.hurtAdd = 0; //当前已经抵消的伤害值
            this.hurt = 0; //返回伤害值
        }
        var __egretProto__ = _17.prototype;
        __egretProto__.addBuff = function (fightBuff) {
            _super.prototype.addBuff.call(this, fightBuff);
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            this.hurtCount = uw.buffBiz.calValue(valueType, value, value);
        };
        __egretProto__.myHandle = function () {
            if (this.fightSkill.skill.skillType != uw.skillType.PATTACK)
                return;
            this.hurtAdd += this.hurt;
            if (this.hurtAdd >= this.hurtCount) {
                //吸收完移除
                this.hurt = this.hurtCount - this.hurtAdd;
                this.removeBuff(false);
            }
            else {
                //播放物免文字
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.physicalImmune);
                this.hurt = 0;
            }
        };
        __egretProto__.hit = function (fromMember, hurt, fightSkill) {
            this.fightSkill = fightSkill;
            this.hurt = hurt;
            this.handle();
            return this.hurt;
        };
        return _17;
    })(uw.FightBuffBaseCtrl);
    _17.prototype.__class__ = "uw._17";
    uw.fightBuffCtrl_1_20[uw.buffStateType.RE_P_ATTACK_HURT] = _17;
    //魔免 （抵挡伤害）
    var _18 = (function (_super) {
        __extends(_18, _super);
        function _18() {
            _super.apply(this, arguments);
            this.isHandleAfterAdd = false;
            this.hurtCount = 0; //一共可以抵消的伤害值
            this.hurtAdd = 0; //当前已经抵消的伤害值
            this.hurt = 0; //返回伤害值
        }
        var __egretProto__ = _18.prototype;
        __egretProto__.addBuff = function (fightBuff) {
            _super.prototype.addBuff.call(this, fightBuff);
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            this.hurtCount = uw.buffBiz.calValue(valueType, value, value);
        };
        __egretProto__.myHandle = function () {
            if (this.fightSkill.skill.skillType != uw.skillType.MATTACK)
                return;
            this.hurtAdd += this.hurt;
            if (this.hurtAdd >= this.hurtCount) {
                this.hurt = this.hurtCount - this.hurtAdd;
                this.removeBuff(false);
            }
            else {
                //播放魔免文字
                uw.FightShowBuffText.create(this.getIconPos(), uw.FightShowBuffText.magicImmune);
                this.hurt = 0;
            }
        };
        __egretProto__.hit = function (fromMember, hurt, fightSkill) {
            this.fightSkill = fightSkill;
            this.hurt = hurt;
            this.handle(fightSkill, hurt);
            return this.hurt;
        };
        return _18;
    })(uw.FightBuffBaseCtrl);
    _18.prototype.__class__ = "uw._18";
    uw.fightBuffCtrl_1_20[uw.buffStateType.RE_M_ATTACK_HURT] = _18;
    //破防，特殊处理
    var _19 = (function (_super) {
        __extends(_19, _super);
        function _19() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _19.prototype;
        __egretProto__.attack = function () {
        };
        return _19;
    })(uw.FightBuffBaseCtrl);
    _19.prototype.__class__ = "uw._19";
    uw.fightBuffCtrl_1_20[uw.buffStateType.IGNORE_DEFENCE] = _19;
    //重生，这是一个被动buff，
    var _20 = (function (_super) {
        __extends(_20, _super);
        function _20() {
            _super.apply(this, arguments);
            this.handleNum = 0; //只能重生一次
            this.isHandleAfterAdd = false;
        }
        var __egretProto__ = _20.prototype;
        __egretProto__.addBuff = function (fightBuff) {
            var member = fightBuff.member;
            member.fightOption.curRevivalBuff = fightBuff;
            _super.prototype.addBuff.call(this, fightBuff);
        };
        __egretProto__.myHandle = function () {
            //重生完处理
            var fightBuff = this.fightBuff, member = fightBuff.member;
            var valueType = fightBuff.buffData.valueType;
            var value = fightBuff.buffData.value;
            //回血
            var baseHp = member.baseData.hp;
            var hp = uw.buffBiz.calValue(valueType, value, baseHp);
            member.hp = hp;
            this.memberDisplay.addBloodProgress(hp, member.hp, member.baseData.hp);
            uw.fightHeroHpCtrl.setUpdateMember(member);
            //永久buff计算
            uw.passiveSkillBiz.calFightBefore(member);
            member.fightOption.curRevivalBuff = null;
            member.fightOption.curController.setStatus(uw.memberStatus.NORMAL);
            this.removeBuff(false);
        };
        __egretProto__.playDisplay = function () {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            process.nextTick(function () {
                if (uw.Fight.isExit)
                    return;
                //复活
                member.fightOption.curController.setStatus(uw.memberStatus.SKILL);
                //播放重生的动作
                this.memberDisplay.skillAttack3();
            }, this);
        };
        return _20;
    })(uw.FightBuffBaseCtrl);
    _20.prototype.__class__ = "uw._20";
    uw.fightBuffCtrl_1_20[uw.buffStateType.REVIVAL] = _20;
})(uw || (uw = {}));

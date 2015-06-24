/**
 * Created by Administrator on 14-7-30.
 */
var uw;
(function (uw) {
    var FightEnergyCtrl = (function (_super) {
        __extends(FightEnergyCtrl, _super);
        function FightEnergyCtrl() {
            _super.apply(this, arguments);
            this.hitEnergyReplay = 0; //每次受击恢复的能量值
            this.hitEnergyMult = 0; //每次受击恢复的能量值 伤害/生命值上限乘以的系数
            this.sUserCurEnergy0 = 0; //己方秘术能量槽0的能量
            this.sUserCurEnergy1 = 0; //己方秘术能量槽1的能量
            this.eUserCurEnergy0 = 0; //对方秘术能量槽0的能量
            this.eUserCurEnergy1 = 0; //对方秘术能量槽1的能量
        }
        var __egretProto__ = FightEnergyCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var fightHitEnergyReplay = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.fightHitEnergyReplay);
            this.hitEnergyReplay = fightHitEnergyReplay[0];
            this.hitEnergyMult = fightHitEnergyReplay[1];
            this.sUserEmptyTime0 = Date.now();
            this.sUserEmptyTime1 = Date.now() + 1;
            this.eUserEmptyTime0 = Date.now();
            this.eUserEmptyTime1 = Date.now() + 1;
        };
        __egretProto__._addUserCurEnergy = function (isChallenger, energy) {
            var energyType = this._getEmptyUserType(isChallenger);
            if (energyType == -1)
                return;
            if (isChallenger) {
                this._addSelfUserCurEnergy(energy, energyType);
            }
            else {
                this._addEnemyUserCurEnergy(energy, energyType);
            }
        };
        __egretProto__._getEmptyUserType = function (isChallenger) {
            if (isChallenger) {
                if (this.sUserEmptyTime0 < this.sUserEmptyTime1) {
                    var maxEnergy = this._getUserMaxEnergy(true, this.__class.ENERGY_TYPE.USER0);
                    if (this.sUserCurEnergy0 < maxEnergy)
                        return this.__class.ENERGY_TYPE.USER0;
                    maxEnergy = this._getUserMaxEnergy(true, this.__class.ENERGY_TYPE.USER1);
                    if (this.sUserCurEnergy1 < maxEnergy)
                        return this.__class.ENERGY_TYPE.USER1;
                }
                else {
                    var maxEnergy = this._getUserMaxEnergy(true, this.__class.ENERGY_TYPE.USER1);
                    if (this.sUserCurEnergy1 < maxEnergy)
                        return this.__class.ENERGY_TYPE.USER1;
                    maxEnergy = this._getUserMaxEnergy(true, this.__class.ENERGY_TYPE.USER0);
                    if (this.sUserCurEnergy0 < maxEnergy)
                        return this.__class.ENERGY_TYPE.USER0;
                }
            }
            else {
                if (this.eUserEmptyTime0 < this.eUserEmptyTime1) {
                    var maxEnergy = this._getUserMaxEnergy(true, this.__class.ENERGY_TYPE.USER0);
                    if (this.eUserCurEnergy0 < maxEnergy)
                        return this.__class.ENERGY_TYPE.USER0;
                    maxEnergy = this._getUserMaxEnergy(true, this.__class.ENERGY_TYPE.USER1);
                    if (this.eUserCurEnergy1 < maxEnergy)
                        return this.__class.ENERGY_TYPE.USER1;
                }
                else {
                    var maxEnergy = this._getUserMaxEnergy(true, this.__class.ENERGY_TYPE.USER1);
                    if (this.eUserCurEnergy1 < maxEnergy)
                        return this.__class.ENERGY_TYPE.USER1;
                    maxEnergy = this._getUserMaxEnergy(true, this.__class.ENERGY_TYPE.USER0);
                    if (this.eUserCurEnergy0 < maxEnergy)
                        return this.__class.ENERGY_TYPE.USER0;
                }
            }
            return -1;
        };
        __egretProto__._addSelfUserCurEnergy = function (energy, energyType) {
            uw.fightUtils.log("己方秘术槽得到能量：%d", energy);
            if (energy == 0)
                return;
            if (energyType == this.__class.ENERGY_TYPE.USER0) {
                var maxEnergy = this._getUserMaxEnergy(true, this.__class.ENERGY_TYPE.USER0);
                this.sUserCurEnergy0 += energy;
                if (this.sUserCurEnergy0 > maxEnergy) {
                    var outEnergy = this.sUserCurEnergy0 - maxEnergy;
                    this.sUserCurEnergy0 = maxEnergy;
                    this._addUserCurEnergy(true, outEnergy);
                }
            }
            else {
                var maxEnergy = this._getUserMaxEnergy(true, this.__class.ENERGY_TYPE.USER1);
                this.sUserCurEnergy1 += energy;
                if (this.sUserCurEnergy1 > maxEnergy) {
                    var outEnergy = this.sUserCurEnergy1 - maxEnergy;
                    this.sUserCurEnergy1 = maxEnergy;
                    this._addUserCurEnergy(true, outEnergy);
                }
            }
            uw.fightUserEnergyCtrl.setUpdateSkillDirty();
        };
        __egretProto__._getUserMaxEnergy = function (isChallenger, energyType) {
            var max = 0;
            if (isChallenger) {
                var sHandSkillCtrl = uw.fightSelfHandSkillCtrl;
                var curFightSkill;
                if (energyType == this.__class.ENERGY_TYPE.USER0)
                    curFightSkill = sHandSkillCtrl.allUserSkills[0];
                else
                    curFightSkill = sHandSkillCtrl.allUserSkills[1];
                if (curFightSkill)
                    max = curFightSkill.skill.energyNeed;
            }
            else {
                var eHandSkillCtrl = uw.fightEnemyHandSkillCtrl;
                var curFightSkill;
                if (energyType == this.__class.ENERGY_TYPE.USER0)
                    curFightSkill = eHandSkillCtrl.allUserSkills[0];
                else
                    curFightSkill = eHandSkillCtrl.allUserSkills[1];
                if (curFightSkill)
                    max = curFightSkill.skill.energyNeed;
            }
            return max;
        };
        __egretProto__._addEnemyUserCurEnergy = function (energy, energyType) {
            uw.fightUtils.log("敌方秘术槽得到能量：%d", energy);
            if (energyType == this.__class.ENERGY_TYPE.USER0) {
                var maxEnergy = this._getUserMaxEnergy(true, this.__class.ENERGY_TYPE.USER0);
                this.eUserCurEnergy0 += energy;
                if (this.eUserCurEnergy0 > maxEnergy) {
                    var outEnergy = this.eUserCurEnergy0 - maxEnergy;
                    this.eUserCurEnergy0 = maxEnergy;
                    this._addUserCurEnergy(false, outEnergy);
                }
            }
            else {
                var maxEnergy = this._getUserMaxEnergy(true, this.__class.ENERGY_TYPE.USER1);
                this.eUserCurEnergy1 += energy;
                if (this.eUserCurEnergy1 > maxEnergy) {
                    var outEnergy = this.eUserCurEnergy1 - maxEnergy;
                    this.eUserCurEnergy1 = maxEnergy;
                    this._addUserCurEnergy(false, outEnergy);
                }
            }
        };
        __egretProto__._reduceUserCurEnergy = function (isChallenger, energy, energyType) {
            if (isChallenger) {
                if (energyType == this.__class.ENERGY_TYPE.USER0) {
                    this.sUserCurEnergy0 -= energy;
                    if (this.sUserCurEnergy0 <= 0)
                        this.sUserEmptyTime0 = Date.now();
                }
                else {
                    this.sUserCurEnergy1 -= energy;
                    if (this.sUserCurEnergy1 <= 0)
                        this.sUserEmptyTime1 = Date.now();
                }
            }
            else {
                if (energyType == this.__class.ENERGY_TYPE.USER0) {
                    this.eUserCurEnergy0 -= energy;
                    if (this.eUserCurEnergy0 <= 0)
                        this.eUserEmptyTime0 = Date.now();
                }
                else {
                    this.eUserCurEnergy1 -= energy;
                    if (this.eUserCurEnergy1 <= 0)
                        this.eUserEmptyTime1 = Date.now();
                }
            }
            this._calLimitUserEnergy(isChallenger);
        };
        //计算限制秘术能量溢出
        __egretProto__._calLimitUserEnergy = function (isChallenger) {
            if (isChallenger) {
                //限制不能小于0
                if (this.sUserCurEnergy0 < 0)
                    this.sUserCurEnergy0 = 0;
                if (this.sUserCurEnergy1 < 0)
                    this.sUserCurEnergy1 = 0;
            }
            else {
                //限制不能小于0
                if (this.eUserCurEnergy0 < 0)
                    this.eUserCurEnergy0 = 0;
                if (this.eUserCurEnergy1 < 0)
                    this.eUserCurEnergy1 = 0;
            }
        };
        __egretProto__.fightBefore = function () {
            uw.fightHeroEnergyCtrl.initEnergyDic();
            uw.fightUserEnergyCtrl.initEnergyDic();
        };
        //恢复能量
        __egretProto__.replayEnergy = function (member, energyReply) {
            member.addEnergy(energyReply);
            //除了使用秘术，其他地方不会扣除秘术的能量值
            if (energyReply >= 0) {
                this._addUserCurEnergy(member.fightOption.curIsChallenger, energyReply);
            }
        };
        //计算被打恢复能量值
        __egretProto__.calHitReplayEnergy = function (member, hurt) {
            var replayEnergy = this.hitEnergyReplay + (hurt / member.baseData.hp) * this.hitEnergyMult;
            member.addEnergy(replayEnergy);
            this._addUserCurEnergy(member.fightOption.curIsChallenger, replayEnergy);
        };
        //计算施法恢复能量
        __egretProto__.calSkillReplayEnergy = function (member, fightSkill) {
            var replayEnergy = fightSkill.skill.energyReply;
            member.addEnergy(replayEnergy);
            this._addUserCurEnergy(member.fightOption.curIsChallenger, replayEnergy);
        };
        //计算施法消耗能量
        __egretProto__.calSkillUseEnergy = function (isChallenger, fightSkill) {
            var ENERGY_TYPE = this.__class.ENERGY_TYPE;
            var energyNeed = fightSkill.skill.energyNeed;
            if (fightSkill.energyType == ENERGY_TYPE.USER0 || fightSkill.energyType == ENERGY_TYPE.USER1) {
                this._reduceUserCurEnergy(isChallenger, energyNeed, fightSkill.energyType);
            }
            else if (fightSkill.energyType == ENERGY_TYPE.MIX) {
                fightSkill.member.addEnergy(-energyNeed);
            }
        };
        FightEnergyCtrl.__className = "FightEnergyCtrl";
        FightEnergyCtrl.ON_SET_DIFFENERGY = "onSetDiffEnergy";
        FightEnergyCtrl.ENERGY_TYPE = {
            USER0: 0,
            USER1: 1,
            MIX: 2 //大招
        };
        return FightEnergyCtrl;
    })(mo.DataController);
    uw.FightEnergyCtrl = FightEnergyCtrl;
    FightEnergyCtrl.prototype.__class__ = "uw.FightEnergyCtrl";
})(uw || (uw = {}));

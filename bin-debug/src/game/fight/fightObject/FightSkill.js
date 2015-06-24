/**
 * Created by Administrator on 14-3-12.
 */
var uw;
(function (uw) {
    var FightSkill = (function (_super) {
        __extends(FightSkill, _super);
        function FightSkill() {
            _super.apply(this, arguments);
            this.unitId = 0; //唯一id
            this.index = 0; //下标
            this.attackDistance = 0; //攻击距离，像素
            this.hurtCount = 0; //第几次攻击
            this.isCanUse = false; //是否可以使用
            this.isInAttackDistance = false; //是否在攻击距离内
            this.cdTime = 0; //技能被使用后的cd时间
            this.mixIsChallenger = false; //是否己方秘术技能
            this.playCount = 0; //当前回合播放次数
            this.prepareTime = 0; //技能预动作施法时间
            this.energyType = 0; //技能消耗能量类型
        }
        var __egretProto__ = FightSkill.prototype;
        //是否领主秘术
        __egretProto__.isUserSkill = function () {
            return this.skillDisplay[uw.t_skillDisplay_type] == uw.skillDisplayType.SECRET;
        };
        //是否奥义
        __egretProto__.isMix = function () {
            return this.skillDisplay[uw.t_skillDisplay_type] == uw.skillDisplayType.MIX;
        };
        //判断是否在攻击范围内
        __egretProto__.checkMixAttackDistance = function () {
            var locIsIn = false;
            var enemy = this.member.fightOption.curController.enemyFrontMember;
            if (enemy) {
                if (this.attackDistance >= Math.abs(enemy.fightOption.curX - this.member.fightOption.curX)) {
                    locIsIn = true;
                }
            }
            if (locIsIn != this.isInAttackDistance) {
                this.isInAttackDistance = locIsIn;
            }
        };
        //判断是否可以使用
        __egretProto__.checkCanUse = function (isChallenger) {
            var self = this;
            //攻击距离
            if (self.isMix() && !self.isInAttackDistance) {
                self.setCanUse(false);
                return;
            }
            var member = self.member;
            //英雄技能需要判断禁魔
            if (member) {
                //死亡，战斗显示区域外不能够释放技能
                if (member.isDeath()) {
                    self.setCanUse(false);
                    return;
                }
                if (member.fightOption.curRevivalBuff) {
                    self.setCanUse(false);
                    return;
                }
                //限制攻击
                if (member.fightOption.curBuffLimitAttack) {
                    self.setCanUse(false);
                    return;
                }
                //限制技能
                if (member.fightOption.curLimitSkill) {
                    self.setCanUse(false);
                    return;
                }
                //打怪物，玩家施放技能时，怪物不能施放技能
                if (uw.fightMainCtrl.isFightWithMonster && !member.fightOption.curIsChallenger) {
                    if (uw.fightActionPauseCtrl.isSelfPause()) {
                        self.setCanUse(false);
                        return;
                    }
                }
            }
            var curEnergy = 0, energyCtrl = uw.fightEnergyCtrl, energyNeed = 0, ENERGY_TYPE = uw.FightEnergyCtrl.ENERGY_TYPE;
            if (self.energyType == ENERGY_TYPE.USER0) {
                curEnergy = isChallenger ? energyCtrl.sUserCurEnergy0 : energyCtrl.eUserCurEnergy0;
            }
            else if (self.energyType == ENERGY_TYPE.USER1) {
                curEnergy = isChallenger ? energyCtrl.sUserCurEnergy1 : energyCtrl.eUserCurEnergy1;
            }
            else if (self.energyType == ENERGY_TYPE.MIX) {
                curEnergy = self.member.fightOption.curEnergy;
            }
            energyNeed = self.skill.energyNeed;
            if (curEnergy >= energyNeed) {
                self.setCanUse(true);
            }
            else {
                self.setCanUse(false);
            }
        };
        __egretProto__.setCanUse = function (bool) {
            var self = this;
            if (self.isCanUse != bool) {
                //变化
                self.isCanUse = bool;
                if (self.energyType == uw.FightEnergyCtrl.ENERGY_TYPE.MIX) {
                    uw.fightHeroEnergyCtrl.setCanUseMix(bool, self.member);
                }
                else {
                    uw.fightUserEnergyCtrl.setCanUseSkill(bool, self);
                }
            }
        };
        //克隆新的,唯一号也是一样的
        __egretProto__.clone = function () {
            var f = new uw.FightSkill();
            f.unitId = this.unitId;
            f.member = this.member;
            f.skill = this.skill; //技能数据
            f.interval = this.interval; //攻击间隔
            f.index = this.index; //下标
            f.skillDisplay = this.skillDisplay; //技能表现
            f.attackDistance = this.attackDistance; //攻击距离，像素
            f.mixIsChallenger = this.mixIsChallenger; //是否挑战方方技能
            f.prepareTime = this.prepareTime; //技能预动作时间
            f.energyType = this.energyType; //技能预动作时间
            f.targetArea = this.targetArea; //技能预动作时间
            return f;
        };
        FightSkill.create = function (member, skill, mixIsChallenger) {
            if (mixIsChallenger === void 0) { mixIsChallenger = false; }
            var fightSkill = new this();
            fightSkill.unitId = uw.fightUtils.getNewId(skill.id + "_");
            fightSkill.member = member;
            fightSkill.skill = skill;
            fightSkill.mixIsChallenger = mixIsChallenger;
            var showId = skill.showId;
            if (showId) {
                var skillDisplay = mo.getJSONWithFileNameAndID(uw.cfg_t_skillDisplay, showId);
                var attackDistance = skillDisplay[uw.t_skillDisplay_attackDistance] * uw.Fight.unitPixel;
                fightSkill.interval = skillDisplay[uw.t_skillDisplay_interval] * mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.fightConfig)[1];
                fightSkill.attackDistance = attackDistance || 9999999;
                fightSkill.skillDisplay = skillDisplay;
            }
            return fightSkill;
        };
        return FightSkill;
    })(mo.Class);
    uw.FightSkill = FightSkill;
    FightSkill.prototype.__class__ = "uw.FightSkill";
})(uw || (uw = {}));

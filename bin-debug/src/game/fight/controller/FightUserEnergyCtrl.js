/**
 * Created by Administrator on 2015/2/10.
 */
var uw;
(function (uw) {
    var FightUserEnergyCtrl = (function (_super) {
        __extends(FightUserEnergyCtrl, _super);
        function FightUserEnergyCtrl() {
            _super.apply(this, arguments);
            this._speed1 = 100; //耗和加满，速度加快
            this._speed = 20; //速度
        }
        var __egretProto__ = FightUserEnergyCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._updatePercentDic = {};
            this._endPercentDic = {};
        };
        //初始化，主要是大招人物位置
        __egretProto__.initEnergyDic = function () {
            var ENERGY_TYPE = uw.FightEnergyCtrl.ENERGY_TYPE;
            this._updatePercentDic[ENERGY_TYPE.USER0] = 10;
            this._updatePercentDic[ENERGY_TYPE.USER1] = 10;
            this._endPercentDic[ENERGY_TYPE.USER0] = 0;
            this._endPercentDic[ENERGY_TYPE.USER1] = 0;
        };
        //设置dirty
        __egretProto__.setUpdateSkillDirty = function () {
            var energyCtrl = uw.fightEnergyCtrl;
            var fightSkill0 = uw.fightSelfHandSkillCtrl.allUserSkills[0];
            if (fightSkill0) {
                var curEnergy = energyCtrl.sUserCurEnergy0;
                var percent = curEnergy / fightSkill0.skill.energyNeed * 100;
                this._endPercentDic[fightSkill0.energyType] = Math.ceil(percent);
            }
            var fightSkill1 = uw.fightSelfHandSkillCtrl.allUserSkills[1];
            if (fightSkill1) {
                var curEnergy = energyCtrl.sUserCurEnergy1;
                var percent = curEnergy / fightSkill1.skill.energyNeed * 100;
                this._endPercentDic[fightSkill1.energyType] = Math.ceil(percent);
            }
        };
        __egretProto__.update = function (dt) {
            var self = this;
            for (var key in self._updatePercentDic) {
                self.updatePercent(dt, key);
            }
        };
        __egretProto__.updatePercent = function (dt, key) {
            var self = this;
            var locUpdatePos = parseInt(key);
            var locUpdatePercent = self._updatePercentDic[key];
            var locEndPercent = self._endPercentDic[key];
            //已经使用光
            if (locEndPercent == 0 && locUpdatePercent != 0) {
                locCurPercent = locEndPercent;
                self.pushNotifyAtOnce(self.__class.SET_USER_SKILL_ENERGY_PERCENT, locCurPercent, locUpdatePos);
                self._updatePercentDic[key] = locCurPercent;
                return;
            }
            //已经满
            if (locEndPercent == 100 && locUpdatePercent != 100) {
                var locCurPercent = locUpdatePercent + self._speed1 * dt;
                if (locCurPercent > locEndPercent) {
                    locCurPercent = locEndPercent;
                }
                self.pushNotifyAtOnce(self.__class.SET_USER_SKILL_ENERGY_PERCENT, locCurPercent, locUpdatePos);
                self._updatePercentDic[key] = locCurPercent;
                return;
            }
            //没使用光
            if (locUpdatePercent < locEndPercent) {
                var locCurPercent = locUpdatePercent + self._speed * dt;
                if (locCurPercent > locEndPercent) {
                    locCurPercent = locEndPercent;
                }
                self.pushNotifyAtOnce(self.__class.SET_USER_SKILL_ENERGY_PERCENT, locCurPercent, locUpdatePos);
                self._updatePercentDic[key] = locCurPercent;
            }
            else if (locUpdatePercent > locEndPercent) {
                var locCurPercent = locUpdatePercent - self._speed * dt;
                if (locCurPercent < locEndPercent) {
                    locCurPercent = locEndPercent;
                }
                self.pushNotifyAtOnce(self.__class.SET_USER_SKILL_ENERGY_PERCENT, locCurPercent, locUpdatePos);
                self._updatePercentDic[key] = locCurPercent;
            }
        };
        __egretProto__.setCanUseSkill = function (bool, fightSkill) {
            if (!fightSkill.mixIsChallenger)
                return;
            var self = this;
            self.pushNotifyAtOnce(self.__class.SET_USER_SKILL_CAN_USE, bool, fightSkill.energyType);
        };
        FightUserEnergyCtrl.__className = "FightUserEnergyCtrl";
        FightUserEnergyCtrl.SET_USER_SKILL_ENERGY_PERCENT = "setUserSkillPercent";
        FightUserEnergyCtrl.SET_USER_SKILL_CAN_USE = "setUserSkillCanUse";
        return FightUserEnergyCtrl;
    })(mo.DataController);
    uw.FightUserEnergyCtrl = FightUserEnergyCtrl;
    FightUserEnergyCtrl.prototype.__class__ = "uw.FightUserEnergyCtrl";
})(uw || (uw = {}));

/**
 * Created by Administrator on 2015/2/10.
 */
var uw;
(function (uw) {
    var FightHeroEnergyCtrl = (function (_super) {
        __extends(FightHeroEnergyCtrl, _super);
        function FightHeroEnergyCtrl() {
            _super.apply(this, arguments);
            this._speed1 = 100; //速度
            this._speed = 50; //速度
        }
        var __egretProto__ = FightHeroEnergyCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._updatePercentDic = {};
            this._endPercentDic = {};
        };
        //初始化，主要是大招人物位置
        __egretProto__.initEnergyDic = function () {
            var sMembers = uw.fightMainCtrl.selfFightMembers;
            for (var i = 0; i < sMembers.length; i++) {
                var locMember = sMembers[i];
                this._updatePercentDic[locMember.fightOption.curPos] = 0.1;
                this._endPercentDic[locMember.fightOption.curPos] = 0;
            }
        };
        //设置dirty
        __egretProto__.setUpdateMember = function (member) {
            //敌方不需要
            if (!member.fightOption.curIsChallenger)
                return;
            if (this._endPercentDic.hasOwnProperty(member.fightOption.curPos)) {
                var percent = member.fightOption.curEnergy / member.fightOption.curMixSkill.skill.energyNeed * 100;
                this._endPercentDic[member.fightOption.curPos] = Math.ceil(percent);
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
                self.pushNotifyAtOnce(self.__class.SET_MIX_SKILL_ENERGY_PERCENT, locCurPercent, locUpdatePos);
                self._updatePercentDic[key] = locCurPercent;
                return;
            }
            //已经满
            if (locEndPercent == 100 && locUpdatePercent != 100) {
                var locCurPercent = locUpdatePercent + self._speed1 * dt;
                if (locCurPercent > locEndPercent) {
                    locCurPercent = locEndPercent;
                }
                self.pushNotifyAtOnce(self.__class.SET_MIX_SKILL_ENERGY_PERCENT, locCurPercent, locUpdatePos);
                self._updatePercentDic[key] = locCurPercent;
                return;
            }
            //不死亡
            if (locUpdatePercent < locEndPercent) {
                var locCurPercent = locUpdatePercent + self._speed * dt;
                if (locCurPercent > locEndPercent) {
                    locCurPercent = locEndPercent;
                }
                self.pushNotifyAtOnce(self.__class.SET_MIX_SKILL_ENERGY_PERCENT, locCurPercent, locUpdatePos);
                self._updatePercentDic[key] = locCurPercent;
            }
            else if (locUpdatePercent > locEndPercent) {
                var locCurPercent = locUpdatePercent - self._speed * dt;
                if (locCurPercent < locEndPercent) {
                    locCurPercent = locEndPercent;
                }
                self.pushNotifyAtOnce(self.__class.SET_MIX_SKILL_ENERGY_PERCENT, locCurPercent, locUpdatePos);
                self._updatePercentDic[key] = locCurPercent;
            }
        };
        __egretProto__.setCanUseMix = function (bool, member) {
            if (!member.fightOption.curIsChallenger)
                return;
            var self = this;
            self.pushNotifyAtOnce(self.__class.SET_MIX_SKILL_CAN_USE, bool, member.fightOption.curPos);
        };
        FightHeroEnergyCtrl.__className = "FightHeroEnergyCtrl";
        FightHeroEnergyCtrl.SET_MIX_SKILL_ENERGY_PERCENT = "setMixSkillEnergyPercent";
        FightHeroEnergyCtrl.SET_MIX_SKILL_CAN_USE = "setMixCanUse";
        return FightHeroEnergyCtrl;
    })(mo.DataController);
    uw.FightHeroEnergyCtrl = FightHeroEnergyCtrl;
    FightHeroEnergyCtrl.prototype.__class__ = "uw.FightHeroEnergyCtrl";
})(uw || (uw = {}));

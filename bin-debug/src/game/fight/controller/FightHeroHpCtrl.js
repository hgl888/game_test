/**
 * Created by Administrator on 2015/2/10.
 */
var uw;
(function (uw) {
    var FightHeroHpCtrl = (function (_super) {
        __extends(FightHeroHpCtrl, _super);
        function FightHeroHpCtrl() {
            _super.apply(this, arguments);
            this._speed = 50; //速度
            this._deathSpeed = 100; //死亡速度快一点
        }
        var __egretProto__ = FightHeroHpCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._updatePercentDic = {};
            this._endPercentDic = {};
        };
        //初始化，主要是大招人物位置
        __egretProto__.initHpDic = function () {
            var members = uw.fightMainCtrl.selfFightMembers;
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                this._updatePercentDic[locMember.fightOption.curPos] = 100;
                this._endPercentDic[locMember.fightOption.curPos] = 100;
            }
        };
        //设置dirty
        __egretProto__.setUpdateMember = function (member) {
            //敌方不需要
            if (!member.fightOption.curIsChallenger)
                return;
            if (this._endPercentDic.hasOwnProperty(member.fightOption.curPos)) {
                this._endPercentDic[member.fightOption.curPos] = Math.ceil(member.hp / member.baseData.hp * 100);
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
            //死亡
            if (locEndPercent == 0 && locUpdatePercent != 0) {
                var locCurPercent = locUpdatePercent - self._deathSpeed * dt;
                if (locCurPercent < locEndPercent) {
                    locCurPercent = locEndPercent;
                }
                self.pushNotifyAtOnce(self.__class.SET_MIX_SKILL_HP_PERCENT, locCurPercent, locUpdatePos);
                self._updatePercentDic[key] = locCurPercent;
                return;
            }
            //不死亡
            if (locUpdatePercent < locEndPercent) {
                var locCurPercent = locUpdatePercent + self._speed * dt;
                if (locCurPercent > locEndPercent) {
                    locCurPercent = locEndPercent;
                }
                self.pushNotifyAtOnce(self.__class.SET_MIX_SKILL_HP_PERCENT, locCurPercent, locUpdatePos);
                self._updatePercentDic[key] = locCurPercent;
            }
            else if (locUpdatePercent > locEndPercent) {
                var locCurPercent = locUpdatePercent - self._speed * dt;
                if (locCurPercent < locEndPercent) {
                    locCurPercent = locEndPercent;
                }
                self.pushNotifyAtOnce(self.__class.SET_MIX_SKILL_HP_PERCENT, locCurPercent, locUpdatePos);
                self._updatePercentDic[key] = locCurPercent;
            }
        };
        FightHeroHpCtrl.__className = "FightHpCtrl";
        FightHeroHpCtrl.SET_MIX_SKILL_HP_PERCENT = "setMixSkillHpPercent";
        return FightHeroHpCtrl;
    })(mo.DataController);
    uw.FightHeroHpCtrl = FightHeroHpCtrl;
    FightHeroHpCtrl.prototype.__class__ = "uw.FightHeroHpCtrl";
})(uw || (uw = {}));

var uw;
(function (uw) {
    var FightGroup = (function (_super) {
        __extends(FightGroup, _super);
        function FightGroup() {
            _super.apply(this, arguments);
            this.isChallenger = false; //是否为挑战者
        }
        var __egretProto__ = FightGroup.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.members = [];
            this.isChallenger = true;
            this.liveNum = 0;
        };
        __egretProto__.addMember = function (member) {
            member.fightOption.curGroup = this;
            this.members.push(member);
            this.liveNum++;
        };
        __egretProto__.setIsChallenger = function (isChallenger) {
            this.isChallenger = isChallenger;
            for (var i = 0, li = this.members.length; i < li; i++) {
                var member = this.members[i];
                member.fightOption.curIsChallenger = isChallenger;
            }
        };
        /**
         * Desc: 根据战斗数据id获取到战斗的怪物组信息。
         * @param combatId
         */
        FightGroup.createByCombatId = function (combatId) {
            var combat = mo.getJSONWithFileNameAndID(uw.cfg_t_combat, combatId);
            var grp = new uw.FightGroup();
            var monsterIds = combat[uw.t_combat_monsterIds];
            for (var i = 0, li = monsterIds.length; i < li; i++) {
                var monsterId = monsterIds[i];
                if (monsterId && monsterId != "0" && monsterId != 0) {
                    var locMember = uw.FightMember.create(mo.getJSONWithFileNameAndID(uw.cfg_t_monster, monsterId), uw.memberType.MONSTER, i);
                    grp.addMember(locMember);
                }
            }
            return grp;
        };
        /**
         * 根据英雄创建战斗组
         * @param members
         */
        FightGroup.createWithMembers = function (members) {
            var grp = new uw.FightGroup();
            for (var i = 0, li = members.length; i < li; i++) {
                var locMember = members[i];
                grp.addMember(locMember);
            }
            return grp;
        };
        /**
         * Desc: 通过副本id获取到怪物布阵列表。
         * @param copyId
         * @returns {Array}
         */
        FightGroup.getGrpArrByCopy = function (copyId) {
            var copyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            var combatIdArr = copyInfo[uw.t_copy_combatId]; //战斗数据id数组
            var grpArr = [];
            for (var i = 0, li = combatIdArr.length; i < li; i++) {
                var combatId = combatIdArr[i];
                grpArr.push(uw.FightGroup.createByCombatId(combatId));
            }
            return grpArr;
        };
        return FightGroup;
    })(mo.Class);
    uw.FightGroup = FightGroup;
    FightGroup.prototype.__class__ = "uw.FightGroup";
})(uw || (uw = {}));

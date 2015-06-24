/**
 * Created by Administrator on 14-7-31.
 */
var uw;
(function (uw) {
    var FightActionPauseCtrl = (function (_super) {
        __extends(FightActionPauseCtrl, _super);
        function FightActionPauseCtrl() {
            _super.apply(this, arguments);
            this.isPause = false; //是否暂停
        }
        var __egretProto__ = FightActionPauseCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.members = [];
        };
        //移除成员
        __egretProto__.removeMember = function (member) {
            mo.ArrayRemoveObject(this.members, member);
            if (this.members.length <= 0) {
                if (this.isPause) {
                    this.isPause = false;
                    //恢复所有人动作
                    this.resumeMemberAction();
                }
            }
            this.checkHighLight();
        };
        //增加放大招的成员
        __egretProto__.pushMember = function (member) {
            this.members.push(member);
            this.pauseMemberAction();
            this.checkHighLight();
        };
        //判断己方是否有人在释放技能
        __egretProto__.isSelfPause = function () {
            for (var i = 0; i < this.members.length; i++) {
                var locMember = this.members[i];
                if (locMember.fightOption.curIsChallenger)
                    return true;
            }
            return false;
        };
        //判断高亮
        __egretProto__.checkHighLight = function () {
            var members = uw.fightMainCtrl.allFightMembers;
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                if (locMember.isDeath())
                    continue;
                if (!this.isPause) {
                    locMember.fightOption.curController.display.setHighLight(true);
                    continue;
                }
                if (locMember.fightOption.curIsPauseAction) {
                    locMember.fightOption.curController.display.setHighLight(true);
                }
                else {
                    locMember.fightOption.curController.display.setHighLight(false);
                }
            }
        };
        //判断成员是否在技能暂停中
        __egretProto__.isMemberInPause = function (member) {
            for (var i = 0; i < this.members.length; i++) {
                var locMember = this.members[i];
                if (locMember == member)
                    return true;
            }
        };
        //暂停大招之外的人的动作
        __egretProto__.pauseMemberAction = function () {
            if (!this.isPause) {
                this.isPause = true;
                this.pushNotifyAtOnce(this.__class.ON_SHOW_MASK_LAYER, null);
            }
            uw.fightBiz.pauseMemberAction(uw.fightMainCtrl.selfFightMembers, uw.pauseActionType.NOT_MIX_SKILL);
            uw.fightBiz.pauseMemberAction(uw.fightMainCtrl.enemyFightMembers, uw.pauseActionType.NOT_MIX_SKILL);
            uw.fightActionManager.pause();
        };
        //继续大招之外的人的动作
        __egretProto__.resumeMemberAction = function () {
            this.pushNotifyAtOnce(this.__class.ON_HIDE_MASK_LAYER, null);
            uw.fightBiz.resumeMemberAction(uw.fightMainCtrl.selfFightMembers, uw.pauseActionType.NOT_MIX_SKILL);
            uw.fightBiz.resumeMemberAction(uw.fightMainCtrl.enemyFightMembers, uw.pauseActionType.NOT_MIX_SKILL);
            uw.fightActionManager.resume();
        };
        FightActionPauseCtrl.__className = "FightActionPauseCtrl";
        FightActionPauseCtrl.ON_SHOW_MASK_LAYER = "onShowMaskLayer";
        FightActionPauseCtrl.ON_HIDE_MASK_LAYER = "onHideMaskLayer";
        return FightActionPauseCtrl;
    })(mo.DataController);
    uw.FightActionPauseCtrl = FightActionPauseCtrl;
    FightActionPauseCtrl.prototype.__class__ = "uw.FightActionPauseCtrl";
})(uw || (uw = {}));

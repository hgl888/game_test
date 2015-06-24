/**
 * Created by Administrator on 2015/2/13.
 */
var uw;
(function (uw) {
    var _FightMemberOption = (function (_super) {
        __extends(_FightMemberOption, _super);
        function _FightMemberOption() {
            _super.apply(this, arguments);
            this.curHeroType = 0; //英雄类型：
            this.curX = 0; //战斗区域横向x
            this.curY = 0; //战斗区域纵向y
            this.curIsChallenger = false; //是否挑战方
            this.curOutHurt = 0;
            this.curEnergy = 0; //积攒的能量
            //以下是回合战斗前需要重新初始化的数据
            this.curIsPauseAction = false; //是否暂停中
            this.curIsInFightArea = false; //是否在战斗区域内
            this.curBuffLimitMove = false; //buff限制移动
            this.curBuffLimitAttack = false; //buff限制攻击
            this.curLimitTargetSelect = false; //限制目标选择;该状态下，目标是丢失的，范围攻击可以打得到
            this.curTargetMiss = false; //目标消失不受伤害
            this.curLimitSkill = false; //限制技能，只能普攻
            this.curIsClone = false; //
        }
        var __egretProto__ = _FightMemberOption.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.curRadius = uw.Fight.unitPixel * 1.4; //半径
            this.curStatus = uw.memberStatus.NORMAL; //当前状态
            this.curDefaultSkills = [];
            this.curAutoSkills = [];
            this.curInsertSkills = [];
            this.curPassiveSkills = [];
            this.curFightBuffDic = {};
            this.curSkillHurtCountDic = {};
            this.curSelfProp = {};
        };
        __egretProto__.dtor = function () {
            this.curController = null;
            this.curDefaultSkills = null;
            this.curAutoSkills = null;
            this.curInsertSkills = null;
            this.curPassiveSkills = null;
            this.curMixSkill = null;
            this.curNormalSkill = null;
            this.curFightBuffDic = null;
            this.curSkill = null;
            this.curLastSkill = null;
            this.curRevivalBuff = null;
            this.curSkillHurtCountDic = null;
            this.curGroup = null;
            this.curSelfProp = null;
        };
        return _FightMemberOption;
    })(mo.Option);
    uw._FightMemberOption = _FightMemberOption;
    _FightMemberOption.prototype.__class__ = "uw._FightMemberOption";
})(uw || (uw = {}));

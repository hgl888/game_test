/**
 * Created by Administrator on 14-12-9.
 */
var uw;
(function (uw) {
    var FightSimulateMemberCtrl = (function (_super) {
        __extends(FightSimulateMemberCtrl, _super);
        function FightSimulateMemberCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightSimulateMemberCtrl.prototype;
        __egretProto__.calHp = function (hp, fromMember, isCrit) {
            var self = this, mainCtrl = uw.fightMainCtrl;
            hp = 2000;
            if (mainCtrl.round == 1) {
                /*火龙->【爪击】id,伤害
                 奎爷->【普攻】id,伤害
                 黑岩->【技1】id,伤害
                 玛嘉->【普攻】id,伤害
                 萨菲->【技1】id,伤害
                 佐助->【普攻】id,伤害*/
                if (fromMember == mainCtrl.m_huolong) {
                    hp = uw.fightUtils.getSimulateData(301)[1];
                }
                if (fromMember == mainCtrl.m_kuiye) {
                    hp = uw.fightUtils.getSimulateData(302)[1];
                }
                if (fromMember == mainCtrl.m_heiyan) {
                    hp = uw.fightUtils.getSimulateData(303)[1];
                }
                if (fromMember == mainCtrl.m_majia) {
                    hp = uw.fightUtils.getSimulateData(304)[1];
                }
                if (fromMember == mainCtrl.m_safei) {
                    hp = uw.fightUtils.getSimulateData(305)[1];
                }
                if (fromMember == mainCtrl.m_xiaozuo) {
                    hp = uw.fightUtils.getSimulateData(306)[1];
                }
            }
            if (mainCtrl.round == 2) {
                /*奎爷->【技2】id,伤害
                 黑岩->【普攻】id,伤害
                 玛嘉->【技1】id,伤害
                 萨菲->【普攻）】id,伤害
                 佐助->【技1】id,伤害
                 火龙->【吐息（喷火）】id,伤害*/
                if (fromMember == mainCtrl.m_kuiye) {
                    hp = uw.fightUtils.getSimulateData(321)[1];
                }
                if (fromMember == mainCtrl.m_heiyan) {
                    hp = uw.fightUtils.getSimulateData(322)[1];
                }
                if (fromMember == mainCtrl.m_majia) {
                    hp = uw.fightUtils.getSimulateData(323)[1];
                }
                if (fromMember == mainCtrl.m_safei) {
                    hp = uw.fightUtils.getSimulateData(324)[1];
                }
                if (fromMember == mainCtrl.m_xiaozuo) {
                    hp = uw.fightUtils.getSimulateData(325)[1];
                }
                if (fromMember == mainCtrl.m_huolong) {
                    hp = uw.fightUtils.getSimulateData(326)[1];
                }
            }
            if (mainCtrl.round == 3) {
                /*玛嘉->大招id,伤害
                 佐助->大招id,伤害
                 奎爷->大招id,伤害
                 火龙->火雨id,伤害*/
                if (fromMember == mainCtrl.m_majia) {
                    hp = uw.fightUtils.getSimulateData(501)[1];
                }
                if (fromMember == mainCtrl.m_xiaozuo) {
                    hp = uw.fightUtils.getSimulateData(502)[1];
                }
                if (fromMember == mainCtrl.m_kuiye) {
                    hp = uw.fightUtils.getSimulateData(503)[1];
                }
                if (fromMember == mainCtrl.m_huolong) {
                    hp = uw.fightUtils.getSimulateData(504)[1];
                }
            }
            hp = parseInt(hp) * -1;
            _super.prototype.calHp.call(this, hp, fromMember, isCrit);
        };
        __egretProto__.calEnterArea = function (dt) {
        };
        __egretProto__.moveToTarget = function (dt) {
        };
        __egretProto__.calSkill = function () {
        };
        __egretProto__.moveOut = function (startPos, locEndPos, time) {
            var self = this, fightMember = self.fightMember;
            fightMember.fightOption.curController.setCurPos(startPos.x, startPos.y);
            var move = mo.moveBy(time, mo.pSub(locEndPos, startPos));
            var func = mo.callFunc(function () {
                self.setStatus(uw.memberStatus.NORMAL); //当前状态
                self.syncPos();
                self.enterArea();
            }, self);
            var sq = mo.sequence(move, func);
            self.display.runAction(sq);
        };
        //回合开始前
        __egretProto__.fightBefore = function () {
            _super.prototype.fightBefore.call(this);
            //火龙太大只啦，先隐藏
            if (!this.fightMember.fightOption.curIsChallenger) {
                this.display.setVisible(false);
                this.display.setStatePos(mo.p(-337, -470));
                this.setStatus(uw.memberStatus.NORMAL); //当前状态
            }
            this.display.removeBloodProgress(); //去掉血条
        };
        //动作回调
        __egretProto__.onMovementEvent = function (display, movementType, movementID) {
            _super.prototype.onMovementEvent.call(this, display, movementType, movementID);
            //火龙跑动停止时，改变常态
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                movementID = mo.trimSpace(movementID);
                if (movementID == uw.Fight.HeroAction.run) {
                    if (!this.fightMember.fightOption.curIsChallenger) {
                        this.setStatus(uw.memberStatus.NORMAL); //当前状态
                    }
                }
            }
        };
        __egretProto__.useSkill = function (skillId) {
            var self = this, fightMember = self.fightMember;
            var skill = uw.getSkillData(skillId, 1);
            fightMember.fightOption.curSkill = uw.FightSkill.create(fightMember, skill);
            self.playSkillAction();
        };
        FightSimulateMemberCtrl.__className = "FightSimulateMemberCtrl";
        return FightSimulateMemberCtrl;
    })(uw.FightMemberCtrl);
    uw.FightSimulateMemberCtrl = FightSimulateMemberCtrl;
    FightSimulateMemberCtrl.prototype.__class__ = "uw.FightSimulateMemberCtrl";
})(uw || (uw = {}));

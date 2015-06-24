/**
 * Created by Administrator on 14-10-20.
 */
var uw;
(function (uw) {
    var FightDemoMemberCtrl = (function (_super) {
        __extends(FightDemoMemberCtrl, _super);
        function FightDemoMemberCtrl() {
            _super.apply(this, arguments);
            this.isFaceLeft = false;
        }
        var __egretProto__ = FightDemoMemberCtrl.prototype;
        __egretProto__.update = function (dt) {
            var fightMember = this.fightMember;
            for (var key in fightMember.fightOption.curFightBuffDic) {
                var fightBuff = fightMember.fightOption.curFightBuffDic[key];
                fightBuff.controller.update(dt);
            }
        };
        __egretProto__.init = function (member, display) {
            var self = this;
            this.fightMember = member;
            this.display = display;
            this.display.setMovementEventCallFunc(this.onMovementEvent, this);
            this.display.setFrameEventCallFunc(this.onFrameEvent, this);
            if (!member.curWarriorData)
                return;
            var skillIds = member.curWarriorData[uw.t_warrior_skills] || [];
            var mixSkillId = member.curWarriorData[uw.t_warrior_mixSkill];
            var normalSkillId = member.curWarriorData[uw.t_warrior_normalSkill];
            var demoFightSkills = [];
            for (var i = 0; i < skillIds.length; i++) {
                var locSkillId = skillIds[i];
                var locSkillData = uw.getSkillData(locSkillId, 0);
                var locShowId = locSkillData.showId;
                if (locShowId) {
                    var locSkillDisplay = mo.getJSONWithFileNameAndID(uw.cfg_t_skillDisplay, locShowId);
                    var locAction = locSkillDisplay[uw.t_skillDisplay_action];
                    if (locAction) {
                        demoFightSkills[i] = uw.FightSkill.create(self.fightMember, locSkillData, self.fightMember.fightOption.curIsChallenger);
                    }
                }
            }
            member.curDemoFightSkills = demoFightSkills;
            if (mixSkillId) {
                var skillData = uw.getSkillData(mixSkillId, 0);
                member.fightOption.curMixSkill = uw.FightSkill.create(self.fightMember, skillData, self.fightMember.fightOption.curIsChallenger);
            }
            var skillData = uw.getSkillData(normalSkillId, 0);
            member.fightOption.curNormalSkill = uw.FightSkill.create(self.fightMember, skillData, self.fightMember.fightOption.curIsChallenger);
            this.enemyFrontMember = uw.targetBiz.getFrontTarget(self.fightMember);
        };
        //设置x,y战斗坐标
        __egretProto__.setCurPos = function (x, y) {
            var self = this;
            self.fightMember.fightOption.curX = x;
            self.fightMember.fightOption.curY = y;
            self.display.setFightPosition(x, y);
            this._resetZOrder();
        };
        __egretProto__.onSkill = function (skillAction) {
            var display = this.display;
            if (!display)
                return;
            var member = this.fightMember;
            if (member.fightOption.curStatus == uw.memberStatus.SKILL)
                return;
            member.fightOption.curStatus = uw.memberStatus.SKILL;
            switch (skillAction) {
                case uw.skillAction.NORMAL_ATTACK:
                    var newFightSkill = uw.FightSkill.create(member, member.fightOption.curNormalSkill.skill);
                    member.fightOption.curSkill = newFightSkill;
                    uw.heroActionBiz.play(member, uw.Fight.HeroAction.normalAttack);
                    break;
                case uw.skillAction.SKILL_ATTACK1:
                    var newFightSkill = uw.FightSkill.create(member, member.curDemoFightSkills[0].skill);
                    member.fightOption.curSkill = newFightSkill;
                    uw.heroActionBiz.play(member, uw.Fight.HeroAction.skillAttack1);
                    break;
                case uw.skillAction.SKILL_ATTACK2:
                    var newFightSkill = uw.FightSkill.create(member, member.curDemoFightSkills[1].skill);
                    member.fightOption.curSkill = newFightSkill;
                    uw.heroActionBiz.play(member, uw.Fight.HeroAction.skillAttack2);
                    break;
                case uw.skillAction.SKILL_ATTACK3:
                    var newFightSkill = uw.FightSkill.create(member, member.curDemoFightSkills[2].skill);
                    member.fightOption.curSkill = newFightSkill;
                    uw.heroActionBiz.play(member, uw.Fight.HeroAction.skillAttack3);
                    break;
                case uw.skillAction.UNIQUE_ATTACK:
                    var newFightSkill = uw.FightSkill.create(member, member.fightOption.curMixSkill.skill);
                    member.fightOption.curSkill = newFightSkill;
                    uw.heroActionBiz.play(member, uw.Fight.HeroAction.uniqueAttack);
                    uw.fightDemoCtr.mixPauseStart();
                    break;
            }
            member.fightOption.curSkill.hurtCount = 0; //
            mo.playSkillAudio(member.fightOption.curSkill.skill.id, false);
        };
        __egretProto__.calSkill = function () {
            uw.skillBiz.findTargetAndCalSkill(this.fightMember, this.enemyFrontMember, this.fightMember.fightOption.curSkill);
        };
        //播放技能特效
        __egretProto__.playSkillEffect = function () {
            var fightMember = this.fightMember, enemyFrontMember = this.enemyFrontMember;
            if (!enemyFrontMember || !fightMember.fightOption.curSkill)
                return;
            var fxSkill = fightMember.fightOption.curSkill.skillDisplay[uw.t_skillDisplay_fxSkill];
            var effectType = fightMember.fightOption.curSkill.skillDisplay[uw.t_skillDisplay_effectType];
            if (!fxSkill || !effectType)
                return;
            uw.FightSkillEffectBaseCtrl.create(fightMember, fightMember.fightOption.curSkill);
        };
        //帧回调
        __egretProto__.onFrameEvent = function (display, evt, originFrameIndex, currentFrameIndex) {
            if (evt == uw.Fight.HeroEvent.attack) {
                this.calSkill();
            }
            if (evt == uw.Fight.HeroEvent.effect) {
                //播放特效
                this.playSkillEffect();
            }
            if (evt == uw.Fight.HeroEvent.uniquePauseEnd) {
                //大招暂停结束
                uw.fightDemoCtr.mixPauseEnd();
                //大招暂停结束
                this.uniquePauseEnd();
            }
            if (evt == uw.Fight.HeroEvent.shake) {
                //震屏
                uw.fightUtils.shakeEffect();
            }
        };
        //动作回调
        __egretProto__.onMovementEvent = function (display, movementType, movementID) {
            //变身，特殊处理
            movementID = movementID.replace("_1", "");
            if (movementType == mo.Armature.MOVEMENT_TYPE.START) {
                if (movementID == uw.Fight.HeroAction.uniqueAttack) {
                    //大招是需要暂停滴
                    this.uniquePauseStart();
                }
            }
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                movementID = mo.trimSpace(movementID);
                /* uw.heroActionBiz.play(this.fightMember, uw.Fight.HeroAction.steady);
                this.fightMember.fightOption.curStatus = uw.memberStatus.NORMAL;

                return;*/
                //攻击动作
                if (movementID == uw.Fight.HeroAction.normalAttack || movementID == uw.Fight.HeroAction.skillAttack1 || movementID == uw.Fight.HeroAction.skillAttack2 || movementID == uw.Fight.HeroAction.skillAttack3 || movementID == uw.Fight.HeroAction.uniqueAttack || movementID == uw.Fight.HeroAction.hit) {
                    //播放常态
                    this.fightMember.fightOption.curStatus = uw.memberStatus.NORMAL;
                    uw.heroActionBiz.play(this.fightMember, uw.Fight.HeroAction.steady);
                }
            }
        };
        __egretProto__.calHp = function (hp, fromMember, isCrit) {
            if (!fromMember)
                return;
            var fightMember = this.fightMember;
            hp = parseInt(hp);
            if (hp < 0) {
                uw.heroActionBiz.hit(fightMember);
            }
            //uw.skillBiz.calSkillHitEffect(fightMember ,fromMember.fightOption.curSkill);
            //冒血量值动画
            uw.FightShowBloodText.create(this.display, hp, true, isCrit);
        };
        FightDemoMemberCtrl.__className = "FightDemoController";
        FightDemoMemberCtrl.create = function (member, display) {
            var c = new uw.FightDemoMemberCtrl();
            c.init(member, display);
            return c;
        };
        return FightDemoMemberCtrl;
    })(uw.FightMemberCtrl);
    uw.FightDemoMemberCtrl = FightDemoMemberCtrl;
    FightDemoMemberCtrl.prototype.__class__ = "uw.FightDemoMemberCtrl";
})(uw || (uw = {}));

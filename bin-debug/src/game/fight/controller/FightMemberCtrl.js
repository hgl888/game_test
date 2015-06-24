/**
 * Created by Administrator on 14-7-22.
 */
var uw;
(function (uw) {
    var FightMemberCtrl = (function (_super) {
        __extends(FightMemberCtrl, _super);
        function FightMemberCtrl() {
            _super.apply(this, arguments);
            this.canMove = true;
            this.isReadyAttack = false;
            this.intervalMult = 1; //攻击间隔系数;通过控制这个来控制攻击速率
            this.moveMult = 1; //移动速度系数;通过控制这个来控制移动速度
            this.isFaceLeft = false; //是否面向左边
        }
        var __egretProto__ = FightMemberCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.targetPos = mo.p(0, 0);
        };
        __egretProto__.init = function (member, display) {
            this.fightMember = member;
        };
        __egretProto__.initDisplay = function (display) {
            this.display = display;
            this.display.setDelegate(this);
            //大火龙刚出场时是隐藏的，因为身体太大只了
            if (this.fightMember.tid == uw.id_t_warrior.m_63) {
                display.setVisible(false);
            }
        };
        __egretProto__.initEvent = function () {
            this.display.setMovementEventCallFunc(this.onMovementEvent, this);
            this.display.setFrameEventCallFunc(this.onFrameEvent, this);
        };
        //回合开始前
        __egretProto__.fightBefore = function () {
            var member = this.fightMember;
            if (member.isDeath())
                return;
            //初始化站位
            uw.fightBiz.initMemberBeforePos(member);
            this.display.setVisible(true);
            //初始化状态
            member.fightOption.curIsPauseAction = false; //是否暂停中
            member.fightOption.curIsInFightArea = false; //是否在战斗区域内
            this.setStatus(uw.memberStatus.RUN); //当前状态
            member.fightOption.curSkill = null; //当前战斗技能
            member.fightOption.curLastSkill = null; //最近一次技能
            member.fightOption.curBuffLimitMove = false; //buff限制移动
            member.fightOption.curBuffLimitAttack = false; //buff限制攻击
            member.fightOption.curLimitTargetSelect = false; //限制目标选择;该状态下，目标是丢失的，范围攻击可以打得到
            member.fightOption.curRevivalBuff = null; //重生中
            //初始化被动伤害次数和计算
            uw.passiveSkillBiz.clearHurtCount(member);
            uw.passiveSkillBiz.cal(member, member, uw.skillPassiveType.FIGHT_BEFORE);
            uw.passiveSkillBiz.cal(member, member, uw.skillPassiveType.RE_HP);
        };
        //回合结束
        __egretProto__.fightEnd = function () {
            var member = this.fightMember;
            //清除buff
            uw.buffBiz.clearMemberBuff(member);
            if (member.isDeath())
                return;
            this.canMove = false;
            this.enemyFrontMember = null;
            this.isReadyAttack = false;
            member.fightOption.curSkill = null;
            member.fightOption.curLastSkill = null;
            member.resetSkillPlayCount();
            //假如不是技能中则设置为常态
            if (member.fightOption.curStatus != uw.memberStatus.SKILL) {
                this.setStatus(uw.memberStatus.NORMAL);
            }
        };
        //恢复
        __egretProto__.recovery = function () {
            var member = this.fightMember;
            if (member.isDeath())
                return;
            var curHp = member.hp;
            //回血
            member.hp += member.hpRecovery;
            uw.FightShowBloodText.create(this.display, member.hpRecovery, true, false);
            //设置血量条
            this.display.addBloodProgress(curHp, member.hp, member.baseData.hp);
            uw.fightHeroHpCtrl.setUpdateMember(member);
            //恢复能量
            uw.fightEnergyCtrl.replayEnergy(member, member.energyRecovery);
        };
        __egretProto__.update = function (dt) {
            var self = this;
            var fightMember = self.fightMember;
            for (var key in fightMember.fightOption.curFightBuffDic) {
                var fightBuff = fightMember.fightOption.curFightBuffDic[key];
                fightBuff.controller.update(dt);
            }
            if (fightMember.isDeath())
                return;
            if (fightMember.fightOption.curRevivalBuff)
                return; //重生中
            //判断面向方向
            self.checkFaceDirection();
            //更新是否进入战斗显示区域
            if (!fightMember.fightOption.curIsInFightArea) {
                //移动到场景
                self.calEnterArea(dt);
                return;
            }
            if (!self.display)
                return;
            self.initEnemyFrontMember();
            //找不到对象。。。一个悲伤的故事
            if (!self.enemyFrontMember) {
                //假如跑动中,找不到对象就不要跑啦
                if (fightMember.fightOption.curStatus == uw.memberStatus.RUN) {
                    self.setStatus(uw.memberStatus.NORMAL);
                }
                return;
            }
            //初始化技能
            fightMember.initCurrSkill();
            fightMember.fightOption.curSkill.prepareTime += dt;
            //计算移动,移动到目的地，释放技能
            self._calMove(dt);
            self.moveToTarget(dt);
            self.calSkill();
        };
        __egretProto__.calEnterArea = function (dt) {
            var self = this;
            var fightMember = self.fightMember;
            var speed = uw.Fight.moveSpeed * self.moveMult * dt;
            if (self.isFaceLeft) {
                self.setCurPos(self.getCurPosX() - speed, self.getCurPosY());
            }
            else {
                self.setCurPos(self.getCurPosX() + speed, self.getCurPosY());
            }
            var fightArea = uw.fightMainCtrl.fightArea;
            if (fightMember.fightOption.curX >= 150 && fightMember.fightOption.curX <= fightArea.width - 150) {
                self.enterArea();
            }
        };
        //进入场景，进行副本buff计算
        __egretProto__.enterArea = function () {
            var fightMember = this.fightMember;
            fightMember.fightOption.curIsInFightArea = true;
            var copyId = uw.fightMainCtrl.copyId;
            uw.skillBiz.calCopySkill(copyId, fightMember);
            uw.fightRoundCtrl.onMemberEnter(fightMember);
        };
        //初始化目标
        __egretProto__.initEnemyFrontMember = function () {
            var fightMember = this.fightMember;
            //技能中不换目标
            if (fightMember.fightOption.curStatus == uw.memberStatus.SKILL)
                return;
            this.enemyFrontMember = uw.targetBiz.getFrontTarget(fightMember);
        };
        //判断面向方向
        __egretProto__.checkFaceDirection = function () {
            var self = this;
            var fightMember = self.fightMember, display = self.display, enemyFrontMember = self.enemyFrontMember;
            if (!enemyFrontMember) {
                //进入场景之前方向是固定的
                if (fightMember.fightOption.curIsChallenger) {
                    //向右
                    display.forward(false);
                    self.isFaceLeft = false;
                }
                else {
                    //向左
                    display.forward(true);
                    self.isFaceLeft = true;
                }
            }
            else {
                //进入场景后根据目标
                if (fightMember.fightOption.curX <= enemyFrontMember.fightOption.curX) {
                    //向右
                    display.forward(false);
                    self.isFaceLeft = false;
                }
                else {
                    //向左
                    display.forward(true);
                    self.isFaceLeft = true;
                }
            }
        };
        //计算移动
        __egretProto__._calMove = function (dt) {
            var self = this;
            //攻击目标的位置
            self.targetPos.x = self.enemyFrontMember.fightOption.curX;
            self.targetPos.y = self.enemyFrontMember.fightOption.curY;
            self.canMove = self._isCanMove();
        };
        __egretProto__.setStatus = function (status) {
            var member = this.fightMember;
            member.fightOption.curStatus = status;
            uw.heroActionBiz.calAction(member);
        };
        __egretProto__._isCanMove = function () {
            var fightMember = this.fightMember;
            //没有目标不移动
            if (!this.enemyFrontMember)
                return;
            //死亡不移动
            if (fightMember.isDeath())
                return false;
            //受击动作中不移动
            if (this.display.getAnimationId() == uw.Fight.HeroAction.hit)
                return false;
            //技能中不移动
            if (fightMember.fightOption.curStatus == uw.memberStatus.SKILL)
                return false;
            //存在限制不移动的buff
            if (fightMember.fightOption.curBuffLimitMove)
                return false;
            return true;
        };
        //能量计算
        __egretProto__._calEnergy = function () {
        };
        //计算释放技能
        __egretProto__.calSkill = function () {
            var self = this;
            var fightMember = self.fightMember;
            //技能中不计算
            if (fightMember.fightOption.curStatus == uw.memberStatus.SKILL)
                return;
            //有人大招时只能大招
            if (uw.fightActionPauseCtrl.isPause)
                return;
            //buff限制攻击
            if (fightMember.fightOption.curBuffLimitAttack)
                return;
            //所有人没有进入场景，不释放技能
            //if (!uw.fightRoundCtrl.isAllMembersEnter) return;
            if (self.isReadyAttack) {
                //攻击间隔判断
                var lastSkill = fightMember.fightOption.curLastSkill;
                if (lastSkill && uw.fightMainCtrl.playingTime - lastSkill.finishTime < lastSkill.interval * self.intervalMult) {
                    return;
                }
                self.isReadyAttack = false;
                self.playSkillAction();
            }
        };
        //播放技能动作
        __egretProto__.playSkillAction = function () {
            var fightMember = this.fightMember;
            uw.fightUtils.log("%s[%d]发起技能%s", fightMember.name, fightMember.fightOption.curPos, fightMember.fightOption.curSkill.skill.name);
            fightMember.fightOption.curStatus = uw.memberStatus.SKILL;
            var action = this.fightMember.fightOption.curSkill.skillDisplay[uw.t_skillDisplay_action];
            switch (action) {
                case uw.skillAction.NORMAL_ATTACK:
                    uw.heroActionBiz.normalAttack(fightMember);
                    break;
                case uw.skillAction.SKILL_ATTACK1:
                    uw.heroActionBiz.skillAttack1(fightMember);
                    break;
                case uw.skillAction.SKILL_ATTACK2:
                    uw.heroActionBiz.skillAttack2(fightMember);
                    break;
                case uw.skillAction.SKILL_ATTACK3:
                    uw.heroActionBiz.skillAttack3(fightMember);
                    break;
                case uw.skillAction.UNIQUE_ATTACK:
                    uw.heroActionBiz.uniqueAttack(fightMember);
                    break;
            }
            mo.playSkillAudio(fightMember.fightOption.curSkill.skill.id, false);
            uw.fightEnergyCtrl.calSkillReplayEnergy(fightMember, fightMember.fightOption.curSkill);
        };
        //大招暂停开始
        __egretProto__.uniquePauseStart = function () {
            var display = this.display;
            this.fightMember.fightOption.curIsPauseAction = true;
            uw.fightActionPauseCtrl.pushMember(this.fightMember);
            this._setScale(1.2);
        };
        //大招暂停结束
        __egretProto__.uniquePauseEnd = function () {
            this.fightMember.fightOption.curIsPauseAction = false;
            uw.fightActionPauseCtrl.removeMember(this.fightMember);
            this._setScale(1);
        };
        __egretProto__._setScale = function (scale) {
            var display = this.display;
            var scaleX = this.display.getScaleX();
            scaleX > 0 ? scaleX = scale : scaleX = scale * -1;
            display.setScale(scaleX, scale);
        };
        //移动完成
        __egretProto__._moveFinish = function () {
            //uw.fightUtils.log("%s[%d]初始化技能!_moveFinish",this.name,this.fightOption.curPos);
        };
        //buff伤害
        __egretProto__.calBuff = function () {
        };
        //根据技能范围查找目标
        __egretProto__.findTarget = function () {
        };
        //暂停
        __egretProto__.pause = function () {
            var fightMember = this.fightMember;
            if (!fightMember.isDeath()) {
                this.display.pauseAnimation();
            }
        };
        //继续
        __egretProto__.resume = function () {
            var fightMember = this.fightMember;
            if (!fightMember.isDeath()) {
                this.display.resumeAnimation();
            }
        };
        //技能结束
        __egretProto__._skillFinish = function () {
            var fightMember = this.fightMember;
            if (!fightMember.fightOption.curSkill)
                return;
            this.setStatus(uw.memberStatus.NORMAL);
            fightMember.fightOption.curSkill.hurtCount = 0;
            fightMember.fightOption.curLastSkill = fightMember.fightOption.curSkill;
            fightMember.fightOption.curLastSkill.finishTime = uw.fightMainCtrl.playingTime;
            fightMember.fightOption.curSkill = null;
        };
        //打算技能
        __egretProto__.breakSkill = function () {
            var fightMember = this.fightMember;
            if (fightMember.fightOption.curSkill) {
                //假如奥义
                if (fightMember.fightOption.curSkill.isMix()) {
                    this.uniquePauseEnd();
                }
                //打断某些英雄需要做特殊处理
                //爆碎牙瞬杀
                if (fightMember.fightOption.curSkill.skill.id == uw.fixSkillId.ID_34000) {
                    //播放特效
                    this.playSkillEffect(fightMember.fightOption.curSkill);
                }
            }
            this._skillFinish();
            this.setStatus(uw.memberStatus.NORMAL);
            uw.fightActionManager.breakActionByMember(fightMember);
        };
        //播放技能特效
        __egretProto__.playSkillEffect = function (fightSkill) {
            var fightMember = this.fightMember, enemyFrontMember = this.enemyFrontMember;
            if (!enemyFrontMember || !fightSkill)
                return;
            var fxSkill = fightSkill.skillDisplay[uw.t_skillDisplay_fxSkill];
            var effectType = fightSkill.skillDisplay[uw.t_skillDisplay_effectType];
            if (!fxSkill || !effectType)
                return;
            uw.FightSkillEffectBaseCtrl.create(fightMember, fightSkill);
        };
        //同步坐标系
        __egretProto__.syncPos = function () {
            var member = this.fightMember;
            var targetPos = member.fightOption.curController.display.getPosition();
            var curPos = uw.fightUtils.convertNodePosToCurPos(targetPos);
            this.setCurPos(curPos.x, curPos.y);
        };
        /*******************************************************************华丽的分割线************************************************************************************/
        //设置x,y战斗坐标
        __egretProto__.setCurPos = function (x, y) {
            this.fightMember.fightOption.curX = x;
            this.fightMember.fightOption.curY = y;
            this.display.setFightPosition(x, y);
            this._resetZOrder();
        };
        //偏移的坐标
        __egretProto__.setOffsetPos = function (x, y) {
            var newX = this.fightMember.fightOption.curX + x, newY = this.fightMember.fightOption.curY + y;
            this.setCurPos(newX, newY);
        };
        //获取X坐标
        __egretProto__.getCurPosX = function () {
            return this.fightMember.fightOption.curX;
        };
        //获取Y坐标
        __egretProto__.getCurPosY = function () {
            return this.fightMember.fightOption.curY;
        };
        //设置zOrder
        __egretProto__._resetZOrder = function () {
            var zOrder = uw.fightUtils.fightArea.height - this.fightMember.fightOption.curY;
            if (this.isFaceLeft) {
                zOrder -= 1;
            }
            this.display.zOrder = zOrder;
        };
        //从当前目标走到 targetPos
        __egretProto__.moveToTarget = function (dt) {
            var self = this;
            //不能移动，但是可以攻击
            if (!self.canMove) {
                if (self.isCanAttack()) {
                    self.isReadyAttack = true;
                }
                return;
            }
            //移动速度
            var speed = uw.Fight.moveSpeed * this.moveMult * dt;
            var dx = self.targetPos.x - self.getCurPosX();
            var dy = self.targetPos.y - self.getCurPosY();
            var atan = Math.atan2(dy, dx);
            var x = Math.cos(atan) >= 0 ? speed : -speed;
            var y = Math.sin(atan) >= 0 ? 0.25 * speed : 0.25 * -speed;
            //计算是否碰撞
            var fightUtils = uw.fightUtils;
            var isCollide = false, myMember = self.fightMember;
            var tempCCP, collideMember = uw.fightMainCtrl.allFightMembers;
            for (var i = 0; i < collideMember.length; i++) {
                var memberObj = collideMember[i];
                if (myMember != memberObj && !memberObj.isDeath()) {
                    tempCCP = mo.p(myMember.fightOption.curX - memberObj.fightOption.curX, myMember.fightOption.curY - memberObj.fightOption.curY);
                    if (mo.pDot(tempCCP, tempCCP) <= memberObj.fightOption.curRadius * myMember.fightOption.curRadius * 4) {
                        isCollide = true;
                        if ((myMember.fightOption.curY < memberObj.fightOption.curY && y > 0) || (myMember.fightOption.curY > memberObj.fightOption.curY && y < 0)) {
                            y = -y;
                        }
                        break;
                    }
                }
            }
            //超出上面
            if (myMember.fightOption.curY > fightUtils.fightArea.height) {
                isCollide = true;
                y = 0.25 * -speed;
            }
            //超出下面
            if (myMember.fightOption.curY < 0) {
                isCollide = true;
                y = 0.25 * speed;
            }
            if (self.isCanAttack()) {
                if (self.isBestDistance() && !isCollide) {
                    this.setStatus(uw.memberStatus.NORMAL);
                }
                else {
                    if (y < 0.3) {
                        this.setStatus(uw.memberStatus.NORMAL);
                    }
                    else {
                        self.setOffsetPos(0, y);
                        self.setStatus(uw.memberStatus.RUN);
                    }
                }
                self.isReadyAttack = true;
            }
            else {
                if (isCollide) {
                    self.setOffsetPos(x, y);
                }
                else {
                    self.setOffsetPos(x, 0);
                }
                self.setStatus(uw.memberStatus.RUN);
            }
        };
        //计算是否达到攻击距离
        __egretProto__.isCanAttack = function () {
            var self = this;
            var dx = Math.abs(self.getCurPosX() - self.targetPos.x);
            var attackDistance = this.fightMember.fightOption.curSkill.attackDistance;
            return dx <= attackDistance;
        };
        //计算是否是最佳距离
        __egretProto__.isBestDistance = function () {
            var self = this;
            var yBestDistance = uw.Fight.unitPixel * this.fightMember.fightOption.curBestDistance;
            var dy = Math.abs(self.getCurPosY() - self.targetPos.y);
            var isBestY = dy <= yBestDistance;
            return this.isCanAttack() && isBestY;
        };
        //帧回调
        __egretProto__.onFrameEvent = function (display, evt, originFrameIndex, currentFrameIndex) {
            if (evt == uw.Fight.HeroEvent.attack) {
                uw.skillBiz.findTargetAndCalSkill(this.fightMember, this.enemyFrontMember, this.fightMember.fightOption.curSkill);
            }
            if (evt == uw.Fight.HeroEvent.effect) {
                //播放特效
                this.playSkillEffect(this.fightMember.fightOption.curSkill);
            }
            if (evt == uw.Fight.HeroEvent.uniquePauseEnd) {
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
                //攻击动作
                if (movementID == uw.Fight.HeroAction.normalAttack || movementID == uw.Fight.HeroAction.skillAttack1 || movementID == uw.Fight.HeroAction.skillAttack2 || movementID == uw.Fight.HeroAction.skillAttack3 || movementID == uw.Fight.HeroAction.uniqueAttack) {
                    //复活
                    if (this.fightMember.fightOption.curRevivalBuff) {
                        this.fightMember.fightOption.curRevivalBuff.controller.handle();
                    }
                    else {
                        this._skillFinish();
                        this.setStatus(uw.memberStatus.NORMAL);
                    }
                }
                else if (movementID == uw.Fight.HeroAction.hit) {
                    uw.heroActionBiz.calAction(this.fightMember, true);
                }
                else if (movementID == uw.Fight.HeroAction.dead) {
                    if (this.fightMember.fightOption.curRevivalBuff) {
                        //重生
                        this.fightMember.fightOption.curRevivalBuff.controller.playDisplay();
                    }
                    else {
                        display.deadFadeOut();
                    }
                }
            }
        };
        __egretProto__.calHp = function (hp, fromMember, isCrit) {
            hp = parseInt(hp);
            if (hp == 0)
                return;
            var self = this, fightMember = this.fightMember;
            if (fightMember.fightOption.curRevivalBuff)
                return;
            //目标消失，不受伤害
            if (fightMember.fightOption.curTargetMiss)
                return;
            if (fightMember.isDeath())
                return;
            //计算被动buff
            uw.passiveSkillBiz.cal(fightMember, fightMember, uw.skillPassiveType.RE_HP);
            //伤害则受击
            if (hp < 0) {
                uw.heroActionBiz.hit(fightMember);
            }
            var curHp = fightMember.hp;
            fightMember.hp += hp;
            if (fightMember.hp >= fightMember.baseData.hp) {
                fightMember.hp = fightMember.baseData.hp;
            }
            if (fightMember.hp <= 0) {
                fightMember.hp = 0;
                //不是分身，需要播放死亡动作
                if (!fightMember.fightOption.curIsClone) {
                    uw.heroActionBiz.death(fightMember); //播放死亡动作
                }
                //判断是否重生,如果重生先修改状态，等播放完死亡动作播放重生动作,限制一次
                uw.passiveSkillBiz.cal(fightMember, fightMember, uw.skillPassiveType.DEATH_ONE);
                //判断是否重生,如果重生先修改状态，等播放完死亡动作播放重生动作,不限制
                uw.passiveSkillBiz.cal(fightMember, fightMember, uw.skillPassiveType.DEATH_MORE);
                if (fightMember.fightOption.curRevivalBuff) {
                    fightMember.clearMemberStatus();
                    //重生
                    this._skillFinish(); //清除技能
                }
                else {
                    fightMember.death(fromMember);
                }
            }
            if (hp <= 0) {
                uw.fightUtils.log("【%s】对【%s】造成了去血[%d]", fromMember ? fromMember.name : "副本", fightMember.name, hp);
            }
            else {
                uw.fightUtils.log("【%s】对【%s】造成了回血[%d]", fromMember ? fromMember.name : "副本", fightMember.name, hp);
            }
            //设置血量条
            self.display.addBloodProgress(curHp, fightMember.hp, fightMember.baseData.hp);
            //冒血量值动画
            uw.FightShowBloodText.create(this.display, hp, true, isCrit);
            uw.fightHeroHpCtrl.setUpdateMember(fightMember);
        };
        __egretProto__.dtor = function () {
            this.fightMember.doDtor();
            _super.prototype.dtor.call(this);
        };
        FightMemberCtrl.__className = "FightMemberController";
        return FightMemberCtrl;
    })(mo.DataController);
    uw.FightMemberCtrl = FightMemberCtrl;
    FightMemberCtrl.prototype.__class__ = "uw.FightMemberCtrl";
})(uw || (uw = {}));

/**
 * Created by Administrator on 14-7-26.
 */
var uw;
(function (uw) {
    var FightRoundCtrl = (function (_super) {
        __extends(FightRoundCtrl, _super);
        function FightRoundCtrl() {
            _super.apply(this, arguments);
            this.round = -1; //当前回合
            this.roundStatus = 0; //回合状态
            this.isNeedToContinue = false;
            this.reTime = 0; //回合剩余时间
            this.preUpdateTime = 0; //上一次更新剩余时间(整秒)
            this.enterMemberNum = 0; //入场成员数
            this.isAllMembersEnter = false;
        }
        var __egretProto__ = FightRoundCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        __egretProto__.update = function (dt) {
            var self = this;
            if (self.roundStatus == self.__class.ROUND_STATUS_NONE)
                return;
            self.calReTime(dt);
            //如果是自动战斗时，该回合结束，则自动进入下一波
            if (uw.fightSelfHandSkillCtrl.isAutoFight && self.isNeedToContinue) {
                self.pushNotifyAtOnce(self.__class.NEMU_BTN_CONTINUE, null);
            }
            //判断回合是否结束
            self.checkOverRound();
        };
        __egretProto__.calReTime = function (dt) {
            var self = this;
            if (self.roundStatus == self.__class.ROUND_STATUS_OVER)
                return;
            self.reTime -= dt;
            //向上取整和上一次更新的数值不一样则更新
            var t = Math.ceil(self.reTime);
            if (t != self.preUpdateTime) {
                self.preUpdateTime = t;
                self.setReTime(t);
            }
            if (self.reTime <= 0) {
                self.roundFail(true);
            }
        };
        /**
         * 设置UI倒计时
         * @param time 秒
         */
        __egretProto__.setReTime = function (time) {
            this.pushNotifyAtOnce(this.__class.ON_REMAIN_TIME_CHANGED, time);
        };
        __egretProto__.onMemberEnter = function (member) {
            var self = this;
            self.enterMemberNum++;
            //只有开场第一次所有人进入才往下执行
            if (this.isAllMembersEnter) {
                return;
            }
            var mainCtrl = uw.fightMainCtrl;
            var allLiveNum = mainCtrl.selfGroup.liveNum + mainCtrl.enemyGroups[self.round].liveNum;
            if (self.enterMemberNum >= allLiveNum) {
                //所有人进入场景
                //如果是第3回合则弹开对话框
                if (self.round == 2) {
                    mainCtrl.showCopyTalk(true, function () {
                        self._allMemberEnter();
                    }, self);
                }
                else {
                    self._allMemberEnter();
                }
            }
        };
        __egretProto__._allMemberEnter = function () {
            uw.passiveSkillBiz.calByType(uw.skillPassiveType.ALL_IN_AREA);
            this.isAllMembersEnter = true;
        };
        __egretProto__.setFighting = function () {
            var self = this;
            self.roundStatus = self.__class.ROUND_STATUS_FIGHTING;
            self.reTime = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.fightConfig)[5];
        };
        __egretProto__._fightInitData = function (cb) {
            var self = this;
            self.round++;
            var mainController = uw.fightMainCtrl;
            //切换场景
            uw.fightScene.setCurWaveCount(self.round);
            var selfFightMembers = mainController.selfFightMembers;
            var enemyFightMembers = mainController.enemyFightMembers;
            var allFightMembers = mainController.allFightMembers;
            selfFightMembers.length = 0;
            enemyFightMembers.length = 0;
            allFightMembers.length = 0;
            uw.fightBiz.addFightMembers(selfFightMembers, mainController.selfGroup.members);
            uw.fightBiz.addFightMembers(enemyFightMembers, mainController.enemyGroups[self.round].members);
            mainController.allFightMembers = selfFightMembers.concat(enemyFightMembers);
            if (self.round == 0) {
                //初始手动技能，大招，领主技能
                uw.fightSelfHandSkillCtrl.initSkill();
                uw.fightHeroHpCtrl.initHpDic();
                uw.fightEnergyCtrl.fightBefore();
                //计算总血量
                mainController.calStartHpCount();
            }
            //初始对方手动技能，大招，领主技能
            uw.fightEnemyHandSkillCtrl.initSkill();
            //添加英雄到场景，再初始化和开始游戏
            uw.fightBiz.addAllMembersToScene(self.round, function () {
                if (self.round == 0) {
                    self.pushNotifyAtOnce(self.__class.SHOW_START_LAYER, null);
                }
                //被动秘术计算
                uw.skillBiz.calPassiveSecretSkills();
                //初始化成员
                self._initMembersBefore();
                //释放移除成员的内存
                uw.fightUtils.releaseRemoveMembers();
                cb();
            });
        };
        //战斗回合前
        __egretProto__.startRoundFight = function () {
            var self = this;
            this._fightInitData(function () {
                self.setFighting();
            });
        };
        //战斗前对方初始化
        __egretProto__._initMembersBefore = function () {
            var members = uw.fightMainCtrl.allFightMembers;
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                var locController = locMember.fightOption.curController;
                locController.fightBefore();
            }
        };
        //战斗结束己方初始化
        __egretProto__._initMembersEnd = function () {
            var members = uw.fightMainCtrl.allFightMembers;
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                var locController = locMember.fightOption.curController;
                locController.fightEnd();
            }
        };
        //判断是否回合结束
        __egretProto__.checkOverRound = function () {
            var self = this;
            var mainController = uw.fightMainCtrl;
            //技能都释放完才往下走
            if (self.roundStatus == self.__class.ROUND_STATUS_OVER)
                return;
            //失败
            if (mainController.selfGroup.liveNum == 0) {
                self.roundFail();
            }
            //回合结束
            if (mainController.enemyGroups[self.round].liveNum == 0) {
                self.roundEnd();
            }
        };
        __egretProto__.roundFail = function (isTimeOut) {
            var self = this;
            self.roundStatus = this.__class.ROUND_STATUS_OVER;
            uw.fightSelfHandSkillCtrl.enableAllSkill();
            uw.fightEnemyHandSkillCtrl.enableAllSkill();
            uw.fightUtils.delayCall(1, function () {
                uw.fightMainCtrl.gameOver(false, isTimeOut);
            }, self);
        };
        //判断是否还有人在放技能
        __egretProto__.checkHasSkillMember = function () {
            var mainController = uw.fightMainCtrl;
            var selfFightMembers = mainController.selfFightMembers;
            var enemyFightMembers = mainController.enemyFightMembers;
            var selfSkillMembers = uw.fightBiz.getMembersByStatus(selfFightMembers, uw.memberStatus.SKILL);
            var enemySkillMembers = uw.fightBiz.getMembersByStatus(enemyFightMembers, uw.memberStatus.SKILL);
            if (selfSkillMembers.length > 0 || enemySkillMembers.length > 0)
                return true;
            return false;
        };
        //结束战斗
        __egretProto__.roundEnd = function () {
            uw.fightUtils.log("第%d回合结束!roundEnd", this.round + 1);
            //判断是否还有人在放技能
            //if(this.checkHasSkillMember()) return;
            this._initMembersEnd();
            this.roundStatus = this.__class.ROUND_STATUS_OVER;
            this.enterMemberNum = 0;
            this.isAllMembersEnter = false;
            if (this.round >= uw.fightMainCtrl.enemyGroups.length - 1) {
                mo.playUIAudio(res.audio_ui.cheer);
                uw.skillBiz.showAllWin();
                //已经是最后一波，游戏结束，胜利
                uw.fightUtils.delayCall(4, function () {
                    uw.fightMainCtrl.gameOver(true);
                }, this);
            }
            else {
                this.isNeedToContinue = true;
                this.pushNotifyAtOnce(this.__class.SHOW_BTN_CONTINUE, null);
            }
            uw.fightSelfHandSkillCtrl.enableAllSkill();
            uw.fightEnemyHandSkillCtrl.enableAllSkill();
        };
        //跑出场景
        __egretProto__.runOutScene = function () {
            var selfFightMembers = uw.fightMainCtrl.selfFightMembers;
            var randomTime, hero, member;
            var screenWidth = mo.visibleRect.getWidth();
            var moveDistance = screenWidth * ((1 - 0.2434375 * 2) + 0.45);
            var resetDistance = screenWidth * (0.45 * 2 + (1 - 0.2434375 * 2));
            for (var i = 0; i < selfFightMembers.length; i++) {
                member = selfFightMembers[i];
                if (member.isDeath())
                    continue;
                hero = member.fightOption.curController.display;
                hero.forward(false);
                if (hero.getIsSelf()) {
                    var seq = mo.sequence(mo.callFunc(function (sender) {
                        sender.run();
                    }, this), mo.moveBy(2, mo.p(moveDistance, 0)), mo.callFunc(function (sender) {
                        sender.clearStatus(false);
                        sender.steady();
                    }, this));
                    hero.runAction(seq);
                }
            }
            //跑完开始下回合
            uw.fightUtils.delayCall(2.5, this.startRoundFight, this);
        };
        //点击进入下一回合
        __egretProto__.onNextRound = function () {
            if (!this.isNeedToContinue)
                return;
            this.isNeedToContinue = false;
            //下一波继续，成员跑出场景
            var self = this;
            uw.fightUtils.delayCall(0.5, function () {
                self.nextInitData();
                self.runOutScene();
            }, self);
        };
        //过关恢复
        __egretProto__.nextInitData = function () {
            var selfFightMembers = uw.fightMainCtrl.selfFightMembers;
            for (var i = 0; i < selfFightMembers.length; i++) {
                var locMember = selfFightMembers[i];
                //过关恢复
                locMember.fightOption.curController.recovery();
                //设置为正反方向
                var locDisplay = locMember.fightOption.curController.display;
                locDisplay.setScaleX(Math.abs(locDisplay.getScaleX()));
            }
        };
        FightRoundCtrl.__className = "FightRoundCtrl";
        FightRoundCtrl.ROUND_STATUS_NONE = 0; //正常
        FightRoundCtrl.ROUND_STATUS_FIGHTING = 1; //战斗中
        FightRoundCtrl.ROUND_STATUS_OVER = 2; //回合结束
        FightRoundCtrl.SHOW_BTN_CONTINUE = "showBtnContinue";
        FightRoundCtrl.NEMU_BTN_CONTINUE = "menuBtnContinue";
        FightRoundCtrl.ON_REMAIN_TIME_CHANGED = "onRemainTimeChanged";
        FightRoundCtrl.SHOW_START_LAYER = "showStartLayer";
        return FightRoundCtrl;
    })(mo.DataController);
    uw.FightRoundCtrl = FightRoundCtrl;
    FightRoundCtrl.prototype.__class__ = "uw.FightRoundCtrl";
})(uw || (uw = {}));

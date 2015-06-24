/**
 * Created by Administrator on 14-12-9.
 */
var uw;
(function (uw) {
    uw.isFightSimulate = false;
    /**
     * Created by Administrator on 14-10-20.
     */
    var FightSimulateCtrl = (function (_super) {
        __extends(FightSimulateCtrl, _super);
        function FightSimulateCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightSimulateCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.selfMemberIds = [11010, 11011, 11012, 11013, 11014]; //奎爷，小左，萨菲，黑岩，马甲
            self.enemyMemberIds = [11001];
            self.simulateCopyId = 60001;
            self.round = 0;
            var winSize = mo.visibleRect.getSize();
            //己方最终站位
            self.selfMemberPos = [];
            self.selfMemberPos[0] = mo.p(winSize.width - 950, 300);
            self.selfMemberPos[1] = mo.p(winSize.width - 1250, 200);
            self.selfMemberPos[2] = mo.p(winSize.width - 1350, 400);
            self.selfMemberPos[3] = mo.p(winSize.width - 1750, 200);
            self.selfMemberPos[4] = mo.p(winSize.width - 1850, 400);
            //敌方站位
            self.enemyMemberPos = [mo.p(winSize.width - 150, 301)];
        };
        //开始模拟战斗
        __egretProto__.startFight = function () {
            var self = this;
            self._gameStatus = self.__class.GAME_STATUS.NORMAL;
            uw.fightUtils.delayCall(1, self.membersRunOut, self);
            mo.tick(self.update, self);
        };
        //监听模拟战斗结束
        __egretProto__.onEndFight = function () {
            var self = this;
            uw.fightUtils.delayCall(1, function () {
                uw.isFightSimulate = false;
                self.purge();
                mo.sceneMgr.popScene(null, function (err, scene) {
                    scene.showTalk();
                });
            }, self);
        };
        /**
         * 开始战斗
         */
        __egretProto__.startGame = function () {
            var self = this;
            mo.sceneMgr.pushScene(uw.SimulateFightScene, mo.SceneMgr.LOADING_TYPE_ARMATURE, function (cb) {
                //初始化成员组
                self.initMemberGroup();
                //预加载资源
                uw.fightUtils.preload(cb);
            }, function (err, scene) {
                uw.fightScene = scene;
                uw.fightScene.initWithData(self.copyId, self.enemyGroups.length);
                uw.fightRoundCtrl.startRoundFight();
                self.startFight();
            });
        };
        __egretProto__.initSelfGroup = function () {
            var self = this;
            var group = new uw.FightGroup();
            var selfMemberIds = self.selfMemberIds;
            for (var i = 0; i < selfMemberIds.length; i++) {
                var locId = selfMemberIds[i];
                var locMember = uw.FightMember.create(mo.getJSONWithFileNameAndID(uw.cfg_t_monster, locId), uw.memberType.MONSTER, i);
                locMember.fightOption.curController = uw.FightSimulateMemberCtrl.create(locMember);
                group.addMember(locMember);
            }
            self.selfGroup = group;
            self.selfGroup.setIsChallenger(true); //设置为挑战方
            self.m_kuiye = group.members[0]; //奎爷
            self.m_xiaozuo = group.members[1]; //小左
            self.m_safei = group.members[2]; //萨菲
            self.m_heiyan = group.members[3]; //黑岩
            self.m_majia = group.members[4]; //马甲
        };
        __egretProto__.initEnemyGroups = function () {
            var self = this;
            var group = new uw.FightGroup();
            var selfMemberIds = self.enemyMemberIds;
            for (var i = 0; i < selfMemberIds.length; i++) {
                var locId = selfMemberIds[i];
                var locMember = uw.FightMember.create(mo.getJSONWithFileNameAndID(uw.cfg_t_monster, locId), uw.memberType.MONSTER, i);
                locMember.fightOption.curController = uw.FightSimulateMemberCtrl.create(locMember);
                group.addMember(locMember);
            }
            group.setIsChallenger(false); //设置为挑战方
            self.enemyGroups = [group];
            self.m_huolong = group.members[0]; //火龙
        };
        __egretProto__.membersRunOut = function () {
            var self = this;
            //自方出场
            self.selfMembersRunOut();
            uw.fightUtils.delayCall(3.6, function () {
                //龙出场
                self.enemyOut();
            }, self);
            uw.fightUtils.delayCall(8.5, function () {
                self.talk1();
            }, self);
        };
        //出场
        __egretProto__.selfMembersRunOut = function () {
            var self = this;
            var winSize = mo.visibleRect.getSize();
            var diffX = self.selfMemberPos[0].x + 200;
            for (var i = 0; i < self.selfFightMembers.length; i++) {
                var locMember = self.selfFightMembers[i];
                var locEndPos = self.selfMemberPos[i];
                var locTime = 2.5 + (i * 0.2);
                var startPos = mo.p(locEndPos.x - diffX, locEndPos.y);
                locMember.fightOption.curController.moveOut(startPos, locEndPos, locTime);
            }
        };
        //龙出场
        __egretProto__.enemyOut = function () {
            var self = this;
            var controller = self.m_huolong.fightOption.curController;
            controller.setCurPos(self.enemyMemberPos[0].x, self.enemyMemberPos[0].y);
            controller.display.setVisible(true);
            controller.setStatus(uw.memberStatus.RUN); //当前状态
            controller.enterArea();
        };
        //对白第一回合
        __egretProto__.talk1 = function () {
            var self = this;
            var layer = uw.fightScene.callTalkLayer();
            var talks = [];
            talks[0] = { tempId: self.m_kuiye.tempId, align: 0, content: uw.fightUtils.getSimulateData(101) }; //奎爷
            talks[1] = { tempId: self.m_huolong.tempId, align: 1, content: uw.fightUtils.getSimulateData(102) }; //火龙
            self.pauseFight();
            layer.setTalkData(talks);
            layer.onClose(function () {
                self.resumeFight();
                self.round1();
            }, this);
        };
        //第一回合
        __egretProto__.round1 = function () {
            var self = this;
            self.round = 1;
            //1、  火龙->【爪击】
            uw.fightUtils.delayCall(0.1, function () {
                self.m_huolong.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(301)[0]);
            }, self);
            //2、  奎爷->【普攻】
            uw.fightUtils.delayCall(0.2, function () {
                self.m_kuiye.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(302)[0]);
            }, self);
            //3、  黑岩->【技1】
            uw.fightUtils.delayCall(0.3, function () {
                self.m_heiyan.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(303)[0]);
            }, self);
            //4、  玛嘉->【普攻】
            uw.fightUtils.delayCall(0.4, function () {
                self.m_majia.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(304)[0]);
            }, self);
            //5、   萨菲->【技1】
            uw.fightUtils.delayCall(0.3, function () {
                self.m_safei.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(305)[0]);
                uw.fightEnergyCtrl.replayEnergy(self.m_kuiye, 200);
                uw.fightEnergyCtrl.replayEnergy(self.m_majia, 50);
                uw.fightEnergyCtrl.replayEnergy(self.m_xiaozuo, 100);
                uw.fightEnergyCtrl.replayEnergy(self.m_heiyan, 80);
            }, self);
            //6、  佐助->【普攻】
            uw.fightUtils.delayCall(0.2, function () {
                self.m_xiaozuo.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(306)[0]);
            }, self);
            //进入回合2
            uw.fightUtils.delayCall(3.2, function () {
                self.round2();
            }, self);
        };
        __egretProto__.round2 = function () {
            var self = this;
            self.round = 2;
            //1、  奎爷->【技2】
            uw.fightUtils.delayCall(0.1, function () {
                self.m_kuiye.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(321)[0]);
            }, self);
            //2、  黑岩->【普攻
            uw.fightUtils.delayCall(0.2, function () {
                self.m_heiyan.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(322)[0]);
            }, self);
            //3、  玛嘉->【技1】
            uw.fightUtils.delayCall(0.3, function () {
                self.m_majia.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(323)[0]);
            }, self);
            //4、  萨菲->【普攻）】
            uw.fightUtils.delayCall(0.4, function () {
                self.m_safei.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(324)[0]);
            }, self);
            //5、   佐助->【技1】
            uw.fightUtils.delayCall(0.5, function () {
                self.m_xiaozuo.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(325)[0]);
            }, self);
            //6、   火龙->【吐息（喷火）】
            uw.fightUtils.delayCall(2.5, function () {
                self.m_huolong.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(326)[0]);
            }, self);
            //8、   萨菲罗斯被打倒
            uw.fightUtils.delayCall(4.5, function () {
                self.m_safei.hp = 0;
                uw.heroActionBiz.death(self.m_safei); //播放死亡动作
                self.m_safei.death(self.m_huolong);
                uw.fightEnergyCtrl.replayEnergy(self.m_kuiye, 10000);
                uw.fightEnergyCtrl.replayEnergy(self.m_majia, 10000);
                uw.fightEnergyCtrl.replayEnergy(self.m_xiaozuo, 10000);
                uw.fightEnergyCtrl.replayEnergy(self.m_heiyan, 10000);
            }, self);
            uw.fightUtils.delayCall(5, function () {
                self.round3();
            }, self);
        };
        __egretProto__.round3 = function () {
            var self = this;
            self.round = 3;
            async.series([
                function (cb1) {
                    self._round3_1(cb1);
                },
                function (cb1) {
                    self._round3_2(cb1);
                },
                function (cb1) {
                    self._round3_3(cb1);
                },
                function (cb1) {
                    self._round3_4(cb1);
                },
                function (cb1) {
                    self._round3_5(cb1);
                },
                function (cb1) {
                    self._round3_6(cb1);
                },
                function (cb1) {
                    self._round3_7(cb1);
                },
                function (cb1) {
                    self._round3_8(cb1);
                }
            ], function (err) {
                if (err)
                    uw.log("报错？", err);
                self.onEndFight();
            });
        };
        //回合前对白
        __egretProto__._round3_1 = function (cb) {
            var self = this;
            var layer = uw.fightScene.callTalkLayer();
            var talks = [];
            talks[0] = { tempId: self.m_safei.tempId, align: 0, content: uw.fightUtils.getSimulateData(401) }; //萨菲
            talks[1] = { tempId: self.m_kuiye.tempId, align: 0, content: uw.fightUtils.getSimulateData(402) }; //奎爷
            self.pauseFight();
            layer.setTalkData(talks);
            layer.onClose(function () {
                self.resumeFight();
                cb();
            }, this);
        };
        //提示并且使用秘术
        __egretProto__._round3_2 = function (cb) {
            var self = this;
            var skillCtrl = uw.fightSelfHandSkillCtrl;
            var fightSkill = skillCtrl.allUserSkills[0];
            skillCtrl.useUserSkill(0);
            //穿插佐助->【技2】
            uw.fightUtils.delayCall(0.1, function () {
                self.m_xiaozuo.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(327)[0]);
                self.m_xiaozuo.fightOption.curController.display.setChangeBody(true);
            }, self);
            uw.fightUtils.delayCall(2, function () {
                cb();
            }, self);
        };
        //麻嘉对白+使用大招
        __egretProto__._round3_3 = function (cb) {
            var self = this;
            //穿插奎爷
            self.m_kuiye.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(302)[0]);
            self._useHandSkill(self.m_majia);
            uw.fightUtils.delayCall(2.5, function () {
                cb();
            }, self);
        };
        //小左对白+使用大招
        __egretProto__._round3_4 = function (cb) {
            var self = this;
            //穿插黑岩
            self.m_heiyan.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(322)[0]);
            //穿插奎爷
            self.m_kuiye.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(302)[0]);
            self._useHandSkill(self.m_xiaozuo);
            uw.fightUtils.delayCall(2.5, function () {
                cb();
            }, self);
        };
        //奎爷对白+使用大招
        __egretProto__._round3_5 = function (cb) {
            var self = this;
            //穿插麻嘉
            self.m_majia.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(304)[0]);
            //穿插黑岩
            self.m_heiyan.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(322)[0]);
            self._useHandSkill(self.m_kuiye);
            uw.fightUtils.delayCall(2.5, function () {
                cb();
            }, self);
        };
        //火龙对白+使用火雨
        __egretProto__._round3_6 = function (cb) {
            var self = this;
            self.m_huolong.fightOption.curController.useSkill(uw.fightUtils.getSimulateData(504)[0]);
            uw.fightUtils.delayCall(2.5, function () {
                cb();
            }, self);
        };
        //其他人死亡
        __egretProto__._round3_7 = function (cb) {
            var self = this;
            self.m_heiyan.hp = 0;
            uw.heroActionBiz.death(self.m_heiyan); //播放死亡动作
            self.m_heiyan.death(self.m_huolong);
            self.m_xiaozuo.hp = 0;
            uw.heroActionBiz.death(self.m_xiaozuo); //播放死亡动作
            self.m_xiaozuo.death(self.m_huolong);
            self.m_majia.hp = 0;
            uw.heroActionBiz.death(self.m_majia); //播放死亡动作
            self.m_majia.death(self.m_huolong);
            uw.fightUtils.delayCall(0.5, function () {
                cb();
            }, self);
        };
        __egretProto__._useHandSkill = function (member) {
            var self = this;
            var skillCtrl = uw.fightSelfHandSkillCtrl;
            var fightSkill = self._getCurMixSkillByMember(member);
            skillCtrl.useMixSkill(member.fightOption.curPos);
        };
        //画面变白+剧终对白
        __egretProto__._round3_8 = function (cb) {
            cb();
        };
        __egretProto__._getCurMixSkillByMember = function (member) {
            var allMixSkills = uw.fightSelfHandSkillCtrl.allMixSkills;
            for (var i = 0; i < allMixSkills.length; i++) {
                var locFightSkill = allMixSkills[i];
                if (locFightSkill.member == member)
                    return locFightSkill;
            }
            return null;
        };
        __egretProto__.saveResult = function (isWin) {
        };
        FightSimulateCtrl.fight = function () {
            uw.isFightSimulate = true;
            uw.fightMainCtrl = uw.FightSimulateCtrl.create();
            uw.fightMainCtrl.initWithCopyId(uw.c_prop.matrixTypeKey.simulate, 60001, function () {
            }, uw.fightMainCtrl);
        };
        FightSimulateCtrl.__className = "FightDemoController";
        return FightSimulateCtrl;
    })(uw.FightMainCtrl);
    uw.FightSimulateCtrl = FightSimulateCtrl;
    FightSimulateCtrl.prototype.__class__ = "uw.FightSimulateCtrl";
})(uw || (uw = {}));

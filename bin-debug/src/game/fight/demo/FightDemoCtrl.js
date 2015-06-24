/**
 * Created by Administrator on 14-10-20.
 */
var uw;
(function (uw) {
    var FightDemoCtrl = (function (_super) {
        __extends(FightDemoCtrl, _super);
        function FightDemoCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightDemoCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.selfFightMembers = [];
            self.enemyFightMembers = [];
            self.selfGroup = new uw.FightGroup();
            self.selfGroup.members = self.selfFightMembers;
            self.enemyGroups = [new uw.FightGroup()];
            self.enemyGroups[0].members = self.enemyFightMembers;
            uw.Fight.isExit = false;
            mo.pauseMusic();
        };
        __egretProto__.init = function (display) {
            _super.prototype.init.call(this, display);
            uw.fightMainCtrl = uw.fightDemoCtr = this;
            var self = this;
            self.display = display;
            self.initEnemyMembers();
            uw.fightRoundCtrl.round = 0;
            uw.fightActionManager = uw.FightActionManager.create();
            mo.tick(self.update, self);
        };
        __egretProto__.onExit = function () {
            var self = this;
            mo.clearTick(self.update, self);
            uw.fightMainCtrl = uw.fightDemoCtr = null;
            uw.Fight.isDemo = false;
            uw.Fight.isExit = true;
        };
        __egretProto__.initSelfMember = function (warriorData) {
            var tempId = warriorData[uw.t_warrior_id];
            var self = this;
            if (self.selfMember) {
                if (self.selfMember.tempId == tempId)
                    return;
                var display = self.selfMember.fightOption.curController.display;
                if (display)
                    display.removeFromParent();
            }
            //添加到场景
            var locHeroData;
            if (tempId < 10000) {
                var t_hero = mo.getJSONWithFileName(uw.cfg_t_hero);
                locHeroData = t_hero[tempId];
            }
            else {
                var t_monster = mo.getJSONWithFileName(uw.cfg_t_monster);
                locHeroData = t_monster[tempId];
            }
            self.selfFightMembers.length = 0;
            self.display.addChar(tempId, true, function (display) {
                var member = uw.FightMember.create(locHeroData, uw.memberType.MONSTER, 0);
                member.curWarriorData = warriorData;
                member.fightOption.curIsChallenger = true;
                member.fightOption.curController = uw.FightDemoMemberCtrl.create(member, display);
                self.selfMember = member;
                self.display.initSkillBtn(member);
                self.selfFightMembers.push(member);
                self.resetPos();
            }, this);
        };
        __egretProto__.resetPos = function () {
            var self = this;
            var winSize = mo.visibleRect.getSize();
            self.selfMember.fightOption.curController.setCurPos(550, 300);
            var distance = self.selfMember.fightOption.curNormalSkill.attackDistance;
            for (var i = 0; i < self.enemyFightMembers.length; i++) {
                var locMember = self.enemyFightMembers[i];
                if (locMember.fightOption.curPos == 0) {
                    locMember.fightOption.curController.setCurPos(self.selfMember.fightOption.curX + distance, 300);
                }
                if (locMember.fightOption.curPos == 1) {
                    locMember.fightOption.curController.setCurPos(self.selfMember.fightOption.curX + distance + 200, 500);
                }
                if (locMember.fightOption.curPos == 2) {
                    locMember.fightOption.curController.setCurPos(self.selfMember.fightOption.curX + distance + 200, 200);
                }
            }
        };
        __egretProto__.initEnemyMembers = function () {
            var winSize = mo.visibleRect.getSize();
            this.addEnemyMember(mo.p(winSize.width - 600, 300), 10019, 0);
            this.addEnemyMember(mo.p(winSize.width - 400, 500), 10003, 1);
            this.addEnemyMember(mo.p(winSize.width - 400, 200), 10003, 2);
        };
        __egretProto__.addEnemyMember = function (pos, monsterTempId, curPos) {
            var self = this;
            var warriorData = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, monsterTempId);
            var t_monster = mo.getJSONWithFileName(uw.cfg_t_monster);
            var locHeroData = t_monster[monsterTempId];
            self.display.addChar(monsterTempId, false, function (display) {
                var member = uw.FightMember.create(locHeroData, uw.memberType.MONSTER, curPos);
                member.fightOption.curIsChallenger = false;
                member.curWarriorData = warriorData;
                member.fightOption.curController = uw.FightDemoMemberCtrl.create(member, display);
                member.fightOption.curController.isFaceLeft = true;
                member.fightOption.curController.setCurPos(pos.x, pos.y);
                self.enemyFightMembers.push(member);
            }, this);
        };
        __egretProto__.onSkill = function (skillAction) {
            if (!this.selfMember)
                return;
            this.selfMember.fightOption.curController.onSkill(skillAction);
        };
        __egretProto__.onAction = function (actionName) {
            if (!this.selfMember)
                return;
            uw.heroActionBiz.play(this.selfMember, actionName);
        };
        __egretProto__.mixPauseStart = function () {
            var self = this;
            var mainLayer = uw.fightScene.getMainLayer();
            mainLayer.showMaskLayer();
            self.setHighLight(self.enemyFightMembers, false);
            self.setHighLight([self.selfMember], true);
        };
        __egretProto__.mixPauseEnd = function () {
            var self = this;
            var mainLayer = uw.fightScene.getMainLayer();
            mainLayer.hideMaskLayer();
            self.setHighLight(self.enemyFightMembers, true);
        };
        __egretProto__.setHighLight = function (members, bool) {
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                locMember.fightOption.curController.display.setHighLight(bool);
            }
        };
        __egretProto__.onPlayMix = function (skillDisplayData) {
            var skillId = uw.fightMixSkillEffectCtrl.mixSkillIds[skillDisplayData[uw.t_skillDisplay_id]];
            var skillData = uw.getSkillData(skillId, 1);
            var fightSkill = uw.FightSkill.create(null, skillData, true);
            uw.FightMixSkillEffectBaseCtrl.create(fightSkill);
            mo.playSkillAudio(fightSkill.skill.id, false);
        };
        __egretProto__.update = function (dt) {
            dt = dt / 1000;
            dt = dt > 0.05 ? 0.05 : dt;
            uw.fightActionManager.update(dt);
            for (var i = 0; i < this.selfFightMembers.length; i++) {
                var locMember = this.selfFightMembers[i];
                locMember.fightOption.curController.update(dt);
            }
            for (var i = 0; i < this.enemyFightMembers.length; i++) {
                var locMember = this.enemyFightMembers[i];
                locMember.fightOption.curController.update(dt);
            }
        };
        FightDemoCtrl.__className = "FightDemoController";
        FightDemoCtrl.enter = function () {
            uw.Fight.isDemo = true;
            mo.sceneMgr.pushScene(uw.FightDemoScene, mo.SceneMgr.LOADING_TYPE_ARMATURE, function (cb) {
                cb();
            }, function (err, scene) {
                uw.fightScene = scene;
                scene.show();
            });
        };
        FightDemoCtrl.testRole = function (index) {
            var d = uw.fightMainCtrl.display;
            d.onClickItem(null, null, index);
        };
        FightDemoCtrl.testMix = function (index) {
            var d = uw.fightMainCtrl.display;
            d.onClickMixItem(null, null, index);
        };
        return FightDemoCtrl;
    })(uw.FightMainCtrl);
    uw.FightDemoCtrl = FightDemoCtrl;
    FightDemoCtrl.prototype.__class__ = "uw.FightDemoCtrl";
})(uw || (uw = {}));

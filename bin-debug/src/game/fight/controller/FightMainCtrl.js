/**
 * 战斗控制器
 */
var uw;
(function (uw) {
    var FightMainCtrl = (function (_super) {
        __extends(FightMainCtrl, _super);
        function FightMainCtrl() {
            _super.apply(this, arguments);
            this.copyId = 0;
            this.rankId = 0;
            this.playingTime = 0; //游戏进行时间
            this.startHpCount = 0; //开始时的总血量
            this.isTimeOut = false;
            this.isFightWithMonster = false;
        }
        var __egretProto__ = FightMainCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._actionQueue = [];
            self.selfFightMembers = [];
            self.enemyFightMembers = [];
            self.allFightMembers = [];
            self.removeFightMembers = [];
            self._resData = [];
            self.fightArea = mo.size(mo.visibleRect.getWidth(), 700);
            self._gameStatus = self.__class.GAME_STATUS.PAUSE;
        };
        __egretProto__.init = function (display) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var self = this;
            _super.prototype.init.call(this);
            uw.fightActionManager = uw.FightActionManager.create();
            uw.fightRoundCtrl = uw.FightRoundCtrl.create();
            if (uw.isFightSimulate) {
                uw.fightSelfHandSkillCtrl = uw.SelfSimulateHandSkillCtrl.create();
            }
            else {
                uw.fightSelfHandSkillCtrl = uw.FightSelfHandSkillCtrl.create();
            }
            uw.fightEnemyHandSkillCtrl = uw.FightEnemyHandSkillCtrl.create();
            uw.fightEnergyCtrl = uw.FightEnergyCtrl.create();
            uw.fightActionPauseCtrl = uw.FightActionPauseCtrl.create();
            uw.fightHeroHpCtrl = uw.FightHeroHpCtrl.create();
            uw.fightHeroEnergyCtrl = uw.FightHeroEnergyCtrl.create();
            uw.fightUserEnergyCtrl = uw.FightUserEnergyCtrl.create();
            //战斗前站位
            this._initFightBeforePos();
            uw.Fight.isExit = false;
        };
        /**
         * @param fightType
         * @param copyId
         * @param selector 成功进入战斗的cb
         * @param target 成功进入战斗的target
         */
        __egretProto__.initWithCopyId = function (fightType, copyId, selector, target) {
            this.fightType = fightType;
            this.copyId = copyId;
            this._selector = selector;
            this._target = target;
            this.initWithData();
        };
        /**
         * @param fightType
         * @param rankId
         * @param selector 成功进入战斗的cb
         * @param target 成功进入战斗的target
         */
        __egretProto__.initWithRankId = function (fightType, rankId, selector, target) {
            this.fightType = fightType;
            this.rankId = rankId;
            this.copyId = uw.Fight.arenaCopyId;
            this._selector = selector;
            this._target = target;
            this.initWithData();
        };
        __egretProto__._initFightBeforePos = function () {
            this.fightBeforePos = [];
            var fightBeforePos = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.fightBeforePos);
            for (var i = 0; i < fightBeforePos.length; i++) {
                var locPos = fightBeforePos[i].split(",");
                var x = parseFloat(locPos[0]);
                var y = parseFloat(locPos[1]);
                if (i < 5) {
                    this.fightBeforePos[i] = mo.p(x, y);
                }
                else {
                    this.fightBeforePos[i + 5] = mo.p(x, y);
                }
            }
        };
        __egretProto__._initWithMatrixType = function () {
            var self = this, fightType = self.fightType;
            var matrixTypeKey = uw.c_prop.matrixTypeKey;
            //普通副本
            if (matrixTypeKey.copy == fightType) {
                self.isFightWithMonster = true;
            }
            else if (matrixTypeKey.trial == fightType) {
                self.isFightWithMonster = true;
            }
            else if (matrixTypeKey.tower == fightType) {
                self.isFightWithMonster = true;
            }
            else if (matrixTypeKey.arenaA == fightType) {
            }
            else if (matrixTypeKey.mirrorA == fightType) {
                self.isFightWithMonster = true;
            }
            else if (matrixTypeKey.mirrorPVPA == fightType) {
            }
            else {
            }
        };
        __egretProto__.initWithData = function () {
            var self = this;
            self._selector.call(self._target);
            self._selector = null;
            self._target = null;
            self.resModuleName = self.__className;
            self._initWithMatrixType();
            //加载战斗所要用到的资源
            self.startGame();
        };
        //初始化战斗组
        __egretProto__.initMemberGroup = function () {
            var self = this;
            self.initSelfGroup();
            self.initEnemyGroups();
        };
        __egretProto__.initSelfGroup = function () {
            var self = this;
            self.selfGroup = uw.fightBiz.getSelfGroupByMatrixType(self.fightType);
            self.selfGroup.setIsChallenger(true); //设置为挑战方
        };
        __egretProto__.initEnemyGroups = function () {
            var self = this;
            //敌方阵营
            if (self.fightType == uw.c_prop.matrixTypeKey.arenaA) {
                self.enemyGroups = uw.fightBiz.getGroupByHeroes(uw.arenaDataCtrl.enemyHeros);
            }
            else if (self.fightType == uw.c_prop.matrixTypeKey.mirrorA) {
                var type = uw.mirrorDataCtrl.getTypeByCopyId4PVE(self.copyId);
                self.enemyGroups = uw.fightBiz.getMirrorGroupByMembers(self.selfGroup.members, type);
            }
            else if (self.fightType == uw.c_prop.matrixTypeKey.mirrorPVPA) {
                var mirrorEnemy = uw.mirrorDataCtrl.getEnemyHeros();
                self.enemyGroups = uw.fightBiz.getGroupByHeroes(mirrorEnemy);
            }
            else {
                self.enemyGroups = uw.FightGroup.getGrpArrByCopy(self.copyId);
            }
        };
        /**
         * 开始战斗
         */
        __egretProto__.startGame = function () {
            var self = this;
            uw.fightUtils.log("开始战斗!startGame");
            self._gameStatus = self.__class.GAME_STATUS.NORMAL;
            //var sceneToPopTo = self._getSceneToPopTo();
            //var moduleName = sceneToPopTo ? sceneToPopTo.__className : null;
            //mo.sceneMgr.popToWhenNextPush(moduleName);
            mo.sceneMgr.pushScene(uw.FightScene, mo.SceneMgr.LOADING_TYPE_ARMATURE, function (cb) {
                //初始化成员组
                self.initMemberGroup();
                //预加载资源
                uw.fightUtils.preload(cb);
            }, function (err, scene) {
                uw.fightScene = scene;
                uw.fightScene.initWithData(self.copyId, self.enemyGroups.length);
                uw.fightRoundCtrl.startRoundFight();
                mo.tick(self.update, self);
            });
        };
        /**
         * 结束战斗
         */
        __egretProto__.gameOver = function (isWin, isTimeOut) {
            var self = this;
            self.isTimeOut = isTimeOut ? true : false;
            if (isWin) {
                self.showCopyTalk(false, function () {
                    self._gameOverResult(isWin);
                }, self);
            }
            else {
                this._gameOverResult(isWin);
            }
            var eventType = gEventType.fightEnd;
            if (mo.actionDispatcher.willTrigger(eventType)) {
                var event = new mo.Event(eventType);
                mo.actionDispatcher.dispatchEvent(event);
            }
        };
        /**
         * @param isBefore  是否开场前
         * @param func   关闭回调
         * @param target
         */
        __egretProto__.showCopyTalk = function (isBefore, func, target) {
            var self = this;
            if (!uw.checkTalkByCopyId(self.copyId, isBefore)) {
                func.call(target);
                return;
            }
            //暂停战斗
            self.pauseFight();
            var talkLayer = uw.fightScene.callTalkLayer();
            this._talkLayer = talkLayer;
            if (isBefore) {
                talkLayer.showBeforeTalk();
            }
            else {
                talkLayer.showAfterTalk();
            }
            talkLayer.onClose(function () {
                mo.unschedule(self.nextTalk, self);
                self.resumeFight();
                func.call(target);
            });
            //自动战斗，2秒自动跳过
            if (uw.fightSelfHandSkillCtrl.isAutoFight) {
                mo.schedule(self.nextTalk, self, 1500, false);
            }
        };
        /**
         * 跳过对话
         */
        __egretProto__.nextTalk = function () {
            var self = this;
            self._talkLayer.nextTalk();
        };
        __egretProto__._gameOverResult = function (isWin) {
            uw.fightUtils.log("结束战斗!gameOver");
            var self = this;
            this._gameStatus = this.__class.GAME_STATUS.OVER;
            mo.clearTick(self.update, self);
            self.saveResult(isWin);
        };
        //结算
        __egretProto__.saveResult = function (isWin) {
            var self = this;
            var matrixTypeKey = uw.c_prop.matrixTypeKey, copyId = self.copyId, fightType = self.fightType;
            //结算
            var hpRe = this.getCurHpCount(); //剩余血量
            var hpCount = this.startHpCount; //总血量
            var fightData = uw.fightUtils.calFightData(self.copyId, hpRe, hpCount);
            //布阵信息
            var matrix = self.getMatrix();
            //旧数据
            var fightObj = self._recordOldFightData(matrix);
            //普通副本
            if (matrixTypeKey.copy == fightType) {
                uw.userDataCtrl.fightEnd(copyId, isWin, fightData, function (fightResult) {
                    self._afterFightEnd(fightObj, fightResult);
                }, self);
            }
            else if (matrixTypeKey.trial == fightType) {
                uw.userDataCtrl.trialFightEnd(copyId, isWin, fightData, function (fightResult) {
                    self._afterFightEnd(fightObj, fightResult);
                }, self);
            }
            else if (matrixTypeKey.tower == fightType) {
                uw.towerDataCtrl.fightEnd(isWin, fightData, function (fightResult) {
                    self._afterFightEnd(fightObj, fightResult);
                }, self);
            }
            else if (matrixTypeKey.arenaA == fightType) {
                uw.userDataCtrl.arenaFightEnd(isWin, fightData, function (fightResult, extraDiamond) {
                    self._afterFightEnd(fightObj, fightResult);
                }, self);
            }
            else if (matrixTypeKey.mirrorA == fightType) {
                uw.mirrorDataCtrl.pveEnd(copyId, isWin, fightData, function (fightResult) {
                    self._afterFightEnd(fightObj, fightResult);
                }, self);
            }
            else if (matrixTypeKey.mirrorPVPA == fightType) {
                uw.mirrorDataCtrl.pvpEnd(isWin, fightData, function (fightResult) {
                    self._afterFightEnd(fightObj, fightResult);
                }, self);
            }
        };
        __egretProto__.getMatrix = function () {
            return uw.userDataCtrl.getMatrixByType(this.fightType);
        };
        __egretProto__._afterFightEnd = function (fightObj, fightResult) {
            var self = this;
            fightObj.newData = fightResult;
            self.pushNotifyAtOnce(self.__class.ON_SHOW_RESULT, fightObj);
        };
        __egretProto__._recordOldFightData = function (matrix) {
            //记录原来的数据
            var fightOldResult = {};
            fightOldResult.teamLvl = uw.userDataCtrl.getLvl();
            fightOldResult.teamExpc = uw.userDataCtrl.getExpc();
            fightOldResult.hero = {};
            for (var i = 0; i < matrix.length; i++) {
                var heroCtrl = matrix[i];
                fightOldResult.hero[heroCtrl.tempId] = { lvl: heroCtrl.getLvl(), expc: heroCtrl.getExp() };
            }
            var fightObj = {};
            fightObj.oldData = fightOldResult;
            return fightObj;
        };
        /**
         * 暂停战斗
         */
        __egretProto__.pauseFight = function () {
            this._gameStatus = this.__class.GAME_STATUS.PAUSE;
            uw.fightBiz.pauseMemberAction(uw.fightMainCtrl.selfFightMembers, uw.pauseActionType.ALL);
            uw.fightBiz.pauseMemberAction(uw.fightMainCtrl.enemyFightMembers, uw.pauseActionType.ALL);
        };
        /**
         * 继续战斗
         */
        __egretProto__.resumeFight = function () {
            this._gameStatus = this.__class.GAME_STATUS.NORMAL;
            if (uw.fightActionPauseCtrl.isPause) {
                uw.fightBiz.resumeMemberAction(uw.fightMainCtrl.selfFightMembers, uw.pauseActionType.MIX_SKILL);
                uw.fightBiz.resumeMemberAction(uw.fightMainCtrl.enemyFightMembers, uw.pauseActionType.MIX_SKILL);
            }
            else {
                uw.fightBiz.resumeMemberAction(uw.fightMainCtrl.selfFightMembers, uw.pauseActionType.ALL);
                uw.fightBiz.resumeMemberAction(uw.fightMainCtrl.enemyFightMembers, uw.pauseActionType.ALL);
            }
        };
        //退出战斗
        __egretProto__.exitFight = function () {
            var self = this;
            self.purge();
            mo.sceneMgr.popScene(self._getSceneToPopTo());
        };
        __egretProto__._getSceneToPopTo = function () {
            var self = this;
            var matrixTypeKey = uw.c_prop.matrixTypeKey, fightType = self.fightType;
            var scene;
            //普通副本
            if (matrixTypeKey.copy == fightType) {
                scene = uw.CopyScene;
            }
            else if (matrixTypeKey.trial == fightType) {
                scene = uw.TrialScene;
            }
            else if (matrixTypeKey.tower == fightType) {
                scene = uw.TowerScene;
            }
            else if (matrixTypeKey.arenaA == fightType) {
                scene = uw.ArenaScene;
            }
            else if (matrixTypeKey.mirrorA == fightType) {
                scene = uw.MirrorScene;
            }
            else if (matrixTypeKey.mirrorPVPA == fightType) {
                scene = uw.MirrorScene;
            }
            else {
            }
            return scene;
        };
        __egretProto__.purge = function () {
            var self = this;
            mo.clearTick(self.update, self);
            uw.fightUtils.unload();
            //销毁战斗的控制器
            uw.fightActionManager.doDtor();
            uw.fightMainCtrl.doDtor();
            uw.fightRoundCtrl.doDtor();
            uw.fightSelfHandSkillCtrl.doDtor();
            uw.fightEnemyHandSkillCtrl.doDtor();
            uw.fightEnergyCtrl.doDtor();
            uw.fightActionPauseCtrl.doDtor();
            uw.fightHeroHpCtrl.doDtor();
            uw.fightHeroEnergyCtrl.doDtor();
            uw.fightUserEnergyCtrl.doDtor();
            uw.fightActionManager = null;
            uw.fightMainCtrl = null;
            uw.fightRoundCtrl = null;
            uw.fightSelfHandSkillCtrl = null;
            uw.fightEnemyHandSkillCtrl = null;
            uw.fightEnergyCtrl = null;
            uw.fightActionPauseCtrl = null;
            uw.fightHeroHpCtrl = null;
            uw.fightHeroEnergyCtrl = null;
            uw.fightUserEnergyCtrl = null;
            //销毁战斗Scene
            uw.fightScene = null;
            uw.Fight.isExit = true;
            mo.unschedule(self.nextTalk, self);
            uw.fightUtils.clearDelayCall();
            self._talkLayer = null;
            self.selfGroup = null;
            self.enemyGroups = null;
            self.selfFightMembers = null;
            self.enemyFightMembers = null;
            self.allFightMembers = null;
            self.removeFightMembers = null;
            self.doDtor();
        };
        /**
         * 重播
         */
        __egretProto__.reply = function () {
        };
        //获取当前血量
        __egretProto__.getCurHpCount = function () {
            var hp = 0;
            for (var i = 0; i < this.selfFightMembers.length; i++) {
                var locMember = this.selfFightMembers[i];
                if (locMember.isDeath())
                    continue;
                hp += locMember.hp;
            }
            return hp;
        };
        //计算开始总血量
        __egretProto__.calStartHpCount = function () {
            this.startHpCount = this.getCurHpCount();
        };
        /**
         * 主循环
         */
        __egretProto__.update = function (dt) {
            var self = this;
            dt = dt / 1000;
            dt = dt > 0.05 ? 0.05 : dt;
            if (self._gameStatus != self.__class.GAME_STATUS.NORMAL)
                return;
            self.playingTime += dt;
            //action
            uw.fightActionManager.update(dt);
            //血量ui
            uw.fightHeroHpCtrl.update(dt);
            //大招能量UI
            uw.fightHeroEnergyCtrl.update(dt);
            //秘术能量UI
            uw.fightUserEnergyCtrl.update(dt);
            //回合计算
            uw.fightRoundCtrl.update(dt);
            //不是回合战斗中，则不往下执行
            if (uw.fightRoundCtrl.roundStatus != uw.FightRoundCtrl.ROUND_STATUS_FIGHTING)
                return;
            //手动技能控制器
            uw.fightSelfHandSkillCtrl.update(dt);
            uw.fightEnemyHandSkillCtrl.update(dt);
            //正在释放大招技能中
            if (uw.fightActionPauseCtrl.isPause)
                return;
            //控制器update
            var selfFightMembers = self.selfFightMembers, locMember;
            for (var i = 0; i < selfFightMembers.length; i++) {
                locMember = selfFightMembers[i];
                locMember.fightOption.curController.update(dt);
            }
            //控制器update
            var enemyFightMembers = self.enemyFightMembers, locMember;
            for (var i = 0; i < enemyFightMembers.length; i++) {
                locMember = enemyFightMembers[i];
                locMember.fightOption.curController.update(dt);
            }
        };
        FightMainCtrl.fight = function (fightType, copyId, selector, target) {
            uw.fightBiz.checkFightStart(fightType, copyId, 0, function () {
                if (uw.fightMainCtrl)
                    uw.fightMainCtrl.purge();
                uw.fightMainCtrl = uw.FightMainCtrl.create();
                uw.fightMainCtrl.initWithCopyId(fightType, copyId, selector, target);
            }, this);
        };
        FightMainCtrl.pk = function (fightType, rankId, selector, target) {
            uw.fightBiz.checkFightStart(fightType, 0, rankId, function () {
                if (uw.fightMainCtrl)
                    uw.fightMainCtrl.purge();
                uw.fightMainCtrl = uw.FightMainCtrl.create();
                uw.fightMainCtrl.initWithRankId(fightType, rankId, selector, target);
            }, this);
        };
        FightMainCtrl.__className = "FightMainController";
        FightMainCtrl.GAME_STATUS = { NORMAL: 0, PAUSE: 2, OVER: 3 };
        FightMainCtrl.ON_SHOW_RESULT = "onShowResult"; //展示战斗结果
        FightMainCtrl.ON_SHOW_HIGHEST_RANK = "onShowHighestRank"; //展示竞技场最高历史记录
        return FightMainCtrl;
    })(mo.DataController);
    uw.FightMainCtrl = FightMainCtrl;
    FightMainCtrl.prototype.__class__ = "uw.FightMainCtrl";
})(uw || (uw = {}));

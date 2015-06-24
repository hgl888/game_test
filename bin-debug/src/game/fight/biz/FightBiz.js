/**
 * Created by Administrator on 14-7-23.
 */
var uw;
(function (uw) {
    var fightBiz;
    (function (fightBiz) {
        /**
         * 根据布阵类型获取英雄列表
         * @param matrixType
         * @returns {Array}
         */
        function getSelfGroupByMatrixType(matrixType) {
            var group = new uw.FightGroup();
            var matrix = uw.userDataCtrl.getMatrixByType(matrixType);
            for (var key in matrix) {
                var locHeroCtrl = matrix[key];
                if (!locHeroCtrl)
                    continue;
                var posKey = uw.UserDataCtrl.MATRIX_TYPE_KEY_MAP[matrixType];
                var curPos = locHeroCtrl.get(posKey);
                var locMember = uw.FightMember.create(locHeroCtrl.getData(), uw.memberType.HERO, curPos);
                group.addMember(locMember);
            }
            return group;
        }
        fightBiz.getSelfGroupByMatrixType = getSelfGroupByMatrixType;
        /**
         * 根据英雄数据获取战斗组
         * @param heroes
         * @returns [uw.FightGroup]
         */
        function getGroupByHeroes(heroes) {
            var group = new uw.FightGroup();
            for (var i = 0; i < heroes.length; i++) {
                var locHero = heroes[i];
                var locMember = uw.FightMember.create(locHero, uw.memberType.HERO, i);
                group.addMember(locMember);
            }
            return [group];
        }
        fightBiz.getGroupByHeroes = getGroupByHeroes;
        /**
         * 根据英雄数据获取战斗组
         * @param members
         * @param type
         * @returns [uw.FightGroup]
         */
        function getMirrorGroupByMembers(members, type) {
            var group = new uw.FightGroup();
            var c_mirror = mo.getJSONWithFileName(uw.cfg_c_mirror);
            var t_monster = mo.getJSONWithFileName(uw.cfg_t_monster);
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                var locTid = locMember.tid;
                var LocMirrorData = c_mirror[locTid];
                if (!LocMirrorData) {
                    uw.warn("c_mirror表木有heroId:%d", locTid);
                }
                var locMonsterIds = LocMirrorData[uw.c_mirror_monsterIds];
                var locMonsterData = t_monster[locMonsterIds[type]];
                var locMember = uw.FightMember.create(locMonsterData, uw.memberType.MONSTER, locMember.fightOption.curPos);
                group.addMember(locMember);
            }
            return [group];
        }
        fightBiz.getMirrorGroupByMembers = getMirrorGroupByMembers;
        /**
         * 增加战斗成员
         * @param fightMembers
         * @param members
         */
        function addFightMembers(fightMembers, members) {
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                if (locMember.isDeath())
                    continue;
                fightMembers.push(locMember);
            }
        }
        fightBiz.addFightMembers = addFightMembers;
        /**
         * 获取处于某个状态的成员
         * @param members
         * @param status
         */
        function getMembersByStatus(members, status) {
            var reMembers = [];
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                if (locMember.fightOption.curStatus == status) {
                    reMembers.push(locMember);
                }
            }
            return reMembers;
        }
        fightBiz.getMembersByStatus = getMembersByStatus;
        /**
         * 暂停动作
         * @param members
         * @param {uw.pauseActionType} type
         */
        function pauseMemberAction(members, type) {
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                if (locMember.isDeath())
                    continue;
                var locController = locMember.fightOption.curController;
                switch (type) {
                    case uw.pauseActionType.ALL:
                        locController.pause();
                        break;
                    case uw.pauseActionType.MIX_SKILL:
                        if (uw.fightActionPauseCtrl.isMemberInPause(locMember)) {
                            locController.pause();
                        }
                        break;
                    case uw.pauseActionType.NOT_MIX_SKILL:
                        if (!uw.fightActionPauseCtrl.isMemberInPause(locMember)) {
                            locController.pause();
                        }
                        break;
                }
            }
        }
        fightBiz.pauseMemberAction = pauseMemberAction;
        /**
         * 继续动作
         * @param members
         * @param {uw.pauseActionType} type
         */
        function resumeMemberAction(members, type) {
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                var locController = locMember.fightOption.curController;
                switch (type) {
                    case uw.pauseActionType.ALL:
                        locController.resume();
                        break;
                    case uw.pauseActionType.MIX_SKILL:
                        if (uw.fightActionPauseCtrl.isMemberInPause(locMember)) {
                            locController.resume();
                        }
                        break;
                    case uw.pauseActionType.NOT_MIX_SKILL:
                        if (!uw.fightActionPauseCtrl.isMemberInPause(locMember)) {
                            locController.resume();
                        }
                        break;
                }
            }
        }
        fightBiz.resumeMemberAction = resumeMemberAction;
        /**
         * 初始化开始位置
         * @param member
         */
        function initMemberBeforePos(member) {
            var pos = null;
            if (member.fightOption.curIsChallenger) {
                pos = this.getBeginPos(member.fightOption.curPos);
            }
            else {
                pos = this.getBeginPos(member.fightOption.curPos + 10);
            }
            member.fightOption.curController.setCurPos(pos.x, pos.y);
        }
        fightBiz.initMemberBeforePos = initMemberBeforePos;
        function getBeginPos(curPos) {
            var area = uw.fightUtils.fightArea;
            var aWidth = area.width;
            var aHeight = area.height;
            var fightBeforePos = uw.fightMainCtrl.fightBeforePos;
            var curX = fightBeforePos[curPos].x * aWidth;
            var curY = fightBeforePos[curPos].y * aHeight;
            return mo.p(curX, curY);
        }
        fightBiz.getBeginPos = getBeginPos;
        /**
         * 判断大招是否达到攻击距离
         * @param mixSkills
         */
        function checkMixAttackDistance(mixSkills) {
            for (var i = 0; i < mixSkills.length; i++) {
                var locFightSkill = mixSkills[i];
                locFightSkill.checkMixAttackDistance();
            }
        }
        fightBiz.checkMixAttackDistance = checkMixAttackDistance;
        /**
         * 异步添加角色到场景
         * @param round
         * @param cb
         */
        function addAllMembersToScene(round, cb) {
            var tasks = [];
            var self = this;
            if (round == 0) {
                tasks.push(function (cb1) {
                    self.addMembersToScene(uw.fightMainCtrl.selfFightMembers, true, cb1);
                });
                tasks.push(function (cb1) {
                    self.addMembersToScene(uw.fightMainCtrl.enemyFightMembers, false, cb1);
                });
            }
            else {
                tasks.push(function (cb1) {
                    self.addMembersToScene(uw.fightMainCtrl.enemyFightMembers, false, cb1);
                });
            }
            async.parallel(tasks, function (err) {
                cb();
            });
        }
        fightBiz.addAllMembersToScene = addAllMembersToScene;
        /**
         * 添加角色到场景的某个位置
         * @param member
         * @param pos
         * @param cb
         */
        function addMemberToScene(member, pos, cb) {
            var node = uw.fightScene.addChar(member.tempId, member.fightOption.curIsChallenger, function (display) {
                member.fightOption.curController.initEvent(display);
                member.fightOption.curController.setCurPos(pos.x, pos.y);
                if (cb)
                    cb(display);
            });
            member.fightOption.curController.initDisplay(node);
            member.fightOption.curController.setCurPos(pos.x, pos.y);
        }
        fightBiz.addMemberToScene = addMemberToScene;
        /**
         * 异步添加角色到场景
         * @param members
         * @param side
         * @param cb
         */
        function addMembersToScene(members, side, cb) {
            async.map(members, function (member, index, cb1) {
                var node = uw.fightScene.addChar(member.tempId, side, function (display) {
                    member.fightOption.curController.initEvent(display);
                    cb1();
                });
                member.fightOption.curController.initDisplay(node);
                this.initMemberBeforePos(member);
            }, cb, this);
        }
        fightBiz.addMembersToScene = addMembersToScene;
        /**
         * 获取战斗资源
         * @param members
         */
        function getResByMembers(members) {
            var heroTempIds = []; //英雄
            var effectIds = []; //技能
            var audioArr = []; //音效
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                var locTempId = locMember.tid;
                if (locTempId && heroTempIds.indexOf(locTempId) < 0) {
                    heroTempIds.push(locTempId);
                }
                //技能特效
                this.getEffectByFightSkill(locMember.fightOption.curNormalSkill, effectIds, audioArr);
                for (var j = 0; j < locMember.fightOption.curAutoSkills.length; j++) {
                    var locSkill = locMember.fightOption.curAutoSkills[j];
                    this.getEffectByFightSkill(locSkill, effectIds, audioArr);
                }
                this.getEffectByFightSkill(locMember.fightOption.curMixSkill, effectIds, audioArr);
            }
            var resMap = {
                heroTempIds: heroTempIds,
                effectIds: effectIds,
                audioArr: audioArr
            };
            return resMap;
        }
        fightBiz.getResByMembers = getResByMembers;
        /**
         * 根据战斗技能获取资源
         * @param fightSkill
         * @param resArr
         */
        function getEffectByFightSkill(fightSkill, resArr, audioArr) {
            if (!fightSkill)
                return;
            var fxSkill = fightSkill.skillDisplay[uw.t_skillDisplay_fxSkill];
            if (fxSkill && resArr.indexOf(fxSkill) < 0) {
                resArr.push(fxSkill);
            }
            var fxHit = fightSkill.skillDisplay[uw.t_skillDisplay_fxHit];
            if (fxHit && resArr.indexOf(fxHit) < 0) {
                for (var i = 0; i < 2; i++) {
                    resArr.push(fxHit); //命中多个
                }
            }
            var fxTarget = fightSkill.skillDisplay[uw.t_skillDisplay_fxTarget];
            if (fxTarget && resArr.indexOf(fxTarget) < 0) {
                resArr.push(fxTarget);
            }
            var skillAudio = resHelper.getSkillAudioPath(fightSkill.skill.id);
            if (skillAudio && audioArr.indexOf(skillAudio) < 0) {
                audioArr.push(skillAudio);
            }
            var hitAudio = resHelper.getSkillHitAudioPath(fightSkill.skill.id);
            if (hitAudio && audioArr.indexOf(hitAudio)) {
                audioArr.push(hitAudio);
            }
        }
        fightBiz.getEffectByFightSkill = getEffectByFightSkill;
        /**
         * 击杀奖励
         */
        function killPrize(attackMember, deathMember) {
            if (!attackMember)
                return;
            if (attackMember.isDeath())
                return;
            if (attackMember.fightOption.curIsChallenger == deathMember.fightOption.curIsChallenger)
                return;
            //击杀奖励200能量
            uw.FightShowBuffText.create(attackMember.fightOption.curController.display, uw.FightShowBuffText.addEnergy);
            uw.fightEnergyCtrl.replayEnergy(attackMember, 200);
        }
        fightBiz.killPrize = killPrize;
        /**
         * 获取所有组里面的成员
         * @returns {Array}
         */
        function getAllGroupMembers() {
            var selfGroup = uw.fightMainCtrl.selfGroup;
            var enemyGroups = uw.fightMainCtrl.enemyGroups;
            var members = [].concat(selfGroup.members);
            for (var i = 0; i < enemyGroups.length; i++) {
                var locGroup = enemyGroups[i];
                members = members.concat(locGroup.members);
            }
            return members;
        }
        fightBiz.getAllGroupMembers = getAllGroupMembers;
        /**
         * 获取战斗中的敌人所有目标，中了混乱目标是相反的
         * @param curIsChallenger
         * @param curMember
         */
        function getEnemyMembers(curIsChallenger, curMember) {
            var members = curIsChallenger ? uw.fightMainCtrl.enemyFightMembers : uw.fightMainCtrl.selfFightMembers;
            if (curMember) {
                var isConfusion = uw.buffBiz.getBuffByStateType(curMember, uw.buffStateType.CONFUSION);
                //未中混乱
                if (isConfusion) {
                    members = curMember.fightOption.curIsChallenger ? uw.fightMainCtrl.selfFightMembers : uw.fightMainCtrl.enemyFightMembers;
                    //剔除自己
                    members = members.concat([]);
                    mo.ArrayRemoveObject(members, curMember);
                }
            }
            return members;
        }
        fightBiz.getEnemyMembers = getEnemyMembers;
        /**
         * 获取战斗中的自方目标
         * @param curIsChallenger
         */
        function getSelfMembers(curIsChallenger) {
            var members = curIsChallenger ? uw.fightMainCtrl.selfFightMembers : uw.fightMainCtrl.enemyFightMembers;
            return members;
        }
        fightBiz.getSelfMembers = getSelfMembers;
        /**
         * 死亡后计算技能
         * @param fightMember
         */
        function deathCalSkill(fightMember) {
            //影魔死亡够释放大招
            if (fightMember.tid == uw.id_t_warrior.h_40 && fightMember.fightOption.curMixSkill) {
                uw.FightSkillEffectBaseCtrl.create(fightMember, fightMember.fightOption.curMixSkill);
            }
        }
        fightBiz.deathCalSkill = deathCalSkill;
        /**
         * 转化基础属性
         * @param key
         * @param value
         * @returns {{}}
         */
        function convertBaseProp(key, value) {
            var ret = {};
            switch (key) {
                case "life":
                    ret.hp = uw.calHp(value);
                    break;
                case "power":
                    ret.pAttack = uw.calPAttack(value);
                    ret.pDefence = uw.calPDefence(value);
                    break;
                case "intel":
                    ret.mAttack = uw.calMAttack(value);
                    ret.mDefence = uw.calMDefence(value);
                    break;
            }
            return ret;
        }
        fightBiz.convertBaseProp = convertBaseProp;
        function checkFightStart(fightType, copyId, rankId, cb, target) {
            var matrixTypeKey = uw.c_prop.matrixTypeKey;
            //普通副本
            if (matrixTypeKey.copy == fightType) {
                uw.userDataCtrl.fightStart(copyId, cb, target);
            }
            else if (matrixTypeKey.trial == fightType) {
                uw.userDataCtrl.trialFightStart(copyId, cb, target);
            }
            else if (matrixTypeKey.tower == fightType) {
                uw.towerDataCtrl.fightStart(copyId, cb, target);
            }
            else if (matrixTypeKey.arenaA == fightType) {
                uw.userDataCtrl.arenaFightStart(rankId, cb, target);
            }
            else if (matrixTypeKey.mirrorA == fightType) {
                uw.mirrorDataCtrl.pveStart(copyId, cb, this);
            }
            else if (matrixTypeKey.mirrorPVPA == fightType) {
                uw.mirrorDataCtrl.pvpStart(cb, target);
            }
            else {
                uw.warn("呵呵，未知的战斗类型%s", matrixTypeKey);
            }
        }
        fightBiz.checkFightStart = checkFightStart;
    })(fightBiz = uw.fightBiz || (uw.fightBiz = {}));
})(uw || (uw = {}));

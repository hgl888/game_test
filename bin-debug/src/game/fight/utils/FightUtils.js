var uw;
(function (uw) {
    var FightUtils = (function (_super) {
        __extends(FightUtils, _super);
        function FightUtils() {
            _super.apply(this, arguments);
            //输出
            this.log = uw.log;
        }
        var __egretProto__ = FightUtils.prototype;
        /**
         * 延迟统一调用接口，方便释放移除
         * @param delay
         * @param selector
         * @param ctx
         * @returns {any|number}
         */
        __egretProto__.delayCall = function (delay, selector, ctx) {
            var key = mo.delayCall(delay, selector, ctx);
            this.delayCallKeyArr.push(key);
            return key;
        };
        //清除延迟
        __egretProto__.clearDelayCall = function () {
            for (var i = 0; i < this.delayCallKeyArr.length; i++) {
                var locKey = this.delayCallKeyArr[i];
                mo.clearDelayCall(locKey);
            }
            this.delayCallKeyArr.length = 0;
        };
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.originPos = mo.p(0, mo.visibleRect.getHeight() - 340);
            this.fightArea = mo.size(mo.visibleRect.getWidth(), 600);
            this.newId = 0;
            this.delayCallKeyArr = [];
        };
        /**
         * 获取新的不重复id
         */
        __egretProto__.getNewId = function (key) {
            this.newId++;
            if (key) {
                return key + this.newId;
            }
            else {
                return this.newId.toString();
            }
        };
        /**
         * 获取前中后排
         * @param tid
         * @returns {number}
         */
        __egretProto__.getPosOrderType = function (tid) {
            var warriorTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, tid);
            var heroSort = mo.getJSONWithFileName(uw.cfg_c_game)[uw.id_c_game.heroSort];
            var posOrder = warriorTemp[uw.t_warrior_posOrder];
            if (posOrder <= heroSort[0]) {
                return uw.posOrderType.FRONT;
            }
            if (posOrder <= heroSort[1]) {
                return uw.posOrderType.MID;
            }
            return uw.posOrderType.AFTER;
        };
        __egretProto__.convertHeroDataToFightData = function (heroData) {
            var obj = {};
            var heroEntityKey = uw.dsConsts.HeroEntity;
            var warriorTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, heroData[heroEntityKey.tempTid]);
            obj.name = warriorTemp[uw.t_warrior_name];
            obj.tempId = heroData[heroEntityKey.tempId];
            obj.tid = heroData[heroEntityKey.tempTid];
            obj.pos = heroData[heroEntityKey.pos];
            obj.posArenaD = heroData[heroEntityKey.posArenaD];
            obj.posArenaA = heroData[heroEntityKey.posArenaA];
            obj.posMirrorD = heroData[heroEntityKey.posMirrorD];
            obj.posMirrorA = heroData[heroEntityKey.posMirrorA];
            obj.posTower = heroData[heroEntityKey.posTower];
            obj.posTrial = heroData[heroEntityKey.posTrial];
            obj.lvl = heroData[heroEntityKey.lvl];
            obj.life = heroData[heroEntityKey.life];
            obj.power = heroData[heroEntityKey.power];
            obj.intel = heroData[heroEntityKey.intel];
            obj.hp = heroData[heroEntityKey.hp];
            obj.pAttack = heroData[heroEntityKey.pAttack];
            obj.pDefence = heroData[heroEntityKey.pDefence];
            obj.mAttack = heroData[heroEntityKey.mAttack];
            obj.mDefence = heroData[heroEntityKey.mDefence];
            obj.crit = heroData[heroEntityKey.crit];
            obj.reCrit = heroData[heroEntityKey.reCrit];
            obj.hit = heroData[heroEntityKey.hit];
            obj.reHit = heroData[heroEntityKey.reHit];
            obj.pAttackMult = heroData[heroEntityKey.pAttackMult];
            obj.pDefenceMult = heroData[heroEntityKey.pDefenceMult];
            obj.mAttackMult = heroData[heroEntityKey.mAttackMult];
            obj.mDefenceMult = heroData[heroEntityKey.mDefenceMult];
            obj.suckBlood = heroData[heroEntityKey.suckBlood];
            obj.ignoreDefence = heroData[heroEntityKey.ignoreDefence];
            obj.hpRecovery = heroData[heroEntityKey.hpRecovery];
            obj.skillLvl = heroData[heroEntityKey.skillLvl];
            obj.energy = heroData[heroEntityKey.energy];
            obj.energyRecovery = heroData[heroEntityKey.energyRecovery];
            //技能表优化所做的改造 zxj 2014-09-18
            var warriorTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, obj.tid);
            var normalSkillId = warriorTemp[uw.t_warrior_normalSkill]; //普通攻击技能id
            var skillIds = warriorTemp[uw.t_warrior_skills]; //魔法攻击技能id
            var mixSkillId = warriorTemp[uw.t_warrior_mixSkill]; //大招技能id
            var normalSkillLvl = obj.lvl; //普通技能等级
            var skillLvls = heroData[heroEntityKey.skills] || []; //魔法技能等级列表
            var mixSkillLvl = heroData[heroEntityKey.mixSkill]; //大招等级
            obj.normalSkill = uw.getSkillData(normalSkillId, normalSkillLvl);
            obj.skills = [];
            for (var i = 0; i < skillLvls.length; i++) {
                var locLvl = skillLvls[i];
                if (!locLvl)
                    continue;
                var locSkillId = skillIds[i];
                if (!locSkillId)
                    continue;
                obj.skills[i] = uw.getSkillData(skillIds[i], locLvl + obj.skillLvl);
            }
            if (mixSkillId && mixSkillLvl)
                obj.mixSkill = uw.getSkillData(mixSkillId, mixSkillLvl + obj.skillLvl);
            return obj;
        };
        __egretProto__.convertMonsterDataToFightData = function (monsterData) {
            var obj = {};
            var warriorTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, monsterData[uw.t_monster_tid]);
            obj.name = warriorTemp[uw.t_warrior_name];
            obj.tempId = monsterData[uw.t_monster_id];
            obj.tid = monsterData[uw.t_monster_tid];
            obj.lvl = monsterData[uw.t_monster_lvl];
            obj.life = monsterData[uw.t_monster_life];
            obj.power = monsterData[uw.t_monster_power];
            obj.intel = monsterData[uw.t_monster_intel];
            obj.hp = monsterData[uw.t_monster_hp];
            obj.pAttack = monsterData[uw.t_monster_pAttack];
            obj.pDefence = monsterData[uw.t_monster_pDefence];
            obj.mAttack = monsterData[uw.t_monster_mAttack];
            obj.mDefence = monsterData[uw.t_monster_mDefence];
            obj.crit = monsterData[uw.t_monster_crit];
            obj.reCrit = monsterData[uw.t_monster_reCrit];
            obj.hit = monsterData[uw.t_monster_hit];
            obj.reHit = monsterData[uw.t_monster_reHit];
            obj.pAttackMult = monsterData[uw.t_monster_pAttackMult];
            obj.pDefenceMult = monsterData[uw.t_monster_pDefenceMult];
            obj.mAttackMult = monsterData[uw.t_monster_mAttackMult];
            obj.mDefenceMult = monsterData[uw.t_monster_mDefenceMult];
            obj.suckBlood = 0;
            obj.ignoreDefence = 0;
            obj.hpRecovery = 0;
            obj.skillLvl = 0;
            obj.energy = monsterData[uw.t_monster_energy];
            obj.energyRecovery = 0;
            //技能表优化所做的改造 zxj 2014-09-18
            var warriorTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, obj.tid);
            var normalSkillId = warriorTemp[uw.t_warrior_normalSkill]; //普通攻击技能id
            var skillIds = warriorTemp[uw.t_warrior_skills] || []; //魔法攻击技能id
            var mixSkillId = warriorTemp[uw.t_warrior_mixSkill]; //大招技能id
            var skillsLvl = monsterData[uw.t_monster_skills] || [];
            var mixSkillLvl = monsterData[uw.t_monster_mixSkill];
            obj.normalSkill = uw.getSkillData(normalSkillId, obj.lvl);
            obj.skills = [];
            for (var i = 0; i < skillsLvl.length; i++) {
                var locLvl = skillsLvl[i];
                if (!locLvl)
                    continue;
                var locSkillId = skillIds[i];
                if (!locSkillId)
                    continue;
                obj.skills[i] = uw.getSkillData(skillIds[i], locLvl + obj.skillLvl);
            }
            if (mixSkillId && mixSkillLvl)
                obj.mixSkill = uw.getSkillData(mixSkillId, mixSkillLvl + obj.skillLvl);
            return obj;
        };
        /**
         * 点是否在圆之内
         * @param point 点
         * @param center 圆中心点
         * @param radius 圆半径
         * @returns {boolean}
         */
        __egretProto__.isInCircle = function (point, center, radius) {
            var dis = point.distanceTo(center);
            if (dis <= radius) {
                return true;
            }
            return false;
        };
        /**
         * 点是否在多边形之内
         * @param point 点
         * @param vertices 顶点坐标数组
         * @returns {boolean}
         */
        __egretProto__.isInPolygon = function (point, vertices) {
            var i, j;
            var inside = false, count1 = 0, count2 = 0;
            var length = vertices.length;
            for (i = 0, j = length - 1; i < length; j = i++) {
                var value = (point.x - vertices[j].x) * (vertices[i].y - vertices[j].y) - (point.y - vertices[j].y) * (vertices[i].x - vertices[j].x);
                if (value > 0)
                    ++count1;
                else if (value < 0)
                    ++count2;
            }
            if (0 == count1 || 0 == count2) {
                inside = true;
            }
            return inside;
        };
        //从一个给定的数组arr中,随机返回num个不重复项
        __egretProto__.getRandomArray = function (arr, num) {
            var temp_array = [].concat(arr);
            var return_array = [];
            for (var i = 0; i < num; i++) {
                if (temp_array.length > 0) {
                    var arrIndex = Math.floor(Math.random() * temp_array.length);
                    return_array[i] = temp_array[arrIndex];
                    temp_array.splice(arrIndex, 1);
                }
                else {
                    break;
                }
            }
            return return_array;
        };
        //从一个给定的数组arr中,随机1个随即
        __egretProto__.getRandomOne = function (arr) {
            var arrIndex = Math.floor(Math.random() * arr.length);
            return arr[arrIndex];
        };
        /*        log(...args){
        
                }*/
        //获取战斗资源
        __egretProto__.getMembersRes = function () {
            var resArr = [], self = this;
            var selfResArr = uw.fightBiz.getResByMembers(uw.fightMainCtrl.selfGroup.members);
            resArr.push(selfResArr);
            for (var i = 0; i < uw.fightMainCtrl.enemyGroups.length; i++) {
                var locGroup = uw.fightMainCtrl.enemyGroups[i];
                resArr.push(uw.fightBiz.getResByMembers(locGroup.members));
            }
            var heroTempIds = [], effectIds = [], audioArr = [];
            for (var j = 0; j < resArr.length; j++) {
                var res = resArr[j];
                heroTempIds = heroTempIds.concat(res.heroTempIds);
                effectIds = effectIds.concat(res.effectIds);
                audioArr = audioArr.concat(res.audioArr);
            }
            return { heroTempIds: heroTempIds, effectIds: effectIds, audioArr: audioArr };
        };
        __egretProto__.preload = function (cb) {
            //获取角色，技能特效资源
            var fightResArr = this.getMembersRes();
            //预加载场景
            var self = this;
            var copyId = uw.fightMainCtrl.copyId;
            var bgArr = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId)[uw.t_copy_copyBgId];
            //预加载英雄和音效
            var heroTempIds = fightResArr.heroTempIds;
            var effectIds = fightResArr.effectIds;
            var audioArr = fightResArr.audioArr;
            var uiArr = [];
            for (var i = 0; i < bgArr.length; i++) {
                var bgId = bgArr[i];
                var bgPath = resHelper.getFightBgPath(bgId);
                uiArr.push(bgPath);
            }
            for (var i = 0; i < heroTempIds.length; i++) {
                var locHeroTempId = heroTempIds[i];
                var locPath = uw.getRoleIconByTempId(locHeroTempId);
                uiArr.push(locPath);
            }
            //秘术技能图标
            //ui特效
            var uiArmArr = [];
            if (!uw.isFightSimulate) {
                //场景特效
                var copyCtrl = uw.userDataCtrl.getCopyProgressByCopyId(copyId);
                if (copyCtrl && copyCtrl.isTrial()) {
                    uiArmArr.push(res.cca_ui.trialFireEffect);
                }
            }
            //加载UI的特效
            uiArmArr.push(res.cca_ui.fight_movingSkill, res.cca_ui.fight_skillAble, res.cca_ui.fight_skillSkipper, res.cca_ui.fight_skillReady, res.cca_ui.fight_failed, res.cca_ui.fightMixFull);
            for (var key in res.cca_buff) {
                effectIds.push(res.cca_buff[key]);
            }
            /* log(JSON.stringify(bgArr));
             log(JSON.stringify(heroResArr));
             log(JSON.stringify(skillResArr));
             log(JSON.stringify(uiResArr));*/
            async.parallel([
                function (cb1) {
                    res.load(audioArr, function () {
                        cb1();
                    }, self);
                },
                function (cb1) {
                    res.load(uiArr, function () {
                        cb1();
                    }, self);
                },
                function (cb1) {
                    uw.roleArmFactory.preload(heroTempIds, cb1);
                },
                function (cb1) {
                    uw.effectArmFactory.preload(effectIds, cb1);
                },
                function (cb1) {
                    uw.uiArmFactory.preload(uiArmArr, cb1);
                }
            ], function (err, results) {
                //预加载Armature
                cb();
            });
        };
        __egretProto__.unload = function () {
            var self = this;
            //回收没有死亡的角色
            var groupMembers = uw.fightBiz.getAllGroupMembers();
            self.releaseMembers(groupMembers);
            self.releaseRemoveMembers();
        };
        /**
         * 释放移除
         */
        __egretProto__.releaseRemoveMembers = function () {
            var self = this;
            var removeMembers = uw.fightMainCtrl.removeFightMembers;
            self.releaseMembers(removeMembers);
            removeMembers.length = 0;
        };
        /**
         * 释放角色的内存
         * @param members
         */
        __egretProto__.releaseMembers = function (members) {
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                var fightRoleNode = locMember.fightOption.curController.display;
                if (fightRoleNode && fightRoleNode.parent) {
                    fightRoleNode.removeFromParent();
                }
                if (locMember.fightOption.curController) {
                    locMember.fightOption.curController.doDtor();
                }
            }
        };
        /**
         * md5密钥
         * @param str
         * @param userId
         */
        __egretProto__.md5 = function (str, userId) {
            var encryptKey = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.eCfg)[0];
            str = encryptKey + userId + str + encryptKey + userId;
            return mo["md5"](str);
        };
        /**
         * 构造战斗数据
         * @param copyId
         * @param hpRe
         * @param hpCount
         * @param rank
         * @returns {Array}
         */
        __egretProto__.calFightData = function (copyId, hpRe, hpCount, rank) {
            var fightDataArr = [];
            fightDataArr[0] = copyId;
            fightDataArr[1] = hpRe;
            fightDataArr[2] = hpCount;
            fightDataArr[3] = uw.userDataCtrl.uniqueKey;
            fightDataArr[4] = rank;
            return fightDataArr;
        };
        /**
         * 获取特效挂节点位置
         * @param display
         * @param bodyType
         * @param isFaceLeft
         * @returns {mo.Point}
         */
        __egretProto__.getFixBodyPos = function (member, bodyType) {
            var display = member.fightOption.curController.display;
            var isFaceLeft = member.fightOption.curController.isFaceLeft;
            var pos = mo.p(display.x, display.y); //目标位置
            var bPos = this.getDisplayBodyPos(member, bodyType);
            return mo.pAdd(pos, bPos);
        };
        /**
         * 获取特效挂节点位置
         * @param display
         * @param bodyType
         * @param isFaceLeft
         * @returns {mo.Point}
         */
        __egretProto__.getDisplayBodyPos = function (member, bodyType) {
            var display = member.fightOption.curController.display;
            var isFaceLeft = member.fightOption.curController.isFaceLeft;
            var bPos = mo.p(0, 0);
            if (bodyType == uw.Fight.HeroBody.head) {
                bPos.x = display.getHeadPos().x;
                bPos.y = display.getHeadPos().y;
            }
            else if (bodyType == uw.Fight.HeroBody.body) {
                bPos.x = display.getBodyPos().x;
                bPos.y = display.getBodyPos().y;
            }
            else {
                bPos.x = display.getFootPos().x;
                bPos.y = display.getFootPos().y;
            }
            if (isFaceLeft) {
                bPos.x *= -1;
            }
            return bPos;
        };
        /**
         * 根据两点，获取位置之间的某一距离的点的坐标,例如：A->B->C 在同一条直线上，求B坐标。已知AB距离，A和C的坐标
         * @param pointA
         * @param pointB
         * @param length
         */
        __egretProto__.getPosBy2PointLength = function (pointA, pointB, length) {
            var shootVector = mo.pSub(pointB, pointA); //1距离
            var normalizedShootVector = mo.pNormalize(shootVector); //2角度（cos(a)和sin(a))
            var overshotVector = mo.pMult(normalizedShootVector, length); //3新距离＝角度＊射程
            var pos = mo.pAdd(pointA, overshotVector); //4新坐标=p1+新距离
            return pos;
        };
        /**
         * 战斗坐标转化为cocos坐标
         * @param curPos
         * @returns {*}
         */
        __egretProto__.convertCurPosToNodePos = function (curPos) {
            return mo.p(curPos.x, uw.fightUtils.originPos.y - curPos.y);
        };
        /**
         * cocos坐标转化为战斗坐标
         * @param nodePos
         * @returns {*}
         */
        __egretProto__.convertNodePosToCurPos = function (nodePos) {
            return mo.p(nodePos.x, uw.fightUtils.originPos.y - nodePos.y);
        };
        __egretProto__.calRotateBy2Point = function (point1, point2) {
            //算角度
            var diffX = point1.x - point2.x;
            var diffY = point1.y - point2.y;
            var angel = Math.atan2(diffY, diffX);
            var rotation = angel * 180 / Math.PI;
            return rotation;
        };
        /**
         * 震屏
         */
        __egretProto__.shakeEffect = function () {
            uw.fightScene.displayTray.runAction(mo.shake(0.5, 20, 20));
        };
        /**
         * 获取缩放的坐标，主要用于资源缩放后，对应人物的坐标也需要进行缩放
         * @param x
         * @param y
         */
        __egretProto__.getCCAScalePos = function (x, y) {
            var ccaContentScale = mo.project.ccaContentScale;
            var point = mo.p(x, y);
            point.x *= ccaContentScale;
            point.y *= ccaContentScale;
            return point;
        };
        __egretProto__.getSimulateData = function (id) {
            var simulateData = mo.getJSONWithFileNameAndID(uw.cfg_c_simulateFight, id);
            var value = simulateData[uw.c_simulateFight_value];
            var valueType = simulateData[uw.c_simulateFight_valueType];
            if (valueType == 1) {
                value = value.split(",");
            }
            return value;
        };
        __egretProto__.changeAreaX = function (x, targetArea) {
            var reArea = [];
            //矩形
            if (targetArea.length >= 5) {
                reArea[0] = [targetArea[0]];
                reArea[1] = [targetArea[1][0] + x, targetArea[1][1]];
                reArea[2] = [targetArea[2][0] + x, targetArea[2][1]];
                reArea[3] = [targetArea[3][0] + x, targetArea[3][1]];
                reArea[4] = [targetArea[4][0] + x, targetArea[4][1]];
            }
            else {
                //圆形
                reArea[0] = [targetArea[0]];
                reArea[1] = [x, targetArea[1][1]];
                reArea[2] = [targetArea[2][0]];
            }
            return reArea;
        };
        FightUtils.__className = "FightUtils";
        return FightUtils;
    })(mo.Class);
    uw.FightUtils = FightUtils;
    FightUtils.prototype.__class__ = "uw.FightUtils";
})(uw || (uw = {}));

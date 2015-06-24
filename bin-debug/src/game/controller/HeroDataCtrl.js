/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var HeroDataCtrl = (function (_super) {
        __extends(HeroDataCtrl, _super);
        function HeroDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HeroDataCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._idKey = uw.dsConsts.HeroEntity.id;
            self._tempIdKey = uw.dsConsts.HeroEntity.tempId;
            self._tempCfgName = uw.cfg_t_hero;
            self._combatEff = 0;
        };
        __egretProto__.init = function (data, temp) {
            _super.prototype.init.call(this, data, temp);
            var self = this;
            var clazz = self.__class;
            self._equipDataCtrlList = self._equipDataCtrlList || [];
            self._combatEff = 0;
            temp = this._temp;
            self.tempId = self.tempId || temp[uw.t_hero_id];
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
            var t_warrior = mo.getJSONWithFileName(uw.cfg_t_warrior);
            var heroSort = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.heroSort);
            var heroKey = uw.dsConsts.HeroEntity;
            //设置便捷属性
            self.quality = temp[uw.t_hero_quality];
            self.tid = temp[uw.t_hero_tid];
            var warriorTemp = self.warriorTemp = t_warrior[self.tid];
            self.name = warriorTemp[uw.t_warrior_name];
            self.exclusiveId = warriorTemp[uw.t_warrior_exclusiveId];
            self.fragmentId = warriorTemp[uw.t_warrior_fragmentId];
            if (self.fragmentId) {
                var fragmentItem = mo.getJSONWithFileNameAndID(uw.cfg_t_item, self.fragmentId);
                self.copyIds = fragmentItem[uw.t_item_copyIds] || [];
            }
            else {
                self.copyIds = [];
            }
            self.job = warriorTemp[uw.t_warrior_job];
            self.posType = 3; //站位类型，前排、中排、后排
            for (var i = 0; i < heroSort.length; ++i) {
                if (warriorTemp[uw.t_warrior_posOrder] <= heroSort[i]) {
                    self.posType = i + 1;
                    break;
                }
            }
            if (self.isTempOnly) {
                var num = 0;
                for (var i = 1; i <= self.quality; ++i) {
                    num += c_lvl[i][uw.c_lvl_fragment];
                }
                self.totalFragmentRequired = num;
            }
            else {
                self.potentialTrain = self._data[uw.dsConsts.HeroEntity.potentialTrain];
                var nextLvlTemp = c_lvl[self.quality + 1];
                self.totalFragmentRequired = nextLvlTemp ? (nextLvlTemp[uw.c_lvl_fragment] || 0) : 0;
            }
            self.icon = resHelper.getRoleIconPath(self.tid);
            self.colorType = uw.getRoleColorType(self.tempId);
            self[clazz.SORT_QUALITY] = self.quality;
            self[clazz.SORT_TID] = temp[uw.t_hero_tid];
            self[clazz.SORT_TEMP_ID] = self.tempId;
            if (data) {
                self.id = data[heroKey.id];
                self.lvl = data[heroKey.lvl];
                self[clazz.SORT_LVL] = data[heroKey.lvl];
                self[clazz.SORT_CUR_EXP] = data[heroKey.expc];
                self.trainLvl = data[uw.dsConsts.HeroEntity.trainLvl]; //培养品阶
                if (!self.trainLvl)
                    self.trainLvl = data[uw.dsConsts.HeroEntity.trainLvl] = 0;
                //计算战斗力
                //            self.reCalCombatEff();
                self.totalExpcRequired = c_lvl[self.lvl][uw.c_lvl_expcToLvlUp] || 0;
                self.curMiniExpc = c_lvl[self.lvl][uw.c_lvl_minExpcOfLvl];
            }
            self[clazz.SORT_TRAIN_LVL] = self.trainLvl;
        };
        /**
         * 设置技能id
         * @param skillId
         * @param pos
         */
        __egretProto__.setSkillLvl = function (skillId, pos) {
            var self = this;
            if (pos < 3) {
                var keySkills = uw.dsConsts.HeroEntity.skills;
                self._data[keySkills][pos] = skillId;
                self._setChanged(keySkills);
            }
            else {
                self.set(uw.dsConsts.HeroEntity.mixSkill, skillId);
            }
        };
        __egretProto__.set = function (key, value) {
            _super.prototype.set.call(this, key, value);
            var self = this, clazz = self.__class;
            var heroKey = uw.dsConsts.HeroEntity;
            if (key == heroKey.lvl) {
                self[clazz.SORT_LVL] = value;
            }
            else if (key == heroKey.expc) {
                self[clazz.SORT_CUR_EXP] = value;
            }
        };
        __egretProto__.getNextLvExp = function () {
            var self = this;
            var nextLvl = self._data[uw.dsConsts.HeroEntity.lvl] + 1;
            var lvlData = mo.getJSONWithFileNameAndID(uw.cfg_c_lvl, nextLvl);
            return lvlData ? lvlData[uw.c_lvl_minExpcOfLvl] : null;
        };
        __egretProto__.getExp = function () {
            return this._data[uw.dsConsts.HeroEntity.expc];
        };
        /**
         * 获取经验进度条的option
         * @returns {{cur: number, total: *}}
         */
        __egretProto__.getExpcProgressOpt = function () {
            var self = this;
            var cur = self.getExp();
            var opt = { cur: cur - self.curMiniExpc, total: self.totalExpcRequired };
            var nextLvExp = self.getNextLvExp();
            if (!nextLvExp) {
                opt.str = "满级";
            }
            return opt;
        };
        __egretProto__.getExpcCurLvlOwned = function () {
            return this._data[uw.dsConsts.HeroEntity.expc] - this.curMiniExpc;
        };
        /**
         * 获取碎片进度条的option
         * @returns {{cur: *, total: *}}
         */
        __egretProto__.getFragmentProgressOpt = function () {
            var self = this;
            var cur = uw.userDataCtrl.getItemNum(self.fragmentId);
            var opt = { cur: cur, total: self.totalFragmentRequired };
            if (!self.totalFragmentRequired) {
                opt.str = "满阶";
            }
            return opt;
        };
        __egretProto__.getLvl = function () {
            return this._data[uw.dsConsts.HeroEntity.lvl];
        };
        __egretProto__.getNameStrToDisplay4Frag = function () {
            var self = this;
            return "[ubb color=#EDEDED]" + self.name + "[/ubb]";
        };
        __egretProto__.calProps = function () {
            return uw.calHeroProps(this, this._equipDataCtrlList, true);
        };
        __egretProto__.calPropsByEquip = function () {
            return uw.calHeroPropsByEquips(this._equipDataCtrlList, {});
        };
        __egretProto__.calPropsBySelf = function () {
            return uw.calHeroSelfProps(this, uw.getHeroTempData(this.tempId), {});
        };
        /**
         * 计算英雄基础属性
         * @returns {{}}
         */
        __egretProto__.calBaseProp = function () {
            var lvl = this.lvl - 1; //升了多少级
            var heroTemp = this._temp;
            var obj = {};
            //三级属性
            obj.lvlLife = heroTemp[uw.t_hero_lvlLife];
            obj.lvlPower = heroTemp[uw.t_hero_lvlPower];
            obj.lvlIntel = heroTemp[uw.t_hero_lvlIntel];
            //一级属性
            obj.life = Math.round(heroTemp[uw.t_hero_life] + obj.lvlLife * lvl); //体质
            obj.power = Math.round(heroTemp[uw.t_hero_power] + obj.lvlPower * lvl); //力量
            obj.intel = Math.round(heroTemp[uw.t_hero_intel] + obj.lvlIntel * lvl); //智力
            //二级属性
            obj.hp = Math.round(heroTemp[uw.t_hero_hp] + uw.calHp(obj.life)); //血量
            obj.pAttack = Math.round(heroTemp[uw.t_hero_pAttack] + uw.calPAttack(obj.power)); //物理攻击
            obj.pDefence = Math.round(heroTemp[uw.t_hero_pDefence] + uw.calPDefence(obj.power)); //物理防御
            obj.mAttack = Math.round(heroTemp[uw.t_hero_mAttack] + uw.calMAttack(obj.intel)); //魔法攻击
            obj.mDefence = Math.round(heroTemp[uw.t_hero_mDefence] + uw.calMDefence(obj.intel)); //魔法防御
            obj.hpRecovery = heroTemp[uw.t_hero_hpRecovery]; //过关回复血量
            obj.crit = heroTemp[uw.t_hero_crit]; //暴击
            obj.reCrit = heroTemp[uw.t_hero_reCrit]; //抗暴
            obj.hit = heroTemp[uw.t_hero_hit]; //命中
            obj.reHit = heroTemp[uw.t_hero_reHit]; //闪避
            obj.suckBlood = 0; //吸血率
            obj.ignoreDefence = 0; //无视防御
            obj.pAttackMult = heroTemp[uw.t_hero_pAttackMult]; //物攻天赋
            obj.pDefenceMult = heroTemp[uw.t_hero_pDefenceMult]; //物防天赋
            obj.mAttackMult = heroTemp[uw.t_hero_mAttackMult]; //魔攻天赋
            obj.mDefenceMult = heroTemp[uw.t_hero_mDefenceMult]; //魔防天赋
            //计算培养所带来的属性变化
            var propByTrain = this.calPropByTrain();
            obj.hp += propByTrain.hp; //血量
            obj.pAttack += propByTrain.pAttack; //物理攻击
            obj.pDefence += propByTrain.pDefence; //物理防御
            obj.mAttack += propByTrain.mAttack; //魔法攻击
            obj.mDefence += propByTrain.mDefence; //魔法防御
            return obj;
        };
        /**
         * 计算培养所带来的属性加成
         * @returns {{pAttack: number, pDefence: number, mAttack: number, mDefence: number, hp: *}}
         */
        __egretProto__.calPropByTrain = function () {
            var self = this;
            var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
            var trainHpArr = c_game[uw.id_c_game.trainHp];
            var trainPropMultArr = c_game[uw.id_c_game.trainPropMult];
            var trainLvl = self._data[uw.dsConsts.HeroEntity.trainLvl];
            var darkTrain = self._data[uw.dsConsts.HeroEntity.potentialTrain];
            var trainPropKey = uw.c_prop.trainPropKey;
            return {
                pAttack: trainPropMultArr[0] * (darkTrain[trainPropKey.pAttack] || 0),
                pDefence: trainPropMultArr[1] * (darkTrain[trainPropKey.pDefence] || 0),
                mAttack: trainPropMultArr[2] * (darkTrain[trainPropKey.mAttack] || 0),
                mDefence: trainPropMultArr[3] * (darkTrain[trainPropKey.mDefence] || 0),
                hp: trainHpArr[4] * (darkTrain[trainPropKey.hp] || 0) + (trainHpArr[trainLvl - 1] || 0)
            };
        };
        /**
         * 获得英雄
         */
        __egretProto__.getUpgradeOpt = function () {
            var self = this;
            var opt = {
                isMaxGrade: false,
                fragmentEnough: false,
                goldNeed: 0,
                isGoldEnough: false,
                fragmentId: null,
                fragmentNeed: 0,
                canUpgrade: false
            };
            //升阶判断
            var t_hero = mo.getJSONWithFileName(uw.cfg_t_hero);
            var nextTemp = t_hero[self.tempId + 1]; //获取下一阶数据
            opt.isMaxGrade = (nextTemp == null); //如果不存在，则表示满阶了，如果已经是满阶
            //碎片判断
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
            var fragmentNeed = c_lvl[self.quality + 1][uw.c_lvl_fragment]; //获取到需要的碎片数量
            var fragmentId = self.fragmentId; //获取当碎片id
            var ownNum = uw.userDataCtrl.getItemNum(fragmentId); //获取到当前拥有的碎片数量
            opt.fragmentId = fragmentId;
            opt.fragmentNeed = fragmentNeed;
            opt.fragmentEnough = ownNum >= fragmentNeed;
            //金币判断
            var gold = uw.calHeroUpgradeGold(self.quality + 1); //获取升阶所需要消耗的金币
            opt.goldNeed = gold;
            opt.isGoldEnough = uw.userDataCtrl.getGold() >= gold;
            opt.canUpgrade = !opt.isMaxGrade && opt.isGoldEnough && opt.fragmentEnough;
            return opt;
        };
        /**
         * 英雄升阶。
         * @param cb
         * @param target
         * @returns {*}
         */
        __egretProto__.upgrade = function (opt, cb, target) {
            var self = this;
            if (opt.isMaxGrade) {
                return mo.showMsg(uw.id_c_msgCode.heroLvMax);
            }
            if (!opt.fragmentEnough) {
                uw.warn("需要碎片id【%s】，数量【%s】，还缺少【%s】个。", opt.fragmentId, opt.fragmentNeed, opt.fragmentNeed - uw.userDataCtrl.getItemNum(opt.fragmentId));
                return mo.showMsg(uw.id_c_msgCode.nostone);
            }
            var gold = uw.calHeroUpgradeGold(self.quality + 1); //获取升阶所需要消耗的金币
            mo.showMsg(uw.id_c_msgCode.ifHeroUp, gold, function () {
                if (!opt.isGoldEnough) {
                    return mo.showMsg(uw.id_c_msgCode.noGolds);
                }
                var args = {};
                args[uw.iface.a_hero_upQuality_args.heroId] = self.id;
                var oldProps = self.calProps();
                mo.request(uw.iface.a_hero_upQuality, args, function (data) {
                    self.reset(data); //更新英雄数据
                    uw.userDataCtrl.addItem(opt.fragmentId, -opt.fragmentNeed); //扣除碎片
                    uw.userDataCtrl.reduceGold(gold);
                    self._setChanged(self.__class.ON_UPGRADE);
                    var upGradeDlg = uw.HeroUpGradeDlg.create();
                    upGradeDlg.show();
                    var curTempId = self.tempId, oldTempId = curTempId - 1;
                    upGradeDlg.resetByData(oldTempId, curTempId);
                    upGradeDlg.onClose(function () {
                        self.showPropTips(oldProps); //显示属性漂浮
                        if (cb)
                            cb.call(target);
                    });
                });
            });
        };
        //**********************技能相关 开始*****************
        /**
         * 判断技能是否已经解锁（是否已经获得）
         * @param index
         * @returns {boolean}
         */
        __egretProto__.isSkillLocked = function (index) {
            if (index < 3) {
                return !this._data[uw.dsConsts.HeroEntity.skills][index];
            }
            else {
                return !this._data[uw.dsConsts.HeroEntity.mixSkill];
            }
        };
        /**
         * 获取技能id
         * @param index
         * @returns {*}
         */
        __egretProto__.getSkillId = function (index) {
            var self = this, temp = self._temp;
            if (index < 3) {
                return self.warriorTemp[uw.t_warrior_skills][index];
            }
            else {
                return self.warriorTemp[uw.t_warrior_mixSkill];
            }
        };
        __egretProto__.getSkillLvl = function (index) {
            var self = this;
            if (index < 3) {
                return self._data[uw.dsConsts.HeroEntity.skills][index] || 0;
            }
            else {
                return self._data[uw.dsConsts.HeroEntity.mixSkill] || 0;
            }
        };
        __egretProto__.calSkillOpen = function (oldSkills) {
            var self = this;
            var skills = self.skills;
            for (var i = 0; i < 3; i++) {
                //以前等级为0，现在不为零则表示新开技能。目前设定一次只打开一个技能
                if (!oldSkills[i] && skills[i] > 0) {
                    return self.getSkillId(i);
                }
            }
            return null;
        };
        Object.defineProperty(__egretProto__, "skills", {
            get: function () {
                return this._data[uw.dsConsts.HeroEntity.skills] || [0, 0, 0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "mixSkill", {
            get: function () {
                return this._data[uw.dsConsts.HeroEntity.mixSkill] || 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取技能模板数据
         * @param skillId
         * @returns {Object}
         */
        __egretProto__.getSkillData = function (skillId) {
            return uw.getSkillData(this.getSkillId(skillId), this.getSkillLvl(skillId));
        };
        /**
         * 获取升级技能所需金币
         * @param index
         * @returns {*}
         */
        __egretProto__.getGoldForSkill = function (index) {
            var self = this;
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
            var nextLvl = self.getSkillLvl(index) + 1;
            if (index < 3) {
                return c_lvl[nextLvl][uw.c_lvl_skillGoldList][index] || 0;
            }
            else {
                return c_lvl[nextLvl][uw.c_lvl_mixSkillGold] || 0;
            }
        };
        /**
         * 技能是否应达到最高等级
         * @param index
         */
        __egretProto__.isSkillMax = function (index) {
            var lvl = this.getSkillLvl(index);
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
            var lvlTemp = c_lvl[lvl + 1], limitLvl;
            if (index < 3) {
                var skillLimitLvlList = lvlTemp[uw.c_lvl_skillLimitLvlList];
                limitLvl = skillLimitLvlList[index];
            }
            else {
                limitLvl = lvlTemp[uw.c_lvl_mixSkillLimitLvl];
            }
            return limitLvl == 0;
        };
        /**
         * 判断技能是否能够升级
         * @param index
         * @returns {boolean}
         */
        __egretProto__.canUpSkill = function (index) {
            var self = this;
            var c_open = mo.getJSONWithFileName(uw.cfg_c_open); //读取open配置表
            var limitLvlOfLeader = c_open[uw.id_c_open.skill][uw.c_open_lvlRequired]; //获得技能升级领主等级需求
            if (uw.userDataCtrl.getLvl() < limitLvlOfLeader)
                return false; //如果当前领主等级不满足条件，则返回false
            if (self.isSkillLocked(index))
                return false; //未解锁
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
            var nextLvl = self.getSkillLvl(index) + 1; //下一级
            var lvlTemp = c_lvl[nextLvl], limitLvl;
            if (index < 3) {
                var skillLimitLvlList = lvlTemp[uw.c_lvl_skillLimitLvlList];
                limitLvl = skillLimitLvlList[index];
            }
            else {
                limitLvl = lvlTemp[uw.c_lvl_mixSkillLimitLvl];
            }
            if (limitLvl == 0)
                return false; //已经超过了最高等级
            if (limitLvl > self.lvl) {
                return false;
            }
            return true;
        };
        /**
         * 升级技能
         * @param index     当前技能下标
         * @param cb
         * @param target
         */
        __egretProto__.upSkill = function (index, cb, target) {
            var self = this;
            //技能点不足，就提示购买
            if (uw.userDataCtrl.getSkillPoints() <= 0)
                return uw.userDataCtrl.buySkillPoints();
            //取得升级技能所需要消耗的金币
            var gold = self.getGoldForSkill(index);
            if (gold > uw.userDataCtrl.getGold()) {
                return mo.showMsg(uw.id_c_msgCode.noGolds);
            }
            var args = {};
            args[uw.iface.a_hero_upSkill_args.heroId] = this.id;
            args[uw.iface.a_hero_upSkill_args.pos] = index;
            uw.log("请求升级技能参数：", uw.iface.a_hero_upSkill, args);
            mo.requestWaiting(uw.iface.a_hero_upSkill, args, function (heroData) {
                var skillPointsReTime = uw.userDataCtrl.getSkillPointReTime();
                uw.userDataCtrl.set(uw.dsConsts.UserEntity.skillPointsReTime, Date.newDate(skillPointsReTime.getTime() + uw.userDataCtrl.skillPointInterval));
                uw.userDataCtrl.reduceGold(gold); //扣除金币
                var lvlAfterUp = self.getSkillLvl(index) + 1; //升级后的技能等级
                self.reset(heroData);
                //            self.setSkillLvl(lvlAfterUp, index);
                self._setChanged(self.__class.ON_UP_SKILL);
                if (cb)
                    cb.call(target, lvlAfterUp);
            });
        };
        //**********************技能相关 结束*****************
        //**********************培养相关 开始*****************
        __egretProto__.getDark = function () {
            var self = this;
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl); //等级配置表
            //下一个培养等级数据
            var nextTrainLvlInfo = c_lvl[self.trainLvl + 1];
            var heroLvlToTrain = 100000; //培养升级所需的最低英雄等级
            if (nextTrainLvlInfo) {
                heroLvlToTrain = nextTrainLvlInfo[uw.c_lvl_heroLvlToTrain];
            }
            //该等级所拥有的总共的暗影值（包括已经消耗的）
            var totalDark = c_lvl[Math.min(heroLvlToTrain, self.lvl)][uw.c_lvl_potentialPoints];
            var usedDark = self.getUsedDark(); //获取已经消耗的暗影值
            return totalDark - usedDark;
        };
        /**
         * 获取已经使用过的暗影值
         * @returns {number}
         */
        __egretProto__.getUsedDark = function () {
            var self = this;
            var usedDark = 0;
            var usedDarkMap = self._data[uw.dsConsts.HeroEntity.potentialTrain];
            for (var propId in usedDarkMap) {
                usedDark += usedDarkMap[propId];
            }
            return usedDark;
        };
        /**
         * 获取培养的option。
         * @param type
         * @returns {{type: *, dark: (*|Array|cc.Director), darkStoneId: *, darkStoneRequired: number, darkStoneOwned: *, heroLvlToTrain: number, isMaxTrainLvl: boolean}}
         */
        __egretProto__.getTrainOpt = function (type) {
            var self = this, clazz = self.__class;
            var opt = {
                type: null,
                totalDark: null,
                dark: null,
                darkStoneId: null,
                darkStoneRequired: 0,
                darkStoneOwned: null,
                heroLvlToTrain: 0,
                isMaxTrainLvl: false,
                heroLvlEnough: false,
                gold: 0,
                isGoldEnough: false,
                canAwaking: false //可以觉醒
            };
            var c_game = mo.getJSONWithFileName(uw.cfg_c_game); //game配置表
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl); //等级配置表
            var darkStoneRequired = 1;
            //先根据培养类型获取暗影石的消耗数量
            if (type == clazz.TRAIN_TYPE_NORMAL) {
                darkStoneRequired = c_game[uw.id_c_game.trainSet][0];
            }
            else if (type == clazz.TRAIN_TYPE_POWER) {
                darkStoneRequired = c_game[uw.id_c_game.trainSet][1];
            }
            else if (type == clazz.TRAIN_TYPE_INTEL) {
                darkStoneRequired = c_game[uw.id_c_game.trainSet][1];
            }
            opt.type = type;
            var trainLvlInfo = c_lvl[self.trainLvl];
            //先从c_lvl中获取到当前培养品阶所需要的暗影石id
            var darkStoneId = trainLvlInfo[uw.c_lvl_trainDarkStone];
            var darkStoneOwned = uw.userDataCtrl.getItemNum(darkStoneId);
            //下一个培养等级数据
            var nextTrainLvlInfo = c_lvl[self.trainLvl + 1];
            var heroLvlToTrain = 100000; //培养升级所需的最低英雄等级
            if (nextTrainLvlInfo) {
                heroLvlToTrain = nextTrainLvlInfo[uw.c_lvl_heroLvlToTrain];
            }
            //该等级所拥有的总共的暗影值（包括已经消耗的）
            var totalDark = c_lvl[Math.min(heroLvlToTrain, self.lvl)][uw.c_lvl_potentialPoints];
            var usedDark = self.getUsedDark(); //获取已经消耗的暗影值
            opt.totalDark = totalDark;
            opt.dark = totalDark - usedDark;
            opt.darkStoneId = darkStoneId;
            opt.darkStoneRequired = darkStoneRequired;
            opt.darkStoneOwned = darkStoneOwned;
            opt.heroLvlToTrain = heroLvlToTrain;
            opt.isMaxTrainLvl = (heroLvlToTrain == null);
            opt.heroLvlEnough = self.lvl >= heroLvlToTrain;
            var gold = uw.calTrainUp(self.trainLvl + 1); //获取培养进阶消耗金币
            opt.gold = gold;
            opt.isGoldEnough = uw.userDataCtrl.getGold() >= gold;
            opt.canAwaking = !opt.isMaxTrainLvl && opt.heroLvlEnough && (opt.dark == 0);
            return opt;
        };
        /**
         * 培养升阶
         * @param opt
         * @param cb
         * @param target
         * @returns {*}
         */
        __egretProto__.upTrainLvl = function (opt, cb, target) {
            var self = this;
            //满阶判断
            if (opt.isMaxTrainLvl)
                return mo.showMsg(uw.id_c_msgCode.maxLv);
            //判断等级是否足够
            if (!opt.heroLvlEnough)
                return mo.showMsg(uw.id_c_msgCode.trainHeroLvLess, opt.heroLvlToTrain);
            //消耗完剩余潜力点才能觉醒
            if (opt.dark != 0)
                return mo.showMsg(uw.id_c_msgCode.haveTrainPoints);
            mo.showMsg(uw.id_c_msgCode.ifTrainUp, opt.gold, function () {
                if (!opt.isGoldEnough)
                    return mo.showMsg(uw.id_c_msgCode.noGolds); //金币不足
                var args = {};
                var argsKey = uw.iface.a_hero_upTrainLvl_args;
                args[argsKey.heroId] = self.id;
                var oldTrainLvl = self.trainLvl; //旧的培养等级
                var oldProps = self.calProps();
                var oldCombatEff = self.combatEff;
                var oldSkills = self.skills;
                mo.requestWaiting(uw.iface.a_hero_upTrainLvl, args, function (heroEntity) {
                    uw.userDataCtrl.reduceGold(opt.gold); //扣除金币
                    self.reset(heroEntity); //更新数据
                    self._setChanged(self.__class.ON_UP_TRAIN_LVL);
                    //self.showPropTips(oldProps);//显示属性漂浮
                    var oldArr = [oldTrainLvl, Math.round(oldProps.hp), oldCombatEff];
                    var curProps = self.calProps();
                    var currArr = [self.trainLvl, Math.round(curProps.hp), self.combatEff];
                    uw.HeroTrainSuccDlg.create(self, oldArr, currArr, oldSkills).show();
                    if (cb)
                        cb.call(target);
                });
            });
        };
        /**
         * 英雄培养
         * @param opt
         * @param cb
         * @param target
         * @returns {*}
         */
        __egretProto__.train = function (opt, cb, target) {
            var self = this;
            //判断暗影石数量是否足够，不足按键不可点
            if (opt.darkStoneRequired > opt.darkStoneOwned)
                return mo.showMsg(uw.id_c_msgCode.noTrainItem);
            var args = {};
            var argsKey = uw.iface.a_hero_train_args;
            args[argsKey.heroId] = self.id;
            args[argsKey.type] = opt.type;
            uw.log(uw.iface.a_hero_train, args);
            mo.requestWaiting(uw.iface.a_hero_train, args, function (potentialTrain) {
                uw.log("potentialTrain--->", potentialTrain);
                uw.userDataCtrl.addItem(opt.darkStoneId, -opt.darkStoneRequired); //扣除培养丹
                var potentialPoints = 0;
                for (var propId in potentialTrain) {
                    potentialPoints += potentialTrain[propId];
                }
                if (cb)
                    cb.call(target, potentialTrain, potentialPoints);
            });
        };
        /**
         * 保存培养结果。
         * @param cb
         * @param target
         */
        __egretProto__.saveTrain = function (cb, target) {
            var self = this;
            var args = {};
            var argsKey = uw.iface.a_hero_saveTrain_args;
            args[argsKey.heroId] = self.id;
            mo.requestWaiting(uw.iface.a_hero_saveTrain, args, function (heroEntity) {
                self.reset(heroEntity); //更新数据
                if (cb)
                    cb.call(target);
            });
        };
        __egretProto__._setEquipDataCtrlList = function (list) {
            this._equipDataCtrlList = list;
        };
        /**
         * 穿戴装备
         * @param equipDataCtrl   要穿戴的装备DataCtrl
         * @param cb    回调函数
         * @param cbTarget
         */
        __egretProto__.putOnEquip = function (equipDataCtrl, cb, cbTarget) {
            var self = this;
            var oldEquipDataCtrl = self.getEquipDataCtrlByPart(equipDataCtrl.part);
            var equipDataCtrlList = self._equipDataCtrlList;
            //先进行穿戴等级限制
            if (self.getLvl() < equipDataCtrl.needLvl)
                return mo.showMsg(uw.id_c_msgCode.noLvl); //穿戴等级不住提示
            //判断下是否是该英雄才能穿戴的
            var heroTid = equipDataCtrl._itemEquipTemp[uw.t_itemEquip_heroTid];
            if (heroTid && self.tid != heroTid)
                return mo.showMsg(uw.id_c_msgCode.canNotPutOn); //不能穿戴
            var args = {};
            var argsKey = uw.iface.a_hero_putOnEquip_args;
            args[argsKey.heroId] = self.id;
            args[argsKey.equipId] = equipDataCtrl.id;
            args[argsKey.part] = equipDataCtrl.part;
            var oldProps = self.calProps();
            mo.requestWaiting(uw.iface.a_hero_putOnEquip, args, function (heroEntity) {
                mo.playUIAudio(113);
                if (oldEquipDataCtrl && !oldEquipDataCtrl.isTempOnly) {
                    for (var i = 0, li = equipDataCtrlList.length; i < li; i++) {
                        var ctrl = equipDataCtrlList[i];
                        if (ctrl.id == oldEquipDataCtrl.id) {
                            ctrl.set(uw.dsConsts.EquipEntity.heroId, null); //移除英雄id
                            equipDataCtrlList.splice(i, 1);
                            break;
                        }
                    }
                }
                equipDataCtrl.set(uw.dsConsts.EquipEntity.heroId, self.id); //设置英雄id
                equipDataCtrlList.push(equipDataCtrl);
                uw.userDataCtrl._swapEquipToNotOn(equipDataCtrl, oldEquipDataCtrl);
                self.reset(heroEntity);
                self.pushNotify(self.__class.ON_EQUIP_CHANGED, equipDataCtrl.part, equipDataCtrl, oldEquipDataCtrl);
                self.showPropTips(oldProps); //显示属性漂浮
                if (cb) {
                    cb.apply(cbTarget);
                }
            });
        };
        /**
         * 卸下装备
         * @param part   要脱下的装备的部位
         * @param cb    回调函数
         * @param cbTarget
         */
        __egretProto__.putOffEquip = function (part, cb, cbTarget) {
            var self = this;
            var oldEquipDataCtrl = self.getEquipDataCtrlByPart(part);
            if (oldEquipDataCtrl) {
                var args = {};
                var argsKey = uw.iface.a_hero_putDownEquip_args;
                args[argsKey.heroId] = self.id;
                args[argsKey.equipId] = oldEquipDataCtrl.id;
                var oldProps = self.calProps();
                mo.requestWaiting(uw.iface.a_hero_putDownEquip, args, function (heroEntity) {
                    mo.playUIAudio(113);
                    var equipDataCtrlList = self._equipDataCtrlList;
                    for (var i = 0, li = equipDataCtrlList.length; i < li; i++) {
                        var ctrl = equipDataCtrlList[i];
                        if (ctrl == oldEquipDataCtrl) {
                            equipDataCtrlList.splice(i, 1);
                            ctrl.set(uw.dsConsts.EquipEntity.heroId, null); //移除英雄id
                            break;
                        }
                    }
                    uw.userDataCtrl._notOnEquipList.push(oldEquipDataCtrl);
                    self.reset(heroEntity);
                    self.pushNotify(self.__class.ON_EQUIP_CHANGED, part, null, oldEquipDataCtrl);
                    self.showPropTips(oldProps); //显示属性漂浮
                    if (cb) {
                        cb.apply(cbTarget);
                    }
                });
            }
        };
        /**
         *   获得所有身上的装备
         */
        __egretProto__.getAllEquipDataCtrl = function () {
            var self = this;
            return self._equipDataCtrlList;
        };
        /**
         * 通过装备的类型获取到装备
         * @param part
         * @returns {*}
         */
        __egretProto__.getEquipDataCtrlByPart = function (part) {
            var self = this;
            var equipList = this._equipDataCtrlList;
            for (var i = 0, li = equipList.length; i < li; i++) {
                var equip = equipList[i];
                if (equip.part == part) {
                    return equip;
                }
            }
            if (part < uw.c_prop.equipPartKey.exclusive) {
                var equipInitArr = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.equipInitIds);
                var equipTempId = equipInitArr[part - 1];
                return uw.EquipDataCtrl.create(null, mo.getJSONWithFileNameAndID(uw.cfg_t_item, equipTempId));
            }
            else if (part == uw.c_prop.equipPartKey.exclusive) {
                var exclusiveId = self.exclusiveId;
                return uw.EquipDataCtrl.create(null, mo.getJSONWithFileNameAndID(uw.cfg_t_item, exclusiveId));
            }
            return null;
        };
        /**
         * 是否普通装备都已经穿戴完了。
         * @returns {boolean}
         */
        __egretProto__.isNormalEquipFull = function () {
            var equipList = this._equipDataCtrlList;
            var count = 0;
            for (var i = 0, li = equipList.length; i < li; i++) {
                var equip = equipList[i];
                if (equip.part < 6) {
                    count++;
                }
            }
            return count == 5;
        };
        /**
         * 根据part判断装备是否空着还没购买穿戴
         * @param part
         * @returns {boolean}
         */
        __egretProto__.isNormalEquipEmptyByPart = function (part) {
            var equipList = this._equipDataCtrlList;
            for (var i = 0, li = equipList.length; i < li; i++) {
                var equip = equipList[i];
                if (equip.part == part) {
                    return false;
                }
            }
            return true;
        };
        __egretProto__.isNormalEquipNotStrengthenByPart = function (part) {
            var equipCtrl = this.getEquipDataCtrlByPart(part);
            return !equipCtrl || equipCtrl.isTempOnly || equipCtrl.lvl == 0;
        };
        __egretProto__.isNormalEquipFullStrengthen = function () {
            var self = this;
            for (var i = 1; i < 6; ++i) {
                var equipCtrl = self.getEquipDataCtrlByPart(i);
                if (!equipCtrl || equipCtrl.isTempOnly || equipCtrl.lvl == 0)
                    return false;
            }
            return true;
        };
        /**
         * 获取还没装备的专属装备。
         * @returns {*}
         */
        __egretProto__.getNotOnExclusiveEquipDataCtrl = function () {
            return uw.userDataCtrl.getExclusiveEquipByHeroTid(this._temp[uw.t_hero_tid]);
        };
        __egretProto__.getAllNotOnExclusiveEquipList = function () {
            var self = this;
            var allEquipList = uw.userDataCtrl.getAllNotOnExclusiveEquipList();
            return allEquipList.filter(mo.filterOption.bind({ list: [[uw.EquipDataCtrl.KEY_HERO_TID, self.tempId]] }));
        };
        /**
         * 是否有专属可以穿戴。如果已经有专属在身上了，就不能在穿戴了。
         * @returns {boolean}
         */
        __egretProto__.hasExclusiveToPuton = function () {
            var self = this;
            var equipDataCtrlList = self._equipDataCtrlList;
            for (var i = 0, li = equipDataCtrlList.length; i < li; i++) {
                var equipDataCtrl = equipDataCtrlList[i];
                if (equipDataCtrl.part == uw.c_prop.equipPartKey.exclusive)
                    return false; //已经有了，就不能再穿戴了
            }
            var edc = self.getNotOnExclusiveEquipDataCtrl();
            if (!edc)
                return false;
            return edc.needLvl <= self.getLvl();
        };
        /**
         * 是否有普通装备可以升级
         * @returns {boolean}
         */
        __egretProto__.hasNormalEquipToUp = function () {
            var self = this;
            var equipDataCtrlList = self._equipDataCtrlList;
            for (var i = 0, li = equipDataCtrlList.length; i < li; i++) {
                var equipDataCtrl = equipDataCtrlList[i];
                if (equipDataCtrl.part == uw.c_prop.equipPartKey.exclusive || equipDataCtrl.part == uw.c_prop.equipPartKey.wish)
                    continue;
                var nextEquipDataCtrl = equipDataCtrl.getNext();
                if (!nextEquipDataCtrl)
                    continue;
                var opt = nextEquipDataCtrl.getUpgradeToThisOpt(self);
                if (opt.isEnough && opt.canWare)
                    return true;
            }
            return false;
        };
        __egretProto__.showPropTips = function (oldProps) {
            var self = this;
            var props = self.calProps();
            uw.showPropTips(props, oldProps);
        };
        /**
         * 购买普通装备。
         * @param part
         * @param cb
         * @param target
         */
        __egretProto__.buyNormalEquip = function (part, cb, target) {
            var self = this;
            var equipDataCtrl = self.getEquipDataCtrlByPart(part);
            if (!equipDataCtrl.isTempOnly)
                return mo.showMsg("该英雄已经穿戴有该部位的装备了，请检查！");
            var goldRequired = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.equipInitGold)[0];
            if (uw.userDataCtrl.getGold() < goldRequired)
                return mo.showMsg(uw.id_c_msgCode.noGolds);
            var args = {};
            var argsKey = uw.iface.a_hero_buyNormalEquip_args;
            args[argsKey.heroId] = self.id;
            args[argsKey.part] = part;
            var oldProps = self.calProps();
            mo.requestWaiting(uw.iface.a_hero_buyNormalEquip, args, function (heroAndEquip) {
                var dsKey = uw.dsConsts.HeroAndEquip;
                var heroEntity = heroAndEquip[dsKey.hero];
                var equipEntity = heroAndEquip[dsKey.equip];
                self.reset(heroEntity); //重置英雄数据
                equipDataCtrl.reset(equipEntity); //重置装备数据
                self._equipDataCtrlList.push(equipDataCtrl); //将装备加入到列表中
                uw.userDataCtrl.reduceGold(goldRequired); //扣除金币
                self.pushNotify(self.__class.ON_EQUIP_CHANGED, part); //设置装备发生改变的监听
                self.showPropTips(oldProps); //显示属性漂浮
                if (cb)
                    cb.call(target);
            });
        };
        //**********************装备相关 结束*****************
        //**********************ui相关 开始*****************
        /**
         * 获取名字显示的富文本表达式。
         * @returns {string}
         */
        __egretProto__.getNameStrToDisplay = function () {
            var self = this;
            var heroNum = self.isTempOnly ? 0 : self.trainLvl;
            var name = "[ubb color=#EDEDED]" + self.name + "[/ubb]";
            if (heroNum) {
                //            var color = cc.convertColor3BtoHexString(uw.getColorByQuality(self.quality));
                name += "+" + heroNum;
            }
            return name;
        };
        __egretProto__.getJobFrameName = function () {
            return mo.formatStr(res.ui_hero.tmp_job_png, this.job);
        };
        Object.defineProperty(__egretProto__, "combatEff", {
            get: function () {
                var self = this;
                //if(!self._combatEff) {
                //    log("开始计算【%s】的战斗力", self.name);
                self._combatEff = uw.calHeroCombatEff(self, self._equipDataCtrlList);
                //}
                return self._combatEff;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "fragmentCount", {
            get: function () {
                return uw.userDataCtrl.getItemNum(this.fragmentId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "fragPercent", {
            get: function () {
                return this.fragmentCount / this.totalFragmentRequired;
            },
            enumerable: true,
            configurable: true
        });
        HeroDataCtrl.__className = "HeroDataCtrl";
        HeroDataCtrl.SORT_TRAIN_LVL = "trainLvl";
        HeroDataCtrl.SORT_QUALITY = "quality";
        HeroDataCtrl.SORT_LVL = "lvl";
        HeroDataCtrl.SORT_COMBAT_EFF = "combatEff"; //注意，这个值不能修改
        HeroDataCtrl.SORT_TID = "tid";
        HeroDataCtrl.SORT_TEMP_ID = "tempId";
        HeroDataCtrl.SORT_EXC_PUT_ON = "isExcPutOn"; // 是否已经穿上专属
        HeroDataCtrl.SORT_CUR_EXP = "curExp"; // 当前经验
        HeroDataCtrl.SORT_FRAG_PERCENT = "fragPercent"; //碎片收集比例
        /** @constant 普通培养 */
        HeroDataCtrl.TRAIN_TYPE_NORMAL = 0;
        /** @constant 力培养 */
        HeroDataCtrl.TRAIN_TYPE_POWER = 1;
        /** @constant 智培养 */
        HeroDataCtrl.TRAIN_TYPE_INTEL = 2;
        HeroDataCtrl.ON_UPGRADE = "onUpgrade"; //升阶成功
        HeroDataCtrl.ON_UP_SKILL = "onUpSkill"; //技能升级
        HeroDataCtrl.ON_UP_TRAIN_LVL = "onUpTrainLvl"; //培养升阶
        HeroDataCtrl.ON_EQUIP_CHANGED = "onEquipChanged"; //装备变化,
        HeroDataCtrl.ON_UPDATED_BY_GEM = "onUpdateByGem"; //由于宝石的变化导致属性更新
        HeroDataCtrl.ON_TRAIN_CHANGED = "onTrainChanged"; //培养信息发生改变
        //**********************ui相关 结束*****************
        HeroDataCtrl.initByServer = function (cb, cbTarget) {
            if (cbTarget === void 0) { cbTarget = null; }
            mo.request(uw.iface.a_hero_getList, {}, function (data) {
                var heroDataCtrlList = uw.heroDataCtrlList = [];
                var t_hero = mo.getJSONWithFileName(uw.cfg_t_hero);
                var heroKey = uw.dsConsts.HeroEntity;
                for (var i = 0, li = data.length; i < li; i++) {
                    var hero = data[i];
                    var tempId = hero[heroKey.tempId];
                    var heroTemp = t_hero[tempId];
                    var obj = uw.HeroDataCtrl.create(hero, heroTemp);
                    heroDataCtrlList.push(obj);
                }
                if (cb) {
                    cb.call(cbTarget, null, heroDataCtrlList);
                }
            });
        };
        return HeroDataCtrl;
    })(uw.RespAndTempDataCtrl);
    uw.HeroDataCtrl = HeroDataCtrl;
    HeroDataCtrl.prototype.__class__ = "uw.HeroDataCtrl";
    uw.heroDataCtrlList;
})(uw || (uw = {}));

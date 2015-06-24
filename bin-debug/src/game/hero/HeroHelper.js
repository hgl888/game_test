var logger;
(function (logger) {
    var heroHelper;
    (function (heroHelper) {
        heroHelper.log;
        heroHelper.debug;
        heroHelper.info;
        heroHelper.warn;
        heroHelper.error;
        logger.initLogger(logger.heroHelper, "heroHelper");
        logger.setLvl("heroHelper", 4);
    })(heroHelper = logger.heroHelper || (logger.heroHelper = {}));
})(logger || (logger = {}));
var uw;
(function (uw) {
    var HeroDsToCalProps = (function () {
        function HeroDsToCalProps() {
        }
        var __egretProto__ = HeroDsToCalProps.prototype;
        return HeroDsToCalProps;
    })();
    uw.HeroDsToCalProps = HeroDsToCalProps;
    HeroDsToCalProps.prototype.__class__ = "uw.HeroDsToCalProps";
    function calHeroSelfProps(hero, heroTemp, props) {
        var lvl = hero.lvl - 1; //升了多少级
        var formula = uw;
        //三级属性
        props.lvlPower = heroTemp.lvlPower || 0; //升级增加力量
        props.lvlIntel = heroTemp.lvlIntel || 0; //升级增加智力
        props.lvlLife = heroTemp.lvlLife || 0; //升级增加体质
        //一级属性
        props.power = heroTemp.power || 0; //力量
        props.intel = heroTemp.intel || 0; //智力
        props.life = heroTemp.life || 0; //体质
        //二级属性
        props.hp = heroTemp.hp || 0; //生命值
        props.pAttack = heroTemp.pAttack || 0; //物理攻击
        props.pDefence = heroTemp.pDefence || 0; //物理防御
        props.mAttack = heroTemp.mAttack || 0; //魔法攻击
        props.mDefence = heroTemp.mDefence || 0; //魔法防御
        props.hpRecovery = heroTemp.hpRecovery || 0; //过关回复血量
        props.crit = heroTemp.crit || 0; //暴击
        props.reCrit = heroTemp.reCrit || 0; //抗暴
        props.hit = heroTemp.hit || 0; //命中
        props.reHit = heroTemp.reHit || 0; //闪避
        props.pAttackMult = heroTemp.pAttackMult || 0; //物攻天赋
        props.pDefenceMult = heroTemp.pDefenceMult || 0; //物防天赋
        props.mAttackMult = heroTemp.mAttackMult || 0; //魔攻天赋
        props.mDefenceMult = heroTemp.mDefenceMult || 0; //魔防天赋
        props.suckBlood = heroTemp.suckBlood || 0; //吸血
        props.ignoreDefence = heroTemp.ignoreDefence || 0; //无视防御
        props.skillLvl = heroTemp.skillLvl || 0; //技能额外等级
        props.energy = heroTemp.energy || 0; //初始能量
        props.energyRecovery = heroTemp.energyRecovery || 0; //过关恢复能量值
        props.power += props.lvlPower * lvl; //力量
        props.intel += props.lvlIntel * lvl; //智力
        props.life += props.lvlLife * lvl; //体质
        props.hp += formula.calHp(props.life);
        props.pAttack += formula.calPAttack(props.power);
        props.pDefence += formula.calPDefence(props.power);
        props.mAttack += formula.calMAttack(props.intel);
        props.mDefence += formula.calMDefence(props.intel);
        return props;
    }
    uw.calHeroSelfProps = calHeroSelfProps;
    function calHeroSelfPropsByTrain(hero, heroTemp, props) {
        //计算培养加成
        var potentialTrain = hero.potentialTrain;
        var trainPropKey = uw.c_prop.trainPropKey;
        var trainProp = uw.c_prop.trainProp;
        var trainPropMultArr = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.trainPropMult);
        for (var propId in potentialTrain) {
            propId = parseInt(propId);
            var value = trainPropMultArr[propId - 1] * potentialTrain[propId];
            logger.heroHelper.debug("培养属性【%s】加成：%s", trainProp[propId], value);
            switch (propId) {
                case trainPropKey.pAttack:
                    props.pAttack = (props.pAttack || 0) + value;
                    break;
                case trainPropKey.pDefence:
                    props.pDefence = (props.pDefence || 0) + value;
                    break;
                case trainPropKey.mAttack:
                    props.mAttack = (props.mAttack || 0) + value;
                    break;
                case trainPropKey.mDefence:
                    props.mDefence = (props.mDefence || 0) + value;
                    break;
                case trainPropKey.hp:
                    props.hp = (props.hp || 0) + value;
                    break;
            }
        }
        var trainLvl = hero.trainLvl;
        if (trainLvl) {
            var trainHp = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.trainHp);
            var hp = trainHp[trainLvl - 1] || 0;
            logger.heroHelper.debug("由于培养升阶所带来的HP加成：", hp);
            props.hp = (props.hp || 0) + hp;
        }
        return props;
    }
    uw.calHeroSelfPropsByTrain = calHeroSelfPropsByTrain;
    function handleEquipProps(tempProps, lvl, props, isExclusive, isSkill) {
        if (!tempProps)
            return;
        var rate = 0;
        if (isSkill) {
            rate = lvl - 1;
        }
        else if (isExclusive) {
            rate = mo.getJSONWithFileNameAndID(uw.cfg_c_lvl, lvl)[uw.c_lvl_exclusiveAdd];
            rate = rate / 100;
        }
        else {
            rate = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.equipStrengthen)[0];
        }
        var equipPropKey = uw.c_prop.equipPropKey;
        var equipProp = uw.c_prop.equipProp;
        for (var j = 0, lj = tempProps.length; j < lj; j++) {
            var data = tempProps[j];
            var value;
            if (isSkill) {
                value = data[1] + data[2] * rate;
            }
            else {
                if (data[2]) {
                    value = data[1] + (lvl - 1) * data[2];
                }
                if (isExclusive) {
                    value = Math.round(data[1] * (1 + rate) * 100) / 100;
                }
                else {
                    value = Math.round(data[1] * (1 + lvl * rate) * 100) / 100;
                } //乘以等级系数， 保留小数点后两位
            }
            var switchKey = parseInt(data[0]);
            logger.heroHelper.debug("【%s】属性加成：%s", equipProp[switchKey], value);
            switch (switchKey) {
                case equipPropKey.life:
                    props.life = (props.life || 0) + value;
                    props.hp = (props.hp || 0) + uw.calHp(value);
                    break;
                case equipPropKey.power:
                    props.power = (props.power || 0) + value;
                    props.pAttack = (props.pAttack || 0) + uw.calPAttack(value);
                    props.pDefence = (props.pDefence || 0) + uw.calPDefence(value);
                    break;
                case equipPropKey.intel:
                    props.intel = (props.intel || 0) + value;
                    props.mAttack = (props.mAttack || 0) + uw.calMAttack(value);
                    props.mDefence = (props.mDefence || 0) + uw.calMDefence(value);
                    break;
                case equipPropKey.pAttack:
                    props.pAttack = (props.pAttack || 0) + value;
                    break;
                case equipPropKey.pDefence:
                    props.pDefence = (props.pDefence || 0) + value;
                    break;
                case equipPropKey.mAttack:
                    props.mAttack = (props.mAttack || 0) + value;
                    break;
                case equipPropKey.mDefence:
                    props.mDefence = (props.mDefence || 0) + value;
                    break;
                case equipPropKey.hp:
                    props.hp = (props.hp || 0) + value;
                    break;
                case equipPropKey.hpRecovery:
                    props.hpRecovery = (props.hpRecovery || 0) + value;
                    break;
                case equipPropKey.crit:
                    props.crit = (props.crit || 0) + value;
                    break;
                case equipPropKey.reCrit:
                    props.reCrit = (props.reCrit || 0) + value;
                    break;
                case equipPropKey.hit:
                    props.hit = (props.hit || 0) + value;
                    break;
                case equipPropKey.reHit:
                    props.reHit = (props.reHit || 0) + value;
                    break;
                case equipPropKey.pAttackMult:
                    props.pAttackMult = (props.pAttackMult || 0) + value;
                    break;
                case equipPropKey.pDefenceMult:
                    props.pDefenceMult = (props.pDefenceMult || 0) + value;
                    break;
                case equipPropKey.mAttackMult:
                    props.mAttackMult = (props.mAttackMult || 0) + value;
                    break;
                case equipPropKey.mDefenceMult:
                    props.mDefenceMult = (props.mDefenceMult || 0) + value;
                    break;
                case equipPropKey.suckBlood:
                    props.suckBlood = (props.suckBlood || 0) + value;
                    break;
                case equipPropKey.ignoreDefence:
                    props.ignoreDefence = (props.ignoreDefence || 0) + value;
                    break;
                case equipPropKey.skillLvl:
                    props.skillLvl = (props.skillLvl || 0) + value;
                    break;
                case equipPropKey.energy:
                    props.energy = (props.energy || 0) + value;
                    break;
                case equipPropKey.energyRecovery:
                    props.energyRecovery = (props.energyRecovery || 0) + value;
                    break;
            }
        }
    }
    uw.handleEquipProps = handleEquipProps;
    function getExclusiveValue(arr, lvl) {
        for (var i = arr.length - 1; i >= 0; --i) {
            if (lvl >= arr[i][0])
                return arr[i][1];
        }
        return 0;
    }
    uw.getExclusiveValue = getExclusiveValue;
    function calEquipProps(tempId, equipLvl, props) {
        props = props || {};
        var equipTempData = uw.getEquipTempData(tempId);
        var tempProps = equipTempData.props;
        logger.heroHelper.debug("装备--->", equipTempData);
        var isExclusive = equipTempData.part == uw.c_prop.equipPartKey.exclusive;
        handleEquipProps(tempProps, equipLvl, props, isExclusive, false);
        if (isExclusive) {
            var exclusiveTemp = uw.getEquipExclusiveTempData(tempId);
            var pAttackMult = getExclusiveValue(exclusiveTemp.pAttackMult, equipLvl);
            var pDefenceMult = getExclusiveValue(exclusiveTemp.pDefenceMult, equipLvl);
            var mAttackMult = getExclusiveValue(exclusiveTemp.mAttackMult, equipLvl);
            var mDefenceMult = getExclusiveValue(exclusiveTemp.mDefenceMult, equipLvl);
            logger.heroHelper.debug("计算专属加成：", pAttackMult, pDefenceMult, mAttackMult, mDefenceMult);
            props.pAttackMult = (props.pAttackMult || 0) + pAttackMult;
            props.pDefenceMult = (props.pDefenceMult || 0) + pDefenceMult;
            props.mAttackMult = (props.mAttackMult || 0) + mAttackMult;
            props.mDefenceMult = (props.mDefenceMult || 0) + mDefenceMult;
        }
        return props;
    }
    uw.calEquipProps = calEquipProps;
    function calHeroPropsByEquips(equips, props) {
        if (!equips)
            return;
        logger.heroHelper.debug("-------装备属性影响计算 开始------------------");
        for (var i = 0, li = equips.length; i < li; ++i) {
            var equip = equips[i];
            calEquipProps(equip.tempId, equip.lvl, props);
        }
        logger.heroHelper.debug("-------装备属性影响计算 结束------------------");
        return props;
    }
    uw.calHeroPropsByEquips = calHeroPropsByEquips;
    function calHeroPropsBySkills(skillInfo, props) {
        logger.heroHelper.debug("-------技能属性影响计算 开始------------------");
        for (var skillId in skillInfo) {
            logger.heroHelper.debug("技能【%s】", skillId);
            var skillLvl = skillInfo[skillId] + props.skillLvl;
            var skillTemp = uw.getSkillTempData(skillId);
            var tempProps = skillTemp.props;
            handleEquipProps(tempProps, skillLvl, props, false, true);
        }
        logger.heroHelper.debug("-------技能属性影响计算 结束------------------");
        return props;
    }
    uw.calHeroPropsBySkills = calHeroPropsBySkills;
    /**
     *
     * @param {{lvl:Number,tempId:Number,skills:Array,mixSkill:Number,trainLvl:Number,potentialTrain:Object}} hero
     * @param {Array} equips equip--->{lvl:Number,tempId:Number,props:Array,part:Number}
     * @param {Boolean} isSkillIncluded 是否需要计算技能相关的属性影响
     * @returns {{}}
     */
    function calHeroProps(hero, equips, isSkillIncluded) {
        var props = {};
        var heroTemp = uw.getHeroTempData(hero.tempId);
        //1.计算英雄等级所带来的属性影响
        calHeroSelfProps(hero, heroTemp, props);
        //2.计算培养所带来的属性影响
        calHeroSelfPropsByTrain(hero, heroTemp, props);
        //3.计算装备所带来的属性影响,必须放在技能影响之前，因为装备会影响技能的等级
        calHeroPropsByEquips(equips, props);
        //4.计算技能所带来的属性影响
        if (isSkillIncluded) {
            var skillInfo = {};
            var warriorTemp = uw.getWarriorTempData(heroTemp.tid);
            var skillIds = warriorTemp.skills || [];
            var mixSkillId = warriorTemp.mixSkill;
            var skillLvls = hero.skillLvls || hero.get(uw.dsConsts.HeroEntity.skills);
            var mixSkillLvl = hero.mixSkillLvl || hero.get(uw.dsConsts.HeroEntity.mixSkill);
            for (var i = 0, li = skillIds.length; i < li; ++i) {
                var skillId = skillIds[i];
                if (skillId && skillLvls[i])
                    skillInfo[skillId] = skillLvls[i];
            }
            if (mixSkillId && mixSkillLvl)
                skillInfo[mixSkillId] = mixSkillLvl;
            calHeroPropsBySkills(skillInfo, props);
        }
        return props;
    }
    uw.calHeroProps = calHeroProps;
    /**
     * 计算出英雄的战斗力(测试用)
     * @param {uw.HeroDsToCalProps} hero
     * @param {Array} equips equip--->{lvl:Number,tempId:Number,props:Array,part:Number}
     * @returns Number
     */
    function calHeroCombatEff(hero, equips) {
        var props = calHeroProps(hero, equips, false);
        var formula = uw;
        var skillLvls = hero.skills || []; //普通技能等级
        return formula.calCombatEff(props.pAttack, props.pDefence, props.mAttack, props.mDefence, props.hp, props.hpRecovery, props.crit, props.reCrit, props.hit, props.reHit, props.pAttackMult, props.pDefenceMult, props.mAttackMult, props.mDefenceMult, props.suckBlood, props.ignoreDefence, ((hero.mixSkill || 0) + props.skillLvl), ((skillLvls[0] || 0) + props.skillLvl), ((skillLvls[1] || 0) + props.skillLvl), ((skillLvls[2] || 0) + props.skillLvl));
    }
    uw.calHeroCombatEff = calHeroCombatEff;
    function test_calHeroProps(isSkillIncluded) {
        var opt = mo.project.option;
        var props = calHeroProps(opt.hero, opt.hero.equips, isSkillIncluded);
        var arr1 = [uw.c_prop.heroProp1Key, uw.c_prop.heroProp2Key, uw.c_prop.heroProp3Key];
        var arr2 = [uw.c_prop.heroProp1, uw.c_prop.heroProp2, uw.c_prop.heroProp3];
        logger.heroHelper.debug("================英雄属性计算结果：==============");
        for (var pKey in props) {
            var pName = pKey;
            for (var i = 0; i < arr1.length; ++i) {
                var keyMap = arr1[i];
                var nameMap = arr2[i];
                if (keyMap[pKey]) {
                    pName = nameMap[keyMap[pKey]];
                    break;
                }
            }
            logger.heroHelper.debug(pName, "：", props[pKey]);
        }
    }
    uw.test_calHeroProps = test_calHeroProps;
})(uw || (uw = {}));

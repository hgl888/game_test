var uw;
(function (uw) {
    function getWarriorTempData(tempId) {
        var data = new uw.WarriorTempData();
        var t_warrior = mo.getJSONWithFileName(uw.cfg_t_warrior);
        var temp = t_warrior[tempId];
        if (!temp)
            return null;
        data.id = temp[uw.t_warrior_id];
        data.name = temp[uw.t_warrior_name];
        data.text = temp[uw.t_warrior_text];
        data.posOrder = temp[uw.t_warrior_posOrder];
        data.defaultSkills = temp[uw.t_warrior_defaultSkills];
        data.autoSkills = temp[uw.t_warrior_autoSkills];
        data.desc = temp[uw.t_warrior_desc];
        data.deathAudioId = temp[uw.t_warrior_deathAudioId];
        data.hasMatrixAudio = temp[uw.t_warrior_hasMatrixAudio];
        data.hasWalkAudio = temp[uw.t_warrior_hasWalkAudio];
        data.word = temp[uw.t_warrior_word];
        data.key = temp[uw.t_warrior_key];
        data.exclusiveId = temp[uw.t_warrior_exclusiveId];
        data.normalSkill = temp[uw.t_warrior_normalSkill];
        data.skills = temp[uw.t_warrior_skills];
        data.mixSkill = temp[uw.t_warrior_mixSkill];
        data.fragmentId = temp[uw.t_warrior_fragmentId];
        return data;
    }
    uw.getWarriorTempData = getWarriorTempData;
    function getHeroTempData(tempId) {
        var data = new uw.HeroTempData();
        var t_hero = mo.getJSONWithFileName(uw.cfg_t_hero);
        var temp = t_hero[tempId];
        if (!temp)
            return null;
        data.id = temp[uw.t_hero_id];
        data.tid = temp[uw.t_hero_tid];
        data.quality = temp[uw.t_hero_quality];
        data.power = temp[uw.t_hero_power];
        data.intel = temp[uw.t_hero_intel];
        data.life = temp[uw.t_hero_life];
        data.lvlPower = temp[uw.t_hero_lvlPower];
        data.lvlIntel = temp[uw.t_hero_lvlIntel];
        data.lvlLife = temp[uw.t_hero_lvlLife];
        data.hp = temp[uw.t_hero_hp];
        data.pAttack = temp[uw.t_hero_pAttack];
        data.pDefence = temp[uw.t_hero_pDefence];
        data.mAttack = temp[uw.t_hero_mAttack];
        data.mDefence = temp[uw.t_hero_mDefence];
        data.hpRecovery = temp[uw.t_hero_hpRecovery];
        data.hp = temp[uw.t_hero_hp];
        data.energy = temp[uw.t_hero_energy];
        data.crit = temp[uw.t_hero_crit];
        data.reCrit = temp[uw.t_hero_reCrit];
        data.hit = temp[uw.t_hero_hit];
        data.reHit = temp[uw.t_hero_reHit];
        data.pAttackMult = temp[uw.t_hero_pAttackMult];
        data.pDefenceMult = temp[uw.t_hero_pDefenceMult];
        data.mAttackMult = temp[uw.t_hero_mAttackMult];
        data.mDefenceMult = temp[uw.t_hero_mDefenceMult];
        data.energy = temp[uw.t_hero_energy];
        data.energyRecovery = temp[uw.t_hero_energyRecovery];
        return data;
    }
    uw.getHeroTempData = getHeroTempData;
    function getSkillTempData(tempId) {
        var data = new uw.SkillTempData();
        var t_skill = mo.getJSONWithFileName(uw.cfg_t_skill);
        var temp = t_skill[tempId];
        if (!temp)
            return null;
        data.id = temp[uw.t_skill_id];
        data.name = temp[uw.t_skill_name];
        data.skillType = temp[uw.t_skill_skillType];
        data.percentValue = temp[uw.t_skill_percentValue];
        data.addValue = temp[uw.t_skill_addValue];
        data.cd = temp[uw.t_skill_cd];
        data.targetType = temp[uw.t_skill_targetType];
        data.targets = temp[uw.t_skill_targets];
        data.propHurtType = temp[uw.t_skill_propHurtType];
        data.propHurtMult = temp[uw.t_skill_propHurtMult];
        data.buffNeedLvl = temp[uw.t_skill_buffNeedLvl];
        data.buffTrigger = temp[uw.t_skill_buffTrigger];
        data.energyNeed = temp[uw.t_skill_energyNeed];
        data.energyReply = temp[uw.t_skill_energyReply];
        data.showId = temp[uw.t_skill_showId];
        data.passiveType = temp[uw.t_skill_passiveType];
        data.noMiss = temp[uw.t_skill_noMiss];
        data.props = temp[uw.t_skill_props];
        data.text = temp[uw.t_skill_text];
        return data;
    }
    uw.getSkillTempData = getSkillTempData;
    function getEquipTempData(tempId) {
        var data = new uw.EquipTempData();
        var t_itemEquip = mo.getJSONWithFileName(uw.cfg_t_itemEquip);
        var temp = t_itemEquip[tempId];
        if (!temp)
            return null;
        data.id = temp[uw.t_itemEquip_id];
        data.part = temp[uw.t_itemEquip_part];
        data.needLvl = temp[uw.t_itemEquip_needLvl];
        data.heroTid = temp[uw.t_itemEquip_heroTid];
        data.props = temp[uw.t_itemEquip_props];
        data.stuffs = temp[uw.t_itemEquip_stuffs];
        return data;
    }
    uw.getEquipTempData = getEquipTempData;
    function getEquipExclusiveTempData(tempId) {
        var data = new uw.EquipTempData();
        var t_temp = mo.getJSONWithFileName(uw.cfg_t_itemEquipExclusive);
        var temp = t_temp[tempId];
        if (!temp)
            return null;
        data.id = temp[uw.t_itemEquipExclusive_id];
        data.pAttackMult = temp[uw.t_itemEquipExclusive_pAttackMult];
        data.pDefenceMult = temp[uw.t_itemEquipExclusive_pDefenceMult];
        data.mAttackMult = temp[uw.t_itemEquipExclusive_mAttackMult];
        data.mDefenceMult = temp[uw.t_itemEquipExclusive_mDefenceMult];
        return data;
    }
    uw.getEquipExclusiveTempData = getEquipExclusiveTempData;
})(uw || (uw = {}));

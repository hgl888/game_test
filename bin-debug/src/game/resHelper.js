var res;
(function (res) {
    res.resolutionDir = "";
})(res || (res = {}));
var resHelper;
(function (resHelper) {
    /**
     * 动态资源模块映射
     */
    resHelper.dynamic = {
        role: "role",
        hero: "role",
        monster: "role",
        effect: "effect",
        ui: "ui",
        fight: "fight",
        map: "map",
        skill: "skill",
        task: "task",
        item: "item",
        vip: "vip",
        death: "death",
        buff: "buff",
        event: "event"
    };
    /**
     * 获取资源名称
     * @param pre
     * @param resId
     * @returns {string}
     */
    function getResName(pre, resId, post) {
        resId = resId + "";
        var str = "00000";
        return pre + "_" + str.substring(0, str.length - resId.length) + resId + (post == null ? "" : "_" + post);
    }
    resHelper.getResName = getResName;
    /**
     * 获取动态资源路径
     * @param pre
     * @param resId
     * @param {String|Null} extname
     * @returns {string}
     */
    function getDynamicResPath(pre, resId, extname, post) {
        extname = extname || ".png";
        extname = extname.substring(0, 1) == "." ? extname : "." + extname;
        return path.join(res.resolutionDir, "dynamic/" + resHelper.getResName(pre, resId, post) + extname);
    }
    resHelper.getDynamicResPath = getDynamicResPath;
    /**
     * 获取动态cca路径配置
     * @param pre
     * @param resId
     * @returns {{png: string, plist: string, exportJson: string}}
     */
    function getCcaRes(pre, resId) {
        return {
            png: resHelper.getDynamicResPath(pre, resId, "png", "texture"),
            plist: resHelper.getDynamicResPath(pre, resId, "json", "texture"),
            exportJson: resHelper.getDynamicResPath(pre, resId, "json", "ske")
        };
    }
    resHelper.getCcaRes = getCcaRes;
    /**
     * 根据cca名称获取到cca的路径配置。
     * @param name
     * @returns {{png: string, plist: string, exportJson: string}}
     */
    function getCcaResByName(name) {
        return {
            png: path.join(res.resolutionDir, "dynamic/" + name + "_texture.png"),
            plist: path.join(res.resolutionDir, "dynamic/" + name + "_texture.json"),
            exportJson: path.join(res.resolutionDir, "dynamic/" + name + "_ske.json")
        };
    }
    resHelper.getCcaResByName = getCcaResByName;
    /**
     * 获取buff的cca名称
     * @param resId
     * @returns {string}
     */
    function getBuffCcaName(resId) {
        return resHelper.getResName(resHelper.dynamic.buff, resId);
    }
    resHelper.getBuffCcaName = getBuffCcaName;
    /**
     * 获取buff的cca的路径配置
     * @param resId
     * @returns {{png: string, plist: string, exportJson: string}}
     */
    function getBuffCcaRes(resId) {
        return resHelper.getCcaRes(resHelper.dynamic.buff, resId);
    }
    resHelper.getBuffCcaRes = getBuffCcaRes;
    /**
     * 获取技能特效的cca名称
     * @param resId
     * @returns {string}
     */
    function getSkillEffectCcaName(resId) {
        return resHelper.getResName(resHelper.dynamic.effect, resId);
    }
    resHelper.getSkillEffectCcaName = getSkillEffectCcaName;
    /**
     * 获取受击特效的cca的路径配置
     * @param resId
     * @returns {{png: string, plist: string, exportJson: string}}
     */
    function getSkillEffectCcaRes(resId) {
        return resHelper.getCcaRes(resHelper.dynamic.effect, resId);
    }
    resHelper.getSkillEffectCcaRes = getSkillEffectCcaRes;
    /**
     * 获取角色（英雄和怪物）的icon
     * @param resId
     * @returns {string}
     */
    function getRoleIconPath(resId) {
        return path.join(res.resolutionDir, "dynamic/" + resHelper.getResName(resHelper.dynamic.role, resId) + "_ico.png");
    }
    resHelper.getRoleIconPath = getRoleIconPath;
    /**
     * 获取角色（英雄和怪物）半身像路径
     * @param resId
     * @returns {string}
     */
    function getRoleBodyPath(resId) {
        return path.join(res.resolutionDir, "dynamic/" + resHelper.getResName(resHelper.dynamic.role, resId) + "_body.png");
    }
    resHelper.getRoleBodyPath = getRoleBodyPath;
    /**
     * 获取物品icon。注意，英雄碎片，获取到的为对应的英雄的头像icon。
     * @param itemId
     * @returns {string}
     */
    function getItemIconPath(itemId) {
        var tid = uw.getFragIdToHeroTidMap()[itemId];
        if (tid) {
            return resHelper.getRoleIconPath(tid);
        }
        var resId = mo.getJSONWithFileNameAndID(uw.cfg_t_item, itemId)[uw.t_item_icon];
        return resHelper.getDynamicResPath(resHelper.dynamic.item, resId, "png");
    }
    resHelper.getItemIconPath = getItemIconPath;
    /**
     * 获取ui图标资源
     * @param tempId
     * @returns {*}
     */
    function getUIIconPath(tempId) {
        var icon;
        var spItemIdKey = uw.c_prop.spItemIdKey;
        var specialItemIcon = res.SpecialItemIcon;
        switch (tempId) {
            case spItemIdKey.strength:
                icon = specialItemIcon.strength;
                break;
            case spItemIdKey.gold:
                icon = specialItemIcon.gold;
                break;
            case spItemIdKey.diamond:
                icon = specialItemIcon.diamond;
                break;
            case spItemIdKey.userExpc:
                icon = specialItemIcon.userExpc;
                break;
            case spItemIdKey.honor:
                icon = specialItemIcon.honor;
                break;
            case spItemIdKey.towerPoints:
                icon = specialItemIcon.towerPoints;
                break;
            case spItemIdKey.sweepingTickets:
                icon = specialItemIcon.sweepingTickets;
                break;
            case spItemIdKey.towerInvite:
                icon = specialItemIcon.towerInvite;
                break;
        }
        return icon;
    }
    resHelper.getUIIconPath = getUIIconPath;
    /**
     * 获取战斗场景背景资源路径
     * @param resId
     * @returns {string}
     */
    function getFightBgPath(resId) {
        resId = resId + "";
        if (resId.substring(0, 1) == "-")
            resId = resId.substring(1);
        return resHelper.getDynamicResPath(resHelper.dynamic.fight, resId, "jpg");
    }
    resHelper.getFightBgPath = getFightBgPath;
    /**
     * 获取副本地图的json文件的路径
     * @param resId
     * @returns {string}
     */
    function getMapJsonPath(resId) {
        return resHelper.getDynamicResPath(resHelper.dynamic.map, resId, "json");
    }
    resHelper.getMapJsonPath = getMapJsonPath;
    /**
     * 获取技能图标的资源路径
     * @param resId
     * @returns {string}
     */
    function getSkillIconPath(resId) {
        return resHelper.getDynamicResPath(resHelper.dynamic.skill, resId, "png");
    }
    resHelper.getSkillIconPath = getSkillIconPath;
    /**
     * 获取任务图标的资源路径
     * @param taskId
     * @returns {string}
     */
    function getTaskIconPath(taskId) {
        var taskTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_task, taskId);
        var iconType = taskTemp[uw.t_task_iconType];
        var icon = taskTemp[uw.t_task_icon];
        if (iconType == uw.c_prop.taskIconTypeKey.hero)
            return resHelper.getRoleIconPath(icon);
        else if (iconType == uw.c_prop.taskIconTypeKey.vip)
            return resHelper.getVipIconPath(icon);
        else if (iconType == uw.c_prop.taskIconTypeKey.item)
            return resHelper.getItemIconPath(icon);
        return resHelper.getDynamicResPath(resHelper.dynamic.task, icon, "png");
    }
    resHelper.getTaskIconPath = getTaskIconPath;
    /**
     * 获取VIP图标的资源路径
     * @param rechargeId
     * @returns {string}
     */
    function getVipIconPath(rechargeId) {
        return resHelper.getDynamicResPath(resHelper.dynamic.vip, rechargeId, "png");
    }
    resHelper.getVipIconPath = getVipIconPath;
    /**
     * 获取ui的音效路径。
     * @param {String|Number} resId
     * @returns {String}
     */
    function getUIAudioPath(resId) {
        return path.join("audio/" + resHelper.getResName(resHelper.dynamic.ui, resId) + ".mp3");
    }
    resHelper.getUIAudioPath = getUIAudioPath;
    /**
     * 技能释放音效路径。
     * @param {String|Number} resId
     * @returns {String}
     */
    function getSkillAudioPath(resId) {
        var skillTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_skill, resId);
        var showId = skillTemp[uw.t_skill_showId];
        var skillDisplayTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_skillDisplay, showId);
        var audioId = skillDisplayTemp[uw.t_skillDisplay_audioId];
        if (audioId == 0)
            return null; //这个表示没有音效
        if (audioId == null)
            audioId = showId; //这时候用自身id
        return path.join("audio/" + resHelper.getResName(resHelper.dynamic.skill, audioId) + ".mp3");
    }
    resHelper.getSkillAudioPath = getSkillAudioPath;
    /**
     * 技能命中音效路径。
     * @param {String|Number} resId 技能id
     * @returns {String}
     */
    function getSkillHitAudioPath(resId) {
        var skillTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_skill, resId);
        var hasHitAudio = ""; //TODO skillTemp[uw.t_skill_hasHitAudio];
        if (!hasHitAudio)
            return null; //没有受击音效
        var showId = skillTemp[uw.t_skill_showId];
        var skillDisplayTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_skillDisplay, showId);
        var audioId = skillDisplayTemp[uw.t_skillDisplay_audioId];
        if (audioId == 0)
            return null; //这个表示没有音效
        if (audioId == null)
            audioId = showId; //这时候用自身id
        return path.join("audio/" + resHelper.getResName(resHelper.dynamic.skill, audioId) + "_1.mp3");
    }
    resHelper.getSkillHitAudioPath = getSkillHitAudioPath;
    /**
     * 角色死亡音效路径。可能没有，没有就返回null。
     * @param {String|Number} resId 角色模板id
     * @returns {String}
     */
    function getDeathAudioPath(resId) {
        var warriorTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, resId);
        var deathResId = warriorTemp[uw.t_warrior_deathAudioId];
        if (!deathResId)
            return null;
        return path.join("audio/" + resHelper.getResName(resHelper.dynamic.death, deathResId) + ".mp3");
    }
    resHelper.getDeathAudioPath = getDeathAudioPath;
    /**
     * 角色上阵台词音效路径。
     * @param {String|Number} resId 角色模板id
     * @returns {String}
     */
    function getRoleMatrixWordAudioPath(resId) {
        var warriorTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, resId);
        if (warriorTemp[uw.t_warrior_hasMatrixAudio]) {
            return path.join("audio/" + resHelper.getResName(resHelper.dynamic.role, resId) + ".mp3");
        }
        return null;
    }
    resHelper.getRoleMatrixWordAudioPath = getRoleMatrixWordAudioPath;
    /**
     * 角色行走台词音效路径。
     * @param {String|Number} resId 角色模板id
     * @returns {String}
     */
    function getWalkWordAudioPath(resId) {
        var warriorTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, resId);
        if (warriorTemp[uw.t_warrior_hasWalkAudio]) {
            return path.join("audio/" + resHelper.getResName(resHelper.dynamic.role, resId) + "_1.mp3");
        }
        return null;
    }
    resHelper.getWalkWordAudioPath = getWalkWordAudioPath;
    function getEventIconPath(iconId) {
        return resHelper.getDynamicResPath(resHelper.dynamic.event, iconId, "png");
    }
    resHelper.getEventIconPath = getEventIconPath;
    function getArmPath(pre, resId) {
        return path.join(res.resolutionDir, "dynamic/" + resHelper.getResName(pre, resId) + ".arm");
    }
    resHelper.getArmPath = getArmPath;
})(resHelper || (resHelper = {}));

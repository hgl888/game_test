/**
 * Created by Administrator on 14-7-24.
 */
var uw;
(function (uw) {
    var __ImportFightConsts = (function () {
        function __ImportFightConsts() {
        }
        var __egretProto__ = __ImportFightConsts.prototype;
        return __ImportFightConsts;
    })();
    uw.__ImportFightConsts = __ImportFightConsts;
    __ImportFightConsts.prototype.__class__ = "uw.___ImportFightConsts";
    ;
    /**
     * 成员类型
     * @type {{HERO: number, MONSTER: number}}
     */
    uw.memberType = {
        HERO: 0,
        MONSTER: 1 //怪物
    };
    /**
     * 状态
     * @type {{NORMAL: number, MOVE: number, SKILL: number, DEATH: number}}
     */
    uw.memberStatus = {
        NORMAL: 0,
        RUN: 1,
        SKILL: 2,
        DEATH: 3 //死亡
    };
    //技能目标类型
    uw.skillTargetType = {
        SELF: 1,
        ENEMY: 2 //敌方
    };
    //技能伤害类型
    uw.skillType = {
        PATTACK: 1,
        MATTACK: 2,
        HOLY: 3,
        REPLAY: 4 //治疗
    };
    //技能特效类别
    uw.skillEffectType = {
        FIX: 1,
        FLY: 2,
        FLY_X: 3,
        LINE: 4,
        MOVE: 5,
        SCALE_X_TARGET: 6,
        PARABOLA: 7 //抛物线
    };
    //特效位置添加相对类型
    uw.skillEffectAddRelative = {
        SELF: 0,
        TARGET: 1 //对方
    };
    //特效位置类型
    uw.skillEffecTargetType = {
        TARGET: 0,
        FRONT_TARGET: 1,
        SELF: 2 //朝自己自己
    };
    //暂停动作类型
    uw.pauseActionType = {
        ALL: 0,
        MIX_SKILL: 1,
        NOT_MIX_SKILL: 2 //没有大招中
    };
    //目标对象类型
    uw.targetObjectType = {
        SINGLE: 1,
        RANDOM_1: 2,
        RANDOM_2: 3,
        RANDOM_3: 4,
        RANDOM_HIT: 5,
        MIN_HP: 6,
        ALL: 7,
        SELF: 8,
        AREA_CIRCLE: 9,
        AREA_POLYGON: 10,
        FASTEST: 11,
        MIN_PER_HP: 12,
        MIN_LIFE: 13,
        MIN_POWER: 14,
        MIN_INTEL: 15,
        MAX_LIFE: 16,
        MAX_POWER: 17,
        MAX_INTEL: 18,
        FRONT_POS: 19,
        BACK_POS: 20 //最后排
    };
    //范围目标类型
    uw.targetAreaType = {
        SELF: 0,
        ENEMY: 1 //敌人
    };
    //buff 持续类型
    uw.buffContinueType = {
        INTERVAL: 0,
        NUM: 1,
        TIME: 2,
        HALO: 3 //永久
    };
    //buff 状态类型
    uw.buffStateType = {
        DEL_HP: 1,
        DEL_ENERGY: 2,
        CLEAR_NEGATIVE: 3,
        CLEAR_POSITIVE: 4,
        ADD_HP: 5,
        ADD_ENERGY: 6,
        ADD_ATTR: 7,
        REDUCE_ATTR: 8,
        ABS_P_HURT: 9,
        ABS_M_HURT: 10,
        REBOUND_HURT: 11,
        STUN: 12,
        SEAL: 13,
        HIT_BACK: 14,
        RE_P_ATTACK: 15,
        RE_M_ATTACK: 16,
        RE_P_ATTACK_HURT: 17,
        RE_M_ATTACK_HURT: 18,
        IGNORE_DEFENCE: 19,
        REVIVAL: 20,
        CONFUSION: 21,
        BLIND: 22,
        ABS_RELEASE: 23,
        INVINCIBILITY: 24,
        RANDOM_HURT: 25,
        CROW: 26,
        CALL: 27,
        ICE_WALL: 28,
        FIRE_LAND: 29,
        FREEZE: 30,
        ADD_ATTACK_SPEED: 31,
        DEL_ATTACK_SPEED: 32,
        ADD_MOVE_SPEED: 33,
        DEL_MOVE_SPEED: 34,
        CLONE_1: 35,
        CLONE_2: 36,
        CLONE_3: 37,
        TELEPORT: 38,
        LIMIT_MOVE: 39,
        SHARE_HP: 40,
        STONE: 41,
        UP_DOWN: 42,
        RE_STUN: 43,
        SKILL_ONE: 44,
        RATE_REVIVAL: 45,
        CLONE_1_RE_P_ATTACK: 46,
        ATTACK_REBOUND_HURT: 47,
        SLEEP: 48,
        SPACE: 49,
        PULL: 50,
        RE_P_ATTACK_HURT_M_ATTACK_HURT: 51,
        ADD_HP_BY_LIFE: 52,
        M_EXTRA_DAMAGE: 53,
        INVINCIBLE: 54,
        CHANGE_BODY: 55,
        ADD_BUFF: 56,
        MOVE_CIRCLE_OUT: 57 //围绕中心点往外扩散
    };
    //buff 数值类型
    uw.buffValueType = {
        PER: 0,
        FIX: 1 //固定数值
    };
    //buff正负面
    uw.buffSide = {
        NONE: 0,
        POSITIVE: 1,
        NEGATIVE: 2 //负
    };
    //技能类别
    uw.skillDisplayType = {
        NORMAL: 1,
        SKILL: 2,
        MIX: 3,
        SECRET: 4 //领主
    };
    //技能被动类型
    uw.skillPassiveType = {
        NONE: 0,
        CRIT: 1,
        MISS: 2,
        RE_HP: 3,
        FIGHT_BEFORE: 4,
        ATTACK: 5,
        HIT: 6,
        DEATH_ONE: 7,
        EVERY_DEATH: 8,
        DEATH_MORE: 9,
        ALL_IN_AREA: 10 //所有人入场后
    };
    //动作类型
    uw.skillAction = {
        NONE: 0,
        NORMAL_ATTACK: 1,
        UNIQUE_ATTACK: 2,
        SKILL_ATTACK1: 3,
        SKILL_ATTACK2: 4,
        SKILL_ATTACK3: 5
    };
    /**
     * 站位类型，前中后
     * @type {{FRONT: number, MID: number, AFTER: number}}
     */
    uw.posOrderType = {
        FRONT: 0,
        MID: 1,
        AFTER: 2
    };
    /**
     * 动作顺序规则
     */
    uw.actionRule = {
        AUTO: 0,
        INSERT_RE_HP: 1 //血量少于XX插播
    };
    /**
     * 固定技能
     */
    uw.fixSkillId = {
        ID_34000: 34000,
        ID_30200: 30200,
        ID_30800: 30800 //手术空间2
    };
    uw.roleZOrder = {
        SHADOW: 10,
        ARMATURE: 50,
        BUFF: 100,
        BLOOD: 200,
        WORD: 250 //文字
    };
})(uw || (uw = {}));

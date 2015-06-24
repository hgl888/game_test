var uw;
(function (uw) {
    var __Import_keyConsts = (function () {
        function __Import_keyConsts() {
        }
        var __egretProto__ = __Import_keyConsts.prototype;
        return __Import_keyConsts;
    })();
    uw.__Import_keyConsts = __Import_keyConsts;
    __Import_keyConsts.prototype.__class__ = "uw.___Import_keyConsts";
    uw.Keys = {
        curServerId: "curServerId",
        accountName: "AccountName",
        password: "Password",
        logined: "Logined",
        simulateFight: "SimulateFight",
        key_host: "key_host",
        key_port: "key_port",
        msgCode: "m",
        msgArgs: "a",
        msgValue: "v"
    };
    uw.ItemTypeId = {
        All: 0,
        Consumable: 1,
        Material: 2,
        Equipment: 3,
        Gem: 4,
        Res: 5
    };
    uw.ItemLogicType = {
        GetMore: 1,
        GetExp: 2,
        GetRes: 3
    };
    /******************* 副本相关 *******************************/
    uw.SweepMinumStars = 3; // 可以进行扫荡所需最小星级
    uw.CopyMaxStars = 3; // 副本可获得的最大星级
    uw.DropItemMaxium = 6;
    uw.MonsterAppearMaxium = 5; //最多出场怪物的数量
    uw.HERO_TYPE_KEY = {
        front: 1,
        mid: 2,
        back: 3
    };
    uw.PAYMENT_TYPE = {
        VIP: 0,
        CHARGE: 1
    };
    /** 背包物品类型过滤时使用bagTag字段做比较 **/
    uw.BAG_FILTER_KEY = "bagTag";
    uw.BAG_SUB_FILTER_TYPE = {
        EQUIP_PART: 1
    };
    /** 根据所值专属锻造经验做比较 **/
    uw.FORGE_EXP_SORT_KEY = "exclusiveExp";
    /** 参与背包界面的物品排序Key **/
    uw.BAG_SORT_KEY = {
        SORT_TEMP_ID: "tempId",
        SORT_LVL: "lvl",
        SORT_QUALITY: "quality",
        SORT_COUNT: "count"
    };
    /** 参与背包界面的物品排序Key **/
    uw.FRAG_SORT_KEY = {
        SORT_FRAG_ENOUGH: "fragEnough",
        SORT_NEED_LV: "minNeedLv"
    };
    uw.GEM_MIXED_NEED_KEY = {
        GOLD: "gold",
        GEM_ID: "gemId",
        GEM_NUM: "gemNum",
        ITEM_ID: "itemId",
        ITEM_NUM: "itemNum"
    };
    /* 宝石合成升级时需要的宝石数量，已经镶嵌的宝石，升级时需要的数量少1 */
    uw.GEM_IN_BAG_MIX_COUNT = 4;
    uw.GEM_IN_SLOT_MIX_COUNT = uw.GEM_IN_BAG_MIX_COUNT = -1;
    //极限
    uw.LIMIT = {
        heroQuality: 12 //英雄品阶
    };
    //怪物和英雄id区间
    uw.ID_SECTION = {
        HERO: [1000, 9999],
        MONSTER: [40000, 49999],
        BOSS: [50000, 59999] //boss 50000-59999
    };
})(uw || (uw = {}));

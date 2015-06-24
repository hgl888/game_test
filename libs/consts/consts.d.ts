declare module uw {
    /**
     * 物理伤害公式
     * @param a 物攻
     * @param b 物攻系数
     * @param c 物防
     * @param d 物防系数
     * @param e 技能百分比
     * @param f 暴击
     * @param h 技能额外伤害
     * @param i 物理免伤
     */
    function calPHurt(a: number, b: number, c: number, d: number, e: number, f: number, h: number, i?: number): number;
    /**
     * 法术伤害公式
     * @param a 魔攻
     * @param b 魔攻系数
     * @param c 魔防
     * @param d 魔防系数
     * @param e 技能百分比
     * @param f 暴击
     * @param h 技能额外伤害
     * @param i 法术免伤
     */
    function calMHurt(a: number, b: number, c: number, d: number, e: number, f: number, h: number, i?: number): number;
    /**
     * 治疗公式
     * @param a 魔攻
     * @param b 魔攻系数
     * @param c 魔防
     * @param d 魔防系数
     * @param e 技能百分比
     * @param f 暴击
     * @param h 技能额外伤害
     * @param i 法术免伤
     */
    function calMCure(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number, h?: number, i?: number): number;
    /**
     * 命中公式,返回0~1
     * @param a 命中
     * @param b 闪避
     */
    function calHitRate(a: number, b: number): number;
    /**
     * 暴击,返回0~1
     * @param a 暴击
     * @param b 抗暴
     * @param  c 初始暴击
     * @param d 初始抗暴
     */
    function calCrit(a: number, b: number, c: number, d: number): number;
    /**
     * 力量特殊额外伤害公式1
     * @param a 力量
     * @param b 力量
     * @param c 系数
     */
    function calSpHurtForPower1(a: number, b: number, c: number): number;
    /**
     * 力量特殊额外伤害公式2
     * @param a 力量
     * @param b 系数
     */
    function calSpHurtForPower2(a: number, b: number): number;
    /**
     * 智力特殊额外伤害公式1
     * @param a 智力
     * @param b 智力
     * @param c 系数
     */
    function calSpHurtForIntel1(a: number, b: number, c: number): number;
    /**
     * 智力特殊额外伤害公式2
     * @param a 智力
     * @param b 系数
     */
    function calSpHurtForIntel2(a: number, b: number): number;
    /**
     * 胜利评星公式
     * @param a 团队剩余血量总和
     * @param b 团队血量总和
     */
    function calStar(a?: number, b?: number): void;
    /**
     * 生命
     * @param life 体质
     */
    function calHp(life?: number): number;
    /**
     * 物攻
     * @param str 力量
     */
    function calPAttack(str?: number): number;
    /**
     * 物防
     * @param str 力量
     */
    function calPDefence(str?: number): number;
    /**
     * 魔攻
     * @param lin 智力
     */
    function calMAttack(lin?: number): number;
    /**
     * 魔防
     * @param lin 智力
     */
    function calMDefence(lin?: number): number;
    /**
     * 购买体力钻石消耗公式
     * @param a 体力购买次数
     */
    function calBuyStrength(a: number): number;
    /**
     * 购买金币钻石消耗公式
     * @param a 金币购买次数
     */
    function calBuyGoldDiamond(a: number): number;
    /**
     * 购买金币获得公式
     * @param a 金币购买次数
     * @param gold 领主等级对应金币
     */
    function calBuyGold(a: number, gold: number): number;
    /**
     * 装备栏强化消耗公式
     * @param a 强化等级
     * @param  x 装备栏对应系数
     */
    function calEquipColLvl(a: number, x: number): number;
    /**
     * 战斗力公式
     * @param a 物攻
     * @param b 物防
     * @param c 魔攻
     * @param d 魔防
     * @param e HP
     * @param f 血量恢复
     * @param g 暴击
     * @param h 暴击抵抗
     * @param i 命中
     * @param j 闪避
     * @param k 物攻天赋
     * @param l 物防天赋
     * @param m 魔攻天赋
     * @param n 魔防天赋
     * @param o 吸血
     * @param p 无视防御
     * @param s1 奥义Lv
     * @param s2 技能1Lv
     * @param s3 技能2Lv
     * @param s4 技能3Lv
     * @param k1 初始物攻天赋
     * @param l1 初始物防天赋
     * @param m1 初始魔攻天赋
     * @param n1 初始魔防天赋
     */
    function calCombatEff(a: number, b: number, c: number, d: number, e: number, f?: number, g?: number, h?: number, i?: number, j?: number, k?: number, l?: number, m?: number, n?: number, o?: number, p?: number, s1?: number, s2?: number, s3?: number, s4?: number, k1?: number, l1?: number, m1?: number, n1?: number): number;
    /**
     * 宝石合成消耗公式
     * @param a 即将合成的宝石等级
     */
    function calGemMerger(a: number): number;
    /**
     * 购买竞技场挑战次数花费
     * @param a 购买次数
     */
    function calBuyArenaNum(a?: number): number;
    /**
     * 专属煅造消耗金币
     * @param a 即将增加的专属经验值
     * @param  b 专属装备品质
     */
    function calExclusiveGold(a: number, b: number): number;
    /**
     * 专属一键煅造消耗钻石
     * @param a 升阶经验扣除当前经验
     * @param  b 专属装备品质
     */
    function calExclusiveDiamond(a: number, b: number): number;
    /**
     * 装备碎片合成花费金币
     * @param a 装备最低穿戴等级
     */
    function calEquipMerger(a: number): number;
    /**
     * 专属升阶经验消耗公式
     * @param lv 即将升到的阶数
     * @param quality 专属原有品质
     */
    function calExclusiveLvExp(lv: number, quality: number): number;
    /**
     * 英雄进阶消耗金币
     * @param quality 即将升到的品质
     */
    function calHeroUpgradeGold(quality: number): number;
    /**
     * 专属装备拥有经验
     * @param lv 专属阶数
     * @param quality 专属原有品质
     * @param exp 当前经验
     */
    function calExclusiveLvItemExp(lv: number, quality: number, exp?: number): number;
    /**
     * 领主升级回复体力
     * @param lv 当前等级
     */
    function calUpStrength(lv: number): number;
    /**
     * 精英副本消耗钻石
     * @param time 次数
     */
    function calCopyDiamond(time: number): number;
    /**
     * 竞技场历史最高排名钻石奖励
     * @param a 历史最高排名
     * @param b 当前排名
     */
    function calHistoryHighest(a?: number, b?: number): number;
    /**
     * 普通商店刷新消耗
     * @param a 购买次数
     */
    function calShopDiamond(a: number): number;
    /**
     * 神秘商店刷新消耗
     * @param a 购买次数
     */
    function calMysteryShopDiamond(a: number): number;
    /**
     * 竞技场商店刷新消耗
     * @param a 购买次数
     */
    function calArenaShopDiamond(a: number): number;
    /**
     * 培养进阶消耗金币
     * @param lv 即将升到的等级
     */
    function calTrainUp(lv: number): number;
    /**
     * 购买金币神秘商店2出现百分率
     * @param time 次数
     */
    function calShopSecret2(time: number): number;
    /**
     * 补签消耗钻石
     * @param time 次数
     */
    function calSignDiamond(time?: number): number;
    /**
     * 虚空塔商店刷新消耗
     * @param a 购买次数
     */
    function calTowerShopDiamond(a: number): number;
}
declare module uw.c_prop {
    var equipPartKey: {
        weapon: number;
        body: number;
        magic: number;
        accessory: number;
        belt: number;
        exclusive: number;
        wish: number;
    };
    var equipPart: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
    };
    var buffStateTypeKey: {
        hurt: number;
        clearNBuff: number;
        clearPBuff: number;
        recoverHp: number;
        inProp: number;
        reProp: number;
        sbsorbHurt: number;
        backHurt: number;
        immune: number;
        stun: number;
        seal: number;
    };
    var buffStateType: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
        "10": string;
        "11": string;
    };
    var buffEffectTypeKey: {
        life: number;
        power: number;
        intel: number;
        pAttack: number;
        pDefence: number;
        mAttack: number;
        mDefence: number;
        hp: number;
        hpRecovery: number;
        crit: number;
        reCrit: number;
        hit: number;
        reHit: number;
        pAttackMult: number;
        pDefenceMult: number;
        mAttackMult: number;
        mDefenceMult: number;
        suckBlood: number;
        ignoreDefence: number;
    };
    var buffEffectType: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
        "10": string;
        "11": string;
        "12": string;
        "13": string;
        "14": string;
        "15": string;
        "16": string;
        "17": string;
        "18": string;
        "19": string;
    };
    var buffEffectPosKey: {
        head: number;
        body: number;
        foot: number;
    };
    var buffEffectPos: {
        "1": string;
        "2": string;
        "3": string;
    };
    var itemTypeKey: {
        consumables: number;
        material: number;
        equip: number;
        gift: number;
        res: number;
        heroExpItem: number;
        heroFragment: number;
        darkStone: number;
        vipExpItem: number;
        exclusiveFragment: number;
    };
    var itemType: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
        "10": string;
    };
    var bagTypeKey: {
        item: number;
        equip: number;
        hero: number;
        material: number;
    };
    var bagType: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
    };
    var heroQualityKey: {
        qualityWhite: number;
        qualityGreen: number;
        qualityBlue: number;
        qualityPurple: number;
        qualityOrange: number;
        qualityRed: number;
    };
    var heroQuality: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
    };
    var heroProp1Key: {
        life: number;
        power: number;
        intel: number;
    };
    var heroProp1: {
        "1": string;
        "2": string;
        "3": string;
    };
    var heroProp2Key: {
        pAttack: number;
        pDefence: number;
        mAttack: number;
        mDefence: number;
        hp: number;
        hpRecovery: number;
        crit: number;
        reCrit: number;
        hit: number;
        reHit: number;
        pAttackMult: number;
        pDefenceMult: number;
        mAttackMult: number;
        mDefenceMult: number;
        suckBlood: number;
        ignoreDefence: number;
        skillLvl: number;
        energy: number;
        energyRecovery: number;
    };
    var heroProp2: {
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
        "10": string;
        "11": string;
        "12": string;
        "13": string;
        "14": string;
        "15": string;
        "16": string;
        "17": string;
        "18": string;
        "19": string;
        "20": string;
        "21": string;
        "22": string;
    };
    var heroProp3Key: {
        lvlLife: number;
        lvlPower: number;
        lvlIntel: number;
    };
    var heroProp3: {
        "1": string;
        "2": string;
        "3": string;
    };
    var trainPropKey: {
        pAttack: number;
        pDefence: number;
        mAttack: number;
        mDefence: number;
        hp: number;
    };
    var trainProp: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
    };
    var receiverKey: {
        onTaskChanged: string;
        onCron: string;
        onSecretShopChanged: string;
    };
    var receiver: {
        r1: string;
        r2: string;
        r3: string;
    };
    var cronReceiverTypeKey: {
        resetDailyTasks: number;
        resetDailyBuyCount: number;
        boss: number;
    };
    var cronReceiverType: {
        "1": string;
        "2": string;
        "3": string;
    };
    var equipPropKey: {
        life: number;
        power: number;
        intel: number;
        pAttack: number;
        pDefence: number;
        mAttack: number;
        mDefence: number;
        hp: number;
        hpRecovery: number;
        crit: number;
        reCrit: number;
        hit: number;
        reHit: number;
        pAttackMult: number;
        pDefenceMult: number;
        mAttackMult: number;
        mDefenceMult: number;
        suckBlood: number;
        ignoreDefence: number;
        skillLvl: number;
        energy: number;
        energyRecovery: number;
    };
    var equipProp: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
        "10": string;
        "11": string;
        "12": string;
        "13": string;
        "14": string;
        "15": string;
        "16": string;
        "17": string;
        "18": string;
        "19": string;
        "20": string;
        "21": string;
        "22": string;
    };
    var pCopyTypeKey: {
        normal: number;
        cream: number;
        trial: number;
        mirror: number;
        tower: number;
        arena: number;
        simulat: number;
    };
    var pCopyType: {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
    };
    var copyTypeKey: {
        normal: number;
        normalBoss: number;
        cream: number;
        creamBoss: number;
        guardTower: number;
        mirror: number;
        trial: number;
        arena: number;
        simulate: number;
    };
    var copyType: {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
    };
    var taskTypeKey: {
        task: number;
        daily: number;
    };
    var taskType: {
        "1": string;
        "2": string;
    };
    var taskSubTypeKey: {
        userLvl: number;
        online: number;
        lotteryCount: number;
        lotteryType: number;
        store: number;
        fight: number;
        passCount: number;
        copyId: number;
        gainHero: number;
        trainHero: number;
        skillUpCount: number;
        skillUpLvl: number;
        equipUpCount: number;
        equipUpLvl: number;
        exclusiveUpCount: number;
        exclusiveUpLvl: number;
        callHero: number;
        upHeroTrainLvl: number;
        buyGold: number;
        equipUpgradeCount: number;
        equipUpgradeLvl: number;
        normalEquipCount: number;
        exchangeCount: number;
        trainGoalStats: number;
        trainSpecial: number;
    };
    var taskSubType: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
        "10": string;
        "11": string;
        "12": string;
        "13": string;
        "14": string;
        "15": string;
        "16": string;
        "22": string;
        "24": string;
        "25": string;
        "26": string;
        "27": string;
        "28": string;
        "29": string;
        "30": string;
        "31": string;
    };
    var taskIconTypeKey: {
        task: number;
        hero: number;
        vip: number;
        item: number;
    };
    var taskIconType: {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
    };
    var taskSysIdKey: {
        normalCopy: number;
        creamCopy: number;
        guardTower: number;
        mirror: number;
        arena: number;
        trail: number;
        hero: number;
        forge: number;
        buyGold: number;
        lottery: number;
        exchange: number;
        reCharge: number;
    };
    var taskSysId: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
        "10": string;
        "11": string;
        "12": string;
    };
    var exchangeTypeKey: {
        daily: number;
        darkStone: number;
        wish: number;
        exclusive: number;
    };
    var exchangeType: {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
    };
    var spItemIdKey: {
        vipExp: number;
        strength: number;
        gold: number;
        diamond: number;
        userExpc: number;
        heroExpc: number;
        honor: number;
        towerPoints: number;
        sweepingTickets: number;
        darkStone: number;
        towerInvite: number;
    };
    var spItemId: {
        "90": string;
        "1801": string;
        "75500": string;
        "75501": string;
        "75502": string;
        "75503": string;
        "75504": string;
        "75505": string;
        "75506": string;
        "75507": string;
        "75514": string;
    };
    var buffShowTypeKey: {
        increase: number;
        reduce: number;
        forbidden: number;
        stun: number;
        magicShield: number;
        physicsShield: number;
        crow: number;
        chaos: number;
        defend: number;
        curse: number;
        poison: number;
        blind: number;
        dkShield: number;
        bounce: number;
        freeze: number;
        stone: number;
        limitMove: number;
        shareHp: number;
        burn: number;
        sleep: number;
        space: number;
        addAttack: number;
        freezeNoIce: number;
        mirror: number;
        wine: number;
        magicShield1: number;
        backShadow: number;
        hellFire: number;
        fear: number;
        magicShield2: number;
        secret1: number;
        secret2: number;
        secret3: number;
        secret4: number;
        secret5: number;
    };
    var buffShowType: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
        "10": string;
        "11": string;
        "12": string;
        "13": string;
        "14": string;
        "15": string;
        "16": string;
        "17": string;
        "18": string;
        "19": string;
        "20": string;
        "21": string;
        "22": string;
        "23": string;
        "24": string;
        "25": string;
        "26": string;
        "27": string;
        "28": string;
        "29": string;
        "30": string;
        "31": string;
        "32": string;
        "33": string;
        "34": string;
        "35": string;
    };
    var shopTypeKey: {
        normal: number;
        secret1: number;
        secret2: number;
        arena: number;
        tower: number;
    };
    var shopType: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
    };
    var shopItemInfoKey: {
        itemId: number;
        itemNum: number;
        unitId: number;
        price: number;
        isSold: number;
    };
    var shopItemInfo: {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
        "4": string;
    };
    var matrixTypeKey: {
        copy: number;
        arenaD: number;
        arenaA: number;
        mirrorD: number;
        mirrorA: number;
        tower: number;
        trial: number;
        mirrorPVPA: number;
        simulate: number;
    };
    var matrixType: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
    };
    var mailTypeKey: {
        backstage: number;
        arenaRank: number;
        arenaLuckRank: number;
        mirrorWin: number;
        mirrorAway: number;
        mirrorSys: number;
        mirrorLose: number;
    };
    var mailType: {
        "0": string;
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
    };
    var countTypeKey: {
        strength: number;
        gold: number;
        copy: number;
    };
    var countType: {
        "0": string;
        "1": string;
        "2": string;
    };
    var pCopyIdKey: {
        normal: number;
        cream: number;
        trial1: number;
        trial2: number;
        trial3: number;
        mirror: number;
        tower: number;
        arena: number;
    };
    var pCopyId: {
        "1": string;
        "101": string;
        "201": string;
        "203": string;
        "205": string;
        "210": string;
        "220": string;
        "230": string;
    };
    var bossTypeKey: {
        normal: number;
        elite: number;
        nelite: number;
        eelite: number;
        tower: number;
        trail: number;
        mirror: number;
        nBoss: number;
        eBoss: number;
        wBoss: number;
        twBoss: number;
        trBoss: number;
    };
    var bossType: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "10": string;
        "11": string;
        "12": string;
        "13": string;
        "14": string;
    };
    var activityTypeKey: {
        firstRecharge: number;
        sevenLogin: number;
        limitBuy: number;
        dayChargeCount: number;
        allChargeCount: number;
        dayCostCount: number;
        allCostCount: number;
        upLvl: number;
        redeemCode: number;
        text: number;
    };
    var activityType: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
        "10": string;
    };
    var activityIconKey: {
        chests: number;
        diamond: number;
        gold: number;
        logic: number;
        change: number;
    };
    var activityIcon: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
    };
    var activityTiIconKey: {
        limitBuy: number;
        reCharge: number;
        cost: number;
        uplvl: number;
        redeemCode: number;
        arena: number;
        suggest: number;
        bug: number;
        bigPrize: number;
    };
    var activityTiIcon: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
        "5": string;
        "6": string;
        "7": string;
        "8": string;
        "9": string;
    };
    var userRecordTypeKey: {
        diamondTodayCost: number;
        diamondCost: number;
        payKey: number;
    };
    var userRecordType: {
        "1": string;
        "2": string;
        "3": string;
    };
}
declare module uw {
    var cfg_c_arenaHighRankAward: string;
    var c_arenaHighRankAward_id: string;
    var c_arenaHighRankAward_rank: string;
    var c_arenaHighRankAward_award: string;
    var cfg_c_exchange: string;
    var c_exchange_id: string;
    var c_exchange_item: string;
    var c_exchange_stuffs: string;
    var c_exchange_lvlRequired: string;
    var c_exchange_type: string;
    var c_exchange_count: string;
    var c_exchange_rate: string;
    var cfg_c_game: string;
    var c_game_id: string;
    var c_game_key: string;
    var c_game_func: string;
    var c_game_memo0: string;
    var c_game_memo1: string;
    var c_game_param0: string;
    var c_game_param1: string;
    var c_game_param2: string;
    var c_game_param3: string;
    var c_game_param4: string;
    var c_game_param5: string;
    var c_game_param6: string;
    var c_game_param7: string;
    var c_game_param8: string;
    var c_game_param9: string;
    var c_game_param10: string;
    var c_game_param11: string;
    var c_game_param12: string;
    var c_game_param13: string;
    var c_game_param14: string;
    var c_game_param15: string;
    var c_game_param16: string;
    var c_game_param17: string;
    var c_game_param18: string;
    var c_game_param19: string;
    var c_game_param20: string;
    var c_game_param21: string;
    var c_game_param22: string;
    var c_game_param23: string;
    var c_game_param24: string;
    var c_game_param25: string;
    var c_game_param26: string;
    var c_game_param27: string;
    var c_game_param28: string;
    var c_game_param29: string;
    var c_game_param30: string;
    var c_game_param31: string;
    var c_game_param32: string;
    var c_game_param33: string;
    var c_game_param34: string;
    var cfg_c_guide2: string;
    var c_guide2_groupId: string;
    var c_guide2_name: string;
    var c_guide2_cmdIndex: string;
    var c_guide2_revertCmd: string;
    var c_guide2_judge: string;
    var c_guide2_nextCmd: string;
    var c_guide2_cmdName: string;
    var c_guide2_type: string;
    var c_guide2_talk: string;
    var c_guide2_npcIndex: string;
    var c_guide2_bubbleText: string;
    var c_guide2_penetrable: string;
    var c_guide2_endType: string;
    var c_guide2_toSave: string;
    var c_guide2_countdown: string;
    var c_guide2_lvl: string;
    var c_guide2_copyId: string;
    var c_guide2_taskId: string;
    var c_guide2_condition: string;
    var c_guide2_layer: string;
    var c_guide2_node: string;
    var c_guide2_rectNode: string;
    var c_guide2_delayTimeToShow: string;
    var c_guide2_beforeShow: string;
    var c_guide2_afterShow: string;
    var c_guide2_beforeNext: string;
    var c_guide2_afterNext: string;
    var c_guide2_waiting: string;
    var c_guide2_actions: string;
    var c_guide2_isHook: string;
    var c_guide2_route: string;
    var c_guide2_option: string;
    var cfg_c_heroCall: string;
    var c_heroCall_id: string;
    var c_heroCall_name: string;
    var c_heroCall_towerLvl: string;
    var cfg_c_lottery: string;
    var c_lottery_id: string;
    var c_lottery_type: string;
    var c_lottery_lvl: string;
    var c_lottery_one: string;
    var c_lottery_range: string;
    var c_lottery_ten: string;
    var c_lottery_count: string;
    var c_lottery_lvPlace: string;
    var c_lottery_extra: string;
    var cfg_c_lvl: string;
    var c_lvl_lvl: string;
    var c_lvl_teamExpcToLvlUp: string;
    var c_lvl_minTeamExpcOfLvl: string;
    var c_lvl_expcToLvlUp: string;
    var c_lvl_minExpcOfLvl: string;
    var c_lvl_buyGold: string;
    var c_lvl_skillLimitLvlList: string;
    var c_lvl_mixSkillLimitLvl: string;
    var c_lvl_skillGoldList: string;
    var c_lvl_mixSkillGold: string;
    var c_lvl_potentialPoints: string;
    var c_lvl_fragment: string;
    var c_lvl_attackTalentRatio: string;
    var c_lvl_defenceTalentRatio: string;
    var c_lvl_exclusiveAdd: string;
    var c_lvl_exclusiveLvl: string;
    var c_lvl_heroLvlToTrain: string;
    var c_lvl_trainDarkStone: string;
    var cfg_c_mail: string;
    var c_mail_type: string;
    var c_mail_fromName: string;
    var c_mail_title: string;
    var c_mail_content: string;
    var c_mail_expireDays: string;
    var c_mail_delHours: string;
    var c_mail_explain: string;
    var cfg_c_mirror: string;
    var c_mirror_heroId: string;
    var c_mirror_monsterIds: string;
    var cfg_c_msgCode: string;
    var c_msgCode_id: string;
    var c_msgCode_code: string;
    var c_msgCode_text: string;
    var c_msgCode_region0: string;
    var c_msgCode_time: string;
    var c_msgCode_onTop: string;
    var c_msgCode_remark: string;
    var c_msgCode_range: string;
    var cfg_c_nameData: string;
    var c_nameData_id: string;
    var c_nameData_title: string;
    var c_nameData_firstName: string;
    var c_nameData_lastName: string;
    var cfg_c_open: string;
    var c_open_id: string;
    var c_open_key: string;
    var c_open_sys: string;
    var c_open_lvlRequired: string;
    var c_open_refreshTime: string;
    var c_open_weekday: string;
    var c_open_duration: string;
    var c_open_nextDesc: string;
    var c_open_countdownDesc: string;
    var c_open_toEndDesc: string;
    var cfg_c_payInfo: string;
    var c_payInfo_1: string;
    var c_payInfo_10001: string;
    var c_payInfo_id: string;
    var c_payInfo_name: string;
    var cfg_c_rankReward: string;
    var c_rankReward_id: string;
    var c_rankReward_arenaRank: string;
    var c_rankReward_arenaReward: string;
    var cfg_c_recharge: string;
    var c_recharge_id: string;
    var c_recharge_name: string;
    var c_recharge_diamond: string;
    var c_recharge_payId: string;
    var c_recharge_cost: string;
    var c_recharge_first: string;
    var c_recharge_extra: string;
    var c_recharge_daily: string;
    var c_recharge_desc: string;
    var c_recharge_icon: string;
    var cfg_c_loadingTips: string;
    var c_loadingTips_id: string;
    var c_loadingTips_text: string;
    var cfg_c_secret: string;
    var c_secret_id: string;
    var c_secret_heroIds: string;
    var c_secret_initLvl: string;
    var c_secret_seq: string;
    var cfg_c_shop: string;
    var c_shop_id: string;
    var c_shop_lvlRequired: string;
    var c_shop_rate: string;
    var c_shop_randomNum: string;
    var c_shop_items: string;
    var cfg_c_sign: string;
    var c_sign_id: string;
    var c_sign_item: string;
    var c_sign_vip: string;
    var c_sign_isEffect: string;
    var cfg_c_simulateFight: string;
    var c_simulateFight_id: string;
    var c_simulateFight_value: string;
    var c_simulateFight_valueType: string;
    var cfg_c_subGuide: string;
    var c_subGuide_groupId: string;
    var c_subGuide_name: string;
    var c_subGuide_cmdIndex: string;
    var c_subGuide_judge: string;
    var c_subGuide_revertCmd: string;
    var c_subGuide_nextCmd: string;
    var c_subGuide_cmdName: string;
    var c_subGuide_type: string;
    var c_subGuide_talk: string;
    var c_subGuide_npcIndex: string;
    var c_subGuide_bubbleText: string;
    var c_subGuide_penetrable: string;
    var c_subGuide_endType: string;
    var c_subGuide_toSave: string;
    var c_subGuide_countdown: string;
    var c_subGuide_lvl: string;
    var c_subGuide_copyId: string;
    var c_subGuide_taskId: string;
    var c_subGuide_condition: string;
    var c_subGuide_layer: string;
    var c_subGuide_node: string;
    var c_subGuide_rectNode: string;
    var c_subGuide_delayTimeToShow: string;
    var c_subGuide_beforeShow: string;
    var c_subGuide_afterShow: string;
    var c_subGuide_beforeNext: string;
    var c_subGuide_afterNext: string;
    var c_subGuide_waiting: string;
    var c_subGuide_actions: string;
    var c_subGuide_isHook: string;
    var c_subGuide_route: string;
    var c_subGuide_option: string;
    var cfg_c_vip: string;
    var c_vip_id: string;
    var c_vip_score: string;
    var c_vip_strengthCount: string;
    var c_vip_goldCount: string;
    var c_vip_isWipeMore: string;
    var c_vip_wipeCount: string;
    var c_vip_arenaCount: string;
    var c_vip_skillPointLimit: string;
    var c_vip_resetCopyCount: string;
    var c_vip_isForge: string;
    var c_vip_isStrengthen: string;
    var c_vip_isBuySkillPoint: string;
    var c_vip_isChapman: string;
    var c_vip_isVipLottery: string;
    var c_vip_resetTowerCount: string;
    var c_vip_isTowerAuto: string;
    var cfg_t_buff: string;
    var t_buff_id: string;
    var t_buff_content: string;
    var t_buff_stateType: string;
    var t_buff_valueType: string;
    var t_buff_value: string;
    var t_buff_conNum: string;
    var t_buff_interval: string;
    var t_buff_conTime: string;
    var t_buff_effectType: string;
    var t_buff_showType: string;
    var t_buff_side: string;
    var t_buff_exValue: string;
    var cfg_t_combat: string;
    var t_combat_id: string;
    var t_combat_monsterIds: string;
    var cfg_t_copy: string;
    var t_copy_id: string;
    var t_copy_pCopyId: string;
    var t_copy_copyIndex: string;
    var t_copy_copyBgId: string;
    var t_copy_lvlRequired: string;
    var t_copy_normalCopyId: string;
    var t_copy_combatId: string;
    var t_copy_strength: string;
    var t_copy_teamExpc: string;
    var t_copy_expc: string;
    var t_copy_gold: string;
    var t_copy_exploit: string;
    var t_copy_copySkillIds: string;
    var t_copy_isLast: string;
    var t_copy_remark: string;
    var t_copy_explain: string;
    var t_copy_timesPerDay: string;
    var t_copy_type: string;
    var t_copy_talkBeforeFight: string;
    var t_copy_talkAfterFight: string;
    var t_copy_bgMusicId: string;
    var t_copy_showTypes: string;
    var cfg_t_copyLoot: string;
    var t_copyLoot_id: string;
    var t_copyLoot_remark: string;
    var t_copyLoot_showItems: string;
    var t_copyLoot_lootItems: string;
    var t_copyLoot_wipeItems: string;
    var t_copyLoot_serverLootId: string;
    var cfg_t_copyPrimary: string;
    var t_copyPrimary_id: string;
    var t_copyPrimary_resId: string;
    var t_copyPrimary_name: string;
    var t_copyPrimary_type: string;
    var t_copyPrimary_lvlRequired: string;
    var t_copyPrimary_chestCnd: string;
    var t_copyPrimary_firstId: string;
    var t_copyPrimary_file: string;
    var t_copyPrimary_effAudioId: string;
    var t_copyPrimary_effId: string;
    var t_copyPrimary_cd: string;
    var cfg_t_hero: string;
    var t_hero_id: string;
    var t_hero_tid: string;
    var t_hero_note: string;
    var t_hero_quality: string;
    var t_hero_power: string;
    var t_hero_intel: string;
    var t_hero_life: string;
    var t_hero_lvlPower: string;
    var t_hero_lvlIntel: string;
    var t_hero_lvlLife: string;
    var t_hero_hp: string;
    var t_hero_pAttack: string;
    var t_hero_pDefence: string;
    var t_hero_mAttack: string;
    var t_hero_mDefence: string;
    var t_hero_hpRecovery: string;
    var t_hero_energyRecovery: string;
    var t_hero_energy: string;
    var t_hero_crit: string;
    var t_hero_reCrit: string;
    var t_hero_hit: string;
    var t_hero_reHit: string;
    var t_hero_pAttackMult: string;
    var t_hero_pDefenceMult: string;
    var t_hero_mAttackMult: string;
    var t_hero_mDefenceMult: string;
    var cfg_t_item: string;
    var t_item_id: string;
    var t_item_name: string;
    var t_item_type: string;
    var t_item_quality: string;
    var t_item_icon: string;
    var t_item_isSell: string;
    var t_item_isUse: string;
    var t_item_useLv: string;
    var t_item_useTime: string;
    var t_item_sellPrice: string;
    var t_item_coinPrice: string;
    var t_item_diamonddPrice: string;
    var t_item_bagTag: string;
    var t_item_maxRepeat: string;
    var t_item_maxGet: string;
    var t_item_copyIds: string;
    var t_item_getTxt: string;
    var t_item_exclusiveExp: string;
    var t_item_useTxt: string;
    var t_item_explain: string;
    var cfg_t_itemEquip: string;
    var t_itemEquip_id: string;
    var t_itemEquip_note: string;
    var t_itemEquip_part: string;
    var t_itemEquip_needLvl: string;
    var t_itemEquip_heroTid: string;
    var t_itemEquip_props: string;
    var t_itemEquip_stuffs: string;
    var cfg_t_itemEquipExclusive: string;
    var t_itemEquipExclusive_id: string;
    var t_itemEquipExclusive_note: string;
    var t_itemEquipExclusive_pAttackMult: string;
    var t_itemEquipExclusive_pDefenceMult: string;
    var t_itemEquipExclusive_mAttackMult: string;
    var t_itemEquipExclusive_mDefenceMult: string;
    var cfg_t_itemLogic: string;
    var t_itemLogic_id: string;
    var t_itemLogic_type: string;
    var t_itemLogic_create: string;
    var t_itemLogic_num: string;
    var cfg_t_monster: string;
    var t_monster_id: string;
    var t_monster_tid: string;
    var t_monster_name: string;
    var t_monster_quality: string;
    var t_monster_trainLv: string;
    var t_monster_type: string;
    var t_monster_chaType: string;
    var t_monster_lvl: string;
    var t_monster_power: string;
    var t_monster_intel: string;
    var t_monster_life: string;
    var t_monster_hp: string;
    var t_monster_pAttack: string;
    var t_monster_pDefence: string;
    var t_monster_mAttack: string;
    var t_monster_mDefence: string;
    var t_monster_energy: string;
    var t_monster_crit: string;
    var t_monster_reCrit: string;
    var t_monster_hit: string;
    var t_monster_reHit: string;
    var t_monster_pAttackMult: string;
    var t_monster_pDefenceMult: string;
    var t_monster_mAttackMult: string;
    var t_monster_mDefenceMult: string;
    var t_monster_skills: string;
    var t_monster_mixSkill: string;
    var cfg_t_serverLoot: string;
    var t_serverLoot_id: string;
    var t_serverLoot_rate: string;
    var t_serverLoot_itemIds: string;
    var t_serverLoot_times: string;
    var t_serverLoot_resetInterval: string;
    var cfg_t_skill: string;
    var t_skill_id: string;
    var t_skill_name: string;
    var t_skill_skillType: string;
    var t_skill_percentValue: string;
    var t_skill_addValue: string;
    var t_skill_cd: string;
    var t_skill_targetType: string;
    var t_skill_targets: string;
    var t_skill_targetArea: string;
    var t_skill_propHurtType: string;
    var t_skill_propHurtMult: string;
    var t_skill_props: string;
    var t_skill_buffNeedLvl: string;
    var t_skill_buffTrigger: string;
    var t_skill_buffIds: string;
    var t_skill_energyNeed: string;
    var t_skill_energyReply: string;
    var t_skill_showId: string;
    var t_skill_passiveType: string;
    var t_skill_actionRule: string;
    var t_skill_exValue: string;
    var t_skill_noMiss: string;
    var t_skill_text: string;
    var cfg_t_skillDisplay: string;
    var t_skillDisplay_id: string;
    var t_skillDisplay_name: string;
    var t_skillDisplay_mark: string;
    var t_skillDisplay_type: string;
    var t_skillDisplay_interval: string;
    var t_skillDisplay_attackDistance: string;
    var t_skillDisplay_effectType: string;
    var t_skillDisplay_action: string;
    var t_skillDisplay_fxSkill: string;
    var t_skillDisplay_fxTarget: string;
    var t_skillDisplay_fxPos: string;
    var t_skillDisplay_speed: string;
    var t_skillDisplay_fxHit: string;
    var t_skillDisplay_fxEmmitor1: string;
    var t_skillDisplay_number: string;
    var t_skillDisplay_numberHurts: string;
    var t_skillDisplay_audioId: string;
    var t_skillDisplay_hasHitAudio: string;
    var cfg_t_task: string;
    var t_task_id: string;
    var t_task_name: string;
    var t_task_type: string;
    var t_task_lvlRequired: string;
    var t_task_nextIds: string;
    var t_task_subType: string;
    var t_task_count: string;
    var t_task_arg: string;
    var t_task_desc: string;
    var t_task_guideGroupId: string;
    var t_task_sysId: string;
    var t_task_timeLimit: string;
    var t_task_items: string;
    var t_task_icon: string;
    var t_task_iconType: string;
    var t_task_vip: string;
    var t_task_whenOpened: string;
    var t_task_expressiveType: string;
    var cfg_t_warrior: string;
    var t_warrior_id: string;
    var t_warrior_name: string;
    var t_warrior_text: string;
    var t_warrior_job: string;
    var t_warrior_posOrder: string;
    var t_warrior_defaultSkills: string;
    var t_warrior_autoSkills: string;
    var t_warrior_bestDistance: string;
    var t_warrior_desc: string;
    var t_warrior_deathAudioId: string;
    var t_warrior_hasMatrixAudio: string;
    var t_warrior_hasWalkAudio: string;
    var t_warrior_word: string;
    var t_warrior_key: string;
    var t_warrior_exclusiveId: string;
    var t_warrior_normalSkill: string;
    var t_warrior_skills: string;
    var t_warrior_mixSkill: string;
    var t_warrior_fragmentId: string;
    var t_warrior_isTest: string;
    var t_warrior_audioDemo: string;
    var cfg_c_loadModule: string;
    var c_loadModule_id: string;
    var c_loadModule_key: string;
    var c_loadModule_type: string;
    var c_loadModule_title: string;
    var c_loadModule_desc: string;
}
declare module uw {
    var dsConsts: {
        AccountEntity: {
            id: number;
            name: number;
            email: number;
            pwd: number;
            deviceId: number;
            userServers: number;
            channel: number;
            sub_channel: number;
            plat: number;
            status: number;
            channelId: number;
        };
        ActivityEntity: {
            id: number;
            title: number;
            type: number;
            iconType: number;
            tiIconType: number;
            startTime: number;
            endTime: number;
            items: number;
            exValues: number;
            content: number;
            isOpen: number;
            sort: number;
        };
        ArenaBakEntity: {
            rank: number;
            userId: number;
            addTime: number;
        };
        ArenaEntity: {
            id: number;
            userId: number;
            rank: number;
            highRank: number;
            fightRanks: number;
        };
        ArenaLuckRankEntity: {
            id: number;
            userId: number;
            type: number;
            rank: number;
            sort: number;
            userName: number;
            addTime: number;
            isSendAward: number;
        };
        ArenaRecordEntity: {
            id: number;
            userId: number;
            userLvl: number;
            userName: number;
            userIcoinId: number;
            userRank: number;
            enemyId: number;
            enemyLvl: number;
            enemyName: number;
            enemyIcoinId: number;
            enemyRank: number;
            changeRank: number;
            isWin: number;
            fightTime: number;
            fightData: number;
            uniqueKey: number;
        };
        ChannelEntity: {
            id: number;
            channel: number;
            sub_channel: number;
            plat: number;
        };
        CopyProgressEntity: {
            id: number;
            userId: number;
            pCopyId: number;
            pTime: number;
            copyArr: number;
            timeArr: number;
            copyStar: number;
            resetCounts: number;
            timesPerDay: number;
            finished: number;
            refreshTime: number;
        };
        CouponEntity: {
            id: number;
            userId: number;
            name: number;
            content: number;
            code: number;
            type: number;
            startTime: number;
            endTime: number;
            items: number;
            channel: number;
            isUsed: number;
        };
        EquipEntity: {
            id: number;
            userId: number;
            heroId: number;
            part: number;
            tempId: number;
            lvl: number;
            exclusiveExp: number;
        };
        ExchangeEntity: {
            id: number;
            userId: number;
            items: number;
            dailyItems: number;
            lastTime: number;
            refreshTime: number;
        };
        FeedbackEntity: {
            id: number;
            userId: number;
            feedContent: number;
            feedTime: number;
            replyId: number;
            replyContent: number;
            replayTime: number;
        };
        GameConfigEntity: {
            id: number;
            resUrl: number;
            zipUrl: number;
        };
        GameRecordEntity: {
            id: number;
            loadRecord: number;
        };
        GuildEntity: {
            id: number;
            name: number;
            icon: number;
            lvl: number;
            buildValue: number;
            menberNum: number;
        };
        GuildRankEntity: {
            id: number;
            guildId: number;
            guildName: number;
            guildIcon: number;
            guildLvl: number;
            buildValue: number;
            menberNum: number;
        };
        HeroEntity: {
            id: number;
            userId: number;
            tempId: number;
            tempTid: number;
            pos: number;
            posArenaD: number;
            posArenaA: number;
            posMirrorD: number;
            posMirrorA: number;
            posTower: number;
            posTrial: number;
            expc: number;
            lvl: number;
            trainLvl: number;
            life: number;
            power: number;
            intel: number;
            hp: number;
            energy: number;
            pAttack: number;
            pDefence: number;
            mAttack: number;
            mDefence: number;
            crit: number;
            reCrit: number;
            hit: number;
            reHit: number;
            pAttackMult: number;
            pDefenceMult: number;
            mAttackMult: number;
            mDefenceMult: number;
            suckBlood: number;
            ignoreDefence: number;
            normalSkill: number;
            skills: number;
            skillLvl: number;
            mixSkill: number;
            hpRecovery: number;
            energyRecovery: number;
            potentialTrain: number;
            potentialUpdate: number;
            combatEff: number;
        };
        HeroRankEntity: {
            id: number;
            userId: number;
            userName: number;
            heroId: number;
            heroLvl: number;
            heroTempId: number;
            combatEff: number;
        };
        LotteryEntity: {
            id: number;
            userId: number;
            goldTodayCount: number;
            goldRefreshTime: number;
            goldCount: number;
            goldHistory: number;
            goldCDOverTime: number;
            diamondCount: number;
            diamondHistory: number;
            diamondCDOverTime: number;
        };
        MailEntity: {
            id: number;
            userId: number;
            type: number;
            fromName: number;
            title: number;
            content: number;
            replaceArgs: number;
            items: number;
            isPicked: number;
            isRead: number;
            delHours: number;
            delTime: number;
            expireTime: number;
            addTime: number;
        };
        ManagerEntity: {
            id: number;
            name: number;
            pwd: number;
            groupId: number;
        };
        ManagerGroup: {
            id: number;
            name: number;
            rights: number;
        };
        ManagerLoadLogEntity: {
            id: number;
            count: number;
            moduleId: number;
            deviceId: number;
            channelId: number;
        };
        ManagerLog: {
            id: number;
            managerId: number;
            managerName: number;
            module: number;
            serverId: number;
            type: number;
            operation: number;
            ip: number;
            time: number;
            tid: number;
        };
        MirrorDefenceHistoryEntity: {
            id: number;
            userId: number;
            history: number;
            count: number;
            refreshTime: number;
        };
        MirrorRankEntity: {
            id: number;
            userId: number;
            type: number;
            enterTime: number;
            isIn: number;
            tids: number;
            lockEndTime: number;
        };
        MirrorRankViewEntity: {
            id: number;
            userId: number;
            type: number;
            enterTime: number;
            isIn: number;
            tids: number;
            lockEndTime: number;
            name: number;
            lvl: number;
            iconId: number;
            combatEff: number;
            isLocked: number;
            totalGain: number;
        };
        NoticeEntity: {
            id: number;
            title: number;
            content: number;
            serverId: number;
            isOpen: number;
            updateTime: number;
        };
        RechargeEntity: {
            id: number;
            userId: number;
            rechargeId: number;
            diamond: number;
            rechargeTime: number;
            effTime: number;
            channelId: number;
            transId: number;
            currency: number;
            ip: number;
            payMoney: number;
            userLvl: number;
        };
        RechargeRequestEntity: {
            id: number;
            accountId: number;
            userId: number;
            serverId: number;
            rechargeId: number;
            status: number;
            addTime: number;
            transId: number;
        };
        ServerInfoEntity: {
            id: number;
            name: number;
            area: number;
            host: number;
            port: number;
            isNew: number;
            status: number;
            dbLink: number;
        };
        ShopEntity: {
            id: number;
            userId: number;
            items1: number;
            lastTime1: number;
            refreshCount1: number;
            refreshCountResetTime1: number;
            items2: number;
            lastTime2: number;
            refreshCount2: number;
            refreshCountResetTime2: number;
            disappearTime2: number;
            appearCount2: number;
            rateBeginTime2: number;
            items3: number;
            lastTime3: number;
            refreshCount3: number;
            refreshCountResetTime3: number;
            disappearTime3: number;
            appearCount3: number;
            rateBeginTime3: number;
            items4: number;
            lastTime4: number;
            refreshCount4: number;
            refreshCountResetTime4: number;
            items5: number;
            lastTime5: number;
            refreshCount5: number;
            refreshCountResetTime5: number;
        };
        TaskEntity: {
            id: number;
            userId: number;
            dailyTasks: number;
            tasks: number;
            refreshTime: number;
            doneTasks: number;
        };
        TowerEntity: {
            id: number;
            userId: number;
            reNum: number;
            reTime: number;
            layer: number;
            highLayer: number;
            highSpend: number;
            startTime: number;
            chestLayer: number;
        };
        TowerRankEntity: {
            id: number;
            userId: number;
            userName: number;
            userLvl: number;
            userVip: number;
            userIconId: number;
            layer: number;
            spend: number;
        };
        UserEntity: {
            id: number;
            name: number;
            accountId: number;
            lastLoginTime: number;
            loginCount: number;
            gold: number;
            diamond: number;
            give_diamond: number;
            buy_diamond: number;
            exploit: number;
            towerPoints: number;
            honor: number;
            strength: number;
            strengthReTime: number;
            bag: number;
            changeNameCount: number;
            lvl: number;
            expc: number;
            iconId: number;
            vip: number;
            vipScore: number;
            skillPointsReTime: number;
            guide: number;
            subGuide: number;
            secret: number;
            fightUnique: number;
            counts: number;
            countsRefreshTime: number;
            sign: number;
            activity: number;
            serverId: number;
            create_ip: number;
            create_time: number;
            last_map_1: number;
            last_map_2: number;
            coupon: number;
            updateTime: number;
            record: number;
        };
        UserMirrorCombatViewEntity: {
            userId: number;
            combatEff: number;
        };
        UserRecordEntity: {
            id: number;
            userId: number;
            moduleId: number;
        };
        FightResult: {
            rank: number;
            star: number;
            diamond: number;
            chestItems: number;
            wipeItems: number;
            items: number;
            heroes: number;
            equips: number;
            mirrorEnterState: number;
        };
        ServerInfo: {
            id: number;
            area: number;
            name: number;
            host: number;
            port: number;
            isNew: number;
            status: number;
        };
        CopyProgressState: {
            state: number;
            star: number;
            times: number;
        };
        StrengthInfo: {
            strength: number;
            buyCount: number;
            nextReplyTime: number;
            allReplayTime: number;
        };
        SkillPointsInfo: {
            replyTime: number;
            skillPoints: number;
        };
        UseItemInfo: {
            items: number;
            equips: number;
            hero: number;
            equipIdsToDel: number;
        };
        inlayGem: {
            upGem: number;
            downGem: number;
        };
        gemItem: {
            id: number;
            pos: number;
        };
        ArenaInfo: {
            isNew: number;
            arena: number;
            fightUsers: number;
        };
        ArenaFightUser: {
            id: number;
            name: number;
            lvl: number;
            iconId: number;
            rank: number;
            combatEff: number;
            heroes: number;
        };
        Rank: {
            rank: number;
            name: number;
            lvl: number;
            guildName: number;
            layer: number;
            iconId: number;
        };
        ArenaLuckRank: {
            today: number;
            yesterday: number;
        };
        TaskReward: {
            task: number;
            equips: number;
        };
        HeroAndEquip: {
            hero: number;
            equip: number;
        };
        ArenaFight: {
            uniqueKey: number;
            heroes: number;
            secretSkills: number;
            enemyUserId: number;
        };
        RechargeData: {
            countMap: number;
            cardTimeMap: number;
        };
        SecretShopAppearData: {
            shopEntity: number;
            shopFlag: number;
        };
        ActivityData: {
            id: number;
            title: number;
            type: number;
            iconType: number;
            tiIconType: number;
            startTime: number;
            endTime: number;
            items: number;
            content: number;
            isOpen: number;
            todayRecharge: number;
            allRecharge: number;
            todayCost: number;
            allCost: number;
        };
        ActivityItem: {
            items: number;
            diamond: number;
            userLvl: number;
            limitNum: number;
            heroTempId: number;
        };
        LoginData: {
            sdkData: number;
            account: number;
        };
        SDKData: {
            id: number;
            name: number;
        };
    };
}
declare module res.ui_arena {
    var blk_ranknumcooper_png: string;
    var blk_ranknumgold_png: string;
    var blk_ranknumnormal_png: string;
    var blk_ranktiltle_png: string;
    var blk_redstrip_png: string;
    var btn_battlerecord_png: string;
    var btn_changechallenger_png: string;
    var btn_exchange_png: string;
    var btn_luckyrank_png: string;
    var btn_rank_png: string;
    var btn_timet_png: string;
    var cov_head_png: string;
    var gezihong1_png: string;
    var ntc_blkfigurel_png: string;
    var ntc_blkfigurer_png: string;
    var ntc_luckrank_png: string;
    var num_r0_png: string;
    var num_r1_png: string;
    var num_r2_png: string;
    var num_r3_png: string;
    var num_r4_png: string;
    var num_r5_png: string;
    var num_r6_png: string;
    var num_r7_png: string;
    var num_r8_png: string;
    var num_r9_png: string;
    var num_rank0_png: string;
    var num_rank1_png: string;
    var num_rank2_png: string;
    var num_rank3_png: string;
    var num_rank4_png: string;
    var num_rank5_png: string;
    var num_rank6_png: string;
    var num_rank7_png: string;
    var num_rank8_png: string;
    var num_rank9_png: string;
}
declare module res.ui_bag {
    var blk_numbers_png: string;
    var blk_numbersS_png: string;
    var blk_nums_png: string;
    var minus_png: string;
    var plus_png: string;
    var sale_max_png: string;
}
declare module res.ui_bg {
    var bg_arane_jpg: string;
    var bg_bag_jpg: string;
    var bg_copy_mi_jpg: string;
    var bg_equipment_jpg: string;
    var bg_film_jpg: string;
    var bg_getHero_jpg: string;
    var bg_heroform_jpg: string;
    var bg_home_jpg: string;
    var bg_lottery_jpg: string;
    var bg_midlight_png: string;
    var bg_mirrorworld_jpg: string;
    var bg_tower_jpg: string;
    var bg_trial_jpg: string;
    var contrantbg_jpg: string;
    var login_jpg: string;
}
declare module res.ui_btn {
    var btn_10more_png: string;
    var btn_add_png: string;
    var btn_adjust_png: string;
    var btn_autowash_png: string;
    var btn_back_png: string;
    var btn_beginwashin_png: string;
    var btn_cancel_png: string;
    var btn_challenge_png: string;
    var btn_changeEquip_png: string;
    var btn_charge_png: string;
    var btn_check_png: string;
    var btn_commix_png: string;
    var btn_confirm_png: string;
    var btn_confirmblank_png: string;
    var btn_defencerecord_png: string;
    var btn_detail_png: string;
    var btn_evolution_png: string;
    var btn_exchange_png: string;
    var btn_extract_png: string;
    var btn_f5_png: string;
    var btn_fallback_png: string;
    var btn_formation_png: string;
    var btn_get_png: string;
    var btn_goto_png: string;
    var btn_inlay_png: string;
    var btn_inter_png: string;
    var btn_mixture_png: string;
    var btn_mixtureOneOper_png: string;
    var btn_mulityuse_png: string;
    var btn_nmore_png: string;
    var btn_purchase_png: string;
    var btn_putOff_png: string;
    var btn_putOn_png: string;
    var btn_replay_png: string;
    var btn_reset_png: string;
    var btn_retry_png: string;
    var btn_sale_png: string;
    var btn_save_png: string;
    var btn_send_png: string;
    var btn_share_png: string;
    var btn_sommon_png: string;
    var btn_sommononemore_png: string;
    var btn_sommontentimes_png: string;
    var btn_takeway_png: string;
    var btn_train_png: string;
    var btn_treasure_png: string;
    var btn_use_png: string;
    var btn_vipPrivilege_png: string;
    var btn_wash_png: string;
    var cream_png: string;
    var ico_forplus_png: string;
    var ico_forpluslocked_png: string;
    var lock_png: string;
    var normal_png: string;
    var trial_png: string;
}
declare module res.ui_common {
    var bar1_png: string;
    var bar2_png: string;
    var bar3_png: string;
    var bar4_png: string;
    var bar_light1_png: string;
    var bar_light2_png: string;
    var bar_light4_png: string;
    var bar_loadinglight_png: string;
    var bar_loadingtank_png: string;
    var bar_vip2_png: string;
    var bgformixture_png: string;
    var blk9_ntc_png: string;
    var blk9_q_0_png: string;
    var blk9_q_1_png: string;
    var blk9_q_2_png: string;
    var blk_boxtype_png: string;
    var blk_grain_png: string;
    var blk_headlevel_png: string;
    var blk_item_num_png: string;
    var blk_jb_png: string;
    var blk_ntc_circle_png: string;
    var blk_skillint_png: string;
    var blk_skillpas_png: string;
    var blk_skillunder_png: string;
    var blk_skillundero_png: string;
    var btn_arrow_png: string;
    var btn_embattle_png: string;
    var btn_new_png: string;
    var btn_next2_png: string;
    var btn_pickme_png: string;
    var btn_save_png: string;
    var btn_select_png: string;
    var clicktocontinue_png: string;
    var common_white_line_png: string;
    var copy_btn_boss02_png: string;
    var copy_btn_childbig02_png: string;
    var copy_btn_childsmall03_png: string;
    var copy_choose_png: string;
    var copy_starformap_png: string;
    var cov_lotteryitem_png: string;
    var dice_png: string;
    var down_png: string;
    var greenlantun_png: string;
    var home_head_mark_png: string;
    var ico_arw_png: string;
    var ico_choose_png: string;
    var ico_chooseBg_png: string;
    var ico_diamond_png: string;
    var ico_diamondplus_png: string;
    var ico_gold_png: string;
    var ico_goldplus_png: string;
    var ico_honor_png: string;
    var ico_royalcoin_png: string;
    var ico_royalpass_png: string;
    var ico_strength_png: string;
    var ico_strengthplus_png: string;
    var ico_sweeping_png: string;
    var ico_trialcard_png: string;
    var img_default_png: string;
    var light_png: string;
    var light1_png: string;
    var lightTask_png: string;
    var logo_loading_png: string;
    var ntc_inborad_png: string;
    var ntc_levelup_png: string;
    var ntc_loading_png: string;
    var ntc_norandomskillsw_png: string;
    var ntc_norecord_png: string;
    var ntc_pieces_png: string;
    var ntc_soulpieces_png: string;
    var shadow_png: string;
    var tag_focus2_png: string;
    var tg_png: string;
    var up_png: string;
}
declare module res.ui_copy {
    var AoSiDunZhiCheng_png: string;
    var AoSiDunZhiChengWaiFaGuang_png: string;
    var AoSiDunZhiChengWeiJieSuo_png: string;
    var baofengzhiyandianji_png: string;
    var baofengzhiyanweijiesuo_png: string;
    var baofengzhiyanyijiesuo_png: string;
    var beifengyaosaidianji_png: string;
    var beifengyaosaiweijiesuo_png: string;
    var beifengyaosaiyijiesuo_png: string;
    var BeiJing_png: string;
    var copy_bg_typebar_png: string;
    var copy_btn_normaltype01_png: string;
    var copy_btn_normaltype02_png: string;
    var copy_btn_protype01_png: string;
    var copy_btn_protype02_png: string;
    var copy_btn_stage01_png: string;
    var copy_btn_stage02_png: string;
    var copy_icon_connect_png: string;
    var copy_map_child_level0_jpg: string;
    var copy_map_child_level0_elite_jpg: string;
    var copy_map_midcornerL_png: string;
    var copy_map_midcornerline_png: string;
    var copy_map_midcornerlineblue_png: string;
    var copy_map_midcornerpattern_png: string;
    var copy_map_midcornerR_png: string;
    var copy_ntc_circle_png: string;
    var DiLaKeOuLa_png: string;
    var DiLaKeOuLaWaiFaGuang_png: string;
    var DiLaKeOuLaWeiJieSuo_png: string;
    var dimiana_png: string;
    var dimianb_png: string;
    var emotingyuandianji_png: string;
    var emotingyuanweijiesuo_png: string;
    var emotingyuanyijiesuo_png: string;
    var heianzhimendianji_png: string;
    var heianzhimenweijiesuo_png: string;
    var heianzhimenyijiesuo_png: string;
    var HouYunCengPinJieB_png: string;
    var HouYunYengPinJieA_png: string;
    var KongJuFeiTu_png: string;
    var KongJuFeiTuWaiFaGuang_png: string;
    var KongJuFeiTuWeiJieSuo_png: string;
    var longrenlingdidianji_png: string;
    var longrenlingdiyijiesuo_png: string;
    var longrenlingweikaiqi_png: string;
    var MiShiZhiJing_png: string;
    var MiShiZhiJingWaiFaGuang_png: string;
    var MiShiZhiJingWeiJieSuo_png: string;
    var ntc_locked_png: string;
    var QianJing_png: string;
    var shiluozhichengdianji_png: string;
    var shiluozhichengweijiesuo_png: string;
    var shiluozhichengyijiesuo_png: string;
    var TieXueWangZuo_png: string;
    var TieXueWangZuoWaiFaGuang_png: string;
    var TieXueWangZuoWeiJieSuo_png: string;
    var TongKuZhanChang_png: string;
    var TongKuZhanChangWaiFaGuang_png: string;
    var TongKuZhanChangWeiJieSuo_png: string;
    var xuwangkongjiandianji_png: string;
    var xuwangkongjianweijiesuo_png: string;
    var xuwangkongjianyijiesuo_png: string;
    var YunDuoA_png: string;
    var YunDuoB_png: string;
    var YunDuoC_png: string;
    var YunDuoD_png: string;
    var ZuZhouZhiGu_png: string;
    var ZuZhouZhiGuWaiFaGuang_png: string;
    var ZuZhouZhiGuWeiJieSuo_png: string;
}
declare module res.ui_copyInfo {
    var btn_purchase_png: string;
    var copy_btn_continue_png: string;
    var copy_btn_noraids_png: string;
    var copy_btn_raids_png: string;
    var copy_btn_raids1_png: string;
    var copy_star_png: string;
    var copy_star_gray_png: string;
    var copy_under_stars_png: string;
    var raids_under_vipbouns_png: string;
    var raids_vipbouns_png: string;
    var redcorner_png: string;
}
declare module res.ui_daily {
    var blk_item_png: string;
    var cov_recived_png: string;
    var ntc_corrnerstrip_png: string;
    var ntc_double_png: string;
    var ntc_fillsign_png: string;
    var und_todays_png: string;
    var wrd_v1_png: string;
    var wrd_v10_png: string;
    var wrd_v11_png: string;
    var wrd_v12_png: string;
    var wrd_v13_png: string;
    var wrd_v14_png: string;
    var wrd_v15_png: string;
    var wrd_v16_png: string;
    var wrd_v2_png: string;
    var wrd_v3_png: string;
    var wrd_v4_png: string;
    var wrd_v5_png: string;
    var wrd_v6_png: string;
    var wrd_v7_png: string;
    var wrd_v8_png: string;
    var wrd_v9_png: string;
}
declare module res.ui_embattle {
    var blk_redskills_png: string;
    var blk_redskills2new_png: string;
    var blk_redunder_png: string;
    var copy_buzhen_png: string;
    var copy_dibang_png: string;
    var copy_gezihong1_png: string;
    var copy_lang_png: string;
    var copy_under_raids_png: string;
    var copy_xian_png: string;
    var pat_battle_png: string;
    var pat_power_png: string;
}
declare module res.ui_equipment {
    var blk_exclusive_png: string;
    var blk_gemmounting_png: string;
    var btn_changgehero_png: string;
    var btn_choosehero_png: string;
    var btn_rule_png: string;
    var btn_rule_unfocus_png: string;
}
declare module res.ui_event {
    var blk9_forcg_png: string;
    var blk_giftitem_png: string;
    var blk_input_png: string;
    var btn_buy1_png: string;
    var btn_getmemoney_png: string;
    var btn_getshit_png: string;
    var btn_plusgift_png: string;
    var corner_goldblk_png: string;
    var icon_png: string;
    var ntc_cg2_jpg: string;
    var ntc_cg7_jpg: string;
    var ntc_cgcode_jpg: string;
    var ntc_day_png: string;
    var ntc_firsttopup_png: string;
    var ntc_gotit_png: string;
    var ntc_soldout_png: string;
    var ntc_titleinfo_png: string;
    var tag_27_png: string;
    var tag_7ds_png: string;
    var tag_eventfocus_png: string;
    var tag_eventunfocus_png: string;
    var tag_focus_png: string;
    var tit_7ds_png: string;
    var tit_blubond_png: string;
    var tit_redbond_png: string;
    var tit_type1_png: string;
    var tit_type2_png: string;
    var tit_type3_png: string;
    var tit_type4_png: string;
    var tit_type5_png: string;
    var tit_type6_png: string;
    var tit_type7_png: string;
    var tit_type8_png: string;
    var tit_type9_png: string;
    var wrd_2rdd_png: string;
    var wrd_2rdd_focus_png: string;
    var wrd_7thd_png: string;
    var wrd_7thd_focus_png: string;
    var wrd_type1_png: string;
    var wrd_type2_png: string;
    var wrd_type3_png: string;
    var wrd_type4_png: string;
    var wrd_type5_png: string;
}
declare module res.ui_feedback {
    var blk9_input_png: string;
    var blk_title_png: string;
    var btn_submit_png: string;
    var line_b_png: string;
}
declare module res.ui_fight {
    var bar_hpennew_png: string;
    var battlestatus_under_png: string;
    var blk_hermeticblank_png: string;
    var blk_hp_png: string;
    var blk_lose_png: string;
    var blk_openinglk_png: string;
    var blk_skill1_png: string;
    var blk_skill1_unable_png: string;
    var blk_skill2_png: string;
    var blk_skill2_unable_png: string;
    var blk_skillunder_png: string;
    var blk_timer_png: string;
    var blk_win_png: string;
    var btn_auto_off_png: string;
    var btn_auto_on_png: string;
    var btn_continue_png: string;
    var btn_pause_png: string;
    var btn_pause_focus_png: string;
    var btn_quit_png: string;
    var btn_replay_png: string;
    var btn_resume_png: string;
    var btn_soundoff_png: string;
    var btn_soundon_png: string;
    var cov_redflo_png: string;
    var exp01_png: string;
    var exp02_png: string;
    var exp03_png: string;
    var exp_hero_png: string;
    var fight_buff_blood_0_png: string;
    var fight_buff_blood_1_png: string;
    var fight_buff_blood_2_png: string;
    var fight_buff_blood_3_png: string;
    var fight_buff_blood_4_png: string;
    var fight_buff_blood_5_png: string;
    var fight_buff_blood_6_png: string;
    var fight_buff_blood_7_png: string;
    var fight_buff_blood_8_png: string;
    var fight_buff_blood_9_png: string;
    var fight_buff_blood_plus_png: string;
    var fight_debuff_blood_0_png: string;
    var fight_debuff_blood_1_png: string;
    var fight_debuff_blood_2_png: string;
    var fight_debuff_blood_3_png: string;
    var fight_debuff_blood_4_png: string;
    var fight_debuff_blood_5_png: string;
    var fight_debuff_blood_6_png: string;
    var fight_debuff_blood_7_png: string;
    var fight_debuff_blood_8_png: string;
    var fight_debuff_blood_9_png: string;
    var fight_debuff_blood_minus_png: string;
    var fight_energy_0_png: string;
    var fight_energy_1_png: string;
    var fight_energy_2_png: string;
    var fight_energy_3_png: string;
    var fight_energy_4_png: string;
    var fight_energy_5_png: string;
    var fight_energy_6_png: string;
    var fight_energy_7_png: string;
    var fight_energy_8_png: string;
    var fight_energy_9_png: string;
    var fight_energy_plus_png: string;
    var fight_txt_aback_png: string;
    var fight_txt_addEnergy_png: string;
    var fight_txt_armorbroke_png: string;
    var fight_txt_attackSpeedIncrease_png: string;
    var fight_txt_attackSpeedReduce_png: string;
    var fight_txt_bloodDrinkingIncrease_png: string;
    var fight_txt_crit_png: string;
    var fight_txt_critDefenceIncrease_png: string;
    var fight_txt_critDefenceReduce_png: string;
    var fight_txt_critIncrease_png: string;
    var fight_txt_critReduce_png: string;
    var fight_txt_defenceOffsetIncrease_png: string;
    var fight_txt_dodge_png: string;
    var fight_txt_dodgeIncrease_png: string;
    var fight_txt_dodgeReduce_png: string;
    var fight_txt_hitIncrease_png: string;
    var fight_txt_hitReduce_png: string;
    var fight_txt_magicAttackIncrease_png: string;
    var fight_txt_magicAttackReduce_png: string;
    var fight_txt_magicDefenceIncrease_png: string;
    var fight_txt_magicDefenceReduce_png: string;
    var fight_txt_magicImmune_png: string;
    var fight_txt_movingSpeedIncrease_png: string;
    var fight_txt_movingSpeedReduce_png: string;
    var fight_txt_physicalAttackIncrease_png: string;
    var fight_txt_physicalAttackReduce_png: string;
    var fight_txt_physicalDefenceIncrease_png: string;
    var fight_txt_physicalDefenceReduce_png: string;
    var fight_txt_physicalImmune_png: string;
    var fight_txt_rebound_png: string;
    var fight_txt_skillsImmune_png: string;
    var fill_hermeticengdown_png: string;
    var fill_hermeticengdownfls_png: string;
    var fill_hermeticenglight_png: string;
    var fill_hermeticengup_png: string;
    var fill_hermeticengupfls_png: string;
    var freeze_png: string;
    var hermiCorrosion_png: string;
    var hermiMagic_png: string;
    var hermiPressure_png: string;
    var hermiRoar_png: string;
    var hermiViolent_png: string;
    var ico_enegry_png: string;
    var inr_hp_png: string;
    var inr_hp2_png: string;
    var levelUP_png: string;
    var lvlRect_png: string;
    var magicShieldCharm_png: string;
    var normalAnger_png: string;
    var normalShieldCharm_png: string;
    var ntc_replay_png: string;
    var readytostart_png: string;
    var ready_circle_png: string;
    var resultTitle_lose_png: string;
    var resultTitle_win_png: string;
    var silence_png: string;
    var star_png: string;
    var superAnger_png: string;
    var title_pause_png: string;
    var tnk_engnew_png: string;
    var tnk_hpnew_png: string;
    var und_heronew_png: string;
    var waveunder_png: string;
    var wrd_randomskill_png: string;
}
declare module res.ui_film {
    var randomgy_png: string;
}
declare module res.ui_hermetic {
    var blankpattern_png: string;
    var blk_hermeticinnew_png: string;
    var blk_heroorweapon_png: string;
    var blk_skillbanknew_png: string;
    var btn_save_png: string;
    var ntc_initiativenew_png: string;
    var ntc_ironedgenew_png: string;
    var ntc_passivenew_png: string;
    var titile_hermetic_png: string;
    var title_skillget_png: string;
    var title_skillupgrade_png: string;
}
declare module res.ui_hero {
    var A_png: string;
    var B_png: string;
    var bg_trainBtn_png: string;
    var blk_normaleqp_focus_png: string;
    var blk_normaleqp_unfocus_png: string;
    var blk_weaponinfo_png: string;
    var btn_culture1_png: string;
    var btn_culture2_png: string;
    var btn_detail1_png: string;
    var btn_detail2_png: string;
    var btn_fullgrade_png: string;
    var btn_onestrengthen_png: string;
    var btn_strengthen_png: string;
    var btn_train_png: string;
    var btn_trainUp_png: string;
    var btn_upgrade_png: string;
    var btn_upSkill1_png: string;
    var btn_upSkill2_png: string;
    var C_png: string;
    var cov_washingbar_png: string;
    var D_png: string;
    var line1_png: string;
    var midline_png: string;
    var mixSkillItemBg_png: string;
    var S_png: string;
    var skillItemBg_png: string;
    var wrd_level_png: string;
    var wrd_upgrade_png: string;
    var btn_upLvl_png: string;
    var fazhen_png: string;
    var ico_crown_png: string;
    var job_1_png: string;
    var job_2_png: string;
    var job_3_png: string;
    var job_4_png: string;
    var quality_bg_png: string;
    var quality_title_png: string;
}
declare module res.ui_home {
    var btn_signout_png: string;
    var critx10_png: string;
    var critx2_png: string;
    var critx3_png: string;
    var critx5_png: string;
    var dice_png: string;
    var home_chat_scrollbar_png: string;
    var home_chat_scroll_bg_png: string;
    var home_chat_send_png: string;
    var home_modifyHead_png: string;
    var home_name_bg_png: string;
    var home_option_png: string;
    var home_sound_off_png: string;
    var home_sound_on_png: string;
    var home_ui_cornor_bg_png: string;
    var home_ui_cornor_bl_png: string;
    var home_ui_cornor_head2_png: string;
    var home_ui_icon_bg_png: string;
    var home_vip_icon_png: string;
    var icon_7up_png: string;
    var icon_bag_png: string;
    var icon_charge_png: string;
    var icon_daily_png: string;
    var icon_feedback_png: string;
    var icon_firstcoin_png: string;
    var icon_getmemoney_png: string;
    var icon_greatdaily_png: string;
    var icon_hermetic_png: string;
    var icon_hero_png: string;
    var icon_mail_png: string;
    var icon_mixture_png: string;
    var icon_rank_png: string;
    var icon_sign_png: string;
    var icon_signin_png: string;
    var icon_task_png: string;
    var ico_alchemy_png: string;
    var ntc_hmt_png: string;
    var pat_modifyHead_png: string;
    var vip_0_png: string;
    var vip_1_png: string;
    var vip_2_png: string;
    var vip_3_png: string;
    var vip_4_png: string;
    var vip_5_png: string;
    var vip_6_png: string;
    var vip_7_png: string;
    var vip_8_png: string;
    var vip_9_png: string;
    var wrd_moneycirtical_png: string;
}
declare module res.ui_homebg {
    var blk9_shadow_png: string;
    var blk_name_png: string;
    var blk_name_locked_png: string;
    var btn_blacksmith_png: string;
    var btn_blacksmith_locked_png: string;
    var btn_duplicate_png: string;
    var btn_duplicate_locked_png: string;
    var btn_fightinghouse_png: string;
    var btn_fightinghouse_locked_png: string;
    var btn_guardtower_png: string;
    var btn_guardtower_locked_png: string;
    var btn_guild_png: string;
    var btn_mirrorwrd_png: string;
    var btn_mirrorwrd_locked_png: string;
    var btn_roaric_png: string;
    var btn_roaric_locked_png: string;
    var btn_seceratshop_png: string;
    var btn_shop_png: string;
    var btn_shop_locked_png: string;
    var btn_wishpool_png: string;
    var btn_wishpool_locked_png: string;
    var cloud1_png: string;
    var cloud2_png: string;
    var floor1_png: string;
    var floor2_png: string;
    var floor3_png: string;
    var floor4_png: string;
    var floor5_png: string;
    var floor6_png: string;
    var floor7_png: string;
    var floor8_png: string;
    var ntc_selectbud_png: string;
}
declare module res.ui_login {
    var blk9_user_png: string;
    var blk_area_png: string;
    var btn_changearea_png: string;
    var btn_close_png: string;
    var btn_fastenter_png: string;
    var btn_login_png: string;
    var btn_logout_png: string;
    var btn_notice_png: string;
    var btn_passworldfinding_png: string;
    var btn_select_png: string;
    var btn_signin_png: string;
    var btn_start_png: string;
    var btn_unselect_png: string;
    var tag_grn_png: string;
    var tag_new_png: string;
    var tag_purple_png: string;
    var tag_red_png: string;
    var tag_yellow_png: string;
    var title_allserver_png: string;
    var title_login_png: string;
    var title_nl_png: string;
    var title_password_png: string;
    var title_signin_png: string;
    var wrd_png: string;
    var wrd_email_png: string;
    var wrd_passwordcomfirm_png: string;
    var wrd_passworld_png: string;
    var wrd_username_png: string;
}
declare module res.ui_lottery {
    var blk_result_png: string;
    var lightnormalbox_png: string;
    var lightsuperbox_png: string;
    var normalbox_png: string;
    var ntc_10blueitem_png: string;
    var ntc_10hero_png: string;
    var superbox_png: string;
}
declare module res.ui_mail {
    var annex_png: string;
    var from_png: string;
    var ntc_noitem_png: string;
}
declare module res.ui_mirrorworld {
    var bg_elfblue_png: string;
    var bg_elfred_png: string;
    var bg_glassblue_png: string;
    var bg_glassred_png: string;
    var btn_level_png: string;
    var btn_viewMe_png: string;
    var ntc_challengable_png: string;
    var ntc_inabattle_png: string;
}
declare module res.ui_mt {
    var blk_level_open_png: string;
    var ico_lvl_0_png: string;
    var ico_lvl_1_png: string;
    var ico_lvl_2_png: string;
    var ico_lvl_3_png: string;
    var ico_lvl_4_png: string;
    var ico_lvl_5_png: string;
}
declare module res.ui_num {
    var sty_gold_png: string;
    var sty_herolevel_png: string;
    var sty_vip_png: string;
}
declare module res.ui_panel {
    var bar_loading_png: string;
    var blk9_babble3_png: string;
    var blk9_babble4_png: string;
    var blk9_bag_png: string;
    var blk9_barbg_png: string;
    var blk9_challenger_png: string;
    var blk9_challengerinfo_png: string;
    var blk9_diamond_png: string;
    var blk9_gold_png: string;
    var blk9_gold1_png: string;
    var blk9_gold2_png: string;
    var blk9_heroblankl_png: string;
    var blk9_heroform_png: string;
    var blk9_heronameblank_png: string;
    var blk9_info_png: string;
    var blk9_ininfo_png: string;
    var blk9_innerforredblank_png: string;
    var blk9_inputline_png: string;
    var blk9_item_png: string;
    var blk9_item1_png: string;
    var blk9_itembox_png: string;
    var blk9_ltabbg_png: string;
    var blk9_m_png: string;
    var blk9_money_png: string;
    var blk9_rankstrip_png: string;
    var blk9_rtabbg_png: string;
    var blk9_shopitem_png: string;
    var blk9_skill_png: string;
    var blk9_skill2_png: string;
    var blk9_skilltitlebg_png: string;
    var blk9_stepone_png: string;
    var blk9_steptwo_png: string;
    var blk9_talent_png: string;
    var blk9_talentg_png: string;
    var blk9_transparent_png: string;
    var blk9_transparentred_png: string;
    var blk9_trialcard_png: string;
    var blk9_vipblk2_png: string;
    var blk_headcooper_png: string;
    var blk_headgold_png: string;
    var blk_headnormal_png: string;
    var blk_headsilver_png: string;
    var blk_hero_png: string;
    var blk_nums_png: string;
    var blk_rankandfunction_png: string;
    var btn_back1_png: string;
    var btn_back2_png: string;
    var btn_close_png: string;
    var btn_contractcomfirm_focus_png: string;
    var btn_contractcomfirm_unfocus_png: string;
    var btn_info_focus_png: string;
    var btn_info_unfocus_png: string;
    var combatEff_png: string;
    var common_infoTitle_png: string;
    var copy_level_blanket_png: string;
    var cornerBL_png: string;
    var cornerTL_png: string;
    var cov_scrap_png: string;
    var cov_task_png: string;
    var eqp_1_png: string;
    var eqp_2_png: string;
    var eqp_3_png: string;
    var eqp_4_png: string;
    var eqp_5_png: string;
    var eqp_6_png: string;
    var eqp_7_png: string;
    var heroIcon_jpg: string;
    var heroIconMask_png: string;
    var icon_item_default_png: string;
    var icon_lose_png: string;
    var icon_win_png: string;
    var leaderExp_png: string;
    var levelUP_png: string;
    var ntc_boss_png: string;
    var ntc_soldout_png: string;
    var point_png: string;
    var skillIcon_png: string;
    var under_package_png: string;
    var und_info_png: string;
    var und_myrank_png: string;
    var wrd_yougotahero_png: string;
}
declare module res.ui_quest {
    var btn_receive_png: string;
    var ntc_questicon_png: string;
    var ntc_reward_png: string;
}
declare module res.ui_rank {
    var blk_tagfocus_png: string;
    var blk_tagunfocus_png: string;
    var blk_title_png: string;
    var btn_myrank_png: string;
    var ntc_cut_png: string;
    var ntc_towerfloor_png: string;
    var title_rank_png: string;
    var wrd_herofocus_png: string;
    var wrd_herounfocus_png: string;
    var wrd_towerfocus_png: string;
    var wrd_towerunfocus_png: string;
    var wrd_unionfocus_png: string;
    var wrd_unionunfocus_png: string;
}
declare module res.ui_secratshop {
    var blk_secratshope_png: string;
    var blk_title_png: string;
    var wrd_title_png: string;
    var wrd_title2_png: string;
}
declare module res.ui_tower {
    var bg_ball_png: string;
    var bg_platform_png: string;
    var blk_challenge_png: string;
    var btn_autochallenge_png: string;
    var btn_challenge_png: string;
    var btn_gift2_png: string;
    var btn_scoreshop_png: string;
    var ntc_receivable_png: string;
    var ntc_unreceivable_png: string;
    var title_blow_png: string;
    var wrd_level_png: string;
}
declare module res.ui_trial {
    var bg_pCopy_0_0_png: string;
    var bg_pCopy_0_1_png: string;
    var bg_pCopy_0_2_png: string;
    var bg_pCopy_1_0_png: string;
    var bg_pCopy_1_1_png: string;
    var bg_pCopy_1_2_png: string;
    var bg_pCopy_2_0_png: string;
    var bg_pCopy_2_1_png: string;
    var bg_pCopy_2_2_png: string;
    var totum_1_png: string;
    var totum_2_png: string;
    var totum_3_png: string;
}
declare module res.ui_vip {
    var blk_title_png: string;
    var btn_money_png: string;
    var btn_vipinfo_png: string;
    var title_png: string;
    var titlef_png: string;
    var vip_png: string;
}
declare module uw {
    var id_c_game: {
        gemMergeCost: number;
        strengthCfg: number;
        goldBuySet: number;
        initedItems: number;
        fightRunConfig: number;
        fightMaxRounds: number;
        fightHitEnergyReplay: number;
        changeNameDiamond: number;
        equipColMult: number;
        trainPropMult: number;
        trainRandomRange: number;
        trainVip: number;
        skillLearnQuality: number;
        skillPointsConfig: number;
        fuckWord: number;
        mixSkillUpNeedQuality: number;
        mixSkillUpNeedQualityEx: number;
        arenaCfg: number;
        bossCfg: number;
        towerConfig: number;
        dailyTasks: number;
        startTasks: number;
        lotteryCfg: number;
        fragmentOfHero: number;
        exclusiveCfg: number;
        serverCfg: number;
        heroExpLimit: number;
        loadingTips: number;
        maxLvl: number;
        fightBeforePos: number;
        fightConfig: number;
        equipInitGold: number;
        equipInitIds: number;
        trainSet: number;
        trainHp: number;
        shopExclusive: number;
        equipStrengthen: number;
        heroSort: number;
        trialSet: number;
        eCfg: number;
        secretShop1: number;
        secretShop2: number;
        shopReshCountResetHour: number;
        mirrorWorldSet: number;
        refreshTime: number;
        shopSellIds: number;
        guildSet: number;
        subGuide: number;
        exchangeSet: number;
        firstCharge: number;
        sevenSet: number;
        weakGuide: number;
        lootChanceSet: number;
        copyTaskHero: number;
        contactUs: number;
        guildIcon: number;
        mirrorWorldSet1: number;
        qqFriendSet: number;
        sharedCfg: number;
    };
    var id_c_msgCode: {
        noLvl: number;
        noGolds: number;
        noGolds2: number;
        noDiamond: number;
        noStrength: number;
        noHonor: number;
        enterCopyOnlyOnce: number;
        cantEnterCopyToday: number;
        noMatrix: number;
        useSuccess: number;
        noSomethingToUpLv: number;
        maxLv: number;
        heroLvlOverLord: number;
        skillLvlNotOutHero: number;
        noTrainItem: number;
        inputRoleName: number;
        sensitiveInRoleName: number;
        roleNameUsed: number;
        loginNoUser: number;
        loginNotNull: number;
        accountLengthNotCorrect: number;
        pwdLengthNotCorrect: number;
        loginFalse: number;
        regHasUser: number;
        pwdNotSame: number;
        regFalse: number;
        cRoleFalse: number;
        getRoleDataFalse: number;
        noLogin: number;
        regSucc: number;
        roleNameOutLenght: number;
        modifyNameTips: number;
        itemNoGetIfDelete: number;
        disconnect: number;
        connectFail: number;
        buySkillPoints: number;
        userFighting: number;
        addFightNum: number;
        refreshCDTime: number;
        refreshHonorShop: number;
        emailNotBind: number;
        sendPwdSucc: number;
        emailNotNull: number;
        emailValidErr: number;
        onGetItems: number;
        onSoldSuccess: number;
        noVipLvl: number;
        noIntegral: number;
        noFightNum: number;
        ifCostToFightSelf: number;
        noLogic: number;
        cantGetNow: number;
        notEnterTowerRanks: number;
        notEnterGuildRanks: number;
        rankChanged: number;
        diamondClearCDTime: number;
        diamondLottery1: number;
        diamondLottery10: number;
        coinLottery10: number;
        noOpen: number;
        noAward: number;
        ifHeroUp: number;
        nostone: number;
        heroLvMax: number;
        exclusiveLv: number;
        exclusivExpFull: number;
        unExclusivExp: number;
        exclusivExp1: number;
        exclusivExp2: number;
        ifHeroGet: number;
        equipNoStone: number;
        diamondForging: number;
        equipLvNoHero: number;
        strengLvNoEquip: number;
        noSystem: number;
        loginWordWrong: number;
        noItemTicket: number;
        noExclusive: number;
        openModule: number;
        easyNoPast: number;
        noCopyTimes: number;
        buyCopyTimes: number;
        noBuyTimes: number;
        notEnterHeroRanks: number;
        refreshShop: number;
        ifSaveSkillSettings: number;
        lessThan2Activen: number;
        noMoreThan2Activen: number;
        noMoreThan2Passive: number;
        saveSuccess: number;
        heroLvLess: number;
        ifTrainUp: number;
        haveTrainPoints: number;
        unGetHero: number;
        buyExclusive: number;
        enoughIntegral: number;
        pkNoManual: number;
        noChallengeLv: number;
        oneMost: number;
        noHero: number;
        trainHeroLvLess: number;
        noSaveTrainResult: number;
        cantRenew: number;
        renewAnother: number;
        ifUseTrialLogic: number;
        noChallengeTimes: number;
        noWinHero: number;
        noOpenNow: number;
        noPassOne: number;
        noPassPve: number;
        ifEnterHigher: number;
        winIfEnterHigher: number;
        recharge: number;
        ifFreeToFightSelf: number;
        cantLessThan5: number;
        ifRefreshTower: number;
        cantBuyMax: number;
        cantUseMax: number;
        noLvBuyGold: number;
        noLvBuyStrength: number;
        getRewardFail: number;
        rankFull: number;
        enteredNewSelf: number;
        timeEndRewardMail: number;
        challengeTimeOut: number;
        giveUpFightSelf: number;
        ifLeaveNow: number;
        noTimesToday: number;
        cdNoEnd: number;
        noRefreshTimes: number;
        openChallengePermission: number;
        leaveFail: number;
        leaveRewardMail: number;
        cantChallengeLower: number;
        ifRefreshCopy: number;
        noSameHero: number;
        robRewardMail: number;
        haveQuotaEnterSelf: number;
        userLeft: number;
        youLeft: number;
        traderLeft: number;
        tooFrequently: number;
        buyLimitNow: number;
        lvMaxCantUp: number;
        noHeroLvExclusiveCantUp: number;
        itemMaxCantGet: number;
        higherVipLvOpen: number;
        ifCostEnhanceOnetime: number;
        noLvlnoVip: number;
        preCopyNoPass: number;
        ifCostCalSign: number;
        cantGetNoCharge: number;
        cantGetNoDays: number;
        ifBuyLimitedItem: number;
        totalChargeNotEnough: number;
        totalChargeNotEnough1: number;
        totalCostNotEnough: number;
        engCostNotEnough: number;
        coinCostNotEnough: number;
        vipNotEnough: number;
        lvNotEnough: number;
        noCdKey: number;
        cdKeyRedeemed: number;
        alreadyGetcdKey: number;
        redeemRewardMail: number;
        activitiesEnd: number;
        accountLockout: number;
        deviceLockout: number;
        submitTooMany: number;
        noWord: number;
        wordsTooLong: number;
        illegalCharacte: number;
        ifQuitGuild: number;
        enterGuildCd: number;
        enterOriginalGuildCd: number;
        enterGuildTimesMax: number;
        cantGdisband: number;
        ifGdisband: number;
        guildNameIsNull: number;
        guildNameTooLong: number;
        guildNameIllegal: number;
        ifCreateGuild: number;
        guildIdIsNull: number;
        guildIdIsExist: number;
        guildMembersMax: number;
        noPermission: number;
        worshippedTimesMax: number;
        worshipTimesMax: number;
        ifRetiringGuildMaster: number;
        noReceivedReward: number;
        fireMembersMax: number;
        ifFireMember: number;
        positionsMax: number;
        quitedTheGuild: number;
        ifPromote: number;
        ifRelieve: number;
        relieveCd: number;
        MembersMax: number;
        otherGuildEntered: number;
        noticeTooLong: number;
        noticeMax: number;
        noMailTitle: number;
        noMailBody: number;
        MailTitleIllegal: number;
        MailBodyIllegal: number;
        MailTitleTooLong: number;
        MailBodyTooLong: number;
        applicationMax: number;
        guildNameSame: number;
        permissionRelieved: number;
        enterGuildNow: number;
        waitForApprove: number;
        sendFeedbackSucc: number;
        trialNoOpenToday: number;
        loggedInOtherDevice: number;
        noMaterial: number;
        noSkillPoints: number;
        canNotPutOn: number;
        errIfaceCode: number;
    };
    var id_c_open: {
        lottery: number;
        diamondLottery: number;
        vipLottery: number;
        hero: number;
        bag: number;
        mailbox: number;
        resetDailyTasks: number;
        resetDailyBuyCount: number;
        easyCopy: number;
        speed: number;
        skill: number;
        forge: number;
        train: number;
        clean: number;
        forgeExclusive: number;
        fragmentSynthesis: number;
        rank: number;
        arena: number;
        arenaNew: number;
        creamCopy: number;
        boss: number;
        tower: number;
        trainOfBlood: number;
        sign: number;
        blessing: number;
        occultSciences: number;
        shopExclusive: number;
        trial1: number;
        trial2: number;
        trial3: number;
        shop: number;
        secretShop1: number;
        secretShop2: number;
        arenaShop: number;
        towerShop: number;
        buyGold: number;
        buyStrength: number;
        exchangeExclusive: number;
        aKeyStrengthen: number;
        qqFriend: number;
    };
    var id_t_warrior: {
        h_13: number;
        h_17: number;
        h_16: number;
        h_18: number;
        h_14: number;
        h_15: number;
        h_19: number;
        h_20: number;
        h_21: number;
        h_22: number;
        h_23: number;
        h_24: number;
        h_25: number;
        h_26: number;
        h_27: number;
        h_28: number;
        h_29: number;
        h_30: number;
        h_31: number;
        h_32: number;
        h_33: number;
        h_34: number;
        h_35: number;
        h_36: number;
        h_37: number;
        h_38: number;
        h_39: number;
        h_40: number;
        h_41: number;
        h_42: number;
        h_43: number;
        h_44: number;
        h_45: number;
        h_46: number;
        h_47: number;
        h_48: number;
        h_49: number;
        h_50: number;
        h_51: number;
        h_52: number;
        h_53: number;
        h_54: number;
        m_1: number;
        m_2: number;
        m_3: number;
        m_4: number;
        m_5: number;
        m_6: number;
        m_7: number;
        m_8: number;
        m_9: number;
        m_10: number;
        m_11: number;
        m_12: number;
        m_13: number;
        m_14: number;
        m_16: number;
        m_17: number;
        m_18: number;
        m_19: number;
        m_20: number;
        m_21: number;
        m_22: number;
        m_23: number;
        m_24: number;
        m_25: number;
        m_26: number;
        h_1: number;
        h_2: number;
        h_3: number;
        h_4: number;
        h_5: number;
        h_6: number;
        h_7: number;
        h_8: number;
        h_9: number;
        h_10: number;
        h_11: number;
        h_12: number;
        m_27: number;
        m_28: number;
        m_29: number;
        m_30: number;
        m_31: number;
        m_32: number;
        m_33: number;
        m_34: number;
        m_35: number;
        m_36: number;
        m_37: number;
        m_38: number;
        m_39: number;
        m_40: number;
        m_41: number;
        m_42: number;
        m_43: number;
        m_44: number;
        m_45: number;
        m_46: number;
        m_47: number;
        m_48: number;
        m_49: number;
        m_50: number;
        m_51: number;
        m_52: number;
        m_53: number;
        m_54: number;
        m_55: number;
        m_56: number;
        m_57: number;
        m_58: number;
        m_59: number;
        m_60: number;
        m_61: number;
        m_62: number;
        m_63: number;
        m_64: number;
        m_65: number;
    };
    var id_c_loadModule: {
        runtimeStart: number;
        gameZipLoaded: number;
        login: number;
        film: number;
        simulateFight: number;
        createRole: number;
        home: number;
        lottery: number;
        copy: number;
        embattle: number;
        firstFight: number;
    };
}
declare module uw {
    var iface: {
        a_arena_getArena: string;
        a_arena_resetArenaFightRanks: string;
        a_arena_fightStart: string;
        a_arena_fightStart_args: {
            rank: string;
        };
        a_arena_fightEnd: string;
        a_arena_fightEnd_args: {
            isWin: string;
            vData: string;
        };
        a_arena_getFightData: string;
        a_arena_getFightData_args: {
            id: string;
        };
        a_arena_getRecordList: string;
        a_arena_getRecordList_args: {
            index: string;
            count: string;
        };
        a_arena_getArenaRanks: string;
        a_arena_getArenaRanks_args: {
            index: string;
            count: string;
        };
        a_arena_getArenaLuckRanks: string;
        a_copy_fightStart: string;
        a_copy_fightStart_args: {
            copyId: string;
        };
        a_copy_fightEnd: string;
        a_copy_fightEnd_args: {
            isWin: string;
            vData: string;
        };
        a_copy_wipe: string;
        a_copy_wipe_args: {
            copyId: string;
            count: string;
        };
        a_copy_getCopyProgressList: string;
        a_copy_resetCopyCount: string;
        a_copy_resetCopyCount_args: {
            copyId: string;
        };
        a_copy_resetPCopyCD: string;
        a_copy_resetPCopyCD_args: {
            pCopyId: string;
        };
        a_hero_upQuality: string;
        a_hero_upQuality_args: {
            heroId: string;
        };
        a_hero_upSkill: string;
        a_hero_upSkill_args: {
            heroId: string;
            pos: string;
        };
        a_hero_getList: string;
        a_hero_getList_args: {
            matrixType: string;
        };
        a_hero_getInfo: string;
        a_hero_getInfo_args: {
            heroId: string;
        };
        a_hero_train: string;
        a_hero_train_args: {
            heroId: string;
            type: string;
        };
        a_hero_saveTrain: string;
        a_hero_saveTrain_args: {
            heroId: string;
        };
        a_hero_upTrainLvl: string;
        a_hero_upTrainLvl_args: {
            heroId: string;
        };
        a_hero_putOnEquip: string;
        a_hero_putOnEquip_args: {
            heroId: string;
            equipId: string;
            part: string;
        };
        a_hero_putDownEquip: string;
        a_hero_putDownEquip_args: {
            heroId: string;
            equipId: string;
        };
        a_hero_callHero: string;
        a_hero_callHero_args: {
            tempId: string;
        };
        a_hero_upExclusiveEquip: string;
        a_hero_upExclusiveEquip_args: {
            items: string;
            equipIds: string;
            equipId: string;
            isVip: string;
        };
        a_hero_changeMorePos: string;
        a_hero_changeMorePos_args: {
            posDic: string;
            matrixType: string;
        };
        a_hero_buyNormalEquip: string;
        a_hero_buyNormalEquip_args: {
            heroId: string;
            part: string;
        };
        a_item_sellItem: string;
        a_item_sellItem_args: {
            itemId: string;
            num: string;
        };
        a_item_sellItems: string;
        a_item_sellItems_args: {
            items: string;
        };
        a_item_sellEquip: string;
        a_item_sellEquip_args: {
            equipId: string;
        };
        a_item_use: string;
        a_item_use_args: {
            heroId: string;
            itemId: string;
            itemNum: string;
        };
        a_item_getEquipInfo: string;
        a_item_getEquipInfo_args: {
            equipId: string;
        };
        a_item_getEquipInfoByPart: string;
        a_item_getEquipInfoByPart_args: {
            heroId: string;
            part: string;
        };
        a_item_getNotOnEquipList: string;
        a_item_getOnEquipList: string;
        a_item_getOnEquipList_args: {
            heroId: string;
        };
        a_item_getAllEquipList: string;
        a_user_changeIcon: string;
        a_user_changeIcon_args: {
            iconId: string;
        };
        a_user_getIconIds: string;
        a_user_buyStrength: string;
        a_user_createUser: string;
        a_user_createUser_args: {
            name: string;
            ip: string;
        };
        a_user_buySkillPoints: string;
        a_user_changeName: string;
        a_user_changeName_args: {
            name: string;
        };
        a_user_getFullUserInfo: string;
        a_user_getTask: string;
        a_user_getTaskReward: string;
        a_user_getTaskReward_args: {
            taskId: string;
        };
        a_user_updateGuide: string;
        a_user_updateGuide_args: {
            guide: string;
        };
        a_user_updateSubGuide: string;
        a_user_updateSubGuide_args: {
            groupId: string;
        };
        a_user_saveSecretMatrix: string;
        a_user_saveSecretMatrix_args: {
            index: string;
            ids: string;
        };
        a_user_buyExclusiveEquip: string;
        a_user_buyExclusiveEquip_args: {
            tempId: string;
            thisFragId: string;
            fragMap: string;
        };
        a_user_buyGold: string;
        a_user_buyGold_args: {
            num: string;
        };
        a_user_sign: string;
        a_user_getDefenceSecretSkills: string;
        a_user_getDefenceSecretSkills_args: {
            userId: string;
            matrixType: string;
        };
        a_user_updateSecret: string;
        a_user_updateSecret_args: {
            matrixType: string;
            secret: string;
        };
        a_tower_getInfo: string;
        a_tower_fightStart: string;
        a_tower_fightEnd: string;
        a_tower_fightEnd_args: {
            isWin: string;
            vData: string;
        };
        a_tower_resetLayer: string;
        a_tower_autoFight: string;
        a_tower_openChest: string;
        a_lottery_getInfo: string;
        a_lottery_takeOne: string;
        a_lottery_takeOne_args: {
            type: string;
        };
        a_lottery_takeTen: string;
        a_lottery_takeTen_args: {
            type: string;
        };
        a_rank_getRanks: string;
        a_rank_getRanks_args: {
            type: string;
            guildId: string;
        };
        a_rank_getMaxTowerRank: string;
        a_feedback_feed: string;
        a_feedback_feed_args: {
            content: string;
        };
        a_feedback_getList: string;
        a_shop_getInfo: string;
        a_shop_buy: string;
        a_shop_buy_args: {
            type: string;
            index: string;
            num: string;
        };
        a_shop_refresh: string;
        a_shop_refresh_args: {
            type: string;
        };
        a_shop_getItems: string;
        a_shop_getItems_args: {
            type: string;
        };
        a_equip_strengthen: string;
        a_equip_strengthen_args: {
            heroId: string;
            part: string;
            isAuto: string;
        };
        a_equip_up: string;
        a_equip_up_args: {
            heroId: string;
            part: string;
        };
        a_trial_fightStart: string;
        a_trial_fightStart_args: {
            copyId: string;
        };
        a_trial_fightEnd: string;
        a_trial_fightEnd_args: {
            isWin: string;
            vData: string;
        };
        a_exchange_getInfo: string;
        a_exchange_exchange: string;
        a_exchange_exchange_args: {
            exchangeId: string;
            count: string;
        };
        a_recharge_getInfo: string;
        a_recharge_recharge: string;
        a_recharge_recharge_args: {
            rechargeId: string;
            channel: string;
            receiptData: string;
        };
        a_recharge_getTodayCount: string;
        a_recharge_getAllCount: string;
        a_recharge_getRequest: string;
        a_recharge_getRequest_args: {
            rechargeId: string;
        };
        a_recharge_handleRequest: string;
        a_mirror_getRanks: string;
        a_mirror_getRanks_args: {
            type: string;
            page: string;
        };
        a_mirror_getMyRank: string;
        a_mirror_pveStart: string;
        a_mirror_pveStart_args: {
            type: string;
        };
        a_mirror_pveEnd: string;
        a_mirror_pveEnd_args: {
            type: string;
            isWin: string;
            vData: string;
        };
        a_mirror_enterHigher: string;
        a_mirror_stayThere: string;
        a_mirror_pvpPrepare: string;
        a_mirror_pvpPrepare_args: {
            type: string;
            enemyId: string;
        };
        a_mirror_pvpCancel: string;
        a_mirror_pvpStart: string;
        a_mirror_pvpEnd: string;
        a_mirror_pvpEnd_args: {
            isWin: string;
            vData: string;
        };
        a_mirror_getDefenceHistory: string;
        a_mirror_getDefenceReward: string;
        a_mirror_getDefenceReward_args: {
            time: string;
        };
        a_mirror_giveWay: string;
        a_mirror_calMirrorDefence: string;
        a_mail_getList: string;
        a_mail_pickItems: string;
        a_mail_pickItems_args: {
            mailId: string;
        };
        a_mail_setRead: string;
        a_mail_setRead_args: {
            mailId: string;
        };
        a_mail_del: string;
        a_mail_del_args: {
            mailId: string;
        };
        a_mail_getIsNeedOperate: string;
        a_mail_getIsNeedOperate_args: {
            mailId: string;
        };
        c_account_enterGame: string;
        c_account_enterGame_args: {
            name: string;
            password: string;
            channelId: string;
        };
        c_account_enterGameBySdk: string;
        c_account_enterGameBySdk_args: {
            channelId: string;
            sdkData: string;
            deviceId: string;
        };
        c_account_kick: string;
        c_account_kick_args: {
            vKey: string;
            accountId: string;
        };
        c_account_onlineCount: string;
        c_account_onlineCount_args: {
            vKey: string;
        };
        c_account_isOnline: string;
        c_account_isOnline_args: {
            vKey: string;
            accountIds: string;
        };
        h_server_getServerList: string;
        h_server_getServersByIds: string;
        h_server_getServersByIds_args: {
            ids: string;
        };
        h_server_getServerInfo: string;
        h_server_getServerInfo_args: {
            id: string;
        };
        h_server_getNewServer: string;
        h_server_getNewServer_args: {
            id: string;
        };
        h_server_getServerDate: string;
        h_account_login: string;
        h_account_login_args: {
            name: string;
            password: string;
            channelId: string;
        };
        h_account_loginBySdk: string;
        h_account_loginBySdk_args: {
            channelId: string;
            sdkData: string;
            deviceId: string;
        };
        h_account_register: string;
        h_account_register_args: {
            name: string;
            password: string;
            deviceId: string;
            channelId: string;
        };
        h_account_autoRegister: string;
        h_account_autoRegister_args: {
            channelId: string;
            deviceId: string;
        };
        h_account_getPwd: string;
        h_account_getPwd_args: {
            email: string;
        };
        h_user_getArenaRanks: string;
        h_user_getArenaRanks_args: {
            index: string;
            count: string;
        };
        h_user_getArenaLuckRanks: string;
        h_notice_getNewOneByServerId: string;
        h_notice_getNewOneByServerId_args: {
            serverId: string;
        };
        h_gate_dispatcher: string;
        h_gameConfig_gameConfig: string;
        h_gameRecord_addLoadRecord: string;
        h_gameRecord_addLoadRecord_args: {
            moduleId: string;
            deviceId: string;
            channelId: string;
        };
        a_userRecord_addLoadRecord: string;
        a_userRecord_addLoadRecord_args: {
            moduleId: string;
        };
        a_activity_getFirstRecharge: string;
        a_activity_receiveFirstRecharge: string;
        a_activity_getSevenLogin: string;
        a_activity_receiveSevenLogin: string;
        a_activity_getMainList: string;
        a_activity_receive: string;
        a_activity_receive_args: {
            activityId: string;
            index: string;
        };
        a_activity_useCoupon: string;
        a_activity_useCoupon_args: {
            code: string;
        };
    };
}
declare module res {
    var logo_jpg: string;
    var defaultHero_png: string;
    var levelNum_png: string;
    var pageOff_png: string;
    var pageOn_png: string;
    var FrozenShader_fsh: string;
    var FrozenShader_vsh: string;
    var GaussianBlur_fsh: string;
    var GaussianBlur_vsh: string;
    var GrayScalingShader_fsh: string;
    var GrayScalingShader_vsh: string;
    var MirrorShader_fsh: string;
    var MirrorShader_vsh: string;
    var PoisonShader_fsh: string;
    var PoisonShader_vsh: string;
    var StoneShader_fsh: string;
    var StoneShader_vsh: string;
}
declare module uw {
    var copyBelong: {
        "1": number[];
        "2": number[];
        "3": number[];
        "4": number[];
        "5": number[];
        "6": number[];
        "7": number[];
        "8": number[];
        "9": number[];
        "10": number[];
        "11": number[];
        "12": number[];
        "13": number[];
        "14": number[];
        "101": number[];
        "102": number[];
        "103": number[];
        "104": number[];
        "105": number[];
        "106": number[];
        "107": number[];
        "108": number[];
        "109": number[];
        "110": number[];
        "111": number[];
        "112": number[];
        "113": number[];
        "114": number[];
        "201": number[];
        "203": number[];
        "205": number[];
        "210": number[];
        "220": number[];
        "230": number[];
        "300": number[];
    };
}
declare module res {
    var uiAlchemyItem_ui: string;
    var uiAlchemyLayer_ui: string;
    var uiAlchemyTipLayer_ui: string;
    var uiArenaHighestRecordDlg_ui: string;
    var uiArenaHonorShopLayer_ui: string;
    var uiArenaLayer_ui: string;
    var uiArenaLuckRankItem_ui: string;
    var uiArenaLuckRankItem1_ui: string;
    var uiArenaLuckRankLayer_ui: string;
    var uiArenaRankItem_ui: string;
    var uiArenaRankLayer_ui: string;
    var uiArenaRecordItem_ui: string;
    var uiArenaRecordLayer_ui: string;
    var uiArenaRuleItem_ui: string;
    var uiArenaRuleLayer_ui: string;
    var uiBagItem1_ui: string;
    var uiBagLayer_ui: string;
    var uiBagMaterialDlg_ui: string;
    var uiBagQueryLayer_ui: string;
    var uiBagSaleItemDlg_ui: string;
    var uiBorderLayer_ui: string;
    var uiChestInfo_ui: string;
    var uiChooseHero_ui: string;
    var uiConfirmLayer_ui: string;
    var uiCopyInfo_ui: string;
    var uiCopyLayer_ui: string;
    var uiCopyWipeOutLayer_ui: string;
    var uiCreateRoleLayer_ui: string;
    var uiEmbattleLayer_ui: string;
    var uiEventCharge_ui: string;
    var uiEventFirstRechargeLayer_ui: string;
    var uiEventLimitBuy_ui: string;
    var uiEventRedeemCode_ui: string;
    var uiEventSevenDayItem_ui: string;
    var uiEventSevenDayLayer_ui: string;
    var uiEventText_ui: string;
    var uiEventUpLvl_ui: string;
    var uiEventWonderfulItem1_ui: string;
    var uiEventWonderfulItem2_ui: string;
    var uiEventWonderfulLayer_ui: string;
    var uiEventWonderfulTabItem_ui: string;
    var uiExchangeDlg_ui: string;
    var uiExchangeItem_ui: string;
    var uiExchangeShopLayer_ui: string;
    var uiFeedBackItem_ui: string;
    var uiFeedBackLayer_ui: string;
    var uiFightDemoLayer_ui: string;
    var uiFightPauseLayer_ui: string;
    var uiFightReplyLayer_ui: string;
    var uiFightResultLayer_ui: string;
    var uiFightStartLayer_ui: string;
    var uiFightTalkLayer_ui: string;
    var uiFightUILayer_ui: string;
    var uiForgeExchange_ui: string;
    var uiForgeExclusive_ui: string;
    var uiForgeExclusiveGetDlg_ui: string;
    var uiForgeExclusiveShop_ui: string;
    var uiForgeExclusiveSuccDlg_ui: string;
    var uiForgeHelpLayer_ui: string;
    var uiForgeHeroIcon_ui: string;
    var uiForgeLayer_ui: string;
    var uiForgeShopItem_ui: string;
    var uiFragmentCopyItem_ui: string;
    var uiGainTips_ui: string;
    var uiGetItemDlg_ui: string;
    var uiGuideNPCTalk1_ui: string;
    var uiGuideNPCTalk2_ui: string;
    var uiHeadItem_ui: string;
    var uiHeroDetail_ui: string;
    var uiHeroEquipShop_ui: string;
    var uiHeroExclusiveEquip_ui: string;
    var uiHeroExpcItemList_ui: string;
    var uiHeroFragment_ui: string;
    var uiHeroIcon_ui: string;
    var uiHeroInfoLayer_ui: string;
    var uiHeroItem_new_ui: string;
    var uiHeroList_new_ui: string;
    var uiHeroPropItem_ui: string;
    var uiHeroTrain_ui: string;
    var uiHeroTrainProp_ui: string;
    var uiHeroTrainSuccDlg_ui: string;
    var uiHeroUpGradeDlg_ui: string;
    var uiHeroWishEquip_ui: string;
    var uiHomeBackgroundLayer_ui: string;
    var uiHomeLayer_ui: string;
    var uiHomeLevelUpLayer_ui: string;
    var uiHomeMenuLayer_ui: string;
    var uiIndexForgetPwdLayer_ui: string;
    var uiIndexLayer_ui: string;
    var uiIndexLoginLayer_ui: string;
    var uiIndexRegisterLayer_ui: string;
    var uiIndexSelectServerItem_ui: string;
    var uiIndexSelectServerLayer_ui: string;
    var uiInfoTip_ui: string;
    var uiItemIcon_ui: string;
    var uiLoadingLayer_ui: string;
    var uiLotteryLayer_ui: string;
    var uiLotteryResultLayer_ui: string;
    var uiLotteryShowHeroLayer_ui: string;
    var uiMailBoxLayer_ui: string;
    var uiMailItem_ui: string;
    var uiMaterialItem_ui: string;
    var uiMirrorAtkRankItem_ui: string;
    var uiMirrorAtkRankLayer_ui: string;
    var uiMirrorChooseDlg_ui: string;
    var uiMirrorDefRecordDlg_ui: string;
    var uiMirrorDefRecordItem_ui: string;
    var uiMirrorHelpLayer_ui: string;
    var uiMirrorInfoDlg_ui: string;
    var uiMirrorLayer_ui: string;
    var uiMirrorRewardDlg_ui: string;
    var uiNoticeLayer_ui: string;
    var uiPickupItem_ui: string;
    var uiQuestItem_ui: string;
    var uiQuestLayer_ui: string;
    var uiRankGuildInfoLayer_ui: string;
    var uiRankGuildItem_ui: string;
    var uiRankHeroItem_ui: string;
    var uiRankLayer_ui: string;
    var uiRankLeaderInfoLayer_ui: string;
    var uiRankRuleLayer_ui: string;
    var uiRankTowerItem_ui: string;
    var uiResBarLayer_ui: string;
    var uiSecretItem_ui: string;
    var uiSecretItem2_ui: string;
    var uiSecretLayer_ui: string;
    var uiSecretRuleLayer_ui: string;
    var uiSecretShopAppearDlg_ui: string;
    var uiSecretShopLayer_ui: string;
    var uiSecretTipsDlg_ui: string;
    var uiSecretTuneDlg_ui: string;
    var uiShopItem_ui: string;
    var uiShopItemDetail_ui: string;
    var uiShopLayer_ui: string;
    var uiSignItem_ui: string;
    var uiSignLayer_ui: string;
    var uiSkillIcon_ui: string;
    var uiSkillInfoTip_ui: string;
    var uiSundryDlg_ui: string;
    var uiSundryItem_ui: string;
    var uiTipLayer_ui: string;
    var uiTowerLayer_ui: string;
    var uiTowerRuleLayer_ui: string;
    var uiTowerShopLayer_ui: string;
    var uiTowerWipeOutLayer_ui: string;
    var uiTrialCopy_ui: string;
    var uiTrialCopyItem_ui: string;
    var uiTrialPCopy_ui: string;
    var uiUnionCZTab_ui: string;
    var uiUnionCreateTab_ui: string;
    var uiUnionJoinItem_ui: string;
    var uiUnionJoinTab_ui: string;
    var uiUnionNo_ui: string;
    var uiUnionSearchTab_ui: string;
    var uiUpSkill_ui: string;
    var uiUpSkillItem_ui: string;
    var uiUseItemCell_ui: string;
    var uiUseItemDlg_ui: string;
    var uiUserInfoLayer_ui: string;
    var uiUserModifyHeadItem_ui: string;
    var uiUserModifyHeadLayer_ui: string;
    var uiUserModifyNameLayer_ui: string;
    var uiVipChargeItemCell_ui: string;
    var uiVipDetailItemCell_ui: string;
    var uiVipLayer_ui: string;
    var uiWipeOutItem_ui: string;
}
declare module gEventType {
    var homeFoldMenuOpen: string;
    var showLotteryBtns: string;
    var appearRandSkillsWhenEnter: string;
    var nextRound: string;
    var appearRandSkill: string;
    var openSysBtns: string;
    var refreshTasks: string;
    var starAction: string;
    var showHeroLeft: string;
    var switchCopyDifficulty: string;
    var beginOpenSysBtns: string;
    var skillLight: string;
    var skillDark: string;
    var skillPlayed: string;
    var fightEnd: string;
    var secretEffEnd: string;
}
declare module uw {
    var heroTid: {
        h_13: string;
        h_17: string;
        h_16: string;
        h_18: string;
        h_14: string;
        h_15: string;
        h_19: string;
        h_20: string;
        h_21: string;
        h_22: string;
        h_23: string;
        h_24: string;
        h_25: string;
        h_26: string;
        h_27: string;
        h_28: string;
        h_29: string;
        h_30: string;
        h_31: string;
        h_32: string;
        h_33: string;
        h_34: string;
        h_35: string;
        h_36: string;
        h_37: string;
        h_38: string;
        h_39: string;
        h_40: string;
        h_41: string;
        h_42: string;
        h_43: string;
        h_44: string;
        m_1: string;
        m_2: string;
        m_3: string;
        m_4: string;
        m_5: string;
        m_6: string;
        m_7: string;
        m_8: string;
        m_9: string;
        m_10: string;
        m_11: string;
        m_12: string;
        m_13: string;
        m_14: string;
        m_16: string;
        m_17: string;
        m_18: string;
        m_19: string;
        m_20: string;
        m_21: string;
        m_22: string;
        m_23: string;
        m_24: string;
        m_25: string;
        m_26: string;
        h_1: string;
        h_2: string;
        h_3: string;
        h_4: string;
        h_5: string;
        h_6: string;
        h_7: string;
        h_8: string;
        h_9: string;
        h_10: string;
        h_11: string;
        h_12: string;
        m_27: string;
        m_28: string;
        m_29: string;
        m_30: string;
        m_31: string;
        m_32: string;
        m_33: string;
        m_34: string;
        m_35: string;
        m_36: string;
        m_37: string;
        m_38: string;
        m_39: string;
        m_40: string;
        m_41: string;
        m_42: string;
        m_43: string;
        m_44: string;
        m_45: string;
        m_46: string;
        m_47: string;
        m_48: string;
        m_49: string;
        m_50: string;
        m_51: string;
        m_52: string;
        m_53: string;
        m_54: string;
        m_55: string;
        m_56: string;
        m_57: string;
        m_58: string;
        m_59: string;
        m_60: string;
        m_61: string;
        m_62: string;
        m_63: string;
        m_64: string;
        m_65: string;
    };
}
/**
 * Created by Administrator on 14-7-24.
 */
declare module uw {
    class __ImportFightConsts {
    }
    /**
     * 成员类型
     * @type {{HERO: number, MONSTER: number}}
     */
    var memberType: {
        HERO: number;
        MONSTER: number;
    };
    /**
     * 状态
     * @type {{NORMAL: number, MOVE: number, SKILL: number, DEATH: number}}
     */
    var memberStatus: {
        NORMAL: number;
        RUN: number;
        SKILL: number;
        DEATH: number;
    };
    var skillTargetType: {
        SELF: number;
        ENEMY: number;
    };
    var skillType: {
        PATTACK: number;
        MATTACK: number;
        HOLY: number;
        REPLAY: number;
    };
    var skillEffectType: {
        FIX: number;
        FLY: number;
        FLY_X: number;
        LINE: number;
        MOVE: number;
        SCALE_X_TARGET: number;
        PARABOLA: number;
    };
    var skillEffectAddRelative: {
        SELF: number;
        TARGET: number;
    };
    var skillEffecTargetType: {
        TARGET: number;
        FRONT_TARGET: number;
        SELF: number;
    };
    var pauseActionType: {
        ALL: number;
        MIX_SKILL: number;
        NOT_MIX_SKILL: number;
    };
    var targetObjectType: {
        SINGLE: number;
        RANDOM_1: number;
        RANDOM_2: number;
        RANDOM_3: number;
        RANDOM_HIT: number;
        MIN_HP: number;
        ALL: number;
        SELF: number;
        AREA_CIRCLE: number;
        AREA_POLYGON: number;
        FASTEST: number;
        MIN_PER_HP: number;
        MIN_LIFE: number;
        MIN_POWER: number;
        MIN_INTEL: number;
        MAX_LIFE: number;
        MAX_POWER: number;
        MAX_INTEL: number;
        FRONT_POS: number;
        BACK_POS: number;
    };
    var targetAreaType: {
        SELF: number;
        ENEMY: number;
    };
    var buffContinueType: {
        INTERVAL: number;
        NUM: number;
        TIME: number;
        HALO: number;
    };
    var buffStateType: {
        DEL_HP: number;
        DEL_ENERGY: number;
        CLEAR_NEGATIVE: number;
        CLEAR_POSITIVE: number;
        ADD_HP: number;
        ADD_ENERGY: number;
        ADD_ATTR: number;
        REDUCE_ATTR: number;
        ABS_P_HURT: number;
        ABS_M_HURT: number;
        REBOUND_HURT: number;
        STUN: number;
        SEAL: number;
        HIT_BACK: number;
        RE_P_ATTACK: number;
        RE_M_ATTACK: number;
        RE_P_ATTACK_HURT: number;
        RE_M_ATTACK_HURT: number;
        IGNORE_DEFENCE: number;
        REVIVAL: number;
        CONFUSION: number;
        BLIND: number;
        ABS_RELEASE: number;
        INVINCIBILITY: number;
        RANDOM_HURT: number;
        CROW: number;
        CALL: number;
        ICE_WALL: number;
        FIRE_LAND: number;
        FREEZE: number;
        ADD_ATTACK_SPEED: number;
        DEL_ATTACK_SPEED: number;
        ADD_MOVE_SPEED: number;
        DEL_MOVE_SPEED: number;
        CLONE_1: number;
        CLONE_2: number;
        CLONE_3: number;
        TELEPORT: number;
        LIMIT_MOVE: number;
        SHARE_HP: number;
        STONE: number;
        UP_DOWN: number;
        RE_STUN: number;
        SKILL_ONE: number;
        RATE_REVIVAL: number;
        CLONE_1_RE_P_ATTACK: number;
        ATTACK_REBOUND_HURT: number;
        SLEEP: number;
        SPACE: number;
        PULL: number;
        RE_P_ATTACK_HURT_M_ATTACK_HURT: number;
        ADD_HP_BY_LIFE: number;
        M_EXTRA_DAMAGE: number;
        INVINCIBLE: number;
        CHANGE_BODY: number;
        ADD_BUFF: number;
        MOVE_CIRCLE_OUT: number;
    };
    var buffValueType: {
        PER: number;
        FIX: number;
    };
    var buffSide: {
        NONE: number;
        POSITIVE: number;
        NEGATIVE: number;
    };
    var skillDisplayType: {
        NORMAL: number;
        SKILL: number;
        MIX: number;
        SECRET: number;
    };
    var skillPassiveType: {
        NONE: number;
        CRIT: number;
        MISS: number;
        RE_HP: number;
        FIGHT_BEFORE: number;
        ATTACK: number;
        HIT: number;
        DEATH_ONE: number;
        EVERY_DEATH: number;
        DEATH_MORE: number;
        ALL_IN_AREA: number;
    };
    var skillAction: {
        NONE: number;
        NORMAL_ATTACK: number;
        UNIQUE_ATTACK: number;
        SKILL_ATTACK1: number;
        SKILL_ATTACK2: number;
        SKILL_ATTACK3: number;
    };
    /**
     * 站位类型，前中后
     * @type {{FRONT: number, MID: number, AFTER: number}}
     */
    var posOrderType: {
        FRONT: number;
        MID: number;
        AFTER: number;
    };
    /**
     * 动作顺序规则
     */
    var actionRule: {
        AUTO: number;
        INSERT_RE_HP: number;
    };
    /**
     * 固定技能
     */
    var fixSkillId: {
        ID_34000: number;
        ID_30200: number;
        ID_30800: number;
    };
    var roleZOrder: {
        SHADOW: number;
        ARMATURE: number;
        BUFF: number;
        BLOOD: number;
        WORD: number;
    };
}
declare module res.ui_panel {
    var tmp_eqp_png: string;
}
declare module res.ui_common {
    var tmp_blk9_q_png: string;
    var fragmentTag: {};
}
declare module res.ui_home {
    var critx_png: string;
}
declare module res.ui_login {
    var tmp_tag_png: string;
}
declare module res.ui_hero {
    var tmp_png: string;
    var tmp_job_png: string;
    var tmp_quality_bg_png: string;
}
declare module res.ui_arena {
    var tmp_num_r_png: string;
    var tmp_num_rank_png: string;
}
declare module res.ui_trial {
    var tmp_bg_cCopy_png: string;
}
declare module res.ui_mt {
    var tmp_ico_lvl_png: string;
}
declare module res.ui_daily {
    var tmp_vip_level_png: string;
}
declare module res.ui_event {
    var tit_limit_png: string;
    var tit_charge_png: string;
    var tit_cost_png: string;
    var tit_upLvl_png: string;
    var tit_redeem_png: string;
    var tit_arena_png: string;
    var tit_suggest_png: string;
    var tit_txtBug_png: string;
    var tit_bigPrize_png: string;
}
declare module res.ui_fight {
    var temp_fight_buff_blood_png: string;
    var temp_fight_debuff_blood_png: string;
    var temp_fight_energy_png: string;
    var temp_fight_txt_png: string;
}
/********** 边框资源 *************/
declare module res {
    var borderRankFrameName: {
        1: string;
        2: string;
        3: string;
        999: string;
    };
}
/********* 金币，钻石，领主经验图标 **********/
declare module res {
    var SpecialItemIcon: {
        gold: string;
        diamond: string;
        strength: string;
        userExpc: string;
        honor: string;
        towerPoints: string;
        towerInvite: string;
        sweepingTickets: string;
        pointer: string;
        fragmentMask: string;
        taskMask: string;
    };
}
/********* 其他按钮资源 **********/
declare module res {
    var BagOtherBtnFrameName: {
        sale: string;
        use: string;
        detail: string;
        inlay: string;
        puton: string;
        mix: string;
    };
}
/********** ui相关的cca的编号 *********/
declare module res {
    var cca_buff: {
        stateUp: number;
        stateDown: number;
        stun: number;
        magicShield: number;
        magicShield1: number;
        magicShield2: number;
        physicalShield: number;
        chaos: number;
        shield: number;
        curse: number;
        poison: number;
        blind: number;
        dkShield: number;
        sheep: number;
        bounce: number;
        huangQiu: number;
        normalSkill: number;
        normalUnique: number;
        limitMove: number;
        shareHp: number;
        burn: number;
        sleep: number;
        space: number;
        addAttack: number;
        wine: number;
        backShadow: number;
        powerShield: number;
        hellFire: number;
    };
}
declare module res {
    var cca_ui: {
        building_arena: number;
        building_copy: number;
        building_mirrorWorld: number;
        building_shop: number;
        building_tower: number;
        building_valley: number;
        building_wishingWel: number;
        building_forgingFactory: number;
        building_secretShop: number;
        effect_water: number;
        effect_getHero: number;
        effect_upSkill: number;
        effect_upEquip: number;
        fight_movingSkill: number;
        fight_skillAble: number;
        fight_skillSkipper: number;
        fight_skillReady: number;
        fight_failed: number;
        trialFireEffect: number;
        userLevelUp: number;
        getExclusiveTitle: number;
        getExclusiveItem: number;
        heroLevelUp: number;
        showSecretShop: number;
        showBuildingTitle: number;
        heroCanCall: number;
        greenArrow: number;
        qualityUp: number;
        LevelUp: number;
        secretUp: number;
        exclusiveUp: number;
        towerHighest: number;
        secretActive: number;
        goldChest: number;
        diamondChest: number;
        chestItemLight: number;
        mainMenu: number;
        openModule: number;
        movie1: number;
        movie2: number;
        movie3: number;
        movie4: number;
        movie5: number;
        dice: number;
        contract: number;
        canSign: number;
        upgradable: number;
        awaken: number;
        npc: number;
        energyBall: number;
        runningMan: number;
        runningDragon: number;
        secretIconOpen: number;
        fightMixFull: number;
    };
}
/**
 * ui音效相关。
 */
declare module res {
    var audio_ui: {
        bg_home: number;
        bg_fight: number;
        bg_arena: number;
        bg_film: number;
        btn_normal: number;
        btn_openDlg: number;
        dlg_closeDlg: number;
        btn_back: number;
        btn_openExtension: number;
        btn_closeExtension: number;
        input: number;
        menuOpen: number;
        menuClose: number;
        wear: number;
        buyItem: number;
        win: number;
        lose: number;
        cheer: number;
        rantStar1: number;
        rantStar2: number;
        rantStar3: number;
        skillReady: number;
        lottery: number;
        getHero: number;
        openTreasure: number;
        intensify: number;
        heroLevelUp1: number;
        heroLevelUp2: number;
        heroAbout: number;
        leaderLevelUp: number;
        getExclusive: number;
        secretShop: number;
        upSecretSkill: number;
        getTaskReward: number;
    };
}
declare module res {
    function resetFrameName(isScatterMode: any): void;
}
/**
 * Created by SmallAiTT on 2015/4/2.
 */
declare module uw.colorType {
    var none: string;
    var gray: string;
    var heroQualityMap: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
    };
    var itemQualityMap: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
    };
    var copyStateYellow: string;
}

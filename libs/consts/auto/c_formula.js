var uw;
(function (uw) {
    var max = function (num1, num2) {
        return Math.max.apply(Math, arguments);
    };
    var min = function (num1, num2) {
        return Math.min.apply(Math, arguments);
    };
    var pow = function (num1, num2) {
        return Math.pow.apply(Math, arguments);
    };
    var floor = function (num1) {
        return Math.floor.apply(Math, arguments);
    };
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
    function calPHurt(a, b, c, d, e, f, h, i) {
        return (max(a * 0.1 * (0.4 * b + 0.5), (max(0, a - c) * max(0.3, b - d) * (e / 100 + f))) + h);
    }
    uw.calPHurt = calPHurt;
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
    function calMHurt(a, b, c, d, e, f, h, i) {
        return (max(a * 0.1 * (0.4 * b + 0.5), (max(0, a - c) * max(0.3, b - d) * (e / 100 + f))) + h);
    }
    uw.calMHurt = calMHurt;
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
    function calMCure(a, b, c, d, e, f, h, i) {
        return a * e / 100 + h;
    }
    uw.calMCure = calMCure;
    /**
     * 命中公式,返回0~1
     * @param a 命中
     * @param b 闪避
     */
    function calHitRate(a, b) {
        return max(0.5, max(0, min(1, pow(max(0, (a + 1000 - b / 4)), 2) / (b + max(0, (a + 1000 - b / 4))) / 1000 * 0.99)));
    }
    uw.calHitRate = calHitRate;
    /**
     * 暴击,返回0~1
     * @param a 暴击
     * @param b 抗暴
     * @param  c 初始暴击
     * @param d 初始抗暴
     */
    function calCrit(a, b, c, d) {
        return min(1, max(0, c * c / (c + b + 0.01) / 1000 + max(0, max(0, a - c) - max(0, b - d)) / 1000));
    }
    uw.calCrit = calCrit;
    /**
     * 力量特殊额外伤害公式1
     * @param a 力量
     * @param b 力量
     * @param c 系数
     */
    function calSpHurtForPower1(a, b, c) {
        return max(0, (a - b) * c);
    }
    uw.calSpHurtForPower1 = calSpHurtForPower1;
    /**
     * 力量特殊额外伤害公式2
     * @param a 力量
     * @param b 系数
     */
    function calSpHurtForPower2(a, b) {
        return max(0, a * b);
    }
    uw.calSpHurtForPower2 = calSpHurtForPower2;
    /**
     * 智力特殊额外伤害公式1
     * @param a 智力
     * @param b 智力
     * @param c 系数
     */
    function calSpHurtForIntel1(a, b, c) {
        return max(0, (a - b) * c);
    }
    uw.calSpHurtForIntel1 = calSpHurtForIntel1;
    /**
     * 智力特殊额外伤害公式2
     * @param a 智力
     * @param b 系数
     */
    function calSpHurtForIntel2(a, b) {
        return max(0, a * b);
    }
    uw.calSpHurtForIntel2 = calSpHurtForIntel2;
    /**
     * 胜利评星公式
     * @param a 团队剩余血量总和
     * @param b 团队血量总和
     */
    function calStar(a, b) {
        return;
    }
    uw.calStar = calStar;
    /**
     * 生命
     * @param life 体质
     */
    function calHp(life) {
        return life * 20;
    }
    uw.calHp = calHp;
    /**
     * 物攻
     * @param str 力量
     */
    function calPAttack(str) {
        return str * 5;
    }
    uw.calPAttack = calPAttack;
    /**
     * 物防
     * @param str 力量
     */
    function calPDefence(str) {
        return str * 3;
    }
    uw.calPDefence = calPDefence;
    /**
     * 魔攻
     * @param lin 智力
     */
    function calMAttack(lin) {
        return lin * 5;
    }
    uw.calMAttack = calMAttack;
    /**
     * 魔防
     * @param lin 智力
     */
    function calMDefence(lin) {
        return lin * 3;
    }
    uw.calMDefence = calMDefence;
    /**
     * 购买体力钻石消耗公式
     * @param a 体力购买次数
     */
    function calBuyStrength(a) {
        return 50 + max(min(1, (a - 2)) * 50, 0) + max(min(1, (a - 10)) * 100, 0) + max(min(1, (a - 20)) * 100, 0) + max(min(1, (a - 30)) * 200, 0);
    }
    uw.calBuyStrength = calBuyStrength;
    /**
     * 购买金币钻石消耗公式
     * @param a 金币购买次数
     */
    function calBuyGoldDiamond(a) {
        return 10 + max(min(1, (a - 1)) * 10, 0) + max(min(1, (a - 3)) * 30, 0) + max(min(1, (a - 10)) * 50, 0) + max(min(1, (a - 25)) * 100, 0);
    }
    uw.calBuyGoldDiamond = calBuyGoldDiamond;
    /**
     * 购买金币获得公式
     * @param a 金币购买次数
     * @param gold 领主等级对应金币
     */
    function calBuyGold(a, gold) {
        return floor(gold * (1 + a / 25));
    }
    uw.calBuyGold = calBuyGold;
    /**
     * 装备栏强化消耗公式
     * @param a 强化等级
     * @param  x 装备栏对应系数
     */
    function calEquipColLvl(a, x) {
        return floor(((pow(a + a / 60, 2.5) * 0.5 + 10 * a) / 100 + 1) * x) * 100;
    }
    uw.calEquipColLvl = calEquipColLvl;
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
    function calCombatEff(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, s1, s2, s3, s4, k1, l1, m1, n1) {
        return floor((a * (1 + (k - 1.5) * 1 + g / 1000 * 0.25 + p / 100 * 0.25 + i / 1000 * 0.25) + c * (1 + (m - 1.5) * 1 + g / 1000 * 0.25 + p / 100 * 0.25 + i / 1000 * 0.25) + b * (1 + (l - 0.25) * 1 + h / 1000 * 0.25 + j / 1000 * 0.25) + d * (1 + (n - 0.25) * 1 + h / 1000 * 0.25 + j / 1000 * 0.25) + e / 2.5 * (1 + o / 100 * 0.5)) / 6 + (s1 + s2 + s3 + s4) * 10);
    }
    uw.calCombatEff = calCombatEff;
    /**
     * 宝石合成消耗公式
     * @param a 即将合成的宝石等级
     */
    function calGemMerger(a) {
        return floor(2 * pow(3, a - 2)) * 1000;
    }
    uw.calGemMerger = calGemMerger;
    /**
     * 购买竞技场挑战次数花费
     * @param a 购买次数
     */
    function calBuyArenaNum(a) {
        return 5 + a;
    }
    uw.calBuyArenaNum = calBuyArenaNum;
    /**
     * 专属煅造消耗金币
     * @param a 即将增加的专属经验值
     * @param  b 专属装备品质
     */
    function calExclusiveGold(a, b) {
        return floor(a * 56 * (1 + (b - 2)) / 100) * 100;
    }
    uw.calExclusiveGold = calExclusiveGold;
    /**
     * 专属一键煅造消耗钻石
     * @param a 升阶经验扣除当前经验
     * @param  b 专属装备品质
     */
    function calExclusiveDiamond(a, b) {
        return floor(a * (1 + (b - 2)));
    }
    uw.calExclusiveDiamond = calExclusiveDiamond;
    /**
     * 装备碎片合成花费金币
     * @param a 装备最低穿戴等级
     */
    function calEquipMerger(a) {
        return floor(a * 1000);
    }
    uw.calEquipMerger = calEquipMerger;
    /**
     * 专属升阶经验消耗公式
     * @param lv 即将升到的阶数
     * @param quality 专属原有品质
     */
    function calExclusiveLvExp(lv, quality) {
        return floor(0.2 * pow(1 + lv, 2.3) * (1 + pow(quality - 2, 1.4) * 0.6)) * 10;
    }
    uw.calExclusiveLvExp = calExclusiveLvExp;
    /**
     * 英雄进阶消耗金币
     * @param quality 即将升到的品质
     */
    function calHeroUpgradeGold(quality) {
        return floor(pow(quality, 2.5)) * 1000;
    }
    uw.calHeroUpgradeGold = calHeroUpgradeGold;
    /**
     * 专属装备拥有经验
     * @param lv 专属阶数
     * @param quality 专属原有品质
     * @param exp 当前经验
     */
    function calExclusiveLvItemExp(lv, quality, exp) {
        return floor(floor(0.6 * pow(1 + lv, 1.8) * (1 + pow(quality - 2, 1.4) * 0.5)) * 10 * (1 + (lv - 1) / 5)) + quality * 40 + exp;
    }
    uw.calExclusiveLvItemExp = calExclusiveLvItemExp;
    /**
     * 领主升级回复体力
     * @param lv 当前等级
     */
    function calUpStrength(lv) {
        return max(0, floor(pow(2.5 + lv / 10, 1.6)) * 5 - max(0, 200 * (6 - lv)));
    }
    uw.calUpStrength = calUpStrength;
    /**
     * 精英副本消耗钻石
     * @param time 次数
     */
    function calCopyDiamond(time) {
        return 20 + max(min(1, (time - 1)) * 30, 0) + max(min(1, (time - 3)) * 50, 0) + max(min(1, (time - 10)) * 100, 0) + max(min(1, (time - 15)) * 200, 0);
    }
    uw.calCopyDiamond = calCopyDiamond;
    /**
     * 竞技场历史最高排名钻石奖励
     * @param a 历史最高排名
     * @param b 当前排名
     */
    function calHistoryHighest(a, b) {
        return a - b;
    }
    uw.calHistoryHighest = calHistoryHighest;
    /**
     * 普通商店刷新消耗
     * @param a 购买次数
     */
    function calShopDiamond(a) {
        return 50 + max(min(1, (a - 2)) * 50, 0) + max(min(1, (a - 4)) * 100, 0) + max(min(1, (a - 12)) * 300, 0);
    }
    uw.calShopDiamond = calShopDiamond;
    /**
     * 神秘商店刷新消耗
     * @param a 购买次数
     */
    function calMysteryShopDiamond(a) {
        return 100 + max(min(1, (a - 2)) * 100, 0) + max(min(1, (a - 4)) * 300, 0) + max(min(1, (a - 12)) * 500, 0);
    }
    uw.calMysteryShopDiamond = calMysteryShopDiamond;
    /**
     * 竞技场商店刷新消耗
     * @param a 购买次数
     */
    function calArenaShopDiamond(a) {
        return 50 + max(min(1, (a - 2)) * 50, 0) + max(min(1, (a - 4)) * 100, 0) + max(min(1, (a - 12)) * 300, 0);
    }
    uw.calArenaShopDiamond = calArenaShopDiamond;
    /**
     * 培养进阶消耗金币
     * @param lv 即将升到的等级
     */
    function calTrainUp(lv) {
        return floor(pow(lv, 2.5)) * 1000;
    }
    uw.calTrainUp = calTrainUp;
    /**
     * 购买金币神秘商店2出现百分率
     * @param time 次数
     */
    function calShopSecret2(time) {
        return min(1, max(0, time - 4)) * (0.5 + time / 5);
    }
    uw.calShopSecret2 = calShopSecret2;
    /**
     * 补签消耗钻石
     * @param time 次数
     */
    function calSignDiamond(time) {
        return time * 10;
    }
    uw.calSignDiamond = calSignDiamond;
    /**
     * 虚空塔商店刷新消耗
     * @param a 购买次数
     */
    function calTowerShopDiamond(a) {
        return 100 + max(min(1, (a - 2)) * 100, 0) + max(min(1, (a - 4)) * 300, 0) + max(min(1, (a - 12)) * 500, 0);
    }
    uw.calTowerShopDiamond = calTowerShopDiamond;
})(uw || (uw = {}));

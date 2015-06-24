/*
这个文件需要跟config文件夹下面的frameName.js区分开来。
config中的是脚本自动生成的，而这个文件是手写的。为的是将代码中手动用到的frameName都规范到这里管理。
 */
var res;
(function (res) {
    var ui_panel;
    (function (ui_panel) {
        ui_panel.tmp_eqp_png = "ui_panel#eqp_%s.png";
    })(ui_panel = res.ui_panel || (res.ui_panel = {}));
})(res || (res = {}));
var res;
(function (res) {
    var ui_common;
    (function (ui_common) {
        ui_common.tmp_blk9_q_png = "ui_common#blk9_q_%s.png";
        ui_common.fragmentTag = {}; //碎片图标
        ui_common.fragmentTag[uw.c_prop.itemTypeKey.heroFragment] = res.ui_common.ntc_soulpieces_png;
        ui_common.fragmentTag[uw.c_prop.itemTypeKey.exclusiveFragment] = res.ui_common.ntc_pieces_png;
    })(ui_common = res.ui_common || (res.ui_common = {}));
})(res || (res = {}));
var res;
(function (res) {
    var ui_home;
    (function (ui_home) {
        ui_home.critx_png = "ui_home#critx%s.png";
    })(ui_home = res.ui_home || (res.ui_home = {}));
})(res || (res = {}));
var res;
(function (res) {
    var ui_login;
    (function (ui_login) {
        ui_login.tmp_tag_png = "ui_login#tag_%s.png";
    })(ui_login = res.ui_login || (res.ui_login = {}));
})(res || (res = {}));
var res;
(function (res) {
    var ui_hero;
    (function (ui_hero) {
        ui_hero.tmp_png = "ui_hero#%s.png";
        ui_hero.tmp_job_png = "ui_hero2#job_%s.png";
        ui_hero.tmp_quality_bg_png = "ui_hero2#quality_bg%s.png";
    })(ui_hero = res.ui_hero || (res.ui_hero = {}));
})(res || (res = {}));
var res;
(function (res) {
    var ui_arena;
    (function (ui_arena) {
        ui_arena.tmp_num_r_png = "ui_arena#num_r%s.png";
        ui_arena.tmp_num_rank_png = "ui_arena#num_rank%s.png";
    })(ui_arena = res.ui_arena || (res.ui_arena = {}));
})(res || (res = {}));
var res;
(function (res) {
    var ui_trial;
    (function (ui_trial) {
        ui_trial.tmp_bg_cCopy_png = "ui_trial#bg_pCopy_%s_%s.png";
    })(ui_trial = res.ui_trial || (res.ui_trial = {}));
})(res || (res = {}));
var res;
(function (res) {
    var ui_mt;
    (function (ui_mt) {
        ui_mt.tmp_ico_lvl_png = "ui_mt#ico_lvl_%s.png";
    })(ui_mt = res.ui_mt || (res.ui_mt = {}));
})(res || (res = {}));
var res;
(function (res) {
    var ui_daily;
    (function (ui_daily) {
        ui_daily.tmp_vip_level_png = "ui_daily#wrd_v%s.png";
    })(ui_daily = res.ui_daily || (res.ui_daily = {}));
})(res || (res = {}));
var res;
(function (res) {
    var ui_event;
    (function (ui_event) {
        ui_event.tit_limit_png = "ui_event#tit_type1.png";
        ui_event.tit_charge_png = "ui_event#tit_type2.png";
        ui_event.tit_cost_png = "ui_event#tit_type3.png";
        ui_event.tit_upLvl_png = "ui_event#tit_type4.png";
        ui_event.tit_redeem_png = "ui_event#tit_type5.png";
        ui_event.tit_arena_png = "ui_event#tit_type6.png";
        ui_event.tit_suggest_png = "ui_event#tit_type7.png";
        ui_event.tit_txtBug_png = "ui_event#tit_type8.png";
        ui_event.tit_bigPrize_png = "ui_event#tit_type9.png";
    })(ui_event = res.ui_event || (res.ui_event = {}));
})(res || (res = {}));
var res;
(function (res) {
    var ui_fight;
    (function (ui_fight) {
        ui_fight.temp_fight_buff_blood_png = "ui_fight#fight_buff_blood_%s.png";
        ui_fight.temp_fight_debuff_blood_png = "ui_fight#fight_debuff_blood_%s.png";
        ui_fight.temp_fight_energy_png = "ui_fight#fight_energy_%s.png";
        ui_fight.temp_fight_txt_png = "ui_fight#fight_txt_%s.png";
    })(ui_fight = res.ui_fight || (res.ui_fight = {}));
})(res || (res = {}));
/********** 边框资源 *************/
var res;
(function (res) {
    res.borderRankFrameName = {
        1: res.ui_panel.blk_headgold_png,
        2: res.ui_panel.blk_headcooper_png,
        3: res.ui_panel.blk_headsilver_png,
        999: res.ui_panel.blk_headnormal_png
    };
})(res || (res = {}));
/********* 金币，钻石，领主经验图标 **********/
var res;
(function (res) {
    res.SpecialItemIcon = {
        gold: res.ui_common.ico_gold_png,
        diamond: res.ui_common.ico_diamond_png,
        strength: res.ui_common.ico_strength_png,
        userExpc: res.ui_panel.leaderExp_png,
        honor: res.ui_common.ico_honor_png,
        towerPoints: res.ui_common.ico_royalcoin_png,
        towerInvite: res.ui_common.ico_royalpass_png,
        sweepingTickets: res.ui_common.ico_sweeping_png,
        pointer: res.ui_panel.point_png,
        fragmentMask: res.ui_panel.cov_scrap_png,
        taskMask: res.ui_panel.cov_task_png
    };
})(res || (res = {}));
/********* 其他按钮资源 **********/
var res;
(function (res) {
    res.BagOtherBtnFrameName = {
        sale: res.ui_btn.btn_sale_png,
        use: res.ui_btn.btn_use_png,
        detail: res.ui_btn.btn_detail_png,
        inlay: res.ui_btn.btn_inlay_png,
        puton: res.ui_btn.btn_putOn_png,
        mix: res.ui_btn.btn_commix_png
    };
})(res || (res = {}));
/********** ui相关的cca的编号 *********/
var res;
(function (res) {
    res.cca_buff = {
        stateUp: 6004,
        stateDown: 6003,
        stun: 6007,
        magicShield: 6009,
        magicShield1: 6048,
        magicShield2: 6059,
        physicalShield: 6010,
        chaos: 6011,
        shield: 6012,
        curse: 6013,
        poison: 6014,
        blind: 6016,
        dkShield: 6017,
        sheep: 6019,
        bounce: 6020,
        huangQiu: 6021,
        normalSkill: 6022,
        normalUnique: 6023,
        limitMove: 6043,
        shareHp: 6045,
        burn: 6047,
        sleep: 6049,
        space: 6050,
        addAttack: 6051,
        wine: 6052,
        backShadow: 6056,
        powerShield: 6055,
        hellFire: 6057 //地狱火
    };
})(res || (res = {}));
var res;
(function (res) {
    res.cca_ui = {
        building_arena: 1,
        building_copy: 2,
        building_mirrorWorld: 3,
        building_shop: 4,
        building_tower: 5,
        building_valley: 6,
        building_wishingWel: 7,
        building_forgingFactory: 8,
        building_secretShop: 9,
        effect_water: 2001,
        effect_getHero: 2002,
        effect_upSkill: 2003,
        effect_upEquip: 2004,
        fight_movingSkill: 1001,
        fight_skillAble: 1002,
        fight_skillSkipper: 1003,
        fight_skillReady: 1004,
        fight_failed: 1005,
        trialFireEffect: 2005,
        userLevelUp: 2006,
        getExclusiveTitle: 2007,
        getExclusiveItem: 2008,
        heroLevelUp: 2009,
        showSecretShop: 2010,
        showBuildingTitle: 2011,
        heroCanCall: 2012,
        greenArrow: 2013,
        qualityUp: 2014,
        LevelUp: 2015,
        secretUp: 2016,
        exclusiveUp: 2017,
        towerHighest: 2018,
        secretActive: 2019,
        goldChest: 2020,
        diamondChest: 2021,
        chestItemLight: 2022,
        mainMenu: 2023,
        openModule: 2024,
        movie1: 2025,
        movie2: 2026,
        movie3: 2027,
        movie4: 2028,
        movie5: 2029,
        dice: 2030,
        contract: 2031,
        canSign: 2032,
        upgradable: 2033,
        awaken: 2034,
        npc: 2035,
        energyBall: 2036,
        runningMan: 2037,
        runningDragon: 2038,
        secretIconOpen: 2039,
        fightMixFull: 1006 //战斗技能大招可以释放状态
    };
})(res || (res = {}));
/**
 * ui音效相关。
 */
var res;
(function (res) {
    res.audio_ui = {
        bg_home: 1,
        bg_fight: 2,
        bg_arena: 3,
        bg_film: 4,
        //UI
        btn_normal: 101,
        btn_openDlg: 102,
        dlg_closeDlg: 103,
        btn_back: 104,
        btn_openExtension: 105,
        btn_closeExtension: 106,
        input: 107,
        menuOpen: 108,
        menuClose: 109,
        wear: 110,
        buyItem: 111,
        //战斗
        win: 114,
        lose: 115,
        cheer: 116,
        rantStar1: 117,
        rantStar2: 118,
        rantStar3: 119,
        skillReady: 121,
        lottery: 122,
        getHero: 123,
        openTreasure: 124,
        intensify: 125,
        heroLevelUp1: 126,
        heroLevelUp2: 127,
        heroAbout: 128,
        leaderLevelUp: 129,
        getExclusive: 130,
        secretShop: 131,
        upSecretSkill: 132,
        getTaskReward: 133 //领取任务奖励
    };
})(res || (res = {}));
var res;
(function (res) {
    function resetFrameName(isScatterMode) {
        if (isScatterMode) {
            var arr = [
                res.ui_arena,
                res.ui_bag,
                res.ui_btn,
                res.ui_common,
                res.ui_copy,
                res.ui_copyInfo,
                res.ui_daily,
                res.ui_embattle,
                res.ui_equipment,
                res.ui_event,
                res.ui_fight,
                res.ui_hermetic,
                res.ui_hero,
                res.ui_home,
                res.ui_homebg,
                res.ui_login,
                res.ui_lottery,
                res.ui_mail,
                res.ui_mirrorworld,
                res.ui_panel,
                res.ui_quest,
                res.ui_rank,
                res.ui_secratshop,
                res.ui_tower,
                res.ui_trial,
                res.ui_vip
            ];
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var frameMap = arr[i];
                for (var key in frameMap) {
                    frameMap[key] = "ui/" + frameMap[key].replace(/#/, "/");
                }
            }
        }
    }
    res.resetFrameName = resetFrameName;
    resetFrameName(false);
})(res || (res = {}));

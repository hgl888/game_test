var res;
(function (res) {
    var map = res._map;
    res.cfgJsonArr = [
        uw.cfg_t_buff,
        uw.cfg_t_combat,
        uw.cfg_t_copy,
        uw.cfg_t_copyLoot,
        uw.cfg_t_copyPrimary,
        uw.cfg_t_hero,
        uw.cfg_t_item,
        uw.cfg_t_itemEquip,
        uw.cfg_t_itemEquipExclusive,
        uw.cfg_t_itemLogic,
        uw.cfg_t_monster,
        uw.cfg_t_skill,
        uw.cfg_t_serverLoot,
        uw.cfg_t_skillDisplay,
        uw.cfg_t_warrior,
        uw.cfg_c_rankReward,
        uw.cfg_c_open,
        uw.cfg_c_lvl,
        uw.cfg_c_game,
        uw.cfg_c_mail,
        uw.cfg_t_task,
        uw.cfg_c_lottery,
        uw.cfg_c_heroCall,
        uw.cfg_c_simulateFight,
        uw.cfg_c_vip,
        uw.cfg_c_shop,
        uw.cfg_c_secret,
        uw.cfg_c_exchange,
        uw.cfg_c_recharge,
        uw.cfg_c_mirror,
        uw.cfg_c_sign,
        uw.cfg_c_nameData,
        uw.cfg_c_payInfo,
        uw.cfg_c_guide2,
        uw.cfg_c_subGuide
    ];
    function _initResCfg() {
        res.AudioParser.addForMusicType(resHelper.getUIAudioPath(res.audio_ui.bg_home));
        res.AudioParser.addForMusicType(resHelper.getUIAudioPath(res.audio_ui.bg_fight));
        res.AudioParser.addForMusicType(resHelper.getUIAudioPath(res.audio_ui.bg_arena));
        res.AudioParser.addForMusicType(resHelper.getUIAudioPath(res.audio_ui.bg_film));
        var addFrames = function (uiName, resArr) {
            if (mo.project.isScatterMode) {
                var ui = res[uiName];
                for (var key in ui) {
                    var url = ui[key];
                    if (url.indexOf("%s") < 0) {
                        resArr.push(url);
                    }
                }
            }
            else {
                var arr = ["ui_num", "ui_bg"];
                if (arr.indexOf(uiName) >= 0) {
                    var ui = res[uiName];
                    for (var key in ui) {
                        var url = ui[key];
                        if (url.indexOf("%s") < 0) {
                            resArr.push(url);
                        }
                    }
                }
                else {
                    var resCfgItem = new res.ResCfgItem();
                    resCfgItem.name = uiName;
                    resCfgItem.type = "sheet";
                    resCfgItem.url = path.join("ui", uiName + ".sheet");
                    resArr.push(resCfgItem);
                }
            }
        };
        var addAudios = function (audioIds, resArr) {
            var audioId, path;
            for (var i = 0; i < audioIds.length; i++) {
                audioId = audioIds[i];
                path = resHelper.getUIAudioPath(audioId);
                resArr.push(path);
            }
        };
        //刚进游戏的时候，需要优先加载一些资源，例如msgCode、loading相关资源等。
        map["first"] = [
            uw.cfg_c_loadModule,
            uw.cfg_c_loadingTips,
            uw.cfg_c_msgCode,
            res.uiTipLayer_ui,
            res.uiLoadingLayer_ui
        ];
        addFrames("ui_common", map["first"]);
        addFrames("ui_panel", map["first"]);
        map["first"] = map["first"].concat(uw.uiArmFactory.getResArr(res.cca_ui.runningMan));
        map["first"] = map["first"].concat(uw.uiArmFactory.getResArr(res.cca_ui.runningDragon));
        //vip充值
        map["VipLayer"] = [
            res.uiVipLayer_ui,
            res.uiVipChargeItemCell_ui,
            res.uiVipDetailItemCell_ui,
            res.uiWipeOutItem_ui,
            res.uiSecretShopAppearDlg_ui
        ];
        addFrames("ui_vip", map["VipLayer"]);
        //邮件系统
        map["MailBoxLayer"] = [
            res.uiMailBoxLayer_ui,
            res.uiMailItem_ui
        ];
        //签到系统
        map["SignLayer"] = [
            res.uiSignItem_ui,
            res.uiSignLayer_ui
        ];
        //任务系统
        map["QuestLayer"] = [
            res.uiQuestItem_ui,
            res.uiQuestLayer_ui
        ];
        addFrames("ui_quest", map["QuestLayer"]);
        //炼金术
        map["AlchemyLayer"] = [
            res.uiAlchemyItem_ui,
            res.uiAlchemyLayer_ui,
            res.uiAlchemyTipLayer_ui
        ];
        //用户信息
        map["UserInfoLayer"] = [
            res.uiUserInfoLayer_ui,
            res.uiUserModifyHeadItem_ui,
            res.uiUserModifyHeadLayer_ui,
            res.uiUserModifyNameLayer_ui
        ];
        //副本信息
        map["CopyInfoScene"] = [
            res.uiCopyInfo_ui,
            res.uiSkillIcon_ui,
            res.uiSkillInfoTip_ui
        ];
        addFrames("ui_copyInfo", map["CopyInfoScene"]);
        //基础，需要加载到global中，在进入主城的时候加载，在login界面中进行偷偷加载
        map["base"] = [
            res.uiBorderLayer_ui,
            res.uiChestInfo_ui,
            res.uiConfirmLayer_ui,
            res.uiGainTips_ui,
            res.uiGetItemDlg_ui,
            res.uiGuideNPCTalk1_ui,
            res.uiGuideNPCTalk2_ui,
            res.uiInfoTip_ui,
            res.uiItemIcon_ui,
            res.uiHeroIcon_ui,
            res.uiLoadingLayer_ui,
            res.uiPickupItem_ui,
            res.uiResBarLayer_ui,
            res.uiSundryDlg_ui,
            res.uiSundryItem_ui,
            res.uiTipLayer_ui,
            res.uiMaterialItem_ui
        ];
        map["base"] = map["base"].concat(res.cfgJsonArr);
        addFrames("ui_btn", map["base"]);
        for (var i = 1; i <= 15; ++i) {
            map["base"].push(mo.formatStr("dynamic/map_000%s.json", i < 10 ? "0" + i : i));
        }
        //首页
        map["IndexScene"] = [
            res.uiIndexLayer_ui,
            res.uiIndexSelectServerItem_ui,
            res.uiIndexSelectServerLayer_ui,
            res.uiNoticeLayer_ui,
            res.uiIndexLoginLayer_ui,
            res.uiIndexRegisterLayer_ui,
            res.uiIndexForgetPwdLayer_ui
        ];
        addFrames("ui_btn", map["IndexScene"]);
        addFrames("ui_login", map["IndexScene"]);
        addAudios([res.audio_ui.bg_home], map["IndexScene"]);
        //主城
        map["HomeScene"] = [
            res.uiHomeBackgroundLayer_ui,
            res.uiHomeLayer_ui,
            res.uiHomeLevelUpLayer_ui,
            res.uiHomeMenuLayer_ui,
            res.uiSecretTipsDlg_ui
        ];
        addFrames("ui_home", map["HomeScene"]);
        addFrames("ui_homebg", map["HomeScene"]);
        map["HomeScene"] = map["HomeScene"].concat(map["base"]);
        //光年加载器场景
        map["LightYearLoaderScene"] = [
            res.logo_jpg,
        ];
        //竞技场
        map["ArenaScene"] = [
            res.uiArenaHonorShopLayer_ui,
            res.uiArenaHighestRecordDlg_ui,
            res.uiArenaLayer_ui,
            res.uiArenaLuckRankItem1_ui,
            res.uiArenaLuckRankItem_ui,
            res.uiArenaLuckRankLayer_ui,
            res.uiArenaRankItem_ui,
            res.uiArenaRankLayer_ui,
            res.uiArenaRecordItem_ui,
            res.uiArenaRecordLayer_ui,
            res.uiArenaRuleItem_ui,
            res.uiArenaRuleLayer_ui,
            res.uiHeadItem_ui,
            res.uiShopItem_ui,
            res.uiShopItemDetail_ui
        ];
        addFrames("ui_arena", map["ArenaScene"]);
        addFrames("ui_bag", map["ArenaScene"]);
        map["subBag"] = [
            res.uiBagItem1_ui,
            res.uiBagLayer_ui,
            res.uiBagQueryLayer_ui,
            res.uiFragmentCopyItem_ui,
        ];
        addFrames("ui_bag", map["subBag"]);
        //背包
        map["BagScene"] = [
            res.uiBagMaterialDlg_ui,
            res.uiBagSaleItemDlg_ui,
            res.uiHeroFragment_ui,
            res.uiUseItemCell_ui,
            res.uiUseItemDlg_ui,
        ];
        map["BagScene"] = map["BagScene"].concat(map["subBag"]);
        //副本
        map["CopyScene"] = [
            res.uiCopyLayer_ui,
            res.uiCopyWipeOutLayer_ui,
            res.uiWipeOutItem_ui,
            res.uiSecretShopAppearDlg_ui,
            res.levelNum_png
        ];
        addFrames("ui_copy", map["CopyScene"]);
        addFrames("ui_copyInfo", map["CopyScene"]);
        //兑换
        map["ExchangeScene"] = [
            res.uiExchangeDlg_ui,
            res.uiExchangeItem_ui,
            res.uiExchangeShopLayer_ui,
            res.uiShopItemDetail_ui,
            res.uiBagMaterialDlg_ui,
            res.uiFragmentCopyItem_ui,
            res.uiHeroFragment_ui
        ];
        //战斗
        map["FightScene"] = [
            res.uiFightPauseLayer_ui,
            res.uiFightResultLayer_ui,
            res.uiFightStartLayer_ui,
            res.uiFightTalkLayer_ui,
            res.uiFightUILayer_ui,
            res.uiSkillInfoTip_ui
        ];
        addFrames("ui_fight", map["FightScene"]);
        addAudios([res.audio_ui.win, res.audio_ui.lose, res.audio_ui.cheer, res.audio_ui.rantStar1, res.audio_ui.rantStar2, res.audio_ui.rantStar3, res.audio_ui.skillReady], map["FightScene"]);
        //战斗
        map["FightDemoScene"] = [
            res.uiFightDemoLayer_ui,
        ];
        addFrames("ui_fight", map["FightDemoScene"]);
        map["FilmScene"] = [
            res.ui_bg.bg_film_jpg,
            res.uiFightTalkLayer_ui,
            res.uiCreateRoleLayer_ui
        ];
        addAudios([res.audio_ui.bg_film], map["FilmScene"]);
        addFrames("ui_film", map["FilmScene"]);
        map["FilmScene"] = map["FilmScene"].concat(res.cfgJsonArr);
        map["SimulateFightScene"] = [];
        map["SimulateFightScene"] = map["SimulateFightScene"].concat(map["FightScene"]);
        map["SimulateFightScene"] = map["SimulateFightScene"].concat(map["base"]);
        //锻造
        map["ForgeScene"] = [
            res.uiForgeLayer_ui,
            res.uiForgeShopItem_ui,
        ];
        addFrames("ui_equipment", map["ForgeScene"]);
        //英雄
        map["HeroScene"] = [
            res.uiFragmentCopyItem_ui,
            res.uiHeroDetail_ui,
            res.uiHeroEquipShop_ui,
            res.uiHeroExclusiveEquip_ui,
            res.uiHeroExpcItemList_ui,
            res.uiHeroInfoLayer_ui,
            res.uiHeroItem_new_ui,
            res.uiHeroList_new_ui,
            res.uiHeroPropItem_ui,
            res.uiHeroTrain_ui,
            res.uiHeroTrainProp_ui,
            res.uiHeroUpGradeDlg_ui,
            res.uiHeroWishEquip_ui,
            res.uiBagMaterialDlg_ui,
            res.uiUpSkill_ui,
            res.uiUpSkillItem_ui,
            res.uiUseItemCell_ui,
            res.uiUseItemDlg_ui,
            res.uiSecretTipsDlg_ui,
            res.uiLotteryShowHeroLayer_ui,
            res.uiHeroFragment_ui,
            res.uiHeroTrainSuccDlg_ui
        ];
        addFrames("ui_hero", map["HeroScene"]);
        addFrames("ui_hero2", map["HeroScene"]);
        map["HeroScene"] = map["HeroScene"].concat(map["subBag"]);
        //抽奖
        map["LotteryScene"] = [
            res.uiLotteryLayer_ui,
            res.uiLotteryResultLayer_ui,
            res.uiLotteryShowHeroLayer_ui,
            res.uiSecretTipsDlg_ui
        ];
        addFrames("ui_lottery", map["LotteryScene"]);
        //镜像世界
        map["MirrorScene"] = [
            res.uiMirrorAtkRankItem_ui,
            res.uiMirrorAtkRankLayer_ui,
            res.uiMirrorChooseDlg_ui,
            res.uiMirrorDefRecordDlg_ui,
            res.uiMirrorDefRecordItem_ui,
            res.uiMirrorHelpLayer_ui,
            res.uiMirrorInfoDlg_ui,
            res.uiMirrorLayer_ui,
            res.uiMirrorRewardDlg_ui,
            res.uiTrialCopyItem_ui,
            res.uiHeadItem_ui
        ];
        addFrames("ui_mirrorworld", map["MirrorScene"]);
        addFrames("ui_mt", map["MirrorScene"]);
        addFrames("ui_copyInfo", map["MirrorScene"]);
        //排行榜
        map["RankScene"] = [
            res.uiRankGuildInfoLayer_ui,
            res.uiRankGuildItem_ui,
            res.uiRankHeroItem_ui,
            res.uiRankLayer_ui,
            res.uiRankLeaderInfoLayer_ui,
            res.uiRankRuleLayer_ui,
            res.uiRankTowerItem_ui
        ];
        addFrames("ui_rank", map["RankScene"]);
        //公会
        map["UnionScene"] = [
            res.uiUnionNo_ui,
            res.uiUnionCZTab_ui,
            res.uiUnionJoinTab_ui,
            res.uiUnionJoinItem_ui,
            res.uiUnionCreateTab_ui,
            res.uiUnionSearchTab_ui
        ];
        addFrames("ui_union", map["UnionScene"]);
        //秘术
        map["SecretScene"] = [
            res.uiSecretItem_ui,
            res.uiSecretItem2_ui,
            res.uiSecretLayer_ui,
            res.uiSecretRuleLayer_ui,
            res.uiSecretTipsDlg_ui,
            res.uiSecretTuneDlg_ui,
        ];
        addFrames("ui_hermetic", map["SecretScene"]);
        //布阵
        map["EmbattleScene"] = [
            res.uiEmbattleLayer_ui
        ];
        addFrames("ui_embattle", map["EmbattleScene"]);
        map["EmbattleScene"] = map["EmbattleScene"].concat(map["SecretScene"]);
        //神秘商店
        map["SecretShopScene"] = [
            res.uiSecretShopAppearDlg_ui,
            res.uiSecretShopLayer_ui,
            res.uiShopItem_ui,
            res.uiShopItemDetail_ui,
        ];
        addFrames("ui_secratshop", map["SecretShopScene"]);
        //普通商店
        map["ShopScene"] = [
            res.uiShopItem_ui,
            res.uiShopItemDetail_ui,
            res.uiShopLayer_ui
        ];
        //守卫塔
        map["TowerScene"] = [
            res.uiTowerLayer_ui,
            res.uiTowerRuleLayer_ui,
            res.uiTowerShopLayer_ui,
            res.uiTowerWipeOutLayer_ui,
            res.uiWipeOutItem_ui,
            res.uiSkillIcon_ui,
            res.uiShopItem_ui,
            res.uiShopItemDetail_ui,
            res.uiSkillInfoTip_ui
        ];
        addFrames("ui_tower", map["TowerScene"]);
        //试炼
        map["TrialScene"] = [
            res.uiTrialCopy_ui,
            res.uiTrialCopyItem_ui,
            res.uiTrialPCopy_ui,
        ];
        addFrames("ui_trial", map["TrialScene"]);
        addFrames("ui_mt", map["TrialScene"]);
        //锻造专属
        map["ForgeExclusiveScene"] = [
            res.uiChooseHero_ui,
            res.uiForgeHeroIcon_ui,
            res.uiForgeExclusive_ui,
            res.uiForgeExclusiveSuccDlg_ui
        ];
        addFrames("ui_equipment", map["ForgeExclusiveScene"]);
        //锻造兑换
        map["ForgeExchangeScene"] = [
            res.uiForgeExchange_ui,
            res.uiForgeExclusiveGetDlg_ui,
            res.uiForgeExclusiveShop_ui,
            res.uiForgeHelpLayer_ui
        ];
        addFrames("ui_equipment", map["ForgeExchangeScene"]);
        //首冲奖励
        map["EventFirstRechargeLayer"] = [
            res.uiEventFirstRechargeLayer_ui
        ];
        addFrames("ui_event", map["EventFirstRechargeLayer"]);
        map["EventFirstRechargeLayer"] = map["EventFirstRechargeLayer"].concat(map["LotteryScene"]);
        //七天登陆
        map["EventSevenDayLayer"] = [
            res.uiEventSevenDayLayer_ui,
            res.uiEventSevenDayItem_ui
        ];
        addFrames("ui_event", map["EventSevenDayLayer"]);
        addFrames("ui_vip", map["EventSevenDayLayer"]);
        addFrames("ui_num", map["EventSevenDayLayer"]);
        //精彩活动
        map["EventWonderfulLayer"] = [
            res.uiEventWonderfulLayer_ui,
            res.uiEventWonderfulItem1_ui,
            res.uiEventWonderfulItem2_ui,
            res.uiEventWonderfulTabItem_ui,
            res.uiEventRedeemCode_ui,
            res.uiEventText_ui,
            res.uiEventLimitBuy_ui,
            res.uiEventCharge_ui,
            res.uiEventUpLvl_ui
        ];
        addFrames("ui_event", map["EventWonderfulLayer"]);
        //精彩活动
        map["FeedBackLayer"] = [
            res.uiFeedBackLayer_ui,
            res.uiFeedBackItem_ui
        ];
        addFrames("ui_feedback", map["FeedBackLayer"]);
    }
    res._initResCfg = _initResCfg;
})(res || (res = {}));

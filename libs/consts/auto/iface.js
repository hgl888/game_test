var uw;
(function (uw) {
    uw.iface = {
        /**
         * 获取竞技场信息
         * @args
         * @returns dsNameConsts.ArenaInfo
         */
        a_arena_getArena: "a.a.a",
        a_arena_resetArenaFightRanks: "a.a.d",
        a_arena_fightStart: "a.a.h1",
        a_arena_fightStart_args: {
            rank: "_0" //挑战排行
        },
        a_arena_fightEnd: "a.a.h2",
        a_arena_fightEnd_args: {
            isWin: "_0" //是否胜利
            ,
            vData: "_1" //检验数据 格式[密钥,[详情看FightValidData的key值，下标从上往下]]
        },
        a_arena_getFightData: "a.a.i",
        a_arena_getFightData_args: {
            id: "_0" //记录id
        },
        a_arena_getRecordList: "a.a.j",
        a_arena_getRecordList_args: {
            index: "_0" //索引id
            ,
            count: "_1" //总数
        },
        a_arena_getArenaRanks: "a.a.k",
        a_arena_getArenaRanks_args: {
            index: "_0" //索引开始
            ,
            count: "_1" //总记录数
        },
        a_arena_getArenaLuckRanks: "a.a.l",
        a_copy_fightStart: "a.c.a1",
        a_copy_fightStart_args: {
            copyId: "_0" //副本id
        },
        a_copy_fightEnd: "a.c.a2",
        a_copy_fightEnd_args: {
            isWin: "_0" //是否胜利
            ,
            vData: "_1" //检验数据 格式[密钥,[详情看FightValidData的key值，下标从上往下]]
        },
        a_copy_wipe: "a.c.b",
        a_copy_wipe_args: {
            copyId: "_0" //副本id
            ,
            count: "_1" //扫荡次数，-1表示消耗完所有体力
        },
        a_copy_getCopyProgressList: "a.c.f",
        a_copy_resetCopyCount: "a.c.g",
        a_copy_resetCopyCount_args: {
            copyId: "_0" //副本id
        },
        a_copy_resetPCopyCD: "a.c.h",
        a_copy_resetPCopyCD_args: {
            pCopyId: "_0" //主副本ID
        },
        a_hero_upQuality: "a.h.a",
        a_hero_upQuality_args: {
            heroId: "_0" //英雄id
        },
        a_hero_upSkill: "a.h.b",
        a_hero_upSkill_args: {
            heroId: "_0" //英雄id
            ,
            pos: "_1" //0-3 注(3为奥义)
        },
        a_hero_getList: "a.h.c",
        a_hero_getList_args: {
            matrixType: "_0" //布阵类型，1表示副本布阵
        },
        a_hero_getInfo: "a.h.f",
        a_hero_getInfo_args: {
            heroId: "_0" //英雄id
        },
        a_hero_train: "a.h.h",
        a_hero_train_args: {
            heroId: "_0" //英雄id
            ,
            type: "_1" //0:普通、 1：力培养 、2：智培养
        },
        a_hero_saveTrain: "a.h.i",
        a_hero_saveTrain_args: {
            heroId: "_0" //英雄id
        },
        a_hero_upTrainLvl: "a.h.i1",
        a_hero_upTrainLvl_args: {
            heroId: "_0" //英雄id
        },
        a_hero_putOnEquip: "a.h.k",
        a_hero_putOnEquip_args: {
            heroId: "_0" //英雄id
            ,
            equipId: "_1" //装备实例id
            ,
            part: "_2" //部位1-7 c_prop.equipPart
        },
        a_hero_putDownEquip: "a.h.l",
        a_hero_putDownEquip_args: {
            heroId: "_0" //英雄id
            ,
            equipId: "_1" //装备实例id
        },
        a_hero_callHero: "a.h.m",
        a_hero_callHero_args: {
            tempId: "_0" //英雄模板id
        },
        a_hero_upExclusiveEquip: "a.h.n",
        a_hero_upExclusiveEquip_args: {
            items: "_0" //{消耗物品id：数量}
            ,
            equipIds: "_1" //[消耗装备id....]
            ,
            equipId: "_2" //专属装备id
            ,
            isVip: "_3" //是否VIP（0否1是）
        },
        a_hero_changeMorePos: "a.h.o",
        a_hero_changeMorePos_args: {
            posDic: "_0" //{位置0:英雄id,位置1:英雄id,...}
            ,
            matrixType: "_1" //布阵类型，1:副本,2:竞技场防守,3:竞技场进攻,4:世界boss
        },
        a_hero_buyNormalEquip: "a.h.p",
        a_hero_buyNormalEquip_args: {
            heroId: "_0" //英雄ID
            ,
            part: "_1" //装备部位
        },
        a_item_sellItem: "a.i.a",
        a_item_sellItem_args: {
            itemId: "_0" //物品id
            ,
            num: "_1" //物品数量
        },
        a_item_sellItems: "a.i.a1",
        a_item_sellItems_args: {
            items: "_0" //物品组
        },
        a_item_sellEquip: "a.i.b",
        a_item_sellEquip_args: {
            equipId: "_0" //装备实例id
        },
        a_item_use: "a.i.c",
        a_item_use_args: {
            heroId: "_0" //英雄id 当时经验卡时必须要传英雄的id
            ,
            itemId: "_1" //物品id
            ,
            itemNum: "_2" //物品数量
        },
        a_item_getEquipInfo: "a.i.d",
        a_item_getEquipInfo_args: {
            equipId: "_0" //装备实例id
        },
        a_item_getEquipInfoByPart: "a.i.e",
        a_item_getEquipInfoByPart_args: {
            heroId: "_0" //英雄id
            ,
            part: "_1" //部位1-5
        },
        a_item_getNotOnEquipList: "a.i.f",
        a_item_getOnEquipList: "a.i.g",
        a_item_getOnEquipList_args: {
            heroId: "_0" //英雄id
        },
        a_item_getAllEquipList: "a.i.j",
        a_user_changeIcon: "a.u.a",
        a_user_changeIcon_args: {
            iconId: "_0" //头像id
        },
        a_user_getIconIds: "a.u.b",
        a_user_buyStrength: "a.u.d",
        a_user_createUser: "a.u.e",
        a_user_createUser_args: {
            name: "_0" //用户名，即战队名
            ,
            ip: "_1" //用户真实ip
        },
        a_user_buySkillPoints: "a.u.g",
        a_user_changeName: "a.u.j",
        a_user_changeName_args: {
            name: "_0" //名字
        },
        a_user_getFullUserInfo: "a.u.k",
        a_user_getTask: "a.u.o",
        a_user_getTaskReward: "a.u.p",
        a_user_getTaskReward_args: {
            taskId: "_0" //需要领取的任务id
        },
        a_user_updateGuide: "a.u.q",
        a_user_updateGuide_args: {
            guide: "_0" //[主引导id，子引导id]
        },
        a_user_updateSubGuide: "a.u.q1",
        a_user_updateSubGuide_args: {
            groupId: "_0" //子引导组id
        },
        a_user_saveSecretMatrix: "a.u.r",
        a_user_saveSecretMatrix_args: {
            index: "_0" //0表示进攻，1表示防守
            ,
            ids: "_1" //秘术配置表中对应的id
        },
        a_user_buyExclusiveEquip: "a.u.s",
        a_user_buyExclusiveEquip_args: {
            tempId: "_0" //专属装备的模板id
            ,
            thisFragId: "_1" //当前对应的英雄碎片id
            ,
            fragMap: "_2" //碎片数量情况，格式为：{fragId:num}
        },
        a_user_buyGold: "a.u.t",
        a_user_buyGold_args: {
            num: "_0" //购买次数
        },
        a_user_sign: "a.u.u",
        a_user_getDefenceSecretSkills: "a.u.v",
        a_user_getDefenceSecretSkills_args: {
            userId: "_0" //用户id
            ,
            matrixType: "_1" //布阵类型
        },
        a_user_updateSecret: "a.u.w",
        a_user_updateSecret_args: {
            matrixType: "_0" //布阵类型
            ,
            secret: "_1" //布阵数据[id,id,id]
        },
        a_tower_getInfo: "a.t.a",
        a_tower_fightStart: "a.t.b1",
        a_tower_fightEnd: "a.t.b2",
        a_tower_fightEnd_args: {
            isWin: "_0" //是否胜利
            ,
            vData: "_1" //检验数据 格式[密钥,[详情看FightValidData的key值，下标从上往下]]
        },
        a_tower_resetLayer: "a.t.c",
        a_tower_autoFight: "a.t.d",
        a_tower_openChest: "a.t.e",
        a_lottery_getInfo: "a.l.a",
        a_lottery_takeOne: "a.l.b",
        a_lottery_takeOne_args: {
            type: "_0" //1:金币抽奖 2：钻石抽奖
        },
        a_lottery_takeTen: "a.l.c",
        a_lottery_takeTen_args: {
            type: "_0" //1:金币抽奖 2：钻石抽奖
        },
        a_rank_getRanks: "a.r.a",
        a_rank_getRanks_args: {
            type: "_0" //排行榜类型
            ,
            guildId: "_1" //公会id
        },
        a_rank_getMaxTowerRank: "a.r.b",
        a_feedback_feed: "a.f.a",
        a_feedback_feed_args: {
            content: "_0" //内容
        },
        a_feedback_getList: "a.f.b",
        a_shop_getInfo: "a.s.a",
        a_shop_buy: "a.s.b",
        a_shop_buy_args: {
            type: "_0" //类型：normal,arena,mystic
            ,
            index: "_1" //物品下标
            ,
            num: "_2" //物品下标
        },
        a_shop_refresh: "a.s.c",
        a_shop_refresh_args: {
            type: "_0" //类型：normal,arena,mystic
        },
        a_shop_getItems: "a.s.d",
        a_shop_getItems_args: {
            type: "_0" //类型：normal,arena,mystic
        },
        a_equip_strengthen: "a.e.a",
        a_equip_strengthen_args: {
            heroId: "_0" //英雄id
            ,
            part: "_1" //部位1-5
            ,
            isAuto: "_2" //0|1 是否一键强化
        },
        a_equip_up: "a.e.b",
        a_equip_up_args: {
            heroId: "_0" //英雄id
            ,
            part: "_1" //部位1-5
        },
        a_trial_fightStart: "a.tr.b",
        a_trial_fightStart_args: {
            copyId: "_0" //副本id
        },
        a_trial_fightEnd: "a.tr.c",
        a_trial_fightEnd_args: {
            isWin: "_0" //是否胜利
            ,
            vData: "_1" //检验数据 格式[密钥,[详情看FightValidData的key值，下标从上往下]]
        },
        a_exchange_getInfo: "a.ex.a",
        a_exchange_exchange: "a.ex.b",
        a_exchange_exchange_args: {
            exchangeId: "_0" //兑换id
            ,
            count: "_1" //兑换数量
        },
        a_recharge_getInfo: "a.rc.a",
        a_recharge_recharge: "a.rc.b",
        a_recharge_recharge_args: {
            rechargeId: "_0" //充值项ID
            ,
            channel: "_1" //渠道号
            ,
            receiptData: "_2" //苹果验证数据
        },
        a_recharge_getTodayCount: "a.rc.c",
        a_recharge_getAllCount: "a.rc.d",
        a_recharge_getRequest: "a.rc.e",
        a_recharge_getRequest_args: {
            rechargeId: "_0" //充值项ID
        },
        a_recharge_handleRequest: "a.rc.g",
        a_mirror_getRanks: "a.m.a",
        a_mirror_getRanks_args: {
            type: "_0" //排行榜类型，1,2,3,4,5,6
            ,
            page: "_1" //第几页的排行
        },
        a_mirror_getMyRank: "a.m.a1",
        a_mirror_pveStart: "a.m.b",
        a_mirror_pveStart_args: {
            type: "_0" //难度类型
        },
        a_mirror_pveEnd: "a.m.b1",
        a_mirror_pveEnd_args: {
            type: "_0" //难度类型
            ,
            isWin: "_1" //是否胜利
            ,
            vData: "_2" //校验数据
        },
        a_mirror_enterHigher: "a.m.c",
        a_mirror_stayThere: "a.m.d",
        a_mirror_pvpPrepare: "a.m.e",
        a_mirror_pvpPrepare_args: {
            type: "_0" //挑战的榜单类型
            ,
            enemyId: "_1" //敌方id
        },
        a_mirror_pvpCancel: "a.m.f",
        a_mirror_pvpStart: "a.m.g",
        a_mirror_pvpEnd: "a.m.h",
        a_mirror_pvpEnd_args: {
            isWin: "_0" //挑战是否成功
            ,
            vData: "_1" //战斗校验数
        },
        a_mirror_getDefenceHistory: "a.m.i",
        a_mirror_getDefenceReward: "a.m.j",
        a_mirror_getDefenceReward_args: {
            time: "_0" //要领取的奖励的时间标示
        },
        a_mirror_giveWay: "a.m.k",
        a_mirror_calMirrorDefence: "a.m.l",
        a_mail_getList: "a.em.a",
        a_mail_pickItems: "a.em.b",
        a_mail_pickItems_args: {
            mailId: "_0" //邮件id
        },
        a_mail_setRead: "a.em.c",
        a_mail_setRead_args: {
            mailId: "_0" //邮件id
        },
        a_mail_del: "a.em.d",
        a_mail_del_args: {
            mailId: "_0" //邮件id
        },
        a_mail_getIsNeedOperate: "a.em.e",
        a_mail_getIsNeedOperate_args: {
            mailId: "_0" //邮件id
        },
        c_account_enterGame: "c.a.a",
        c_account_enterGame_args: {
            name: "_0" //用户名
            ,
            password: "_1" //密码
            ,
            channelId: "_2" //渠道id
        },
        c_account_enterGameBySdk: "c.a.a1",
        c_account_enterGameBySdk_args: {
            channelId: "_0" //渠道号id
            ,
            sdkData: "_1" //sdk的数据，是一个数组
            ,
            deviceId: "_2" //机器码
        },
        c_account_kick: "c.a.b",
        c_account_kick_args: {
            vKey: "_0" //验证码
            ,
            accountId: "_1" //账号id
        },
        c_account_onlineCount: "c.a.c",
        c_account_onlineCount_args: {
            vKey: "_0" //验证码
        },
        c_account_isOnline: "c.a.d",
        c_account_isOnline_args: {
            vKey: "_0" //验证码
            ,
            accountIds: "_1" //账号id
        },
        h_server_getServerList: "h.s.a",
        h_server_getServersByIds: "h.s.b",
        h_server_getServersByIds_args: {
            ids: "_0" //[服务器id]
        },
        h_server_getServerInfo: "h.s.c",
        h_server_getServerInfo_args: {
            id: "_0" //服务器id
        },
        h_server_getNewServer: "h.s.d",
        h_server_getNewServer_args: {
            id: "_0" //服务器id
        },
        h_server_getServerDate: "h.s.e",
        h_account_login: "h.a.a",
        h_account_login_args: {
            name: "_0" //用户名
            ,
            password: "_1" //密码
            ,
            channelId: "_2" //渠道平台
        },
        h_account_loginBySdk: "h.a.a1",
        h_account_loginBySdk_args: {
            channelId: "_0" //渠道号id
            ,
            sdkData: "_1" //sdk的数据，是一个数组
            ,
            deviceId: "_2" //机器码
        },
        h_account_register: "h.a.b",
        h_account_register_args: {
            name: "_0" //用户名
            ,
            password: "_1" //密码
            ,
            deviceId: "_2" //渠道平台
            ,
            channelId: "_3" //渠道平台
        },
        h_account_autoRegister: "h.a.c",
        h_account_autoRegister_args: {
            channelId: "_0" //渠道平台
            ,
            deviceId: "_1" //机器码
        },
        h_account_getPwd: "h.a.d",
        h_account_getPwd_args: {
            email: "_0" //邮件
        },
        h_user_getArenaRanks: "h.u.a",
        h_user_getArenaRanks_args: {
            index: "_0" //索引开始
            ,
            count: "_1" //总记录数
        },
        h_user_getArenaLuckRanks: "h.u.b",
        h_notice_getNewOneByServerId: "h.n.a",
        h_notice_getNewOneByServerId_args: {
            serverId: "_0" //服务器id
        },
        h_gate_dispatcher: "h.g.a",
        h_gameConfig_gameConfig: "h.c.a",
        h_gameRecord_addLoadRecord: "h.gr.a",
        h_gameRecord_addLoadRecord_args: {
            moduleId: "_0" //模块id
            ,
            deviceId: "_1" //设备号
            ,
            channelId: "_2" //渠道号
        },
        a_userRecord_addLoadRecord: "a.ur.a",
        a_userRecord_addLoadRecord_args: {
            moduleId: "_0" //模块id
        },
        a_activity_getFirstRecharge: "a.ac.a",
        a_activity_receiveFirstRecharge: "a.ac.b",
        a_activity_getSevenLogin: "a.ac.c",
        a_activity_receiveSevenLogin: "a.ac.d",
        a_activity_getMainList: "a.ac.e",
        a_activity_receive: "a.ac.f",
        a_activity_receive_args: {
            activityId: "_0" //活动id
            ,
            index: "_1" //栏目项
        },
        a_activity_useCoupon: "a.ac.g",
        a_activity_useCoupon_args: {
            code: "_0" //兑换码
        }
    };
})(uw || (uw = {}));

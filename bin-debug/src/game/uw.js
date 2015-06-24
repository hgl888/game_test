var uw;
(function (uw) {
    uw.log;
    uw.debug;
    uw.info;
    uw.warn;
    uw.error;
    logger.initLogger(uw, "uw");
    //游戏相关的初始化操作
    function init() {
        //sceneMgr加载界面类注册
        mo.armatureFactory = mo.ArmatureFactory.create();
        mo.sceneMgr.registerLoadingLayerClass(uw.ArmatureLoaderLayer);
        mo.GridPageView.IMG_PAGE_ON = res.pageOn_png;
        mo.GridPageView.IMG_PAGE_OFF = res.pageOff_png;
        mo.WaitingLayer.IMG_LOADING = res.ui_common.ntc_loading_png;
        mo.WaitingLayer.IMG_LOADING_BG = res.ui_common.blk_skillunder_png;
        //设置九宫格数据
        var ui_panel = res.ui_panel, ui_common = res.ui_common;
        mo.registerS9GData({
            "39,39,2,2": [
                ui_panel.blk9_itembox_png,
                ui_panel.blk9_info_png,
                ui_panel.blk9_m_png,
                ui_panel.blk9_skill_png,
                ui_panel.blk9_skill2_png,
                ui_panel.blk9_talent_png,
                ui_panel.blk9_talentg_png,
                ui_panel.blk9_babble4_png,
                ui_panel.blk9_vipblk2_png,
                ui_panel.blk9_item_png,
                ui_common.blk9_ntc_png
            ],
            "9,9,2,2": [
                ui_panel.blk9_ininfo_png,
                ui_panel.blk9_innerforredblank_png,
                ui_panel.blk9_rankstrip_png,
                ui_panel.blk9_innerforredblank_png
            ],
            "19,19,2,2": [
                ui_panel.blk9_gold_png,
                ui_panel.blk9_gold1_png,
                ui_panel.blk9_gold2_png,
                ui_panel.blk9_inputline_png
            ],
            "159,159,2,2": [ui_panel.blk9_steptwo_png],
            "269,139,2,2": [ui_panel.blk9_stepone_png, ui_panel.blk9_money_png],
            "89,39,2,2": [ui_panel.blk9_babble3_png],
            "109,109,2,2": [ui_panel.blk9_bag_png],
            "79,131,2,2": [ui_panel.blk9_challenger_png],
            "34,69,2,2": [ui_panel.blk9_heroform_png],
            "29,26,2,2": [ui_panel.blk9_barbg_png],
            "10,49,2,2": [ui_panel.blk9_ltabbg_png],
            "54,49,2,2": [ui_panel.blk9_rtabbg_png],
            "99,99,2,2": [ui_panel.blk9_trialcard_png],
            "49,49,2,2": [ui_panel.blk9_transparentred_png, ui_panel.blk9_transparent_png],
            "109,199,2,2": [ui_panel.blk9_challengerinfo_png],
            "119,94,2,2": [ui_panel.blk9_shopitem_png],
            "39,24,2,2": [ui_panel.blk9_diamond_png],
            "135,1,1,1": [res.ui_login.blk9_user_png],
            "169,134,2,2": [ui_panel.blk9_heroblankl_png],
            "124,1,1,1": [ui_panel.blk9_heronameblank_png],
            "89,89,2,2": [
                ui_common.blk9_q_0_png,
                ui_common.blk9_q_1_png,
                ui_common.blk9_q_2_png
            ]
        });
        mo.initAudio();
        //初始化工厂，注意这个要在_initResCfg之前，因为resCfg.ts中需要调用armature资源列表获取的api。
        if (uw.effectArmFactory)
            uw.effectArmFactory.doDtor();
        if (uw.uiArmFactory)
            uw.uiArmFactory.doDtor();
        if (uw.roleArmFactory)
            uw.roleArmFactory.doDtor();
        uw.effectArmFactory = uw.EffectArmFactory.create();
        uw.uiArmFactory = uw.UIArmFactory.create();
        uw.roleArmFactory = uw.RoleArmFactory.create();
        //资源相关
        res.setShortNameEnabledByType("sheet");
        res._initResCfg();
        uw.initMsgReceiver(); //初始化消息接收器
        //引导相关
        mo.registerGuideCmdFactoryClass(uw.GuideCmd1Factory, "1");
        mo.registerGuideCmdFactoryClass(uw.GuideCmd2Factory, "2", "2t", "2r", "2b", "2l");
        mo.registerGuideCmdFactoryClass(uw.GuideCmd3Factory, "3", "3t", "3r", "3b", "3l");
        mo.registerGuideCmdFactoryClass(uw.GuideCmd4Factory, "4", "4t", "4r", "4b", "4l");
        mo.registerGuideCmdFactoryClass(uw.GuideCmd5Factory, "5", "5t", "5r", "5b", "5l");
        mo.registerGuideCmdFactoryClass(uw.GuideCmd6Factory, "6");
        mo.registerGuideCmdFactoryClass(uw.GuideCmd7Factory, "7");
        uw.initGuideRevert();
        uw.initGuideJudge();
        uw.initGuideCondition();
        uw.initGuideNode();
        uw.initGuideRectNode();
        uw.initGuideBeforeShow();
        uw.initGuideAfterShow();
        uw.initGuideBeforeNext();
        uw.initGuideAfterNext();
        uw.initNextGuideCmd(mo.nextGuideCmdMgr);
        mo.addGuidePauseListener(uw.GetItemDlg.__className);
        mo.addGuidePauseListener(uw.HomeLevelUpLayer.__className);
        mo.addGuidePauseListener(uw.ArenaHighestRecordDlg.__className);
        mo.actionDispatcher.addEventListener(gEventType.refreshTasks, function () {
            process.nextTick(mo.refreshGuide, mo);
        }, null);
        uw.fightUtils = new uw.FightUtils();
        var mc = egret.MainContext;
        if (mc.runtimeType != mc.RUNTIME_HTML5) {
            uw.fightUtils.log = function () {
            };
        }
    }
    uw.init = init;
    /**
     * 渠道号配置表
     * @type {渠道号：payInfo表中的渠道号, ..}
     */
    uw.channelKeyMap = {};
    uw.channelKeyMap[1] = uw.c_payInfo_1;
    /**
     * 返回登陆界面
     */
    function loginOut() {
        mo.sceneMgr.clear();
        mo.disconnect();
        backToIndex();
        clearUserData();
    }
    uw.loginOut = loginOut;
    function backToIndex() {
        mo.removeLocalStorageItem(uw.Keys.logined, true);
        mo.sceneMgr.runScene(uw.IndexScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function () {
        });
    }
    uw.backToIndex = backToIndex;
    /**
     * 清空数据
     */
    function clearUserData() {
        uw.MirrorDataCtrl.purgeInstance();
        uw.mirrorDataCtrl = null;
        uw.ShopDataCtrl.purgeInstance();
        uw.shopDataCtrl = null;
        uw.MailDataCtrl.purgeInstance();
        uw.mailDataCtrl = null;
        uw.ExchangeDataCtrl.purgeInstance();
        uw.exchangeDataCtrl = null;
        uw.RechargeDataCtrl.purgeInstance();
        uw.rechargeDataCtrl = null;
        uw.NoticeDataCtrl.purgeInstance();
        uw.noticeDataCtrl = null;
        uw.LotteryDataCtrl.purgeInstance();
        uw.lotteryDataCtrl = null;
        uw.SignDataCtrl.purgeInstance();
        uw.signDataCtrl = null;
        uw.TowerDataCtrl.purgeInstance();
        uw.towerDataCtrl = null;
        uw.heroDataCtrlList = null;
        if (uw.arenaDataCtrl)
            uw.arenaDataCtrl.doDtor();
        uw.arenaDataCtrl = null;
        if (uw.subModuleDataCtrl)
            uw.subModuleDataCtrl.doDtor();
        uw.subModuleDataCtrl = null;
        if (uw.userDataCtrl)
            uw.userDataCtrl.doDtor();
        uw.userDataCtrl = null;
    }
    /**
     * 获取随机名字
     */
    function getRandomName() {
        var nameData = mo.getJSONWithFileName(uw.cfg_c_nameData);
        var len = Object.keys(nameData).length;
        var titleRandomNumber = 0 | Math.random() * len || 1, firstNameRandomNumber = 0 | Math.random() * len || 1, lastNameRandomNumber = 0 | Math.random() * len || 1;
        var title = nameData[titleRandomNumber][uw.c_nameData_title], firstName = nameData[firstNameRandomNumber][uw.c_nameData_firstName], lastName = nameData[lastNameRandomNumber][uw.c_nameData_lastName];
        return title + firstName + lastName || "张德帅";
    }
    uw.getRandomName = getRandomName;
    /**
     *
     * @param quality
     * @param isFragment 是否是碎片
     * @returns {string}
     */
    function getQualityFrameName(quality, isFragment) {
        var tempStr = res.ui_common.tmp_blk9_q_png;
        var map = {
            3: 1,
            5: 1,
            7: 1,
            9: 1,
            11: 1
        };
        return mo.formatStr(tempStr, (isFragment ? 2 : map[quality]) || 0);
    }
    uw.getQualityFrameName = getQualityFrameName;
    /**
     * tempId转化warriorId
     * @param tempId
     * @returns {*}
     */
    function convertTempIdToWarriorId(tempId) {
        var jsonPath, wordKey;
        if (uw.idBelongHero(tempId)) {
            jsonPath = uw.cfg_t_hero;
            wordKey = uw.t_hero_tid;
        }
        else {
            jsonPath = uw.cfg_t_monster;
            wordKey = uw.t_monster_tid;
        }
        return mo.getJSONWithFileNameAndID(jsonPath, tempId)[wordKey];
    }
    uw.convertTempIdToWarriorId = convertTempIdToWarriorId;
    /**
     * 通过模板id获取到warrior的数据
     * @param tempId
     * @returns {string}
     */
    function getWarriorByTempId(tempId) {
        var warriorId = uw.convertTempIdToWarriorId(tempId);
        return mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, warriorId);
    }
    uw.getWarriorByTempId = getWarriorByTempId;
    /**
     * 通过模板id获取到英雄或怪物头像
     * @param tempId
     * @returns {string}
     */
    function getRoleIconByTempId(tempId) {
        var warriorId = uw.convertTempIdToWarriorId(tempId);
        return resHelper.getRoleIconPath(warriorId);
    }
    uw.getRoleIconByTempId = getRoleIconByTempId;
    uw._roleQualityMapToItem = {
        1: 1,
        2: 2,
        3: 4,
        4: 6,
        5: 8,
        6: 10
    };
    /**
     * 通过角色品质获得文字颜色
     * @param quality
     * @returns {number}
     */
    function getRoleTextColor(quality) {
        return uw.getColorByQuality(uw._roleQualityMapToItem[quality]);
    }
    uw.getRoleTextColor = getRoleTextColor;
    /**
     * 通过hero的tempId取到英雄或则怪物的颜色类型。
     * @param tempId
     * @returns {*}
     */
    function getRoleColorType(tempId) {
        var jsonPath, wordKey, quality = 1;
        if (tempId != 0) {
            if (uw.idBelongHero(tempId)) {
                jsonPath = uw.cfg_t_hero;
                wordKey = uw.t_hero_quality;
            }
            else {
                jsonPath = uw.cfg_t_monster;
                wordKey = uw.t_monster_quality;
            }
            var temp = mo.getJSONWithFileNameAndID(jsonPath, tempId);
            quality = temp[wordKey];
        }
        return uw.colorType.heroQualityMap[quality];
    }
    uw.getRoleColorType = getRoleColorType;
    /**
     * 判断这个tempId是英雄的还是怪物的
     * @param tempId
     * @returns {*}
     */
    function idBelongHero(tempId) {
        if (tempId >= uw.ID_SECTION.HERO[0] && tempId <= uw.ID_SECTION.HERO[1]) {
            return true;
        }
        else if ((tempId >= uw.ID_SECTION.MONSTER[0] && tempId <= uw.ID_SECTION.MONSTER[1]) || (tempId >= uw.ID_SECTION.BOSS[0] && tempId <= uw.ID_SECTION.BOSS[1])) {
            return false;
        }
        return null;
    }
    uw.idBelongHero = idBelongHero;
    /**
     * 通过模板id获取到物品边框
     * @param tempId
     * @returns {string}
     */
    function getItemBorderByTempId(tempId) {
        var quality = 1, isFragment;
        if (tempId != 0) {
            var temp = mo.getJSONWithFileNameAndID(uw.cfg_t_item, tempId);
            quality = temp[uw.t_item_quality];
            isFragment = uw.isFragment(tempId);
        }
        return uw.getQualityFrameName(quality, isFragment);
    }
    uw.getItemBorderByTempId = getItemBorderByTempId;
    /**
     * 通过模板id获取到物品品质
     * @param tempId
     * @returns {string}
     */
    function getItemColorType(tempId) {
        var quality = 1;
        if (tempId != 0) {
            var temp = mo.getJSONWithFileNameAndID(uw.cfg_t_item, tempId);
            quality = temp[uw.t_item_quality];
        }
        return uw.colorType.itemQualityMap[quality];
    }
    uw.getItemColorType = getItemColorType;
    /**
     * 判断物品是否碎片
     * @param tempId
     * @returns {boolean}
     */
    function isFragment(tempId) {
        var temp = mo.getJSONWithFileNameAndID(uw.cfg_t_item, tempId), type = temp[uw.t_item_type];
        return (type == uw.c_prop.itemTypeKey.heroFragment || type == uw.c_prop.itemTypeKey.exclusiveFragment);
    }
    uw.isFragment = isFragment;
    function getItemColorByTempId(tempId) {
        var temp = mo.getJSONWithFileNameAndID(uw.cfg_t_item, tempId);
        return uw.getColorByQuality(temp[uw.t_item_quality]);
    }
    uw.getItemColorByTempId = getItemColorByTempId;
    /**
     * 获取物品品阶字体颜色
     * @param quality
     * @returns {*}
     */
    var _colorOfQuality;
    function getColorByQuality(quality) {
        if (!_colorOfQuality) {
            _colorOfQuality = {
                1: mo.c3b(221, 221, 221),
                2: mo.c3b(80, 255, 50),
                3: mo.c3b(80, 255, 50),
                4: mo.c3b(0, 150, 255),
                5: mo.c3b(0, 150, 255),
                6: mo.c3b(253, 104, 255),
                7: mo.c3b(253, 104, 255),
                8: mo.c3b(255, 189, 47),
                9: mo.c3b(255, 189, 47),
                10: mo.c3b(255, 47, 47),
                11: mo.c3b(255, 47, 47)
            };
        }
        return _colorOfQuality[quality];
    }
    uw.getColorByQuality = getColorByQuality;
    /**
     * 根据经验获取到当前等级
     * @param expc
     * @param currLvl
     * @param key
     * @returns {*}
     */
    function getLvlByExpc(expc, currLvl, key) {
        var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
        var maxLvl = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.maxLvl)[0];
        currLvl = currLvl || 1;
        while (true) {
            var lvlInfo = c_lvl[currLvl];
            if (!lvlInfo)
                return Math.min(maxLvl, currLvl);
            if (lvlInfo[key] > expc) {
                return Math.min(maxLvl, currLvl - 1);
            }
            currLvl++;
        }
    }
    uw.getLvlByExpc = getLvlByExpc;
    /**
     * 生成已经堆叠过的BagDataCtrl列表
     * @param items 物品字典，格式{模板id: 数量}
     */
    function getRepeatedBagDataCtrlList(items) {
        var self = this;
        var list = [];
        var key, count, temp;
        for (key in items) {
            temp = mo.getJSONWithFileNameAndID(uw.cfg_t_item, key);
            count = items[key];
            var maxRepeat = temp[uw.t_item_maxRepeat], maxRepeatGroup, itemCtrl;
            if (maxRepeat != 0) {
                maxRepeatGroup = Math.floor(count / maxRepeat);
                for (var i = 0; i < maxRepeatGroup; i++) {
                    itemCtrl = uw.BagDataCtrl.create(key, maxRepeat);
                    list.push(itemCtrl);
                    count -= maxRepeat;
                }
            }
            if (count > 0) {
                itemCtrl = uw.BagDataCtrl.create(key, count);
                list.push(itemCtrl);
            }
        }
        return list;
    }
    uw.getRepeatedBagDataCtrlList = getRepeatedBagDataCtrlList;
    /**
     * 添加一定数量物品到BagDataCtrl数组中。会自动堆叠
     * @param id
     * @param num
     * @param ctrlList
     * @returns {Number} 返回添加DataCtrl的个数
     */
    function addItemIntoBagCtrlList(ctrlList, id, num) {
        num = num || 1;
        var itemCtrl;
        var totalCount = 0;
        var t_item = mo.getJSONWithFileNameAndID(uw.cfg_t_item, id);
        var maxGet = t_item[uw.t_item_maxGet];
        var maxRepeat = t_item[uw.t_item_maxRepeat];
        var addDataCtrlLength = 0;
        //1.填充dataCtrlList中的数量
        var count;
        totalCount += num;
        for (var i = 0, li = ctrlList.length; i < li; i++) {
            itemCtrl = ctrlList[i];
            if (id == itemCtrl._tempId) {
                count = itemCtrl.getCount();
                // 直接跳过达到最堆叠的分组
                if (maxRepeat != 0 && count == maxRepeat) {
                    continue;
                }
                totalCount += count;
                // 无限堆叠的直接往上累加总数
                if (maxRepeat == 0) {
                    itemCtrl.setCount(totalCount);
                    return;
                }
                // 填充未到达最大堆叠数的分组
                if (totalCount > maxRepeat) {
                    itemCtrl.setCount(maxRepeat);
                    totalCount -= maxRepeat;
                }
                else {
                    itemCtrl.setCount(totalCount);
                    totalCount = 0;
                }
            }
        }
        //2.检查是否达到最大获得数量
        if (uw.userDataCtrl.getItemNum(id) >= maxGet)
            return;
        //3.对剩余的进行再分组
        var itemCtrlAdd, maxRepeatGroup;
        maxRepeatGroup = Math.floor(totalCount / maxRepeat);
        for (var i = 0; i < maxRepeatGroup; i++) {
            itemCtrlAdd = uw.BagDataCtrl.create(id, maxRepeat);
            ctrlList.push(itemCtrlAdd);
            addDataCtrlLength++;
            totalCount -= maxRepeat;
        }
        if (totalCount > 0) {
            itemCtrlAdd = uw.BagDataCtrl.create(id, totalCount);
            ctrlList.push(itemCtrlAdd);
            addDataCtrlLength++;
        }
        return addDataCtrlLength;
    }
    uw.addItemIntoBagCtrlList = addItemIntoBagCtrlList;
    /**
     * 从[Bag|Equip]DataCtrl数组中删除一定数量物品
     * @param id
     * @param num
     * @param ctrlList
     * @returns {Number} 返回删除的DataCtrl的个数
     */
    function delItemIntoBagCtrlList(ctrlList, id, num) {
        num = num || 1;
        var itemCtrl, totalCount = 0, dropArr = [];
        for (var i = ctrlList.length - 1; i >= 0; i--) {
            itemCtrl = ctrlList[i];
            if (itemCtrl._tempId == id) {
                totalCount += itemCtrl.getCount();
                totalCount -= num;
                if (totalCount <= 0) {
                    dropArr.push(itemCtrl);
                }
                else {
                    itemCtrl.setCount(totalCount);
                    break;
                }
            }
        }
        var dropLength = dropArr.length;
        while (dropArr.length) {
            mo.ArrayRemoveObject(ctrlList, dropArr.pop());
        }
        return dropLength;
    }
    uw.delItemIntoBagCtrlList = delItemIntoBagCtrlList;
    /**
     * 检验等级是否足够
     * @param sysName
     * @param showMsg
     */
    function verifyLevel(sysName, showMsg) {
        if (showMsg === void 0) { showMsg = true; }
        var myLevel = uw.userDataCtrl.getLvl();
        var openData = mo.getJSONWithFileNameAndID(uw.cfg_c_open, sysName);
        var lvlRequired = openData[uw.c_open_lvlRequired];
        if (myLevel < lvlRequired) {
            if (showMsg) {
                if (lvlRequired < 80) {
                    mo.showMsg(uw.id_c_msgCode.noOpen, lvlRequired);
                }
                else {
                    mo.showMsg(uw.id_c_msgCode.noSystem);
                }
            }
            return false;
        }
        return true;
    }
    uw.verifyLevel = verifyLevel;
    /**
     * @param heroCurLevel 英雄当前的等级
     * @param heroCurExp 英雄当前的经验
     * @param exp 获得的经验
     * @returns {number}
     */
    function getHeroProgress(heroCurLevel, heroCurExp, exp) {
        var lvlData = mo.getJSONWithFileName(uw.cfg_c_lvl)[heroCurLevel];
        var expcToLvlUp = lvlData[uw.c_lvl_expcToLvlUp];
        var minExpcOfLvl = lvlData[uw.c_lvl_minExpcOfLvl];
        return (0 | ((heroCurExp + exp - minExpcOfLvl) / expcToLvlUp) * 100);
    }
    uw.getHeroProgress = getHeroProgress;
    /**
     * 谈话内容
     * @param copyId
     * @param isBefore
     * @returns []
     */
    function getTalkByCopyId(copyId, isBefore) {
        var copyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
        var talk = isBefore ? copyInfo[uw.t_copy_talkBeforeFight] : copyInfo[uw.t_copy_talkAfterFight];
        if (!talk)
            return [];
        var matrixArr = uw.fightMainCtrl.getMatrix();
        var talkArr = talk.split(";"), talkObj = [];
        for (var i = 0; i < talkArr.length; i++) {
            var ta = talkArr[i].split(":");
            var tempId = parseInt(ta[0]);
            var obj = {
                tempId: tempId || mo.randomFromArr(matrixArr).tempId,
                align: tempId == 0 ? 0 : 1,
                content: ta[1]
            };
            talkObj.push(obj);
        }
        return talkObj;
    }
    uw.getTalkByCopyId = getTalkByCopyId;
    /**
     * 某个副本是否有谈话内容
     * @param copyId
     * @param isBefore
     * @returns []
     */
    function checkTalkByCopyId(copyId, isBefore) {
        var copyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
        var talk = isBefore ? copyInfo[uw.t_copy_talkBeforeFight] : copyInfo[uw.t_copy_talkAfterFight];
        return !!talk;
    }
    uw.checkTalkByCopyId = checkTalkByCopyId;
    /**
     * 加载资源
     *      1)...preload(function(cb1){
 *          mo.request(iface, args, function(){
 *              cb1();
 *          });
 *      }, "base", cb, target);
     *
     *      2)...preload("base", cb, target);
     *
     *      3)...preload(["a.png"], cb);
     * @param {Function} reqTask 请求处理任务，格式为：
     *          function(cb){
 *              cb();//第一个参数为error，如果传了(例如cb("error"))就表示有错了。那么最终的callback将不会被执行。
 *          }
     * @param {Array|String} resources
     *          1、数组：和原来一样
     *          2、字符串：cfgName
     * @param {Function} cb    最终的回调
     * @param {Object} target    回调函数的上下文
     * @returns {mo.RequestLoaderScene|*}
     */
    function preload(reqTask, resources, cb, target) {
        //        uw.LoaderScene.preload.apply(uw.LoaderScene, arguments);
        uw.warn("呵呵，还没有实现啊");
        //todo oldma 临时的
        reqTask(function () {
            cb.call(target);
        });
    }
    uw.preload = preload;
    /**
     * 竞技场的排名边框
     * @param rank
     * @returns {string}
     */
    function getRankBorder(rank) {
        if (rank > 0 && rank <= 3) {
            return res.borderRankFrameName[rank];
        }
        else {
            return res.borderRankFrameName[999];
        }
    }
    uw.getRankBorder = getRankBorder;
    var _fragIdToHeroTidMap;
    function getFragIdToHeroTidMap() {
        if (!_fragIdToHeroTidMap) {
            _fragIdToHeroTidMap = {};
            var t_hero = mo.getJSONWithFileName(uw.cfg_t_hero);
            var t_warrior = mo.getJSONWithFileName(uw.cfg_t_warrior);
            for (var tempId in t_hero) {
                var temp = t_hero[tempId];
                var tid = temp[uw.t_hero_tid];
                var warriorTemp = t_warrior[tid];
                if (!warriorTemp) {
                    uw.error("英雄配置数据有误！未发现heroId【%s】tid【%s】所对应的warrior数据，请检查！", tempId, tid);
                    continue;
                }
                var fragId = warriorTemp[uw.t_warrior_fragmentId];
                if (_fragIdToHeroTidMap[fragId])
                    continue;
                _fragIdToHeroTidMap[fragId] = temp[uw.t_hero_tid];
            }
        }
        return _fragIdToHeroTidMap;
    }
    uw.getFragIdToHeroTidMap = getFragIdToHeroTidMap;
    function getGainArr(gainItems) {
        var KEY = uw.dsConsts.UseItemInfo;
        var items = gainItems[KEY.items] || {};
        var tempId, count, temp;
        var arr = [];
        for (tempId in items) {
            count = items[tempId];
            temp = mo.getJSONWithFileNameAndID(uw.cfg_t_item, tempId);
            arr.push({ tempId: tempId, count: count });
        }
        //显示提示
        if (arr.length == 0)
            return;
        return arr;
    }
    /**
     *  显示一个浮动的提示框，提示已获得的物品信息
     * @param gainItems
     */
    function showGainTips(gainItems) {
        var arr = getGainArr(gainItems);
        uw.ShowGainTips.show(arr);
    }
    uw.showGainTips = showGainTips;
    /**
     * 显示一个对话框提示获取的物品
     * @param gainItems
     * @param isShowRemainTime
     * @param title
     * @param cb
     * @param target
     */
    function showGainTipsByDlg(gainItems, isShowRemainTime, title, cb, target) {
        if (isShowRemainTime === void 0) { isShowRemainTime = false; }
        if (title === void 0) { title = "充值获得"; }
        var arr = getGainArr(gainItems);
        var tips = uw.GetItemDlg.create(arr, isShowRemainTime);
        tips.setTitle(title);
        tips.show();
        if (cb && target) {
            tips.onClose(cb, target);
        }
        return tips;
    }
    uw.showGainTipsByDlg = showGainTipsByDlg;
    function getCombatInfo(copyId) {
        var combatData = mo.getJSONWithFileName(uw.cfg_t_combat);
        var combatIds = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId)[uw.t_copy_combatId];
        var id, cbData, monsterIds, tempId, monsters = [];
        if (combatIds.length > 0) {
            for (var i = 0; i < combatIds.length; i++) {
                id = combatIds[i];
                cbData = combatData[id];
                monsterIds = cbData[uw.t_combat_monsterIds];
                monsters.push(monsterIds);
            }
        }
        return monsters;
    }
    uw.getCombatInfo = getCombatInfo;
    /**
     * 获取功能开启所需的VIP等级
     * @key 功能名 e.g uw.c_vip_isStrengthen
     */
    function getVipOpenLevel(key) {
        var vipJson = mo.getJSONWithFileName(uw.cfg_c_vip), vipLimit;
        for (var vipLevel in vipJson) {
            vipLimit = vipJson[vipLevel];
            if (vipLimit[key] > 0) {
                return vipLevel;
            }
        }
        return 0;
    }
    uw.getVipOpenLevel = getVipOpenLevel;
    /**
     * 获取模块开启所需的领主等级
     * @key 功能名 e.g uw.id_c_open.aKeyStrengthen
     */
    function getLeaderOpenLevel(key) {
        var openData = mo.getJSONWithFileNameAndID(uw.cfg_c_open, key);
        return openData[uw.c_open_lvlRequired];
    }
    uw.getLeaderOpenLevel = getLeaderOpenLevel;
    /**
     * 处理今日刷新的公用方法。
     * @param refreshTime
     * @param cb
     * @param hours
     * @returns {*}
     */
    function handleTodayRefresh(refreshTime, cb, hours) {
        var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
        hours = hours == null ? c_game[uw.id_c_game.refreshTime][0] : hours;
        var now = Date.newDate();
        if (!refreshTime)
            refreshTime = now.clone();
        else if (typeof refreshTime == "string")
            refreshTime = Date.newDate(refreshTime);
        var needToRefresh = !refreshTime.isAfter(now);
        if (needToRefresh) {
            var ft = Date.today();
            ft.addHours(hours);
            if (!ft.isAfter(now))
                ft.addDays(1);
        }
        return cb(needToRefresh, ft);
    }
    uw.handleTodayRefresh = handleTodayRefresh;
    /**
     * 获取今日次数的公用方法。
     * @param refreshTime
     * @param cb
     * @param hours
     * @returns {*}
     */
    function getTodayCount(refreshTime, cb, hours) {
        return uw.handleTodayRefresh(refreshTime, cb, hours);
    }
    uw.getTodayCount = getTodayCount;
    /**
     * 设置钻石颜色
     * @param parent
     * @param name
     * @param whiteColor 是否使用白色
     */
    function setDiamondColor(parent, name, whiteColor) {
        var args = Array.prototype.slice.apply(arguments);
        var widget, isWhiteColor = false;
        if (args.length >= 2) {
            if (typeof name == "boolean") {
                widget = parent;
                isWhiteColor = name;
            }
            else {
                widget = parent.getWidgetByName(name);
            }
            if (whiteColor != null) {
                isWhiteColor = whiteColor;
            }
        }
        else {
            widget = parent;
        }
        if (isWhiteColor) {
            widget.setColor(mo.WHITE);
        }
        else {
            widget.setColor(mo.c3b(109, 209, 255));
        }
        widget.enableStroke(mo.c3b(0, 0, 0), 3);
    }
    uw.setDiamondColor = setDiamondColor;
    /**
     * 设置金币的颜色
     * @param parent
     * @param name
     * @param whiteColor 是否使用白色
     */
    function setGoldColor(parent, name, whiteColor) {
        var args = Array.prototype.slice.apply(arguments);
        var widget, isWhiteColor = false;
        if (args.length >= 2) {
            if (typeof name == "boolean") {
                widget = parent;
                isWhiteColor = name;
            }
            else {
                widget = parent.getWidgetByName(name);
            }
            if (whiteColor != null) {
                isWhiteColor = whiteColor;
            }
        }
        else {
            widget = parent;
        }
        if (isWhiteColor) {
            widget.setColor(mo.WHITE);
        }
        else {
            widget.setColor(mo.c3b(255, 202, 109));
        }
        widget.enableStroke(mo.c3b(0, 0, 0), 3);
    }
    uw.setGoldColor = setGoldColor;
    function getRewardByRank(myRank) {
        var rewardJson = mo.getJSONWithFileName(uw.cfg_c_rankReward);
        var minRank, maxRank, myReward, myKey;
        for (var key in rewardJson) {
            var rank = rewardJson[key][uw.c_rankReward_arenaRank];
            if (rank > myRank) {
                maxRank = rank;
                myReward = rewardJson[myKey][uw.c_rankReward_arenaReward];
                return {
                    myReward: myReward,
                    minRank: minRank,
                    maxRank: maxRank
                };
            }
            else {
                myKey = key;
                minRank = rank;
            }
        }
    }
    uw.getRewardByRank = getRewardByRank;
    /**
     * 根据资源id获取到其所需要的资源列表。
     * @param skillId
     * @returns {Array}
     */
    function getSkillResArr(skillId) {
        var arr = [];
        var skillTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_skill, skillId);
        var skillDisplayTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_skillDisplay, skillTemp[uw.t_skill_showId]);
        var fxSkill = skillDisplayTemp[uw.t_skillDisplay_fxSkill];
        if (fxSkill) {
            arr.push(resHelper.getArmPath(resHelper.dynamic.effect, fxSkill));
        }
        var fxHit = skillDisplayTemp[uw.t_skillDisplay_fxHit];
        if (fxHit) {
            arr.push(resHelper.getArmPath(resHelper.dynamic.effect, fxHit));
        }
        var skillAudio = resHelper.getSkillAudioPath(skillId);
        if (skillAudio) {
            arr.push(skillAudio);
        }
        var hitAudio = resHelper.getSkillHitAudioPath(skillId);
        if (hitAudio) {
            arr.push(hitAudio);
        }
        return mo.filter(arr);
    }
    uw.getSkillResArr = getSkillResArr;
    /**
     * 获取角色所需资源。
     * @param roleId
     * @returns {Array}
     */
    function getRoleResArr(roleId) {
        var resArr = [];
        resArr.push(resHelper.getArmPath(resHelper.dynamic.role, roleId));
        var deathAudio = resHelper.getDeathAudioPath(roleId);
        if (deathAudio)
            resArr.push(deathAudio);
        //        var matrixAudio = resHelper.getRoleMatrixWordAudioPath(roleId);
        //        if (walkAudio) resArr.push(walkAudio);
        //        var walkAudio = resHelper.getWalkWordAudioPath(roleId);
        //        if (matrixAudio) resArr.push(matrixAudio);
        //其他地方加载了
        /*        var temp = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, roleId);
                var normalSkill = temp[uw.t_warrior_normalSkill];
                if (normalSkill) resArr = resArr.concat(uw.getSkillResArr(normalSkill));
        
                var skillIds = temp[uw.t_warrior_skills] || [];
                for (var i = 0, li = skillIds.length; i < li; ++i) {
                    var arr = uw.getSkillResArr(skillIds[i]);
                    resArr = resArr.concat(arr);
                }
        
                var mixSkill = temp[uw.t_warrior_mixSkill];
                if (mixSkill) resArr = resArr.concat(uw.getSkillResArr(mixSkill));*/
        return mo.filter(resArr);
    }
    uw.getRoleResArr = getRoleResArr;
    function _addTipContent(arr, curValue, oldValue, name, notRound) {
        var equipProp = uw.c_prop.equipProp;
        curValue = curValue || 0;
        oldValue = oldValue || 0;
        var value = notRound ? curValue - oldValue : Math.round(curValue) - Math.round(oldValue);
        value = Math.round(value * 100) / 100;
        name = equipProp[name];
        var str = "[ubb color=%s size=70]%s[/ubb]";
        if (value > 0) {
            arr.push(mo.formatStr(str, "#00e91b", name + "  +" + value));
        }
        else if (value < 0) {
            arr.push(mo.formatStr(str, "#ff1a1a", name + "  " + value));
        }
    }
    function showPropTips(props, oldProps) {
        var arr = [];
        var equipPropKey = uw.c_prop.equipPropKey;
        _addTipContent(arr, props.life, oldProps.life, equipPropKey.life);
        _addTipContent(arr, props.power, oldProps.power, equipPropKey.power);
        _addTipContent(arr, props.intel, oldProps.intel, equipPropKey.intel);
        _addTipContent(arr, props.pAttack, oldProps.pAttack, equipPropKey.pAttack);
        _addTipContent(arr, props.pDefence, oldProps.pDefence, equipPropKey.pDefence);
        _addTipContent(arr, props.mAttack, oldProps.mAttack, equipPropKey.mAttack);
        _addTipContent(arr, props.mDefence, oldProps.mDefence, equipPropKey.mDefence);
        _addTipContent(arr, props.hp, oldProps.hp, equipPropKey.hp);
        _addTipContent(arr, props.hpRecovery, oldProps.hpRecovery, equipPropKey.hpRecovery);
        _addTipContent(arr, props.crit, oldProps.crit, equipPropKey.crit);
        _addTipContent(arr, props.reCrit, oldProps.reCrit, equipPropKey.reCrit);
        _addTipContent(arr, props.hit, oldProps.hit, equipPropKey.hit);
        _addTipContent(arr, props.reHit, oldProps.reHit, equipPropKey.reHit);
        _addTipContent(arr, props.pAttackMult, oldProps.pAttackMult, equipPropKey.pAttackMult, true);
        _addTipContent(arr, props.pDefenceMult, oldProps.pDefenceMult, equipPropKey.pDefenceMult, true);
        _addTipContent(arr, props.mAttackMult, oldProps.mAttackMult, equipPropKey.mAttackMult, true);
        _addTipContent(arr, props.mDefenceMult, oldProps.mDefenceMult, equipPropKey.mDefenceMult, true);
        _addTipContent(arr, props.suckBlood, oldProps.suckBlood, equipPropKey.suckBlood);
        _addTipContent(arr, props.ignoreDefence, oldProps.ignoreDefence, equipPropKey.ignoreDefence);
        _addTipContent(arr, props.skillLvl, oldProps.skillLvl, equipPropKey.skillLvl);
        _addTipContent(arr, props.energy, oldProps.energy, equipPropKey.energy);
        _addTipContent(arr, props.energyRecovery, oldProps.energyRecovery, equipPropKey.energyRecovery);
        uw.TextTips.show(arr);
    }
    uw.showPropTips = showPropTips;
    var msgType = {
        marquee1: 1,
        marquee2: 2,
        marquee3: 3,
        tip: 10,
        chat1: 11,
        chat2: 12,
        alert: 13,
        confirm: 14,
        confirmRecharge: 15,
        confirmPurchase: 16,
        confirmUse: 17,
        confirmUpgrade: 18,
        confirmCountDown: 19,
        retryToConnect: 20,
        confirmWithCheckBox: 100 //100	2个按钮提示框，含勾选框“不再提示”
    };
    function setMsgCode() {
        var data = mo.getJSONWithFileName(uw.cfg_c_msgCode);
        mo.setMsgData(data);
        mo.defaultMsgType = msgType.alert;
        mo.msgTypeKey = uw.c_msgCode_region0;
        mo.msgTextKey = uw.c_msgCode_text;
        mo.registerMsgDlg(msgType.tip, uw.TipDlg);
        mo.registerMsgDlg(msgType.alert, uw.AlertDlg);
        mo.registerMsgDlg(msgType.confirm, uw.ConfirmDlg);
        mo.registerMsgDlg(msgType.confirmRecharge, uw.ConfirmRechargeDlg);
        mo.registerMsgDlg(msgType.confirmPurchase, uw.ConfirmPurchaseDlg);
        mo.registerMsgDlg(msgType.confirmUse, uw.ConfirmUseDlg);
        mo.registerMsgDlg(msgType.confirmUpgrade, uw.ConfirmUpgradeVipDlg);
        mo.registerMsgDlg(msgType.confirmCountDown, uw.ConfirmCountDownDlg);
        mo.registerMsgDlg(msgType.retryToConnect, uw.RetryDlg);
        mo.registerMsgDlg(msgType.confirmWithCheckBox, uw.TipDlg);
    }
    uw.setMsgCode = setMsgCode;
    /**
     * 升级提示界面
     */
    var needToShowLevelUp, hasAddLvlUpListener = false;
    function checkLeaderLevelUp() {
        //要是在主城就直接弹窗了
        if (uw.HomeScene.__className == mo.runningScene.__className) {
            uw.HomeLevelUpLayer.getInstance().show();
            return;
        }
        if (hasAddLvlUpListener)
            return; //已经注册过了就不再注册了
        if (!needToShowLevelUp) {
            needToShowLevelUp = [
                uw.HomeScene.__className,
                uw.CopyScene.__className,
                uw.CopyInfoScene.__className
            ];
        }
        var self = this;
        var dispatcher = mo.visibleDispatcher, eventType = mo.DisplayTray.__className;
        var func = function () {
            if (needToShowLevelUp.indexOf(mo.runningScene.__className) != -1) {
                hasAddLvlUpListener = false;
                mo.removeAfterEventListener(dispatcher, eventType, func, self);
                uw.HomeLevelUpLayer.getInstance().show();
            }
        };
        mo.addAfterEventListener(dispatcher, eventType, func, self);
        hasAddLvlUpListener = true;
    }
    uw.checkLeaderLevelUp = checkLeaderLevelUp;
    /**
     * 检查怪物是否是Boss类型
     * @param mType
     */
    function isBoss(mType) {
        return mType >= uw.c_prop.bossTypeKey.nBoss;
    }
    uw.isBoss = isBoss;
    /**
     * 弹出确认框，确认items里哪些物品已加达到最大获得上限
     * @param items 物品ID数组|物品ID字典
     * @param cb 确定领取时的回调
     * @param target
     * @returns string/null 有则返回物品名数组字符串，无则返回null
     */
    function confirmMaxGetItems(items, cb, target) {
        var isDict = items instanceof Array ? false : true;
        var strArr = [];
        var cfg_t_item = mo.getJSONWithFileName(uw.cfg_t_item);
        for (var index in items) {
            var tempId = isDict ? index : items[index];
            var t_item = cfg_t_item[tempId];
            var maxGet = t_item[uw.t_item_maxGet];
            if (maxGet > 0) {
                if (uw.userDataCtrl.getItemNum(tempId) >= maxGet) {
                    strArr.push(mo.formatStr("[ubb color=%s]%s[/ubb]", uw.getItemColorByTempId(tempId), t_item[uw.t_item_name]));
                }
            }
        }
        var showArgs = strArr.length > 0 ? strArr.join(',') : null;
        if (showArgs) {
            mo.showMsg(uw.id_c_msgCode.itemMaxCantGet, showArgs, function () {
                if (cb)
                    cb.call(target);
            });
        }
        else {
            if (cb)
                cb.call(target);
        }
    }
    uw.confirmMaxGetItems = confirmMaxGetItems;
    function showSubModule(LayerClass, args, reqTask, onEndBeforeShow) {
        if (arguments.length == 2) {
            onEndBeforeShow = reqTask;
            reqTask = null;
        }
        var moduleName = mo.runningScene.__className;
        var subModuleName = LayerClass.__className;
        res.mgr.pushSubModule(moduleName, subModuleName);
        mo.preloadWaiting(reqTask, subModuleName, function () {
            var layer = LayerClass.create.apply(LayerClass, args);
            layer.moduleInfo = { moduleName: moduleName, subModuleName: subModuleName };
            if (onEndBeforeShow)
                onEndBeforeShow(layer);
            layer.show();
        });
    }
    uw.showSubModule = showSubModule;
})(uw || (uw = {}));

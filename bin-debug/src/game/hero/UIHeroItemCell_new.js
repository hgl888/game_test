/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var HeroCellDisplayData = (function () {
        function HeroCellDisplayData() {
        }
        var __egretProto__ = HeroCellDisplayData.prototype;
        __egretProto__.resetByHeroDataCtrl = function (heroDataCtrl) {
            var self = this;
            self.heroDataCtrl = heroDataCtrl;
            self.owned = true;
            self.tid = heroDataCtrl.tid;
            self.tempId = heroDataCtrl.tempId;
            self.lvl = heroDataCtrl.lvl;
            self.trainLvl = heroDataCtrl.trainLvl;
            self.job = heroDataCtrl.getJobFrameName();
            self.name = heroDataCtrl.name;
            if (self.trainLvl)
                self.name += "+" + self.trainLvl;
            self.body = resHelper.getRoleBodyPath(heroDataCtrl.tid);
            self.normalCanUp = heroDataCtrl.hasNormalEquipToUp();
            self.fragmentId = heroDataCtrl.fragmentId;
            self.quality = heroDataCtrl.quality;
            self.colorType = heroDataCtrl.colorType;
            self.posType = heroDataCtrl.posType;
            //专属装备状态
            self.resetExclusiveInfo();
            //祝福装备状态
            self.resetWishInfo();
        };
        __egretProto__.resetExclusiveInfo = function () {
            var self = this;
            var heroDataCtrl = self.heroDataCtrl;
            var equipPartKey = uw.c_prop.equipPartKey;
            var exclusiveEquipDataCtrl = heroDataCtrl.getEquipDataCtrlByPart(equipPartKey.exclusive);
            var exclusiveWore = exclusiveEquipDataCtrl && !exclusiveEquipDataCtrl.isTempOnly;
            if (exclusiveWore) {
                var exclusiveTempId = exclusiveEquipDataCtrl.tempId;
                self.exclusiveIcon = resHelper.getItemIconPath(exclusiveTempId);
                self.exclusiveColorType = uw.getItemColorType(exclusiveTempId);
                self.exclusiveBgVisible = true;
                self.exclusiveAdd = null;
            }
            else {
                self.exclusiveIcon = mo.formatStr(res.ui_panel.tmp_eqp_png, 6);
                self.exclusiveColorType = uw.getItemColorType(0);
                self.exclusiveBgVisible = false;
                var eedc2 = heroDataCtrl.getNotOnExclusiveEquipDataCtrl();
                if (eedc2) {
                    if (eedc2.needLvl > heroDataCtrl.getLvl()) {
                        self.exclusiveAdd = res.ui_btn.ico_forpluslocked_png;
                    }
                    else {
                        self.exclusiveAdd = res.ui_btn.ico_forplus_png;
                    }
                }
                else {
                    self.exclusiveAdd = null;
                }
            }
        };
        __egretProto__.resetWishInfo = function () {
            var self = this;
            var heroDataCtrl = self.heroDataCtrl;
            var equipPartKey = uw.c_prop.equipPartKey;
            var wishEquipDataCtrl = heroDataCtrl.getEquipDataCtrlByPart(equipPartKey.wish);
            var wishWore = wishEquipDataCtrl && !wishEquipDataCtrl.isTempOnly;
            if (wishWore) {
                var wishTempId = wishEquipDataCtrl.tempId;
                self.wishIcon = resHelper.getItemIconPath(wishTempId);
                self.wishColorType = uw.getItemColorType(wishTempId);
                self.wishBgVisible = true;
                self.wishAdd = null;
            }
            else {
                self.wishIcon = mo.formatStr(res.ui_panel.tmp_eqp_png, 7);
                self.wishColorType = uw.getItemColorType(0);
                self.wishBgVisible = false;
                self.wishAdd = null;
            }
        };
        HeroCellDisplayData.getDisplayDatas = function (posType) {
            var clazz = this;
            var userDataCtrl = uw.userDataCtrl;
            var ownedTids = [];
            var heroDataCtrlList = userDataCtrl._heroDataCtrlList;
            var canCallList = [];
            var ownedList = [];
            var notOwnedList = [];
            for (var i = 0, li = heroDataCtrlList.length; i < li; ++i) {
                var heroDataCtrl = heroDataCtrlList[i];
                var tid = heroDataCtrl.tid;
                ownedTids.push(tid);
                var displayData = new clazz();
                displayData.resetByHeroDataCtrl(heroDataCtrl);
                ownedList.push(displayData);
            }
            //计算出
            var t_hero = mo.getJSONWithFileName(uw.cfg_t_hero);
            var t_warrior = mo.getJSONWithFileName(uw.cfg_t_warrior);
            var c_heroCall = mo.getJSONWithFileName(uw.cfg_c_heroCall);
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
            var tempMap = {}; //避免重复用的
            var heroSort = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.heroSort);
            for (var key in c_heroCall) {
                var tempId = parseInt(key);
                var heroTemp = t_hero[tempId];
                var tid = heroTemp[uw.t_hero_tid];
                if (!tempMap[tid] && ownedTids.indexOf(tid) < 0) {
                    var warriorTemp = t_warrior[tid];
                    var displayData = new clazz();
                    displayData.tid = tid;
                    displayData.tempId = tempId;
                    displayData.job = mo.formatStr(res.ui_hero.tmp_job_png, warriorTemp[uw.t_warrior_job]);
                    displayData.name = warriorTemp[uw.t_warrior_name];
                    displayData.colorType = uw.getRoleColorType(0);
                    displayData.body = resHelper.getRoleBodyPath(tid);
                    displayData.posType = 3; //站位类型，前排、中排、后排
                    for (var i = 0; i < heroSort.length; ++i) {
                        if (warriorTemp[uw.t_warrior_posOrder] <= heroSort[i]) {
                            displayData.posType = i + 1;
                            break;
                        }
                    }
                    var quality = heroTemp[uw.t_hero_quality];
                    var fragmentId = warriorTemp[uw.t_warrior_fragmentId];
                    displayData.fragmentId = fragmentId;
                    displayData.quality = quality;
                    displayData.fragOwned = uw.userDataCtrl.getItemNum(fragmentId);
                    var num = 0;
                    for (var q = 1; q <= quality; ++q) {
                        num += c_lvl[q][uw.c_lvl_fragment];
                    }
                    displayData.fragRequired = num;
                    displayData.fragPercent = displayData.fragOwned / displayData.fragRequired;
                    var canCall = displayData.canCall = displayData.fragOwned >= displayData.fragRequired;
                    if (canCall) {
                        canCallList.push(displayData);
                    }
                    else {
                        notOwnedList.push(displayData);
                    }
                    tempMap[tid] = 1;
                }
            }
            var results = [];
            canCallList = clazz._filterHeroList(canCallList, posType, 1);
            ownedList = clazz._filterHeroList(ownedList, posType, 0);
            notOwnedList = clazz._filterHeroList(notOwnedList, posType, 2);
            results = results.concat(canCallList);
            results = results.concat(ownedList);
            results = results.concat(notOwnedList);
            return results;
        };
        HeroCellDisplayData._filterHeroList = function (list, posType, ownedType) {
            var results = [];
            for (var i = 0, li = list.length; i < li; ++i) {
                var displayData = list[i];
                if (posType == 0 || posType == displayData.posType) {
                    results.push(displayData);
                }
            }
            //排序函数设置
            var sQuality = "quality";
            var sLvl = "lvl";
            var sTempId = "tempId";
            var sFragPercent = "fragPercent"; //TODO
            var fragRquired = "fragRequired";
            var sortKeyList = ownedType == 0 ? [sLvl, sQuality, sTempId] : ownedType == 2 ? [sFragPercent, fragRquired, sTempId] : [fragRquired, sTempId];
            results.sort(mo.sortOption.bind({ list: sortKeyList }));
            return results;
        };
        return HeroCellDisplayData;
    })();
    uw.HeroCellDisplayData = HeroCellDisplayData;
    HeroCellDisplayData.prototype.__class__ = "uw.HeroCellDisplayData";
    var UIHeroItemCell_new = (function (_super) {
        __extends(UIHeroItemCell_new, _super);
        function UIHeroItemCell_new() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIHeroItemCell_new.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this, cellOption = self._cellOption;
            cellOption.jsonPath = res.uiHeroItem_new_ui;
            cellOption.clickWidgetName = self.__class.PANEL_CLICK;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
            //购买了装备、穿上卸下装备通知
            self.registerClassByKey(uw.HeroDataCtrl, uw.HeroDataCtrl.ON_EQUIP_CHANGED, self._onEquipChanged);
            //任何装备升阶时，都需要更新下状态
            self.registerClassByKey(uw.EquipDataCtrl, uw.EquipDataCtrl.ON_UPGRADE_EQUIP, self._handleNormalEquipInfo);
            //英雄更新了的时候，都需要更新下状态
            self.registerClassByKey(uw.HeroDataCtrl, uw.HeroDataCtrl.ON_RESET, function () {
                var ctrl = arguments[arguments.length - 1];
                var displayData = self._cellOption.data;
                if (displayData.heroDataCtrl == ctrl && (displayData.lvl < ctrl.lvl || displayData.trainLvl < ctrl.trainLvl || displayData.tempId < ctrl.tempId)) {
                    displayData.resetByHeroDataCtrl(ctrl);
                    self.resetByData(displayData);
                }
            });
            self.setTouchEnabledByName(self.__class.IMG_BG, false);
            self.setTouchEnabledByName(self.__class.PANEL_BORDER, false);
        };
        __egretProto__.resetByData = function (displayData) {
            var self = this, clazz = self.__class, cellOption = self._cellOption;
            cellOption.data = displayData;
            var owned = displayData.owned, canCall = displayData.canCall;
            //设置共有的
            self.setInfoByName(clazz.IMG_JOB, displayData.job); //设置职业icon
            self.setInfoByName(clazz.PANEL_HERO_NAME, {
                value: displayData.name,
                hAlign: mo.ALIGN_H_LEFT,
                fontSize: 54
            }); //设置英雄名称
            self.transColorByName(clazz.IMG_BG, displayData.colorType);
            self.transColorByName(clazz.PANEL_BORDER, displayData.colorType);
            self.setInfoByName(clazz.IMG_BODY, displayData.body); //设置胸像
            self.setVisibleByName(clazz.PANEL_STATUS, owned); //状态容器是否显示
            self.setVisibleByName(clazz.BAR_BG, !owned); //碎片进度条是否显示
            self.setGrayByName(clazz.IMG_BODY, !owned);
            self.setName("cell_heroTid_" + displayData.tid);
            //判断是三种状态的哪一种
            if (displayData.owned) {
                //如果非模板，则保存旧数据已作为判断
                self.setInfoByName(clazz.LABEL_LVL, displayData.lvl); //设置等级
                self.setVisibleByName(clazz.IMG_NORMAL_CAN_UP, displayData.normalCanUp); //普通装备是否可进阶
                var exclusiveCtrl = self.exclusiveCtrl;
                if (!exclusiveCtrl) {
                    exclusiveCtrl = self.exclusiveCtrl = uw.UIHeroIconCtrl_new.create(self.getWidgetByName(clazz.PANEL_EXCLUSIVE));
                    exclusiveCtrl.init4HeroCell();
                }
                var wishCtrl = self.wishCtrl;
                if (!wishCtrl) {
                    wishCtrl = self.wishCtrl = uw.UIHeroIconCtrl_new.create(self.getWidgetByName(clazz.PANEL_WISH));
                    wishCtrl.init4HeroCell();
                }
                exclusiveCtrl.set4HeroCell(displayData.exclusiveIcon, displayData.exclusiveColorType, displayData.exclusiveBgVisible, displayData.exclusiveAdd);
                wishCtrl.set4HeroCell(displayData.wishIcon, displayData.wishColorType, displayData.wishBgVisible, displayData.wishAdd);
            }
            else {
                //显示碎片进度
                var loadingBar = self.getWidgetByName(clazz.BAR_FRAGMENT);
                if (self._arm) {
                    self._arm.removeFromParent();
                    self._arm = null;
                }
                //更换进度条颜色图片
                if (canCall) {
                    var ctrl = uw.UpArmature.play(loadingBar, res.cca_ui.heroCanCall, null, function () {
                    }, self);
                    self._arm = ctrl.getArmature();
                    loadingBar.loadTexture(res.ui_common.bar1_png);
                }
                else {
                    loadingBar.loadTexture(res.ui_common.bar2_png);
                }
                loadingBar.setProgress(displayData.fragOwned, displayData.fragRequired, displayData.fragBarStr); //设置碎片进度
                loadingBar.getInnerLabel().setVisible(!canCall); //不可召唤时才显示进度的字符串
            }
        };
        __egretProto__._handleNormalEquipInfo = function () {
            var self = this, clazz = self.__class, displayData = self._cellOption.data;
            var heroDataCtrl = displayData.heroDataCtrl;
            if (!heroDataCtrl)
                return;
            displayData.normalCanUp = heroDataCtrl.hasNormalEquipToUp();
            self.setVisibleByName(clazz.IMG_NORMAL_CAN_UP, displayData.normalCanUp); //普通装备是否可进阶
        };
        __egretProto__._onEquipChanged = function (part) {
            var self = this;
            var hdc = arguments[arguments.length - 1];
            var displayData = self._cellOption.data;
            if (hdc == displayData.heroDataCtrl) {
                if (part == uw.c_prop.equipPartKey.exclusive) {
                    displayData.resetExclusiveInfo();
                    self.exclusiveCtrl.set4HeroCell(displayData.exclusiveIcon, displayData.exclusiveColorType, displayData.exclusiveBgVisible, displayData.exclusiveAdd);
                }
                else if (part == uw.c_prop.equipPartKey.wish) {
                    displayData.resetWishInfo();
                    self.wishCtrl.set4HeroCell(displayData.wishIcon, displayData.wishColorType, displayData.wishBgVisible, displayData.wishAdd);
                }
                else
                    self._handleNormalEquipInfo();
            }
        };
        UIHeroItemCell_new.__className = "UIHeroItemCell";
        UIHeroItemCell_new.PANEL_CLICK = "panel_click"; //点击层
        UIHeroItemCell_new.IMG_JOB = "img_job"; //职业图标
        UIHeroItemCell_new.PANEL_HERO_NAME = "panel_heroName"; //英雄名字
        UIHeroItemCell_new.PANEL_STATUS = "panel_status"; //状态容器
        UIHeroItemCell_new.IMG_NORMAL_CAN_UP = "img_normalCanUp"; //普通装备可升阶状态图标
        UIHeroItemCell_new.PANEL_EXCLUSIVE = "panel_exclusive"; //专属可穿戴图标
        UIHeroItemCell_new.PANEL_WISH = "panel_wish"; //祝福可穿戴图标
        UIHeroItemCell_new.IMG_LVL = "img_lvl"; //等级图标
        UIHeroItemCell_new.LABEL_LVL = "label_lvl"; //等级
        UIHeroItemCell_new.BAR_BG = "bar_bg"; //碎片进度条背景
        UIHeroItemCell_new.BAR_FRAGMENT = "bar_fragment"; //碎片进度条
        UIHeroItemCell_new.IMG_BG = "img_bg"; //背景图片
        UIHeroItemCell_new.IMG_BODY = "img_body"; //胸像
        UIHeroItemCell_new.PANEL_BORDER = "panel_border"; //边框
        return UIHeroItemCell_new;
    })(mo.UIGridCell);
    uw.UIHeroItemCell_new = UIHeroItemCell_new;
    UIHeroItemCell_new.prototype.__class__ = "uw.UIHeroItemCell_new";
})(uw || (uw = {}));

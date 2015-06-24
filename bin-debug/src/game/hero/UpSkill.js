var uw;
(function (uw) {
    //普通技能的GridCtrl
    var SkillGridCtrl = (function (_super) {
        __extends(SkillGridCtrl, _super);
        function SkillGridCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SkillGridCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._itemJsonPath = res.uiUpSkillItem_ui;
        };
        //设置每一项技能项
        __egretProto__._resetItemByData = function (widget, heroDataCtrl, index) {
            var self = this, clazz = self.__class;
            var skillData = heroDataCtrl.getSkillData(index); //获取技能模板数据
            var isLocked = heroDataCtrl.isSkillLocked(index); //技能是否锁定
            var isSkillMax = heroDataCtrl.isSkillMax(index); //技能是否已经达到最高等级
            var lvl = heroDataCtrl.getSkillLvl(index); //技能等级
            var trainLvlRequired = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.skillLearnQuality)[index]; //需要的培养等级
            var skillLvlStr = mo.formatStr("[ubb color=#E3AA00]Lv.%s[/ubb]", lvl);
            var skillLvlAdded = heroDataCtrl.get(uw.dsConsts.HeroEntity.skillLvl);
            if (skillLvlAdded) {
                skillLvlStr += mo.formatStr("[ubb color=#00FF00]+%s[/ubb]", skillLvlAdded);
            }
            widget.setInfoByName(clazz.LABEL_NAME, skillData.name); //技能名称
            widget.setInfoByName(clazz.LABEL_LVL, skillLvlStr); //技能等级
            widget.setVisibleByName(clazz.IMG_LOCK, isLocked); //是否锁
            widget.setVisibleByName(clazz.LABEL_LVL, !isLocked); //是否显示等级
            widget.setInfoByName(clazz.PANEL_DESC_TXT, { value: skillData.text, fontSize: 48, color: "#dcdcdc", autoResize: true }); //技能描述
            widget.setVisibleByName(clazz.LABEL_UNLOCK_CND, isLocked); //是否显示解锁描述
            widget.formatByName(clazz.LABEL_UNLOCK_CND, trainLvlRequired); //设置解锁描述
            widget.setGrayByName(clazz.IMG_SKILL, isLocked); //是否为灰色
            widget.setVisibleByName(clazz.IMG_GOLD, !isLocked && !isSkillMax); //是否显示金币图标
            widget.setVisibleByName(clazz.LABEL_GOLD, !isLocked && !isSkillMax); //是否显示金币文字
            widget.setDisappearedByName(clazz.BTN_UP, isLocked); //是否显示升级按键
            widget.setGrayByName(clazz.BTN_UP, !heroDataCtrl.canUpSkill(index)); //升级按键是否可以点击
            widget.setInfoByName(clazz.IMG_SKILL, skillData.icon); //动态设置技能图标
            uw.userDataCtrl.setGoldTxt(widget.getWidgetByName(clazz.LABEL_GOLD), heroDataCtrl.getGoldForSkill(index)); //设置金币显示，如果不够显示红色
            var labDesc = widget.getWidgetByName(clazz.PANEL_DESC_TXT);
            var descBgSize = widget.getSizeByName(clazz.PANEL_DESC);
            widget.setSizeByName(clazz.PANEL_DESC, descBgSize.width, labDesc.getSize().height + 90);
        };
        __egretProto__._initItemWidget = function (widget) {
            //设置项的监听
            var self = this, clazz = self.__class;
            widget.setVisibleByName(clazz.PANEL_DESC, false);
            widget.onClickByName(clazz.BTN_UP, function () {
                var itemIndex = widget.itemIndex;
                var heroDataCtrl = self._dataList[itemIndex];
                //调用技能升级的接口
                heroDataCtrl.upSkill(itemIndex, function () {
                    var pos = widget.getPositionByName(clazz.IMG_SKILL); //获得播放技能动画的位置
                    var ctrl = uw.UpArmature.play(widget, res.cca_ui.effect_upSkill, pos, function () {
                    }, self); //播放技能升级动画
                    ctrl.getArmature().setZOrder(99);
                });
            });
            widget.setTouchToShowByName(clazz.BTN_DESC, clazz.PANEL_DESC); //长按技能图标显示技能描述
        };
        SkillGridCtrl.__className = "SkillGridCtrl";
        SkillGridCtrl.IMG_SKILL = "img_skill"; //技能图标
        SkillGridCtrl.IMG_MIX_SKILL = "img_mixSkill"; //大招图标
        SkillGridCtrl.IMG_LOCK = "img_lock"; //技能锁图标
        SkillGridCtrl.IMG_GOLD = "img_gold"; //金币图标
        SkillGridCtrl.BTN_UP = "btn_up"; //升级按键
        SkillGridCtrl.LABEL_NAME = "label_name"; //技能名称
        SkillGridCtrl.LABEL_LVL = "label_lvl"; //技能等级
        SkillGridCtrl.LABEL_GOLD = "label_gold"; //金币
        SkillGridCtrl.PANEL_DESC = "panel_desc"; //显示技能描述面板
        SkillGridCtrl.PANEL_DESC_TXT = "panel_descTxt"; //技能描述
        SkillGridCtrl.PANEL_LVL_UP = "panel_lvlUp"; //升级动画容器
        SkillGridCtrl.BTN_DESC = "btn_desc"; //显示描述的按键
        SkillGridCtrl.LABEL_UNLOCK_CND = "label_unlockCnd"; //解锁条件说明
        return SkillGridCtrl;
    })(mo.GridController);
    uw.SkillGridCtrl = SkillGridCtrl;
    SkillGridCtrl.prototype.__class__ = "uw.SkillGridCtrl";
    var UpSkillCtrl = (function (_super) {
        __extends(UpSkillCtrl, _super);
        function UpSkillCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UpSkillCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiUpSkill_ui;
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            var containerSkills = self.getWidgetByName(clazz.PANEL_SKILLS);
            self._skillGridCtrl = uw.SkillGridCtrl.create(containerSkills); //技能列表
            self.setVisibleByName(clazz.PANEL_MIX_SKILL_DESC, false); //大招描述
            //显示大招技能描述
            self.setTouchToShowByName(clazz.BTN_MIX_SKILL_DESC, clazz.PANEL_MIX_SKILL_DESC); //长按技能图标显示技能描述
            self.onClickByName(clazz.BTN_ADD, self._onBuySkillPoint, self); //购买技能事件注册
            self.onClickByName(clazz.BTN_UP_MIX_SKILL, self._onUpMixSkill, self); //升级大招事件注册
            self.registerClassByKey(uw.HeroDataCtrl, uw.HeroDataCtrl.ON_UP_SKILL, self._onResest); //注册技能点变化事件
            self.registerClassByKey(uw.HeroDataCtrl, uw.HeroDataCtrl.ON_UP_TRAIN_LVL, self._onResest); //注册培养升阶事件
            self.registerClassByKey(uw.UserDataCtrl, uw.UserDataCtrl.ON_BUY_SKILL_POINTS, self._onResest); //注册培养升阶事件
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.gold.toString(), self._resetGold); //金币改变了
        };
        __egretProto__._resetGold = function () {
            var self = this, clazz = self.__class, heroDataCtrl = self._heroDataCtrl;
            uw.userDataCtrl.setGoldTxt(self.getWidgetByName(clazz.LABEL_MIX_SKILL_GOLD), heroDataCtrl.getGoldForSkill(3)); //设置金币文字颜色
            //TODO 这里先这么改着，其实本来应该只刷新字就好的，现在比较难实现，所以就直接全部刷新了
            //设置skillDataList数据。(普通技能)
            var skillDataList = [heroDataCtrl, heroDataCtrl, heroDataCtrl]; //技能的数量是固定的
            self._skillGridCtrl.resetByData(skillDataList);
        };
        //升级大招
        __egretProto__._onUpMixSkill = function () {
            var self = this, clazz = self.__class;
            var heroDataCtrl = self._heroDataCtrl;
            var index = 3;
            heroDataCtrl.upSkill(index, function () {
                var img_mixSkillBg = self.getWidgetByName(clazz.IMG_MIX_SKILL_BG);
                var pos = mo.convertNodeToNodeSpace(self.widget, img_mixSkillBg, self.getPositionByName(clazz.IMG_MIX_SKILL));
                var ctrl = uw.UpArmature.play(self.widget, res.cca_ui.effect_upSkill, pos, function () {
                }, self);
                ctrl.getArmature().setZOrder(99);
            }, self);
        };
        //购买技能点
        __egretProto__._onBuySkillPoint = function () {
            uw.userDataCtrl.buySkillPoints();
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
        };
        __egretProto__._onResest = function () {
            var self = this;
            self.resetByData(self._heroDataCtrl);
        };
        __egretProto__._setSkillPoint = function () {
            var self = this, clazz = self.__class;
            var points = uw.userDataCtrl.getSkillPoints(); //获取技能点
            var maxPoints = uw.userDataCtrl.getMaxSkillPoints();
            self.setVisibleByName(clazz.LABEL_TIME, points < maxPoints); //如果技能点是满的，就不显示倒计时
            self.setDisappearedByName(clazz.BTN_ADD, points != 0);
            var pointsTxt = points == maxPoints ? points + " (已满)" : points;
            self.setInfoByName(clazz.LABEL_POINT_VALUE, pointsTxt);
            if (points < maxPoints) {
                var interval = (uw.userDataCtrl.getNextSkillPointTime() - Date.now());
                self.countdownByName(clazz.LABEL_TIME, interval, null, null, function () {
                    self._setSkillPoint();
                });
            }
        };
        __egretProto__.resetByData = function (heroDataCtrl) {
            //在此根据数据重置
            var self = this, clazz = self.__class;
            self._heroDataCtrl = heroDataCtrl;
            self._setSkillPoint();
            //设置必杀技相关
            var index = 3;
            var skillData = heroDataCtrl.getSkillData(index); //获取技能模板数据
            var isSkillMax = heroDataCtrl.isSkillMax(index); //技能是否已经达到最高等级
            var lvl = heroDataCtrl.getSkillLvl(index); //技能等级
            var skillLvlStr = mo.formatStr("[ubb color=#E3AA00]Lv.%s[/ubb]", lvl);
            var skillLvlAdded = heroDataCtrl.get(uw.dsConsts.HeroEntity.skillLvl);
            if (skillLvlAdded) {
                skillLvlStr += mo.formatStr("[ubb color=#00FF00]+%s[/ubb]", skillLvlAdded);
            }
            self.setInfoByName(clazz.LABEL_MIX_SKILL_NAME, skillData.name); //技能名称
            self.setInfoByName(clazz.LABEL_MIX_SKILL_LVL, skillLvlStr); //技能等级
            self.setInfoByName(clazz.PANEL_MIX_SKILL_DESC_TXT, { value: skillData.text, fontSize: 48, color: "#dcdcdc", autoResize: true }); //技能描述
            self.setVisibleByName(clazz.IMG_MIX_SKILL_GOLD, !isSkillMax); //是否显示升级所需金币图标
            self.setVisibleByName(clazz.LABEL_MIX_SKILL_GOLD, !isSkillMax); //是否显示升级所需金币数值
            self.setGrayByName(clazz.BTN_UP_MIX_SKILL, !heroDataCtrl.canUpSkill(index)); //升级按键是否可以点击
            self.setInfoByName(clazz.IMG_MIX_SKILL, skillData.icon); //动态设置技能图标
            uw.userDataCtrl.setGoldTxt(self.getWidgetByName(clazz.LABEL_MIX_SKILL_GOLD), heroDataCtrl.getGoldForSkill(index)); //设置金币文字颜色
            var labDesc = self.getWidgetByName(clazz.PANEL_MIX_SKILL_DESC_TXT);
            var descBgSize = self.getSizeByName(clazz.PANEL_MIX_SKILL_DESC);
            self.setSizeByName(clazz.PANEL_MIX_SKILL_DESC, descBgSize.width, labDesc.getSize().height + 90);
            //设置skillDataList数据。(普通技能)
            var skillDataList = [heroDataCtrl, heroDataCtrl, heroDataCtrl]; //技能的数量是固定的
            self._skillGridCtrl.resetByData(skillDataList);
        };
        /**
         * 通过技能下标和指定的节点的名字，获取到对应的skill项的子t_item.xlsx节点。
         * @param skillIndex
         * @param name
         * @returns {ccs.Widget|*|A}
         */
        __egretProto__.getSkillItemNodeBySkillIndexAndName = function (skillIndex, name) {
            var cellWidget = this._skillGridCtrl.cellAtIndex(skillIndex);
            return cellWidget.getWidgetByName(name);
        };
        UpSkillCtrl.__className = "UpSkillCtrl";
        UpSkillCtrl.LABEL_POINT_TXT = "label_pointTxt";
        UpSkillCtrl.LABEL_POINT_VALUE = "label_pointValue";
        UpSkillCtrl.LABEL_TIME = "label_time";
        UpSkillCtrl.PANEL_SKILLS = "panel_skills";
        UpSkillCtrl.PANEL_MIX_SKILL = "panel_mixSkill";
        UpSkillCtrl.IMG_MIX_SKILL = "img_mixSkill";
        UpSkillCtrl.IMG_MIX_SKILL_BG = "img_mixSkillBg";
        UpSkillCtrl.LABEL_MIX_SKILL_NAME = "label_mixSkillName";
        UpSkillCtrl.LABEL_MIX_SKILL_LVL = "label_mixSkillLvl";
        UpSkillCtrl.LABEL_MIX_SKILL_NEXT_LVL_CONDITION = "label_mixSkillNextLvlCondition";
        UpSkillCtrl.LABEL_MIX_SKILL_GOLD = "label_mixSkillGold";
        UpSkillCtrl.IMG_MIX_SKILL_GOLD = "img_mixSkillGold";
        UpSkillCtrl.PANEL_MIX_SKILL_DESC = "panel_mixSkillDesc";
        UpSkillCtrl.PANEL_MIX_SKILL_DESC_TXT = "panel_mixSkillDescTxt";
        UpSkillCtrl.BTN_MIX_SKILL_DESC = "btn_mixSkillDesc";
        UpSkillCtrl.PANEL_MIX_SKILL_LVL_UP = "panel_mixSkillLvlUp";
        UpSkillCtrl.BTN_ADD = "btn_add";
        UpSkillCtrl.BTN_UP_MIX_SKILL = "btn_upMixSkill";
        return UpSkillCtrl;
    })(mo.WidgetCtrl);
    uw.UpSkillCtrl = UpSkillCtrl;
    UpSkillCtrl.prototype.__class__ = "uw.UpSkillCtrl";
})(uw || (uw = {}));

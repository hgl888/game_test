var uw;
(function (uw) {
    var HeroPropCell = (function (_super) {
        __extends(HeroPropCell, _super);
        function HeroPropCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HeroPropCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHeroPropItem_ui;
        };
        __egretProto__.resetByData = function (data) {
            var self = this, clazz = self.__class;
            self.setInfoByName(clazz.LABEL_NAME, data.name);
            self.setInfoByName(clazz.LABEL_VALUE, data.value);
            self.setInfoByName(clazz.LABEL_ADD_VALUE, "+" + data.addValue);
            self.setVisibleByName(clazz.LABEL_ADD_VALUE, data.addValue != null && data.addValue != 0);
            self.setLinearLayoutByName(clazz.PANEL_PANEL, 30, mo.LayoutParameter.LINEAR_ALIGN_HT_LEFT);
        };
        HeroPropCell.__className = "HeroPropCell";
        HeroPropCell.LABEL_NAME = "label_name";
        HeroPropCell.LABEL_VALUE = "label_value";
        HeroPropCell.LABEL_ADD_VALUE = "label_addValue";
        HeroPropCell.PANEL_PANEL = "panel";
        return HeroPropCell;
    })(mo.GridViewCell);
    uw.HeroPropCell = HeroPropCell;
    HeroPropCell.prototype.__class__ = "uw.HeroPropCell";
    var HeroDetailCtrl = (function (_super) {
        __extends(HeroDetailCtrl, _super);
        function HeroDetailCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HeroDetailCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this, clazz = self.__class;
            self._jsonPath = res.uiHeroDetail_ui;
            self._cellClass = HeroPropCell;
            self._viewContainerName = clazz.PANEL_PROP_LIST;
            self._lvlStrArr = ["C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+", "S-", "S", "S+"];
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            self.registerClassByKey(uw.HeroDataCtrl, uw.HeroDataCtrl.ON_RESET, self._onReset);
            self.registerClassByKey(uw.HeroDataCtrl, uw.HeroDataCtrl.ON_EQUIP_CHANGED, self._onReset);
            //设置天赋值的显示逻辑
            self.setTouchToShowByName(clazz.PANEL_TALENT, clazz.PANEL_TALENT_VALUE);
        };
        __egretProto__._onReset = function () {
            var ctrl = arguments[arguments.length - 1];
            var self = this;
            if (self.widget.getParent() && self.widget.isVisible() && self._heroDataCtrl == ctrl) {
                self.resetByData(ctrl);
            }
        };
        __egretProto__._setTalentInfo = function (name, value, lvlKeyName) {
            var self = this;
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
            var lvlStrArr = self._lvlStrArr;
            var img = lvlStrArr[0];
            for (var i = lvlStrArr.length; i > 0; --i) {
                var talentRadio = c_lvl[i][lvlKeyName];
                if (value >= talentRadio) {
                    img = lvlStrArr[i - 1];
                    break;
                }
            }
            self.widget.setInfoByName(name, mo.formatStr(res.ui_hero.tmp_png, img));
            var valueWidgetName = "label_" + name.split("_")[1] + "_value"; //长按时显示的widget名字
            self.widget.setInfoByName(valueWidgetName, Math.round(value * 100) / 100); //设置值
        };
        __egretProto__._getItemData2 = function (list, name, totalValue, selfValue) {
            selfValue = selfValue || 0;
            if (!totalValue)
                return;
            list.push({
                name: name + ":",
                value: Math.round(selfValue),
                addValue: Math.round(totalValue - selfValue),
                totalValue: Math.round(totalValue),
                color: cc.c3b(200, 200, 200)
            });
        };
        __egretProto__._getItemData3 = function (list, name, value) {
            list.push({
                name: name + ":",
                value: value,
                color: cc.c3b(200, 200, 200)
            });
        };
        __egretProto__.resetByData = function (heroDataCtrl) {
            var self = this, clazz = self.__class;
            self._heroDataCtrl = heroDataCtrl;
            var list = this._itemList = [];
            var tid = heroDataCtrl.getTempValue(uw.t_hero_tid);
            var warriorInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, tid);
            self.widget.setInfoByName(clazz.LABEL_DESC, { value: warriorInfo[uw.t_warrior_desc], fontSize: 54 });
            self.widget.setInfoByName(clazz.LABEL_WORD, { value: warriorInfo[uw.t_warrior_word], fontSize: 54, color: "#f3b301" });
            var p1 = heroDataCtrl.calProps();
            var p2 = heroDataCtrl.calPropsBySelf();
            self._setTalentInfo(clazz.IMG_PATTACK_TALENT, p1.pAttackMult, uw.c_lvl_attackTalentRatio);
            self._setTalentInfo(clazz.IMG_MATTACK_TALENT, p1.mAttackMult, uw.c_lvl_attackTalentRatio);
            self._setTalentInfo(clazz.IMG_PDEFENCE_TALENT, p1.pDefenceMult, uw.c_lvl_defenceTalentRatio);
            self._setTalentInfo(clazz.IMG_MDEFENCE_TALENT, p1.mDefenceMult, uw.c_lvl_defenceTalentRatio);
            var heroProp1 = uw.c_prop.heroProp1;
            var heroProp2 = uw.c_prop.heroProp2;
            var heroProp3 = uw.c_prop.heroProp3;
            var heroProp1Key = uw.c_prop.heroProp1Key;
            var heroProp2Key = uw.c_prop.heroProp2Key;
            var heroProp3Key = uw.c_prop.heroProp3Key;
            //三级属性
            self._getItemData3(list, heroProp3[heroProp3Key.lvlLife], p1.lvlLife); //升级提升体质
            self._getItemData3(list, heroProp3[heroProp3Key.lvlPower], p1.lvlPower); //升级提升力量
            self._getItemData3(list, heroProp3[heroProp3Key.lvlIntel], p1.lvlIntel); //升级提升智力
            //一级属性
            self._getItemData2(list, heroProp1[heroProp1Key.power], p1.power, p2.power); //力量
            self._getItemData2(list, heroProp1[heroProp1Key.intel], p1.intel, p2.intel); //智力
            self._getItemData2(list, heroProp1[heroProp1Key.life], p1.life, p2.life); //体质
            //二级属性
            self._getItemData2(list, heroProp2[heroProp2Key.pAttack], p1.pAttack, p2.pAttack); //物理攻击
            self._getItemData2(list, heroProp2[heroProp2Key.pDefence], p1.pDefence, p2.pDefence); //物理防御
            self._getItemData2(list, heroProp2[heroProp2Key.mAttack], p1.mAttack, p2.mAttack); //魔法攻击
            self._getItemData2(list, heroProp2[heroProp2Key.mDefence], p1.mDefence, p2.mDefence); //魔法防御
            self._getItemData2(list, heroProp2[heroProp2Key.hp], p1.hp, p2.hp); //生命
            self._getItemData2(list, heroProp2[heroProp2Key.crit], p1.crit, p2.crit); //暴击
            self._getItemData2(list, heroProp2[heroProp2Key.reCrit], p1.reCrit, p2.reCrit); //抗暴
            self._getItemData2(list, heroProp2[heroProp2Key.hit], p1.hit, p2.hit); //命中
            self._getItemData2(list, heroProp2[heroProp2Key.reHit], p1.reHit, p2.reHit); //闪避
            self._getItemData2(list, heroProp2[heroProp2Key.suckBlood], p1.suckBlood, p2.suckBlood); //吸血率
            self._getItemData2(list, heroProp2[heroProp2Key.ignoreDefence], p1.ignoreDefence, p2.ignoreDefence); //无视防御率
            self._getItemData2(list, heroProp2[heroProp2Key.hpRecovery], p1.hpRecovery, p2.hpRecovery); //生命恢复
            self._getItemData2(list, heroProp2[heroProp2Key.energy], p1.energy, p2.energy); //初始能量
            self._getItemData2(list, heroProp2[heroProp2Key.energyRecovery], p1.energyRecovery, p2.energyRecovery); //能量恢复
            self.setTotalCount();
        };
        HeroDetailCtrl.__className = "HeroDetailCtrl";
        HeroDetailCtrl.LABEL_DESC = "label_desc";
        HeroDetailCtrl.LABEL_WORD = "label_word";
        HeroDetailCtrl.PANEL_PROP_LIST = "panel_propList";
        HeroDetailCtrl.IMG_PATTACK_TALENT = "img_pAttackTalent";
        HeroDetailCtrl.IMG_PDEFENCE_TALENT = "img_pDefenceTalent";
        HeroDetailCtrl.IMG_MATTACK_TALENT = "img_mAttackTalent";
        HeroDetailCtrl.IMG_MDEFENCE_TALENT = "img_mDefenceTalent";
        HeroDetailCtrl.PANEL_TALENT = "panel_talent";
        HeroDetailCtrl.PANEL_TALENT_VALUE = "panel_talentValue";
        return HeroDetailCtrl;
    })(uw.GridScrollCtrl);
    uw.HeroDetailCtrl = HeroDetailCtrl;
    HeroDetailCtrl.prototype.__class__ = "uw.HeroDetailCtrl";
})(uw || (uw = {}));

/**
 * Created by lihex on 3/12/15.
 */
var uw;
(function (uw) {
    var HeroTrainSuccDlg = (function (_super) {
        __extends(HeroTrainSuccDlg, _super);
        function HeroTrainSuccDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HeroTrainSuccDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHeroTrainSuccDlg_ui;
        };
        //@override
        __egretProto__.init = function (heroDataCtrl, oldProps, curProps, oldSkills) {
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            self._iconCtrl = uw.UIHeroIconCtrl.create(self.getWidgetByName(clazz.PANEL_ICON));
            self._iconCtrl.resetByData(heroDataCtrl);
            self._skillOpenId = heroDataCtrl.calSkillOpen(oldSkills);
            self._heroDataCtrl = heroDataCtrl;
            var propNames = ["觉醒等级:", "生命值:", "战斗力:"];
            var ctrl = mo.LinearVerticalCtrl.create(self.getWidgetByName(self.__class.PANEL_PROP), self.__class.PROP_ITEM);
            ctrl.resetByData(oldProps.length, function (w, i) {
                w.setInfoByName("label_propName", propNames[i]);
                w.setInfoByName("label_propBefore", oldProps[i]);
                w.setInfoByName("label_propAfter", curProps[i]);
            });
            self.showTitle();
            self.showSkillOpen();
            var contentPanel = self.getWidgetByName("content");
            if (!self._skillOpenId) {
                //pack panel
                var unlockPanel = self.getWidgetByName(clazz.PANEL_UNLOCK);
                contentPanel.height -= unlockPanel.height;
            }
            contentPanel.height += (oldProps.length - 1) * 80 + 60;
            var label_desc = self.getWidgetByName(clazz.LABEL_DESC);
            contentPanel.height += label_desc.getSize().height - label_desc.getSrcSize().height;
            contentPanel.doLayout();
            self.getWidgetByName("root").doLayout();
        };
        __egretProto__.showTitle = function () {
            var self = this;
            var titleWidget = self.getWidgetByName("panel_title");
            uw.UpArmatureWithBegin.play(titleWidget, res.cca_ui.awaken, null);
        };
        __egretProto__.showSkillOpen = function () {
            var self = this, clazz = self.__class;
            self.setVisibleByName(clazz.PANEL_UNLOCK, self._skillOpenId != null);
            if (self._skillOpenId) {
                var skillId = self._skillOpenId;
                var skillData = uw.getSkillData(skillId, 1);
                self.setInfoByName(clazz.LABEL_SKILL_NAME, skillData.name); //技能名称
                var hasBr = skillData.text.indexOf("[/br");
                self.setInfoByName(clazz.LABEL_DESC, {
                    value: skillData.text.substring(0, hasBr ? skillData.text.indexOf("[/br") : skillData.text.length),
                    fontSize: 48,
                    color: "#dcdcdc",
                    autoResize: true
                }); //只显示技能描述
                self.setInfoByName(clazz.SKILL_ICON, skillData.icon); //动态设置技能图标
            }
        };
        HeroTrainSuccDlg.__className = "HeroTrainSuccDlg";
        HeroTrainSuccDlg.RICH_BEFORE = "rich_before";
        HeroTrainSuccDlg.RICH_AFTER = "rich_after";
        HeroTrainSuccDlg.PANEL_PROP = "panel_prop";
        HeroTrainSuccDlg.PANEL_UNLOCK = "panel_unlock";
        HeroTrainSuccDlg.PANEL_TITLE = "panel_title";
        HeroTrainSuccDlg.PROP_ITEM = "prop_item";
        HeroTrainSuccDlg.PANEL_ICON = "panel_icon";
        HeroTrainSuccDlg.LABEL_SKILL_NAME = "label_skill_name";
        HeroTrainSuccDlg.LABEL_DESC = "label_desc";
        HeroTrainSuccDlg.SKILL_ICON = "skill_icon";
        return HeroTrainSuccDlg;
    })(mo.UIModalLayer);
    uw.HeroTrainSuccDlg = HeroTrainSuccDlg;
    HeroTrainSuccDlg.prototype.__class__ = "uw.HeroTrainSuccDlg";
})(uw || (uw = {}));

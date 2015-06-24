/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ForgeExclusiveSuccDlg = (function (_super) {
        __extends(ForgeExclusiveSuccDlg, _super);
        function ForgeExclusiveSuccDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ForgeExclusiveSuccDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiForgeExclusiveSuccDlg_ui;
        };
        __egretProto__.init = function (equipCtrl, beforeProps, beforeMult) {
            var self = this;
            _super.prototype.init.call(this);
            var bgPanel = self.getWidgetByName(self.__class.PANEL_BG);
            bgPanel.registerSrcSizeByName(self.__class.PANEL_PROPBG);
            bgPanel.registerSrcSizeByName(self.__class.PANEL_TALENT);
            bgPanel.registerSrcSizeByName(self._closeWidgetName);
            self.getWidgetByName(self.__class.PANEL_PROPBG).setPadding(50, 0, 50, 0);
            var curProps = equipCtrl.getProps();
            var ctrl = mo.LinearVerticalCtrl.create(self.getWidgetByName(self.__class.PANEL_PROPBG), self.__class.PROP_ITEM);
            ctrl.resetByData(beforeProps.length, function (w, i) {
                w.setInfoByName(self.__class.RICH_BEFORE, {
                    value: mo.formatStr("[ubb color=#D3D3D3]%s：  [/ubb][ubb color=#FFAF32]%s[/ubb]", beforeProps[i].name, Math.round(beforeProps[i].value)),
                    fontSize: 55,
                    hAlign: mo.ALIGN_H_RIGHT
                });
                w.setInfoByName(self.__class.RICH_AFTER, {
                    value: mo.formatStr("[ubb color=#FFAF32]%s[/ubb]", Math.round(curProps[i].value)),
                    fontSize: 55,
                    hAlign: mo.ALIGN_H_LEFT
                });
            });
            // 保存升级前的天赋
            var talentName, value;
            var keys = uw.c_prop.heroProp2Key, values = uw.c_prop.heroProp2;
            var oldpAttackMult = beforeMult.pAttackMult;
            var oldpDefenceMult = beforeMult.pDefenceMult;
            var oldmAttackMult = beforeMult.mAttackMult;
            var oldmDefenceMult = beforeMult.mDefenceMult;
            //比较升级后的天赋变化
            var talentChange = {};
            if (oldpAttackMult != equipCtrl.pAttackMult) {
                talentName = values[keys.pAttackMult];
                talentChange[talentName] = equipCtrl.pAttackMult - oldpAttackMult;
            }
            if (oldpDefenceMult != equipCtrl.pDefenceMult) {
                talentName = values[keys.pDefenceMult];
                talentChange[talentName] = equipCtrl.pDefenceMult - oldpDefenceMult;
            }
            if (oldmAttackMult != equipCtrl.mAttackMult) {
                talentName = values[keys.mAttackMult];
                talentChange[talentName] = equipCtrl.mAttackMult - oldmAttackMult;
            }
            if (oldmDefenceMult != equipCtrl.mDefenceMult) {
                talentName = values[keys.mDefenceMult];
                talentChange[talentName] = equipCtrl.mDefenceMult - oldmDefenceMult;
            }
            var ctrl = mo.LinearVerticalCtrl.create(self.getWidgetByName(self.__class.PANEL_TALENT), self.__class.TALENT_ITEM);
            ctrl.resetByData(talentChange, function (w, key) {
                w.setOption({ value: mo.formatStr("[ubb color=#cd4619]%s[/ubb] +%s", key, talentChange[key]), fontSize: 56, hAlign: mo.ALIGN_H_CENTER });
                w.setVisible(true);
            });
            bgPanel.doLayout();
            self.getWidgetByName("root").doLayout();
            self.showTitle();
        };
        __egretProto__.showTitle = function () {
            var self = this;
            var titleWidget = self.getWidgetByName("title");
            uw.UpArmatureWithBegin.play(titleWidget, res.cca_ui.exclusiveUp, null, function () {
            }, self);
        };
        ForgeExclusiveSuccDlg.__className = "ForgeExclusiveSuccDlg";
        ForgeExclusiveSuccDlg.RICH_BEFORE = "rich_before";
        ForgeExclusiveSuccDlg.RICH_AFTER = "rich_after";
        ForgeExclusiveSuccDlg.PROP_ITEM = "prop_item";
        ForgeExclusiveSuccDlg.PANEL_PROP = "panel_prop";
        ForgeExclusiveSuccDlg.PANEL_PROPBG = "panel_propbg";
        ForgeExclusiveSuccDlg.PANEL_BG = "bg";
        ForgeExclusiveSuccDlg.TALENT_ITEM = "talent_item";
        ForgeExclusiveSuccDlg.PANEL_TALENT = "panel_talent";
        return ForgeExclusiveSuccDlg;
    })(mo.UIModalLayer);
    uw.ForgeExclusiveSuccDlg = ForgeExclusiveSuccDlg;
    ForgeExclusiveSuccDlg.prototype.__class__ = "uw.ForgeExclusiveSuccDlg";
})(uw || (uw = {}));

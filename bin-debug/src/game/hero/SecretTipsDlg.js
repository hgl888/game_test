/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SecretTipsDlg = (function (_super) {
        __extends(SecretTipsDlg, _super);
        function SecretTipsDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SecretTipsDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiSecretTipsDlg_ui;
            mo.addAfterEventListener(mo.actionDispatcher, gEventType.newSceneVisible, self.close, self);
        };
        //@override
        __egretProto__.init = function (data) {
            var self = this, clazz = self.__class;
            var secret = uw.userDataCtrl.getSecret(data.initId);
            var isUpgrade = data.isUpgrade;
            _super.prototype.init.apply(self, arguments);
            self.onClickByName(clazz.BTN_LEFT, self.onLeftBtn, self);
            self.getWidgetByName(clazz.BIGHALO).runAction(mo.repeatForever(mo.rotateBy(1, 180)));
            self.setInfoByName(clazz.IMG_TITLE, isUpgrade ? clazz.IMG_UPGRADE : clazz.IMG_ACTIVATED);
            self.setVisibleByName(clazz.PANEL_ACTIVATED, !isUpgrade);
            self.setVisibleByName(clazz.PANEL_UPGRADE, isUpgrade);
            var skillData = uw.getSkillData(secret.skillId, secret.lvl); //获取技能模板数据
            self.setInfoByName("icon", skillData.icon);
            var skillDisplayTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_skillDisplay, skillData.showId);
            if (isUpgrade) {
                self.setInfoByName(clazz.LABEL_UPGRADNAME, skillDisplayTemp[uw.t_skillDisplay_name]);
                self.formatByName(clazz.LABEL_PRELEVEL, secret.lvl - 1);
                self.formatByName(clazz.LABEL_NEXTLEVEL, secret.lvl);
                self.showTitle(res.cca_ui.secretUp);
            }
            else {
                self.setInfoByName(clazz.LABEL_ACTIVATEDNAME, skillDisplayTemp[uw.t_skillDisplay_name]);
                self.showTitle(res.cca_ui.secretActive);
            }
        };
        __egretProto__.showTitle = function (ccaId) {
            var self = this;
            var titleWidget = self.getWidgetByName("title");
            uw.UpArmatureWithBegin.play(titleWidget, ccaId, null, function () {
            }, self);
        };
        __egretProto__.onLeftBtn = function () {
            var self = this;
            uw.pushSubModule(uw.SubModule.occultSciences, uw.userDataCtrl.getSecretChangeData());
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            mo.removeAfterEventListener(mo.actionDispatcher, gEventType.newSceneVisible, self.close, self);
        };
        SecretTipsDlg.__className = "SecretTipsDlg";
        SecretTipsDlg.BTN_LEFT = "btnLeft";
        SecretTipsDlg.BIGHALO = "bigHalo";
        SecretTipsDlg.PANEL_UPGRADE = "panel_upgrade";
        SecretTipsDlg.PANEL_ACTIVATED = "panel_activated";
        SecretTipsDlg.IMG_TITLE = "img_title";
        SecretTipsDlg.LABEL_UPGRADNAME = "label_upgradName";
        SecretTipsDlg.LABEL_ACTIVATEDNAME = "label_activatedName";
        SecretTipsDlg.LABEL_PRELEVEL = "preLevel";
        SecretTipsDlg.LABEL_NEXTLEVEL = "nextLevel";
        SecretTipsDlg.IMG_ACTIVATED = res.ui_hermetic.title_skillget_png;
        SecretTipsDlg.IMG_UPGRADE = res.ui_hermetic.title_skillupgrade_png;
        return SecretTipsDlg;
    })(mo.UIModalLayer);
    uw.SecretTipsDlg = SecretTipsDlg;
    SecretTipsDlg.prototype.__class__ = "uw.SecretTipsDlg";
})(uw || (uw = {}));

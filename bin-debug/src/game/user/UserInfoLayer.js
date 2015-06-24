/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var UserInfoLayer = (function (_super) {
        __extends(UserInfoLayer, _super);
        function UserInfoLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UserInfoLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiUserInfoLayer_ui;
            self._closeWidgetName = "btnClose";
        };
        __egretProto__.init = function () {
            _super.prototype._init.call(this);
            var self = this;
            self.onClickByName("panelModifyHead", self.showModifyHead, this);
            self.onClickByName("modifyNameBg", self.showModifyName, this);
            self._btnLogout = self.getWidgetByName("btnLogout");
            self._btnLogout.onClick(self.menuLogout, this);
            var channelInfo = channelCfg.getCurChannel();
            if (channelInfo.defaultUI) {
                self._btnLogout.setTouchEnabled(true);
                self._btnLogout.setVisible(true);
            }
            else {
                self._btnLogout.setTouchEnabled(false);
                self._btnLogout.setVisible(false);
            }
            self._imgHead = self.getWidgetByName("imgHead");
            self.setSoundInf();
            self.setUserInfo();
            //设置你妹的监听改变头像和名字
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.iconId, self.setHeadIcon); //
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.name, self.setUserName); //
        };
        __egretProto__.menuLogout = function () {
            uw.loginOut();
        };
        __egretProto__.showModifyHead = function () {
            var subModule = uw.UserModifyHeadLayer.create();
            subModule.show();
        };
        __egretProto__.showModifyName = function () {
            var subModule = uw.UserModifyNameLayer.create();
            subModule.show();
        };
        __egretProto__.setUserInfo = function () {
            //设置账号的信息
            var playerInfo = uw.userDataCtrl;
            this.setInfoByName("labelLevel", playerInfo.getLvl());
            this.setInfoByName("labelMaxLevel", playerInfo.getHeroExpLimit());
            this.setInfoByName("labelAccountId", playerInfo.getId());
            //设置vip
            var vipLevel = uw.userDataCtrl.getVip();
            this.setVipLevel(vipLevel);
            //设置头像
            var warriorId = uw.userDataCtrl.getIconId();
            this.setHeadIcon(warriorId);
            //设置名字
            var name = uw.userDataCtrl.getName();
            this.setUserName(name);
            //设置经验条
            var lvl = playerInfo.getLvl(), preTeamExpc = playerInfo.getExpc();
            var lvlData = mo.getJSONWithFileName(uw.cfg_c_lvl)[lvl];
            var teamExpcToLvlUp = lvlData[uw.c_lvl_teamExpcToLvlUp];
            var minTeamExpcOfLvl = lvlData[uw.c_lvl_minTeamExpcOfLvl];
            var loadingBar = this.getWidgetByName("loadingBar");
            loadingBar.setProgress((preTeamExpc - minTeamExpcOfLvl), teamExpcToLvlUp);
            loadingBar.loadLightTexture(res.ui_common.bar_light1_png);
            var inputLabel = this.getWidgetByName("inputLabel");
            inputLabel.enableStroke(mo.c3b(0, 0, 0), 3);
        };
        __egretProto__.setHeadIcon = function (warriorId) {
            var path = resHelper.getRoleIconPath(warriorId);
            this._imgHead.loadTexture(path);
        };
        __egretProto__.setUserName = function (name) {
            this.setInfoByName("inputLabel", name);
        };
        __egretProto__.setVipLevel = function (vipLevel) {
            if (vipLevel == null)
                vipLevel = 0;
            this.setInfoByName("vipLevel", vipLevel);
        };
        __egretProto__.setSoundInf = function () {
            this._btnSound = this.getWidgetByName("btnSound");
            this._btnSound.onClick(this.menuSoundToggle, this);
        };
        __egretProto__.menuSoundToggle = function (sender) {
            if (!mo.audioEnabled) {
                mo.audioEnabled = true;
                mo.playMusicById(res.audio_ui.bg_home, true);
                mo.setMusicVolume(0.3);
                this._btnSound.setBright(false);
            }
            else {
                mo.audioEnabled = false;
                mo.pauseMusic();
                this._btnSound.setBright(true);
            }
        };
        UserInfoLayer.__className = "UserInfoLayer";
        return UserInfoLayer;
    })(mo.UIModalLayer);
    uw.UserInfoLayer = UserInfoLayer;
    UserInfoLayer.prototype.__class__ = "uw.UserInfoLayer";
})(uw || (uw = {}));

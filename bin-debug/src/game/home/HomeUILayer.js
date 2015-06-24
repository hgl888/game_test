/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var HomeUILayer = (function (_super) {
        __extends(HomeUILayer, _super);
        function HomeUILayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HomeUILayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHomeLayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self.onClickByName(uw.SubModule.UserInfo, self.menuShowUserInfoPanel, self);
            self.onClickByName(uw.SubModule.VIP, self.menuShowVipPanel, self);
            var _labName = this.getWidgetByName("labName");
            _labName.enableStroke(0x000000, 3);
            //设置监听
            var userEntity = uw.dsConsts.UserEntity;
            self.registerClassByKey(uw.UserDataCtrl, userEntity.lvl.toString(), self.setLevel);
            self.registerClassByKey(uw.UserDataCtrl, userEntity.name.toString(), self.setNickName);
            self.registerClassByKey(uw.UserDataCtrl, userEntity.vip.toString(), self.setVipLevel);
            self.registerClassByKey(uw.UserDataCtrl, userEntity.iconId.toString(), self.setHeadIcon);
        };
        __egretProto__.setUserData = function () {
            //显示真实数据
            var userDataCtrl = uw.userDataCtrl;
            this.setHeadIcon(userDataCtrl.getIconId());
            this.setLevel(userDataCtrl.getLvl());
            this.setNickName(userDataCtrl.getName());
            this.setVipLevel(userDataCtrl.getVip());
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            this.setUserData();
        };
        __egretProto__.setHeadIcon = function (iconId) {
            var path = resHelper.getRoleIconPath(iconId);
            this.setInfoByName("charAvatar", path);
        };
        __egretProto__.setLevel = function (lvl) {
            var lvlInfo = "Lv." + lvl;
            this.setInfoByName("labLevel", lvlInfo);
        };
        __egretProto__.setNickName = function (nickName) {
            this.setInfoByName("labName", nickName);
        };
        __egretProto__.setVipLevel = function (vipLevel) {
            if (vipLevel == null)
                vipLevel = 0;
            this.setInfoByName("labVipLevel", vipLevel);
        };
        __egretProto__.menuShowUserInfoPanel = function () {
            uw.pushSubModule(uw.SubModule.UserInfo);
        };
        __egretProto__.menuShowVipPanel = function () {
            uw.pushSubModule(uw.SubModule.VIP);
        };
        HomeUILayer.__className = "HomeUILayer";
        return HomeUILayer;
    })(uw.HomeBaseLayer);
    uw.HomeUILayer = HomeUILayer;
    HomeUILayer.prototype.__class__ = "uw.HomeUILayer";
})(uw || (uw = {}));

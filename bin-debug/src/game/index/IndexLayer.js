/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var IndexLayer = (function (_super) {
        __extends(IndexLayer, _super);
        function IndexLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = IndexLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiIndexLayer_ui;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
            self._btnStart = self.getWidgetByName("btnStart");
            self._btnSelectServer = self.getWidgetByName("btnSelectServer");
            self._logoutLayout = self.getWidgetByName("logoutLayout");
            self._btnLogout = self.getWidgetByName("btnLogout");
            self._userName = self.getWidgetByName("userName");
            self._welcomeWord = self.getWidgetByName("welcomeWord");
            self._noticeIcon = self.getWidgetByName("noticeIcon");
            self._logoutLayout.setVisible(false);
            self._btnLogout.onClick(self.menuLogout, self);
            self.onClickByName("btnStart", self.menuStartGame, self, null, 108);
            self.onClickByName("btnSelectServer", self.menuShowSelectServerLayer, self);
            self.onClickByName("noticeIcon", self.menuShowNotice, self);
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.NO_BORDER);
            self.formatByName("label_version", mo.project.version);
            self.enableStrokeByName("label_version", mo.c3b(20, 3, 0), 3);
            self.registerClassByKey(uw.ServerDataCtrl, "curServer", self.updateCurServerInfo); //
        };
        __egretProto__.menuShowSelectServerLayer = function () {
            this.getDelegate().showSelectServerLayer();
        };
        __egretProto__.menuStartGame = function () {
            this.getDelegate().enterGame();
        };
        __egretProto__.menuLogout = function () {
            this.getDelegate().logout();
        };
        __egretProto__.menuShowNotice = function () {
            uw.NoticeLayer.showNotice(0, true);
        };
        __egretProto__.onEnter = function () {
            var self = this;
            _super.prototype.onEnter.call(this);
            uw.NoticeLayer.showNotice(0, false);
            self.updateCurServerInfo();
            //摇啊摇啊摇 我们一起摇 哔哔哔哔哔哔！
            var seq = mo.sequence(mo.rotateBy(1, 5), mo.rotateBy(2, -15), mo.rotateBy(1, 10));
            var rep = mo.repeatForever(seq);
            self._noticeIcon.runAction(rep);
        };
        __egretProto__.updateCurServerInfo = function (info) {
            if (info) {
                this.showCurServerInfo(info);
            }
            else {
                var id = mo.getLocalStorageItem(uw.Keys.curServerId, true);
                if (id) {
                    var localInfo = uw.serverDataCtrl.getServerInfoById(id);
                    if (localInfo) {
                        this.showCurServerInfo(localInfo);
                        return;
                    }
                }
                var self = this;
                mo.requestWaiting4Http(uw.iface.h_server_getNewServer, {}, function (data) {
                    uw.log(data.name);
                    self.showCurServerInfo(data);
                }, self);
            }
        };
        __egretProto__.showCurServerInfo = function (info) {
            var serverInfoConst = uw.dsConsts.ServerInfoEntity;
            var area = info[serverInfoConst.area];
            var name = info[serverInfoConst.name];
            this.setInfoByName("labelServerInfo", area + " " + name);
            this.saveCurServerInfo(info);
        };
        __egretProto__.saveCurServerInfo = function (info) {
            var serverInfoConst = uw.dsConsts.ServerInfoEntity;
            mo.__areaId = info[serverInfoConst.id];
            mo.setLocalStorageItem(uw.Keys.curServerId, mo.__areaId, true);
            mo.setLocalStorageItem(uw.Keys.key_host, info[serverInfoConst.host], true);
            mo.setLocalStorageItem(uw.Keys.key_port, info[serverInfoConst.port], true);
        };
        __egretProto__.resetNotLoginLayout = function () {
            var self = this;
            self._logoutLayout.setVisible(false);
            self._btnLogout.setTouchEnabled(false);
        };
        __egretProto__.resetLoginedLayout = function () {
            var self = this;
            var channelInfo = channelCfg.getCurChannel();
            if (channelInfo.defaultUI) {
                self._logoutLayout.setVisible(true);
                self._btnLogout.setTouchEnabled(true);
            }
            else {
                self._logoutLayout.setVisible(false);
                self._btnLogout.setTouchEnabled(false);
            }
            var accountName = mo.getLocalStorageItem(uw.Keys.accountName, true);
            self._userName.setText(accountName);
            var posX = self._userName.getPosition().x;
            var width = self._userName.getSize().width;
            self._welcomeWord.setPositionX(posX - width - 20);
        };
        __egretProto__.canStart = function (isCan) {
            var self = this;
            self._btnStart.setGray(!isCan);
        };
        IndexLayer.__className = "IndexLayer";
        IndexLayer.LABEL_VERSION = "label_version";
        return IndexLayer;
    })(mo.DisplayLayer);
    uw.IndexLayer = IndexLayer;
    IndexLayer.prototype.__class__ = "uw.IndexLayer";
})(uw || (uw = {}));

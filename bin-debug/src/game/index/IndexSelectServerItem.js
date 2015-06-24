/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ServerItemCell = (function (_super) {
        __extends(ServerItemCell, _super);
        function ServerItemCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ServerItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiIndexSelectServerItem_ui;
            self._clickWidgetName = "touch_panel";
            self._status = 3014;
        };
        __egretProto__.resetByData = function (serverInfo) {
            var self = this;
            self._serverInfo = serverInfo;
            var serverInfoConst = uw.dsConsts.ServerInfoEntity;
            self.setVisibleByName("isNew", !!serverInfo[serverInfoConst.isNew]);
            var status = serverInfo[serverInfoConst.status];
            var frameName = self._getStatusTag(status);
            var color = self._getStatusColor(status);
            self._viewState = self.getWidgetByName("state");
            self._viewState.loadTexture(frameName);
            var labelName = self.getWidgetByName("name");
            labelName.setText(serverInfo[serverInfoConst.name]);
            labelName.setColor(color);
            var labelIndex = self.getWidgetByName("index");
            labelIndex.setText(serverInfo[serverInfoConst.area]);
            labelIndex.setColor(color);
        };
        __egretProto__.getServerInfo = function () {
            return this._serverInfo;
        };
        __egretProto__._getStatusTag = function (status) {
            var frame = "purple";
            var map = {
                1: "grn",
                2: "yellow",
                3: "red"
            };
            return mo.formatStr(res.ui_login.tmp_tag_png, map[status] || frame);
        };
        __egretProto__._getStatusColor = function (status) {
            return status == 0 ? mo.c3b(176, 176, 176) : mo.c3b(244, 179, 1);
        };
        ServerItemCell.__className = "ServerItemCell";
        return ServerItemCell;
    })(mo.GridViewCell);
    uw.ServerItemCell = ServerItemCell;
    ServerItemCell.prototype.__class__ = "uw.ServerItemCell";
})(uw || (uw = {}));

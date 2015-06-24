var mo;
(function (mo) {
    var MsgDlg = (function (_super) {
        __extends(MsgDlg, _super);
        function MsgDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MsgDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._msgWidgetName = "txt_msg"; //给默认值
            self._closeOutSide = false;
        };
        //@override
        __egretProto__._getTray = function () {
            //这个是单例，每次的tray可能不同场景
            var self = this;
            var scene = mo.runningScene;
            if (scene)
                return self._isOnTop ? scene.topTray : scene.msgTray;
            return null;
        };
        __egretProto__._setMsg = function (msg) {
            var self = this;
            self._msg = msg;
            var msgWidget = self.getWidgetByName(self._msgWidgetName);
            if (msgWidget) {
                if (msgWidget instanceof mo.UIText || msgWidget instanceof mo.UIPanel) {
                    self.setInfoByName(self._msgWidgetName, {
                        value: msg,
                        fontSize: 70,
                        color: mo.c3b(220, 220, 220),
                        hAlign: mo.ALIGN_H_CENTER,
                        vAlign: mo.ALIGN_V_MIDDLE
                    });
                }
                else {
                    mo.warn("消息承载体的类型为：%s，无法设置消息内容!", msgWidget.__className);
                }
            }
            else {
                mo.warn("信息提示框中未能发现消息的承载widget【%s】", self._msgWidgetName);
            }
        };
        Object.defineProperty(__egretProto__, "msg", {
            get: function () {
                return this._msg;
            },
            set: function (msg) {
                this._setMsg(msg);
            },
            enumerable: true,
            configurable: true
        });
        MsgDlg.show = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var dlg = this.create.apply(this, arguments);
            dlg.show();
        };
        MsgDlg.__className = "MsgDlg";
        return MsgDlg;
    })(mo.Dlg);
    mo.MsgDlg = MsgDlg;
    MsgDlg.prototype.__class__ = "mo.MsgDlg";
})(mo || (mo = {}));

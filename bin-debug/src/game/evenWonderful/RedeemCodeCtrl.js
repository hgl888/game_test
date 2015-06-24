/**
 * Created by lihex on 1/30/15.
 */
var uw;
(function (uw) {
    var RedeemCodeCtrl = (function (_super) {
        __extends(RedeemCodeCtrl, _super);
        function RedeemCodeCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = RedeemCodeCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiEventRedeemCode_ui;
        };
        //@override
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            self.onClickByName(clazz.BTN_GET, self._onGet, self);
            self._inputCode = self.getWidgetByName(clazz.INPUT_CODE);
            self._inputCode.setColor(cc.BLACK);
            self._btnFollow = self.getWidgetByName(clazz.BTN_FOLLOW);
            self._btnFollow.setVisible(false);
            self._btnFollow.onClick(self._onFollow, self);
        };
        __egretProto__._onGet = function () {
            var self = this;
            var code = self._inputCode.getText();
            uw.userDataCtrl.useCoupon(code, function () {
                self._inputCode.setText("");
            }, self);
        };
        __egretProto__._onFollow = function () {
            var self = this;
            var channelInfo = channelCfg.getCurChannel();
            if (channelInfo.attention) {
                channelInfo.attention();
            }
        };
        __egretProto__.resetByData = function (activityCtrl) {
            var self = this, clazz = self.__class;
            self._inputCode.setText("");
            self._btnFollow.setVisible(channelCfg.getCurChannel().isOpenAttention);
        };
        RedeemCodeCtrl.__className = "RedeemCodeCtrl";
        RedeemCodeCtrl.BTN_GET = "btn_get";
        RedeemCodeCtrl.BTN_FOLLOW = "btnFollow";
        RedeemCodeCtrl.INPUT_CODE = "input_code";
        return RedeemCodeCtrl;
    })(mo.WidgetCtrl);
    uw.RedeemCodeCtrl = RedeemCodeCtrl;
    RedeemCodeCtrl.prototype.__class__ = "uw.RedeemCodeCtrl";
})(uw || (uw = {}));

/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ForgeLayer = (function (_super) {
        __extends(ForgeLayer, _super);
        function ForgeLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ForgeLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiForgeLayer_ui;
        };
        __egretProto__.init = function (tabName) {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            //专属兑换
            self.onClickByName(clazz.IMG_EXCHANGE, self._gotoExchange, self);
            self.onClickByName(clazz.BTN_EXCHANGE, self._gotoExchange, self);
            //专属锻造
            self.onClickByName(clazz.IMG_FORGE, self._gotoForge, self);
            self.onClickByName(clazz.BTN_FORGE, self._gotoForge, self);
            this.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.FIXED_WIDTH);
        };
        __egretProto__._gotoExchange = function () {
            uw.pushSubModule(uw.SubModule.ForgeExchange);
        };
        __egretProto__._gotoForge = function () {
            uw.pushSubModule(uw.SubModule.ForgeExclusive);
        };
        ForgeLayer.__className = "ForgeLayer";
        ForgeLayer.IMG_FORGE = "panel_forge";
        ForgeLayer.IMG_EXCHANGE = "panel_exchange";
        ForgeLayer.BTN_EXCHANGE = "btn_exchange";
        ForgeLayer.BTN_FORGE = "btn_exclusive";
        return ForgeLayer;
    })(mo.DisplayLayer);
    uw.ForgeLayer = ForgeLayer;
    ForgeLayer.prototype.__class__ = "uw.ForgeLayer";
})(uw || (uw = {}));

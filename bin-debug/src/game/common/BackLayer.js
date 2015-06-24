/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var BackLayer = (function (_super) {
        __extends(BackLayer, _super);
        function BackLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = BackLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiBorderLayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            this.onClickByName("btnBack", this.menuBack, this, 102);
        };
        __egretProto__.hideBackBtn = function () {
            this.setVisible(false);
        };
        __egretProto__.showBackBtn = function () {
            this.setVisible(true);
        };
        __egretProto__.menuBack = function () {
            var self = this;
            if (self._onBackCb) {
                if (self._onBackCb.call(self._onBackCbTarget)) {
                    mo.sceneMgr.popScene();
                    self._onBackCb = null;
                    self._onBackCbTarget = null;
                }
            }
            else {
                mo.sceneMgr.popScene();
            }
        };
        __egretProto__.onBack = function (cb, target) {
            this._onBackCb = cb;
            this._onBackCbTarget = target;
        };
        //获取到返回按键对象
        __egretProto__.getBackBtnNode = function () {
            return this.getWidgetByName("btnBack");
        };
        BackLayer.__className = "BackLayer";
        return BackLayer;
    })(mo.MenuLayer);
    uw.BackLayer = BackLayer;
    BackLayer.prototype.__class__ = "uw.BackLayer";
})(uw || (uw = {}));

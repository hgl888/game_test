/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var UIHelpLayer = (function (_super) {
        __extends(UIHelpLayer, _super);
        function UIHelpLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIHelpLayer.prototype;
        __egretProto__.init = function (jsonPath) {
            _super.prototype.init.call(this);
            var self = this;
            self._jsonPath = jsonPath;
            self.initRootWidget(self._jsonPath);
            self.onClickByName("btn_close", this.close, this);
        };
        __egretProto__.onShowEvent = function (cb, cbTarget) {
            var self = this;
            self._onShowCb = cb;
            self._onShowTarget = cbTarget;
        };
        __egretProto__.show = function () {
            var self = this;
            if (self._onShowCb)
                self._onShowCb.call(self._onShowTarget, self);
            _super.prototype.show.call(this);
        };
        UIHelpLayer.__className = "UIHelpLayer";
        return UIHelpLayer;
    })(mo.UIModalLayer);
    uw.UIHelpLayer = UIHelpLayer;
    UIHelpLayer.prototype.__class__ = "uw.UIHelpLayer";
})(uw || (uw = {}));

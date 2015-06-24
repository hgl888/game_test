/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SignItem = (function (_super) {
        __extends(SignItem, _super);
        function SignItem() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SignItem.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiSignItem_ui;
            self.listenerInited = false;
            self.isEffect = false;
            self.isActive = false;
            self._clickWidgetName = "touch_panel";
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            if (!self.listenerInited) {
                self.listenerInited = true;
                self.onClick(this._onCellClick, this);
            }
        };
        __egretProto__.light = function () {
            var self = this;
            var light = self.getWidgetByName(self.__class.LIGHT);
            light.setVisible(true);
            var actRotation = mo.repeatForever(mo.rotateBy(3, 360));
            light.runAction(actRotation);
        };
        //已领取
        __egretProto__.normal = function () {
            var self = this;
            self.setVisibleByName(self.__class.ACTIVE, false);
            self.setVisibleByName(self.__class.UNACTIVE, false);
            self.setVisibleByName(self.__class.CHOOSE, false);
            if (self.isEffect) {
                self.light();
            }
            else {
                self.setVisibleByName(self.__class.LIGHT, false);
            }
        };
        //不可领取
        __egretProto__.unActive = function () {
            var self = this;
            self.setVisibleByName(self.__class.ACTIVE, false);
            self.setVisibleByName(self.__class.UNACTIVE, true);
            self.setInfoByName(self.__class.ACTIVE, res.ui_daily.cov_recived_png);
            self.setVisibleByName(self.__class.CHOOSE, true);
            self.setVisibleByName(self.__class.LIGHT, false);
        };
        //可领取
        __egretProto__.active = function () {
            var self = this;
            self.setVisibleByName(self.__class.ACTIVE, true);
            self.setVisibleByName(self.__class.UNACTIVE, false);
            self.setVisibleByName(self.__class.CHOOSE, false);
            if (self.isEffect) {
                self.light();
            }
            else {
                self.setVisibleByName(self.__class.LIGHT, false);
            }
        };
        __egretProto__._onCellClick = function () {
            var self = this;
            if (self.isActive) {
                //最大获得数检查
                uw.confirmMaxGetItems([self._ctrl.dataCtrl.tempId], function () {
                    uw.signDataCtrl.sign(function () {
                        self.getDelegate().refreshData();
                        self.isActive = false;
                    }, self);
                }, self);
            }
            else {
                var layer = uw.ShowItemInfo.create(self._ctrl.dataCtrl.tempId);
                layer.show();
            }
        };
        __egretProto__.resetByData = function (info, index, signCount, signed) {
            var self = this;
            var item = info[uw.c_sign_item];
            for (var key in item) {
                if (!this._ctrl) {
                    this._ctrl = uw.UIItemIconCtrl.create(self.getWidgetByName(self.__class.ITEM));
                }
                this._ctrl.resetByData(key);
                this._ctrl.setCount(item[key]);
            }
            var vipLevel = info[uw.c_sign_vip];
            if (vipLevel > 0) {
                var vipFrameName = mo.formatStr(res.ui_daily.tmp_vip_level_png, vipLevel);
                self.setInfoByName(self.__class.VIP_LEVEL, vipFrameName);
                self.setVisibleByName(self.__class.DOUBLE_GIFT, true);
            }
            else {
                self.setVisibleByName(self.__class.DOUBLE_GIFT, false);
            }
            self.isEffect = !!info[uw.c_sign_isEffect];
            //状态
            if (index < signCount) {
                self.unActive();
                self.isActive = false;
                if (self._arm) {
                    self._arm.removeFromParent();
                    self._arm = null;
                }
            }
            else if (index == signCount && !signed) {
                self.active();
                self.isActive = true;
                //                if(self.getDelegate()){
                self.getDelegate().scrollToLastest(index);
                //                }
                var size = self.getSize();
                var root = self.getWidgetByName("root");
                self._arm = uw.uiArmFactory.produceDynamic(res.cca_ui.canSign, function (sender) {
                    root.setZOrder(900);
                    root.addChild(sender);
                    sender.playWithIndex(0);
                    sender.setPosition(size.width / 2, size.height / 2);
                });
            }
            else {
                self.normal();
                self.isActive = false;
                if (self._arm) {
                    self._arm.removeFromParent();
                    self._arm = null;
                }
            }
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            if (self._arm) {
                self._arm.removeFromParent();
                self._arm = null;
            }
        };
        SignItem.__className = "SignItem";
        SignItem.ITEM = "item";
        SignItem.BG = "bg";
        SignItem.CHOOSE = "choose";
        SignItem.DOUBLE_GIFT = "doubleGift";
        SignItem.VIP_LEVEL = "vipLevel";
        SignItem.ACTIVE = "active";
        SignItem.UNACTIVE = "unActive";
        SignItem.LIGHT = "light";
        return SignItem;
    })(mo.GridViewCell);
    uw.SignItem = SignItem;
    SignItem.prototype.__class__ = "uw.SignItem";
})(uw || (uw = {}));

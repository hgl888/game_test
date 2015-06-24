/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var VipChargeItemCell = (function (_super) {
        __extends(VipChargeItemCell, _super);
        function VipChargeItemCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = VipChargeItemCell.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiVipChargeItemCell_ui;
            self._useClickEffect = true;
            self._clickWidgetName = "touch_panel";
            self.rechargeId = 0;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            self.enableStrokeByName("label_title", mo.c3b(0, 0, 0), 3);
            uw.setDiamondColor(self, "label_title");
        };
        __egretProto__.resetByData = function (rechargeInfo) {
            var self = this;
            var rechargeId = self.rechargeId = rechargeInfo[uw.c_recharge_id];
            var ctrl = uw.rechargeDataCtrl;
            var iconPath = resHelper.getVipIconPath(rechargeInfo[uw.c_recharge_icon]);
            self.setInfoByName("label_title", rechargeInfo[uw.c_recharge_name]);
            self.formatByName("label_price", rechargeInfo[uw.c_recharge_cost]);
            self.setInfoByName("icon", iconPath);
            var gift, desc = "", first, extra, strLimit = "";
            first = rechargeInfo[uw.c_recharge_first];
            extra = rechargeInfo[uw.c_recharge_extra];
            if (ctrl.isMonthCard(rechargeId)) {
                var effectTime = ctrl.getEffTime(rechargeId);
                if (effectTime) {
                    if (ctrl.getCurCardRechargeId() == rechargeId) {
                        desc = mo.formatStr(self.__class.strMonthActive, ctrl.getLeftDays());
                    }
                    else {
                        desc = mo.formatStr(self.__class.strGotDiamond, rechargeInfo[uw.c_recharge_diamond], ctrl.getLeftDays());
                    }
                }
                else {
                    if (ctrl.getCurCardRechargeId() == null) {
                        desc = mo.formatStr(self.__class.strWillGetDiamond, rechargeInfo[uw.c_recharge_diamond], rechargeInfo[uw.c_recharge_daily]);
                    }
                    else {
                        desc = self.__class.strOtherActive;
                    }
                }
            }
            else {
                var count = ctrl.getCount(rechargeId);
                if (count == 0) {
                    gift = rechargeInfo[uw.c_recharge_first];
                    if (gift) {
                        strLimit = self.__class.strLimit;
                    }
                    else {
                        gift = rechargeInfo[uw.c_recharge_extra];
                    }
                    if (gift != 0) {
                        desc = mo.formatStr(this.__class.strExtra, gift) + strLimit;
                    }
                }
                else {
                    gift = rechargeInfo[uw.c_recharge_extra];
                    if (gift != 0) {
                        desc = mo.formatStr(this.__class.strExtra, gift);
                    }
                }
            }
            self.setInfoByName("label_desc", desc);
        };
        VipChargeItemCell.__className = "VipChargeItemCell";
        VipChargeItemCell.strWillGetDiamond = "立得%s钻石\n每天可领%s钻石"; //没有购买
        VipChargeItemCell.strMonthActive = "月卡生效中，剩余%s天"; //已经购买，生效的那个
        VipChargeItemCell.strOtherActive = "同类特权生效中"; //已经购买，生效其他
        VipChargeItemCell.strGotDiamond = "已得%s钻石，本卡%s天后生效"; //续费
        VipChargeItemCell.strExtra = "另赠送%s钻石";
        VipChargeItemCell.strLimit = "\n(限购一次)";
        return VipChargeItemCell;
    })(mo.GridViewCell);
    uw.VipChargeItemCell = VipChargeItemCell;
    VipChargeItemCell.prototype.__class__ = "uw.VipChargeItemCell";
})(uw || (uw = {}));

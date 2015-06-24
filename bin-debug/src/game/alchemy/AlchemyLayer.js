/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var AlchemyLayer = (function (_super) {
        __extends(AlchemyLayer, _super);
        function AlchemyLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = AlchemyLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiAlchemyLayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self._critList = self.getWidgetByName("critList");
            self._critList.setGravity(mo.ListViewGravity.bottom);
            self.setVisibleByName("result", false);
            uw.setDiamondColor(self, "diamondCount");
            uw.setGoldColor(self, "goldCount");
            self.onClickByName("btnClose", self.close, self);
            self.onClickByName("btnUse", self.menuUseOnce, self);
            self.onClickByName("btnMultiUse", self.menuUseMultiUse, self);
            self.transColorByName("p_border", uw.colorType.itemQualityMap[8]);
            self.refreshData();
        };
        __egretProto__.refreshData = function () {
            var self = this;
            var userDataCtrl = uw.userDataCtrl;
            var maxCount = mo.getJSONWithFileNameAndID(uw.cfg_c_vip, userDataCtrl.getVip())[uw.c_vip_goldCount];
            self.formatByName("count", (maxCount - userDataCtrl.getBuyGoldCount()), maxCount);
            self.doLayoutByName("countContainer");
            var buyGoldCost = userDataCtrl.getBuyGoldCost(1);
            self.setInfoByName("diamondCount", buyGoldCost[0]);
            self.setInfoByName("goldCount", buyGoldCost[1]);
        };
        __egretProto__.menuUseOnce = function () {
            var self = this;
            uw.userDataCtrl.buyGold(1, function (resultArr) {
                self.addRecord(resultArr[0]);
            }, self);
        };
        __egretProto__.menuUseMultiUse = function () {
            var self = this;
            var reNum = uw.userDataCtrl.getBuyGoldReNum();
            if (reNum <= 0)
                return;
            var layer = uw.AlchemyTipLayer.create();
            layer.onClose(self.addRecords, self);
            layer.show();
        };
        __egretProto__.addRecord = function (record) {
            var self = this;
            var widget = mo.uiReader.genWidget(res.uiAlchemyItem_ui);
            self._critList.pushBackCustomItem(widget);
            process.nextTick(function () {
                self._critList.jumpToBottom();
            }, self);
            widget.setInfoByName("diamond", record[0]);
            widget.setInfoByName("gold", record[1]);
            uw.setDiamondColor(widget, "diamond");
            uw.setGoldColor(widget, "gold");
            var times = record[2];
            var critContainer = widget.getWidgetByName("critContainer");
            if (times == 1) {
                critContainer.setVisible(false);
            }
            else {
                widget.setInfoByName("critTimes", mo.formatStr(res.ui_home.critx_png, times));
                critContainer.setVisible(true);
                critContainer.setScale(2);
                critContainer.runAction(mo.scaleTo(0.2, 1).setEase(mo.Ease.sineIn));
                self.showCrit(critContainer);
            }
            self.setVisibleByName("result", true);
            //刷新次数
            self.refreshData();
        };
        __egretProto__.showCrit = function (node) {
            var self = this;
            var size = self.getSize();
            var seq = mo.sequence(mo.scaleTo(0.3, 1).setEase(mo.Ease.sineIn), mo.delayTime(0.2), mo.fadeOut(0.1), mo.callFunc(function (sender) {
                sender.removeFromParent(true);
            }, self));
            var newCritContainer = node.clone(null);
            newCritContainer.setScale(7);
            newCritContainer.setPosition(size.width / 2, size.height / 2);
            newCritContainer.runAction(seq);
            self.addChild(newCritContainer);
        };
        __egretProto__.addRecords = function (resultArr) {
            if (resultArr) {
                for (var i = 0; i < resultArr.length; i++) {
                    var obj = resultArr[i];
                    this.addRecord(obj);
                }
            }
        };
        AlchemyLayer.__className = "AlchemyLayer";
        return AlchemyLayer;
    })(mo.Dlg);
    uw.AlchemyLayer = AlchemyLayer;
    AlchemyLayer.prototype.__class__ = "uw.AlchemyLayer";
})(uw || (uw = {}));

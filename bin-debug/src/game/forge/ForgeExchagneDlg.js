/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ForgeExchagneDlg = (function (_super) {
        __extends(ForgeExchagneDlg, _super);
        function ForgeExchagneDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ForgeExchagneDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiForgeExchange_ui;
            self._curScore = 0;
            self.exchangeSucc = false;
        };
        __egretProto__.init = function (equipDataCtrl, heroDataCtrl) {
            var self = this;
            _super.prototype.init.call(this);
            self._equipDataCtrl = equipDataCtrl;
            self._heroDataCtrl = heroDataCtrl;
            self._itemCart = {};
            var shopExclusiveCfg = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.shopExclusive);
            var pointRequired = self._pointRequired = shopExclusiveCfg[0]; //需要的总积分
            self._otherFragPoint = shopExclusiveCfg[1]; //其他碎片可兑换的积分
            self._thisFragPoint = shopExclusiveCfg[2]; //专属碎片可兑换的积分
            var expLabel = self._expLabel = self.getWidgetByName(self.__class.LABEL_EXP_PLUS);
            expLabel.setVisible(false);
            expLabel.setOpacity(0);
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(self.__class.PANEL_EQUIP));
            self._iconCtrl.resetByData(equipDataCtrl);
            self.setInfoByName("label_name", equipDataCtrl.name);
            //属性列表
            self._propCtrl = uw.EquipPropGridCtrl.create(self.getWidgetByName("panel_propList"));
            self._propCtrl.resetByData(equipDataCtrl.getProps());
            // 所属英雄
            self.setInfoByName("panel_secretName", {
                value: mo.formatStr("所属英雄：[ubb color=yellow]%s[/ubb]", equipDataCtrl.heroName),
                hAlign: mo.ALIGN_H_CENTER,
                fontSize: 56
            });
            // 进度条
            var bar = self._bar = self.getWidgetByName(self.__class.BAR);
            bar.loadLightTexture(res.ui_common.bar_light4_png);
            self._updateProgressBar(0);
            var label = bar.getInnerLabel();
            label.setFontSize(36);
            self.onClickByName(self.__class.BTN_EXCHANGE, self._exchangeClick, self);
            self.onClickByName(self.__class.BTN_HELP, self._help, self);
            // 碎片列表
            self._createGridScrollView("itemList", uw.ForgePickupItemCell, 4, this._onItemCellDataSource);
            self._gridScrollView.ignoreNullCell(false);
            // 物品
            self._pickItemList = [];
            var items = uw.userDataCtrl.getItemInfoByType(uw.c_prop.itemTypeKey.heroFragment);
            var itemList = uw.getRepeatedBagDataCtrlList(items);
            var pickCtrl;
            for (var i = 0, li = itemList.length; i < li; i++) {
                pickCtrl = uw.PickDataCtrl.create(itemList[i], 0);
                self._pickItemList.push(pickCtrl);
            }
            self._refreshList();
        };
        __egretProto__._refreshList = function () {
            var self = this;
            self._gridScrollView.setTotalCount(Math.max(self.__class.MAX_COUNT_PER_PAGE, self._pickItemList.length));
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var item = this._pickItemList[index];
            cell.resetByData(item);
            cell.onClick(this._onCellClick, this);
            cell.onUnPickClick(this._onUnPickClick, this, null);
        };
        __egretProto__._onCellClick = function (cell) {
            var self = this;
            var idx = cell.getIdx();
            var pickDataCtrl = self._pickItemList[idx];
            var dataCtrl = pickDataCtrl.dataCtrl;
            // 边界检查
            if (!pickDataCtrl.pickUpTest())
                return;
            // 添加物品到购物车
            var tempId = dataCtrl.tempId, items = self._itemCart, curScore = self._curScore, delta;
            delta = (self._heroDataCtrl.fragmentId == tempId) ? self._thisFragPoint : self._otherFragPoint;
            curScore += delta;
            if (self._curScore >= self._pointRequired) {
                mo.showMsg(uw.id_c_msgCode.enoughIntegral);
            }
            else {
                if (!items[tempId]) {
                    items[tempId] = 1;
                }
                else {
                    items[tempId] += 1;
                }
                // 通知数据模型，选择成功
                pickDataCtrl.pick();
                self._curScore = curScore;
                // 更新进度条
                self._updateProgressBar(delta);
                if (curScore >= self._pointRequired) {
                    mo.showMsg(uw.id_c_msgCode.enoughIntegral);
                }
                var parent = self._expLabel.getParent();
                var label = self._expLabel.clone();
                parent.addChild(label);
                label.setFontSize(45);
                label.setText("+" + delta);
                label.setVisible(true);
                var fadeOut = mo.fadeOut(1);
                var fadeIn = mo.fadeIn(0.2);
                var moveUp = mo.moveBy(1, mo.p(0, -150)).setEase(mo.Ease.sineIn);
                var spawn = mo.spawn(moveUp, fadeOut);
                var act = mo.sequence(fadeIn, mo.delayTime(0.3), spawn, mo.callFunc(function () {
                    // 移除
                    label.removeFromParent(true);
                }, self));
                label.runAction(act);
            }
        };
        __egretProto__._onUnPickClick = function (cell) {
            var self = this;
            var idx = cell.getIdx();
            var pickDataCtrl = self._pickItemList[idx];
            var dataCtrl = pickDataCtrl.dataCtrl;
            // 边界检查
            if (!pickDataCtrl.pickUpTest(-1))
                return;
            // 添加物品到购物车
            var tempId = dataCtrl.tempId, items = self._itemCart;
            if (items[tempId]) {
                items[tempId] -= 1;
            }
            var delta = (self._heroDataCtrl.fragmentId == tempId) ? self._thisFragPoint : self._otherFragPoint;
            self._curScore -= delta;
            // 更新进度条
            self._updateProgressBar(-delta);
            // 通知数据模型，选择成功
            pickDataCtrl.unpick();
        };
        __egretProto__._updateProgressBar = function (delta) {
            var self = this;
            var bar = self._bar;
            bar.setProgress(self._curScore > 100 ? 100 : self._curScore, self._pointRequired);
        };
        __egretProto__._exchangeClick = function () {
            var self = this;
            uw.userDataCtrl.buyExclusiveEquip(self._equipDataCtrl.tempId, self._heroDataCtrl.fragmentId, self._itemCart, self.buySucc, self);
        };
        __egretProto__._help = function () {
            uw.UIHelpLayer.create(res.uiForgeHelpLayer_ui).show();
        };
        __egretProto__.buySucc = function (equips) {
            var self = this;
            var gotEquip = equips[0];
            uw.ExclusiveGetDlg.create(gotEquip).show();
            self.exchangeSucc = true;
            self.close();
        };
        ForgeExchagneDlg.__className = "ForgeExchagneDlg";
        ForgeExchagneDlg.PANEL_EQUIP = "panel_equip";
        ForgeExchagneDlg.BTN_EXCHANGE = "btnExchange";
        ForgeExchagneDlg.BTN_HELP = "btnHelp";
        ForgeExchagneDlg.BAR = "bar";
        ForgeExchagneDlg.MAX_COUNT_PER_PAGE = 16;
        ForgeExchagneDlg.LABEL_EXP_PLUS = "expPlus";
        return ForgeExchagneDlg;
    })(mo.UIModalLayer);
    uw.ForgeExchagneDlg = ForgeExchagneDlg;
    ForgeExchagneDlg.prototype.__class__ = "uw.ForgeExchagneDlg";
})(uw || (uw = {}));

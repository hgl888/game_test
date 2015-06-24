/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var CopyWipeOutItem = (function (_super) {
        __extends(CopyWipeOutItem, _super);
        function CopyWipeOutItem() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = CopyWipeOutItem.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiWipeOutItem_ui;
            self._itemCtrls = [];
            self._chestItemCtrls = [];
        };
        __egretProto__.init = function (index, info, level) {
            var self = this;
            _super.prototype.init.call(this);
            self._fightResult = self.getWidgetByName("fightResult");
            self._fightGift = self.getWidgetByName("fightGift");
            var ctrl, item;
            for (var i = 0; i < 5; i++) {
                item = self._fightResult.getWidgetByName("item" + i);
                item.setVisible(false);
                ctrl = uw.UIItemIconCtrl.create(item);
                self._itemCtrls.push(ctrl);
            }
            for (var j = 0; j < 5; j++) {
                item = self._fightGift.getWidgetByName("item" + j);
                item.setVisible(false);
                ctrl = uw.UIItemIconCtrl.create(item);
                self._chestItemCtrls.push(ctrl);
            }
            var root = self.getWidgetByName("bg");
            root.setAnchorPoint(0, 0);
            root.setPosition(0, 0);
        };
        __egretProto__.setTitle = function (level) {
            var strTxt = "第%s层挑战", self = this;
            self._fightResult.setInfoByName("resultTitle", mo.formatStr(strTxt, level));
        };
        __egretProto__.setData = function (index, info, level, teamExpc, gold) {
            var self = this, income = uw.dsConsts.FightResult;
            var itemsObject = info[income.items], width = 0, chestItemsObject = info[income.chestItems], equips = info[income.equips];
            self._fightResult.setInfoByName("labelTeamExpc", teamExpc);
            self._fightResult.setInfoByName("labelGold", gold);
            uw.setGoldColor(self._fightResult, "labelGold");
            self._fightResult.formatByName("resultTitle", index + 1);
            if (itemsObject && Object.keys(itemsObject).length > 0) {
                var _itemContainer = self._fightResult.getWidgetByName("itemContainer");
                for (var itemId in itemsObject) {
                    var itemCount = itemsObject[itemId];
                    var ctrl = self._itemCtrls.shift();
                    if (ctrl) {
                        ctrl.resetByData(itemId);
                        ctrl.setCount(itemCount);
                        ctrl.showTip(true);
                        ctrl.getContainer().setVisible(true);
                        width += 150;
                    }
                }
                _itemContainer.setPositionX((self.getSize().width - width) / 2);
                self._fightResult.setVisibleByName("noItems", false);
                self._fightResult.setVisibleByName("itemContainer", true);
            }
            else {
                self._fightResult.setVisibleByName("noItems", true);
                self._fightResult.setVisibleByName("itemContainer", false);
            }
            width = 0;
            if (chestItemsObject && Object.keys(chestItemsObject).length > 0) {
                var size = mo.size(838, 650);
                self.getUIWidget().setSize(size);
                self.setSize(size);
                self._fightGift.formatByName("giftTitle", level + index + 1);
                self._fightGift.setVisible(true);
                var _chestItemContainer = self._fightGift.getWidgetByName("itemContainer");
                for (var itemId in chestItemsObject) {
                    var itemCount = chestItemsObject[itemId];
                    var ctrl = self._chestItemCtrls.shift();
                    if (ctrl) {
                        ctrl.resetByData(itemId);
                        ctrl.setCount(itemCount);
                        ctrl.showTip(true);
                        ctrl.getContainer().setVisible(true);
                        width += 150;
                    }
                }
                _chestItemContainer.setPositionX((self.getSize().width - width) / 2);
                self._fightGift.setVisibleByName("noItems", false);
                self._fightGift.setVisibleByName("itemContainer", true);
            }
            if (equips && equips.length > 0) {
                for (var i = 0, li = equips.length; i < li; i++) {
                    var equipData = equips[i];
                    var ctrl = uw.EquipDataCtrl.create(equipData);
                    if (ctrl.isExclusive) {
                        uw.log("----->wipe get isExclusive equips: %s", ctrl.tempId);
                        self.getDelegate().popGetExclusiveDlg(ctrl);
                    }
                }
            }
        };
        CopyWipeOutItem.__className = "CopyWipeOutItem";
        return CopyWipeOutItem;
    })(mo.GridViewCell);
    uw.CopyWipeOutItem = CopyWipeOutItem;
    CopyWipeOutItem.prototype.__class__ = "uw.CopyWipeOutItem";
})(uw || (uw = {}));

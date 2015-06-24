/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var CopyWipeOutLayer = (function (_super) {
        __extends(CopyWipeOutLayer, _super);
        function CopyWipeOutLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = CopyWipeOutLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiCopyWipeOutLayer_ui;
            self._dataIndex = 0;
            self._resultHeight = 0;
            self._canClose = false;
            self._dlgs = [];
            self._extraItemCtrls = [];
        };
        __egretProto__.init = function (copyId) {
            _super.prototype.init.call(this);
            var self = this;
            var copyInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            self._gold = copyInfo[uw.t_copy_gold];
            self._teamExpc = copyInfo[uw.t_copy_teamExpc];
            var item, ctrl;
            for (var j = 0; j < 5; j++) {
                item = self.getWidgetByName("item" + j);
                item.setVisible(false);
                ctrl = uw.UIItemIconCtrl.create(item);
                self._extraItemCtrls.push(ctrl);
            }
            //关闭窗口
            self._btnBack = self.getWidgetByName("btnBack");
            self._btnBack.setVisible(false);
            self._btnBack.onClick(self.close, self);
            self._resultContainer = self.getWidgetByName("resultList");
            //监听神秘商店出现
            self.registerClassByKey(uw.ShopDataCtrl, uw.ShopDataCtrl.ON_SECRET_SHOP_APPEAR, function (shopFlag) {
                uw.log("--->神秘商店出现，类型 = ", shopFlag);
                if (shopFlag == 3) {
                    self._shopTipDlg = uw.SecretShopAppearDlg.create(1);
                    self._shopTipDlg.onClose(function () {
                        self._shopTipDlg = null;
                        uw.SecretShopAppearDlg.create(2).show();
                    }, self);
                }
                else {
                    self._shopTipDlg = uw.SecretShopAppearDlg.create(shopFlag);
                    self._shopTipDlg.onClose(function () {
                        self._shopTipDlg = null;
                    }, self);
                }
            });
        };
        __egretProto__.setWipeData = function (data, level) {
            if (level === void 0) { level = 0; }
            this.setVisible(true);
            var self = this;
            self._data = data;
            self._level = level;
            self._resultContainer.removeChildren();
            self._resultContainer.jumpToTop();
            self._resultContainer.setTouchEnabled(false);
            mo.schedule(self._createNextResult, self, 1000, false);
        };
        __egretProto__._createNextResult = function () {
            var self = this;
            if (self._dataIndex < self._data.length) {
                var curData = self._data[self._dataIndex];
                var item = uw.CopyWipeOutItem.create();
                item.setDelegate(self);
                item.setData(self._dataIndex, curData, self._level, self._teamExpc, self._gold);
                item.setAnchorPoint(0, 0);
                self._resultContainer.pushBackCustomItem(item);
                process.nextTick(function () {
                    self._resultContainer.jumpToBottom();
                }, self);
                self._dataIndex++;
            }
            else {
                //显示神秘商店开启对话框
                if (self._shopTipDlg) {
                    if (self._dlgs.length > 0) {
                        self._dlgs.push(self._shopTipDlg);
                    }
                    else {
                        self._shopTipDlg.show();
                    }
                }
                mo.unschedule(self._createNextResult, self);
                self._resultContainer.setTouchEnabled(true);
                self._dataIndex = 0;
                self._btnBack.setVisible(true);
                self._canClose = true;
                self.setExtraInfo();
            }
        };
        __egretProto__.setExtraInfo = function () {
            var self = this;
            var firstData = self._data[0];
            var extraContainer = self.getWidgetByName("extraContainer");
            if (!extraContainer)
                return;
            if (firstData) {
                var width = 0;
                var wipeItems = self._data[0][uw.dsConsts.FightResult.wipeItems];
                var _chestItemContainer = extraContainer.getWidgetByName("itemContainer");
                for (var itemId in wipeItems) {
                    var itemCount = wipeItems[itemId];
                    if (!itemCount)
                        continue;
                    var ctrl = self._extraItemCtrls.shift();
                    if (ctrl) {
                        ctrl.resetByData(itemId);
                        ctrl.setCount(itemCount);
                        ctrl.showTip(true);
                        ctrl.getContainer().setVisible(true);
                        width += 150;
                    }
                }
                _chestItemContainer.setPositionX((extraContainer.getSize().width - width) / 2);
                extraContainer.setVisibleByName("itemContainer", true);
                extraContainer.setVisibleByName("noItems", false);
            }
            else {
                extraContainer.setVisibleByName("itemContainer", false);
                extraContainer.setVisibleByName("noItems", true);
            }
        };
        // 获得专属时的提示框
        __egretProto__.popGetExclusiveDlg = function (dataCtrl) {
            var self = this;
            var dlg = uw.ExclusiveGetDlg.create(dataCtrl);
            dlg.onClose(function (event) {
                self._dlgs.pop();
                if (self._dlgs.length > 0) {
                    var dlg = self._dlgs[self._dlgs.length - 1];
                    dlg.show();
                }
            }, self);
            if (self._dlgs.length <= 0) {
                dlg.show();
            }
            self._dlgs.push(dlg);
        };
        __egretProto__._onClose = function () {
            var self = this;
            if (self._canClose) {
                _super.prototype._onClose.call(this);
            }
            else {
                return { broken: true };
            }
        };
        CopyWipeOutLayer.__className = "CopyWipeOutLayer";
        return CopyWipeOutLayer;
    })(mo.Dlg);
    uw.CopyWipeOutLayer = CopyWipeOutLayer;
    CopyWipeOutLayer.prototype.__class__ = "uw.CopyWipeOutLayer";
})(uw || (uw = {}));

/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var MailBoxLayer = (function (_super) {
        __extends(MailBoxLayer, _super);
        function MailBoxLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MailBoxLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiMailBoxLayer_ui;
            self._isShowDetailBox = false;
            self._itemsCtrlContainer = [];
            self._folding = false;
            self._curMailId = 0;
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.prototype.init.call(this, args);
            var self = this;
            self.onClickByName("btnGet", self._pickMailItems, self);
            self.onClickByName("btnClose", this.close, this);
            uw.setDiamondColor(self, "labelDiamond");
            uw.setGoldColor(self, "labelGold");
            self._listBox = self.getWidgetByName("listBox");
            self._listBox.setVisible(true);
            self._detailBox = self.getWidgetByName("detailBox");
            self._detailBox.setVisible(false);
            self._detailBox.setTouchEnabled(false);
            self._gridScrollView = self._createGridScrollView("listContainer", uw.MailItemCell, 1, self._onItemCellDataSource);
            for (var i = 0; i < 4; i++) {
                var itemWidget = self.getWidgetByName("item" + i);
                var ctrl = uw.UIItemIconCtrl.create(itemWidget);
                ctrl.showTip(true);
                self._itemsCtrlContainer.push(ctrl);
            }
            self._initWithData();
        };
        __egretProto__._initWithData = function () {
            var self = this;
            self._data = uw.mailDataCtrl.getList();
            self._gridScrollView.setTotalCount(self._data.length);
            if (self._data.length > 0) {
                self.setVisibleByName("noMail", false);
            }
            else {
                self.setVisibleByName("noMail", true);
            }
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var self = this;
            var info = self._data[index];
            cell.resetByData(info);
            if (!cell.listenerInited) {
                cell.listenerInited = true;
                cell.setTouchEnabled(true);
                cell.onClick(this._onCellClick, this);
            }
        };
        __egretProto__._onCellClick = function (cell) {
            var self = this;
            if (self._folding)
                return;
            self._folding = true;
            if (self._curMailNode) {
                var seq = mo.sequence(mo.moveBy(0.2, mo.p(20, 0)));
                self._curMailNode.runAction(seq);
            }
            if (self._isShowDetailBox && self._curMailNode == cell) {
                self.hideDetailBox();
                self._curMailNode = null;
            }
            else {
                var seq = mo.sequence(mo.moveBy(0.2, mo.p(-20, 0)), mo.callFunc(function (sender) {
                    sender.setRead();
                }, self));
                cell.runAction(seq);
                self.readDetailMsg(cell.getId());
                if (!self._isShowDetailBox) {
                    self.showDetailBox();
                }
                self._curMailNode = cell;
            }
            uw.fightUtils.delayCall(0.21, function () {
                self._folding = false;
            }, self);
        };
        __egretProto__.readDetailMsg = function (id) {
            var self = this;
            self._curMailId = id;
            var mailInfoConst = uw.dsConsts.MailEntity;
            var info = uw.mailDataCtrl.getInfoById(id);
            //邮件内容
            self._detailBox.setInfoByName("sender", info[mailInfoConst.fromName]);
            var content = self._detailBox.getWidgetByName("content");
            content.setAutoSizeHeight(true);
            content.setText(info[mailInfoConst.content]);
            var contentContainer = self._detailBox.getWidgetByName("contentContainer");
            contentContainer.setInnerContainerSize(content.getSize());
            //是否隐藏附件面板
            var items = info[mailInfoConst.items];
            var isPicked = info[mailInfoConst.isPicked];
            if (items && !isPicked) {
                self.setVisibleByName("attachmentBox", true);
                //设置附件信息
                self.hideAllItems();
                var i = 0;
                self.setInfoByName("labelDiamond", "x0");
                self.setInfoByName("labelGold", "x0");
                for (var key in items) {
                    var tempId = parseInt(key);
                    if (tempId == uw.c_prop.spItemIdKey.diamond) {
                        var diamond = items[uw.c_prop.spItemIdKey.diamond] || 0;
                        self.setInfoByName("labelDiamond", "x" + diamond);
                    }
                    else if (tempId == uw.c_prop.spItemIdKey.gold) {
                        var gold = items[uw.c_prop.spItemIdKey.gold] || 0;
                        self.setInfoByName("labelGold", "x" + gold);
                    }
                    else {
                        var ctrl = self._itemsCtrlContainer[i];
                        ctrl.resetByData(tempId);
                        ctrl.setCount(items[key]);
                        var item = ctrl.getContainer();
                        item.setVisible(true);
                        item.setTouchEnabled(true);
                        i++;
                    }
                }
            }
            else {
                self.setVisibleByName("attachmentBox", false);
            }
        };
        __egretProto__._pickMailItems = function () {
            var self = this;
            uw.mailDataCtrl.pickItems(self._curMailId, function (isDel) {
                self.setVisibleByName("attachmentBox", true);
                self.hideDetailBox();
                if (isDel) {
                    self._initWithData();
                }
            }, self);
        };
        __egretProto__.hideAllItems = function () {
            for (var i = 0; i < this._itemsCtrlContainer.length; i++) {
                var ctrl = this._itemsCtrlContainer[i];
                if (ctrl) {
                    var item = ctrl.getContainer();
                    item.setVisible(false);
                    item.setTouchEnabled(false);
                }
            }
        };
        __egretProto__.showDetailBox = function () {
            var self = this;
            self._detailBox.setVisible(true);
            var seq = mo.sequence(mo.moveBy(0.2, mo.p(-540, 0)).setEase(egret.Ease.sineOut));
            self._detailBox.runAction(seq);
            var seq1 = mo.moveBy(0.2, mo.p(540, 0)).setEase(egret.Ease.sineOut);
            self._listBox.runAction(seq1);
            self._isShowDetailBox = true;
        };
        __egretProto__.hideDetailBox = function () {
            var self = this;
            var seq = mo.sequence(mo.moveBy(0.2, mo.p(540, 0)).setEase(egret.Ease.sineIn), mo.callFunc(function (sender) {
                sender.setVisible(false);
            }.bind(this)));
            self._detailBox.runAction(seq);
            var seq1 = mo.moveBy(0.2, mo.p(-540, 0)).setEase(egret.Ease.sineIn);
            self._listBox.runAction(seq1);
            self._isShowDetailBox = false;
        };
        MailBoxLayer.__className = "MailBoxLayer";
        return MailBoxLayer;
    })(mo.UIModalLayer);
    uw.MailBoxLayer = MailBoxLayer;
    MailBoxLayer.prototype.__class__ = "uw.MailBoxLayer";
})(uw || (uw = {}));

/**
 * Created by lihex on 12/17/14.
 */
var uw;
(function (uw) {
    var TabListCtrl = (function (_super) {
        __extends(TabListCtrl, _super);
        function TabListCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TabListCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._pointer = null;
            self._preTab = null;
            self._preTabPos = null;
            self._isMoving = false;
            self._isFlippingX = false;
            self._offsetX = 20;
            self._immediately = false;
            self._startOffSet = mo.p(0, 60);
            self._spacing = null;
            self._tabList = null;
            self._titleSize = 64;
            self._itemSize = mo.size(300, 170);
            self._pointerType = TabListCtrl.POINTER_TO_RIGHT;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
        };
        //@override
        __egretProto__.init = function (container, pointerType, bgType, itemSize, startOffSet, spacing) {
            var self = this;
            _super.prototype.init.call(this);
            container.bgOpacity = 0;
            self._widget = container;
            if (startOffSet) {
                self._startOffSet = mo.p(startOffSet.x, startOffSet.y);
            }
            self._spacing = spacing || 0;
            if (itemSize) {
                self._itemSize = mo.size(itemSize.width, itemSize.height);
            }
            self._pointerType = pointerType || TabListCtrl.POINTER_TO_RIGHT;
            //          // 指针图片
            var pointer = self._pointer = mo.UIImage.create();
            pointer.loadTexture(res.ui_common.tag_focus2_png);
            pointer.visible = false;
            var _bgType;
            if (self._pointerType == TabListCtrl.POINTER_TO_LEFT) {
                _bgType = res.ui_panel.blk9_rtabbg_png;
            }
            else {
                _bgType = res.ui_panel.blk9_ltabbg_png;
                pointer.setFlippedX(true);
                self._isFlippingX = true;
            }
            pointer.zOrder = 999;
            container.addChild(pointer);
            _bgType = bgType || _bgType;
            mo.createS9GPanel(container.width, container.height, _bgType, container);
            self._tabList = [];
        };
        /**
         * @param data 数组，形如：[{name: self.BTN_ALL, title:"全部"}, ..]
         */
        __egretProto__.resetByData = function (data) {
            var self = this;
            for (var i = 0, li = self._tabList.length; i < li; i++) {
                self._widget.removeChild(self._tabList[i]);
            }
            var iC = data.length; // tab的数量
            var cH = 0; // 容器的高度
            var iH = self._itemSize.height; // ta高度
            var iW = self._itemSize.width; // tab宽度
            //从最下面的位置开始画起
            var startPos = self._startOffSet.y;
            cH += self._startOffSet.y;
            for (var i = 0, li = iC; i < li; i++) {
                var d = data[i];
                var tab = mo.UIPanel.create();
                tab.bgOpacity = 0;
                tab.zOrder = 9999;
                tab.setSize(iW, iH);
                tab.name = d.name;
                var title = mo.UIText.create();
                title.name = TabListCtrl.LABEL_TAB_NAME;
                title.setText(d.title);
                title.setFontSize(self._titleSize);
                title.setPosition(iW / 2, iH / 2);
                tab.addChild(title);
                var posY = startPos + (iH + self._spacing) * i;
                cH += iH + self._spacing;
                tab.setPosition(0, posY);
                tab.touchEnabled = true;
                tab.onClick(self._onTabClicked, self);
                self._widget.addChild(tab);
                self._tabList.push(tab);
            }
            self._widget.setSize(iW, cH + self._startOffSet.y);
            self._pointer.setVisible(false);
            self._pointer.setVisible(iC > 0); //设置指标可见
        };
        __egretProto__.onTabClicked = function (cb, target) {
            var self = this;
            self._onTabClickedCb = cb;
            self._onTabClickedTarget = target;
        };
        __egretProto__._onTabClicked = function (sender) {
            var self = this;
            if (this._preTab == sender || this._isMoving)
                return;
            var flag = true;
            if (self._onTabClickedCb) {
                flag = self._onTabClickedCb.call(self._onTabClickedTarget, sender);
            }
            if (flag) {
                self._movePointer(sender, self._immediately);
            }
        };
        __egretProto__._movePointer = function (sender, immediately) {
            var self = this;
            var size = sender.getSize();
            var pos = sender.getPosition();
            var tabPos = mo.pAdd(pos, mo.p(size.width / 2, size.height / 2));
            //设置颜色和描边
            if (self._preTab) {
                var label = self._preTab.getWidgetByName(TabListCtrl.LABEL_TAB_NAME);
                if (label) {
                    label.color = mo.c3b(229, 229, 229);
                    label.disableStroke();
                }
            }
            if (immediately) {
                if (self._preTab) {
                    self._preTab.setPosition(self._preTabPos);
                }
                self._pointer.setPosition(tabPos);
                self._preTab = sender;
                self._preTabPos = mo.p(pos.x, pos.y);
                var label = sender.getWidgetByName(TabListCtrl.LABEL_TAB_NAME);
                if (label) {
                    label.color = mo.c3b(239, 232, 203);
                    label.enableStroke(mo.c3b(153, 0, 0), 4);
                }
                sender.setPosition(mo.pAdd(pos, mo.p((self._isFlippingX ? 1 : -1) * self._offsetX, 0)));
            }
            else {
                var seq = mo.sequence(mo.moveTo(0.1, tabPos).setEase(mo.Ease.sineOut), mo.callFunc(function () {
                    if (self._preTab) {
                        self._preTab.runAction(mo.moveTo(0.032, self._preTabPos));
                    }
                    self._preTab = sender;
                    self._preTabPos = mo.p(pos.x, pos.y);
                    var seq1 = mo.sequence(mo.moveTo(0.032, mo.pAdd(pos, mo.p((self._isFlippingX ? 1 : -1) * self._offsetX, 0))), mo.callFunc(function () {
                        self._isMoving = false;
                    }, self));
                    sender.runAction(seq1);
                    //设置颜色和描边
                    var label = sender.getWidgetByName(TabListCtrl.LABEL_TAB_NAME);
                    if (label) {
                        label.setColor(cc.c3b(239, 232, 203));
                        label.enableStroke(cc.c3b(153, 0, 0), 3);
                    }
                }, this));
                self._pointer.runAction(seq);
                self._isMoving = true;
                sender.setPosition(mo.pAdd(pos, mo.p((self._isFlippingX ? 1 : -1) * self._offsetX, 0)));
            }
        };
        Object.defineProperty(__egretProto__, "moveSmooth", {
            get: function () {
                return !this._immediately;
            },
            /**
             * 平滑切换
             * @param bool
             */
            set: function (smooth) {
                this._immediately = !smooth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "pointerOffsetX", {
            get: function () {
                return this._offsetX;
            },
            set: function (offsetX) {
                this._offsetX = offsetX;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.movePointerByName = function (name, immediately) {
            var self = this;
            var w = self._widget.getWidgetByName(name);
            var oldImmediately = self._immediately;
            self._immediately = immediately || true;
            self._onTabClicked(w);
            self._immediately = oldImmediately;
        };
        TabListCtrl.__className = "TabListCtrl";
        TabListCtrl.LABEL_TAB_NAME = "label";
        TabListCtrl.POINTER_TO_LEFT = 1;
        TabListCtrl.POINTER_TO_RIGHT = 2;
        return TabListCtrl;
    })(mo.WidgetCtrl);
    uw.TabListCtrl = TabListCtrl;
    TabListCtrl.prototype.__class__ = "uw.TabListCtrl";
})(uw || (uw = {}));

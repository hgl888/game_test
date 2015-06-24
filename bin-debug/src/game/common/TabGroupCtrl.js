/**
 * Created by lihex on 12/26/14.
 */
var uw;
(function (uw) {
    var TabCroupCtrl = (function (_super) {
        __extends(TabCroupCtrl, _super);
        function TabCroupCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TabCroupCtrl.prototype;
        //@override
        __egretProto__.init = function (container, pointerName) {
            var self = this;
            self._widget = container;
            self._callbacks = {};
            // 没有指定名字的话就用默认的
            pointerName = pointerName || self.__class.IMG_POINTER;
            self._pointer = self._widget.getWidgetByName(pointerName);
            if (!self._pointer) {
                //创建一个pointer
                self._pointer = mo.UIPanel.create();
                self._pointer.setVisible(false);
                self._pointer.name = self.__class.IMG_POINTER;
                container.addChild(self._pointer);
            }
        };
        __egretProto__.setPointerVisible = function (visible) {
            this._isPointerVisible = visible;
        };
        __egretProto__.getPointer = function () {
            return this._pointer;
        };
        __egretProto__.setPointerOffsetX = function (offsetX) {
            this._offsetX = offsetX;
        };
        __egretProto__.setFlippedX = function (flipX) {
            this._isFlippingX = flipX;
            this._pointer.setFlippedX(flipX);
        };
        /**
         * 平滑切换
         * @param bool
         */
        __egretProto__.setMoveSmooth = function (bool) {
            this._immediately = !bool;
        };
        __egretProto__._onItemClickByName = function (name, sender) {
            var self = this;
            if (this._preTab == sender || this._isMoving)
                return;
            // 检查是否可以移动tab
            if (self._tabChangeCb) {
                if (!self._tabChangeCb.call(self._tabChangeTarget, self._preTab, sender))
                    return;
            }
            self._movePointer(name, sender, self._immediately);
            var opt = self._callbacks[name];
            if (!opt) {
                uw.warn("[%s]未注册点击事件", name);
            }
            else {
                opt.selector.call(opt.target, name, sender);
            }
        };
        __egretProto__._movePointer = function (name, sender, immediately) {
            var self = this, clazz = self.__class;
            var size = sender.getSize();
            var pos = sender.getPosition();
            var tabPos = mo.pAdd(pos, mo.p(size.width * 0.5, size.height * 0.5));
            //设置颜色和描边
            if (this._preTab) {
                var label = this._preTab.getWidgetByName(clazz.LABEL_TAB_NAME);
                if (label) {
                    label.setColor(cc.c3b(229, 229, 229));
                    label.disableStroke(false);
                }
            }
            if (immediately) {
                if (this._preTab) {
                    this._preTab.setPosition(this._preTabPos);
                }
                this._pointer.setPosition(tabPos);
                this._preTab = sender;
                this._preTabPos = mo.p(pos.x, pos.y);
                var label = sender.getWidgetByName(clazz.LABEL_TAB_NAME);
                if (label) {
                    label.setColor(cc.c3b(239, 232, 203));
                    label.enableStroke(cc.c3b(153, 0, 0), 4, false);
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
                    var label = sender.getWidgetByName(clazz.LABEL_TAB_NAME);
                    if (label) {
                        label.setColor(cc.c3b(239, 232, 203));
                        label.enableStroke(cc.c3b(153, 0, 0), 4, false);
                    }
                }, this));
                this._pointer.runAction(seq);
                this._isMoving = true;
            }
        };
        __egretProto__.setPointerByName = function (name) {
            var self = this;
            var w = this._widget.getWidgetByName(name);
            var oldImmediately = self._immediately;
            self._immediately = true;
            self._onItemClickByName(name, w);
            self._immediately = oldImmediately;
        };
        __egretProto__.addDataSourceAdapter = function (selector, target) {
            this._dataSourceAdapterSelector = selector;
            this._dataSourceAdapterTarget = target;
        };
        __egretProto__._executeDataAdapterCallback = function (name, tabWidget) {
            if (this._dataSourceAdapterSelector && this._dataSourceAdapterTarget) {
                return this._dataSourceAdapterSelector.call(this._dataSourceAdapterTarget, name, tabWidget, this);
            }
        };
        __egretProto__.resetData = function () {
            var self = this;
            var callbacks = self._callbacks;
            for (var name in callbacks) {
                var w = this._widget.getWidgetByName(name);
                this._executeDataAdapterCallback(name, w);
            }
        };
        /**
         * 注册切换到某个tab页事件监听
         * @param name
         * @param selector
         * @param target
         */
        __egretProto__.onItemClickByName = function (name, selector, target) {
            this._callbacks[name] = { selector: selector, target: target };
            var self = this;
            this._widget.onClickByName(name, function (sender) {
                self._onItemClickByName(name, sender);
            }, self);
        };
        /**
         * 注册tab切换前的事件监听,如果监听返回true则执行切换，否则不切换tab
         * @param cb
         * @param target
         */
        __egretProto__.onTabChange = function (cb, target) {
            this._tabChangeCb = cb;
            this._tabChangeTarget = target;
        };
        __egretProto__.setTabLabelByName = function (tabName, txt) {
            this.getWidgetByName(tabName).setInfoByName(this.__class.LABEL_TAB_NAME, txt);
        };
        TabCroupCtrl.__className = "TabCroupCtrl";
        TabCroupCtrl.LABEL_TAB_NAME = "label";
        TabCroupCtrl.IMG_POINTER = "tabPointer";
        return TabCroupCtrl;
    })(mo.WidgetCtrl);
    uw.TabCroupCtrl = TabCroupCtrl;
    TabCroupCtrl.prototype.__class__ = "uw.TabCroupCtrl";
})(uw || (uw = {}));

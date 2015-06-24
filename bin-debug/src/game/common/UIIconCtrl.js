var uw;
(function (uw) {
    var UIIconCtrl = (function (_super) {
        __extends(UIIconCtrl, _super);
        function UIIconCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIIconCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            var self = this;
            _super.prototype._initProp.call(this);
            self._infoJsonPath = res.uiInfoTip_ui;
            self.tipWidget = null;
            self._container = null;
            self._isShow = false;
        };
        __egretProto__.init = function (container) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _super.prototype.init.call(this);
            var self = this;
            if (container) {
                self.attachWidgetTo(container, -1);
            }
        };
        __egretProto__.cleanContainer = function (container) {
            if (container.iconWidget) {
                container.iconWidget.removeFromParent(true);
                container.iconWidget = null;
            }
            container.iconCtrl = null;
        };
        //@override
        __egretProto__.attachWidgetTo = function (container, zorder, tag) {
            if (zorder === void 0) { zorder = 0; }
            var self = this;
            self.cleanContainer(container);
            _super.prototype.attachWidgetTo.apply(self, arguments);
            var widget = self.widget;
            //进行缩放设置
            var containerSize = container.getSize();
            var widgetSize = widget.getSize();
            widget.setScale(containerSize.width / widgetSize.width, containerSize.height / widgetSize.height);
            //设置属性
            container.iconCtrl = self;
            container.iconWidget = widget;
            container.bgOpacity = 0;
            self._container = container;
        };
        //@override
        __egretProto__.detachWidget = function () {
            var self = this;
            _super.prototype.detachWidget.call(this);
            if (self._container)
                self.cleanContainer(self._container);
            self._container = null;
        };
        __egretProto__.getContainer = function () {
            return this._container;
        };
        //@override
        __egretProto__._initClickEvent = function () {
            var self = this;
            _super.prototype._initClickEvent.call(this);
            if (self._clickWidgetName) {
                var clickWidget = self.widget.getWidgetByName(self._clickWidgetName);
                var TE = mo.TouchEvent;
                clickWidget.addEventListener(TE.NODE_BEGIN, self._onClickBegin4Display, self);
                clickWidget.addEventListener(TE.NODE_END, self._onClickEnd4Display, self);
            }
        };
        __egretProto__._onClickBegin4Display = function (event) {
            var self = this;
            if (self._isShow) {
                self._createTip();
            }
        };
        __egretProto__._onClickEnd4Display = function (event) {
            var self = this;
            if (self._isShow) {
                self._removeTip();
            }
        };
        __egretProto__._removeTip = function () {
            var self = this;
            if (self._isShow && self.tipWidget) {
                self.tipWidget.removeFromParent(true);
                self.tipWidget = null;
            }
        };
        __egretProto__.showTip = function (isShow, noShowNameList) {
            var self = this;
            self._isShow = isShow;
            if (self._isShow) {
                self.setClickEnabled(true);
            }
            if (noShowNameList) {
                self._noShowNames = noShowNameList instanceof Array ? noShowNameList : [noShowNameList];
            }
        };
        __egretProto__._createTip = function () {
            var self = this;
            if (!self._container || !self._container.isVisible())
                return;
            if (self._isShow && !self.tipWidget) {
                self.tipWidget = mo.uiReader.genWidget(self._infoJsonPath);
                mo.runningScene.topTray.addNode(self.tipWidget);
                var labelDesc = self.tipWidget.getWidgetByName(UIIconCtrl.LABEL_DESC);
                labelDesc.setAutoSizeHeight(true);
                self._descHeight = labelDesc.height;
                self._readTipInfo();
            }
        };
        __egretProto__._adapt = function (str) {
            //自适应高度
            var self = this;
            var tipWidget = self.tipWidget;
            var labelDesc = tipWidget.getWidgetByName(UIIconCtrl.LABEL_DESC);
            var diffHeight = labelDesc.getSize().height - self._descHeight;
            var container = tipWidget.getWidgetByName(UIIconCtrl.PANEL_CONTAINER);
            container.setSize(mo.size(container.getSize().width, container.getSize().height + diffHeight));
            //适应位置
            var size = self._container.getSize(), originWorldPos = self._container.localToGlobal(0, 0);
            var containerSize = self.tipWidget.getSizeByName(UIIconCtrl.PANEL_CONTAINER);
            var x = size.width / 2 + originWorldPos.x;
            var y = originWorldPos.y - containerSize.height / 2;
            var diffX1 = x - containerSize.width / 2;
            var diffX2 = mo.visibleRect.getWidth() - x - containerSize.width / 2;
            if (diffX1 < 0) {
                x = x + Math.abs(diffX1);
            }
            else if (diffX2 < 0) {
                x = x + diffX2;
            }
            var diffY = y - containerSize.height / 2;
            if (diffY < 0) {
                y = containerSize.height / 2;
            }
            self.tipWidget.setPosition(x, y);
        };
        __egretProto__._readTipInfo = function () {
        };
        UIIconCtrl.__className = "UIIconCtrl";
        UIIconCtrl.PANEL_ITEM = "item"; //物品
        UIIconCtrl.LABEL_NAME = "name"; //名字
        UIIconCtrl.LABEL_DESC = "desc"; //描述
        UIIconCtrl.LABEL_GOLD = "gold"; //金币
        UIIconCtrl.LABEL_LEVEL = "level"; //等级
        UIIconCtrl.LABEL_PRICE = "price"; //价格
        UIIconCtrl.LABEL_ISBOSS = "isBoss"; //是否是BOSS
        UIIconCtrl.LABEL_TRAINLVL = "trainLvl"; // 品阶等级
        UIIconCtrl.PANEL_CONTAINER = "container"; // 背景
        return UIIconCtrl;
    })(mo.WidgetCtrl);
    uw.UIIconCtrl = UIIconCtrl;
    UIIconCtrl.prototype.__class__ = "uw.UIIconCtrl";
})(uw || (uw = {}));

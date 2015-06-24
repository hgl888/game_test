var mo;
(function (mo) {
    var GridController = (function (_super) {
        __extends(GridController, _super);
        function GridController() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GridController.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._containerH = 0;
            self._containerW = 0;
            self._cols = 1;
            self._layout = 1; //默认为均分
        };
        //@override
        __egretProto__.init = function (container, cols, resizeContainer) {
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self._itemWidgets = [];
            if (!container) {
                throw "请先指定container！";
            }
            self.widget = container;
            self.widget.controller = self; //TODO
            self._cols = cols || self._cols;
            self._resizeContainer = resizeContainer || false;
            self._containerH = container.getSize().height;
            self._containerW = container.getSize().width;
            self._dataList = [];
        };
        __egretProto__._resetItemByData = function (widget, data, index) {
            mo.warn("子类通过重写这个接口来设置项");
        };
        __egretProto__._initItemWidget = function (widget) {
            //子类通过重写这个接口来设置项的监听
        };
        __egretProto__._setPosByAvg = function (widget, row, col) {
            var self = this;
            var cH = self._containerH, iH = self._itemH;
            var marginH = (cH - iH * self._rows) / (self._rows + 1);
            widget.x = self._containerW * (col - 1) / self._cols;
            widget.y = marginH + (row - 1) * (marginH + iH);
        };
        __egretProto__._setPosByTop_bak = function (widget, row, col) {
            var self = this;
            var cH = self._containerH, iH = self._itemH;
            var marginH = self._marginH != null ? self._marginH : (cH - iH * self._rows) / self._rows;
            marginH = marginH < 0 ? 0 : marginH;
            widget.setPosition(self._containerW * (col - 1) / self._cols, cH - iH * row - marginH * (row - 1));
        };
        __egretProto__._setPosByTop = function (widget, row, col) {
            var self = this;
            var cH = self._containerH, iH = self._itemH;
            var marginH = self._marginH != null ? self._marginH : (cH - iH * self._rows) / self._rows;
            marginH = marginH < 0 ? 0 : marginH;
            // 设置x坐标：widget横向居中显示
            widget.x = widget.anchorX * widget.width + self._containerW * (col - 1) / self._cols + (self._itemW - widget.width) / 2;
            widget.y = widget.anchorY * widget.height + marginH + (row - 1) * (marginH + iH);
        };
        __egretProto__._setPosByBottom_bak = function (widget, row, col) {
            var self = this;
            widget.setPosition(self._containerW * (col - 1) / self._cols, (self._rows - row) * self._itemH);
        };
        __egretProto__._setPosByBottom = function (widget, row, col) {
            var self = this;
            var cH = self._containerH, iH = self._itemH;
            var marginH = self._marginH != null ? self._marginH : (cH - iH * self._rows) / self._rows;
            widget.x = self._containerW * (col - 1) / self._cols;
            widget.y = (self._rows - row + 1) * (self._itemH + marginH);
        };
        __egretProto__._createItemWidget = function () {
            return mo.uiReader.genWidget(this._itemJsonPath);
        };
        /**
         * 通过此接口进行视图的重置
         * @param dataList
         */
        __egretProto__.resetByData = function (dataList) {
            var self = this, dList = self._dataList, itemWidgets = self._itemWidgets;
            dList.length = 0; //重置掉
            var i = 0;
            var l = dataList.length;
            var col = 1;
            var row = 1;
            self._rows = Math.ceil(l / self._cols); //获取行数
            for (; i < l; ++i) {
                dList.push(dataList[i]);
                if (col > self._cols) {
                    col = 1;
                    row++;
                }
                var data = dataList[i];
                var widget = itemWidgets[i];
                if (!widget) {
                    widget = itemWidgets[i] = self._createItemWidget();
                    self.widget.addChild(widget);
                    self._initItemWidget(widget);
                }
                else {
                    widget.setVisible(true);
                }
                //设置数据
                widget.itemIndex = i;
                self._resetItemByData(widget, data, i);
                //获取项的高度
                if (!self._itemH) {
                    self._itemH = widget.getSize().height;
                }
                if (!self._itemW) {
                    self._itemW = self._containerW / self._cols;
                }
                if (self._layout == self.__class.LAYOUT_AVG) {
                    self._setPosByAvg(widget, row, col);
                }
                else if (self._layout == self.__class.LAYOUT_TOP) {
                    self._setPosByTop(widget, row, col);
                }
                else if (self._layout == self.__class.LAYOUT_BOTTOM) {
                    self._setPosByBottom(widget, row, col);
                }
                col++;
            }
            for (; i < itemWidgets.length; ++i) {
                itemWidgets[i].setVisible(false);
            }
            if (self._resizeContainer) {
                var totalHeight = self.getRowTotalHeight();
                self.setSize(self.widget.getSize().width, totalHeight);
            }
        };
        __egretProto__.setLayoutType = function (type) {
            this._layout = type;
        };
        __egretProto__.setSize = function (width, height) {
            var self = this;
            var widget = self.widget;
            widget.setSize.apply(widget, arguments);
            self._containerW = widget.getSize().width;
            self._containerH = widget.getSize().height;
        };
        __egretProto__.getSize = function () {
            return this.widget.getSize();
        };
        /**
         * 获取总行数累加的高度
         */
        __egretProto__.getRowTotalHeight = function () {
            return this._rows * this._itemH + (this._rows - 1) * this._marginH;
        };
        __egretProto__.cellAtIndex = function (index) {
            var children = this.widget.getChildren();
            return children[index];
        };
        __egretProto__.setMarginHeight = function (height) {
            this._marginH = height;
        };
        GridController.__className = "GridController";
        GridController.LAYOUT_AVG = 1;
        GridController.LAYOUT_TOP = 2; // 顶端布局：位置从上往下画
        GridController.LAYOUT_BOTTOM = 3;
        return GridController;
    })(mo.WidgetCtrl);
    mo.GridController = GridController;
    GridController.prototype.__class__ = "mo.GridController";
})(mo || (mo = {}));

var mo;
(function (mo) {
    var _CellOption = (function (_super) {
        __extends(_CellOption, _super);
        function _CellOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _CellOption.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.row = -1;
            self.idx = -1;
            self.cellSize = mo.size(0, 0);
            self.clickWidgetName = "touch_panel";
        };
        //@override
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            self.widget = null;
            self.listenerIniter = null;
            self.listenerIniterCtx = null;
            self.data = null;
        };
        return _CellOption;
    })(mo.Option);
    mo._CellOption = _CellOption;
    _CellOption.prototype.__class__ = "mo._CellOption";
    var UIGridCell = (function (_super) {
        __extends(UIGridCell, _super);
        function UIGridCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIGridCell.prototype;
        Object.defineProperty(__egretProto__, "data", {
            /**
             * 数据
             */
            get: function () {
                return this._cellOption.data;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.resetByData = function (data) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            this._cellOption.data = data;
            mo.warn(logCode.c_103);
        };
        __egretProto__.initListeners = function () {
            var self = this, cellOption = self._cellOption;
            if (!cellOption.listenerInited) {
                cellOption.listenerInited = true;
                if (cellOption.listenerIniter)
                    cellOption.listenerIniter.call(cellOption.listenerIniterCtx, self);
            }
        };
        __egretProto__.registerListenerIniter = function (listenerIniter, listenerIniterCtx) {
            var cellOption = this._cellOption;
            cellOption.listenerIniter = listenerIniter;
            cellOption.listenerIniterCtx = listenerIniterCtx;
        };
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._cellOption = new _CellOption();
        };
        //@override
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.prototype.init.call(this);
            var self = this, cellOption = self._cellOption;
            self.ignoreContentAdaptWithSize(false);
            self.setAnchorPoint(mo.p(0.5, 0.5));
            if (cellOption.jsonPath) {
                self.initWithFilePath(cellOption.jsonPath);
            }
            if (cellOption.clickWidgetName) {
                self.setTouchEnabledByName(cellOption.clickWidgetName, true);
                if (cellOption.useClickEffect) {
                    var widget = self.getWidgetByName(cellOption.clickWidgetName);
                    var TE = mo.TouchEvent;
                    widget.addEventListener(TE.NODE_BEGIN, self._onTouchBeginForClickWidget, self);
                    widget.addEventListener(TE.NODE_END, self._onTouchEndForClickWidget, self);
                }
                self.onClickByName(cellOption.clickWidgetName, self._onClick, self);
            }
        };
        __egretProto__._onTouchBeginForClickWidget = function () {
            var self = this;
            self.setScale(1.05);
        };
        __egretProto__._onTouchEndForClickWidget = function () {
            var self = this;
            self.setScale(1);
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this, cellOption = self._cellOption;
            if (cellOption.useClickEffect) {
                var widget = self.getWidgetByName(cellOption.clickWidgetName);
                var TE = mo.TouchEvent;
                widget.removeEventListener(TE.NODE_BEGIN, self._onTouchBeginForClickWidget, self);
                widget.removeEventListener(TE.NODE_END, self._onTouchEndForClickWidget, self);
            }
        };
        __egretProto__._onClick = function (sender, event, data) {
            var self = this;
            if (self._nodeOption.clickCb != null) {
                mo.dispatchEvent([
                    [mo.cellClickDispatcher, self.__className],
                ], self._doClick, self, data);
            }
        };
        __egretProto__.getUIWidget = function () {
            return this._cellOption.widget;
        };
        __egretProto__.initWithFilePath = function (jsonPath) {
            var self = this, cellOption = self._cellOption;
            if (!cellOption.widget) {
                cellOption.jsonPath = jsonPath;
                var widget = cellOption.widget = mo.uiReader.genWidget(cellOption.jsonPath);
                self.addChild(widget);
                self._setWidth(widget.width);
                self._setHeight(widget.height);
            }
        };
        /**
         * 获取cell的index
         * @returns {number}
         */
        __egretProto__.getIdx = function () {
            return this._cellOption.idx;
        };
        /**
         * 设置cell的index
         * @param {number} idx
         */
        __egretProto__.setIdx = function (idx) {
            this._cellOption.idx = idx;
        };
        /**
         * 获取cell所在的列数
         * @returns {number}
         */
        __egretProto__.getRow = function () {
            return this._cellOption.row;
        };
        /**
         * 设置cell所在的列数
         * @param {number} row
         */
        __egretProto__.setRow = function (row) {
            this._cellOption.row = row;
        };
        /**
         * 重置这个cell
         */
        __egretProto__.reset = function () {
            this._cellOption.idx = -1;
            this._cellOption.row = -1;
        };
        /**
         * 设置cellSize大小
         */
        __egretProto__.setCellSize = function (cellSize, height) {
            if (arguments.length == 1) {
                height = cellSize.height;
                cellSize = cellSize.width;
            }
            var self = this, cellOption = self._cellOption;
            var widget = cellOption.widget;
            if (widget) {
                //居中
                widget._setX((cellSize - widget.width) / 2);
                widget._setY((height - widget.height) / 2);
            }
            var cs = cellOption.cellSize;
            cs.width = cellSize;
            cs.height = cellSize;
        };
        /**
         * 获取cellSize
         */
        __egretProto__.getCellSize = function () {
            return this._cellOption.cellSize;
        };
        UIGridCell.__className = "UIGridCell";
        return UIGridCell;
    })(mo.UIPanel);
    mo.UIGridCell = UIGridCell;
    UIGridCell.prototype.__class__ = "mo.UIGridCell";
})(mo || (mo = {}));

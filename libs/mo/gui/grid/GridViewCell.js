var mo;
(function (mo) {
    var GridViewCell = (function (_super) {
        __extends(GridViewCell, _super);
        function GridViewCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GridViewCell.prototype;
        __egretProto__.resetByData = function (data) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            mo.warn(logCode.c_103);
        };
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._clickWidgetName = "touch_panel";
            self._useClickEffect = false;
            this._row = -1;
            this._idx = -1;
        };
        //@override
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.prototype.init.call(this);
            var self = this;
            self.ignoreContentAdaptWithSize(false);
            self.setAnchorPoint(mo.p(0.5, 0.5));
            if (self._jsonPath) {
                self.initWithFilePath(self._jsonPath);
            }
            if (self._clickWidgetName) {
                self.setTouchEnabledByName(self._clickWidgetName, true);
                if (self._useClickEffect) {
                    var widget = self.getWidgetByName(self._clickWidgetName);
                    var TE = mo.TouchEvent;
                    widget.addEventListener(TE.NODE_BEGIN, self._onTouchBeginForClickWidget, self);
                    widget.addEventListener(TE.NODE_END, self._onTouchEndForClickWidget, self);
                }
                self.onClickByName(self._clickWidgetName, self._onClick, self);
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
            var self = this;
            if (self._useClickEffect) {
                var widget = self.getWidgetByName(self._clickWidgetName);
                var TE = mo.TouchEvent;
                widget.removeEventListener(TE.NODE_BEGIN, self._onTouchBeginForClickWidget, self);
                widget.removeEventListener(TE.NODE_END, self._onTouchEndForClickWidget, self);
            }
        };
        __egretProto__._onClick = function (sender, event, data) {
            var self = this;
            if (self._nodeOption.clickCb != null) {
                mo.dispatchEvent([
                    [mo.cellClickDispatcher, self.__className]
                ], self._doClick, self, data);
            }
        };
        __egretProto__.getUIWidget = function () {
            return this._uiWidget;
        };
        __egretProto__.initWithFilePath = function (jsonPath) {
            if (!this._uiWidget) {
                this._jsonPath = jsonPath;
                this._uiWidget = mo.uiReader.genWidget(this._jsonPath);
                this.addChild(this._uiWidget);
                this.setSize(this._uiWidget.getSize());
            }
        };
        /**
         * 获取cell的index
         * @returns {number}
         */
        __egretProto__.getIdx = function () {
            return this._idx;
        };
        /**
         * 设置cell的index
         * @param {number} idx
         */
        __egretProto__.setIdx = function (idx) {
            this._idx = idx;
        };
        /**
         * 获取cell所在的列数
         * @returns {number}
         */
        __egretProto__.getRow = function () {
            return this._row;
        };
        /**
         * 设置cell所在的列数
         * @param {number} row
         */
        __egretProto__.setRow = function (row) {
            this._row = row;
        };
        /**
         * 重置这个cell
         */
        __egretProto__.reset = function () {
            this._idx = -1;
            this._row = -1;
        };
        /**
         * 设置cellSize大小
         * @param {number} cellSize
         */
        __egretProto__.setCellSize = function (cellSize) {
            if (this._uiWidget) {
                //居中
                this._uiWidget.x = (cellSize.width - this._uiWidget.width) / 2;
                this._uiWidget.y = (cellSize.height - this._uiWidget.height) / 2;
            }
            this._cellSize = cellSize;
        };
        /**
         * 获取cellSize
         */
        __egretProto__.getCellSize = function () {
            return this._cellSize;
        };
        GridViewCell.__className = "GridViewCell";
        return GridViewCell;
    })(mo.UIPanel);
    mo.GridViewCell = GridViewCell;
    GridViewCell.prototype.__class__ = "mo.GridViewCell";
})(mo || (mo = {}));

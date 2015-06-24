/**
 * 该controller主要是设计为方便有一个widget里面包含了一个GridScrollView。
 * @type {*|Function}
 */
var uw;
(function (uw) {
    var GridScrollCtrl = (function (_super) {
        __extends(GridScrollCtrl, _super);
        function GridScrollCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GridScrollCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._cols = 1;
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self._viewContainer = self.widget.getWidgetByName(self._viewContainerName);
            self._viewSize = self._viewSize || self._viewContainer.getSize(); //如果没有设置_viewSize，则自动取容器的size。
            if (!self._cellSize && self._cellClass) {
                var cell = self._cellClass.create();
                self._cellSize = cell._uiWidget.getSize();
            }
            var gridScrollView = self._gridScrollView = mo.GridScrollView.create(self._viewSize, self._cellSize, self._cols, 0, self._onCellDataSource, self, self._cellClass);
            self._viewContainer.addChild(gridScrollView);
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            if (self._gridScrollView) {
                self._gridScrollView.doDtor();
                self._gridScrollView = null;
            }
        };
        __egretProto__._onCellDataSource = function (cell, index) {
            var data = this._itemList[index];
            if (!cell.listenersInited) {
                this._initCellListeners(cell);
                cell.listenersInited = true;
            }
            cell.resetByData(data);
        };
        __egretProto__.resetByData = function (data) {
            uw.warn("请重写这个接口，为GridScrollCtrl设置[_itemList]字段！");
        };
        __egretProto__.setTotalCount = function () {
            this._gridScrollView.setTotalCount(this._itemList.length);
        };
        __egretProto__._initCellListeners = function (cell) {
            //子类在此实现cell的监听事件设置
        };
        GridScrollCtrl.__className = "GridScrollCtrl";
        return GridScrollCtrl;
    })(mo.WidgetCtrl);
    uw.GridScrollCtrl = GridScrollCtrl;
    GridScrollCtrl.prototype.__class__ = "uw.GridScrollCtrl";
})(uw || (uw = {}));

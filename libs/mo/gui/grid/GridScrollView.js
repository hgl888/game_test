var mo;
(function (mo) {
    var GridScrollView = (function (_super) {
        __extends(GridScrollView, _super);
        function GridScrollView() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GridScrollView.prototype;
        //@override
        __egretProto__._initProp = function () {
            var self = this;
            _super.prototype._initProp.call(this);
            self._cols = 0;
            self._totalCount = 0;
        };
        __egretProto__.init = function (viewSize, cellSize, cols, totalCount, selector, target, cellClass) {
            _super.prototype.init.apply(this, arguments);
            this.setTouchEnabled(true);
            this.setDirection(mo.ScrollViewDir.vertical);
            this.setBounceEnabled(true);
            this._viewSize = viewSize;
            this._cellSize = cellSize;
            this._totalCount = totalCount;
            this._cols = cols;
            this._gridView = mo.GridView.create(cellSize, cols, totalCount, selector, target, cellClass);
            this._gridView.setDelegate(this);
            this.addChild(this._gridView);
            this.reSize(this._viewSize);
            this.addEventListenerScrollView(this._onScrolling, this);
        };
        __egretProto__.reSize = function (size) {
            this._viewSize = size;
            this.setSize(this._viewSize);
            this._resetSize();
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            this._gridView.doDtor();
        };
        __egretProto__.onScroll = function (selector, target) {
            this._customEventSelector = selector;
            this._customEventListener = target;
        };
        __egretProto__._resetSize = function () {
            var rows = Math.ceil(this._totalCount / this._cols);
            var viewSize = this._viewSize;
            var cellSize = this._cellSize;
            var newWidth = cellSize.width * this._cols, newHeight = cellSize.height * rows;
            var newInnerWidth = newWidth < viewSize.width ? viewSize.width : newWidth;
            var newInnerHeight = newHeight < viewSize.height ? viewSize.height : newHeight;
            this.setInnerContainerSize(mo.size(newInnerWidth, newInnerHeight));
            this._gridView.setMinSize(mo.size(newInnerWidth, newInnerHeight));
        };
        /**
         *  更新内部gridview
         */
        __egretProto__.refresh = function () {
            this._gridView.needUpdateCells();
        };
        /**
         * 刷新gridview可以见cell的数据
         */
        __egretProto__.refreshData = function () {
            this._gridView.updateCellUsedData();
        };
        __egretProto__._onScrolling = function (sender, event) {
            this._gridView.needUpdateCells();
            if (this._customEventListener && this._customEventSelector) {
                this._customEventSelector.call(this._customEventListener, sender, event);
            }
        };
        __egretProto__.setScrollViewTouchEnabled = function (isTouch) {
            this.setTouchEnabled(isTouch);
            this._gridView.setTouchEnabled(isTouch);
        };
        __egretProto__.ignoreNullCell = function (ignore) {
            this._gridView.ignoreNullCell(ignore);
        };
        __egretProto__.setTotalCount = function (totalCount) {
            this.removeAllFromUsed(); //进行回收操作
            this._totalCount = totalCount;
            this._gridView.setTotalCount(totalCount);
            this._resetSize();
        };
        __egretProto__.getTotalCount = function () {
            return this._totalCount;
        };
        __egretProto__.removeAllFromUsed = function () {
            this._gridView.removeAllFromUsed();
        };
        //移除一个cell并刷新数据
        __egretProto__.dropOneCell = function () {
            this._gridView.dropOneCell();
        };
        /**
         * 通过index获取一个cell
         * @param {Number} idx
         * @returns {*}
         */
        __egretProto__.cellAtIndex = function (idx) {
            return this._gridView.cellAtIndex(idx);
        };
        __egretProto__.getCells = function () {
            return this._gridView.getCells();
        };
        __egretProto__.scrollToItem = function (idx) {
            var self = this;
            var cols = self._cols;
            var visualRowCount = 0 | (self._viewSize.height / self._cellSize.height);
            var totalRow = Math.ceil(self._totalCount / cols);
            var row = Math.ceil(idx / cols);
            if (row >= visualRowCount) {
                self.jumpToPercentVertical((row - (visualRowCount - 1)) / (totalRow - visualRowCount) * 100);
            }
            else {
                self.jumpToPercentVertical(0);
            }
            self.refresh();
        };
        GridScrollView.__className = "GridScrollView";
        return GridScrollView;
    })(mo.UIScrollView);
    mo.GridScrollView = GridScrollView;
    GridScrollView.prototype.__class__ = "mo.GridScrollView";
})(mo || (mo = {}));

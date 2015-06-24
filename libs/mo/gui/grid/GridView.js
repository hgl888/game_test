var mo;
(function (mo) {
    var GridView = (function (_super) {
        __extends(GridView, _super);
        function GridView() {
            _super.apply(this, arguments);
            this._ignoreNullCell = true;
            this._isCellsDirty = false;
            this._isNeedUpdateCells = false;
        }
        var __egretProto__ = GridView.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._indices = {};
            this._cellsUsed = [];
            this._cellsFreed = [];
            this._positions = [];
            this._minSize = mo.size(0, 0);
            this._cellsCountPerPage = 0;
            this._curPageNum = 0;
            this._columns = 0;
            this._rows = 0;
            this._dataLength = 0;
            this._ignoreNullCell = true;
            this._isCellsDirty = false;
            this._isNeedUpdateCells = false;
            this._autoCalRows = false;
        };
        /**
         *
         * @param cellSize
         * @param col
         * @param dataLength
         * @param selector
         * @param target
         * @param cellClass
         * @param {Boolean | Number} autoCalRows 传布尔值表示是否通过dataLength/col自动计算行数
         */
        __egretProto__.init = function (cellSize, col, dataLength, selector, target, cellClass, autoCalRows) {
            _super.prototype.init.apply(this, arguments);
            autoCalRows = autoCalRows || true;
            if (typeof autoCalRows === "boolean") {
                this._autoCalRows = autoCalRows;
            }
            if (typeof autoCalRows === "number") {
                this._autoCalRows = false;
                this._rows = autoCalRows;
            }
            if (this._autoCalRows === true) {
                this._rows = Math.ceil(dataLength / col);
            }
            this._dataLength = dataLength || 0;
            if (dataLength != 0) {
                this.setCellsDirty(true);
            }
            this._cellClass = cellClass || mo.GridViewCell;
            this._columns = col;
            this._cellsSize = cellSize;
            this._cellsCountPerPage = this._rows * col;
            this.addEventListenerGridView(selector, target);
            this._resetSize();
        };
        /**
         * 重设grid的数量
         * @param {Number} dataLength
         */
        __egretProto__.setTotalCount = function (dataLength) {
            this._dataLength = dataLength;
            if (this._autoCalRows) {
                this._rows = Math.ceil(dataLength / this._columns);
            }
            this._cellsCountPerPage = this._rows * this._columns;
            this._resetSize();
            this.setCellsDirty(true);
        };
        __egretProto__.getTotalCount = function () {
            return this._dataLength;
        };
        /**
         * 移除时候销毁对象
         */
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            var cell, cellsFreed = self._cellsFreed, cellsUsed = self._cellsUsed;
            while (cellsFreed.length) {
                cell = cellsFreed.pop();
                cell.doDtor();
            }
            while (cellsUsed.length) {
                cell = cellsUsed.pop();
                cell.doDtor();
            }
        };
        /**
         * 设置控制gridview的对象
         */
        __egretProto__.setDelegate = function (target) {
            this._gridViewDelegate = target;
        };
        __egretProto__.setMinSize = function (size) {
            this._minSize.width = size.width;
            this._minSize.height = size.height;
            this._resetSize();
            this.setCellsDirty(true);
        };
        __egretProto__._resetSize = function () {
            var cellsWidth = this._columns * this._cellsSize.width, cellsHeight = this._rows * this._cellsSize.height;
            var minSize = this._minSize;
            var width = cellsWidth > minSize.width ? cellsWidth : minSize.width;
            var height = cellsHeight > minSize.height ? cellsHeight : minSize.height;
            this.setSize(mo.size(width, height));
        };
        __egretProto__.setCellsDirty = function (isDirty) {
            this._isCellsDirty = isDirty;
            if (isDirty)
                this._dirty = true;
        };
        /**
         * 滚动的回调
         */
        __egretProto__.needUpdateCells = function () {
            this._isNeedUpdateCells = true;
            this._dirty = true;
        };
        /**
         * 设置绑定数据的callback
         * @param selector
         * @param target
         */
        __egretProto__.addEventListenerGridView = function (selector, target) {
            this._dataSourceAdapterSelector = selector;
            this._dataSourceAdapterTarget = target;
        };
        __egretProto__._executeDataAdapterCallback = function (convertCell, idx) {
            if (this._dataSourceAdapterSelector && this._dataSourceAdapterTarget) {
                return this._dataSourceAdapterSelector.call(this._dataSourceAdapterTarget, convertCell, idx, this);
            }
        };
        /**
         * 设置cell的数量
         * @param {Number} cellsCountPerPage
         */
        __egretProto__.setCountOfCellPerPage = function (cellsCountPerPage) {
            this._cellsCountPerPage = cellsCountPerPage;
        };
        /**
         * 获取cell的数量
         * @returns {number}
         */
        __egretProto__.getCountOfCellPerPage = function () {
            return this._cellsCountPerPage;
        };
        /**
         * 设置cell的尺寸
         * @param {mo.Size} cellsSize
         */
        __egretProto__.setSizeOfCell = function (cellsSize) {
            this._cellsSize = cellsSize;
            this._resetSize();
            this.setCellsDirty(true);
        };
        /**
         * 获取cell的尺寸
         * @returns {mo.Size}
         */
        __egretProto__.getSizeOfCell = function () {
            return this._cellsSize;
        };
        /**
         * 设置列数
         * @param {Number} columns
         */
        __egretProto__.setColumns = function (columns) {
            this._columns = columns;
            this._resetSize();
            this.setCellsDirty(true);
        };
        /**
         * 获取列数
         * @returns {number}
         */
        __egretProto__.getColumns = function () {
            return this._columns;
        };
        /**
         * 设置行数
         * @param {Number} rows
         */
        __egretProto__.setRows = function (rows) {
            this._rows = rows;
            this._resetSize();
            this.setCellsDirty(true);
        };
        /**
         * 获取行数
         * @returns {number}
         */
        __egretProto__.getRows = function () {
            return this._rows;
        };
        /**
         * 设置当前是位于第几页（用于GridPageView里）
         * @param {Number} num
         */
        __egretProto__.setCurPage = function (num) {
            this._curPageNum = num;
        };
        /**
         * 获取当前是位于第几页
         * @returns {number}
         */
        __egretProto__.getCurPage = function () {
            return this._curPageNum;
        };
        /**
         * 获取所有的cell
         * @returns {Array}
         */
        __egretProto__.getCells = function () {
            return this._cellsUsed.concat([]);
        };
        /**
         * 通过index获取一个cell
         * @param {Number} idx
         * @returns {*}
         */
        __egretProto__.cellAtIndex = function (idx) {
            var obj;
            for (var i = 0; i < this._cellsUsed.length; i++) {
                obj = this._cellsUsed[i];
                if (obj.getIdx() == idx) {
                    return obj;
                }
            }
        };
        __egretProto__._dequeueCell = function () {
            return this._cellsFreed.shift();
        };
        /**
         * 重载数据
         */
        __egretProto__.reloadData = function () {
            //        mo.assert(this._cellsSize.width != 0 && this._cellsSize.height != 0, "_cellsSize width and height could not be 0");
            //        mo.assert(this._columns != 0 || this._rows != 0, "_columns or _rows could not be 0");
            this._indices = {};
            this._positions.length = 0;
            this.removeAllFromUsed();
            this.updatePositions();
            this.updateData();
        };
        /**
         * 更新数据
         */
        __egretProto__.updateData = function () {
            var target = this._gridViewDelegate;
            if (target) {
                var targetSize = target.getSize();
                var targetInner = target.getInnerContainer();
                var targetInnerPos = targetInner.getPosition(), targetInnerSize = targetInner.getSize();
                var x = targetInnerPos.x, y = targetInnerPos.y;
                if (targetInnerPos.y > 0) {
                    y = 0;
                }
                else if (targetInnerPos.y <= targetSize.height - targetInnerSize.height) {
                    y = targetSize.height - targetInnerSize.height;
                }
                if (targetInnerPos.x > 0) {
                    x = 0;
                }
                else if (targetInnerPos.x <= targetSize.width - targetInnerSize.width) {
                    x = targetSize.width - targetInnerSize.width;
                }
                var offset = mo.p(x, y);
            }
            else {
                offset = null;
            }
            var beginRow = !offset ? 0 : this._cellBeginRowFromOffset(offset, targetSize, targetInnerSize), endRow = !offset ? this._rows : this._cellEndRowFromOffset(offset, targetSize, targetInnerSize), beginColumn = !offset ? 0 : this._cellBeginColumnFromOffset(offset, targetSize), endColumn = !offset ? this._columns : this._cellEndColumnFromOffset(offset, targetSize);
            var cellsUsed = this._cellsUsed;
            if (cellsUsed.length > 0) {
                var cell, row, column, idx;
                for (var i = 0; i < cellsUsed.length;) {
                    cell = cellsUsed[i], row = cell.getRow(), idx = cell.getIdx();
                    column = idx % this._columns;
                    if (row < beginRow || (row > endRow && row < this._rows) || column < beginColumn || (column > endColumn && column < this._columns)) {
                        cell.reset();
                        cell.removeFromParent(true);
                        cellsUsed.splice(i, 1);
                        this._indices[idx] = false;
                        this._cellsFreed.push(cell);
                    }
                    else {
                        i++;
                    }
                }
            }
            var maxIdx = this._cellsCountPerPage * (this._curPageNum + 1);
            for (var i = beginRow; i <= endRow && i < this._rows; ++i) {
                var cellRowIndex = this._cellFirstIndexFromRow(i), cellBeginIndex = cellRowIndex + beginColumn, cellEndIndex = cellRowIndex + endColumn;
                for (var idx = cellBeginIndex; idx < cellEndIndex && idx < maxIdx; ++idx) {
                    if (!this._indices[idx]) {
                        this.updateCellAtIndex(idx, i);
                    }
                }
            }
        };
        /**
         * 移除所有在使用的cell
         */
        __egretProto__.removeAllFromUsed = function () {
            if (this._cellsUsed.length != 0) {
                var len = this._cellsUsed.length;
                for (var i = 0; i < len; i++) {
                    var obj = this._cellsUsed.pop();
                    obj.reset();
                    this._cellsFreed.push(obj);
                    this.removeChild(obj);
                }
                this._indices = {};
            }
        };
        /**
         * 移动所有没用的cell
         */
        __egretProto__.removeAllFromFreed = function () {
            if (this._cellsFreed.length != 0) {
                var len = this._cellsFreed.length;
                for (var i = 0; i < len; i++) {
                    var obj = this._cellsFreed.pop();
                }
                this._indices = {};
            }
        };
        /**
         * 更新cell的位置
         */
        __egretProto__.updatePositions = function () {
            if (this._cellsCountPerPage == 0)
                return;
            var x = this._cellsSize.width / 2, y = this._cellsSize.height / 2;
            for (var i = 0; i < this._cellsCountPerPage; ++i) {
                if (i != 0 && i % this._columns == 0) {
                    x = this._cellsSize.width / 2;
                    y = y + this._cellsSize.height;
                }
                this._positions.push(mo.p(x, y));
                x += this._cellsSize.width;
            }
        };
        /**
         * 更新某个位置的cell
         * @param {Number} idx
         * @param {Number} row
         */
        __egretProto__.updateCellAtIndex = function (idx, row) {
            if (this._cellsCountPerPage == 0)
                return;
            // 真实需要的数量
            var realNeedCellCount = this._dataLength + this._cellsCountPerPage * this._curPageNum;
            if (this._ignoreNullCell && idx >= realNeedCellCount) {
                return;
            }
            var cell = this._dequeueCell();
            if (!cell) {
                cell = this._cellClass.create();
                cell.isAutoDtor = false;
            }
            cell.setIdx(idx);
            cell.setRow(row);
            cell.setSize(this._cellsSize);
            cell.setCellSize(this._cellsSize);
            cell.setPosition(this.cellPositionFromIndex(idx));
            this._executeDataAdapterCallback(cell, idx);
            this.addChild(cell);
            this.insertCellAtIndex(cell, idx);
            this._indices[idx] = true;
        };
        /**
         * 根据index获取cell设置的位置
         * @param {Number} idx
         * @returns {*}
         */
        __egretProto__.cellPositionFromIndex = function (idx) {
            if (idx == -1) {
                idx = 0;
            }
            var newIndex = idx - this._cellsCountPerPage * this._curPageNum;
            return this._positions[newIndex];
        };
        /**
         * 某个位置插入一个cell
         * @param {Object} cell
         * @param {Number} idx
         */
        __egretProto__.insertCellAtIndex = function (cell, idx) {
            if (this._cellsUsed.length == 0) {
                this._cellsUsed.push(cell);
            }
            else {
                var obj, i;
                for (i = 0; i < this._cellsUsed.length; i++) {
                    obj = this._cellsUsed[i];
                    if (obj.getIdx() > idx) {
                        this._cellsUsed.splice(i, 0, cell);
                        return;
                    }
                }
                this._cellsUsed.push(cell);
            }
        };
        __egretProto__._cellBeginRowFromOffset = function (offset, targetSize, targetInnerSize) {
            var ofy = Math.abs(offset.y), row = 0 | (ofy / this._cellsSize.height);
            return Math.min(this._rows - 1, Math.max(row, 0));
        };
        __egretProto__._cellEndRowFromOffset = function (offset, targetSize, targetInnerSize) {
            var ofy = Math.abs(offset.y) + targetSize.height, row = 0 | (ofy / this._cellsSize.height);
            return Math.min(this._rows - 1, Math.max(row, 0));
        };
        __egretProto__._cellBeginColumnFromOffset = function (offset, targetSize) {
            var column = 0 | Math.abs(offset.x / this._cellsSize.width);
            return column;
        };
        __egretProto__._cellEndColumnFromOffset = function (offset, targetSize) {
            var ofx = Math.abs(offset.x) + targetSize.width, column = Math.ceil(ofx / this._cellsSize.width);
            return column;
        };
        __egretProto__._cellFirstIndexFromRow = function (row) {
            return this._columns * row + this._cellsCountPerPage * this._curPageNum;
        };
        __egretProto__.ignoreNullCell = function (ignore) {
            this._ignoreNullCell = ignore;
        };
        //更新当前使用的cell的数据
        __egretProto__.updateCellUsedData = function () {
            var self = this, cell;
            for (var i = 0, li = self._cellsUsed.length; i < li; i++) {
                cell = self._cellsUsed[i];
                self._executeDataAdapterCallback(cell, cell.getIdx());
            }
        };
        //移除一个cell并刷新数据
        __egretProto__.dropOneCell = function () {
            var self = this;
            if (self._cellsUsed.length <= 0)
                return;
            self._dataLength -= 1;
            var cell = self._cellsUsed.pop();
            self._cellsFreed.push(cell);
            self._indices[cell.getIdx()] = false;
            for (var i = 0, li = self._cellsUsed.length; i < li; i++) {
                cell = self._cellsUsed[i];
                self._executeDataAdapterCallback(cell, cell.getIdx());
            }
        };
        //@override
        __egretProto__._onBeforeVisit = function () {
            var self = this;
            _super.prototype._onBeforeVisit.call(this);
            if (self._isCellsDirty)
                self.reloadData();
            else if (self._isNeedUpdateCells)
                self.updateData();
        };
        //@override
        __egretProto__._onAfterVisit = function () {
            var self = this;
            _super.prototype._onAfterVisit.call(this);
            self._isCellsDirty = false;
            self._isNeedUpdateCells = false;
        };
        GridView.__className = "GridView";
        return GridView;
    })(mo.UIPanel);
    mo.GridView = GridView;
    GridView.prototype.__class__ = "mo.GridView";
})(mo || (mo = {}));

var mo;
(function (mo) {
    var _GridViewOption = (function (_super) {
        __extends(_GridViewOption, _super);
        function _GridViewOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _GridViewOption.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.cellSize = mo.size(0, 0);
            self.shownMap = {};
            self.recycleList = [];
            self.cols = 1;
            self.rowNumPerView = 1;
            self.dataList = [];
            self.viewRect = mo.rect(0, 0, 1, 1);
            self.shownBeginPoint = mo.p(0, 0);
            self.shownEndPoint = mo.p(0, 0);
            self.hiddenBeginPoint = mo.p(0, 0);
            self.hiddenEndPoint = mo.p(0, 0);
            self.curCellBeginRow = 0;
            self.curCellBeginCol = 0;
            self.curCellEndRow = -1;
            self.curCellEndCol = -1;
        };
        //@override
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            self.listenerIniter = null;
            self.listenerIniterCtx = null;
            self.dataList.length = 0;
            self.recycleList.length = 0;
            var map = self.shownMap;
            for (var key in map) {
                delete map[key];
            }
        };
        return _GridViewOption;
    })(mo.Option);
    mo._GridViewOption = _GridViewOption;
    _GridViewOption.prototype.__class__ = "mo._GridViewOption";
    var UIGridView = (function (_super) {
        __extends(UIGridView, _super);
        function UIGridView() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIGridView.prototype;
        __egretProto__.getCols = function () {
            return this._gridViewOption.cols;
        };
        __egretProto__.setCellClass = function (cellClass) {
            var self = this, gridViewOption = self._gridViewOption;
            gridViewOption.cellClass = cellClass;
            var cell = cellClass.create();
            var cellSize = gridViewOption.cellSize;
            cellSize.width = cell.width;
            cellSize.height = cell.height;
            gridViewOption.cols = Math.floor(self.width / cellSize.width);
            self.addChild(cell);
            cell._setVisible(false);
            cell.reset();
            gridViewOption.recycleList.push(cell); //进行回收
            gridViewOption.rowNumPerView = Math.ceil(gridViewOption.viewRect.height / cellSize.height); //一页最多可以显示几行;
        };
        __egretProto__.setViewSize = function (size, height) {
            var self = this, gridViewOption = self._gridViewOption;
            var cellSize = gridViewOption.cellSize;
            var viewRect = gridViewOption.viewRect;
            if (arguments.length == 1) {
                height = size.height;
                size = size.width;
            }
            viewRect.width = size;
            viewRect.height = height;
            var cellClass = gridViewOption.cellClass;
            if (cellClass) {
                gridViewOption.rowNumPerView = Math.ceil(height / cellSize.height); //一页最多可以显示几行;
            }
        };
        __egretProto__.resetStates = function () {
            var self = this, gridViewOption = self._gridViewOption;
            var cellSize = gridViewOption.cellSize;
            var cellHeight = cellSize.height;
            var viewRect = gridViewOption.viewRect;
            var cols = gridViewOption.cols = Math.floor(self.width / cellSize.width);
            gridViewOption.rowNumPerView = Math.ceil(viewRect.height / cellHeight); //一页最多可以显示几行;
            self._setHeight(cellHeight * Math.ceil(gridViewOption.dataList.length / cols));
            var shownMap = gridViewOption.shownMap;
            var recycleList = gridViewOption.recycleList;
            for (var key in shownMap) {
                var cell = shownMap[key];
                delete shownMap[key];
                if (cell) {
                    cell._setVisible(false);
                    cell.reset();
                    recycleList.push(cell);
                }
            }
            gridViewOption.curCellBeginRow = 0;
            gridViewOption.curCellBeginCol = 0;
            gridViewOption.curCellEndRow = -1;
            gridViewOption.curCellEndCol = -1;
            //TODO 下面的模式今后需要重新优化
            var scrollView = gridViewOption.scrollView;
            if (scrollView) {
                scrollView.setInnerContainerSize(self.getSize());
            }
        };
        __egretProto__.registerListenerIniter = function (listenerIniter, listenerIniterCtx) {
            var gridViewOption = this._gridViewOption;
            gridViewOption.listenerIniter = listenerIniter;
            gridViewOption.listenerIniterCtx = listenerIniterCtx;
        };
        __egretProto__.load = function (dataList) {
            var self = this, gridViewOption = self._gridViewOption;
            var cellClass = gridViewOption.cellClass;
            if (!cellClass) {
                return mo.warn("请先设置cellClass!");
            }
            gridViewOption.dataList = dataList;
            self.resetStates();
            self.refresh(0, 0);
        };
        __egretProto__.reload = function () {
            var self = this, gridViewOption = self._gridViewOption;
            self.resetStates();
            var viewRect = gridViewOption.viewRect;
            self.refresh(viewRect.x, viewRect.y);
        };
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._gridViewOption = new _GridViewOption();
        };
        __egretProto__.addToScrollView = function (scrollView) {
            var self = this, gridViewOption = self._gridViewOption;
            self._setWidth(scrollView.width);
            self.setViewSize(scrollView.width, scrollView.height);
            gridViewOption.scrollView = scrollView; //在scrollView内部
            scrollView.addChild(self);
            self.resetStates();
            self.refresh(0, 0);
            scrollView.addEventListenerScrollView(function (scrollView, type) {
                var scrollOption = scrollView._scrollOption;
                var ic = scrollOption.innerContainer;
                var scrollDir = scrollOption.scrollDir;
                var vx = -ic.x, vy = -ic.y;
                if (type == 4) {
                    var shownBeginPoint = gridViewOption.shownBeginPoint;
                    var shownEndPoint = gridViewOption.shownEndPoint;
                    var hiddenBeginPoint = gridViewOption.hiddenBeginPoint;
                    var hiddenEndPoint = gridViewOption.hiddenEndPoint;
                    var viewRect = gridViewOption.viewRect;
                    var vw = viewRect.width, vh = viewRect.height;
                    var scdy = scrollDir.y, scdx = scrollDir.x;
                    var flag = false;
                    if (scdy != 0 && scdx != 0) {
                        if (hiddenBeginPoint.y <= vy || hiddenEndPoint.y >= vy + vh || shownBeginPoint.y > vy || shownEndPoint.y < vy + vh || hiddenBeginPoint.x <= vx || hiddenEndPoint.x >= vx + vw || shownBeginPoint.x > vx || shownEndPoint.x < vx + vw) {
                            flag = true;
                        }
                    }
                    else if (scdy != 0) {
                        if (hiddenBeginPoint.y <= vy || hiddenEndPoint.y >= vy + vh || shownBeginPoint.y > vy || shownEndPoint.y < vy + vh) {
                            flag = true;
                        }
                    }
                    else if (scdx != 0) {
                        if (hiddenBeginPoint.x <= vx || hiddenEndPoint.x >= vx + vw || shownBeginPoint.x > vx || shownEndPoint.x < vx + vw) {
                            flag = true;
                        }
                    }
                    if (flag) {
                        //debug(vx, vy, shownBeginPoint, shownEndPoint, hiddenBeginPoint, hiddenEndPoint);
                        self.refresh(vx, vy);
                    }
                }
            }, self);
        };
        __egretProto__.refresh = function (vx, vy) {
            var self = this, gridViewOption = self._gridViewOption;
            var cellSize = gridViewOption.cellSize, cellW = cellSize.width, cellH = cellSize.height;
            var viewRect = gridViewOption.viewRect;
            var vw = viewRect.width, vh = viewRect.height;
            var curCellBeginRow = gridViewOption.curCellBeginRow;
            var curCellBeginCol = gridViewOption.curCellBeginCol;
            var curCellEndRow = gridViewOption.curCellEndRow;
            var curCellEndCol = gridViewOption.curCellEndCol;
            var cellBeginRow = Math.floor(vy / cellH);
            var cellBeginCol = Math.floor(vx / cellW);
            var cellEndRow = Math.ceil((vy + vh) / cellH) - 1;
            var cellEndCol = Math.ceil((vx + vw) / cellW) - 1;
            var shownMap = gridViewOption.shownMap;
            var recycleList = gridViewOption.recycleList;
            var cols = gridViewOption.cols;
            var dataList = gridViewOption.dataList;
            var cellClass = gridViewOption.cellClass;
            //重新刷新区域数值
            //重置视图区域
            viewRect.x = vx;
            viewRect.y = vy;
            var shownBeginPoint = gridViewOption.shownBeginPoint;
            var shownEndPoint = gridViewOption.shownEndPoint;
            var hiddenBeginPoint = gridViewOption.hiddenBeginPoint;
            var hiddenEndPoint = gridViewOption.hiddenEndPoint;
            //debug("shownBeginPoint--->", shownBeginPoint.x, shownBeginPoint.y);
            //debug("shownEndPoint--->", shownEndPoint.x, shownEndPoint.y);
            //debug("hiddenBeginPoint--->", hiddenBeginPoint.x, hiddenBeginPoint.y);
            //debug("hiddenEndPoint--->", hiddenEndPoint.x, hiddenEndPoint.y);
            shownBeginPoint.x = (cellBeginCol) * cellW;
            shownBeginPoint.y = (cellBeginRow) * cellH;
            shownEndPoint.x = (cellEndCol + 1) * cellW;
            shownEndPoint.y = (cellEndRow + 1) * cellH;
            hiddenBeginPoint.x = (cellBeginCol + 1) * cellW;
            hiddenBeginPoint.y = (cellBeginRow + 1) * cellH;
            hiddenEndPoint.x = (cellEndCol) * cellW;
            hiddenEndPoint.y = (cellEndRow) * cellH;
            //debug("--------------");
            //debug("shownBeginPoint--->", shownBeginPoint.x, shownBeginPoint.y);
            //debug("shownEndPoint--->", shownEndPoint.x, shownEndPoint.y);
            //debug("hiddenBeginPoint--->", hiddenBeginPoint.x, hiddenBeginPoint.y);
            //debug("hiddenEndPoint--->", hiddenEndPoint.x, hiddenEndPoint.y);
            //让行、列都不超出边界
            var dataLength = dataList.length;
            var maxRowNum = Math.ceil(dataLength / cols); //最多几行
            cellBeginRow = Math.max(0, Math.min(maxRowNum - 1, cellBeginRow));
            cellBeginCol = Math.max(0, Math.min(cols - 1, cellBeginCol));
            cellEndRow = Math.max(0, Math.min(maxRowNum - 1, cellEndRow));
            cellEndCol = Math.max(0, Math.min(cols - 1, cellEndCol));
            //重新赋值成current
            gridViewOption.curCellBeginRow = cellBeginRow;
            gridViewOption.curCellBeginCol = cellBeginCol;
            gridViewOption.curCellEndRow = cellEndRow;
            gridViewOption.curCellEndCol = cellEndCol;
            for (var row = curCellBeginRow, l_row = curCellEndRow; row <= l_row; row++) {
                for (var col = curCellBeginCol, l_col = curCellEndCol; col <= l_col; ++col) {
                    if (cellBeginRow <= row && cellBeginCol <= col && cellEndRow >= row && cellEndCol >= col) {
                        continue;
                    }
                    //进行隐藏处理
                    var key = row + "-" + col;
                    var cell = shownMap[key];
                    delete shownMap[key]; //移除
                    if (cell) {
                        cell._setVisible(false);
                        cell.reset();
                        recycleList.push(cell); //进行回收
                    }
                }
            }
            var dataSourceAdapter = gridViewOption.dataSourceAdapter;
            var dataSourceAdapterCtx = gridViewOption.dataSourceAdapterCtx;
            for (var row = cellBeginRow, l_row = cellEndRow; row <= l_row; row++) {
                for (var col = cellBeginCol, l_col = cellEndCol; col <= l_col; ++col) {
                    if (curCellBeginRow <= row && curCellBeginCol <= col && curCellEndRow >= row && curCellEndCol >= col) {
                        continue;
                    }
                    //进行显示处理
                    var index = row * cols + col; //TODO 取数据的逻辑，可能根据今后gridView方向不同而不同，现在只做垂直方向
                    var data = dataList[index];
                    if (data || gridViewOption.emptyCellEnabled) {
                        var cell = recycleList.pop();
                        if (!cell) {
                            cell = cellClass.create();
                            self.addChild(cell);
                        }
                        var key = row + "-" + col;
                        shownMap[key] = cell;
                        cell._setVisible(true);
                        //计算位置，今后可能需要加自动均分等功能
                        cell._setX(col * cellW + cellW / 2);
                        cell._setY(row * cellH + cellH / 2);
                        var cellOption = cell._cellOption;
                        if (!cellOption.listenerInited) {
                            if (gridViewOption.listenerIniter) {
                                cell.registerListenerIniter(gridViewOption.listenerIniter, gridViewOption.listenerIniterCtx);
                            }
                            if (cellOption.listenerIniter)
                                cell.initListeners();
                        }
                        cell.resetByData(data);
                        //call dataSrc
                        if (dataSourceAdapter)
                            dataSourceAdapter.call(dataSourceAdapterCtx, cell);
                    }
                }
            }
        };
        UIGridView.__className = "UIGridView";
        return UIGridView;
    })(mo.UIPanel);
    mo.UIGridView = UIGridView;
    UIGridView.prototype.__class__ = "mo.UIGridView";
})(mo || (mo = {}));

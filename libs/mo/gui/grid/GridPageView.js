var mo;
(function (mo) {
    var GridPageView = (function (_super) {
        __extends(GridPageView, _super);
        function GridPageView() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GridPageView.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._useGridViews = [];
            self._freeGridViews = [];
            self._rows = 0;
            self._columns = 0;
            self._totalCellsCount = 0;
            self._initPageCount = 3;
            self._cellsCounts = 0;
            self._widthPerPage = 0;
            self._lastedPageNum = 0;
            self._pageIndexDistance = 10;
            self._totalCount = 0;
            self._maxPageIndexNum = 5;
        };
        /**
         *
         * @param viewSize 视窗尺寸
         * @param cellSize 格子尺寸
         * @param row 单页的列数
         * @param col 单页的横数
         * @param totalCount 所有格子的数量
         * @param selector
         * @param target
         * @param cellClass
         * @returns {mo.GridPageView}
         *
         * @example
         *
         var gridPageView = mo.GridPageView.create(
         size(240,160),size(24,16),
         10, 5,self._data.length, self.gridviewDataSource, self);
         gridPageView.setPageIndexEnabled(true);
         uiLayer.addWidget(gridPageView);

         gridviewDataSource(convertView, idx){
           var cell = convertView;
           var button;

           if(!cell){
               var str = self._data[idx];

               cell = new mo.GridViewCell();
               button = cc.LabelTTF.create(str, "Arial", 12);
               button.setAnchorPoint(0,0);
               button.setTag(1);
               cell.addNode(button);
           }
           else{
               button = cell.getChildByTag(1);
           }

           button.setString(idx);
           return cell;
      }
         */
        __egretProto__.init = function (viewSize, cellSize, row, col, totalCount, selector, target, cellClass) {
            _super.prototype.init.call(this);
            var self = this;
            self.setSize(viewSize);
            self._cellClass = cellClass;
            self._viewSize = viewSize;
            self._cellSize = cellSize;
            self._selector = selector;
            self._target = target;
            self._rows = row;
            self._columns = col;
            self._totalCount = totalCount;
            self._totalPageCount = Math.ceil(totalCount / (col * row));
            self._pageViewContainer = mo.UIPageView.create();
            self._pageViewContainer.setSize(viewSize);
            self._pageViewContainer.addEventListenerPageView(self._pageViewEvent, self);
            self.addChild(self._pageViewContainer);
            self.setTotalCount(totalCount);
        };
        __egretProto__.scrollToPage = function (idx) {
            this._pageViewContainer.scrollToPage(idx);
        };
        __egretProto__.getCurPageIndex = function () {
            return this._pageViewContainer.getCurPageIndex();
        };
        __egretProto__._resetSize = function () {
            var self = this;
            var rows = self._rows;
            var viewSize = self._viewSize;
            var cellSize = self._cellSize;
            var newWidth = cellSize.width * self._columns, newHeight = cellSize.height * rows;
            var newInnerWidth = newWidth < viewSize.width ? viewSize.width : newWidth;
            var newInnerHeight = newHeight < viewSize.height ? viewSize.height : newHeight;
            self.setSize(mo.size(newInnerWidth, newInnerHeight));
            for (var i = 0; i < self._useGridViews.length; i++) {
                self._useGridViews[i].setMinSize(mo.size(newInnerWidth, newInnerHeight));
            }
        };
        __egretProto__.getTotalCount = function () {
            return this._totalCount;
        };
        __egretProto__.setTotalCount = function (totalCount) {
            var self = this;
            self.removeAllFromUsed(); //进行回收操作
            var col = self._columns, row = self._rows;
            var gridView, width = self._viewSize.width;
            var totalCount = self._totalCount = totalCount;
            var totalPageCount = self._totalPageCount = Math.ceil(totalCount / (col * row));
            // 根据需要添加page
            var curPages = self._pageViewContainer.getPages();
            var curPageCount = curPages.length;
            var needAddPageCount = totalPageCount - curPageCount;
            for (var i = 0; i < needAddPageCount; i++) {
                var layout = this._pageViewContainer.createPage();
                layout.setPosition(width * i, 0);
                if (self._freeGridViews.length < this._initPageCount) {
                    gridView = mo.GridView.create(self._cellSize, col, 0, self._selector, self._target, self._cellClass, row);
                    gridView.setName("" + 9);
                    self._freeGridViews.push(gridView);
                }
                this._pageViewContainer.addPage(layout);
            }
            // 移除多余的
            var needReduce = curPageCount - totalPageCount;
            for (var i = 0; i < needReduce; i++) {
                curPageCount--;
                this._pageViewContainer.removePageAtIndex(curPages.length - 1);
                if (curPageCount < self._initPageCount) {
                    gridView = self._freeGridViews.pop();
                    gridView.doDtor();
                }
            }
            // 重新设置数据
            var totalPerPage = col * row;
            var restCount = totalCount;
            var pages = self._pageViewContainer.getPages();
            var freePageLength = self._freeGridViews.length;
            for (var i = 0; i < freePageLength; i++) {
                gridView = self._dequeueGridView();
                self._useGridViews.push(gridView);
                gridView.setCurPage(i);
                pages[i].addChild(gridView);
                gridView.setName("" + 9);
                if ((restCount - totalPerPage) >= 0) {
                    gridView.setTotalCount(totalPerPage);
                    restCount -= totalPerPage;
                }
                else {
                    gridView.setTotalCount(restCount);
                }
            }
            // 确定size
            self._resetSize();
            // 移动到合理的当前页
            var curPageIndex = self._pageViewContainer.getCurPageIndex();
            var rightRangeIndex = curPageCount - 1;
            rightRangeIndex = rightRangeIndex > 0 ? rightRangeIndex : 0;
            if (curPageIndex > rightRangeIndex) {
                self._pageViewContainer.scrollToPage(rightRangeIndex);
                self._pageViewContainer.update(10);
            }
            if (self._pageIndexEnabled) {
                self.getPageIndexContainer().setTotalPageNum(self._totalPageCount);
            }
        };
        __egretProto__.getDataCountByPageIndex = function (index) {
            var self = this;
            var col = self._columns, row = self._rows;
            var totalPerPage = col * row;
            var totalCount = self._totalCount;
            var rest = totalCount - totalPerPage * (index + 1);
            if (rest >= 0) {
                return totalPerPage;
            }
            else {
                return totalCount - totalPerPage * index;
            }
        };
        __egretProto__.removeAllFromUsed = function () {
            var self = this;
            var useViews = self._useGridViews, freeViews = self._freeGridViews, gv;
            while (useViews.length) {
                gv = useViews.pop();
                gv.removeAllFromUsed();
                gv.removeFromParent(true);
                freeViews.push(gv);
            }
        };
        __egretProto__.onPageChanged = function (cb, target) {
            var self = this;
            self._onPageChangedCb = cb;
            self._onPageChangedTarget = target;
        };
        /**
         * 更新某页的数据
         * @param index 页码 (0~n)
         */
        __egretProto__.updatePageByIndex = function (index) {
            var self = this;
            for (var i = 0, li = self._useGridViews.length; i < li; i++) {
                var gridView = self._useGridViews[i];
                if (gridView.getCurPage() == index) {
                    gridView.setTotalCount(self.getDataCountByPageIndex(index));
                    break;
                }
            }
        };
        __egretProto__._pageViewEvent = function () {
            var self = this;
            var _pageViewContainer = self.getPageViewContainer(), pages = _pageViewContainer.getPages();
            var curPageIndex = _pageViewContainer.getCurPageIndex(), prePage, nextPage, totalPageCount = self._totalPageCount;
            if (self._lastedPageNum == curPageIndex)
                return;
            var page, _gridView;
            for (var i = 0; i < pages.length; i++) {
                page = pages[i];
                if (i < curPageIndex - 1 || i > curPageIndex + 1) {
                    page.setVisible(false);
                    _gridView = page.getChildByTag(9);
                    self._reclaimGridView(_gridView);
                }
                else {
                    page.setVisible(true);
                }
            }
            prePage = curPageIndex !== 0 ? pages[curPageIndex - 1] : null;
            nextPage = curPageIndex !== totalPageCount ? pages[curPageIndex + 1] : null;
            if (self._lastedPageNum < curPageIndex && nextPage) {
                _gridView = self._dequeueGridView();
                if (_gridView) {
                    _gridView.setCurPage(curPageIndex + 1);
                    _gridView.setTotalCount(self.getDataCountByPageIndex(curPageIndex + 1));
                    nextPage.addChild(_gridView);
                    self._useGridViews.push(_gridView);
                }
            }
            else if (self._lastedPageNum > curPageIndex && prePage) {
                _gridView = self._dequeueGridView();
                if (_gridView) {
                    _gridView.setCurPage(curPageIndex - 1);
                    _gridView.setTotalCount(self.getDataCountByPageIndex(curPageIndex - 1));
                    prePage.addChild(_gridView);
                    self._useGridViews.push(_gridView);
                }
            }
            if (self._pageIndexContainer) {
                self._pageIndexContainer.setPageNum(curPageIndex + 1);
            }
            if (self._onPageChangedCb)
                self._onPageChangedCb.call(self._onPageChangedTarget, curPageIndex, self._lastedPageNum);
            self._lastedPageNum = curPageIndex;
        };
        __egretProto__._reclaimGridView = function (gridView) {
            if (gridView) {
                gridView.removeFromParent(true);
                gridView.removeAllFromUsed();
                this._freeGridViews.push(gridView);
                mo.ArrayRemoveObject(this._useGridViews, gridView);
            }
        };
        __egretProto__._dequeueGridView = function () {
            return this._freeGridViews.pop();
        };
        __egretProto__.setPageViewTouchEnabled = function (isTouch) {
            var self = this;
            self._pageViewContainer.setTouchEnabled(isTouch);
        };
        /**
         * 获取pageViewContainer
         * @returns {mo.UIPageView}
         */
        __egretProto__.getPageViewContainer = function () {
            var self = this;
            return self._pageViewContainer;
        };
        __egretProto__.getPagesCount = function () {
            return this._pageViewContainer.getPages().length;
        };
        /**
         * 获取pageIndex
         * @returns {mo.GridPageIndex}
         */
        __egretProto__.getPageIndexContainer = function () {
            var self = this, clazz = self.__class;
            if (!self._pageIndexEnabled)
                return;
            if (!self._pageIndexContainer) {
                var size = self._pageViewContainer.getSize();
                self._pageIndexContainer = mo.GridPageIndex.create();
                self._pageIndexContainer.setMaxPageIndexNum(self._maxPageIndexNum);
                self._pageIndexContainer.loadTextures(clazz.IMG_PAGE_ON, clazz.IMG_PAGE_OFF);
                self._pageIndexContainer.setPosition(size.width / 2, self.height);
                self._pageIndexContainer.setTotalPageNum(self._totalPageCount);
            }
            return self._pageIndexContainer;
        };
        /**
         * 启动pageIndex
         * @param {Boolean} enable
         */
        __egretProto__.setPageIndexEnabled = function (enable) {
            var self = this;
            if (self._pageIndexEnabled == enable)
                return;
            if (self._pageIndexEnabled && !enable) {
                self._pageIndexContainer.removeFromParent();
                self._pageIndexContainer = null;
            }
            self._pageIndexEnabled = enable;
            if (enable) {
                var pageIndex = self.getPageIndexContainer();
                self.addChild(pageIndex);
            }
        };
        /**
         * 设置pageIndex和pageView的距离
         * @param {Number} distance
         */
        __egretProto__.setPageIndexDistance = function (distance) {
            var self = this;
            self._pageIndexDistance = distance;
            if (self._pageIndexContainer) {
                self._pageIndexContainer.setPositionY(-self._pageIndexDistance);
            }
        };
        /**
         * 获取pageIndex和pageView的距离
         * @returns {number}
         */
        __egretProto__.getPageIndexDistance = function () {
            var self = this;
            return self._pageIndexDistance;
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            var useGridViews = self._useGridViews, freeGridViews = self._freeGridViews, view;
            while (useGridViews.length > 0) {
                view = useGridViews.pop();
                view.doDtor();
            }
            self._useGridViews = [];
            while (freeGridViews.length > 0) {
                view = freeGridViews.pop();
                view.doDtor();
            }
            self._freeGridViews = [];
        };
        GridPageView.__className = "GridPageView";
        return GridPageView;
    })(mo.UIPanel);
    mo.GridPageView = GridPageView;
    GridPageView.prototype.__class__ = "mo.GridPageView";
})(mo || (mo = {}));

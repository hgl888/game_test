var mo;
(function (mo) {
    var PageViewController = (function (_super) {
        __extends(PageViewController, _super);
        function PageViewController() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = PageViewController.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._initPageCount = 3;
        };
        __egretProto__.init = function (container) {
            var self = this;
            _super.prototype.init.call(this);
            if (!container) {
                throw "请先指定container！";
            }
            else if (container instanceof mo.UIPageView) {
                self._pageViewContainer = container;
            }
            else if (container instanceof mo.UIPanel) {
                var viewSize = container.getSize();
                self._pageViewContainer = mo.UIPageView.create();
                self._pageViewContainer.setSize(viewSize);
                container.addChild(self._pageViewContainer);
            }
            self._pageViewContainer.addEventListenerPageView(self._pageViewEvent, self);
        };
        __egretProto__.setTouchEnabled = function (enable) {
            var self = this;
            self._pageViewContainer.setTouchEnabled(enable);
        };
        __egretProto__._createItemWidget = function () {
            var widget = mo.uiReader.genWidget(this._itemJsonPath);
            var layout = this._pageViewContainer.createPage();
            layout.addChild(widget);
            this._addPage(layout);
            return layout;
        };
        __egretProto__.setItemJsonPath = function (itemJsonPath) {
            this._itemJsonPath = itemJsonPath;
        };
        __egretProto__._resetItemByData = function (widget, data, index) {
            mo.warn("子类通过重写这个接口来设置项");
        };
        /**
         * 通过此接口进行视图的重置
         * @param {Object || Array} data
         */
        __egretProto__.resetByData = function (data) {
            var dataArr;
            if (typeof data == "object") {
                dataArr = [];
                for (var key in data) {
                    var obj = data[key];
                    dataArr.push(obj);
                }
            }
            else {
                dataArr = data;
            }
            for (var i = 0; i < dataArr.length; i++) {
                var d = dataArr[i];
                var widget = this._createItemWidget();
                this._resetItemByData(widget, d, i);
            }
            this._pageViewEvent();
        };
        __egretProto__._addPage = function (page) {
            var self = this;
            if (self.getPagesCount() > self._initPageCount) {
                page.setVisible(false);
            }
            self._pageViewContainer.addPage(page);
        };
        __egretProto__.prePage = function () {
            var self = this;
            var _pageViewContainer = self.getPageViewContainer();
            var curPageIndex = _pageViewContainer.getCurPageIndex();
            var prePageIndex = curPageIndex !== 0 ? curPageIndex - 1 : null;
            if (prePageIndex != null) {
                self.scrollToPage(prePageIndex);
            }
        };
        __egretProto__.nextPage = function () {
            var self = this;
            var _pageViewContainer = self.getPageViewContainer(), pagesCount = self.getPagesCount();
            var curPageIndex = _pageViewContainer.getCurPageIndex();
            var nextPageIndex = curPageIndex !== pagesCount - 1 ? curPageIndex + 1 : null;
            if (nextPageIndex != null) {
                self.scrollToPage(nextPageIndex);
            }
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
            var self = this;
            return self._pageViewContainer.getPages().length;
        };
        __egretProto__.scrollToPage = function (idx) {
            var self = this;
            self._pageViewContainer.scrollToPage(idx);
        };
        __egretProto__.getCurPageIndex = function () {
            return this._pageViewContainer.getCurPageIndex();
        };
        __egretProto__._pageViewEvent = function () {
            var self = this;
            var _pageViewContainer = self.getPageViewContainer(), pages = _pageViewContainer.getPages();
            var curPageIndex = _pageViewContainer.getCurPageIndex();
            var page;
            for (var i = 0; i < pages.length; i++) {
                page = pages[i];
                if (i < curPageIndex - 1 || i > curPageIndex + 1) {
                    page.setVisible(false);
                }
                else {
                    page.setVisible(true);
                }
            }
            self.onPageEnter();
        };
        __egretProto__.addPageEnterEvent = function (pageEnterEventSelector, pageEnterEventListener) {
            this._pageEnterEventSelector = pageEnterEventSelector;
            this._pageEnterEventListener = pageEnterEventListener;
        };
        __egretProto__.onPageEnter = function () {
            if (this._pageEnterEventSelector) {
                this._pageEnterEventSelector.call(this._pageEnterEventListener, this);
            }
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            if (this._pageViewContainer) {
                this._pageViewContainer.doDtor();
                this._pageViewContainer = null;
            }
        };
        PageViewController.__className = "PageViewController";
        return PageViewController;
    })(mo.WidgetCtrl);
    mo.PageViewController = PageViewController;
    PageViewController.prototype.__class__ = "mo.PageViewController";
})(mo || (mo = {}));

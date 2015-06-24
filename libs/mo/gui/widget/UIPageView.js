var mo;
(function (mo) {
    var PageViewEventType;
    (function (PageViewEventType) {
        PageViewEventType.turning = 0;
    })(PageViewEventType = mo.PageViewEventType || (mo.PageViewEventType = {}));
})(mo || (mo = {}));
var mo;
(function (mo) {
    var PVTouchDir;
    (function (PVTouchDir) {
        PVTouchDir.touchLeft = 0;
        PVTouchDir.touchRight = 1;
    })(PVTouchDir = mo.PVTouchDir || (mo.PVTouchDir = {}));
})(mo || (mo = {}));
var mo;
(function (mo) {
    var UIPageView = (function (_super) {
        __extends(UIPageView, _super);
        function UIPageView() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIPageView.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._curPageIdx = 0;
            self._pages = [];
            self._touchMoveDir = mo.PVTouchDir.touchLeft;
            self._touchStartLocation = 0;
            self._touchMoveStartLocation = 0;
            self._leftBoundary = 0;
            self._rightBoundary = 0;
            self._isAutoScrolling = false;
            self._autoScrollDistance = 0;
            self._autoScrollSpeed = 0;
            self._autoScrollDir = 0;
            self._childFocusCancelOffset = 5;
            self._touchMovePos = mo.p(0, 0);
        };
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            this._setClippingEnabled(true);
            this.setTouchEnabled(true);
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            mo.tick(this.update, this);
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            mo.clearTick(this.update, this);
        };
        /**
         * Add a widget to a page of pageview.
         * @param {mo.UIWidget} widget
         * @param {Number} pageIdx
         * @param {Boolean} forceCreate
         */
        __egretProto__.addWidgetToPage = function (widget, pageIdx, forceCreate) {
            if (!widget) {
                return;
            }
            if (pageIdx < 0) {
                return;
            }
            var pageCount = this._pages.length;
            if (pageIdx >= pageCount) {
                if (forceCreate) {
                    if (pageIdx > pageCount) {
                        mo.log("pageIdx is %d, it will be added as page id [%d]", pageIdx, pageCount);
                    }
                    var newPage = this.createPage();
                    newPage.addChild(widget);
                    this.addPage(newPage);
                }
            }
            else {
                var page = this._pages[pageIdx];
                if (page) {
                    page.addChild(widget);
                }
            }
        };
        /**
         * create page
         * @returns {mo.UIPanel}
         */
        __egretProto__.createPage = function () {
            var newPage = mo.UIPanel.create();
            newPage.setSize(this.getSize());
            return newPage;
        };
        /**
         * Push back a page to pageview.
         * @param {mo.UIPanel} page
         */
        __egretProto__.addPage = function (page) {
            if (!page) {
                return;
            }
            if (mo.ArrayContainsObject(this._pages, page)) {
                return;
            }
            var pSize = page.getSize();
            var pvSize = this.getSize();
            if (!(pSize.width == pvSize.width && pSize.height == pvSize.height)) {
                mo.log("page size does not match pageview size, it will be force sized!");
                page.setSize(pvSize);
            }
            page.setPosition(mo.p(this.getPositionXByIndex(this._pages.length), 0));
            this._pages.push(page);
            this.addChild(page);
            this.updateBoundaryPages();
        };
        /**
         * Inert a page to pageview.
         * @param {mo.UIPanel} page
         * @param {Number} idx
         */
        __egretProto__.insertPage = function (page, idx) {
            if (idx < 0) {
                return;
            }
            if (!page) {
                return;
            }
            if (mo.ArrayContainsObject(this._pages, page)) {
                return;
            }
            var pageCount = this._pages.length;
            if (idx >= pageCount) {
                this.addPage(page);
            }
            else {
                mo.ArrayAppendObjectToIndex(this._pages, page, idx);
                page.setPosition(mo.p(this.getPositionXByIndex(idx), 0));
                this.addChild(page);
                var pSize = page.getSize();
                var pvSize = this.getSize();
                if (!pSize.equals(pvSize)) {
                    mo.log("page size does not match pageview size, it will be force sized!");
                    page.setSize(pvSize);
                }
                var arrayPages = this._pages;
                var length = arrayPages.length;
                for (var i = (idx + 1); i < length; i++) {
                    var behindPage = arrayPages[i];
                    var formerPos = behindPage.getPosition();
                    behindPage.setPosition(mo.p(formerPos.x + this.getSize().width, 0));
                }
                this.updateBoundaryPages();
            }
        };
        /**
         * Remove a page of pageview.
         * @param {mo.UIPanel} page
         */
        __egretProto__.removePage = function (page) {
            if (!page) {
                return;
            }
            this.removeChild(page);
            this.updateChildrenPosition();
            this.updateBoundaryPages();
        };
        /**
         * Remove a page at index of pageview.
         * @param {Number} index
         */
        __egretProto__.removePageAtIndex = function (index) {
            if (index < 0 || index >= this._pages.length) {
                return;
            }
            var page = this._pages[index];
            if (page) {
                this.removePage(page);
            }
        };
        __egretProto__.updateBoundaryPages = function () {
            if (this._pages.length <= 0) {
                this._leftChild = null;
                this._rightChild = null;
                return;
            }
            this._leftChild = this._pages[0];
            this._rightChild = this._pages[this._pages.length - 1];
        };
        /**
         * Get x position by index
         * @param {Number} idx
         * @returns {Number}
         */
        __egretProto__.getPositionXByIndex = function (idx) {
            return (this.getSize().width * (idx - this._curPageIdx));
        };
        /**
         *  remove widget child override
         * @param {mo.UIWidget} child
         */
        __egretProto__.removeChild = function (child) {
            mo.ArrayRemoveObject(this._pages, child);
            return _super.prototype.removeChild.call(this, child);
        };
        __egretProto__._onNodeSizeDirty = function () {
            _super.prototype._onNodeSizeDirty.call(this);
            this._rightBoundary = this.getSize().width;
            this.updateChildrenSize();
            this.updateChildrenPosition();
        };
        __egretProto__.updateChildrenSize = function () {
            if (!(this._pages.length <= 0)) {
                return;
            }
            var selfSize = this.getSize();
            for (var i = 0; i < this._pages.length; i++) {
                var page = this._pages[i];
                page.setSize(selfSize);
            }
        };
        __egretProto__.updateChildrenPosition = function () {
            if (!this._pages) {
                return;
            }
            var pageCount = this._pages.length;
            if (pageCount <= 0) {
                this._curPageIdx = 0;
                return;
            }
            if (this._curPageIdx >= pageCount) {
                this._curPageIdx = pageCount - 1;
            }
            var pageWidth = this.getSize().width;
            var arrayPages = this._pages;
            for (var i = 0; i < pageCount; i++) {
                var page = arrayPages[i];
                page.setPosition(mo.p((i - this._curPageIdx) * pageWidth, 0));
            }
        };
        __egretProto__.removeChildren = function () {
            this._pages.length = 0;
            _super.prototype.removeChildren.call(this);
        };
        /**
         * scroll pageview to index.
         * @param {Number} idx
         */
        __egretProto__.scrollToPage = function (idx) {
            if (idx < 0 || idx >= this._pages.length) {
                return;
            }
            if (this._isAutoScrolling)
                return;
            this._curPageIdx = idx;
            var curPage = this._pages[idx];
            this._autoScrollDistance = -(curPage.getPosition().x);
            this._autoScrollSpeed = Math.abs(this._autoScrollDistance) / 0.2;
            this._autoScrollDir = this._autoScrollDistance > 0 ? 1 : 0;
            this._isAutoScrolling = true;
        };
        __egretProto__.update = function (dt) {
            if (this._isAutoScrolling) {
                switch (this._autoScrollDir) {
                    case 0:
                        var step = this._autoScrollSpeed * dt / 1000;
                        if (this._autoScrollDistance + step >= 0.0) {
                            step = -this._autoScrollDistance;
                            this._autoScrollDistance = 0.0;
                            this._isAutoScrolling = false;
                        }
                        else {
                            this._autoScrollDistance += step;
                        }
                        this.scrollPages(-step);
                        if (!this._isAutoScrolling) {
                            this.pageTurningEvent();
                        }
                        break;
                        break;
                    case 1:
                        var step = this._autoScrollSpeed * dt / 1000;
                        if (this._autoScrollDistance - step <= 0.0) {
                            step = this._autoScrollDistance;
                            this._autoScrollDistance = 0.0;
                            this._isAutoScrolling = false;
                        }
                        else {
                            this._autoScrollDistance -= step;
                        }
                        this.scrollPages(step);
                        if (!this._isAutoScrolling) {
                            this.pageTurningEvent();
                        }
                        break;
                    default:
                        break;
                }
            }
        };
        __egretProto__.onTouchBegan = function (event) {
            var beganPos = mo.p(event.localX, event.localY);
            this.handlePressLogic(beganPos);
        };
        __egretProto__.onTouchMoved = function (event) {
            this._touchMovePos.x = event.localX;
            this._touchMovePos.y = event.localY;
            this.handleMoveLogic(this._touchMovePos);
            //todo this.moveEvent();
            if (!this.hitTest(event.localX, event.localY)) {
                this.setFocused(false);
                this.onTouchEnded(event);
            }
        };
        __egretProto__.onTouchEnded = function (event) {
            this.handleReleaseLogic();
        };
        __egretProto__.onTouchCancelled = function (event) {
            this.handleReleaseLogic();
        };
        __egretProto__.movePages = function (offset) {
            var arrayPages = this._pages;
            var length = arrayPages.length;
            for (var i = 0; i < length; i++) {
                var child = arrayPages[i];
                var pos = child.getPosition();
                child.setPosition(mo.p(pos.x + offset, pos.y));
            }
        };
        __egretProto__.scrollPages = function (touchOffset) {
            if (this._pages.length <= 0) {
                return false;
            }
            if (!this._leftChild || !this._rightChild) {
                return false;
            }
            var realOffset = touchOffset;
            switch (this._touchMoveDir) {
                case mo.PVTouchDir.touchLeft:
                    if (this._rightChild.getRightInParent() + touchOffset <= this._rightBoundary) {
                        realOffset = this._rightBoundary - this._rightChild.getRightInParent();
                        this.movePages(realOffset);
                        return false;
                    }
                    break;
                case mo.PVTouchDir.touchRight:
                    if (this._leftChild.getLeftInParent() + touchOffset >= this._leftBoundary) {
                        realOffset = this._leftBoundary - this._leftChild.getLeftInParent();
                        this.movePages(realOffset);
                        return false;
                    }
                    break;
                default:
                    break;
            }
            this.movePages(realOffset);
            return true;
        };
        __egretProto__.handlePressLogic = function (touchPoint) {
            var nsp = this.globalToLocal(touchPoint.x, touchPoint.y);
            this._touchMoveStartLocation = nsp.x;
            this._touchStartLocation = nsp.x;
        };
        __egretProto__.handleMoveLogic = function (touchPoint) {
            var nsp = this.globalToLocal(touchPoint.x, touchPoint.y);
            var offset = 0.0;
            var moveX = nsp.x;
            offset = moveX - this._touchMoveStartLocation;
            this._touchMoveStartLocation = moveX;
            if (offset < 0) {
                this._touchMoveDir = mo.PVTouchDir.touchLeft;
            }
            else if (offset > 0) {
                this._touchMoveDir = mo.PVTouchDir.touchRight;
            }
            this.scrollPages(offset);
        };
        __egretProto__.handleReleaseLogic = function () {
            if (this._pages.length <= 0) {
                return;
            }
            var curPage = this._pages[this._curPageIdx];
            if (curPage) {
                var curPagePos = curPage.getPosition();
                var pageCount = this._pages.length;
                var curPageLocation = curPagePos.x;
                var pageWidth = this.getSize().width;
                var boundary = pageWidth / 2.0;
                if (curPageLocation <= -boundary) {
                    if (this._curPageIdx >= pageCount - 1)
                        this.scrollPages(-curPageLocation);
                    else
                        this.scrollToPage(this._curPageIdx + 1);
                }
                else if (curPageLocation >= boundary) {
                    if (this._curPageIdx <= 0)
                        this.scrollPages(-curPageLocation);
                    else
                        this.scrollToPage(this._curPageIdx - 1);
                }
                else {
                    this.scrollToPage(this._curPageIdx);
                }
            }
        };
        __egretProto__.pageTurningEvent = function () {
            if (this._pageViewEventListener && this._pageViewEventSelector) {
                this._pageViewEventSelector.call(this._pageViewEventListener, this, mo.PageViewEventType.turning);
            }
        };
        /**
         * @param {Function} selector
         * @param {Object} target
         */
        __egretProto__.addEventListenerPageView = function (selector, target) {
            this._pageViewEventSelector = selector;
            this._pageViewEventListener = target;
        };
        /**
         * get pages
         * @returns {Array}
         */
        __egretProto__.getPages = function () {
            return this._pages;
        };
        /**
         * get cur page index
         * @returns {Number}
         */
        __egretProto__.getCurPageIndex = function () {
            return this._curPageIdx;
        };
        __egretProto__.copyClonedWidgetChildren = function (model) {
            var arrayPages = model.getPages();
            for (var i = 0; i < arrayPages.length; i++) {
                var page = arrayPages[i];
                this.addPage(page.clone());
            }
        };
        UIPageView.__className = "UIPageView";
        return UIPageView;
    })(mo.UIPanel);
    mo.UIPageView = UIPageView;
    UIPageView.prototype.__class__ = "mo.UIPageView";
})(mo || (mo = {}));

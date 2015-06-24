var mo;
(function (mo) {
    var ListViewEventType;
    (function (ListViewEventType) {
        ListViewEventType.listViewOnselectedItem = 0;
    })(ListViewEventType = mo.ListViewEventType || (mo.ListViewEventType = {}));
})(mo || (mo = {}));
var mo;
(function (mo) {
    var ListViewGravity;
    (function (ListViewGravity) {
        ListViewGravity.left = 0;
        ListViewGravity.right = 1;
        ListViewGravity.centerHorizontal = 2;
        ListViewGravity.top = 3;
        ListViewGravity.bottom = 4;
        ListViewGravity.centerVertical = 5;
    })(ListViewGravity = mo.ListViewGravity || (mo.ListViewGravity = {}));
})(mo || (mo = {}));
var mo;
(function (mo) {
    var UIListView = (function (_super) {
        __extends(UIListView, _super);
        function UIListView() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIListView.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._items = [];
            this._gravity = mo.ListViewGravity.centerHorizontal;
            this._itemsMargin = 0;
            this._curSelectedIndex = 0;
            this._refreshViewDirty = true;
        };
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            this.setLayoutType(mo.LayoutType.linearVertical);
        };
        /**
         * Sets a item model for listview. A model will be cloned for adding default item.
         * @param {mo.UIWidget} model
         */
        __egretProto__.setItemModel = function (model) {
            if (!model) {
                return;
            }
            this._model = model;
        };
        __egretProto__.updateInnerContainerSize = function () {
            switch (this._scrollOption.direction) {
                case mo.ScrollViewDir.vertical:
                    var length = this._items.length;
                    var totalHeight = (length - 1) * this._itemsMargin;
                    for (var i = 0; i < length; i++) {
                        var item = this._items[i];
                        totalHeight += item.getSize().height;
                    }
                    var finalWidth = this.getSize().width;
                    var finalHeight = totalHeight;
                    this.setInnerContainerSize(mo.size(finalWidth, finalHeight));
                    break;
                case mo.ScrollViewDir.horizontal:
                    var length = this._items.length;
                    var totalWidth = (length - 1) * this._itemsMargin;
                    for (var i = 0; i < length; i++) {
                        var item = this._items[i];
                        totalWidth += item.getSize().width;
                    }
                    var finalWidth = totalWidth;
                    var finalHeight = this.getSize().height;
                    this.setInnerContainerSize(mo.size(finalWidth, finalHeight));
                    break;
                default:
                    break;
            }
        };
        __egretProto__.remedyLayoutParameter = function (item) {
            if (!item) {
                return;
            }
            switch (this._scrollOption.direction) {
                case mo.ScrollViewDir.vertical:
                    var llp = item.getLayoutParameter(mo.LayoutParameterType.linear);
                    if (!llp) {
                        var defaultLp = mo.LinearLayoutParameter.create();
                        switch (this._gravity) {
                            case mo.ListViewGravity.left:
                                defaultLp.setGravity(mo.LinearGravity.left);
                                break;
                            case mo.ListViewGravity.right:
                                defaultLp.setGravity(mo.LinearGravity.right);
                                break;
                            case mo.ListViewGravity.centerHorizontal:
                                defaultLp.setGravity(mo.LinearGravity.centerHorizontal);
                                break;
                            default:
                                break;
                        }
                        if (this.getIndex(item) == 0) {
                            defaultLp.setMargin(new mo.Margin(0, 0, 0, 0));
                        }
                        else {
                            defaultLp.setMargin(new mo.Margin(this._itemsMargin, 0.0, 0.0, 0.0));
                        }
                        item.setLayoutParameter(defaultLp);
                    }
                    else {
                        if (this.getIndex(item) == 0) {
                            llp.setMargin(new mo.Margin(0, 0, 0, 0));
                        }
                        else {
                            llp.setMargin(new mo.Margin(this._itemsMargin, 0, 0, 0));
                        }
                        switch (this._gravity) {
                            case mo.ListViewGravity.left:
                                llp.setGravity(mo.LinearGravity.left);
                                break;
                            case mo.ListViewGravity.right:
                                llp.setGravity(mo.LinearGravity.right);
                                break;
                            case mo.ListViewGravity.centerHorizontal:
                                llp.setGravity(mo.LinearGravity.centerHorizontal);
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case mo.ScrollViewDir.horizontal:
                    var llp = item.getLayoutParameter(mo.LayoutParameterType.linear);
                    if (!llp) {
                        var defaultLp = mo.LinearLayoutParameter.create();
                        switch (this._gravity) {
                            case mo.ListViewGravity.top:
                                defaultLp.setGravity(mo.LinearGravity.top);
                                break;
                            case mo.ListViewGravity.bottom:
                                defaultLp.setGravity(mo.LinearGravity.bottom);
                                break;
                            case mo.ListViewGravity.centerVertical:
                                defaultLp.setGravity(mo.LinearGravity.centerVertical);
                                break;
                            default:
                                break;
                        }
                        if (this.getIndex(item) == 0) {
                            defaultLp.setMargin(new mo.Margin(0, 0, 0, 0));
                        }
                        else {
                            defaultLp.setMargin(new mo.Margin(0.0, 0.0, 0.0, this._itemsMargin));
                        }
                        item.setLayoutParameter(defaultLp);
                    }
                    else {
                        if (this.getIndex(item) == 0) {
                            llp.setMargin(new mo.Margin(0, 0, 0, 0));
                        }
                        else {
                            llp.setMargin(new mo.Margin(0.0, 0.0, 0.0, this._itemsMargin));
                        }
                        switch (this._gravity) {
                            case mo.ListViewGravity.top:
                                llp.setGravity(mo.LinearGravity.top);
                                break;
                            case mo.ListViewGravity.bottom:
                                llp.setGravity(mo.LinearGravity.bottom);
                                break;
                            case mo.ListViewGravity.centerVertical:
                                llp.setGravity(mo.LinearGravity.centerVertical);
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                default:
                    break;
            }
        };
        /**
         * Push back a default item(create by a cloned model) into listview.
         */
        __egretProto__.pushBackDefaultItem = function () {
            var self = this;
            if (!self._model) {
                return;
            }
            var newItem = self._model.clone();
            self._items.push(newItem);
            self.remedyLayoutParameter(newItem);
            self.addChild(newItem);
            self._refreshViewDirty = true;
            self._dirty = true;
        };
        /**
         * Insert a default item(create by a cloned model) into listview.
         * @param {Number} index
         */
        __egretProto__.insertDefaultItem = function (index) {
            var self = this;
            if (!self._model) {
                return;
            }
            var newItem = self._model.clone();
            mo.ArrayAppendObjectToIndex(self._items, newItem, index);
            self.remedyLayoutParameter(newItem);
            self.addChild(newItem);
            self._refreshViewDirty = true;
            self._dirty = true;
        };
        /**
         * Push back custom item into listview.
         * @param {mo.UIWidget} item
         */
        __egretProto__.pushBackCustomItem = function (item) {
            var self = this;
            self._items.push(item);
            self.remedyLayoutParameter(item);
            self.addChild(item);
            self._refreshViewDirty = true;
            self._dirty = true;
        };
        /**
         * Push back custom item into listview.
         * @param {mo.UIWidget} item
         * @param {Number} index
         */
        __egretProto__.insertCustomItem = function (item, index) {
            var self = this;
            mo.ArrayAppendObjectToIndex(self._items, item, index);
            self.remedyLayoutParameter(item);
            self.addChild(item);
            self._refreshViewDirty = true;
            self._dirty = true;
        };
        /**
         * Removes a item whose index is same as the parameter.
         * @param {Number} index
         */
        __egretProto__.removeItem = function (index) {
            var self = this;
            var item = self.getItem(index);
            if (!item) {
                return;
            }
            mo.ArrayRemoveObject(self._items, item);
            self.removeChild(item);
            self._refreshViewDirty = true;
            self._dirty = true;
        };
        /**
         * Removes the last item of listview.
         */
        __egretProto__.removeLastItem = function () {
            this.removeItem(this._items.length - 1);
        };
        /**
         * Returns a item whose index is same as the parameter.
         * @param {Number} index
         * @returns {mo.UIWidget}
         */
        __egretProto__.getItem = function (index) {
            if (index < 0 || index >= this._items.length) {
                return null;
            }
            return this._items[index];
        };
        /**
         * Returns the item container.
         * @returns {Array}
         */
        __egretProto__.getItems = function () {
            return this._items;
        };
        /**
         * Returns the index of item.
         * @param {mo.UIWidget} item
         * @returns {Number}
         */
        __egretProto__.getIndex = function (item) {
            return mo.ArrayGetIndexOfObject(this._items, item);
        };
        /**
         * Changes the gravity of listview.
         * @param {Number} gravity
         */
        __egretProto__.setGravity = function (gravity) {
            var self = this;
            if (self._gravity == gravity) {
                return;
            }
            self._gravity = gravity;
            self._refreshViewDirty = true;
            self._dirty = true;
        };
        /**
         * Changes the margin between each item.
         * @param {Number} margin
         */
        __egretProto__.setItemsMargin = function (margin) {
            var self = this;
            if (self._itemsMargin == margin) {
                return;
            }
            self._itemsMargin = margin;
            self._refreshViewDirty = true;
            self._dirty = true;
        };
        /**
         * Get the margin between each item.
         * @returns {Number}
         */
        __egretProto__.getItemsMargin = function () {
            return this._itemsMargin;
        };
        /**
         * Changes scroll direction of scrollview.
         * @param {Number} dir
         */
        __egretProto__._setDirection = function (dir) {
            switch (dir) {
                case mo.ScrollViewDir.vertical:
                    this.setLayoutType(mo.LayoutType.linearVertical);
                    break;
                case mo.ScrollViewDir.horizontal:
                    this.setLayoutType(mo.LayoutType.linearHorizontal);
                    break;
                case mo.ScrollViewDir.both:
                    return;
                default:
                    return;
                    break;
            }
            _super.prototype._setDirection.call(this, dir);
        };
        /**
         *  add event listener
         * @param {Function} selector
         * @param {Object} target
         */
        __egretProto__.addEventListenerListView = function (selector, target) {
            this._listViewEventListener = target;
            this._listViewEventSelector = selector;
        };
        __egretProto__.selectedItemEvent = function () {
            if (this._listViewEventSelector && this._listViewEventListener) {
                this._listViewEventSelector.call(this._listViewEventListener, this, mo.ListViewEventType.listViewOnselectedItem);
            }
        };
        /**
         * get current selected index
         * @returns {number}
         */
        __egretProto__.getCurSelectedIndex = function () {
            return this._curSelectedIndex;
        };
        /**
         * request refresh view
         */
        __egretProto__.requestRefreshView = function () {
            this._refreshViewDirty = true;
            this._dirty = true;
        };
        __egretProto__.refreshView = function () {
            for (var i = 0; i < this._items.length; i++) {
                var item = this._items[i];
                item.setZOrder(i);
                this.remedyLayoutParameter(item);
            }
            this.updateInnerContainerSize();
        };
        __egretProto__.sortChildren = function () {
            var self = this;
            if (self._refreshViewDirty) {
                self.refreshView();
                self._refreshViewDirty = false;
            }
            _super.prototype.sortChildren.call(this);
        };
        __egretProto__._onVisit = function () {
            _super.prototype._onVisit.call(this);
            if (this._refreshViewDirty)
                this.refreshView();
        };
        __egretProto__._onAfterVisit = function () {
            _super.prototype._onAfterVisit.call(this);
            this._refreshViewDirty = false;
        };
        __egretProto__._onNodeSizeDirty = function () {
            _super.prototype._onNodeSizeDirty.call(this);
            this._refreshViewDirty = true;
            this._dirty = true;
        };
        __egretProto__.copyClonedWidgetChildren = function (model) {
            var arrayItems = model.getItems();
            for (var i = 0; i < arrayItems.length; i++) {
                var item = arrayItems[i];
                this.pushBackCustomItem(item.clone());
            }
        };
        __egretProto__.copySpecialProps = function (listView) {
            _super.prototype.copySpecialProps.call(this, listView);
            this.setItemModel(listView._model);
            this.setItemsMargin(listView._itemsMargin);
            this.setGravity(listView._gravity);
        };
        UIListView.__className = "UIListView";
        return UIListView;
    })(mo.UIScrollView);
    mo.UIListView = UIListView;
    UIListView.prototype.__class__ = "mo.UIListView";
})(mo || (mo = {}));

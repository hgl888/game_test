/**
 * Created by lihex on 1/17/15.
 */
var mo;
(function (mo) {
    var LinearVerticalCtrl = (function (_super) {
        __extends(LinearVerticalCtrl, _super);
        function LinearVerticalCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = LinearVerticalCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        /**
         * @param container 容器panel
         * @param templateName(string 模板项名|function构建模板项的回调)
         * @param target
         */
        __egretProto__.init = function (container, templateName, target) {
            _super.prototype.init.call(this);
            var self = this;
            container.autoSizeEnabled = true;
            self.widget = container;
            self._itemWidgets = [];
            self._tpName = templateName;
            if (self._tpName) {
                self._tpWidget = self.getWidgetByName(self._tpName);
                self._tpWidget.isAutoDtor = false;
                self._itemWidgets.push(self._tpWidget);
            }
            if (typeof templateName == "function") {
                self.setWidgetCreateAdapter(templateName, target);
            }
        };
        //回收子项
        __egretProto__.reclaimItemWidget = function () {
            var self = this, w, localWidgets = self._itemWidgets;
            for (var i = 0, li = localWidgets.length; i < li; i++) {
                w = localWidgets[i];
                w.removeFromParent();
            }
        };
        /**
         *
         * @param count 数量|字典
         * @param selector
         * @param target
         */
        __egretProto__.resetByData = function (count, selector, target) {
            var self = this, w;
            self.reclaimItemWidget();
            if (selector) {
                self.setDataSourceAdapter(selector, target);
            }
            var keys;
            if (typeof count == "object") {
                keys = Object.keys(count);
                self._itemCount = keys.length;
            }
            else {
                self._itemCount = count;
            }
            for (var i = 0, li = self._itemCount; i < li; i++) {
                w = self._getItemWidget(i);
                self.widget.addChild(w);
                if (keys) {
                    self._executeDataAdapterCallback(w, keys[i]);
                }
                else {
                    self._executeDataAdapterCallback(w, i);
                }
            }
            if (self._itemCount) {
                self.widget.doLayout();
            }
            else {
                self.widget.setVisible(false);
                self.widget.height = 0;
            }
        };
        /**
         * 根据索引获得子项
         * @param index
         * @returns {any}
         * @private
         */
        __egretProto__._getItemWidget = function (index) {
            var self = this;
            var localItemWidgets = self._itemWidgets;
            if (!localItemWidgets[index]) {
                localItemWidgets[index] = self._createItemWidget();
            }
            return localItemWidgets[index];
        };
        /**
         * 创建子项
         * @returns {any}
         * @private
         */
        __egretProto__._createItemWidget = function () {
            var self = this;
            var w;
            if (self._tpWidget) {
                w = self._tpWidget.clone();
                w.isAutoDtor = false;
            }
            else {
                w = this._itemWidgetCreateSelector.call(this._itemWidgetCreateTarget);
            }
            return w;
        };
        /**
         * 设置创建子项的回调
         * @param selector
         * @param target
         */
        __egretProto__.setWidgetCreateAdapter = function (selector, target) {
            this._itemWidgetCreateSelector = selector;
            this._itemWidgetCreateTarget = target;
        };
        /**
         * 设置数据设置回调
         * @param selector
         * @param target
         */
        __egretProto__.setDataSourceAdapter = function (selector, target) {
            this._dataSourceAdapterSelector = selector;
            this._dataSourceAdapterTarget = target;
        };
        __egretProto__._executeDataAdapterCallback = function (itemWidget, index) {
            if (this._dataSourceAdapterSelector) {
                return this._dataSourceAdapterSelector.call(this._dataSourceAdapterTarget, itemWidget, index, this);
            }
        };
        __egretProto__.dtor = function () {
            var self = this;
            var itemWidgets = self._itemWidgets;
            while (itemWidgets.length) {
                itemWidgets.pop().doDtor();
            }
            self._itemWidgets = null;
            _super.prototype.dtor.call(this);
        };
        return LinearVerticalCtrl;
    })(mo.WidgetCtrl);
    mo.LinearVerticalCtrl = LinearVerticalCtrl;
    LinearVerticalCtrl.prototype.__class__ = "mo.LinearVerticalCtrl";
})(mo || (mo = {}));

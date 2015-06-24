var mo;
(function (mo) {
    var GridPageIndex = (function (_super) {
        __extends(GridPageIndex, _super);
        function GridPageIndex() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GridPageIndex.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._totalPageNum = 1;
            self._lastPageNum = 1;
            self._curPageNum = 1;
            self._lastPageIndex = 0;
            self._curPageIndex = 0;
            self._requiredPageIndexNum = 1;
            self._maxPageIndexNum = 5;
            self._offTexName = "";
            self._onTexName = "";
            self._spacing = 8;
            self._indexDirty = false;
            this._pageIndexRenders = [];
            this._pageOnRender = mo.UIImage.create();
            this._pageIndexRenders.push(this._pageOnRender);
            mo.tick(this.update, this);
        };
        /**
         * 加载图标
         * @param on
         * @param off
         */
        __egretProto__.loadTextures = function (on, off) {
            this.loadOnTexture(on);
            this.loadOffTexture(off);
        };
        /**
         *  加载灰色图标
         * @param off 资源名
         */
        __egretProto__.loadOffTexture = function (off) {
            if (!off) {
                return;
            }
            this._offTexName = off;
            var indexRenders = this._pageIndexRenders;
            for (var i = 1, li = indexRenders.length; i < li; i++) {
                indexRenders[i].loadTexture(off);
            }
        };
        /**
         * 加载高亮图标
         * @param on 资源名
         */
        __egretProto__.loadOnTexture = function (on) {
            if (!on) {
                return;
            }
            this._onTexName = on;
            this._pageOnRender.loadTexture(on);
        };
        /**
         *  设置图标间距
         * @param spacing
         */
        __egretProto__.setSpacing = function (spacing) {
            this._spacing = spacing;
            this._indexDirty = true;
        };
        __egretProto__.drawPageIndexIcon = function () {
            var items = this._pageIndexRenders;
            var spacing = this._spacing;
            var iconSize = this._pageOnRender.getSize();
            if (!items)
                return;
            var itemLength = this._requiredPageIndexNum;
            var halfIconSize = mo.size(iconSize.width * 0.5, iconSize.height * 0.5);
            var pageIndexPos = mo.p(0, 0);
            var starPosition = (mo.pAdd(pageIndexPos, mo.p(-(Math.floor(itemLength * 0.5)) * (halfIconSize.width + spacing + halfIconSize.width), 0)));
            var index, r, c;
            for (index = 0; index < itemLength; index++) {
                r = 1;
                c = index;
                var indexIcon = items[index];
                indexIcon.setPosition(mo.pAdd(starPosition, mo.p(c * (halfIconSize.width + spacing + halfIconSize.width), 0)));
                this.addChild(indexIcon);
            }
        };
        /**
         *  设置最多显示图标数
         * @param num
         */
        __egretProto__.setMaxPageIndexNum = function (num) {
            if (num < 1) {
                this._maxPageIndexNum = 1;
            }
            this._maxPageIndexNum = num;
            this._indexDirty = true;
        };
        /**
         *  设置总页数
         * @param num
         */
        __egretProto__.setTotalPageNum = function (num) {
            this._totalPageNum = num;
            this._requiredPageIndexNum = num;
            if (num < 1) {
                this._totalPageNum = 1;
                this._requiredPageIndexNum = 1;
            }
            if (num > this._maxPageIndexNum) {
                this._requiredPageIndexNum = this._maxPageIndexNum;
            }
            var curLength = this._pageIndexRenders.length;
            // 如果不够则添加
            var delta = 0;
            if (curLength < this._requiredPageIndexNum) {
                delta = this._requiredPageIndexNum - curLength;
            }
            var render;
            for (var i = 0; i < delta; i++) {
                render = mo.UIImage.create();
                render.loadTexture(this._offTexName);
                this._pageIndexRenders.push(render);
            }
            this.setPageNum(this._curPageNum);
            this._indexDirty = true;
        };
        /**
         *  设置页码
         * @param num 从1开始
         */
        __egretProto__.setPageNum = function (num) {
            this._curPageNum = num;
            if (num < 1) {
                this._curPageNum = 1;
            }
            if (num > this._totalPageNum) {
                this._curPageNum = this._totalPageNum;
            }
            var index, requiredPageIndexNum;
            requiredPageIndexNum = this._requiredPageIndexNum;
            if (this._curPageNum !== this._lastPageNum) {
                index = Math.round(requiredPageIndexNum * (this._curPageNum / this._totalPageNum));
                this._setPageIndex(index - 1);
                this._lastPageNum = this._curPageNum;
            }
        };
        /**
         *  设置页码索引
         * @param index 从0开始
         */
        __egretProto__._setPageIndex = function (index) {
            this._curPageIndex = index;
            if (index < 0) {
                this._curPageIndex = 0;
            }
            if (index >= this._requiredPageIndexNum) {
                this._curPageIndex = this._requiredPageIndexNum - 1;
            }
            if (this._curPageIndex !== this._lastPageIndex) {
                this._updateIndex();
            }
        };
        /**
         *  更新图标位置
         * @private
         */
        __egretProto__._updateIndex = function () {
            var self = this;
            var prePageIndex = this._lastPageIndex;
            var curPageIndex = this._curPageIndex;
            // 交换图标位置
            var preIcon = self._pageIndexRenders[prePageIndex];
            var curIcon = self._pageIndexRenders[curPageIndex];
            var tmpPos = mo.p(preIcon.getPosition().x, preIcon.getPosition().y);
            preIcon.setPosition(curIcon.getPosition().x, curIcon.getPosition().y);
            curIcon.setPosition(tmpPos);
            // 交换数据
            arraySwap(self._pageIndexRenders, prePageIndex, curPageIndex);
            this._lastPageIndex = this._curPageIndex;
        };
        __egretProto__.update = function (dt) {
            if (this._indexDirty && this._pageOnRender._nodeOption.texture != null) {
                this._indexDirty = false;
                this.removeChildren();
                this.drawPageIndexIcon();
            }
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            mo.clearTick(this.update, this);
            self.removeChildren();
        };
        GridPageIndex.__className = "GridPageView";
        return GridPageIndex;
    })(mo.UIPanel);
    mo.GridPageIndex = GridPageIndex;
    GridPageIndex.prototype.__class__ = "mo.GridPageIndex";
    function arraySwap(arr, oldIndex, newIndex) {
        arr[oldIndex] = arr.splice(newIndex, 1, arr[oldIndex])[0];
        return arr;
    }
})(mo || (mo = {}));

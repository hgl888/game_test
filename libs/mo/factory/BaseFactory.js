//缓冲池的基类
var mo;
(function (mo) {
    var BaseFactory = (function (_super) {
        __extends(BaseFactory, _super);
        function BaseFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = BaseFactory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._queue = [];
            self._createCount = 3;
        };
        __egretProto__.produce = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var product = this._produce.apply(this, arguments);
            product.reset();
            product.isReclaimed = false;
            product.isAutoDtor = true;
            return product;
        };
        __egretProto__.produce4Recycle = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var product = this.produce.apply(this, arguments);
            product.isAutoDtor = false;
            return product;
        };
        __egretProto__.produceDynamic = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var product = this._produceDynamic.apply(this, arguments);
            product.reset();
            product.isReclaimed = false;
            product.isAutoDtor = true;
            return product;
        };
        __egretProto__.produceDynamic4Recycle = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var product = this.produceDynamic.apply(this, arguments);
            product.isAutoDtor = false;
            return product;
        };
        __egretProto__._produce = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, product;
            if (self._queue.length > 0) {
                product = self._queue.shift();
            }
            else {
                product = self._productClass.create.apply(self._productClass, arguments);
                product.setFactory(self);
            }
            return product;
        };
        __egretProto__._produceDynamic = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, product;
            if (self._queue.length > 0) {
                product = self._queue.shift();
                if (arguments.length > 1) {
                    arguments[arguments.length - 1](product);
                }
            }
            else {
                product = self._productClass.createDynamic.apply(self._productClass, arguments);
                product.setFactory(self);
            }
            return product;
        };
        __egretProto__.reclaim = function (node) {
            var self = this;
            //如果已经回收了就直接返回
            //如果是自动释放，就认为不能回收
            //如果node对应的factory并不是当前的factory则直接返回
            if (node.isReclaimed || node.isAutoDtor || node.getFactory() != self) {
                return;
            }
            var queue = self._queue;
            queue.push(node);
            node.reset();
            node.isReclaimed = true;
        };
        __egretProto__.releaseAllProducts = function () {
            var queue = this._queue, product;
            while (queue.length > 0) {
                product = queue.pop();
                product.doDtor();
            }
        };
        __egretProto__.releaseProduct = function (product) {
            var queue = this._queue;
            for (var i = 0; i < queue.length;) {
                if (product == queue[i]) {
                    queue.splice(i, 1); //移除
                    product.doDtor();
                }
                else {
                    i++;
                }
            }
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            this.releaseAllProducts();
        };
        BaseFactory.__className = "BaseFactory";
        return BaseFactory;
    })(mo.Class);
    mo.BaseFactory = BaseFactory;
    BaseFactory.prototype.__class__ = "mo.BaseFactory";
})(mo || (mo = {}));

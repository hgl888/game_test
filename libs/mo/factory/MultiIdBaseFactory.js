var mo;
(function (mo) {
    //多ID的缓冲池
    var MultiIdBaseFactory = (function (_super) {
        __extends(MultiIdBaseFactory, _super);
        function MultiIdBaseFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MultiIdBaseFactory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._queue = {};
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
        };
        __egretProto__._produce = function (keyName) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var node, queue;
            queue = this._queue[keyName];
            if (queue && queue.length > 0) {
                node = queue.shift();
            }
            else {
                node = this._productClass.create.apply(this._productClass, arguments);
                node.setFactory(this);
                node._keyNameForFactory = keyName;
            }
            return node;
        };
        __egretProto__._produceDynamic = function (keyName) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var node, queue;
            queue = this._queue[keyName];
            if (queue && queue.length > 0) {
                node = queue.shift();
                node.handleDynamic.apply(node, arguments);
            }
            else {
                node = this._productClass.createDynamic.apply(this._productClass, arguments);
                node.setFactory(this);
                node._keyNameForFactory = keyName;
            }
            return node;
        };
        __egretProto__.reclaim = function (node) {
            var self = this;
            //如果已经回收了就直接返回
            //如果是自动释放，就认为不能回收
            //如果node对应的factory并不是当前的factory则直接返回
            if (node.isReclaimed || node.isAutoDtor || node.getFactory() != self) {
                return;
            }
            var keyName = node._keyNameForFactory;
            var queue = self._queue;
            if (!queue.hasOwnProperty(keyName)) {
                queue[keyName] = [];
            }
            queue[keyName].push(node);
            node.reset();
            node.isReclaimed = true;
        };
        __egretProto__.releaseAllProducts = function () {
            var queue = this._queue;
            for (var keyName in this._queue) {
                var subQueue = queue[keyName];
                if (subQueue) {
                    var product;
                    while (subQueue.length > 0) {
                        product = subQueue.pop();
                        product.doDtor();
                    }
                }
            }
        };
        __egretProto__.releaseProduct = function (product) {
            var queue = this._queue;
            for (var keyName in this._queue) {
                var subQueue = queue[keyName];
                if (subQueue) {
                    for (var i = 0, l_i = subQueue.length; i < l_i; i++) {
                        if (product == subQueue[i]) {
                            subQueue.splice(i, 1);
                            product.doDtor();
                            return;
                        }
                    }
                }
            }
        };
        MultiIdBaseFactory.__className = "MultiIdBaseFactory";
        return MultiIdBaseFactory;
    })(mo.BaseFactory);
    mo.MultiIdBaseFactory = MultiIdBaseFactory;
    MultiIdBaseFactory.prototype.__class__ = "mo.MultiIdBaseFactory";
})(mo || (mo = {}));

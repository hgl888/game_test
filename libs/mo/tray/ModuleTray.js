var mo;
(function (mo) {
    var ModuleTray = (function (_super) {
        __extends(ModuleTray, _super);
        function ModuleTray() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ModuleTray.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._moduleLayerMap = {};
            self._moduleNameStack = [];
            self._defaultModuleName = "__DEFAULT__";
            self._moduleLayer = new mo.Layer();
            self.visible = true; //模块托盘默认可见
            self.addChild(self._moduleLayer);
        };
        //注意，这里，之前的layer还没有隐藏
        __egretProto__.pushModule = function (moduleName) {
            var self = this;
            //创建一个新的layer
            var layer = self._moduleLayer = new mo.Layer();
            self._moduleLayerMap[moduleName] = layer;
            if (self._moduleName)
                self._moduleNameStack.push(self._moduleName); //推入栈
            self._moduleName = moduleName;
            self.addChild(layer); //添加到托盘中
        };
        __egretProto__.popModule = function () {
            var self = this;
            var curModuleLayer = self._moduleLayer;
            var nextModuleName = self._moduleNameStack.pop();
            if (nextModuleName) {
                var nextModuleLayer = self._moduleLayerMap[nextModuleName];
                self._moduleName = nextModuleName;
                self._moduleLayer = nextModuleLayer;
                delete self._moduleLayerMap[nextModuleName]; //删除字典内数据
                nextModuleLayer.show(); //设置成可见
                self.removeChild(curModuleLayer); //移除
            }
            else {
                self._moduleName = null;
                self._moduleLayer = null;
            }
        };
        __egretProto__.hideLayersInStack = function () {
            var stack = this._moduleNameStack;
            var map = this._moduleLayerMap;
            for (var i = 0, li = stack.length; i < li; ++i) {
                var layer = map[stack[i]];
                layer.hide();
            }
        };
        //@override
        __egretProto__.add = function (layer) {
            var curModuleLayer = this._moduleLayer;
            if (curModuleLayer) {
                curModuleLayer.addChild(layer);
            }
            else {
                mo.warn("当前托盘还未创建ModuleLayer");
            }
        };
        ModuleTray.__className = "ModuleTray";
        return ModuleTray;
    })(mo.Tray);
    mo.ModuleTray = ModuleTray;
    ModuleTray.prototype.__class__ = "mo.ModuleTray";
})(mo || (mo = {}));

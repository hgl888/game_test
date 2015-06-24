/**
 * Created by lihex on 3/5/15.
 */
var uw;
(function (uw) {
    var UIMaterialListCtrl = (function (_super) {
        __extends(UIMaterialListCtrl, _super);
        function UIMaterialListCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIMaterialListCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            var self = this;
            _super.prototype._initProp.call(this);
            self._iconCtrlList = [];
            self._marginRight = 30;
            self._dataLength = 0;
        };
        __egretProto__.init = function (container, scale, marginRight) {
            _super.prototype.init.call(this);
            var self = this, clazz = self.__class;
            container.bgOpacity = 0; //设置为无色
            self.widget = container;
            uiHelper.setLayoutType(container, mo.LayoutType.linearHorizontal);
            if (scale)
                self._wScale = scale;
            if (marginRight)
                self._marginRight = marginRight;
        };
        __egretProto__.resetByData = function (stuffArr) {
            var self = this;
            self._dataLength = stuffArr.length;
            for (var i = 0, li = stuffArr.length; i < li; i++) {
                var stuff = stuffArr[i];
                var ctrl = self._iconCtrlList[i];
                if (!ctrl) {
                    ctrl = uw.UIMaterialIconCtrl.create();
                    ctrl.setClickEnabled(true);
                    ctrl.onClick(function (ctrl) {
                        if (self._itemClick)
                            self._itemClick.call(self._itemClickTarget, ctrl);
                    }, self);
                    ctrl.isAutoDtor = false;
                    //设置缩放
                    if (self._wScale)
                        ctrl.widget.setScale(self._wScale);
                    //设置水平布局和边距
                    uiHelper.setLinearLayoutParameter(ctrl.widget, mo.LinearGravity.top, new mo.Margin(0, self._marginRight, 0, 0));
                    self._iconCtrlList.push(ctrl);
                    ctrl.attachWidgetTo(self.widget);
                }
                ctrl.widget.setVisible(true);
                ctrl.resetByData(stuff);
            }
            var ctrlList = self._iconCtrlList;
            for (var i = stuffArr.length, li = ctrlList.length; i < li; i++) {
                var ctrl = ctrlList[i];
                ctrl.widget.setVisible(false);
            }
            self.packContainer();
        };
        __egretProto__.packContainer = function () {
            var self = this;
            var container = self.widget;
            var listLen = self._dataLength;
            if (!listLen)
                return;
            var realW = self._iconCtrlList[0].widget.width * self._wScale;
            var realH = self._iconCtrlList[0].widget.height * self._wScale;
            var packedSize = new mo.Size(realW * listLen + self._marginRight * (listLen - 1), realH);
            container.setSize(packedSize);
            return packedSize;
        };
        __egretProto__.onItemClick = function (cb, target) {
            var self = this;
            self._itemClick = cb;
            self._itemClickTarget = target;
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            var ctrlList = self._iconCtrlList;
            for (var i = 0, li = ctrlList.length; i < li; i++) {
                var ctrl = ctrlList[i];
                ctrl.doDtor();
            }
            self._iconCtrlList = null;
        };
        UIMaterialListCtrl.__className = "UIMaterialListCtrl";
        return UIMaterialListCtrl;
    })(mo.WidgetCtrl);
    uw.UIMaterialListCtrl = UIMaterialListCtrl;
    UIMaterialListCtrl.prototype.__class__ = "uw.UIMaterialListCtrl";
})(uw || (uw = {}));

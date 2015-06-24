/**
* Created by lihex on 12/18/14.
*/
var mo;
(function (mo) {
    var VisibleRect = (function (_super) {
        __extends(VisibleRect, _super);
        function VisibleRect() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = VisibleRect.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._topLeft = mo.p(0, 0);
            self._topRight = mo.p(0, 0);
            self._top = mo.p(0, 0);
            self._bottomLeft = mo.p(0, 0);
            self._bottomRight = mo.p(0, 0);
            self._bottom = mo.p(0, 0);
            self._center = mo.p(0, 0);
            self._left = mo.p(0, 0);
            self._right = mo.p(0, 0);
            self._width = 0;
            self._height = 0;
            self._size = mo.size(0, 0);
        };
        __egretProto__.init = function () {
            var self = this;
            var stage = mo.getStage();
            var w = self._width = stage.stageWidth;
            var h = self._height = stage.stageHeight;
            self._size = mo.size(w, h);
            var x = stage.x;
            var y = stage.y;
            var left = x;
            var right = x + w;
            var middle = x + w / 2;
            self._top.y = self._topLeft.y = self._topRight.y = y;
            self._left.x = self._topLeft.x = self._bottomLeft.x = left;
            self._right.x = self._bottomRight.x = self._topRight.x = right;
            self._center.x = self._bottom.x = self._top.x = middle;
            self._bottom.y = self._bottomRight.y = self._bottomLeft.y = y + h;
            self._right.y = self._left.y = self._center.y = y + h / 2;
        };
        __egretProto__.getRect = function () {
            var size = this._size;
            return mo.rect(0, 0, size.width, size.height);
        };
        __egretProto__.getSize = function () {
            return mo.size(this._size);
        };
        __egretProto__.getWidth = function () {
            return this._width;
        };
        __egretProto__.getHeight = function () {
            return this._height;
        };
        __egretProto__.topLeft = function () {
            return mo.p(this._topLeft);
        };
        __egretProto__.topRight = function () {
            return mo.p(this._topRight);
        };
        __egretProto__.top = function () {
            return mo.p(this._top);
        };
        __egretProto__.bottomLeft = function () {
            return mo.p(this._bottomLeft);
        };
        __egretProto__.bottomRight = function () {
            return mo.p(this._bottomRight);
        };
        __egretProto__.bottom = function () {
            return mo.p(this._bottom);
        };
        __egretProto__.center = function () {
            return mo.p(this._center);
        };
        __egretProto__.left = function () {
            return mo.p(this._left);
        };
        __egretProto__.right = function () {
            return mo.p(this._right);
        };
        return VisibleRect;
    })(mo.Class);
    mo.VisibleRect = VisibleRect;
    VisibleRect.prototype.__class__ = "mo.VisibleRect";
    mo.visibleRect;
})(mo || (mo = {}));

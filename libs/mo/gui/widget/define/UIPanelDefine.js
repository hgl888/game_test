var mo;
(function (mo) {
    var LinearGravity;
    (function (LinearGravity) {
        LinearGravity.none = 0;
        LinearGravity.left = 1;
        LinearGravity.centerHorizontal = 2;
        LinearGravity.right = 3;
        LinearGravity.top = 4;
        LinearGravity.centerVertical = 5;
        LinearGravity.bottom = 6;
    })(LinearGravity = mo.LinearGravity || (mo.LinearGravity = {}));
})(mo || (mo = {}));
var mo;
(function (mo) {
    var RelativeAlign;
    (function (RelativeAlign) {
        RelativeAlign.alignNone = 0;
        RelativeAlign.alignParentTopLeft = 1;
        RelativeAlign.alignParentTopCenterHorizontal = 2;
        RelativeAlign.alignParentTopRight = 3;
        RelativeAlign.alignParentLeftCenterVertical = 4;
        RelativeAlign.centerInParent = 5;
        RelativeAlign.alignParentRightCenterVertical = 6;
        RelativeAlign.alignParentLeftBottom = 7;
        RelativeAlign.alignParentBottomCenterHorizontal = 8;
        RelativeAlign.alignParentRightBottom = 9;
    })(RelativeAlign = mo.RelativeAlign || (mo.RelativeAlign = {}));
})(mo || (mo = {}));
var mo;
(function (mo) {
    var LayoutParameterType;
    (function (LayoutParameterType) {
        LayoutParameterType.none = 0;
        LayoutParameterType.linear = 1;
        LayoutParameterType.relative = 2;
    })(LayoutParameterType = mo.LayoutParameterType || (mo.LayoutParameterType = {}));
})(mo || (mo = {}));
var mo;
(function (mo) {
    var Margin = (function () {
        //上右下左，保持和css样式一致
        function Margin(margin, right, bottom, left) {
            this.left = 0;
            this.top = 0;
            this.right = 0;
            this.bottom = 0;
            this.setMargin.apply(this, arguments);
        }
        var __egretProto__ = Margin.prototype;
        __egretProto__.setMargin = function (margin, right, bottom, left) {
            if (margin instanceof Margin) {
                this.top = margin.top || 0;
                this.right = margin.right || 0;
                this.bottom = margin.bottom || 0;
                this.left = margin.left || 0;
            }
            else if (margin instanceof Array) {
                this.top = margin[0] || 0;
                this.right = margin[1] || 0;
                this.bottom = margin[2] || 0;
                this.left = margin[3] || 0;
            }
            else {
                this.top = margin || 0;
                this.right = right || 0;
                this.bottom = bottom || 0;
                this.left = left || 0;
            }
        };
        __egretProto__.equals = function (target) {
            return (this.left == target.left && this.top == target.top && this.right == target.right && this.bottom == target.bottom);
        };
        return Margin;
    })();
    mo.Margin = Margin;
    Margin.prototype.__class__ = "mo.Margin";
    var Padding = (function () {
        //上右下左，保持和css样式一致
        function Padding(padding, right, bottom, left) {
            this.left = 0;
            this.top = 0;
            this.right = 0;
            this.bottom = 0;
            this.setMargin.apply(this, arguments);
        }
        var __egretProto__ = Padding.prototype;
        __egretProto__.setMargin = function (padding, right, bottom, left) {
            if (padding instanceof Margin) {
                this.top = padding.top || 0;
                this.right = padding.right || 0;
                this.bottom = padding.bottom || 0;
                this.left = padding.left || 0;
            }
            else if (padding instanceof Array) {
                this.top = padding[0] || 0;
                this.right = padding[1] || 0;
                this.bottom = padding[2] || 0;
                this.left = padding[3] || 0;
            }
            else {
                this.top = padding || 0;
                this.right = right || 0;
                this.bottom = bottom || 0;
                this.left = left || 0;
            }
        };
        __egretProto__.equals = function (target) {
            return (this.left == target.left && this.top == target.top && this.right == target.right && this.bottom == target.bottom);
        };
        return Padding;
    })();
    mo.Padding = Padding;
    Padding.prototype.__class__ = "mo.Padding";
})(mo || (mo = {}));
var mo;
(function (mo) {
    var LayoutBackGroundColorType;
    (function (LayoutBackGroundColorType) {
        LayoutBackGroundColorType.none = 0;
        LayoutBackGroundColorType.solid = 1;
        LayoutBackGroundColorType.gradient = 2;
    })(LayoutBackGroundColorType = mo.LayoutBackGroundColorType || (mo.LayoutBackGroundColorType = {}));
})(mo || (mo = {}));
var mo;
(function (mo) {
    var LayoutType;
    (function (LayoutType) {
        LayoutType.absolute = 0;
        LayoutType.linearVertical = 1;
        LayoutType.linearHorizontal = 2;
        LayoutType.relative = 3;
    })(LayoutType = mo.LayoutType || (mo.LayoutType = {}));
})(mo || (mo = {}));
var mo;
(function (mo) {
    var LayoutClippingType;
    (function (LayoutClippingType) {
        LayoutClippingType.stencil = 0;
        LayoutClippingType.scissor = 1;
    })(LayoutClippingType = mo.LayoutClippingType || (mo.LayoutClippingType = {}));
})(mo || (mo = {}));
var mo;
(function (mo) {
    var LayoutParameter = (function (_super) {
        __extends(LayoutParameter, _super);
        function LayoutParameter() {
            _super.apply(this, arguments);
            this._margin = new mo.Margin();
            this._type = mo.LayoutParameterType.none;
            this._padding = new mo.Padding();
        }
        var __egretProto__ = LayoutParameter.prototype;
        __egretProto__.setMargin = function (margin) {
            var marginObj = this._margin;
            marginObj.left = margin.left || 0;
            marginObj.top = margin.top || 0;
            marginObj.right = margin.right || 0;
            marginObj.bottom = margin.bottom || 0;
        };
        __egretProto__.getMargin = function () {
            return this._margin;
        };
        __egretProto__.getType = function () {
            return this._type;
        };
        __egretProto__.setPadding = function (padding) {
            var paddingObj = this._padding;
            paddingObj.left = padding.left || 0;
            paddingObj.top = padding.top || 0;
            paddingObj.right = padding.right || 0;
            paddingObj.bottom = padding.bottom || 0;
        };
        __egretProto__.getPadding = function () {
            return this._padding;
        };
        __egretProto__.clone = function () {
            var parameter = new this.__class();
            parameter.copyProperties(this);
            return parameter;
        };
        __egretProto__.copyProperties = function (model) {
            this._margin.left = model._margin.left || 0;
            this._margin.top = model._margin.top || 0;
            this._margin.right = model._margin.right || 0;
            this._margin.bottom = model._margin.bottom || 0;
        };
        LayoutParameter.LINEAR_ALIGN_HT_LEFT = 0;
        LayoutParameter.LINEAR_ALIGN_HT_RIGHT = 1;
        return LayoutParameter;
    })(mo.Class);
    mo.LayoutParameter = LayoutParameter;
    LayoutParameter.prototype.__class__ = "mo.LayoutParameter";
    var LinearLayoutParameter = (function (_super) {
        __extends(LinearLayoutParameter, _super);
        function LinearLayoutParameter() {
            _super.apply(this, arguments);
            //@override
            this._type = mo.LayoutParameterType.linear;
        }
        var __egretProto__ = LinearLayoutParameter.prototype;
        __egretProto__._setGravity = function (gravity) {
            this._gravity = gravity;
        };
        Object.defineProperty(__egretProto__, "gravity", {
            get: function () {
                return this._gravity;
            },
            set: function (gravity) {
                this._setGravity(gravity);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @deprecated
         * @param gravity
         */
        __egretProto__.setGravity = function (gravity) {
            this._setGravity(gravity);
        };
        /**
         * @deprecated
         */
        __egretProto__.getGravity = function () {
            return this._gravity;
        };
        //@override
        __egretProto__.copyProperties = function (model) {
            _super.prototype.copyProperties.call(this, model);
            this._setGravity(model._gravity);
        };
        return LinearLayoutParameter;
    })(LayoutParameter);
    mo.LinearLayoutParameter = LinearLayoutParameter;
    LinearLayoutParameter.prototype.__class__ = "mo.LinearLayoutParameter";
    var RelativeLayoutParameter = (function (_super) {
        __extends(RelativeLayoutParameter, _super);
        function RelativeLayoutParameter() {
            _super.apply(this, arguments);
            //@override
            this._type = mo.LayoutParameterType.relative;
            this._put = false;
            this._align = mo.RelativeAlign.alignNone;
        }
        var __egretProto__ = RelativeLayoutParameter.prototype;
        __egretProto__._setAlign = function (align) {
            this._align = align;
        };
        Object.defineProperty(__egretProto__, "align", {
            get: function () {
                return this._align;
            },
            set: function (align) {
                this._setAlign(align);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @deprecated
         * @param align
         */
        __egretProto__.setAlign = function (align) {
            this._setAlign(align);
        };
        /**
         * @deprecated
         */
        __egretProto__.getAlign = function () {
            return this._align;
        };
        //@override
        __egretProto__.copyProperties = function (model) {
            _super.prototype.copyProperties.call(this, model);
            this._setAlign(model._align);
        };
        return RelativeLayoutParameter;
    })(LayoutParameter);
    mo.RelativeLayoutParameter = RelativeLayoutParameter;
    RelativeLayoutParameter.prototype.__class__ = "mo.RelativeLayoutParameter";
    var _UIPanelOption = (function (_super) {
        __extends(_UIPanelOption, _super);
        function _UIPanelOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _UIPanelOption.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.layoutType = mo.LayoutType.absolute; //布局类型
            self.doLayoutDirty = true;
            self.clippingEnabled = false; //是否开启裁剪
            self.clippingDirty = false;
            self.bgOpacity = 0;
            self.bgColor = 0;
            self.bgColorDirty = false;
            self.bgTexture = null;
            self.graphics = null; //获取 Shape 中的 Graphics 对象。【只读】
            self.autoSizeEnabled = false; //是否启用自动大小设置。只有当其为线性布局是才有用。
            self.richText = null;
            self.childSrcSizeMap = null;
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            self.graphics = null; //获取 Shape 中的 Graphics 对象。【只读】
            self.scale9Grid = null;
            self.richText = null;
            self.childSrcSizeMap = null;
        };
        return _UIPanelOption;
    })(mo._UIWidgetOption);
    mo._UIPanelOption = _UIPanelOption;
    _UIPanelOption.prototype.__class__ = "mo._UIPanelOption";
})(mo || (mo = {}));

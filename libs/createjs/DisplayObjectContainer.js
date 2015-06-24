var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by 晋 on 2015/2/5.
 */
var createjs;
(function (createjs) {
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            _super.call(this);
            this._off = false;
            this._container = new egret.DisplayObjectContainer();
            this._holder = new egret.DisplayObjectContainer();
            _super.prototype.addChild.call(this, this._container);
            this._container.addChild(this._holder);
            this.id = G.getId();
        }
        DisplayObjectContainer.prototype.addChild = function (child) {
            return this._holder.addChild(child);
        };
        DisplayObjectContainer.prototype.getChildAt = function (index) {
            return this._holder.getChildAt(index);
        };
        Object.defineProperty(DisplayObjectContainer.prototype, "numChildren", {
            get: function () {
                return this._holder.numChildren;
            },
            enumerable: true,
            configurable: true
        });
        DisplayObjectContainer.prototype.removeChildAt = function (index) {
            return this._holder.removeChildAt(index);
        };
        DisplayObjectContainer.prototype.removeChild = function (child) {
            return this._holder.removeChild(child);
        };
        DisplayObjectContainer.prototype.getChildIndex = function (child) {
            return this._holder.getChildIndex(child);
        };
        DisplayObjectContainer.prototype.setChildIndex = function (child, index) {
            this._holder.setChildIndex(child, index);
        };
        DisplayObjectContainer.prototype.setBounds = function (x, y, width, height) {
            //this._holder.x= (x || 0 );
            //this._holder.y= (y || 0 );
        };
        Object.defineProperty(DisplayObjectContainer.prototype, "regX", {
            get: function () {
                return -this._holder.x;
            },
            set: function (value) {
                this._holder.x = -value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObjectContainer.prototype, "regY", {
            get: function () {
                return -this._holder.y;
            },
            set: function (value) {
                this._holder.y = -value;
            },
            enumerable: true,
            configurable: true
        });
        DisplayObjectContainer.prototype.setTransform = function (x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
            this.x = x || 0;
            this.y = y || 0;
            this.scaleX = scaleX == null ? 1 : scaleX;
            this.scaleY = scaleY == null ? 1 : scaleY;
            this.rotation = rotation || 0;
            this.skewX = skewX || 0;
            this.skewY = skewY || 0;
            //this.anchorX = (regX || 0 ) / this.width;
            //this.anchorY = (regY || 0) / this.height;
            if (regX != null)
                this._holder.x = -regX;
            if (regY != null)
                this._holder.y = -regY;
            return this;
        };
        DisplayObjectContainer.prototype.countTouchEnabled = function () {
            var list = [this._onClick, this._onPress, this._onMouseMove, this._onMouseUp];
            for (var i = 0; i < list.length; i++) {
                if (list[i]) {
                    return this.touchEnabled = true;
                }
            }
            return this.touchEnabled = false;
        };
        Object.defineProperty(DisplayObjectContainer.prototype, "onClick", {
            //click
            set: function (value) {
                this._onClick = value;
                if (this._onClick) {
                    this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
                }
                else {
                    this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
                }
                this.countTouchEnabled();
            },
            enumerable: true,
            configurable: true
        });
        DisplayObjectContainer.prototype.onTouchTap = function (event) {
            if (this._onClick)
                this._onClick.apply(this, [event]);
        };
        Object.defineProperty(DisplayObjectContainer.prototype, "onPress", {
            //press
            set: function (value) {
                this._onPress = value;
                if (this._onPress) {
                    this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                }
                else {
                    this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                }
                this.countTouchEnabled();
            },
            enumerable: true,
            configurable: true
        });
        DisplayObjectContainer.prototype.onTouchBegin = function (event) {
            if (this._onPress)
                this._onPress.apply(this, [event]);
        };
        Object.defineProperty(DisplayObjectContainer.prototype, "onMouseMove", {
            //mousemove
            set: function (value) {
                this._onMouseMove = value;
                if (this._onMouseMove) {
                    G.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                }
                else {
                    G.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                }
                this.countTouchEnabled();
            },
            enumerable: true,
            configurable: true
        });
        DisplayObjectContainer.prototype.onTouchMove = function (event) {
            if (this._onMouseMove)
                this._onMouseMove.apply(this, [event]);
        };
        Object.defineProperty(DisplayObjectContainer.prototype, "onMouseUp", {
            //mouseup
            set: function (value) {
                this._onMouseUp = value;
                if (this._onMouseUp) {
                    G.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this._onRemoveFromStage, this);
                }
                else {
                    G.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                }
                this.countTouchEnabled();
            },
            enumerable: true,
            configurable: true
        });
        DisplayObjectContainer.prototype.onTouchEnd = function (event) {
            if (this._onMouseUp)
                this._onMouseUp.apply(this, [event]);
        };
        DisplayObjectContainer.prototype.dispose = function () {
            this.onClick = null;
            this.onPress = null;
            this.onMouseMove = null;
            this.onMouseUp = null;
            var child;
            for (var i = 0, l = this.numChildren; i < l; i++) {
                child = this.getChildAt(i);
                if (child instanceof createjs.DisplayObjectContainer) {
                    child.dispose();
                }
            }
        };
        DisplayObjectContainer.prototype._onRemoveFromStage = function () {
            this.onMouseMove = null;
            this.onMouseUp = null;
        };
        Object.defineProperty(DisplayObjectContainer.prototype, "dMask", {
            get: function () {
                return this._maskObj;
            },
            set: function (value) {
                if (!this.parent && value && !value.isMaskGlobal) {
                    this._tempMask = value;
                    return;
                }
                if (this._maskObj)
                    this._maskObj.maskTarget = null;
                if (value) {
                    this.cacheAsBitmap = true;
                    value.maskTarget = this;
                }
                else {
                    this.cacheAsBitmap = false;
                    this.cleanMask();
                }
                this._maskObj = value;
            },
            enumerable: true,
            configurable: true
        });
        DisplayObjectContainer.prototype._makeBitmapCache = function () {
            if (this._maskObj) {
                var oldPoint = new egret.Point(this._maskObj.x, this._maskObj.y);
                if (!this._maskpoint || this._maskObj['changed']) {
                    var point = !this.parent ? this._maskObj.localToGlobal() : this.parent.localToGlobal(this._maskObj.x, this._maskObj.y);
                    point = this.globalToLocal(point.x, point.y);
                    this._maskpoint = point;
                    this._maskObj['changed'] = false;
                }
                var mh = new createjs.DisplayObjectContainer();
                this._maskObj._setX(this._maskpoint.x);
                this._maskObj._setY(this._maskpoint.y);
                mh.addChild(this._maskObj);
                var r = new egret.RenderTexture();
                r.drawToTexture(mh, this._container.getBounds());
                mh.removeChild(this._maskObj);
                this._maskObj._setX(oldPoint.x);
                this._maskObj._setY(oldPoint.y);
                var bitmap = new egret.Bitmap(r);
                bitmap.blendMode = egret.BlendMode.ERASE_REVERSE;
                //bitmap.x=this._maskpoint.x;
                //bitmap.y=this._maskpoint.y;
                _super.prototype.addChild.call(this, bitmap);
                if (!this._maskTexture) {
                    this._maskTexture = new egret.RenderTexture();
                }
                this._maskTexture.drawToTexture(this);
                _super.prototype.removeChild.call(this, bitmap);
                r.dispose();
                this._texture_to_render = this._maskTexture;
            }
            else {
                this.cleanMask();
            }
            return true;
        };
        DisplayObjectContainer.prototype.cleanMask = function () {
            if (this._maskTexture) {
                this._maskTexture.dispose();
                this._maskTexture = null;
            }
        };
        DisplayObjectContainer.prototype.maskChange = function () {
            if (this._maskObj) {
                if (!this._maskObj.isMaskGlobal) {
                    this._maskpoint = null;
                }
                this['_setCacheDirty']();
            }
        };
        DisplayObjectContainer.prototype._onAddToStage = function () {
            _super.prototype._onAddToStage.call(this);
            if (this._tempMask) {
                this.dMask = this._tempMask;
                this._tempMask = null;
            }
        };
        Object.defineProperty(DisplayObjectContainer.prototype, "scaleX", {
            get: function () {
                return this._container.scaleX;
            },
            set: function (value) {
                this._container.scaleX = value;
                this.setDirty();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObjectContainer.prototype, "scaleY", {
            get: function () {
                return this._container.scaleY;
            },
            set: function (value) {
                this._container.scaleY = value;
                this.setDirty();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObjectContainer.prototype, "rotation", {
            get: function () {
                return this._container.rotation;
            },
            set: function (value) {
                this._container.rotation = value;
                this.setDirty();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObjectContainer.prototype, "skewX", {
            get: function () {
                return this._container.skewX;
            },
            set: function (value) {
                this._container.skewX = value;
                this.setDirty();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObjectContainer.prototype, "skewY", {
            get: function () {
                return this._container.skewY;
            },
            set: function (value) {
                this._container.skewY = value;
            },
            enumerable: true,
            configurable: true
        });
        DisplayObjectContainer.prototype.setDirty = function () {
            var o = this._parent;
            while (o) {
                o['_setCacheDirty']();
                o = o._parent;
            }
        };
        return DisplayObjectContainer;
    })(egret.DisplayObjectContainer);
    createjs.DisplayObjectContainer = DisplayObjectContainer;
    DisplayObjectContainer.prototype.__class__ = "createjs.DisplayObjectContainer";
})(createjs || (createjs = {}));

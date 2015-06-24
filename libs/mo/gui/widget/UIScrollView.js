var mo;
(function (mo) {
    mo.scrollEnabled = true; //用于全局控制是否能滚动的开关
    var UIScrollView = (function (_super) {
        __extends(UIScrollView, _super);
        function UIScrollView(width, height) {
            _super.call(this, width, height);
            var self = this;
            var innerContainer = self._scrollOption.innerContainer;
            innerContainer._setWidth(self.width);
            innerContainer._setHeight(self.height);
            innerContainer._setTouchEnabled(false);
            self._initBoundary();
            innerContainer.x = 0;
            innerContainer.y = 0;
        }
        var __egretProto__ = UIScrollView.prototype;
        Object.defineProperty(__egretProto__, "innerContainer", {
            get: function () {
                return this._scrollOption.innerContainer;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._setDirection = function (direction) {
            this._scrollOption.direction = direction;
        };
        Object.defineProperty(__egretProto__, "direction", {
            get: function () {
                return this._scrollOption.direction;
            },
            set: function (direction) {
                this._setDirection(direction);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @deprecated
         * @param direction
         */
        __egretProto__.setDirection = function (direction) {
            this._setDirection(direction);
        };
        /**
         * @deprecated
         * @returns {number}
         */
        __egretProto__.getDirection = function () {
            return this._scrollOption.direction;
        };
        __egretProto__._setBounceEnabled = function (bounceEnabled) {
            this._scrollOption.bounceEnabled = bounceEnabled;
        };
        Object.defineProperty(__egretProto__, "bounceEnabled", {
            get: function () {
                return this._scrollOption.bounceEnabled;
            },
            set: function (bounceEnabled) {
                this._setBounceEnabled(bounceEnabled);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @deprecated
         * @param bounceEnabled
         */
        __egretProto__.setBounceEnabled = function (bounceEnabled) {
            this._setBounceEnabled(bounceEnabled);
        };
        /**
         * @param direction
         */
        __egretProto__.isBounceEnabled = function () {
            return this._scrollOption.bounceEnabled;
        };
        Object.defineProperty(__egretProto__, "longTouchWhenScrollingEnabled", {
            get: function () {
                return this._scrollOption.longTouchWhenScrollingEnabled;
            },
            set: function (longTouchWhenScrollingEnabled) {
                this._scrollOption.longTouchWhenScrollingEnabled = longTouchWhenScrollingEnabled;
            },
            enumerable: true,
            configurable: true
        });
        //=================getter/setter 结束===================
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            var scrollOption = self._scrollOption = new mo._ScrollOption();
            _super.prototype.addChild.call(this, scrollOption.innerContainer); //注意，这里要用super
            self._touchOption.hitChildrenEnabled = true; //
            self._setTouchEnabled(true);
            self._setClippingEnabled(true);
            self._updateEnabled = false;
        };
        __egretProto__.setSize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.prototype.setSize.apply(this, arguments);
            this._updateClipping();
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            this._touchOption.doDtor();
            this._scrollOption.doDtor();
        };
        __egretProto__.hitTest = function (x, y, ignoreTouchEnabled) {
            if (ignoreTouchEnabled === void 0) { ignoreTouchEnabled = false; }
            var self = this, touchOption = self._touchOption;
            if (touchOption.bePressed) {
                var bound = this._getSize(egret.Rectangle.identity);
                if (0 <= x && x < bound.width && 0 <= y && y < bound.height) {
                    //这里是为了解决moveOut
                    touchOption.isIn = true;
                    return self;
                }
                else {
                    touchOption.isIn = false;
                }
            }
            else {
                //这里还要做一个viewRect的判断，如果不在这个区域内，就直接返回
                var bound = this._getSize(egret.Rectangle.identity);
                if (0 <= x && x < bound.width && 0 <= y && y < bound.height) {
                    return _super.prototype.hitTest.call(this, x, y, ignoreTouchEnabled);
                }
                else {
                    return null;
                }
            }
        };
        __egretProto__.setUpdateEnabled = function (updateEnabled) {
            var self = this;
            if (self._updateEnabled == updateEnabled)
                return;
            self._updateEnabled = updateEnabled;
            if (updateEnabled) {
                mo.tick(self.update, self);
            }
            else {
                mo.clearTick(self.update, self);
            }
        };
        //@override
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            this.setUpdateEnabled(true);
        };
        //@override
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            if (this._updateEnabled) {
                mo.clearTick(this.update, this);
                this._updateEnabled = false; //暂时解决scrollView重新回来时不能滚动的问题。
            }
        };
        /**
         * 初始化边界
         * @private
         */
        __egretProto__._initBoundary = function () {
            var self = this, scrollOption = self._scrollOption;
            var innerContainer = scrollOption.innerContainer, width = self.width, height = self.height;
            scrollOption.topBoundary = 0;
            scrollOption.bottomBoundary = height;
            scrollOption.leftBoundary = 0;
            scrollOption.rightBoundary = width;
            var bounceBoundaryParameterX = width / 3;
            var bounceBoundaryParameterY = height / 3;
            scrollOption.bounceLeftBoundary = bounceBoundaryParameterX;
            scrollOption.bounceRightBoundary = width - bounceBoundaryParameterX;
            scrollOption.bounceTopBoundary = bounceBoundaryParameterY;
            scrollOption.bounceBottomBoundary = height - bounceBoundaryParameterY;
            innerContainer.width = Math.max(innerContainer.width, width);
            innerContainer.height = Math.max(innerContainer.height, height);
        };
        //@override
        __egretProto__._onNodeSizeDirty = function () {
            _super.prototype._onNodeSizeDirty.call(this);
            var self = this;
            self._initBoundary();
        };
        __egretProto__.setInnerContainerSize = function (size) {
            var self = this;
            var innerContainer = self._scrollOption.innerContainer;
            var innerSizeWidth = self.width;
            var innerSizeHeight = self.height;
            var oldWidth = innerContainer.width, oldHeight = innerContainer.height;
            if (size.width < self.width) {
                mo.warn(mo.MSG_INNER_SIZE_RESET);
            }
            else {
                innerSizeWidth = size.width;
            }
            if (size.height < self.height) {
                mo.warn(mo.MSG_INNER_SIZE_RESET);
            }
            else {
                innerSizeHeight = size.height;
            }
            innerContainer.width = innerSizeWidth;
            innerContainer.height = innerSizeHeight;
            self._initBoundary();
            //            switch (this._direction) {
            //                case ScrollViewDir.vertical:
            //                    var offset = oldHeight - innerContainer.height;
            //                    this.scrollChildren(0, offset);
            //                    break;
            //                case ScrollViewDir.horizontal:
            //                    if (this._innerContainer.getRightInParent() <= locSize.width) {
            //                        var offset = oldWidth - innerContainer.width;
            //                        this.scrollChildren(offset, 0);
            //                    }
            //                    break;
            //                case ScrollViewDir.both:
            //                    var offsetY = oldHeight - innerContainer.height;
            //                    var offsetX = 0;
            //                    if (innerContainer.getRightInParent() <= locSize.width) {
            //                        offsetX = oldWidth - innerContainer.width;
            //                    }
            //                    this.scrollChildren(offsetX, offsetY);
            //                    break;
            //                default:
            //                    break;
            //            }
            //            var innerSize = innerContainer.getSize();
            //            var innerPos = innerContainer.getPosition();
            //            var innerAP = innerContainer.getAnchorPoint();
            //            if (innerContainer.getLeftInParent() > 0.0) {
            //                innerContainer.setPosition(p(innerAP.x * innerSize.width, innerPos.y));
            //            }
            //            if (innerContainer.getRightInParent() < locSize.width) {
            //                innerContainer.setPosition(p(locSize.width - ((1.0 - innerAP.x) * innerSize.width), innerPos.y));
            //            }
            //            if (innerPos.y > 0.0) {
            //                innerContainer.setPosition(p(innerPos.x, innerAP.y * innerSize.height));
            //            }
            //            if (innerContainer.getTopInParent() < locSize.height) {
            //                innerContainer.setPosition(p(innerPos.x, locSize.height - (1.0 - innerAP.y) * innerSize.height));
            //            }
        };
        __egretProto__._dispatchScrollEnd = function () {
            var self = this, eventType = self.__class.SCROLL_END;
            if (self.willTrigger(eventType)) {
                var event = new mo.Event(eventType);
                self.dispatchEvent(event);
            }
        };
        __egretProto__.getInnerContainer = function () {
            return this._scrollOption.innerContainer;
        };
        __egretProto__.getInnerContainerSize = function () {
            return this._scrollOption.innerContainer.getSize();
        };
        __egretProto__.moveChildren = function (offsetX, offsetY) {
            var scrollOption = this._scrollOption, ic = scrollOption.innerContainer;
            ic.x = scrollOption.moveChildPoint.x = ic.x + offsetX;
            ic.y = scrollOption.moveChildPoint.y = ic.y + offsetY;
        };
        __egretProto__.autoScrollChildren = function (dt) {
            var self = this, scrollOption = self._scrollOption, lastTime = scrollOption.autoScrollAddUpTime, asoSpeed = scrollOption.autoScrollOriginalSpeed;
            scrollOption.autoScrollAddUpTime += dt;
            if (scrollOption.isAutoScrollSpeedAttenuated) {
                var nowSpeed = asoSpeed + scrollOption.autoScrollAcceleration * scrollOption.autoScrollAddUpTime / 1000;
                //                console.log("--->", asoSpeed, self._autoScrollAcceleration, self._autoScrollAddUpTime, nowSpeed);
                if (nowSpeed <= 0) {
                    self.stopAutoScrollChildren();
                    if (!self.checkNeedBounce()) {
                        self._dispatchScrollEnd();
                    }
                }
                else {
                    var timeParam = lastTime * 2 + dt;
                    var offset = (asoSpeed + scrollOption.autoScrollAcceleration * timeParam * 0.5 / 1000) * dt / 1000;
                    var offsetX = offset * scrollOption.autoScrollDir.x;
                    var offsetY = offset * scrollOption.autoScrollDir.y;
                    //                    console.log("offset", offset, offsetX, offsetY, self._autoScrollDir.x, self._autoScrollDir.y);
                    if (!self.scrollChildren(offsetX, offsetY)) {
                        self.stopAutoScrollChildren();
                        if (!self.checkNeedBounce()) {
                            self._dispatchScrollEnd();
                        }
                    }
                }
            }
            else {
                var offsetX = scrollOption.autoScrollDir.x * dt * asoSpeed / 1000;
                var offsetY = scrollOption.autoScrollDir.y * dt * asoSpeed / 1000;
                if (scrollOption.needCheckAutoScrollDestination) {
                    var notDone = self.checkCustomScrollDestination(offsetX, offsetY);
                    var scrollCheck = self.scrollChildren(offsetX, offsetY);
                    if (!notDone || !scrollCheck) {
                        self.stopAutoScrollChildren();
                        if (!self.checkNeedBounce()) {
                            self._dispatchScrollEnd();
                        }
                    }
                }
                else {
                    if (!self.scrollChildren(offsetX, offsetY)) {
                        self.stopAutoScrollChildren();
                        if (!self.checkNeedBounce()) {
                            self._dispatchScrollEnd();
                        }
                    }
                }
            }
        };
        __egretProto__.bounceChildren = function (dt) {
            var self = this, scrollOption = self._scrollOption, locSpeed = scrollOption.bounceOriginalSpeed, locBounceDir = scrollOption.bounceDir;
            if (locSpeed <= 0.0) {
                self.stopBounceChildren();
                self._dispatchScrollEnd();
            }
            if (!self.bounceScrollChildren(locBounceDir.x * dt * locSpeed / 1000, locBounceDir.y * dt * locSpeed / 1000)) {
                self.stopBounceChildren();
                self._dispatchScrollEnd();
            }
        };
        __egretProto__.checkNeedBounce = function () {
            var self = this, scrollOption = self._scrollOption;
            if (!scrollOption.bounceEnabled) {
                return false;
            }
            self.checkBounceBoundary();
            var scrollVector;
            var container = self._scrollOption.innerContainer;
            var tbn = scrollOption.topBounceNeeded, bbn = scrollOption.bottomBounceNeeded, lbn = scrollOption.leftBounceNeeded, rbn = scrollOption.rightBounceNeeded;
            var width = self.width, height = self.height;
            if (tbn && lbn) {
                scrollVector = mo.p(0.0, 0).sub(mo.p(container.getLeftInParent(), container.getTopInParent()));
            }
            else if (tbn && rbn) {
                scrollVector = mo.p(width, 0).sub(mo.p(container.getRightInParent(), container.getTopInParent()));
            }
            else if (bbn && lbn) {
                scrollVector = mo.p(0, height).sub(mo.p(container.getLeftInParent(), container.getBottomInParent()));
            }
            else if (bbn && rbn) {
                scrollVector = mo.p(width, height).sub(mo.p(container.getRightInParent(), container.getBottomInParent()));
            }
            else if (tbn) {
                scrollVector = mo.p(0, 0).sub(mo.p(0.0, container.getTopInParent()));
            }
            else if (bbn) {
                scrollVector = mo.p(0, height).sub(mo.p(0.0, container.getBottomInParent()));
            }
            else if (lbn) {
                scrollVector = mo.p(0, 0).sub(mo.p(container.getLeftInParent(), 0.0));
            }
            else if (rbn) {
                scrollVector = mo.p(width, 0).sub(mo.p(container.getRightInParent(), 0.0));
            }
            if (scrollVector) {
                var orSpeed = scrollVector.length / 0.2;
                scrollOption.bounceDir = scrollVector.normalize();
                this.startBounceChildren(orSpeed);
                return true;
            }
            return false;
        };
        __egretProto__.checkBounceBoundary = function () {
            var self = this, container = self._scrollOption.innerContainer, scrollOption = self._scrollOption;
            var icBottomPos = container.getBottomInParent();
            if (icBottomPos < scrollOption.bottomBoundary) {
                self.scrollToBottomEvent();
                scrollOption.bottomBounceNeeded = true;
            }
            else {
                scrollOption.bottomBounceNeeded = false;
            }
            var icTopPos = container.getTopInParent();
            if (icTopPos > scrollOption.topBoundary) {
                self.scrollToTopEvent();
                scrollOption.topBounceNeeded = true;
            }
            else {
                scrollOption.topBounceNeeded = false;
            }
            var icRightPos = container.getRightInParent();
            if (icRightPos < scrollOption.rightBoundary) {
                self.scrollToRightEvent();
                scrollOption.rightBounceNeeded = true;
            }
            else {
                scrollOption.rightBounceNeeded = false;
            }
            var icLeftPos = container.getLeftInParent();
            if (icLeftPos > scrollOption.leftBoundary) {
                self.scrollToLeftEvent();
                scrollOption.leftBounceNeeded = true;
            }
            else {
                scrollOption.leftBounceNeeded = false;
            }
        };
        __egretProto__.startBounceChildren = function (v) {
            var self = this, scrollOption = self._scrollOption;
            scrollOption.bounceOriginalSpeed = v; //设置回弹速度
            scrollOption.bouncing = true; //设置正在回弹状态
        };
        __egretProto__.stopBounceChildren = function () {
            var self = this, scrollOption = self._scrollOption;
            scrollOption.bouncing = false; //设置正在回弹状态为false
            scrollOption.bounceOriginalSpeed = 0.0; //设置回弹速度为0
            //重置边界回弹校验为false
            scrollOption.leftBounceNeeded = false;
            scrollOption.rightBounceNeeded = false;
            scrollOption.topBounceNeeded = false;
            scrollOption.bottomBounceNeeded = false;
        };
        __egretProto__.startAutoScrollChildrenWithOriginalSpeed = function (dir, v, attenuated, acceleration) {
            var self = this, scrollOption = self._scrollOption;
            self.stopAutoScrollChildren(); //每次开始时先停止
            scrollOption.autoScrollDir = dir;
            scrollOption.isAutoScrollSpeedAttenuated = attenuated;
            scrollOption.autoScrollOriginalSpeed = v;
            scrollOption.autoScroll = true;
            scrollOption.autoScrollAcceleration = acceleration;
        };
        __egretProto__.stopAutoScrollChildren = function () {
            var self = this, scrollOption = self._scrollOption;
            scrollOption.autoScroll = false;
            scrollOption.autoScrollOriginalSpeed = 0;
            scrollOption.autoScrollAddUpTime = 0;
        };
        __egretProto__.bounceScrollChildren = function (touchOffsetX, touchOffsetY) {
            var self = this, container = self._scrollOption.innerContainer, scrollOption = self._scrollOption;
            var scrollEnabled = true;
            if (touchOffsetX > 0.0 && touchOffsetY < 0.0) {
                var realOffsetX = touchOffsetX;
                var realOffsetY = touchOffsetY;
                var icRightPos = container.getRightInParent();
                if (icRightPos + realOffsetX >= scrollOption.rightBoundary) {
                    realOffsetX = scrollOption.rightBoundary - icRightPos;
                    self.bounceRightEvent();
                    scrollEnabled = false;
                }
                var icTopPos = container.getTopInParent();
                if (icTopPos + touchOffsetY <= scrollOption.topBoundary) {
                    realOffsetY = scrollOption.topBoundary - icTopPos;
                    self.bounceTopEvent();
                    scrollEnabled = false;
                }
                self.moveChildren(realOffsetX, realOffsetY);
            }
            else if (touchOffsetX < 0.0 && touchOffsetY < 0.0) {
                var realOffsetX = touchOffsetX;
                var realOffsetY = touchOffsetY;
                var icLefrPos = container.getLeftInParent();
                if (icLefrPos + realOffsetX <= scrollOption.leftBoundary) {
                    realOffsetX = scrollOption.leftBoundary - icLefrPos;
                    self.bounceLeftEvent();
                    scrollEnabled = false;
                }
                var icTopPos = container.getTopInParent();
                if (icTopPos + touchOffsetY <= scrollOption.topBoundary) {
                    realOffsetY = scrollOption.topBoundary - icTopPos;
                    self.bounceTopEvent();
                    scrollEnabled = false;
                }
                self.moveChildren(realOffsetX, realOffsetY);
            }
            else if (touchOffsetX < 0.0 && touchOffsetY > 0.0) {
                var realOffsetX = touchOffsetX;
                var realOffsetY = touchOffsetY;
                var icLefrPos = container.getLeftInParent();
                if (icLefrPos + realOffsetX <= scrollOption.leftBoundary) {
                    realOffsetX = scrollOption.leftBoundary - icLefrPos;
                    self.bounceLeftEvent();
                    scrollEnabled = false;
                }
                var icBottomPos = container.getBottomInParent();
                if (icBottomPos + touchOffsetY >= scrollOption.bottomBoundary) {
                    realOffsetY = scrollOption.bottomBoundary - icBottomPos;
                    self.bounceBottomEvent();
                    scrollEnabled = false;
                }
                self.moveChildren(realOffsetX, realOffsetY);
            }
            else if (touchOffsetX > 0.0 && touchOffsetY > 0.0) {
                var realOffsetX = touchOffsetX;
                var realOffsetY = touchOffsetY;
                var icRightPos = container.getRightInParent();
                if (icRightPos + realOffsetX >= scrollOption.rightBoundary) {
                    realOffsetX = scrollOption.rightBoundary - icRightPos;
                    self.bounceRightEvent();
                    scrollEnabled = false;
                }
                var icBottomPos = container.getBottomInParent();
                if (icBottomPos + touchOffsetY >= scrollOption.bottomBoundary) {
                    realOffsetY = scrollOption.bottomBoundary - icBottomPos;
                    self.bounceBottomEvent();
                    scrollEnabled = false;
                }
                self.moveChildren(realOffsetX, realOffsetY);
            }
            else if (touchOffsetX == 0.0 && touchOffsetY < 0.0) {
                var realOffsetY = touchOffsetY;
                var icTopPos = container.getTopInParent();
                if (icTopPos + touchOffsetY <= scrollOption.topBoundary) {
                    realOffsetY = scrollOption.topBoundary - icTopPos;
                    self.bounceTopEvent();
                    scrollEnabled = false;
                }
                self.moveChildren(0.0, realOffsetY);
            }
            else if (touchOffsetX == 0.0 && touchOffsetY > 0.0) {
                var realOffsetY = touchOffsetY;
                var icBottomPos = container.getBottomInParent();
                if (icBottomPos + touchOffsetY >= scrollOption.bottomBoundary) {
                    realOffsetY = scrollOption.bottomBoundary - icBottomPos;
                    self.bounceBottomEvent();
                    scrollEnabled = false;
                }
                self.moveChildren(0.0, realOffsetY);
            }
            else if (touchOffsetX > 0.0 && touchOffsetY == 0.0) {
                var realOffsetX = touchOffsetX;
                var icRightPos = container.getRightInParent();
                if (icRightPos + realOffsetX >= scrollOption.rightBoundary) {
                    realOffsetX = scrollOption.rightBoundary - icRightPos;
                    self.bounceRightEvent();
                    scrollEnabled = false;
                }
                self.moveChildren(realOffsetX, 0.0);
            }
            else if (touchOffsetX < 0.0 && touchOffsetY == 0.0) {
                var realOffsetX = touchOffsetX;
                var icLeftPos = container.getLeftInParent();
                if (icLeftPos + realOffsetX <= scrollOption.leftBoundary) {
                    realOffsetX = scrollOption.leftBoundary - icLeftPos;
                    self.bounceLeftEvent();
                    scrollEnabled = false;
                }
                self.moveChildren(realOffsetX, 0.0);
            }
            return scrollEnabled;
        };
        __egretProto__.checkCustomScrollDestination = function (touchOffsetX, touchOffsetY) {
            var self = this, container = self._scrollOption.innerContainer, scrollOption = self._scrollOption, dir = scrollOption.autoScrollDir, dest = scrollOption.autoScrollDestination;
            var scrollEnabled = true;
            switch (scrollOption.direction) {
                case mo.ScrollViewDir.vertical:
                    if (dir.y > 0) {
                        var icBottomPos = container.getBottomInParent();
                        if (icBottomPos + touchOffsetY >= dest.y) {
                            touchOffsetY = dest.y - icBottomPos;
                            scrollEnabled = false;
                        }
                    }
                    else {
                        var icBottomPos = container.getBottomInParent();
                        if (icBottomPos + touchOffsetY <= dest.y) {
                            touchOffsetY = dest.y - icBottomPos;
                            scrollEnabled = false;
                        }
                    }
                    break;
                case mo.ScrollViewDir.horizontal:
                    if (dir.x > 0) {
                        var icLeftPos = container.getLeftInParent();
                        if (icLeftPos + touchOffsetX >= dest.x) {
                            touchOffsetX = dest.x - icLeftPos;
                            scrollEnabled = false;
                        }
                    }
                    else {
                        var icLeftPos = container.getLeftInParent();
                        if (icLeftPos + touchOffsetX <= dest.x) {
                            touchOffsetX = dest.x - icLeftPos;
                            scrollEnabled = false;
                        }
                    }
                    break;
                case mo.ScrollViewDir.both:
                    if (touchOffsetX > 0.0 && touchOffsetY > 0.0) {
                        var icLeftPos = container.getLeftInParent();
                        if (icLeftPos + touchOffsetX >= dest.x) {
                            touchOffsetX = dest.x - icLeftPos;
                            scrollEnabled = false;
                        }
                        var icBottomPos = container.getBottomInParent();
                        if (icBottomPos + touchOffsetY >= dest.y) {
                            touchOffsetY = dest.y - icBottomPos;
                            scrollEnabled = false;
                        }
                    }
                    else if (touchOffsetX < 0.0 && touchOffsetY > 0.0) {
                        var icRightPos = container.getRightInParent();
                        if (icRightPos + touchOffsetX <= dest.x) {
                            touchOffsetX = dest.x - icRightPos;
                            scrollEnabled = false;
                        }
                        var icBottomPos = container.getBottomInParent();
                        if (icBottomPos + touchOffsetY >= dest.y) {
                            touchOffsetY = dest.y - icBottomPos;
                            scrollEnabled = false;
                        }
                    }
                    else if (touchOffsetX < 0.0 && touchOffsetY < 0.0) {
                        var icRightPos = container.getRightInParent();
                        if (icRightPos + touchOffsetX <= dest.x) {
                            touchOffsetX = dest.x - icRightPos;
                            scrollEnabled = false;
                        }
                        var icTopPos = container.getTopInParent();
                        if (icTopPos + touchOffsetY <= dest.y) {
                            touchOffsetY = dest.y - icTopPos;
                            scrollEnabled = false;
                        }
                    }
                    else if (touchOffsetX > 0.0 && touchOffsetY < 0.0) {
                        var icLeftPos = container.getLeftInParent();
                        if (icLeftPos + touchOffsetX >= dest.x) {
                            touchOffsetX = dest.x - icLeftPos;
                            scrollEnabled = false;
                        }
                        var icTopPos = container.getTopInParent();
                        if (icTopPos + touchOffsetY <= dest.y) {
                            touchOffsetY = dest.y - icTopPos;
                            scrollEnabled = false;
                        }
                    }
                    else if (touchOffsetX == 0.0 && touchOffsetY > 0.0) {
                        var icBottomPos = container.getBottomInParent();
                        if (icBottomPos + touchOffsetY >= dest.y) {
                            touchOffsetY = dest.y - icBottomPos;
                            scrollEnabled = false;
                        }
                    }
                    else if (touchOffsetX < 0.0 && touchOffsetY == 0.0) {
                        var icRightPos = container.getRightInParent();
                        if (icRightPos + touchOffsetX <= dest.x) {
                            touchOffsetX = dest.x - icRightPos;
                            scrollEnabled = false;
                        }
                    }
                    else if (touchOffsetX == 0.0 && touchOffsetY < 0.0) {
                        var icTopPos = container.getTopInParent();
                        if (icTopPos + touchOffsetY <= dest.y) {
                            touchOffsetY = dest.y - icTopPos;
                            scrollEnabled = false;
                        }
                    }
                    else if (touchOffsetX > 0.0 && touchOffsetY == 0.0) {
                        var icLeftPos = container.getLeftInParent();
                        if (icLeftPos + touchOffsetX >= dest.x) {
                            touchOffsetX = dest.x - icLeftPos;
                            scrollEnabled = false;
                        }
                    }
                    break;
                default:
                    break;
            }
            return scrollEnabled;
        };
        __egretProto__.getCurAutoScrollDistance = function (dt) {
            var scrollOption = this._scrollOption;
            scrollOption.autoScrollOriginalSpeed -= scrollOption.autoScrollAcceleration * dt;
            return scrollOption.autoScrollOriginalSpeed * dt;
        };
        __egretProto__.scrollChildren = function (touchOffsetX, touchOffsetY) {
            var self = this, scrollOption = self._scrollOption, direction = scrollOption.direction, container = self._scrollOption.innerContainer, offX = 0, offY = 0;
            var topBoundary = 0, bottomBoundary = 0, leftBoundary = 0, rightBoundary = 0;
            var scrollEnabled = true;
            if (direction == mo.ScrollViewDir.horizontal)
                offX = touchOffsetX;
            else if (direction == mo.ScrollViewDir.vertical)
                offY = touchOffsetY;
            else if (direction == mo.ScrollViewDir.both) {
                offX = touchOffsetX;
                offY = touchOffsetY;
            }
            if (scrollOption.bounceEnabled) {
                topBoundary = scrollOption.bounceTopBoundary;
                bottomBoundary = scrollOption.bounceBottomBoundary;
                leftBoundary = scrollOption.bounceLeftBoundary;
                rightBoundary = scrollOption.bounceLeftBoundary;
            }
            else {
                topBoundary = scrollOption.topBoundary;
                bottomBoundary = scrollOption.bottomBoundary;
                leftBoundary = scrollOption.leftBoundary;
                rightBoundary = scrollOption.rightBoundary;
            }
            if (offX) {
                var icLeftPos = container.getLeftInParent();
                var icRightPos = container.getRightInParent();
                //                console.debug("x--->", offX, icLeftPos, icRightPos, leftBoundary, rightBoundary);
                if (icLeftPos + touchOffsetX >= leftBoundary) {
                    offX = leftBoundary - icLeftPos;
                    this.scrollToLeftEvent();
                    scrollEnabled = false;
                }
                if (icRightPos + touchOffsetX <= rightBoundary) {
                    offX = rightBoundary - icRightPos;
                    this.scrollToRightEvent();
                    scrollEnabled = false;
                }
            }
            if (offY) {
                var icTopPos = container.getTopInParent(); //顶部规则同下
                var icBottomPos = container.getBottomInParent(); //获取到底部坐标
                //console.debug("y--->", offY, icTopPos, icBottomPos, topBoundary, bottomBoundary);
                if (icTopPos + touchOffsetY >= topBoundary) {
                    offY = topBoundary - icTopPos;
                    this.scrollToTopEvent();
                    scrollEnabled = false;
                }
                if (icBottomPos + touchOffsetY <= bottomBoundary) {
                    offY = bottomBoundary - icBottomPos; //此时设置实际偏移为回弹边界-底部坐标
                    this.scrollToBottomEvent();
                    scrollEnabled = false; //设置不可滚动
                }
            }
            //            console.log("offX->", offX, "offY->", offY);
            container.x += offX;
            container.y += offY;
            var scrollDir = scrollOption.scrollDir;
            scrollDir.x = offX;
            scrollDir.y = offY;
            self.scrollingEvent();
            return scrollEnabled;
        };
        __egretProto__.startRecordSlidAction = function () {
            var self = this, scrollOption = self._scrollOption;
            if (!mo.scrollEnabled || !scrollOption.scrollEnabled)
                return;
            if (scrollOption.autoScroll) {
                self.stopAutoScrollChildren();
            }
            if (scrollOption.bouncing) {
                self.stopBounceChildren();
            }
            scrollOption.slidTime = 0;
        };
        __egretProto__.endRecordSlidAction = function () {
            var scrollOption = this._scrollOption, touchOption = this._touchOption;
            if (!mo.scrollEnabled || !scrollOption.scrollEnabled)
                return;
            if (!this.checkNeedBounce() && scrollOption.inertiaScrollEnabled) {
                if (scrollOption.slidTime <= 17) {
                    return;
                }
                var totalDis = 0;
                var dir;
                switch (scrollOption.direction) {
                    case mo.ScrollViewDir.vertical:
                        totalDis = touchOption.touchEndedPoint.y - touchOption.touchBeganPoint.y;
                        if (totalDis < 0) {
                            dir = mo.SCROLLDIR_DOWN;
                        }
                        else {
                            dir = mo.SCROLLDIR_UP;
                        }
                        break;
                    case mo.ScrollViewDir.horizontal:
                        totalDis = touchOption.touchEndedPoint.x - touchOption.touchBeganPoint.x;
                        if (totalDis < 0) {
                            dir = mo.SCROLLDIR_LEFT;
                        }
                        else {
                            dir = mo.SCROLLDIR_RIGHT;
                        }
                        break;
                    case mo.ScrollViewDir.both:
                        var subVector = touchOption.touchEndedPoint.sub(touchOption.touchBeganPoint);
                        totalDis = subVector.length;
                        dir = subVector.normalize();
                        break;
                    default:
                        break;
                }
                var orSpeed = Math.min(Math.abs(totalDis * 1000) / (scrollOption.slidTime), mo.AUTOSCROLLMAXSPEED); //像素每秒
                this.startAutoScrollChildrenWithOriginalSpeed(dir, orSpeed, true, -1000);
                scrollOption.slidTime = 0;
            }
        };
        __egretProto__.handlePressLogic = function (event) {
            this.startRecordSlidAction();
        };
        __egretProto__.handleMoveLogic = function () {
            var self = this, touchOption = self._touchOption, scrollOption = self._scrollOption;
            var deltaX = touchOption.touchMovingPoint.x - touchOption.touchMovedPoint.x;
            var deltaY = touchOption.touchMovingPoint.y - touchOption.touchMovedPoint.y;
            var deltaSQ = deltaX * deltaX + deltaY * deltaY;
            touchOption.movedDeltaSQ = Math.max(touchOption.movedDeltaSQ, deltaSQ);
            if (!mo.scrollEnabled || !scrollOption.scrollEnabled)
                return;
            this.scrollChildren(deltaX, deltaY);
        };
        __egretProto__._initTouchEvents = function () {
            var self = this, touchOption = self._touchOption;
            if (touchOption.touchEventsInited)
                return; //已经初始化过了就不再初始化了
            touchOption.touchEventsInited = true;
            touchOption.bePressed = false;
            var TE = egret.TouchEvent;
            self.addEventListener(TE.TOUCH_BEGIN, self._onTouchBegin, self, true);
        };
        __egretProto__.__resetDownEvent = function () {
            var self = this, stage = mo.getStage();
            var TE = egret.TouchEvent;
            self._touchOption.bePressed = false;
            self.addEventListener(TE.TOUCH_BEGIN, self._onTouchBegin, self, true);
            stage.removeEventListener(TE.TOUCH_MOVE, self._onTouchMoveInStage, self, true);
            stage.removeEventListener(TE.TOUCH_END, self._onTouchEndInStage, self, true);
        };
        __egretProto__.__resetOtherEvents = function () {
            var self = this, stage = mo.getStage();
            self._touchOption.bePressed = true;
            var TE = egret.TouchEvent;
            self.removeEventListener(TE.TOUCH_BEGIN, self._onTouchBegin, self, true);
            stage.addEventListener(TE.TOUCH_MOVE, self._onTouchMoveInStage, self, true);
            stage.addEventListener(TE.TOUCH_END, self._onTouchEndInStage, self, true);
        };
        //@override
        __egretProto__.onTouchBegan = function (event) {
            this._scrollOption.targetNode = event.target;
            this.handlePressLogic(event);
        };
        //@override
        __egretProto__._moving = function () {
            var self = this, touchOption = self._touchOption, scrollOption = self._scrollOption;
            self.handleMoveLogic();
            if (touchOption.movedDeltaSQ > scrollOption.maxMovedDeltaSQ) {
                var targetNode = scrollOption.targetNode;
                if (!scrollOption.longTouchWhenScrollingEnabled && targetNode) {
                    if (targetNode._touchOption) {
                        targetNode._touchOption.canLongTouch = false;
                    }
                }
            }
        };
        __egretProto__._end = function (event) {
            var self = this, touchOption = self._touchOption, scrollOption = self._scrollOption, targetNode = scrollOption.targetNode;
            if (touchOption.movedDeltaSQ > scrollOption.maxMovedDeltaSQ && targetNode) {
                if (targetNode._touchOption) {
                    targetNode._touchOption.canTap = false;
                }
            }
            self.endRecordSlidAction();
            touchOption.movedDeltaSQ = 0;
        };
        Object.defineProperty(__egretProto__, "scrollEnabled", {
            get: function () {
                return this._scrollOption.scrollEnabled;
            },
            set: function (scrollEnabled) {
                this._scrollOption.scrollEnabled = scrollEnabled;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.update = function (frameTime) {
            var self = this, scrollOption = self._scrollOption, touchOption = self._touchOption;
            if (!scrollOption.scrollEnabled)
                return;
            if (scrollOption.autoScroll) {
                self.autoScrollChildren(frameTime);
            }
            if (scrollOption.bouncing) {
                self.bounceChildren(frameTime);
            }
            if (touchOption.bePressed) {
                scrollOption.slidTime += frameTime;
            }
        };
        __egretProto__.scrollToTopEvent = function () {
            var self = this, scrollOption = self._scrollOption;
            if (scrollOption.scrollViewEventListener && scrollOption.scrollViewEventSelector) {
                scrollOption.scrollViewEventSelector.call(scrollOption.scrollViewEventListener, self, mo.ScrollViewEventType.scrollToTop);
            }
        };
        __egretProto__.scrollToBottomEvent = function () {
            var self = this, scrollOption = self._scrollOption;
            if (scrollOption.scrollViewEventListener && scrollOption.scrollViewEventSelector) {
                scrollOption.scrollViewEventSelector.call(scrollOption.scrollViewEventListener, self, mo.ScrollViewEventType.scrollToBottom);
            }
        };
        __egretProto__.scrollToLeftEvent = function () {
            var self = this, scrollOption = self._scrollOption;
            if (scrollOption.scrollViewEventListener && scrollOption.scrollViewEventSelector) {
                scrollOption.scrollViewEventSelector.call(scrollOption.scrollViewEventListener, self, mo.ScrollViewEventType.scrollToLeft);
            }
        };
        __egretProto__.scrollToRightEvent = function () {
            var self = this, scrollOption = self._scrollOption;
            if (scrollOption.scrollViewEventListener && scrollOption.scrollViewEventSelector) {
                scrollOption.scrollViewEventSelector.call(scrollOption.scrollViewEventListener, self, mo.ScrollViewEventType.scrollToRight);
            }
        };
        __egretProto__.scrollingEvent = function () {
            var self = this, scrollOption = self._scrollOption;
            if (scrollOption.scrollViewEventListener && scrollOption.scrollViewEventSelector) {
                scrollOption.scrollViewEventSelector.call(scrollOption.scrollViewEventListener, self, mo.ScrollViewEventType.scrolling);
            }
        };
        __egretProto__.bounceTopEvent = function () {
            var self = this, scrollOption = self._scrollOption;
            if (scrollOption.scrollViewEventListener && scrollOption.scrollViewEventSelector) {
                scrollOption.scrollViewEventSelector.call(scrollOption.scrollViewEventListener, self, mo.ScrollViewEventType.bounceTop);
            }
        };
        __egretProto__.bounceBottomEvent = function () {
            var self = this, scrollOption = self._scrollOption;
            if (scrollOption.scrollViewEventListener && scrollOption.scrollViewEventSelector) {
                scrollOption.scrollViewEventSelector.call(scrollOption.scrollViewEventListener, self, mo.ScrollViewEventType.bounceBottom);
            }
        };
        __egretProto__.bounceLeftEvent = function () {
            var self = this, scrollOption = self._scrollOption;
            if (scrollOption.scrollViewEventListener && scrollOption.scrollViewEventSelector) {
                scrollOption.scrollViewEventSelector.call(scrollOption.scrollViewEventListener, self, mo.ScrollViewEventType.bounceLeft);
            }
        };
        __egretProto__.bounceRightEvent = function () {
            var self = this, scrollOption = self._scrollOption;
            if (scrollOption.scrollViewEventListener && scrollOption.scrollViewEventSelector) {
                scrollOption.scrollViewEventSelector.call(scrollOption.scrollViewEventListener, self, mo.ScrollViewEventType.bounceRight);
            }
        };
        __egretProto__.addEventListenerScrollView = function (selector, target) {
            var scrollOption = this._scrollOption;
            scrollOption.scrollViewEventSelector = selector;
            scrollOption.scrollViewEventListener = target;
        };
        __egretProto__.setInertiaScrollEnabled = function (enabled) {
            this._scrollOption.inertiaScrollEnabled = enabled;
        };
        __egretProto__.isInertiaScrollEnabled = function () {
            return this._scrollOption.inertiaScrollEnabled;
        };
        //滚动的api
        __egretProto__.startAutoScrollChildrenWithDestination = function (des, time, attenuated) {
            var self = this, scrollOption = self._scrollOption;
            scrollOption.needCheckAutoScrollDestination = false;
            scrollOption.autoScrollDestination = des;
            var tmpP = self._scrollOption.innerContainer.getPosition();
            var dis = des.sub(self._scrollOption.innerContainer.getPosition());
            var dir = dis.normalize();
            var orSpeed = 0.0;
            var acceleration = -1000.0;
            var disLength = dis.length;
            if (attenuated) {
                acceleration = -(2 * disLength) / (time * time);
                orSpeed = 2 * disLength / time;
            }
            else {
                scrollOption.needCheckAutoScrollDestination = true;
                orSpeed = disLength / time;
            }
            this.startAutoScrollChildrenWithOriginalSpeed(dir, orSpeed, attenuated, acceleration);
        };
        __egretProto__.jumpToDestination = function (des) {
            var self = this, scrollOption = self._scrollOption, container = scrollOption.innerContainer;
            var finalOffsetX = des.x;
            var finalOffsetY = des.y;
            switch (scrollOption.direction) {
                case mo.ScrollViewDir.vertical:
                    if (des.y <= 0) {
                        finalOffsetY = Math.max(des.y, self.height - container.height);
                    }
                    break;
                case mo.ScrollViewDir.horizontal:
                    if (des.x <= 0) {
                        finalOffsetX = Math.max(des.x, self.width - container.width);
                    }
                    break;
                case mo.ScrollViewDir.both:
                    if (des.y <= 0) {
                        finalOffsetY = Math.max(des.y, self.height - container.height);
                    }
                    if (des.x <= 0) {
                        finalOffsetX = Math.max(des.x, self.width - container.width);
                    }
                    break;
                default:
                    break;
            }
            container._setX(finalOffsetX);
            container._setY(finalOffsetY);
            self.scrollingEvent();
        };
        __egretProto__.scrollToBottom = function (time, attenuated) {
            var self = this, container = self._scrollOption.innerContainer;
            var des = mo.p(container.x, self.height - container.height);
            if (container.x == des.x && container.y == des.y) {
                self.scrollToBottomEvent();
            }
            else {
                self.startAutoScrollChildrenWithDestination(des, time, attenuated);
            }
        };
        __egretProto__.scrollToTop = function (time, attenuated) {
            var self = this, container = self._scrollOption.innerContainer;
            var des = mo.p(container.x, 0);
            if (container.x == des.x && container.y == des.y) {
                self.scrollToTopEvent();
            }
            else {
                self.startAutoScrollChildrenWithDestination(des, time, attenuated);
            }
        };
        __egretProto__.scrollToLeft = function (time, attenuated) {
            var self = this, container = self._scrollOption.innerContainer;
            var des = mo.p(0, container.y);
            if (container.x == des.x && container.y == des.y) {
                self.scrollToLeftEvent();
            }
            else {
                self.startAutoScrollChildrenWithDestination(des, time, attenuated);
            }
        };
        __egretProto__.scrollToRight = function (time, attenuated) {
            var self = this, container = self._scrollOption.innerContainer;
            var des = mo.p(self.width - container.width, container.y);
            if (container.x == des.x && container.y == des.y) {
                self.scrollToRightEvent();
            }
            else {
                self.startAutoScrollChildrenWithDestination(des, time, attenuated);
            }
        };
        __egretProto__.scrollToTopLeft = function (time, attenuated) {
            var self = this, container = self._scrollOption.innerContainer;
            if (self._scrollOption.direction != mo.ScrollViewDir.both) {
                mo.debug("Scroll diretion is not both!");
                return;
            }
            var des = mo.p(0, 0);
            if (container.x == des.x && container.y == des.y) {
                self.scrollToTopEvent();
                self.scrollToLeftEvent();
            }
            else {
                self.startAutoScrollChildrenWithDestination(des, time, attenuated);
            }
        };
        __egretProto__.scrollToTopRight = function (time, attenuated) {
            var self = this, container = self._scrollOption.innerContainer;
            if (self._scrollOption.direction != mo.ScrollViewDir.both) {
                mo.debug("Scroll diretion is not both!");
                return;
            }
            var des = mo.p(self.width - container.width, 0);
            if (container.x == des.x && container.y == des.y) {
                self.scrollToTopEvent();
                self.scrollToRightEvent();
            }
            else {
                self.startAutoScrollChildrenWithDestination(des, time, attenuated);
            }
        };
        __egretProto__.scrollToBottomLeft = function (time, attenuated) {
            var self = this, container = self._scrollOption.innerContainer;
            if (self._scrollOption.direction != mo.ScrollViewDir.both) {
                mo.debug("Scroll diretion is not both!");
                return;
            }
            var des = mo.p(0, self.height - container.height);
            if (container.x == des.x && container.y == des.y) {
                self.scrollToBottomEvent();
                self.scrollToLeftEvent();
            }
            else {
                self.startAutoScrollChildrenWithDestination(des, time, attenuated);
            }
        };
        __egretProto__.scrollToBottomRight = function (time, attenuated) {
            var self = this, container = self._scrollOption.innerContainer;
            if (self._scrollOption.direction != mo.ScrollViewDir.both) {
                mo.debug("Scroll diretion is not both!");
                return;
            }
            var des = mo.p(self.width - container.width, self.height - container.height);
            if (container.x == des.x && container.y == des.y) {
                self.scrollToBottomEvent();
                self.scrollToRightEvent();
            }
            else {
                self.startAutoScrollChildrenWithDestination(des, time, attenuated);
            }
        };
        __egretProto__.scrollToPercentVertical = function (percent, time, attenuated) {
            var self = this, container = self._scrollOption.innerContainer;
            var minY = self.height - container.height;
            var des = mo.p(container.x, percent * minY / 100);
            self.startAutoScrollChildrenWithDestination(des, time, attenuated);
        };
        __egretProto__.scrollToPercentHorizontal = function (percent, time, attenuated) {
            var self = this, container = self._scrollOption.innerContainer;
            var w = container.width - self.width;
            var des = mo.p(-(percent * w / 100), container.y);
            self.startAutoScrollChildrenWithDestination(des, time, attenuated);
        };
        __egretProto__.scrollToPercentBothDirection = function (percent, time, attenuated) {
            var self = this, container = self._scrollOption.innerContainer;
            if (self._scrollOption.direction != mo.ScrollViewDir.both) {
                return;
            }
            var minY = self.height - container.height;
            var h = -minY;
            var w = container.width - self.width;
            var des = mo.p(-(percent.x * w / 100), minY + percent.y * h / 100);
            self.startAutoScrollChildrenWithDestination(des, time, attenuated);
        };
        __egretProto__.jumpToBottom = function () {
            var self = this, container = self._scrollOption.innerContainer;
            self.jumpToDestination(mo.p(container.x, self.height - container.height));
        };
        __egretProto__.jumpToTop = function () {
            var self = this, container = self._scrollOption.innerContainer;
            this.jumpToDestination(mo.p(container.x, 0));
        };
        __egretProto__.jumpToLeft = function () {
            var self = this, container = self._scrollOption.innerContainer;
            self.jumpToDestination(mo.p(0, container.y));
        };
        __egretProto__.jumpToRight = function () {
            var self = this, container = self._scrollOption.innerContainer;
            self.jumpToDestination(mo.p(self.width - container.width, container.y));
        };
        __egretProto__.jumpToTopLeft = function () {
            if (this._scrollOption.direction != mo.ScrollViewDir.both) {
                mo.debug("Scroll diretion is not both!");
                return;
            }
            this.jumpToDestination(mo.p(0, 0));
        };
        __egretProto__.jumpToTopRight = function () {
            var self = this, container = self._scrollOption.innerContainer;
            if (self._scrollOption.direction != mo.ScrollViewDir.both) {
                mo.debug("Scroll diretion is not both!");
                return;
            }
            self.jumpToDestination(mo.p(self.width - container.width, 0));
        };
        __egretProto__.jumpToBottomLeft = function () {
            var self = this, container = self._scrollOption.innerContainer;
            if (self._scrollOption.direction != mo.ScrollViewDir.both) {
                mo.debug("Scroll diretion is not both!");
                return;
            }
            self.jumpToDestination(mo.p(0, self.height - container.height));
        };
        __egretProto__.jumpToBottomRight = function () {
            var self = this, container = self._scrollOption.innerContainer;
            if (self._scrollOption.direction != mo.ScrollViewDir.both) {
                mo.debug("Scroll diretion is not both!");
                return;
            }
            self.jumpToDestination(mo.p(self.width - container.width, self.height - container.height));
        };
        __egretProto__.jumpToPercentVertical = function (percent) {
            var self = this, container = self._scrollOption.innerContainer;
            var minY = self.height - container.height;
            self.jumpToDestination(mo.p(container.x, percent * minY / 100));
        };
        __egretProto__.jumpToPercentHorizontal = function (percent) {
            var self = this, container = self._scrollOption.innerContainer;
            var w = container.width - self.width;
            self.jumpToDestination(mo.p(-(percent * w / 100), container.y));
        };
        __egretProto__.jumpToPercentBothDirection = function (percent) {
            var self = this, container = self._scrollOption.innerContainer;
            if (self._scrollOption.direction != mo.ScrollViewDir.both) {
                return;
            }
            var minY = self.height - container.height;
            var h = -minY;
            var w = container.width - self.width;
            self.jumpToDestination(mo.p(-(percent.x * w / 100), minY + percent.y * h / 100));
        };
        //=================重写接口，用于挂接到innerContainer的相关api 开始========
        //@override
        __egretProto__._setLayoutType = function (type) {
            this._scrollOption.innerContainer.layoutType = type;
        };
        Object.defineProperty(__egretProto__, "layoutType", {
            //@override
            get: function () {
                return this._scrollOption.innerContainer.layoutType;
            },
            //@override
            set: function (type) {
                this._setLayoutType(type);
            },
            enumerable: true,
            configurable: true
        });
        //@override
        __egretProto__.addChild = function (child) {
            return this._scrollOption.innerContainer.addChild(child);
        };
        //@override
        __egretProto__.removeChildren = function () {
            this._scrollOption.innerContainer.removeChildren();
        };
        //@override
        __egretProto__.removeChild = function (child) {
            return this._scrollOption.innerContainer.removeChild(child);
        };
        //@override
        __egretProto__.getChildren = function () {
            return this._scrollOption.innerContainer.getChildren();
        };
        //@override
        __egretProto__.getChildrenCount = function () {
            return this._scrollOption.innerContainer.getChildrenCount();
        };
        //@override
        __egretProto__.getChildByName = function (name) {
            return this._scrollOption.innerContainer.getChildByName(name);
        };
        //@override
        __egretProto__.removeWidgets = function () {
            this._scrollOption.innerContainer.removeWidgets();
        };
        //@override
        __egretProto__.removeNodes = function () {
            this._scrollOption.innerContainer.removeNodes();
        };
        UIScrollView.__className = "UIScrollView";
        UIScrollView.SCROLL_END = "scrollEnd";
        return UIScrollView;
    })(mo.UIPanel);
    mo.UIScrollView = UIScrollView;
    UIScrollView.prototype.__class__ = "mo.UIScrollView"; //end of class
})(mo || (mo = {}));

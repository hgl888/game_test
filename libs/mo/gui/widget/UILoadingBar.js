var mo;
(function (mo) {
    var LoadingBarType;
    (function (LoadingBarType) {
        LoadingBarType.LEFT = 0;
        LoadingBarType.RIGHT = 1;
    })(LoadingBarType = mo.LoadingBarType || (mo.LoadingBarType = {}));
})(mo || (mo = {}));
var mo;
(function (mo) {
    var UILoadingBar = (function (_super) {
        __extends(UILoadingBar, _super);
        function UILoadingBar() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UILoadingBar.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._barOption = new mo._UILoadingBarOption();
        };
        /**
         * 改变进度条方向，默认左边到右边
         * 0,左到右  1,右到左
         * @param {Number} dir
         */
        __egretProto__.setDirection = function (dir) {
            var self = this, barOption = self._barOption;
            if (barOption.barType == dir) {
                return;
            }
            barOption.barType = dir;
        };
        /**
         * 获取进度条的方向
         * @returns {Number}
         */
        __egretProto__.getDirection = function () {
            return this._barOption.barType;
        };
        /**
         * 给进度条加一个资源
         * @param {String||egret.Texture} fileName
         */
        __egretProto__.loadTexture = function (fileName) {
            var self = this;
            res.getStatusRes(fileName, function (resData) {
                var texture = self._barOption.texture = resData;
                self._setWidth(texture.textureWidth);
                self._setHeight(texture.textureHeight);
            }, self, egret.Texture);
        };
        /**
         * 改变进度
         * @param {number} percent
         */
        __egretProto__.setPercent = function (percent) {
            var self = this;
            if (percent < 0) {
                percent = 0;
            }
            else if (percent > 100) {
                percent = 100;
            }
            self._barOption.percent = percent;
        };
        /**
         * 获取进度
         * @returns {number}
         */
        __egretProto__.getPercent = function () {
            return this._barOption.percent;
        };
        __egretProto__._render = function (renderContext) {
            var self = this, barOption = self._barOption;
            var texture = self._texture_to_render = barOption.texture;
            if (!texture)
                return;
            //绘制loadingbar的底图
            var renderFilter = egret.RenderFilter.getInstance();
            var bitmapWidth = texture._bitmapWidth || texture._textureWidth;
            var bitmapHeight = texture._bitmapHeight || texture._textureHeight;
            var percent = barOption.percent, clipWidth;
            if (barOption.barType == mo.LoadingBarType.LEFT) {
                clipWidth = 0 | (bitmapWidth * percent / 100);
                renderFilter.drawImage(renderContext, this, texture._bitmapX, texture._bitmapY, clipWidth, bitmapHeight, texture._offsetX, texture._offsetY, clipWidth, bitmapHeight);
            }
            //todo 右边向左边的先不做了
            //            else if(barOption.barType == LoadingBarType.RIGHT){
            //                clipWidth = 0 | bitmapWidth * (100 - percent) / 100;
            //                var clipWidth1 = bitmapWidth - clipWidth;
            //                renderFilter.drawImage(renderContext, this, texture._bitmapX + clipWidth, texture._bitmapY,
            //                    bitmapWidth, bitmapHeight, texture._offsetX + clipWidth, texture._offsetY, clipWidth1, bitmapHeight);
            //            }
            _super.prototype._render.call(this, renderContext);
        };
        /**
         * @param loadingBar
         */
        __egretProto__.copySpecialProps = function (loadingBar) {
            var barOption2 = loadingBar._barOption;
            this.setPercent(barOption2.percent);
            this.setDirection(barOption2.barType);
        };
        //++++++++++++++++++++++extend 开始======================
        __egretProto__.setOption = function (option) {
            if (option == null)
                return option;
            var self = this;
            option = _super.prototype.setOption.call(this, option);
            if (option.value) {
                var value = option.value;
                this.setPercent(value);
            }
            return option;
        };
        /**
         * @param cur
         * @param total
         * @param str
         */
        __egretProto__.setProgress = function (cur, total, str) {
            var self = this, barOption = self._barOption;
            if (typeof arguments[0] == "object") {
                var args = arguments[0];
                cur = args.cur;
                total = args.total;
                str = args.str;
            }
            var innerLabel = barOption.innerLabel;
            if (!innerLabel) {
                var fontSize = self.height * 0.7;
                innerLabel = barOption.innerLabel = mo.UIText.create();
                innerLabel.setFontSize(fontSize);
                innerLabel.setFontName("微软雅黑");
                innerLabel.enableStroke(mo.c3b(30, 30, 30), 3);
                innerLabel.zOrder = 9999;
                innerLabel.setAnchorPoint(0.5, 0.5);
                innerLabel.setPosition(self.width / 2, self.height / 2);
                self.addChild(innerLabel);
            }
            var percent = !total ? 100 : (0 | (cur / total * 100));
            if (percent > 100) {
                percent = 100;
            }
            if (str) {
                innerLabel.setText(str);
            }
            else {
                innerLabel.setText((0 | cur) + "/" + total);
            }
            barOption.curValue = cur;
            barOption.totalValue = total;
            self._setProgressPercent(percent);
            if (barOption.actionQueueRunning) {
                if (barOption.runningActionCb)
                    barOption.runningActionCb.call(barOption.runningActionCbTarget, barOption.curBaseNumIndex, barOption.curValue, barOption.totalValue);
            }
        };
        __egretProto__._setProgressPercent = function (percent) {
            this.setPercent(percent);
            this.setLightWidgetPosition();
        };
        __egretProto__.getCurValue = function () {
            return this._barOption.curValue;
        };
        __egretProto__.getTotalValue = function () {
            return this._barOption.totalValue;
        };
        /**
         * @param {mo.UIWidget|String} texture
         */
        __egretProto__.loadLightTexture = function (texture) {
            var self = this, barOption = self._barOption;
            if (typeof texture == "string") {
                var lightWidget = barOption.lightWidget;
                if (!lightWidget) {
                    lightWidget = barOption.lightWidget = mo.UIImage.create();
                    lightWidget.setAnchorPoint(0.5, 0.5);
                    lightWidget.zOrder = 9998;
                    self.addChild(lightWidget);
                }
                lightWidget.loadTexture(texture);
            }
            else {
                barOption.lightWidget = texture;
            }
            barOption.lightWidget.setVisible(false);
            self.setLightWidgetPosition();
        };
        __egretProto__.setLightWidgetPosition = function () {
            var lightWidget = this._barOption.lightWidget;
            if (lightWidget) {
                var size = this.getSize(), percent = this.getPercent();
                var x = percent / 100 * size.width, y = size.height / 2;
                lightWidget.setPosition(x, y);
            }
        };
        __egretProto__.getLightWidget = function () {
            return this._barOption.lightWidget;
        };
        __egretProto__.getInnerLabel = function () {
            return this._barOption.innerLabel;
        };
        /**
         *  停止动态进度条，直接设置最终进度值
         */
        __egretProto__.stopQueueRunning = function () {
            var self = this, barOption = self._barOption;
            if (barOption.actionQueueRunning) {
                self._stopShakeLight();
                mo.clearTick(self._runActionQueue, self);
                barOption.actionQueueRunning = false;
                barOption.diffValue = 0;
                barOption.curTargetValue = barOption.finalTargetValue;
                self.setProgress(barOption.finalCurValue, barOption.finalTotalValue);
                if (barOption.stopActionCb) {
                    var opt = {
                        index: barOption.curBaseNumIndex,
                        isMax: ((barOption.curBaseNumIndex == barOption.queueBaseNumber.length - 1) && (barOption.finalCurValue == barOption.finalTotalValue)),
                        curValue: barOption.finalCurValue,
                        totalValue: barOption.finalTotalValue
                    };
                    barOption.stopActionCb.call(barOption.stopActionCbTarget, opt);
                }
            }
        };
        /**
         * 重置进度条所有状态
         */
        __egretProto__.resetSelf = function () {
            var self = this;
            self._barOption.reset();
            self.stopQueueRunning();
            self.setProgress(0, 0);
        };
        __egretProto__.reset = function () {
            _super.prototype.reset.call(this);
            var self = this;
            self._barOption.reset();
            self.stopQueueRunning();
            self.setProgress(0, 0);
        };
        /**
         * 底数，例如： [100,200,300]
         * @param {Array} arr
         */
        __egretProto__.setProgressQueueBaseNumber = function (arr, switchMode) {
            var self = this, barOption = self._barOption;
            barOption.switchMode = switchMode || self.__class.SWITCH_MODE_POSITIVE;
            self.resetSelf();
            barOption.queueBaseNumber = arr;
            barOption.totalValue = arr[0];
            var sum = 0;
            for (var i in arr) {
                var intV = parseInt(arr[i]);
                arr[i] = intV;
                sum += intV;
            }
            barOption.queueBaseNumberSum = sum;
        };
        /**
         * 获取底数
         */
        __egretProto__.getProgressQueueBaseNumber = function () {
            return this._barOption.queueBaseNumber;
        };
        /**
         * 基数之和
         * @returns {null}
         */
        __egretProto__.getSumOfQueueBaseNumbers = function () {
            return this._barOption.queueBaseNumberSum;
        };
        /**
         * 调整跑进度条时的两个参数
         * @private
         */
        __egretProto__._normalTargetAndFinalValue = function () {
            var self = this, barOption = self._barOption;
            if (barOption.finalTargetValue <= 0) {
                barOption.finalTargetValue = 0;
                barOption.finalCurValue = 0;
                barOption.finalTotalValue = barOption.queueBaseNumber[0];
                return;
            }
            if (barOption.finalTargetValue >= barOption.queueBaseNumberSum) {
                barOption.finalTargetValue = barOption.queueBaseNumberSum;
                barOption.finalCurValue = barOption.queueBaseNumber[barOption.queueBaseNumber.length - 1];
                barOption.finalTotalValue = barOption.queueBaseNumber[barOption.queueBaseNumber.length - 1];
                return;
            }
            var arr = barOption.queueBaseNumber;
            var total = 0, flag;
            for (var i = 0, li = arr.length; i < li; i++) {
                var baseNumber = arr[i];
                total += baseNumber;
                barOption.finalTotalValue = baseNumber;
                flag = (barOption.switchMode == self.__class.SWITCH_MODE_POSITIVE) ? barOption.finalTargetValue < total : barOption.finalTargetValue <= total;
                if (flag) {
                    barOption.finalCurValue = barOption.finalTargetValue - (total - baseNumber);
                    break;
                }
                else {
                    if (i == li - 1) {
                        barOption.finalTargetValue = total;
                        barOption.finalCurValue = baseNumber;
                    }
                }
            }
        };
        __egretProto__._beginShakeLight = function () {
            var self = this, barOption = self._barOption, lightWidget = barOption.lightWidget;
            if (lightWidget) {
                var seq = mo.repeatForever(mo.sequence(mo.fadeTo(0.3, 255), mo.fadeTo(0.3, 200)));
                lightWidget.setVisible(true);
                lightWidget.runAction(seq);
            }
        };
        __egretProto__._stopShakeLight = function () {
            var self = this, barOption = self._barOption, lightWidget = barOption.lightWidget;
            if (lightWidget) {
                lightWidget.setVisible(false);
                lightWidget.stopAllActions();
            }
        };
        /**
         * 单次增加多少
         * @param diffValue
         * @param cb
         * @param cbTarget
         */
        __egretProto__.runProgressQueue = function (diffValue, cb, cbTarget) {
            var self = this, barOption = self._barOption;
            if (!barOption.queueBaseNumber) {
                mo.error("队列的底数不能为空啊亲");
                return;
            }
            if (barOption.finalTargetValue == null) {
                mo.error("请先调用setCurTargetValue设置targetValue");
                return;
            }
            barOption.runActionQueueCb = cb;
            barOption.runActionQueueCbTarget = cbTarget;
            barOption.diffValue += diffValue;
            barOption.finalTargetValue += diffValue;
            self._normalTargetAndFinalValue();
            if (barOption.actionQueueRunning)
                return;
            barOption.actionQueueRunning = true;
            mo.tick(self._runActionQueue, self);
            this._beginShakeLight();
        };
        /**
         * 运行到目标数值
         * @param targetValue 目标数值
         * @param cb
         * @param cbTarget
         */
        __egretProto__.runProgressQueue2 = function (targetValue, cb, cbTarget) {
            var self = this, barOption = self._barOption;
            if (!barOption.queueBaseNumber) {
                mo.error("队列的底数不能为空啊亲");
                return;
            }
            if (barOption.finalTargetValue == null) {
                mo.error("请先调用setCurTargetValue设置targetValue");
                return;
            }
            barOption.runActionQueueCb = cb;
            barOption.runActionQueueCbTarget = cbTarget;
            barOption.diffValue += targetValue - barOption.finalTargetValue;
            barOption.finalTargetValue = targetValue;
            self._normalTargetAndFinalValue();
            if (barOption.actionQueueRunning)
                return;
            barOption.actionQueueRunning = true;
            mo.tick(self._runActionQueue, self);
            this._beginShakeLight();
        };
        __egretProto__.onStopRunningProgress = function (cb, target) {
            var self = this, barOption = self._barOption;
            barOption.stopActionCb = cb;
            barOption.stopActionCbTarget = target;
        };
        __egretProto__.onRunningProgress = function (cb, target) {
            var self = this, barOption = self._barOption;
            barOption.runningActionCb = cb;
            barOption.runningActionCbTarget = target;
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.apply(this);
            var self = this, barOption = self._barOption;
            barOption.runActionQueueCb = null;
            barOption.runActionQueueCbTarget = null;
            self.stopQueueRunning();
        };
        __egretProto__._getBaseNumIndex = function (targetValue) {
            var self = this, barOption = self._barOption;
            var arr = barOption.queueBaseNumber;
            var baseNumIndex = arr.length - 1;
            var total = 0, flag;
            for (var i = 0, li = arr.length; i < li; i++) {
                total += arr[i];
                flag = (barOption.switchMode == self.__class.SWITCH_MODE_POSITIVE) ? targetValue < total : targetValue <= total;
                if (flag) {
                    baseNumIndex = i;
                    break;
                }
            }
            return baseNumIndex;
        };
        /**
         * 通过现有值和索引设置目标进度
         * @param curValue 该槽现有值 (e.g. 专属装备服务器剩余经验)
         * @param baseNumIndex 该槽总值在基数数组中的索引值 (e.g. 装备待升的等级)
         *
         */
        __egretProto__.setCurTargetValue = function (curValue, baseNumIndex) {
            var self = this, barOption = self._barOption;
            var arr = barOption.queueBaseNumber;
            if (!arr) {
                mo.error("你没有设置基数数组啊！");
                return;
            }
            if (baseNumIndex > arr.length) {
                mo.error("索引 %s 超出基数数组的大小了啊！", baseNumIndex);
                return;
            }
            barOption.curBaseNumIndex = baseNumIndex;
            var total = curValue;
            for (var i = 0, li = baseNumIndex; i < li; i++) {
                total += arr[i];
            }
            barOption.curTargetValue = total;
            // 如果是直接设置的进度，则应该同时调整动态进度条相关的值
            if (!barOption.actionQueueRunning) {
                barOption.finalTargetValue = barOption.curTargetValue;
                barOption.diffValue = 0;
                self._normalTargetAndFinalValue();
                self.setProgress(barOption.finalCurValue, barOption.finalTotalValue);
            }
        };
        __egretProto__._runActionQueue = function (dtByMs) {
            var dt = dtByMs / 1000; //转换成秒
            var self = this, barOption = self._barOption;
            if (barOption.diffValue == 0) {
                self.stopQueueRunning();
            }
            else {
                var baseNumberArr = this.getProgressQueueBaseNumber();
                var index = self._getBaseNumIndex(barOption.curTargetValue);
                var baseNumber = baseNumberArr[index];
                // 计算变化量
                var deltaValue, newValue;
                deltaValue = baseNumber * dt * (barOption.diffValue > 0 ? 1 : -1);
                if (Math.abs(deltaValue) > Math.abs(barOption.diffValue)) {
                    newValue = barOption.curValue + barOption.diffValue;
                    newValue = Math.round(newValue);
                    barOption.diffValue = 0;
                }
                else {
                    barOption.diffValue -= deltaValue;
                    newValue = barOption.curValue + deltaValue;
                }
                var flag;
                flag = (barOption.switchMode == self.__class.SWITCH_MODE_POSITIVE) ? newValue >= baseNumber : newValue > baseNumber;
                // 前进到了下一基数
                if (deltaValue > 0 && flag) {
                    if ((index + 1) < baseNumberArr.length) {
                        newValue = newValue - baseNumber;
                        index++;
                    }
                    else {
                        index = baseNumberArr.length - 1;
                        newValue = baseNumber;
                        barOption.diffValue = 0;
                    }
                    //执行基数变化回调
                    if (barOption.runActionQueueCb)
                        barOption.runActionQueueCb.call(barOption.runActionQueueCbTarget, index, baseNumberArr[index], this);
                }
                flag = (barOption.switchMode == self.__class.SWITCH_MODE_POSITIVE) ? newValue < 0 : newValue <= 0;
                // 回退到了上一个基数
                if (deltaValue < 0 && flag) {
                    if (index - 1 < 0) {
                        index = 0;
                        newValue = 0;
                        barOption.diffValue = 0;
                    }
                    else {
                        index--;
                        newValue = baseNumberArr[index] + newValue;
                    }
                    //执行基数变化回调
                    if (barOption.runActionQueueCb)
                        barOption.runActionQueueCb.call(barOption.runActionQueueCbTarget, index, baseNumberArr[index], this);
                }
                self.setProgress(newValue, baseNumberArr[index]);
                self.setCurTargetValue(newValue, index);
            }
        };
        /**
         * 增量
         * @param duration
         * @param diffPercent
         */
        __egretProto__.runProgressBy = function (duration, diffPercent) {
            var percent = diffPercent + this.getPercent();
            var progress = mo.action.ProgressTo.create(duration, percent);
            this.runAction(progress);
        };
        /**
         * 从当前到y
         * @param duration
         * @param percent
         * @param cb
         * @param target
         */
        __egretProto__.runProgressTo = function (duration, percent, cb, target) {
            var progress = mo.action.ProgressTo.create.apply(null, arguments);
            this.runAction(progress);
        };
        /**
         * 从x到y
         * @param duration
         * @param fromPercentage
         * @param toPercentage
         * @param cb
         * @param target
         */
        __egretProto__.runProgressFromTo = function (duration, fromPercentage, toPercentage, cb, target) {
            var progress = mo.action.ProgressFromTo.create.apply(null, arguments);
            this.runAction(progress);
        };
        UILoadingBar.__className = "UILoadingBar";
        UILoadingBar.SWITCH_MODE_POSITIVE = 1; //进度满足当前最大值时，主动切换到下一阶的进度(一般使用，比如：吃经验)
        UILoadingBar.SWITCH_MODE_NEGATIVE = 2; //进度满足当前最大值时，不主动切换到下一阶的进度(专属锻造中使用)
        UILoadingBar.SWITCH_MODE_DEFAULT = 1;
        return UILoadingBar;
    })(mo.UIWidget);
    mo.UILoadingBar = UILoadingBar;
    UILoadingBar.prototype.__class__ = "mo.UILoadingBar";
})(mo || (mo = {}));

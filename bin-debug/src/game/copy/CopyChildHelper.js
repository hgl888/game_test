var uw;
(function (uw) {
    var CopyChildHelper = (function (_super) {
        __extends(CopyChildHelper, _super);
        function CopyChildHelper() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = CopyChildHelper.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._newestCopyArr = [];
            this._latestPCId = 0;
            this._defaultScrollStrategy = true;
        };
        __egretProto__.init = function (delegate, parent) {
            _super.prototype.init.apply(this, arguments);
            var self = this;
            self._delegate = delegate;
            self._parent = parent;
            var pointer = self._pointer = mo.UIImage.create();
            pointer.name = "nodePointer";
            pointer.loadTexture(res.SpecialItemIcon.pointer);
        };
        __egretProto__._getCopyIdByIndex = function (index) {
            var self = this;
            var copyIds = self._copyProgressDataCtrl.copyIds;
            for (var i in copyIds) {
                var copyIndex = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyIds[i])[uw.t_copy_copyIndex];
                if (copyIndex == index) {
                    return copyIds[i];
                }
            }
            return 0;
        };
        __egretProto__._createChildCopyNodes = function () {
            var self = this;
            var cpDataCtrl = self._copyProgressDataCtrl;
            var copyStateMap = cpDataCtrl.getCopyStateMap();
            var t_copy = mo.getJSONWithFileName(uw.cfg_t_copy), copyInfo, copyId, copyState, mapInfoJson = cpDataCtrl.mapInfoJson, mapInfo, copyNode, connectNodesID, connectSprite;
            var nodeIndex;
            for (var i = 0, li = mapInfoJson.length; i < li; i++) {
                nodeIndex = (i + 1);
                mapInfo = mapInfoJson[i];
                copyId = self._getCopyIdByIndex(nodeIndex);
                if (copyId == 0) {
                    copyInfo = null;
                    copyNode = uw.CopyChildNode.create(self._copyProgressDataCtrl.id, copyInfo, mapInfo, self._parent);
                    copyNode.setDelegate(self);
                }
                else {
                    copyInfo = t_copy[copyId];
                    copyNode = uw.CopyChildNode.create(self._copyProgressDataCtrl.id, copyInfo, mapInfo, self._parent);
                    copyNode.setDelegate(self);
                    self._copyNodes[copyId] = copyNode;
                    copyState = copyStateMap[copyId]; //副本状态, 如果取不到则表示该副本未开启
                    if (copyState) {
                        copyNode.unlock(copyState.state, copyState.star, copyState.times);
                    }
                }
                if (copyNode.getPosition().x >= self._width) {
                    self._width = copyNode.getPosition().x;
                }
                self._parent.addChild(copyNode, 10);
            }
            for (var j in mapInfoJson) {
                connectNodesID = mapInfoJson[j].connectNodesID;
                copyNode = self._parent.getChildByTag(mapInfoJson[j].tag);
                if (copyNode) {
                    for (var k = 0; k < connectNodesID.length; k++) {
                        connectSprite = self._parent.getChildByTag(connectNodesID[k]);
                        if (connectSprite) {
                            copyNode.connectChildren.push(connectSprite);
                        }
                    }
                    copyNode.updateConnection();
                }
            }
            var size = self._parent.getInnerContainerSize();
            var newWidth = (size.width >= self._width) ? size.width : self._width + 320;
            self._parent.setInnerContainerSize(mo.size(newWidth, size.height));
            //最新进度副本要发光圈
            self.showShineEffect();
        };
        __egretProto__.getStageById = function (id) {
            var copy = this._copyNodes[id];
            if (copy) {
                this.scrollChildContainer(copy.getPosition());
                return copy;
            }
        };
        __egretProto__.showCopyInfo = function (copyNode) {
            var self = this;
            self._curCopy = copyNode;
            self._defaultScrollStrategy = false; // 如果不是最新的副本，则打完后子节点层跳转到这个副本的位置
            var pos = copyNode.getPosition();
            self._layerPosition.x = pos.x;
            self._layerPosition.y = pos.y;
            self._delegate.showCopyInfoLayer(copyNode.getCopyId());
            //点击目标节点后移除手指
            if (self._pointingNode == copyNode) {
                self.disablePointer();
            }
        };
        __egretProto__.updateChildState = function (isWin) {
            var self = this;
            if (self._curCopy) {
                var copyId = self._curCopy.getCopyId();
                var copyState = self._copyProgressDataCtrl.getCopyStateMap()[copyId];
                if ((self._newestCopyArr.indexOf(self._curCopy) !== -1) && isWin) {
                    self._curCopy.copyClear(copyState.star);
                    // 解锁下一个副本
                    var nextCopyId = self._curCopy.getNextCopyId();
                    var nextCopyNode = self._copyNodes[nextCopyId];
                    var level = uw.userDataCtrl.getLvl();
                    if (nextCopyNode) {
                        // 满足等级需要
                        if (level >= nextCopyNode.getLvlRequired()) {
                            nextCopyNode.unlock(0);
                            mo.playUIAudio(110);
                        }
                    }
                    else {
                        self._curCopy.setShining(false);
                        self._delegate.getPrimaryHelper().setUnlockStageActive();
                    }
                }
                else if (isWin) {
                    self._curCopy.setStarCount(copyState.star);
                }
            }
        };
        //最新进度副本节点设置光圈效果
        __egretProto__.showShineEffect = function (isShow) {
            var copy;
            for (var i = 0; i < this._newestCopyArr.length; i++) {
                copy = this._newestCopyArr[i];
                copy.setShining(isShow == null ? true : isShow);
            }
        };
        __egretProto__.addNewestCopy = function (node) {
            if (this._newestCopyArr.indexOf(node) == -1) {
                this._layerPosition.x = node.getPosition().x;
                this._layerPosition.y = node.getPosition().y;
                this._newestCopyArr.push(node);
                this._defaultScrollStrategy = true;
            }
        };
        __egretProto__.removeNewestCopy = function (node) {
            node.setShining(false);
            mo.ArrayRemoveObject(this._newestCopyArr, node);
        };
        __egretProto__.revertState = function () {
            var self = this;
            if (!self._defaultScrollStrategy) {
                var pos = this._layerPosition;
                self.scrollChildContainer(pos);
                return;
            }
            if (self._copyProgressDataCtrl.finished) {
                self._parent.jumpToPercentHorizontal(0);
            }
            else {
                var pos = this._layerPosition;
                self.scrollChildContainer(pos);
            }
        };
        /**
         * 画一根手指和光圈指向一个副本节点
         * @param copyId 副本ID
         */
        __egretProto__.pointerToCopy = function (copyId) {
            var self = this;
            // 停止显示当前副本进度光圈
            self.showShineEffect(false);
            var pointer = self._pointer;
            pointer.setRotation(0);
            pointer.setFlippedX(false);
            var parentSize = self._parent.getSize();
            var centerX = parentSize.width / 2;
            var centerY = parentSize.height / 2;
            var rotation = 0, offsetX, offsetY;
            // 画手指
            var copyNode = self._pointingNode = this._copyNodes[copyId];
            if (!copyNode)
                return uw.error("未找到copyId = %s的节点，请检查数据配置", copyId);
            //检查是否通过
            var isPassed = self._copyProgressDataCtrl.isCopyPassed(copyId);
            var isOpening = self._copyProgressDataCtrl.getOpeningId() == copyId;
            if (!isPassed && !isOpening) {
                if (!self._bubble) {
                    self._bubble = uiHelper.createBubble(copyNode, "请先通关前置副本", mo.p(0, -copyNode.getWidgetByName("iconBtn").height * 0.3));
                }
            }
            else {
                if (self._bubble) {
                    self._bubble.removeFromParent();
                    self._bubble = null;
                }
            }
            copyNode.setShining(true);
            var pos = copyNode.getPosition();
            //右下往左上指
            rotation = 0;
            offsetX = 30;
            offsetY = 30;
            pointer.setAnchorPoint(0.1, 0);
            pointer.setPosition(pos);
            pointer.setRotation(rotation);
            if (!pointer.getParent()) {
                self._parent.addChild(pointer, 100);
            }
            // 超过scrollview一半的宽度，就需要移动地图了
            if (pos.x > parentSize.width / 2) {
                self.scrollChildContainer(pos);
            }
            else {
                self.scrollChildContainer(mo.p(0, 0));
            }
            // 手指抖啊抖
            var moveAround = mo.repeatForever(mo.sequence(mo.moveBy(0.8, mo.p(offsetX, offsetY)), mo.moveBy(0.5, mo.p(-offsetX, -offsetY))));
            pointer.stopAllActions();
            pointer.runAction(moveAround);
        };
        //隐藏手指
        __egretProto__.disablePointer = function () {
            var self = this;
            self._delegate._focusOnCopyId = null;
            var pointer = self._pointer, copyNode = self._pointingNode;
            if (pointer.getParent()) {
                pointer.removeFromParent();
            }
            if (copyNode) {
                copyNode.setShining(false);
                self._pointingNode = null;
            }
            if (self._bubble) {
                self._bubble.removeFromParent();
                self._bubble = null;
            }
        };
        __egretProto__.scrollChildContainer = function (pos) {
            var self = this;
            self._parent.stopAutoScrollChildren();
            var parentSize = this._parent.getSize();
            var innerCtnSize = self._parent.getInnerContainerSize();
            //大于一半的宽度才需要滚动
            var startX = parentSize.width * 0.5;
            var diff = pos.x - startX;
            var percent = (diff < 0) ? 0 : diff / (innerCtnSize.width - parentSize.width);
            percent = percent > 1 ? 1 : percent;
            self._parent.jumpToPercentHorizontal(percent * 100);
        };
        __egretProto__.resetData = function (copyProgressDataCtrl, latestPId) {
            var self = this;
            self.showShineEffect(false); //关闭shine效果
            self._copyProgressDataCtrl = copyProgressDataCtrl;
            self._latestPCId = latestPId;
            self._configData = copyProgressDataCtrl.config;
            self._newestCopyArr = [];
            self._layerPosition = mo.p(0, 0);
            self._curShineCopy = null;
            self._curCopy = null;
            self._copyNodes = {};
            self._width = 0;
            self._defaultScrollStrategy = true;
            // 还原原始大小，解决可拖动范围过长的问题
            if (!self._originalSize) {
                self._originalSize = mo.size(self._parent.getInnerContainerSize());
            }
            else {
                self._parent.setInnerContainerSize(self._originalSize);
            }
            self._parent.setTouchEnabled(false);
            self._parent.removeChildren();
            // 画副本节点
            self._createChildCopyNodes();
            self._parent.setTouchEnabled(true);
            // 淡入效果
            var innerContainer = self._parent.getInnerContainer();
            innerContainer.setOpacity(0);
            innerContainer.runAction(mo.fadeIn(0.5));
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            self._pointingNode = null;
            self._copyNodes = null;
            self._newestCopyArr = null;
        };
        CopyChildHelper.__className = "CopyChildHelper";
        return CopyChildHelper;
    })(mo.Class);
    uw.CopyChildHelper = CopyChildHelper;
    CopyChildHelper.prototype.__class__ = "uw.CopyChildHelper";
})(uw || (uw = {}));

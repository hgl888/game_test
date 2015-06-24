var uw;
(function (uw) {
    var CopyPrimaryHelper = (function (_super) {
        __extends(CopyPrimaryHelper, _super);
        function CopyPrimaryHelper() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = CopyPrimaryHelper.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._unlockStageActive = false;
            this._latestPCId = 0;
            this._prePosX = 0;
        };
        __egretProto__.init = function (delegate, parent) {
            _super.prototype.init.apply(this, arguments);
            this._delegate = delegate;
            this._parent = parent;
        };
        __egretProto__.resetData = function (pCopyType, progressMap) {
            if (this._pCopyType != pCopyType) {
                this.revertState();
            }
            this._curPrimaryCopyNode = null;
            this._pCopyType = pCopyType;
            this._progress = progressMap;
            this._primaryCopyMap = {};
            this.bindCopyData();
            this.initPrimaryLayers();
        };
        __egretProto__.initPrimaryLayers = function () {
            var size = mo.visibleRect.getSize(), parent = this._parent;
            var floor = this._floor = parent.getWidgetByName("floor");
            floor.clippingEnabled = false;
            floor.addEventListenerScrollView(this.scrollPrimaryCopy, this);
            floor._setWidth(size.width);
            this._cloundA = parent.getWidgetByName("cloundA");
            this._cloundB = parent.getWidgetByName("cloundB");
            this._closeShot = parent.getWidgetByName("closeShot");
            this._cloundA.setPositionX(0);
            this._cloundB.setPositionX(0);
            this._closeShot.setPositionX(0);
        };
        __egretProto__.scrollPrimaryCopy = function (sender, event) {
            var posX = sender.getInnerContainer().getPosition().x, self = this;
            var offsetX = posX - self._prePosX;
            //移动云B
            self._cloundB.setPositionX(self._cloundB.getPositionX() + offsetX * 0.4);
            //移动云A
            self._cloundA.setPositionX(self._cloundA.getPositionX() + offsetX * 0.7);
            //移动前景
            self._closeShot.setPositionX(self._closeShot.getPositionX() + offsetX * 1.5);
            self._prePosX = posX;
        };
        /**
         * 绑定数据给场景
         */
        __egretProto__.bindCopyData = function () {
            var self = this;
            var copyPrimaryInfo, name, copyData = mo.getJSONWithFileName(uw.cfg_t_copyPrimary);
            for (var key in copyData) {
                copyPrimaryInfo = copyData[key];
                if (self._pCopyType != copyPrimaryInfo[uw.t_copyPrimary_type]) {
                    continue;
                }
                name = "stage" + (key - (self._pCopyType == uw.c_prop.pCopyTypeKey.cream ? 100 : 0));
                var pCopyNode = self._parent.getWidgetByName(name);
                self._primaryCopyMap[key] = pCopyNode;
                var isActive = !!self._progress[key] && (uw.userDataCtrl.getLvl() >= self._progress[key].lvlRequired);
                self._setPrimaryCopyInfo(pCopyNode, copyPrimaryInfo, isActive);
                if (isActive) {
                    self._lastestPrimaryCopy = pCopyNode;
                    self._latestPCId = key;
                }
            }
            self.setCurPrimaryCopy(self._lastestPrimaryCopy.getTag());
        };
        /**
         * 设置基础信息
         * @param node
         * @param copyPrimaryInfo
         * @param isActive
         * @private
         */
        __egretProto__._setPrimaryCopyInfo = function (node, copyPrimaryInfo, isActive) {
            var name = copyPrimaryInfo[uw.t_copyPrimary_name], cid = copyPrimaryInfo[uw.t_copyPrimary_id], lvlRequired = copyPrimaryInfo[uw.t_copyPrimary_lvlRequired];
            var nameWidget = node.getWidgetByName("name");
            nameWidget.setTitleText(name);
            nameWidget.setBright(false);
            nameWidget.setTitlePosByPercent(0.5, 0.425);
            nameWidget.enableStroke(mo.c3b(22, 22, 22), 3);
            nameWidget.setTouchEnabled(false);
            var lockWidget = node.getWidgetByName("lock");
            lockWidget.setVisible(!isActive);
            lockWidget.setTouchEnabled(!isActive);
            if (!isActive) {
                lockWidget.onClick(function () {
                    if (uw.userDataCtrl.getLvl() < lvlRequired) {
                        mo.showMsg(uw.id_c_msgCode.noOpen, lvlRequired);
                    }
                });
            }
            node.setBright(isActive);
            node.setTouchEnabled(false);
            node.setTag(cid);
            node.onClick(this.menuShowChildLayer, this);
            node.titleOriginPos = nameWidget.getPosition();
        };
        /**
         * 选择当前选中的主副本节点
         * @param pId  主副本ID
         */
        __egretProto__.setCurPrimaryCopy = function (pId) {
            var primaryCopyMap = this._primaryCopyMap;
            var widget = primaryCopyMap[pId], stage, pCopyId;
            var self = this;
            if (self._curPrimaryCopyNode == widget)
                return;
            self._curPrimaryCopyNode = widget;
            for (var pId in primaryCopyMap) {
                stage = primaryCopyMap[pId];
                pCopyId = stage.getTag();
                var isActive = !!self._progress[pId] && (uw.userDataCtrl.getLvl() >= self._progress[pId].lvlRequired);
                var isFocus = stage == widget;
                if (isFocus) {
                    self.showChildLayer(pCopyId);
                    self._titleStartFloat(stage);
                }
                else {
                    self._titleStopFloat(stage);
                }
                stage.setFocused(false); //引擎bug，要先设置为false才能设置为true，也是醉了
                stage.setFocused(isFocus);
                stage.setTouchEnabled(!isFocus && isActive);
                var title = stage.getWidgetByName("name");
                title.setBright(isFocus);
                title.setTitlePosByPercent(0.5, (isFocus == true) ? 0.33 : 0.425);
            }
        };
        __egretProto__.unlockPrimaryCopy = function (pCopyNode) {
            pCopyNode.setBright(true);
            pCopyNode.setTouchEnabled(true);
            var lockWidget = pCopyNode.getWidgetByName("lock");
            lockWidget.setVisible(false);
            this.setLastestStage(pCopyNode);
        };
        __egretProto__.menuShowChildLayer = function (sender) {
            this.setCurPrimaryCopy(sender.getTag());
        };
        /**
         * 标题开始浮动
         * @param stage
         * @private
         */
        __egretProto__._titleStartFloat = function (stage) {
            var title = stage.getWidgetByName("name");
            title.stopAllActions();
            var moveAround = mo.repeatForever(mo.sequence(mo.moveBy(2, mo.p(0, 30)), mo.moveBy(2, mo.p(0, -30))));
            title.runAction(moveAround);
        };
        /**
         * 标题停止浮动
         * @param stage
         * @private
         */
        __egretProto__._titleStopFloat = function (stage) {
            var title = stage.getWidgetByName("name");
            title.stopAllActions();
            title.setPosition(stage.titleOriginPos);
        };
        /**
         * 设置最新的子副本
         * @param node
         */
        __egretProto__.setLastestStage = function (node) {
            this._lastestPrimaryCopy = node;
        };
        /**
         * 根据id获取最新的子副本
         * @param id
         * @returns {*}
         */
        __egretProto__.getStageById = function (id) {
            return this._primaryCopyMap[id];
        };
        /**
         * 显示子副本内容
         * @param pCopyId
         */
        __egretProto__.showChildLayer = function (pCopyId) {
            this._delegate.showChildLayer(pCopyId, this._latestPCId);
        };
        /**
         * 解锁下一个副本
         */
        __egretProto__.unlockNextPrimaryStage = function () {
            if (this._curPrimaryCopyNode && this._curPrimaryCopyNode == this._lastestPrimaryCopy) {
                var nextId = parseInt(this._curPrimaryCopyNode.getTag()) + 1, nextPrimaryStage = this._primaryCopyMap[nextId], primaryInfo = mo.getJSONWithFileNameAndID(uw.cfg_t_copyPrimary, nextId);
                //领主等级足够才解锁
                var lvlEnough = uw.userDataCtrl.getLvl() >= primaryInfo[uw.t_copyPrimary_lvlRequired];
                if (nextPrimaryStage && lvlEnough && this._unlockStageActive) {
                    this._unlockStageActive = false;
                    this.unlockPrimaryCopy(nextPrimaryStage);
                    this._latestPCId = nextId;
                    // 把焦点移动到刚解锁的主副本
                    this.setCurPrimaryCopy(nextId);
                    mo.playUIAudio(110);
                }
            }
        };
        //设置是否可以解锁下一个大副本
        __egretProto__.setUnlockStageActive = function () {
            this._unlockStageActive = true;
        };
        __egretProto__.revertState = function () {
            var self = this;
            var scrollNode = self._curPrimaryCopyNode || self._lastestPrimaryCopy;
            if (!scrollNode)
                return;
            //浮动当前主副本的标题啊
            self._titleStopFloat(scrollNode);
            self._titleStartFloat(scrollNode);
            var floorSize = this._floor.getSize();
            var innerCtnSize = this._floor.getInnerContainerSize();
            var pos = scrollNode.getPosition();
            var startX = floorSize.width * 0.5;
            var diff = pos.x - startX;
            var percent = (diff < 0) ? 0 : diff / (innerCtnSize.width - floorSize.width);
            percent = percent > 1 ? 1 : percent;
            self._floor.jumpToPercentHorizontal(percent * 100);
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            self._primaryCopyMap = null;
        };
        CopyPrimaryHelper.__className = "CopyPrimaryHelper";
        return CopyPrimaryHelper;
    })(mo.Class);
    uw.CopyPrimaryHelper = CopyPrimaryHelper;
    CopyPrimaryHelper.prototype.__class__ = "uw.CopyPrimaryHelper";
})(uw || (uw = {}));

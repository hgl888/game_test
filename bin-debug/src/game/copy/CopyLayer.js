/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var CopyLayer = (function (_super) {
        __extends(CopyLayer, _super);
        function CopyLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = CopyLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiCopyLayer_ui;
            self._copyFightReslut = false;
        };
        /**
         *
         * @param copyId 如果不为空，则画根手指指向该副本节点
         * @param difficulty
         */
        __egretProto__.init = function (copyId, difficulty) {
            _super.prototype.init.call(this);
            var self = this;
            self._focusOnCopyId = copyId;
            difficulty = difficulty || uw.c_prop.pCopyTypeKey.normal;
            var primaryCopyContainer = self.getWidgetByName(CopyLayer.PRIMARY_COPY);
            self._primaryHelper = uw.CopyPrimaryHelper.create(this, primaryCopyContainer);
            var childCopyContainer = self.getWidgetByName(CopyLayer.CHILD_COPY);
            childCopyContainer.clippingEnabled = false;
            self._childHelper = uw.CopyChildHelper.create(this, childCopyContainer);
            // 设置副本类型切换按钮
            self._btnNormal = self.getWidgetByName(CopyLayer.BTN_NORMAL);
            self._btnPro = self.getWidgetByName(CopyLayer.BTN_ELITE);
            self.onClickByName(CopyLayer.BTN_NORMAL, self.onSwitchClick, self);
            self.onClickByName(CopyLayer.BTN_ELITE, self.onSwitchClick, self);
            // 切换主副本类型，并创建主副本节点
            if (copyId) {
                difficulty = uw.userDataCtrl.getCopyProgressByCopyId(copyId).isCream(copyId) ? uw.c_prop.pCopyTypeKey.cream : uw.c_prop.pCopyTypeKey.normal;
            }
            self.switchDifficulty(difficulty);
            // 注册战斗结果回调
            self.registerClassByKey(uw.CopyProgressDataCtrl, uw.CopyProgressDataCtrl.ON_NEW_COPY_OPENED, self.setCopyFightResult);
            //适配
            self.setAdaptiveScaleByName(CopyLayer.IMG_CHILDBG, mo.RESOLUTION_POLICY.FIXED_WIDTH);
        };
        __egretProto__.setCopyTypeBar = function () {
            var self = this, c_open = uw.id_c_open;
            var isVisible = uw.verifyLevel(c_open.creamCopy, false);
            self.setVisibleByName("type_bar_Copy", isVisible);
            self._btnNormal.setTouchEnabled(isVisible);
            self._btnPro.setTouchEnabled(isVisible);
        };
        __egretProto__.getPrimaryStageById = function (id) {
            return this._primaryHelper.getStageById(id);
        };
        __egretProto__.getChildStageById = function (id) {
            return this._childHelper.getStageById(id);
        };
        __egretProto__.onSwitchClick = function (sender) {
            var self = this;
            var difficulty = sender.getName();
            self.switchDifficulty((difficulty == CopyLayer.BTN_ELITE) ? uw.c_prop.pCopyTypeKey.cream : uw.c_prop.pCopyTypeKey.normal);
            //难度切换后，不再显示手指
            self._focusOnCopyId = null;
        };
        __egretProto__.switchDifficulty = function (pCopyType) {
            var self = this;
            if (self._pCopyType == pCopyType)
                return;
            var isCream = (pCopyType == uw.c_prop.pCopyTypeKey.cream);
            self._pCopyType = pCopyType;
            self._btnNormal.setBright(!isCream);
            self._btnPro.setBright(isCream);
            self.showPrimaryLayer(pCopyType);
            // 设置子副本容器背景图
            var childBg = self.getWidgetByName(CopyLayer.IMG_CHILDBG);
            var textName = isCream ? res.ui_copy.copy_map_child_level0_elite_jpg : res.ui_copy.copy_map_child_level0_jpg;
            childBg.loadTexture(textName);
            //设置颜色
            self.setVisibleByName(CopyLayer.LINE_CENTER_BLUE, !isCream);
            self.setVisibleByName(CopyLayer.LINE_CENTERRED, isCream);
            self.setVisibleByName(CopyLayer.IMG_CRESTRIGHT, isCream);
            self.setVisibleByName(CopyLayer.IMG_CRESTLEFT, isCream);
            //引导需要用到
            process.nextTick(function () {
                process.nextTick(function () {
                    var dispatcher = mo.actionDispatcher, eventType = gEventType.switchCopyDifficulty;
                    mo.dispatchEvent([[dispatcher, eventType]], function () {
                    }, self);
                });
            });
        };
        __egretProto__.showPrimaryLayer = function (pCopyType) {
            var self = this;
            var copyProgressMap = uw.userDataCtrl.getCopyProgressMapByType(pCopyType);
            self._primaryHelper.resetData(pCopyType, copyProgressMap);
            self._primaryHelper.revertState();
        };
        __egretProto__.showChildLayer = function (pCopyId, latestPId) {
            var self = this;
            var copyProgressDataCtrl = uw.userDataCtrl.getCopyProgress(pCopyId);
            self._childHelper.resetData(copyProgressDataCtrl, latestPId);
            self._childHelper.revertState();
        };
        __egretProto__.onEnterNextTick = function () {
            _super.prototype.onEnterNextTick.call(this);
            var self = this;
            // 是否显示副本难度切换按钮
            self.setCopyTypeBar();
            if (self._childHelper) {
                if (self._copyFightReslut != null) {
                    //处理是否完成了当前主副本或当前子副本
                    self._childHelper.updateChildState(self._copyFightReslut);
                    self._copyFightReslut = null;
                    //副本回到原来的位置
                    self._childHelper.revertState();
                }
                self._childHelper.showShineEffect();
            }
            if (self._primaryHelper) {
                self._primaryHelper.revertState();
                self._primaryHelper.unlockNextPrimaryStage();
            }
            var copyId = self._focusOnCopyId;
            if (copyId) {
                var pId = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId)[uw.t_copy_pCopyId];
                self._primaryHelper.setCurPrimaryCopy(pId);
                self._childHelper.pointerToCopy(copyId);
                self._primaryHelper.revertState();
            }
            else {
                self._childHelper.revertState();
            }
        };
        __egretProto__.setCopyFightResult = function () {
            this._copyFightReslut = true;
        };
        __egretProto__.getPrimaryHelper = function () {
            return this._primaryHelper;
        };
        __egretProto__.showCopyInfoLayer = function (copyId) {
            uw.pushSubModule(uw.SubModule.CopyInfo, copyId);
        };
        __egretProto__.getChildHelper = function () {
            return this._childHelper;
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            //主动释放引用
            self._childHelper.doDtor();
            self._childHelper = null;
            self._primaryHelper.doDtor();
            self._primaryHelper = null;
        };
        CopyLayer.__className = "CopyLayer";
        CopyLayer.PRIMARY_COPY = "primaryCopy";
        CopyLayer.CHILD_COPY = "childCopy";
        CopyLayer.BTN_NORMAL = "btnNormal";
        CopyLayer.BTN_ELITE = "btnPro";
        CopyLayer.IMG_CHILDBG = "childBg";
        CopyLayer.LINE_CENTER_BLUE = "line_center_blue";
        CopyLayer.LINE_CENTERRED = "line_centerRed"; //红色的线
        CopyLayer.IMG_CRESTRIGHT = "img_crestRight"; //红色的花纹
        CopyLayer.IMG_CRESTLEFT = "img_crestLeft"; //红色的花纹
        return CopyLayer;
    })(mo.DisplayLayer);
    uw.CopyLayer = CopyLayer;
    CopyLayer.prototype.__class__ = "uw.CopyLayer";
})(uw || (uw = {}));

var uw;
(function (uw) {
    var UpAction = (function (_super) {
        __extends(UpAction, _super);
        function UpAction() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UpAction.prototype;
        __egretProto__.init = function (container, frameName, duration, pos, offsetY) {
            duration = duration || 2;
            pos = pos || mo.p(container.getSize().width / 2, container.getSize().height / 2);
            offsetY = offsetY || -100;
            var sp = this._sp = mo.UIImage.create();
            sp.loadTexture(frameName);
            container.addChild(sp, 100);
            sp.setPosition(pos);
            sp.setScale(0.5);
            var fadeOut = mo.fadeOut(duration);
            var scaleAct = mo.scaleTo(0.1, 1).setEase(mo.Ease.backOut);
            var act = mo.moveBy(duration, mo.p(0, -offsetY)).setEase(mo.Ease.sineIn);
            act = mo.spawn(act, fadeOut);
            act = mo.sequence(scaleAct, act, mo.callFunc(this._onActionEnd, this));
            sp.runAction(act);
        };
        __egretProto__._onActionEnd = function () {
            this._sp.removeFromParent(true);
        };
        /**
         * 默认情况下，只要传前面两个参数就行了
         * @param container     容器
         * @param frameName     动画的frameName
         * @param duration      持续时间
         * @param pos           播放的初始位置
         * @param offsetY       移动距离
         */
        UpAction.play = function (container, frameName, duration, pos, offsetY) {
            var ac = new uw.UpAction();
            ac.init(container, frameName, duration, pos, offsetY);
        };
        /**
         * 播放升级动画
         * @param container
         */
        UpAction.playLvlUp = function (container) {
            this.play(container, UpAction.FN_LVL_UP);
        };
        UpAction.FN_LVL_UP = res.ui_panel.levelUP_png;
        return UpAction;
    })(mo.Class);
    uw.UpAction = UpAction;
    UpAction.prototype.__class__ = "uw.UpAction";
    var UpArmature = (function (_super) {
        __extends(UpArmature, _super);
        function UpArmature() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UpArmature.prototype;
        __egretProto__.init = function (parent, resId, pos) {
            _super.prototype.init.call(this);
            var self = this;
            pos = pos || mo.p(parent.getSize().width / 2, parent.getSize().height / 2);
            var armature = self._armature = uw.uiArmFactory.produceDynamic(resId, function (sender) {
                self._playOnLoaded(sender);
            });
            armature.setPosition(pos);
            if (parent instanceof mo.UIWidget) {
                if (parent.bgOpacity) {
                    parent.bgOpacity = 0; //设置为无色
                }
            }
            armature.zOrder = 9999;
            parent.addChild(armature);
            armature.setMovementEventCallFunc(self._onActionFinish, self);
        };
        __egretProto__.getArmature = function () {
            return this._armature;
        };
        __egretProto__.setEndCallback = function (cb, target) {
            var self = this;
            self._armEndCb = cb;
            self._armEndTarget = target;
        };
        __egretProto__.setEventCallback = function (eventName, cb, target) {
            var self = this;
            self._armEventCb = cb;
            self._armEventTarget = target;
            self._armEventName = eventName;
            self._armature.setFrameEventCallFunc(self._onEvent, self);
        };
        __egretProto__._playOnLoaded = function (sender) {
            sender.playWithIndex(0);
        };
        __egretProto__._onActionFinish = function (armature, movementType, movementID) {
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                armature.removeFromParent(true);
                if (this._armEndCb)
                    this._armEndCb.call(this._armEndTarget, this, this._armature);
                this._armature = null;
            }
        };
        __egretProto__._onEvent = function (bone, evt, originFrameIndex, currentFrameIndex) {
            if (evt == this._armEventName) {
                if (this._armEventCb)
                    this._armEventCb.call(this._armEventTarget, this, this._armature);
            }
        };
        __egretProto__.clear = function () {
            var self = this;
            if (self._armature) {
                self._armature.stop();
                self._armature.removeFromParent(true);
                self._armature = null;
            }
        };
        UpArmature.play = function (parent, armName, pos, endCb, endCbTarget) {
            var armCtrl = new this();
            armCtrl.init(parent, armName, pos);
            armCtrl.setEndCallback(endCb, endCbTarget);
            return armCtrl;
        };
        UpArmature.playWithEvent = function (parent, armName, pos, eventName, eventCb, eventTarget) {
            var armCtrl = new this();
            armCtrl.init(parent, armName, pos);
            armCtrl.setEventCallback(eventName, eventCb, eventTarget);
            return armCtrl;
        };
        UpArmature.__className = "UpArmature";
        return UpArmature;
    })(mo.Class);
    uw.UpArmature = UpArmature;
    UpArmature.prototype.__class__ = "uw.UpArmature";
    var UpArmatureWithBegin = (function (_super) {
        __extends(UpArmatureWithBegin, _super);
        function UpArmatureWithBegin() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UpArmatureWithBegin.prototype;
        __egretProto__._playOnLoaded = function (armature) {
            armature.play("begin");
        };
        __egretProto__.end = function () {
            this._armature.play("end");
        };
        __egretProto__._onActionFinish = function (armature, movementType, movementID) {
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                if (movementID == "begin") {
                    armature.play("loop");
                    if (this._armEndCb)
                        this._armEndCb.call(this._armEndTarget, this, this._armature);
                }
                else if (movementID == "end") {
                    armature.removeFromParent(true);
                }
            }
        };
        UpArmatureWithBegin.__className = "UpArmatureWithBegin";
        return UpArmatureWithBegin;
    })(UpArmature);
    uw.UpArmatureWithBegin = UpArmatureWithBegin;
    UpArmatureWithBegin.prototype.__class__ = "uw.UpArmatureWithBegin";
})(uw || (uw = {}));

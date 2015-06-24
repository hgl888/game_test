/**
 * Created by huanghaiying on 14/12/17.
 */
var mo;
(function (mo) {
    //高亮列表
    var highterResList = [
        "effect_00003",
        "effect_00007",
        "effect_00008",
        "effect_00010",
        "effect_00011",
        "effect_00012",
        "effect_00017",
        "effect_00018",
        "effect_05004",
        "effect_05005",
        "effect_05011"
    ];
    var Armature = (function (_super) {
        __extends(Armature, _super);
        function Armature() {
            _super.apply(this, arguments);
            this._completeCalls = [];
            this._completeObjs = [];
            this._frameCalls = [];
            this._frameObjs = [];
            this._isReady = false;
            this._delayAnimationName = "";
        }
        var __egretProto__ = Armature.prototype;
        Armature.RESET_ARM_COUNT_MAP = function () {
            this._ARM_COUNT_MAP = {};
        };
        Armature.ADD_TO_ARM_COUNT_MAP = function (arm) {
            var name = arm._armPath;
            var info = this._ARM_COUNT_MAP[name];
            if (!info) {
                info = this._ARM_COUNT_MAP[name] = { count: 0, hashCodes: [] };
            }
            info.count++;
            info.hashCodes.push(arm.hashCode);
        };
        Armature.DEL_FROM_ARM_COUNT_MAP = function (arm) {
            var name = arm._armPath;
            var info = this._ARM_COUNT_MAP[name];
            info.count--;
            var hashCodes = info.hashCodes;
            for (var i = 0, l_i = hashCodes.length; i < l_i; i++) {
                if (arm.hashCode == hashCodes[i])
                    ;
                hashCodes.splice(i, 1);
            }
            if (info.count == 0) {
                delete this._ARM_COUNT_MAP[name];
            }
        };
        Armature.PRINT_RESET_ARM_COUNT_MAP = function () {
            var map = this._ARM_COUNT_MAP;
            for (var key in map) {
                var info = map[key];
                mo.error("armature【%s】还有【%s】个没释放：%s", key, info.count, info.hashCodes.join(","));
            }
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            this.registerTicker();
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            this.unRegisterTicker();
        };
        /**
         * 注册到定时器
         */
        __egretProto__.registerTicker = function () {
            if (!this._armature || !this._parent || this._isAddTicker) {
                return;
            }
            this._isAddTicker = true;
            mo.worldClock.add(this._armature);
        };
        /**
         * 从定时器中移除
         */
        __egretProto__.unRegisterTicker = function () {
            if (!this._armature || !this._isAddTicker) {
                return;
            }
            this._isAddTicker = false;
            mo.worldClock.remove(this._armature);
        };
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            var map = self._movementTypeMap = {}, dae = dragonBones.AnimationEvent, mt = self.__class.MOVEMENT_TYPE;
            map[dae.START] = mt.START;
            map[dae.COMPLETE] = mt.COMPLETE;
            map[dae.LOOP_COMPLETE] = mt.LOOP_COMPLETE;
            self._completeCalls = [];
            self._completeObjs = [];
            self._frameCalls = [];
            self._frameObjs = [];
            self._isAddTicker = false;
            self._delayAnimationIndex = -1;
        };
        __egretProto__.initDynamic = function (armPath, defaultSpriteFile, cb, cbTarget) {
            var self = this;
            var l = arguments.length;
            var defaultFile, cb;
            if (typeof arguments[1] == 'function') {
                cb = arguments[1];
                cbTarget = arguments[2];
            }
            else {
                defaultFile = arguments[1];
                cb = arguments[2];
                cbTarget = arguments[3];
            }
            var defaultSprite;
            if (defaultFile != null && defaultFile != "") {
                if (typeof defaultFile == "string") {
                    defaultSprite = new mo.Sprite(res.getRes(defaultFile));
                }
                else if (defaultFile instanceof egret.Texture) {
                    defaultSprite = new mo.Sprite(defaultFile);
                }
                else if (defaultFile instanceof egret.DisplayObject) {
                    defaultSprite = defaultFile;
                }
                self.addChild(defaultSprite);
            }
            self._armPath = armPath;
            self._armName = path.basename(armPath, ".arm");
            mo.Armature.ADD_TO_ARM_COUNT_MAP(this);
            res.load([armPath], function () {
                if (self._nodeOption.hasDtored)
                    return;
                self.initArmature();
                if (defaultSprite) {
                    self.removeChild(defaultSprite);
                }
                if (cb) {
                    cb.call(cbTarget, self);
                }
            }, self);
        };
        __egretProto__.handleDynamic = function (name, defaultFile, cb, cbTarget) {
            if (arguments.length <= 1) {
                return;
            }
            if (typeof arguments[1] == 'function') {
                cbTarget = arguments[2];
                cb = arguments[1];
            }
            else {
                cbTarget = arguments[3];
                cb = arguments[2];
                defaultFile = arguments[1];
            }
            if (cb) {
                var self = this;
                var armatureDisplay = self._armature ? self._armature.getDisplay() : null;
                if (armatureDisplay)
                    armatureDisplay.visible = false;
                process.nextTick(function () {
                    if (armatureDisplay)
                        armatureDisplay.visible = true;
                    cb.call(cbTarget, self);
                }, self);
            }
        };
        //@override
        __egretProto__.init = function (armPath) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self._armPath = armPath;
            self._armName = path.basename(armPath, ".arm");
            self.initArmature();
            mo.Armature.ADD_TO_ARM_COUNT_MAP(this);
        };
        __egretProto__._getWidth = function () {
            if (this._armature.getDisplay()) {
                return this._armature.getDisplay().width;
            }
            return 0;
        };
        __egretProto__._getHeight = function () {
            if (this._armature.getDisplay()) {
                return this._armature.getDisplay().height;
            }
            return 0;
        };
        __egretProto__.initArmature = function () {
            var self = this;
            self._isReady = true;
            var blendMode = "";
            var armPath = self._armPath;
            var armName = self._armName;
            //高亮
            if (highterResList.indexOf(armName) > -1) {
                blendMode = egret.BlendMode.ADD;
            }
            var armData = res.getRes(armPath);
            if (!armData) {
                throw new Error(mo.formatStr("请先加载动画资源：%s", name));
            }
            var factory = mo._dbFactory;
            factory.setBlendMode(blendMode);
            if (egret.MainContext.runtimeType == egret.MainContext.RUNTIME_NATIVE) {
                self._armature = factory.buildArmatrue(armName); //TODO 我TMD也是醉了
            }
            else {
                self._armature = factory.buildArmature(armName);
            }
            var armatureDisplay = self._armature.getDisplay();
            self.addChild(armatureDisplay);
            self.registerTicker();
            self._completeFunc = self.completeHandler.bind(self);
            self._frameFunc = self.frameHandler.bind(self);
            self.addListeners();
            if (self._delayAnimationIndex > -1) {
                self.playWithIndex(self._delayAnimationIndex);
            }
            else if (self._delayAnimationName) {
                self.play(self._name);
            }
        };
        __egretProto__.dtor = function () {
            var self = this;
            self.removeListeners();
            self.unRegisterTicker();
            _super.prototype.dtor.call(this);
            self._armature = null;
            mo.Armature.DEL_FROM_ARM_COUNT_MAP(self);
        };
        __egretProto__.setSpeedScale = function (speedScale) {
        };
        __egretProto__.addListeners = function () {
            var self = this, armature = self._armature, dae = dragonBones.AnimationEvent;
            armature.addEventListener(dae.START, self._completeFunc);
            armature.addEventListener(dae.COMPLETE, self._completeFunc);
            armature.addEventListener(dae.LOOP_COMPLETE, self._completeFunc);
            armature.addEventListener(dragonBones.FrameEvent.BONE_FRAME_EVENT, self._frameFunc);
        };
        __egretProto__.removeListeners = function () {
            var self = this, armature = self._armature, dae = dragonBones.AnimationEvent;
            if (!armature)
                return;
            armature.removeEventListener(dae.START, self._completeFunc);
            armature.removeEventListener(dae.COMPLETE, self._completeFunc);
            armature.removeEventListener(dae.LOOP_COMPLETE, self._completeFunc);
            armature.removeEventListener(dragonBones.FrameEvent.BONE_FRAME_EVENT, self._frameFunc);
        };
        __egretProto__.completeHandler = function (e) {
            var self = this, playingName = self._name, mtMap = self._movementTypeMap;
            var calls = self._completeCalls, objs = self._completeObjs;
            for (var i = 0, l_i = calls.length; i < l_i; i++) {
                var func = calls[i];
                if (func) {
                    func.apply(objs[i], [self, mtMap[e.type], playingName]);
                }
            }
        };
        __egretProto__.frameHandler = function (e) {
            var self = this;
            var calls = self._frameCalls, objs = self._frameObjs;
            var bone = e.bone, label = e.frameLabel;
            for (var i = 0, l_i = calls.length; i < l_i; i++) {
                var func = calls[i];
                if (func) {
                    func.apply(objs[i], [bone, label]);
                }
            }
        };
        //是否已经加载好资源了
        __egretProto__.isReady = function () {
            return this._isReady;
        };
        __egretProto__.getAnimation = function () {
            if (!this._armature)
                return null;
            return this._armature.animation;
        };
        Object.defineProperty(__egretProto__, "name", {
            /**
             * 获取播放的名称
             * @returns {string}
             */
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 播放第几个动画
         * @param index
         */
        __egretProto__.playWithIndex = function (index) {
            if (this.isReady()) {
                this._delayAnimationIndex = -1;
                var dataNameList = this.getAnimation().animationList;
                var dataName = dataNameList[index];
                if (!dataName) {
                    mo.warn("armature:%s 没有第[%s]个动画", this._armPath, index + 1);
                }
                else {
                    this.play(dataName);
                }
            }
            else {
                this._delayAnimationIndex = index;
            }
        };
        /**
         * 停在第几个动画
         * @param index
         */
        __egretProto__.stopWithIndex = function (index) {
            if (this.isReady()) {
                this._delayAnimationIndex = -1;
                var dataNameList = this.getAnimation().animationList;
                var dataName = dataNameList[index];
                if (!dataName) {
                    mo.warn("armature:%s 没有第[%s]个动画", this._armPath, index + 1);
                }
                else {
                    if (this.getAnimation()) {
                        this._name = dataName;
                        this.getAnimation().gotoAndStop(dataName, 1);
                    }
                }
            }
            else {
                this._delayAnimationIndex = index;
            }
        };
        __egretProto__.hasAnimationName = function (animationName) {
            return this.getAnimation().animationList.indexOf(animationName) >= 0;
        };
        /**
         * 播放名为name的动画
         * @param name
         */
        __egretProto__.play = function (name) {
            var self = this;
            self.registerTicker();
            self._name = name;
            self._delayAnimationName = "";
            if (self.isReady() && self.getAnimation()) {
                self.getAnimation().gotoAndPlay(name, 0);
                self._armature.advanceTime(0);
            }
            else {
                self._delayAnimationName = name;
            }
        };
        /**
         * 停止后恢复播放
         */
        __egretProto__.resume = function () {
            this.registerTicker();
        };
        /**
         * 暂停播放
         */
        __egretProto__.pause = function () {
            this.unRegisterTicker();
        };
        /**
         * 停止播放
         */
        __egretProto__.stop = function () {
            if (this.getAnimation())
                this.getAnimation().stop();
        };
        __egretProto__.reset = function () {
            _super.prototype.reset.call(this);
            var self = this;
            //移除监听
            self._completeCalls.length = 0;
            self._completeObjs.length = 0;
            self._frameCalls.length = 0;
            self._frameObjs.length = 0;
        };
        __egretProto__.setMovementEventCallFunc = function (callFunc, target) {
            this._completeCalls.push(callFunc);
            this._completeObjs.push(target);
        };
        /**
         * 移除一个movement事件
         * @param callFunc
         * @param target
         */
        __egretProto__.removeMovementEvent = function (callFunc, target) {
            var callfuncs = this._completeCalls, targets = this._completeObjs;
            for (var i = 0, li = callfuncs.length; i < li; i++) {
                if (callfuncs[i] == callFunc && (!target || target == targets[i])) {
                    callfuncs.splice(i, 1);
                    targets.splice(i, 1);
                    i--;
                }
            }
        };
        __egretProto__.setFrameEventCallFunc = function (callFunc, target) {
            this._frameCalls.push(callFunc);
            this._frameObjs.push(target);
        };
        /**
         * 移除一个frame事件
         * @param callFunc
         * @param target
         */
        __egretProto__.removeFrameEvent = function (callFunc, target) {
            var callfuncs = this._frameCalls, targets = this._frameObjs;
            for (var i = 0, li = callfuncs.length; i < li; i++) {
                if (callfuncs[i] == callFunc && (!target || target == targets[i])) {
                    callfuncs.splice(i, 1);
                    targets.splice(i, 1);
                    i--;
                }
            }
        };
        __egretProto__.getBoneConfig = function (boneName) {
            var headBone = this._armature.getBone(boneName);
            var headDisplay = headBone.slot.getDisplay();
            return [headBone.global.x, headBone.global.y, headDisplay.width, headDisplay.height];
        };
        Armature.__className = "Armature";
        Armature.MOVEMENT_TYPE = { START: 0, COMPLETE: 1, LOOP_COMPLETE: 2 };
        Armature._ARM_COUNT_MAP = {};
        return Armature;
    })(mo.Node);
    mo.Armature = Armature;
    Armature.prototype.__class__ = "mo.Armature";
})(mo || (mo = {}));

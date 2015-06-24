var mo;
(function (mo) {
    //Armature动画缓冲池===========
    var ArmatureFactory = (function (_super) {
        __extends(ArmatureFactory, _super);
        function ArmatureFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ArmatureFactory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._createCount = 2;
            self._productClass = mo.Armature;
        };
        __egretProto__._getArmPath = function (pathStr) {
            return pathStr;
        };
        __egretProto__.produce = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args[0] = this._getArmPath(args[0]);
            return _super.prototype.produce.apply(this, args);
        };
        __egretProto__.produceDynamic = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            args[0] = this._getArmPath(args[0]);
            return _super.prototype.produceDynamic.apply(this, args);
        };
        __egretProto__.attachDynamicNodeTo = function (parent, armName, defaultSpriteFile, cb, cbTarget) {
            var args = Array.prototype.slice.apply(arguments);
            var parent = args[0];
            args.splice(0, 1);
            var arm = this.produceDynamic.apply(this, args);
            if (parent) {
                parent.addChild(arm);
            }
            return arm;
        };
        __egretProto__.attachDynamicNodeTo4Recycle = function (parent, armName, defaultSpriteFile, cb, cbTarget) {
            var args = Array.prototype.slice.apply(arguments);
            var parent = args[0];
            args.splice(0, 1);
            var arm = this.produceDynamic4Recycle.apply(this, args);
            if (parent) {
                parent.addChild(arm);
            }
            return arm;
        };
        ArmatureFactory.__className = "ArmatureFactory";
        return ArmatureFactory;
    })(mo.MultiIdBaseFactory);
    mo.ArmatureFactory = ArmatureFactory;
    ArmatureFactory.prototype.__class__ = "mo.ArmatureFactory";
    mo.armatureFactory;
})(mo || (mo = {}));

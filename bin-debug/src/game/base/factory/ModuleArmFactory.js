var uw;
(function (uw) {
    var ModuleArmFactory = (function (_super) {
        __extends(ModuleArmFactory, _super);
        function ModuleArmFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ModuleArmFactory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
        };
        __egretProto__._getArmPath = function (resId) {
            return resHelper.getArmPath(this._moduleName, resId);
        };
        /**
         * 获取arm资源列表
         * @param {Number|String|Array} resIds
         * @returns {Array}
         */
        __egretProto__.getResArr = function (resIds) {
            resIds = resIds instanceof Array ? resIds : [resIds];
            var resArr = [];
            for (var i = 0; i < resIds.length; ++i) {
                resArr.push(this._getArmPath(resIds[i]));
            }
            return resArr;
        };
        /**
         * 预先加载arm资源
         * @param {Number|String|Array} resIds
         * @param {Function} cb
         * @param {Object|Null} target
         */
        __egretProto__.preload = function (resIds, cb, target) {
            //TODO 以前是mo.resMgr
            res.load(this.getResArr(resIds), cb, target);
        };
        ModuleArmFactory.__className = "ModuleArmFactory";
        return ModuleArmFactory;
    })(mo.ArmatureFactory);
    uw.ModuleArmFactory = ModuleArmFactory;
    ModuleArmFactory.prototype.__class__ = "uw.ModuleArmFactory";
    var RoleArmFactory = (function (_super) {
        __extends(RoleArmFactory, _super);
        function RoleArmFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = RoleArmFactory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._moduleName = resHelper.dynamic.role;
        };
        __egretProto__.getResArr = function (resIds) {
            resIds = resIds instanceof Array ? resIds : [resIds];
            var resArr = [];
            for (var i = 0; i < resIds.length; ++i) {
                var resId = resIds[i];
                resArr = resArr.concat(uw.getRoleResArr(resId));
            }
            return resArr;
        };
        RoleArmFactory.__className = "RoleArmFactory";
        return RoleArmFactory;
    })(ModuleArmFactory);
    uw.RoleArmFactory = RoleArmFactory;
    RoleArmFactory.prototype.__class__ = "uw.RoleArmFactory";
    //角色动画工厂单例
    uw.roleArmFactory;
    var UIArmFactory = (function (_super) {
        __extends(UIArmFactory, _super);
        function UIArmFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIArmFactory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._moduleName = resHelper.dynamic.ui;
        };
        UIArmFactory.__className = "UIArmFactory";
        return UIArmFactory;
    })(ModuleArmFactory);
    uw.UIArmFactory = UIArmFactory;
    UIArmFactory.prototype.__class__ = "uw.UIArmFactory";
    //ui场景动画工厂单例
    uw.uiArmFactory;
    var EffectArmFactory = (function (_super) {
        __extends(EffectArmFactory, _super);
        function EffectArmFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EffectArmFactory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._moduleName = resHelper.dynamic.effect;
        };
        EffectArmFactory.__className = "EffectArmFactory";
        return EffectArmFactory;
    })(ModuleArmFactory);
    uw.EffectArmFactory = EffectArmFactory;
    EffectArmFactory.prototype.__class__ = "uw.EffectArmFactory";
    //ui场景动画工厂单例
    uw.effectArmFactory;
})(uw || (uw = {}));

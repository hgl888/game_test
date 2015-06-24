var uw;
(function (uw) {
    function clone(srcObj) {
        if (!srcObj)
            return srcObj;
        var dstObj = srcObj;
        if (srcObj instanceof Array) {
            dstObj = [];
            for (var i = 0, li = srcObj.length; i < li; ++i) {
                dstObj[i] = clone(srcObj[i]);
            }
        }
        else if (typeof srcObj == "object") {
            dstObj = {};
            for (var key in srcObj) {
                dstObj[key] = clone(srcObj[key]);
            }
        }
        return dstObj;
    }
    uw.clone = clone;
    var BaseTempData = (function () {
        function BaseTempData() {
        }
        var __egretProto__ = BaseTempData.prototype;
        __egretProto__.clone = function () {
            return clone(this);
        };
        return BaseTempData;
    })();
    uw.BaseTempData = BaseTempData;
    BaseTempData.prototype.__class__ = "uw.BaseTempData";
    //定义技能模板数据结构体
    var SkillTempData = (function (_super) {
        __extends(SkillTempData, _super);
        function SkillTempData() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SkillTempData.prototype;
        return SkillTempData;
    })(BaseTempData);
    uw.SkillTempData = SkillTempData;
    SkillTempData.prototype.__class__ = "uw.SkillTempData";
    //定义英雄模板数据结构体
    var HeroTempData = (function (_super) {
        __extends(HeroTempData, _super);
        function HeroTempData() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HeroTempData.prototype;
        return HeroTempData;
    })(BaseTempData);
    uw.HeroTempData = HeroTempData;
    HeroTempData.prototype.__class__ = "uw.HeroTempData";
    //定义角色模板数据结构体
    var WarriorTempData = (function (_super) {
        __extends(WarriorTempData, _super);
        function WarriorTempData() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = WarriorTempData.prototype;
        return WarriorTempData;
    })(BaseTempData);
    uw.WarriorTempData = WarriorTempData;
    WarriorTempData.prototype.__class__ = "uw.WarriorTempData";
    var EquipTempData = (function (_super) {
        __extends(EquipTempData, _super);
        function EquipTempData() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EquipTempData.prototype;
        return EquipTempData;
    })(BaseTempData);
    uw.EquipTempData = EquipTempData;
    EquipTempData.prototype.__class__ = "uw.EquipTempData";
    var EquipExclusiveTempData = (function (_super) {
        __extends(EquipExclusiveTempData, _super);
        function EquipExclusiveTempData() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EquipExclusiveTempData.prototype;
        return EquipExclusiveTempData;
    })(BaseTempData);
    uw.EquipExclusiveTempData = EquipExclusiveTempData;
    EquipExclusiveTempData.prototype.__class__ = "uw.EquipExclusiveTempData";
})(uw || (uw = {}));

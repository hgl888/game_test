var uw;
(function (uw) {
    var SecretData = (function () {
        function SecretData() {
            this.initId = 0; //初始技能Id
            this.heroTempIds = []; //英雄模板id列表
            this.heroTids = []; //英雄tid列表
            this.fragmentIds = []; //英雄碎片id列表
            this.fragmentRequireds = []; //碎片需要数量
            this.progress = []; //item = true, item = [curNum, totalNum]
            this.initLvl = 1; //开启领主等级
            this.lvl = 0; //技能等级
            this.skillId = 0; //技能Id
            this.seq = 0;
            this.passiveType = 0; // 0主动 >0被动
        }
        var __egretProto__ = SecretData.prototype;
        return SecretData;
    })();
    uw.SecretData = SecretData;
    SecretData.prototype.__class__ = "uw.SecretData";
    var SecretChangeData = (function () {
        function SecretChangeData(initId, isUpgrade) {
            if (isUpgrade === void 0) { isUpgrade = false; }
            this.initId = 0; //初始技能Id
            this.isUpgrade = false; //升级or激活
            this.initId = initId;
            this.isUpgrade = isUpgrade;
        }
        var __egretProto__ = SecretChangeData.prototype;
        return SecretChangeData;
    })();
    uw.SecretChangeData = SecretChangeData;
    SecretChangeData.prototype.__class__ = "uw.SecretChangeData";
})(uw || (uw = {}));

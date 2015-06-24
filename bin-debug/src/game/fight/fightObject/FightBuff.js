var uw;
(function (uw) {
    var FightBuff = (function (_super) {
        __extends(FightBuff, _super);
        function FightBuff() {
            _super.apply(this, arguments);
            this.time = 0; //累计时间
            this.handleNum = 0; //生效次数
            this.interval = 0; //间隔
            this.conTime = 0; //持续时间
            this.isCopy = false; //是否副本buff,buff副本无法移除
            this.isHalo = false; //是否永久
        }
        var __egretProto__ = FightBuff.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.time = 0;
            this.handleNum = 0;
            this.interval = 0;
            this.conTime = 0;
            this.isCopy = false;
            this.isHalo = false;
        };
        FightBuff.create = function (fromMember, member, buffData, continueType, isCopy) {
            var buff = new uw.FightBuff();
            buff.unitId = uw.fightUtils.getNewId(buffData.id + "_");
            buff.valueArr = [];
            buff.buffData = buffData;
            buff.fromMember = fromMember;
            buff.member = member;
            buff.continueType = continueType;
            buff.isCopy = isCopy || false;
            buff.interval = buffData.interval / 1000;
            buff.conTime = buffData.conTime / 1000;
            buff.isHalo = buffData.conTime < 0;
            var controller = uw.FightBuffBaseCtrl.create(buffData.stateType);
            buff.controller = controller;
            controller.addBuff(buff);
            return buff;
        };
        return FightBuff;
    })(mo.Class);
    uw.FightBuff = FightBuff;
    FightBuff.prototype.__class__ = "uw.FightBuff";
})(uw || (uw = {}));

/**
 * Created by Administrator on 14-8-5.
 */
var uw;
(function (uw) {
    var FightBuffBaseCtrl = (function (_super) {
        __extends(FightBuffBaseCtrl, _super);
        function FightBuffBaseCtrl() {
            _super.apply(this, arguments);
            this.isHandleAfterAdd = true;
            this.isTimeDone = false;
            this.isDeathRemove = false; //是否死亡移除
        }
        var __egretProto__ = FightBuffBaseCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        __egretProto__.update = function (dt) {
            var fightBuff = this.fightBuff;
            if (fightBuff.continueType == uw.buffContinueType.TIME) {
                fightBuff.time += dt;
                if (fightBuff.time >= fightBuff.conTime) {
                    if (!this.isTimeDone) {
                        this.isTimeDone = true;
                        dt = dt - (fightBuff.time - fightBuff.conTime);
                    }
                    else {
                        dt = 0;
                        //持续时间到移除
                        if (!fightBuff.isHalo)
                            this.removeBuff(false);
                    }
                }
            }
            else if (fightBuff.continueType == uw.buffContinueType.INTERVAL) {
                fightBuff.time += dt;
                this._calInterval();
            }
            if (dt > 0)
                this.step(dt);
        };
        __egretProto__.step = function (dt) {
        };
        //计算
        __egretProto__._calInterval = function () {
            var fightBuff = this.fightBuff;
            if (fightBuff.time >= fightBuff.handleNum * fightBuff.interval) {
                this.handle();
            }
        };
        //获取播放icon的位置
        __egretProto__.getIconPos = function () {
            var fightBuff = this.fightBuff, member = fightBuff.member;
            var targetDisplay = member.fightOption.curController.display;
            return targetDisplay;
        };
        //播放特效
        __egretProto__.addBuff = function (fightBuff) {
            this.fightBuff = fightBuff;
            this.member = this.fightBuff.member;
            this.memberDisplay = this.member.fightOption.curController.display;
            fightBuff.member.addFightBuff(fightBuff);
            uw.fightUtils.log("触发buff,name:%s pos:[%d],id:[%d],content:[%s]", fightBuff.member.name, fightBuff.member.fightOption.curPos, fightBuff.buffData.id, fightBuff.buffData.content);
            if (this.isHandleAfterAdd)
                this.handle();
            this.addDisplay();
        };
        //处理
        __egretProto__.handle = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var fightBuff = this.fightBuff;
            uw.fightUtils.log("buff生效,name:%s pos:[%d],id:[%d],content:[%s]", fightBuff.member.name, fightBuff.member.fightOption.curPos, fightBuff.buffData.id, fightBuff.buffData.content);
            this.myHandle.apply(this, arguments);
            fightBuff.handleNum++;
            var conNum = fightBuff.buffData.conNum;
            if (fightBuff.continueType == uw.buffContinueType.INTERVAL || fightBuff.continueType == uw.buffContinueType.NUM) {
                if (fightBuff.handleNum >= conNum && !fightBuff.isHalo) {
                    this.removeBuff(false);
                }
            }
        };
        //自己的处理，特殊可重写
        __egretProto__.myHandle = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        //放技能时，特殊可重写
        __egretProto__.skillBefore = function () {
        };
        //攻击时，特殊可重写
        __egretProto__.attack = function () {
        };
        //被攻击时，特殊可重写
        __egretProto__.hit = function (fromMember, hurt, fightSkill) {
            return 0;
        };
        //移除特效，特殊可重写
        __egretProto__.removeBuff = function (force) {
            var fightBuff = this.fightBuff;
            uw.fightUtils.log("移除buff,name:%s pos:[%d],id:[%d],content:[%s]", fightBuff.member.name, fightBuff.member.fightOption.curPos, fightBuff.buffData.id, fightBuff.buffData.content);
            fightBuff.member.removeFightBuff(fightBuff);
            this.removeDisplay();
            return true;
        };
        //添加icon
        __egretProto__.addDisplay = function () {
            var fightBuff = this.fightBuff;
            uw.buffShowBiz.addByBuff(fightBuff.member, fightBuff.buffData);
            uw.heroActionBiz.calAction(fightBuff.member);
            fightBuff.member.checkLimit();
        };
        //移除icon
        __egretProto__.removeDisplay = function () {
            var fightBuff = this.fightBuff;
            uw.buffShowBiz.removeByBuff(fightBuff.member, fightBuff.buffData);
            uw.heroActionBiz.calAction(fightBuff.member);
            fightBuff.member.checkLimit();
        };
        /**
         * 创建buff效果控制器
         * @param {uw.buffStateType} type
         * @returns {}
         */
        FightBuffBaseCtrl.create = function (type) {
            var Controller = uw.fightBuffCtrl_1_20[type];
            if (!Controller)
                Controller = uw.fightBuffCtrl_21_40[type];
            if (!Controller)
                Controller = uw.fightBuffCtrl_41_60[type];
            if (!Controller) {
                uw.warn("木有介个stateType[%s]buff啦", type);
                Controller = uw.FightBuffBaseCtrl;
            }
            var c = new Controller();
            c.init();
            return c;
        };
        FightBuffBaseCtrl.__className = "FightBuffEffectController";
        return FightBuffBaseCtrl;
    })(mo.DataController);
    uw.FightBuffBaseCtrl = FightBuffBaseCtrl;
    FightBuffBaseCtrl.prototype.__class__ = "uw.FightBuffBaseCtrl";
})(uw || (uw = {}));

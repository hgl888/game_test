/**
 * Created by Administrator on 14-8-28.
 */
var uw;
(function (uw) {
    var FightMoveAction = (function (_super) {
        __extends(FightMoveAction, _super);
        function FightMoveAction() {
            _super.apply(this, arguments);
            this.speed = 0;
            this.addX = 0;
            this.runLength = 0;
        }
        var __egretProto__ = FightMoveAction.prototype;
        __egretProto__.init = function (display, controller, cfg) {
            _super.prototype.init.call(this, display, controller, cfg);
            //飞出屏幕
            var winSize = mo.visibleRect.getSize();
            this.runLength = winSize.width - 400;
            this.attackMembers = {};
            var skillDisplay = this.fightSkill.skillDisplay;
            this.speed = skillDisplay[uw.t_skillDisplay_speed]; //速度
            var targetArea = this.fightSkill.skill.targetArea;
            this.curArea = [];
            for (var i = 0; i < targetArea.length; i++) {
                var locArea = targetArea[i];
                this.curArea.push(locArea.concat([]));
            }
        };
        __egretProto__.step = function (dt) {
            var self = this;
            var dtLength = self.speed * dt;
            if (self.isFaceLeft)
                dtLength *= -1;
            self.addX += dtLength;
            //根据dt改变x,y轴
            var disPosX = self.display.x;
            self.display.x = disPosX + dtLength;
            self.checkFinish();
            self.checkAttack(dtLength);
        };
        __egretProto__.checkAttack = function (dtLength) {
            var self = this;
            dtLength = Math.abs(dtLength);
            //是
            var member = self.controller.member;
            for (var i = 1; i < self.curArea.length; i++) {
                var locArea = self.curArea[i];
                locArea[0] += dtLength;
            }
            var members;
            if (self.fightSkill.skill.targetType == uw.skillTargetType.ENEMY) {
                members = uw.fightBiz.getEnemyMembers(member.fightOption.curIsChallenger, member);
            }
            else {
                members = uw.fightBiz.getSelfMembers(member.fightOption.curIsChallenger);
            }
            members = uw.targetBiz.calLimit(members);
            members = uw.targetBiz.findByArea(member, null, self.curArea, members, self.isFaceLeft);
            for (var i = 0; i < members.length; i++) {
                var locMember = members[i];
                if (self.attackMembers[locMember.fightOption.curPos])
                    continue;
                //检测碰撞
                self.attackMembers[locMember.fightOption.curPos] = 1;
                uw.skillBiz.calSkill(member, [locMember], self.fightSkill.clone());
            }
        };
        __egretProto__.checkFinish = function () {
            var self = this;
            if (Math.abs(self.addX) >= self.runLength) {
                self.finish();
            }
        };
        FightMoveAction.create = function (display, controller, cfg) {
            var action = new FightMoveAction();
            action.init(display, controller, cfg);
            return action;
        };
        return FightMoveAction;
    })(uw.FightBaseAction);
    uw.FightMoveAction = FightMoveAction;
    FightMoveAction.prototype.__class__ = "uw.FightMoveAction";
})(uw || (uw = {}));

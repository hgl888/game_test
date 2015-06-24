/**
 * Created by Administrator on 2014/12/30.
 */
var uw;
(function (uw) {
    var FightDemoCell = (function (_super) {
        __extends(FightDemoCell, _super);
        function FightDemoCell() {
            _super.call(this);
        }
        var __egretProto__ = FightDemoCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            this._txt = mo.UIText.create();
            this._txt.setHAlign(mo.ALIGN_H_RIGHT);
            this._txt.setAnchorPoint(0, 0);
            this._txt.setPosition(mo.p(50, 20));
            this.addChild(this._txt);
            this.initStyle();
            this.width = 400;
            this.height = 60;
            this.setCellSize(mo.size(400, 60));
        };
        __egretProto__.initStyle = function () {
            this.bgOpacity = 0;
        };
        __egretProto__.setCurStyle = function () {
            this.bgColor = mo.c3b(255, 0, 0);
            this.bgOpacity = 100;
        };
        __egretProto__.resetByData = function (info) {
            this.data = info;
            var id = info[uw.t_warrior_id], name = info[uw.t_warrior_name];
            this._txt.setText(id + " " + name);
            this.initStyle();
        };
        FightDemoCell.__className = "FightDemoCell";
        return FightDemoCell;
    })(mo.GridViewCell);
    uw.FightDemoCell = FightDemoCell;
    FightDemoCell.prototype.__class__ = "uw.FightDemoCell";
})(uw || (uw = {}));

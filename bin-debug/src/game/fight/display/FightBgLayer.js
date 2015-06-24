var uw;
(function (uw) {
    var FightBgLayer = (function (_super) {
        __extends(FightBgLayer, _super);
        function FightBgLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightBgLayer.prototype;
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            this._bgImage = mo.UIImage.create();
            this._bgImage.setPosition(mo.visibleRect.top());
            this.addChild(this._bgImage);
        };
        __egretProto__.reset = function (copyId, num) {
            var self = this;
            var copyJson = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId);
            var resArr = copyJson[uw.t_copy_copyBgId];
            var bgId = resArr[num];
            var bgPath = resHelper.getFightBgPath(bgId);
            var flipped = bgId > 0 ? 1 : -1;
            self._bgImage.loadTexture(bgPath);
            self._bgImage.setAnchorPoint(0.5, 0);
            var size = self._bgImage.getSize();
            var scaleTimes = mo.visibleRect.getWidth() / size.width;
            if (scaleTimes > 1) {
                self._bgImage.setScale(scaleTimes * flipped, 1);
            }
            //判断有无场景技能
            var y = uw.fightUtils.originPos.y, area = uw.fightUtils.fightArea;
            var copyShowTypes = copyJson[uw.t_copy_showTypes];
            for (var j = 0; j < copyShowTypes.length; j++) {
                var type = copyShowTypes[j];
                if (type) {
                    for (var k = 0; k < 5; k++) {
                        var arm = uw.uiArmFactory.produce4Recycle(type);
                        arm.setPosition(Math.random() * area.width, Math.random() * area.height + y);
                        arm.playWithIndex(0);
                        self.addChild(arm);
                        arm.zOrder = 9999;
                    }
                }
            }
        };
        FightBgLayer.__className = "FightBgLayer";
        return FightBgLayer;
    })(mo.DisplayLayer);
    uw.FightBgLayer = FightBgLayer;
    FightBgLayer.prototype.__class__ = "uw.FightBgLayer";
})(uw || (uw = {}));

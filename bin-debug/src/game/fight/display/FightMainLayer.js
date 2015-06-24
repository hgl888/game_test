//战斗显示层
var uw;
(function (uw) {
    var FightMainLayer = (function (_super) {
        __extends(FightMainLayer, _super);
        function FightMainLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightMainLayer.prototype;
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            self.setAnchorPoint(0.5, 0.5);
            var w = mo.visibleRect.getWidth() * 1.2, h = mo.visibleRect.getHeight() * 1.2;
            self._maskLayer = mo.UIPanel.create();
            self._maskLayer.setSize(mo.size(w, h));
            self._maskLayer.bgColor = mo.c3b(0, 0, 0);
            self._maskLayer.bgOpacity = 145;
            self._maskLayer.setPosition(mo.visibleRect.center());
            self._maskLayer.setAnchorPoint(0.5, 0.5);
            //self._maskLayer.ignoreAnchorPointForPosition(false);
            self._maskLayer.setZOrder(0);
            self._maskLayer.setVisible(false);
            self.addChild(self._maskLayer);
            //注册事件
            var clazz = uw.FightActionPauseCtrl;
            self.registerClassByKey(clazz, clazz.ON_SHOW_MASK_LAYER, self.showMaskLayer);
            self.registerClassByKey(clazz, clazz.ON_HIDE_MASK_LAYER, self.hideMaskLayer);
        };
        __egretProto__.setLight = function (time) {
            var self = this;
            var w = mo.visibleRect.getWidth() * 1.2, h = mo.visibleRect.getHeight() * 1.2;
            var lightLayer = mo.UIPanel.create();
            lightLayer.setSize(mo.size(w, h));
            lightLayer.bgColor = mo.c3b(255, 255, 255);
            lightLayer.bgOpacity = 145;
            lightLayer.setPosition(mo.visibleRect.center());
            lightLayer.setAnchorPoint(0.5, 0.5);
            //lightLayer.ignoreAnchorPointForPosition(false);
            lightLayer.setZOrder(99999);
            self.addChild(lightLayer);
            var fade = mo.fadeOut(0.2);
            var func = mo.callFunc(function () {
                lightLayer.removeFromParent(true);
            }, self);
            lightLayer.runAction(mo.sequence(fade, func));
        };
        /**
         * 添加一个角色
         * @param tempId
         * @param isSelf
         * @param cb
         * @returns {*}
         */
        __egretProto__.addChar = function (tempId, isSelf, cb) {
            var zOrder = 1;
            var self = this;
            var heroRole = uw.FightHeroRole.create();
            heroRole.initWithData(tempId, isSelf, function (char) {
                char.setVisible(true);
                cb(char);
            });
            heroRole.setVisible(false);
            //heroRole.setScale(0.875);
            self.addChild(heroRole);
            heroRole.zOrder = zOrder;
            return heroRole;
        };
        __egretProto__.showMaskLayer = function () {
            this._maskLayer.setVisible(true);
        };
        __egretProto__.hideMaskLayer = function () {
            this._maskLayer.setVisible(false);
        };
        /**
         * debug技能目标范围
         * @param type 0:圆形, 1：多边形
         * @param data
         */
        __egretProto__.addSkillAreaDebug = function (type, data) {
            if (!mo.project.fightAreaEnabled)
                return;
            //todo ts
            /*var drawNode = cc.DrawNode.create();
            var vertices = [];
            if (type == 0) {
                var radius = data.radius, segments = 50, center = data.center;
                var coef = 2.0 * Math.PI / segments;
                for (var i = 0; i <= segments; i++) {
                    var rads = i * coef;
                    var j = radius * Math.cos(rads) + center.x;
                    var k = radius * Math.sin(rads) + center.y;
                    vertices.push(mo.p(j, k));
                }
            }
            if (type == 1) {
                vertices = data.vertices;
            }
            //var pos = data.pos;
            var pos = mo.p(0,0);
            var originPos = uw.fightUtils.originPos;
            pos.x += originPos.x;
            pos.y += originPos.y;
            drawNode.setPosition(pos);
            drawNode.drawPoly(vertices, mo.c4f(1, 0.1, 0.1, 0.1),2, mo.c4f(1, 0.1, 0.1, 1));
            this.addChild(drawNode);
            drawNode.zOrder = 2;
            var fade = mo.fadeOut(0.2);
            var s = mo.sequence(fade,mo.callFunc(function(){
                drawNode.removeFromParent(true);
            },this));
            drawNode.runAction(s);*/
        }; /*,

         draw:function(ctx){
         this._super();

         var originPos = uw.fightUtils.originPos;
         var area = uw.fightUtils.fightArea;
         var unitPixel = uw.Fight.unitPixel;
         var row = Math.ceil(area.height / unitPixel), col = Math.ceil(area.width / unitPixel);

         var drawingUtil = cc.drawingUtil;
         drawingUtil.setLineWidth(1);
         for (var i = 0; i <= row; i++) {
         var y = 50 * i + originPos.y;
         var origin = mo.p(0, y);
         var destination = mo.p(area.width, y);
         drawingUtil.drawLine(origin, destination);
         }

         for (var j = 0; j < col; j++) {
         var x = 50 * j;
         var origin = mo.p(x, originPos.y);
         var destination = mo.p(x, area.height +  originPos.y);
         drawingUtil.drawLine(origin, destination);
         }

         }*/
        FightMainLayer.__className = "FightMainLayer";
        return FightMainLayer;
    })(mo.DisplayLayer);
    uw.FightMainLayer = FightMainLayer;
    FightMainLayer.prototype.__class__ = "uw.FightMainLayer";
})(uw || (uw = {}));

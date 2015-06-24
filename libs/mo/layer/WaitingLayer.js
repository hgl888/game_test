var mo;
(function (mo) {
    var WaitingLayer = (function (_super) {
        __extends(WaitingLayer, _super);
        function WaitingLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = WaitingLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._maskMode = 0;
        };
        __egretProto__.init = function () {
            var self = this, clazz = mo.WaitingLayer;
            _super.prototype.init.apply(self, arguments);
            //TODO
            //var shape = new egret.Shape();
            //shape.width = 300;
            //shape.height = 300;
            //var gs = shape.graphics;
            //gs.clear();
            //gs.beginFill(0xff0000, 160/255);
            //gs.drawCircle(0, 0, 150);
            ////gs.drawRect( 0, 0, 100, 200 );
            //gs.endFill();
            //self.addChild(shape);
            //shape.x = mo.visibleRect.center().x;
            //shape.y = mo.visibleRect.center().y;
            //shape.anchorX = 0.5;
            //shape.anchorY = 0.5;
            //
            //var shp:egret.Shape = new egret.Shape();
            //shp.x = 100;
            //shp.y = 100;
            //shp.graphics.lineStyle( 10, 0x00ff00 );
            //shp.graphics.beginFill( 0xff0000, 1);
            //shp.graphics.drawCircle( 0, 0, 50 );
            //shp.graphics.endFill();
            //this.addChild( shp );
            self._circle = mo.UIImage.create();
            self._circle.loadTexture(clazz.IMG_LOADING);
            self._circle.setPosition(mo.visibleRect.center());
            self._circle.setScale(0.6);
            self._circle.setZOrder(100);
            self.addChild(self._circle);
            self._circleBg = mo.UIImage.create();
            self._circleBg.loadTexture(clazz.IMG_LOADING_BG);
            self._circleBg.setPosition(mo.visibleRect.center());
            self._circleBg.setScale(1.2);
            self._circleBg.setOpacity(60);
            self._circleBg.setZOrder(99);
            self.addChild(self._circleBg);
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            var seq = mo.repeatForever(mo.rotateBy(2, 360));
            this._circle.stopAllActions();
            this._circle.runAction(seq);
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            this._circle.stopAllActions();
        };
        WaitingLayer.__className = "WaitingLayer";
        return WaitingLayer;
    })(mo.LoadingLayer);
    mo.WaitingLayer = WaitingLayer;
    WaitingLayer.prototype.__class__ = "mo.WaitingLayer";
    var ReconnectWaitingNode = (function (_super) {
        __extends(ReconnectWaitingNode, _super);
        function ReconnectWaitingNode() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ReconnectWaitingNode.prototype;
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            this._str = mo.UIText.create();
            this._str.setText("连接中…");
            this._str.setFontSize(48);
            this._str.setColor(mo.c3b(225, 225, 225));
            this._str.setPosition(mo.pAdd(mo.visibleRect.center(), mo.p(0, 170)));
            this._str.setZOrder(100);
            this.addChild(this._str);
        };
        ReconnectWaitingNode.__className = "ReconnectWaitingNode";
        return ReconnectWaitingNode;
    })(mo.WaitingLayer);
    mo.ReconnectWaitingNode = ReconnectWaitingNode;
    ReconnectWaitingNode.prototype.__class__ = "mo.ReconnectWaitingNode";
    var Mask = (function (_super) {
        __extends(Mask, _super);
        function Mask() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = Mask.prototype;
        Mask.__className = "Mask";
        return Mask;
    })(mo.LoadingLayer);
    mo.Mask = Mask;
    Mask.prototype.__class__ = "mo.Mask";
})(mo || (mo = {}));

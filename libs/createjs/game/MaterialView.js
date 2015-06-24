var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by 晋 on 2015/3/2.
 */
var createjs;
(function (createjs) {
    var MaterialView = (function (_super) {
        __extends(MaterialView, _super);
        function MaterialView(img) {
            _super.call(this);
            this._imgid = img;
        }
        MaterialView.prototype._onAddToStage = function () {
            _super.prototype._onAddToStage.call(this);
            if (this.img == G.dataSet.getRes(this._imgid)) {
                return;
            }
            while (this.numChildren > 0) {
                this.removeChildAt(0);
            }
            this.init();
        };
        MaterialView.prototype.init = function () {
            this.img = G.dataSet.getRes(this._imgid);
            if (this.img.indexOf('mterial/') == -1) {
                var imgid = this.img;
                if (this.img.indexOf("/") != -1) {
                    imgid = this.img.split("/")[1];
                    imgid = imgid.split(".")[0];
                }
                this.addChild(new egret.Bitmap(RES.getRes(imgid)));
                return;
            }
            if (this.img.indexOf("/") != -1) {
                var ar = this.img.split("/");
                this.img = ar[ar.length - 1];
            }
            if (this.img.indexOf(".") != -1) {
                this.img = this.img.split(".")[0];
            }
            if (this.img.indexOf("_") != -1) {
                this.img = this.img.split("_")[0];
            }
            this.bg = this.img.substr(-7, 3);
            this.item = this.img.substr(-4);
            this.bgItemName = "material_bg_" + this.bg;
            this.itemItemName = "material_item_" + this.item;
            if (!RES.getRes(this.bgItemName)) {
                RES.parseConfig({ "resources": [{ "name": this.bgItemName, "type": "image", "url": "assets/material/bg/material_" + this.bg + ".jpg" }] }, "resource/");
                RES.getResAsync(this.bgItemName, this.loadItem, this);
            }
            else {
                this.loadItem();
            }
        };
        MaterialView.prototype.loadItem = function () {
            if (!RES.getRes(this.itemItemName)) {
                RES.parseConfig({ "resources": [{ "name": this.itemItemName, "type": "image", "url": "assets/material/item/" + this.item + ".png" }] }, "resource/");
                RES.getResAsync(this.itemItemName, this.onload, this);
            }
            else {
                this.createCard();
            }
        };
        MaterialView.prototype.onload = function () {
            this.createCard();
        };
        MaterialView.prototype.createCard = function () {
            this.addChild(new egret.Bitmap(RES.getRes(this.bgItemName)));
            this.addChild(new egret.Bitmap(RES.getRes(this.itemItemName)));
            this.cacheAsBitmap = true;
        };
        MaterialView.prototype.setBounds = function (x, y, width, height) {
            this._holder.scaleX = width / 200;
            this._holder.scaleY = height / 200;
        };
        return MaterialView;
    })(createjs.DisplayObjectContainer);
    createjs.MaterialView = MaterialView;
    MaterialView.prototype.__class__ = "createjs.MaterialView";
})(createjs || (createjs = {}));

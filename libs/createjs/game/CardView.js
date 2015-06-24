var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by 晋 on 2015/2/26.
 */
var createjs;
(function (createjs) {
    var CardView = (function (_super) {
        __extends(CardView, _super);
        function CardView(img) {
            _super.call(this);
            this._imgid = img;
        }
        CardView.prototype._onAddToStage = function () {
            _super.prototype._onAddToStage.call(this);
            if (this.img == G.dataSet.getRes(this._imgid)) {
                return;
            }
            while (this.numChildren > 0) {
                this.removeChildAt(0);
            }
            this.init();
        };
        CardView.prototype.init = function () {
            this.img = G.dataSet.getRes(this._imgid);
            if (this.img.indexOf('hunter/') == -1) {
                this.imgid = this.img;
                if (this.img.indexOf("/") != -1) {
                    this.imgid = this.img.split("/")[1];
                }
                this.imgid = this.imgid.split(".")[0];
                this.addChild(new egret.Bitmap(RES.getRes(this.imgid)));
                return;
            }
            var config_img = this.img.split(".")[0];
            this.config = CardView.getConfig(config_img);
            if (!this.config) {
                egret.Logger.info("hunter card missing..", this.img);
                return;
            }
            this.imgid = this.img.split("/")[1];
            this.imgid = this.imgid.split(".")[0];
            this.type = this.imgid.substr(-1);
            if (this.type != "4") {
                //只弄成3结尾
                this.imgid = this.imgid.substr(0, this.imgid.length - 1) + "3";
            }
            else {
            }
            if (!RES.getRes(this.imgid)) {
                RES.parseConfig({ "resources": [{ "name": this.imgid, "type": "image", "url": "assets/hunter/" + this.imgid + ".jpg" }] }, "resource/");
                RES.getResAsync(this.imgid, this.onload, this);
            }
            else {
                this.createCard();
            }
        };
        CardView.prototype.onload = function () {
            this.createCard();
        };
        CardView.prototype.createCard = function () {
            this.addChild(new egret.Bitmap(RES.getRes(this.imgid)));
            if (this.config['mstHunterRelationId'] > 0) {
                this.addChild(new egret.Bitmap(RES.getRes("hunter_comm." + this.config['mstHunterRelationId'])));
            }
            var evolution_max = new egret.Bitmap(RES.getRes("hunter_comm.max(" + (4 - this.config['evolutionMax']) + ")"));
            evolution_max.y = 485; //640-155;
            this.addChild(evolution_max);
            var attr = new egret.Bitmap(RES.getRes("hunter_comm.prop(" + this.config['attr'] + ")"));
            attr.y = 512; //640-128-10;
            this.addChild(attr);
            var weapon = new egret.Bitmap(RES.getRes("hunter_comm.wepon(" + this.config['weapon'] + ")"));
            weapon.y = 512; //640-128-10;
            this.addChild(weapon);
            var starnum = this.getStarNum();
            var starType = 1; //目前配置里还没有星星类型this.config['star']
            var starTexture = RES.getRes("hunter_comm.star(" + starType + ")");
            var startX = (480 - starTexture.textureWidth * starnum) * 0.5;
            for (var i = 0; i < starnum; i++) {
                var star = new egret.Bitmap(starTexture);
                star.x = startX + starTexture.textureWidth * i;
                star.y = 567;
                this.addChild(star);
            }
            this.cacheAsBitmap = true;
        };
        CardView.prototype.getStarNum = function () {
            var rarity = this.config['rarity'];
            if (rarity == 1 || rarity == 2 || rarity == 3) {
                return 1;
            }
            else if (rarity == 4 || rarity == 5 || rarity == 6 || rarity == 7) {
                return 2;
            }
            else if (rarity == 8 || rarity == 25 || rarity == 26 || rarity == 27) {
                return 3;
            }
            else if (rarity == 28 || rarity == 29 || rarity == 30 || rarity == 31) {
                return 4;
            }
            else if (rarity == 32 || rarity == 49 || rarity == 50 || rarity == 51) {
                return 5;
            }
            else if (rarity == 52 || rarity == 53 || rarity == 54 || rarity == 55) {
                return 6;
            }
            else if (rarity == 56 || rarity == 73 || rarity == 74 || rarity == 75) {
                return 7;
            }
            else if (rarity == 76) {
                return 8;
            }
            else {
                return 0;
            }
        };
        CardView.prototype.setBounds = function (x, y, width, height) {
            this._holder.scaleX = width / 480;
            this._holder.scaleY = height / 640;
        };
        CardView.getConfig = function (img) {
            if (this.configCache[img]) {
                return this.configCache[img];
            }
            var config = G.ConfigHelper.findByValue('MstHunter', ['image'], [img]);
            this.configCache[img] = config;
            return config;
        };
        CardView.configCache = {};
        return CardView;
    })(createjs.DisplayObjectContainer);
    createjs.CardView = CardView;
    CardView.prototype.__class__ = "createjs.CardView";
})(createjs || (createjs = {}));

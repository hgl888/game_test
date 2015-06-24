var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by 晋 on 2015/3/3.
 */
var createjs;
(function (createjs) {
    var MonsterView = (function (_super) {
        __extends(MonsterView, _super);
        function MonsterView(img) {
            _super.call(this);
            this.img = G.dataSet.getRes(img);
            this.init();
        }
        MonsterView.prototype.init = function () {
            this.config = MonsterView.getConfig(this.img);
            if (!this.config) {
                egret.Logger.info("guild monster missing..", this.img);
                return;
            }
            this.imgid = this.img.split("/")[1];
            if (!RES.getRes(this.imgid)) {
                RES.parseConfig({ "resources": [{ "name": this.imgid, "type": "image", "url": "assets/guildmonster/" + this.imgid + ".jpg" }] }, "resource/");
                RES.getResAsync(this.imgid, this.onload, this);
            }
            else {
                this.createCard();
            }
        };
        MonsterView.prototype.onload = function () {
            this.createCard();
        };
        MonsterView.prototype.createCard = function () {
            this.addChild(new egret.Bitmap(RES.getRes(this.imgid)));
            var max = 1; //TODO:存在人物身上，需获取
            var evolution_max = new egret.Bitmap(RES.getRes("hunter_comm.max" + max + ""));
            evolution_max.x = 369; //468- 97;
            evolution_max.y = 221; //312-89;
            this.addChild(evolution_max);
            var attr = new egret.Bitmap(RES.getRes("hunter_comm.gmon_elm_0" + this.config['attr'] + ""));
            attr.y = 237; //312-73-2;
            this.addChild(attr);
            var starnum = this.getStarNum();
            var starTexture = RES.getRes("hunter_comm.star");
            var startX = 60; //57+10-7
            for (var i = 0; i < starnum; i++) {
                var star = new egret.Bitmap(starTexture);
                star.x = startX + starTexture.textureWidth * i;
                star.y = 279; //312-21-12
                this.addChild(star);
            }
            this.cacheAsBitmap = true;
        };
        MonsterView.prototype.getStarNum = function () {
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
        MonsterView.prototype.setBounds = function (x, y, width, height) {
            this._holder.scaleX = width / 480;
            this._holder.scaleY = height / 640;
        };
        MonsterView.getConfig = function (img) {
            if (this.configCache[img]) {
                return this.configCache[img];
            }
            var config = G.ConfigHelper.findByValue('MstGuildMonster', ['image'], [img]);
            this.configCache[img] = config;
            return config;
        };
        MonsterView.configCache = {};
        return MonsterView;
    })(createjs.DisplayObjectContainer);
    createjs.MonsterView = MonsterView;
    MonsterView.prototype.__class__ = "createjs.MonsterView";
})(createjs || (createjs = {}));

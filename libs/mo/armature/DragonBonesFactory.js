/**
 * Created by huanghaiying on 14/12/31.
 */
var mo;
(function (mo) {
    if (egret.MainContext.runtimeType == egret.MainContext.RUNTIME_NATIVE) {
        var db = dragonBones, endb = egret_native.dragonBones;
        db["Armature"] = endb["Armature"];
        db["WorldClock"] = endb["WorldClock"];
        db["Animation"] = endb["Animation"];
        db["AnimationEvent"] = endb["AnimationEvent"];
        db["FrameEvent"] = endb["FrameEvent"];
        db["Slot"] = endb["Slot"];
        db["Bone"] = endb["Bone"];
        db["DBTransform"] = endb["Transform"];
    }
    var DragonBonesFactory = (function (_super) {
        __extends(DragonBonesFactory, _super);
        function DragonBonesFactory() {
            _super.call(this);
        }
        var __egretProto__ = DragonBonesFactory.prototype;
        __egretProto__.setBlendMode = function (blendMode) {
            this._blendMode = blendMode;
        };
        __egretProto__._generateDisplay = function (textureAtlas, fullName, pivotX, pivotY) {
            if (this._blendMode != "") {
                var c = new egret.DisplayObjectContainer();
                var bitmap = new egret.Bitmap();
                bitmap.texture = textureAtlas.getTexture(fullName);
                bitmap.anchorX = 0.5;
                bitmap.anchorY = 0.5;
                bitmap.blendMode = this._blendMode;
                c.addChild(bitmap);
                return c;
            }
            else {
                var bitmap = new egret.Bitmap();
                bitmap.texture = textureAtlas.getTexture(fullName);
                bitmap.anchorX = 0.5;
                bitmap.anchorY = 0.5;
                return bitmap;
            }
        };
        __egretProto__.loadDragonBonesData = function (skeJsonPath, name) {
        };
        __egretProto__.loadTextureAtlas = function (textureJsonPath, texturePngPath, name) {
        };
        return DragonBonesFactory;
    })(dragonBones.EgretFactory);
    mo.DragonBonesFactory = DragonBonesFactory;
    DragonBonesFactory.prototype.__class__ = "mo.DragonBonesFactory";
    mo._dbFactory;
    if (egret.MainContext.runtimeType == egret.MainContext.RUNTIME_NATIVE) {
        mo._dbFactory = new egret_native.dragonBones.Factory();
    }
    else {
        mo._dbFactory = new DragonBonesFactory();
    }
})(mo || (mo = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var libmap;
(function (libmap) {
    var lib;
    (function (lib) {
        var DocumentMain = (function (_super) {
            __extends(DocumentMain, _super);
            function DocumentMain(mode, startPostion, loop) {
                if (mode === void 0) { mode = null; }
                if (startPostion === void 0) { startPostion = 0; }
                if (loop === void 0) { loop = null; }
                _super.call(this, mode, startPostion, loop, { close: 0, open: 32 });
                this.setBounds(0, 0, 0, 0);
                this.init();
            }
            DocumentMain.prototype.init = function () {
                this.timeline.addTween(createjs.Tween.get(this).wait(31).call(this.frame_31).wait(19).call(this.frame_50).wait(1));
                var mask = new createjs.Shape();
                mask._off = true;
                var mask_graphics_1 = new createjs.Graphics().f("#FF0000").p("AcHHzMg4NAAAIAAvlMA4NAAAIAAPl").cp();
                var mask_graphics_2 = new createjs.Graphics().f("#FF0000").p("AcHKYMg4NAAAIAAvlMA4NAAAIAAPl").cp();
                var mask_graphics_3 = new createjs.Graphics().f("#FF0000").p("AcHLZMg4NAAAIAAvlMA4NAAAIAAPl").cp();
                var mask_graphics_4 = new createjs.Graphics().f("#FF0000").p("AcHLKMg4NAAAIAAvlMA4NAAAIAAPl").cp();
                var mask_graphics_32 = new createjs.Graphics().f("#FF0000").p("EAcHAp7Mg4NAAAMAAAhT1MA4NAAAMAAABT1").cp();
                var mask_graphics_33 = new createjs.Graphics().f("#FF0000").p("EAcHAp7Mg4NAAAMAAAhT1MA4NAAAMAAABT1").cp();
                var mask_graphics_34 = new createjs.Graphics().f("#FF0000").p("EAcHAp7Mg4NAAAMAAAhT1MA4NAAAMAAABT1").cp();
                var mask_graphics_35 = new createjs.Graphics().f("#FF0000").p("EAcHAp7Mg4NAAAMAAAhT1MA4NAAAMAAABT1").cp();
                var mask_graphics_36 = new createjs.Graphics().f("#FF0000").p("EAcHAsrMg4NAAAMAAAhTDMA4NAAAMAAABTD").cp();
                this.timeline.addTween(createjs.Tween.get(mask).to({ graphics: null, x: 0, y: 0 }).wait(1).to({ graphics: mask_graphics_1, x: 172, y: 39 }).wait(1).to({ graphics: mask_graphics_2, x: 172, y: 66.5 }).wait(1).to({ graphics: mask_graphics_3, x: 172, y: 73 }).wait(1).to({ graphics: mask_graphics_4, x: 172, y: 71.5 }).wait(28).to({ graphics: mask_graphics_32, x: 172, y: 19.8 }).wait(1).to({ graphics: mask_graphics_33, x: 172, y: 162.5 }).wait(1).to({ graphics: mask_graphics_34, x: 172, y: 213.5 }).wait(1).to({ graphics: mask_graphics_35, x: 172, y: 247.3 }).wait(1).to({ graphics: mask_graphics_36, x: 172, y: 286 }).wait(15));
                this.instance = new gr_questboard_01("synched", 0);
                this.instance.setTransform(180.5, 242, 1, 1, 0, 0, 0, 172.5, 244);
                this.instance._off = true;
                this.instance.dMask = mask;
                this.timeline.addTween(createjs.Tween.get(this.instance).wait(1).to({ startPosition: 0, _off: false }, 0).wait(1).to({ y: 286 }, 0).wait(1).to({ y: 299 }, 0).wait(1).to({ y: 296 }, 0).wait(47));
            };
            DocumentMain.prototype.frame_31 = function () {
                this.stop();
            };
            DocumentMain.prototype.frame_50 = function () {
                this.stop();
            };
            return DocumentMain;
        })(createjs.MovieClip);
        lib.DocumentMain = DocumentMain;
        DocumentMain.prototype.__class__ = "libmap.lib.DocumentMain";
        var img_questboard = (function (_super) {
            __extends(img_questboard, _super);
            function img_questboard() {
                _super.call(this, 'img_questboard');
                this.setBounds(0, 0, 331, 513);
            }
            return img_questboard;
        })(createjs.Bitmap);
        img_questboard.prototype.__class__ = "libmap.lib.img_questboard";
        var gr_questboard_01 = (function (_super) {
            __extends(gr_questboard_01, _super);
            function gr_questboard_01(mode, startPostion) {
                if (mode === void 0) { mode = null; }
                if (startPostion === void 0) { startPostion = 0; }
                _super.call(this);
                this.setBounds(0, 0, 331, 513);
                this.init();
            }
            gr_questboard_01.prototype.init = function () {
                this.instance = new img_questboard();
                this.addChild(this.instance);
            };
            return gr_questboard_01;
        })(createjs.Sprite);
        gr_questboard_01.prototype.__class__ = "libmap.lib.gr_questboard_01";
    })(lib = libmap.lib || (libmap.lib = {}));
})(libmap || (libmap = {}));

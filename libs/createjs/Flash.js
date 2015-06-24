/**
 * Created by 晋 on 2015/2/9.
 */
var createjs;
(function (createjs) {
    var Flash = (function () {
        function Flash() {
        }
        Flash.init = function (fps) {
            Flash.fpsTime = 1000 / Flash.fps;
            Flash.timer = new createjs.TimerManager();
            Flash._timer = new egret.Timer(Flash.fpsTime);
            Flash._timer.addEventListener(egret.TimerEvent.TIMER, Flash.onTimer, Flash);
            Flash.setFPS(fps);
        };
        Flash.setFPS = function (value) {
            Flash.fps = value < 1 ? 1 : value > 60 ? 60 : value;
            Flash.fpsTime = 1000 / Flash.fps;
            Flash._timer.delay = Flash.fpsTime;
        };
        Flash.onTimer = function () {
            Flash._lastTime = egret.getTimer();
            if (Flash.flash) {
                Flash.flash.tick(1);
                Flash.flash.update();
            }
            Flash.timer.update();
        };
        Flash.startFlash = function (flash) {
            Flash.flash = flash;
            Flash._timer.start();
        };
        Flash.stopFlash = function () {
            Flash.flash = null;
            Flash._timer.stop();
        };
        Flash.fps = 60;
        Flash.fpsTime = 20;
        Flash._lastTime = 0;
        return Flash;
    })();
    createjs.Flash = Flash;
    Flash.prototype.__class__ = "createjs.Flash";
})(createjs || (createjs = {}));

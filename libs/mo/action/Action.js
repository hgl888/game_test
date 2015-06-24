var mo;
(function (mo) {
    function callFunc(selector, selectorTarget, data) {
        return egret.action.CallFunc.create.apply(egret.action.CallFunc, arguments);
    }
    mo.callFunc = callFunc;
    function sequence() {
        var actions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actions[_i - 0] = arguments[_i];
        }
        return egret.action.Sequence.create.apply(egret.action.Sequence, arguments);
    }
    mo.sequence = sequence;
    function spawn() {
        var actions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            actions[_i - 0] = arguments[_i];
        }
        return egret.action.Spawn.create.apply(egret.action.Spawn, arguments);
    }
    mo.spawn = spawn;
    function repeat(action, times) {
        return egret.action.Repeat.create.apply(egret.action.Repeat, arguments);
    }
    mo.repeat = repeat;
    function repeatForever(action) {
        return egret.action.RepeatForever.create.apply(egret.action.RepeatForever, arguments);
    }
    mo.repeatForever = repeatForever;
    function moveBy(duration, pos) {
        return egret.action.MoveBy.create(duration, pos.x, pos.y);
    }
    mo.moveBy = moveBy;
    function moveTo(duration, pos) {
        return egret.action.MoveTo.create(duration, pos.x, pos.y);
    }
    mo.moveTo = moveTo;
    function scaleBy(duration, sx, sy) {
        return egret.action.ScaleBy.create.apply(egret.action.ScaleBy, arguments);
    }
    mo.scaleBy = scaleBy;
    function scaleTo(duration, sx, sy) {
        return egret.action.ScaleTo.create.apply(egret.action.ScaleTo, arguments);
    }
    mo.scaleTo = scaleTo;
    function skewBy(duration, skx, sky) {
        return egret.action.SkewBy.create.apply(egret.action.SkewBy, arguments);
    }
    mo.skewBy = skewBy;
    function skewTo(duration, skx, sky) {
        return egret.action.SkewTo.create.apply(egret.action.SkewTo, arguments);
    }
    mo.skewTo = skewTo;
    function rotateBy(duration, rotate) {
        return egret.action.RotateBy.create.apply(egret.action.RotateBy, arguments);
    }
    mo.rotateBy = rotateBy;
    function rotateTo(duration, rotate) {
        return egret.action.RotateTo.create.apply(egret.action.RotateTo, arguments);
    }
    mo.rotateTo = rotateTo;
    function jumpBy(duration, pos, height, jumps) {
        return egret.action.JumpBy.create(duration, pos.x, pos.y, height, jumps);
    }
    mo.jumpBy = jumpBy;
    function jumpTo(duration, pos, height, jumps) {
        return egret.action.JumpTo.create(duration, pos.x, pos.y, height, jumps);
    }
    mo.jumpTo = jumpTo;
    function fadeTo(duration, alpha) {
        return egret.action.FadeTo.create.apply(egret.action.FadeTo, arguments);
    }
    mo.fadeTo = fadeTo;
    function fadeIn(duration) {
        return egret.action.FadeIn.create.apply(egret.action.FadeIn, arguments);
    }
    mo.fadeIn = fadeIn;
    function fadeOut(duration) {
        return egret.action.FadeOut.create.apply(egret.action.FadeOut, arguments);
    }
    mo.fadeOut = fadeOut;
    function delayTime(duration) {
        return egret.action.DelayTime.create.apply(egret.action.DelayTime, arguments);
    }
    mo.delayTime = delayTime;
    //椭圆滚动
    function ellipse(duration, centerPosition, aLength, cLength) {
        return mo.action.Ellipse.create.apply(mo.action.Ellipse, arguments);
    }
    mo.ellipse = ellipse;
    //晃动
    function shake(duration, strengthX, strengthY) {
        return mo.action.Shake.create.apply(mo.action.Shake, arguments);
    }
    mo.shake = shake;
    //bezier
    function bezierBy(t, c) {
        return mo.action.BezierBy.create.apply(mo.action.BezierBy, arguments);
    }
    mo.bezierBy = bezierBy;
    //bezier
    function bezierTo(t, c) {
        return mo.action.BezierTo.create.apply(mo.action.BezierTo, arguments);
    }
    mo.bezierTo = bezierTo;
    //bezier
    function track(trackTarget, trackSpeed, callback, callTarget) {
        return mo.action.Track.create.apply(mo.action.Track, arguments);
    }
    mo.track = track;
})(mo || (mo = {}));

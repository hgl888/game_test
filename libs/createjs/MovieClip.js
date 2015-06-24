var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by 晋 on 2015/1/20.
 */
var createjs;
(function (createjs) {
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        function MovieClip(mode, startPosition, loop, labels) {
            _super.call(this);
            this.loop = true;
            this.startPosition = 0;
            this.paused = false;
            this.actionsEnabled = true;
            this._synchOffset = 0;
            this._prevPos = -1;
            this._prevPosition = 0;
            this.isVisible = function () {
                return this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0;
            };
            this.mode = mode || MovieClip.INDEPENDENT;
            this.startPosition = startPosition || 0;
            this.loop = loop; //loop==null?true:loop;
            var props = { paused: true, position: startPosition, useTicks: true, loop: this.loop };
            this.timeline = new createjs.Timeline(null, labels, props);
            this.timeline.movie = this;
            this._managed = {};
        }
        MovieClip.prototype.update = function () {
            this._updateTimeline();
            var child;
            for (var i = 0, l = this.numChildren; i < l; i++) {
                child = this.getChildAt(i);
                if (child instanceof createjs.MovieClip) {
                    if (!child.isVisible())
                        continue;
                    child.update();
                }
            }
        };
        MovieClip.prototype.play = function () {
            this.paused = false;
        };
        MovieClip.prototype.stop = function () {
            this.paused = true;
        };
        MovieClip.prototype.gotoAndPlay = function (positionOrLabel) {
            this.paused = false;
            this._goto(positionOrLabel);
        };
        MovieClip.prototype.gotoAndStop = function (positionOrLabel) {
            this.paused = true;
            this._goto(positionOrLabel);
        };
        MovieClip.prototype.tick = function (params) {
            if (!this.paused && this.mode == MovieClip.INDEPENDENT) {
                this._prevPosition = (this._prevPos < 0) ? 0 : this._prevPosition + 1;
            }
            for (var i = this.numChildren - 1; i >= 0; i--) {
                var child = this.getChildAt(i);
                if (child.tick) {
                    child.tick(params);
                }
            }
        };
        MovieClip.prototype._goto = function (positionOrLabel) {
            var pos = this.timeline.resolve(positionOrLabel);
            if (pos == null) {
                return;
            }
            this._prevPosition = pos;
            this._updateTimeline();
        };
        MovieClip.prototype._reset = function () {
            this._prevPos = -1;
        };
        MovieClip.prototype._updateTimeline = function () {
            var tl = this.timeline;
            var tweens = tl._tweens;
            var synched = this.mode != MovieClip.INDEPENDENT;
            tl.loop = this.loop == null ? true : this.loop;
            // update timeline position, ignoring actions if this is a graphic.
            if (synched) {
                tl.setPosition(this.startPosition + (this.mode == MovieClip.SINGLE_FRAME ? 0 : this._synchOffset), createjs.Tween.NONE);
            }
            else {
                tl.setPosition(this._prevPosition, this.actionsEnabled ? null : createjs.Tween.NONE);
            }
            this._prevPosition = tl._prevPosition;
            if (this._prevPos == tl._prevPos) {
                return;
            }
            this._prevPos = tl._prevPos;
            for (var n in this._managed) {
                this._managed[n] = 1;
            }
            for (var i = tweens.length - 1; i >= 0; i--) {
                var tween = tweens[i];
                var target = tween._target;
                if (target == this) {
                    continue;
                }
                var offset = tween._stepPosition;
                if (target instanceof egret.DisplayObject) {
                    // motion tween.
                    this._addManagedChild(target, offset);
                }
                else {
                    // state tween.
                    this._setState(target.state, offset);
                }
            }
            for (i = this.numChildren - 1; i >= 0; i--) {
                var child = this.getChildAt(i);
                if (this._managed[child.id] == 1) {
                    this.removeChildAt(i);
                    delete (this._managed[child]);
                }
            }
        };
        MovieClip.prototype._setState = function (state, offset) {
            if (!state) {
                return;
            }
            for (var i = 0, l = state.length; i < l; i++) {
                var o = state[i];
                var target = o.t;
                var props = o.p;
                for (var n in props) {
                    target[n] = props[n];
                }
                this._addManagedChild(target, offset);
            }
        };
        MovieClip.prototype._addManagedChild = function (child, offset) {
            if (child._off) {
                return;
            }
            this.addChild(child);
            if (child instanceof MovieClip) {
                child._synchOffset = offset;
                if (child.mode == MovieClip.INDEPENDENT && (!this._managed[child.id] || this._prevPos == 0)) {
                    child._reset();
                }
            }
            this._managed[child.id] = 2;
        };
        MovieClip.INDEPENDENT = "independent";
        MovieClip.SINGLE_FRAME = "single";
        MovieClip.SYNCHED = "synched";
        return MovieClip;
    })(createjs.DisplayObjectContainer);
    createjs.MovieClip = MovieClip;
    MovieClip.prototype.__class__ = "createjs.MovieClip";
    var MovieClipPlugin = (function () {
        function MovieClipPlugin() {
        }
        MovieClipPlugin.install = function () {
            createjs.Tween.installPlugin(MovieClipPlugin, ["startPosition"]);
        };
        MovieClipPlugin.init = function (tween, prop, value) {
            if (prop == "startPosition" || !(tween._target instanceof createjs.MovieClip)) {
                return value;
            }
        };
        MovieClipPlugin.priority = 100; // very high priority, should run first
        MovieClipPlugin.tween = function (tween, prop, value, startValues, endValues, ratio, position, end) {
            if (!(tween._target instanceof createjs.MovieClip)) {
                return value;
            }
            return (ratio == 1 ? endValues[prop] : startValues[prop]);
        };
        return MovieClipPlugin;
    })();
    createjs.MovieClipPlugin = MovieClipPlugin;
    MovieClipPlugin.prototype.__class__ = "createjs.MovieClipPlugin";
})(createjs || (createjs = {}));

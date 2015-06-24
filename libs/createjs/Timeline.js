/**
 * Created by 晋 on 2015/1/21.
 */
var createjs;
(function (createjs) {
    var Timeline = (function () {
        function Timeline(tweens, labels, props) {
            this.ignoreGlobalPause = false;
            this.duration = 0;
            this.loop = false;
            this.onChange = null;
            this.position = null;
            this._paused = false;
            this._prevPosition = 0;
            this._prevPos = -1;
            this._useTicks = false;
            this.addTween = function (tween) {
                var l = arguments.length;
                if (l > 1) {
                    for (var i = 0; i < l; i++) {
                        this.addTween(arguments[i]);
                    }
                    return arguments[0];
                }
                else if (l == 0) {
                    return null;
                }
                this.removeTween(tween);
                this._tweens.push(tween);
                tween.setPaused(true);
                tween._paused = false;
                tween._useTicks = this._useTicks;
                tween.loop = this.loop;
                if (tween.duration > this.duration) {
                    this.duration = tween.duration;
                }
                if (this._prevPos >= 0) {
                    tween.setPosition(this._prevPos, egret.Tween.NONE);
                }
                return tween;
            };
            this.removeTween = function (tween) {
                var l = arguments.length;
                if (l > 1) {
                    var good = true;
                    for (var i = 0; i < l; i++) {
                        good = good && this.removeTween(arguments[i]);
                    }
                    return good;
                }
                else if (l == 0) {
                    return false;
                }
                var index = this._tweens.indexOf(tween);
                if (index != -1) {
                    this._tweens.splice(index, 1);
                    if (tween.duration >= this.duration) {
                        this.updateDuration();
                    }
                    return true;
                }
                else {
                    return false;
                }
            };
            this.addLabel = function (label, position) {
                this._labels[label] = position;
            };
            this.setLabels = function (o) {
                this._labels = o ? o : {};
            };
            this.gotoAndPlay = function (positionOrLabel) {
                this.setPaused(false);
                this._goto(positionOrLabel);
            };
            this.gotoAndStop = function (positionOrLabel) {
                this.setPaused(true);
                this._goto(positionOrLabel);
            };
            this.setPosition = function (value, actionsMode) {
                if (value < 0) {
                    value = 0;
                }
                if (this.duration <= 0)
                    return false;
                var t = this.loop ? value % this.duration : value;
                var end = !this.loop && value >= this.duration;
                if (t == this._prevPos) {
                    return end;
                }
                this._prevPosition = value;
                this.position = this._prevPos = t; // in case an action changes the current frame.
                for (var i = 0, l = this._tweens.length; i < l; i++) {
                    this._tweens[i].setPosition(t, actionsMode);
                    if (t != this._prevPos) {
                        return false;
                    } // an action changed this timeline's position.
                }
                if (end) {
                    this.setPaused(true);
                }
                this.onChange && this.onChange(this);
                return end;
            };
            this.setPaused = function (value) {
                this._paused = value;
                createjs.Tween.register(this, !value);
            };
            this.updateDuration = function () {
                this.duration = 0;
                for (var i = 0, l = this._tweens.length; i < l; i++) {
                    var tween = this._tweens[i];
                    if (tween.duration > this.duration) {
                        this.duration = tween.duration;
                    }
                }
            };
            this.tick = function (delta) {
                this.setPosition(this._prevPosition + delta);
            };
            this.resolve = function (positionOrLabel) {
                var pos = parseFloat(positionOrLabel);
                if (isNaN(pos)) {
                    pos = this._labels[positionOrLabel];
                }
                return pos;
            };
            this._goto = function (positionOrLabel) {
                var pos = this.resolve(positionOrLabel);
                if (pos != null) {
                    this.setPosition(pos);
                }
            };
            this._tweens = [];
            this._target = this;
            if (props) {
                this._useTicks = props.useTicks;
                this.loop = props.loop;
                this.ignoreGlobalPause = props.ignoreGlobalPause;
                this.onChange = props.onChange;
            }
            if (tweens) {
                this.addTween.apply(this, tweens);
            }
            this.setLabels(labels);
            if (props && props.paused) {
                this._paused = true;
            }
            else {
                createjs.Tween.register(this, true);
            }
            if (props && props.position != null) {
                this.setPosition(props.position, egret.Tween.NONE);
            }
        }
        return Timeline;
    })();
    createjs.Timeline = Timeline;
    Timeline.prototype.__class__ = "createjs.Timeline";
})(createjs || (createjs = {}));

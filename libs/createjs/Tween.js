var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by 晋 on 2015/1/23.
 */
var createjs;
(function (createjs) {
    var Tween = (function (_super) {
        __extends(Tween, _super);
        function Tween(target, props, pluginData) {
            _super.call(this, target, props, pluginData);
        }
        Tween.installPlugin = function (plugin, properties) {
            var priority = plugin.priority;
            if (priority == null) {
                plugin.priority = priority = 0;
            }
            var ETween = egret.Tween;
            for (var i = 0, l = properties.length, p = ETween._plugins; i < l; i++) {
                var n = properties[i];
                if (!p[n]) {
                    p[n] = [plugin];
                }
                else {
                    var arr = p[n];
                    for (var j = 0, jl = arr.length; j < jl; j++) {
                        if (priority < arr[j].priority) {
                            break;
                        }
                    }
                    p[n].splice(j, 0, plugin);
                }
            }
        };
        Tween.register = function (tween, value) {
            var target = tween._target;
            var fatherTween = Tween;
            var tweens = fatherTween._tweens;
            var index = tweens.indexOf(tween);
            if (value) {
                if (index == -1) {
                    if (target) {
                        target.tween_count = target.tween_count ? target.tween_count + 1 : 1;
                    }
                    tweens.push(tween);
                }
                if (!fatherTween._inited) {
                    egret.Ticker.getInstance().register(fatherTween.tick, null);
                    fatherTween._inited = true;
                }
            }
            else {
                if (index != -1) {
                    if (target) {
                        target.tween_count--;
                    }
                    tweens.splice(index, 1);
                }
            }
        };
        Tween.prototype.to = function (props, duration, ease) {
            return _super.prototype.to.call(this, props, duration, ease);
        };
        return Tween;
    })(egret.Tween);
    createjs.Tween = Tween;
    Tween.prototype.__class__ = "createjs.Tween";
})(createjs || (createjs = {}));

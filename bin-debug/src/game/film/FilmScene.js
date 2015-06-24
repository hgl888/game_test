var uw;
(function (uw) {
    var FilmScene = (function (_super) {
        __extends(FilmScene, _super);
        function FilmScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FilmScene.prototype;
        __egretProto__.showMovie = function () {
            var self = this;
            var filmMainLayer = uw.FilmMainLayer.create();
            filmMainLayer.setDelegate(this);
            filmMainLayer.show();
            mo.playMusicById(res.audio_ui.bg_film, false);
            //统计是否完成剧情动画
            uw.RecordDataCtrl.addLoadRecord(uw.id_c_loadModule.film);
        };
        __egretProto__.showTalk = function () {
            var self = this;
            async.series([
                function (cb1) {
                    self.showTalkLayer(cb1);
                },
                function (cb1) {
                    self.showPlotLayer(cb1);
                },
                function (cb1) {
                    self.showCreateRole(cb1);
                }
            ], function (err) {
            });
        };
        __egretProto__.showTalkLayer = function (cb) {
            var self = this;
            var word = "双方拼尽全力，战斗引发剧烈爆炸，\n受伤的奎爷与你一起被强大的力量传送到了迷失之境最深处。";
            var displayLayer = mo.DisplayLayer.create();
            displayLayer.show();
            var plot = mo.UIText.create();
            plot.setFontSize(70);
            plot.setText(word);
            plot.setVAlign(mo.ALIGN_V_MIDDLE);
            plot.setHAlign(mo.ALIGN_H_CENTER);
            plot.setText(word);
            plot.setPosition(mo.visibleRect.center());
            plot.setOpacity(0);
            plot.setZOrder(199);
            displayLayer.addChild(plot);
            var seq = mo.sequence(mo.delayTime(0.5), mo.fadeIn(1), mo.delayTime(5), mo.fadeOut(0.5), mo.callFunc(function (sender) {
                cb();
            }, self));
            plot.runAction(seq);
        };
        __egretProto__.showPlotLayer = function (cb) {
            var self = this;
            var talks = [];
            talks[0] = { name: "恶魔之书", head: res.ui_common.tg_png, align: 0, content: "想不到你们居然能够来到这里，我会遵守混沌法则，与你签订契约，赋予你强大的恶魔力量，成为恶魔大人。" }; //恶魔之书
            talks[1] = { name: "我", head: res.ui_film.randomgy_png, align: 1, content: "只要能够强大，变成恶魔又如何！" }; //我
            var layer = uw.FightPlotTalkLayer.create();
            layer.show();
            layer.setTalkData(talks);
            layer.onClose(function () {
                cb();
            }, this);
        };
        __egretProto__.showCreateRole = function (cb) {
            var createRoleLayer = uw.CreateRoleLayer.create();
            createRoleLayer.show();
            if (cb)
                cb();
            //统计是否进入了创建角色
            uw.RecordDataCtrl.addLoadRecord(uw.id_c_loadModule.createRole);
        };
        FilmScene.preload = function (cb) {
            var uiArmArr = [
                res.cca_ui.movie1,
                res.cca_ui.movie2,
                res.cca_ui.movie3,
                res.cca_ui.movie4,
                res.cca_ui.movie5
            ];
            uw.uiArmFactory.preload(uiArmArr, cb);
        };
        FilmScene.__className = "FilmScene";
        return FilmScene;
    })(mo.Scene);
    uw.FilmScene = FilmScene;
    FilmScene.prototype.__class__ = "uw.FilmScene";
})(uw || (uw = {}));

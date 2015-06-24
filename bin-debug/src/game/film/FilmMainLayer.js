var uw;
(function (uw) {
    var FilmMainLayer = (function (_super) {
        __extends(FilmMainLayer, _super);
        function FilmMainLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FilmMainLayer.prototype;
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            var self = this;
            self._armatureIds = [
                res.cca_ui.movie1,
                res.cca_ui.movie2,
                res.cca_ui.movie3,
                res.cca_ui.movie4,
                res.cca_ui.movie5
            ];
            self._word = mo.UIText.create();
            self._word.setText("");
            self._word.setFontSize(70);
            self._word.setAutoSizeWidth(true);
            self._word.setHAlign(mo.ALIGN_H_CENTER);
            self._word.enableStroke(mo.c3b(0, 0, 0), 3);
            self._word.setPosition(mo.pSub(mo.visibleRect.bottom(), mo.p(0, 130)));
            self._word.setZOrder(99);
            self.addChild(self._word);
            self._armContainer = mo.Node.create();
            self.addChild(self._armContainer);
            var w = mo.visibleRect.getWidth(), h = mo.visibleRect.getHeight();
            var bgLayer = mo.UIPanel.create();
            bgLayer.setSize(mo.size(w, h));
            bgLayer.bgColor = mo.c3b(0, 0, 0);
            bgLayer.setPosition(mo.visibleRect.center());
            bgLayer.setAnchorPoint(0.5, 0.5);
            this.addChild(bgLayer);
            mo.delayCall(0.6, function () {
                self._nextMovie();
            });
        };
        __egretProto__._nextMovie = function () {
            var self = this;
            var centerPos = mo.visibleRect.center();
            if (self._arm) {
                self._arm.removeFromParent(true);
                self._arm = null;
            }
            if (self._armatureIds.length > 0) {
                var id = self._armatureIds.shift();
                var ctrl = uw.UpArmature.play(self._armContainer, id, centerPos, self._nextMovie, self);
                var arm = self._arm = ctrl.getArmature();
                arm.setFrameEventCallFunc(self._frameEvent, self);
            }
            else {
                self.close();
                uw.FightSimulateCtrl.fight();
            }
        };
        __egretProto__._frameEvent = function (bone, evt, originFrameIndex, currentFrameIndex) {
            var self = this;
            if (evt == FilmMainLayer.HIDE) {
                this._word.setVisible(false);
            }
            else {
                var words = FilmMainLayer.WORDS, w;
                for (var key in words) {
                    if (evt == key) {
                        w = words[key];
                        this._word.setText(w);
                        this._word.setVisible(true);
                    }
                }
            }
        };
        FilmMainLayer.__className = "FilmMainLayer";
        FilmMainLayer.WORDS = {
            "wordBeginEvent1": "传说，有一件混沌中诞生的神器",
            "wordBeginEvent2": "拥有它，就能成为至高无上的存在",
            "wordBeginEvent3": "无数的生灵为了得到它",
            "wordBeginEvent4": "彼此展开了惨烈的厮杀",
            "wordBeginEvent5": "战火点燃了整个迪蒙大陆",
            "wordBeginEvent6": "贪婪、阴谋，扭曲着人性",
            "wordBeginEvent7": "而引发了一切灾难的神器",
            "wordBeginEvent8": "被称为恶魔之书",
            "wordBeginEvent9": "战斗持续扩大，虚空被撕裂",
            "wordBeginEvent10": "异世界的强者们",
            "wordBeginEvent11": "也纷纷加入争夺",
            "wordBeginEvent12": "最终能得到认可的，将会成为…",
            "wordBeginEvent13": "恶魔大人"
        };
        FilmMainLayer.HIDE = "hideWord";
        return FilmMainLayer;
    })(mo.DisplayLayer);
    uw.FilmMainLayer = FilmMainLayer;
    FilmMainLayer.prototype.__class__ = "uw.FilmMainLayer";
})(uw || (uw = {}));

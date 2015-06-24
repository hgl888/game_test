/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var FeedBackLayer = (function (_super) {
        __extends(FeedBackLayer, _super);
        function FeedBackLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FeedBackLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiFeedBackLayer_ui;
            self._contactConfig = {
                0: "客服QQ",
                1: "官方微信",
                2: "官方微博",
                3: "玩家QQ群"
            };
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.prototype.init.call(this, args);
            var self = this;
            self.onClickByName("btnBack", this.close, this);
            self.onClickByName("btnSubmit", this.menuSend, this);
            self._listView = self.getWidgetByName("feedbackList");
            self._listView.setGravity(mo.ListViewGravity.bottom);
            self._data = uw.feedBackDataCtrl.getFeedbackList();
            if (self._data.length == 0) {
                self.setVisibleByName("noFeedback", true);
            }
            else {
                for (var i = self._data.length; i > 0; i--) {
                    var d = self._data[i - 1];
                    self.newFeedbackItem(d);
                }
            }
            self.setContactInfo();
        };
        __egretProto__.onEnterNextTick = function () {
            _super.prototype.onEnterNextTick.call(this);
            this._listView.jumpToBottom();
        };
        __egretProto__.setContactInfo = function () {
            /*参数1：客服QQ
            参数2：官方微信
            参数3：官方微博
            参数4：玩家QQ群*/
            var self = this, contactList = self.getWidgetByName("contactList");
            var c_game_data = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.contactUs);
            for (var i = 0; i < c_game_data.length; i++) {
                var value = c_game_data[i];
                if (value) {
                    var title = self._contactConfig[i];
                    var item = mo.UIPanel.create();
                    item.setSize(380, 160);
                    var titleWidget = mo.UIText.create();
                    titleWidget.setText(title);
                    titleWidget.setFontSize(60);
                    titleWidget.setPosition(190, 50);
                    titleWidget.setColor(mo.c3b(255, 167, 109));
                    item.addChild(titleWidget);
                    var valueWidget = mo.UIText.create();
                    valueWidget.setText(value);
                    valueWidget.setFontSize(60);
                    valueWidget.setPosition(190, 120);
                    item.addChild(valueWidget);
                    contactList.pushBackCustomItem(item);
                }
            }
        };
        __egretProto__.newFeedbackItem = function (d) {
            var self = this;
            var fb = uw.FeedBackItemCell.create();
            fb.resetByData(d);
            self._listView.pushBackCustomItem(fb);
            self.setVisibleByName("noFeedback", false);
        };
        __egretProto__.menuSend = function () {
            var self = this;
            var contentWidget = self.getWidgetByName("msg");
            uw.feedBackDataCtrl.send(contentWidget.getText(), function (d) {
                contentWidget.setText("");
                self.newFeedbackItem(d);
                process.nextTick(function () {
                    self._listView.jumpToBottom();
                }, self);
            }, self);
        };
        FeedBackLayer.__className = "FeedBackLayer";
        return FeedBackLayer;
    })(mo.UIModalLayer);
    uw.FeedBackLayer = FeedBackLayer;
    FeedBackLayer.prototype.__class__ = "uw.FeedBackLayer";
})(uw || (uw = {}));

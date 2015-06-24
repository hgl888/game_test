/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var FeedBackItemCell = (function (_super) {
        __extends(FeedBackItemCell, _super);
        function FeedBackItemCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FeedBackItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiFeedBackItem_ui;
        };
        __egretProto__.resetByData = function (info) {
            var self = this;
            var feedbackEntity = uw.dsConsts.FeedbackEntity;
            var root = self.getWidgetByName("root");
            var questContainer = self.getWidgetByName("questContainer");
            var answerContainer = self.getWidgetByName("answerContainer");
            var question = questContainer.getWidgetByName("question");
            question.setAreaSize(1250, 100);
            question.setAutoSizeHeight(true);
            question.setText(info[feedbackEntity.feedContent]);
            var height = 0;
            var newHeight = question.height + 130;
            questContainer.setSize(questContainer.width, newHeight);
            height += newHeight;
            self.setInfoByName("questionDate", mo.getBetweenTimeString(info[feedbackEntity.feedTime], null));
            if (info[feedbackEntity.replyContent]) {
                var answer = answerContainer.getWidgetByName("answer");
                answer.setAreaSize(1250, 100);
                answer.setAutoSizeHeight(true);
                answer.setText(info[feedbackEntity.replyContent]);
                var newHeight = answer.height + 150;
                answerContainer.setSize(answerContainer.width, newHeight);
                height += newHeight;
                self.setInfoByName("answerDate", mo.getBetweenTimeString(info[feedbackEntity.replayTime], null));
            }
            else {
                answerContainer.removeFromParent(true);
            }
            root.doLayout();
            height += 30;
            root.setSize(root.width, height);
            self.setSize(root.width, height);
        };
        FeedBackItemCell.__className = "FeedBackItemCell";
        return FeedBackItemCell;
    })(mo.GridViewCell);
    uw.FeedBackItemCell = FeedBackItemCell;
    FeedBackItemCell.prototype.__class__ = "uw.FeedBackItemCell";
})(uw || (uw = {}));

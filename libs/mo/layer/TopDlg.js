var mo;
(function (mo) {
    var TopDlg = (function (_super) {
        __extends(TopDlg, _super);
        function TopDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TopDlg.prototype;
        //@override
        __egretProto__._getTray = function () {
            var self = this;
            var scene = mo.runningScene;
            if (scene)
                return scene.topTray;
            return null;
        };
        TopDlg.__className = "TopDlg";
        return TopDlg;
    })(mo.Dlg);
    mo.TopDlg = TopDlg;
    TopDlg.prototype.__class__ = "mo.TopDlg";
})(mo || (mo = {}));

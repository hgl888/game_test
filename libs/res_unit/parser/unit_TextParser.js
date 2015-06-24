var unit;
(function (unit) {
    unit.curRegisterModule = "res";
    unit.registerTestBtn("res.TextParser", function () {
        var parser = new res.TextParser();
        var resCfgItem = new res.ResCfgItem();
        var resCfgItem = res.getResCfgItem(res_consts.json.test);
        parser.load(resCfgItem, function (data, resCfgItem) {
            console.debug("data--->", data);
            console.debug("resCfgItem--->", resCfgItem);
        });
    });
})(unit || (unit = {}));

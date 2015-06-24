/**
 * Created by SmallAiTT on 2015/4/1.
 */
var mo;
(function (mo) {
    var _s9gParamMap = {};
    /**
     * 注册九宫格数据
     * @param data
     */
    function registerS9GData(data) {
        for (var key in data) {
            var arr = data[key];
            var param = key.split(",");
            for (var i = 0, l_i = param.length; i < l_i; i++) {
                param[i] = parseInt(param[i]);
            }
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                _s9gParamMap[arr[i]] = param;
            }
        }
    }
    mo.registerS9GData = registerS9GData;
    /**
     * 创建九宫格panel
     * @param width
     * @param height
     * @param pngPath
     * @returns {*}
     */
    function createS9GPanel(width, height, pngPath, tempPanel) {
        var param = _s9gParamMap[pngPath];
        if (!param) {
            mo.error("不存在【%s】的九宫格配置，请检查！", pngPath);
            return null;
        }
        var panel = tempPanel || mo.UIPanel.create();
        panel.scale9Enabled = true;
        panel.scale9Grid = mo.rect(param[0], param[1], param[2], param[3]);
        panel.bgTexture = pngPath;
        panel.width = width;
        panel.height = height;
        return panel;
    }
    mo.createS9GPanel = createS9GPanel;
})(mo || (mo = {}));

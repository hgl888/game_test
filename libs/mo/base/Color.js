/**
 * 常用的颜色值
 */
var mo;
(function (mo) {
    mo.RED = 0xff0000;
    mo.GREEN = 0x00ff00;
    mo.BLUE = 0x0000ff;
    mo.BLACK = 0x000000;
    mo.WHITE = 0xffffff;
    mo.YELLOW = 0xffff00;
    mo.GRAY = 0x333333;
    function c3b(r, g, b) {
        var hR = r.toString(16), hG = g.toString(16), hB = b.toString(16);
        return parseInt((r < 16 ? ("0" + hR) : hR) + (g < 16 ? ("0" + hG) : hG) + (b < 16 ? ("0" + hB) : hB), 16);
    }
    mo.c3b = c3b;
})(mo || (mo = {}));

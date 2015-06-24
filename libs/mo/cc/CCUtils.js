var cc;
(function (cc) {
    cc.RED = 0xff0000;
    cc.GREEN = 0x00ff00;
    cc.BLUE = 0x0000ff;
    cc.BLACK = 0x000000;
    cc.WHITE = 0xffffff;
    cc.YELLOW = 0xffff00;
    cc.GRAY = 0x333333;
    cc.MAGENTA = 0xff00ff;
    cc.ORANGE = 0xff7f00;
    function c3b(r, g, b) {
        return r << 16 | g << 8 | b;
    }
    cc.c3b = c3b;
    function convertColor3BtoHexString(clr) {
        var hR = clr.r.toString(16);
        var hG = clr.g.toString(16);
        var hB = clr.b.toString(16);
        var stClr = "#" + (clr.r < 16 ? ("0" + hR) : hR) + (clr.g < 16 ? ("0" + hG) : hG) + (clr.b < 16 ? ("0" + hB) : hB);
        return stClr;
    }
    cc.convertColor3BtoHexString = convertColor3BtoHexString;
    function hexToColor(hex) {
        hex = hex.replace(/^#?/, "0x");
        var c = parseInt(hex);
        return c;
    }
    cc.hexToColor = hexToColor;
})(cc || (cc = {}));

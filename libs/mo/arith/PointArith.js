/*
点运算
 */
var mo;
(function (mo) {
    /**
     * 角度转弧度
     * @param {Number} angle
     * @return {Number}
     * @function
     */
    function degreesToRadians(angle) {
        return angle * Math.PI / 180;
    }
    mo.degreesToRadians = degreesToRadians;
    /**
     * 弧度转角度
     * @param {Number} angle
     * @return {Number}
     * @function
     */
    function radiansToDegrees(angle) {
        return angle * (180 / Math.PI);
    }
    mo.radiansToDegrees = radiansToDegrees;
    /**
     * 返回相反的点坐标
     * @param point
     * @returns {Point}
     */
    function pNeg(point) {
        return mo.p(-point.x, -point.y);
    }
    mo.pNeg = pNeg;
    /**
     * 两点相加
     * @param v1
     * @param v2
     * @returns {Point}
     */
    function pAdd(v1, v2) {
        return mo.p(v1.x + v2.x, v1.y + v2.y);
    }
    mo.pAdd = pAdd;
    /**
     * 两点相减
     * @param v1
     * @param v2
     * @returns {Point}
     */
    function pSub(v1, v2) {
        return mo.p(v1.x - v2.x, v1.y - v2.y);
    }
    mo.pSub = pSub;
    /**
     * 点乘以某个系数得到新的点
     * @param point
     * @param floatVar
     * @returns {Point}
     */
    function pMult(point, floatVar) {
        return mo.p(point.x * floatVar, point.y * floatVar);
    }
    mo.pMult = pMult;
    /**
     * 两点的中心点
     * @param v1
     * @param v2
     * @returns {Point}
     */
    function pMidpoint(v1, v2) {
        return pMult(pAdd(v1, v2), 0.5);
    }
    mo.pMidpoint = pMidpoint;
    /**
     * Calculates dot product of two points.
     * @param {mo.Point} v1
     * @param {mo.Point} v2
     * @return {Number}
     */
    function pDot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    mo.pDot = pDot;
    /**
     * Returns point multiplied to a length of 1.
     * @param {cc.Point} v
     * @return {cc.Point}
     */
    function pNormalize(v) {
        return pMult(v, 1.0 / pLength(v));
    }
    mo.pNormalize = pNormalize;
    /**
     * Calculates distance between point an origin
     * @param  {cc.Point} v
     * @return {Number}
     */
    function pLength(v) {
        return Math.sqrt(pLengthSQ(v));
    }
    mo.pLength = pLength;
    /**
     * Calculates the square length of a cc.Point (not calling sqrt() )
     * @param  {cc.Point} v
     *@return {Number}
     */
    function pLengthSQ(v) {
        return pDot(v, v);
    }
    mo.pLengthSQ = pLengthSQ;
})(mo || (mo = {}));

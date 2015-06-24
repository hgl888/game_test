var mo;
(function (mo) {
    /**
     *
     * @param pWOrH
     * @param wOrH
     * @param aXOrY
     * @param poseType  0:左/上,1:中,2:右/下
     * @returns {number}
     */
    function calLayoutXOrY(pWOrH, wOrH, aXOrY, poseType) {
        return pWOrH * poseType / 2 - wOrH * (poseType / 2 - aXOrY);
    }
    mo.calLayoutXOrY = calLayoutXOrY;
})(mo || (mo = {}));

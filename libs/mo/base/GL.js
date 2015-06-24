/**
 * WebGL constants
 */
var gl;
(function (gl) {
    /**
     * @constant
     * @type {Number}
     */
    gl.ONE = 1;
    /**
     * @constant
     * @type {Number}
     */
    gl.ZERO = 0;
    /**
     * @constant
     * @type {Number}
     */
    gl.SRC_ALPHA = 0x0302;
    /**
     * @constant
     * @type {Number}
     */
    gl.ONE_MINUS_SRC_ALPHA = 0x0303;
    /**
     * @constant
     * @type {Number}
     */
    gl.ONE_MINUS_DST_COLOR = 0x0307;
    /**
     * @constant
     * @type {Number}
     */
    gl.DST_ALPHA = 0x0304;
})(gl || (gl = {}));

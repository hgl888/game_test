var mo;
(function (mo) {
    /**
     * 只继承function
     * @param clazz
     * @param props
     */
    function impl(clazz) {
        var props = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            props[_i - 1] = arguments[_i];
        }
        var prototype = clazz.prototype;
        for (var i = 0, li = props.length; i < li; ++i) {
            var prop = props[i];
            for (var key in prop) {
                prototype[key] = prop[key];
            }
        }
    }
    mo.impl = impl;
})(mo || (mo = {}));

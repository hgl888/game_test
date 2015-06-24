var mo;
(function (mo) {
    /**
     * 验证数组类型
     * @param {Array} arr
     * @param {function} type
     * @return {Boolean}
     * @function
     */
    function ArrayVerifyType(arr, type) {
        if (arr && arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                if (!(arr[i] instanceof type)) {
                    mo.warn("element type is wrong!");
                    return false;
                }
            }
        }
        return true;
    }
    mo.ArrayVerifyType = ArrayVerifyType;
    /**
     * 根据index删除对象
     * @function
     * @param {Array} arr Source Array
     * @param {Number} index index of remove object
     */
    function ArrayRemoveObjectAtIndex(arr, index) {
        arr.splice(index, 1);
    }
    mo.ArrayRemoveObjectAtIndex = ArrayRemoveObjectAtIndex;
    /**
     * 删除某个对象
     * @function
     * @param {Array} arr Source Array
     * @param {*} delObj  remove object
     */
    function ArrayRemoveObject(arr, delObj) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] == delObj) {
                arr.splice(i, 1);
                break;
            }
        }
    }
    mo.ArrayRemoveObject = ArrayRemoveObject;
    /**
     * @function
     * @param {Array} arr Source Array
     * @param {Array} minusArr minus Array
     */
    function ArrayRemoveArray(arr, minusArr) {
        for (var i = 0, l = minusArr.length; i < l; i++) {
            ArrayRemoveObject(arr, minusArr[i]);
        }
    }
    mo.ArrayRemoveArray = ArrayRemoveArray;
    /**
     * 获取对象在数据里的排序
     * @function
     * @param {Array} arr Source Array
     * @param {*} value find value
     * @return {Number} index of first occurence of value
     */
    function ArrayGetIndexOfValue(arr, value) {
        return arr.indexOf(value);
    }
    mo.ArrayGetIndexOfValue = ArrayGetIndexOfValue;
    /**
     * 推送到数组里
     * @function
     * @param {Array} arr
     * @param {*} addObj
     */
    function ArrayAppendObject(arr, addObj) {
        arr.push(addObj);
    }
    mo.ArrayAppendObject = ArrayAppendObject;
    /**
     * 在数组里插入对象
     * @function
     * @param {Array} arr
     * @param {*} addObj
     * @param {Number} index
     * @return {Array}
     */
    function ArrayAppendObjectToIndex(arr, addObj, index) {
        arr.splice(index, 0, addObj);
        return arr;
    }
    mo.ArrayAppendObjectToIndex = ArrayAppendObjectToIndex;
    /**
     * 在某个位置插入多个对象
     * @function
     * @param {Array} arr
     * @param {Array} addObjs
     * @param {Number} index
     * @return {Array}
     */
    function ArrayAppendObjectsToIndex(arr, addObjs, index) {
        arr.splice.apply(arr, [index, 0].concat(addObjs));
        return arr;
    }
    mo.ArrayAppendObjectsToIndex = ArrayAppendObjectsToIndex;
    /**
     * 找出一个对象在数组里的index
     * @function
     * @param {Array} arr Source Array
     * @param {*} findObj find object
     * @return {Number} index of first occurence of value
     */
    function ArrayGetIndexOfObject(arr, findObj) {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i] == findObj)
                return i;
        }
        return -1;
    }
    mo.ArrayGetIndexOfObject = ArrayGetIndexOfObject;
    /**
     * 数组是否包含一个对象
     * @function
     * @param {Array} arr
     * @param {*} findObj
     * @return {Boolean}
     */
    function ArrayContainsObject(arr, findObj) {
        return arr.indexOf(findObj) != -1;
    }
    mo.ArrayContainsObject = ArrayContainsObject;
    /**
     * 过滤重复的对象
     * @function
     * @param {Array} arr
     * @return {Array}
     */
    function filter(arr) {
        if (arr.length == 0)
            return arr;
        return arr.sort().join(",,").replace(/(,|^)([^,]+)(,,\2)+(,|$)/g, "$1$2$4").replace(/,,+/g, ",").replace(/,$/, "").split(",");
    }
    mo.filter = filter;
})(mo || (mo = {}));

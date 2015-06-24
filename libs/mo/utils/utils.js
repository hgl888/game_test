var mo;
(function (mo) {
    /**
     * 数组操作：移动一个元素到新的位置
     * @param arr
     * @param oldIndex
     * @param newIndex
     * @returns {Array}
     */
    function arrayMove(arr, oldIndex, newIndex) {
        if (newIndex >= arr.length) {
            var k = newIndex - arr.length;
            while ((k--) + 1) {
                arr.push(undefined);
            }
        }
        arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
        return arr;
    }
    mo.arrayMove = arrayMove;
    /**
     * 数组操作：交换两个元素的位置
     * @param arr
     * @param oldIndex
     * @param newIndex
     * @returns {Array}
     */
    function arraySwap(arr, oldIndex, newIndex) {
        arr[oldIndex] = arr.splice(newIndex, 1, arr[oldIndex])[0];
        return arr;
    }
    mo.arraySwap = arraySwap;
    /**
     * 合并2个jsonObject
     * @param jsonObj1
     * @param jsonObj2
     * @returns {{}}
     */
    function mergeJsonObject(jsonObj1, jsonObj2) {
        var attr, resultJsonObj = {};
        for (attr in jsonObj1) {
            resultJsonObj[attr] = jsonObj1[attr];
        }
        for (attr in jsonObj2) {
            resultJsonObj[attr] = jsonObj2[attr];
        }
        return resultJsonObj;
    }
    mo.mergeJsonObject = mergeJsonObject;
    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    function trimSpace(str) {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    }
    mo.trimSpace = trimSpace;
    /**
     * 排序功能的option函数模板。
     *      例子：
     *      var arr = [
     *          {"key1":"a", "key2":"b", "key3":"c", "key4":"d"},
     *          ...
     *      ]
     *      arr.sort(export function sortOption.bind({list : ["key1", "key2", {name:"key3", type:1}, "key4"]}));
     *      意思是一次按照数组的顺序为优先级进行排序，默认为为降序。当定义type为1的时候，为升序。
     * @param a
     * @param b
     * @returns {number}
     */
    function sortOption(a, b) {
        var list = this.list;
        for (var i = 0, li = list.length; i < li; ++i) {
            var key = list[i];
            var type = -1;
            if (typeof key == "object") {
                type = key.type;
                key = key.name;
            }
            if (a[key] < b[key]) {
                return type <= 0 ? 1 : -1;
            }
            else if (a[key] > b[key]) {
                return type <= 0 ? -1 : 1;
            }
        }
        return 0;
    }
    mo.sortOption = sortOption;
    /**
     *
     * @param value
     * @param index
     * @param ar
     * @returns {boolean}
     */
    function filterOption(value, index, ar) {
        var list = this.list;
        if (!list || list.length == 0) {
            return true;
        }
        for (var i = 0, li = list.length; i < li; i++) {
            var filterOptArr = list[i];
            if (filterOptArr.length == 0) {
                continue;
            }
            var key = filterOptArr[0];
            var newArr = filterOptArr.slice(1, filterOptArr.length);
            if (newArr.length > 0 && newArr.indexOf(value[key]) < 0) {
                return false;
            }
        }
        return true;
    }
    mo.filterOption = filterOption;
    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    function getStringLength(str) {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (isChinese(s)) {
                length += 2;
            }
            else {
                length += 1;
            }
        }
        return length;
    }
    mo.getStringLength = getStringLength;
    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    function isChinese(str) {
        var reg = /^[u4E00-u9FA5]+$/;
        if (!reg.test(str)) {
            return true;
        }
        return false;
    }
    mo.isChinese = isChinese;
    /**
     * 根据字节长度获取文字
     * @param str
     * @param startNum 字数序号
     * @param subLength
     */
    function subStr(str, startNum, subLength) {
        var strArr = str.split("");
        var length = 0;
        for (var i = startNum; i < strArr.length; i++) {
            var s = strArr[i];
            if (mo.isChinese(s)) {
                length += 2;
            }
            else {
                length += 1;
            }
            if (length > subLength)
                break;
        }
        return str.substring(startNum, i);
    }
    mo.subStr = subStr;
    /**
     * 从多个字典中查找到值
     * @param props
     * @param key
     */
    function getValueForKey(props, key) {
        var propArr;
        if (props instanceof Array) {
            propArr = props;
        }
        else {
            propArr = [props];
        }
        for (var i = 0; i < propArr.length; i++) {
            var prop = propArr[i][key];
            if (prop != null) {
                return prop;
            }
        }
        return null;
    }
    mo.getValueForKey = getValueForKey;
    /**
     * 敏感词检测
     * @param word
     * @param sensitiveArr
     * @returns {boolean}
     */
    function checkSensitiveWord(word, sensitiveArr) {
        for (var i = 0; i < sensitiveArr.length; i++) {
            var sen = sensitiveArr[i];
            if (sen == "")
                continue;
            if (word.indexOf(sen) !== -1) {
                return true;
            }
        }
        return false;
    }
    mo.checkSensitiveWord = checkSensitiveWord;
    /**
     * 替换敏感词
     * @param word
     * @param sensitiveArr
     * @returns {*}
     */
    function replaceSensitiveWord(word, sensitiveArr) {
        for (var i = 0; i < sensitiveArr.length; i++) {
            var sen = sensitiveArr[i];
            word = word.replace(sen, "*");
        }
        return word;
    }
    mo.replaceSensitiveWord = replaceSensitiveWord;
    /**
     * 获取2个数之间的随机数
     * @param startNum
     * @param endNum
     * @returns {number}
     */
    function random(startNum, endNum) {
        var randomNum = Math.random();
        if (arguments.length == 1) {
            return Math.round(randomNum * startNum);
        }
        else {
            var diffValue = endNum - startNum;
            return startNum + Math.round(randomNum * diffValue);
        }
    }
    mo.random = random;
    /**
     * 从数组里随机出一个
     * @param arr
     */
    function randomFromArr(arr) {
        if (arr.length == 0)
            return;
        var n = random(arr.length - 1);
        return arr[n];
    }
    mo.randomFromArr = randomFromArr;
    /**
     * 判断一个对象是否为空对象
     * @param obj
     * @returns {boolean}
     */
    function isEmptyObj(obj) {
        if (obj) {
            return Object.keys(obj).length == 0;
        }
        return obj == null;
    }
    mo.isEmptyObj = isEmptyObj;
    /**
     * 字符串转为对象   "1:2,2:3" => {"1":2,"2":3}
     * @param str
     * @return {Object}
     */
    function strToObj(str) {
        str = (str + "").replace(/，/g, ",").replace(/：/g, ":"); //为了防止策划误填，先进行转换
        var tempArr0 = str.split(",");
        var obj = {};
        for (var i = 0; i < tempArr0.length; i++) {
            var locTemp = tempArr0[i];
            if (!locTemp)
                continue;
            var tempArr1 = locTemp.split(":");
            obj[tempArr1[0]] = parseInt(tempArr1[1]);
        }
        return obj;
    }
    mo.strToObj = strToObj;
})(mo || (mo = {}));

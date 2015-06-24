var mo;
(function (mo) {
    mo._MsgDlgClassMap = {};
    mo._msgData = {};
    //设置提示信息数据type的key值，如果没有设置，则直接取数据的【.type】值
    mo.msgTypeKey;
    mo.msgTextKey;
    mo.defaultMsgType;
    /**
     * 显示提示信息
     * @param msgCode 消息的ID
     * @param args 最后4个分别是确定和取消的回调参数，之前的是要替换的字符串
     */
    function showMsg(msgCode) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var info = mo._msgData[msgCode];
        if (info == null) {
            if (!isNaN(msgCode)) {
                var msgText = mo.formatStr(logCode.c_102, msgCode);
                showErrMsg(msgText);
            }
            else {
                showErrMsg(msgCode);
            }
        }
        else {
            var type = mo.msgTypeKey == null ? info.type : info[mo.msgTypeKey];
            var MsgDlgClass = mo._MsgDlgClassMap[type]; //获取到MsgDlg类
            args.splice(0, 0, info);
            if (MsgDlgClass) {
                MsgDlgClass.show.apply(MsgDlgClass, args);
            }
            else {
                if (!isNaN(msgCode)) {
                    var msgText = mo.formatStr(logCode.c_105, msgCode);
                    showErrMsg(msgText);
                }
                else {
                    showErrMsg(msgCode);
                }
            }
        }
        return false;
    }
    mo.showMsg = showMsg;
    function showErrMsg(text) {
        mo.warn(text);
        var msgData = {};
        msgData[mo.msgTextKey] = text;
        var MsgDlgClass = mo._MsgDlgClassMap[mo.defaultMsgType];
        if (MsgDlgClass) {
            MsgDlgClass.show.call(MsgDlgClass, msgData);
        }
    }
    /**
     * 按照类型注册弹出框类
     * @param type
     * @param MsgDlgClass
     */
    function registerMsgDlg(type, MsgDlgClass) {
        mo._MsgDlgClassMap[type] = MsgDlgClass;
    }
    mo.registerMsgDlg = registerMsgDlg;
    /**
     * 设置提示消息数据
     * @param data
     */
    function setMsgData(data) {
        mo._msgData = data;
    }
    mo.setMsgData = setMsgData;
})(mo || (mo = {}));

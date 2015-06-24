var logCode;
(function (logCode) {
    //系统级别错误 1-49;
    //系统级别警告 101-199
    logCode.c_101 = "暂未实现【%s#%s】api！";
    logCode.c_102 = "未找到消息码【%s】对应的数据，请检查！";
    logCode.c_103 = "子类需要实现该接口";
    logCode.c_104 = "未找到widget【%s】，请检查！";
    logCode.c_105 = "未找到消息类型【%s】，请检查！";
})(logCode || (logCode = {}));

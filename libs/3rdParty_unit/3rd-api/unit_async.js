var unit;
(function (unit) {
    unit.curRegisterModule = "3rdParty";
    unit.registerTestBtn("async.series", function () {
        var testName = "async.series";
        console.time(testName);
        async.series([
            function (cb1) {
                console.debug("task1 begin");
                egret.setTimeout(function () {
                    console.debug("task1 end");
                    cb1();
                }, null, 1000);
            },
            function (cb1) {
                console.debug("task2 begin");
                egret.setTimeout(function () {
                    console.debug("task2 end");
                    cb1(null, "task2 arg1, 之后的参数将会被忽略");
                }, null, 2000);
            },
            function (cb1) {
                console.debug("task3 begin");
                egret.setTimeout(function () {
                    console.debug("task3 end");
                    cb1(null, { name: "task3 arg", text: "参数可以是any型" });
                }, null, 3000);
            }
        ], function (err, results) {
            console.timeEnd(testName);
            console.debug("err---->", err);
            console.debug("results---->", results);
        });
        console.debug("注意！这里将优先执行，这是区别asyncjs的地方。");
    });
    unit.registerTestBtn("async.parallel", function () {
        var testName = "async.parallel";
        console.time(testName);
        async.parallel([
            function (cb1) {
                console.debug("task1 begin");
                egret.setTimeout(function () {
                    console.debug("task1 end");
                    cb1();
                }, null, 3000);
            },
            function (cb1) {
                console.debug("task2 begin");
                egret.setTimeout(function () {
                    console.debug("task2 end");
                    cb1(null, "task2 arg1, 之后的参数将会被忽略");
                }, null, 2000);
            },
            function (cb1) {
                console.debug("task3 begin");
                egret.setTimeout(function () {
                    console.debug("task3 end");
                    cb1(null, { name: "task3 arg", text: "参数可以是any型" });
                }, null, 1000);
            }
        ], function (err, results) {
            console.timeEnd(testName);
            console.debug("err---->", err);
            console.debug("results---->", results);
        });
        console.debug("注意！这里将优先执行，这是区别asyncjs的地方。");
    });
    unit.registerTestBtn("async.waterfall", function () {
        var testName = "async.waterfall";
        console.time(testName);
        async.waterfall([
            function (cb1) {
                console.debug("task1 begin");
                egret.setTimeout(function () {
                    console.debug("task1 end");
                    cb1(null, "arg1FromTask1");
                }, null, 3000);
            },
            function (arg1FromTask1, cb1) {
                console.debug("task2 begin args---->", arg1FromTask1);
                egret.setTimeout(function () {
                    console.debug("task2 end");
                    cb1(null, "arg1FromTask2", "arg2FromTask2");
                }, null, 2000);
            },
            function (arg1FromTask2, arg2FromTask2, cb1) {
                console.debug("task3 begin args---->", arg1FromTask2, arg2FromTask2);
                egret.setTimeout(function () {
                    console.debug("task3 end");
                    cb1(null, { name: "arg2FromTask3", text: "参数可以是any型，后续的参数将被忽略" });
                }, null, 1000);
            }
        ], function (err, arg1FromTask3) {
            console.timeEnd(testName);
            console.debug("err---->", err);
            console.debug("args from task3, 注意了，这里的result是最后一个任务的第一个传参，且无后续传参---->", arg1FromTask3);
        });
        console.debug("注意！这里将优先执行，这是区别asyncjs的地方。");
    });
    unit.registerTestBtn("async.map array", function () {
        var testName = "async.map array";
        console.time(testName);
        async.map([
            0,
            "arg1",
            { name: "arg2" }
        ], function (value, index, cb1) {
            console.debug("task %s, begin ---->", index, value);
            egret.setTimeout(function () {
                console.debug("task %s, end", index);
                cb1(null, "resultFromTask" + index);
            }, null, 1000);
        }, function (err, results) {
            console.timeEnd(testName);
            console.debug("err---->", err);
            console.debug("当map一个数组时，返回的results是一个数组--->", results);
        });
    });
    unit.registerTestBtn("async.map object", function () {
        var testName = "async.map object";
        console.time(testName);
        async.map({
            a: "aaaa",
            b: "bbbb",
            c: "cccc"
        }, function (value, key, cb1) {
            console.debug("task %s, begin ---->", key, value);
            egret.setTimeout(function () {
                console.debug("task %s, end", key);
                cb1(null, "resultFromTask" + key);
            }, null, 1000);
        }, function (err, results) {
            console.timeEnd(testName);
            console.debug("err---->", err);
            console.debug("当map一个对象时，返回的results是一个对象--->", results);
        });
    });
    unit.registerTestBtn("async.mapLimit array", function () {
        var testName = "async.mapLimit array";
        console.time(testName);
        async.mapLimit([
            0,
            "arg1",
            { name: "arg2" }
        ], 1, function (value, index, cb1) {
            console.debug("task %s, begin ---->", index, value);
            egret.setTimeout(function () {
                console.debug("task %s, end", index);
                cb1(null, "resultFromTask" + index);
            }, null, 1000);
        }, function (err, results) {
            console.timeEnd(testName);
            console.debug("err---->", err);
            console.debug("当map一个数组时，返回的results是一个数组--->", results);
        });
    });
    unit.registerTestBtn("async.mapLimit object", function () {
        var testName = "async.mapLimit object";
        console.time(testName);
        async.mapLimit({
            a: "aaaa",
            b: "bbbb",
            c: "cccc"
        }, 1, function (value, key, cb1) {
            console.debug("task %s, begin ---->", key, value);
            egret.setTimeout(function () {
                console.debug("task %s, end", key);
                cb1(null, "resultFromTask" + key);
            }, null, 1000);
        }, function (err, results) {
            console.timeEnd(testName);
            console.debug("err---->", err);
            console.debug("当map一个对象时，返回的results是一个对象--->", results);
        });
    });
})(unit || (unit = {}));

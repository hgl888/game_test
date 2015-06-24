var unit;
(function (unit) {
    unit.curRegisterModule = "3rdParty";
    unit.registerTestBtn("process.nextTick 1", function () {
        process.nextTick(function () {
            console.debug("process.nextTick 1---->");
        });
    });
    unit.registerTestBtn("process.nextTick 2", function () {
        process.nextTick(function () {
            console.debug("process.nextTick 2---->", this.name);
        }, { name: "nextTick 2 name" });
    });
    unit.registerTestBtn("process.nextTick 3", function () {
        process.nextTick(function (a, b, c) {
            console.debug("process.nextTick 3---->", this.name);
            console.debug(a, b, c);
        }, null, "a", "b", "c");
    });
    unit.registerTestBtn("process.nextTick 4", function () {
        process.nextTick(function (a, b, c) {
            console.debug("process.nextTick 4---->", this.name);
            console.debug(a, b, c);
        }, { name: "nextTick 4 name" }, "a", "b", "c");
    });
})(unit || (unit = {}));

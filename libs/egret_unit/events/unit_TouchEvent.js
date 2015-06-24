var unit;
(function (unit) {
    unit.curRegisterModule = "egret";
    /*
     * zxj 记录
     * egret的事件机制是和HTML的事件机制原理一样的。
     * 直接通过树形结构来的。例如下面的结构：
     * root
     *      -node1
     *          -node11
     *          -node12
     *      -node2
     *          -node21
     *          -node22
     * 事件冒泡的时候，当没有调用`event.stopPropagation`的时候，事件会由子节点向父节点传递。
     * 同级的节点，例如node1和node2，谁在最上面，谁就会先将事件吞掉。
     */
    var TOUCH_BEGIN = egret.TouchEvent.TOUCH_BEGIN;
    var TOUCH_MOVE = egret.TouchEvent.TOUCH_MOVE;
    var TOUCH_END = egret.TouchEvent.TOUCH_END;
    var TOUCH_RELEASE_OUTSIDE = egret.TouchEvent.TOUCH_RELEASE_OUTSIDE;
    var TOUCH_TAP = egret.TouchEvent.TOUCH_TAP;
    var msg1 = "节点【%s】在【%s】阶段对【%s】事件进行了接收： localPoint--->";
    var stateMap = {};
    stateMap[egret.EventPhase.CAPTURING_PHASE] = "捕获";
    stateMap[egret.EventPhase.AT_TARGET] = "目标";
    stateMap[egret.EventPhase.BUBBLING_PHASE] = "冒泡";
    function logName(event) {
        var eventPhase = event.eventPhase;
        console.debug(msg1, event.currentTarget.name, stateMap[eventPhase], event.type, event.localX, event.localY);
    }
    function stopPropagation(event) {
        event.stopPropagation();
        var eventPhase = event.eventPhase;
        console.debug("节点【%s】在【%s】阶段阻止【%s】事件传递 localPoint--->", event.currentTarget.name, stateMap[eventPhase], event.type, event.localX, event.localY);
    }
    function initTouchEvents(node, flag) {
        if (flag === void 0) { flag = false; }
        node.touchEnabled = true;
        node.addEventListener(TOUCH_BEGIN, stopPropagation, null, flag);
        node.addEventListener(TOUCH_MOVE, stopPropagation, null, flag);
        node.addEventListener(TOUCH_END, stopPropagation, null, flag);
        node.addEventListener(TOUCH_RELEASE_OUTSIDE, stopPropagation, null, flag);
        node.addEventListener(TOUCH_TAP, stopPropagation, null, flag);
    }
    unit.registerTestBtn("TOUCH_BEGIN sibling", function () {
        //===================shape 对象创建================
        var shape1 = new unit.UnitShape(50, 50, 0xffff00, "shape1");
        var shape2 = new unit.UnitShape(50, 50, 0x00ffff, "shape2");
        //===================shape 对象结束================
        unit.testContainer.addChild(shape1);
        unit.testContainer.addChild(shape2);
        shape1.touchEnabled = true;
        shape1.addEventListener(TOUCH_BEGIN, logName, null);
        shape2.touchEnabled = true;
        shape2.addEventListener(TOUCH_BEGIN, function (event) {
            logName(event);
            console.debug("开始将事件传递给【panel1】，注意，这里需要手动new 一个新的event进行分发!");
            if (shape1.hitTest(event.stageX, event.stageY)) {
                //下面进行事件的再次传递。传递给指定的node
                var evt = new egret.TouchEvent(TOUCH_BEGIN);
                var point = shape1.globalToLocal(event.stageX, event.stageY);
                evt.touchPointID = event.touchPointID;
                evt.stageX = event.stageX;
                evt.stageY = event.stageY;
                evt.ctrlKey = event.ctrlKey;
                evt.altKey = event.altKey;
                evt.shiftKey = event.shiftKey;
                evt.touchDown = event.touchDown;
                evt._isDefaultPrevented = false;
                evt._target = event._target;
                evt.localX = point.x;
                evt.localY = point.y;
                shape1.dispatchEvent(event);
            }
            else {
                console.debug("未在【%s】的区域内！", shape1.name);
            }
        }, null);
    });
    unit.registerTestBtn("TOUCH_BEGIN tree", function () {
        //=============panel 对象创建 开始=====================
        var panel1 = new unit.UnitPanel(200, 200, 0xff0000, "panel1");
        var panel2 = new unit.UnitPanel(100, 100, 0x00ff00, "panel2");
        var panel3 = new unit.UnitPanel(100, 100, 0x0000ff, "panel3");
        panel3.x = 80;
        panel3.y = 80;
        //=============panel 对象创建 结束=====================
        //===================shape 对象创建================
        var shape1 = new unit.UnitShape(50, 50, 0xffff00, "shape1");
        var shape2 = new unit.UnitShape(50, 50, 0x00ffff, "shape2");
        shape2.x = 30;
        shape2.y = 30;
        //===================shape 对象结束================
        panel1.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
            console.debug("ADDED_TO_STAGE");
        }, null);
        unit.testContainer.addChild(panel1);
        panel1.addChild(panel2);
        panel1.addChild(panel3);
        panel2.addChild(shape1);
        panel2.addChild(shape2);
        panel1.touchEnabled = true;
        panel1.addEventListener(TOUCH_BEGIN, logName, null, true);
        panel1.addEventListener(TOUCH_BEGIN, logName, null);
        panel2.touchEnabled = true;
        panel2.addEventListener(TOUCH_BEGIN, logName, null, true);
        panel2.addEventListener(TOUCH_BEGIN, logName, null);
        panel3.touchEnabled = true;
        panel3.addEventListener(TOUCH_BEGIN, stopPropagation, panel3);
        shape1.touchEnabled = true;
        shape1.addEventListener(TOUCH_BEGIN, logName, null, true);
        shape1.addEventListener(TOUCH_BEGIN, logName, null);
        shape2.touchEnabled = true;
        shape2.addEventListener(TOUCH_BEGIN, stopPropagation, null);
    });
    unit.registerTestBtn("TOUCH_BEGIN parent_false 1", function () {
        //=============panel 对象创建 开始=====================
        var panel1 = new unit.UnitPanel(200, 200, 0xff0000, "panel1");
        var panel2 = new unit.UnitPanel(100, 100, 0x00ff00, "panel2");
        var panel3 = new unit.UnitPanel(100, 100, 0x0000ff, "panel3");
        panel3.x = 80;
        panel3.y = 80;
        //=============panel 对象创建 结束=====================
        unit.testContainer.addChild(panel1);
        panel1.addChild(panel2);
        panel2.addChild(panel3);
        panel1.touchEnabled = false;
        panel1.addEventListener(TOUCH_BEGIN, logName, null);
        panel2.touchEnabled = false;
        panel2.addEventListener(TOUCH_BEGIN, logName, null);
        panel3.touchEnabled = true;
        panel3.addEventListener(TOUCH_BEGIN, function (event) {
            logName(event);
            console.debug("就算父节点设置`touchEnabled=false`，如果该子节点可点击，事件还是会冒泡");
        }, null);
    });
    unit.registerTestBtn("TOUCH_BEGIN parent_false 2", function () {
        //=============panel 对象创建 开始=====================
        var panel1 = new unit.UnitPanel(200, 200, 0xff0000, "panel1");
        var panel2 = new unit.UnitPanel(100, 100, 0x00ff00, "panel2");
        var panel3 = new unit.UnitPanel(100, 100, 0x0000ff, "panel3");
        panel3.x = 80;
        panel3.y = 80;
        //=============panel 对象创建 结束=====================
        unit.testContainer.addChild(panel1);
        panel1.addChild(panel2);
        panel2.addChild(panel3);
        panel1.touchEnabled = false;
        panel1.addEventListener(TOUCH_BEGIN, logName, null, true);
        panel2.touchEnabled = false;
        panel2.addEventListener(TOUCH_BEGIN, logName, null, true);
        panel3.touchEnabled = true;
        panel3.addEventListener(TOUCH_BEGIN, function (event) {
            logName(event);
            console.debug("就算父节点设置`touchEnabled=false`，如果该子节点可点击，事件还是会冒泡");
        }, null, true);
    });
    unit.registerTestBtn("TOUCH_B_M_E_O_T", function () {
        //=============panel 对象创建 开始=====================
        var panel1 = new unit.UnitPanel(200, 200, 0xff0000, "panel1");
        var panel2 = new unit.UnitPanel(100, 100, 0x00ff00, "panel2");
        var panel3 = new unit.UnitPanel(100, 100, 0x0000ff, "panel3");
        panel3.x = 80;
        panel3.y = 80;
        //=============panel 对象创建 结束=====================
        //===================shape 对象创建================
        var shape1 = new unit.UnitShape(50, 50, 0xffff00, "shape1");
        var shape2 = new unit.UnitShape(50, 50, 0x00ffff, "shape2");
        shape2.x = 30;
        shape2.y = 30;
        //===================shape 对象结束================
        unit.testContainer.addChild(panel1);
        panel1.addChild(panel2);
        panel1.addChild(panel3);
        panel2.addChild(shape1);
        panel2.addChild(shape2);
        initTouchEvents(panel1);
        initTouchEvents(panel2);
        initTouchEvents(panel3);
        initTouchEvents(shape1);
        initTouchEvents(shape2);
    });
    unit.registerTestBtn("TOUCH stopPropagation 1", function () {
        //=============panel 对象创建 开始=====================
        var panel1 = new unit.UnitPanel(200, 200, 0xff0000, "panel1");
        var panel2 = new unit.UnitPanel(100, 100, 0x00ff00, "panel2");
        //=============panel 对象创建 结束=====================
        panel1.x = 0;
        panel1.y = 0;
        panel2.x = 0;
        panel2.y = 0;
        unit.testContainer.addChild(panel1);
        panel1.addChild(panel2);
        panel1.touchEnabled = true;
        panel2.touchEnabled = true;
        panel1.addEventListener(TOUCH_BEGIN, function (event) {
            console.debug("【%s】依然能在【%s】阶段接收到【%s】事件", event.currentTarget.name, stateMap[event.eventPhase], event.type);
        }, null);
        panel1.addEventListener(TOUCH_BEGIN, function (event) {
            console.debug("【%s】依然能在【%s】阶段接收到【%s】事件", event.currentTarget.name, stateMap[event.eventPhase], event.type);
        }, null, true);
        panel1.addEventListener(TOUCH_TAP, logName, null);
        panel1.addEventListener(TOUCH_TAP, logName, null, true);
        panel2.addEventListener(TOUCH_TAP, stopPropagation, null);
    });
    unit.registerTestBtn("TOUCH stopPropagation 2", function () {
        //=============panel 对象创建 开始=====================
        var panel1 = new unit.UnitPanel(200, 200, 0xff0000, "panel1");
        var panel2 = new unit.UnitPanel(100, 100, 0x00ff00, "panel2");
        //=============panel 对象创建 结束=====================
        unit.testContainer.addChild(panel1);
        panel1.addChild(panel2);
        panel1.touchEnabled = true;
        panel2.touchEnabled = true;
        panel1.addEventListener(TOUCH_BEGIN, function (event) {
            console.debug("【%s】依然能在【%s】阶段接收到【%s】事件", event.currentTarget.name, stateMap[event.eventPhase], event.type);
        }, null);
        panel1.addEventListener(TOUCH_BEGIN, function (event) {
            console.debug("【%s】依然能在【%s】阶段接收到【%s】事件", event.currentTarget.name, stateMap[event.eventPhase], event.type);
        }, null, true);
        panel1.addEventListener(TOUCH_TAP, logName, null);
        panel1.addEventListener(TOUCH_TAP, logName, null, true);
        panel2.addEventListener(TOUCH_TAP, stopPropagation, null, true);
    });
    unit.registerTestBtn("TOUCH", function () {
        var node = new egret.TextField();
        node.text = "SDFDSFDSFSDF";
        unit.testContainer.addChild(node);
        node.size = 80;
        node.x = 500;
        node.y = 500;
        node.touchEnabled = true;
        var TE = egret.TouchEvent;
        node.addEventListener(TE.TOUCH_BEGIN, function () {
            console.log("TOUCH_BEGIN--->DDDDDDDDDD");
        }, node);
        node.addEventListener(TE.TOUCH_MOVE, function () {
            console.log("TOUCH_MOVE--->DDDDDDDDDD");
        }, node);
    });
})(unit || (unit = {}));

var mo;
(function (mo) {
    mo.actionDispatcher = new egret.EventDispatcher();
    mo.visibleDispatcher = new egret.EventDispatcher();
    mo.invisibleDispatcher = new egret.EventDispatcher();
    mo.exitDispatcher = new egret.EventDispatcher();
    mo.enterDispatcher = new egret.EventDispatcher();
    mo.clickDispatcher = new egret.EventDispatcher();
    mo.cellClickDispatcher = new egret.EventDispatcher();
    mo.widgetCtrlClickDispatcher = new egret.EventDispatcher();
})(mo || (mo = {}));

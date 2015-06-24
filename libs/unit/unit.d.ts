declare module unit {
    class UnitPanel extends egret.DisplayObjectContainer {
        _panelSizeDirty: boolean;
        private _graphics;
        name: string;
        constructor(width?: number, height?: number, color?: number, name?: string);
        _color: number;
        color: number;
        graphics: egret.Graphics;
        _updateTransform(): void;
        _render(renderContext: egret.RendererContext): void;
        _setWidth(width: number): void;
        _setHeight(height: number): void;
    }
}
declare module unit {
    class UnitShape extends egret.DisplayObject {
        _panelSizeDirty: boolean;
        private _graphics;
        name: string;
        constructor(width?: number, height?: number, color?: number, name?: string);
        _color: number;
        color: number;
        graphics: egret.Graphics;
        _updateTransform(): void;
        _render(renderContext: egret.RendererContext): void;
        _setWidth(width: number): void;
        _setHeight(height: number): void;
    }
}
declare module unit {
    var log: any;
    var debug: any;
    var info: any;
    var warn: any;
    var error: any;
    var curRegisterModule: string;
    var menuMap: {};
    var testContainer: egret.DisplayObjectContainer;
    var testTitle: egret.TextField;
    var testButton: egret.TextField;
    var testMenu: Menu;
    var subTestMenu: SubMenu;
    function init(): void;
    class Menu extends egret.DisplayObjectContainer {
        constructor();
        setMenus(menuMap: any): void;
    }
    class SubMenu extends egret.DisplayObjectContainer {
        constructor();
        setButtons(buttonInfoArr: any): void;
    }
    function splitLine(name: any): void;
    function registerTestBtn(name: string, click: (param: any) => void, unload?: (param: any) => void, ctx?: any): void;
    var resRoot: string;
    function resetStage(): void;
    function onTestBtnClick(): boolean;
}

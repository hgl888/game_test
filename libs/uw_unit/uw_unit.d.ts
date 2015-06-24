declare module uw {
    class Unit_TipsLayer extends mo.MsgDlg {
        static __className: string;
        _tipsArr: string[];
        _tipsRunning: boolean;
        _interval: number;
        _initProp(): void;
        setTips(arg: any): void;
        onEnter(): void;
        onExit(): void;
        _runActionQueue(): void;
        createNode(text: any): void;
        isNeedToClose(): void;
        static show(...args: any[]): void;
        static close(): void;
    }
}
/**
* Created by csx on 14/12/17.
*/
declare module uw {
    class Unit_ShowGainTips extends Unit_TipsLayer {
        static __className: string;
        _infoJsonPath: any;
        _initProp(): void;
        createNode(obj: any): void;
    }
}
declare module unit {
}

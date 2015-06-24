/**
 * Created by 晋 on 2015/3/4.
 */
declare module createjs {
    class BaseData {
        newData(data: any): void;
        webTo(to?: string): void;
    }
}
/**
 * Created by 晋 on 2015/1/21.
 */
declare module createjs {
    class Bitmap extends egret.Bitmap {
        _off: boolean;
        id: number;
        private _tid;
        private _imgUrl;
        private _retryed;
        constructor(textureid: any);
        _onAddToStage(): void;
        protected loadRes(): void;
        protected showImage(): void;
        protected onload(data: any, key: any): void;
        setBounds(x: number, y: number, width: number, height: number): void;
        setTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX?: number, skewY?: number, regX?: number, regY?: number): createjs.Bitmap;
    }
}
/**
 * Created by 晋 on 2015/2/5.
 */
declare module createjs {
    class DisplayObjectContainer extends egret.DisplayObjectContainer {
        _off: boolean;
        id: number;
        protected _holder: egret.DisplayObjectContainer;
        protected _container: egret.DisplayObjectContainer;
        constructor();
        addChild(child: egret.DisplayObject): egret.DisplayObject;
        getChildAt(index: number): egret.DisplayObject;
        numChildren: number;
        removeChildAt(index: number): egret.DisplayObject;
        removeChild(child: egret.DisplayObject): egret.DisplayObject;
        getChildIndex(child: egret.DisplayObject): number;
        setChildIndex(child: egret.DisplayObject, index: number): void;
        setBounds(x: number, y: number, width: number, height: number): void;
        regX: number;
        regY: number;
        setTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number, regX: number, regY: number): createjs.DisplayObjectContainer;
        /***********************for touch**************************/
        private _onClick;
        private _onPress;
        private _onMouseMove;
        private _onMouseUp;
        private countTouchEnabled();
        onClick: Function;
        private onTouchTap(event);
        onPress: Function;
        private onTouchBegin(event);
        onMouseMove: Function;
        private onTouchMove(event);
        onMouseUp: Function;
        private onTouchEnd(event);
        dispose(): void;
        _onRemoveFromStage(): void;
        /************************for mask************************/
        private _tempMask;
        protected _maskObj: createjs.Shape;
        dMask: createjs.Shape;
        private _maskBitmap;
        private _maskpoint;
        private _maskTexture;
        _makeBitmapCache(): boolean;
        private cleanMask();
        maskChange(): void;
        _onAddToStage(): void;
        scaleX: number;
        scaleY: number;
        rotation: number;
        skewX: number;
        skewY: number;
        protected setDirty(): void;
    }
}
/**
 * Created by 晋 on 2015/2/9.
 */
declare module createjs {
    class Flash {
        private static fps;
        private static fpsTime;
        private static _lastTime;
        private static _timer;
        static flash: createjs.MovieClip;
        static timer: createjs.TimerManager;
        static init(fps: number): void;
        static setFPS(value: number): void;
        private static onTimer();
        static startFlash(flash: createjs.MovieClip): void;
        static stopFlash(): void;
    }
}
/**
 * Created by 晋 on 2015/1/20.
 */
declare module createjs {
    class MovieClip extends createjs.DisplayObjectContainer {
        static INDEPENDENT: string;
        static SINGLE_FRAME: string;
        static SYNCHED: string;
        timeline: Timeline;
        mode: string;
        loop: boolean;
        startPosition: number;
        labels: Object;
        paused: boolean;
        actionsEnabled: boolean;
        private _synchOffset;
        private _prevPos;
        private _prevPosition;
        private _managed;
        constructor(mode: string, startPosition: number, loop: boolean, labels: Object);
        isVisible: () => boolean;
        update(): void;
        play(): void;
        stop(): void;
        gotoAndPlay(positionOrLabel: any): void;
        gotoAndStop(positionOrLabel: any): void;
        tick(params: any): void;
        private _goto(positionOrLabel);
        private _reset();
        private _updateTimeline();
        private _setState(state, offset);
        private _addManagedChild(child, offset);
    }
    class MovieClipPlugin {
        constructor();
        static priority: number;
        static install(): void;
        static init(tween: any, prop: any, value: any): any;
        static tween: (tween: any, prop: any, value: any, startValues: any, endValues: any, ratio: any, position: any, end: any) => any;
    }
}
/**
 * Created by 晋 on 2015/2/10.
 */
declare module createjs {
    class MovieDataSet {
        id: string;
        res: string;
        assetMap: Object;
        protected _callBack: Function;
        needDestroyRes: boolean;
        dynamicRes: Array<any>;
        data: any;
        getMovie(): createjs.MovieClip;
        registerRes(): void;
        dealDynamicRes(): void;
        getRes(id: string): string;
        init(): void;
        newData(data: any): void;
        loadRes(callBack: Function): void;
        protected loadMainRes(): void;
        destroyRes(force?: boolean): void;
        destroyDynamicRes(): void;
        onResourceLoad(e: RES.ResourceEvent): void;
        webTo(to?: string): void;
    }
}
/**
 * Created by 晋 on 2015/1/22.
 */
declare module createjs {
    class Shape extends egret.DisplayObject {
        private _graphics;
        _off: boolean;
        id: number;
        protected _maskTarget: any;
        isMaskGlobal: boolean;
        constructor();
        setTransform(x: number, y: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): createjs.Shape;
        x: number;
        y: number;
        graphics: createjs.Graphics;
        maskTarget: any;
        protected tellChange(): void;
        _render(renderContext: egret.RendererContext): void;
        _measureBounds(): egret.Rectangle;
    }
}
/**
 * Created by 晋 on 2015/1/21.
 */
declare module createjs {
    class Sprite extends createjs.DisplayObjectContainer {
        constructor();
    }
}
/**
 * Created by 晋 on 2015/1/21.
 */
declare module createjs {
    class Timeline {
        _tweens: Array<any>;
        ignoreGlobalPause: boolean;
        duration: number;
        loop: boolean;
        onChange: Function;
        position: number;
        _paused: boolean;
        _labels: Object;
        _prevPosition: number;
        _prevPos: number;
        _useTicks: boolean;
        movie: createjs.MovieClip;
        _target: any;
        constructor(tweens: any, labels: any, props: any);
        addTween: (tween: any) => any;
        removeTween: (tween: any) => boolean;
        addLabel: (label: any, position: any) => void;
        setLabels: (o: any) => void;
        gotoAndPlay: (positionOrLabel: any) => void;
        gotoAndStop: (positionOrLabel: any) => void;
        setPosition: (value: any, actionsMode: any) => boolean;
        setPaused: (value: any) => void;
        updateDuration: () => void;
        tick: (delta: any) => void;
        resolve: (positionOrLabel: any) => number;
        private _goto;
    }
}
/**
 * Created by 晋 on 2015/1/23.
 */
declare module createjs {
    class Tween extends egret.Tween {
        constructor(target: any, props: any, pluginData: any);
        static installPlugin(plugin: any, properties: any): void;
        static register(tween: any, value: any): void;
        to(props: any, duration?: any, ease?: any): egret.Tween;
    }
}
/**
 * Created by 晋 on 2015/1/20.
 */
declare class G {
    static Controller_Tutorial: any;
    static DataCenter: any;
    static PB: any;
    static jQuery: any;
    static ConfigHelper: any;
    static webTo: (to?: string) => void;
    static stage: egret.Stage;
    static exportRoot: any;
    static uid: number;
    static data: any;
    static dataSet: createjs.MovieDataSet;
    static movieHolder: egret.DisplayObjectContainer;
    static MOVIE_HEIGHT: number;
    static timer: createjs.TimerManager;
    static sound: any;
    static images: Array<string>;
    static getId(): number;
    static getRes(id: string): egret.Texture;
    static int(value: any): number;
    static isPackageImage(img: string): boolean;
    static loading: createjs.MovieClip;
    static holder: egret.DisplayObjectContainer;
    static movieId: string;
    static headMask: egret.DisplayObject;
    static footMask: egret.DisplayObject;
    static showMovie(id: string, data?: any, holder?: egret.DisplayObjectContainer): void;
    static disposeNowMovie(): void;
    static hideMovie(): void;
    static showLoading(holder: egret.DisplayObjectContainer): void;
    static hideLoading(): void;
    private static toShowMovie();
}
/**
 * Created by 晋 on 2015/2/12.
 */
declare module createjs {
    /**时钟管理器[同一函数多次计时，默认会被后者覆盖,delay小于1会立即执行]*/
    class TimerManager {
        private _pool;
        private _handlers;
        private _currTimer;
        private _currFrame;
        private _count;
        private _index;
        constructor();
        update(): void;
        private create(useFrame, repeat, delay, method, args?, thisObj?, cover?);
        /**定时执行一次
         * @param	delay  延迟时间(单位毫秒)
         * @param	method 结束时的回调方法
         * @param	thisObj 函数指向的thisObj
         * @param	args   回调参数
         * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
         * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
        doOnce(delay: number, method: Function, args?: Array<any>, thisObj?: any, cover?: boolean): any;
        /**定时重复执行
         * @param	delay  延迟时间(单位毫秒)
         * @param	method 结束时的回调方法
         * @param	thisObj 函数指向的thisObj
         * @param	args   回调参数
         * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
         * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
        doLoop(delay: number, method: Function, args?: Array<any>, thisObj?: any, cover?: boolean): Object;
        /**定时执行一次(基于帧率)
         * @param	delay  延迟时间(单位为帧)
         * @param	method 结束时的回调方法
         * @param	args   回调参数
         * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
         * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
        doFrameOnce(delay: number, method: Function, args?: Array<any>, thisObj?: any, cover?: boolean): Object;
        /**定时重复执行(基于帧率)
         * @param	delay  延迟时间(单位为帧)
         * @param	method 结束时的回调方法
         * @param	args   回调参数
         * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
         * @return  cover=true时返回回调函数本身，否则返回唯一ID，均用来作为clearTimer的参数*/
        doFrameLoop(delay: number, method: Function, args?: Array<any>, thisObj?: any, cover?: boolean): Object;
        /**定时器执行数量*/
        count: number;
        /**清理定时器
         * @param	method 创建时的cover=true时method为回调函数本身，否则method为返回的唯一ID
         */
        clearTimer(method: any): void;
    }
}
/**定时处理器*/
declare class TimerHandler {
    /**执行间隔*/
    delay: number;
    /**是否重复执行*/
    repeat: boolean;
    /**是否用帧率*/
    userFrame: boolean;
    /**执行时间*/
    exeTime: number;
    /**处理方法*/
    method: Function;
    /**参数*/
    args: Array<any>;
    /**thisObj*/
    thisObj: any;
    /**清理*/
    clear(): void;
}
/**
 * Created by 晋 on 2015/2/10.
 */
declare module createjs {
    class MovieLib {
        private static map;
        static addMovie(id: string, dataSet: createjs.MovieDataSet): void;
        static getData(id: string): any;
    }
}
/**
 * Created by 晋 on 2015/1/22.
 */
declare module createjs {
    class Text extends egret.TextField {
        id: number;
        constructor(text?: string, font?: string, color?: string);
        color: string;
        shadow: any;
        lineHeight: number;
        lineWidth: number;
        x: number;
        setTransform(x: number, y: number, scaleX: number, scaleY: number, rotation: number, skewX?: number, skewY?: number, regX?: number, regY?: number): createjs.Text;
        static parseColor(color: String): any;
    }
    class Shadow {
        color: number;
        blur: number;
        offsetX: number;
        offsetY: number;
        constructor(color: any, offsetX: any, offsetY: any, blur: any);
    }
}
/**
 * Created by 晋 on 2015/2/26.
 */
declare module createjs {
    class CardView extends createjs.DisplayObjectContainer {
        private _imgid;
        private img;
        private imgid;
        private type;
        private config;
        private static configCache;
        constructor(img: string);
        _onAddToStage(): void;
        init(): void;
        protected onload(): void;
        protected createCard(): void;
        getStarNum(): number;
        setBounds(x: any, y: any, width: any, height: any): void;
        static getConfig(img: any): Object;
    }
}
/**
 * Created by 晋 on 2015/3/2.
 */
declare module createjs {
    class MaterialView extends createjs.DisplayObjectContainer {
        private _imgid;
        private img;
        private bg;
        private item;
        private bgItemName;
        private itemItemName;
        constructor(img: string);
        _onAddToStage(): void;
        init(): void;
        private loadItem();
        protected onload(): void;
        protected createCard(): void;
        setBounds(x: any, y: any, width: any, height: any): void;
    }
}
/**
 * Created by 晋 on 2015/3/3.
 */
declare module createjs {
    class MonsterView extends createjs.DisplayObjectContainer {
        private img;
        private imgid;
        private config;
        private static configCache;
        constructor(img: string);
        init(): void;
        protected onload(): void;
        protected createCard(): void;
        getStarNum(): number;
        setBounds(x: any, y: any, width: any, height: any): void;
        static getConfig(img: any): Object;
    }
}


declare module createjs {
    class Graphics {
        draw(ctx):void;
        beginFill(color:string):Graphics;
        drawRect(x:number,y:number,w:number,h:number):Graphics;
        beginLinearGradientFill(colors:string[],alphas:number[],x0:number,y0:number,x1:number,y1:number):Graphics;
        endFill():Graphics;
        beginStroke():Graphics;
        moveTo(x:number, y:number):Graphics;
        lineTo(x:number, y:number):Graphics;
        closePath():Graphics;
        bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y):Graphics;
        beginRadialGradientFill(colors, ratios, x0, y0, r0, x1, y1, r1):Graphics;
        decodePath(str):Graphics;
        quadraticCurveTo(cp1x:number, cp1y:number, x:number, y:number):Graphics;
        _measureBounds():egret.Rectangle;
        drawCircle(x, y, radius):Graphics;
        s:Function;
        ss:Function;
        f:Function;
        p:Function;
        cp:Function;
        dr:Function;
        lf:Function;
        rf:Function;
    }
}
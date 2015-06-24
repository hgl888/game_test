
declare module createjs {
    class Graphics {
        draw(ctx):void;
        beginFill(color:string):void;
        drawRect(x:number,y:number,w:number,h:number):void;
        endFill():void;
    }
}
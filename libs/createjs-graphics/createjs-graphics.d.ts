
declare module createjs {
    class Graphics {
        draw(ctx):void;
        beginFill(color:string):Graphics;
        drawRect(x:number,y:number,w:number,h:number):void;
        beginLinearGradientFill(colors:string[],alphas:number[],x0:number,y0:number,x1:number,y1:number):Graphics;
        endFill():void;
        beginStroke():Graphics;
        moveTo(x:number, y:number):Graphics;
        lineTo(x:number, y:number):Graphics;
        closePath():Graphics;
        curveTo(controlX:number, controlY:number, anchorX:number, anchorY:number):Graphics;
    }
}
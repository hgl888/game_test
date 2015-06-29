var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GraphicsTest = (function (_super) {
    __extends(GraphicsTest, _super);
    function GraphicsTest() {
        _super.call(this);
        this.needDraw = true;
         if(egret_native.rastergl) {
           
        }
    }
    GraphicsTest.prototype._render = function (renderContext) {
    		//egret_native.Graphics.lineStyle( 5, 0xff00ff);
    		//egret_native.Graphics.moveTo( 20, 20 );
    		//egret_native.Graphics.lineTo( 20, 40 );
    		//return;
        var timer = egret_native.timer.getDeltaTime();
        var fps = egret_native.drawInfo.getFPS();
        //console.msglevel( 3 );
        console.log( timer + "----" + fps );
        if(egret_native.rastergl) {
            
            //egret_native.rastergl.rotate(  20 * Math.PI / 180 );
            //egret_native.rastergl.translate( 100, 0, 0 );
            //egret_native.rastergl.scale( 0.5, 0.5 );
            
            egret_native.rastergl.beginPath();
            egret_native.rastergl.lineWidth = 2;
            var my_gradient = egret_native.rastergl.createLinearGradient( 0, 0, 100, 0 );
            //var my_gradient = egret_native.rastergl.createRadialGradient(100,100,5,50,50, 100);
            my_gradient.addColorStop( 0, "#880000ff" );
            my_gradient.addColorStop( 0.5, "#FF00ff00" );
            my_gradient.addColorStop( 1, "#7fff0000" );
            //egret_native.rastergl.fillStyle = my_gradient;
            egret_native.rastergl.fillStyle = "ff00ff";
            egret_native.rastergl.strokeStyle = "#ff00ff";
            //egret_native.rastergl.strokeStyle = my_gradient;

            //egret_native.rastergl.moveTo( 80, 240 );
            //egret_native.rastergl.lineTo( 140, 240 );
            //egret_native.rastergl.lineTo( 110, 60 );
            //egret_native.rastergl.lineTo( 240, 50 );
            //egret_native.rastergl.lineTo( 20, 20 );
            //egret_native.rastergl.lineTo( 0, 70 );
            //egret_native.rastergl.lineTo( 100, 50 );
            //egret_native.rastergl.lineTo( 80, 240 );
            
            egret_native.rastergl.moveTo( 10, 10 );
            //egret_native.rastergl.lineTo( 200, 40 );
            //.rastergl.lineto( 100, 50 );
            //egret_native.rastergl.moveTo( 10, 10 );
            //egret_native.rastergl.lineTo( 10, 100 );
            //egret_native.rastergl.rect( 40, 40, 80, 80 );
            //egret_native.rastergl.lineTo( 100, 10 );
            //egret_native.rastergl.moveTo( 20, 20 );
            //egret_native.rastergl.lineTo( 100, 100 );
            egret_native.rastergl.quadraticCurveTo( 10, 100, 100, 10 );
            egret_native.rastergl.quadraticCurveTo( 200,10,200,100 );
            //egret_native.rastergl.bezierCurveTo(20,100,100,100,100,20);
            //egret_native.rastergl.bezierCurveTo(200,200,200,100, 100,200);
            //egret_native.rastergl.moveTo( 100, 50 );
            //egret_native.rastergl.lineTo( 100, 50 );
            //var sdeg = 2.5656340004316642;
            //var edeg = 4.141666314982544;
            //var radius = 50;
            
            //egret_native.rastergl.arc(100,100,50,sdeg, edeg, true );
            //egret_native.rastergl.moveTo(100, 100);
            //egret_native.rastergl.lineTo( radius* Math.cos(sdeg) + 100, radius * Math.sin(sdeg) + 100);
            //egret_native.rastergl.moveTo( 20, 20 );
            //egret_native.rastergl.bezierCurveTo(200,200,200,100, 100,200);
            //egret_native.rastergl.lineTo( 100, 50 );
            //egret_native.rastergl.lineTo( 100, 150 );
            //egret_native.rastergl.rect( 40, 40, 80, 80 );
            //egret_native.rastergl.stroke();
            egret_native.rastergl.fill();

        }
    };
    return GraphicsTest;
})(egret.DisplayObject);

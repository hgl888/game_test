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
        //var timer = egret_native.timer.getDeltaTime();
        //var fps = egret_native.drawInfo.getFPS();
        //console.msglevel( 3 );
        //console.log( timer + "----" + fps );

        if(egret_native.rastergl) {
            
            //egret_native.rastergl.rotate(  20 * Math.PI / 180 );
            //egret_native.rastergl.translate( 100, 0, 0 );
            //egret_native.rastergl.scale( 0.5, 0.5 );
            // var gl = egret_native.rastergl;
            // egret_native.rastergl.beginPath();
            // egret_native.rastergl.lineWidth = 1;

            // var PI2DEGREE = Math.PI / 180;
            // var x = 0, y = 0, r = 150;
            // gl.beginPath();
            // gl.strokeStyle = "#00FF00";
            // gl.moveTo(x, y);
            // gl.arc(x, y, r, 15*PI2DEGREE, 0, true);
            // gl.lineTo(x, y);
            // y += r*2 + 10;
            // gl.moveTo(x, y);
            // gl.arc(x, y, r, 15*PI2DEGREE, 0, false);
            // gl.lineTo(x, y);
            // gl.translate( 300, 200 );
            // gl.fill();

            //var my_gradient = egret_native.rastergl.createLinearGradient( 0, 99.6, 0, -80.3  );
            //var my_gradient = egret_native.rastergl.createRadialGradient( 0,0,5,50,50, 300);
            //my_gradient.addColorStop( 0, "#ffCC0000" );
            //my_gradient.addColorStop( 1, "#00CC0000" );
            //egret_native.rastergl.fillStyle = my_gradient;
            //egret_native.rastergl.strokeStyle = "ff00ff";
            //egret_native.rastergl.strokeStyle = my_gradient;
            egret_native.rastergl.strokeStyle = "FFF00FF";
            egret_native.rastergl.lineWidth = 5;

            egret_native.rastergl.moveTo( 10, 310 );
            egret_native.rastergl.lineTo( 100, 320 );
            egret_native.rastergl.stroke();
            //gc();

            // egret_native.rastergl.moveTo( -50, 50 );
            // egret_native.rastergl.lineTo( 60, 60 );
            // egret_native.rastergl.lineTo( 80, -80 );
            // egret_native.rastergl.lineTo( -70, -70 );
            // egret_native.rastergl.closePath();
            
//             egret_native.rastergl.moveTo(53.5, -102.5);
//             egret_native.rastergl.lineTo( -13.5, -72.5);
//             egret_native.rastergl.lineTo( -0.9, -66.6);
//             egret_native.rastergl.lineTo( 12.5, -61.5);
//             egret_native.rastergl.lineTo( -3.9, -55.4);
//             egret_native.rastergl.lineTo( -22.5, -51.5);
//             egret_native.rastergl.lineTo( -21.1, -40.9);
//             egret_native.rastergl.lineTo( -15.5, -34.5);
//             egret_native.rastergl.lineTo( -18.2, -32.8);
//             egret_native.rastergl.lineTo( -22, -32);
//             egret_native.rastergl.lineTo( -25.5, -26.5);
//             egret_native.rastergl.lineTo( 1.1, -41.7);
//             egret_native.rastergl.lineTo(27.5, -59.5);
//             egret_native.rastergl.lineTo(14.3, -34.5);
//             egret_native.rastergl.lineTo(-1.5, -9.5);
//             egret_native.rastergl.lineTo(28.7, -18.6);
//             egret_native.rastergl.lineTo(60.5, -28.5);
//             egret_native.rastergl.lineTo(41.1, -10.4);
//             egret_native.rastergl.lineTo(21.5, 7.5);
//             egret_native.rastergl.lineTo(57.9, 27.6);
//             egret_native.rastergl.lineTo(101.5, 40.5);
//             egret_native.rastergl.lineTo(122.5, 24.5);
//             egret_native.rastergl.lineTo(130, 29.5);
//             egret_native.rastergl.lineTo(135.5, 36.5);
//             egret_native.rastergl.lineTo(126.3, 45.8);
//             egret_native.rastergl.lineTo(116.5, 54.5);
//             egret_native.rastergl.lineTo(96.2, 53.6);
//             egret_native.rastergl.lineTo(74.7, 51.1);
//             egret_native.rastergl.lineTo(38.5, 56.5);
//             egret_native.rastergl.lineTo(77.6, 59.4);
//             egret_native.rastergl.lineTo(95.1, 64.7);
//             egret_native.rastergl.lineTo(113.5, 69.5);
//             egret_native.rastergl.lineTo(118.1, 92.5);
//             egret_native.rastergl.lineTo(116.5, 115.5);
//             egret_native.rastergl.lineTo(113.7, 110.8);
//             egret_native.rastergl.lineTo(110.5, 106.5);
//             egret_native.rastergl.lineTo(107.9, 110.4);
//             egret_native.rastergl.lineTo(106.5, 115.5);
//             egret_native.rastergl.lineTo(103.6, 109.8);
//             egret_native.rastergl.lineTo(102.5, 102.5);
//             egret_native.rastergl.lineTo(109.4, 100.8);
//             egret_native.rastergl.lineTo(114.5, 97.5);
//             egret_native.rastergl.lineTo(110.5, 75.5);
//             egret_native.rastergl.lineTo(69.6, 64);
//             egret_native.rastergl.lineTo(23.5, 65.5);
//             egret_native.rastergl.lineTo(30.4, 71.6);
//             egret_native.rastergl.lineTo(37.5, 77.5);
//             egret_native.rastergl.lineTo(23.7, 86.3);
//             egret_native.rastergl.lineTo(7.5, 92.5);
//             egret_native.rastergl.lineTo(-17.6, 101);
//             egret_native.rastergl.lineTo(-49.5, 103.5);
//             egret_native.rastergl.lineTo(-50.9, 108.1);
//             egret_native.rastergl.lineTo(-51.5, 113.5);
//             egret_native.rastergl.lineTo(-54.4, 107.6);
//             egret_native.rastergl.lineTo(-59.3, 104.4);
//             egret_native.rastergl.lineTo(-63.8, 105.8);
//             egret_native.rastergl.lineTo(-65.5, 113.5);
//             egret_native.rastergl.lineTo(-69.5, 98.5);
//             egret_native.rastergl.lineTo(-47.4, 97.6);
//             egret_native.rastergl.lineTo(-24.5, 97.5);
//             egret_native.rastergl.lineTo(2.4, 88.3);
//             egret_native.rastergl.lineTo(26.5, 77.5);
//             egret_native.rastergl.lineTo(22.9, 74.1);
//             egret_native.rastergl.lineTo(18.5, 71.5);
//             egret_native.rastergl.lineTo(-7.2, 74.4);
//             egret_native.rastergl.lineTo(-35.5, 70.5);
//             egret_native.rastergl.lineTo(-44.3, 58.8);
//             egret_native.rastergl.lineTo(-51.5, 45.5);
//             egret_native.rastergl.lineTo(-63.8, 60.1)
//             egret_native.rastergl.lineTo(-75.5, 75.5);
//             egret_native.rastergl.lineTo(-88, 72.5);
//             egret_native.rastergl.lineTo(-97.5, 66.5);
//             egret_native.rastergl.lineTo(-116.2, 80.8);
//             egret_native.rastergl.lineTo(-134.5, 95.5);
//             egret_native.rastergl.lineTo(-152.2, 88.7);
//             egret_native.rastergl.lineTo(-168.5, 80.5);
//             egret_native.rastergl.lineTo(-172.1, 86);
//             egret_native.rastergl.lineTo(-176.5, 88.5);
//             egret_native.rastergl.lineTo(-180.5, 44.5);
//             egret_native.rastergl.lineTo(-171.6, 43.4);
//             egret_native.rastergl.lineTo(-161.5, 43.5);
//             egret_native.rastergl.lineTo(-159.6, 33.9);
//             egret_native.rastergl.lineTo(-158.5, 23.5);
//             egret_native.rastergl.lineTo(-153.1, 25.1);
//             egret_native.rastergl.lineTo(-148.5, 27.5);
//             egret_native.rastergl.lineTo(-147.3, 16.1);
//             egret_native.rastergl.lineTo(-145.5, 5.5);
//             egret_native.rastergl.lineTo(-136.7, 8.7);
//             egret_native.rastergl.lineTo(-129.5, 13.5);
//             egret_native.rastergl.lineTo(-115.8, -1.8);
//             egret_native.rastergl.lineTo(-103.5, -18.5);
//             egret_native.rastergl.lineTo(-102.2, -2.1);
//             egret_native.rastergl.lineTo(-102.5, 17.5);
//             egret_native.rastergl.lineTo(-91.5, 8.7);
//             egret_native.rastergl.lineTo(-80.5, -2.5);
//             egret_native.rastergl.lineTo(-75.7, -19.8);
//             egret_native.rastergl.lineTo(-71.5, -38.5);
//             egret_native.rastergl.lineTo(-106.6, -49.9);
//             egret_native.rastergl.lineTo(-142.5, -60.5);
//             egret_native.rastergl.lineTo(-117.9, -70.6);
//             egret_native.rastergl.closePath();


//             egret_native.rastergl.moveTo(42.5, -103.5);
//             egret_native.rastergl.lineTo(-43.5, -84.1);
//             egret_native.rastergl.lineTo(-125.5, -60.5);
//             egret_native.rastergl.lineTo(-108.2, -55.5);
//             egret_native.rastergl.lineTo(-90.5, -50.9);
//             egret_native.rastergl.lineTo(-58.5, -38.5);
//             egret_native.rastergl.lineTo(-61.3, -20.6);
//             egret_native.rastergl.lineTo(-61.5, -2.5);
//             egret_native.rastergl.lineTo(-39.5, -7.5);
//             egret_native.rastergl.lineTo(-43.2, -15.3);
//             egret_native.rastergl.lineTo(-47.5, -22.5);
//             egret_native.rastergl.lineTo(-49.3, -18.3);
//             egret_native.rastergl.lineTo(-50.5, -13.5);
//             egret_native.rastergl.lineTo(-44.5, -11.5);
//             egret_native.rastergl.lineTo(-51.1, -7.7);
//             egret_native.rastergl.lineTo(-58.5, -9.5);
//             egret_native.rastergl.lineTo(-48.5, -31.5);
//             egret_native.rastergl.lineTo(-36.9, -34.4);
//             egret_native.rastergl.lineTo(-25.5, -37.5);
//             egret_native.rastergl.lineTo(-34.4, -44.6);
//             egret_native.rastergl.lineTo(-42.5, -52.5);
//             egret_native.rastergl.lineTo(-22.2, -57.2);
//             egret_native.rastergl.lineTo(-2.5, -62.5);
//             egret_native.rastergl.lineTo(-24.5, -70.5);
//             egret_native.rastergl.lineTo(8.7, -87.3);
//             egret_native.rastergl.lineTo(42.5, -103.5);
//             egret_native.rastergl.closePath();

//             egret_native.rastergl.moveTo(133.5, -14.5);
//             egret_native.rastergl.quadraticCurveTo(142.9, -14, 149.5, -10.5);
//             egret_native.rastergl.quadraticCurveTo(148.4, -7.8, 145.3, -5.7);
//             egret_native.rastergl.quadraticCurveTo(141.4, -3.6, 139.5, -2.5);
//             egret_native.rastergl.quadraticCurveTo(136.8, -3.5, 135.5, -7.5);
//             egret_native.rastergl.quadraticCurveTo(134.4, -12.4, 133.5, -14.5);
//             egret_native.rastergl.closePath();



//             egret_native.rastergl.moveTo(115.5, -1.5);
//             egret_native.rastergl.quadraticCurveTo(123.8, -1.2, 134.5, 1.5);
//             egret_native.rastergl.quadraticCurveTo(131.5, 7.9, 129.8, 10.8);
//             egret_native.rastergl.quadraticCurveTo(126.8, 15.9, 122.5, 17.5);
//             egret_native.rastergl.quadraticCurveTo(121.9, 13.9, 118.9, 8.1);
//             egret_native.rastergl.quadraticCurveTo(115.9, 2.5, 115.5, -1.5);
//             egret_native.rastergl.closePath();

//             egret_native.rastergl.moveTo(149.1, 10.4);
//             egret_native.rastergl.quadraticCurveTo(153.9, 15.2, 155.5, 20.5);
//             egret_native.rastergl.quadraticCurveTo(151.1, 23.1, 144.8, 18.6);
//             egret_native.rastergl.quadraticCurveTo(138, 12.6, 135.5, 10.5);
//             egret_native.rastergl.quadraticCurveTo(135.9, 8.5, 137.8, 6.3);
//             egret_native.rastergl.quadraticCurveTo(140, 3.8, 140.5, 2.5);
//             egret_native.rastergl.quadraticCurveTo(143.2, 5.2, 149.1, 10.4);
//             egret_native.rastergl.closePath();

//             egret_native.rastergl.moveTo(15.5, 5.5);
//             egret_native.rastergl.quadraticCurveTo(17.4, 5.3, 21.5, 0.4);
//             egret_native.rastergl.quadraticCurveTo(27.2, -6.3, 27.5, -6.5);
//             egret_native.rastergl.quadraticCurveTo(27.5, -6.6, 34.9, -11.9);
//             egret_native.rastergl.quadraticCurveTo(38.4, -14.4, 37.5, -16.5);
//             egret_native.rastergl.quadraticCurveTo(31.8, -14.2, 18.4, -10.1);
//             egret_native.rastergl.quadraticCurveTo(5.6, -6.3, -0.5, -3.5);
//             egret_native.rastergl.quadraticCurveTo(3.3, -3.3, 7.8, 1.4);
//             egret_native.rastergl.quadraticCurveTo(12.1, 5.8, 15.5, 5.5);
//             egret_native.rastergl.closePath();


//             egret_native.rastergl.moveTo(2.8, -26.9);
//             egret_native.rastergl.quadraticCurveTo(10, -37.7, 12.5, -43.5);
//             egret_native.rastergl.quadraticCurveTo(1.6, -35.7, -5.3, -31.3);
//             egret_native.rastergl.quadraticCurveTo(-15.3, -24.9, -24.5, -20.5);
//             egret_native.rastergl.quadraticCurveTo(-22.4, -16.8, -17.5, -14);
//             egret_native.rastergl.quadraticCurveTo(-16.3, -13.3, -8.5, -9.5);
//             egret_native.rastergl.quadraticCurveTo(-6.7, -12.6, 2.8, -26.9);
//             egret_native.rastergl.closePath();

//             egret_native.rastergl.moveTo(30.3, 50.3);
//             egret_native.rastergl.quadraticCurveTo(26.9, 55.8, 22.5, 58.5);
//             egret_native.rastergl.quadraticCurveTo(22.1, 58.1, 16, 53.5);
//             egret_native.rastergl.quadraticCurveTo(12, 50.5, 11.5, 46.5);
//             egret_native.rastergl.quadraticCurveTo(13.1, 45.9, 16.2, 44.7);
//             egret_native.rastergl.quadraticCurveTo(19, 43.6, 21.5, 43.5);
//             egret_native.rastergl.quadraticCurveTo(21.5, 44.5, 19.3, 47.4);
//             egret_native.rastergl.quadraticCurveTo(18, 49, 21.5, 49.5);
//             egret_native.rastergl.quadraticCurveTo(23.6, 50.9, 25.8, 47.5);
//             egret_native.rastergl.quadraticCurveTo(27.4, 45.1, 28.5, 41.5);
//             egret_native.rastergl.quadraticCurveTo(21.6, 39.7, 18.2, 38.8);
//             egret_native.rastergl.quadraticCurveTo(12.1, 37.1, 7.5, 36.5);
//             egret_native.rastergl.quadraticCurveTo(7.4, 39, 6.3, 45.3);
//             egret_native.rastergl.quadraticCurveTo(5.3, 50.6, 5.5, 54.5);
//             egret_native.rastergl.quadraticCurveTo(7.3, 55.4, 12.3, 58.7);
//             egret_native.rastergl.quadraticCurveTo(16.4, 61.4, 19.5, 62.5);
//             egret_native.rastergl.quadraticCurveTo(26.6, 57.3, 44.5, 45.5);
//             egret_native.rastergl.quadraticCurveTo(60.7, 45, 79.6, 46.4);
//             egret_native.rastergl.quadraticCurveTo(88.5, 47.1, 112.5, 49.5);
//             egret_native.rastergl.quadraticCurveTo(112.6, 48.7, 120.8, 43.1);
//             egret_native.rastergl.quadraticCurveTo(128.6, 37.7, 128.5, 35.5);
//             egret_native.rastergl.quadraticCurveTo(128, 29.1, 116.7, 36.4);
//             egret_native.rastergl.quadraticCurveTo(104.8, 45.3, 103.5, 45.5);
//             egret_native.rastergl.quadraticCurveTo(99.4, 46.1, 91.2, 43.8);
//             egret_native.rastergl.quadraticCurveTo(81.8, 40.7, 77.5, 39.5);
//             egret_native.rastergl.quadraticCurveTo(51.4, 32, 14.1, 10.9);
//             egret_native.rastergl.quadraticCurveTo(-5.3, -0.3, -14.3, -5.4);
//             egret_native.rastergl.quadraticCurveTo(-29.8, -14.2, -39.5, -18.5);
//             egret_native.rastergl.quadraticCurveTo(-38.2, -16.1, -35, -12);
//             egret_native.rastergl.quadraticCurveTo(-32.4, -8, -32.5, -3.5);
//             egret_native.rastergl.quadraticCurveTo(-39.5, -2.8, -49.8, -0.3);
//             egret_native.rastergl.quadraticCurveTo(-62.4, 2.8, -66.5, 3.5);
//             egret_native.rastergl.quadraticCurveTo(-68, 3.7, -68.3, 1.8);
//             egret_native.rastergl.quadraticCurveTo(-68.6, -0.4, -69.5, -0.5);
//             egret_native.rastergl.quadraticCurveTo(-68.5, 7.5, -63.3, 17.2);
//             egret_native.rastergl.quadraticCurveTo(-61.4, 20.9, -53.5, 33.5);
//             egret_native.rastergl.quadraticCurveTo(-42.4, 51.2, -32.5, 65.5);
//             egret_native.rastergl.quadraticCurveTo(-27.8, 65.2, -20.5, 66.4);
//             egret_native.rastergl.quadraticCurveTo(-16.3, 67.1, -8, 68.8);
//             egret_native.rastergl.quadraticCurveTo(7, 71.3, 12.5, 66.5);
//             egret_native.rastergl.quadraticCurveTo(11.7, 65.8, 5.4, 62.1);
//             egret_native.rastergl.quadraticCurveTo(0.9, 59.5, -0.5, 56.5);
//             egret_native.rastergl.quadraticCurveTo(-0.1, 54.9, 1.4, 42.4);
//             egret_native.rastergl.quadraticCurveTo(2.4, 33.7, 5.5, 30.5);
//             egret_native.rastergl.quadraticCurveTo(7.6, 31.2, 21.2, 34.3);
//             egret_native.rastergl.quadraticCurveTo(30.8, 36.5, 35.5, 39.5);
//             egret_native.rastergl.quadraticCurveTo(32.2, 47, 30.3, 50.3);
//             egret_native.rastergl.closePath();
             
//             egret_native.rastergl.moveTo(149.5, 26.5);
//             egret_native.rastergl.quadraticCurveTo(149.1, 29.2, 147.3, 31.3);
//             egret_native.rastergl.quadraticCurveTo(146.2, 32.5, 143.5, 34.5);
//             egret_native.rastergl.quadraticCurveTo(139.1, 33, 134.7, 29.2);
//             egret_native.rastergl.quadraticCurveTo(130, 24.7, 127.5, 22.5);
//             egret_native.rastergl.quadraticCurveTo(130.5, 16.2, 137.4, 20);
//             egret_native.rastergl.quadraticCurveTo(139.4, 21, 143.4, 23.7);
//             egret_native.rastergl.quadraticCurveTo(147.1, 26, 149.5, 26.5);
//             egret_native.rastergl.closePath();


// egret_native.rastergl.moveTo(162, -14);
// egret_native.rastergl.quadraticCurveTo(165.6, -15.5, 167.5, -16.5);
// egret_native.rastergl.quadraticCurveTo(170.3, -15.5, 169.6, -10.3);
// egret_native.rastergl.quadraticCurveTo(169.2, -7.5, 168.5, -2.5);
// egret_native.rastergl.quadraticCurveTo(164, -4, 161.3, -5.9);
// egret_native.rastergl.quadraticCurveTo(158, -8.2, 156.5, -11.5);
// egret_native.rastergl.quadraticCurveTo(158.1, -12.4, 162, -14);
// egret_native.rastergl.closePath();

// egret_native.rastergl.moveTo(161.5, 12.5);
// egret_native.rastergl.quadraticCurveTo(157.4, 11.7, 153.3, 6.7);
// egret_native.rastergl.quadraticCurveTo(148.9, 1.5, 145.5, 0.5);
// egret_native.rastergl.quadraticCurveTo(148.7, -7.4, 155.6, -4);
// egret_native.rastergl.quadraticCurveTo(159.5, -2, 165.5, 4.5);
// egret_native.rastergl.quadraticCurveTo(165.4, 6.6, 163.7, 8.7);
// egret_native.rastergl.quadraticCurveTo(161.8, 11.2, 161.5, 12.5);
// egret_native.rastergl.closePath();

// egret_native.rastergl.moveTo(176, 10.5);
// egret_native.rastergl.quadraticCurveTo(177.8, 13, 180.5, 17.5);
// egret_native.rastergl.lineTo(165.5, 17.5);
// egret_native.rastergl.quadraticCurveTo(167.4, 9.5, 170.5, 4.5);
// egret_native.rastergl.quadraticCurveTo(173.3, 6.8, 176, 10.5);
// egret_native.rastergl.closePath();

// egret_native.rastergl.moveTo(166.4, 29.1);
// egret_native.rastergl.quadraticCurveTo(170, 35.7, 172.5, 37.5);
// egret_native.rastergl.quadraticCurveTo(168.5, 39.2, 161.2, 38);
// egret_native.rastergl.quadraticCurveTo(151.6, 36.4, 149.5, 36.5);
// egret_native.rastergl.quadraticCurveTo(149.2, 33.7, 153.5, 29.3);
// egret_native.rastergl.quadraticCurveTo(158.6, 24.1, 159.5, 21.5);
// egret_native.rastergl.quadraticCurveTo(163.1, 23, 166.4, 29.1);
// egret_native.rastergl.closePath();

// egret_native.rastergl.moveTo(-26.5, -50.5);
// egret_native.rastergl.quadraticCurveTo(-28.8, -50.7, -29.9, -50.4);
// egret_native.rastergl.quadraticCurveTo(-31.4, -50, -31.5, -48.5);
// egret_native.rastergl.quadraticCurveTo(-31, -48.4, -29.5, -47);
// egret_native.rastergl.quadraticCurveTo(-28.3, -46, -26.5, -46.5);
// egret_native.rastergl.closePath();

// egret_native.rastergl.moveTo(-65.9, -38.1);
// egret_native.rastergl.quadraticCurveTo(-66.6, -38.7, -67.5, -38.5);
// egret_native.rastergl.quadraticCurveTo(-67.6, -33.2, -70.2, -23);
// egret_native.rastergl.quadraticCurveTo(-72.6, -13.3, -72.5, -9.5);
// egret_native.rastergl.quadraticCurveTo(-67.8, -10, -66.5, -20.3);
// egret_native.rastergl.quadraticCurveTo(-65.7, -32.9, -64.5, -37.5);
// egret_native.rastergl.quadraticCurveTo(-65, -37.5, -65.9, -38.1);
// egret_native.rastergl.closePath();

// egret_native.rastergl.moveTo(-75.5, 6.5);
// egret_native.rastergl.quadraticCurveTo(-76.2, 9.1, -79.1, 17.9);
// egret_native.rastergl.quadraticCurveTo(-81.3, 24.9, -82.5, 29.5);
// egret_native.rastergl.quadraticCurveTo(-79.5, 29.1, -79, 29.1);
// egret_native.rastergl.quadraticCurveTo(-78.5, 29.1, -75.5, 29.5);
// egret_native.rastergl.quadraticCurveTo(-74.9, 26.7, -72.1, 23.3);
// egret_native.rastergl.quadraticCurveTo(-69.2, 19.8, -68.5, 17.5);
// egret_native.rastergl.quadraticCurveTo(-70, 16.2, -71.8, 11.8);
// egret_native.rastergl.quadraticCurveTo(-73.5, 7.7, -75.5, 6.5);
// egret_native.rastergl.closePath();

// egret_native.rastergl.moveTo(-29.4, -27.7);
// egret_native.rastergl.quadraticCurveTo(-28.9, -30.7, -30.5, -31.5);
// egret_native.rastergl.quadraticCurveTo(-31.5, -30.4, -35.5, -30);
// egret_native.rastergl.quadraticCurveTo(-39.4, -29.6, -40.5, -28.5);
// egret_native.rastergl.quadraticCurveTo(-38.8, -27.9, -35.5, -25.9);
// egret_native.rastergl.quadraticCurveTo(-32.5, -24.1, -30.5, -23.5);
// egret_native.rastergl.quadraticCurveTo(-29.7, -26.1, -29.4, -27.7);
// egret_native.rastergl.closePath();

// egret_native.rastergl.moveTo(-142.5, 11.5);
// egret_native.rastergl.quadraticCurveTo(-142, 14.9, -143.2, 24);
// egret_native.rastergl.quadraticCurveTo(-144.2, 31.5, -142.5, 35.5);
// egret_native.rastergl.quadraticCurveTo(-141.2, 32.5, -136.7, 26.8);
// egret_native.rastergl.quadraticCurveTo(-132.6, 21.6, -131.5, 17.5);
// egret_native.rastergl.quadraticCurveTo(-133.6, 16.8, -136.9, 14.4);
// egret_native.rastergl.quadraticCurveTo(-140.2, 12.1, -142.5, 11.5);
// egret_native.rastergl.closePath();

// egret_native.rastergl.moveTo(-108.5, -5.5);
// egret_native.rastergl.quadraticCurveTo(-110.6, -0.8, -115, 4.9);
// egret_native.rastergl.quadraticCurveTo(-117.5, 8.1, -122.5, 14.5);
// egret_native.rastergl.quadraticCurveTo(-131, 26.4, -130.5, 40.5);
// egret_native.rastergl.quadraticCurveTo(-137.8, 39.2, -142, 42.5);
// egret_native.rastergl.quadraticCurveTo(-144.6, 44.5, -147.5, 50.5);
// egret_native.rastergl.quadraticCurveTo(-144.6, 49.7, -139.5, 47.5);
// egret_native.rastergl.quadraticCurveTo(-134.4, 45.3, -131.5, 44.5);
// egret_native.rastergl.quadraticCurveTo(-130, 45.6, -128.4, 48.9);
// egret_native.rastergl.quadraticCurveTo(-126.6, 52.4, -125.5, 53.5);
// egret_native.rastergl.quadraticCurveTo(-124.7, 52.7, -121.8, 46.6);
// egret_native.rastergl.quadraticCurveTo(-119.7, 42.3, -116.5, 41.5);
// egret_native.rastergl.quadraticCurveTo(-111.2, 43.6, -102.4, 47.9);
// egret_native.rastergl.quadraticCurveTo(-92.6, 52.7, -88.5, 54.5);
// egret_native.rastergl.quadraticCurveTo(-87.2, 52.4, -80.6, 43.8);
// egret_native.rastergl.quadraticCurveTo(-75.7, 37.4, -73.5, 32.5);
// egret_native.rastergl.quadraticCurveTo(-78.4, 33.9, -81.4, 34.4);
// egret_native.rastergl.quadraticCurveTo(-86.7, 35.2, -89.5, 33.5);
// egret_native.rastergl.quadraticCurveTo(-84.1, 16.9, -81.5, 6.5);
// egret_native.rastergl.quadraticCurveTo(-86.1, 9, -93.7, 17.2);
// egret_native.rastergl.quadraticCurveTo(-100.9, 25, -106.5, 27.5);
// egret_native.rastergl.quadraticCurveTo(-107.9, 23.1, -107.5, 11);
// egret_native.rastergl.quadraticCurveTo(-107, -1.1, -108.5, -5.5);
// egret_native.rastergl.closePath();

// egret_native.rastergl.moveTo(-132.5, 50.5);
// egret_native.rastergl.quadraticCurveTo(-157.2, 56.5, -165.5, 76.5);
// egret_native.rastergl.quadraticCurveTo(-161.2, 75.8, -150.9, 75.6);
// egret_native.rastergl.quadraticCurveTo(-141, 75.3, -136.5, 74.5);
// egret_native.rastergl.quadraticCurveTo(-136.6, 73.9, -138.7, 65.9);
// egret_native.rastergl.quadraticCurveTo(-140.1, 60.5, -139.5, 58.5);
// egret_native.rastergl.quadraticCurveTo(-139.4, 58.5, -133.4, 58.4);
// egret_native.rastergl.quadraticCurveTo(-129.8, 58.4, -128.5, 59.5);
// egret_native.rastergl.quadraticCurveTo(-128.4, 56.8, -129.9, 54.4);
// egret_native.rastergl.quadraticCurveTo(-131.7, 51.9, -132.5, 50.5);
// egret_native.rastergl.closePath();

// egret_native.rastergl.moveTo(-117.5, 58.5);
// egret_native.rastergl.quadraticCurveTo(-118.9, 58.6, -118.5, 55.5);
// egret_native.rastergl.quadraticCurveTo(-118.1, 52.4, -119.5, 52.5);
// egret_native.rastergl.quadraticCurveTo(-119.5, 54.1, -121.1, 55.9);
// egret_native.rastergl.quadraticCurveTo(-122.6, 57.6, -122.5, 59.5);
// egret_native.rastergl.quadraticCurveTo(-122.1, 59.4, -119.4, 59.6);
// egret_native.rastergl.quadraticCurveTo(-117.4, 59.7, -117.5, 58.5);
// egret_native.rastergl.closePath();

// egret_native.rastergl.moveTo(-113.5, 65.5);
// egret_native.rastergl.quadraticCurveTo(-122.1, 63.8, -123.6, 63.6);
// egret_native.rastergl.quadraticCurveTo(-129.4, 62.6, -134.5, 62.5);
// egret_native.rastergl.quadraticCurveTo(-134, 65.5, -132.5, 70.5);
// egret_native.rastergl.quadraticCurveTo(-131, 75.9, -130.5, 78.5);
// egret_native.rastergl.quadraticCurveTo(-134.1, 79.9, -142.8, 80.2);
// egret_native.rastergl.quadraticCurveTo(-152.1, 80.5, -155.5, 81.5);
// egret_native.rastergl.quadraticCurveTo(-152.1, 82.5, -145.1, 85.6);
// egret_native.rastergl.quadraticCurveTo(-138.6, 88.5, -134.5, 89.5);
// egret_native.rastergl.quadraticCurveTo(-132.9, 88.1, -114.6, 73.3);
// egret_native.rastergl.quadraticCurveTo(-102.6, 63.6, -95.5, 56.5);
// egret_native.rastergl.quadraticCurveTo(-98.3, 56.1, -105.2, 52);
// egret_native.rastergl.quadraticCurveTo(-111, 48.6, -114.5, 49.5);
// egret_native.rastergl.quadraticCurveTo(-113, 56.2, -112.8, 57.6);
// egret_native.rastergl.quadraticCurveTo(-112.1, 63, -113.5, 65.5);
// egret_native.rastergl.closePath();

// egret_native.rastergl.moveTo(-135.5, 34);
// egret_native.rastergl.quadraticCurveTo(-136.8, 35, -136.5, 36.5);
// egret_native.rastergl.lineTo(-132.5, 36.5);
// egret_native.rastergl.quadraticCurveTo(-132.9, 34.6, -133.1, 33.6);
// egret_native.rastergl.quadraticCurveTo(-133.5, 32, -134.5, 31.5);
// egret_native.rastergl.quadraticCurveTo(-134.1, 33, -135.5, 34);
// egret_native.rastergl.closePath();

// egret_native.rastergl.moveTo(-148.5, 32.5);
// egret_native.rastergl.quadraticCurveTo(-149.6, 32.3, -151.3, 30.8);
// egret_native.rastergl.quadraticCurveTo(-152.9, 29.5, -154.5, 29.5);
// egret_native.rastergl.quadraticCurveTo(-154.2, 32, -155, 35.9);
// egret_native.rastergl.quadraticCurveTo(-155.9, 39.7, -155.5, 42.5);
// egret_native.rastergl.lineTo(-150.5, 42.5);
// egret_native.rastergl.quadraticCurveTo(-149.7, 41, -149.3, 37.7);
// egret_native.rastergl.quadraticCurveTo(-148.8, 33.6, -148.5, 32.5);
// egret_native.rastergl.closePath();
   
// egret_native.rastergl.moveTo(-64.5, 28.5);
// egret_native.rastergl.quadraticCurveTo(-68.8, 34.4, -75.8, 47.6);
// egret_native.rastergl.quadraticCurveTo(-82.9, 58.6, -92.5, 61.5);
// egret_native.rastergl.quadraticCurveTo(-87, 67.9, -76.5, 70.5);
// egret_native.rastergl.quadraticCurveTo(-73.9, 64.9, -66.4, 55.1);
// egret_native.rastergl.quadraticCurveTo(-59.1, 45.6, -56.5, 39.5);
// egret_native.rastergl.quadraticCurveTo(-56.6, 39.3, -59.7, 33.2);
// egret_native.rastergl.quadraticCurveTo(-61.6, 29.4, -64.5, 28.5);
// egret_native.rastergl.closePath();

//             //egret_native.rastergl.stroke();
//             egret_native.rastergl.fill();

        }
    };
    return GraphicsTest;
})(egret.DisplayObject);

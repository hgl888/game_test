console.log("test_rastergl.js");
var EgretTest;
(function test_rastergl(egret) {
	// global obj: gl is egret.rastergl
	var x = 0, y = 0;
	var gl = egret.rastergl;
	var g = egret.Graphics;
	// shared functions
	function drawCross(x, y, size) {
		gl.beginPath();
		gl.moveTo(x - (size / 2), y);
		gl.lineTo(x + (size / 2), y);
		gl.moveTo(x, y - (size / 2));
		gl.lineTo(x, y + (size / 2));
		gl.stroke();
	}
	;

	// define tests
	var tests = new Array();

	// child->Set( String::New("translate"), FunctionTemplate::New(
	// XContext::JS_translate) );
	tests.push({
		name : "translate",
		test : function() {
			// 0
			gl.strokeStyle = "#ffff00";
			x = 50, y = 200;
			gl.lineWidth = 1;
			gl.translate(10, -7.2);
			drawCross(0, 0, 50);
			gl.translate(100, 0);
			gl.lineWidth = 25.7;
			drawCross(0, 0, 50);
			for ( var i = 0; i < 20; i++) {
				// console.log("translate: " + i * 120 + ", 0");
				// gl.lineWidth = i;
				if (i > 0)
					gl.lineWidth = i;
				else
					gl.lineWidth = 1;
				gl.translate(20, i * 20);
				drawCross(0, 100, 50);
			}
			g.setTransform(1, 0, 0, 1, 0, 0);
		}
	});
	// child->Set( String::New("rotate"), FunctionTemplate::New(
	// XContext::JS_rotate ));
	tests.push({
		name : "rotate",
		test : function() {
			// 1
			gl.strokeStyle = "#ffff00";
			gl.fillStyle = "#0000ff";
			x = 270, y = 480;
			gl.translate(x, y);
			gl.lineWidth = 5;

			for ( var i = 0; i < 10; i++) {
				gl.beginPath();
				gl.rotate(i * 11.2 * DEG2ARC);
				gl.lineWidth = -i;
				gl.moveTo(0, i * 10);
				gl.lineTo(0, 230);
				gl.stroke();
			}

			g.setTransform(1, 0, 0, 1, 0, 0);
		}
	});
	// child->Set( String::New("scale"), FunctionTemplate::New(
	// XContext::JS_scale) );
	tests.push({
		name : "scale",
		test : function() {
			// 2
			gl.strokeStyle = "#ffff00";
			gl.fillStyle = "#0000ff";
			x = 270, y = 480;
			gl.translate(x, y);
			gl.lineWidth = 1;
			gl.beginPath();
			gl.strokeRect(-20.1, -20.1, 40.2, 40.2);
			gl.beginPath();
			gl.scale(2.1, -2.1);
			gl.strokeRect(-20.1, -20.1, 40.2, 40.2);
			gl.beginPath();
			gl.scale(1.8, 1.1, 1);
			gl.strokeRect(-20.1, -20.1, 40.2, 40.2);
			gl.beginPath();
			gl.scale(-2, 8, 1000);
			gl.strokeRect(-20.1, -20.1, 40.2, 40.2);
			gl.beginPath();
			gl.scale(1.2, 40000000000000);
			gl.strokeRect(-20.1, -20.1, 40.2, 40.2);
			gl.beginPath();
			gl.scale(0, 1.5);
			gl.strokeRect(-20.1, -20.1, 40.2, 40.2);
			gl.beginPath();
			g.setTransform(1, 0, 0, 1, 0, 0);
		}
	});
	// child->Set( String::New("fill"), FunctionTemplate::New( XContext::JS_fill
	// ) );
	tests.push({
		name : "fill",
		test : function() {
			// 3
			gl.strokeStyle = "#ffff00";
			gl.fillStyle = "#0000ff";
			gl.beginPath();
			gl.fill();
			gl.moveTo(-20, -40);
			gl.lineTo(300, 400);
			gl.lineTo(40, 410);
			gl.fill();

			gl.beginPath();
			gl.moveTo(20, 450);
			gl.lineTo(100, 800);
			gl.lineTo(1000000000000000, 600);
			gl.lineTo(20, 450);
			gl.fill();

			gl.beginPath();
			gl.lineWidth = 4;
			gl.moveTo(400, 20);
			gl.lineTo(450, 380);
			gl.lineTo(402, 20);
			gl.lineTo(400, 20);
			gl.stroke();
			gl.fill();
		}
	});
	// child->Set( String::New("beginPath"), FunctionTemplate::New(
	// XContext::JS_beginPath) );
	tests.push({
		name : "beginPath",
		test : function() {
			// 4
			gl.strokeStyle = "#ffff00";
			gl.fillStyle = "#0000ff";
			x = 20, y = 100;
			gl.lineWidth = 3;

			gl.beginPath();
			gl.moveTo(x, y);
			gl.lineTo(x + 200, y);
			gl.stroke();

			y = 200;
			gl.beginPath();
			gl.moveTo(x, y);
			gl.beginPath();
			gl.lineTo(x + 200, y);
			gl.lineTo(x, y + 20);
			gl.stroke();

			y = 300;
			gl.beginPath();
			gl.moveTo(x, y);
			gl.lineTo(x + 200, y);
			y += 20;
			gl.moveTo(x, y);
			gl.lineTo(x + 200, y);
			gl.stroke();

			y = 400;
			gl.beginPath();
			gl.moveTo(x, y);
			gl.lineTo(x + 100, y);
			gl.beginPath();
			gl.stroke();

		}
	});
	// child->Set( String::New("closePath"), FunctionTemplate::New(
	// XContext::JS_closePath ));
	tests.push({
		name : "closePath",
		test : function() {
			// 5
			gl.strokeStyle = "#ffff00";
			gl.fillStyle = "#0000ff";
			x = 20, y = 100;
			gl.lineWidth = 1;

			gl.beginPath();
			gl.moveTo(x, y);
			gl.lineTo(x + 100, y);
			y += 20;
			gl.moveTo(x, y);
			gl.lineTo(x + 100, y);
			gl.closePath();
			gl.stroke();

			y = 200;
			gl.beginPath();
			gl.moveTo(x, y);
			gl.lineTo(x + 100, y);
			gl.closePath();
			gl.stroke();

			y = 300;
			gl.beginPath();
			gl.moveTo(x, y);
			gl.lineTo(x + 100, y);
			gl.lineTo(x + 100, y + 20);
			gl.closePath();
			gl.stroke();

			y = 400;
			gl.beginPath();
			gl.moveTo(x, y);
			gl.lineTo(x + 100, y);
			gl.lineTo(x, y + 20);
			gl.closePath();
			gl.fill();
		}
	});
	// child->Set( String::New("stroke"), FunctionTemplate::New(
	// XContext::JS_stroke ) );
	tests.push({
		name : "stroke",
		test : function() {
			// 6
			gl.strokeStyle = "#ffff00";
			gl.fillStyle = "#0000ff";
			x = 20, y = 100;

			gl.lineWidth = 1;
			gl.beginPath();
			gl.stroke();
			gl.beginPath();
			gl.moveTo(x, y);
			gl.lineTo(x + 10, y);
			gl.lineTo(x + 20, y + 1);
			gl.lineTo(x + 30, y + 3);
			gl.stroke();
			y = 202;
			gl.lineWidth = 0.3;
			gl.beginPath();
			gl.moveTo(x, y);
			gl.lineTo(x + 100, y + 1);
			gl.lineTo(x + 200, y + 3);
			gl.lineTo(x + 300, y + 4);
			gl.lineTo(x + 400, y + 7);
			gl.stroke();
		}
	});
	// child->Set( String::New("moveTo"), FunctionTemplate::New(
	// XContext::JS_moveto ) );
	tests.push({
		name : "moveTo",
		test : function() {
			// 7
			gl.strokeStyle = "#ffff00";
			gl.fillStyle = "#0000ff";
			x = 20, y = 100;
			gl.lineWidth = 1;
			gl.beginPath();
			for ( var i = 0, d = 1; i < 1000; i++) {
				d = -d;
				gl.moveTo(x + d * i, y - d * i);
			}
			gl.stroke();
			gl.lineTo(x, y);
			gl.lineTo(x + 200, y + 300);
			gl.stroke();
		}
	});
	// child->Set( String::New("lineTo"), FunctionTemplate::New(
	// XContext::JS_lineto ));
	tests.push({
		name : "lineTo",
		test : function() {
			// 8
			gl.strokeStyle = "#ffff00";
			gl.fillStyle = "#0000ff";
			x = 20, y = 20;
			gl.lineWidth = 1;
			gl.beginPath();
			var s = 0.1;
			for ( var i = 0; i < 1000; i += s) {
				// gl.lineWidth = s;
				s += 0.3;
				gl.lineTo(x, y);
				gl.lineTo(x + 200, y + i);
			}
			gl.stroke();

			x = 300, y = 20;
			gl.beginPath();
			s = 0.1;
			for ( var i = 0; i < 1000; i += s) {
				gl.lineWidth = s / 5;
				s += 0.3;
				gl.lineTo(x, y + i);
				gl.lineTo(x + 200, y + i);
			}
			gl.stroke();
		}
	});
	// child->Set( String::New("arc"), FunctionTemplate::New(
	// XContext::JS_arc));
	tests.push({
		name : "arc",
		test : function() {
			// 9
			gl.strokeStyle = "#ffff00";
			gl.fillStyle = "#0000ff";
			x = 100, y = 100;
			var r = 20;
			gl.lineWidth = 0.4;
			gl.beginPath();
			gl.moveTo(x, y);
			gl.arc(x, y, r, 0, 20 * DEG2ARC);
			gl.arc(x, y, r * 2, 0, 40 * DEG2ARC, true);
			gl.arc(x, y, r * 3, 0, 60 * DEG2ARC, false);
			gl.stroke();
			gl.beginPath();
			gl.lineWidth = 1;
			x = 300.4, y = 200.9, r = Math.PI * 30;
			var d = 17.1;
			gl.moveTo(x, y);
			gl.arc(x, y, r, 180 * DEG2ARC, d * DEG2ARC, false);
			gl.lineTo(x, y);
			gl.stroke();
			gl.beginPath();
			x = x + 2 * r * Math.cos(d * DEG2ARC);
			y = y + 2 * r * Math.sin(d * DEG2ARC);
			gl.moveTo(x, y);
			gl.arc(x, y, r - 2, (d + 180) * DEG2ARC, 60 * DEG2ARC, true);
			gl.lineTo(x, y);
			gl.stroke();
		}
	});
	// child->Set( String::New("rect"), FunctionTemplate::New(
	// XContext::JS_rect));
	tests.push({
		name : "rect",
		test : function() {
			// 10
			gl.strokeStyle = "#ffff00";
			gl.fillStyle = "#0000ff";
			x = 20, y = 20;
			gl.lineWidth = 1;
			gl.beginPath();
			gl.rect(x, y, 100, 100);
			gl.rect(x + 100, y + 100, 100, 100);
			gl.stroke();

			x = 300, y = 20;
			gl.beginPath();
			gl.rect(x, y, 200, 100);
			gl.rect(x - 30, y + 100, 30, 300);
			gl.fill();

			x = 20, y = 300;
			gl.beginPath();
			for ( var i = 0; i <= 3; i += 0.5) {
				gl.rect(x, y + i * 20, 200, i);
			}
			gl.fill();

			x = 20, y = 400;
			gl.beginPath();
			for ( var i = 0; i <= 3; i += 0.5) {
				gl.rect(x, y + i * 20, 200, i);
			}
			gl.stroke();

			x = 20, y = 500;
			gl.beginPath();
			for ( var i = 0; i <= 3; i += 0.5) {
				gl.rect(x + i * 20, y, i, 200);
			}
			gl.fill();

			x = 120, y = 500;
			gl.beginPath();
			for ( var i = 0; i <= 3; i += 0.5) {
				gl.rect(x + i * 20, y, i, 200);
			}
			gl.stroke();
		}
	});
	// //child->Set( String::New("save"), FunctionTemplate::New(
	// XContext::JS_save));
	// tests.push({
	// name : "save",
	// test : function() {
	// // No implementation
	// }
	// });
	// //child->Set( String::New("restore"), FunctionTemplate::New(
	// XContext::JS_restore));
	// tests.push({
	// name : "restore",
	// test : function() {
	// // No implementation
	// }
	// });
	// child->Set( String::New("quadraticCurveTo"),
	// FunctionTemplate::New(XContext::JS_quadraticCurveTo));
	tests.push({
		name : "quadraticCurveTo",
		test : function() {
			// 11
			var makeCurve = function(x0, y0, x1, y1, x2, y2) {
				var myCross = function(x, y) {
					gl.moveTo(x - 5, y - 5);
					gl.lineTo(x + 5, y + 5);
					gl.moveTo(x - 5, y + 5);
					gl.lineTo(x + 5, y - 5);
				}
				myCross(x0, y0);
				myCross(x1, y1);
				myCross(x2, y2);
				gl.moveTo(x0, y0);
				gl.quadraticCurveTo(x1, y1, x2, y2);
			};
			gl.strokeStyle = "#ffff00";
			gl.fillStyle = "#0000ff";
			x = 20, y = 30;
			gl.lineWidth = 1;
			gl.beginPath();
			for ( var i = 0; i < 3; i++) {
				makeCurve(x + i * 40, y, x + i * 40, y + 200, x + i * 40 + i
				* 10, y + i * 30);
			}
			gl.stroke();
			gl.beginPath();
			gl.strokeStyle = "#00ffff";
			y += 220;
			makeCurve(x, y, x + 5, y - 20, x + 300, y);
			y += 40;
			makeCurve(x, y, x, y, x + 300, y);
			y += 40;
			makeCurve(x, y, x + 300, y, x + 300, y);
			y += 40;
			makeCurve(x, y, x+80, y, x + 300, y);
			y += 40;
			makeCurve(x, y, x+80, y+40, x + 300, y);
			gl.stroke();

		}
	});
	// child->Set( String::New("fillRect"), FunctionTemplate::New(
	// XContext::JS_fillRect));
	tests.push({
		name : "fillRect",
		test : function() {
			// 12
			x = 25, y = 25;
			gl.lineWidth = 1;
			gl.fillStyle = "#ff0000";
			for ( var i = 0; i < 5; i++) {
				gl.fillRect(x, y, 200, i / 0.7);
				y += 20;
			}
			x = 25, y = 25;
			gl.fillStyle = "#0000ff";
			for ( var i = 0; i < 5; i++) {
				gl.fillRect(x, y, i / 0.7, 10000);
				x += 20;
			}
			x = 145, y = 145;
			gl.fillStyle = "#00ff00";
			gl.fillRect(x + 100, y + 20, -100, -20);

		}
	});
	// child->Set( String::New("strokeRect"), FunctionTemplate::New(
	// XContext::JS_strokeRect));
	tests.push({
		name : "strokeRect",
		test : function() {
			// 13
			x = 25, y = 25;
			gl.lineWidth = 10;
			gl.strokeStyle = "#ff0000";
			for ( var i = 0; i < 5; i++) {
				gl.lineWidth = i / 0.8;
				gl.strokeRect(x, y, 200, i / 0.7);
				y += 20;
			}
			x = 25, y = 25;
			gl.lineWidth = 10;
			gl.strokeStyle = "#0000ff";
			for ( var i = 0; i < 5; i++) {
				gl.lineWidth = i / 0.8;
				gl.strokeRect(x, y, i / 0.7, 10000);
				x += 20;
			}
			x = 145, y = 145;
			gl.lineWidth = 10;
			gl.lineWidth = -2;
			gl.strokeStyle = "#00ff00";
			gl.strokeRect(x + 100, y + 20, -100, -20);
		}
	});
	// child->Set( String::New("clearRect"), FunctionTemplate::New(
	// XContext::JS_clearRect));
	tests.push({
		name : "clearRect",
		test : function() {
			// 14
			gl.lineWidth = 2;
			gl.strokeStyle = "#556b2f";
			gl.fillStyle = "#00ff00";
			gl.fillRect(40,40,screenSize.width-80,screenSize.height-80);

			x = 25, y = 25;
			for (var i = 0; i< 10; i++) {
				gl.clearRect(x, y, 200, i*1.7);
				y += 20;
			}
			x = 25, y = 25;
			for (var i = 0; i< 10; i++) {
				gl.clearRect(x, y, i*1.7, 200);
				x += 20;
			}
			gl.clearRect(x+20, y+220, 10000, 200000.2);
			// TODO: Clear regions that cover the pixels in pixels in the canvas element.
		}
	});
	// //child->Set( String::New("clip"), FunctionTemplate::New(
	// XContext::JS_clip));
	// tests.push({
	// name : "clip",
	// test : function() {
	// // No implementation
	// }
	// });
	// child->Set( String::New("bezierCurveTo"),FunctionTemplate::New(
	// XContext::JS_bezierCurveTo ) );
	tests.push({
		name : "bezierCurveTo",
		test : function() {
			// 15
			var myBezierCurve = function(x0, y0, xc0, yc0, xc1, yc1, x1, y1) {
				var myCross = function(x, y) {
					gl.moveTo(x - 5, y - 5);
					gl.lineTo(x + 5, y + 5);
					gl.moveTo(x - 5, y + 5);
					gl.lineTo(x + 5, y - 5);
				}
				myCross(x0, y0);
				myCross(xc0, yc0);
				myCross(xc1, yc1);
				myCross(x1, y1);
				gl.moveTo(x0, y0);
				gl.bezierCurveTo(xc0, yc0, xc1, yc1, x1, y1);
			}
			gl.lineWidth = 1;
			gl.strokeStyle = "#ffff00";
			gl.beginPath();

			x = 20, y = 30;
			myBezierCurve(x, y, x, y, x, y, x, y);
			x += 20;
			myBezierCurve(x, y, x, y+200, x+200, y, x+200, y+200);
			x += 220;
			myBezierCurve(x+50, y+200, x+200, y, x, y, x+200-50, y+200);
			gl.stroke();
			gl.beginPath();
			gl.strokeStyle = "#00ffff";
			myBezierCurve(x, y+200, x+200, y, x, y, x+200, y+200);
			x = 20, y += 220;
			myBezierCurve(x, y, x, y, x+400, y, x+400, y);
			y += 20;
			myBezierCurve(x+50, y, x, y, x+400, y, x+400-50, y);
			y += 20;
			myBezierCurve(x, y, x+50, y, x+400-50, y, x+400, y);
			y += 20;
			gl.stroke();
			gl.beginPath();
			gl.strokeStyle = "#ff00ff";
			myBezierCurve(x, y, x+400, y, x, y+400, x, y);
			x += 200;
			y += 20;
			gl.stroke();
			gl.beginPath();
			gl.strokeStyle = "#ffffff";
			myBezierCurve(x, y, x, y+400, x-400, y+400, x+200, y);
			myBezierCurve(x, y, x, y+400, x-200, y+400, x+200, y);
			myBezierCurve(x, y, x, y+400, x-100, y+400, x+200, y);
			myBezierCurve(x, y, x, y+400, x+100, y+400, x+200, y);
			myBezierCurve(x, y, x, y+400, x+200, y+400, x+200, y);
			myBezierCurve(x, y, x, y+400, x+400, y+400, x+200, y);
			myBezierCurve(x, y, x, y+400, x+800, y+400, x+200, y);
			myBezierCurve(x, y, x, y+400, x, y+400, x+200, y);

			gl.stroke();
		}
	});
	// //child->Set( String::New("arcTo"), FunctionTemplate::New(
	// XContext::JS_arcTo));
	// tests.push({
	// name : "arcTo",
	// test : function() {
	// // No implementation
	// }
	// });
	// //child->Set( String::New("isPointInPath"),FunctionTemplate::New(
	// XContext::JS_isPointInPath));
	// tests.push({
	// name : "createRadialGradient",
	// test : function() {
	// // No implementation
	// }
	// });
	// child->Set( String::New("createLinearGradient"),
	// FunctionTemplate::New(XContext::JS_createLinearGradient) );
	tests.push({
		name : "createLinearGradient",
		test : function() {
			// 16
			var linearDefine = function(x0, y0, x1, y1, c1, c2) {
				var linearGradient = gl.createLinearGradient(x0, y0, x1, y1);
				linearGradient.addColorStop(0, c1);
				linearGradient.addColorStop(1, c2);
				return linearGradient;
			};
			var crossMark = function(x,y,w,h) {
				gl.strokeStyle="#828282";
				gl.beginPath();
				gl.moveTo(x,y);
				gl.lineTo(x+w, y+h);
				gl.moveTo(x+w, y);
				gl.lineTo(x, y+h);
				gl.stroke();
				gl.beginPath();
			}
			var linearFillRect = function(x, y, w, h, lx1, ly1, lx2, ly2, c1, c2) {
				crossMark(x,y,w,h);
				var linearGradient = linearDefine(x + lx1, y + ly1, x + lx2, y + ly2, c1, c2);
				gl.fillStyle = linearGradient;
				gl.fillRect(x, y, w, h);
				linearGradient = null;
			};
			var linearStrokeRect = function(x, y, w, h, lx1, ly1, lx2, ly2, c1, c2) {
				crossMark(x,y,w,h);
				var linearGradient = linearDefine(x + lx1, y + ly1, x + lx2, y + ly2, c1, c2);
				gl.strokeStyle = linearGradient;
				gl.strokeRect(x, y, w, h);
				linearGradient = null;
			};
			x = 20, y = 20;
			gl.lineWidth = 5;

			linearFillRect(x, y, 100, 40, 0, 0, 100, 0, "#00ffff", "#002f2f");
			y += 60;
			linearStrokeRect(x, y, 100, 40, 100, 0, 0, 0, "#00ffff", "#002f2f");
			y += 60;

			linearFillRect(x, y, 100, 40, 0, 0, 0, 0, "#00ffff", "#002f2f");
			y += 60;

			linearFillRect(x, y, 100, 40, 0, 0, 0, 40, "#00ffff", "#002f2f");
			y += 60;
			linearStrokeRect(x, y, 100, 40, 0, 40, 0, 0, "#00ffff", "#002f2f");
			y += 60;

			linearStrokeRect(x, y, 100, 40, 0, 0, 40, 40, "#00ffff", "#002f2f");
			y += 60;

			crossMark(x,y,100,40);
			var linearGradient = gl.createLinearGradient(x, y, 100, 0);
			gl.fillStyle = linearGradient;
			gl.fillRect(x, y, 100, 40);
			linearGradient = null;

			linearGradient = linearDefine(0, 0, 0, screenSize.width, "#0f001f", "#1c1c1c");
			linearGradient.addColorStop(0.23, "#00BFFF");
			linearGradient.addColorStop(0.39, "#ffffff");
			linearGradient.addColorStop(0.39, "#cd6839");
			gl.fillStyle = linearGradient;
			gl.strokeStyle = linearGradient;
			gl.fillRect(150.3, -10000.2, 20.1, 20000.3);
			x = 270, y = 160;
			gl.beginPath();
			gl.arc(x, y, 40, 0, 270 * DEG2ARC, false);
			gl.arc(x, y, 80, 270 * DEG2ARC, 0, true);
			gl.closePath();
			gl.fill();

			gl.beginPath();
			gl.lineWidth = 3.7;
			x = 360, y = 200;
			gl.moveTo(x, y);
			for ( var d = 1, i = 0; i < 20; i++) {
				gl.lineTo(x + i * 10, y + d * i * 21.7);
				d = -d;
			}
			gl.stroke();
			linearGradient = null;
			
		}
	});
	// child->Set( String::New("createRadialGradient"),
	// FunctionTemplate::New(XContext::JS_createRadialGradient) );
	tests.push({
		name : "createRadialGradient",
		test : function() {
			// 17
			var w = screenSize.width / 2;
			var h = w;
			x = w / 2;
			y = x;
			var radialGradient = gl.createRadialGradient(x, y, w / 1.3, x, y, w / 8.1);
			radialGradient.addColorStop(0, "#0000ff");
			radialGradient.addColorStop(1, "#ffff00");
			gl.fillStyle = radialGradient;
			gl.fillRect(x - w / 2, y - h / 2, w, h);
			radialGradient = null;

			x += w;
			radialGradient = gl.createRadialGradient(x + w / 4, y + w / 4, w / 9, x, y, w / 2);
			radialGradient.addColorStop(0, "#0000ff");
			radialGradient.addColorStop(1, "#ffff00");
			gl.fillStyle = radialGradient;
			gl.fillRect(x - w / 2, y - h / 2, w, h);
			radialGradient = null;

			x -= w;
			y += w;
			radialGradient = gl.createRadialGradient(x - w / 5, y - w / 5, w / 2, x + w / 5, y + w / 4, w / 9);
			radialGradient.addColorStop(0, "#0000ff");
			radialGradient.addColorStop(1, "#ffff00");
			gl.fillStyle = radialGradient;
			gl.fillRect(x - w / 2, y - h / 2, w, h);
			radialGradient = null;
		}
	});
	// child->SetAccessor( String::New("lineWidth"),XContext::JS_lineWidth_get,
	// XContext::JS_lineWidth_set );
	tests.push({
		name : "lineWidth",
		test : function() {
			// 18
			var myCross = function(x, y) {
				gl.moveTo(x - 5, y - 5);
				gl.lineTo(x + 5, y + 5);
				gl.moveTo(x - 5, y + 5);
				gl.lineTo(x + 5, y - 5);
			}
			x = 30, y = 80;
			gl.lineWidth = 0.1;
			gl.strokeStyle = "#ff0000";
			for (var i = -5.1; i < 10; i += 1.0) {
				gl.beginPath();
				gl.lineWidth = i;
				//console.log("width: " + i);
				gl.moveTo(x, y);
				gl.lineTo(x+300, y+ i*10);
				gl.stroke();
				gl.lineWidth = 1;
				gl.beginPath();
				myCross(x-10, y);
				myCross(x+310, y + i*10);
				gl.stroke();
				gl.lineWidth = 0.1;
				y += 10;
			}
			y += 100;
			x = 80;
			gl.beginPath();
			gl.lineWidth = 100;
			gl.moveTo(x, y);
			gl.lineTo(x+1, y+5);
			gl.stroke();
			gl.beginPath();
			gl.lineWidth = 1;
			gl.strokeStyle="#00ffff";
			myCross(x, y);
			gl.stroke();
		}
	});
	// child->SetAccessor( String::New("fillStyle"), XContext::JS_fillStyle_get,
	// XContext::JS_fillStyle_set );
	tests.push({
		name : "fillStyle",
		test : function() {
			// 19
			/*
			 * context . fillStyle [ = value ] Returns the current style used
			 * for filling shapes.
			 * 
			 * Can be set, to change the fill style.
			 * 
			 * The style can be either a string containing a CSS color, or a
			 * CanvasGradient or CanvasPattern object. Invalid values are
			 * ignored.
			 *
			 */
			var crossMark = function(x,y,w,h) {
				gl.strokeStyle="#828282";
				gl.lineWidth = 5;
				gl.beginPath();
				gl.moveTo(x,y);
				gl.lineTo(x+w, y+h);
				gl.moveTo(x+w, y);
				gl.lineTo(x, y+h);
				gl.stroke();
				gl.beginPath();
			}
			gl.fillStyle = "#ff7f7f";
			x=20, y=20;
			crossMark(x,y,200,40);
			gl.fillStyle="";
			gl.fillRect(x,y,200,40);
			y += 60;

			crossMark(x,y,200,40);
			gl.fillStyle="123";
			gl.fillRect(x,y,200,40);
			y += 60;

			crossMark(x,y,200,40);
			gl.fillStyle = 112233;
			gl.fillRect(x,y,200,40);
			y += 60;

			crossMark(x,y,200,40);
			gl.fillStyle = "112233";
			gl.fillRect(x,y,200,40);
			y += 60;

			crossMark(x,y,200,40);
			gl.fillStyle = "#112233";
			gl.fillRect(x,y,200,40);
			y += 60;

			crossMark(x,y,200,40);
			gl.fillStyle = null;
			gl.fillRect(x,y,200,40);
			y += 60;

			crossMark(x,y,200,40);
			var myGradient = gl.createLinearGradient(x,y,x+200, y+40);
			myGradient.addColorStop(0, "#00000000");
			myGradient.addColorStop(1, "#00ffff");
			gl.fillStyle = myGradient;
			gl.fillRect(x,y,200,40);
			myGradient = null;
		}
	});
	// child->SetAccessor( String::New("strokeStyle"),
	// XContext::JS_strokeStyle_get, XContext::JS_strokeStyel_set );
	tests.push({
		name : "strokeStyle",
		test : function() {
			// 20
			var crossMark = function(x, y, w, h) {
				gl.strokeStyle = "#828282";
				gl.lineWidth = 5;
				gl.beginPath();
				gl.moveTo(x, y);
				gl.lineTo(x + w, y + h);
				gl.moveTo(x + w, y);
				gl.lineTo(x, y + h);
				gl.stroke();
				gl.beginPath();
			}
			x = 20, y = 20;
			crossMark(x, y, 200, 40);
			gl.strokeStyle = "#ff7f7f";
			gl.lineWidth = 5;
			gl.strokeStyle = "";
			gl.strokeRect(x, y, 200, 40);
			y += 60;

			crossMark(x, y, 200, 40);
			gl.strokeStyle = "#ff7f7f";
			gl.lineWidth = 5;
			gl.strokeStyle = "123";
			gl.strokeRect(x, y, 200, 40);
			y += 60;

			crossMark(x, y, 200, 40);
			gl.strokeStyle = "#ff7f7f";
			gl.lineWidth = 5;
			gl.strokeStyle = 112233;
			gl.strokeRect(x, y, 200, 40);
			y += 60;

			crossMark(x, y, 200, 40);
			gl.strokeStyle = "#ff7f7f";
			gl.lineWidth = 5;
			gl.strokeStyle = "112233";
			gl.strokeRect(x, y, 200, 40);
			y += 60;

			crossMark(x, y, 200, 40);
			gl.strokeStyle = "#ff7f7f";
			gl.lineWidth = 5;
			gl.strokeStyle = "#112233";
			gl.strokeRect(x, y, 200, 40);
			y += 60;

			crossMark(x, y, 200, 40);
			gl.strokeStyle = "#ff7f7f";
			gl.lineWidth = 5;
			gl.strokeStyle = null;
			gl.strokeRect(x, y, 200, 40);
			y += 60;

			crossMark(x, y, 200, 40);
			gl.strokeStyle = "#ff7f7f";
			gl.lineWidth = 5;
			var myGradient = gl.createLinearGradient(x, y, x + 200, y + 40);
			myGradient.addColorStop(0, "#000000");
			myGradient.addColorStop(1, "#00ffff");
			gl.strokeStyle = myGradient;
			gl.strokeRect(x, y, 200, 40);
			myGradient = null;
		}
	});
	EgretTest = tests;
})(egret || (egret = {}));

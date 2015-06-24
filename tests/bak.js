
/*
 * BEGIN OF TEXTURE LOAD TESTS, COMMENT THIS LINE TO ENABLE. function
 * textureLoad1(tx) { // this MUST be with DB feature var bitmapData; var t =
 * new Date().getTime(); bitmapData =
 * tx.addTexture("resource/assets/2048x2048.png"); //egret_icon.png"); var
 * t1 = new Date().getTime() - t;
 * 
 * bitmapData.dispose();
 * 
 * var t2 = new Date().getTime(); bitmapData =
 * tx.addTexture("resource/assets/2048x2048.png"); //egret_icon.png"); var
 * t3 = new Date().getTime() - t2;
 * 
 * bitmapData.dispose();
 * 
 * console.log("********************************"); console.log("* load /
 * dispose / load") console.log("* add texture time (0): " + t1);
 * console.log("* add texture time (1): " + t3); };
 * 
 * function textureLoad2(tx) { // this MUST be with DB feature var
 * bitmapData; var t = new Date().getTime(); bitmapData =
 * tx.addTexture("resource/assets/2048x2048.png"); //egret_icon.png"); var
 * t1 = new Date().getTime() - t;
 * 
 * bitmapData.dispose();
 * 
 * var t2 = new Date().getTime(); bitmapData.reload(); var t3 = new
 * Date().getTime() - t2;
 * 
 * bitmapData.dispose();
 * 
 * console.log("********************************"); console.log("* load /
 * dispose / reload") console.log("* add texture time (0): " + t1);
 * console.log("* add texture time (1): " + t3); };
 * 
 * function textureLoad3(tx) { // this MUST be with DB feature // this MUST
 * be with PromiseObject!! var bitmapData; var promise = new
 * egret.PromiseObject(); var t; promise.onSuccessFunc =
 * function(bitmapData) { var t1 = new Date().getTime() - t;
 * 
 * bitmapData.dispose();
 * 
 * var t2 = new Date().getTime(); bitmapData.reload(); var t3 = new
 * Date().getTime() - t2;
 * 
 * bitmapData.dispose();
 * 
 * console.log("********************************"); console.log("* loadAsync /
 * dispose / reload") console.log("* add texture time (0): " + t1);
 * console.log("* add texture time (1): " + t3); } promise.onErrorFunc =
 * function() { console.log("Error found."); };
 * 
 * t = new Date().getTime(); if (tx.addTextureAsyn) {
 * console.log("tx.addTextureAsyn is existed!"); } else {
 * console.log("tx.addTextureAsyn is NOT existed!!"); }
 * tx.addTextureAsyn("resource/assets/2048x2048.png", promise); }; // END OF
 * TEXTURE LOAD TESTS
 */

var textureIcon = null;
var invalidTexture;
// var my_gradient;
egret.egtMain = function() {
	console.log("********************************");
	console.log("* Launch mode: " + egret.engine_name());
	console.log("*     Version: " + egret.getVersion());
	console.log("********************************");

	egret.setDesignSize(screenSize.width, screenSize.height);
	egret.Graphics.setTransform(1, 0, 0, 1, 0, 0);
	// textureLoad2(egret_native.Texture);
	// egret.setFrameRate(60);
	egret.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "");
	var promise = new egret.PromiseObject();
	var url = "http://wiki.corp.egret.com/static/egret_icon.png";
	// var url =
	// "http://qqgameplatcdn.qq.com/social_hall/face_icon/30123-1.png";
	promise.onSuccessFunc = function() {
		console.log("download texture: ok, verify: " + egret.isFileExists(url));
		textureIcon = egret.Texture.addTexture(url);
	};
	promise.onErrorFunc = function() {
		console.log("download texture ERROR");
		// textureIcon = null;
	};
	// textureIcon =
	// egret.Texture.addTexture("resource/assets/egret_icon.png");
	egret.download(url, url, promise);
};

var glDrawCross = function(gl, x, y, size) {
	gl.beginPath();
	gl.moveTo(x - size / 2, y);
	gl.lineTo(x + size / 2, y);
	gl.moveTo(x, y - size / 2);
	gl.lineTo(x, y + size / 2);
	gl.stroke();
};

var glDrawGrid = function(gl, width, height, size, color) {
	var i, c = gl.strokeStyle;
	gl.strokeStyle = color;
	gl.beginPath();
	gl.lineWidth = 1;
	for (i = 0; i < width; i += size) {
		gl.moveTo(i, 0);
		gl.lineTo(i, height);
	}
	for (i = 0; i < height; i += size) {
		gl.moveTo(0, i);
		gl.lineTo(width, i);
	}
	gl.stroke();
	gl.beginPath();
	gl.strokeStyle = c;
};

function gl_test_simpleLoop(AdvancedTime) {
	var gl = egret.rastergl;
	var t = egret.Label;
	var w = 200, h = 100;
	var x = 0, y = 0;
	var r = 150;
	egret.Graphics.clearScreen(0, 0, 40);
	// Raster GL
	// glDrawGrid(gl, screenSize.width, screenSize.height, 20, "#7FFF00FF");

	// 自动闭合的三角形
	gl.beginPath();
	gl.strokeStyle = "#00FF00";
	gl.moveTo(0, 0);
	gl.lineTo(100, 100);
	// gl.lineTo(100,0);
	// gl.closePath(); // *
	gl.stroke();
	// gl.fillStyle="#7fcccccc";
	// gl.fill();

	// Text
	// var txtHello = "Hello, world!";
	// t.setTextColor(0xffff00);
	// var txtSize = t.getTextSize(txtHello);
	// x = x0 + w/2;
	// y = y0 + h/2;
	// x -= txtSize[0]/2;
	// t.drawText(txtHello, x, y-2);
};

function gl_test_mainloop(advancedTime) {
	var gl = egret.rastergl;
	var g = egret.Graphics;
	var t = egret.Label;
	var w = 50, h = 100;
	var x = 0, y = 0;
	var r = 150;
	// clear screen
	egret.Graphics.clearScreen(0, 0, 40);

	glDrawGrid(gl, screenSize.width, screenSize.height, 20, "#7FFF00FF");

	// Raster GL
	gl.lineWidth = 1;
	// 自动闭合的三角形
	gl.beginPath();
	gl.strokeStyle = "#00FF00";
	gl.moveTo(x, y);
	gl.lineTo(x, y + 100);
	gl.lineTo(x + 100, y + 100);
	gl.closePath(); // *
	gl.stroke();
	gl.fillStyle = "#7f1c1c1c";
	gl.fill();

	// 线性渐变填充
	// var my_gradient = egret.rastergl.createLinearGradient(0,0,0,100);
	// my_gradient.addColorStop(0, "#7fFFFF00");
	// my_gradient.addColorStop(1, "#ff00FFFF");
	// gl.beginPath();
	// gl.fillStyle = my_gradient;
	// gl.fillRect(x0,10,w,h);

	// 坐标变换
	// 原始位置
	gl.beginPath();
	gl.strokeStyle = "#FFFFFF";
	glDrawCross(gl, 100, 100, 20);

	// 平移
	gl.beginPath();
	gl.strokeStyle = "#FFFF00";
	gl.translate(10, 10, 0);
	glDrawCross(gl, 100, 100, 20);

	// 旋转
	gl.beginPath();
	gl.strokeStyle = "#FF0000";
	gl.moveTo(100, 100);
	gl.rotate(45 * DEG2ARC);
	glDrawCross(gl, 100, 100, 20);

	// 缩放
	gl.beginPath();
	gl.strokeStyle = "#0000FF";
	gl.scale(4, 2, 1.0);
	glDrawCross(gl, 100, 100, 20);

	// 重置坐标变换
	// gl.beginPath();
	egret.Graphics.setTransform(1, 0, 0, 1, 0, 0);

	// 绘制弧度
	x = 360;
	y = 340;
	r = 150;
	gl.beginPath();
	gl.strokeStyle = "#00FF00";
	gl.moveTo(x, y);
	gl.arc(x, y, r, 15 * DEG2ARC, 270 * DEG2ARC, true);
	gl.lineTo(x, y);
	x -= 20;
	y += 20;
	gl.moveTo(x, y);
	gl.arc(x, y, r, 15 * DEG2ARC, 270 * DEG2ARC, false);
	gl.lineTo(x, y);
	gl.stroke();

	// 绘制矩形
	gl.beginPath();
	gl.strokeStyle = "#0000FF";
	gl.rect(40, 240, 50, 80);
	gl.stroke();

	// strokeRect
	gl.beginPath();
	gl.lineWidth = 3;
	gl.strokeStyle = "#eecc00";
	gl.strokeRect(140, 20, w, h);

	// lineCap "butt", "round", "square" (default "butt")
	function glLineCap(glx, x, y, x1, y1, optionalCap) {
		glx.beginPath();
		if (optionalCap) {
			glx.lineCap = optionalCap;
		}
		;
		glx.moveTo(x, y);
		glx.lineTo(x1, y1);
		glx.stroke();
	}
	;
	gl.strokeStyle = "#9933ff";
	gl.lineWidth = 5;
	x = 220;
	y = 10;
	glLineCap(gl, x, y, x + 100, y, false);
	glLineCap(gl, x, y + 20, x + 100, y + 40, "butt");
	glLineCap(gl, x, y + 40, x + 100, y + 80, "round");
	glLineCap(gl, x, y + 60, x + 100, y + 120, "square");

	// lineJoin "round", "bevel", "miter" (default "miter")
	function glLineJoin(glx, x, y, w, h, optionalJoin) {
		glx.beginPath();
		if (optionalJoin) {
			glx.lineJoin = optionalJoin;
		}
		;
		glx.moveTo(x, y);
		glx.lineTo(x + w, y + h / 2);
		glx.lineTo(x, y + h);
		glx.stroke();
	}
	;
	x = 40;
	y = 140;
	gl.strokeStyle = "#FFFFFF";
	gl.lineWidth = 5;
	glLineJoin(gl, x, y, 80, 60, false);
	glLineJoin(gl, x + 40, y, 100, 60, "round");
	glLineJoin(gl, x + 80, y, 120, 60, "bevel");
	glLineJoin(gl, x + 120, y, 140, 60, "miter");

	// miterLimit
	function glMiterLimit(glx, x, y, w, h, limitValue, optionalJoin) {
		glx.beginPath();
		if (optionalJoin) {
			glx.lineJoin = optionalJoin;
		}
		;
		glx.miterLimit = limitValue;
		glx.moveTo(x, y);
		glx.lineTo(x + w, y + h / 2);
		glx.lineTo(x, y + h);
		glx.stroke();

	}
	;
	gl.strokeStyle = "#aaffaa";
	gl.lineWidth = 5;
	x = 400;
	y = 10;
	glMiterLimit(gl, x, y, 60, 20, 10, "miter");
	glMiterLimit(gl, x, y + 40, 60, 20, 2, "miter");
	glMiterLimit(gl, x, y + 80, 60, 20, 10, "round");
	glMiterLimit(gl, x, y + 120, 60, 20, 2, "round");

	// quadraticCurveTo
	function glQuadraticCurveTo(glx, x0, y0, xc, yc, x1, y1) {
		var c = glx.strokeStyle;
		glx.beginPath();
		glx.strokeStyle = "#ff1c00";
		glx.moveTo(x0, y0);
		glx.lineTo(xc, yc);
		glx.lineTo(x1, y1);
		glx.stroke();

		glx.beginPath();
		glx.strokeStyle = "#99cccc";
		glx.moveTo(x0, y0);
		glx.quadraticCurveTo(xc, yc, x1, y1);
		glx.stroke();
	}
	;
	x = 40;
	y = 480;
	gl.lineWidth = 1;
	gl.strokeStyle = "#99cccc";
	glQuadraticCurveTo(gl, x, y, x, y + 80, x + 240, y + 60);

	// bezierCurveTo
	function glBezierCurveTo(glx, x0, y0, xc0, yc0, xc1, yc1, x1, y1) {
		var c = glx.strokeStyle;
		glx.beginPath();
		glx.strokeStyle = "#ff1c00";
		glx.moveTo(x0, y0);
		glx.lineTo(xc0, yc0);
		glx.lineTo(xc1, yc1);
		glx.lineTo(x1, y1);
		glx.stroke();

		glx.beginPath();
		glx.strokeStyle = "#99cccc";
		glx.moveTo(x0, y0);
		glx.bezierCurveTo(xc0, yc0, xc1, yc1, x1, y1);
		glx.stroke();
	}
	x = 40;
	y = 580;
	gl.lineWidth = 1;
	gl.strokeStyle = "#99cccc";
	glBezierCurveTo(gl, x, y, x + 10, y + 80, x + 240, y + 100, x + 240, y + 10);

	/*
	 * 
	 * //////////////////////////////////////////////////////// //
	 * http://www.w3cschool.cc/tags/ref-canvas.html
	 * //////////////////////////////////////////////////////// // 颜色、样式和阴影 // *
	 * 属性 v fillStyle
	 * 设置或返回用于填充绘画的颜色、渐变或模式。http://www.w3cschool.cc/tags/canvas-fillstyle.html
	 * v strokeStyle
	 * 设置或返回用于笔触的颜色、渐变或模式。http://www.w3cschool.cc/tags/canvas-strokestyle.html
	 * shadowColor
	 * 设置或返回用于阴影的颜色。http://www.w3cschool.cc/tags/canvas-shadowcolor.html
	 * shadowBlur 设置或返回用于阴影的模糊级别。 shadowOffsetX 设置或返回阴影与形状的水平距离。
	 * shadowOffsetY 设置或返回阴影与形状的垂直距离。 // * 方法 v createLinearGradient()
	 * 创建线性渐变（用在画布内容上）。 createPattern() 在指定的方向上重复指定的元素。
	 * createRadialGradient() 创建放射状/环形的渐变（用在画布内容上）。 v addColorStop()
	 * 规定渐变对象中的颜色和停止位置。 // 线条样式 // * 属性 lineCap 设置或返回线条的结束端点样式。 lineJoin
	 * 设置或返回两条线相交时，所创建的拐角类型。 lineWidth 设置或返回当前的线条宽度。 miterLimit 设置或返回最大斜接长度。 //
	 * 矩形 // * 方法 v rect() 创建矩形。 v fillRect() 绘制"被填充"的矩形。 strokeRect()
	 * 绘制矩形（无填充）。 clearRect() 在给定的矩形内清除指定的像素。 // 路径 // * 方法 v fill()
	 * 填充当前绘图（路径）。 v stroke() 绘制已定义的路径。 v beginPath() 起始一条路径，或重置当前路径。 v
	 * moveTo() 把路径移动到画布中的指定点，不创建线条。 v closePath() 创建从当前点回到起始点的路径。 v
	 * lineTo() 添加一个新点，然后在画布中创建从该点到最后指定点的线条。 // clip() 从原始画布剪切任意形状和尺寸的区域。
	 * quadraticCurveTo() 创建二次贝塞尔曲线。 bezierCurveTo() 创建三次贝塞尔曲线。 v arc()
	 * 创建弧/曲线（用于创建圆形或部分圆）。 //arcTo() 创建两切线之间的弧/曲线。 isPointInPath()
	 * 如果指定的点位于当前路径中，则返回 true，否则返回 false。 // 转换 // * 方法 v scale()
	 * 缩放当前绘图至更大或更小。 v rotate() 旋转当前绘图。 v translate() 重新映射画布上的 (0,0) 位置。
	 * transform() 替换绘图的当前转换矩阵。 // setTransform() 将当前转换重置为单位矩阵。然后运行
	 * transform()。 // 文本 // * 属性 font 设置或返回文本内容的当前字体属性。 textAlign
	 * 设置或返回文本内容的当前对齐方式。 textBaseline 设置或返回在绘制文本时使用的当前文本基线。 // * 方法
	 * fillText() 在画布上绘制"被填充的"文本。 strokeText() 在画布上绘制文本（无填充）。 measureText()
	 * 返回包含指定文本宽度的对象。 // 图像绘制 // * 方法 drawImage() 向画布上绘制图像、画布或视频。 // 像素操作 // *
	 * 属性 width 返回 ImageData 对象的宽度。 height 返回 ImageData 对象的高度。 data
	 * 返回一个对象，其包含指定的 ImageData 对象的图像数据。 // * 方法 createImageData() 创建新的、空白的
	 * ImageData 对象。 getImageData() 返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据。
	 * putImageData() 把图像数据（从指定的 ImageData 对象）放回画布上。 // 合成 // * 属性
	 * globalAlpha 设置或返回绘图的当前 alpha 或透明值。 globalCompositeOperation
	 * 设置或返回新图像如何绘制到已有的图像上。 // 其他 // * 方法 //save() 保存当前环境的状态。 //restore()
	 * 返回之前保存过的路径状态和属性。 createEvent() getContext() toDataURL()
	 * 
	 */

	// ////////////////////////////////////////////////
	// *
	// Graphics 绘图
	g.lineStyle(10, 0xffff00);// (thickness, color);
	g.beginFill(0xff0000, 0.5);
	g.moveTo(x0, y0);
	g.lineTo(x0, y0 + h);
	g.lineTo(x0 + w, y0 + h);
	g.lineTo(x0 + w, y0);
	g.lineTo(x0, y0);
	g.endFill();

	// Text
	var txtHello = "Hello, world!";
	t.setTextColor(0xffff00);
	var txtSize = t.getTextSize(txtHello);
	x = x0 + w / 2;
	y = y0 + h / 2;
	x -= txtSize[0] / 2;
	t.drawText(txtHello, x, y - 2);

	// Texture
	if (textureIcon != null) {
		g.setGlobalColorTransformEnabled(true);
		g.setTransform(1, 0, 0, 1, 0, 0);
		g.drawImage(textureIcon, 0, 0, 218, 295, x0, y0 + h + 10, 218, 295);
	}
	;
	// */

	// FPS
	fps.shift();
	fps[9] = Math.round(1000 / advancedTime);
	cntT += advancedTime;
	if (cntT > 500) {
		cntT = 0;
		afps = 0;
		for ( var i = 0; i < 10; i++)
			afps += fps[i];
		afps /= 10;
		afps = Math.round(afps * 10) / 10;
		// gc();
		// console.log("FPS: " + afps);
	}
	g.setGlobalAlpha(0.5);
	t.setTextColor(0xffffff);
	t.drawText("FPS:" + afps, 5, 13);
	g.setGlobalAlpha(1);

	var d = advancedTime / 30;
	x0 += sx * d;
	y0 += sy * d;
	if (x0 > screenSize.width - w) {
		sx = -sx;
		x0 = screenSize.width - w;
	}
	if (x0 < 0) {
		sx = -sx;
		x0 = 0;
	}
	if (y0 > screenSize.height - h - 295 - 10) {
		sy = -sy;
		y0 = screenSize.height - h - 295 - 10;
	}
	if (y0 < 0) {
		sy = -sy;
		y0 = 0;
	}
};



(function() {

	var QUnit = {};

	/**
	 * Config object: Maintain internal state Later exposed as QUnit.config
	 * `config` initialized at top of scope
	 */
	var config = {
		// The queue of tests to run
		queue : [],

		// block until document ready
		blocking : true,

		// by default, run previously failed tests first
		// very useful in combination with "Hide passed tests" checked
		reorder : true,

		// by default, modify document.title when suite is done
		altertitle : true,

		// by default, scroll to top of the page when suite is done
		scrolltop : true,

		// when enabled, all tests must call expect()
		requireExpects : false,

		// depth up-to which object will be dumped
		maxDepth : 5,

		// add checkboxes that are persisted in the query-string
		// when enabled, the id is set to `true` as a `QUnit.config` property
		urlConfig : [
				{
					id : "hidepassed",
					label : "Hide passed tests",
					tooltip : "Only show tests and assertions that fail. Stored as query-strings."
				},
				{
					id : "noglobals",
					label : "Check for Globals",
					tooltip : "Enabling this will test if any test introduces new properties on the "
							+ "`window` object. Stored as query-strings."
				},
				{
					id : "notrycatch",
					label : "No try-catch",
					tooltip : "Enabling this will run tests outside of a try-catch block. Makes debugging "
							+ "exceptions in IE reasonable. Stored as query-strings."
				} ],

		// Set of all modules.
		modules : [],

		// The first unnamed module
		currentModule : {
			name : "",
			tests : []
		},

		callbacks : {}
	};
	// Push a loose unnamed module to the modules collection
	config.modules.push( config.currentModule );

})();




var egretTest;
// 
(function(egretTest) {

	function EgretTest(objEgret) {
		this._egret = objEgret;
		// this.Promise = {};
	}
	;

	EgretTest.prototype.looper = {
		_autoStart : false,
		register : function(callback) {
			/**
			 * register a new action This function will add this function into
			 * main loop
			 * 
			 * @return: assignment_id
			 */
		},
		unregister : function(id) {
			/**
			 * remove a registered action based on id assigned by function
			 * 'register'.
			 */
		},
		clean : function() {
			/**
			 * clean the loop queue.
			 */
		},
		start : function() {
			/**
			 * start the animation
			 */
			this._autoStart = true;
			// TODO: load from the TOOD queue
		},
		pause : function() {
			/**
			 * pause the animation
			 */
		},
		onStart : function(callback) {
			/**
			 * callback when main loop is about to start
			 */
		},
		onFrameBegin : function(callback) {
			/**
			 * callback when a new frame arrives
			 */
		},
		onFrameEnd : function(callback) {
			/**
			 * callback when all the actions in current frame are finished
			 */
		}
	};

	function Assert(testContent) {
		this.test = testContent;
	}
	;

	EgretTest.assert = Assert.prototype = {
		push : function() {
		},
		ok : function() {
		},
		notOk : function() {
		},
		equal : function() {
		},
		notEqual : function() {
		},
		propEqual : function() {
		},
		notPropEqual : function() {
		},
		deepEqual : function() {
		},
		notDeepEqual : function() {
		},
		strictEqual : function() {
		},
		notStrictEqual : function() {
		},
		"throws" : function() {
		}
	};

	EgretTest.prototype.test = {
		_autoTest : false,
		before : function(callback) {
		},
		run : function() {
			this._autoTest = true;
			// TODO: load all the tests in TODO queue.
		},
		after : function(callback) {
			/**
			 * callback after each tests is done
			 */
		}
	};

	EgretTest.test = function(message, callback_assert) {
		/**
		 * test(message, callback_assert) 添加一个测试. 测试内部可以向loop注册n个动作
		 */
	};
})(egretTest || (egretTest = {}));

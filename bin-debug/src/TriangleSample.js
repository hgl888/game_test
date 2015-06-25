var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TriangleSample = (function (_super) {
    __extends(TriangleSample, _super);
    function TriangleSample() {
        //this.pgame = new egret_native.TriangleSample();
        _super.apply(this, arguments);
        this._spinDirection = -1.0;
    }
    Object.defineProperty(TriangleSample.prototype, "TriangleSample", {
        get: function () {
            if (!this._graphics) {
                this._graphics = new createjs.Graphics();
                this.needDraw = true;
            }
            return this._graphics;
        },
        enumerable: true,
        configurable: true
    });
    TriangleSample.prototype.initialize = function () {
        //var vec2 = new egret_native.Vector2( 10, 10 );
        //var bool = vec2.isZero();
        var width = 480 / 800;
        var height = 1;
        this._worldViewProjectionMatrix = new egret3d.EGMatrix();
        egret3d.EGMatrix.createOrthographic( width, height, -1, 1, this._worldViewProjectionMatrix);
        var mesh = this.createTriangleMesh();
        this._model = egret3d.Model.create( mesh );
        this._model.setMaterial("res/shaders/colored.vert", "res/shaders/colored.frag", "VERTEX_COLOR");
        //this.pgame.initialize();
        //var material =  this._model.getMaterial();
        //material.test();
        this.materialPara = this._model.getMaterial().getParameter("u_worldViewProjectionMatrix");
        egret.Ticker.getInstance().register( this._render_1, this );
    };
    TriangleSample.prototype.createTriangleMesh = function() {
        var a = 0.5;
        var arr=[
            0.0, a / Math.sqrt( 3.0),           0, 1, 0, 0,
            -a / 2.0, -a/( 2.0 * Math.sqrt(3)), 0, 0, 1, 0,
            a / 2.0,  -a/(2.0*Math.sqrt(3)),    0, 0, 0, 1
        ];
        var vertextCount = 3;
        var ele1= new egret3d.VertexFormat.Element(1, 3);
        ele1.test();
        var ele2 = new egret3d.VertexFormat.Element(3, 3);
        var elements =[ ele1, ele2 ];
        var eleFormat = new egret3d.VertexFormat( elements, 2 );
        var mesh = egret3d.Mesh.createMesh( eleFormat, vertextCount, false );
        mesh.setPrimitiveType( 4 );
        mesh.setVertexData( arr, 0, vertextCount );
        return mesh;
    }
    TriangleSample.prototype.finalize = function () {
        this.pgame.finalize();
        egret.Ticker.getInstance().unregister( this._render_1, this );
    };

    TriangleSample.prototype.update  = function( elapsedTime) {
        this._worldViewProjectionMatrix.rotateZ(this._spinDirection * egret3d.MATH_PI * elapsedTime * 0.001 );
    }

    TriangleSample.prototype._render_1 = function ( dt )
    {
       //console.log( "----" + this.pgame.num );

       //var material =  this._model.getMaterial();
       // material.test();
       // var para = material.getParameter("u_worldViewProjectionMatrix");
       // para.setValue( this._worldViewProjectionMatrix);
        this.update( dt );
        this.materialPara.setValue( this._worldViewProjectionMatrix);
        this._model.draw();
       //this.pgame.update( dt );
       //this.pgame.render( dt );
    };

    TriangleSample.prototype.onTouchesBegin = function()
    {
        this._spinDirection *= -1.0;
        console.log("-------------->" + this._spinDirection );
    }

    TriangleSample.prototype.onTouchesEnd = function() {

    }

    return TriangleSample;
})(egret.DisplayObject);
TriangleSample.prototype.__class__ = "TriangleSample";

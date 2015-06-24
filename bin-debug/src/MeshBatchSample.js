var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MeshBatchSample = (function (_super) {
    __extends(MeshBatchSample, _super);
    function MeshBatchSample() {
        _super.apply(this, arguments);
        this._vertices = new Array( );

    }

    Object.defineProperty(MeshBatchSample.prototype, "MeshBatchSample", {
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
    MeshBatchSample.prototype.initialize = function () {

        var width = 480 / 800;
        var height = 1;
        this._worldViewProjectionMatrix = new egret_native.EGMatrix();
        egret_native.EGMatrix.createOrthographic( width, height, -1, 1, this._worldViewProjectionMatrix);
        var mesh = this.createTriangleMesh();
        this._model = egret_native.Model.create( mesh );
        this._model.setMaterial("res/shaders/colored.vert", "res/shaders/colored.frag", "VERTEX_COLOR");

        this.materialPara = this._model.getMaterial().getParameter("u_worldViewProjectionMatrix");
        egret.Ticker.getInstance().register( this._render_1, this );
    };

    MeshBatchSample.prototype.createMaterial = function() {
        var material = egret_native.Material.create( "res/shaders/colored.vert", "res/shaders/colored.frag", "VERTEX_COLOR");
        material.getStateBlock();
        return material;
    }

    MeshBatchSample.prototype.createTriangleMesh = function( primitiveType) {
        var material = this.createMaterial();
        var vertextCount = 3;
        var ele1= new egret_native.VertexFormat.Element(1, 3);
        var ele2 = new egret_native.VertexFormat.Element(3, 3);
        var elements =[ ele1, ele2 ];
        var eleFormat = new egret_native.VertexFormat( elements, 2 );
        var mesh = egret_native.Mesh.createMesh( eleFormat, vertextCount, false );
        //mesh.setPrimitiveType( 4 );
        //mesh.setVertexData( arr, 0, vertextCount );
        var meshBatch = egret_native.MeshBatch.create( eleFormat, primitiveType, material, false );
        return meshBatch;
    }
    MeshBatchSample.prototype.finalize = function () {
        egret.Ticker.getInstance().unregister( this._render_1, this );
    };

    MeshBatchSample.prototype._render_1 = function ( dt )
    {
        this.materialPara.setValue( this._worldViewProjectionMatrix);
        this._model.draw();

    };

    return MeshBatchSample;
})(egret.DisplayObject);
MeshBatchSample.prototype.__class__ = "MeshBatchSample";

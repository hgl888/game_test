var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MeshPrimitiveSample = (function (_super) {
    __extends(MeshPrimitiveSample, _super);
    function MeshPrimitiveSample() {
        _super.apply(this, arguments);
        this._touchPoint = new egret3d.Vector2();
        this._tilt = new egret3d.Vector2();
    }
    Object.defineProperty(MeshPrimitiveSample.prototype, "MeshPrimitiveSample", {
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

    MeshPrimitiveSample.prototype.createTriangleMesh = function() {
        var a = 0.25;
        var arr= [
            0.0,       a / Math.sqrt( 3.0),     0, 1, 0, 0,
            -a / 2.0, -a/(2.0*Math.sqrt(3)),    0, 0, 1, 0,
            a / 2.0,  -a/(2.0*Math.sqrt(3)),    0, 0, 0, 1
        ];
        var vertextCount = 3;
        var ele1 = new egret3d.VertexFormat.Element(egret3d.VertexFormat.POSITION, 3);
        var ele2 = new egret3d.VertexFormat.Element(egret3d.VertexFormat.COLOR, 3);
        var elements =[ ele1, ele2 ];
        var eleFormat = new egret3d.VertexFormat( elements, 2 );
        var mesh = egret3d.Mesh.createMesh( eleFormat, vertextCount, false );
        mesh.setPrimitiveType( egret3d.Mesh.TRIANGLES );
        mesh.setVertexData( arr, 0, vertextCount );
        return mesh;
    };

    MeshPrimitiveSample.prototype.createTriangleStripMesh = function() {
        var scale = 0.2;
        var vertexCount = 20;
        var vertices = [];
        var x = -0.2;
        var y = -0.05;
        var step = Math.abs(x)* 2.0 / vertexCount;
        for( var i = 0; i < vertexCount; ++i)
        {
            vertices.push(x);
            vertices.push(y + egret3d.MATH_RANDOM_MINUS1_1() * scale );
            vertices.push(egret3d.MATH_RANDOM_MINUS1_1() * scale * 2 );
            vertices.push(egret3d.MATH_RANDOM_0_1());
            vertices.push(egret3d.MATH_RANDOM_0_1());
            vertices.push(egret3d.MATH_RANDOM_0_1());
            x += step;
            y *= -1.0;
        }

        var ele1 = new egret3d.VertexFormat.Element( egret3d.VertexFormat.POSITION, 3 );
        var ele2 = new egret3d.VertexFormat.Element( egret3d.VertexFormat.COLOR, 3 );
        var elements = [ele1, ele2 ];
        var eleFormat = new egret3d.VertexFormat( elements, 2);
        var mesh = egret3d.Mesh.createMesh(eleFormat, vertexCount, false );
        mesh.setPrimitiveType( egret3d.Mesh.TRIANGLE_STRIP);
        mesh.setVertexData( vertices, 0, vertexCount );
        return mesh;
    };

    MeshPrimitiveSample.prototype.createLineStripMesh = function() {
        var a = 0.1;
        var vertices = [
            0,  0,  0, 1, 0, 0,
            a,  0, -a, 0, 1, 0,
            0, -a,  a, 0, 0, 1,
            -a, 0, -a, 1, 0, 1,
             0, a,  a, 0, 1, 1
        ];

        var vertexCount = 5;
        var ele1 = new egret3d.VertexFormat.Element( egret3d.VertexFormat.POSITION, 3 );
        var ele2 = new egret3d.VertexFormat.Element( egret3d.VertexFormat.COLOR, 3 );
        var elements = [ele1, ele2 ];
        var eleFormat = new egret3d.VertexFormat( elements, 2);
        var mesh = egret3d.Mesh.createMesh(eleFormat, vertexCount, false );
        mesh.setPrimitiveType( egret3d.Mesh.LINE_STRIP);
        mesh.setVertexData( vertices, 0, vertexCount );
        return mesh;
    };

    MeshPrimitiveSample.prototype.createLinesMesh = function() {
        var scale = 0.2;
        var vertexCount = 40;
        var vertices = [];
        for( var i = 0; i < vertexCount; ++i )
        {
            vertices.push( egret3d.MATH_RANDOM_MINUS1_1() * scale);
            vertices.push( egret3d.MATH_RANDOM_MINUS1_1() * scale);
            vertices.push( egret3d.MATH_RANDOM_MINUS1_1() * scale);
            vertices.push( egret3d.MATH_RANDOM_0_1());
            vertices.push( egret3d.MATH_RANDOM_0_1());
            vertices.push( egret3d.MATH_RANDOM_0_1());
        }
        var ele1 = new egret3d.VertexFormat.Element( egret3d.VertexFormat.POSITION, 3 );
        var ele2 = new egret3d.VertexFormat.Element( egret3d.VertexFormat.COLOR, 3 );
        var elements = [ele1, ele2 ];
        var eleFormat = new egret3d.VertexFormat( elements, 2);
        var mesh = egret3d.Mesh.createMesh(eleFormat, vertexCount, false );
        mesh.setPrimitiveType( egret3d.Mesh.LINES);
        mesh.setVertexData( vertices, 0, vertexCount );
        return mesh;
    };

    MeshPrimitiveSample.prototype.initialize = function () {
        this._font = egret3d.Font.create( "res/ui/arial.gpb" );
        var width = egret3d.getWidth() / egret3d.getHeight();
        var height = 1;
        this._viewProjectionMatrix = new egret3d.EGMatrix();
        egret3d.EGMatrix.createOrthographic( width, height, -1, 1, this._viewProjectionMatrix);

        var triangleMesh = this.createTriangleMesh();
        this._triangles = egret3d.Model.create( triangleMesh );
        triangleMesh.release();
        this._triangles.setMaterial( "res/shaders/colored.vert", "res/shaders/colored.frag", "VERTEX_COLOR" );

        var triangleStripMesh = this.createTriangleStripMesh();
        this._triangleStrip = egret3d.Model.create( triangleStripMesh );
        triangleStripMesh.release();
        var material = this._triangleStrip.setMaterial( "res/shaders/colored.vert", "res/shaders/colored.frag", "VERTEX_COLOR" );
        material.getStateBlock().setDepthTest( true );
        material.getStateBlock().setDepthWrite( true );

        var lineStripMesh = this.createLineStripMesh();
        this._lineStrip = egret3d.Model.create( lineStripMesh );
        lineStripMesh.release();
        this._lineStrip.setMaterial( "res/shaders/colored.vert", "res/shaders/colored.frag", "VERTEX_COLOR" );

        var lineMesh = this.createLinesMesh();
        this._lines = egret3d.Model.create( lineMesh );
        lineMesh.release();
        this._lines.setMaterial( "res/shaders/colored.vert", "res/shaders/colored.frag", "VERTEX_COLOR" );

        //////////
        egret.Ticker.getInstance().register( this._render_1, this );
    };

    MeshPrimitiveSample.prototype.finalize = function () {
        this._triangles.release();
        this._triangleStrip.release();
        this._lineStrip.releaase();
        this._lines.release();
        this._points.release();
        this._font.release();

        egret.Ticker.getInstance().unregister( this._render_1, this );
    };

    MeshPrimitiveSample.prototype.update = function( elapsedTime )
    {
        if( this._touchPoint.x == -1.0 && this._touchPoint.y == -1.0 )
        {
            this._tilt.x *= Math.pow( 0.99, elapsedTime );
            this._tilt.y *= Math.pow( 0.99, elapsedTime );
        }
    }

    MeshPrimitiveSample.prototype._render_1 = function ( dt )
    {
        this.update( dt );

        var wvp = new egret3d.EGMatrix();
        wvp.rotateY( this._tilt.x * 0.01);
        wvp.rotateX( this._tilt.y * 0.01);
        egret3d.EGMatrix.multiply( wvp, this._viewProjectionMatrix, wvp );

        var m = new egret3d.EGMatrix();
        var offset = 0.5;

        m.setIdentity();
        m.translate( -offset, offset, 0 );
        egret3d.EGMatrix.multiply(m, wvp, m );
        this._triangles.getMaterial().getParameter("u_worldViewProjectionMatrix").setValue(m);
        this._triangles.draw();

        m.setIdentity();
        m.translate( 0, offset, 0 );
        egret3d.EGMatrix.multiply( m, wvp, m );
        this._triangleStrip.getMaterial().getParameter("u_worldViewProjectionMatrix").setValue(m);
        this._triangleStrip.draw();

        m.setIdentity();
        m.translate( -offset, -offset, 0 );
        egret3d.EGMatrix.multiply( m, wvp, m );
        this._lineStrip.getMaterial().getParameter("u_worldViewProjectionMatrix").setValue( m);
        this._lineStrip.draw();

        m.setIdentity();
        m.translate( 0, -offset, 0);
        egret3d.EGMatrix.multiply( m, wvp, m );
        this._lines.getMaterial().getParameter("u_worldViewProjectionMatrix").setValue( m );
        this._lines.draw();

//////////////////////////////////
        //this.materialPara.setValue( this._viewProjectionMatrix);
        //this._model.draw();
    };

    return MeshPrimitiveSample;
})(egret.DisplayObject);
MeshPrimitiveSample.prototype.__class__ = "MeshPrimitiveSample";

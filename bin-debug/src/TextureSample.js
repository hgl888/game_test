var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

////////////////////////

var TextureSample = (function (_super) {
    __extends(TextureSample, _super);
    function TextureSample() {
        _super.apply(this, arguments);
        this._touchPoint = new egret3d.Vector2();
        this._tilt = new egret3d.Vector2();

        this._vertices = [];
        this._vertices.push(0);
        this._vertices.push(50);
        this._vertices.push(0);
        this._vertices.push(egret3d.MATH_RANDOM_0_1());
        this._vertices.push(egret3d.MATH_RANDOM_0_1());
        this._vertices.push(egret3d.MATH_RANDOM_0_1());

        this._vertices.push(-50);
        this._vertices.push(-50);
        this._vertices.push(0);
        this._vertices.push(egret3d.MATH_RANDOM_0_1());
        this._vertices.push(egret3d.MATH_RANDOM_0_1());
        this._vertices.push(egret3d.MATH_RANDOM_0_1());

        this._vertices.push(50);
        this._vertices.push(-50);
        this._vertices.push(0);
        this._vertices.push(egret3d.MATH_RANDOM_0_1());
        this._vertices.push(egret3d.MATH_RANDOM_0_1());
        this._vertices.push(egret3d.MATH_RANDOM_0_1());

    }

    TextureSample.prototype.addQuadModeAndNode = function( scene, mesh ){
        var model = egret3d.Model.create( mesh );
        var node = scene.addNode();
        node.setDrawable( model);
        model.release();
        return node;
    };

    TextureSample.prototype.addQuadModeAndNode_1 = function( scene, x, y, width, height,
        s1, t1, s2, t2,){
        var mesh = egret3d.Mesh.createQuad( x, y, width, height, s1, t1, s2, t2 );
        var node = this.addQuadModeAndNode( scene, mesh );
        mesh.release();
        return node;
    };

    TextureSample.prototype.setTextureUnlitMaterial = function( model, texturePath, mipmap)
    {
        var material = model.setMaterial("res/shaders/textured.vert", "res/shaders/textured.frag");
        material.setParameterAutoBinding("u_worldViewProjectionMatrix", "WORLD_VIEW_PROJECTION_MATRIX");

        var sampler = material.getParameter("u_diffuseTexture").setValue(texturePath, mipmap);
        if (mipmap)
            sampler.setFilterMode(egret3d.Texture.LINEAR_MIPMAP_LINEAR, egret3d.Texture.LINEAR);
        else
            sampler.setFilterMode(egret3d.Texture.LINEAR, egret3d.Texture.LINEAR);
        sampler.setWrapMode(egret3.Texture.CLAMP, egret3d.Texture.CLAMP);
        material.getStateBlock().setCullFace(true);
        material.getStateBlock().setDepthTest(true);
        material.getStateBlock().setDepthWrite(true);
        return material;
    };


    TextureSample.prototype.createMaterial = function()
    {
        return egret3d.Material.create("res/shaders/colored.vert", "res/shaders/colored.frag", "VERTEX_COLOR");
    };

    TextureSample.prototype.createMeshBatch  = function( primitiveType){
        var material = this.createMaterial();
        var ele1 = new egret3d.VertexFormat.Element(egret3d.VertexFormat.POSITION, 3);
        var ele2 = new egret3d.VertexFormat.Element(egret3d.VertexFormat.COLOR, 3);
        var elements =[ ele1, ele2 ];
        var elementsCount = elements.length;
        var eleFormat = new egret3d.VertexFormat( elements, elementsCount );
        var meshBatch = egret3d.MeshBatch.create( eleFormat, primitiveType,  material, false);
        material.release();
        material = null;
        return meshBatch;
    };

    TextureSample.prototype.initialize = function () {
        this._font = egret3d.Font.create( "res/ui/arial.gpb" );

        var width = egret3d.getWidth();
        var height = egret3d.getHeight();
        this._worldViewProjectionMatrix = new egret3d.EGMatrix();
        egret3d.EGMatrix.createOrthographic( width, height, -1, 1, this._worldViewProjectionMatrix);
        this._meshBatch = this.createMeshBatch( egret3d.Mesh.TRIANGLES );

        //////////
        egret.Ticker.getInstance().register( this._render_1, this );
    };

    TextureSample.prototype.finalize = function () {
        this._font.release();
        this._meshBatch = null;

        egret.Ticker.getInstance().unregister( this._render_1, this );
    };

    TextureSample.prototype.update = function( elapsedTime )
    {

    }

    TextureSample.prototype._render_1 = function ( dt )
    {
        this.update( dt );

        this._meshBatch.start();
        this._meshBatch.add( this._vertices, this._vertices.length / 6 );
        this._meshBatch.finish();
        this._meshBatch.getMaterial().getParameter("u_worldViewProjectionMatrix").setValue(this._worldViewProjectionMatrix);
        this._meshBatch.draw();
    };

    TextureSample.prototype.addTriangle = function( x, y )
    {
        var a = egret3d.MATH_RANDOM_0_1() *  80.0 + 40.0;
        var p1 =new egret3d.Vector3( 0.0, a / Math.sqrt(3.0), 0);
        var p2 =new egret3d.Vector3(-a / 2.0, -a / (2.0 * Math.sqrt(3.0)), 0);
        var p3 =new egret3d.Vector3(a / 2.0, -a / (2.0 * Math.sqrt(3.0)), 0);

        var m = new egret3d.EGMatrix();
        m.translate( x, y, 0 );
        m.rotateZ( egret3d.MATH_RANDOM_MINUS1_1() * egret3d.MATH_PI );
        m.transformPoint( p1, p1);
        m.transformPoint( p2, p2);
        m.transformPoint( p3, p3);
        console.log("------>x:"+ p1.x + "; y:" + p1.y + "; z:" + p1.z );

        this._vertices.push(p1.x);
        this._vertices.push(p1.y);
        this._vertices.push(p1.z);
        this._vertices.push(egret3d.MATH_RANDOM_0_1());
        this._vertices.push(egret3d.MATH_RANDOM_0_1());
        this._vertices.push(egret3d.MATH_RANDOM_0_1());


        this._vertices.push(p2.x);
        this._vertices.push(p2.y);
        this._vertices.push(p2.z);
        this._vertices.push(egret3d.MATH_RANDOM_0_1());
        this._vertices.push(egret3d.MATH_RANDOM_0_1());
        this._vertices.push(egret3d.MATH_RANDOM_0_1());

        this._vertices.push(p3.x);
        this._vertices.push(p3.y);
        this._vertices.push(p3.z);
        this._vertices.push(egret3d.MATH_RANDOM_0_1());
        this._vertices.push(egret3d.MATH_RANDOM_0_1());
        this._vertices.push(egret3d.MATH_RANDOM_0_1());

        this._lastTriangleAdded = egret3d.getAbsoluteTime();

    }

    TextureSample.prototype.onTouchesBegin = function(e)
    {
        this.addTriangle(e.stageX - egret3d.getWidth() / 2, (egret3d.getHeight() / 2) - e.stageY );
    }

    TextureSample.prototype.onTouchesEnd = function(e) {

    }

    TextureSample.prototype.onTouchesMove  = function(e)
    {
        if( egret3d.getAbsoluteTime() - this._lastTriangleAdded > 20 )
        {
            this.addTriangle(e.stageX - egret3d.getWidth() / 2, (egret3d.getHeight() / 2) - e.stageY );
        }
    }

    return TextureSample;
})(egret.DisplayObject);
TextureSample.prototype.__class__ = "TextureSample";

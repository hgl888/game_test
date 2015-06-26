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

    }

    TextureSample.prototype.addQuadModeAndNode = function( scene, mesh ){
        var model = egret3d.Model.create( mesh );
        var node = scene.addNode();
        node.setDrawable( model);
        model.release();
        return node;
    };

    TextureSample.prototype.addQuadModeAndNode_1 = function( scene, x, y, width, height,
                                                             s1, t1, s2, t2 )
    {
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


    TextureSample.prototype.initialize = function () {
        this._font = egret3d.Font.create( "res/ui/arial.gpb" );
        this._scene = egret3d.Scene.create();

        var camera = egret3d.Camera.createPerspective( 45.0, egret3d.getAspectRatio(), 1, 1000);
        var cameraNode = this._scene.addNode("camera");
        cameraNode.setCamera( camera);
        this._scene.setActiveCamera( camera );
        cameraNode.translate( 0, 0, 50);
        var fontSize = 18.0;
        var cubeSzie = 10.0;

        var x = 0, y = 0, textWidth = 0;
        this._scene.getActiveCamera().project(egret3d.getViewport(), new egret3d.Vector3(cubeSize, 0, 0), x, y);
        textWidth = x - (getWidth() >> 1);
        // Textured quad mesh
        {
            var node = this.addQuadModelAndNode(this._scene, 0, 0, cubeSize, cubeSize);
            this.setTextureUnlitMaterial(node.getDrawable(), "res/png/color-wheel.png");
            node.setTranslation(-25, cubeSize, 0);
            this._scene.getActiveCamera().project(egret3d.getViewport(), node.getTranslationWorld(), x, y);
        }

        {
            var mesh = egret3d.Mesh.createQuad(new egret3d.Vector3(0, cubeSize, 0), new egret3d.Vector3(0, 0, 0), new egret3d.Vector3(cubeSize, cubeSize, 0), new egret3d.Vector3(cubeSize, 0, 0));
            node = egret3d.addQuadModelAndNode(this._scene, mesh);
            mesh.release();
            this.setTextureUnlitMaterial(node.getDrawable(), "res/png/color-wheel.png");
            node.setTranslation(-14, cubeSize, 0);
            this._scene.getActiveCamera().project(egret3d.getViewport(), node.getTranslationWorld(), x, y);
        }

        {
            node = this.addQuadModelAndNode(this._scene, 0, 0, cubeSize, cubeSize, -1, -1, 2, 2);
            this.setTextureUnlitMaterial(node.getDrawable(), "res/png/color-wheel.png");
            node.setId("clamp");
            node.setTranslation(-3, cubeSize, 0);
            this._scene.getActiveCamera().project(egret3d.getViewport(), node.getTranslationWorld(), x, y);
        }


        {
            node = this.addQuadModelAndNode(this._scene, 0, 0, cubeSize, cubeSize, -1, -1, 2, 2);
            this.setTextureUnlitMaterial(node.getDrawable(), "res/png/color-wheel.png");
            node.setId("repeat");
            var sampler = node.getDrawable().getMaterial().getParameter("u_diffuseTexture").getSampler();
            if (sampler)
            {
                sampler.setWrapMode(egret3d.Texture.REPEAT, egret3d.Texture.REPEAT);
            }
            node.setTranslation(8, cubeSize, 0);
            this._scene.getActiveCamera().project(egret3d.getViewport(), node.getTranslationWorld(), x, y);
        }

        {
            node = this.addQuadModelAndNode(this._scene, 0, 0, cubeSize, cubeSize);
            this.setTextureUnlitMaterial(node.getDrawable(), "res/png/logo.png", false);
            node.setId("mipmap off");
            node.setTranslation(-25.5, -2.5, 0);
            this._scene.getActiveCamera().project(egret3d.getViewport(), node.getTranslationWorld(), x, y);
        }


        {
            node = this.addQuadModelAndNode(this._scene, 0, 0, cubeSize, cubeSize);
            this.setTextureUnlitMaterial(node.getDrawable(), "res/png/logo.png");
            node.setId("mipmap on");
            node.setTranslation(-5.5, -2.5, 0);
            _scene.getActiveCamera().project(egret3d.getViewport(), node.getTranslationWorld(), x, y);

        }
        //////////
        egret.Ticker.getInstance().register( this._render_1, this );
    };

    TextureSample.prototype.finalize = function () {
        this._font.release();
        this._scene.release();

        egret.Ticker.getInstance().unregister( this._render_1, this );
    };

    TextureSample.prototype.update = function( elapsedTime )
    {
        var n1 = this._scene.findNode( "mipmap on");
        var n2 = this._scene.findNode( "mipmap off");
        var z = -(Math.sin((egret3d.getAbsoluteTime()/ 1500) * egret3d.MATH_PI) + 1) * 900.0 / 2.0;
        n1.setTranslationZ(z);
        n2.setTranslationZ(z);
    };

    TextureSample.prototype._render_1 = function ( dt )
    {
        this.update( dt );

        this._scene.visit( this, this.VisitDrawNode);
    };

    TextureSample.prototype.visitDrawNode( node )
    {
        var drawable = node.getDrawable();
        if( drawable )
            drawable.draw();
        return true;
    };



    TextureSample.prototype.onTouchesBegin = function(e)
    {

    };

    TextureSample.prototype.onTouchesEnd = function(e) {

    };

    TextureSample.prototype.onTouchesMove  = function(e)
    {

    };

    return TextureSample;
})(egret.DisplayObject);
TextureSample.prototype.__class__ = "TextureSample";

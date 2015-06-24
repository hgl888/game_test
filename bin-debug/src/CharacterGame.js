var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CharacterGame = (function (_super) {
    __extends(CharacterGame, _super);
    function CharacterGame() {
        _super.apply(this, arguments);
        this.NORTH = 1;
        this.SOUTH = 2;
        this.EAST = 4;
        this.WEST = 8;
        this.RUNNING = 16;
        this.WALK_SPEED = 5.0;
        this.STRAFE_SPEED = 1.5;
        this.RUN_SPEED = 15.0;
        this.CAMERA_FOCUS_DISTANCE = 16.0;
        this.BUTTON_1 = 0;
        this.BUTTON_2 = 1;
    }
    Object.defineProperty(CharacterGame.prototype, "CharacterGame", {
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

    CharacterGame.prototype.play = function(id, repeat, speed ) {
        var clip = this._animation._getClip( id );
        clip.setSpeed( speed);
        clip.setRepeatCount( repeat ? egret3d.AnimationClip.REPEAT_INDEFINITE: 1 );
        if( clip == this._curuentClip && clip.isPlaying()) {
            return;
        }
        if( this._jumpClip.isPlaying() || this._kickClip.isPlaying()){
            this._currentClip = clip;
            return;
        }

        if( this._currentClip && this._currentClip.isPlaying()){
            this._currentClip.corssFade( clip, 150 );
        }
        else{
            clip.play();
        }
        this._currentClip = clip;

    };


    CharacterGame.prototype.initializeCharacter = function() {
        var node = this._scene.findNode( "boycharacter");
        this._character = node.getCollisionObject();
        this._characterNode = node.findNode("boyScale");
        this._characterMeshNode = this._scene.findNode( "boymesh" );
        this._characterShadowNode = this._scene.findNode("boyshadow");

        this._backballNode = this._scene.findNode( "basketball" );
        this._backballNode.getCollisionObject().addCollisionListener( this);

        this._floorLevel = this._backballNode.getTranslationY();
        this._materialParameterAlpha = this._characterMeshNode.getDrawable().getmaterial().getTechniqueByIndex(0).getParameter("u_modulateAlpha");

        this._animation = node.getAnimation( "animations");
        this._animation.createClip( "res/common/boy.animation" );
        this._jumpClip = this._animation.getClip("jump");
        this._jumpClip._addListeners( this, this._jumpClip.getDuration() - 250);

        this._kickClip = this._animation.getClip( "kick" );
        this._kickClip._addListeners( this, this._kickClip.getDuration() - 250);
        this._kickClip._addListeners( this, 416 );

        this.play("idle", true, 1.0 );

    };

    CharacterGame.prototype.initialize = function () {
        //var vec2 = new egret_native.Vector2( 10, 10 );
        //var bool = vec2.isZero();

        this._font = egret3d.Font.create("res/ui/arial.gpb");
        this._scene = egret3d.Scene.load("res/common/sample.scene");
        this._scene.getActiveCamera().setAspectRation( getAspectRatio() );

        initializeCharacter();

        var ceiling = this._scene.addNode( "ceiling" );
        ceiling.setTranslationY( 14.5);
        var rbParams = new egret3d.PhysicsRigidBody.Parameters();
        rbParams.mass = 0.0;
        rbParams.friction = 0.5;
        rbParams.restitution = 0.75;
        rbParams.linearDamping = 0.025;
        rbParams.angularDamping = 0.16;
        var vec3 = egret3d.Vector3( 49.5, 1.0, 49.5);
        ceiling.setCollisioinObject( egret3d.PhysicsCollisionObject.RIGID_BODY, egret3d.PhysicsCollisionShape.box( vec3 ), rbParams);

        this._scene.visit( this, this.visitInitNode);

        this._gamepad = egret3d.getGamepad( 0);


        egret.Ticker.getInstance().register( this._render_1, this );
    };

    CharacterGame.prototype.visitInitNode = function( node )
    {
        var model = node.getDrawable();
        if( model && model.getMaterial())
        {
            initializeMaterial( this._scene, node, model.getMaterial());
        }
        return true;
    };

    CharacterGame.prototype.initializeMaterial = function( scene, node, material)
    {
        if( node.hasTag( "dynamic"))
        {
            material.getParameter("u_ambientColor").bindValue(scene, egret3d.Scene.getAmbientColor);
            var lightNode = scene.findNode( "sun");
            if ( lightNode )
            {
                material.getParameter("u_directionalLightColor[0]").bindValue( lightNode.getLight, egret3d.Light.getColor);
                material.getParameter("u_directionalLightDirection[0]").bindValue( lightNode, egret3d.Node.getForwardVectorView);

            }
        }
    };


    CharacterGame.prototype.finalize = function () {
        if( this._scene )
        {
            this._scene.release();
        }
        if( this._font )
        {
            this._font.release();
        }
        if( this._buttonPressed )
        {
            this._buttonPressed = null;
        }
        egret.Ticker.getInstance().unregister( this._render_1, this );
    };

    CharacterGame.prototype.visitDrawNode = function( node, cookie ) {
        if( node.getDrawable() && (cookie == node.hagTag( "transparent")))
        {
            node.getDrawable.draw( this._wireframe );
        }
        return true;
    };

    CharacterGame.prototype.play = function( id, repeat, speed ){
        var clip = this._animation.getClip( id);
        clip.setSpeed( speed );
        clip.setRepeatCount( repeat ? egret3d.AnimationClip.REPEAT_INDEFINITE: 1);

        if( clip == this._currentClip && clip.isPlaying())
            return;

        if( this._jumpClip.isPlaying() || this._kickClip.isPlaying())
        {
            this._currentClip = clip;
            return;
        }

        if( this._currentClip && this._currentClip.isPlaying())
        {
            this._currentClip.crossFade( clip, 150 );
        }
        else
        {
            clip.play();
        }
        this._currentClip = clip;
    };

    CharacterGame.prototype.jump = function() {
        if( isOnFloor() && !this._kickClip.isPlaying() )
        {
            play("jump", false, 0.55 );
            this._character.jump( 3.0 );
        }
    };

    CharacterGame.prototype.kick = function() {
        if( !this._jumpClip.isPlaying())
        {
            play( "kick", false, 1.75) ;
        }
        this._kicking = true;
    };

    CharacterGame.prototype.isOnFloor = function() {
        return (Math.abs( this._character.getCurrentVelocity().y) < egret3d.MATH_EPSILON);
    };

    CharacterGame.prototype.update = function( elapsedTime ){
        if( this._applyKick )
        {
            var vec3 = this._characterNode.getForwardVectorWorld();
            var impulse = new egret3d.Vector3( -vec3.x, -vec3.y, -vec3.z );
            impulse.normalize();
            impulse.y = 1.0;
            impulse.scale( 16.6);
            this._basketballNode.getCollisionObject().applyImpulse( impulse);
            this._hasBall = false;
            this._applyKick = false;
        }
        if( ! this._kickClip.isPlaying())
            this._kicking = false;
        if( this._gamepad.isButtonDown( egret3d.Gamepad.BUTTON_A ))
        {
            if( this._buttonPressed[this.BUTTON_1])
            {
                this._buttonPressed[this.BUTTON_1] = false;
                jump();
            }
        }
        else
        {
            this._buttonPressed[this.BUTTON_1] = true;
        }
        if( this._gamepad.isButtonDown( egret3d.Gamepad.BUTTON_B))
        {
            if( this._buttonPressed[this.BUTTON_2])
            {
                this._buttonPressed[this.BUTTON_2] = false;
                kick();
            }
        }
        else
        {
            this._buttonPressed[this.BUTTON_2] = true;
        }

        this._currentDirection.set( egret3d.Vector2.zero);

        if( ! this._kicking )
        {
            if( this._gamepad.getJoystickCount() > 0 )
            {
                this._gamepad.getJoystickValue( 0, this._currentDirection);
            }
        }

        if( this._gamepad.getJoystickCount() > 1)
        {
            var out = new egret3d.Vector2();
            this._gamepad.getJoystickValue( 1, out );
            this._character.getNode().rotateY( -MATH_DEG_TO_RAD(out.x * 2.0));
        }

        if( this._currentDirection.isZero )
        {
            if( this._keyFlags & this.NORTH )
                this._currentDirection.y = 1;
            else if( this._keyFlags & this.SOUTH )
                this._currentDirection. y = -1;
            else
                this._currentDirection.y = 0;

            if( this._keyFlags & this.EAST )
                this._currentDirection.x = 1;
            else if( this._keyFlags & this.WEST )
                this._currentDirection.x = -1;
            else
                this._currentDirection.x = 0;

            this._currentDirection.normalize();
            if( (this._keyFlags & this.RUNNING ) == 0)
                this._currentDirection *= 0.5;
        }

        if( this._currentDirection.isZero())
        {
            play( "idle", true );
            this._character.setVelocity( egret3d.Vector3.zero());
    }
        else
        {
            var running = ( this._currentDirection.lengthSquared() > 0.75 );
            var speed = running ? this.RUN_SPEED : this.WALK_SPEED;

            play( running ? "running" : "walking", true, 1.0 );

            var cameraMatrix = this._scene.getActiveCamera().getNode().getWorldMatrix();
            var cameraRight = new egret3d.Vector3;
            var cameraForward = new egret3d.Vector3;

            cameraMatrix.getRightVector( cameraRight );
            cameraMatrix.getForwardVector( cameraForward );
            vec3 = this._characterNode.getForwardVectorWorld();
            var currentHeading = new egret3d.Vector3( -vec3.x, -vec3.y, -vec3.z );

            cameraForward.multi( this._currentDirection.y );
            cameraRight.multi( this._currentDirection.x );
            cameraForward.add( cameraRight );
            var newHeading = new egret3d.Vector3( cameraForward);

            var angle = Math.atan2( newHeading.x, newHeading.z ) - Math.atan2( currentHeading.x, currentHeading.z );

            if(angle > egret3d.MATH_PI)
                angle -= egret3d.MATH_PIX2;
            else if( angle < -egret3d.MATH_PI )
                angle += egret3d.MATH_PIX2;

            angle *= elapsedTime * 0.001 * egret3d.MATH_PIX2;
            this._characterNode.rotate( egret3d.Vector3.unitY(), angle );

            vec3 = this._characterNode.getForwardVectorWorld();
            var velocity = new egret3d.Vector3( -vec3.x, -vec3.y, -vec3.z );
            velocity.normalize();
            velocity.multi( speed);
            this._character.setVelocity( velocity);
        }

        adjustCamera( elapsedTime );
        //-----------------------
        //todo

    };

    CharacterGame.prototype._render_1 = function ( dt )
    {
       //console.log( "----" + this.pgame.num );

       //var material =  this._model.getMaterial();
       // material.test();
       // var para = material.getParameter("u_worldViewProjectionMatrix");
       // para.setValue( this._worldViewProjectionMatrix);
        this.materialPara.setValue( this._worldViewProjectionMatrix);
        this._model.draw();

    };

    return CharacterGame;
})(egret.DisplayObject);
CharacterGame.prototype.__class__ = "CharacterGame";

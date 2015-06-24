/* BlurFragmentShader.glsl */
precision mediump float;

uniform vec2 dir;
uniform sampler2D CC_Texture0;

varying vec2 v_texCoord;

void main()
{
    gl_FragColor = vec4(0.0);
    gl_FragColor += texture2D(CC_Texture0, (v_texCoord + vec2(-0.028*dir.x, -0.028 * dir.y))) * 0.0044299121055113265;
    gl_FragColor += texture2D(CC_Texture0, (v_texCoord + vec2(-0.024*dir.x, -0.024 * dir.y))) * 0.00895781211794;
    gl_FragColor += texture2D(CC_Texture0, (v_texCoord + vec2(-0.020*dir.x, -0.020 * dir.y))) * 0.0215963866053;
    gl_FragColor += texture2D(CC_Texture0, (v_texCoord + vec2(-0.016*dir.x, -0.016 * dir.y))) * 0.0443683338718;
    gl_FragColor += texture2D(CC_Texture0, (v_texCoord + vec2(-0.012*dir.x, -0.012 * dir.y))) * 0.0776744219933;
    gl_FragColor += texture2D(CC_Texture0, (v_texCoord + vec2(-0.008*dir.x, -0.008 * dir.y))) * 0.115876621105;
    gl_FragColor += texture2D(CC_Texture0, (v_texCoord + vec2(-0.004*dir.x, -0.004 * dir.y))) * 0.147308056121;
    gl_FragColor += texture2D(CC_Texture0, v_texCoord) * 0.159576912161;
    gl_FragColor += texture2D(CC_Texture0, (v_texCoord + vec2( 0.004*dir.x,  0.004 * dir.y))) * 0.147308056121;
    gl_FragColor += texture2D(CC_Texture0, (v_texCoord + vec2( 0.008*dir.x,  0.008 * dir.y))) * 0.115876621105;
    gl_FragColor += texture2D(CC_Texture0, (v_texCoord + vec2( 0.012*dir.x,  0.012 * dir.y))) * 0.0776744219933;
    gl_FragColor += texture2D(CC_Texture0, (v_texCoord + vec2( 0.016*dir.x,  0.016 * dir.y))) * 0.0443683338718;
    gl_FragColor += texture2D(CC_Texture0, (v_texCoord + vec2( 0.020*dir.x,  0.020 * dir.y))) * 0.0215963866053;
    gl_FragColor += texture2D(CC_Texture0, (v_texCoord + vec2( 0.024*dir.x,  0.024 * dir.y))) * 0.00895781211794;
    gl_FragColor += texture2D(CC_Texture0, (v_texCoord + vec2( 0.028*dir.x,  0.028 * dir.y))) * 0.0044299121055113265;
}

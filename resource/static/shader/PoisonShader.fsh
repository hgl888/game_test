#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;
uniform sampler2D u_texture;

void main()
{
    gl_FragColor = vec4(0.9,0.45,1,1) * texture2D(u_texture, v_texCoord);
}

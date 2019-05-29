#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

void main() {
	vec4 color_map = texture2D(uSampler3, vTextureCoord);  //+  texture2D(uSampler, vTextureCoord);
	gl_FragColor = vec4(color_map.x, color_map.y, color_map.z, color_map.w);

}
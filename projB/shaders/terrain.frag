#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float height;


uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

void main() {
	vec4 color_map = texture2D(uSampler, vTextureCoord);  
	vec2 gradient = vec2(0, 1.0-height);
	vec4 gradient_color = texture2D(uSampler3, gradient);
	gl_FragColor = (color_map+gradient_color)*0.5;

}
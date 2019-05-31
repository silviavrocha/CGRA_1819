attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float timeFactor;
varying float height;


varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
	vec4 offset = texture2D(uSampler2, aTextureCoord);
	vec4 vert = vec4(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z+offset.z*10.0, 1.0);
	gl_Position = uPMatrix * uMVMatrix * vert;
	vTextureCoord=aTextureCoord;
	height=vert.b*0.1;
}


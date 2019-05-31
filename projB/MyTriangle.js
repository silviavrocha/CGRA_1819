/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			 2,-1, 0, //0
			 0,-1, 0, //1
			 0, 1, 0, //2
			 2,-1, 0, 
			 0,-1, 0,
			 0, 1, 0
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0,-1,
			0, 0,-1,
			0, 0,-1,
		]

		//Counter-clockwise reference of vertices
		this.indices = [
			1, 0, 2,
			4, 5, 3
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}


/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyQuad extends CGFobject {
	constructor(scene, scale, coords) {
		super(scene);
		this.scale=scale;
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,	//0
			this.scale, 0, 0,	//1
			0, 1, 0,	//2
			this.scale, 1, 0,		//3
			0, 0, 0,	//0
			this.scale, 0, 0,	//1
			0, 1, 0,	//2
			this.scale, 1, 0		//3
		];

		this.indices = [
			0, 1, 2,
			1, 3, 2,
			4, 6, 5,
			5, 6, 7
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
			
		];
		
		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0,
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}


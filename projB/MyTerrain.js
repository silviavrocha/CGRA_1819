class MyTerrain extends CGFobject {
	constructor(scene) {
		super(scene);
		
	this.plane=	new Plane(scene, 50)

	this.appearance = new CGFappearance(scene);
	this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
	this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
	this.appearance.setShininess(120);

	this.texture1 = new CGFtexture(scene, "images/terrain.jpg");
	this.texture2 = new CGFtexture(scene, "images/heightmap.png");
	this.texture3 = new CGFtexture(scene, "images/altimetry.png");
	this.appearance.setTexture(this.texture1);
	this.appearance.setTextureWrap('REPEAT', 'REPEAT');

	this.shader= new CGFshader(scene.gl, "shaders/terrain.vert", "shaders/terrain.frag"),
	this.shader.setUniformsValues({ uSampler: 2 });
	this.shader.setUniformsValues({ uSampler2: 1 });
	this.shader.setUniformsValues({ uSampler3: 3 });


	// shader code panels references
	this.shadersDiv = document.getElementById("shaders");
	this.vShaderDiv = document.getElementById("vshader");
	this.fShaderDiv = document.getElementById("fshader");

	}
	
	// called periodically (as per setUpdatePeriod() in init())
	update(t) {
			this.shader.setUniformsValues({ timeFactor: t / 100 % 1000 });
	}

	// main display function
	display() {
		
		// aplly main appearance (including texture in default texture unit 0)
		this.scene.pushMatrix();
		// activate selected shader
		this.scene.setActiveShader(this.shader);
		this.appearance.apply();

		this.scene.pushMatrix();

		// bind additional texture to texture unit 1
		this.texture2.bind(1);
		this.texture1.bind(2);
		this.texture3.bind(3);
	

			this.scene.pushMatrix();
			this.scene.scale(60, 1, 60);
			this.scene.rotate(-Math.PI/2, 1,0,0);
			this.plane.display();
			this.scene.popMatrix();

		this.scene.popMatrix();

		this.scene.setActiveShader(this.scene.defaultShader);
	}
}
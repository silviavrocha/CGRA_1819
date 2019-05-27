/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene, material) {
		super(scene);
		this.quad = new MyQuad(scene);
		this.texture= material;

	}
	
	display()
	{
		this.texture.apply();

		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.translate(0,0,0.5);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.5,-0.5,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.translate(0,0.5,0);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.5,-0.5,0);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.translate(0,0.5,1);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.5,-0.5,0);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.translate(-0.5,0,0);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.5,-0.5,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.translate(-0.5,0,1);
		this.quad.display();
		this.scene.popMatrix();
	}
}
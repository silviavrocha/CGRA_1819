/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene, material) {
		super(scene);
		this.top = new MyQuad(scene);
        this.bottom = new MyQuad(scene);
        this.front = new MyQuad(scene);
        this.back = new MyQuad(scene);
		this.right = new MyQuad(scene);
		this.left = new MyQuad(scene);
		this.texture= material;
		
		this.topMaterial = new CGFappearance(this.scene);
        this.topMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        this.topMaterial.setDiffuse(1.0, 1.0, 1.0, 1);
        this.topMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.topMaterial.setShininess(10.0);
        this.topMaterial.loadTexture('images/mineTop.png');
        this.topMaterial.setTextureWrap('REPEAT', 'REPEAT');
	}
	
	display()
	{
		this.texture.apply();

		this.scene.pushMatrix();
		this.scene.translate(0,0,0.5);
		this.front.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.translate(0,0,0.5);
		this.back.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.5,-0.5,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.translate(0,0.5,0);
		this.right.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.5,-0.5,0);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.translate(0,0.5,1);
		this.left.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.5,-0.5,0);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.translate(-0.5,0,0);
		this.bottom.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0.5,-0.5,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.translate(-0.5,0,1);
		this.topMaterial.apply();
		this.top.display();
		this.scene.popMatrix();
	}
}
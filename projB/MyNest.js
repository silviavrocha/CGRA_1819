/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyNest extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.yellowMaterial = new CGFappearance(this.scene);
		this.yellowMaterial.scene.setAmbient(1,1,0,1);
		this.yellowMaterial.scene.setDiffuse(1,1,0,1);
		this.yellowMaterial.scene.setSpecular(1,1,0,1);
        this.yellowMaterial.scene.setShininess(10.0);
        
		this.cube = new MyUnitCubeQuad(scene, this.yellowMaterial);
	}
	
	display()
	{
		this.scene.pushMatrix();
		this.scene.translate(5,0.5,5);
		this.cube.display();
		this.scene.popMatrix();

	}
}
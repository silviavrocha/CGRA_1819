






/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeaf extends CGFobject {
	constructor(scene) {
		super(scene);
		this.leaf= new MyTriangle(scene);
		this.leafMaterial = new CGFappearance(scene);
        this.leafMaterial.setAmbient(34/255,139/255,34/255, 1.0);
        this.leafMaterial.setDiffuse(34/255,139/255,34/255, 1.0);
        this.leafMaterial.setSpecular(34/255,139/255,34/255, 1.0);
        this.leafMaterial.setShininess(10.0);
	}
	
	display(){
		this.scene.pushMatrix();
		this.scene.scale(2,2,2);
        this.leafMaterial.apply();
        this.leaf.display();
        this.scene.popMatrix();
	}
}


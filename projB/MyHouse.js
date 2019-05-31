/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHouse extends CGFobject {
	constructor(scene) {
		super(scene);
		
		this.doorMaterial = new CGFappearance(this.scene);
        this.doorMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        this.doorMaterial.setDiffuse(1.0, 1.0, 1.0, 1);
        this.doorMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.doorMaterial.setShininess(10.0);
        this.doorMaterial.loadTexture('images/door.jpg');
		this.doorMaterial.setTextureWrap('REPEAT', 'REPEAT');
		
        this.roofMaterials = new CGFappearance(this.scene);
        this.roofMaterials.setAmbient(0.3, 0.3, 0.3, 1);
        this.roofMaterials.setDiffuse(1.0, 1.0, 1.0, 1);
        this.roofMaterials.setSpecular(1.0, 1.0, 1.0, 1);
        this.roofMaterials.setShininess(10.0);
        this.roofMaterials.loadTexture('images/roof.jpg');
        this.roofMaterials.setTextureWrap('REPEAT', 'REPEAT');

		this.colMaterials = new CGFappearance(this.scene);           //diffuse material
        this.colMaterials.setAmbient(128/255,128/255,128/255, 1.0);
        this.colMaterials.setDiffuse(128/255,128/255,128/255, 1.0);
        this.colMaterials.setSpecular(0, 0, 0, 1);
        this.colMaterials.setShininess(10.0);
        this.colMaterials.loadTexture('images/columns.jpg');
		this.colMaterials.setTextureWrap('REPEAT', 'REPEAT');
		
        this.wallMaterials = new CGFappearance(this.scene);
        this.wallMaterials.setAmbient(0.3, 0.3, 0.3, 1);
        this.wallMaterials.setDiffuse(1.0, 1.0, 1.0, 1);
        this.wallMaterials.setSpecular(1.0, 1.0, 1.0, 1);
        this.wallMaterials.setShininess(10.0);
        this.wallMaterials.loadTexture('images/wall.jpg');
		this.wallMaterials.setTextureWrap('REPEAT', 'REPEAT');
		
		this.cube = new MyUnitCubeQuad(scene, this.wallMaterials);
		this.roof = new MyPyramid(scene, 4, 8);
		this.column = new MyPrism(scene, 8, 8);
		this.door =new MyQuad(scene,1);
	}
	
	display()
	{
		this.scene.pushMatrix();
		this.scene.translate(0,0.5,0);
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/4,0,1,0);
		this.scene.scale(1.5,1,1.5);
		this.scene.translate(0,1,0);
		this.roofMaterials.apply();
		this.roof.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.2,1,0.2);
		this.scene.translate(4,0,4);
		this.colMaterials.apply();
		this.column.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.2,1,0.2);
		this.scene.translate(-4,0,4);
		this.column.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.2,1,0.2);
		this.scene.translate(-4,0,-4);
		this.column.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.scale(0.2,1,0.2);
		this.scene.translate(4,0,-4);
		this.column.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI,1,0,0);
		this.scene.rotate(Math.PI,0,0,1);
		this.scene.scale(0.5,0.8,1);
		this.scene.translate(0,0.5,0.51);
		this.doorMaterial.apply();
		this.door.display();
		this.scene.popMatrix();
	}
}
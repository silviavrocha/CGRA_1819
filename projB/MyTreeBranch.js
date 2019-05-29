/**
* MyTreeBranch
* @constructor
*/
class MyTreeBranch extends CGFobject {
    constructor(scene, x, z) {
        super(scene);
        this.cylinder= new MyCylinder(scene, 10);
        this.coordX=x;
        this.coordZ=z;

        this.trunkMaterial = new CGFappearance(scene);           
        this.trunkMaterial.setAmbient(85/255,60/255,42/255,1.0); 
        this.trunkMaterial.setDiffuse(85/255,60/255,42/255, 1.0);
        this.trunkMaterial.setSpecular(0, 0, 0, 1.0);
        this.trunkMaterial.setShininess(10.0);
        this.trunkMaterial.loadTexture('images/trunk.jpg');
        this.trunkMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

   display()
    {
        this.scene.translate(this.coordX, 0, this.coordZ);
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.2,1.2,0.2);
        this.trunkMaterial.apply();
		this.cylinder.display();
        this.scene.popMatrix();     
    }
    
}



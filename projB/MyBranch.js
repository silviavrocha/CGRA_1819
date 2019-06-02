/**
* MyBranch
* @constructor
*/
class MyBranch extends CGFobject {
    constructor(scene) {
        super(scene);
        this.branch = new MyCylinder(scene, 4);
      
        this.branchMaterial = new CGFappearance(scene);
        this.branchMaterial.setAmbient(205/256,170/256,125/256, 1.0);
        this.branchMaterial.setDiffuse(205/256,170/256,125/256, 1.0);
        this.branchMaterial.setSpecular(205/256,170/256,125/256, 1.0);
        this.branchMaterial.setShininess(10.0);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(0.25,0.5,0.25);
        this.branchMaterial.apply();
        this.branch.display();
        this.scene.popMatrix();
    }

}



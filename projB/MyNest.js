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
		
		this.numBranches=0;
		this.coordX=5;
		this.coordY=0.5;
		this.coordZ=5;
		this.branch = new MyTreeBranch(scene, 0, 0);
		this.cube = new MyUnitCubeQuad(scene, this.yellowMaterial);
		this.randomPositions = [];
		for(var i=0; i< 2*scene.branches.length; i++)
		{
			this.randomPositions[i]=Math.random();
		}
	}
	
	display()
	{
		this.scene.translate(this.coordX,this.coordY,this.coordZ);
		
	//	this.cube.display();
		
		for(var i=0; i< this.numBranches; i++)
		{
			console.log(this.numBranches);
			this.scene.pushMatrix();
			this.scene.translate(this.randomPositions[i], 0,this.randomPositions[i+this.randomPositions.length/2]);
			this.branch.display();	
			this.scene.popMatrix();
		}
	}

	drawBranches(){
		this.numBranches++;
	}

}
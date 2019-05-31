/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyNest extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.yellowMaterial = new CGFappearance(this.scene);
		this.yellowMaterial.setAmbient(1,1,0,1);
		this.yellowMaterial.setDiffuse(1,1,0,1);
		this.yellowMaterial.setSpecular(1,1,0,1);
        this.yellowMaterial.setShininess(10.0);
		this.yellowMaterial.loadTexture('images/roof.jpg')
        this.yellowMaterial.setTextureWrap('REPEAT', 'REPEAT');
		this.numBranches=0;
		this.coordX=5;
		this.coordY=3;
		this.coordZ=5;
		this.branch = new MyTreeBranch(scene, 0, 0);
		this.nest = new MySemisphere(scene, 10,10);
		this.randomPositions = [];
		for(var i=0; i< scene.branches.length; i++)
		{
			this.randomPositions[i]=Math.random();
		}
	}
	
	display()
	{
		this.scene.translate(this.coordX,this.coordY,this.coordZ);
		
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.translate(0,0,-0.5);
		this.yellowMaterial.apply();
		this.nest.display();
		this.scene.popMatrix();
		
		for(var i=0; i< this.numBranches; i++)
		{
			this.scene.pushMatrix();
			this.scene.rotate(-Math.PI/4,1,0,0);
			this.scene.rotate(i*Math.PI/2, 0,0,1);
			this.branch.display();	
			this.scene.popMatrix();
		}
	}

	drawBranches(){
		this.numBranches++;
	}

}
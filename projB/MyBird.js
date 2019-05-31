/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBird extends CGFobject {
	constructor(scene, angle,x,y,z, vel) {
		super(scene);
		
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setAmbient(0, 0, 1, 1);
        this.blueMaterial.setDiffuse(0, 0, 1, 1);
        this.blueMaterial.setSpecular(0, 0, 1, 1);
        this.blueMaterial.setShininess(10.0);

		this.ang=angle;
		this.coordX=x;
		this.coordY=y;
		this.coordZ=z;
		this.velocity=vel;
		this.numUpdatesUp=1;
		this.numUpdatesDown=0;
		this.drawBranch=false;
		this.cube = new MyUnitCubeQuad(scene, this.blueMaterial);
		this.pyramid = new MyPyramid(scene, 4, 1);
		this.quad= new MyQuad(scene);
		this.triangle = new MyTriangle(scene);
		this.branch= new MyTreeBranch(scene,5, 5);
	}
	
	display()
	{
		this.scene.translate(this.coordX, this.coordY, this.coordZ);
		this.scene.rotate(this.ang, 0, 1, 0);

		this.scene.pushMatrix();
		this.scene.translate(0,1,0);
		this.blueMaterial.apply();
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(0,0.5,-0.5);
		this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(0.2,0.6,0.2);
		this.scene.translate(0,0.8,-4);
		this.scene.yellowMaterial.apply();
		this.pyramid.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(0.1,0.1,0.1);
		this.scene.translate(-3,5,-12);
		this.pyramid.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(Math.PI/2,1,0,0);
		this.scene.scale(0.1,0.1,0.1);
		this.scene.translate(3,5,-12);
		this.pyramid.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.7,0.7,1);
		this.scene.translate(1.2,0.5,0.5);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.4,0.5,1);
		this.scene.translate(2,2.4,0.5);
		this.triangle.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.7,0.7,1);
		this.scene.translate(-1.2,0.5,0.5);
		this.quad.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(0.4,0.5,1);
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.translate(2,2.4,-0.5);

		this.triangle.display();
		this.scene.popMatrix();

		if(this.drawBranch){
			this.scene.pushMatrix();
			this.scene.rotate(Math.PI/2, 0,1,0);
			this.scene.translate(-6,1,-5.5);
			this.branch.display();
			this.scene.popMatrix();
		}
	}

	turn(w, speedFactor)
	{
		this.ang += speedFactor*w;
	}

	updatePosition(delta){
		var distance =this.velocity*(delta/1000);
		this.coordX+=distance*Math.sin(this.ang);
		this.coordZ+=(distance)*Math.cos(this.ang);
	}
	accelerate(v, speedFactor)
	{
		if(this.velocity!=0)	
			this.velocity *= v * speedFactor;
		else
			this.velocity=0.01;
	}

	goDown(delta){
		this.coordY-=(delta/100000);	
	}

	checkBranch(branches, nest){
		if(!this.drawBranch){
			for(var i=0; i < branches.length; i++){
					if(Math.abs(branches[i].coordX-this.coordX)<2 && Math.abs(branches[i].coordZ-this.coordZ)<2)
					{
						branches.splice(i,1);
						this.drawBranch=true;
						break;
					}
			}
		}
		else{
			if(Math.abs(nest.coordX-this.coordX)<2 && Math.abs(nest.coordZ-this.coordZ)<2)
			{
				this.drawBranch=false;
				nest.drawBranches();
			}
		}			
	}

	update()
	{
		var offset1=0.0;
		offset1=1/30;
		if(this.numUpdatesUp==100)
		{
			this.numUpdatesUp=0;
			this.numUpdatesDown=1;
			this.coordY+=(-offset1);
		}
		else if(this.numUpdatesUp!=0)
		{			
			this.coordY+=offset1;
			this.numUpdatesUp+=1;
		}


		if(this.numUpdatesDown==100)
		{
			this.numUpdatesDown=0;
			this.numUpdatesUp=1;
			this.coordY+=offset1;
		}
		else if(this.numUpdatesDown!=0)
		{			
			this.coordY-=offset1;
			this.numUpdatesDown+=1;
		}
	}
}
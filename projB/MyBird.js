/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBird extends CGFobject {
	constructor(scene, angle,x,y,z, vel) {
		super(scene);
		
        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.scene.setAmbient(0, 0, 1, 1);
        this.blueMaterial.scene.setDiffuse(0, 0, 1, 1);
        this.blueMaterial.scene.setSpecular(0, 0, 1, 1);
        this.blueMaterial.scene.setShininess(10.0);
		
		this.yellowMaterial = new CGFappearance(this.scene);
		this.yellowMaterial.scene.setAmbient(1,1,0,1);
		this.yellowMaterial.scene.setDiffuse(1,1,0,1);
		this.yellowMaterial.scene.setSpecular(1,1,0,1);
		this.yellowMaterial.scene.setShininess(10.0);

		this.ang=angle;
		this.coordX=x;
		this.coordY=y;
		this.coordZ=z;
		this.velocity=vel;
		this.numUpdatesUp=1;
		this.numUpdatesDown=0;
		this.cube = new MyUnitCubeQuad(scene, this.blueMaterial);
		this.pyramid = new MyPyramid(scene, 4, 1);
		this.quad= new MyQuad(scene);
		this.triangle = new MyTriangle(scene);
	}
	
	display()
	{
		this.scene.translate(-this.coordX, -this.coordY, -this.coordZ);
		this.scene.rotate(this.ang*(Math.PI/180), 0, 1, 0);
		this.scene.translate(this.coordX, this.coordY, this.coordZ);

		this.scene.translate(this.coordX, this.coordY, this.coordZ+(0.1*this.velocity));

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
		this.yellowMaterial.apply();
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
		// this.scene.rotate(Math.PI/2,1,0,0);
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
	}

	turn(w)
	{
		this.ang += w;
	}

	accelerate(v)
	{
		this.velocity += v;
	}
	update()
	{
		var offset1=0.0;
		offset1=1/30;
		if(this.numUpdatesUp==100)
		{
			this.numUpdatesUp=0;
			this.numUpdatesDown=1;
			console.log(this.numUpdatesUp);
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
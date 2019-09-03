/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.prl = new MyParallelogram(scene);
        this.bigtriangle = new MyTriangleBig(scene);
		this.smalltriangle = new MyTriangleSmall(scene);
	}
	setmaterialred() {
		this.scene.setAmbient(1,0,0,1);
		this.scene.setDiffuse(1,0,0,1);
		this.scene.setSpecular(1,0,0,1);
		this.scene.setShininess(10);
	}
	setmaterialgreen() {
		this.scene.setAmbient(0,1,0,1);
		this.scene.setDiffuse(0,1,0,1);
		this.scene.setSpecular(0,1,0,1);
		this.scene.setShininess(10);
	}
	setmaterialyellow() {
		this.scene.setAmbient(1,1,0,1);
		this.scene.setDiffuse(1,1,0,1);
		this.scene.setSpecular(1,1,0,1);
		this.scene.setShininess(10);
	}
	setmaterialpink() {
		this.scene.setAmbient(1,0,1,1);
		this.scene.setDiffuse(1,0,1,1);
		this.scene.setSpecular(1,0,1,1);
		this.scene.setShininess(10);
	}
	setmateriallightblue(){
		this.scene.setAmbient(0.22,0.69,0.87,1);
		this.scene.setDiffuse(0.22,0.69,0.87,1);
		this.scene.setSpecular(0.22,0.69,0.87,1);
		this.scene.setShininess(10);
	}
	setmaterialorange(){
		this.scene.setAmbient(1,0.65,0,1);
		this.scene.setDiffuse(1,0.65,0,1);
		this.scene.setSpecular(1,0.65,0,1);
		this.scene.setShininess(10);
	}
	setmaterialviolet(){
		this.scene.setAmbient(0.31,0.185,0.31,1);
		this.scene.setDiffuse(0.31,0.185,0.31,1);
		this.scene.setSpecular(0.31,0.185,0.31,1);
		this.scene.setShininess(10);
	}
	display()
	{

			this.scene.pushMatrix();
			this.scene.translate(0,-Math.sqrt(2)/2,0);
			this.scene.rotate(Math.PI/4,0,0,1);			//square
			this.scene.diamondMaterial.apply();
			this.diamond.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(-Math.sqrt(2)/2,Math.sqrt(2),0);
			this.scene.rotate(Math.PI/4,0,0,1);		//top tri
			this.scene.diamondMaterial.apply();
			this.triangle.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(Math.sqrt(2)+Math.sqrt(2)/2,Math.sqrt(2)-1,0);
			this.scene.rotate(Math.PI/2,0,0,1);   //right tri
			this.scene.diamondMaterial.apply();
			this.smalltriangle.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(-(Math.sqrt(2)+Math.sqrt(2)/2),Math.sqrt(2)-1,0);
			this.scene.rotate(-Math.PI/2,0,0,1);	// left tri
			this.scene.diamondMaterial.apply();
			this.smalltriangle.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(Math.sqrt(8)/2+Math.sqrt(2)+Math.sqrt(2)/2,0,0);
			this.scene.rotate(3*Math.PI/4,0,0,1);		//right bigtri
			this.scene.diamondMaterial.apply();
			this.bigtriangle.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(-(Math.sqrt(8)/2+Math.sqrt(2)+Math.sqrt(2)/2),0,0);
			this.scene.rotate(-3*Math.PI/4,0,0,1);		//left bigtri
			this.scene.diamondMaterial.apply();
			this.bigtriangle.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
			this.scene.translate(-Math.sqrt(2)/2,0,0);
			this.scene.rotate(Math.PI,1,0,0);
			this.scene.rotate(-Math.PI/4,0,0,1);		//paralle
			this.scene.scale(1,1,-1);
			this.scene.diamondMaterial.apply();
			this.prl.display();
			this.scene.popMatrix();
	}

	enableNormalViz()
	{
		this.diamond.enableNormalViz();
		this.triangle.enableNormalViz();
		this.prl.enableNormalViz();
		this.bigtriangle.enableNormalViz();
		this.smalltriangle.enableNormalViz();
	}

	disableNormalViz()
	{
		this.diamond.disableNormalViz();
		this.triangle.disableNormalViz();
		this.prl.disableNormalViz();
		this.bigtriangle.disableNormalViz();
		this.smalltriangle.disableNormalViz();
	}
}

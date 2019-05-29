/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(60);

        //Initialize materials

        this.cubeMapMaterial = new CGFappearance(this);
        this.cubeMapMaterial.setAmbient(0.6, 0.6, 0.6, 1);
        this.cubeMapMaterial.setDiffuse(1.0, 1.0, 1.0, 1);
        this.cubeMapMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.cubeMapMaterial.setShininess(10.0);
        this.cubeMapMaterial.loadTexture('images/day.png');
        this.cubeMapMaterial.setTextureWrap('REPEAT', 'REPEAT');

        this.wallMaterials = new CGFappearance(this);
        this.wallMaterials.setAmbient(0.3, 0.3, 0.3, 1);
        this.wallMaterials.setDiffuse(1.0, 1.0, 1.0, 1);
        this.wallMaterials.setSpecular(1.0, 1.0, 1.0, 1);
        this.wallMaterials.setShininess(10.0);
        this.wallMaterials.loadTexture('images/wall.jpg');
        this.wallMaterials.setTextureWrap('REPEAT', 'REPEAT');

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.cubeMap = new MyCubeMap(this);
        this.plane = new Plane(this, 32);
        this.house = new MyHouse(this);
        this.bird = new MyBird(this, 0, 10, 3, 0, 0);
        this.cube = new MyUnitCubeQuad(this, this.wallMaterials);
        this.terrain = new MyTerrain(this)
        this.prism = new MyPrism(this,10,20);
        this.branches=[];
        for(var i=0; i< 5; i++)
        {
            this.branches[i]= new MyTreeBranch(this, Math.random()*5, Math.random()*5);
        }
        
        this.nest = new MyNest(this);
        this.tree = new MyLSPlant(this);

        //Objects connected to MyInterface
        this.scaleFactor=1.0;
        this.speedFactor=1.0;

        		
		this.yellowMaterial = new CGFappearance(this);
		this.yellowMaterial.setAmbient(1,1,0,1);
		this.yellowMaterial.setDiffuse(1,1,0,1);
		this.yellowMaterial.setSpecular(1,1,0,1);
        this.yellowMaterial.setShininess(10.0);
        
        this.goDown=false;
        this.goUp=true;
        this.drawLightning = false;
    
        this.axiom =  "X"; 
        this.angle = 25.0;
        this.iterations = 3;
        this.scaleF = 0.5;
        this.lightning = new MyLightning(this);

        this.doGenerate = function () {
            this.lightning.generate(
                this.axiom,
                {
                    "F": ["FF"],
                    "X": ["F[-X][X]F[-X]+FX", "[-F]+X[-XF]XX"]
                },
                this.angle,
                this.iterations,
                this.scaleF
            );
    
            this.tree.generate(
                "X",
                {
                    "F": ["FF"],
                    "X": [" F[-X][X]F[-X]+X", "F[-X][X]+X", "F[+X]-X", "F[/X][X]F[\\X]+X", "F[\X][X]/X", "F[/X]\X", "F[^X][X]F[&X]^X", "F[^X]&X", "F[&X]^X"]
                },
                30,
                6,
                0.6
            );
        }

        // do initial generation
        this.doGenerate();

    }
    
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(10, 5, 2));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    checkKeys()  {
        var text="Keys pressed: ";
        var keysPressed=false;

        if (this.gui.isKeyPressed("KeyW"))
         {
             this.bird.accelerate(2, this.speedFactor);
        }
        if (this.gui.isKeyPressed("KeyS"))
        {
            this.bird.accelerate(0.5, this.speedFactor);
        }
        if (this.gui.isKeyPressed("KeyA"))
        {
            this.bird.turn(-0.2, this.speedFactor);
        }
        if (this.gui.isKeyPressed("KeyD"))
        {
             this.bird.turn(0.2, this.speedFactor);
        }

        if (this.gui.isKeyPressed("KeyR"))
        {
             this.bird = new MyBird(this, 0, 10, 3, 0, 0);
        }
        if(this.gui.isKeyPressed("KeyP"))
        {
            this.goDown=true;
        }
        if(this.gui.isKeyPressed("KeyL"))
        {
            this.drawLightning=true;
        }
     }

    update(t){
        if(this.oldtime==undefined)
            this.oldtime=t;
        
        var delta = t - this.oldtime;
        
        this.bird.updatePosition(delta);
        if(this.goDown)
        {
            this.bird.goDown(delta);
            if(this.bird.coordY<=0)
            {
                this.goDown=false;
                this.bird.checkBranch(this.branches, this.nest);
                this.goUp=true;
            }
        }
        else if(this.goUp){
            this.bird.goDown(-delta);
            if(this.bird.coordY>=3)
            this.goUp=false;
        }
        else
        {
            this.checkKeys(t);
            this.bird.update();
        }
        if(this.drawLightning)
        {
            this.lightning.update(delta);
            if(this.lightning.axiom.length<=this.lightning.depth){
                this.drawLightning=false;
                this.lightning.startingTime=undefined;
                this.lightning.depth=0;
            }
        }  
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.pushMatrix();
        this.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scale(60, 60, 1);
        this.plane.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(0.5,0.5,0.5);
        this.scale(60,60,60);
        this.translate(0,0.485,0);
        this.cubeMapMaterial.apply();
        this.cubeMap.display();
        this.popMatrix();

        this.pushMatrix();
        this.scale(1.4,1.4,1.4);
        this.house.display();
        this.popMatrix();

        this.pushMatrix();
        this.bird.display();
        this.popMatrix();
        
        // this.pushMatrix();
        // this.rotate(-Math.PI/2, 1,0,0);
        // this.terrain.display();
        // this.popMatrix();
        this.pushMatrix(); 
        this.nest.display(); 
        this.popMatrix();
        
        for(var i=0; i<this.branches.length; i++){
            this.pushMatrix();
            this.branches[i].display();
            this.popMatrix();
        }
        if(this.drawLightning)
        {
            this.pushMatrix();
            this.rotate(-Math.PI, 0,0,1);
            this.translate(0,-35,0);
            this.yellowMaterial.apply();
            this.lightning.display();
            this.popMatrix();
        }
       
        this.pushMatrix();
        this.translate(-9,0,-7);
        this.tree.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-9,0,-10);
        this.tree.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-9,0,-13);
        this.tree.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-15,0,-7);
        this.tree.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-15,0,-10);
        this.tree.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(-15,0,-13);
        this.tree.display();
        this.popMatrix();
        // ---- END Primitive drawing section
    }
}
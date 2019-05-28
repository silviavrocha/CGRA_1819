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

        var oldt = 0;

        //Objects connected to MyInterface
        this.scaleFactor=1.0;
        this.speedFactor=1.0;
    }
    
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
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
        // Check for key codes e.g. in ​https://keycode.info/
        if (this.gui.isKeyPressed("KeyW"))
         {
             this.bird.accelerate(3);
             text+=" W ";
             keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyS"))
        {
            this.bird.accelerate(-3);
            text+=" S ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyA"))
        {
            this.bird.turn(-5);
            text+=" A ";
            keysPressed=true;
        }
        if (this.gui.isKeyPressed("KeyD"))
        {
             this.bird.turn(5);
            text+=" D ";
            keysPressed=true;
        }
        if (keysPressed)
        console.log(text); 
     }
    update(t){
        if(t>0)
        {
            this.checkKeys();

            this.bird.update();
        }

        
            //this.oldt = t;

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

        this.pushMatrix();
        this.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scale(100, 100, 1);
        this.plane.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(0.5,0.5,0.5);
        this.scale(60,60,60);
        this.translate(0,0.485,0);
        this.cubeMapMaterial.apply();
        this.cubeMap.display();
        this.popMatrix();

        /*this.pushMatrix();
        this.translate(0,10,0);
        this.prism.display();
        this.popMatrix();*/

        this.pushMatrix();
        this.scale(1.4,1.4,1.4);
        this.house.display();
        this.popMatrix();

        this.pushMatrix();
        this.bird.display();
        this.popMatrix();
        
        this.pushMatrix();
        this.rotate(-Math.PI/2, 1,0,0);
        this.terrain.display();
        this.popMatrix();
        // this.pushMatrix();
        // this.scale(3,3,3);
        // this.translate(0,0.5,0);
        // this.cube.display();
        // this.popMatrix();
        // ---- END Primitive drawing section
    }
}
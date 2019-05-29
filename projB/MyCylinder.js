/**
* MyPyramid
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        var sa=Math.sin(ang);
        var saa=Math.sin(ang+alphaAng);
        var ca=Math.cos(ang);
        var caa=Math.cos(ang+alphaAng);

        this.vertices.push(ca, 0, -sa);
        this.vertices.push(ca,1,-sa);
        this.vertices.push(caa, 0, -saa);
        this.vertices.push(caa,1,-saa);
       
        
        this.normals.push(ca, 0, -sa);
        this.normals.push(ca, 1, -sa);
        this.normals.push(caa, 0, -saa);
        this.normals.push(caa, 1, -saa);

        this.indices.push(0, 2 , 1 );
        this.indices.push(2, 3 , 1 );
        
        this.texCoords.push(0,1);
        this.texCoords.push(0,0);
        this.texCoords.push(1/this.slices,1);
        this.texCoords.push(1/this.slices,0);

        ang+=2*alphaAng;
        for(var i = 1; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var ca=Math.cos(ang);

            this.vertices.push(ca, 0, -sa);
            this.vertices.push(ca,1,-sa);
            
            this.normals.push(ca, 0, -sa);
            this.normals.push(ca, 1, -sa);

            this.indices.push(2*i, (2*i+2) , (2*i+1));
            this.indices.push((2*i+2), (2*i+3) , (2*i+1) );

            this.texCoords.push((i+1)/this.slices,1);
            this.texCoords.push((i+1)/this.slices,0);
    
            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    

}



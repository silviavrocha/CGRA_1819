class MySemisphere extends CGFobject
{
	constructor(scene, slices, stacks)
	{
		super(scene);

		this.slices = slices;
		this.stacks = stacks;
		
		this.initBuffers();
	};

	initBuffers() 
	{
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var angle = (2* Math.PI) / this.slices;
		var division = 1.0 / this.stacks;

		for(let k = 0; k < this.stacks; k++)
		{		
            for(let i = 0; i <= this.slices; i++)
            {
                this.vertices.push(Math.cos(i * angle)*Math.cos(Math.asin(division*(k))), Math.sin(i * angle)*Math.cos(Math.asin(division*(k))), k * division);

                this.normals.push(Math.cos(i * angle), Math.sin(i * angle), Math.cos(Math.asin(division*(k))));
                                
                this.texCoords.push( (Math.cos(i * angle)*Math.cos(Math.asin(division*(k))) ) / 2.0 + 0.5, -(Math.sin(i * angle)*Math.cos(Math.asin(division*(k))) ) / 2.0 + 0.5);					

                if(k != 0 && i != 0)
                {
                    this.indices.push((this.slices+1)*k + i - 1, (this.slices+1)*(k-1) + i - 1, (this.slices+1)*(k-1) + i);
                    this.indices.push((this.slices+1)*k + i - 1,(this.slices+1)*(k-1) + i,  (this.slices+1)*(k-1) + i - 1);

                    this.indices.push((this.slices+1)*k + i - 1, (this.slices+1)*(k-1) + i , (this.slices+1)*k + i);
                    this.indices.push((this.slices+1)*k + i - 1, (this.slices+1)*k + i, (this.slices+1)*(k-1) + i );

                }
            }
		}
        
        this.vertices.push(Math.cos((this.slices-1) * angle)*Math.cos(Math.asin(division*(this.stacks))), Math.sin((this.slices-1) * angle)*Math.cos(Math.asin(division*(this.stacks))), this.stacks * division);
        this.normals.push(Math.cos((this.slices-1) * angle), Math.sin((this.slices-1) * angle), Math.cos(Math.asin(division*(this.stacks))));
        this.texCoords.push(0.5,0.5);
        for(let i = 0; i <= this.slices; i++)
        {
            this.indices.push((this.slices+1)*this.stacks,(this.slices+1)*(this.stacks-1) + i, (this.slices+1)*(this.stacks-1) + i + 1);	
            this.indices.push((this.slices+1)*this.stacks,(this.slices+1)*(this.stacks-1) + i + 1, (this.slices+1)*(this.stacks-1) + i);							
        }	
			
		this.primitiveType=this.scene.gl.TRIANGLES;
        
        
        
        
        
        
        
        this.initGLBuffers();
	};
};
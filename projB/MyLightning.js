/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
	constructor(scene) {
        super(scene);
        this.depth=0;
        this.startingTime;
    }

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": new MyQuad(this.scene, 0.3),
            "X": new MyQuad(this.scene, 0.2)
        };
    }

    startAnimation(delta){
        this.startingTime=delta;
        this.iterate();
        this.depth= this.axiom.length*(delta-this.startingTime);
    }

    update(t){
        if(this.startingTime==undefined)
            this.startAnimation(t);
        else
            this.depth= this.axiom.length*((t-this.startingTime)/1000);
            this.display();
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        var i;
        // percorre a cadeia de caracteres
        for (i=0; i<this.depth; ++i){
            // verifica se sao caracteres especiais
            switch(this.axiom[i]){
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "[":
                    // push
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    this.scene.popMatrix();
                    break;
                case "\\" :
                    this.scene.rotate(this.angle,1,0,0);
                    break;
                case "/":
                    this.scene.rotate(-this.angle,1,0,0);
                    break;
                case "^":
                    this.scene.rotate(this.angle,0,1,0);
                    break;
                case "&":
                    this.scene.rotate(-this.angle,0,1,0);
                    break;

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive=this.grammar[this.axiom[i]];

                    if ( primitive )
                    {
                        primitive.display();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }
}
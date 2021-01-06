class Creture{
  constructor(brain) {
    //logic vars
    this.id = 0;
    this.name = 'rabbit';
    this.x = 500;
    this.y = 500;
    this.food = 300;
    this.water = 300;
    this.alive = true;


    //will try to distance its self from other rabbits
    this.distance = 10;


    //dna vars
    this.sight = 100;
    this.canSee = ["its id", "its x", "its y"];
    this.canSee = [];


    this.fitness = 1;

    this.nnoX;
    this.nnoY;
    if (brain){
      this.brain = brain.copy();
    }else{
      this.brain = new NeuralNetwork(6, 6, 4);
    }
    //the speed is... the speed.
    //this can be mutated
    this.speed = 0.09;
    //the dna is the direction the creture needs to go every frame.
    //this can be mutated.
    this.lifespan = 0;
    //this var is updated every frame if the creture is alive.
    //this is how we determine how much of the cretures dna to put in the pool.

    this.show = function(col){
      fill(col);
      rect(this.x, this.y, 20, 20);
      fill(1000, 40);
      ellipse(this.x+10, this.y+10, this.sight);
      fill(255, 0, 0);
      textSize(32);
      // text(this.food, this.x, this.y);
    }
    this.mutate = function(chance){
      this.brain.mutate(chance);
    }
    this.think = function(date) {
      let inputs = [];
      inputs[0] = this.x;
      inputs[1] = this.y;
      inputs[2] = date;
      this.canSee[0] = 42;
      this.canSee[1] = 42;
      this.canSee[2] = 42;

      //update cansee var
      for (var i = 0; i < rabbitPopulation.length; i++) { //case rabbits
        if (rabbitPopulation[i].alive == true){
          var disx = Math.abs(this.x - rabbitPopulation[i].x);
          var disy = Math.abs(this.y - rabbitPopulation[i].y);

          if (disx <= this.sight && disy <= this.sight){
            this.canSee[0] = rabbitPopulation[i].id;
            this.canSee[1] = rabbitPopulation[i].x;
            this.canSee[2] = rabbitPopulation[i].y;
            line(this.x, this.y, rabbitPopulation[i].x, rabbitPopulation[i].y);
          }
        }
      }

      inputs[3] = this.canSee[0];
      inputs[4] = this.canSee[1];
      inputs[5] = this.canSee[2];


      let output = this.brain.predict(inputs);
      this.nnoX = output[0] * 10;
      this.nnoY = output[1] * 10;

      if (output[2] <= 0.5){
        this.nnoX = -Math.abs(this.nnoX);
      }
      if (output[3] <= 0.5){
        this.nnoY = -Math.abs(this.nnoY);
      }
      // console.log(this.nnoX);
      // console.log(this.nnoY);
    }

    this.move = function(){
      //the AI out smarted me...
      //the reward system is based on how long the rabbit lives
      //SO the rabbit is exploiting the movement system and making it move really slow.
      //that is crazy to me.
      //it also started that at like evoultion 5

      if (this.x != this.nnoX){
        if (this.x - this.nnoX * this.speed <= 200){
          //the AI is moving slow
          this.nnoX++;
          //thats what you get
        }else{
          this.x = this.x - this.nnoX * this.speed;
        }
      }
      if (this.y != this.nnoY){
        if (this.x - this.nnoX * this.speed <= 200){
          //the AI is moving slow
          this.nnoY++;
          //thats what you get
        }else{
          this.y = this.y - this.nnoY * this.speed;
        }
      }
    }
  }
}

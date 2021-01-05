function rng(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function rfg(min, max) {
  return Math.random() * (max - min) + min;
}

function setup() {
  createCanvas(1000, 1000);
}

var mutationrate = 100;

var numberSurvived = 0;

var dnaxPool = [];
var dnayPool = [];
var speedPool = [];

var evoultions = 0;
var date = 0;
var dpe = 500;

var evoultionData = [];

var pause = false;
function mousePressed() {
  console.log(evoultionData);
}

//start
function creture(){
  //logic vars
  this.x = 500;
  this.y = 500;
  this.food = 300;
  this.alive = true;
  this.framesEating = 0;
  this.happyness = 0;

  //dna vars


  //the speed is... the speed.
  //this can be mutated
  this.speed = 0.05;
  //the dna is the direction the creture needs to go every frame.
  //this can be mutated.
  this.dnax = [];
  this.dnay = [];

  this.lifespan = 0;
  //this var is updated every frame if the creture is alive.
  //this is how we determine how much of the cretures dna to put in the pool.

  this.show = function(col){
    fill(col);
    rect(this.x, this.y, 20, 20);
    fill(255, 0, 0);
    textSize(32);
    // text(this.food, this.x, this.y);
  }

  this.newRandomDna = function(){
    for (var i = 0; i < dpe; i++) {
      this.dnax.push();
      this.dnay.push();

      this.dnax[i] = rng(-500, 500);
      this.dnay[i] = rng(-500, 500);
    }
  }
}

var population = [];
var numberOfRabbits = 5000;
var timeOfFirstHit = 0;

for (var i = 0; i < numberOfRabbits; i++) {
  population.push(i);
  population[i] = new creture();
  //give every creture random DNA
  population[i].newRandomDna();
}

// LLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOPPPPPPPPPPPPPPPPP
function draw() {
  background(66, 245, 117);

  // console.log(mouseX +' '+ mouseY);
  line(0, 200, 1000, 200);
  fill(0, 0, 255);
  rect(0, 0, 1000, 198);
  // line(100, 800, 900, 800);

  fill(255, 255, 255);
  // line(350, 400, 650, 400);
  rect(250, 400, 500, 5);
  date++;

  //collisions
  for (var i = 0; i < population.length; i++) {
    //food box
    if (population[i].y <= 200){
      if (timeOfFirstHit == 0){
        timeOfFirstHit = date;
      }
      population[i].food++;
      population[i].food++;
    }
    //food box
    // if (population[i].y >= 800){
    //   if (timeOfFirstHit == 0){
    //     timeOfFirstHit = date;
    //   }
    //   population[i].food++;
    //   population[i].food++;
    // }

    //KILLING ZONE
    if (population[i].alive == true){
      if (population[i].x >= 250.0){
        if (population[i].x <= 750.0){
          if (Math.abs(population[i].y - 400) <= 15){
            // line(350, 300, 650, 300);
            population[i].alive = false;
            // console.log("creture "+i+" died");
          }
        }
      }
    }
  }
  for (var i = 0; i < population.length; i++) {
    if (population[i].alive == true){
      numberSurvived++;
    }
  }
  if (date >= dpe){
    //there has been a full evoultion.
    evoultions++;
    var evedata = [];

    evedata.push("Done! evoultion number: "+ evoultions);
    evedata.push("number of survivers: "+ numberSurvived);
    evedata.push("first hit: "+timeOfFirstHit);
    evoultionData.push(evedata);
    numberSurvived = 0;

    // console.log("--------------------------------------");
    // console.log("Done! evoultion number: "+ evoultions);
    // console.log("number of survivers: "+ numberSurvived);
    // console.log("first hit: "+timeOfFirstHit);

    dnaxPool = [];
    dnayPool = [];
    speedPool = [];
    date = 0;
    timeOfFirstHit = 0;

    //evaluatetion
    for (var i = 0; i < population.length; i++){
      for (var x = 0; x < population[i].lifespan; x++){
        speedPool.push(population[i].speed);
        dnaxPool.push(population[i].dnax);
        dnayPool.push(population[i].dnay);
      }
    }

    //make every creture come back to life
    for (var i = 0; i < population.length; i++) {
      population[i].food = 300;
      population[i].x = 500;
      population[i].y = 500;
      population[i].alive = true;
      population[i].lifespan = 0;

      //pull random DNA data from the dna pools
      //and mutate them if necessary
      population[i].dnax = dnaxPool[rng(0, dnaxPool.length)];
      population[i].dnay = dnayPool[rng(0, dnayPool.length)];
      //DNA mutation here.
      if (rng(0, 100) <= mutationrate){
        //we can increase how many times mutated
        //you can remember how to do it its 1am im not writing anymore code.
        for (var x = 0; x < population[i].dnax.length; x++){
          if (rng(0, 1) <= 0){
            population[i].dnax[x] = population[i].dnax[x] - rng(rng(-100, 0), rng(0, 100));
            population[i].dnay[x] = population[i].dnay[x] - rng(rng(-100, 0), rng(0, 100));
          }else {
            population[i].dnax[x] = population[i].dnax[x] - rng(rng(-100, 0), rng(0, 100));
            population[i].dnay[x] = population[i].dnay[x] - rng(rng(-100, 0), rng(0, 100));
          }
        }
      }

      population[i].speed = speedPool[rng(0, speedPool.length)];
    }
  }
  //logic as in if has food
  for (var i = 0; i < population.length; i++) {
    if (population[i].food >= 0){
      population[i].food--;
    }
    if (population[i].food <= 0){
      population[i].alive = false;
    }
  }


  //shows every creture if its alive.
  //also adds to its lifespan
  for (var i = 0; i < population.length; i++) {
    if (population[i].alive == true){
      population[i].show(color(66, 182, population[i].food));
      population[i].lifespan++;
    }
  }
  /*
    PHYSICS
    Every creture needs to move in the direction acording to the dna in that creture
    BUT because of the formula i am using for movement i need to cap the MAX speed because of... math


  */
  for (var i = 0; i < population.length; i++) {
    if (population[i].alive == true){
      if (population[i].x != population[i].dnax[date]){
        population[i].x = Math.abs(population[i].x - population[i].dnax[date] * population[i].speed);
      }
      if (population[i].y != population[i].dnay[date]){
        population[i].y = Math.abs(population[i].y - population[i].dnay[date] * population[i].speed);
      }
    }
  }


  textSize(40);
  if (timeOfFirstHit != 0){
    fill(2*timeOfFirstHit, 0, 0);
  }
  text("Evoultion: "+evoultions, 10, 860);
  text("Frame: "+date+"/"+dpe, 10, 830);
  text("Alive: "+numberSurvived+"/"+numberOfRabbits, 10, 890);
  text("DNA pool length: "+dnaxPool.length, 10, 920);
  text("Mutationrate: "+mutationrate+"%", 10, 955);
  text("First hit: "+timeOfFirstHit, 10, 990);
  numberSurvived = 0;
}

function rng(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function rfg(min, max) {
  return Math.random() * (max - min) + min;
}
function float2int (value) {
  return value | 0;
}

var obsticals = [];

var button;

var widthinput;
var heightinput;

var reset;

var running = false;


function setup() {
  createCanvas(1000, 1000);
  slider = createSlider(1, 100, 3);

  obsticals.push(new Obstical(0, 0, 1000, 25, true, color(250, 100, 100)));
  obsticals.push(new Obstical(0, 975, 1000, 25, true, color(250, 100, 100)));
  obsticals.push(new Obstical(0, 0, 25, 1000, true, color(250, 100, 100)));
  obsticals.push(new Obstical(975, 0, 25, 1000, true, color(250, 100, 100)));

  widthinput = createSlider(1, 500, 20);
  heightinput = createSlider(1, 500, 20);

  button = createButton("Start simulation");
  button.mousePressed(startSimulator);
  reset = createButton("Reset map");
  reset.mousePressed(clearmap);
}
function startSimulator(){
  running = true;
}
function clearmap(){
  obsticals = [];
}
var numberSurvived = 0;
var ac = 0;

var evoultions = 0;
var date = 0;
var dpe = 1000;

var evoultionData = [];

var pause = false;

var rabbitPopulation = [];
var numberOfRabbits = 2;
var timeOfFirstHit = 0;
var deadRabbitPopulation = [];

for (var i = 0; i < numberOfRabbits; i++) {
  rabbitPopulation.push(i);
  rabbitPopulation[i] = new Creture();
}
function mousePressed() {
  // if (running == false){
    //make a new Obstical at mouse location
    if (widthinput.value() != "Width" && heightinput.value() != "Height"){
      obsticals.push(new Obstical(mouseX, mouseY, widthinput.value(), heightinput.value(), true, color(250, 100, 100)));
    }else{
      obsticals.push(new Obstical(mouseX, mouseY, 20, 20, true, color(250, 100, 100)));
    }
  // }
}

// LLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOPPPPPPPPPPPPPPPPP
function draw() {
  background(66, 245, 117);
  if (running == false){

    if (widthinput.value() != "Width" && heightinput.value() != "Height"){
      fill(1000, 40);
      rect(float2int(mouseX), float2int(mouseY), widthinput.value(), heightinput.value());
    }else{
      rect(float2int(mouseX), float2int(mouseY), 10, 10);
    }
  }
  //render
  for (var i = 0; i < rabbitPopulation.length; i++) {
    if (rabbitPopulation[i].alive == true){
      rabbitPopulation[i].show(color(150, 119, 62));
    }
  }
  for (var i = 0; i < obsticals.length; i++) {
    obsticals[i].show();
  }
  if (running == true){
    for (var f = 0; f < slider.value(); f++) {
      numberSurvived = 0;
      date++;

      //logic
      for (var i = 0; i < rabbitPopulation.length; i++) {
        if (rabbitPopulation[i].water <= 0 || rabbitPopulation[i].food <= 0){
          rabbitPopulation[i].alive = false;
        }else{
          rabbitPopulation[i].lifespan++;
        }
      }

      for (var i = 0; i < rabbitPopulation.length; i++) {
        if (rabbitPopulation[i].alive == true){
          numberSurvived++;
        }
      }

      if (date >= dpe || numberSurvived <= 0){
        //full loop
        evoultions++;
        for (var i = 0; i < rabbitPopulation.length; i++) {
          deadRabbitPopulation.push(rabbitPopulation[i]);
        }
        newPopulation();
        date = 0;
      }
      //collisions
      for (var i = 0; i < rabbitPopulation.length; i++) {
        //food box
        if (rabbitPopulation[i].water >= 0 && rabbitPopulation[i].alive == true){
          if (rabbitPopulation[i].y <= 400){
            rabbitPopulation[i].water++;
          }else {
            // rabbitPopulation[i].water--;
          }
          if (rabbitPopulation[i].y >= 600){
            rabbitPopulation[i].food++;
          }else{
            // rabbitPopulation[i].food--;
          }
        }

        //ALL OBSTICLES
        for (var x = 0; x < obsticals.length; x++) {
          if (rabbitPopulation[i].x >= obsticals[x].x){
            if (rabbitPopulation[i].x <= obsticals[x].x + obsticals[x].width){
              if (rabbitPopulation[i].y >= obsticals[x].y){
                if (rabbitPopulation[i].y <= obsticals[x].y + obsticals[x].height){
                  obsticals[x].hit(rabbitPopulation[i]);
                }
              }
            }
          }
        }

        if (rabbitPopulation[i].canSee[0] == 0){
          rabbitPopulation[i].water--;
        }
      }


        for (var i = 0; i < rabbitPopulation.length; i++) {
          if (rabbitPopulation[i].alive == true){
            rabbitPopulation[i].think(date);
            rabbitPopulation[i].move();
          }
        }

        text(`evoultions: ${evoultions}`, 10, 90);
      }
      // console.log(mouseX +' '+ mouseY);
      // fill(0, 0, 255);
      // rect(0, 0, 1000, 500);
      // line(100, 800, 900, 800);

      fill(255, 255, 255);
      // line(350, 400, 650, 400);
      text(`alive: ${numberSurvived}`, 10, 30);
      text(`date: ${date} / ${dpe}`, 10, 60);
      // noLoop();
  }
}

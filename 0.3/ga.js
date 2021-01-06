function newPopulation(){
  calFitness();

  for (var i = 0; i < numberOfRabbits; i++) {
    rabbitPopulation[i] = pickOne();
  }
  deadRabbitPopulation = [];
}

function pickOne(){
  var index = 0;
  var r = random(1);

  while (r > 0){
    r = r - deadRabbitPopulation[index].fitness;
    index++;
  }
  index--;



  let rabbitf = deadRabbitPopulation[index];
  let child = new Creture(rabbitf.brain);
  child.mutate(0.1);
  return child;
}

function calFitness(){
  let sum = 0;
  for (let rabbit of deadRabbitPopulation){
    sum += rabbit.water;
  }
  for (let rabbit of deadRabbitPopulation){
    rabbit.fitness = rabbit.water / sum;
  }
}

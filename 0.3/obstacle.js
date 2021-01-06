class Obstical{
  constructor(x, y, w, h, kills, color) {
    if (kills == true){
      this.id = 5;
    }


    this.x = x;
    this.y = y;

    this.width = w;
    this.height = h;

    this.color = color;

    this.kills = kills;

    this.show = function(){
      fill(this.color);
      rect(this.x, this.y, this.width, this.height);
    }

    this.hit = function(collieded){
      if (collieded.name == 'rabbit'){
        if (this.kills == true){
          collieded.alive = false;
        }
      }
    }


  }
}

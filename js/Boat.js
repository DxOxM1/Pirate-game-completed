class Boat {
    constructor(x, y,width,height,boatPos) {
      var options = {
        restitution: 0.8
      };
      this.body = Bodies.rectangle(x, y,width,height, options);
      this.image= loadImage("assets/Boat.png")
      this.width = width;
    this.height = height;
    this.boatPosition = boatPos;
      World.add(world, this.body);
    }
    display() {
      var pos = this.body.position;
      push()
      translate(pos.x, pos.y);
        rotate(this.body.angle);
     imageMode(CENTER);
      image(this.image,0,this.boatPosition, this.width,this.height);
      pop();
    }

    remove(index) {
        Matter.World.remove(world, boats[index].body);
        boats.splice(index, 1);
    
      }
  }
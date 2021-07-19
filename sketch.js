const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
//stores all the balls
var balls = []
//boats array will store all the boats
var boats = []

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 110, 50, -PI / 4);
  


}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  ground.display();

  showBoats()
//array
// arr = ["hello", "hi","bye"]
//arr[0]

 //!==  not equal to
  //iterating through the balls array to display all the balls
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    //iterating through the boats array
    for (var j = 0; j < boats.length; j++) {
      if (balls[i] !== undefined && boats[j] !== undefined) {
        // check the boat and ball is colliding
        if(Matter.SAT.collides(balls[i].body, boats[j].body).collided){
          //remove funtion called which is created in the boat class
          boats[j].remove(j);
          //removing the ball from world
          Matter.World.remove(world, balls[i].body);
          //removing the ball from ball's array
          balls.splice(i, 1);
          // i value is reduced bcoz 1 ball is deleted
          i--;

        }
      }
    }
  }

  cannon.display();
  tower.display();

 
}

function showBoats() {
  //checking if we have boats present on the canvas
  if (boats.length > 0) {
    //to create a new boat we are checking weather the boats are less than 4 and the last boat is inside the canvas
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-130, -100, -120, -80];
      var position = random(positions);
      //creating new boat
      var boat = new Boat(width,height - 100, 200, 200, position);
      // storing each boat in the array
      boats.push(boat);
    }
    // gives velocity to every single boat
    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, {
        x: -0.9,
        y: 0
      });
      //displays every single boat
    boats[i].display();
    }
  } else {
    //if none of the boats are present in the canvas, a new boat will be created
    var boat = new Boat(width, height - 100, 200, 200, -100);
    boats.push(boat);
  }
}



function keyPressed(){
  if (keyCode === DOWN_ARROW) {
    //creating ball
  cannonball = new CannonBall(cannon.x, cannon.y)
  //individual ball is being added to the balls array
    balls.push(cannonball)
  }
}

//displaying each ball
function showCannonBalls(ball, index) {
  ball.display();
  //if the ball crosses the canvas it will get destroyed
  if (ball.body.position.x >= width || ball.body.position.y >= height) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function keyReleased(){
  if (keyCode === DOWN_ARROW) {
    //last ball of the balls array will move
    balls[balls.length - 1].shoot();
  }
}



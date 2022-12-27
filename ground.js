// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : ground.js
// Description : Ground class used for defining the ground properties of the game
// ************************************************

class Ground {
  constructor(x, y, w, h, a) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    var options = {
      friction: 0.99,
      restitution: 0.8,
      isStatic: true,
      collisionFilter: {
        category: groundCollCategory,
        mask: generalCollCategory | generalNoCollCategory
      }
    };
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
    this.body.position.x = this.x;
    this.body.position.y = this.y;
    this.body.angle = a; // in radians

    // Adding the body to the world
    World.add(world, this.body);
  }
  
  show() {
    push();
    rectMode(CENTER);
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    stroke(127);
    fill(200, 150, 70);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : goal.js
// Description : Goal class used to define the player one and two goals
// ************************************************

function Goal(options) {

  // ATTRIBUTES
  this.areaWidth = options.areaWidth; // This is the width of the goal (from the edge of canvas to the entrance of the goal)
  this.areaHeight = options.areaHeight;
  this.topBarX = options.topBarX;
  this.topBarY = options.topBarY;
  this.topBarW = options.topBarWidth;
  this.topBarH = options.topBarHeight;
  this.botBarX = options.bottomBarX;
  this.botBarY = options.bottomBarY;
  this.botBarW = options.bottomBarWidth;
  this.botBarH = options.bottomBarHeight;
  this.isGoal1 = options.isGoal1;

  // X-location of the bottom bar (depends if it is goal 1 or goal 2)
  if (this.isGoal1 == true) {
    this.topBarX = (CANVAS_WIDTH / 9.333) / 2;
    this.botBarX = 0;
  }
  else {
    this.topBarX = CANVAS_WIDTH - ((CANVAS_WIDTH / 9.333) / 2);
    this.botBarX = CANVAS_WIDTH;
  }

  this.topBody = Bodies.rectangle(this.topBarX, this.topBarY, this.topBarW, this.topBarH, options);
  World.add(world,this.topBody);

  this.botBody = Bodies.rectangle(this.botBarX, this.botBarY, this.botBarW, this.botBarH, options);
  World.add(world,this.botBody);

  // Slight tilt on top bar of goals
  if (this.isGoal1 == true) {
    Body.setAngle(this.topBody, PI/100);
  }
  else {
    Body.setAngle(this.topBody, -PI/100);
  }

  // DRAWING FUNCTION
  this.show = function() {
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    noFill();
    fill(255);
    translate(this.topBody.position.x, this.topBody.position.y);
    rotate(this.topBody.angle);
    rect(0, 0, this.topBarW, this.topBarH); // Drawing top bar of goal
    pop();

    // Drawing the side bar of the goal (no physics associated with it)
    if (this.isGoal1) {
      push();
      rect(this.areaWidth, this.botBarY, this.botBarW, this.botBarH);
      pop();
    }
    else {
      push();
      rect(CANVAS_WIDTH - this.areaWidth, this.botBarY, this.botBarW, this.botBarH);
      pop();
    }
  }
}
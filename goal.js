// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : goal.js
// Description : Goal class used to define the player one and two goals
// ************************************************

class Goal {
  constructor(options) {
    // ATTRIBUTES
    // This is the width of the goal (from the edge of canvas to the entrance of the goal)
    this.areaWidth = ("areaWidth" in options) ? options.areaWidth : GOAL_AREA_WIDTH;
    this.areaHeight = ("areaHeight" in options) ? options.areaHeight : GOAL_AREA_HEIGHT;
    this.topBarX = ("topBarX" in options) ? options.topBarX : GOAL_TOPBAR_POS_X;
    this.topBarY = ("topBarY" in options) ? options.topBarY : GOAL_TOPBAR_POS_Y;
    this.topBarW = ("topBarWidth" in options) ? options.topBarWidth : GOAL_TOPBAR_WIDTH;
    this.topBarH = ("topBarHeight" in options) ? options.topBarHeight : GOAL_TOPBAR_HEIGHT;
    this.botBarX = ("bottomBarX" in options) ? options.bottomBarX : GOAL_BOTTOMBAR_POS_X;
    this.botBarY = ("bottomBarY" in options) ? options.bottomBarY : GOAL_BOTTOMBAR_POS_Y;
    this.botBarW = ("bottomBarWidth" in options) ? options.bottomBarWidth : GOAL_BOTTOMBAR_WIDTH;
    this.botBarH = ("bottomBarHeight" in options) ? options.bottomBarHeight : GOAL_BOTTOMBAR_HEIGHT;
    this.isGoal1 = ("isGoal1" in options) ? options.isGoal1 : false;

    // X-location of the bottom bar (depends if it is goal 1 or goal 2)
    if (this.isGoal1 == true) {
      this.topBarX = this.topBarX;
      this.botBarX = 0;
      options.angle = PI / 100;
    }
    else {
      this.topBarX = CANVAS_WIDTH - this.topBarX;
      this.botBarX = CANVAS_WIDTH;
      options.angle = -PI / 100;
    }

    this.topBody = Bodies.rectangle(this.topBarX, this.topBarY, this.topBarW, this.topBarH, options);
    World.add(world, this.topBody);

    this.botBody = Bodies.rectangle(this.botBarX, this.botBarY, this.botBarW, this.botBarH, options);
    World.add(world, this.botBody);
  }

  // DRAWING FUNCTION
  show() {
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
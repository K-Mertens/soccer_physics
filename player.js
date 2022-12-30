// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : player.js
// Description : Player class
// ************************************************

class Player {
  // TO DO : REFACTOR !!! AND ADD COMMENTS !!!
  // EXPLANATIONS OF THE PLAYER CLASS IS EXPLAINED AT THE BOTTOM OF THE CODE
  constructor(generalOptions) {
    this.mainBodyX = generalOptions.startPosX;
    this.mainBodyY = generalOptions.startPosY;
    this.mainBodyW = generalOptions.mainWidth;
    this.mainBodyH = generalOptions.mainHeight;
    this.legBodyX = generalOptions.legX;
    this.legBodyY = generalOptions.legY;
    this.legBodyW = generalOptions.legWidth;
    this.legBodyH = generalOptions.legHeight;
    this.legFixedBodyX = generalOptions.legFixedX;
    this.legFixedBodyY = generalOptions.legFixedY;
    this.legFixedBodyW = generalOptions.legFixedWidth;
    this.legFixedBodyH = generalOptions.legFixedHeight;
    //this.footBodyW = this.legBodyW;
    this.footBodyW = 30;
    this.footBodyH = 3; // TO BE TUNED
    this.counterweightBodyW = this.legFixedBodyW + this.legBodyW + this.footBodyW;
    this.counterweightBodyH = 4;
    
    this.mainBody;
    this.legBody;
    this.legFixedBody;
    this.footBody;
    this.counterweightBody;
  
    this.cstr;
    this.cstrFixed;
    this.cstrFixed2;
    this.cstrFoot;
    this.cstrFoot2;
    this.cstrLegs;
    this.cstrCounterweight;
    this.cstrCounterweight2;
  
    this.isPlayer1 = generalOptions.isPlayer1;
    this.playerBody = generalOptions.playerBody;
    this.absoluteAngle = 0;
    this.flipImageX = 0;
  
    if (this.isPlayer1) {
      this.flipImageX = 1;
    }
    else {
      this.flipImageX = -1;
    }
  
    // BODY -----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // BODIES CREATION - OPTIONS
    // IMPORTANT NOTE : I THINK THAT THE DENSITY OF THE MAIN BODY MUST BE EQUIVALENT TO THE ONE OF THE MOVABLE LEG (VERY LIGHT)
    // 99% OF THE MASS SHOULD BE CONCENTRATED IN THE FIXED LEG (AND ALSO MAYBE A FRACTION OF THIS PERCENTAGE INTO THE FOOT)
    // HOWEVER, IT SEEMS THAT KEEPING DEFAULT VALUES WORKS MUCH BETTER
    var main_options = {
      friction: 0.8,
      restitution: 0.1,
      angle: 0,
      density: 0.001,
      slop: 0.3,
      collisionFilter: {
        category: generalCollCategory,
        mask: generalCollCategory | groundCollCategory
      }
    }
  
    var leg_options = {
      friction: 0.8,
      restitution: 0.1,
      angle: 0,
      density: 0.00002,
      slop: 0.3,
      collisionFilter: {
        category: generalCollCategory,
        mask: generalCollCategory | groundCollCategory
      }
    }
  
    var leg_fixed_options = {
      friction: 0.8,
      restitution: 0.1,
      angle: 0,
      density: 0.001,
      slop: 0.3,
      collisionFilter: {
        category: generalCollCategory,
        mask: generalCollCategory | groundCollCategory
      }
    }
  
    var foot_options = {
      friction: 0.8,
      restitution: 0.1,
      angle: 0,
      density: 0.00005,
      slop: 0.3,
      collisionFilter: {
        category: generalCollCategory,
        mask: groundCollCategory
      }
    }
  
    var counterweight_options = {
      friction: 0.99,
      restitution: 0.1,
      angle: 0,
      density: 0.02,
      collisionFilter: {
        category: generalNoCollCategory,
        mask: generalCollCategory | groundCollCategory
      }
    }
  
    // BODIES CREATION - MAIN BODY
    this.mainBody = Bodies.rectangle(this.mainBodyX, this.mainBodyY, this.mainBodyW, this.mainBodyH, main_options);
    World.add(world,this.mainBody);
  
    // BODIES CREATION - LEG BODY
    this.legBodyX = this.mainBody.position.x + this.flipImageX * (this.mainBodyW / 2) - (this.flipImageX) * (this.legBodyW / 2);
    this.legBodyY = this.mainBody.position.y + (this.mainBodyH / 2) + (this.legBodyH / 2);
    this.legBody = Bodies.rectangle(this.legBodyX, this.legBodyY, this.legBodyW, this.legBodyH, leg_options);
    World.add(world,this.legBody);
  
    // BODIES CREATION - FIXED LEG BODY
    this.leg_fixed_x = this.mainBody.position.x - (this.flipImageX) * (this.mainBodyW / 2) + (this.flipImageX) * (this.legFixedBodyW / 2);
    this.leg_fixed_y = this.mainBody.position.y + (this.mainBodyH / 2) + (this.legFixedBodyH / 2);
    this.legFixedBody = Bodies.rectangle(this.leg_fixed_x, this.leg_fixed_y, this.legFixedBodyW, this.legFixedBodyH, leg_fixed_options);
    World.add(world,this.legFixedBody);
  
    // BODIES CREATION - FOOT BODY
    this.foot_x = this.legBody.position.x + (this.flipImageX) * (this.legBodyW / 2) + (this.flipImageX) * (this.footBodyW / 2);
    this.foot_y = this.legBody.position.y + (this.legBodyH / 2) - (this.footBodyH / 2);
    this.footBody = Bodies.rectangle(this.foot_x, this.foot_y, this.footBodyW, this.footBodyH, foot_options);
    World.add(world, this.footBody);
  
    // BODIES CREATION - COUNTERWEIGHT BODY (counterweight that will be put under the player)
    this.counterweight_x = this.mainBody.position.x;
    this.counterweight_y = this.legFixedBody.position.y + (this.legFixedBodyH / 2) + (this.counterweightBodyH / 2);
    // MAYBE MAKE THE COUNTERWEIGHT A LITTLE BIT WIDER, FOR NOW IT IS WIDTH OF LEG + WIDTH OF FIXED LEG
    this.counterweightBody = Bodies.rectangle(this.counterweight_x, this.counterweight_y, this.counterweightBodyW, this.counterweightBodyH, counterweight_options);
    World.add(world, this.counterweightBody);
  
    // CONSTRAINTS -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
    // CONSTRAINTS CREATION - CONSTRAINT BETWEEN MAIN BODY AND LEG BODY
    // Creating two vectors for each point of the constraint
      this.cstr_A = Matter.Vector.create(this.flipImageX * (this.mainBodyW / 2) + this.flipImageX, (this.mainBodyH / 2) + 1);
      this.cstr_B = Matter.Vector.create(this.flipImageX * (this.legBodyW / 2), -(this.legBodyH / 2));
  
    // Creating options of constraint between main body and leg
    var cstr_options = {
      bodyA: this.mainBody,
      bodyB: this.legBody,
      pointA: this.cstr_A,
      pointB: this.cstr_B,
      length: 0,
      stiffness: 0.9,
      damping: 0,
    }
    this.cstr = Matter.Constraint.create(cstr_options); // Creating constraint between main body and leg
    World.add(world, this.cstr); // Adding the constraint to the world
  
    // CONSTRAINTS CREATION - CONSTRAINTS BETWEEN MAIN BODY AND FIXED LEG BODY
  
    // TO BE FIXED !!!!
    this.cstrFixed_A = Matter.Vector.create(-(this.flipImageX) * (this.mainBodyW / 2) - (this.flipImageX), (this.mainBodyH / 2) + 1); // Bottom left of main body
    this.cstrFixed_B = Matter.Vector.create(-(this.flipImageX) * (this.legFixedBodyW / 2), -(this.legFixedBodyH / 2));
    this.cstrFixed2_A = Matter.Vector.create(-(this.flipImageX) * (this.mainBodyW / 2) + (this.flipImageX) * (this.legFixedBodyW) - (this.flipImageX), (this.mainBodyH / 2) + 1);
    this.cstrFixed2_B = Matter.Vector.create((this.flipImageX) * (this.legFixedBodyW / 2), -(this.legFixedBodyH / 2));
  
    var cstr_fixed_options = {
      bodyA: this.mainBody,
      bodyB: this.legFixedBody,
      pointA: this.cstrFixed_A,
      pointB: this.cstrFixed_B,
      length: 1,
      stiffness: 0,
      damping: 0
    }
  
    var cstr_fixed2_options = {
      bodyA: this.mainBody,
      bodyB: this.legFixedBody,
      pointA: this.cstrFixed2_A,
      pointB: this.cstrFixed2_B,
      length: 1,
      stiffness: 0,
      damping: 0
    }
    this.cstrFixed = Matter.Constraint.create(cstr_fixed_options);
    this.cstrFixed2 = Matter.Constraint.create(cstr_fixed2_options);
    World.add(world, this.cstrFixed);
    World.add(world, this.cstrFixed2);
  
    // CONSTRAINTS CREATION - CONSTRAINTS BETWEEN LEG BODY AND FOOT BODY
    this.cstrFoot_A = Matter.Vector.create((this.flipImageX) * (this.legBodyW / 2) + (this.flipImageX), (this.legBodyH / 2) + 1);
    this.cstrFoot_B = Matter.Vector.create(-(this.flipImageX) * (this.footBodyW / 2), (this.footBodyH / 2));
    this.cstrFoot2_A = Matter.Vector.create((this.flipImageX) * (this.legBodyW / 2) + (this.flipImageX), (this.legBodyH / 2) - this.footBodyH + 1);
    this.cstrFoot2_B = Matter.Vector.create(-(this.flipImageX) * (this.footBodyW / 2), -(this.footBodyH / 2));
  
    var cstr_foot_options = {
      bodyA: this.legBody,
      bodyB: this.footBody,
      pointA: this.cstrFoot_A,
      pointB: this.cstrFoot_B,
      length: 0,
      stiffness: 0.99,
      damping: 0
    }
  
    var cstr_foot2_options = {
      bodyA: this.legBody,
      bodyB: this.footBody,
      pointA: this.cstrFoot2_A,
      pointB: this.cstrFoot2_B,
      length: 0,
      stiffness: 0.99,
      damping: 0
    }
  
    this.cstrFoot = Matter.Constraint.create(cstr_foot_options);
    this.cstrFoot2 = Matter.Constraint.create(cstr_foot2_options);
  
    World.add(world, this.cstrFoot);
    World.add(world, this.cstrFoot2);
  
    // CONSTRAINTS CREATION - CONSTRAINT BETWEEN LEG BODY AND FIXED LEG BODY
    this.cstrLegs_A = Matter.Vector.create(-(this.flipImageX) * (this.legBodyW / 2) - (this.flipImageX), -(this.legBodyH / 2) + 1);
    this.cstrLegs_B = Matter.Vector.create((this.flipImageX) * (this.legFixedBodyW / 2), -(this.legFixedBodyH / 2));
  
    this.cstrLegsLength = 2;
  
    var cstr_legs_options = {
      bodyA: this.legBody,
      bodyB: this.legFixedBody,
      pointA: this.cstrLegs_A,
      pointB: this.cstrLegs_B,
      length: this.cstrLegsLength, // Options to be tweaked
      stiffness: 0.06, // Options to be tweaked
      damping: 0.01 // Options to be tweaked
    }
  
    this.cstrLegs = Matter.Constraint.create(cstr_legs_options);
  
    World.add(world, this.cstrLegs);
  
    // CONSTRAINTS CREATION - CONSTRAINTS BETWEEN COUNTERWEIGHT BODY AND LEG FIXED BODY
    this.cstrCounterweight_A = Matter.Vector.create(-(this.flipImageX) * (this.legFixedBodyW / 2), (this.legFixedBodyH / 2));
    this.cstrCounterweight_B = Matter.Vector.create(-(this.flipImageX) * (this.counterweightBodyW / 2), -(this.counterweightBodyH / 2));
    this.cstrCounterweight2_A = Matter.Vector.create((this.flipImageX) * (this.legFixedBodyW / 2), (this.legFixedBodyH / 2));
    this.cstrCounterweight2_B = Matter.Vector.create(-(this.flipImageX) * (this.counterweightBodyW / 2) + (this.flipImageX) * this.legFixedBodyW, -(this.counterweightBodyH / 2));
    
    var cstr_counterweight_options = {
      bodyA: this.legFixedBody,
      bodyB: this.counterweightBody,
      pointA: this.cstrCounterweight_A,
      pointB: this.cstrCounterweight_B,
      length: 0,
      stiffness: 0.99,
      damping: 0
    }
  
    var cstr_counterweight2_options = {
      bodyA: this.legFixedBody,
      bodyB: this.counterweightBody,
      pointA: this.cstrCounterweight2_A,
      pointB: this.cstrCounterweight2_B,
      length: 0,
      stiffness: 0.99,
      damping: 0
    }
  
    this.cstrCounterweight = Matter.Constraint.create(cstr_counterweight_options);
    this.cstrCounterweight2 = Matter.Constraint.create(cstr_counterweight2_options);
  
    World.add(world, this.cstrCounterweight);
    World.add(world, this.cstrCounterweight2);

  }

  // --------------------------------------------------------------------------------------------------------------------------------------
  // CLASS METHODS ------------------------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------------------------------------

  // Jump function - OK
  jump() {
    var jumpForceTest = Matter.Vector.create(this.mainBody.axes[0].x * -jumpForceCoeff, -this.mainBody.axes[0].y * jumpForceCoeff);
    Body.applyForce(this.mainBody, this.mainBody.position, jumpForceTest);
  }

  // Kick function - WORKING MORE OR LESS - CAN BE REFACTORED
  kick(coeff) {
    if (this.isPlayer1) {
      var kickForce = Matter.Vector.create(this.mainBody.axes[1].x * -coeff, this.mainBody.axes[1].y * -coeff);
      if (this.absoluteAngle + this.legBody.angle <= PI/2) {
        Body.applyForce(this.legBody, this.legBody.position, kickForce);
      }
      else {
        Body.setAngle(this.legBody, this.absoluteAngle);
      }
    }
    else {
      var kickForce = Matter.Vector.create(-this.mainBody.axes[1].x * -coeff, -this.mainBody.axes[1].y * -coeff);
      if (this.absoluteAngle - this.legBody.angle <= PI/2) {
        Body.applyForce(this.legBody, this.legBody.position, kickForce);
      }
      else {
        Body.setAngle(this.legBody, this.absoluteAngle);
      }
    }
  }

  // Returns True if player is on ground
  isOnGround(ground) {
    var mainBodyGroundColl = Matter.SAT.collides(this.mainBody, ground.body);
    var legFixedBodyGroundColl = Matter.SAT.collides(this.legFixedBody, ground.body);
    var legBodyGroundColl = Matter.SAT.collides(this.legBody, ground.body);
    var footBodyGroundColl = Matter.SAT.collides(this.footBody, ground.body);
    var counterweightBodyGroundColl = Matter.SAT.collides(this.counterweightBody, ground.body);

    var isMainBodyOnGround = mainBodyGroundColl.collided;
    var isLegFixedBodyOnGround = legFixedBodyGroundColl.collided;
    var isLegBodyOnGround = legBodyGroundColl.collided;
    var isFootBodyOnGround = footBodyGroundColl.collided;
    var isCounterweightBodyOnGround = counterweightBodyGroundColl.collided;

    var isPlayerOnGround = isMainBodyOnGround || isLegFixedBodyOnGround || isLegBodyOnGround || isFootBodyOnGround || isCounterweightBodyOnGround;

    return isPlayerOnGround;
  }

  // Getting the absolute angle of the player, the angle the body of the player makes with...
  // ... the perpendicular to the ground (angle bound between -PI and PI) -> OK IT IS WORKING BUT CAN BE REFACTORED
  updateAbsoluteAngle() {
    // FIRST QUADRANT [0 ... +90°[
    if (Math.sin(this.mainBody.angle) > 0 && Math.cos(this.mainBody.angle) > 0){
      if (this.mainBody.angle >= 0){
        this.absoluteAngle = this.mainBody.angle % (2 * PI);
      }
      else {
        this.absoluteAngle = (2 * PI) + (this.mainBody.angle % (2 * PI));
      }
    }
    // SECOND QUADRANT ]0 ... -90°]
    if (Math.sin(this.mainBody.angle) < 0 && Math.cos(this.mainBody.angle) > 0){
      if (this.mainBody.angle < 0){
        this.absoluteAngle = this.mainBody.angle % (2 * PI);
      }
      else {
        this.absoluteAngle = (this.mainBody.angle % (2 * PI)) - (2 * PI);
      }
    }
    // THIRD QUADRANT ]-90 ... -180°]
    if (Math.sin(this.mainBody.angle) < 0 && Math.cos(this.mainBody.angle) < 0){
      if (this.mainBody.angle <= 0){
        this.absoluteAngle = this.mainBody.angle % (2 * PI);
      }
      else {
        this.absoluteAngle = (this.mainBody.angle % (2 * PI)) - (2 * PI);
      }
    }
    // FOURTH QUADRANT [+90 ... +180°[
    if (Math.sin(this.mainBody.angle) > 0 && Math.cos(this.mainBody.angle) < 0){
      if (this.mainBody.angle > 0){
        this.absoluteAngle = this.mainBody.angle % (2 * PI);
      }
      else {
        this.absoluteAngle = (2 * PI) + this.mainBody.angle % (2 * PI);
      }
    }
  }

  uprightTilt() {
    var tiltForce = Matter.Vector.create(this.mainBody.axes[1].x * -tiltForceCoeff, -this.mainBody.axes[1].y * tiltForceCoeff);
    if ((this.absoluteAngle) >= PI/5) {
      Body.applyForce(this.mainBody, this.mainBody.position, Matter.Vector.neg(tiltForce));
    }
    if ((this.absoluteAngle) <= -PI/5) {
      Body.applyForce(this.mainBody, this.mainBody.position, tiltForce);
    }
    else {
      // Reset applied force when angle of player is enough to keep him upright
      Body.applyForce(this.mainBody, this.mainBody.position, Matter.Vector.create(0,0));
    }
  }

  // Refactor this by using the bodies' ID for example
  getPlayerBodiesList() {
    var playerBodiesList = [];
    playerBodiesList.push(this.mainBody);
    playerBodiesList.push(this.legBody);
    playerBodiesList.push(this.legFixedBody);
    playerBodiesList.push(this.footBody);
    playerBodiesList.push(this.counterweightBody);
    return playerBodiesList;
  }

  // Refactor this by using the bodies' ID for example
  getPlayerConstraintsList() {
    var playerConstraintsList = [];
    playerConstraintsList.push(this.cstr);
    playerConstraintsList.push(this.cstrFixed);
    playerConstraintsList.push(this.cstrFixed2);
    playerConstraintsList.push(this.cstrFoot);
    playerConstraintsList.push(this.cstrFoot2);
    playerConstraintsList.push(this.cstrLegs);
    playerConstraintsList.push(this.cstrCounterweight);
    playerConstraintsList.push(this.cstrCounterweight2);
    return playerConstraintsList;
  }

  // Dimensions in pixels
  setMainBodyDimensions(width, height) {
    var scaleX = width / this.mainBodyW;
    var scaleY = height / this.mainBodyH;
    this.mainBodyW = width;
    this.mainBodyH = height;
    Body.scale(this.mainBody, scaleX, scaleY);
  }

  // Graphics function
  show() {
    // DRAWING MAIN BODY
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.mainBody.position.x, this.mainBody.position.y);
    rotate(this.mainBody.angle);
    stroke(0);
    fill(255);
    scale(this.flipImageX, 1);
    image(spritePlayerMainBodies[this.playerBody], -this.mainBodyW / 2, -this.mainBodyH / 2,  this.mainBodyW, this.mainBodyH);
    pop();
    
    // DRAWING LEG
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.legBody.position.x, this.legBody.position.y);
    rotate(this.legBody.angle);
    fill(255);
    scale(this.flipImageX, 1);
    image(spritePlayerLeg0, -this.legBodyW / 2, -this.legBodyH / 2,  this.legBodyW, this.legBodyH);
    pop();

    // DRAWING FIXED LEG
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.legFixedBody.position.x, this.legFixedBody.position.y);
    rotate(this.legFixedBody.angle);
    fill(255);
    scale(this.flipImageX, 1);
    image(spritePlayerLeg0, -this.legFixedBodyW / 2, -this.legFixedBodyH / 2,  this.legFixedBodyW, this.legFixedBodyH);
    pop();

    // DRAWING FOOT
    /*push();
    fill(255);
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.footBody.position.x, this.footBody.position.y);
    rotate(this.footBody.angle);
    rect(0, 0, this.footBodyW, this.footBodyH);
    pop();*/
  }
}
// EXPLANATIONS
// Player is comprised of :
// - Main body
// - Leg body (the movable leg)
// - Fixed leg body
// - Foot body
function Player(main_x, main_y, main_w, main_h, leg_w, leg_h, s) {
  // TO DO : REFACTOR !!! AND ADD COMMENTS !!!
  // EXPLANATIONS OF THE PLAYER CLASS IS EXPLAINED AT THE BOTTOM OF THE CODE
  this.main_x = main_x;
  this.main_y = main_y;
  this.main_h = main_h;
  this.main_w = main_w;
  this.leg_w = leg_w;
  this.leg_h = leg_h;
  this.s = s;
  this.leg_fixed_w = leg_w;
  this.leg_fixed_h = leg_h;
  this.foot_w = this.leg_w;
  this.foot_h = this.leg_h / 5;
  this.leg_x = 0;
  this.leg_y = 0;

  // BODY -----------------------------------------------------------------------------------------------------------------------------------------------------------------
  // BODIES CREATION - OPTIONS
  var main_options = {
    friction: 0.8,
    restitution: 0.1,
    angle: 0
  }

  var leg_options = {
    friction: 0.8,
    restitution: 0.1,
    angle: 0,
    //density: 0.1
  }

  var leg_fixed_options = {
    friction: 0.8,
    restitution: 0.1,
    angle: 0,
    //density: 0.05
    //inertia: 0.0001,
    //inverseInertia: 1/0.0001,
  }

  var foot_options = {
    friction: 0.8,
    restitution: 0.1,
    angle: 0,
  }

  // BODIES CREATION - MAIN BODY
  this.main_body = Bodies.rectangle(this.main_x, this.main_y, this.main_w, this.main_h, main_options);
  World.add(world,this.main_body); // Adding the main body to the world

  // BODIES CREATION - LEG BODY
  if (this.s) {
    this.leg_x = this.main_body.position.x + (this.main_w / 2) + (this.leg_w / 2);
    this.leg_y = this.main_body.position.y + (this.main_h / 2) + (this.leg_h / 2);
    this.leg_body = Bodies.rectangle(this.leg_x, this.leg_y, this.leg_w, this.leg_h, leg_options);
    World.add(world,this.leg_body); // Adding the leg body to the world
  }
  else {
    this.leg_x = this.main_body.position.x - (this.main_w / 2) - (this.leg_w / 2);
    this.leg_y = this.main_body.position.y + (this.main_h / 2) + (this.leg_h / 2);
    this.leg_body = Bodies.rectangle(this.leg_x, this.leg_y, this.leg_w, this.leg_h, leg_options);
    World.add(world,this.leg_body); // Adding the leg body to the world
  }
  

  // BODIES CREATION - FIXED LEG BODY
  if (this.s) {
    this.leg_fixed_x = this.main_body.position.x - (this.main_w / 2) + (this.leg_fixed_w / 2);
    this.leg_fixed_y = this.main_body.position.y + (this.main_h / 2) + (this.leg_fixed_h / 2);
    this.leg_fixed_body = Bodies.rectangle(this.leg_fixed_x, this.leg_fixed_y, this.leg_fixed_w, this.leg_fixed_h, leg_fixed_options);
    World.add(world,this.leg_fixed_body); // Adding the fixed leg body to the world
  }
  else {
    this.leg_fixed_x = this.main_body.position.x + (this.main_w / 2) - (this.leg_fixed_w / 2);
    this.leg_fixed_y = this.main_body.position.y + (this.main_h / 2) + (this.leg_fixed_h / 2);
    this.leg_fixed_body = Bodies.rectangle(this.leg_fixed_x, this.leg_fixed_y, this.leg_fixed_w, this.leg_fixed_h, leg_fixed_options);
    World.add(world,this.leg_fixed_body); // Adding the fixed leg body to the world
  }


  // BODIES CREATION - FOOT BODY
  if (this.s) {
    this.foot_x = this.leg_body.position.x + (this.leg_w / 2) + (this.foot_w / 2);
    this.foot_y = this.leg_body.position.y + (this.leg_h / 2) - (this.foot_h / 2);
    this.foot_body = Bodies.rectangle(this.foot_x, this.foot_y, this.foot_w, this.foot_h, foot_options);
    World.add(world, this.foot_body);
  }
  else {
    this.foot_x = this.leg_body.position.x - (this.leg_w / 2) - (this.foot_w / 2);
    this.foot_y = this.leg_body.position.y + (this.leg_h / 2) - (this.foot_h / 2);
    this.foot_body = Bodies.rectangle(this.foot_x, this.foot_y, this.foot_w, this.foot_h, foot_options);
    World.add(world, this.foot_body);
  }
  

  // CONSTRAINTS -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // CONSTRAINTS CREATION - CONSTRAINT BETWEEN MAIN BODY AND LEG BODY
  // Creating two vectors for each point of the constraint
  if (this.s) {
    this.cstr_A = Matter.Vector.create((this.main_w / 2) + 1, (this.main_h / 2) + 1);
    this.cstr_B = Matter.Vector.create((this.leg_w / 2), -(this.leg_h / 2));
  }
  else {
    this.cstr_A = Matter.Vector.create(-(this.main_w / 2) - 1, (this.main_h / 2) + 1);
    this.cstr_B = Matter.Vector.create(-(this.leg_w / 2), -(this.leg_h / 2));
  }
  

  // Creating options of constraint between main body and leg
  var cstr_options = {
    bodyA: this.main_body,
    bodyB: this.leg_body,
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
  if (this.s) {
    this.cstr_fixed_A = Matter.Vector.create(-(this.main_w / 2) - 1, (this.main_h / 2) + 1); // Bottom left of main body
    this.cstr_fixed_B = Matter.Vector.create(-(this.leg_fixed_w / 2), -(this.leg_fixed_h / 2));
    this.cstr_fixed2_A = Matter.Vector.create(-(this.main_w / 2) + (this.leg_fixed_w) - 1, (this.main_h / 2) + 1);
    this.cstr_fixed2_B = Matter.Vector.create((this.leg_fixed_w / 2), -(this.leg_fixed_h / 2));
  }
  else {
    this.cstr_fixed_A = Matter.Vector.create((this.main_w / 2) + 1, (this.main_h / 2) + 1); // Bottom right of main body
    this.cstr_fixed_B = Matter.Vector.create((this.leg_fixed_w / 2), -(this.leg_fixed_h / 2));
    this.cstr_fixed2_A = Matter.Vector.create((this.main_w / 2) - (this.leg_fixed_w) + 1, (this.main_h / 2) + 1);
    this.cstr_fixed2_B = Matter.Vector.create(-(this.leg_fixed_w / 2), -(this.leg_fixed_h / 2));
  }
  

  var cstr_fixed_options = {
    bodyA: this.main_body,
    bodyB: this.leg_fixed_body,
    pointA: this.cstr_fixed_A,
    pointB: this.cstr_fixed_B,
    length: 1,
    stiffness: 0,
    damping: 0
  }

  var cstr_fixed2_options = {
    bodyA: this.main_body,
    bodyB: this.leg_fixed_body,
    pointA: this.cstr_fixed2_A,
    pointB: this.cstr_fixed2_B,
    length: 1,
    stiffness: 0,
    damping: 0
  }
  this.cstr_fixed = Matter.Constraint.create(cstr_fixed_options);
  this.cstr_fixed2 = Matter.Constraint.create(cstr_fixed2_options);
  World.add(world, this.cstr_fixed);
  World.add(world, this.cstr_fixed2);

  // CONSTRAINTS CREATION - CONSTRAINTS BETWEEN LEG BODY AND FOOT BODY
  if (this.s) {
    this.cstr_foot_A = Matter.Vector.create((this.leg_w / 2) + 1, (this.leg_h / 2) + 1);
    this.cstr_foot_B = Matter.Vector.create(-(this.foot_w / 2), (this.foot_h / 2));
    this.cstr_foot2_A = Matter.Vector.create((this.leg_w / 2) + 1, (this.leg_h / 2) - this.foot_h + 1);
    this.cstr_foot2_B = Matter.Vector.create(-(this.foot_w / 2), -(this.foot_h / 2));
  }
  else {
    this.cstr_foot_A = Matter.Vector.create(-(this.leg_w / 2) - 1, (this.leg_h / 2) + 1);
    this.cstr_foot_B = Matter.Vector.create((this.foot_w / 2), (this.foot_h / 2));
    this.cstr_foot2_A = Matter.Vector.create(-(this.leg_w / 2) - 1, (this.leg_h / 2) - this.foot_h + 1);
    this.cstr_foot2_B = Matter.Vector.create((this.foot_w / 2), -(this.foot_h / 2));
  }
  
  var cstr_foot_options = {
    bodyA: this.leg_body,
    bodyB: this.foot_body,
    pointA: this.cstr_foot_A,
    pointB: this.cstr_foot_B,
    length: 1,
    stiffness: 0.99,
    damping: 0
  }

  var cstr_foot2_options = {
    bodyA: this.leg_body,
    bodyB: this.foot_body,
    pointA: this.cstr_foot2_A,
    pointB: this.cstr_foot2_B,
    length: 1,
    stiffness: 0.99,
    damping: 0
  }

  this.cstr_foot = Matter.Constraint.create(cstr_foot_options);
  this.cstr_foot2 = Matter.Constraint.create(cstr_foot2_options);

  World.add(world, this.cstr_foot);
  World.add(world, this.cstr_foot2);

  // NOT FINISHED
  // CONSTRAINTS CREATION - CONSTRAINT BETWEEN LEG BODY AND FIXED LEG BODY (ON THEIR BOTTOM CORNERS)
  /*if (this.s) {
    this.cstr_legs_A = Matter.Vector.create(-(this.leg_w / 2) - 1, (this.leg_h / 2) + 1);
    this.cstr_legs_B = Matter.Vector.create((this.leg_fixed_w / 2), (this.leg_fixed_h / 2));
  }
  else {
    this.cstr_legs_A = Matter.Vector.create((this.leg_w / 2) + 1, (this.leg_h / 2) + 1);
    this.cstr_legs_B = Matter.Vector.create(-(this.leg_fixed_w / 2), (this.leg_fixed_h / 2));
  }*/

  // CONSTRAINTS CREATION - 2ND TRY WITH CONSTRAINT BETWEEN CENTER OF BOTH BODIES
  this.cstr_legs_A = Matter.Vector.create(0, 0);
  this.cstr_legs_B = Matter.Vector.create(0, 0);

  //this.cstrLegsLength = Math.sqrt(((this.leg_h) ** 2) + ((this.leg_fixed_h) ** 2));
  this.cstrLegsLength = 0;

  var cstr_legs_options = {
    bodyA: this.leg_body,
    bodyB: this.leg_fixed_body,
    pointA: this.cstr_legs_A,
    pointB: this.cstr_legs_B,
    length: this.cstrLegsLength, // Options to be tweaked
    stiffness: 0.01, // Options to be tweaked
    damping: 0 // Options to be tweaked
  }

  this.cstr_legs = Matter.Constraint.create(cstr_legs_options);

  World.add(world, this.cstr_legs);

  // PUPPET (MAYBE SOON TO BE DELETED) ------------------------------------------------------------------------------------------------------------------------------------
  // CREATING A BODY THAT FOLLOWS THE PLAYER ON THE TOP OF THE CANVAS AND IS CONSTRAINED TO IT
  var puppet_options = {
    friction: 0.8,
    restitution: 0.1,
    angle: 0,
    angularSpeed: 0,
    angularVelocity: 0,
  }
  this.puppet_w = this.main_w;
  this.puppet_h = this.main_h;
  this.puppet_x = this.main_x;
  this.puppet_y = 100;
  this.puppet_body = Bodies.rectangle(this.puppet_x, this.puppet_y, this.puppet_w, this.puppet_h, puppet_options);
  World.add(world, this.puppet_body);

  this.cstr_puppet_A = Matter.Vector.create(0, 0);
  this.cstr_puppet_B = Matter.Vector.create(0, -(this.main_h / 2));

  var cstr_puppet_options = {
    bodyA: this.puppet_body,
    bodyB: this.main_body,
    pointA: this.cstr_puppet_A,
    pointB: this.cstr_puppet_B,
    length: CANVAS_HEIGHT - this.leg_h - this.main_h - 100, // TO BE RECALCULATED
    stiffness: 0.001,
    damping: 0,
  }

  this.cstr_puppet = Matter.Constraint.create(cstr_puppet_options);
  World.add(world, this.cstr_puppet);

  this.puppetFollow = function() {
    puppetPosition_x = this.main_body.position.x;
    puppetPosition_y = 0;
    puppetPosition = Matter.Vector.create(puppetPosition_x, puppetPosition_y);
    Body.setPosition(this.puppet_body, puppetPosition);
  }

  // JUMP FUNCTION (Working)
  this.jump = function() {
    var jumpForceTest = Matter.Vector.create(this.main_body.axes[0].x * -0.2, -this.main_body.axes[0].y * 0.2);
    Body.applyForce(this.main_body, this.main_body.position, jumpForceTest);
  }

  // NOT WORKING
  this.kick = function() {
    legRotationPoint = Matter.Vector.create(this.leg_body.position.x + (this.leg_w / 2), this.leg_body.position.y - (this.leg_h / 2));
    legForce = Matter.Vector.create(0.15, 0);
    Body.applyForce(this.leg_body, this.leg_body.position, legForce);
    //Body.rotate(this.leg_body, PI/2, legRotationPoint);
    
    // DEBUG
    push();
    translate(this.leg_body.position.x, this.leg_body.position.y);
    strokeWeight(4);
    stroke(0, 255, 0);
    line(0, 0, 400*legForce.x, 400*legForce.y);
    pop();
  }

  // GRAPHICS FUNCTION
  this.show = function() {
    // DRAWING MAIN BODY
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.main_body.position.x, this.main_body.position.y);
    rotate(this.main_body.angle);
    stroke(0);
    fill(255);
    rect(0, 0, this.main_w, this.main_h);
    pop();
    
    // DRAWING LEG
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.leg_body.position.x, this.leg_body.position.y);
    rotate(this.leg_body.angle);
    fill(255);
    rect(0, 0, this.leg_w, this.leg_h);
    pop();

    // DRAWING FIXED LEG
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.leg_fixed_body.position.x, this.leg_fixed_body.position.y);
    rotate(this.leg_fixed_body.angle);
    fill(255);
    rect(0, 0, this.leg_fixed_w, this.leg_fixed_h);
    pop();

    // DRAWING FOOT
    push();
    fill(255);
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.foot_body.position.x, this.foot_body.position.y);
    rotate(this.foot_body.angle);
    rect(0, 0, this.foot_w, this.foot_h);
    pop();
  }

  this.isOnGround = function() {

  }

  this.showDebug = function() {
    // DRAWING MAIN BODY
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.main_body.position.x, this.main_body.position.y);
    rotate(this.main_body.angle);
    stroke(0);
    fill(255, 0, 0);
    rect(0, 0, this.main_w, this.main_h);
    pop();
    
    // DRAWING LEG
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.leg_body.position.x, this.leg_body.position.y);
    rotate(this.leg_body.angle);
    fill(255, 0, 0);
    rect(0, 0, this.leg_w, this.leg_h);
    pop();

    // DRAWING FIXED LEG
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.leg_fixed_body.position.x, this.leg_fixed_body.position.y);
    rotate(this.leg_fixed_body.angle);
    fill(255, 0, 0);
    rect(0, 0, this.leg_fixed_w, this.leg_fixed_h);
    pop();

    // DRAWING FOOT
    push();
    fill(255, 0, 0);
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.foot_body.position.x, this.foot_body.position.y);
    rotate(this.foot_body.angle);
    rect(0, 0, this.foot_w, this.foot_h);
    pop();

    // DRAWING AXES OF THE MAIN BODY
    push();
    translate(this.main_body.position.x, this.main_body.position.y);
    strokeWeight(4);
    stroke(0, 255, 0);
    line(0, 0, 40*this.main_body.axes[0].x, 40*this.main_body.axes[0].y);
    stroke(0);
    line(0, 0, 40*this.main_body.axes[1].x, 40*this.main_body.axes[1].y);
    pop();

    // DRAWING POINT A OF MOVABLE CONSTRAINT
    push();
    strokeWeight(8);
    stroke(0, 0, 0);
    this.cstrAbs_Ax = this.main_body.position.x + this.cstr_A.x;
    this.cstrAbs_Ay = this.main_body.position.y + this.cstr_A.y;
    point(this.cstrAbs_Ax, this.cstrAbs_Ay);
    
    // DRAWING POINT B OF CONSTRAINT
    pop();
    push();
    strokeWeight(8);
    stroke(0, 0, 0);
    this.cstrAbs_Bx = this.leg_body.position.x + this.cstr_B.x;
    this.cstrAbs_By = this.leg_body.position.y + this.cstr_B.y;
    point(this.cstrAbs_Bx, this.cstrAbs_By);
    pop();

    // DRAWING FIRST CONSTRAINT OF FIXED LEG
    push();
    strokeWeight(8);
    stroke(255, 0, 0);
    this.cstrAbs_fixed_Ax = this.main_body.position.x + this.cstr_fixed_A.x;
    this.cstrAbs_fixed_Ay = this.main_body.position.y + this.cstr_fixed_A.y;
    point(this.cstrAbs_fixed_Ax, this.cstrAbs_fixed_Ay);
    pop();

    push();
    strokeWeight(8);
    stroke(255, 255, 0);
    this.cstrAbs_fixed_Bx = this.leg_fixed_body.position.x + this.cstr_fixed_B.x;
    this.cstrAbs_fixed_By = this.leg_fixed_body.position.y + this.cstr_fixed_B.y;
    point(this.cstrAbs_fixed_Bx, this.cstrAbs_fixed_By);
    pop();

    // DRAWING SECOND CONSTRAINT OF FIXED LEG
    push();
    strokeWeight(8);
    stroke(0, 255, 0);
    this.cstrAbs_fixed2_Ax = this.main_body.position.x + this.cstr_fixed2_A.x;
    this.cstrAbs_fixed2_Ay = this.main_body.position.y + this.cstr_fixed2_A.y;
    point(this.cstrAbs_fixed2_Ax, this.cstrAbs_fixed2_Ay);
    pop();

    push();
    strokeWeight(8);
    stroke(0, 255, 0);
    this.cstrAbs_fixed2_Bx = this.leg_fixed_body.position.x + this.cstr_fixed2_B.x;
    this.cstrAbs_fixed2_By = this.leg_fixed_body.position.y + this.cstr_fixed2_B.y;
    point(this.cstrAbs_fixed2_Bx, this.cstrAbs_fixed2_By);
    pop();

    // DRAWING FIRST CONSTRAINT OF FOOT
    push();
    strokeWeight(8);
    stroke(255, 255, 255);
    this.cstrAbs_foot_Ax = this.leg_body.position.x + this.cstr_foot_A.x;
    this.cstrAbs_foot_Ay = this.leg_body.position.y + this.cstr_foot_A.y;
    point(this.cstrAbs_foot_Ax, this.cstrAbs_foot_Ay);
    pop();

    push();
    strokeWeight(8);
    stroke(255, 255, 255);
    this.cstrAbs_foot_Bx = this.foot_body.position.x + this.cstr_foot_B.x;
    this.cstrAbs_foot_By = this.foot_body.position.y + this.cstr_foot_B.y;
    point(this.cstrAbs_foot_Bx, this.cstrAbs_foot_By);
    pop();

    // DRAWING PUPPET
    push();
    rectMode(CENTER);
    angleMode(RADIANS);
    translate(this.puppet_body.position.x, this.puppet_body.position.y);
    rotate(this.puppet_body.angle);
    stroke(0);
    fill(255, 0, 0);
    rect(0, 0, this.puppet_w, this.puppet_h);
    pop();

    // DRAWING CONSTRAINT OF PUPPET
    push();
    strokeWeight(8);
    stroke(255, 255, 255);
    this.cstrAbs_puppet_Ax = this.puppet_body.position.x + this.cstr_puppet_A.x;
    this.cstrAbs_puppet_Ay = this.puppet_body.position.y + this.cstr_puppet_A.y;
    point(this.cstrAbs_puppet_Ax, this.cstrAbs_puppet_Ay);
    pop();

    push();
    strokeWeight(8);
    stroke(255, 255, 255);
    this.cstrAbs_puppet_Bx = this.main_body.position.x + this.cstr_puppet_B.x;
    this.cstrAbs_puppet_By = this.main_body.position.y + this.cstr_puppet_B.y;
    point(this.cstrAbs_puppet_Bx, this.cstrAbs_puppet_By);
    pop();

    push();
    strokeWeight(4);
    stroke(255, 255, 255);
    line(this.cstrAbs_puppet_Ax, this.cstrAbs_puppet_Ay, this.cstrAbs_puppet_Bx, this.cstrAbs_puppet_By);
    pop();

    // DRAWING CONSTRAINT BETWEEN LEG BODY AND LEG FIXED BODY
    push();
    strokeWeight(8);
    stroke(80);
    this.cstrAbs_legs_Ax = this.leg_body.position.x + this.cstr_legs_A.x;
    this.cstrAbs_legs_Ay = this.leg_body.position.y + this.cstr_legs_A.y;
    point(this.cstrAbs_legs_Ax, this.cstrAbs_legs_Ay);
    pop();

    push();
    strokeWeight(8);
    stroke(80);
    this.cstrAbs_legs_Bx = this.leg_fixed_body.position.x + this.cstr_legs_B.x;
    this.cstrAbs_legs_By = this.leg_fixed_body.position.y + this.cstr_legs_B.y;
    point(this.cstrAbs_legs_Bx, this.cstrAbs_legs_By);
    pop();

    push();
    strokeWeight(4);
    stroke(80);
    line(this.cstrAbs_legs_Ax, this.cstrAbs_legs_Ay, this.cstrAbs_legs_Bx, this.cstrAbs_legs_By);
    pop();
  }
}
// EXPLANATIONS
// Player is comprised of :
// - Main body
// - Leg body (the movable leg)
// - Fixed leg body
// - Foot body
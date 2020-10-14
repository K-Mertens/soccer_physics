function main_debug() {

  Engine.update(engine);
  background(0, 100, 255);

  // SCORE LOGIC - OK
  gameScore.scoreCheck(ball, goal1, goal2);
  gameScore.show();
  
  // TIMER - OK IT IS WORKING
  gameTimer.timerTick();
  gameTimer.show();
  
  push();
  fill(0);
  textSize(20);
  stroke(0, 0, 0);
  text('Press ESC key to return to menu', ((CANVAS_WIDTH  * 6) / 7), 30);
  pop();

	ball.show();
  ground.show();

  goal1.show();
  goal2.show();

  player1_def.show();
  player1_def.puppetFollow();
  player1_def.showDebug();

  player1_atk.show();
  player1_atk.puppetFollow();
  player1_atk.showDebug();

  player2_def.show();
  player2_def.puppetFollow();
  player2_def.showDebug();

  player2_atk.show();
  player2_atk.puppetFollow();
  player2_atk.showDebug();

  // CONTROLS
  if (keyIsDown(RIGHT_ARROW)){
    push();
    var jumpForceTest = Matter.Vector.create(player2_def.main_body.axes[0].x * -0.2, -player2_def.main_body.axes[0].y * 0.2);
    text('Key Pressed', (CANVAS_WIDTH / 2), CANVAS_HEIGHT/2);
    translate(player2_def.main_body.position.x, player2_def.main_body.position.y);
    strokeWeight(4);
    stroke(255, 255, 255);
    line(0, 0, jumpForceTest.x*1000, jumpForceTest.y*1000);
    pop();
  }

  if (keyIsDown(LEFT_ARROW)){
    push();
    var jumpForceTest2 = Matter.Vector.create(player2_atk.main_body.axes[0].x * -0.2, -player2_atk.main_body.axes[0].y * 0.2);
    text('Key Pressed', (CANVAS_WIDTH / 2), CANVAS_HEIGHT/2);
    translate(player2_atk.main_body.position.x, player2_atk.main_body.position.y);
    strokeWeight(4);
    stroke(255, 255, 255);
    line(0, 0, jumpForceTest2.x*1000, jumpForceTest2.y*1000);
    pop();

    // KICK TEST
    // *****************************************************************************************************************
    // I HAVE AN IDEA FOR THE KICK FUNCTION : ADD A CONSTRAINT BETWEEN THE FIXED LEG AND THE BACK OF THE MOVABLE LEG !!!
    // *****************************************************************************************************************

    //var kickForceX = Math.cos((PI / 2) * player2_atk.leg_body.axes[0].x) - Math.sin((PI /2) * player2_atk.leg_body.axes[0].y);
    //var kickForceY = Math.sin((PI / 2) * player2_atk.leg_body.axes[0].x) + Math.cos((PI /2) * player2_atk.leg_body.axes[0].y);
    var kickForceX = -player2_atk.leg_body.axes[1].x; // BEWARE !!! THIS HAS TO HAVE A POSITIVE SIGN FOR THE PLAYER 1
    var kickForceY = -player2_atk.leg_body.axes[1].y; // BEWARE !!! THIS HAS TO HAVE A POSITIVE SIGN FOR THE PLAYER 1
    var kickForce = Matter.Vector.create(kickForceX * -0.01, kickForceY * -0.01);
    //if (player2_atk.leg_body.angle < (PI / 2) % (2 * PI)) {
      if (player2_atk.leg_body.angle < (PI / 2)) {
      Body.applyForce(player2_atk.leg_body, player2_atk.leg_body.position, kickForce);
    }
    

    push();
    text('Key Pressed', (CANVAS_WIDTH / 2), CANVAS_HEIGHT/2);
    translate(player2_atk.leg_body.position.x, player2_atk.leg_body.position.y);
    strokeWeight(4);
    stroke(0);
    line(0, 0, kickForce.x*5000, kickForce.y*5000);
    pop();
  }

  // ********************************************************************************************************************************
  // DO NOT FORGET : WHEN RESETTING PLAYERS, use this function to get rid of the previous players : Matter.World.remove(world, body);
  // ********************************************************************************************************************************

  // DEBUG -------------------------------------------------------------------------------------------------------------------------------------------------------------
  player1_defBodyGroundColl = Matter.SAT.collides(player1_def.main_body, ground.body);
  player1_defLeftLegGroundColl = Matter.SAT.collides(player1_def.leg_fixed_body, ground.body);
  player1_defRightLegGroundColl = Matter.SAT.collides(player1_def.leg_body, ground.body);
  player1_defFootGroundColl = Matter.SAT.collides(player1_def.foot_body, ground.body);

  isplayer1_defBodyOnGround = player1_defBodyGroundColl.collided;
  isplayer1_defLeftLegOnGround = player1_defLeftLegGroundColl.collided;
  isplayer1_defRightLegOnGround = player1_defRightLegGroundColl.collided;
  isplayer1_defFootOnGround = player1_defFootGroundColl.collided;

  isplayer1_defOnGround = isplayer1_defBodyOnGround || isplayer1_defLeftLegOnGround || isplayer1_defRightLegOnGround || isplayer1_defFootOnGround;
  
  /*document.getElementById("player1_def_x").innerHTML = Math.round(player1_def.main_body.position.x);
  document.getElementById("player1_def_y").innerHTML = Math.round(player1_def.main_body.position.y);
  document.getElementById("player1_atk_x").innerHTML = Math.round(player1_atk.main_body.position.x);
  document.getElementById("player1_atk_y").innerHTML = Math.round(player1_atk.main_body.position.y);*/
  document.getElementById("player1_def_x").innerHTML = Math.round(player1_def.main_body.position.x);
  document.getElementById("player1_def_y").innerHTML = Math.round(player1_def.main_body.position.y);
  document.getElementById("player1_def_angle").innerHTML = Math.round((player1_def.main_body.angle * 180) / PI);
  document.getElementById("isplayer1_defBodyOnGround").innerHTML = isplayer1_defBodyOnGround;
  document.getElementById("isplayer1_defLeftLegOnGround").innerHTML = isplayer1_defLeftLegOnGround;
  document.getElementById("isplayer1_defRightLegOnGround").innerHTML = isplayer1_defRightLegOnGround;
  document.getElementById("isplayer1_defFootOnGround").innerHTML = isplayer1_defFootOnGround;
  document.getElementById("isplayer1_defOnGround").innerHTML = isplayer1_defOnGround;

  document.getElementById("jumpForce_x").innerHTML = jumpForce2.x;
  document.getElementById("jumpForce_y").innerHTML = jumpForce2.y;

  document.getElementById("player1_def_vertical_axis_x").innerHTML = Math.round(player1_def.main_body.axes[0].x * 1000) / 1000;
  document.getElementById("player1_def_vertical_axis_y").innerHTML = Math.round(player1_def.main_body.axes[0].y * 1000) / 1000;
  document.getElementById("player1_def_horizontal_axis_x").innerHTML = Math.round(player1_def.main_body.axes[1].x * 1000) / 1000;
  document.getElementById("player1_def_horizontal_axis_y").innerHTML = Math.round(player1_def.main_body.axes[1].y * 1000) / 1000;

  }
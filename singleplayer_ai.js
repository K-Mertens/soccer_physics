// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : singleplayer_ai.js
// Description : Contains the AI algorithm(s) for the bot player in single player mode
// ************************************************

class SinglePlayerAI {
  constructor(previousTimingAI, randTimingAI, choosePlayerAI) {
    this.previousTimingAI = previousTimingAI;
    this.randTimingAI = randTimingAI;
    this.choosePlayerAI = choosePlayerAI;
  }

  tickAI(playerDef, playerAtk) {
    if (frameCount - this.previousTimingAI >= this.randTimingAI) {
      if (this.choosePlayerAI <= 0.1) {
        if (playerDef.isOnGround(ground)) {
          playerDef.cstrLegs.stiffness = 0.00001;
          playerDef.kick(kickForceCoeff);
          playerDef.jump();
          playerDef.cstrLegs.stiffness = 0.06;
          //console.log("playerDef jumped");
          //console.log(playerDef.isOnGround(ground));
        }
      }
      if (this.choosePlayerAI > 0.1 && this.choosePlayerAI <= 0.8) {
        if (playerAtk.isOnGround(ground)) {
          playerAtk.cstrLegs.stiffness = 0.00001;
          playerAtk.kick(kickForceCoeff);
          playerAtk.jump();
          playerAtk.cstrLegs.stiffness = 0.06;
        }
      }
      else {
        if (playerAtk.isOnGround(ground) && playerDef.isOnGround(ground)) {
          playerDef.cstrLegs.stiffness = 0.00001;
          playerDef.kick(kickForceCoeff);
          playerDef.jump();
          playerDef.cstrLegs.stiffness = 0.06;
          playerAtk.cstrLegs.stiffness = 0.00001;
          playerAtk.kick(kickForceCoeff);
          playerAtk.jump();
          playerAtk.cstrLegs.stiffness = 0.06;
        }
      }
      this.randTimingAI = random(lowerBoundTimingAI, upperBoundTimingAI);
      this.choosePlayerAI = random(0.0, 1.0);
      this.previousTimingAI = frameCount;
    }
  }

  // LITTLE FUNNY TEST FOR AI (aimed for player 2)
  /*this.AItest = function(playerDef, playerAtk) {
    if (playerAtk.isOnGround(ground)) {
      if (mouseY >= CANVAS_HEIGHT - playerAtk.mainBody.position.x) {
        if (mouseX <= playerAtk.mainBody.position.x - 10) {
          playerAtk.kick();
          playerAtk.jump();
        }
      }
    }
    if (playerDef.isOnGround(ground)) {
      if (mouseY >= CANVAS_HEIGHT - playerDef.mainBody.position.x) {
        if (mouseX <= playerDef.mainBody.position.x - 10) {
          playerDef.kick();
          playerDef.jump();
        }
      }
    }
  }*/
}
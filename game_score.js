// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : game_score.js
// Description : Game score class used for keeping track of the score
// ************************************************

class GameScore {
  constructor() {
    // ATTRIBUTES
    this.score1 = 0;
    this.score2 = 0;
    this.previousFrameCount = 0;
    this.sloMo = false;
  }

  // METHODS
  scoreCheck(ball, goal1, goal2) {
    // Player 1 scores
    if (ball.body.position.x - ball.r >= CANVAS_WIDTH - goal2.areaWidth + (goal2.botBarW / 2) && ball.body.position.y >= CANVAS_HEIGHT - goal2.areaHeight) {
      if (!this.sloMo) {
        this.previousFrameCount = frameCount;
        frameRate(20);
        this.score1 = this.score1 + 1;
        this.sloMo = true;
        console.log('Entering slow mo')
      }

      // Putting this here is not the best solution since the text will disappear if the ball goes out the goal during SloMo
      push();
      textSize(80);
      //rotateX((frameCount - this.previousFrameCount));
      //rotateZ((frameCount - this.previousFrameCount) * 0.85);
      text('GOAL', CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
      pop();
    }

    if(frameCount - this.previousFrameCount >= 40 && this.sloMo == true) {
      gameManager.resetPlayers();
      gameManager.resetBall();
      this.previousFrameCount = frameCount;
      frameRate(60);
      this.sloMo = false;
      console.log('Slow mo reset');
    } 

    // Ball is out of right of canvas
    else if (ball.body.position.x >= CANVAS_WIDTH + ball.r) {
      gameManager.resetPlayers();
      gameManager.resetBall();
    }
    // Player 2 scores
    if (ball.body.position.x + ball.r <= goal1.areaWidth - goal1.botBarW && ball.body.position.y >= CANVAS_HEIGHT - goal1.areaHeight) {
      if (!this.sloMo) {
        this.previousFrameCount = frameCount;
        frameRate(20);
        this.score2 = this.score2 + 1;
        this.sloMo = true;
        console.log('Entering slo mo');
      }
      // Putting this here is not the best solution since the text will disappear if the ball goes out the goal during SloMo
      push();
      textSize(80);
      //rotateX((frameCount - this.previousFrameCount));
      //rotateZ((frameCount - this.previousFrameCount) * 0.85);
      text('GOAL', CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
      pop();
    }

    if(frameCount - this.previousFrameCount >= 40 && this.sloMo == true) {
      gameManager.resetPlayers();
      gameManager.resetBall();
      this.previousFrameCount = frameCount;
      frameRate(60);
      this.sloMo = false;
      console.log('Slow mo reset');
    } 

    // Ball is out of left of canvas
    else if (ball.body.position.x <= 0 - ball.r) {
      gameManager.resetPlayers();
      gameManager.resetBall();
    }
  }

  // DRAWING FUNCTION
  show() {
    push();
    textSize(90);
    stroke(0);
    fill(255);
    text(this.score1 + ' - ' + this.score2, (CANVAS_WIDTH / 2), 100);
    pop();
  }
}
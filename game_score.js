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
  }

  // METHODS
  scoreCheck(ball, goal1, goal2) {
    // Player 1 scores
    if (ball.body.position.x - ball.r >= CANVAS_WIDTH - goal2.areaWidth + (goal2.botBarW / 2) && ball.body.position.y >= CANVAS_HEIGHT - goal2.areaHeight) {
      this.score1 = this.score1 + 1;
      gameManager.resetPlayers();
      gameManager.resetBall();
    }

    // Ball is out of right of canvas
    else if (ball.body.position.x >= CANVAS_WIDTH + ball.r) {
      gameManager.resetPlayers();
      gameManager.resetBall();
    }
    // Player 2 scores
    if (ball.body.position.x + ball.r <= goal1.areaWidth - goal1.botBarW && ball.body.position.y >= CANVAS_HEIGHT - goal1.areaHeight) {
      this.score2 = this.score2 + 1;
      gameManager.resetPlayers();
      gameManager.resetBall();
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
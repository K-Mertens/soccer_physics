// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : game_manager.js
// Description : Manager for the various parameters of the game
// ************************************************

class GameManager {
  constructor() {
    this.player1DefOptions = null;
    this.player1AtkOptions = null;
    this.player2DefOptions = null;
    this.player2AtkOptions = null;
    this.ballOptions = null;
    this.goal1Options = null;
    this.goal2Options = null;
  }

  init() {
    this.player1DefOptions = {
      startPosX: CANVAS_WIDTH * 0.214,
      startPosY: CANVAS_HEIGHT * 5 / 7,
      mainWidth: CANVAS_WIDTH / 28,
      mainHeight: CANVAS_HEIGHT / 7.778,
      legX: 0,
      legY: 0,
      legWidth: CANVAS_WIDTH / 56,
      legHeight: (CANVAS_HEIGHT / 7.778 * 2) / 3,
      legFixedX: 0,
      legFixedY: 0,
      legFixedWidth: CANVAS_WIDTH / 56,
      legFixedHeight: (CANVAS_HEIGHT / 7.778 * 2) / 3,
      isPlayer1: true,
      playerBody: Math.floor(Math.random() * 5),
    };

    this.player1AtkOptions = {
      startPosX: CANVAS_WIDTH * 0.429,
      startPosY: CANVAS_HEIGHT * 5 / 7,
      mainWidth: CANVAS_WIDTH / 28,
      mainHeight: CANVAS_HEIGHT / 7.778,
      legX: 0,
      legY: 0,
      legWidth: CANVAS_WIDTH / 56,
      legHeight: (CANVAS_HEIGHT / 7.778 * 2) / 3,
      legFixedX: 0,
      legFixedY: 0,
      legFixedWidth: CANVAS_WIDTH / 56,
      legFixedHeight: (CANVAS_HEIGHT / 7.778 * 2) / 3,
      isPlayer1: true,
      playerBody: Math.floor(Math.random() * 5),
    };

    this.player2DefOptions = {
      startPosX: CANVAS_WIDTH * 0.768,
      startPosY: CANVAS_HEIGHT * 5 / 7,
      mainWidth: CANVAS_WIDTH / 28,
      mainHeight: CANVAS_HEIGHT / 7.778,
      legX: 0,
      legY: 0,
      legWidth: CANVAS_WIDTH / 56,
      legHeight: (CANVAS_HEIGHT / 7.778 * 2) / 3,
      legFixedX: 0,
      legFixedY: 0,
      legFixedWidth: CANVAS_WIDTH / 56,
      legFixedHeight: (CANVAS_HEIGHT / 7.778 * 2) / 3,
      isPlayer1: false,
      playerBody: Math.floor(Math.random() * 5),
    };

    this.player2AtkOptions = {
      startPosX: CANVAS_WIDTH * 0.571,
      startPosY: CANVAS_HEIGHT * 5 / 7,
      mainWidth: CANVAS_WIDTH / 28,
      mainHeight: CANVAS_HEIGHT / 7.778,
      legX: 0,
      legY: 0,
      legWidth: CANVAS_WIDTH / 56,
      legHeight: (CANVAS_HEIGHT / 7.778 * 2) / 3,
      legFixedX: 0,
      legFixedY: 0,
      legFixedWidth: CANVAS_WIDTH / 56,
      legFixedHeight: (CANVAS_HEIGHT / 7.778 * 2) / 3,
      isPlayer1: false,
      playerBody: Math.floor(Math.random() * 5),
    };

    this.ballOptions = {
      startPosX: CANVAS_WIDTH / 2,
      startPosY: CANVAS_HEIGHT / 4,
      radius: 25,
      friction: 0.01,
      restitution: 0.60,
      density: 0.00005,
      // Default is 0.05
      slop: 0.3,
      collisionFilter: {
        category: generalCollCategory,
        mask: generalCollCategory | groundCollCategory
      }
    };

    this.goal1Options = {
      areaWidth: CANVAS_WIDTH / 9.333,
      areaHeight: CANVAS_HEIGHT / 1.75,
      topBarX: 0,
      topBarY: CANVAS_HEIGHT - (CANVAS_HEIGHT / 1.75),
      topBarWidth: CANVAS_WIDTH / 9.333,
      topBarHeight: CANVAS_HEIGHT / 72,
      bottomBarX: 0,
      bottomBarY: (CANVAS_HEIGHT - ((CANVAS_HEIGHT / 1.75) / 2)),
      bottomBarWidth: CANVAS_WIDTH / 128,
      bottomBarHeight: CANVAS_HEIGHT / 1.75,
      isGoal1: true,
      collisionFilter: {
        category: generalCollCategory,
        mask: generalCollCategory
      },
      isStatic: true,
    };

    this.goal2Options = {
      areaWidth: CANVAS_WIDTH / 9.333,
      areaHeight: CANVAS_HEIGHT / 1.75,
      topBarX: 0,
      topBarY: CANVAS_HEIGHT - (CANVAS_HEIGHT / 1.75),
      topBarWidth: CANVAS_WIDTH / 9.333,
      topBarHeight: CANVAS_HEIGHT / 72,
      bottomBarX: 0,
      bottomBarY: (CANVAS_HEIGHT - ((CANVAS_HEIGHT / 1.75) / 2)),
      bottomBarWidth: CANVAS_WIDTH / 128,
      bottomBarHeight: CANVAS_HEIGHT / 1.75,
      isGoal1: false,
      collisionFilter: {
        category: generalCollCategory,
        mask: generalCollCategory
      },
      isStatic: true,
    };
  }

  resetPlayers() {
    Matter.World.remove(world, player1Def.getPlayerBodiesList());
    Matter.World.remove(world, player1Atk.getPlayerBodiesList());
    Matter.World.remove(world, player2Def.getPlayerBodiesList());
    Matter.World.remove(world, player2Atk.getPlayerBodiesList());

    Matter.World.remove(world, player1Def.getPlayerConstraintsList());
    Matter.World.remove(world, player1Atk.getPlayerConstraintsList());
    Matter.World.remove(world, player2Def.getPlayerConstraintsList());
    Matter.World.remove(world, player2Atk.getPlayerConstraintsList());

    player1Def = new Player(this.player1DefOptions);
    player1Atk = new Player(this.player1AtkOptions);
    player2Atk = new Player(this.player2AtkOptions);
    player2Def = new Player(this.player2DefOptions);
  }

  resetBall() {
    var randBallX;
    var randBallY;
    var randBallVelocityX;
    var randBallVelocityY;
    var randBallForceX;
    var randBallForceY;
    randBallX = random(((CANVAS_WIDTH / 2) - 100), ((CANVAS_WIDTH / 2) + 100));
    randBallY = random(((CANVAS_HEIGHT / 2) - 50), ((CANVAS_HEIGHT / 2) + 50));
    randBallVelocityX = 0;
    randBallVelocityY = 0;
    randBallForceX = 0;
    randBallForceY = 0;
    var randBallPos = Matter.Vector.create(randBallX, randBallY);
    var randBallVelocity = Matter.Vector.create(randBallVelocityX, randBallVelocityY);
    var randBallForce = Matter.Vector.create(randBallForceX, randBallForceY);

    // Set ball at random location in the middle + reset its velocity and acceleration
    Matter.Body.setPosition(ball.body, randBallPos);
    Matter.Body.setVelocity(ball.body, randBallVelocity);
    Matter.Body.applyForce(ball.body, ball.body.position, randBallForce);
  }
}
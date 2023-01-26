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
      startPosX: P1D_POS_X,
      isPlayer1: true,
      playerBody: Math.floor(Math.random() * 7)
    };

    this.player1AtkOptions = {
      startPosX: P1A_POS_X,
      isPlayer1: true,
      playerBody: Math.floor(Math.random() * 7)
    };

    this.player2DefOptions = {
      startPosX: P2D_POS_X,
      playerBody: Math.floor(Math.random() * 7)
    };

    this.player2AtkOptions = {
      startPosX: P2A_POS_X,
      playerBody: Math.floor(Math.random() * 7)
    };

    this.ballOptions = {
      startPosX: CANVAS_WIDTH / 2,
      startPosY: CANVAS_HEIGHT / 4,
      radius: CANVAS_WIDTH / 51.2,
      friction: 0.01,
      restitution: 0.95,
      density: 0.00005,
      // Default is 0.05
      slop: 0.3,
      collisionFilter: {
        category: generalCollCategory,
        mask: generalCollCategory | groundCollCategory
      }
    };

    this.goal1Options = {
      isGoal1: true,
      collisionFilter: {
        category: generalCollCategory,
        mask: generalCollCategory
      },
      isStatic: true,
    };

    this.goal2Options = {
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
    // As I changed Players' start position according to "factor 6", I keep it here to make it centered with the same logic.
	  // Ball appears randonmly between second half of 3/6 and first hald of 4/6 -> P1def 1/6, P1atk 2/6, P2atk 4/6, and P2def 5/6
    randBallX = random((CANVAS_WIDTH / 6 * 2.5), (CANVAS_WIDTH / 6 * 3.5));
    randBallY = random(((CANVAS_HEIGHT / 2) - 50), ((CANVAS_HEIGHT / 2) + 50));
    randBallVelocityX = 0;
    randBallVelocityY = 0;
    randBallForceX = random(-0.002, 0.002);
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

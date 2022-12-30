// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : sketch.js
// Description : Constants declaration, variables initialization, setup, animation loop and mouse / keys events
// ************************************************

// Matter.js module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;
    Render = Matter.Render;

// Matter.js variables
var engine;
var world;
var ground;

// CONSTANTS
// Canvas dimensions
let CANVAS_WIDTH = 1280; // Default 1280
let CANVAS_HEIGHT = 720; // Default 720

// Menus states
let MAIN_MENU = 0;
let P1_LOCAL_CHOOSE_SIDE_MENU = 1;
let P2_LOCAL_SELECTED = 2;
let P2_ONLINE_MENU = 3;
let P1_LOCAL_LEFT_SELECTED = 4;
let P1_LOCAL_RIGHT_SELECTED = 5;
let P2_ONLINE_CREATE_MENU = 6;
let P2_ONLINE_JOIN_MENU = 7;

// Collision categories
var generalCollCategory = 0x0001, // Used for all parts of player except counterweight, ball and goal
    generalNoCollCategory = 0x0002, // Used only for the counterweight of players (and also foot)
    groundCollCategory = 0x0004; // Used for ground

// INITIALIZATION VARIABLES
// Menus states
let menu = MAIN_MENU;

// Elements dimensions
let groundWidth = CANVAS_WIDTH;
let groundHeight = 100; // Has to be a big arbitrary number because of the unknown surrounding the inner computing time of the Matter.js engine
let groundOffset = 6;
let groundX = CANVAS_WIDTH / 2;
let groundY = CANVAS_HEIGHT - groundHeight / 2;
let menuButtonWidth = CANVAS_WIDTH / 5;
let menuButtonHeight = CANVAS_HEIGHT / 10;

// Score and timer initialisation
let score1 = 0;
let score2 = 0;
let elapsedTimeSec = 0;
let elapsedTimeMin = 0;

// Coefficient that is applied to the tiltForce vector that is derived from the axes[1] vector of the player
let tiltForceCoeff = 0.007;

// Coefficient that is applied to the kickForce vector that is perpendicular to the movable leg of the players
let kickForceCoeff = 0.0018;

// Coefficient that is applied to the jumpForce vector
let jumpForceCoeff = 0.55; // 0.5 works

// Stiffness of the players movable leg when the kick function is no more engaged
let idleLegStiffness = 0.1; // Previously 0.06

// Sprites handles
let background0;
let spriteSoccerBall;
let spritePlayerMainBodies = [];

// Used for the temporisation of the game AI
var lowerBoundTimingAI = 15;
var upperBoundTimingAI = 35;
var previousTimingAI = 0;
var choosePlayerAI = 0;
var randTimingAI = 0;

// Socket for online multiplayer
var socket;

// Assets preload
function preload() {
  background0 = loadImage('assets/0_background.png');
  spriteSoccerBall = loadImage('assets/sprite_soccer_ball.png');
  spritePlayerMainBodies[0] = loadImage('assets/sprite_player_main_body0.png');
  spritePlayerMainBodies[1] = loadImage('assets/sprite_player_main_body1.png');
  spritePlayerMainBodies[2] = loadImage('assets/sprite_player_main_body2.png');
  spritePlayerMainBodies[3] = loadImage('assets/sprite_player_main_body3.png');
  spritePlayerMainBodies[4] = loadImage('assets/sprite_player_main_body4.png');
  spritePlayerLeg0 = loadImage('assets/sprite_player_leg0.png');
}

// Entry point of code
function setup() {
  // Canvas creation
  canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.parent('sketch-holder');

  // Draw background
  image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Matter.js engine creation
  engine = Engine.create();

  // Matter.js renderer creation - COMMENT FROM HERE...
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      showAxes: true,
      showConvexHulls: true,
      showInternalEdges: true,
      showVelocity: true,
      showDebug: true,
      showAngleIndicator: true
    }
  });

  Render.run(render);
  // ... TO HERE TO GET RID OF THE RENDERER

  // Socket connection
  //socket = io.connect('http://localhost:3000');

  //Engine.run(engine);
  world = engine.world;

  // INSTANCIATIONS
  gameManager = new GameManager();
  gameManager.init();
  gameMenus = new GameMenus();

  ground = new Ground(CANVAS_WIDTH / 2, (CANVAS_HEIGHT +  (groundHeight / 2) - groundOffset), groundWidth, groundHeight, 0);
  ball = new Ball(gameManager.ballOptions);

  player1Def = new Player(gameManager.player1DefOptions);
  player1Atk = new Player(gameManager.player1AtkOptions);
  goal1 = new Goal(gameManager.goal1Options);

  player2Atk = new Player(gameManager.player2AtkOptions);
  player2Def = new Player(gameManager.player2DefOptions);
  goal2 = new Goal(gameManager.goal2Options);

  gameTimer = new GameTimer(elapsedTimeSec, elapsedTimeMin);
  gameScore = new GameScore();
  singlePlayerAILeft = new SinglePlayerAI(previousTimingAI, randTimingAI, choosePlayerAI);
  singlePlayerAIRight = new SinglePlayerAI(previousTimingAI, randTimingAI, choosePlayerAI);

  world.gravity.y = 1;
  randTimingAI = random(lowerBoundTimingAI, upperBoundTimingAI);
  choosePlayerAI = random(0.0, 1.0);
}

// p5.js animation loop
function draw() {
  gameMenus.logic();
}	

// EVENT FUNCTIONS
function mouseClicked() {
  gameMenus.clickedOn(menu);
}

// DEBUG
function doubleClicked() {
  gameManager.resetBall();
  Matter.Body.setPosition(ball.body, Matter.Vector.create(mouseX, mouseY));
}

function keyPressed() {
  if (keyCode == 65) {
    if (menu == P1_LOCAL_LEFT_SELECTED || menu == P2_LOCAL_SELECTED) {
      if (player1Def.isOnGround(ground)) {
        player1Def.jump();
        liftBall(player1Def);
      }
    }
  }

  if (keyCode == 68) {
    if (menu == P1_LOCAL_LEFT_SELECTED || menu == P2_LOCAL_SELECTED) {
      if (player1Atk.isOnGround(ground)) {
        player1Atk.jump();
        liftBall(player1Atk);
      }
    } 
  }

  if (keyCode == RIGHT_ARROW) {
    if (menu == P1_LOCAL_RIGHT_SELECTED || menu == P2_LOCAL_SELECTED) {
      if (player2Def.isOnGround(ground)) {
    	player2Def.jump();
      liftBall(player2Def);
      }
    }
  }

  if (keyCode == LEFT_ARROW) {
    if (menu == P1_LOCAL_RIGHT_SELECTED || menu == P2_LOCAL_SELECTED) {
      if (player2Atk.isOnGround(ground)) {
        player2Atk.jump();
        liftBall(player2Atk);
      }
    }
  }

  // TEST apply force on ball
  if (keyCode == 69){
    if (menu == P1_LOCAL_RIGHT_SELECTED || menu == P1_LOCAL_LEFT_SELECTED || menu == P2_LOCAL_SELECTED) {
      Body.applyForce(ball.body, ball.body.position, Matter.Vector.create(0,-0.005));
      console.log("coucou");
      Body.applyForce(ball.body, ball.body.position, Matter.Vector.create(0,0));
    }
  }
}

function keyReleased() {
  if (menu == P1_LOCAL_LEFT_SELECTED || menu == P2_LOCAL_SELECTED) {
    if (keyCode == 65) {
      player1Def.cstrLegs.stiffness = idleLegStiffness;
    }
    if (keyCode == 68) {
		  player1Atk.cstrLegs.stiffness = idleLegStiffness;
    }
  }

  if (menu == P1_LOCAL_RIGHT_SELECTED || menu == P2_LOCAL_SELECTED) {
    if (keyCode == RIGHT_ARROW) {
      player2Def.cstrLegs.stiffness = idleLegStiffness;
    }
    if (keyCode == LEFT_ARROW) {
      player2Atk.cstrLegs.stiffness = idleLegStiffness;
    }
  }
}

// TEST FUNCTION FOR LIFTING BALL WHEN IT IS ON THE GROUND
function liftBall(player) {
  if (Matter.SAT.collides(player.legBody, ball.body).collided || Matter.SAT.collides(player.footBody, ball.body).collided) {
    Body.applyForce(ball.body, ball.body.position, Matter.Vector.create(0,-0.005));
  }
  if (player.isOnGround && ball.isOnGround) {
    if (Matter.SAT.collides(player.legBody, ball.body).collided || Matter.SAT.collides(player.footBody, ball.body).collided) {
      Body.applyForce(ball.body, ball.body.position, Matter.Vector.create(0,-0.007));
    }
  }
}
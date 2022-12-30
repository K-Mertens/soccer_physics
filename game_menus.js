// ************************************************
// Teugg Soccer Physics
// Rip-off of the once popular Soccer Physics game
// Horribly coded by : Kevin Le Teugg, 2020
// File : game_menus.js
// Description : Game menus manager
// ************************************************

class GameMenus {
  constructor() {

  }

  draw(menu) {
    // MAIN MENU
    if (menu == MAIN_MENU) {
      image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      rectMode(CENTER);
      fill(0, 255, 40);
      rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 4), menuButtonWidth, menuButtonHeight);
      fill(0, 100, 255);
      rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2), menuButtonWidth, menuButtonHeight);
      fill(0, 100, 255);
      rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT * 3 / 4), menuButtonWidth, menuButtonHeight);
      textSize(20);
      fill(255);
      textAlign(CENTER, CENTER);
      text('1 PLAYER - LOCAL', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 4));
      text('2 PLAYERS - LOCAL', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2));
      text('2 PLAYERS - ONLINE', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT * 3 / 4));
    }

    // 1 PLAYER - LOCAL | CHOOSE SIDE
    if (menu == P1_LOCAL_CHOOSE_SIDE_MENU) {
      image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      textAlign(CENTER, CENTER);
      textSize(30);
      fill(255);
      text('Choose side', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 4));
      rectMode(CENTER);
      fill(0, 255, 40);
      rect((CANVAS_WIDTH / 3), (CANVAS_HEIGHT / 2), menuButtonWidth, menuButtonHeight);
      fill(0, 100, 255);
      rect((CANVAS_WIDTH * 2 / 3), (CANVAS_HEIGHT / 2), menuButtonWidth, menuButtonHeight);
      textSize(20);
      fill(255);
      text('LEFT', (CANVAS_WIDTH / 3), (CANVAS_HEIGHT / 2));
      text('RIGHT', (CANVAS_WIDTH * 2 / 3), (CANVAS_HEIGHT / 2));
      // Drawing back to main menu button
      push();
      rectMode(CENTER);
      fill(170, 60, 0);
      rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT - menuButtonHeight), menuButtonWidth, menuButtonHeight);
      textAlign(CENTER, CENTER);
      textSize(20);
      fill(255);
      text('BACK TO MAIN MENU', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT - menuButtonHeight));
      pop();
    }

    // 2 PLAYERS - LOCAL
    if (menu == P2_LOCAL_SELECTED) {
    }

    // 2 PLAYERS - ONLINE
    if (menu == P2_ONLINE_MENU) {
      image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      textAlign(CENTER, CENTER);
      textSize(30);
      fill(255);
      rectMode(CENTER);
      fill(0, 255, 40);
      rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2) - (menuButtonHeight / 2), menuButtonWidth, menuButtonHeight);
      fill(0, 100, 255);
      rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2) + (menuButtonHeight / 2), menuButtonWidth, menuButtonHeight);
      textSize(20);
      fill(255);
      text('CREATE NEW GAME', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2) - (menuButtonHeight / 2));
      text('JOIN EXISTING GAME', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2) + (menuButtonHeight / 2));

      // Drawing back to main menu button
      push();
      rectMode(CENTER);
      fill(170, 60, 0);
      rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT - menuButtonHeight), menuButtonWidth, menuButtonHeight);
      textAlign(CENTER, CENTER);
      textSize(20);
      fill(255);
      text('BACK TO MAIN MENU', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT - menuButtonHeight));
      pop();
    }

    // 1 PLAYER - LOCAL | LEFT
    if (menu == P1_LOCAL_LEFT_SELECTED) {
    }

    // 1 PLAYER - LOCAL | RIGHT
    if (menu == P1_LOCAL_RIGHT_SELECTED) {
      /*image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      textAlign(CENTER, CENTER);
      textSize(60);
      fill(200, 220, 30);
      text('UNDER CONSTRUCTION', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2));*/
    }

    // 
    if (menu == P2_ONLINE_CREATE_MENU) {
      var lobbyName;
      image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      textAlign(CENTER, CENTER);
      textSize(60);
      fill(200, 220, 30);
      text('CREATE', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2));
      text('UNDER CONSTRUCTION', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT * 2 / 3));
      // Drawing back to main menu button
      push();
      rectMode(CENTER);
      fill(170, 60, 0);
      rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT - menuButtonHeight), menuButtonWidth, menuButtonHeight);
      textAlign(CENTER, CENTER);
      textSize(20);
      fill(255);
      text('BACK TO MAIN MENU', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT - menuButtonHeight));
      pop();

      lobbyName = prompt("Enter lobby name");
      // Sending lobby name to server (working)
      //socket.emit('createLobbyMessage', lobbyName);
    }

    if (menu == P2_ONLINE_JOIN_MENU) {
      var lobbyCode;
      image(background0, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      textAlign(CENTER, CENTER);
      textSize(60);
      fill(200, 220, 30);
      text('JOIN', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT / 2));
      text('UNDER CONSTRUCTION', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT * 2 / 3));
      // Drawing back to main menu button
      push();
      rectMode(CENTER);
      fill(170, 60, 0);
      rect((CANVAS_WIDTH / 2), (CANVAS_HEIGHT - menuButtonHeight), menuButtonWidth, menuButtonHeight);
      textAlign(CENTER, CENTER);
      textSize(20);
      fill(255);
      text('BACK TO MAIN MENU', (CANVAS_WIDTH / 2), (CANVAS_HEIGHT - menuButtonHeight));
      pop();

      lobbyCode = prompt("Enter code");
    }
  }

  clickedOn() {
    if (menu == MAIN_MENU) {
      if (mouseX < (CANVAS_WIDTH / 2) + (menuButtonWidth / 2) && mouseX > (CANVAS_WIDTH / 2) - (menuButtonWidth / 2)) {
        if (mouseY < ((CANVAS_HEIGHT / 4) + menuButtonHeight / 2) && mouseY > ((CANVAS_HEIGHT / 4) - menuButtonHeight / 2)) {
          menu = P1_LOCAL_CHOOSE_SIDE_MENU;
        }
        if (mouseY < ((CANVAS_HEIGHT / 2) + menuButtonHeight / 2) && mouseY > ((CANVAS_HEIGHT / 2) - menuButtonHeight / 2)) {
          menu = P2_LOCAL_SELECTED;
        }
        if (mouseY < ((CANVAS_HEIGHT * 3 / 4) + menuButtonHeight / 2) && mouseY > ((CANVAS_HEIGHT * 3 / 4) - menuButtonHeight / 2)) {
          menu = P2_ONLINE_MENU;
        }
        // EASTER EGG, SPECTATOR MODE BETWEEN TWO AIs
        if (mouseY < CANVAS_HEIGHT && mouseY > CANVAS_HEIGHT - 15) {
          menu = 1000;
        }
      }
    }
    if (menu == P1_LOCAL_CHOOSE_SIDE_MENU) {
      // RETURN TO MAIN MENU
      if (mouseX < (CANVAS_WIDTH / 2) + (menuButtonWidth / 2) && mouseX > (CANVAS_WIDTH / 2) - (menuButtonWidth / 2) && mouseY < CANVAS_HEIGHT - menuButtonHeight / 2 && mouseY > CANVAS_HEIGHT - menuButtonHeight * 3 / 2) {
        menu = MAIN_MENU;
      }
      if (mouseY < (CANVAS_HEIGHT / 2) + (menuButtonHeight / 2) && mouseY > (CANVAS_HEIGHT / 2) - (menuButtonHeight / 2)) {
        if (mouseX < (CANVAS_WIDTH / 3) + (menuButtonWidth / 2) && mouseX > (CANVAS_WIDTH / 3) - (menuButtonWidth / 2)) {
          menu = P1_LOCAL_LEFT_SELECTED;
        }
        if (mouseX < (CANVAS_WIDTH * 2 / 3) + (menuButtonWidth / 2) && mouseX > (CANVAS_WIDTH * 2 / 3) - (menuButtonWidth / 2)) {
          menu = P1_LOCAL_RIGHT_SELECTED;
        }
      }
    }
    if (menu == P2_ONLINE_MENU) {
      // RETURN TO MAIN MENU
      if (mouseX < (CANVAS_WIDTH / 2) + (menuButtonWidth / 2) && mouseX > (CANVAS_WIDTH / 2) - (menuButtonWidth / 2) && mouseY < CANVAS_HEIGHT - menuButtonHeight / 2 && mouseY > CANVAS_HEIGHT - menuButtonHeight * 3 / 2) {
        menu = MAIN_MENU;
      }
      if (mouseX < (CANVAS_WIDTH / 2) + (menuButtonWidth / 2) && mouseX > (CANVAS_WIDTH / 2) - (menuButtonWidth / 2)) {
        if (mouseY < (CANVAS_HEIGHT / 2) && mouseY > (CANVAS_HEIGHT / 2) - menuButtonHeight) {
          menu = P2_ONLINE_CREATE_MENU;
        }
        if (mouseY > (CANVAS_HEIGHT / 2) && mouseY < (CANVAS_HEIGHT / 2) + menuButtonHeight) {
          menu = P2_ONLINE_JOIN_MENU;
        }
      }
    }
    if (menu == P2_ONLINE_CREATE_MENU) {
      // RETURN TO MAIN MENU
      if (mouseX < (CANVAS_WIDTH / 2) + (menuButtonWidth / 2) && mouseX > (CANVAS_WIDTH / 2) - (menuButtonWidth / 2) && mouseY < CANVAS_HEIGHT - menuButtonHeight / 2 && mouseY > CANVAS_HEIGHT - menuButtonHeight * 3 / 2) {
        menu = MAIN_MENU;
      }
    }
    if (menu == P2_ONLINE_JOIN_MENU) {
      // RETURN TO MAIN MENU
      if (mouseX < (CANVAS_WIDTH / 2) + (menuButtonWidth / 2) && mouseX > (CANVAS_WIDTH / 2) - (menuButtonWidth / 2) && mouseY < CANVAS_HEIGHT - menuButtonHeight / 2 && mouseY > CANVAS_HEIGHT - menuButtonHeight * 3 / 2) {
        menu = MAIN_MENU;
      }
    }
  }

  logic() {
    // Drawing main menu
    if (menu == MAIN_MENU) {
      gameMenus.draw(menu);
    }

    // 1 PLAYER - LOCAL | CHOOSE SIDE
    if (menu == P1_LOCAL_CHOOSE_SIDE_MENU) {
      gameMenus.draw(menu);
    }

    // 2 PLAYERS - LOCAL
    if (menu == P2_LOCAL_SELECTED) {
      main();
    }

    // 2 PLAYERS - ONLINE
    if (menu == P2_ONLINE_MENU) {
      gameMenus.draw(menu);
    }

    // 1 PLAYER - LOCAL |LEFT
    if (menu == P1_LOCAL_LEFT_SELECTED) {
      main();
    }

    // 1 PLAYER - LOCAL | RIGHT
    if (menu == P1_LOCAL_RIGHT_SELECTED) {
      gameMenus.draw(menu);
      main();
    }

    // 
    if (menu == 6) {
      gameMenus.draw(menu);
    }

    // 
    if (menu == 7) {
      gameMenus.draw(menu);
    }

    // EASTER EGG, SPECTATOR MODE BETWEEN TWO AIs
    if (menu == 1000) {
      main();
    }
  }
}
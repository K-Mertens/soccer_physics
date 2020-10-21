function GameTimer() {

  this.timerTick = function() {
    if (frameCount % 60 == 0) {
      t_elapsed_sec = t_elapsed_sec + 1;
    }
    if (t_elapsed_sec >= 60) {
      t_elapsed_min = t_elapsed_min + 1;
      t_elapsed_sec = 0
    }
  }

  // DRAWING FUNCTION
  this.show = function() {
    push();
    textSize(40);
    fill(255);
    stroke(0, 0, 0);
    text(nf(t_elapsed_min, 2, 0) + ":" + nf(t_elapsed_sec, 2, 0), (CANVAS_WIDTH / 2), 30);
    pop();
  }
}
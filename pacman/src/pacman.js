import MovingDirection from "./MovingDirection.js";
export default class Pacman {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    document.addEventListener("keydown", this.#keydown);

    this.#loadPacmanImages();
  }

  draw(ctx) {
    this.#move();
    ctx.drawImage(
      this.pacmanImages[this.pacmanImageIndex],
      this.x,
      this.y,
      this.tileSize,
      this.tileSize
    );
  }

  #loadPacmanImages() {
    const pacmanImage1 = new Image();
    pacmanImage1.src = "../images/pac0.png";

    const pacmanImage2 = new Image();
    pacmanImage2.src = "../images/pac1.png";

    const pacmanImage3 = new Image();
    pacmanImage3.src = "../images/pac2.png";

    const pacmanImage4 = new Image();
    pacmanImage4.src = "../images/pac1.png";

    this.pacmanImages = [
      pacmanImage1,
      pacmanImage2,
      pacmanImage3,
      pacmanImage4,
    ];
    this.pacmanImageIndex = 1;
  }

  #keydown = (event) => {
    // up
    if (event.keyCode == 38) {
      if ((this.currentMovingDirection = MovingDirection.down));
      this.currentMovingDirection = MovingDirection.up;
      this.requestedMovingDirection = MovingDirection.up;
    }
    // down
    if (event.keyCode == 40) {
      if ((this.currentMovingDirection = MovingDirection.up));
      this.currentMovingDirection = MovingDirection.down;
      this.requestedMovingDirection = MovingDirection.down;
    }
    // left
    if (event.keyCode == 37) {
      if ((this.currentMovingDirection = MovingDirection.right));
      this.currentMovingDirection = MovingDirection.left;
      this.requestedMovingDirection = MovingDirection.left;
    }
    // right
    if (event.keyCode == 39) {
      if ((this.currentMovingDirection = MovingDirection.left));
      this.currentMovingDirection = MovingDirection.right;
      this.requestedMovingDirection = MovingDirection.right;
    }
  };

  #move() {
    if (this.currentMovingDirection !== this.requestedMovingDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        this.currentMovingDirection = this.requestedMovingDirection;
      }
    }
    switch(this.currentMovingDirection){
      case MovingDirection.up:
      this.y -= this.velocity;
      break; 
      case MovingDirection.down:
      this.y += this.velocity;
      break; 
      case MovingDirection.left:
      this.x -= this.velocity;
      break; 
      case MovingDirection.right:
      this.x += this.velocity;
      break; 
    }
  }
}

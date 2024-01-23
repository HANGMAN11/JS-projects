document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  let isGameOver = false;
  let speed = 3;
  let platformCount = 5;
  let platforms = [];
  let score = 0;
  let doodlerLeftSpace = 50;
  let startPoint = 150;
  let doodlerBottomSpace = startPoint;
  let isJumping = true;
  const gravity = 0.9;
  let upTimerId;
  let downTimerId;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerId;
  let rightTimerId;

  class Platform {
    constructor(newBottom) {
      this.left = Math.random() * 315;
      this.bottom = newBottom;
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.classList.add("platform");
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      grid.appendChild(visual);
    }
  }

  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      let platformGap = 600 / platformCount;
      let newBottom = 100 + i * platformGap;
      let newPlatform = new Platform(newBottom);
      platforms.push(newPlatform);
    }
  }
  function movePlatforms() {
    if (doodlerBottomSpace > 100) {
      platforms.forEach((platform) => {
        platform.bottom -= 4;
        let visual = platform.visual;
        visual.style.bottom = platform.bottom + "px";

        if (platform.bottom < 10) {
          let firstPlatform = platforms[0].visual;
          firstPlatform.classList.remove("platform");
          platforms.shift();
          score++;
          let newPlatform = new Platform(600);
          platforms.push(newPlatform);
          console.log(score);
        }
      });
    }
  }

  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add("doodler");
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = doodlerLeftSpace + "px";
    doodler.style.bottom = doodlerBottomSpace + "px";
  }

  function fall() {
    isJumping = false;
    clearTimeout(upTimerId);
    downTimerId = setInterval(() => {
      doodlerBottomSpace -= 7;
      doodler.style.bottom = doodlerBottomSpace + "px";
      if (doodlerBottomSpace <= 0) {
        gameOver();
      }
    }, 20);
  }
  fall();

  function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(() => {
      doodlerBottomSpace += 20;
      doodler.style.bottom = doodlerBottomSpace + "px";
      if (doodlerBottomSpace > startPoint + 200) {
        fall();
        isJumping = false;
      }
    }, 30);
  }

  function moveLeft() {
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerId = setInterval(() => {
      if (doodlerLeftSpace >= 0) {
        console.log("going left");
        doodlerLeftSpace -= 5;
        doodler.style.left = doodlerLeftSpace + "px";
      } else moveRight();
    }, 20);
  }

  function moveRight() {
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGameLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(() => {
      if (doodlerLeftSpace <= 313) {
        console.log("going right");
        doodlerLeftSpace += 5;
        doodler.style.left = doodlerLeftSpace + "px";
      } else moveLeft();
    }, 20);
  }

  function gameOver() {
    isGameOver = true;
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    grid.innerHTML = score;
    clearInterval(downTimerId);
  }

  function start() {
    if (!isGameOver) {
      createPlatforms();
      createDoodler();
      setInterval(movePlatforms, 30);
      jump();
    }
  }
  start();
});

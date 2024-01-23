document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  let isGameOver = false;
  let platformCount = 5;
  let platforms = [];
  let score = 0;
  let doodlerLeftSpace = 50;
  let doodlerBottomSpace = 150;

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
          platforms.push(newPlatform)
          console.log(score)
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

  function start() {
    if (!isGameOver) {
      createPlatforms();
      createDoodler();
      setInterval(movePlatforms, 30);
    }
  }
  start();
});

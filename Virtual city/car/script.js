const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
const car = new Car(100, 100, 30, 50);

animate();

function animate() {
  car.update();
  canvas.height = 600
  car.draw(ctx);
  requestAnimationFrame(animate);
}

class Parking extends Marking {
  constructor(center, directionVector, width, height) {
    super(center, directionVector, width, height);

    this.borders = [this.poly.segments[0], this.poly.segments[2]];
    this.type = "parking"
  }

  draw(ctx) {
    for (const border of this.borders) {
      border.draw(ctx, { width: 5, color: "white" });
    }
    ctx.save();
    ctx.translate(this.center.x, this.center.y);
    ctx.rotate(angle(this.directionVector));
    ctx.scale(4, 3);

    ctx.beginPath();
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "bold" + this.height * 0.3 + "px Arial";
    ctx.fillText("P", 0, 1);

    ctx.restore();
  }
}

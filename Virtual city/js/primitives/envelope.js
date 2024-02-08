class Envelope {
  constructor(skeleton, width, roundness = 1) {
    this.skeleton = skeleton;
    this.poly = this.#generatePolygon(width, roundness);
  }

  #generatePolygon(width, roundness) {
    const radius = width / 2;
    const alpha = angle(subtract(this.skeleton.p1, this.skeleton.p2));
    const alpha_cw = alpha + Math.PI / 2;
    const alpha_ccw = alpha - Math.PI / 2;

    const points = [];
    const step = Math.PI / Math.max(1, roundness);
    for (let i = alpha_ccw; i <= alpha_cw; i += step) {
      points.push(translate(this.skeleton.p1, i, radius));
    }

    for (let i = alpha_ccw; i <= alpha_cw; i += step) {
      points.push(translate(this.skeleton.p2, Math.PI + i, radius));
    }

    return new Polygon(points);
  }

  draw(ctx, options) {
    this.poly.draw(ctx, options);
  }
}
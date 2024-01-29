class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.zoom = 1;
    this.center = new Point(canvas.width / 2, canvas.height / 2);
    this.offset = scale(this.center, -1);

    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    };

    this.#addEventListeners();
  }

  reset() {
    this.ctx.restore();
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.save();
    ctx.translate(this.center.x, this.center.y);
    ctx.scale(1 / this.zoom, 1 / this.zoom);
    const offset = this.getOffset();
    ctx.translate(offset.x, offset.y);
  }

  getMouse(evt, subtractDragOffset = false) {
    const p = new Point(
      (evt.offsetX - this.center.x) * this.zoom - this.offset.x,
      (evt.offsetY - this.center.y) * this.zoom - this.offset.y
    );
    return subtractDragOffset ? subtract(p, this.drag.offset) : p;
  }

  getOffset() {
    return add(this.offset, this.drag.offset);
  }

  #addEventListeners() {
    this.canvas.addEventListener("mousewheel", this.#handMouseWheel.bind(this));
    this.canvas.addEventListener("mousedown", this.#handMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.#handMouseUp.bind(this));
  }

  #handMouseDown(evt) {
    if (evt.button == 1) {
      //mid button
      this.drag.start = this.getMouse(evt);
      this.drag.active = true;
    }
  }

  #handMouseMove(evt) {
    if (this.drag.active) {
      this.drag.end = this.getMouse(evt);
      this.drag.offset = subtract(this.drag.end, this.drag.start);
    }
  }

  #handMouseUp(evt) {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      this.drag = {
        start: new Point(0, 0),
        end: new Point(0, 0),
        offset: new Point(0, 0),
        active: false,
      };
    }
  }

  #handMouseWheel(evt) {
    const dir = Math.sign(evt.deltaY);
    const step = 0.1;
    this.zoom += dir * step;
    this.zoom = Math.max(1, Math.min(5, this.zoom));
    console.log(this.zoom);
  }
}

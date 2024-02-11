myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext("2d");

const graphString = localStorage.getItem("graph");
const graphInfo = graphString ? JSON.parse(graphString) : null;
const graph = graphInfo ? Graph.load(graphInfo) : new Graph();

const world = new World(graph);
const viewport = new Viewport(myCanvas);
const graphEditor = new GraphEditor(viewport, graph);
const stopEditor = new StopEditor(viewport, world);

let oldGraphHash = graph.hash();

setMode("graph");

animate();

function animate() {
  viewport.reset();
  if (graph.hash() != oldGraphHash) {
    world.generate();
    oldGraphHash = graph.hash();
  }
  const viewPoint = scale(viewport.getOffset(), -1);
  world.draw(ctx, viewPoint);
  ctx.globalAlpha = 0.3;
  graphEditor.display();
  stopEditor.display();
  requestAnimationFrame(animate);
}

function dispose() {
  graphEditor.dispose();
}

function save() {
  localStorage.setItem("graph", JSON.stringify(graph));
}

function setMode(mode) {
  disableEditors();
  switch (mode) {
    case "graph":
      graphBtn.style.backgroundColor = "white";
      graphBtn.style.filter = "";
      graphEditor.enable();
      break;

    case "stop":
      stopBtn.style.backgroundColor = "white";
      stopBtn.style.filter = "";
      stopEditor.enable()
      break;
  }
}

function disableEditors() {
  graphBtn.style.backgroundColor = "gray";
  graphBtn.style.filter = "grayscale(100%)";
  graphEditor.disable();
  stopBtn.style.backgroundColor = "gray";
  stopBtn.style.filter = "grayscale(100%)";
  stopEditor.disable();
}

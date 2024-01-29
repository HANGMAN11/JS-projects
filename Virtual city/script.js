

myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext('2d')


const graphString = localStorage.getItem("graph");
const graphInfo = graphString ? JSON.parse(graphString) : null
const graph = graphInfo 
? Graph.load(graphInfo)
: new Graph();
const viewport = new Viewport(myCanvas)
const graphEditor = new GraphEditor(viewport, graph)

animate()

function animate(){
    viewport.reset()
    graphEditor.display();
    requestAnimationFrame(animate)
}

function dispose(){
    graphEditor.dispose();
}

function save(){
    localStorage.setItem("graph", JSON.stringify(graph))
}
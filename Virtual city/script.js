

myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext('2d')

const p1 = new Point(200,200)
const p2 = new Point(300,500)
const p3 = new Point(400,300)
const p4 = new Point(500,400)

const s2 = new Segment(p3,p2)
const s3 = new Segment(p4,p3)
const s4 = new Segment(p1,p3)




const graph = new Graph([p1,p2,p3,p4], [s2,s3,s4]);
const graphEditor = new GraphEditor(myCanvas, graph)

animate()

function animate(){
    ctx.clearRect(0,0,myCanvas.width, myCanvas.height)
    graphEditor.display();
    requestAnimationFrame(animate)
}
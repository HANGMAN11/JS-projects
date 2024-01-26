function removeAll(){
    graph.dispose()
    
    ctx.clearRect(0,0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
}

function removeRandomSegment(){
    if(graph.segments.length == 0){
        console.log("no segments");
        return
    }
    const index = Math.floor(Math.random() * graph.segments.length);
    graph.removeSegment(graph.segments[index])
    ctx.clearRect(0,0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
}

function removeRandomPoint(){
    if(graph.points.length == 0){
        console.log("no poins");
        return
    }
    const index = Math.floor(Math.random() * graph.points.length);
    graph.removePoint(graph.points[index])
    ctx.clearRect(0,0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
}

function addRandomPoint(){
    const success = graph.tryAddPoint(
        new Point(
            Math.random() * myCanvas.width,
            Math.random() * myCanvas.height
        )
    );
    ctx.clearRect(0,0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
    console.log(success)
}

function addRandomSegment(){
    const index1 = Math.floor(Math.random() * graph.points.length);
    const index2 = Math.floor(Math.random() * graph.points.length);
    const success = graph.tryAddSegment(
        new Segment(graph.points[index1], graph.points[index2])
    )
    
    ctx.clearRect(0,0, myCanvas.width, myCanvas.height);
    graph.draw(ctx);
    console.log(success)
}

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
graph.draw(ctx)
let triangleW; let triangleB;


function preload() {
    triangleW = loadImage('assets/triangle-white.png');
    triangleB = loadImage('assets/triangle-black.png');  // Adjust the path to where your image is located
  }


function setup() {
    canvasWidth = windowWidth;
    canvasHeight = 450;
    myCanvas = createCanvas(canvasWidth, canvasHeight, WEBGL);

}

function draw() {
    if (shouldUpdatePoints) {
        points = distributePoints(start, end, formSubmissions);
        shouldUpdatePoints = false; // Reset flag after updating points
    }




    background(255,0);
    beginShape();
    noFill();
    stroke(colors[currentColorIndex]);
    strokeWeight(5);

    vertex(start.x, start.y);
    curveVertex(start.x, start.y);
  
    points.forEach(point => {
     
        // draw the point at r, theta with r = sliderValue
        let xCord = sliderValue * cos(point.theta);
        let yCord = sliderValue * sin(point.theta);
        curveVertex(point.x + xCord, point.y + yCord);
    });

    curveVertex(end.x, end.y);
    vertex(end.x, end.y);

    endShape();
if(!ShouldDrawWhite){
    push();
    noStroke();
    fill(0);


    image(triangleB, start.x -17, start.y - 14, 34, 30);

    circle(end.x, end.y, 30);
    pop();
} else {
    push();
    noStroke();
    fill(255);

    image(triangleW, start.x -17, start.y - 14, 34, 30);
    circle(end.x, end.y, 30);
    pop();
}
  

}

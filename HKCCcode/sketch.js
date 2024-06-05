
function setup() {
    canvasWidth = windowWidth;
    canvasHeight = 450;
    createCanvas(canvasWidth, canvasHeight, WEBGL);

}

function draw() {
    if (shouldUpdatePoints) {
        points = distributePoints(start, end, formSubmissions);
        shouldUpdatePoints = false; // Reset flag after updating points
    }




    background(255);
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

    push();
    noStroke();
    fill(0);

    circle(start.x, start.y, 30);
    circle(end.x, end.y, 30);
    pop();
}

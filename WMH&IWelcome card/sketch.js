let rectangles = []; // Array to hold our rectangles
let textImgBounds 


let textImg;
function preload(){
  textImg = loadImage('Img/WMH&I.png')
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER)


    let rectWidth = 60; // Width of each rectangle
    let rectHeight = 15; // Height of each rectangle
    let gap = 35; // Gap size between rectangles
    let maxStrokeWidth = 35
    
    textImgBounds = { x: windowWidth / 2 + 410, y: windowHeight / 2 + 250, w: 350, h: 185 };

    // Calculate the number of rectangles that can fit in the window
    let maxRows = floor((height - gap) / (rectHeight + gap));
    let maxCols = floor((width - gap) / (rectWidth + gap));

    // Initialize rectangles across the canvas
    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < maxCols; j++) {
            // Calculate the position of the top-left corner of the rectangle
            let x = j * (rectWidth + gap) + gap;
            let y = i * (rectHeight + gap) + gap;

            rectangles.push(new Rectangle(x, y, rectWidth, rectHeight, gap,textImgBounds,maxStrokeWidth));
        }
    }

   
}

function draw() {
    background('#d7ff38');
    for (let rect of rectangles) {

  
      rect.rotateTowards(mouseX, mouseY);
      rect.checkMouseIntersection(mouseX, mouseY);
      rect.updateColorIfOverlapping();
        rect.drawRect();
    }
    image(textImg,windowWidth - 235, windowHeight - 120, 365, 150);


}

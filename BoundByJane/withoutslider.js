let lines = [];
let currentLine = null;
let customText = "PLACE HOLDER ";
let font;

function preload() {
  font = loadFont('fonts/Migra-Extralight.ttf');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('canvasWrapper');
  textFont(font);
  textSize(32);
  createInputBox();
}

function createInputBox() {
  let input = createInput('');
  input.position(10, height + 50);
  input.input(() => {
    customText = input.value().toUpperCase() || "PLACE HOLDER ";
  });
}

function mousePressed() {
  currentLine = { start: createVector(mouseX - width / 2, mouseY - height / 2, 0), end: null };
}

function mouseDragged() {
  if (currentLine) {
    currentLine.end = createVector(mouseX - width / 2, mouseY - height / 2, 0);
  }
}

function mouseReleased() {
  if (currentLine && currentLine.end) {
    lines.push(currentLine);
    currentLine = null;
  }
}

function draw() {
  clear();
  fill(0);

  for (let line of lines) {
    drawTextAlongLine(line);
  }

  if (currentLine && currentLine.end) {
    drawTextAlongLine(currentLine);
  }
}

function drawTextAlongLine(line) {
  let textArray = customText.split('');
  let start = line.start;
  let end = line.end;

  let distance = p5.Vector.dist(start, end);

  
  let charWidth = textWidth('M');
  let step = charWidth * 0.8;
  let numChars = Math.ceil(distance / step);

  for (let i = 0; i < numChars; i++) {
    let t = i * step / distance;
    let x = lerp(start.x, end.x, t);
    let y = lerp(start.y, end.y, t);

    let charIndex = i % textArray.length;
    let char = textArray[charIndex];

    push();
    translate(x, y, 0);
    
    // Rotate text to align with the line
    let currentAngle = atan2(end.y - start.y, end.x - start.x);
    textAlign(CENTER, CENTER);
    rotateZ(currentAngle);
    text(char, 0, 0);
    pop();
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    lines = [];
  }
}


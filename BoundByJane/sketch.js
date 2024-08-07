let lines = [];
let currentLine = null;
let inputText = "TYPE WHAT YOU DEMAND ";
let font;
let textColour = 0;
let charWidths = {};
let isBlackBackground = true;
let fontSize = 32;

let sliderHover = false;
let isSliderMoving = false; // Add this line at the top with your other global variables
let StartingStretchValue = 0.7; // Default value


let bgImage = null;

function preload() {
  font = loadFont('fonts/Migra-Extralight.ttf');
}

function setup() {
  let canvas = createCanvas(100, 100, WEBGL); // Initialize with a non-zero size
  canvas.parent('canvasWrapper');
  textFont(font);
  textSize(fontSize);
  resizeCanvasToFitWrapper();
  EventListeners();
  updateAspectRatio({ target: { value: aspectRatioSelector.value } });
  calculateCharWidths();
}

function calculateCharWidths() {
  let text = inputText.toUpperCase();
  charWidths = {}; // Reset the character widths
  for (let char of text) {
    if (!charWidths[char]) {
      charWidths[char] = textWidth(char);
    }
  }
}

function updateText(event) {
  inputText = event.target.value.toUpperCase() + ' ' || "TYPE WHAT YOU DEMAND "; // Always add a space at the end
  calculateCharWidths(); // Recalculate character widths when text changes

  // Update the text of all currently drawn lines
  for (let line of lines) {
    // if (!line.locked) {
      line.text = inputText;
    // }
  }

  // Update the text of the current line being drawn
  if (currentLine) {
    currentLine.text = inputText;
  }
}

function getMinimumLineLength() {
  return map(zSlider.value, 1, 100, 20, 180);
}


function drawTextAlongLine(line) {
  let textArray = line.text.split('');
  let start = line.start;
  let end = line.end;

  let distance = p5.Vector.dist(start, end);
  let baseAngle = 0;
  let angleIncrement = map(line.zValue, 1, 100, 0, -0.05);

  let accumulatedDistance = 0;
  let charIndex = 0;

  let minLineLength = getMinimumLineLength();

  // Check if the distance is less than the minimum length
  if (distance < minLineLength) {
    fill(255, 0, 0, 70); // Red color with 70% opacity
    line.toDelete = true; // Set a flag to mark the line for deletion
  } else {
    fill(line.textColour);
    line.toDelete = false; // Clear the flag if the line is valid
  }

  while (accumulatedDistance < distance) {
    let t = accumulatedDistance / distance;
    let x = lerp(start.x, end.x, t);
    let y = lerp(start.y, end.y, t);
    let z = lerp(start.z, end.z, t);

    let char = textArray[charIndex % textArray.length];
    let charWidth = charWidths[char] || textWidth(char); // Get the width of the character
    
    push();
    translate(x, y, z);

    let currentAngle = atan2(end.y - start.y, end.x - start.x);
    rotateZ(currentAngle);

    let minScale = map(line.zValue, 1, 100, 1, 0.7);
    let maxScale = map(line.zValue, 1, 100, 1, 1.9);
    let perspective = map(z, start.z, end.z, minScale, maxScale);
    let stretch = map(line.zValue, 1, 100, 0, StartingStretchValue);
    let Squish = map(line.zValue, 1, 100, 0, 0.3);

    ExperimentingWithText(t)



    let progressiveSquish = lerp(Squish, 0, t);
    scale(perspective, perspective + stretch);
    scale(1,1 + -progressiveSquish);


    if (line.zValue > 1) { // Apply rotation only if zValue is greater than 0
      let rotationFactor = 0;

      // Calculate the distance from the left edge of the canvas
      let distanceFromLeft = x + width / 2; // Adjust for the canvas position
      let maxDistance = width; // The total width of the canvas

      // Map the distance from the left edge to a rotation factor
      rotationFactor = map(distanceFromLeft, 0, maxDistance, PI / 12, 0); // More rotation for characters closer to the left

      let tiltAngle = baseAngle + (accumulatedDistance / charWidth) * angleIncrement;
      rotateY(radians(tiltAngle) - rotationFactor);
    }

    textAlign(LEFT, CENTER);
    text(char, 0, 0);
    pop();

    let StretchedKerning = map(TwistSlider.value, 1, 100, 0, 6.6);
    let StretchedKerningValue = lerp(StretchedKerning, 1, t);
    let dynamicStep = charWidth * perspective;
    accumulatedDistance += dynamicStep + StretchedKerningValue;
    charIndex++;
  }
}






function drawBackgroundImage() {
  if (bgImage) {
    // Ensure the image covers the canvas without stretching
    let imgAspect = bgImage.width / bgImage.height;
    let canvasAspect = width / height;
    let drawWidth, drawHeight;
    if (imgAspect > canvasAspect) {
      drawHeight = height;
      drawWidth = height * imgAspect;
    } else {
      drawWidth = width;
      drawHeight = width / imgAspect;
    }

    let xOffset = (width - drawWidth) / 2;
    let yOffset = (height - drawHeight) / 2;

    image(bgImage, -width / 2 + xOffset, -height / 2 + yOffset, drawWidth, drawHeight);
  }
}

function updateLinesZ() {
  let newZ = zSlider.value;
  for (let line of lines) {
    if (!line.locked) { // Only update the Z value of unlocked lines
      line.end.z = newZ;
      line.zValue = newZ; // Also update the stored Z value
    }
  }

  // Update the Z value of the current line being drawn
  if (currentLine) {
    currentLine.end.z = newZ;
    currentLine.zValue = newZ;
  }
}

function draw() {
  clear();
  drawBackgroundImage();
  // Draw all lines
  for (let line of lines) {
    drawTextAlongLine(line);
  }

  // Remove lines marked for deletion, only if the slider is not being moved
  if (!isSliderMoving) {
    lines = lines.filter(line => !line.toDelete);
  }

  // Draw the current line if it exists
  if (currentLine && currentLine.end) {
    drawTextAlongLine(currentLine);
  }
}

function updateStartingStretchValue() {
  if (fontSize === 18) {
    StartingStretchValue = 1.5;
  } else {
    StartingStretchValue = 0.7; // Adjust this as needed for other font sizes
  }
}


function ExperimentingWithText(LerpingStep){
      let TwistValue =  map(TwistSlider.value, 1, 100, 0, -2.3);
      let StretchValueX =  map(TwistSlider.value, 1, 100, 1, 1.6);
      let StretchValueY =  map(TwistSlider.value, 1, 100, 1, 1.6);


    let progressiveTwist = lerp(TwistValue, 0, LerpingStep);
    let progressiveStretchX = lerp(StretchValueX, 1, LerpingStep);
    let progressiveStretchY = lerp(1, StretchValueY, LerpingStep);
    // scale(1, 1 + progressiveTwist)
    scale(progressiveStretchX,progressiveStretchY)

}
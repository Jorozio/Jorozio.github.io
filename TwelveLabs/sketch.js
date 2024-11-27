let myFont;
let fontSizeSlider, fontSizeLabel;
let waveLengthSlider, waveLengthLabel;
let speedSlider, speedLabel;
let effectCountSlider, effectCountLabel;
let groupSizeSlider, groupSizeLabel;
let paragraph = [
  "A New State-of-the-Art",
  "Video Foundation Model for",
  "Any-to-Any Search"
];




let editingIndex = -1;
let inputBox;
let colorButton;

let colorTransitionSlider, colorTransitionLabel; 

// Colors to randomly assign
let colors = ["#048CA9", "#BEC85B", "#F05656", "#E696C1", "#7080BF", "#2D7F4E"];
// let colors = ["#FF6FE9", "#6F87FF", "#FF8400", "#FF5353", "#BEC95B", "#54C934"];
let colorEffect = []; // Store characters being animated

// Custom kerning values for specific characters
let kerningMap = {
  V: -5,
  i: 2,
  o: 1,
  d: 1,
  " ": 3,
  n: 1,
  g: 1,
  t: 1,
  a: 1
};

let textCol = 0;

function preload() {
  myFont = loadFont('assets/QuadrantText-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Font size slider
  fontSizeSlider = createSlider(10, 200, 70, 1);
  fontSizeSlider.position(20, 20);
  fontSizeLabel = createDiv("Font Size: ");
  fontSizeLabel.position(160, 20);

  // Wave length slider
  waveLengthSlider = createSlider(1, 50, 5, 1);
  waveLengthSlider.position(20, 60);
  waveLengthLabel = createDiv("Wave Length: ");
  waveLengthLabel.position(160, 60);

  // Speed slider
  speedSlider = createSlider(0.01, 0.1, 0.04, 0.01);
  speedSlider.position(20, 100);
  speedLabel = createDiv("Wave Speed: ");
  speedLabel.position(160, 100);

  // Effect count slider
  effectCountSlider = createSlider(2, 30, 6, 1);
  effectCountSlider.position(20, 140);
  effectCountLabel = createDiv("Effect Count: ");
  effectCountLabel.position(160, 140);

  

  colorTransitionSlider = createSlider(1, 5, 2, 1); // Min 1, Max 5, Default 2
  colorTransitionSlider.position(20, 260);
  colorTransitionLabel = createDiv("Colour Transitions: ");
  colorTransitionLabel.position(160, 260);

  // Group size slider
  groupSizeSlider = createSlider(1, 4, 1, 1); // Min 1, Max 4, Default 1
  groupSizeSlider.position(20, 180);
  groupSizeLabel = createDiv("Group Size: ");
  groupSizeLabel.position(160, 180);


  // Input box for editing
  inputBox = createInput();
  inputBox.position(-999, -999); // Hide initially
  inputBox.input(updateText);

  inputBox.style('border', 'none');
  inputBox.style('background', 'none');
  inputBox.style('color', 'rgba(0,0,0,0)');
  inputBox.style('outline', 'none'); // Remove focus outline
  inputBox.style('font-size', '25px'); // Match the text size
  inputBox.style('padding', '0');
  inputBox.style('margin', '0');
  inputBox.style('text-align', 'center');
  inputBox.style('width', '200px'); // Width for better click area

  // Color effect button
  colorButton = createButton("Trigger Colour Effect");
  colorButton.position(20, 220);
  colorButton.mousePressed(triggerColorEffect);
}

function draw() {
  background(255);

  // Update font settings
  textFont(myFont);
  textSize(fontSizeSlider.value());
  textAlign(LEFT, CENTER);


  fontSizeLabel.html(`Font Size: ${fontSizeSlider.value()}`);
  waveLengthLabel.html(`Wave Length: ${waveLengthSlider.value()}`);
  speedLabel.html(`Wave Speed: ${speedSlider.value().toFixed(2)}`);
  effectCountLabel.html(`Effect Count: ${effectCountSlider.value()}`);
  groupSizeLabel.html(`Group Size: ${groupSizeSlider.value()}`);
  colorTransitionLabel.html(`Colour Transitions: ${colorTransitionSlider.value()}`);
  

  let yOffset = height / 2 - textSize() * (paragraph.length - 1) / 2;

  for (let i = 0; i < paragraph.length; i++) {
    let line = paragraph[i];
    let lineY = yOffset + i * textSize();
    let totalLineWidth = calculateLineWidth(line);
    let startX = width / 2 - totalLineWidth / 2;
    let currentX = startX;

    for (let j = 0; j < line.length; j++) {
      let char = line[j];
      let charWidth = textWidth(char);
      let kerning = kerningMap[char] || 0;

      // Calculate the character's center position
      let charCenterX = currentX + charWidth / 2;
      let charCenterY = lineY;

      // Draw the character (apply wave effect if active)
      let charColor = color(textCol); // Default to black
      let effect = colorEffect.find(e => e.line === i && e.index === j);
      if (effect) {
        if (effect.stage < effect.targetColors.length) {
          let fromColor =
            effect.stage === 0 ? color(textCol) : effect.targetColors[effect.stage - 1];
          let toColor = effect.targetColors[effect.stage];
          charColor = lerpColor(fromColor, toColor, effect.t);
          effect.t += effect.speed;

          if (effect.t >= 1.0) {
            effect.t = 0;
            effect.stage += 1;
          }
        } else {
          charColor = lerpColor(
            effect.targetColors[effect.targetColors.length - 1],
            color(textCol),
            effect.t
          );
          effect.t += effect.speed;

          if (effect.t >= 1.0) {
            colorEffect.splice(colorEffect.indexOf(effect), 1);
          }
        }

        // Trigger next wave
        if (effect.stage === 0 && effect.t >= 0.5 && !effect.triggeredWave) {
          let maxWaveLength = waveLengthSlider.value();
          
          // Propagate right
          let rightIndex = effect.index + 1;
          if (
            rightIndex < line.length &&
            Math.abs(rightIndex - effect.startIndex) < maxWaveLength &&
            !colorEffect.find(e => e.line === effect.line && e.index === rightIndex)
          ) {
            colorEffect.push({
              line: effect.line,
              index: rightIndex,
              targetColors: effect.targetColors,
              t: 0,
              speed: effect.speed,
              triggeredWave: false,
              startIndex: effect.startIndex,
              stage: 0
            });
          }
          
          // Propagate left
          let leftIndex = effect.index - 1;
          if (
            leftIndex >= 0 &&
            Math.abs(leftIndex - effect.startIndex) < maxWaveLength &&
            !colorEffect.find(e => e.line === effect.line && e.index === leftIndex)
          ) {
            colorEffect.push({
              line: effect.line,
              index: leftIndex,
              targetColors: effect.targetColors,
              t: 0,
              speed: effect.speed,
              triggeredWave: false,
              startIndex: effect.startIndex,
              stage: 0
            });
          }
          
          effect.triggeredWave = true; // Mark wave as triggered
        }
        
      }

      fill(charColor);
      text(char, currentX, lineY);

      currentX += charWidth + kerning;
    }
  }
}



function triggerColorEffect() {
  let numEffects = effectCountSlider.value();  // Number of color effects to trigger
  let groupSize = groupSizeSlider.value();     // Number of characters in each wave group
  let waveSpeed = speedSlider.value();         // Wave speed from slider
  let maxWaveLength = waveLengthSlider.value(); // Maximum wave length
  let colorTransitions = colorTransitionSlider.value(); // Number of color transitions

  for (let i = 0; i < numEffects; i++) {
    let lineIndex = floor(random(paragraph.length));  // Random line
    let charIndex = floor(random(paragraph[lineIndex].length));  // Random start character

    // Generate an array of random target colors
    let targetColors = [];
    for (let j = 0; j < colorTransitions; j++) {
      targetColors.push(color(random(colors)));
    }

    // Create a new wave effect for the group of characters
    for (let j = 0; j < groupSize; j++) {
      let index = charIndex - j;
      if (index >= 0 && index < paragraph[lineIndex].length) {
        if (!colorEffect.find(e => e.line === lineIndex && e.index === index)) {
          colorEffect.push({
            line: lineIndex,
            index: index,
            targetColors: targetColors, // Store all target colors
            t: 0,  // Time of transition
            speed: waveSpeed,  // Speed of transition
            triggeredWave: false,  // Flag for triggering next wave
            startIndex: charIndex,  // Track the start position for wave length
            stage: 0  // Start at stage 0
          });
        }
      }
    }
  }
}

function mouseMoved() {
  triggerProximityEffect(mouseX, mouseY);
}


function triggerProximityEffect(mouseX, mouseY) {
  let maxWaveLength = waveLengthSlider.value(); // Maximum wave length
  let groupSize = groupSizeSlider.value(); // Group size for the wave
  let waveSpeed = speedSlider.value(); // Speed of the wave
  let colorTransitions = colorTransitionSlider.value(); // Number of color transitions
  
  let yOffset = height / 2 - textSize() * (paragraph.length - 1) / 2;

  // Loop through all characters in the paragraph
  for (let i = 0; i < paragraph.length; i++) {
    let line = paragraph[i];
    let lineY = yOffset + i * textSize();
    let totalLineWidth = calculateLineWidth(line);
    let startX = width / 2 - totalLineWidth / 2;
    let currentX = startX;

    for (let j = 0; j < line.length; j++) {
      let char = line[j];
      let charWidth = textWidth(char);
      let kerning = kerningMap[char] || 0;

      // Character center position
      let charCenterX = currentX + charWidth / 2;
      let charCenterY = lineY;

      // Check if character is within 50 pixels of the mouse
      let distance = dist(mouseX, mouseY, charCenterX, charCenterY);
      if (distance <= 50) {
        // Check if this character is already in the color effect array
        let effectExists = colorEffect.find(e => e.line === i && e.index === j);
        if (!effectExists) {
          // Generate random target colors for the wave effect
          let targetColors = [];
          for (let k = 0; k < colorTransitions; k++) {
            targetColors.push(color(random(colors)));
          }

          // Add the character to the wave effect array
          colorEffect.push({
            line: i,
            index: j,
            targetColors: targetColors,
            t: 0,
            speed: waveSpeed,
            triggeredWave: false,
            startIndex: j, // Track where the wave started
            stage: 0 // Start at the first color
          });

          // Optional: Add neighboring characters to the wave group
          for (let g = 1; g < groupSize; g++) {
            let neighborIndex = j + g;
            if (neighborIndex < line.length) {
              let neighborEffect = colorEffect.find(
                e => e.line === i && e.index === neighborIndex
              );
              if (!neighborEffect) {
                colorEffect.push({
                  line: i,
                  index: neighborIndex,
                  targetColors: targetColors,
                  t: 0,
                  speed: waveSpeed,
                  triggeredWave: false,
                  startIndex: j, // Same start index as the wave starter
                  stage: 0
                });
              }
            }
          }
        }
      }

      currentX += charWidth + kerning;
    }
  }
}





function calculateLineWidth(line) {
  let totalWidth = 0;
  for (let i = 0; i < line.length; i++) {
    let char = line[i];
    totalWidth += textWidth(char) + (kerningMap[char] || 0);
  }
  return totalWidth;
}

function mousePressed() {
  let yOffset = height / 2 - textSize() * (paragraph.length - 1) / 2;
  for (let i = 0; i < paragraph.length; i++) {
    let lineY = yOffset + i * textSize();
    let lineWidth = calculateLineWidth(paragraph[i]);
    if (
      mouseX > width / 2 - lineWidth / 2 &&
      mouseX < width / 2 + lineWidth / 2 &&
      mouseY > lineY - textSize() / 2 &&
      mouseY < lineY + textSize() / 2
    ) {
      editingIndex = i;
      inputBox.value(paragraph[i]);
      inputBox.position(mouseX, mouseY);
      inputBox.size(200);
      inputBox.show();
      inputBox.elt.focus();
      return;
    }
  }
  editingIndex = -1;
  inputBox.position(-999, -999);
}

function updateText() {
  if (editingIndex !== -1) {
    paragraph[editingIndex] = inputBox.value();
  }
}
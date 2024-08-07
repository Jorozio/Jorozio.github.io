let textInput = document.getElementById('textInput');
let aspectRatioSelector = document.getElementById('aspectRatioSelector');
let fileInput = document.getElementById('fileInput');
let colourToggleButton = document.getElementById('colourToggle');
let dropArea = document.getElementById('backgroundUpload');
let exportButton = document.getElementById('Exportbutton');
let fontSizeSelector = document.getElementById('FontSizeSelector');
let logoButton = document.getElementById('logo-button');
let zSlider = document.getElementById('zSlider');
let TwistSlider = document.getElementById('TwistSlider');


function EventListeners() {
  fileInput.addEventListener('change', handleFile);
  
  dropArea.addEventListener('dragover', handleDragOver, false);
  dropArea.addEventListener('drop', handleDrop, false);
  dropArea.addEventListener('click', () => fileInput.click());

  colourToggleButton.addEventListener('click', toggleTextColor);

  aspectRatioSelector.addEventListener('change', updateAspectRatio);
  aspectRatioSelector.value = "1:1"; // Ensure this is set to a default value

  textInput.addEventListener('input', updateText);

  zSlider.addEventListener('input', () => {
    isSliderMoving = true;
    updateLinesZ();
  });

 

  zSlider.addEventListener('mouseover', () => sliderHover = true);
  zSlider.addEventListener('mouseout', () => sliderHover = false);

  TwistSlider.addEventListener('mouseover', () => sliderHover = true);
  TwistSlider.addEventListener('mouseout', () => sliderHover = false);

  zSlider.addEventListener('change', () => {
    isSliderMoving = false; // Reset to false when the slider is released
  });

  fontSizeSelector.addEventListener('change', updateFontSize);
  fontSizeSelector.value = "32"; // Ensure this is set to a default value
  exportButton.addEventListener('click', exportCanvas);
  logoButton.addEventListener('click', ControlsToggle);
}

function mousePressed() {
  if (!sliderHover) {
    currentLine = {
      start: createVector(mouseX - width / 2, mouseY - height / 2, 0),
      end: createVector(mouseX - width / 2, mouseY - height / 2, zSlider.value),
      text: inputText, // Store the current input text
      textColour: textColour, // Store the current text color
      zValue: zSlider.value, // Store the current Z value
      locked: false // Initially, lines are not locked
    };
  }
}

function mouseDragged() {
  if (currentLine && !sliderHover) {
    currentLine.end = createVector(mouseX - width / 2, mouseY - height / 2, zSlider.value);
  }
}

function mouseReleased() {
  if (currentLine && currentLine.end && !sliderHover) {
    let distance = p5.Vector.dist(currentLine.start, currentLine.end);
    let minLineLength = getMinimumLineLength();

    if (distance >= minLineLength) {
      lines.push(currentLine);
    }

    currentLine = null;
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    lines = [];
  } else if (keyCode === ENTER) {
    lockLines();
  } else if (keyCode === LEFT_ARROW) {
    deleteUnlockedLines();
  }
}

function lockLines() {
  for (let line of lines) {
    line.locked = true; // Add a locked property to indicate the line is locked
  }
}

function deleteUnlockedLines() {
  lines = lines.filter(line => line.locked); // Only keep locked lines
}

function updateAspectRatio(event) {
  let aspectRatio = event.target.value;
  let canvasWrapper = document.getElementById('canvasWrapper');
  let wrapperWidth = canvasWrapper.clientWidth;
  let wrapperHeight = canvasWrapper.clientHeight;

  let newWidth, newHeight;

  switch (aspectRatio) {
    case "1:1":
      newWidth = wrapperHeight;
      newHeight = wrapperHeight;
      break;
    case "9:16":
      newWidth = (wrapperHeight / 16) * 9;
      newHeight = wrapperHeight;
      break;
    case "3:2":
      newWidth = (wrapperHeight / 2) * 3;
      newHeight = wrapperHeight;
      break;
    case "4:3":
      newWidth = (wrapperHeight / 4) * 3;
      newHeight = wrapperHeight;
      break;
    default:
      newWidth = wrapperWidth;
      newHeight = wrapperHeight;
  }

  canvasWrapper.style.width = `${newWidth}px`;
  canvasWrapper.style.height = `${newHeight}px`;
  lines = [];

  resizeCanvas(newWidth, newHeight);
}

function resizeCanvasToFitWrapper() {
  let canvasWrapper = document.getElementById('canvasWrapper');
  let wrapperWidth = canvasWrapper.clientWidth;
  let wrapperHeight = canvasWrapper.clientHeight;
  resizeCanvas(wrapperWidth, wrapperHeight);
  clearCanvas();
}

function clearCanvas() {
  lines = [];
}

window.addEventListener('resize', () => {
  let aspectRatioSelector = document.getElementById('aspectRatioSelector');
  updateAspectRatio({ target: { value: aspectRatioSelector.value } });
});

function handleDragOver(event) {
  event.preventDefault();
}

function handleFile(event) {
  let file = event.target.files[0];
  if (file.type.startsWith('image/')) {
    let reader = new FileReader();
    reader.onload = function (e) {
      bgImage = loadImage(e.target.result, () => {
        resizeCanvasToFitWrapper();
      });
    };
    reader.readAsDataURL(file);
  }
}

function handleDrop(event) {
  event.preventDefault();
  let file = event.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    let reader = new FileReader();
    reader.onload = function (e) {
      let backgroundImageDiv = document.getElementById('backgroundImage');
      backgroundImageDiv.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(file);
  }
}

function toggleTextColor() {
  textColour = textColour === 0 ? 255 : 0;
  if (isBlackBackground) {
    colourToggleButton.style.backgroundColor = 'white';
  } else {
    colourToggleButton.style.backgroundColor = 'black';
  }
  isBlackBackground = !isBlackBackground;

  // Update the text color of all lines
  for (let line of lines) {
    line.textColour = textColour;
  }

  // Update the text color of the current line being drawn
  if (currentLine) {
    currentLine.textColour = textColour;
  }
}

function updateFontSize(event) {
  fontSize = parseInt(event.target.value);
  textSize(fontSize);
  calculateCharWidths();
  updateStartingStretchValue();

  // Redraw the text of all currently drawn lines
  for (let line of lines) {
    line.text = inputText;
  }

  // Redraw the text of the current line being drawn
  if (currentLine) {
    currentLine.text = inputText;
  }
}

function exportCanvas() {
  saveCanvas('myCanvas', 'png');
}

let shouldHideControls = false;

function ControlsToggle() {
  let controlPanel = document.getElementById('controls');
  let container = document.getElementById('container');

  if (shouldHideControls) {
    controlPanel.style.display = 'flex';
    container.classList.remove('hidden-controls');
  } else {
    controlPanel.style.display = 'none';
    container.classList.add('hidden-controls');
  }

  shouldHideControls = !shouldHideControls; // Toggle the boolean value
}


let xPos =  1;
let YPos =  100;

let ScaleChanger;
let StrokeChanger;
let IterationChanger;

let seedsAndScales = [
  { seed:  10, scale:  1.8},
  { seed:  20, scale:  2 },
  { seed:  10, scale:  0.9 },
  { seed:  50000, scale:  1.2 },
  { seed:  0, scale:  1.3 },
  { seed:  30, scale:  3 },
  { seed:  34040, scale:  1.3 },
  { seed:  30120, scale:  1.4 },
  { seed:  1, scale:  0.9 },
  { seed:  104, scale:  1.5 },
  { seed:  30193804, scale:  3 },
  { seed:  3400, scale:  1.3 },
  { seed:  3024120, scale:  1.4 }
];

let colors = ['#ff0f0f', '#ab0fff', '#273cc4', '#24abad'];
let currentColorIndex =  0; 
let colourButton;

function setup() {
  createCanvas(800, 800);
  colourButton = createButton('');
  ScaleChanger = createSlider(1, 15, 4)
  StrokeChanger = createSlider(0.5, 20, 7)
  IterationChanger = createSlider(1, seedsAndScales.length,  2);
 
  colourButton.mouseClicked(changeColor);

  colourButton.style('border-radius: 20px;')
  colourButton.style('padding:  10px  10px;');
  colourButton.style('border-style: solid;');
  colourButton.style('background-color: #ff0f0f')
  colourButton.style('border-color: black;')
  colourButton.style('margin: 10px')
  colourButton.style('margin-top: 100px')
  colourButton.style('height: 10px')

  // frameRate(1)
}

function changeColor() {
  // Increment the current color index and wrap it around if it exceeds the array length
  currentColorIndex = (currentColorIndex +  1) % colors.length;
  colourButton.style('background-color: ' + colors[currentColorIndex] + ';');
  // Change the stroke color to the next color in the array

}

function draw() {
  translate(width /  8, height /  8);

  background(255);
  beginShape();
  noFill();
  // stroke('#273cc4');
  stroke(colors[currentColorIndex]);




  vertex(70,  70);
  curveVertex(70,70)

  let scaleValue = ScaleChanger.value();
  let iterationValue = IterationChanger.value();
  let strokeValue = StrokeChanger.value();
  strokeWeight(strokeValue);

  for (let i =  0; i < iterationValue; i++) {
  
    push();
    noiseSeed(seedsAndScales[i].seed);
    curveVertex(noise(xPos) * width / 1.5, noise(YPos) * height / (seedsAndScales[i].scale));
    // circle(noise(xPos) * width / 1.5, noise(YPos) * height / (seedsAndScales[i].scale), 10)
    pop();
  }

  curveVertex(500,  500);
  vertex(500,  500);

  xPos +=  scaleValue /1000 ;
  YPos +=  scaleValue /1000;

  endShape();
  fill(55);
  strokeWeight(7);
  stroke(55);
  ellipse(70,  70,  50);
  rect(480,  480,  50);
}

console.log(document.fonts.check("12px SpoofThin"));
let myFont = new FontFace("Spoof", "url(/public/fonts/SpoofThin.otf)");
myFont.load().then(font => {
    console.log('Font loaded:', font.status);
}).catch(error => {
    console.error('Font loading error:', error);
});
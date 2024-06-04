let mySlider;
let colors = ['#fff', '#1f71b8', '#05ab9e', '#8e3089', '#e5352b'];
let baseDistance = 35; // Base distance between dots

let currentColorIndex = 0; // Initialize the current color index

let formSubmissions = [];


let canvasWidth;
let canvasHeight;

const form = document.getElementById('submissionForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const inputValue = document.getElementById('text-input').value;


    formSubmissions.push(inputValue);
    document.getElementById('text-input').value = '';
  

        addNewPoint();
    
    redraw();
});

function handleSliderChange(value) {
    console.log("Slider value:", value);
    let normalizedValue = map(value, 0, 10, 10, 50);
    baseDistance = normalizedValue;
}

mySlider = document.getElementById('myRange');
mySlider.addEventListener('input', () => {
    handleSliderChange(mySlider.value);
    redraw();
});

document.getElementById('course').addEventListener('change', function() {
    const selectedCourse = this.value;

    switch(selectedCourse) {
        case 'EID':
            currentColorIndex = 1;
            break;
        case 'MID':
            currentColorIndex = 2;
            break;
        case 'VC':
            currentColorIndex = 3;
            break;
        case 'A':
            currentColorIndex = 4;
            break;
        default:
            currentColorIndex = 0;
    }
    redraw(); 
});

let xPos = [-150, -120];
let yPos = [-170, -110];

let noiseOffsetX = 0;
let noiseOffsetY = 10000;

function setup() {
    canvasWidth = windowWidth; 
    canvasHeight = 450;
    createCanvas(canvasWidth, canvasHeight, WEBGL);
    noiseDetail(8, 0.5);
}

function draw() {
    background(255);


    beginShape();
    noFill();
    stroke(colors[currentColorIndex]);
    strokeWeight(10);
    vertex(-150, -170);

    for (let i = 0; i < xPos.length; i++) {
        curveVertex(xPos[i], yPos[i]);
    }
    vertex(150, 100);
    endShape();

    push();
    noStroke();
    fill(0);
    circle(150, 100, 30);
    circle(-150, -170, 30);
    pop();

    
}

function addNewPoint() {
    let sliderValue = mySlider.value;
    let adjustedDistance = baseDistance * sliderValue / 2;

    let noiseX = noise(noiseOffsetX + formSubmissions.length * 0.1) * 2 - 1;
    let noiseY = noise(noiseOffsetY + formSubmissions.length * 0.1) * 2 - 1;



    let newX = xPos[xPos.length - 1] + noiseX * adjustedDistance;
    let newY = yPos[yPos.length - 1] + noiseY * adjustedDistance;

    if (newX > canvasWidth / 2) { // Assuming canvasWidth is the total width including margins
        newX = -(canvasWidth / 1.5); // Adjust this value based on your canvas size and desired offset
    } else if (newX < -canvasWidth / 2) {
        newX = canvasWidth / 1.5; // Adjust this value based on your canvas size and desired offset
    }

    // Adjust newY based on canvas height
    if (newY > canvasHeight / 2) { // Assuming canvasHeight is the total height including margins
        newY = -(canvasHeight / 100); // Adjust this value based on your canvas size and desired offset
    } else if (newY < -canvasHeight / 2) {
        newY = canvasHeight / 100; // Adjust this value based on your canvas size and desired offset
    }
    console.log(`xPos: ${xPos}, yPos: ${yPos}`);
    console.log(`newX: ${newX}, newY: ${newY}`);
    
    console.log(`Updated xPos: ${xPos.join(', ')}`);
    console.log(`Updated yPos: ${yPos.join(', ')}`);

    newX = constrain(newX, -canvasWidth / 2, canvasWidth / 2);
    newY = constrain(newY, -canvasHeight / 2, canvasHeight / 2);

    xPos.push(newX);
    yPos.push(newY);
}



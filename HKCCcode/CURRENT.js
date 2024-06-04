

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.theta = Math.random() * 2 * Math.PI; 
        this.direction = mySlider.value
    }
}

let mySlider;
let colors = ['#fff', '#1f71b8', '#05ab9e', '#8e3089', '#e5352b'];
let inputValue;
let currentColorIndex = 0; // Initialize the current color index

let formSubmissions = [];

let canvasWidth;
let canvasHeight;

let points = []; // Store points globally
let shouldUpdatePoints = true; // Flag to control points update

const form = document.getElementById('submissionForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    inputValue = document.getElementById('text-input').value;

    // Store the input value along with the generated offsets
    if (!shouldUpdatePoints) {
        if (formSubmissions.length === 0) {
            // If there are no submissions, add four new points
            for (let i = 0; i < 4; i++) {
                // Generate random offsets
                const offsetX = Math.random() * 25 - 25;
                const offsetY = Math.random() * 25 - 25; // Random offset between -5 and 15
                formSubmissions.push({ value: inputValue, offsetX: offsetX, offsetY: offsetY });
            }
        } else if (formSubmissions.length > 3) {
            // Generate random offsets
            const offsetX = Math.random() * 40 - 40;
            const offsetY = Math.random() * 40 - 40; 
            formSubmissions.push({ value: inputValue, offsetX: offsetX, offsetY: offsetY });
        }
    }

    console.log(formSubmissions.length);

    document.getElementById('text-input').value = '';

    // Set flag to update points
    shouldUpdatePoints = true;
});


function handleSliderChange(value) {
    console.log("Slider value:", value);
    // Calculate movement factor based on the slider value
    const movementFactor = value; // Normalize movement factor to [0, 1]

    // Apply movement to each point based on theta and slider value
    points.forEach(point => {
        let xCord = movementFactor * Math.cos(point.theta);
        let yCord = movementFactor * Math.sin(point.theta);
        point.x += xCord; // Adjust the multiplier as needed
        point.y += yCord; // Adjust the multiplier as needed
    });

    // Update flag to recalculate points
    shouldUpdatePoints = true;
}

mySlider = document.getElementById('myRange');
mySlider.addEventListener('input', () => {
    handleSliderChange(mySlider.value);
});

document.getElementById('course').addEventListener('change', function () {
    const selectedCourse = this.value;

    switch (selectedCourse) {
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
    // Update flag to recalculate points
    shouldUpdatePoints = true;
});

const start = new Point(150, 100);
const end = new Point(-150, -170);

function distributePoints(start, end, submissions) {
    const points = [];
    const numPoints = submissions.length;

    const deltaX = (end.x - start.x) / (numPoints + 1);
    const deltaY = (end.y - start.y) / (numPoints + 1);

    for (let i = 1; i <= numPoints; i++) {
        let x = start.x + deltaX * i;
        let y = start.y + deltaY * i;

        const offsetX = submissions[i - 1].offsetX; // Retrieve stored offsetX
        const offsetY = submissions[i - 1].offsetY; // Retrieve stored offsetY

        const adjustedX = x + offsetX;
        const adjustedY = y + offsetY;

        points.push(new Point(adjustedX, adjustedY));
    }
    return points;
}

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
    strokeWeight(2);
    vertex(start.x, start.y);
    for (let point of points) {
        curveVertex(point.x, point.y);
        // circle(point.x, point.y, 1);
    }
    vertex(end.x, end.y);
    endShape();

    push();
    noStroke();
    fill(0);
    circle(start.x, start.y, 30);
    circle(end.x, end.y, 30);
    pop();
}

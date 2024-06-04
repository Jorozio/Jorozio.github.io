
class Point {
    constructor(x, y, direction) {
        this.x = x;
        this.y = y;
        this.theta = Math.random() * 2 * Math.PI;
        this.direction = direction
    }
}



let mySlider;
let colors = ['#fff', '#05ab9e', '#1f71b8', '#8e3089', '#e5352b'];
let inputValue;
let currentColorIndex = 0; // Initialize the current color index

let formSubmissions = [];

let canvasWidth;
let canvasHeight;

let points = []; // Store points globally
let singlePoint;
let sliderValue = 0; 

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
            const offsetX = Math.random() * 35 - 35;
            const offsetY = Math.random() * 35 - 35;
            formSubmissions.push({ value: inputValue, offsetX: offsetX, offsetY: offsetY });
        }
    }


    document.getElementById('text-input').value = '';

    // Set flag to update points
    shouldUpdatePoints = true;
});



mySlider = document.getElementById('myRange');
mySlider.addEventListener('input', () => {
    sliderValue = mySlider.value * 9;

    return sliderValue
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

    singlePoint = new Point

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
    strokeWeight(1);

    vertex(start.x, start.y);
    curveVertex(start.x, start.y);
  
    points.forEach(point => {
        noFill();
        stroke(colors[currentColorIndex]);
        strokeWeight(1);

        // draw the point at r, theta with r = sliderValue
        let xCord = sliderValue * cos(point.theta);
        let yCord = sliderValue * sin(point.theta);
        // circle(point.x + xCord, point.y + yCord, 10)

        curveVertex(point.x + xCord, point.y + yCord);
    })

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

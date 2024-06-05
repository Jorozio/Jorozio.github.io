
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
let myCanvas;

let points = []; // Store points globally

let sliderValue = 0; 

let shouldUpdatePoints = true; // Flag to control points update
let submissionCount = 0;

let ShouldDrawWhite = false

const start = new Point(150, 100);
const end = new Point(-150, -170);

const form = document.getElementById('submissionForm');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    inputValue = document.getElementById('text-input').value;


    if (inputValue === '') {
        // Show an alert or handle the empty input case as needed
        alert("Please enter some text before submitting.");
        return; // Exit the function early to prevent form submission
    }

    // Store the input value along with the generated offsets
    if (submissionCount < 8) {
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
            submissionCount++;
        }
    } else {
        // Prevent further submissions
        document.getElementById('text-input').value = '';
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

let dropdown = document.getElementById('course')

dropdown.addEventListener('change', function () {
    const selectedCourse = this.value;

    if (selectedCourse!== "") {
        exportButton.disabled = false;
    } else {
        // Disable the export button if no course is selected
        exportButton.disabled = true;
    }

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


const exportButton = document.getElementById('export-button');



// Attach a click event listener to the button
exportButton.addEventListener('click', function() {

 form.style.display = 'none'
 mySlider.style.display = 'none'
 dropdown.style.display = 'none'
 exportButton.style.display = 'none'
 // select the things that aren't yet variables
document.getElementById('title').style.display = 'none'
document.getElementById('para-container').style.display = 'none';
document.getElementById('how-chaotic').style.display = 'none';

document.body.style.backgroundColor = '#1e1e1e';
ShouldDrawWhite = true



});


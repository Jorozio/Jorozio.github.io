


// ============================= Homepage button =================================
document.addEventListener('DOMContentLoaded', function() {
    // Select the button using its class
    const imageButton = document.querySelector('.image-button');

    // Add a click event listener to the button
    imageButton.addEventListener('click', function() {
        // Navigate to index.html when the button is clicked
        window.location.href = 'index.html';
    });
    

// =============================  current page Nav bar =================================
    const currentUrl = window.location.href;

const pageToNavItem = {
    'shop.html': 'shop-link',
    'info.html': 'info-link',
    'download.html': 'download-link',
 };

 // Loop through the mapping to find the current page
 for (const page in pageToNavItem) {
    if (currentUrl.includes(page)) {
      // Add the active class to the corresponding navigation item
      document.getElementById(pageToNavItem[page]).classList.add('active-nav-item');

    }
 }
});

let startY;
let moveY;
let swipeThreshold = 200;

let targetY;
let currentY = 0;
let moveSpeed = 35

let held = false;
let shouldMove = false; 


function mousePressed(event) {
    held = true;
    shouldMove = false;
    startY = mouseY;
    if (touches.length > 0) {
        // Record the initial touch position
        startY = mouseY
      }


  }
  
  function mouseReleased() {
    held = false;
  }

  function mouseDragged() {

    // Record the current mouse position
    moveY = mouseY;
   
    // Calculate the distance moved since the mouse press
    let distanceMoved = startY - moveY;
   
    // Check if the distance moved is greater than the swipe threshold
    if (distanceMoved > swipeThreshold) {
        targetY = -c.height;
        shouldMove = true;
       // Move the canvas off the screen
     
    }
   
}


  
  function touchStarted() {
    held = true;

    if (touches.length > 0) {
        // Record the initial touch position
        startY = touches[0].y;
      }
  }
  
  function touchEnded() {
    held = false;

   }


   function touchMoved() {
    // Record the current touch position
   
    moveY = touches[0].y;
   
    // Calculate the distance moved since the touch started
    let distanceMoved = startY - moveY;
   
    // Check if the distance moved is greater than the swipe threshold
    if (distanceMoved > swipeThreshold) {
        targetY = -c.height;
        shouldMove = true;
    
}
   }


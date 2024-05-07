


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
let swipeThreshold = 70;

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


  
//   function touchStarted() {
//     held = true;

//     if (touches.length > 0) {
//         // Record the initial touch position
//         startY = touches[0].y;
//       }
//   }
  
//   function touchEnded() {
//     held = false;

//    }


//    function touchMoved() {
//     // Record the current touch position
   
//     moveY = touches[0].y;
   
//     // Calculate the distance moved since the touch started
//     let distanceMoved = startY - moveY;
   
//     // Check if the distance moved is greater than the swipe threshold
//     if (distanceMoved > swipeThreshold) {
//         targetY = -c.height;
//         shouldMove = true;
    
// }
//    }

   function mediaQueryCheck() {
    // Check if the window width is less than or equal to 377
    if (window.innerWidth <= 377) {
       // Set the text size to 40
       textSize(40);
       // Display the text
       text("THE CONSTANT", -160, -120);
       text("HUSTLE OF LIFE", -160, -80);
       text("CAN WEAR YOU", -160, -40);
       text("DOWN IN WAYS", -160, 0);
       text("THAT’S HARD", -160, 40);
       text("TO SEE", -160, 80);
    } else {
      textSize(45);
      text("THE CONSTANT", -170, -130)
      text("HUSTLE OF LIFE", -170, -90)
      text("CAN WEAR YOU", -170, -50)
      text("DOWN IN WAYS", -170, -10)
      text("THAT’S HARD", -170, 30)
      text("TO SEE", -170, 70)
    }
   }
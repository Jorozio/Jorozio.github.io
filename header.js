let hoverTexts = document.querySelectorAll('.hover-text');
let circle = document.getElementById('circle');
let textSet1 = document.getElementById('text-set-1');
let textSet2 = document.getElementById('text-set-2');
let textSet3 = document.getElementById('text-set-3');
let textSet4 = document.getElementById('text-set-4');


let textSets = [textSet1, textSet2, textSet3, textSet4];

setCirclePosition = (hoverText) => {
 let rect = hoverText.getBoundingClientRect();
 let circleHeight = circle.offsetHeight;
 let circleWidth = circle.offsetWidth;

 let index = textSets.indexOf(hoverText);
 if (index === -1) {
   // If the hover text is not in the text sets, don't change the circle's position.
   return;
 }

 if (index === 0) {
   circle.style.marginLeft = '7%'
   circle.style.left = rect.left + circleWidth / 2 + 3 + 'px';
   circle.style.top = rect.top + -15 + rect.height + circleHeight / 2 + 'px';
 } else if (index === 1) {
   circle.style.marginLeft = '1%'
   circle.style.left = rect.left + circleWidth / 2 + 3 + 'px';
   circle.style.top = rect.top + rect.height + circleHeight / 2 + 'px';
 } else {
   circle.style.left = rect.left + circleWidth / 2 + 3 + 'px';
   circle.style.top = rect.top + rect.height + circleHeight / 2 + 'px';
   circle.style.margin = '0'
 }


 // Store the circle's position in localStorage
 localStorage.setItem('circleTop', circle.style.top);
 localStorage.setItem('circleLeft', circle.style.left);

 //just in case
 if (window.scrollY >= 5 && window.scrollY <= 10) {
  circle.style.top = rect.top + 5 + rect.height + circleHeight / 2 + 'px';
 }
}


window.onload = () => {
  circle.style.display = "block"
 if (window.location.pathname === '/index.html') {
     setCirclePosition(textSet1);
 }
 if (window.location.pathname === '/projects.html') {
     setCirclePosition(textSet2);
 }
 if (window.location.pathname === '/play.html') {
    setCirclePosition(textSet3);
}
if (window.location.pathname === '/info.html') {
    setCirclePosition(textSet4);
}

 // Retrieve the circle's position from localStorage
 let circleTop = localStorage.getItem('circleTop');
 let circleLeft = localStorage.getItem('circleLeft');

 // If a stored position exists, set the circle's position to the stored position
 if (circleTop !== null && circleLeft !== null) {
     circle.style.top = circleTop;
     circle.style.left = circleLeft;
 }
}


hoverTexts.forEach(hoverText => {
  hoverText.addEventListener('mouseover', () => {
   if (window.scrollY >= 0 && window.scrollY <= 10) {
     setCirclePosition(hoverText);
   }
  });
 
  hoverText.addEventListener('mouseout', () => {
   if (window.scrollY >= 0 && window.scrollY <= 10) {
     setCirclePosition(hoverText);
   }
  });
 });
// ===================================================

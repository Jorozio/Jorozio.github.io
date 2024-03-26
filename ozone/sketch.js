
let scanValue;
let textElements = [];
let damageScale;
let regParaText = 'Adjust the slider to visualize the scale of ozone layer depletion caused by various everyday human activities. The size of the damage reflects the amount of harmful substances released into the atmosphere, contributing to ozone depletion.'



let ConvertedDamageScale;
let ConvertedDistanceScale;


let i = window.matchMedia("(min-height: 900px)").matches ? 0 : 1;



function setup() {
  createCanvas(windowWidth, windowHeight);
  damageScale = createSlider(0, 500, 0);
  damageScale.addClass('custom-slider');


  const cellSize = 80;

  const cols = windowWidth / cellSize;

  const rows = windowHeight / cellSize;

  const adjustedCanvasHeight = rows * cellSize;
  resizeCanvas(windowWidth, adjustedCanvasHeight);

  for (; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = j * cellSize - 5;
      const y = i * cellSize + 230;

    
      let textElement = createP('O');
      textElement.class('variable-font'); // Apply the .variable-font class
      textElement.html('O'); // Set the text content

      // Position the text element
      textElement.position(x, y);
      textElement.x = x + cellSize / 2;
      textElement.y = y + cellSize;

      textElements.push(textElement);
    }
}

}


let titleText = document.getElementById('title-text')
let digitText = document.getElementById('second-half') 
let digit = document.getElementById('first-half')
let paragraph = document.getElementById('paragraph')


function draw() {

  background(0); 
  fontChange()



}

function fontChange() {
        
    


  for (let textElement of textElements) {
    let distance = dist(mouseX, mouseY, textElement.x, textElement.y);

    const scanValue = map(distance, 0, min(width , height), ConvertedDamageScale, 100);
let D_SCALE = damageScale.value()
    // const damageScale = damageScale.value();
    ConvertedDamageScale = map(D_SCALE, 0, 500, 0, -500)
    // for the black
    ConvertedDistanceScale = map(D_SCALE, 0, 500, 0, 400)


switch (styleDisplayed) {
  case "start": {
    digit.innerHTML = ' '
    digitText.innerHTML = ' '
    titleText.innerHTML = ' '
    textElement.style(`font-variation-settings: "BLED" 0, "SCAN" 100`)
    break
  }
  case "driving": {
    titleText.innerHTML = 'Driving to work';
    ConvertedDamageScale = map(D_SCALE, 0, 500, -100, -400); 
    ConvertedDistanceScale = map(D_SCALE, 0, 500, 100, 400);
    const dayValue = floor(map(D_SCALE, 0, 500, 1, 5));
    digit.innerHTML = dayValue
    digitText.innerHTML = 'out of 7 days'

    if(dayValue === 5){
      paragraph.innerHTML = 'It might not seem like a lot, but the damage adds up. Where possible, take public transport and reduce the cumulative impact of harmful chemicals being released into the ozone.'
      } else { paragraph.innerHTML = regParaText
      }

    if(distance < ConvertedDistanceScale){
      
      textElement.style('color: rgb(0, 0, 0)')
    } else{ textElement.style('color: rgb(255, 255, 255)')}
    textElement.style(`font-variation-settings: "BLED" 0, "SCAN" ${scanValue}`)



    break
  }
  case "aircon": {

    ConvertedDamageScale = map(D_SCALE, 0, 500, -100, -1000); 
    ConvertedDistanceScale = map(D_SCALE, 0, 500, 60, 510);
    titleText.innerHTML = 'Using the aircon for a full day';
    digitText.innerHTML = 'in 25 people'
    const airconValue = floor(map(D_SCALE, 0, 500, 1, 12));
    digit.innerHTML = airconValue
    if(airconValue === 12){
      let text = 'As global temperatures continue to rise, the threat to the ozone layer intensifies. One significant contributor is the release of ozone-depleting substances (ODS) from air conditioners and other industrial sources. These harmful emissions further deteriorate the ozone layer.';
      paragraph.innerHTML = text

    } else { paragraph.innerHTML = regParaText
    }
  
    if(distance < ConvertedDistanceScale){
      
      textElement.style('color: rgb(0, 0, 0)')
    } else{ textElement.style('color: rgb(255, 255, 255)')}
    textElement.style(`font-variation-settings: "BLED" 0, "SCAN" ${scanValue}`)

    break
  }
  case "commerse": {
    ConvertedDamageScale = map(D_SCALE, 0, 500, -60, -400); 
    ConvertedDistanceScale = map(D_SCALE, 0, 500, 60, 400);
    titleText.innerHTML = 'Buying internationally';
    digitText.innerHTML = 'in 78 people'
    const comValue = floor(map(D_SCALE, 0, 500, 1, 27));
    digit.innerHTML = comValue

    if(comValue === 27){
      paragraph.innerHTML = 'Roughly 27 out of 78 people shop internationally, encouraging mass-producing factories and unnecessary shipping costs to the ozone layer. By shopping locally where possible, you can make a small change that goes a long way.'
      } else { paragraph.innerHTML = regParaText
      }

    if(distance < ConvertedDistanceScale){
      
      textElement.style('color: rgb(0, 0, 0)')
    } else{ textElement.style('color: rgb(255, 255, 255)')}
    textElement.style(`font-variation-settings: "BLED" 0, "SCAN" ${scanValue}`)

    break
  }
}
  

  }
}



// select element to use between shapes
const selectElement = document.getElementById("ozone-option")
//store initial shape
let styleDisplayed = "start"

// when user is selecting a new option
selectElement.onchange = (event) => {
  //update the shape displayed
  styleDisplayed = event.target.value
  damageScale.value(0); 
}




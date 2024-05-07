// initialising starting bits
let metaballShader;
let balls = [];
let c

// setting the starting values for the radii and velocity
let baseRadius = 900;
let baseVelocity = 17;

// declaring a new variable to change the radius and speed
let newRadius; let newSpeed;
// increment value for the change of the radius and speed
let reductionFactor = 0.007;

// a variable to store the min value that these can go to
let minSpeed = 0.09;
let minRadius = 200;

// load a new font 
let myfont;
function preload() {
  myfont = loadFont('fonts/HelveticaNeueLight.otf');

}



function setup() {
  c = createCanvas(windowWidth, windowHeight, WEBGL);
  // set the starting position for the canvas

  c.position(0, currentY)

  textAlign(LEFT, CENTER);

  metaballShader = createShader(
    //  ========== green shader ==========
    // see digital poster documentation for annotation
    `attribute vec3 aPosition;
    uniform float width;
    uniform float height;
    varying highp vec2 vPos;
    void main() {
      gl_Position = vec4(aPosition, 1.0);
      vPos = vec2((gl_Position.x + 1.) / 2. * width, (gl_Position.y + 1.) / 2. * height);
    }`,
    `precision highp float;
    #define BALLS 12
    uniform float xs[BALLS];
    uniform float ys[BALLS];
    uniform float rs[BALLS];
    uniform float alpha;
    varying highp vec2 vPos;
    void main() {
      float sum = 0.;
      for (int i = 0; i < BALLS; i++) {
        float dx = xs[i] - vPos.x;
        float dy = ys[i] - vPos.y;
        float d = length(vec2(dx, dy));
        sum += rs[i] / d;
      }
  
  
      vec3 color2 = vec3(0.0 / 255.0, 25.0 / 255.0, 38.0 / 255.0 );
      vec3 color1 = vec3(0.0 / 255.0, 255.0 / 255.0, 145.0 / 255.0);
  
      
  
      float t = (sum - 18.0) / (11.0 - 1.0); // Normalize sum to [0, 1]
      vec3 color = mix(color2, color1, t);
  
      gl_FragColor = vec4(color, alpha);
  
    }`
  );




  // see digital poster documentation for annotation
  shader(metaballShader);
  for (let i = 0; i < 12; i++) {
    balls.push(new Ball(random(width), random(height)));
  }

  // see digital poster documentation for annotation
  metaballShader.setUniform('width', width);
  metaballShader.setUniform('height', height);
  metaballShader.setUniform('rs', balls.map(b => b.r));


}



function draw() {

  background('#021926');

  // if flag triggered
  if (shouldMove) {
    // set a value for the easing 
    let easingFactor = 0.1;
    // use linear interpolation between the 2 values to make it more smooth
    currentY = lerp(currentY, targetY, easingFactor);
    //increment down
    currentY -= moveSpeed;
    // move the canvas based off the current y value
    c.position(0, currentY);
  } 

  // if the currentY value has reached its target or has gone below
  if (currentY <= targetY) {
    // Select all elements with the class 'header-link-style'
    const headerLinks = document.querySelectorAll('.header-link-style');

    // Iterate over the elements and change their color to black
    headerLinks.forEach(link => {
      link.style.color = 'black'; // Change the color to black
    });
    // same with the buttons
    const imageButton = document.querySelectorAll('.image-button');
// change the image of the icon to black aswell
    imageButton.forEach(button => {
      button.style.backgroundImage = "url('img/busymindsblack.png')"; // Change the background image
    });


    const InfoContainer = document.getElementById('introduction-container')

    InfoContainer.style.display = 'block'

  }

  if (held) {
    balls.forEach(ball => {
      // Calculate the new radius
      let newRadius = ball.r - (ball.r * reductionFactor);

      // Ensure the new radius is not below the minimum
      if (newRadius < minRadius) {
        newRadius = minRadius;
      }

      // Update the ball's radius
      ball.r = newRadius;

      // Calculate the new speed
      let newSpeed = ball.speed - (ball.speed * reductionFactor * 1.5);

      // Ensure the new speed is not below the minimum
      if (newSpeed < minSpeed) {
        newSpeed = minSpeed;
      }

      // Update the ball's speed
      ball.speed = newSpeed;
    });

  }

// ===================================== everything below is annotated inside of digital poster ======================================
  textSize(45);
  textFont(myfont);
  fill(0, 255, 145);
  text("THE CONSTANT", -170, -130)
  text("HUSTLE OF LIFE", -170, -90)
  text("CAN WEAR YOU", -170, -50)
  text("DOWN IN WAYS", -170, -10)
  text("THAT’S HARD", -170, 30)
  text("TO SEE", -170, 70)


  metaballShader.setUniform('xs', balls.map(b => b.pos.x));
  metaballShader.setUniform('ys', balls.map(b => b.pos.y));
  metaballShader.setUniform('rs', balls.map(b => b.r));

  quad(-1, -1, 1, -1, 1, 1, -1, 1);

  for (const ball of balls) {
    ball.update(balls);

  }

}

class Ball {
  constructor(x, y) {
    this.pos = { x, y };
    this.r = baseRadius;  // Set initial radius based on ballAmount
    this.vel = createVector(random(-baseVelocity, baseVelocity), random(-baseVelocity, baseVelocity));

    this.speed = 1;
    this.speedMin = 0.2;
    this.speedMax = 1;
    this.speedIncrement = 0.01;
  }




  update(balls) {
    // Update position based on velocity
    this.pos.x += this.vel.x * this.speed;
    this.pos.y += this.vel.y * this.speed;

   

    // Check for collision with canvas edges and reverse direction if necessary
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1; // Reverse horizontal direction
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1; // Reverse vertical direction
    }
  }


}


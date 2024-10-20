let gameResult = undefined;
let buttonIsClicked = false; // for reset button

// UFO movement
let startgame = false;

let y = 350;
let velocity = 5;
let acceleration = 0.5;
let gravity = 0.8;
let restartTime = 0;
const restartDelay = 500; // 900ms = 0.9 sec

// COMET
let commetOne = {
  x: 200,
  y: 200,
  speed: 1,
};
let commetTwo = {
  x: 600,
  y: 300,
  speed: 1.8,
};
commetThree = {
  x: 1000,
  y: 800,
  speed: 0.7,
};
//STARRY SKY INSPIRATION FROM LECTURES
let stars = [];

let bgY = 800;
let direction = "forward";

function preload() {
  title = loadImage("js/title.png");
  titletwo = loadImage("js/titletwo.png");
} // Load the image before canvas was draw for smooth game

function setup() {
  // Help by StackOverflow
  // Canvas
  createCanvas(windowWidth, windowHeight);
  window.addEventListener("resize", windowResized); //checking if window is resized

  // Initialize stars
  for (let i = 0; i < 300; i++) {
    const star = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      alpha: Math.random(),
    };
    stars.push(star);
  }

  // Create an audio element // HELP BY AI
  const bgMusic = new Audio("js/intospace.mp3");

  bgMusic.loop = true;
  bgMusic.volume = 0.5;
  bgMusic.preload = "auto";
  bgMusic.addEventListener("error", function (err) {
    console.error("Error loading audio:", err);
  });

  // Function to play the music and remove event listeners
  function playMusic() {
    // Play the music
    bgMusic.play().catch(function (error) {
      console.warn("Audio play failed:", error);
    });
    // Remove the event listeners to avoid multiple plays on subsequent interactions
    window.removeEventListener("mousedown", playMusic);
    window.removeEventListener("keydown", playMusic);
  }

  // Add event listeners for both "mousedown" and "keydown"
  window.addEventListener("mousedown", playMusic);
  window.addEventListener("keydown", playMusic);
  frameRate(60);
}

function draw() {
  drawGeneral();
  drawStars();
  drawAura();
  drawCommencecommet();
  moon();
  cyanBttn();
  drawShadows();
  drawGame();
  drawTitle();
  gameMetrics();
  //Display Messages
  if (gameResult === "win") {
    messageWin();
  } else if (gameResult === "lost") {
    messageLost();
  }
  drawResetBttn();
  drawCursor();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); //resize the window
}

function drawGeneral() {
  noStroke();
  clear();
  background(30, 30, 70);
}

function drawTitle() {
  var imageWidth;
  var imageHeight;
  var imageX;
  var imageY;

  if (!startgame) {
    if (windowWidth < 700) {
      imageWidth = windowWidth * 0.7;
      imageHeight = imageWidth * (16 / 15);
      imageX = windowWidth / 2 - imageWidth / 2;
      imageY = windowHeight / 2.5 - imageHeight / 2.5;
      image(titletwo, imageX, imageY, imageWidth, imageHeight);
    } else {
      imageWidth = windowWidth * 0.4;
      imageHeight = imageWidth * (16 / 25);
      imageX = windowWidth / 2 - imageWidth / 2;
      imageY = windowHeight / 6;
      image(title, imageX, imageY, imageWidth, imageHeight);
    }
  }
}

function drawStars() {
  noStroke();
  for (let star of stars) {
    fill(255, 255, 255, Math.abs(Math.sin(star.alpha)) * 1000);
    ellipse(star.x, star.y, 3);
    star.alpha = star.alpha + 0.01;
  }
}

function drawAura() {
  bgcolor(bgY);
  if (direction === "forward") {
    if (bgY < 850) {
      bgY = bgY + 0.5;
    } else {
      direction = "backwards";
    }
  } else if (direction === "backwards") {
    if (bgY > 750) {
      bgY = bgY - 0.4;
    } else {
      direction = "forward";
    }
  }
}

function drawShadows() {
  if (y <= windowHeight / 2.3) {
    ufoshadow(0, 0);
  } else {
    const width = 85 + ((y - windowHeight / 2) / 30) * 11; //change the size
    const distance = 20 + ((y - windowHeight / 2) / 30) * 5; //depending on the distance
    ufoshadow(width, distance);
  }
}

function drawCursor() {
  paw(mouseX, mouseY);
}

function drawCommencecommet() {
  commetshower(commetOne);
  commetshower(commetTwo);
  commetshower(commetThree);
}

function commetshower(comet) {
  comet.x += comet.speed;
  comet.y += comet.speed;

  if (comet.y > windowHeight) {
    comet.x = random(windowWidth);
    comet.y = 0;
  }
  commet(comet.x, comet.y);
}

// OBJECTS
function paw(x, y) {
  noStroke();
  if (mouseIsPressed || keyIsDown(32)) {
    fill(97, 255, 115, 80);
    ellipse(x - 5, y - 5, 45, 45);
    ellipse(x - 5, y - 5, 60, 60);
    ellipse(x - 5, y - 5, 75, 75);
    fill(0, 255, 204);
  } else {
    fill(255, 153, 51);
  }
  ellipse(x, y, 25, 25);

  function beans() {
    ellipse(x - 24, y - 5, 12, 12);
    ellipse(x - 15, y - 20, 12, 12);
    ellipse(x + 3, y - 23, 12, 12);
  }
  beans();
}

function commet(x, y) {
  push();
  stroke(255, 255, 255, 40);
  strokeWeight(10);
  line(x, y, x - 100, y - 100);
  pop();
  fill(255, 196, 94);
  noStroke();
  ellipse(x, y, 15, 15);
}

function bgcolor(bgY) {
  fill(25, 25, 66, 150);
  if (windowWidth > 900) {
    ellipse(
      width / 2,
      bgY + windowHeight / 0.63,
      windowWidth * 2.3,
      windowHeight * 4.7
    );
    fill(24, 24, 57, 100);
    ellipse(
      width / 2,
      bgY + windowHeight / 0.63,
      windowWidth * 1.9,
      windowHeight * 4
    );
    fill(234, 221, 153, 20);
    ellipse(
      width / 2,
      bgY + windowHeight / 0.63,
      windowWidth * 1.7,
      windowHeight * 3.5
    );
  } else if (windowWidth <= 900) {
    ellipse(
      width / 2,
      bgY + windowHeight / 0.63,
      windowWidth * 8,
      windowHeight * 4.7
    );
    fill(24, 24, 57, 100);
    ellipse(
      width / 2,
      bgY + windowHeight / 0.62,
      windowWidth * 8,
      windowHeight * 4.15
    );
    fill(234, 221, 153, 20);
    ellipse(
      width / 2,
      bgY + windowHeight / 0.62,
      windowWidth * 7,
      windowHeight * 3.7
    );
  }
}

function moon() {
  noStroke();
  fill(255, 196, 94);
  if (windowWidth >= 900) {
    ellipse(width / 2, height / 0.6, width * 1.25, height * 1.8);
  } else {
    ellipse(width / 2, height / 0.6, width * 5, height * 1.8);
  }
}

function ufoshadow(w = 0, h = 0) {
  fill(240, 147, 71);
  ellipse(width / 2, windowHeight / 1.2, w, h);
}

function pulse(y) {
  fill(97, 255, 115, 110);
  noStroke();
  beginShape();
  vertex(width / 2 - 40, y + 5);
  bezierVertex(
    width / 2 - 40,
    y + 5,
    width / 2,
    y + 150,
    width / 2 + 40,
    y + 5
  );
  endShape();

  beginShape();
  vertex(width / 2 - 60, y + 5);
  bezierVertex(
    width / 2 - 60,
    y + 5,
    width / 2,
    y + 230,
    width / 2 + 60,
    y + 5
  );
  endShape();

  beginShape();
  vertex(width / 2 - 70, y + 5);
  bezierVertex(
    width / 2 - 70,
    y + 5,
    width / 2,
    y + 280,
    width / 2 + 70,
    y + 5
  );
  endShape();
}

function cyanBttn() {
  push();
  fill(94, 255, 215);
  //stroke(0, 204, 153);
  noStroke();
  strokeWeight(3);
  ellipse(windowWidth / 10, windowHeight / 5, 60, 60, 15);
  pop();
}

function drawResetBttn() {
  if (buttonIsClicked) {
    resetGame();
    console.log("clicked");
    buttonIsClicked = false;
  }
}

function mouseClicked() {
  if (
    mouseX > windowWidth / 10 &&
    mouseX < windowWidth / 10 + 20 &&
    mouseY > windowHeight / 5.5 &&
    mouseY > windowHeight / 5.5 - 10
  ) {
    buttonIsClicked = true;
  }
}

// distance 200px
// distance / 200 = between 0 and 1
// 1 - number between 0 and 1
// shadow times our number

function ufo(y) {
  noStroke();
  fill(94, 255, 215);

  if (!startgame) {
    // Levitate before the game start
    let levitationdistance = 15;
    let levitate = levitationdistance * Math.sin(frameCount * 0.05);
    y += levitate;
  }
  //ship
  ellipse(width / 2, y, 200, 75);

  //cockpit
  fill(107, 136, 153);
  beginShape();
  vertex(width / 2 - 60, y - 25);
  bezierVertex(
    width / 2 - 60,
    y - 25,
    width / 2,
    y - 45,
    width / 2 + 60,
    y - 25
  );
  bezierVertex(
    width / 2 + 60,
    y - 10,
    width / 2 - 30,
    y + 5,
    width / 2 - 60,
    y - 25
  );
  endShape();

  //cat
  push();
  fill(71, 71, 71);
  noStroke();
  rect(width / 2 - 28, y - 65, 56, 40, 6);

  //ear-right
  beginShape();
  vertex(width / 2 + 28, y - 59);
  bezierVertex(
    width / 2 + 22,
    y - 91,
    width / 2 + 12,
    y - 69,
    width / 2 + 11,
    y - 65
  );
  endShape();

  //ear-left
  beginShape();
  vertex(width / 2 - 28, y - 59);
  bezierVertex(
    width / 2 - 22,
    y - 91,
    width / 2 - 12,
    y - 69,
    width / 2 - 10,
    y - 65
  );
  endShape();

  //cheek-left
  beginShape();
  vertex(width / 2 - 28, y - 48);
  bezierVertex(
    width / 2 - 30,
    y - 47,
    width / 2 - 36,
    y - 45,
    width / 2 - 27,
    y - 28
  );
  endShape();

  //cheek-right
  beginShape();
  vertex(width / 2 + 28, y - 48);
  bezierVertex(
    width / 2 + 30,
    y - 47,
    width / 2 + 36,
    y - 45,
    width / 2 + 27,
    y - 28
  );
  endShape();

  //eye-left
  fill(255);
  noStroke();
  ellipse(width / 2 - 12, y - 50, 16, 14);
  fill(204, 153, 255);
  noStroke();
  ellipse(width / 2 - 11, y - 50, 11);
  fill(255);
  ellipse(width / 2 - 9, y - 52, 6);

  //eye-right
  noStroke();
  ellipse(width / 2 + 12, y - 50, 16, 14);
  fill(204, 153, 255);
  noStroke();
  ellipse(width / 2 + 11, y - 50, 11);
  fill(255);
  ellipse(width / 2 + 13, y - 52, 6);

  //mouth
  noFill();
  stroke(255, 255, 255);
  strokeWeight(1.2);
  beginShape();
  vertex(width / 2 - 5, y - 39);
  bezierVertex(width / 2 - 5, y - 39, width / 2 - 3, y - 36, width / 2, y - 39);
  endShape();
  beginShape();
  vertex(width / 2, y - 39);
  bezierVertex(width / 2, y - 39, width / 2 + 3, y - 36, width / 2 + 5, y - 39);
  endShape();

  //scarf
  fill(247, 147, 30);
  noStroke();
  rect(width / 2 - 28, y - 25, 58, 17, 10);
  pop();

  //Paws
  fill(50, 50, 50);
  rect(width / 2 + 5, y - 18, 13, 10, 6);
  rect(width / 2 - 10, y - 18, 13, 10, 6);

  //glass
  fill(169, 196, 195, 100);
  noStroke();
  beginShape();
  vertex(width / 2 - 60, y - 25);
  bezierVertex(
    width / 2 - 50,
    y - 125,
    width / 2 + 60,
    y - 105,
    width / 2 + 60,
    y - 25
  );
  bezierVertex(
    width / 2 + 30,
    y + 10,
    width / 2 - 50,
    y - 10,
    width / 2 - 60,
    y - 25
  );
  endShape();
  //reflection
  fill(255, 254, 217, 80);
  beginShape();
  vertex(width / 2 - 10, y - 8);
  bezierVertex(
    width / 2 - 60,
    y - 125,
    width / 2 + 60,
    y - 98,
    width / 2 + 55,
    y - 17
  );
  bezierVertex(
    width / 2 + 55,
    y - 17,
    width / 2 + 40,
    y - 9,
    width / 2 - 0,
    y - 7
  );
  endShape();
}

function messageWin() {
  fill(255, 196, 94);
  textSize(50);
  textFont("rooney-sans,Comic Sans MS, sans-serif");
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("✨Yay, you did it!✨", windowWidth / 2, windowHeight / 2.5);
}

function messageLost() {
  fill(255, 196, 94);
  textSize(50);
  textFont("rooney-sans,Comic Sans MS, sans-serif");
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("💥Game Over!💥", windowWidth / 2, windowHeight / 2.5);
}

function drawGame() {
  if (mouseIsPressed || keyIsDown(32)) {
    startgame = true;
  }

  // UFO MOVEMENT
  if (startgame) {
    if (keyIsDown(32) || mouseIsPressed) {
      velocity -= acceleration;
      pulse(y);
    } else if (y >= 0) {
      velocity += gravity;
    }
    y += velocity;

    if (y >= windowHeight / 1.2) {
      y = windowHeight / 1.2;
      acceleration = 0;
    } else if (y <= -150) {
      y = -150;
      velocity = 15;
    }
  }
  ufo(y);
}
function gameMetrics() {
  if (startgame && gameResult === undefined) {
    if (y >= windowHeight / 1.2) {
      if (velocity <= 2) {
        gameResult = "win";
        restartTime = millis();
      } else if (velocity >= 3) {
        gameResult = "lost";
        restartTime = millis();
      }
    }
  }

  if (gameResult != undefined) {
    const elapsedTime = millis() - restartTime;
    if (elapsedTime > restartDelay && (mouseIsPressed || keyIsDown(32))) {
      resetGame();
    }
  }
}

function resetGame() {
  startgame = false;
  y = 350;
  velocity = 10;
  acceleration = 0.9;
  gameResult = undefined;
}

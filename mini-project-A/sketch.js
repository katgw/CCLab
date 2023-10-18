let sequence = 0; // mode
let frames = 0; // time factor
let amp;
let x, y, a, b;
let angle = 0;
let cloudY1, cloudY2, cloudY3;
let cloudX;

// S3: cactus
let cactX = 620;
let cactY = 300;
let cactRad = 30;

// S3: flower
let flwrX = 450;
let flwrY = 300;
let flwrRad = 30;
let flwrColors = []; // empty array
let flwrColorIndex = 0;

let rS, gS, bS;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("p5-container");

  x = width / 2;
  y = 320;
  dia = 50;
  ySpeed = 0;
  angleMode(DEGREES);
  cloudX = 0;
  cloudY = random(0, 200);
  cloudxSpeed = random(-5, 5);
  cloudySpeed = random(-5, 5);

  flwrColors = [
    color(255, 146, 238),
    color(199, 155, 255),
    color(126, 145, 230),
  ];
}

let targetX = 500;
let targetY = 400;
let targetRad = 50;

function draw() {

  if (sequence == 0) {
    SUN();
    ULURU();
    spaceSIGN();
  } else if (sequence == 1) {
    // INSTRUCTIONS PAGE
    background(127, 224, 255);
    fill(165, 195, 107);
    rect(0, 270, width, 200);
    instructions();
  } else if (sequence == 2) {
    // LAND
    frames++;
    LAND();
    ROO();
    if (frames == 700) {
      frames = 0;
      sequence++;
    }
  } else if (sequence == 3) {
    // SEA
    frames++;
    SEA();
    FISH();
    SHARK();
    if (frames == 600) {
      frames = 0;
      sequence++;
      x = 0;
    }
  } else if (sequence == 4) {
    // SKY
    frames++;
    x = x + 2;

    SKY();
    kookaburra();
    cloudTARGET();

    //TEST TARGET
    checkCollision(targetX, targetY, targetRad);

    // display GameOver
    if (gameOver == true) {
      push();
      fill("black");
      stroke(3);
      textSize(50);
      textAlign(CENTER);
      strokeJoin(ROUND);
      text("GAME OVER", width / 2, 200);
      pop();
      if (y > height + 100) {
        resetScenes();
        sequence = 6;
      }
    }

    if (frames == 900) {
      frames = 0;
      sequence++;
    }
  } else if (sequence == 5) {
    // WIN SCREEN
    frames++;
    SUN();
    ULURU();
    winSIGN();
    rooPRINT(frames, 250 + 30 * sin(frames * 7));
    kookaburraPRINT(frames * 1.5, 100 + 10 * sin(frames * 5));

    //POOL FOR SHARK
    push();
    fill(86, 188, 255);
    beginShape();
    curveVertex(-500, 300);
    curveVertex(0, 430);
    curveVertex(90, 420);
    curveVertex(150, 450);
    curveVertex(230, 430);
    curveVertex(300, 450);
    curveVertex(380, 450);
    curveVertex(450, 460);
    curveVertex(500, 430);
    curveVertex(500, 550);
    curveVertex(450, 550);
    curveVertex(250, 550);
    curveVertex(0, 500);
    curveVertex(-500, 300);
    endShape();

    sharkPRINT(frames, 474);

    fill(86, 188, 255, 50);
    beginShape();
    curveVertex(-500, 300);
    curveVertex(0, 430);
    curveVertex(90, 420);
    curveVertex(150, 450);
    curveVertex(230, 430);
    curveVertex(300, 450);
    curveVertex(380, 450);
    curveVertex(450, 460);
    curveVertex(500, 430);
    curveVertex(500, 550);
    curveVertex(450, 550);
    curveVertex(250, 550);
    curveVertex(0, 500);
    curveVertex(-500, 300);
    endShape();
    pop();

    if (frames > 500) {
      frames = -100;
    }
  } else if (sequence == 6) {
    // GAME OVER SCREEN
    gameoverSUN();
    ULURU();
    gameoverSIGN();
  }
}

function cloudTARGET() {
  targetX = 550 - frames * 1.5;
  targetY = 200;
  push();
  noStroke();
  fill("yellow");
  triangle(
    targetX,
    targetY,
    targetX + 20,
    targetY + 90,
    targetX - 20,
    targetY + 90
  );
  triangle(
    targetX - 10,
    targetY + 80,
    targetX + 30,
    targetY + 80,
    targetX + 10,
    targetY + 140
  );
  fill(88, 87, 87);
  arc(targetX, targetY + 40, targetRad * 2, targetRad * 2.5, 180, 360);
  arc(targetX - 45, targetY + 60, targetRad * 2, targetRad * 2, 180, 360);
  arc(targetX + 45, targetY + 60, targetRad * 2, targetRad * 2, 180, 360);
  pop();
}

function ULURU() {
  noStroke();
  fill(203, 97, 23);
  quad(100 - 55, 225, 300 - 55, 225, 350 - 55, 300, 50 - 55, 300);
  fill(220, 97, 23);
  quad(150 - 55, 215, 300 - 55, 215, 350 - 55, 300, 100 - 55, 300);

  fill(165, 195, 107);
  rect(0, 300, width, 200);
}
function SUN() {
  background("#8CDAFF");

  for (let y = 0; y < 350; y++) {
    stroke(rS, gS, bS);
    rS = 100 + y * 0.3;
    gS = 220 + y * 0.2;
    bS = 255;
    line(0, y, width, y);
  }

  angle += 0.45;
  let radDist = 140;
  let w = width / 2;
  let h = 300;
  let sinValue = -sin(angle) * radDist;
  let cosValue = -cos(angle) * radDist;

  if (angle > 200) {
    angle = 0;
  }

  fill(255, 247, 2);
  noStroke();
  circle(w + 1.5 * cosValue, h + 1.5 * sinValue, 50);

  //RAYS
  fill(255, 247, 2, 100);
  circle(w + 1.5 * cosValue, h + 1.5 * sinValue, 65);
  fill(255, 247, 2, 50);
  circle(w + 1.5 * cosValue, h + 1.5 * sinValue, 80);
  fill(255, 247, 2, 20);
  circle(w + 1.5 * cosValue, h + 1.5 * sinValue, 95);
}
function gameoverSUN() {
  for (let y = 0; y < 350; y++) {
    stroke(rS, gS, bS);
    rS = 180 + y;
    gS = 85 + y * 0.3;
    bS = 0;
    line(0, y, width, y);
  }

  angle += 0.45;
  let radDist = 140;
  let w = width / 2;
  let h = 300;
  let sinValue = -sin(angle) * radDist;
  let cosValue = -cos(angle) * radDist;

  if (angle > 200) {
    angle = 0;
  }

  fill(255, 247, 2);
  noStroke();
  circle(w + 1.5 * cosValue, h + 1.5 * sinValue, 50);

  //RAYS
  fill(255, 247, 2, 100);
  circle(w + 1.5 * cosValue, h + 1.5 * sinValue, 65);
  fill(255, 247, 2, 50);
  circle(w + 1.5 * cosValue, h + 1.5 * sinValue, 80);
  fill(255, 247, 2, 20);
  circle(w + 1.5 * cosValue, h + 1.5 * sinValue, 95);
}

function spaceSIGN() {
  fill(170, 170, 170);
  rect(250, 200, 10, 120);
  rect(350, 200, 10, 120);
  fill(34, 118, 34);
  rect(230, 180, 150, 80, 5);

  push();
  noFill();
  stroke("white");
  strokeWeight(1.5);
  rect(233, 183, 144, 74, 2);
  textSize(20);
  fill("white");
  text("SPACEBAR", 250, 227);
  pop();

  fill("white");
  textSize(18);
  text("Press the", 265, 207);
  text("to continue", 260, 244);
}
function winSIGN() {
  fill(170, 170, 170);
  rect(250, 200, 10, 120);
  rect(350, 200, 10, 120);
  fill(34, 118, 34);
  rect(230, 180, 150, 80, 5);

  push();
  noFill();
  stroke("white");
  strokeWeight(1.5);
  rect(233, 183, 144, 74, 2);
  textSize(20);
  fill("white");
  text("CONGRATS!", 245, 212);
  pop();

  fill("white");
  textSize(12);
  text("Your Australian holiday", 244, 225);
  text("has ended.", 280, 235);
  text("Come back soon!", 260, 245);
}
function gameoverSIGN() {
  fill(170, 170, 170);
  rect(250, 200, 10, 120);
  rect(350, 200, 10, 120);
  fill(151, 30, 30);
  rect(230, 180, 150, 80, 5);

  push();
  noFill();
  stroke("white");
  strokeWeight(1.5);
  rect(233, 183, 144, 74, 2);
  textSize(20);
  fill("white");
  text("GAME OVER", 245, 217);
  pop();

  fill("white");
  textSize(12);
  text("Press SPACEBAR", 255, 232);
  text("to restart", 280, 242);
}
function LAND() {
  noStroke();
  background("#9DE0FF");

  //ROLLING HILLS
  hill(50, 2, 3, 30, 70, 30, 95);
  hill(30, 1, 2, 45, 121, 45, 120);

  //GROUND
  fill("#FFE596");
  noStroke();
  rect(0, 340, 400, 150);

  //OBSTACLES
  cactus();
  flower();
}
function ROO() {
  x = width / 2;

  //ROO JUMP

  y = y + ySpeed;
  if (y == 320) {
    if (mouseIsPressed == true) {
      ySpeed = -6;
    } else if (mouseIsPressed == false) {
      ySpeed = 0;
    }
  }
  if (y < 130) {
    ySpeed = ySpeed * -1;
  }

  //MOVING TAIL
  noStroke();
  if (y >= 130 && y < 320) {
    push();
    noFill();
    stroke(103, 66, 3);
    strokeWeight(10);
    arc(x - 40, y + 10, 50, 50, 360, 90);
    pop();
  } else {
    push();
    noFill();
    stroke(103, 66, 3);
    strokeWeight(10);
    arc(x - 35, y + 10, 50, 20, 360, 150);
    pop();
  }

  //ROO
  noStroke();
  fill(0, 0, 0); // beak
  ellipse(x + 20, y, 20, 10);
  fill(214, 162, 72); // body
  circle(x, y, dia);
  fill("black"); // eye
  circle(x + 15, y - 5, 5);
  fill(157, 117, 48); // pouch + ear
  arc(x + 15, y + 8, 30, 25, 90, 180);
  arc(x, y + 8, 47, 30, 0, 40);
  arc(x, y - 20, 10, 10, 150, 330);

  //MOVING FEET
  if (y >= 130 && y < 320) {
    fill(103, 66, 3);
    arc(x + 10, y + 25, 25, 15, 220, 40);
  } else {
    fill(103, 66, 3);
    arc(x + 10, y + 25, 25, 15, 180, 360);
  }
}

function cactus() {
  //MOVEMENT
  cactX += -3;
  if (cactX < -40) {
    cactX = width + random(100, 150);
  }

  //OBJECT
  push();
  stroke(20, 182, 60);
  strokeWeight(18);
  line(cactX, cactY + 40, cactX, cactY - 20);
  noFill();
  arc(cactX, cactY, 40, 30, 0, 180);

  // CHECK COLLISION
  let distance = dist(x, y, cactX, cactY);
  if (distance < cactRad) {
    push();
    stroke("red");
    strokeWeight(1);
    fill(255, 0, 0)
    textSize(random(30, 38));
    text("OUCH!!", cactX - 50, cactY - 70);
    pop();
  } else {
    //
  }

  pop();
}
function flower() {
  //MOVEMENT
  flwrX += -3;
  if (flwrX < -30) {
    flwrX = width + random(100);
    flwrColorIndex++;
    if (flwrColorIndex == flwrColors.length) {
      flwrColorIndex = 0;
    }
  }

  //OBJECT
  push();
  translate(flwrX, flwrY);

  strokeWeight(10);
  stroke("green");
  line(0, 40, 0, 0);

  let clr = flwrColors[flwrColorIndex];
  stroke(clr);
  strokeWeight(18);
  point(0, 0);
  point(0, -20);
  point(10, -10);
  point(-10, -10);

  stroke("yellow");
  point(0, -10);

  pop();

  // CHECK COLLISION
  let distance = dist(x, y, flwrX, flwrY);
  if (distance < flwrRad) {
    push();
    textSize(30);
    noStroke();
    fill(255, 255, 0);
    text("yipee!!", flwrX - 35, flwrY - 70);
    pop();
  } else {
    //
  }
}
function hill(amp, speed, frameSpeed, r, g, b, posit) {
  for (let x = 0; x < 400; x += 1) {
    let sinValue = sin(x * speed + frameCount * frameSpeed) * amp;
    let y = height / 2 + sinValue;
    strokeWeight(1);
    stroke(r, g, b);
    line(x, y + posit, x, 400);
  }
}

function SEA() {
  let r2 = map(frames, 20, width * 0.9, 130, 0);
  let g2 = map(frames, 20, width * 0.9, 230, 60);
  let b2 = map(frames, 20, width * 0.9, 255, 70);

  background(r2, g2, b2);

  //CLOUDS AT DAY
  cloudT = map(frames, 100, 300, 255, 0);

  if (frames < 270) {
    fill(255, 255, 255, cloudT);
    cloudX = x + 15;

    if (cloudX > 400) {
      cloudY1 = random(0, 100);
      cloudY2 = random(100, 200);
      cloudY3 = random(200, 300);
    }
    //CLOUD1
    arc(cloudX - 50, cloudY1, 50, 50, 180, 360);
    arc(cloudX, cloudY1, 80, 100, 180, 360, PIE);
    arc(cloudX + 50, cloudY1, 50, 50, 180, 360);
    //CLOUD2
    arc(cloudX, cloudY2, 50, 50, 180, 360);
    arc(cloudX + 50, cloudY2, 80, 100, 180, 360, PIE);
    arc(cloudX + 100, cloudY2, 50, 50, 180, 360);
    //CLOUD3
    arc(cloudX - 100, cloudY3, 50, 50, 180, 360);
    arc(cloudX - 50, cloudY3, 80, 100, 180, 360, PIE);
    arc(cloudX, cloudY3, 50, 50, 180, 360);
  }

  //STARS AT NIGHT
  if (frames > 270) {
    for (let x = 0; x < width; x += 20) {
      fill("white");
      circle(random(width), random(height), 3, 50);
    }
  }

  //HARBOUR BRIDGE
  harbourBridge();

  // SUN&MOON
  let r1 = 255;
  let g1 = map(frames, 0, width * 0.9, 239, 255);
  let b1 = map(frames, 0, width * 0.9, 0, 255);

  angle += 1;
  let radDist = 130;
  let w = width / 2;
  let h = height / 2;
  let sinValue = -sin(angle) * radDist;
  let cosValue = -cos(angle) * radDist;

  fill(r1, g1, b1);
  noStroke();
  let sun = circle(w + cosValue, h + sinValue, 50);

  //RAYS
  fill(r1, g1, b1, 100);
  circle(w + cosValue, h + sinValue, 65);
  fill(r1, g1, b1, 50);
  circle(w + cosValue, h + sinValue, 80);
  fill(r1, g1, b1, 20);
  circle(w + cosValue, h + sinValue, 95);

  // WAVES
  for (let x = 0; x < 400; x += 1) {
    let amp1 = 20;
    let amp2 = 10;
    let amp3 = 5;

    let sinValue1 = sin(x * 3 + frameCount * 5) * amp3;
    let sinValue2 = sin(x + frameCount * 3) * amp1;
    let sinValue3 = sin(x * 2 + frameCount * 3) * amp2;
    let sinValue4 = sin(x + frameCount * 4) * amp2;

    let y1 = height / 5 + sinValue1;
    let y2 = height / 5 + sinValue2;
    let y3 = height / 5 + sinValue3;
    let y4 = height / 5 + sinValue4;

    strokeWeight(1);
    //BACKGROUND WAVE
    stroke(93, 181, 205);
    line(x, y4 + 50, x, 400);
    //WAVE1
    stroke(66, 136, 187, 150);
    line(x, y1 + 50, x, 400);
    //WAVE2
    stroke(0, 150, 200, 100);
    line(x, y2 + 50, x, 400);
    //WAVE3
    stroke(93, 160, 205, 100);
    line(x, y3 + 50, x, 400);
  }
}
function SHARK() {
  x = map(frames, 0, 600, 0, 450);

  noStroke();

  //SWIM
  y = y + ySpeed;
  if (mouseIsPressed == true) {
    ySpeed = -5;
  } else if (mouseIsPressed == false) {
    ySpeed = 1;
  }

  //BOUNDARIES
  if (y < 200) {
    y = 200;
  } else if (y > 400) {
    y = 400;
  }

  //ILLUSTRATION
  push();
  fill(193, 204, 209); //tail
  triangle(x - 40, y - 20, x - 20, y - 10, x - 20, y + 10);
  triangle(x - 40, y + 20, x - 20, y + 10, x - 20, y - 10);
  triangle(x - 15, y - 35, x + 18, y - 18, x - 10, y - 10); //dorsal fin
  fill(244, 246, 246); // bottom
  arc(x, y, 50, 30, 0, 180);
  fill(193, 204, 209); // top
  arc(x, y, 50, 50, 170, 360);
  fill("black"); // eye
  circle(x + 15, y - 3, 3);
  noFill();
  stroke(86, 120, 134);
  strokeWeight(2);
  arc(x + 5, y, 10, 15, 140, 230);
  arc(x + 8, y, 10, 15, 140, 230);
  arc(x + 11, y, 10, 15, 140, 230);
  pop();

  //pectoral fin
  noStroke();

  if (mouseIsPressed == true) {
    noStroke();
    fill(180, 186, 189);
    triangle(x - 3, y, x - 10, y + 18, x - 12, y);
  } else {
    fill(180, 186, 189);
    triangle(x - 3, y, x - 20, y + 12, x - 12, y);
  }
}

let fishX = 0;
let fishY = 0;
let fishSpdX = 1.1;
function FISH() {
  //FISH
  fishX += fishSpdX;
  // reappxear
  if (fishX > width + 50) {
    fishX = -50;
  }
  fishY = sin(frameCount * 3) * 10;

  push();
  translate(fishX, fishY);
  //fins
  fill(187, 66, 133);
  beginShape();
  curveVertex(13, 350);
  curveVertex(5, 330);
  curveVertex(10, 325);
  curveVertex(20, 327);
  curveVertex(30, 330);
  curveVertex(37, 335);
  curveVertex(37, 340);
  endShape(CLOSE);

  beginShape();
  curveVertex(13, 350);
  curveVertex(15, 368);
  curveVertex(20, 370);
  curveVertex(23, 375);
  curveVertex(25, 380);
  curveVertex(27, 375);
  curveVertex(30, 370);
  curveVertex(35, 360);
  endShape(CLOSE);

  beginShape();
  curveVertex(-10, 335);
  curveVertex(10, 350);
  curveVertex(-10, 365);
  endShape(CLOSE);

  // body
  fill(252, 214, 235);
  beginShape();
  curveVertex(0, 350);
  curveVertex(15, 340);
  curveVertex(30, 335);
  curveVertex(42, 340);
  curveVertex(48, 350);
  curveVertex(42, 360);
  curveVertex(30, 365);
  curveVertex(15, 360);
  curveVertex(0, 350);
  endShape(CLOSE);

  //eye
  fill("white");
  strokeWeight(0.3);
  stroke("black");
  circle(38, 347, 8);

  fill("black");
  circle(39, 347, 3);

  //fin2
  fill(187, 66, 133);
  noStroke();
  beginShape();
  curveVertex(15, 345);
  curveVertex(25, 350);
  curveVertex(15, 355);
  endShape(CLOSE);

  //bubbles
  fill(255, 255, 255, 50);
  circle(random(33, 43), random(200, 330), 5);
  circle(random(33, 43), random(200, 330), 15);
  circle(random(33, 43), random(200, 330), 20);
  pop();
}

function SKY() {
  let r = map(frames, 0, 800, 125, 0);
  let g = map(frames, 0, 800, 218, 50);
  let b = map(frames, 0, 800, 255, 70);
  background(r, g, b);

  constellation();
}
function constellation() {
  constellT = map(frames, 350, 800, 0, 255); //cloud transparency

  push();
  stroke(255, 255, 255, constellT);
  strokeWeight(13);
  point(270, 100);
  point(320, 150);
  point(240, 160);
  point(265, 270);
  strokeWeight(7);
  point(285, 195);
  pop();
}

function kookaburra() {
  noStroke();
  //BIRD JUMP
  y = y + ySpeed;

  //REAPPEAR
  if (x > width + 50) {
    x = -50;
  }
  // GAME OVER
  if (gameOver) {
    // over
    x += random(-4, 1);
    ySpeed = random(1, 5);
  } else {
    // not over
    if (mouseIsPressed == true) {
      ySpeed = -5;
    } else if (mouseIsPressed == false) {
      ySpeed = 1;
    }

    // BOUNDARY - STAY ON SCREEN
    if (y > 400) {
      y = 400;
    } else if (y < 0) {
      y = 0;
    }
  }

  // WATCH OUT MESSAGE
  if (targetX > -100) {
    fill("white");
    rect(x + 20, y - 50, 100, 30, 5);
    fill("black");
    text("WATCH OUT!", x + 30, y - 30);
  }

  fill(251, 151, 0); // beak
  ellipse(x + 20, y + 5, 20, 10);
  fill(245, 233, 209); // body
  circle(x, y, dia);
  fill("black"); // eye
  circle(x + 15, y, 5);
  fill(94, 71, 32); // wing
  arc(x - 17, y - 5, 45, 45, 20, 200);
  fill(44, 204, 251);
  arc(x - 15, y - 5, 40, 40, 20, 200);
}

let gameOver = false;

function checkCollision(tx, ty, tRad) {
  let distance = dist(x, y, tx, ty);
  if (distance < 30 + tRad) {
    // collided!
    gameOver = true;
  } else {
    // not!
  }
  if (gameOver == true) {
    // ow message
    push();
    fill("white");
    rect(x + 20, y - 50, 100, 30, 5);
    fill("red");
    strokeWeight(1.5);
    stroke("red")
    textSize(18);
    text("NOOOO!!!", x + 30, y - 30);
    pop();
  }
}

function keyPressed() {
  if (key == " ") {
    if (sequence != 2 && sequence != 3 && sequence != 4) {
      frames = 0;
      x = 0; // start at 0
      sequence++;
    }
    if (sequence > 4) {
      sequence = 0;
    }
    if (sequence == 0) {
      resetScenes();
    }
  } else if (key == "r") {
    resetScenes();
  }
}

function resetScenes() {
  sequence = 0;
  frames = 0;
  gameOver = false;

  x = width / 2;
  y = 320;
  dia = 50;
  ySpeed = 0;
  cloudX = 0;
  cloudY = random(0, 200);
  cloudxSpeed = random(-5, 5);
  cloudySpeed = random(-5, 5);
}

//ILLUSTRATIONS
function instructions() {
  push();
  fill(170, 170, 170);
  rect(90, 160, 20, 150);
  rect(290, 160, 20, 150);
  fill(34, 118, 34);
  rect(60, 20, 280, 140, 30);
  noFill();
  stroke("white");
  strokeWeight(2);
  rect(65, 25, 270, 130, 25);

  //INFO ON INSPO
  noStroke();
  fill("white");
  rect(90, 40, 220, 30, 5);
  fill("black");
  textSize(20);
  text("HOW TO PLAY", 130, 62);
  textSize(12);
  fill("white");
  text("Out, About, and Down Under is an interactive", 80, 90);
  text("game that will take you on an Australian", 90, 102);
  text("holiday! Explore Australian landscapes with", 83, 114);
  text("your favourite Aussie animals!", 120, 126);

  //INDIVIDUAL BOARDS
  fill(200, 200, 200);
  rect(40, 250, 20, 200);
  rect(190, 250, 20, 200);
  rect(340, 250, 20, 200);
  diamond(50, 205);
  diamond(200, 205);
  diamond(350, 205);
  kookaburraPRINT(445, 230);
  rooPRINT(60, 230);
  sharkPRINT(255, 235);
  pop();

  //ANIMAL LABELS
  fill(241, 214, 12);
  rect(10, 285, 80, 30, 5);
  rect(150, 280, 98, 39, 5);
  rect(303, 285, 95, 30, 5);

  fill("black");
  noFill();
  stroke(0.5);

  rect(12, 287, 76, 26, 3);
  rect(152, 282, 94, 35, 3);
  rect(305, 287, 91, 26, 3);

  fill("black");
  textSize(12);
  stroke(0.1);
  text("KANGAROO", 15.5, 305);
  text("GREAT WHITE", 158, 298);
  text("SHARK", 180, 310);
  text("KOOKABURRA", 309, 305);

  //USER CONTROLS
  fill("black");
  textSize(15);
  stroke(2);
  text("CLICK", 26, 220);
  text("CLICK", 180, 220);
  text("CLICK", 329, 220);
  noStroke();
  textSize(12);
  text("to JUMP", 26, 235);
  text("to SWIM", 180.5, 235);
  text("to FLY", 333, 235);
}
function diamond(x, y) {
  push();
  strokeJoin(ROUND);
  stroke(241, 214, 12);
  strokeWeight(10);
  fill(241, 214, 12);
  beginShape();
  vertex(x + 0, y + 65);
  vertex(x + 65, y + 0);
  vertex(x + 0, y - 65);
  vertex(x - 65, y + 0);
  vertex(x + 0, y + 65);
  endShape();

  strokeJoin(ROUND);
  stroke(0, 0, 0);
  strokeWeight(2);
  noFill();
  beginShape();
  vertex(x + 0, y + 65);
  vertex(x + 65, y + 0);
  vertex(x + 0, y - 65);
  vertex(x - 65, y + 0);
  vertex(x + 0, y + 65);
  endShape();

  pop();
}
function kookaburraPRINT(x, y) {
  scale(0.8);
  noStroke();
  fill(251, 151, 0); // beak
  ellipse(x + 20, y + 5, 20, 10);
  fill(245, 233, 209); // body
  circle(x, y, dia);
  fill("black"); // eye
  circle(x + 15, y, 5);
  fill(94, 71, 32); // wing
  arc(x - 17, y - 5, 45, 45, 20, 200);
  fill(44, 204, 251);
  arc(x - 15, y - 5, 40, 40, 20, 200);
}
function rooPRINT(x, y) {
  noStroke();
  fill(0, 0, 0); // beak
  ellipse(x + 20, y, 20, 10);
  push(); //tail
  noFill();
  stroke(103, 66, 3);
  strokeWeight(10);
  arc(x - 35, y + 10, 50, 20, 360, 150);
  pop();
  fill(214, 162, 72); // body
  circle(x, y, dia);
  fill("black"); // eye
  circle(x + 15, y - 5, 5);
  fill(157, 117, 48); // pouch + ear
  arc(x + 15, y + 8, 30, 25, 90, 180);
  arc(x, y + 8, 47, 30, 0, 40);
  arc(x, y - 20, 10, 10, 150, 330);
  fill(103, 66, 3); //legs
  arc(x + 10, y + 25, 25, 15, 180, 360);
}
function sharkPRINT(x, y) {
  fill(193, 204, 209); //tail
  triangle(x - 40, y - 20, x - 20, y - 10, x - 20, y + 10);
  triangle(x - 40, y + 20, x - 20, y + 10, x - 20, y - 10);
  triangle(x - 15, y - 35, x + 18, y - 18, x - 10, y - 10); //dorsal fin
  fill(244, 246, 246); // bottom
  arc(x, y, 50, 30, 0, 180);
  fill(193, 204, 209); // top
  arc(x, y, 50, 50, 170, 360);
  fill("black"); // eye
  circle(x + 15, y - 3, 3);
  noFill();
  stroke(86, 120, 134);
  strokeWeight(2);
  arc(x + 5, y, 10, 15, 140, 230);
  arc(x + 8, y, 10, 15, 140, 230);
  arc(x + 11, y, 10, 15, 140, 230);

  //pectoral fin
  noStroke();
  fill(180, 186, 189);
  triangle(x - 3, y, x - 20, y + 12, x - 12, y);
}
function harbourBridge() {
  push();
  stroke(0);
  strokeWeight(7);
  noFill();
  arc(width / 2, 150, 350, 200, 200, 340);
  arc(width / 2, 160, 240, 140, 190, 350);

  fill("black");
  quad(30, 70, 70, 70, 100, 200, 5, 200);
  quad(370, 70, 330, 70, 300, 200, 395, 200);
  rect(80, 140, 250, 10);

  strokeWeight(4);
  noFill();
  strokeJoin(ROUND);
  beginShape();
  vertex(85, 138);
  vertex(110, 65);
  vertex(110, 110);
  vertex(140, 55);
  vertex(140, 97);
  vertex(170, 55);
  vertex(170, 92);
  vertex(200, 50);
  vertex(200, 88);
  vertex(230, 50);
  vertex(230, 90);
  vertex(260, 55);
  vertex(260, 100);
  vertex(290, 65);
  vertex(290, 115);
  vertex(325, 85);
  endShape();

  beginShape(LINES);
  vertex(110, 150);
  vertex(110, 110);
  vertex(140, 100);
  vertex(140, 150);
  vertex(170, 90);
  vertex(170, 150);
  vertex(200, 90);
  vertex(200, 150);
  vertex(230, 90);
  vertex(230, 150);
  vertex(260, 90);
  vertex(260, 150);
  vertex(290, 115);
  vertex(290, 150);
  endShape(LINES);
  pop();

  console.log(mouseX, mouseY);
}

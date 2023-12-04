function preload() {
  img = loadImage("brush.png");
  scrub = loadSound("scrub.mp3");
}
function setup() {
  createCanvas(windowWidth, 500);
  circleX = width / 2;
  circDia = 250;
  circleY = height / 2 + 30;

  background(50, 50, 200);

  brushCanvas = createGraphics(width, height);
}
function draw() {
  penguin1();
  image(brushCanvas, 0, 0);
  clean();

  //MOUSE APPEAR IN BELLY
  let d = dist(mouseX, mouseY, circleX, circleY);
  if (d < 100) {
    brush(mouseX, mouseY);
  }

  penguin2();
}
function penguin1() {
  noStroke();

  fill("black");
  arc(circleX, circleY, circDia + 30, circDia + 130, PI, TWO_PI);
  fill("white");
  circle(circleX, circleY, circDia);

  //OIL SPLOTCHES
  //centre
  fill(100, 69, 32, 170);
  beginShape();
  curveVertex(circleX, circleY - 50);
  curveVertex(circleX + 30, circleY - 70);
  curveVertex(circleX + 20, circleY - 20);
  curveVertex(circleX + 50, circleY + 20);
  curveVertex(circleX + 10, circleY + 40);
  curveVertex(circleX, circleY);
  curveVertex(circleX - 40, circleY);
  curveVertex(circleX - 20, circleY - 50);
  curveVertex(circleX, circleY - 50);
  curveVertex(circleX, circleY - 50);
  endShape();

  //left side
  fill(100, 69, 32, 80);
  beginShape();
  curveVertex(circleX - 90, circleY);
  curveVertex(circleX - 70, circleY - 30);
  curveVertex(circleX - 60, circleY - 10);
  curveVertex(circleX - 50, circleY - 50);
  curveVertex(circleX - 10, circleY + 30);
  curveVertex(circleX - 30, circleY + 70);
  curveVertex(circleX - 50, circleY + 30);
  curveVertex(circleX - 70, circleY + 40);
  curveVertex(circleX - 90, circleY + 20);
  endShape(CLOSE);

  //right side
  push();
  curveTightness(0.3);
  fill(100, 69, 32, 220);
  strokeJoin(ROUND);
  beginShape();
  curveVertex(circleX - 40, circleY + 125);
  curveVertex(circleX - 50, circleY + 60);
  curveVertex(circleX + 20, circleY + 20);
  curveVertex(circleX + 50, circleY + 50);
  curveVertex(circleX + 80, circleY + 20);
  curveVertex(circleX + 90, circleY);
  curveVertex(circleX + 125, circleY);
  curveVertex(circleX + 50, circleY + 120);
  endShape(CLOSE);
  pop();
}
function penguin2() {
  push();
  noFill();
  stroke("black");
  strokeWeight(30);
  circle(circleX, circleY, circDia);
  pop();

  //penguin features
  //eyes
  fill("white");
  circle(circleX + 40, circleY - 120, 30);
  circle(circleX - 40, circleY - 120, 30);
  fill("black");
  circle(circleX + 30, circleY - 115, 15);
  circle(circleX - 30, circleY - 115, 15);
  //beak
  fill("orange");
  triangle(
    circleX - 20,
    circleY - 120,
    circleX + 20,
    circleY - 120,
    circleX,
    circleY - 100
  );
  //blush
  fill("pink");
  ellipse(circleX + 80, circleY - 110, 30, 15);
  ellipse(circleX - 80, circleY - 110, 30, 15);
}

function brush(x, y) {
  fill("green");
  ellipse(x, y, 30, 10);
  fill("beige");
  rect(x - 15, y, 30, 15);
  image(img, mouseX - 40, mouseY - 30);
}

function clean() {
  let d = dist(mouseX, mouseY, circleX, circleY);
  if (mouseIsPressed && d < 100) {
    brushCanvas.fill(255, 255, 255, 50);
    brushCanvas.noStroke();
    brushCanvas.ellipse(mouseX, mouseY, 20, 20);
    brushCanvas.ellipse(mouseX - 20, mouseY - 10, 30, 30);
    brushCanvas.ellipse(mouseX + 20, mouseY + 5, 40, 20);
    brushCanvas.ellipse(mouseX - 10, mouseY + 10, 20, 10);
    brushCanvas.ellipse(mouseX + 10, mouseY, 20, 20);
   if (scrub.isPlaying()==false)
    scrub.play();
  } else {
    scrub.stop();
  }
}

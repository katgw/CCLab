function setup() {
  createCanvas(windowWidth, 500);
  circleX = width / 2;
  circDia = 250;
  circleY = height / 2 + 30;

  background(50, 50, 200);
  penguin();
}

function penguin() {
  noStroke();

  fill("black");
  arc(circleX, circleY, circDia + 30, circDia + 130, PI, TWO_PI);
  fill("white");
  circle(circleX, circleY, circDia, circDia);

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
  push()
  curveTightness(0.3)
  fill(100, 69, 32, 220);
  strokeJoin(ROUND)
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
  pop()
}

function draw() {
  clean();
  cursor('grab')

  push();
  noFill();
  stroke("black");
  strokeWeight(30);
  circle(circleX, circleY, circDia, circDia);
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
function brush() {
  fill("green");
  ellipse(mouseX, mouseY, 30, 10);
  fill("beige");
  rect(mouseX - 15, mouseY, 30, 15);
}
function clean() {
  let d = dist(mouseX, mouseY, circleX, circleY);

  if (mouseIsPressed) {
    if (d < 100) {
      fill(255, 255, 255, 50);
      noStroke();
      rect(mouseX - 25, mouseY - 20, 50, 45);
    } else {
    }
  }
}

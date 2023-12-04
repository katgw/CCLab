let bgColor;
function setup() {
  let canvas = createCanvas(1000, 600);
  canvas.parent('canvas-container');

  bgColor = color(255);
  background(bgColor);
}

function draw() {
  background(bgColor);
}

function changeBackground() {
  bgColor = color(random(255), random(255), random(255));
}
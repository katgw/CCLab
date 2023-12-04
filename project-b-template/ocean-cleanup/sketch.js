let trashImageFiles = [
  "images/bag.png",
  "images/bottle-green.png",
  "images/can-red.png",
  "images/coffee-cup.png",
  "images/can-yellow.png",
];
let trashImages = []; // images
let trashes = []; // Object
let count = 0;

function preload() {
  for (let i = 0; i < trashImageFiles.length; i++) {
    let filepath = trashImageFiles[i];
    let img = loadImage(filepath);
    trashImages.push(img);
  }

  bam = loadImage("images/explosion.png");
  net = loadImage("images/fishing-net.png");
}

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);

  for (let i = 0; i < 10; i++) {
    let randomIndex = floor(random(trashImages.length)); /// 0, 1, 2
    let t = new Trash(
      random(width),
      random(-500, -100),
      trashImages[randomIndex]
    );
    trashes.push(t);
  }
}

function draw() {
  background("lightblue");
  NET(mouseX, mouseY);

  let count = 0;
  for (let i = 0; i < trashes.length; i++) {
    let t = trashes[i];
    t.move();
    t.zigzag();
    t.fall();
    t.reappear();
    t.display();
    t.checkMouse();
    if (t.a == 0) count++;
  }
  
  if (count >= trashes.length) {
    textSize(20)
    fill("rgb(0,95,144)")
    text("CONGRATS ON CLEANING THE OCEAN!", width / 2-180, height / 2);
  }
}

function NET(x, y) {
  push();
  translate(x, y);
  if (mouseIsPressed) {
    rotate(45);
  }
  translate(35, -30);
  imageMode(CENTER);
  image(net, 0, 0);
  pop();
}
class Trash {
  constructor(x, y, img, bam) {
    this.img = img;
    this.bam = bam;
    this.x = x;
    this.y = y;
    this.rad = 50;

    this.xSpd = 0;
    this.ySpd = random(5);
    this.isVisible = true;
    //
    this.angle = random(360);
    this.angleVel = random(-3, 3);
    // color
    this.r = random(200, 255);
    this.g = random(200, 255);
    this.b = random(200, 255);
    this.a = 200;
  }

  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
    //
    this.angle += this.angleVel;
  }
  fall() {
    this.ySpd += 0.1; // play with this number
  }
  zigzag() {
    this.x += sin(frameCount / 10) + 0.5;
  }
  reappear() {
    if (this.y > height) {
      this.x = random(width);
      this.y = -50;
      this.ySpd = 2;
    }
  }

  checkMouse() {
    let distance = dist(mouseX + 40, mouseY, this.x, this.y);
    if (distance < this.rad) {
      // in
      if (mouseIsPressed) {
        this.ySpd = random(-30, -15);
        this.r = random(0, 255);
        this.g = random(0, 255);
        this.b = random(0, 255);
        this.a = 0;
      }
    } else {
      // out
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    //circle(0, 0, this.rad * 2);
    imageMode(CENTER);
    tint(this.r, this.g, this.b, this.a);
    image(this.img, 0, 0);

    pop();
  }
}

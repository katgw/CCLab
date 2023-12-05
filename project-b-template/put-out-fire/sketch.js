let FRAME_AREA = 30;

let flames = [];
let particles = [];
let sequence = 0;

function preload() {
  fire = loadImage("put-out-fire/fire.png");
  droplet = loadImage("put-out-fire/drop.png");
  spray = loadSound("put-out-fire/water-spray.mp3");
  hose = loadImage("put-out-fire/hose.png");
}

function setup() {
  angleMode(DEGREES);
  createCanvas(600, 600);

  // FIRE
  for (let i = 0; i < 20; i++) {
    flames.push(new Flame(random(width), random(height - 50, height)));
  }
}

function draw() {
  background(0);

  if (sequence == 0) {
    fill("white");
    textSize(30);
    textAlign(CENTER);
    text("🔥 Hey there firefighter! 🔥 ", width / 2, height / 2 - 20);
    text("Press spacebar to start!", width / 2, height / 2 + 20);
    keyPressed();
  } else if (sequence == 1) {
    let count = 0;
    for (let i = 0; i < flames.length; i++) {
      let f = flames[i];
      f.move();
      f.expand();
      f.decrease(particles);
      f.display();
      if (f.scale < 0.05) count++;
    }

    // remove
    for (let i = flames.length - 1; i >= 0; i--) {
      let f = flames[i];
      if (f.isDone) {
        flames.splice(i, 1);
      }
    }

    //generate particles
    if (mouseIsPressed) {
      for (let i = 0; i < 10; i++) {
        particles.push(new Particle(mouseX, mouseY, random(2, 4)));
      }
    }

    // updatge and display particles
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.move();
      p.fall();
      p.zigzag();
      p.display();
    }

    // remove
    for (let i = particles.length - 1; i >= 0; i--) {
      let p = particles[i];
      if (p.isDone) {
        particles.splice(i, 1);
      }
    }
    // display completion
    if (flames.length == 0) {
      textSize(30);
      fill("orange");
      textAlign(CENTER);
      text("💪 CONGRATS FIREFIGHTER! 💪", width / 2, height / 2 - 10);
      text("You put out all the fire!", width / 2, height / 2 + 30);
    }
  }
  noCursor();
  newCursor();
}

function newCursor() {
  push();
  translate(mouseX, mouseY);
  imageMode(CENTER);
  if (mouseX > width / 2) {
    rotate(35);
    image(hose, +10, +8);
  } else if (mouseX < width) {
    rotate(-35);
    scale(-1, 1)
    image(hose, +10, +8);
  }
  pop();
}
function keyPressed() {
  if (key == " ") {
    if (sequence == 0) {
      sequence++;
    }
  }
}

function mousePressed() {
  if (sequence == 1) {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) { spray.play() };
  } else {
  }
}

class Flame {
  constructor(x, y, fire) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = random(50, 85);

    this.scale = 1.0;
    this.fluct = 0;
    this.noiseFreq = random(0.05, 0.2);
    this.fire = fire;
    this.color = color(random(200, 255), random(100, 150), 0, random(100, 200));
    this.isDone = false;
  }

  move() {
    this.fluct = noise(frameCount * this.noiseFreq) * 50;
  }

  expand() {
    this.scale += 0.005;
  }

  decrease(waterdrops) {
    for (let i = 0; i < waterdrops.length; i++) {
      let drop = waterdrops[i];
      let distance = dist(this.x, this.y, drop.x, drop.y);
      if (distance < FRAME_AREA) {
        // collided!
        this.scale -= 0.02;
        if (this.scale <= 0) {
          this.isDone = true;
        }
      }
    }
  }

  display() {
    let w = this.width * 5;
    let h = this.height + this.fluct;
    push();
    blendMode(ADD);
    translate(this.x, this.y);
    scale(this.scale);
    image(fire, -w / 2, -h, w, h);
    pop();
  }
}

class Particle {
  constructor(x, y, tempDia, droplet) {
    this.x = x;
    this.y = y;
    if (mouseX > width / 2) {
      this.xSpd = -random(2, 4);
    } else if (mouseX < width / 2) {
      this.xSpd = random(2, 4);
    }
    this.ySpd = -7 + random(2, 5);
    this.angle = 0;
    this.dia = tempDia;

    // Color
    this.r = 255;
    this.g = 255;
    this.b = 255;
    //
    this.isDone = false;
  }

  fall() {
    this.ySpd += 0.1;
  }

  move() {
    // downward movement
    this.x += this.xSpd;
    this.y += this.ySpd;

    this.angle = atan2(this.ySpd, this.xSpd);

    // remove particle if it goes off-screen
    if (this.y > height) {
      this.isDone = true;
    }
  }

  zigzag() {
    this.x += random(-1, 1);
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    fill(this.r, this.g, this.b, 150);
    image(droplet, 0, 0);
    pop();
  }

  isTouching(flame) {
    // Check rain is touching the flame
    let d = dist(this.x, this.y, flame.x, flame.y);
    return d < flame.width / 2 && this.y < flame.y;
  }
}

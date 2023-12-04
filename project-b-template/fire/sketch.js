// replace the ellipse with an image
// rotate image for water spray atan2()
// we will discuss blendMode(ADD);
// oop: lifespan of the particles 
// collision


let flames = [];
let particles = [];

function setup() {
  createCanvas(400, 400);

  // FIRE
  for (let i = 0; i < 10; i++) {
    flames.push(new Flame(random(width), height));
  }

  // RAIN
  // Initialize particles at the mouse position from the start
  for (let i = 0; i < 800; i++) {
    let x = mouseX;
    let y = mouseY;
    let dia = random(2, 4);
    particles[i] = new Particle(x, y, dia);
  }
}

function draw() {
  background(0);

  for (let i = 0; i < flames.length; i++) {
    flames[i].move();
    flames[i].display();
    flames[i].expand();

    // Check if any particle is touching the flame
    for (let j = 0; j < particles.length; j++) {
      let p = particles[j];
      if (p.isTouching(flames[i])) {
        flames[i].decreaseHeight();
      }
    }
  }

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.fall();
    p.zigzag();
    p.display();
  }
}

class Flame {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 5;
    this.color = color(random(200, 255), random(100, 150), 0, random(100, 200));
  }

  move() {
    this.height += random(-10, 10);
  }

  expand() {
    if (this.height > 10) {
      this.width += 0.1;
    }

    if (this.width > 30) {
      this.width = 30;
    }
  }

  decreaseHeight() {
    // Decrease the flame height
    this.height -= 0.5;
    if (this.height < 0) {
      this.height = 0;
    }
    else{
    this.height += random(-10, 10);
    }
  }

  display() {
    fill(this.color);
    noStroke();
    arc(this.x, this.y, this.width, this.height, PI, TWO_PI);
  }
}

class Particle {
  constructor(x, y, tempDia) {
    this.x = x;
    this.y = y;
    this.xSpd = 0;
    this.ySpd = random(2, 5);
    this.dia = tempDia;
    // Color
    this.r = 255;
    this.g = 255;
    this.b = 255;
  }

  fall() {
    this.ySpd += 0.1;
  }

  move() {
    // curve movement
    if (mouseX > width / 2) {
      this.x -= 2;
      this.y -= 7;
    } else if (mouseX < width / 2) {
      this.x += 2;
      this.y -= 7;
    }

    // downward movement
    this.x += this.xSpd;
    this.y += this.ySpd;

    // Reset particle if it goes off-screen
    if (this.y > height) {
      this.x = mouseX;
      this.y = mouseY;
      this.ySpd = random(2, 5); // Reset the speed
    }
  }

  zigzag() {
    this.x += random(-1, 1);
  }

  display() {
    if (mouseIsPressed) {
      push();
      noStroke();
      fill(this.r, this.g, this.b, 220);
      circle(this.x, this.y, this.dia);
      pop();
    }
  }

  isTouching(flame) {
    // Check rain is touching the flame
    let d = dist(this.x, this.y, flame.x, flame.y);
    return d < flame.width / 2 && this.y < flame.y;
  }
}

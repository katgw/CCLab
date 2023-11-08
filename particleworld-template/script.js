let umbrel;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // particles
  for (let i = 0; i < 800; i++) {
    let x = random(width);
    let y = random(-1000, 0);
    let dia = random(2, 4);
    particles[i] = new Particle(x, y, dia);
  }

  // umbella
  umbrel = new Umbrella(width / 2, height / 2);
}

function draw() {
  //BACKGROUND
  background(24, 43, 95);

  //RAIN & UMBRELLA
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i]; // each object
    // update
    p.move();
    p.zigzag();
    p.fall();

    // check and compare
    p.reappear();
    p.bounce(umbrel);

    // display
    p.display();
  }

  umbrel.update();
  umbrel.display();
}

class Particle {
  constructor(tempX, tempY, tempDia) {
    this.x = tempX;
    this.y = tempY;
    this.xSpd = 0;
    this.ySpd = random(9);
    this.dia = tempDia;
    console.log(this.shift);
    //color
    this.r = 255;
    this.g = 255;
    this.b = 255;
  }
  fall() {
    this.ySpd += 0.1; // play with this number
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  zigzag() {
    this.x += random(-1, 1);
  }

  bounce(obj) {
    // obj == object == mbrel
    let distance = dist(this.x, this.y, obj.x, obj.y);
    if (distance < obj.rad) {
      this.ySpd *= -1; // flip
      this.ySpd *= random(0.2, 0.4); // reduce
      //move particles left or right to bounce off
      if (this.x > mouseX) {
        this.shift = 0;
        this.shift++;
        this.x += this.shift * 2;
      } else if (this.x < mouseX) {
        this.shift = 0;
        this.shift++;
        this.x -= this.shift * 2;
      }
    }
  }
  reappear() {
    if (this.y > height) {
      this.x = random(width);
      this.y = random(-150, 0);
      this.ySpd = 0; // reset the speed
    }
  }
  display() {
    push();

    noStroke();
    fill(this.r, this.g, this.b, 220);
    circle(this.x, this.y, this.dia);

    pop();
  }
}

class Umbrella {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rad = 75;

  }
  update() {
    this.x = mouseX;
    this.y = mouseY;
  }
  display() {
    push();
    translate(this.x, this.y);

    fill("black");
    circle(0, -75, 10);
    stroke("black");
    strokeWeight(10);
    line(0, 0, 0, this.rad + 10);
    noFill();
    arc(this.rad / 4, 85, this.rad / 2, this.rad / 2, 0, PI);

    noStroke();
    fill(153, 238, 234);
    arc(0, 0, this.rad * 2, this.rad * 2, PI, TWO_PI);

    pop();
  }
}

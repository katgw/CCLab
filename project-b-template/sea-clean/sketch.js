let bottle;

function setup() {
  createCanvas(windowWidth, 400);
  bottle = new BOTTLE(random(width), -50);
  bottle2 = new BOTTLE(random(width), -200);
}

function draw() {
  background("lightblue");
  bottle.display();
  bottle.move();
  bottle.zigzag();
  bottle.fall();
  bottle.reappear();

  bottle2.display();
  bottle2.move();
  bottle2.zigzag();
  bottle2.fall();
  bottle2.reappear();
}

function mousePressed() {
  // Mouse clicks BOTTLE1
  if (
    mouseX > bottle.x &&
    mouseX < bottle.x + 100 &&
    mouseY > bottle.y &&
    mouseY < bottle.y + 40
  ) {
    // Disappear
    bottle.toggleVisibility();
  }
  
  //MOUSE CLICKS BOTTLE 2
   if (
    mouseX > bottle2.x &&
    mouseX < bottle2.x + 100 &&
    mouseY > bottle2.y &&
    mouseY < bottle2.y + 40
  ) {
    // Disappear
    bottle2.toggleVisibility();
  }
}

class BOTTLE {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xSpd = 0;
    this.ySpd = random(10);
    this.isVisible = true;
    // color
    this.r = 255;
    this.g = 255;
    this.b = 255;
  }

  fall() {
    this.ySpd = 2; // play with this number
  }

  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }

  zigzag() {
    this.x += sin(frameCount / 10) + 0.5;
  }

  reappear() {
    if (this.y > height) {
      this.x = random(width);
      this.y = -50;
    }
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  display() {
    if (this.isVisible) {
      push();
      fill(this.r, this.g, this.b);
      noStroke();
      arc(this.x, this.y + 5.5, 15, 15, PI / 2, (3 * PI) / 2);
      arc(this.x, this.y + 20.5, 15, 15, PI / 2, (3 * PI) / 2);
      arc(this.x, this.y + 34.5, 15, 15, PI / 2, (3 * PI) / 2);

      stroke(this.r, this.g, this.b);
      strokeWeight(5);
      strokeJoin(ROUND);

      beginShape();
      vertex(this.x, this.y);
      vertex(this.x + 12, this.y);
      //vertex(this.x+15, this.y+5)
      //vertex(this.x + 30, this.y + 3);
      vertex(this.x + 35, this.y + 7);
      vertex(this.x + 45, this.y);
      vertex(this.x + 55, this.y);
      vertex(this.x + 65, this.y);
      vertex(this.x + 90, this.y + 10); // right top corner
      vertex(this.x + 100, this.y + 15);       
      vertex(this.x + 100, this.y + 20);       
      vertex(this.x + 100, this.y + 20);       
      vertex(this.x + 100, this.y + 25);       
      vertex(this.x + 90, this.y + 30); // bottom right
      vertex(this.x + 75, this.y + 35);
      vertex(this.x + 65, this.y + 35);
      vertex(this.x + 55, this.y + 35);
      vertex(this.x + 45, this.y + 30);
      vertex(this.x + 20, this.y + 40);
      vertex(this.x, this.y + 40); // bottom left
      endShape(CLOSE);
      
      noStroke()
      fill(90,156,224)
      rect(this.x+100,this.y+10,15,20)
      pop();
    }
  }
}

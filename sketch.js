let player;
let walkers = [];

function setup() {
  createCanvas(800, 600);
  player = new Player();
  
  // Membuat objek walker banyak dengan menggunakan array
  for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height);
    walkers.push(new Walker(x, y));
  }
}

function draw() {
  background(0,0,100);
  
  // Mendapatkan posisi mouse
  let targetX = mouseX;
  let targetY = mouseY;
  
  // Update posisi dan gerakan walker
  for (let walker of walkers) {
    walker.updatePosition(targetX, targetY);
    walker.display();
  }
  
  // Tampilkan karakter khusus
  player.updatePosition();
  player.display();
}

class Walker {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(3);
    this.acceleration = createVector();
    this.radius = 20;
    this.maxSpeed = 4;
    this.maxForce = 0.5;
    this.numPoints = 5; // Jumlah sudut bintang
    this.outerRadius = this.radius * 2; // Radius luar bintang
    this.innerRadius = this.radius; // Radius dalam bintang
  }

  display() {
    fill(255, 250, 0);
    this.drawStar(this.position.x, this.position.y, this.numPoints, this.outerRadius, this.innerRadius); // Menggambar bintang
  }

  drawStar(x, y, npoints, outerRadius, innerRadius) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
      let outerX = x + cos(a) * outerRadius * map(sin(frameCount * 0.05), -1, 1, 0.5, 1.0);
      let outerY = y + sin(a) * outerRadius * map(sin(frameCount * 0.05), -1, 1, 0.5, 1.0);
      vertex(outerX, outerY);
      let innerX = x + cos(a + halfAngle) * innerRadius * map(sin(frameCount * 0.1), -1, 1, 0.5, 1.0);
      let innerY = y + sin(a + halfAngle) * innerRadius * map(sin(frameCount * 0.5), -1, 1, 0.5, 1.0);
      vertex(innerX, innerY);
    }
    endShape(CLOSE);
  }

  updatePosition(targetX, targetY) {
    let target = createVector(targetX, targetY);
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.acceleration.add(steer);

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
}

// Class Player
class Player {
  constructor() {
    this.radius = 2;
    this.color = color(0, 250, 200);
  }

  display() {
    fill(this.color);
    rect(mouseX, mouseY, this.radius * 2);
  }

  updatePosition() {
    // Posisi karakter khusus diatur oleh posisi mouse
  }
}
class Enemy {

  constructor(speed) {
    this.speed = speed;
    let y;
    if (random(1) < 0.5) {
      // from top
      y = random(-300, 0);
    } else {
      // from bottom
      y = random(height, height + 300);
    }

    let x = random(-300, width + 300);
    this.pos = createVector(x, y);
    this.health = 2;
    this.img = loadImage('assets/img/enemy.png');
  }


  draw() {
    push();
    fill(100, 255, 100);
    let angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.img, 0, 0, 60, 60);
    pop();
  }


  update() {
    let difference = p5.Vector.sub(player.pos, this.pos);
    difference.limit(this.speed);
    this.pos.add(difference);
  }

  damagePlayer() {
    return dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 20;
  }
}
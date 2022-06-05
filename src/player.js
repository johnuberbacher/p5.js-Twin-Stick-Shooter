class Player {
  constructor() {
    this.pos = createVector(width / 2, height / 2)
    this.angle = 0;
    this.bullets = [];
    this.img = loadImage('assets/img/player.png');
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.img, 0, 0, 60, 60);
    pop();

    for (let bullet of this.bullets) {
      bullet.update();
      bullet.draw();
    }
  }

  update() {
    let xSpeed = 0;
    let ySpeed = 0;
    if (keyIsDown(65) || keyIsDown(37)) {
      xSpeed = -4;
    }

    if (keyIsDown(68) || keyIsDown(39)) {
      xSpeed = 4;
    }

    if (keyIsDown(87) || keyIsDown(38)) {
      ySpeed = -4;
    }

    if (keyIsDown(83) || keyIsDown(40)) {
      ySpeed = 4;
    }
    this.pos.add(xSpeed, ySpeed);
    this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x); // add this
  }

  shoot() {
    this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle));
  }

  hasShot(enemy) {
    for (let i = 0; i < this.bullets.length; i++) {
      if (dist(this.bullets[i].x, this.bullets[i].y, enemy.pos.x, enemy.pos.y) < 15) {
        this.bullets.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}
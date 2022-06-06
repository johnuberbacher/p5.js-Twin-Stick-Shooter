class Enemy {

  constructor(speed, type) {
    this.speed = speed;
    this.type = type;
    let y;
    if (random(1) < 0.5) {
      // from top
      y = random(-30, 0);
    } else {
      // from bottom
      y = random(height, height + 30);
    }

    let x = random(-30, width + 30);
    this.pos = createVector(x, y);
    this.particles = [];
    this.points = [];
    this.accel = 0.9;
    if (type == 'enemy') {
      this.health = 2 + level;
      this.img = loadImage('assets/img/enemy.png');
    } else {
      this.health = 10 + level;
      this.img = loadImage('assets/img/enemy2.png');
    }
  }


  draw() {
    push();
    if (this.health > 0) {
      let angle = atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x);
      translate(this.pos.x, this.pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.img, 0, 0, 60, 60);
    } else {
      for (var i = 0; i < this.points.length; i++) {
        var p = this.points[i]; // get a blob from the list
        var diam = 2 + 1 / p.age;

        stroke('#FFF');
        ellipse(p.x, p.y, diam, diam);

        p.x += p.xdrift;
        p.y += p.ydrift;

        p.xdrift = p.xdrift * this.accel; // this.accelerate your drift
        p.ydrift = p.ydrift * this.accel; // this.accelerate your drift

        p.ydrift = p.ydrift + 0.;

        p.age = p.age + 1; // increase your 'age' counter
      }
      this.points = this.points.filter(function (p) { // filter
        if (p.age > 100) return false;
        else return true;
      })
    }
    pop();
  }

  update() {
    if (this.health > 0) {
      let difference = p5.Vector.sub(player.pos, this.pos);
      difference.limit(this.speed);
      this.pos.add(difference);
    } else {
      for (var i = 0; i < 1; i++) {
        var newpoint = {
          x: this.pos.x + random(-2, 2),
          y: this.pos.y + random(-2, 2),
          xdrift: random(-10, 10),
          ydrift: random(-10, 10),
          age: 1
        };
        this.points.push(newpoint);
      }
    }
  }

  damagePlayer() {
    return dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 20;
  }
}
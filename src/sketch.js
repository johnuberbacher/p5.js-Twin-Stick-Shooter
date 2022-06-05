let player;
let enemies = [];

let enemiespawnTime = 1000;
let enemyMaxSpeed = 2;
let frame = 0
let score = 0;

let sfxPlayerShoot;
let sfxEnemyHit;

let fontRegular;
let shooting = false;

function preload() {
  fontRegular = loadFont('assets/fonts/SCE-PS3-RD-R-LATIN.otf');
  // sfxBgm = loadSound('assets/sfx/bgm.ogg');
  sfxPlayerShoot = loadSound('assets/sfx/player_shoot.wav');
  sfxEnemyHit = loadSound('assets/sfx/enemy_hit.wav');
  sfxEnemyDespawn = loadSound('assets/sfx/enemy_despawn.wav');
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  ui = new UI();
}

function draw() {
  // if (!sfxBgm.isPlaying()) {
  //    sfxBgm.play();
  // }
  background('#b7b39d');

  rectMode(CENTER);
  player.draw();
  player.update();


  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].draw();
    enemies[i].update();

    if (enemies[i].damagePlayer()) {
      restart();
      break;
    }

    if (player.hasShot(enemies[i])) {
      if (enemies[i]["health"] >= 1) {
        score++;
        sfxEnemyHit.play();
        enemies[i]["health"] = (enemies[i]["health"] - 1)
      } else {
        score = score + 3;
        sfxEnemyDespawn.play();
        enemies.splice(i, 1);
      }
    }
  }

  if (mouseIsPressed) {
    if (!shooting) {
      shooting = true;
      sfxPlayerShoot.play();
      player.shoot();
      setTimeout(() => { shooting = false; }, 150);
    }
  }

  if (frame >= enemiespawnTime) {
    enemies.push(new Enemy(random(enemyMaxSpeed)));
    enemiespawnTime *= 0.95;
    frame = 0;
  }
  if (frameCount % 1000 == 0) {
    enemyMaxSpeed += 0.1;
  }
  frame++;
  ui.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function restart() {
  player = new Player();
  enemies = [];
  enemiespawnTime = 300;
  enemyMaxSpeed = 2;
  score = 0;
}
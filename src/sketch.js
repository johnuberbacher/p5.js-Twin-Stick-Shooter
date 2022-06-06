let player;
let pauseMenu;
let enemies = [];
let levels = [
  [1, 0], [5, 0], [4, 1], [8, 2], [10, 4], [10, 7], [15, 10],
];
let level = 0;
let levelReady = false;

let enemiespawnTime = 120;
let enemyMaxSpeed = 3;
let frame = 0
let score = 0;

let fontRegular;
let shooting = false;
let paused = false;
let gameOverScreen = false;
let nextLevelScreen = false;

let randSong =  Math.floor(Math.random() * (4 - 1 + 1)) + 1; 
console.log(Math.floor(Math.random() * (4 - 1 + 1)) + 1);

function preload() {
  fontRegular = loadFont('assets/fonts/SCE-PS3-RD-R-LATIN.otf');
  sfxBgm = loadSound('assets/sfx/bgm' + randSong + '.ogg');
  sfxPlayerShoot = loadSound('assets/sfx/player_shoot.wav');
  sfxEnemyHit = loadSound('assets/sfx/enemy_hit.wav');
  sfxEnemyDespawn = loadSound('assets/sfx/enemy_despawn.wav');
  sfxCoreDespawn = loadSound('assets/sfx/core_despawn.wav');
  sfxPause = loadSound('assets/sfx/pause.wav');
  sfxPlayerSpawn = loadSound('assets/sfx/player_spawn.wav');
  sfxPlayerDespawn = loadSound('assets/sfx/player_despawn.wav');
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  ui = new UI();
  pauseMenu = new PauseMenu();
}

function draw() {
  if (!sfxBgm.isPlaying()) {
    sfxBgm.play();
  }
  background('#b7b39d');
  rectMode(CENTER);

  if (!paused) {

    player.draw();
    player.update();

    // Load Level Enemies
    if (!levelReady) {
      for (let i = 0; i < levels[level][0]; i++) {
        enemies.push(new Enemy(random(enemyMaxSpeed) + 0.5, 'enemy'))
      }
      for (let i = 0; i < levels[level][1]; i++) {
        enemies.push(new Enemy(random(enemyMaxSpeed) + 0.5, 'bond'))
      }
      levelReady = true
    }

    for (let i = enemies.length - 1; i >= 0; i--) {
      enemies[i].draw();
      enemies[i].update();

      if (enemies[i].damagePlayer()) {
        gameOver();
        break;
      }

      if (player.hasShot(enemies[i])) {
        if (enemies[i]["health"] > 0) {
          enemies[i]["health"] = (enemies[i]["health"] - 1)
          score++;
          sfxEnemyHit.play();
          if (enemies[i]["health"] <= 0) {
            console.log('destroyed')
            score = score + 3;

            if (enemies[i]["type"] == 'enemy') {
              sfxEnemyDespawn.play();
            } else {
              sfxCoreDespawn.play();
            }
            enemies.splice(i, 1);
          }
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

    /*  if (frame >= enemiespawnTime) {
        if (enemies.length <= levels[0][0]) {
          enemies.push(new Enemy(random(enemyMaxSpeed)));
          enemiespawnTime *= 0.95;
          frame = 0;
        }
      }
  */

    if (frameCount % 1000 == 0) {
      enemyMaxSpeed += 0.1;
    }

    frame++;
    ui.draw();

    // Level Complete
    if (enemies.length <= 0) {
      console.log('level complete')
      paused = true;
      nextLevelScreen = true;
    }

  } else {
    pauseMenu.draw();
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    if (paused) {
      if (gameOverScreen) {
        nextLevelScreen = false;
        restart();
      } else if (nextLevelScreen) {
        sfxPlayerSpawn.play();
        player = new Player();
        level++;
        levelReady = false;
        paused = false;
        nextLevelScreen = false;
      } else {
        sfxPause.play();
        nextLevelScreen = false;
        paused = false;
      }
    } else {
      sfxPause.play();
      paused = true;
    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function gameOver() {
  sfxPlayerDespawn.play();
  paused = true;
  gameOverScreen = true;
}

function restart() {
  player = new Player();
  sfxPlayerSpawn.play();
  enemies = [];
  enemiespawnTime = 120;
  enemyMaxSpeed = 3;
  score = 0;
  level = 0;
  paused = false;
  gameOverScreen = false;
  nextLevelScreen = false;
}
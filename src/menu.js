class PauseMenu {
    constructor() {
    }
    draw() {
        if (gameOverScreen) {
            push();
            textFont(fontRegular);
            textSize(40);
            fill('#554e40');
            textAlign(CENTER, CENTER);
            text('Game Over', (windowWidth / 2), (windowHeight / 2) - 20);
            pop();

            push();
            textFont(fontRegular);
            textSize(18);
            fill('#554e40');
            textAlign(CENTER, CENTER);
            text('[  Final score: ' + score + '  ]', (windowWidth / 2), (windowHeight / 2) + 44);
            pop();

            push();
            textFont(fontRegular);
            textSize(18);
            fill('#554e40');
            textAlign(CENTER, CENTER);
            text('[  press ESC to try again  ]', (windowWidth / 2), (windowHeight / 2) + 100);
            pop();
        } else if (nextLevelScreen) {
            push();
            textFont(fontRegular);
            textSize(40);
            fill('#554e40');
            textAlign(CENTER, CENTER);
            text('Level ' + (level+1) + ' Complete', (windowWidth / 2), (windowHeight / 2) - 20);
            pop();

            push();
            textFont(fontRegular);
            textSize(18);
            fill('#554e40');
            textAlign(CENTER, CENTER);
            text('[  press ESC to continue  ]', (windowWidth / 2), (windowHeight / 2) + 44);
            pop();
        } else {
            push();
            textFont(fontRegular);
            textSize(40);
            fill('#554e40');
            textAlign(CENTER, CENTER);
            text('Paused', (windowWidth / 2), (windowHeight / 2) - 20);
            pop();

            push();
            textFont(fontRegular);
            textSize(18);
            fill('#554e40');
            textAlign(CENTER, CENTER);
            text('[  press ESC to continue  ]', (windowWidth / 2), (windowHeight / 2) + 44);
            pop();
        }
    }
} 
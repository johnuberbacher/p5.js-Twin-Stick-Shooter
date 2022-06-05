class PauseMenu {
    constructor() {
    }
    draw() {
        push();
        noStroke();
        fill('#d4cfb6');
        rect(windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 2);
        pop();

        push();
        textFont(fontRegular);
        textSize(40);
        fill('#554e40');
        text('Paused', (windowWidth / 3), windowHeight / 3);
        pop();

        push();
        textFont(fontRegular);
        textSize(24);
        fill('#554e40');
        textAlign(CENTER, CENTER);
        text('[ press ESC to continue ]', (windowWidth / 2), windowHeight / 2);
        pop();
    }
} 
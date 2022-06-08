class UI {
    constructor() {
    }
    draw() {
        push();
        noStroke();
        fill(0, 0, 0, 10);
        rect(160, 75, 280, 70);
        pop();
        push();
        noStroke();
        fill(218, 210, 192, 200);
        rect(160, 70, 280, 70);
        pop();

        push();
        textStyle(BOLD);
        textFont(fontRegular);
        textSize(20);
        fill('#554e40');
        text('S C O R E:  ' + score, 55, 78);
        pop();

        push();
        noStroke();
        fill(0, 0, 0, 10);
        rect(windowWidth - 70, 70, 75, 75);
        pop();
        push();
        noStroke();
        fill(218, 210, 192, 200);
        rect(windowWidth - 70, 70, 70, 70);
        pop();

        push();
        textStyle(BOLD);
        textFont(fontRegular);
        textSize(20);
        fill('#554e40');
        text(level, windowWidth - 85, 78);
        pop();

    }
} 
class UI {
    draw() {
        push();
        noStroke();
        fill(0, 0, 0, 10);
        rect(180, 75, 300, 70);
        pop();
        push();
        noStroke();
        fill(218, 210, 192, 200);
        rect(180, 70, 300, 70);
        pop();
        
        push();
        textFont(fontRegular);
        textSize(16);
        fill('#554e40');
        text(score, 55, 78);
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

    }
} 
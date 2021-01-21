var ship; //Global variabel

function setup() {
    createCanvas(windowWidth, windowHeight);
    ship = new Ship(); //Kalder at der skal laves et nyt skib
}

function draw() {
    background(0);
    ship.render(); //Kalder skibet/viser skibet
}

function keyPressed() { //Hver gang knap trykkes, kører funktionen
    if (keyCode == RIGHT_ARROW) { //Vælger at knappen er højre piletast
        ship.turn(0.1); //Værdi skibet drejer med
    } else if (keyCode == LEFT_ARROW) { //Hvis venstre piletast bliver trykket 
        ship.turn(-0.1); //Værdi skibet drejer med
    }
}

function Ship() {
    this.pos = createVector(width / 2, height / 2); //Start position for skib
    this.r = 20; //Værdi
    this.heading = 0; //Den vej skibet vender

    this.render = function() { //Renderer skibet
        translate(this.pos.x, this.pos.y); //Oversætter positionen til x- og y-koordinater
        rotate(this.heading); //Får den til at roterer
        noFill(); //Ingen fyldfarve til skibet
        stroke(255); //Hvid kant rundt om skibet
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r); //Trekant med this.r værdi som koordinater
    }

    this.turn = function(angle) { //Får skibet til at dreje
        this.heading += angle; //Den vej skibet vender + en vinkel for at dreje skibet
    }
}
//7.50
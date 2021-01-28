var ship; //Global variabel
var asteroids = []; //Globalt variabel (Array til asteroids)

function setup() {
    createCanvas(windowWidth - 25, windowHeight - 25);
    ship = new Ship(); //Kalder at der skal laves et nyt skib
    for (var i = 0; i < 5; i++) { //Antal asteroider
        asteroids.push(new Asteroid()); //Tilføjer ny astroide
    }
}

function draw() {
    background(0);
    ship.render(); //Kalder skibet/viser skibet
    ship.turn(); //Sørger for at skibet altid drejer selvom det er 0
    ship.update(); //Opdatere skibet
    ship.edges(); //Gør at når skibet flyver ud over en side, så flyver den ind igen på modsatte side

    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].render(); //Laver asteroiderne
        asteroids[i].update(); //Opdatere asteroiderne
        asteroids[i].edges(); //Gør at når asteroiderne flyver ud over en side, så flyver dee ind igen på modsatte side
    }

}

function keyPressed() { //Hver gang knap trykkes, kører funktionen
    if (keyCode == RIGHT_ARROW) { //Vælger at knappen er højre piletast
        ship.setRotation(0.1); //Værdi skibet drejer med
    } else if (keyCode == LEFT_ARROW) { //Hvis venstre piletast bliver trykket 
        ship.setRotation(-0.1); //Værdi skibet drejer med
    } else if (keyCode == UP_ARROW) { //Hvis op piletast bliver trykket
        ship.boosting(true); //Værdi for skibets hastighed
    }
}

function keyReleased() {
    ship.setRotation(0); //Når man slipper knappen stopper rotationen
    ship.boosting(false); //Skibbet flyver ikke
}
// video 2,
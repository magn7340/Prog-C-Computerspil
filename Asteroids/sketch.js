var ship; //Global variabel
var asteroids = []; //Globalt variabel (Array til asteroids)
var lasers = []; // Globalt variabel (Array til laser)

function setup() {
    createCanvas(windowWidth - 25, windowHeight - 25);
    ship = new Ship(); //Kalder at der skal laves et nyt skib
    for (var i = 0; i < 5; i++) { //Antal asteroider
        asteroids.push(new Asteroid()); //Tilføjer ny astroide
    }
}

function draw() {
    background(0);

    for (var i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {
            console.log('oops');
        }
        asteroids[i].render(); //Laver asteroiderne
        asteroids[i].update(); //Opdatere asteroiderne
        asteroids[i].edges(); //Gør at når asteroiderne flyver ud over en side, så flyver dee ind igen på modsatte side
    }

    for (var i = lasers.length - 1; i >= 0; i--) {
        lasers[i].render(); //Laver laser
        lasers[i].update(); //Opdatere laser
        if (lasers[i].offscreen()) {
            lasers.splice(i, 1);
        } else {
            for (var j = asteroids.length - 1; j >= 0; j--) { //Tjekker om laser rammer asteroide
                if (lasers[i].hits(asteroids[j])) { //Hvis laserne rammer asteroiderne
                    if (asteroids[j].r > 10) { //hvis under 10 asteroider
                        var newAsteroids = asteroids[j].breakup(); //danner nye asteroider
                        asteroids = asteroids.concat(newAsteroids); //samler arrays
                    }
                    asteroids.splice(j, 1); //
                    lasers.splice(i, 1);
                    break;
                }
            }
        }

        console.log(lasers.length);

        ship.render(); //Kalder skibet/viser skibet
        ship.turn(); //Sørger for at skibet altid drejer selvom det er 0
        ship.update(); //Opdatere skibet
        ship.edges(); //Gør at når skibet flyver ud over en side, så flyver den ind igen på modsatte side

    }

    function keyPressed() { //Hver gang knap trykkes, kører funktionen
        if (key == ' ') { //Hvis mellemrumsknappen bliver trykket
            lasers.push(new Laser(ship.pos, ship.heading)); //Putter ny laser i arayet, og laver laserne i skibets position og retning
        } else if (keyCode == RIGHT_ARROW) { //Vælger at knappen er højre piletast
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
}
// video 2, christian 15:48
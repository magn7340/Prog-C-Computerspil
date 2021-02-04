function Laser(spos, angle) {
    this.pos = createVector(spos.x, spos.y); //Laser position samme som skibet
    this.vel = p5.Vector.fromAngle(angle); //Hastighed på laseren
    this.vel.mult(10); //Gør laserne 10x hurtigere

    this.update = function() { //Funktionen der opdatere laseren
        this.pos.add(this.vel); //Lægger hastigheden til positionen og får skibet frem
    }
    this.render = function() { //Render laserne
        push(); //Gør at "strokeWeight" ikke gør noget ved andet end laser
        stroke(255); //Kanten om laserne
        strokeWeight(4); //Gør laserne tykkere
        point(this.pos.x, this.pos.y); //Laser position
        pop(); //Gør at "strokeWeight" ikke gør noget ved andet end laser
    }

    this.hits = function(asteroid) { // Forventer asteroide objekt
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y); //laver variable d som er afstanden mellem astroide og
        if (d < asteroid.r) { //Hvis d er mindre en radius af astroide
            return true; //sandt
        } else { //eller
            return false; //falsk 
        }
    }

    this.offscreen = function() {
        if (this.pos.x > width || this.pos.x < 0) {
            return true;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            return true;
        }
        return false;
    }

}
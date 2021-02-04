function Ship() {
    this.pos = createVector(width / 2, height / 2); //Start position for skib
    this.r = 20; //Værdi
    this.heading = 0; //Den vej skibet vender
    this.rotation = 0; //Start rotation
    this.vel = createVector(0, 0); //Skibets hastighed 
    this.isBoosting = false; //Skibbet er ikke igang med at flyve

    this.boosting = function(b) {
        this.isBoosting = b; //Giver isBoosting et argument
    }

    this.update = function() { //Opdaterer hvad skibet gør
        if (this.isBoosting) {
            this.boost(); //Hvis den flyver, skal den flyve med this.boost kraft
        }
        this.pos.add(this.vel); //Plusser hastigheden oveni nuværende position
        this.vel.mult(0.99) //Gør så skibbet bremser igen
    }

    this.boost = function() { //Den kraft skibbet flyver med
        var force = p5.Vector.fromAngle(this.heading); //Gør så den flyver i den retning den peger
        force.mult(0.1); //Gør at skibbet ikke flyver for hurtigt
        this.vel.add(force) //Plusser retningen oveni hastigheden
    }

    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < this.r + asteroids.r) {
            return true;
        } else {
            return false;
        }
    }

    this.render = function() { //Renderer skibet
        push(); //Gør at skibets position ikke ændrer på andet (translate)
        translate(this.pos.x, this.pos.y); //Oversætter positionen til x- og y-koordinater
        rotate(this.heading + PI / 2); //Får den til at roterer
        fill(0); //Sort fyldfarve til skibet, så laserne ikke ses
        stroke(255); //Hvid kant rundt om skibet
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r); //Trekant med this.r værdi som koordinater
        pop(); //Gør at skibets position ikke ændrer på andet (translate)
    }

    this.edges = function() { //Gør så når skibbet går ud over kanterne, så kommer den ind igen på den anden side
        if (this.pos.x > width + this.r) { //Dette er for højre side
            this.pos.x = -this.r; //Dette er for højre side
        } else if (this.pos.x < -this.r) { //Dette er for venstre side
            this.pos.x = width + this.r; //Dette er for venstre side
        }
        if (this.pos.y > height + this.r) { //Dette er for bunden
            this.pos.y = -this.r; //Dette er for bunden
        } else if (this.pos.y < -this.r) { //Dette er for toppen
            this.pos.y = height + this.r; //Dette er for toppen
        }
    }

    this.setRotation = function(a) {
        this.rotation = a; //Når man holder knappen nede roterer den
    }

    this.turn = function() { //Får skibet til at dreje
        this.heading += this.rotation; //Den vej skibet vender + en vinkel for at dreje skibet
    }
}
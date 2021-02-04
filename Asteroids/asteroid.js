function Asteroid(pos, r) { //En constructor function som sørger for at lave asteroids
    if (pos) { //Hvis contructor får en værdi
        this.pos = pos.copy(); //Brug denne værdi
    } else { //Hvis ikke
        this.pos = createVector(random(width), random(height)); //Tilfældig position for asteroids
    }
    if (r) {
        this.r = r * 0.5; //Radius for asteroids
    } else {
        this.r = random(15, 30);
    }


    this.vel = p5.Vector.random2D(); //Giver asteroiderne en tilfældig hastighed
    this.total = floor(random(5, 15)); //Antallet af "prikker" der skal danne en asteroid
    this.offset = []; //Lavet et array for hvor meget this.r i asteroids må variere
    for (var i = 0; i < this.total; i++) {
        this.offset[i] = random(-this.r * 0.5, this.r * 0.5) //Gør at "prikkerne" i asteroids kan gå enten ind eller ud så vi får en deform figur
    }

    this.update = function() { //Opdaterer asteroids position, altså gør at de flyver 
        this.pos.add(this.vel) //Plusser fart oveni asteroids nuværende position, så de flyver
    }

    this.render = function() { //Renderer asteroids
        push(); //Gør så asteroid positionen ikke ændre andet (translate)
        stroke(255); //Omrids farven på asteroids
        noFill(); //Fjerne fyldfarven i asteroids
        translate(this.pos.x, this.pos.y); //Oversætter postionen til x- og y-koordinater
        // ellipse(0, 0, this.r * 2); //Laver asteroids til en cirkel
        beginShape(); //Begynder at lave asteroids
        for (var i = 0; i < this.total; i++) {
            var angle = map(i, 0, this.total, 0, TWO_PI);
            var r = (this.r + this.offset[i])
            var x = r * cos(angle);
            var y = r * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE); //Slutter asteroids og "lukker" figuren
        pop(); //Gør så asteroid positionen ikke ændre andet (translate)
    }

    this.breakup = function() {
        var newA = []; //Laver array for nye asteorider
        newA[0] = new Asteroid(this.pos, this.r); //Laver ny asteoride
        newA[1] = new Asteroid(this.pos, this.r); //Laver anden ny asteoride
        return newA;
    }

    this.edges = function() { //Gør så når asteroiderne går ud over kanterne, så kommer de ind igen på den anden side
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
}
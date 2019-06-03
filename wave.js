class Wave {

    constructor(x, y, id, ttl, targetId) {
        this.center = createVector(x, y);
        this.i = 0;
        this.moveF = true;
        this.maxRadius = 300;
        this.toDelete = false;
        this.intersection = false;

        this.id = id;

        this.ttl = ttl;

        if (typeof targetId === 'undefined') {
            targetId = Math.floor(Math.random()*Node.count);
        }

        this.targetId = targetId;

        this.distance = 100;
    }

    getRelayedCopy() {
        return new Wave(this.pos.x, this.pos.y, this.id, this.ttl-1)
    }

    static createWave(x, y, id) {

        if (typeof id === 'undefined') {
            id = Math.floor(Math.random() * 1000000);
        }
        return new Wave(x, y, id, 40)
    }

    show(walls) {

        noFill();
        strokeWeight(1.5);
        if (!this.intersection) {
            walls.forEach(wall => {
                let nominator = Math.abs((wall.p2.y - wall.p1.y) * this.center.x - (wall.p2.x - wall.p1.x) * this.center.y + wall.p2.x * wall.p1.y - wall.p2.y * wall.p1.x);
                let denominator = Math.sqrt(Math.pow((wall.p2.y - wall.p1.y), 2) + Math.pow((wall.p2.x - wall.p1.x), 2));

                this.distance = nominator / denominator;

                if (this.i >= 2 * this.distance) {
                    this.maxRadius = this.i;
                    this.intersection = true;
                }

            });
        }

        if (this.intersection) {
            stroke(238, 244, 66);
        } else stroke(255);


        ellipse(this.center.x, this.center.y, this.i, this.i);

        if (this.moveF) {
            this.i += 1;
            if (this.i >= this.maxRadius) {
                this.i = 0;
                this.moveF = false;
            }
        }

        if (!this.moveF && !this.moveS && !this.moveT) {
            this.toDelete = true;
        }
    }
}
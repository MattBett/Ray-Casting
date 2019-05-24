class Particle {
  constructor(x, y, nb, fov) {
    this.pos = createVector(x, y);
    this.rays = [];
    this.lookAt = 0;
    this.nb = nb;
    this.fov = fov;

    if (this.nb) {
      for (let i = this.lookAt; i < this.fov; i += this.fov / this.nb) {
        this.rays.push(new Ray(this.pos.x, this.pos.y, i));
      }

      for (let ray of this.rays) {
        ray.spinBy(-fov / 2);
      }
    }
  }

  spinBy(angle) {
    this.lookAt += angle;

    if (this.lookAt >= 360) {
      this.lookAt -= 360;
    } else if (this.lookAt < 0) {
      this.lookAt += 360;
    }

    for (let ray of this.rays) {
      ray.spinBy(angle);
    }
  }

  move(x, y) {
    this.pos.x = x;
    this.pos.y = y;

    for (let ray of this.rays) {
      ray.move(this.pos.x, this.pos.y);
    }
  }

  show(boundaries) {
    let closest;
    let closestDist;
    let dist;

    stroke(0);
    strokeWeight(5);
    point(this.pos.x, this.pos.y);

    for (let ray of this.rays) {
      closest = null;
      closestDist = Infinity;
      dist = Infinity;

      for (let boundary of boundaries) {
        let pt = ray.cast(boundary);

        if (pt) {
          //dist = sqrt(sq(pt.x - ray.pos.x) + sq(pt.y - ray.pos.y));
          dist = this.dist(pt, ray.pos);

          if (dist < closestDist) {
            closestDist = dist;
            closest = pt;
          }
        }
      }

      ray.show(closest);
    }
  }

  dist(a, b) {
    // ? Return the distance between point a and point b
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }
}

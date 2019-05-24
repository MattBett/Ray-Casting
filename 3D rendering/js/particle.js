class Particle {
  constructor(x, y, columns, fov) {
    this.pos = createVector(x, y);
    this.rays = [];
    this.lookAt = 0;
    this.columns = columns;
    this.fov = fov;
    this.angleIncrement = this.fov / this.columns;

    if (this.columns) {
      for (let i = this.lookAt; i < this.fov; i += this.angleIncrement) {
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
  }

  show(boundaries) {
    let closest;
    let closestDist;
    let dist;

    let i = 0;

    stroke(0);
    strokeWeight(5);
    point(this.pos.x, this.pos.y);

    for (let ray of this.rays) {
      ray.move(this.pos.x, this.pos.y);
      closest = null;
      closestDist = Infinity;
      dist = Infinity;

      for (let boundary of boundaries) {
        let pt = ray.cast(boundary);

        if (pt) {
          //dist = Math.sqrt(Math.sq(pt.x - ray.pos.x) + Math.sq(pt.y - ray.pos.y));
          dist = this.dist(pt, ray.pos);

          if (dist < closestDist) {
            closestDist = dist;
            closest = pt;
          }
        }
      }

      ray.show(closest, this.fov, i, this.rays.length);

      i++;
    }
  }

  dist(a, b) {
    // ? Return the distance between point a and point b
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }
}

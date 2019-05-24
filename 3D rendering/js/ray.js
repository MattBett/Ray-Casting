class Ray {
  length = Infinity;
  constructor(x, y, angle) {
    this.pos = createVector(x, y);
    this.lookAt = angle;
    this.dir = p5.Vector.fromAngle(radians(this.lookAt));
  }

  lookAt(x, y) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  spinBy(angle) {
    this.lookAt += angle;

    if (this.lookAt >= 360) {
      this.lookAt -= 360;
    } else if (this.lookAt < 0) {
      this.lookAt += 360;
    }

    this.dir = p5.Vector.fromAngle(radians(this.lookAt));
  }

  move(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }

  cast(wall) {
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = x3 + this.dir.x;
    const y4 = y3 + this.dir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (den == 0) {
      return;
    } else {
      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
      const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

      if (u > 0 && t > 0 && t < 1) {
        const pt = createVector();
        pt.x = x1 + t * (x2 - x1);
        pt.y = y1 + t * (y2 - y1);

        this.length = this.dist(this.pos, pt);

        return pt;
      } else {
        return;
      }
    }
  }

  show(pointTo, alpha, i, width) {
    const WALL_HEIGHT = 264;
    const DISTANCE_TO_PROJECTION_PLANE = 200;

    //const beta = alpha * (i / width - 0.5);
    const beta = map(i, 0, width, -alpha / 2, alpha / 2);
    const correctDistance = this.length * Math.cos(radians(beta));

    const projectedSliceHeight =
      (WALL_HEIGHT * DISTANCE_TO_PROJECTION_PLANE) / correctDistance;

    const color = map(correctDistance, 0, 400, 255, 150);
    stroke(color);
    strokeWeight(1);

    if (pointTo) {
      line(
        i,
        (height - projectedSliceHeight) / 2,
        i,
        (height + projectedSliceHeight) / 2
      );
    }
    /*
    else {
      line(
        this.pos.x,
        this.pos.y,
        this.pos.x + this.dir.x * width,
        this.pos.y + this.dir.y * width
      );
    }
    */
  }

  dist(a, b) {
    // ? Return the distance between point a and point b
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }
}

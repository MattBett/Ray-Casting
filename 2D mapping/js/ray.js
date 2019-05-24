class Ray {
  constructor(x, y, angle) {
    this.pos = createVector(x, y);
    this.lookAt = angle;
    this.dir = p5.Vector.fromAngle(radians(this.lookAt));
  }
  /*
    lookAt(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }
*/

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

        return pt;
      } else {
        return;
      }
    }
  }

  show(pointTo) {
    stroke(255, 255, 200);
    strokeWeight(1);

    if (pointTo) {
      line(this.pos.x, this.pos.y, pointTo.x, pointTo.y);
    } else {
      line(
        this.pos.x,
        this.pos.y,
        this.pos.x + this.dir.x * width,
        this.pos.y + this.dir.y * width
      );
    }
  }
}

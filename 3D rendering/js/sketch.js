const FOV = 60;
const MOVE_STEP = 2;
const SPIN_STEP = 2;

let walls = [];
let viewer;

function setup() {
  createCanvas(900, 900);
  noCursor();

  /*
  for (let i = 0; i < 4; i++) {
    let x1 = random() * width;
    let y1 = random() * height;
    let x2 = random() * width;
    let y2 = random() * height;
    walls.push(new Boundary(x1, y1, x2, y2));
  }
*/

  //? Create the walls around the canva
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(0, height, width, height));
  walls.push(new Boundary(0, 0, 0, height));
  walls.push(new Boundary(width, 0, width, height));

  walls.push(new Boundary(width / 2, height / 4, (3 * width) / 4, height / 4));
  walls.push(
    new Boundary((3 * width) / 4, height / 4, (3 * width) / 4, (3 * height) / 4)
  );
  walls.push(
    new Boundary(width / 2, (3 * height) / 4, (3 * width) / 4, (3 * height) / 4)
  );

  walls.push(
    new Boundary(width / 2, (3 * height) / 8, (5 * width) / 8, (3 * height) / 8)
  );
  walls.push(
    new Boundary(
      (5 * width) / 8,
      (3 * height) / 8,
      (5 * width) / 8,
      (5 * height) / 8
    )
  );
  walls.push(
    new Boundary(width / 2, (5 * height) / 8, (5 * width) / 8, (5 * height) / 8)
  );

  walls.push(
    new Boundary(width / 8, (3 * height) / 8, (3 * width) / 8, (3 * height) / 8)
  );
  walls.push(
    new Boundary(width / 8, (3 * height) / 8, width / 8, (5 * height) / 8)
  );
  walls.push(
    new Boundary(width / 8, (5 * height) / 8, (3 * width) / 8, (5 * height) / 8)
  );

  viewer = new Particle(width / 4, height / 2, width, FOV);
}

function draw() {
  background(0);

  if (keyIsDown(68)) {
    // ! Is D pressed? Yes -> then turn counter-clockwise
    viewer.spinBy(SPIN_STEP);
  } else if (keyIsDown(81)) {
    // ! Is Q pressed ? Yes - > then turn clockwise
    viewer.spinBy(-SPIN_STEP);
  } else if (keyIsDown(90)) {
    // ! Is Z pressed? Yes -> then move forward
    viewer.pos = opeVector(
      viewer.pos,
      p5.Vector.fromAngle(radians(viewer.lookAt), MOVE_STEP),
      true
    );
  } else if (keyIsDown(83)) {
    // ! Is S pressed? Yes -> then move backward
    viewer.pos = opeVector(
      viewer.pos,
      p5.Vector.fromAngle(radians(viewer.lookAt), MOVE_STEP),
      false
    );
  }

  //viewer.move(mouseX, mouseY);
  viewer.show(walls);

  /*
  for (let wall of walls) {
    wall.show();
  }
  */
}

function opeVector(a, b, add) {
  /*
    ? Compute operations on vectors
    ? Return the return in a new vector
    ? a = 1st vector; b = 2nd vector;
    ? if add == true, then add both vectors, otherwise substract
  */

  if (add) {
    a.x += b.x;
    a.y += b.y;

    if (a.z) {
      a.z += b.z;
    }
  } else {
    a.x -= b.x;
    a.y -= b.y;

    if (a.z) {
      a.z -= b.z;
    }
  }

  return a;
}

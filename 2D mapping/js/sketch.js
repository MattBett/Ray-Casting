const FOV = 60;
const SPIN_STEP = 5;

let walls = [];
let viewer;

function setup() {
  createCanvas(1200, 800);
  /*
  for (let i = 0; i < 4; i++) {
    let x1 = random() * width;
    let y1 = random() * height;
    let x2 = random() * width;
    let y2 = random() * height;
    walls.push(new Boundary(x1, y1, x2, y2));
  }
  

    ? Create the walls around the canva

    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(0, height, width, height));
    walls.push(new Boundary(0, 0, 0, height));
    walls.push(new Boundary(width, 0, width, height));
  */

  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(0, height, width, height));

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
  viewer = new Particle(100, 200, 36 * 72, FOV);
}

function draw() {
  background(0);

  if (keyIsDown(68)) {
    //if D is pressed
    viewer.spinBy(SPIN_STEP);
  } else if (keyIsDown(81)) {
    //if Q is pressed
    viewer.spinBy(-SPIN_STEP);
  }

  viewer.move(mouseX, mouseY);
  viewer.show(walls);

  for (let wall of walls) {
    wall.show();
  }
}

let cam;
let size = 5; 
let asciiChar = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^`'. ";

function setup() {
  createCanvas(400, 400);
  cam = createCapture(VIDEO);
  cam.size(400, 400); // Match canvas size
  cam.hide();
  textFont('monospace');

  let stripeWidth = 10;
  let stripesPerSide = 5;
  let d = 5;
  let verticalStep = d * 2.4;
  let triangleWidth = d * sqrt(3);
  let numColumns = 1;
}

function draw() {
  background(255);

  let stripeWidth = 10;
  let stripesPerSide = 5;
  let d = 5;
  let verticalStep = d * 2.4;
  let triangleWidth = d * sqrt(3);
  let numColumns = 1;

  // LEFT OUTER STRIPES
  for (let i = 0; i < stripesPerSide; i++) {
    let x = i * stripeWidth;
    fill(i % 2 === 0 ? color(128, 0, 32) : 0);
    noStroke();
    rect(x, 0, stripeWidth, height);
  }

  // RIGHT OUTER STRIPES
  for (let i = 0; i < stripesPerSide; i++) {
    let x = width - (stripesPerSide - i) * stripeWidth;
    fill(i % 2 === 0 ? color(128, 0, 32) : 0);
    noStroke();
    rect(x, 0, stripeWidth, height);
  }

  // INNER RED STRIPES
  noStroke();
  fill(128, 0, 32);
  rect(60, 0, 5, height);
  rect(335, 0, 5, height);

  // LEFT TRIANGLES
  for (let i = 0; i < numColumns; i++) {
    let x = 50 + i * (triangleWidth + 10);
    let rows = ceil(height / verticalStep);

    for (let row = 0; row < rows; row++) {
      let triangleX = x + triangleWidth / 2;
      let triangleY = row * verticalStep;
      let useRed = row % 2 === 0;
      let reverseTriangle = !useRed;

      push();
      translate(triangleX, triangleY);
      rotate(PI / 2);
      drawFilledTriangleLeft(0, 0, d, reverseTriangle, useRed);
      pop();
    }
  }

  // RIGHT TRIANGLES
  for (let i = 0; i < numColumns; i++) {
    let x = 350 + i * (triangleWidth + 10);
    let rows = ceil(height / verticalStep);

    for (let row = 0; row < rows; row++) {
      let triangleX = x - triangleWidth / 2;
      let triangleY = row * verticalStep;
      let useRed = row % 2 === 0;
      let reverseTriangle = !useRed;

      push();
      translate(triangleX, triangleY);
      rotate(-PI / 2);
      drawFilledTriangleRight(0, 0, d, reverseTriangle, useRed);
      pop();
    }
  }

  drawAsciiArt();
}

function drawAsciiArt() {
  let innerWidth = 335 - 60 - 10;
  let asciiCols = floor(innerWidth / size);
  cam.loadPixels();

  let resized = createImage(asciiCols, cam.height);
  resized.copy(cam, 0, 0, cam.width, cam.height, 0, 0, resized.width, resized.height);
  resized.loadPixels();

  let offsetX = 65;
  let offsetY = (height - resized.height * size) / 2;

  for (let i = 0; i < resized.width; i++) {
    for (let j = 0; j < resized.height; j++) {
      let pixelIndex = (i + j * resized.width) * 4;
      let r = resized.pixels[pixelIndex];
      let g = resized.pixels[pixelIndex + 1];
      let b = resized.pixels[pixelIndex + 2];

      let bright = (r + g + b) / 3;
      let tIndex = floor(map(bright, 0, 255, 0, asciiChar.length));
      let t = asciiChar.charAt(tIndex);

      let x = i * size + size / 2 + offsetX;
      let y = j * size + size / 2 + offsetY;

      fill(0);
      noStroke();
      textSize(size);
      textAlign(CENTER, CENTER);
      text(t, x, y);
    }
  }
}

function drawFilledTriangleLeft(cx, cy, d, reverse = false, useRed = true) {
  let rowIndices = reverse ? [2, 1, 0] : [0, 1, 2];
  stroke(0);
  strokeWeight(1);
  for (let ri = 0; ri < rowIndices.length; ri++) {
    let row = rowIndices[ri];
    let rowEllipses = row + 1;
    let yOffset = (ri - 1) * d * 0.8;
    let xStart = cx - (rowEllipses - 1) * d / 2;
    for (let col = 0; col < rowEllipses; col++) {
      let x = xStart + col * d;
      let y = cy + yOffset;
      fill(useRed ? color(128, 0, 32) : 255);
      ellipse(x, y, d, d);
    }
  }
}

function drawFilledTriangleRight(cx, cy, d, reverse = false, useRed = true) {
  let rowIndices = reverse ? [2, 1, 0] : [0, 1, 2];
  stroke(0);
  strokeWeight(1);
  for (let ri = 0; ri < rowIndices.length; ri++) {
    let row = rowIndices[ri];
    let rowEllipses = row + 1;
    let yOffset = (ri - 1) * d * 0.8;
    let xStart = cx - (rowEllipses - 1) * d / 2;
    for (let col = 0; col < rowEllipses; col++) {
      let x = xStart + col * d;
      let y = cy + yOffset;
      fill(useRed ? color(128, 0, 32) : 255);
      ellipse(x, y, d, d);
    }
  }
}

let cam;
let sizes = [];
let size = 10;
let cols, rows;

function setup() {
  createCanvas(400, 400);
  cam = createCapture(VIDEO);
  cam.size(275, 400); // match raster area size (275x400)
  cam.hide();

  noStroke();
  rectMode(CENTER);

  cols = 275 / size;
  rows = height / size;

  for (let i = 0; i < cols; i++) {
    sizes[i] = [];
    for (let j = 0; j < rows; j++) {
      sizes[i][j] = 0;
    }
  }
}

function draw() {
  background(255);

  let stripeWidth = 10;
  let stripesPerSide = 5;
  let d = 5;
  let verticalStep = d * 2.4;
  let triangleWidth = d * sqrt(3);
  let numColumns = 1;

  // LEFT OUTER STRIPES (extended to full height)
  for (let i = 0; i < stripesPerSide; i++) {
    let x = i * stripeWidth;
    fill(i % 2 === 0 ? color(128, 0, 32) : 0);
    rect(x + stripeWidth / 2, height / 2, stripeWidth, height);
  }

  // RIGHT OUTER STRIPES (extended to full height)
  for (let i = 0; i < stripesPerSide; i++) {
    let x = width - (stripesPerSide - i) * stripeWidth;
    fill(i % 2 === 0 ? color(128, 0, 32) : 0);
    rect(x + stripeWidth / 2, height / 2, stripeWidth, height);
  }

  // INNER RED STRIPES (also full height)
  fill(128, 0, 32);
  rect(60 + 2.5, height / 2, 5, height);   // Left inner red stripe
  rect(335 + 2.5, height / 2, 5, height);  // Right inner red stripe

  // RASTERIZED BLACK & WHITE WEBCAM FEED
  
  cam.loadPixels();
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * size;
      let y = j * size;
      let c = cam.get(x, y);
      let b = brightness(c); // brightness = grayscale value
      let s = map(b, 0, 100, size * 2, 0);
      fill(b); // use grayscale
      rect(62.5 + x, size / 2 + y, s, s);
    }
  }

//   // TOP BLACK TRIANGLES
//   for (let i = 0; i < 6; i++) {
//     let triX = 200;
//     let triY = 10 + i * 10;
//     drawTriangles(triX, triY, 6);
//   }

//   // BOTTOM BLACK TRIANGLES
//   for (let i = 0; i < 6; i++) {
//     let triX = 200;
//     let triY = 390 - i * 10;
//     drawTriangles(triX, triY, 6);
//   }

  // LEFT TRIANGLES
  for (let i = 0; i < numColumns; i++) {
    let x = 50 + i * (triangleWidth + 10);
    let triangleRows = ceil(height / verticalStep);
    for (let row = 0; row < triangleRows; row++) {
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
    let triangleRows = ceil(height / verticalStep);
    for (let row = 0; row < triangleRows; row++) {
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
}

// DRAW LEFT-FACING TRIANGLE
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

// DRAW RIGHT-FACING TRIANGLE
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

// DRAW ROW OF BLACK TRIANGLES
// function drawTriangles(x, y, count) {
//   let spacing = 10;
//   fill(0);
//   for (let i = 0; i < count; i++) {
//     let triX = x - (count / 2 - i) * spacing;
//     triangle(triX - 5, y + 10, triX + 5, y + 10, triX, y - 10);
//   }
// } 

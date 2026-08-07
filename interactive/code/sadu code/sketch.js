function setup() {
    createCanvas(400, 400);
    noLoop();
    background(255);
  
    let stripeWidth = 10;
    let stripesPerSide = 5;
    let d = 5; // Ellipse diameter
    let verticalStep = d * 2.4; // Vertical step between triangle centers for flush fit
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
    rect(60, 0, 5, height);   // Left inner red stripe
    rect(335, 0, 5, height);  // Right inner red stripe
  
    // LEFT TRIANGLES
    for (let i = 0; i < numColumns; i++) {
      let x = 50 + i * (triangleWidth + 10);
      let rows = ceil(height / verticalStep);
  
      for (let row = 0; row < rows; row++) {
        let triangleX = x + triangleWidth / 2;
        let triangleY = row * verticalStep;
        let useRed = row % 2 === 0;
        let reverseTriangle = !useRed; // White = reverse; Red = normal
  
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
  
    // Draw additional grid of triangles
    for (let i = 0; i < 6; i++) {
      let triX = 200; // Center position for grid
      let triY = 50 + i * 80; // Vertical spacing for rows of triangles
      drawTriangles(triX, triY, 6); // Draw a row of 6 triangles
    }
  }
  
  // LEFT-POINTING TRIANGLE (made of ellipses)
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
  
  // RIGHT-POINTING TRIANGLE (made of ellipses)
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
  
  // Function to draw a row of triangles
  function drawTriangles(x, y, count) {
    let spacing = 10;
    fill(0);
    for (let i = 0; i < count; i++) {
      let triX = x - (count / 2 - i) * spacing; // Adjust spacing to center the triangles
      triangle(triX - 5, y + 10, triX + 5, y + 10, triX, y - 10);
    }
  }
  
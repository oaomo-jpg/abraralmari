var canvas;
let images = [];
let numImages = 34;
let imgSize = 400;
// let loadedImages = 0;

function preload() {
    for (let i = 0; i < numImages; i++) {
        images.push({
          img: loadImage(`images/${i}.png`), // Load images
          pos: null, // Will be set in setup()
          vel: createVector(random(-5, 5), random(-5, 5)),
        });
      }
  }


function setup(){
    canvas = createCanvas (windowWidth, windowHeight);
    canvas.position (0,0);
    canvas.style ('z-index','-1');
    for (let i = 0; i < images.length; i++) {
        images[i].pos = createVector(
          random(imgSize, width - imgSize), 
          random(imgSize, height - imgSize)
        );
      }
}
function draw (){
    background(0);

    for (let i = 0; i < images.length; i++) {
      let p = images[i];
  
      // Mouse repulsion
      let mouse = createVector(mouseX, mouseY);
      let dir = p5.Vector.sub(p.pos, mouse);
      let distToMouse = dir.mag();
  
      if (distToMouse < 100) {
        dir.setMag(30 + random(2)); 
        p.vel = dir;
      }
  
      
      p.pos.add(p.vel);
      p.vel.mult(0.95); 
  
     
      if (p.pos.x <= 0 || p.pos.x + imgSize >= width) {
        p.vel.x *= -1.05; 
        p.pos.x = constrain(p.pos.x, 0, width - imgSize);
      }
      if (p.pos.y <= 0 || p.pos.y + imgSize >= height) {
        p.vel.y *= -1.05;
        p.pos.y = constrain(p.pos.y, 0, height - imgSize);
      }
  
      
      if (p.vel.mag() < 1) {
        p.vel.setMag(random(1, 3));
      }
  
     
      image(p.img, p.pos.x, p.pos.y, imgSize, imgSize);
    }
}
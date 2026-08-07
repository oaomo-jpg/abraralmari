let fragments = [];
let customFont;

function preload() {
    customFont = loadFont('fonts/HomemadeApple-Regular.ttf'); 
  }

function setup() {
    canvas = createCanvas (windowWidth, windowHeight);
    canvas.position (0,0);
    canvas.style ('z-index','-1');
  textSize(24);
  textAlign(CENTER, CENTER);
  textFont(customFont); 
  for (let i = 0; i < 10; i++) {
    fragments.push(new MemoryFragment(random(width), random(height)));
  }
}

function draw() {
  background(0); 

  for (let frag of fragments) {
    frag.show();
    frag.update();
  }
}


class MemoryFragment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alpha = random(150, 255);
    this.text = random([
      "“He's more myself than I am. Whatever our souls are made of, his and mine are the same.” ",
      "“If all else perished, and he remained, I should still continue to be; and if all else remained, and he were annihilated, the universe would turn to a mighty stranger.” ",
      "“You said I killed you-haunt me, then! Be with me always-take any form-drive me mad! only do not leave me in this abyss, where I cannot find you!",
      "I lingered round them, under that benign sky; watched the moths fluttering among the heath and hare-bells; listened to the soft wind breathing through the grass; and wondered how anyone could ever imagine unquiet slumbers for the sleepers in that quiet earth.",
      "I hate him for himself, but despise him for the memories he revives",
      "The entire world is a collection of memoranda that she did exist, and that I have lost her."
    ]);
    this.size = random(16, 32);
    this.fadingSpeed = random(0.5, 2);
    this.glitchOffset = 0;
  }

  update() {
    
    this.alpha -= this.fadingSpeed;
    
    
    if (random(1) < 0.02) {
      this.glitchOffset = random(-5, 5);
    } else {
      this.glitchOffset = 0;
    }
    
    
    if (this.alpha <= 0) {
      this.x = random(width);
      this.y = random(height);
      this.alpha = random(150, 255);
    }
  }

  show() {
    fill(200, 200, 255, this.alpha);
    textSize(this.size);
    textFont(customFont);
    text(this.text, this.x + this.glitchOffset, this.y);
  }
}

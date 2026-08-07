let speechRec;
let speechSynth;
let question = "";
let fortune = "";
let showFortune = false;

// let osc1, osc2, osc3; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Click anywhere to ask your question...", width / 2, height / 2);

  
  speechRec = new p5.SpeechRec('en-US');
  speechRec.onResult = gotSpeech;
  speechRec.continuous = false;
  speechRec.interimResults = false;


  speechSynth = new p5.Speech();
  speechSynth.setRate(1.1);  
  speechSynth.setPitch(0); 
  speechSynth.setVolume(1);  

//   // Set up oscillators for musical tones
//   osc1 = new p5.Oscillator('sine');
//   osc2 = new p5.Oscillator('sine');
//   osc3 = new p5.Oscillator('triangle');

//   osc1.amp(0);  // Initially silent
//   osc2.amp(0);
//   osc3.amp(0);
}

function mousePressed() {
  background(0);
  text("Listening...", width / 2, height / 2);
  speechRec.start(); 
}

function gotSpeech() {
  if (speechRec.resultValue) {
    question = speechRec.resultString;
    console.log("Recognized:", question);
    fortune = generateFortune(question);
    showFortune = true;

   
    // playMysticalTones();
    speechSynth.speak(fortune);
  } else {
    question = "";
    fortune = "Hmm... I didn't catch that.";
    showFortune = true;

    // Play fallback tones
    playMysticalTones();
    speechSynth.speak(fortune);
  }
}

function draw() {
  if (showFortune) {
    background(0);
    fill(255);
    text("You asked:\n" + question, width / 2, height / 2 - 40);
    text("Your fortune:\n" + fortune, width / 2, height / 2 + 40);
  }
}

function generateFortune(q) {
  q = q.toLowerCase();

  if (q.includes("love") || q.includes("relationship") || q.includes("crush")) {
    const loveFortunes = [
      "A surprise message will warm your heart.",
      "Someone is thinking of you right now.",
      "Your love life is about to take a new turn.",
      "Trust your gut — it's more accurate than Cupid.",
      "Romance blooms in unexpected places."
    ];
    return random(loveFortunes);
  }

  if (q.includes("money") || q.includes("wealth") || q.includes("finance")) {
    const moneyFortunes = [
      "An unexpected windfall is coming your way.",
      "Watch your wallet — spending lurks ahead.",
      "Saving now will pay off in a big way.",
      "Invest in what matters most to you.",
      "Riches may come, but happiness is the real currency."
    ];
    return random(moneyFortunes);
  }

  if (q.includes("career") || q.includes("job") || q.includes("work")) {
    const careerFortunes = [
      "A promotion is in your future.",
      "Take a leap — the net will appear.",
      "New challenges will lead to growth.",
      "Your ideas are ready to be heard.",
      "Persistence will open doors soon."
    ];
    return random(careerFortunes);
  }

  if (q.includes("health") || q.includes("sick") || q.includes("wellness")) {
    const healthFortunes = [
      "Balance is key — listen to your body.",
      "A walk in nature will do wonders.",
      "Hydrate. Then hydrate again.",
      "Your strength is greater than you know.",
      "Healing comes in many forms — be open to them."
    ];
    return random(healthFortunes);
  }

  if (q.includes("future") || q.includes("destiny") || q.includes("what will happen")) {
    const futureFortunes = [
      "The future holds more joy than you expect.",
      "A twist in the road leads to clarity.",
      "Time will reveal a surprising truth.",
      "Tomorrow brings a fresh opportunity.",
      "The unknown is your greatest ally."
    ];
    return random(futureFortunes);
  }

  // Fallback — random mystical response
  const mysterious = [
    "The stars are whispering… but not clearly.",
    "Fate is fuzzy today — ask again tomorrow.",
    "Even I don't know that. Spooky.",
    "Something is shifting in the ether…",
    "Your energy is powerful — use it wisely.",
    "The spirits are distracted by cat videos. Try again."
  ];
  return random(mysterious);
}

// Function to play mystical tones with oscillators
// function playMysticalTones() {
//   osc1.freq(220);  // Set frequency for each oscillator
//   osc2.freq(440);
//   osc3.freq(880);

//   // Ramp up the oscillators to create a mystical effect
//   osc1.amp(0.2, 0.5);
//   osc2.amp(0.1, 0.7);
//   osc3.amp(0.15, 1);

//   // Start oscillators
//   osc1.start();
//   osc2.start();
//   osc3.start();

//   // Stop oscillators after a short duration (to create a mystical, brief effect)
//   setTimeout(() => {
//     osc1.amp(0, 2);
//     osc2.amp(0, 2);
//     osc3.amp(0, 2);
//   }, 2000); // Fade out after 2 seconds
// }

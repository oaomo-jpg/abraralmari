window.addEventListener("DOMContentLoaded", () => {

const symbols = [
    "★","✦","✶","✿","❀","❁","♥","♡",
    "☺","☻","☀","☾","☁","♫","♪",
    "⚡","✈","➜","∞","◆","◇",
    "●","○","◐","◑","☮","☯",
    "✧","✩","✪","✺","✹","✸"
];

const colors = [
    "#ff2ebd",
    "#57ff43",
    "#3a7dff",
    "#ffdf00",
    "#ff6a00",
    "#8d42ff",
    "#00d9ff",
    "#ff0055",
    "#ff7dd8",
    "#8aff66"
];

const layer = document.getElementById("stickerLayer");

const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const stickers = [];

const stickerCount = 55;

for(let i = 0; i < stickerCount; i++){

    const el = document.createElement("span");

    el.className = "sticker";

    el.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    el.style.color =
        colors[Math.floor(Math.random() * colors.length)];

    el.style.fontSize =
        (18 + Math.random() * 55) + "px";

    layer.appendChild(el);

    stickers.push({

        el,

        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,

        vx: (Math.random() - .5) * .5,
        vy: (Math.random() - .5) * .5,

        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - .5) * .4,

        size: 18 + Math.random() * 55

    });

}

function animate(){

    stickers.forEach(s => {

        // distance to mouse

        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        // repel

        if(distance < 160){

            const force = (160 - distance) / 160;

            s.vx += (dx / distance) * force * .6;
            s.vy += (dy / distance) * force * .6;

        }

        // gentle wandering

        s.vx += (Math.random() - .5) * .02;
        s.vy += (Math.random() - .5) * .02;

        // damping

        s.vx *= .985;
        s.vy *= .985;

        // update position

        s.x += s.vx;
        s.y += s.vy;

        // wrap around edges

        if(s.x < -80) s.x = window.innerWidth + 80;
        if(s.x > window.innerWidth + 80) s.x = -80;

        if(s.y < -80) s.y = window.innerHeight + 80;
        if(s.y > window.innerHeight + 80) s.y = -80;

        // rotate

        s.rotation += s.rotationSpeed;

        // render

        s.el.style.transform =
            `translate(${s.x}px, ${s.y}px) rotate(${s.rotation}deg)`;

    });

    requestAnimationFrame(animate);

}

animate();

window.addEventListener("resize", () => {

    mouse.x = window.innerWidth / 2;
    mouse.y = window.innerHeight / 2;

});

});
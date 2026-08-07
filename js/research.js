/* ==========================================
   RESEARCH PARALLAX
   Words move at different speeds while scrolling
========================================== */

const words = document.querySelectorAll(".research-word");

let currentScroll = 0;
let targetScroll = 0;

// Update target scroll position
window.addEventListener("scroll", () => {
    targetScroll = window.scrollY;
});

// Smooth animation loop
function animate() {

    // Smooth interpolation
    currentScroll += (targetScroll - currentScroll) * 0.08;

    words.forEach((word) => {

        const speed = parseFloat(word.dataset.speed) || 0.2;

        // Move the word vertically based on its speed
        word.style.translate = `0 ${currentScroll * speed}px`;

    });

    requestAnimationFrame(animate);

}

animate();
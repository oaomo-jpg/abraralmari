// =====================================
// AUDIO PLAYER
// =====================================

const player = document.getElementById("player");
const source = document.getElementById("audioSource");

const title = document.getElementById("projectTitle");
const description = document.getElementById("projectDescription");
const concept = document.getElementById("projectConcept");
const tools = document.getElementById("projectTools");
const process = document.getElementById("projectProcess");

const epHome = document.getElementById("epHome");

const tracks = document.querySelectorAll(".track");


// =====================================
// EP OVERVIEW CONTENT
// =====================================

const epData = {

    src: "audio/EP - A Piece of Cloth and Some Strings/5AM.aif",

    title: "AN EP",

    description:
        "A seven-track experimental EP created for a Bedroom Beats / DIY Beats course using Ableton Live. Built through sampling, synthesis, found sounds, layered textures, and DIY production techniques, the project explores memory, intimacy, and playful experimentation.",

    concept:
        "Rather than treating each composition as an isolated work, the EP was developed as a cohesive collection of sonic sketches. Every track experiments with different production techniques while sharing a handmade, DIY aesthetic rooted in curiosity and experimentation.",

    tools:
        "Ableton Live • Simpler • Sampler • Drum Rack • Audio Warping • MIDI Programming • Field Recordings • Found Samples",

    process:
        "Each composition began by collecting small fragments of sound—from environmental recordings to found samples—which were chopped, warped, layered, resampled, and transformed into complete songs using Ableton Live."

};


// =====================================
// UPDATE PAGE CONTENT
// =====================================

function updateProject(data) {

    if (source) {
        source.src = data.src;
        player.load();
    }

    if (title)
        title.textContent = data.title;

    if (description)
        description.textContent = data.description;

    if (concept)
        concept.textContent = data.concept;

    if (tools)
        tools.textContent = data.tools;

    if (process)
        process.textContent = data.process;

}


// =====================================
// TRACK CLICK
// =====================================

tracks.forEach(track => {

    track.addEventListener("click", () => {

        tracks.forEach(t =>
            t.classList.remove("active-track")
        );

        track.classList.add("active-track");

        updateProject({

            src: track.dataset.src,

            title: track.dataset.title,

            description: track.dataset.description,

            concept: track.dataset.concept,

            tools: track.dataset.tools,

            process: track.dataset.process

        });

        player.play();

    });

});


// =====================================
// DIY EP CLICK
// =====================================

if (epHome) {

    epHome.addEventListener("click", () => {

        tracks.forEach(track =>
            track.classList.remove("active-track")
        );

        updateProject(epData);

    });

}
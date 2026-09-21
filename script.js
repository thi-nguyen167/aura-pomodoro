(async () => {
  await loadTrianglesPreset(tsParticles);

  await tsParticles.load({
    id: "tsparticles",
    options: {
      responsive: [
        {
          maxWidth: 1024,
          options: {
            particles: { number: { value: 50 } },
          },
        },
        {
          maxWidth: 768,
          options: {
            particles: { number: { value: 30 } },
          },
        },
      ],
      preset: "triangles",
    },
  });
})();

// DOM elements
const drawerBtn = document.getElementById("open-mixer-btn");
const mixerContainer = document.getElementById("mixer-drawer");
const closeDrawerBtn = document.getElementById("close-mixer-btn");

// Open/close the drawer in smaller screen
drawerBtn.addEventListener("click", () => {
  mixerContainer.classList.add("is-open");
});

closeDrawerBtn.addEventListener("click", () => {
  mixerContainer.classList.remove("is-open");
});

// ----- MIXER LOGIC -----

const sounds = [
  { id: "vol-rain", audio: "audio-rain" },
  { id: "vol-cafe", audio: "audio-cafe" },
  { id: "vol-forest", audio: "audio-forest" },
  { id: "vol-fire", audio: "audio-fire" },
];

sounds.forEach((sound) => {
  const inputEl = document.getElementById(sound.id);
  const audioEl = document.getElementById(sound.audio);

  //   Check
  if (!inputEl || !audioEl) return;

  //   Show the percentage in the UI
  const percentageEl = inputEl.nextElementSibling;
  // Sync initial state
  percentageEl.textContent = "0%";
  inputEl.value = 0;
  audioEl.volume = 0;

  inputEl.addEventListener("input", (e) => {
    const volumeSlider = e.target.value / 100;

    audioEl.volume = volumeSlider;

    //   Play Logic
    if (volumeSlider > 0 && audioEl.paused) {
      audioEl
        .play()
        .catch((error) => console.log("Audio play failed: ", error));

      //   Pause logic
    } else if (volumeSlider === 0 && !audioEl.paused) {
      audioEl.pause();
    }

    if (percentageEl) {
      percentageEl.textContent = `${e.target.value}%`;
    }
  });
});

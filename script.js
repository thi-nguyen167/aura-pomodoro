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

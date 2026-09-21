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

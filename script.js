(async () => {
  await loadTrianglesPreset(tsParticles);

  await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      shape: {
        type: "square",
      },
    },
    preset: "triangles",
  },
});
})();
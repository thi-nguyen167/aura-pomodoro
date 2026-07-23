import { useMemo, useCallback } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadTrianglesPreset } from "@tsparticles/preset-triangles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

export default function TriangleParticles() {
  // Pass this callback directly to the ParticlesProvider wrapper
  const particlesInit = useCallback(async (engine: Engine): Promise<void> => {
    await loadTrianglesPreset(engine);
  }, []);

  // Track when the container successfully renders on the canvas
  const particlesLoaded = useCallback(
    async (container?: Container): Promise<void> => {
      console.log("tsParticles container fully initialized", container);
    },
    [],
  );

  // Memoize the preset options to prevent redundant re-renders
  const options: ISourceOptions = useMemo(
    () => ({
      preset: "triangles",
    }),
    [],
  );

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    </ParticlesProvider>
  );
}

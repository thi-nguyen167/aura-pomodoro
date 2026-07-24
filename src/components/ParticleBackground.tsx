import { useMemo, useCallback } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadTrianglesPreset } from "@tsparticles/preset-triangles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

export default function TriangleParticles() {
  const particlesInit = useCallback(async (engine: Engine): Promise<void> => {
    await loadTrianglesPreset(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container?: Container): Promise<void> => {
      console.log("tsParticles container fully initialized", container);
    },
    [],
  );

  const options: ISourceOptions = useMemo(
    () => ({
      particles: {
        number: {
          value: 20,
        },
        shape: { type: "square" },
        links: {
          triangles: {
            enable: true,
            opacity: 0.1,
            width: 1,
          },
        },
      },
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

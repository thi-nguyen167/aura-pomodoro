
# Aura Pomodoro TypeScript

[![Live Demo](https://img.shields.io/badge/Demo-Live_Site-000000?style=for-the-badge&logo=vercel)](https://thi-nguyen167.github.io/aura-pomodoro/)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

A highly interactive, aesthetic Pomodoro timer and task management application designed for deep work and focus. Built with React and styled with Tailwind CSS, featuring an integrated Lo-fi audio mixer, responsive layout, and beautiful glassmorphism design.

## Interface Preview

<details>
  <summary><b>Click to view full Desktop Version</b></summary>
  <br/>
  <img width="2880" height="1784" alt="Desktop Preview" src="https://github.com/user-attachments/assets/bc6b21a2-c9b3-4399-93e7-23c2515743e5" /><img width="850" height="2418" alt="thi-nguyen167 github io_aura-pomodoro_ (1)" src="https://github.com/user-attachments/assets/e0ba6f72-2d46-483e-9162-de56132fc447" />

</details>

<details>
  <summary><b>Click to view full Mobile Version</b></summary>
  <br/>
  
  <img width="48%" alt="Mobile Preview" src="https://github.com/user-attachments/assets/574cae0f-59f0-499b-ae14-a100aff86d0a" /> <img width="48%" alt="Mobile Menu Preview" src="https://github.com/user-attachments/assets/daf1fff5-a6b5-4a76-8094-f37a41ec75f8" />
  
</details>




## Description

Aura Pomodoro is a sophisticated productivity dashboard tailored for students and professionals. It combines time management with an immersive ambient atmosphere to keep you in the flow. Key features include a customizable Pomodoro timer, a dynamic task manager that calculates daily goals, and a built-in soundscapes mixer (Rain, Cafe, Forest, Campfire) alongside a continuous Lo-fi beats player.

The application features a sleek glassmorphism UI, interactive particle backgrounds (tsParticles), and a highly responsive layout featuring a mobile slide-out drawer. State is managed seamlessly across components and persists through Local Storage, ensuring your tasks and audio presets are always saved.

## Getting Started

### Dependencies

- OS: Windows 10/11, macOS, or Linux.
- Node.js and npm installed (required to run the React/Vite development server).
- A modern web browser (Chrome, Firefox, Safari, Edge).

### Installing

- Clone the repository to your local machine:
  ```bash
  git clone https://github.com/thi-nguyen167/aura-pomodoro.git
  ```
- Navigate into the project directory:

  ```bash
  cd aura-pomodoro
  ```

- Install the necessary npm packages:
  ```bash
  npm install
  ```

### Configuration & Tech Stack Setup (Reference)

If you are replicating this project or setting up a similar environment from scratch, here is how the core visual libraries were configured:

- Tailwind CSS Setup:

  ```bash
  npm install tailwindcss @tailwindcss/vite
  ```

  Custom configurations (glassmorphism borders, specific color palettes, and responsive breakpoints) are defined inside tailwind.config.js and global styles are applied in index.css.

Then you can read more information how to set up a tailwindcss with vite in the link below (Acknowledgments section)

- tsParticles Setup:

The dynamic, interactive background is powered by tsParticles with the Triangles preset, optimized specifically for mobile readability.

```bash
npm install @tsparticles/react @tsparticles/preset-triangles @tsparticles/engine
```

The particles are rendered via the <ParticlesProvider> and configured inside src/components/ParticleBackground.tsx to automatically dim on smaller screens, ensuring the text remains legible.

- Lucide Icons Setup:

This project uses `lucide-react` for lightweight, beautiful, and consistent SVG iconography across the dashboard.

```bash
npm install lucide-react
```

Icons are imported as standard React components and easily styled using Tailwind CSS classes.

### Executing program

- To run the project locally with hot-module reloading (HMR), start the Vite development server:

  ```bash
  npm run dev
  ```

- Open the local host link (usually http://localhost:5173) provided in your terminal in your web browser.

###

### Help

- Audio not playing automatically? Modern browsers block audio autoplay until the user interacts with the page. Simply click anywhere on the page or toggle the Lo-fi button to start the audio engine.

- Particles blocking text or clicks? Ensure the `ParticlesProvider` is wrapped in a container with the `z-1` and `pointer-events-none` classes. This pushes the animation to the background and stops it from intercepting your mouse interactions.

- If you encounter caching issues with Local Storage during development, you can clear it via your browser's Developer Tools (F12) -> Application -> Local Storage.

### Author

Thi Anh Thi Nguyen
[@thi-nguyen167](https://github.com/thi-nguyen167)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://react.dev/) & [Vite](https://vitejs.dev/) - Core UI framework and blazing-fast build tool.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS framework for rapid UI development.
- [tsParticles](https://particles.js.org/) - For the lightweight, animated particle background.
- [Lucide React](https://lucide.dev/) - For the beautiful, consistent, and easily customizable iconography.

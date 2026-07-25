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
  <img alt="Desktop Preview" src="" />
</details>

<details>
  <summary><b>Click to view full Mobile Version</b></summary>
  <br/>
  <img alt="Mobile Preview" src="" />
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

### Executing program

- To run the project locally and compile CSS changes, start the Tailwind CLI watcher:

  ```bash
  npx tailwindcss -i ./styles.css -o ./output.css --watch
  ```

- Open the index.html file in your web browser. Alternatively, use an extension like VS Code Live Server for automatic hot-reloading as you make changes.

### Help

- If you notice that your Tailwind classes are not applying to the HTML, ensure the Tailwind CLI watcher is actively running in your terminal.
- If the scroll animations feel laggy, verify that the requestAnimationFrame logic is intact in your script.js file.
  ```bash
  # Check if Tailwind CLI is running and watching for changes
  npm run dev # (If configured in package.json)
  ```

### Author

Thi Anh Thi Nguyen
[@thi-nguyen167](https://github.com/thi-nguyen167)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation/tailwind-cli)
- [Google Fonts](https://fonts.google.com/)
- Inspiration from premium architectural and editorial design (Awwwards).

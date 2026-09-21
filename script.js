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

// LocalStorage
const savePresetBtn = document.getElementById("save-preset-btn");

savePresetBtn.addEventListener("click", () => {
  const currentPreset = {};

  sounds.forEach((sound) => {
    const inputEl = document.getElementById(sound.id);

    if (inputEl) {
      currentPreset[sound.id] = inputEl.value;
    }
  });

  //   Save to localStorage
  localStorage.setItem("aura_sound_preset", JSON.stringify(currentPreset));

  savePresetBtn.textContent = "Saved!";
  setTimeout(() => {
    savePresetBtn.textContent = "Save Preset";
  }, 2000);
});

// Saved even after reload page
const loadPreset = () => {
  // get the storage
  const savedData = localStorage.getItem("aura_sound_preset");

  if (!savedData) return;

  const parsedPreset = JSON.parse(savedData);

  sounds.forEach((sound) => {
    const inputEl = document.getElementById(sound.id);
    const audioEl = document.getElementById(sound.audio);
    const percentageEl = inputEl?.nextElementSibling;
    if (inputEl && audioEl && parsedPreset[sound.id] !== undefined) {
      const savedValue = parsedPreset[sound.id];
      const volumeLevel = savedValue / 100;

      // Show slide and percentage
      inputEl.value = savedValue;
      if (percentageEl) {
        percentageEl.textContent = `${savedValue}%`;
      }

      // show Audio
      audioEl.volume = volumeLevel;

      if (volumeLevel > 0) {
        audioEl
          .play()
          .catch((error) => console.log("Audio play failed: ", error));
      }
    }
  });
};
loadPreset();

// ----- TIMER LOGIC ------
const TIMER_SETTINGS = {
  focus: { minutes: 25, subtitle: "STAY IN THE FLOW" },
  shortBreak: { minutes: 5, subtitle: "TAKE A BREATHER" },
  longBreak: { minutes: 15, subtitle: "RECHARGE YOURSELF" },
};

let currentMode = "focus";
let isRunning = false;
let timerInterval = null;

const timeDisplay = document.querySelector(".timer__time");
const subtitleDisplay = document.querySelector(".timer__subtitle");
const modeTabs = document.querySelectorAll(".timer__tab");

const playBtn = document.querySelector(".timer__btn--play");
const playIcon = playBtn?.querySelector(".material-symbols-outlined");
const resetBtn = document.querySelector(".timer__btn--reset");
const skipBtn = document.querySelector(".timer__btn--skip");

const alarmAudio = document.getElementById("audio-alarm");

let timeLeftbySeconds = TIMER_SETTINGS[currentMode].minutes * 60;

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const s = (seconds % 60).toString().padStart(2, "0");

  return `${m}:${s}`;
};

// Update the timer display
const updateTimerDisplay = () => {
  if (timeDisplay) {
    timeDisplay.textContent = formatTime(timeLeftbySeconds);
    document.title = `${formatTime(timeLeftbySeconds)} - Aura Pomodoro`;
  }
};

// Pause Timer
const pauseTimer = () => {
  isRunning = false;

  clearInterval(timerInterval);
  if (playIcon) playIcon.textContent = "play_arrow";
};

// Play timer
const playTimer = () => {
  isRunning = true;
  if (playIcon) playIcon.textContent = "pause";

  timerInterval = setInterval(() => {
    if (timeLeftbySeconds > 0) {
      timeLeftbySeconds--;
      updateTimerDisplay();
    } else {
      pauseTimer();
      if (alarmAudio)
        alarmAudio.play().catch((e) => console.log("Alarm blocked", e));

      // Auto-switch to break or focus when done
      if (currentMode === "focus") {
        setMode("shortBreak");
      } else {
        setMode("focus");
      }
    }
  }, 1000);
};

const toggleTimer = () => {
  if (isRunning) {
    pauseTimer();
  } else {
    playTimer();
  }
};

// choose a mode
const setMode = (mode) => {
  pauseTimer();
  currentMode = mode;

  timeLeftbySeconds = TIMER_SETTINGS[mode].minutes * 60;

  // active the selected mode
  modeTabs.forEach((tab) => {
    if (tab.dataset.mode === mode) {
      tab.classList.add("timer__tab--active");
    } else {
      tab.classList.remove("timer__tab--active");
    }
  });

  //   Update the timer
  updateTimerDisplay();

  //   Update the text display
  if (subtitleDisplay) {
    subtitleDisplay.textContent = TIMER_SETTINGS[mode].subtitle;
  }
};

// choose a mode tab
modeTabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const selectedMode = e.target.dataset.mode;
    setMode(selectedMode);
  });
});

playBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", () => {
  setMode("focus");
});
skipBtn.addEventListener("click", () => {
  if (currentMode === "focus") {
    setMode("shortBreak");
  } else {
    setMode("focus");
  }
});
updateTimerDisplay();

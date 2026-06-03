"use strict"
// Mobile Menu Drawer Logic
const mixerDrawer = document.getElementById('mixer-drawer');
const openBtn = document.getElementById('open-mixer-btn');
const closeBtn = document.getElementById('close-mixer-btn');

if (openBtn && closeBtn && mixerDrawer) {
  openBtn.addEventListener('click', () => {
    mixerDrawer.classList.add('open');
  });

  closeBtn.addEventListener('click', () => {
    mixerDrawer.classList.remove('open');
  });
}

class AudioMixer {
  constructor() {

    // grab all the sliders on the page
    this.sliders = document.querySelectorAll('.vol-slider');

    // grab lo-fi elements
    this.lofiToggelCard = document.getElementById('lofi-toggle');
    this.lofiIcon = document.getElementById('lofi-icon');
    this.lofiTrackName = document.querySelector('.lofi-track');

    // grab the audio
    this.lofiAudio = document.getElementById('audio-lofi');

    this.savePresetBtn = document.getElementById('save-preset-btn');

    // lofi Playlist
    this.lofiPlaylist = [
      { title: "Coffee Lofi - Chill Lofi Ambient", src: "audio/lofi-1.mp3" },
      { title: "Lofi Ambient Music", src: "audio/lofi-2.mp3" },
      { title: "Deep Focus Lofi", src: "audio/lofi-3.mp3" },
      { title: "Lofi Relax Song", src: "audio/lofi-4.mp3" },
      { title: "Dreamy LoFi Music", src: "audio/lofi-5.mp3" },
      { title: "Lofi Smooth Song", src: "audio/lofi-6.mp3" }
    ];

    this.currentTrackIndex = 0;

    // listen to the event immediately
    this.init();
  }

  init() {

    this.loadPreset();

    this.sliders.forEach(slider => {

      // set initial state based on the HTML
      this.handleVolumeChange(slider);


      slider.addEventListener('input', (e) => {
        this.handleVolumeChange(e.target);
      })

      

    })

    // listen for the Save Button click
    if (this.savePresetBtn) {
      this.savePresetBtn.addEventListener('click', () => {
        this.savePreset();
      });
    }

    // Lofi click event
    if (this.lofiToggelCard && this.lofiAudio) {
      this.lofiToggelCard.addEventListener('click', () => {
        this.toggleLofi();
      }
      )
      this.lofiAudio.addEventListener('ended', () => {
        this.playNextLofiTrack();
      })
    }
  }

// Local Storage

  savePreset() {
    // create an empty object to store our volumes
    const presetData = {};

    // loop through all sliders and save their ID and current value
    this.sliders.forEach(slider => {
      presetData[slider.id] = slider.value;
    });

    // convert the object to a string and save it to Local Storage
    localStorage.setItem('aura_audio_preset', JSON.stringify(presetData));

    // UX MAGIC: Give the user visual feedback that it worked
    const originalText = this.savePresetBtn.textContent;
    this.savePresetBtn.textContent = "Saved";
    
    // revert the button text after 2 seconds
    setTimeout(() => {
      this.savePresetBtn.textContent = originalText;
    }, 2000);
  }

  loadPreset() {
    // check if the user has a saved preset
    const savedData = localStorage.getItem('aura_audio_preset');
    
    if (savedData) {
      // turn the string back into a JavaScript object
      const presetData = JSON.parse(savedData);

      // loop through the sliders and override their values with the saved ones
      this.sliders.forEach(slider => {
        if (presetData[slider.id] !== undefined) {
          slider.value = presetData[slider.id];
        }
      });
    }
  }

  // handle vloume function
  handleVolumeChange(slider) {
    // extract the name of the sound from ID
    const soundName = slider.id.replace('vol-', '');

    // find the match sound with the soundName
    const audioEl = document.getElementById(`audio-${soundName}`);
    const percentageText = slider.nextElementSibling;

    if (!audioEl) return;

    // get the valueof the volume
    const volumeValue = parseInt(slider.value);

    // update the volume value on the screen
    percentageText.textContent = `${volumeValue}%`;

    // change the value into 0.0 -1.0
    audioEl.volume = volumeValue / 100;

    // Pause logic
    if (volumeValue === 0) {
      audioEl.pause();
    } else {
      if (audioEl.paused) {
        audioEl.play().catch(error => {
          console.log(`Waiting for user interaction to play ${soundName}`);
        })
      }
    }

  }
  // lofi play list function
  playNextLofiTrack() {
    this.currentTrackIndex++;

    if (this.currentTrackIndex >= this.lofiPlaylist.length) {
      this.currentTrackIndex = 0;
    }

    this.loadLofiTrack(this.currentTrackIndex);
    this.lofiAudio.play();

  }

  loadLofiTrack(index) {
    const track = this.lofiPlaylist[index];
    this.lofiAudio.src = track.src;

    if (this.lofiTrackName) {
      this.lofiTrackName.textContent = track.title;
    }

  }

  // toggle lofi function
  toggleLofi() {
    if (this.lofiAudio.paused) {
      this.lofiAudio.volume = 0.5;

      this.lofiAudio.play().then(() => {
        this.lofiIcon.textContent = 'pause';

      }).catch(error => {
        console.log(`Waiting for user interaction to click`);
      })
    } else {
      this.lofiAudio.pause();
      this.lofiIcon.textContent = 'music_note';

    }
  }


}


class Timer {
  constructor() {

    // set up the core state
    this.modes = {
      focus: 25 * 60,
      shortBreak: 5 * 60,
      longBreak: 15 * 60
    }


    this.currentMode = 'focus';
    this.timeLeft = this.modes[this.currentMode];
    this.timeInterval = null;

    this.isRunning = false;

    // DOM
    this.tabs = document.querySelectorAll('.btn-tab');
    this.displayTime = document.querySelector('.time-huge');
    this.displaySubtitle = document.querySelector('.timer-subtitle');
    this.btnReset = document.querySelector('.btn-reset');
    this.btnPlay = document.querySelector('.btn-play');
    this.btnSkip = document.querySelector('.btn-skip');
    this.btnPlayIcon = this.btnPlay.querySelector('.material-symbols-outlined');

    this.audioAlarm = document.getElementById('audio-alarm');

    this.init();
  }

  init() {

    if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }

    this.btnPlay.addEventListener('click', () => {
      this.toggleTimer();
    })
    this.btnReset.addEventListener('click', () => {
      this.resetTimer();
    })
    this.btnSkip.addEventListener('click', () => {
      this.skipSession();
    })


    // mode tabs 
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const selectedMode = tab.dataset.mode;
        this.switchMode(selectedMode, tab);
      })
    })

    this.updateDisplay();
  }

  toggleTimer() {
    if (this.isRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    this.isRunning = true;
    this.btnPlayIcon.textContent = 'pause';
    this.btnPlay.style.transform = 'scale(1)';

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      this.updateDisplay();

      if (this.timeLeft <= 0) {
        this.completeSession();
      }
    }, 1000);
  }

  pauseTimer() {
    this.isRunning = false;
    this.btnPlayIcon.textContent = 'play_arrow';
    this.btnPlay.style.transform = 'scale(1)';
    clearInterval(this.timerInterval);
  }

  resetTimer() {
    this.pauseTimer();
    this.timeLeft = this.modes[this.currentMode];
    this.updateDisplay();
  }


  skipSession() {
    if (this.currentMode === 'focus') {
      this.switchMode('shortBreak', this.tabs[1]);
    } else {
      this.switchMode('focus', this.tabs[0]);
    }
  }

  completeSession() {
    this.pauseTimer();

    // notification
    if (this.audioAlarm) {
      this.audioAlarm.volume = 0.6; // Not too loud!
      this.audioAlarm.play().catch(err => console.log("Audio blocked by browser."));
    }

    // set up the text for the notification
    let notifTitle = "Aura Pomodoro";
    let notifBody = "";

    if (this.currentMode === 'focus') {
      notifBody = "Focus session complete! Time for a well-deserved break.";
      
      if (typeof myProgress !== 'undefined') {
        myProgress.addFocusSession(25);
      }
      console.log("Focus session complete! Progress updated.");
    } else {
      notifBody = "Break is over! Let's get back into the flow.";
    }

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(notifTitle, {
        body: notifBody, 
      });
    }

    this.skipSession();

  }

  switchMode(mode, activeTabElement) {
    this.pauseTimer();
    this.currentMode = mode;
    this.timeLeft = this.modes[this.currentMode];

    this.tabs.forEach(tab => tab.classList.remove("active"));
    activeTabElement.classList.add("active");


    // update the subtitle
    const subtitles = {
      focus: 'STAY IN THE FLOW',
      shortBreak: 'TAKE A BREATHER',
      longBreak: 'STEP AWAY AND RECHARGE'
    };

    this.displaySubtitle.textContent = subtitles[this.currentMode];

    this.updateDisplay();
  }

  updateDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;

    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    this.displayTime.textContent = formattedTime;

    // display the time on the tab browser
    const modelLabel = this.currentMode === 'focus' ? 'Focus' : 'Break';
    document.title = `${formattedTime} - ${modelLabel} | Aura`;

  }
}

class TaskManager {
  constructor() {
    // 1. CORE STATE: This array holds all task data
    this.tasks = [];

    // 2. DOM Elements
    this.upNextList = document.getElementById('up-next-list');
    this.doneList = document.getElementById('done-list');
    this.doneBadge = document.getElementById('done-badge');
    this.addTaskBtn = document.getElementById('add-task-btn');
    this.activeTaskContainer = document.getElementById('active-task-container');

    this.init();
  }

  init() {
    // load existing tasks from Local Storage when the app starts
    this.loadTasks();

    // listen for "Add Task"
    this.addTaskBtn.addEventListener('click', () => {
      this.createNewTask();
    });

    // event Delegation for Up Next List (Handles Check, Set Active, Delete)
    this.upNextList.addEventListener('click', (e) => {
      const taskId = e.target.closest('.task-item').dataset.id;

      if (e.target.type === 'checkbox') {
        this.completeTask(taskId);
      } else if (e.target.closest('.btn-set-active')) {
        this.setActiveTask(taskId);
      } else if (e.target.closest('.btn-delete')) {
        this.deleteTask(taskId);
      }
    });

    // event Delegation for the Active Task Container
    this.activeTaskContainer.addEventListener('click', (e) => {
      // If they click the Checkmark button
      const completeBtn = e.target.closest('.btn-complete-active');
      if (completeBtn) {
        this.completeTask(completeBtn.dataset.id);
      }

      // If they click the 'X' cancel button
      const cancelBtn = e.target.closest('.btn-cancel-active');
      if (cancelBtn) {
        this.cancelActiveTask(cancelBtn.dataset.id);
      }
    });

    this.render();
  }

  createNewTask() {
    const taskText = prompt("What do you need to do?");
    if (!taskText) return;

    const taskTime = prompt("Estimated time (e.g., 25m):", "25m") || "25m";

    // create a unique object for the new task
    const newTask = {
      id: Date.now().toString(), // Generates a unique ID
      text: taskText,
      time: taskTime,
      status: 'pending', // Can be 'pending', 'active', or 'done'
      dateAdded: new Date().toDateString()
    };

    this.tasks.push(newTask);
    this.saveTasks();
    this.render();
  }

  setActiveTask(id) {
    this.tasks.forEach(task => {
      if (task.status === 'active') task.status = 'pending';
    });

    // find the chosen task and set it to active
    const selectedTask = this.tasks.find(task => task.id === id);
    if (selectedTask) selectedTask.status = 'active';

    this.saveTasks();
    this.render();
  }

  completeTask(id) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].status = 'done';
      this.saveTasks();
      this.render();
    }
  }

  cancelActiveTask(id) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].status = 'pending';
      this.saveTasks();
      this.render();
    }
  }

  deleteTask(id) {
    // filter out the task with the matching ID
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.saveTasks();
    this.render();
  }

  // helper method to turn text like "25m" or "1h" into numbers
  parseTimeToMinutes(timeString) {
    if (!timeString) return 0;

    const str = timeString.toLowerCase().trim();

    if (str.includes('h')) {
      return parseFloat(str) * 60; // Converts hours to minutes
    }

    return parseFloat(str) || 0; // Strips the 'm' and returns the number
  }

  // Calculates the total and sends it to the ProgressTracker
  updateDynamicGoal() {
    let totalGoalMinutes = 0;
    const today = new Date().toDateString();

    this.tasks.forEach(task => {
      // Only count tasks created today towards today's goal
      if (task.dateAdded === today) {
        totalGoalMinutes += this.parseTimeToMinutes(task.time);
      }
    });

    // Send the final number to the ProgressTracker!
    if (typeof myProgress !== 'undefined') {
      myProgress.setDailyGoal(totalGoalMinutes);
    }
  }

  // LOCAL STORAGE

  saveTasks() {
    localStorage.setItem('aura_tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const savedData = localStorage.getItem('aura_tasks');
    if (savedData) {
      this.tasks = JSON.parse(savedData);
      this.checkDailyReset();
    }
  }

  checkDailyReset() {
    const today = new Date().toDateString();
    // keep pending/active tasks, but remove 'done' tasks if they are from a previous day
    this.tasks = this.tasks.filter(task => {
      if (task.status === 'done' && task.dateAdded !== today) {
        return false; // Remove it
      }
      return true; // Keep it
    });
    this.saveTasks();
  }

  // --- DOM RENDERING ---

  render() {
    this.upNextList.innerHTML = '';
    this.doneList.innerHTML = '';

    let doneCount = 0;
    let hasActiveTask = false;

    // loop through the state array and rebuild the HTML
    this.tasks.forEach(task => {

      if (task.status === 'active') {
        hasActiveTask = true;
        this.activeTaskContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <div>
                    <p style="margin: 0; font-weight: 600;">${task.text}</p>
                    <span class="task-time text-muted" style="font-size: 0.85rem;">${task.time}</span>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="btn-icon btn-cancel-active" data-id="${task.id}" style="width: 32px; height: 32px;" aria-label="Cancel Focus">
                        <span class="material-symbols-outlined" style="font-size: 20px;">close</span>
                    </button>
                    <button class="btn-icon btn-complete-active" data-id="${task.id}" style="width: 32px; height: 32px;" aria-label="Complete Focus Task">
                        <span class="material-symbols-outlined" style="font-size: 20px; color: var(--primary-container);">check_circle</span>
                    </button>
                </div>
            </div>
        `;
      
      }

      else if (task.status === 'pending') {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.id = task.id; // Store ID in the HTML

        // add a container for controls (Focus icon and Delete icon)
        li.innerHTML = `
                    <label class="checkbox-wrapper">
                        <input type="checkbox"> 
                        ${task.text}
                    </label>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <span class="task-time">${task.time}</span>
                        <button class="btn-icon btn-set-active" style="width: 24px; height: 24px; padding: 0;" aria-label="Set as Focus">
                            <span class="material-symbols-outlined" style="font-size: 18px;">play_arrow</span>
                        </button>
                        <button class="btn-icon btn-delete" style="width: 24px; height: 24px; padding: 0;" aria-label="Delete Task">
                            <span class="material-symbols-outlined" style="font-size: 18px; color: var(--error);">delete</span>
                        </button>
                    </div>
                `;
        this.upNextList.appendChild(li);
      }

      else if (task.status === 'done') {
        doneCount++;
        const li = document.createElement('li');
        li.className = 'task-item completed';
        li.innerHTML = `
                    <span class="material-symbols-outlined">check_circle</span>
                    <span class="task-text">${task.text}</span>
                `;
        this.doneList.appendChild(li);
      }
    });

    // handle Empty States and Counters
    if (!hasActiveTask) {
      this.activeTaskContainer.innerHTML = `<p class="text-muted">Select a task to focus on</p>`;
    }

      this.doneBadge.textContent = `${doneCount} Today`;
  
      this.updateDynamicGoal();

  }
}

class ProgressTracker {
  constructor() {
    this.focusTimeMinutes = 0; // Starts at 0
    this.dailyGoalMinutes = 0; // Starts at 0

    this.timeDisplay = document.querySelector('.stat-value');
    this.percentageDisplay = document.querySelector('.stat-percentage') || document.querySelectorAll('.stat-value')[1];
    this.goalLabel = document.querySelectorAll('.stat-label')[1];

    this.updateDisplay();
  }

  addFocusSession(minutes) {
    this.focusTimeMinutes += minutes;
    this.updateDisplay();
  }

  // Method to accept dynamic goal updates from TaskManager
  setDailyGoal(minutes) {
    this.dailyGoalMinutes = minutes;
    this.updateDisplay();
  }

  updateDisplay() {
    const hours = (this.focusTimeMinutes / 60).toFixed(1);
    this.timeDisplay.textContent = `${hours}h`;

    let percentage = 0;

    // Prevent Divide-By-Zero errors if no tasks exist yet
    if (this.dailyGoalMinutes > 0) {
      percentage = Math.floor((this.focusTimeMinutes / this.dailyGoalMinutes) * 100);
    }

    if (percentage > 100) percentage = 100;

    this.percentageDisplay.textContent = `${percentage}%`;

    const goalHours = (this.dailyGoalMinutes / 60).toFixed(1);
    
    if (this.goalLabel) {
      // If the goal is 0, just show "Goal Met". Otherwise, show "Goal Met (of Xh)"
      if (this.dailyGoalMinutes === 0) {
         this.goalLabel.textContent = "Goal Met";
      } else {
         this.goalLabel.textContent = `Goal Met (of ${goalHours}h)`;
      }
    }
  }
}

let myProgress;

document.addEventListener("DOMContentLoaded", async () => {

  // Initialize the audio mixer
  const myMixer = new AudioMixer();

  // Initialize ProgressTracker FIRST, so it is ready to receive data
  myProgress = new ProgressTracker();

  // Initialize TaskManager SECOND, so it can send the initial goal to myProgress
  const myTaskManager = new TaskManager();

  // Initialize Timer LAST, so it can tell myProgress when a session finishes
  const myTimer = new Timer();

  // Initialize the particles logic (Your existing code here is perfect)
  await loadTrianglesPreset(tsParticles);
  await tsParticles.load({
    id: "tsparticles",
    options: {
      particles: {
        shape: { type: "square" },
      },
      responsive: [
        {
          maxWidth: 1024,
          options: {
            particles: { number: { value: 50 } }
          }
        },
        {
          maxWidth: 768,
          options: {
            particles: { number: { value: 30 } }
          }
        }
      ],
      preset: "triangles",
    },
  });
});
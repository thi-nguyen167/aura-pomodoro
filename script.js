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

    // lofi Playlist
    this.lofiPlaylist = [
      { title: "Coffee Lofi - Chill Lofi Ambient", src: "audio/lofi-1.mp3" },
      { title: "Lofi Ambient Background Music for Sleep, Relax & Night Vibes", src: "audio/lofi-2.mp3" },
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
    // Loop through the sliders and add the event to each
    this.sliders.forEach(slider => {

      // set initial state based on the HTML
      this.handleVolumeChange(slider);


      slider.addEventListener('input', (e) => {
        this.handleVolumeChange(e.target);
      })

      // Lofi click event

    })

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


    this.init();
  }

  init() {
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

    // Notification later and update the progress logic
    console.log(`Session ${this.currentMode} complete!`);

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





document.addEventListener("DOMContentLoaded", async () => {
  // Initialize the audio logic
  const myMixer = new AudioMixer();
  const myTimer = new Timer();

  // Initialize the particles logic
  await loadTrianglesPreset(tsParticles);
  await tsParticles.load({
    id: "tsparticles",
    options: {
      particles: {
        shape: {
          type: "square",
        },
      },

      responsive: [
        {
          maxWidth: 768,
          options: {
            particles: {
              number: {
                value: 30,
              },
            }
          }
        }
      ],
      preset: "triangles",
    },
  });
});



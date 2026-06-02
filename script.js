"use strict"

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
    if (volumeValue === 0 ) {
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

    if(this.currentTrackIndex >= this.lofiPlaylist.length) {
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

document.addEventListener("DOMContentLoaded", async () => {
  // Initialize the audio logic
  const myMixer = new AudioMixer();

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
      preset: "triangles",
    },
  });
});
 

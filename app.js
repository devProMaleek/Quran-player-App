// Carousels

const carousal = [...document.querySelectorAll(".carousel-section img")];
let carousalImageIndex = 0;

const changeCarousal = () => {
  carousal[carousalImageIndex].classList.toggle("active");
  if (carousalImageIndex >= carousal.length - 1) {
    carousalImageIndex = 0;
  } else {
    carousalImageIndex++;
  }

  carousal[carousalImageIndex].classList.toggle("active");
};

setInterval(changeCarousal, 3000);

// Navigation

// Toggling Quran Player

const quranPlayerSection = document.querySelector(".quran-player-section");

let clickCount = 1;

quranPlayerSection.addEventListener("click", () => {
  // Checking for double click manually.
  if (clickCount >= 2) {
    quranPlayerSection.classList.add("active");
    clickCount = 1;
    return;
  }
  clickCount++;
  setTimeout(() => {
    clickCount = 1;
  }, 250);
});

// Back from Quran Player

const backToHomeBtn = document.querySelector(".quran-player-section .back-btn");

backToHomeBtn.addEventListener("click", () => {
  quranPlayerSection.classList.remove("active");
});

// Access Playlist

const playlistSection = document.querySelector(".playlist");
const navBtn = document.querySelector(".quran-player-section .nav-btn");

navBtn.addEventListener("click", () => {
  playlistSection.classList.add("active");
});

// Back from Playlist to Quran Player

const backToQuranPlayer = document.querySelector(".playlist .back-btn");

backToQuranPlayer.addEventListener("click", () => {
  playlistSection.classList.remove('active');
});

// Music

// Set the global variable.
let currentMusic = 0;

const music = document.querySelector('#audio-source')
const seekBar = document.querySelector('.music-seek-bar')
const songName = document.querySelector('.current-song-name')
const artistName = document.querySelector('.artist-name')
const coverImage = document.querySelector('.cover')
const currentMusicTime = document.querySelector('.current-time')
const musicDuration = document.querySelector('.duration')

const queue = [...document.querySelectorAll('.queue')]


// Select all buttons

const forwardBtn = document.querySelector('i.fa-forward');
const backwardBtn = document.querySelector('i.fa-backward')
const playBtn = document.querySelector('i.fa-play')
const pauseBtn = document.querySelector('i.fa-pause')
const repeatBtn = document.querySelector('span.fa-redo')
const volumeBtn = document.querySelector('span.fa-volume-up')
const volumeSlider = document.querySelector('.volume-slider')

// Function for setting up music

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i]
    currentMusic = i;

    music.src = song.path

    songName.innerHTML = song.name
    artistName.innerHTML = song.artist
    coverImage.src = song.cover

    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration) 
    }, 300)
    currentMusicTime.innerHTML = "00:00"    
    queue.forEach(item => item.classList.remove('active'))
    queue[currentMusic].classList.add('active')
}

setMusic(1)

// Format duration in 00:00:00 format

const formatTime = (time) => {
    // Format Hours
    let hrs = Math.floor(time / 60 / 60)
    // Format Minutes
    let min = Math.floor(time / 60 % 60)
    if(min < 10) {
        min = `0` + min;
    }

    // Format Seconds
    let sec = Math.floor(time % 60)
    if (sec < 10) {
        sec = `0` + sec
    }

    return `${hrs}:${min}:${sec}`
}

// Play Button Click Event

playBtn.addEventListener('click', () => {
    music.play()

    playBtn.classList.remove('active')
    pauseBtn.classList.add('active')
})

// Pause Button Click Event

pauseBtn.addEventListener('click', () => {
    music.pause()

    pauseBtn.classList.remove('active')
    playBtn.classList.add('active')
})

// Forward Button Click Event

forwardBtn.addEventListener('click', () => {
  if(currentMusic >= songs.length - 1){
    currentMusic = 0;
  }else {
    currentMusic++
  }
  setMusic(currentMusic);
  playBtn.click() 
})

// Backward Button Click Event
backwardBtn.addEventListener('click', () => {
  if(currentMusic <= 0){
    // Set to last played.
    currentMusic = songs.length - 1;
  } else{
    currentMusic--;
  }
  setMusic(currentMusic);
  playBtn.click()
}) 

// SeekBar Button Click Event
setInterval(() => {
  seekBar.value = music.currentTime;
  currentMusicTime.innerHTML = formatTime(music.currentTime)
  if(Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
    if(repeatBtn.className.includes('active')) {
      setMusic(currentMusic)
      playBtn.click();
    } else {
      forwardBtn.click();
    }
  }
}, 500);

// Set the current time of the surah to the present value of the range input type.
seekBar.addEventListener('change', () => {
  music.currentTime = seekBar.value
})

// Repeat Button
repeatBtn.addEventListener('click', () => {
  repeatBtn.classList.toggle('active')
})

// Volume Section

volumeBtn.addEventListener('click', () => {
  volumeBtn.classList.toggle('active')
  volumeSlider.classList.toggle('active')
})

volumeSlider.addEventListener('input', () => {
  music.volume = volumeSlider.value
})

// Making Playlist to Function

queue.forEach((item, i) => {
  item.addEventListener('click', () => {
    setMusic(i)
    playBtn.click();
  })
})
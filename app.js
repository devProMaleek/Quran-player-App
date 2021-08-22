// Carousels

const carousal = [...document.querySelectorAll(".carousel-section img")];
console.log(carousal);
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

// Carousels

const carousal = [...document.querySelectorAll('.carousel-section img')];
console.log(carousal)
let carousalImageIndex = 0;

const changeCarousal = () => {
    carousal[carousalImageIndex].classList.toggle('active')
    if (carousalImageIndex >= carousal.length - 1) {
        carousalImageIndex = 0;
    } else {
        carousalImageIndex++;
    }

    carousal[carousalImageIndex].classList.toggle('active')
}

setInterval(changeCarousal, 3000)
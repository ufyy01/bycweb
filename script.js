function searchbar() {
    const searchBtn = document.getElementById("search-btn");
    const searchDiv = document.querySelector(".search-div");
    const brandLogo = document.querySelector(".big-logo");

    searchBtn.style.display = "none"
    brandLogo.style.display = "none"
    searchDiv.style.display = "block"
}
function closeSearch() {
    const searchBtn = document.getElementById("search-btn");
    const searchDiv = document.querySelector(".search-div");
    const brandLogo = document.querySelector(".big-logo");

    searchBtn.style.display = "inline-block";
    brandLogo.style.display = "block";
    searchDiv.style.display = "none";
}
let currentIndex = 0;

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
}

function nextSlide() {
    const items = document.querySelectorAll('.carousel-inner .carousel-item');
    if (currentIndex < items.length - 1) {
        currentIndex++;
        updateCarousel();
    }
}

function updateCarousel() {
  let newTransformValue = -currentIndex * 100 + '%';
    document.querySelector('.carousel-inner').style.transform = 'translateX(' + newTransformValue + ')';
}
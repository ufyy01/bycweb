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
const productCarousel = document.querySelector("#productCarousel");
if (window.matchMedia("(min-width:576px)").matches) {
    const carousel = new bootstrap.Carousel(productCarousel, 
    {
        interval: false
    })

    let carousell = document.querySelector(".carousel-inner");
    let carouselWidth = carousell.scrollWidth;
    let cardWidth = document.querySelector(".carousel-item").clientWidth;
 
    let scrollPosition = 0;

    function nextSlide() {
        console.log(cardWidth)
        if (scrollPosition < carouselWidth - cardWidth ) {
            scrollPosition += cardWidth;
            carousell.scrollTo({
                left: scrollPosition,
                behavior: "smooth"
            });
        }
    }

    function prevSlide() {
        if (scrollPosition < carouselWidth - cardWidth ) {
            scrollPosition -= cardWidth;
            carousell.scrollTo({
                left: scrollPosition,
                behavior: "smooth"
            });
        }
    }
}
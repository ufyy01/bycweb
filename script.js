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
function carouselProduct() {
    const productCarousel = document.querySelector("#productCarousel");
    if (window.matchMedia("(min-width:576px)").matches) {
        const carrousel = new bootstrap.Carousel(productCarousel, 
        {
            interval: false
        })
    
        let carousell = document.querySelector(".carousel-inner");
        let carouselWidth = carousell.scrollWidth;
        let cardWidth = document.querySelector(".carousel-item").clientWidth;
     
        let scrollPosition = 0;
    
        function nextSlide() {
            if (scrollPosition < carouselWidth - cardWidth ) {
                scrollPosition += cardWidth;
                scrollPosition = Math.min(scrollPosition, carouselWidth - cardWidth);
                carousell.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth"
                });
            }
        }
    
        function prevSlide() {
            if (scrollPosition >= cardWidth) {
                scrollPosition -= cardWidth;
                carousell.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth"
                });
            }
        }

        let nextButton = document.querySelector(".nxt-btn");
        let prevButton = document.querySelector(".pre-btn");
    
        nextButton.addEventListener("click", nextSlide);
        prevButton.addEventListener("click", prevSlide);

    }else {
        productCarousel.classList.add("slide");
    }
}
function displayList() {
    const listBtn = document.querySelector(".list");
    const gridBtn = document.querySelector(".grid");
    const productContainer = document.querySelector(".products");

    listBtn.classList.add("shadow")
    gridBtn.classList.remove("shadow")
    productContainer.classList.add("stack")
    productContainer.classList.remove("flex")
}
function displayGrid() {
    const listBtn = document.querySelector(".list");
    const gridBtn = document.querySelector(".grid");
    const productContainer = document.querySelector(".products");

    gridBtn.classList.add("shadow")
    listBtn.classList.remove("shadow")
    productContainer.classList.remove("stack")
    productContainer.classList.add("flex")
}
function thumbNext() {
    let carousell = document.querySelector("#thumbnail-inner");
    let carouselWidth = carousell.scrollWidth;
    let cardWidth = document.querySelector("#thumbnail-inner .carousel-item").offsetWidth;
 
    let scrollPosition = 0;

    if (scrollPosition < carouselWidth - cardWidth ) {
        scrollPosition += cardWidth;
        carousell.scrollTo({
            left: scrollPosition,
            behavior: "smooth"
        });
    }
}
function thumbPrev() {
    let carousell = document.querySelector("#thumbnail-inner");
    let carouselWidth = carousell.scrollWidth;
    let cardWidth = document.querySelector("#thumbnail-inner .carousel-item").offsetWidth;
 
    let scrollPosition = 0;

    if (scrollPosition < carouselWidth - cardWidth ) {
        scrollPosition -= cardWidth;
        carousell.scrollTo({
            left: scrollPosition,
            behavior: "smooth"
        });
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector("#Carousel");
    const thumbnailImage = document.querySelectorAll(".thumbImage img");
    thumbnailImage.forEach((item) => {
        item.addEventListener('click', () => {
            let bigImage = document.querySelector(".bigImage");
            let thumbUrl = item.src;
            console.log(thumbUrl);
            bigImage.src = thumbUrl;
        })
    })
});
function increaseQty() {
    let qtyInput = document.querySelector("#quantity-display");
    qtyInputValue = Number(document.querySelector("#quantity-display").value);
    qtyInputValue += 1;
    qtyInput.value = qtyInputValue;

}
function decreaseQty() {
    let qtyInput = document.querySelector("#quantity-display");
    qtyInputValue = Number(document.querySelector("#quantity-display").value);
    if (qtyInputValue > 1) {
        qtyInputValue -= 1;
        qtyInput.value = qtyInputValue;
    }
    else {
        qtyInput.value = "1";
    }

}
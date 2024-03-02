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

const baseURL = "https://tiny-puce-snail-tutu.cyclic.app/api/";

//user
function displayForm() {
    const loginForm = document.querySelector(".login")
    const signupForm = document.querySelector(".signUp")
    const buttonForm = document.querySelector(".createAcc-btn")
    const buttonForm1 = document.querySelector(".displayLog-btn")


    loginForm.style.display = "none";
    buttonForm.style.display = "none";
    buttonForm1.style.display = "block";
    signupForm.style.display = "block";
}

function displayLoginForm() {
    const loginForm = document.querySelector(".login")
    const signupForm = document.querySelector(".signUp")
    const buttonForm = document.querySelector(".displayLog-btn")
    const buttonForm1 = document.querySelector(".createAcc-btn")


    loginForm.style.display = "block";
    signupForm.style.display = "none";
    buttonForm.style.display = "none";
    buttonForm1.style.display = "block";

}

//user login
function login(event) {

    event.preventDefault();
    
    let getSpin = document.querySelector('.spin');
    getSpin.style.display = "inline-block";

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('password').value;

    if ( email === "" || password === "" ) {
        Swal.fire({
            icon: 'info',
            text: 'All fields are Required!',
            confirmButtonColor: '#bd3a3a'
        })
        getSpin.style.display = "none";
    }
    else {

        const signMethod = {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            mode: 'cors'
        }

        const url = baseURL + "user/login";

        fetch(url, signMethod)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            localStorage.setItem("user", JSON.stringify(result));

            if (result.hasOwnProperty("user")) {
                Swal.fire({
                    icon: 'success',
                    text: "Login successful!",
                    confirmButtonColor: "#bd3a3a"
                })
                setTimeout(() => {
                    location.href = "index.html"
                }, 3000)
            }
            else {
                if (result.errors.email !== ""){
                    Swal.fire({
                        icon: 'info',
                        text:  `${result.errors.email}`,
                        confirmButtonColor: "#bd3a3a"
                    })
                }
                else {
                    Swal.fire({
                        icon: 'info',
                        text:  `${result.errors.password}`,
                        confirmButtonColor: "#bd3a3a"
                    })  
                }
                getSpin.style.display = "none"
            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'info',
                text: `${error.message}`,
                confirmButtonColor: "#bd3a3a"
            })
            getSpin.style.display = "none"
        });
        
    }

}

//get Token
function getBearerToken(){
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    const bearerToken = user.token;
    return bearerToken;
}

//calling products from database
function getProducts() {
    const getModal = document.querySelector('.pagemodal');
    getModal.style.display = "block";

    const productCard = document.querySelector('.products');
    let data = [];
    const url = baseURL + "products";
    fetch(url)
    .then(response => response.json())
    .then(result => {
        if (result.length === 0) {
            getModal.style.display= "none";
            productCard.innerHTML = "<p>No Product Found</p>";
        }
        else {
            getModal.style.display= "none";
            result.map(product => {
                data += 
                `<div class="cards stack-pro">
                    <img src=${product.image[0]} class="card-img-top img-fluid" alt="product image" onclick="productdets('${product._id}')">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="sub-title">${product.code}</p>
                        <p class="card-text">${product.summary}</p>
                        <p class="price">₦${product.price}</p>
                        <div class="rating">
                            <i class="fa-regular fa-star" style="color: #fb8200;"></i>
                            <i class="fa-regular fa-star" style="color: #fb8200;"></i>
                            <i class="fa-regular fa-star" style="color: #fb8200;"></i>
                            <i class="fa-regular fa-star" style="color: #fb8200;"></i>
                            <i class="fa-regular fa-star" style="color: #fb8200;"></i>
                            <span class="ms-2">4.05</span>
                        </div>
                        <div class="btn-div mt-3">
                            <button class="wish d-flex px-4 py-3 align-items-center justify-content-center" onclick="addToWishlist('${product._id}')">
                                <i class="fa-regular fa-heart me-2"></i>
                                wishlist
                            </button>
                            <button class="cart d-flex px-4 py-3 align-items-center justify-content-center">
                                <i class="fa-solid fa-cart-shopping me-2"></i> buy now
                            </button>
                        </div>
                    </div>
                </div>`

                productCard.innerHTML = data
            })
        } 
    })
    .catch(error => console.error(error));
}

//change product views for large screens
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


function productdets(productId) {

    
    const url = `productdetails.html?productId=${encodeURIComponent(productId)}`;
    
    location.href = url
}

function productdetails() {

    const getModal = document.querySelector('.pagemodal');
    getModal.style.display = "block";
    
    const bigImg = document.querySelector('.big-image');
    const carousel = document.querySelector('.carousel-inner');
    const header = document.querySelector('div .header');
    const para = document.querySelector('.product-para');
    const price = document.querySelector('.price');

    const queryParams = new URLSearchParams(window.location.search)

    const productId = queryParams.get('productId');

    const url = baseURL + `products/${productId}`;
    fetch(url)
    .then(response => response.json())
    .then(result => {

        bigImg.innerHTML = `
        <img src=${result.image[0]} alt="product" class="bigImage img-fluid">
        `
        result.image.map((image, index) => {
            if (index === 0) {
                carousel.innerHTML += `
                <div class="carousel-item active">
                    <div class="thumbImage" onclick="imgChange()">
                        <img src=${result.image[index]} class="img-fluid w-100" id="thumbImg" alt="...">
                    </div>
                </div>`
            }
            else {
                carousel.innerHTML += `
                <div class="carousel-item">
                    <div class="thumbImage" onclick="imgChange()">
                        <img src=${result.image[index]} class="img-fluid w-100" id="thumbImg" alt="...">
                    </div>
                </div>`
            }

        })

        header.innerHTML = `<p>${result.name}</p>
        <p>${result.code}</p>`

        para.innerText = result.summary;

        price.innerText = "₦" + result.price;

        getModal.style.display = "none";
    } )
    .catch(error => console.error(error));
}

function imgChange() {
    const thumbnailImage = document.querySelectorAll(".thumbImage img");
    let bigImage = document.querySelector(".bigImage");
    thumbnailImage.forEach((item) => {
        item.addEventListener('click', () => {
            const thumbUrl = item.src;
            bigImage.src = thumbUrl;
        })
    })
}

//add product to wishlist
function addToWishlist(prodId) {

    const url = baseURL + "wishlist";
    const data = {
        "products": [
            {
                "productId": prodId
            }
        ]
    }
    const wishMethod = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getBearerToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include',
        mode: 'cors'
    }

    fetch(url, wishMethod)
    .then(response =>  response.json())
    .then(result => {
        if (result.message === "Kindly login!") {
            setTimeout(() => {
                location.href = "index.html"
            }, 3000)
        }

        if (result.msg === "Product added to wishlist!") {
            Swal.fire({
                icon: 'success',
                text: `${result.msg}`,
                confirmButtonColor: '#bd3a3a'
            })
        }
    })
    .catch(error => console.log('error', error));
}

//Get wishlist
function getWishProducts() {
    const getModal = document.querySelector('.pagemodal');
    getModal.style.display = "block";

    const productCard = document.querySelector('.products');
    let data = [];
    const url = baseURL + "wishlist";
    const token = getBearerToken()

    const getWish = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
    }
    fetch(url, getWish)
    .then(response => response.json())
    .then(result => {

        if (result.message === "Kindly login!") {
            setTimeout(() => {
                location.href = "index.html"
            }, 3000)
        }

        if (result.products.length === 0) {
            getModal.style.display= "none";
            productCard.innerHTML = "<p>No Product Found</p>";
        }
        else {
            getModal.style.display= "none";
            result.products.map(product => {
                data += 
                `<div class="cards stack-pro">
                    <img src=${product.image} class="card-img-top img-fluid" alt="product image" onclick="productdets('${product._id}')">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="sub-title">${product.code}</p>
                        <p class="card-text">${product.summary}</p>
                        <p class="price">₦${product.price}</p>
                        <div class="rating">
                            <i class="fa-regular fa-star" style="color: #fb8200;"></i>
                            <i class="fa-regular fa-star" style="color: #fb8200;"></i>
                            <i class="fa-regular fa-star" style="color: #fb8200;"></i>
                            <i class="fa-regular fa-star" style="color: #fb8200;"></i>
                            <i class="fa-regular fa-star" style="color: #fb8200;"></i>
                            <span class="ms-2">4.05</span>
                        </div>
                        <div class="btn-div mt-3">
                        <button class="cart d-flex px-4 py-3 align-items-center justify-content-center me-2" onclick="addToCart('${product._id}')">
                            <i class="fa-solid fa-cart-shopping me-2"></i> buy now
                        </button>
                            <button class="wish d-flex px-4 py-3 align-items-center justify-content-center" onclick="deleteProdWish('${product._id}')">
                                <i class="fa-solid fa-trash me-2"></i>
                                remove
                            </button>
                        </div>
                    </div>
                </div>`

                productCard.innerHTML = data
            })
        } 
    })
    .catch(error => console.error(error));
}

// remove product ffrom wishlist
function deleteProdWish(productId) {
    const url = baseURL + `wishlist/${productId}`;
    const token = getBearerToken()

    const deleteWish = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
    }

    fetch(url, deleteWish)
    .then(response => response.json())
    .then(result => {
        if (result.msg === "Product removed from wishlist!") {
            Swal.fire({
                icon: 'success',
                text: `${result.msg}`,
                confirmButtonColor: '#bd3a3a'
            })

            setTimeout(() => {
                location.href = "wishlist.html"
            }, 3000)
        }
    })
    .catch(error => console.log(error))
}

//get cart
function getCart() {
    const cartDiv = document.querySelector(".cart-details")

    const url = baseURL + "cart";
    const token = getBearerToken()
    const getCart = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
    }

    fetch(url, getCart)
    .then(response => response.json())
    .then(result => {

        if (result.msg === "Your cart is empty!" || result.message === "Kindly login!") {
            cartDiv.innerHTML = '<h3 class="cart-header mt-5 mb-4">Your cart is empty!</h3>'
        }
        // else {

        // }
    })
    .catch(error => console.log('error', error));
}





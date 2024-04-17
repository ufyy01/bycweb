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

const baseURL = "https://byc-backend.onrender.com/api/";

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
            sessionStorage.setItem("user", JSON.stringify(result));

            if (result.hasOwnProperty("user")) {
                Swal.fire({
                    icon: 'success',
                    text: "Login successful!",
                    showConfirmButton: false,
                })
                setTimeout(() => {
                    location.href = "index.html"
                }, 1000)
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
    let user = sessionStorage.getItem("user");
    user = JSON.parse(user);
    if (user) {
        const bearerToken = user.token;
        return bearerToken;
    }
    else {
        const bearerToken = '';
        return bearerToken
    }
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
                let price = product.price;
                let prodPrice = new Intl.NumberFormat('en-US');
                price = prodPrice.format(price)
                data += 
                `<div class="cards stack-pro">
                    <img src=${product.image[0]} class="card-img-top img-fluid" alt="product image" onclick="productdets('${product._id}')">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="sub-title">${product.code}</p>
                        <p class="card-text">${product.summary}</p>
                        <p class="price">₦${price}</p>
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
                            <button class="cart d-flex px-4 py-3 align-items-center justify-content-center" onclick="productdets('${product._id}')">
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
    const qtybtn = document.querySelector('.qty-button');
    const productTxt = document.querySelector('.product-text');

    const queryParams = new URLSearchParams(window.location.search)

    const productId = queryParams.get('productId');

    const url = baseURL + `products/${productId}`;

    fetch(url)
    .then(response => response.json())
    .then(result => {
        let pricee = result.price;
        let prodPrice = new Intl.NumberFormat('en-US');
        pricee = prodPrice.format(pricee)

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

        price.innerText = "₦" + pricee;

        qtybtn.innerHTML += ` <button class="wish d-flex justify-content-center align-items-center ms-lg-4 mt-lg-2 mt-4" onclick="addToWishlist('${result._id}')">
        <i class="fa-regular fa-heart me-3"></i>
        wishlist
        </button>`

        productTxt.innerHTML += `<button class="cart d-flex align-items-center mt-lg-4 my-3" onclick="addToCart('${result._id}','${result.name}','${result.code}','${result.price}','${result.summary}','${result.image[0]}')">
        <i class="fa-solid fa-cart-shopping me-3"></i>add to cart
        </button>`

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
            Swal.fire({
                icon: 'info',
                text: `${result.message}`,
                confirmButtonColor: '#bd3a3a'
            })
            setTimeout(() => {
                location.href = "user.html"
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
    const token = getBearerToken();

    if (token === '') {
        getModal.style.display= "none";

        productCard.innerHTML = '<h2 class="ms-4">Kindly Login</h2>';
        setTimeout(() => {
            location.href = "user.html"
        }, 2000)
    }
    else {
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
            if (result.products.length === 0) {
                getModal.style.display= "none";
                productCard.innerHTML = "<p>No Product Found</p>";
            }
            else {
                getModal.style.display= "none";
                result.products.map(product => {

                    let price = product.price;
                    let prodPrice = new Intl.NumberFormat('en-US');
                    price = prodPrice.format(price)

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
                            <button class="cart d-flex px-4 py-3 align-items-center justify-content-center me-2" onclick="productdets('${product._id}')">
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
    const getModal = document.querySelector('.pagemodal');
    getModal.style.display = "block";

    const cartDiv = document.querySelector(".cart-details")
    const prodDiv = document.querySelector(".product-div")
    const subTotal = document.querySelector(".subtotal-amount")
    let prodPrice = new Intl.NumberFormat('en-US');
    let totalPrice = 0

    const url = baseURL + "cart";
    const token = getBearerToken();
    
    let data = JSON.parse(sessionStorage.getItem("product"))

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
        getModal.style.display= "none";
        if (!data && result.msg === "Your cart is empty!") {
            cartDiv.innerHTML = '<h3 class="cart-header mt-5 mb-4">Your cart is empty!</h3>'
        }
        else if (result.products.length >= 1 || data.length !== 0) {
            let billingData = 0;

            if (result.products.length >= 1) {
                result.products.map(product => {

                    let price = product.price;
                    price = prodPrice.format(price)
    
                    getModal.style.display= "none";
    
                    prodDiv.innerHTML += `
                    <div class="row text-box">
                    <div class="col-sm-12 col-md-12 col-lg-2 col-xl-2">
                        <div>
                            <img src=${product.image} alt="" class="img-fluid">
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-5 col-xl-5 ms-lg-4 mt-3 mt-lg-0 check">
                        <div class="pb-lg-2">
                            <div class="header mt-2">
                                <p>${product.name}</p>
                                <p>${product.code}</p>
                            </div>
                            <p class="product-para mt-4 mb-5">${product.summary}</p>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 ms-lg-2">
                        <div class="d-lg-flex price-qty">
                            <div class="quantity check pt-2 pt-lg-0">
                                <p>quantity</p>
                                <div class="d-flex justify-content-center input-btn mt-3">
                                    <button class="px-3 py-1" onclick="updateCart('${product._id}', '${product.color}', '${product.size}', -1)"><i class="fa-solid fa-minus"></i></button>
                                    <input type="text" name="quantity-display" id="quantity-display" value=${product.quantity} readonly>
                                    <button class="px-3 py-1" onclick="updateCart('${product._id}', '${product.color}', '${product.size}', 1)"><i class="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                            <div class="unit-price mt-4 mt-lg-0">
                                <p>unit price</p>
                                <p class="price my-4 my-lg-0">₦${price}</p>
                            </div>
                        </div>
                    </div>
                    <div class="btn-div my-3">
                        <button class="wish d-flex px-4 py-3 justify-content-center align-items-center" onclick="addToWishCart('${product._id}')">
                            <i class="fa-regular fa-heart pe-1"></i>wishlist
                        </button>
                        <button class="cart-btn d-flex px-4 py-3 justify-content-center align-items-center" onclick="deleteProdCart('${result._id}','${product._id}')">
                            <i class="fa-solid fa-trash pe-1"></i>remove
                        </button>
                    </div>
                    <div class="dash my-3"></div>
                    </div>
                    `
                })
            }
            if (data) {
                data.map(product => {
                    let price = product.price;
                    price = prodPrice.format(price)
        
                    prodDiv.innerHTML += `
                    <div class="row text-box">
                        <div class="col-sm-12 col-md-12 col-lg-2 col-xl-2">
                            <div class="w-100">
                                <img src=${product.image} alt="" class="img-fluid w-100">
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-5 col-xl-5 ms-lg-4 mt-3 mt-lg-0 check">
                            <div class="pb-lg-2">
                                <div class="header mt-2">
                                    <p>${product.name}</p>
                                    <p>${product.code}</p>
                                </div>
                                <p class="product-para mt-4">${product.summary}</p>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 ms-lg-2">
                            <div class="d-lg-flex price-qty">
                                <div class="quantity check pt-2 pt-lg-0">
                                    <p>quantity</p>
                                    <div class="d-flex justify-content-center input-btn mt-3">
                                        <button class="px-3 py-1" onclick="decreaseOrd('${product._id}')"><i class="fa-solid fa-minus"></i></button>
                                        <input type="text" name="quantity-display" id="quantity-display" value=${product.quantity} readonly>
                                        <button class="px-3 py-1" onclick="increaseOrd('${product._id}')"><i class="fa-solid fa-plus"></i></button>
                                    </div>
                                </div>
                                <div class="unit-price mt-4 mt-lg-0">
                                    <p>unit price</p>
                                    <p class="price my-4 my-lg-0">₦${price}</p>
                                </div>
                            </div>
                        </div>
                        <div class="btn-div mb-2">
                            <button class="wish d-flex px-4 py-3 align-items-center justify-content-center" onclick="addToWishlist('${product._id}')">
                                <i class="fa-regular fa-heart pe-1"></i>wishlist
                            </button>
                            <button class="cart-btn d-flex px-4 py-3 align-items-center justify-content-center" onclick="deleteProdCart('${product._id}','${product._id}')">
                                <i class="fa-solid fa-trash pe-1"></i>remove
                            </button>
                        </div>
                        <div class="dash mt-5"></div>
                    </div>
                    `
                    billingData += product.priceTotal
        
                })
            }
            if (result.products.length >= 1) {
                subTotal.innerHTML = `<p class="subtotal-amount">₦<span>${result.billing + billingData}</span></p>`
            }
            else {
                subTotal.innerHTML = `<p class="subtotal-amount">₦<span>${billingData}</span></p>` 
            }
        }
    })
    .catch(error => console.log('error', error));
}

//Increasing and reducing cart quantity
function increaseOrd(prodId) {
    const quantityDets = document.querySelector('input[name="quantity-display"]').value;
    const qtyNum = +quantityDets;

    let product = JSON.parse(sessionStorage.getItem("product")) || [];

    const existingProductIndex = product.findIndex(prod => prod._id === prodId );
    if (existingProductIndex !== -1) {
        // If the product exists, update its quantity
        product[existingProductIndex].quantity = qtyNum + 1;
        product[existingProductIndex].priceTotal = product[existingProductIndex].price * product[existingProductIndex].quantity;
    }

    sessionStorage.setItem("product", JSON.stringify(product));

    setTimeout(() => {
        location.href = "cart.html"
    }, 1000)
}

function decreaseOrd(prodId) {
    const quantityDets = document.querySelector('input[name="quantity-display"]').value;
    const qtyNum = +quantityDets;

    let product = JSON.parse(sessionStorage.getItem("product")) || [];

    const existingProductIndex = product.findIndex(prod => prod._id === prodId );
    if (existingProductIndex !== -1) {
        // If the product exists, update its quantity
        if (product[existingProductIndex].quantity > 1) {
            product[existingProductIndex].quantity = qtyNum - 1;
        }
        else {
            product[existingProductIndex].quantity = 1;
        }
        product[existingProductIndex].priceTotal = product[existingProductIndex].price * product[existingProductIndex].quantity;
    }

    sessionStorage.setItem("product", JSON.stringify(product));

    setTimeout(() => {
        location.href = "cart.html"
    }, 1000)
}

//modifying cart
function updateCart(prodId, colorDets, sizeDets, num) {
    const quantityDets = document.querySelector('input[name="quantity-display"]').value;
    let qtyNum = +quantityDets;
    let finalQty = qtyNum += num

    if (finalQty === 0) {
        return finalQty = 1
    }

    const url = baseURL + "cart";
    const token = getBearerToken();

    const data = {
        products: [
            {
                productId: prodId,
                color: colorDets,
                size: sizeDets,
                quantity: finalQty
            }
        ]
    }
    const cartMethod = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include',
        mode: 'cors'
    }

    fetch(url, cartMethod)
    .then(response => response.json())
    .then(result => {
        if (result.message === "cart updated!") {
            setTimeout(() => {
                location.href = "cart.html"
            }, 1000)
        }
    })
    .catch(error => console.log('error', error));
}

//add to cart
function addToCart(prodId, prodName, prodCode, prodPrice, prodSummary, prodImage) {
    const sizeDets = document.querySelector('input[name="size"]:checked').value;
    const colorDets = document.querySelector('input[name="color"]:checked').value;
    const quantityDets = document.querySelector('input[name="quantity-display"]').value;
    const qtyNum = +quantityDets;
    const prodTotal = prodPrice * qtyNum;


    const url = baseURL + "cart";
    const token = getBearerToken();

    if (token === '') {
        let product = JSON.parse(sessionStorage.getItem("product")) || [];

        data = {
            _id: prodId,
            name: prodName,
            code: prodCode,
            price: prodPrice,
            summary: prodSummary,
            image: prodImage,
            size: sizeDets,
            color: colorDets,
            quantity: qtyNum,
            priceTotal: prodTotal
        }
        
        //Add new products to cart
        if (product.length !== 0) {
            const existingProductIndex = product.findIndex(prod => 
                prod._id === prodId && 
                prod.color === colorDets &&
                prod.size === sizeDets
            );
            if (existingProductIndex !== -1) {
                // If the product exists, update its quantity
                product[existingProductIndex].quantity = qtyNum;
                product[existingProductIndex].totalSum = qtyNum * prodPrice;
            }
            else {
                product.push(data)
            }
        }
        else {
            product.push(data)
        }

        // Add the product to the list of cart products
        sessionStorage.setItem("product", JSON.stringify(product));

        Swal.fire({
            icon: 'success',
            text: "Added to cart",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Continue Shopping",
            denyButtonText: `Proceed to checkout`,
            confirmButtonColor: '#bd3a3a'
        })
        .then((result) => {
            if (result.isConfirmed) {
                setTimeout(() => {
                    location.href = "products.html"
                }, 1000)
            } else if (result.isDenied) {
                setTimeout(() => {
                    location.href = "cart.html"
                }, 1000)
            }
            deleteProdWish(prodId)
        })
    }
    else {
        const data = {
            products: [
                {
                    productId: prodId,
                    color: colorDets,
                    size: sizeDets,
                    quantity: quantityDets
                }
            ]
        }
        const cartMethod = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include',
            mode: 'cors'
        }
    
        fetch(url, cartMethod)
        .then(response => response.json())
        .then(result => {
            if (result.message === "product added to cart!") {
                Swal.fire({
                    icon: 'success',
                    text: "Added to cart",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Continue Shopping",
                    denyButtonText: `Proceed to checkout`,
                    confirmButtonColor: '#bd3a3a'
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        setTimeout(() => {
                            location.href = "products.html"
                        }, 1000)
                    } else if (result.isDenied) {
                        setTimeout(() => {
                            location.href = "cart.html"
                        }, 1000)
                    }
                    deleteProdWish(prodId)
                })
            }
        })
        .catch(error => console.log('error', error));
    }
}

//delete product from cart
function deleteProdCart(cartId, prodId) {
    const url = baseURL + `cart/${cartId}/${prodId}`;
    const token = getBearerToken()
    let product = JSON.parse(sessionStorage.getItem("product"))

    if (product) {
        let id = product.findIndex((prod => prod._id === prodId))
        product.splice(id, 1)
        sessionStorage.setItem("product", JSON.stringify(product))
        Swal.fire({
            icon: 'success',
            text: `Product removed successfully!`,
            confirmButtonColor: '#bd3a3a'
        })
        setTimeout(() => {
            location.href = "cart.html"
        }, 1000)

    }
    else {
        const deleteCartProd = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        }
        fetch(url, deleteCartProd)
        .then(response => response.json())
        .then(result => {
            if (result.message === "Product removed from cart!") {
                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#bd3a3a'
                })
                setTimeout(() => {
                    location.href = "cart.html"
                }, 1000)
            }
        })
        .catch(error => console.log(error))
    }

}

//move to wishlist from cart
function addToWishCart(prodId) {
    const url = baseURL + `cart/to-wishlist/${prodId}`;
    const token = getBearerToken()

    const addToWishCart = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
    }
    fetch(url, addToWishCart)
    .then(response => response.json())
    .then(result => {
        if (result.message === "Product moved to wishlist!") {
            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#bd3a3a'
            })

            setTimeout(() => {
                location.href = "cart.html"
            }, 3000)
        }
    })
    .catch(error => console.log(error))
}

//Checkout signin check
function checkoutPass() {
    const token = getBearerToken();

    if (token === '') {
        setTimeout(() => {
            location.href = "user.html"
        }, 1000)
    }
    else {
        setTimeout(() => {
            location.href = "checkout.html"
        }, 1000)
    }
}

//get checkout
function checkout() {
    let data = JSON.parse(sessionStorage.getItem("product"))
    let formatPrice = new Intl.NumberFormat('en-US');
    let deliveryFee = 0;
    
    const prod = document.querySelector(".product");

    const getModal = document.querySelector('.pagemodal');
    getModal.style.display = "block";

    const url = baseURL + "order";
    const token = getBearerToken();

    if (data) {
        getModal.style.display = "none";
        data.map(product => {
            let price = product.price;
            price = formatPrice.format(price)

            let priceTotal = 0
            priceTotal += product.priceTotal
            let subtotal = formatPrice.format(priceTotal)

            prod.innerHTML += `
            <div class="row text-box">
                <div class="col-sm-12 col-md-12 col-lg-2 col-xl-2">
                    <div class="w-100">
                        <img src=${product.image} alt="" class="img-fluid w-100">
                    </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-6 col-xl-5 ms-xl-4 mt-3 mt-lg-0">
                    <div>
                        <div class="header mt-2 mt-lg-0">
                            <p>${product.name}</p>
                            <p>${product.code}</p>
                        </div>
                        <p class="product-para mt-4 mt-lg-0">${product.summary}</p>
                        <div class="unit-price mt-4 mt-lg-0">
                            <p class="price my-4">₦${price}</p>
                            <p>Quantity: <span class="ms-4">${product.quantity}</span></p>
                        </div>
                    </div>
                    <button class="cart px-4 py-3 mb-4">
                        <a href="cart.html">Modify Cart</a>
                    </button>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 cart-total-dets mt-3">
                    <div class="check2 ps-lg-3">
                        <div class="subtotal d-flex justify-content-between pe-lg-4">
                            <p>Subtotal</p>
                            <p class="subtotal-amount">₦<span>${subtotal}</span></p>
                        </div>
                        <div class="delivery d-flex justify-content-between pe-lg-4">
                            <p>delivery fee</p>
                            <p class="total-amount">₦<span>${deliveryFee}</span></p>
                        </div>
                        <div class="dash"></div>
                        <div class="total d-flex justify-content-between pe-lg-4 mt-3">
                            <p>Total</p>
                            <p class="total-amount">₦<span>${subtotal + deliveryFee}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            `
        })
    }
}
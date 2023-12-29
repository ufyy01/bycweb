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
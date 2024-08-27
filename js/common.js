// Get the button:
let topbtn = document.getElementById("topbtn");
let downbtn = document.getElementById("bottombtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        downbtn.style.display = "none";
    } else {
        downbtn.style.display = "block";
    }
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topbtn.style.display = "block";
    } else {
        topbtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function gototop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
function gotobottom() {
    document.body.scrollTop = document.body.scrollHeight; // For Safari
    document.documentElement.scrollTop = document.documentElement.scrollHeight; // For Chrome, Firefox, IE and Opera
}

function setLightTheme(html, resetbtn1, resetbtn2, resetbtn3, resetbtn4) {
    html.setAttribute("data-bs-theme", "light");
    resetbtn1.classList.replace("btn-outline-light", "btn-outline-dark");
    resetbtn2.classList.replace("btn-outline-light", "btn-outline-dark");
    resetbtn3.classList.replace("btn-outline-light", "btn-outline-dark");
    resetbtn4.classList.replace("btn-outline-light", "btn-outline-dark");
}
function setDarkTheme(html, resetbtn1, resetbtn2, resetbtn3, resetbtn4) {
    html.setAttribute("data-bs-theme", "dark");
    resetbtn1.classList.replace("btn-outline-dark", "btn-outline-light");
    resetbtn2.classList.replace("btn-outline-dark", "btn-outline-light");
    resetbtn3.classList.replace("btn-outline-dark", "btn-outline-light");
    resetbtn4.classList.replace("btn-outline-dark", "btn-outline-light");
}

// Toggle theme
function toggleTheme() {
    let select = document.getElementById("select-menu");
    let selected = select.options[select.selectedIndex].value;
    let html = document.querySelector("html");
    let resetbtn1 = document.getElementById("reset1");
    let resetbtn2 = document.getElementById("reset2");
    let resetbtn3 = document.getElementById("reset3");
    let resetbtn4 = document.getElementById("reset4");
    if (selected == "light") {
        sessionStorage.setItem("theme", "light");
        setLightTheme(html, resetbtn1, resetbtn2, resetbtn3, resetbtn4);
    } else if (selected == "dark") {
        sessionStorage.setItem("theme", "dark");
        setDarkTheme(html, resetbtn1, resetbtn2, resetbtn3, resetbtn4);
    } else {
        sessionStorage.setItem("theme", "auto");
        let date = new Date();
        let time = date.getHours();
        if (time >= 19) {
            setDarkTheme(html, resetbtn1, resetbtn2, resetbtn3, resetbtn4);
        } else {
            setLightTheme(html, resetbtn1, resetbtn2, resetbtn3, resetbtn4);
        }
    }
}

function checkTheme() {
    let theme = sessionStorage.getItem("theme");
    let html = document.querySelector("html");
    let resetbtn1 = document.getElementById("reset1");
    let resetbtn2 = document.getElementById("reset2");
    let resetbtn3 = document.getElementById("reset3");
    let resetbtn4 = document.getElementById("reset4");
    if (theme == "light") {
        document.querySelector("#select-menu").selectedIndex = 0;
        setLightTheme(html, resetbtn1, resetbtn2, resetbtn3, resetbtn4);
    } else if (theme == "dark") {
        document.querySelector("#select-menu").selectedIndex = 1;
        setDarkTheme(html, resetbtn1, resetbtn2, resetbtn3, resetbtn4);
    } else if (theme == "auto") {
        let date = new Date();
        let time = date.getHours();
        document.querySelector("#select-menu").selectedIndex = 2;
        if (time >= 19) {
            setDarkTheme(html, resetbtn1, resetbtn2, resetbtn3, resetbtn4);
        } else {
            setLightTheme(html, resetbtn1, resetbtn2, resetbtn3, resetbtn4);
        }
    }
}

window.onload = checkTheme();

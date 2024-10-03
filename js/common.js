// Get the button
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

function setLightTheme() {
    let html = document.querySelector("html");
    let thead = document.getElementById("thead");
    let lightBtns = document.querySelectorAll(".btn-outline-light");
    html.setAttribute("data-bs-theme", "light");
    try {
        if (thead) {
            thead.classList.replace("table-dark", "table-light");
        }
        lightBtns.forEach(btn => {
            btn.classList.replace("btn-outline-light", "btn-outline-dark");
        });

    } catch (error) {
        // do nothing
    }
}
function setDarkTheme() {
    let html = document.querySelector("html");
    let thead = document.getElementById("thead");
    let darkBtns = document.querySelectorAll(".btn-outline-dark");
    html.setAttribute("data-bs-theme", "dark");
    try {
        if (thead) {
            thead.classList.replace("table-light", "table-dark");
        }
        darkBtns.forEach(btn => {
            btn.classList.replace("btn-outline-dark", "btn-outline-light");
        });
    } catch (error) {
        // do nothing
    }
}

// Toggle theme
function toggleTheme() {
    let select = document.getElementById("select-menu");
    let selected = select.options[select.selectedIndex].value;

    if (selected == "light") {
        sessionStorage.setItem("theme", "light");
        setLightTheme();
    } else if (selected == "dark") {
        sessionStorage.setItem("theme", "dark");
        setDarkTheme();
    } else {
        sessionStorage.setItem("theme", "auto");
        let date = new Date();
        let time = date.getHours();
        if (time >= 19) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    }
}

function checkTheme() {
    let theme = sessionStorage.getItem("theme");
    if (theme == "light") {
        document.querySelector("#select-menu").selectedIndex = 0;
        setLightTheme();
    } else if (theme == "dark") {
        document.querySelector("#select-menu").selectedIndex = 1;
        setDarkTheme();
    } else if (theme == "auto") {
        let date = new Date();
        let time = date.getHours();
        document.querySelector("#select-menu").selectedIndex = 2;
        if (time >= 19) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    }
}

window.onload = checkTheme();

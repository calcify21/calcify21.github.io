// Go to top and bottom buttons
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

function gototop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function gotobottom() {
    document.body.scrollTop = document.body.scrollHeight; // For Safari
    document.documentElement.scrollTop = document.documentElement.scrollHeight; // For Chrome, Firefox, IE and Opera
}

// Change buttons from light to dark backgrounds and vice versa on theme change
function setLightTheme() {
    let html = document.querySelector("html");
    let thead = document.getElementById("thead");
    let lightBtns = document.querySelectorAll(".btn-outline-light");
    let operationKeys = document.querySelectorAll(".calc-operate");

    html.setAttribute("data-bs-theme", "light");

    try {
        if (thead) {
            thead.classList.replace("table-dark", "table-light");
        }
        if (operationKeys) {
            operationKeys.forEach(key => {
                key.classList.add("bg-success-subtle")
            });
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
    let operationKeys = document.querySelectorAll(".calc-operate");

    html.setAttribute("data-bs-theme", "dark");

    try {
        if (thead) {
            thead.classList.replace("table-light", "table-dark");
        }
        if (operationKeys) {
            operationKeys.forEach(key => {
                key.classList.remove("bg-success-subtle")
                key.style.backgroundColor = "#a6a6a6";
            });
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

// Navbar Collapse Functionality
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar");
    const navbarCollapse = document.querySelector("#navbarSupportedContent");
    const mainElement = document.querySelector("main");

    // When the menu is expanded
    navbarCollapse.addEventListener("show.bs.collapse", function () {
        navbar.style.height = "auto"; // Adjust to fit content

        // Check the screen width and apply corresponding margin
        if (window.innerWidth <= 520) {
            mainElement.style.marginTop = "220px";
        } else if (window.innerWidth <= 991) {
            mainElement.style.marginTop = "150px";
        } else {
            mainElement.style.marginTop = "70px"; // Default margin for larger screens
        }


    });

    // When the menu is collapsed
    navbarCollapse.addEventListener("hidden.bs.collapse", function () {
        navbar.style.height = "70px"; // Default collapsed height

        mainElement.style.marginTop = "70px"; // Reset margin when collapsed


    });

    window.addEventListener("resize", function () {
        navbarCollapse.addEventListener("show.bs.collapse", function () {
            // Check the screen width and apply corresponding margin
            if (window.innerWidth <= 520) {
                mainElement.style.marginTop = "220px";
            } else if (window.innerWidth <= 991) {
                mainElement.style.marginTop = "150px";
            } else {
                mainElement.style.marginTop = "70px"; // Default margin for larger screens
            }
        });
        navbarCollapse.addEventListener("hidden.bs.collapse", function () {
            navbar.style.height = "70px"; // Default collapsed height

            mainElement.style.marginTop = "70px"; // Reset margin when collapsed


        });
    });
});
// common.js

// Install Calcify button
let deferredPrompt;
const installBtn = document.getElementById("installAppBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Show the button in the DOM
  installBtn.classList.remove("d-none");

  // Step 1: Pop the button in
  setTimeout(() => {
    installBtn.classList.add("animate-install-ready");
  }, 500);

  // Step 2: Start the light-sweep shimmer after it's visible
  setTimeout(() => {
    installBtn.classList.add("shimmer-loop");
  }, 1200);

  installBtn.addEventListener("click", () => {
    // Immediate feedback: shrink the button slightly on click
    installBtn.style.transform = "scale(0.9)";

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        installBtn.classList.add("d-none");
      } else {
        installBtn.style.transform = "scale(1)"; // Reset if they cancel
      }
      deferredPrompt = null;
    });
  });
});

// * Go to top and bottom buttons (improved version)
const topBtn = document.getElementById("topbtn");
const bottomBtn = document.getElementById("bottombtn");
const progressBar = document.getElementById("myBar");

let isScrolling = false;

window.addEventListener("scroll", () => {
  // This prevents the code from running too often
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      handleScrollEffects();
      isScrolling = false;
    });
    isScrolling = true;
  }
});

function handleScrollEffects() {
  const winScroll = window.pageYOffset || document.documentElement.scrollTop;
  const totalHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  // Calculate percentage once
  const scrolled = (winScroll / totalHeight) * 100;

  // 1. Update Progress Bar width smoothly
  progressBar.style.width = scrolled + "%";

  // 2. Optimized Toggle Logic (Prevents unnecessary DOM updates)
  if (winScroll > 150) {
    if (!topBtn.classList.contains("show-btn"))
      topBtn.classList.add("show-btn");
  } else {
    if (topBtn.classList.contains("show-btn"))
      topBtn.classList.remove("show-btn");
  }

  if (scrolled > 98) {
    if (bottomBtn.classList.contains("show-btn"))
      bottomBtn.classList.remove("show-btn");
  } else {
    if (!bottomBtn.classList.contains("show-btn"))
      bottomBtn.classList.add("show-btn");
  }
}

// Global functions for buttons
function gototop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function gotobottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
}

// Initial check
handleScrollEffects();

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
      operationKeys.forEach((key) => {
        key.classList.add("bg-success-subtle");
      });
    }
    lightBtns.forEach((btn) => {
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
      operationKeys.forEach((key) => {
        key.classList.remove("bg-success-subtle");
        key.style.backgroundColor = "#a6a6a6";
      });
    }
    darkBtns.forEach((btn) => {
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

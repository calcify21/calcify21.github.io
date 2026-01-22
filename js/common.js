// common.js

// Install Calcify button
let deferredPrompt;
const installBtn = document.getElementById("installAppBtn");
const apkFallbackBtn = document.getElementById("downloadApkFallback");
const dropdownApkItem = document.getElementById("dropdownApkItem");

function triggerAnims(el) {
  el.classList.remove("d-none");
  // Force a tiny delay so the browser notices the d-none is gone before animating
  setTimeout(() => el.classList.add("animate-install-ready"), 50);
  setTimeout(() => el.classList.add("shimmer-loop"), 800);
}

// Case for Chrome/Edge (PWA Available)
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Chrome PWA logic
  apkFallbackBtn.classList.add("d-none");
  dropdownApkItem.classList.remove("d-none");
  triggerAnims(installBtn);
});

window.addEventListener("load", () => {
  const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // Wait 1 second to see if Chrome fired the PWA prompt
  setTimeout(() => {
    // If Firefox, Safari, OR Chrome (but app is already installed/not eligible)
    if (isFirefox || isSafari || installBtn.classList.contains("d-none")) {
      // Hide the Chrome-specific PWA button and arrow
      installBtn.classList.add("d-none");
      if (dropdownApkItem) dropdownApkItem.classList.add("d-none");

      // Show the APK button as the main action
      triggerAnims(apkFallbackBtn);
    }
  }, 1000);
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

async function injectComponents() {
  const components = document.querySelectorAll("[data-load]");

  for (let el of components) {
    const file = el.getAttribute("data-load");
    try {
      const response = await fetch(file);
      if (response.ok) {
        el.innerHTML = await response.text();

        // Once Navbar is loaded, set the active class
        if (file.includes("navbar")) {
          const currentPath = window.location.pathname;
          const navLinks = el.querySelectorAll(".nav-link");

          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            // Logic to match /contact or /contact.html
            if (
              currentPath === href ||
              (currentPath.includes(href) && href !== "/")
            ) {
              link.classList.add("active");
            } else if (currentPath === "/" && href === "/") {
              link.classList.add("active");
            }
          });
        }
      }
    } catch (err) {
      console.error("Error loading component:", err);
    }
  }
}

// Run on page load
window.addEventListener("DOMContentLoaded", injectComponents);

window.onload = checkTheme();

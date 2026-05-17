// ── Central Tools Configuration (Source of Truth) ──
const TOOLS_DATA = [
  // ══ Mathematical Tools ══
  {
    id: "graphing",
    title: "Graphing Calculator",
    path: "/graphing",
    category: "math",
    icon: "fa-chart-line",
    desc: "Visualize math equations in real-time with an interactive 2D graphing system.",
    badge: "Popular",
    keywords: "math graph geometry function equation plotter 2d",
    starId: "starGraphing",
  },
  {
    id: "unit",
    title: "Unit Converter",
    path: "/unit",
    category: "converters",
    icon: "fa-ruler-combined",
    desc: "Convert length, weight, area, volume, temperature, and more between metric & imperial systems.",
    badge: "Popular",
    keywords:
      "converters unit metric imperial length weight volume area temperature",
    starId: "starUnit",
  },
  {
    id: "prime",
    title: "Prime Number Checker",
    path: "/prime",
    category: "math",
    icon: "fa-hashtag",
    desc: "Quickly test if a number is prime, view prime factors, and discover adjacent primes.",
    badge: null,
    keywords: "math prime number factor factorization check checker division",
    starId: "starPrime",
  },
  {
    id: "percentage",
    title: "Percentage Calculator",
    path: "/percentage",
    category: "math",
    icon: "fa-percent",
    desc: "Compute simple percentages, absolute changes, markups, discounts, and visual relative ratios.",
    badge: null,
    keywords:
      "math percent percentage discount margin markup fraction math utilities",
    starId: "starPercent",
  },
  {
    id: "mean",
    title: "Central Tendency",
    path: "/mean",
    category: "math",
    icon: "fa-calculator",
    desc: "Calculate the Mean, Median, Mode, Range, and standard statistical metrics of a dataset.",
    badge: null,
    keywords:
      "math statistics central tendency mean median mode range dataset average",
    starId: "starCentralTendancy",
  },
  {
    id: "area",
    title: "Area Calculator",
    path: "/area",
    category: "math",
    icon: "fa-shapes",
    desc: "Determine the area, perimeter, and surface properties of standard geometric shapes.",
    badge: null,
    keywords:
      "math geometry area perimeter shape circle triangle square rectangle",
    starId: "starArea",
  },

  // ══ Web & Developer Utilities ══
  {
    id: "currency",
    title: "Currency Converter",
    path: "/currency",
    category: "converters",
    icon: "fa-money-bill-transfer",
    desc: "Check live currency exchange rates and convert international currencies in real-time.",
    badge: "Popular",
    keywords: "converters currency exchange money rates international",
    starId: "starCurrency",
  },
  {
    id: "color",
    title: "Color Converter",
    path: "/color",
    category: "converters",
    icon: "fa-palette",
    desc: "Convert colors seamlessly between HEX, RGB, HSL, and CMYK formats with visual previews.",
    badge: null,
    keywords: "converters color design hex rgb hsl cmyk palette CSS",
    starId: "starColor",
  },
  {
    id: "programmer",
    title: "Programmer Calc",
    path: "/programmer",
    category: "converters",
    icon: "fa-code",
    desc: "Perform arithmetic & bitwise operations across Binary, Octal, Decimal, and Hexadecimal bases.",
    badge: null,
    keywords:
      "converters programmer binary hex octal decimal bitwise computer science",
    starId: "starProgrammer",
  },
  {
    id: "text",
    title: "Text Utilities",
    path: "/text",
    category: "productivity",
    icon: "fa-font",
    desc: "Analyze character counts, clean formatting, manipulate text case, and extract patterns.",
    badge: null,
    keywords:
      "productivity text string case counter trim spacing clean regex words",
    starId: "starText",
  },
  {
    id: "pwd",
    title: "Password Generator",
    path: "/pwd",
    category: "productivity",
    icon: "fa-key",
    desc: "Generate cryptographically secure, randomized passwords with customizable complexity.",
    badge: null,
    keywords: "productivity password security random generator crypto strong",
    starId: "starPwd",
  },
  {
    id: "qr",
    title: "QR Generator",
    path: "/qr",
    category: "productivity",
    icon: "fa-qrcode",
    desc: "Generate instantly downloadable QR codes for websites, WiFi networks, text, or emails.",
    badge: null,
    keywords: "productivity qr code generator download link sharing wifi",
    starId: "starQR",
  },

  // ══ Lifestyle Apps ══
  {
    id: "age",
    title: "Age Calculator",
    path: "/age",
    category: "lifestyle",
    icon: "fa-cake-candles",
    desc: "Find your precise age in years, months, weeks, and days, and track your next birthday.",
    badge: null,
    keywords:
      "games lifestyle age birthday date time duration years months days",
    starId: "starAge",
  },
  {
    id: "recipe",
    title: "Recipe Hub",
    path: "/recipe",
    category: "lifestyle",
    icon: "fa-bowl-food",
    desc: "Scale recipe ingredient portions dynamically to match any guest list size without math.",
    badge: null,
    keywords: "lifestyle recipe portions cook scale ingredients kitchen",
    starId: "starRecipe",
  },
  {
    id: "game",
    title: "Family Spy Party",
    path: "/game",
    category: "games",
    icon: "fa-user-secret",
    desc: "Generate local multiplayer secret roles for the ultimate spy deduction party game.",
    badge: "New",
    keywords: "games party spy secret agent role deduction multiplayer",
    starId: "starGame",
  },
  {
    id: "wordle",
    title: "Wordle Game",
    path: "/wordle",
    category: "games",
    icon: "fa-gamepad",
    desc: "Play Wordle — guess the 5-letter word in 6 tries. A daily puzzle game!",
    badge: "New",
    keywords: "games wordle daily puzzle guess letters words brain",
    starId: "starWordle",
  },

  // ══ Health & Fitness Tools ══
  {
    id: "bmi",
    title: "BMI Calculator",
    path: "/bmi",
    category: "health",
    icon: "fa-weight-scale",
    desc: "Calculate your Body Mass Index and see your health category instantly.",
    badge: "New",
    keywords: "health fitness bmi body mass index weight height",
    starId: "starBMI",
  },
  {
    id: "bodyfat",
    title: "Body Fat Calculator",
    path: "/bodyfat",
    category: "health",
    icon: "fa-child-reaching",
    desc: "Estimate your body fat percentage using the US Navy Fitness Formula.",
    badge: "New",
    keywords: "health fitness body fat percentage navy formula",
    starId: "starBodyFat",
  },
  {
    id: "calories",
    title: "Calorie Needs",
    path: "/calories",
    category: "health",
    icon: "fa-fire",
    desc: "Determine your daily calorie needs for maintenance, weight loss, or gain.",
    badge: "New",
    keywords: "health fitness calories bmr maintenance weight loss gain",
    starId: "starCalories",
  },

  // ══ Educational Resources ══
  {
    id: "ncert",
    title: "NCERT E-book Hub",
    path: "/ncert",
    category: "edu",
    icon: "fa-graduation-cap",
    desc: "Access digital versions of NCERT textbooks for classes 9-12 in one centralized location.",
    badge: "Featured",
    keywords: "school books study class 9 10 11 12",
    starId: "starNcert",
  },
];
window.TOOLS_DATA = TOOLS_DATA;

// ── Central Category Configuration (Source of Truth) ──
const CATEGORIES = [
  { key: "math", label: "Math & Science", icon: "fa-calculator" },
  { key: "converters", label: "Converters", icon: "fa-arrows-left-right" },
  { key: "productivity", label: "Productivity", icon: "fa-bolt" },
  { key: "health", label: "Health & Fitness", icon: "fa-heart-pulse" },
  { key: "lifestyle", label: "Lifestyle", icon: "fa-utensils" },
  { key: "games", label: "Games", icon: "fa-gamepad" },
  { key: "edu", label: "Education", icon: "fa-book-open-reader" },
];
window.CATEGORIES = CATEGORIES;

// ── Global Component Assets ──
(function () {
  if (!document.querySelector('link[href*="custom-components.css"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/custom-components.css";
    document.head.appendChild(link);
  }
  if (!document.querySelector('script[src*="custom-components.js"]')) {
    const script = document.createElement("script");
    script.src = "js/custom-components.js";
    document.body.appendChild(script);
  }
})();

// ── PWA Install Prompt ──
let deferredPrompt;

function getInstallElements() {
  return {
    installBtn: document.getElementById("installAppBtn"),
    apkFallbackBtn: document.getElementById("downloadApkFallback"),
    dropdownApkItem: document.getElementById("dropdownApkItem"),
  };
}

function triggerAnims(el) {
  if (!el) return;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("animate-install-ready"), 50);
  setTimeout(() => el.classList.add("shimmer-loop"), 800);
}

// Case for Chrome/Edge (PWA Available)
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const { installBtn, apkFallbackBtn, dropdownApkItem } = getInstallElements();
  if (installBtn && apkFallbackBtn && dropdownApkItem) {
    apkFallbackBtn.classList.add("hidden");
    if (dropdownApkItem) dropdownApkItem.classList.remove("hidden");
    triggerAnims(installBtn);

    installBtn.onclick = async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
      }
    };
  }
});

function initInstallButton() {
  const { installBtn, apkFallbackBtn, dropdownApkItem } = getInstallElements();
  if (!installBtn) return;

  // 1. Check if we already have a deferred prompt waiting
  if (deferredPrompt) {
    apkFallbackBtn.classList.add("hidden");
    if (dropdownApkItem) dropdownApkItem.classList.remove("hidden");
    triggerAnims(installBtn);

    installBtn.onclick = async () => {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;
    };
    return;
  }

  // 2. Logic for Non-PWA browsers (Firefox/Safari) or if installed
  const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  setTimeout(() => {
    if (
      !deferredPrompt &&
      (isFirefox || isSafari || installBtn.classList.contains("hidden"))
    ) {
      installBtn.classList.add("hidden");
      if (dropdownApkItem) dropdownApkItem.classList.add("hidden");
      triggerAnims(apkFallbackBtn);
    }
  }, 1000);
}

// ── Scroll Buttons & Progress Bar ──
const topBtn = document.getElementById("topbtn");
const bottomBtn = document.getElementById("bottombtn");
const progressBar = document.getElementById("myBar");

let isScrolling = false;

window.addEventListener("scroll", () => {
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

  const scrolled = (winScroll / totalHeight) * 100;

  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }

  if (topBtn) {
    if (winScroll > 150) {
      if (!topBtn.classList.contains("show-btn"))
        topBtn.classList.add("show-btn");
    } else {
      if (topBtn.classList.contains("show-btn"))
        topBtn.classList.remove("show-btn");
    }
  }

  if (bottomBtn) {
    if (scrolled > 98) {
      if (bottomBtn.classList.contains("show-btn"))
        bottomBtn.classList.remove("show-btn");
    } else {
      if (!bottomBtn.classList.contains("show-btn"))
        bottomBtn.classList.add("show-btn");
    }
  }
}

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

// ── Theme System ──

function setLightTheme() {
  const html = document.documentElement;
  html.setAttribute("data-theme", "light");

  // Update calculator operator keys if present
  const operationKeys = document.querySelectorAll(".calc-operate");
  if (operationKeys.length) {
    operationKeys.forEach((key) => {
      key.style.backgroundColor = "";
      key.classList.add("op-key-light");
      key.classList.remove("op-key-dark");
    });
  }

  // Update table header if present
  const thead = document.getElementById("thead");
  if (thead) {
    thead.classList.add("thead-light");
    thead.classList.remove("thead-dark");
  }
}

function setDarkTheme() {
  const html = document.documentElement;
  html.setAttribute("data-theme", "dark");

  const operationKeys = document.querySelectorAll(".calc-operate");
  if (operationKeys.length) {
    operationKeys.forEach((key) => {
      key.classList.add("op-key-dark");
      key.classList.remove("op-key-light");
    });
  }

  const thead = document.getElementById("thead");
  if (thead) {
    thead.classList.add("thead-dark");
    thead.classList.remove("thead-light");
  }
}

function setThemeOption(selected) {
  if (!selected) return;
  localStorage.setItem("theme", selected);

  if (selected === "light") {
    setLightTheme();
  } else if (selected === "dark") {
    setDarkTheme();
  } else {
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 7) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }

  updateThemeSelectorUI(selected);
}

function updateThemeSelectorUI(theme) {
  // Update Desktop Segmented Switch
  document
    .querySelectorAll("#theme-switch-desktop .theme-switch-btn")
    .forEach((btn) => {
      btn.classList.remove("active");
    });
  const activeDesktopBtn = document.getElementById(`theme-desktop-${theme}`);
  if (activeDesktopBtn) activeDesktopBtn.classList.add("active");

  // Update Mobile Segmented Switch
  document
    .querySelectorAll("#theme-switch-mobile .theme-switch-btn")
    .forEach((btn) => {
      btn.classList.remove("active");
    });
  const activeMobileBtn = document.getElementById(`theme-mobile-${theme}`);
  if (activeMobileBtn) activeMobileBtn.classList.add("active");
}

function toggleTheme(el) {
  const selected = el ? el.value : "auto";
  setThemeOption(selected);
}

function checkTheme() {
  const theme = localStorage.getItem("theme") || "auto";

  if (theme === "light") {
    setLightTheme();
  } else if (theme === "dark") {
    setDarkTheme();
  } else if (theme === "auto") {
    const hour = new Date().getHours();
    if (hour >= 19 || hour < 7) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }

  updateThemeSelectorUI(theme);
}

// ── Component Injection ──

function renderMobileNavLinks(navbarEl) {
  const drawerContainer = navbarEl.querySelector("#drawer-categories");
  if (!drawerContainer || !window.CATEGORIES) return;

  // Build category buttons dynamically from central CATEGORIES config
  drawerContainer.innerHTML = "";
  CATEGORIES.forEach((cat) => {
    const item = document.createElement("div");
    item.className = "nav-category-item";
    item.innerHTML = `
      <button class="nav-category-btn" onclick="toggleNavCategory('cat-${cat.key}')">
        <span class="flex items-center gap-3">
          <i class="fa-solid ${cat.icon} w-5 text-center opacity-60"></i>
          ${cat.label}
        </span>
        <i class="fa-solid fa-chevron-right nav-category-icon" id="cat-${cat.key}-icon"></i>
      </button>
      <div class="nav-category-content" id="cat-${cat.key}"></div>
    `;
    drawerContainer.appendChild(item);
  });

  // Populate tool links into their category containers
  TOOLS_DATA.forEach((tool) => {
    const container = navbarEl.querySelector(`#cat-${tool.category}`);
    if (container) {
      const link = document.createElement("a");
      link.href = tool.path;
      link.className = "nav-sub-link";
      link.setAttribute("onclick", "closeMobileNav()");
      link.innerHTML = `<i class="fa-solid ${tool.icon} text-xs opacity-40"></i> ${tool.title}`;
      container.appendChild(link);
    }
  });
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
          renderMobileNavLinks(el);
          const currentPath = window.location.pathname;
          const navLinks = el.querySelectorAll(".nav-link-custom");

          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
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

// ── Mobile Nav Toggle ──

function toggleMobileNav() {
  const overlay = document.getElementById("mobileNavOverlay");
  const drawer = document.getElementById("mobileNavDrawer");
  if (overlay && drawer) {
    overlay.classList.toggle("open");
    drawer.classList.toggle("open");
    document.body.style.overflow = drawer.classList.contains("open")
      ? "hidden"
      : "";
  }
}

function closeMobileNav() {
  const overlay = document.getElementById("mobileNavOverlay");
  const drawer = document.getElementById("mobileNavDrawer");
  if (overlay && drawer) {
    overlay.classList.remove("open");
    drawer.classList.remove("open");
    document.body.style.overflow = "";
  }
}

function toggleNavCategory(categoryId) {
  const category = document.getElementById(categoryId);
  const icon = document.getElementById(categoryId + "-icon");
  if (category) {
    const isOpen = category.classList.contains("open");

    // Close all other categories (Optional: Accordion behavior)
    document.querySelectorAll(".nav-category-content").forEach((el) => {
      el.classList.remove("open");
      el.style.maxHeight = null;
    });
    document.querySelectorAll(".nav-category-icon").forEach((el) => {
      el.style.transform = "rotate(0deg)";
    });

    if (!isOpen) {
      category.classList.add("open");
      category.style.maxHeight = category.scrollHeight + "px";
      if (icon) icon.style.transform = "rotate(90deg)";
    }
  }
}

// ── DOMContentLoaded ──

window.addEventListener("DOMContentLoaded", async () => {
  await injectComponents();
  if (typeof initInstallButton === "function") {
    initInstallButton();
  }
  checkTheme();
});

// ============================================================
// PWA FEATURES: Wake Lock & Web Share
// ============================================================

// 1. Wake Lock API (Keep Screen On)
let wakeLock = null;

async function requestWakeLock() {
  try {
    if ("wakeLock" in navigator) {
      wakeLock = await navigator.wakeLock.request("screen");
      console.log("Wake Lock is active!");

      document.addEventListener("visibilitychange", async () => {
        if (wakeLock !== null && document.visibilityState === "visible") {
          wakeLock = await navigator.wakeLock.request("screen");
        }
      });
    } else {
      console.warn("Wake Lock not supported on this device.");
    }
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
}

async function releaseWakeLock() {
  if (wakeLock !== null) {
    await wakeLock.release();
    wakeLock = null;
    console.log("Wake Lock released.");
  }
}

// ============================================================
// TOAST NOTIFICATIONS (Custom — no Bootstrap)
// ============================================================

function showToast(message, type = "info") {
  // 1. Find or Create Container
  let container = document.querySelector(".toast-container-custom");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container-custom";
    document.body.appendChild(container);
  }

  // Map Bootstrap-style types to our types
  const typeMap = {
    "text-bg-primary": "info",
    "text-bg-success": "success",
    "text-bg-danger": "error",
    "text-bg-warning": "warning",
    info: "info",
    success: "success",
    error: "error",
    warning: "warning",
  };
  const toastType = typeMap[type] || "info";

  // 2. Create Toast Element
  const toastEl = document.createElement("div");
  toastEl.className = `toast-custom toast-${toastType}`;
  toastEl.innerHTML = `
    <span>${message}</span>
    <button class="toast-close" onclick="this.parentElement.classList.add('toast-out'); setTimeout(() => this.parentElement.remove(), 200);">&times;</button>
  `;

  // 3. Append & auto-dismiss
  container.appendChild(toastEl);

  setTimeout(() => {
    toastEl.classList.add("toast-out");
    setTimeout(() => toastEl.remove(), 200);
  }, 4000);
}

// ============================================================
// WEB SHARE API
// ============================================================

async function shareContent(title, text, url) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return true;
    } catch (error) {
      console.error("Error sharing:", error);
      return false;
    }
  } else {
    console.warn("Web Share API not supported.");
    showToast("Sharing is not supported on this browser.", "error");
    return false;
  }
}

async function shareImage(blob, fileName, title, text) {
  if (navigator.share && navigator.canShare) {
    try {
      const file = new File([blob], fileName, { type: blob.type });
      const data = { files: [file], title, text };

      if (navigator.canShare(data)) {
        await navigator.share(data);
        return true;
      } else {
        console.warn("navigator.canShare(data) returned false");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
      showToast("Error sharing image: " + error.message, "error");
      return false;
    }
  }

  console.warn("Sharing not supported or failed canShare check");
  showToast("Sharing this image is not supported on this browser.", "error");
  return false;
}

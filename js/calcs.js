// ============================================================
// CALCS.JS — Tool directory logic (Favourites + Search)
// Rewritten: no Bootstrap dependency. Uses custom toast & "hidden" class.
// ============================================================

// Global Star Map Configuration built dynamically from central tools data
const STAR_MAP = {};
if (window.TOOLS_DATA) {
  window.TOOLS_DATA.forEach(tool => {
    STAR_MAP[tool.id] = tool.starId;
  });
}

function renderToolCards() {
  const wrapper = document.getElementById("tool-categories");
  if (!wrapper || !window.CATEGORIES || !window.TOOLS_DATA) return;

  // Build category sections dynamically from central CATEGORIES config
  wrapper.innerHTML = "";
  window.CATEGORIES.forEach((cat, i) => {
    const stagger = i === 0 ? "" : `stagger-${i}`;
    const section = document.createElement("div");
    section.className = `category-section mb-12 animate-fade-in-up ${stagger}`.trim();
    section.innerHTML = `
      <h6 class="category-header">
        <i class="fa-solid ${cat.icon}"></i>
        <span>${cat.label}</span>
      </h6>
      <div class="tool-grid" id="grid-${cat.key}"></div>
    `;
    wrapper.appendChild(section);
  });

  // Populate tool cards into their category grids
  window.TOOLS_DATA.forEach(tool => {
    const container = wrapper.querySelector(`#grid-${tool.category}`);
    if (container) {
      const card = document.createElement("div");
      card.className = "tool-card group";
      card.setAttribute("data-keywords", tool.keywords);

      let badgeHtml = "";
      if (tool.badge) {
        let badgeClass = "badge-new";
        if (tool.badge.toLowerCase() === "featured") badgeClass = "badge-featured";
        if (tool.badge.toLowerCase() === "popular") badgeClass = "badge-popular";
        badgeHtml = `<div class="tool-badge ${badgeClass}">${tool.badge}</div>`;
      }

      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const isFav = favorites.includes(tool.id);
      const starClass = isFav ? "fa-solid" : "fa-regular";
      const starColorStyle = isFav ? 'style="color: #FFD43B;"' : "";

      card.innerHTML = `
        ${badgeHtml}
        <div class="tool-icon-wrapper">
          <i class="fa-solid ${tool.icon}"></i>
        </div>
        <div class="tool-title-row">
          <a href="${tool.path}" class="tool-name">${tool.title}</a>
          <button type="button" class="star-btn" onclick="toggleFav('${tool.id}'); addToFavorites('${tool.id}');">
            <i class="${starClass} fa-star" id="${tool.starId}" ${starColorStyle}></i>
          </button>
        </div>
        <p class="tool-desc">${tool.desc}</p>
        <a href="${tool.path}" class="tool-open-link">
          <span>${tool.category === "edu" ? "View Books" : "Launch Tool"}</span>
          <i class="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
        </a>
      `;
      container.appendChild(card);
    }
  });
}

function toggleFav(calcName) {
  const starId = STAR_MAP[calcName];
  if (starId) {
    const starEl = document.getElementById(starId);
    if (starEl) fav(starEl, calcName);
  }
}

function fav(star, calcName) {
  const html = document.documentElement;
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const isDark = html.getAttribute("data-theme") === "dark";

  if (!favorites.includes(calcName)) {
    star.classList.replace("fa-regular", "fa-solid");
    star.style.color = "#FFD43B";
  } else {
    star.classList.replace("fa-solid", "fa-regular");
    star.style.color = isDark ? "#94a3b8" : "#475569";
  }
}

function addToFavorites(calculatorId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(calculatorId)) {
    favorites.push(calculatorId);
  } else {
    favorites.splice(favorites.indexOf(calculatorId), 1);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function checkFav() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.forEach(checkCalc);
}

function checkCalc(calcName) {
  const starId = STAR_MAP[calcName];
  if (starId) {
    const star = document.getElementById(starId);
    if (star) {
      star.classList.replace("fa-regular", "fa-solid");
      star.style.color = "#FFD43B";
    }
  }
}

function removeAllFavorites() {
  localStorage.removeItem("favorites");
  const stars = document.querySelectorAll(".fa-star");
  stars.forEach((star) => {
    star.classList.replace("fa-solid", "fa-regular");
    star.style.color = "";
  });
}

// Toast trigger for "Clear Favourites"
const toastTrigger = document.getElementById("removeFavoritesBtn");
if (toastTrigger) {
  toastTrigger.addEventListener("click", () => {
    if (typeof showToast === "function") {
      showToast("Favorites cleared!", "warning");
    }
  });
}

// Render tool cards dynamically and restore favorites states
renderToolCards();
checkFav();

// ── Search / Filter Logic ──
document.getElementById("toolSearch").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase().trim();
  const toolItems = document.querySelectorAll(".tool-card");
  const categories = document.querySelectorAll(".category-section");
  const noResults = document.getElementById("noResults");
  const serviceTitle = document.querySelector("#exploreTextParent");
  let totalVisible = 0;

  toolItems.forEach((item) => {
    const text = item.innerText.toLowerCase();
    const keywords = item.getAttribute("data-keywords") || "";
    const searchable = text + " " + keywords.toLowerCase();

    if (searchable.includes(searchTerm)) {
      item.classList.remove("hidden");
      item.style.display = "";
      totalVisible++;
    } else {
      item.classList.add("hidden");
      item.style.display = "none";
    }
  });

  // Hide/Show Category Headers
  categories.forEach((cat) => {
    const visibleInCat = cat.querySelectorAll(".tool-card:not(.hidden)").length;
    cat.style.display = visibleInCat > 0 ? "block" : "none";
  });

  // Handle "No Results" visibility
  if (searchTerm === "") {
    // Empty search — show everything normally
    noResults.style.display = "none";
    categories.forEach((cat) => (cat.style.display = "block"));
    toolItems.forEach((item) => {
      item.classList.remove("hidden");
      item.style.display = "";
    });
  } else if (totalVisible === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
});

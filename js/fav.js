// ============================================================
// FAV.JS — Favorites page logic
// Refactored: uses custom showToast, generates custom HTML
// ============================================================

function loadFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites"));
  let container = document.getElementById("favorites-container");
  let removeAllBtn = document.getElementById("removeFavoritesBtn");
  if (favorites == undefined || favorites.length == 0) {
    container.innerHTML = `
      <div class="fav-empty-state" role="alert">
        <div class="fav-empty-icon-wrapper">
          <i class="fa-regular fa-star"></i>
        </div>
        <h3 class="fav-empty-title">Your collection is empty</h3>
        <p class="fav-empty-subtitle">
          Bookmark your most-used calculators and developer tools for instant access in one place.
        </p>
        <a href="/calcs" class="btn-primary-custom">
          <i class="fa-solid fa-compass"></i>
          <span>Explore Tools</span>
        </a>
      </div>
    `;
    if (removeAllBtn) removeAllBtn.style.display = "none";
  } else {
    container.innerHTML = "";
    favorites.forEach((id) => {
      let calculatorHtml = generateCalculatorHtml(id);
      container.innerHTML += calculatorHtml;
    });
  }
}

function generateCalculatorHtml(id) {
  let title = id;
  let text = "";
  let path = `/${id}`;

  if (window.TOOLS_DATA) {
    const tool = window.TOOLS_DATA.find(t => t.id === id);
    if (tool) {
      title = tool.title;
      text = tool.desc;
      path = tool.path;
    }
  }

  return `<li class="fav-item">
    <div class="mr-4">
        <div class="fav-title">${title}</div>
        <small class="fav-desc">${text}</small>
    </div>
    <a href="${path}" class="fav-open">Open</a>
  </li>`;
}

function removeAllFavorites() {
  localStorage.removeItem("favorites");
  loadFavorites();
}

const toastTrigger = document.getElementById("removeFavoritesBtn");

if (toastTrigger) {
  toastTrigger.addEventListener("click", () => {
    if (typeof showToast === "function") {
      showToast("Favorites cleared!", "warning");
    }
  });
}

window.onload = loadFavorites();

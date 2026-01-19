function loadFavorites() {
  let favorites = JSON.parse(localStorage.getItem("favorites"));
  let container = document.getElementById("favorites-container");
  let removeAllBtn = document.getElementById("removeFavoritesBtn");
  if (favorites == undefined || favorites.length == 0) {
    container.innerHTML =
      '<div class="text-center alert alert-warning" role="alert">You do not have any favorite calculators yet. Click on the star icon on the <a href="calcs.html" class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">calculators page</a> to add a calculator to your list.</div>';
    removeAllBtn.style.display = "none";
  } else {
    favorites.forEach((id) => {
      let calculatorHtml = generateCalculatorHtml(id);
      container.innerHTML += calculatorHtml;
    });
  }
}

function generateCalculatorHtml(id) {
  let title = "";
  let text = "";

  if (id == "prime") {
    title = "Prime Number Checker";
    text = "A calculator to check whether the given number is prime or not.";
  } else if (id == "percentage") {
    title = "Percentage Calculator";
    text = "A calculator containing various operations on percentages.";
  } else if (id == "mean") {
    title = "Central Tendency Calculator";
    text =
      "A calculator to find the statistical calculations for a set of numbers.";
  } else if (id == "area") {
    title = "Area Calculator";
    text = "A calculator to find the area of various 2D figures.";
  } else if (id == "recipe") {
    title = "Recipe APP";
    text =
      "A recipe app that allows users to search for their favourite recipes.";
  } else if (id == "pwd") {
    title = "Password Generator";
    text =
      "A simple password generator that generates a secure random password of the desired length.";
  } else if (id == "qr") {
    title = "QR Code Generator";
    text =
      "A QR code generator that allows users to create QR codes for any text or URL.";
  } else if (id == "ncert") {
    title = "NCERT E-book Hub";
    text = "Access all NCERT textbooks of Class 9th in one place.";
  }

  return `<li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${title}</div>
                    <small class="text-secondary">${text}</small>
                </div>
                <a href="${id}.html" class="btn btn-outline-primary align-self-center">Open</a>
            </li>`;
}

function removeAllFavorites() {
  localStorage.removeItem("favorites");
  loadFavorites();
}

// Toast
const toastTrigger = document.getElementById("removeFavoritesBtn");
const toastLiveExample = document.getElementById("liveToast");

if (document.querySelector("#removeFavoritesBtn")) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger.addEventListener("click", () => {
    toastBootstrap.show();
  });
}

window.onload = loadFavorites();

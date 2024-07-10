function toggleFav(calcName) {
  if (calcName == "Prime Number Checker") {
    let starPrimeBtn = document.getElementById("starPrime")
    fav(starPrimeBtn, calcName);
  } else if (calcName == "Percentage Calculator") {
    let starPercentBtn = document.getElementById("starPercent")
    fav(starPercentBtn, calcName);
  } else if (calcName == "Area Calculator") {
    let starAreaBtn = document.getElementById("starArea")
    fav(starAreaBtn, calcName);

  }
}

function fav(star, calcName) {
  let html = document.querySelector("html");
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.includes(calcName)) {
    star.classList.replace("fa-regular", "fa-solid");
    star.style.color = "#FFD43B";
  } else {
    star.classList.replace("fa-solid", "fa-regular");
    if (html.getAttribute("data-bs-theme") == "dark") {
      star.style.color = "#dee2e6";
    } else {
      star.style.color = "#212529";
    }
  }
}


function addToFavorites(calculatorId) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.includes(calculatorId)) {
    favorites.push(calculatorId);
  } else {
    favorites.splice(favorites.indexOf(calculatorId), 1);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function test() {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.forEach(checkCalc);
}

function checkCalc(calcName) {
  if (calcName == "Prime Number Checker") {
    let star = document.getElementById("starPrime")
    star.classList.replace("fa-regular", "fa-solid");
    star.style.color = "#FFD43B";
  } else if (calcName == "Percentage Calculator") {
    let star = document.getElementById("starPercent")
    star.classList.replace("fa-regular", "fa-solid");
    star.style.color = "#FFD43B";
  } else if (calcName == "Area Calculator") {
    let star = document.getElementById("starArea")
    star.classList.replace("fa-regular", "fa-solid");
    star.style.color = "#FFD43B";
  }
}

function toggleTheme() {
  let select = document.getElementById("select-menu");
  let selected = select.options[select.selectedIndex].value;
  let html = document.querySelector("html");

  if (selected == "light") {
    html.setAttribute("data-bs-theme", "light");

  } else if (selected == "dark") {
    html.setAttribute("data-bs-theme", "dark");
  } else {
    date = new Date();
    let time = date.getHours();
    if (time >= 19) {
      html.setAttribute("data-bs-theme", "dark");
    } else {
      html.setAttribute("data-bs-theme", "light");
    }
  }
}  
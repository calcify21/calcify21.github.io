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

  } else if (calcName == "Mean, Median, Mode, Range Calculator") {
    let starCentralTendancyBtn = document.getElementById("starCentralTendancy")
    fav(starCentralTendancyBtn, calcName);
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

function checkFav() {
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
  } else if (calcName == "Mean, Median, Mode, Range Calculator") {
    let star = document.getElementById("starCentralTendancy")
    star.classList.replace("fa-regular", "fa-solid");
    star.style.color = "#FFD43B";
  }
}

function removeAllFavorites() {
  localStorage.removeItem('favorites')
  let stars = document.querySelectorAll(".fa-star");
  stars.forEach(star => {
    star.classList.replace("fa-solid", "fa-regular");
    star.style.color = "";
  });
}

const toastTrigger = document.getElementById('rem')
const toastLiveExample = document.getElementById('liveToast')

if (document.querySelector("#rem")) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

window.onload = checkFav();
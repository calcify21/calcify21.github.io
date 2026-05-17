let currentGender = "male";

function setGender(gender) {
  currentGender = gender;
  document
    .getElementById("gender-male")
    .classList.toggle("active", gender === "male");
  document
    .getElementById("gender-female")
    .classList.toggle("active", gender === "female");

  // Hide results when switching
  document.getElementById("result-panel").classList.add("hidden");
  document.getElementById("error-msg").classList.add("hidden");
}

function calculateCalories() {
  const errorMsg = document.getElementById("error-msg");
  const resultPanel = document.getElementById("result-panel");
  errorMsg.classList.add("hidden");

  const age = parseInt(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const activity = parseFloat(document.getElementById("activity").value);

  // Validation
  if (!age || !weight || !height) {
    showError("Please fill in all fields.");
    return;
  }

  if (age < 10 || age > 120) {
    showError("Please enter a realistic age between 10 and 120.");
    return;
  }

  if (weight <= 0 || height <= 0) {
    showError("Weight and height must be positive values.");
    return;
  }

  let bmr;
  if (currentGender === "male") {
    // Male: 10 * weight + 6.25 * height - 5 * age + 5
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    // Female: 10 * weight + 6.25 * height - 5 * age - 161
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const maintenance = Math.round(bmr * activity);
  displayResult(maintenance);
}

function showError(msg) {
  const errorMsg = document.getElementById("error-msg");
  errorMsg.textContent = msg;
  errorMsg.classList.remove("hidden");
  document.getElementById("result-panel").classList.add("hidden");
}

function displayResult(calories) {
  const resultPanel = document.getElementById("result-panel");
  const calDisplay = document.getElementById("cal-value");
  const lossVal = document.getElementById("loss-val");
  const maintainVal = document.getElementById("maintain-val");
  const gainVal = document.getElementById("gain-val");

  const formatter = new Intl.NumberFormat();

  calDisplay.textContent = formatter.format(calories);
  maintainVal.textContent = formatter.format(calories);
  lossVal.textContent = formatter.format(Math.max(1200, calories - 500)); // Minimum safe calories usually ~1200
  gainVal.textContent = formatter.format(calories + 500);

  resultPanel.classList.remove("hidden");
  resultPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

let currentUnit = "metric";

function setUnits(unit) {
  currentUnit = unit;

  // Toggle tabs
  document
    .getElementById("tab-metric")
    .classList.toggle("active", unit === "metric");
  document
    .getElementById("tab-imperial")
    .classList.toggle("active", unit === "imperial");

  // Toggle forms
  document
    .getElementById("form-metric")
    .classList.toggle("hidden", unit !== "metric");
  document
    .getElementById("form-imperial")
    .classList.toggle("hidden", unit !== "imperial");

  // Hide results when switching
  document.getElementById("result-panel").classList.add("hidden");
  document.getElementById("error-msg").classList.add("hidden");
}

function calculateBMI() {
  const errorMsg = document.getElementById("error-msg");
  const resultPanel = document.getElementById("result-panel");
  errorMsg.classList.add("hidden");

  let weight, height, bmi;

  if (currentUnit === "metric") {
    weight = parseFloat(document.getElementById("weight-kg").value);
    height = parseFloat(document.getElementById("height-cm").value) / 100; // to meters

    if (!weight || !height || weight <= 0 || height <= 0) {
      showError("Please enter valid positive numbers for weight and height.");
      return;
    }

    bmi = weight / (height * height);
  } else {
    weight = parseFloat(document.getElementById("weight-lb").value);
    const ft = parseFloat(document.getElementById("height-ft").value) || 0;
    const inches = parseFloat(document.getElementById("height-in").value) || 0;
    height = ft * 12 + inches;

    if (!weight || height <= 0 || weight <= 0) {
      showError("Please enter valid positive numbers for weight and height.");
      return;
    }

    bmi = (weight * 703) / (height * height);
  }

  displayResult(bmi);
}

function showError(msg) {
  const errorMsg = document.getElementById("error-msg");
  errorMsg.textContent = msg;
  errorMsg.classList.remove("hidden");
  document.getElementById("result-panel").classList.add("hidden");
}

function displayResult(bmi) {
  const resultPanel = document.getElementById("result-panel");
  const bmiValue = document.getElementById("bmi-value");
  const bmiBadge = document.getElementById("bmi-category-badge");
  const bmiMarker = document.getElementById("bmi-marker");
  const bmiDesc = document.getElementById("bmi-desc");

  const value = bmi.toFixed(1);
  bmiValue.textContent = value;

  let category = "";
  let colorClass = "";
  let description = "";
  let markerPos = 0;

  if (bmi < 18.5) {
    category = "Underweight";
    colorClass =
      "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    description =
      "A BMI of less than 18.5 indicates that you are underweight, so you may need to put on some weight. You are recommended to ask your doctor or a dietitian for advice.";
    markerPos = Math.min((bmi / 18.5) * 18.5, 18.5);
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal Weight";
    colorClass =
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    description =
      "A BMI of 18.5-24.9 indicates that you are at a healthy weight for your height. By maintaining a healthy weight, you lower your risk of developing serious health problems.";
    markerPos = 18.5 + ((bmi - 18.5) / 6.4) * 6.5;
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = "Overweight";
    colorClass =
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
    description =
      "A BMI of 25-29.9 indicates that you are slightly overweight. You may be advised to lose some weight for health reasons. You are recommended to talk to your doctor or a dietitian for advice.";
    markerPos = 25 + ((bmi - 25) / 4.9) * 5;
  } else {
    category = "Obese";
    colorClass = "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
    description =
      "A BMI of over 30 indicates that you are heavily overweight. Your health may be at risk if you do not lose weight. You are recommended to talk to your doctor or a dietitian for advice.";
    markerPos = Math.min(30 + ((bmi - 30) / 10) * 70, 99);
  }

  bmiBadge.textContent = category;
  bmiBadge.className = `inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold mb-6 ${colorClass}`;
  bmiMarker.style.left = `${markerPos}%`;
  bmiDesc.textContent = description;

  resultPanel.classList.remove("hidden");
  resultPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

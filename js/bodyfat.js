let currentGender = "male";

function setGender(gender) {
  currentGender = gender;
  document
    .getElementById("gender-male")
    .classList.toggle("active", gender === "male");
  document
    .getElementById("gender-female")
    .classList.toggle("active", gender === "female");
  document
    .getElementById("hip-container")
    .classList.toggle("hidden", gender !== "female");

  // Reset hip input if male
  if (gender === "male") {
    document.getElementById("hip").value = "";
  }

  // Hide results when switching
  document.getElementById("result-panel").classList.add("hidden");
  document.getElementById("error-msg").classList.add("hidden");
}

function calculateBodyFat() {
  const errorMsg = document.getElementById("error-msg");
  const resultPanel = document.getElementById("result-panel");
  errorMsg.classList.add("hidden");

  const height = parseFloat(document.getElementById("height").value);
  const neck = parseFloat(document.getElementById("neck").value);
  const waist = parseFloat(document.getElementById("waist").value);
  let hip = 0;

  if (currentGender === "female") {
    hip = parseFloat(document.getElementById("hip").value);
    if (!hip || hip <= 0) {
      showError("Please enter a valid hip measurement.");
      return;
    }
  }

  if (!height || !neck || !waist || height <= 0 || neck <= 0 || waist <= 0) {
    showError("Please enter valid positive measurements.");
    return;
  }

  if (waist <= neck) {
    showError("Waist must be larger than neck measurement.");
    return;
  }

  let bodyFat;
  if (currentGender === "male") {
    // Navy Formula Male: 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
    bodyFat =
      86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
  } else {
    // Navy Formula Female: 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
    bodyFat =
      163.205 * Math.log10(waist + hip - neck) -
      97.684 * Math.log10(height) -
      78.387;
  }

  if (isNaN(bodyFat) || bodyFat <= 0) {
    showError("Invalid input. Please check your measurements.");
    return;
  }

  displayResult(bodyFat);
}

function showError(msg) {
  const errorMsg = document.getElementById("error-msg");
  errorMsg.textContent = msg;
  errorMsg.classList.remove("hidden");
  document.getElementById("result-panel").classList.add("hidden");
}

function displayResult(bf) {
  const resultPanel = document.getElementById("result-panel");
  const bfValue = document.getElementById("bf-value");
  const bfBadge = document.getElementById("bf-category-badge");
  const bfDesc = document.getElementById("bf-desc");
  const tableBody = document.getElementById("ref-table-body");

  const value = bf.toFixed(1);
  bfValue.textContent = `${value}%`;

  let category = "";
  let colorClass = "";
  let description = "";
  let refData = [];

  if (currentGender === "male") {
    refData = [
      { name: "Essential", range: "2-5%", min: 2, max: 5 },
      { name: "Athlete", range: "6-13%", min: 6, max: 13 },
      { name: "Fitness", range: "14-17%", min: 14, max: 17 },
      { name: "Average", range: "18-24%", min: 18, max: 24 },
      { name: "Obese", range: "25%+", min: 25, max: 100 },
    ];
  } else {
    refData = [
      { name: "Essential", range: "10-13%", min: 10, max: 13 },
      { name: "Athlete", range: "14-20%", min: 14, max: 20 },
      { name: "Fitness", range: "21-24%", min: 21, max: 24 },
      { name: "Average", range: "25-31%", min: 25, max: 31 },
      { name: "Obese", range: "32%+", min: 32, max: 100 },
    ];
  }

  // Determine category
  const catObj =
    refData.find((d) => bf >= d.min && bf <= d.max) ||
    (bf > 30 ? refData[4] : refData[0]);
  category = catObj.name;

  // Color mapping
  const colorMap = {
    Essential:
      "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    Athlete: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
    Fitness:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    Average:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
    Obese: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  };
  colorClass = colorMap[category];

  bfBadge.textContent = category;
  bfBadge.className = `inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold mb-4 ${colorClass}`;

  bfDesc.textContent = `Based on your measurements, your estimated body fat is ${value}%, which falls into the ${category} category for ${currentGender}s.`;

  // Populate table
  tableBody.innerHTML = "";
  refData.forEach((d) => {
    const isCurrent = d.name === category;
    const row = document.createElement("tr");
    row.className = isCurrent ? "bg-accent/5 font-bold" : "";
    row.innerHTML = `
            <td class="px-4 py-3 ${isCurrent ? "text-accent" : "text-secondary"}">${d.name}</td>
            <td class="px-4 py-3 text-right ${isCurrent ? "text-accent" : "text-muted"}">${d.range}</td>
        `;
    tableBody.appendChild(row);
  });

  resultPanel.classList.remove("hidden");
  resultPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

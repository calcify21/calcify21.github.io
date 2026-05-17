// ==========================================
// Unit Converter Logic
// ==========================================

const unitsData = {
  length: {
    base: "m",
    rates: {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      mi: 1609.344,
      yd: 0.9144,
      ft: 0.3048,
      in: 0.0254,
    },
    names: {
      m: "Meters",
      km: "Kilometers",
      cm: "Centimeters",
      mm: "Millimeters",
      mi: "Miles",
      yd: "Yards",
      ft: "Feet",
      in: "Inches",
    },
  },
  weight: {
    base: "kg",
    rates: {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      mt: 1000,
      lb: 0.453592,
      oz: 0.0283495,
    },
    names: {
      kg: "Kilograms",
      g: "Grams",
      mg: "Milligrams",
      mt: "Metric Tons",
      lb: "Pounds",
      oz: "Ounces (US)",
    },
  },
  area: {
    base: "sqm",
    rates: {
      sqm: 1,
      sqkm: 1000000,
      sqcm: 0.0001,
      ha: 10000,
      ac: 4046.86,
      sqmi: 2589988.11,
      sqyd: 0.836127,
      sqft: 0.092903,
      sqin: 0.00064516,
    },
    names: {
      sqm: "Square Meters",
      sqkm: "Square Kilometers",
      sqcm: "Square Centimeters",
      ha: "Hectares",
      ac: "Acres",
      sqmi: "Square Miles",
      sqyd: "Square Yards",
      sqft: "Square Feet",
      sqin: "Square Inches",
    },
  },
  volume: {
    base: "l",
    rates: {
      l: 1,
      ml: 0.001,
      cum: 1000,
      cucm: 0.001,
      gal: 3.78541,
      qt: 0.946353,
      pt: 0.473176,
      cp: 0.236588,
      floz: 0.0295735,
    },
    names: {
      l: "Liters",
      ml: "Milliliters",
      cum: "Cubic Meters",
      cucm: "Cubic Centimeters",
      gal: "Gallons (US)",
      qt: "Quarts (US)",
      pt: "Pints (US)",
      cp: "Cups (US)",
      floz: "Fluid Ounces (US)",
    },
  },
  time: {
    base: "s",
    rates: {
      s: 1,
      min: 60,
      h: 3600,
      d: 86400,
      wk: 604800,
      mo: 2629800, // Approx 30.44 days
      yr: 31557600, // 365.25 days
    },
    names: {
      s: "Seconds",
      min: "Minutes",
      h: "Hours",
      d: "Days",
      wk: "Weeks",
      mo: "Months",
      yr: "Years",
    },
  },
  temperature: {
    // Temperature handled specifically via functions
    names: {
      c: "Celsius",
      f: "Fahrenheit",
      k: "Kelvin",
    },
  },
};

const categorySelect = document.getElementById("unitCategory");
const fromSelect = document.getElementById("fromUnit");
const toSelect = document.getElementById("toUnit");
const inputVal = document.getElementById("inputValue");
const outputVal = document.getElementById("outputValue");

function populateUnitOptions() {
  const category = categorySelect.value;
  const data = unitsData[category];

  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";

  for (const [key, name] of Object.entries(data.names)) {
    fromSelect.add(new Option(name, key));
    toSelect.add(new Option(name, key));
  }

  // Ensure default targets are safely selected avoiding matching from/to initially
  if (fromSelect.options.length > 1) {
    toSelect.selectedIndex = 1;
  }

  convert();
}

function convert() {
  const category = categorySelect.value;
  const from = fromSelect.value;
  const to = toSelect.value;
  const val = parseFloat(inputVal.value);

  if (isNaN(val)) {
    outputVal.value = "";
    return;
  }

  if (from === to) {
    outputVal.value = val;
    return;
  }

  let result;

  if (category === "temperature") {
    result = convertTemperature(val, from, to);
  } else {
    // Convert from -> base -> to
    const baseVal = val * unitsData[category].rates[from];
    result = baseVal / unitsData[category].rates[to];
  }

  // Format realistically removing float imprecision trailing zeroes
  outputVal.value = parseFloat(result.toPrecision(10));
}

function convertTemperature(val, from, to) {
  let celsius;
  // Convert anything to Celsius first
  if (from === "c") celsius = val;
  else if (from === "f") celsius = ((val - 32) * 5) / 9;
  else if (from === "k") celsius = val - 273.15;

  // Convert Celsius to Target
  if (to === "c") return celsius;
  if (to === "f") return (celsius * 9) / 5 + 32;
  if (to === "k") return celsius + 273.15;
}

function swapUnits() {
  const tempFrom = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = tempFrom;
  convert();
}

// Init
window.onload = populateUnitOptions;

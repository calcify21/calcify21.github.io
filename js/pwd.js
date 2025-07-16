// --- Existing General Password Generator Logic ---
const sliderValue = document.getElementById("passwordLength");
sliderValue.addEventListener("input", function () {
  document.getElementById("length").textContent = sliderValue.value;
});

// Add event listener for slider change to regenerate password
sliderValue.addEventListener("change", generatePassword);

function generatePassword() {
  const length = sliderValue.value;
  const includeLowercase = document.getElementById("include-lowercase").checked;
  const includeUppercase = document.getElementById("include-uppercase").checked;
  const includeNumbers = document.getElementById("include-numbers").checked;
  const includeSymbols = document.getElementById(
    "include-specialChars"
  ).checked;

  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+{}[]<>?,.";

  let characterPool = "";
  if (includeLowercase) characterPool += lowercaseChars;
  if (includeUppercase) characterPool += uppercaseChars;
  if (includeNumbers) characterPool += numberChars;
  if (includeSymbols) characterPool += symbolChars;

  if (characterPool.length === 0) {
    document.getElementById("generatedPwd").value = "Select character types!";
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  typewriter(password, "generatedPwd");
}

function decreaseLength() {
  if (parseInt(sliderValue.value) > 3) {
    // Ensure minimum length is 3
    sliderValue.value = parseInt(sliderValue.value) - 1;
    document.getElementById("length").textContent = sliderValue.value;
    generatePassword();
  }
}

function increaseLength() {
  if (parseInt(sliderValue.value) < 50) {
    // Ensure maximum length is 50
    sliderValue.value = parseInt(sliderValue.value) + 1;
    document.getElementById("length").textContent = sliderValue.value;
    generatePassword();
  }
}

function typewriter(pwd, elementId) {
  let generatedInput = document.getElementById(elementId);
  generatedInput.value = ""; // Clear existing text
  let i = 0;
  const speed = 40; // Typing speed in ms

  function type() {
    if (i < pwd.length) {
      generatedInput.value += pwd[i];
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Ensure at least one checkbox is checked for the main generator
const mainCheckboxes = document.querySelectorAll(".controlled-checkbox");
mainCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const checkedCheckboxes = [...mainCheckboxes].filter((cb) => cb.checked);
    if (checkedCheckboxes.length === 0) {
      checkbox.checked = true; // Prevent all from being unchecked
    }
    generatePassword(); // Regenerate password on change
  });
});

// Initial load for main generator
window.addEventListener("load", () => {
  document.getElementById("length").textContent = sliderValue.value;
  generatePassword();
});

// --- Memorable Password Generator Logic ---

// List of common words for the structured pattern option
const commonWords = [
  "Apple",
  "River",
  "Sunny",
  "Cloud",
  "Tiger",
  "Ocean",
  "Green",
  "Happy",
  "Music",
  "Forest",
  "Pizza",
  "Chair",
  "Dream",
  "Brave",
  "Quiet",
  "Flower",
  "Spark",
  "Light",
  "Magic",
  "Journey",
  "Shadow",
  "Whisper",
  "Silver",
  "Golden",
  "Thunder",
  "Mountain",
  "Valley",
  "Crystal",
  "Willow",
  "Lantern",
  "Echo",
  "Crimson",
];

function generateMemorablePassword() {
  const selectedMethod = document.querySelector(
    'input[name="memorableGenMethod"]:checked'
  ).value;

  let baseString = "";

  // Options are collected regardless of method, and applied where relevant
  const options = {
    // capitalizeFirst: document.getElementById("memorableCapitalizeFirst")
    //   .checked,
    capitalizeRandomWords: document.getElementById(
      "memorableCapitalizeRandomWords"
    ).checked,
    numRandomCaps: parseInt(
      document.getElementById("memorableNumRandomCaps").value
    ),
    addSpecialChar: document.getElementById("memorableAddSpecialChar").checked,
    numSpecialChars: parseInt(
      document.getElementById("memorableNumSpecialChars").value
    ),
    specialCharPlacement: document.querySelector(
      'input[name="memorableSpecialCharPlacement"]:checked'
    ).value, // This will be less relevant for the strict pattern
    addNumber: document.getElementById("memorableAddNumber").checked,
    numberPlacement: document.querySelector(
      'input[name="memorableNumberPlacement"]:checked'
    ).value, // This will be less relevant for the strict pattern
    commonSpecialChars: ["@", "!", "#", "$", "@", "%", "&", "*", "@"],
  };

  if (selectedMethod === "namePhrase") {
    let rawNameInput = document.getElementById("name1").value.trim();
    if (!rawNameInput) {
      // alert("Please enter a name or phrase for your memorable password.");
      const toast4 = document.getElementById("noName");
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast4);
      toastBootstrap.show();
      return;
    }

    let nameParts = rawNameInput.split(/\s+/).filter((part) => part.length > 0);

    if (nameParts.length > 1) {
      const numWordsToUse = Math.min(
        Math.ceil(Math.random() * nameParts.length),
        2
      );
      const selectedWordIndices = [];
      while (selectedWordIndices.length < numWordsToUse) {
        const randomIndex = Math.floor(Math.random() * nameParts.length);
        if (!selectedWordIndices.includes(randomIndex)) {
          selectedWordIndices.push(randomIndex);
        }
      }
      baseString = selectedWordIndices.map((idx) => nameParts[idx]).join("");
    } else {
      const name = rawNameInput;
      if (name.length <= 3) {
        baseString = name;
      } else {
        const segmentLength = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5 characters
        const startIndex = Math.floor(
          Math.random() * (name.length - segmentLength + 1)
        );
        baseString = name.substring(startIndex, startIndex + segmentLength);
      }
    }
    baseString = baseString.toLowerCase(); // Convert to lowercase for consistent capitalization application
  } else {
    // selectedMethod === 'structured'
    let userWord = document.getElementById("commonWord").value.trim();
    let wordForPattern = "";

    if (userWord) {
      wordForPattern = userWord.toLowerCase();
    } else {
      wordForPattern =
        commonWords[
          Math.floor(Math.random() * commonWords.length)
        ].toLowerCase();
    }

    baseString = wordForPattern;
  }

  let finalPassword = baseString;

  // Apply capitalization (first letter and random) - applies to both methods
  // if (options.capitalizeFirst && finalPassword.length > 0) {
  //   finalPassword =
  //     finalPassword.charAt(0).toUpperCase() + finalPassword.slice(1);
  // }

  if (options.capitalizeRandomWords && options.numRandomCaps > 0) {
    let chars = finalPassword.split("");
    const charsToCapitalizeIndices = [];
    const actualCaps = Math.min(options.numRandomCaps, chars.length);

    while (charsToCapitalizeIndices.length < actualCaps) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      if (!charsToCapitalizeIndices.includes(randomIndex)) {
        charsToCapitalizeIndices.push(randomIndex);
      }
    }

    let tempPasswordArray = [];
    for (let i = 0; i < chars.length; i++) {
      if (charsToCapitalizeIndices.includes(i)) {
        tempPasswordArray.push(chars[i].toUpperCase());
      } else {
        tempPasswordArray.push(chars[i]);
      }
    }
    finalPassword = tempPasswordArray.join("");
  }

  // --- Enforce the new structure: {word}{symbol}{number}{symbol} for Structured Pattern ---
  if (selectedMethod === "structured") {
    // 1. Add first symbol
    if (options.addSpecialChar && options.numSpecialChars >= 1) {
      const randomChar =
        options.commonSpecialChars[
          Math.floor(Math.random() * options.commonSpecialChars.length)
        ];
      finalPassword += randomChar;
    }

    // 2. Add number(s)
    if (options.addNumber) {
      const minNum = 0;
      const maxNum = 999;
      const randomNumber =
        Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      finalPassword += String(randomNumber);
    }

    // 3. Add second symbol (if numSpecialChars > 1)
    if (options.addSpecialChar && options.numSpecialChars >= 2) {
      const randomChar =
        options.commonSpecialChars[
          Math.floor(Math.random() * options.commonSpecialChars.length)
        ];
      finalPassword += randomChar;
    }
  } else {
    // --- Original logic for Name/Phrase method (or if not enough symbols are requested for structured) ---

    // Add Special Characters - applies to Name/Phrase method or if structured doesn't meet criteria
    if (options.addSpecialChar && options.commonSpecialChars.length > 0) {
      // Adjust loop based on how many symbols were already added in structured mode
      let symbolsToAdd = options.numSpecialChars;
      if (selectedMethod === "structured") {
        if (symbolsToAdd >= 1) symbolsToAdd--; // Account for first symbol
        if (symbolsToAdd >= 1) symbolsToAdd--; // Account for second symbol
      }
      symbolsToAdd = Math.max(0, symbolsToAdd); // Ensure it's not negative

      for (let i = 0; i < symbolsToAdd; i++) {
        const randomChar =
          options.commonSpecialChars[
            Math.floor(Math.random() * options.commonSpecialChars.length)
          ];

        if (options.specialCharPlacement === "start") {
          finalPassword = randomChar + finalPassword;
        } else if (options.specialCharPlacement === "end") {
          finalPassword = finalPassword + randomChar;
        } else if (options.specialCharPlacement === "replace") {
          let replaced = false;
          if (finalPassword.toLowerCase().includes("s") && randomChar === "$") {
            finalPassword = finalPassword.replace(/s/gi, "$");
            replaced = true;
          } else if (
            finalPassword.toLowerCase().includes("a") &&
            randomChar === "@"
          ) {
            finalPassword = finalPassword.replace(/a/gi, "@");
            replaced = true;
          } else if (
            finalPassword.toLowerCase().includes("i") &&
            randomChar === "!"
          ) {
            finalPassword = finalPassword.replace(/i/gi, "!");
            replaced = true;
          }

          if (!replaced) {
            const randomIndex = Math.floor(
              Math.random() * (finalPassword.length + 1)
            );
            finalPassword =
              finalPassword.slice(0, randomIndex) +
              randomChar +
              finalPassword.slice(randomIndex);
          }
        } else {
          // 'random' placement
          const randomIndex = Math.floor(
            Math.random() * (finalPassword.length + 1)
          );
          finalPassword =
            finalPassword.slice(0, randomIndex) +
            randomChar +
            finalPassword.slice(randomIndex);
        }
      }
    }

    // Add Number - applies to Name/Phrase method
    if (options.addNumber && selectedMethod !== "structured") {
      // Only add if not structured, as structured adds numbers differently
      const minNum = 0;
      const maxNum = 999;
      const randomNumber =
        Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      const numString = String(randomNumber);

      if (options.numberPlacement === "start") {
        finalPassword = numString + finalPassword;
      } else if (options.numberPlacement === "end") {
        finalPassword = finalPassword + numString;
      } else {
        // 'random' placement
        const randomIndex = Math.floor(
          Math.random() * (finalPassword.length + 1)
        );
        finalPassword =
          finalPassword.slice(0, randomIndex) +
          numString +
          finalPassword.slice(randomIndex);
      }
    }
  }

  typewriter(finalPassword, "generatedPwd2");
}

function clearModal() {
  document.getElementById("generatedPwd2").value = "";
  document.getElementById("name1").value = "";
  document.getElementById("commonWord").value = ""; // Clear common word input too

  // Reset method selection and trigger change to show/hide relevant inputs
  document.getElementById("methodNamePhrase").checked = true;
  document
    .getElementById("methodNamePhrase")
    .dispatchEvent(new Event("change")); // Trigger visibility update

  // Reset other memorable options to defaults
  // document.getElementById("memorableCapitalizeFirst").checked = true;
  document.getElementById("memorableCapitalizeRandomWords").checked = true;
  document.getElementById("memorableNumRandomCaps").value = 1;
  document.getElementById("memorableAddSpecialChar").checked = true;
  document.getElementById("memorableNumSpecialChars").value = 1;
  document.getElementById("memorableSCRandom").checked = true;
  document.getElementById("memorableAddNumber").checked = true;
  document.getElementById("memorableNumberMin").value = 0;
  document.getElementById("memorableNumberMax").value = 99;
  document.getElementById("memorableNumRandom").checked = true;

  // Re-trigger toggles for individual option groups
  document
    .getElementById("memorableCapitalizeRandomWords")
    .dispatchEvent(new Event("change"));
  document
    .getElementById("memorableAddSpecialChar")
    .dispatchEvent(new Event("change"));
  document
    .getElementById("memorableAddNumber")
    .dispatchEvent(new Event("change"));
}

// Function to copy password (re-used for both generators)
function copyPassword(password) {
  const toast1 = document.getElementById("copied");
  const toast2 = document.getElementById("nopwd");
  const toast3 = document.getElementById("err");

  if (!password) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast2);
    toastBootstrap.show();
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast1);
        toastBootstrap.show();
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast3);
        toastBootstrap.show();
      });
  } else {
    // alert("Clipboard API not supported in this browser. Please copy manually.");
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast3);
    toastBootstrap.show();
  }
}

// --- UI Toggle for Memorable Password Generator Options ---
function setupMemorableOptionToggle(checkboxId, optionsDivId) {
  const checkbox = document.getElementById(checkboxId);
  const optionsDiv = document.getElementById(optionsDivId);

  if (checkbox && optionsDiv) {
    // Ensure elements exist
    checkbox.addEventListener("change", function () {
      optionsDiv.style.display = this.checked ? "block" : "none";
    });
    // Trigger initial state
    checkbox.dispatchEvent(new Event("change"));
  }
}

// Set up toggles for the memorable password generator modal options
document.addEventListener("DOMContentLoaded", () => {
  // Existing toggles for option groups
  setupMemorableOptionToggle(
    "memorableCapitalizeRandomWords",
    "memorableRandomCapitalizationOptions"
  );
  setupMemorableOptionToggle(
    "memorableAddSpecialChar",
    "memorableSpecialCharOptions"
  );
  setupMemorableOptionToggle("memorableAddNumber", "memorableNumberOptions");

  // New logic for switching between name/phrase and structured pattern inputs
  const methodNamePhraseRadio = document.getElementById("methodNamePhrase");
  const methodStructuredRadio = document.getElementById("methodStructured");
  const namePhraseInputGroup = document.getElementById("namePhraseInputGroup");
  const structuredPatternInputGroup = document.getElementById(
    "structuredPatternInputGroup"
  );
  const specialCharsDiv = document.querySelector(".specialCharsDiv");
  const numberDiv = document.querySelector(".numberDiv");

  function toggleInputGroups() {
    if (methodNamePhraseRadio.checked) {
      namePhraseInputGroup.style.display = "block";
      structuredPatternInputGroup.style.display = "none";
      specialCharsDiv.style.display = "block"; // Show special chars for name/phrase
      numberDiv.style.display = "block"; // Show number options for name/phrase
    } else {
      namePhraseInputGroup.style.display = "none";
      structuredPatternInputGroup.style.display = "block";
      specialCharsDiv.style.display = "none"; // Hide special chars for structured
      numberDiv.style.display = "none"; // Hide number options for structured
    }
  }

  methodNamePhraseRadio.addEventListener("change", toggleInputGroups);
  methodStructuredRadio.addEventListener("change", toggleInputGroups);

  // Initial call to set correct visibility on load
  toggleInputGroups();
});

// Make sure the modal-specific elements are properly initialized when the modal opens
document
  .getElementById("memorablePwdGeneratorModal")
  .addEventListener("shown.bs.modal", function () {
    // Re-trigger toggles to ensure visibility is correct if user had changed settings
    document
      .getElementById("memorableCapitalizeRandomWords")
      .dispatchEvent(new Event("change"));
    document
      .getElementById("memorableAddSpecialChar")
      .dispatchEvent(new Event("change"));
    document
      .getElementById("memorableAddNumber")
      .dispatchEvent(new Event("change"));
    // Also ensure the correct input group is shown when modal opens
    document
      .querySelector('input[name="memorableGenMethod"]:checked')
      .dispatchEvent(new Event("change"));
  });

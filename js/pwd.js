// ============================================================
// PWD.JS — Password Generator (refactored for custom modal)
// Removed: Bootstrap.Toast, Bootstrap.Modal, data-bs-* attributes
// Uses: showToast(), custom modal overlay
// ============================================================

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
    sliderValue.value = parseInt(sliderValue.value) - 1;
    document.getElementById("length").textContent = sliderValue.value;
    generatePassword();
  }
}

function increaseLength() {
  if (parseInt(sliderValue.value) < 50) {
    sliderValue.value = parseInt(sliderValue.value) + 1;
    document.getElementById("length").textContent = sliderValue.value;
    generatePassword();
  }
}

let typewriterTimeout;
function typewriter(pwd, elementId) {
  let generatedInput = document.getElementById(elementId);
  clearTimeout(typewriterTimeout);
  generatedInput.value = "";
  let i = 0;

  function type() {
    if (i < pwd.length) {
      generatedInput.value += pwd[i];
      i++;
      typewriterTimeout = setTimeout(type, 40);
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
      checkbox.checked = true;
    }
    generatePassword();
  });
});

// Initial load for main generator
window.addEventListener("load", () => {
  document.getElementById("length").textContent = sliderValue.value;
  generatePassword();
});

// --- Memorable Password Generator Logic ---

const commonWords = [
  "Alpine","Bonsai","Canyon","Desert","Everest","Forest","Geyser","Hollow","Island","Jungle",
  "Kelp","Lagoon","Meadow","Nebula","Ocean","Prairie","Quartz","River","Summit","Tundra",
  "Valley","Willow","Xylem","Yucca","Zephyr","Falcon","Grizzly","Jaguar","Kestrel","Lemur",
  "Magpie","Narwhal","Ocelot","Panther","Quokka","Raven","Stallion","Tiger","Urchin","Viper",
  "Walrus","X-ray","Yak","Zebra","Dolphin","Badger","Otter","Phoenix","Griffin","Atom",
  "Binary","Comet","Delta","Eclipse","Fusion","Galaxy","Helix","Ion","Jupiter","Kinetic",
  "Lunar","Meteor","Nova","Orbit","Photon","Quasar","Radar","Solar","Tesla","Unit",
  "Vector","Warp","Zenith","Ancient","Brave","Crimson","Dream","Echo","Frosty","Golden",
  "Hidden","Indigo","Jolly","Kindle","Light","Magic","Noble","Opal","Placid","Quiet",
  "Rustic","Silver","Thunder","Urban","Velvet","Whisper","Yield","Anchor","Bridge","Castle",
  "Dagger","Engine","Forge","Guitar","Hammer","Igloo","Jacket","Kite","Lantern","Marble",
  "Needle","Outlet","Pillar","Quilt","Rocket","Saddle","Temple","Umber","Vessel","Window","Yacht",
];

function generateMemorablePassword() {
  const selectedMethod = document.querySelector(
    'input[name="memorableGenMethod"]:checked'
  ).value;

  let baseString = "";

  const options = {
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
    ).value,
    addNumber: document.getElementById("memorableAddNumber").checked,
    numberPlacement: document.querySelector(
      'input[name="memorableNumberPlacement"]:checked'
    ).value,
    commonSpecialChars: ["@", "!", "#", "$", "@", "%", "&", "*", "@"],
  };

  if (selectedMethod === "namePhrase") {
    let rawNameInput = document
      .getElementById("name1")
      .value.replaceAll(" ", "");
    if (!rawNameInput) {
      showToast("Please enter a name or phrase for your memorable password.", "text-bg-danger");
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
        const segmentLength = Math.floor(Math.random() * 3) + 3;
        const startIndex = Math.floor(
          Math.random() * (name.length - segmentLength + 1)
        );
        baseString = name.substring(startIndex, startIndex + segmentLength);
      }
    }
    baseString = baseString.toLowerCase();
  } else {
    let userWord = document
      .getElementById("commonWord")
      .value.replaceAll(" ", "");
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

  if (selectedMethod === "structured") {
    if (options.addSpecialChar && options.numSpecialChars >= 1) {
      const randomChar =
        options.commonSpecialChars[
          Math.floor(Math.random() * options.commonSpecialChars.length)
        ];
      finalPassword += randomChar;
    }

    if (options.addNumber) {
      const minNum = 0;
      const maxNum = 999;
      const randomNumber =
        Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      finalPassword += String(randomNumber);
    }

    if (options.addSpecialChar && options.numSpecialChars >= 2) {
      const randomChar =
        options.commonSpecialChars[
          Math.floor(Math.random() * options.commonSpecialChars.length)
        ];
      finalPassword += randomChar;
    }
  } else {
    if (options.addSpecialChar && options.commonSpecialChars.length > 0) {
      let symbolsToAdd = options.numSpecialChars;
      if (selectedMethod === "structured") {
        if (symbolsToAdd >= 1) symbolsToAdd--;
        if (symbolsToAdd >= 1) symbolsToAdd--;
      }
      symbolsToAdd = Math.max(0, symbolsToAdd);

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

    if (options.addNumber && selectedMethod !== "structured") {
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
  document.getElementById("commonWord").value = "";

  document.getElementById("memorableCapitalizeRandomWords").checked = true;
  document.getElementById("memorableNumRandomCaps").value = 1;
  document.getElementById("memorableAddSpecialChar").checked = true;
  document.getElementById("memorableNumSpecialChars").value = 1;
  document.getElementById("memorableAddNumber").checked = true;

  document.getElementById("memorableSCRandom").checked = true;
  document.getElementById("memorableNumRandom").checked = true;
  document.getElementById("methodNamePhrase").checked = true;

  const scPlacement = document.getElementById("scPlacementWrapper");
  const numPlacement = document.getElementById("numPlacementWrapper");
  const numOptionsDiv = document.getElementById("memorableNumberOptions");

  if (scPlacement) scPlacement.style.display = "block";
  if (numPlacement) numPlacement.style.display = "block";
  if (numOptionsDiv) numOptionsDiv.style.display = "block";

  document
    .getElementById("memorableCapitalizeRandomWords")
    .dispatchEvent(new Event("change"));
  document
    .getElementById("memorableAddSpecialChar")
    .dispatchEvent(new Event("change"));
  document
    .getElementById("memorableAddNumber")
    .dispatchEvent(new Event("change"));

  document
    .getElementById("methodNamePhrase")
    .dispatchEvent(new Event("change"));
}

// Function to copy password
function copyPassword(password) {
  if (!password) {
    showToast("Nothing to copy yet. Please create one to proceed.", "text-bg-danger");
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        showToast("Copied! Your password is ready to paste.", "text-bg-success");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        showToast("Oops! Something went wrong while copying.", "text-bg-danger");
      });
  } else {
    showToast("Oops! Something went wrong while copying.", "text-bg-danger");
  }
}

// --- UI Toggle for Memorable Password Generator Options ---
function setupMemorableOptionToggle(checkboxId, optionsDivId) {
  const checkbox = document.getElementById(checkboxId);
  const optionsDiv = document.getElementById(optionsDivId);

  if (checkbox && optionsDiv) {
    checkbox.addEventListener("change", function () {
      const isStructured = document.getElementById("methodStructured").checked;

      if (this.checked) {
        optionsDiv.style.display = "block";
        if (isStructured && checkboxId === "memorableAddNumber") {
          optionsDiv.style.display = "none";
        } else if (isStructured && checkboxId === "memorableAddSpecialChar") {
          const scPlacement = document.getElementById("scPlacementWrapper");
          if (scPlacement) scPlacement.style.display = "none";
        }
      } else {
        optionsDiv.style.display = "none";
      }
    });
    checkbox.dispatchEvent(new Event("change"));
  }
}

// Set up toggles for the memorable password generator modal options
document.addEventListener("DOMContentLoaded", () => {
  setupMemorableOptionToggle(
    "memorableCapitalizeRandomWords",
    "memorableRandomCapitalizationOptions"
  );
  setupMemorableOptionToggle(
    "memorableAddSpecialChar",
    "memorableSpecialCharOptions"
  );
  setupMemorableOptionToggle("memorableAddNumber", "memorableNumberOptions");

  const methodNamePhraseRadio = document.getElementById("methodNamePhrase");
  const methodStructuredRadio = document.getElementById("methodStructured");
  const namePhraseInputGroup = document.getElementById("namePhraseInputGroup");
  const structuredPatternInputGroup = document.getElementById(
    "structuredPatternInputGroup"
  );
  const specialCharsDiv = document.querySelector(".specialCharsDiv");
  const numberDiv = document.querySelector(".numberDiv");

  function toggleInputGroups() {
    const isStructured = methodStructuredRadio.checked;
    const scPlacement = document.getElementById("scPlacementWrapper");
    const numOptionsDiv = document.getElementById("memorableNumberOptions");

    if (!isStructured) {
      namePhraseInputGroup.style.display = "block";
      structuredPatternInputGroup.style.display = "none";

      if (scPlacement) scPlacement.style.display = "block";
      if (numOptionsDiv) numOptionsDiv.style.display = "block";
    } else {
      namePhraseInputGroup.style.display = "none";
      structuredPatternInputGroup.style.display = "block";

      specialCharsDiv.style.display = "block";
      numberDiv.style.display = "block";

      const scPlacement = document.getElementById("scPlacementWrapper");
      if (scPlacement) scPlacement.style.display = "none";

      const numOptionsDiv = document.getElementById("memorableNumberOptions");
      if (numOptionsDiv) numOptionsDiv.style.display = "none";
    }
  }

  if (methodNamePhraseRadio)
    methodNamePhraseRadio.addEventListener("change", toggleInputGroups);
  if (methodStructuredRadio)
    methodStructuredRadio.addEventListener("change", toggleInputGroups);

  toggleInputGroups();

  // --- Custom Modal Logic ---
  const modalOverlay = document.getElementById("memorablePwdGeneratorModal");
  const openBtn = document.getElementById("openMemorableModal");
  const closeBtn = document.getElementById("closeMemorableModal");

  function openModal() {
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    // Re-trigger toggles
    document
      .getElementById("memorableCapitalizeRandomWords")
      .dispatchEvent(new Event("change"));
    document
      .getElementById("memorableAddSpecialChar")
      .dispatchEvent(new Event("change"));
    document
      .getElementById("memorableAddNumber")
      .dispatchEvent(new Event("change"));

    const checkedMethod = document.querySelector(
      'input[name="memorableGenMethod"]:checked'
    );
    if (checkedMethod) {
      checkedMethod.dispatchEvent(new Event("change"));
    }
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (openBtn) openBtn.addEventListener("click", (e) => { e.preventDefault(); openModal(); });
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Close on overlay click (outside modal)
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeModal();
    }
  });
});

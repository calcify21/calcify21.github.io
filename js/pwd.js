const sliderValue = document.getElementById("passwordLength");
sliderValue.addEventListener("input", function () {
  document.getElementById("length").textContent = sliderValue.value;
});

function generatePassword() {
  const length = sliderValue.value;
  const includeLowercase = document.getElementById("include-lowercase").checked;
  const includeUppercase = document.getElementById("include-uppercase").checked;
  const includeNumbers = document.getElementById("include-numbers").checked;
  const includeSymbols = document.getElementById(
    "include-specialChars"
  ).checked;

  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+{}[]<>?,.";

  let characterPool = "";
  if (includeLowercase) characterPool += lowercase;
  if (includeUppercase) characterPool += uppercase;
  if (includeNumbers) characterPool += numbers;
  if (includeSymbols) characterPool += symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  typewriter(password);
}

function decreaseLength() {
  sliderValue.value = parseInt(sliderValue.value) - 1; // Convert to number and then subtract 1
  document.getElementById("length").textContent = sliderValue.value;
  generatePassword();
}

function increaseLength() {
  sliderValue.value = parseInt(sliderValue.value) + 1; // Convert to number and then add 1
  document.getElementById("length").textContent = sliderValue.value;
  generatePassword();
}

function typewriter(pwd) {
  let generatedPwd = document.getElementById("generatedPwd");
  generatedPwd.value = "";

  let i = 0;

  function type() {
    if (i < pwd.length) {
      generatedPwd.value += pwd[i];
      i++;
      setTimeout(type, 40);
    }
  }

  type();
}

function typewriter2(pwd) {
  let generatedPwd = document.getElementById("generatedPwd2");
  generatedPwd.value = "";

  let i = 0;

  function type() {
    if (i < pwd.length) {
      generatedPwd.value += pwd[i];
      i++;
      setTimeout(type, 40);
    }
  }

  type();
}

function copyPassword(password) {
  const toast1 = document.getElementById("copied");
  const toast2 = document.getElementById("nopwd");
  const toast3 = document.getElementById("err");

  if (!password) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast2);
    toastBootstrap.show();
    return;
  }

  // Proceed with clipboard copy
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        // alert('Password copied to clipboard!');
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast1);
        toastBootstrap.show();
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        // alert('Failed to copy password. Check browser permissions or HTTPS.');
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast3);
        toastBootstrap.show();
      });
  } else {
    alert("Clipboard API not supported in this browser. Please copy manually.");
  }
}

const checkboxes = document.querySelectorAll(".controlled-checkbox");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const checkedCheckboxes = [...checkboxes].filter((cb) => cb.checked);
    if (checkedCheckboxes.length === 0) {
      checkbox.checked = true;
    }
  });
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateMemorablePassword() {
  let word = document.getElementById("name1").value.replace(/\s/g, "");

  if (!word || word.length < 3) {
    alert("Please enter a valid name with at least 3 characters.");
    return;
  }

  const symbols = "!@#$%^&*_+?";

  function getRandomElement(str) {
    return str[Math.floor(Math.random() * str.length)];
  }

  function getRandomNameSegment(name) {
    let start = Math.floor(Math.random() * (name.length - 2));
    return capitalize(name.slice(start, start + 3));
  }

  function getRandomNumberSegment() {
    return Math.floor(100 + Math.random() * 900);
  }

  const patterns = [
    `${getRandomNameSegment(
      word
    )}@${getRandomNumberSegment()}${getRandomElement(symbols)}`,

    `${getRandomElement(symbols)}${getRandomNameSegment(word)}${Math.floor(
      100 + Math.random() * 900
    )}`,

    `${getRandomNameSegment(word)}${getRandomElement(
      symbols
    )}${getRandomNumberSegment()}`,

    `${getRandomNameSegment(word)}${getRandomElement(
      symbols
    )}${getRandomNumberSegment()}${getRandomElement(symbols)}`,

    `${getRandomNameSegment(word)}${getRandomElement(symbols)}${Math.floor(
      1000 + Math.random() * 9000
    )}`,
  ];

  const password = patterns[Math.floor(Math.random() * patterns.length)];
  if (password.endsWith("_" || "+")) {
    generateMemorablePassword();
  }
  typewriter2(password);
}

function clearModal() {
  document.getElementById("generatedPwd2").value = "";
  document.getElementById("name1").value = "";
}

window.addEventListener("load", () => {
  document.getElementById("length").textContent = sliderValue.value;
  generatePassword();
});

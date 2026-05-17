// ==========================================
// Programmer Calculator Logic
// Full two-operand bitwise support
// ==========================================

let currentBase = "HEX";
let currentValue = 0n;

// Two-operand state
let storedValue = null; // First operand (BigInt)
let pendingOp = null; // "AND" | "OR" | "XOR"
let awaitingSecond = false;

const mainInput = document.getElementById("mainInput");
const labels = {
  HEX: document.getElementById("labelHEX"),
  DEC: document.getElementById("labelDEC"),
  OCT: document.getElementById("labelOCT"),
  BIN: document.getElementById("labelBIN"),
};
const opIndicator = document.getElementById("opIndicator");

const keys = document.querySelectorAll(".key-btn");

function setBase(base) {
  currentBase = base;
  document
    .querySelectorAll(".base-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById(`btnBtn${base}`).classList.add("active");
  updateKeyboard();
  syncDisplay();
}

function updateKeyboard() {
  keys.forEach((key) => {
    if (
      key.classList.contains("op") ||
      key.classList.contains("danger") ||
      key.classList.contains("equals") ||
      key.innerText === "0" ||
      key.innerHTML.includes("delete-left")
    ) {
      key.disabled = false;
      return;
    }

    const val = key.innerText;
    let allowed = false;

    if (currentBase === "BIN") allowed = val === "0" || val === "1";
    else if (currentBase === "OCT") allowed = /[0-7]/.test(val);
    else if (currentBase === "DEC") allowed = /[0-9]/.test(val);
    else if (currentBase === "HEX") allowed = /[0-9A-F]/.test(val);

    key.disabled = !allowed;
  });
}

function handleInput() {
  const val = mainInput.value.trim();
  if (val === "") {
    currentValue = 0n;
  } else {
    try {
      const radix = getRadix(currentBase);
      if (currentBase === "DEC") currentValue = BigInt(val);
      else currentValue = BigInt(parseInt(val, radix) || 0);
    } catch (e) {
      // Invalid input – ignore
    }
  }
  syncDisplay();
}

function getRadix(base) {
  switch (base) {
    case "HEX":
      return 16;
    case "DEC":
      return 10;
    case "OCT":
      return 8;
    case "BIN":
      return 2;
    default:
      return 10;
  }
}

function press(char) {
  // If we just selected an operation, clear the input for the second number
  if (awaitingSecond) {
    mainInput.value = "";
    awaitingSecond = false;
  }
  if (mainInput.value === "0") mainInput.value = "";
  mainInput.value += char;
  handleInput();
}

function backspace() {
  mainInput.value = mainInput.value.slice(0, -1);
  if (mainInput.value === "") mainInput.value = "0";
  handleInput();
}

function clearAll() {
  mainInput.value = "0";
  currentValue = 0n;
  storedValue = null;
  pendingOp = null;
  awaitingSecond = false;
  updateOpIndicator("");
  syncDisplay();
}

function syncDisplay() {
  labels.HEX.innerText = currentValue.toString(16).toUpperCase();
  labels.DEC.innerText = currentValue.toString(10);
  labels.OCT.innerText = currentValue.toString(8);
  labels.BIN.innerText = currentValue.toString(2);

  const currentMain = currentValue.toString(getRadix(currentBase));
  if (currentBase === "HEX") mainInput.value = currentMain.toUpperCase();
  else mainInput.value = currentMain;
}

function updateOpIndicator(text) {
  if (opIndicator) {
    opIndicator.innerText = text;
    opIndicator.style.display = text ? "inline-block" : "none";
  }
}

function bitwise(op) {
  // === Unary operations (immediate) ===
  if (op === "NOT") {
    currentValue = ~currentValue;
    syncDisplay();
    return;
  }
  if (op === "LSH") {
    currentValue = currentValue << 1n;
    syncDisplay();
    return;
  }
  if (op === "RSH") {
    currentValue = currentValue >> 1n;
    syncDisplay();
    return;
  }

  // === Two-operand operations (AND, OR, XOR) ===
  // If there's already a pending operation, evaluate it first
  if (pendingOp && storedValue !== null && !awaitingSecond) {
    currentValue = evaluate(storedValue, currentValue, pendingOp);
    syncDisplay();
  }

  // Store current value and set pending operation
  storedValue = currentValue;
  pendingOp = op;
  awaitingSecond = true;
  updateOpIndicator(op);
}

function evaluate(a, b, op) {
  switch (op) {
    case "AND":
      return a & b;
    case "OR":
      return a | b;
    case "XOR":
      return a ^ b;
    default:
      return b;
  }
}

function equalsPressed() {
  if (pendingOp && storedValue !== null) {
    currentValue = evaluate(storedValue, currentValue, pendingOp);
    storedValue = null;
    pendingOp = null;
    awaitingSecond = false;
    updateOpIndicator("");
    syncDisplay();
  }
}

// Common bridge for toast (uses global showToast from common.js)
function triggerToast(msg) {
  if (typeof showToast === "function") {
    showToast(msg);
  } else {
    alert(msg);
  }
}

// Init
window.onload = () => {
  updateKeyboard();
  syncDisplay();
};

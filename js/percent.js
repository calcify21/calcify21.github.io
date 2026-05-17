// ============================================================
// PERCENT.JS — Percentage calculator logic
// Refactored: uses custom showToast, no Bootstrap dependency
// ============================================================

function checksolve1(event) {
  if (event.keyCode === 13) {
    percentof();
  }
}

function checksolve2(event) {
  if (event.keyCode === 13) {
    check();
  }
}

function percentof() {
  let num1 = document.getElementById("val1").value;
  let num2 = document.getElementById("val2").value;
  let resultdiv = document.getElementById("result1");
  resultdiv.style.display = "block";

  if (num1 == "" || num2 == "") {
    resultdiv.textContent = "Please enter both the values correctly.";
    resultdiv.classList.remove("alert-success");
    resultdiv.classList.add("alert-danger");
  } else {
    resultdiv.classList.add("alert-success");
    resultdiv.classList.remove("alert-danger");
    let result = (num1 / 100) * num2;
    resultdiv.textContent = `${num1}% of ${num2} is ${result}`;
  }
}

function increasepercent() {
  let num1 = document.getElementById("val3").value;
  let num2 = document.getElementById("val4").value;
  let resultdiv = document.getElementById("result2");
  resultdiv.style.display = "block";

  if (num1 == "" || num2 == "") {
    resultdiv.textContent = "Please enter both the values correctly.";
    resultdiv.classList.remove("alert-success");
    resultdiv.classList.add("alert-danger");
  } else {
    resultdiv.classList.add("alert-success");
    resultdiv.classList.remove("alert-danger");
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result = (num1 * num2) / 100 + num1;
    resultdiv.textContent = `${num1} + ${num2}% is ${result}`;
  }
}

function decreasepercent() {
  let num1 = document.getElementById("val3").value;
  let num2 = document.getElementById("val4").value;
  let resultdiv = document.getElementById("result2");
  resultdiv.style.display = "block";

  if (num1 == "" || num2 == "") {
    resultdiv.classList.remove("alert-success");
    resultdiv.classList.add("alert-danger");
    resultdiv.textContent = "Please enter both the values correctly.";
  } else {
    resultdiv.classList.add("alert-success");
    resultdiv.classList.remove("alert-danger");
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result = num1 - (num1 * num2) / 100;
    resultdiv.textContent = `${num1} - ${num2}% is ${result}`;
  }
}

function check() {
  let select = document.getElementById("select-operator");
  let selected = select.options[select.selectedIndex].value;
  if (selected == "+") {
    increasepercent();
  } else {
    decreasepercent();
  }
}

function resetbtn1() {
  let result = document.getElementById("result1");
  result.style.display = "none";
}

function resetbtn2() {
  let result = document.getElementById("result2");
  result.style.display = "none";
}

const toastTrigger = document.getElementById("reset1");
const toastTrigger2 = document.getElementById("reset2");

function tryShowToast() {
  if (typeof showToast === "function") {
    showToast("Form cleared!", "info");
  }
}

if (toastTrigger) {
  toastTrigger.addEventListener("click", tryShowToast);
}

if (toastTrigger2) {
  toastTrigger2.addEventListener("click", tryShowToast);
}

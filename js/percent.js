// * When the user presses enter, calculate the increase or decrease percentage of a number
function checksolve2(event) {
  if (event.keyCode === 13) {
    check();
  }
}

// * Calculate the percentage of a number
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

// * Calculate increase percentage
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

// * Calculate decrease percentage
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

// * Check whether to calculate increase or decrease percentage
function check() {
  let select = document.getElementById("select-operator");
  let selected = select.options[select.selectedIndex].value;
  if (selected == "+") {
    increasepercent();
  } else {
    decreasepercent();
  }
}

// * Reset the result div when the user clicks on the reset button
function reset1() {
  let result = document.getElementById("result1");
  result.style.display = "none";
}

// * Reset the result div when the user clicks on the reset button
function reset2() {
  let result = document.getElementById("result2");
  result.style.display = "none";
}
function toggleCalc(calc) {
  document.querySelectorAll(".calcs").forEach(calc => {
    calc.style.display = "none";
  });
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });
  if (calc == "rect") {
    document.getElementById("rect_form").style.display = "block";
    document.getElementById("rectTab").classList.add("active");
  }
  if (calc == "sq") {
    document.getElementById("sq_form").style.display = "block";
    document.getElementById("sqTab").classList.add("active");
  }
  if (calc == "para") {
    document.getElementById("para_form").style.display = "block";
    document.getElementById("paraTab").classList.add("active");
  }
  if (calc == "quad") {
    document.getElementById("quad_form").style.display = "block";
    document.getElementById("quadTab").classList.add("active");
  }
}

function arearect() {
  let length = document.getElementById("length").value;
  let width = document.getElementById("width").value;
  let resultdiv = document.getElementById("result1");
  resultdiv.style.display = "block";
  if (length == "" || width == "") {
    resultdiv.classList.remove("alert-success");
    resultdiv.classList.add("alert-danger");
    resultdiv.textContent =
      "Please enter the length and width of the rectangle correctly.";
  } else {
    resultdiv.classList.add("alert-success");
    resultdiv.classList.remove("alert-danger");
    let area = length * width;
    resultdiv.textContent = `The area of the rectangle is ${area} square units.`;
  }
}

function areapara() {
  let base = document.getElementById("base").value;
  let height = document.getElementById("h").value;
  let resultdiv = document.getElementById("result4");
  resultdiv.style.display = "block";
  if (base == "" || height == "") {
    resultdiv.classList.remove("alert-success");
    resultdiv.classList.add("alert-danger");
    resultdiv.textContent =
      "Please enter the base and height of the parallelogram correctly.";
  } else {
    resultdiv.classList.add("alert-success");
    resultdiv.classList.remove("alert-danger");
    let area = base * height;
    resultdiv.textContent = `The area of the parallelogram is ${area} square units.`;
  }
}

function areasq() {
  let side = document.getElementById("side").value;
  let resultdiv = document.getElementById("result2");
  resultdiv.style.display = "block";
  if (side == "") {
    resultdiv.classList.remove("alert-success");
    resultdiv.classList.add("alert-danger");
    resultdiv.textContent = "Please enter the side of the square correctly.";
  } else {
    resultdiv.classList.add("alert-success");
    resultdiv.classList.remove("alert-danger");
    let area = side * side;
    resultdiv.textContent = `The area of the square is ${area} square units.`;
  }
}
function areaquad() {
  let d = document.getElementById("diagonal").value;
  let h1 = document.getElementById("height1").value;
  let h2 = document.getElementById("height2").value;
  let resultdiv = document.getElementById("result3");
  resultdiv.style.display = "block";
  if (d == "" || h1 == "" || h2 == "") {
    resultdiv.classList.remove("alert-success");
    resultdiv.classList.add("alert-danger");
    resultdiv.textContent = "Please enter the values correctly.";
  } else {
    resultdiv.classList.add("alert-success");
    resultdiv.classList.remove("alert-danger");
    let area = (d * h1) / 2 + (d * h2) / 2;
    resultdiv.textContent = `The area of the quadrilateral is ${area} square units.`;
  }
}

function checksolve1(event) {
  if (event.keyCode == 13) {
    arearect();
  }
}

function checksolve2(event) {
  if (event.keyCode == 13) {
    areasq();
  }
}

function checksolve3(event) {
  if (event.keyCode == 13) {
    areaquad();
  }
}

function checksolve4(event) {
  if (event.keyCode == 13) {
    areapara();
  }
}

function reset_sq() {
  let side = document.getElementById("side");
  let resultdiv = document.getElementById("result2");
  side.value = "";
  resultdiv.style.display = "none";
}

function reset_rect() {
  let resultdiv = document.getElementById("result1");
  resultdiv.style.display = "none";
}

function reset_quad() {
  let resultdiv = document.getElementById("result3");
  resultdiv.style.display = "none";
}

function reset_para() {
  let resultdiv = document.getElementById("result4");
  resultdiv.style.display = "none";
}

const toastTrigger = document.getElementById('reset1')
const toastTrigger2 = document.getElementById('reset2')
const toastTrigger3 = document.getElementById('reset3')
const toastTrigger4 = document.getElementById('reset4')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

if (toastTrigger2) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger2.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

if (toastTrigger3) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger3.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

if (toastTrigger4) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger4.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

function toggleCalc(calc) {
  document.querySelectorAll(".calcs").forEach((calc) => {
    calc.style.display = "none";
  });
  document.querySelectorAll(".tab").forEach((tab) => {
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
  if (calc == "circle") {
    document.getElementById("circle_form").style.display = "block";
    document.getElementById("circleTab").classList.add("active");
  }
  if (calc == "tri") {
    document.getElementById("tri_form").style.display = "block";
    document.getElementById("triTab").classList.add("active");
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
    resultdiv.textContent = "Please enter the values correctly.";
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
    ("Please enter the values correctly.");
  } else {
    resultdiv.classList.add("alert-success");
    resultdiv.classList.remove("alert-danger");
    let area = base * height;
    resultdiv.textContent = `The area of the parallelogram is ${area} square units.`;
  }
}

function areatri() {
  let base = document.getElementById("base2").value;
  let height = document.getElementById("h2").value;
  let resultdiv = document.getElementById("result5");
  resultdiv.style.display = "block";
  if (base == "" || height == "") {
    resultdiv.classList.remove("alert-success");
    resultdiv.classList.add("alert-danger");
    resultdiv.textContent = "Please enter the values correctly.";
  } else {
    resultdiv.classList.add("alert-success");
    resultdiv.classList.remove("alert-danger");
    let area = base * height * 0.5;
    resultdiv.textContent = `The area of the triangle is ${area} square units.`;
  }
}

function areatri2() {
  let s1 = document.getElementById("side1").value;
  let s2 = document.getElementById("side2").value;
  let s3 = document.getElementById("side3").value;
  let resultdiv = document.getElementById("result6");
  resultdiv.style.display = "block";

  if (s1 == "" || s2 == "" || s3 == "") {
    resultdiv.classList.replace("alert-success", "alert-danger");
    resultdiv.textContent = "Please enter the values correctly.";
  } else {
    let s = (s1 + s2 + s3) / 2;
    resultdiv.classList.replace("alert-danger", "alert-success");
    let area = Math.sqrt(s * (s - s1) * (s - s2) * (s - s3));
    resultdiv.textContent = `The area of the triangle is ${area} square units.`;
  }
}

function areasq() {
  let side = document.getElementById("side").value;
  let resultdiv = document.getElementById("result2");
  resultdiv.style.display = "block";
  if (side == "") {
    resultdiv.classList.remove("alert-success");
    resultdiv.classList.add("alert-danger");
    resultdiv.textContent = "Please enter the values correctly.";
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

function areacircle() {
  let r = document.getElementById("radius").value;
  let resultdiv = document.getElementById("result7");
  resultdiv.style.display = "block";
  if (r == "") {
    resultdiv.classList.remove("alert-success");
    resultdiv.classList.add("alert-danger");
    resultdiv.textContent = "Please enter the values correctly.";
  } else {
    resultdiv.classList.add("alert-success");
    resultdiv.classList.remove("alert-danger");
    let area = r * r * Math.PI;
    resultdiv.textContent = `The area of the circle is ${area} square units.`;
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

function checksolve5(event) {
  if (event.keyCode == 13) {
    areatri();
  }
}

function checksolve6(event) {
  if (event.keyCode == 13) {
    areatri2();
  }
}

function checksolve7(event) {
  if (event.keyCode == 13) {
    areacircle();
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

function reset_tri() {
  let resultdiv = document.getElementById("result5");
  resultdiv.style.display = "none";
}

function reset_tri2() {
  let resultdiv = document.getElementById("result6");
  resultdiv.style.display = "none";
}

function reset_circle() {
  let resultdiv = document.getElementById("result7");
  resultdiv.style.display = "none";
}

const toastTrigger = document.getElementById("reset1");
const toastTrigger2 = document.getElementById("reset2");
const toastTrigger3 = document.getElementById("reset3");
const toastTrigger4 = document.getElementById("reset4");
const toastTrigger5 = document.getElementById("reset5");
const toastTrigger6 = document.getElementById("reset6");
const toastTrigger7 = document.getElementById("reset7");
const toastLiveExample = document.getElementById("liveToast");

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger.addEventListener("click", () => {
    toastBootstrap.show();
  });
}

if (toastTrigger2) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger2.addEventListener("click", () => {
    toastBootstrap.show();
  });
}

if (toastTrigger3) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger3.addEventListener("click", () => {
    toastBootstrap.show();
  });
}

if (toastTrigger4) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger4.addEventListener("click", () => {
    toastBootstrap.show();
  });
}

if (toastTrigger5) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger5.addEventListener("click", () => {
    toastBootstrap.show();
  });
}

if (toastTrigger6) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger6.addEventListener("click", () => {
    toastBootstrap.show();
  });
}

if (toastTrigger7) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger7.addEventListener("click", () => {
    toastBootstrap.show();
  });
}

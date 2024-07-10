// * Find area
function check() {
  let select = document.getElementById("select-shape");
  let selected = select.options[select.selectedIndex].value;
  if (selected == "rect") {
    let rect_form = document.getElementById("rect_form");
    rect_form.style.display = "block";
    let sq_form = document.getElementById("sq_form");
    sq_form.style.display = "none";
    let quad_form = document.getElementById("quad_form");
    quad_form.style.display = "none";
    let para_form = document.getElementById("para_form");
    para_form.style.display = "none";
  } else if (selected == "sq") {
    let rect_form = document.getElementById("rect_form");
    rect_form.style.display = "none";
    let sq_form = document.getElementById("sq_form");
    sq_form.style.display = "block";
    let quad_form = document.getElementById("quad_form");
    quad_form.style.display = "none";
    let para_form = document.getElementById("para_form");
    para_form.style.display = "none";
  } else if (selected == "quad") {
    let quad_form = document.getElementById("quad_form");
    quad_form.style.display = "block";
    let rect_form = document.getElementById("rect_form");
    rect_form.style.display = "none";
    let sq_form = document.getElementById("sq_form");
    sq_form.style.display = "none";
    let para_form = document.getElementById("para_form");
    para_form.style.display = "none";
  } else if (selected == "para") {
    let para_form = document.getElementById("para_form");
    para_form.style.display = "block";
    let rect_form = document.getElementById("rect_form");
    rect_form.style.display = "none";
    let sq_form = document.getElementById("sq_form");
    sq_form.style.display = "none";
    let quad_form = document.getElementById("quad_form");
    quad_form.style.display = "none";
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
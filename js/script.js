const screen = document.getElementById("screen");

// * Display on screen
function show(val) {
  screen.value += val;
  updateScreen();
}

// * Clear
function clr() {
  screen.value = "";
}

// *  Keep the input field scrolled to the right
function updateScreen() {
  // Scrolls the input field to the far right, ensuring the newest numbers are always visible
  screen.scrollLeft = screen.scrollWidth;
}

// * Evaluate
function solve() {
  // let result = eval(screen.value);
  // screen.value = result;
  if (screen.value.includes("^")) {
    result = eval(screen.value.replace("^", "**"));
    screen.value = result;
  } else {
    screen.value = eval(screen.value);
  }
}

// * Check for enter or equal button click
function checksolve(event) {
  if (event.keyCode === 13) {
    solve();
  }
}

// * Backspace
function back() {
  todisp = screen.value.substring(0, screen.value.length - 1);
  screen.value = todisp;
}

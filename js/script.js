// ==========================================
// Calculator Manager Architecture
// ==========================================

class CalculatorManager {
  constructor() {
    this.activeCalculator = "basic"; // Default
    this.historyManager = new HistoryManager();
    this.basicScreen = document.getElementById("screen");
    this.sciScreen = document.getElementById("sci-screen");
    this.sciError = document.getElementById("sci-error");
    this.degRadToggle = document.getElementById("deg-rad-toggle");

    this.initKeyboardSupport();
  }

  setActive(type) {
    this.activeCalculator = type;
    const basicCalc = document.getElementById("basic-calculator");
    const sciCalc = document.getElementById("sci-calculator");
    const btnBasic = document.getElementById("btn-basic");
    const btnSci = document.getElementById("btn-sci");

    if (type === "basic") {
      basicCalc.classList.remove("hidden");
      sciCalc.classList.add("hidden");

      btnBasic.classList.add("active");
      btnSci.classList.remove("active");
    } else {
      basicCalc.classList.add("hidden");
      sciCalc.classList.remove("hidden");

      btnSci.classList.add("active");
      btnBasic.classList.remove("active");
    }
  }

  // --- Basic Functions ---
  showBasic(val) {
    this.basicScreen.value += val;
    this.updateBasicScreen();
  }

  clrBasic() {
    this.basicScreen.value = "";
  }

  updateBasicScreen() {
    this.basicScreen.scrollLeft = this.basicScreen.scrollWidth;
  }

  backBasic() {
    this.basicScreen.value = this.basicScreen.value.slice(0, -1);
  }

  solveBasic() {
    let expr = this.basicScreen.value;
    if (!expr.trim()) return;
    try {
      let result;
      // Evaluate basic safely using math.js or fallback to eval processing
      if (expr.includes("^")) {
        result = eval(expr.replace("^", "**"));
      } else {
        result = eval(expr);
      }

      this.historyManager.add("basic", expr, result);
      this.basicScreen.value = result;
    } catch (e) {
      this.basicScreen.value = "Error";
    }
  }

  // --- Scientific Functions ---
  showSci(val) {
    this.sciError.textContent = "";
    this.sciScreen.value += val;
    this.updateSciScreen();
  }

  clrSci() {
    this.sciError.textContent = "";
    this.sciScreen.value = "";
  }

  updateSciScreen() {
    this.sciScreen.scrollLeft = this.sciScreen.scrollWidth;
  }

  backSci() {
    this.sciError.textContent = "";
    this.sciScreen.value = this.sciScreen.value.slice(0, -1);
  }

  solveSci() {
    this.sciError.textContent = "";
    let expr = this.sciScreen.value;
    if (!expr.trim()) return;

    try {
      // 1. Validation Before Evaluation (check for empty parenthesis or obvious syntax breaks initially not caught well)
      if (expr.includes("()")) throw new Error("Invalid Syntax");

      const isDeg = this.degRadToggle.checked;

      // 2. Custom Scope for Degrees and safe math Evaluation
      let scope = {};
      if (isDeg) {
        scope.sin = (x) => math.sin((x * math.pi) / 180);
        scope.cos = (x) => math.cos((x * math.pi) / 180);
        scope.tan = (x) => math.tan((x * math.pi) / 180);
        scope.asin = (x) => (math.asin(x) * 180) / math.pi;
        scope.acos = (x) => (math.acos(x) * 180) / math.pi;
        scope.atan = (x) => (math.atan(x) * 180) / math.pi;
      } else {
        scope.sin = math.sin;
        scope.cos = math.cos;
        scope.tan = math.tan;
        scope.asin = math.asin;
        scope.acos = math.acos;
        scope.atan = math.atan;
      }
      scope.log = math.log;
      scope.log10 = math.log10;
      scope.sqrt = math.sqrt;
      scope.cbrt = math.cbrt;
      scope.abs = math.abs;
      scope.pi = math.pi;
      scope.e = math.e;

      // Custom Factorial Validation (Integer Only)
      const originalFactorial = math.factorial;
      math.import(
        {
          factorial: function (n) {
            if (n < 0 || !Number.isInteger(n)) {
              throw new Error("Factorial only works for positive integers");
            }
            return originalFactorial(n);
          },
        },
        { override: true },
      );

      // Evaluate
      let result = math.evaluate(expr, scope);

      // Validation Check after eval
      if (result === Infinity || result === -Infinity) {
        throw new Error("Division by zero");
      }

      // 3. Floating Point Precision Cleanup
      if (typeof result === "number") {
        result = math.format(result, { precision: 14 }); // Format to look like a real calculator
        // Format returns a string, parse it back if necessary, but string is fine for screen
      }

      this.historyManager.add("sci", expr, result);
      this.sciScreen.value = result;
    } catch (error) {
      if (error.message.includes("Division by zero")) {
        this.sciError.textContent = "Cannot divide by zero";
      } else if (error.message.includes("Factorial only works")) {
        this.sciError.textContent = "Positive ints only for n!";
      } else {
        // generic syntax error
        this.sciScreen.value = "Invalid Expression";
        setTimeout(() => {
          if (this.sciScreen.value === "Invalid Expression")
            this.sciScreen.value = expr;
        }, 1500);
      }
    }
  }

  // --- Keyboard Handling ---
  initKeyboardSupport() {
    document.addEventListener("keydown", (event) => {
      const isSciActive =
        this.activeCalculator === "scientific" ||
        this.activeCalculator === "sci";
      const activeScreen = isSciActive ? this.sciScreen : this.basicScreen;

      if (document.activeElement !== activeScreen) {
        const validKeys = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "+",
          "-",
          "*",
          "/",
          ".",
          "^",
          "(",
          ")",
          "!",
        ];
        if (validKeys.includes(event.key)) {
          activeScreen.value += event.key;
          isSciActive ? this.updateSciScreen() : this.updateBasicScreen();
          event.preventDefault();
        } else if (event.key === "Enter" || event.key === "=") {
          isSciActive ? this.solveSci() : this.solveBasic();
          event.preventDefault();
        } else if (event.key === "Backspace") {
          activeScreen.value = activeScreen.value.slice(0, -1);
          event.preventDefault();
        } else if (event.key === "Escape") {
          isSciActive ? this.clrSci() : this.clrBasic();
          event.preventDefault();
        }
      } else {
        // Input is focused
        if (event.key === "Escape") {
          isSciActive ? this.clrSci() : this.clrBasic();
          event.preventDefault();
        } else if (event.key === "Enter" || event.key === "=") {
          isSciActive ? this.solveSci() : this.solveBasic();
          event.preventDefault();
        }
      }
    });
  }
}

// ==========================================
// History Manager
// ==========================================
class HistoryManager {
  constructor() {
    this.basicHistory = [];
    this.sciHistory = [];
    this.basicHistoryUI = document.getElementById("basic-history");
    this.sciHistoryUI = document.getElementById("sci-history");
  }

  add(type, expr, result) {
    if (type === "basic") {
      this.basicHistory.push({ expr, result });
      this.updateUI("basic");
    } else {
      this.sciHistory.push({ expr, result });
      this.updateUI("sci");
    }
  }

  updateUI(type) {
    const historyArr = type === "basic" ? this.basicHistory : this.sciHistory;
    const uiElement =
      type === "basic" ? this.basicHistoryUI : this.sciHistoryUI;

    // Clear and redraw
    uiElement.innerHTML = "";

    // Show only if there are items
    if (historyArr.length > 0) {
      uiElement.classList.remove("hidden");
    }

    // Reverse to show latest first
    const reversed = [...historyArr].reverse();

    reversed.forEach((item) => {
      const div = document.createElement("div");
      div.className = "calc-history-item";
      div.innerHTML = `<span>${item.expr} = </span><span class="font-bold text-[var(--accent)]">${item.result}</span>`;
      uiElement.appendChild(div);
    });
  }
}

// ==========================================
// Initialize application
// ==========================================
const appManager = new CalculatorManager();

// Global Bridge Functions for inline HTML onclick handlers
function switchCalc(type) {
  appManager.setActive(type);
}

function show(val) {
  appManager.showBasic(val);
}
function clr() {
  appManager.clrBasic();
}
function back() {
  appManager.backBasic();
}
function solve() {
  appManager.solveBasic();
}
function checksolve(event) {
  if (event.key === "Enter") appManager.solveBasic();
}

function showSci(val) {
  appManager.showSci(val);
}
function clrSci() {
  appManager.clrSci();
}
function backSci() {
  appManager.backSci();
}
function solveSci() {
  appManager.solveSci();
}
function checksolveSci(event) {
  if (event.key === "Enter") appManager.solveSci();
}

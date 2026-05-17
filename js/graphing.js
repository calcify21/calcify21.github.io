// ==========================================
// Graphing Calculator Engine (Plotly + Math.js)
// ==========================================

const inputField = document.getElementById("equationInput");
const errorAlert = document.getElementById("graphError");
const errorText = document.getElementById("graphErrorText");
const canvasId = "plotlyCanvas";

// Setup Initial Empty Graph
function initGraph() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const gridColor = isDark ? "#334155" : "#e2e8f0";
  const textColor = isDark ? "#94a3b8" : "#64748b";

  const layout = {
    margin: { l: 40, r: 20, t: 30, b: 40 },
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    hovermode: "x",
    xaxis: {
      range: [-10, 10],
      zerolinecolor: isDark ? "#475569" : "#cbd5e1",
      gridcolor: gridColor,
      tickfont: { color: textColor },
    },
    yaxis: {
      range: [-10, 10],
      zerolinecolor: isDark ? "#475569" : "#cbd5e1",
      gridcolor: gridColor,
      tickfont: { color: textColor },
    },
  };

  const config = { responsive: true, displayModeBar: false };
  Plotly.newPlot(canvasId, [], layout, config);
}

// Generate X / Y datasets matching expression securely using Math.js
function plotGraph() {
  const exprString = inputField.value.trim();
  errorAlert.classList.add("hidden");

  if (!exprString) return;

  try {
    const node = math.parse(exprString);
    const code = node.compile();

    let xValues = [];
    let yValues = [];

    // Evaluate range [-50, 50] with highly granular step
    for (let x = -50; x <= 50; x += 0.1) {
      let y;
      try {
        y = code.evaluate({ x: x });
      } catch (err) {
        continue; // e.g., complex num out of domain for sqrt(-x)
      }

      // Ignore infinites or complex targets
      if (typeof y === "number" && isFinite(y)) {
        xValues.push(x);
        yValues.push(y);
      } else {
        // Break line visually for undefined spots in plotly by passing null
        xValues.push(x);
        yValues.push(null);
      }
    }

    const trace = {
      x: xValues,
      y: yValues,
      type: "scatter",
      mode: "lines",
      line: {
        color: "#f39c12", // Primary Accent
        width: 3,
        shape: "spline",
      },
      name: "f(x)",
    };

    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";
    const gridColor = isDark ? "#334155" : "#e2e8f0";
    const textColor = isDark ? "#94a3b8" : "#64748b";

    const layout = {
      margin: { l: 40, r: 20, t: 30, b: 40 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      hovermode: "closest",
      xaxis: {
        range: [-10, 10], // Default zoom still focused near origin
        zerolinecolor: isDark ? "#475569" : "#cbd5e1",
        gridcolor: gridColor,
        tickfont: { color: textColor },
      },
      yaxis: {
        range: [-10, 10],
        zerolinecolor: isDark ? "#475569" : "#cbd5e1",
        gridcolor: gridColor,
        tickfont: { color: textColor },
      },
    };

    const config = { responsive: true, displayModeBar: false };
    Plotly.react(canvasId, [trace], layout, config);
  } catch (err) {
    console.error(err);
    errorText.innerText =
      "Syntax Error: Ensure you use an algebraic format like 'sin(x)', 'x^2', or '2*x + 5'.";
    errorAlert.classList.remove("hidden");
  }
}

// Support keybindings
function handleGraphEnter(event) {
  if (event.key === "Enter") {
    plotGraph();
  }
}

// Populate Quick Action
function quickPlot(eq) {
  inputField.value = eq;
  plotGraph();
}

// Watch Theme Changes Dynamically and React Graph UI
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === "data-theme") {
      if (inputField.value.trim() !== "") {
        plotGraph(); // Re-plot with new theme
      } else {
        initGraph();
      }
    }
  });
});

observer.observe(document.documentElement, {
  attributes: true,
});

window.onload = () => {
  initGraph();
};

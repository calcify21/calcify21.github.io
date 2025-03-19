document.addEventListener("DOMContentLoaded", function () {
  var iframe = document.getElementById("gForm");
  var spinner = document.getElementById("spinner");
  var tickContainer = document.querySelector(".tick-container");
  var isFirstLoad = true; // Flag to track initial load

  iframe.onload = function () {
    spinner.style.setProperty("display", "none", "important"); // Hide the spinner once the form is loaded

    // If the iframe loads and it's not the first load, assume the form was submitted
    if (!isFirstLoad) {
      // Hide the iframe (to suppress Google's thank-you message)
      iframe.style.display = "none";

      // Show the custom thank-you message and tick animation
      tickContainer.style.display = "block"; // Display the tick
      setTimeout(function () {
        window.scrollTo(0, 0); // Scroll to the top
      }, 500); // Delay to simulate form submission
    }

    // Mark the first load as done
    isFirstLoad = false;
  };
});

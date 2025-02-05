const form = document.querySelector('#contactUsForm');
// * Add event listener to form submission.
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // * Check form validity
    // Check if the form is valid
    if (!form.checkValidity()) {
        // Stop further execution if the form is invalid.
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    // If form is valid, proceed with custom behavior.
    form.classList.add('was-validated');

    // Show the tick container and hide the form.
    const tickContainer = document.querySelector('.tick-container');
    const contactFormContainer = document.getElementById("contact-form");

    contactFormContainer.style.display = "none";
    tickContainer.style.display = 'block';

    // * Submit form data to Google Sheets
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Collect form data
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phn').value;
    var rating = document.querySelector('input[name="ratingOpt"]:checked').value;
    var message = document.getElementById('message').value;

    // Create JSON object
    const raw = JSON.stringify({
        "name": name,
        "email": email,
        "phone": phone,
        "rating": rating,
        "message": message
    });

    // Set up request options
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        mode: "no-cors"
    };

    // Send data to Google Sheets
    fetch("https://script.google.com/macros/s/AKfycbzt0WhneUmhriorz-RC7Xt7aiL4eiSvsLNX_ga3UjeW1ooyAHibHwTkJgHUbUOM8w0a1Q/exec", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
});

// * Add logic for the "Go Back" button to return to the form and reset it.
document.querySelector(".returnToForm").addEventListener("click", function () {
    const tickContainer = document.querySelector('.tick-container');
    const contactFormContainer = document.getElementById("contact-form");

    // Hide the tick container and show the form.
    tickContainer.style.display = "none";
    contactFormContainer.style.display = "flex";

    // Reset the form.
    const form = document.querySelector('.needs-validation');
    form.reset();

    // Remove validation feedback classes.
    form.classList.remove('was-validated');
});

(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and handle submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault(); // Always prevent default submission initially.

            if (!form.checkValidity()) {
                // Stop further execution if the form is invalid.
                event.stopPropagation();
                form.classList.add('was-validated');
                return;
            }

            // If form is valid, proceed with your custom behavior.
            form.classList.add('was-validated');

            // Show the tick container and hide the form.
            const tickContainer = document.querySelector('.tick-container');
            const contactFormContainer = document.getElementById("contact-form");

            contactFormContainer.style.display = "none";
            tickContainer.style.display = 'block';
        }, false);
    });

    // Add logic for the "Go Back" button to return to the form and reset it.
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
})();

document.getElementById('contactUsForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Collect form data
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phn').value;
    var rating = document.querySelector('input[name="ratingOpt"]:checked').value;
    var message = document.getElementById('message').value;

    const raw = JSON.stringify({
        "name": name,
        "email": email,
        "phone": phone,
        "rating": rating,
        "message": message
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        mode: "no-cors"
    };

    fetch("https://script.google.com/macros/s/AKfycbzt0WhneUmhriorz-RC7Xt7aiL4eiSvsLNX_ga3UjeW1ooyAHibHwTkJgHUbUOM8w0a1Q/exec", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
});
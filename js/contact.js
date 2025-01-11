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

document.getElementById("contactUsForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phn").value,
        rating: document.getElementsByName("inlineRadioOptions").value,
        message: document.getElementById("message").value
    };

    fetch("https://script.google.com/macros/s/AKfycbw6PpxA4Kn5oDj0HFOae3jVw0p8pHdcRvkQjlD0bhrIZRdrMbiF0D_atQ-yRrLr1E4i2w/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
        .then(response => alert("Form submitted successfully!"))
        .catch(error => console.error("Error:", error));
});

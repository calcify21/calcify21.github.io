document.getElementById("submit-btn").addEventListener("click", function () {
    let tickContainer = document.getElementById('tick-container');
    let contactForm = document.getElementById("contact-form");

    event.preventDefault();
    contactForm.style.display = "none";
    tickContainer.style.display = 'block';
})
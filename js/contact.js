const form = document.querySelector("#contactUsForm");

function customValidation() {
  let formOverallValid = true;

  const nameInput = document.getElementById("name");
  const nameInvalidFeedback = nameInput
    .closest(".mb-3")
    .querySelector(".invalid-feedback");

  nameInput.setCustomValidity("");
  if (nameInvalidFeedback) nameInvalidFeedback.textContent = "";

  if (nameInput.value.trim().length < 3) {
    nameInput.setCustomValidity("Name must be at least 3 characters long.");
    if (nameInvalidFeedback) {
      nameInvalidFeedback.textContent =
        "Name must be at least 3 characters long.";
    }
    formOverallValid = false;
  }

  const phoneInput = document.getElementById("phn");
  const phoneValue = phoneInput.value.trim();
  const phoneInvalidFeedback = phoneInput
    .closest(".col")
    .querySelector(".invalid-feedback");

  phoneInput.setCustomValidity("");
  if (phoneInvalidFeedback) phoneInvalidFeedback.textContent = "";

  if (phoneValue !== "") {
    if (phoneValue.startsWith("0")) {
      phoneInput.setCustomValidity("Phone number cannot start with 0.");
      if (phoneInvalidFeedback) {
        phoneInvalidFeedback.textContent = "Phone number cannot start with 0.";
      }
      formOverallValid = false;
    } else if (phoneValue.startsWith("+91")) {
      phoneInput.setCustomValidity("Phone number cannot start with +91.");
      if (phoneInvalidFeedback) {
        phoneInvalidFeedback.textContent =
          "Phone number cannot start with +91.";
      }
      formOverallValid = false;
    } else if (!/^[6-9]\d{9}$/.test(phoneValue)) {
      phoneInput.setCustomValidity(
        "Please enter a valid 10-digit Indian phone number (starts with 6-9)."
      );
      if (phoneInvalidFeedback) {
        phoneInvalidFeedback.textContent =
          "Please enter a valid 10-digit Indian phone number (starts with 6-9).";
      }
      formOverallValid = false;
    }
  }

  return formOverallValid;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  customValidation();

  form.classList.add("was-validated");

  if (!form.checkValidity()) {
    event.stopPropagation();

    const invalidFields = form.querySelectorAll(":invalid");
    invalidFields.forEach((field) => {
      let elementToShake = field;

      if (field.type === "radio" || field.type === "checkbox") {
        elementToShake = field.closest(".form-check");
      } else {
        elementToShake = field.closest(".mb-3") || field.closest(".col");
      }

      if (elementToShake) {
        elementToShake.classList.remove("input-shake");
        void elementToShake.offsetWidth;
        elementToShake.classList.add("input-shake");

        elementToShake.addEventListener(
          "animationend",
          function handler() {
            elementToShake.classList.remove("input-shake");
            elementToShake.removeEventListener("animationend", handler);
          },
          { once: true }
        );
      }
    });

    const firstInvalidField = form.querySelector(":invalid");
    if (firstInvalidField) {
      firstInvalidField.focus();
      firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return;
  }

  const tickContainer = document.querySelector(".tick-container");
  const contactFormContainer = document.getElementById("contact-form");

  contactFormContainer.style.display = "none";
  tickContainer.style.display = "block";

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phn").value;
  const ratingElement = document.querySelector(
    'input[name="ratingOpt"]:checked'
  );
  const rating = ratingElement ? ratingElement.value : "";
  const message = document.getElementById("message").value;

  const raw = JSON.stringify({
    name: name,
    email: email,
    phone: phone,
    rating: rating,
    message: message,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    mode: "no-cors",
  };

  fetch(
    "https://script.google.com/macros/s/AKfycbzt0WhneUmhriorz-RC7Xt7aiL4eiSvsLNX_ga3UjeW1ooyAHibHwTkJgHUbUOM8w0a1Q/exec",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
});

document.querySelector(".returnToForm").addEventListener("click", function () {
  const tickContainer = document.querySelector(".tick-container");
  const contactFormContainer = document.getElementById("contact-form");

  tickContainer.style.display = "none";
  contactFormContainer.style.display = "flex";

  const form = document.querySelector(".needs-validation");
  form.reset();

  form.classList.remove("was-validated");

  document.getElementById("name").setCustomValidity("");
  document.getElementById("phn").setCustomValidity("");
  document.getElementById("email").setCustomValidity("");
  document.getElementById("message").setCustomValidity("");

  form.querySelectorAll(".input-shake").forEach((element) => {
    element.classList.remove("input-shake");
  });
});

function handleRealtimeValidation(inputElement) {
  form.classList.add("was-validated");

  let elementToShakeParent = inputElement;
  if (inputElement.type === "radio" || inputElement.type === "checkbox") {
    elementToShakeParent = inputElement.closest(".form-check");
  } else {
    elementToShakeParent =
      inputElement.closest(".mb-3") || inputElement.closest(".col");
  }

  if (elementToShakeParent) {
    elementToShakeParent.classList.remove("input-shake");
  }

  if (inputElement.id === "name" || inputElement.id === "phn") {
    customValidation();
  }
}

document.getElementById("name").addEventListener("input", function () {
  handleRealtimeValidation(this);
});
document.getElementById("name").addEventListener("blur", function () {
  handleRealtimeValidation(this);
});

document.getElementById("phn").addEventListener("input", function () {
  handleRealtimeValidation(this);
});
document.getElementById("phn").addEventListener("blur", function () {
  handleRealtimeValidation(this);
});

document.getElementById("email").addEventListener("input", function () {
  handleRealtimeValidation(this);
});
document.getElementById("email").addEventListener("blur", function () {
  handleRealtimeValidation(this);
});

document.getElementById("message").addEventListener("input", function () {
  handleRealtimeValidation(this);
});
document.getElementById("message").addEventListener("blur", function () {
  handleRealtimeValidation(this);
});

document.querySelectorAll('input[name="ratingOpt"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    form.classList.add("was-validated");
  });
});

document
  .getElementById("clear-btn")
  .addEventListener("click", function (event) {
    // 1. Prevent the default reset if you want total control,
    // though type="reset" handles the text fields fine.

    // 2. Remove the Bootstrap 'was-validated' checkmarks/red borders
    form.classList.remove("was-validated");

    // 3. Reset custom validation messages so they don't pop up immediately on next type
    document.getElementById("name").setCustomValidity("");
    document.getElementById("phn").setCustomValidity("");

    // 4. Remove any remaining shake classes
    form.querySelectorAll(".input-shake").forEach((element) => {
      element.classList.remove("input-shake");
    });

    console.log("Form cleared and validation states reset.");
  });

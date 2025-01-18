// (() => {
//     'use strict'

//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     const forms = document.querySelectorAll('.needs-validation')

//     // Loop over them and handle submission
//     Array.from(forms).forEach(form => {
//         form.addEventListener('submit', event => {
//             event.preventDefault(); // Always prevent default submission initially.

//             if (!form.checkValidity()) {
//                 // Stop further execution if the form is invalid.
//                 event.stopPropagation();
//                 form.classList.add('was-validated');
//                 return;
//             }

//             // If form is valid, proceed with your custom behavior.
//             form.classList.add('was-validated');

//             // Show the tick container and hide the form.
//             const tickContainer = document.querySelector('.tick-container');
//             const contactFormContainer = document.getElementById("contact-form");

//             contactFormContainer.style.display = "none";
//             tickContainer.style.display = 'block';
//         }, false);
//     });

//     // Add logic for the "Go Back" button to return to the form and reset it.
//     document.querySelector(".returnToForm").addEventListener("click", function () {
//         const tickContainer = document.querySelector('.tick-container');
//         const contactFormContainer = document.getElementById("contact-form");

//         // Hide the tick container and show the form.
//         tickContainer.style.display = "none";
//         contactFormContainer.style.display = "flex";

//         // Reset the form.
//         const form = document.querySelector('.needs-validation');
//         form.reset();

//         // Remove validation feedback classes.
//         form.classList.remove('was-validated');
//     });
// })();

// // document.getElementById("contactUsForm").addEventListener("submit", function (event) {
// //     event.preventDefault();

// //     const formData = {
// //         name: document.getElementById("name").value,
// //         email: document.getElementById("email").value,
// //         phone: document.getElementById("phn").value,
// //         rating: document.getElementsByName("inlineRadioOptions").value,
// //         message: document.getElementById("message").value
// //     };

// //     fetch("https://script.google.com/macros/s/AKfycbw6PpxA4Kn5oDj0HFOae3jVw0p8pHdcRvkQjlD0bhrIZRdrMbiF0D_atQ-yRrLr1E4i2w/exec", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData)
// //     })
// //         .then(response => alert("Form submitted successfully!"))
// //         .catch(error => console.error("Error:", error));
// // });


// // function fetchApiData() {
// //     fetch("https://script.google.com/macros/s/AKfycbw6PpxA4Kn5oDj0HFOae3jVw0p8pHdcRvkQjlD0bhrIZRdrMbiF0D_atQ-yRrLr1E4i2w/exec", {
// //         method: "post",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //             "name": "John",
// //             "age": 30,
// //             "city": "New York"
// //         })
// //     })
// // }

// // Client ID and API key from the Developer Console
// var CLIENT_ID = '509949763452-uka557cikn6hhkrf1pge5brnful9jcbr.apps.googleusercontent.com';
// var API_KEY = 'AIzaSyDBMnR0mPcArgcqefhQY96gzqvK8sUVM90';

// // Array of API discovery doc URLs for APIs used by the quickstart
// var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// // Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
// var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

// /**
//  *  On load, called to load the auth2 library and API client library.
//  */
// function handleClientLoad() {
//     gapi.load('client:auth2', initClient);
// }

// /**
//  *  Initializes the API client library and sets up sign-in state
//  *  listeners.
//  */
// function initClient() {
//     gapi.client.init({
//         apiKey: API_KEY,
//         clientId: CLIENT_ID,
//         discoveryDocs: DISCOVERY_DOCS,
//         scope: SCOPES
//     }).then(function () {
//         // Listen for sign-in state changes.
//         gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

//         // Handle the initial sign-in state.
//         updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//         authorizeButton.onclick = handleAuthClick;
//         signoutButton.onclick = handleSignoutClick;
//     }, function (error) {
//         console.log(JSON.stringify(error, null, 2));
//     });
// }

// /**
//  *  Called when the signed in status changes, to update the UI
//  *  appropriately. After a sign-in, the API is called.
//  */
// function updateSigninStatus(isSignedIn) {
//     if (isSignedIn) {
//         authorizeButton.style.display = 'none';
//         signoutButton.style.display = 'block';
//         document.getElementById('contactForm').style.display = 'block';
//     } else {
//         authorizeButton.style.display = 'block';
//         signoutButton.style.display = 'none';
//         document.getElementById('contactForm').style.display = 'none';
//     }
// }

// /**
//  *  Sign in the user upon button click.
//  */
// function handleAuthClick(event) {
//     gapi.auth2.getAuthInstance().signIn();
// }

// /**
//  *  Sign out the user upon button click.
//  */
// function handleSignoutClick(event) {
//     gapi.auth2.getAuthInstance().signOut();
// }

// /**
//  * Post data to Google Sheets
//  */
// document.getElementById('contactUsForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     let name = document.getElementById("name").value;
//     let email = document.getElementById("email").value;
//     let phone = document.getElementById("phn").value
//     let rating = document.getElementsByName("inlineRadioOptions").value
//     let message = document.getElementById("message").value;

//     gapi.client.sheets.spreadsheets.values.append({
//         spreadsheetId: '1lTslduPrs5wRV2T_xI9b-VpVRxQtIa1nDSLJUlUR_D8',
//         range: 'Sheet1!A2',
//         valueInputOption: 'RAW',
//         insertDataOption: 'INSERT_ROWS',
//         resource: {
//             values: [
//                 [name, email, phone, rating, message]
//             ]
//         }
//     }).then(function (response) {
//         var result = response.result;
//         console.log(`${result.updates.updatedCells} cells appended.`);
//     }, function (error) {
//         console.error('Error: ' + error.result.error.message);
//     });
// });

// // Load the API client and auth2 library
// gapi.load('client:auth2', handleClientLoad);

// document.getElementById('contactUsForm').addEventListener('submit', function (event) {
//     event.preventDefault();

//     // Collect form data
//     var name = document.getElementById('name').value;
//     var email = document.getElementById('email').value;
//     var phone = document.getElementById('phn').value;
//     var rating = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
//     var message = document.getElementById('message').value;

//     // Construct data object
//     var data = {
//         name: name,
//         email: email,
//         phone: phone,
//         rating: rating,
//         message: message
//     };

//     // Send data to Google Apps Script web app
//     fetch('https://script.google.com/macros/s/AKfycbzt0WhneUmhriorz-RC7Xt7aiL4eiSvsLNX_ga3UjeW1ooyAHibHwTkJgHUbUOM8w0a1Q/exec', {
//         method: 'POST',
//         mode: 'cors',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => response.json())
//         .then(result => {
//             if (result.status === 'success') {
//                 // Show the tick container and hide the form.
//                 const tickContainer = document.querySelector('.tick-container');
//                 const contactFormContainer = document.getElementById("contact-form");

//                 contactFormContainer.style.display = "none";
//                 tickContainer.style.display = 'block';
//             } else {
//                 alert('Submission failed. Please try again.');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Submission failed. Please try again.');
//         });
// });

document.getElementById('contactUsForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Collect form data
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phn').value;
    var rating = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
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
        redirect: "follow"
    };

    fetch("https://script.google.com/macros/s/AKfycbzt0WhneUmhriorz-RC7Xt7aiL4eiSvsLNX_ga3UjeW1ooyAHibHwTkJgHUbUOM8w0a1Q/exec", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
});
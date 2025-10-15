document.getElementById("generateBtn").addEventListener("click", function () {
  const qrInput = document.getElementById("qrInput").value;
  const qrSize = parseInt(document.getElementById("qrSize").value, 10);
  const qrCodeDiv = document.getElementById("qrcode");

  // Clear previous QR code
  qrCodeDiv.innerHTML = "";

  const toast = document.getElementById("liveToast");
  if (qrInput) {
    const qrCode = new QRCode(qrCodeDiv, {
      text: qrInput,
      width: qrSize,
      height: qrSize,
    });

    // Show the download button
    document.getElementById("downloadBtn").style.display = "block";

    // Show QR code container
    document.getElementById("qrcode").style.display = "block";
  } else {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
    toastBootstrap.show();
  }
});

// Function to download the QR code as an image
// document.getElementById("downloadBtn").addEventListener("click", function () {
//   const qrCodeImg = document.querySelector("#qrcode img");
//   if (qrCodeImg) {
//     const link = document.createElement("a");
//     link.href = qrCodeImg.src;
//     link.download = "qr_code.png";
//     link.click();
//   } else {
//     document.getElementById("generateBtn").click();
//     document.getElementById("downloadBtn").click();
//   }
// });

// qr.js - Modified download event listener

document.getElementById("downloadBtn").addEventListener("click", function () {
  const qrCodeDiv = document.getElementById("qrcode");
  const qrCodeImg = qrCodeDiv.querySelector("img");
  const qrCodeCanvas = qrCodeDiv.querySelector("canvas");

  let dataURL = null;

  // 1. Prioritize downloading from the canvas (most reliable)
  if (qrCodeCanvas) {
    dataURL = qrCodeCanvas.toDataURL("image/png");
  }
  // 2. Fallback to the image tag (if the library rendered it this way)
  else if (qrCodeImg && qrCodeImg.src) {
    dataURL = qrCodeImg.src;
  }

  if (dataURL) {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "qr_code.png";

    // This is necessary on some browsers to ensure the link is briefly added to the DOM
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
  } else {
    // ... (Your existing toast logic for error handling) ...
    const toast = document.getElementById("liveToast");
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
    document.querySelector(".toast-body").textContent =
      "Please generate the QR code first.";
    toastBootstrap.show();
    // You might want a timeout to reset the toast message later
  }
});

// REMOVE the previous content of the downloadBtn event listener entirely.

// Toast
const toastTrigger = document.getElementById("removeFavoritesBtn");
const toastLiveExample = document.getElementById("liveToast");

if (document.querySelector("#removeFavoritesBtn")) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastTrigger.addEventListener("click", () => {
    toastBootstrap.show();
  });
}

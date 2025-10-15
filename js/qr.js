// * QR Code Generator & Download

document.getElementById("generateBtn").addEventListener("click", function () {
  const qrInput = document.getElementById("qrInput").value;
  const qrSize = parseInt(document.getElementById("qrSize").value, 10);
  const qrCodeDiv = document.getElementById("qrcode");

  // Get the new file name input container
  const fileNameContainer = document.getElementById("fileNameInputContainer");

  // Clear previous QR code
  qrCodeDiv.innerHTML = "";

  const toast = document.getElementById("liveToast");
  if (qrInput) {
    // Generate the QR code using qrcode.js
    new QRCode(qrCodeDiv, {
      text: qrInput,
      width: qrSize,
      height: qrSize,
    });

    // Show the download button and QR code container (uses style.display as per existing code)
    document.getElementById("downloadBtn").style.display = "block";
    document.getElementById("qrcode").style.display = "block";

    // FIX: Show NEW file name input using classList
    fileNameContainer.classList.remove("d-none");
  } else {
    // Hide all download elements and show the "Please enter text" toast
    document.getElementById("downloadBtn").style.display = "none";
    document.getElementById("qrcode").style.display = "none";

    // FIX: Hide NEW file name input using classList
    fileNameContainer.classList.add("d-none");

    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
    toastBootstrap.show();
  }
});

// Function to download the QR code as an image (using the canvas for reliability)
document.getElementById("downloadBtn").addEventListener("click", function () {
  const qrCodeDiv = document.getElementById("qrcode");
  const qrCodeImg = qrCodeDiv.querySelector("img");
  const qrCodeCanvas = qrCodeDiv.querySelector("canvas");

  // Get the desired file name
  const fileNameInput = document.getElementById("fileNameInput").value.trim();
  // Determine the file name: use input value if provided, otherwise use a default
  const defaultFileName = "qr_code";
  // Sanitization: replace non-alphanumeric/underscore characters with underscore
  let fileName = fileNameInput
    ? fileNameInput.replace(/[^a-z0-9_]+/gi, "_").toLowerCase()
    : defaultFileName;

  let dataURL = null;

  // 1. Prioritize downloading from the canvas
  if (qrCodeCanvas) {
    dataURL = qrCodeCanvas.toDataURL("image/png");
  }
  // 2. Fallback to the image tag
  else if (qrCodeImg && qrCodeImg.src) {
    dataURL = qrCodeImg.src;
  }

  if (dataURL) {
    const link = document.createElement("a");
    link.href = dataURL;
    // Set the download attribute using the generated file name
    link.download = `${fileName}.png`;

    // Necessary to ensure download works reliably on all browsers
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // Show error toast if QR code is not found
    const toast = document.getElementById("liveToast");
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
    document.querySelector(".toast-body").textContent =
      "Please generate the QR code first.";
    toastBootstrap.show();
    setTimeout(() => {
      document.querySelector(".toast-body").textContent =
        "Please enter the text or URL to generate QR Code.";
    }, 3000);
  }
});

// * QR Code Scanner (Reader) Logic

const dropZone = document.getElementById("dropZone");
const qrImageInput = document.getElementById("qrImageInput");
const qrCanvas = document.getElementById("qrCanvas");
const ctx = qrCanvas.getContext("2d");
const scanResultContainer = document.getElementById("scanResultContainer");
const scanResultElement = document.getElementById("scanResult");
const openLinkBtn = document.getElementById("openLinkBtn");

const qrVideo = document.getElementById("qrVideo");
const videoContainer = document.getElementById("videoContainer");
const startScanBtn = document.getElementById("startScanBtn");

let stream = null;
let animationFrameId = null;
let scanning = false;

// --- Helper Functions ---

function displayScanResult(content, isError = false) {
  // Stop camera scan if result is found
  if (!isError && scanning) {
    stopCameraScan();
  }

  // FIX: Use classList to remove d-none
  scanResultContainer.classList.remove("d-none");

  if (isError) {
    scanResultElement.textContent = content;
    scanResultElement.classList.add("text-danger");
    // FIX: Use classList to add d-none
    openLinkBtn.classList.add("d-none");
    openLinkBtn.removeAttribute("href");
  } else {
    scanResultElement.textContent = content;
    scanResultElement.classList.remove("text-danger");

    // Check if the content is a URL to enable the 'Open Link' button
    const isUrl =
      content.startsWith("http://") ||
      content.startsWith("https://") ||
      content.startsWith("www.");

    if (isUrl) {
      // FIX: Use classList to remove d-none
      openLinkBtn.classList.remove("d-none");
      openLinkBtn.href = content.startsWith("http")
        ? content
        : `https://${content}`;
    } else {
      // FIX: Use classList to add d-none
      openLinkBtn.classList.add("d-none");
      openLinkBtn.removeAttribute("href");
    }
  }
}

function showScannerToast(message) {
  const toast = document.getElementById("liveToast");
  const toastBody = toast.querySelector(".toast-body");

  // Temporarily save and change the body text
  const originalText = toastBody.textContent;
  toastBody.textContent = message;

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
  toastBootstrap.show();

  // Reset message after the toast hides
  setTimeout(() => {
    // Only reset if the message hasn't been overwritten by a new toast
    if (toastBody.textContent === message) {
      toastBody.textContent = originalText;
    }
  }, 3000);
}

// --- Image/File Scanning Logic ---

function scanImage(file) {
  if (!file || !file.type.startsWith("image/")) {
    displayScanResult("Please upload a valid image file.", true);
    return;
  }

  // Ensure camera scan is stopped if a file scan is initiated
  if (scanning) stopCameraScan();

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      // Draw image to canvas for jsQR processing
      qrCanvas.width = img.width;
      qrCanvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        displayScanResult(code.data);
        showScannerToast("QR Code successfully scanned from image!");
      } else {
        displayScanResult("No QR Code found in the image.", true);
      }
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// --- Camera Scanning Logic ---

async function startCameraScan() {
  // Hide file scan result when starting camera
  // FIX: Use classList to add d-none
  scanResultContainer.classList.add("d-none");

  try {
    // Request camera access (prefer environment/back camera)
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    qrVideo.srcObject = stream;
    qrVideo.setAttribute("playsinline", true);
    qrVideo.play();

    startScanBtn.textContent = "Stop Camera Scan";
    // FIX: Change class from btn-info to btn-danger
    startScanBtn.classList.replace("btn-info", "btn-danger");
    // FIX: Use classList to remove d-none
    videoContainer.classList.remove("d-none");
    scanning = true;

    qrVideo.onloadedmetadata = () => {
      // Start the continuous scanning loop after video is ready
      scanLoop();
    };
  } catch (err) {
    console.error("Error accessing the camera:", err);
    showScannerToast(
      "Camera access denied or failed. Please check permissions."
    );
    stopCameraScan();
  }
}

function scanLoop() {
  if (!scanning) return;

  if (qrVideo.readyState === qrVideo.HAVE_ENOUGH_DATA) {
    // Draw video frame to canvas
    qrCanvas.height = qrVideo.videoHeight;
    qrCanvas.width = qrVideo.videoWidth;
    ctx.drawImage(qrVideo, 0, 0, qrCanvas.width, qrCanvas.height);

    const imageData = ctx.getImageData(0, 0, qrCanvas.width, qrCanvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      // QR code found!
      displayScanResult(code.data);
      showScannerToast("QR Code successfully scanned from camera!");
      // stopCameraScan() is called inside displayScanResult
    }
  }

  // Schedule the next frame scan
  animationFrameId = requestAnimationFrame(scanLoop);
}

function stopCameraScan() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  scanning = false;

  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }

  // Reset UI
  startScanBtn.textContent = "Scan using Camera";
  // FIX: Change class from btn-danger back to btn-info
  startScanBtn.classList.replace("btn-danger", "btn-info");
  // FIX: Use classList to add d-none
  videoContainer.classList.add("d-none");
}

// --- Event Listeners ---

// 1. Camera Button
startScanBtn.addEventListener("click", () => {
  if (scanning) {
    stopCameraScan();
  } else {
    startCameraScan();
  }
});

// 2. File Upload Button
qrImageInput.addEventListener("change", function (e) {
  if (e.target.files.length > 0) {
    scanImage(e.target.files[0]);
  }
});

// 3. Drag and Drop Functionality
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// Highlight the drop zone when item is dragged over
["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(
    eventName,
    () => dropZone.classList.add("border-primary"),
    false
  );
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(
    eventName,
    () => dropZone.classList.remove("border-primary"),
    false
  );
});

// Handle dropped files
dropZone.addEventListener(
  "drop",
  function (e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
      scanImage(files[0]);
    }
  },
  false
);

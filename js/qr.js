// * QR Code Generator Logic

document.getElementById("generateBtn").addEventListener("click", function () {
  const activeTab = document.querySelector(
    "#qrGeneratorTabs .nav-link.active"
  ).id;
  let finalString = "";

  if (activeTab == "text-tab") {
    finalString = document.getElementById("textInput").value;
  } else if (activeTab == "wifi-tab") {
    // WIFI:S:MyNetwork;T:WPA;P:Password123;;
    finalString = `WIFI:S:${document.getElementById("ssidInput").value};T:${
      document.getElementById("encryptionType").value
    };P:${document.getElementById("wifiPwdInput").value};;`;
  } else if (activeTab == "whatsapp-tab") {
    // https://wa.me/001234567890?text=Hello%20World
    finalString = `https://wa.me/${
      document.getElementById("waCountryCode").value
    }${document.getElementById("waNum").value}?text=${encodeURIComponent(
      document.getElementById("waMsg").value
    )}`;
  } else if (activeTab == "vcard-tab") {
    // BEGIN:VCARD
    // VERSION:3.0
    // FN:John Doe
    // TEL:9876543210
    // END:VCARD
    finalString = `BEGIN:VCARD
VERSION:3.0
FN:${document.getElementById("conName").value.trim()}
TEL:${document.getElementById("conNum").value.trim()}
END:VCARD`;
  } else if (activeTab == "email-tab") {
    // mailto:
    finalString = `mailto:${
      document.getElementById("emailTo").value
    }?subject=${encodeURIComponent(
      document.getElementById("emailSub").value
    )}&body=${encodeURIComponent(document.getElementById("emailBody").value)}`;
  }

  const qrSize = parseInt(document.getElementById("qrSize").value, 10);
  const qrCodeDiv = document.getElementById("qrcode");
  const resultArea = document.getElementById("qrGenerationResult");
  const fileNameContainer = document.getElementById("fileNameInputContainer");

  qrCodeDiv.innerHTML = "";

  if (finalString.trim() !== "") {
    new QRCode(qrCodeDiv, {
      text: finalString,
      width: qrSize,
      height: qrSize,
    });

    // --- ANIMATION LOGIC ---
    resultArea.classList.add("active");
    fileNameContainer.classList.remove("d-none");

    setTimeout(() => {
      resultArea.classList.add("show-animation");
    }, 10);
  } else {
    // ... Hide and reset logic ...
    showToast("Please fill in the fields for the selected tab.");
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
    showToast("Please generate a QR code first.");
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
    openLinkBtn.classList.add("d-none");
    openLinkBtn.removeAttribute("href");
  } else {
    scanResultElement.textContent = content;
    scanResultElement.classList.remove("text-danger");

    // 1. Logic to check for URL without using a complex Regex
    let isUrl = false;
    let finalUrl = "";

    try {
      // If it looks like a domain (has a dot) but lacks a protocol, add https://
      // This handles cases like "google.com" as well as "https://teams.microsoft.com..."
      const testContent = content.match(/^[a-zA-Z0-9]+:\/\//)
        ? content
        : `https://${content}`;

      const urlObj = new URL(testContent);

      // Ensure it has at least a basic domain structure (e.g., example.com)
      isUrl = urlObj.hostname.includes(".");
      finalUrl = testContent;
    } catch (e) {
      isUrl = false;
    }

    // 2. Update UI based on the check
    if (isUrl) {
      openLinkBtn.classList.remove("d-none");
      openLinkBtn.href = finalUrl;
    } else {
      openLinkBtn.classList.add("d-none");
      openLinkBtn.removeAttribute("href");
    }
  }
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
      const qrPreview = document.getElementById("qrPreview");
      const dropZonePrompt = document.getElementById("dropZonePrompt");

      if (qrPreview && dropZonePrompt) {
        qrPreview.src = e.target.result; // Set the image source to the file
        qrPreview.classList.remove("d-none"); // Show the image
        dropZonePrompt.classList.add("d-none"); // Hide the "Drop here" text
      }

      // Draw image to canvas for jsQR processing
      qrCanvas.width = img.width;
      qrCanvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        displayScanResult(code.data);
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
  document.getElementById("qrPreview").classList.add("d-none");
  document.getElementById("dropZonePrompt").classList.remove("d-none");

  // Show the container and start fade-in
  videoContainer.classList.remove("video-hidden");
  videoContainer.classList.remove("d-none");

  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    qrVideo.srcObject = stream;
    qrVideo.setAttribute("playsinline", true);
    qrVideo.play();

    startScanBtn.textContent = "Stop Camera Scan";
    startScanBtn.classList.replace("btn-info", "btn-danger");

    scanning = true;

    qrVideo.onloadedmetadata = () => {
      scanLoop();
    };
  } catch (err) {
    console.error("Error accessing the camera:", err);
    showToast("Camera access denied or failed. Please check permissions.");
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

  // 1. Start the fade-out animation by adding the CSS class
  videoContainer.classList.add("video-hidden");
  // Remove d-none if it was there to ensure visibility logic is handled by our new class
  videoContainer.classList.remove("d-none");

  // 2. Wait 500ms (the length of your CSS transition) before stopping the hardware
  setTimeout(() => {
    if (!scanning && stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
      qrVideo.srcObject = null;
    }
  }, 500);

  // Reset Button UI
  startScanBtn.innerHTML =
    '<i class="fa-solid fa-camera"></i> Scan using Camera';
  startScanBtn.classList.replace("btn-danger", "btn-info");
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

function showToast(message) {
  const toast = document.getElementById("liveToast");
  toast.querySelector(".toast-body").textContent = message;
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
  toastBootstrap.show();
}

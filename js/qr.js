// * QR Code Generator Logic

document.getElementById("generateBtn").addEventListener("click", function () {
  const activeTab = document.querySelector(
    "#qrGeneratorTabs .nav-link.active"
  ).id;
  let finalString = ""; // Helper function to format 2026-01-06T14:30 into 20260106T143000Z

  const formatDate = (str) => str.replace(/[-:]/g, "") + "00Z";

  if (activeTab == "text-tab") {
    finalString = document.getElementById("textInput").value;
  } else if (activeTab == "wifi-tab") {
    finalString = `WIFI:S:${document.getElementById("ssidInput").value};T:${
      document.getElementById("encryptionType").value
    };P:${document.getElementById("wifiPwdInput").value};;`;
  } else if (activeTab == "whatsapp-tab") {
    const code = document
      .getElementById("waCountryCode")
      .value.replace("+", "");
    const num = document.getElementById("waNum").value;
    const msg = encodeURIComponent(document.getElementById("waMsg").value);
    finalString = `https://wa.me/${code}${num}?text=${msg}`;
  } else if (activeTab == "vcard-tab") {
    finalString = `BEGIN:VCARD\nVERSION:3.0\nFN:${document
      .getElementById("conName")
      .value.trim()}\nTEL:${document
      .getElementById("conNum")
      .value.trim()}\nEND:VCARD`;
  } else if (activeTab == "email-tab") {
    finalString = `mailto:${
      document.getElementById("emailTo").value
    }?subject=${encodeURIComponent(
      document.getElementById("emailSub").value
    )}&body=${encodeURIComponent(document.getElementById("emailBody").value)}`;
  } else if (activeTab == "sms-tab") {
    finalString = `SMSTO:${document
      .getElementById("smsCountryCode")
      .value.replace("+", "")}${document.getElementById("smsNum").value}:${
      document.getElementById("smsMsg").value
    }`;
  } else if (activeTab == "map-tab") {
    finalString = `geo:${document.getElementById("lat").value},${
      document.getElementById("lng").value
    }`;
  } else if (activeTab == "event-tab") {
    const start = formatDate(document.getElementById("eventStart").value);
    const end = formatDate(document.getElementById("eventEnd").value);
    finalString = `BEGIN:VEVENT\nSUMMARY:${document
      .getElementById("eventTitle")
      .value.trim()}\nDTSTART:${start}\nDTEND:${end}\nLOCATION:${document
      .getElementById("eventLocation")
      .value.trim()}\nEND:VEVENT`;
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
      correctLevel: QRCode.CorrectLevel.H,
    }); // --- ANIMATION LOGIC ---

    resultArea.classList.add("active");
    fileNameContainer.classList.remove("d-none");

    setTimeout(() => {
      resultArea.classList.add("show-animation");
    }, 10);
  } else {
    // ... Hide and reset logic ...
    showToast(
      "Please fill in the fields for the selected tab.",
      "text-bg-danger"
    );
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
    showToast("Please generate a QR code first.", "text-bg-danger");
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
  if (!isError && scanning) {
    stopCameraScan();
  }

  scanResultContainer.classList.remove("d-none");

  if (isError) {
    scanResultElement.textContent = content;
    scanResultElement.classList.add("text-danger");
    openLinkBtn.classList.add("d-none");
  } else {
    scanResultElement.classList.remove("text-danger");
    openLinkBtn.classList.add("d-none");
    openLinkBtn.onclick = null;
    openLinkBtn.target = "_self";

    // --- SMART DECODER (Clean & Categorized) ---

    // 1. WIFI
    if (content.startsWith("WIFI:")) {
      const ssid = content.match(/S:(.*?);/)?.[1] || "N/A";
      const type = content.match(/T:(.*?);/)?.[1] || "Default";
      const pass = content.match(/P:(.*?);/)?.[1] || "";

      scanResultElement.innerHTML = `<strong>Type:</strong> Wi-Fi Network<br><strong>SSID:</strong> ${ssid}<br><strong>Security:</strong> ${type}`;

      if (pass) {
        openLinkBtn.classList.remove("d-none");
        openLinkBtn.innerHTML =
          '<i class="fa-solid fa-key me-1"></i> Copy WiFi Password';
        openLinkBtn.onclick = (e) => {
          e.preventDefault();
          navigator.clipboard.writeText(pass);
          showToast("Password copied to clipboard!", "text-bg-success");
        };
      }
    }

    // 2. WHATSAPP (Separate Category)
    else if (content.includes("wa.me")) {
      const num = content.match(/wa.me\/(.*?)(\?|$)/)?.[1] || "Unknown";
      const msgMatch = content.match(/text=(.*)/);
      const msg = msgMatch
        ? decodeURIComponent(msgMatch[1])
        : "No pre-filled message";

      scanResultElement.innerHTML = `<strong>Type:</strong> WhatsApp Chat<br><strong>Number:</strong> ${num}<br><strong>Message:</strong> ${msg}`;

      openLinkBtn.classList.remove("d-none");
      openLinkBtn.href = content;
      openLinkBtn.target = "_blank";
      openLinkBtn.innerHTML =
        '<i class="fa-brands fa-whatsapp me-1"></i> Open WhatsApp';
    }

    // 3. CONTACT (vCard)
    else if (content.includes("BEGIN:VCARD")) {
      const name = content.match(/FN:(.*)/)?.[1] || "Unknown";
      const tel = content.match(/TEL:(.*)/)?.[1] || "N/A";

      scanResultElement.innerHTML = `<strong>Type:</strong> Contact Card<br><strong>Name:</strong> ${name}<br><strong>Phone:</strong> ${tel}`;

      openLinkBtn.classList.remove("d-none");
      openLinkBtn.innerHTML =
        '<i class="fa-solid fa-address-book me-1"></i> Save Contact';
      openLinkBtn.onclick = (e) => {
        e.preventDefault();
        const blob = new Blob([content], { type: "text/vcard" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "contact.vcf";
        link.click();
      };
    }

    // 4. EVENT (vCalendar)
    else if (content.includes("BEGIN:VEVENT")) {
      const title = content.match(/SUMMARY:(.*)/)?.[1] || "Untitled Event";
      const loc = content.match(/LOCATION:(.*)/)?.[1] || "No Location";

      scanResultElement.innerHTML = `<strong>Type:</strong> Calendar Event<br><strong>Event:</strong> ${title}<br><strong>Location:</strong> ${loc}`;

      openLinkBtn.classList.remove("d-none");
      openLinkBtn.innerHTML =
        '<i class="fa-solid fa-calendar-plus me-1"></i> Add to Calendar';
      openLinkBtn.onclick = (e) => {
        e.preventDefault();
        const blob = new Blob([content], { type: "text/calendar" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "event.ics";
        link.click();
      };
    }

    // 5. EMAIL
    else if (content.startsWith("mailto:")) {
      const email = content.split("?")[0].replace("mailto:", "");
      const subMatch = content.match(/subject=(.*?)($|&)/);
      const subject = subMatch ? decodeURIComponent(subMatch[1]) : "No Subject";

      scanResultElement.innerHTML = `<strong>Type:</strong> Email<br><strong>To:</strong> ${email}<br><strong>Subject:</strong> ${subject}`;

      openLinkBtn.classList.remove("d-none");
      openLinkBtn.href = content;
      openLinkBtn.innerHTML =
        '<i class="fa-solid fa-envelope me-1"></i> Send Email';
    }

    // 6. SMS
    else if (content.startsWith("SMSTO:")) {
      const parts = content.split(":");
      const num = parts[1] || "Unknown";
      const msg = parts[2] || "No message";

      scanResultElement.innerHTML = `<strong>Type:</strong> SMS Message<br><strong>Number:</strong> ${num}<br><strong>Message:</strong> ${msg}`;

      openLinkBtn.classList.remove("d-none");
      openLinkBtn.href = content;
      openLinkBtn.innerHTML =
        '<i class="fa-solid fa-comment-sms me-1"></i> Open SMS App';
    }

    // 7. LOCATION
    else if (content.startsWith("geo:")) {
      const coords = content.replace("geo:", "");
      scanResultElement.innerHTML = `<strong>Type:</strong> Location<br><strong>Coordinates:</strong> ${coords}`;

      openLinkBtn.classList.remove("d-none");
      openLinkBtn.href = `https://www.google.com/maps/search/?api=1&query=${coords}`;
      openLinkBtn.target = "_blank";
      openLinkBtn.innerHTML =
        '<i class="fa-solid fa-map-location-dot me-1"></i> Open in Maps';
    }

    // 8. DEFAULT (URL or Text)
    else {
      let isUrl = content.startsWith("http") || content.includes("www.");
      scanResultElement.innerHTML = `<strong>Type:</strong> ${
        isUrl ? "URL Link" : "Plain Text"
      }<br><span class="text-break"><strong>Content:</strong> ${content}</span>`;

      if (isUrl) {
        openLinkBtn.classList.remove("d-none");
        openLinkBtn.href = content.startsWith("http")
          ? content
          : `https://${content}`;
        openLinkBtn.target = "_blank";
        openLinkBtn.innerHTML =
          '<i class="fa-solid fa-globe me-1"></i>Open URL';
      } else {
        openLinkBtn.classList.remove("d-none");
        openLinkBtn.innerHTML =
          '<i class="fa-solid fa-copy me-1"></i> Copy Text';
        openLinkBtn.onclick = (e) => {
          e.preventDefault();
          navigator.clipboard.writeText(content);
          showToast("Text copied to clipboard!", "text-bg-success");
        };
      }
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

  // ADD THIS: Trigger the scanning line animation
  videoContainer.classList.add("scanning");

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
    // Remove the scanning line if camera fails
    videoContainer.classList.remove("scanning");
    showToast(
      "Camera access denied or failed. Please check permissions.",
      "text-bg-warning"
    );
    stopCameraScan();
  }
}

function scanLoop() {
  if (!scanning) return;

  if (qrVideo.readyState === qrVideo.HAVE_ENOUGH_DATA) {
    try {
      // Draw video frame to canvas
      qrCanvas.height = qrVideo.videoHeight;
      qrCanvas.width = qrVideo.videoWidth;
      ctx.drawImage(qrVideo, 0, 0, qrCanvas.width, qrCanvas.height);

      const imageData = ctx.getImageData(0, 0, qrCanvas.width, qrCanvas.height);

      // Attempt to decode
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert", // Speed up scanning
      });

      if (code) {
        // QR code found!
        // We call displayScanResult which will trigger stopCameraScan()
        displayScanResult(code.data);
        return; // Exit the loop because we found a result
      }
    } catch (err) {
      // If a single frame fails, we just log it and keep going
      console.warn("Scanning frame skipped due to error:", err);
    }
  }

  // CRITICAL: This must be outside the 'if(code)' block
  // to ensure the loop keeps searching for a QR code.
  animationFrameId = requestAnimationFrame(scanLoop);
}

function stopCameraScan() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  scanning = false;

  // 1. Remove the scanning class to hide the line immediately
  videoContainer.classList.remove("scanning");

  // 2. Start the fade-out animation
  videoContainer.classList.add("video-hidden");
  videoContainer.classList.remove("d-none");

  // 3. Wait 500ms before stopping hardware
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

function showToast(message, bgcolor) {
  const toast = document.getElementById("liveToast");
  const toastBody = toast.querySelector(".toast-body");

  // Remove common Bootstrap background classes so they don't stack
  toast.classList.remove(
    "text-bg-success",
    "text-bg-danger",
    "text-bg-warning",
    "text-bg-info"
  );

  toastBody.textContent = message;
  if (bgcolor) toast.classList.add(bgcolor);

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
  toastBootstrap.show();
}

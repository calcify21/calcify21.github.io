// ============================================================
// QR.JS — QR Code Generator & Scanner
// Replaces Bootstrap Tab APIs with custom logic.
// Uses showToast() and dynamic Tailwind classes for UI toggles.
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  setupCustomTabs();
  setupScannerSwitch();
  prepareCameraButtons();
  checkShareSupport();

  const urlParams = new URLSearchParams(window.location.search);
  const sharedData = urlParams.get("input");
  if (sharedData) {
    document.getElementById("textInput").value = sharedData;
    generateQR();
  }
});

// --- Custom Tab System for Generator ---
function setupCustomTabs() {
  const tabs = document.querySelectorAll(".qr-tab");
  const panes = document.querySelectorAll(".qr-tab-pane");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panes.forEach((p) => p.classList.remove("active"));

      tab.classList.add("active");
      const paneId = tab.getAttribute("data-tab");
      document.getElementById(paneId).classList.add("active");
    });
  });
}

// --- Generator Logic ---
let qrCode = null;

function generateQR() {
  const activeTab = document.querySelector(".qr-tab.active").getAttribute("data-tab");
  let qrData = "";
  let infoLabel = "";

  if (activeTab === "text-tab") {
    qrData = document.getElementById("textInput").value;
    infoLabel = "Text/URL QR";
  } else if (activeTab === "wifi-tab") {
    const ssid = document.getElementById("ssidInput").value;
    const pwd = document.getElementById("wifiPwdInput").value;
    const enc = document.getElementById("encryptionType").value;
    const hidden = document.getElementById("hiddenSSID").checked;
    qrData = `WIFI:T:${enc};S:${ssid};P:${pwd};H:${hidden ? "true" : "false"};;`;
    infoLabel = "Wi-Fi QR";
  } else if (activeTab === "whatsapp-tab") {
    const phone = document.getElementById("waPhoneInput").value;
    const msg = encodeURIComponent(document.getElementById("waMsgInput").value);
    qrData = `https://wa.me/${phone}?text=${msg}`;
    infoLabel = "WhatsApp QR";
  } else if (activeTab === "vcard-tab") {
    const first = document.getElementById("vcFirst").value;
    const last = document.getElementById("vcLast").value;
    const phone = document.getElementById("vcPhone").value;
    const email = document.getElementById("vcEmail").value;
    const org = document.getElementById("vcOrg").value;
    const url = document.getElementById("vcUrl").value;
    qrData = `BEGIN:VCARD\nVERSION:3.0\nN:${last};${first}\nFN:${first} ${last}\nORG:${org}\nTEL:${phone}\nEMAIL:${email}\nURL:${url}\nEND:VCARD`;
    infoLabel = "Contact QR";
  } else if (activeTab === "email-tab") {
    const to = document.getElementById("emailTo").value;
    const sub = encodeURIComponent(document.getElementById("emailSub").value);
    const body = encodeURIComponent(document.getElementById("emailBody").value);
    qrData = `mailto:${to}?subject=${sub}&body=${body}`;
    infoLabel = "Email QR";
  } else if (activeTab === "sms-tab") {
    const phone = document.getElementById("smsPhone").value;
    const msg = encodeURIComponent(document.getElementById("smsMsg").value);
    qrData = `smsto:${phone}:${msg}`;
    infoLabel = "SMS QR";
  } else if (activeTab === "map-tab") {
    const lat = document.getElementById("mapLat").value;
    const long = document.getElementById("mapLong").value;
    qrData = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
    infoLabel = "Location QR";
  } else if (activeTab === "event-tab") {
    const title = document.getElementById("eventTitle").value;
    const start = document.getElementById("eventStart").value.replace(/[-:]/g, "");
    const end = document.getElementById("eventEnd").value.replace(/[-:]/g, "");
    const loc = document.getElementById("eventLoc").value;
    qrData = `BEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${start}\nDTEND:${end}\nLOCATION:${loc}\nEND:VEVENT`;
    infoLabel = "Event QR";
  }

  if (!qrData || qrData.trim() === "") {
    showToast("Please enter data to generate QR.", "text-bg-warning");
    return;
  }

  const container = document.getElementById("qr-result-container");
  const actionBtns = document.getElementById("qr-action-btns");
  container.classList.remove("hidden");
  actionBtns.classList.remove("hidden");
  document.getElementById("qrcode").innerHTML = "";
  document.getElementById("qr-info").innerText = infoLabel;

  qrCode = new QRCode(document.getElementById("qrcode"), {
    text: qrData,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  document.getElementById("downloadBtn").disabled = false;
  
  // Update download button
  setTimeout(() => {
    const canvas = document.querySelector("#qrcode canvas");
    if (canvas) {
      document.getElementById("downloadBtn").onclick = () => {
        const link = document.createElement("a");
        link.download = "calcify-qr.png";
        link.href = canvas.toDataURL();
        link.click();
      };
    }
  }, 200);
}

// --- Share Support ---
function checkShareSupport() {
  const shareBtn = document.getElementById("shareBtn");
  if (navigator.share) {
    shareBtn.disabled = false;
    shareBtn.onclick = async () => {
      const canvas = document.querySelector("#qrcode canvas");
      if (!canvas) return;
      
      canvas.toBlob(async (blob) => {
        const file = new File([blob], "qr.png", { type: "image/png" });
        try {
          await navigator.share({
            files: [file],
            title: "Calcify QR Code",
          });
        } catch (e) {
          console.log("Share failed", e);
        }
      });
    };
  } else {
    shareBtn.style.display = "none";
  }
}

// --- Scanner Logic ---
function setupScannerSwitch() {
  const toVideoBtn = document.getElementById("toVideo");
  const toImageBtn = document.getElementById("toImage");
  const videoContainer = document.getElementById("videoContainer");
  const imageContainer = document.getElementById("imageContainer");

  toVideoBtn.addEventListener("click", () => {
    toVideoBtn.classList.add("bg-white", "dark:bg-gray-700", "shadow-sm");
    toVideoBtn.classList.remove("text-gray-500");
    toImageBtn.classList.remove("bg-white", "dark:bg-gray-700", "shadow-sm");
    toImageBtn.classList.add("text-gray-500");
    videoContainer.classList.remove("hidden");
    imageContainer.classList.add("hidden");
  });

  toImageBtn.addEventListener("click", () => {
    toImageBtn.classList.add("bg-white", "dark:bg-gray-700", "shadow-sm");
    toImageBtn.classList.remove("text-gray-500");
    toVideoBtn.classList.remove("bg-white", "dark:bg-gray-700", "shadow-sm");
    toVideoBtn.classList.add("text-gray-500");
    imageContainer.classList.remove("hidden");
    videoContainer.classList.add("hidden");
    stopCamera();
  });
}

// --- Camera Logic ---
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });
let scanning = false;
let stream = null;

function prepareCameraButtons() {
  document.getElementById("start-camera").addEventListener("click", startCamera);
}

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    video.srcObject = stream;
    video.setAttribute("playsinline", true);
    video.play();
    document.getElementById("waitingForCamera").classList.add("hidden");
    scanning = true;
    requestAnimationFrame(tick);
  } catch (err) {
    console.error(err);
    showToast("Unable to access camera. Please check permissions.", "text-bg-danger");
  }
}

function stopCamera() {
  scanning = false;
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
  document.getElementById("waitingForCamera").classList.remove("hidden");
}

function tick() {
  if (!scanning) return;
  if (video.readyState === video.HAVE_ENOUGH_DATA) {
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    if (code) {
      showScanResult(code.data);
      stopCamera();
      return;
    }
  }
  requestAnimationFrame(tick);
}

// --- Image Upload Logic ---
const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileInput");

["dragenter", "dragover", "dragleave", "drop"].forEach(name => {
  dropArea.addEventListener(name, e => e.preventDefault(), false);
});

dropArea.addEventListener("drop", e => {
  const file = e.dataTransfer.files[0];
  if (file) handleQRFile(file);
});

fileInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (file) handleQRFile(file);
});

function handleQRFile(file) {
  const preview = document.getElementById("file-preview");
  const previewContainer = document.getElementById("file-preview-container");
  const dropAreaContent = document.getElementById("drop-area-content");
  
  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    preview.src = dataUrl;
    previewContainer.classList.remove("hidden");
    dropAreaContent.classList.add("hidden");

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        showScanResult(code.data);
      } else {
        showToast("No QR code found in this image.", "text-bg-danger");
      }
    };
    img.src = dataUrl;
  };
  reader.readAsDataURL(file);
}

function clearQRImage(event) {
  if (event) event.stopPropagation();
  const preview = document.getElementById("file-preview");
  const previewContainer = document.getElementById("file-preview-container");
  const dropAreaContent = document.getElementById("drop-area-content");
  const scanResultDiv = document.getElementById("scan-result");
  const fileInput = document.getElementById("fileInput");

  preview.src = "";
  previewContainer.classList.add("hidden");
  dropAreaContent.classList.remove("hidden");
  scanResultDiv.classList.add("hidden");
  fileInput.value = "";
}

// --- Result Display ---
function showScanResult(text) {
  const scanResultDiv = document.getElementById("scan-result");
  const resultText = document.getElementById("result-text");
  const resultLink = document.getElementById("result-link");

  scanResultDiv.classList.remove("hidden");
  
  // Clear previous dynamic content
  const existingTable = scanResultDiv.querySelector(".table-custom");
  if (existingTable) existingTable.remove();

  const parsedData = parseQRData(text);
  
  if (parsedData.type !== "text" && parsedData.type !== "url") {
    // Show raw text shorter and display a table
    resultText.innerText = "Raw: " + text;
    resultText.classList.add("text-xs", "opacity-50", "mb-4");
    
    const table = document.createElement("table");
    table.className = "table-custom mt-4 mb-2";
    let tableHtml = "<tbody>";
    
    for (const [key, value] of Object.entries(parsedData.fields)) {
      if (value) {
        tableHtml += `
          <tr>
            <td class="font-bold w-1/3">${key}</td>
            <td class="break-all">${value}</td>
          </tr>
        `;
      }
    }
    tableHtml += "</tbody>";
    table.innerHTML = tableHtml;
    resultText.after(table);
  } else {
    resultText.innerText = text;
    resultText.classList.remove("text-xs", "opacity-50", "mb-4");
  }

  if (text.startsWith("http://") || text.startsWith("https://")) {
    resultLink.href = text;
    resultLink.classList.remove("hidden");
  } else {
    resultLink.classList.add("hidden");
  }
  
  if (typeof showToast === "function") {
    showToast("QR Code Scanned Successfully!", "text-bg-success");
  }
}

function parseQRData(text) {
  const data = { type: "text", fields: {} };

  if (text.startsWith("WIFI:")) {
    data.type = "wifi";
    const wifiMatch = text.match(/WIFI:T:(.*?);S:(.*?);P:(.*?);H:(.*?);;/i);
    if (wifiMatch) {
      data.fields = {
        "Type": "Wi-Fi Network",
        "SSID (Name)": wifiMatch[2],
        "Password": wifiMatch[3] || "(None)",
        "Encryption": wifiMatch[1],
        "Hidden": wifiMatch[4] === "true" ? "Yes" : "No"
      };
    }
  } else if (text.startsWith("BEGIN:VCARD")) {
    data.type = "vcard";
    const fnMatch = text.match(/\nFN:(.*?)\r?\n/i);
    const nMatch = text.match(/\nN:(.*?)\r?\n/i);
    const tel = text.match(/\nTEL:(.*?)\r?\n/i);
    const email = text.match(/\nEMAIL:(.*?)\r?\n/i);
    const org = text.match(/\nORG:(.*?)\r?\n/i);
    const url = text.match(/\nURL:(.*?)\r?\n/i);

    let displayName = "Unknown";
    if (fnMatch) {
      displayName = fnMatch[1];
    } else if (nMatch) {
      const parts = nMatch[1].split(";");
      displayName = (parts[1] ? parts[1] + " " : "") + (parts[0] || "");
    }

    data.fields = {
      "Type": "Contact (vCard)",
      "Name": displayName.trim(),
      "Phone": tel ? tel[1] : null,
      "Email": email ? email[1] : null,
      "Organization": org ? org[1] : null,
      "Website": url ? url[1] : null
    };
  } else if (text.startsWith("mailto:")) {
    data.type = "email";
    const email = text.match(/mailto:(.*?)\?/i) || [null, text.replace("mailto:", "")];
    const sub = text.match(/\?subject=(.*?)(&|$)/i);
    const body = text.match(/&body=(.*?)(&|$)/i);
    data.fields = {
      "Type": "Email",
      "To": email[1],
      "Subject": sub ? decodeURIComponent(sub[1]) : null,
      "Message": body ? decodeURIComponent(body[1]) : null
    };
  } else if (text.startsWith("smsto:")) {
    data.type = "sms";
    const parts = text.split(":");
    data.fields = {
      "Type": "SMS",
      "Phone": parts[1],
      "Message": parts[2] ? decodeURIComponent(parts[2]) : null
    };
  } else if (text.startsWith("http://") || text.startsWith("https://")) {
    data.type = "url";
  }

  return data;
}

function copyScanResult() {
  const text = document.getElementById("result-text").innerText.replace("Raw: ", "");
  navigator.clipboard.writeText(text).then(() => {
    showToast("Copied to clipboard!", "text-bg-success");
  });
}

// ==========================================
// Color Converter Logic
// ==========================================

const preview = document.getElementById("colorPreview");
const picker = document.getElementById("colorPicker");
const hexInput = document.getElementById("hexInput");
const rgbInput = document.getElementById("rgbInput");
const hslInput = document.getElementById("hslInput");

function updateFromPicker(val) {
  updateAll(val, "picker");
}

function updateFromHex(val) {
  if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
    updateAll(val, "hex");
  }
}

function updateFromRgb(val) {
  // Basic RGB regex
  const match = val.match(
    /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/,
  );
  if (match) {
    const hex = rgbToHex(
      parseInt(match[1]),
      parseInt(match[2]),
      parseInt(match[3]),
    );
    updateAll(hex, "rgb");
  }
}

function updateFromHsl(val) {
  // Basic HSL match
  const match = val.match(
    /hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)/,
  );
  if (match) {
    const hex = hslToHex(
      parseInt(match[1]),
      parseInt(match[2]),
      parseInt(match[3]),
    );
    updateAll(hex, "hsl");
  }
}

function updateAll(hex, source) {
  preview.style.background = hex;
  if (source !== "picker") picker.value = hex;
  if (source !== "hex") hexInput.value = hex.toUpperCase();

  // Calculate others
  const rgb = hexToRgb(hex);
  if (source !== "rgb") rgbInput.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  if (source !== "hsl") hslInput.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

// Helper functions
function hexToRgb(hex) {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length == 4) {
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else if (hex.length == 7) {
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  return { r: +r, g: +g, b: +b };
}

function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

async function copyToClipboard(id) {
  const el = document.getElementById(id);
  try {
    await navigator.clipboard.writeText(el.value);
    triggerToast("Color copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy!", err);
  }
}

// Common bridge for toast
// Common bridge for toast (uses global showToast from common.js)
function triggerToast(msg) {
  if (typeof showToast === "function") {
    showToast(msg);
  } else {
    alert(msg);
  }
}

// ==========================================
// Text & Code Utilities Logic
// ==========================================

const textarea = document.getElementById("mainText");
const wordCountEl = document.getElementById("wordCount");
const charCountEl = document.getElementById("charCount");

function updateCounts() {
  const text = textarea.value;
  charCountEl.innerText = text.length;
  wordCountEl.innerText =
    text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

function transform(action) {
  let text = textarea.value;
  if (!text && action !== "B64_ENC" && action !== "B64_DEC") return;

  try {
    switch (action) {
      case "UPPER":
        textarea.value = text.toUpperCase();
        break;
      case "LOWER":
        textarea.value = text.toLowerCase();
        break;
      case "TITLE":
        textarea.value = text.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
        );
        break;
      case "TRIM":
        textarea.value = text.trim();
        break;
      case "CLEAN":
        textarea.value = text.replace(/\s+/g, " ").trim();
        break;
      case "B64_ENC":
        textarea.value = btoa(unescape(encodeURIComponent(text)));
        break;
      case "B64_DEC":
        textarea.value = decodeURIComponent(escape(atob(text)));
        break;
      case "JSON":
        const obj = JSON.parse(text);
        textarea.value = JSON.stringify(obj, null, 4);
        break;
    }
    updateCounts();
    triggerToast(`Utility: ${action} applied!`);
  } catch (e) {
    triggerToast("Error processing text. Check your input format!");
    console.error(e);
  }
}

async function copyAll() {
  try {
    await navigator.clipboard.writeText(textarea.value);
    triggerToast("Text copied to clipboard!");
  } catch (err) {
    triggerToast("Failed to copy!");
  }
}

function clearText() {
  textarea.value = "";
  updateCounts();
}

// ==========================================
// Code Formatter (uses js-beautify CDN)
// ==========================================

function formatCode(lang) {
  const text = textarea.value;
  if (!text.trim()) {
    triggerToast("Paste some code first!");
    return;
  }

  const opts = {
    indent_size: 2,
    wrap_line_length: 80,
    preserve_newlines: true,
  };

  try {
    switch (lang) {
      case "HTML":
        if (typeof html_beautify !== "function") {
          triggerToast(
            "HTML formatter is still loading. Try again in a second.",
          );
          return;
        }
        textarea.value = html_beautify(text, opts);
        break;

      case "CSS":
        if (typeof css_beautify !== "function") {
          triggerToast(
            "CSS formatter is still loading. Try again in a second.",
          );
          return;
        }
        textarea.value = css_beautify(text, opts);
        break;

      case "JS":
        if (typeof js_beautify !== "function") {
          triggerToast("JS formatter is still loading. Try again in a second.");
          return;
        }
        textarea.value = js_beautify(text, opts);
        break;

      case "XML":
        // XML can use html_beautify with xml-specific options
        if (typeof html_beautify !== "function") {
          triggerToast(
            "XML formatter is still loading. Try again in a second.",
          );
          return;
        }
        textarea.value = html_beautify(text, {
          ...opts,
          indent_inner_html: true,
          content_unformatted: [],
          unformatted: [],
        });
        break;

      case "SQL":
        textarea.value = formatSQL(text);
        break;
    }

    updateCounts();
    triggerToast(`${lang} code formatted!`);
  } catch (e) {
    triggerToast(`Error formatting ${lang}. Check your input!`);
    console.error(e);
  }
}

// Simple SQL Formatter (keyword uppercasing + line breaks)
function formatSQL(sql) {
  const keywords = [
    "SELECT",
    "FROM",
    "WHERE",
    "AND",
    "OR",
    "INSERT INTO",
    "VALUES",
    "UPDATE",
    "SET",
    "DELETE",
    "JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "INNER JOIN",
    "ON",
    "ORDER BY",
    "GROUP BY",
    "HAVING",
    "LIMIT",
    "OFFSET",
    "CREATE TABLE",
    "ALTER TABLE",
    "DROP TABLE",
    "AS",
    "DISTINCT",
    "UNION",
    "BETWEEN",
    "LIKE",
    "IN",
    "NOT",
    "NULL",
    "IS",
    "EXISTS",
    "CASE",
    "WHEN",
    "THEN",
    "ELSE",
    "END",
  ];

  let formatted = sql;

  // Uppercase all keywords
  keywords.forEach((kw) => {
    const regex = new RegExp(`\\b${kw}\\b`, "gi");
    formatted = formatted.replace(regex, kw);
  });

  // Add newlines before major keywords
  const breakBefore = [
    "SELECT",
    "FROM",
    "WHERE",
    "AND",
    "OR",
    "ORDER BY",
    "GROUP BY",
    "HAVING",
    "LIMIT",
    "JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "INNER JOIN",
    "ON",
    "SET",
    "VALUES",
    "INSERT INTO",
    "UPDATE",
    "DELETE",
  ];

  breakBefore.forEach((kw) => {
    const regex = new RegExp(`\\b${kw}\\b`, "g");
    formatted = formatted.replace(regex, "\n" + kw);
  });

  // Clean up leading newline
  return formatted.trim();
}

// Common bridge for toast (uses global showToast from common.js)
function triggerToast(msg) {
  if (typeof showToast === "function") {
    showToast(msg);
  } else {
    alert(msg);
  }
}

// Init
window.onload = updateCounts;

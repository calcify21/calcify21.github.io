// ==========================================
// Currency Converter Logic (Frankfurter API)
// ==========================================

const host = "api.frankfurter.app";
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");
const resultDisplay = document.getElementById("result");
const rateText = document.getElementById("rateText");

let currencies = {};

async function initCurrencies() {
  try {
    const resp = await fetch(`https://${host}/currencies`);
    currencies = await resp.json();

    // Populate selects with all available currencies
    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";

    for (const [code, name] of Object.entries(currencies)) {
      fromSelect.add(new Option(`${code} - ${name}`, code));
      toSelect.add(new Option(`${code} - ${name}`, code));
    }

    // Set defaults matching the HTML or sensible ones
    fromSelect.value = "INR";
    toSelect.value = "USD";

    convert();
  } catch (err) {
    console.error("Failed to load currencies:", err);
    rateText.innerText =
      "Failed to load real-time rates. Please check your connection.";
  }
}

async function convert() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (isNaN(amount) || amount <= 0) {
    resultDisplay.innerText = "--";
    rateText.innerText = "Enter a valid amount.";
    return;
  }

  if (from === to) {
    resultDisplay.innerText = `${amount.toFixed(2)} ${to}`;
    rateText.innerText = `1 ${from} = 1 ${to}`;
    return;
  }

  try {
    rateText.innerText = "Updating...";
    const resp = await fetch(
      `https://${host}/latest?amount=${amount}&from=${from}&to=${to}`,
    );
    const data = await resp.json();

    const convertedAmount = data.rates[to];
    resultDisplay.innerText = `${convertedAmount.toFixed(2)} ${to}`;

    // Get unit rate for info text
    const unitResp = await fetch(
      `https://${host}/latest?amount=1&from=${from}&to=${to}`,
    );
    const unitData = await unitResp.json();
    rateText.innerText = `1 ${from} = ${unitData.rates[to].toFixed(4)} ${to}`;
  } catch (err) {
    console.error("Conversion failed:", err);
    rateText.innerText =
      "Conversion unavailable. Using cached rates if possible.";
  }
}

function swapCurrencies() {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  convert();
}

window.onload = initCurrencies;

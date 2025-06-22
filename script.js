function formatNumber(num) {
  return Number(num).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

async function fetchRates() {
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const amount = document.getElementById("amount").value;

  if (!amount || amount <= 0) {
    document.getElementById("result").value = "";
    document.getElementById("converted").innerHTML = "--";
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const result = formatNumber(amount * rate);

    document.getElementById("result").value = result;
    document.getElementById("converted").innerHTML = `${result} <span id="toText">${to}</span>`;
    document.getElementById("unitRate").textContent = `1 ${from} = ${formatNumber(rate)} ${to}`;
    document.getElementById("fromText").textContent = from;
    document.getElementById("time").textContent = new Date().toUTCString().split(" ")[4];
  } catch (err) {
    alert("API error. Please try again later.");
  }
}

// Currency Options
const currencies = ["USD", "PKR", "SAR", "INR", "EUR", "GBP", "AED", "CAD", "AUD"];
const fromSelect = document.getElementById("fromCurrency");
const toSelect = document.getElementById("toCurrency");

currencies.forEach(curr => {
  fromSelect.innerHTML += `<option value="${curr}">${curr}</option>`;
  toSelect.innerHTML += `<option value="${curr}">${curr}</option>`;
});

fromSelect.value = "SAR";
toSelect.value = "PKR";

//Convert button will trigger the conversion
document.getElementById("convertBtn").addEventListener("click", fetchRates);